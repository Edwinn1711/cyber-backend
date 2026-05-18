import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import json
import uvicorn

app = FastAPI()

# Mengizinkan semua Frontend untuk mengakses API ini (Wajib untuk Cloud)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODEL DATA ---
class AuthData(BaseModel):
    username: str
    password: str
    role: str = "siswa"

# Ditambahkan untuk fitur Register agar sesuai dengan Frontend baru Pinci
class RegisterData(BaseModel):
    username: str
    password: str
    role: str = "siswa"
    class_name: str = "UNASSIGNED"
    asal: Optional[str] = ""
    tanggal_lahir: Optional[str] = ""

class AnswerSubmit(BaseModel):
    username: str
    class_name: str = "UNASSIGNED"
    domain_id: str
    answers: List[Dict[str, Any]]

class QuestionSubmit(BaseModel):
    main_domain: str
    type: str
    text: str
    bobot: int
# ------------------

# ==========================================
# KONEKSI DATABASE KE AIVEN CLOUD
# ==========================================
def get_db_connection():
    # 1. Tambahkan 2 baris ini agar Vercel otomatis melacak lokasi file ca.pem
    current_dir = os.path.dirname(os.path.abspath(__file__))
    ca_path = os.path.join(current_dir, "ca.pem")

    # Ambil password dari "kunci rahasia" Vercel
    db_password = os.environ.get("DB_PASSWORD") 

    return mysql.connector.connect(
        host="mysql-28e76345-devinedwinsiahaan171105-5a56.e.aivencloud.com",
        port=26035,
        user="avnadmin",
        password=db_password # <-- Pastikan ini memanggil variabel db_password
        database="defaultdb",
        ssl_ca=ca_path
    )
# --- AUTO UPDATE DATABASE ---
# Fungsi cerdas agar tabel MySQL otomatis punya kolom "asal" dan "tanggal_lahir"
@app.on_event("startup")
def startup_event():
    try:
        db = get_db_connection()
        cursor = db.cursor()
        # Cek apakah kolom 'asal' sudah ada
        cursor.execute("SHOW COLUMNS FROM users LIKE 'asal'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE users ADD COLUMN asal VARCHAR(255)")
            cursor.execute("ALTER TABLE users ADD COLUMN tanggal_lahir VARCHAR(50)")
            db.commit()
            print("SISTEM: Kolom Asal & Tanggal Lahir otomatis ditambahkan ke database!")
        db.close()
    except Exception as e:
        print("Peringatan saat update struktur DB:", e)


# ==========================================
# ENDPOINT AUTHENTICATION (LOGIN & REGISTER)
# ==========================================

@app.post("/login")
async def login(req: AuthData):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT username, role, class_name FROM users WHERE username = %s AND password = %s", (req.username, req.password))
    user = cursor.fetchone()
    db.close()
    
    if not user: 
        raise HTTPException(status_code=401, detail="Username atau Password salah")
    return user

@app.post("/register")
async def register(req: RegisterData):
    db = None
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        
        # Cek apakah username sudah ada
        cursor.execute("SELECT * FROM users WHERE username = %s", (req.username,))
        existing_user = cursor.fetchone()
        
        if existing_user:
            raise HTTPException(status_code=400, detail="Username sudah terdaftar!")

        # Masukkan user baru ke database (Sekarang memasukkan Asal dan Tanggal Lahir juga)
        cursor.execute(
            "INSERT INTO users (username, password, role, class_name, asal, tanggal_lahir) VALUES (%s, %s, %s, %s, %s, %s)",
            (req.username, req.password, req.role, req.class_name, req.asal, req.tanggal_lahir)
        )
        db.commit()
        return {"message": "Akun berhasil dibuat", "username": req.username, "role": req.role}
    except Exception as e:
        if db: db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if db: db.close()

# ==========================================
# ENDPOINT SISWA
# ==========================================

@app.get("/questions")
async def get_questions():
    db = None
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT id, main_domain, type, text, options FROM questions")
        res = cursor.fetchall()
        for q in res:
            if isinstance(q['options'], str):
                q['options'] = json.loads(q['options'])
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if db: db.close()

