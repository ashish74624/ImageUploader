import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary';
import Doc from './models/Doc.js';

const app = express();

app.use(cors());
app.use(express.json())// For body parsing

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET
  });
  

mongoose.connect(process.env.URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
});

app.get('/',async(req,res)=>{
    res.json({str:"Hello There !"})
})

app.post('/addFolder', async(req,res)=>{
    if(!req.body.folderName){
        console.log("No folder");
    }
    const folderName= req.body.folderName
    try{
        const doc = await Doc.findOne();//Checking if doc exist or not
        if(!doc){

            const doc = new Doc({
                folders : [{folderName:folderName}]//If doc does not already exist we create a new doc and add folderName to if
            });
            await doc.save();
            res.status(201).json({msg:'Folder Created'});
        }else{
            //Creating Folder in the existing document
            doc.folders.push({folderName:folderName})//Ye push/pop wala push h na ki push/pull wala
            await doc.save()
            res.status(201).json({msg:'Folder Created'});
            

        } 
    }catch(e){
        res.status(500).json({msg:"Unable to create folder at the moment"})
    }
});


app.get('/getFolders', async(req,res)=>{
    try{
        const doc = await Doc.find({});
        // console.log(doc[0].folders)
        res.status(200).json({folderList: doc[0].folders})
    }catch{}
})


app.listen(process.env.PORT,()=>{
    console.log(`Server Started on port : ${process.env.PORT}`)
})