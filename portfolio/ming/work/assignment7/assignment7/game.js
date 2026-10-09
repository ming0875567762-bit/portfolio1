// =============================================================================
// MDT312 Assignment 7  - Square Game
// Modern JavaScript: DOM, Event, Timer
// =============================================================================

window.onload = pageLoad;
// Global timer reference เพื่อให้สามารถควบคุมและเคลียร์สถานะได้ถูกต้อง
let timer = null;

function pageLoad(){
    // 1. ผูกเหตุการณ์คลิกปุ่ม Start ด้วย const
    const startBtn = document.getElementById("start"); //ดึงปุ่ม Start จากหน้า HTML มาเก็บไว้ในตัวแปร startBtn
    startBtn.onclick = startGame;

    // 2. ใช้ Event Delegation:
    // ผูก event ไว้ที่กล่องแม่ #layer เพียงจุดเดียว
    // เมื่อมีการคลิกเกิดขึ้น ให้ใช้ event.target ตรวจสอบว่าเป็นกล่อง .square หรือไม่
    const gameLayer = document.getElementById("layer");
    gameLayer.onclick = function(event) {
        if (event.target.classList.contains("square")) {
            event.target.remove();
        }
    }
}
function startGame(){
    alert("Ready");
    clearScreen(); // ล้างกล่องเก่าออกก่อนเริ่มรอบใหม่
    addBox();
    timeStart();
}
function timeStart(){
    const TIMER_TICK = 1000;
    // เคลียร์ timer เดิมก่อนเริ่มนับใหม่ เพื่อป้องกันการนับเวลาเร่งความเร็วเมื่อกด Start ซ้ำ
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }

    const min = 0.1; // 0.5 minute = 30 seconds
    let second = min * 60; 
    const clockDisplay = document.getElementById('clock');
    clockDisplay.textContent = second;
    
    // setting timer using setInterval function
    timer = setInterval(timeCount, TIMER_TICK);
    
    function timeCount(){
        const allbox = document.querySelectorAll("#layer div");
        
        // ลดเวลาก่อนแล้วอัปเดตหน้าจอ
        second--;
        clockDisplay.textContent = second;

        // 1. ถ้าไม่มีกล่องเหลือแล้ว จะขึ้นว่า You win!
        if (allbox.length === 0) {
            clearInterval(timer);
            timer = null;
            alert("You win!");
        } 
        // 2. ถ้าเวลาหมด แต่ยังมีกล่องเหลืออยู่ จะบอกว่า Game over และทำการ clear screen
        else if (second <= 0) {
            clearInterval(timer);
            timer = null;
            alert("Game over!");
            clearScreen();
        }
    }
}

function addBox(){
    // สร้างกล่องตาม input ที่เราใส่
    const numbox = parseInt(document.getElementById("numbox").value) || 0;
    const gameLayer = document.getElementById("layer");
    const colorDrop = document.getElementById("color").value;
    
    for (let i = 0; i < numbox; i++){
        const tempbox = document.createElement("div"); 
        tempbox.className = "square " + colorDrop;   
        tempbox.id = "box" + i;
        tempbox.style.left = Math.random() * (500 - 25) + "px";
        tempbox.style.top = Math.random() * (500 - 25) + "px";
        
        // add element to HTML node 
        gameLayer.appendChild(tempbox);
    }
}
function clearScreen(){
    // ทำการลบ node ของกล่องทั้งหมด ออกจากหน้าจอ
    const allbox = document.querySelectorAll("#layer div"); 

    for (let i = 0; i < allbox.length; i++) {
        allbox[i].remove();
    }
}