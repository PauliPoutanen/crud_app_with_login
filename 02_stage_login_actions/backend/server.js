const express = require("express")
const mongoose =require("mongoose")
const userLogRoute = require("./routes/userlogroute");
const huutokauppaRoute = require("./routes/huutokaupparoute");



let app = express()
app.use(express.json())

let port = process.env.PORT || 3001


const url = "mongodb+srv://alppilanmies:huutokauppasalasana@cluster0.woiu5mj.mongodb.net/kaksirouterdatabase?retryWrites=true&w=majority"
console.log(url)
mongoose.connect(url)
.then(
  ()=> console.log("Yhteys MongoDB-tietokantaan muodostettu // Connected to Mongo DB"),
  (error) => 
  console.log("Ei yhteyttä MongoDB-tietokantaan // No connection to Mongo DB", error)
)

app.use("/",userLogRoute)
app.use("/api",huutokauppaRoute)

app.listen(port);
console.log("2Route_huutokauppa portissa: ",port);