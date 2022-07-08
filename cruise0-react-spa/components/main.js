const fetchAuthConfig = () => fetch("/auth_config.json");

window.authors = {
  name: "Philippe Charrière"
}


class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};

    this.InformationRef = React.createRef()
    this.ProfileRef = React.createRef()
    this.ButtonsRef = React.createRef()
  }

  async componentDidMount() {
    // Call the hello method of the Information component
    this.InformationRef.current.hello()

    // Sent message to the Information component
    this.InformationRef.current.message({
      from: "MyApp",
      text: "Hello World"
    })

    // Sent message to the Profile component
    this.ProfileRef.current.message({
      from: "MyApp",
      text: "Hello World"
    })

    // Sent message to the Buttons component
    this.ButtonsRef.current.message({
      from: "MyApp",
      text: "Hello World"
    })

    // Initialize the AuthO client
    const response = await fetchAuthConfig()
    let config = await response.json()
    console.log("0️⃣ Cruise0 configuration:", config);
    let auth0 = new Auth0Client({
      domain: config.domain,
      client_id: config.clientId,
      redirect_uri: window.location.origin,
      audience: `https://${config.domain}/api/v2/`,
      scope:
        "openid email profile read:current_user update:current_user_identities",
    });
    console.log("1️⃣ Auth0Client initialized:", auth0);

    if (location.search.includes("state=") &&
        (location.search.includes("code=") ||
        location.search.includes("error="))) {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
    }

    console.log("2️⃣ initialize properties of the user interface...")

    this.ButtonsRef.current.setAuth0Properties({auth0Client:auth0, config: config})
    this.ProfileRef.current.setAuth0Properties({auth0Client:auth0, config: config})


  }

  message(msg) {
    console.log("📨 [recipient:MyApp]", msg)
  }

  render() {
    return (
      <div>
          <h1>Cruise0 with Auth0</h1>
          <MySubTitle />
          <hr></hr>
          <Buttons
            ref={this.ButtonsRef}
            messageToParent={(value) => this.message(value)}>
          </Buttons>
          <hr></hr>
          <Profile
            ref={this.ProfileRef}
            messageToParent={(value) => this.message(value)}>
          </Profile>
          <hr></hr>
          <Information
            ref={this.InformationRef}
            messageToParent={(value) => this.message(value)}>
          </Information>
        </div>
    );
  }
}



const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);
