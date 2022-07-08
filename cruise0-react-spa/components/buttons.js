class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};

    // This binding is necessary to make `this` work in the callback
    this.loginClick = this.loginClick.bind(this);
    this.logoutClick = this.logoutClick.bind(this);
    this.linkClick = this.linkClick.bind(this);
  }

  loginClick() {
    const event = new CustomEvent('LOGIN', { detail: {message:"login"}})
    document.getElementById("root").dispatchEvent(event)
  }

  logoutClick() {
    const event = new CustomEvent('LOGOUT', { detail: {message:"logout"}})
    document.getElementById("root").dispatchEvent(event)
  }

  linkClick() {
    const event = new CustomEvent('LINK', { detail: {message:"link"}})
    document.getElementById("root").dispatchEvent(event)
  }


  render() {
    return (
    <div>
      <button id="login" onClick={this.loginClick}>
        <strong>Log in</strong>
      </button>
      <button id="logout" onClick={this.logoutClick}>
        Log out
      </button>
      <button id="link" onClick={this.linkClick}>
        Link
      </button>
    </div>
    );
  }
}
