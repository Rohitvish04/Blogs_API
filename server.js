import express from "express"
const bodyParser = require('body-parser');
const cors = require('cors');
import userRoutes from "./routes/authRoute.js";
import postRoutes from './routes/postRoute.js';
import commentRoutes from "./routes/commentRoutes.js";
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.yaml');
import 'dotenv/config'


const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', userRoutes);
app.use('/api', postRoutes, commentRoutes);
 
 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is app listening on port ${PORT}`)
})
