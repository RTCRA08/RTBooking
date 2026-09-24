/* ============================================================
 * RTCRA Booking — การตั้งค่า
 * • ปล่อย API_URL ว่าง = ใช้งานแบบในเครื่อง (offline) ได้ทันที ข้อมูลเก็บในเบราว์เซอร์
 * • ใส่ URL ของ Apps Script (ลงท้าย /exec) = ต่อ Google Sheet จริง (แชร์ข้อมูลข้ามเครื่อง)
 *   ระบบจะสลับไปโหมดออนไลน์อัตโนมัติเมื่อ URL เชื่อมต่อได้
 * ============================================================ */
window.RTCRA_CONFIG = {
  API_URL: "https://script.google.com/macros/s/AKfycbxPspAITZrny_czE732UF6PNteTzxEohkcu8SXzHrKsdhhN9CNdA3jCGl8PKaLfrdHHgQ/exec"
};
