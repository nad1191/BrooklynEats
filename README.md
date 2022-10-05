# Project 2 Planning

Fork & Clone this repo.

## Part 1

- [ ] Review the [Project 2 requirements](https://romebell.gitbook.io/seirfx-621/projects/project-2)

- [ ] Check out some [examples](https://romebell.gitbook.io/seirfx-621/projects/past-projects/project2)

- [ ] In this space below, list **THREE** ideas for your Project 2. For each idea, include [user stories](https://www.atlassian.com/agile/project-management/user-stories) for each idea and a link to the API(s) you want to use for it.

--------------------------------------------------------
BrooklynEats - My app will connect all the Brooklyn foodies to find, chat, and rate/review restaurants in Brooklyn. The user will be able to create their own profile, search for nearby restaurants in the Brooklyn area, leave ratings and reviews, and share them via email/chat through the website with other foodies.                                                                                                                                                  
---------------------------------------------------------

- [ ] Make a PR when you're done!

---

## Part 2

In the space below:
* either embed or link a completed ERD for your approved P2 idea
* if there are any changes/additions to your user stories, place your full set of revised user stories here
* either embed or link wireframes for every page of your app

----------------------------------------------------------
### ERD
![image](https://user-images.githubusercontent.com/104798500/190055721-53d09a75-3566-4c88-bafe-762b44be7e53.png)

----------------------------------------------------------
### User Stories

My user will connect with other users to find, chat, and post ratings/reviews of restaurants in Brooklyn. My user will be able to create their own profile and also share restaurants via email/chat through the website. My user will be able to delete and edit reviews as well.

----------------------------------------------------------
### Wireframes
![image](https://user-images.githubusercontent.com/104798500/190057672-ed938578-19e2-4b21-a82f-58408a54ba10.png)


----------------------------------------------------------

# `BrooklynEats`

 BrooklynEats app helps people discover local Brooklyn Restaurants, rate and review them, while sharing them with other members.

## What it includes

* Sequelize user model / migration
* Settings for PostgreSQL
* Passport and passport-local for authentication
* Sessions to keep user logged in between pages
* Flash messages for errors and successes
* Passwords that are hashed with BCrypt
* EJS Templating and EJS Layouts
*API 
*BootStrap

### User Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| name | String | Must be provided |
| email | String | Must be unique / used for login |
| password | String | Stored as a hash |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Restaurant Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| restaurantName | String | generated with API |
| address | Integer | generated with API |
| phone | Integer | generated with API  |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Comment Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| userId | Integer | Serial Primary Key, Auto-generated |
| rating | Integer | Must be provided|
| content | Text | Must be provided  |
| restaurantId | Integer | Serial Primary Key, Auto-generated |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Email Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| userId | Integer | Serial Primary Key, Auto-generated |
| restaurantId | Integer | Serial Primary Key, Auto-generated |
| emailId | Integer | Serial Primary Key, Auto-generated|
| message | Text | Must be provided  |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |



### Default Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | server.js | Home page |
| GET | /auth/login | auth.js | Login form |
| GET | /auth/signup | auth.js | Signup form |
| POST | /auth/login | auth.js | Login user |
| POST | /auth/signup | auth.js | Creates User |
| GET | /auth/logout | auth.js | Removes session info |
| GET | /profile | server.js | Regular User Profile |
| GET | /new | comment.js | Creates new comment |
| GET | /:id | restaurant.js | Finds Restaurants |
| POST | /results | restaurant.js | Post results of Restaurants |
| PUT | /profile | profile.js | Edit User |
| Delete | /comment| comments.js | Deletes comment made by user |

## INSTALL INSTRUCTIONS

## `1` Fork & Clone Project & Install Dependencies
`1` Git Fork and Clone https://github.com/nad1191/BrooklynEats/.git

`2` Cd BrooklynEats

`3` Now we are going to install the current dependencies that are listed inside of `package.json`
```text
npm install
npm install sequelize-cl
```

`4` We need to install some packages that will be used for `authentication`. Those are the following packages:

```text
npm install bcryptjs connect-flash passport passport-local express-session method-override
```
-  [bcryptjs](https://www.npmjs.com/package/bcryptjs): A library to help you hash passwords. ( [wikipedia](https://en.wikipedia.org/wiki/Bcrypt) ) 
    - Blowfish has a 64-bit block size and a variable key length from 32 bits up to 448 bits.
- [connect-flash](https://github.com/jaredhanson/connect-flash): The flash is an area of the session used for storing messages that will be used to to display to the user. Flash is typically used with redirects.
- [passport](https://www.passportjs.org/docs/): Passport is authentication middleware for Node.js. It is designed to do one thing authenticate requests. There are over 500+ strategies used to authenticate a user; however, we will be using one - *passport-local* Passport is authentication middleware for Node. It is designed to serve a singular purpose: authenticate requests
- [passport-local](http://www.passportjs.org/packages/passport-local/): The local authentication strategy authenticates users using a username and password. The strategy requires a verify callback, which accepts these credentials and calls done providing a user. [passport-local](http://www.passportjs.org/packages/passport-local/)
- [express-session](https://github.com/expressjs/session): Create a session middleware with given *options*.
- [method-override](https://github.com/expressjs/method-override): Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

`5` Touch .env and add APIKEY = '....' inside .env file

`6` Go to https://rapidapi.com/makingdatameaningful/api/restaurants-near-me-usa to subscribe and get APIKEY
 
`7` Create a database npx sequelize-cli db:create supreme-engine

`8` Migrate your database

`9`Npx sequelize-cli db:migrate

`10` Start the server: npm start

`11` Make a commit
```text
git add .
git commit -m "Install dependencies for project"
```

## `2` Create Database & Update Sequelize Config

`1` Update **`config.json`** file with the following:

```json
{
  "development": {
    "database": "express_auth_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "express_auth_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions": {
        "ssl": {
          "require": true,
          "rejectUnauthorized": false
        }
    }
  }
}
```

`2` Create database `express_auth_dev`

```text
sequelize db:create
```



## `3` Analyze File Structure

```text
├── config
│   └── config.json
├── controllers
│   └── auth.js
├── models
│   └── index.js
├── node_modules
│   └── ...
├── public
│   └── assets
│   └── css
│       └── style.css
├── test
│   └── auth.test.js
│   └── index.test.js
│   └── profile.test.js
│   └── user.test.js
├── views
│   └── auth
│       └── login.ejs
│       └── signup.ejs
│   └── index.ejs
│   └── layout.ejs
│   └── profile.ejs
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── server.js
```

- `config.json`: Where you need to configure your project to interact with your postgres database.
- `controllers`: The folder where all of your controllers ( routes ) will go to control the logic of your app.
- `models`: The folder where all the models will be stored that will interact with the database.
- `node_modules`: The folder that is generated by **npm** that stores the source code for all dependencies installed.
- `public`: is to have those views that would be publicly accessible in the application. ex. `style.css`
- `test`: The folder where all your test that you make will be stored. ex. `auth.test.js`
- `views`: The folder where all the app's templates will be stored for displaying pages to the user. ex. `login.ejs`
- `.gitignore`: A hidden file that will hide and prevent any files with to NOT get pushed to Github.
- `package-lock.json`: is automatically generated for any operations where npm modifies either the `node_modules` tree, or `package.json`.
- `package.json`: The settings file that stores scripts and list of dependencies that are used inside your app.
- `README.md`: The main markdown file that written to explain the details your app.
- `server.js`: The main file that controls the entire application.