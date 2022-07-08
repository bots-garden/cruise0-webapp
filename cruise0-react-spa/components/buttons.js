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
    console.log("🔐🔓 Login 🤝...")
    this.auth0Client.loginWithRedirect()
    this.props.messageToParent({from: "Buttons", message:"login"})
  }

  logoutClick() {
    console.log("🔒 Logout 👋...")
    this.auth0Client.logout()
    this.props.messageToParent({from: "Buttons", message:"logout"})
  }

  async linkClick() {
    console.log("🔗 Linking...")
    await A0Helpers.linkAccount({auth0Client: this.auth0Client, config: this.config})

    // Refresh identities
    this.auth0Client.loginWithRedirect()

    this.props.messageToParent({from: "Buttons", message:"link"})
  }

  message(msg) {
    console.log("📨 [recipient:Buttons]", msg)
  }

  setAuth0Properties({auth0Client, config}) {
    this.auth0Client = auth0Client
    this.config = config
    console.log("ℹ️ [recipient:Buttons]", this.auth0Client, this.config )

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
