#!/bin/bash

# helper script to restart hyperledger network

clear

# lift hyperledger
npm run env:restart
# deploy smart contract
npm run cc:start -- cartellaclinica

# sleep 20 seconds
sleep 20

# seed ledger
npm run seed

# create views
./views/install.sh

# prevent lost props, rebuild chaincode packages
npx lerna run build --scope cartellaclinica-cc
npx lerna run build --scope personale-cc

# invoke some stuff
npx hurl invoke person person_get 1-100-100

# start server/frontend
echo "start server-rest with: 'npx lerna run start:dev --scope @convector-sample/server-rest --stream'"
echo "start server-graphql with: 'npx lerna run start:dev --scope @convector-sample/server-graphql --stream'"
echo "start frontend-react with: 'npx lerna run start --scope @convector-sample/frontend-react --stream'"
