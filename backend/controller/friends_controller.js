import { Chat_Model } from "../modals/chat_message_modal.js";
import { User } from "../modals/user_model.js";

export const getAllFriends = async (req, res) => {
  //   const userId = req.params.userId;
  //   if (!userId) {
  //     return res.status(404).json({
  //       success: false,
  //       message: "User id is messing!",
  //     });
  //   }
  //   try {
  //     const getUser = await User.findById(userId);
  //     if (!getUser) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "User not exist",
  //       });
  //     }
  //     const getAllFriends = [];
  //     async Promise.all(
  //         getUser.friendList.map( async (id) =>{
  //         const data = await User.findById(id);
  //         if(data){
  //             getAllFriends.unshift(data);
  //             console.log(data);
  //         }
  //     })
  //     )
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: "Internal Server Error! :" + error,
  //     });
  //   }
};

export const remove_friend = async (req, res) => {
  const { userId } = req.body;
  const friendId = req.params.friendId;

  if (!userId && !friendId) {
    return res.status(400).json({
      success: false,
      message: "User Id or Friend Id is missing!",
    });
  }

  try {
    const userData = await User.findById(userId);
    const friendData = await User.findById(friendId);

    console.log(friendData, userData);

    if (!userData && !friendData) {
      return res.status(400).json({
        success: false,
        message: "User or Friend not exist!",
      });
    }

    // From Friend List
    userData.friendList = userData.friendList.filter((ids) => {
      return ids.toString() !== friendId.toString();
    });

    friendData.friendList = friendData.friendList.filter((ids) => {
      return ids.toString() !== userId.toString();
    });

    // From Follower List
    userData.follower = userData.follower.filter((ids) => {
      return ids.toString() !== friendId.toString();
    });

    friendData.follower = friendData.follower.filter((ids) => {
      return ids.toString() !== userId.toString();
    });

    // From following List
    userData.following = userData.following.filter((ids) => {
      return ids.toString() !== friendId.toString();
    });

    friendData.following = friendData.following.filter((ids) => {
      return ids.toString() !== userId.toString();
    });

   

    // Now, Remov Chat
    const deletedMessages = await Chat_Model.deleteMany({
      $or: [
        { sender: userId, receiver: friendId },
        { sender: friendId, receiver: userId },
      ],
    });

    await userData.save();
    await friendData.save();

    return res.status(200).json({
        success: true,
        message: "Friend Remove Successfully!"
    })


  } catch (error) {}
};
