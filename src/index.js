import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import './index.css';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
