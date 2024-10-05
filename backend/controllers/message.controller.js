const Conversation = require("../models/conversation.model.js")
const Message = require("../models/message.model.js")
const { getReceiverSocketId ,io} = require("../socket/socket.js")


const sendMessage=async (req,res)=>{
   try {
      console.log("sendingg")
    const{message}=req.body
    console.log(message)
    const {id:receiverId} = req.params
    const senderId=req.user._id
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
    });
    
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        });
    }
    const newMessage = await Message.create({
        senderId,
        receiverId,
        message,
    });
    console.log("new",newMessage)
  

    if (newMessage) {
        conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId=getReceiverSocketId(receiverId)
    if (receiverSocketId) {
        // io.to(<socket_id>).emit() used to send events to specific client
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    

    res.status(201).json(newMessage);

   } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
   }



}






const getMessages=async(req,res)=>{
    try {
        const { id: userToChatId } = req.params;
		const senderId = req.user._id;
        
        
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;
        console.log("con",conversation)

		res.status(200).json(messages);
        
    } catch (error) {
         
        console.log("Error in get message controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }

}


module.exports={sendMessage,getMessages}