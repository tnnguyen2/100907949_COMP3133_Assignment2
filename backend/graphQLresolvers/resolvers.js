const User = require('../models/userModel');
const Employee = require('../models/employeeModel');
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return User.find();
        },
        getUserById: async (_, { id }) => {
            return User.findById(id);
        },
        getAllEmployees: async () => {
            return Employee.find();
        },
        getEmployeeById: async (_, { id }) => {
            return Employee.findById(id);
        },
        login: async (_, { usernameOrEmail, password }) => {
            // Find the user by username or email
            const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });

            if (!user) {
                throw new Error('User not found');
            }

            // Compare the password
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                throw new Error('Invalid password');
            }

            return {
                user
            };
        },
    },
    Mutation: {
        signup: async (_, args) => {
            const user = new User(args);
            return await user.save();
        },

        updateUser: async (_, { id, ...args }) => {
            return User.findByIdAndUpdate(id, args, { new: true });
        },
        deleteUser: async (_, { id }) => {
            await User.findByIdAndDelete(id);
            return 'User deleted successfully';
        },
        addEmployee: async (_, args) => {
            const employee = new Employee(args);
            return await employee.save();
        },
        updateEmployee: async (_, { id, ...args }) => {
            return Employee.findByIdAndUpdate(id, args, { new: true });
        },
        deleteEmployee: async (_, { id }) => {
            await Employee.findByIdAndDelete(id);
            return 'Employee deleted successfully';
        },
    },
};
module.exports = resolvers;
