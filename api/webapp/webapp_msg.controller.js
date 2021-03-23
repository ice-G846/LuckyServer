'use strict';
//var fs = require('fs');

var User = require('../../models/User');// 引入用户模型
var Chance = require('../../models/Chance'); // 引入概率模型

exports.getMsgList = function(req, res){
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	var webapp_msg = {};
	User.find({},(err, docs)=>{
	     if(err){
	         res.send('server or db error');
	     }else{
	         if(docs.length==0){
	             res.send('没有数据');
	         }else{
						 return res.status(200).json({webapp_msg:docs});
	         }
	     }
	 });
};

exports.getChance = function(req,res){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
		let chance = 0;
		Chance.find({},(err, docs) => {
			if(!err) {
				chance = docs[0].chance
				return res.status(200).json({webapp_chance:chance});
			}
		})
};
//修改概率
exports.addChance = function(req,res){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
		let change = req.body.change
		
		Chance.update({only: 'only'},{$set:{"chance": change }},err => {
			if(!err){
				console.log('数据库更新成功')
			}
		})
		res.redirect(301,'/webapp');
};

exports.addMsg = function(req, res){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
		User.create({
			"name": req.body.name,
			"telephone": req.body.telephone,
			"theWin": req.body.theWin
		},(err, docs)=>{
			 if(!err){
					console.log("成功",docs)
			 }
		});
};