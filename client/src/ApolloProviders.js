import React from 'react';
import App from './App.js';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

function ApolloProviders(){
    return (<ApolloProvider client={client}>
        <App />
        </ApolloProvider>);
}
const httpLink = createHttpLink({
    uri: 'http://localhost:5000',
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});


export default ApolloProviders;