import path from "path";
import { User } from "../modals/user_model.js";
import fs from "fs";

export const handleProfilePicChange = async (req, res) => {
  const userId = req.body.userId;
  const file = req.file;

  if (!userId || !file) {
    return res.status(401).json({
      success: false,
      message: "File or user Id is messing!",
    });
  }

  const profileData = {
    fileName: req.file.filename,
    path: req.file.destination,
    profileUrl: `http://localhost:9000/${req.file.destination}/${req.file.filename}`,
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
      const oldFilePath = path.join(
        user.profilePicInfo.path,
        user.profilePicInfo.fileName,
      );
      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.error("Error deleting old profile picture:", err);
        } else {
          console.log("Old profile picture deleted:", oldFilePath);
        }
      });

      user.profilePicInfo = null;
    }

    user.profilePicInfo = profileData;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Save Successfully",
    });
  } catch (error) {}
};

export const handleProfileCoverPicChange = async (req, res) => {
  console.log(req.body, req.file);

  const userId = req.body.userId;
  const file = req.file;

  if (!userId || !file) {
    return res.status(401).json({
      success: false,
      message: "User Id or file is Messing!",
    });
  }

  const profileCoverData = {
    fileName: file.filename,
    path: file.destination,
    profileCoverUrl: `http://localhost:9000/${file.destination}/${file.filename}`,
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

    // Find user.profileCoverPic exist or not if exist-> Delete it and save new one
    if (user.profileCoverPicInof) {
      // Find and delete existing images from upload
      const oldFilePath = path.join(
        user.profileCoverPicInof.path,
        user.profileCoverPicInof.fileName,
      );
      
      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.log("Error: ", err);
        } else {
          console.log("Old profile picture deleted:", oldFilePath);
        }

        user.profileCoverPicInof = null;
      });
    }

    user.profileCoverPicInof = profileCoverData;
    console.log("User Save:",user);
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
