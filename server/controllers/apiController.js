"use strict";

const axios = require("axios");

async function updatePRInfo(oldPRList) {
    console.log("updatePRInfo");
    try {

        const promises = oldPRList.map(async pr => {

            let url = pr.compareUrl;
            const response = await axios.get(url)
            return {
                number: pr.number,
                state: pr.state,
                compareUrl: pr.compareUrl,
                total_commits: response.data.total_commits
            }
        })

        const results = await Promise.all(promises);

        return results;

    } catch (err) {
        throw new Error("Sorry, something went wrong with your application :'(")
    }

}

module.exports = {

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
    
    },

    // Get all Open Pull-Requests for a specific Github Repo. Returns Array of PullRequest Objects
    getOpenPRs: async (req, res, next) => {
        console.log("getOpenPRs");
        // url: https://api.github.com/{user}/{repo}/pulls

        if (!req.query.text) {
            next(new Error("Search parameters cannot be blank"));
        }

        let searchRepo = req.query.text.replace('https://github.com/','');

        console.log(searchRepo);

        // url to get all open PRs for repo
        let pullsUrl = `https://api.github.com/repos/${searchRepo}/pulls`;

        console.log(pullsUrl);

        try {

            const response = await axios.get(pullsUrl)
            //console.log(response);

            if (response.status != 200) {
                next(new Error("Sorry - repo not found :/"));
            }

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
            console.log('getOpenPRs err: ' + err);
            next(err);
        }

    },

    // Get the total # of commits for each PullRequest Object
    getCommitNum: async (req, res, next) => {
        console.log("getCommitNum");

        let prArray = res.locals.prArray;

        try {
            const newPRArray = await updatePRInfo(prArray);
            console.log(newPRArray);
            res.locals.prArray = newPRArray;
            next()
        } catch (err) {
            console.log('getComitNum err: ' + err);
            next(err);
        }

    },

    respondJSON: (req, res) => {
        console.log("respondJSON");
        res.json({
            data: res.locals,
            status: 200
        });
    }


}