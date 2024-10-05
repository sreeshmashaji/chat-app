const mongoos=require('mongoose')


const connnectToMongoDB=async ()=>{
     try {
        await mongoos.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB ")

        
     } catch (error) {

        console.log("Error connecting to mongodb",error.message)
        
     }

}


module.exports=connnectToMongoDB    