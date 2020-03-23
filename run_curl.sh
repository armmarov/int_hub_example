#!/bin/bash

curl --location --request POST 'https://integrationhub.okwave.global/api/ethtestnet/web3.eth.personal/newAccount'\
     --header 'Content-Type: application/json'\
     --header 'Authorization: OBC eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoib2JjIiwiaWF0IjoxNTg0OTIyMTY3LCJleHAiOjE1ODUwMDg1Njd9.SnTA2LUiw4lminV6MxJcoL63HubLusZ03Ve0zYV6gR8'\
     --data-raw '{
	    "encryptedkey": "sukaHu3eQNOVSYSyiFucQIk9adGdV8W2E5SSjl/ZWxhhtZygjUYCAh+Wr1hr41My8HEF/RKl5X8BqrDekTo8U/9fNs7LsfUbfjLniQMr4lQODTtLqJsLLH2liUT5+RcHFAfrFrGOWGnDXI0R4TOtaDRjOlxXUs1yeOYCtVEmjuk=",
	    "encrypteddata": "321851ea9d4e7ab0d7b6fac5d60b8c68ee6928de3a3ef6498fd29507e7ef89bb",
	    "publickey": "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCHAKueZ3VbziD2lXs3eWwANlnA4KwyJBgx86/mjJ4daj405THZgOwTisbSSlW6ktkrQ/kcwvBTiUAk+BBVX3VPpKxV+7xoScDYx6hFboFP4vUwAI7wbI4v7sv2+tN4AkhU7JAns4owRgJ5Mk/Cuf3m0YGRGS9GfE+CHeEbgd/WkwIDAQAB-----END PUBLIC KEY-----"
    }'