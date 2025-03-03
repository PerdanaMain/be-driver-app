import OrderServices from "../services/order.services.js";
import PackageServices from "../services/package.services.js";
import DriverServices from "../services/driver.services.js";

class OrderController {
  index = async (req, res) => {
    try {
      const orders = await OrderServices.getAllOrder();

      return res.status(200).json({
        status: true,
        message: "Order retrieved successfully",
        data: orders,
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
      const { packageId, driverId, startedAt } = req.body;

      const pkg = await PackageServices.getPackage(packageId);
      const driver = await DriverServices.getDriverById(driverId);
      const existing = await OrderServices.getExistingOrder(packageId);

      if (existing) {
        return res.status(400).json({
          status: false,
          message: "Order already exists",
        });
      }

      if (!pkg) {
        return res.status(404).json({
          status: false,
          message: "Package not found",
        });
      }

      if (!driver) {
        return res.status(404).json({
          status: false,
          message: "Driver not found",
        });
      }

      const data = {
        packageId,
        driverId,
        startedAt: new Date(),
        assignedAt: new Date(),
        status: "shipping",
      };

      const order = await OrderServices.createOrder(data);
      await DriverServices.updateDriver(driverId, {
        orderAmounts: driver.orderAmounts + 1,
      });
      await PackageServices.updatePackage(packageId, {
        status: order.status,
      });

      return res.status(201).json({
        status: true,
        message: "Order created successfully",
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

export default OrderController;
