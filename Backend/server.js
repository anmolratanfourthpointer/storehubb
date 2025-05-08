const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/admin/admin.routes');
const multer = require('multer');
const path = require('path');
const FormData = require('./models/Formdata')
dotenv.config();
connectDB();


const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + unique + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage });
  
  app.post('/upload', upload.single('transactionFile'), async (req, res) => {
    try {
      const data = req.body;
      const filePath = req.file ? req.file.path : null;
  
      const formData = new FormData({
        ...data,
        transactionFilePath: filePath
      });
  
      await formData.save();
  
      res.json({ message: 'Form and file saved successfully', formData });
    } catch (err) {
      res.status(500).json({ message: 'Error saving form data', error: err });
    }
  });

  
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/admin',adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
