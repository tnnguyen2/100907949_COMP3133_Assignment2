# 100907949_COMP3133_Assignment1

## Author
- 100907949 - Tony Nguyen

## How to run
1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the server
4. Open `http://localhost:3000/graphql` to access the GraphQL Playground
5. Run the queries and mutations

### Sample Login for User

```json
query Login {
  login(usernameOrEmail: "user", password: "password") {
    user {
      id
      username
      email
      password
    }
  }
}

```

