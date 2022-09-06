import "./App.css";
import { useEffect, useState } from "react";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@!%&()/";
const charsArray = Array.from(chars);

export default function App() {
  const [num, setNum] = useState(0);
  const [passArray, setPassArray] = useState([]);

  function generatePassword(value) {
    let array = [];
    for (let j = 0; j < 4; j++) {
      let randomize = "";
      for (let i = 0; i < value; i++) {
        randomize += charsArray[Math.floor(Math.random() * charsArray.length)];
      }
      array.push(randomize);
    }
    setPassArray(array);
  }

  function handleChange(event) {
    setNum(event.target.value);
    generatePassword(event.target.value);
  }

  const passHTML = passArray.map((value, i) => {
    return value.length > 0 ? (
      <p
        className="password--section__block accent"
        key={i}
        onClick={() => {
          navigator.clipboard.writeText(value);
        }}
      >
        {value}
      </p>
    ) : (
      <p className="password--section__block accent" key={i}>
        ···
      </p>
    );
  });

  return (
    <div className="App">
      <div className="hero">
        <h1 className="hero--title">
          Generate a <span className="block--display accent">random password</span>
        </h1>
        <p className="hero--info">Never use an insecure password again.</p>

        <div className="hero--container">
          <label className="hero--label" for="input">
            Password length: {num}
          </label>
          <input className="hero--input" type="range" id="input" name="input" onChange={handleChange} min="0" max="30" value={num} />
        </div>
      </div>

      <div className="password--section">{passHTML}</div>
    </div>
  );
}
