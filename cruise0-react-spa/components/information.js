
//import { useState, useEffect } from "react";



class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};

    /*
    this.el.addEventListener("INFORMATION", (customEvent) => {
      console.log("👋👋👋 Information:", customEvent)
    })
    */
    this.informationRef = React.createRef()
    console.log("=>", this.informationRef)

    this.getInputValue = this.getInputValue.bind(this);

  }

  getInputValue() {
    const inputValue = this.informationRef.current.innerHTML;
    console.log(inputValue)
  }

  componentDidMount() {
    console.log("=>", this.informationRef)
    this.props.messageToParent({
      from: "Information",
      text: "Hello World"
    })
  }

  hello() {
    console.log("👋 hello world 🌍")
  }

  message(msg) {
    console.log("📨 [recipient:Information]", msg)
  }


  render() {
    return (
    <div>
      <h1>Information</h1>
      <div  ref={this.informationRef} id="information">
        ... hello ...
      </div>
      <button onClick={this.getInputValue}>Submit</button>

    </div>
    );
  }
}
