import DriverServices from "../services/driver.services.js";
import UserServices from "../services/user.services.js";
import RoleServices from "../services/role.services.js";
import bcrypt from "bcryptjs";

class DriverController {
  index = async (req, res) => {
    try {
      const drivers = await DriverServices.getAllDrivers();

      return res.status(200).json({
        status: true,
        message: "Drivers retrieved successfully",
        data: drivers,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  };

  create = async (req, res) => {
    try {
      const { name, email, phone, password, vehicle_number, vehicle_type } =
        req.body;

      const driver = await DriverServices.getDriverByEmail(email);

      if (driver) {
        return res.status(400).json({
          status: false,
          message: "Driver already exists",
        });
      }

      const role = await RoleServices.getRoleByName("Driver");
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = {
        email,
        password: hashedPassword,
        roleId: role.id,
      };

      const user = await UserServices.createUser(userData);

      const driverData = {
        name,
        phone,
        userId: user.id,
        vehicle_number,
        vehicle_type,
        isActive: true,
        isAssigned: false,
        orderAmounts: 0,
      };

      const newDriver = await DriverServices.createDriver(driverData);

      return res.status(201).json({
        status: true,
        message: "Driver created successfully",
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  };
}

export default DriverController;
