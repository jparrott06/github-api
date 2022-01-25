import axios from 'axios';

const url = 'http://localhost:5000/api/getOpenPRs';
/* eslint-disable */
class PullService {

    // Get Open Pull Requests for specified Repo

    static getPulls(text) {
        
        return new Promise(async (resolve, reject) => {
            console.log("text: " + text);
            try {
                const res = await axios.get(url, { params: { text: text } });
                const data = res.data;
                console.log("response");
                console.log(res);
                console.log("data");
                console.log(data);

                if(res.data.error) {
                    throw new Error(`Error: ${res.data.error.message}`);
                }

                console.log(data.data.prArray);
                resolve(
                    data.data.prArray.map(pull => {
                        console.log(pull)
                        return pull;
                    })
                )

            } catch (err) {
                reject(err);
            }
        })

    }



}

export default PullService;