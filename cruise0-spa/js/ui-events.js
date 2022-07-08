

async function displayButtons({auth0Client, config}) {
  console.log("👷‍♂️ building buttons...")
  const loginButton = document.getElementById("login")
  const logoutButton = document.getElementById("logout")
  const linkButton = document.getElementById("link")

  loginButton.addEventListener("click", (e) => {

    console.log("🔐🔓 Login 🤝...")
    e.preventDefault()
    auth0Client.loginWithRedirect()

  })

  logoutButton.addEventListener("click", (e) => {
    console.log("🔒 Logout 👋...")
    e.preventDefault()
    auth0Client.logout()

  })

  linkButton.addEventListener("click", async (e) => {
    console.log("🔗 Linking...")
    e.preventDefault()
    await linkAccount({auth0Client: auth0Client, config: config})

    // Refresh identities
    auth0Client.loginWithRedirect()
  })

}


function addIdentityToList({list, identity, primaryIdentity, auth0Client}) {
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

      await unlinkAccount({ auth0Client: auth0Client, config: config, secondaryIdentity: identity})

      // Refresh identities
      auth0Client.loginWithRedirect()

    });
  }

  list.appendChild(li)
}


function displayIdentities({user, userProfile, auth0Client}) {

  let primaryIdentity = A0Helpers.getPrimaryIdentity({user: user, profile: userProfile})

  console.log("🤴 primary identity:", primaryIdentity)

  const identitiesElement = document.getElementById("identities");

  userProfile.identities.forEach((identity,index) => {
    console.log(index, "❎", identity)
    // Add an item to list for each identity
    addIdentityToList({
      list:identitiesElement, //this is an HTML List (<ul>)
      identity: identity,
      primaryIdentity: primaryIdentity,
      auth0Client: auth0Client
    })
  })

}

async function displayProfileAvatar({auth0Client}) {

  console.log("👷‍♂️ building profile...")

  const profileElement = document.getElementById("profile")

  const isAuthenticated = await auth0Client.isAuthenticated()
  const user = await auth0Client.getUser()

  if (isAuthenticated) {
    console.log("😃 the user is authenticated:", user)
    console.log("🖐️ sub is userId:", user.sub)

    profileElement.style.display = "block";
    profileElement.innerHTML = `
            <p>${user.name}</p>
            <img src="${user.picture}" />
          `

    const profile = await A0Helpers.getUserProfile({auth0Client: auth0, user: user})

    console.log("🎉 user profile:", profile)
    console.log("🦸 identities:", profile.identities)

    console.log("🪆 loading identities...")

    displayIdentities({user: user, userProfile: profile, auth0Client: auth0Client, })


  } else {
    console.log("🥵 [ui-events(displayProfileAvatar)] the user is not authenticated", user)
    profileElement.style.display = "none";
  }
}


let Ui = {
  displayButtons: displayButtons,
  displayProfileAvatar: displayProfileAvatar,
  displayIdentities: displayIdentities
}

window.Ui = Ui
