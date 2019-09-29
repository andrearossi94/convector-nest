import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import https from 'https';
import React from 'react';
import ReactDOM from 'react-dom';
import { Routes } from './Routes';
import { getAccessToken } from './common';

// minimal version without
// const client = new ApolloClient({
//   uri: 'https://localhost:3443/graphql'
// });

// const headers:any = [];
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true
// };

const httpLink = createHttpLink({
  uri: 'https://localhost:3443/graphql',
  fetchOptions: {
    // How to avoid "self signed certificate" error?
    agent: new https.Agent({ rejectUnauthorized: false }),    
  },  
  // required, else we can't receive jid cookie
  credentials: 'include',
});

const authLink = setContext((_: any, { headers }: any) => {
  // get the authentication token from local storage if it exists
  // let token = localStorage.getItem('token');
  let token;
  // get accessToken from global variable
  if (getAccessToken()) {
    token = getAccessToken();
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
  , document.getElementById('root')
);
