import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bookRoutes from './api/routes/bookRoutes';
import colorRoutes from './api/routes/colorRoutes';
import userRoutes from './api/routes/userRoutes';
import authRoutes from './api/routes/authRoutes';
import sliderRoutes from './api/routes/sliderRoutes';
import blogRoutes from './api/routes/blogRoutes';
import fileRoutes from './api/routes/fileRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT || 3131;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

bookRoutes(app);
colorRoutes(app);
userRoutes(app);
authRoutes(app);
sliderRoutes(app);
blogRoutes(app);
fileRoutes(app);

app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` })
});

app.listen(port, () =>
    console.log(`book RESTful API server started on: ${port}`));