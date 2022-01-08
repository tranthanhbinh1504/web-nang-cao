var express = require('express');
var router = express.Router();
const authorizeUser = require('../models/User')
var bcrypt = require('bcrypt');
const passport = require('passport');

// const saltRounds = 10;


// ===auth feature start===
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

// TO DO .env
var TOKEN_SECRET = '1d07e5a51f1a89c937d630c1eed3228916f8f71424452db129d6a0d3d1bc995ff84cbc958c51968f3799608101b30ae9adc1690565126040de22bc5d043032d3';

function generateAccessToken(username: any) {
  return jwt.sign(
	  				username, 
					TOKEN_SECRET, 
					{ expiresIn: '1800s' }
				);
}
// ===auth feature end===

router.post('/', function(req: any, res: any) {
	var userName = req.body.username;
	var password = req.body.password;
	authorizeUser.findOne({ userName: userName}, (error: any, user: any) => {
		if(error || !user) {
			res.status(404)
			return res.json({message: "Tài khoản không tồn tại"})
		}
		bcrypt.compare(password, user.password).then( function(result: any) {
			if(result){
				const token = generateAccessToken({ username: user.userName });
				return res.json({token:token,user:user,message:'Đăng nhập thành công'});
			}
			res.status(404)
			return res.json({message: "Sai tài khoản hoặc mật khẩu"})
		});
	});
})

// login for student
router.get('/auth/google' ,
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
)
// function(req: any, res: any, next: any) {
// 	res.json({abc: 'abc'})
// } 
); 

router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/api/login/home',
        failureRedirect: '/api/login',
        failureFlash: true
}));

/* GET home page. */
router.get('/home', function(req: any, res: any, next: any) {
	res.render('index', { title: 'Home' });
});
  
/* GET home page. */
router.get('/', function(req: any, res: any, next: any) {
	res.render("login", { title: "Login" });
});

module.exports = router;