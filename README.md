# YUGIMART

YUGIMART is an AUS based card market for the centralised buying and selling of yugioh cards. Sick of paying 200% in ebay fees or getting left on read for those FB marketplace meetups... Then come hangout at YUGIMART.

## Welcome to [YUGIMART](https://yugimart.onrender.com/)

## About

- Sift through the current single cards available to purchase or sign in to sell your own. 

## ✏️ Planning & Problem Solving

- This was a CRUD based project that required serverside access primarily through the sending and recieving of data from a postgreSQL database. 
- MVP was intended to be a pretty simple set up and simulation of a 'CardMarket' style web app with cards for sale being displayed within searchable tables. 
  
  ![Wireframing](/project_files/YUGIMART_MVP.png)

- The process was roughly:
    - file set up and install of known modules
    - Boiler plate set up with serverside connection to home + layout ejs file
    - Start creating routes and views
    - BASIC CSS
    - Create database to store card info 
    - Access database to dipslay info
    - Create routes for remaining CRUD interactions
    - Create users table
    - Set up session and log in to achieve:
    - MVP
    - Some more CSS
    - bug fixes and features
        - creating acccounts
        - variifications for access
        - sorting
        - searching 
        - simulate buying

## Tech

- JavaScript
- HTML
- CSS
- SQL

- Node.js
- Postgresql

- express
- expresslayouts
- express-sessions
- ejs
- nodemon (for dev only) 
- lodash
- bcrypt
- method-overide
- dotenv

- ChatGPT to make yugioh card names array for dummy seeding file.

## Bugs to fix

- Error messaging
- Decimal points for prices

## Lessons learnt

- sessions
- encrypting
- sql and database access
- routes and routers
- ejs files
- modules like express layouts with master layout functionality
- .env files
- server flow and the idea of middlewares

## Future features

- filtering options
- order the tables after completing a search 
- hover image over card name in table
- access YGOPR API for search features for ease of use 
- Vendor page / area
- Auction page / area
- High end styling
- Magic cart feature
- Card price history and stats
- increased search options and functionality
