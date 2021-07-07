import User from "../models/user";
import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken"; // To generate signed token
import expressJwt from "express-jwt"; // For authorization check

import errorHandler from "../helpers/dbErrorHandler";

export const signup = async (req: any, res: any) => {
  let { username, hashed_password, pin } = req.body;

  const salt = await bcryptjs.genSalt();

  const passwordHash = await bcryptjs.hash(hashed_password, salt);
  const pinHash = await bcryptjs.hash(pin, salt);

  const newUser = await new User({
    username,
    hashed_password: passwordHash,
    pin: pinHash,
  });

  await newUser.save((err: any, newUser: any) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    newUser.salt = undefined;
    hashed_password = undefined;
    pin = undefined;

    res.json({ newUser });
  });
};

export const signin = (req: any, res: any) => {
  // find the user based on username
  const { username, hashed_password } = req.body;

  User.findOne({ username }, async (err: any, user: any) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ msg: "User does not exist. Please signup." });
    }

    // if user is found make sure the username and password match
    const isMatch = await bcryptjs.compare(
      hashed_password,
      user.hashed_password
    );
    if (!isMatch) {
      return res.status(400).json({ msg: "User name and password don't match" });
    }

    // generate a signed token with user id and secret
    const jwtsecret: any = process.env.JWT_SECRET;
    const token = jwt.sign({ _id: user.id }, jwtsecret);

    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { maxAge: 600000 });

    // return response with user and token to frontend client
    const { _id, username, role } = user;
    return res.json({ token, user: { _id, username, role } });
  });
};

export const signout = (req: any, res: any) => {
  res.clearCookie("t");
  res.json({ msg: "Signout successfully" });
};

const expressSecret: any = process.env.JWT_SECRET;
export const requireSignin = expressJwt({
  secret: expressSecret,
  algorithms: ["sha1", "RS256", "HS256"],
  userProperty: "auth",
});

export const isAuth = (req: any, res: any, next: any) => {
  const user = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!user) {
    return res.status(403).json({ msg: "Access denied" });
  }
  next();
};

export const isVendor = (req: any, res: any, next: any) => {
  if (req.profile.role === 0) {
    return res.status(403).json({ msg: "Vendor resource: access denied" });
  }
  next();
};
