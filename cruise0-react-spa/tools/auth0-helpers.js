

/*
  used by:
  Ui.displayButtons
*/
async function unlinkAccount({auth0Client, config, secondaryIdentity}) {
  console.log("👺 secondaryIdentity:", secondaryIdentity)
  const { provider, user_id } = secondaryIdentity
  const accessToken = await auth0Client.getTokenSilently()
  const { sub } = await auth0Client.getUser()
  await fetch(
    `https://${config.domain}/api/v2/users/${sub}/identities/${provider}/${user_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

}

/*
  used by:
  Ui.displayButtons
*/
async function linkAccount({auth0Client, config}) {
  const accessToken = await auth0Client.getTokenSilently()
  const { sub } = await auth0Client.getUser()
  const {
    __raw: targetUserIdToken,
    email_verified,
    email,
  } = await authenticateUser({config: config})

  if (!email_verified) {

    throw new Error(
      `Account linking is only allowed to a verified account. Please verify your email ${email}.`
    )
  }

  await fetch(`https://${config.domain}/api/v2/users/${sub}/identities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      link_with: targetUserIdToken,
    }),
  })

}


/*
  used by:
  A0Helpers.linkAccount
*/
async function authenticateUser({config}) {
  const a0 = new Auth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });
  await a0.loginWithPopup({
    max_age: 0,
    scope: "openid",
  })
  return await a0.getIdTokenClaims()
}


/*
  used by:
  Ui.displayIdentities
*/
function getPrimaryIdentity({user, profile}) {
  // extract provider/user_id from primary identity
  const userId = user.sub
  console.log("😃 userId:", userId)
  console.log("😃 user profile:", profile)

  const primaryIdentity =
  profile &&
  profile.identities &&
  profile.identities.find(
    (id) => `${id.provider}|${id.user_id}` === userId
  )
  return primaryIdentity
}

/*
  used by:
  Ui.displayProfileAvatar
*/
async function getUserProfile({auth0Client, user, config}) {

  let userId = user.sub

  const token = await auth0Client.getTokenSilently();
  const response = await fetch(
    `https://${config.domain}/api/v2/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return await response.json()
}

let A0Helpers = {
  getUserProfile: getUserProfile,
  getPrimaryIdentity: getPrimaryIdentity,
  authenticateUser: authenticateUser,
  linkAccount: linkAccount,
  unlinkAccount: unlinkAccount
}

window.A0Helpers = A0Helpers
