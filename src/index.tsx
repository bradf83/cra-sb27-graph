import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloLink, ApolloProvider, concat, HttpLink, InMemoryCache } from '@apollo/client';

// Links
// https://stackoverflow.com/questions/57399598/use-auth0s-hook-useauth0-to-get-token-and-set-header-in-apollo-client
// https://ecfmg.gitbook.io/azure-serverless-quickstart/application-design/adding-authentication/ad
// https://stackoverflow.com/a/66662717 (Robin Wieruch)

const httpLink = new HttpLink({uri: 'http://localhost:8080/graphql'});

//TODO: How do I get a token from Okta or Azure AD into here
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({headers: {Authorization: 'Basic dXNlcjpwYXNzd29yZA==',},});
  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache()
});

// const client = new ApolloClient({
//   uri: 'http://localhost:8080/graphql',
//   cache: new InMemoryCache()
// });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
