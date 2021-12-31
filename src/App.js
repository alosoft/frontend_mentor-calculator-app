import "./App.css";
import React, { useContext, useState } from 'react';
import { ThemeContext } from './theme.js';

let mode = localStorage.getItem('theme');
function App() {
  const [theme, setTheme, getTheme] = useContext(ThemeContext)
  const [theme_index, setTheme_index] = useState(mode === 'dark' ? 0 : mode === 'light' ? 1 : 2);
  const [operation, setOperation] = useState('');
  let formulaList = [];

  const theme_list = ['dark', 'light', 'voilet'];

  function changeTheme() {
    try {
      if (theme_index < 2) {
        let index = theme_index + 1;
        setTheme_index(index)
        localStorage.setItem('theme', theme_list[index])
        setTheme(theme_list[index]);
      } else {
        setTheme_index(0)
        localStorage.setItem('theme', theme_list[0])
        setTheme(theme_list[0]);
      }
    } catch (error) {
      console.log('error switching theme')
    }
  }

  const currentTheme = getTheme();

  const key_style = {
    background: currentTheme['key-background'],
    boxShadow: `0px 4px 0 ${currentTheme['key-shadow']}`,
    color: currentTheme['text']
  };
  const equals_style = {
    boxShadow: `0px 4px 0 var(--theme${theme === 'dark' ? '1' : theme === 'light' ? '2' : '3'}-key-equal-shadow)`,
    background: `var(--theme${theme === 'dark' ? '1' : theme === 'light' ? '2' : '3'}-key-equal-toggle)`,
    color: 'var(--white)'
  };
  const reset_style = {
    background: theme === 'voilet' ? currentTheme['key-shadow'] : theme === 'light' ? currentTheme['keypad-background'] : currentTheme['keypad-shadow'],
    boxShadow: `0px 4px 0 
    ${theme === 'voilet' ? currentTheme['keypad-shadow'] : theme === 'light' ? currentTheme['keypad-shadow'] : currentTheme['main-background']}`,
    color: 'var(--white)'
  };

  //set background color dynamically
  document.getElementById("root").style.background = currentTheme["main-background"];

  function addNumber(number) {
    setOperation(prevOperation => {
      let current = prevOperation + number
      return current;
    })
  }

  function deleteNumber() {
    setOperation(prevOperation => {
      return prevOperation.slice(0, -1);
    })
  }

  function addOperator(operand) {
    addNumber(operand);
  }

  function calculateAll() {
    const validate = validFormula(operation);
    if (validate) {
      let results = calculateResult();
      //check decimal places
      let temp = results.toString();
      if (temp.indexOf('.') >= 0) {
        let decimals = temp.length - temp.indexOf('.') - 1;
        if (decimals > 4) {
          results = results.toFixed(4)
        }
      }
      setOperation(results + '')
    } else {
      reset();
    }
  }


  const calculate = function (formulaString) {
    let result = 0;
    const numsString = formulaString.split(/[/\\*]/);
    const nums = numsString.map(Number);
    const operators = [];

    if (numsString.length === 1) {
      return Number(numsString[0]);
    }

    formulaString.split("").forEach(value => {
      if (value === "/") {
        operators.push(value);
      }
      if (value === "*") {
        operators.push(value);
      }
    })

    operators.forEach((ope, index) => {
      if (index === 0) {
        result = calc(ope, nums[0], nums[1]);
      } else {
        result = calc(ope, result, nums[index + 1]);
      }
    })
    return result;
  }

  const calc = function (operator, val1, val2) {
    if (operator === "+") {
      return val1 + val2;
    } else if (operator === "-") {
      return val1 - val2;
    } else if (operator === "/") {
      return val1 / val2;
    } else {
      return val1 * val2;
    }
  }

  const calculateResult = () => {
    let result = 0;
    const operators = [];
    //check if formula is right  ['', '3', '6/2', '7*2'] (-3 + 6/2 + 7*2)
    formulaList = operation.split(/[+-]/);
    if (formulaList.length === 1) {
      return calculate(formulaList[0]);
    }

    operation.split(/[0-9]\d*/).forEach(value => {
      if (value === "+") {
        operators.push(value);
      }

      if (value === "-") {
        operators.push(value);
      }
    })

    operators.forEach((ope, index) => {
      const num1 = calculate(formulaList[index]);
      const num2 = calculate(formulaList[index + 1]);
      if (index === 0) {
        result = calc(ope, num1, num2);
      } else {
        result = calc(ope, result, num2);
      }
    })
    return result;
  }

  function reset() {
    setOperation('');
  }

  const operand = /[+*/\\-]/;

  const validFormula = (f) => {
    f = f.toString();
    let amountOfnum = 0;
    let amountOfope = 0;
    amountOfope = f.split(/\d*\.?\d*/).length - 2;
    if (amountOfope <= 0) return false;
    f.split(operand).forEach(val => {
      if (val !== "") { amountOfnum += 1; }
    });

    if (amountOfnum - amountOfope === 1) {
      return true;
    }
    reset();
    return false;

  }


  return <div className="container" style={{
    color: currentTheme['text-2']
  }}>
    <div className="nav">
      <p className="nav__appname">calc</p>
      <div className="nav__menu">
        <p className="nav__theme">THEME</p>
        <div className="nav__themes">
          <div className="nav__themes-names">
            <p className="nav__themes_1">1</p>
            <p className="nav__themes_2">2</p>
            <p className="nav__themes_3">3</p>
          </div>
          <div onClick={() => changeTheme()} className="nav__themes-toggle" style={{
            background: currentTheme['toggle-keyboard-background'],
            justifyContent: theme === 'dark' ? 'flex-start' : theme === 'light' ? 'center' : 'flex-end'
          }}>
            <span className="nav__themes-toggle_switch" style={{
              background: `var(--theme${theme === 'dark' ? '1' : theme === 'light' ? '2' : '3'}-key-equal-toggle)`,
            }}></span>
          </div>
        </div>
      </div>
    </div>
    <div className="answer" style={{
      background: currentTheme['screen-background'],
    }}>
      <p className="answer__text">{operation.length > 0 ? operation : 0}</p>
    </div>
    <div className="controls" style={{
      background: currentTheme['toggle-keyboard-background']
    }}>
      <div onClick={() => addNumber(7)} className="controls__item" style={key_style}><p>7</p></div>
      <div onClick={() => addNumber(8)} className="controls__item" style={key_style}><p>8</p></div>
      <div onClick={() => addNumber(9)} className="controls__item" style={key_style}><p>9</p></div>
      <div onClick={() => deleteNumber()} className="controls__item delete" style={reset_style}><p>del</p></div>
      <div onClick={() => addNumber(4)} className="controls__item" style={key_style}><p>4</p></div>
      <div onClick={() => addNumber(5)} className="controls__item" style={key_style}><p>5</p></div>
      <div onClick={() => addNumber(6)} className="controls__item" style={key_style}><p>6</p></div>
      <div onClick={() => addOperator('+')} className="controls__item" style={key_style}><p>+</p></div>
      <div onClick={() => addNumber(1)} className="controls__item" style={key_style}><p>1</p></div>
      <div onClick={() => addNumber(2)} className="controls__item" style={key_style}><p>2</p></div>
      <div onClick={() => addNumber(3)} className="controls__item" style={key_style}><p>3</p></div>
      <div onClick={() => addOperator('-')} className="controls__item" style={key_style}><p>-</p></div>
      <div onClick={() => addNumber('.')} className="controls__item" style={key_style}><p>.</p></div>
      <div onClick={() => addNumber(0)} className="controls__item" style={key_style}><p>0</p></div>
      <div onClick={() => addOperator('/')} className="controls__item" style={key_style}><p>/</p></div>
      <div onClick={() => addOperator('*')} className="controls__item" style={key_style}><p>x</p></div>
      <div onClick={() => reset()} className="controls__item reset" style={reset_style}><p>reset</p></div>
      <div onClick={() => calculateAll()} className="controls__item equals" style={equals_style}><p>=</p></div>
    </div>
  </div>

}

export default App;
