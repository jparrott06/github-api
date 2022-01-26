import axios from 'axios';

const url = 'http://localhost:5000/api/getOpenPRs';
/* eslint-disable */
class PullService {

    // Get Open Pull Requests for specified Repo
    // queries back-end with repo
    // gets back all open PR's along with their total # of commits for front-end
    static getPulls(text) {
        
        return new Promise(async (resolve, reject) => {
            console.log("text: " + text);
            try {
                const res = await axios.get(url, { params: { text: text } });
                const data = res.data;

                // Throw error is error Obj is returned
                if(res.data.error) {
                    throw new Error(`Error: ${res.data.error.message}`);
                }

                console.log(data.data.prArray);
                // resolve array of Pull Request Objects from Server
                resolve(
                    data.data.prArray.map(pull => {
                        return pull;
                    })
                )

            } catch (err) {
                // reject Promise if err
                reject(err);
            }
        })

    }



}

export default PullService;