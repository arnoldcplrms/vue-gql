const { ApolloServer, gql, AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require("path");

//import typedefs and resolvers
const filePath = path.join(__dirname, "typeDefs.gql")
const typeDefs = fs.readFileSync(filePath, "utf-8")
const resolvers = require('./resolvers')

//import environment variables and mongoose models
require('dotenv').config({ path: 'variables.env' });
const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');

//connecting to mongodb
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err))


const getUser = async token => {
    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET)
        } catch (error) {
            console.log('jwt Error', error);
            throw new AuthenticationError('Your session has ended. Please sign in again')
        }
    }
}

// creat an apollo/graphql server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: error => ({
        name: error.name,
        message: error.message.replace('Context creation failed:', '')
    }),
    context: async({ req }) => {
        const token = req.headers["authorization"];
        return {
            User,
            Post,
            currentUser: await getUser(token)
        }
    }
});

server.listen(4000)
    .then(({ url }) => {
        console.log(`Listening to the server on ${url}`)
    })