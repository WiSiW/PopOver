/**
 * Created by wsw on 2018/11/22.
 * 调用PopOver.open(data,sureFn,canFn)
 * @param data包含
 *              insId,
 *              popStyle:{
 *                  mainWidth: int 弹出框宽度
 *                  mainHeight: int 弹出框高度
 *                  mainBackColor: string 主体背景颜色 默认：#eee
 *                  mainHeaderColor: string 页眉颜色
 *                  mainBodyColor: string 主体颜色
 *                  mainFooterColor: string 页脚颜色
 *                  needBack: boolean 是否需要背景颜色,
 *                  backColor: string 背景颜色 默认#000
 *              },
 *              header: string 页眉内容
 *              body: string 主体内容,
 *              sureFn = function (data) {}, // 点击确定触发的事件
 *              canFn = function (data) {} // 点击取消的事件
 * @param sureFn 点击【确定方法】
 * @param canFn 点击取消方法
 */
var PopOver = (function () {
    var that;

    var obj = function () {
        that = this;
    };

    obj.prototype = {
        open: function (insId,data,sureFn,canFn) {
            _generateStyle(data.popStyle);
            _createHtml(insId,data);
            _addPopEvents(sureFn,canFn);
        }
    };

    function _createHtml (insId,data) {
        var pop = document.getElementById(insId);
        var popBack = document.createElement("div");
        popBack.className = "pop-back";
        pop.appendChild(popBack);
        var popMain = document.createElement("div");
        popMain.className = "pop-main";
        var popHeader = document.createElement("div");
        popHeader.className = "pop-header";
        popHeader.innerText = data.header;
        popMain.appendChild(popHeader);
        var popBody = document.createElement("div");
        popBody.className = "pop-body";
        popBody.innerText = data.body;
        popMain.appendChild(popBody);
        var popFooter = document.createElement("div");
        popFooter.className = "pop-footer";
        popMain.appendChild(popFooter);
        var popConfirm = document.createElement("button");
        popConfirm.className = "pop-confirm";
        popConfirm.innerText = "确定";
        var popCancel = document.createElement("button");
        popCancel.className = "pop-cancel";
        popCancel.innerText = "取消";
        popFooter.appendChild(popCancel);
        popFooter.appendChild(popConfirm);

        pop.appendChild(popMain);
    }

    function _addPopEvents (sureFn,canFn){
        var popBack = document.getElementsByClassName("pop-back")[0];
        var popConfirm = document.getElementsByClassName("pop-confirm")[0];
        var popCancel = document.getElementsByClassName("pop-cancel")[0];
        var popOver = document.getElementById("pop-over");

        popBack.onclick = function () {
            popOver.innerHTML = "";
        };
        popConfirm.onclick = function () {
            popOver.innerHTML = "";
            sureFn(true);
        };
        popCancel.onclick = function () {
            popOver.innerHTML = "";
            canFn(false)
        };
    }

    function _generateStyle (data) {
        var allBackColor = data.needBack?"background-color:#000;":"",
            backColor = "background-color:#eee;",
            headerColor = "",
            bodyColor = "",
            footerColor = "";
        if(data.mainBackColor && data.mainBackColor != null && data.mainBackColor != "")backColor = "background-color:" + data.mainBackColor+";";
        if(data.mainHeaderColor && data.mainHeaderColor != null && data.mainHeaderColor != "")headerColor = "background-color:" + data.mainHeaderColor+";";
        if(data.mainBodyColor && data.mainBodyColor != null && data.mainBodyColor != "")bodyColor = "background-color:" + data.mainBodyColor+";";
        if(data.mainFooterColor && data.mainFooterColor != null && data.mainFooterColor != "")footerColor = "background-color:" + data.mainFooterColor+";";

        var str_css = "#pop-over *{margin:0;border:0;padding:0;box-sizing:border-box;word-wrap:break-word}" +
            "#pop-over .pop-back{position:fixed;z-index:99999;top:0;right:0;bottom:0;left:0;"+allBackColor+"opacity:0.5}" +
            "#pop-over .pop-main{width:"+data.mainWidth+"px;height:"+data.mainHeight+"px;border-radius:5px;"+backColor+"box-shadow:#333 2px 3px 11px;position:absolute;z-index:100000;top:50%;left:50%;margin:-"+data.mainHeight/2+"px 0 0 -"+data.mainWidth/2+"px}" +
            "#pop-over .pop-main .pop-header{"+headerColor+"width:100%;height:35px;border-top-left-radius:5px;border-top-right-radius:5px;padding:8px;padding-left:13px;font-size:19px;line-height:13px}" +
            "#pop-over .pop-main .pop-body{"+bodyColor+"width:100%;border-top:1px solid #000;border-bottom:1px solid #000;padding:13px;font-size:16px;line-height:18px;position:absolute;top:35px;bottom:35px}" +
            "#pop-over .pop-main .pop-footer{"+footerColor+"width:100%;height:35px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;position:absolute;bottom:0}" +
            "#pop-over .pop-main .pop-footer button{float:right;width:40px;height:25px;margin-top:5px;margin-right:15px;border-radius:5px;font-size:14px;cursor:pointer}" +
            "#pop-over .pop-main .pop-footer .pop-confirm{color:#fff;background-color:#3071a5}" +
            "#pop-over .pop-main .pop-footer .pop-cancel{color:#000}";

        if (_isIE()) {
            if (document.styleSheets['pop_over_style']) {
                return;
            }

            var ss = document.createStyleSheet();
            ss.owningElement.id = 'pop_over_style';
            ss.cssText = str_css;
        } else {
            if (document.getElementById("pop_over_style")) {
                return;
            }
            var style = document.createElement("style");
            style.id = "pop_over_style";
            style.type = "text/css";
            style.innerHTML = str_css;
            document.getElementsByTagName("HEAD").item(0).appendChild(style);
        }
    };

    function _isIE() {
        var navigatorName = "Microsoft Internet Explorer";
        return navigator.appName == navigatorName;
    }

    return new obj();
})();