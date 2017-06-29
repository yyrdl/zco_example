/**
 * Created by yyrdl on 2017/6/29.
 */
/**
 * fake router
 * */
function Router() {
    this.handlers={};
}

Router.prototype.post=function (path,handler) {
    this.handlers[path]=handler;
}

Router.prototype.doPost=function (path,req,res) {
    this.handlers[path](req,res);
}

exports.new=function () {
    return new Router();
}