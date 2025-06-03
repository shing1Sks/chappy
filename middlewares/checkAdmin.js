const checkAdmin = (req, res, next) => {
  if (req.body.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
  }
};

export default checkAdmin;
