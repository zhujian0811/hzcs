/*
 * @Author: zhujian 
 * @Date: 2017-08-13 01:11:24 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-08-14 09:49:03
 */

import User from '../../models/user/User'

class AddUser {
	constructor() {

	}
	async addUser(req, res, next) {
		const name = req.body.name;
		if (!name) {
			res.send({
				status: 0,
				type: 'ERROR_PARAMS',
				message: '名字不可为空'
			})
			return
		}
		try {
			const getUser = await User.find({ name: req.body.name })
			if (getUser.length) {
				res.send({
					status: 0,
					message: '不可重复添加同一成员',
				})
				return;
			}
		} catch (err) {
			console.log('成员不在列表中', err);

		}
		try {
			const newUser = _.clone(req.body)
			newUser.uId =moment().valueOf();
			newUser.modifyTime = moment().valueOf();
			await User.create(newUser)
			res.send({
				status: 1,
				message: '注册管理员成功',
			})
		} catch (err) {
			console.log('获取备注数据失败', err);
			res.send({
				status: 0,
				type: 'ERROR_GET_DATA',
				message: '获取备注数据失败'
			})
		}
	}
}

export default new AddUser()