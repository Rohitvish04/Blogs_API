import express from "express"
import userRoutes from "./routes/authRoute.js";
import postRoutes from './routes/postRoute.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import 'dotenv/config'


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api/auth', userRoutes);
app.use('/api', postRoutes, categoryRoutes);
 
 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is app listening on port ${PORT}`)
})
