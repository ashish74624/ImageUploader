import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary';
import Doc from './models/Doc.js';
import Folder from './models/Folder.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }))// For body parsing

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
        const array = doc[0].folders
        const arr = array.reverse();
        res.status(200).json({folderList: arr})
    }catch{}
})

app.get('/getFolderData/:folderName', async(req,res)=>{
    const folderName = req.params.folderName
    // console.log(folderName)
    try {
        const folder = await Folder.find({folderName:folderName});
        // console.log(folder);
        res.status(200).json(folder);
    } catch (error) {
        
    }
});

app.get('/getImage/:folderName/:image',async(req,res)=>{

})

app.post('/upload', async(req,res)=>{
    const result = await cloudinary.uploader.upload(req.body.image);
    try {
        const imageName = await Folder.find({imageName:req.body.imageName})
        if(imageName){
            res.status(409).json({msg:"Image Name Already exists"});
        }
        else{

            const folderData = new Folder({
                folderName: req.body.folderName,
                imageName: req.body.imageName,
                imageCloud:{
                    versionName:result.version,
                    generatedName:result.public_id,
                }
            });
            await folderData.save();
            res.status(200).json({msg:"Done"});
        }
    } catch (error) {
        res.status(500).json({msg:"Not Done"});
    }
});

app.delete('/deleteImage/:id', async(req,res)=>{
    let id=req.params.id;
    try {
        const image = await Folder.findOneAndDelete({_id:id},{new:true});
        if (!image) {
            // Image not found in the database
            return res.status(404).json({ msg: 'Image not found' });
          }
      
          // Successful deletion
          res.status(200).json({ msg: 'Image deleted successfully' });
    } catch (error) {
        console.log("Failder to delet picture");
        res.status(500).json({ error: 'Failed to delete picture' });
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`Server Started on port : ${process.env.PORT}`)
})