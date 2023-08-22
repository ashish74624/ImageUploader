import express from 'express'
import { getFolderData,getFolders,getImage,uploadImage,deleteImage } from '../controllers/folderController.js'

const router = express.Router();

router.get('/getFolders',getFolders);

router.get('/getFolderData/:folderName',getFolderData);

router.get('/:folderName/:image',getImage);

router.post('/upload',uploadImage);

router.delete('/deleteImage/:id',deleteImage);

export default router;