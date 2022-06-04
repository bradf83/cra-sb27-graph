import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  gql,
  HttpLink,
  useQuery,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Route, Routes, useNavigate, Outlet } from "react-router-dom";
import { Security, LoginCallback, useOktaAuth } from "@okta/okta-react";

// Helper Links
// https://stackoverflow.com/questions/57399598/use-auth0s-hook-useauth0-to-get-token-and-set-header-in-apollo-client
// https://ecfmg.gitbook.io/azure-serverless-quickstart/application-design/adding-authentication/ad
// https://stackoverflow.com/a/66662717 (Robin Wieruch)

const oktaAuth = new OktaAuth({
  issuer: process.env.REACT_APP_OKTA_ISSUER || "",
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID || "",
  redirectUri: window.location.origin + "/login/callback",
});

// Wrapper to secure the application with OKTA, going to looking into React Router more see if I can determine a better way.
export function OktaSecuredApp() {
  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth: any, originalUri: string) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route
          path="login/callback"
          element={<LoginCallback loadingElement={<h3>Loading</h3>} />} //TODO: Improve Loading
        />
        <Route path="/" element={<RequiredAuth />}>
          <Route
            index
            element={
              <ApolloProviderWithOkta>
                <App />
              </ApolloProviderWithOkta>
            }
          />
        </Route>
      </Routes>
    </Security>
  );
}

// Apollo provider using OKTA for Auth, used example from Stackoverflow: https://stackoverflow.com/a/66662717
// Wonder what happens when token refreshes? expires?
const ApolloProviderWithOkta: React.FC<{ children: any }> = ({ children }) => {
  const { authState } = useOktaAuth();
  console.log("Apollo Provider With Okta Rendering"); // Log here for now, want to see how often this is called over a longer session

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || "",
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
      },
    });
    return forward(operation);
  });

  const client = React.useRef<any>();

  if (!client.current) {
    client.current = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }

  return <ApolloProvider client={client.current}>{children}</ApolloProvider>;
};

const RequiredAuth: React.FC = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState || !authState?.isAuthenticated) {
    const originalUri = toRelativeUrl(
      window.location.href,
      window.location.origin
    );
    oktaAuth.setOriginalUri(originalUri);
    oktaAuth.signInWithRedirect();

    //TODO: Improve
    return <h3>Loading...</h3>;
  }

  return <Outlet />;
};

const ALL_PEOPLE = gql`
  query GetPeople {
    allPeople {
      id
      name
      sin
    }
  }
`;

const GREETING = gql`
  query Greeting {
    greeting
  }
`;

function App() {
  //TODO: Show data on the page rather than in logs.
  const { loading, error, data } = useQuery(ALL_PEOPLE);
  console.log("loading", loading);
  console.log("error", error);
  console.log("data", data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
