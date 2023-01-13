const sum = (array) => {
    let result = 0;
  
    array.forEach(item => {
      result += item;
    });

    return result;
  }

const UID = (name) => {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    let utf8Encode = new TextEncoder();
    let firstPart = utf8Encode.encode(name);
    let secondPart = (Math.random() * 46656) | 0;
    firstPart = (sum(firstPart).toString());
    secondPart = ("000" + secondPart.toString()).slice(-3);
    return firstPart + secondPart;
};


exports.UID = UID;