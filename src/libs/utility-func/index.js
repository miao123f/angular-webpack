function traverse (o,func) {//遍历对象
    for (var i in o) {
        
        if (!!o[i] && typeof(o[i])=="object") {
            //going on step down in the object tree!!
            traverse(o[i],func);
        }else{
            func.apply(o,[i,o[i]]);
        }
    }
}

module.exports = {

getUrlVar:function (name) {

        var url = document.URL;
        var oRegex = new RegExp('[\?&]' + name + '=([^&]+)', 'i');

        var oMatch = oRegex.exec(url);
        if (oMatch && oMatch.length > 1)
            return oMatch[1];
        else
            return '';
    },

    changeTwoDecimal:function (x) {
        var f_x = parseFloat(x);
        if (isNaN(f_x)) {
            return false;
        }
        var f_x = Math.round(x * 100) / 100;
        return f_x;
    },

    forceTwoDecimal:function (x) {
        var f_x = parseFloat(x);
        if (isNaN(f_x)) {
            return false;
        }
        var f_x = Math.round(x * 100) / 100;
        var s_x = f_x.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
        }
        while (s_x.length <= pos_decimal + 2) {
            s_x += '0';
        }
        return s_x;
    },

    isWeiXinUA:function () {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == 'micromessenger';
    },

    isIOS:function () {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/iphone/i) == 'iphone';
    },

    isIosApp:function(){
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/KingWing\/iOS/i) == 'kingwing/ios';
    },

    isAndroid:function () {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/android/i) == 'android';
    },
    isAndroidApp:function(){
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/KingWing\/Android/i) == 'kingwing/android';
    },

    isTester:function () {
        return window.location.href.indexOf("apptest.kingwingaviation.com")!=-1;
    },

    replaceUrlParam:function(url,paramsObject, add){
        var originalUrl = url;
        var params = Object.keys(paramsObject);
        var newUrl = originalUrl;
        params.forEach(function(param){
            // Author: iratherscribble@gitHub
            var re = new RegExp("[\\?&]" + param + "=([^&#]*)", "i"), match = re.exec(newUrl), delimiter, newString;
            // =============
            // Author: slaveofcode@gitHub
            if (match === null && add) {
                // append new param
                var hasQuestionMark = /\?/.test(url); 
                delimiter = hasQuestionMark ? "&" : "?";
                newUrl = newUrl + delimiter + param + "=" + paramsObject[param];
            } else if(match){
                delimiter = match[0].charAt(0);
                newUrl = newUrl.replace(re, delimiter + param + "=" + paramsObject[param]);
            } else {
                console.error("Parameter", "'" + param + "'", "Does not exist in url: ", originalUrl); 
                console.error("To add these parameters to this url please change your method call to: replaceParam([Object], [Boolean=true])")
            }
        })

        return newUrl;
    },

    checkTelPhone:function(phoneNum){
        var isTel = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
        return isTel.test(phoneNum);
    },

    checkMobPhone:function(phoneNum){
        var isMob = /^((\+?86)|(\(\+86\)))?(1[2|3|4|5|6|7|8|9][0-9]\d{8})$/;
        return isMob.test(phoneNum);
    },

    escapeHTML1:function(s, forAttribute) {

        var ESC_MAP = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#39;"
        };

        return s.replace(forAttribute ? /[&<>'"]/g : /[&<>]/g, function(c) {
            return ESC_MAP[c];
        });
    },

    unescapeHtml1:function(s, forAttribute) {

        var ESC_MAP = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": "\"",
            "&#39;": "'"
        };

        return s.replace(forAttribute ? /(&amp;|&lt;|&gt;|&quot;|&#39;)/g : /(&amp;|&lt;|&gt;)/g, function(c) {
            return ESC_MAP[c];
        });
    },


   escapeJSON:function(s) {
        var s = this.replaceLineBreak(s);
        var s = s.replace(/\f|\t|\u[0-9A-Fa-f]{4}/g,"").replace(/\\/g,"");
        var ESC_MAP = {
            "\"": "&quot;",
            "'": "&#39;"
        };

        return s.replace(/['"]/g, function(c) {
            return ESC_MAP[c];
        });
    },

    unescapeJSON:function(s) {
         s = this.restoreLineBreak(s);
        var ESC_MAP = {
            "&quot;": "\"",
            "&#39;": "'"
        };

        return s.replace(/(&quot;|&#39;)/g, function(c) {
            return ESC_MAP[c];
        });
    },

    escapeJSONData:function  (data){
        traverse(data,function(key,value){
            if(typeof(value)!="string"){return;}
            this[key] = zdyl.escapeJSON(value);
        });
        return data;
    },

    unescapeJSONData:function  (data){
        traverse(data,function(key,value){
            if(typeof(value)!="string"){return;}
            this[key] = zdyl.unescapeJSON(value);
        });
        return data;
    },


    escapeHtml:function(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    },

    // UNSAFE with unsafe strings; only use on previously-escaped ones!
    unescapeHtml:function(escapedStr) {
        var div = document.createElement('div');
        div.innerHTML = escapedStr;
        var child = div.childNodes[0];
        return child ? child.nodeValue : '';
    },

    clearLineBreak:function(str){//清除html的换行符
        str = str.replace(/\r\n|\r|\n/g,"");
        return str;
    },

    replaceLineBreak:function(str){//入库前 textarea 换行符替换
        str = str.replace(/\r\n|\r|\n/g,"<br />");
        return str;
    },

    restoreLineBreak:function(str){//编辑输出前 textarea 换行符替换
        str = str.replace(/<br\s?\/?>/g,"\n");
        return str;
    }

};

