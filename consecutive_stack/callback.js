/**
 * Created by yyrdl on 2017/6/29.
 *
 * just run this file ,and see the stack
 */
const async_func=function(callback){
    setTimeout(function(){
        try{
            JSON.parse("{");
        }catch(e){
            callback(e);
        }
    },10)
}
const middle_call_path=function(cb){
    return async_func(cb)
}

middle_call_path((err)=>{
    console.log(err.stack);
});