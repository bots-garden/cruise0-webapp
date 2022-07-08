const fetchAuthConfig = () => fetch("/auth_config.json");


window.onload = async () => {

  window.application = document.getElementById("application")
  application.addEventListener("MESSAGE", (customEvent) => {
    console.log(customEvent)
    document.getElementById("information").innerHTML=customEvent.detail.message
  })

  application.addEventListener("email_not_verified", (customEvent) => {
    console.log(customEvent)
    document.getElementById("information").innerHTML=customEvent.detail.message
  })

  /*
    const event = new CustomEvent('MESSAGE', { detail: {message:"🖐️ bonjour"}})
    window.application.dispatchEvent(event)
  */


  const response = await fetchAuthConfig()
  config = await response.json()
  console.log("0️⃣ Cruise0 configuration:", config);
  auth0 = new Auth0Client({
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

  /* === initialize the UI === */
  console.log("2️⃣ initialize the user interface...")
  Ui.displayButtons({auth0Client:auth0, config: config})
  Ui.displayProfileAvatar({auth0Client:auth0, config: config})
}
