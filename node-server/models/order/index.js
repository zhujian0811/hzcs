/*
 * @Author: zhujian 
 * @Date: 2017-08-12 13:58:04 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-09-11 02:07:29
 */
'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;
var ToySchema = new Schema({
  name: String,
  delayDay: String,
  orderTime: Number,
  deliverTime: Number,
  price: String,
  customer:String,
  payTime: String,
  supplier: String,
});
const orderSchema = new Schema({
  name: String,
  phone: String,
  address: String,
  id: String,
  startDate: Number,
  designer: String,
  manager: String,
  status: String,
  modifyTime: Number,
  price: Number,
  Material: Array,
})

orderSchema.index({ id: 1 });

const Order = mongoose.model('Order', orderSchema);


export default Order
