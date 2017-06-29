/**
 * Created by yyrdl on 2017/6/29.
 */
const newConcurrentLock = function (max_concurrent) {
    return {
        "current_running" : 0,
        "unLock" : function () {
            this.current_running--;
            this._awake();
        },
        "lock" : function (co_next) {
            if(this._busy()){
                this._waitFree(co_next);
            }else {
                this.current_running++;
                co_next();
            }
        },
        "_busy" : function () {
            return this.current_running > max_concurrent - 1;
        },
        "_waitFree" : function (callback) {
            this._reply_pool.push(callback);
            this._awake();
        },
        "_reply_pool" : [],
        "_awake" : function () {
            if (this.current_running < max_concurrent) {
                let func = this._reply_pool.shift();
                if ("function" == typeof func) {
                    func();
                }
            }
        }
    }
}

exports.newLock=newConcurrentLock;