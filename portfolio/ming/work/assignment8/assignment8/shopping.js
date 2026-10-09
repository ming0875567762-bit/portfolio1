// สั่งให้รันฟังก์ชัน pageload เมื่อหน้าเว็บโหลดเสร็จ
window.onload = pageload;
function pageload() {
    // สร้าง XMLHttpRequest เพื่อดึงข้อมูลไฟล์ JSON
    var xhr = new XMLHttpRequest(); //*สร้างตัวแปร xhr ขึ้นมาโดยใช้คลาส XMLHttpRequest เพื่อใช้เป็นเครื่องมือในการดึงข้อมูลจากภายนอก
    xhr.open("GET", "cloth.json"); //*ใช้คำสั่ง xhr.open("GET", "cloth.json") เพื่อเตรียมโหลดข้อมูลด้วยวิธี GET จากไฟล์ชื่อ cloth.json

    // เมื่อโหลดข้อมูลสำเร็จ
    xhr.onload = function() { //*กำหนดฟังก์ชันการทำงานให้ xhr.onload ซึ่งจะถูกเรียกเมื่อเซิร์ฟเวอร์ส่งข้อมูลกลับมาสำเร็จ
        var data = JSON.parse(xhr.responseText); //*แปลงข้อมูลตัวอักษรที่ได้จากxhr.responseTextให้กลายเป็นข้อมูลรูปแบบ JavaScript Object (Array/JSON) ด้วย JSON.parseแล้วเก็บไว้ในตัวแปร data
        showData(data); //*ส่งตัวแปร data ที่แปลงข้อมูลแล้วเข้าไปทำงานต่อในฟังก์ชัน showData(data) เพื่อนำไปแสดงผลบนหน้าเว็บ
    };



    // ส่งคำขอ
    xhr.send(); //*คำสั่งxhr.sendเพื่อส่งคำขอ (Request) ไปเพื่อดึงข้อมูลจากไฟล์cloth.json
}

function showData(data) { //*ประกาศสร้างฟังก์ชันชื่อ showData(data) ซึ่งรับพารามิเตอร์เป็นข้อมูลสินค้า data ที่แปลงมาจากไฟล์ JSON แล้ว
    // ดึง div ย่อยทั้งหมดใน #layer
    var layerDivs = document.querySelectorAll("#layer > div"); //*ใช้คำสั่งdocument...เพื่อเก็บไว้กล่องdivของสินค้าทุกกล่องไว้ในตัวแปรชื่อ layerDivs (เป็นรูปแบบ Array/List)

    for (var i = 0; i < data.length; i++) { //*เริ่มต้นคำสั่งวนลูป for โดยให้ตัวแปร i เริ่มจาก 0 วนไปจนครบจำนวนข้อมูลใน data (data.length) เพื่อนำสินค้าทีละชิ้นมาแสดงผล
        
        // สร้าง img สำหรับแสดงรูปภาพสินค้า
        var img = document.createElement("img"); //*สร้างแท็ก HTMLรูปภาพด้วยคำสั่ง document.createElement("img") แล้วเก็บไว้ในตัวแปร img
        img.src = "pic/" + data[i].img; //*กำหนดลิงก์ที่อยู่ของรูปภาพให้กับ img.src โดยนำข้อความ "pic/" ไปต่อกับชื่อไฟล์รูปจากข้อมูล JSON เช่น data[i].img 
        img.style.width = "100%";

        // สร้าง p แสดงชื่อแบรนด์
        var pBrand = document.createElement("p"); //*สร้างแท็กพารากราฟ สำหรับแสดงชื่อแบรนด์ด้วยคำสั่ง document.createElement เก็บไว้ในตัวแปร pBrand
        pBrand.textContent = data[i].brand; //*นำชื่อแบรนด์จากข้อมูล JSON (data[i].brand) มาใส่เป็นข้อความภายในแท็ก p 
        // สร้าง p แสดงราคา
        var pPrice = document.createElement("p");
        pPrice.textContent = "Price: " + data[i].price + " Baht";

        // เอา element ทั้งหมดใส่ใน div ของแต่ละกล่องตามลำดับ
        layerDivs[i].appendChild(img); //*นำแท็กรูปภาพ (img) ใส่เข้าไปในกล่อง div ลำดับที่ i ด้วยคำสั่ง appendChild
        layerDivs[i].appendChild(pBrand);
        layerDivs[i].appendChild(pPrice);
    }
}