// =============================================================================
// MDT312 Assignment 6 register.js
// Modernized: ES6 (const/let), event.preventDefault(), and localStorage
// =============================================================================

window.onload = pageLoad;

function pageLoad() {
    // ผูก Event ให้กับฟอร์มเมื่อมีการกดปุ่ม Submit เพื่อเรียกใช้งาน validateForm
    const form = document.getElementById("myRegister"); //ค้นหาแท็ก ในตัวhtml id myRegister เก็บค่าตัวแปรเป็นform
    form.onsubmit = validateForm; //เมื่อฟอร์มนี้มีการกดสั่งข้อมูลsubmit ให้เรียกฟังก์ชันvalidateForm
}

function validateForm(event) { //ประกาศฟังก์ชั่นตรวจสอบข้อมูล รับตัวแปร evet เพื่อคุมฟอร์ม
    const errorMsg = document.getElementById("errormsg"); //เตรียมแสดงข้อความแจ้งเตือนสีแดง
    const username = document.forms["myRegister"]["username"].value.trim(); //ดึงข้อความที่กรอกในช่องusername มาตัดช่องว่างส่วนเกินหน้าและหลังออกด้วย .trim() แล้วเก็บไว้ในตัวแปร username
    const passwords = document.forms["myRegister"]["password"]; //ดึงค่ากลุ่มช่องกรอกรหัสผ่านทั้งหมดจากฟอร์มpasswordsดึงค่าในช่องแรกมาเก็บไว้ในตัวแปร password และค่าในช่องที่สองมาเก็บใน retypePassword
    const password = passwords[0].value;
    const retypePassword = passwords[1].value;

    // 1. ตรวจสอบว่า Password ทั้ง 2 ช่องตรงกันหรือไม่ ถ้าไม่ตรงกันให้แจ้งเตือน และให้ return false
    if (password !== retypePassword) { //ตรวจสอบว่าตัวแปร Password ไม่เท่ากับค่าในretypePassword
        errorMsg.innerHTML = "Password ทั้ง 2 ช่องไม่ตรงกัน กรุณากรอกใหม่อีกครั้ง"; //ดึงข้อความแจ้งเตือน ไปแทรกใส่ในแท็ก HTML (ที่อ้างอิงผ่านตัวแปร errorMsg) เพื่อแสดงข้อความให้ผู้ใช้เห็นบนหน้าเว็บ
        event.preventDefault(); //สั่งไม่ให้เว็บเปลี่ยนหน้า บังแก้ข้อมูล
        return false; //สั่งจบฟังก์ชัน แล้วส่งค่าว่าเท็จ
    }
    // 2. เคลียร์ข้อความแจ้งเตือนถ้าผ่านการตรวจสอบ
    errorMsg.innerHTML = ""; //หากรหัสผ่านไม่ตรง จะล้างข้อความแจ้งเตือนสีแดงให้กลับมาเป็นช่องว่างๆ

    // 3. บันทึกข้อมูลลงใน localStorage ทีละตัว
    // เพื่อความปลอดภัย: รหัสผ่านไม่ปรากฏบน Browser Address Bar และ Browser History
    localStorage.setItem("username", username); //บันทึกค่าตัวแปรusername ลงในตัวlocalStorage
    localStorage.setItem("password", password);//บันทึกค่าตัวแปรpassword ลงในตัวlocalStorage
    alert("ลงทะเบียนสำเร็จ! ระบบบันทึกข้อมูลเรียบร้อย กำลังไปที่หน้า Login"); แสดงหน้าต่างป๊อบอัพแจ้งผู็ใช้ลงทะเบียนสำเร็จ
    // 4. นำทางไปหน้า login.html
    event.preventDefault(); //ยกเลิกตัวปุ่ม submint เพื่อให้เปลี่ยนไปหน้าlogin
    window.location.href = "login.html"; บังคับเปลี่ยนเส้นทาง
    return true; //คืนค่าเพราะทำงานเสร็จสมบูรณ์
}