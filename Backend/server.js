import express from 'express'; 
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
dotenv.config();

await connectDB();

const app = express();

const PORT = process.env.PORT;

// express json ko nhi smjth hai javascript ko smjtha hai json ko smjhne ke liye app.use code likhte hai
app.use(express.json());

app.use('/api/auth', authRoutes)

// API (Application Programming Interface)
app.get('/api/health', (req, res) => {
    // res.send("Backend Server Running Successfully...")
    res.json({
    status: 'ok',
    message: "Skillpath AI API is running"
    })
})

app.listen(PORT, () => {
    console.log((`Server is running on port: ${PORT}`))
})

// afzalhussain8785102_db_user
// Afzal%402006

