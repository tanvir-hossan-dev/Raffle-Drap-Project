const Ticket = require("../models/Ticket")


class MyDb{
    constructor(){
        this.tickets = []
    }


    /**
     * Create ticket and save
     * @param {string} username 
     * @param {number} price 
     * @returns {Ticket} return a ticket object
     */

    create(username, price){
        const ticket = new Ticket(username, price)
        this.tickets.push(ticket)
        return ticket
    }

    /**
     * 
     * @param {string} username 
     * @param {number} price 
     * @param {number} quantity 
     * @returns {Array<Ticket>}
     */

    bulkCreate(username, price, quantity){

        let result = []
        for(let i = 0; i<quantity; i++){
            const ticket =  this.create(username,price)
            result.push(ticket)
        }
        return result
    }

    // find all

    find(){
        return this.tickets
    }

    /**
     * 
     * @param {string} ticketId 
     * @returns {Ticket}
     */ 

    findById(ticketId){
        const ticket = this.tickets.find(
            /**
             * @param {Ticket} ticket 
             */
            (ticket)=> ticket.id === ticketId
        )

        return ticket
    }


    /**
     * @param {string} username
     */
    findByUsername(username){
        const tickets = this.tickets.filter((ticket) => ticket.username === username)
        return tickets
    }

    /**
     * 
     * @param {string} ticketId 
     * @param {{username:string, price: number}} ticketBody 
     * @returns {Ticket}
     */

    updateById(ticketId, ticketBody){
        const ticket = this.findById(ticketId)
         ticket.username = ticketBody.username  || ticket.username
         ticket.price = ticketBody.price  || ticket.price
         ticket.updatedAt = new Date()

         return ticket

    }

    /**
     * 
     * @param {string} ticketId 
     */

    deleteById(ticketId){
        const index = this.tickets.findIndex((ticket)=> ticket.id === ticketId)
        if(index !== -1){
            this.tickets.splice(index,1)
            return true
        }else{
            return false
        }

    }

    /**
     * 
     * @param {number} winner 
     * @returns {Array<Ticket>}
     */

    draw(winner){
        let winnderIndexes = new Array(winner)
        let index = 0
        while(index < winner ){
            let winnerIndex = Math.floor(Math.random() * this.tickets.length)

            if(!winnderIndexes.includes(winnerIndex)){
                winnderIndexes[index++] = winnerIndex
                continue
            }
        }
        const winners = winnderIndexes.map((index)=> this.tickets[index])
        return winners
    }
}

const myDB = new MyDb()

module.exports = myDB