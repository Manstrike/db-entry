### To run the API: 
 - npm run start
### To run tests:
 - npm run test
### To run tests with nodemon:
 - npm run test:watch
### To run db migrations:
 - npm run migrate
   *note: for successful run of migrations first remove "type": "module" in package.json. Return it back as soon as migrations are done.*

#### app.js:
 - Initializes routers and controllers (either all their dependencies), passes it into Application.js
#### Application.js:
 - Initializes and run the express server withtin dependencies passed from app.js.

#### Routers, Controllers, Entities, Gateways (literally interfaces for database) are grouped into folders for easy-to-find purpose.
