## Getting started locally

1. `npm install`
1. Create your DB in PGAdmin with a name
1. Create a `.env` file
1. Copy the information found in the `.env.example` file and create your own `.env file`
1. Adjust the values in the env file to match your project
1. Modify the app.js file with the resetDatabase if you are currently building your models out
1. `nodemon` or `npx nodemon` to start server

The server app portion was tested to be able to function for the client. The app is designed for the admin to be able to
post, update and delete recipes. The users are able to sign up to view the various recipes in the app, give feedback and rate
 the recipes. The admin does have the ability to delete feedback if not sufficient rating or unsatisfactory language used. 
