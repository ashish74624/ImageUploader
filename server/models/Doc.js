import mongoose from "mongoose";

const DocSchema = new mongoose.Schema({
    folders :{ type: [{folderName :{type:String}}] , default:[] }
},
{collection:'Doc'}
);

const Doc = mongoose.model('Doc',DocSchema);

export default Doc;