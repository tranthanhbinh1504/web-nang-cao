var express = require('express');
var router = express.Router();
var Department = require('../models/Department');
var verifiedToken = require('../apis/token');

router.get('/', function(req: any, res: any){
    Department.find( function(err: any, department: any){
		if(err) return res.send(500, 'Error occurred: database error.');
		res.json(department.map((d: any) => {
				return {
					id: d._id,
					name: d.name,	
				}
		}));
	});
});

module.exports = router;