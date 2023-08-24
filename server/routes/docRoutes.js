import express from 'express'
import { home , addFolder , deleteFolder } from '../controllers/docController.js'

const router = express.Router();

router.get('/',home);
router.post('/:email/addFolder',addFolder);
router.delete('/deleteFolder',deleteFolder)

export default router;