import { Chat_Model } from "../modals/chat_message_modal.js";

export const fetchAllChat = async (req, res) => {
  console.log(req.body);

  const { yourId, friendId } = req.body;


  if(!yourId, !friendId){
    return res.status(404).json({
        success: false,
        message: "Messing your id or friend id ",
    })
  }

  try {
    // const chats = await Chat_Model.find({ sender: yourId });

    // Find Chats no matter waht who is sender and who is receiver but both id should match either one  of these
    const chats = await Chat_Model.find({
      $or: [
        { sender: yourId, receiver: friendId },
        { sender: friendId, receiver: yourId },
      ],
    });

    console.log(chats)

    return res.status(202).json({
        success: true,
        message: "Chat Send Successfully",
        chats: chats,
    })
    
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    })
  }
};
