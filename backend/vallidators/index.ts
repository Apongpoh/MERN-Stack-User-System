import User from "../models/user";

export const userSignupValidator = async (req: any, res: any, next: any) => {
  try {
    let {
      username,
      hashed_password,
      hashed_password_confirm,
      pin,
      pin_confirm,
    } = req.body;

    if (
      !username ||
      !hashed_password ||
      !hashed_password_confirm ||
      !pin ||
      !pin_confirm
    ) {
      return res.status(400).json({ msg: "Please fill out all fields." });
    }

    if (username.length < 5) {
      return res.status(400).json({ msg: "User name too short." });
    }

    if (hashed_password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password must be 8 charaters long." });
    }
    if (!hashed_password.match(/\d/)) {
      return res.status(400).json({ msg: "Password must contain a number." });
    }
    if (hashed_password !== hashed_password_confirm) {
      return res
        .status(400)
        .json({ msg: "Password for verification does not match." });
    }

    if (pin.length < 6) {
      return res.status(400).json({
        msg: "Pin is require to withdraw your coins.It must be 6 digits long.",
      });
    }
    if (!pin.match(/^\d+$/)) {
      return res.status(400).json({ msg: "Pin must contain only digits." });
    }
    if (pin !== pin_confirm) {
      return res
        .status(400)
        .json({ msg: "Pin for verification does not match." });
    }

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exist." });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }

  next();
};

