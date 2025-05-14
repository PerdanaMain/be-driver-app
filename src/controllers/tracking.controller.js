import trackingServices from "../services/tracking.services.js";

class TrackingController {
  index = async (req, res) => {
    try {
      const data = await trackingServices.getAllTracking();

      return res.status(200).json({
        status: true,
        message: "Tracking data retrieved successfully",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error?.message}`,
      });
    }
  };

  showByPackageId = async (req, res) => {
    try {
      const { packageId } = req.params;

      const data = await trackingServices.getTrackingByPackageId(packageId);

      return res.status(200).json({
        status: true,
        message: "Tracking data retrieved successfully",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error?.message}`,
      });
    }
  };

  create = async (req, res) => {
    try {
      const { latitude, longitude, driverId, packageId } = req.body;

      await trackingServices.insertTracking({
        latitude,
        longitude,
        driverId,
        packageId,
        status: "shipping",
      });

      return res.status(201).json({
        status: true,
        message: "Tracking data created successfully",
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: `Internal server error: ${error?.message}`,
      });
    }
  };
}

export default TrackingController;
