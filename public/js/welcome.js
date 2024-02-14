import axios from "axios";
const detailsForm = document.querySelector(".form--details");

class User {
  constructor(fullName, DOB, gender) {
    this.fullName = fullName;
    this.DOB = DOB;
    this.gender = gender;
  }
}

const getReportPage = async function(user) {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/numeroPedia/getReport",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log("Error", err);
  }
};

if (detailsForm) {
  detailsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const user = new User(fullName, dob, gender);
    // console.log(user);
    getReportPage(user);
  });
}
