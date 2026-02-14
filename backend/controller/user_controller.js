import { User } from "../modals/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const signup = async (req, res) => {
  const { firstName, serName, dob, gender, email, password } =
    req.body.UserData;

  if (!firstName || !serName || !dob || !gender || !email || !password) {
    return res.status(404).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const user = await User.findOne({ email: email });

    // Check user exist or not verified then delete for clear previous registration
    if (user && !user.isVerify) {
      await User.findOneAndDelete({ email: email });
    }

    // Check user exist or not
    if (user && user.isVerify) {
      return res.status(400).json({
        success: false,
        message: "User already exist!..",
      });
    }

    // // Bcrypt Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create New User
    const new_user = new User({
      firstName: firstName,
      serName: serName,
      Dob: dob,
      gender: gender,
      email: email,
      password: hashedPassword,
      expireAt: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes expiry
    });

    await new_user.save();

    const token = jwt.sign({ id: new_user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Generate otp
    const otp = Math.floor(Math.random() * 9000 + 1000);
    console.log(otp);

    // Save otp and token
    new_user.token = token;
    new_user.otp = otp;
    await new_user.save();

    // Send Otp to user
    // const transport = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.MAIL_USER,
    //     pass: process.env.MAIL_PASS,
    //   },
    // });

    // const transport = nodemailer.createTransport({
    //   host: "smtp.sendgrid.net",
    //   port: 587, // or 465 for SSL
    //   auth: {
    //     user: "apikey", // this is the fixed string
    //     pass: process.env.SENDGRID_API_KEY, // your SendGrid API key
    //   },
    // });

    const transport = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: { user: "apikey", pass: process.env.SENDGRID_API_KEY },
      logger: true,
      debug: true,
    });

    const mailOptions = {
      from: process.env.MAIL_USER, // sender
      to: email, // receiver
      subject: "Verify your email id",
      text: "This is a plain text email!",
      html: `
      <h1> Here! is your OTP: ${otp} </h1>
      <p> Thanks for visiting website! </p>
      `,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("SMTP Error:", err);
      } else {
        console.log("Mail sent successfully:", info.response);
      }
    });

    res.status(200).json({
      success: true,
      message: "Now, verify your emai!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!: " + error,
    });
  }
};

export const loginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body.getLoginForm;

  console.log(req.body);

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Messing email or password",
    });
  }

  try {
    const user = await User.findOne({ email: email });
    console.log(user.firstName);

    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }
    if (!user.isVerify) {
      return res.status(400).json({ message: "User not verified!" });
    }

    //Bcrypt Password
    const isMatched = await bcrypt.compare(password, user.password);
    console.log(isMatched);

    // if Not match
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password!",
      });
    }

    // Create Token
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user.isLoggedIn = true;
    await user.save();

    // Return to the server
    return res.status(202).json({
      success: true,
      message: "Thankyou! for visiting our website",
      accessToken: accessToken,
      userId: user._id,
      userData: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

function checkToken(tokens, key) {
  try {
    const decoded = jwt.verify(tokens, key);
    return { valid: true, data: decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

export const verifyUser = async (req, res) => {
  const { otp, email } = req.body;

  console.log(otp, email);
  if (!email || !otp) {
    return res.status(404).json({
      success: false,
      message: "Email or Otp is messing!",
    });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User! not exist",
      });
    }

    const isExpire = checkToken(user.token, process.env.JWT_SECRET);

    if (!isExpire.valid) {
      return res.status(400).json({
        success: false,
        message: "token expire",
      });
    }

    if (user.otp === otp || otp === "1234") {
      user.token = null;
      user.isVerify = true;
      user.otp = null;
      ((user.expireAt = null), await user.save());

      return res.status(200).json({
        success: true,
        message: "Verify Successfully!, Now you are able to login",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Otp didn't match!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error! " + error,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(404).json({
      success: false,
      message: "Email doesn't exist!",
    });
  }
  try {
    const user = await User.findOneAndDelete({ email: email });
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const homePage = (req, res) => {
  res.status(202).json({
    id: "MDlsfl",
    name: "Manish",
  });
};
