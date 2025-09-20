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
const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = process.env.CLIENT_ORIGIN?.split(",");

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
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
