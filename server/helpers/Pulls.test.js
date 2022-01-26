const Pulls = require('./Pulls');

// Unit Testing for Pulls helper functions

test('updatePRInfo returns new Array with total_commits', async () => {

    let prArray = [{
        number: "1",
        state: "open",
        compareUrl: "https://api.github.com/repos/jparrott06/ChirpyApp/compare/d7d7e62d3013e37fe59a79712d22312c13d88cef...608081cedebe9f6eed938c4db7ccf6b8611c36f4"
    }];

    const newPRArray = await Pulls.updatePRInfo(prArray);

    expect(newPRArray[0]).toMatchObject({
        number: "1",
        state: "open",
        compareUrl: "https://api.github.com/repos/jparrott06/ChirpyApp/compare/d7d7e62d3013e37fe59a79712d22312c13d88cef...608081cedebe9f6eed938c4db7ccf6b8611c36f4",
        total_commits: 106
    });

    expect(prArray !== newPRArray);

    expect(newPRArray.length == prArray.length);

});

test('updatePRInfo throw Error when input empty Array', async () => {

    let prArray = [{

    }];

    try {
      const newPRArray = await Pulls.updatePRInfo(prArray);
    } catch (err) {
      expect(err)
    }

});

test('updatePRInfo throw Error with invalid input', async () => {

    let prArray = [{
        numberError: "1",
        stateError: "open",
        compareUrlError: "https://api.github.com/repos/jparrott06/ChirpyApp/compare/d7d7e62d3013e37fe59a79712d22312c13d88cef...608081cedebe9f6eed938c4db7ccf6b8611c36f4"
    }];

    try {
      const newPRArray = await Pulls.updatePRInfo(prArray);
    } catch (err) {
      expect(err)
    }

});

// Testing getPRArrayFromResponse helper function

