# RTCRA Booking — ระบบจองห้องปฏิบัติการรังสีเทคนิค

เว็บแอป (PWA) จองห้องปฏิบัติการ (X-ray 1, X-ray 2, Ultrasound, Mammogram) สำหรับนักศึกษารังสีเทคนิค ราชวิทยาลัยจุฬาภรณ์
โฮสต์บน **GitHub Pages** (ผูกโดเมนได้ + ติดตั้งลงหน้าจอมือถือแบบแอป) เก็บฐานข้อมูลบน **Google Sheet**

> **สำคัญ:** เว็บนี้ทำงานร่วมกับ backend จริงเท่านั้น (ไม่มีโหมดสาธิต) — ต้องตั้งค่า `API_URL` ใน `config.js` ก่อน มิฉะนั้นจะเข้าสู่ระบบไม่ได้

## สถาปัตยกรรม
```
โดเมน/GitHub Pages (index.html)  ──fetch(JSON)──►  Apps Script Web App  ──►  Google Sheet
        หน้าเว็บ (PWA)                              doPost + LockService       ฐานข้อมูล
```

## โครงสร้างไฟล์
```
index.html            หน้าเว็บทั้งหมด (UI + ตรรกะ + PWA)
config.js             ★ ใส่ URL ของ Apps Script ตรงนี้ (จำเป็น)
manifest.webmanifest  ข้อมูลแอปสำหรับติดตั้งลงหน้าจอ
sw.js                 service worker (แคช/ออฟไลน์)
icon-192/512/512-maskable.png   ไอคอนแอป
apps-script/Code.gs         โค้ด backend (วางใน Apps Script)
apps-script/appsscript.json  ตั้งค่าโปรเจกต์ Apps Script
```

## ขั้นตอนที่ 1 — ติดตั้ง Backend (Apps Script + Google Sheet)
1. สร้าง Google Sheet ใหม่ → เมนู **Extensions → Apps Script**
2. วางเนื้อหา `apps-script/Code.gs` ทับไฟล์ Code.gs เดิม
3. (แนะนำ) Project Settings → ติ๊ก "Show appsscript.json" แล้ววางเนื้อหา `apps-script/appsscript.json`
4. เลือกฟังก์ชัน `setup` → **Run** → อนุญาตสิทธิ์ (ครั้งแรก) → ได้ชีต Students/Rooms/Bookings/ErrorLogs/EmailLog พร้อมข้อมูลตัวอย่าง
5. **Deploy → New deployment → Web app** — Execute as **Me**, Who has access **Anyone** → คัดลอก **Web app URL** (ลงท้าย `/exec`)
6. ทดสอบ: เปิด URL นั้นในเบราว์เซอร์ ควรเห็น `{"ok":true,"service":"RTCRA Booking API",...}`

## ขั้นตอนที่ 2 — ตั้งค่า config.js (จำเป็น)
เปิด **`config.js`** วาง URL `/exec` จากขั้นตอนที่แล้ว:
```js
window.RTCRA_CONFIG = { API_URL: "https://script.google.com/macros/s/AKfyc.../exec" };
```

## ขั้นตอนที่ 3 — นำขึ้น GitHub Pages
1. สร้าง GitHub repo ใหม่ → อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ → commit
2. **Settings → Pages** → Source: Deploy from a branch → Branch: **main** / **/(root)** → Save
3. รอสักครู่ ได้ลิงก์ `https://<user>.github.io/<repo>/` เปิดใช้งานได้เลย
4. บนมือถือ เปิดลิงก์ → เมนูเบราว์เซอร์ → **"เพิ่มไปยังหน้าจอหลัก"** จะได้แอปเต็มจอมีไอคอน RT

### ผูกโดเมนของตัวเอง (ถ้ามี)
Settings → Pages → Custom domain ใส่โดเมน แล้วตั้ง DNS (CNAME ชี้ `<user>.github.io`) ตามที่ GitHub บอก — HTTPS จะเปิดให้อัตโนมัติ

## บัญชีเริ่มต้น
- **นักศึกษา:** รหัส `6510001` เบอร์ `0812345001` (ลงทะเบียนเองได้ที่แท็บ "ลงทะเบียน" แล้วรอ Admin อนุมัติ)
- **ผู้ดูแล:** แท็บ "ผู้ดูแล" → user `RT6708` / password `0867004` (เปลี่ยนได้ที่ `ADMIN_USER`/`ADMIN_PASS` ใน Code.gs)
- **ก่อนเปิดใช้จริง** ควรแก้/ลบบัญชีตัวอย่างในชีต Students และเปลี่ยนรหัสผ่านผู้ดูแล

## หมายเหตุ
- **CORS:** frontend ส่ง `text/plain` เพื่อเลี่ยง preflight — จึงเรียก Apps Script ข้ามโดเมนได้
- **โควตาอีเมล:** Gmail ~100/วัน, Workspace ~1,500/วัน (ปิดได้โดยคอมเมนต์ `MailApp.sendEmail` ใน Code.gs)
- **แก้โค้ด backend แล้ว** ต้อง Deploy เวอร์ชันใหม่ (Manage deployments → Edit → New version) ลิงก์ `/exec` เดิมจะอัปเดตเอง
