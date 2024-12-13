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
        senderId,
      } = req.body;

      const sender = await SenderServices.getSender(senderId);
      let receiver = await ReceiverServices.getReceiverByName(receiverName);

      if (!sender)
        return res.status(404).json({
          status: false,
          message: "Sender not registered",
        });

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
        senderId,
        receiverId: receiver.id,
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
}

export default PackageControllers;
