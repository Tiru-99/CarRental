import { Account } from "appwrite";
import { client } from "./appwriteConf"; // Import the configured Appwrite client

// Create an Account instance for managing authentication
const account = new Account(client);

// Function to register a new user
export const registerUser = async (username, email, password) => {
  try {
    const response = await account.create("unique()", email, password, username);
    return {
      success: true,
      message: "User registered successfully!",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Function to log in a user
// Function to log in a user
export const loginUser = async (email, password) => {
  try {
   return await account.createEmailPasswordSession(email, password); // Ensure the method name is correct
   
  } catch (error) {
    throw(error);
  }
};


// Function to log out the user
export const logoutUser = async () => {
  try {
    await account.deleteSession("current"); // Deletes the current session
    return {
      success: true,
      message: "Logged out successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Function to fetch the current logged-in user details
export const getCurrentUser = async () => {
  try {
    const response = await account.get();
    return {
      success: true,
      message: "User details fetched successfully!",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Function to check if the user is logged in
export const isUserLoggedIn = async () => {
  try {
    const response = await account.get(); // Fetch the current user's details
    return {
      success: true,
      message: "User is logged in.",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: "User is not logged in.",
    };
  }
};
