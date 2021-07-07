import User from "../models/user";

export const userById = (req: any, res: any, next: any, id: object) => {
  User.findById(id).exec((err: any, user: any) => {
    if (err || !user) {
      return res.status(400).json({ msg: "User not found" });
    }
    req.profile = user;
    next();
  });
};

export const read = (req: any, res: any) => {
  req.profile.hashed_password = undefined;
  req.profile.pin = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

export const updateVendor = (req: any, res: any) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      user.hashed_password = undefined;
      user.pin = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};