import PackageServices from "../services/package.services.js";
import ReceiverServices from "../services/receiver.services.js";
import SenderServices from "../services/sender.services.js";

class PackageControllers {
  async index(req, res) {
    try {
      const packages = await PackageServices.getAllPackages();

      return res.status(200).json({
        status: true,
        message: "Packages retrieved successfully",
        data: packages,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  }

  async create(req, res) {
    try {
      const {
        receiverName,
        receiverAddress,
        receiverPhone,
        receiverLatitude,
        receiverLongitude,
        senderName,
        senderAddress,
        senderPhone,
        senderLatitude,
        senderLongitude,
        packageDescription,
        packageWeight,
        packagePrice,
      } = req.body;

      const data = {
        sender_name: senderName,
        sender_address: senderAddress,
        sender_phone: senderPhone,
        sender_latitude: senderLatitude,
        sender_longitude: senderLongitude,
        receiver_name: receiverName,
        receiver_address: receiverAddress,
        receiver_phone: receiverPhone,
        receiver_latitude: receiverLatitude,
        receiver_longitude: receiverLongitude,
        weight: packageWeight,
        description: packageDescription,
        status: "pending",
        price: packagePrice,
      };

      const packageData = await PackageServices.createPackage(data);

      return res.status(201).json({
        status: true,
        message: "Package created successfully",
        data: packageData,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        receiverName,
        receiverAddress,
        receiverPhone,
        receiverLatitude,
        receiverLongitude,
        senderName,
        senderAddress,
        senderPhone,
        senderLatitude,
        senderLongitude,
        packageDescription,
        packageWeight,
        packagePrice,
      } = req.body;

      const packageData = await PackageServices.getPackage(id);

      if (!packageData)
        return res.status(404).json({
          status: false,
          message: "Package not found",
        });

      const data = {
        sender_name: senderName,
        sender_address: senderAddress,
        sender_phone: senderPhone,
        sender_latitude: senderLatitude,
        sender_longitude: senderLongitude,
        receiver_name: receiverName,
        receiver_address: receiverAddress,
        receiver_phone: receiverPhone,
        receiver_latitude: receiverLatitude,
        receiver_longitude: receiverLongitude,
        weight: packageWeight,
        description: packageDescription,
        status: "pending",
        price: packagePrice,
      };

      const updatedPackage = await PackageServices.updatePackage(id, data);

      return res.status(200).json({
        status: true,
        message: "Package updated successfully",
        data: updatedPackage,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const packageData = await PackageServices.getPackage(id);

      if (!packageData)
        return res.status(404).json({
          status: false,
          message: "Package not found",
        });

      await PackageServices.deletePackage(id);

      return res.status(200).json({
        status: true,
        message: "Package deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  }

  async destroyAll(req, res) {
    try {
      await PackageServices.deleteAllPackage();

      return res.status(200).json({
        status: true,
        message: "All Packages deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  }
}

export default PackageControllers;
