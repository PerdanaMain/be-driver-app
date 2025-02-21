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
      } = req.body;

      let sender = await SenderServices.getSenderByName(senderName);
      let receiver = await ReceiverServices.getReceiverByName(receiverName);

      if (!sender) {
        const data = {
          name: senderName,
          address: senderAddress,
          phone: senderPhone,
          latitude: senderLatitude,
          longitude: senderLongitude,
        };

        sender = await SenderServices.createSender(data);
      }

      if (!receiver) {
        const data = {
          name: receiverName,
          address: receiverAddress,
          phone: receiverPhone,
          latitude: receiverLatitude,
          longitude: receiverLongitude,
        };

        receiver = await ReceiverServices.create(data);
      }

      const data = {
        senderId: sender.id,
        receiverId: receiver.id,
        description: packageDescription,
        status: "pending",
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
        senderId,
      } = req.body;

      const packageData = await PackageServices.getPackage(id);

      if (!packageData)
        return res.status(404).json({
          status: false,
          message: "Package not found",
        });

      const updatedReceiver = await ReceiverServices.update(
        packageData.Receiver.id,
        {
          name: receiverName,
          address: receiverAddress,
          phone: receiverPhone,
          latitude: receiverLatitude,
          longitude: receiverLongitude,
        }
      );

      const updatedPackage = await PackageServices.updatePackage(id, {
        senderId,
        receiverId: updatedReceiver.id,
      });

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
