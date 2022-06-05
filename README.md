# Learning Apollo\GraphQL\Spring Boot GraphQL

Created a new react app to talk to a Spring Boot 2.7 back end using the new GraphQL starter.

## Running The App

Ensure that you have created a `.env.local` file in the root of your project with the following variables filled in:

```env
REACT_APP_OKTA_ISSUER=<your okta issuer>
REACT_APP_OKTA_CLIENT_ID=<your client id>
REACT_APP_GRAPHQL_ENDPOINT=<your graphql endpoint>
```

This repository is using OKTA as it's OAuth2 provider, you should be able to use it as a guide to get other providers working if you need a different one.

As mentioned above I am using Spring Boot's GraphQL starter for my graphql endpoint.

## Built With

- Front End
  - [Create React App](https://create-react-app.dev/)
  - [Apollo Client](https://www.apollographql.com/docs/react/)
  - [Okta React](https://github.com/okta/okta-react)
  - [React Hook Form](https://react-hook-form.com/)
  - [TailwindCSS](https://tailwindcss.com/)
  - [React Toastify](https://www.npmjs.com/package/react-toastify) **Coming Soon**
  - [React Date Picker](https://github.com/Hacker0x01/react-datepicker) **Coming Soon**
- Back End
  - Spring Boot GraphQL Starter

## TODO

- Create examples
- Testing
  - Okta?
  - Apollo?
- Loading Data
- Saving Data
- Error States
- Subscriptions
- ...
