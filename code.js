let gettodaysword=function(){
    let date=new Date()
    let day=date.getDate()
    let month=date.getMonth()+1
    let year=date.getFullYear()
    let url=`https://www.nytimes.com/svc/wordle/v2/${year}-${month}-${day}.json`
      
      
    }
let todaysword=null
const menu=document.getElementById("menu")
const game=document.getElementById("game")
const results=document.getElementById("result")
const listofwords= ["about", "above","abuse", "actor", "acute", "admit", "adopt", "adult", "after", "again", "agent", "agree", "ahead", "alarm", "album", "alert", "alike", "alive", "allow", "alone", "along", "alter", "among", "anger", "angle", "angry", "apart", "apple", "apply", "arena", "argue", "arise", "array", "aside", "asset", "audio", "audit", "avoid", "award", "aware", "badly", "baker", "bases", "basic", "basis", "beach", "began", "begin", "begun", "being", "below", "bench", "billy", "birth", "black", "blame", "blind", "block", "blood", "board", "boost", "booth", "bound", "brain", "brand", "bread", "break", "breed", "brief", "bring", "broad", "broke", "brown", "build", "built", "buyer", "cable", "calif", "carry", "catch", "cause", "chain", "chair", "chart", "chase", "cheap", "check", "chest", "chief", "child", "china", "chose", "civil", "claim", "class", "clean", "clear", "click", "clock", "close", "coach", "coast", "could", "count", "court", "cover", "craft", "crash", "cream", "crime", "cross", "crowd", "crown", "curve", "cycle", "daily", "dance", "dated", "dealt", "death", "debut", "delay", "depth", "doing", "doubt", "dozen", "draft", "drama", "drawn", "dream", "dress", "drill", "drink", "drive", "drove", "dying", "eager", "early", "earth", "eight", "elite", "empty", "enemy", "enjoy", "enter", "entry", "equal", "error", "event", "every", "exact", "exist", "extra", "faith", "false", "fault", "fiber", "field", "fifth", "fifty", "fight", "final", "first", "fixed", "flash", "fleet", "floor", "fluid", "focus", "force", "forth", "forty", "forum", "found", "frame", "frank", "fraud", "fresh", "front", "fruit", "fully", "funny", "giant", "given", "glass", "globe", "going", "grace", "grade", "grand", "grant", "grass", "great", "green", "gross", "group", "grown", "guard", "guess", "guest", "guide", "happy", "harry", "heart", "heavy", "hence", "henry", "horse", "hotel", "house", "human", "ideal", "image", "index", "inner", "input", "issue", "japan", "jimmy", "joint", "jones", "judge", "known", "label", "large", "laser", "later", "laugh", "layer", "learn", "lease", "least", "leave", "legal", "level", "lewis", "light", "limit", "links", "lives", "local", "logic", "loose", "lower", "lucky", "lunch", "lying", "magic", "major", "maker", "march", "maria", "match", "maybe", "mayor", "meant", "media", "metal", "might", "minor", "minus", "mixed", "model", "money", "month", "moral", "motor", "mount", "mouse", "mouth", "movie", "music", "needs", "never", "newly", "night", "noise", "north", "noted", "novel", "nurse", "occur", "ocean", "offer", "often", "order", "other", "ought", "paint", "panel", "paper", "party", "peace", "peter", "phase", "phone", "photo", "piece", "pilot", "pitch", "place", "plain", "plane", "plant", "plate", "point", "pound", "power", "press", "price", "pride", "prime", "print", "prior", "prize", "proof", "proud", "prove", "queen", "quick", "quiet", "quite", "radio", "raise", "range", "rapid", "ratio", "reach", "ready", "refer", "right", "rival", "river", "robin", "roger", "roman", "rough", "round", "route", "royal", "rural", "scale", "scene", "scope", "score", "sense", "serve", "seven", "shall", "shape", "share", "sharp", "sheet", "shelf", "shell", "shift", "shirt", "shock", "shoot", "short", "shown", "sight", "since", "sixth", "sixty", "sized", "skill", "sleep", "slide", "small", "smart", "smile", "smith", "smoke", "solid", "solve", "sorry", "sound", "south", "space", "spare", "speak", "speed", "spend", "spent", "split", "spoke", "sport", "staff", "stage", "stake", "stand", "start", "state", "steam", "steel", "stick", "still", "stock", "stone", "stood", "store", "storm", "story", "strip", "stuck", "study", "stuff", "style", "sugar", "suite", "super", "sweet", "table", "taken", "taste", "taxes", "teach", "teeth", "terry", "texas", "thank", "theft", "theme", "there", "these", "thick", "thing", "think", "third", "those", "three", "threw", "throw", "tight", "times", "tired", "title", "today", "topic", "total", "touch", "tough", "tower", "track", "trade", "train", "treat", "trend", "trial", "tried", "tries", "truck", "truly", "trust", "truth", "twice", "under", "undue", "union", "unity", "until", "upper", "upset", "urban", "usage", "usual", "valid", "value", "video", "virus", "visit", "vital", "voice", "waste", "watch", "water", "wheel", "where", "which", "while", "white", "whole", "whose", "woman", "women", "world", "worry", "worse", "worst", "worth", "would", "wound", "write", "wrong"]
createMenu()
let home=true


