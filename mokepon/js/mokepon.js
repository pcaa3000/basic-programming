const sectionBattleArena = document.getElementById('battle-arena')
const buttonPlayerMokepon=document.getElementById('button-mokepon')
const buttonfire=document.getElementById('button-fire')
const buttonwatter=document.getElementById('button-watter')
const buttonplant=document.getElementById('button-plant')
const buttonRestart = document.getElementById('button-restart')
const inputHipodoge = document.getElementById('hipodoge')
const inputCapipepo = document.getElementById('capipepo')
const inputRatigueya = document.getElementById('ratigueya')
const spanMokeponPlayer = document.getElementById('mokepon-player')
const imgMokeponPlayer= document.getElementById('img-mokepon-player')
const sectionChooseMokepon = document.getElementById('choose-mokepon')
const spanMokeponOpponent = document.getElementById('mokepon-opponent')
const imgMokeponOpponent= document.getElementById('img-mokepon-opponent')

const maxbarlives=100
const maxlives=3
let mokepons=[]
let attackplayer
let attackopponent
let playerlives=maxlives
let opponetlives=maxlives

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

hipodoge.attacks.push(
    {name:'💧', id:'button-watter'},
    {name:'💧', id:'button-watter'},
    {name:'💧', id:'button-watter'},
    {name:'🔥', id:'button-fire'},
    {name:'🌱', id:'button-plant'},
)
capipepo.attacks.push(
    {name:'🌱', id:'button-plant'},
    {name:'🌱', id:'button-plant'},
    {name:'🌱', id:'button-plant'},
    {name:'💧', id:'button-watter'},
    {name:'🔥', id:'button-fire'},
)
ratigueya.attacks.push(
    {name:'🔥', id:'button-fire'},
    {name:'🔥', id:'button-fire'},
    {name:'🔥', id:'button-fire'},
    {name:'💧', id:'button-watter'},
    {name:'🌱', id:'button-plant'},
)
mokepons.push(hipodoge,capipepo,ratigueya)
function startGame(){
    sectionBattleArena.style.display = 'none'
    buttonPlayerMokepon.addEventListener('click', choosePlayerMokepon)
    buttonfire.addEventListener('click', attackfire)
    buttonwatter.addEventListener('click', attackwatter)
    buttonplant.addEventListener('click', attackplant)
    buttonRestart.disabled=true
    buttonRestart.addEventListener('click', restartGame)
}
function choosePlayerMokepon(){
    if (inputHipodoge.checked || inputCapipepo.checked || inputRatigueya.checked){
        sectionChooseMokepon.style.display = 'none'
        sectionBattleArena.style.display = 'flex'       
        if (inputHipodoge.checked){
            spanMokeponPlayer.innerHTML = 'Hipodoge'
            imgMokeponPlayer.alt='Hipodoge'
            imgMokeponPlayer.src='./assets/mokepons_mokepon_hipodoge_attack.png'
        } else if (inputCapipepo.checked){
            spanMokeponPlayer.innerHTML = 'Capipepo'
            imgMokeponPlayer.alt='Capipepo'
            imgMokeponPlayer.src='./assets/mokepons_mokepon_capipepo_attack.png'
        } else{
            spanMokeponPlayer.innerHTML = 'Ratigueya'
            imgMokeponPlayer.alt='Ratigueya'
            imgMokeponPlayer.src='./assets/mokepons_mokepon_ratigueya_attack.png'
        }
        chooseOpponentMokepon() 
    }
    else
        alert('Selecciona un mokepon')
}
function chooseOpponentMokepon(){
    let mokeponRandomnumber = randomnumber(1,3)
    if (mokeponRandomnumber == 1) {
        spanMokeponOpponent.innerHTML = 'Hipodoge'
        imgMokeponOpponent.alt='Hipodoge'
        imgMokeponOpponent.src='./assets/mokepons_mokepon_hipodoge_attack.png'
    } else if (mokeponRandomnumber == 2) {
        spanMokeponOpponent.innerHTML = 'Capipepo'
        imgMokeponOpponent.alt='Capipepo'
        imgMokeponOpponent.src='./assets/mokepons_mokepon_capipepo_attack.png'
    } else {
        spanMokeponOpponent.innerHTML = 'Ratigueya'
        imgMokeponOpponent.alt='Ratigueya'
        imgMokeponOpponent.src='./assets/mokepons_mokepon_ratigueya_attack.png'
    }
}
function attackfire(){
    attackplayer='FUEGO'
    attackalaeaotoriooponente()
}
function attackwatter(){
    attackplayer='AGUA'
    attackalaeaotoriooponente()
}
function attackplant(){
    attackplayer='PLANTA'
    attackalaeaotoriooponente()
}
function attackalaeaotoriooponente(){
    let attack=randomnumber(1,3)
    if (attack==1)
        attackopponent='FUEGO'
    else if (attack==2)
        attackopponent='AGUA'
    else
        attackopponent='PLANTA'
    battle()
}
function battle(){
    //fire wins plant, plant wins watter, watter wins fire
    if (attackplayer==attackopponent)
        messagebattle('EMPATE')
    else if ((attackplayer=='FUEGO' && attackopponent=='PLANTA') || (attackplayer=='PLANTA' && attackopponent=='AGUA') || (attackplayer=='AGUA' && attackopponent=='FUEGO')){
        messagebattle('GANASTE')
        opponetlives=reduceSizeLives('lives-opponent',opponetlives)
    }
    else{
        messagebattle('PERDISTE')
        playerlives=reduceSizeLives('lives-player',playerlives)
    }
    checkHealth()
}
function reduceSizeLives(idbarlives,lives){
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
function messagebattle(resultbattle){
    message= attackplayer + ' - ' + resultbattle + ' - ' + attackopponent
    createmessage('battle-result',message)
}
function checkHealth(){
    if (playerlives==0 || opponetlives==0){
        if (opponetlives==0)
            createmessage('battle-arena-result','Felcitaciones!! GANASTE!!')
        else
            createmessage('battle-arena-result','Lo siento!!, Perdiste!!')
        endBattle()
    }
}
function endBattle(){
    buttonfire.disabled = true
    buttonwatter.disabled = true
    buttonplant.disabled = true
    //enable restart game
    buttonRestart.disabled= false
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