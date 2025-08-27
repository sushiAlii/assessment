// Extra logger middleware stub for candidate to enhance
module.exports = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (data) {
    console.log("Response:", data);

    return originalJson.call(this, data);
  };

  next();
};
