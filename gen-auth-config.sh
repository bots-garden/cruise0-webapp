#!/bin/bash
echo "{" > cruise0-spa/auth_config.json
echo "  \"domain\":\"$AUTH0_CONFIG_DOMAIN\"," >> cruise0-spa/auth_config.json
echo "  \"clientId\":\"$AUTH0_CLIENTID_CRUISE0\"" >> cruise0-spa/auth_config.json
echo "}" >> cruise0-spa/auth_config.json

#echo "{" > cruise0-react-spa/auth_config.json
#echo "  \"domain\":\"$AUTH0_CONFIG_DOMAIN\"," >> cruise0-react-spa/auth_config.json
#echo "  \"clientId\":\"$AUTH0_CLIENTID_CRUISE0\"" >> cruise0-react-spa/auth_config.json
#echo "}" >> cruise0-react-spa/auth_config.json


