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

  show = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await OrderServices.getOrderById(id);

      if (!order) {
        return res.status(404).json({
          status: false,
          message: "Order not found",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Order retrieved successfully",
        data: order,
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
      const { packageId, driverId } = req.body;

      const pkg = await PackageServices.getPackage(packageId);
      const driver = await DriverServices.getDriverById(driverId);
      const existing = await OrderServices.getExistingOrder(packageId);

      if (existing) {
        return res.status(400).json({
          status: false,
          message: "The package is already assigned to a driver",
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

      if (driver.isActive === false) {
        return res.status(400).json({
          status: false,
          message: "Driver is not active, please select active driver",
        });
      }

      if (driver.orderAmounts >= 20) {
        return res.status(400).json({
          status: false,
          message: "Driver has reached the maximum order limit",
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
        isAssigned: true,
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

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { status, driverId } = req.body;
      const order = await OrderServices.getOrderById(id);
      const driver = await DriverServices.getDriverById(driverId);

      if (!order) {
        return res.status(404).json({
          status: false,
          message: "Order not found",
        });
      }

      if (!driver) {
        return res.status(404).json({
          status: false,
          message: "Driver not found",
        });
      }

      if (driver.id !== order.driverId) {
        await DriverServices.updateDriver(order.driverId, {
          orderAmounts: driver.orderAmounts - 1,
          isAssigned: driver.orderAmounts - 1 === 0 ? false : true,
        });
        await DriverServices.updateDriver(driverId, {
          orderAmounts: driver.orderAmounts + 1,
          isAssigned: true,
        });
      }

      await OrderServices.updateOrder(id, {
        status,
        driverId,
        completedAt: status === "done" ? new Date() : null,
      });

      if (status === "done") {
        await PackageServices.updatePackage(order.packageId, {
          status: "delivered",
        });

        await DriverServices.updateDriver(driverId, {
          orderAmounts: driver.orderAmounts - 1,
          isAssigned: driver.orderAmounts - 1 === 0 ? false : true,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Order updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  };

  destroy = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await OrderServices.getOrderById(id);

      if (!order) {
        return res.status(404).json({
          status: false,
          message: "Order not found",
        });
      }

      await OrderServices.deleteOrder(id);
      await DriverServices.updateDriver(order.driverId, {
        orderAmounts: order.drivers.orderAmounts - 1,
      });

      await PackageServices.updatePackage(order.packageId, {
        status: "pending",
      });

      return res.status(200).json({
        status: true,
        message: "Order deleted successfully",
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
