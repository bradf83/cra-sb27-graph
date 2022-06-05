import React from "react";
import { useQuery, gql } from "@apollo/client";

const GREETING = gql`
  query Greeting {
    greeting
  }
`;

const Greeting: React.FC = () => {
  const { loading, error, data } = useQuery(GREETING);
  if (error) {
    return <div>An error occurred while loading greeting.</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>Greeting: {data.greeting}</div>;
};

export default Greeting;
