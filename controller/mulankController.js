const mulankModel = require("./../model/mulankModel");

exports.getMulank = async (req, res, next) => {
  try {
    const result = await mulankModel.findOne({
      number: `${+req.params.mulankNumber}`,
    });

    res.status(200).json({
      status: "success",
      data: {
        data: result,
      },
    });
  } catch {
    console.log("Error");
  }
};
