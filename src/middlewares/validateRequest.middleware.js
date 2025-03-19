import { ZodError } from "zod";

// schema -> zod schema
const validateRequest = (schema) => async (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => ({
        message: `${issue.path.join(".")} is ${issue.message}`,
      }));
      res
        .status(500)
        .json({ error: "Invalid request", details: errorMessages });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default validateRequest;
