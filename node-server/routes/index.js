/*
 * @Author: zhujian 
 * @Date: 2017-08-12 13:58:22 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-09-27 01:01:32
 */
'use strict';

import user from './user'
import order from './order'
import file from './file'

export default app => {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });
	app.use('/user', user);
	app.use('/order', order);
	app.use('/file', file);

}