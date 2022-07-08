function MyApp() {
  return <div>
    <h1>Cruise0 with Auth0</h1>
    <MySubTitle />
    <hr></hr>
    <Buttons></Buttons>
    <hr></hr>
    <Profile></Profile>
    <hr></hr>
    <Information></Information>
  </div>;
}



const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);

container.addEventListener("MESSAGE", (customEvent) => {
  console.log("👋", customEvent)
})

container.addEventListener("LOGIN", (customEvent) => {
  console.log("👋", customEvent)
})

container.addEventListener("LOGOUT", (customEvent) => {
  console.log("👋", customEvent)
})

container.addEventListener("LINK", (customEvent) => {
  console.log("👋", customEvent)
})


window.authors = {
  name: "Philippe Charrière"
}

const fetchAuthConfig = () => fetch("/auth_config.json");


let load = async () => {


  /*
    const event = new CustomEvent('MESSAGE', { detail: {message:"🖐️ bonjour"}})
    window.application.dispatchEvent(event)
  */


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

  /* === initialize the UI === */
  console.log("2️⃣ initialize the user interface...")
  //Ui.displayButtons({auth0Client:auth0, config: config})
  //Ui.displayProfileAvatar({auth0Client:auth0, config: config})
}

load()


/*
  const event = new CustomEvent('MESSAGE', { detail: {message:"🖐️ bonjour"}})
  window.root.dispatchEvent(event)
*/
