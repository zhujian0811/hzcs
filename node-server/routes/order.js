'use strict';

import express from 'express'
import AddOrder from '../controller/order/add'
import getOrder from '../controller/order/get'
import editOrder from '../controller/order/edit'
import deleteOrder from '../controller/order/delete'
const router = express.Router();
router.post('/add', AddOrder.add);
router.post('/get', getOrder.get);
router.post('/edit', editOrder.edit);
router.post('/delete', deleteOrder.delete);
export default router