import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles.scss";
import { FaClipboard } from "react-icons/fa";
import { COPY_SUCCESS, ALERT } from "./Messages";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./Characters";

toast.configure();

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswardLength] = useState(20);
  const [uppercase, setUpperCase] = useState(true);
  const [lowercase, setLowerCase] = useState(true);
  const [number, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const copyBtn = useRef();

  const handleGeneratePassword = (e) => {
    if (!uppercase && !lowercase && !numbers && !symbols) {
      notifs(ALERT, true);
    }

    let characterList = "";

    if (uppercase) {
      characterList += upperCaseLetters;
    }

    if (lowercase) {
      characterList += lowerCaseLetters;
    }

    if (numbers) {
      characterList += numbers;
    }

    if (symbols) {
      characterList += specialCharacters;
    }

    setPassword(passwordCreator(characterList));
  };

  useEffect(() => {
    handleGeneratePassword();
  }, []);

  const passwordCreator = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = getRandomIndex(characterListLength);
      password += characterList.charAt(characterIndex);
    }

    return password;
  };

  const getRandomIndex = (limit) => {
    return Math.round(Math.random() * limit);
  };

  const copyFromClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();

    copyBtn.current.disabled = true;
    setTimeout(() => {
      copyBtn.current.disabled = false;
    }, 3000);
  };

  const notifs = (message, Error = false) => {
    if (Error) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCopy = () => {
    copyFromClipboard();

    notifs(COPY_SUCCESS);
  };

  return (
    <div className="container">
      <div className="generator">
        <h2 className="generator_header">Password Generator</h2>

        <div className="generator_password">
          {password}
          <button
            className="generator_passwordGenerateBtn"
            ref={copyBtn}
            onClick={handleCopy}
          >
            <FaClipboard />
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="password-length">Password Length</label>
          <input
            name="password-length"
            id="password-length"
            type="number"
            max={20}
            min={7}
            defaultValue={passwordLength}
            onChange={(e) => setPasswardLength(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
          <input
            id="uppercase-letters"
            name="uppercase-letters"
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUpperCase(e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lowercase-letters">Include Lowercase Letters</label>
          <input
            id="lowercase-letters"
            className="lowercase-letters"
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowerCase(e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="include-number">Include Numbers</label>
          <input
            id="include-number"
            className="include-number"
            type="checkbox"
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="include-symbols">Include Symbols</label>
          <input
            id="include symbols"
            className="include-symbols"
            type="checkbox"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
          />
        </div>
        <button className="generator_btn" onClick={handleGeneratePassword}>
          Generate New Password
        </button>
      </div>
      <div>
        <a
          href="https://portfolio-val.netlify.app/"
          target="_blank"
          class="footer"
        >
          - by Val Valentine
        </a>
      </div>
    </div>
  );
}

export default App;
