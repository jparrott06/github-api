"use strict";

const axios = require("axios");

// Class for Open Pull Requests with helper methods for controllers
const Pulls = require("../helpers/Pulls");

module.exports = {

    // Get all Open Pull-Requests for a specific Github Repo. Returns Array of PullRequest Objects
    getOpenPRs: async (req, res, next) => {
        console.log("getOpenPRs");

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

            if (response.status == 404) {
                next(new Error("Sorry - repo not found :/"));
            }

            // Call helper function to create array of PR Objects from response
            let prArray = Pulls.getPRArrayFromResponse(response);

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
            // Call helper function to return new PR Array with total_commits info
            const newPRArray = await Pulls.updatePRInfo(prArray);
            console.log(newPRArray);
            res.locals.prArray = newPRArray;
            next()
        } catch (err) {
            console.log('getComitNum err: ' + err);
            next(err);
        }

    },

    // Convert response to JSON - generalized and can be used for other routes as well
    respondJSON: (req, res) => {
        console.log("respondJSON");
        res.json({
            data: res.locals,
            status: 200
        });
    }


}