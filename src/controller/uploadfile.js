const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      url: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage,
};