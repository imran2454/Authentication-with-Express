const mongoose=require('mongoose')

const databaseconnect=()=>{
    mongoose.connect(process.env.MONGOS_URI)
    .then((conn)=>{
        console.log(`DB is connected ${conn.connection.host}`);
    })
    .catch((error)=>{
        console.log(error.message);
    })
}
module.exports=databaseconnect;