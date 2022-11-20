const sectionBattleArena = document.getElementById('battle-arena')
const buttonPlayerMokepon=document.getElementById('button-mokepon')
const buttonRestart = document.getElementById('button-restart')
const spanMokeponPlayer = document.getElementById('mokepon-player')
const imgMokeponPlayer= document.getElementById('img-mokepon-player')
const sectionChooseMokepon = document.getElementById('choose-mokepon')
const spanMokeponOpponent = document.getElementById('mokepon-opponent')
const imgMokeponOpponent= document.getElementById('img-mokepon-opponent')

const contentMokepon=document.getElementById('content-mokepon')
const contentAttacks=document.getElementById('content-attacks')

const sectionMap=document.getElementById('view-map')
const map=document.getElementById('map')

const baseURL='http://localhost:8080'
const maxmapwidth=350
const maxbarlives=100
const maxgames=5
let playerid
let mokepons=[]
let opponentmokepons=[]
let attacksplayer=[]
let attacksopponent=[]
let playerMokepon
let opponentMokepon
let playerVictories=0
let opponentVictories=0
let interval
let canvas=map.getContext("2d")
let mapwidth=window.innerWidth-20
if (mapwidth>maxmapwidth) 
    mapwidth=maxmapwidth-20
map.width=mapwidth
map.height=mapwidth*600/800

class Mokepon{
    constructor(name,image,lives,imagemap=image,master=null){
        this.name=name
        this.image = image
        this.lives= lives
        this.maxlives=lives
        this.attacks=[]
        this.pictureMap=new Image(40,40)
        this.pictureMap.src=imagemap
        this.positionx=randomnumber(0,map.width-this.pictureMap.width)
        this.positiony=randomnumber(0,map.height-this.pictureMap.height)
        this.speedx=0
        this.speedy=0
        this.master=master
    }
    drawMokepon(px=this.positionx,py=this.positiony){
        canvas.drawImage(this.pictureMap,px,py,this.pictureMap.width,this.pictureMap.height)
    }
}
let hipodoge = new Mokepon('Hipodoge', '../assets/mokepons_mokepon_hipodoge_attack.png', 5,'../assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo', '../assets/mokepons_mokepon_capipepo_attack.png', 5,'../assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', '../assets/mokepons_mokepon_ratigueya_attack.png', 5,'../assets/ratigueya.png')
let pydos = new Mokepon('Pydos', '../assets/mokepons_mokepon_pydos_attack.png', 5)
let tucapalma = new Mokepon('Tucapalma', '../assets/mokepons_mokepon_tucapalma_attack.png', 5)
let langostelvis = new Mokepon('Langostelvis', '../assets/mokepons_mokepon_langostelvis_attack.png', 5)

