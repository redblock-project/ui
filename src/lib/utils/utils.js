// @ts-nocheck

export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const mutiply = (number1, number2) => {
    return (new BigNumber(number1)).times(number2).toString();
}

export const divide = (number1, number2) => {
    return (new BigNumber(number1)).div(number2).toString();
}