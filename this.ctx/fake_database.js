/**
 * Created by yyrdl on 2017/6/29.
 *
 * fake database
 */
const log = require("./log");

const userinfos = [{
		"user": "Jack",
		"user_id": "1001"
	}, {
		"user": "Mike",
		"user_id": "10020"
	}
];

const phoneLists = [{
		"user_id": "1001",
		"phone_list": ["13342288888", "028-612654"]
	}, {
		"user_id": "10020",
		"phone_list": ["14342288888", "028-6767554"]
	}
]

exports.queryUserId = function (user, callback) {
	setTimeout(function () {
		if (Math.random() < 0.5) {
			let err = new Error();
            err.name="Database Error";
            err.message="Wrong query!";
			log.error(err.stack, {
				"trace_id": callback.ctx().trace_id
			});
			callback(err);
		} else {
			let user_id = null;
			for (let i = 0; i < userinfos.length; i++) {
				if (userinfos[i].user === user) {
					user_id = userinfos[i].user_id;
					break;
				}
			}
			callback(null, user_id);
		}

	}, 1)
}

exports.queryPhoneList = function (user_id, callback) {
	setTimeout(function () {
		let list = [];
		for (let i = 0; i < phoneLists.length; i++) {
			if (phoneLists[i].user_id == user_id) {
				list = phoneLists[i].phone_list;
				break;
			}
		}
		callback(null, list);
	}, 1)
}
