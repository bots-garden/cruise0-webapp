class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};

    this.profileRef = React.createRef()
    this.IdentitiesRef = React.createRef()

  }

  message(msg) {
    console.log("đ¨ [recipient:Profile]", msg)
  }

  setAuth0Properties({auth0Client, config}) {
    this.auth0Client = auth0Client
    this.config = config
    console.log("âšī¸ [recipient:Profile]", this.auth0Client, this.config )

  }

  componentDidMount() {

  }

  async displayProfileAvatar() {
    console.log("đˇââī¸ building profile...")
    const profileElement = this.profileRef.current

    const isAuthenticated = await this.auth0Client.isAuthenticated()
    const user = await this.auth0Client.getUser()

    if (isAuthenticated) {
      console.log("đ the user is authenticated:", user)
      console.log("đī¸ sub is userId:", user.sub)

      profileElement.style.display = "block";

      profileElement.innerHTML = `
              <p>${user.name}</p>
              <img src="${user.picture}" />
            `

      const profile = await A0Helpers.getUserProfile({auth0Client: this.auth0Client, user: user, config: this.config})

      console.log("đ user profile:", profile)
      console.log("đĻ¸ identities:", profile.identities)

      console.log("đĒ loading identities...")

      // Refresh identities
      // Send message to MyApp to tell to refresh identities list
      console.log("đĄ refreshing identities", this)

      this.IdentitiesRef.current.setAuth0Properties({auth0Client:this.auth0Client, config: this.config})

      this.IdentitiesRef.current.refreshIdentities({
        user: user,
        userProfile: profile,
      })


    } else {
      console.log("đĨĩ [ui-events(displayProfileAvatar)] the user is not authenticated", user)
      profileElement.style.display = "none";
    }


  }

  render() {
    return (
    <div id="profile">
      <h1>Profile</h1>
      <div ref={this.profileRef}>

      </div>
      <hr></hr>
          <Identities
            ref={this.IdentitiesRef}
            messageToParent={(value) => this.message(value)}>
          </Identities>
    </div>
    );
  }
}
