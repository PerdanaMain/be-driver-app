import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Fetch all users",
    data: {
      users: [
        {
          id: 1,
          name: "John Doe",
          email: "budi@gmail.com",
        },
      ],
    },
  });
});

export default router;
