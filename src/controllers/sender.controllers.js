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

  async store(req, res) {
    try {
      const { name, phone, address } = req.body;
      const newSender = await SenderServices.createSender({
        name,
        phone,
        address,
      });

      return res.status(201).json({
        status: true,
        message: "Sender created successfully",
        data: newSender,
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
      const { name, phone, address } = req.body;
      const updatedSender = await SenderServices.updateSender(id, {
        name,
        phone,
        address,
      });

      return res.status(200).json({
        status: true,
        message: "Sender updated successfully",
        data: updatedSender,
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
      await SenderServices.deleteSender(id);

      return res.status(200).json({
        status: true,
        message: "Sender deleted successfully",
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
