const request = require('request'); 

module.exports = {
    getInstall: (req,res)=>{
        let data = {
            form: {
                client_id: process.env.SLACK_CLIENT_ID,
                client_secret: process.env.SLACK_CLIENT_SECRET,
                code: req.query.code
            }
        }; 
        
        request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // You are done. 
                // If you want to get team info, you need to get the token here 
                let token = JSON.parse(body).access_token; // Auth token 
            }
        })
    }
}