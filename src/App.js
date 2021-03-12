import React, { useEffect, useState } from 'react';
// import backspace from './icons/backspace.svg';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [pressedEqual, setPressedEqual] = useState(false);

  useEffect(() => {
    changeOutput();
  }, [input]);


  function changeOutput() {
    if (input.length === 0) {
      return;
    }

    let inputString = input+'';

    let lastChar = inputString[inputString.length-1];

    if (lastChar === "+"
      || lastChar === "-"
      || lastChar === "*"
      || lastChar === "/") {
      inputString = inputString.slice(0, inputString.length-1);
    }

    let numbers = inputString.split(/\+|\-|\*|\/|\%/g).filter(el => el.length>0);
    let operators = inputString.replace(/[0-9]|\./g, "").split("");

    let percentage = operators.indexOf("%");
    while (percentage !== -1) {
      numbers.splice((percentage), 1, numbers[percentage - 1] / 100 * numbers[percentage]);
      operators.splice(percentage, 1);
      percentage = operators.indexOf("%");
    }

    function operation(char, op) {
      let i = operators.indexOf(char);
  
      while (i !== -1) {
        numbers.splice(i, 2, op(parseFloat(numbers[i]), parseFloat(numbers[i + 1])));
        operators.splice(i, 1);
        i = operators.indexOf(char);
      }
    }

    operation("/", (a, b) => a / b);
    operation("*", (a, b) => a * b);
    operation("-", (a, b) => a - b);
    operation("+", (a, b) => a + b);

    if (numbers[0] === Infinity || numbers[0] === -Infinity || isNaN(numbers[0])) {
      setOutput('Invalid operation');
    } else {
      setOutput(numbers[0]);
    }
  };

  const showResult = (e) => {
    setInput(output);
    setPressedEqual(true);
  };

  const backspace = () => {
    if (input === 'Invalid operation') {
      setInput('');
      setOutput('');
    } else {
      setInput(input => input.slice(0, input.length - 1));
    }
  };

  const deleteAll = () => {
    setInput('');
    setOutput('');
  };

  const handleClick = (e) => {

    if (e.target.className.includes('button')) {
      if (pressedEqual) {
        setInput(e.target.value);
        setPressedEqual(false);
      } else {
        setInput(value => value + e.target.value);
      }
    }

    if (e.target.className.includes('operator')) {
      if (!input || input === 'Invalid operation') {
        setInput('0' + e.target.value);
        setPressedEqual(false);
      } else {
        let lastChar = input[input.length-1];

        if (lastChar === "+"
          || lastChar === "-"
          || lastChar === "*"
          || lastChar === "/") {
          setInput(input => input.slice(0, input.length-1) + e.target.value);
        } else {
          setInput(value => value + e.target.value);
          setPressedEqual(false);
        }
      }
    }

    if (e.target.className.includes('equal')) {
      showResult();
    }

    if (e.target.className.includes('backspace')) {
      backspace();
    }

    if (e.target.className.includes('clear')) {
      deleteAll();
    }
  };

  const pressedKey = (e) => {
    let numbers = '0123456789.';
    let operators = '/*-+';

    if (numbers.includes(e.key)) {
      if (pressedEqual) {
        setInput(e.key);
        setPressedEqual(false);
      } else {
        setInput(input => input + e.key);
      }
    }

    if (operators.includes(e.key)) {
      if (!input || input === 'Invalid operation') {
        setInput('0' + e.key);
        setPressedEqual(false);
      }

      let lastChar = input[input.length-1];

      if (lastChar === "+"
        || lastChar === "-"
        || lastChar === "*"
        || lastChar === "/") {
          setInput(input => input.slice(0, input.length-1) + e.key);
      } else {
          setInput(value => value + e.key);
          setPressedEqual(false);
      }
    }

    if (e.key === 'Enter') {
      showResult();
    }

    if (e.key === 'Backspace') {
      backspace();
    }

    if (e.key === 'Delete') {
      deleteAll();
    }
  };

  return (
    <div className="App" onKeyDown={pressedKey}>
      <h1 className="header">Calculator</h1>

      <div className="calculator" onClick={handleClick}>
        <form action="" className="calculator__form">
          <div className="calculator__row">
            <div className="calculator__display">
              <div className="calculator__input" id="display">{input}</div>
              <div className="calculator__output">{output}</div>
            </div>

          </div>
          <div className="calculator__row">
            <button autoFocus type="button" value="ac" className="calculator__key calculator__clear">ac</button>
            <button type="button" value="clear" className="calculator__key calculator__backspace">C</button>
            <button type="button" value="%" className="calculator__key calculator__operator">%</button>
            <button type="button" value="/" className="calculator__key calculator__operator">/</button>
          </div>
          <div className="calculator__row">
            <button type="button" value="7" className="calculator__key calculator__button">7</button>
            <button type="button" value="8" className="calculator__key calculator__button">8</button>
            <button type="button" value="9" className="calculator__key calculator__button">9</button>
            <button type="button" value="*" className="calculator__key calculator__operator">*</button>
          </div>
          <div className="calculator__row">
            <button type="button" value="4" className="calculator__key calculator__button">4</button>
            <button type="button" value="5" className="calculator__key calculator__button">5</button>
            <button type="button" value="6" className="calculator__key calculator__button">6</button>
            <button type="button" value="-" className="calculator__key calculator__operator">-</button>
          </div>
          <div className="calculator__row">
            <button type="button" value="1" className="calculator__key calculator__button">1</button>
            <button type="button" value="2" className="calculator__key calculator__button">2</button>
            <button type="button" value="3" className="calculator__key calculator__button">3</button>
            <button type="button" value="+" className="calculator__key calculator__operator">+</button>
          </div>
          <div className="calculator__row">
            <button type="button" value="." className="calculator__key calculator__button">.</button>
            <button type="button" value="0" className="calculator__key calculator__button">0</button>
            <button type="button" value="=" className="calculator__key calculator__key--equal">=</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
