"use strict";

const axios = require("axios");

// Helper Functions for apiController to perform operations with Open Pull Requests

module.exports = {

    // Input: list of PullRequest Objects, makes async GET to github api
    // to the compare url for the open pull request
    // The compare url contains the total # of commits for an open PR

    // Returns: new Array of updated PR Objects with their total commits
    updatePRInfo: async(oldPRList) => {
        console.log("updatePRInfo");
        try {
    
            const promises = oldPRList.map(async pr => {
    
                let url = pr.compareUrl;
                const response = await axios.get(url)
                // return new Object with previous info and total commits from response
                return {
                    number: pr.number,
                    state: pr.state,
                    compareUrl: pr.compareUrl,
                    total_commits: response.data.total_commits
                }
            })
    
            // Promise.all because these are async requests
            // have to wait for all Promises to resolve
            const results = await Promise.all(promises);
    
            return results;
    
        } catch (err) {
            // must 'throw' error because async function
            throw new Error("Sorry, something went wrong with your application :'(")
        }
    },

    // Input: response from querying for repo based on user-input from FrontEnd
    // Returns: Array containing Objects of each Open PullRequest

    getPRArrayFromResponse: (response) => {
        console.log("getPRArrayFromResponse");
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
    
    }

}