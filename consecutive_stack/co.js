/**
 * Created by yyrdl on 2017/6/29.
 * 
 * just run this file ,and see the stack
 */

const co=require("co");
const delay=function (ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve,ms);
    })
}


const async_func=function(){
    return co(function*(){
        yield delay(10);
        JSON.parse("{");
    });
}

const middle_call_path=function(){
    return async_func()
}
middle_call_path().catch((err)=>{
    console.log(err.stack);
});