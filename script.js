class Calculator {
  constructor(previousOperandElements, currentOperandElements) {
    this.previousOperandTextElement = previousOperandElements;
    this.currentOperandTextElement = currentOperandElements;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    this.currentOperand.toString().includes(".") && number === "."
      ? this.currentOperand
      : (this.currentOperand = this.currentOperand.toString() + number);
  }

  chooseOperation(operator) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operator;
    this.previousOperand = `${this.currentOperand}  ${operator}`;
    this.currentOperand = "";
  }

  compute() {
    if (this.currentOperand === "" || this.operation === undefined) return;

    let curr = parseFloat(this.currentOperand);
    let prev = parseFloat(this.previousOperand.split(" ").slice(0, 1).toString());
    let operator = this.operation;
    switch (operator) {
      case "+":
        this.currentOperand = prev + curr;
        break;
      case "-":
        this.currentOperand = prev - curr;
        break;
      case "*":
        this.currentOperand = prev * curr;
        break;
      case "÷":
        this.currentOperand = prev / curr;
        break;
    }
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const dataOperation = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((item) => {
  item.addEventListener("click", () => {
    calculator.appendNumber(item.innerText);
    calculator.updateDisplay();
  });
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

dataOperation.forEach((operator) => {
  operator.addEventListener("click", () => {
    calculator.chooseOperation(operator.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
