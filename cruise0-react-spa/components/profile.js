class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};

    this.profileRef = React.createRef()
  }

  message(msg) {
    console.log("📨 [recipient:Profile]", msg)
  }

  setAuth0Properties({auth0Client, config}) {
    this.auth0Client = auth0Client
    this.config = config
    console.log("ℹ️ [recipient:Profile]", this.auth0Client, this.config )

    this.displayProfileAvatar()

  }

  async displayProfileAvatar() {
    console.log("👷‍♂️ building profile...")
    const profileElement = this.profileRef.current

    const isAuthenticated = await this.auth0Client.isAuthenticated()
    const user = await this.auth0Client.getUser()

    if (isAuthenticated) {
      console.log("😃 the user is authenticated:", user)
      console.log("🖐️ sub is userId:", user.sub)

      profileElement.style.display = "block";

      profileElement.innerHTML = `
              <p>${user.name}</p>
              <img src="${user.picture}" />
            `

      const profile = await A0Helpers.getUserProfile({auth0Client: this.auth0Client, user: user, config: this.config})

      console.log("🎉 user profile:", profile)
      console.log("🦸 identities:", profile.identities)

      console.log("🪆 loading identities...")

      //TODO handle identities
      //displayIdentities({user: user, userProfile: profile, auth0Client: this.auth0Client, })


    } else {
      console.log("🥵 [ui-events(displayProfileAvatar)] the user is not authenticated", user)
      profileElement.style.display = "none";
    }




  }

  render() {
    return (
    <div id="profile">
      <h1>Profile</h1>
      <div ref={this.profileRef}>

      </div>
    </div>
    );
  }
}
