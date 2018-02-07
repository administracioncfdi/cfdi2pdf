var checkIfExists = function(parameter){
  return parameter ? parameter : ""
}

var checkIfValue = function(parameter){
  return parameter ? parameter : "0"
}

module.exports = { checkIfValue: checkIfValue, checkIfExists: checkIfExists }
