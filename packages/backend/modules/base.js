const _ = require("underscore");
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const UserModel = require('../models/user');
const { toLowerCase } = require("../utils");

module.exports = {
	name: "base.module",

	extend: function(child) {
		return _.extend({}, this, child);
	},

	authenticateToken: function(req, res, next) {
		// Gather the jwt access token from the request header
		const authHeader = req.headers['authorization']
		const token = authHeader && authHeader.split(' ')[1]
		if (token == null) return res.sendStatus(401) //if there is no token

		jwt.verify(token, config.secret, (err, payload) => {
			if(err) {
				return res.sendStatus(403)
			}

			let address = payload.data;
			if(req.body.address?.toLowerCase() != address.toLowerCase()) {
				return res.sendStatus(401)
			}
			UserModel.findOne({address: toLowerCase(address)})
				.then(user => {
					if(!user) return res.sendStatus(404);
					req.user = user
					next()
				});
		})
	},
}
