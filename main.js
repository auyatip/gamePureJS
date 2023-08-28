//--- Please copy and paste your GitHub Repo on line 2 (optional) ---//
// <GitHub Repo>

// JavaScript Assessment Rubric: https://generation.instructure.com/courses/2342/assignments/143783

// Codecademy: https://www.codecademy.com/paths/front-end-engineer-career-path/tracks/fecp-javascript-syntax-part-iii/modules/fecp-challenge-project-find-your-hat/projects/find-your-hat

// Please break down your thinking process step-by-step (mandatory)

    
    // step 1: กำหนดค่าเริ่มต้น
                // กำหนด สัญลักษณ์ ไปใน แต่ละตัวแปร hat, hold, fieldCharacter,pathCharacter
    // step 2: สร้างคลาส Field
                // สร้าง Class และ สร้าง Method 
                // ---> สามารถอ่าน Comment ได้ ในแต่ละ method ตามลำดับ code ครับ
    // step 3: สร้าง static class method generateMap()
                // สร้าง method โดยการสร้างแผนที่ของเกมส์ ด้วย array 2 มิติ โดยมีสัดส่วนตาม percentage พื้นที่เป็น พื้นที่ว่าง และ หลุม
                // ติดปัญหาตอนท้าย คือการสุ่มตำแหน่ง จุดเริ่มต้น จึง ต้องนำ Hat ออกมาจาก Static class เพื่อมาเช็คเงื่อนไข ไม่ให้เป็นจุดเดียวกัน
                // จึงนำ การสุ่มตำแหน่ง หมวก และ จุดเริ่มต้น มาเป็น function ภายใน global class เพื่อนำ ค่าของจุดเริ่มต้น มาคำนวน ใน control ตำแหน่งการเคลื่อนที่
                // และ สร้างเงื่อนไข ไม่ให้ หมวก และ จุดเริ่มต้น เป็นจุดเดียวกัน
    // step 4: สร้างแผนที่(การสุ่มตำแหน่ง หมวก และจุดเริ่มต้น, และ ความกว้าง ความยาว ของ array )และ เริ่มเกม
                // ป้อนค่า ค่า New array > width, height และ percentage(สัดส่วนที่ว่างกับหลุม) และ 
                // เรียกใช้ method การสุ่ม ตำแหน่งเริ่มต้น และ หมวก
                // เรียกใช้ method เช็คผลการจบเกมส์ และ เรียกใช้ funtion print() ออกมาแสดงผลและ funtion control player ที่อยู่ในภายใน method resultGame


// JS Assessment: Find your hat //

