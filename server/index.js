import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary';
import userRoutes from './routes/userRoutes.js'
import folderRoutes from './routes/folderRoutes.js'
import docRoutes from './routes/docRoutes.js'

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }))// For body parsing

dotenv.config();

mongoose.connect(process.env.URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
});

app.use('/api/users',userRoutes)
app.use('/api/doc',docRoutes)
app.use('/api/folder',folderRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server Started on port : ${process.env.PORT}`)
})