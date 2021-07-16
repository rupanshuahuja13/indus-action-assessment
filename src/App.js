import "./App.css";
import IndusButton from "./components/button/button";
import IndusNavbar from "./components/navbar/navbar";
import IndusInput from "./components/input/input";
import db from "./Firebase";
import React, { Fragment } from "react";
import IndusDisplay from "./components/display/indus-display";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.timeOutId = null;
    this.character = "";
    this.wordCount = 0;
    this.characterCount = 0;
    this.timeOutId = null;
    this.isLoading = true;
  }

  async handleChange(event) {
    if (
      localStorage.getItem("oldValues") &&
      JSON.parse(localStorage.getItem("oldValues")).length <= 100
    ) {
      const oldValues = JSON.parse(localStorage.getItem("oldValues"));
      if (oldValues.length === 100) {
        oldValues.splice(0, 1);
        oldValues.push(this.state.value);
      } else {
        oldValues.push(this.state.value);
      }

      localStorage.setItem("oldValues", JSON.stringify(oldValues));
    }
  
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(async () => {
      const translatedText = event.target.value;
      // await this.translateTextToEnglish(
      //   event.target.value
      // );
      this.character = translatedText;
      this.wordCount = this.character
        .split(" ")
        .filter((item) => item !== "").length;
      this.characterCount = this.character.length;
    }, 100);
    //
    this.setState({ value: event.target.value });
  }

  handleReset(event) {
    this.setState({ value: "" });
    this.character = this.state.value;
    this.wordCount = this.character
      .split(" ")
      .filter((item) => item !== "").length;
    this.characterCount = this.character.length;
    localStorage.setItem("oldValues", JSON.stringify([]));
    localStorage.setItem("newValues", JSON.stringify([]));
  }

  async translateTextToEnglish(text) {
    const response = await axios.post(
      "https://translation.googleapis.com/language/translate/v2",
      {},
      {
        params: {
          q: text,
          target: "en",
          key: "AIzaSyA7Rk35Fc1y4tcTxZNquCs70i57WVqispw",
        },
      }
    );
    return response.data.data.translations[0].translatedText;
  }

  handleUndo(event) {
    if (
      localStorage.getItem("oldValues") &&
      JSON.parse(localStorage.getItem("oldValues")).length > 0
    ) {
      const lastValue = JSON.parse(localStorage.getItem("oldValues")).pop();
      localStorage.setItem(
        "oldValues",
        JSON.stringify(
          JSON.parse(localStorage.getItem("oldValues")).splice(
            0,
            JSON.parse(localStorage.getItem("oldValues")).length - 1
          )
        )
      );
      const newValue = JSON.parse(localStorage.getItem("newValues"));
      newValue.push(lastValue)
      localStorage.setItem(
        "newValues",
        JSON.stringify(newValue)
      );
      this.setState({ value: lastValue });
      this.character = this.state.value;
      this.wordCount = this.character
        .split(" ")
        .filter((item) => item !== "").length;
      this.characterCount = this.character.length;
    }
  }

  handleRedo(event) {
    if (
      localStorage.getItem("newValues") &&
      JSON.parse(localStorage.getItem("newValues")).length > 0
    ) {
      const lastValue = JSON.parse(localStorage.getItem("newValues")).pop();
      localStorage.setItem(
        "newValues",
        JSON.stringify(
          JSON.parse(localStorage.getItem("newValues")).splice(
            0,
            JSON.parse(localStorage.getItem("newValues")).length - 1
          )
        )
      );
      const newValue = JSON.parse(localStorage.getItem("oldValues"));
      newValue.push(lastValue)
      localStorage.setItem(
        "oldValues",
        JSON.stringify(newValue)
      );
      this.setState({ value: lastValue });
      this.character = this.state.value;
      this.wordCount = this.character
        .split(" ")
        .filter((item) => item !== "").length;
      this.characterCount = this.character.length;
    }
  }

  async handleSubmit(event) {
    await db
      .firestore()
      .collection("datastore")
      .doc("Hl07FbSAVkzHIKRJNwQ6")
      .update({
        InputValue: this.state.value,
      });
    event.preventDefault();
  }

  async componentDidMount() {
    this.fetchData().then(async () => {
      localStorage.setItem("oldValues", JSON.stringify([]));
      localStorage.setItem("newValues", JSON.stringify([]));
    //  this.translateTextToEnglish(
    //     this.state.value
    //   ).then((translatedText) => {
      const translatedText = this.state.value;
        this.character = translatedText;
        this.wordCount = translatedText
          .split(" ")
          .filter((item) => item !== "").length;
        this.characterCount = translatedText.length;
        this.isLoading = false;
        //this.characterCount = this.state.value.length;
      });
    // });

  }

  async fetchData() {
    const response = db.firestore().collection("datastore");
    if (response) {
      const data = await response.get();
      this.setState({ value: data.docs[0].data().InputValue });
    }
  }

  render() {
      return (
        <Fragment>
          <IndusNavbar text="Demo Project"></IndusNavbar>
          <form onSubmit={this.handleSubmit}>
            <div className="body">
              <div className="sideBar">
                <IndusDisplay
                  displayName="Character Count"
                  text={this.characterCount}
                ></IndusDisplay>
                <IndusDisplay
                  displayName="Word Count"
                  text={this.wordCount}
                ></IndusDisplay>
              </div>
              <div className="inputForm">
                <IndusInput
                  value={this.state.value}
                  onChange={this.handleChange}
                ></IndusInput>
                <div className="buttonContainer">
                  <IndusButton
                    buttonText="Undo"
                    click={this.handleUndo}
                    buttonColor="yellow"
                    disabled={JSON.parse(localStorage.getItem("oldValues")).length === 0}
                  ></IndusButton>
                  <IndusButton
                    buttonText="Redo"
                    click={this.handleRedo}
                    buttonColor="yellow"
                    disabled={JSON.parse(localStorage.getItem("newValues")).length === 0}
                  ></IndusButton>
                  <IndusButton
                    buttonText="Reset"
                    click={this.handleReset}
                    buttonColor="#ccc4c4"
                  ></IndusButton>
                  <IndusButton
                    buttonText="Submit"
                    click={this.handleSubmit}
                    buttonColor="#6eed6e"
                  ></IndusButton>
                </div>
              </div>
            </div>
          </form>
        </Fragment>
      );
  }
}

export default App;
