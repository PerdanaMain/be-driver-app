import RoleServices from "../services/role.services.js";

class RoleController {
  async index(req, res) {
    try {
      const roles = await RoleServices.getRoles();
      return res.status(200).json({
        status: true,
        message: "List of all roles",
        data: roles,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
}

export default RoleController;
