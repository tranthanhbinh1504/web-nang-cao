var User = require('../models/User');
const jwt = require('jsonwebtoken');
const checkExpired = require('jwt-check-expiration')

// TO DO .env
var TOKEN_SECRET = '1d07e5a51f1a89c937d630c1eed3228916f8f71424452db129d6a0d3d1bc995ff84cbc958c51968f3799608101b30ae9adc1690565126040de22bc5d043032d3';

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) return res.sendStatus(401)

	jwt.verify(token, TOKEN_SECRET, (err, user) => {
		
		if (checkExpired.isJwtExpired(token)) {
			// return res.send("/login");
			return res.json({success: false, msg: "Token hết hạn. Logout!"});
		}

		if (err) {
			console.log(err)	
			return res.sendStatus(403)
		}
		
		User.findOne({email: user.username}, (e, us) => {
			if (e || !us) {
				return res.json({success: false, msg: "Thông tin user không hợp lệ!"})
			}
			req.user = us
			next()
		})
		
	})

}
module.exports = authenticateToken