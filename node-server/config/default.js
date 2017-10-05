'use strict';

module.exports = {
	port: 8080,
	url: 'mongodb://127.0.0.1:27010/hczs',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
		    secure:   false,
		    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	}
}