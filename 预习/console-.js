/**
 * Created by i on 2015/3/24.
 */
(function () {
    if (Error.captureStackTrace && Object.defineProperty) {

        //var global = global;

        Object.defineProperty(global, '__STACK__', {
            get: function () {
                var old = Error.prepareStackTrace;
                Error.prepareStackTrace = function (error, stack) {
                    return stack;
                };

                var err = new Error();
                Error.captureStackTrace(err, arguments.callee);
                Error.prepareStackTrace = old;

                return err.stack;
            }
        });

        Object.defineProperty(global, '__LINE__', {
            get: function () {
                return __STACK__[1].getLineNumber();
            }
        });

        Object.defineProperty(global, '__FILE__', {
            get: function () {
                return __STACK__[1].getFileName();
            }
        });
    }
})();

var test = function () {
    console.log(__LINE__,__FILE__);
};

test();