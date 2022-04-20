import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import adminRoutes from './routes/admin.js';
import newsRoutes from './routes/news.js';
import antitheftRoutes from './routes/antitheft.js';
import userRoutes from './routes/user.js';
import videoRoutes from './routes/video.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/admin', adminRoutes);
app.use('/news', newsRoutes);
app.use('/antitheft', antitheftRoutes);
app.use('/user', userRoutes);
app.use('/video', videoRoutes);

app.get('/', (req, res) => {
    res.send("APP is running");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));

// mongoose.set('useFindAndModify', false);