(function () {
    window.zdyl = window.zdyl || {};
    Date.prototype.format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    Math.add = function (v1, v2) {
        ///<summary>精确计算加法。语法：Math.add(v1, v2)</summary>
        ///<param name="v1" type="number">操作数。</param>
        ///<param name="v2" type="number">操作数。</param>
        ///<returns type="number">计算结果。</returns>
        var r1, r2, m;
        try {
            r1 = v1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = v2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));

        return (v1 * m + v2 * m) / m;
    }


    Number.prototype.add = function (v) {
        ///<summary>精确计算加法。语法：number1.add(v)</summary>
        ///<param name="v" type="number">操作数。</param>
        ///<returns type="number">计算结果。</returns>
        return Math.add(v, this);
    }


    Math.sub = function (v1, v2) {
        ///<summary>精确计算减法。语法：Math.sub(v1, v2)</summary>
        ///<param name="v1" type="number">操作数。</param>
        ///<param name="v2" type="number">操作数。</param>
        ///<returns type="number">计算结果。</returns>
        return Math.add(v1, -v2);
    }


    Number.prototype.sub = function (v) {
        ///<summary>精确计算减法。语法：number1.sub(v)</summary>
        ///<param name="v" type="number">操作数。</param>
        ///<returns type="number">计算结果。</returns>
        return Math.sub(this, v);
    }


    Math.mul = function (v1, v2) {
        ///<summary>精确计算乘法。语法：Math.mul(v1, v2)</summary>
        ///<param name="v1" type="number">操作数。</param>
        ///<param name="v2" type="number">操作数。</param>
        ///<returns type="number">计算结果。</returns>
        var m = 0;
        var s1 = v1.toString();
        var s2 = v2.toString();
        try {
            m += s1.split(".")[1].length;
        }
        catch (e) {
        }
        try {
            m += s2.split(".")[1].length;
        }
        catch (e) {
        }

        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    }


    Number.prototype.mul = function (v) {
        ///<summary>精确计算乘法。语法：number1.mul(v)</summary>
        ///<param name="v" type="number">操作数。</param>
        ///<returns type="number">计算结果。</returns>
        return Math.mul(v, this);
    }


    Math.div = function (v1, v2) {
        ///<summary>精确计算除法。语法：Math.div(v1, v2)</summary>
        ///<param name="v1" type="number">操作数。</param>
        ///<param name="v2" type="number">操作数。</param>
        ///<returns type="number">计算结果。</returns>
        var t1 = 0;
        var t2 = 0;
        var r1, r2;
        try {
            t1 = v1.toString().split(".")[1].length;
        }
        catch (e) {
        }
        try {
            t2 = v2.toString().split(".")[1].length;
        }
        catch (e) {
        }

        with (Math) {
            r1 = Number(v1.toString().replace(".", ""));
            r2 = Number(v2.toString().replace(".", ""));
            return (r1 / r2) * pow(10, t2 - t1);
        }
    }


    Number.prototype.div = function (v) {
        ///<summary>精确计算除法。语法：number1.div(v)</summary>
        ///<param name="v" type="number">操作数。</param>
        ///<returns type="number">计算结果。</returns>
        return Math.div(this, v);
    }


    //ua test
    // if(navigator.userAgent){
    //     $("body").append('<span id="debug" style="position:fixed;left:0;top:0;color:green;z-index:10000;width:100%;word-break: break-all;">'+navigator.userAgent+'</span>');
    // }

    window.anAppApi = window.jinhuiJavascriptApi||{};

    //安卓登录
    window.onLoginSuccess = zdyl.onLoginSuccess = 
    window.onWechatLoginSuccess = zdyl.onWechatLoginSuccess = 
    window.onQQLoginSuccess = zdyl.onQQLoginSuccess = 
    window.onWeiboLoginSuccess = zdyl.onWeiboLoginSuccess = 
    window.onRegTelSuccess = zdyl.onRegTelSuccess = 
    window.onFindPassSuccess = zdyl.onFindPassSuccess = function(returnStr){
        var userInfo = JSON.parse(returnStr);
        sessionStorage.userInfo = String(userInfo.cbData);
        if(sessionStorage.loginNextUrl){
            var url = "/redirect/AndroidEntrance.aspx?token="+userInfo.Token+"&sign="+userInfo.Sign+"&returnUrl="+encodeURIComponent(sessionStorage.loginNextUrl);
            window.location.href = url;
        }
        delete sessionStorage.loginNextUrl;
    }

    //安卓版登出
    window.onLogoutSuccess = zdyl.onLogoutSuccess = function(){
      delete sessionStorage.userInfo;

      window.location.href = sessionStorage.logoutNextUrl || "/product/index.aspx";
      delete sessionStorage.logoutNextUrl;
    }

    //安卓版关闭登录界面
    window.onCloseLogin = zdyl.onCloseLogin = function(){
        zdyl.isAndroidLoginOpened = false;
    }

})();

