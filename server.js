const express=require('express')
const {MongoClient, ObjectId} = require('mongodb')
const cors=require('cors')
const dotenv=require('dotenv').config()
const app=express()
app.use(express.json())
app.use(cors())
let db;
const url=process.env.mongoDbStringConnection
//connect to db
const client=new MongoClient(url)
const start=async()=>{
    client.connect().then(()=>{
        console.log('is connected')
    })
    db=client.db('test')   
    }
    start()
app.set('view engine','ejs')
app.set('views','./views')
app.use(express.static('public'))
app.post('/admin',async(req,res)=>{
    const found=await db.collection('users').findOne({username:req.body.username})
    if(!found){
    db.collection('users').insertOne({...req.body,_id:new ObjectId()})
    }
})
app.get('/home',async (req,res)=>{
    const allMobs=await db.collection('mobiles').find().toArray()
    res.render('home',{allMobs})
})
app.get('/admin',(req,res)=>{
    res.render('admin')
})

app.get('/mobiles',async(req,res)=>{
    const allMobs=await db.collection('mobiles').find().toArray()
    res.json(allMobs)
})
app.post('/mobiles/create',async(req,res)=>{
    console.log(req.body)
    db.collection('mobiles').insertOne({...req.body,_id:new ObjectId()})
})
app.post('/mobiles/edit',async(req,res)=>{
    const id=req.body._id
    db.collection('mobiles').replaceOne({_id:new ObjectId(id)},{name:req.body.name,price:req.body.price,qty:req.body.qty,_id:new ObjectId(id)})

})
app.delete('/mobiles/delete:id',async(req,res)=>{
    const ID=req.params.id.split(':')[1]
    db.collection("mobiles").deleteOne({_id:new ObjectId(ID)})
})
app.listen(9000)
