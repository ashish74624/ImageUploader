import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
    folderName: {type: String , required: true},
    imageName : {type: String , required: true},
    image : {type:[{versionName:{type:String},generatedName:{type:String}}],default:[]}
},
{collection:'Folder'});

const Folder = mongoose.model('Folder',FolderSchema);

export default Folder;