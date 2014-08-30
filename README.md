SprkShares project for CIS4301

SprkShare is a place where fellow members are able to share posts in the goal of getting a specific goal accomplished. Posts that other people like are then "shared". Posts that are not liked by people are not shared. There is a specific quota that must be in a certain amount of time met so that a post can become permanent, otherwise it is deleted.

Members are able to comment on posts to make the goal come to fruition.Sprk it!

Instructions on how to run SprkShare on your local host
==============
Prereqs:
  - Node.js installed... http://nodejs.org/
  - NPM (node package manager) installed (usually installed when Node.js is installed)
  - PostgresSQL installed on local host...  
      PSQL Mac: http://postgresapp.com/  
      PSQL Windows: http://www.postgresql.org/download/windows/

Running SprkShare Locally:
  - Start/Open PostgresSQL  
    - Copy and paste other/Tables/TableCreation-1.1.sql into postgres  
    - Copy and paste other/Tables/inserData.sql into postgres  
  - Start listening on port 5000 for client connections. In the project root directory execute:
  
    ```
      $npm start
    ```
    Example output:  
      nodemon app.js  
      30 Aug 18:02:53 - [nodemon] v1.0.17  
      30 Aug 18:02:53 - [nodemon] to restart at any time, enter 'rs'  
      30 Aug 18:02:53 - [nodemon] watching: \*.*  
      30 Aug 18:02:53 - [nodemon] starting 'node app.js'  
      Listening on port 5000  
      Daily deletion successfully executed  
    
  - Open a web browser and enter "localhost:5000" as the URL
  - SprkShare should be up and running

Bugs
===========
- When a user creates a new post and is redirected to the new post, the new post is not displayed
