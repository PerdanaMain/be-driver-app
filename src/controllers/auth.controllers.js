import config from "../utils/index.js";
import userServices from "../services/user.services.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import roleServices from "../services/role.services.js";
class AuthControllers {
  async register(req, res) {
    const { name, email, password, conf_password, roleId, roleName } = req.body;

    const user = await userServices.getUserByEmail(email);
    const role = await roleServices.getRoleByName(roleName);
    const salt = await bcrypt.genSalt();

    if (!role)
      return res.status(400).json({ status: false, message: "Role not found" });

    if (user)
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });

    if (!name || !email || !password || !conf_password || !roleName)
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });

    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const data = await userServices.createUser({
        name,
        email,
        password: hashedPassword,
        roleId: role.id,
      });

      return res.status(200).json({
        status: true,
        message: "User created successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  }

  async login(req, res) {
    // login logic
    const { email, password } = req.body;

    if ((!email, !password))
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });

    try {
      const user = await userServices.getUserByEmail(email);

      const match = await bcrypt.compare(password, user.password);

      if (!user || !match)
        return res
          .status(400)
          .json({ status: false, message: "Invalid credentials" });

      const token = jwt.sign(
        {
          id: user.id,
          roleId: user.roleId,
          email: user.email,
          roleName: user.roles.name,
        },
        config.jwtSecret,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      return res.status(200).json({
        status: true,
        message: "User logged in successfully",
        data: {
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.roles.name,
          },
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  }

  async logout(req, res) {
    res.clearCookie("token");

    return res.status(200).json({
      status: true,
      message: "User logged out successfully",
    });
  }
}

export default AuthControllers;
