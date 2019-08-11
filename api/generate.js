const axios     = require('axios')
const url       = 'http://api.imgflip.com/';

module.exports = (req, res) => {
    axios.post( url + '/caption_image', null, {
        params: {
            template_id: req.query.template_id,
            text0: req.query.text0,
            text1: req.query.text1,
            username: req.query.username,
            password: req.query.password
        }
    })
    .then( (response) => {
        if (response.data.success) {
            res.json(response.data.data.url);
        } else {
            res.json({
                error: response.data.error_message
            })
        }
    })
    .catch( (error) => {
        console.error(error)
    })
}