/*
 * @Author: zhujian 
 * @Date: 2017-08-12 13:58:22 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-08-26 11:16:39
 */
'use strict';

import user from './user'
import order from './order'

export default app => {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });
	app.use('/user', user);
	app.use('/order', order);

}