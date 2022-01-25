"use strict";

const axios = require("axios");

// Class for Open Pull Requests with helper methods for controllers
const Pulls = require("../helpers/Pulls");

module.exports = {

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
            const newPRArray = await Pulls.updatePRInfo(prArray);
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