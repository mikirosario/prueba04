var oauth2 = require('simple-oauth2');
({
	clientID: 'c337ac0a90c6518a1e813057afa34e9547c3a47d2b09516a1e41a8cce1979d9a',
	clientSecret: '1d559acf6e0c2772e174b86cb4a8f81bfe017de536dd9f8721f3ab95c4a79ab4',
	site: 'https://api.intra.42.fr',
	authorizationPath: 'https://api.intra.42.fr/oauth',
	tokenPath: 'https://api.intra.42.fr/oauth/token'
  })
  var tokenConfig = {};
  
  exports.oauth2 = oauth2;