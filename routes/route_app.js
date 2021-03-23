'use strict';

var path = require('path');
var config = require('../config');
//var webapp_msg = require('../database/webapp_msg.json');
var webapp_chance = require('../database/webapp_chance');

var User = require('../models/User');// 引入用户模型
var Chance = require('../models/Chance');

module.exports = function(app) {
		//设置跨域问题
		app.all('*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
		next();
		});
		
		app.use('/webapp/msg', require('../api/webapp'));
		
		app.use('/webapp',function(req,res,next){
			let webapp_msg = [];
			let chance = 0;
			//查询用户数据
			User.find({},(err, docs)=>{
			     if(err){
			         res.send('server or db error');
			     }else{
			         if(docs.length==0){
			             res.send('无数据');
			         }else{
								 webapp_msg = docs
								 Chance.find({},(err1, docs1)=>{
								 	if(!err1){
										chance = docs1[0].chance
								 		res.render('webapp_index',{webapp_msg:webapp_msg, webapp_chance:chance});
								 	}
								 })
			         }
			     }
			});
			//查询中奖率
		})
		//测试接口
		app.use('/test',function(req,res,next){
			 var user = new User({
			     name:'admin',
			     telephone:'123',
					 theWin: 'ahaha'
			 })
			 User.find({},(err, docs)=>{
			      if(err){
			          res.send('server or db error');
			      }else{
			          if(docs.length==0){
			              res.send('用户名或密码有误');
			          }else{
			              res.send(docs);
			          }
			      }
			  });
		})

    app.use('/*', function (req,res,next) {
        return res.status(200).json({status:'success',data:'Hello World.'});
    });
};


