'use strict';

import express from 'express'
import AddUser from '../controller/user/add'
import GetUser from '../controller/user/get'
import EditUser from '../controller/user/edit'
import Delete from '../controller/user/delete'
console.log(AddUser.addUser)
console.log(EditUser.editUser)
const router = express.Router();
router.post('/addUser', AddUser.addUser);
router.post('/getUser', GetUser.getUser);
router.post('/editUser', EditUser.editUser);
router.post('/delete', Delete.delete);
export default router