/**
 * Created by Administrator on 2015/8/19 0019.
 */
/***********************************************
 * 插件名称：常用工具类方法（含表单校验）
 * 作    者：
 * 创建日期：
 ***********************************************
 *
 * 修改人员：
 * 修改说明：
 * 修改日期：
 ***********************************************
 */
define(function (require, exports, module) {

    /* 原生方法扩展 */
    if (!window.console) {
        var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
        window.console = {};
        for (var i = 0; i < names.length; i++) window.console[names[i]] = function () {
        };
    }

    if (!Array.isArray) Array.isArray = function (vArg) {
        return Object.prototype.toString.call(vArg) === "[object Array]";
    };

    if (!Array.prototype.indexOf) Array.prototype.indexOf = function (match, fromIndex) {
        var len = this.length;
        fromIndex |= 0;
        if (fromIndex < 0) {
            fromIndex = Math.max(0, len + fromIndex);
        }
        for (; fromIndex < len; fromIndex++) {
            if (fromIndex in this && this[fromIndex] === match) {
                return fromIndex;
            }
        }
        return -1;
    };

    if (!Array.prototype.lastIndexOf) Array.prototype.lastIndexOf = function (match, fromIndex) {
        var len = source.length >>> 0;
        fromIndex |= 0;
        if (!fromIndex || fromIndex >= len) {
            fromIndex = len - 1;
        }
        if (fromIndex < 0) {
            fromIndex += len;
        }
        for (; fromIndex >= 0; fromIndex--) {
            if (fromIndex in source && source[fromIndex] === match) {
                return fromIndex;
            }
        }
        return -1;
    };

    if (!Array.prototype.every) Array.prototype.every = function (fun, thisp) {
        if (typeof fun != "function") throw new TypeError();
        var t = new Object(this),
            len = t.length >>> 0;
        for (var i = 0; i < len; i++) {
            if (i in t && !fun.call(thisp, t[i], i, t)) return false;
        }
        return true;
    };

    if (!Array.prototype.fiRXer) Array.prototype.fiRXer = function (fun, thisp) {
        if (typeof fun != "function") throw new TypeError();
        var t = new Object(this),
            len = t.length >>> 0,
            res = [];
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];
                if (fun.call(thisp, val, i, t)) res.push(val);
            }
        }
        return res;
    };

    if (!Array.prototype.map) Array.prototype.map = function (fun, thisp) {
        if (typeof fun != "function") throw new TypeError();
        var len = this.length >>> 0,
            res = new Array(len);
        for (var i = 0; i < len; i++) {
            if (i in this) res[i] = fun.call(thisp, this[i], i, this);
        }
        return res;
    };

    if (!Array.prototype.forEach) Array.prototype.forEach = function (fun, thisp) {
        this.map(fun, thisp);
    };

    if (!Array.prototype.some) Array.prototype.some = function (fun, thisp) {
        if (typeof fun != "function") throw new TypeError();
        var t = new Object(this),
            len = t.length >>> 0;
        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(thisp, t[i], i, t)) return true;
        }
        return false;
    };

    if (!Array.prototype.reduce) Array.prototype.reduce = function reduce(accumulator) {
        if (this === null || this === undefined) throw new TypeError("Object is null or undefined");
        var i = 0,
            l = this.length >> 0,
            curr;
        if (typeof accumulator !== "function") throw new TypeError("First argument is not callable");
        if (arguments.length < 2) {
            if (l === 0) throw new TypeError("Array length is 0 and no second argument");
            curr = this[0];
            i = 1;
        } else {
            curr = arguments[1];
        }
        while (i < l) {
            if (i in this) curr = accumulator.call(undefined, curr, this[i], i, this);
            ++i;
        }
        return curr;
    };

    if (!Array.prototype.reduceRight) Array.prototype.reduceRight = function (callbackfn, initialValue) {
        if (this == null) throw new TypeError();
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof callbackfn != "function") throw new TypeError();
        if (len === 0 && arguments.length === 1) throw new TypeError();
        var k = len - 1;
        var accumulator;
        if (arguments.length >= 2) {
            accumulator = arguments[1];
        } else {
            do {
                if (k in this) {
                    accumulator = this[k--];
                    break;
                }
                if (--k < 0) throw new TypeError();
            } while (true);
        }
        while (k >= 0) {
            if (k in t) accumulator = callbackfn.call(undefined, accumulator, t[k], k, t);
            k--;
        }
        return accumulator;
    };

    if (!Object.keys) Object.keys = function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            dontEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            dontEnumsLength = dontEnums.length;
        return function (obj) {
            if (typeof obj !== "object" && typeof obj !== "function" || obj === null) throw new TypeError("Object.keys called on non-object");
            var resuRX = [];
            for (var prop in obj) {
                if (hasOwnProperty.call(obj, prop)) resuRX.push(prop);
            }
            if (hasDontEnumBug) {
                for (var i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) resuRX.push(dontEnums[i]);
                }
            }
            return resuRX;
        };
    }();

    if (!Date.prototype.addYears) Date.prototype.addYears = function (num) {
        this.setFullYear(this.getFullYear() + num);
        return this;
    };

    if (!Date.prototype.addMonths) Date.prototype.addMonths = function (num) {
        var tmpdtm = this.getDate();
        this.setMonth(this.getMonth() + num);
        if (tmpdtm > this.getDate()) this.addDays(-this.getDate());
        return this;
    };

    if (!Date.prototype.addDays) Date.prototype.addDays = function (num) {
        this.setTime(this.getTime() + num * 864e5);
        return this;
    };

    if (!Date.prototype.addHours) Date.prototype.addHours = function (num) {
        this.setHours(this.getHours() + num);
        return this;
    };

    if (!Date.prototype.addMinutes) Date.prototype.addMinutes = function (num) {
        this.setMinutes(this.getMinutes() + num);
        return this;
    };

    if (!Date.prototype.addSeconds) Date.prototype.addSeconds = function (num) {
        this.setSeconds(this.getSeconds() + num);
        return this;
    };

    if (!Date.prototype.format) Date.prototype.format = function (pattern) {
        var o = {
            "M+": this.getMonth() + 1,
            // 月份
            "d+": this.getDate(),
            // 日
            "h+": this.getHours(),
            // 小时
            "m+": this.getMinutes(),
            // 分
            "s+": this.getSeconds(),
            // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3),
            // 季度
            S: this.getMilliseconds()
        };
        if (/(y+)/.test(pattern)) pattern = pattern.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(pattern)) pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return pattern;
    };


    if (!Date.prototype.parse) Date.prototype.parse = function (source) {
        var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+$");
        if (typeof source == "string") {
            if (reg.test(source) || isNaN(Date.parse(source))) {
                var d = source.split(/ |T/),
                    d1 = d.length > 1 ? d[1].split(/[^\d]/) : [0, 0, 0],
                    d0 = d[0].split(/[^\d]/);
                return new Date(d0[0] - 0, d0[1] - 1, d0[2] - 0, d1[0] - 0, d1[1] - 0, d1[2] - 0);
            } else {
                return new Date(source);
            }
        }
        return new Date();
    };

    if (!String.prototype.trim) String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "");
    };

    if (!String.prototype.trimLeft) String.prototype.trimLeft = function () {
        return this.replace(/^\s+$/g, "");
    };

    if (!String.prototype.trimRight) String.prototype.trimRight = function () {
        return this.replace(/\s+$$/g, "");
    };

    if (!window.JSON)(function () {
        window.JSON = {};

        function f(n) {
            return n < 10 ? "0" + n : n;
        }

        if (typeof Date.prototype.toJSON !== "function") {
            Date.prototype.toJSON = function (key) {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
            };
            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
        }
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;

        function quote(string) {
            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        }

        function str(key, holder) {
            var i, k, v, length, mind = gap,
                partial, value = holder[key];
            if (value && typeof value === "object" && typeof value.toJSON === "function") {
                value = value.toJSON(key);
            }
            if (typeof rep === "function") {
                value = rep.call(holder, key, value);
            }
            switch (typeof value) {
                case "string":
                    return quote(value);

                case "number":
                    return isFinite(value) ? String(value) : "null";

                case "boolean":
                case "null":
                    return String(value);

                case "object":
                    if (!value) {
                        return "null";
                    }
                    gap += indent;
                    partial = [];
                    if (Object.prototype.toString.apply(value) === "[object Array]") {
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || "null";
                        }
                        v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                        gap = mind;
                        return v;
                    }
                    if (rep && typeof rep === "object") {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            if (typeof rep[i] === "string") {
                                k = rep[i];
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ": " : ":") + v);
                                }
                            }
                        }
                    } else {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ": " : ":") + v);
                                }
                            }
                        }
                    }
                    v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                    gap = mind;
                    return v;
            }
        }

        if (typeof JSON.stringify !== "function") {
            JSON.stringify = function (value, replacer, space) {
                var i;
                gap = "";
                indent = "";
                if (typeof space === "number") {
                    for (i = 0; i < space; i += 1) {
                        indent += " ";
                    }
                } else if (typeof space === "string") {
                    indent = space;
                }
                rep = replacer;
                if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                    throw new Error("JSON.stringify");
                }
                return str("", {
                    "": value
                });
            };
        }
        if (typeof JSON.parse !== "function") {
            JSON.parse = function (text, reviver) {
                var j;

                function walk(holder, key) {
                    var k, v, value = holder[key];
                    if (value && typeof value === "object") {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }

                text = String(text);
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function (a) {
                        return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                    });
                }
                if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                    j = eval("(" + text + ")");
                    return typeof reviver === "function" ? walk({
                        "": j
                    }, "") : j;
                }
                throw new SyntaxError("JSON.parse");
            };
        }
    })();

    !window.TemplateEngine && function () {
        window.TemplateEngine = {
            guid: function () {
                return "TEGUID__" + (this.guid._counter++).toString(36);
            },
            space: {},
            isUndefined: function (object) {
                return typeof object == "undefined";
            },
            isFunction: function (object) {
                return typeof object == "function";
            },
            trim: function (str) {
                return str.replace(/^\s+|\s+$/g, "");
            },
            ie6: window.VBArray && !window.XMLHttpRequest,
            v8: !!"".trim,
            push: "".trim ? "+=" : ".push",
            split: function (str, separator, limit) {
                if (Object.prototype.toString.call(separator) !== "[object RegExp]") return str.split(separator, limit);
                var output = [],
                    lastLastIndex = 0,
                    flags = (separator.ignoreCase ? "i" : "") + (separator.muRXiline ? "m" : "") + (separator.sticky ? "y" : ""),
                    separator = RegExp(separator.source, flags + "g"),
                    _compliantExecNpcg = /()??/.exec("")[1] === undefined,
                    separator2, match, lastIndex, lastLength;
                str = str + "";
                if (!_compliantExecNpcg) separator2 = RegExp("^" + separator.source + "$(?!\\s)", flags);
                if (limit === undefined || +limit < 0) {
                    limit = Infinity;
                } else {
                    limit = Math.floor(+limit);
                    if (!limit) return [];
                }
                while (match = separator.exec(str)) {
                    lastIndex = match.index + match[0].length;
                    if (lastIndex > lastLastIndex) {
                        output.push(str.slice(lastLastIndex, match.index));
                        if (!_compliantExecNpcg && match.length > 1) {
                            match[0].replace(separator2, function () {
                                for (var i = 1; i < arguments.length - 2; i++) {
                                    if (arguments[i] === undefined) match[i] = undefined;
                                }
                            });
                        }
                        if (match.length > 1 && match.index < str.length) Array.prototype.push.apply(output, match.slice(1));
                        lastLength = match[0].length;
                        lastLastIndex = lastIndex;
                        if (output.length >= limit) break;
                    }
                    if (separator.lastIndex === match.index) separator.lastIndex++;
                }
                if (lastLastIndex === str.length) {
                    if (lastLength || !separator.test("")) output.push("");
                } else {
                    output.push(str.slice(lastLastIndex));
                }
                return output.length > limit ? output.slice(0, limit) : output;
            },
            get: function (tplpath, tplroot, callback) {
                var that = this;
                if (that.isFunction(tplroot)) {
                    callback = tplroot;
                    tplroot = "";
                }
                if (tplroot == "") {
                    tplroot += "/";
                } else {
                    if (tplroot.indexOf("http") === -1) tplroot = "http://" + tplroot;
                    if (tplroot.lastIndexOf("/") !== tplroot.length - 1) tplroot += "/";
                }
                var version = !that.isUndefined(Version) && Version.c ? Version.c : "";
                RX.ajax({
                    url: tplroot + "tpl/" + tplpath + "?" + version,
                    type: "GET",
                    dataType: "html",
                    cache: true,
                    success: function (data) {
                        callback && callback.call(that, data);
                    }
                });
                return this;
            },
            format: function (template, object, paramarray, list, guid) {
                var that = this;
                if (typeof template !== "string") return template;
                object = object || {};
                list = list || {};
                guid = guid || that.guid();
                var tplist = {},
                    tplExp = /<template(.*name=['"]([^'"]+)*)?\b[^>]*>([^<]*(?:(?!<\/template>)<[^<]*)*)<\/template>/gim,
                    tpRXemp;
                while (tpRXemp = tplExp.exec(template)) tpRXemp[2] && (tplist[tpRXemp[2]] = tpRXemp[3]);
                if (tplist["main"]) return that.format(tplist["main"], object, paramarray, tplist, guid);
                var css = js = html = "",
                    jsExp = /<script\b[^>]*>([^<]*(?:(?!<\/script>)<[^<]*)*)<\/script>/gim,
                    jsTemp, cssExp = /<style\b[^>]*>([^<]*(?:(?!<\/style>)<[^<]*)*)<\/style>/gim,
                    cssTemp;
                while (jsTemp = jsExp.exec(template)) js += "\r\n" + jsTemp[1];
                while (cssTemp = cssExp.exec(template)) css += "\r\n" + cssTemp[1];
                html = template.replace(cssExp, "").replace(jsExp, "");
                js = that.trim(js);
                css = that.trim(css);
                html = that.trim(html);
                if (js) {
                    that.space[guid] = {
                        data: object,
                        params: paramarray,
                        template: {
                            guid: guid,
                            list: list,
                            format: function (_tpl, _obj, _paramarray) {
                                return that.format(_tpl, _obj, _paramarray, list, guid);
                            }
                        }
                    };
                    js = js.replace(/\$ROOT/gi, '$("#"+ $TEMPLATE.guid)').replace(/@import\(([^\)]*)\)/gi, "$TEMPLATE.list[$1]").replace(/@format\(/gi, "$TEMPLATE.format(");
                    js = '<script type="text/javascript">' + "(function($DATA,$PARAMS,$TEMPLATE){" + js + "\r\n" + "})(" + 'window.TemplateEngine.space["' + guid + '"].data,' + 'window.TemplateEngine.space["' + guid + '"].params,' + 'window.TemplateEngine.space["' + guid + '"].template' + ");" + 'delete window.TemplateEngine.space["' + guid + '"];' + "</script>";
                }
                if (css) {
                    css = css.replace(/\/\*(.|\n)*?\*\//gi, "").replace(/\r?\n/gi, "").replace(/([a-zA-Z0-9_\-#*\.:\s,\(\)'"<>=]*)(\{)/gi, function (a, b, c) {
                        b = that.trim(b);
                        if (b === "") {
                            return "\r\n#" + guid + c;
                        } else {
                            var _b = b.split(",");
                            for (var i = 0; i < _b.length; i++) {
                                _b[i] = that.trim(_b[i]);
                                _b[i] = "\r\n#" + guid + (_b[i].indexOf(":") === 0 ? "" : " ") + _b[i];
                            }
                            return _b.join(",") + c;
                        }
                    });
                    css = '<style type="text/css">' + css + "\r\n</style>";
                }
                html = html.replace(/\$ROOT/gim, guid);
                var _html = that.split(html, /(<\?[\s\S]*?\?>)/gim);
                for (var i = 0; i < _html.length; i++) {
                    if (!_html[i]) continue;
                    if (new RegExp("<\\?[\\s\\S]*?\\?>", "igm").test(_html[i])) {
                        _html[i] = _html[i].replace(/<\?([\s\S]*?)\?>/gim, "$1");
                        _html[i] = _html[i].replace(/@([a-zA-Z\$_]+)/gim, "$DATA.$1");
                        _html[i] = _html[i].replace(/print\((.*?)\);/gim, "_" + that.push + '(($1)||"");\n');
                        if (_html[i].indexOf("=") === 0) {
                            _html[i] = "_" + that.push + "((" + _html[i].substring(1) + ')==null?"":(' + _html[i].substring(1) + "));\n";
                        }
                    } else {
                        _html[i] = "_" + that.push + '("' + _html[i].replace(/\"/g, '\\"').replace(/\r\n/g, "\\r\\n").replace(/\n/g, "\\n") + '");\n';
                    }
                }
                _html.unshift(that.v8 ? 'var _="";' : "var _=[];");
                if (!that.v8) _html.push('_=_.join("");');
                _html.push("return _;");
                html = _html.join("");
                try {
                    html = new Function("$DATA", "$PARAMS", "$TEMPLATE", html)(object, paramarray, list);
                } catch (e) {
                    if (typeof console !== "undefined") console.error("Template format error: " + html);
                    throw e;
                }
                return css + html + js;
            }
        };
        window.TemplateEngine.guid._counter = 1;
    }();


    /* 常用方法 */


    var Util = Util || {};
    Util.config = {
        jsPath: "/html/webapp/local/js/",
        cssPath: "/html/webapp/local/css/",
        imgPath: "/html/webapp/local/img/",
        tmpPath: "/html/webapp/www/",
        staticPath: '/html/webapp/www/static/'
    };
    Util.isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) ? true : false;
        },
        any: function () {
            return (Util.isMobile.Android() || Util.isMobile.BlackBerry() || Util.isMobile.iOS() || Util.isMobile.Windows());
        }
    };
    Util.substr = function (str, n) {
        if (!str || n <= 0) return "";
        var r = /[^\x00-\xff]/g;
        if (str.replace(r, "mm").length <= n) {
            return str;
        }
        var m = Math.floor(n / 2);
        for (var i = m; i < str.length; i++) {
            if (str.substr(0, i).replace(r, "mm").length >= n) {
                return str.substr(0, i) + "...";
            }
        }
        return str;
    };
    Util.chk = {
        /*
         * 校验是否为空(先删除二边空格再验证)
         */
        isNull: function (str) {
            if (null == str || "" == str.trim()) {
                return true;
            } else {
                return false;
            }
        },
        /*
         * 校验是否全是数字
         */
        isDigit: function (str) {
            var patrn = /^\d+$/;
            return patrn.test(str);
        },
        /*
         * 校验是否是整数
         */
        isInteger: function (str) {
            var patrn = /^([+-]?)(\d+)$/;
            return patrn.test(str);
        },
        /*
         * 校验是否为正整数
         */
        isPlusInteger: function (str) {
            var patrn = /^([+]?)(\d+)$/;
            return patrn.test(str);
        },
        /*
         * 校验是否为负整数
         */
        isMinusInteger: function (str) {
            var patrn = /^-(\d+)$/;
            return patrn.test(str);
        },
        /*
         * 校验手机号码
         */
        isMobile: function (str) {
            var patrn = /^0?(13|15|17|18|14)[0-9]{9}$/;
            return patrn.test(str);
        },
        /*
         * 校验是否仅        var m = Math.floor(n / 2);

         */
        isChinese: function (str) {
            var patrn = /[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
            return patrn.test(str);
        },
        /*
         * 校验仅中文，英文，数字_
         */
        isChineseEnglistNumber: function (str) {
            var patrn = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
            return patrn.test(str);
        },
        /*
         * 校验电话号码
         */
        isPhone: function (str) {
            var patrn = /^(0[\d]{2,3}-)?\d{6,8}(-\d{3,4})?$/;
            return patrn.test(str);
        },
        /*
         * 校验电邮地址
         */
        isEmail: function (str) {
            var patrn = /^(\w)+(\.\w+)*\u0040(\w)+((\.\w{2,3}){1,3})$/;
            return patrn.test(str);
        },
        /*
         * 校验身份证
         */
        isCard: function (str) {
            var patrn = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            return patrn.test(str);
        },
        /*
         * 校验字符串：只能输入6-20个字母、数字、下划线(常用手校验用户名和密码)
         */
        isString6_20: function (str) {
            var patrn = /^(\w){6,20}$/;
            return patrn.test(str);
        },
        /*
         * 校验字符串：是否密码正则表达式验证
         */
        isPwd: function (str) {
            var patrn = /^\w{6,16}$/;
            return patrn.test(str);
        },
        /*
         * 获取字符串长度，中文为2个字符
         */
        getInputLength: function (str) {
            var byteLen = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 255) {
                    byteLen += 2;
                } else {
                    byteLen++;
                }
            }
            return byteLen;
        }

    };

    /*
     * 生成指定范围数值随机数
     * @param under   起始值
     * @param over    结束值
     */
    Util.fRandomBy = function (under, over) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * under + 1);
            case 2:
                return parseInt(Math.random() * (over - under + 1) + under);
            default:
                return 0;
        }
    }

    /*
     * 万元截取
     * @param s   数值
     * @example   divideTenThousand(1550000) 15.5万元
     */
    Util.divideTenThousand = function (s) {
        var result = "0";
        if (typeof s !== "undefined" && s !== "") {
            result = s / 1e4;
        }
        return result;
    }

    // 过滤特殊字符
    Util.specialCharacterFilter = function (s) {
        var pattern = new RegExp("[+s/?%#&=]");
        var rs = "";
        for (var i = 0; i < s.length; i++) {
            rs = rs + s.substr(i, 1).replace(pattern, "");
        }
        return rs;
    }

    // 金额千分符
    Util.formatMoney = function (s, type) {
        if (/[^0-9\.]/.test(s)) return "0";
        if (s == null || s == "") return "0";
        s = s.toString().replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s)) s = s.replace(re, "$1,$2");
        s = s.replace(/,(\d\d)$/, ".$1");
        if (type == 0) {
            // 不带小数位(默认是有小数位)
            var a = s.split(".");
            if (a[1] == "00") {
                s = a[0];
            }
        }
        return s;
    }

    // 格式化金钱
    /*
     * @param s
     */
    Util.fmoney = function (s, n, prefix) {
        n = n >= 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1],
            t = "";
        if (r) {
            r = "." + r;
        } else {
            r = "";
        }
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
        }
        return ((prefix != undefined ? prefix : "￥") + t.split("").reverse().join("") + r).replace("-,", "-");
    }

    // 根据身份证号获取生日
    Util.getAgeByIdCardNo = function (idCardNo) {
        if (idCardNo != undefined && ChkUtil.isCard(idCardNo)) {
            if (idCardNo.length == 15) {
                // 15位身份证
                var date1 = new Date();
                // 取得当前日期
                var year1 = date1.getFullYear();
                // 取得当前年份
                var month1 = date1.getMonth();
                // 取得当前月份
                if (month1 > parseInt(idCardNo.substr(8, 2))) // 判断当前月分与编码中的月份大小
                    return year1 - ("19" + idCardNo.substr(6, 2));
                else return year1 - ("19" + idCardNo.substr(6, 2)) - 1;
            } else if (idCardNo.length == 18) {
                // 18位身份证
                var date1 = new Date();
                // 取得当前日期
                var year1 = date1.getFullYear();
                // 取得当前年份
                var month1 = date1.getMonth();
                // 取得当前月份
                if (month1 > parseInt(idCardNo.substr(10, 2))) // 判断当前月分与编码中的月份大小
                    return year1 - idCardNo.substr(6, 4);
                else return year1 - idCardNo.substr(6, 4) - 1;
            }
        } else {
            return "";
        }
    }

    // 去掉undefined
    Util.removeUndefined = function (s) {
        if (typeof s == "undefined") {
            s = "";
        }
        return s;
    }

    // 把undefined或空字符串替换为--
    Util.removeUndefinedToMinus = function (s) {
        if (typeof s == "undefined" || s == "") {
            return "--";
        } else {
            return s;
        }
    }

    //未登录者返回到登录页面
    Util.mErrorTips = function (message) {
        if (message == "NEED_LOGIN") {
            alert("对不起，您还未登录！");
            window.location.href = "/pages/login.html";
        } else {
            alert(message);
        }
    }

    //去空格
    Util.trim = function (str) {
        return str.replace(/\s/g, "");
    }

    // 页面显示时，字符串转换异常信息
    Util.excepStrFilter = function (input) {
        if (input == null) {
            return "";
        } else if (typeof input === undefined) {
            return "";
        } else if (input != null) {
            return input;
        } else if (isNaN(input)) {
            return "";
        } else {
            return input;
        }
    }

    // 页面显示时，数字转换异常信息
    Util.excepIntFilter = function (input) {
        if (input == null) {
            return 0;
        } else if (typeof input === undefined) {
            return 0;
        } else if (isNaN(input)) {
            return 0;
        } else {
            return input;
        }
    }

    //字符截取中英文都能用
    Util.strLimit = function (str, len) {
        var newLength = 0;
        var newStr = "";
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = "";
        var strLength = str.replace(chineseRegex, "**").length;
        for (var i = 0; i < strLength; i++) {
            singleChar = str.charAt(i).toString();
            if (singleChar.match(chineseRegex) != null) {
                newLength += 2;
            } else {
                newLength++;
            }
            if (newLength > len) {
                break;
            }
            newStr += singleChar;
        }
        if (strLength > len) {
            newStr += "...";
        }
        return newStr;
    }

    /**
     * 截取字符串(支持中英文混合),中文占两个字符
     * @param str
     * @param n
     * @returns
     */
    Util.subChinese = function (str, n) {
        if (!str || n <= 0) return "";
        var r = /[^\x00-\xff]/g;
        if (str.replace(r, "mm").length <= n) {
            return str;
        }
        var m = Math.floor(n / 2);
        for (var i = m; i < str.length; i++) {
            if (str.substr(0, i).replace(r, "mm").length >= n) {
                return str.substr(0, i) + "...";
            }
        }
        return str;
    }


    /*跨框架数据共享接口*/
    Util.share = {
        /**
         * 跨框架数据共享接口
         * @param {String} 存储的数据名
         * @param {Any} 将要存储的任意数据(无此项则返回被查询的数据)
         */
        data: function (name, value) {
            var top = window.top,
                cache = top["_CACHE"] || {};
            top["_CACHE"] = cache;
            return value ? cache[name] = value : cache[name];
        },
        /**
         * 数据共享删除接口
         * @param {String} 删除的数据名
         */
        removeData: function (name) {
            var cache = window.top["_CACHE"];
            if (cache && cache[name]) delete cache[name];
        }
    };

    /*
     * 通用打分组件
     * callBack打分后执行的回调
     * this.Index:获取当前选中值
     */
    Util.pRate = function (box, callBack) {
        this.Index = null;
        this.title = "";
        var B = $("#" + box),
            rate = B.children("i"),
            w = rate.width(),
            n = rate.length,
            me = this;
        for (var i = 0; i < n; i++) {
            rate.eq(i).css({
                'width': w * (i + 1),
                'z-index': n - i
            });
        }
        rate.hover(function () {
            var S = B.children("i.active");
            $(this).addClass("hover").siblings().removeClass("hover");
            if ($(this).index() > S.index()) {
                S.addClass("hover");
            }
        }, function () {
            rate.removeClass("hover");
        });
        rate.click(function () {
            rate.removeClass("active hover");
            $(this).addClass("active");
            me.Index = $(this).index() + 1;
            me.title = $(this).attr("title");
            if (callBack) {
                callBack();
            }
        })
    };

    //日期格式化
    Util.dateFormat = function (date) {
        if (date) {
            return (new Date(date)).Format("yyyy-MM-dd");
        } else {
            return "";
        }
    };

    /*自定义request*/
    Util.request = function(paras) {
        var url = location.href + "#";
        url = url.substring(0, url.indexOf("#"));
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {};
        for (i = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
        var returnValue = paraObj[paras.toLowerCase()];
        if (typeof returnValue == "undefined") return ""; else return returnValue;
    };

    Util.getUrlParam = function(name) {
        //构造一个含有目标参数的正则表达式对象
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //匹配目标参数
        var r = window.location.search.substr(1).match(reg);
        //返回参数值
        if (r != null) return unescape(r[2]);
        return null;
    };

    /*公用loading*/
    Util.showLoading = function(vobj, vstr) {
        if (vstr == undefined) vstr = "数据加载中...";
        $(vobj).html('<div class="loading"><img src="/maserati-web/src/app/images/loading.gif"><br>' + vstr + "</div>");
    };

    module.exports = Util;

});