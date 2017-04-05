#1 Screen shot of my app

page one:

page two:

#2 Technologies used

react.js for frontend:
(dependencies and middlewares used)

"autoprefixer": "6.5.4",
    "babel-cli": "6.18.0",
    "babel-core": "6.20.0",
    "babel-eslint": "7.1.1",
    "babel-jest": "18.0.0",
    "babel-loader": "6.2.10",
    "babel-plugin-transform-react-constant-elements": "6.9.1",
    "babel-plugin-transform-react-remove-prop-types": "0.2.11",
    "babel-polyfill": "6.20.0",
    "babel-preset-latest": "6.16.0",
    "babel-preset-react": "6.16.0",
    "babel-preset-react-hmre": "1.1.1",
    "babel-preset-stage-1": "6.16.0",
    "browser-sync": "2.18.5",
    "chalk": "1.1.3",
    "connect-history-api-fallback": "1.3.0",
    "coveralls": "2.11.15",
    "css-loader": "0.26.1",
    "enzyme": "2.6.0",
    "eslint": "3.12.2",
    "eslint-plugin-import": "2.2.0",
    "eslint-plugin-react": "6.8.0",
    "eslint-watch": "2.1.14",
    "extract-text-webpack-plugin": "^2.1.0",
    "file-loader": "0.9.0",
    "html-webpack-plugin": "2.24.1",
    "identity-obj-proxy": "3.0.0",
    "jest": "18.1.0",
    "json-loader": "0.5.4",
    "mockdate": "2.0.1",
    "node-sass": "4.0.0",
    "npm-run-all": "3.1.2",
    "open": "0.0.5",
    "postcss-loader": "1.2.1",
    "prompt": "1.0.0",
    "react-addons-test-utils": "15.4.1",
    "redux-immutable-state-invariant": "1.2.4",
    "replace": "0.3.0",
    "rimraf": "2.5.4",
    "sass-loader": "6.0.2",
    "style-loader": "0.13.1",
    "url-loader": "0.5.7",
    "webpack": "2.2.1",
    "webpack-bundle-analyzer": "2.1.1",
    "webpack-dev-middleware": "1.9.0",
    "webpack-hot-middleware": "2.13.2",
    "webpack-md5-hash": "0.0.5"

node express , postgre spl for backend:
(dependencies and middlewares used)

"bcrypt": "^1.0.2",
    "body-parser": "^1.17.1",
    "cors": "^2.8.2",
    "dotenv": "^4.0.0",
    "ejs": "^2.5.6",
    "express": "^4.15.2",
    "express-jwt": "^5.1.0",
    "express-session": "^1.15.2",
    "jsonwebtoken": "^7.3.0",
    "jwt-express": "^1.1.0",
    "method-override": "^2.3.8",
    "morgan": "^1.8.1",
    "node-fetch": "^1.6.3",
    "pg-promise": "^5.6.4"

nutritionix api

#3 General approach

My approach is to create a fitness/health app that users can keep track of their craving food and also not hurt their diet too badly, my app can help them decide whether the calories they burned daily is bigger or equal to the food they want to eat.

I used nutritionix api to fetch the food data and show the result of calories, and insert the info of everyfood user selected to my backend database.

To know the burned calories, I used fetch to post the exercises users did and their age, height, weight and gender to the service.

first, I had my API functionality built out and tested it successfully using postman, and then I complete my front end with React and created my components of all the detailed food information, and finally I interacted my backend service and database with react components by doing a fetch call.

A simple npm install upon installation should allow any developer access.

#4 User Stories

1. Users can search for the food they want , and get back results of serving qty/serving unit and calories, images of the food.
2. Users can save the food and amount to their favorite list and remove them.
3. Users can see the results of the calories they've burned by inputing all the information to a form.
4. Users can know whether they can eat the food in their craving food list by see the comparison of the calories they've burnes and the total calories of the food list.

#5 Wireframes

Page1:
![alt tag](Gplea_page1.png)

Page2:
![alt tag](Gplea_page1.png)

#6 Unsolved problems 
I couldn't figure out how to make the users to reduce or add the amount of the food in the favorite food list.













