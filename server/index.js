// This is branch g2

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import folderRoutes from './routes/folderRoutes.js'
import docRoutes from './routes/docRoutes.js'
import { v2 as cloudinary } from 'cloudinary';
import Doc from './models/doc.js'
import dotenv from 'dotenv'
import Folder from './models/folder.js'
import User from './models/user.js'
import bodyParser from 'body-parser'


const app = express();
dotenv.config();

app.use(cors({
  origin: ['https://image-get.vercel.app','https://imagedrop.vercel.app','https://image-drop-ashish74624.vercel.app','http://localhost:3000','http://localhost:3001'],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }))// For body parsing
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET,
  });
  

mongoose.connect(process.env.URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
});


app.get('/',async(req,res)=>{
    res.status(200).json("Hello There !")
})

app.post('/register',async(req,res)=>{
    const newPasssword = await bcrypt.hash(req.body.password,10)
    try {
        const existingUser = await User.findOne({email:req.body.email});
        if(existingUser){
            // 409 Conflict.
            res.status(409).json({msg:'User already exists'});
        }
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email:req.body.email,
            password:newPasssword
        })
        await user.save()
        res.status(201).json({msg:'Registration complete'})
    } catch (error) {
        // 400 -bad request
        res.status(400).json({msg:'User not registered'})
    }
})
app.post('/login', async(req,res)=>{
    try {

        let user = await User.findOne({email : req.body.email})
        const isPasswordValid = await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordValid){
            // 401 Unauthorized
            return res.status(401).send('Invalid Password')
        }
        if(user){
            const token = jwt.sign({
                _id:user._id,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email},process.env.JWT_SECRET,
                // {expiresIn:"3h"}
            );

            return res.status(200).json({msg:'User found',user:token});
        }else{
            return res.status(404).json({msg:'User not found'});
        }
    } catch (error) {
        res.status(400).json({msg:'Bad request'})
    }
});
app.get('/verifyToken', async(req,res)=>{
    const token = req.headers['x-access-token'];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded){
            res.status(200).json({msg:'User Authenticated'});
        }else{
            res.status(401).json({msg:'Invalid user'})
        }

    }catch{
        res.status(401).json({msg:'Unable to verify at the moment'});
    }
});

app.post('/:email/addFolder',async(req,res)=>{
    if(!req.body.folderName){
        console.log("No folder");
        res.status(400).json({msg:'Please add a Folder Name'});
    }
    const folderName= req.body.folderName
    try{
        const user = await User.findOne({ email: req.params.email})
        const doc = await Doc.findOne({ email: req.params.email});//Checking if doc exist or not
        if(!doc){

            const doc = new Doc({
                email:req.params.email,
                folders : [{folderName:folderName}]//If doc does not already exist we create a new doc and add folderName to if
            });
            await doc.save();
            res.status(201).json({msg:'Folder Created'});
        }else{
            //Creating Folder in the existing document
            const doc1 = await Doc.findOneAndUpdate({email:req.params.email},{
                $push:{
                    folders: {folderName:folderName} // use this method it's better
                }
            })
            // doc.folders.push({folderName:folderName})//Ye push/pop wala push h na ki push/pull wala
            await doc1.save()
            res.status(201).json({msg:'Folder Created'});
            

        } 
    }catch(e){
        res.status(500).json({msg:"Unable to create folder at the moment"})
    }
});
app.delete('/deleteFolder',async(req,res)=>{
    try{
        const doc1 = await Doc.findOne({email:req.body.email});
        if (!doc1) {
            res.status(404).json({msg:'User Not Found'});
        }
        // console.log(doc.folders)
        const doc = await Doc.findOneAndUpdate({email:req.body.email},{
            $pull :{
                folders:{_id:req.body.id}
            }
        })   
        const folder = await Folder.deleteMany({folderName:req.body.folderName})
        res.status(200).json({msg:'Deleted Successfully'})
    }catch{
        res.status(500).json({msg:'Bad Request'})
    }
})


app.get('/:email/getFolders',async(req,res)=>{
    // console.log(req.params.email)
    try{
        const doc = await Doc.find({email:req.params.email});
        // console.log(doc[0].folders)
        const array = doc[0].folders
        const arr = array.reverse();
        res.status(200).json({folderList: arr})
    }catch{
        res.status(404).json({msg:'File Not Found'});
    }
});

app.get('/getFolderData/:email/:folderName', async(req,res)=>{
    const folderName = req.params.folderName
    const email = req.params.email
    // console.log(folderName)
    try {
        const folder = await Folder.find({folderName:folderName,email:email});
        // console.log(folder);
        res.status(200).json(folder);
    } catch (error) {
        res.status(404).json({msg:'File Data Not Found'});        
    }
});

app.get('/:email/:folderName/:image',async(req,res)=>{
    console.log(req.params.email)
    try{
        const folders = await Folder.find({folderName:req.params.folderName,email:req.params.email});
        if(!folders){
             res.status(404).json({msg:'Folder Not Found'});
        }
        const imageName = await Folder.findOne(
            {$and:
                [
                    {email:req.params.email},
                    {folderName: req.params.folderName},
                    {imageName:req.params.image}
                ]
            }
        ); // $and operator
        if(!imageName){
            res.status(404).json({msg:'Image Not Found'});
        }
        const version = imageName.imageCloud.versionName;
        const generatedName = imageName.imageCloud.generatedName;
        res.redirect(`https://res.cloudinary.com/deirqjd6e/image/upload/v${version}/${generatedName}`)
    }catch(err){
        res.status(500).json({msg:'Error Fetching Image'});
    }
});

app.post('/:email/upload',async(req,res)=>{
    try {
        // console.log(req.body.image)
        const imageName = await Folder.find({$and:[{folderName:req.body.folderName},{imageName:req.body.imageName},{email:req.params.email}]});
        // The problem is that even if there's no matching document in the database, the Folder.find() method will return an empty array ([]), so we need to add imageName.length >0
        if(imageName.length>0){
            res.status(409).json({msg:"Image Name Already exists"});
        }
        else{
            const result = await cloudinary.uploader.upload(req.body.image);
            const folderData = new Folder({
                email:req.params.email,
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
        // console.log(error)
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
});



app.listen(process.env.PORT,()=>{
    console.log(`Server Started on port : ${process.env.PORT}`)
})