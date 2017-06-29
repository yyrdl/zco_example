/**
 * Created by yyrdl on 2017/6/29.
 */

var slice=[].slice;

module.exports={
    "info":function () {
       var args=slice.call(arguments);
       var msg=args[0];
       var obj={};
       for(let i=1;i<args.length;i++){
           let item=args[i];
           for(var p in item){
               obj[p]=item[p];
           }
       }
       obj.msg=msg;
       console.log(JSON.stringify(obj));
    },
    "error":function () {
        var args=slice.call(arguments);
        this.info.apply(this,args);
    }
}