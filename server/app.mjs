import express from 'express';
import apiRoutes from './routes/index.mjs';
import  './helpers/db.mjs';
import cors from 'cors';
import env from 'dotenv';
import path from 'path';
env.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("build"));
app.use(express.json());


app.use(cors({
  // origin: "http://localhost:3000",
  origin: "*",
}));

//API
app.use('/api',apiRoutes);

app.get("*",(req,res)=>{
  const indexHtml = path.resolve("build", "index.html");
  res.sendFile(indexHtml);
})

app.use((req, res) => {
  res.status(404).json({ msg: '404 Not Found' });
});

app.use((err, req, res, next) => {
  if(res.headersSent){
    return next(err);
  }
  res.status(500).json({ msg: '500 Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});