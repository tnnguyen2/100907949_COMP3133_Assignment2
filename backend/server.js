const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const typeDefs = require('./graphQLschemas/schemas');
const resolvers = require('./graphQLresolvers/resolvers');
const cors = require('cors');

require('dotenv').config();

// Connect to MongoDB
const DB_HOST = "@cluster0.hgh3k7b.mongodb.net";
const DB_USER = "tdotnguyen";
const DB_PASSWORD = "JA5Dkz4KLhZMBsTC";
const DB_NAME = "W2024_COMP3133_ASSIGNMENT1";
const DB_CONNECTION = `mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority'
}).then(() => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection', err)
});

// Create an Express app
const app = express();
app.use(express.json()); // Make sure it comes back as JSON

corsOptions = {
    origin: 'https://frontend-mu-mocha.vercel.app',
    credentials: true
}

// Enable CORS
app.use(cors(corsOptions));


// Create an Apollo Server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
    persistedQueries: false
});

// Start the Apollo Server and then apply middleware to integrate with Express
async function startServer() {
    await server.start();
    server.applyMiddleware({ app, path: '/graphQL' });
}

// Start the server
const SERVER_PORT = 3000;
startServer().then(() => {
    app.listen(SERVER_PORT, () => {
        console.log(`Server running at http://localhost:${SERVER_PORT}/`);
    });
}).catch(error => {
    console.error('Error starting server:', error);
});