const prompt = require('prompt-sync')({ sigint: true }); // This sends a SIGINT, or “signal interrupt” message indicating that a user wants to exit a program by press Crtl+c
const clear = require('clear-screen');//every turn clear the screen that meant you will not get new field in time you choose the direction
const hat = '🏆';
const hole = '🌊';
const fieldCharacter = '🔷';
const pathCharacter = '🚣';
//สร้าง Class ชื่อ Field รับ พารามิเตอร์ array เพื่อกำหนดค่าเริ่มต้นให้กับ field
class Field {
    constructor(aray = [[]]) {
      this.field = aray;
      // this.locationX = 0;
      // this.locationY = 0;

    }

// นี่คือขั้นตอนสุดท้าย --> แก้ไข player จากจุด 0,0 เป็นการสุ่มตำแหน่งของ Player และ Hat โดยไม่ให้เป็นจุดเดียวกัน
// ตอนแรกเกิดปัญหา เพราะการสุ่มหมวกอยู่ใน Static จึงทำการทดลองหลายวิธี และได้วิธีนี้ในที่สุด
      randomPlayerAndHat(){
        // สร้างตำแหน่งของ hat โดยการสุ่ม แล้วค่อยไปเช็ค do-while
        const hatLocation = {
            x: Math.floor(Math.random() * this.field[0].length),
            y: Math.floor(Math.random() * this.field.length)
        };
        // ทำการ Do ก่อน คือ สุ่มตำแหน่งผู้เล่นมา LocationX,LocationY เพิ่อนำไปเทียบกับ hat.X และ hat.Y 
        do {
            this.locationX = Math.floor(Math.random() * this.field[0].length);
            this.locationY = Math.floor(Math.random() * this.field.length);    
            // เมื่อ random ตำแหน่งผู้เล่นได้ จะมาเช็ค เงื่อนไข ถ้าตำแหน่งซ้ำกัน จะวนกลับไปสุ่มใหม่
        } while (this.locationX === hatLocation.x && this.locationY === hatLocation.y);
        
          // แทนสัญลักษณ์ hat และ partCharacter ไปในตำแหน่งที่คำนวนมาจากข้างบน โดยต้องไม่ซ้ำกัน
        this.field[hatLocation.y][hatLocation.x] = hat;
        this.field[this.locationY][this.locationX] = pathCharacter;
      }
// Method เพื่อแสดงแผนที่ในรูปแบบข้อความ
    print() {
      clear();
      // สร้างตัวแปล displayString เก็บ this.field อ้างอิงมาจาก array 2 มิติที่ได้สร้างมา ,
      // ใช้ .Map() ในการวนลูปในแต่ละแถว และใช้ .join('') เพื่อรวมสมาชิกในแถวนั้นเป็นสตริงเดียวกัน
      const displayString = this.field.map(row => {
      // ได้ผลลัพธ์จากการใช้ .map() ที่แปลงแต่ละแถวใน field เป็นสตริงเดียวกัน 
      //ต่อมาเราใช้ .join('\n')  เพื่อรวมสตริงที่ได้จากการ map โดยการขึ้นบรรทัดใหม่ \n จะทำให้ข้อมูล เรียงเป็นแนวดิ่ง
        return row.join('');
      }).join('\n');
      // แสดงผล log ตัว displayString เป็น Array ที่เก็บ string 
      console.log(displayString);
    }

// Method ควบคุมการเคลื่อนที่ โดยการใช้ Switch เพราะสามารถ เลือก KEY ที่ต้องการได้เลย 
    controlPlayer(){
      // prompt คำสั่งในการรับ input Key มาจาก แป้นพิมพ์ โดยเปลี่ยนเป็นตัวพิมพ์ใหญ่
      const answer = prompt(`Which you will go: `).toUpperCase();
      // เช็คค่า asnwer ที่รับเข้ามา ตาม เงื่อนไข 'case' (W,A,S,D)
      switch (answer){
        case 'W':
          //ตำแหน่ง แกน Y ขึ้น ไป 1 ช่อง
            this.locationY -= 1;
            break;
        case 'S':
           //ตำแหน่ง แกน Y ลง ไป 1 ช่อง
            this.locationY += 1;
            break;
        case 'A':
           //ตำแหน่ง แกน X ไปด้านซ้าย 1 ช่อง
            this.locationX -= 1;
            break;
        case 'D':
          //ตำแหน่ง แกน X ไปด้านซ้าย 2 ช่อง
            this.locationX += 1;
            break;
        default:
          //ถ้าไม่กด ตาม Key ด้านบน จะแสดงให้ กรอกใหม่ โดยการ วนไปรับค่า ที่ control ใหม่
          console.log('Press W, A, S, D')
          this.controlPlayer();
          break;
      }
    }

// Method เพื่อตรวจสอบว่าตำแหน่งของผู้เล่นอยู่ในขอบเขตของแผนที่หรือไม่?
    isInBox() {
      return (this.locationY >= 0 && this.locationX >= 0 && this.locationY < this.field.length && this.locationX < this.field[0].length)
    }
// Method เพื่อตรวจสอบว่าตำแหน่งที่ผู้เล่นอยู่นั้นมีหมวกหรือไม่?
    isHat() {
      return this.field[this.locationY][this.locationX] === hat;
      }
// Method เพื่อตรวจสอบว่าตำแหน่งที่ผู้เล่นอยู่นั้นเป็นหลุมหรือไม่?
    isHole() {
      return this.field[this.locationY][this.locationX] === hole;
    }

// Method เพื่อเริ่มเกม ในขณะที่เกมยังไม่จบ จะแสดงแผนที่และรับคำสั่งเคลื่อนที่จากผู้เล่น,ตรวจสอบเงื่อนไขการเล่น 
// ถ้าผู้เล่นออกนอกขอบเขต หาหมวก หรือตกลงหลุมก็จะจบเกม
    resultGame(){
        // ตั้งค่าตัวแปล ให้เป็น Boolean True เพื่อเช็ค เกมส์ OVER
        let play = true; 
        while(play){
          //แสดงแผนที่ตำแหน่ง จากการ Gennerate มา
      this.print()
          //ฟังก์ชั่น การควบคุม เรียกมาเพื่อใช้
      this.controlPlayer()
          // เช็คเงื่อนการจบเกมส์ และ เริ่มเกมส์ใหม่
          // ถ้า ไม่ได้อยู่ในกรอบ array
          if (!this.isInBox()) {
            // แสดง GameOver
            console.log('💥GameOver💥.You are out of sea.')
            // เปลี่ยน play เป็น false และจบเกมส์
            play = false;
            break;
          // ถ้า เป็น this.isHat หรือ ตำแหน่งของหมวก
          }else if (this.isHat()){
            // แสดง Congratulation
            console.log('🏆Congratulation🏆. You Found the One-piece.')
            // เปลี่ยน play เป็น false และจบเกมส์
            play = false;
            break;
          // ถ้า เป็น this.isHole หรือ ตำแหน่งของหลุม
          }else if (this.isHole()){
            // แสดง GameOver
            console.log('💥GameOver💥. 🌊Ocean waves destroy your boat.');
            // เปลี่ยน play เป็น false และจบเกมส์
            play = false;
            break;
          }
          //ถ้าเกมส์ไม่ OVER จะอัพเดรท ตำแหน่งปัจจุบันของผู้เล่น
          this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }

//// กำหนดความกว้างของแผนที่โดย height X width และ percentage คือความน่าจะเป็นของหลุมที่จะเกิดขึ้น 
//// เช่น 0.1 แล้ว คือ ในแผนที่จะมีหลุมไม่เกิน 10% ของพื้นที่ทั้งหมด เป็นต้น (สัดส่วนของ พื้นที่เปล่า กับ หลุม)
  static generateMap(height, width, percentage){
    //สร้างตัวแปล เก็บ Array ใหม่ โดยการกำหนด ความกว้าง ความสูง
    //Array(height): ส่วนนี้จะสร้าง Array ที่มีคขนาดเท่ากับค่า height ที่ถูกป้อนเข้ามา 
    //เช่นถ้า height เท่ากับ 3 จะได้ Array [undefined, undefined, undefined].
    //.fill(0) ใช้เพื่อใส่ค่า 0 เข้าไปในแต่ละช่อง ของ Array [0, 0, 0]
    //ส่วนสุดท้ายนี้ใช้ .map() เพื่อ แปลง index แต่ละตัว ให้กลายเป็น array ที่มีขนาด width
          const field = Array(height).fill(0).map(ele => new Array(width));
          for (let y = 0; y < height; y++){
            for(let x = 0; x < width; x++){
              // เก็บตัวแปร แบบสุ่มไว้ เพื่อเติมแต่ละตำแหน่ง
              const value = Math.random();
              //แต่ละครั้งที่วน จะเติมสัญลักษณ์เข้าไปในแต่ละตำแหน่ง
              field[y][x] = value > percentage ? fieldCharacter : hole;
            }
          }
    return field;g
    }
}
// กำหนดความกว้างของเกมส์ 10 columns 20 rows ความยาว 0.2 หรือ 20% ของสัดส่วนพื้นที่ว่างกับหลุม
const myField = new Field(Field.generateMap(10, 20,0.2));
//ใช้งานฟังก์ชั่นการ สุ่มตำแหน่งเริ่มต้นของผู้เล่น และ ตำแหน่งของหมวก ซึ่งจะไม่ใช่ตำแหน่งเดียวกัน
myField.randomPlayerAndHat()
//เช็คผลของเกมส์ แพ้ ชนะ
myField.resultGame()

