# github-api

- ### Table of Contents
    - [File Structure](./README.md#file-structure)
    - [Application Description](./README.md#application-description)
    - [Installation Guide](./README.md#installation-guide)
    - [Technologies Used](./README.md#technologies-used)
    - [Reflections and Lessons Learned](./README.md#reflections-and-lessons-learned)

- ### File Structure:
    ```
        github-api
        ├── client
        │   └── src
        │       ├── components
        │       |       └── PullComponent.vue (Vue component that handles Open PullRequests)
        │       |
        |       ├── App.vue (Vue App)
        |       ├── main.js (mounts Vue app)
        |       └── PullService.js (Service class that handles GET call to backend api)
        |
        └── server
            ├── controllers
            |    ├── apiController.js (controller for /api/ routes)
            |    ├── apiController.test.js (unit/integration tests)
            |    └── errorController.js (controller used as error middleware)
            ├── helpers
            |    ├── Pulls.js (helper functions for apiController for PullRequest Objects)
            |    └── Pulls.test.js (unit tests)
            ├── routes
            |    ├── apiRoutes.js (routes defined for /api paths, uses errorController middleware)
            |    ├── errorRoutes.js (errorController middleware routes defined)
            |    └── index.js (router routes defined)
            ├── main.js (instantiates app and use router)
            └── main.test.js (end-to-end testing of app using puppeteer)
    ```
- ### Application Description:
    - Single Page Web App to query Github API for Open Pull Requests with their Total Commits
        - user can enter url or username/repo in input field
            - ex. https://github.com/jparrott06/ChirpyApp or jparrott06/ChirpyApp
        - user clicks on 'Search' button to make query
        - user awaits results
            - if a repo has open Pull Requests then they are displayed on page
            - if a repo doesn't exist then an error message is displayed
            - if a repo does exist but has no current open Pull Requests then user is notified
    - CAVEAT: 
        - When making many requests frequently the github api will rate limit your ip address.
        - This is more noticeable when running automated testing, but application will return 403 if rate limited

- ### Installation Guide:
    - Clone repo: https://github.com/jparrott06/github-api
    - Open terminal, cd to the repo, use command 'npm install' to install all node_module
    - run command 'npm run dev' (this runs the server) (localhost:5000)
    - Open another terminal
    - cd github-api/client
    - run command 'npm run serve' (this runs vue client) (localhost:8080)

    - Open Browser and go to client (localhost:8080)
    - Have fun! ^_^

    - Testing:
        - Test manually by having fun playing around with app and wathing the node console.log()
        - Or, Open another terminal, cd github-api, and enter command 'npm test'
        - This will run all unit, integration and end-to-end tests
    - Note about e2e testing:
        - I used puppeteer for e2e testing (main.test.js) with arguments {headless: false}
        - This will open a new browser pages so you can watch pupeteer test in real time and see the results
        - if you want to disable this to make the tests run faster then feel free to comment out those parameters after pupeteer.launch()

- ### Technologies Used
    - FrontEnd
        - Vue
        - JavaScript
        - CSS
        - HTML
        - Axios
    - BackEnd
        - Node
        - Express
        - CORS
        - Axios
        - Jest (testing)
        - nodemon (for development environment)
        - puppeteer (for end-to-end testing - used with Jest)
        - supertest (unused - experimenting with HTTP request testing)

- ### Reflections and Lessons Learned

I had an amazing time developing this simple Github API using Node!

<b>Jest</b>

This having been my first time using Jest was at first challenging, but I quickly saw its power and influence over my code.
For instance, I wanted to unit test operations within my apiController in isolation and ended up creating a /helpers folder
for functions that did not belong properly in the controller itself. Not only did this clean up the code more and enhance modularity, I was able to increase my test coverage. If I want to scale this application with more complex endpoints and functionality then I know I have the structure to do that in place.

<b>Puppeteer</b>

I've used Puppeteer before for a webscraping project that scrapes websites for Japanese vocabulary to dynamically seed my database, so I've known about this tool before in that capacity.

However, using this for End-to-End testing was a lot of fun. I loved being able to run 'npm test' and see my Chrome browser open and test FrontEnd to BackEnd and Back all with one command. Seeing the Puppet fill out my form and wait for the proper respones for each use-case helped me save a lot of development time whenever I added/refactored code.

<b>Supertest</b>

I wanted to utilize this library for more test coverage but sadly did not have time to get around to it. I experimented with some of its use-cases and definitely see its worth - I think I would be more inclined to use supertest against end-points without rate limiting (oftentimes I would rate-limit myself by running tests). I definitely will be exploring this tool in tandem with Jest as I did with Puppeteer in the future.

<b>Testing</b>

Testing, testing, testing. We can never have enough. I know for future enhancements to this app I'd want to:
 - Organize tests in either one test folder in root, or organize test folders in each path for their respective test targets
 - Add more tests, specifically for /routes, enhance existing tests with more checks and use-cases in mind
 - Become more familiar with supertest so I can enhance testing coverage

<b>API Strategies</b>

I love working with API's and sleuthing around for the most efficient ways to grab the data I need.

Two examples in particular come to mind when doing this project:

- Getting the total_commits:

    At first I remember trying the endpoints manually to scout out my plan for getting the total commits.
    I went for the naive approach and tried to grab every commit, until I realised that the github api will limit the amount of commits returned for an open Pull Request to 30.

    Reading the api.github documentation was a fun process where I was able to find out that comparison url for a particular pull request has the integer value of total_commits readily available.

- Async with .map()

    Debugging what came to be my 'updatePRInfo' function under /helpers/Pulls.js was one of the most rewarding (and frustrating) parts of developing this application.

    I was used to using .then(), .catch() syntax, only to find out 'it is no longer best practice', and then using .map (a synchronous function) within an async function to dynamically return updated Pull Request objects... was quite the adventure. What I enjoyed about this though was gaining a much deeper understanding of async functions and Promises. Now I'm excited about what I can do with these enhanced skills for the next iteration or application.

