const axios = require('axios').default;

module.exports = {
    postSpongebob: (req,res)=>{
        console.log(req.body)

        let textArr = req.body.text.toLowerCase().split('')
        let sponge = textArr.map(letter => {
            let random = Math.round(Math.random())

            return random < 0.5 ? letter : letter.toUpperCase()  
        })
        .join('')
        
        console.log(sponge)

        // Send converted text as a message to channel/conversation
        axios.post(req.body.response_url, { "response_type": "in_channel", "text": sponge })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

        res.status(200)
        .json({ // Sends a success message that only the user who used the slash command can see
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "_nice_"
                    }
                }
            ]
        })
    }
}