exports.getWelcome = (req, res, next) => {
  try {
    res.status(200).render("welcome", {
      title: "Welcome to NumeroPedia",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getReport = (req, res, next) => {
  try {
    res.status(200).render("report", {
      title: "Your Report",
    });
  } catch (err) {
    console.log(err);
  }
};