hipodoge.attacks.push(
    {name:'💧', id:'button-watter1',desc:'AGUA'},
    {name:'💧', id:'button-watter2',desc:'AGUA'},
    {name:'💧', id:'button-watter3',desc:'AGUA'},
    {name:'🔥', id:'button-fire',desc:'FUEGO'},
    {name:'🌱', id:'button-plant',desc:'PLANTA'},
)
capipepo.attacks.push(
    {name:'🌱', id:'button-plant1',desc:'PLANTA'},
    {name:'🌱', id:'button-plant2',desc:'PLANTA'},
    {name:'🌱', id:'button-plant3',desc:'PLANTA'},
    {name:'💧', id:'button-watter',desc:'AGUA'},
    {name:'🔥', id:'button-fire',desc:'FUEGO'},
)
ratigueya.attacks.push(
    {name:'🔥', id:'button-fire1',desc:'FUEGO'},
    {name:'🔥', id:'button-fire2',desc:'FUEGO'},
    {name:'🔥', id:'button-fire3',desc:'FUEGO'},
    {name:'💧', id:'button-watter',desc:'AGUA'},
    {name:'🌱', id:'button-plant',desc:'PLANTA'},
)
pydos.attacks.push(
    {name:'💧', id:'button-watter1',desc:'AGUA'},
    {name:'💧', id:'button-watter2',desc:'AGUA'},
    {name:'💧', id:'button-watter3',desc:'AGUA'},
    {name:'🔥', id:'button-fire',desc:'FUEGO'},
    {name:'🌱', id:'button-plant',desc:'PLANTA'},
)
tucapalma.attacks.push(
    {name:'🌱', id:'button-plant1',desc:'PLANTA'},
    {name:'🌱', id:'button-plant2',desc:'PLANTA'},
    {name:'🌱', id:'button-plant3',desc:'PLANTA'},
    {name:'💧', id:'button-watter',desc:'AGUA'},
    {name:'🔥', id:'button-fire',desc:'FUEGO'},
)
langostelvis.attacks.push(
    {name:'🔥', id:'button-fire1',desc:'FUEGO'},
    {name:'🔥', id:'button-fire2',desc:'FUEGO'},
    {name:'🔥', id:'button-fire3',desc:'FUEGO'},
    {name:'💧', id:'button-watter',desc:'AGUA'},
    {name:'🌱', id:'button-plant',desc:'PLANTA'},
)
mokepons.push(hipodoge,capipepo,ratigueya,pydos,tucapalma,langostelvis)
function startGame(){
    sectionMap.style.display = 'none'
    sectionBattleArena.style.display = 'none'
    mokepons.forEach((mokepon) =>{
        let mokeponoptions=`
        <input type="radio" name="mokepon" id=${mokepon.name} />
        <label class="card-mokepon" for=${mokepon.name}>
            <p>${mokepon.name}</p>
            <img src=${mokepon.image} alt=${mokepon.name}>
        </label>
        `
        contentMokepon.innerHTML+=mokeponoptions
    })
    buttonPlayerMokepon.addEventListener('click', choosePlayerMokepon)
    buttonRestart.style.visibility="hidden"
    buttonRestart.addEventListener('click', restartGame)
    joinGame()
}
function joinGame(){
    fetch(baseURL+'/join')
        .then(response => {
            console.log(response)
            if (response.ok){
                response.text()
                    .then(answer => {
                        playerid=answer
                        console.log(answer)
                    })
            }
        })
}
function choosePlayerMokepon(){
    let inputcheck=false
    let index=0
    let inputmokepons=document.querySelectorAll('.cards input')
    inputmokepons.forEach((inputmokepon)=>{
        if (inputmokepon.checked){
            inputcheck=true
            //playerMokepon=mokepons[index]
            playerMokepon=Object.assign(Object.create(Object.getPrototypeOf(mokepons[index])), mokepons[index])
            sectionChooseMokepon.style.display = 'none'
            sectionMap.style.display = 'flex'
            playerMokepon.positionx=randomnumber(0,map.width-playerMokepon.pictureMap.width)
            playerMokepon.positiony=randomnumber(0,map.height-playerMokepon.pictureMap.height)            
            playerMokepon.pictureMap.style.border='1px solid #1F4690'
            spanMokeponPlayer.innerHTML = playerMokepon.name
            imgMokeponPlayer.alt = playerMokepon.name
            imgMokeponPlayer.src=playerMokepon.image            
            showAttacks(playerMokepon.attacks)
            return
        }    
        index++    
    })
    if (inputcheck){
        setMokepon_Player()
        startMap()
//      chooseOpponentMokepon()
    } else
        alert('Selecciona un mokepon')
}
function setMokepon_Player() {
    fetch(baseURL+`/mokepon/${playerid}`,{
        method: "POST",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify({mokepon: playerMokepon.name})
    })
}
//map
function startMap(){
    //map.width=320
    //map.height=240
    interval=setInterval(drawMap,50)
    window.addEventListener('keydown',moveMokepon)
    window.addEventListener('keyup',StopWalking)
}
function drawMap(){
    playerMokepon.positionx+=playerMokepon.speedx
    playerMokepon.positiony+=playerMokepon.speedy
    let backgroundmap=new Image()
    backgroundmap.src='../assets/mokemap.png'
    canvas.clearRect(0,0,map.width,map.height)
    canvas.drawImage(backgroundmap,0,0,map.width,map.height)
    playerMokepon.drawMokepon()
    sendPosition(playerMokepon.positionx,playerMokepon.positiony)
    opponentmokepons.forEach(mokepon => {
        mokepon.drawMokepon()
        //checkConfrontation(mokepon)
    });
    //check confrontation
    if (playerMokepon.speedx!==0 || playerMokepon.speedy!==0){
        opponentmokepons.forEach(mokepon => {
            checkConfrontation(mokepon)
        });
    }
}
function sendPosition(x,y) {
    fetch(`${baseURL}/mokepon/${playerid}/position`,{
        method: "post",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify({ x,y })
    })
    .then(response => {
        if (response.ok){
            response.json()
                .then(({opponents}) => {
                    console.log(opponents)
                    opponentmokepons=opponents.map(opponent => {
                        mokeponName=opponent.mokepon.name || ""
                        //opponentMokepon=mokepons.find(mokepon => mokepon.name === mokeepName)
                        mokepons.forEach(mokepon => {
                            if (mokepon.name===mokeponName){
                                opponentMokepon=Object.assign(Object.create(Object.getPrototypeOf(mokepon)), mokepon)
                        //        return
                            }
                        })
                        opponentMokepon.positionx=opponent.x
                        opponentMokepon.positiony=opponent.y
                        opponentMokepon.master=opponent.id
                        return opponentMokepon
                    })
                })
        }
    })
}
function moveMokepon(event){
    switch (event.key){
        case 'ArrowUp':
            GoUp()
            break
        case 'ArrowDown':
            GoDown()
            break
        case 'ArrowLeft':
            GoLeft()
            break
        case 'ArrowRight':
            GoRight()
            break
        default:
            break
    }
}
function GoUp(){
    if (playerMokepon.positiony>0)
        playerMokepon.speedy=-5
    else
        StopWalking()    
}
function GoLeft(){
    if (playerMokepon.positionx>0)
        playerMokepon.speedx=-5
    else
        StopWalking()
}
function GoDown(){
    if (playerMokepon.positiony<map.height-playerMokepon.pictureMap.height)
        playerMokepon.speedy=5
    else
        StopWalking()
}
function GoRight(){
    if (playerMokepon.positionx<map.width-playerMokepon.pictureMap.width)
        playerMokepon.speedx=5
    else
        StopWalking()
}
function StopWalking(){
    playerMokepon.speedx=0
    playerMokepon.speedy=0
}
function checkConfrontation(mokepon){
    //console.log(playerMokepon)
    //console.log(mokepon)
    if (playerMokepon.positionx>mokepon.positionx+mokepon.pictureMap.width || playerMokepon.positionx+playerMokepon.pictureMap.width < mokepon.positionx || playerMokepon.positiony > mokepon.positiony+mokepon.pictureMap.height || playerMokepon.positiony+playerMokepon.pictureMap.height>=mokepon)
        return
    StopWalking()
    clearInterval(interval)
    opponentid=mokepon.master
    //console.log('new confrontation')
    sectionBattleArena.style.display = 'flex'
    sectionMap.style.display = 'none'
    chooseOpponentMokepon(mokepon)
}
//
//attacks
function showAttacks(attacks){
    attacks.forEach((attack) =>{
        let mokeponAttacks=`
        <button id=${attack.id} class="button-attack" value=${attack.desc} >${attack.name}</button>
        `
        contentAttacks.innerHTML+=mokeponAttacks
    })
}
function sequenceAttacks(){
    let buttonsAttacks=document.querySelectorAll('.button-attack')
    buttonsAttacks.forEach((buttonAttack) => {
        buttonAttack.addEventListener('click', (e) => {
            attacksplayer.push(buttonAttack.value)
            buttonAttack.style.background='#001D6E'
            buttonAttack.disabled=true
            //opponentRandomAttack()
            if (attacksplayer.length === maxgames)
                sendAttacks()
        })
    })
}
function chooseOpponentMokepon(mokepon){
    if (!mokepon){
        let mokeponRandomnumber = randomnumber(0,mokepons.length-1)
        mokepon=mokepons[mokeponRandomnumber]
    }
    opponentMokepon=mokepon
    spanMokeponOpponent.innerHTML = opponentMokepon.name
    imgMokeponOpponent.alt=opponentMokepon.name
    imgMokeponOpponent.src=opponentMokepon.image
    sequenceAttacks()        
}
function sendAttacks() {
    fetch(baseURL+ `/mokepon/${playerid}/attacks`, {
        method: 'POST',
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ attacks: attacksplayer })
    })
    interval=setInterval(getAttacks,50)
}
function getAttacks() {
    fetch(baseURL+`/mokepon/${opponentid}/attacks`)
        .then(response => {
            if (response.ok){
                response.json()
                    .then(({attacks}) => {
                        if (attacks.length === maxgames){
                            attacksopponent=attacks
                            battle()
                        }
                    })
            }
        })
}
function opponentRandomAttack(){
    let attackindex=randomnumber(0,opponentMokepon.attacks.length-1)
    //console.log(attackindex)
    attacksopponent.push(opponentMokepon.attacks[attackindex].desc)
    opponentMokepon.attacks.splice(attackindex,1)
    battle()
}
function battle(){
    clearInterval(interval)
    if (attacksplayer.length === maxgames && attacksopponent.length===maxgames){
        for (let index = 0; index < attacksplayer.length; index++) {
            //fire wins plant, plant wins watter, watter wins fire
            if (attacksplayer[index]==attacksopponent[index])
                messagebattle('EMPATE',attacksplayer[index],attacksopponent[index])
            else if ((attacksplayer[index]=='FUEGO' && attacksopponent[index]=='PLANTA') || (attacksplayer[index]=='PLANTA' && attacksopponent[index]=='AGUA') || (attacksplayer[index]=='AGUA' && attacksopponent[index]=='FUEGO')){
                messagebattle('GANASTE',attacksplayer[index],attacksopponent[index])
                opponentMokepon.lives=reduceSizeLives('lives-opponent',opponentMokepon.lives,opponentMokepon.maxlives)
                playerVictories++
            }
            else{
                messagebattle('PERDISTE',attacksplayer[index],attacksopponent[index])
                playerMokepon.lives=reduceSizeLives('lives-player',playerMokepon.lives,playerMokepon.maxlives)
                opponentVictories++
            }
            index=checkHealth(index)
        }
        checkVictories()
    }
}
function reduceSizeLives(idbarlives,lives,maxlives){
    let barlives=document.getElementById(idbarlives)
    let sizelives
    sizelives=parseInt(barlives.style.width)
    if (!sizelives) sizelives=maxbarlives
    sizelives/=lives
    lives--
    sizelives*=lives
    barlives.style.width =sizelives.toString()+'px'
    let ratiolives=(lives/maxlives).toFixed(2)
    if (ratiolives<=0.67 && ratiolives>0.33)
        barlives.style.backgroundColor='#F7EC09'
    else if (ratiolives<=0.33)
        barlives.style.backgroundColor='#DA1212'
    return lives
}
function messagebattle(resultbattle, attackplayer,attackopponent){
    message= attackplayer + ' | ' + resultbattle + ' | ' + attackopponent
    createmessage('battle-result',message)
}
function checkHealth(index){
    if (playerMokepon.lives==0 || opponentMokepon.lives==0){
        if (opponentMokepon.lives==0)
            createmessage('battle-arena-result','Felcitaciones!! GANASTE!!')
        else
            createmessage('battle-arena-result','Lo siento!!, Perdiste!!')
        endBattle()
        index=maxgames
    }
    return index
}
function checkVictories(){
    if (buttonRestart.style.visibility=="hidden"){
        if (playerVictories===opponentVictories)
            createmessage('battle-arena-result','Esto fue un EMPATE!!')
        else if (playerVictories>opponentVictories)
            createmessage('battle-arena-result','Felcitaciones!! GANASTE!!')
        else
            createmessage('battle-arena-result','Lo siento!!, Perdiste!!')
        endBattle()
    }
}
function endBattle(){
    //enable restart game
    buttonRestart.style.visibility="visible"
}
function createmessage(idmessage,message){
    let sectionmessage=document.getElementById(idmessage)
    let parrafo=document.createElement('p')
    parrafo.innerHTML=message
    sectionmessage.appendChild(parrafo)
}
function randomnumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function restartGame(){
    window.location.reload()
}
window.addEventListener('load',startGame)