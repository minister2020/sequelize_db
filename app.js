
const express = require('express')
const { v4: uuidv4 } = require('uuid')

const { sequelize, User } = require('./models')
const app = express()
app.use(express.json())


app.post('/users', async(req, res)=>{
    
    const { name, email, role, phone,} = req.body
    const uuid = uuidv4()
    try{
        const user = await User.create({ name, email, role, phone})
       
        return res.json(user)      
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
app.get('/users', async(req, res)=>{
    try{
    const users = await User.findAll()
    return res.json(users)
 }catch(err){
    console.log(err)
    return res.status(500).json( {error:'something went wrong'})
 }
})

app.get('/users/:id', async(req, res)=>{
    const id = req.params.id
    try{
    const user = await User.findOne({
        where: { id }
    })
    return res.json(user)
 }catch(err){
    console.log(err)
    return res.status(500).json( {error:'something went wrong'})
 }
})
app.listen({ port: 5000}, async () =>{
    console.log('server up on http://localhost:5000')
    await sequelize.sync()
    console.log('database synced')
})
    


