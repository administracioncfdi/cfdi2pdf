//function to get maximum 3 digits to letters (currency)
getGroupToCurrency = function(group){
  //necessary arrays needed to convert from numbers to currency
  var basics = [ "cero", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince"];
  var teens = [ "", "dieci", "veinti", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  var hundreds = [ "", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
  //variable used to temporarly store currency
  var to_currency = "";
  //handle hundreds
  if(group.length == 3){
    switch (parseInt(group)){
      case 100: return "cien ";
      case 000: return "";
      default: to_currency += hundreds[parseInt(group[0])] + " ";
    }
    group = group.substring(1,3);
  }
  //handle teens and 'basic' numbers
  if(parseInt(group) <= 15){
    //if group is less than 15, select from basics array
    if(group == "00" ){
      return to_currency;
    }else{
      to_currency += basics[parseInt(group)] + " ";
    }
  }else{
    //else look for the number in both teens and basics arrays
    var zero_at_the_end = (group[1] == "0");
    switch (parseInt(group)){
      case 20: return to_currency + "veinte ";
      default: to_currency += teens[parseInt(group[0])] + (parseInt(group[0]) >= 3 && !zero_at_the_end ? " y " : "") + ( zero_at_the_end ? "" : basics[parseInt(group[1])]) + " ";
    }
  }
  //return result
  return to_currency;
}

//function to get entire number to currency
toCurrency = function(number){
  //number to string
  number = number.toFixed(2);
  //separate decimals (only 2) and integers
  var integers = number.substring(0, number.indexOf("."));
  var decimals = number.substring(number.indexOf(".") + 1, number.length);

  //intitalize string to store currency
  var number_to_currency = "";

  //some helpful variables
  var no_thousands = false;
  var no_hundreds = false;
  var thousands_of_millions = false;

  //Maximum supported number is 999,999,999,999.99
  if(integers.length <= 12){
    //evaluate each group of 3 digitis (hundreds, thousands, millions, thousans of millions)
    //evaluate thousands of millions
    if(integers.length == 12 || integers.length == 11 || integers.length == 10 ){
      var group = integers.substring(0, integers.length-9);
      thousands_of_millions = true;
      switch (parseInt(group)){
        case 0: break;
        case 1: number_to_currency += "mil "; break;
        default: number_to_currency += getGroupToCurrency(group) + "mil ";
      }
      integers = integers.substring(integers.length-9, integers.length);
    }
    //evaluate millions
    if(integers.length == 9 || integers.length == 8 || integers.length == 7){
      var group = integers.substring(0, integers.length-6);
      number_to_currency += getGroupToCurrency(group);
      if(!thousands_of_millions && parseInt(group) == 1){
        number_to_currency += "millon "
      }else{
        number_to_currency += "millones "
      }
      integers = integers.substring(integers.length-6, integers.length);
    }
    //evaluate thousands
    if(integers.length == 6 || integers.length == 5 || integers.length == 4){
      var group = integers.substring(0, integers.length-3);
      no_thousands = parseInt(group) == 0 ? true : false;
      switch (parseInt(group)){
        case 0: break;
        case 1: number_to_currency += "mil "; break;
        default: number_to_currency += getGroupToCurrency(group) + "mil ";
      }
      integers = integers.substring(integers.length-3, integers.length);
    }
    //evaluate hundreds
    no_hundreds = parseInt(integers) == 0 ? true : false;
    number_to_currency += getGroupToCurrency(integers);
    number_to_currency += (no_thousands && no_hundreds ? "de " : "") + (number_to_currency == "un " ? "peso " : "pesos ") + decimals + "/100 M.N."
    return number_to_currency.toUpperCase();
  }else{
    var error_message = "Error: el número es demasiado grande." ;
    return error_message;
  }
}

module.exports = toCurrency
