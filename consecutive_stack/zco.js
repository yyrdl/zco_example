/**
 * Created by yyrdl on 2017/6/29.
 *
 * just run this file ,and see the stack
 *
 */
const co=require("zco");

const async_func=function(){
    return co(function*(co_next){
        yield setTimeout(co_next,10);
        JSON.parse("{");
    });
}
const middle_call_path=function(){
    return async_func()
}
middle_call_path()((err)=>{
    console.log(err.stack);
});