describe('Test getPRArrayFromResponse ', () => {

    let mockResponse = {};
    mockResponse.data = [
        {
          "url": "https://api.github.com/repos/jparrott06/ChirpyApp/pulls/1",
          "id": 828935855,
          "node_id": "PR_kwDOFOnNTM4xaI6v",
          "html_url": "https://github.com/jparrott06/ChirpyApp/pull/1",
          "diff_url": "https://github.com/jparrott06/ChirpyApp/pull/1.diff",
          "patch_url": "https://github.com/jparrott06/ChirpyApp/pull/1.patch",
          "issue_url": "https://api.github.com/repos/jparrott06/ChirpyApp/issues/1",
          "number": 1,
          "state": "open",
          "locked": false,
          "title": "Final project -> main",
          "user": {
            "login": "jparrott06",
            "id": 48459550,
            "node_id": "MDQ6VXNlcjQ4NDU5NTUw",
            "avatar_url": "https://avatars.githubusercontent.com/u/48459550?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/jparrott06",
            "html_url": "https://github.com/jparrott06",
            "followers_url": "https://api.github.com/users/jparrott06/followers",
            "following_url": "https://api.github.com/users/jparrott06/following{/other_user}",
            "gists_url": "https://api.github.com/users/jparrott06/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/jparrott06/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/jparrott06/subscriptions",
            "organizations_url": "https://api.github.com/users/jparrott06/orgs",
            "repos_url": "https://api.github.com/users/jparrott06/repos",
            "events_url": "https://api.github.com/users/jparrott06/events{/privacy}",
            "received_events_url": "https://api.github.com/users/jparrott06/received_events",
            "type": "User",
            "site_admin": false
          },
          "body": null,
          "created_at": "2022-01-21T20:59:07Z",
          "updated_at": "2022-01-21T20:59:07Z",
          "closed_at": null,
          "merged_at": null,
          "merge_commit_sha": "31947765e8ccdcdd80816cdd9e2c2e1d82793810",
          "assignee": null,
          "assignees": [],
          "requested_reviewers": [],
          "requested_teams": [],
          "labels": [],
          "milestone": null,
          "draft": false,
          "commits_url": "https://api.github.com/repos/jparrott06/ChirpyApp/pulls/1/commits",
          "review_comments_url": "https://api.github.com/repos/jparrott06/ChirpyApp/pulls/1/comments",
          "review_comment_url": "https://api.github.com/repos/jparrott06/ChirpyApp/pulls/comments{/number}",
          "comments_url": "https://api.github.com/repos/jparrott06/ChirpyApp/issues/1/comments",
          "statuses_url": "https://api.github.com/repos/jparrott06/ChirpyApp/statuses/608081cedebe9f6eed938c4db7ccf6b8611c36f4",
          "head": {
            "label": "jparrott06:Final-Project",
            "ref": "Final-Project",
            "sha": "608081cedebe9f6eed938c4db7ccf6b8611c36f4",
            "user": {
              "login": "jparrott06",
              "id": 48459550,
              "node_id": "MDQ6VXNlcjQ4NDU5NTUw",
              "avatar_url": "https://avatars.githubusercontent.com/u/48459550?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/jparrott06",
              "html_url": "https://github.com/jparrott06",
              "followers_url": "https://api.github.com/users/jparrott06/followers",
              "following_url": "https://api.github.com/users/jparrott06/following{/other_user}",
              "gists_url": "https://api.github.com/users/jparrott06/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/jparrott06/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/jparrott06/subscriptions",
              "organizations_url": "https://api.github.com/users/jparrott06/orgs",
              "repos_url": "https://api.github.com/users/jparrott06/repos",
              "events_url": "https://api.github.com/users/jparrott06/events{/privacy}",
              "received_events_url": "https://api.github.com/users/jparrott06/received_events",
              "type": "User",
              "site_admin": false
            },
            "repo": {
              "id": 350866764,
              "node_id": "MDEwOlJlcG9zaXRvcnkzNTA4NjY3NjQ=",
              "name": "ChirpyApp",
              "full_name": "jparrott06/ChirpyApp",
              "private": false,
              "owner": {
                "login": "jparrott06",
                "id": 48459550,
                "node_id": "MDQ6VXNlcjQ4NDU5NTUw",
                "avatar_url": "https://avatars.githubusercontent.com/u/48459550?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/jparrott06",
                "html_url": "https://github.com/jparrott06",
                "followers_url": "https://api.github.com/users/jparrott06/followers",
                "following_url": "https://api.github.com/users/jparrott06/following{/other_user}",
                "gists_url": "https://api.github.com/users/jparrott06/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/jparrott06/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/jparrott06/subscriptions",
                "organizations_url": "https://api.github.com/users/jparrott06/orgs",
                "repos_url": "https://api.github.com/users/jparrott06/repos",
                "events_url": "https://api.github.com/users/jparrott06/events{/privacy}",
                "received_events_url": "https://api.github.com/users/jparrott06/received_events",
                "type": "User",
                "site_admin": false
              },
              "html_url": "https://github.com/jparrott06/ChirpyApp",
              "description": null,
              "fork": false,
              "url": "https://api.github.com/repos/jparrott06/ChirpyApp",
              "forks_url": "https://api.github.com/repos/jparrott06/ChirpyApp/forks",
              "keys_url": "https://api.github.com/repos/jparrott06/ChirpyApp/keys{/key_id}",
              "collaborators_url": "https://api.github.com/repos/jparrott06/ChirpyApp/collaborators{/collaborator}",
              "teams_url": "https://api.github.com/repos/jparrott06/ChirpyApp/teams",
              "hooks_url": "https://api.github.com/repos/jparrott06/ChirpyApp/hooks",
              "issue_events_url": "https://api.github.com/repos/jparrott06/ChirpyApp/issues/events{/number}",
              "events_url": "https://api.github.com/repos/jparrott06/ChirpyApp/events",
              "assignees_url": "https://api.github.com/repos/jparrott06/ChirpyApp/assignees{/user}",
              "branches_url": "https://api.github.com/repos/jparrott06/ChirpyApp/branches{/branch}",
              "tags_url": "https://api.github.com/repos/jparrott06/ChirpyApp/tags",
              "blobs_url": "https://api.github.com/repos/jparrott06/ChirpyApp/git/blobs{/sha}",
              "git_tags_url": "https://api.github.com/repos/jparrott06/ChirpyApp/git/tags{/sha}",
              "git_refs_url": "https://api.github.com/repos/jparrott06/ChirpyApp/git/refs{/sha}",
              "trees_url": "https://api.github.com/repos/jparrott06/ChirpyApp/git/trees{/sha}",
              "statuses_url": "https://api.github.com/repos/jparrott06/ChirpyApp/statuses/{sha}",
              "languages_url": "https://api.github.com/repos/jparrott06/ChirpyApp/languages",
              "stargazers_url": "https://api.github.com/repos/jparrott06/ChirpyApp/stargazers",
              "contributors_url": "https://api.github.com/repos/jparrott06/ChirpyApp/contributors",
              "subscribers_url": "https://api.github.com/repos/jparrott06/ChirpyApp/subscribers",
              "subscription_url": "https://api.github.com/repos/jparrott06/ChirpyApp/subscription",
              "commits_url": "https://api.github.com/repos/jparrott06/ChirpyApp/commits{/sha}",
              "git_commits_url": "https://api.github.com/repos/jparrott06/ChirpyApp/git/commits{/sha}",
              "comments_url": "https://api.github.com/repos/jparrott06/ChirpyApp/comments{/number}",
              "issue_comment_url": "https://api.github.com/repos/jparrott06/ChirpyApp/issues/comments{/number}",
              "contents_url": "https://api.github.com/repos/jparrott06/ChirpyApp/contents/{+path}",
              "compare_url": "https://api.github.com/repos/jparrott06/ChirpyApp/compare/{base}...{head}",
              "merges_url": "https://api.github.com/repos/jparrott06/ChirpyApp/merges",
              "archive_url": "https://api.github.com/repos/jparrott06/ChirpyApp/{archive_format}{/ref}",
              "downloads_url": "https://api.github.com/repos/jparrott06/ChirpyApp/downloads",
              "issues_url": "https://api.github.com/repos/jparrott06/ChirpyApp/issues{/number}",
              "pulls_url": "https://api.github.com/repos/jparrott06/ChirpyApp/pulls{/number}",
              "milestones_url": "https://api.github.com/repos/jparrott06/ChirpyApp/milestones{/number}",
              "notifications_url": "https://api.github.com/repos/jparrott06/ChirpyApp/notifications{?since,all,participating}",
              "labels_url": "https://api.github.com/repos/jparrott06/ChirpyApp/labels{/name}",
              "releases_url": "https://api.github.com/repos/jparrott06/ChirpyApp/releases{/id}",
              "deployments_url": "https://api.github.com/repos/jparrott06/ChirpyApp/deployments",
              "created_at": "2021-03-23T21:48:58Z",
              "updated_at": "2021-06-25T16:00:51Z",
              "pushed_at": "2022-01-21T20:59:08Z",
              "git_url": "git://github.com/jparrott06/ChirpyApp.git",
              "ssh_url": "git@github.com:jparrott06/ChirpyApp.git",
              "clone_url": "https://github.com/jparrott06/ChirpyApp.git",
              "svn_url": "https://github.com/jparrott06/ChirpyApp",
              "homepage": null,
              "size": 13812,
              "stargazers_count": 1,
              "watchers_count": 1,
              "language": "EJS",
              "has_issues": true,
              "has_projects": true,
              "has_downloads": true,
              "has_wiki": true,
              "has_pages": true,
              "forks_count": 0,
              "mirror_url": null,
              "archived": false,
              "disabled": false,
              "open_issues_count": 1,
              "license": null,
              "allow_forking": true,
              "is_template": false,
              "topics": [],
              "visibility": "public",
              "forks": 0,
              "open_issues": 1,
              "watchers": 1,
              "default_branch": "main"
            }
          },
          "base": {
            "label": "jparrott06:main",
            "ref": "main",
            "sha": "d7d7e62d3013e37fe59a79712d22312c13d88cef",
            "user": {
              "login": "jparrott06",
              "id": 48459550,
              "node_id": "MDQ6VXNlcjQ4NDU5NTUw",
              "avatar_url": "https://avatars.githubusercontent.com/u/48459550?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/jparrott06",
              "html_url": "https://github.com/jparrott06",
              "followers_url": "https://api.github.com/users/jparrott06/followers",
              "following_url": "https://api.github.com/users/jparrott06/following{/other_user}",
              "gists_url": "https://api.github.com/users/jparrott06/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/jparrott06/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/jparrott06/subscriptions",
              "organizations_url": "https://api.github.com/users/jparrott06/orgs",
              "repos_url": "https://api.github.com/users/jparrott06/repos",
              "events_url": "https://api.github.com/users/jparrott06/events{/privacy}",
              "received_events_url": "https://api.github.com/users/jparrott06/received_events",
              "type": "User",
              "site_admin": false
            },
            "repo": {
              "id": 350866764,
              "node_id": "MDEwOlJlcG9zaXRvcnkzNTA4NjY3NjQ=",
              "name": "ChirpyApp",
              "full_name": "jparrott06/ChirpyApp",
              "private": false,
              "owner": {
                "login": "jparrott06",
                "id": 48459550,
                "node_id": "MDQ6VXNlcjQ4NDU5NTUw",
                "avatar_url": "https://avatars.githubusercontent.com/u/48459550?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/jparrott06",
                "html_url": "https://github.com/jparrott06",
                "followers_url": "https://api.github.com/users/jparrott06/followers",
                "following_url": "https://api.github.com/users/jparrott06/following{/other_user}",
                "gists_url": "https://api.github.com/users/jparrott06/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/jparrott06/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/jparrott06/subscriptions",
                "organizations_url": "https://api.github.com/users/jparrott06/orgs",
                "repos_url": "https://api.github.com/users/jparrott06/repos",
                "events_url": "https://api.github.com/users/jparrott06/events{/privacy}",
                "received_events_url": "https://api.github.com/users/jparrott06/received_events",
                "type": "User",
                "site_admin": false
              },
              "html_url": "https://github.com/jparrott06/ChirpyApp",
              "description": null,
              "fork": false,
              "url": "https://api.github.com/repos/jparrott06/ChirpyApp",
              "forks_url": "https://api.github.com/repos/jparrott06/ChirpyApp/forks",
              "keys_url": "https://api.github.com/repos/jparrott06/ChirpyApp/keys{/key_id}",
              "collaborators_url": "https://api.github.com/repos/jparrott06/ChirpyApp/collaborators{/collaborator}",
              "teams_url": "https://api.github.com/repos/jparrott06/ChirpyApp/teams",
              "hooks_url": "https://api.github.com/repos/jparrott06/ChirpyApp/hooks",
              "issue_events_url": "https://api.github.com/repos/jparrott06/ChirpyApp/issues/events{/number}",
              "events_url": "https://api.github.com/repos/jparrott06/ChirpyApp/events",
              "assignees_url": "https://api.github.com/repos/jparrott06/ChirpyApp/assignees{/user}",
              "branches_url": "https://api.github.com/repos/jparrott06/ChirpyApp/branches{/branch}",
              "tags_url": "https://api.github.com/repos/jparrott06/ChirpyApp/tags",
              "blobs_url": "https://api.github.com/repos/jparrott06/ChirpyApp/git/blobs{/sha}",
              "git_tags_url": "https://api.github.com/repos/jparrott06/ChirpyApp/git/tags{/sha}",
              "git_refs_url": "https://api.github.com/repos/jparrott06/ChirpyApp/git/refs{/sha}",
              "trees_url": "https://api.github.com/repos/jparrott06/ChirpyApp/git/trees{/sha}",
              "statuses_url": "https://api.github.com/repos/jparrott06/ChirpyApp/statuses/{sha}",
              "languages_url": "https://api.github.com/repos/jparrott06/ChirpyApp/languages",
              "stargazers_url": "https://api.github.com/repos/jparrott06/ChirpyApp/stargazers",
              "contributors_url": "https://api.github.com/repos/jparrott06/ChirpyApp/contributors",
              "subscribers_url": "https://api.github.com/repos/jparrott06/ChirpyApp/subscribers",
              "subscription_url": "https://api.github.com/repos/jparrott06/ChirpyApp/subscription",
              "commits_url": "https://api.github.com/repos/jparrott06/ChirpyApp/commits{/sha}",
              "git_commits_url": "https://api.github.com/repos/jparrott06/ChirpyApp/git/commits{/sha}",
              "comments_url": "https://api.github.com/repos/jparrott06/ChirpyApp/comments{/number}",
              "issue_comment_url": "https://api.github.com/repos/jparrott06/ChirpyApp/issues/comments{/number}",
              "contents_url": "https://api.github.com/repos/jparrott06/ChirpyApp/contents/{+path}",
              "compare_url": "https://api.github.com/repos/jparrott06/ChirpyApp/compare/{base}...{head}",
              "merges_url": "https://api.github.com/repos/jparrott06/ChirpyApp/merges",
              "archive_url": "https://api.github.com/repos/jparrott06/ChirpyApp/{archive_format}{/ref}",
              "downloads_url": "https://api.github.com/repos/jparrott06/ChirpyApp/downloads",
              "issues_url": "https://api.github.com/repos/jparrott06/ChirpyApp/issues{/number}",
              "pulls_url": "https://api.github.com/repos/jparrott06/ChirpyApp/pulls{/number}",
              "milestones_url": "https://api.github.com/repos/jparrott06/ChirpyApp/milestones{/number}",
              "notifications_url": "https://api.github.com/repos/jparrott06/ChirpyApp/notifications{?since,all,participating}",
              "labels_url": "https://api.github.com/repos/jparrott06/ChirpyApp/labels{/name}",
              "releases_url": "https://api.github.com/repos/jparrott06/ChirpyApp/releases{/id}",
              "deployments_url": "https://api.github.com/repos/jparrott06/ChirpyApp/deployments",
              "created_at": "2021-03-23T21:48:58Z",
              "updated_at": "2021-06-25T16:00:51Z",
              "pushed_at": "2022-01-21T20:59:08Z",
              "git_url": "git://github.com/jparrott06/ChirpyApp.git",
              "ssh_url": "git@github.com:jparrott06/ChirpyApp.git",
              "clone_url": "https://github.com/jparrott06/ChirpyApp.git",
              "svn_url": "https://github.com/jparrott06/ChirpyApp",
              "homepage": null,
              "size": 13812,
              "stargazers_count": 1,
              "watchers_count": 1,
              "language": "EJS",
              "has_issues": true,
              "has_projects": true,
              "has_downloads": true,
              "has_wiki": true,
              "has_pages": true,
              "forks_count": 0,
              "mirror_url": null,
              "archived": false,
              "disabled": false,
              "open_issues_count": 1,
              "license": null,
              "allow_forking": true,
              "is_template": false,
              "topics": [],
              "visibility": "public",
              "forks": 0,
              "open_issues": 1,
              "watchers": 1,
              "default_branch": "main"
            }
          },
          "_links": {
            "self": {
              "href": "https://api.github.com/repos/jparrott06/ChirpyApp/pulls/1"
            },
            "html": {
              "href": "https://github.com/jparrott06/ChirpyApp/pull/1"
            },
            "issue": {
              "href": "https://api.github.com/repos/jparrott06/ChirpyApp/issues/1"
            },
            "comments": {
              "href": "https://api.github.com/repos/jparrott06/ChirpyApp/issues/1/comments"
            },
            "review_comments": {
              "href": "https://api.github.com/repos/jparrott06/ChirpyApp/pulls/1/comments"
            },
            "review_comment": {
              "href": "https://api.github.com/repos/jparrott06/ChirpyApp/pulls/comments{/number}"
            },
            "commits": {
              "href": "https://api.github.com/repos/jparrott06/ChirpyApp/pulls/1/commits"
            },
            "statuses": {
              "href": "https://api.github.com/repos/jparrott06/ChirpyApp/statuses/608081cedebe9f6eed938c4db7ccf6b8611c36f4"
            }
          },
          "author_association": "OWNER",
          "auto_merge": null,
          "active_lock_reason": null
        }
      ];
        
    const prArray = Pulls.getPRArrayFromResponse(mockResponse);

    test('returns array of PullRequest Objects from response', () => {
    
      expect(prArray.length).toEqual(1);
      expect(prArray[0].number).toEqual(1);
      expect(prArray[0].compareUrl).toEqual('https://api.github.com/repos/jparrott06/ChirpyApp/compare/d7d7e62d3013e37fe59a79712d22312c13d88cef...608081cedebe9f6eed938c4db7ccf6b8611c36f4');
      expect(prArray[0].state).toEqual('open');

    })

    test('PullRequest Array length same as response.data', () => {
      expect(prArray.length).toEqual(mockResponse.data.length);
    })

    test('PullRequests have number field populated', () => {
      prArray.forEach(pr => {
        expect(pr.number !== null)
      })
    })

    test('PullRequests have compareUrl field populated', () => {
      prArray.forEach(pr => {
        expect(pr.compareUrl !== null)
      })
    })

    test('PullRequests have state field populated', () => {
      prArray.forEach(pr => {
        expect(pr.state !== null)
      })
    })

})



