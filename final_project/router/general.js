const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    new Promise((resolve, reject) => {
        // Simulate a delay or an asynchronous operation here
        setTimeout(() => {
            resolve(books);
        }, 100); // Adjust the delay as needed
    })
    .then(books => {
        return res.status(200).json(books); // Send the books with status 200 (OK)
    })
    .catch(error => {
        console.error(error); // Log the error
        return res.status(500).send('Internal Server Error'); // Handle error case
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    new Promise((resolve, reject) => {
        // Simulate a delay or an asynchronous operation here
        const book = books[req.params.isbn]
        setTimeout(() => {
            resolve(book);
        }, 100); 
    })
    .then(book => {
        return res.status(300).send(JSON.stringify(book));
    })
    .catch(error => {
        console.error(error); // Log the error
        return res.status(500).send('Internal Server Error'); // Handle error case
    });   
    
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    new Promise((resolve, reject) => {
        // Simulate a delay or an asynchronous operation here
        const book = Object.values(books).find(item => item.author === req.params.author)
        setTimeout(() => {
            resolve(book);
        }, 100); 
    })
    .then(book => {
        return res.status(300).send(JSON.stringify(book));
    })
    .catch(error => {
        console.error(error); // Log the error
        return res.status(500).send('Internal Server Error'); // Handle error case
    }); 
    
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    new Promise((resolve, reject) => {
        // Simulate a delay or an asynchronous operation here
        const book = Object.values(books).find(item => item.title === req.params.title)
        setTimeout(() => {
            resolve(book);
        }, 100); 
    })
    .then(book => {
        return res.status(300).send(JSON.stringify(book));
    })
    .catch(error => {
        console.error(error); // Log the error
        return res.status(500).send('Internal Server Error'); // Handle error case
    });     
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const book = books[req.params.isbn]
    return res.status(300).send(JSON.stringify(book.reviews));
});

module.exports.general = public_users;
