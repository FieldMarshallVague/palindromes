/// Checks words and sentences by removing whitespace
export default class PalindromeChecker {

  /**
   * Run all the checks
   * @param inputString The string to check for palindrome-ness
   */
  public static check(inputString = "") {
    // console.log(`string: ${string}`)
    inputString = inputString
      .replace(/\W/g, '')
      .toLowerCase();

    let result = this.checkByReversing(inputString);
    this.logResult(inputString, result);

    result = this.checkByReversingSecondHalf(inputString);
    this.logResult(inputString, result);

    result = this.checkByLoop(inputString);
    this.logResult(inputString, result);

    if (inputString.length < 1000) {
      console.time("checkByRecursion");
      result = this.checkByRecursion(inputString, 0);
      console.timeEnd("checkByRecursion");
      this.logResult(inputString, result);
    }
  }

  private static reverse(s) {
    let o = '';
    for (let i = s.length - 1; i >= 0; i--) 
      o += s[i];
    return o;
  }

  private static checkByReversing(str) : boolean {
    console.time("checkByReversing");
    const result = str == str
      .split('')
      .reverse()
      .join('');
    console.timeEnd("checkByReversing");
    return result;
  }

  private static checkByReversingSecondHalf(string = "") : boolean {
    console.time("checkByReversingSecondHalf");
    let result = false;
    if (string.length % 2 === 0) {
      const str1 = string.slice(0, string.length / 2);
      const str2 = this.reverse(string.slice(string.length / 2, string.length));
      result = str1 === str2;
    } else {
      const str1 = string.slice(0, parseInt("" + string.length / 2));
      const str2 = this.reverse(string.slice(Math.ceil(string.length / 2), string.length));
      result = str1 === str2;
    }
    console.timeEnd("checkByReversingSecondHalf");

    return result;
  }

  private static checkByLoop(str) {
    console.time("checkByLoop");
    let result = true;
    var len = Math.floor(str.length / 2);
    for (var i = 0; i < len; i++) 
      if (str[i] !== str[str.length - i - 1]) 
        result = false;
    console.timeEnd("checkByLoop");
    return result;
  }

  private static checkByRecursion(s, i) {
    let result = (i = i || 0) < 0 || i >= s.length >> 1 || s[i] == s[s.length - 1 - i] && this.checkByRecursion(s, ++i);
    return result;
  }

  private static logResult(string, result) {
    console.log(`string: ${string.substring(0, 100)}, Result: ${result}`);
  }
}