require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const MyDb = require("./db/db")
const router = require("./routes/ticket")
app.use(express.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", (req,res)=>{
    res.send("This is not okay")
})


app.use("/api/v1/tickets", router)


MyDb.create("user 1", 10)
MyDb.create("user 2", 10)
MyDb.create("user 3", 10)
MyDb.create("user 4", 10)
MyDb.create("user 5", 10)
MyDb.bulkCreate("Sakib Hossan", 10, 5)

const all = MyDb.find()
console.log("all ticket", all);

const winner = MyDb.draw(3)
console.log("winner", winner);

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Port 8000 is listening ${port}`)
})