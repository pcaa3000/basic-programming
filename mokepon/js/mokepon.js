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

const maxbarlives=100
const maxgames=5
let mokepons=[]
let attacksplayer=[]
let attacksopponent=[]
let playerMokepon
let opponentMokepon
let playerVictories=0
let opponentVictories=0

class Mokepon{
    constructor(name,image,lives){
        this.name=name
        this.image = image
        this.lives= lives
        this.maxlives=lives
        this.attacks=[]
    }
}
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)
let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5)
let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5)
let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5)

hipodoge.attacks.push(
    {name:'💧', id:'button-watter',desc:'AGUA'},
    {name:'💧', id:'button-watter',desc:'AGUA'},
    {name:'💧', id:'button-watter',desc:'AGUA'},
    {name:'🔥', id:'button-fire',desc:'FUEGO'},
    {name:'🌱', id:'button-plant',desc:'PLANTA'},
)
capipepo.attacks.push(
    {name:'🌱', id:'button-plant',desc:'PLANTA'},
    {name:'🌱', id:'button-plant',desc:'PLANTA'},
    {name:'🌱', id:'button-plant',desc:'PLANTA'},
    {name:'💧', id:'button-watter',desc:'AGUA'},
    {name:'🔥', id:'button-fire',desc:'FUEGO'},
)
ratigueya.attacks.push(
    {name:'🔥', id:'button-fire',desc:'FUEGO'},
    {name:'🔥', id:'button-fire',desc:'FUEGO'},
    {name:'🔥', id:'button-fire',desc:'FUEGO'},
    {name:'💧', id:'button-watter',desc:'AGUA'},
    {name:'🌱', id:'button-plant',desc:'PLANTA'},
)
pydos.attacks.push(
    {name:'💧', id:'button-watter',desc:'AGUA'},
    {name:'💧', id:'button-watter',desc:'AGUA'},
    {name:'💧', id:'button-watter',desc:'AGUA'},
    {name:'🔥', id:'button-fire',desc:'FUEGO'},
    {name:'🌱', id:'button-plant',desc:'PLANTA'},
)
tucapalma.attacks.push(
    {name:'🌱', id:'button-plant',desc:'PLANTA'},
    {name:'🌱', id:'button-plant',desc:'PLANTA'},
    {name:'🌱', id:'button-plant',desc:'PLANTA'},
    {name:'💧', id:'button-watter',desc:'AGUA'},
    {name:'🔥', id:'button-fire',desc:'FUEGO'},
)
langostelvis.attacks.push(
    {name:'🔥', id:'button-fire',desc:'FUEGO'},
    {name:'🔥', id:'button-fire',desc:'FUEGO'},
    {name:'🔥', id:'button-fire',desc:'FUEGO'},
    {name:'💧', id:'button-watter',desc:'AGUA'},
    {name:'🌱', id:'button-plant',desc:'PLANTA'},
)
mokepons.push(hipodoge,capipepo,ratigueya,pydos,tucapalma,langostelvis)
function startGame(){
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
}
function choosePlayerMokepon(){
    let inputcheck=false
    let index=0
    let inputmokepons=document.querySelectorAll('.cards input')
    inputmokepons.forEach((inputmokepon)=>{
        if (inputmokepon.checked){
            inputcheck=true
            sectionChooseMokepon.style.display = 'none'
            sectionBattleArena.style.display = 'flex'
            playerMokepon=mokepons[index]
            spanMokeponPlayer.innerHTML = playerMokepon.name
            imgMokeponPlayer.alt = playerMokepon.name
            imgMokeponPlayer.src=playerMokepon.image            
            showAttacks(playerMokepon.attacks)
            return
        }    
        index++    
    })
    if (inputcheck)
        chooseOpponentMokepon()
    else
        alert('Selecciona un mokepon')
}
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
            opponentRandomAttack()
        })
    })
}
function chooseOpponentMokepon(){
    let mokeponRandomnumber = randomnumber(0,mokepons.length-1)
    opponentMokepon=mokepons[mokeponRandomnumber]
    spanMokeponOpponent.innerHTML = opponentMokepon.name
    imgMokeponOpponent.alt=opponentMokepon.name
    imgMokeponOpponent.src=opponentMokepon.image
    sequenceAttacks()        
}
function opponentRandomAttack(){
    let attackindex=randomnumber(0,opponentMokepon.attacks.length-1)
    attacksopponent.push(opponentMokepon.attacks[attackindex].desc)
    opponentMokepon.attacks.splice(attackindex,1)
    battle()
}
function battle(){
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