function createMenu(){
results.innerHTML=""
menu.innerHTML=`
<h1><span id="spantitle">W</span>ORDLE</h1>
<button id="practicebtn"><b>JUGAR</b></button>
`
document.getElementById("practicebtn").onclick=function(){
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

let keys=[]
setup()
function setup(){
menu.innerHTML=``
createSquares()
createKeyboard()
function createSquares(){
let squarescontainer=document.createElement("div")
squarescontainer=game.appendChild(squarescontainer)
squarescontainer.className="squarescontainer"

for (let index = 0; index < 30; index++) {
    let newSquare=document.createElement("div")
    newSquare=squarescontainer.appendChild(newSquare)
    newSquare.className="square"
    newSquare.style.left=(index%5)*6+15+"vw"
    newSquare.style.top=(Math.floor(index/5))*12+3+"vh";
    if (index==0){
        newSquare.classList.add("selected")
    }
    squares.push(newSquare)
    
}
}
function createKeyboard(){
let keyboard=document.createElement("div")
keyboard=game.appendChild(keyboard)
keyboard.id="keyboard"
const chart=["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","Backspace","z","x","c","v","b","n","m","Enter"]
let group=0
let idx=0
for (let index = 0; index < chart.length; index++) {
    let newSquare=document.createElement("div")
    newSquare=keyboard.appendChild(newSquare)
    newSquare.className="keyspace normal"
    if (index==19||index==chart.length-1){
    newSquare.classList.add(chart[index])
    }else{
    newSquare.innerText=chart[index].toUpperCase()
    }
    newSquare.onclick=function(){writealetter(chart[index].toUpperCase())}
    newSquare.style.left=4*idx+"vw"
    newSquare.style.top=group*10+"vh"
    if (index==9||index==18){
        group++
        idx=0
    }else{
        idx++
    }
    keys.push(newSquare)
}

}
}

document.addEventListener("keydown",function(){
    if (home==false){
    let key=event.key
    key=key.toUpperCase()
    writealetter(key)
    }})

    function writealetter(key){
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
        }}
    }
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
        
        }
        home=false
    }
Validateword(getWord())

        function checkforgoodletters(){
        for (let index = 0; index < 5; index++) {

            let letter=squares[(round-1)*5+index].innerText
            if (letter==word.charAt(index)){
                squares[(round-1)*5+index].classList.add("good")
                for (let i = 0; i < keys.length; i++) {
                    if (keys[i].innerText==letter){
                        keys[i].classList.replace("normal","good")
                    }
                    
                }
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
                for (let i = 0; i < keys.length; i++) {
                if (keys[i].innerText==letter){
                    keys[i].classList.replace("normal","almost")
                }
                }
            }else{
                squares[(round-1)*5+index].classList.add("bad")
                for (let i = 0; i < keys.length; i++) {
                    if (keys[i].innerText==letter){
                        keys[i].classList.replace("normal","bad")
                    }
                    }
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
document.removeEventListener("keydown",function(){
    if (home==false){
    let key=event.key
    key=key.toUpperCase()
    writealetter(key)
    }})
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
datecondition=0
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
    mybar.style.width=(roundwins[index]+(roundwins[index]==0))/games.length*80+"vw"
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
