const db = require("../db/db")
const router = require("express").Router()

router.get("/t/:ticketId", (req,res)=>{
    const ticketId = req.params.ticketId
    const ticket = db.findById(ticketId)
    res.status(201).json(ticket)
})
router.patch("/t/:ticketId", (req,res)=>{
    const ticketId = req.params.ticketId
    const updateTicket = db.updateById(ticketId, req.body)
    res.status(200).json({Message : "Update Successfull", updateTicket})
})
router.delete("/t/:ticketId", (req,res)=>{
    const ticketId = req.params.ticketId
    db.deleteById(ticketId)
    res.status(203).send()
})


router.get("/u/:username", (req,res)=>{
    const username = req.params.username
    const ticket = db.findByUsername(username)
    res.status(200).send(ticket)
})
router.patch("/u/:ticketId", ()=>{})
router.delete("/u/:ticketId", ()=>{})


router.post("/sell", (req,res)=>{
    const {username, price} = req.body
    const ticket = db.create(username,price)
    res.status(201).json({Message : "Ticket created successfully done", ticket})
})
router.post("/bulk", (req,res)=>{
    const {username, price, quantity} = req.body
    const tickets = db.bulkCreate(username,price, quantity)
    res.status(201).json({Message : "Bulk ticket created successfully done", tickets})
})

router.get("/draw", (req,res)=>{
    const winnerCount = req.query.wc ?? 3
    const winner = db.draw(winnerCount)
    res.status(200).json(winner)
})

router.get("/", (req,res)=>{
    const tickets = db.find()
    res.status(200).json(tickets)
})


module.exports = router