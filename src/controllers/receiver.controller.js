import ReceiverServices from "../services/receiver.services.js";

class ReceiverController {
  async index(req, res) {
    try {
      const receivers = await ReceiverServices.getReceivers();
      return res.status(200).json({
        status: true,
        message: "Receivers retrieved successfully",
        data: receivers,
      });
    } catch (error) {
      return res.status(200).json({
        status: true,
        message: "Receivers retrieved successfully",
        data: receivers,
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const receiver = await ReceiverServices.getReceiver(id);
      return res.status(200).json({
        status: true,
        message: "Receiver retrieved successfully",
        data: receiver,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  }
}

export default ReceiverController;
