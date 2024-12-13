import SenderServices from "../services/sender.services.js";

class SenderController {
  async index(req, res) {
    try {
      const senders = await SenderServices.getSenders();

      return res.status(200).json({
        status: true,
        message: "Senders retrieved successfully",
        data: senders,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const sender = await SenderServices.getSender(id);

      return res.status(200).json({
        status: true,
        message: "Sender retrieved successfully",
        data: sender,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  }
}

export default SenderController;
