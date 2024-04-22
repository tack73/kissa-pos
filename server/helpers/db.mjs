import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MongoDB_URI,  { useNewUrlParser: true, useUnifiedTopology: true });