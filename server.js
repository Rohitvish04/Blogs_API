import express from "express"
import userRouter from "./routes/authRoute.js";
import 'dotenv/config'


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api/auth', userRouter);
 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is app listening on port ${PORT}`)
})
