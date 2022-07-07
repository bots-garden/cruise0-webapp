# Cruise0-demo

> 🚧 this is a work in progress

Open this project with GitPod: https://gitpod.io/#https://github.com/bots-garden/cruise0-webapp

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/bots-garden/cruise0-webapp)

## What I used to create this webapp

- Quickstart: https://auth0.com/docs/quickstart/spa/vanillajs/interactive
- Project: https://github.com/auth0-samples/auth0-link-accounts-sample/tree/master/SPA

## How to setup and run this project

### auth_config.json

Create a file named `auth_config.json` in the `cruise0-spa` directory.

The file looks like that:

```json
{
  "domain":"...",
  "clientId":"...",
}
```
> **Remarks**:
> - You will find the information (`domain` and the `clientId`) on the Auth0 Admin Dashboard
> - 🖐️ As I use Gipod, I stored the `domain` and the `clientId` in environment variables (in my Gitpod profile) and run `gen-auth-config.sh` to generate the file.


### URLs & Run

To get the public url of the application when you serve the webapp from Gitpod, use the below command in a terminal

```bash
url=$(gp url 3000)
# public url of the spa
echo "$url"
# public url of the logo
echo "$url/cruise0_small.png"
```

```bash
cd cruise0-spa
node server.js
```

> **Remarks**:
> - if you use GitPod, you don't need to run `npm install` (it's done at startup)
> - you will get something like thid: https://3000-botsgarden-cruise0webap-tgxfzp84of7.ws-us52.gitpod.io/
> - update the URLs values of the application settings in the Auth0 Admin Dashboard
> - 🖐️ update the URL in **Branding/ Universal login** (to get the Cruise0 logo on the login panel)
>   - https://3000-botsgarden-cruise0webap-tgxfzp84of7.ws-us52.gitpod.io/cruise0_small.png

### Run
