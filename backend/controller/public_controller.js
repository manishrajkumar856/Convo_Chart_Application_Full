import { RequestModel } from "../modals/friendRequestModel.js";
import { User } from "../modals/user_model.js";

export const handleHomePage = async (req, res) => {
  console.log("Id:", req.id);

  if (!req.id) {
    return res.status(404).json({
      success: false,
      message: "Id is messing!",
    });
  }

  try {
    const user = await User.findById(req.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not exist!",
      });
    }

    return res.status(202).json({
      success: true,
      message: "Request Successfull!",
      userData: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getFriendSuggestion = async (req, res) => {
  const id = req.query.id;
  console.log(id);

  try {
    const UserData = await User.findById(id);

    // Extract friend Ids as string
    const friendIds = UserData.friendList.map((id)=>{
      return id.toString();
    })

    const getFriendsList = await User.find();

    // Felter friend list show only friend who is not become yet
    const filteredData = getFriendsList.filter( (user)=>{
      return user._id != id && !friendIds.includes(user._id.toString()) ;
    })

    return res.status(202).json({
      success: true,
      message: "Friend Suggestion List SUccessfully!",
      friendSuggestionList: filteredData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Can't get Freinds!",
    });
  }
};

export const sendFriendRequest = async (req, res) => {
  const { senderId, receiverId, status } = req.body;

  // await User.updateMany({}, {$set: {following: [], follower: [], userNotifications: []}})

  if (!senderId || !receiverId || !status) {
    return res.status(404).json({
      success: false,
      message: "Request Failed!, one of the field is messing",
    });
  }

  try {
    console.log(senderId, receiverId, status);
    const requestData = {
      senderId: senderId,
      receiverId: receiverId,
      requestStatus: "pending",
    };

    const newRequest = new RequestModel(requestData);
    const user = await User.findById(receiverId);
    const sender = await User.findById(senderId);

    console.log(user);

    if (!user || !senderId) {
      return res.status(404).json({
        success: false,
        message: "User Not exist",
      });
    }

    // Proper duplicate check
    const alreadyExists = user.userNotifications.some(
      (n) =>
        n.type == "Friend_Request" &&
        n.data.senderId == requestData.senderId &&
        n.data.receiverId == requestData.receiverId &&
        n.data.requestStatus == requestData.requestStatus,
    );

    // Check Already Exist or not!
    if (alreadyExists) {
      console.log("Already Exist!");
    } else {
      user.userNotifications.unshift({
        type: "Friend_Request",
        data: requestData,
      });

      await user.save();
    }

    // Sender save receiver id 
    if(!sender.requests.includes(receiverId)){
      sender.requests.unshift(receiverId);
    }

    await sender.save();
    await newRequest.save();


    return res.status(202).json({
      success: true,
      message: "Friend Request Send Successfully!"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!, : " + error,
    });
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Messing Id",
    });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not exist!",
      });
    }

    return res.status(202).json({
      success: true,
      message: "User find successfully!",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error,
    });
  }
};

// Request User Request
export const rejectUserRequest = async (req, res) => {
  const senderId = req.params.id;
  const userId = req.body.userId;

  if (!senderId && !userId) {
    return res.status(404).json({
      success: false,
      message: "Messing sender id or user id",
    });
  }

  try {
    const userData = await User.findById(userId);
    const requestUser = await User.findById(senderId);

    if (!userData || !requestUser) {
      return res.status(404).json({
        success: false,
        message: "User not exist!",
      });
    }

    console.log("Hi",userData.userNotifications);

    userData.userNotifications = userData.userNotifications.filter(itm => {
      return itm.data.senderId !== senderId;
    })

    // Remove id From request User on cancle
    console.log("User : ", userData);
    console.log("Request User:",requestUser);

    if(requestUser.requests.includes(userId)){
      requestUser.requests = requestUser.requests.filter((id)=> id.toString() !== userId.toString());
    }

    await userData.save();
    await requestUser.save();

    return res.status(202).json({
      success: true,
      message: "Request Rejected!",
    })

  } catch (error) {
    if(!senderId && !userId){
    return res.status(500).json({
      success: false,
      message: "Internal Server Error! :"+error,
    })
  }
  }
};


// Request User Request
export const CancleFrRequest = async (req, res) => {
  const cardUserId = req.body.CardUserId;
  const userId = req.body.UserId;

  if(!cardUserId || !userId){
    return res.status(400).json({
      success: false,
      message: "Messing Data"
    })
  }
  

  try {
    const userData = await User.findById(userId);
    const cardUserData = await User.findById(cardUserId);

    //Remove Notification
    cardUserData.userNotifications = cardUserData.userNotifications.filter(itm => {
      return itm.data.senderId !== userId;
    });

    // Remove Requests
    if(userData.requests.includes(cardUserId)){
      userData.requests = userData.requests.filter((id)=> id.toString() !== cardUserId.toString());
    }

    await userData.save();
    await cardUserData.save();

    return res.status(200).json({
      success: true,
      message:"Cancle Request success"
    })


  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error : "+error,
    })
  }
  

};


// Accepted User Request
export const acceptUserRequest = async (req, res)=>{

  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;

  console.log(req.body);

  if (!senderId && !receiverId) {
    return res.status(404).json({
      success: false,
      message: "Messing sender id or user id",
    });
  }


  try {
    const receiverData = await User.findById(receiverId);
    const senderData = await User.findById(senderId);

    console.log("Receiver:",receiverData);
    console.log("Sender:",senderData);

    if (!receiverData && !senderData) {
      return res.status(404).json({
        success: false,
        message: "User not exist!",
      });
    }

  

    receiverData.userNotifications = receiverData.userNotifications.filter(itm => {
      return itm.data.senderId !== senderId;
    })

    //Follower & Following
    receiverData.follower.unshift(senderId);
    receiverData.friendList.unshift(senderId);

    senderData.following.unshift(receiverId);
    senderData.friendList.unshift(receiverId);

    
    await receiverData.save();
    await senderData.save();
    

    return res.status(202).json({
      success: true,
      message: "Request Rejected!",
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error! :"+error,
    })
  }

}