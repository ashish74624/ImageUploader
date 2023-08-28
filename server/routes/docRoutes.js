import express from 'express'
import User from '../models/user.js';
import Doc from '../models/doc.js';
import Folder from '../models/folder.js';
import { addFolder , deleteFolder } from '../controllers/docController.js'

const router = express.Router();

router.post('/:email/addFolder',addFolder);
router.delete('/deleteFolder',deleteFolder)

export default router;