@app.post("/siswa/submit")
async def submit(req: AnswerSubmit):
    db = None
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        
        cursor.execute("SELECT id, text FROM questions WHERE main_domain = %s", (req.domain_id,))
        rows = cursor.fetchall()
        if not rows: raise HTTPException(status_code=404, detail="Domain not found")

        max_score = len(rows) * 5 # Asumsi bobot soal benar adalah 5
        total_obtained = 0
        details_list = []

        for ans in req.answers:
            q_id = int(ans.get('id', 0))
            score_val = int(ans.get('value', 0))
            ans_text = ans.get('text', '')
            
            total_obtained += score_val
            
            q_text = "Soal tidak ditemukan"
            for row in rows:
                if row['id'] == q_id:
                    q_text = row['text']
                    break
            
            is_correct = score_val > 0
            
            details_list.append({
                "question": q_text,
                "answer": ans_text,
                "is_correct": is_correct
            })
        
        percentage = int((total_obtained / max_score) * 100) if max_score > 0 else 0
        if percentage > 100: percentage = 100
        status = "READY" if percentage >= 80 else "CAUTION" if percentage >= 50 else "DANGER"
        
        details_json = json.dumps(details_list) 

        cursor.execute(
            "INSERT INTO reports (username, class_name, domain_id, score, status, details) VALUES (%s, %s, %s, %s, %s, %s)",
            (req.username, req.class_name, req.domain_id, percentage, status, details_json)
        )
        db.commit()
        return {"score": percentage, "status": status}
    except Exception as e:
        if db: db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if db: db.close()

@app.get("/siswa/scores/{username}")
async def get_scores(username: str):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT id, score, status, domain_id, details FROM reports WHERE username = %s ORDER BY id DESC", (username,))
    res = cursor.fetchall()
    
    for row in res:
        if row.get('details'):
            try:
                row['details'] = json.loads(row['details'])
            except:
                row['details'] = []
        else:
            row['details'] = []

    db.close()
    return res

# ==========================================
# ENDPOINT GURU
# ==========================================

@app.get("/guru/reports")
async def get_all_reports():
    db = None
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT id, username, class_name, domain_id, score, status, details FROM reports ORDER BY id DESC")
        res = cursor.fetchall()
        
        for row in res:
            if row.get('details'):
                try:
                    row['details'] = json.loads(row['details'])
                except:
                    row['details'] = []
            else:
                row['details'] = []
                
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if db: db.close()

@app.delete("/guru/delete-log/{log_id}")
async def delete_log(log_id: int):
    db = None
    try:
        db = get_db_connection()
        cursor = db.cursor()
        
        cursor.execute("DELETE FROM reports WHERE id = %s", (log_id,))
        db.commit()
        
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Log tidak ditemukan")
            
        return {"message": "Log audit berhasil dihapus permanen!"}
    except Exception as e:
        if db: db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if db: db.close()

@app.post("/guru/add-question")
async def add_question(req: QuestionSubmit):
    db = None
    try:
        db = get_db_connection()
        cursor = db.cursor()
        
        options_json = json.dumps([
            {"text": "OPSI BENAR (SANGAT AMAN)", "score": req.bobot},
            {"text": "OPSI SALAH (BERBAHAYA)", "score": 0}
        ])
        
        cursor.execute(
            "INSERT INTO questions (main_domain, type, text, options) VALUES (%s, %s, %s, %s)",
            (req.main_domain, req.type, req.text, options_json)
        )
        db.commit()
        return {"message": "Question deployed successfully"}
    except Exception as e:
        if db: db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if db: db.close()

# ==========================================
# KONFIGURASI SERVER UNTUK CLOUD (RENDER)
# ==========================================
if __name__ == "__main__":
    # Server Cloud seperti Render menggunakan Environment Variable "PORT"
    # Kode di bawah memastikan API otomatis beradaptasi saat dihosting
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)