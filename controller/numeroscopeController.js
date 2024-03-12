const numeroscopeModel = require("./../model/numeroscopeModel");
const mulankModel = require("./../model/mulankModel");
const rajyogModel = require("./../model/rajyogModel");
const combinationModel = require("./../model/combinationModel");

const getLuckyNumber = function(badNumbers) {
  totalNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const luckyNumber = totalNumbers.filter(
    (element) => !badNumbers.includes(element)
  );
  return luckyNumber;
};

const respectiveNumber = function(str, luckyNumbers) {
  let luckyNumberString = `Your ${str} numbers: `;

  luckyNumbers.forEach((element, index) => {
    luckyNumberString += index >= 1 ? `,${element}` : ` ${element}`;
  });

  return luckyNumberString;
};

exports.getNumoTraits = async (req, res, next) => {
  try {
    const result = await numeroscopeModel.findOne({
      pattern: `${req.params.pattern}`,
    });

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getReport = async (req, res, next) => {
  try {
    const DOB = req.params.DOB.replaceAll("-", "")
      .split("")
      .map(Number);

    const mulankNumber = (DOB[6] + DOB[7])
      .toString()
      .split("")
      .map(Number)
      .reduce((acc, currentValue) => acc + currentValue, 0);

    // console.log(mulankNumber);

    const destinyNumber = DOB.reduce(
      (acc, currentValue) => acc + currentValue,
      0
    )
      .toString()
      .split("")
      .map(Number)
      .reduce((acc, currentValue) => acc + currentValue, 0);

    let destinyQualities;

    const mulankQualities = await mulankModel.findOne({ number: mulankNumber });
    // console.log(mulankQualities);
    if (mulankNumber !== destinyNumber) {
      destinyQualities = await mulankModel.findOne({
        number: destinyNumber,
      });
    } else {
      destinyQualities =
        "Your destiny and mulank number is same so your mulank qualitites will be strong";
    }

    const badNumbers = [
      ...new Set([
        ...mulankQualities.enemyNumbers,
        ...mulankQualities.neutralNumber,
        ...destinyQualities.enemyNumbers,
        ...destinyQualities.neutralNumber,
      ]),
    ];
    // console.log(badNumbers);

    const luckyNumber = getLuckyNumber(badNumbers);

    let luckyNumberString = respectiveNumber("lucky", luckyNumber);
    let enemyNumberString = respectiveNumber(
      "enemy",
      mulankQualities.enemyNumbers
    );

    res.status(200).json({
      status: "sucess",
      mulankNumber,
      destinyNumber,
      enemyNumberString,
      luckyNumberString,
      mulankQualities,
      destinyQualities,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getRajyog = async (req, res, next) => {
  try {
    const result = await rajyogModel.findOne({
      pattern: `${req.params.pattern}`,
    });

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getCombination=async(req, res, next)=>{
  try{
    const result= await combinationModel.findOne({
      pattern:`${req.params.pattern}`
    })
    res.status(200).json({
      status: "success",
      result,
    });
  }catch(err){
    console.log(err)
  }
}
