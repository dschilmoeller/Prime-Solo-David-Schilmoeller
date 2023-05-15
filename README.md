# Stock Pik'R

This application is a simple stock tracking application, aimed at distributors and installers of physical equipment.

To see the function application: http://damp-temple-24128.herokuapp.com

## Getting Started

### Prerequisites
To get this application running, a database will need to be created using the included SQL file. The default setup assumes postgres.

This application requires [Node.js](https://nodejs.org/en/) to handle running other elements.

Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=yourTextHere
  ```

### Installing
 Run your preferred installer from the project directory, e.g. 
```
npm install
``` 

### Starting
Utilize the start script, e.g. 
```
npm run server
npm run client
```

### Built With
* React
* React-Redux

### Usage
A standard user can add items from the existing list of all items to their stock. Specifying the number of items in the field will create a recommended amount of stock to keep on hand.
They can also see distributors, and see and edit their user profile.

In addition to user functions, Administrators can add items to the master list, add dealers, and upgrade users to one of a few different types. Different types of users primarily affect the recommended stocks to keep on hand.

### Author
David Schilmoeller

### License
