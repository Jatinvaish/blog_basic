const express = require('express');
const connectDb = require('./config/db');
const app =express();
const cors = require('cors');
const bodyParser = require("body-parser");

require("dotenv").config({ path: "backend/config/config.env" });


connectDb();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRouters'));

const PORTFINAL  = process.env.PORT || 4040;
app.listen(PORTFINAL,()=>console.log(`Server is running on port ${PORTFINAL}`));


app.get('/', (req,res)=>{
    res.send('Hello Blog Post')
})

