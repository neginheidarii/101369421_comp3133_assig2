import { gql } from 'apollo-angular';

// Query to get all employees
const GET_EMPLOYEES = gql`
  query getEmployees {
    getEmployees {
      _id
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;

// Query to get an employee by ID
const GET_EMPLOYEE_BY_ID = gql`
  query getEmployeeById($_id: ID!) {
    getEmployeeByID(_id: $_id) {
      _id
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;

// Mutation to add a new employee
const ADD_EMPLOYEE = gql`
  mutation addEmployee(
    $first_name: String!
    $last_name: String!
    $email: String!
    $gender: String!
    $salary: Float!
  ) {
    addEmployee(
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      salary: $salary
    ) {
      _id
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;

// Mutation to update an employee
const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee(
    $_id: ID!
    $first_name: String!
    $last_name: String!
    $email: String!
    $gender: String!
    $salary: Float!
  ) {
    updateEmployee(
      _id: $_id
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      salary: $salary
    ) {
      _id
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;

// Mutation to delete an employee
const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($_id: ID!) {
    deleteEmployee(_id: $_id) {
      _id
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;

// Query to login
const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

// Mutation to signup
const SIGNUP = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export {
  GET_EMPLOYEES,
  GET_EMPLOYEE_BY_ID,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  LOGIN,
  SIGNUP
};
