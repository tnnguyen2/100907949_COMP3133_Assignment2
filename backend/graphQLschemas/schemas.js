const { gql } = require('apollo-server-express');

// Define your GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type UserLogin {
    user: User!
  }

  type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User
    getAllEmployees: [Employee!]!
    getEmployeeById(id: ID!): Employee 
    login(usernameOrEmail: String!, password: String!): UserLogin
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User!
    updateUser(id: ID!, username: String, email: String, password: String): User
    deleteUser(id: ID!): String
    addEmployee(firstName: String!, lastName: String!, email: String!, gender: String!, salary: Float!): Employee!
    updateEmployee(id: ID!, firstName: String, lastName: String, email: String, gender: String, salary: Float): Employee
    deleteEmployee(id: ID!): String
  }
`;

module.exports = typeDefs;
