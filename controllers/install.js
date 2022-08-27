const axios = require('axios');
const apiUrl = 'https://slack.com/api';
const qs = require('qs'); 

module.exports = {
    getInstall: (req, res) => {
        if (!req.query.code) { // access denied
            res.redirect('/?error=access_denied');
            return;
        }
        const authInfo = {
            client_id: process.env.SLACK_CLIENT_ID,
            client_secret: process.env.SLACK_CLIENT_SECRET,
            code: req.query.code
        };

        axios.post(`${apiUrl}/oauth.access`, qs.stringify(authInfo))
            .then((result) => {
                // The payload data has been modified since the last version!
                // See https://api.slack.com/methods/oauth.access

                console.log(result.data);

                const { access_token, refresh_token, expires_in, error } = result.data;

                if (error) {
                    res.sendStatus(401);
                    console.log(error);
                    return;
                }

                // This link will open the workspace in Slack client, 
                // however, I am calling extra API for the tutorial to show you how to use Web API.
                // res.redirect(`slack://open?team=${team_id}`);

                // When you call Web APIs, you need to check if your access_token (xoxa-) is expired (60min) and if it is, get a fresh access token with your refresh_token (xoxr-).  
                // However, in this scenario, because you are calling this API immediately after the initial OAuth, access_token is not expired thus you can just use it.
                // See the additional code sample in the end of this file.

                axios.post(`${apiUrl}/team.info`, qs.stringify({ token: access_token })).then((result) => {
                    if (!result.data.error) {
                        res.redirect(`http://${result.data.team.domain}.slack.com`);
                    }
                }).catch((err) => { console.error(err); });

            }).catch((err) => {
                console.error(err);
            });

    }
}