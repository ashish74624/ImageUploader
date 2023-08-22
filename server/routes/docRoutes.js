import express from 'express'
import { home , addFolder } from '../controllers/docController.js'

const router = express.Router();

router.get('/',home);
router.post('/addFolder',addFolder);

export default router;