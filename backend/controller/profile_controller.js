import "dotenv";
import { User } from "../modals/user_model.js";
import ImageKit, { toFile } from "@imagekit/nodejs";


const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.URL_END_POINT,
});


// Profile Pic Image 
export const handleProfilePicChange = async (req, res) => {
  const userId = req.body.userId;
  const file = req.file;

  if (!userId || !file) {
    return res.status(401).json({
      success: false,
      message: "File or user Id is messing!",
    });
  }


  // Upload Files
  let result;
  try {
    result = await imageKit.files.upload({
      file: await toFile(Buffer.from(file.buffer), 'file'),
      fileName: file.originalname,
      folder: "/Convo_Chart/Profile/profile_pic",
    });
  } catch (error) {
  }

  const profileData = {
    fileName: result.fileId,
    profileUrl: result.url,
    uploadDate: Date.now(),
  };

  try {
    const user = await User.findById(userId);

    // Check user exist or not
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not exist!",
      });
    }

    // Check User.profilePicInfo Exist then delete and save new one
    if (user.profilePicInfo) {
      // Find and delete existing images from upload
     try {
      const deleteFile = await imageKit.files.delete(user.profilePicInfo.fileName);
     } catch (error) {
     }
    }

    user.profilePicInfo = profileData;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Save Successfully",
    });
  } catch (error) {}
};



// Profile Cover Image
export const handleProfileCoverPicChange = async (req, res) => {
  const userId = req.body.userId;
  const file = req.file;

  if (!userId || !file) {
    return res.status(401).json({
      success: false,
      message: "User Id or file is Messing!",
    });
  }

  // Upload into Image Kit
  const result = await imageKit.files.upload({
    file: await toFile(Buffer.from(file.buffer), "file"),
    fileName: file.originalname,
    folder: "/Convo_Chart/Profile/profile_cover",
  });

  const profileCoverData = {
    fileName: result.fileId,
    profileCoverUrl: result.url,
    uploadDate: Date.now(),
  };

  try {
    const user = await User.findById(userId);

    // Check user exist or not
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not exist",
      });
    }

    // Find user.profileCoverPic exist or not if exist-> Delete it from image kit and save new one
    if (user.profileCoverPicInof?.fileName) {
      try {
        const deleteFile = await imageKit.files.delete(
          user.profileCoverPicInof.fileName,
        );
        console.log("Deleted old file:", deleteFile);
      } catch (err) {
        console.error("Error deleting old file:", err);
      }
    }

    user.profileCoverPicInof = profileCoverData;
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Profile Cover Pic Change",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while Uploading",
    });
  }
};
