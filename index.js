const PORT=process.env.PORT||5000
const app=require('./app.js')


app.listen(PORT,()=>{
    console.log(`server is listening port at https://localhost:${PORT}`);
})