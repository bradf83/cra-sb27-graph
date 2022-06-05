import { gql, useQuery } from "@apollo/client";
import React from "react";
const ALL_PEOPLE = gql`
  query GetPeople {
    allPeople {
      id
      name
      sin
    }
  }
`;

const People: React.FC = () => {
  const { loading, error, data } = useQuery(ALL_PEOPLE);
  if (error) {
    return <div>An error occurred while loading people.</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>People Data From GraphQL</h1>
      {data && data.allPeople.length > 0 ? (
        <div>
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
            {data.allPeople.map((p: any) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <div>No People Found</div>
      )}
    </div>
  );
};

export default People;
