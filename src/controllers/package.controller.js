import PackageServices from "../services/package.services.js";

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
}

export default PackageControllers;
