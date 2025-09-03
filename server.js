import express from "express"
import  bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from "./routes/authRoute.js";
import postRoutes from './routes/postRoute.js';
import commentRoutes from "./routes/commentRoutes.js";
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './docs/swagger.js';
import 'dotenv/config'


const app = express()
const PORT = process.env.PORT || 3000

// Middleware
// Configure CORS
    const corsOptions = {
    origin: 'http://localhost:5173', // Allow only requests from this origin
    methods: 'GET,POST,PUT,DELETE', // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
withCredentials: true,
};

 app.use(cors(corsOptions));

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
