import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/usersRoute.js'
import galleryItemRouter from './routes/galleryItemRoute.js'
import jwt from 'jsonwebtoken'


const app = express()


app.use(bodyParser.json())

const connectionString = "mongodb+srv://shafcv37:6Uk6cwtHEokV9SzX@cluster0.gzdsn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use((req,res,next)=>{

  const token = req.header("Authorization")?.replace("Bearer ", "")

  if(token != null){
    jwt.verify(token,"secret",
      (err,decoded)=>{
      if(decoded != null){
        req.body.user = decoded
        next()
      }else{
        next()
      }

    }
  )
  }else{
    next()
  }

});


mongoose.connect(connectionString).then(
  ()=>{
    console.log("Connected to the database")
  }
).catch(
  ()=>{
    console.log("Connection failed")
  }
)


app.use("/api/users",userRouter)
app.use("/api/gallery",galleryItemRouter)


app.listen(5000,(req,res)=>{
  console.log("Sever is running on on port 5000")
});