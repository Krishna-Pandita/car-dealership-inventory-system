import express from 'express'
import "dotenv/config";
import connectDB from './database/db.js';

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());

app.get("/", (req, res) =>{
  res.send("Server is running")
})
connectDB();

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
