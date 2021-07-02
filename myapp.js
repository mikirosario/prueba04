var express = require('express'),
		session = require('express-session'),
		app = express(),
		path = require('path'),
		bodyParser = require('body-parser');

app.use(session({
	secret: '1234567890QWERTY',
	resave: true,
	saveUninitialized: false
}));

var auth = require('./views/pages/auth.js/index.js');


app.set('view engine', 'ejs');

app.get('/auth', function (req, res) {
	res.redirect('https://api.intra.42.fr/oauth/authorize?client_id=c337ac0a90c6518a1e813057afa34e9547c3a47d2b09516a1e41a8cce1979d9a&redirect_uri=http%3A%2F%2F127.0.0.1%2F&response_type=code&state=9A8d82kdl393kddlsa9ejNdiWdnPoloniadsdmdowMassachusettsdkadiepnadneiajdmTegucigalpadndiOd3nfrikipandimnei42Madrid');
});


app.get('/callback', function (req, res) {
	auth.oauth2.authCode.getToken({
		code: req.query.code,
		redirect_uri: 'http://107.0.0.1/callback'
	}, save_token);
	
	function save_token(error, result) {
		if (error) {
			console.log('Access Token Error', error.message);
		} else {
			req.session.token = auth.oauth2.accessToken.create(result);
		} 
		res.redirect('/request');
	}
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/request', function(req, res){

	console.log(req.body.request);
	var token = req.session.token;
	if (token)
	{
		auth.oauth2.api('GET', req.body.request, {
			access_token: token.token.access_token
		}, function (err, data) {
			if (err) {
				console.log("Bad request.")
				res.render(path.join(__dirname + '/request.ejs'), {req_ret: 'Bad request.'});
			} else {
				res.render(path.join(__dirname + '/request.ejs'), {req_ret: JSON.stringify(data)});
			}
		});
	}
});

app.get('/request', function (req, res) {
	if (!req.session.token)
		res.redirect('/');
	else
		res.render(path.join(__dirname + '/request.ejs'), {req_ret: ''});
});

app.get('/', function (req, res) {

	var token = req.session.token;
	if (token && token.expired()) {
		token.refresh(function(err, res) {
			if (err) {
				token = -1;
			} else {
				token = res;
			}
		})
	}
	res.render(path.join(__dirname + '/index.ejs'));
});

app.listen(80);