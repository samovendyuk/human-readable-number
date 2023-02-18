module.exports = function toReadable(number) {
    let firstTen = {
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
    };
    let tenToTwenty = {
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        14: "fourteen",
        15: "fifteen",
        16: "sixteen",
        17: "seventeen",
        18: "eighteen",
        19: "nineteen",
    };
    let dozens = {
        20: "twenty",
        30: "thirty",
        40: "forty",
        50: "fifty",
        60: "sixty",
        70: "seventy",
        80: "eighty",
        90: "ninety",
    };
    let hundred = {
        100: "one hundred",
        200: "two hundred",
        300: "three hundred",
        400: "four hundred",
        500: "five hundred",
        600: "six hundred",
        700: "seven hundred",
        800: "eight hundred",
        900: "nine hundred",
    };
    let result = "";
    if (number == "0") return "zero";

    if (number > 0 && number < 10) {
        for (let key in firstTen) {
            if (key == number) {
                result = Object.values(firstTen[key]).join("");
            }
        }
    }

    if (number > 9 && number < 20) {
        for (let key in tenToTwenty) {
            if (key == number) {
                result = Object.values(tenToTwenty[key]).join("");
            }
        }
    }

    if (number > 19 && number < 100) {
        for (let key in dozens) {
            for (let i = 0; i < 10; i++) {
                let count = +key + i;
                if (count == number) {
                    if (!firstTen[i]) {
                        result += Object.values(dozens[key]);
                    } else {
                        result =
                            Object.values(dozens[key]) +
                            " " +
                            Object.values(firstTen[i]);
                    }
                }
            }
        }
    }

    if (number > 99 && number < 1000) {
        for (let key in hundred) {
            for (let i = 0; i < 100; i++) {
                let res = +key + i;
                if (res == number && res < +key + 10) {
                    if (!firstTen[i]) {
                        result += Object.values(hundred[key]);
                    } else {
                        result =
                            Object.values(hundred[key]) +
                            " " +
                            Object.values(firstTen[i]);
                    }
                }
                if (res == number && res < +key + 20 && res > +key + 9) {
                    result =
                        Object.values(hundred[key]) +
                        " " +
                        Object.values(tenToTwenty[i]);
                }
                if (res == number && res > +key + 19 && res < +key + 100) {
                    let temporary = "";
                    for (let k in dozens) {
                        for (let j = 0; j < 10; j++) {
                            let count = +k + j;
                            if (number - key === count) {
                                if (!firstTen[j]) {
                                    temporary = Object.values(dozens[k]);
                                } else {
                                    temporary =
                                        Object.values(dozens[k]) +
                                        " " +
                                        Object.values(firstTen[j]);
                                }
                            }
                        }
                    }
                    result = Object.values(hundred[key]) + " " + temporary;
                }
            }
        }
    }

    return result.replace(/[\,]/g, "");
};
