# วิธีขึ้น GitHub Pages (ไม่ต้องใช้คำสั่ง git)

> สำคัญ: GitHub Pages โฮสต์ได้แค่ "หน้าเว็บ" — ฐานข้อมูลยังต้องใช้ Apps Script + Google Sheet
> ทำ **ส่วน A (หลังบ้าน) ให้เสร็จก่อน** แล้วค่อยทำส่วน B (อัปขึ้น GitHub)

---

## ส่วน A — เปิดหลังบ้าน Apps Script (ได้ URL /exec)

1. สร้าง Google Sheet เปล่า 1 ไฟล์
2. Extensions → Apps Script
3. ลบโค้ดเดิมใน `Code.gs` → วางเนื้อหาจากไฟล์ **`apps-script/Code.gs`** (ในชุดนี้) → บันทึก
   - หมายเหตุ: Code.gs ชุดนี้เป็นแบบ "API อย่างเดียว" (คู่กับหน้าเว็บบน GitHub) ไม่ต้องสร้างไฟล์ Index ในนี้
4. เลือกฟังก์ชัน `setup` → Run → อนุญาตสิทธิ์ (สร้างชีต + ข้อมูลตัวอย่าง)
5. Deploy → New deployment → เลือกชนิด **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy → คัดลอก **URL ที่ลงท้าย `/exec`**
6. ทดสอบ: เปิด URL `/exec` ในเบราว์เซอร์ ควรเห็น `{"ok":true,"service":"RTCRA Booking API",...}`

## เอา URL ใส่ config.js
เปิดไฟล์ `config.js` แก้บรรทัด API_URL ให้เป็น URL /exec ของคุณ:
```js
window.RTCRA_CONFIG = {
  API_URL: "https://script.google.com/macros/s/AKfyc..../exec"
};
```
(จะแก้ในเครื่องก่อนอัป หรือแก้บน GitHub หลังอัปก็ได้)

---

## ส่วน B — อัปโหลดขึ้น GitHub Pages

1. สมัคร/เข้าสู่ระบบ github.com
2. มุมขวาบน กด **+ → New repository**
   - Repository name: เช่น `rtcra-booking`
   - เลือก **Public**
   - กด **Create repository**
3. หน้าถัดมา กดลิงก์ **"uploading an existing file"**
4. ลาก **ไฟล์ทั้งหมดในชุดนี้** เข้าไปวาง (index.html, config.js, sw.js, manifest.webmanifest, icon ต่างๆ, .nojekyll)
   - โฟลเดอร์ `apps-script` เอาขึ้นด้วยก็ได้ (ไม่กระทบ) หรือจะไม่เอาก็ได้
5. กด **Commit changes**
6. ไปที่ **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/(root)** → **Save**
7. รอ 1–2 นาที รีเฟรชหน้า จะได้ลิงก์:
   `https://<ชื่อผู้ใช้>.github.io/rtcra-booking/`
8. เปิดลิงก์นั้น = หน้าเว็บจองห้อง → แชร์ให้นักศึกษาทุกคน ✅

## เช็คว่าเชื่อมหลังบ้านแล้ว
- ลองล็อกอินด้วยบัญชีตัวอย่าง `6510001` / `0812345001`
- เข้าได้ = เชื่อม Google Sheet สำเร็จ
- ถ้าขึ้น "ยังไม่ได้ตั้งค่า API_URL" หรือ "เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ" = ยังไม่ได้ใส่ URL /exec ใน config.js หรือ Apps Script ยัง deploy ไม่ถูก (ย้อนไปทำส่วน A)

## แก้ไขภายหลัง
- แก้หน้าเว็บ: แก้ไฟล์บน GitHub แล้ว Commit → Pages อัปเดตเองใน 1–2 นาที
- แก้หลังบ้าน: แก้ Code.gs ใน Apps Script → Deploy → Manage deployments → ✏️ → New version → Deploy (URL /exec เดิมไม่เปลี่ยน)

## บัญชี
- Admin: `RT6708` / `0867004`
- นักศึกษาตัวอย่าง: `6510001` / `0812345001`
- สมัครใหม่ → ต้องให้ Admin อนุมัติก่อนถึงล็อกอินได้
