function expressionCalculator(expr) {
    expr = expr.split(' ').join('');
    let openBracket = 0;
    let closeBracket = 0;
    expr.split('').map(el => {
        if (el == '(') {
            openBracket++;
        } else {
            if (el == ')') {
                closeBracket++;
            }
        }
    });
    if (openBracket !== closeBracket) {
        throw new Error('ExpressionError: Brackets must be paired');
    }
    for (let i = 0; i < expr.length; i++) {
        if ((expr[i] == '*') || (expr[i] == '/')) {
            let firstNum = '';
            let secondNum = '';
            for (let j = i - 1; !((expr[j] == '+') || (expr[j] == '-') || (expr[j] == '*') || (expr[j] ==
                    '/') || (expr[j] == undefined)); j--) {
                firstNum = expr[j] + firstNum;
            }
            for (let j = i + 1; !((expr[j] == '+') || (expr[j] == '-') || (expr[j] == '*') || (expr[j] ==
                    '/') || (expr[j] == undefined)); j++) {
                secondNum += expr[j];
            }
            let res;
            if (expr[i] == '*') {
                res = Number(firstNum) * Number(secondNum);
            } else {
                if (secondNum == '0') {
                    throw new Error("TypeError: Division by zero.");
                }
                res = Number(firstNum) / Number(secondNum);
            }
            expr = expr.substr(0, i - firstNum.length) + res + expr.substr(i + secondNum.length + 1);
            i = -1;
        }
    }
    for (let i = 1; i < expr.length; i++) {
        if ((expr[i] == '+') || (expr[i] == '-')) {
            let firstNum = '';
            let secondNum = '';
            for (let j = i - 1; !((expr[j] == '+') || (expr[j] == '-') || (expr[j] == undefined)); j--) {
                firstNum = expr[j] + firstNum;
            }
            if (expr[0] == '-') {
                firstNum = '-' + firstNum;
            }
            for (let j = i + 1; !((expr[j] == '+') || (expr[j] == '-') || (expr[j] == undefined)); j++) {
                secondNum += expr[j];
            }
            let res;
            if (expr[i] == '+') {
                res = Number(firstNum) + Number(secondNum);
            } else {
                res = Number(firstNum) - Number(secondNum);
            }
            expr = expr.substr(0, i - firstNum.length) + res + expr.substr(i + secondNum.length + 1);
            i = 0;
        }
    }
    if (expr.indexOf('.') == -1) {
        //console.log(Number(expr));
        return Number(expr);
    } else {
        //console.log(Number(Number(expr).toFixed(expr.indexOf('.') + 3)));
        let num = Number(Number(expr).toFixed(expr.indexOf('.') + 3));

        return num;
    }
}

module.exports = {
    expressionCalculator
}