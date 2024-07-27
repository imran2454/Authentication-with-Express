require ('dotenv').config();
const express=require('express');

const app=express();
const authRouter=require('./router/authRoutes.js')
const databaseconnect=require('./config/databseConfig.js')
const cookiepaser=require('cookie-parser')
const cors=require('cors')
databaseconnect()
app.use(express.json());
// token ko json mai badalane ke liya
app.use(cookiepaser());
// cors 
app.use(cors({
    origin:[process.env.CLIEND_URL],
    credentials:true
}))
app.use('/',authRouter)

app.use('/',(req,res)=>{
    res.send('express sever created by mi1');
})
 

module.exports=app;