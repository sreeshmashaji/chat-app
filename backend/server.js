const express=require('express');
const dotenv=require('dotenv')
const {app,server}=require('./socket/socket.js')
const authRoutes=require('./routes/auth.routes.js');
const cookieparser=require('cookie-parser')
const messageRoutes=require('./routes/message.routes.js');
const userRoutes=require('./routes/user.routes.js');

const connnectToMongoDB = require('./db/mongo.connection.js');
const protectRoute = require('./middleware/protectRoute.js');
dotenv.config();

const PORT=process.env.PORT||5000;

app.use(express.json())
app.use(cookieparser())



app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)











server.listen(PORT,()=>{
    connnectToMongoDB()
     console.log(`server running at port  ${PORT}`);
})