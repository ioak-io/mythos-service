import axios from 'axios';

const {SLACK_WEBHOOK_URL} = require('../../../env.js');

module.exports = function(router:any){
    router.post('/send-message', async (req:any, res:any) => {
        const { text } = req.body; 
    
        if (!text) {
            return res.status(400).json({ error: "Message text is required" });
        }
    
        try {
            const response = await axios.post(SLACK_WEBHOOK_URL, {
                text, 
            });
    
            res.status(200).json({ success: true, response: response.data });
        } catch (error) {
            console.error("Error sending message to Slack:", error);
            res.status(500).json({ error: "Failed to send message to Slack" });
        }
    });
}
