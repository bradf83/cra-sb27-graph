import React from 'react';
import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from '@apollo/client';

const ALL_PEOPLE = gql`
  query GetPeople { 
    allPeople {
      id
      name
      sin
    }
  }
`

const GREETING = gql `
  query Greeting {
    greeting
  }
`

function App() {
  const {loading, error, data} = useQuery(ALL_PEOPLE);
  console.log('loading', loading);
  console.log('error', error);
  console.log('data',data);
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
