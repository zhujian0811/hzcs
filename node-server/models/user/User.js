/*
 * @Author: zhujian 
 * @Date: 2017-08-12 13:58:04 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-09-11 02:07:33
 */
'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	uId: String,
	modifyTime: Number,
	phone: String,
	type: String,
})

userSchema.index({ id: 1 });

const User = mongoose.model('User', userSchema);


export default User
