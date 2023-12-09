const operator_keys = document.querySelectorAll('.operator');
const number_keys = document.querySelectorAll('.number');
const clear_key = document.querySelector('#clear-button');
const evaluate_key = document.querySelector('#evaluate');
const upper_screen = document.querySelector('.upper-screen');
const lower_screen = document.querySelector('.lower-screen')
const delete_key = document.querySelector('#delete-button');
const decimal_key = document.querySelector('#decimal');


let num1 = null;
let num2 = null;
let operator = null;
let operatorClicked = false;
let num1inChange = false;
let num2inChange = false;


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


function setNums(number){
    if (num1 === null && num2 === null){
        num1 = number.toString();
    } else if (num2 === null && operator === null){
        num1 += number.toString();
    } else if (num2 === null && operator !== null){
        num2 = number.toString();
    }  else if (num2 !== null && operator !== null){
        num2 += number.toString();
    }
}


function roundNumber(number){
    return Math.round(number * 100000)/100000
}

function removeDigit(){
    if (num2 !== null && num1 !== null){
        num2 = num2.slice(0, -1);
    } else if (num2 === null && num1 !== null){
        num1 = num1.slice(0, -1);
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

function clearScreen(){
    num1 = null;
    num2 = null;
    operator = null;
    upper_screen.textContent = "";
    lower_screen.textContent = "";
}

operator_keys.forEach(element => {
    element.addEventListener('click', (event) => {
        operator = element.textContent;
        const screenMessages = generateScreenMessagesNM();
        setScreenMessages(screenMessages.upper_screen, screenMessages.lower_screen)
    })
})


number_keys.forEach(element => {
    element.addEventListener('click', (event) => {
        setNums(element.textContent);
        const screenMessages = generateScreenMessagesNM();
        setScreenMessages(screenMessages.upper_screen, screenMessages.lower_screen);
    })
})


evaluate_key.addEventListener('click', (event) => {
    if (num1 !== null && num2 !== null && operator !== null){
        let result = evaluate(+num1, +num2, operator);
        if (result === "NaN"){
            clearScreen();
        } else{
            result = roundNumber(result);
            const screenMessages = generateScreenMessagesEqual(result);
            setScreenMessages(screenMessages.upper_screen, screenMessages.lower_screen);
            clearScreen();
            num1 = result.toString();
        }        
    }  
})

clear_key.addEventListener('click', (event) => {
    clearScreen();
})


delete_key.addEventListener('click', (event) => {
    removeDigit();
    const screenMessages = generateScreenMessagesNM();
    setScreenMessages(screenMessages.upper_screen, screenMessages.lower_screen)
})


decimal_key.addEventListener('click', (event) => {
    setNums(decimal_key.textContent);
    const screenMessages = generateScreenMessagesNM();
    setScreenMessages(screenMessages.upper_screen, screenMessages.lower_screen);
})

