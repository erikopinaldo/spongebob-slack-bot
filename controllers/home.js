module.exports = {
    postSpongebob: (req,res)=>{
        let textArr = req.body.text.toLowerCase().split('')
        let sponge = textArr.map(letter => {
            let random = Math.round(Math.random())

            return random < 0.5 ? letter : letter.toUpperCase()  
        })
        .join('')
        
        console.log(sponge)

        res.status(200).json({
            "response_type": "in_channel",
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": sponge
                    }
                }
            ]
        })
    }
}