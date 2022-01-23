"use strict";

const axios = require("axios");


module.exports = {

    getPRArrayFromResponse: (response) => {

        let prArray = [];
        try {
    
            response.data.forEach(pr => {
    
                let prObj = {};
                let compareUrl = pr.base.repo.compare_url; // url for compare of head and base branches for each PR
                let baseSha = pr.base.sha; // sha for the base branch of PR
                let headSha = pr.head.sha; // sha for the head branch of PR
    
                prObj.number = pr.number; // pr number
                prObj.state = pr.state; // pr state: default query for url state=open
                // replace base & head placeholders in url with dynamic info
                prObj.compareUrl = compareUrl.replace('{base}', baseSha).replace('{head}', headSha);
                // push to array of PR Objects
                prArray.push(prObj);
    
            })
    
            return prArray;
    
        } catch (err) {
            console.log(err);
        }
    
    },

    // Get all Open Pull-Requests for a specific Github Repo. Returns Array of PullRequest Objects
    getOpenPRs: async (req, res, next) => {

        // url: https://api.github.com/{user}/{repo}/pulls

        // TODO: create const to be user input for repo from FrontEnd

        // url to get all oepn PRs for repo TODO: generalize for form input
        let pullsUrl = 'https://api.github.com/repos/jparrott06/ChirpyApp/pulls';

        try {

            const response = await axios.get(pullsUrl)
            //console.log(response);

            // array to hold PullRequest Objects
            let prArray = [];

            // iterate for every open Pull Request return
            response.data.forEach(pr => {

                // initialize empty PR Object
                let prObj = {};

                let compareUrl = pr.base.repo.compare_url; // url for compare of head and base branches for each PR
                let baseSha = pr.base.sha; // sha for the base branch of PR
                let headSha = pr.head.sha; // sha for the head branch of PR

                prObj.number = pr.number; // pr number
                prObj.state = pr.state; // pr state: default query for url state=open

                // replace base & head placeholders in url with dynamic info
                prObj.compareUrl = compareUrl.replace('{base}', baseSha).replace('{head}', headSha);

                //console.log(prObj);

                // push to array of PR Objects
                prArray.push(prObj);

            })

            console.log(prArray);

            res.locals.prArray = prArray;
            next();

        } catch (err) {
            console.log(err);
            next();
        }

    }

    /* TODO: 
        Add method to iterate through prArray and 
            GET request with compare_url
        ex: 'https://api.github.com/repos/jparrott06/ChirpyApp/compare/d7d7e62d3013e37fe59a79712d22312c13d88cef...608081cedebe9f6eed938c4db7ccf6b8611c36f4'

        get response.data.total_commits for each open PR
    */











}