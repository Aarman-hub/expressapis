require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')


const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// const express = require('')
// const express = require('')

const app = express();
connectDB();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(morgan('tiny'));
app.options('*', cors())


//Routes
app.use('/api/v1/user', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);


//connection

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server Connected on ${port}`);
})
