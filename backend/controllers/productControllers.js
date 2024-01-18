exports.getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    messsage: "This route will show all products in DB.",
  });
};
