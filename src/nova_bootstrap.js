'use strict';
(function () {
    /******************** Nova **********************/
    var Nova = function Nova(prototype) {
        var Base = Nova.Utils.mix({}, Nova.Base);
        Nova.Utils.chainObject(prototype, Base);

        var opts = { prototype: prototype };

        // 处理继承
        if (prototype['extends']) {
            var tmpEle = document.createElement(prototype['extends']);
            if (tmpEle.toString() == '[object HTMLUnknownElement]') {
                console.warn('extends to HTMLUnknownElement');
            }
            Nova.Utils.chainObject(Base, tmpEle.constructor.prototype);
            opts['extends'] = prototype['extends'];
        } else {
            Nova.Utils.chainObject(Base, HTMLElement.prototype);
        }

        // 初始化stylesheet
        Nova.Style.init(prototype);

        var registered = document.registerElement(prototype.is, opts);

        return getConstructor(registered);
    };

    Nova.Components = {};
    Nova.Loader = {};

    /******************** NovaExports **********************/
    var NovaExports = function NovaExports(prototype) {
        Nova.Utils.mix(prototype, NovaExports.exports);
        var ret = Nova(prototype);
        NovaExports.exports = {};
        return ret;
    };
    NovaExports.exports = {};

    /******************** Helpers **********************/
    function getConstructor(realConstructor) {
        var constructor = function constructor(initData) {
            initData && Nova.Initial.set(initData);
            return new realConstructor();
        };
        constructor.realConstructor = realConstructor;
        return constructor;
    }

    window.Nova = Nova;
    window.NovaExports = NovaExports;
})();