/**
 * Created by yyrdl on 2017/6/29.
 */
const log = require("./log");
const co = require("zco");
const db = require("./fake_database");

exports.findUserIdByUser = function (user) {
	return co(function  * (co_next) {
		let[err, user_id] = yield db.queryUserId(user, co_next);
		if (err) {
			log.error(err.message, {
				"trace_id": this.ctx.trace_id,
				"step": "find user id"
			});
			throw err;
		}
        log.info("find user success",{"trace_id":this.ctx.trace_id});
		return user_id
	});
}

exports.findPhoneListByUserId = function (user_id) {
	return co(function  * (co_next) {
		let[err, list] = yield db.queryPhoneList(user_id, co_next);
		if (err) {
			log.error(err.message, {
				"trace_id": this.ctx.trace_id,
				"step": "find phone_list"
			});
			throw err;
		}
        log.info("find phone_list success",{"trace_id":this.ctx.trace_id});
		return list;
	});
}
