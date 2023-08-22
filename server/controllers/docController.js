import Doc from '../models/doc.js'
import Folder from '../models/folder.js'
// Start with functions now

export const home= async(req,res)=>{
    res.json({str:"Hello There !"})
}

export const addFolder = async(req,res)=>{
    if(!req.body.folderName){
        console.log("No folder");
        res.status(400).json({msg:'Please add a Folder Name'});
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
}

export default {home,addFolder};