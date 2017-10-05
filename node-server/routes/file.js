import express from 'express'
import SendFile from '../controller/sendFile'

const router = express.Router();
router.post('/get', SendFile.sendFile);;
export default router