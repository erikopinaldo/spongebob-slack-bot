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

        axios.post(`${apiUrl}/oauth.v2.access`, qs.stringify(authInfo))
            .then((result) => {

                console.log('showing result.data')
                console.log(result.data);

                const { access_token, refresh_token, expires_in, error } = result.data;

                if (error) {
                    res.sendStatus(401);
                    console.log(error);
                    return;
                }

                axios.post(`${apiUrl}/team.info`, qs.stringify({ token: access_token }))
                    .then((result) => {
                        if (!result.data.error) {
                            console.log('trying team redirect')
                            console.log(result.data.team)
                            res.redirect(`http://${result.data.team.domain}.slack.com`)
                            // res.redirect(`slack://open?team=${result.data.team.id}`); // opens Slack app
                        }
                    })
                    .catch((err) => { console.error(err); });

            })
            .catch((err) => {
                console.log('showing last error')
                console.error(err);
            });
    }
}