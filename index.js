import express from "express"


const app = express()
const PORT = 8080

app.get('/',(req,res)=>res.json({"message":"Welcome to hypertest"}))


app.get("/webhook/github",(req,res)=>res.json("congratulations u have successfully installed our app in your repo")) 


app.listen(PORT,(req,res)=>console.log("server has started"))