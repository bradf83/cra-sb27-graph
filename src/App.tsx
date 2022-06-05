import React from "react";
import {
  HttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Route, Routes, useNavigate, Outlet } from "react-router-dom";
import { Security, LoginCallback, useOktaAuth } from "@okta/okta-react";
import Greeting from "./examples/Greeting";
import People from "./examples/People";
import BasicHookForm from "./examples/BasicHookForm";
import CalendarOne from "./examples/CalendarOne";

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
        <Route path="/" element={<SecureApplicationWithApollo />}>
          <Route index element={<Home />} />{" "}
          <Route path="basic-hook-form" element={<BasicHookForm />} />
          <Route path="calendar-one" element={<CalendarOne />} />
          <Route path="greeting" element={<Greeting />} />
          <Route path="people" element={<People />} />
          {/* Layout would likely go here then everything inside of it */}
          {/* Maybe it actually lives in the SecureApplicationWithApollo? That way the first outlet can start the nesting*/}
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
    console.log("Creating Client");
    client.current = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }

  return <ApolloProvider client={client.current}>{children}</ApolloProvider>;
};

// A component that can stay at the root of the application and ensure users are logged in and add any other cross cutting concerns
const SecureApplicationWithApollo: React.FC = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();
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

  return (
    <ApolloProviderWithOkta>
      {/* Layout may be better to go here? */}
      <div className="bg-gray-50 flex items-center space-x-2">
        <span>Choose an Example:</span>
        <select
          className="p-2 border rounded "
          onChange={(event) => navigate("/" + event.target.value)}
        >
          <option value="">Home</option>
          <option value="basic-hook-form">Basic Hook Form</option>
          <option value="calendar-one">Calendar One</option>
          <option value="greeting">Greeting</option>
          <option value="people">People</option>
        </select>
      </div>
      <main className="bg-gray-50 h-screen">
        <Outlet />
      </main>
    </ApolloProviderWithOkta>
  );
};

const Home: React.FC = () => {
  const { authState } = useOktaAuth();
  return (
    <div>
      <h1>Welcome to the Application {authState?.idToken?.claims.name}!</h1>
    </div>
  );
};

// Old Items That May Get Deleted
// eslint-disable-next-line
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

export default OktaSecuredApp;
