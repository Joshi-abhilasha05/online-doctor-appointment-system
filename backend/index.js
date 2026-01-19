// import express from "express"
// import users from "./users.js"
// const app = express()

// app.get("/", (req, res) => {
//     res.send("Server is ready")
// })
// app.get("/api/user", (req, res) => {
//     res.send(users)
// })

// const port = process.env.PORT || 3005
// app.listen(port, () => {
//     console.log('ServSe at http://localhost:3005')
// })


import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data', 'patients.json');

// Get all patients
app.get('/patient', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        res.json(data.patients);
    } catch (error) {
        res.status(500).json({ message: "Error reading data" });
    }
});

// Register new patient
app.post('/patient', (req, res) => {
    try {
        const { username, email, password, phone, address } = req.body;
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // Check if email already exists
        const existingPatient = data.patients.find(p => p.email === email);
        if (existingPatient) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create new patient
        const newPatient = {
            id: Date.now().toString(),
            username,
            email,
            password,
            phone,
            address
        };

        // Add to array and save
        data.patients.push(newPatient);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ message: "Error saving data" });
    }
});

// Start server
app.listen(port, () => {
    // Create data directory and file if they don't exist
    if (!fs.existsSync(path.join(__dirname, 'data'))) {
        fs.mkdirSync(path.join(__dirname, 'data'));
    }
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify({ patients: [] }, null, 2));
    }
    console.log(`Server is running on port ${port}`);
});