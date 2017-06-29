/**
 * Created by yyrdl on 2017/6/29.
 */
const Router = require("./fake_router");
const router = Router.new();
const co =require("zco");
const log=require("./log");
const apis=require("./apis")




router.post("./api",function (req,res) {
    co.brief(function*(){

        // Initialize trace_id from req.headers, and set it to this.ctx

        this.ctx.trace_id = req.headers.trace_id;

        //simulate the operations in production.
        let user_id = yield apis.findUserIdByUser(req.body.user);
        let phone_list = yield apis.findPhoneListByUserId(user_id);
        return phone_list;
    })(function(err,list){
        if(err){

            //get trace_id from this.ctx ,and add it to log
            log.error(err.stack,{"trace_id":this.ctx.trace_id});

            res.json({"success":false,"msg":"internal error!"});
        }else{

            //get trace_id from this.ctx ,and add it to log
            log.info("request success",{"trace_id":this.ctx.trace_id});

            res.json({"success":true,"phone_list":list});
        }
    })
})

/**
 * simulate api request
 * */

// this request will make error ,because body is undefined
router.doPost("./api",{"headers":{"trace_id":"123"}},{"json":function (json) {
    console.log(JSON.stringify(json))
}})

router.doPost("./api",{"headers":{"trace_id":"321"},"body":{"user":"Jack"}},{"json":function (json) {
   console.log(JSON.stringify(json))
}})