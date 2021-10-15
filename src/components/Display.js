import React from "react";
import "./display.css";
import { useState } from "react";

function Display() {
  const [text, settext] = useState("");
  const [meaning, setmeaning] = useState("");
  const [pronounce, setpronounce] = useState("");
  const [example, setexample] = useState("");

  function onchange(event) {
    settext(event.target.value);
    console.log();
  }
  async function dictionary() {
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }

  function onclick() {
    console.log(text);
    
    dictionary()
      .then((data) => {
        document.getElementById("display").innerHTML = text;
        console.log(data);

        setmeaning(data[0].meanings[0].definitions[0].definition);

        setpronounce(
          `${data[0].meanings[0].partOfSpeech} / [${data[0].phonetics[0].text}]`
        );
        document.getElementById("line").style.display="block"
        setexample(data[0].meanings[0].definitions[0].example);
      })
      .catch(function (err) {
        console.log("error");
        document.getElementById("display").innerHTML = "Sorry!";
        setpronounce(""
        );
        setmeaning("Undefined Word!");
        setexample("");

        


      });
  }

  return (
    <>
      <h1>Dictionary.</h1>
      <div className="main">
        <input
          type="text"
          onChange={onchange}
          value={text}
          className="input"
          placeholder="Search for a word"
        />
        <button className="btn btn-primary" onClick={onclick}>
          <i className="fa fa-search"></i>
        </button>
        <h1 id="display"> </h1>
        <p className="pronounce">{pronounce}</p>
        <div className="container text-center">
          <span className="meaning">
            {meaning}
            <hr id="line"/>
            {example}
          </span>
        </div>
      </div>
    </>
  );
}

export default Display;
