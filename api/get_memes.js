const axios     = require('axios')
const url       = 'http://api.imgflip.com/';

module.exports = (req, res) => {
    axios.get( url + '/get_memes' )
        .then( (response) => {
            if (response.data.success) {
                res.json(response.data.data.memes)
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