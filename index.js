const express=require('express')
const bodyparser=require('body-parser')

const app=express()

const db=require('./query')

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended:false}))

app.post('/user',db.createUser)
app.get('/user/:id',db.getUserById)
app.get('/getAlluser',db.getAllUsers)
app.delete('/deleteUser/:id',db.deleteUser)
app.put('/updateUser/:id',db.updateUser)

app.listen(3000,() => console.log('listening to the port 3000 ...'))