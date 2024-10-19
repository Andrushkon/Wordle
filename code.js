const todaysword=getodaysword()
async function getodaysword(){
    let date=new Date()
    let month=date.getMonth()+1
    let year=date.getFullYear()
    let url=`https://www.nytimes.com/svc/wordle/v2/${year}-${month}-${day}.json`
    alert(url)
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          const json = await response.json();
          return json.word
        } catch (error) {
          alert(error.message);
        }
      
    }
const menu=document.getElementById("menu")
const game=document.getElementById("game")
const results=document.getElementById("result")
const listofwords=["MORON"]
createMenu()
let home=true


function createMenu(){
results.innerHTML=""
menu.innerHTML=`
<h1><span id="spantitle">W</span>ORDLE</h1>
<button id="dailybtn"><b>DIARIO</b></button>
<button id="practicebtn"><b>PRACTICAR</b></button>
`
document.getElementById("dailybtn").onclick=function(){
home=false
Gamestart(true)
}
document.getElementById("practicebtn").onclick=function(){
home=false
Gamestart(false)
}
}
function Reset(word,round){
    setTimeout(function(){
    ShowResults(word,round)
    },3000)
}
function Gamestart(daily){
//variables
let squares=[]
let selectedsquare=0
let round=1
let word
if (daily){

}else{
word=listofwords[Math.floor(Math.random()*listofwords.length)].toUpperCase()
}
setup()
function setup(){
menu.innerHTML=``
createSquares()
function createSquares(){
let squarescontainer=document.createElement("div")
squarescontainer=game.appendChild(squarescontainer)
squarescontainer.className="squarescontainer"

for (let index = 0; index < 30; index++) {
    let newSquare=document.createElement("div")
    newSquare=squarescontainer.appendChild(newSquare)
    newSquare.className="square"
    newSquare.style.left=(index%5)*6+35.5+"vw"
    newSquare.style.top=(Math.floor(index/5))*12+3+"vh";
    if (index==0){
        newSquare.classList.add("selected")
    }
    squares.push(newSquare)
    
}
}
}
document.addEventListener("keydown",function(){
    if (home==false){
    let key=event.key
    key=key.toUpperCase()
    if (key=="BACKSPACE"){
        if (squares[selectedsquare-1]!==undefined&&selectedsquare-1>(round-1)*5-1){
        selectedsquare--
        squares[selectedsquare].innerText=""
        squares[selectedsquare+1].classList.remove("selected")
        squares[selectedsquare].classList.add("selected")
        }
    }else if(key=="ENTER"&&round*5==selectedsquare){
    home=true
    checkWord()
    }else{
    if (isaLetter(key)&&round*5!==selectedsquare){
    squares[selectedsquare].innerText=key
    if (round*5-1!==selectedsquare){
    squares[selectedsquare].classList.remove("selected")
    squares[selectedsquare+1].classList.add("selected")
    }
    selectedsquare++
    }}}})
    function isaLetter(letter){
        let chart="abcdefghijklmnopqrstuvwxyz"
        chart=chart.toUpperCase()
        for (let index = 0; index < chart.length; index++) {
            if (letter==chart.charAt(index)){
                return true
            }
            
        }
        return false
    }
    function checkWord(){



function getWord(){
    let myword=""
    for (let index = 0; index < 5; index++) {
        myword=myword+squares[(round-1)*5+index].innerText
        
    }
    return myword
}
async function Validateword(word) {
  await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  ).then((response) =>{maincheck(response)})


  
}
let repeatedletters=[]
let maincheck=function(myword){
    if (myword.status!==404){
        if (round+1<7){
        squares[selectedsquare-1].classList.remove("selected")
        squares[selectedsquare].classList.add("selected")
        }
        checkforgoodletters()
        if (repeatedletters.length==5){
            return Reset(word,round)
        }
        checkforrepeatedletters()
        round++
        if (round>6){
            return Reset(word,round)
        }
        home=false
        }
}
Validateword(getWord())

        function checkforgoodletters(){
        for (let index = 0; index < 5; index++) {

            let letter=squares[(round-1)*5+index].innerText
            if (letter==word.charAt(index)){
                squares[(round-1)*5+index].classList.add("good")
                repeatedletters.push(letter)
            }
        }
        }
        function checkforrepeatedletters(){
            for (let index = 0; index < 5; index++) {
            let letter=squares[(round-1)*5+index].innerText
            if (letter!==word.charAt(index)){
            if (checkforcontaining(letter)){
                squares[(round-1)*5+index].classList.add("almost")
            }else{
                squares[(round-1)*5+index].classList.add("bad")
            }
        }
        }
        }
        

            function checkforcontaining(letter){
                let myArray=repeatedletters
            for (let idx = 0; idx < 5; idx++) {
                if (word.charAt(idx)==letter){
                if (searchforrepeatedletters(letter)){
                repeatedletters.push(letter)
                return true
                }
                }
            }
            return false
            function searchforrepeatedletters(letter){
                for (let index = 0; index < myArray.length; index++) {
                    if (myArray[index]==letter){
                        myArray.splice(index,1)

                        return false
                    }
                }
                return true
             }

        
    }
}
}
function ShowResults(word,round){

let games=localStorage.getItem("games")
if (games!==null){
games=games.split(",")
for (let index = 0; index < games.length; index++) {
    games[index]=games[index].split("/")
    games[index][1]=games[index][1].split("-")
}
}else{
games=[]
}
let myArray=[round,getcurrentedate()]
games.push(myArray)
let nofgames=games.length
let winrate=0
let roundwins=[0,0,0,0,0,0]
for (let index = 0; index < games.length; index++) {
    let myround=parseInt(games[index][0])
    winrate+=(myround<7)
    roundwins[myround-1]++
}
winrate=Math.round(winrate/games.length*100)

let streak=localStorage.getItem("streak")
let currentstreak
let maxstreak
if (streak==null||streak==undefined){
    currentstreak=0
    maxstreak=0
}else{
streak=streak.split(",")
currentstreak=streak[0]
maxstreak=streak[1]
}
let datecondition
if (games.length>1){
let myday=games[games.length-2][1]
datecondition=checkDate(myday[0],myday[1],myday[2])
}
else{
datecondition=2
}
if (datecondition==0){
    if (round<7){
currentstreak++
if (currentstreak>maxstreak){
    maxstreak=currentstreak
}
}else{
    currentstreak=0
}
}else if (datecondition==1){
alert("wz")
}else{
    if (round<7){
currentstreak=1
if (currentstreak>maxstreak){
    maxstreak=currentstreak
}
}else{
    currentstreak=0
}
}

streak=[currentstreak,maxstreak]
streak=streak.join(",")
localStorage.setItem("streak",streak)

for (let index = 0; index < games.length; index++) {
    games[index][1]=games[index][1].join("-")
    games[index]=games[index].join("/")

}
games=games.join(",")
localStorage.setItem("games",games)
game.innerHTML=""
results.innerHTML=`
    <div id="resultbar">
        <h1 style="font-size: 6vh;">RESULTADOS</h1>
    <div id="resultvaluescontainer">
        <span class="resultvalues">${nofgames}</span>
        <span class="resultnames">NUMERO DE PARTIDAS</span>
        <br>
        <br>
        <br>
        <span class="resultvalues">${winrate}%</span>
        <span class="resultnames">WIN %</span>
        <br>
        <br>
        <br>
        <span class="resultvalues">${currentstreak}</span>
        <span class="resultnames">RACHA ACTUAL</span>
        <br>
        <br>
        <br>
        <span class="resultvalues">${maxstreak}</span>
        <span class="resultnames">MEJOR RACHA</span>
    </div>
    <br>
    <div id="wingraphic">
        <h3>GRAFICO</h3>
        <div class="graphic">
            <span>1</span>
            <div id="g1" class="bargraphic">${roundwins[0]}</div>
        </div>
        <div class="graphic">
            2
            <div id="g2" class="bargraphic">${roundwins[1]}</div>
        </div>
        <div class="graphic">
            3
            <div id="g3" class="bargraphic">${roundwins[2]}</div>
        </div>
        <div class="graphic">
            4
            <div id="g4" class="bargraphic">${roundwins[3]}</div>
        </div>
        <div class="graphic">
            5
            <div id="g5" class="bargraphic">${roundwins[4]}</div>
        </div>
        <div class="graphic">
            6
            <div id="g6" class="bargraphic">${roundwins[5]}</div>
        </div>
    </div>
    <div id="theword"><mark>${word}</mark></div>
    <button id="backbutton">VOLVER</button>
    </div>
`
for (let index = 0; index < 6; index++) {
    let mybar=document.getElementById("g"+(index+1))
    mybar.style.width=(roundwins[index]+(roundwins[index]==0)*games.length/50)/games.length*20+"vw"
    if (round==index+1){
        mybar.style.backgroundColor="orange"
    }

}
document.getElementById("backbutton").onclick=function(){
createMenu()  
}

function getcurrentedate(){
    let date =new Date()
    let day=date.getDate()
    let month=date.getMonth()
    let year=date.getFullYear() 
    return [day,month,year]
}
function checkDate(d,m,y){
d=parseInt(d)
m=parseInt(m)
y=parseInt(y)
let date =new Date()
let day=Number(date.getDate())
let month=Number(date.getMonth())
let year=Number(date.getFullYear())
let sumd=1+(-30*(d==30&&(m+(m>7))%2==0)+-31*(d==31&&(m+(m>7))%2==1))+-29*(m==2&&d==29)
let summ=(d==30&&(m+(m>7))%2==0)||(d==31&&(m+(m>7))%2==1)+-12*(m==12&&d==31)+(m==2&&d==29)
let sumy=(m==12&&d==31)
let nextday=d+sumd
let nextmonth=m+summ
let nextyear=y+sumy
alert([nextday,nextmonth,nextyear,d,m,y])
if (day==nextday&&month==nextmonth&&year==nextyear){
return 0
}else if (d==day&&m==nextmonth&&y==year){
    return 1
}else{
    return 2
}
}
}
function consolelog(something){
    document.getElementById("consola").innerText=something
}
