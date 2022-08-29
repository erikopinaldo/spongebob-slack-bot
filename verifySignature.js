const crypto = require('crypto');

const isVerified = (req) => {
    
    // req.headers is an object
    const signature = req.headers['x-slack-signature'];
    const timestamp = req.headers['x-slack-request-timestamp'];
    
    // Create Hmac object that uses the sha256 crytographic hashing algorithm. Our signing secret acts as the key to this algorithm so that we can compare against the Slack signature we receive
    const hmac = crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET);
    
    // The signature variable from our req header will be split into two different variables, the version and the hash. More information about these two different parts at https://api.slack.com/authentication/verifying-requests-from-slack#verifying-requests-from-slack-using-signing-secrets__a-recipe-for-security__how-to-make-a-request-signature-in-4-easy-steps-an-overview
    const [version, hash] = signature.split('=');

    console.log(version)
    console.log(hash)

    // Check if the timestamp is too old
    const fiveMinutesAgo = ~~(Date.now() / 1000) - (60 * 5);
    if (timestamp < fiveMinutesAgo) return false;

    // This order of version, timestamp, raw body to form a base string is required by Slack. More info at the link in above comment
    hmac.update(`${version}:${timestamp}:${req.rawBody}`);

    // Check that the request signature matches expected value
    return hmac.digest('hex') === hash;
};

module.exports = { isVerified };