import config from '../../config';
import logger from '../../utils/winston';

const accountSid = config.default.twilio.accountSid;
const authToken = config.default.twilio.authToken;
const senderNo = config.default.twilio.phoneNumber;
const client = require('twilio')(accountSid, authToken);

export const message = (msg: any) => logger.info(msg.sid);

const messenger = async (to: any, body: any) => {
    if (config.env === 'production') {
        await client.messages
            .create({
                body,
                from: senderNo,
                to,
            })
            .then(message)
    }
};

export default messenger;