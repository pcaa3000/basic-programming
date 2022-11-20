//import express from "express";
const express = require("express")
const cors = require("cors")

let app = express()
app.use(express.static('public'))
app.use(cors())
app.use(express.json())

let players = []

class Player {
    constructor(){
        this.id=this.generate_uuidv4()
    }   
    generate_uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    chooseMokepon(mokepon){
        this.mokepon=mokepon
    }   
    updatePosition(x,y){
        this.x=x
        this.y=y
    } 
    chooseAttacks(attacks){
        this.attacks=attacks
    }
}
class Mokepon{
    constructor(name){
        this.name = name
    }
}
app.get("/join",(req,res) =>{
    let player=new Player()
    players.push(player)
    res.setHeader("Access-Control-Allow-Origin","*")
    res.send(player.id)
})
app.post("/mokepon/:playerid",(req,res) => {
    let playerid=req.params.playerid || ""
    let nameMokepon=req.body.mokepon || ""
    let mokepon= new Mokepon(nameMokepon)
    let index=players.findIndex(player => player.id === playerid)
    if (index>=0)
        players[index].chooseMokepon(mokepon)
    res.end()
})
app.post("/mokepon/:playerid/position",(req,res) => {
    let playerid=req.params.playerid || ""
    let x=req.body.x || 0
    let y=req.body.y || 0
    let index=players.findIndex(player => player.id === playerid)
    if (index>=0)
        players[index].updatePosition(x,y)
    let opponents= players.filter(player => player.id !== playerid)
    console.log(opponents)
    res.send( {opponents}  )
})
app.post("/mokepon/:playerid/attacks",(req,res) => {
    let playerid=req.params.playerid || ""
    let attacks=req.body.attacks || []
    let index=players.findIndex(player => player.id === playerid)
    if (index>=0)
        players[index].chooseAttacks(attacks)
    res.end()
})
app.get("/mokepon/:playerid/attacks", (req,res) => {
    let playerid=req.params.playerid || ""
    let player=players.find(player => player.id === playerid)
    res.send({ 
        attacks: player.attacks || [] 
    })
})
app.listen(8080,()=>{console.log("Server Working...")})
