// =============================================================================
// MDT312 Assignment 6 login.js
// Modernized: ES6 (const/let), event.preventDefault(), and for loop
// =============================================================================

window.onload = loginLoad;

function loginLoad() {
    // ผูก Event ให้กับฟอร์มเมื่อมีการกดปุ่ม Submit
    const form = document.getElementById("myLogin"); //ค้นหาแท็ก html ที่มี ID ว่า myLogin เมื่อเข้าสู่ระบบนำไปเก็บในตัวแปรค่าคงที่ของ form
    form.onsubmit = checkLogin; //เช็คเมื่อผู้ใช้ กดSubmit ให้เรียกใช้ฟังก์ชัน checkLogin
}

function checkLogin(event) {
    // 1. ป้องกันหน้าเว็บรีเฟรชเองทันทีเมื่อกดปุ่ม Submit
    if (event) { //ตรวจสอบว่ามีข้อมูลส่งมาไหม
        event.preventDefault(); //สั่งยกเลิกการกดปุ่มเมื่อไม่ให้หน้าเว็บรีเฟรชหรือเปลี่ยนหน้าเอง
    }

    // 2. ดึงข้อมูลจาก localStorage ทีละตัว แล้วนำมาใส่ใน Array 
    const users = [{username: "admin", password: "123456"}]; // เพิ่มผู้ใช้ default ไว้แล้ว //สร้างตัวแปรArray ชื่อusers เก็บข้อมูลผุ้ใช้1คน admin รหัส

    const storedUsername = localStorage.getItem("username"); //ดึงข้อมูลไปบันทึกที่localStorage ของusername เก็บไว้ในstoredUsername
    const storedPassword = localStorage.getItem("password"); //ดึงข้อมูลไปบันทึกที่localStorage ของpassword เก็บไว้ในstoredpassword

    // ถ้ามีข้อมูลใน localStorage ให้นำมาเก็บใส่ Array of Objects
    if (storedUsername && storedPassword) { //ตรวจสอบว่ามีข้อมูล UsernameกับPassword อยู่ในตัวlocalStorageครบไหม
        users.push({username: storedUsername, password: storedPassword}); //ถ้าครบให้เอาค่ามาสร้างเป็น Object เพิ่ม push ต่อท้ายเข้าไปในArrayของUsers
    }
    
    // 3. ตรวจสอบว่ามีข้อมูลผู้ใช้ในระบบหรือไม่
    if (users.length === 0) { //ตรวจสอบว่ามีจำนวนข้อมูลใน Array usersต้องเป็น0
        alert("ไม่พบข้อมูลผู้ใช้ในระบบ กรุณาลงทะเบียนที่หน้า Register ก่อน"); //ถ้าไม่มีจะขึ้นป๊อบอัพแจ้งเตือนให้ผู้ใช้ต้องลงทะเบียนก่อน
        window.location.href = "register.html"; //บังคับไปหน้าลงทะเบียน
        return false; //จบการทำงาน ส่งค่าเป็นเท็จ
    }

    // 4. ดึงค่าที่ผู้ใช้กรอกในฟอร์ม Login ปัจจุบัน
    const inputUser = document.getElementById("username").value; //ดึงค่าข้อความที่ผู้ใช้พิมพ์ในช่อง id username มาเก็บไว้ในinputUser 
    const inputPass = document.forms["myLogin"]["password"].value; //ดึงค่าข้อความที่ผู้ใช้พิมพ์ในช่อง password ฟอร์มของmyLogin มาเก็บไว้ในinputPass

    // 5. ใช้ for loop วนหาใน Array ว่ามี username และ password ที่ตรงกับที่เรากรอกหรือไม่
    let isLoginSuccess = false;
    for (let i = 0; i < users.length; i++) { //เริ่มลูปตั้งแต่0 จนไปถึงจำนวนผู้ใช้User เพิ่มทีละ1
        if (users[i].username === inputUser && users[i].password === inputPass) { //ตรวจสอบชื่อผู้ใช้และรหัสผ่านใของปัจจุบัน ตรงกับผู้ใช้และรหัสที่กรอกเข้ามาทั้งคู่มั้ย
            isLoginSuccess = true; //ถ้าถูกจะเด้งเป็นผ่าน
            break; //หยุดการทำงานของการวนลูป
        }
    }

    // 6. ตรวจสอบผลลัพธ์จากการวนลูป
    if (isLoginSuccess) { //ตรวจสอบสถานะ
        alert("Login success! ยินดีต้อนรับเข้าสู่ระบบ"); //แสดงป๊อบอัพ แจ้งเตือนว่าเข้าสู่ระบบสำเร็จ
        return true; //คืนค่า true เพื่อแสดงว่ามันสมบูรณ์
    } else { //แต่ถ้าเข้าไม่สำเร็จ
        alert("Username หรือ password ไม่ถูกต้อง"); //แสดงป๊อบอัพว่าข้อมูลผิด
        return false; //คืนค่า false และยกเลิกทำงาน
    }
}