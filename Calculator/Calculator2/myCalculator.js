$(document).ready(function() {
  class Calculator {
    constructor(prevOperandTextElement, currOperandTextElement) {
      this.prevOperandTextElement = prevOperandTextElement
      this.currOperandTextElement = currOperandTextElement 
      this.clear() //to reset the inputs
    }
    
    //clear all variables
    clear() {
      this.currOperand = ''
      this.prevOperand = ''
      this.operation = undefined
    }

    //delete / backspace
    delete() {
      this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    //add number to display screen everytime number or operator is pressed 
    appendNum(num) {
      if (num === '.' && this.currOperand.includes('.')) 
      return //this will stop execution of the method so code below will never get executed
      this.currOperand = this.currOperand.toString() + num.toString() 
      }

    //function to control when user clicks any operator buttons
    chooseOperation(operation) {
      // console.log(operation)
      if (this.currentOperand === '') return //stoping execution

      if (this.previousOperand !== '') {  //calculate automatically silmutanuosly
        this.calculate()
       }

      this.operation = operation
      this.prevOperand = this.currOperand
      this.currOperand = ''
    }

    //takes value inside the calculator and display results
    calculate() {
      let calculation 
      const prev = parseFloat(this.prevOperand)
      const curr = parseFloat(this.currOperand)

      if(isNaN(prev) || isNaN(curr)) return //stoping execution 

      switch(this.operation) {
        case '/':
          calculation = prev / curr
          break
        case '*':
          calculation = prev * curr
          break
        case '-':
          calculation = prev - curr
          break  
        case '+':
          calculation = prev + curr
          // console.log(calculation)
          break  
        default:
          return
      }

      this.currOperand = calculation
      this.operation = undefined
      this.prevOperand = ''

    }

    //update the screen 
    updateScreen() {
      // alert(this.currOperand)
      // this.currOperand = this.currOperandTextElement.innerText
      // console.log(this.prevOperandTextElement.innerText)

      this.currOperandTextElement.innerText = this.currOperand
      if(this.operation != null) {
        this.prevOperandTextElement.innerText = this.prevOperand + this.operation
      }
      else {
        this.prevOperandTextElement.innerText = this.prevOperand
      }
        
    }
    
  }
  
  
  const numBtns = document.querySelectorAll('[data-num]')
  // numBtns.forEach(buttons => {
  //   console.log(buttons.innerText)
  // })
  
  const optrBtns = document.querySelectorAll('[data-operator]')
  const equalBtn = document.querySelector('[data-equal]')
  const delBtn = document.querySelector('[data-delete]')
  const clearBtn = document.querySelector('[data-clear]')
  const prevOperandTextElement = document.querySelector('[data-previous-operand]')
  const currOperandTextElement = document.querySelector('[data-current-operand]')

  const calculator = new Calculator(prevOperandTextElement, currOperandTextElement)


  numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calculator.appendNum(btn.innerText)
      calculator.updateScreen()
    })
  })

  optrBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calculator.chooseOperation(btn.innerText)
      calculator.updateScreen()
    })
  })

  // equalBtn.click( () => {
  //   calculator.calculate()
  //   calculator.updateScreen()
  // }) 

  equalBtn.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateScreen()
  })

  clearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateScreen()
  })

  delBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateScreen()
  })

  
})


