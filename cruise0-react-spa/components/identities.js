class Identities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};

    this.indentitiesRef = React.createRef()

    //this.refreshIdentities = this.refreshIdentities.bind(this);

  }

  componentDidMount() {
    this.props.messageToParent({
      from: "Identities",
      text: "Hello World"
    })
  }

  message(msg) {
    console.log("📨 [recipient:Identities]", msg)
  }

  setAuth0Properties({auth0Client, config}) {
    this.auth0Client = auth0Client
    this.config = config
    console.log("ℹ️ [recipient:Identities]", this.auth0Client, this.config )

  }

  hello() {
    console.log("👋 hello world 🌍🌍🌍")
  }

  addIdentityToList({list, identity, primaryIdentity}) {
    let provider = identity.provider
    let userId = identity.user_id
    let isSocial = identity.isSocial

    let li = document.createElement("li")

    let identity_label = primaryIdentity.user_id === userId ? "primary" : "secondary"
    let social = isSocial === true ? "social" : "not social"

    //li.innerHTML = `${userId} ${provider} <b>${identity_label}</b> [${social}]`
    li.setAttribute("id", userId)


    // <h4 class="subtitle is-4">Subtitle 4</h4>
    let lineText = document.createElement("h4")
    lineText.innerHTML = `${userId} ${provider} <b>${identity_label}</b> [${social}]`
    lineText.setAttribute("class", "subtitle is-3")
    li.appendChild(lineText)


    if(primaryIdentity.user_id !== userId) {
      const unlinkButton = document.createElement("button")
      unlinkButton.setAttribute("class", "button is-danger")

      unlinkButton.innerText = "Unlink"
      lineText.appendChild(unlinkButton)

      unlinkButton.addEventListener("click", async ({ target }) => {
        console.log("👋 unlink identity:", identity)

        await A0Helpers.unlinkAccount({ auth0Client: this.auth0Client, config: this.config, secondaryIdentity: identity})

        // Refresh identities
        this.auth0Client.loginWithRedirect()

      });
    }

    list.appendChild(li)
  }




  refreshIdentities({user, userProfile}) {
    let primaryIdentity = A0Helpers.getPrimaryIdentity({user: user, profile: userProfile})
    console.log("🤴 primary identity:", primaryIdentity)

    const identitiesElement = this.indentitiesRef.current

    userProfile.identities.forEach((identity,index) => {
      console.log(index, "❎", identity)
      // Add an item to list for each identity
      this.addIdentityToList({
        list:identitiesElement, //this is an HTML List (<ul>)
        identity: identity,
        primaryIdentity: primaryIdentity,
      })
    })


  }


  render() {
    return (
    <div>
      <h1>Identities</h1>
      <ul ref={this.indentitiesRef}></ul>
    </div>
    );
  }
}
