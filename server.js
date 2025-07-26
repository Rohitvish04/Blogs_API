import express from "express"
import userRoutes from "./routes/authRoute.js";
import postRoutes from './routes/postRoute.js';
import commentRoutes from "./routes/commentRoutes.js";
import 'dotenv/config'


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api/auth', userRoutes);
app.use('/api', postRoutes, commentRoutes);
 
 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is app listening on port ${PORT}`)
})
