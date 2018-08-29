function reverse(s) {
  let o = '';
  for (let i = s.length - 1; i >= 0; i--)
    o += s[i];
  return o;
}

/// Checks words and sentences by removing whitespace
export default function isPalindrome(inputString = "") {

  // console.log(`string: ${string}`)
  inputString = inputString.replace(/\W/g, '').toLowerCase();

  let result = checkByReversing(inputString);
  logResult(inputString, result);

  result = checkByReversingSecondHalf(inputString);
  logResult(inputString, result);

  result = checkByLoop(inputString);
  logResult(inputString, result);

  if (inputString.length < 1000){
    console.time("checkByRecursion");
    result = checkByRecursion(inputString, 0);
    console.timeEnd("checkByRecursion");
    logResult(inputString, result);
  }
}

function checkByReversing(str): boolean {
  console.time("checkByReversing");
  const result = str == str.split('').reverse().join('');
  console.timeEnd("checkByReversing");
  return result;
}

function checkByReversingSecondHalf(string = ""): boolean {
  console.time("checkByReversingSecondHalf");
  let result = false;
  if (string.length % 2 === 0) {
    const str1 = string.slice(0, string.length / 2);
    const str2 = reverse(string.slice(string.length / 2, string.length));
    result = str1 === str2;
  } else {
    const str1 = string.slice(0, parseInt("" + string.length / 2));
    const str2 = reverse(string.slice(Math.ceil(string.length / 2), string.length));
    result = str1 === str2;
  }
  console.timeEnd("checkByReversingSecondHalf");

  return result;
}

function checkByLoop(str) {
  console.time("checkByLoop");
  let result = true;
  var len = Math.floor(str.length / 2);
  for (var i = 0; i < len; i++)
    if (str[i] !== str[str.length - i - 1])
      result = false;
  console.timeEnd("checkByLoop");
  return result;
}

function checkByRecursion(s, i) {
  let result = (i = i || 0) < 0 || i >= s.length >> 1 || s[i] == s[s.length - 1 - i] && checkByRecursion(s, ++i);
  return result;
}

function logResult(string, result) {
  console.log(`string: ${string.substring(0, 100)}, Result: ${result}`);
}