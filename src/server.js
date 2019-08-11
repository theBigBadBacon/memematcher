
const express   = require('express');
const cors      = require('cors')
const axios     = require('axios')

const app = express();

const url = 'http://api.imgflip.com/';

app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/getMemes', (req, res) => {
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
});

app.get('/generate', (req, res) => {
    axios.post(url + '/caption_image', null, {
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
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`listening on ${PORT}`));