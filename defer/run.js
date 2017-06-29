/**
 * Created by yyrdl on 2017/6/29.
 */

const request=require("request");
const co=require("zco");

// initialize the concurrent lock

const mutex=require("./cocurrent_lock").newLock(5);

const requestGithub = function () {

    return co(function  * (co_next, defer) {

        defer(function  * (inner_next,error) {

            mutex.unLock();//release the lock

        });

        //hold the lock,if busy ,wait until free

        yield mutex.lock(co_next);

        let[err, _, body] = yield request.get('https://github.com/', co_next);
        if (err) {
            throw err;
        }
        if(Math.random()>0.5){
            JSON.parse("{");
        }
        return body;
    });
}


for(let i=0;i<50;i++){
    (function (index) {

        requestGithub()((err,html)=>{
            if(err){
                let msg="*************Error! Index:"+index+"  **********************\n"+err.stack+
                    "\n*********************************************************";
                console.log(msg);

            }else{
                console.log("Index:"+index+" ; page size:"+html.length);
            }
        });

    })(i)
}