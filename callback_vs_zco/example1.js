/**
 * Created by yyrdl on 2017/6/29.
 */

const co=require("zco");

/**
 * func1 *** func3 are example async function,simulate database operations or other async operations.
 *
 * func1 至func3 异步函数例子，模拟数据库操作和其他一些异步操作
 *
 * */
const func1=function (data,callback) {
    setTimeout(function () {
       callback(data+1);
    },1)
}


const func2=function (data,callback) {
    setTimeout(function () {
        callback(data+1);
    },1)
}


const func3=function (data,callback) {
    setTimeout(function () {
        callback(data+1);
    },1)
}
/**
 * define the callback-style func
 *
 * 使用回调书写函数
 * */
const callback_func=function (data0,callback) {
    func1(data0,function(data1){
        func2(data1,function(data2){
            func3(data2,function(data3){
                setTimeout(function(){
                    callback(data3);
                },10);
            })
        })
    })
}

callback_func(1,function (result) {
    console.log(result);//4
})
/**
 * rewrite "callback_func" by zco
 *
 * 使用 zco 将 "callback_func 函数重写"
 * */
const zco_func=function (data0) {
    return co(function*(co_next){
        let [data1] = yield func1(data0,co_next);
        let [data2] = yield func2(data1,co_next);
        let [data3] = yield func3(data2,co_next);
        yield setTimeout(co_next,10);
        return data3;
    })
}

zco_func(1)((err,result)=>{
    if(err){
        console.log(err);
    }else{
        console.log(result)
    }
});

//or

co(function *() {
    let [err,result] = yield zco_func(1);
    if(err){
        console.log(err);
    }else{
        console.log(result)
    }
})()