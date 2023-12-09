function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}


const method_storage = {
    "+": add,
    "-":subtract,
    "*":multiply,
    "/":divide,
}

function evaluate(num1, num2, operator){
    let result = method_storage[operator](num1, num2);
    return result === Infinity ? "NaN": result
}


let num1 = null;
let num2 = null;
let operator = null;
let operatorClicked = false;


function setNums(number){
    if (num1 === null){
        num1 = number
    } else {
        num2 = number
    }
}

function generateScreenMessagesNM(){

    const messages = {};
    if (num1 === null && num2 === null && operator === null){
        messages.upper_screen = "";
        messages.lower_screen = "";
    } else if (num1 !== null && num2 === null && operator === null){
        messages.upper_screen = "";
        messages.lower_screen = num1;
    } else if (num1 !== null && num2 === null && operator !== null){
        messages.upper_screen = `${num1} ${operator}`;
        messages.lower_screen = "";
    } else if (num1 !== null && num2 !== null && operator !== null){
        messages.upper_screen = `${num1} ${operator}`;
        messages.lower_screen = num2;
    }
    return messages
}

function generateScreenMessagesEqual(result){
    const messages = {};
    messages.upper_screen = `${num1} ${operator} ${num2} =`;
    messages.lower_screen = result;
    return messages
}

function setScreenMessages(upper_text, bottom_text){
    console.log(upper_text);
    upper_screen.textContent = upper_text;
    lower_screen.textContent = bottom_text;

}


const operator_keys = document.querySelectorAll('.operator');
operator_keys.forEach(element => {
    element.addEventListener('click', (event) => {
        operator = element.textContent;
        const screenMessages = generateScreenMessagesNM();
        setScreenMessages(screenMessages.upper_screen, screenMessages.lower_screen)
    })
})


const number_keys = document.querySelectorAll('.number');
number_keys.forEach(element => {
    element.addEventListener('click', (event) => {
        setNums(element.textContent);
        const screenMessages = generateScreenMessagesNM();
        setScreenMessages(screenMessages.upper_screen, screenMessages.lower_screen)
        console.log(num1);
        console.log(num2);
    })
})

evaluate_key = document.querySelector('#evaluate');
evaluate_key.addEventListener('click', (event) => {
    if (num1 !== null && num2 !== null && operator !== null){
        let result = evaluate(num1, num2, operator);
        const screenMessages = generateScreenMessagesEqual(result);
        setScreenMessages(screenMessages.upper_screen, screenMessages.lower_screen);
        num1 = result;
        num2 = null;
        operator = null;
        console.log(result);
    }
    
})


clear_key = document.querySelector('#clear-button');
clear_key.addEventListener('click', (event) => {
    num1 = null;
    num2 = null;
    operator = null;
    upper_screen.textContent = "";
    lower_screen.textContent = "";
})

upper_screen = document.querySelector('.upper-screen');
lower_screen = document.querySelector('.lower-screen')