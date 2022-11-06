# Storefront Backend Project

 ## how to start:

 - ### the app runs on port 3000
 - ### the database  port is  5432


- #### run ``` npm run migrate``` to create the talbes

- #### to start the server use the script ``` npm run start``` and the app will run  .

- #### to run the jasmine tests use the script ``` npm run testing``` which:

  1. ##### set the variable ENV to "test" so the actions will be done to the testing data base
  2. ##### create data base for teating 
  3. ##### run the migrations that creates the 3 table (products,users and orders) for the testing database
  4. ##### compile the ts file  to js files and run jasmine  
  5. ##### finally delete the database after each test


 ## Used Technologies :
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## scripts
```
-    create: "db-migrate db:create new_db",
-    migrate:"db-migrate up --env dev",
-    lint: "npx eslint src/**/*.ts"
-    prettier: "npx prettier --write src/**/*.ts"
-    start: "node dist/server.js",
-    watch: "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\"",
-    testing: "set ENV=test&& db-migrate db:create nre_db_test&&db-migrate up --env test &&npm run tests&&db-migrate db:drop new_db_test"
-    build: "npx tsc",
```


## Endpoints :

### products :
- #### /products/showAll (get)
- #### /products/showById/id (get)
- #### /products/createNew (require user's token) (post)
### users :
- #### /users/view   (gives the  user's token) (get)
- #### /users/showById/id (require user's token) (get)
- #### /users/createNew  (require user's token) (post)
### orders :
- #### /orders/createNew   (require user's token) (post)
- #### /orders/add  (require user's token) (post)
- #### /orders/showById  (require user's token) (get)



## The data types based with the requests:

### users routes:
  
- ##### for the  /users/showById/id route you only need to pass the id as a param
- ##### for the /users/createNew route you need to pass first_name,lastName,password in the body

### products routes:
   
- ##### for the /products/showById/id route  you only need to pass the id as a param
- ##### for the /products/createNew route you need to pass the name and the price in the body ,the price must be number

### orders routes:
- ##### for the /orders/add route  you need to pass (productId and quantity ) throw the body (the user's id is passed automatically) note : you need to pass an existing productId
- ##### for the /orders/createNew route (status) throw the body (the user's id is passed automatically)


