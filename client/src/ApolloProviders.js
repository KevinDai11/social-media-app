import React from 'react';
import App from './App.js';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink  } from '@apollo/client';


const httpLink = createHttpLink({
    uri: "http://localhost:5000/",
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

function ApolloProviders(){
    return (<ApolloProvider client={client}>
        <App />
        </ApolloProvider>);
}
export default ApolloProviders;