import { openBlock, createElementBlock, normalizeClass, normalizeStyle, h, resolveComponent, createBlock, withCtx, renderSlot, Fragment, createVNode, toDisplayString, createCommentVNode, createElementVNode, renderList, Teleport, Transition, withDirectives, mergeProps, withModifiers, vShow, getCurrentInstance, vModelText, vModelDynamic, createSlots, withKeys, createTextVNode, createApp, pushScopeId, popScopeId } from "vue";
const mviDefault = "";
const mviSupport = "";
var dapUtil = { exports: {} };
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(self, function() {
    return (() => {
      var e = { 902: (e2, t2, n) => {
        var r = n(493);
        e2.exports = { rgb2hsv: function(e3) {
          if (!Array.isArray(e3) || 3 != e3.length)
            throw new TypeError("Invalid argument");
          var t3 = 0, n2 = 0, r2 = 0, o = e3[0] >= 255 ? 255 : e3[0], i = e3[1] >= 255 ? 255 : e3[1], s = e3[2] >= 255 ? 255 : e3[2];
          o = o <= 0 ? 0 : o, i = i <= 0 ? 0 : i, s = s <= 0 ? 0 : s;
          var u = Math.max(o, i, s), a = Math.min(o, i, s);
          return r2 = u / 255, n2 = 0 === u ? 0 : 1 - a / u, u === a ? t3 = 0 : u === o && i >= s ? t3 = (i - s) / (u - a) * 60 + 0 : u === o && i < s ? t3 = (i - s) / (u - a) * 60 + 360 : u === i ? t3 = (s - o) / (u - a) * 60 + 120 : u === s && (t3 = (o - i) / (u - a) * 60 + 240), [t3 = parseInt(t3), n2 = parseInt(100 * n2), r2 = parseInt(100 * r2)];
        }, hsv2rgb: function(e3) {
          if (!Array.isArray(e3) || 3 != e3.length)
            throw new TypeError("Invalid argument");
          var t3 = e3[0] >= 360 || e3[0] <= 0 ? 0 : e3[0], n2 = e3[1] >= 100 ? 100 : e3[1];
          n2 = n2 <= 0 ? 0 : n2;
          var r2 = e3[2] >= 100 ? 100 : e3[2];
          r2 = r2 <= 0 ? 0 : r2, n2 /= 100, r2 /= 100;
          var o = 0, i = 0, s = 0, u = parseInt(t3 / 60 % 6), a = t3 / 60 - u, c = r2 * (1 - n2), l = r2 * (1 - a * n2), d = r2 * (1 - (1 - a) * n2);
          switch (u) {
            case 0:
              o = r2, i = d, s = c;
              break;
            case 1:
              o = l, i = r2, s = c;
              break;
            case 2:
              o = c, i = r2, s = d;
              break;
            case 3:
              o = c, i = l, s = r2;
              break;
            case 4:
              o = d, i = c, s = r2;
              break;
            case 5:
              o = r2, i = c, s = l;
          }
          return [o = parseInt(255 * o), i = parseInt(255 * i), s = parseInt(255 * s)];
        }, rgb2hex: function(e3) {
          if (!Array.isArray(e3) || 3 != e3.length)
            throw new TypeError("Invalid argument");
          return "#" + ((1 << 24) + (e3[0] << 16) + (e3[1] << 8) + e3[2]).toString(16).slice(1);
        }, hex2rgb: function(e3) {
          if (!e3 || "string" != typeof e3)
            throw new TypeError("The argument must be a string");
          var t3 = e3.toLowerCase();
          if (!r.matchingText(t3, "hex"))
            throw new TypeError("The argument must be a hexadecimal color value");
          if (4 === t3.length) {
            for (var n2 = "#", o = 1; o < 4; o += 1)
              n2 += t3.slice(o, o + 1).concat(t3.slice(o, o + 1));
            t3 = n2;
          }
          for (var i = [], s = 1; s < 7; s += 2)
            i.push(parseInt("0x" + t3.slice(s, s + 2)));
          return i;
        } };
      }, 493: (e2, t2, n) => {
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        }, o = n(899);
        e2.exports = { matchingText: function(e3, t3) {
          if (!e3 || "string" != typeof e3)
            throw new TypeError("The first argument must be a string");
          if (!t3 || "string" != typeof t3)
            throw new TypeError("The second argument must be a string");
          var n2 = null;
          if ("Chinese" == t3 && (n2 = /^[\u4e00-\u9fa5]+$/), "chinese" == t3 && (n2 = /[\u4e00-\u9fa5]/), "email" == t3 && (n2 = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/), "userName" == t3 && (n2 = /^[a-zA-Z0-9_]{4,16}$/), "int+" == t3 && (n2 = /^\d+$/), "int-" == t3 && (n2 = /^-\d+$/), "int" == t3 && (n2 = /^-?\d+$/), "pos" == t3 && (n2 = /^\d*\.?\d+$/), "neg" == t3 && (n2 = /^-\d*\.?\d+$/), "number" == t3 && (n2 = /^-?\d*\.?\d+$/), "phone" == t3 && (n2 = /^1[0-9]\d{9}$/), "idCard" == t3 && (n2 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/), "url" == t3 && (n2 = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/), "IPv4" == t3 && (n2 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/), "hex" == t3 && (n2 = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/), "date" == t3)
            return /^((\d{4})(-)(\d{2})(-)(\d{2}))$/.test(e3) || /^(\d{4})(\/)(\d{2})(\/)(\d{2})$/.test(e3) || /^(\d{4})(\.)(\d{2})(\.)(\d{2})$/.test(e3) || /^(\d{4})(年)(\d{2})(月)(\d{2})(日)$/.test(e3);
          if ("time" == t3 && (n2 = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/), "QQ" == t3 && (n2 = /^[1-9][0-9]{4,10}$/), "weixin" == t3 && (n2 = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/), "plate" == t3 && (n2 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/), !n2)
            throw new Error("The second parameter is out of scope");
          return n2.test(e3);
        }, getUrlParams: function(e3) {
          if (!e3 || "string" != typeof e3)
            throw new TypeError("The argument must be a string");
          var t3 = new RegExp("(^|&)" + e3 + "=([^&]*)(&|$)"), n2 = window.location.search.substr(1);
          if (!n2) {
            var r2 = window.location.hash.split("?");
            2 == r2.length && (n2 = r2[1]);
          }
          var o2 = n2.match(t3);
          return o2 ? decodeURIComponent(o2[2]) : null;
        }, isEmptyObject: function(e3) {
          return !!this.isObject(e3) && 0 == Object.keys(e3).length;
        }, equal: function(e3, t3) {
          if ((void 0 === e3 ? "undefined" : r(e3)) !== (void 0 === t3 ? "undefined" : r(t3)))
            return false;
          if (this.isObject(e3) && this.isObject(t3)) {
            e3 = Object.assign({}, e3), t3 = Object.assign({}, t3);
            var n2 = Object.getOwnPropertyNames(e3), o2 = Object.getOwnPropertyNames(t3);
            if (n2.length != o2.length)
              return false;
            for (var i = n2.length, s = 0; s < i; s++) {
              var u = n2[s], a = e3[u], c = t3[u];
              if (this.isObject(a))
                return !!this.equal(a, c);
              if (a !== c)
                return false;
            }
            return true;
          }
          return e3 === t3;
        }, isObject: function(e3) {
          return !("object" !== (void 0 === e3 ? "undefined" : r(e3)) || !e3);
        }, copyText: function(e3) {
          if (!e3 || "string" != typeof e3)
            throw new TypeError("No text to copy is defined");
          var t3 = o.string2dom('<input type="text" />');
          document.body.appendChild(t3), t3.value = e3, t3.select(), document.execCommand("copy"), document.body.removeChild(t3);
        } };
      }, 997: (e2, t2, n) => {
        var r = n(899), o = "_dap-datas";
        e2.exports = { remove: function(e3, t3) {
          if (!r.isElement(e3) && !r.isWindow(e3))
            throw new TypeError("The first argument must be an element");
          var n2 = e3[o] || {};
          null == t3 || "" === t3 ? e3[o] = {} : (delete n2[t3], e3[o] = n2);
        }, has: function(e3, t3) {
          if (!r.isElement(e3) && !r.isWindow(e3))
            throw new TypeError("The first argument must be an element");
          if (null == t3 || "" === t3)
            throw new TypeError("The second parameter must be a unique key");
          return (e3[o] || {}).hasOwnProperty(t3);
        }, get: function(e3, t3) {
          if (!r.isElement(e3) && !r.isWindow(e3))
            throw new TypeError("The first argument must be an element");
          var n2 = e3[o] || {};
          return null == t3 || "" === t3 ? n2 : n2[t3];
        }, set: function(e3, t3, n2) {
          if (!r.isElement(e3) && !r.isWindow(e3))
            throw new TypeError("The first argument must be an element");
          if (null == t3 || "" === t3)
            throw new TypeError("The second parameter must be a unique key");
          var i = e3[o] || {};
          i[t3] = n2, e3[o] = i;
        } };
      }, 278: (e2, t2, n) => {
        var r = n(884);
        e2.exports = { getPrevMonths: function(e3, t3) {
          e3 && e3 instanceof Date || (e3 = new Date()), r.isNumber(t3) || (t3 = 1);
          for (var n2 = [e3], o = 0; o < t3 - 1; o++) {
            var i = e3.getFullYear(), s = e3.getMonth();
            0 == s && (s = 12, i--);
            var u = new Date();
            u.setMonth(s - 1), u.setFullYear(i), n2.push(u), e3 = u;
          }
          return n2;
        }, getNextMonths: function(e3, t3) {
          e3 && e3 instanceof Date || (e3 = new Date()), r.isNumber(t3) || (t3 = 1);
          for (var n2 = [e3], o = 0; o < t3 - 1; o++) {
            var i = e3.getFullYear(), s = e3.getMonth();
            11 == s && (s = -1, i++);
            var u = new Date();
            u.setMonth(s + 1), u.setFullYear(i), n2.push(u), e3 = u;
          }
          return n2;
        }, getDateAfter: function(e3, t3) {
          return e3 && e3 instanceof Date || (e3 = new Date()), r.isNumber(t3) || (t3 = 1), new Date(e3.getTime() + 24 * t3 * 60 * 60 * 1e3);
        }, getDateBefore: function(e3, t3) {
          return e3 && e3 instanceof Date || (e3 = new Date()), r.isNumber(t3) || (t3 = 1), new Date(e3.getTime() - 24 * t3 * 60 * 60 * 1e3);
        }, getDays: function(e3, t3) {
          if (!r.isNumber(e3))
            throw new TypeError("The first parameter must be a number representing the year");
          if (!r.isNumber(t3))
            throw new TypeError("The second argument must be a number representing the month");
          return e3 = parseInt(e3), t3 = parseInt(t3), new Date(e3, t3, 0).getDate();
        } };
      }, 899: (e2, t2, n) => {
        function r(e3) {
          if (Array.isArray(e3)) {
            for (var t3 = 0, n2 = Array(e3.length); t3 < e3.length; t3++)
              n2[t3] = e3[t3];
            return n2;
          }
          return Array.from(e3);
        }
        var o = n(5), i = n(884);
        e2.exports = { isWindow: function(e3) {
          return !!(e3 && e3.constructor && e3.constructor.name) && "Window" == e3.constructor.name;
        }, getElementPoint: function(e3, t3) {
          if (!this.isElement(e3))
            throw new TypeError("The first argument must be an element");
          if (this.isElement(t3) || (t3 = document.body), !this.isContains(t3, e3))
            throw new Error("The second argument and the first argument have no hierarchical relationship");
          for (var n2 = e3, r2 = 0, o2 = 0; this.isElement(e3) && this.isContains(t3, e3) && t3 !== e3; )
            r2 += e3.offsetTop, o2 += e3.offsetLeft, e3 = e3.offsetParent;
          return { top: r2, left: o2, right: t3.offsetWidth - o2 - n2.offsetWidth, bottom: t3.offsetHeight - r2 - n2.offsetHeight };
        }, isContains: function(e3, t3) {
          if (!this.isElement(e3))
            throw new TypeError("The first argument must be an element");
          if (!this.isElement(t3))
            throw new TypeError("The second argument must be an element");
          return e3 === t3 || (e3.contains ? e3.contains(t3) : e3.compareDocumentPosition ? !!(16 & e3.compareDocumentPosition(t3)) : void 0);
        }, isParentNode: function(e3, t3) {
          if (!this.isElement(e3))
            throw new TypeError("The first argument must be an element");
          if (!this.isElement(t3))
            throw new TypeError("The second argument must be an element");
          return e3 !== t3 && t3.parentNode === e3;
        }, children: function(e3, t3) {
          if (!this.isElement(e3))
            throw new TypeError("The first argument must be an element");
          if (t3 && "string" != typeof t3)
            throw new TypeError("The second argument must be a string");
          var n2 = e3.querySelectorAll(t3 || "*");
          return [].concat(r(n2)).filter(function(t4) {
            return t4.parentNode === e3;
          });
        }, siblings: function(e3, t3) {
          if (!this.isElement(e3))
            throw new TypeError("The first argument must be an element");
          if (t3 && "string" != typeof t3)
            throw new TypeError("The second argument must be a string");
          if (!e3.parentNode)
            return [];
          var n2 = e3.parentNode.querySelectorAll(t3 || "*");
          return [].concat(r(n2)).filter(function(t4) {
            return t4.parentNode === e3.parentNode && t4 != e3;
          });
        }, rem2px: function(e3) {
          if (!i.isNumber(e3))
            throw new TypeError("The argument must be a number");
          var t3 = this.getCssStyle(document.documentElement, "font-size");
          return i.mutiply(e3, parseFloat(t3));
        }, px2rem: function(e3) {
          if (!i.isNumber(e3))
            throw new TypeError("The argument must be a number");
          var t3 = this.getCssStyle(document.documentElement, "font-size");
          return i.divide(e3, parseFloat(t3));
        }, width: function(e3) {
          "string" == typeof e3 && e3 && (e3 = document.body.querySelector(e3)), this.isElement(e3) || (e3 = document.body);
          var t3 = e3.clientWidth, n2 = parseFloat(this.getCssStyle(e3, "padding-left")), r2 = parseFloat(this.getCssStyle(e3, "padding-right"));
          return i.subtract(t3, n2, r2);
        }, height: function(e3) {
          "string" == typeof e3 && e3 && (e3 = document.body.querySelector(e3)), this.isElement(e3) || (e3 = document.body);
          var t3 = e3.clientHeight, n2 = parseFloat(this.getCssStyle(e3, "padding-top")), r2 = parseFloat(this.getCssStyle(e3, "padding-bottom"));
          return i.subtract(t3, n2, r2);
        }, removeClass: function(e3, t3) {
          if (!this.isElement(e3))
            throw new TypeError("The first argument must be an element");
          if (!t3 || "string" != typeof t3)
            throw new TypeError("The second argument must be a string");
          var n2 = e3.classList;
          o.trim(t3).split(/\s+/).forEach(function(e4, t4) {
            n2.remove(e4);
          });
        }, addClass: function(e3, t3) {
          if (!this.isElement(e3))
            throw new TypeError("The first argument must be an element");
          if (!t3 || "string" != typeof t3)
            throw new TypeError("The second argument must be a string");
          var n2 = e3.classList;
          o.trim(t3).split(/\s+/).forEach(function(e4, t4) {
            n2.add(e4);
          });
        }, hasClass: function(e3, t3) {
          if (!this.isElement(e3))
            throw new TypeError("The first argument must be an element");
          if (!t3 || "string" != typeof t3)
            throw new TypeError("The second argument must be a string");
          var n2 = e3.classList;
          return o.trim(t3).split(/\s+/).every(function(e4, t4) {
            return n2.contains(e4);
          });
        }, scrollTopBottomTrigger: function(e3, t3) {
          var n2 = this;
          "string" == typeof e3 && e3 && (e3 = document.body.querySelector(e3));
          var r2 = window;
          this.isElement(e3) && e3 != document.body && e3 != document.documentElement && (r2 = e3), "function" == typeof e3 && (t3 = e3);
          var o2 = true;
          r2.addEventListener("scroll", function(e4) {
            if (n2.getScrollTop(r2) <= 0) {
              if (!o2)
                return;
              "function" == typeof t3 && (o2 = false, t3({ state: "top", target: r2 }));
            } else {
              var s, u = { state: "bottom", target: r2 };
              if (s = r2 == window ? window.innerHeight : r2.clientHeight, i.add(n2.getScrollTop(r2), s) + 1 >= n2.getScrollHeight(r2) && s != n2.getScrollHeight(r2)) {
                if (!o2)
                  return;
                "function" == typeof t3 && (o2 = false, t3(u));
              } else
                o2 = true;
            }
          });
        }, getScrollWidth: function(e3) {
          return "string" == typeof e3 && e3 && (e3 = document.body.querySelector(e3)), this.isElement(e3) && e3 != document.documentElement && e3 != document.body ? e3.scrollWidth : 0 == document.documentElement.scrollWidth || 0 == document.body.scrollWidth ? document.documentElement.scrollWidth || document.body.scrollWidth : document.documentElement.scrollWidth > document.body.scrollWidth ? document.documentElement.scrollWidth : document.body.scrollWidth;
        }, getScrollHeight: function(e3) {
          return "string" == typeof e3 && e3 && (e3 = document.body.querySelector(e3)), this.isElement(e3) && e3 != document.documentElement && e3 != document.body ? e3.scrollHeight : 0 == document.documentElement.scrollHeight || 0 == document.body.scrollHeight ? document.documentElement.scrollHeight || document.body.scrollHeight : document.documentElement.scrollHeight > document.body.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight;
        }, setScrollTop: function(e3) {
          var t3 = this, n2 = false, r2 = e3.el;
          "string" == typeof r2 && r2 && (r2 = document.body.querySelector(r2));
          var o2 = e3.number || 0, s = e3.time || 0;
          return this.isElement(r2) && r2 != document.body && r2 != document.documentElement && r2 != window || (n2 = true), new Promise(function(e4, u) {
            if (s <= 0)
              n2 ? document.documentElement.scrollTop = document.body.scrollTop = o2 : r2.scrollTop = o2, e4();
            else
              var a = i.divide(s, 10), c = t3.getScrollTop(r2), l = i.divide(i.subtract(o2, c), a), d = setInterval(function() {
                a > 0 ? (a--, n2 ? document.documentElement.scrollTop = document.body.scrollTop = c = i.add(c, l) : r2.scrollTop = c = i.add(c, l)) : (clearInterval(d), e4());
              }, 10);
          });
        }, getScrollTop: function(e3) {
          return "string" == typeof e3 && e3 && (e3 = document.body.querySelector(e3)), this.isElement(e3) && e3 != document.body && e3 != document.documentElement && e3 != window ? e3.scrollTop : 0 == document.documentElement.scrollTop || 0 == document.body.scrollTop ? document.documentElement.scrollTop || document.body.scrollTop : document.documentElement.scrollTop > document.body.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        }, getScrollLeft: function(e3) {
          return "string" == typeof e3 && e3 && (e3 = document.body.querySelector(e3)), this.isElement(e3) && e3 != document.body && e3 != document.documentElement && e3 != window ? e3.scrollLeft : 0 == document.documentElement.scrollLeft || 0 == document.body.scrollLeft ? document.documentElement.scrollLeft || document.body.scrollLeft : document.documentElement.scrollLeft > document.body.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
        }, setScrollLeft: function(e3) {
          var t3 = this, n2 = false, r2 = e3.el;
          "string" == typeof r2 && r2 && (r2 = document.body.querySelector(r2));
          var o2 = e3.number || 0, s = e3.time || 0;
          return this.isElement(r2) && r2 != document.body && r2 != document.documentElement && r2 != window || (n2 = true), new Promise(function(e4, u) {
            if (s <= 0)
              n2 ? document.documentElement.scrollLeft = document.body.scrollLeft = o2 : r2.scrollLeft = o2, e4();
            else
              var a = i.divide(s, 10), c = t3.getScrollLeft(r2), l = i.divide(i.subtract(o2, c), a), d = setInterval(function() {
                a > 0 ? (a--, n2 ? document.documentElement.scrollLeft = document.body.scrollLeft = c = i.add(c, l) : r2.scrollLeft = c = i.add(c, l)) : (clearInterval(d), e4());
              }, 10);
          });
        }, getCssStyle: function(e3, t3) {
          if (!this.isElement(e3))
            throw new TypeError("The first argument must be an element");
          if (!t3 || "string" != typeof t3)
            throw new TypeError("The second argument must be a string");
          return document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(e3)[t3] : e3.currentStyle[t3];
        }, getCssSelector: function(e3) {
          if (!e3 || "string" != typeof e3)
            throw new TypeError("The argument must be a selector string");
          if (/^#{1}/.test(e3))
            return { type: "id", value: e3.substr(1) };
          if (/^\./.test(e3))
            return { type: "class", value: e3.substr(1) };
          if (/^\[(.+)\]$/.test(e3)) {
            var t3 = "", n2 = o.trim(e3, true).substring(1, o.trim(e3, true).length - 1).split("=");
            return 1 == n2.length && (t3 = n2[0]), 2 == n2.length && (t3 = { attributeName: n2[0], attributeValue: n2[1].replace(/\'/g, "").replace(/\"/g, "") }), { type: "attribute", value: t3 };
          }
          return { type: "tag", value: e3 };
        }, getElementBounding: function(e3) {
          "string" == typeof e3 && e3 && (e3 = document.body.querySelector(e3)), this.isElement(e3) || (e3 = document.body);
          var t3 = e3.getBoundingClientRect();
          return { top: t3.top, bottom: i.subtract(document.documentElement.clientHeight || window.innerHeight, t3.bottom), left: t3.left, right: i.subtract(document.documentElement.clientWidth || window.innerWidth, t3.right) };
        }, isElement: function(e3) {
          return !!(e3 && 1 === e3.nodeType && e3 instanceof Node);
        }, string2dom: function(e3) {
          if (!e3 || "string" != typeof e3)
            throw new TypeError("The argument must be an HTML string");
          var t3 = document.createElement("div");
          return t3.innerHTML = e3, 1 == t3.children.length ? t3.children[0] : t3.children;
        } };
      }, 15: (e2, t2, n) => {
        var r = n(997), o = n(899), i = n(493), s = function(e3) {
          var t3 = e3.split(/[\s]+/g), n2 = [];
          return t3.forEach(function(e4) {
            var t4 = e4.split("."), r2 = { eventName: t4[0] };
            t4.length > 1 && (r2.guid = t4[1]), n2.push(r2);
          }), n2;
        };
        e2.exports = { on: function(e3, t3, n2, u) {
          if (!o.isElement(e3) && !o.isWindow(e3))
            throw new TypeError("The first argument must be an element node");
          if (!t3 || "string" != typeof t3)
            throw new TypeError("The second argument must be a string");
          if (!n2 || "function" != typeof n2)
            throw new TypeError("The third argument must be a function");
          i.isObject(u) || (u = {}), s(t3).forEach(function(t4) {
            !function(e4, t5, n3, o2, i2) {
              var s2 = r.get(e4, "dap-defined-events") || {};
              n3 || (n3 = r.get(e4, "dap-event-guid") || 0, r.set(e4, "dap-event-guid", n3 + 1)), s2[n3 = t5 + "_" + n3] && s2[n3].type == t5 && e4.removeEventListener(t5, s2[n3].fn, s2[n3].options), e4.addEventListener(t5, o2, i2), s2[n3] = { type: t5, fn: o2, options: i2 }, r.set(e4, "dap-defined-events", s2);
            }(e3, t4.eventName, t4.guid, n2.bind(e3), u);
          });
        }, off: function(e3, t3) {
          if (!o.isElement(e3) && !o.isWindow(e3))
            throw new TypeError("The first argument must be an element node");
          var n2 = r.get(e3, "dap-defined-events");
          if (n2) {
            if (!t3) {
              for (var i2 = Object.keys(n2), u = i2.length, a = 0; a < u; a++) {
                var c = i2[a];
                e3.removeEventListener(n2[c].type, n2[c].fn, n2[c].options);
              }
              return r.remove(e3, "dap-defined-events"), void r.remove(e3, "dap-event-guid");
            }
            s(t3).forEach(function(t4) {
              !function(e4, t5, n3) {
                for (var o2 = r.get(e4, "dap-defined-events") || {}, i3 = Object.keys(o2), s2 = i3.length, u2 = 0; u2 < s2; u2++) {
                  var a2 = i3[u2];
                  o2[a2].type == t5 && (n3 ? a2 == t5 + "_" + n3 && (e4.removeEventListener(o2[a2].type, o2[a2].fn, o2[a2].options), o2[a2] = void 0) : (e4.removeEventListener(o2[a2].type, o2[a2].fn, o2[a2].options), o2[a2] = void 0));
                }
                o2 = function(e5) {
                  var t6 = {};
                  return Object.keys(e5).forEach(function(n4) {
                    e5[n4] && (t6[n4] = e5[n4]);
                  }), t6;
                }(o2), r.set(e4, "dap-defined-events", o2);
              }(e3, t4.eventName, t4.guid);
            });
          }
        } };
      }, 592: (e2) => {
        e2.exports = { getImageUrl: function(e3) {
          if (!(e3 && e3 instanceof File))
            throw new TypeError("The argument must be a File object");
          return window.URL.createObjectURL(e3);
        }, dataFileToBase64: function(e3) {
          return new Promise(function(t2, n) {
            e3 && e3 instanceof File || n(new TypeError("The argument must be a File object"));
            var r = new FileReader();
            r.readAsDataURL(e3), r.onloadend = function() {
              var e4 = r.result;
              t2(e4);
            };
          });
        }, dataBase64toFile: function(e3, t2) {
          if (!e3 || "string" != typeof e3)
            throw new TypeError("The first argument must be a string");
          if (!t2 || "string" != typeof t2)
            throw new TypeError("The second argument must be a string");
          for (var n = e3.split(","), r = n[0].match(/:(.*?);/)[1], o = atob(n[1]), i = o.length, s = new Uint8Array(i); i--; )
            s[i] = o.charCodeAt(i);
          return new File([s], t2, { type: r });
        } };
      }, 579: (e2, t2, n) => {
        var r = n(884), o = n(997), i = n(899), s = n(15), u = n(493), a = n(278), c = n(902), l = n(592), d = n(5), m = n(792), f = n(470);
        e2.exports = { number: r, data: o, element: i, event: s, common: u, date: a, color: c, file: l, string: d, platform: m, speech: f };
      }, 884: (e2) => {
        e2.exports = { formatNumber: function(e3) {
          return this.isNumber(e3) ? e3.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") : e3;
        }, isNumber: function(e3) {
          return "number" == typeof e3 && !isNaN(e3);
        }, add: function() {
          for (var e3 = arguments.length, t2 = Array(e3), n = 0; n < e3; n++)
            t2[n] = arguments[n];
          return t2.reduce(function(e4, t3) {
            var n2, r = 0, o = 0;
            try {
              r = e4.toString().split(".")[1].length;
            } catch (e5) {
            }
            try {
              o = t3.toString().split(".")[1].length;
            } catch (e5) {
            }
            return (e4 * (n2 = Math.pow(10, Math.max(r, o))) + t3 * n2) / n2;
          });
        }, subtract: function() {
          for (var e3 = arguments.length, t2 = Array(e3), n = 0; n < e3; n++)
            t2[n] = arguments[n];
          return t2.reduce(function(e4, t3) {
            var n2, r = 0, o = 0;
            try {
              r = e4.toString().split(".")[1].length;
            } catch (e5) {
            }
            try {
              o = t3.toString().split(".")[1].length;
            } catch (e5) {
            }
            return (e4 * (n2 = Math.pow(10, Math.max(r, o))) - t3 * n2) / n2;
          });
        }, mutiply: function() {
          for (var e3 = arguments.length, t2 = Array(e3), n = 0; n < e3; n++)
            t2[n] = arguments[n];
          return t2.reduce(function(e4, t3) {
            var n2 = 0, r = e4.toString(), o = t3.toString();
            try {
              n2 += r.split(".")[1].length;
            } catch (e5) {
            }
            try {
              n2 += o.split(".")[1].length;
            } catch (e5) {
            }
            return Number(r.replace(".", "")) * Number(o.replace(".", "")) / Math.pow(10, n2);
          });
        }, divide: function() {
          for (var e3 = arguments.length, t2 = Array(e3), n = 0; n < e3; n++)
            t2[n] = arguments[n];
          return t2.reduce(function(e4, t3) {
            var n2 = 0, r = 0, o = e4.toString(), i = t3.toString();
            try {
              n2 = o.split(".")[1].length;
            } catch (e5) {
            }
            try {
              r = i.split(".")[1].length;
            } catch (e5) {
            }
            return (o = Number(o.replace(".", ""))) / (i = Number(i.replace(".", ""))) * Math.pow(10, r - n2);
          });
        } };
      }, 792: (e2) => {
        e2.exports = { language: function() {
          return window.navigator.browserLanguage || window.navigator.language;
        }, device: function() {
          var e3 = window.navigator.userAgent;
          return { PC: !e3.match(/AppleWebKit.*Mobile.*/), Mobile: !!e3.match(/AppleWebKit.*Mobile.*/), iPhone: e3.includes("iPhone"), Phone: e3.includes("Android") && /(?:Mobile)/.test(e3) || e3.includes("iPhone") || /(?:Windows Phone)/.test(e3), iPad: e3.includes("iPad"), Tablet: e3.includes("iPad") || e3.includes("Android") && !/(?:Mobile)/.test(e3) || e3.includes("Firefox") && /(?:Tablet)/.test(e3), WindowsPhone: /(?:Windows Phone)/.test(e3) };
        }, browser: function() {
          var e3 = window.navigator.userAgent;
          return { Edge: !!e3.match(/Edg\/([\d.]+)/), weixin: e3.includes("MicroMessenger"), QQ: e3.includes("QQ"), QQBrowser: e3.includes("MQQBrowser"), UC: e3.includes("UCBrowser"), Chrome: e3.includes("Chrome"), Firefox: e3.includes("Firefox"), sougou: e3.toLocaleLowerCase().includes("se 2.x") || e3.toLocaleLowerCase().includes("metasr") || e3.toLocaleLowerCase().includes("sogou"), Safari: e3.includes("Safari") && !e3.includes("Chrome") };
        }, browserKernel: function() {
          var e3 = window.navigator.userAgent;
          return e3.includes("Presto") ? "opera" : e3.includes("AppleWebKit") ? "webkit" : e3.includes("Gecko") && !e3.includes("KHTML") ? "gecko" : "";
        }, os: function() {
          var e3, t2 = window.navigator.userAgent;
          return { Windows: t2.includes("Windows"), Windows_CPU: t2.toLocaleLowerCase().includes("win64") || t2.toLocaleLowerCase().includes("wow64") ? "x64" : t2.toLocaleLowerCase().includes("win32") || t2.toLocaleLowerCase().includes("wow32") ? "x32" : "", Windows_Version: t2.includes("Windows NT 6.1") || t2.includes("Windows 7") ? "Win7" : t2.includes("Windows NT 6.3") || t2.includes("Windows NT 6.2") || t2.includes("Windows NT 8") ? "Win8" : t2.includes("Windows NT 10") || t2.includes("Windows NT 6.4") ? "Win10" : "", Mac: t2.includes("Macintosh"), Mac_Version: function() {
            if (t2.includes("Macintosh")) {
              var e4 = t2.match(/Mac OS X ([^\s]+)\)/);
              if (e4 && e4[1])
                return e4[1].split(/_|\./).join(".");
            }
            return "";
          }(), ios: !!t2.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), ios_Version: function() {
            if (t2.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
              var e4 = t2.match(/CPU.+OS ([^\s]+) like Mac OS X/);
              if (e4 && e4[1])
                return e4[1].split(/_|\./).join(".");
            }
            return "";
          }(), Android: t2.includes("Android"), Android_Version: (e3 = t2.match(/Android ([^\s]+);/), e3 && e3[1] ? e3[1].split(/_|\./).join(".") : ""), Linux: t2.includes("Linux"), HarmonyOS: t2.includes("HarmonyOS"), Ubuntu: t2.includes("Ubuntu") };
        } };
      }, 470: (e2, t2, n) => {
        var r = n(884), o = n(493);
        e2.exports = { start: function(e3, t3) {
          if (!window.SpeechSynthesisUtterance || !window.speechSynthesis)
            throw new Error("The current browser does not support this syntax");
          var n2 = { pitch: 0.8, rate: 1, volume: 1, start: function() {
          }, end: function() {
          }, pause: function() {
          }, resume: function() {
          }, error: function() {
          } };
          o.isObject(t3) || (t3 = {}), r.isNumber(t3.pitch) && (n2.pitch = t3.pitch), r.isNumber(t3.rate) && (n2.rate = t3.rate), r.isNumber(t3.volume) && (n2.volume = t3.volume), "function" == typeof t3.start && (n2.start = t3.start), "function" == typeof t3.end && (n2.end = t3.end), "function" == typeof t3.pause && (n2.pause = t3.pause), "function" == typeof t3.resume && (n2.resume = t3.resume), "function" == typeof t3.error && (n2.error = t3.error);
          var i = new SpeechSynthesisUtterance();
          i.text = e3, i.pitch = n2.pitch, i.rate = n2.rate, i.volume = n2.volume, i.lang = "zh-CN", i.onstart = function(t4) {
            n2.start.apply(i, [t4, { text: e3, pitch: n2.pitch, rate: n2.rate, volume: n2.volume }]);
          }, i.onend = function(t4) {
            n2.end.apply(i, [t4, { text: e3, pitch: n2.pitch, rate: n2.rate, volume: n2.volume }]);
          }, i.onpause = function(t4) {
            n2.pause.apply(i, [t4, { text: e3, pitch: n2.pitch, rate: n2.rate, volume: n2.volume }]);
          }, i.onresume = function(t4) {
            n2.resume.apply(i, [t4, { text: e3, pitch: n2.pitch, rate: n2.rate, volume: n2.volume }]);
          }, i.onerror = function(t4) {
            n2.error.apply(i, [t4, { text: e3, pitch: n2.pitch, rate: n2.rate, volume: n2.volume }]);
          }, window.speechSynthesis.speak(i);
        }, stop: function() {
          if (!window.SpeechSynthesisUtterance || !window.speechSynthesis)
            throw new Error("The current browser does not support this syntax");
          window.speechSynthesis.cancel();
        }, pause: function() {
          if (!window.SpeechSynthesisUtterance || !window.speechSynthesis)
            throw new Error("The current browser does not support this syntax");
          window.speechSynthesis.pause();
        }, resume: function() {
          if (!window.SpeechSynthesisUtterance || !window.speechSynthesis)
            throw new Error("The current browser does not support this syntax");
          window.speechSynthesis.resume();
        } };
      }, 5: (e2, t2, n) => {
        var r = n(884);
        e2.exports = { insert: function(e3, t3, n2) {
          if (!e3 || "string" != typeof e3)
            throw new TypeError("The first argument must be a string");
          if ("string" != typeof t3)
            throw new TypeError("The second argument must be a string");
          if (!r.isNumber(n2))
            throw new TypeError("The third argument must be a number");
          if (n2 < 0)
            throw new Error("The third argument cannot be less than 0");
          return e3.substring(0, n2) + t3 + e3.substring(n2, e3.length);
        }, delete: function(e3, t3, n2) {
          if (!e3 || "string" != typeof e3)
            throw new TypeError("The first argument must be a string");
          if (!r.isNumber(t3))
            throw new TypeError("The second argument must be a number");
          if (t3 < 0)
            throw new Error("The second argument cannot be less than 0");
          if (!r.isNumber(n2))
            throw new TypeError("The third argument must be a number");
          if (n2 < 0)
            throw new Error("The third argument cannot be less than 0");
          return e3.substring(0, t3) + e3.substring(t3 + n2, e3.length);
        }, replace: function(e3, t3, n2, o) {
          if (!e3 || "string" != typeof e3)
            throw new TypeError("The first argument must be a string");
          if (!r.isNumber(t3))
            throw new TypeError("The second argument must be a number");
          if (t3 < 0)
            throw new Error("The second argument cannot be less than 0");
          if (!r.isNumber(n2))
            throw new TypeError("The third argument must be a number");
          if (n2 < 0)
            throw new Error("The third argument cannot be less than 0");
          if ("string" != typeof o)
            throw new TypeError("The fourth argument must be a string");
          return e3.substring(0, t3) + o + e3.substring(n2, e3.length);
        }, trim: function(e3, t3) {
          if ("string" != typeof e3)
            throw new TypeError("The first argument must be a string");
          var n2 = e3.replace(/(^\s+)|(\s+$)/g, "");
          return t3 && (n2 = n2.replace(/\s/g, "")), n2;
        } };
      } }, t = {};
      return function n(r) {
        var o = t[r];
        if (void 0 !== o)
          return o.exports;
        var i = t[r] = { exports: {} };
        return e[r](i, i.exports, n), i.exports;
      }(579);
    })();
  });
})(dapUtil);
const Dap = dapUtil.exports;
Dap.install = (app) => {
  app.config.globalProperties.$dap = Dap;
  app.provide("$dap", Dap);
};
Dap.event.on(window, "touchstart.ios", (e) => {
});
class Anchor {
  constructor(element, options) {
    this.$el = element;
    if (!Dap.common.isObject(options)) {
      options = {};
    }
    this.$target = options.target;
    this.$root = options.root;
    this.callback = options.callback;
    this.time = options.time;
    this.distance = options.distance;
    this.hasInit = false;
  }
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (typeof this.$root == "string" && this.$root) {
      this.$root = document.body.querySelector(this.$root);
    }
    if (typeof this.$target == "string" && this.$target) {
      this.$target = document.body.querySelector(this.$target);
    }
    if (!Dap.element.isElement(this.$el)) {
      throw new TypeError(
        "The element you click on is not a node element"
      );
    }
    if (!Dap.element.isElement(this.$target)) {
      throw new TypeError("Anchor element is not a node element");
    }
    if (!Dap.number.isNumber(this.time)) {
      this.time = 0;
    }
    if (typeof this.callback != "function") {
      this.callback = function() {
      };
    }
    if (!Dap.number.isNumber(this.distance)) {
      this.distance = 0.1;
    }
    if (Dap.element.isElement(this.$root)) {
      Dap.event.on(this.$el, "click.anchor", (e) => {
        let scrollTop = Dap.element.getElementPoint(
          this.$target,
          this.$root
        ).top;
        Dap.element.setScrollTop({
          el: this.$root,
          number: scrollTop - Dap.element.rem2px(this.distance),
          time: this.time
        }).then(() => {
          let top = scrollTop - Dap.element.rem2px(this.distance) <= 0 ? 0 : scrollTop - Dap.element.rem2px(this.distance);
          this.callback(top);
        });
      });
    } else {
      Dap.event.on(this.$el, "click.anchor", (e) => {
        let scrollTop = Dap.element.getElementPoint(this.$target).top;
        Dap.element.setScrollTop({
          number: scrollTop - Dap.element.rem2px(this.distance),
          time: this.time
        }).then(() => {
          let top = scrollTop - Dap.element.rem2px(this.distance) <= 0 ? 0 : scrollTop - Dap.element.rem2px(this.distance);
          this.callback(top);
        });
      });
    }
  }
}
const Anchor$1 = Anchor;
Anchor$1.install = (app) => {
  app.directive("anchor", {
    mounted(el, binding) {
      let options = {};
      if (Dap.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let anchor = new Anchor$1(el, options);
      anchor.init();
    }
  });
};
class Resize {
  constructor(element, options) {
    this.$el = element;
    if (!Dap.common.isObject(options)) {
      options = {};
    }
    this.draggableX = options.draggableX;
    this.draggableY = options.draggableY;
    this.mode = options.mode;
    this.beforeResize = options.beforeResize;
    this.resize = options.resize;
    this.trigger = options.trigger;
    this.end = options.end;
    this.ready = options.ready;
    this.range = options.range;
    this.draggable = false;
    this.leftRange = {};
    this.rightRange = {};
    this.topRange = {};
    this.bottomRange = {};
    this.leftTopRange = {};
    this.rightTopRange = {};
    this.leftBottomRange = {};
    this.rightBottomRange = {};
    this.startX = 0;
    this.satrtY = 0;
    this._width = 0;
    this._height = 0;
    this._left = 0;
    this._right = 0;
    this.hasInit = false;
    this.cursor = "";
    this.guid = this._createGuid();
  }
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!Dap.element.isElement(this.$el)) {
      throw new TypeError(
        "The element that needs to be resized is not a node element"
      );
    }
    if (typeof this.draggableX != "boolean") {
      this.draggableX = true;
    }
    if (typeof this.draggableY != "boolean") {
      this.draggableY = true;
    }
    if (!Dap.common.isObject(this.mode)) {
      this.mode = {
        left: Resize.MODE.LEFT,
        top: Resize.MODE.TOP,
        bottom: Resize.MODE.BOTTOM,
        right: Resize.MODE.RIGHT
      };
    } else {
      if (typeof this.mode.left != "boolean") {
        this.mode.left = Resize.MODE.LEFT;
      }
      if (typeof this.mode.top != "boolean") {
        this.mode.top = Resize.MODE.TOP;
      }
      if (typeof this.mode.bottom != "boolean") {
        this.mode.bottom = Resize.MODE.BOTTOM;
      }
      if (typeof this.mode.right != "boolean") {
        this.mode.right = Resize.MODE.RIGHT;
      }
    }
    if (typeof this.beforeResize != "function") {
      this.beforeResize = function() {
      };
    }
    if (typeof this.resize != "function") {
      this.resize = function() {
      };
    }
    if (typeof this.trigger != "function") {
      this.trigger = function() {
      };
    }
    if (typeof this.end != "function") {
      this.end = function() {
      };
    }
    if (typeof this.ready != "function") {
      this.ready = function() {
      };
    }
    if (!Dap.number.isNumber(this.range)) {
      this.range = 0.4;
    }
    this.setRange();
    this._setOn();
    this.ready.apply(this, [this]);
  }
  setRange() {
    let range = this.$el.getBoundingClientRect();
    if (this.draggableX && this.draggableY) {
      this.leftRange = {
        x: [range.left, range.left + Dap.element.rem2px(this.range)],
        y: [
          range.top + Dap.element.rem2px(this.range),
          range.bottom - Dap.element.rem2px(this.range)
        ]
      };
      this.rightRange = {
        x: [range.right - Dap.element.rem2px(this.range), range.right],
        y: [
          range.top + Dap.element.rem2px(this.range),
          range.bottom - Dap.element.rem2px(this.range)
        ]
      };
      this.topRange = {
        x: [
          range.left + Dap.element.rem2px(this.range),
          range.right - Dap.element.rem2px(this.range)
        ],
        y: [range.top, range.top + Dap.element.rem2px(this.range)]
      };
      this.bottomRange = {
        x: [
          range.left + Dap.element.rem2px(this.range),
          range.right - Dap.element.rem2px(this.range)
        ],
        y: [range.bottom - Dap.element.rem2px(this.range), range.bottom]
      };
      this.leftTopRange = {
        x: [range.left, range.left + Dap.element.rem2px(this.range)],
        y: [range.top, range.top + Dap.element.rem2px(this.range)]
      };
      this.leftBottomRange = {
        x: [range.left, range.left + Dap.element.rem2px(this.range)],
        y: [range.bottom - Dap.element.rem2px(this.range), range.bottom]
      };
      this.rightTopRange = {
        x: [range.right - Dap.element.rem2px(this.range), range.right],
        y: [range.top, range.top + Dap.element.rem2px(this.range)]
      };
      this.rightBottomRange = {
        x: [range.right - Dap.element.rem2px(this.range), range.right],
        y: [range.bottom - Dap.element.rem2px(this.range), range.bottom]
      };
    } else if (this.draggableX) {
      this.leftRange = {
        x: [range.left, range.left + Dap.element.rem2px(this.range)],
        y: [range.top, range.bottom]
      };
      this.rightRange = {
        x: [range.right - Dap.element.rem2px(this.range), range.right],
        y: [range.top, range.bottom]
      };
    } else if (this.draggableY) {
      this.topRange = {
        x: [range.left, range.right],
        y: [range.top, range.top + Dap.element.rem2px(this.range)]
      };
      this.bottomRange = {
        x: [range.left, range.right],
        y: [range.bottom - Dap.element.rem2px(this.range), range.bottom]
      };
    }
  }
  _getIsInRange(x, y, range) {
    let conditions1 = x >= range.x[0] && x <= range.x[1];
    let conditions2 = y >= range.y[0] && y <= range.y[1];
    if (conditions1 && conditions2) {
      return true;
    } else {
      return false;
    }
  }
  _down(e) {
    this._width = this.$el.offsetWidth;
    this._height = this.$el.offsetHeight;
    this._left = this.$el.offsetLeft;
    this._top = this.$el.offsetTop;
    this.cursor = Dap.element.getCssStyle(this.$el, "cursor");
    if (this.draggableX && this.draggableY) {
      if (this._getIsInRange(this.startX, this.startY, this.leftTopRange)) {
        if (this.mode.left || this.mode.top) {
          this.draggable = true;
          this.$el.style.cursor = "nw-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: Resize.AREA.LEFTTOP
            }
          ]);
        }
      } else if (this._getIsInRange(
        this.startX,
        this.startY,
        this.leftBottomRange
      )) {
        if (this.mode.left || this.mode.bottom) {
          this.draggable = true;
          this.$el.style.cursor = "sw-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: Resize.AREA.LEFTBOTTOM
            }
          ]);
        }
      } else if (this._getIsInRange(this.startX, this.startY, this.rightTopRange)) {
        if (this.mode.right || this.mode.top) {
          this.draggable = true;
          this.$el.style.cursor = "ne-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: Resize.AREA.RIGHTTOP
            }
          ]);
        }
      } else if (this._getIsInRange(
        this.startX,
        this.startY,
        this.rightBottomRange
      )) {
        if (this.mode.right || this.mode.bottom) {
          this.draggable = true;
          this.$el.style.cursor = "se-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: Resize.AREA.RIGHTBOTTOM
            }
          ]);
        }
      } else if (this._getIsInRange(this.startX, this.startY, this.leftRange)) {
        if (this.mode.left) {
          this.draggable = true;
          this.$el.style.cursor = "w-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: Resize.AREA.LEFT
            }
          ]);
        }
      } else if (this._getIsInRange(this.startX, this.startY, this.rightRange)) {
        if (this.mode.right) {
          this.draggable = true;
          this.$el.style.cursor = "e-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: Resize.AREA.RIGHT
            }
          ]);
        }
      } else if (this._getIsInRange(this.startX, this.startY, this.topRange)) {
        if (this.mode.top) {
          this.draggable = true;
          this.$el.style.cursor = "n-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: Resize.AREA.TOP
            }
          ]);
        }
      } else if (this._getIsInRange(this.startX, this.startY, this.bottomRange)) {
        if (this.mode.bottom) {
          this.draggable = true;
          this.$el.style.cursor = "s-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: Resize.AREA.BOTTOM
            }
          ]);
        }
      }
    } else if (this.draggableX) {
      if (this._getIsInRange(this.startX, this.startY, this.leftRange)) {
        if (this.mode.left) {
          this.draggable = true;
          this.$el.style.cursor = "w-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: Resize.AREA.LEFT
            }
          ]);
        }
      } else if (this._getIsInRange(this.startX, this.startY, this.rightRange)) {
        if (this.mode.right) {
          this.draggable = true;
          this.$el.style.cursor = "e-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: Resize.AREA.RIGHT
            }
          ]);
        }
      }
    } else if (this.draggableY) {
      if (this._getIsInRange(this.startX, this.startY, this.topRange)) {
        if (this.mode.top) {
          this.draggable = true;
          this.$el.style.cursor = "n-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: Resize.AREA.TOP
            }
          ]);
        }
      } else if (this._getIsInRange(this.startX, this.startY, this.bottomRange)) {
        if (this.mode.bottom) {
          this.draggable = true;
          this.$el.style.cursor = "s-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: Resize.AREA.BOTTOM
            }
          ]);
        }
      }
    }
  }
  _move(e, endX, endY) {
    if (this.draggable) {
      let moveX = endX - this.startX;
      let moveY = endY - this.startY;
      if (this.draggableX && this.draggableY) {
        if (this._getIsInRange(
          this.startX,
          this.startY,
          this.leftTopRange
        )) {
          if (this.mode.left || this.mode.top) {
            if (this.beforeResize.apply(this, [
              {
                event: e,
                area: Resize.AREA.LEFTTOP,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]) === false) {
              return;
            }
          }
          if (this.mode.left) {
            this.$el.style.width = this._width - moveX + "px";
            this.$el.style.left = this._left + moveX + "px";
          }
          if (this.mode.top) {
            this.$el.style.height = this._height - moveY + "px";
            this.$el.style.top = this._top + moveY + "px";
          }
          if (this.mode.left || this.mode.top) {
            this.resize.apply(this, [
              {
                area: Resize.AREA.LEFTTOP,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.leftBottomRange
        )) {
          if (this.mode.left || this.mode.bottom) {
            if (this.beforeResize.apply(this, [
              {
                area: Resize.AREA.LEFTBOTTOM,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]) === false) {
              return;
            }
          }
          if (this.mode.left) {
            this.$el.style.width = this._width - moveX + "px";
            this.$el.style.left = this._left + moveX + "px";
          }
          if (this.mode.bottom) {
            this.$el.style.height = this._height + moveY + "px";
          }
          if (this.mode.left || this.mode.bottom) {
            this.resize.apply(this, [
              {
                area: Resize.AREA.LEFTBOTTOM,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.rightTopRange
        )) {
          if (this.mode.right || this.mode.top) {
            if (this.beforeResize.apply(this, [
              {
                area: Resize.AREA.RIGHTTOP,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]) === false) {
              return;
            }
          }
          if (this.mode.right) {
            this.$el.style.width = this._width + moveX + "px";
          }
          if (this.mode.top) {
            this.$el.style.height = this._height - moveY + "px";
            this.$el.style.top = this._top + moveY + "px";
          }
          if (this.mode.top || this.mode.right) {
            this.resize.apply(this, [
              {
                area: Resize.AREA.RIGHTTOP,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.rightBottomRange
        )) {
          if (this.mode.right || this.mode.bottom) {
            if (this.beforeResize.apply(this, [
              {
                area: Resize.AREA.RIGHTBOTTOM,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]) === false) {
              return;
            }
          }
          if (this.mode.right) {
            this.$el.style.width = this._width + moveX + "px";
          }
          if (this.mode.bottom) {
            this.$el.style.height = this._height + moveY + "px";
          }
          if (this.mode.right || this.mode.bottom) {
            this.resize.apply(this, [
              {
                area: Resize.AREA.RIGHTBOTTOM,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this._getIsInRange(this.startX, this.startY, this.leftRange)) {
          if (this.mode.left) {
            if (this.beforeResize.apply(this, [
              {
                area: Resize.AREA.LEFT,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]) === false) {
              return;
            }
            this.$el.style.width = this._width - moveX + "px";
            this.$el.style.left = this._left + moveX + "px";
            this.resize.apply(this, [
              {
                area: Resize.AREA.LEFT,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.rightRange
        )) {
          if (this.mode.right) {
            if (this.beforeResize.apply(this, [
              {
                area: Resize.AREA.RIGHT,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]) === false) {
              return;
            }
            this.$el.style.width = this._width + moveX + "px";
            this.resize.apply(this, [
              {
                area: Resize.AREA.RIGHT,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this._getIsInRange(this.startX, this.startY, this.topRange)) {
          if (this.mode.top) {
            if (this.beforeResize.apply(this, [
              {
                area: Resize.AREA.TOP,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]) === false) {
              return;
            }
            this.$el.style.height = this._height - moveY + "px";
            this.$el.style.top = this._top + moveY + "px";
            this.resize.apply(this, [
              {
                area: Resize.AREA.TOP,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.bottomRange
        )) {
          if (this.mode.bottom) {
            if (this.beforeResize.apply(this, [
              {
                area: Resize.AREA.BOTTOM,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]) === false) {
              return;
            }
            this.$el.style.height = this._height + moveY + "px";
            this.resize.apply(this, [
              {
                area: Resize.AREA.BOTTOM,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        }
      } else if (this.draggableX) {
        if (this._getIsInRange(this.startX, this.startY, this.leftRange)) {
          if (this.mode.left) {
            if (this.beforeResize.apply(this, [
              {
                area: Resize.AREA.LEFT,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]) === false) {
              return;
            }
            this.$el.style.width = this._width - moveX + "px";
            this.$el.style.left = this._left + moveX + "px";
            this.resize.apply(this, [
              {
                area: Resize.AREA.LEFT,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.rightRange
        )) {
          if (this.mode.right) {
            if (this.beforeResize.apply(this, [
              {
                area: Resize.AREA.RIGHT,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]) === false) {
              return;
            }
            this.$el.style.width = this._width + moveX + "px";
            this.resize.apply(this, [
              {
                area: Resize.AREA.RIGHT,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        }
      } else if (this.draggableY) {
        if (this._getIsInRange(this.startX, this.startY, this.topRange)) {
          if (this.mode.top) {
            if (this.beforeResize.apply(this, [
              {
                area: Resize.AREA.TOP,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]) === false) {
              return;
            }
            this.$el.style.height = this._height - moveY + "px";
            this.$el.style.top = this._top + moveY + "px";
            this.resize.apply(this, [
              {
                area: Resize.AREA.TOP,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.bottomRange
        )) {
          if (this.mode.bottom) {
            if (this.beforeResize.apply(this, [
              {
                area: Resize.AREA.BOTTOM,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]) === false) {
              return;
            }
            this.$el.style.height = this._height + moveY + "px";
            this.resize.apply(this, [
              {
                area: Resize.AREA.BOTTOM,
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        }
      }
    }
  }
  _leave(e) {
    if (this.draggable) {
      this.$el.style.cursor = this.cursor;
      this.draggable = false;
      if (this.draggableX && this.draggableY) {
        if (this._getIsInRange(
          this.startX,
          this.startY,
          this.leftTopRange
        )) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.LEFTTOP
            }
          ]);
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.leftBottomRange
        )) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.LEFTBOTTOM
            }
          ]);
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.rightTopRange
        )) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.RIGHTTOP
            }
          ]);
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.rightBottomRange
        )) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.RIGHTBOTTOM
            }
          ]);
        } else if (this._getIsInRange(this.startX, this.startY, this.leftRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.LEFT
            }
          ]);
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.rightRange
        )) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.RIGHT
            }
          ]);
        } else if (this._getIsInRange(this.startX, this.startY, this.topRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.TOP
            }
          ]);
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.bottomRange
        )) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.BOTTOM
            }
          ]);
        }
      } else if (this.draggableX) {
        if (this._getIsInRange(this.startX, this.startY, this.leftRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.LEFT
            }
          ]);
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.rightRange
        )) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.RIGHT
            }
          ]);
        }
      } else if (this.draggableY) {
        if (this._getIsInRange(this.startX, this.startY, this.topRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.TOP
            }
          ]);
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.bottomRange
        )) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.BOTTOM
            }
          ]);
        }
      }
      this.setRange();
    }
  }
  _setOn() {
    Dap.event.on(this.$el, "touchstart.resize", (e) => {
      this.startX = e.targetTouches[0].pageX;
      this.startY = e.targetTouches[0].pageY;
      this._down(e);
    });
    Dap.event.on(this.$el, "touchmove.resize", (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      let endX = e.targetTouches[0].pageX;
      let endY = e.targetTouches[0].pageY;
      this._move(e, endX, endY);
    });
    Dap.event.on(this.$el, "touchend.resize", (e) => {
      this._leave(e);
    });
    Dap.event.on(this.$el, "mousedown.resize", (e) => {
      this.startX = e.pageX;
      this.startY = e.pageY;
      this._down(e);
    });
    Dap.event.on(
      document.documentElement,
      `mousemove.resize_${this.guid}`,
      (e) => {
        let endX = e.pageX;
        let endY = e.pageY;
        this._move(e, endX, endY);
      }
    );
    Dap.event.on(
      document.documentElement,
      `mouseup.resize_${this.guid}`,
      (e) => {
        this._leave(e);
      }
    );
  }
  _setOff() {
    Dap.event.off(
      document.documentElement,
      `mousemove.resize_${this.guid} mouseup.resize_${this.guid}`
    );
  }
  _createGuid() {
    let guid = Dap.data.get(document.body, "mvi-directives-resize-guid") || 0;
    guid++;
    Dap.data.set(document.body, "mvi-directives-resize-guid", guid);
    return guid;
  }
  disabledDragX() {
    this.draggableX = false;
    this.setRange();
  }
  disabledDragY() {
    this.draggableY = false;
    this.setRange();
  }
  enabledDragX() {
    this.draggableX = true;
    this.setRange();
  }
  enabledDragY() {
    this.draggableY = true;
    this.setRange();
  }
}
Resize.AREA = {
  LEFT: 0,
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3,
  LEFTTOP: 4,
  LEFTBOTTOM: 5,
  RIGHTTOP: 6,
  RIGHTBOTTOM: 7
};
Resize.MODE = {
  LEFT: true,
  TOP: true,
  BOTTOM: true,
  RIGHT: true
};
const Resize$1 = Resize;
Resize$1.install = (app) => {
  app.directive("resize", {
    mounted(el, binding) {
      let options = {};
      if (Dap.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      if (Dap.common.isObject(binding.modifiers)) {
        Object.assign(options, binding.modifiers);
      }
      let resize = new Resize$1(el, options);
      resize.init();
      Dap.data.set(el, "directive:resize", resize);
    },
    beforeUnmount(el, binding) {
      let resize = Dap.data.get(el, "directive:resize");
      if (resize) {
        resize._setOff();
      }
    }
  });
};
class Drag {
  constructor(element, options) {
    this.$el = element;
    if (!Dap.common.isObject(options)) {
      options = {};
    }
    this.$container = options.container;
    this.draggableX = options.draggableX;
    this.draggableY = options.draggableY;
    this.mode = options.mode;
    this.cursor = options.cursor;
    this.drag = options.drag;
    this.beforedrag = options.beforedrag;
    this.dragged = options.dragged;
    this.ready = options.ready;
    this.draggable = false;
    this.hasInit = false;
    this.pageX = 0;
    this.pageY = 0;
    this.guid = this._createGuid();
  }
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!Dap.element.isElement(this.$el)) {
      throw new TypeError(
        "The element that needs to be dragged is not a node element"
      );
    }
    if (typeof this.$container == "string" && this.$container) {
      this.$container = document.body.querySelector(this.$container);
    }
    if (!Dap.element.isElement(this.$container)) {
      this.$container = document.body;
    }
    if (!Dap.element.isContains(this.$container, this.$el)) {
      throw new Error(
        "Elements that need to be dragged are not descendants of container elements"
      );
    }
    if (Dap.element.getCssStyle(this.$container, "position") == "static" && this.$container != document.body) {
      throw new Error(
        "The container element cannot be static positioning"
      );
    }
    if (Dap.element.getCssStyle(this.$el, "position") == "static" || Dap.element.getCssStyle(this.$el, "position") == "relative") {
      throw new Error(
        "The element that need to be dragged cannot be static and relative positioning"
      );
    }
    if (typeof this.draggableY != "boolean") {
      this.draggableY = true;
    }
    if (typeof this.draggableX != "boolean") {
      this.draggableX = true;
    }
    if (this.mode != "on" && this.mode != "in" && this.mode != "over" && this.mode != "out") {
      this.mode = "";
    }
    if (typeof this.cursor != "boolean") {
      this.cursor = true;
    }
    if (typeof this.drag != "function") {
      this.drag = function() {
      };
    }
    if (typeof this.beforedrag != "function") {
      this.beforedrag = function() {
      };
    }
    if (typeof this.dragged != "function") {
      this.dragged = function() {
      };
    }
    if (typeof this.ready != "function") {
      this.ready = function() {
      };
    }
    this._setOn();
    this.ready.apply(this, [this]);
  }
  _setOn() {
    Dap.event.on(this.$el, "touchstart.drag", (e) => {
      if (!this.draggableX && !this.draggableY) {
        return;
      }
      this.pageX = e.targetTouches[0].pageX - Dap.element.getElementPoint(this.$el, this.$container).left;
      this.pageY = e.targetTouches[0].pageY - Dap.element.getElementPoint(this.$el, this.$container).top;
      this.draggable = true;
      if (this.cursor) {
        this.$el.style.cursor = "move";
      }
      this.beforedrag.apply(this, [
        {
          event: e,
          target: this.$el,
          container: this.$container,
          placement: Dap.element.getElementPoint(
            this.$el,
            this.$container
          )
        }
      ]);
    });
    Dap.event.on(this.$el, "touchmove.drag", (e) => {
      if (this.draggable) {
        if (!this.draggableX && !this.draggableY) {
          return;
        }
        if (e.cancelable) {
          e.preventDefault();
        }
        let left = e.targetTouches[0].pageX - this.pageX;
        let top = e.targetTouches[0].pageY - this.pageY;
        if (this.draggableX) {
          this.$el.style.left = left + "px";
        }
        if (this.draggableY) {
          this.$el.style.top = top + "px";
        }
        this._resize();
        if (this.draggableX || this.draggableY) {
          this.drag.apply(this, [
            {
              event: e,
              target: this.$el,
              container: this.$container,
              placement: Dap.element.getElementPoint(
                this.$el,
                this.$container
              )
            }
          ]);
        }
      }
    });
    Dap.event.on(this.$el, "touchend.drag", (e) => {
      if (this.draggable) {
        if (!this.draggableX && !this.draggableY) {
          return;
        }
        this.draggable = false;
        if (this.cursor) {
          this.$el.style.cursor = "";
        }
        this.dragged.apply(this, [
          {
            event: e,
            target: this.$el,
            container: this.$container,
            placement: Dap.element.getElementPoint(
              this.$el,
              this.$container
            )
          }
        ]);
      }
    });
    Dap.event.on(this.$el, "mousedown.drag", (e) => {
      if (!this.draggableX && !this.draggableY) {
        return;
      }
      this.pageX = e.pageX - Dap.element.getElementPoint(this.$el, this.$container).left;
      this.pageY = e.pageY - Dap.element.getElementPoint(this.$el, this.$container).top;
      this.draggable = true;
      if (this.cursor) {
        this.$el.style.cursor = "move";
      }
      this.beforedrag.apply(this, [
        {
          event: e,
          target: this.$el,
          container: this.$container,
          placement: Dap.element.getElementPoint(
            this.$el,
            this.$container
          )
        }
      ]);
    });
    Dap.event.on(
      document.documentElement,
      `mousemove.drag_${this.guid}`,
      (e) => {
        if (this.draggable) {
          if (!this.draggableX && !this.draggableY) {
            return;
          }
          let left = e.pageX - this.pageX;
          let top = e.pageY - this.pageY;
          if (this.draggableX) {
            this.$el.style.left = left + "px";
          }
          if (this.draggableY) {
            this.$el.style.top = top + "px";
          }
          this._resize();
          if (this.draggableX || this.draggableY) {
            this.drag.apply(this, [
              {
                event: e,
                target: this.$el,
                container: this.$container,
                placement: Dap.element.getElementPoint(
                  this.$el,
                  this.$container
                )
              }
            ]);
          }
        }
      }
    );
    Dap.event.on(
      document.documentElement,
      `mouseup.drag_${this.guid}`,
      (e) => {
        if (this.draggable) {
          if (!this.draggableX && !this.draggableY) {
            return;
          }
          this.draggable = false;
          if (this.cursor) {
            this.$el.style.cursor = "";
          }
          this.dragged.apply(this, [
            {
              event: e,
              target: this.$el,
              container: this.$container,
              placement: Dap.element.getElementPoint(
                this.$el,
                this.$container
              )
            }
          ]);
        }
      }
    );
  }
  _setOff() {
    Dap.event.off(
      document.documentElement,
      `mousemove.drag_${this.guid} mouseup.drag_${this.guid}`
    );
  }
  _resize() {
    if (this.mode == "in") {
      if (this.draggableX) {
        if (Dap.element.getElementPoint(this.$el, this.$container).left <= 0) {
          this.$el.style.left = 0;
        }
        if (Dap.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth - this.$el.offsetWidth) {
          this.$el.style.left = this.$container.offsetWidth - this.$el.offsetWidth + "px";
        }
      }
      if (this.draggableY) {
        if (Dap.element.getElementPoint(this.$el, this.$container).top <= 0) {
          this.$el.style.top = 0;
        }
        if (Dap.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight - this.$el.offsetHeight) {
          this.$el.style.top = this.$container.offsetHeight - this.$el.offsetHeight + "px";
        }
      }
    } else if (this.mode == "on") {
      if (this.draggableX) {
        if (Dap.element.getElementPoint(this.$el, this.$container).left <= -this.$el.offsetWidth / 2) {
          this.$el.style.left = -this.$el.offsetWidth / 2 + "px";
        }
        if (Dap.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth - this.$el.offsetWidth / 2) {
          this.$el.style.left = this.$container.offsetWidth - this.$el.offsetWidth / 2 + "px";
        }
      }
      if (this.draggableY) {
        if (Dap.element.getElementPoint(this.$el, this.$container).top <= -this.$el.offsetHeight / 2) {
          this.$el.style.top = -this.$el.offsetHeight / 2 + "px";
        }
        if (Dap.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight - this.$el.offsetHeight / 2) {
          this.$el.style.top = this.$container.offsetHeight - this.$el.offsetHeight / 2 + "px";
        }
      }
    } else if (this.mode == "out") {
      if (this.draggableX) {
        if (Dap.element.getElementPoint(this.$el, this.$container).left <= -this.$el.offsetWidth) {
          this.$el.style.left = -this.$el.offsetWidth + "px";
        }
        if (Dap.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth) {
          this.$el.style.left = this.$container.offsetWidth + "px";
        }
      }
      if (this.draggableY) {
        if (Dap.element.getElementPoint(this.$el, this.$container).top <= -this.$el.offsetHeight) {
          this.$el.style.top = -this.$el.offsetHeight + "px";
        }
        if (Dap.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight) {
          this.$el.style.top = this.$container.offsetHeight + "px";
        }
      }
    }
  }
  _createGuid() {
    let guid = Dap.data.get(document.body, "mvi-directives-drag-guid") || 0;
    guid++;
    Dap.data.set(document.body, "mvi-directives-drag-guid", guid);
    return guid;
  }
  dragTo(left, top) {
    return new Promise((resolve, reject) => {
      this.beforedrag.apply(this, [
        {
          target: this.$el,
          container: this.$container,
          placement: Dap.element.getElementPoint(
            this.$el,
            this.$container
          )
        }
      ]);
      if (this.draggableX) {
        this.$el.style.left = left + "px";
      }
      if (this.draggableY) {
        this.$el.style.top = top + "px";
      }
      this._resize();
      let options = {
        target: this.$el,
        container: this.$container,
        placement: Dap.element.getElementPoint(
          this.$el,
          this.$container
        )
      };
      this.dragged.apply(this, [options]);
      resolve(options);
    });
  }
}
const Drag$1 = Drag;
Drag$1.install = (app) => {
  app.directive("drag", {
    mounted(el, binding) {
      let options = {};
      if (Dap.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      if (Dap.common.isObject(binding.modifiers)) {
        Object.assign(options, binding.modifiers);
      }
      let drag = new Drag$1(el, options);
      drag.init();
      Dap.data.set(el, "directive:drag", drag);
    },
    beforeUnmount(el, binding) {
      let drag = Dap.data.get(el, "directive:drag");
      if (drag) {
        drag._setOff();
      }
    }
  });
};
class Prop {
  constructor(element, ratio) {
    this.$el = element;
    this.ratio = ratio;
    this.width = 0;
    this.height = 0;
    this.hasInit = false;
    this.guid = this._createGuid();
  }
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!Dap.element.isElement(this.$el)) {
      throw new TypeError("The bound element is not a node element");
    }
    if (typeof this.ratio != "number" || isNaN(this.ratio)) {
      this.ratio = 0;
    }
    this._set();
    Dap.event.on(window, `resize.prop_${this.guid}`, (e) => {
      this._set();
    });
  }
  _set() {
    this.width = Number(
      parseFloat(Dap.element.getCssStyle(this.$el, "width")).toFixed(2)
    );
    this.height = this.width * this.ratio;
    this.$el.style.height = this.height + "px";
  }
  _setOff() {
    Dap.event.off(window, `resize.prop_${this.guid}`);
  }
  _createGuid() {
    let guid = Dap.data.get(document.body, "mvi-directives-prop-guid") || 0;
    guid++;
    Dap.data.set(document.body, "mvi-directives-prop-guid", guid);
    return guid;
  }
}
const Prop$1 = Prop;
Prop$1.install = (app) => {
  app.directive("prop", {
    mounted(el, binding) {
      let prop = new Prop$1(el, binding.value);
      prop.init();
      Dap.data.set(el, "directive:prop", prop);
    },
    beforeUnmount(el, binding) {
      let prop = Dap.data.get(el, "directive:prop");
      if (prop) {
        prop._setOff();
      }
    }
  });
};
class Scroll {
  constructor(element, options) {
    this.$el = element;
    if (!Dap.common.isObject(options)) {
      options = {};
    }
    this.top = options.top;
    this.bottom = options.bottom;
    this.hasInit = false;
  }
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!Dap.element.isElement(this.$el)) {
      this.$el = window;
    }
    if (typeof this.top != "function") {
      this.top = function() {
      };
    }
    if (typeof this.bottom != "function") {
      this.bottom = function() {
      };
    }
    Dap.element.scrollTopBottomTrigger(this.$el, (res) => {
      if (res.state == "top") {
        this.top.apply(this, [res.target]);
      } else {
        this.bottom.apply(this, [res.target]);
      }
    });
  }
}
const Scroll$1 = Scroll;
Scroll$1.install = (app) => {
  app.directive("scroll", {
    mounted(el, binding) {
      let options = {};
      if (Dap.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let scroll = new Scroll$1(el, options);
      scroll.init();
    }
  });
};
class Spy {
  constructor(element, options) {
    this.$el = element;
    if (!Dap.common.isObject(options)) {
      options = {};
    }
    this.$root = options.el;
    this.beforeEnter = options.beforeEnter;
    this.enter = options.enter;
    this.beforeLeave = options.beforeLeave;
    this.leave = options.leave;
    this.hasInit = false;
    this.triggerTag = {
      before: false,
      after: false
    };
    this.guid = this._createGuid();
  }
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!Dap.element.isElement(this.$el)) {
      throw new TypeError("The bound element is not a node element");
    }
    if (typeof this.$root == "string" && this.$root) {
      this.$root = document.documentElement.querySelector(this.$root);
    }
    if (!Dap.element.isElement(this.$root)) {
      this.$root = document.body;
    }
    if (typeof this.beforeEnter != "function") {
      this.beforeEnter = function() {
      };
    }
    if (typeof this.enter != "function") {
      this.enter = function() {
      };
    }
    if (typeof this.beforeLeave != "function") {
      this.beforeLeave = function() {
      };
    }
    if (typeof this.leave != "function") {
      this.leave = function() {
      };
    }
    this._scrollHandler();
    Dap.event.on(this.$root, `scroll.spy_${this.guid}`, (e) => {
      this._scrollHandler();
    });
  }
  _scrollHandler() {
    let overflowX = Dap.element.getCssStyle(this.$root, "overflow-x");
    let overflowY = Dap.element.getCssStyle(this.$root, "overflow-y");
    let hasScrollX = overflowX == "auto" || overflowX == "scroll";
    let hasScrollY = overflowY == "auto" || overflowY == "scroll";
    let offsetLeft1 = this.$el.getBoundingClientRect().left - this.$root.getBoundingClientRect().left;
    let offsetLeft2 = this.$el.getBoundingClientRect().right - this.$root.getBoundingClientRect().left;
    let offsetTop1 = this.$el.getBoundingClientRect().top - this.$root.getBoundingClientRect().top;
    let offsetTop2 = this.$el.getBoundingClientRect().bottom - this.$root.getBoundingClientRect().top;
    if (hasScrollX && hasScrollY) {
      if (offsetLeft2 >= 0 && offsetLeft1 <= this.$root.offsetWidth && offsetTop2 >= 0 && offsetTop1 <= this.$root.offsetHeight) {
        if (!this.triggerTag.before) {
          this.beforeEnter(this.$el);
          this.triggerTag.before = true;
        }
      } else {
        if (this.triggerTag.before) {
          this.leave(this.$el);
          this.triggerTag.before = false;
        }
      }
      if (offsetLeft1 >= 0 && offsetLeft2 <= this.$root.offsetWidth && offsetTop1 >= 0 && offsetTop2 <= this.$root.offsetHeight) {
        if (!this.triggerTag.after) {
          this.enter(this.$el);
          this.triggerTag.after = true;
        }
      } else {
        if (this.triggerTag.after) {
          this.beforeLeave(this.$el);
          this.triggerTag.after = false;
        }
      }
    } else if (hasScrollX) {
      if (offsetLeft2 >= 0 && offsetLeft1 <= this.$root.offsetWidth) {
        if (!this.triggerTag.before) {
          this.beforeEnter(this.$el);
          this.triggerTag.before = true;
        }
      } else {
        if (this.triggerTag.before) {
          this.leave(this.$el);
          this.triggerTag.before = false;
        }
      }
      if (offsetLeft1 >= 0 && offsetLeft2 <= this.$root.offsetWidth) {
        if (!this.triggerTag.after) {
          this.enter(this.$el);
          this.triggerTag.after = true;
        }
      } else {
        if (this.triggerTag.after) {
          this.beforeLeave(this.$el);
          this.triggerTag.after = false;
        }
      }
    } else if (hasScrollY) {
      if (offsetTop2 >= 0 && offsetTop1 <= this.$root.offsetHeight) {
        if (!this.triggerTag.before) {
          this.beforeEnter(this.$el);
          this.triggerTag.before = true;
        }
      } else {
        if (this.triggerTag.before) {
          this.leave(this.$el);
          this.triggerTag.before = false;
        }
      }
      if (offsetTop1 >= 0 && offsetTop2 <= this.$root.offsetHeight) {
        if (!this.triggerTag.after) {
          this.enter(this.$el);
          this.triggerTag.after = true;
        }
      } else {
        if (this.triggerTag.after) {
          this.beforeLeave(this.$el);
          this.triggerTag.after = false;
        }
      }
    }
  }
  _setOff() {
    Dap.event.off(this.$root, `scroll.spy_${this.guid}`);
  }
  _createGuid() {
    let guid = Dap.data.get(document.body, "mvi-directives-spy-guid") || 0;
    guid++;
    Dap.data.set(document.body, "mvi-directives-spy-guid", guid);
    return guid;
  }
}
const Spy$1 = Spy;
Spy$1.install = (app) => {
  app.directive("spy", {
    mounted(el, binding) {
      let options = {};
      if (Dap.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let spy = new Spy$1(el, options);
      spy.init();
      Dap.data.set(el, "directive:spy", spy);
    },
    beforeUnmount(el, binding) {
      let spy = Dap.data.get(el, "directive:spy");
      if (spy) {
        spy._setOff();
      }
    }
  });
};
class Observe {
  constructor(el, options) {
    this.$el = el;
    if (!Dap.common.isObject(options)) {
      options = {};
    }
    this.attributes = options.attributes;
    this.childList = options.childList;
    this.subtree = options.subtree;
    this.attributeNames = options.attributeNames;
    this.attributesChange = options.attributesChange;
    this.childNodesChange = options.childNodesChange;
    this.hasInit = false;
  }
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!Dap.element.isElement(this.$el)) {
      throw new TypeError("The element that needs to be observed is not a node element");
    }
    try {
      if (typeof this.attributes != "boolean") {
        this.attributes = false;
      }
      if (typeof this.childList != "boolean") {
        this.childList = false;
      }
      if (typeof this.subtree != "boolean") {
        this.subtree = false;
      }
      if (!(this.attributeNames instanceof Array)) {
        this.attributeNames = [];
      }
      if (typeof this.attributesChange != "function") {
        this.attributesChange = function() {
        };
      }
      if (typeof this.childNodesChange != "function") {
        this.childNodesChange = function() {
        };
      }
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      let observer = new MutationObserver((mutationList) => {
        let length = mutationList.length;
        for (let i = 0; i < length; i++) {
          if (mutationList[i].type == "attributes" && this.attributes) {
            this.attributesChange.apply(this, [mutationList[i].attributeName, this.$el.getAttribute(mutationList[i].attributeName), mutationList[i].oldValue]);
          } else if (mutationList[i].type == "childList" && this.childList) {
            for (let node of mutationList[i].addedNodes) {
              if (Dap.element.isElement(node)) {
                this.childNodesChange.apply(this, [node, null]);
              }
            }
            for (let node of mutationList[i].removedNodes) {
              if (Dap.element.isElement(node)) {
                this.childNodesChange.apply(this, [null, node]);
              }
            }
          }
        }
      });
      if (this.attributes) {
        if (this.attributeNames.length > 0) {
          observer.observe(this.$el, {
            attributes: this.attributes,
            attributeFilter: this.attributeNames,
            attributeOldValue: true,
            childList: this.childList,
            subtree: this.subtree
          });
        } else {
          observer.observe(this.$el, {
            attributes: this.attributes,
            attributeOldValue: true,
            childList: this.childList,
            subtree: this.subtree
          });
        }
      } else {
        observer.observe(this.$el, {
          attributes: this.attributes,
          childList: this.childList,
          subtree: this.subtree
        });
      }
    } catch (e) {
      throw new Error("Listening failed. Your browser may not support it, or childList and attributes are false, meaning there are no objects to listen on");
    }
  }
}
const Observe$1 = Observe;
Observe$1.install = (app) => {
  app.directive("observe", {
    mounted(el, binding) {
      let options = {};
      if (Dap.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let observe = new Observe$1(el, options);
      observe.init();
    }
  });
};
class Upload {
  constructor(element, options) {
    this.$el = element;
    if (!Dap.common.isObject(options)) {
      options = {};
    }
    this.$selectInput = null;
    this.files = [];
    this.accept = options.accept;
    this.capture = options.capture;
    this.allowedFileType = options.allowedFileType;
    this.minSize = options.minSize;
    this.maxSize = options.maxSize;
    this.maxLength = options.maxLength;
    this.minLength = options.minLength;
    this.multiple = options.multiple;
    this.append = options.append;
    this.error = options.error;
    this.select = options.select;
    this.disabled = options.disabled;
    this.ready = options.ready;
    this.extra = options.extra;
    this.hasInit = false;
  }
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!Dap.element.isElement(this.$el)) {
      throw new TypeError("The upload element is not specified");
    }
    if (!(this.allowedFileType instanceof Array)) {
      this.allowedFileType = [];
    }
    if (!Dap.number.isNumber(this.minSize) || this.minSize <= 0) {
      this.minSize = -1;
    }
    if (!Dap.number.isNumber(this.maxSize) || this.maxSize <= 0) {
      this.maxSize = -1;
    }
    if (!Dap.number.isNumber(this.maxLength) || this.maxLength <= 0) {
      this.maxLength = -1;
    }
    if (!Dap.number.isNumber(this.minLength) || this.minLength <= 0) {
      this.minLength = -1;
    }
    if (typeof this.multiple != "boolean") {
      this.multiple = false;
    }
    if (typeof this.capture != "boolean") {
      this.capture = false;
    }
    if (typeof this.append != "boolean") {
      this.append = false;
    }
    if (typeof this.disabled != "boolean") {
      this.disabled = false;
    }
    if (typeof this.error != "function") {
      this.error = function() {
      };
    }
    if (typeof this.select != "function") {
      this.select = function() {
      };
    }
    if (typeof this.ready != "function") {
      this.ready = function() {
      };
    }
    if (typeof this.extra != "object") {
      this.extra = {};
    }
    this.$selectInput = Dap.element.string2dom("<input type='file' />");
    if (this.accept === "rar") {
      this.$selectInput.setAttribute(
        "accept",
        "application/x-rar-compressed"
      );
    } else if (this.accept === "zip") {
      this.$selectInput.setAttribute(
        "accept",
        "application/x-zip-compressed"
      );
    } else if (this.accept === "txt") {
      this.$selectInput.setAttribute("accept", "text/plain");
    } else if (this.accept === "image") {
      this.$selectInput.setAttribute("accept", "image/*");
      if (this.capture) {
        this.$selectInput.setAttribute("capture", "camera");
      }
    } else if (this.accept === "video") {
      this.$selectInput.setAttribute("accept", "video/*");
      if (this.capture) {
        this.$selectInput.setAttribute("capture", "camcorder");
      }
    } else if (this.accept === "audio") {
      this.$selectInput.setAttribute("accept", "aduio/*");
    } else if (this.accept === "html") {
      this.$selectInput.setAttribute("accept", "text/html");
    } else if (this.accept === "doc") {
      this.$selectInput.setAttribute("accept", "application/msword");
    } else if (this.accept === "xml") {
      this.$selectInput.setAttribute("accept", "text/xml");
    } else if (this.accept === "js") {
      this.$selectInput.setAttribute("accept", "text/javascript");
    } else if (this.accept === "json") {
      this.$selectInput.setAttribute("accept", "application/json");
    } else if (this.accept === "ppt") {
      this.$selectInput.setAttribute(
        "accept",
        "application/vnd.ms-powerpoint"
      );
    } else if (this.accept === "pdf") {
      this.$selectInput.setAttribute("accept", "application/pdf");
    }
    if (this.multiple) {
      this.$selectInput.setAttribute("multiple", "multiple");
    }
    if (this.disabled) {
      this.$el.setAttribute("disabled", "disabled");
    }
    this.$el.onclick = (e) => {
      if (this.disabled) {
        return;
      }
      this.$selectInput.click();
    };
    this.$selectInput.onchange = (e) => {
      if (this.disabled) {
        return;
      }
      let files = [...this.$selectInput.files];
      this.$selectInput.value = "";
      if (!this.append) {
        this.files = [];
      }
      let length = files.length;
      let isAllAccord = true;
      for (let i = 0; i < length; i++) {
        if (!this._judgeSuffix(files[i].name)) {
          this.error.apply(this, [
            Upload.ERRORTYPE.FILE_SUFFIX_ERROR,
            "\u6587\u4EF6" + files[i].name + "\u4E0D\u7B26\u5408\u89C4\u5B9A\u7684\u6587\u4EF6\u540E\u7F00\u7C7B\u578B",
            files[i]
          ]);
          isAllAccord = false;
          break;
        }
        if (files[i].size / 1024 > this.maxSize && this.maxSize > 0) {
          this.error.apply(this, [
            Upload.ERRORTYPE.FILE_MAXSIZE_ERROR,
            "\u6587\u4EF6" + files[i].name + "\u8D85\u51FA\u6587\u4EF6\u6700\u5927\u503C\u9650\u5B9A",
            files[i]
          ]);
          isAllAccord = false;
          break;
        }
        if (files[i].size / 1024 < this.minSize && this.minSize > 0) {
          this.error.apply(this, [
            Upload.ERRORTYPE.FILE_MINSIZE_ERROR,
            "\u6587\u4EF6" + files[i].name + "\u6CA1\u6709\u8FBE\u5230\u6587\u4EF6\u6700\u5C0F\u503C\u9650\u5B9A",
            files[i]
          ]);
          isAllAccord = false;
          break;
        }
        if (this.files.length + length > this.maxLength && this.maxLength > 0) {
          this.error.apply(this, [
            Upload.ERRORTYPE.FILE_MAXLENGTH_ERROR,
            "\u6587\u4EF6\u6570\u91CF\u8D85\u51FA\u9650\u5B9A\u7684\u6700\u5927\u503C"
          ]);
          isAllAccord = false;
          break;
        }
      }
      if (!isAllAccord) {
        return;
      }
      if (this.files.length + length < this.minLength && this.minLength > 0) {
        this.error.apply(this, [
          Upload.ERRORTYPE.FILE_MINLENGTH_ERROR,
          "\u6587\u4EF6\u6570\u91CF\u6CA1\u6709\u8FBE\u5230\u9650\u5B9A\u7684\u6700\u5C0F\u503C"
        ]);
        return;
      }
      this.files = [...this.files, ...files];
      this.select.apply(this, [[...this.files], { ...this.extra }]);
    };
    this.ready.apply(this, [this]);
  }
  _judgeSuffix(fileName) {
    let suffix = fileName.substr(fileName.lastIndexOf(".") + 1);
    if (this.allowedFileType.length == 0) {
      return true;
    } else {
      suffix = suffix.toLocaleLowerCase();
      for (let i = 0; i < this.allowedFileType.length; i++) {
        this.allowedFileType[i] = this.allowedFileType[i].toLocaleLowerCase();
      }
      return this.allowedFileType.includes(suffix);
    }
  }
  getFiles() {
    return {
      files: [...this.files],
      extra: { ...this.extra }
    };
  }
  clear() {
    this.files = [];
    this.$selectInput.value = "";
    this.select.apply(this, [[...this.files], { ...this.extra }]);
  }
  setDisabled() {
    this.disabled = true;
    this.$el.setAttribute("disabled", "disabled");
  }
  setEnabled() {
    this.disabled = false;
    this.$el.removeAttribute("disabled");
  }
}
Upload.ERRORTYPE = {
  FILE_SUFFIX_ERROR: 101,
  FILE_MAXSIZE_ERROR: 102,
  FILE_MINSIZE_ERROR: 103,
  FILE_MAXLENGTH_ERROR: 104,
  FILE_MINLENGTH_ERROR: 105
};
const Upload$1 = Upload;
Upload$1.install = (app) => {
  app.directive("upload", {
    mounted(el, binding) {
      let options = {};
      if (Dap.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      if (Dap.common.isObject(binding.modifiers)) {
        Object.assign(options, binding.modifiers);
      }
      let upload = new Upload$1(el, options);
      upload.init();
    }
  });
};
class Px {
  constructor(element, options) {
    this.$el = element;
    if (!Dap.common.isObject(options)) {
      options = {};
    }
    this.attrName = options.attrName;
    this.isAfter = options.after;
    this.isBefore = options.before;
    this.hasInit = false;
  }
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!Dap.element.isElement(this.$el)) {
      throw new TypeError("The bound element is not a node element");
    }
    if (typeof this.attrName != "string" || !this.attrName) {
      throw new Error("The attribute name is not set");
    }
    if (typeof this.isAfter != "boolean") {
      this.isAfter = false;
    }
    if (typeof this.isBefore != "boolean") {
      this.isBefore = false;
    }
    this._do();
  }
  _do() {
    let dpr = Math.round(window.devicePixelRatio || 1);
    let value = Number((1 / dpr).toFixed(2));
    if (this.isBefore || this.isAfter) {
      let guid = this._createGuid();
      let className = `mvi-directives-px_${guid}`;
      Dap.element.addClass(this.$el, className);
      let style = document.createElement("style");
      style.type = "text/css";
      if (this.isBefore) {
        style.innerHTML = `.${className}::before {${this.attrName}:${value}px !important;}`;
      }
      if (this.isAfter) {
        style.innerHTML = `.${className}::after {${this.attrName}:${value}px !important;}`;
      }
      document.querySelector("head").appendChild(style);
    } else {
      this.$el.style.setProperty(this.attrName, value + "px", "important");
    }
  }
  _createGuid() {
    let guid = Dap.data.get(document.body, "mvi-directives-px-guid") || 0;
    guid++;
    Dap.data.set(document.body, "mvi-directives-px-guid", guid);
    return guid;
  }
}
const Px$1 = Px;
Px$1.install = (app) => {
  app.directive("px", {
    mounted(el, binding) {
      let options = {};
      if (Dap.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      if (Dap.common.isObject(binding.modifiers)) {
        Object.assign(options, binding.modifiers);
      }
      if (binding.arg) {
        options.attrName = binding.arg;
      }
      let px = new Px$1(el, options);
      px.init();
    }
  });
};
class Ripple {
  constructor(element, options) {
    this.$el = element;
    if (!Dap.common.isObject(options)) {
      options = {};
    }
    this.color = options.color;
    this.duration = options.duration;
    this.finalOpacity = options.finalOpacity;
    this.initialOpacity = options.initialOpacity;
    this.delay = options.delay;
    this.disabled = options.disabled;
    this.hasInit = false;
    this.guid = this._createGuid();
    this.rippleContainers = [];
  }
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!Dap.element.isElement(this.$el)) {
      throw new TypeError("The bound element is not a node element");
    }
    if (typeof this.color != "string") {
      this.color = "#9f9f9f";
    }
    if (!Dap.number.isNumber(this.duration)) {
      this.duration = 600;
    }
    if (!Dap.number.isNumber(this.finalOpacity)) {
      this.finalOpacity = 0.1;
    }
    if (!Dap.number.isNumber(this.initialOpacity)) {
      this.initialOpacity = 0.1;
    }
    if (!Dap.number.isNumber(this.delay)) {
      this.delay = 80;
    }
    if (typeof this.disabled != "boolean") {
      this.disabled = false;
    }
    if (Dap.element.getCssStyle(this.$el, "position") != "relative" && Dap.element.getCssStyle(this.$el, "position") != "absolute" && Dap.element.getCssStyle(this.$el, "position") != "fixed") {
      this.$el.style.position = "relative";
    }
    const downFn = (pageX, pageY) => {
      if (this.disabled) {
        return;
      }
      const rippleContainer = this._createRippleContainer();
      const rippleEl = this._createRippleElement(pageX, pageY);
      this.$el.appendChild(rippleContainer);
      rippleContainer.appendChild(rippleEl);
      this.rippleContainers.push(rippleContainer);
      setTimeout(() => {
        rippleEl.style.transform = "scale(1)";
        rippleEl.style.opacity = this.finalOpacity;
        setTimeout(() => {
          Dap.data.set(rippleContainer, "ripple-animation-end", true);
          this._endDeal(rippleContainer);
        }, this.duration);
      }, this.delay);
    };
    const upFn = () => {
      if (this.rippleContainers.length) {
        this.rippleContainers.forEach((rippleContainer) => {
          Dap.data.set(rippleContainer, "ripple-up", true);
          this._endDeal(rippleContainer);
        });
      }
    };
    Dap.event.on(this.$el, "mousedown.ripple", (e) => {
      downFn(e.pageX, e.pageY);
    });
    Dap.event.on(this.$el, "touchstart.ripple", (e) => {
      downFn(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    });
    Dap.event.on(document.documentElement, `mouseup.ripple_${this.guid}`, upFn);
    Dap.event.on(this.$el, `touchend.ripple`, upFn);
  }
  _setOff() {
    Dap.event.off(document.documentElement, `mouseup.ripple_${this.guid}`);
  }
  _endDeal(rippleContainer) {
    const rippleUp = Dap.data.get(rippleContainer, "ripple-up");
    const rippleAnimationEnd = Dap.data.get(rippleContainer, "ripple-animation-end");
    if (rippleUp && rippleAnimationEnd) {
      const destoryDuration = 100;
      const rippleEls = Dap.element.children(rippleContainer);
      const rippleEl = rippleEls[0];
      rippleEl.style.transition = `opacity ${destoryDuration}ms ease-in-out`;
      rippleEl.offsetWidth;
      rippleEl.style.opacity = 0;
      setTimeout(() => {
        this.rippleContainers = this.rippleContainers.filter((el) => {
          return el != rippleContainer;
        });
        rippleContainer.remove();
      }, destoryDuration);
    }
  }
  _createRippleElement(pageX, pageY) {
    const rect = Dap.element.getElementBounding(this.$el);
    const { x1, x2, y1, y2, r } = this._getRadius(pageX, pageY, rect);
    const el = Dap.element.string2dom("<div></div>");
    el.style.width = r * 2 + "px";
    el.style.height = r * 2 + "px";
    el.style.position = "absolute";
    el.style.background = this.color;
    el.style.top = y1 - r + "px";
    el.style.left = x1 - r + "px";
    el.style.zIndex = 1;
    el.style.borderRadius = "50%";
    el.style.transform = "scale(0)";
    el.style.opacity = this.initialOpacity;
    el.style.transition = `transform ${this.duration}ms cubic-bezier(0, 0.5, 0.25, 1), opacity ${this.duration}ms cubic-bezier(0.0, 0, 0.2, 1)`;
    return el;
  }
  _createRippleContainer() {
    const el = Dap.element.string2dom("<div></div>");
    el.style.position = "absolute";
    el.style.left = "0px";
    el.style.top = "0px";
    el.style.width = Dap.element.getCssStyle(this.$el, "width");
    el.style.height = Dap.element.getCssStyle(this.$el, "height");
    el.style.background = "transparent";
    el.style.borderRadius = Dap.element.getCssStyle(this.$el, "border-radius");
    el.style.overflow = "hidden";
    el.style.pointerEvents = "none";
    el.style.transform = "rotate(0deg)";
    return el;
  }
  _getRadius(pageX, pageY, rect) {
    const x1 = pageX - rect.left;
    const y1 = pageY - rect.top;
    const x2 = this.$el.offsetWidth - x1;
    const y2 = this.$el.offsetHeight - y1;
    const topLeft = Math.sqrt(x1 * x1 + y1 * y1);
    const topRight = Math.sqrt(x2 * x2 + y1 * y1);
    const bottomLeft = Math.sqrt(x1 * x1 + y2 * y2);
    const bottomRight = Math.sqrt(x2 * x2 + y2 * y2);
    return {
      r: Math.round(Math.max(topLeft, topRight, bottomLeft, bottomRight)),
      x1,
      x2,
      y1,
      y2
    };
  }
  _createGuid() {
    let guid = Dap.data.get(document.documentElement, "mvi-directives-ripple-guid") || 0;
    guid++;
    Dap.data.set(document.documentElement, "mvi-directives-ripple-guid", guid);
    return guid;
  }
}
const Ripple$1 = Ripple;
Ripple$1.install = (app) => {
  app.directive("ripple", {
    mounted(el, binding) {
      let options = {};
      if (Dap.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let ripple = new Ripple$1(el, options);
      ripple.init();
      Dap.data.set(el, "directive:ripple", ripple);
    },
    beforeUnmount(el, binding) {
      let ripple = Dap.data.get(el, "directive:ripple");
      if (ripple) {
        ripple._setOff();
      }
    }
  });
};
const icon_vue_vue_type_style_index_0_scoped_44e52e00_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$18 = {
  name: "m-icon",
  props: {
    type: {
      type: String,
      default: ""
    },
    spin: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    iconStyle() {
      let style = {};
      if (this.url) {
        style.backgroundImage = "url(" + this.url + ")";
        if (this.size) {
          style.width = this.size;
          style.height = this.size;
        }
      } else {
        if (this.size) {
          style.fontSize = this.size;
        }
        if (this.color) {
          style.color = this.color;
        }
      }
      return style;
    }
  }
};
function _sfc_render$18(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.url ? (openBlock(), createElementBlock("i", {
    key: 0,
    class: normalizeClass(["mvi-icon-url", $props.spin ? "mvi-icon-spin" : ""]),
    style: normalizeStyle($options.iconStyle)
  }, null, 6)) : (openBlock(), createElementBlock("i", {
    key: 1,
    class: normalizeClass(["mvi-icon", "icon-" + $props.type, $props.spin ? "mvi-icon-spin" : ""]),
    style: normalizeStyle($options.iconStyle)
  }, null, 6));
}
const Icon = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["render", _sfc_render$18], ["__scopeId", "data-v-44e52e00"]]);
Icon.install = (app) => {
  app.component(Icon.name, Icon);
};
const button_vue_vue_type_style_index_0_scoped_0c288442_lang = "";
const _sfc_main$17 = {
  name: "m-button",
  props: {
    type: {
      type: String,
      default: "default",
      validator(value) {
        return [
          "default",
          "info",
          "success",
          "error",
          "warn",
          "primary"
        ].includes(value);
      }
    },
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return ["mini", "small", "medium", "large"].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    nativeType: {
      type: String,
      default: "button"
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadText: {
      type: String,
      default: "loading..."
    },
    formControl: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: "button"
    },
    plain: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    },
    subColor: {
      type: String,
      default: null
    },
    round: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    loadIcon: {
      type: [String, Object],
      default: null
    }
  },
  computed: {
    iconType() {
      let type = "load-e";
      if (Dap.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.type == "string") {
          type = this.loadIcon.type;
        }
      } else if (typeof this.loadIcon == "string") {
        type = this.loadIcon;
      }
      return type;
    },
    iconUrl() {
      let url = null;
      if (Dap.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.url == "string") {
          url = this.loadIcon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = true;
      if (Dap.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.spin == "boolean") {
          spin = this.loadIcon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (Dap.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.size == "string") {
          size = this.loadIcon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color = null;
      if (Dap.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.color == "string") {
          color = this.loadIcon.color;
        }
      }
      return color;
    },
    btnStyle() {
      let obj = {};
      if (this.plain) {
        if (this.color) {
          obj.color = this.color;
          obj.borderColor = this.color;
          obj.background = this.subColor || "#fff";
        }
      } else {
        if (this.color) {
          obj.background = this.color;
          obj.borderColor = this.color;
          obj.color = this.subColor || "#fff";
        }
      }
      return obj;
    },
    btnClass() {
      let cls = ["mvi-button"];
      if (this.type) {
        cls.push("mvi-button-" + this.type);
      }
      if (this.size) {
        cls.push("mvi-button-" + this.size);
      }
      if (this.round) {
        cls.push("mvi-button-radius-round");
      } else if (this.square) {
        cls.push("mvi-button-radius-square");
      }
      if (this.formControl) {
        cls.push("mvi-button-form-control");
      }
      if (this.plain) {
        cls.push("mvi-button-plain");
      }
      if (this.active && !this.disabled) {
        cls.push("mvi-button-active");
      }
      if (this.loading) {
        cls.push("mvi-button-loading");
      }
      return cls;
    }
  },
  components: {
    Button: {
      render() {
        let attrs = {};
        if (this.$parent.tag.toLocaleUpperCase() == "BUTTON") {
          attrs.type = this.$parent.nativeType;
        }
        return h(this.$parent.tag, attrs, {
          default: this.$slots.default
        });
      }
    },
    Icon
  }
};
const _hoisted_1$Q = { key: 0 };
function _sfc_render$17(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Button = resolveComponent("Button", true);
  return openBlock(), createBlock(_component_Button, {
    disabled: $props.disabled || null,
    class: normalizeClass($options.btnClass),
    style: normalizeStyle($options.btnStyle)
  }, {
    default: withCtx(() => [
      $props.loading && _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : $props.loading ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createVNode(_component_Icon, {
          type: $options.iconType,
          color: $options.iconColor,
          url: $options.iconUrl,
          spin: $options.iconSpin,
          size: $options.iconSize,
          class: "mvi-button-load-icon"
        }, null, 8, ["type", "color", "url", "spin", "size"]),
        $props.loadText ? (openBlock(), createElementBlock("span", _hoisted_1$Q, toDisplayString($props.loadText), 1)) : createCommentVNode("", true)
      ], 64)) : renderSlot(_ctx.$slots, "default", { key: 2 }, void 0, true)
    ]),
    _: 3
  }, 8, ["disabled", "class", "style"]);
}
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["render", _sfc_render$17], ["__scopeId", "data-v-0c288442"]]);
Button.install = (app) => {
  app.component(Button.name, Button);
};
const cell_vue_vue_type_style_index_0_scoped_83bc985d_lang = "";
const _sfc_main$16 = {
  name: "m-cell",
  props: {
    icon: {
      type: [String, Object],
      default: null
    },
    title: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    border: {
      type: Boolean,
      default: null
    },
    arrow: {
      type: [String, Object],
      default: null
    },
    titleClass: {
      type: String,
      default: null
    },
    contentClass: {
      type: String,
      default: null
    },
    labelClass: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: null
    },
    ellipsis: {
      type: [Boolean, Number],
      default: null
    },
    noWrap: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconType() {
      let type = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.type == "string") {
          type = this.icon.type;
        }
      } else if (typeof this.icon == "string") {
        type = this.icon;
      }
      return type;
    },
    iconUrl() {
      let url = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.url == "string") {
          url = this.icon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.spin == "boolean") {
          spin = this.icon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.size == "string") {
          size = this.icon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.color == "string") {
          color = this.icon.color;
        }
      }
      return color;
    },
    arrowType() {
      let type = null;
      if (Dap.common.isObject(this.arrow)) {
        if (typeof this.arrow.type == "string") {
          type = this.arrow.type;
        }
      } else if (typeof this.arrow == "string") {
        type = this.arrow;
      }
      return type;
    },
    arrowUrl() {
      let url = null;
      if (Dap.common.isObject(this.arrow)) {
        if (typeof this.arrow.url == "string") {
          url = this.arrow.url;
        }
      }
      return url;
    },
    arrowSpin() {
      let spin = false;
      if (Dap.common.isObject(this.arrow)) {
        if (typeof this.arrow.spin == "boolean") {
          spin = this.arrow.spin;
        }
      }
      return spin;
    },
    arrowSize() {
      let size = null;
      if (Dap.common.isObject(this.arrow)) {
        if (typeof this.arrow.size == "string") {
          size = this.arrow.size;
        }
      }
      return size;
    },
    arrowColor() {
      let color = null;
      if (Dap.common.isObject(this.arrow)) {
        if (typeof this.arrow.color == "string") {
          color = this.arrow.color;
        }
      }
      return color;
    },
    computedActive() {
      if (typeof this.active == "boolean") {
        return this.active;
      } else if (typeof this.$parent.active == "boolean") {
        return this.$parent.active;
      } else {
        return true;
      }
    },
    computedBorder() {
      if (typeof this.border == "boolean") {
        return this.border;
      } else if (typeof this.$parent.border == "boolean") {
        return this.$parent.border;
      } else {
        return false;
      }
    },
    labelTextStyle() {
      let style = {};
      if (this.ellipsis) {
        style.display = "-webkit-box";
        style.textOverflow = "ellipsis";
        style.webkitBoxOrient = "vertical";
        style.overflow = "hidden";
        if (typeof this.ellipsis == "boolean") {
          style.webkitLineClamp = 3;
        } else {
          style.webkitLineClamp = this.ellipsis;
        }
      }
      return style;
    },
    cellClass() {
      let cls = ["mvi-cell"];
      if (this.computedBorder) {
        cls.push("mvi-cell-border");
      }
      if (this.computedActive) {
        cls.push("mvi-cell-active");
      }
      return cls;
    }
  },
  components: {
    Icon
  }
};
const _hoisted_1$P = { class: "mvi-cell-item" };
const _hoisted_2$H = ["textContent"];
const _hoisted_3$z = ["textContent"];
const _hoisted_4$o = ["textContent"];
function _sfc_render$16(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.cellClass)
  }, [
    createElementVNode("div", _hoisted_1$P, [
      $options.iconType || $options.iconUrl ? (openBlock(), createBlock(_component_Icon, {
        key: 0,
        class: "mvi-cell-icon",
        type: $options.iconType,
        url: $options.iconUrl,
        spin: $options.iconSpin,
        size: $options.iconSize,
        color: $options.iconColor
      }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
      createElementVNode("div", {
        class: normalizeClass(["mvi-cell-title", $props.noWrap ? "mvi-cell-nowrap" : ""])
      }, [
        _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", {
          key: 1,
          textContent: toDisplayString($props.title),
          class: normalizeClass($props.titleClass || "")
        }, null, 10, _hoisted_2$H))
      ], 2),
      _ctx.$slots.content || $props.content ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(["mvi-cell-content", $props.noWrap ? "mvi-cell-nowrap" : ""])
      }, [
        _ctx.$slots.content ? renderSlot(_ctx.$slots, "content", { key: 0 }, void 0, true) : $props.content ? (openBlock(), createElementBlock("span", {
          key: 1,
          textContent: toDisplayString($props.content),
          class: normalizeClass($props.contentClass || "")
        }, null, 10, _hoisted_3$z)) : createCommentVNode("", true)
      ], 2)) : createCommentVNode("", true),
      $options.arrowType || $options.arrowUrl ? (openBlock(), createBlock(_component_Icon, {
        key: 2,
        class: "mvi-cell-arrow",
        type: $options.arrowType,
        url: $options.arrowUrl,
        spin: $options.arrowSpin,
        size: $options.arrowSize,
        color: $options.arrowColor
      }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
    ]),
    $props.label || _ctx.$slots.label ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["mvi-cell-label", $props.labelClass || ""]),
      style: normalizeStyle($options.labelTextStyle)
    }, [
      _ctx.$slots.label ? renderSlot(_ctx.$slots, "label", { key: 0 }, void 0, true) : $props.label ? (openBlock(), createElementBlock("span", {
        key: 1,
        textContent: toDisplayString($props.label)
      }, null, 8, _hoisted_4$o)) : createCommentVNode("", true)
    ], 6)) : createCommentVNode("", true)
  ], 2);
}
const Cell = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["render", _sfc_render$16], ["__scopeId", "data-v-83bc985d"]]);
Cell.install = (app) => {
  app.component(Cell.name, Cell);
};
const cellGroup_vue_vue_type_style_index_0_scoped_6a350c82_lang = "";
const _sfc_main$15 = {
  name: "m-cell-group",
  props: {
    title: {
      type: String,
      default: null
    },
    border: {
      type: Boolean,
      default: true
    },
    titleClass: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: true
    }
  }
};
const _hoisted_1$O = ["textContent"];
function _sfc_render$15(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-cell-group", $props.border ? "mvi-cell-group-border" : ""])
  }, [
    $props.title ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["mvi-cell-group-title", $props.titleClass || ""]),
      textContent: toDisplayString($props.title)
    }, null, 10, _hoisted_1$O)) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
const CellGroup = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["render", _sfc_render$15], ["__scopeId", "data-v-6a350c82"]]);
CellGroup.install = (app) => {
  app.component(CellGroup.name, CellGroup);
};
const navbar_vue_vue_type_style_index_0_scoped_f1ea8e90_lang = "";
const _sfc_main$14 = {
  name: "m-navbar",
  props: {
    title: {
      type: String,
      default: null
    },
    leftText: {
      type: String,
      default: null
    },
    rightText: {
      type: String,
      default: null
    },
    leftIcon: {
      type: [String, Object],
      default: null
    },
    rightIcon: {
      type: [String, Object],
      default: null
    },
    fixed: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 400
    },
    leftClass: {
      type: String,
      default: null
    },
    titleClass: {
      type: String,
      default: null
    },
    rightClass: {
      type: String,
      default: null
    }
  },
  emits: ["left-click", "right-click", "title-click"],
  computed: {
    leftStyle() {
      let style = {};
      if (this.title || this.$slots.title) {
        style.width = "20%";
      } else if (this.rightIconType || this.rightIconUrl || this.$slots.right || this.rightText) {
        style.width = "50%";
      } else {
        style.width = "100%";
      }
      return style;
    },
    rightStyle() {
      let style = {};
      if (this.title || this.$slots.title) {
        style.width = "20%";
      } else if (this.leftIconType || this.leftIconUrl || this.$slots.left || this.leftText) {
        style.width = "50%";
      } else {
        style.width = "100%";
      }
      return style;
    },
    leftIconType() {
      let type = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.type == "string") {
          type = this.leftIcon.type;
        }
      } else if (typeof this.leftIcon == "string") {
        type = this.leftIcon;
      }
      return type;
    },
    leftIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.url == "string") {
          url = this.leftIcon.url;
        }
      }
      return url;
    },
    leftIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.spin == "boolean") {
          spin = this.leftIcon.spin;
        }
      }
      return spin;
    },
    leftIconSize() {
      let size = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.size == "string") {
          size = this.leftIcon.size;
        }
      }
      return size;
    },
    leftIconColor() {
      let color = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.color == "string") {
          color = this.leftIcon.color;
        }
      }
      return color;
    },
    rightIconType() {
      let type = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.type == "string") {
          type = this.rightIcon.type;
        }
      } else if (typeof this.rightIcon == "string") {
        type = this.rightIcon;
      }
      return type;
    },
    rightIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.url == "string") {
          url = this.rightIcon.url;
        }
      }
      return url;
    },
    rightIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.spin == "boolean") {
          spin = this.rightIcon.spin;
        }
      }
      return spin;
    },
    rightIconSize() {
      let size = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.size == "string") {
          size = this.rightIcon.size;
        }
      }
      return size;
    },
    rightIconColor() {
      let color = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.color == "string") {
          color = this.rightIcon.color;
        }
      }
      return color;
    },
    navbarClass() {
      let cls = ["mvi-navbar"];
      if (this.fixed) {
        cls.push("mvi-navbar-fixed");
      }
      if (this.border) {
        cls.push("mvi-navbar-border");
      }
      return cls;
    },
    centerStyle() {
      let style = {};
      if (this.rightIconType || this.rightIconUrl || this.$slots.right || this.rightText || this.leftIconType || this.leftIconUrl || this.$slots.left || this.leftText) {
        style.width = "60%";
      } else {
        style.width = "100%";
      }
      return style;
    }
  },
  components: {
    Icon
  },
  methods: {
    leftClick() {
      this.$emit("left-click");
    },
    rightClick() {
      this.$emit("right-click");
    },
    titleClick() {
      this.$emit("title-click");
    }
  }
};
const _hoisted_1$N = ["textContent"];
const _hoisted_2$G = ["textContent"];
const _hoisted_3$y = ["textContent"];
function _sfc_render$14(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.navbarClass),
    style: normalizeStyle("z-index:" + ($props.fixed ? $props.zIndex : ""))
  }, [
    $options.leftIconType || $options.leftIconUrl || _ctx.$slots.left || $props.leftText ? (openBlock(), createElementBlock("div", {
      key: 0,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.leftClick && $options.leftClick(...args)),
      class: normalizeClass(["mvi-navbar-left", $props.leftClass || ""]),
      style: normalizeStyle($options.leftStyle)
    }, [
      _ctx.$slots.left ? renderSlot(_ctx.$slots, "left", { key: 0 }, void 0, true) : createCommentVNode("", true),
      ($options.leftIconType || $options.leftIconUrl) && !_ctx.$slots.left ? (openBlock(), createBlock(_component_Icon, {
        key: 1,
        class: normalizeClass([$props.leftText ? "mvi-navbar-left-icon" : ""]),
        type: $options.leftIconType,
        url: $options.leftIconUrl,
        spin: $options.leftIconSpin,
        size: $options.leftIconSize,
        color: $options.leftIconColor
      }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
      $props.leftText && !_ctx.$slots.left ? (openBlock(), createElementBlock("span", {
        key: 2,
        class: "mvi-navbar-left-text",
        textContent: toDisplayString($props.leftText)
      }, null, 8, _hoisted_1$N)) : createCommentVNode("", true)
    ], 6)) : createCommentVNode("", true),
    _ctx.$slots.title || $props.title ? (openBlock(), createElementBlock("div", {
      key: 1,
      onClick: _cache[1] || (_cache[1] = (...args) => $options.titleClick && $options.titleClick(...args)),
      class: "mvi-navbar-center",
      style: normalizeStyle($options.centerStyle)
    }, [
      createElementVNode("div", {
        class: normalizeClass(["mvi-navbar-title", $props.titleClass || ""])
      }, [
        _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : $props.title ? (openBlock(), createElementBlock("span", {
          key: 1,
          textContent: toDisplayString($props.title)
        }, null, 8, _hoisted_2$G)) : createCommentVNode("", true)
      ], 2)
    ], 4)) : createCommentVNode("", true),
    $options.rightIconType || $options.rightIconUrl || _ctx.$slots.right || $props.rightText ? (openBlock(), createElementBlock("div", {
      key: 2,
      onClick: _cache[2] || (_cache[2] = (...args) => $options.rightClick && $options.rightClick(...args)),
      class: normalizeClass(["mvi-navbar-right", $props.rightClass || ""]),
      style: normalizeStyle($options.rightStyle)
    }, [
      _ctx.$slots.right ? renderSlot(_ctx.$slots, "right", { key: 0 }, void 0, true) : createCommentVNode("", true),
      $props.rightText && !_ctx.$slots.right ? (openBlock(), createElementBlock("span", {
        key: 1,
        class: "mvi-navbar-right-text",
        textContent: toDisplayString($props.rightText)
      }, null, 8, _hoisted_3$y)) : createCommentVNode("", true),
      ($options.rightIconType || $options.rightIconSpin) && !_ctx.$slots.right ? (openBlock(), createBlock(_component_Icon, {
        key: 2,
        class: normalizeClass([$props.rightText ? "mvi-navbar-right-icon" : ""]),
        type: $options.rightIconType,
        url: $options.rightIconUrl,
        spin: $options.rightIconSpin,
        size: $options.rightIconSize,
        color: $options.rightIconColor
      }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
    ], 6)) : createCommentVNode("", true)
  ], 6);
}
const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["render", _sfc_render$14], ["__scopeId", "data-v-f1ea8e90"]]);
Navbar.install = (app) => {
  app.component(Navbar.name, Navbar);
};
const badge_vue_vue_type_style_index_0_scoped_f4ed9c0e_lang = "";
const _sfc_main$13 = {
  name: "m-badge",
  props: {
    content: {
      type: [String, Number],
      default: null
    },
    placement: {
      type: String,
      default: "top-right",
      validator(value) {
        return [
          "top-right",
          "top-left",
          "bottom-left",
          "bottom-right"
        ].includes(value);
      }
    },
    background: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    dot: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Array,
      default: function() {
        return null;
      }
    }
  },
  computed: {
    badgeStyle() {
      let style = {};
      if (this.background) {
        style.background = this.background;
      }
      if (this.color) {
        style.color = this.color;
      }
      if (this.offset) {
        if (this.offset[0]) {
          if (this.placement == "top-right" || this.placement == "bottom-right") {
            style.marginRight = this.offset[0];
          } else if (this.placement == "top-left" || this.placement == "bottom-left") {
            style.marginLeft = this.offset[0];
          }
        }
        if (this.offset[1]) {
          if (this.placement == "top-right" || this.placement == "top-left") {
            style.marginTop = this.offset[1];
          } else if (this.placement == "bottom-right" || this.placement == "bottom-left") {
            style.marginBottom = this.offset[1];
          }
        }
      }
      return style;
    },
    badgeShow() {
      const badgeExist = Dap.number.isNumber(this.content) || this.content;
      if (badgeExist && this.show) {
        return true;
      }
      return false;
    }
  }
};
const _hoisted_1$M = { class: "mvi-badge" };
const _hoisted_2$F = ["data-placement"];
const _hoisted_3$x = ["data-placement"];
function _sfc_render$13(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$M, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true),
    $props.dot && $props.show ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: "mvi-badge-el mvi-badge-dot",
      "data-placement": $props.placement,
      style: normalizeStyle($options.badgeStyle)
    }, null, 12, _hoisted_2$F)) : $options.badgeShow ? (openBlock(), createElementBlock("span", {
      key: 1,
      class: "mvi-badge-el",
      "data-placement": $props.placement,
      style: normalizeStyle($options.badgeStyle)
    }, toDisplayString($props.content), 13, _hoisted_3$x)) : createCommentVNode("", true)
  ]);
}
const Badge = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["render", _sfc_render$13], ["__scopeId", "data-v-f4ed9c0e"]]);
Badge.install = (app) => {
  app.component(Badge.name, Badge);
};
const tabbarItem_vue_vue_type_style_index_0_scoped_59ec4f13_lang = "";
const _sfc_main$12 = {
  name: "m-tabbar-item",
  inject: ["tabbar"],
  props: {
    route: {
      type: [String, Object],
      default: null
    },
    icon: {
      type: [String, Object],
      default: null
    },
    name: {
      type: String,
      default: null
    },
    value: {
      type: [Object, Number, String, Array],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    badge: {
      type: Object,
      default: null
    }
  },
  computed: {
    iconType() {
      let type = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.type == "string") {
          type = this.icon.type;
        }
      } else if (typeof this.icon == "string") {
        type = this.icon;
      }
      return type;
    },
    iconUrl() {
      let url = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.url == "string") {
          url = this.icon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.spin == "boolean") {
          spin = this.icon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.size == "string") {
          size = this.icon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.color == "string") {
          color = this.icon.color;
        }
      }
      return color;
    },
    computedClass() {
      let cls = ["mvi-tabbar-item"];
      if (Dap.common.equal(this.value, this.tabbar.modelValue)) {
        cls.push("mvi-tabbar-item-active");
      }
      if (this.tabbar.active && !this.disabled && !Dap.common.equal(this.value, this.tabbar.modelValue)) {
        cls.push("mvi-tabbar-active");
      }
      return cls;
    },
    computedStyle() {
      let style = {};
      if (Dap.common.equal(this.value, this.tabbar.modelValue)) {
        if (this.tabbar.activeColor) {
          style.color = this.tabbar.activeColor;
        }
      } else {
        if (this.tabbar.inactiveColor) {
          style.color = this.tabbar.inactiveColor;
        }
      }
      return style;
    },
    computedRoute() {
      if (!this.route) {
        return null;
      }
      let route = {};
      if (typeof this.route == "string") {
        route = {
          path: this.route
        };
      } else if (Dap.common.isObject(this.route)) {
        if (typeof this.route.path == "string" && this.route.path) {
          route.path = this.route.path;
        }
        if (typeof this.route.name == "string" && this.route.name) {
          route.name = this.route.name;
        }
        if (Dap.common.isObject(this.route.query)) {
          route.query = this.route.query;
        } else {
          route.query = {};
        }
        if (Dap.common.isObject(this.route.params)) {
          route.params = this.route.params;
        } else {
          route.params = {};
        }
        if (typeof this.route.replace == "boolean") {
          route.replace = this.route.replace;
        } else {
          route.replace = false;
        }
      }
      if (!route.query) {
        route.query = {};
      }
      if (!route.params) {
        route.params = {};
      }
      return route;
    }
  },
  components: {
    Icon,
    Badge
  },
  methods: {
    setActive() {
      this.tabbar.itemClick(Object.assign({}, this.$props));
      if (this.disabled) {
        return;
      }
      if (Dap.common.equal(this.tabbar.modelValue, this.value)) {
        return;
      }
      if (this.computedRoute && this.$router && this.$router.replace && this.$router.push) {
        if (this.computedRoute.path) {
          if (this.computedRoute.replace) {
            this.$router.replace({
              path: this.computedRoute.path,
              query: this.computedRoute.query,
              params: this.computedRoute.params
            });
          } else {
            this.$router.push({
              path: this.computedRoute.path,
              query: this.computedRoute.query,
              params: this.computedRoute.params
            });
          }
        } else if (this.computedRoute.name) {
          if (this.computedRoute.replace) {
            this.$router.replace({
              name: this.computedRoute.name,
              query: this.computedRoute.query,
              params: this.computedRoute.params
            });
          } else {
            this.$router.push({
              name: this.computedRoute.name,
              query: this.computedRoute.query,
              params: this.computedRoute.params
            });
          }
        }
      }
      this.tabbar.getActiveValue(Object.assign({}, this.$props));
    }
  }
};
const _hoisted_1$L = ["disabled"];
const _hoisted_2$E = { class: "mvi-tabbar-item-child" };
const _hoisted_3$w = ["textContent"];
function _sfc_render$12(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g;
  const _component_Icon = resolveComponent("Icon");
  const _component_Badge = resolveComponent("Badge");
  return openBlock(), createElementBlock("div", {
    disabled: $props.disabled || null,
    class: normalizeClass($options.computedClass),
    style: normalizeStyle($options.computedStyle),
    onClick: _cache[0] || (_cache[0] = (...args) => $options.setActive && $options.setActive(...args))
  }, [
    createVNode(_component_Badge, {
      show: (_a = $props.badge) == null ? void 0 : _a.show,
      class: "mvi-tabbar-badge",
      content: (_b = $props.badge) == null ? void 0 : _b.content,
      background: (_c = $props.badge) == null ? void 0 : _c.background,
      color: (_d = $props.badge) == null ? void 0 : _d.color,
      dot: (_e = $props.badge) == null ? void 0 : _e.dot,
      placement: (_f = $props.badge) == null ? void 0 : _f.placement,
      offset: (_g = $props.badge) == null ? void 0 : _g.offset
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_2$E, [
          $options.iconType || $options.iconUrl ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: "mvi-tabbar-icon",
            style: normalizeStyle({ marginBottom: $props.name ? "" : "0px" })
          }, [
            createVNode(_component_Icon, {
              type: $options.iconType,
              url: $options.iconUrl,
              spin: $options.iconSpin,
              size: $options.iconSize,
              color: $options.iconColor
            }, null, 8, ["type", "url", "spin", "size", "color"])
          ], 4)) : createCommentVNode("", true),
          createElementVNode("span", {
            class: normalizeClass(["mvi-tabbar-name", $options.iconType || $options.iconUrl ? "mvi-tabbar-name-small" : ""]),
            textContent: toDisplayString($props.name)
          }, null, 10, _hoisted_3$w)
        ])
      ]),
      _: 1
    }, 8, ["show", "content", "background", "color", "dot", "placement", "offset"])
  ], 14, _hoisted_1$L);
}
const TabbarItem = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["render", _sfc_render$12], ["__scopeId", "data-v-59ec4f13"]]);
const tabbar_vue_vue_type_style_index_0_scoped_1e2ad694_lang = "";
const _sfc_main$11 = {
  name: "m-tabbar",
  components: {
    TabbarItem
  },
  emits: ["item-click", "update:modelValue", "change"],
  provide() {
    return {
      tabbar: this
    };
  },
  props: {
    modelValue: {
      type: [Object, Number, String, Array],
      default: null
    },
    tabs: {
      type: Array,
      default: function() {
        return [];
      }
    },
    fixed: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 400
    },
    activeColor: {
      type: String,
      default: null
    },
    inactiveColor: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: true
    },
    flex: {
      type: String,
      default: null
    },
    offset: {
      type: String,
      default: null
    }
  },
  computed: {
    tabbarItemStyle() {
      return (index) => {
        let style = {};
        if (index != 0 && this.offset) {
          style.marginLeft = this.offset;
        }
        return style;
      };
    },
    tabbarStyle() {
      let style = {};
      if (this.fixed && Dap.number.isNumber(this.zIndex)) {
        style.zIndex = this.zIndex;
      }
      if (this.flex) {
        style.justifyContent = this.flex;
      }
      return style;
    }
  },
  methods: {
    getActiveValue(props) {
      this.$emit("update:modelValue", props.value);
      this.$emit("change", props);
    },
    itemClick(props) {
      this.$emit("item-click", props);
    }
  }
};
function _sfc_render$11(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TabbarItem = resolveComponent("TabbarItem");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-tabbar", $props.border ? "mvi-tabbar-border" : "", $props.fixed ? "mvi-tabbar-fixed" : ""]),
    style: normalizeStyle($options.tabbarStyle)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.tabs, (item, index) => {
      return openBlock(), createBlock(_component_TabbarItem, {
        key: "tab-" + index,
        name: item.name,
        value: item.value,
        icon: item.icon,
        disabled: item.disabled,
        badge: item.badge,
        route: item.route,
        style: normalizeStyle($options.tabbarItemStyle(index))
      }, null, 8, ["name", "value", "icon", "disabled", "badge", "route", "style"]);
    }), 128))
  ], 6);
}
const Tabbar = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["render", _sfc_render$11], ["__scopeId", "data-v-1e2ad694"]]);
Tabbar.install = (app) => {
  app.component(Tabbar.name, Tabbar);
};
const image_vue_vue_type_style_index_0_scoped_8f8cca10_lang = "";
const _sfc_main$10 = {
  name: "m-image",
  data() {
    return {
      error: false,
      loading: true,
      lazySrc: "",
      lazying: false,
      spy: null
    };
  },
  emits: ["success", "error"],
  props: {
    src: {
      type: String,
      default: ""
    },
    fit: {
      type: String,
      default: "fill",
      validator(value) {
        return [
          "fill",
          "cover",
          "contain",
          "response",
          "none"
        ].includes(value);
      }
    },
    alt: {
      type: String,
      default: ""
    },
    showError: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    root: {
      type: String,
      default: null
    },
    loadIcon: {
      type: [String, Object],
      default: null
    },
    errorIcon: {
      type: [String, Object],
      default: null
    },
    round: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: null
    }
  },
  computed: {
    loadIconType() {
      let type = "image-alt";
      if (Dap.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.type == "string") {
          type = this.loadIcon.type;
        }
      } else if (typeof this.loadIcon == "string") {
        type = this.loadIcon;
      }
      return type;
    },
    loadIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.url == "string") {
          url = this.loadIcon.url;
        }
      }
      return url;
    },
    loadIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.spin == "boolean") {
          spin = this.loadIcon.spin;
        }
      }
      return spin;
    },
    loadIconSize() {
      let size = null;
      if (Dap.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.size == "string") {
          size = this.loadIcon.size;
        }
      }
      return size;
    },
    loadIconColor() {
      let color = null;
      if (Dap.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.color == "string") {
          color = this.loadIcon.color;
        }
      }
      return color;
    },
    errorIconType() {
      let type = "image-error";
      if (Dap.common.isObject(this.errorIcon)) {
        if (typeof this.errorIcon.type == "string") {
          type = this.errorIcon.type;
        }
      } else if (typeof this.errorIcon == "string") {
        type = this.errorIcon;
      }
      return type;
    },
    errorIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.errorIcon)) {
        if (typeof this.errorIcon.url == "string") {
          url = this.errorIcon.url;
        }
      }
      return url;
    },
    errorIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.errorIcon)) {
        if (typeof this.errorIcon.spin == "boolean") {
          spin = this.errorIcon.spin;
        }
      }
      return spin;
    },
    errorIconSize() {
      let size = null;
      if (Dap.common.isObject(this.errorIcon)) {
        if (typeof this.errorIcon.size == "string") {
          size = this.errorIcon.size;
        }
      }
      return size;
    },
    errorIconColor() {
      let color = null;
      if (Dap.common.isObject(this.errorIcon)) {
        if (typeof this.errorIcon.color == "string") {
          color = this.errorIcon.color;
        }
      }
      return color;
    },
    imageStyle() {
      let style = {};
      if (this.round) {
        style.borderRadius = "50%";
      }
      if (this.width) {
        style.width = this.width;
      }
      if (this.height) {
        style.height = this.height;
      }
      return style;
    },
    imgClass() {
      if (this.fit == "contain") {
        return "mvi-image-contain";
      } else if (this.fit == "cover") {
        return "mvi-image-cover";
      } else if (this.fit == "none") {
        return "mvi-image-none";
      } else if (this.fit == "response") {
        return "mvi-image-response";
      } else {
        return "mvi-image-fill";
      }
    },
    computedSrc() {
      if (this.lazyLoad) {
        return this.lazySrc;
      } else {
        return this.src;
      }
    }
  },
  components: {
    Icon
  },
  watch: {
    computedSrc(newValue, oldValue) {
      this.loading = true;
    }
  },
  mounted() {
    if (this.lazyLoad) {
      this.lazyloadFun();
    }
  },
  methods: {
    lazyloadFun() {
      this.lazying = true;
      this.spy = new Spy$1(this.$el, {
        el: this.root,
        beforeEnter: (el) => {
          this.lazying = false;
          this.lazySrc = this.src;
        }
      });
      this.spy.init();
    },
    loadSuccess(e) {
      this.error = false;
      this.loading = false;
      this.$emit("success", e.target);
    },
    loadError(e) {
      this.loading = false;
      this.error = true;
      this.$emit("error", e.target);
    }
  },
  beforeUnmount() {
    if (this.spy) {
      this.spy._setOff();
    }
  }
};
const _hoisted_1$K = {
  key: 0,
  class: "mvi-image-loading"
};
const _hoisted_2$D = {
  key: 1,
  class: "mvi-image-error",
  ref: "error"
};
const _hoisted_3$v = ["src", "alt"];
function _sfc_render$10(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    class: "mvi-image",
    style: normalizeStyle($options.imageStyle)
  }, [
    ($data.loading || $data.lazying) && $props.showLoading ? (openBlock(), createElementBlock("div", _hoisted_1$K, [
      _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : (openBlock(), createBlock(_component_Icon, {
        key: 1,
        type: $options.loadIconType,
        url: $options.loadIconUrl,
        spin: $options.loadIconSpin,
        size: $options.loadIconSize,
        color: $options.loadIconColor
      }, null, 8, ["type", "url", "spin", "size", "color"]))
    ])) : $data.error && $props.showError ? (openBlock(), createElementBlock("div", _hoisted_2$D, [
      _ctx.$slots.error ? renderSlot(_ctx.$slots, "error", { key: 0 }, void 0, true) : (openBlock(), createBlock(_component_Icon, {
        key: 1,
        type: $options.errorIconType,
        url: $options.errorIconUrl,
        spin: $options.errorIconSpin,
        size: $options.errorIconSize,
        color: $options.errorIconColor
      }, null, 8, ["type", "url", "spin", "size", "color"]))
    ], 512)) : createCommentVNode("", true),
    createElementVNode("img", {
      onLoad: _cache[0] || (_cache[0] = (...args) => $options.loadSuccess && $options.loadSuccess(...args)),
      onError: _cache[1] || (_cache[1] = (...args) => $options.loadError && $options.loadError(...args)),
      src: $options.computedSrc,
      alt: $props.showError ? "" : $props.alt,
      class: normalizeClass($options.imgClass)
    }, null, 42, _hoisted_3$v)
  ], 4);
}
const Image = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["render", _sfc_render$10], ["__scopeId", "data-v-8f8cca10"]]);
Image.install = (app) => {
  app.component(Image.name, Image);
};
const overlay_vue_vue_type_style_index_0_scoped_3cb37b3b_lang = "";
const _sfc_main$$ = {
  name: "m-overlay",
  data() {
    return {
      overlayShow: false,
      scrollTop: 0,
      scrollLeft: 0,
      overflowX: "",
      overflowY: "",
      paddingRight: 0,
      paddingBottom: 0,
      hasHorizontalScroll: false,
      hasVerticalScroll: false,
      offsetParent: null
    };
  },
  emits: [
    "update:modelValue",
    "show",
    "showing",
    "shown",
    "hide",
    "hidding",
    "hidden"
  ],
  inheritAttrs: false,
  props: {
    mountEl: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: 800
    },
    color: {
      type: String,
      default: null
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    fade: {
      type: Boolean,
      default: true
    },
    timeout: {
      type: Number,
      default: 200,
      validator(value) {
        return value >= 0;
      }
    },
    closable: {
      type: Boolean,
      default: false
    },
    usePadding: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    modelValue(newValue) {
      this.overlayShow = newValue;
    }
  },
  computed: {
    overlayStyle() {
      let style = {};
      if (Dap.number.isNumber(this.zIndex)) {
        style.zIndex = this.zIndex;
      }
      if (this.color) {
        style.background = this.color;
      }
      return style;
    },
    $$el() {
      return this.$refs.overlay;
    }
  },
  mounted() {
    this.overlayShow = this.modelValue;
  },
  methods: {
    beforeEnter(el) {
      if (this.fade) {
        el.style.transition = "opacity " + this.timeout + "ms";
        el.style.webkitTransition = "opacity " + this.timeout + "ms";
      }
      this.$emit("show", el);
      if (typeof this.overlayComponentWatch == "function") {
        this.overlayComponentWatch.apply(this, ["show", el]);
      }
    },
    enter(el) {
      if (this.$$el.offsetParent) {
        this.offsetParent = this.$$el.offsetParent;
        if (Dap.element.getScrollHeight(this.offsetParent) > this.offsetParent.clientHeight) {
          if (this.usePadding) {
            let scrollWidth = this.offsetParent.offsetWidth - this.offsetParent.clientWidth - parseFloat(
              Dap.element.getCssStyle(
                this.offsetParent,
                "border-right-width"
              )
            ) - parseFloat(
              Dap.element.getCssStyle(
                this.offsetParent,
                "border-left-width"
              )
            );
            this.paddingRight = parseFloat(
              Dap.element.getCssStyle(
                this.offsetParent,
                "padding-right"
              )
            );
            this.offsetParent.style.setProperty(
              "padding-right",
              this.paddingRight + scrollWidth + "px",
              "important"
            );
          }
          this.scrollTop = Dap.element.getScrollTop(this.offsetParent);
          this.overflowY = Dap.element.getCssStyle(
            this.offsetParent,
            "overflow-y"
          );
          this.offsetParent.style.setProperty(
            "overflow-y",
            "hidden",
            "important"
          );
          this.$$el.style.top = this.scrollTop + "px";
          this.hasVerticalScroll = true;
        }
        if (Dap.element.getScrollWidth(this.offsetParent) > this.offsetParent.clientWidth) {
          if (this.usePadding) {
            let scrollHeight = this.offsetParent.offsetHeight - this.offsetParent.clientHeight - parseFloat(
              Dap.element.getCssStyle(
                this.offsetParent,
                "border-bottom-width"
              )
            ) - parseFloat(
              Dap.element.getCssStyle(
                this.offsetParent,
                "border-top-width"
              )
            );
            this.paddingBottom = parseFloat(
              Dap.element.getCssStyle(
                this.offsetParent,
                "padding-bottom"
              )
            );
            this.offsetParent.style.setProperty(
              "padding-bottom",
              this.paddingBottom + scrollHeight + "px",
              "important"
            );
          }
          this.scrollLeft = Dap.element.getScrollLeft(
            this.offsetParent
          );
          this.overflowX = Dap.element.getCssStyle(
            this.offsetParent,
            "overflow-x"
          );
          this.offsetParent.style.setProperty(
            "overflow-x",
            "hidden",
            "important"
          );
          this.$$el.style.left = this.scrollLeft + "px";
          this.hasHorizontalScroll = true;
        }
      }
      this.$emit("showing", el);
      if (typeof this.overlayComponentWatch == "function") {
        this.overlayComponentWatch.apply(this, ["showing", el]);
      }
    },
    afterEnter(el) {
      if (this.fade) {
        el.style.transition = "";
        el.style.webkitTransition = "";
      }
      this.$emit("shown", el);
      if (typeof this.overlayComponentWatch == "function") {
        this.overlayComponentWatch.apply(this, ["shown", el]);
      }
    },
    beforeLeave(el) {
      if (this.fade) {
        el.style.transition = "opacity " + this.timeout + "ms";
        el.style.webkitTransition = "opacity " + this.timeout + "ms";
      }
      this.$emit("hide", el);
      if (typeof this.overlayComponentWatch == "function") {
        this.overlayComponentWatch.apply(this, ["hide", el]);
      }
    },
    leave(el) {
      this.$emit("hidding", el);
      if (typeof this.overlayComponentWatch == "function") {
        this.overlayComponentWatch.apply(this, ["hidding", el]);
      }
    },
    afterLeave(el) {
      if (this.offsetParent) {
        if (this.hasVerticalScroll) {
          if (this.usePadding) {
            this.offsetParent.style.setProperty(
              "padding-right",
              this.paddingRight + "px",
              "important"
            );
          }
          this.offsetParent.style.setProperty(
            "overflow-y",
            this.overflowY,
            "important"
          );
          this.hasVerticalScroll = false;
        }
        if (this.hasHorizontalScroll) {
          if (this.usePadding) {
            this.offsetParent.style.setProperty(
              "padding-bottom",
              this.paddingBottom + "px",
              "important"
            );
          }
          this.offsetParent.style.setProperty(
            "overflow-x",
            this.overflowX,
            "important"
          );
          this.hasHorizontalScroll = false;
        }
      }
      if (this.fade) {
        el.style.transition = "";
        el.style.webkitTransition = "";
      }
      this.$emit("hidden", el);
      if (typeof this.overlayComponentWatch == "function") {
        this.overlayComponentWatch.apply(this, ["hidden", el]);
      }
    },
    closeOverlay() {
      if (this.closable) {
        this.$emit("update:modelValue", false);
      }
    }
  }
};
function _sfc_render$$(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Teleport, {
    disabled: !$props.mountEl,
    to: $props.mountEl
  }, [
    createVNode(Transition, {
      name: "mvi-overlay-fade",
      onBeforeEnter: $options.beforeEnter,
      onEnter: $options.enter,
      onAfterEnter: $options.afterEnter,
      onBeforeLeave: $options.beforeLeave,
      onLeave: $options.leave,
      onAfterLeave: $options.afterLeave
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", mergeProps({
          onClick: _cache[0] || (_cache[0] = withModifiers((...args) => $options.closeOverlay && $options.closeOverlay(...args), ["self"])),
          ref: "overlay",
          class: "mvi-overlay",
          style: $options.overlayStyle
        }, _ctx.$attrs), [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 16), [
          [vShow, $data.overlayShow]
        ])
      ]),
      _: 3
    }, 8, ["onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
  ], 8, ["disabled", "to"]);
}
const Overlay = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["render", _sfc_render$$], ["__scopeId", "data-v-3cb37b3b"]]);
Overlay.install = (app) => {
  app.component(Overlay.name, Overlay);
};
const popup_vue_vue_type_style_index_0_scoped_5577460d_lang = "";
const _sfc_main$_ = {
  name: "m-popup",
  data() {
    return {
      popupShow: false,
      firstShow: false
    };
  },
  emits: [
    "update:modelValue",
    "show",
    "showing",
    "shown",
    "hide",
    "hidding",
    "hidden",
    "overlay-click"
  ],
  inheritAttrs: false,
  props: {
    mountEl: {
      type: String,
      default: null
    },
    showTimes: {
      type: Boolean,
      default: false
    },
    timesPlacement: {
      type: String,
      default: "top-right",
      validator(value) {
        return [
          "top-right",
          "top-left",
          "bottom-right",
          "bottom-left"
        ].includes(value);
      }
    },
    timesIcon: {
      type: [String, Object],
      default: null
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    overlayColor: {
      type: String,
      default: null
    },
    popupColor: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: 900
    },
    timeout: {
      type: Number,
      default: 200
    },
    placement: {
      type: String,
      default: "bottom",
      validator(value) {
        return ["left", "top", "bottom", "right"].includes(value);
      }
    },
    round: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: null
    },
    usePadding: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    $$el() {
      return this.$refs.overlay.$$el;
    },
    iconType() {
      let type = "times";
      if (Dap.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.type == "string") {
          type = this.timesIcon.type;
        }
      } else if (typeof this.timesIcon == "string") {
        type = this.timesIcon;
      }
      return type;
    },
    iconUrl() {
      let url = null;
      if (Dap.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.url == "string") {
          url = this.timesIcon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.spin == "boolean") {
          spin = this.timesIcon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (Dap.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.size == "string") {
          size = this.timesIcon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color = null;
      if (Dap.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.color == "string") {
          color = this.timesIcon.color;
        }
      }
      return color;
    },
    popupClass() {
      let cls = ["mvi-popup", "mvi-popup-" + this.placement];
      if (this.round) {
        cls.push("mvi-popup-round");
      }
      return cls;
    },
    popupStyle() {
      let style = {};
      if (this.placement == "left" || this.placement == "right") {
        if (this.width) {
          style.width = this.width;
        }
      } else if (this.placement == "top" || this.placement == "bottom") {
        if (this.width) {
          style.height = this.width;
        }
      }
      if (this.showTimes) {
        if (this.timesPlacement == "top-left" || this.timesPlacement == "top-right") {
          style.flexDirection = "column";
          style.webkitFlexDirection = "column";
        } else if (this.timesPlacement == "bottom-left" || this.timesPlacement == "bottom-right") {
          style.flexDirection = "column-reverse";
          style.webkitFlexDirection = "column-reverse";
        }
      }
      if (this.popupColor) {
        style.backgroundColor = this.popupColor;
      }
      if (this.color) {
        style.color = this.color;
      }
      if (Dap.number.isNumber(this.zIndex)) {
        style.zIndex = this.zIndex + 10;
      }
      style.transition = "all " + this.timeout + "ms";
      style.webkitTransition = "all " + this.timeout + "ms";
      style.msTransition = "all " + this.timeout + "ms";
      style.MozTransition = "all " + this.timeout + "ms";
      return style;
    }
  },
  components: {
    Icon,
    Overlay
  },
  methods: {
    overlayShow(el) {
      if (!this.firstShow) {
        this.firstShow = true;
      }
      this.popupShow = true;
    },
    overlayHide() {
      this.popupShow = false;
    },
    hide(e) {
      if (this.closable) {
        this.hidePopup();
      }
      this.$emit("overlay-click", e);
    },
    hidePopup() {
      this.$emit("update:modelValue", false);
    },
    beforeEnter(el) {
      if (Dap.data.get(el, "mvi-popup-beforeEnter-trigger")) {
        return;
      }
      Dap.data.set(el, "mvi-popup-beforeEnter-trigger", true);
      this.$emit("show", el);
      if (typeof this.popupComponentWatch == "function") {
        this.popupComponentWatch.apply(this, ["show", el]);
      }
    },
    enter(el) {
      if (Dap.data.get(el, "mvi-popup-enter-trigger")) {
        return;
      }
      Dap.data.set(el, "mvi-popup-enter-trigger", true);
      this.$emit("showing", el);
      if (typeof this.popupComponentWatch == "function") {
        this.popupComponentWatch.apply(this, ["showing", el]);
      }
    },
    afterEnter(el) {
      this.$emit("shown", el);
      if (typeof this.popupComponentWatch == "function") {
        this.popupComponentWatch.apply(this, ["shown", el]);
      }
    },
    beforeLeave(el) {
      Dap.data.remove(el, "mvi-popup-beforeEnter-trigger");
      Dap.data.remove(el, "mvi-popup-enter-trigger");
      this.$emit("hide", el);
      if (typeof this.popupComponentWatch == "function") {
        this.popupComponentWatch.apply(this, ["hide", el]);
      }
    },
    leave(el) {
      this.$emit("hidding", el);
      if (typeof this.popupComponentWatch == "function") {
        this.popupComponentWatch.apply(this, ["hidding", el]);
      }
    },
    afterLeave(el) {
      this.$emit("hidden", el);
      if (typeof this.popupComponentWatch == "function") {
        this.popupComponentWatch.apply(this, ["hidden", el]);
      }
    }
  }
};
function _sfc_render$_(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Overlay = resolveComponent("Overlay");
  return openBlock(), createBlock(_component_Overlay, {
    ref: "overlay",
    "model-value": $props.modelValue,
    onShow: $options.overlayShow,
    onHide: $options.overlayHide,
    "use-padding": $props.usePadding,
    "z-index": $props.zIndex,
    onClick: withModifiers($options.hide, ["self"]),
    color: $props.overlayColor || null,
    timeout: $props.timeout,
    "mount-el": $props.mountEl
  }, {
    default: withCtx(() => [
      createVNode(Transition, {
        name: "mvi-slide-" + $props.placement,
        onBeforeEnter: $options.beforeEnter,
        onEnter: $options.enter,
        onAfterEnter: $options.afterEnter,
        onBeforeLeave: $options.beforeLeave,
        onLeave: $options.leave,
        onAfterLeave: $options.afterLeave
      }, {
        default: withCtx(() => [
          $data.firstShow ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            class: $options.popupClass,
            style: $options.popupStyle
          }, _ctx.$attrs), [
            $props.showTimes ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["mvi-popup-times", "mvi-popup-times-" + $props.timesPlacement])
            }, [
              createVNode(_component_Icon, {
                onClick: $options.hidePopup,
                type: $options.iconType,
                url: $options.iconUrl,
                spin: $options.iconSpin,
                size: $options.iconSize,
                color: $options.iconColor
              }, null, 8, ["onClick", "type", "url", "spin", "size", "color"])
            ], 2)) : createCommentVNode("", true),
            createElementVNode("div", {
              class: normalizeClass(["mvi-popup-content", $props.showTimes ? "mvi-popup-content-padding" : ""])
            }, [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 2)
          ], 16)), [
            [vShow, $data.popupShow]
          ]) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
    ]),
    _: 3
  }, 8, ["model-value", "onShow", "onHide", "use-padding", "z-index", "onClick", "color", "timeout", "mount-el"]);
}
const Popup = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["render", _sfc_render$_], ["__scopeId", "data-v-5577460d"]]);
Popup.install = (app) => {
  app.component(Popup.name, Popup);
};
const checkbox_vue_vue_type_style_index_0_scoped_c431bbfb_lang = "";
const _sfc_main$Z = {
  name: "m-checkbox",
  emits: ["update:modelValue", "change"],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [Boolean, Array],
      default: false
    },
    label: {
      type: String,
      default: null
    },
    labelColor: {
      type: String,
      default: null
    },
    labelSize: {
      type: String,
      default: null
    },
    value: {
      type: [Object, Number, String, Array],
      default: ""
    },
    fillColor: {
      type: String,
      default: null
    },
    labelPlacement: {
      type: String,
      default: "right",
      validator(value) {
        return ["left", "right"].includes(value);
      }
    },
    round: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [String, Object],
      default: "success"
    },
    name: {
      type: String,
      default: null
    }
  },
  computed: {
    iconColor() {
      if (this.disabled || !this.check) {
        return null;
      }
      let color = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.color == "string") {
          color = this.icon.color;
        }
      }
      return color;
    },
    iconSize() {
      let size = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.size == "string") {
          size = this.icon.size;
        }
      }
      return size;
    },
    iconType() {
      let type = "success";
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.type == "string") {
          type = this.icon.type;
        }
      } else if (typeof this.icon == "string") {
        type = this.icon;
      }
      return type;
    },
    checkboxStyle() {
      let style = {};
      if (!this.disabled && this.check && this.fillColor) {
        style.backgroundColor = this.fillColor;
        style.borderColor = this.fillColor;
      }
      if (this.round) {
        style.borderRadius = "50%";
      }
      return style;
    },
    labelStyle() {
      let style = {};
      if (!this.disabled && this.labelColor) {
        style.color = this.labelColor;
      }
      if (this.labelSize) {
        style.fontSize = this.labelSize;
      }
      return style;
    },
    check() {
      if (typeof this.modelValue == "boolean") {
        return this.modelValue;
      } else if (Array.isArray(this.modelValue)) {
        return this.modelValue.some((item) => {
          return Dap.common.equal(item, this.value);
        });
      } else {
        return false;
      }
    }
  },
  components: {
    Icon
  },
  methods: {
    change(event2) {
      if (Array.isArray(this.modelValue)) {
        let arr = [...this.modelValue];
        if (event2.target.checked && !this.check) {
          arr.push(this.value);
        } else if (this.check) {
          arr = arr.filter((item) => {
            return !Dap.common.equal(item, this.value);
          });
        }
        this.$emit("update:modelValue", arr);
        this.$emit("change", arr);
      } else if (typeof this.modelValue == "boolean") {
        this.$emit("update:modelValue", event2.target.checked);
        this.$emit("change", event2.target.checked);
      }
    }
  }
};
const _hoisted_1$J = ["disabled"];
const _hoisted_2$C = ["disabled", "data-placement", "textContent"];
const _hoisted_3$u = ["value", "disabled", "checked", "name"];
const _hoisted_4$n = ["disabled"];
const _hoisted_5$i = ["disabled", "data-placement", "textContent"];
function _sfc_render$Z(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("label", {
    class: "mvi-checkbox",
    disabled: $props.disabled || null
  }, [
    $props.labelPlacement == "left" && $props.label ? (openBlock(), createElementBlock("span", {
      key: 0,
      disabled: $props.disabled || null,
      class: "mvi-checkbox-label",
      "data-placement": $props.labelPlacement,
      textContent: toDisplayString($props.label),
      style: normalizeStyle($options.labelStyle)
    }, null, 12, _hoisted_2$C)) : createCommentVNode("", true),
    createElementVNode("input", {
      onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args)),
      value: $props.value,
      disabled: $props.disabled || null,
      checked: $options.check,
      type: "checkbox",
      name: $props.name
    }, null, 40, _hoisted_3$u),
    createElementVNode("span", {
      disabled: $props.disabled || null,
      class: normalizeClass(["mvi-checkbox-item", $options.check ? "mvi-checkbox-item-check" : ""]),
      style: normalizeStyle($options.checkboxStyle)
    }, [
      createVNode(_component_Icon, {
        disabled: $props.disabled || null,
        color: $options.iconColor,
        size: $options.iconSize,
        type: $options.iconType,
        class: normalizeClass(["mvi-checkbox-icon", $options.check ? "mvi-checkbox-icon-check" : ""])
      }, null, 8, ["disabled", "color", "size", "type", "class"])
    ], 14, _hoisted_4$n),
    $props.labelPlacement == "right" && $props.label ? (openBlock(), createElementBlock("span", {
      key: 1,
      disabled: $props.disabled || null,
      class: "mvi-checkbox-label",
      "data-placement": $props.labelPlacement,
      textContent: toDisplayString($props.label),
      style: normalizeStyle($options.labelStyle)
    }, null, 12, _hoisted_5$i)) : createCommentVNode("", true)
  ], 8, _hoisted_1$J);
}
const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["render", _sfc_render$Z], ["__scopeId", "data-v-c431bbfb"]]);
Checkbox.install = (app) => {
  app.component(Checkbox.name, Checkbox);
};
const radio_vue_vue_type_style_index_0_scoped_c9785930_lang = "";
const _sfc_main$Y = {
  name: "m-radio",
  emits: ["update:modelValue", "change"],
  props: {
    value: {
      type: [Object, Number, String],
      default: ""
    },
    modelValue: {
      type: [Boolean, String, Number, Object],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    labelPlacement: {
      type: String,
      default: "right",
      validator(value) {
        return ["left", "right"].includes(value);
      }
    },
    labelColor: {
      type: String,
      default: null
    },
    labelSize: {
      type: String,
      default: null
    },
    fillColor: {
      type: String,
      default: null
    },
    icon: {
      type: [String, Object],
      default: "success"
    },
    round: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: null
    }
  },
  computed: {
    labelStyle() {
      let style = {};
      if (!this.disabled && this.labelColor) {
        style.color = this.labelColor;
      }
      if (this.labelSize) {
        style.fontSize = this.labelSize;
      }
      return style;
    },
    iconColor() {
      if (this.disabled || !this.check) {
        return null;
      }
      let color = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.color == "string") {
          color = this.icon.color;
        }
      }
      return color;
    },
    iconSize() {
      let size = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.size == "string") {
          size = this.icon.size;
        }
      }
      return size;
    },
    iconType() {
      let type = "success";
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.type == "string") {
          type = this.icon.type;
        }
      } else if (typeof this.icon == "string") {
        type = this.icon;
      }
      return type;
    },
    radioStyle() {
      let style = {};
      if (!this.disabled && this.check && this.fillColor) {
        style.backgroundColor = this.fillColor;
        style.borderColor = this.fillColor;
      }
      if (this.round) {
        style.borderRadius = "50%";
      }
      return style;
    },
    check() {
      if (typeof this.modelValue == "boolean") {
        return this.modelValue;
      } else {
        return Dap.common.equal(this.modelValue, this.value);
      }
    }
  },
  components: {
    Icon
  },
  methods: {
    change(event2) {
      if (typeof this.modelValue == "boolean") {
        this.$emit("update:modelValue", event2.target.checked);
        this.$emit("change", event2.target.checked);
      } else {
        if (event2.target.checked) {
          this.$emit("update:modelValue", this.value);
          this.$emit("change", this.value);
        }
      }
    }
  }
};
const _hoisted_1$I = ["disabled"];
const _hoisted_2$B = ["disabled", "data-placement", "textContent"];
const _hoisted_3$t = ["value", "disabled", "checked", "name"];
const _hoisted_4$m = ["disabled"];
const _hoisted_5$h = ["disabled", "data-placement", "textContent"];
function _sfc_render$Y(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("label", {
    disabled: $props.disabled || null,
    class: "mvi-radio"
  }, [
    $props.label && $props.labelPlacement == "left" ? (openBlock(), createElementBlock("span", {
      key: 0,
      disabled: $props.disabled || null,
      class: "mvi-radio-label",
      "data-placement": $props.labelPlacement,
      textContent: toDisplayString($props.label),
      style: normalizeStyle($options.labelStyle)
    }, null, 12, _hoisted_2$B)) : createCommentVNode("", true),
    createElementVNode("input", {
      onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args)),
      value: $props.value,
      disabled: $props.disabled || null,
      checked: $options.check,
      type: "radio",
      name: $props.name
    }, null, 40, _hoisted_3$t),
    createElementVNode("span", {
      disabled: $props.disabled || null,
      class: normalizeClass(["mvi-radio-item", $options.check ? "mvi-radio-item-check" : ""]),
      style: normalizeStyle($options.radioStyle)
    }, [
      createVNode(_component_Icon, {
        disabled: $props.disabled || null,
        color: $options.iconColor,
        size: $options.iconSize,
        type: $options.iconType,
        class: normalizeClass(["mvi-radio-icon", $options.check ? "mvi-radio-icon-check" : ""])
      }, null, 8, ["disabled", "color", "size", "type", "class"])
    ], 14, _hoisted_4$m),
    $props.label && $props.labelPlacement == "right" ? (openBlock(), createElementBlock("span", {
      key: 1,
      disabled: $props.disabled || null,
      class: "mvi-radio-label",
      "data-placement": $props.labelPlacement,
      textContent: toDisplayString($props.label),
      style: normalizeStyle($options.labelStyle)
    }, null, 12, _hoisted_5$h)) : createCommentVNode("", true)
  ], 8, _hoisted_1$I);
}
const Radio = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["render", _sfc_render$Y], ["__scopeId", "data-v-c9785930"]]);
Radio.install = (app) => {
  app.component(Radio.name, Radio);
};
const loading_vue_vue_type_style_index_0_scoped_4bac2711_lang = "";
const _sfc_main$X = {
  name: "m-loading",
  props: {
    color: {
      type: String,
      default: "#bbb"
    },
    size: {
      type: String,
      default: "0.4rem"
    },
    type: {
      type: [Number, String],
      default: 0,
      validator(value) {
        return value == 0 || value == 1;
      }
    }
  },
  computed: {
    loadingStyle() {
      let style = {};
      style.background = this.color;
      style.width = "calc(" + this.size + "/20)";
      style.height = "calc(" + this.size + "/4)";
      style.transformOrigin = "calc(" + this.size + "/40) calc(" + this.size + "/2)";
      style.webkitTransformOrigin = "calc(" + this.size + "/40) calc(" + this.size + "/2)";
      return style;
    },
    loading2Style() {
      let style = {};
      style.boxShadow = "0 calc(" + this.size + "/20) 0 0 " + this.color;
      style.webkitBoxShadow = "0 calc(" + this.size + "/20) 0 0 " + this.color;
      style.width = this.size;
      style.height = this.size;
      style.transformOrigin = "calc(" + this.size + "/2) calc(" + this.size + "2 + " + this.size + "/40)";
      style.webkitTransformOrigin = "calc(" + this.size + "/2) calc(" + this.size + "2 + " + this.size + "/40)";
      return style;
    }
  }
};
function _sfc_render$X(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.type == 0 ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: "mvi-loading",
    style: normalizeStyle({ width: $props.size, height: $props.size })
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(new Array(12), (item, index) => {
      return openBlock(), createElementBlock("div", {
        key: "mvi-loading-" + index,
        style: normalizeStyle($options.loadingStyle)
      }, null, 4);
    }), 128))
  ], 4)) : $props.type == 1 ? (openBlock(), createElementBlock("div", {
    key: 1,
    class: "mvi-loading2",
    style: normalizeStyle({ width: $props.size, height: $props.size })
  }, [
    createElementVNode("div", {
      style: normalizeStyle($options.loading2Style)
    }, null, 4)
  ], 4)) : createCommentVNode("", true);
}
const Loading = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["render", _sfc_render$X], ["__scopeId", "data-v-4bac2711"]]);
Loading.install = (app) => {
  app.component(Loading.name, Loading);
};
const picker_vue_vue_type_style_index_0_scoped_7fe53e50_lang = "";
const _sfc_main$W = {
  name: "m-picker",
  data() {
    return {
      offsets: [],
      startY: 0,
      startY2: 0,
      time: 0,
      oldActives: [],
      amounts: 0,
      mouseDown: false,
      columnIndex: 0,
      StartTimeStamp: 0,
      endTimeStamp: 0,
      itemRefs: []
    };
  },
  emits: ["confirm", "cancel", "change"],
  props: {
    options: {
      type: [Array, Object],
      default: function() {
        return {
          values: [],
          defaultIndex: 0,
          className: ""
        };
      }
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: null
    },
    titleClass: {
      type: String,
      default: null
    },
    confirmText: {
      type: String,
      default: "\u786E\u5B9A"
    },
    cancelText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    confirmClass: {
      type: String,
      default: null
    },
    cancelClass: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    visibleCounts: {
      type: Number,
      default: 5
    },
    selectHeight: {
      type: String,
      default: "0.88rem"
    }
  },
  watch: {
    computedOptions(newValue) {
      this.init();
    }
  },
  computed: {
    computedHeight() {
      if (this.selectHeight.includes("px")) {
        return parseFloat(this.selectHeight);
      } else if (this.selectHeight.includes("rem")) {
        return Dap.element.rem2px(parseFloat(this.selectHeight));
      }
    },
    loadingStyle() {
      let style = {};
      style.height = `calc(${Dap.number.mutiply(
        this.computedHeight,
        this.visibleCounts
      )}px + 0.88rem)`;
      return style;
    },
    contentStyle() {
      let style = {};
      style.height = `${Dap.number.mutiply(
        this.computedHeight,
        this.visibleCounts
      )}px`;
      return style;
    },
    computedOptions() {
      let op = [];
      if (Array.isArray(this.options)) {
        op = this.options;
      } else {
        op = [this.options];
      }
      return op;
    },
    columnStyle() {
      return (column, index) => {
        let style = {};
        style.transform = `translate3d(0,${this.offsets[index] || 0}px,0)`;
        style.webkitTransform = `translate3d(0,${this.offsets[index] || 0}px,0)`;
        return style;
      };
    },
    actives() {
      let arr = [];
      for (let i = 0; i < this.offsets.length; i++) {
        arr.push({
          index: this.getActive(this.offsets[i]),
          value: this.computedOptions[i].values[this.getActive(this.offsets[i])]
        });
      }
      return arr;
    },
    maskStyle() {
      let style = {};
      if (this.selectHeight) {
        style.backgroundSize = "100% " + Dap.number.mutiply(
          this.computedHeight,
          Dap.number.divide(this.visibleCounts - 1, 2)
        ) + "px";
      }
      return style;
    }
  },
  components: {
    Loading
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  mounted() {
    this.init();
    Dap.event.on(
      document.documentElement,
      `mousemove.picker_${this.uid}`,
      this.mousemove
    );
    Dap.event.on(
      document.documentElement,
      `mouseup.picker_${this.uid}`,
      this.mouseup
    );
  },
  methods: {
    init() {
      this.offsets = [];
      for (let i = 0; i < this.computedOptions.length; i++) {
        this.offsets.push(
          this.getOffset(this.computedOptions[i].defaultIndex || 0)
        );
      }
    },
    crisis(index) {
      let max = Dap.number.divide(this.visibleCounts - 1, 2);
      max = Dap.number.mutiply(max, this.computedHeight);
      let min = -Dap.number.divide(this.visibleCounts - 1, 2);
      min = Dap.number.mutiply(min, this.computedHeight);
      min += Dap.number.mutiply(
        this.visibleCounts - this.computedOptions[index].values.length,
        this.computedHeight
      );
      return {
        max,
        min
      };
    },
    getActive(value) {
      let num = Math.abs(
        Dap.number.divide(
          value - Dap.number.mutiply(
            Dap.number.divide(this.visibleCounts - 1, 2),
            this.computedHeight
          ),
          this.computedHeight
        )
      );
      return Math.round(num);
    },
    getOffset(index) {
      return Dap.number.mutiply(
        Dap.number.subtract(
          Dap.number.divide(this.visibleCounts - 1, 2),
          index
        ),
        this.computedHeight
      );
    },
    doConfirm() {
      if (this.actives.length == 1) {
        this.$emit("confirm", this.actives[0]);
      } else {
        this.$emit("confirm", this.actives);
      }
    },
    doCancel() {
      this.init();
      if (this.actives.length == 1) {
        this.$emit("cancel", this.actives[0]);
      } else {
        this.$emit("cancel", this.actives);
      }
    },
    addTransition(index, timeout) {
      return new Promise((resolve) => {
        this.itemRefs[index].style.transition = "all " + timeout + "ms ease-out";
        this.itemRefs[index].style.webkitTransition = "all " + timeout + "ms ease-out";
        setTimeout(() => {
          resolve();
        }, 10);
      });
    },
    removeTransition(index) {
      return new Promise((resolve) => {
        this.itemRefs[index].style.transition = "";
        this.itemRefs[index].style.webkitTransition = "";
        setTimeout(() => {
          resolve();
        }, 10);
      });
    },
    touchstart(event2, index) {
      this.startY = event2.targetTouches[0].pageY;
      this.startY2 = this.startY;
      this.time = Date.now();
      this.oldActives = this.actives;
      this.amounts = 0;
      this.columnIndex = index;
      this.StartTimeStamp = Date.now();
    },
    mousedown(event2, index) {
      this.startY = event2.pageY;
      this.startY2 = this.startY;
      this.time = Date.now();
      this.oldActives = this.actives;
      this.amounts = 0;
      this.mouseDown = true;
      this.columnIndex = index;
      this.StartTimeStamp = Date.now();
    },
    touchmove(event2) {
      if (event2.cancelable) {
        event2.preventDefault();
      }
      let endY = event2.targetTouches[0].pageY;
      let moveY = endY - this.startY;
      let moveY2 = endY - this.startY2;
      if (this.offsets[this.columnIndex] >= this.crisis(this.columnIndex).max && moveY2 > 0) {
        this.amounts += 5;
        this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + moveY / this.amounts;
        return;
      }
      if (this.offsets[this.columnIndex] <= this.crisis(this.columnIndex).min && moveY2 < 0) {
        this.amounts += 5;
        this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + moveY / this.amounts;
        return;
      }
      this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + moveY;
      this.startY = endY;
    },
    mousemove(event2) {
      if (!this.mouseDown) {
        return;
      }
      if (event2.cancelable) {
        event2.preventDefault();
      }
      let endY = event2.pageY;
      let moveY = endY - this.startY;
      let moveY2 = endY - this.startY2;
      if (this.offsets[this.columnIndex] >= this.crisis(this.columnIndex).max && moveY2 > 0) {
        this.amounts += 5;
        this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + moveY / this.amounts;
        return;
      }
      if (this.offsets[this.columnIndex] <= this.crisis(this.columnIndex).min && moveY2 < 0) {
        this.amounts += 5;
        this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + moveY / this.amounts;
        return;
      }
      this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + moveY;
      this.startY = endY;
    },
    touchend(event2) {
      this.endTimeStamp = Date.now();
      let moveTotal = event2.changedTouches[0].pageY - this.startY2;
      let totalTimeStamp = this.endTimeStamp - this.StartTimeStamp;
      if (totalTimeStamp < 300 && Math.abs(moveTotal) > this.computedHeight) {
        this.addTransition(this.columnIndex, 1e3).then(() => {
          if (moveTotal > 0) {
            this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + Dap.element.rem2px(10) * totalTimeStamp / 1e3;
          } else {
            this.offsets[this.columnIndex] = this.offsets[this.columnIndex] - Dap.element.rem2px(10) * totalTimeStamp / 1e3;
          }
          return this.addTransition(this.columnIndex, 300);
        }).then(() => {
          this.endDeal(moveTotal, 300);
        });
      } else {
        this.addTransition(this.columnIndex, 300).then(() => {
          this.endDeal(moveTotal, 300);
        });
      }
    },
    mouseup(event2) {
      if (!this.mouseDown) {
        return;
      }
      this.mouseDown = false;
      this.endTimeStamp = Date.now();
      let moveTotal = event2.pageY - this.startY2;
      let totalTimeStamp = this.endTimeStamp - this.StartTimeStamp;
      if (totalTimeStamp < 300 && Math.abs(moveTotal) > this.computedHeight) {
        this.addTransition(this.columnIndex, 1e3).then(() => {
          if (moveTotal > 0) {
            this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + Dap.element.rem2px(10) * totalTimeStamp / 1e3;
          } else {
            this.offsets[this.columnIndex] = this.offsets[this.columnIndex] - Dap.element.rem2px(10) * totalTimeStamp / 1e3;
          }
          return this.addTransition(this.columnIndex, 300);
        }).then(() => {
          this.endDeal(moveTotal, 300);
        });
      } else {
        this.addTransition(this.columnIndex, 300).then(() => {
          this.endDeal(moveTotal, 300);
        });
      }
    },
    endDeal(moveTotal, timeout) {
      if (moveTotal > 0) {
        if (this.offsets[this.columnIndex] >= this.crisis(this.columnIndex).max) {
          this.offsets[this.columnIndex] = this.crisis(
            this.columnIndex
          ).max;
        } else {
          let order = this.getActive(this.offsets[this.columnIndex]);
          this.offsets[this.columnIndex] = this.getOffset(order);
        }
      } else {
        if (this.offsets[this.columnIndex] <= this.crisis(this.columnIndex).min) {
          this.offsets[this.columnIndex] = this.crisis(
            this.columnIndex
          ).min;
        } else {
          let order = this.getActive(this.offsets[this.columnIndex]);
          this.offsets[this.columnIndex] = this.getOffset(order);
        }
      }
      if (this.actives.length == 1) {
        if (this.actives[0].index != this.oldActives[0].index) {
          this.$emit("change", {
            columnIndex: this.columnIndex,
            selected: this.actives[0]
          });
        }
      } else {
        let flag = true;
        for (let i = 0; i < this.oldActives.length; i++) {
          if (this.oldActives[i].index != this.actives[i].index) {
            flag = false;
          }
        }
        if (!flag) {
          this.$emit("change", {
            columnIndex: this.columnIndex,
            selected: this.actives
          });
        }
      }
      setTimeout(() => {
        this.removeTransition(this.columnIndex);
      }, timeout);
    },
    contentTouchMove(event2) {
      if (event2.cancelable) {
        event2.preventDefault();
      }
    }
  },
  beforeUnmount() {
    Dap.event.off(
      document.documentElement,
      `mousemove.picker_${this.uid} mouseup.picker_${this.uid}`
    );
  }
};
const _hoisted_1$H = { class: "mvi-picker" };
const _hoisted_2$A = {
  key: 1,
  class: "mvi-picker-toolbar"
};
const _hoisted_3$s = ["textContent"];
const _hoisted_4$l = ["textContent"];
const _hoisted_5$g = ["textContent"];
const _hoisted_6$b = ["onTouchstart", "onMousedown"];
const _hoisted_7$a = ["textContent"];
function _sfc_render$W(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Loading = resolveComponent("Loading");
  return openBlock(), createElementBlock("div", _hoisted_1$H, [
    $props.loading ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "mvi-picker-loading",
      style: normalizeStyle($options.loadingStyle)
    }, [
      createVNode(_component_Loading, {
        size: "0.5rem",
        color: "#ddd"
      })
    ], 4)) : createCommentVNode("", true),
    $props.showToolbar && !$props.loading ? (openBlock(), createElementBlock("div", _hoisted_2$A, [
      createElementVNode("div", {
        class: normalizeClass(["mvi-picker-toolbar-cancel", $props.cancelClass || ""]),
        textContent: toDisplayString($props.cancelText),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.doCancel && $options.doCancel(...args))
      }, null, 10, _hoisted_3$s),
      $props.title ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["mvi-picker-toolbar-title", $props.titleClass || ""]),
        textContent: toDisplayString($props.title)
      }, null, 10, _hoisted_4$l)) : createCommentVNode("", true),
      createElementVNode("div", {
        class: normalizeClass(["mvi-picker-toolbar-confirm", $props.confirmClass || ""]),
        textContent: toDisplayString($props.confirmText),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.doConfirm && $options.doConfirm(...args))
      }, null, 10, _hoisted_5$g)
    ])) : createCommentVNode("", true),
    !$props.loading ? (openBlock(), createElementBlock("div", {
      key: 2,
      class: "mvi-picker-content",
      style: normalizeStyle($options.contentStyle),
      ref: "content",
      onTouchmove: _cache[4] || (_cache[4] = (...args) => $options.contentTouchMove && $options.contentTouchMove(...args))
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.computedOptions, (column, index) => {
        return openBlock(), createElementBlock("div", {
          key: "picker-column-" + index,
          class: normalizeClass(["mvi-picker-items", column.className || ""]),
          ref_for: true,
          ref: (el) => $data.itemRefs[index] = el,
          style: normalizeStyle($options.columnStyle(column, index)),
          onTouchstart: ($event) => $options.touchstart($event, index),
          onTouchmove: _cache[2] || (_cache[2] = (...args) => $options.touchmove && $options.touchmove(...args)),
          onTouchend: _cache[3] || (_cache[3] = (...args) => $options.touchend && $options.touchend(...args)),
          onMousedown: ($event) => $options.mousedown($event, index)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(column.values, (item, index2) => {
            return openBlock(), createElementBlock("div", {
              class: "mvi-picker-item",
              key: "picker-item-" + index2,
              textContent: toDisplayString(item),
              style: normalizeStyle({ height: $props.selectHeight || "" })
            }, null, 12, _hoisted_7$a);
          }), 128))
        ], 46, _hoisted_6$b);
      }), 128)),
      createElementVNode("div", {
        class: "mvi-picker-active",
        style: normalizeStyle({ height: $props.selectHeight || "" })
      }, null, 4),
      createElementVNode("div", {
        class: "mvi-picker-mask",
        style: normalizeStyle($options.maskStyle)
      }, null, 4)
    ], 36)) : createCommentVNode("", true)
  ]);
}
const Picker = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["render", _sfc_render$W], ["__scopeId", "data-v-7fe53e50"]]);
Picker.install = (app) => {
  app.component(Picker.name, Picker);
};
const datePicker_vue_vue_type_style_index_0_scoped_6cc270f0_lang = "";
const _sfc_main$V = {
  name: "m-date-picker",
  emits: ["update:modelValue", "confirm", "cancel", "change"],
  props: {
    modelValue: {
      type: Date,
      default: function() {
        return new Date();
      }
    },
    startDate: {
      type: Date,
      default: function() {
        let date = new Date();
        date.setFullYear(1970);
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
    },
    endDate: {
      type: Date,
      default: function() {
        let date = new Date();
        date.setFullYear(2099);
        date.setMonth(11);
        date.setDate(31);
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(999);
        return date;
      }
    },
    mode: {
      type: String,
      default: "date",
      validator(value) {
        return ["date", "datetime", "time", "month", "year"].includes(
          value
        );
      }
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: null
    },
    titleClass: {
      type: String,
      default: null
    },
    confirmText: {
      type: String,
      default: "\u786E\u5B9A"
    },
    cancelText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    confirmClass: {
      type: String,
      default: null
    },
    cancelClass: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    visibleCounts: {
      type: Number,
      default: 5
    },
    selectHeight: {
      type: String,
      default: "0.88rem"
    }
  },
  computed: {
    equalStartYear() {
      return this.selectedDate.getFullYear() == this.startDate.getFullYear();
    },
    equalStartMonth() {
      return this.selectedDate.getMonth() == this.startDate.getMonth();
    },
    equalStartDay() {
      return this.selectedDate.getDate() == this.startDate.getDate();
    },
    equalStartHour() {
      return this.selectedDate.getHours() == this.startDate.getHours();
    },
    equalStartMin() {
      return this.selectedDate.getMinutes() == this.startDate.getMinutes();
    },
    equalEndYear() {
      return this.selectedDate.getFullYear() == this.endDate.getFullYear();
    },
    equalEndMonth() {
      return this.selectedDate.getMonth() == this.endDate.getMonth();
    },
    equalEndDay() {
      return this.selectedDate.getDate() == this.endDate.getDate();
    },
    equalEndHour() {
      return this.selectedDate.getHours() == this.endDate.getHours();
    },
    equalEndMin() {
      return this.selectedDate.getMinutes() == this.endDate.getMinutes();
    },
    yearArray() {
      let years = [];
      let startYear = this.startDate.getFullYear();
      let endYear = this.endDate.getFullYear();
      for (let i = startYear; i <= endYear; i++) {
        years.push({
          year: i,
          yearFormat: `${i}\u5E74`,
          current: i == this.selectedDate.getFullYear()
        });
      }
      return years;
    },
    monthArray() {
      let months = [];
      if (this.selectedDate.getFullYear() == this.startDate.getFullYear()) {
        let startMonth = this.startDate.getMonth() + 1;
        let endMonth = 12;
        if (this.selectedDate.getFullYear() == this.endDate.getFullYear()) {
          endMonth = this.endDate.getMonth() + 1;
        }
        for (let i = startMonth; i <= endMonth; i++) {
          months.push({
            month: i,
            monthFormat: `${i}\u6708`,
            current: i == this.selectedDate.getMonth() + 1
          });
        }
      } else if (this.selectedDate.getFullYear() == this.endDate.getFullYear()) {
        let endMonth = this.endDate.getMonth() + 1;
        for (let i = 1; i <= endMonth; i++) {
          months.push({
            month: i,
            monthFormat: `${i}\u6708`,
            current: i == this.selectedDate.getMonth() + 1
          });
        }
      } else {
        for (let i = 1; i <= 12; i++) {
          months.push({
            month: i,
            monthFormat: `${i}\u6708`,
            current: i == this.selectedDate.getMonth() + 1
          });
        }
      }
      return months;
    },
    dayArray() {
      let totalDays = Dap.date.getDays(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth() + 1
      );
      let days = [];
      if (this.selectedDate.getFullYear() == this.startDate.getFullYear() && this.selectedDate.getMonth() == this.startDate.getMonth()) {
        let startDay = this.startDate.getDate();
        let endDay = totalDays;
        if (this.selectedDate.getFullYear() == this.endDate.getFullYear() && this.selectedDate.getMonth() == this.endDate.getMonth()) {
          endDay = this.endDate.getDate();
        }
        for (let i = startDay; i <= endDay; i++) {
          days.push({
            day: i,
            dayFormat: `${i}\u65E5`,
            current: i == this.selectedDate.getDate()
          });
        }
      } else if (this.selectedDate.getFullYear() == this.endDate.getFullYear() && this.selectedDate.getMonth() == this.endDate.getMonth()) {
        let endDay = this.endDate.getDate();
        for (let i = 1; i <= endDay; i++) {
          days.push({
            day: i,
            dayFormat: `${i}\u65E5`,
            current: i == this.selectedDate.getDate()
          });
        }
      } else {
        for (let i = 1; i <= totalDays; i++) {
          days.push({
            day: i,
            dayFormat: `${i}\u65E5`,
            current: i == this.selectedDate.getDate()
          });
        }
      }
      return days;
    },
    hourArray() {
      let hours = [];
      if (this.selectedDate.getFullYear() == this.startDate.getFullYear() && this.selectedDate.getMonth() == this.startDate.getMonth() && this.selectedDate.getDate() == this.startDate.getDate()) {
        let startHour = this.startDate.getHours();
        let endHour = 23;
        if (this.selectedDate.getFullYear() == this.endDate.getFullYear() && this.selectedDate.getMonth() == this.endDate.getMonth() && this.selectedDate.getDate() == this.endDate.getDate()) {
          endHour = this.endDate.getHours();
        }
        for (let i = startHour; i <= endHour; i++) {
          hours.push({
            hour: i,
            hourFormat: `${i < 10 ? "0" + i : i}\u65F6`,
            current: this.selectedDate.getHours() == i
          });
        }
      } else if (this.selectedDate.getFullYear() == this.endDate.getFullYear() && this.selectedDate.getMonth() == this.endDate.getMonth() && this.selectedDate.getDate() == this.endDate.getDate()) {
        let endHour = this.endDate.getHours();
        for (let i = 0; i <= endHour; i++) {
          hours.push({
            hour: i,
            hourFormat: `${i < 10 ? "0" + i : i}\u65F6`,
            current: this.selectedDate.getHours() == i
          });
        }
      } else {
        for (let i = 0; i <= 23; i++) {
          hours.push({
            hour: i,
            hourFormat: `${i < 10 ? "0" + i : i}\u65F6`,
            current: this.selectedDate.getHours() == i
          });
        }
      }
      return hours;
    },
    minArray() {
      let mins = [];
      if (this.selectedDate.getFullYear() == this.startDate.getFullYear() && this.selectedDate.getMonth() == this.startDate.getMonth() && this.selectedDate.getDate() == this.startDate.getDate() && this.selectedDate.getHours() == this.startDate.getHours()) {
        let startMin = this.startDate.getMinutes();
        let endMin = 59;
        if (this.selectedDate.getFullYear() == this.endDate.getFullYear() && this.selectedDate.getMonth() == this.endDate.getMonth() && this.selectedDate.getDate() == this.endDate.getDate() && this.selectedDate.getHours() == this.endDate.getHours()) {
          endMin = this.endDate.getMinutes();
        }
        for (let i = startMin; i <= endMin; i++) {
          mins.push({
            min: i,
            minFormat: `${i < 10 ? "0" + i : i}\u5206`,
            current: this.selectedDate.getMinutes() == i
          });
        }
      } else if (this.selectedDate.getFullYear() == this.endDate.getFullYear() && this.selectedDate.getMonth() == this.endDate.getMonth() && this.selectedDate.getDate() == this.endDate.getDate() && this.selectedDate.getHours() == this.endDate.getHours()) {
        let endMin = this.endDate.getMinutes();
        for (let i = 0; i <= endMin; i++) {
          mins.push({
            min: i,
            minFormat: `${i < 10 ? "0" + i : i}\u5206`,
            current: this.selectedDate.getMinutes() == i
          });
        }
      } else {
        for (let i = 0; i <= 59; i++) {
          mins.push({
            min: i,
            minFormat: `${i < 10 ? "0" + i : i}\u5206`,
            current: this.selectedDate.getMinutes() == i
          });
        }
      }
      return mins;
    },
    pickerOptions() {
      let years = [];
      let defaultYearIndex = 0;
      this.yearArray.forEach((item, index) => {
        years.push(item.yearFormat);
        if (item.current) {
          defaultYearIndex = index;
        }
      });
      let months = [];
      let defaultMonthIndex = 0;
      this.monthArray.forEach((item, index) => {
        months.push(item.monthFormat);
        if (item.current) {
          defaultMonthIndex = index;
        }
      });
      let days = [];
      let defaultDayIndex = 0;
      this.dayArray.forEach((item, index) => {
        days.push(item.dayFormat);
        if (item.current) {
          defaultDayIndex = index;
        }
      });
      let hours = [];
      let defaultHourIndex = 0;
      this.hourArray.forEach((item, index) => {
        hours.push(item.hourFormat);
        if (item.current) {
          defaultHourIndex = index;
        }
      });
      let mins = [];
      let defaultMinIndex = 0;
      this.minArray.forEach((item, index) => {
        mins.push(item.minFormat);
        if (item.current) {
          defaultMinIndex = index;
        }
      });
      if (this.mode == "date") {
        return [
          {
            values: years,
            defaultIndex: defaultYearIndex
          },
          {
            values: months,
            defaultIndex: defaultMonthIndex
          },
          {
            values: days,
            defaultIndex: defaultDayIndex
          }
        ];
      } else if (this.mode == "year") {
        return {
          values: years,
          defaultIndex: defaultYearIndex
        };
      } else if (this.mode == "month") {
        return [
          {
            values: years,
            defaultIndex: defaultYearIndex
          },
          {
            values: months,
            defaultIndex: defaultMonthIndex
          }
        ];
      } else if (this.mode == "datetime") {
        return [
          {
            values: years,
            defaultIndex: defaultYearIndex
          },
          {
            values: months,
            defaultIndex: defaultMonthIndex
          },
          {
            values: days,
            defaultIndex: defaultDayIndex
          },
          {
            values: hours,
            defaultIndex: defaultHourIndex
          },
          {
            values: mins,
            defaultIndex: defaultMinIndex
          }
        ];
      } else if (this.mode == "time") {
        return [
          {
            values: hours,
            defaultIndex: defaultHourIndex
          },
          {
            values: mins,
            defaultIndex: defaultMinIndex
          }
        ];
      }
    },
    selectedDate: {
      set(value) {
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      },
      get() {
        if (this.modelValue instanceof Date) {
          if (this.modelValue.getTime() < this.startDate.getTime()) {
            return this.startDate;
          } else if (this.modelValue.getTime() > this.endDate.getTime()) {
            return this.endDate;
          } else {
            return this.modelValue;
          }
        } else {
          return new Date();
        }
      }
    }
  },
  components: {
    Picker
  },
  methods: {
    dateChange(res) {
      if (this.mode == "date") {
        if (res.columnIndex == 0) {
          let year = this.yearArray[res.selected[0].index].year;
          this.selectedDate = new Date(
            this.selectedDate.setFullYear(year)
          );
          if (this.equalEndYear) {
            if (this.selectedDate.getMonth() > this.endDate.getMonth()) {
              this.selectedDate = new Date(
                this.selectedDate.setMonth(
                  this.endDate.getMonth()
                )
              );
            }
            if (this.equalEndMonth) {
              if (this.selectedDate.getDate() > this.endDate.getDate()) {
                this.selectedDate = new Date(
                  this.selectedDate.setDate(
                    this.endDate.getDate()
                  )
                );
              }
            }
          }
          if (this.equalStartYear) {
            if (this.selectedDate.getMonth() < this.startDate.getMonth()) {
              this.selectedDate = new Date(
                this.selectedDate.setMonth(
                  this.startDate.getMonth()
                )
              );
            }
            if (this.equalStartMonth) {
              if (this.selectedDate.getDate() < this.startDate.getDate()) {
                this.selectedDate = new Date(
                  this.selectedDate.setDate(
                    this.startDate.getDate()
                  )
                );
              }
            }
          }
        } else if (res.columnIndex == 1) {
          let month = this.monthArray[res.selected[1].index].month;
          let totalDays = Dap.date.getDays(
            this.selectedDate.getFullYear(),
            month
          );
          if (this.selectedDate.getDate() > totalDays) {
            this.selectedDate.setDate(totalDays);
          }
          this.selectedDate = new Date(
            this.selectedDate.setMonth(month - 1)
          );
          if (this.equalEndYear && this.equalEndMonth) {
            if (this.selectedDate.getDate() > this.endDate.getDate()) {
              this.selectedDate = new Date(
                this.selectedDate.setDate(
                  this.endDate.getDate()
                )
              );
            }
          }
          if (this.equalStartYear && this.equalStartMonth) {
            if (this.selectedDate.getDate() < this.startDate.getDate()) {
              this.selectedDate = new Date(
                this.selectedDate.setDate(
                  this.startDate.getDate()
                )
              );
            }
          }
        } else if (res.columnIndex == 2) {
          let day = this.dayArray[res.selected[2].index].day;
          this.selectedDate = new Date(this.selectedDate.setDate(day));
        }
      } else if (this.mode == "month") {
        if (res.columnIndex == 0) {
          let year = this.yearArray[res.selected[0].index].year;
          this.selectedDate = new Date(
            this.selectedDate.setFullYear(year)
          );
          if (this.equalEndYear) {
            if (this.selectedDate.getMonth() > this.endDate.getMonth()) {
              this.selectedDate = new Date(
                this.selectedDate.setMonth(
                  this.endDate.getMonth()
                )
              );
            }
            if (this.equalEndMonth) {
              if (this.selectedDate.getDate() > this.endDate.getDate()) {
                this.selectedDate = new Date(
                  this.selectedDate.setDate(
                    this.endDate.getDate()
                  )
                );
              }
            }
          }
          if (this.equalStartYear) {
            if (this.selectedDate.getMonth() < this.startDate.getMonth()) {
              this.selectedDate = new Date(
                this.selectedDate.setMonth(
                  this.startDate.getMonth()
                )
              );
            }
            if (this.equalStartMonth) {
              if (this.selectedDate.getDate() < this.startDate.getDate()) {
                this.selectedDate = new Date(
                  this.selectedDate.setDate(
                    this.startDate.getDate()
                  )
                );
              }
            }
          }
        } else if (res.columnIndex == 1) {
          let month = this.monthArray[res.selected[1].index].month;
          let totalDays = Dap.date.getDays(
            this.selectedDate.getFullYear(),
            month
          );
          if (this.selectedDate.getDate() > totalDays) {
            this.selectedDate.setDate(totalDays);
          }
          this.selectedDate = new Date(
            this.selectedDate.setMonth(month - 1)
          );
          if (this.equalEndYear && this.equalEndMonth) {
            if (this.selectedDate.getDate() > this.endDate.getDate()) {
              this.selectedDate = new Date(
                this.selectedDate.setDate(
                  this.endDate.getDate()
                )
              );
            }
          }
          if (this.equalStartYear && this.equalStartMonth) {
            if (this.selectedDate.getDate() < this.startDate.getDate()) {
              this.selectedDate = new Date(
                this.selectedDate.setDate(
                  this.startDate.getDate()
                )
              );
            }
          }
        }
      } else if (this.mode == "year") {
        if (res.columnIndex == 0) {
          let year = this.yearArray[res.selected.index].year;
          this.selectedDate = new Date(
            this.selectedDate.setFullYear(year)
          );
          if (this.equalEndYear) {
            if (this.selectedDate.getMonth() > this.endDate.getMonth()) {
              this.selectedDate = new Date(
                this.selectedDate.setMonth(
                  this.endDate.getMonth()
                )
              );
            }
            if (this.equalEndMonth) {
              if (this.selectedDate.getDate() > this.endDate.getDate()) {
                this.selectedDate = new Date(
                  this.selectedDate.setDate(
                    this.endDate.getDate()
                  )
                );
              }
            }
          }
          if (this.equalStartYear) {
            if (this.selectedDate.getMonth() < this.startDate.getMonth()) {
              this.selectedDate = new Date(
                this.selectedDate.setMonth(
                  this.startDate.getMonth()
                )
              );
            }
            if (this.equalStartMonth) {
              if (this.selectedDate.getDate() < this.startDate.getDate()) {
                this.selectedDate = new Date(
                  this.selectedDate.setDate(
                    this.startDate.getDate()
                  )
                );
              }
            }
          }
        }
      } else if (this.mode == "datetime") {
        if (res.columnIndex == 0) {
          let year = this.yearArray[res.selected[0].index].year;
          this.selectedDate = new Date(
            this.selectedDate.setFullYear(year)
          );
          if (this.equalEndYear) {
            if (this.selectedDate.getMonth() > this.endDate.getMonth()) {
              this.selectedDate = new Date(
                this.selectedDate.setMonth(
                  this.endDate.getMonth()
                )
              );
            }
            if (this.equalEndMonth) {
              if (this.selectedDate.getDate() > this.endDate.getDate()) {
                this.selectedDate = new Date(
                  this.selectedDate.setDate(
                    this.endDate.getDate()
                  )
                );
              }
              if (this.equalEndDay) {
                if (this.selectedDate.getHours() > this.endDate.getHours()) {
                  this.selectedDate = new Date(
                    this.selectedDate.setHours(
                      this.endDate.getHours()
                    )
                  );
                }
                if (this.equalEndHour) {
                  if (this.selectedDate.getMinutes() > this.endDate.getMinutes()) {
                    this.selectedDate = new Date(
                      this.selectedDate.setMinutes(
                        this.endDate.getMinutes()
                      )
                    );
                  }
                }
              }
            }
          }
          if (this.equalStartYear) {
            if (this.selectedDate.getMonth() < this.startDate.getMonth()) {
              this.selectedDate = new Date(
                this.selectedDate.setMonth(
                  this.startDate.getMonth()
                )
              );
            }
            if (this.equalStartMonth) {
              if (this.selectedDate.getDate() < this.startDate.getDate()) {
                this.selectedDate = new Date(
                  this.selectedDate.setDate(
                    this.startDate.getDate()
                  )
                );
              }
              if (this.equalStartDay) {
                if (this.selectedDate.getHours() < this.startDate.getHours()) {
                  this.selectedDate = new Date(
                    this.selectedDate.setHours(
                      this.startDate.getHours()
                    )
                  );
                }
                if (this.equalStartHour) {
                  if (this.selectedDate.getMinutes() < this.startDate.getMinutes()) {
                    this.selectedDate = new Date(
                      this.selectedDate.setMinutes(
                        this.startDate.getMinutes()
                      )
                    );
                  }
                }
              }
            }
          }
        } else if (res.columnIndex == 1) {
          let month = this.monthArray[res.selected[1].index].month;
          let totalDays = Dap.date.getDays(
            this.selectedDate.getFullYear(),
            month
          );
          if (this.selectedDate.getDate() > totalDays) {
            this.selectedDate.setDate(totalDays);
          }
          this.selectedDate = new Date(
            this.selectedDate.setMonth(month - 1)
          );
          if (this.equalEndYear && this.equalEndMonth) {
            if (this.selectedDate.getDate() > this.endDate.getDate()) {
              this.selectedDate = new Date(
                this.selectedDate.setDate(
                  this.endDate.getDate()
                )
              );
            }
            if (this.equalEndDay) {
              if (this.selectedDate.getHours() > this.endDate.getHours()) {
                this.selectedDate = new Date(
                  this.selectedDate.setHours(
                    this.endDate.getHours()
                  )
                );
              }
              if (this.equalEndHour) {
                if (this.selectedDate.getMinutes() > this.endDate.getMinutes()) {
                  this.selectedDate = new Date(
                    this.selectedDate.setMinutes(
                      this.endDate.getMinutes()
                    )
                  );
                }
              }
            }
          }
          if (this.equalStartYear && this.equalStartMonth) {
            if (this.selectedDate.getDate() < this.startDate.getDate()) {
              this.selectedDate = new Date(
                this.selectedDate.setDate(
                  this.startDate.getDate()
                )
              );
            }
            if (this.equalStartDay) {
              if (this.selectedDate.getHours() < this.startDate.getHours()) {
                this.selectedDate = new Date(
                  this.selectedDate.setHours(
                    this.startDate.getHours()
                  )
                );
              }
              if (this.equalStartHour) {
                if (this.selectedDate.getMinutes() < this.startDate.getMinutes()) {
                  this.selectedDate = new Date(
                    this.selectedDate.setMinutes(
                      this.startDate.getMinutes()
                    )
                  );
                }
              }
            }
          }
        } else if (res.columnIndex == 2) {
          let day = this.dayArray[res.selected[2].index].day;
          this.selectedDate = new Date(this.selectedDate.setDate(day));
          if (this.equalEndYear && this.equalEndMonth && this.equalEndDay) {
            if (this.selectedDate.getHours() > this.endDate.getHours()) {
              this.selectedDate = new Date(
                this.selectedDate.setHours(
                  this.endDate.getHours()
                )
              );
            }
            if (this.equalEndHour) {
              if (this.selectedDate.getMinutes() > this.endDate.getMinutes()) {
                this.selectedDate = new Date(
                  this.selectedDate.setMinutes(
                    this.endDate.getMinutes()
                  )
                );
              }
            }
          }
          if (this.equalStartYear && this.equalStartMonth && this.equalStartDay) {
            if (this.selectedDate.getHours() < this.startDate.getHours()) {
              this.selectedDate = new Date(
                this.selectedDate.setHours(
                  this.startDate.getHours()
                )
              );
            }
            if (this.equalStartHour) {
              if (this.selectedDate.getMinutes() < this.startDate.getMinutes()) {
                this.selectedDate = new Date(
                  this.selectedDate.setMinutes(
                    this.startDate.getMinutes()
                  )
                );
              }
            }
          }
        } else if (res.columnIndex == 3) {
          let hour = this.hourArray[res.selected[3].index].hour;
          this.selectedDate = new Date(
            this.selectedDate.setHours(hour)
          );
          if (this.equalEndYear && this.equalEndMonth && this.equalEndDay && this.equalEndHour) {
            if (this.selectedDate.getMinutes() > this.endDate.getMinutes()) {
              this.selectedDate = new Date(
                this.selectedDate.setMinutes(
                  this.endDate.getMinutes()
                )
              );
            }
          }
          if (this.equalStartYear && this.equalStartMonth && this.equalStartDay && this.equalStartHour) {
            if (this.selectedDate.getMinutes() < this.startDate.getMinutes()) {
              this.selectedDate = new Date(
                this.selectedDate.setMinutes(
                  this.startDate.getMinutes()
                )
              );
            }
          }
        } else if (res.columnIndex == 4) {
          let min = this.minArray[res.selected[4].index].min;
          this.selectedDate = new Date(
            this.selectedDate.setMinutes(min)
          );
        }
      } else if (this.mode == "time") {
        if (res.columnIndex == 0) {
          let hour = this.hourArray[res.selected[0].index].hour;
          this.selectedDate = new Date(
            this.selectedDate.setHours(hour)
          );
          if (this.equalEndYear && this.equalEndMonth && this.equalEndDay && this.equalEndHour) {
            if (this.selectedDate.getMinutes() > this.endDate.getMinutes()) {
              this.selectedDate = new Date(
                this.selectedDate.setMinutes(
                  this.endDate.getMinutes()
                )
              );
            }
          }
          if (this.equalStartYear && this.equalStartMonth && this.equalStartDay && this.equalStartHour) {
            if (this.selectedDate.getMinutes() < this.startDate.getMinutes()) {
              this.selectedDate = new Date(
                this.selectedDate.setMinutes(
                  this.startDate.getMinutes()
                )
              );
            }
          }
        } else if (res.columnIndex == 1) {
          let min = this.minArray[res.selected[1].index].min;
          this.selectedDate = new Date(
            this.selectedDate.setMinutes(min)
          );
        }
      }
    },
    bindConfirm() {
      let year = this.selectedDate.getFullYear();
      let month = this.selectedDate.getMonth() + 1;
      let date = this.selectedDate.getDate();
      let hour = this.selectedDate.getHours();
      let minute = this.selectedDate.getMinutes();
      if (this.mode == "date") {
        let iosFormat = year + "/" + (month < 10 ? "0" + month : month) + "/" + (date < 10 ? "0" + date : date);
        let format = year + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date);
        this.$emit("confirm", {
          year,
          month,
          date,
          value: this.selectedDate,
          iosFormat,
          format
        });
      } else if (this.mode == "datetime") {
        let iosFormat = year + "/" + (month < 10 ? "0" + month : month) + "/" + (date < 10 ? "0" + date : date) + " " + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
        let format = year + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date) + " " + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
        this.$emit("confirm", {
          year,
          month,
          date,
          hour,
          minute,
          value: this.selectedDate,
          iosFormat,
          format
        });
      } else if (this.mode == "time") {
        let format = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
        this.$emit("confirm", {
          hour,
          minute,
          value: this.selectedDate,
          format
        });
      } else if (this.mode == "year") {
        this.$emit("confirm", {
          year,
          value: this.selectedDate
        });
      } else if (this.mode == "month") {
        let iosFormat = year + "/" + (month < 10 ? "0" + month : month);
        let format = year + "-" + (month < 10 ? "0" + month : month);
        this.$emit("confirm", {
          year,
          month,
          value: this.selectedDate,
          iosFormat,
          format
        });
      }
    },
    bindCancel() {
      let year = this.selectedDate.getFullYear();
      let month = this.selectedDate.getMonth() + 1;
      let date = this.selectedDate.getDate();
      let hour = this.selectedDate.getHours();
      let minute = this.selectedDate.getMinutes();
      if (this.mode == "date") {
        let iosFormat = year + "/" + (month < 10 ? "0" + month : month) + "/" + (date < 10 ? "0" + date : date);
        let format = year + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date);
        this.$emit("cancel", {
          year,
          month,
          date,
          value: this.selectedDate,
          iosFormat,
          format
        });
      } else if (this.mode == "datetime") {
        let iosFormat = year + "/" + (month < 10 ? "0" + month : month) + "/" + (date < 10 ? "0" + date : date) + " " + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
        let format = year + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date) + " " + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
        this.$emit("cancel", {
          year,
          month,
          date,
          hour,
          minute,
          value: this.selectedDate,
          iosFormat,
          format
        });
      } else if (this.mode == "time") {
        let format = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
        this.$emit("cancel", {
          hour,
          minute,
          value: this.selectedDate,
          format
        });
      } else if (this.mode == "year") {
        this.$emit("cancel", {
          year,
          value: this.selectedDate
        });
      } else if (this.mode == "month") {
        let iosFormat = year + "/" + (month < 10 ? "0" + month : month);
        let format = year + "-" + (month < 10 ? "0" + month : month);
        this.$emit("cancel", {
          year,
          month,
          value: this.selectedDate,
          iosFormat,
          format
        });
      }
    }
  }
};
const _hoisted_1$G = { class: "mvi-date-picker" };
function _sfc_render$V(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Picker = resolveComponent("Picker");
  return openBlock(), createElementBlock("div", _hoisted_1$G, [
    createVNode(_component_Picker, {
      options: $options.pickerOptions,
      "show-toolbar": $props.showToolbar,
      title: $props.title,
      "title-class": $props.titleClass,
      "confirm-text": $props.confirmText,
      "cancel-text": $props.cancelText,
      "confirm-class": $props.confirmClass,
      "cancel-class": $props.cancelClass,
      loading: $props.loading,
      "visible-counts": $props.visibleCounts,
      "select-height": $props.selectHeight,
      onChange: $options.dateChange,
      onConfirm: $options.bindConfirm,
      onCancel: $options.bindCancel
    }, null, 8, ["options", "show-toolbar", "title", "title-class", "confirm-text", "cancel-text", "confirm-class", "cancel-class", "loading", "visible-counts", "select-height", "onChange", "onConfirm", "onCancel"])
  ]);
}
const DatePicker = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["render", _sfc_render$V], ["__scopeId", "data-v-6cc270f0"]]);
DatePicker.install = (app) => {
  app.component(DatePicker.name, DatePicker);
};
const dateNativePicker_vue_vue_type_style_index_0_scoped_b2fa2165_lang = "";
const _sfc_main$U = {
  name: "m-date-native-picker",
  emits: ["update:modelValue", "error", "change"],
  props: {
    type: {
      type: String,
      default: "date",
      validator(value) {
        return ["date", "datetime", "month", "time"].includes(value);
      }
    },
    modelValue: {
      type: Date,
      default: null
    },
    max: {
      type: Date,
      default: null
    },
    min: {
      type: Date,
      default: null
    }
  },
  computed: {
    dateType() {
      if (this.type == "datetime") {
        return "datetime-local";
      } else {
        return this.type;
      }
    }
  },
  data() {
    return {
      ios: Dap.platform.os().ios
    };
  },
  methods: {
    trigger() {
      if (this.ios) {
        this.$el.focus();
      } else {
        this.$el.click();
      }
    },
    selectDateForIOS() {
      if (this.ios) {
        let date = this.dateParse(this.$el.value);
        if (date) {
          if (this.min) {
            let minTime = this.min.getTime();
            if (date.getTime() < minTime) {
              this.$emit("error", "\u9009\u62E9\u7684\u65F6\u95F4\u5C0F\u4E8E\u9650\u5B9A\u6700\u5C0F\u65F6\u95F4");
              return;
            }
          }
          if (this.max) {
            let maxTime = this.max.getTime();
            if (date.getTime() > maxTime) {
              this.$emit("error", "\u9009\u62E9\u7684\u65F6\u95F4\u5927\u4E8E\u9650\u5B9A\u6700\u5927\u65F6\u95F4");
              return;
            }
          }
        }
        this.$emit("update:modelValue", date);
        this.$emit("change", date);
      }
    },
    selectDateForAndroid() {
      if (!this.ios) {
        let date = this.dateParse(this.$el.value);
        if (date) {
          if (this.min) {
            let minTime = this.min.getTime();
            if (date.getTime() < minTime) {
              this.$emit("error", "\u9009\u62E9\u7684\u65F6\u95F4\u5C0F\u4E8E\u9650\u5B9A\u6700\u5C0F\u65F6\u95F4");
              return;
            }
          }
          if (this.max) {
            let maxTime = this.max.getTime();
            if (date.getTime() > maxTime) {
              this.$emit("error", "\u9009\u62E9\u7684\u65F6\u95F4\u5927\u4E8E\u9650\u5B9A\u6700\u5927\u65F6\u95F4");
              return;
            }
          }
        }
        this.$emit("update:modelValue", date);
        this.$emit("change", date);
      }
    },
    dateParse(value) {
      if (value) {
        if (this.type == "date") {
          let obj = this.dateParseDate(value);
          let d = new Date();
          d.setFullYear(obj.year);
          d.setMonth(obj.month - 1);
          d.setDate(obj.date);
          return d;
        } else if (this.type == "datetime") {
          let dateArray = value.split("T");
          let dateObj = this.dateParseDate(dateArray[0]);
          let timeObj = this.dateParseTime(dateArray[1]);
          let d = new Date();
          d.setFullYear(dateObj.year);
          d.setMonth(dateObj.month - 1);
          d.setDate(dateObj.date);
          d.setHours(timeObj.hour);
          d.setMinutes(timeObj.min);
          return d;
        } else if (this.type == "month") {
          let obj = this.dateParseDate(value);
          let d = new Date();
          d.setFullYear(obj.year);
          d.setMonth(obj.month - 1);
          return d;
        } else if (this.type == "time") {
          let obj = this.dateParseTime(value);
          let d = new Date();
          d.setHours(obj.hour);
          d.setMinutes(obj.min);
          return d;
        }
      } else {
        return null;
      }
    },
    dateParseTime(value) {
      let dateArray = value.split(":");
      let hour = dateArray[0];
      let min = dateArray[1];
      return {
        hour,
        min
      };
    },
    dateParseDate(value) {
      let dateArray = value.split("-");
      let year = Number(dateArray[0]);
      let month = Number(dateArray[1]);
      let date = Number(dateArray[2]);
      return {
        year,
        month,
        date
      };
    }
  }
};
const _hoisted_1$F = ["type"];
function _sfc_render$U(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", {
    onBlur: _cache[0] || (_cache[0] = (...args) => $options.selectDateForIOS && $options.selectDateForIOS(...args)),
    onChange: _cache[1] || (_cache[1] = (...args) => $options.selectDateForAndroid && $options.selectDateForAndroid(...args)),
    class: "mvi-date-native-picker",
    type: $options.dateType
  }, null, 40, _hoisted_1$F);
}
const DateNativePicker = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["render", _sfc_render$U], ["__scopeId", "data-v-b2fa2165"]]);
DateNativePicker.install = (app) => {
  app.component(DateNativePicker.name, DateNativePicker);
};
const input_vue_vue_type_style_index_0_scoped_ca0535b5_lang = "";
const _sfc_main$T = {
  name: "m-input",
  data() {
    return {
      focus: false
    };
  },
  emits: [
    "update:modelValue",
    "update:date",
    "left-click",
    "right-click",
    "focus",
    "blur",
    "input",
    "clear"
  ],
  props: {
    label: {
      type: String,
      default: null
    },
    labelClass: {
      type: String,
      default: null
    },
    labelWidth: {
      type: String,
      default: null
    },
    labelAlign: {
      type: String,
      default: "left",
      validator(value) {
        return ["left", "center", "right"].includes(value);
      }
    },
    labelOffset: {
      type: String,
      default: null
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    name: {
      type: String,
      default: null
    },
    maxlength: {
      type: Number,
      default: -1
    },
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return ["medium", "large"].includes(value);
      }
    },
    border: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    leftIcon: {
      type: [String, Object],
      default: null
    },
    rightIcon: {
      type: [String, Object],
      default: null
    },
    date: {
      type: Date,
      default: null
    },
    format: {
      type: String,
      default: null
    },
    rows: {
      type: Number,
      default: 1
    },
    autosize: {
      type: [Boolean, Object],
      default: false,
      validator(value) {
        if (Dap.common.isObject(value)) {
          if (Dap.number.isNumber(value.minRows) && Dap.number.isNumber(value.maxRows)) {
            if (value.minRows > value.maxRows) {
              return false;
            }
          }
        }
        return true;
      }
    },
    inputAlign: {
      type: String,
      default: "left",
      validator(value) {
        return ["left", "center", "right"].includes(value);
      }
    },
    inputMode: {
      type: [String, Boolean],
      default: false,
      validator(value) {
        return [
          false,
          "none",
          "text",
          "decimal",
          "numeric",
          "tel",
          "search",
          "email",
          "url"
        ].includes(value);
      }
    }
  },
  computed: {
    showClear() {
      if (this.disabled || this.readonly) {
        return false;
      }
      if (this.focus) {
        if (this.realValue === "") {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    leftIconType() {
      let type = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.type == "string") {
          type = this.leftIcon.type;
        }
      } else if (typeof this.leftIcon == "string") {
        type = this.leftIcon;
      }
      return type;
    },
    leftIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.url == "string") {
          url = this.leftIcon.url;
        }
      }
      return url;
    },
    leftIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.spin == "boolean") {
          spin = this.leftIcon.spin;
        }
      }
      return spin;
    },
    leftIconSize() {
      let size = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.size == "string") {
          size = this.leftIcon.size;
        }
      }
      return size;
    },
    leftIconColor() {
      let color = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.color == "string") {
          color = this.leftIcon.color;
        }
      }
      return color;
    },
    rightIconType() {
      let type = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.type == "string") {
          type = this.rightIcon.type;
        }
      } else if (typeof this.rightIcon == "string") {
        type = this.rightIcon;
      }
      return type;
    },
    rightIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.url == "string") {
          url = this.rightIcon.url;
        }
      }
      return url;
    },
    rightIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.spin == "boolean") {
          spin = this.rightIcon.spin;
        }
      }
      return spin;
    },
    rightIconSize() {
      let size = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.size == "string") {
          size = this.rightIcon.size;
        }
      }
      return size;
    },
    rightIconColor() {
      let color = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.color == "string") {
          color = this.rightIcon.color;
        }
      }
      return color;
    },
    realDate: {
      set(value) {
        this.$emit("update:date", value);
      },
      get() {
        return this.date;
      }
    },
    realValue: {
      set(value) {
        if (this.modelValue !== value) {
          this.$emit("update:modelValue", value);
        }
      },
      get() {
        let value = this.modelValue === null ? "" : this.modelValue.toString();
        if (this.isDatePicker) {
          value = this.getDateValue();
        } else {
          if (this.type == "number") {
            value = value.replace(/\D/g, "");
          }
          if (this.maxlength > 0 && value.length > this.maxlength) {
            value = value.substr(0, this.maxlength);
          }
        }
        if (this.modelValue !== value) {
          this.$emit("update:modelValue", value);
        }
        return value;
      }
    },
    inputType() {
      let type = "text";
      if (this.isDatePicker || this.type == "number") {
        type = "text";
      } else {
        type = this.type;
      }
      return type;
    },
    computedInputMode() {
      let mode = false;
      if (typeof this.inputMode == "string") {
        mode = this.inputMode;
      }
      return mode;
    },
    dateType() {
      let type = "date";
      if (this.isDatePicker) {
        type = this.type;
      }
      return type;
    },
    isDatePicker() {
      return ["date", "datetime", "month", "time"].includes(this.type);
    },
    rowsFilter() {
      let rows = this.rows;
      if (Dap.common.isObject(this.autosize)) {
        if (Dap.number.isNumber(this.autosize.minRows)) {
          if (this.rows < this.autosize.minRows) {
            rows = this.autosize.minRows;
          }
        }
        if (Dap.number.isNumber(this.autosize.maxRows)) {
          if (this.rows > this.autosize.maxRows) {
            rows = this.autosize.maxRows;
          }
        }
      }
      return rows;
    },
    labelStyle() {
      let style = {};
      if (this.labelWidth) {
        style.width = this.labelWidth;
      }
      if (this.labelAlign) {
        if (this.labelAlign == "left") {
          style.justifyContent = "flex-start";
        } else if (this.labelAlign == "right") {
          style.justifyContent = "flex-end";
        } else {
          style.justifyContent = this.labelAlign;
        }
      }
      if (this.labelOffset) {
        style.marginRight = this.labelOffset;
      }
      return style;
    },
    inputStyle() {
      let style = {};
      if (this.inputAlign) {
        style.textAlign = this.inputAlign;
      }
      return style;
    },
    textareaStyle() {
      let style = {};
      if (this.inputAlign) {
        style.textAlign = this.inputAlign;
      }
      return style;
    }
  },
  components: {
    Icon,
    DateNativePicker
  },
  mounted() {
    if (this.$refs.textarea) {
      this.setMaxMinHeight();
      if (this.autosize == true || Dap.common.isObject(this.autosize)) {
        this.autosizeSet();
      }
    }
  },
  watch: {
    realValue(newValue) {
      if (this.$refs.textarea && (this.autosize == true || Dap.common.isObject(this.autosize))) {
        this.autosizeSet();
      }
    },
    rows(newValue) {
      if (this.$refs.textarea) {
        this.setMaxMinHeight();
      }
    },
    autosize(newValue) {
      if (this.$refs.textarea) {
        this.setMaxMinHeight();
      }
    },
    showClear(newValue) {
      this.$nextTick(() => {
        if (this.$refs.textarea && (this.autosize == true || Dap.common.isObject(this.autosize))) {
          this.autosizeSet();
        }
      });
    }
  },
  methods: {
    getFocus(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("focus", this.realValue);
      setTimeout(() => {
        this.focus = true;
      }, 200);
    },
    getBlur(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("blur", this.realValue);
      setTimeout(() => {
        this.focus = false;
      }, 200);
    },
    leftClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("left-click", this.realValue);
    },
    rightClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("right-click", this.realValue);
    },
    doClearValue() {
      if (this.disabled) {
        return;
      }
      if (!this.clearable) {
        return;
      }
      this.realValue = "";
      if (this.type == "textarea") {
        this.$refs.textarea.focus();
      } else if (this.isDatePicker) {
        this.realDate = null;
      } else {
        this.$refs.input.focus();
      }
      this.$emit("clear", "");
    },
    input(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("input", this.realValue);
    },
    autosizeSet() {
      this.$refs.textarea.style.height = "auto";
      this.$refs.textarea.scrollTop = 0;
      this.$refs.textarea.style.height = Dap.element.getScrollHeight(this.$refs.textarea) + "px";
    },
    rows2Height(rows) {
      let lineHeight = Math.floor(
        parseFloat(
          Dap.element.getCssStyle(this.$refs.textarea, "line-height")
        )
      );
      return rows * lineHeight;
    },
    setMaxMinHeight() {
      if (Dap.common.isObject(this.autosize)) {
        if (Dap.number.isNumber(this.autosize.maxRows)) {
          let maxHeight = this.rows2Height(this.autosize.maxRows);
          this.$refs.textarea.style.maxHeight = maxHeight + "px";
        }
        if (Dap.number.isNumber(this.autosize.minRows)) {
          let minHeight = this.rows2Height(this.autosize.minRows);
          this.$refs.textarea.style.minHeight = minHeight + "px";
        }
      } else {
        this.$refs.textarea.style.maxHeight = "";
        this.$refs.textarea.style.minHeight = "";
      }
    },
    callDate() {
      if (this.isDatePicker && !this.disabled && !this.readonly) {
        this.$refs.datepicker.trigger();
      }
    },
    getDateValue() {
      if (this.date instanceof Date) {
        if (this.dateType == "date") {
          let year = this.date.getFullYear();
          let month = this.date.getMonth() + 1 < 10 ? "0" + (this.date.getMonth() + 1) : this.date.getMonth() + 1;
          let date = this.date.getDate() < 10 ? "0" + this.date.getDate() : this.date.getDate();
          if (this.format == "yyyy\u5E74mm\u6708dd\u65E5") {
            return year + "\u5E74" + month + "\u6708" + date + "\u65E5";
          } else if (this.format == "yyyy/mm/dd") {
            return year + "/" + month + "/" + date;
          } else if (this.format == "yyyy.mm.dd") {
            return year + "." + month + "." + date;
          } else {
            return year + "-" + month + "-" + date;
          }
        } else if (this.dateType == "datetime") {
          let year = this.date.getFullYear();
          let month = this.date.getMonth() + 1 < 10 ? "0" + (this.date.getMonth() + 1) : this.date.getMonth() + 1;
          let date = this.date.getDate() < 10 ? "0" + this.date.getDate() : this.date.getDate();
          let hour = this.date.getHours() < 10 ? "0" + this.date.getHours() : this.date.getHours();
          let minutes = this.date.getMinutes() < 10 ? "0" + this.date.getMinutes() : this.date.getMinutes();
          if (this.format == "yyyy\u5E74MM\u6708dd\u65E5hh\u65F6mm\u5206") {
            return year + "\u5E74" + month + "\u6708" + date + "\u65E5" + hour + "\u65F6" + minutes + "\u5206";
          } else if (this.format == "yyyy\u5E74MM\u6708dd\u65E5 hh:mm") {
            return year + "\u5E74" + month + "\u6708" + date + "\u65E5 " + hour + ":" + minutes;
          } else if (this.format == "yyyy/MM/dd hh:mm") {
            return year + "/" + month + "/" + date + " " + hour + ":" + minutes;
          } else if (this.format == "yyyy.MM.dd hh:mm") {
            return year + "." + month + "." + date + " " + hour + ":" + minutes;
          } else {
            return year + "-" + month + "-" + date + " " + hour + ":" + minutes;
          }
        } else if (this.dateType == "month") {
          let year = this.date.getFullYear();
          let month = this.date.getMonth() + 1 < 10 ? "0" + (this.date.getMonth() + 1) : this.date.getMonth() + 1;
          if (this.format == "yyyy\u5E74mm\u6708") {
            return year + "\u5E74" + month + "\u6708";
          } else if (this.format == "yyyy/mm") {
            return year + "/" + month;
          } else if (this.format == "yyyy.mm") {
            return year + "." + month;
          } else {
            return year + "-" + month;
          }
        } else if (this.dateType == "time") {
          let hour = this.date.getHours() < 10 ? "0" + this.date.getHours() : this.date.getHours();
          let minutes = this.date.getMinutes() < 10 ? "0" + this.date.getMinutes() : this.date.getMinutes();
          if (this.format == "hh\u65F6mm\u5206") {
            return hour + "\u65F6" + minutes + "\u5206";
          } else {
            return hour + ":" + minutes;
          }
        } else {
          return "";
        }
      } else {
        return "";
      }
    }
  }
};
const _hoisted_1$E = ["disabled", "data-type"];
const _hoisted_2$z = ["textContent"];
const _hoisted_3$r = ["placeholder", "maxlength", "disabled", "readonly", "autofocus", "rows", "name"];
const _hoisted_4$k = ["type", "inputmode", "placeholder", "maxlength", "disabled", "readonly", "autofocus", "name"];
const _hoisted_5$f = {
  key: 6,
  class: "mvi-input-words"
};
function _sfc_render$T(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_DateNativePicker = resolveComponent("DateNativePicker");
  return openBlock(), createElementBlock("div", {
    disabled: $props.disabled || null,
    class: normalizeClass([
      "mvi-input-container",
      "mvi-input-container-" + $props.size,
      $props.border ? "mvi-input-border" : "",
      $props.showWordLimit && $props.maxlength > 0 ? "mvi-input-container-words" : "",
      $props.required ? "mvi-input-required" : ""
    ]),
    "data-type": $props.type == "textarea" ? "textarea" : "input"
  }, [
    _ctx.$slots.left || $options.leftIconUrl || $options.leftIconType ? (openBlock(), createElementBlock("div", {
      key: 0,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.leftClick && $options.leftClick(...args)),
      class: "mvi-input-left-icon"
    }, [
      _ctx.$slots.left ? renderSlot(_ctx.$slots, "left", { key: 0 }, void 0, true) : $options.leftIconUrl || $options.leftIconType ? (openBlock(), createBlock(_component_Icon, {
        key: 1,
        type: $options.leftIconType,
        url: $options.leftIconUrl,
        spin: $options.leftIconSpin,
        size: $options.leftIconSize,
        color: $options.leftIconColor
      }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
    ])) : createCommentVNode("", true),
    $props.label ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass(["mvi-input-label", $props.labelClass || ""]),
      style: normalizeStyle($options.labelStyle)
    }, [
      createElementVNode("span", {
        textContent: toDisplayString($props.label)
      }, null, 8, _hoisted_2$z)
    ], 6)) : createCommentVNode("", true),
    $props.type == "textarea" ? withDirectives((openBlock(), createElementBlock("textarea", {
      key: 2,
      placeholder: $props.placeholder,
      maxlength: $props.maxlength,
      disabled: $props.disabled || null,
      readonly: $props.readonly || null,
      autofocus: $props.autofocus,
      class: "mvi-textarea",
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $options.realValue = $event),
      onInput: _cache[2] || (_cache[2] = (...args) => $options.input && $options.input(...args)),
      ref: "textarea",
      rows: $options.rowsFilter,
      name: $props.name,
      style: normalizeStyle($options.textareaStyle),
      onFocus: _cache[3] || (_cache[3] = (...args) => $options.getFocus && $options.getFocus(...args)),
      onBlur: _cache[4] || (_cache[4] = (...args) => $options.getBlur && $options.getBlur(...args)),
      autocomplete: "off"
    }, null, 44, _hoisted_3$r)), [
      [vModelText, $options.realValue]
    ]) : withDirectives((openBlock(), createElementBlock("input", {
      key: 3,
      type: $options.inputType,
      inputmode: $options.computedInputMode,
      placeholder: $props.placeholder,
      maxlength: $options.isDatePicker ? -1 : $props.maxlength,
      disabled: $props.disabled || null,
      readonly: $props.readonly || $options.isDatePicker || null,
      autofocus: $props.autofocus,
      class: "mvi-input",
      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $options.realValue = $event),
      onClick: _cache[6] || (_cache[6] = (...args) => $options.callDate && $options.callDate(...args)),
      onInput: _cache[7] || (_cache[7] = (...args) => $options.input && $options.input(...args)),
      ref: "input",
      name: $props.name,
      style: normalizeStyle($options.inputStyle),
      onFocus: _cache[8] || (_cache[8] = (...args) => $options.getFocus && $options.getFocus(...args)),
      onBlur: _cache[9] || (_cache[9] = (...args) => $options.getBlur && $options.getBlur(...args)),
      autocomplete: "off"
    }, null, 44, _hoisted_4$k)), [
      [vModelDynamic, $options.realValue]
    ]),
    $props.clearable ? withDirectives((openBlock(), createElementBlock("div", {
      key: 4,
      onClick: _cache[10] || (_cache[10] = (...args) => $options.doClearValue && $options.doClearValue(...args)),
      class: "mvi-input-clear-icon"
    }, [
      createVNode(_component_Icon, { type: "times-o" })
    ], 512)), [
      [vShow, $options.showClear]
    ]) : createCommentVNode("", true),
    _ctx.$slots.right || ($options.rightIconUrl || $options.rightIconType) ? (openBlock(), createElementBlock("div", {
      key: 5,
      onClick: _cache[11] || (_cache[11] = (...args) => $options.rightClick && $options.rightClick(...args)),
      class: "mvi-input-right-icon"
    }, [
      _ctx.$slots.right ? renderSlot(_ctx.$slots, "right", { key: 0 }, void 0, true) : $options.rightIconUrl || $options.rightIconType ? (openBlock(), createBlock(_component_Icon, {
        key: 1,
        ref: "rightIcon",
        type: $options.rightIconType,
        url: $options.rightIconUrl,
        spin: $options.rightIconSpin,
        size: $options.rightIconSize,
        color: $options.rightIconColor
      }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
    ])) : createCommentVNode("", true),
    $props.showWordLimit && $props.maxlength > 0 ? (openBlock(), createElementBlock("div", _hoisted_5$f, toDisplayString($options.realValue.length) + "/" + toDisplayString($props.maxlength), 1)) : createCommentVNode("", true),
    $options.isDatePicker ? (openBlock(), createBlock(_component_DateNativePicker, {
      key: 7,
      ref: "datepicker",
      type: $options.dateType,
      modelValue: $options.realDate,
      "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $options.realDate = $event)
    }, null, 8, ["type", "modelValue"])) : createCommentVNode("", true)
  ], 10, _hoisted_1$E);
}
const Input = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$T], ["__scopeId", "data-v-ca0535b5"]]);
Input.install = (app) => {
  app.component(Input.name, Input);
};
const modal_vue_vue_type_style_index_0_scoped_54196bfe_lang = "";
const _sfc_main$S = {
  name: "m-modal",
  data() {
    return {
      modalShow: false,
      firstShow: false
    };
  },
  emits: [
    "update:modelValue",
    "show",
    "showing",
    "shown",
    "hide",
    "hidding",
    "hidden"
  ],
  inheritAttrs: false,
  props: {
    mountEl: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ""
    },
    titleClass: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: ""
    },
    contentClass: {
      type: String,
      default: null
    },
    footer: {
      type: String,
      default: null
    },
    footerClass: {
      type: String,
      default: null
    },
    showTimes: {
      type: Boolean,
      default: false
    },
    timesIcon: {
      type: [String, Object],
      default: null
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    timeout: {
      type: Number,
      default: 200
    },
    closable: {
      type: Boolean,
      default: false
    },
    overlayColor: {
      type: String,
      default: null
    },
    modalColor: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: 900
    },
    width: {
      type: String,
      default: null
    },
    footerPadding: {
      type: Boolean,
      default: true
    },
    contentPadding: {
      type: Boolean,
      default: true
    },
    headerPadding: {
      type: Boolean,
      default: true
    },
    radius: {
      type: String,
      default: null
    },
    animation: {
      type: String,
      default: "scale"
    },
    titleEllipsis: {
      type: Boolean,
      default: false
    },
    usePadding: {
      type: Boolean,
      default: false
    },
    fullScreen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    $$el() {
      return this.$refs.overlay.$$el;
    },
    iconType() {
      let type = "times";
      if (Dap.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.type == "string") {
          type = this.timesIcon.type;
        }
      } else if (typeof this.timesIcon == "string") {
        type = this.timesIcon;
      }
      return type;
    },
    iconUrl() {
      let url = null;
      if (Dap.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.url == "string") {
          url = this.timesIcon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.spin == "boolean") {
          spin = this.timesIcon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (Dap.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.size == "string") {
          size = this.timesIcon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color = null;
      if (Dap.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.color == "string") {
          color = this.timesIcon.color;
        }
      }
      return color;
    },
    modalStyle() {
      let style = {};
      style.zIndex = this.zIndex + 10;
      return style;
    },
    wrapperStyle() {
      let style = {};
      if (this.radius) {
        style.borderRadius = this.radius;
      }
      if (this.modalColor) {
        style.background = this.modalColor;
      }
      if (this.color) {
        style.color = this.color;
      }
      style.transition = "all " + this.timeout + "ms";
      style.webkitTransition = "all " + this.timeout + "ms";
      return style;
    },
    titleCls() {
      let cls = ["mvi-modal-title"];
      if (this.titleEllipsis) {
        cls.push("mvi-modal-title-ellipsis");
      }
      if (this.titleClass) {
        cls.push(this.titleClass);
      }
      return cls;
    },
    headerStyle() {
      let style = {};
      if (this.$slots.default || this.content) {
        style.paddingBottom = "0";
      }
      if (!this.headerPadding) {
        style.padding = "0";
      }
      return style;
    }
  },
  components: {
    Icon,
    Overlay
  },
  watch: {
    fullScreen(newValue) {
      this.modalSize();
    }
  },
  methods: {
    modalSize() {
      if (this.fullScreen) {
        this.$refs.modal.style.width = this.$refs.overlay.$$el.offsetParent.offsetWidth + "px";
        this.$refs.wrapper.style.height = this.$refs.overlay.$$el.offsetParent.offsetHeight + "px";
        this.$refs.wrapper.style.maxHeight = "";
      } else {
        if (this.width) {
          this.$refs.modal.style.width = this.width;
        } else {
          this.$refs.modal.style.width = "";
        }
        this.$refs.wrapper.style.maxHeight = this.$refs.overlay.$$el.offsetParent.offsetHeight * 0.96 + "px";
        this.$refs.wrapper.style.height = "";
      }
    },
    overlayShow(el) {
      if (!this.firstShow) {
        this.firstShow = true;
      }
      this.modalShow = true;
    },
    overlayHide() {
      this.modalShow = false;
    },
    hide() {
      if (this.closable) {
        this.hideModal();
      }
    },
    hideModal() {
      this.$emit("update:modelValue", false);
    },
    beforeEnter(el) {
      if (Dap.data.get(el, "mvi-modal-beforeEnter-trigger")) {
        return;
      }
      Dap.data.set(el, "mvi-modal-beforeEnter-trigger", true);
      this.$emit("show", el);
      if (typeof this.modalComponentWatch == "function") {
        this.modalComponentWatch.apply(this, ["show", el]);
      }
    },
    enter(el) {
      if (Dap.data.get(el, "mvi-modal-enter-trigger")) {
        return;
      }
      Dap.data.set(el, "mvi-modal-enter-trigger", true);
      this.modalSize();
      this.$emit("showing", el);
      if (typeof this.modalComponentWatch == "function") {
        this.modalComponentWatch.apply(this, ["showing", el]);
      }
    },
    afterEnter(el) {
      this.$emit("shown", el);
      if (typeof this.modalComponentWatch == "function") {
        this.modalComponentWatch.apply(this, ["shown", el]);
      }
    },
    beforeLeave(el) {
      Dap.data.remove(el, "mvi-modal-beforeEnter-trigger");
      Dap.data.remove(el, "mvi-modal-enter-trigger");
      this.$emit("hide", el);
      if (typeof this.modalComponentWatch == "function") {
        this.modalComponentWatch.apply(this, ["hide", el]);
      }
    },
    leave(el) {
      this.$emit("hidding", el);
      if (typeof this.modalComponentWatch == "function") {
        this.modalComponentWatch.apply(this, ["hidding", el]);
      }
    },
    afterLeave(el) {
      this.$emit("hidden", el);
      if (typeof this.modalComponentWatch == "function") {
        this.modalComponentWatch.apply(this, ["hidden", el]);
      }
    }
  }
};
const _hoisted_1$D = ["innerHTML"];
const _hoisted_2$y = ["innerHTML"];
const _hoisted_3$q = ["innerHTML"];
function _sfc_render$S(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Overlay = resolveComponent("Overlay");
  return openBlock(), createBlock(_component_Overlay, {
    ref: "overlay",
    "model-value": $props.modelValue,
    onShow: $options.overlayShow,
    onHide: $options.overlayHide,
    "use-padding": $props.usePadding,
    "z-index": $props.zIndex,
    onClick: withModifiers($options.hide, ["self"]),
    color: $props.overlayColor,
    timeout: $props.timeout,
    "mount-el": $props.mountEl
  }, {
    default: withCtx(() => [
      createElementVNode("div", {
        ref: "modal",
        class: "mvi-modal",
        style: normalizeStyle($options.modalStyle)
      }, [
        createVNode(Transition, {
          name: "mvi-modal-" + $props.animation,
          onBeforeEnter: $options.beforeEnter,
          onEnter: $options.enter,
          onAfterEnter: $options.afterEnter,
          onBeforeLeave: $options.beforeLeave,
          onLeave: $options.leave,
          onAfterLeave: $options.afterLeave
        }, {
          default: withCtx(() => [
            $data.firstShow ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              class: "mvi-modal-wrapper",
              ref: "wrapper",
              style: $options.wrapperStyle
            }, _ctx.$attrs), [
              $props.showTimes && ($options.iconType || $options.iconUrl) ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "mvi-modal-times",
                onClick: _cache[0] || (_cache[0] = (...args) => $options.hideModal && $options.hideModal(...args))
              }, [
                createVNode(_component_Icon, {
                  type: $options.iconType,
                  url: $options.iconUrl,
                  spin: $options.iconSpin,
                  size: $options.iconSize,
                  color: $options.iconColor
                }, null, 8, ["type", "url", "spin", "size", "color"])
              ])) : createCommentVNode("", true),
              _ctx.$slots.title || $props.title ? (openBlock(), createElementBlock("div", {
                key: 1,
                ref: "header",
                class: normalizeClass($options.titleCls),
                style: normalizeStyle($options.headerStyle)
              }, [
                _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : $props.title ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  innerHTML: $props.title
                }, null, 8, _hoisted_1$D)) : createCommentVNode("", true)
              ], 6)) : createCommentVNode("", true),
              _ctx.$slots.default || $props.content ? (openBlock(), createElementBlock("div", {
                key: 2,
                ref: "content",
                class: normalizeClass(["mvi-modal-content", $props.contentClass || ""]),
                style: normalizeStyle({ padding: $props.contentPadding ? "" : "0" })
              }, [
                _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : $props.content ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  innerHTML: $props.content
                }, null, 8, _hoisted_2$y)) : createCommentVNode("", true)
              ], 6)) : createCommentVNode("", true),
              _ctx.$slots.footer || $props.footer ? (openBlock(), createElementBlock("div", {
                key: 3,
                ref: "footer",
                class: normalizeClass(["mvi-modal-footer", $props.footerClass || ""]),
                style: normalizeStyle({ padding: $props.footerPadding ? "" : "0" })
              }, [
                _ctx.$slots.footer ? renderSlot(_ctx.$slots, "footer", { key: 0 }, void 0, true) : $props.footer ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  class: "mvi-modal-footer-text",
                  innerHTML: $props.footer
                }, null, 8, _hoisted_3$q)) : createCommentVNode("", true)
              ], 6)) : createCommentVNode("", true)
            ], 16)), [
              [vShow, $data.modalShow]
            ]) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
      ], 4)
    ]),
    _: 3
  }, 8, ["model-value", "onShow", "onHide", "use-padding", "z-index", "onClick", "color", "timeout", "mount-el"]);
}
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$S], ["__scopeId", "data-v-54196bfe"]]);
Modal.install = (app) => {
  app.component(Modal.name, Modal);
};
const dialog_vue_vue_type_style_index_0_scoped_7673a396_lang = "";
const _sfc_main$R = {
  name: "m-dialog",
  data() {
    return {
      ok: false,
      show: true,
      focus: false,
      value: ""
    };
  },
  props: {
    type: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    message: {
      default: ""
    },
    btnText: {
      type: [String, Array],
      default: null
    },
    btnColor: {
      type: [String, Array],
      default: null
    },
    width: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: null
    },
    animation: {
      type: String,
      default: null
    },
    usePadding: {
      type: Boolean,
      default: null
    },
    radius: {
      type: String,
      default: null
    },
    timeout: {
      type: Number,
      default: null
    },
    overlayColor: {
      type: String,
      default: null
    },
    ios: {
      type: Boolean,
      default: null
    },
    input: {
      type: Object,
      default: null
    },
    mountEl: {
      type: String,
      default: null
    },
    closable: {
      type: Boolean,
      default: false
    },
    remove: {
      type: Function,
      default: function() {
        return function() {
        };
      }
    }
  },
  computed: {
    $$el() {
      return this.$refs.modal.$$el;
    },
    computedTitle() {
      if (typeof this.title == "string") {
        return this.title;
      } else {
        return "\u63D0\u793A";
      }
    },
    computedMessage() {
      if (typeof this.message == "string") {
        return this.message;
      } else if (Dap.common.isObject(this.message)) {
        return JSON.stringify(this.message);
      } else {
        return String(this.message);
      }
    },
    computedBtnText() {
      let bt = null;
      if (this.type == "alert") {
        if (typeof this.btnText == "string") {
          bt = this.btnText;
        } else {
          bt = "\u786E\u5B9A";
        }
      } else {
        bt = [];
        if (this.btnText instanceof Array) {
          if (typeof this.btnText[0] == "string") {
            bt[0] = this.btnText[0];
          } else {
            bt[0] = "\u786E\u5B9A";
          }
          if (typeof this.btnText[1] == "string") {
            bt[1] = this.btnText[1];
          } else {
            bt[1] = "\u53D6\u6D88";
          }
        } else {
          bt = ["\u786E\u5B9A", "\u53D6\u6D88"];
        }
      }
      return bt;
    },
    computedBtnColor() {
      let bt = null;
      if (this.type == "alert") {
        if (typeof this.btnColor == "string") {
          bt = this.btnColor;
        } else {
          bt = null;
        }
      } else {
        bt = [];
        if (this.btnColor instanceof Array) {
          if (typeof this.btnColor[0] == "string") {
            bt[0] = this.btnColor[0];
          } else {
            bt[0] = null;
          }
          if (typeof this.btnColor[1] == "string") {
            bt[1] = this.btnColor[1];
          } else {
            bt[1] = null;
          }
        } else {
          bt = [null, null];
        }
      }
      return bt;
    },
    computedWidth() {
      if (typeof this.width == "string" && this.width) {
        return this.width;
      } else {
        return "5.6rem";
      }
    },
    computedInput() {
      let input = {
        placeholder: "",
        type: "text",
        autofocus: true,
        maxlength: -1,
        clearable: true,
        mode: false,
        align: "left",
        value: ""
      };
      if (Dap.common.isObject(this.input)) {
        if (typeof this.input.placeholder == "string") {
          input.placeholder = this.input.placeholder;
        }
        if (typeof this.input.type == "string" && this.input.type) {
          input.type = this.input.type;
        }
        if (typeof this.input.autofocus == "boolean") {
          input.autofocus = this.input.autofocus;
        }
        if (Dap.number.isNumber(this.input.maxlength)) {
          input.maxlength = this.input.maxlength;
        }
        if (typeof this.input.clearable == "boolean") {
          input.clearable = this.input.clearable;
        }
        if (typeof this.input.mode == "string") {
          input.mode = this.input.mode;
        }
        if (typeof this.input.align == "string") {
          input.align = this.input.align;
        }
        if (typeof this.input.value == "string" || Dap.number.isNumber(this.input.value)) {
          input.value = this.input.value.toString();
        }
      }
      return input;
    },
    computedZIndex() {
      if (Dap.number.isNumber(this.zIndex)) {
        return this.zIndex;
      } else {
        return 1e3;
      }
    },
    computedUsePadding() {
      if (typeof this.usePadding == "boolean") {
        return this.usePadding;
      } else {
        return false;
      }
    },
    computedAnimation() {
      if (typeof this.animation == "string" && this.animation) {
        return this.animation;
      } else {
        return "narrow";
      }
    },
    computedRadius() {
      if (typeof this.radius == "string" && this.radius) {
        return this.radius;
      } else {
        return "0.2rem";
      }
    },
    computedTimeout() {
      if (Dap.number.isNumber(this.timeout)) {
        return this.timeout;
      } else {
        return 200;
      }
    },
    computedOverlayColor() {
      if (typeof this.overlayColor == "string" && this.overlayColor) {
        return this.overlayColor;
      } else {
        if (this.computedIos) {
          return "rgba(0,10,20,.3)";
        }
        return null;
      }
    },
    computedIos() {
      if (typeof this.ios == "boolean") {
        return this.ios;
      } else {
        return false;
      }
    },
    computedMountEl() {
      if (typeof this.mountEl == "string" && this.mountEl) {
        return this.mountEl;
      } else {
        return "body";
      }
    },
    contentShow() {
      if (this.type == "alert" || this.type == "confirm") {
        if (this.computedMessage && !this.computedIos) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    showClear() {
      return this.focus && this.value;
    },
    inputClass() {
      let cls = [];
      if (this.showClear && this.computedInput.clearable) {
        cls.push("mvi-dialog-input-padding");
      }
      return cls;
    },
    inputMode() {
      let mode = false;
      if ([
        false,
        "none",
        "text",
        "decimal",
        "numeric",
        "tel",
        "search",
        "email",
        "url"
      ].includes(this.computedInput.mode)) {
        mode = this.computedInput.mode;
      }
      return mode;
    },
    inputStyle() {
      let style = {};
      if (["left", "right", "center"].includes(this.computedInput.align)) {
        style.textAlign = this.computedInput.align;
      }
      return style;
    }
  },
  components: {
    Icon,
    Modal
  },
  created() {
    if (this.type == "prompt") {
      this.setDefaultValue();
    }
  },
  mounted() {
    Dap.event.on(this.$$el, "click.dialog", this.overlayClick);
  },
  methods: {
    overlayClick(event2) {
      if (!this.closable) {
        return;
      }
      if (event2.target != event2.currentTarget) {
        return;
      }
      this.show = false;
      this.ok = false;
    },
    setDefaultValue() {
      let value = this.computedInput.value;
      if (this.computedInput.type == "number") {
        value = value.replace(/\D/g, "");
      }
      if (this.computedInput.maxlength > 0 && value.length > this.computedInput.maxlength) {
        value = value.substr(0, this.computedInput.maxlength);
      }
      this.value = value;
    },
    inputFocus(e) {
      setTimeout(() => {
        this.focus = true;
      }, 200);
    },
    inputBlur(e) {
      setTimeout(() => {
        this.focus = false;
      }, 200);
    },
    inputFun(e) {
      let value = this.value;
      if (this.computedInput.type == "number") {
        value = value.replace(/\D/g, "");
      }
      if (this.computedInput.maxlength > 0 && value.length > this.computedInput.maxlength) {
        value = value.substr(0, this.computedInput.maxlength);
      }
      this.value = value;
    },
    doClear() {
      if (!this.computedInput.clearable) {
        return;
      }
      this.value = "";
      this.$refs.input.focus();
    },
    okFun() {
      this.show = false;
      this.ok = true;
    },
    cancelFun() {
      this.show = false;
      this.ok = false;
    },
    modalHide(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["hide", this.type, el]);
      }
    },
    modalHidding(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, [
          "hidding",
          this.type,
          el
        ]);
      }
    },
    modalHidden(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["hidden", this.type, el]);
      }
      if (this.type == "alert") {
        this.remove();
      } else if (this.type == "confirm") {
        this.remove(this.ok);
      } else if (this.type == "prompt") {
        this.remove(this.ok, this.value);
      }
    },
    modalShow(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["show", this.type, el]);
      }
    },
    modalShowing(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, [
          "showing",
          this.type,
          el
        ]);
      }
    },
    modalShown(el) {
      if (this.type == "prompt" && this.computedInput.autofocus && this.$refs.input) {
        this.$refs.input.focus();
      }
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["shown", this.type, el]);
      }
    }
  }
};
const _hoisted_1$C = ["innerHTML"];
const _hoisted_2$x = ["innerHTML"];
const _hoisted_3$p = ["innerHTML"];
const _hoisted_4$j = ["type", "placeholder", "maxlength", "inputmode"];
const _hoisted_5$e = { class: "mvi-dialog-footer" };
const _hoisted_6$a = ["textContent"];
const _hoisted_7$9 = ["textContent"];
function _sfc_render$R(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Modal = resolveComponent("Modal");
  return openBlock(), createBlock(_component_Modal, {
    ref: "modal",
    modelValue: $data.show,
    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.show = $event),
    "footer-padding": false,
    onHide: $options.modalHide,
    onHidding: $options.modalHidding,
    onHidden: $options.modalHidden,
    width: $options.computedWidth,
    "z-index": $options.computedZIndex,
    radius: $options.computedRadius,
    "use-padding": $options.computedUsePadding,
    animation: $options.computedAnimation,
    onShow: $options.modalShow,
    onShowing: $options.modalShowing,
    onShown: $options.modalShown,
    timeout: $options.computedTimeout,
    "overlay-color": $options.computedOverlayColor,
    "mount-el": $options.computedMountEl
  }, createSlots({
    footer: withCtx(() => [
      createElementVNode("div", _hoisted_5$e, [
        $props.type != "alert" ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "mvi-dialog-cancel",
          textContent: toDisplayString($options.computedBtnText[1]),
          onClick: _cache[4] || (_cache[4] = (...args) => $options.cancelFun && $options.cancelFun(...args)),
          style: normalizeStyle({ color: $options.computedBtnColor[1] || "" })
        }, null, 12, _hoisted_6$a)) : createCommentVNode("", true),
        createElementVNode("div", {
          class: "mvi-dialog-ok",
          textContent: toDisplayString($props.type == "alert" ? $options.computedBtnText : $options.computedBtnText[0]),
          onClick: _cache[5] || (_cache[5] = (...args) => $options.okFun && $options.okFun(...args)),
          style: normalizeStyle({ color: $props.type == "alert" ? $options.computedBtnColor || "" : $options.computedBtnColor[0] || "" })
        }, null, 12, _hoisted_7$9)
      ])
    ]),
    _: 2
  }, [
    $options.computedTitle || $options.computedIos && $options.computedMessage ? {
      name: "title",
      fn: withCtx(() => [
        $options.computedTitle ? (openBlock(), createElementBlock("div", {
          key: 0,
          innerHTML: $options.computedTitle,
          class: "mvi-dialog-title"
        }, null, 8, _hoisted_1$C)) : createCommentVNode("", true),
        $options.computedMessage && $options.computedIos ? (openBlock(), createElementBlock("div", {
          key: 1,
          innerHTML: $options.computedMessage,
          class: "mvi-dialog-ios-content"
        }, null, 8, _hoisted_2$x)) : createCommentVNode("", true)
      ]),
      key: "0"
    } : void 0,
    $options.contentShow ? {
      name: "default",
      fn: withCtx(() => [
        !$options.computedIos && $options.computedMessage ? (openBlock(), createElementBlock("div", {
          key: 0,
          innerHTML: $options.computedMessage,
          class: "mvi-dialog-content"
        }, null, 8, _hoisted_3$p)) : createCommentVNode("", true),
        $props.type == "prompt" ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["mvi-dialog-input", !$options.computedIos && $options.computedMessage ? "mvi-dialog-input-mt" : ""])
        }, [
          withDirectives(createElementVNode("input", {
            ref: "input",
            type: $options.computedInput.type == "number" ? "text" : $options.computedInput.type,
            placeholder: $options.computedInput.placeholder,
            maxlength: $options.computedInput.maxlength,
            class: normalizeClass($options.inputClass),
            style: normalizeStyle($options.inputStyle),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.value = $event),
            onInput: _cache[1] || (_cache[1] = (...args) => $options.inputFun && $options.inputFun(...args)),
            onFocus: _cache[2] || (_cache[2] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
            onBlur: _cache[3] || (_cache[3] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
            inputmode: $options.inputMode
          }, null, 46, _hoisted_4$j), [
            [
              vModelDynamic,
              $data.value,
              void 0,
              { trim: true }
            ]
          ]),
          $options.computedInput.clearable ? withDirectives((openBlock(), createBlock(_component_Icon, {
            key: 0,
            ref: "icon",
            type: "times-o",
            class: "mvi-dialog-times",
            onClick: $options.doClear
          }, null, 8, ["onClick"])), [
            [vShow, $options.showClear]
          ]) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true)
      ]),
      key: "1"
    } : void 0
  ]), 1032, ["modelValue", "onHide", "onHidding", "onHidden", "width", "z-index", "radius", "use-padding", "animation", "onShow", "onShowing", "onShown", "timeout", "overlay-color", "mount-el"]);
}
const dialogComponent = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$R], ["__scopeId", "data-v-7673a396"]]);
const dialogPc_vue_vue_type_style_index_0_scoped_9d2e5639_lang = "";
const _sfc_main$Q = {
  name: "m-dialog-pc",
  data() {
    return {
      ok: false,
      show: true,
      focus: false,
      value: ""
    };
  },
  props: {
    type: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    message: {
      default: ""
    },
    btns: {
      type: Object,
      default: null
    },
    width: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: null
    },
    animation: {
      type: String,
      default: null
    },
    usePadding: {
      type: Boolean,
      default: null
    },
    radius: {
      type: String,
      default: null
    },
    timeout: {
      type: Number,
      default: null
    },
    overlayColor: {
      type: String,
      default: null
    },
    showTimes: {
      type: Boolean,
      default: null
    },
    input: {
      type: Object,
      default: null
    },
    mountEl: {
      type: String,
      default: null
    },
    closable: {
      type: Boolean,
      default: false
    },
    remove: {
      type: Function,
      default: function() {
        return function() {
        };
      }
    }
  },
  computed: {
    $$el() {
      return this.$refs.modal.$$el;
    },
    computedMountEl() {
      if (typeof this.mountEl == "string" && this.mountEl) {
        return this.mountEl;
      } else {
        return "body";
      }
    },
    computedShowTimes() {
      if (typeof this.showTimes == "boolean") {
        return this.showTimes;
      } else {
        return true;
      }
    },
    computedTitle() {
      if (typeof this.title == "string") {
        return this.title;
      } else {
        return "\u63D0\u793A";
      }
    },
    computedMessage() {
      if (typeof this.message == "string") {
        return this.message;
      } else if (Dap.common.isObject(this.message)) {
        return JSON.stringify(this.message);
      } else {
        return String(this.message);
      }
    },
    computedBtns() {
      let btns = {
        ok: {
          type: "primary",
          color: null,
          subColor: null,
          plain: false,
          text: "\u786E\u5B9A",
          size: "medium"
        },
        cancel: {
          type: "default",
          color: null,
          subColor: null,
          plain: false,
          text: "\u53D6\u6D88",
          size: "medium"
        }
      };
      if (Dap.common.isObject(this.btns)) {
        if (Dap.common.isObject(this.btns.ok)) {
          if (typeof this.btns.ok.type == "string") {
            btns.ok.type = this.btns.ok.type;
          }
          if (typeof this.btns.ok.color == "string") {
            btns.ok.color = this.btns.ok.color;
          }
          if (typeof this.btns.ok.subColor == "string") {
            btns.ok.subColor = this.btns.ok.subColor;
          }
          if (typeof this.btns.ok.plain == "boolean") {
            btns.ok.plain = this.btns.ok.plain;
          }
          if (typeof this.btns.ok.text == "string") {
            btns.ok.text = this.btns.ok.text;
          }
          if (typeof this.btns.ok.size == "string") {
            btns.ok.size = this.btns.ok.size;
          }
        }
        if (Dap.common.isObject(this.btns.cancel)) {
          if (typeof this.btns.cancel.type == "string") {
            btns.cancel.type = this.btns.cancel.type;
          }
          if (typeof this.btns.cancel.color == "string") {
            btns.cancel.color = this.btns.cancel.color;
          }
          if (typeof this.btns.cancel.subColor == "string") {
            btns.cancel.subColor = this.btns.cancel.subColor;
          }
          if (typeof this.btns.cancel.plain == "boolean") {
            btns.cancel.plain = this.btns.cancel.plain;
          }
          if (typeof this.btns.cancel.text == "string") {
            btns.cancel.text = this.btns.cancel.text;
          }
          if (typeof this.btns.cancel.size == "string") {
            btns.cancel.size = this.btns.cancel.size;
          }
        }
      }
      return btns;
    },
    computedWidth() {
      if (typeof this.width == "string" && this.width) {
        return this.width;
      } else {
        return "7.2rem";
      }
    },
    computedInput() {
      let input = {
        placeholder: "",
        type: "text",
        autofocus: true,
        maxlength: -1,
        clearable: false,
        align: "left",
        value: ""
      };
      if (Dap.common.isObject(this.input)) {
        if (typeof this.input.placeholder == "string") {
          input.placeholder = this.input.placeholder;
        }
        if (typeof this.input.type == "string" && this.input.type) {
          input.type = this.input.type;
        }
        if (typeof this.input.autofocus == "boolean") {
          input.autofocus = this.input.autofocus;
        }
        if (Dap.number.isNumber(this.input.maxlength)) {
          input.maxlength = this.input.maxlength;
        }
        if (typeof this.input.clearable == "boolean") {
          input.clearable = this.input.clearable;
        }
        if (typeof this.input.align == "string") {
          input.align = this.input.align;
        }
        if (typeof this.input.value == "string" || Dap.number.isNumber(this.input.value)) {
          input.value = this.input.value.toString();
        }
      }
      return input;
    },
    computedZIndex() {
      if (Dap.number.isNumber(this.zIndex)) {
        return this.zIndex;
      } else {
        return 1e3;
      }
    },
    computedUsePadding() {
      if (typeof this.usePadding == "boolean") {
        return this.usePadding;
      } else {
        return false;
      }
    },
    computedAnimation() {
      if (typeof this.animation == "string" && this.animation) {
        return this.animation;
      } else {
        return "translate-top";
      }
    },
    computedRadius() {
      if (typeof this.radius == "string" && this.radius) {
        return this.radius;
      } else {
        return "0.12rem";
      }
    },
    computedTimeout() {
      if (Dap.number.isNumber(this.timeout)) {
        return this.timeout;
      } else {
        return 200;
      }
    },
    computedOverlayColor() {
      if (typeof this.overlayColor == "string" && this.overlayColor) {
        return this.overlayColor;
      } else {
        return null;
      }
    },
    contentShow() {
      if (this.type == "Alert" || this.type == "Confirm") {
        if (this.computedMessage) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    showClear() {
      return this.focus && this.value;
    },
    inputClass() {
      let cls = [];
      if (this.showClear && this.computedInput.clearable) {
        cls.push("mvi-dialog-input-padding");
      }
      return cls;
    },
    inputStyle() {
      let style = {};
      if (["left", "right", "center"].includes(this.computedInput.align)) {
        style.textAlign = this.computedInput.align;
      }
      return style;
    }
  },
  components: {
    Icon,
    Modal,
    Button
  },
  created() {
    if (this.type == "Prompt") {
      this.setDefaultValue();
    }
  },
  mounted() {
    Dap.event.on(this.$$el, "click.dialog", this.overlayClick);
  },
  methods: {
    overlayClick(event2) {
      if (!this.closable) {
        return;
      }
      if (event2.target != event2.currentTarget) {
        return;
      }
      this.show = false;
      this.ok = false;
    },
    setDefaultValue() {
      let value = this.computedInput.value;
      if (this.computedInput.type == "number") {
        value = value.replace(/\D/g, "");
      }
      if (this.computedInput.maxlength > 0 && value.length > this.computedInput.maxlength) {
        value = value.substr(0, this.computedInput.maxlength);
      }
      this.value = value;
    },
    inputFocus() {
      setTimeout(() => {
        this.focus = true;
      }, 200);
    },
    inputBlur(e) {
      setTimeout(() => {
        this.focus = false;
      }, 200);
    },
    inputFun() {
      let value = this.value;
      if (this.computedInput.type == "number") {
        value = value.replace(/\D/g, "");
      }
      if (this.computedInput.maxlength > 0 && value.length > this.computedInput.maxlength) {
        value = value.substr(0, this.computedInput.maxlength);
      }
      this.value = value;
    },
    doClear() {
      if (!this.computedInput.clearable) {
        return;
      }
      this.value = "";
      this.$refs.input.focus();
    },
    okFun() {
      this.show = false;
      this.ok = true;
    },
    cancelFun() {
      this.show = false;
      this.ok = false;
    },
    modalHide(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["hide", this.type, el]);
      }
    },
    modalHidding(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, [
          "hidding",
          this.type,
          el
        ]);
      }
    },
    modalHidden(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["hidden", this.type, el]);
      }
      if (this.type == "Alert") {
        this.remove();
      } else if (this.type == "Confirm") {
        this.remove(this.ok);
      } else if (this.type == "Prompt") {
        this.remove(this.ok, this.value);
      }
    },
    modalShow(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["show", this.type, el]);
      }
    },
    modalShowing(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, [
          "showing",
          this.type,
          el
        ]);
      }
    },
    modalShown(el) {
      if (this.type == "Prompt" && this.computedInput.autofocus && this.$refs.input) {
        this.$refs.input.focus();
      }
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["shown", this.type, el]);
      }
    }
  }
};
const _hoisted_1$B = ["innerHTML"];
const _hoisted_2$w = ["innerHTML"];
const _hoisted_3$o = ["type", "placeholder", "maxlength"];
const _hoisted_4$i = { class: "mvi-dialog-footer" };
function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Button = resolveComponent("Button");
  const _component_Modal = resolveComponent("Modal");
  return openBlock(), createBlock(_component_Modal, {
    ref: "modal",
    modelValue: $data.show,
    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.show = $event),
    "footer-padding": false,
    onHide: $options.modalHide,
    onHidding: $options.modalHidding,
    onHidden: $options.modalHidden,
    width: $options.computedWidth,
    "z-index": $options.computedZIndex,
    radius: $options.computedRadius,
    "use-padding": $options.computedUsePadding,
    animation: $options.computedAnimation,
    onShow: $options.modalShow,
    onShowing: $options.modalShowing,
    onShown: $options.modalShown,
    timeout: $options.computedTimeout,
    "overlay-color": $options.computedOverlayColor,
    "mount-el": $options.computedMountEl
  }, createSlots({ _: 2 }, [
    $options.computedTitle ? {
      name: "title",
      fn: withCtx(() => [
        createElementVNode("div", {
          innerHTML: $options.computedTitle,
          class: "mvi-dialog-title"
        }, null, 8, _hoisted_1$B),
        $options.computedShowTimes ? (openBlock(), createBlock(_component_Icon, {
          key: 0,
          class: "mvi-dialog-close",
          onClick: $options.cancelFun,
          type: "times"
        }, null, 8, ["onClick"])) : createCommentVNode("", true)
      ]),
      key: "0"
    } : void 0,
    $options.contentShow ? {
      name: "default",
      fn: withCtx(() => [
        $options.computedMessage ? (openBlock(), createElementBlock("div", {
          key: 0,
          innerHTML: $options.computedMessage,
          class: "mvi-dialog-content"
        }, null, 8, _hoisted_2$w)) : createCommentVNode("", true),
        $props.type == "Prompt" ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["mvi-dialog-input", $options.computedMessage ? "mvi-dialog-input-mt" : ""])
        }, [
          withDirectives(createElementVNode("input", {
            ref: "input",
            type: $options.computedInput.type == "number" ? "text" : $options.computedInput.type,
            placeholder: $options.computedInput.placeholder,
            maxlength: $options.computedInput.maxlength,
            class: normalizeClass($options.inputClass),
            style: normalizeStyle($options.inputStyle),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.value = $event),
            onInput: _cache[1] || (_cache[1] = (...args) => $options.inputFun && $options.inputFun(...args)),
            onFocus: _cache[2] || (_cache[2] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
            onBlur: _cache[3] || (_cache[3] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
            onKeyup: _cache[4] || (_cache[4] = withKeys((...args) => $options.okFun && $options.okFun(...args), ["enter"]))
          }, null, 46, _hoisted_3$o), [
            [
              vModelDynamic,
              $data.value,
              void 0,
              { trim: true }
            ]
          ]),
          $options.computedInput.clearable ? withDirectives((openBlock(), createBlock(_component_Icon, {
            key: 0,
            ref: "icon",
            type: "times-o",
            class: "mvi-dialog-times",
            onClick: $options.doClear
          }, null, 8, ["onClick"])), [
            [vShow, $options.showClear]
          ]) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_4$i, [
          $props.type != "Alert" ? (openBlock(), createBlock(_component_Button, {
            key: 0,
            type: $options.computedBtns.cancel.type,
            color: $options.computedBtns.cancel.color,
            "sub-color": $options.computedBtns.cancel.subColor,
            plain: $options.computedBtns.cancel.plain,
            class: "mvi-dialog-cancel",
            onClick: $options.cancelFun,
            size: $options.computedBtns.cancel.size
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($options.computedBtns.cancel.text), 1)
            ]),
            _: 1
          }, 8, ["type", "color", "sub-color", "plain", "onClick", "size"])) : createCommentVNode("", true),
          createVNode(_component_Button, {
            type: $options.computedBtns.ok.type,
            color: $options.computedBtns.ok.color,
            "sub-color": $options.computedBtns.ok.subColor,
            plain: $options.computedBtns.ok.plain,
            onClick: $options.okFun,
            size: $options.computedBtns.ok.size
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($options.computedBtns.ok.text), 1)
            ]),
            _: 1
          }, 8, ["type", "color", "sub-color", "plain", "onClick", "size"])
        ])
      ]),
      key: "1"
    } : void 0
  ]), 1032, ["modelValue", "onHide", "onHidding", "onHidden", "width", "z-index", "radius", "use-padding", "animation", "onShow", "onShowing", "onShown", "timeout", "overlay-color", "mount-el"]);
}
const dialogPcComponent = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$Q], ["__scopeId", "data-v-9d2e5639"]]);
const Dialog = {
  initParams: (type, options) => {
    let opts = {};
    if (Dap.common.isObject(options)) {
      opts.title = options.title;
      opts.message = options.message;
      opts.width = options.width;
      opts.zIndex = options.zIndex;
      opts.usePadding = options.usePadding;
      opts.animation = options.animation;
      opts.radius = options.radius;
      opts.timeout = options.timeout;
      opts.overlayColor = options.overlayColor;
      opts.mountEl = options.mountEl;
      opts.closable = options.closable;
      if (type == "alert" || type == "confirm" || type == "prompt") {
        opts.btnText = options.btnText;
        opts.btnColor = options.btnColor;
        opts.ios = options.ios;
        opts.input = {
          placeholder: options.placeholder,
          type: options.type,
          autofocus: options.autofocus,
          maxlength: options.maxlength,
          clearable: options.clearable,
          mode: options.mode,
          align: options.align,
          value: options.value
        };
      } else if (type == "Alert" || type == "Confirm" || type == "Prompt") {
        opts.btns = options.btns;
        opts.showTimes = options.showTimes;
        opts.input = {
          placeholder: options.placeholder,
          type: options.type,
          autofocus: options.autofocus,
          maxlength: options.maxlength,
          clearable: options.clearable,
          align: options.align,
          value: options.value
        };
      }
    } else {
      opts.message = options;
    }
    opts.type = type;
    return opts;
  },
  alert: function(options) {
    return new Promise((resolve, reject) => {
      let opts = Dialog.initParams("alert", options);
      let mountNode = Dap.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(dialogComponent, {
        ...opts,
        remove: () => {
          instance.unmount();
          mountNode.remove();
          resolve();
        }
      });
      if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch;
      }
      instance.mount(mountNode);
    });
  },
  confirm: function(options) {
    return new Promise((resolve, reject) => {
      let opts = Dialog.initParams("confirm", options);
      let mountNode = Dap.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(dialogComponent, {
        ...opts,
        remove: (ok) => {
          instance.unmount();
          mountNode.remove();
          resolve(ok);
        }
      });
      if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch;
      }
      instance.mount(mountNode);
    });
  },
  prompt: function(options) {
    return new Promise((resolve, reject) => {
      let opts = Dialog.initParams("prompt", options);
      let mountNode = Dap.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(dialogComponent, {
        ...opts,
        remove: (ok, value) => {
          instance.unmount();
          mountNode.remove();
          resolve({
            ok,
            value
          });
        }
      });
      if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch;
      }
      instance.mount(mountNode);
    });
  },
  Alert: function(options) {
    return new Promise((resolve, reject) => {
      let opts = Dialog.initParams("Alert", options);
      let mountNode = Dap.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(dialogPcComponent, {
        ...opts,
        remove: () => {
          instance.unmount();
          mountNode.remove();
          resolve();
        }
      });
      if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch;
      }
      instance.mount(mountNode);
    });
  },
  Confirm: function(options) {
    return new Promise((resolve, reject) => {
      let opts = Dialog.initParams("Confirm", options);
      let mountNode = Dap.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(dialogPcComponent, {
        ...opts,
        remove: (ok) => {
          instance.unmount();
          mountNode.remove();
          resolve(ok);
        }
      });
      if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch;
      }
      instance.mount(mountNode);
    });
  },
  Prompt: function(options) {
    return new Promise((resolve, reject) => {
      let opts = Dialog.initParams("Prompt", options);
      let mountNode = Dap.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(dialogPcComponent, {
        ...opts,
        remove: (ok, value) => {
          instance.unmount();
          mountNode.remove();
          resolve({
            ok,
            value
          });
        }
      });
      if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch;
      }
      instance.mount(mountNode);
    });
  },
  install: (app) => {
    app.config.globalProperties.$alert = Dialog.alert.bind(app);
    app.provide("$alert", Dialog.alert.bind(app));
    app.config.globalProperties.$confirm = Dialog.confirm.bind(app);
    app.provide("$confirm", Dialog.confirm.bind(app));
    app.config.globalProperties.$prompt = Dialog.prompt.bind(app);
    app.provide("$prompt", Dialog.prompt.bind(app));
    app.config.globalProperties.$Alert = Dialog.Alert.bind(app);
    app.provide("$Alert", Dialog.Alert.bind(app));
    app.config.globalProperties.$Confirm = Dialog.Confirm.bind(app);
    app.provide("$Confirm", Dialog.Confirm.bind(app));
    app.config.globalProperties.$Prompt = Dialog.Prompt.bind(app);
    app.provide("$Prompt", Dialog.Prompt.bind(app));
  }
};
const toast_vue_vue_type_style_index_0_scoped_c1cbda41_lang = "";
const _sfc_main$P = {
  name: "m-toast",
  data() {
    return {
      show: true,
      timer: null,
      typeArray: ["success", "error", "loading", "info"]
    };
  },
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: null
    },
    message: {
      default: null
    },
    timeout: {
      type: Number,
      default: null
    },
    overlayColor: {
      type: String,
      default: null
    },
    background: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: null
    },
    usePadding: {
      type: Boolean,
      default: null
    },
    icon: {
      type: [String, Object],
      default: null
    },
    mountEl: {
      type: String,
      default: null
    },
    remove: {
      type: Function,
      default: function() {
        return function() {
        };
      }
    },
    init: {
      type: Function,
      default: function() {
        return function() {
        };
      }
    }
  },
  computed: {
    $$el() {
      return this.$refs.overlay.$$el;
    },
    computedUsePadding() {
      if (typeof this.usePadding == "boolean") {
        return this.usePadding;
      } else {
        return false;
      }
    },
    computedType() {
      if (this.typeArray.includes(this.type)) {
        return this.type;
      } else {
        return "info";
      }
    },
    computedIcon() {
      let icon = {
        type: this.defaultIconType,
        url: null,
        spin: false,
        size: "0.72rem",
        color: null
      };
      if (typeof this.icon == "string" && this.icon) {
        icon.type = this.icon;
      } else if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.type == "string" && this.icon.type) {
          icon.type = this.icon.type;
        }
        if (typeof this.icon.url == "string" && this.icon.url) {
          icon.url = this.icon.url;
        }
        if (typeof this.icon.spin == "boolean") {
          icon.spin = this.icon.spin;
        }
        if (typeof this.icon.size == "string" && this.icon.size) {
          icon.size = this.icon.size;
        }
        if (typeof this.icon.color == "string" && this.icon.color) {
          icon.color = this.icon.color;
        }
      }
      return icon;
    },
    computedMessage() {
      if (typeof this.message == "string") {
        return this.message;
      } else if (Dap.common.isObject(this.message)) {
        return JSON.stringify(this.message);
      } else {
        return String(this.message);
      }
    },
    computedTimeout() {
      if (Dap.number.isNumber(this.timeout) && this.timeout > 0) {
        return this.timeout;
      } else {
        return -1;
      }
    },
    computedZIndex() {
      if (Dap.number.isNumber(this.zIndex)) {
        return this.zIndex;
      } else {
        return 1100;
      }
    },
    computedOverlayColor() {
      if (typeof this.overlayColor == "string" && this.overlayColor) {
        return this.overlayColor;
      } else {
        return "rgba(0, 10, 20, .05)";
      }
    },
    computedBackground() {
      if (typeof this.background == "string" && this.background) {
        return this.background;
      } else {
        return null;
      }
    },
    computedColor() {
      if (typeof this.color == "string" && this.color) {
        return this.color;
      } else {
        return null;
      }
    },
    computedMountEl() {
      if (typeof this.mountEl == "string" && this.mountEl) {
        return this.mountEl;
      } else {
        return "body";
      }
    },
    toastStyle() {
      let style = {};
      style.zIndex = this.computedZIndex;
      if (this.computedBackground) {
        style.backgroundColor = this.computedBackground;
      }
      if (this.computedColor) {
        style.color = this.computedColor;
      }
      return style;
    },
    defaultIconType() {
      if (this.computedType == "success") {
        return "success";
      } else if (this.computedType == "error") {
        return "error-o";
      } else if (this.computedType == "info") {
        return "info-o";
      } else if (this.computedType == "loading") {
        return null;
      }
    }
  },
  components: {
    Icon,
    Loading,
    Overlay
  },
  mounted() {
    this.init(this);
  },
  methods: {
    toastShown() {
      if (this.computedTimeout > 0) {
        this.timer = setTimeout(() => {
          this.show = false;
        }, this.computedTimeout);
      }
    },
    toastHidden() {
      this.clearTimer();
      this.remove();
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
  }
};
const _hoisted_1$A = { class: "mvi-toast-icon" };
const _hoisted_2$v = ["innerHTML"];
function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Loading = resolveComponent("Loading");
  const _component_Icon = resolveComponent("Icon");
  const _component_Overlay = resolveComponent("Overlay");
  return openBlock(), createBlock(_component_Overlay, {
    ref: "overlay",
    color: $options.computedOverlayColor,
    onHidden: $options.toastHidden,
    "model-value": $data.show,
    "use-padding": $options.computedUsePadding,
    zIndex: $options.computedZIndex,
    fade: "",
    "mount-el": $options.computedMountEl,
    onShown: $options.toastShown
  }, {
    default: withCtx(() => [
      createElementVNode("div", mergeProps({
        class: ["mvi-toast", $options.computedMessage ? "" : "mvi-toast-iconless"],
        style: $options.toastStyle
      }, _ctx.$attrs), [
        createElementVNode("div", _hoisted_1$A, [
          $options.computedType == "loading" && (!$options.computedIcon.type && !$options.computedIcon.url) ? (openBlock(), createBlock(_component_Loading, {
            key: 0,
            color: $options.computedColor || "#fff",
            type: 0,
            size: $options.computedIcon.size
          }, null, 8, ["color", "size"])) : (openBlock(), createBlock(_component_Icon, {
            key: 1,
            type: $options.computedIcon.type,
            url: $options.computedIcon.url,
            spin: $options.computedIcon.spin,
            size: $options.computedIcon.size,
            color: $options.computedIcon.color
          }, null, 8, ["type", "url", "spin", "size", "color"]))
        ]),
        $options.computedMessage ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "mvi-toast-message",
          innerHTML: $options.computedMessage
        }, null, 8, _hoisted_2$v)) : createCommentVNode("", true)
      ], 16)
    ]),
    _: 1
  }, 8, ["color", "onHidden", "model-value", "use-padding", "zIndex", "mount-el", "onShown"]);
}
const ToastComponent = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$P], ["__scopeId", "data-v-c1cbda41"]]);
const Toast = {
  initParams: (options) => {
    let opts = {};
    if (Dap.common.isObject(options)) {
      opts.type = options.type;
      opts.message = options.message;
      opts.timeout = options.timeout;
      opts.overlayColor = options.overlayColor;
      opts.background = options.background;
      opts.color = options.color;
      opts.zIndex = options.zIndex;
      opts.usePadding = options.usePadding;
      opts.icon = options.icon;
      opts.mountEl = options.mountEl;
    } else {
      opts.message = options;
      opts.timeout = 1500;
    }
    return opts;
  },
  showToast: (options) => {
    return new Promise((resolve, reject) => {
      if (Toast.$el && Toast.$instance) {
        Toast.$instance.unmount();
        Toast.$el.remove();
      }
      let opts = Toast.initParams(options);
      let mountNode = Dap.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(ToastComponent, {
        ...opts,
        init: (vm) => {
          Toast.$vm = vm;
        },
        remove: () => {
          instance.unmount();
          mountNode.remove();
          resolve();
        }
      });
      instance.mount(mountNode);
      Toast.$el = mountNode;
      Toast.$instance = instance;
    });
  },
  hideToast: () => {
    if (Toast.$vm) {
      Toast.$vm.show = false;
    }
  },
  install: (app) => {
    app.config.globalProperties.$showToast = Toast.showToast;
    app.provide("$showToast", Toast.showToast);
    app.config.globalProperties.$hideToast = Toast.hideToast;
    app.provide("$hideToast", Toast.hideToast);
  }
};
const msgbox_vue_vue_type_style_index_0_scoped_aca0bf81_lang = "";
const _sfc_main$O = {
  name: "m-msgbox",
  data() {
    return {
      show: false
    };
  },
  inheritAttrs: false,
  props: {
    message: {
      default: null
    },
    animation: {
      type: String,
      default: null
    },
    timeout: {
      type: Number,
      default: null
    },
    zIndex: {
      type: Number,
      default: null
    },
    background: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    remove: {
      type: Function,
      default: function() {
        return function() {
        };
      }
    }
  },
  computed: {
    computedMessage() {
      if (typeof this.message == "string") {
        return this.message;
      } else if (Dap.common.isObject(this.message)) {
        return JSON.stringify(this.message);
      } else {
        return String(this.message);
      }
    },
    computedAnimation() {
      if (typeof this.animation == "string" && this.animation) {
        return this.animation;
      } else {
        return "fade";
      }
    },
    computedTimeout() {
      if (Dap.number.isNumber(this.timeout) && this.timeout > 0) {
        return this.timeout;
      } else {
        return 1500;
      }
    },
    computedZIndex() {
      if (Dap.number.isNumber(this.zIndex)) {
        return this.zIndex;
      } else {
        return 1100;
      }
    },
    computedBackground() {
      if (typeof this.background == "string" && this.background) {
        return this.background;
      } else {
        return null;
      }
    },
    computedColor() {
      if (typeof this.color == "string" && this.color) {
        return this.color;
      } else {
        return null;
      }
    },
    boxAnimation() {
      return "mvi-msgbox-" + this.computedAnimation;
    },
    msgBoxStyle() {
      let style = {};
      style.zIndex = this.computedZIndex;
      if (this.computedBackground) {
        style.backgroundColor = this.computedBackground;
      }
      if (this.computedColor) {
        style.color = this.computedColor;
      }
      return style;
    },
    msgBoxClass() {
      let cls = ["mvi-msgbox"];
      if (this.computedAnimation == "translate") {
        cls.push("mvi-msgbox-translate");
      }
      return cls;
    }
  },
  mounted() {
    this.show = true;
  },
  methods: {
    afterEnter(el) {
      if (this.computedTimeout > 0) {
        setTimeout(() => {
          this.show = false;
        }, this.computedTimeout);
      }
    },
    afterLeave(el) {
      this.remove();
    }
  }
};
const _hoisted_1$z = ["innerHTML"];
function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Teleport, { to: "body" }, [
    createVNode(Transition, {
      name: $options.boxAnimation,
      onAfterEnter: $options.afterEnter,
      onAfterLeave: $options.afterLeave
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", mergeProps(_ctx.$attrs, {
          class: $options.msgBoxClass,
          innerHTML: $options.computedMessage,
          style: $options.msgBoxStyle
        }), null, 16, _hoisted_1$z), [
          [vShow, $data.show]
        ])
      ]),
      _: 1
    }, 8, ["name", "onAfterEnter", "onAfterLeave"])
  ]);
}
const MsgboxComponent = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$O], ["__scopeId", "data-v-aca0bf81"]]);
const Msgbox = {
  initParams: (options) => {
    let opts = {};
    if (Dap.common.isObject(options)) {
      opts.message = options.message;
      opts.timeout = options.timeout;
      opts.animation = options.animation;
      opts.zIndex = options.zIndex;
      opts.color = options.color;
      opts.background = options.background;
    } else {
      opts.message = options;
    }
    return opts;
  },
  msgbox: (options) => {
    return new Promise((resolve, reject) => {
      let opts = Msgbox.initParams(options);
      let mountNode = Dap.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(MsgboxComponent, {
        ...opts,
        remove: () => {
          instance.unmount();
          mountNode.remove();
          resolve();
        }
      });
      instance.mount(mountNode);
    });
  },
  install: (app) => {
    app.config.globalProperties.$msgbox = Msgbox.msgbox;
    app.provide("$msgbox", Msgbox.msgbox);
  }
};
const numberKeyboard_vue_vue_type_style_index_0_scoped_80ecabde_lang = "";
const _sfc_main$N = {
  name: "m-number-keyboard",
  data() {
    return {
      firstShow: false,
      keyboardShow: false,
      numbers: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "X",
        ".",
        "0"
      ]
    };
  },
  emits: [
    "update:modelValue",
    "input",
    "delete",
    "complete",
    "update:show",
    "show",
    "showing",
    "shown",
    "hide",
    "hidding",
    "hidden"
  ],
  inheritAttrs: false,
  props: {
    showDecimal: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    showComplete: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    zIndex: {
      type: Number,
      default: 850
    },
    timeout: {
      type: Number,
      default: 200
    },
    closable: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: -1
    },
    deleteText: {
      type: String,
      default: "\u5220\u9664"
    },
    completeText: {
      type: String,
      default: "\u5B8C\u6210"
    },
    completeClass: {
      type: String,
      default: null
    },
    deleteClass: {
      type: String,
      default: null
    },
    promiseEmpty: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    mountEl: {
      type: String,
      default: null
    },
    overlayColor: {
      type: String,
      default: "rgba(0,10,20,0.2)"
    },
    usePadding: {
      type: Boolean,
      default: false
    },
    calibration: {
      type: Boolean,
      default: false
    },
    showX: {
      type: Boolean,
      default: false
    },
    random: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    $$el() {
      return this.$refs.overlay.$$el;
    },
    computedValue: {
      set(value) {
        this.$emit("update:modelValue", value);
      },
      get() {
        if (Dap.number.isNumber(this.modelValue)) {
          return this.modelValue.toString();
        } else {
          return this.modelValue;
        }
      }
    },
    boardStyle() {
      let style = {};
      style.transition = "all " + this.timeout + "ms";
      style.webkitTransition = "all " + this.timeout + "ms";
      style.zIndex = this.zIndex + 10;
      return style;
    },
    deleteDisabeld() {
      if (this.modelValue === "") {
        return true;
      } else {
        return false;
      }
    },
    completeDisabled() {
      if (this.modelValue === "") {
        return true;
      } else {
        return false;
      }
    },
    leftNumberClass() {
      return (item, index) => {
        let cls = ["mvi-number-keyboard-left-number"];
        if (index == this.computedNumbers.length - 1) {
          if (this.showX || this.showDecimal) {
            cls.push("mvi-number-keyboard-half");
          } else {
            cls.push("mvi-number-keyboard-full");
          }
        }
        if (this.border) {
          cls.push("mvi-number-keyboard-border");
        }
        return cls;
      };
    },
    leftNumberElClass() {
      return (item, index) => {
        let cls = ["mvi-number-keyboard-left-number-el"];
        if (this.active) {
          cls.push("mvi-number-keyboard-active");
        }
        return cls;
      };
    },
    deleteBtnClass() {
      let cls = ["mvi-number-keyboard-delete"];
      if (this.border) {
        cls.push("mvi-number-keyboard-border");
      }
      return cls;
    },
    deleteBtnElClass() {
      let cls = ["mvi-number-keyboard-delete-el"];
      if (this.deleteClass) {
        cls.push(this.deleteClass);
      }
      if (this.active && !this.deleteDisabeld) {
        cls.push("mvi-number-keyboard-active");
      }
      return cls;
    },
    completeBtnClass() {
      let cls = ["mvi-number-keyboard-complete"];
      if (this.border) {
        cls.push("mvi-number-keyboard-border");
      }
      return cls;
    },
    completeBtnElClass() {
      let cls = ["mvi-number-keyboard-complete-el"];
      if (this.completeClass) {
        cls.push(this.completeClass);
      }
      if (this.active && !(this.promiseEmpty ? false : this.completeDisabled)) {
        cls.push("mvi-number-keyboard-active");
      }
      return cls;
    },
    showKeyBoard() {
      return (item) => {
        if (item == "X") {
          return this.showX;
        }
        if (item == ".") {
          return this.showDecimal && !this.showX;
        }
        return true;
      };
    },
    computedNumbers() {
      let numbers = this.numbers.filter((item) => {
        return this.showKeyBoard(item);
      });
      if (this.random) {
        let arr = [];
        let length = numbers.length;
        for (let i = 0; i < length; i++) {
          arr.push(this.getRandomNumber(arr));
        }
        return arr;
      }
      return numbers;
    }
  },
  components: {
    Overlay
  },
  methods: {
    getRandomNumber(arr) {
      let numbers = this.numbers.filter((item) => {
        return this.showKeyBoard(item);
      });
      let index = Math.floor(Math.random() * numbers.length);
      if (arr.includes(numbers[index])) {
        return this.getRandomNumber(arr);
      }
      return numbers[index];
    },
    overlayShow(el) {
      if (!this.firstShow) {
        this.firstShow = true;
      }
      this.keyboardShow = true;
    },
    overlayHide(el) {
      this.keyboardShow = false;
    },
    numberClick(item) {
      if (this.computedValue.length >= this.maxlength && this.maxlength > 0) {
        return;
      }
      this.computedValue += item;
      this.$emit("input", item);
    },
    deleteClick() {
      if (this.deleteDisabeld) {
        return;
      }
      let value = Dap.string.delete(
        this.computedValue,
        this.computedValue.length - 1,
        1
      );
      this.computedValue = value;
      this.$emit("delete", value);
    },
    completeClick() {
      if (this.completeDisabled && !this.promiseEmpty) {
        return;
      }
      if (this.calibration) {
        this.computedValue = parseFloat(this.computedValue) || "";
      }
      this.$emit("complete", this.computedValue);
      this.hideKeyboard();
    },
    hide() {
      if (this.closable) {
        this.hideKeyboard();
      }
    },
    hideKeyboard() {
      this.$emit("update:show", false);
    },
    beforeEnter(el) {
      if (Dap.data.get(el, "mvi-keyboard-beforeEnter-trigger")) {
        return;
      }
      Dap.data.set(el, "mvi-keyboard-beforeEnter-trigger", true);
      this.$emit("show", el);
      if (typeof this.keyboardComponentWatch == "function") {
        this.keyboardComponentWatch.apply(this, ["show", el]);
      }
    },
    enter(el) {
      if (Dap.data.get(el, "mvi-keyboard-enter-trigger")) {
        return;
      }
      Dap.data.set(el, "mvi-keyboard-enter-trigger", true);
      this.$emit("showing", el);
      if (typeof this.keyboardComponentWatch == "function") {
        this.keyboardComponentWatch.apply(this, ["showing", el]);
      }
    },
    afterEnter(el) {
      this.$emit("shown", el);
      if (typeof this.keyboardComponentWatch == "function") {
        this.keyboardComponentWatch.apply(this, ["shown", el]);
      }
    },
    beforeLeave(el) {
      Dap.data.remove(el, "mvi-keyboard-beforeEnter-trigger");
      Dap.data.remove(el, "mvi-keyboard-enter-trigger");
      this.$emit("hide", el);
      if (typeof this.keyboardComponentWatch == "function") {
        this.keyboardComponentWatch.apply(this, ["hide", el]);
      }
    },
    leave(el) {
      this.$emit("hidding", el);
      if (typeof this.keyboardComponentWatch == "function") {
        this.keyboardComponentWatch.apply(this, ["hidding", el]);
      }
    },
    afterLeave(el) {
      this.$emit("hidden", el);
      if (typeof this.keyboardComponentWatch == "function") {
        this.keyboardComponentWatch.apply(this, ["hidden", el]);
      }
    }
  }
};
const _hoisted_1$y = { key: 1 };
const _hoisted_2$u = { class: "mvi-number-keyboard-left" };
const _hoisted_3$n = ["onClick"];
const _hoisted_4$h = {
  key: 0,
  class: "mvi-number-keyboard-right"
};
const _hoisted_5$d = ["disabled"];
const _hoisted_6$9 = ["textContent"];
const _hoisted_7$8 = ["disabled"];
const _hoisted_8$7 = ["textContent"];
function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Overlay = resolveComponent("Overlay");
  return openBlock(), createBlock(_component_Overlay, {
    ref: "overlay",
    "model-value": $props.show,
    onShow: $options.overlayShow,
    onHide: $options.overlayHide,
    "z-index": $props.zIndex,
    color: $props.overlayColor,
    timeout: $props.timeout,
    onClick: withModifiers($options.hide, ["self"]),
    "mount-el": $props.mountEl,
    "use-padding": $props.usePadding
  }, {
    default: withCtx(() => [
      createVNode(Transition, {
        name: "mvi-keyboard",
        onBeforeEnter: $options.beforeEnter,
        onAfterEnter: $options.afterEnter,
        onBeforeLeave: $options.beforeLeave,
        onAfterLeave: $options.afterLeave,
        onLeave: $options.leave,
        onEnter: $options.enter
      }, {
        default: withCtx(() => [
          $data.firstShow ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: "keyboard",
            class: "mvi-number-keyboard",
            style: $options.boardStyle
          }, _ctx.$attrs), [
            !$props.border && ($props.title || _ctx.$slots.title) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["mvi-number-keyboard-title", $props.border ? "mvi-number-keyboard-border" : ""])
            }, [
              _ctx.$slots.title ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : $props.title ? (openBlock(), createElementBlock("span", _hoisted_1$y, toDisplayString($props.title), 1)) : createCommentVNode("", true)
            ], 2)) : createCommentVNode("", true),
            createElementVNode("div", {
              class: normalizeClass(["mvi-number-keyboard-wrapper", $props.border ? "" : "mvi-number-keyboard-border"])
            }, [
              createElementVNode("div", _hoisted_2$u, [
                (openBlock(true), createElementBlock(Fragment, null, renderList($options.computedNumbers, (item, index) => {
                  return openBlock(), createElementBlock("div", {
                    class: normalizeClass($options.leftNumberClass(item, index))
                  }, [
                    createElementVNode("div", {
                      onClick: ($event) => $options.numberClick(item),
                      class: normalizeClass($options.leftNumberElClass(item, index))
                    }, toDisplayString(item), 11, _hoisted_3$n)
                  ], 2);
                }), 256))
              ]),
              $props.showComplete || $props.showDelete ? (openBlock(), createElementBlock("div", _hoisted_4$h, [
                $props.showDelete ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass($options.deleteBtnClass)
                }, [
                  createElementVNode("div", {
                    disabled: $options.deleteDisabeld || null,
                    class: normalizeClass($options.deleteBtnElClass),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.deleteClick && $options.deleteClick(...args))
                  }, [
                    _ctx.$slots.delete ? renderSlot(_ctx.$slots, "delete", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", {
                      key: 1,
                      textContent: toDisplayString($props.deleteText)
                    }, null, 8, _hoisted_6$9))
                  ], 10, _hoisted_5$d)
                ], 2)) : createCommentVNode("", true),
                $props.showComplete ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: normalizeClass($options.completeBtnClass)
                }, [
                  createElementVNode("div", {
                    disabled: $props.promiseEmpty ? null : $options.completeDisabled || null,
                    class: normalizeClass($options.completeBtnElClass),
                    onClick: _cache[1] || (_cache[1] = (...args) => $options.completeClick && $options.completeClick(...args))
                  }, [
                    _ctx.$slots.complete ? renderSlot(_ctx.$slots, "complete", { key: 0 }, void 0, true) : createCommentVNode("", true),
                    createElementVNode("span", {
                      textContent: toDisplayString($props.completeText)
                    }, null, 8, _hoisted_8$7)
                  ], 10, _hoisted_7$8)
                ], 2)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ], 2)
          ], 16)), [
            [vShow, $data.keyboardShow]
          ]) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["onBeforeEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave", "onLeave", "onEnter"])
    ]),
    _: 3
  }, 8, ["model-value", "onShow", "onHide", "z-index", "color", "timeout", "onClick", "mount-el", "use-padding"]);
}
const NumberKeyboard = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$N], ["__scopeId", "data-v-80ecabde"]]);
NumberKeyboard.install = (app) => {
  app.component(NumberKeyboard.name, NumberKeyboard);
};
const search_vue_vue_type_style_index_0_scoped_1012e0d6_lang = "";
const _sfc_main$M = {
  name: "m-search",
  emits: [
    "update:modelValue",
    "search",
    "cancel",
    "left-click",
    "right-click",
    "focus",
    "blur",
    "input",
    "clear"
  ],
  data() {
    return {
      focus: false
    };
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: null
    },
    labelClass: {
      type: String,
      default: null
    },
    round: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    maxlength: {
      type: Number,
      default: -1
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    cancelClass: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: "left",
      validator(value) {
        return ["left", "center", "right"].includes(value);
      }
    },
    leftIcon: {
      type: [String, Object],
      default: null
    },
    rightIcon: {
      type: [String, Object],
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    },
    inputMode: {
      type: [String, Boolean],
      default: false,
      validator(value) {
        return [
          false,
          "none",
          "text",
          "decimal",
          "numeric",
          "tel",
          "search",
          "email",
          "url"
        ];
      }
    }
  },
  computed: {
    showClear() {
      if (this.disabled || this.readonly) {
        return false;
      }
      if (this.focus) {
        if (this.realValue === "") {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    leftIconType() {
      let type = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.type == "string") {
          type = this.leftIcon.type;
        }
      } else if (typeof this.leftIcon == "string") {
        type = this.leftIcon;
      }
      return type;
    },
    leftIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.url == "string") {
          url = this.leftIcon.url;
        }
      }
      return url;
    },
    leftIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.spin == "boolean") {
          spin = this.leftIcon.spin;
        }
      }
      return spin;
    },
    leftIconSize() {
      let size = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.size == "string") {
          size = this.leftIcon.size;
        }
      }
      return size;
    },
    leftIconColor() {
      let color = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.color == "string") {
          color = this.leftIcon.color;
        }
      }
      return color;
    },
    rightIconType() {
      let type = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.type == "string") {
          type = this.rightIcon.type;
        }
      } else if (typeof this.rightIcon == "string") {
        type = this.rightIcon;
      }
      return type;
    },
    rightIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.url == "string") {
          url = this.rightIcon.url;
        }
      }
      return url;
    },
    rightIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.spin == "boolean") {
          spin = this.rightIcon.spin;
        }
      }
      return spin;
    },
    rightIconSize() {
      let size = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.size == "string") {
          size = this.rightIcon.size;
        }
      }
      return size;
    },
    rightIconColor() {
      let color = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.color == "string") {
          color = this.rightIcon.color;
        }
      }
      return color;
    },
    computedType() {
      if (this.type == "number") {
        return "text";
      } else {
        return this.type;
      }
    },
    computedInputMode() {
      let mode = false;
      if (typeof this.inputMode == "string") {
        mode = this.inputMode;
      }
      return mode;
    },
    inputStyle() {
      let style = {};
      if (this.align) {
        style.textAlign = this.align;
      }
      if (this.leftIconType || this.leftIconUrl) {
        style.paddingLeft = 0;
      }
      if (this.showClear && this.clearable) {
        style.paddingRight = 0;
      } else if (this.rightIconType || this.rightIconUrl) {
        style.paddingRight = 0;
      }
      return style;
    },
    realValue: {
      set(value) {
        if (this.modelValue !== value) {
          this.$emit("update:modelValue", value);
        }
      },
      get() {
        let value = this.modelValue === null ? "" : this.modelValue.toString();
        if (this.type == "number") {
          value = value.replace(/\D/g, "");
        }
        if (this.maxlength > 0 && value.length > this.maxlength) {
          value = value.substr(0, this.maxlength);
        }
        if (this.modelValue !== value) {
          this.$emit("update:modelValue", value);
        }
        return value;
      }
    }
  },
  components: {
    Icon
  },
  methods: {
    getFocus() {
      if (this.disabled) {
        return;
      }
      this.$emit("focus", this.realValue);
      setTimeout(() => {
        this.focus = true;
      }, 200);
    },
    getBlur() {
      if (this.disabled) {
        return;
      }
      this.$emit("blur", this.realValue);
      setTimeout(() => {
        this.focus = false;
      }, 200);
    },
    searchInput() {
      if (this.disabled) {
        return;
      }
      this.$emit("input", this.realValue);
    },
    doSearch() {
      if (this.disabled) {
        return;
      }
      this.$emit("search", this.realValue);
    },
    doCancel() {
      if (this.disabled) {
        return;
      }
      this.$emit("cancel", this.realValue);
    },
    leftClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("left-click", this.realValue);
    },
    rightClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("right-click", this.realValue);
    },
    clearInput() {
      if (this.disabled) {
        return;
      }
      if (!this.clearable) {
        return;
      }
      this.realValue = "";
      this.$refs.input.focus();
      this.$emit("clear", "");
    }
  }
};
const _hoisted_1$x = ["disabled"];
const _hoisted_2$t = ["textContent"];
const _hoisted_3$m = ["type", "placeholder", "maxlength", "autofocus", "disabled", "readonly", "inputmode"];
const _hoisted_4$g = ["textContent"];
function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    class: "mvi-search",
    disabled: $props.disabled || null
  }, [
    $props.label ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["mvi-search-label", $props.labelClass || ""]),
      textContent: toDisplayString($props.label)
    }, null, 10, _hoisted_2$t)) : createCommentVNode("", true),
    createElementVNode("div", {
      class: normalizeClass(["mvi-search-input-container", $props.round ? "mvi-search-input-round" : ""]),
      style: normalizeStyle({ backgroundColor: $props.background || "", color: $props.color || "" })
    }, [
      $options.leftIconType || $options.leftIconUrl ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "mvi-search-left-icon",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.leftClick && $options.leftClick(...args))
      }, [
        createVNode(_component_Icon, {
          type: $options.leftIconType,
          url: $options.leftIconUrl,
          spin: $options.leftIconSpin,
          size: $options.leftIconSize,
          color: $options.leftIconColor
        }, null, 8, ["type", "url", "spin", "size", "color"])
      ])) : createCommentVNode("", true),
      withDirectives(createElementVNode("input", {
        ref: "input",
        class: "mvi-search-input",
        type: $options.computedType,
        onKeypress: _cache[1] || (_cache[1] = withKeys((...args) => $options.doSearch && $options.doSearch(...args), ["enter"])),
        autocomplete: "off",
        placeholder: $props.placeholder,
        maxlength: $props.maxlength,
        autofocus: $props.autofocus,
        disabled: $props.disabled || null,
        readonly: $props.readonly || null,
        inputmode: $options.computedInputMode,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $options.realValue = $event),
        onInput: _cache[3] || (_cache[3] = (...args) => $options.searchInput && $options.searchInput(...args)),
        onFocus: _cache[4] || (_cache[4] = (...args) => $options.getFocus && $options.getFocus(...args)),
        onBlur: _cache[5] || (_cache[5] = (...args) => $options.getBlur && $options.getBlur(...args)),
        style: normalizeStyle($options.inputStyle)
      }, null, 44, _hoisted_3$m), [
        [vModelDynamic, $options.realValue]
      ]),
      $props.clearable ? withDirectives((openBlock(), createElementBlock("div", {
        key: 1,
        class: "mvi-search-clear",
        onClick: _cache[6] || (_cache[6] = (...args) => $options.clearInput && $options.clearInput(...args))
      }, [
        createVNode(_component_Icon, { type: "times-o" })
      ], 512)), [
        [vShow, $options.showClear]
      ]) : createCommentVNode("", true),
      $options.rightIconType || $options.rightIconUrl ? (openBlock(), createElementBlock("div", {
        key: 2,
        class: "mvi-search-right-icon",
        onClick: _cache[7] || (_cache[7] = (...args) => $options.rightClick && $options.rightClick(...args))
      }, [
        createVNode(_component_Icon, {
          type: $options.rightIconType,
          url: $options.rightIconUrl,
          spin: $options.rightIconSpin,
          size: $options.rightIconSize,
          color: $options.rightIconColor
        }, null, 8, ["type", "url", "spin", "size", "color"])
      ])) : createCommentVNode("", true)
    ], 6),
    $props.showCancel ? (openBlock(), createElementBlock("div", {
      key: 1,
      textContent: toDisplayString($props.cancelText),
      class: normalizeClass(["mvi-search-cancel", $props.cancelClass || ""]),
      onClick: _cache[8] || (_cache[8] = (...args) => $options.doCancel && $options.doCancel(...args))
    }, null, 10, _hoisted_4$g)) : createCommentVNode("", true)
  ], 8, _hoisted_1$x);
}
const Search = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$M], ["__scopeId", "data-v-1012e0d6"]]);
Search.install = (app) => {
  app.component(Search.name, Search);
};
const progress_vue_vue_type_style_index_0_scoped_f5c31b8c_lang = "";
const _sfc_main$L = {
  name: "m-progress",
  props: {
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    strokeWidth: {
      type: String,
      default: null
    },
    showTip: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    },
    tipColor: {
      type: String,
      default: null
    },
    trackColor: {
      type: String,
      default: null
    },
    tipText: {
      type: String,
      default: null
    },
    round: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    animation: {
      type: Boolean,
      default: false
    },
    timeout: {
      type: Number,
      default: 400
    }
  },
  computed: {
    progressStyle() {
      let style = {};
      if (this.strokeWidth) {
        style.height = this.strokeWidth;
      }
      if (this.trackColor) {
        style.backgroundColor = this.trackColor;
      }
      return style;
    },
    progressBarStyle() {
      let style = {};
      if (this.animation) {
        style.transition = "width " + this.timeout + "ms,border-radius " + this.timeout + "ms";
        style.webkitTransition = "width " + this.timeout + "ms,border-radius " + this.timeout + "ms";
      }
      if (this.color) {
        style.backgroundColor = this.color;
      }
      if (this.value == this.max) {
        style.borderRadius = "inherit";
      }
      style.width = `calc(${(this.value - this.min < 0 ? 0 : this.value - this.min) / (this.max - this.min)} * 100%)`;
      return style;
    },
    computedText() {
      if (this.tipText) {
        return this.tipText;
      } else {
        return Math.round(
          (this.value - this.min < 0 ? 0 : this.value - this.min) / (this.max - this.min) * 100
        ) + "%";
      }
    },
    tipStyle() {
      let style = {};
      if (this.tipColor) {
        style.color = this.tipColor;
      }
      return style;
    },
    barClass() {
      let cls = ["mvi-progress-bar"];
      if (this.round) {
        cls.push("mvi-progress-radius-round");
      } else if (this.square) {
        cls.push("mvi-progress-radius-square");
      }
      return cls;
    },
    progressClass() {
      let cls = ["mvi-progress"];
      if (this.round) {
        cls.push("mvi-progress-radius-round");
      } else if (this.square) {
        cls.push("mvi-progress-radius-square");
      }
      return cls;
    }
  }
};
const _hoisted_1$w = ["textContent"];
function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.progressClass),
    style: normalizeStyle($options.progressStyle)
  }, [
    createElementVNode("div", {
      class: normalizeClass($options.barClass),
      style: normalizeStyle($options.progressBarStyle)
    }, [
      $props.showTip ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "mvi-progress-tooltip",
        style: normalizeStyle($options.tipStyle)
      }, [
        _ctx.$slots.tip ? renderSlot(_ctx.$slots, "tip", {
          key: 0,
          value: $props.value
        }, void 0, true) : (openBlock(), createElementBlock("span", {
          key: 1,
          textContent: toDisplayString($options.computedText)
        }, null, 8, _hoisted_1$w))
      ], 4)) : createCommentVNode("", true)
    ], 6)
  ], 6);
}
const Progress = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$L], ["__scopeId", "data-v-f5c31b8c"]]);
Progress.install = (app) => {
  app.component(Progress.name, Progress);
};
const slider_vue_vue_type_style_index_0_scoped_ce38ae5e_lang = "";
const _sfc_main$K = {
  name: "m-slider",
  data() {
    return {
      drag: null,
      isdrag: false
    };
  },
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    barHeight: {
      type: String,
      default: null
    },
    activeColor: {
      type: String,
      default: null
    },
    barColor: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    buttonClass: {
      type: String,
      default: null
    }
  },
  computed: {
    sliderStyle() {
      let style = {};
      if (this.barHeight) {
        if (this.vertical) {
          style.width = this.barHeight;
        } else {
          style.height = this.barHeight;
        }
      }
      if (this.barColor) {
        style.backgroundColor = this.barColor;
      }
      return style;
    },
    sliderBarStyle() {
      let style = {};
      if (this.activeColor) {
        style.backgroundColor = this.activeColor;
      }
      let percent = Dap.number.divide(
        Dap.number.subtract(this.modelValue, this.min),
        Dap.number.subtract(this.max, this.min)
      );
      if (this.vertical) {
        style.height = `calc(${percent} * 100%)`;
      } else {
        style.width = `calc(${percent} * 100%)`;
      }
      return style;
    },
    buttonElStyle() {
      let style = {};
      if (this.barHeight) {
        style.width = `calc(${this.barHeight} * 2)`;
        style.height = `calc(${this.barHeight} * 2)`;
      }
      return style;
    },
    sliderClass() {
      let cls = ["mvi-slider"];
      if (this.round) {
        cls.push("mvi-slider-radius-round");
      } else if (this.square) {
        cls.push("mvi-slider-radius-square");
      }
      if (this.vertical) {
        cls.push("mvi-slider-vertical");
      }
      return cls;
    }
  },
  mounted() {
    this.setBtnOffset();
    this.drag = new Drag$1(this.$refs.btn, {
      container: this.$el,
      mode: "on",
      draggableY: this.vertical && !this.disabled,
      draggableX: !this.vertical && !this.disabled,
      cursor: false,
      drag: this.onDrag,
      dragged: () => {
        this.$nextTick(() => {
          setTimeout(() => {
            this.isdrag = false;
          }, 10);
        });
      }
    });
    this.drag.init();
  },
  watch: {
    disabled(newValue) {
      if (this.drag) {
        if (newValue) {
          if (this.vertical) {
            this.drag.draggableY = false;
          } else {
            this.drag.draggableX = false;
          }
        } else {
          if (this.vertical) {
            this.drag.draggableY = true;
          } else {
            this.drag.draggableX = true;
          }
        }
      }
    },
    vertical(newValue) {
      this.$nextTick(() => {
        this.setBtnOffset();
      });
    },
    modelValue(newValue) {
      if (!this.isdrag) {
        this.setBtnOffset();
      }
    }
  },
  methods: {
    onDrag(res) {
      this.isdrag = true;
      if (this.vertical) {
        let top = res.placement.top;
        let value = Dap.number.add(
          Dap.number.mutiply(
            Dap.number.divide(
              Dap.number.add(
                top,
                Dap.number.divide(
                  this.$refs.btn.offsetHeight,
                  2
                )
              ),
              this.$el.offsetHeight
            ),
            Dap.number.subtract(this.max, this.min)
          ),
          this.min
        );
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      } else {
        let left = res.placement.left;
        let value = Dap.number.add(
          Dap.number.mutiply(
            Dap.number.divide(
              Dap.number.add(
                left,
                Dap.number.divide(this.$refs.btn.offsetWidth, 2)
              ),
              this.$el.offsetWidth
            ),
            Dap.number.subtract(this.max - this.min)
          ),
          this.min
        );
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      }
    },
    setBtnOffset() {
      if (this.vertical) {
        this.$refs.btn.style.left = "50%";
        this.$refs.btn.style.top = Dap.number.subtract(
          Dap.number.mutiply(
            Dap.number.divide(
              Dap.number.subtract(this.modelValue, this.min),
              Dap.number.subtract(this.max - this.min)
            ),
            this.$el.offsetHeight
          ),
          Dap.number.divide(this.$refs.btn.offsetHeight, 2)
        ) + "px";
      } else {
        this.$refs.btn.style.top = "50%";
        this.$refs.btn.style.left = Dap.number.subtract(
          Dap.number.mutiply(
            Dap.number.divide(
              Dap.number.subtract(this.modelValue, this.min),
              Dap.number.subtract(this.max - this.min)
            ),
            this.$el.offsetWidth
          ),
          Dap.number.divide(this.$refs.btn.offsetWidth, 2)
        ) + "px";
      }
    },
    dragTo(event2) {
      if (this.disabled) {
        return;
      }
      if (this.isdrag) {
        return;
      }
      if (Dap.element.isContains(this.$refs.btn, event2.target)) {
        return;
      }
      if (this.vertical) {
        let top = event2.offsetY;
        let value = Dap.number.add(
          Dap.number.mutiply(
            Dap.number.divide(top, this.$el.offsetHeight),
            Dap.number.subtract(this.max, this.min)
          ),
          this.min
        );
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      } else {
        let left = event2.offsetX;
        let value = Dap.number.add(
          Dap.number.mutiply(
            Dap.number.divide(left, this.$el.offsetWidth),
            Dap.number.subtract(this.max, this.min)
          ),
          this.min
        );
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      }
    }
  },
  beforeUnmount() {
    if (this.drag) {
      this.drag._setOff();
    }
  }
};
const _hoisted_1$v = ["disabled"];
const _hoisted_2$s = {
  class: "mvi-slider-button",
  ref: "btn"
};
function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    disabled: $props.disabled || null,
    class: normalizeClass($options.sliderClass),
    style: normalizeStyle($options.sliderStyle),
    onClick: _cache[0] || (_cache[0] = (...args) => $options.dragTo && $options.dragTo(...args))
  }, [
    createElementVNode("div", {
      ref: "bar",
      class: "mvi-slider-bar",
      style: normalizeStyle($options.sliderBarStyle)
    }, null, 4),
    createElementVNode("div", _hoisted_2$s, [
      _ctx.$slots.button ? renderSlot(_ctx.$slots, "button", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(["mvi-slider-button-el", $props.buttonClass || ""]),
        style: normalizeStyle($options.buttonElStyle)
      }, null, 6))
    ], 512)
  ], 14, _hoisted_1$v);
}
const Slider = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$K], ["__scopeId", "data-v-ce38ae5e"]]);
Slider.install = (app) => {
  app.component(Slider.name, Slider);
};
const stepper_vue_vue_type_style_index_0_scoped_4f61232a_lang = "";
const _sfc_main$J = {
  name: "m-stepper",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: [String, Number],
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return ["small", "medium", "large"].includes(value);
      }
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    digit: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledPlus: {
      type: Boolean,
      default: false
    },
    disabledMinus: {
      type: Boolean,
      default: false
    },
    disabledInput: {
      type: Boolean,
      default: false
    },
    showPlus: {
      type: Boolean,
      default: true
    },
    showMinus: {
      type: Boolean,
      default: true
    },
    showInput: {
      type: Boolean,
      default: true
    },
    inputWidth: {
      type: String,
      default: null
    },
    background: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: true
    },
    inputAlign: {
      type: String,
      default: "center",
      validator(value) {
        return ["left", "center", "right"].includes(value);
      }
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    arrivalMin() {
      if (this.min != null) {
        return this.realValue <= this.min;
      } else {
        return false;
      }
    },
    arrivalMax() {
      if (this.max != null) {
        return this.realValue >= this.max;
      } else {
        return false;
      }
    },
    inputStyle() {
      let style = {};
      if (this.inputWidth) {
        style.width = this.inputWidth;
      }
      if (this.color) {
        style.color = this.color;
      }
      if (this.background) {
        style.backgroundColor = this.background;
      }
      return style;
    },
    inputElStyle() {
      let style = {};
      if (this.inputAlign) {
        style.textAlign = this.inputAlign;
      }
      return style;
    },
    minusStyle() {
      let style = {};
      if (this.color) {
        style.color = this.color;
      }
      if (this.background) {
        style.backgroundColor = this.background;
      }
      return style;
    },
    plusStyle() {
      let style = {};
      if (this.color) {
        style.color = this.color;
      }
      if (this.background) {
        style.backgroundColor = this.background;
      }
      return style;
    },
    minusClass() {
      let cls = ["mvi-stepper-minus"];
      if (!(this.disabledMinus || this.arrivalMin || this.disabled) && this.active) {
        cls.push("mvi-stepper-active");
      }
      if (this.border) {
        cls.push("mvi-stepper-border");
      }
      return cls;
    },
    plusClass() {
      let cls = ["mvi-stepper-plus"];
      if (!(this.disabledPlus || this.arrivalMax || this.disabled) && this.active) {
        cls.push("mvi-stepper-active");
      }
      if (this.border) {
        cls.push("mvi-stepper-border");
      }
      return cls;
    },
    realValue: {
      set(value) {
        let val = this.updateValue(value);
        if (this.modelValue !== val) {
          this.$emit("update:modelValue", val);
        }
      },
      get() {
        return this.modelValue;
      }
    }
  },
  components: {
    Icon
  },
  methods: {
    doMinus() {
      if (this.disabled) {
        return;
      }
      if (this.disabledMinus) {
        return;
      }
      if (this.arrivalMin) {
        return;
      }
      this.realValue = Dap.number.subtract(this.realValue, this.step);
    },
    doPlus() {
      if (this.disabled) {
        return;
      }
      if (this.disabledPlus) {
        return;
      }
      if (this.arrivalMax) {
        return;
      }
      this.realValue = Dap.number.add(this.realValue, this.step);
    },
    changeValue() {
      if (this.disabled) {
        return;
      }
      if (this.disabledInput) {
        return;
      }
      this.$refs.input.value = this.realValue;
    },
    updateValue(value) {
      let val = parseFloat(value);
      if (isNaN(val)) {
        val = 0;
      }
      val = Number(val.toFixed(this.digit));
      if (val <= this.min && this.min != null) {
        val = this.min;
      }
      if (val >= this.max && this.max != null) {
        val = this.max;
      }
      return val;
    }
  }
};
const _hoisted_1$u = ["disabled"];
const _hoisted_2$r = ["disabled"];
const _hoisted_3$l = ["disabled"];
const _hoisted_4$f = ["disabled"];
function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass("mvi-stepper mvi-stepper-" + $props.size)
  }, [
    $props.showMinus ? (openBlock(), createElementBlock("div", {
      key: 0,
      disabled: $props.disabledMinus || $options.arrivalMin || $props.disabled || null,
      class: normalizeClass($options.minusClass),
      style: normalizeStyle($options.minusStyle),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.doMinus && $options.doMinus(...args))
    }, [
      createVNode(_component_Icon, { type: "minus" })
    ], 14, _hoisted_1$u)) : createCommentVNode("", true),
    $props.showInput ? (openBlock(), createElementBlock("div", {
      key: 1,
      disabled: $props.disabled || $props.disabledInput || null,
      class: normalizeClass(["mvi-stepper-input", $props.border ? "mvi-stepper-border" : ""]),
      style: normalizeStyle($options.inputStyle)
    }, [
      withDirectives(createElementVNode("input", {
        ref: "input",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $options.realValue = $event),
        disabled: $props.disabled || $props.disabledInput || null,
        type: "text",
        onBlur: _cache[2] || (_cache[2] = (...args) => $options.changeValue && $options.changeValue(...args)),
        onKeyup: _cache[3] || (_cache[3] = withKeys((...args) => $options.changeValue && $options.changeValue(...args), ["enter"])),
        style: normalizeStyle($options.inputElStyle),
        inputmode: "numeric"
      }, null, 44, _hoisted_3$l), [
        [vModelText, $options.realValue]
      ])
    ], 14, _hoisted_2$r)) : createCommentVNode("", true),
    $props.showPlus ? (openBlock(), createElementBlock("div", {
      key: 2,
      disabled: $props.disabledPlus || $options.arrivalMax || $props.disabled || null,
      class: normalizeClass($options.plusClass),
      style: normalizeStyle($options.plusStyle),
      onClick: _cache[4] || (_cache[4] = (...args) => $options.doPlus && $options.doPlus(...args))
    }, [
      createVNode(_component_Icon, { type: "plus" })
    ], 14, _hoisted_4$f)) : createCommentVNode("", true)
  ], 2);
}
const Stepper = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$J], ["__scopeId", "data-v-4f61232a"]]);
Stepper.install = (app) => {
  app.component(Stepper.name, Stepper);
};
const switch_vue_vue_type_style_index_0_scoped_338d4c80_lang = "";
const _sfc_main$I = {
  name: "m-switch",
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "0.4rem"
    },
    activeColor: {
      type: String,
      default: null
    },
    inactiveColor: {
      type: String,
      default: null
    },
    icon: {
      type: [String, Object],
      default: null
    }
  },
  components: {
    Icon
  },
  methods: {
    change(event2) {
      let check = event2.target.checked;
      this.$emit("update:modelValue", check);
      this.$emit("change", check);
    }
  },
  computed: {
    iconType() {
      let type = "load-e";
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.type == "string") {
          type = this.icon.type;
        }
      } else if (typeof this.icon == "string") {
        type = this.icon;
      }
      return type;
    },
    iconUrl() {
      let url = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.url == "string") {
          url = this.icon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = true;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.spin == "boolean") {
          spin = this.icon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.size == "string") {
          size = this.icon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.color == "string") {
          color = this.icon.color;
        }
      }
      return color;
    },
    switchStyle() {
      let style = {};
      if (this.inactiveColor && !this.modelValue) {
        style.backgroundColor = this.inactiveColor;
      }
      if (this.activeColor && this.modelValue) {
        style.backgroundColor = this.activeColor;
      }
      if (this.size) {
        style.width = `calc(${this.size} * 2)`;
      }
      return style;
    },
    elStyle() {
      let style = {};
      if (this.activeColor) {
        style.color = this.activeColor;
      }
      if (this.size) {
        style.width = this.size;
        style.height = this.size;
        style.fontSize = this.size;
      }
      return style;
    }
  }
};
const _hoisted_1$t = ["disabled"];
const _hoisted_2$q = ["checked", "disabled"];
function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("label", {
    class: normalizeClass(["mvi-switch", $props.modelValue ? "mvi-switch-checked" : ""]),
    style: normalizeStyle($options.switchStyle),
    disabled: $props.disabled || null
  }, [
    createElementVNode("span", {
      class: normalizeClass(["mvi-switch-el", $props.modelValue ? "mvi-switch-el-checked" : ""]),
      style: normalizeStyle($options.elStyle)
    }, [
      $props.loading && !$props.disabled ? (openBlock(), createBlock(_component_Icon, {
        key: 0,
        type: $options.iconType,
        spin: $options.iconSpin,
        url: $options.iconUrl,
        size: $options.iconSize,
        color: $options.iconColor
      }, null, 8, ["type", "spin", "url", "size", "color"])) : createCommentVNode("", true)
    ], 6),
    createElementVNode("input", {
      onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args)),
      type: "checkbox",
      checked: $props.modelValue,
      disabled: $props.disabled || $props.loading || null
    }, null, 40, _hoisted_2$q)
  ], 14, _hoisted_1$t);
}
const Switch = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$I], ["__scopeId", "data-v-338d4c80"]]);
Switch.install = (app) => {
  app.component(Switch.name, Switch);
};
const actionsheet_vue_vue_type_style_index_0_scoped_a7046a52_lang = "";
const _sfc_main$H = {
  name: "m-actionsheet",
  emits: ["update:modelValue", "select"],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    overlayColor: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: 900
    },
    timeout: {
      type: Number,
      default: 200
    },
    round: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: null
    },
    titleColor: {
      type: String,
      default: null
    },
    closable: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: function() {
        return [];
      }
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    cancelColor: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: true
    },
    mountEl: {
      type: String,
      default: null
    },
    selectClose: {
      type: Boolean,
      default: true
    },
    usePadding: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return ["medium", "large"].includes(value);
      }
    }
  },
  computed: {
    $$el() {
      return this.$refs.popup.$$el;
    },
    iconType() {
      return (icon) => {
        let type = null;
        if (Dap.common.isObject(icon)) {
          if (typeof icon.type == "string") {
            type = icon.type;
          }
        } else if (typeof icon == "string") {
          type = icon;
        }
        return type;
      };
    },
    iconUrl() {
      return (icon) => {
        let url = null;
        if (Dap.common.isObject(icon)) {
          if (typeof icon.url == "string") {
            url = icon.url;
          }
        }
        return url;
      };
    },
    iconSpin() {
      return (icon) => {
        let spin = false;
        if (Dap.common.isObject(icon)) {
          if (typeof icon.spin == "boolean") {
            spin = icon.spin;
          }
        }
        return spin;
      };
    },
    iconSize() {
      return (icon) => {
        let size = null;
        if (Dap.common.isObject(icon)) {
          if (typeof icon.size == "string") {
            size = icon.size;
          }
        }
        return size;
      };
    },
    iconColor() {
      return (icon) => {
        let color = null;
        if (Dap.common.isObject(icon)) {
          if (typeof icon.color == "string") {
            color = icon.color;
          }
        }
        return color;
      };
    },
    itemClass() {
      return (item) => {
        let cls = [
          "mvi-acionsheet-item",
          "mvi-actionsheet-item-" + this.size
        ];
        if (item.class) {
          cls.push(item.class);
        }
        if (this.active && !item.loading && !item.disabled) {
          cls.push("mvi-acionsheet-active");
        }
        return cls;
      };
    },
    itemStyle() {
      return (item) => {
        let style = {};
        if (!this.itemDisabled(item)) {
          if (item.color) {
            style.color = item.color;
          } else if (this.color) {
            style.color = this.color;
          }
        }
        return style;
      };
    },
    itemDisabled() {
      return (item) => {
        if (typeof item.disabled == "boolean") {
          return item.disabled;
        } else {
          return false;
        }
      };
    }
  },
  components: {
    Icon,
    Loading,
    Popup
  },
  methods: {
    hide(event2) {
      if (this.closable) {
        this.doCancel();
      }
    },
    doCancel() {
      this.$emit("update:modelValue", false);
    },
    doSelect(item, index) {
      if (item.disabled || item.loading) {
        return;
      }
      if (this.selectClose) {
        this.$emit("update:modelValue", false);
      }
      this.$emit("select", {
        item: Object.assign({}, item),
        index
      });
    }
  }
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-a7046a52"), n = n(), popScopeId(), n);
const _hoisted_1$s = { class: "mvi-acionsheet" };
const _hoisted_2$p = ["textContent"];
const _hoisted_3$k = { class: "mvi-acionsheet-list" };
const _hoisted_4$e = ["disabled", "onClick"];
const _hoisted_5$c = {
  key: 1,
  class: "mvi-acionsheet-content"
};
const _hoisted_6$8 = ["textContent"];
const _hoisted_7$7 = ["textContent"];
const _hoisted_8$6 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("div", { class: "mvi-acionsheet-divider" }, null, -1));
const _hoisted_9$5 = ["textContent"];
function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Loading = resolveComponent("Loading");
  const _component_Icon = resolveComponent("Icon");
  const _component_Popup = resolveComponent("Popup");
  return openBlock(), createBlock(_component_Popup, {
    ref: "popup",
    "model-value": $props.modelValue,
    onOverlayClick: $options.hide,
    "overlay-color": $props.overlayColor,
    "z-index": $props.zIndex,
    timeout: $props.timeout,
    placement: "bottom",
    round: $props.round,
    "use-padding": $props.usePadding,
    "mount-el": $props.mountEl
  }, {
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1$s, [
        $props.title ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "mvi-acionsheet-title",
          style: normalizeStyle({ color: $props.titleColor || "" })
        }, [
          createElementVNode("span", {
            textContent: toDisplayString($props.title)
          }, null, 8, _hoisted_2$p)
        ], 4)) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_3$k, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.options, (item, index) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass($options.itemClass(item)),
              style: normalizeStyle($options.itemStyle(item)),
              key: "action-" + index,
              disabled: $options.itemDisabled(item) || null,
              onClick: ($event) => $options.doSelect(item, index)
            }, [
              item.loading || false ? (openBlock(), createBlock(_component_Loading, {
                key: 0,
                size: $props.size == "large" ? "0.4rem" : "0.36rem",
                color: "#bbb"
              }, null, 8, ["size"])) : item.label || item.sub || $options.iconType(item.icon) || $options.iconUrl(item.icon) ? (openBlock(), createElementBlock("div", _hoisted_5$c, [
                ($options.iconType(item.icon) || $options.iconUrl(item.icon)) && item.placement != "right" ? (openBlock(), createBlock(_component_Icon, {
                  key: 0,
                  "data-placement": "left",
                  type: $options.iconType(item.icon),
                  url: $options.iconUrl(item.icon),
                  spin: $options.iconSpin(item.icon),
                  size: $options.iconSize(item.icon),
                  color: $options.iconColor(item.icon)
                }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
                item.label ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  class: "mvi-actionsheet-item-label",
                  textContent: toDisplayString(item.label)
                }, null, 8, _hoisted_6$8)) : createCommentVNode("", true),
                item.sub ? (openBlock(), createElementBlock("span", {
                  key: 2,
                  class: "mvi-acionsheet-item-sub",
                  textContent: toDisplayString(item.sub)
                }, null, 8, _hoisted_7$7)) : createCommentVNode("", true),
                ($options.iconType(item.icon) || $options.iconUrl(item.icon)) && item.placement == "right" ? (openBlock(), createBlock(_component_Icon, {
                  key: 3,
                  "data-placement": "right",
                  type: $options.iconType(item.icon),
                  url: $options.iconUrl(item.icon),
                  spin: $options.iconSpin(item.icon),
                  size: $options.iconSize(item.icon),
                  color: $options.iconColor(item.icon)
                }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ], 14, _hoisted_4$e);
          }), 128))
        ]),
        _hoisted_8$6,
        $props.showCancel ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["mvi-acionsheet-button", $props.active ? "mvi-acionsheet-active" : ""]),
          textContent: toDisplayString($props.cancelText),
          onClick: _cache[0] || (_cache[0] = (...args) => $options.doCancel && $options.doCancel(...args)),
          style: normalizeStyle({ color: $props.cancelColor || "" })
        }, null, 14, _hoisted_9$5)) : createCommentVNode("", true)
      ])
    ]),
    _: 1
  }, 8, ["model-value", "onOverlayClick", "overlay-color", "z-index", "timeout", "round", "use-padding", "mount-el"]);
}
const Actionsheet = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$H], ["__scopeId", "data-v-a7046a52"]]);
Actionsheet.install = (app) => {
  app.component(Actionsheet.name, Actionsheet);
};
const dropdown_vue_vue_type_style_index_0_scoped_8bb9bb6d_lang = "";
const _sfc_main$G = {
  name: "m-dropdown",
  data() {
    return {
      oldIndex: null
    };
  },
  emits: ["update:modelValue", "update:show", "select"],
  props: {
    modelValue: {
      type: [Object, Number, String, Array],
      default: null
    },
    activeColor: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: function() {
        return [];
      }
    },
    itemClass: {
      type: String,
      default: null
    },
    selectClose: {
      type: Boolean,
      default: true
    },
    selectIcon: {
      type: [String, Object],
      default: null
    },
    show: {
      type: Boolean,
      default: false
    },
    overlayColor: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: 900
    },
    timeout: {
      type: Number,
      default: 200
    },
    round: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: "top"
    },
    closable: {
      type: Boolean,
      default: true
    },
    mountEl: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: true
    },
    usePadding: {
      type: Boolean,
      default: false
    },
    inactiveColor: {
      type: String,
      default: null
    }
  },
  computed: {
    $$el() {
      return this.$refs.popup.$$el;
    },
    selectIconType() {
      let type = "success";
      if (Dap.common.isObject(this.selectIcon)) {
        if (typeof this.selectIcon.type == "string") {
          type = this.selectIcon.type;
        }
      } else if (typeof this.selectIcon == "string") {
        type = this.selectIcon;
      }
      return type;
    },
    selectIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.selectIcon)) {
        if (typeof this.selectIcon.url == "string") {
          url = this.selectIcon.url;
        }
      }
      return url;
    },
    selectIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.selectIcon)) {
        if (typeof this.selectIcon.spin == "boolean") {
          spin = this.selectIcon.spin;
        }
      }
      return spin;
    },
    selectIconSize() {
      let size = null;
      if (Dap.common.isObject(this.selectIcon)) {
        if (typeof this.selectIcon.size == "string") {
          size = this.selectIcon.size;
        }
      }
      return size;
    },
    selectIconColor() {
      let color = null;
      if (Dap.common.isObject(this.selectIcon)) {
        if (typeof this.selectIcon.color == "string") {
          color = this.selectIcon.color;
        }
      }
      return color;
    },
    iconType() {
      return (icon) => {
        let type = null;
        if (Dap.common.isObject(icon)) {
          if (typeof icon.type == "string") {
            type = icon.type;
          }
        } else if (typeof icon == "string") {
          type = icon;
        }
        return type;
      };
    },
    iconUrl() {
      return (icon) => {
        let url = null;
        if (Dap.common.isObject(icon)) {
          if (typeof icon.url == "string") {
            url = icon.url;
          }
        }
        return url;
      };
    },
    iconSpin() {
      return (icon) => {
        let spin = false;
        if (Dap.common.isObject(icon)) {
          if (typeof icon.spin == "boolean") {
            spin = icon.spin;
          }
        }
        return spin;
      };
    },
    iconSize() {
      return (icon) => {
        let size = null;
        if (Dap.common.isObject(icon)) {
          if (typeof icon.size == "string") {
            size = icon.size;
          }
        }
        return size;
      };
    },
    iconColor() {
      return (icon) => {
        let color = null;
        if (Dap.common.isObject(icon)) {
          if (typeof icon.color == "string") {
            color = icon.color;
          }
        }
        return color;
      };
    },
    equalValue() {
      return (item, index) => {
        if (item.value === void 0 || item.value === null) {
          return this.modelValue === index;
        }
        return Dap.common.equal(this.modelValue, item.value);
      };
    },
    itemDisabled() {
      return (item) => {
        if (typeof item.disabled == "boolean") {
          return item.disabled;
        } else {
          return false;
        }
      };
    },
    dropdownItemStyle() {
      return (item, index) => {
        let style = {};
        if (!this.itemDisabled(item)) {
          if (this.equalValue(item, index)) {
            if (this.activeColor) {
              style.color = this.activeColor;
            }
          } else {
            if (this.inactiveColor) {
              style.color = this.inactiveColor;
            }
          }
        }
        return style;
      };
    },
    dropdownItemClass() {
      return (item, index) => {
        let cls = ["mvi-dropdown-item"];
        if (item.class) {
          cls.push(item.class);
        } else if (this.itemClass) {
          cls.push(this.itemClass);
        }
        if (this.equalValue(item, index)) {
          cls.push("mvi-dropdown-checked");
        }
        if (this.active && !item.disabled) {
          cls.push("mvi-dropdown-active");
        }
        return cls;
      };
    }
  },
  components: {
    Icon,
    Popup
  },
  mounted() {
    this.oldIndex = this.modelValue;
  },
  methods: {
    hide() {
      if (this.closable) {
        this.doCancel();
      }
    },
    doCancel() {
      this.$emit("update:show", false);
    },
    doSelect(item, index) {
      if (item.disabled) {
        return;
      }
      if (Dap.common.equal(
        this.valueFilter(item.value, index),
        this.oldIndex
      )) {
        this.$emit("select", {
          item: Object.assign({}, item),
          index
        });
        if (this.selectClose) {
          this.doCancel();
        }
      } else {
        this.$emit(
          "update:modelValue",
          this.valueFilter(item.value, index)
        );
        this.$emit("select", {
          item: Object.assign({}, item),
          index
        });
        if (this.selectClose) {
          this.doCancel();
        }
        this.oldIndex = this.valueFilter(item.value, index);
      }
    },
    valueFilter(value, index) {
      if (value === void 0 || value === null) {
        return index;
      }
      return value;
    }
  }
};
const _hoisted_1$r = { class: "mvi-dropdown" };
const _hoisted_2$o = ["disabled", "onClick"];
const _hoisted_3$j = { class: "mvi-dropdown-item-label" };
const _hoisted_4$d = ["textContent"];
const _hoisted_5$b = ["data-placement"];
function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Popup = resolveComponent("Popup");
  return openBlock(), createBlock(_component_Popup, {
    ref: "popup",
    "model-value": $props.show,
    onOverlayClick: $options.hide,
    "overlay-color": $props.overlayColor,
    "z-index": $props.zIndex,
    timeout: $props.timeout,
    placement: $props.placement,
    round: $props.round,
    "use-padding": $props.usePadding,
    "mount-el": $props.mountEl
  }, {
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1$r, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.options, (item, index) => {
          return openBlock(), createElementBlock("div", {
            disabled: $options.itemDisabled(item) || null,
            class: normalizeClass($options.dropdownItemClass(item, index)),
            key: "item-" + index,
            onClick: ($event) => $options.doSelect(item, index),
            style: normalizeStyle($options.dropdownItemStyle(item, index))
          }, [
            createElementVNode("div", _hoisted_3$j, [
              item.icon ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                type: $options.iconType(item.icon),
                url: $options.iconUrl(item.icon),
                spin: $options.iconSpin(item.icon),
                class: "mvi-dropdown-icon",
                size: $options.iconSize(item.icon),
                color: $options.iconColor(item.icon)
              }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
              createElementVNode("span", {
                class: "mvi-dropdown-label-text",
                textContent: toDisplayString(item.label || "")
              }, null, 8, _hoisted_4$d)
            ]),
            $options.equalValue(item, index) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "mvi-dropdown-item-checked",
              "data-placement": $props.placement
            }, [
              createVNode(_component_Icon, {
                type: $options.selectIconType,
                url: $options.selectIconUrl,
                spin: $options.selectIconSpin,
                size: $options.selectIconSize,
                color: $options.selectIconColor
              }, null, 8, ["type", "url", "spin", "size", "color"])
            ], 8, _hoisted_5$b)) : createCommentVNode("", true)
          ], 14, _hoisted_2$o);
        }), 128))
      ])
    ]),
    _: 1
  }, 8, ["model-value", "onOverlayClick", "overlay-color", "z-index", "timeout", "placement", "round", "use-padding", "mount-el"]);
}
const Dropdown = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$G], ["__scopeId", "data-v-8bb9bb6d"]]);
Dropdown.install = (app) => {
  app.component(Dropdown.name, Dropdown);
};
const notify_vue_vue_type_style_index_0_scoped_36736c02_lang = "";
const _sfc_main$F = {
  name: "m-notify",
  data() {
    return {
      timer: null,
      show: false
    };
  },
  props: {
    type: {
      type: String,
      default: null
    },
    message: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    background: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: null
    },
    timeout: {
      type: Number,
      default: null
    },
    icon: {
      type: [String, Object],
      default: null
    },
    remove: {
      type: Function,
      default: function() {
        return function() {
        };
      }
    },
    init: {
      type: Function,
      default: function() {
        return function() {
        };
      }
    }
  },
  computed: {
    computedType() {
      let arr = ["success", "info", "primary", "error", "warn"];
      if (arr.includes(this.type)) {
        return this.type;
      } else {
        return "success";
      }
    },
    computedMessage() {
      if (typeof this.message == "string") {
        return this.message;
      } else if (Dap.common.isObject(this.message)) {
        return JSON.stringify(this.message);
      } else {
        return String(this.message);
      }
    },
    computedColor() {
      if (typeof this.color == "string") {
        return this.color;
      } else {
        return null;
      }
    },
    computedBackground() {
      if (typeof this.background == "string") {
        return this.background;
      } else {
        return null;
      }
    },
    computedZIndex() {
      if (Dap.number.isNumber(this.zIndex)) {
        return this.zIndex;
      } else {
        return 1100;
      }
    },
    computedTimeout() {
      if (Dap.number.isNumber(this.timeout) && this.timeout > 0) {
        return this.timeout;
      } else {
        return 1500;
      }
    },
    iconType() {
      let type = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.type == "string") {
          type = this.icon.type;
        }
      } else if (typeof this.icon == "string") {
        type = this.icon;
      }
      return type;
    },
    iconUrl() {
      let url = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.url == "string") {
          url = this.icon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.spin == "boolean") {
          spin = this.icon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.size == "string") {
          size = this.icon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.color == "string") {
          color = this.icon.color;
        }
      }
      return color;
    },
    notifyStyle() {
      let style = {};
      style.zIndex = this.computedZIndex;
      if (this.computedBackground) {
        style.backgroundColor = this.computedBackground;
      }
      if (this.computedColor) {
        style.color = this.computedColor;
      }
      return style;
    }
  },
  components: {
    Icon
  },
  mounted() {
    this.show = true;
    this.init(this);
  },
  methods: {
    afterEnter(el) {
      if (this.computedTimeout > 0) {
        this.timer = setTimeout(() => {
          this.show = false;
        }, this.computedTimeout);
      }
    },
    afterLeave(el) {
      this.clearTimer();
      this.remove();
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
  }
};
const _hoisted_1$q = { class: "mvi-notify-content" };
const _hoisted_2$n = ["textContent"];
function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createBlock(Teleport, { to: "body" }, [
    createVNode(Transition, {
      name: "mvi-notify",
      onAfterLeave: $options.afterLeave,
      onAfterEnter: $options.afterEnter
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          class: normalizeClass(["mvi-notify", "mvi-notify-" + $options.computedType]),
          style: normalizeStyle($options.notifyStyle)
        }, [
          createElementVNode("div", _hoisted_1$q, [
            $options.iconType || $options.iconUrl ? (openBlock(), createBlock(_component_Icon, {
              key: 0,
              type: $options.iconType,
              url: $options.iconUrl,
              spin: $options.iconSpin,
              size: $options.iconSize,
              color: $options.iconColor
            }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
            createElementVNode("span", {
              textContent: toDisplayString($options.computedMessage)
            }, null, 8, _hoisted_2$n)
          ])
        ], 6), [
          [vShow, $data.show]
        ])
      ]),
      _: 1
    }, 8, ["onAfterLeave", "onAfterEnter"])
  ]);
}
const NotifyComponent = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$F], ["__scopeId", "data-v-36736c02"]]);
const Notify = {
  initParams: (options) => {
    let opts = {};
    if (Dap.common.isObject(options)) {
      opts.type = options.type;
      opts.message = options.message;
      opts.timeout = options.timeout;
      opts.background = options.background;
      opts.color = options.color;
      opts.zIndex = options.zIndex;
      opts.icon = options.icon;
    } else {
      opts.message = options;
    }
    return opts;
  },
  showNotify: (options) => {
    return new Promise((resolve, reject) => {
      if (Notify.$el && Notify.$instance) {
        Notify.$instance.unmount();
        Notify.$el.remove();
      }
      let opts = Notify.initParams(options);
      let mountNode = Dap.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(NotifyComponent, {
        ...opts,
        init: (vm) => {
          Notify.$vm = vm;
        },
        remove: () => {
          instance.unmount();
          mountNode.remove();
          resolve();
        }
      });
      instance.mount(mountNode);
      Notify.$el = mountNode;
      Notify.$instance = instance;
    });
  },
  hideNotify: () => {
    if (Notify.$vm) {
      Notify.$vm.show = false;
    }
  },
  install: (app) => {
    app.config.globalProperties.$showNotify = Notify.showNotify;
    app.provide("$showNotify", Notify.showNotify);
    app.config.globalProperties.$hideNotify = Notify.hideNotify;
    app.provide("$hideNotify", Notify.hideNotify);
  }
};
const pullRefresh_vue_vue_type_style_index_0_scoped_878c4d15_lang = "";
const _sfc_main$E = {
  name: "m-pull-refresh",
  data() {
    return {
      elHeight: 0,
      rootHeight: 0,
      amount: 0,
      amountMax: 4,
      startY: 0,
      firstStartY: 0,
      status: 0,
      translateY: 0,
      hasTouch: false,
      mouseDown: false,
      disableScroll: false
    };
  },
  emits: ["update:modelValue", "refresh"],
  props: {
    pullingText: {
      type: String,
      default: "\u4E0B\u62C9\u5237\u65B0"
    },
    loosingText: {
      type: String,
      default: "\u91CA\u653E\u5237\u65B0"
    },
    loadingText: {
      type: String,
      default: "\u6B63\u5728\u5237\u65B0"
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    pullingIcon: {
      type: [String, Object],
      default: null
    },
    loosingIcon: {
      type: [String, Object],
      default: null
    },
    loadingIcon: {
      type: [String, Object],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    },
    pullingColor: {
      type: String,
      default: null
    },
    loosingColor: {
      type: String,
      default: null
    },
    loadingColor: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: 4e3
    },
    distance: {
      type: Number,
      default: 1.4
    }
  },
  computed: {
    containerStyle() {
      let style = {};
      style.height = `calc(100% + ${this.elHeight}px)`;
      style.transform = `translateY(${this.translateY}px)`;
      return style;
    },
    wrapperStyle() {
      let style = {};
      style.height = this.rootHeight + "px";
      if (this.disableScroll) {
        style.overflowY = "hidden";
      }
      return style;
    },
    elStyle() {
      let style = {};
      if (this.color) {
        style.color = this.color;
      }
      if (this.pullingColor && this.status == 0) {
        style.color = this.pullingColor;
      } else if (this.loosingColor && this.status == 1) {
        style.color = this.loosingColor;
      } else if (this.loadingColor && this.status == 2) {
        style.color = this.loadingColor;
      }
      return style;
    },
    icon() {
      if (this.status == 0) {
        return {
          type: this.pullingIconType,
          spin: this.pullingIconSpin,
          url: this.pullingIconUrl,
          size: this.pullingIconSize,
          color: this.pullingIconColor
        };
      } else if (this.status == 1) {
        return {
          type: this.loosingIconType,
          spin: this.loosingIconSpin,
          url: this.loosingIconUrl,
          size: this.loosingIconSize,
          color: this.loosingIconColor
        };
      } else if (this.status == 2) {
        return {
          type: this.loadingIconType,
          spin: this.loadingIconSpin,
          url: this.loadingIconUrl,
          size: this.loadingIconSize,
          color: this.loadingIconColor
        };
      }
    },
    message() {
      if (this.status == 0) {
        return this.pullingText;
      } else if (this.status == 1) {
        return this.loosingText;
      } else if (this.status == 2) {
        return this.loadingText;
      }
    },
    pullingIconType() {
      let type = "arrow-down";
      if (Dap.common.isObject(this.pullingIcon)) {
        if (typeof this.pullingIcon.type == "string") {
          type = this.pullingIcon.type;
        }
      } else if (typeof this.pullingIcon == "string") {
        type = this.pullingIcon;
      }
      return type;
    },
    pullingIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.pullingIcon)) {
        if (typeof this.pullingIcon.url == "string") {
          url = this.pullingIcon.url;
        }
      }
      return url;
    },
    pullingIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.pullingIcon)) {
        if (typeof this.pullingIcon.spin == "boolean") {
          spin = this.pullingIcon.spin;
        }
      }
      return spin;
    },
    pullingIconSize() {
      let size = null;
      if (Dap.common.isObject(this.pullingIcon)) {
        if (typeof this.pullingIcon.size == "string") {
          size = this.pullingIcon.size;
        }
      }
      return size;
    },
    pullingIconColor() {
      let color = null;
      if (Dap.common.isObject(this.pullingIcon)) {
        if (typeof this.pullingIcon.color == "string") {
          color = this.pullingIcon.color;
        }
      }
      return color;
    },
    loosingIconType() {
      let type = "arrow-up";
      if (Dap.common.isObject(this.loosingIcon)) {
        if (typeof this.loosingIcon.type == "string") {
          type = this.loosingIcon.type;
        }
      } else if (typeof this.loosingIcon == "string") {
        type = this.loosingIcon;
      }
      return type;
    },
    loosingIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.loosingIcon)) {
        if (typeof this.loosingIcon.url == "string") {
          url = this.loosingIcon.url;
        }
      }
      return url;
    },
    loosingIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.loosingIcon)) {
        if (typeof this.loosingIcon.spin == "boolean") {
          spin = this.loosingIcon.spin;
        }
      }
      return spin;
    },
    loosingIconSize() {
      let size = null;
      if (Dap.common.isObject(this.loosingIcon)) {
        if (typeof this.loosingIcon.size == "string") {
          size = this.loosingIcon.size;
        }
      }
      return size;
    },
    loosingIconColor() {
      let color = null;
      if (Dap.common.isObject(this.loosingIcon)) {
        if (typeof this.loosingIcon.color == "string") {
          color = this.loosingIcon.color;
        }
      }
      return color;
    },
    loadingIconType() {
      let type = "load-e";
      if (Dap.common.isObject(this.loadingIcon)) {
        if (typeof this.loadingIcon.type == "string") {
          type = this.loadingIcon.type;
        }
      } else if (typeof this.loadingIcon == "string") {
        type = this.loadingIcon;
      }
      return type;
    },
    loadingIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.loadingIcon)) {
        if (typeof this.loadingIcon.url == "string") {
          url = this.loadingIcon.url;
        }
      }
      return url;
    },
    loadingIconSpin() {
      let spin = true;
      if (Dap.common.isObject(this.loadingIcon)) {
        if (typeof this.loadingIcon.spin == "boolean") {
          spin = this.loadingIcon.spin;
        }
      }
      return spin;
    },
    loadingIconSize() {
      let size = null;
      if (Dap.common.isObject(this.loadingIcon)) {
        if (typeof this.loadingIcon.size == "string") {
          size = this.loadingIcon.size;
        }
      }
      return size;
    },
    loadingIconColor() {
      let color = null;
      if (Dap.common.isObject(this.loadingIcon)) {
        if (typeof this.loadingIcon.color == "string") {
          color = this.loadingIcon.color;
        }
      }
      return color;
    }
  },
  components: {
    Icon
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  mounted() {
    this.initHeight();
    Dap.event.on(
      document.documentElement,
      `mousemove.pullRefresh_${this.uid}`,
      this.onPull2
    );
    Dap.event.on(
      document.documentElement,
      `mouseup.pullRefresh_${this.uid}`,
      this.pulled2
    );
  },
  watch: {
    modelValue(newValue) {
      this.changeStatus();
    }
  },
  methods: {
    initHeight() {
      this.elHeight = this.$refs.el.offsetHeight;
      this.rootHeight = this.$el.offsetHeight;
      this.translateY = -this.elHeight;
    },
    startPull(event2) {
      if (this.disabled) {
        return;
      }
      if (this.status == 0) {
        this.startY = event2.targetTouches[0].pageY;
        this.firstStartY = this.startY;
      }
    },
    startPull2(event2) {
      if (this.disabled) {
        return;
      }
      if (this.status == 0) {
        this.mouseDown = true;
        this.startY = event2.pageY;
        this.firstStartY = this.startY;
      }
    },
    onPull(event2) {
      if (this.disabled) {
        return;
      }
      if (this.status == 2) {
        return;
      }
      let endY = event2.targetTouches[0].pageY;
      let move = endY - this.startY;
      let totalMove = endY - this.firstStartY;
      this.startY = endY;
      if (totalMove <= 0) {
        this.firstStartY = this.startY;
        return;
      }
      if (Dap.element.getScrollTop(this.$refs.wrapper) > 0) {
        this.firstStartY = this.startY;
        return;
      }
      let el = this.getScrollEl(event2.target);
      if (el != this.$refs.wrapper && Dap.element.getScrollTop(el) > 0) {
        this.firstStartY = this.startY;
        return;
      }
      this.hasTouch = true;
      if (event2.cancelable) {
        event2.preventDefault();
      }
      if (this.amount < this.amountMax) {
        this.amount++;
      }
      let y = this.translateY + move / this.amount;
      if (y > Dap.element.rem2px(this.distance) - this.elHeight) {
        this.status = 1;
      } else {
        this.status = 0;
      }
      this.translateY = y;
    },
    onPull2(event2) {
      if (!this.mouseDown || this.disabled) {
        return;
      }
      if (this.status == 2) {
        return;
      }
      let endY = event2.pageY;
      let move = endY - this.startY;
      let totalMove = endY - this.firstStartY;
      this.startY = endY;
      if (totalMove <= 0) {
        this.firstStartY = this.startY;
        return;
      }
      if (Dap.element.getScrollTop(this.$refs.wrapper) > 0) {
        this.firstStartY = this.startY;
        return;
      }
      let el = this.getScrollEl(event2.target);
      if (el != this.$refs.wrapper && Dap.element.getScrollTop(el) > 0) {
        this.firstStartY = this.startY;
        return;
      }
      this.hasTouch = true;
      if (event2.cancelable) {
        event2.preventDefault();
      }
      if (this.amount < this.amountMax) {
        this.amount++;
      }
      let y = this.translateY + move / this.amount;
      if (y > Dap.element.rem2px(this.distance) - this.elHeight) {
        this.status = 1;
      } else {
        this.status = 0;
      }
      this.translateY = y;
    },
    pulled(event2) {
      if (this.disabled) {
        return;
      }
      if (this.status == 1 && this.modelValue == false) {
        this.$emit("update:modelValue", true);
      } else if (this.status == 0) {
        this.changeStatus();
      }
    },
    pulled2(event2) {
      if (!this.mouseDown || this.disabled) {
        return;
      }
      this.mouseDown = false;
      if (this.status == 1 && this.modelValue === false) {
        this.$emit("update:modelValue", true);
      } else if (this.status == 0) {
        this.changeStatus();
      }
    },
    changeStatus() {
      if (this.disabled) {
        return;
      }
      if (this.modelValue) {
        this.status = 2;
        this.disableScroll = true;
        this.$emit("refresh");
        if (!this.hasTouch) {
          this.$refs.container.style.transition = "transform 300ms";
          this.$refs.container.style.webkitTransition = "transform 300ms";
          this.$refs.container.offsetWidth;
          this.translateY = Dap.element.rem2px(this.distance) - this.elHeight;
          setTimeout(() => {
            if (this.$refs.container) {
              this.$refs.container.style.transition = "";
              this.$refs.container.style.webkitTransition = "";
            }
          }, 300);
        }
      } else {
        this.amount = 0;
        this.hasTouch = false;
        this.$refs.container.style.transition = "transform 300ms";
        this.$refs.container.style.webkitTransition = "transform 300ms";
        this.$refs.container.offsetWidth;
        this.translateY = -this.elHeight;
        setTimeout(() => {
          if (this.$refs.container) {
            this.$refs.container.style.transition = "";
            this.$refs.container.style.webkitTransition = "";
          }
          this.status = 0;
          this.disableScroll = false;
        }, 300);
      }
    },
    getScrollEl(el) {
      if (el === this.$el) {
        return this.$el;
      }
      if (Dap.element.getScrollHeight(el) > el.clientHeight) {
        return el;
      }
      return this.getScrollEl(el.parentNode);
    }
  },
  beforeUnmount() {
    Dap.event.off(
      document.documentElement,
      `mousemove.pullRefresh_${this.uid} mouseup.pullRefresh_${this.uid}`
    );
  }
};
const _hoisted_1$p = { class: "mvi-pull-refresh" };
const _hoisted_2$m = ["textContent"];
function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", _hoisted_1$p, [
    createElementVNode("div", {
      ref: "container",
      class: "mvi-pull-refresh-container",
      style: normalizeStyle($options.containerStyle)
    }, [
      createElementVNode("div", {
        ref: "el",
        class: "mvi-pull-refresh-el",
        style: normalizeStyle($options.elStyle)
      }, [
        _ctx.$slots.el ? renderSlot(_ctx.$slots, "el", {
          key: 0,
          status: $data.status
        }, void 0, true) : createCommentVNode("", true),
        !_ctx.$slots.el ? (openBlock(), createBlock(_component_Icon, {
          key: 1,
          type: $options.icon.type,
          spin: $options.icon.spin,
          url: $options.icon.url,
          size: $options.icon.size,
          color: $options.icon.color
        }, null, 8, ["type", "spin", "url", "size", "color"])) : createCommentVNode("", true),
        !_ctx.$slots.el ? (openBlock(), createElementBlock("span", {
          key: 2,
          class: "mvi-pull-refresh-text",
          textContent: toDisplayString($options.message)
        }, null, 8, _hoisted_2$m)) : createCommentVNode("", true)
      ], 4),
      createElementVNode("div", {
        ref: "wrapper",
        class: "mvi-pull-refresh-wrapper",
        onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.startPull && $options.startPull(...args)),
        onTouchmove: _cache[1] || (_cache[1] = (...args) => $options.onPull && $options.onPull(...args)),
        onTouchend: _cache[2] || (_cache[2] = (...args) => $options.pulled && $options.pulled(...args)),
        onMousedown: _cache[3] || (_cache[3] = (...args) => $options.startPull2 && $options.startPull2(...args)),
        style: normalizeStyle($options.wrapperStyle)
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 36)
    ], 4)
  ]);
}
const PullRefresh = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$E], ["__scopeId", "data-v-878c4d15"]]);
PullRefresh.install = (app) => {
  app.component(PullRefresh.name, PullRefresh);
};
const swipeCell_vue_vue_type_style_index_0_scoped_c99305a4_lang = "";
const _sfc_main$D = {
  name: "m-swipe-cell",
  data() {
    return {
      startX: 0,
      startX2: 0,
      transformX: 0,
      leftShow: false,
      rightShow: false,
      amounts: 0,
      mouseDown: false,
      isDrag: false
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    centerClose: {
      type: Boolean,
      default: true
    }
  },
  emits: ["open", "close"],
  watch: {
    disabled(newValue, oldValue) {
      this.close(true);
    }
  },
  computed: {
    cellStyle() {
      let style = {};
      style.transform = `translateX(${this.transformX}px)`;
      return style;
    }
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  mounted() {
    Dap.event.on(
      document.documentElement,
      `mousemove.swipeCell_${this.uid}`,
      this.cellMouseMove
    );
    Dap.event.on(
      document.documentElement,
      `mouseup.swipeCell_${this.uid}`,
      this.cellMouseUp
    );
  },
  methods: {
    cellTouchStart(event2) {
      if (this.disabled) {
        return;
      }
      this.startX = event2.touches[0].pageX;
      this.startX2 = this.startX;
      this.amounts = 0;
    },
    cellTouchMove(event2) {
      if (this.disabled) {
        return;
      }
      let endX = event2.touches[0].pageX;
      let moveX = endX - this.startX;
      let moveX2 = endX - this.startX2;
      this.startX = endX;
      if (Math.abs(moveX2) <= Dap.element.rem2px(1)) {
        return;
      }
      if (event2.cancelable) {
        event2.preventDefault();
      }
      if (moveX2 > 0) {
        if (this.leftShow && this.transformX == this.$refs.left.offsetWidth) {
          return;
        }
        this.leftShow = true;
        this.$nextTick(() => {
          if (this.transformX >= this.$refs.left.offsetWidth) {
            this.amounts += 8;
            this.transformX += moveX / this.amounts;
          } else {
            this.transformX += moveX;
          }
        });
      } else if (moveX2 < 0) {
        if (this.rightShow && this.transformX == -this.$refs.right.offsetWidth) {
          return;
        }
        this.rightShow = true;
        this.$nextTick(() => {
          if (this.transformX <= -this.$refs.right.offsetWidth) {
            this.amounts += 8;
            this.transformX += moveX / this.amounts;
          } else {
            this.transformX += moveX;
          }
        });
      }
    },
    cellTouchEnd(event2) {
      if (this.disabled) {
        return;
      }
      let moveX = event2.changedTouches[0].pageX - this.startX2;
      if (moveX == 0) {
        return;
      }
      if (moveX > 0) {
        if (this.transformX > 0) {
          this.open("left");
        } else {
          this.close();
        }
      } else {
        if (this.transformX < 0) {
          this.open("right");
        } else {
          this.close();
        }
      }
    },
    cellMouseDown(event2) {
      if (this.disabled) {
        return;
      }
      this.startX = event2.pageX;
      this.startX2 = this.startX;
      this.amounts = 0;
      this.mouseDown = true;
    },
    cellMouseMove(event2) {
      if (this.disabled) {
        return;
      }
      if (!this.mouseDown) {
        return;
      }
      this.isDrag = true;
      let endX = event2.pageX;
      let moveX = endX - this.startX;
      let moveX2 = endX - this.startX2;
      this.startX = endX;
      if (Math.abs(moveX2) <= Dap.element.rem2px(1)) {
        return;
      }
      if (event2.cancelable) {
        event2.preventDefault();
      }
      if (moveX2 > 0) {
        if (this.leftShow && this.transformX == this.$refs.left.offsetWidth) {
          return;
        }
        this.leftShow = true;
        this.$nextTick(() => {
          if (this.transformX >= this.$refs.left.offsetWidth) {
            this.amounts += 3;
            this.transformX += moveX / this.amounts;
          } else {
            this.transformX += moveX;
          }
        });
      } else if (moveX2 < 0) {
        if (this.rightShow && this.transformX == -this.$refs.right.offsetWidth) {
          return;
        }
        this.rightShow = true;
        this.$nextTick(() => {
          if (this.transformX <= -this.$refs.right.offsetWidth) {
            this.amounts += 3;
            this.transformX += moveX / this.amounts;
          } else {
            this.transformX += moveX;
          }
        });
      }
    },
    cellMouseUp(event2) {
      if (this.disabled) {
        return;
      }
      if (!this.mouseDown) {
        return;
      }
      this.mouseDown = false;
      let moveX = event2.pageX - this.startX2;
      if (moveX == 0) {
        return;
      }
      if (moveX > 0) {
        if (this.transformX > 0) {
          this.open("left");
        } else {
          this.close();
        }
      } else {
        if (this.transformX < 0) {
          this.open("right");
        } else {
          this.close();
        }
      }
      setTimeout(() => {
        this.isDrag = false;
      }, 10);
    },
    setTransform(transformX) {
      return new Promise((resolve, reject) => {
        this.$el.style.transition = "transform 300ms";
        this.$el.style.webkitTransition = "transform 300ms";
        setTimeout(() => {
          this.transformX = transformX;
          setTimeout(() => {
            this.$el.style.transition = "";
            this.$el.style.webkitTransition = "";
            resolve();
          }, 300);
        }, 10);
      });
    },
    open(placement) {
      if (this.disabled) {
        return;
      }
      if (placement == "left") {
        if (!this.leftShow) {
          this.leftShow = true;
        }
        this.$nextTick(() => {
          this.setTransform(this.$refs.left.offsetWidth).then(() => {
            this.$emit("open", placement);
          });
        });
      } else if (placement == "right") {
        if (!this.rightShow) {
          this.rightShow = true;
        }
        this.$nextTick(() => {
          this.setTransform(-this.$refs.right.offsetWidth).then(
            () => {
              this.$emit("open", placement);
            }
          );
        });
      }
    },
    close(flag) {
      if (!flag) {
        if (this.disabled) {
          return;
        }
      }
      let placement = "left";
      if (this.transformX == 0) {
        return;
      }
      if (this.transformX >= 0) {
        placement = "left";
      } else {
        placement = "right";
      }
      this.setTransform(0).then(() => {
        this.leftShow = false;
        this.rightShow = false;
        this.$emit("close", placement);
      });
    },
    clickCenter() {
      if (this.disabled) {
        return;
      }
      if (this.isDrag) {
        return;
      }
      if (this.centerClose) {
        this.close();
      }
    }
  },
  beforeUnmount() {
    Dap.event.off(
      document.documentElement,
      `mousemove.swipeCell_${this.uid} mouseup.swipeCell_${this.uid}`
    );
  }
};
const _hoisted_1$o = ["disabled"];
const _hoisted_2$l = {
  ref: "left",
  class: "mvi-swipe-cell-left"
};
const _hoisted_3$i = {
  ref: "right",
  class: "mvi-swipe-cell-right"
};
function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "mvi-swipe-cell",
    onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.cellTouchStart && $options.cellTouchStart(...args)),
    onTouchmove: _cache[2] || (_cache[2] = (...args) => $options.cellTouchMove && $options.cellTouchMove(...args)),
    onTouchend: _cache[3] || (_cache[3] = (...args) => $options.cellTouchEnd && $options.cellTouchEnd(...args)),
    style: normalizeStyle($options.cellStyle),
    disabled: $props.disabled || null,
    onMousedown: _cache[4] || (_cache[4] = (...args) => $options.cellMouseDown && $options.cellMouseDown(...args))
  }, [
    withDirectives(createElementVNode("div", _hoisted_2$l, [
      renderSlot(_ctx.$slots, "left", {}, void 0, true)
    ], 512), [
      [vShow, $data.leftShow]
    ]),
    createElementVNode("div", {
      ref: "center",
      class: "mvi-swipe-cell-center",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.clickCenter && $options.clickCenter(...args))
    }, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 512),
    withDirectives(createElementVNode("div", _hoisted_3$i, [
      renderSlot(_ctx.$slots, "right", {}, void 0, true)
    ], 512), [
      [vShow, $data.rightShow]
    ])
  ], 44, _hoisted_1$o);
}
const SwipeCell = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$D], ["__scopeId", "data-v-c99305a4"]]);
SwipeCell.install = (app) => {
  app.component(SwipeCell.name, SwipeCell);
};
const circleProgress_vue_vue_type_style_index_0_scoped_3e99cf8c_lang = "";
const _sfc_main$C = {
  name: "m-circle-progress",
  data() {
    return {
      pathSize: 1e3
    };
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    size: {
      type: Number,
      default: 2
    },
    color: {
      type: String,
      default: null
    },
    trackColor: {
      type: String,
      default: null
    },
    fill: {
      type: String,
      default: null
    },
    animation: {
      type: Boolean,
      default: true
    },
    timeout: {
      type: Number,
      default: 400
    },
    showTip: {
      type: Boolean,
      default: false
    },
    tipText: {
      type: String,
      default: null
    },
    strokeWidth: {
      type: Number,
      default: 0.2
    },
    round: {
      type: Boolean,
      default: false
    },
    clockWise: {
      type: Boolean,
      default: true
    },
    tipClass: {
      type: String,
      default: null
    }
  },
  computed: {
    progressStyle() {
      let style = {};
      if (this.size) {
        style.width = this.size + "rem";
        style.height = this.size + "rem";
      }
      return style;
    },
    viewBox() {
      let width = Dap.element.rem2px(this.strokeWidth);
      return `0 0 ${this.pathSize + 2 * width} ${this.pathSize + 2 * width}`;
    },
    pathD() {
      let width = Dap.element.rem2px(this.strokeWidth);
      return `M ${this.pathSize / 2 + width} ${this.pathSize / 2 + width} m 0, -${this.pathSize / 2} a ${this.pathSize / 2}, ${this.pathSize / 2} 0 1, ${this.clockWise ? 1 : 0} 0, ${this.pathSize} a ${this.pathSize / 2}, ${this.pathSize / 2} 0 1, ${this.clockWise ? 1 : 0} 0, -${this.pathSize}`;
    },
    computedValue() {
      if (this.tipText) {
        return this.tipText;
      } else {
        let value = this.value > this.max ? this.max : this.value < this.min ? this.min : this.value;
        return Math.round(
          (value - this.min) / (this.max - this.min) * 100
        ) + "%";
      }
    },
    barStyle() {
      let style = {};
      if (this.fill) {
        style.fill = this.fill;
      }
      if (this.color) {
        style.stroke = this.color;
      }
      if (Dap.number.isNumber(this.strokeWidth)) {
        style.strokeWidth = this.strokeWidth + "rem";
      }
      if (this.round) {
        style.strokeLinecap = "round";
      }
      if (this.animation) {
        style.transition = "stroke-dasharray " + this.timeout + "ms";
        style.webkitTransition = "stroke-dasharray " + this.timeout + "ms";
      }
      let circleLength = Number((this.pathSize * Math.PI).toFixed(2));
      let value = this.value > this.max ? this.max : this.value < this.min ? this.min : this.value;
      let valueLength = Number(
        ((value - this.min) / (this.max - this.min) * circleLength).toFixed(2)
      );
      style.strokeDasharray = valueLength + "," + (circleLength - valueLength);
      return style;
    },
    trackStyle() {
      let style = {};
      if (this.fill) {
        style.fill = this.fill;
      }
      if (this.trackColor) {
        style.stroke = this.trackColor;
      }
      if (Dap.number.isNumber(this.strokeWidth)) {
        style.strokeWidth = this.strokeWidth + "rem";
      }
      return style;
    }
  }
};
const _hoisted_1$n = ["viewBox"];
const _hoisted_2$k = ["d"];
const _hoisted_3$h = ["d"];
const _hoisted_4$c = {
  key: 0,
  class: "mvi-circle-progress-tip"
};
const _hoisted_5$a = ["textContent"];
function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "mvi-circle-progress",
    style: normalizeStyle($options.progressStyle)
  }, [
    (openBlock(), createElementBlock("svg", { viewBox: $options.viewBox }, [
      createElementVNode("path", {
        d: $options.pathD,
        style: normalizeStyle($options.trackStyle),
        class: "mvi-circle-progress-track"
      }, null, 12, _hoisted_2$k),
      createElementVNode("path", {
        d: $options.pathD,
        style: normalizeStyle($options.barStyle),
        class: "mvi-circle-progress-bar"
      }, null, 12, _hoisted_3$h)
    ], 8, _hoisted_1$n)),
    $props.showTip ? (openBlock(), createElementBlock("div", _hoisted_4$c, [
      _ctx.$slots.tip ? renderSlot(_ctx.$slots, "tip", {
        key: 0,
        value: $props.value
      }, void 0, true) : (openBlock(), createElementBlock("span", {
        key: 1,
        class: normalizeClass($props.tipClass || ""),
        textContent: toDisplayString($options.computedValue)
      }, null, 10, _hoisted_5$a))
    ])) : createCommentVNode("", true)
  ], 4);
}
const CircleProgress = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$C], ["__scopeId", "data-v-3e99cf8c"]]);
CircleProgress.install = (app) => {
  app.component(CircleProgress.name, CircleProgress);
};
const collapse_vue_vue_type_style_index_0_scoped_a1615f43_lang = "";
const _sfc_main$B = {
  name: "m-collapse",
  data() {
    return {
      children: []
    };
  },
  emits: [
    "update:modelValue",
    "before-slide-down",
    "slide-down",
    "before-slide-up",
    "slide-up"
  ],
  props: {
    modelValue: {
      type: [Number, Array],
      default: null
    },
    accordion: {
      type: Boolean,
      default: false
    },
    inBorder: {
      type: Boolean,
      default: true
    },
    outBorder: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    noWrap: {
      type: Boolean,
      default: false
    },
    openArrow: {
      type: [String, Object],
      default: "angle-up"
    },
    closeArrow: {
      type: [String, Object],
      default: "angle-down"
    },
    timeout: {
      type: Number,
      default: 200
    }
  },
  provide() {
    return {
      collapse: this
    };
  }
};
const _hoisted_1$m = ["disabled"];
function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    disabled: $props.disabled || null,
    class: "mvi-collapse"
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 8, _hoisted_1$m);
}
const Collapse = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$B], ["__scopeId", "data-v-a1615f43"]]);
Collapse.install = (app) => {
  app.component(Collapse.name, Collapse);
};
const transitionSlide_vue_vue_type_style_index_0_scoped_61e1dfac_lang = "";
const _sfc_main$A = {
  name: "m-transition-slide",
  data() {
    return {
      show: true,
      height: null,
      useAnimation: false,
      opacity: ""
    };
  },
  emits: ["before-slide-down", "slide-down", "before-slide-up", "slide-up"],
  props: {
    expand: {
      type: Boolean,
      default: true
    },
    timeout: {
      type: Number,
      default: 200
    }
  },
  watch: {
    expand(newValue) {
      this.show = newValue;
    }
  },
  created() {
    if (!this.expand) {
      this.opacity = 0;
    }
  },
  mounted() {
    this.show = this.expand;
    this.$nextTick(() => {
      this.useAnimation = true;
      if (this.opacity === 0) {
        this.opacity = "";
      }
    });
  },
  methods: {
    beforeEnter(el) {
      el.style.height = 0;
      if (this.useAnimation) {
        el.style.transition = "height " + this.timeout + "ms linear";
        el.style.webkitTransition = "height " + this.timeout + "ms linear";
      }
      this.$emit("before-slide-down", this.$el);
    },
    enter(el) {
      el.offsetWidth;
      el.style.height = this.height;
    },
    afterEnter(el) {
      if (this.useAnimation) {
        el.style.transition = "";
        el.style.webkitTransition = "";
      }
      el.style.height = "";
      this.$emit("slide-down", this.$el);
    },
    beforeLeave(el) {
      if (!this.height) {
        this.height = Dap.element.getCssStyle(el, "height");
      }
      el.style.height = this.height;
      if (this.useAnimation) {
        el.style.transition = "height " + this.timeout + "ms linear";
        el.style.webkitTransition = "height " + this.timeout + "ms linear";
      }
      this.$emit("before-slide-up", this.$el);
    },
    leave(el) {
      el.offsetWidth;
      el.style.height = 0;
    },
    afterLeave(el) {
      if (this.useAnimation) {
        el.style.transition = "";
        el.style.webkitTransition = "";
      }
      el.style.height = "";
      this.$emit("slide-up", this.$el);
    }
  }
};
function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, {
    name: "mvi-transition-slide",
    onBeforeEnter: $options.beforeEnter,
    onAfterEnter: $options.afterEnter,
    onBeforeLeave: $options.beforeLeave,
    onAfterLeave: $options.afterLeave,
    onEnter: $options.enter,
    onLeave: $options.leave
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        class: "mvi-transition-slide",
        style: normalizeStyle({ opacity: $data.opacity })
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4), [
        [vShow, $data.show]
      ])
    ]),
    _: 3
  }, 8, ["onBeforeEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave", "onEnter", "onLeave"]);
}
const TransitionSlide = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$A], ["__scopeId", "data-v-61e1dfac"]]);
TransitionSlide.install = (app) => {
  app.component(TransitionSlide.name, TransitionSlide);
};
const collapseItem_vue_vue_type_style_index_0_scoped_ab029b5e_lang = "";
const _sfc_main$z = {
  name: "m-collapse-item",
  data() {
    return {
      open: true,
      cellBorder: false
    };
  },
  inject: ["collapse"],
  props: {
    icon: {
      type: [String, Object],
      default: null
    },
    title: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    outBorder: {
      type: Boolean,
      default: null
    },
    inBorder: {
      type: Boolean,
      default: null
    },
    titleClass: {
      type: String,
      default: null
    },
    labelClass: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ""
    },
    contentClass: {
      type: String,
      default: null
    },
    noWrap: {
      type: Boolean,
      default: null
    },
    openArrow: {
      type: [String, Object],
      default: null
    },
    closeArrow: {
      type: [String, Object],
      default: null
    },
    timeout: {
      type: Number,
      default: null
    }
  },
  components: {
    Cell,
    TransitionSlide
  },
  created() {
    this.collapse.children.push(this);
    this.cellBorder = this.computedInBorder;
    this.isNeedHideSelf();
  },
  setup() {
    const uid = getCurrentInstance().uid;
    return {
      uid
    };
  },
  watch: {
    "collapse.modelValue": function(newValue, oldValue) {
      this.isNeedHideSelf();
    }
  },
  computed: {
    computedOutBorder() {
      if (typeof this.outBorder == "boolean") {
        return this.outBorder;
      } else {
        return this.collapse.outBorder;
      }
    },
    computedInBorder() {
      if (typeof this.inBorder == "boolean") {
        return this.inBorder;
      } else {
        return this.collapse.inBorder;
      }
    },
    computedNoWrap() {
      if (typeof this.noWrap == "boolean") {
        return this.noWrap;
      } else {
        return this.collapse.noWrap;
      }
    },
    itemIndex() {
      return this.collapse.children.findIndex((vm) => {
        return Dap.common.equal(vm.uid, this.uid);
      });
    },
    computedOpenArrow() {
      let arrow = {
        type: "angle-up",
        color: null,
        size: null,
        url: null,
        spin: false
      };
      if (typeof this.openArrow == "string" && this.openArrow) {
        arrow.type = this.openArrow;
      } else if (Dap.common.isObject(this.openArrow)) {
        if (typeof this.openArrow.type == "string" && this.openArrow.type) {
          arrow.type = this.openArrow.type;
        }
        if (typeof this.openArrow.color == "string" && this.openArrow.color) {
          arrow.color = this.openArrow.color;
        }
        if (typeof this.openArrow.size == "string" && this.openArrow.size) {
          arrow.size = this.openArrow.size;
        }
        if (typeof this.openArrow.url == "string" && this.openArrow.url) {
          arrow.url = this.openArrow.url;
        }
        if (typeof this.openArrow.spin == "boolean") {
          arrow.spin = this.openArrow.spin;
        }
      } else if (typeof this.collapse.openArrow == "string" && this.collapse.openArrow) {
        arrow.type = this.collapse.openArrow;
      } else if (Dap.common.isObject(this.collapse.openArrow)) {
        if (typeof this.collapse.openArrow.type == "string" && this.collapse.openArrow.type) {
          arrow.type = this.collapse.openArrow.type;
        }
        if (typeof this.collapse.openArrow.color == "string" && this.collapse.openArrow.color) {
          arrow.color = this.collapse.openArrow.color;
        }
        if (typeof this.collapse.openArrow.size == "string" && this.collapse.openArrow.size) {
          arrow.size = this.collapse.openArrow.size;
        }
        if (typeof this.collapse.openArrow.url == "string" && this.collapse.openArrow.url) {
          arrow.url = this.collapse.openArrow.url;
        }
        if (typeof this.collapse.openArrow.spin == "boolean") {
          arrow.spin = this.collapse.openArrow.spin;
        }
      }
      return arrow;
    },
    computedCloseArrow() {
      let arrow = {
        type: "angle-down",
        color: null,
        size: null,
        url: null
      };
      if (typeof this.closeArrow == "string" && this.closeArrow) {
        arrow.type = this.closeArrow;
      } else if (Dap.common.isObject(this.closeArrow)) {
        if (typeof this.closeArrow.type == "string" && this.closeArrow.type) {
          arrow.type = this.closeArrow.type;
        }
        if (typeof this.closeArrow.color == "string" && this.closeArrow.color) {
          arrow.color = this.closeArrow.color;
        }
        if (typeof this.closeArrow.size == "string" && this.closeArrow.size) {
          arrow.size = this.closeArrow.size;
        }
        if (typeof this.closeArrow.url == "string" && this.closeArrow.url) {
          arrow.url = this.closeArrow.url;
        }
        if (typeof this.closeArrow.spin == "boolean") {
          arrow.spin = this.closeArrow.spin;
        }
      } else if (typeof this.collapse.closeArrow == "string" && this.collapse.closeArrow) {
        arrow.type = this.collapse.closeArrow;
      } else if (Dap.common.isObject(this.collapse.closeArrow)) {
        if (typeof this.collapse.closeArrow.type == "string" && this.collapse.closeArrow.type) {
          arrow.type = this.collapse.closeArrow.type;
        }
        if (typeof this.collapse.closeArrow.color == "string" && this.collapse.closeArrow.color) {
          arrow.color = this.collapse.closeArrow.color;
        }
        if (typeof this.collapse.closeArrow.size == "string" && this.collapse.closeArrow.size) {
          arrow.size = this.collapse.closeArrow.size;
        }
        if (typeof this.collapse.closeArrow.url == "string" && this.collapse.closeArrow.url) {
          arrow.url = this.collapse.closeArrow.url;
        }
        if (typeof this.collapse.closeArrow.spin == "boolean") {
          arrow.spin = this.collapse.closeArrow.spin;
        }
      }
      return arrow;
    },
    arrow() {
      return this.open ? this.computedOpenArrow : this.computedCloseArrow;
    },
    computedActive() {
      if (this.disabled || this.collapse.disabled) {
        return false;
      }
      if (typeof this.active == "boolean") {
        return this.active;
      } else {
        return this.collapse.active;
      }
    },
    computedTimeout() {
      if (typeof this.timeout == "number") {
        return this.timeout;
      } else {
        return this.collapse.timeout;
      }
    }
  },
  methods: {
    beforeSlideDown() {
      this.collapse.$emit("before-slide-down", this.itemIndex);
      if (this.computedInBorder) {
        this.cellBorder = true;
      }
    },
    slideDown() {
      this.collapse.$emit("slide-down", this.itemIndex);
    },
    beforeSlideUp() {
      this.collapse.$emit("before-slide-up", this.itemIndex);
    },
    slideUp() {
      if (this.computedInBorder) {
        this.cellBorder = false;
      }
      this.collapse.$emit("slide-up", this.itemIndex);
    },
    isNeedHideSelf() {
      if (this.collapse.accordion) {
        if (this.collapse.modelValue === this.itemIndex) {
          this.open = true;
        } else {
          this.open = false;
        }
      } else {
        if (Dap.number.isNumber(this.collapse.modelValue)) {
          if (this.collapse.modelValue === this.itemIndex) {
            this.open = true;
          } else {
            this.open = false;
          }
        } else if (Array.isArray(this.collapse.modelValue)) {
          if (this.collapse.modelValue.includes(this.itemIndex)) {
            this.open = true;
          } else {
            this.open = false;
          }
        } else {
          this.open = false;
        }
      }
    },
    changeCollapse() {
      if (this.disabled || this.collapse.disabled) {
        return false;
      }
      if (this.collapse.accordion) {
        if (this.collapse.modelValue == this.itemIndex) {
          this.collapse.$emit("update:modelValue", null);
        } else {
          this.collapse.$emit("update:modelValue", this.itemIndex);
        }
      } else {
        if (Dap.number.isNumber(this.collapse.modelValue)) {
          if (this.collapse.modelValue == this.itemIndex) {
            this.collapse.$emit("update:modelValue", []);
          } else {
            this.collapse.$emit("update:modelValue", [
              this.collapse.modelValue,
              this.itemIndex
            ]);
          }
        } else if (Array.isArray(this.collapse.modelValue)) {
          let arr = [...this.collapse.modelValue];
          if (arr.includes(this.itemIndex)) {
            arr = arr.filter((item) => {
              return item != this.itemIndex;
            });
            this.collapse.$emit("update:modelValue", arr);
          } else {
            arr.push(this.itemIndex);
            this.collapse.$emit("update:modelValue", arr);
          }
        } else {
          let arr = [];
          arr.push(this.itemIndex);
          this.collapse.$emit("update:modelValue", arr);
        }
      }
    }
  }
};
const _hoisted_1$l = ["textContent"];
function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Cell = resolveComponent("Cell");
  const _component_TransitionSlide = resolveComponent("TransitionSlide");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-collapse-item", $options.computedOutBorder ? "mvi-collapse-item-border" : ""])
  }, [
    createVNode(_component_Cell, {
      class: "mvi-collapse-cell",
      icon: $props.icon,
      content: $props.label,
      title: $props.title,
      border: $data.cellBorder,
      arrow: $options.arrow,
      "title-class": $props.titleClass,
      "content-class": $props.labelClass,
      onClick: $options.changeCollapse,
      active: $options.computedActive,
      "no-wrap": $options.computedNoWrap
    }, null, 8, ["icon", "content", "title", "border", "arrow", "title-class", "content-class", "onClick", "active", "no-wrap"]),
    createVNode(_component_TransitionSlide, {
      expand: $data.open,
      timeout: $options.computedTimeout,
      onBeforeSlideUp: $options.beforeSlideUp,
      onSlideUp: $options.slideUp,
      onBeforeSlideDown: $options.beforeSlideDown,
      onSlideDown: $options.slideDown
    }, {
      default: withCtx(() => [
        createElementVNode("div", {
          class: normalizeClass(["mvi-collapse-item-content", $props.contentClass || ""])
        }, [
          _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", {
            key: 1,
            textContent: toDisplayString($props.content)
          }, null, 8, _hoisted_1$l))
        ], 2)
      ]),
      _: 3
    }, 8, ["expand", "timeout", "onBeforeSlideUp", "onSlideUp", "onBeforeSlideDown", "onSlideDown"])
  ], 2);
}
const CollapseItem = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$z], ["__scopeId", "data-v-ab029b5e"]]);
CollapseItem.install = (app) => {
  app.component(CollapseItem.name, CollapseItem);
};
const divider_vue_vue_type_style_index_0_scoped_c7a55513_lang = "";
const _sfc_main$y = {
  name: "m-divider",
  props: {
    dashed: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    }
  }
};
const _hoisted_1$k = {
  key: 0,
  class: "mvi-divider-center"
};
function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-divider", $props.dashed ? "mvi-divider-dashed" : ""])
  }, [
    createElementVNode("div", {
      class: "mvi-divider-left",
      style: normalizeStyle({ borderColor: $props.color || "" })
    }, null, 4),
    this.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_1$k, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ])) : createCommentVNode("", true),
    createElementVNode("div", {
      class: "mvi-divider-right",
      style: normalizeStyle({ borderColor: $props.color || "" })
    }, null, 4)
  ], 2);
}
const Divider = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$y], ["__scopeId", "data-v-c7a55513"]]);
Divider.install = (app) => {
  app.component(Divider.name, Divider);
};
const roll_vue_vue_type_style_index_0_scoped_a00cda78_lang = "";
const _sfc_main$x = {
  name: "m-roll",
  data() {
    return {
      rollEl: null,
      timer: null,
      status: -1
    };
  },
  emits: ["play", "stop", "pause"],
  props: {
    interval: {
      type: Number,
      default: 5e3
    },
    direction: {
      type: String,
      default: "left",
      validator(value) {
        return ["left", "right", "top", "bottom"].includes(value);
      }
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    },
    animation: {
      type: String,
      default: "linear",
      validator(value) {
        return [
          "linear",
          "ease",
          "ease-in",
          "ease-out",
          "ease-in-out"
        ].includes(value);
      }
    },
    clickStop: {
      type: Boolean,
      default: false
    },
    hoverStop: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.rollEl = this.$refs.roll;
    if (this.autoplay) {
      this.play();
    }
  },
  computed: {
    rollStyle() {
      let obj = {};
      if (this.direction == "left") {
        obj.left = "100%";
        obj.right = "auto";
      } else if (this.direction == "right") {
        obj.right = "100%";
        obj.left = "auto";
      } else if (this.direction == "top") {
        obj.top = "100%";
        obj.bottom = "auto";
      } else if (this.direction == "bottom") {
        obj.bottom = "100%";
        obj.top = "auto";
      }
      return obj;
    },
    containerStyle() {
      let style = {};
      if (this.rollEl) {
        style.height = Dap.element.getCssStyle(this.rollEl, "height");
      }
      return style;
    }
  },
  methods: {
    hoverIn() {
      if (this.hoverStop) {
        if (this.status == 0) {
          this.pause();
        }
      }
    },
    hoverOut() {
      if (this.hoverStop) {
        if (this.status == 1) {
          this.play();
        }
      }
    },
    play() {
      if (!this.$refs.roll) {
        return;
      }
      if (this.status == 0) {
        return;
      }
      this.status = 0;
      let placement = Dap.element.getElementPoint(
        this.$refs.roll,
        this.$el
      );
      let interval = 0;
      if (this.direction == "left") {
        interval = Math.round(
          (placement.left + this.$refs.roll.offsetWidth) / (this.$el.offsetWidth + this.$refs.roll.offsetWidth) * this.interval
        );
      } else if (this.direction == "right") {
        interval = Math.round(
          (placement.right + this.$refs.roll.offsetWidth) / (this.$el.offsetWidth + this.$refs.roll.offsetWidth) * this.interval
        );
      } else if (this.direction == "top") {
        interval = Math.round(
          (placement.top + this.$refs.roll.offsetHeight) / (this.$el.offsetHeight + this.$refs.roll.offsetHeight) * this.interval
        );
      } else if (this.direction == "bottom") {
        interval = Math.round(
          (placement.bottom + this.$refs.roll.offsetHeight) / (this.$el.offsetHeight + this.$refs.roll.offsetHeight) * this.interval
        );
      }
      this.$refs.roll.style.transition = "all " + interval + "ms " + this.animation;
      this.$refs.roll.style.webkitTransition = "all " + interval + "ms " + this.animation;
      setTimeout(() => {
        if (!this.$refs.roll) {
          return;
        }
        if (this.direction == "left") {
          this.$refs.roll.style.left = -this.$refs.roll.offsetWidth + "px";
          this.$refs.roll.style.right = "auto";
        } else if (this.direction == "right") {
          this.$refs.roll.style.right = -this.$refs.roll.offsetWidth + "px";
          this.$refs.roll.style.left = "auto";
        } else if (this.direction == "top") {
          this.$refs.roll.style.top = -this.$refs.roll.offsetHeight + "px";
          this.$refs.roll.style.bottom = "auto";
        } else if (this.direction == "bottom") {
          this.$refs.roll.style.bottom = -this.$refs.roll.offsetHeight + "px";
          this.$refs.roll.style.top = "auto";
        }
        this.$emit("play");
        this.timer = setTimeout(() => {
          this.stop();
          if (this.loop) {
            this.play();
          }
        }, interval);
      }, 10);
    },
    stop() {
      if (this.status == 2) {
        return;
      }
      this.status = 2;
      this.$refs.roll.style.transition = "";
      this.$refs.roll.style.webkitTransition = "";
      if (this.direction == "left") {
        this.$refs.roll.style.left = "100%";
        this.$refs.roll.style.right = "auto";
      } else if (this.direction == "right") {
        this.$refs.roll.style.right = "100%";
        this.$refs.roll.style.left = "auto";
      } else if (this.direction == "top") {
        this.$refs.roll.style.top = "100%";
        this.$refs.roll.style.bottom = "auto";
      } else if (this.direction == "bottom") {
        this.$refs.roll.style.bottom = "100%";
        this.$refs.roll.style.top = "auto";
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.$emit("stop");
    },
    pause() {
      if (this.status != 0) {
        return;
      }
      this.status = 1;
      let placement = Dap.element.getElementPoint(
        this.$refs.roll,
        this.$el
      );
      this.$refs.roll.style.transition = "";
      this.$refs.roll.style.webkitTransition = "";
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      if (this.direction == "left") {
        this.$refs.roll.style.left = placement.left + "px";
        this.$refs.roll.style.right = "auto";
      } else if (this.direction == "right") {
        this.$refs.roll.style.right = placement.right + "px";
        this.$refs.roll.style.left = "auto";
      } else if (this.direction == "top") {
        this.$refs.roll.style.top = placement.top + "px";
        this.$refs.roll.style.bottom = "auto";
      } else if (this.direction == "bottom") {
        this.$refs.roll.style.bottom = placement.bottom + "px";
        this.$refs.roll.style.top = "auto";
      }
      this.$emit("pause");
    },
    clickStopFun() {
      if (this.clickStop) {
        if (this.status == 0) {
          this.pause();
        } else if (this.status == 1) {
          this.play();
        }
      }
    }
  },
  beforeUnmount() {
    this.stop();
  }
};
function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    onClick: _cache[0] || (_cache[0] = (...args) => $options.clickStopFun && $options.clickStopFun(...args)),
    onMouseenter: _cache[1] || (_cache[1] = (...args) => $options.hoverIn && $options.hoverIn(...args)),
    onMouseleave: _cache[2] || (_cache[2] = (...args) => $options.hoverOut && $options.hoverOut(...args)),
    class: "mvi-roll-container",
    style: normalizeStyle($options.containerStyle)
  }, [
    createElementVNode("div", {
      class: normalizeClass(["mvi-roll", $props.direction == "left" || $props.direction == "right" ? "mvi-roll-horizontal" : "mvi-roll-vertical"]),
      style: normalizeStyle($options.rollStyle),
      ref: "roll"
    }, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 6)
  ], 36);
}
const Roll = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$x], ["__scopeId", "data-v-a00cda78"]]);
Roll.install = (app) => {
  app.component(Roll.name, Roll);
};
const panel_vue_vue_type_style_index_0_scoped_274f3a70_lang = "";
const _sfc_main$w = {
  name: "m-panel",
  data() {
    return {
      expand: true,
      hasUp: false
    };
  },
  props: {
    title: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    footer: {
      type: String,
      default: null
    },
    titleClass: {
      type: String,
      default: null
    },
    contentClass: {
      type: String,
      default: null
    },
    footerClass: {
      type: String,
      default: null
    },
    collapseClick: {
      type: Boolean,
      default: false
    },
    inBorder: {
      type: Boolean,
      default: true
    },
    outBorder: {
      type: Boolean,
      default: true
    },
    radius: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    titleCls() {
      let cls = ["mvi-panel-header"];
      if (this.radius) {
        cls.push("mvi-panel-radius-top");
        if (!(this.$slots.default || this.content || this.$slots.footer || this.footer) || this.hasUp) {
          cls.push("mvi-panel-radius-bottom");
        }
      }
      if (this.titleClass) {
        cls.push(this.titleClass);
      }
      return cls;
    },
    contentCls() {
      let cls = ["mvi-panel-content"];
      if ((this.$slots.title || this.title) && this.inBorder) {
        cls.push("mvi-panel-border");
      }
      if (this.radius) {
        if (!(this.$slots.title || this.title)) {
          cls.push("mvi-panel-radius-top");
        }
        if (!(this.$slots.footer || this.footer)) {
          cls.push("mvi-panel-radius-bottom");
        }
      }
      if (this.contentClass) {
        cls.push(this.contentClass);
      }
      return cls;
    },
    footerCls() {
      let cls = ["mvi-panel-footer"];
      if ((this.$slots.default || this.content || this.$slots.title || this.title) && this.inBorder) {
        cls.push("mvi-panel-border");
      }
      if (this.radius) {
        cls.push("mvi-panel-radius-bottom");
        if (!(this.$slots.default || this.content || this.$slots.title || this.title)) {
          cls.push("mvi-panel-radius-top");
        }
      }
      if (this.footerClass) {
        cls.push(this.footerClass);
      }
      return cls;
    }
  },
  components: {
    TransitionSlide
  },
  methods: {
    titleClick() {
      if (this.collapseClick && (this.$slots.default || this.content || this.$slots.footer || this.footer)) {
        this.expand = !this.expand;
      }
    },
    beforeSlideDown() {
      this.hasUp = false;
    },
    slideUp() {
      this.hasUp = true;
    }
  }
};
const _hoisted_1$j = ["textContent"];
const _hoisted_2$j = ["textContent"];
const _hoisted_3$g = ["textContent"];
function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TransitionSlide = resolveComponent("TransitionSlide");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-panel", $props.outBorder ? "mvi-panel-border" : "", $props.radius ? "mvi-panel-radius-top mvi-panel-radius-bottom" : ""])
  }, [
    _ctx.$slots.title || $props.title ? (openBlock(), createElementBlock("div", {
      key: 0,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.titleClick && $options.titleClick(...args)),
      class: normalizeClass($options.titleCls)
    }, [
      _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", {
        key: 1,
        textContent: toDisplayString($props.title)
      }, null, 8, _hoisted_1$j))
    ], 2)) : createCommentVNode("", true),
    _ctx.$slots.default || $props.content || _ctx.$slots.footer || $props.footer ? (openBlock(), createBlock(_component_TransitionSlide, {
      key: 1,
      expand: $data.expand,
      onBeforeSlideDown: $options.beforeSlideDown,
      onSlideUp: $options.slideUp
    }, {
      default: withCtx(() => [
        _ctx.$slots.default || $props.content ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass($options.contentCls)
        }, [
          _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", {
            key: 1,
            textContent: toDisplayString($props.content)
          }, null, 8, _hoisted_2$j))
        ], 2)) : createCommentVNode("", true),
        _ctx.$slots.footer || $props.footer ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass($options.footerCls)
        }, [
          _ctx.$slots.footer ? renderSlot(_ctx.$slots, "footer", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", {
            key: 1,
            textContent: toDisplayString($props.footer)
          }, null, 8, _hoisted_3$g))
        ], 2)) : createCommentVNode("", true)
      ]),
      _: 3
    }, 8, ["expand", "onBeforeSlideDown", "onSlideUp"])) : createCommentVNode("", true)
  ], 2);
}
const Panel = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$w], ["__scopeId", "data-v-274f3a70"]]);
Panel.install = (app) => {
  app.component(Panel.name, Panel);
};
const steps_vue_vue_type_style_index_0_scoped_dd18a2f1_lang = "";
const _sfc_main$v = {
  name: "m-steps",
  data() {
    return {
      children: []
    };
  },
  props: {
    active: {
      type: Number,
      default: 0
    },
    vertical: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: null
    },
    inactiveColor: {
      type: String,
      default: null
    },
    activeIcon: {
      type: [String, Object],
      default: null
    },
    inactiveIcon: {
      type: [String, Object],
      default: null
    }
  },
  provide() {
    return {
      steps: this
    };
  },
  computed: {
    activeIconType() {
      let type = "success-o";
      if (Dap.common.isObject(this.activeIcon)) {
        if (typeof this.activeIcon.type == "string") {
          type = this.activeIcon.type;
        }
      } else if (typeof this.activeIcon == "string") {
        type = this.activeIcon;
      }
      return type;
    },
    activeIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.activeIcon)) {
        if (typeof this.activeIcon.url == "string") {
          url = this.activeIcon.url;
        }
      }
      return url;
    },
    activeIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.activeIcon)) {
        if (typeof this.activeIcon.spin == "boolean") {
          spin = this.activeIcon.spin;
        }
      }
      return spin;
    },
    activeIconSize() {
      let size = null;
      if (Dap.common.isObject(this.activeIcon)) {
        if (typeof this.activeIcon.size == "string") {
          size = this.activeIcon.size;
        }
      }
      return size;
    },
    activeIconColor() {
      let color = null;
      if (Dap.common.isObject(this.activeIcon)) {
        if (typeof this.activeIcon.color == "string") {
          color = this.activeIcon.color;
        }
      }
      return color;
    },
    inactiveIconType() {
      let type = null;
      if (Dap.common.isObject(this.inactiveIcon)) {
        if (typeof this.inactiveIcon.type == "string") {
          type = this.inactiveIcon.type;
        }
      } else if (typeof this.inactiveIcon == "string") {
        type = this.inactiveIcon;
      }
      return type;
    },
    inactiveIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.inactiveIcon)) {
        if (typeof this.inactiveIcon.url == "string") {
          url = this.inactiveIcon.url;
        }
      }
      return url;
    },
    inactiveIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.inactiveIcon)) {
        if (typeof this.inactiveIcon.spin == "boolean") {
          spin = this.inactiveIcon.spin;
        }
      }
      return spin;
    },
    inactiveIconSize() {
      let size = null;
      if (Dap.common.isObject(this.inactiveIcon)) {
        if (typeof this.inactiveIcon.size == "string") {
          size = this.inactiveIcon.size;
        }
      }
      return size;
    },
    inactiveIconColor() {
      let color = null;
      if (Dap.common.isObject(this.inactiveIcon)) {
        if (typeof this.inactiveIcon.color == "string") {
          color = this.inactiveIcon.color;
        }
      }
      return color;
    }
  }
};
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-steps", $props.vertical ? "mvi-steps-vertical" : ""])
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
const Steps = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$v], ["__scopeId", "data-v-dd18a2f1"]]);
Steps.install = (app) => {
  app.component(Steps.name, Steps);
};
const step_vue_vue_type_style_index_0_scoped_bcbac056_lang = "";
const _sfc_main$u = {
  name: "m-step",
  data() {
    return {
      elm: null
    };
  },
  setup() {
    const uid = getCurrentInstance().uid;
    return {
      uid
    };
  },
  inject: ["steps"],
  created() {
    this.steps.children.push(this);
  },
  mounted() {
    this.elm = this.$el;
  },
  computed: {
    stepIndex() {
      return this.steps.children.findIndex((vm) => {
        return Dap.common.equal(vm.uid, this.uid);
      });
    },
    labelStyle() {
      let style = {};
      if (this.steps.activeColor) {
        if (this.steps.active == this.stepIndex) {
          style.color = this.steps.activeColor;
        }
      }
      if (this.steps.inactiveColor) {
        if (this.steps.active != this.stepIndex) {
          style.color = this.steps.inactiveColor;
        }
      }
      return style;
    },
    activeIconStyle() {
      let style = {};
      if (this.steps.activeColor) {
        if (this.steps.active == this.stepIndex) {
          style.color = this.steps.activeColor;
        }
      }
      return style;
    },
    inactiveIconStyle() {
      let style = {};
      if (this.steps.inactiveColor) {
        if (this.stepIndex > this.steps.active) {
          style.color = this.steps.inactiveColor;
        }
      }
      if (this.steps.activeColor) {
        if (this.stepIndex <= this.steps.active) {
          style.color = this.steps.activeColor;
        }
      }
      return style;
    },
    circleStyle() {
      let style = {};
      if (this.stepIndex <= this.steps.active) {
        if (this.steps.activeColor) {
          style.backgroundColor = this.steps.activeColor;
        }
      } else {
        if (this.steps.inactiveColor) {
          style.backgroundColor = this.steps.inactiveColor;
        }
      }
      return style;
    },
    activeCircleStyle() {
      let style = {};
      if (this.steps.activeColor) {
        if (this.steps.active == this.stepIndex) {
          style.backgroundColor = this.steps.activeColor;
        }
      }
      return style;
    },
    lineStyle() {
      let style = {};
      if (this.steps.activeColor) {
        if (this.stepIndex < this.steps.active) {
          if (this.steps.vertical) {
            style.borderRightColor = this.steps.activeColor;
          } else {
            style.borderTopColor = this.steps.activeColor;
          }
        }
      }
      if (this.steps.inactiveColor) {
        if (this.stepIndex >= this.steps.active) {
          if (this.steps.vertical) {
            style.borderRightColor = this.steps.inactiveColor;
          } else {
            style.borderTopColor = this.steps.inactiveColor;
          }
        }
      }
      return style;
    },
    stepIconStyle() {
      let style = {};
      if (this.elm) {
        style.backgroundColor = Dap.element.getCssStyle(
          this.steps.$el,
          "background-color"
        );
      }
      return style;
    }
  },
  components: {
    Icon
  }
};
const _hoisted_1$i = {
  key: 0,
  class: "mvi-step-vertical"
};
const _hoisted_2$i = { class: "mvi-step-vertical-container" };
const _hoisted_3$f = { class: "mvi-step-vertical-icon" };
const _hoisted_4$b = { class: "mvi-step-container" };
function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return $options.steps.vertical ? (openBlock(), createElementBlock("div", _hoisted_1$i, [
    createElementVNode("div", {
      class: normalizeClass(["mvi-step-vertical-label", $options.stepIndex == $options.steps.active ? "mvi-step-label-finish" : ""]),
      style: normalizeStyle($options.labelStyle)
    }, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 6),
    createElementVNode("div", _hoisted_2$i, [
      createElementVNode("div", _hoisted_3$f, [
        $options.steps.active == $options.stepIndex && $options.steps.activeIcon ? (openBlock(), createBlock(_component_Icon, {
          key: 0,
          class: "mvi-step-icon-active-el",
          type: $options.steps.activeIconType,
          url: $options.steps.activeIconUrl,
          spin: $options.steps.activeIconSpin,
          size: $options.steps.activeIconSize,
          color: $options.steps.activeIconColor,
          style: normalizeStyle($options.activeIconStyle)
        }, null, 8, ["type", "url", "spin", "size", "color", "style"])) : $options.steps.active == $options.stepIndex ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "mvi-step-circle-active",
          style: normalizeStyle($options.activeCircleStyle)
        }, null, 4)) : $options.steps.inactiveIcon ? (openBlock(), createBlock(_component_Icon, {
          key: 2,
          class: normalizeClass(["mvi-step-icon-inactive-el", $options.stepIndex <= $options.steps.active ? "mvi-step-icon-inactive-finish" : ""]),
          type: $options.steps.inactiveIconType,
          url: $options.steps.inactiveIconUrl,
          spin: $options.steps.inactiveIconSpin,
          style: normalizeStyle($options.inactiveIconStyle),
          size: $options.steps.inactiveIconSize,
          color: $options.steps.inactiveIconColor
        }, null, 8, ["class", "type", "url", "spin", "style", "size", "color"])) : (openBlock(), createElementBlock("div", {
          key: 3,
          class: normalizeClass(["mvi-step-circle", $options.stepIndex <= $options.steps.active ? "mvi-step-circle-finish" : ""]),
          style: normalizeStyle($options.circleStyle)
        }, null, 6))
      ]),
      createElementVNode("div", {
        class: normalizeClass(["mvi-step-vertical-line", $options.stepIndex == $options.steps.children.length - 1 ? "mvi-step-line-last" : "", $options.stepIndex < $options.steps.active ? "mvi-step-line-finish" : ""]),
        style: normalizeStyle($options.lineStyle)
      }, null, 6)
    ])
  ])) : (openBlock(), createElementBlock("div", {
    key: 1,
    class: normalizeClass(["mvi-step", $options.stepIndex == $options.steps.children.length - 1 ? "mvi-step-last" : ""])
  }, [
    createElementVNode("div", {
      class: normalizeClass(["mvi-step-label", $options.stepIndex == $options.steps.children.length - 1 ? "mvi-step-label-last" : "", $options.stepIndex == 0 ? "mvi-step-label-first" : "", $options.stepIndex == $options.steps.active ? "mvi-step-label-finish" : ""]),
      style: normalizeStyle($options.labelStyle)
    }, [
      createElementVNode("div", null, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ], 6),
    createElementVNode("div", _hoisted_4$b, [
      createElementVNode("div", {
        class: normalizeClass(["mvi-step-icon", $options.stepIndex == $options.steps.children.length - 1 ? "mvi-step-icon-last" : ""]),
        style: normalizeStyle($options.stepIconStyle)
      }, [
        $options.steps.active == $options.stepIndex && $options.steps.activeIcon ? (openBlock(), createBlock(_component_Icon, {
          key: 0,
          class: "mvi-step-icon-active-el",
          type: $options.steps.activeIconType,
          url: $options.steps.activeIconUrl,
          spin: $options.steps.activeIconSpin,
          size: $options.steps.activeIconSize,
          color: $options.steps.activeIconColor,
          style: normalizeStyle($options.activeIconStyle)
        }, null, 8, ["type", "url", "spin", "size", "color", "style"])) : $options.steps.active == $options.stepIndex ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "mvi-step-circle-active",
          style: normalizeStyle($options.activeCircleStyle)
        }, null, 4)) : $options.steps.inactiveIcon ? (openBlock(), createBlock(_component_Icon, {
          key: 2,
          class: normalizeClass(["mvi-step-icon-inactive-el", $options.stepIndex <= $options.steps.active ? "mvi-step-icon-inactive-finish" : ""]),
          type: $options.steps.inactiveIconType,
          url: $options.steps.inactiveIconUrl,
          spin: $options.steps.inactiveIconSpin,
          style: normalizeStyle($options.inactiveIconStyle),
          size: $options.steps.inactiveIconSize,
          color: $options.steps.inactiveIconColor
        }, null, 8, ["class", "type", "url", "spin", "style", "size", "color"])) : (openBlock(), createElementBlock("div", {
          key: 3,
          class: normalizeClass(["mvi-step-circle", $options.stepIndex <= $options.steps.active ? "mvi-step-circle-finish" : ""]),
          style: normalizeStyle($options.circleStyle)
        }, null, 6))
      ], 6),
      createElementVNode("div", {
        class: normalizeClass(["mvi-step-line", $options.stepIndex == $options.steps.children.length - 1 ? "mvi-step-line-last" : "", $options.stepIndex < $options.steps.active ? "mvi-step-line-finish" : ""]),
        style: normalizeStyle($options.lineStyle)
      }, null, 6)
    ])
  ], 2));
}
const Step = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$u], ["__scopeId", "data-v-bcbac056"]]);
Step.install = (app) => {
  app.component(Step.name, Step);
};
const label_vue_vue_type_style_index_0_scoped_dde11085_lang = "";
const _sfc_main$t = {
  name: "m-label",
  data() {
    return {
      show: true
    };
  },
  props: {
    type: {
      type: String,
      default: "default",
      validator(value) {
        return [
          "default",
          "error",
          "info",
          "primary",
          "success",
          "warn"
        ].includes(value);
      }
    },
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return ["medium", "large"].includes(value);
      }
    },
    color: {
      type: String,
      default: null
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    mark: {
      type: Boolean,
      default: false
    },
    subColor: {
      type: String,
      default: null
    },
    closable: {
      type: Boolean,
      default: false
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    labelClass() {
      let cls = ["mvi-label"];
      if (this.size) {
        cls.push("mvi-label-" + this.size);
      }
      if (this.type) {
        cls.push("mvi-label-" + this.type);
      }
      if (this.plain) {
        cls.push("mvi-label-plain");
      }
      if (this.round) {
        cls.push("mvi-label-round");
      }
      if (this.mark) {
        cls.push("mvi-label-mark");
        if (this.reverse) {
          cls.push("mvi-label-reverse");
        }
      }
      return cls;
    },
    labelStyle() {
      let style = {};
      if (this.color) {
        if (this.plain) {
          style.borderColor = this.color;
          style.color = this.color;
          style.backgroundColor = this.subColor || "#fff";
        } else {
          style.backgroundColor = this.color;
          style.borderColor = this.color;
          style.color = this.subColor || "#fff";
        }
      }
      return style;
    }
  },
  components: {
    Icon
  },
  methods: {
    closeLabel() {
      this.show = false;
    }
  }
};
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return $props.closable ? (openBlock(), createBlock(Transition, {
    key: 0,
    name: "mvi-label"
  }, {
    default: withCtx(() => [
      $data.show ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass($options.labelClass),
        style: normalizeStyle($options.labelStyle)
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true),
        createElementVNode("span", {
          class: "mvi-label-closable",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.closeLabel && $options.closeLabel(...args))
        }, [
          createVNode(_component_Icon, { type: "times" })
        ])
      ], 6)) : createCommentVNode("", true)
    ]),
    _: 3
  })) : (openBlock(), createElementBlock("div", {
    key: 1,
    class: normalizeClass($options.labelClass),
    style: normalizeStyle($options.labelStyle)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 6));
}
const Label = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$t], ["__scopeId", "data-v-dde11085"]]);
Label.install = (app) => {
  app.component(Label.name, Label);
};
const swiper_vue_vue_type_style_index_0_scoped_60b06301_lang = "";
const _sfc_main$s = {
  name: "m-swiper",
  data() {
    return {
      elm: null,
      sizeCounts: 0,
      children: [],
      start: 0,
      initStart: 0,
      transform: 0,
      timer: null,
      totalMove: 0,
      oldIndex: -1,
      amounts: 0,
      mouseDown: false,
      fadeActiveIndex: 0,
      useOpacity: true,
      apiDoSlide: false
    };
  },
  props: {
    autoplay: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 500
    },
    interval: {
      type: Number,
      default: 5e3
    },
    initialSlide: {
      type: Number,
      default: 0
    },
    width: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: null
    },
    loop: {
      type: Boolean,
      default: false
    },
    showIndicators: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: null
    },
    inactiveColor: {
      type: String,
      default: null
    },
    vertical: {
      type: Boolean,
      default: false
    },
    touchable: {
      type: Boolean,
      default: true
    },
    showControl: {
      type: Boolean,
      default: false
    },
    controlClass: {
      type: String,
      default: null
    },
    fade: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      swiper: this
    };
  },
  emits: ["before-change", "change"],
  computed: {
    indicatorStyle() {
      return (index) => {
        let style = {};
        if (this.isIndicatorActive(index)) {
          if (this.activeColor) {
            style.backgroundColor = this.activeColor;
          }
        } else {
          if (this.inactiveColor) {
            style.backgroundColor = this.inactiveColor;
          }
        }
        return style;
      };
    },
    wrapperStyle() {
      let style = {};
      if (this.vertical) {
        style.height = "calc(100% * " + this.children.length + ")";
        style.transform = "translateY(" + this.transform + "px)";
        style.webkitTransform = "translateY(" + this.transform + "px)";
      } else {
        style.width = "calc(100% * " + this.children.length + ")";
        style.transform = "translateX(" + this.transform + "px)";
        style.webkitTransform = "translateX(" + this.transform + "px)";
      }
      return style;
    },
    containerStyle() {
      let style = {};
      if (this.width) {
        style.width = this.width;
      }
      if (this.height) {
        style.height = this.height;
      }
      return style;
    },
    slideSize() {
      this.sizeCounts;
      let width = 0;
      if (this.vertical) {
        if (this.height) {
          if (this.height.includes("rem")) {
            width = Dap.element.rem2px(parseFloat(this.height));
          } else if (this.height.includes("px")) {
            width = parseFloat(this.height);
          } else if (this.elm) {
            width = parseFloat(
              Dap.element.getCssStyle(this.elm, "height")
            );
          }
        } else if (this.elm) {
          width = parseFloat(
            Dap.element.getCssStyle(this.elm, "height")
          );
        }
      } else {
        if (this.width) {
          if (this.width.includes("rem")) {
            width = Dap.element.rem2px(parseFloat(this.width));
          } else if (this.width.includes("px")) {
            width = parseFloat(this.width);
          } else if (this.elm) {
            width = parseFloat(
              Dap.element.getCssStyle(this.elm, "width")
            );
          }
        } else if (this.elm) {
          width = parseFloat(
            Dap.element.getCssStyle(this.elm, "width")
          );
        }
      }
      return Number(width.toFixed(2));
    },
    activeIndex() {
      let index = 0;
      if (this.totalMove <= 0) {
        index = this.mathNext(
          Math.abs(Dap.number.divide(this.transform, this.slideSize))
        );
      } else {
        index = this.mathPrev(
          Math.abs(Dap.number.divide(this.transform, this.slideSize))
        );
      }
      if (index > this.children.length - 1) {
        index = this.children.length - 1;
      } else if (index < 0) {
        index = 0;
      }
      return index;
    },
    indicatorsIndex() {
      let index = 0;
      if (this.fade) {
        index = this.fadeActiveIndex;
      } else {
        if (this.loop) {
          if (this.activeIndex == this.children.length - 1) {
            index = 0;
          } else if (this.activeIndex == 0) {
            index = this.children.length - 3;
          } else {
            index = this.activeIndex - 1;
          }
        } else {
          index = this.activeIndex;
        }
      }
      return index;
    },
    computedInitalSlide() {
      if (this.loop) {
        if (this.initialSlide < this.children.length - 2) {
          return this.initialSlide + 1;
        } else {
          return 1;
        }
      } else {
        return this.initialSlide;
      }
    },
    controlStyle() {
      return (index) => {
        let style = {};
        if (index == 0) {
          style.left = "0";
          style.right = "auto";
        } else {
          style.left = "auto";
          style.right = "0";
        }
        return style;
      };
    },
    controlsClass() {
      let cls = ["mvi-swiper-control"];
      if (this.controlClass) {
        cls.push(this.controlClass);
      }
      return cls;
    },
    indicatorShow() {
      return (index) => {
        if (this.fade) {
          return true;
        } else {
          return this.loop ? index != 0 && index != this.children.length - 1 : true;
        }
      };
    },
    indicatorsTotal() {
      if (this.fade) {
        return this.children.length;
      } else {
        if (this.loop) {
          return this.children.length - 2 > 0 ? this.children.length - 2 : 0;
        } else {
          return this.children.length;
        }
      }
    },
    isIndicatorActive() {
      return (index) => {
        if (this.fade) {
          return this.indicatorsIndex == index;
        } else {
          if (this.loop) {
            return this.indicatorsIndex + 1 == index;
          } else {
            return this.indicatorsIndex == index;
          }
        }
      };
    }
  },
  components: {
    Icon
  },
  watch: {
    autoplay(newValue, oldValue) {
      this.setAutoplay();
    },
    initialSlide(newValue, oldValue) {
      if (this.fade) {
        this.useOpacity = false;
        this.fadeActiveIndex = newValue;
      } else {
        this.setDefaultSlide();
      }
    }
  },
  created() {
    if (this.fade) {
      this.fadeActiveIndex = this.initialSlide;
    }
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  mounted() {
    this.elm = this.$el;
    if (this.children.length == 0) {
      return;
    }
    if (this.fade) {
      this.setAutoplay();
    } else {
      if (this.loop && this.children.length > 0) {
        let copy_first = this.children[0].$el.cloneNode(true);
        let copy_last = this.children[this.children.length - 1].$el.cloneNode(true);
        this.$refs.wrapper.append(copy_first);
        this.$refs.wrapper.prepend(copy_last);
        this.children.unshift({
          $el: copy_last
        });
        this.children.push({
          $el: copy_first
        });
      }
      this.setDefaultSlide();
      Dap.event.on(
        document.documentElement,
        `mousemove.swiper_${this.uid}`,
        this.swiperMouseMove
      );
      Dap.event.on(
        document.documentElement,
        `mouseup.swiper_${this.uid}`,
        this.swiperMouseUp
      );
    }
    Dap.event.on(window, `resize.swiper_${this.uid}`, this.resizeChange);
  },
  methods: {
    resizeChange() {
      this.sizeCounts++;
      this.transform = -Dap.number.mutiply(
        this.activeIndex,
        this.slideSize
      );
    },
    setAutoplay() {
      if (this.children.length == 0) {
        return;
      }
      if (this.autoplay && !this.timer && this.interval > this.speed) {
        this.timer = setInterval(() => {
          this.slideNext();
        }, this.interval);
      } else {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    },
    swiperTouchStart(event2) {
      if (this.children.length == 0) {
        return;
      }
      if (!this.touchable) {
        return;
      }
      if (this.apiDoSlide) {
        return;
      }
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.amounts = 0;
      this.totalMove = 0;
      if (this.vertical) {
        this.start = event2.targetTouches[0].pageY;
      } else {
        this.start = event2.targetTouches[0].pageX;
      }
      this.initStart = this.start;
      this.removeTransition();
    },
    swiperTouchMove(event2) {
      if (this.children.length == 0) {
        return;
      }
      if (!this.touchable) {
        return;
      }
      if (event2.cancelable) {
        event2.preventDefault();
      }
      let end = 0;
      if (this.vertical) {
        end = event2.targetTouches[0].pageY;
      } else {
        end = event2.targetTouches[0].pageX;
      }
      let move = end - this.start;
      this.totalMove = end - this.initStart;
      if (this.totalMove > 0) {
        if (this.transform >= 0) {
          this.amounts++;
          this.transform = Dap.number.add(
            this.transform,
            Dap.number.divide(move, this.amounts)
          );
          this.start = end;
          return;
        }
      } else {
        if (this.transform <= -Dap.number.mutiply(
          this.children.length - 1,
          this.slideSize
        )) {
          this.amounts++;
          this.transform = Dap.number.add(
            this.transform,
            Dap.number.divide(move, this.amounts)
          );
          this.start = end;
          return;
        }
      }
      this.start = end;
      this.transform = Dap.number.add(this.transform, move);
    },
    swiperTouchEnd(event2) {
      if (this.children.length == 0) {
        return;
      }
      if (!this.touchable) {
        return;
      }
      this.addTransition().then(() => {
        this.transform = -Dap.number.mutiply(
          this.activeIndex,
          this.slideSize
        );
        setTimeout(() => {
          this.slideDone();
        }, this.speed);
      });
    },
    swiperMouseDown(event2) {
      if (this.children.length == 0) {
        return;
      }
      if (!this.touchable) {
        return;
      }
      if (this.apiDoSlide) {
        return;
      }
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.mouseDown = true;
      this.amounts = 0;
      this.totalMove = 0;
      if (this.vertical) {
        this.start = event2.pageY;
      } else {
        this.start = event2.pageX;
      }
      this.initStart = this.start;
      this.removeTransition();
    },
    swiperMouseMove(event2) {
      if (this.children.length == 0) {
        return;
      }
      if (!this.touchable) {
        return;
      }
      if (!this.mouseDown) {
        return;
      }
      if (event2.cancelable) {
        event2.preventDefault();
      }
      let end = 0;
      if (this.vertical) {
        end = event2.pageY;
      } else {
        end = event2.pageX;
      }
      let move = end - this.start;
      this.totalMove = end - this.initStart;
      if (this.totalMove > 0) {
        if (this.transform >= 0) {
          this.amounts++;
          this.transform = Dap.number.add(
            this.transform,
            Dap.number.divide(move, this.amounts)
          );
          this.start = end;
          return;
        }
      } else {
        if (this.transform <= -Dap.number.mutiply(
          this.children.length - 1,
          this.slideSize
        )) {
          this.amounts++;
          this.transform = Dap.number.add(
            this.transform,
            Dap.number.divide(move, this.amounts)
          );
          this.start = end;
          return;
        }
      }
      this.start = end;
      this.transform = Dap.number.add(this.transform, move);
    },
    swiperMouseUp(event2) {
      if (this.children.length == 0) {
        return;
      }
      if (!this.touchable) {
        return;
      }
      if (!this.mouseDown) {
        return;
      }
      this.mouseDown = false;
      this.addTransition().then(() => {
        this.transform = -Dap.number.mutiply(
          this.activeIndex,
          this.slideSize
        );
        setTimeout(() => {
          this.slideDone();
        }, this.speed);
      });
    },
    setDefaultSlide() {
      if (this.children.length == 0) {
        return;
      }
      if (!this.fade) {
        if (!this.$refs.wrapper) {
          return;
        }
        this.removeTransition().then(() => {
          this.transform = -Dap.number.mutiply(
            this.computedInitalSlide,
            this.slideSize
          );
          this.$nextTick(() => {
            setTimeout(() => {
              if (!this.$refs.wrapper) {
                return;
              }
              this.addTransition().then(() => {
                this.oldIndex = this.initialSlide;
                this.setAutoplay();
              });
            }, 50);
          });
        });
      }
    },
    addTransition() {
      return new Promise((resolve, reject) => {
        this.$refs.wrapper.style.transition = "transform " + this.speed + "ms";
        this.$refs.wrapper.style.webkitTransition = "transform " + this.speed + "ms";
        setTimeout(() => {
          resolve();
        }, 10);
      });
    },
    removeTransition() {
      return new Promise((resolve, reject) => {
        this.$refs.wrapper.style.transition = "";
        this.$refs.wrapper.style.webkitTransition = "";
        setTimeout(() => {
          resolve();
        }, 10);
      });
    },
    slideDone() {
      return new Promise((resolve, reject) => {
        if (this.loop) {
          if (this.transform == -Dap.number.mutiply(
            this.children.length - 1,
            this.slideSize
          )) {
            this.removeTransition().then(() => {
              this.transform = -this.slideSize;
              this.$nextTick(() => {
                setTimeout(() => {
                  this.addTransition().then(() => {
                    if (this.indicatorsIndex != this.oldIndex) {
                      this.oldIndex = this.indicatorsIndex;
                      this.$emit(
                        "change",
                        this.indicatorsIndex
                      );
                    }
                    this.setAutoplay();
                    resolve();
                  });
                }, 50);
              });
            });
          } else if (this.transform == 0) {
            this.removeTransition().then(() => {
              this.transform = -Dap.number.mutiply(
                this.children.length - 2,
                this.slideSize
              );
              this.$nextTick(() => {
                setTimeout(() => {
                  this.addTransition().then(() => {
                    if (this.indicatorsIndex != this.oldIndex) {
                      this.oldIndex = this.indicatorsIndex;
                      this.$emit(
                        "change",
                        this.indicatorsIndex
                      );
                    }
                    this.setAutoplay();
                    resolve();
                  });
                }, 50);
              });
            });
          } else {
            if (this.indicatorsIndex != this.oldIndex) {
              this.oldIndex = this.indicatorsIndex;
              this.$emit("change", this.indicatorsIndex);
            }
            this.setAutoplay();
            resolve();
          }
        } else {
          if (this.indicatorsIndex != this.oldIndex) {
            this.oldIndex = this.indicatorsIndex;
            this.$emit("change", this.indicatorsIndex);
          }
          this.setAutoplay();
          resolve();
        }
      });
    },
    slideNext() {
      return new Promise((resolve, reject) => {
        if (this.children.length == 0) {
          resolve();
          return;
        }
        if (this.fade) {
          if (this.loop) {
            this.$emit("before-change", this.fadeActiveIndex);
            if (this.fadeActiveIndex == this.children.length - 1) {
              this.fadeActiveIndex = 0;
            } else {
              this.fadeActiveIndex++;
            }
            if (this.timer) {
              clearInterval(this.timer);
              this.timer = null;
            }
            setTimeout(() => {
              this.$emit("change", this.fadeActiveIndex);
              this.setAutoplay();
              resolve();
            }, this.speed);
          } else {
            if (this.fadeActiveIndex != this.children.length - 1) {
              this.$emit("before-change", this.fadeActiveIndex);
              this.fadeActiveIndex++;
              if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
              }
              setTimeout(() => {
                this.$emit("change", this.fadeActiveIndex);
                this.setAutoplay();
                resolve();
              }, this.speed);
            } else {
              resolve();
            }
          }
        } else {
          if (this.transform <= -Dap.number.mutiply(
            this.children.length - 1,
            this.slideSize
          )) {
            resolve();
            return;
          }
          this.apiDoSlide = true;
          this.$emit("before-change", this.oldIndex);
          if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
          }
          this.addTransition().then(() => {
            this.transform = Dap.number.subtract(
              this.transform,
              this.slideSize
            );
            setTimeout(() => {
              this.slideDone().then(() => {
                this.apiDoSlide = false;
                resolve();
              });
            }, this.speed);
          });
        }
      });
    },
    slidePrev() {
      return new Promise((resolve, reject) => {
        if (this.children.length == 0) {
          resolve();
          return;
        }
        if (this.fade) {
          if (this.loop) {
            this.$emit("before-change", this.fadeActiveIndex);
            if (this.fadeActiveIndex == 0) {
              this.fadeActiveIndex = this.children.length - 1;
            } else {
              this.fadeActiveIndex--;
            }
            if (this.timer) {
              clearInterval(this.timer);
              this.timer = null;
            }
            setTimeout(() => {
              this.$emit("change", this.fadeActiveIndex);
              this.setAutoplay();
              resolve();
            }, this.speed);
          } else {
            if (this.fadeActiveIndex != 0) {
              this.$emit("before-change", this.fadeActiveIndex);
              this.fadeActiveIndex--;
              if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
              }
              setTimeout(() => {
                this.$emit("change", this.fadeActiveIndex);
                this.setAutoplay();
                resolve();
              }, this.speed);
            } else {
              resolve();
            }
          }
        } else {
          if (this.transform >= 0) {
            resolve();
            return;
          }
          this.apiDoSlide = true;
          this.$emit("before-change", this.oldIndex);
          if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
          }
          this.addTransition().then(() => {
            this.transform = Dap.number.add(
              this.transform,
              this.slideSize
            );
            setTimeout(() => {
              this.slideDone().then(() => {
                this.apiDoSlide = false;
                resolve();
              });
            }, this.speed);
          });
        }
      });
    },
    mathNext(number) {
      const num = Math.floor(number);
      const floor = Dap.number.subtract(number, num);
      if (floor >= 0.25) {
        return num + 1;
      } else {
        return num;
      }
    },
    mathPrev(number) {
      const num = Math.floor(number);
      const floor = Dap.number.subtract(number, num);
      if (floor <= 0.75) {
        return num;
      } else {
        return num + 1;
      }
    },
    slideTo(index) {
      return new Promise((resolve, reject) => {
        if (this.children.length == 0) {
          resolve();
          return;
        }
        if (this.fade) {
          if (index > this.children.length - 1) {
            index = this.children.length - 1;
          } else if (index < 0) {
            index = 0;
          }
          if (this.fadeActiveIndex != index) {
            this.$emit("before-change", this.fadeActiveIndex);
            this.fadeActiveIndex = index;
            if (this.timer) {
              clearInterval(this.timer);
              this.timer = null;
            }
            setTimeout(() => {
              this.$emit("change", this.fadeActiveIndex);
              this.setAutoplay();
              resolve();
            }, this.speed);
          } else {
            resolve();
          }
        } else {
          if (this.oldIndex > index) {
            if (this.transform >= 0) {
              resolve();
              return;
            }
            this.apiDoSlide = true;
            this.$emit("before-change", this.oldIndex);
            if (this.timer) {
              clearInterval(this.timer);
              this.timer = null;
            }
            this.addTransition().then(() => {
              this.transform = Dap.number.add(
                this.transform,
                Dap.number.mutiply(
                  this.oldIndex - index,
                  this.slideSize
                )
              );
              setTimeout(() => {
                this.slideDone().then(() => {
                  this.apiDoSlide = false;
                  resolve();
                });
              }, this.speed);
            });
          } else {
            if (this.transform <= -Dap.number.mutiply(
              this.children.length - 1,
              this.slideSize
            )) {
              resolve();
              return;
            }
            this.apiDoSlide = true;
            this.$emit("before-change", this.oldIndex);
            if (this.timer) {
              clearInterval(this.timer);
              this.timer = null;
            }
            this.addTransition().then(() => {
              this.transform = Dap.number.subtract(
                this.transform,
                Dap.number.mutiply(
                  index - this.oldIndex,
                  this.slideSize
                )
              );
              setTimeout(() => {
                this.slideDone().then(() => {
                  this.apiDoSlide = false;
                  resolve();
                });
              }, this.speed);
            });
          }
        }
      });
    }
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (!this.fade) {
      Dap.event.off(
        document.documentElement,
        `mousemove.swiper_${this.uid} mouseup.swiper_${this.uid}`
      );
    }
    Dap.event.off(window, `resize.swiper_${this.uid}`);
  }
};
const _hoisted_1$h = {
  key: 0,
  class: "mvi-swiper-fade"
};
const _hoisted_2$h = {
  key: 3,
  class: "mvi-swiper-indicators"
};
const _hoisted_3$e = ["onClick"];
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-swiper-container", $props.vertical ? "mvi-swiper-vertical" : ""]),
    style: normalizeStyle($options.containerStyle)
  }, [
    $props.fade ? (openBlock(), createElementBlock("div", _hoisted_1$h, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ])) : (openBlock(), createElementBlock("div", {
      key: 1,
      class: "mvi-swiper-wrapper",
      ref: "wrapper",
      style: normalizeStyle($options.wrapperStyle),
      onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.swiperTouchStart && $options.swiperTouchStart(...args)),
      onTouchmove: _cache[1] || (_cache[1] = (...args) => $options.swiperTouchMove && $options.swiperTouchMove(...args)),
      onTouchend: _cache[2] || (_cache[2] = (...args) => $options.swiperTouchEnd && $options.swiperTouchEnd(...args)),
      onMousedown: _cache[3] || (_cache[3] = (...args) => $options.swiperMouseDown && $options.swiperMouseDown(...args))
    }, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 36)),
    _ctx.$slots.indicators ? renderSlot(_ctx.$slots, "indicators", {
      key: 2,
      active: $options.indicatorsIndex,
      total: $options.indicatorsTotal
    }, void 0, true) : $props.showIndicators ? (openBlock(), createElementBlock("div", _hoisted_2$h, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.children, (item, index) => {
        return openBlock(), createElementBlock(Fragment, null, [
          $options.indicatorShow(index) ? (openBlock(), createElementBlock("div", {
            class: normalizeClass(["mvi-swiper-indicator", $options.isIndicatorActive(index) ? "mvi-swiper-indicator-active" : ""]),
            style: normalizeStyle($options.indicatorStyle(index)),
            key: "indicator-" + index,
            onClick: ($event) => $options.slideTo($props.fade ? index : $props.loop ? index - 1 : index)
          }, null, 14, _hoisted_3$e)) : createCommentVNode("", true)
        ], 64);
      }), 256))
    ])) : createCommentVNode("", true),
    $props.showControl ? (openBlock(), createElementBlock("div", {
      key: 4,
      class: normalizeClass($options.controlsClass),
      style: normalizeStyle($options.controlStyle(0)),
      onClick: _cache[4] || (_cache[4] = (...args) => $options.slidePrev && $options.slidePrev(...args))
    }, [
      createVNode(_component_Icon, { type: "angle-left" })
    ], 6)) : createCommentVNode("", true),
    $props.showControl ? (openBlock(), createElementBlock("div", {
      key: 5,
      class: normalizeClass($options.controlsClass),
      style: normalizeStyle($options.controlStyle(1)),
      onClick: _cache[5] || (_cache[5] = (...args) => $options.slideNext && $options.slideNext(...args))
    }, [
      createVNode(_component_Icon, { type: "angle-right" })
    ], 6)) : createCommentVNode("", true)
  ], 6);
}
const Swiper = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$s], ["__scopeId", "data-v-60b06301"]]);
Swiper.install = (app) => {
  app.component(Swiper.name, Swiper);
};
const swiperSlide_vue_vue_type_style_index_0_scoped_b5bb392c_lang = "";
const _sfc_main$r = {
  name: "m-swiper-slide",
  setup() {
    const uid = getCurrentInstance().uid;
    return {
      uid
    };
  },
  inject: ["swiper"],
  created() {
    this.swiper.children.push(this);
  },
  computed: {
    slideStyle() {
      let style = {};
      if (this.swiper.vertical) {
        style.width = "100%";
        style.height = this.swiper.fade ? "100%" : "calc(100% * " + 1 / this.swiper.children.length + ")";
      } else {
        style.height = "100%";
        style.width = this.swiper.fade ? "100%" : "calc(100% * " + 1 / this.swiper.children.length + ")";
      }
      return style;
    },
    slideIndex() {
      return this.swiper.children.findIndex((vm) => {
        return Dap.common.equal(vm.uid, this.uid);
      });
    }
  },
  methods: {
    addTransition(el) {
      if (this.swiper.useOpacity) {
        el.style.transition = "opacity " + this.swiper.speed + "ms";
        el.style.webkitTransition = "opacity " + this.swiper.speed + "ms";
      } else {
        el.style.transition = "";
        el.style.webkitTransition = "";
      }
    },
    removeTransition(el) {
      if (this.swiper.useOpacity) {
        el.style.transition = "";
        el.style.webkitTransition = "";
      } else {
        this.swiper.useOpacity = true;
      }
    }
  }
};
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return $options.swiper.fade ? (openBlock(), createBlock(Transition, {
    key: 0,
    name: "mvi-swiper-slide",
    onBeforeEnter: $options.addTransition,
    onAfterEnter: $options.removeTransition,
    onBeforeLeave: $options.addTransition,
    onAfterLeave: $options.removeTransition
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        class: "mvi-swiper-slide-fade",
        style: normalizeStyle($options.slideStyle)
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4), [
        [vShow, $options.swiper.fadeActiveIndex == $options.slideIndex]
      ])
    ]),
    _: 3
  }, 8, ["onBeforeEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave"])) : (openBlock(), createElementBlock("div", {
    key: 1,
    class: "mvi-swiper-slide",
    style: normalizeStyle($options.slideStyle)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 4));
}
const SwiperSlide = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r], ["__scopeId", "data-v-b5bb392c"]]);
SwiperSlide.install = (app) => {
  app.component(SwiperSlide.name, SwiperSlide);
};
const tabs_vue_vue_type_style_index_0_scoped_c9a6f725_lang = "";
const _sfc_main$q = {
  name: "m-tabs",
  data() {
    return {
      children: [],
      slideLeft: 0,
      slideWidth: 0,
      current: 0
    };
  },
  provide() {
    return {
      tabs: this
    };
  },
  emits: ["update:modelValue", "change"],
  props: {
    type: {
      type: String,
      default: "default",
      validator(value) {
        return ["default", "card"].includes(value);
      }
    },
    modelValue: {
      type: Number,
      default: 0
    },
    animation: {
      type: String,
      default: "none",
      validator(value) {
        return ["none", "slide", "fade"].includes(value);
      }
    },
    timeout: {
      type: Number,
      default: 200
    },
    activeColor: {
      type: String,
      default: null
    },
    inactiveColor: {
      type: String,
      default: null
    },
    activeBackground: {
      type: String,
      default: null
    },
    inactiveBackground: {
      type: String,
      default: null
    },
    activeClass: {
      type: String,
      default: null
    },
    inactiveClass: {
      type: String,
      default: null
    },
    titleBackground: {
      type: String,
      default: null
    },
    contentBackground: {
      type: String,
      default: null
    },
    lineHeight: {
      type: String,
      default: "0.04rem"
    },
    ellipsis: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
    flex: {
      type: String,
      default: "space-between"
    },
    offset: {
      type: String,
      default: "0"
    }
  },
  computed: {
    sliderStyle() {
      let style = {};
      if (this.activeColor) {
        style.backgroundColor = this.activeColor;
      }
      if (this.animation == "slide" || this.animation == "fade") {
        style.transition = "left " + this.timeout + "ms,width " + this.timeout + "ms";
        style.webkitTransition = "left " + this.timeout + "ms,width " + this.timeout + "ms";
      }
      if (this.lineHeight) {
        style.height = this.lineHeight;
      }
      style.width = this.slideWidth + "px";
      style.left = this.slideLeft + "px";
      return style;
    },
    headersStyle() {
      let style = {};
      if (this.titleBackground) {
        style.backgroundColor = this.titleBackground;
      }
      if (this.type == "card" && this.activeBackground) {
        style.borderColor = this.activeBackground;
      }
      if (this.flex && this.type == "default") {
        style.justifyContent = this.flex;
      }
      return style;
    },
    headerClass() {
      return (item, index) => {
        let cls = ["mvi-tab-header"];
        if (this.modelValue == index) {
          cls.push("mvi-tab-header-active");
          if (this.activeClass) {
            cls.push(this.activeClass);
          }
        } else {
          if (this.inactiveClass) {
            cls.push(this.inactiveClass);
          }
        }
        if (this.ellipsis) {
          cls.push("mvi-tab-header-ellipsis");
        }
        return cls;
      };
    },
    headerStyle() {
      return (item, index) => {
        let style = {};
        if (this.modelValue == index) {
          if (this.activeColor) {
            style.color = this.activeColor;
          }
        } else {
          if (this.inactiveColor) {
            style.color = this.inactiveColor;
          }
        }
        if (this.offset && index != 0 && this.type == "default") {
          style.marginLeft = this.offset;
        }
        if (this.type == "card") {
          if (this.modelValue == index) {
            if (this.activeBackground) {
              style.backgroundColor = this.activeBackground;
            }
          } else {
            if (this.inactiveBackground) {
              style.backgroundColor = this.inactiveBackground;
            }
          }
          if (this.activeBackground) {
            style.borderRightColor = this.activeBackground;
          }
        }
        style.maxWidth = `calc(100% / ${this.children.length})`;
        return style;
      };
    }
  },
  components: {
    Icon
  },
  created() {
    this.current = this.modelValue;
  },
  watch: {
    modelValue(newValue, oldValue) {
      this.to(newValue, oldValue);
    }
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.setSlider();
      }, 100);
    });
    this.setHeight();
    Dap.event.on(window, `resize.tabs_${this.uid}`, this.setHeight);
  },
  methods: {
    setHeight() {
      if (this.children[this.current] && this.$refs.content) {
        this.$refs.content.style.height = this.children[this.current].$el.offsetHeight + "px";
      }
    },
    clickHeader(item, index) {
      if (item.disabled) {
        return;
      }
      if (this.modelValue == index) {
        return;
      }
      this.$emit("update:modelValue", index);
      this.$emit("change", index);
    },
    to(newValue, oldValue) {
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].show = false;
        if (newValue < oldValue) {
          this.children[i].back = true;
        } else {
          this.children[i].back = false;
        }
      }
      this.children[newValue].show = true;
      if (!this.children[newValue].firstShow) {
        this.children[newValue].firstShow = true;
      }
      this.$nextTick(() => {
        this.current = newValue;
        this.setHeight();
        this.setSlider();
      });
    },
    setSlider() {
      this.slideWidth = parseFloat(
        Dap.element.getCssStyle(
          this.$refs.headers.querySelector(".mvi-tab-header-active"),
          "width"
        )
      );
      this.slideLeft = Dap.element.getElementPoint(
        this.$refs.headers.querySelector(".mvi-tab-header-active"),
        this.$refs.headers
      ).left;
    }
  },
  beforeUnmount() {
    Dap.event.off(window, `resize.tabs_${this.uid}`);
  }
};
const _hoisted_1$g = { class: "mvi-tabs" };
const _hoisted_2$g = ["data-type"];
const _hoisted_3$d = ["data-type", "onClick", "disabled"];
const _hoisted_4$a = ["innerHTML"];
const _hoisted_5$9 = {
  class: "mvi-tabs-content",
  ref: "content"
};
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", _hoisted_1$g, [
    createElementVNode("div", {
      ref: "headers",
      "data-type": $props.type,
      class: normalizeClass(["mvi-tabs-header", $props.type == "default" && $props.border ? "mvi-tabs-header-border" : ""]),
      style: normalizeStyle($options.headersStyle)
    }, [
      $props.type == "default" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "mvi-tabs-slider",
        style: normalizeStyle($options.sliderStyle)
      }, null, 4)) : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.children, (item, index) => {
        return openBlock(), createElementBlock("div", {
          "data-type": $props.type,
          class: normalizeClass($options.headerClass(item, index)),
          key: "header-" + index,
          onClick: ($event) => $options.clickHeader(item, index),
          style: normalizeStyle($options.headerStyle(item, index)),
          disabled: item.disabled || null
        }, [
          item.placement == "left" && item.iconType || item.iconUrl ? (openBlock(), createBlock(_component_Icon, {
            key: 0,
            class: normalizeClass(["mvi-tab-icon", item.title ? "mvi-tab-icon-left" : ""]),
            type: item.iconType,
            url: item.iconUrl,
            spin: item.iconSpin,
            size: item.iconSize,
            color: item.iconColor
          }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
          item.title ? (openBlock(), createElementBlock("span", {
            key: 1,
            class: "mvi-tab-header-text",
            innerHTML: item.title
          }, null, 8, _hoisted_4$a)) : createCommentVNode("", true),
          item.placement == "right" && item.iconType || item.iconUrl ? (openBlock(), createBlock(_component_Icon, {
            key: 2,
            class: normalizeClass(["mvi-tab-icon", item.title ? "mvi-tab-icon-right" : ""]),
            type: item.iconType,
            url: item.iconUrl,
            spin: item.iconSpin,
            size: item.iconSize,
            color: item.iconColor
          }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
        ], 14, _hoisted_3$d);
      }), 128))
    ], 14, _hoisted_2$g),
    createElementVNode("div", _hoisted_5$9, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 512)
  ]);
}
const Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q], ["__scopeId", "data-v-c9a6f725"]]);
Tabs.install = (app) => {
  app.component(Tabs.name, Tabs);
};
const tab_vue_vue_type_style_index_0_scoped_89fb488e_lang = "";
const _sfc_main$p = {
  name: "m-tab",
  inject: ["tabs"],
  data() {
    return {
      show: false,
      back: false,
      firstShow: false
    };
  },
  setup() {
    const uid = getCurrentInstance().uid;
    return {
      uid
    };
  },
  created() {
    this.tabs.children.push(this);
    if (this.tabs.modelValue == this.tabIndex) {
      this.show = true;
      if (!this.firstShow) {
        this.firstShow = true;
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: [String, Object],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: "left",
      validator(value) {
        return ["left", "right"].includes(value);
      }
    }
  },
  computed: {
    tabStyle() {
      let style = {};
      if (this.tabs.animation == "slide") {
        style.transition = "left " + this.tabs.timeout + "ms,opacity " + this.tabs.timeout + "ms";
        style.webkitTransition = "left " + this.tabs.timeout + "ms,opacity " + this.tabs.timeout + "ms";
      } else if (this.tabs.animation == "fade") {
        style.transition = "opacity " + this.tabs.timeout + "ms";
        style.webkitTransition = "opacity " + this.tabs.timeout + "ms";
      }
      if (this.tabs.contentBackground) {
        style.backgroundColor = this.tabs.contentBackground;
      }
      return style;
    },
    iconType() {
      let type = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.type == "string") {
          type = this.icon.type;
        }
      } else if (typeof this.icon == "string") {
        type = this.icon;
      }
      return type;
    },
    iconUrl() {
      let url = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.url == "string") {
          url = this.icon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.spin == "boolean") {
          spin = this.icon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.size == "string") {
          size = this.icon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color = null;
      if (Dap.common.isObject(this.icon)) {
        if (typeof this.icon.color == "string") {
          color = this.icon.color;
        }
      }
      return color;
    },
    tabIndex() {
      return this.tabs.children.findIndex((vm) => {
        return Dap.common.equal(vm.uid, this.uid);
      });
    }
  }
};
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, {
    name: "mvi-tab-" + $options.tabs.animation + ($data.back ? "-back" : "")
  }, {
    default: withCtx(() => [
      $data.firstShow ? withDirectives((openBlock(), createElementBlock("div", {
        key: 0,
        class: "mvi-tab",
        style: normalizeStyle($options.tabStyle)
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4)), [
        [vShow, $data.show]
      ]) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["name"]);
}
const Tab = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p], ["__scopeId", "data-v-89fb488e"]]);
Tab.install = (app) => {
  app.component(Tab.name, Tab);
};
const table_vue_vue_type_style_index_0_scoped_7cc792fa_lang = "";
const _sfc_main$o = {
  name: "m-table",
  emits: ["cell-click", "check", "sort-desc", "sort-asc"],
  data() {
    return {
      checkRows: [],
      selectAll: false,
      sortData: [],
      isScroll: false,
      scrollWidth: 0,
      headCols: [],
      bodyCols: [],
      headThs: [],
      sortBy: "",
      sortMethod: ""
    };
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    outBorder: {
      type: Boolean,
      default: false
    },
    rowBorder: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: null
    },
    rowClass: {
      type: String,
      default: null
    },
    cellClass: {
      type: Function,
      default: function() {
      }
    },
    noDataMsg: {
      type: String,
      default: "\u6682\u65F6\u6CA1\u6709\u6570\u636E"
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadText: {
      type: String,
      default: "\u6B63\u5728\u52A0\u8F7D\u6570\u636E..."
    },
    headClass: {
      type: String,
      default: null
    },
    customSortAsc: {
      type: Function,
      default: null
    },
    customSortDesc: {
      type: Function,
      default: null
    },
    sortActiveColor: {
      type: String,
      default: null
    },
    sortIcon: {
      type: Array,
      default: null
    }
  },
  computed: {
    bodyTrClass() {
      return (item, index) => {
        let cls = [];
        if (this.rowClass) {
          cls.push(this.rowClass);
        }
        if (item.className) {
          cls.push(item.className);
        }
        if (index % 2 == 1 && this.stripe) {
          cls.push("mvi-table-stripe");
        }
        return cls;
      };
    },
    tableHeaderThClass() {
      let cls = ["mvi-table-header-th"];
      if (this.rowBorder) {
        cls.push("mvi-table-header-th-border");
      }
      return cls;
    },
    bodyStyle() {
      let style = {};
      if (this.height) {
        style.maxHeight = this.height;
        style.overflow = "auto";
      }
      return style;
    },
    colgroupStyle() {
      return (item) => {
        let style = {};
        if (item.width) {
          style.width = item.width;
        }
        return style;
      };
    },
    columnsData() {
      let arr = [];
      this.columns.forEach((column) => {
        if (!column.hidden) {
          arr.push(column);
        }
      });
      return arr;
    },
    textFilter() {
      return (item, item2) => {
        let text = item[item2.key];
        if (typeof item2.filter == "function") {
          text = item2.filter(item[item2.key]);
        }
        return text;
      };
    }
  },
  components: {
    Icon,
    Checkbox,
    Loading
  },
  watch: {
    data(newValue) {
      this.sortData = this.getSortData();
      this.$nextTick(() => {
        this.columnsAlign();
      });
    },
    loading(newValue) {
      this.$nextTick(() => {
        this.columnsAlign();
      });
    }
  },
  created() {
    this.sortData = this.getSortData();
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  mounted() {
    this.columnsAlign();
    Dap.event.on(window, `resize.table_${this.uid}`, this.columnsAlign);
  },
  methods: {
    resetSortActive() {
      this.sortBy = "";
      this.sortMethod = "";
      if (typeof this.customSortAsc != "function" && typeof this.customSortDesc != "function") {
        this.sortData = this.getSortData();
        this.$nextTick(() => {
          this.columnsAlign();
        });
      }
    },
    columnsAlign() {
      if (this.$refs.body) {
        this.isScroll = Dap.element.getScrollHeight(this.$refs.body) > this.$refs.body.clientHeight;
        if (this.isScroll) {
          this.scrollWidth = this.$refs.body.offsetWidth - this.$refs.body.clientWidth;
        }
        this.$nextTick(() => {
          if (this.headThs.length > 0) {
            this.headThs.forEach((el, index) => {
              if (!this.columnsData[index].width && this.headCols.length > 0 && this.headCols[index] && this.bodyCols.length > 0 && this.bodyCols[index]) {
                this.headCols[index].style.width = this.bodyCols[index].style.width = el.offsetWidth + "px";
              }
            });
          }
        });
      }
    },
    cellClick(event2, item, index, item2, index2) {
      this.$emit("cell-click", {
        row: item,
        rowIndex: index,
        column: item2,
        columnIndex: index2
      });
    },
    selectCheck(value) {
      event.stopPropagation();
      let length = this.sortData.length;
      let length2 = 0;
      for (let i = 0; i < length; i++) {
        if (!this.sortData[i].checkDisabled) {
          length2++;
        }
      }
      if (this.checkRows.length == length2) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
      let checkRowsData = [];
      this.checkRows.forEach((item) => {
        for (let i = 0; i < length; i++) {
          if (i == item) {
            checkRowsData.push(this.sortData[i]);
            break;
          }
        }
      });
      this.$emit("check", checkRowsData);
    },
    allSelect(value) {
      this.checkRows = [];
      let length = this.sortData.length;
      if (value) {
        for (let i = 0; i < length; i++) {
          if (!this.sortData[i].checkDisabled) {
            this.checkRows.push(i);
          }
        }
      } else {
        this.checkRows = [];
      }
      let checkRowsData = [];
      this.checkRows.forEach((item) => {
        for (let i = 0; i < length; i++) {
          if (i == item) {
            checkRowsData.push(this.sortData[i]);
            break;
          }
        }
      });
      this.$emit("check", checkRowsData);
    },
    sortAsc(event2, column) {
      this.sortBy = column.key;
      this.sortMethod = "asc";
      if (typeof this.customSortAsc == "function" && this.customSortAsc) {
        this.customSortAsc(column, this.sortData);
      } else {
        this.sortData = this.sortData.sort(function(a, b) {
          if (Dap.number.isNumber(a[column.key]) && Dap.number.isNumber(b[column.key])) {
            return a[column.key] - b[column.key];
          }
          let str1 = a[column.key].toString();
          let str2 = b[column.key].toString();
          return str1.localeCompare(str2, "zh-CN");
        });
        this.$emit("sort-asc", this.sortData);
      }
    },
    sortDesc(event2, column) {
      this.sortBy = column.key;
      this.sortMethod = "desc";
      if (typeof this.customSortDesc == "function" && this.customSortDesc) {
        this.customSortDesc(column, this.sortData);
      } else {
        this.sortData = this.sortData.sort(function(a, b) {
          if (Dap.number.isNumber(a[column.key]) && Dap.number.isNumber(b[column.key])) {
            return b[column.key] - a[column.key];
          }
          let str1 = a[column.key].toString();
          let str2 = b[column.key].toString();
          return -str1.localeCompare(str2, "zh-CN");
        });
        this.$emit("sort-desc", this.sortData);
      }
    },
    getSortData() {
      let arr = [];
      this.data.forEach((row) => {
        if (!row.hidden) {
          arr.push(row);
        }
      });
      this.headCols = [];
      this.headThs = [];
      this.bodyCols = [];
      return arr;
    }
  },
  beforeUnmount() {
    Dap.event.off(window, `resize.table_${this.uid}`);
  }
};
const _hoisted_1$f = {
  cellpadding: "0",
  cellspacing: "0"
};
const _hoisted_2$f = ["innerHTML"];
const _hoisted_3$c = {
  key: 2,
  class: "mvi-table-sortable"
};
const _hoisted_4$9 = {
  key: 1,
  class: "mvi-table-loading"
};
const _hoisted_5$8 = ["innerHTML"];
const _hoisted_6$7 = ["innerHTML"];
const _hoisted_7$6 = {
  cellpadding: "0",
  cellspacing: "0"
};
const _hoisted_8$5 = ["onClick"];
const _hoisted_9$4 = ["innerHTML"];
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Checkbox = resolveComponent("Checkbox");
  const _component_Icon = resolveComponent("Icon");
  const _component_Loading = resolveComponent("Loading");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-table", $props.outBorder ? "mvi-table-border" : ""])
  }, [
    $options.columnsData.length != 0 ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["mvi-table-header", $props.headClass || ""])
    }, [
      createElementVNode("table", _hoisted_1$f, [
        createElementVNode("colgroup", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.columnsData, (item, index) => {
            return openBlock(), createElementBlock("col", {
              ref_for: true,
              ref: (el) => $data.headCols[index] = el,
              style: normalizeStyle($options.colgroupStyle(item, index)),
              key: "table-header-group-" + index
            }, null, 4);
          }), 128)),
          $data.isScroll ? (openBlock(), createElementBlock("col", {
            key: 0,
            style: normalizeStyle({ width: $data.scrollWidth + "px" })
          }, null, 4)) : createCommentVNode("", true)
        ]),
        createElementVNode("thead", null, [
          createElementVNode("tr", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($options.columnsData, (item, index) => {
              return openBlock(), createElementBlock("th", {
                ref_for: true,
                ref: (el) => $data.headThs[index] = el,
                class: normalizeClass($options.tableHeaderThClass),
                key: "table-column-" + index
              }, [
                createElementVNode("div", null, [
                  item.key == "checkbox" ? (openBlock(), createBlock(_component_Checkbox, {
                    key: 0,
                    icon: { size: "0.24rem", type: item.iconType || "success", color: item.iconColor || null },
                    modelValue: $data.selectAll,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.selectAll = $event),
                    onChange: $options.allSelect,
                    "fill-color": item.fillColor || null,
                    label: item.value || ""
                  }, null, 8, ["icon", "modelValue", "onChange", "fill-color", "label"])) : item.value ? (openBlock(), createElementBlock("span", {
                    key: 1,
                    innerHTML: item.value
                  }, null, 8, _hoisted_2$f)) : createCommentVNode("", true),
                  item.sortable ? (openBlock(), createElementBlock("span", _hoisted_3$c, [
                    createVNode(_component_Icon, {
                      onClick: ($event) => $options.sortAsc($event, item),
                      class: normalizeClass(["mvi-table-sortable-icon", item.key == $data.sortBy && $data.sortMethod == "asc" ? "mvi-table-sortable-icon-active" : ""]),
                      type: $props.sortIcon && $props.sortIcon.length == 2 && $props.sortIcon[0] ? $props.sortIcon[0] : "caret-up",
                      color: $props.sortActiveColor ? item.key == $data.sortBy && $data.sortMethod == "asc" ? $props.sortActiveColor : null : null
                    }, null, 8, ["onClick", "class", "type", "color"]),
                    createVNode(_component_Icon, {
                      onClick: ($event) => $options.sortDesc($event, item),
                      class: normalizeClass(["mvi-table-sortable-icon", item.key == $data.sortBy && $data.sortMethod == "desc" ? "mvi-table-sortable-icon-active" : ""]),
                      type: $props.sortIcon && $props.sortIcon.length == 2 && $props.sortIcon[1] ? $props.sortIcon[1] : "caret-down",
                      color: $props.sortActiveColor ? item.key == $data.sortBy && $data.sortMethod == "desc" ? $props.sortActiveColor : null : null
                    }, null, 8, ["onClick", "class", "type", "color"])
                  ])) : createCommentVNode("", true)
                ])
              ], 2);
            }), 128)),
            $data.isScroll ? (openBlock(), createElementBlock("th", {
              key: 0,
              style: normalizeStyle({ width: $data.scrollWidth + "px" })
            }, null, 4)) : createCommentVNode("", true)
          ])
        ])
      ])
    ], 2)) : createCommentVNode("", true),
    $props.loading ? (openBlock(), createElementBlock("div", _hoisted_4$9, [
      createElementVNode("div", null, [
        createVNode(_component_Loading, {
          color: "#c8c9cc",
          size: "0.3rem"
        }),
        createElementVNode("div", {
          class: "mvi-table-loading-text",
          innerHTML: $props.loadText
        }, null, 8, _hoisted_5$8)
      ])
    ])) : $data.sortData.length == 0 ? (openBlock(), createElementBlock("div", {
      key: 2,
      class: "mvi-table-no-data",
      innerHTML: $props.noDataMsg
    }, null, 8, _hoisted_6$7)) : (openBlock(), createElementBlock("div", {
      key: 3,
      class: "mvi-table-body",
      style: normalizeStyle($options.bodyStyle),
      ref: "body"
    }, [
      createElementVNode("table", _hoisted_7$6, [
        createElementVNode("colgroup", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.columnsData, (item, index) => {
            return openBlock(), createElementBlock("col", {
              ref_for: true,
              ref: (el) => $data.bodyCols[index] = el,
              style: normalizeStyle($options.colgroupStyle(item, index)),
              key: "table-body-group-" + index
            }, null, 4);
          }), 128))
        ]),
        createElementVNode("tbody", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($data.sortData, (item, index) => {
            return openBlock(), createElementBlock("tr", {
              key: "table-data-" + index,
              class: normalizeClass($options.bodyTrClass(item, index))
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList($options.columnsData, (item2, index2) => {
                return openBlock(), createElementBlock("td", {
                  class: normalizeClass([$props.rowBorder ? "mvi-table-body-td-border" : "", item.cellClassName && item.cellClassName[item2.key] ? item.cellClassName[item2.key] : "", item2.className || "", $props.cellClass(item, index, item2, index2) || ""]),
                  key: "table-column-data-" + index2,
                  onClick: ($event) => $options.cellClick($event, item, index, item2, index2)
                }, [
                  item2.key == "checkbox" ? (openBlock(), createBlock(_component_Checkbox, {
                    key: 0,
                    icon: { size: "0.24rem", type: item2.iconType || "success", color: item2.iconColor || null },
                    modelValue: $data.checkRows,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.checkRows = $event),
                    value: index,
                    onChange: $options.selectCheck,
                    "fill-color": item2.fillColor || null,
                    disabled: item.checkDisabled
                  }, null, 8, ["icon", "modelValue", "value", "onChange", "fill-color", "disabled"])) : createCommentVNode("", true),
                  item2.key == "custom" && _ctx.$slots.custom ? renderSlot(_ctx.$slots, "custom", {
                    key: 1,
                    row: item,
                    column: item2,
                    rowIndex: index,
                    columnIndex: index2
                  }, void 0, true) : (openBlock(), createElementBlock("span", {
                    key: 2,
                    innerHTML: $options.textFilter(item, item2)
                  }, null, 8, _hoisted_9$4))
                ], 10, _hoisted_8$5);
              }), 128))
            ], 2);
          }), 128))
        ])
      ])
    ], 4))
  ], 2);
}
const Table = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o], ["__scopeId", "data-v-7cc792fa"]]);
Table.install = (app) => {
  app.component(Table.name, Table);
};
const calendar_vue_vue_type_style_index_0_scoped_9ce41737_lang = "";
const _sfc_main$n = {
  name: "m-calendar",
  props: {
    modelValue: {
      type: Date,
      default: function() {
        return new Date();
      }
    },
    view: {
      type: String,
      default: "date",
      validator(value) {
        return ["year", "month", "date"].includes(value);
      }
    },
    monthText: {
      type: Array,
      default: function() {
        return [
          "\u4E00\u6708",
          "\u4E8C\u6708",
          "\u4E09\u6708",
          "\u56DB\u6708",
          "\u4E94\u6708",
          "\u516D\u6708",
          "\u4E03\u6708",
          "\u516B\u6708",
          "\u4E5D\u6708",
          "\u5341\u6708",
          "\u5341\u4E00\u6708",
          "\u5341\u4E8C\u6708"
        ];
      },
      validator(value) {
        if (value.length != 12) {
          return false;
        }
        return value.every((item) => {
          return Dap.number.isNumber(item) || typeof item == "string" && item;
        });
      }
    },
    weekText: {
      type: Array,
      default: function() {
        return ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
      },
      validator(value) {
        if (value.length != 7) {
          return false;
        }
        return value.every((item) => {
          return Dap.number.isNumber(item) || typeof item == "string" && item;
        });
      }
    },
    startYear: {
      type: Number,
      default: 1970
    },
    endYear: {
      type: Number,
      default: 2099
    },
    nowClass: {
      type: [String, Object],
      default: null
    },
    currentClass: {
      type: [String, Object],
      default: null
    },
    nonCurrentClick: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:modelValue", "date-click", "month-click", "year-click"],
  computed: {
    years() {
      let arr = [];
      let current_year = this.modelValue.getFullYear();
      let index = Math.floor((current_year - this.startYear) / 12);
      for (let i = this.startYear + index * 12; i < this.startYear + index * 12 + 12; i++) {
        let date = new Date();
        date.setFullYear(i);
        date.setMonth(this.modelValue.getMonth());
        date.setDate(this.modelValue.getDate());
        arr.push({
          date,
          year: i,
          now: i == new Date().getFullYear(),
          current: i == current_year
        });
      }
      return arr;
    },
    months() {
      let arr = [];
      for (let i = 0; i < 12; i++) {
        let date = new Date();
        date.setFullYear(this.modelValue.getFullYear());
        date.setMonth(i);
        date.setDate(this.modelValue.getDate());
        arr.push({
          date,
          year: this.modelValue.getFullYear(),
          month: i + 1,
          text: this.monthText[i],
          now: i + 1 == new Date().getMonth() + 1 && this.modelValue.getFullYear() == new Date().getFullYear(),
          current: i + 1 == this.modelValue.getMonth() + 1
        });
      }
      return arr;
    },
    days() {
      let total = Dap.date.getDays(
        this.modelValue.getFullYear(),
        this.modelValue.getMonth() + 1
      );
      let arr = [];
      for (let i = 0; i < total; i++) {
        arr.push({
          date: this.getSpecifiedDate(i + 1),
          now: this.isNow(i + 1),
          current: this.isCurrent(i + 1),
          currentMonth: true
        });
      }
      let fd = this.getSpecifiedDate(1);
      let week = fd.getDay();
      let pd = fd;
      for (let i = 0; i < week; i++) {
        let prevDate = Dap.date.getDateBefore(pd, 1);
        arr.unshift({
          date: prevDate,
          now: false,
          current: false,
          currentMonth: false
        });
        pd = prevDate;
      }
      let ld = this.getSpecifiedDate(total);
      let length = arr.length;
      for (let i = length; i < 35; i++) {
        let nextDate = Dap.date.getDateAfter(ld, 1);
        arr.push({
          date: nextDate,
          now: false,
          current: false,
          currentMonth: false
        });
        ld = nextDate;
      }
      return arr;
    },
    yearCurrentClass() {
      return (item) => {
        let cls = [];
        if (item.current) {
          if (typeof this.currentClass == "string" && this.currentClass) {
            cls.push(this.currentClass);
          } else if (Dap.common.isObject(this.currentClass) && typeof this.currentClass.year == "string" && this.currentClass.year) {
            cls.push(this.currentClass.year);
          } else {
            cls.push("mvi-calendar-year-current");
          }
        }
        return cls;
      };
    },
    monthCurrentClass() {
      return (item) => {
        let cls = [];
        if (item.current) {
          if (typeof this.currentClass == "string" && this.currentClass) {
            cls.push(this.currentClass);
          } else if (Dap.common.isObject(this.currentClass) && typeof this.currentClass.month == "string" && this.currentClass.month) {
            cls.push(this.currentClass.month);
          } else {
            cls.push("mvi-calendar-month-current");
          }
        }
        return cls;
      };
    },
    dateCurrentClass(item) {
      return (item2) => {
        let cls = [];
        if (item2.current) {
          if (typeof this.currentClass == "string" && this.currentClass) {
            cls.push(this.currentClass);
          } else if (Dap.common.isObject(this.currentClass) && typeof this.currentClass.date == "string" && this.currentClass.date) {
            cls.push(this.currentClass.date);
          } else {
            cls.push("mvi-calendar-date-current");
          }
        }
        return cls;
      };
    },
    yearNowClass(item) {
      return (item2) => {
        let cls = [];
        if (item2.now) {
          if (typeof this.nowClass == "string" && this.nowClass) {
            cls.push(this.nowClass);
          } else if (Dap.common.isObject(this.nowClass) && typeof this.nowClass.year == "string" && this.nowClass.year) {
            cls.push(this.nowClass.year);
          } else {
            cls.push("mvi-calendar-year-now");
          }
        }
        return cls;
      };
    },
    monthNowClass() {
      return (item) => {
        let cls = [];
        if (item.now) {
          if (typeof this.nowClass == "string" && this.nowClass) {
            cls.push(this.nowClass);
          } else if (Dap.common.isObject(this.nowClass) && typeof this.nowClass.month == "string" && this.nowClass.month) {
            cls.push(this.nowClass.month);
          } else {
            cls.push("mvi-calendar-month-now");
          }
        }
        return cls;
      };
    },
    dateNowClass(item) {
      return (item2) => {
        let cls = [];
        if (item2.now) {
          if (typeof this.nowClass == "string") {
            cls.push(this.nowClass);
          } else if (Dap.common.isObject(this.nowClass) && typeof this.nowClass.date == "string" && this.nowClass.date) {
            cls.push(this.nowClass.date);
          } else {
            cls.push("mvi-calendar-date-now");
          }
        }
        return cls;
      };
    }
  },
  methods: {
    isNow(date) {
      let now = new Date();
      if (this.modelValue.getFullYear() == now.getFullYear() && this.modelValue.getMonth() == now.getMonth() && date == now.getDate()) {
        return true;
      } else {
        return false;
      }
    },
    isCurrent(date) {
      if (this.modelValue.getDate() == date) {
        return true;
      } else {
        return false;
      }
    },
    getWeek(date) {
      let fullDate = new Date();
      fullDate.setFullYear(this.modelValue.getFullYear());
      fullDate.setMonth(this.modelValue.getMonth());
      fullDate.setDate(date);
      return fullDate.getDay();
    },
    getSpecifiedDate(index) {
      let fullDate = new Date();
      fullDate.setFullYear(this.modelValue.getFullYear());
      fullDate.setMonth(this.modelValue.getMonth());
      fullDate.setDate(index);
      return fullDate;
    },
    onDateClick(item) {
      if (!item.currentMonth && !this.nonCurrentClick) {
        return;
      }
      this.$emit("update:modelValue", item.date);
      this.$emit("date-click", item);
    },
    onMonthClick(item) {
      this.$emit("update:modelValue", item.date);
      this.$emit("month-click", item);
    },
    onYearClick(item) {
      if (item.year < this.startYear || item.year > this.endYear) {
        return;
      }
      this.$emit("update:modelValue", item.date);
      this.$emit("year-click", item);
    }
  }
};
const _hoisted_1$e = { class: "mvi-calendar" };
const _hoisted_2$e = {
  key: 0,
  class: "mvi-calendar-date"
};
const _hoisted_3$b = { class: "mvi-calendar-date-header" };
const _hoisted_4$8 = ["textContent"];
const _hoisted_5$7 = {
  ref: "list",
  class: "mvi-calendar-date-list"
};
const _hoisted_6$6 = ["disabled", "textContent", "onClick"];
const _hoisted_7$5 = {
  key: 1,
  class: "mvi-calendar-month"
};
const _hoisted_8$4 = ["textContent", "onClick"];
const _hoisted_9$3 = { key: 2 };
const _hoisted_10$3 = ["textContent", "onClick", "disabled"];
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$e, [
    $props.view == "date" ? (openBlock(), createElementBlock("div", _hoisted_2$e, [
      createElementVNode("div", _hoisted_3$b, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.weekText, (item, index) => {
          return openBlock(), createElementBlock("div", {
            class: "mvi-calendar-date-header-item",
            key: "week-" + index,
            textContent: toDisplayString(item)
          }, null, 8, _hoisted_4$8);
        }), 128))
      ]),
      createElementVNode("div", _hoisted_5$7, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(new Array(6), (item, index) => {
          return openBlock(), createElementBlock("div", {
            key: "row-" + index,
            class: "mvi-calendar-date-row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($options.days.slice(index * 7, index * 7 + 7), (item2, index2) => {
              return openBlock(), createElementBlock("div", {
                class: "mvi-calendar-date-day",
                key: "date-" + index2
              }, [
                createElementVNode("div", {
                  disabled: !item2.currentMonth || null,
                  class: normalizeClass(["mvi-calendar-date-day-item", !item2.currentMonth && $props.nonCurrentClick ? "mvi-calendar-allowed" : "", ($props.nonCurrentClick ? $props.active : $props.active && item2.currentMonth) ? "mvi-calendar-active" : "", $options.dateNowClass(item2), $options.dateCurrentClass(item2)]),
                  textContent: toDisplayString(item2.date.getDate()),
                  onClick: ($event) => $options.onDateClick(item2)
                }, null, 10, _hoisted_6$6)
              ]);
            }), 128))
          ]);
        }), 128))
      ], 512)
    ])) : $props.view == "month" ? (openBlock(), createElementBlock("div", _hoisted_7$5, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(new Array(3), (item, index) => {
        return openBlock(), createElementBlock("div", {
          class: "mvi-calendar-month-row",
          key: "monthRow-" + index
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.months.slice(index * 4, index * 4 + 4), (item2, index2) => {
            return openBlock(), createElementBlock("div", {
              class: "mvi-calendar-month-m",
              key: "month-" + index2
            }, [
              createElementVNode("div", {
                class: normalizeClass(["mvi-calendar-month-item", $props.active ? "mvi-calendar-active" : "", $options.monthNowClass(item2), $options.monthCurrentClass(item2)]),
                textContent: toDisplayString(item2.text),
                onClick: ($event) => $options.onMonthClick(item2)
              }, null, 10, _hoisted_8$4)
            ]);
          }), 128))
        ]);
      }), 128))
    ])) : $props.view == "year" ? (openBlock(), createElementBlock("div", _hoisted_9$3, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(new Array(3), (item, index) => {
        return openBlock(), createElementBlock("div", {
          class: "mvi-calendar-year-row",
          key: "yearRow" + index
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.years.slice(index * 4, index * 4 + 4), (item2, index2) => {
            return openBlock(), createElementBlock("div", {
              class: "mvi-calendar-year-y",
              key: "year-" + index2
            }, [
              createElementVNode("div", {
                class: normalizeClass(["mvi-calendar-year-item", item2.year >= $props.startYear && item2.year <= $props.endYear && $props.active ? "mvi-calendar-active" : "", $options.yearNowClass(item2), $options.yearCurrentClass(item2)]),
                textContent: toDisplayString(item2.year),
                onClick: ($event) => $options.onYearClick(item2),
                disabled: item2.year < $props.startYear || item2.year > $props.endYear || null
              }, null, 10, _hoisted_10$3)
            ]);
          }), 128))
        ]);
      }), 128))
    ])) : createCommentVNode("", true)
  ]);
}
const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n], ["__scopeId", "data-v-9ce41737"]]);
Calendar.install = (app) => {
  app.component(Calendar.name, Calendar);
};
const triangle_vue_vue_type_style_index_0_scoped_a2c3418a_lang = "";
const _sfc_main$m = {
  name: "m-triangle",
  props: {
    background: {
      type: String,
      default: null
    },
    borderColor: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: "0.14rem"
    },
    placement: {
      type: String,
      default: "top",
      validator(value) {
        return ["top", "left", "right", "bottom"].includes(value);
      }
    }
  },
  computed: {
    triangleStyle() {
      let style = {};
      style.borderWidth = this.size;
      if (this.placement == "top") {
        style.borderBottomColor = this.borderColor || "";
      } else if (this.placement == "bottom") {
        style.borderTopColor = this.borderColor || "";
      } else if (this.placement == "left") {
        style.borderRightColor = this.borderColor || "";
      } else if (this.placement == "right") {
        style.borderLeftColor = this.borderColor || "";
      }
      return style;
    },
    triangleElStyle() {
      let style = {};
      style.borderWidth = `calc(${this.size} - 1px)`;
      if (this.placement == "top") {
        style.borderBottomColor = this.background || "";
        style.marginLeft = `-${this.size}`;
      } else if (this.placement == "bottom") {
        style.borderTopColor = this.background || "";
        style.marginLeft = `-${this.size}`;
      } else if (this.placement == "left") {
        style.borderRightColor = this.background || "";
        style.marginTop = `-${this.size}`;
      } else if (this.placement == "right") {
        style.borderLeftColor = this.background || "";
        style.marginTop = `-${this.size}`;
      }
      return style;
    }
  }
};
const _hoisted_1$d = ["data-placement"];
const _hoisted_2$d = ["data-placement"];
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "mvi-triangle",
    style: normalizeStyle($options.triangleStyle),
    "data-placement": $props.placement
  }, [
    createElementVNode("div", {
      class: "mvi-triangle-el",
      style: normalizeStyle($options.triangleElStyle),
      "data-placement": $props.placement
    }, null, 12, _hoisted_2$d)
  ], 12, _hoisted_1$d);
}
const Triangle = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m], ["__scopeId", "data-v-a2c3418a"]]);
Triangle.install = (app) => {
  app.component(Triangle.name, Triangle);
};
const layer_vue_vue_type_style_index_0_scoped_5a181b5a_lang = "";
const _sfc_main$l = {
  name: "m-layer",
  data() {
    return {
      layerShow: false,
      firstShow: false,
      realPlacement: "bottom"
    };
  },
  emits: ["update:modelValue", "show", "showing", "shown", "hide", "hidding", "hidden"],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    target: {
      type: String,
      default: null
    },
    root: {
      type: String,
      default: null
    },
    placement: {
      type: String,
      default: "bottom",
      validator(value) {
        return ["top", "left", "right", "bottom", "top-start", "top-end", "left-start", "left-end", "right-start", "right-end", "bottom-start", "bottom-end"].includes(value);
      }
    },
    offset: {
      type: String,
      default: "0.2rem"
    },
    zIndex: {
      type: Number,
      default: null
    },
    fixed: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: null
    },
    wrapperClass: {
      type: String,
      default: null
    },
    timeout: {
      type: Number,
      default: 200
    },
    closable: {
      type: Boolean,
      default: false
    },
    showTriangle: {
      type: Boolean,
      default: false
    },
    animation: {
      type: String,
      default: null
    },
    shadow: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
    borderColor: {
      type: String,
      default: "#eee"
    },
    background: {
      type: String,
      default: "#fff"
    },
    fixedAuto: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Triangle
  },
  watch: {
    placement(newValue) {
      if (this.layerShow && this.firstShow) {
        this.autoAdjust();
        this.reset();
        this.$nextTick(() => {
          this.resetTriangle();
        });
      }
    },
    modelValue(newValue) {
      if (newValue) {
        if (!this.firstShow) {
          this.firstShow = true;
        }
      }
      this.layerShow = newValue;
    }
  },
  computed: {
    trianglePlacement() {
      if (this.realPlacement == "bottom-start" || this.realPlacement == "bottom" || this.realPlacement == "bottom-end") {
        return "top";
      } else if (this.realPlacement == "top-start" || this.realPlacement == "top" || this.realPlacement == "top-end") {
        return "bottom";
      } else if (this.realPlacement == "left-start" || this.realPlacement == "left" || this.realPlacement == "left-end") {
        return "right";
      } else if (this.realPlacement == "right-start" || this.realPlacement == "right" || this.realPlacement == "right-end") {
        return "left";
      }
    },
    wrapperCls() {
      let cls = ["mvi-layer-wrapper"];
      if (this.shadow) {
        cls.push("mvi-layer-shadow");
      }
      if (this.border) {
        cls.push("mvi-layer-border");
      }
      if (this.wrapperClass) {
        cls.push(this.wrapperClass);
      }
      return cls;
    },
    wrapperStyle() {
      let style = {};
      if (this.border && this.borderColor) {
        style.borderColor = this.borderColor;
      }
      if (this.background) {
        style.background = this.background;
      }
      if (this.width) {
        style.width = this.width;
      }
      return style;
    },
    layerStyle() {
      let style = {};
      if (Dap.number.isNumber(this.zIndex)) {
        style.zIndex = this.zIndex;
      }
      if (this.timeout) {
        style.transition = "transform " + this.timeout + "ms,opacity " + this.timeout + "ms";
        style.webkitTransition = "transform " + this.timeout + "ms,opacity " + this.timeout + "ms";
      }
      if (!this.showTriangle) {
        style.padding = 0;
        if (this.realPlacement == "bottom-start" || this.realPlacement == "bottom" || this.realPlacement == "bottom-end") {
          style.paddingTop = this.offset;
        } else if (this.realPlacement == "top-start" || this.realPlacement == "top" || this.realPlacement == "top-end") {
          style.paddingBottom = this.offset;
        } else if (this.realPlacement == "left-start" || this.realPlacement == "left" || this.realPlacement == "left-end") {
          style.paddingRight = this.offset;
        } else if (this.realPlacement == "right-start" || this.realPlacement == "right" || this.realPlacement == "right-end") {
          style.paddingLeft = this.offset;
        }
      }
      return style;
    }
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  mounted() {
    if (this.modelValue) {
      if (!this.firstShow) {
        this.firstShow = true;
      }
      this.layerShow = this.modelValue;
    }
    Dap.event.on(window, `resize.layer_${this.uid}`, this.resizeSet);
    Dap.event.on(window, `click.layer_${this.uid}`, this.hideLayer);
  },
  methods: {
    resizeSet() {
      if (this.layerShow && this.firstShow) {
        this.autoAdjust();
        this.reset();
        this.$nextTick(() => {
          this.resetTriangle();
        });
      }
    },
    autoAdjust() {
      let $target = this.getTargetEl();
      let point = Dap.element.getElementBounding($target);
      this.realPlacement = this.placement;
      if (this.placement == "bottom") {
        if (point.bottom < this.$el.offsetHeight) {
          if (point.top > this.$el.offsetHeight) {
            this.realPlacement = "top";
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.left > this.$el.offsetWidth) {
            this.realPlacement = "left";
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.right > this.$el.offsetWidth) {
            this.realPlacement = "right";
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          }
        } else {
          if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
            this.realPlacement = "bottom-start";
          }
          if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
            this.realPlacement = "bottom-end";
          }
        }
      } else if (this.placement == "bottom-start") {
        if (point.bottom < this.$el.offsetHeight) {
          if (point.top > this.$el.offsetHeight) {
            this.realPlacement = "top-start";
            if (point.right + $target.offsetWidth < this.$el.offsetWidth) {
              this.realPlacement = "top";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.left > this.$el.offsetWidth) {
            this.realPlacement = "left";
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.right > this.$el.offsetWidth) {
            this.realPlacement = "right";
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          }
        } else {
          if (point.right + $target.offsetWidth < this.$el.offsetWidth) {
            this.realPlacement = "bottom";
          }
          if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
            this.realPlacement = "bottom-end";
          }
        }
      } else if (this.placement == "bottom-end") {
        if (point.bottom < this.$el.offsetHeight) {
          if (point.top > this.$el.offsetHeight) {
            this.realPlacement = "top-end";
            if (point.left + $target.offsetWidth < this.$el.offsetWidth) {
              this.realPlacement = "top";
            }
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
          } else if (point.left > this.$el.offsetWidth) {
            this.realPlacement = "left";
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.right > this.$el.offsetWidth) {
            this.realPlacement = "right";
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          }
        } else {
          if (point.left + $target.offsetWidth < this.$el.offsetWidth) {
            this.realPlacement = "bottom";
          }
          if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
            this.realPlacement = "bottom-start";
          }
        }
      } else if (this.placement == "top") {
        if (point.top < this.$el.offsetHeight) {
          if (point.bottom > this.$el.offsetHeight) {
            this.realPlacement = "bottom";
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          } else if (point.left > this.$el.offsetWidth) {
            this.realPlacement = "left";
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.right > this.$el.offsetWidth) {
            this.realPlacement = "right";
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          }
        } else {
          if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
            this.realPlacement = "top-start";
          }
          if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
            this.realPlacement = "top-end";
          }
        }
      } else if (this.placement == "top-start") {
        if (point.top < this.$el.offsetHeight) {
          if (point.bottom > this.$el.offsetHeight) {
            this.realPlacement = "bottom-start";
            if (point.right + $target.offsetWidth < this.$el.offsetWidth) {
              this.realPlacement = "bottom";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          } else if (point.left > this.$el.offsetWidth) {
            this.realPlacement = "left";
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.right > this.$el.offsetWidth) {
            this.realPlacement = "right";
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          }
        } else {
          if (point.right + $target.offsetWidth < this.$el.offsetWidth) {
            this.realPlacement = "top";
          }
          if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
            this.realPlacement = "top-end";
          }
        }
      } else if (this.placement == "top-end") {
        if (point.top < this.$el.offsetHeight) {
          if (point.bottom > this.$el.offsetHeight) {
            this.realPlacement = "bottom-end";
            if (point.left + $target.offsetWidth < this.$el.offsetWidth) {
              this.realPlacement = "bottom";
            }
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
          } else if (point.left > this.$el.offsetWidth) {
            this.realPlacement = "left";
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.right > this.$el.offsetWidth) {
            this.realPlacement = "right";
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          }
        } else {
          if (point.left + $target.offsetWidth < this.$el.offsetWidth) {
            this.realPlacement = "top";
          }
          if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
            this.realPlacement = "top-start";
          }
        }
      } else if (this.placement == "left") {
        if (point.left < this.$el.offsetWidth) {
          if (point.right > this.$el.offsetWidth) {
            this.realPlacement = "right";
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          } else if (point.top > this.$el.offsetHeight) {
            this.realPlacement = "top";
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.bottom > this.$el.offsetHeight) {
            this.realPlacement = "bottom";
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          }
        } else {
          if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
            this.realPlacement = "left-start";
          }
          if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
            this.realPlacement = "left-end";
          }
        }
      } else if (this.placement == "left-start") {
        if (point.left < this.$el.offsetWidth) {
          if (point.right > this.$el.offsetWidth) {
            this.realPlacement = "right-start";
            if (point.bottom + $target.offsetHeight < this.$el.offsetHeight) {
              this.realPlacement = "right";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          } else if (point.top > this.$el.offsetHeight) {
            this.realPlacement = "top";
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.bottom > this.$el.offsetHeight) {
            this.realPlacement = "bottom";
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          }
        } else {
          if (point.bottom + $target.offsetHeight < this.$el.offsetHeight) {
            this.realPlacement = "left";
          }
          if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
            this.realPlacement = "left-end";
          }
        }
      } else if (this.placement == "left-end") {
        if (point.left < this.$el.offsetWidth) {
          if (point.right > this.$el.offsetWidth) {
            this.realPlacement = "right-end";
            if (point.top + $target.offsetHeight < this.$el.offsetHeight) {
              this.realPlacement = "right";
            }
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
          } else if (point.top > this.$el.offsetHeight) {
            this.realPlacement = "top";
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.bottom > this.$el.offsetHeight) {
            this.realPlacement = "bottom";
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          }
        } else {
          if (point.top + $target.offsetHeight < this.$el.offsetHeight) {
            this.realPlacement = "left";
          }
          if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
            this.realPlacement = "left-start";
          }
        }
      } else if (this.placement == "right") {
        if (point.right < this.$el.offsetWidth) {
          if (point.left > this.$el.offsetWidth) {
            this.realPlacement = "left";
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.top > this.$el.offsetHeight) {
            this.realPlacement = "top";
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.bottom > this.$el.offsetHeight) {
            this.realPlacement = "bottom";
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          }
        } else {
          if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
            this.realPlacement = "right-start";
          }
          if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
            this.realPlacement = "right-end";
          }
        }
      } else if (this.placement == "right-start") {
        if (point.right < this.$el.offsetWidth) {
          if (point.left > this.$el.offsetWidth) {
            this.realPlacement = "left-start";
            if (point.bottom + $target.offsetHeight < this.$el.offsetHeight) {
              this.realPlacement = "left";
            }
            if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.top > this.$el.offsetHeight) {
            this.realPlacement = "top";
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.bottom > this.$el.offsetHeight) {
            this.realPlacement = "bottom";
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          }
        } else {
          if (point.bottom + $target.offsetHeight < this.$el.offsetHeight) {
            this.realPlacement = "right";
          }
          if (point.bottom + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
            this.realPlacement = "right-end";
          }
        }
      } else if (this.placement == "right-end") {
        if (point.right < this.$el.offsetWidth) {
          if (point.left > this.$el.offsetWidth) {
            this.realPlacement = "left-end";
            if (point.top + $target.offsetHeight < this.$el.offsetHeight) {
              this.realPlacement = "left";
            }
            if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
          } else if (point.top > this.$el.offsetHeight) {
            this.realPlacement = "top";
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.bottom > this.$el.offsetHeight) {
            this.realPlacement = "bottom";
            if (point.left + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
            if (point.right + $target.offsetWidth / 2 < this.$el.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          }
        } else {
          if (point.top + $target.offsetHeight < this.$el.offsetHeight) {
            this.realPlacement = "right";
          }
          if (point.top + $target.offsetHeight / 2 < this.$el.offsetHeight / 2) {
            this.realPlacement = "right-start";
          }
        }
      }
    },
    hideLayer(event2) {
      if (this.layerShow && this.firstShow && this.closable) {
        if (Dap.element.isContains(this.$el, event2.target) || Dap.element.isContains(this.getTargetEl(), event2.target)) {
          return;
        }
        this.$emit("update:modelValue", false);
      }
    },
    beforeEnter(el) {
      if (Dap.data.get(el, "mvi-layer-beforeEnter-trigger")) {
        return;
      }
      Dap.data.set(el, "mvi-layer-beforeEnter-trigger", true);
      this.$emit("show", el);
      if (typeof this.layerComponentWatch == "function") {
        this.layerComponentWatch.apply(this, ["show", el]);
      }
    },
    enter(el) {
      if (Dap.data.get(el, "mvi-layer-enter-trigger")) {
        return;
      }
      Dap.data.set(el, "mvi-layer-enter-trigger", true);
      this.$nextTick(() => {
        this.$emit("showing", el);
        this.autoAdjust();
        this.reset();
        this.$nextTick(() => {
          this.resetTriangle();
        });
        if (typeof this.layerComponentWatch == "function") {
          this.layerComponentWatch.apply(this, ["showing", el]);
        }
      });
    },
    afterEnter(el) {
      this.$emit("shown", el);
      if (typeof this.layerComponentWatch == "function") {
        this.layerComponentWatch.apply(this, ["shown", el]);
      }
    },
    beforeLeave(el) {
      Dap.data.remove(el, "mvi-layer-beforeEnter-trigger");
      Dap.data.remove(el, "mvi-layer-enter-trigger");
      this.$emit("hide", el);
      if (typeof this.layerComponentWatch == "function") {
        this.layerComponentWatch.apply(this, ["hide", el]);
      }
    },
    leave(el) {
      this.$emit("hidding", el);
      if (typeof this.layerComponentWatch == "function") {
        this.layerComponentWatch.apply(this, ["hidding", el]);
      }
    },
    afterLeave(el) {
      this.$emit("hidden", el);
      if (typeof this.layerComponentWatch == "function") {
        this.layerComponentWatch.apply(this, ["hidden", el]);
      }
    },
    reset() {
      if (!Dap.element.isElement(this.$el)) {
        return;
      }
      if (this.showTriangle) {
        this.$el.style.padding = 0;
        if (this.realPlacement == "bottom-start" || this.realPlacement == "bottom" || this.realPlacement == "bottom-end") {
          this.$el.style.paddingTop = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetHeight}px)`;
        } else if (this.realPlacement == "top-start" || this.realPlacement == "top" || this.realPlacement == "top-end") {
          this.$el.style.paddingBottom = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetHeight}px)`;
        } else if (this.realPlacement == "left-start" || this.realPlacement == "left" || this.realPlacement == "left-end") {
          this.$el.style.paddingRight = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetWidth}px)`;
        } else if (this.realPlacement == "right-start" || this.realPlacement == "right" || this.realPlacement == "right-end") {
          this.$el.style.paddingLeft = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetWidth}px)`;
        }
      }
      let $target = this.getTargetEl();
      let $root = this.getRootEl();
      let pt = Dap.element.getElementPoint($target, $root);
      if (this.fixed) {
        if (this.fixedAuto) {
          let flag = true;
          let element = $target.offsetParent;
          while (flag && element) {
            if (Dap.element.getCssStyle(element, "transform") != "none") {
              flag = false;
            } else {
              element = element.offsetParent;
            }
          }
          pt = Dap.element.getElementPoint($target, element);
        } else {
          pt = Dap.element.getElementBounding($target);
        }
      }
      if (this.realPlacement == "bottom" || this.realPlacement == "bottom-start" || this.realPlacement == "bottom-end") {
        this.$el.style.top = pt.top + $target.offsetHeight + "px";
        this.$el.style.bottom = "auto";
        if (this.realPlacement == "bottom") {
          this.$el.style.left = pt.left + $target.offsetWidth / 2 - this.$el.offsetWidth / 2 + "px";
        } else if (this.realPlacement == "bottom-start") {
          this.$el.style.left = pt.left + "px";
        } else if (this.realPlacement == "bottom-end") {
          this.$el.style.left = $target.offsetWidth + pt.left - this.$el.offsetWidth + "px";
        }
        this.$el.style.right = "auto";
      } else if (this.realPlacement == "top" || this.realPlacement == "top-start" || this.realPlacement == "top-end") {
        this.$el.style.bottom = (this.fixed ? pt.bottom + $target.offsetHeight : $root.clientHeight - pt.top) + "px";
        this.$el.style.top = "auto";
        if (this.realPlacement == "top") {
          this.$el.style.left = pt.left + $target.offsetWidth / 2 - this.$el.offsetWidth / 2 + "px";
        } else if (this.realPlacement == "top-start") {
          this.$el.style.left = pt.left + "px";
        } else if (this.realPlacement == "top-end") {
          this.$el.style.left = $target.offsetWidth + pt.left - this.$el.offsetWidth + "px";
        }
        this.$el.style.right = "auto";
      } else if (this.realPlacement == "left" || this.realPlacement == "left-start" || this.realPlacement == "left-end") {
        this.$el.style.right = (this.fixed ? pt.right + $target.offsetWidth : $root.clientWidth - pt.left) + "px";
        this.$el.style.left = "auto";
        if (this.realPlacement == "left") {
          this.$el.style.top = pt.top + $target.offsetHeight / 2 - this.$el.offsetHeight / 2 + "px";
        } else if (this.realPlacement == "left-start") {
          this.$el.style.top = pt.top + "px";
        } else if (this.realPlacement == "left-end") {
          this.$el.style.top = $target.offsetHeight + pt.top - this.$el.offsetHeight + "px";
        }
        this.$el.style.bottom = "auto";
      } else if (this.realPlacement == "right" || this.realPlacement == "right-start" || this.realPlacement == "right-end") {
        this.$el.style.left = pt.left + $target.offsetWidth + "px";
        this.$el.style.right = "auto";
        if (this.realPlacement == "right") {
          this.$el.style.top = pt.top + $target.offsetHeight / 2 - this.$el.offsetHeight / 2 + "px";
        } else if (this.realPlacement == "right-start") {
          this.$el.style.top = pt.top + "px";
        } else if (this.realPlacement == "right-end") {
          this.$el.style.top = $target.offsetHeight + pt.top - this.$el.offsetHeight + "px";
        }
        this.$el.style.bottom = "auto";
      }
    },
    resetTriangle() {
      if (!this.showTriangle || this.$refs.triangle && !this.$refs.triangle.$el) {
        return;
      }
      const targetWidth = this.getTargetEl().offsetWidth;
      const elWidth = this.$el.offsetWidth;
      const targetHeight = this.getTargetEl().offsetHeight;
      const elHeight = this.$el.offsetHeight;
      const triWidth = this.$refs.triangle.$el.offsetWidth;
      const triHeight = this.$refs.triangle.$el.offsetHeight;
      if (this.realPlacement == "bottom-start") {
        this.$refs.triangle.$el.style.top = "auto";
        this.$refs.triangle.$el.style.right = "auto";
        this.$refs.triangle.$el.style.bottom = "100%";
        this.$refs.triangle.$el.style.left = (targetWidth > elWidth ? elWidth : targetWidth) / 2 - triWidth / 2 + "px";
      } else if (this.realPlacement == "bottom") {
        this.$refs.triangle.$el.style.top = "auto";
        this.$refs.triangle.$el.style.right = "auto";
        this.$refs.triangle.$el.style.bottom = "100%";
        this.$refs.triangle.$el.style.left = elWidth / 2 - triWidth / 2 + "px";
      } else if (this.realPlacement == "bottom-end") {
        this.$refs.triangle.$el.style.top = "auto";
        this.$refs.triangle.$el.style.left = "auto";
        this.$refs.triangle.$el.style.bottom = "100%";
        this.$refs.triangle.$el.style.right = (targetWidth > elWidth ? elWidth : targetWidth) / 2 - triWidth / 2 + "px";
      } else if (this.realPlacement == "top-start") {
        this.$refs.triangle.$el.style.top = "100%";
        this.$refs.triangle.$el.style.right = "auto";
        this.$refs.triangle.$el.style.bottom = "auto";
        this.$refs.triangle.$el.style.left = (targetWidth > elWidth ? elWidth : targetWidth) / 2 - triWidth / 2 + "px";
      } else if (this.realPlacement == "top") {
        this.$refs.triangle.$el.style.top = "100%";
        this.$refs.triangle.$el.style.right = "auto";
        this.$refs.triangle.$el.style.bottom = "auto";
        this.$refs.triangle.$el.style.left = elWidth / 2 - triWidth / 2 + "px";
      } else if (this.realPlacement == "top-end") {
        this.$refs.triangle.$el.style.top = "100%";
        this.$refs.triangle.$el.style.left = "auto";
        this.$refs.triangle.$el.style.bottom = "auto";
        this.$refs.triangle.$el.style.right = (targetWidth > elWidth ? elWidth : targetWidth) / 2 - triWidth / 2 + "px";
      } else if (this.realPlacement == "left-start") {
        this.$refs.triangle.$el.style.left = "100%";
        this.$refs.triangle.$el.style.right = "auto";
        this.$refs.triangle.$el.style.top = (targetHeight > elHeight ? elHeight : targetHeight) / 2 - triHeight / 2 + "px";
        this.$refs.triangle.$el.style.bottom = "auto";
      } else if (this.realPlacement == "left") {
        this.$refs.triangle.$el.style.left = "100%";
        this.$refs.triangle.$el.style.right = "auto";
        this.$refs.triangle.$el.style.top = elHeight / 2 - triHeight / 2 + "px";
        this.$refs.triangle.$el.style.bottom = "auto";
      } else if (this.realPlacement == "left-end") {
        this.$refs.triangle.$el.style.left = "100%";
        this.$refs.triangle.$el.style.right = "auto";
        this.$refs.triangle.$el.style.bottom = (targetHeight > elHeight ? elHeight : targetHeight) / 2 - triHeight / 2 + "px";
        this.$refs.triangle.$el.style.top = "auto";
      } else if (this.realPlacement == "right-start") {
        this.$refs.triangle.$el.style.right = "100%";
        this.$refs.triangle.$el.style.left = "auto";
        this.$refs.triangle.$el.style.top = (targetHeight > elHeight ? elHeight : targetHeight) / 2 - triHeight / 2 + "px";
        this.$refs.triangle.$el.style.bottom = "auto";
      } else if (this.realPlacement == "right") {
        this.$refs.triangle.$el.style.right = "100%";
        this.$refs.triangle.$el.style.left = "auto";
        this.$refs.triangle.$el.style.top = elHeight / 2 - triHeight / 2 + "px";
        this.$refs.triangle.$el.style.bottom = "auto";
      } else if (this.realPlacement == "right-end") {
        this.$refs.triangle.$el.style.right = "100%";
        this.$refs.triangle.$el.style.left = "auto";
        this.$refs.triangle.$el.style.bottom = (targetHeight > elHeight ? elHeight : targetHeight) / 2 - triHeight / 2 + "px";
        this.$refs.triangle.$el.style.top = "auto";
      }
    },
    getTargetEl() {
      if (this.target) {
        return document.body.querySelector(this.target) || document.body;
      } else {
        return document.body;
      }
    },
    getRootEl() {
      if (this.fixed) {
        return document.body;
      }
      if (this.root) {
        return document.body.querySelector(this.root) || document.body;
      } else {
        return document.body;
      }
    }
  },
  beforeUnmount() {
    Dap.event.off(window, `resize.layer_${this.uid} click.layer_${this.uid}`);
  }
};
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Triangle = resolveComponent("Triangle");
  return openBlock(), createBlock(Transition, {
    name: $props.animation || "mvi-layer",
    onBeforeEnter: $options.beforeEnter,
    onEnter: $options.enter,
    onAfterEnter: $options.afterEnter,
    onLeave: $options.leave,
    onBeforeLeave: $options.beforeLeave,
    onAfterLeave: $options.afterLeave
  }, {
    default: withCtx(() => [
      $data.firstShow ? withDirectives((openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["mvi-layer", $props.fixed ? "mvi-layer-fixed" : ""]),
        style: normalizeStyle($options.layerStyle)
      }, [
        createElementVNode("div", {
          class: normalizeClass($options.wrapperCls),
          style: normalizeStyle($options.wrapperStyle)
        }, [
          $props.showTriangle ? (openBlock(), createBlock(_component_Triangle, {
            key: 0,
            ref: "triangle",
            class: "mvi-layer-triangle",
            placement: $options.trianglePlacement,
            background: $props.background,
            "border-color": $props.border && $props.borderColor ? $props.borderColor : $props.background,
            size: "0.14rem"
          }, null, 8, ["placement", "background", "border-color"])) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 6)
      ], 6)), [
        [vShow, $data.layerShow]
      ]) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onLeave", "onBeforeLeave", "onAfterLeave"]);
}
const Layer = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l], ["__scopeId", "data-v-5a181b5a"]]);
Layer.install = (app) => {
  app.component(Layer.name, Layer);
};
const tooltip_vue_vue_type_style_index_0_scoped_24f19bcb_lang = "";
const _sfc_main$k = {
  name: "m-tooltip",
  data() {
    return {
      show: false
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    placement: {
      type: String,
      default: "bottom",
      validator(value) {
        return [
          "bottom",
          "bottom-start",
          "bottom-end",
          "top",
          "top-start",
          "top-end",
          "left",
          "left-start",
          "left-end",
          "right",
          "right-start",
          "right-end"
        ].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    timeout: {
      type: Number,
      default: 200
    },
    borderColor: {
      type: String,
      default: "#333"
    },
    color: {
      type: String,
      default: "#333"
    },
    textColor: {
      type: String,
      default: "#fff"
    },
    trigger: {
      type: String,
      default: "click",
      validator(value) {
        return ["hover", "click", "custom"].includes(value);
      }
    },
    offset: {
      type: String,
      default: "0.1rem"
    },
    zIndex: {
      type: Number,
      default: 20
    },
    fixed: {
      type: Boolean,
      default: false
    },
    fixedAuto: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: null
    },
    animation: {
      type: String,
      default: null
    },
    showTriangle: {
      type: Boolean,
      default: true
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    contentStyle() {
      let style = {};
      if (this.textColor) {
        style.color = this.textColor;
      }
      if (this.width) {
        style.whiteSpace = "normal";
      }
      return style;
    }
  },
  components: {
    Layer
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  methods: {
    hoverShowTooltip() {
      if (this.trigger == "hover") {
        this.showTooltip();
      }
    },
    hoverHideToolTip() {
      if (this.trigger == "hover") {
        this.hideTooltip();
      }
    },
    clickShowTooltip() {
      if (this.trigger === "click") {
        if (this.show) {
          this.hideTooltip();
        } else {
          this.showTooltip();
        }
      }
    },
    showTooltip() {
      if (this.disabled) {
        return;
      }
      this.show = true;
    },
    hideTooltip() {
      if (this.disabled) {
        return;
      }
      this.show = false;
    }
  }
};
const _hoisted_1$c = ["data-id"];
const _hoisted_2$c = ["data-id"];
const _hoisted_3$a = ["textContent"];
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Layer = resolveComponent("Layer");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-tooltip", $props.block ? "mvi-tooltip-block" : ""]),
    "data-id": "mvi-tooltip-" + $setup.uid
  }, [
    createElementVNode("div", {
      onClick: _cache[0] || (_cache[0] = (...args) => $options.clickShowTooltip && $options.clickShowTooltip(...args)),
      onMouseenter: _cache[1] || (_cache[1] = (...args) => $options.hoverShowTooltip && $options.hoverShowTooltip(...args)),
      onMouseleave: _cache[2] || (_cache[2] = (...args) => $options.hoverHideToolTip && $options.hoverHideToolTip(...args)),
      class: "mvi-tooltip-toggle",
      ref: "toggle",
      "data-id": "mvi-tooltip-target-" + $setup.uid
    }, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 40, _hoisted_2$c),
    createVNode(_component_Layer, {
      modelValue: $data.show,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.show = $event),
      offset: $props.offset,
      background: $props.color,
      border: "",
      "border-color": $props.borderColor,
      closable: "",
      "show-triangle": $props.showTriangle,
      "z-index": $props.zIndex,
      target: `[data-id='mvi-tooltip-target-${$setup.uid}']`,
      root: `[data-id='mvi-tooltip-${$setup.uid}']`,
      placement: $props.placement,
      fixed: $props.fixed,
      "fixed-auto": $props.fixedAuto,
      width: $props.width,
      timeout: $props.timeout,
      animation: $props.animation || "mvi-tooltip",
      shadow: false
    }, {
      default: withCtx(() => [
        createElementVNode("div", {
          class: "mvi-tooltip-content",
          ref: "content",
          style: normalizeStyle($options.contentStyle)
        }, [
          _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", {
            key: 1,
            textContent: toDisplayString($props.title)
          }, null, 8, _hoisted_3$a))
        ], 4)
      ]),
      _: 3
    }, 8, ["modelValue", "offset", "background", "border-color", "show-triangle", "z-index", "target", "root", "placement", "fixed", "fixed-auto", "width", "timeout", "animation"])
  ], 10, _hoisted_1$c);
}
const Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k], ["__scopeId", "data-v-24f19bcb"]]);
Tooltip.install = (app) => {
  app.component(Tooltip.name, Tooltip);
};
const colorPicker_vue_vue_type_style_index_0_scoped_3a769501_lang = "";
const _sfc_main$j = {
  name: "m-color-picker",
  data() {
    return {
      hsv: new Array(3),
      opacity: 1,
      rgb: new Array(3),
      drag: false,
      isDrag: false,
      panelDrag: null,
      hueDrag: null,
      alphaDrag: null,
      panelProp: null
    };
  },
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: String,
      default: "#ff0000"
    },
    showAlpha: {
      type: Boolean,
      default: true
    },
    hex: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    modelValue(newValue) {
      if (this.drag) {
        return;
      }
      this.initSet();
    },
    showAlpha(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.setDragsAndProps();
        });
      }
    }
  },
  mounted() {
    this.setDragsAndProps();
    this.initSet();
  },
  methods: {
    setDragsAndProps() {
      if (!this.panelProp) {
        this.panelProp = new Prop$1(this.$refs.panel, 0.7);
        this.panelProp.init();
      }
      if (!this.panelDrag) {
        this.panelDrag = new Drag$1(this.$refs.panelSlide, {
          container: this.$refs.panel,
          mode: "on",
          draggableX: true,
          draggableY: true,
          cursor: false,
          beforedrag: () => {
            this.drag = true;
            this.isDrag = true;
          },
          drag: () => {
            this.setColorBySlides();
          },
          dragged: () => {
            this.drag = false;
            this.$nextTick(() => {
              setTimeout(() => {
                this.isDrag = false;
              }, 10);
            });
          }
        });
        this.panelDrag.init();
      }
      if (!this.hueDrag) {
        this.hueDrag = new Drag$1(this.$refs.hueSlide, {
          container: this.$refs.hue,
          mode: "on",
          draggableX: true,
          draggableY: false,
          cursor: false,
          beforedrag: () => {
            this.drag = true;
            this.isDrag = true;
          },
          drag: () => {
            this.setColorBySlides();
          },
          dragged: () => {
            this.drag = false;
            this.$nextTick(() => {
              setTimeout(() => {
                this.isDrag = false;
              }, 10);
            });
          }
        });
        this.hueDrag.init();
      }
      if (this.showAlpha && !this.hex && !this.alphaDrag) {
        this.alphaDrag = new Drag$1(this.$refs.alphaSlide, {
          container: this.$refs.alpha,
          mode: "on",
          draggableX: true,
          draggableY: false,
          cursor: false,
          beforedrag: () => {
            this.drag = true;
            this.isDrag = true;
          },
          drag: () => {
            this.setColorBySlides();
          },
          dragged: () => {
            this.drag = false;
            this.$nextTick(() => {
              setTimeout(() => {
                this.isDrag = false;
              }, 10);
            });
          }
        });
        this.alphaDrag.init();
      }
    },
    clickPanelSetColor(e) {
      if (this.isDrag) {
        return;
      }
      this.drag = true;
      this.$refs.panelSlide.style.left = e.offsetX - this.$refs.panelSlide.offsetWidth / 2 + "px";
      this.$refs.panelSlide.style.top = e.offsetY - this.$refs.panelSlide.offsetHeight / 2 + "px";
      this.setColorBySlides().then(() => {
        this.drag = false;
      });
    },
    clickHueSetColor(e) {
      if (this.isDrag) {
        return;
      }
      this.drag = true;
      this.$refs.hueSlide.style.left = e.offsetX - this.$refs.hueSlide.offsetWidth / 2 + "px";
      this.setColorBySlides().then(() => {
        this.drag = false;
      });
    },
    clickAlphaSetColor(e) {
      if (this.isDrag) {
        return;
      }
      this.drag = true;
      this.$refs.alphaSlide.style.left = e.offsetX - this.$refs.alphaSlide.offsetWidth / 2 + "px";
      this.setColorBySlides().then(() => {
        this.drag = false;
      });
    },
    initSet() {
      if (this.drag) {
        return;
      }
      if (this.modelValue && Dap.common.matchingText(this.modelValue, "hex")) {
        this.rgb = Dap.color.hex2rgb(this.modelValue);
        this.hsv = Dap.color.rgb2hsv(this.rgb);
        this.opacity = 1;
      } else {
        try {
          let first = this.modelValue.indexOf("(");
          let last = this.modelValue.lastIndexOf(")");
          let str = this.modelValue.substring(first + 1, last);
          let arry = str.split(",");
          if (arry.length < 3) {
            throw new Error(
              "Color values are not RGB (RGBA) format and hexadecimal format"
            );
          }
          this.rgb = [
            Number(arry[0]),
            Number(arry[1]),
            Number(arry[2])
          ];
          if (arry.length == 4) {
            this.opacity = arry[3];
          } else {
            this.opacity = 1;
          }
          this.hsv = Dap.color.rgb2hsv(this.rgb);
          if (this.hex) {
            this.$emit(
              "update:modelValue",
              Dap.color.rgb2hex(this.rgb)
            );
          }
        } catch (e) {
          throw new Error(
            "Color values are not RGB (RGBA) format and hexadecimal format"
          );
        }
      }
      this.setSlidesByColor();
    },
    setSlidesByColor() {
      if (this.drag) {
        return;
      }
      let h2 = this.hsv[0];
      let s = this.hsv[1];
      let v = this.hsv[2];
      this.$refs.panelSlide.style.left = s / 100 * this.$refs.panel.offsetWidth - this.$refs.panelSlide.offsetWidth / 2 + "px";
      this.$refs.panelSlide.style.top = (1 - v / 100) * this.$refs.panel.offsetHeight - this.$refs.panelSlide.offsetHeight / 2 + "px";
      this.$refs.hueSlide.style.left = h2 / 360 * this.$refs.hue.offsetWidth - this.$refs.hueSlide.offsetWidth / 2 + "px";
      let sv_rgb = Dap.color.hsv2rgb([h2, 100, 100]);
      this.$refs.panel.style.background = "rgba(" + sv_rgb[0] + "," + sv_rgb[1] + "," + sv_rgb[2] + "," + this.opacity + ")";
      if (this.$refs.alphaSlide && this.$refs.alpha && this.$refs.bg) {
        this.$refs.alphaSlide.style.left = this.opacity * this.$refs.alpha.offsetWidth - this.$refs.alphaSlide.offsetWidth / 2 + "px";
        this.$refs.bg.style.background = "linear-gradient(to right, transparent 0%,rgb(" + sv_rgb[0] + "," + sv_rgb[1] + "," + sv_rgb[2] + ") 100%)";
      }
    },
    setColorBySlides() {
      return new Promise((resolve) => {
        let placementSV = Dap.element.getElementPoint(
          this.$refs.panelSlide,
          this.$refs.panel
        );
        let placementHue = Dap.element.getElementPoint(
          this.$refs.hueSlide,
          this.$refs.hue
        );
        this.hsv[1] = Math.round(
          (placementSV.left + this.$refs.panelSlide.offsetWidth / 2) / this.$refs.panel.offsetWidth * 100
        );
        this.hsv[2] = Math.round(
          (1 - (placementSV.top + this.$refs.panelSlide.offsetHeight / 2) / this.$refs.panel.offsetHeight) * 100
        );
        this.hsv[0] = Math.round(
          (placementHue.left + this.$refs.hueSlide.offsetWidth / 2) / this.$refs.hue.offsetWidth * 360
        );
        this.rgb = Dap.color.hsv2rgb(this.hsv);
        let sv_rgb = Dap.color.hsv2rgb([this.hsv[0], 100, 100]);
        this.$refs.panel.style.background = "rgba(" + sv_rgb[0] + "," + sv_rgb[1] + "," + sv_rgb[2] + "," + this.opacity + ")";
        let placementAlpha = null;
        if (this.$refs.alphaSlide && this.$refs.alpha && this.$refs.bg) {
          placementAlpha = Dap.element.getElementPoint(
            this.$refs.alphaSlide,
            this.$refs.alpha
          );
          this.opacity = Math.round(
            (placementAlpha.left + this.$refs.alphaSlide.offsetWidth / 2) / this.$refs.alpha.offsetWidth * 100
          ) / 100;
          if (this.opacity >= 1) {
            this.opacity = 1;
          }
          if (this.opacity <= 0) {
            this.opacity = 0;
          }
          this.$refs.bg.style.background = "linear-gradient(to right, transparent 0%,rgb(" + sv_rgb[0] + "," + sv_rgb[1] + "," + sv_rgb[2] + ") 100%)";
        }
        if (this.opacity == 1) {
          let value = `rgb(${this.rgb.toString()})`;
          if (this.hex) {
            value = Dap.color.rgb2hex(this.rgb);
          }
          this.$emit("update:modelValue", value);
          this.$emit("change", {
            hex: Dap.color.rgb2hex(this.rgb),
            rgb: this.rgb,
            opacity: this.opacity,
            hsv: this.hsv
          });
        } else {
          let value = `rgba(${this.rgb.toString()},${this.opacity})`;
          if (this.hex) {
            value = Dap.color.rgb2hex(this.rgb);
          }
          this.$emit("update:modelValue", value);
          this.$emit("change", {
            hex: Dap.color.rgb2hex(this.rgb),
            rgb: this.rgb,
            opacity: this.opacity,
            hsv: this.hsv
          });
        }
        this.$nextTick(() => {
          resolve();
        });
      });
    }
  },
  beforeUnmount() {
    if (this.panelDrag) {
      this.panelDrag._setOff();
    }
    if (this.hueDrag) {
      this.hueDrag._setOff();
    }
    if (this.alphaDrag) {
      this.alphaDrag._setOff();
    }
    if (this.panelProp) {
      this.panelProp._setOff();
    }
  }
};
const _hoisted_1$b = { class: "mvi-colorPicker" };
const _hoisted_2$b = {
  ref: "panelSlide",
  class: "mvi-colorPicker-panel-slide"
};
const _hoisted_3$9 = {
  ref: "hueSlide",
  class: "mvi-colorPicker-hue-slide"
};
const _hoisted_4$7 = {
  ref: "alphaSlide",
  class: "mvi-colorPicker-alpha-slide"
};
const _hoisted_5$6 = {
  ref: "bg",
  class: "mvi-colorPicker-alpha-background"
};
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$b, [
    createElementVNode("div", {
      ref: "panel",
      class: "mvi-colorPicker-panel",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.clickPanelSetColor && $options.clickPanelSetColor(...args))
    }, [
      createElementVNode("div", _hoisted_2$b, null, 512)
    ], 512),
    createElementVNode("div", {
      ref: "hue",
      class: "mvi-colorPicker-hue",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.clickHueSetColor && $options.clickHueSetColor(...args))
    }, [
      createElementVNode("div", _hoisted_3$9, null, 512)
    ], 512),
    $props.showAlpha && !$props.hex ? (openBlock(), createElementBlock("div", {
      key: 0,
      ref: "alpha",
      class: "mvi-colorPicker-alpha",
      onClick: _cache[2] || (_cache[2] = (...args) => $options.clickAlphaSetColor && $options.clickAlphaSetColor(...args))
    }, [
      createElementVNode("div", _hoisted_4$7, null, 512),
      createElementVNode("div", _hoisted_5$6, null, 512)
    ], 512)) : createCommentVNode("", true)
  ]);
}
const ColorPicker = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j], ["__scopeId", "data-v-3a769501"]]);
ColorPicker.install = (app) => {
  app.component(ColorPicker.name, ColorPicker);
};
const richImage_vue_vue_type_style_index_0_scoped_18dc5b2f_lang = "";
const _sfc_main$i = {
  name: "m-rich-image",
  data() {
    return {
      isDoubleTouch: false,
      touchDistance: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
      startX: 0,
      startY: 0,
      canMove: false,
      downPoint: null,
      upPoint: null,
      isTriggerDouble: false,
      timer: null,
      rotate: 0
    };
  },
  props: {
    src: {
      type: String,
      default: ""
    },
    loadIcon: {
      type: [String, Object],
      default: null
    },
    errorIcon: {
      type: [String, Object],
      default: null
    },
    maxScale: {
      type: Number,
      default: 3
    },
    minScale: {
      type: Number,
      default: 0.3
    }
  },
  emits: ["close-preview", "disable-swiper-touch", "enable-swiper-touch"],
  components: {
    Image
  },
  computed: {
    imgStyle() {
      return {
        transform: `scale(${this.scale}) translate(${this.translateX}px,${this.translateY}px) rotate(${this.rotate}deg)`
      };
    }
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  mounted() {
    Dap.event.on(
      document.documentElement,
      `mousemove.richImage_${this.uid}`,
      this.imageMouseMove
    );
    Dap.event.on(
      document.documentElement,
      `mouseup.richImage_${this.uid}`,
      this.imageMouseUp
    );
  },
  methods: {
    leftRotate() {
      this.translateX = 0;
      this.translateY = 0;
      this.scale = 1;
      this.rotate -= 90;
    },
    rightRotate() {
      this.translateX = 0;
      this.translateY = 0;
      this.scale = 1;
      this.rotate += 90;
    },
    scalePlus() {
      if (this.scale < this.maxScale) {
        this.translateX = 0;
        this.translateY = 0;
        this.scale = Dap.number.add(this.scale, 0.1);
      }
    },
    scaleMinus() {
      if (this.scale > this.minScale) {
        this.translateX = 0;
        this.translateY = 0;
        this.scale = Dap.number.subtract(this.scale, 0.1);
      }
    },
    scaleImageByWheel(event2) {
      if (event2.cancelable) {
        event2.preventDefault();
      }
      let deltaY = event2.wheelDeltaY || -event2.deltaY;
      if (deltaY > 0) {
        this.scalePlus();
      } else {
        this.scaleMinus();
      }
    },
    scaleImageByTouch(type, event2) {
      if (type == 0) {
        this.isTriggerDouble = false;
        if (event2.touches.length == 2) {
          this.disableSwiperTouch();
          this.isDoubleTouch = true;
          this.canMove = false;
          this.touchDistance = this.getDistance(
            event2.touches[0],
            event2.touches[1]
          );
        } else {
          this.isDoubleTouch = false;
          if (this.scale > 1) {
            this.disableSwiperTouch();
            this.startX = event2.targetTouches[0].pageX;
            this.startY = event2.targetTouches[0].pageY;
            this.canMove = true;
          }
        }
      } else if (type == 1) {
        if (event2.touches.length == 2 && this.isDoubleTouch) {
          if (event2.cancelable) {
            event2.preventDefault();
          }
          let distance = this.getDistance(
            event2.touches[0],
            event2.touches[1]
          );
          if (distance < this.touchDistance) {
            if (this.scale > this.minScale) {
              this.translateX = 0;
              this.translateY = 0;
              this.scale = Dap.number.add(
                this.scale,
                Dap.number.divide(
                  Dap.number.subtract(
                    distance,
                    this.touchDistance
                  ),
                  this.$el.offsetWidth
                )
              );
            }
          } else {
            if (this.scale < this.maxScale) {
              this.translateX = 0;
              this.translateY = 0;
              this.scale = Dap.number.add(
                this.scale,
                Dap.number.divide(
                  Dap.number.subtract(
                    distance,
                    this.touchDistance
                  ),
                  this.$el.offsetWidth
                )
              );
            }
          }
          this.touchDistance = distance;
        } else {
          if (event2.cancelable) {
            event2.preventDefault();
          }
          let endX = event2.targetTouches[0].pageX;
          let endY = event2.targetTouches[0].pageY;
          if (this.canMove) {
            this.imageTranslate(endX, endY);
          }
        }
      } else if (type == 2) {
        if (this.isDoubleTouch) {
          if (this.scale < 1) {
            this.doTransition(() => {
              this.scale = 1;
            });
          }
          this.isTriggerDouble = true;
          this.isDoubleTouch = false;
          this.enableSwiperTouch();
        } else {
          if (this.canMove && !this.isTriggerDouble) {
            this.imageTranslateEnd();
          }
        }
      }
    },
    getDistance(p1, p2) {
      let x = p2.pageX - p1.pageX;
      let y = p2.pageY - p1.pageY;
      return Math.sqrt(x * x + y * y);
    },
    reset() {
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;
      this.rotate = 0;
      this.enableSwiperTouch();
    },
    judgeClose(index, event2) {
      if (index == 0) {
        this.downPoint = {
          x: event2.pageX,
          y: event2.pageY
        };
      } else if (index == 1) {
        this.upPoint = {
          x: event2.pageX,
          y: event2.pageY
        };
      }
    },
    closePreview() {
      if (this.downPoint && this.upPoint && this.downPoint.x == this.upPoint.x && this.downPoint.y == this.upPoint.y) {
        this.$emit("close-preview");
      }
    },
    imageMouseDown(event2) {
      if (this.scale <= 1) {
        return;
      }
      this.disableSwiperTouch();
      this.startX = event2.pageX;
      this.startY = event2.pageY;
      this.canMove = true;
    },
    imageMouseMove(event2) {
      if (event2.cancelable) {
        event2.preventDefault();
      }
      let endX = event2.pageX;
      let endY = event2.pageY;
      if (this.canMove) {
        this.imageTranslate(endX, endY);
      }
    },
    imageMouseUp(event2) {
      if (this.canMove) {
        this.imageTranslateEnd();
      }
    },
    doTransition(callback) {
      this.$refs.img.$el.style.transition = "transform 300ms";
      this.$refs.img.$el.style.webkitTransition = "transform 300ms";
      this.$refs.img.$el.offsetWidth;
      callback();
      setTimeout(() => {
        this.$refs.img.$el.style.transition = "";
        this.$refs.img.$el.style.webkitTransition = "";
        this.$refs.img.$el.offsetWidth;
      }, 300);
    },
    imageTranslate(endX, endY) {
      let moveX = Dap.number.divide(endX - this.startX, 2);
      let moveY = Dap.number.divide(endY - this.startY, 2);
      const placement = Dap.element.getElementBounding(this.$refs.img.$el);
      if (moveX > 0 && placement.left >= 0) {
        return;
      }
      if (moveX < 0 && placement.right >= 0) {
        return;
      }
      if (moveY > 0 && placement.top >= 0) {
        return;
      }
      if (moveY < 0 && placement.bottom >= 0) {
        return;
      }
      this.translateX = this.translateX + moveX;
      this.translateY = this.translateY + moveY;
      this.startX = endX;
      this.startY = endY;
    },
    imageTranslateEnd() {
      const placement = Dap.element.getElementBounding(this.$refs.img.$el);
      if (placement.left > 0) {
        this.doTransition(() => {
          this.translateX = this.translateX - placement.left;
        });
      }
      if (placement.top > 0) {
        this.doTransition(() => {
          this.translateY = this.translateY - placement.top;
        });
      }
      if (placement.right > 0) {
        this.doTransition(() => {
          this.translateX = this.translateX + placement.right;
        });
      }
      if (placement.bottom > 0) {
        this.doTransition(() => {
          this.translateY = this.translateY + placement.bottom;
        });
      }
      this.canMove = false;
      this.enableSwiperTouch();
    },
    disableSwiperTouch() {
      clearTimeout(this.timer);
      this.$emit("disable-swiper-touch");
    },
    enableSwiperTouch() {
      this.timer = setTimeout(() => {
        this.$emit("enable-swiper-touch");
      }, 100);
    }
  },
  beforeUnmount() {
    Dap.event.off(
      document.documentElement,
      `mousemove.richImage_${this.uid} mouseup.richImage_${this.uid}`
    );
  }
};
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Image = resolveComponent("Image");
  return openBlock(), createElementBlock("div", {
    class: "mvi-rich-image",
    onMousewheel: _cache[0] || (_cache[0] = (...args) => $options.scaleImageByWheel && $options.scaleImageByWheel(...args)),
    onTouchstart: _cache[1] || (_cache[1] = ($event) => $options.scaleImageByTouch(0, $event)),
    onTouchmove: _cache[2] || (_cache[2] = ($event) => $options.scaleImageByTouch(1, $event)),
    onTouchend: _cache[3] || (_cache[3] = ($event) => $options.scaleImageByTouch(2, $event)),
    onMousedown: _cache[4] || (_cache[4] = ($event) => $options.judgeClose(0, $event)),
    onMouseup: _cache[5] || (_cache[5] = ($event) => $options.judgeClose(1, $event)),
    onClick: _cache[6] || (_cache[6] = (...args) => $options.closePreview && $options.closePreview(...args))
  }, [
    createVNode(_component_Image, {
      ref: "img",
      fit: "response",
      onMousedown: $options.imageMouseDown,
      style: normalizeStyle($options.imgStyle),
      width: "100%",
      height: "100%",
      src: $props.src,
      "load-icon": $props.loadIcon,
      "error-icon": $props.errorIcon
    }, null, 8, ["onMousedown", "style", "src", "load-icon", "error-icon"])
  ], 32);
}
const RichImage = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i], ["__scopeId", "data-v-18dc5b2f"]]);
const imagePreview_vue_vue_type_style_index_0_scoped_421ce7b6_lang = "";
const _sfc_main$h = {
  name: "m-image-preview",
  data() {
    return {
      firstShow: false,
      enableTouch: true,
      imageRefs: []
    };
  },
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    images: {
      type: Array,
      default: function() {
        return [];
      }
    },
    descriptions: {
      type: Array,
      default: function() {
        return [];
      }
    },
    active: {
      type: Number,
      default: 0
    },
    mountEl: {
      type: String,
      default: null
    },
    showPage: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 5e3
    },
    fade: {
      type: Boolean,
      default: false
    },
    showControl: {
      type: Boolean,
      default: false
    },
    controlClass: {
      type: String,
      default: null
    },
    usePadding: {
      type: Boolean,
      default: false
    },
    errorIcon: {
      type: [String, Object],
      default: function() {
        return {
          size: "1rem"
        };
      }
    },
    loadIcon: {
      type: [String, Object],
      default: function() {
        return {
          size: "1rem"
        };
      }
    },
    useTools: {
      type: Boolean,
      default: false
    },
    maxScale: {
      type: Number,
      default: 3
    },
    minScale: {
      type: Number,
      default: 0.3
    }
  },
  computed: {
    $$el() {
      return this.$refs.overlay.$$el;
    }
  },
  components: {
    Overlay,
    Swiper,
    SwiperSlide,
    Icon,
    RichImage
  },
  methods: {
    resetImage(active) {
      this.imageRefs[active].reset();
    },
    plusImage(active) {
      this.imageRefs[active].scalePlus();
    },
    minusImage(active) {
      this.imageRefs[active].scaleMinus();
    },
    leftRotateImage(active) {
      this.imageRefs[active].leftRotate();
    },
    rightRotateImage(active) {
      this.imageRefs[active].rightRotate();
    },
    overlayShowing() {
      if (!this.firstShow) {
        this.firstShow = true;
      }
    },
    closeOverlay(e) {
      for (let richImage of this.imageRefs) {
        richImage.reset();
      }
      this.$emit("update:modelValue", false);
    },
    swiperChange(active) {
      for (let richImage of this.imageRefs) {
        richImage.reset();
      }
      this.$emit("change", active);
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-421ce7b6"), n = n(), popScopeId(), n);
const _hoisted_1$a = {
  key: 0,
  class: "mvi-image-preview-page"
};
const _hoisted_2$a = { key: 1 };
const _hoisted_3$8 = ["textContent"];
const _hoisted_4$6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", null, "/", -1));
const _hoisted_5$5 = ["textContent"];
const _hoisted_6$5 = {
  key: 1,
  class: "mvi-image-preview-footer"
};
const _hoisted_7$4 = {
  key: 0,
  class: "mvi-image-preview-tools"
};
const _hoisted_8$3 = ["textContent"];
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_RichImage = resolveComponent("RichImage");
  const _component_SwiperSlide = resolveComponent("SwiperSlide");
  const _component_Icon = resolveComponent("Icon");
  const _component_Swiper = resolveComponent("Swiper");
  const _component_Overlay = resolveComponent("Overlay");
  return openBlock(), createBlock(_component_Overlay, {
    ref: "overlay",
    "model-value": $props.modelValue,
    color: "#000",
    fade: false,
    onShowing: $options.overlayShowing,
    "z-index": $props.zIndex,
    "use-padding": $props.usePadding,
    mountEl: $props.mountEl
  }, {
    default: withCtx(() => [
      $data.firstShow ? (openBlock(), createBlock(_component_Swiper, {
        key: 0,
        class: "mvi-image-preview-swiper",
        "initial-slide": $props.active,
        "show-indicators": "",
        ref: "swiper",
        onChange: $options.swiperChange,
        "show-control": $props.showControl,
        fade: $props.fade,
        "control-class": $props.controlClass,
        touchable: $data.enableTouch
      }, {
        indicators: withCtx((data) => [
          $props.showPage ? (openBlock(), createElementBlock("div", _hoisted_1$a, [
            _ctx.$slots.page ? renderSlot(_ctx.$slots, "page", {
              key: 0,
              total: data.total,
              current: data.active
            }, void 0, true) : (openBlock(), createElementBlock("div", _hoisted_2$a, [
              createElementVNode("span", {
                textContent: toDisplayString(data.active + 1)
              }, null, 8, _hoisted_3$8),
              _hoisted_4$6,
              createElementVNode("span", {
                textContent: toDisplayString(data.total)
              }, null, 8, _hoisted_5$5)
            ]))
          ])) : createCommentVNode("", true),
          $props.useTools || _ctx.$slots.descriptions || $props.descriptions.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_6$5, [
            $props.useTools ? (openBlock(), createElementBlock("div", _hoisted_7$4, [
              createVNode(_component_Icon, {
                onClick: ($event) => $options.plusImage(data.active),
                class: "mvi-image-preview-tools-icon",
                type: "search-plus-o"
              }, null, 8, ["onClick"]),
              createVNode(_component_Icon, {
                onClick: ($event) => $options.minusImage(data.active),
                class: "mvi-image-preview-tools-icon",
                type: "search-minus-o"
              }, null, 8, ["onClick"]),
              createVNode(_component_Icon, {
                onClick: ($event) => $options.resetImage(data.active),
                class: "mvi-image-preview-tools-icon",
                type: "double-circle"
              }, null, 8, ["onClick"]),
              createVNode(_component_Icon, {
                onClick: ($event) => $options.leftRotateImage(data.active),
                class: "mvi-image-preview-tools-icon",
                type: "left-rotate"
              }, null, 8, ["onClick"]),
              createVNode(_component_Icon, {
                onClick: ($event) => $options.rightRotateImage(data.active),
                class: "mvi-image-preview-tools-icon",
                type: "right-rotate"
              }, null, 8, ["onClick"]),
              _ctx.$slots.tools ? renderSlot(_ctx.$slots, "tools", { key: 0 }, void 0, true) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            _ctx.$slots.descriptions || $props.descriptions.length > 0 ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(["mvi-image-preview-description", $props.useTools ? "mvi-image-preview-description-margin" : ""])
            }, [
              _ctx.$slots.descriptions ? renderSlot(_ctx.$slots, "descriptions", {
                key: 0,
                total: data.total,
                current: data.active
              }, void 0, true) : $props.descriptions.length > 0 ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: "mvi-image-preview-description-el",
                textContent: toDisplayString($props.descriptions[data.active])
              }, null, 8, _hoisted_8$3)) : createCommentVNode("", true)
            ], 2)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ]),
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.images, (item, index) => {
            return openBlock(), createBlock(_component_SwiperSlide, {
              key: "image-" + index,
              class: "mvi-preview-container"
            }, {
              default: withCtx(() => [
                createVNode(_component_RichImage, {
                  ref_for: true,
                  ref: (el) => $data.imageRefs[index] = el,
                  onClosePreview: $options.closeOverlay,
                  onDisableSwiperTouch: _cache[0] || (_cache[0] = ($event) => $data.enableTouch = false),
                  onEnableSwiperTouch: _cache[1] || (_cache[1] = ($event) => $data.enableTouch = true),
                  src: item,
                  "error-icon": $props.errorIcon,
                  "load-icon": $props.loadIcon,
                  "max-scale": $props.maxScale,
                  "min-scale": $props.minScale
                }, null, 8, ["onClosePreview", "src", "error-icon", "load-icon", "max-scale", "min-scale"])
              ]),
              _: 2
            }, 1024);
          }), 128))
        ]),
        _: 3
      }, 8, ["initial-slide", "onChange", "show-control", "fade", "control-class", "touchable"])) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["model-value", "onShowing", "z-index", "use-padding", "mountEl"]);
}
const ImagePreview = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__scopeId", "data-v-421ce7b6"]]);
ImagePreview.install = (app) => {
  app.component(ImagePreview.name, ImagePreview);
};
const page_vue_vue_type_style_index_0_scoped_7305faff_lang = "";
const _sfc_main$g = {
  name: "m-page",
  data() {
    return {
      el: null
    };
  },
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    },
    overNumber: {
      type: Number,
      default: 3,
      validator(value) {
        return value % 2 != 0;
      }
    },
    prevText: {
      type: String,
      default: null
    },
    nextText: {
      type: String,
      default: null
    },
    prevIcon: {
      type: [String, Object],
      default: null
    },
    nextIcon: {
      type: [String, Object],
      default: null
    },
    simple: {
      type: Boolean,
      default: false
    },
    firstText: {
      type: String,
      default: null
    },
    lastText: {
      type: String,
      default: null
    },
    firstIcon: {
      type: [Object, String],
      default: null
    },
    lastIcon: {
      type: [Object, String],
      default: null
    },
    color: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    pageStyle() {
      return (item) => {
        let style = {};
        if (this.modelValue == item) {
          if (this.el) {
            style.color = Dap.element.getCssStyle(
              this.el,
              "background-color"
            );
          }
          style.backgroundColor = this.color || "";
        } else {
          style.color = this.color || "";
        }
        return style;
      };
    },
    arr() {
      let arr = [];
      if (this.modelValue <= (this.overNumber - 1) / 2 + 1) {
        for (let i = 0; i < this.overNumber; i++) {
          arr.push(i + 1);
        }
      } else if (this.modelValue <= this.total - (this.overNumber - 1) / 2) {
        for (let i = 0; i < (this.overNumber - 1) / 2; i++) {
          arr.push(this.modelValue - ((this.overNumber - 1) / 2 - i));
        }
        arr.push(this.modelValue);
        for (let i = 0; i < (this.overNumber - 1) / 2; i++) {
          arr.push(this.modelValue + (i + 1));
        }
      } else {
        for (let i = 0; i < this.overNumber; i++) {
          arr.push(this.total - (this.overNumber - 1 - i));
        }
      }
      return arr;
    },
    firstIconType() {
      let type = "angle-double-left";
      if (Dap.common.isObject(this.firstIcon)) {
        if (typeof this.firstIcon.type == "string") {
          type = this.firstIcon.type;
        }
      } else if (typeof this.firstIcon == "string") {
        type = this.firstIcon;
      }
      return type;
    },
    firstIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.firstIcon)) {
        if (typeof this.firstIcon.url == "string") {
          url = this.firstIcon.url;
        }
      }
      return url;
    },
    firstIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.firstIcon)) {
        if (typeof this.firstIcon.spin == "boolean") {
          spin = this.firstIcon.spin;
        }
      }
      return spin;
    },
    firstIconSize() {
      let size = null;
      if (Dap.common.isObject(this.firstIcon)) {
        if (typeof this.firstIcon.size == "string") {
          size = this.firstIcon.size;
        }
      }
      return size;
    },
    firstIconColor() {
      let color = null;
      if (Dap.common.isObject(this.firstIcon)) {
        if (typeof this.firstIcon.color == "string") {
          color = this.firstIcon.color;
        }
      }
      return color;
    },
    lastIconType() {
      let type = "angle-double-right";
      if (Dap.common.isObject(this.lastIcon)) {
        if (typeof this.lastIcon.type == "string") {
          type = this.lastIcon.type;
        }
      } else if (typeof this.lastIcon == "string") {
        type = this.lastIcon;
      }
      return type;
    },
    lastIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.lastIcon)) {
        if (typeof this.lastIcon.url == "string") {
          url = this.lastIcon.url;
        }
      }
      return url;
    },
    lastIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.lastIcon)) {
        if (typeof this.lastIcon.spin == "boolean") {
          spin = this.lastIcon.spin;
        }
      }
      return spin;
    },
    lastIconSize() {
      let size = null;
      if (Dap.common.isObject(this.lastIcon)) {
        if (typeof this.lastIcon.size == "string") {
          size = this.lastIcon.size;
        }
      }
      return size;
    },
    lastIconColor() {
      let color = null;
      if (Dap.common.isObject(this.lastIcon)) {
        if (typeof this.lastIcon.color == "string") {
          color = this.lastIcon.color;
        }
      }
      return color;
    },
    prevIconType() {
      let type = "angle-left";
      if (Dap.common.isObject(this.prevIcon)) {
        if (typeof this.prevIcon.type == "string") {
          type = this.prevIcon.type;
        }
      } else if (typeof this.prevIcon == "string") {
        type = this.prevIcon;
      }
      return type;
    },
    prevIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.prevIcon)) {
        if (typeof this.prevIcon.url == "string") {
          url = this.prevIcon.url;
        }
      }
      return url;
    },
    prevIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.prevIcon)) {
        if (typeof this.prevIcon.spin == "boolean") {
          spin = this.prevIcon.spin;
        }
      }
      return spin;
    },
    prevIconSize() {
      let size = null;
      if (Dap.common.isObject(this.prevIcon)) {
        if (typeof this.prevIcon.size == "string") {
          size = this.prevIcon.size;
        }
      }
      return size;
    },
    prevIconColor() {
      let color = null;
      if (Dap.common.isObject(this.prevIcon)) {
        if (typeof this.prevIcon.color == "string") {
          color = this.prevIcon.color;
        }
      }
      return color;
    },
    nextIconType() {
      let type = "angle-right";
      if (Dap.common.isObject(this.nextIcon)) {
        if (typeof this.nextIcon.type == "string") {
          type = this.nextIcon.type;
        }
      } else if (typeof this.nextIcon == "string") {
        type = this.nextIcon;
      }
      return type;
    },
    nextIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.nextIcon)) {
        if (typeof this.nextIcon.url == "string") {
          url = this.nextIcon.url;
        }
      }
      return url;
    },
    nextIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.nextIcon)) {
        if (typeof this.nextIcon.spin == "boolean") {
          spin = this.nextIcon.spin;
        }
      }
      return spin;
    },
    nextIconSize() {
      let size = null;
      if (Dap.common.isObject(this.nextIcon)) {
        if (typeof this.nextIcon.size == "string") {
          size = this.nextIcon.size;
        }
      }
      return size;
    },
    nextIconColor() {
      let color = null;
      if (Dap.common.isObject(this.nextIcon)) {
        if (typeof this.nextIcon.color == "string") {
          color = this.nextIcon.color;
        }
      }
      return color;
    }
  },
  components: {
    Icon
  },
  mounted() {
    this.el = this.$el;
  },
  methods: {
    pagePrev() {
      if (this.modelValue == 1) {
        return;
      }
      let page = this.modelValue - 1;
      this.$emit("update:modelValue", page);
      this.$emit("change", page);
    },
    pageNext() {
      if (this.modelValue == this.total) {
        return;
      }
      let page = this.modelValue + 1;
      this.$emit("update:modelValue", page);
      this.$emit("change", page);
    },
    pageFirst() {
      if (this.modelValue == 1) {
        return;
      }
      this.$emit("update:modelValue", 1);
      this.$emit("change", 1);
    },
    pageLast() {
      if (this.modelValue == this.total) {
        return;
      }
      this.$emit("update:modelValue", this.total);
      this.$emit("change", this.total);
    },
    toPage(page) {
      if (this.modelValue == page) {
        return;
      }
      if (page >= this.total) {
        page = this.total;
      }
      if (page <= 1) {
        page = 1;
      }
      this.$emit("update:modelValue", page);
      this.$emit("change", page);
    }
  }
};
const _hoisted_1$9 = { class: "mvi-page" };
const _hoisted_2$9 = ["disabled"];
const _hoisted_3$7 = ["textContent"];
const _hoisted_4$5 = ["disabled"];
const _hoisted_5$4 = ["textContent"];
const _hoisted_6$4 = { class: "mvi-page-numbers" };
const _hoisted_7$3 = {
  key: 0,
  class: "mvi-page-numbers-simple"
};
const _hoisted_8$2 = {
  key: 1,
  class: "mvi-page-numbers-items"
};
const _hoisted_9$2 = ["textContent", "onClick"];
const _hoisted_10$2 = ["textContent", "onClick"];
const _hoisted_11$2 = ["disabled"];
const _hoisted_12$2 = ["textContent"];
const _hoisted_13$2 = ["disabled"];
const _hoisted_14$2 = ["textContent"];
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", _hoisted_1$9, [
    $props.firstText || $options.firstIconType || $options.firstIconUrl ? (openBlock(), createElementBlock("div", {
      key: 0,
      disabled: $props.modelValue == 1 || null,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.pageFirst && $options.pageFirst(...args)),
      class: normalizeClass(["mvi-page-first", $props.active && $props.modelValue != 1 ? "mvi-page-active" : ""]),
      style: normalizeStyle({ color: $props.modelValue == 1 ? "" : $props.color || "" })
    }, [
      $options.firstIconType || $options.firstIconUrl ? (openBlock(), createBlock(_component_Icon, {
        key: 0,
        class: normalizeClass(["mvi-page-icon", $props.firstText ? "mvi-page-margin-right" : ""]),
        type: $options.firstIconType,
        url: $options.firstIconUrl,
        spin: $options.firstIconSpin,
        size: $options.firstIconSize,
        color: $options.firstIconColor
      }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
      $props.firstText ? (openBlock(), createElementBlock("span", {
        key: 1,
        textContent: toDisplayString($props.firstText)
      }, null, 8, _hoisted_3$7)) : createCommentVNode("", true)
    ], 14, _hoisted_2$9)) : createCommentVNode("", true),
    $props.prevText || $options.prevIconType || $options.prevIconUrl ? (openBlock(), createElementBlock("div", {
      key: 1,
      disabled: $props.modelValue == 1 || null,
      onClick: _cache[1] || (_cache[1] = (...args) => $options.pagePrev && $options.pagePrev(...args)),
      class: normalizeClass(["mvi-page-prev", $props.active && $props.modelValue != 1 ? "mvi-page-active" : ""]),
      style: normalizeStyle({ color: $props.modelValue == 1 ? "" : $props.color || "" })
    }, [
      $options.prevIconType || $options.prevIconUrl ? (openBlock(), createBlock(_component_Icon, {
        key: 0,
        class: normalizeClass(["mvi-page-icon", $props.prevText ? "mvi-page-margin-right" : ""]),
        type: $options.prevIconType,
        url: $options.prevIconUrl,
        size: $options.prevIconSize,
        spin: $options.prevIconSpin,
        color: $options.prevIconColor
      }, null, 8, ["class", "type", "url", "size", "spin", "color"])) : createCommentVNode("", true),
      $props.prevText ? (openBlock(), createElementBlock("span", {
        key: 1,
        textContent: toDisplayString($props.prevText)
      }, null, 8, _hoisted_5$4)) : createCommentVNode("", true)
    ], 14, _hoisted_4$5)) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_6$4, [
      $props.simple ? (openBlock(), createElementBlock("div", _hoisted_7$3, toDisplayString($props.modelValue) + " / " + toDisplayString($props.total), 1)) : (openBlock(), createElementBlock("div", _hoisted_8$2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.total, (item, index) => {
          return openBlock(), createElementBlock(Fragment, null, [
            $props.total <= $props.overNumber ? (openBlock(), createElementBlock("div", {
              class: normalizeClass(["mvi-page-numbers-item", $props.modelValue == item ? "mvi-page-number-active" : "", $props.active && $props.modelValue != item ? "mvi-page-active" : ""]),
              key: "page-" + index,
              textContent: toDisplayString(item),
              onClick: ($event) => $options.toPage(item),
              style: normalizeStyle($options.pageStyle(item))
            }, null, 14, _hoisted_9$2)) : createCommentVNode("", true)
          ], 64);
        }), 256)),
        $props.total > $props.overNumber && $props.modelValue > ($props.overNumber - 1) / 2 + 1 ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["mvi-page-numbers-item", $props.active ? "mvi-page-active" : ""]),
          onClick: _cache[2] || (_cache[2] = ($event) => $options.toPage($props.modelValue - ($props.overNumber - 1))),
          style: normalizeStyle({ color: $props.color || "" })
        }, "...", 6)) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.arr, (item, index) => {
          return openBlock(), createElementBlock(Fragment, null, [
            $props.total > $props.overNumber ? (openBlock(), createElementBlock("div", {
              class: normalizeClass(["mvi-page-numbers-item", $props.modelValue == item ? "mvi-page-number-active" : "", $props.active && $props.modelValue != item ? "mvi-page-active" : ""]),
              key: "page2-" + index,
              textContent: toDisplayString(item),
              onClick: ($event) => $options.toPage(item),
              style: normalizeStyle($options.pageStyle(item))
            }, null, 14, _hoisted_10$2)) : createCommentVNode("", true)
          ], 64);
        }), 256)),
        $props.total > $props.overNumber && $props.modelValue < $props.total - ($props.overNumber - 1) / 2 ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["mvi-page-numbers-item", $props.active ? "mvi-page-active" : ""]),
          onClick: _cache[3] || (_cache[3] = ($event) => $options.toPage($props.modelValue + ($props.overNumber - 1))),
          style: normalizeStyle({ color: $props.color || "" })
        }, "...", 6)) : createCommentVNode("", true)
      ]))
    ]),
    $props.nextText || $options.nextIconType || $options.nextIconUrl ? (openBlock(), createElementBlock("div", {
      key: 2,
      disabled: $props.modelValue == $props.total || null,
      onClick: _cache[4] || (_cache[4] = (...args) => $options.pageNext && $options.pageNext(...args)),
      class: normalizeClass(["mvi-page-next", $props.active && $props.modelValue != $props.total ? "mvi-page-active" : ""]),
      style: normalizeStyle({ color: $props.modelValue == $props.total ? "" : $props.color || "" })
    }, [
      $props.nextText ? (openBlock(), createElementBlock("span", {
        key: 0,
        textContent: toDisplayString($props.nextText)
      }, null, 8, _hoisted_12$2)) : createCommentVNode("", true),
      $options.nextIconType || $options.nextIconUrl ? (openBlock(), createBlock(_component_Icon, {
        key: 1,
        class: normalizeClass(["mvi-page-icon", $props.nextText ? "mvi-page-margin-left" : ""]),
        type: $options.nextIconType,
        url: $options.nextIconUrl,
        size: $options.nextIconSize,
        spin: $options.nextIconSpin,
        color: $options.nextIconColor
      }, null, 8, ["class", "type", "url", "size", "spin", "color"])) : createCommentVNode("", true)
    ], 14, _hoisted_11$2)) : createCommentVNode("", true),
    $props.lastText || $options.lastIconType || $options.lastIconUrl ? (openBlock(), createElementBlock("div", {
      key: 3,
      disabled: $props.modelValue == $props.total || null,
      onClick: _cache[5] || (_cache[5] = (...args) => $options.pageLast && $options.pageLast(...args)),
      class: normalizeClass(["mvi-page-last", $props.active && $props.modelValue != $props.total ? "mvi-page-active" : ""]),
      style: normalizeStyle({ color: $props.modelValue == $props.total ? "" : $props.color || "" })
    }, [
      $props.lastText ? (openBlock(), createElementBlock("span", {
        key: 0,
        textContent: toDisplayString($props.lastText)
      }, null, 8, _hoisted_14$2)) : createCommentVNode("", true),
      $options.lastIconType || $options.lastIconUrl ? (openBlock(), createBlock(_component_Icon, {
        key: 1,
        class: normalizeClass(["mvi-page-icon", $props.lastText ? "mvi-page-margin-left" : ""]),
        type: $options.lastIconType,
        url: $options.lastIconUrl,
        size: $options.lastIconSize,
        spin: $options.lastIconSpin,
        color: $options.lastIconColor
      }, null, 8, ["class", "type", "url", "size", "spin", "color"])) : createCommentVNode("", true)
    ], 14, _hoisted_13$2)) : createCommentVNode("", true)
  ]);
}
const Page = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__scopeId", "data-v-7305faff"]]);
Page.install = (app) => {
  app.component(Page.name, Page);
};
const loadingBar_vue_vue_type_style_index_0_scoped_3cce1aab_lang = "";
const _sfc_main$f = {
  name: "m-loading-bar",
  data() {
    return {
      opacityTime: 300,
      widthEnterTime: 4e3,
      widthLeaveTime: 2e3,
      timer: null,
      hasTriggerLeave: false
    };
  },
  props: {
    color: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: null
    },
    remove: {
      type: Function,
      default: function() {
        return function() {
        };
      }
    },
    init: {
      type: Function,
      default: function() {
        return function() {
        };
      }
    }
  },
  computed: {
    computedColor() {
      if (typeof this.color == "string" && this.color) {
        return this.color;
      } else {
        return null;
      }
    },
    computedZIndex() {
      if (Dap.number.isNumber(this.zIndex)) {
        return this.zIndex;
      } else {
        return null;
      }
    },
    barStyle() {
      let style = {};
      if (this.computedColor) {
        style.background = this.computedColor;
      }
      if (this.computedZIndex) {
        style.zIndex = this.computedZIndex;
      }
      return style;
    }
  },
  mounted() {
    this.init(this);
    this.enter();
  },
  methods: {
    enter() {
      this.removeTransition();
      this.$refs.bar.style.width = 0;
      this.$refs.bar.offsetWidth;
      this.addTransition("enter");
      this.$refs.bar.style.width = window.innerWidth * 0.9 + "px";
      this.$refs.bar.style.opacity = 1;
    },
    leave() {
      if (this.hasTriggerLeave) {
        return;
      }
      this.hasTriggerLeave = true;
      this.addTransition("leave");
      this.$refs.bar.style.width = window.innerWidth + "px";
      this.$refs.bar.style.opacity = 0;
      this.timer = setTimeout(() => {
        this.remove();
      }, this.widthLeaveTime + this.opacityTime);
    },
    addTransition(type) {
      if (type == "enter") {
        this.$refs.bar.style.transition = `opacity ${this.opacityTime}ms linear, width ${this.widthEnterTime}ms ease-out`;
        this.$refs.bar.style.webkitTransition = `opacity ${this.opacityTime}ms linear, width ${this.widthEnterTime}ms ease-out`;
      } else if (type == "leave") {
        this.$refs.bar.style.transition = `opacity ${this.opacityTime}ms ${this.widthLeaveTime}ms linear, width ${this.widthLeaveTime}ms ease`;
        this.$refs.bar.style.webkitTransition = `opacity ${this.opacityTime}ms ${this.widthLeaveTime}ms linear, width ${this.widthLeaveTime}ms ease`;
      }
      this.$refs.bar.offsetWidth;
    },
    removeTransition() {
      this.$refs.bar.style.transition = "";
      this.$refs.bar.style.webkitTransition = "";
      this.$refs.bar.offsetWidth;
    }
  },
  beforeUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
};
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Teleport, { to: "body" }, [
    createElementVNode("div", {
      class: "mvi-loading-bar",
      ref: "bar",
      style: normalizeStyle($options.barStyle)
    }, null, 4)
  ]);
}
const LoadingBarComponent = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-3cce1aab"]]);
const LoadingBar = {
  initParams: (options) => {
    let opts = {};
    if (Dap.common.isObject(options)) {
      opts.color = options.color;
      opts.zIndex = options.zIndex;
    } else if (typeof options == "string") {
      opts.color = options;
    }
    return opts;
  },
  showLoadingBar: (options) => {
    return new Promise((resolve, reject) => {
      if (LoadingBar.$el && LoadingBar.$instance) {
        LoadingBar.$instance.unmount();
        LoadingBar.$el.remove();
      }
      let opts = LoadingBar.initParams(options);
      let mountNode = Dap.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(LoadingBarComponent, {
        ...opts,
        init: (vm) => {
          LoadingBar.$vm = vm;
        },
        remove: () => {
          instance.unmount();
          mountNode.remove();
          resolve();
        }
      });
      instance.mount(mountNode);
      LoadingBar.$el = mountNode;
      LoadingBar.$instance = instance;
    });
  },
  hideLoadingBar: () => {
    if (LoadingBar.$vm) {
      LoadingBar.$vm.leave();
    }
  },
  install: (app) => {
    app.config.globalProperties.$showLoadingBar = LoadingBar.showLoadingBar;
    app.provide("$showLoadingBar", LoadingBar.showLoadingBar);
    app.config.globalProperties.$hideLoadingBar = LoadingBar.hideLoadingBar;
    app.provide("$hideLoadingBar", LoadingBar.hideLoadingBar);
  }
};
const list_vue_vue_type_style_index_0_scoped_295abc00_lang = "";
const _sfc_main$e = {
  name: "m-list",
  emits: ["load", "update:loading", "update:error"],
  data() {
    return {
      scrollObj: null
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: "\u6B63\u5728\u52A0\u8F7D"
    },
    errorText: {
      type: String,
      default: "\u6570\u636E\u52A0\u8F7D\u5931\u8D25"
    },
    finishedText: {
      type: String,
      default: "\u6CA1\u6709\u66F4\u591A\u4E86"
    },
    immediateLoad: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: "\u70B9\u6211\u52A0\u8F7D\u66F4\u591A"
    }
  },
  mounted() {
    if (this.immediateLoad) {
      this.doLoad();
    }
  },
  methods: {
    initScrollBottom() {
      const el = this.getScrollEl(this.$el);
      if (!el) {
        return;
      }
      if (this.scrollObj) {
        return;
      }
      this.scrollObj = new Scroll$1(el, {
        bottom: () => {
          if (this.finished || this.loading || this.error) {
            return;
          }
          this.doLoad();
        }
      });
      this.scrollObj.init();
    },
    doLoad() {
      if (this.finished) {
        return;
      }
      this.$emit("update:loading", true);
      this.$emit("update:error", false);
      this.$emit("load");
    },
    getScrollEl(el) {
      if (!el) {
        return null;
      }
      if (Dap.element.getScrollHeight(el) > el.clientHeight) {
        return el;
      }
      return this.getScrollEl(el.parentNode);
    }
  }
};
const _hoisted_1$8 = { class: "mvi-list" };
const _hoisted_2$8 = {
  key: 0,
  class: "mvi-list-finished"
};
const _hoisted_3$6 = { key: 1 };
const _hoisted_4$4 = {
  key: 1,
  class: "mvi-list-loading"
};
const _hoisted_5$3 = { key: 1 };
const _hoisted_6$3 = { key: 1 };
const _hoisted_7$2 = { key: 1 };
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$8, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true),
    $props.finished ? (openBlock(), createElementBlock("div", _hoisted_2$8, [
      _ctx.$slots.finished ? renderSlot(_ctx.$slots, "finished", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_3$6, toDisplayString($props.finishedText), 1))
    ])) : $props.loading ? (openBlock(), createElementBlock("div", _hoisted_4$4, [
      _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_5$3, toDisplayString($props.loadingText), 1))
    ])) : $props.error ? (openBlock(), createElementBlock("div", {
      key: 2,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.doLoad && $options.doLoad(...args)),
      class: "mvi-list-error"
    }, [
      _ctx.$slots.error ? renderSlot(_ctx.$slots, "error", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_6$3, toDisplayString($props.errorText), 1))
    ])) : $props.content || _ctx.$slots.content ? (openBlock(), createElementBlock("div", {
      key: 3,
      onClick: _cache[1] || (_cache[1] = (...args) => $options.doLoad && $options.doLoad(...args)),
      class: "mvi-list-content"
    }, [
      _ctx.$slots.content ? renderSlot(_ctx.$slots, "content", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_7$2, toDisplayString($props.content), 1))
    ])) : createCommentVNode("", true)
  ]);
}
const List = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__scopeId", "data-v-295abc00"]]);
List.install = (app) => {
  app.component(List.name, List);
};
const skeleton_vue_vue_type_style_index_0_scoped_2cfb3641_lang = "";
const _sfc_main$d = {
  name: "m-skeleton",
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    rows: {
      type: Number,
      default: 1,
      validator(value) {
        return value > 0;
      }
    },
    rowWidth: {
      type: [String, Array],
      default: null
    },
    avatar: {
      type: Boolean,
      default: false
    },
    title: {
      type: Boolean,
      default: false
    },
    titleWidth: {
      type: String,
      default: null
    },
    animation: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    avatarSize: {
      type: String,
      default: null
    },
    avatarRound: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    avatarStyle() {
      let style = {};
      if (this.avatarSize) {
        style.width = this.avatarSize;
        style.height = this.avatarSize;
      }
      return style;
    },
    rowStyle() {
      return (index) => {
        let style = {};
        if (this.rowWidth && typeof this.rowWidth == "string") {
          style.width = this.rowWidth;
        } else if (Array.isArray(this.rowWidth)) {
          style.width = this.rowWidth[index] || "";
        }
        return style;
      };
    },
    titleStyle() {
      let style = {};
      if (this.titleWidth) {
        style.width = this.titleWidth;
      }
      return style;
    },
    rowsArray() {
      let arr = [];
      for (let i = 0; i < this.rows; i++) {
        arr.push(i);
      }
      return arr;
    }
  }
};
const _hoisted_1$7 = { class: "mvi-skeleton-container" };
const _hoisted_2$7 = {
  key: 0,
  class: "mvi-skeleton-avatar"
};
const _hoisted_3$5 = { class: "mvi-skeleton-rows" };
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    $props.loading ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["mvi-skeleton", $props.animation ? "mvi-skeleton-animation" : ""])
    }, [
      $props.avatar ? (openBlock(), createElementBlock("div", _hoisted_2$7, [
        createElementVNode("div", {
          class: normalizeClass(["mvi-skeleton-avatar-el", $props.avatarRound ? "mvi-skeleton-round" : ""]),
          style: normalizeStyle($options.avatarStyle)
        }, null, 6)
      ])) : createCommentVNode("", true),
      createElementVNode("div", _hoisted_3$5, [
        $props.title ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["mvi-skeleton-title", $props.round ? "mvi-skeleton-round" : ""]),
          style: normalizeStyle($options.titleStyle)
        }, null, 6)) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.rowsArray, (item) => {
          return openBlock(), createElementBlock("div", {
            style: normalizeStyle($options.rowStyle(item)),
            class: normalizeClass(["mvi-skeleton-row", $props.round ? "mvi-skeleton-round" : ""])
          }, null, 6);
        }), 256))
      ])
    ], 2)) : renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true)
  ]);
}
const Skeleton = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__scopeId", "data-v-2cfb3641"]]);
Skeleton.install = (app) => {
  app.component(Skeleton.name, Skeleton);
};
const sign_vue_vue_type_style_index_0_scoped_110489ac_lang = "";
const _sfc_main$c = {
  name: "m-sign",
  props: {
    color: {
      type: String,
      default: "#505050"
    },
    background: {
      type: String,
      default: "#fff"
    },
    width: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      drawing: false,
      inCanvas: false
    };
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    background() {
      this.clear();
    }
  },
  methods: {
    init() {
      this.$el.setAttribute(
        "width",
        Dap.element.getCssStyle(this.$el, "width")
      );
      this.$el.setAttribute(
        "height",
        Dap.element.getCssStyle(this.$el, "height")
      );
      this.clear();
      Dap.event.on(
        document.documentElement,
        `mousemove.sign_${this.uid}`,
        this.canvasMouseMove
      );
      Dap.event.on(
        document.documentElement,
        `mouseup.sign_${this.uid}`,
        this.canvasMouseUp
      );
    },
    canvasMouseDown(e) {
      this.drawing = true;
      this.inCanvas = true;
      const ctx = this.$el.getContext("2d");
      const rect = Dap.element.getElementBounding(this.$el);
      ctx.beginPath();
      ctx.moveTo(e.pageX - rect.left, e.pageY - rect.top);
    },
    canvasMouseMove(e) {
      if (this.drawing && this.inCanvas) {
        const ctx = this.$el.getContext("2d");
        const rect = Dap.element.getElementBounding(this.$el);
        ctx.lineTo(e.pageX - rect.left, e.pageY - rect.top);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.stroke();
      }
    },
    canvasMouseUp(e) {
      this.drawing = false;
      const ctx = this.$el.getContext("2d");
      ctx.closePath();
    },
    canvasMouseEnter(e) {
      if (this.drawing) {
        this.inCanvas = true;
        const ctx = this.$el.getContext("2d");
        const rect = Dap.element.getElementBounding(this.$el);
        ctx.beginPath();
        ctx.moveTo(e.pageX - rect.left, e.pageY - rect.top);
      }
    },
    canvasMouseLeave(e) {
      if (this.drawing) {
        const ctx = this.$el.getContext("2d");
        ctx.closePath();
        this.inCanvas = false;
      }
    },
    canvasTouchStart(e) {
      const ctx = this.$el.getContext("2d");
      const rect = Dap.element.getElementBounding(this.$el);
      ctx.beginPath();
      ctx.moveTo(
        e.targetTouches[0].pageX - rect.left,
        e.targetTouches[0].pageY - rect.top
      );
    },
    canvasTouchMove(e) {
      if (e.cancelable) {
        e.preventDefault();
      }
      const ctx = this.$el.getContext("2d");
      const rect = Dap.element.getElementBounding(this.$el);
      ctx.lineTo(
        e.targetTouches[0].pageX - rect.left,
        e.targetTouches[0].pageY - rect.top
      );
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.width;
      ctx.stroke();
    },
    canvasTouchEnd(e) {
      const ctx = this.$el.getContext("2d");
      ctx.closePath();
    },
    clear() {
      const ctx = this.$el.getContext("2d");
      ctx.beginPath();
      ctx.clearRect(0, 0, this.$el.width, this.$el.height);
      ctx.rect(0, 0, this.$el.width, this.$el.height);
      ctx.fillStyle = this.background;
      ctx.fill();
      ctx.closePath();
    },
    getImage() {
      this.$el.getContext("2d");
      const url = this.$el.toDataURL("image/png");
      return url;
    }
  },
  beforeUnmount() {
    Dap.event.off(
      document.documentElement,
      `mousemove.sign_${this.uid} mouseup.sign_${this.uid}`
    );
  }
};
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("canvas", {
    class: "mvi-sign",
    onMousedown: _cache[0] || (_cache[0] = (...args) => $options.canvasMouseDown && $options.canvasMouseDown(...args)),
    onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.canvasTouchStart && $options.canvasTouchStart(...args)),
    onTouchmove: _cache[2] || (_cache[2] = (...args) => $options.canvasTouchMove && $options.canvasTouchMove(...args)),
    onTouchend: _cache[3] || (_cache[3] = (...args) => $options.canvasTouchEnd && $options.canvasTouchEnd(...args)),
    onMouseleave: _cache[4] || (_cache[4] = (...args) => $options.canvasMouseLeave && $options.canvasMouseLeave(...args)),
    onMouseenter: _cache[5] || (_cache[5] = (...args) => $options.canvasMouseEnter && $options.canvasMouseEnter(...args))
  }, null, 32);
}
const Sign = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-110489ac"]]);
Sign.install = (app) => {
  app.component(Sign.name, Sign);
};
const select_vue_vue_type_style_index_0_scoped_933a54e9_lang = "";
const _sfc_main$b = {
  name: "m-select",
  emits: ["update:modelValue", "change", "clear"],
  data() {
    return {
      hover: false,
      focus: false,
      target: null
    };
  },
  props: {
    options: {
      type: Array,
      default: []
    },
    modelValue: {
      type: [Object, Number, String, Array],
      default: null
    },
    placeholder: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return ["small", "medium", "large"].includes(value);
      }
    },
    layerProps: {
      type: Object,
      default: function() {
        return {};
      }
    },
    height: {
      type: String,
      default: null
    },
    activeType: {
      type: String,
      default: "info",
      validator(value) {
        return ["info", "success", "warn", "primary", "error"].includes(
          value
        );
      }
    },
    activeColor: {
      type: String,
      default: null,
      validator(value) {
        return Dap.common.matchingText(value, "hex");
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: "caret-down"
    },
    name: {
      type: String,
      default: null
    },
    hoverClass: {
      type: String,
      default: null
    },
    round: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterMethod: {
      type: Function,
      default: null
    },
    showSelectIcon: {
      type: Boolean,
      default: true
    },
    selectedIcon: {
      type: [String, Object],
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  computed: {
    formData() {
      if (this.multiple && Array.isArray(this.modelValue)) {
        return this.modelValue.join(",");
      }
      return this.modelValue;
    },
    menuStyle() {
      let style = {};
      if (this.height) {
        style.maxHeight = this.height;
      }
      return style;
    },
    selectClass() {
      let cls = ["mvi-select", "mvi-select-" + this.size];
      if (this.round) {
        cls.push("mvi-select-round");
      } else if (this.square) {
        cls.push("mvi-select-square");
      }
      return cls;
    },
    targetClass() {
      let cls = ["mvi-select-target"];
      if (this.activeType && !this.activeColor && this.focus) {
        cls.push("mvi-select-" + this.activeType);
      }
      return cls;
    },
    targetStyle() {
      let style = {};
      if (this.activeColor && this.focus) {
        style.borderColor = this.activeColor;
        const rgb = Dap.color.hex2rgb(this.activeColor);
        style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
      }
      return style;
    },
    iconClass() {
      let cls = ["mvi-select-icon"];
      if (this.focus) {
        cls.push("mvi-select-active");
      }
      return cls;
    },
    selectLabel() {
      if (this.multiple) {
        let labels = [];
        this.options.forEach((item, index) => {
          if (Array.isArray(this.modelValue)) {
            let flag = this.modelValue.some((i) => {
              return Dap.common.equal(i, item.value);
            });
            if (flag) {
              labels.push(item.label);
            }
          }
        });
        if (typeof this.filterMethod == "function") {
          return this.filterMethod(labels);
        } else {
          return labels.join(" ");
        }
      } else {
        let label = "";
        this.options.forEach((item, index) => {
          if (Dap.common.equal(this.modelValue, item.value)) {
            label = item.label;
          }
        });
        if (typeof this.filterMethod == "function") {
          return this.filterMethod(label);
        } else {
          return label;
        }
      }
    },
    isSelect() {
      return (item) => {
        if (this.multiple) {
          let flag = this.modelValue.some((i) => {
            return Dap.common.equal(i, item.value);
          });
          return this.showSelectIcon && flag;
        }
        return false;
      };
    },
    selectedIconType() {
      let type = "success";
      if (Dap.common.isObject(this.selectedIcon)) {
        if (typeof this.selectedIcon.type == "string") {
          type = this.selectedIcon.type;
        }
      } else if (typeof this.selectedIcon == "string") {
        type = this.selectedIcon;
      }
      return type;
    },
    selectedIconSize() {
      let size = null;
      if (Dap.common.isObject(this.selectedIcon)) {
        if (typeof this.selectedIcon.size == "string") {
          size = this.selectedIcon.size;
        }
      }
      return size;
    },
    selectedIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.selectedIcon)) {
        if (typeof this.selectedIcon.url == "string") {
          url = this.selectedIcon.url;
        }
      }
      return url;
    },
    selectedIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.selectedIcon)) {
        if (typeof this.selectedIcon.spin == "boolean") {
          spin = this.selectedIcon.spin;
        }
      }
      return spin;
    },
    selectedIconColor() {
      let color = null;
      if (Dap.common.isObject(this.selectedIcon)) {
        if (typeof this.selectedIcon.color == "string") {
          color = this.selectedIcon.color;
        }
      }
      return color;
    },
    showClearIcon() {
      if (this.multiple) {
        if (this.modelValue.length != 0 && this.hover) {
          return true;
        }
        return false;
      } else {
        if (this.modelValue === "" || this.modelValue === null || this.modelValue === void 0 || !this.hover) {
          return false;
        }
        return true;
      }
    },
    layerRealProps() {
      return {
        placement: this.layerProps.placement ? this.layerProps.placement : "bottom-start",
        fixed: typeof this.layerProps.fixed == "boolean" ? this.layerProps.fixed : false,
        fixedAuto: typeof this.layerProps.fixedAuto == "boolean" ? this.layerProps.fixedAuto : false,
        width: this.layerProps.width,
        zIndex: Dap.number.isNumber(this.layerProps.zIndex) ? this.layerProps.zIndex : 400,
        offset: this.layerProps.offset ? this.layerProps.offset : "0.1rem",
        wrapperClass: this.layerProps.wrapperClass,
        animation: this.layerProps.animation,
        timeout: Dap.number.isNumber(this.layerProps.timeout) ? this.layerProps.timeout : 200,
        showTriangle: typeof this.layerProps.showTriangle == "boolean" ? this.layerProps.showTriangle : false,
        shadow: typeof this.layerProps.shadow == "boolean" ? this.layerProps.shadow : true,
        border: typeof this.layerProps.border == "boolean" ? this.layerProps.border : false,
        borderColor: this.layerProps.borderColor,
        background: this.layerProps.background
      };
    }
  },
  components: {
    Layer,
    Icon
  },
  methods: {
    hoverIn() {
      this.hover = true;
    },
    hoverOut() {
      this.hover = false;
    },
    doClear(e) {
      e.stopPropagation();
      if (this.disabled) {
        return;
      }
      if (!this.clearable) {
        return;
      }
      if (this.focus) {
        this.focus = false;
      }
      if (this.multiple) {
        this.$emit("update:modelValue", []);
        this.$emit("clear", []);
      } else {
        this.$emit("update:modelValue", null);
        this.$emit("clear", null);
      }
    },
    layerShow() {
      if (this.layerRealProps.width) {
        this.$refs.menu.style.width = this.layerRealProps.width;
      } else {
        this.$refs.menu.style.width = this.$refs.target.offsetWidth + "px";
      }
    },
    mouseEnter(e, item) {
      if (this.disabled || item.disabled) {
        return;
      }
      if (this.hoverClass) {
        Dap.element.addClass(e.currentTarget, this.hoverClass);
      }
    },
    mouseLeave(e, item) {
      if (this.disabled || item.disabled) {
        return;
      }
      if (this.hoverClass) {
        Dap.element.removeClass(e.currentTarget, this.hoverClass);
      }
    },
    optionClick(item) {
      if (this.disabled || item.disabled) {
        return;
      }
      if (this.multiple) {
        let arr = this.modelValue;
        if (!Array.isArray(arr)) {
          throw new TypeError("modelValue should be an array");
        }
        let flag = arr.some((tmp) => {
          return Dap.common.equal(tmp, item.value);
        });
        if (flag) {
          arr = arr.filter((tmp) => {
            return !Dap.common.equal(tmp, item.value);
          });
        } else {
          arr.push(item.value);
        }
        this.$emit("update:modelValue", arr);
        this.$emit(
          "change",
          this.options.filter((tmp) => {
            return arr.some((tmp2) => {
              return Dap.common.equal(tmp.value, tmp2);
            });
          })
        );
      } else {
        this.$emit("update:modelValue", item.value);
        this.$emit("change", item);
      }
      this.trigger();
    },
    trigger() {
      if (this.disabled) {
        return;
      }
      this.focus = !this.focus;
    }
  }
};
const _hoisted_1$6 = ["data-id", "disabled"];
const _hoisted_2$6 = ["data-id", "disabled"];
const _hoisted_3$4 = ["data-placeholder", "innerHTML"];
const _hoisted_4$3 = ["onClick", "onMouseenter", "onMouseleave", "disabled"];
const _hoisted_5$2 = ["innerHTML"];
const _hoisted_6$2 = ["value", "name"];
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Layer = resolveComponent("Layer");
  return openBlock(), createElementBlock("div", {
    "data-id": "mvi-select-" + $setup.uid,
    class: normalizeClass($options.selectClass),
    disabled: $props.disabled || null
  }, [
    createElementVNode("div", {
      onMouseenter: _cache[0] || (_cache[0] = (...args) => $options.hoverIn && $options.hoverIn(...args)),
      onMouseleave: _cache[1] || (_cache[1] = (...args) => $options.hoverOut && $options.hoverOut(...args)),
      "data-id": "mvi-select-target-" + $setup.uid,
      class: normalizeClass($options.targetClass),
      style: normalizeStyle($options.targetStyle),
      ref: "target",
      onClick: _cache[2] || (_cache[2] = (...args) => $options.trigger && $options.trigger(...args)),
      disabled: $props.disabled || null
    }, [
      createElementVNode("span", {
        class: normalizeClass(["mvi-select-label", $options.selectLabel ? "" : "mvi-select-label-placeholder"]),
        "data-placeholder": $props.placeholder,
        innerHTML: $options.selectLabel
      }, null, 10, _hoisted_3$4),
      $props.clearable ? withDirectives((openBlock(), createBlock(_component_Icon, {
        key: 0,
        onClick: $options.doClear,
        class: "mvi-clear-icon",
        type: "times-o"
      }, null, 8, ["onClick"])), [
        [vShow, $options.showClearIcon]
      ]) : createCommentVNode("", true),
      withDirectives(createVNode(_component_Icon, {
        class: normalizeClass($options.iconClass),
        type: $props.icon
      }, null, 8, ["class", "type"]), [
        [vShow, !$props.clearable || !$options.showClearIcon]
      ])
    ], 46, _hoisted_2$6),
    createVNode(_component_Layer, {
      modelValue: $data.focus,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.focus = $event),
      target: `[data-id='mvi-select-target-${$setup.uid}']`,
      root: `[data-id='mvi-select-${$setup.uid}']`,
      placement: $options.layerRealProps.placement,
      offset: $options.layerRealProps.offset,
      fixed: $options.layerRealProps.fixed,
      "fixed-auto": $options.layerRealProps.fixedAuto,
      "z-index": $options.layerRealProps.zIndex,
      closable: "",
      "show-triangle": $options.layerRealProps.showTriangle,
      "wrapper-class": $options.layerRealProps.wrapperClass,
      animation: $options.layerRealProps.animation,
      timeout: $options.layerRealProps.timeout,
      shadow: $options.layerRealProps.shadow,
      border: $options.layerRealProps.border,
      "border-color": $options.layerRealProps.borderColor,
      background: $options.layerRealProps.background,
      onShowing: $options.layerShow,
      ref: "layer"
    }, {
      default: withCtx(() => [
        createElementVNode("div", {
          class: "mvi-select-menu",
          ref: "menu",
          style: normalizeStyle($options.menuStyle)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.options, (item, index) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(["mvi-option", "mvi-option-" + $props.size]),
              onClick: ($event) => $options.optionClick(item),
              onMouseenter: ($event) => $options.mouseEnter($event, item),
              onMouseleave: ($event) => $options.mouseLeave($event, item),
              key: "mvi-select-option-" + index,
              disabled: item.disabled || null
            }, [
              createElementVNode("div", {
                class: "mvi-option-value",
                innerHTML: item.label
              }, null, 8, _hoisted_5$2),
              $options.isSelect(item) ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                type: $options.selectedIconType,
                spin: $options.selectedIconSpin,
                size: $options.selectedIconSize,
                url: $options.selectedIconUrl,
                color: $options.selectedIconColor
              }, null, 8, ["type", "spin", "size", "url", "color"])) : createCommentVNode("", true)
            ], 42, _hoisted_4$3);
          }), 128))
        ], 4)
      ]),
      _: 1
    }, 8, ["modelValue", "target", "root", "placement", "offset", "fixed", "fixed-auto", "z-index", "show-triangle", "wrapper-class", "animation", "timeout", "shadow", "border", "border-color", "background", "onShowing"]),
    createElementVNode("input", {
      type: "hidden",
      value: $options.formData,
      name: $props.name
    }, null, 8, _hoisted_6$2)
  ], 10, _hoisted_1$6);
}
const Select = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-933a54e9"]]);
Select.install = (app) => {
  app.component(Select.name, Select);
};
const autocomplete_vue_vue_type_style_index_0_scoped_f9c3873c_lang = "";
const _sfc_main$a = {
  name: "m-autocomplete",
  data() {
    return {
      focus: false
    };
  },
  emits: [
    "update:modelValue",
    "focus",
    "blur",
    "input",
    "left-click",
    "right-click",
    "select",
    "clear"
  ],
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return ["small", "medium", "large"].includes(value);
      }
    },
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    activeType: {
      type: String,
      default: "info",
      validator(value) {
        return ["info", "success", "warn", "error", "primary"].includes(
          value
        );
      }
    },
    activeColor: {
      type: String,
      default: null,
      validator(value) {
        return Dap.common.matchingText(value, "hex");
      }
    },
    filterMethod: {
      type: [Function, Boolean],
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    layerProps: {
      type: Object,
      default: function() {
        return {};
      }
    },
    height: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    hoverClass: {
      type: String,
      default: null
    },
    leftIcon: {
      type: [String, Object],
      default: null
    },
    rightIcon: {
      type: [String, Object],
      default: null
    },
    round: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: "left",
      validator(value) {
        return ["left", "right", "center"].includes(value);
      }
    }
  },
  components: {
    Icon,
    Layer
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  computed: {
    show() {
      return this.focus && this.computedFilter.length != 0;
    },
    leftIconType() {
      let type = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.type == "string") {
          type = this.leftIcon.type;
        }
      } else if (typeof this.leftIcon == "string") {
        type = this.leftIcon;
      }
      return type;
    },
    leftIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.url == "string") {
          url = this.leftIcon.url;
        }
      }
      return url;
    },
    leftIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.spin == "boolean") {
          spin = this.leftIcon.spin;
        }
      }
      return spin;
    },
    leftIconSize() {
      let size = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.size == "string") {
          size = this.leftIcon.size;
        }
      }
      return size;
    },
    leftIconColor() {
      let color = null;
      if (Dap.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.color == "string") {
          color = this.leftIcon.color;
        }
      }
      return color;
    },
    rightIconType() {
      let type = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.type == "string") {
          type = this.rightIcon.type;
        }
      } else if (typeof this.rightIcon == "string") {
        type = this.rightIcon;
      }
      return type;
    },
    rightIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.url == "string") {
          url = this.rightIcon.url;
        }
      }
      return url;
    },
    rightIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.spin == "boolean") {
          spin = this.rightIcon.spin;
        }
      }
      return spin;
    },
    rightIconSize() {
      let size = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.size == "string") {
          size = this.rightIcon.size;
        }
      }
      return size;
    },
    rightIconColor() {
      let color = null;
      if (Dap.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.color == "string") {
          color = this.rightIcon.color;
        }
      }
      return color;
    },
    showClearIcon() {
      if (this.disabled) {
        return false;
      }
      if (this.realValue && this.focus) {
        return true;
      } else {
        return false;
      }
    },
    clearStyle() {
      let style = {};
      if (this.rightIconType || this.rightIconUrl) {
        style.borderRadius = 0;
      }
      return style;
    },
    menuStyle() {
      let style = {};
      if (this.height) {
        style.maxHeight = this.height;
      }
      return style;
    },
    computedFilter() {
      if (typeof this.filterMethod == "function") {
        return this.filterMethod(this.realValue, this.list);
      } else if (this.filterMethod) {
        return this.defaultFilter();
      } else {
        return this.list;
      }
    },
    inputStyle() {
      let style = {};
      if (this.leftIconType || this.leftIconUrl) {
        style.paddingLeft = 0;
      }
      if (this.showClearIcon && this.clearable) {
        style.paddingRight = 0;
      } else if (this.rightIconType || this.rightIconUrl) {
        style.paddingRight = 0;
      }
      if (this.align) {
        style.textAlign = this.align;
      }
      return style;
    },
    autocompleteClass() {
      let cls = ["mvi-autocomplete", "mvi-autocomplete-" + this.size];
      if (this.round) {
        cls.push("mvi-autocomplete-round");
      } else if (this.square) {
        cls.push("mvi-autocomplete-square");
      }
      return cls;
    },
    targetStyle() {
      let style = {};
      if (this.activeColor && this.focus) {
        style.borderColor = this.activeColor;
        const rgb = Dap.color.hex2rgb(this.activeColor);
        style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
      }
      return style;
    },
    targetClass() {
      let cls = ["mvi-autocomplete-target"];
      if (this.activeType && !this.activeColor && this.focus) {
        cls.push("mvi-autocomplete-" + this.activeType);
      }
      return cls;
    },
    realValue: {
      set(value) {
        if (this.modelValue !== value) {
          this.$emit("update:modelValue", value);
        }
      },
      get() {
        return this.modelValue;
      }
    },
    layerRealProps() {
      return {
        placement: this.layerProps.placement ? this.layerProps.placement : "bottom-start",
        fixed: typeof this.layerProps.fixed == "boolean" ? this.layerProps.fixed : false,
        fixedAuto: typeof this.layerProps.fixedAuto == "boolean" ? this.layerProps.fixedAuto : false,
        width: this.layerProps.width,
        zIndex: Dap.number.isNumber(this.layerProps.zIndex) ? this.layerProps.zIndex : 400,
        offset: this.layerProps.offset ? this.layerProps.offset : "0.1rem",
        wrapperClass: this.layerProps.wrapperClass,
        animation: this.layerProps.animation,
        timeout: Dap.number.isNumber(this.layerProps.timeout) ? this.layerProps.timeout : 200,
        showTriangle: typeof this.layerProps.showTriangle == "boolean" ? this.layerProps.showTriangle : false,
        shadow: typeof this.layerProps.shadow == "boolean" ? this.layerProps.shadow : true,
        border: typeof this.layerProps.border == "boolean" ? this.layerProps.border : false,
        borderColor: this.layerProps.borderColor,
        background: this.layerProps.background
      };
    }
  },
  methods: {
    layerShow() {
      if (this.layerRealProps.width) {
        this.$refs.menu.style.width = this.layerRealProps.width;
      } else {
        this.$refs.menu.style.width = this.$refs.target.offsetWidth + "px";
      }
    },
    rightClick(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("right-click", this.realValue);
    },
    leftClick(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("left-click", this.realValue);
    },
    listEnter(e) {
      if (this.hoverClass) {
        Dap.element.addClass(e.currentTarget, this.hoverClass);
      }
    },
    listLeave(e) {
      if (this.hoverClass) {
        Dap.element.removeClass(e.currentTarget, this.hoverClass);
      }
    },
    input() {
      if (this.disabled) {
        return;
      }
      this.focus = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.layer.reset();
        }, 10);
      });
      this.$emit("input", this.realValue);
    },
    inputBlur() {
      if (this.disabled) {
        return;
      }
      this.$emit("blur", this.realValue);
      setTimeout(() => {
        this.focus = false;
      }, 200);
    },
    inputFocus() {
      if (this.disabled) {
        return;
      }
      this.$emit("focus", this.realValue);
      setTimeout(() => {
        this.focus = true;
      }, 200);
    },
    doClear() {
      if (this.disabled) {
        return;
      }
      if (!this.clearable) {
        return;
      }
      setTimeout(() => {
        this.realValue = "";
        this.$emit("clear", "");
        this.$refs.input.focus();
      }, 200);
    },
    doSelect(item) {
      if (this.disabled) {
        return;
      }
      this.realValue = item;
      this.$emit("select", item);
      this.focus = false;
    },
    defaultFilter() {
      let arr = [];
      let length = this.list.length;
      for (let i = 0; i < length; i++) {
        if (this.list[i].includes(this.realValue)) {
          arr.push(this.list[i]);
        }
      }
      return arr;
    }
  }
};
const _hoisted_1$5 = ["data-id", "disabled"];
const _hoisted_2$5 = ["data-id"];
const _hoisted_3$3 = ["placeholder", "name", "disabled"];
const _hoisted_4$2 = ["textContent", "onClick"];
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Layer = resolveComponent("Layer");
  return openBlock(), createElementBlock("div", {
    "data-id": "mvi-autocomplete-" + $setup.uid,
    class: normalizeClass($options.autocompleteClass),
    disabled: $props.disabled || null
  }, [
    createElementVNode("div", {
      class: normalizeClass($options.targetClass),
      style: normalizeStyle($options.targetStyle),
      "data-id": "mvi-autocomplete-target-" + $setup.uid,
      ref: "target"
    }, [
      $options.leftIconType || $options.leftIconUrl ? (openBlock(), createElementBlock("div", {
        key: 0,
        onClick: _cache[0] || (_cache[0] = (...args) => $options.leftClick && $options.leftClick(...args)),
        class: "mvi-autocomplete-left-icon"
      }, [
        createVNode(_component_Icon, {
          type: $options.leftIconType,
          url: $options.leftIconUrl,
          spin: $options.leftIconSpin,
          size: $options.leftIconSize,
          color: $options.leftIconColor
        }, null, 8, ["type", "url", "spin", "size", "color"])
      ])) : createCommentVNode("", true),
      withDirectives(createElementVNode("input", {
        ref: "input",
        onInput: _cache[1] || (_cache[1] = (...args) => $options.input && $options.input(...args)),
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $options.realValue = $event),
        type: "text",
        placeholder: $props.placeholder,
        style: normalizeStyle($options.inputStyle),
        name: $props.name,
        onFocus: _cache[3] || (_cache[3] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
        onBlur: _cache[4] || (_cache[4] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
        disabled: $props.disabled || null,
        autocomplete: "off"
      }, null, 44, _hoisted_3$3), [
        [vModelText, $options.realValue]
      ]),
      $props.clearable ? withDirectives((openBlock(), createElementBlock("div", {
        key: 1,
        onClick: _cache[5] || (_cache[5] = (...args) => $options.doClear && $options.doClear(...args)),
        class: "mvi-autocomplete-clear",
        style: normalizeStyle($options.clearStyle)
      }, [
        createVNode(_component_Icon, { type: "times-o" })
      ], 4)), [
        [vShow, $options.showClearIcon]
      ]) : createCommentVNode("", true),
      $options.rightIconType || $options.rightIconUrl ? (openBlock(), createElementBlock("div", {
        key: 2,
        class: "mvi-autocomplete-right-icon",
        onClick: _cache[6] || (_cache[6] = (...args) => $options.rightClick && $options.rightClick(...args))
      }, [
        createVNode(_component_Icon, {
          type: $options.rightIconType,
          url: $options.rightIconUrl,
          spin: $options.rightIconSpin,
          size: $options.rightIconSize,
          color: $options.rightIconColor
        }, null, 8, ["type", "url", "spin", "size", "color"])
      ])) : createCommentVNode("", true)
    ], 14, _hoisted_2$5),
    createVNode(_component_Layer, {
      "model-value": $options.show,
      target: `[data-id='mvi-autocomplete-target-${$setup.uid}']`,
      root: `[data-id='mvi-autocomplete-${$setup.uid}']`,
      placement: $options.layerRealProps.placement,
      offset: $options.layerRealProps.offset,
      fixed: $options.layerRealProps.fixed,
      "z-index": $options.layerRealProps.zIndex,
      "fixed-auto": $options.layerRealProps.fixedAuto,
      ref: "layer",
      "wrapper-class": $options.layerRealProps.wrapperClass,
      animation: $options.layerRealProps.animation,
      shadow: $options.layerRealProps.shadow,
      border: $options.layerRealProps.border,
      timeout: $options.layerRealProps.timeout,
      closable: false,
      "show-triangle": $options.layerRealProps.showTriangle,
      "border-color": $options.layerRealProps.borderColor,
      background: $options.layerRealProps.background,
      onShowing: $options.layerShow
    }, {
      default: withCtx(() => [
        createElementVNode("div", {
          class: "mvi-autocomplete-menu",
          style: normalizeStyle($options.menuStyle),
          ref: "menu"
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.computedFilter, (item, index) => {
            return openBlock(), createElementBlock("div", {
              class: "mvi-autocomplete-list",
              textContent: toDisplayString(item),
              onClick: ($event) => $options.doSelect(item),
              onMouseenter: _cache[7] || (_cache[7] = (...args) => $options.listEnter && $options.listEnter(...args)),
              onMouseleave: _cache[8] || (_cache[8] = (...args) => $options.listLeave && $options.listLeave(...args)),
              key: "mvi-autocomplete-list-" + index
            }, null, 40, _hoisted_4$2);
          }), 128))
        ], 4)
      ]),
      _: 1
    }, 8, ["model-value", "target", "root", "placement", "offset", "fixed", "z-index", "fixed-auto", "wrapper-class", "animation", "shadow", "border", "timeout", "show-triangle", "border-color", "background", "onShowing"])
  ], 10, _hoisted_1$5);
}
const Autocomplete = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-f9c3873c"]]);
Autocomplete.install = (app) => {
  app.component(Autocomplete.name, Autocomplete);
};
const dateChooser_vue_vue_type_style_index_0_scoped_6d85d10d_lang = "";
const _sfc_main$9 = {
  name: "m-date-chooser",
  data() {
    return {
      target: null,
      layer: null,
      show: false,
      view: "date",
      hover: [false, false, false, false, false, false, false]
    };
  },
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: Date,
      default: function() {
        return new Date();
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    layerProps: {
      type: Object,
      default: function() {
        return {};
      }
    },
    closable: {
      type: Boolean,
      default: true
    },
    trigger: {
      type: String,
      default: "click",
      validator(value) {
        return ["hover", "click", "custom"].includes(value);
      }
    },
    mode: {
      type: String,
      default: "date",
      validator(value) {
        return ["year", "month", "date"].includes(value);
      }
    },
    monthText: {
      type: Array,
      default: function() {
        return [
          "\u4E00\u6708",
          "\u4E8C\u6708",
          "\u4E09\u6708",
          "\u56DB\u6708",
          "\u4E94\u6708",
          "\u516D\u6708",
          "\u4E03\u6708",
          "\u516B\u6708",
          "\u4E5D\u6708",
          "\u5341\u6708",
          "\u5341\u4E00\u6708",
          "\u5341\u4E8C\u6708"
        ];
      }
    },
    weekText: {
      type: Array,
      default: function() {
        return ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
      }
    },
    startYear: {
      type: Number,
      default: 1970
    },
    endYear: {
      type: Number,
      default: 2099
    },
    nowClass: {
      type: [String, Object],
      default: null
    },
    currentClass: {
      type: [String, Object],
      default: null
    },
    active: {
      type: Boolean,
      default: true
    },
    headerHoverClass: {
      type: String,
      default: null
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  computed: {
    currentYear() {
      return this.modelValue.getFullYear() + "\u5E74";
    },
    currentMonth() {
      let month = this.modelValue.getMonth() + 1;
      return (month < 10 ? "0" + month : month) + "\u6708";
    },
    hoverHeader() {
      return (hover, index) => {
        this.hover[index] = hover;
      };
    },
    headerItemClass() {
      return (index) => {
        let cls = [];
        if (this.hover[index] && this.headerHoverClass) {
          cls.push(this.headerHoverClass);
        }
        return cls;
      };
    },
    currentYears() {
      if (this.layer) {
        let years = [...this.$refs.calendar.years];
        for (let i = 0; i < years.length; i++) {
          if (years[i].year < this.startYear) {
            years.splice(i, 1);
          }
          if (years[i].year > this.endYear) {
            years.splice(i, 1);
          }
        }
        return years[0].year + "\u5E74 - " + years[years.length - 1].year + "\u5E74";
      } else {
        return "";
      }
    },
    prevYearDisabled() {
      if (this.view == "year" && this.layer) {
        return this.$refs.calendar.years[0].year <= this.startYear;
      } else {
        return this.modelValue.getFullYear() <= this.startYear;
      }
    },
    nextYearDisabled() {
      if (this.view == "year" && this.layer) {
        let years = this.$refs.calendar.years;
        return years[years.length - 1].year >= this.endYear;
      } else {
        return this.modelValue.getFullYear() >= this.endYear;
      }
    },
    layerRealProps() {
      return {
        placement: this.layerProps.placement ? this.layerProps.placement : "bottom-start",
        fixed: typeof this.layerProps.fixed == "boolean" ? this.layerProps.fixed : false,
        fixedAuto: typeof this.layerProps.fixedAuto == "boolean" ? this.layerProps.fixedAuto : false,
        width: this.layerProps.width,
        zIndex: Dap.number.isNumber(this.layerProps.zIndex) ? this.layerProps.zIndex : 400,
        offset: this.layerProps.offset ? this.layerProps.offset : "0.2rem",
        wrapperClass: this.layerProps.wrapperClass,
        animation: this.layerProps.animation,
        timeout: Dap.number.isNumber(this.layerProps.timeout) ? this.layerProps.timeout : 200,
        showTriangle: typeof this.layerProps.showTriangle == "boolean" ? this.layerProps.showTriangle : false,
        shadow: typeof this.layerProps.shadow == "boolean" ? this.layerProps.shadow : true,
        border: typeof this.layerProps.border == "boolean" ? this.layerProps.border : false,
        borderColor: this.layerProps.borderColor
      };
    }
  },
  components: {
    Layer,
    Icon,
    Calendar
  },
  created() {
    this.view = this.mode;
  },
  mounted() {
    if (this.trigger == "hover") {
      Dap.event.on(this.$el, "mouseenter.dateChooser", this.openCalendar);
      Dap.event.on(this.$el, "mouseleave.dateChooser", this.closeCalendar);
    }
  },
  methods: {
    layerShow() {
      if (this.layerRealProps.width) {
        this.$refs.panel.style.width = this.layerRealProps.width;
      } else {
        this.$refs.panel.style.width = this.$refs.target.offsetWidth + "px";
      }
      if (!this.layer) {
        this.layer = this.$refs.layer;
      }
    },
    openCalendar() {
      if (this.disabled) {
        return;
      }
      this.show = true;
    },
    closeCalendar() {
      if (this.disabled) {
        return;
      }
      this.show = false;
    },
    clickCalendar() {
      if (this.disabled) {
        return;
      }
      if (this.trigger == "click") {
        if (this.show) {
          this.closeCalendar();
        } else {
          this.openCalendar();
        }
      }
    },
    dateClick(res) {
      if (event || window.event) {
        event.stopPropagation();
      }
      if (this.disabled) {
        return;
      }
      this.$emit("update:modelValue", res.date);
      this.$emit("change", res.date);
      this.show = false;
    },
    yearClick(res) {
      if (event || window.event) {
        event.stopPropagation();
      }
      if (this.disabled) {
        return;
      }
      if (this.mode == "year") {
        this.show = false;
      } else {
        this.view = "month";
      }
      this.$emit("update:modelValue", res.date);
      this.$emit("change", res.date);
    },
    monthClick(res) {
      if (event || window.event) {
        event.stopPropagation();
      }
      if (this.disabled) {
        return;
      }
      if (this.mode == "date") {
        this.view = "date";
      } else {
        this.show = false;
      }
      this.$emit("update:modelValue", res.date);
      this.$emit("change", res.date);
    },
    goPrevYear() {
      if (this.view == "year") {
        let years = this.$refs.calendar.years;
        let date = this.modelValue;
        let year = date.getFullYear();
        if (years[0].year <= this.startYear) {
          return;
        } else if (years[0].year - this.startYear < 12) {
          date = new Date(date.setFullYear(this.startYear));
        } else {
          date = new Date(date.setFullYear(year - 12));
        }
        this.$emit("update:modelValue", date);
        this.$emit("change", date);
      } else {
        let date = this.modelValue;
        let year = date.getFullYear();
        if (year <= this.startYear) {
          return;
        }
        date = new Date(date.setFullYear(year - 1));
        this.$emit("update:modelValue", date);
        this.$emit("change", date);
      }
    },
    goPrevMonth() {
      let date = this.modelValue;
      if (date.getFullYear() <= this.startYear && date.getMonth() == 0) {
        return;
      }
      let prevMonths = Dap.date.getPrevMonths(date, 2);
      date = prevMonths[1];
      this.$emit("update:modelValue", date);
      this.$emit("change", date);
    },
    goNextYear() {
      if (this.view == "year") {
        let years = this.$refs.calendar.years;
        let date = this.modelValue;
        let year = date.getFullYear();
        if (years[years.length - 1].year >= this.endYear) {
          return;
        } else if (this.endYear - years[years.length - 1].year < 12) {
          date = new Date(date.setFullYear(this.endYear));
        } else {
          date = new Date(date.setFullYear(year + 12));
        }
        this.$emit("update:modelValue", date);
        this.$emit("change", date);
      } else {
        let date = this.modelValue;
        let year = date.getFullYear();
        if (year >= this.endYear) {
          return;
        }
        date = new Date(date.setFullYear(year + 1));
        this.$emit("update:modelValue", date);
        this.$emit("change", date);
      }
    },
    goNextMonth() {
      let date = this.modelValue;
      if (date.getFullYear() >= this.endYear && date.getMonth() == 11) {
        return;
      }
      let nextMonths = Dap.date.getNextMonths(date, 2);
      date = nextMonths[1];
      this.$emit("update:modelValue", date);
      this.$emit("change", date);
    },
    jumpViewYear(event2) {
      event2.stopPropagation();
      this.hover = [false, false, false, false, true, false, false];
      this.view = "year";
    },
    jumpViewMonth(event2) {
      event2.stopPropagation();
      this.hover = [false, false, false, false, false, false, false];
      this.view = "month";
    },
    jumpViewDate(event2) {
      event2.stopPropagation();
      this.hover = [false, false, false, false, false, false, false];
      this.view = "date";
    }
  },
  beforeUnmount() {
    if (this.trigger == "hover") {
      Dap.event.off(
        this.$el,
        "mouseenter.dateChooser mouseleave.dateChooser"
      );
    }
  }
};
const _hoisted_1$4 = ["data-id"];
const _hoisted_2$4 = ["data-id"];
const _hoisted_3$2 = {
  class: "mvi-date-chooser-layer",
  ref: "panel"
};
const _hoisted_4$1 = { class: "mvi-date-chooser-header" };
const _hoisted_5$1 = { class: "mvi-date-chooser-header-left" };
const _hoisted_6$1 = ["disabled"];
const _hoisted_7$1 = ["disabled"];
const _hoisted_8$1 = { class: "mvi-date-chooser-header-center" };
const _hoisted_9$1 = ["textContent"];
const _hoisted_10$1 = ["textContent"];
const _hoisted_11$1 = ["textContent"];
const _hoisted_12$1 = { class: "mvi-date-chooser-header-right" };
const _hoisted_13$1 = ["disabled"];
const _hoisted_14$1 = ["disabled"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Calendar = resolveComponent("Calendar");
  const _component_Layer = resolveComponent("Layer");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-date-chooser", $props.block ? "mvi-date-chooser-block" : ""]),
    "data-id": `mvi-date-chooser-${$setup.uid}`
  }, [
    createElementVNode("div", {
      class: "mvi-date-chooser-target",
      "data-id": `mvi-date-chooser-target-${$setup.uid}`,
      ref: "target",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.clickCalendar && $options.clickCalendar(...args))
    }, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 8, _hoisted_2$4),
    createVNode(_component_Layer, {
      target: `[data-id='mvi-date-chooser-target-${$setup.uid}']`,
      root: `[data-id='mvi-date-chooser-${$setup.uid}']`,
      modelValue: $data.show,
      "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $data.show = $event),
      placement: $options.layerRealProps.placement,
      fixed: $options.layerRealProps.fixed,
      "fixed-auto": $options.layerRealProps.fixedAuto,
      offset: $options.layerRealProps.offset,
      "z-index": $options.layerRealProps.zIndex,
      "wrapper-class": $options.layerRealProps.wrapperClass,
      shadow: $options.layerRealProps.shadow,
      border: $options.layerRealProps.border,
      animation: $options.layerRealProps.animation,
      "border-color": $options.layerRealProps.borderColor,
      timeout: $options.layerRealProps.timeout,
      closable: $props.closable,
      "show-triangle": $options.layerRealProps.showTriangle,
      onShowing: $options.layerShow,
      ref: "layer"
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_3$2, [
          createElementVNode("div", _hoisted_4$1, [
            createElementVNode("div", _hoisted_5$1, [
              createElementVNode("span", {
                onMouseenter: _cache[1] || (_cache[1] = ($event) => $options.hoverHeader(true, 0)),
                onMouseleave: _cache[2] || (_cache[2] = ($event) => $options.hoverHeader(false, 0)),
                onClick: _cache[3] || (_cache[3] = (...args) => $options.goPrevYear && $options.goPrevYear(...args)),
                class: normalizeClass($options.headerItemClass(0)),
                disabled: $options.prevYearDisabled || null
              }, [
                createVNode(_component_Icon, { type: "angle-double-left" })
              ], 42, _hoisted_6$1),
              $data.view == "date" ? (openBlock(), createElementBlock("span", {
                key: 0,
                onMouseenter: _cache[4] || (_cache[4] = ($event) => $options.hoverHeader(true, 1)),
                onMouseleave: _cache[5] || (_cache[5] = ($event) => $options.hoverHeader(false, 1)),
                onClick: _cache[6] || (_cache[6] = (...args) => $options.goPrevMonth && $options.goPrevMonth(...args)),
                class: normalizeClass($options.headerItemClass(1)),
                disabled: $props.modelValue.getFullYear() <= $props.startYear && $props.modelValue.getMonth() == 0 || null
              }, [
                createVNode(_component_Icon, { type: "angle-left" })
              ], 42, _hoisted_7$1)) : createCommentVNode("", true)
            ]),
            createElementVNode("div", _hoisted_8$1, [
              $data.view != "year" && $options.currentYear ? (openBlock(), createElementBlock("span", {
                key: 0,
                onMouseenter: _cache[7] || (_cache[7] = ($event) => $options.hoverHeader(true, 2)),
                onMouseleave: _cache[8] || (_cache[8] = ($event) => $options.hoverHeader(false, 2)),
                textContent: toDisplayString($options.currentYear),
                class: normalizeClass($options.headerItemClass(2)),
                onClick: _cache[9] || (_cache[9] = (...args) => $options.jumpViewYear && $options.jumpViewYear(...args))
              }, null, 42, _hoisted_9$1)) : createCommentVNode("", true),
              $data.view == "date" && $options.currentMonth ? (openBlock(), createElementBlock("span", {
                key: 1,
                onMouseenter: _cache[10] || (_cache[10] = ($event) => $options.hoverHeader(true, 3)),
                onMouseleave: _cache[11] || (_cache[11] = ($event) => $options.hoverHeader(false, 3)),
                textContent: toDisplayString($options.currentMonth),
                class: normalizeClass($options.headerItemClass(3)),
                onClick: _cache[12] || (_cache[12] = (...args) => $options.jumpViewMonth && $options.jumpViewMonth(...args))
              }, null, 42, _hoisted_10$1)) : createCommentVNode("", true),
              $data.view == "year" && $options.currentYears ? (openBlock(), createElementBlock("span", {
                key: 2,
                onMouseenter: _cache[13] || (_cache[13] = ($event) => $options.hoverHeader(true, 4)),
                onMouseleave: _cache[14] || (_cache[14] = ($event) => $options.hoverHeader(false, 4)),
                textContent: toDisplayString($options.currentYears),
                class: normalizeClass($options.headerItemClass(4))
              }, null, 42, _hoisted_11$1)) : createCommentVNode("", true)
            ]),
            createElementVNode("div", _hoisted_12$1, [
              $data.view == "date" ? (openBlock(), createElementBlock("span", {
                key: 0,
                onMouseenter: _cache[15] || (_cache[15] = ($event) => $options.hoverHeader(true, 5)),
                onMouseleave: _cache[16] || (_cache[16] = ($event) => $options.hoverHeader(false, 5)),
                onClick: _cache[17] || (_cache[17] = (...args) => $options.goNextMonth && $options.goNextMonth(...args)),
                class: normalizeClass($options.headerItemClass(5)),
                disabled: $props.modelValue.getFullYear() >= $props.endYear && $props.modelValue.getMonth() == 11 || null
              }, [
                createVNode(_component_Icon, { type: "angle-right" })
              ], 42, _hoisted_13$1)) : createCommentVNode("", true),
              createElementVNode("span", {
                onMouseenter: _cache[18] || (_cache[18] = ($event) => $options.hoverHeader(true, 6)),
                onMouseleave: _cache[19] || (_cache[19] = ($event) => $options.hoverHeader(false, 6)),
                onClick: _cache[20] || (_cache[20] = (...args) => $options.goNextYear && $options.goNextYear(...args)),
                class: normalizeClass($options.headerItemClass(6)),
                disabled: $options.nextYearDisabled || null
              }, [
                createVNode(_component_Icon, { type: "angle-double-right" })
              ], 42, _hoisted_14$1)
            ])
          ]),
          createVNode(_component_Calendar, {
            view: $data.view,
            "model-value": $props.modelValue,
            "month-text": $props.monthText,
            "week-text": $props.weekText,
            "start-year": $props.startYear,
            "end-year": $props.endYear,
            "now-class": $props.nowClass,
            "current-class": $props.currentClass,
            "non-current-click": false,
            active: $props.active,
            onDateClick: $options.dateClick,
            onMonthClick: $options.monthClick,
            onYearClick: $options.yearClick,
            ref: "calendar"
          }, null, 8, ["view", "model-value", "month-text", "week-text", "start-year", "end-year", "now-class", "current-class", "active", "onDateClick", "onMonthClick", "onYearClick"])
        ], 512)
      ]),
      _: 1
    }, 8, ["target", "root", "modelValue", "placement", "fixed", "fixed-auto", "offset", "z-index", "wrapper-class", "shadow", "border", "animation", "border-color", "timeout", "closable", "show-triangle", "onShowing"])
  ], 10, _hoisted_1$4);
}
const DateChooser = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-6d85d10d"]]);
DateChooser.install = (app) => {
  app.component(DateChooser.name, DateChooser);
};
const field_vue_vue_type_style_index_0_scoped_1ae395d3_lang = "";
const _sfc_main$8 = {
  name: "m-field",
  emits: [
    "update:modelValue",
    "prepend-click",
    "prefix-click",
    "append-click",
    "suffix-click",
    "focus",
    "blur",
    "input",
    "clear"
  ],
  data() {
    return {
      focus: false
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return ["small", "medium", "large"].includes(value);
      }
    },
    maxlength: {
      type: Number,
      default: -1
    },
    round: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: [String, Object],
      default: null
    },
    suffix: {
      type: [String, Object],
      default: null
    },
    prepend: {
      type: [String, Object],
      default: null
    },
    append: {
      type: [String, Object],
      default: null
    },
    activeType: {
      type: String,
      default: "info",
      validator(value) {
        return ["info", "success", "warn", "primary", "error"].includes(
          value
        );
      }
    },
    activeColor: {
      type: String,
      default: null,
      validator(value) {
        return Dap.common.matchingText(value, "hex");
      }
    },
    prependBackground: {
      type: String,
      default: null
    },
    prependColor: {
      type: String,
      default: null
    },
    appendBackground: {
      type: String,
      default: null
    },
    appendColor: {
      type: String,
      default: null
    },
    borderColor: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: "left",
      validator(value) {
        return ["left", "center", "right"].includes(value);
      }
    },
    name: {
      type: String,
      default: null
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    inputMode: {
      type: [String, Boolean],
      default: false,
      validator(value) {
        return [
          false,
          "none",
          "text",
          "decimal",
          "numeric",
          "tel",
          "search",
          "email",
          "url"
        ].includes(value);
      }
    },
    rows: {
      type: Number,
      default: 1
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    }
  },
  computed: {
    showClearIcon() {
      if (this.disabled || this.readonly) {
        return false;
      }
      if (this.realValue && this.focus) {
        return true;
      } else {
        return false;
      }
    },
    clearStyle() {
      let style = {};
      if ((this.suffixIconType || this.suffixIconUrl || this.$slots.suffix) && this.type != "textarea") {
        style.borderRadius = 0;
      }
      return style;
    },
    prependStyle() {
      let style = {};
      if (this.prependBackground) {
        style.backgroundColor = this.prependBackground;
      }
      if (this.prependColor) {
        style.color = this.prependColor;
      }
      return style;
    },
    appendStyle() {
      let style = {};
      if (this.appendBackground) {
        style.backgroundColor = this.appendBackground;
      }
      if (this.appendColor) {
        style.color = this.appendColor;
      }
      return style;
    },
    inputStyle() {
      let style = {};
      if ((this.$slots.prefix || this.prefixIconType || this.prefixIconUrl) && this.type != "textarea") {
        style.paddingLeft = 0;
      }
      if ((this.$slots.suffix || this.suffixIconType || this.suffixIconUrl || this.showClearIcon && this.clearable) && this.type != "textarea") {
        style.paddingRight = 0;
      }
      if (this.align) {
        style.textAlign = this.align;
      }
      return style;
    },
    fieldBodyStyle() {
      let style = {};
      if (this.focus) {
        if (this.activeColor) {
          style.borderColor = this.activeColor;
          const rgb = Dap.color.hex2rgb(this.activeColor);
          style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
        }
      } else {
        if (this.borderColor) {
          style.borderColor = this.borderColor;
        }
      }
      return style;
    },
    fieldBodyClass() {
      let cls = ["mvi-field-body"];
      if ((this.prependIconType || this.prependIconUrl || this.$slots.prepend) && this.type != "textarea") {
        cls.push("mvi-field-body-left");
      }
      if ((this.appendIconType || this.appendIconUrl || this.$slots.append) && this.type != "textarea") {
        cls.push("mvi-field-body-right");
      }
      if (!this.activeColor && this.activeType && this.focus) {
        cls.push("mvi-field-body-" + this.activeType);
      }
      return cls;
    },
    fieldClass() {
      let cls = ["mvi-field", "mvi-field-" + this.size];
      if (this.round && this.type != "textarea") {
        cls.push("mvi-field-round");
      } else if (this.square) {
        cls.push("mvi-field-square");
      }
      return cls;
    },
    computedType() {
      if (this.type == "number") {
        return "text";
      } else {
        return this.type;
      }
    },
    computedInputMode() {
      let mode = false;
      if (typeof this.inputMode == "string") {
        mode = this.inputMode;
      }
      return mode;
    },
    prependIconType() {
      let type = null;
      if (Dap.common.isObject(this.prepend)) {
        if (typeof this.prepend.type == "string") {
          type = this.prepend.type;
        }
      } else if (typeof this.prepend == "string") {
        type = this.prepend;
      }
      return type;
    },
    prependIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.prepend)) {
        if (typeof this.prepend.url == "string") {
          url = this.prepend.url;
        }
      }
      return url;
    },
    prependIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.prepend)) {
        if (typeof this.prepend.spin == "boolean") {
          spin = this.prepend.spin;
        }
      }
      return spin;
    },
    prependIconSize() {
      let size = null;
      if (Dap.common.isObject(this.prepend)) {
        if (typeof this.prepend.size == "string") {
          size = this.prepend.size;
        }
      }
      return size;
    },
    prependIconColor() {
      let color = null;
      if (Dap.common.isObject(this.prepend)) {
        if (typeof this.prepend.color == "string") {
          color = this.prepend.color;
        }
      }
      return color;
    },
    appendIconType() {
      let type = null;
      if (Dap.common.isObject(this.append)) {
        if (typeof this.append.type == "string") {
          type = this.append.type;
        }
      } else if (typeof this.append == "string") {
        type = this.append;
      }
      return type;
    },
    appendIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.append)) {
        if (typeof this.append.url == "string") {
          url = this.append.url;
        }
      }
      return url;
    },
    appendIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.append)) {
        if (typeof this.append.spin == "boolean") {
          spin = this.append.spin;
        }
      }
      return spin;
    },
    appendIconSize() {
      let size = null;
      if (Dap.common.isObject(this.append)) {
        if (typeof this.append.size == "string") {
          size = this.append.size;
        }
      }
      return size;
    },
    appendIconColor() {
      let color = null;
      if (Dap.common.isObject(this.append)) {
        if (typeof this.append.color == "string") {
          color = this.append.color;
        }
      }
      return color;
    },
    prefixIconType() {
      let type = null;
      if (Dap.common.isObject(this.prefix)) {
        if (typeof this.prefix.type == "string") {
          type = this.prefix.type;
        }
      } else if (typeof this.prefix == "string") {
        type = this.prefix;
      }
      return type;
    },
    prefixIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.prefix)) {
        if (typeof this.prefix.url == "string") {
          url = this.prefix.url;
        }
      }
      return url;
    },
    prefixIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.prefix)) {
        if (typeof this.prefix.spin == "boolean") {
          spin = this.prefix.spin;
        }
      }
      return spin;
    },
    prefixIconSize() {
      let size = null;
      if (Dap.common.isObject(this.prefix)) {
        if (typeof this.prefix.size == "string") {
          size = this.prefix.size;
        }
      }
      return size;
    },
    prefixIconColor() {
      let color = null;
      if (Dap.common.isObject(this.prefix)) {
        if (typeof this.prefix.color == "string") {
          color = this.prefix.color;
        }
      }
      return color;
    },
    suffixIconType() {
      let type = null;
      if (Dap.common.isObject(this.suffix)) {
        if (typeof this.suffix.type == "string") {
          type = this.suffix.type;
        }
      } else if (typeof this.suffix == "string") {
        type = this.suffix;
      }
      return type;
    },
    suffixIconUrl() {
      let url = null;
      if (Dap.common.isObject(this.suffix)) {
        if (typeof this.suffix.url == "string") {
          url = this.suffix.url;
        }
      }
      return url;
    },
    suffixIconSpin() {
      let spin = false;
      if (Dap.common.isObject(this.suffix)) {
        if (typeof this.suffix.spin == "boolean") {
          spin = this.suffix.spin;
        }
      }
      return spin;
    },
    suffixIconSize() {
      let size = null;
      if (Dap.common.isObject(this.suffix)) {
        if (typeof this.suffix.size == "string") {
          size = this.suffix.size;
        }
      }
      return size;
    },
    suffixIconColor() {
      let color = null;
      if (Dap.common.isObject(this.suffix)) {
        if (typeof this.suffix.color == "string") {
          color = this.suffix.color;
        }
      }
      return color;
    },
    rowsFilter() {
      let rows = this.rows;
      if (Dap.common.isObject(this.autosize)) {
        if (Dap.number.isNumber(this.autosize.minRows)) {
          if (this.rows < this.autosize.minRows) {
            rows = this.autosize.minRows;
          }
        }
        if (Dap.number.isNumber(this.autosize.maxRows)) {
          if (this.rows > this.autosize.maxRows) {
            rows = this.autosize.maxRows;
          }
        }
      }
      return rows;
    },
    realValue: {
      set(value) {
        if (this.modelValue !== value) {
          this.$emit("update:modelValue", value);
        }
      },
      get() {
        let value = this.modelValue === null ? "" : this.modelValue.toString();
        if (this.type == "number") {
          value = value.replace(/\D/g, "");
        }
        if (this.maxlength > 0 && value.length > this.maxlength) {
          value = value.substr(0, this.maxlength);
        }
        if (this.modelValue !== value) {
          this.$emit("update:modelValue", value);
        }
        return value;
      }
    }
  },
  components: {
    Icon
  },
  watch: {
    realValue(newValue) {
      this.$nextTick(() => {
        if (this.$refs.textarea && (this.autosize == true || Dap.common.isObject(this.autosize))) {
          this.autosizeSet();
        }
      });
    },
    rows(newValue) {
      this.$nextTick(() => {
        if (this.$refs.textarea) {
          this.setMaxMinHeight();
        }
      });
    },
    autosize(newValue) {
      this.$nextTick(() => {
        if (this.$refs.textarea) {
          this.setMaxMinHeight();
        }
      });
    }
  },
  mounted() {
    if (this.$refs.textarea) {
      this.setMaxMinHeight();
      if (this.autosize == true || Dap.common.isObject(this.autosize)) {
        this.autosizeSet();
      }
    }
  },
  methods: {
    autosizeSet() {
      this.$refs.textarea.style.overflow = "hidden";
      this.$refs.textarea.style.height = "auto";
      this.$refs.textarea.scrollTop = 0;
      this.$refs.textarea.style.height = Dap.element.getScrollHeight(this.$refs.textarea) + "px";
    },
    rows2Height(rows) {
      let lineHeight = Math.floor(
        parseFloat(
          Dap.element.getCssStyle(this.$refs.textarea, "line-height")
        )
      );
      return rows * lineHeight;
    },
    setMaxMinHeight() {
      if (Dap.common.isObject(this.autosize)) {
        if (Dap.number.isNumber(this.autosize.maxRows)) {
          let maxHeight = this.rows2Height(this.autosize.maxRows) + parseFloat(
            Dap.element.getCssStyle(
              this.$refs.textarea,
              "padding-top"
            )
          ) + parseFloat(
            Dap.element.getCssStyle(
              this.$refs.textarea,
              "padding-bottom"
            )
          );
          this.$refs.textarea.style.maxHeight = maxHeight + "px";
        }
        if (Dap.number.isNumber(this.autosize.minRows)) {
          let minHeight = this.rows2Height(this.autosize.minRows) + parseFloat(
            Dap.element.getCssStyle(
              this.$refs.textarea,
              "padding-top"
            )
          ) + parseFloat(
            Dap.element.getCssStyle(
              this.$refs.textarea,
              "padding-bottom"
            )
          );
          this.$refs.textarea.style.minHeight = minHeight + "px";
        }
      } else {
        this.$refs.textarea.style.maxHeight = "";
        this.$refs.textarea.style.minHeight = "";
      }
    },
    inputFocus() {
      if (this.disabled) {
        return;
      }
      this.$emit("focus", this.realValue);
      setTimeout(() => {
        this.focus = true;
      }, 200);
    },
    inputBlur() {
      if (this.disabled) {
        return;
      }
      this.$emit("blur", this.realValue);
      setTimeout(() => {
        this.focus = false;
      }, 200);
    },
    input(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("input", this.realValue);
    },
    prependClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("prepend-click", this.realValue);
    },
    prefixClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("prefix-click", this.realValue);
    },
    appendClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("append-click", this.realValue);
    },
    suffixClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("suffix-click", this.realValue);
    },
    doClear() {
      if (this.disabled) {
        return;
      }
      if (!this.clearable) {
        return;
      }
      this.realValue = "";
      let el = this.$refs.input || this.$refs.textarea;
      el.focus();
      this.$emit("clear", "");
    }
  }
};
const _hoisted_1$3 = ["disabled", "data-type"];
const _hoisted_2$3 = ["disabled", "readonly", "placeholder", "maxlength", "name", "autofocus", "rows"];
const _hoisted_3$1 = ["disabled", "readonly", "type", "placeholder", "inputmode", "maxlength", "name", "autofocus"];
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.fieldClass),
    disabled: $props.disabled || null,
    "data-type": $props.type
  }, [
    ($options.prependIconType || $options.prependIconUrl || _ctx.$slots.prepend) && $props.type != "textarea" ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "mvi-field-prepend",
      style: normalizeStyle($options.prependStyle),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.prependClick && $options.prependClick(...args))
    }, [
      _ctx.$slots.prepend ? renderSlot(_ctx.$slots, "prepend", { key: 0 }, void 0, true) : $options.prependIconType || $options.prependIconUrl ? (openBlock(), createBlock(_component_Icon, {
        key: 1,
        type: $options.prependIconType,
        url: $options.prependIconUrl,
        spin: $options.prependIconSpin,
        size: $options.prependIconSize,
        color: $options.prependIconColor
      }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
    ], 4)) : createCommentVNode("", true),
    createElementVNode("div", {
      class: normalizeClass($options.fieldBodyClass),
      style: normalizeStyle($options.fieldBodyStyle)
    }, [
      ($options.prefixIconType || $options.prefixIconUrl || _ctx.$slots.prefix) && $props.type != "textarea" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "mvi-field-prefix",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.prefixClick && $options.prefixClick(...args))
      }, [
        _ctx.$slots.prefix ? renderSlot(_ctx.$slots, "prefix", { key: 0 }, void 0, true) : $options.prefixIconType || $options.prefixIconUrl ? (openBlock(), createBlock(_component_Icon, {
          key: 1,
          type: $options.prefixIconType,
          url: $options.prefixIconUrl,
          spin: $options.prefixIconSpin,
          size: $options.prefixIconSize,
          color: $options.prefixIconColor
        }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
      ])) : createCommentVNode("", true),
      $props.type == "textarea" ? withDirectives((openBlock(), createElementBlock("textarea", {
        key: 1,
        ref: "textarea",
        disabled: $props.disabled || null,
        readonly: $props.readonly || null,
        class: "mvi-field-input",
        style: normalizeStyle($options.inputStyle),
        placeholder: $props.placeholder,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $options.realValue = $event),
        autocomplete: "off",
        onFocus: _cache[3] || (_cache[3] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
        onBlur: _cache[4] || (_cache[4] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
        maxlength: $props.maxlength,
        name: $props.name,
        autofocus: $props.autofocus,
        rows: $options.rowsFilter,
        onInput: _cache[5] || (_cache[5] = (...args) => $options.input && $options.input(...args))
      }, null, 44, _hoisted_2$3)), [
        [vModelText, $options.realValue]
      ]) : withDirectives((openBlock(), createElementBlock("input", {
        key: 2,
        ref: "input",
        disabled: $props.disabled || null,
        readonly: $props.readonly || null,
        class: "mvi-field-input",
        style: normalizeStyle($options.inputStyle),
        type: $options.computedType,
        placeholder: $props.placeholder,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $options.realValue = $event),
        autocomplete: "off",
        inputmode: $options.computedInputMode,
        onFocus: _cache[7] || (_cache[7] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
        onBlur: _cache[8] || (_cache[8] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
        maxlength: $props.maxlength,
        name: $props.name,
        autofocus: $props.autofocus,
        onInput: _cache[9] || (_cache[9] = (...args) => $options.input && $options.input(...args))
      }, null, 44, _hoisted_3$1)), [
        [vModelDynamic, $options.realValue]
      ]),
      $props.clearable && $props.type != "textarea" ? withDirectives((openBlock(), createElementBlock("div", {
        key: 3,
        class: "mvi-field-clear",
        onClick: _cache[10] || (_cache[10] = (...args) => $options.doClear && $options.doClear(...args)),
        style: normalizeStyle($options.clearStyle)
      }, [
        createVNode(_component_Icon, { type: "times-o" })
      ], 4)), [
        [vShow, $options.showClearIcon]
      ]) : createCommentVNode("", true),
      ($options.suffixIconType || $options.suffixIconUrl || _ctx.$slots.suffix) && $props.type != "textarea" ? (openBlock(), createElementBlock("div", {
        key: 4,
        class: "mvi-field-suffix",
        onClick: _cache[11] || (_cache[11] = (...args) => $options.suffixClick && $options.suffixClick(...args))
      }, [
        _ctx.$slots.suffix ? renderSlot(_ctx.$slots, "suffix", { key: 0 }, void 0, true) : $options.suffixIconType || $options.suffixIconUrl ? (openBlock(), createBlock(_component_Icon, {
          key: 1,
          type: $options.suffixIconType,
          url: $options.suffixIconUrl,
          spin: $options.suffixIconSpin,
          size: $options.suffixIconSize,
          color: $options.suffixIconColor
        }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
      ])) : createCommentVNode("", true)
    ], 6),
    ($options.appendIconType || $options.appendIconUrl || _ctx.$slots.append) && $props.type != "textarea" ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: "mvi-field-append",
      style: normalizeStyle($options.appendStyle),
      onClick: _cache[12] || (_cache[12] = (...args) => $options.appendClick && $options.appendClick(...args))
    }, [
      _ctx.$slots.append ? renderSlot(_ctx.$slots, "append", { key: 0 }, void 0, true) : $options.appendIconType || $options.appendIconUrl ? (openBlock(), createBlock(_component_Icon, {
        key: 1,
        type: $options.appendIconType,
        url: $options.appendIconUrl,
        spin: $options.appendIconSpin,
        size: $options.appendIconSize,
        color: $options.appendIconColor
      }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
    ], 4)) : createCommentVNode("", true)
  ], 10, _hoisted_1$3);
}
const Field = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-1ae395d3"]]);
Field.install = (app) => {
  app.component(Field.name, Field);
};
const getGuid = () => {
  let id = Dap.data.get(document.body, "mvi-editor-element-id") || 0;
  id += 1;
  Dap.data.set(document.body, "mvi-editor-element-id", id);
  return id;
};
const setEditorElementId = (el, id) => {
  el.setAttribute("mvi-editor-element", id);
};
const judgeFileSuffix = (fileName, allowedFileType) => {
  let suffix = fileName.substr(fileName.lastIndexOf(".") + 1);
  if (allowedFileType.length == 0) {
    return true;
  }
  suffix = suffix.toLocaleLowerCase();
  for (let i = 0; i < allowedFileType.length; i++) {
    allowedFileType[i] = allowedFileType[i].toLocaleLowerCase();
  }
  return allowedFileType.includes(suffix);
};
const initOption = (defaultObj, propObj) => {
  let obj = {};
  Object.assign(obj, defaultObj);
  Object.assign(obj, propObj);
  return obj;
};
const getValue = (modelValue) => {
  if (modelValue == "" || modelValue == "<br>" || modelValue == "<p></p>") {
    return "<p><br></p>";
  } else {
    return String(modelValue);
  }
};
const getNodeByElement = (ele) => {
  if (Dap.element.isElement(ele)) {
    return ele;
  }
  return getNodeByElement(ele.parentElement);
};
const insertNodeAfter = (newNode, targetNode) => {
  let parent = targetNode.parentNode;
  let children = Array.from(parent.childNodes);
  if (children[children.length - 1] == targetNode) {
    parent.appendChild(newNode);
  } else {
    parent.insertBefore(newNode, targetNode.nextSibling);
  }
};
const initTableGroups = () => {
  const arr = new Array();
  for (let i = 0; i < 10; i++) {
    let o = new Array();
    for (let j = 0; j < 10; j++) {
      o.push({
        x: j + 1,
        y: i + 1,
        inside: false
      });
    }
    arr.push(o);
  }
  return arr;
};
const createTableColBtn = () => {
  const btn = Dap.element.string2dom('<span contenteditable="false" class="mvi-editor-colbtn"></span>');
  return btn;
};
const copyTableRowAppend = (row) => {
  let newRow = row.cloneNode(true);
  newRow.querySelectorAll("td").forEach((td) => {
    td.innerHTML = "<br>";
  });
  insertNodeAfter(newRow, row);
  return newRow;
};
const copyTableColumnAppend = (column) => {
  const columns = Dap.element.children(column.parentNode, column.tagName);
  const index = [].indexOf.call(columns, column);
  const isLastColumn = columns.length - 1 == index;
  const tbody = column.parentNode.parentNode;
  tbody.querySelectorAll("tr").forEach((tr, i) => {
    let td = Dap.element.children(tr, "td")[index];
    let newColumn = td.cloneNode(true);
    newColumn.innerHTML = "<br>";
    if (i == 0) {
      const btn = createTableColBtn();
      if (isLastColumn) {
        td.appendChild(btn);
      } else {
        newColumn.appendChild(btn);
      }
    }
    insertNodeAfter(newColumn, td);
  });
  const colgroup = column.parentNode.parentNode.parentNode.querySelector("colgroup");
  const cols = Dap.element.children(colgroup, "col");
  const col = document.createElement("col");
  col.setAttribute("width", "auto");
  insertNodeAfter(col, cols[index]);
};
const removeTableColumn = (column) => {
  const columns = Dap.element.children(column.parentNode, column.tagName);
  const index = [].indexOf.call(columns, column);
  const isLastColumn = columns.length - 1 == index;
  const colgroup = column.parentNode.parentNode.parentNode.querySelector("colgroup");
  const cols = Dap.element.children(colgroup, "col");
  if (isLastColumn) {
    cols[index - 1].setAttribute("width", "auto");
  }
  const col = cols[index];
  col.remove();
  column.parentNode.parentNode.querySelectorAll("tr").forEach((tr, i) => {
    let td = Dap.element.children(tr, "td")[index];
    if (i == 0 && isLastColumn) {
      let previous = td.previousElementSibling;
      const btn = previous.querySelector(".mvi-editor-colbtn");
      if (btn) {
        btn.remove();
      }
    }
    td.remove();
  });
};
const isTableHeader = (row) => {
  let index = [].indexOf.call(Dap.element.children(row.parentNode, row.tagName), row);
  return index == 0;
};
const setTableNewHeader = (row) => {
  const columns = Dap.element.children(row, "td");
  columns.forEach((column, index) => {
    if (index < columns.length - 1) {
      const btn = createTableColBtn();
      column.appendChild(btn);
    }
  });
};
const setTableResize = (el, instance) => {
  const id = el.getAttribute("mvi-editor-element");
  const cols = Array.from(el.querySelectorAll("col"));
  const firstRow = el.querySelector("tr");
  const btns = Array.from(firstRow.querySelectorAll("span.mvi-editor-colbtn"));
  btns.forEach((btn) => {
    if (instance.disabled) {
      btn.style.cursor = "auto";
      btn.style.opacity = 0;
    } else {
      btn.style.cursor = "";
      btn.style.opacity = "";
    }
    btn.onmousedown = (e) => {
      if (instance.disabled) {
        return;
      }
      Dap.data.set(btn, "pageX", e.pageX);
      Dap.data.set(btn, "resizable", true);
    };
  });
  Dap.event.on(document.documentElement, `mousemove.editor_table_${id}`, (e) => {
    if (instance.disabled) {
      return;
    }
    const index = btns.findIndex((el2) => {
      return Dap.data.get(el2, "resizable");
    });
    if (index < 0) {
      return;
    }
    const btn = btns[index];
    let pageX = Dap.data.get(btn, "pageX");
    let moveX = e.pageX - pageX;
    cols[index].setAttribute("width", cols[index].offsetWidth + moveX);
    Dap.data.set(btn, "pageX", e.pageX);
  });
  Dap.event.on(document.documentElement, `mouseup.editor_table_${id}`, (e) => {
    if (instance.disabled) {
      return;
    }
    const btn = btns.find((el2) => {
      return Dap.data.get(el2, "resizable");
    });
    if (!btn) {
      return;
    }
    Dap.data.set(btn, "pageX", 0);
    Dap.data.set(btn, "resizable", false);
  });
};
const setElementResize = (el, instance) => {
  let obj = Dap.data.get(el, "mvi-editor-element-resize");
  if (obj) {
    obj.setRange();
    if (instance.disabled) {
      obj.disabledDragX();
      obj.disabledDragY();
    } else {
      obj.enabledDragX();
      obj.enabledDragY();
    }
    return;
  }
  obj = new Resize$1(el, {
    draggableX: !instance.disabled,
    draggableY: !instance.disabled
  });
  obj.init();
  Dap.data.set(el, "mvi-editor-element-resize", obj);
};
const resetResizeRange = (instance) => {
  instance.$refs.content.querySelectorAll("img[mvi-editor-element]").forEach((img) => {
    setElementResize(img, instance);
  });
  instance.$refs.content.querySelectorAll("video[mvi-editor-element]").forEach((video) => {
    setElementResize(video, instance);
  });
};
const formatCode = (el) => {
  Dap.element.children(el).forEach((childNode) => {
    let text = null;
    if (childNode.nodeName.toLocaleLowerCase() == "br") {
      text = document.createTextNode("\n");
    } else {
      text = document.createTextNode(childNode.innerText);
    }
    el.insertBefore(text, childNode);
    childNode.remove();
  });
  el.innerHTML = el.innerHTML.replaceAll("&nbsp;", " ").replaceAll("\r", "\n");
  el.innerHTML = el.innerHTML.split("\n").map((item) => {
    const hasSpace = /^(\s+)/g.test(item);
    if (item && !hasSpace) {
      return ` ${item}`;
    }
    return item;
  }).join("\n");
  if (!el.innerHTML) {
    el.innerHTML = " \n";
  }
};
function editorFormatter(addNode, removeNode, instance) {
  if (addNode) {
    for (let attribute of addNode.attributes) {
      if (attribute.nodeName.startsWith("on")) {
        addNode.removeAttribute(attribute.nodeName);
      }
    }
    if (addNode.nodeName.toLocaleLowerCase() == "blockquote") {
      const id = getGuid();
      setEditorElementId(addNode, id);
    } else if (addNode.nodeName.toLocaleLowerCase() == "hr") {
      const id = getGuid();
      setEditorElementId(addNode, id);
    } else if (addNode.nodeName.toLocaleLowerCase() == "img") {
      const id = getGuid();
      setEditorElementId(addNode, id);
      addNode.style.fontSize = "";
      setElementResize(addNode, instance);
    } else if (addNode.nodeName.toLocaleLowerCase() == "video") {
      const id = getGuid();
      setEditorElementId(addNode, id);
      addNode.setAttribute("muted", "muted");
      addNode.setAttribute("autoplay", "autoplay");
      addNode.style.fontSize = "";
      setElementResize(addNode, instance);
    } else if (addNode.nodeName.toLocaleLowerCase() == "pre") {
      const attributes = Array.from(addNode.attributes);
      for (let attribute of attributes) {
        addNode.removeAttribute(attribute.nodeName);
      }
      const id = getGuid();
      setEditorElementId(addNode, id);
      formatCode(addNode);
    } else if (addNode.nodeName.toLocaleLowerCase() == "table" && addNode.hasAttribute("mvi-editor-element")) {
      setTableResize(addNode, instance);
    } else if (addNode.nodeName.toLocaleLowerCase() == "td" && addNode.hasAttribute("mvi-editor-element")) {
      const id = addNode.getAttribute("mvi-editor-element");
      const table = instance.$refs.content.querySelector(`table[mvi-editor-element="${id}"]`);
      setTableResize(table, instance);
    } else if (addNode.nodeName.toLocaleLowerCase() == "a" || addNode.querySelector("a")) {
      if (addNode.nodeName.toLocaleLowerCase() == "a") {
        const id = getGuid();
        setEditorElementId(addNode, id);
      } else {
        addNode.querySelectorAll("a").forEach((link) => {
          const id = getGuid();
          setEditorElementId(link, id);
        });
      }
    }
  } else if (removeNode) {
    if (removeNode.nodeName.toLocaleLowerCase() == "tr" && removeNode.hasAttribute("mvi-editor-element")) {
      const columns = Dap.element.children(removeNode, "td");
      const isHead = columns.every((column, index) => {
        if (index < columns.length - 1) {
          return !!column.querySelector("span.mvi-editor-colbtn");
        }
        return true;
      });
      if (isHead) {
        let id = removeNode.getAttribute("mvi-editor-element");
        const table = instance.$refs.content.querySelector(`table[mvi-editor-element="${id}"]`);
        setTableResize(table, instance);
      }
    }
  }
  instance.updateHtmlText();
  instance.updateValue();
}
const defaultUploadImageProps = {
  multiple: false,
  allowedFileType: ["jpg", "png", "JPG", "PNG", "JPEG", "jpeg", "gif", "GIF", "jfif", "JFIF", "webp", "WEBP"],
  accept: "image",
  minSize: -1,
  maxSize: -1,
  minLength: -1,
  maxLength: -1
};
const defaultUploadVideoProps = {
  multiple: false,
  allowedFileType: ["mp4", "MP4", "avi", "AVI", "WAV", "wav"],
  accept: "video",
  minSize: -1,
  maxSize: -1,
  minLength: -1,
  maxLength: -1
};
const editor_vue_vue_type_style_index_0_scoped_1deda166_lang = "";
const _sfc_main$7 = {
  name: "m-editor",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: null
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    pasteText: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: "#0b73de",
      validator(value) {
        return Dap.common.matchingText(value, "hex");
      }
    },
    useBase64: {
      type: Boolean,
      default: true
    },
    uploadImageProps: {
      type: Object,
      default: function() {
        return {};
      }
    },
    uploadVideoProps: {
      type: Object,
      default: function() {
        return {};
      }
    },
    uploadImageError: {
      type: Function
    },
    uploadVideoError: {
      type: Function
    }
  },
  emits: ["update:modelValue", "blur", "focus", "input", "file-paste", "upload-image", "upload-video", "save"],
  data() {
    return {
      useMenus: false,
      range: null,
      codeViewShow: false,
      initalHtml: "",
      html: "",
      text: "",
      isModelChange: false,
      changeActiveJudgeFn: null,
      cursorArea: ""
    };
  },
  computed: {
    isEmpty() {
      return this.modelValue == "<p><br></p>" || this.modelValue == "" || this.modelValue == "<br>" || this.modelValue == "<p></p>";
    },
    contentClass() {
      let cls = ["mvi-editor-content"];
      if (this.autoHeight) {
        cls.push("mvi-editor-content-auto");
      }
      if (this.isEmpty) {
        cls.push("mvi-editor-content-empty");
      }
      return cls;
    },
    codeViewClass() {
      let cls = ["mvi-editor-codeview"];
      if (this.autoHeight) {
        cls.push("mvi-editor-codeview-auto");
      }
      return cls;
    },
    contentStyle() {
      let style = {};
      if (this.autoHeight) {
        if (this.height) {
          style.minHeight = this.height;
        }
      } else {
        if (this.height) {
          style.height = this.height;
        }
      }
      if (!this.border) {
        style.border = "none";
      }
      return style;
    },
    codeViewStyle() {
      let style = {};
      if (this.autoHeight) {
        if (this.height) {
          style.minHeight = this.height;
        }
      } else {
        if (this.height) {
          style.height = this.height;
        }
      }
      return style;
    },
    combinedUploadImageProps() {
      return initOption(defaultUploadImageProps, this.uploadImageProps);
    },
    combinedUploadVideoProps() {
      return initOption(defaultUploadVideoProps, this.uploadVideoProps);
    }
  },
  watch: {
    modelValue(newVal) {
      if (!this.isModelChange) {
        if (this.$refs.content) {
          this.$refs.content.innerHTML = getValue(newVal);
        } else if (this.$refs.codeView) {
          this.$refs.codeView.innerText = getValue(newVal);
        }
        this.updateHtmlText();
      }
    },
    codeViewShow(newValue) {
      this.$nextTick(() => {
        if (newValue) {
          this.$refs.codeView.innerText = this.html;
          this.collapseToEnd();
        } else {
          this.contentDomMonitor();
          if (this.html) {
            this.$refs.content.innerHTML = this.html;
          } else {
            this.$refs.content.innerHTML = getValue("");
            this.updateHtmlText();
            this.updateValue();
          }
          this.collapseToEnd();
          this.changeActive();
        }
      });
    },
    disabled(newValue) {
      if (newValue) {
        this.codeViewShow = false;
      }
      this.$nextTick(() => {
        this.$refs.content.querySelectorAll("table[mvi-editor-element]").forEach((table) => {
          setTableResize(table, this);
        });
        this.$refs.content.querySelectorAll("img[mvi-editor-element]").forEach((img) => {
          setElementResize(img, this);
        });
        this.$refs.content.querySelectorAll("video[mvi-editor-element]").forEach((video) => {
          setElementResize(video, this);
        });
      });
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      document.execCommand("defaultParagraphSeparator", false, "p");
      document.execCommand("styleWithCSS", false, true);
      this.contentDomMonitor();
      this.initalHtml = getValue(this.modelValue);
      this.$nextTick(() => {
        this.updateHtmlText();
        if (this.autofocus) {
          this.collapseToEnd();
        }
      });
    },
    contentKeydown(e) {
      const { Mac } = Dap.platform.os();
      if (e.keyCode == 13 && this.cursorArea == "code") {
        e.preventDefault();
        this.insertHtml("\n ");
      } else if (e.keyCode == 9) {
        e.preventDefault();
        if (this.cursorArea == "code") {
          this.insertHtml("  ");
        } else {
          this.insertHtml("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        }
      }
      if (e.keyCode == 83 && (Mac ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        this.$emit("save", {
          html: this.html,
          text: this.text
        });
      }
    },
    contentFocus() {
      if (this.disabled) {
        return;
      }
      if (!this.$refs.content) {
        return;
      }
      if (this.border && this.activeColor) {
        this.$refs.content.style.borderColor = this.activeColor;
        const rgb = Dap.color.hex2rgb(this.activeColor);
        this.$refs.content.style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
      }
      setTimeout(() => {
        this.changeActive();
        this.$nextTick(() => {
          this.$emit("focus", {
            html: this.html,
            text: this.text
          });
        });
      }, 0);
    },
    contentBlur() {
      if (this.disabled) {
        return;
      }
      if (!this.$refs.content) {
        return;
      }
      if (this.border && this.activeColor) {
        this.$refs.content.style.borderColor = "";
        this.$refs.content.style.boxShadow = "";
      }
      this.changeActive();
      this.$nextTick(() => {
        this.$emit("blur", {
          html: this.html,
          text: this.text
        });
      });
    },
    contentInput() {
      if (this.disabled) {
        return;
      }
      if (!this.$refs.content) {
        return;
      }
      this.changeActive();
      this.updateHtmlText();
      this.updateValue();
      this.$nextTick(() => {
        this.$emit("input", {
          html: this.html,
          text: this.text
        });
      });
    },
    contentPaste(event2) {
      let clip = (event2.originalEvent || event2).clipboardData;
      let text = clip.getData("text/plain") || "";
      if (this.pasteText || this.cursorArea == "code") {
        event2.preventDefault();
        if (text !== "") {
          if (this.cursorArea == "code") {
            this.insertHtml(text);
          } else {
            this.insertText(text);
          }
        }
      } else {
        if (clip.files.length > 0) {
          event2.preventDefault();
          for (let file of clip.files) {
            const isImage = judgeFileSuffix(file.name, this.combinedUploadImageProps.allowedFileType);
            const isVideo = judgeFileSuffix(file.name, this.combinedUploadVideoProps.allowedFileType);
            if (isImage || isVideo) {
              const minSize = isImage ? this.combinedUploadImageProps.minSize : this.combinedUploadVideoProps.minSize;
              const maxSize = isImage ? this.combinedUploadImageProps.maxSize : this.combinedUploadVideoProps.maxSize;
              if (file.size / 1024 > maxSize && maxSize > 0) {
                if (typeof this.uploadImageError == "function") {
                  this.uploadImageError(102, "\u6587\u4EF6" + file.name + "\u8D85\u51FA\u6587\u4EF6\u6700\u5927\u503C\u9650\u5B9A", file);
                } else {
                  Msgbox.msgbox({
                    message: "\u6587\u4EF6" + file.name + "\u8D85\u51FA\u6587\u4EF6\u6700\u5927\u503C\u9650\u5B9A",
                    animation: "scale"
                  });
                }
                return;
              }
              if (file.size / 1024 < minSize && minSize > 0) {
                if (typeof this.uploadImageError == "function") {
                  this.uploadImageError(103, "\u6587\u4EF6" + file.name + "\u6CA1\u6709\u8FBE\u5230\u6587\u4EF6\u6700\u5C0F\u503C\u9650\u5B9A", file);
                } else {
                  Msgbox.msgbox({
                    message: "\u6587\u4EF6" + file.name + "\u6CA1\u6709\u8FBE\u5230\u6587\u4EF6\u6700\u5C0F\u503C\u9650\u5B9A",
                    animation: "scale"
                  });
                }
                return;
              }
              if (this.useBase64) {
                Dap.file.dataFileToBase64(file).then((url) => {
                  if (isImage) {
                    this.insertImage(url);
                  } else if (isVideo) {
                    this.insertVideo(url);
                  }
                });
              } else {
                if (isImage) {
                  this.$emit("upload-image", [file]);
                } else if (isVideo) {
                  this.$emit("upload-video", [file]);
                }
              }
            } else {
              this.$emit("file-paste", file);
            }
          }
        }
      }
    },
    codeViewFocus() {
      if (this.disabled) {
        return;
      }
      if (!this.$refs.codeView) {
        return;
      }
      this.$emit("focus", {
        html: this.html,
        text: this.text
      });
    },
    codeViewBlur() {
      if (this.disabled) {
        return;
      }
      if (!this.$refs.codeView) {
        return;
      }
      this.$emit("blur", {
        html: this.html,
        text: this.text
      });
    },
    codeViewInput() {
      if (this.disabled) {
        return;
      }
      if (!this.$refs.codeView) {
        return;
      }
      this.updateHtmlText();
      this.updateValue();
      this.$emit("input", {
        html: this.html,
        text: this.text
      });
    },
    codeViewPaste(event2) {
      event2.preventDefault();
      let clip = (event2.originalEvent || event2).clipboardData;
      let text = clip.getData("text/plain") || "";
      if (text !== "") {
        document.execCommand("insertText", false, text);
      }
    },
    contentDomMonitor() {
      if (!this.$refs.content) {
        return;
      }
      const observe = new Observe$1(this.$refs.content, {
        attributes: false,
        childList: true,
        subtree: true,
        childNodesChange: (addNode, removeNode) => {
          if (this.disabled) {
            return;
          }
          editorFormatter(addNode, removeNode, this);
        }
      });
      observe.init();
    },
    changeActive() {
      if (this.disabled) {
        return;
      }
      if (!this.$refs.content) {
        return;
      }
      this.saveRange();
      if (typeof this.changeActiveJudgeFn == "function") {
        this.changeActiveJudgeFn();
      }
    },
    empty() {
      if (this.disabled) {
        return;
      }
      if (this.$refs.content) {
        this.$refs.content.innerHTML = getValue("");
      } else if (this.$refs.codeView) {
        this.$refs.codeView.innerText = getValue("");
      }
      this.updateHtmlText();
      this.updateValue();
      this.collapseToEnd();
    },
    saveRange() {
      if (this.disabled) {
        return;
      }
      if (!this.$refs.content) {
        return;
      }
      let selection = window.getSelection();
      if (selection.getRangeAt && selection.rangeCount) {
        this.range = selection.getRangeAt(0);
      }
    },
    restoreRange() {
      if (this.disabled) {
        return;
      }
      if (!this.$refs.content) {
        return;
      }
      let selection = window.getSelection();
      selection.removeAllRanges();
      if (this.range) {
        selection.addRange(this.range);
      }
    },
    collapseToEnd(node) {
      if (this.disabled) {
        return;
      }
      let el = null;
      if (node) {
        el = node;
      } else {
        if (this.$refs.content) {
          el = this.$refs.content;
        } else if (this.$refs.codeView) {
          el = this.$refs.codeView;
        }
      }
      let selection = window.getSelection();
      selection.selectAllChildren(el);
      selection.collapseToEnd();
    },
    collapseToStart(node) {
      if (this.disabled) {
        return;
      }
      let el = null;
      if (node) {
        el = node;
      } else {
        if (this.$refs.content) {
          el = this.$refs.content;
        } else if (this.$refs.codeView) {
          el = this.$refs.codeView;
        }
      }
      let selection = window.getSelection();
      selection.selectAllChildren(el);
      selection.collapseToStart();
    },
    getSelectNode() {
      if (this.disabled) {
        return null;
      }
      if (!this.range) {
        return null;
      }
      if (!this.$refs.content) {
        return null;
      }
      return getNodeByElement(this.range.commonAncestorContainer);
    },
    compareTag(el, tagName) {
      if (!Dap.element.isElement(el)) {
        return false;
      }
      if (!this.$refs.content) {
        return false;
      }
      if (Dap.element.isContains(this.$refs.content, el)) {
        if (el.tagName.toLocaleUpperCase() == tagName.toLocaleUpperCase()) {
          return true;
        }
        return this.compareTag(el.parentNode, tagName);
      }
      return false;
    },
    compareCss(el, cssName, cssValue, thinkParent = true) {
      if (!Dap.element.isElement(el)) {
        return false;
      }
      if (!this.$refs.content) {
        return false;
      }
      if (Dap.element.isContains(this.$refs.content, el)) {
        if (Dap.element.getCssStyle(el, cssName) == cssValue) {
          return true;
        }
        if (thinkParent) {
          return this.compareCss(el.parentNode, cssName, cssValue, thinkParent);
        }
      }
      return false;
    },
    compareAttribute(el, attrName, attrVal) {
      if (!Dap.element.isElement(el)) {
        return false;
      }
      if (!this.$refs.content) {
        return false;
      }
      if (Dap.element.isContains(this.$refs.content, el)) {
        if (el.hasAttribute(attrName)) {
          if (attrVal) {
            if (el.getAttribute(attrName) === attrVal) {
              return true;
            }
            return false;
          }
          return true;
        }
        return this.compareAttribute(el.parentNode, attrName, attrVal);
      }
      return false;
    },
    getCompareTag(el, tagName) {
      if (!Dap.element.isElement(el)) {
        return null;
      }
      if (!this.$refs.content) {
        return null;
      }
      if (Dap.element.isContains(this.$refs.content, el)) {
        if (el.tagName.toLocaleUpperCase() == tagName.toLocaleUpperCase()) {
          return el;
        } else {
          return this.getCompareTag(el.parentNode, tagName);
        }
      } else {
        return null;
      }
    },
    getCompareTagForCss(el, cssName, cssValue) {
      if (!Dap.element.isElement(el)) {
        return null;
      }
      if (!this.$refs.content) {
        return null;
      }
      if (Dap.element.isContains(this.$refs.content, el)) {
        if (Dap.element.getCssStyle(el, cssName) == cssValue) {
          return el;
        }
        return this.getCompareTagForCss(el.parentNode, cssName, cssValue);
      }
      return null;
    },
    getCompareTagForAttribute(el, attrName, attrVal) {
      if (!Dap.element.isElement(el)) {
        return null;
      }
      if (!this.$refs.content) {
        return null;
      }
      if (Dap.element.isContains(this.$refs.content, el)) {
        if (el.hasAttribute(attrName)) {
          if (attrVal) {
            if (el.getAttribute(attrName) === attrVal) {
              return el;
            }
            return null;
          }
          return el;
        }
        return this.getCompareTagForAttribute(el.parentNode, attrName, attrVal);
      } else {
        return null;
      }
    },
    updateValue() {
      this.isModelChange = true;
      this.$emit("update:modelValue", this.html);
      this.$nextTick(() => {
        setTimeout(() => {
          this.isModelChange = false;
        }, 0);
      });
    },
    updateHtmlText() {
      if (this.$refs.content) {
        if (!this.$refs.content.innerHTML) {
          this.$refs.content.innerHTML = getValue("");
        }
        this.html = this.$refs.content.innerHTML;
        this.text = this.$refs.content.innerText;
      } else if (this.$refs.codeView) {
        this.html = this.$refs.codeView.innerText;
        let el = Dap.element.string2dom(`<div>${this.$refs.codeView.innerText}</div>`);
        this.text = el.innerText;
      }
    },
    insertHtml(html, wrap, focus) {
      if (this.disabled) {
        return;
      }
      if (!this.$refs.content) {
        return;
      }
      if (!html) {
        return;
      }
      let dom = Dap.element.string2dom(html);
      if (wrap) {
        html = `${html}${getValue("")}`;
      }
      document.execCommand("insertHtml", false, html);
      if (wrap && focus && Dap.element.isElement(dom)) {
        const selectNode = this.getSelectNode();
        if (selectNode) {
          this.collapseToEnd(selectNode.previousElementSibling);
        }
      }
    },
    insertText(text) {
      if (this.disabled) {
        return;
      }
      if (!this.$refs.content) {
        return;
      }
      if (!text) {
        return;
      }
      document.execCommand("insertText", false, text);
    },
    insertImage(url) {
      if (this.disabled) {
        return;
      }
      if (!this.$refs.content) {
        return;
      }
      const imgHtml = `<img src="${url}" />`;
      this.insertHtml(imgHtml);
    },
    insertVideo(url) {
      if (this.disabled) {
        return;
      }
      if (!this.$refs.content) {
        return;
      }
      const videoHtml = `<video src="${url}"></video>`;
      this.insertHtml(videoHtml, true);
    },
    insertBlock(blockTag, wrap, focus) {
      document.execCommand("formatBlock", false, blockTag);
      if (wrap) {
        setTimeout(() => {
          const selectNode = this.getSelectNode();
          if (selectNode) {
            const blockEl = this.getCompareTag(selectNode, blockTag);
            const pEl = Dap.element.string2dom(getValue(""));
            insertNodeAfter(pEl, blockEl);
            this.updateHtmlText();
            this.updateValue();
            if (focus) {
              this.collapseToEnd(blockEl);
            } else {
              this.collapseToEnd(pEl);
            }
          }
        }, 0);
      }
    },
    use(instance) {
      if (this.useMenus) {
        throw new Error("The editor has already used a menu bar and cannot be used repeatedly");
      }
      instance.editorInstance = this;
      instance.editorContentDomMonitor();
      this.changeActiveJudgeFn = instance.changeActiveJudgeFn;
      this.useMenus = true;
    }
  }
};
const _hoisted_1$2 = ["textContent", "contenteditable"];
const _hoisted_2$2 = ["innerHTML", "contenteditable", "data-placeholder"];
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "mvi-editor",
    onDragstart: _cache[11] || (_cache[11] = ($event) => $event.preventDefault()),
    onDrop: _cache[12] || (_cache[12] = ($event) => $event.preventDefault()),
    onDragover: _cache[13] || (_cache[13] = ($event) => $event.preventDefault())
  }, [
    $data.codeViewShow ? (openBlock(), createElementBlock("div", {
      ref: "codeView",
      textContent: toDisplayString($data.initalHtml),
      key: "code",
      contenteditable: !$props.disabled || null,
      style: normalizeStyle($options.codeViewStyle),
      class: normalizeClass($options.codeViewClass),
      onBlur: _cache[0] || (_cache[0] = (...args) => $options.codeViewBlur && $options.codeViewBlur(...args)),
      onFocus: _cache[1] || (_cache[1] = (...args) => $options.codeViewFocus && $options.codeViewFocus(...args)),
      onInput: _cache[2] || (_cache[2] = (...args) => $options.codeViewInput && $options.codeViewInput(...args)),
      onPaste: _cache[3] || (_cache[3] = (...args) => $options.codeViewPaste && $options.codeViewPaste(...args))
    }, null, 46, _hoisted_1$2)) : (openBlock(), createElementBlock("div", {
      ref: "content",
      innerHTML: $data.initalHtml,
      key: "content",
      contenteditable: !$props.disabled || null,
      style: normalizeStyle($options.contentStyle),
      class: normalizeClass($options.contentClass),
      "data-placeholder": $props.placeholder,
      onBlur: _cache[4] || (_cache[4] = (...args) => $options.contentBlur && $options.contentBlur(...args)),
      onFocus: _cache[5] || (_cache[5] = (...args) => $options.contentFocus && $options.contentFocus(...args)),
      onInput: _cache[6] || (_cache[6] = (...args) => $options.contentInput && $options.contentInput(...args)),
      onPaste: _cache[7] || (_cache[7] = (...args) => $options.contentPaste && $options.contentPaste(...args)),
      onKeyup: _cache[8] || (_cache[8] = (...args) => $options.changeActive && $options.changeActive(...args)),
      onClick: _cache[9] || (_cache[9] = (...args) => $options.changeActive && $options.changeActive(...args)),
      onKeydown: _cache[10] || (_cache[10] = (...args) => $options.contentKeydown && $options.contentKeydown(...args))
    }, null, 46, _hoisted_2$2))
  ], 32);
}
const Editor = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-1deda166"]]);
Editor.install = (app) => {
  app.component(Editor.name, Editor);
};
const unactiveMenus = ["title", "undo", "redo", "removeFormat", "divider", "fontFamily", "fontSize", "foreColor", "backColor", "justify", "image", "video"];
const defaultConfig = [
  {
    key: "undo",
    name: "\u64A4\u56DE",
    icon: "undo",
    data: true
  },
  {
    key: "redo",
    name: "\u6062\u590D",
    icon: "redo",
    data: true
  },
  {
    key: "removeFormat",
    name: "\u6E05\u9664\u683C\u5F0F",
    icon: "clear",
    data: true
  },
  {
    key: "divider",
    name: "\u5206\u9694\u7EBF",
    icon: "divider",
    data: true
  },
  {
    key: "bold",
    name: "\u52A0\u7C97",
    icon: "bold",
    data: true
  },
  {
    key: "italic",
    name: "\u659C\u4F53",
    icon: "italic",
    data: true
  },
  {
    key: "underline",
    name: "\u4E0B\u5212\u7EBF",
    icon: "underline",
    data: true
  },
  {
    key: "strikeThrough",
    name: "\u5220\u9664\u7EBF",
    icon: "strikethrough",
    data: true
  },
  {
    key: "subscript",
    name: "\u4E0B\u6807",
    icon: "subscript",
    data: true
  },
  {
    key: "superscript",
    name: "\u4E0A\u6807",
    icon: "superscript",
    data: true
  },
  {
    key: "title",
    name: "\u6807\u9898",
    value: "p",
    data: [
      {
        label: "H1",
        value: "h1"
      },
      {
        label: "H2",
        value: "h2"
      },
      {
        label: "H3",
        value: "h3"
      },
      {
        label: "H4",
        value: "h4"
      },
      {
        label: "H5",
        value: "h5"
      },
      {
        label: "\u6B63\u6587",
        value: "p"
      }
    ]
  },
  {
    key: "fontFamily",
    name: "\u5B57\u4F53",
    value: "\u5FAE\u8F6F\u96C5\u9ED1",
    data: [
      {
        label: "\u9ED8\u8BA4\u5B57\u4F53",
        value: "\u5FAE\u8F6F\u96C5\u9ED1"
      },
      "\u9ED1\u4F53",
      "\u4EFF\u5B8B",
      "\u6977\u4F53",
      "\u5B8B\u4F53",
      "Arial",
      "Consolas"
    ]
  },
  {
    key: "fontSize",
    name: "\u5B57\u53F7",
    value: "0.28rem",
    data: [
      {
        label: "\u9ED8\u8BA4\u5B57\u53F7",
        value: "0.28rem"
      },
      {
        label: "12px",
        value: "0.24rem"
      },
      {
        label: "16px",
        value: "0.32rem"
      },
      {
        label: "20px",
        value: "0.4rem"
      },
      {
        label: "28px",
        value: "0.56rem"
      },
      {
        label: "36px",
        value: "0.72rem"
      },
      {
        label: "48px",
        value: "0.96rem"
      }
    ]
  },
  {
    key: "foreColor",
    name: "\u6587\u5B57\u989C\u8272",
    icon: "color-picker",
    data: ["#000000", "#505050", "#808080", "#BBBBBB", "#CCCCCC", "#EEEEEE", "#F7F7F7", "#FFFFFF", "#EC1A0A", "#FF9900", "#FFFF00", "#07C160", "#00FFFF", "#0B73DE", "#9C00FF", "#FF00FF", "#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE", "#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD", "#e45649", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5", "#CE0000", "#E79439", "#EFC631", "#50a14f", "#4A7B8C", "#03A8F3", "#634AA5", "#A54A7B", "#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842", "#630000", "#7B3900", "#986801", "#295218", "#083139", "#003163", "#21104A", "#4A1031"]
  },
  {
    key: "backColor",
    name: "\u80CC\u666F\u8272",
    icon: "brush",
    data: ["#000000", "#505050", "#808080", "#BBBBBB", "#CCCCCC", "#EEEEEE", "#F7F7F7", "#FFFFFF", "#EC1A0A", "#FF9900", "#FFFF00", "#07C160", "#00FFFF", "#0B73DE", "#9C00FF", "#FF00FF", "#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE", "#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD", "#E76363", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5", "#CE0000", "#E79439", "#EFC631", "#6BA54A", "#4A7B8C", "#03A8F3", "#634AA5", "#A54A7B", "#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842", "#630000", "#7B3900", "#846300", "#295218", "#083139", "#003163", "#21104A", "#4A1031"]
  },
  {
    key: "ol",
    name: "\u6709\u5E8F\u5217\u8868",
    icon: "ol",
    data: true
  },
  {
    key: "ul",
    name: "\u65E0\u5E8F\u5217\u8868",
    icon: "ul",
    data: true
  },
  {
    key: "justify",
    name: "\u5BF9\u9F50\u65B9\u5F0F",
    icon: "align-left",
    data: [
      {
        label: "\u5DE6\u5BF9\u9F50",
        value: "justifyLeft",
        icon: "align-left"
      },
      {
        label: "\u5C45\u4E2D\u5BF9\u9F50",
        value: "justifyCenter",
        icon: "align-center"
      },
      {
        label: "\u53F3\u5BF9\u9F50",
        value: "justifyRight",
        icon: "align-right"
      },
      {
        label: "\u4E24\u7AEF\u5BF9\u9F50",
        value: "justifyFull",
        icon: "align-justify"
      }
    ]
  },
  {
    key: "quote",
    name: "\u5F15\u7528",
    icon: "quote",
    data: true
  },
  {
    key: "link",
    name: "\u63D2\u5165\u94FE\u63A5",
    icon: "link",
    data: [
      {
        label: "\u63D2\u5165\u94FE\u63A5",
        value: "link"
      }
    ]
  },
  {
    key: "image",
    name: "\u63D2\u5165\u56FE\u7247",
    icon: "image",
    data: [
      {
        label: "\u672C\u5730\u4E0A\u4F20",
        value: "upload"
      },
      {
        label: "\u7F51\u7EDC\u56FE\u7247",
        value: "remote"
      }
    ]
  },
  {
    key: "video",
    name: "\u63D2\u5165\u89C6\u9891",
    icon: "video",
    data: [
      {
        label: "\u672C\u5730\u4E0A\u4F20",
        value: "upload"
      },
      {
        label: "\u7F51\u7EDC\u89C6\u9891",
        value: "remote"
      }
    ]
  },
  {
    key: "table",
    name: "\u63D2\u5165\u8868\u683C",
    icon: "table-alt",
    data: []
  },
  {
    key: "code",
    name: "\u63D2\u5165\u4EE3\u7801",
    icon: "code",
    data: true
  },
  {
    key: "codeView",
    name: "\u663E\u793A\u6E90\u7801",
    icon: "eye",
    data: false
  }
];
const defaultLayerProps = {
  placement: "bottom-start",
  offset: "0rem",
  zIndex: 400,
  fixed: false,
  fixedAuto: false,
  width: null,
  wrapperClass: null,
  timeout: 100,
  showTriangle: false,
  animation: null,
  shadow: true,
  border: true
};
const defaultTooltipProps = {
  placement: "bottom",
  timeout: 200,
  color: "#333",
  textColor: "#fff",
  borderColor: "#333",
  offset: "0.1rem",
  zIndex: 100,
  fixed: false,
  fixedAuto: false,
  width: null,
  showTriangle: true,
  animation: null
};
const _sfc_main$6 = {
  props: {
    tag: {
      type: String,
      default: "div"
    }
  },
  components: {
    Tag: {
      render() {
        return h(
          this.$parent.tag,
          {},
          {
            default: this.$slots.default
          }
        );
      }
    }
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Tag = resolveComponent("Tag");
  return openBlock(), createBlock(_component_Tag, null, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  });
}
const editorTag = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
const editorMenu_vue_vue_type_style_index_0_scoped_50fe4648_lang = "";
const _sfc_main$5 = {
  name: "m-editor-menu",
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      selectVal: {},
      layerShow: false,
      active: false,
      tableParams: {
        size: [],
        groups: initTableGroups()
      },
      linkParams: {
        url: "",
        text: "",
        target: false
      },
      mediaParams: {
        tabIndex: 0,
        remoteUrl: ""
      }
    };
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  computed: {
    disabledColorToolTip() {
      return (item) => {
        if (!item.label) {
          return true;
        }
        if (this.disabledMenu) {
          return true;
        }
        return false;
      };
    },
    disabledToolTip() {
      if (!this.options.name) {
        return true;
      }
      if (this.disabledMenu) {
        return true;
      }
      return false;
    },
    disabledMenu() {
      if (!this.$parent.editorInstance) {
        return true;
      }
      if (this.$parent.editorInstance.disabled) {
        return true;
      }
      if (!this.$parent.editorInstance.range) {
        return true;
      }
      if (this.options.disabled) {
        return true;
      }
      if (this.options.key != "codeView" && this.$parent.editorInstance.codeViewShow) {
        return true;
      }
      if (this.$parent.editorInstance.cursorArea == "code") {
        return ["divider", "title", "fontFamily", "fontSize", "ol", "ul", "justify", "quote", "link", "image", "video", "table"].includes(this.options.key);
      }
      if (this.$parent.editorInstance.cursorArea == "quote") {
        return ["divider", "title", "fontFamily", "fontSize", "ol", "ul", "justify", "code", "link", "image", "video", "table"].includes(this.options.key);
      }
      if (this.$parent.editorInstance.cursorArea == "table") {
        return ["divider", "title", "ol", "ul", "link", "image", "video", "quote", "code"].includes(this.options.key);
      }
      return false;
    },
    isValueMenu() {
      return this.options.hasOwnProperty("value") && this.isLayerMenu;
    },
    isLayerMenu() {
      return Array.isArray(this.options.data);
    },
    layerElTag() {
      return (item) => {
        if (this.options.key == "title") {
          return item.value;
        }
        return "div";
      };
    },
    layerElStyle() {
      return (item) => {
        let style = {};
        if (this.options.key == "fontFamily") {
          style.fontFamily = item.value;
        }
        return style;
      };
    },
    editorTargetStyle() {
      let style = {};
      if (this.disabledMenu) {
        return style;
      }
      if (this.active && !unactiveMenus.includes(this.options.key)) {
        style.opacity = 1;
        if (this.$parent.editorInstance.activeColor) {
          style.color = this.$parent.editorInstance.activeColor;
        }
      }
      return style;
    },
    menuColorStyle() {
      return (item) => {
        let style = {};
        if (this.disabledMenu) {
          return style;
        }
        if (this.active && this.selectVal.value == item.value && this.$parent.editorInstance.activeColor) {
          style.borderColor = this.$parent.editorInstance.activeColor;
        }
        return style;
      };
    },
    layerActiveClass() {
      return (dataItem) => {
        if (this.active && dataItem.value == this.selectVal.value) {
          return this.options.layerActiveClass || this.$parent.layerActiveClass || "active";
        }
        return "";
      };
    },
    activeColorStyle() {
      let style = {};
      if (this.disabledMenu) {
        return style;
      }
      if (this.$parent.editorInstance.activeColor) {
        style.color = this.$parent.editorInstance.activeColor;
      }
      return style;
    },
    uploadOptions() {
      let options = {};
      if (!this.$parent.editorInstance) {
        return options;
      }
      if (this.options.key == "image") {
        options = this.$parent.editorInstance.combinedUploadImageProps;
      } else if (this.options.key == "video") {
        options = this.$parent.editorInstance.combinedUploadVideoProps;
      }
      return {
        ...options,
        select: (files) => {
          this.$parent.editorInstance.restoreRange();
          if (this.$parent.editorInstance.useBase64) {
            files.forEach((file) => {
              Dap.file.dataFileToBase64(file).then((base64) => {
                if (this.options.key == "image") {
                  this.$parent.editorInstance.insertImage(base64);
                } else if (this.options.key == "video") {
                  this.$parent.editorInstance.insertVideo(base64);
                }
              });
            });
          } else {
            if (this.options.key == "image") {
              this.$parent.editorInstance.$emit("upload-image", files);
            } else if (this.options.key == "video") {
              this.$parent.editorInstance.$emit("upload-video", files);
            }
          }
          this.hideLayer();
        },
        error: (state, message, file) => {
          if (this.options.key == "image") {
            if (typeof this.$parent.editorInstance.uploadImageError == "function") {
              this.$parent.editorInstance.uploadImageError(state, message, file);
            } else {
              Msgbox.msgbox({
                message,
                animation: "scale"
              });
            }
          } else if (this.options.key == "video") {
            if (typeof this.$parent.editorInstance.uploadVideoError == "function") {
              this.$parent.editorInstance.uploadVideoError(state, message, file);
            } else {
              Msgbox.msgbox({
                message,
                animation: "scale"
              });
            }
          }
          this.hideLayer();
        }
      };
    },
    linkPlaceholder() {
      if (this.options.key == "link") {
        const placeholder = this.options.placeholder;
        if (Array.isArray(placeholder)) {
          return [placeholder[0] || "\u94FE\u63A5\u6587\u672C", placeholder[1] || "\u94FE\u63A5\u5730\u5740"];
        }
      }
      return ["\u94FE\u63A5\u6587\u672C", "\u94FE\u63A5\u5730\u5740"];
    },
    mediaPlaceholder() {
      if (this.options.key == "image" || this.options.key == "video") {
        if (typeof this.options.placeholder == "string" && this.options.placeholder) {
          return this.options.placeholder;
        }
        if (this.options.key == "image") {
          return "\u56FE\u7247\u94FE\u63A5";
        }
        if (this.options.key == "video") {
          return "\u89C6\u9891\u94FE\u63A5";
        }
      }
    },
    operationText() {
      return (index) => {
        let defaultArray = ["\u63D2\u5165\u884C", "\u5220\u9664\u884C", "\u63D2\u5165\u5217", "\u5220\u9664\u5217"];
        if (Array.isArray(this.options.operationText)) {
          return this.options.operationText[index] ? this.options.operationText[index] : defaultArray[index];
        }
        return defaultArray[index];
      };
    }
  },
  components: {
    Tooltip,
    Icon,
    Layer,
    Checkbox,
    Tabs,
    Tab,
    editorTag
  },
  watch: {
    isValueMenu: {
      immediate: true,
      handler: function(newVal) {
        if (newVal) {
          this.initSelectVal();
        }
      }
    },
    "$parent.editorInstance.codeViewShow": function(newVal) {
      if (this.options.key == "codeView") {
        this.active = newVal;
      }
    }
  },
  methods: {
    tabChange() {
      this.$nextTick(() => {
        let disabled = this.options.data.some((item) => {
          return item.disabled && item.value == "upload";
        });
        const elements = this.$el.querySelectorAll(".mvi-editor-menu-media-upload");
        if (elements.length) {
          for (let i = 0; i < elements.length; i++) {
            let upload = new Upload$1(elements[i], { ...this.uploadOptions, disabled });
            upload.init();
          }
        }
      });
    },
    layerShowing() {
      if (this.options.key == "link") {
        this.initLinkParams();
      } else if (this.options.key == "image" || this.options.key == "video") {
        this.initUploadParams();
      } else if (this.options.key == "table") {
        this.initTableParams();
      }
    },
    initUploadParams() {
      this.mediaParams.tabIndex = 0;
      this.mediaParams.remoteUrl = "";
      let disabled = this.options.data.some((item) => {
        return item.disabled && item.value == "upload";
      });
      const elements = this.$el.querySelectorAll(".mvi-editor-menu-media-upload");
      if (elements.length) {
        for (let i = 0; i < elements.length; i++) {
          let upload = new Upload$1(elements[i], { ...this.uploadOptions, disabled });
          upload.init();
        }
      }
    },
    initLinkParams() {
      if (this.active) {
        let node = this.$parent.editorInstance.getSelectNode();
        let a = this.$parent.editorInstance.getCompareTag(node, "a");
        this.linkParams.url = a.getAttribute("href");
        this.linkParams.text = a.innerText;
        this.linkParams.target = a.hasAttribute("target");
        this.$nextTick(() => {
          this.$refs.linkText.focus();
        });
      } else {
        this.linkParams.url = "";
        this.linkParams.target = false;
        let text = this.$parent.editorInstance.range.toString();
        if (text) {
          this.linkParams.text = text;
          this.$refs.linkUrl.focus();
        } else {
          this.linkParams.text = "";
          this.$refs.linkText.focus();
        }
      }
    },
    initTableParams() {
      if (!this.active) {
        this.tableParams.size = [];
        this.tableParams.groups = initTableGroups();
      }
    },
    inputFocus(event2) {
      if (this.$parent.editorInstance.activeColor) {
        event2.currentTarget.style.borderColor = this.$parent.editorInstance.activeColor;
      }
    },
    inputBlur(event2) {
      if (this.$parent.editorInstance.activeColor) {
        event2.currentTarget.style.borderColor = "";
      }
    },
    selectLayerItem(dataItem, index) {
      if (this.disabledMenu) {
        return;
      }
      if (dataItem.disabled) {
        return;
      }
      this.$parent.editorInstance.restoreRange();
      this.handler(dataItem, index);
      this.hideLayer();
    },
    handler(dataItem, index) {
      if (["undo", "redo", "removeFormat", "bold", "italic", "underline", "strikeThrough", "subscript", "superscript"].includes(this.options.key)) {
        document.execCommand(this.options.key);
      } else if (this.options.key == "title") {
        this.$parent.editorInstance.insertBlock(dataItem.value);
      } else if (this.options.key == "divider") {
        this.$parent.editorInstance.insertHtml("<hr>", true);
      } else if (this.options.key == "fontFamily") {
        document.execCommand("fontName", false, dataItem.value);
      } else if (this.options.key == "fontSize") {
        document.execCommand("fontSize", false, index + 1);
      } else if (this.options.key == "foreColor") {
        document.execCommand("foreColor", false, dataItem.value);
      } else if (this.options.key == "backColor") {
        document.execCommand("backColor", false, dataItem.value);
      } else if (this.options.key == "ol") {
        document.execCommand("insertOrderedList");
      } else if (this.options.key == "ul") {
        document.execCommand("insertUnorderedList");
      } else if (this.options.key == "justify") {
        document.execCommand(dataItem.value);
      } else if (this.options.key == "quote") {
        if (this.active) {
          this.removeBlockQuote();
        } else {
          this.$parent.editorInstance.insertBlock("blockquote", true, true);
        }
      } else if (this.options.key == "code") {
        if (this.active) {
          this.removeCode();
        } else {
          this.$parent.editorInstance.insertBlock("pre", true, true);
        }
      } else if (this.options.key == "codeView") {
        this.$parent.editorInstance.codeViewShow = !this.$parent.editorInstance.codeViewShow;
      } else if (dataItem) {
        this.$parent.$emit("custom", {
          options: { ...this.options },
          item: { ...dataItem },
          index
        });
      } else {
        this.$parent.$emit("custom", { ...this.options });
      }
      this.$nextTick(() => {
        if (this.$parent.editorInstance.$refs.content) {
          resetResizeRange(this.$parent.editorInstance);
        }
      });
    },
    targetTrigger() {
      if (this.disabledMenu) {
        return;
      }
      if (this.isLayerMenu) {
        if (this.$parent.trigger == "click") {
          if (this.layerShow) {
            this.hideLayer();
          } else {
            this.showLayer();
          }
        }
      } else {
        this.$parent.editorInstance.restoreRange();
        this.handler();
      }
    },
    targetHover(type, event2) {
      if (this.disabledMenu) {
        return;
      }
      if (type == "enter") {
        if (this.options.hoverClass) {
          Dap.element.addClass(event2.currentTarget, this.options.hoverClass);
        } else if (this.$parent.hoverClass) {
          Dap.element.addClass(event2.currentTarget, this.$parent.hoverClass);
        }
      } else if (type == "leave") {
        if (this.options.hoverClass) {
          Dap.element.removeClass(event2.currentTarget, this.options.hoverClass);
        } else if (this.$parent.hoverClass) {
          Dap.element.removeClass(event2.currentTarget, this.$parent.hoverClass);
        }
      }
    },
    editorMenuHover(type) {
      if (this.$parent.trigger != "hover") {
        return;
      }
      if (type == "enter") {
        this.showLayer();
      } else if (type == "leave") {
        this.hideLayer();
      }
    },
    layerItemHover(type, dataItem, event2) {
      if (this.disabledMenu) {
        return;
      }
      if (dataItem.disabled) {
        return;
      }
      if (type == "enter") {
        if (this.options.layerHoverClass) {
          Dap.element.addClass(event2.currentTarget, this.options.layerHoverClass);
        } else if (this.$parent.layerHoverClass) {
          Dap.element.addClass(event2.currentTarget, this.$parent.layerHoverClass);
        }
      } else if (type == "leave") {
        if (this.options.layerHoverClass) {
          Dap.element.removeClass(event2.currentTarget, this.options.layerHoverClass);
        } else if (this.$parent.layerHoverClass) {
          Dap.element.removeClass(event2.currentTarget, this.$parent.layerHoverClass);
        }
      }
    },
    showLayer() {
      if (this.disabledMenu) {
        return;
      }
      if (this.isLayerMenu) {
        this.layerShow = true;
      }
    },
    hideLayer() {
      if (this.isLayerMenu) {
        this.layerShow = false;
      }
    },
    initSelectVal() {
      this.selectVal = this.options.data.find((item) => {
        return item.value == this.options.value;
      });
      if (this.selectVal) {
        this.active = true;
      }
    },
    removeBlockQuote() {
      if (this.disabledMenu) {
        return;
      }
      let node = this.$parent.editorInstance.getSelectNode();
      if (!node) {
        return;
      }
      const blockquote = this.$parent.editorInstance.getCompareTag(node, "blockquote");
      let pEl = Dap.element.string2dom("<p>" + blockquote.innerHTML + "</p>");
      if (pEl instanceof HTMLCollection) {
        pEl = Dap.element.string2dom("<div>" + blockquote.innerHTML + "</div>");
      }
      insertNodeAfter(pEl, blockquote);
      blockquote.remove();
      this.$parent.editorInstance.collapseToEnd(pEl);
      this.active = false;
      this.$parent.editorInstance.updateHtmlText();
      this.$parent.editorInstance.updateValue();
    },
    insertLink() {
      if (this.disabledMenu) {
        return;
      }
      if (!this.linkParams.url) {
        this.hideLayer();
        return;
      }
      if (!this.linkParams.text) {
        this.linkParams.text = this.linkParams.url;
      }
      let link = Dap.element.string2dom(`<a href="${this.linkParams.url}">${this.linkParams.text}</a>`);
      if (this.linkParams.target) {
        link.setAttribute("target", "_blank");
      }
      this.$parent.editorInstance.restoreRange();
      if (this.active) {
        let node = this.$parent.editorInstance.getSelectNode();
        if (node && this.$parent.editorInstance.compareTag(node, "a")) {
          let a = this.$parent.editorInstance.getCompareTag(node, "a");
          a.remove();
        }
      }
      this.$parent.editorInstance.insertHtml(link.outerHTML);
      this.hideLayer();
    },
    deleteLink() {
      if (this.disabledMenu) {
        return;
      }
      this.$parent.editorInstance.restoreRange();
      let node = this.$parent.editorInstance.getSelectNode();
      if (this.$parent.editorInstance.compareTag(node, "a")) {
        let a = this.$parent.editorInstance.getCompareTag(node, "a");
        if (a) {
          let innerHTML = a.innerHTML;
          a.remove();
          this.active = false;
          this.$parent.editorInstance.insertHtml(innerHTML);
        }
      }
      this.$parent.editorInstance.updateHtmlText();
      this.$parent.editorInstance.updateValue();
      this.hideLayer();
    },
    insertRemote() {
      if (this.disabledMenu) {
        return;
      }
      let disabled = this.options.data.some((item) => {
        return item.disabled && item.value == "remote";
      });
      if (disabled) {
        return;
      }
      if (!this.mediaParams.remoteUrl) {
        this.hideLayer();
        return;
      }
      this.$parent.editorInstance.restoreRange();
      if (this.options.key == "image") {
        this.$parent.editorInstance.insertImage(this.mediaParams.remoteUrl);
      } else if (this.options.key == "video") {
        this.$parent.editorInstance.insertVideo(this.mediaParams.remoteUrl);
      }
      this.hideLayer();
    },
    changeTableSize(data) {
      this.tableParams.size = [data.x, data.y];
      for (let i in this.tableParams.groups) {
        const group = this.tableParams.groups[i];
        for (let j in group) {
          if (group[j].x <= data.x && group[j].y <= data.y) {
            this.tableParams.groups[i][j].inside = true;
          } else {
            this.tableParams.groups[i][j].inside = false;
          }
        }
      }
    },
    confirmTableSize() {
      if (this.disabledMenu) {
        return;
      }
      let id = getGuid();
      const table = document.createElement("table");
      setEditorElementId(table, id);
      table.setAttribute("cellpadding", "0");
      table.setAttribute("cellspacing", "0");
      const colGroup = document.createElement("colgroup");
      const tbody = document.createElement("tbody");
      setEditorElementId(tbody, id);
      for (let i = 0; i < this.tableParams.size[1]; i++) {
        const tr = document.createElement("tr");
        setEditorElementId(tr, id);
        for (let j = 0; j < this.tableParams.size[0]; j++) {
          const td = document.createElement("td");
          td.innerHTML = "<br>";
          setEditorElementId(td, id);
          tr.appendChild(td);
          if (i == 0 && j < this.tableParams.size[0] - 1) {
            const btn = createTableColBtn();
            td.appendChild(btn);
          }
        }
        tbody.appendChild(tr);
      }
      for (let j = 0; j < this.tableParams.size[0]; j++) {
        const col = document.createElement("col");
        col.setAttribute("width", "auto");
        colGroup.appendChild(col);
      }
      table.appendChild(colGroup);
      table.appendChild(tbody);
      this.$parent.editorInstance.restoreRange();
      this.$parent.editorInstance.insertHtml(table.outerHTML, true);
      this.setTableCollapse("insertTable", { id });
      this.hideLayer();
    },
    addTableRow() {
      let node = this.$parent.editorInstance.getSelectNode();
      if (this.$parent.editorInstance.compareTag(node, "td")) {
        let column = this.$parent.editorInstance.getCompareTag(node, "td");
        let row = column.parentNode;
        let index = [].indexOf.call(Dap.element.children(row, column.tagName), column);
        let newRow = copyTableRowAppend(row);
        this.setTableCollapse("addRow", { newRow, index });
      } else if (this.$parent.editorInstance.compareTag(node, "tr")) {
        let row = this.$parent.editorInstance.getCompareTag(node, "tr");
        let newRow = copyTableRowAppend(row);
        this.setTableCollapse("addRow", { newRow });
      } else if (this.$parent.editorInstance.compareTag(node, "tbody")) {
        let tbody = this.$parent.editorInstance.getCompareTag(node, "tbody");
        let rows = Dap.element.children(tbody, "tr");
        let row = rows[rows.length - 1];
        let newRow = copyTableRowAppend(row);
        this.setTableCollapse("addRow", { newRow });
      } else if (this.$parent.editorInstance.compareTag(node, "table")) {
        let table = this.$parent.editorInstance.getCompareTag(node, "table");
        let rows = Dap.element.children(table, "tr");
        let row = rows[rows.length - 1];
        let newRow = copyTableRowAppend(row);
        this.setTableCollapse("addRow", { newRow });
      }
      this.$parent.editorInstance.updateHtmlText();
      this.$parent.editorInstance.updateValue();
      this.hideLayer();
    },
    removeTableRow() {
      let node = this.$parent.editorInstance.getSelectNode();
      if (this.$parent.editorInstance.compareTag(node, "td")) {
        let column = this.$parent.editorInstance.getCompareTag(node, "td");
        let row = column.parentNode;
        let isHead = isTableHeader(row);
        let index = [].indexOf.call(Dap.element.children(row, column.tagName), column);
        let tbody = row.parentNode;
        let previousRow = row.previousElementSibling;
        let nextRow = row.nextElementSibling;
        if (isHead) {
          setTableNewHeader(nextRow);
        }
        row.remove();
        this.setTableCollapse("removeRow", { index, tbody, previousRow });
      } else if (this.$parent.editorInstance.compareTag(node, "tr")) {
        let row = this.$parent.editorInstance.getCompareTag(node, "tr");
        let isHead = isTableHeader(row);
        let tbody = row.parentNode;
        let previousRow = row.previousElementSibling;
        let nextRow = row.nextElementSibling;
        if (isHead) {
          setTableNewHeader(nextRow);
        }
        row.remove();
        this.setTableCollapse("removeRow", { tbody, previousRow });
      } else if (this.$parent.editorInstance.compareTag(node, "tbody")) {
        let tbody = this.$parent.editorInstance.getCompareTag(node, "tbody");
        let rows = Dap.element.children(tbody, "tr");
        let row = rows[rows.length - 1];
        let isHead = isTableHeader(row);
        let previousRow = row.previousElementSibling;
        let nextRow = row.nextElementSibling;
        if (isHead) {
          setTableNewHeader(nextRow);
        }
        row.remove();
        this.setTableCollapse("removeRow", { tbody, previousRow });
      } else if (this.$parent.editorInstance.compareTag(node, "table")) {
        let table = this.$parent.editorInstance.getCompareTag(node, "table");
        let tbody = table.querySelector("tbody");
        let rows = Dap.element.children(tbody, "tr");
        let row = rows[rows.length - 1];
        let isHead = isTableHeader(row);
        let previousRow = row.previousElementSibling;
        let nextRow = row.nextElementSibling;
        if (isHead) {
          setTableNewHeader(nextRow);
        }
        row.remove();
        this.setTableCollapse("removeRow", { tbody, previousRow });
      }
      this.$parent.editorInstance.updateHtmlText();
      this.$parent.editorInstance.updateValue();
      this.hideLayer();
    },
    addTableColumn() {
      let node = this.$parent.editorInstance.getSelectNode();
      if (this.$parent.editorInstance.compareTag(node, "td")) {
        let column = this.$parent.editorInstance.getCompareTag(node, "td");
        copyTableColumnAppend(column);
        let nextColumn = column.nextElementSibling;
        this.setTableCollapse("addColumn", { nextColumn });
      } else if (this.$parent.editorInstance.compareTag(node, "tr")) {
        let row = this.$parent.editorInstance.getCompareTag(node, "tr");
        let columns = Dap.element.children(row, "td");
        let column = columns[columns.length - 1];
        copyTableColumnAppend(column);
        let nextColumn = column.nextElementSibling;
        this.setTableCollapse("addColumn", { nextColumn });
      } else if (this.$parent.editorInstance.compareTag(node, "tbody")) {
        let tbody = this.$parent.editorInstance.getCompareTag(node, "tbody");
        let row = Dap.element.children(tbody, "tr")[0];
        let columns = Dap.element.children(row, "td");
        let column = columns[columns.length - 1];
        copyTableColumnAppend(column);
        let nextColumn = column.nextElementSibling;
        this.setTableCollapse("addColumn", { nextColumn });
      } else if (this.$parent.editorInstance.compareTag(node, "table")) {
        let table = this.$parent.editorInstance.getCompareTag(node, "table");
        let tbody = Dap.element.children(table, "tbody")[0];
        let row = Dap.element.children(tbody, "tr")[0];
        let columns = Dap.element.children(row, "td");
        let column = columns[columns.length - 1];
        copyTableColumnAppend(column);
        let nextColumn = column.nextElementSibling;
        this.setTableCollapse("addColumn", { nextColumn });
      }
      this.$parent.editorInstance.updateHtmlText();
      this.$parent.editorInstance.updateValue();
      this.hideLayer();
    },
    removeTableColumn() {
      let node = this.$parent.editorInstance.getSelectNode();
      if (this.$parent.editorInstance.compareTag(node, "td")) {
        let column = this.$parent.editorInstance.getCompareTag(node, "td");
        let row = column.parentNode;
        let previousEl = column.previousElementSibling;
        removeTableColumn(column);
        this.setTableCollapse("removeColumn", { row, previousEl });
      } else if (this.$parent.editorInstance.compareTag(node, "tr")) {
        let row = this.$parent.editorInstance.getCompareTag(node, "tr");
        let columns = Dap.element.children(row, "td");
        let column = columns[columns.length - 1];
        let previousEl = column.previousElementSibling;
        removeTableColumn(column);
        this.setTableCollapse("removeColumn", { row, previousEl });
      } else if (this.$parent.editorInstance.compareTag(node, "tbody")) {
        let tbody = this.$parent.editorInstance.getCompareTag(node, "tbody");
        let row = tbody.querySelector("tr");
        let columns = Dap.element.children(row, "td");
        let column = columns[columns.length - 1];
        let previousEl = column.previousElementSibling;
        removeTableColumn(column);
        this.setTableCollapse("removeColumn", { row, previousEl });
      } else if (this.$parent.editorInstance.compareTag(node, "table")) {
        let table = this.$parent.editorInstance.getCompareTag(node, "table");
        let row = table.querySelector("tr");
        let columns = Dap.element.children(row, "td");
        let column = columns[columns.length - 1];
        let previousEl = column.previousElementSibling;
        removeTableColumn(column);
        this.setTableCollapse("removeColumn", { row, previousEl });
      }
      this.$parent.editorInstance.updateHtmlText();
      this.$parent.editorInstance.updateValue();
      this.hideLayer();
    },
    deleteTable() {
      this.$parent.editorInstance.restoreRange();
      let node = this.$parent.editorInstance.getSelectNode();
      let table = this.$parent.editorInstance.getCompareTag(node, "table");
      if (table) {
        table.remove();
        this.active = false;
      }
      this.$parent.editorInstance.updateHtmlText();
      this.$parent.editorInstance.updateValue();
      this.hideLayer();
    },
    setTableCollapse(command, opt) {
      if (command == "insertTable") {
        let id = opt.id;
        const table = this.$parent.editorInstance.$refs.content.querySelector(`table[mvi-editor-element="${id}"]`);
        const column = table.querySelector("td");
        this.$parent.editorInstance.collapseToEnd(column);
      } else if (command == "addRow") {
        let newRow = opt.newRow;
        let index = opt.index || 0;
        const column = Dap.element.children(newRow, "td")[index];
        this.$parent.editorInstance.collapseToEnd(column);
      } else if (command == "removeRow") {
        let index = opt.index || 0;
        let tbody = opt.tbody;
        let previousRow = opt.previousRow;
        if (previousRow) {
          const column = Dap.element.children(previousRow, "td")[index];
          this.$parent.editorInstance.collapseToEnd(column);
        } else {
          let row = Dap.element.children(tbody, "tr")[0];
          if (row) {
            const column = Dap.element.children(row, "td")[index];
            this.$parent.editorInstance.collapseToEnd(column);
          }
        }
      } else if (command == "addColumn") {
        let nextColumn = opt.nextColumn;
        this.$parent.editorInstance.collapseToEnd(nextColumn);
      } else if (command == "removeColumn") {
        let row = opt.row;
        let previousEl = opt.previousEl;
        if (previousEl) {
          this.$parent.editorInstance.collapseToEnd(previousEl);
        } else {
          let column = Dap.element.children(row, "td")[0];
          if (column) {
            this.$parent.editorInstance.collapseToEnd(column);
          }
        }
      }
    },
    removeCode() {
      if (this.disabledMenu) {
        return;
      }
      let node = this.$parent.editorInstance.getSelectNode();
      if (!node) {
        return;
      }
      const pre = this.$parent.editorInstance.getCompareTag(node, "pre");
      pre.innerHTML = pre.innerHTML.replace(/\n/g, "<br>");
      let pEl = Dap.element.string2dom("<p>" + pre.innerHTML + "</p>");
      if (pEl instanceof HTMLCollection) {
        pEl = Dap.element.string2dom("<div>" + pre.innerHTML + "</div>");
      }
      insertNodeAfter(pEl, pre);
      pre.remove();
      this.active = false;
      this.$parent.editorInstance.collapseToEnd(pEl);
      this.$parent.editorInstance.updateHtmlText();
      this.$parent.editorInstance.updateValue();
    }
  }
};
const _hoisted_1$1 = ["data-id"];
const _hoisted_2$1 = ["disabled", "data-id"];
const _hoisted_3 = {
  key: 0,
  class: "mvi-editor-menu-value"
};
const _hoisted_4 = { class: "mvi-editor-menu-layer" };
const _hoisted_5 = {
  key: 0,
  class: "mvi-editor-menu-colors"
};
const _hoisted_6 = ["onClick"];
const _hoisted_7 = {
  key: 1,
  class: "mvi-editor-menu-table"
};
const _hoisted_8 = { class: "mvi-editor-menu-table-operations" };
const _hoisted_9 = { class: "mvi-editor-menu-table-footer" };
const _hoisted_10 = { class: "mvi-editor-menu-table-groups" };
const _hoisted_11 = ["onClick", "onMouseenter"];
const _hoisted_12 = {
  key: 0,
  class: "mvi-editor-menu-table-size"
};
const _hoisted_13 = {
  key: 2,
  class: "mvi-editor-menu-link"
};
const _hoisted_14 = ["placeholder"];
const _hoisted_15 = ["placeholder"];
const _hoisted_16 = { class: "mvi-editor-menu-link-footer" };
const _hoisted_17 = { class: "mvi-editor-menu-link-operation" };
const _hoisted_18 = {
  key: 3,
  class: "mvi-editor-menu-media"
};
const _hoisted_19 = ["disabled"];
const _hoisted_20 = {
  key: 1,
  class: "mvi-editor-menu-media-remote"
};
const _hoisted_21 = ["disabled", "placeholder"];
const _hoisted_22 = ["disabled"];
const _hoisted_23 = {
  key: 5,
  class: "mvi-editor-menu-default"
};
const _hoisted_24 = ["textContent"];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Tooltip = resolveComponent("Tooltip");
  const _component_Checkbox = resolveComponent("Checkbox");
  const _component_Tab = resolveComponent("Tab");
  const _component_Tabs = resolveComponent("Tabs");
  const _component_editorTag = resolveComponent("editorTag");
  const _component_Layer = resolveComponent("Layer");
  return openBlock(), createElementBlock("div", {
    class: "mvi-editor-menu",
    "data-id": `mvi-editor-menu-${$setup.uid}-${$props.options.key}`,
    onMouseenter: _cache[23] || (_cache[23] = ($event) => $options.editorMenuHover("enter")),
    onMouseleave: _cache[24] || (_cache[24] = ($event) => $options.editorMenuHover("leave"))
  }, [
    createVNode(_component_Tooltip, {
      disabled: $options.disabledToolTip,
      title: $props.options.name,
      trigger: "hover",
      placement: _ctx.$parent.combinedTooltipProps.placement,
      timeout: _ctx.$parent.combinedTooltipProps.timeout,
      color: _ctx.$parent.combinedTooltipProps.color,
      "text-color": _ctx.$parent.combinedTooltipProps.textColor,
      "border-color": _ctx.$parent.combinedTooltipProps.borderColor,
      offset: _ctx.$parent.combinedTooltipProps.offset,
      "z-index": _ctx.$parent.combinedTooltipProps.zIndex,
      fixed: _ctx.$parent.combinedTooltipProps.fixed,
      "fixed-auto": _ctx.$parent.combinedTooltipProps.fixedAuto,
      width: _ctx.$parent.combinedTooltipProps.width,
      animation: _ctx.$parent.combinedTooltipProps.animation,
      "show-triangle": _ctx.$parent.combinedTooltipProps.showTriangle
    }, {
      default: withCtx(() => {
        var _a;
        return [
          createElementVNode("div", {
            class: "mvi-editor-menu-target",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.targetTrigger && $options.targetTrigger(...args)),
            disabled: $options.disabledMenu || null,
            "data-id": `mvi-editor-menu-target-${$setup.uid}-${$props.options.key}`,
            onMouseenter: _cache[1] || (_cache[1] = ($event) => $options.targetHover("enter", $event)),
            onMouseleave: _cache[2] || (_cache[2] = ($event) => $options.targetHover("leave", $event)),
            style: normalizeStyle($options.editorTargetStyle)
          }, [
            $options.isValueMenu ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString((_a = $data.selectVal) == null ? void 0 : _a.label), 1)) : $props.options.icon ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              $props.options.icon.custom ? (openBlock(), createElementBlock("i", {
                key: 0,
                class: normalizeClass($props.options.icon.value)
              }, null, 2)) : (openBlock(), createBlock(_component_Icon, {
                key: 1,
                type: $props.options.icon.value
              }, null, 8, ["type"]))
            ], 64)) : createCommentVNode("", true),
            $options.isLayerMenu ? (openBlock(), createBlock(_component_Icon, {
              key: 2,
              class: "mvi-editor-menu-caret",
              type: "caret-down"
            })) : createCommentVNode("", true)
          ], 44, _hoisted_2$1)
        ];
      }),
      _: 1
    }, 8, ["disabled", "title", "placement", "timeout", "color", "text-color", "border-color", "offset", "z-index", "fixed", "fixed-auto", "width", "animation", "show-triangle"]),
    $options.isLayerMenu ? (openBlock(), createBlock(_component_Layer, {
      key: 0,
      modelValue: $data.layerShow,
      "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => $data.layerShow = $event),
      ref: "layer",
      placement: _ctx.$parent.combinedLayerProps.placement,
      "z-index": _ctx.$parent.combinedLayerProps.zIndex,
      fixed: _ctx.$parent.combinedLayerProps.fixed,
      "fixed-auto": _ctx.$parent.combinedLayerProps.fixedAuto,
      offset: _ctx.$parent.combinedLayerProps.offset,
      "wrapper-class": _ctx.$parent.combinedLayerProps.wrapperClass,
      timeout: _ctx.$parent.combinedLayerProps.timeout,
      "show-triangle": _ctx.$parent.combinedLayerProps.showTriangle,
      animation: _ctx.$parent.combinedLayerProps.animation,
      shadow: _ctx.$parent.combinedLayerProps.shadow,
      border: _ctx.$parent.combinedLayerProps.border,
      width: _ctx.$parent.combinedLayerProps.width,
      closable: _ctx.$parent.trigger == "click",
      target: `[data-id='mvi-editor-menu-target-${$setup.uid}-${$props.options.key}']`,
      root: `[data-id='mvi-editor-menu-${$setup.uid}-${$props.options.key}']`,
      onShowing: $options.layerShowing
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_4, [
          $props.options.key == "foreColor" || $props.options.key == "backColor" ? (openBlock(), createElementBlock("div", _hoisted_5, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($props.options.data, (item, index) => {
              return openBlock(), createElementBlock("div", {
                style: normalizeStyle($options.menuColorStyle(item)),
                class: "mvi-editor-menu-color"
              }, [
                createVNode(_component_Tooltip, {
                  disabled: $options.disabledColorToolTip(item),
                  trigger: "hover",
                  title: item.label,
                  placement: _ctx.$parent.combinedTooltipProps.placement,
                  timeout: _ctx.$parent.combinedTooltipProps.timeout,
                  color: _ctx.$parent.combinedTooltipProps.color,
                  "text-color": _ctx.$parent.combinedTooltipProps.textColor,
                  "border-color": _ctx.$parent.combinedTooltipProps.borderColor,
                  offset: _ctx.$parent.combinedTooltipProps.offset,
                  "z-index": _ctx.$parent.combinedTooltipProps.zIndex,
                  fixed: _ctx.$parent.combinedTooltipProps.fixed,
                  "fixed-auto": _ctx.$parent.combinedTooltipProps.fixedAuto,
                  width: _ctx.$parent.combinedTooltipProps.width,
                  animation: _ctx.$parent.combinedTooltipProps.animation,
                  "show-triangle": _ctx.$parent.combinedTooltipProps.showTriangle,
                  block: ""
                }, {
                  default: withCtx(() => [
                    createElementVNode("div", {
                      style: normalizeStyle({ backgroundColor: item.value }),
                      onClick: ($event) => $options.selectLayerItem(item, index),
                      class: "mvi-editor-menu-color-el"
                    }, null, 12, _hoisted_6)
                  ]),
                  _: 2
                }, 1032, ["disabled", "title", "placement", "timeout", "color", "text-color", "border-color", "offset", "z-index", "fixed", "fixed-auto", "width", "animation", "show-triangle"])
              ], 4);
            }), 256))
          ])) : $props.options.key == "table" ? (openBlock(), createElementBlock("div", _hoisted_7, [
            $data.active ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createElementVNode("div", _hoisted_8, [
                createElementVNode("div", {
                  onClick: _cache[3] || (_cache[3] = (...args) => $options.addTableRow && $options.addTableRow(...args)),
                  style: normalizeStyle($options.activeColorStyle),
                  class: "mvi-editor-menu-table-operation"
                }, toDisplayString($options.operationText(0)), 5),
                createElementVNode("div", {
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.removeTableRow && $options.removeTableRow(...args)),
                  class: "mvi-editor-menu-table-operation"
                }, toDisplayString($options.operationText(1)), 1),
                createElementVNode("div", {
                  onClick: _cache[5] || (_cache[5] = (...args) => $options.addTableColumn && $options.addTableColumn(...args)),
                  style: normalizeStyle($options.activeColorStyle),
                  class: "mvi-editor-menu-table-operation"
                }, toDisplayString($options.operationText(2)), 5),
                createElementVNode("div", {
                  onClick: _cache[6] || (_cache[6] = (...args) => $options.removeTableColumn && $options.removeTableColumn(...args)),
                  class: "mvi-editor-menu-table-operation"
                }, toDisplayString($options.operationText(3)), 1)
              ]),
              createElementVNode("div", _hoisted_9, [
                createElementVNode("span", {
                  onClick: _cache[7] || (_cache[7] = (...args) => $options.deleteTable && $options.deleteTable(...args))
                }, toDisplayString($props.options.deleteText ? $props.options.deleteText : "\u5220\u9664\u8868\u683C"), 1)
              ])
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList($data.tableParams.groups, (item) => {
                return openBlock(), createElementBlock("div", _hoisted_10, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(item, (el) => {
                    return openBlock(), createElementBlock("div", {
                      onClick: ($event) => $options.confirmTableSize(el),
                      onMouseenter: ($event) => $options.changeTableSize(el),
                      class: normalizeClass(["mvi-editor-menu-table-group", el.inside ? "active" : ""])
                    }, null, 42, _hoisted_11);
                  }), 256))
                ]);
              }), 256)),
              $data.tableParams.size.length ? (openBlock(), createElementBlock("div", _hoisted_12, toDisplayString($data.tableParams.size[0]) + " \xD7 " + toDisplayString($data.tableParams.size[1]), 1)) : createCommentVNode("", true)
            ], 64))
          ])) : $props.options.key == "link" ? (openBlock(), createElementBlock("div", _hoisted_13, [
            withDirectives(createElementVNode("input", {
              ref: "linkText",
              onFocus: _cache[8] || (_cache[8] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
              onBlur: _cache[9] || (_cache[9] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.linkParams.text = $event),
              placeholder: $options.linkPlaceholder[0],
              type: "text"
            }, null, 40, _hoisted_14), [
              [
                vModelText,
                $data.linkParams.text,
                void 0,
                { trim: true }
              ]
            ]),
            withDirectives(createElementVNode("input", {
              ref: "linkUrl",
              onFocus: _cache[11] || (_cache[11] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
              onBlur: _cache[12] || (_cache[12] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
              "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $data.linkParams.url = $event),
              placeholder: $options.linkPlaceholder[1],
              type: "text"
            }, null, 40, _hoisted_15), [
              [
                vModelText,
                $data.linkParams.url,
                void 0,
                { trim: true }
              ]
            ]),
            createElementVNode("div", _hoisted_16, [
              createVNode(_component_Checkbox, {
                label: $props.options.newWindowText ? $props.options.newWindowText : "\u65B0\u7A97\u53E3\u6253\u5F00",
                "label-placement": "right",
                icon: { size: "0.24rem" },
                "label-size": "0.28rem",
                "label-color": "#808080",
                "fill-color": _ctx.$parent.editorInstance.activeColor,
                modelValue: $data.linkParams.target,
                "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $data.linkParams.target = $event)
              }, null, 8, ["label", "icon", "fill-color", "modelValue"]),
              createElementVNode("div", _hoisted_17, [
                $data.active ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: "mvi-editor-menu-link-delete",
                  onClick: _cache[15] || (_cache[15] = (...args) => $options.deleteLink && $options.deleteLink(...args))
                }, toDisplayString($props.options.deleteText ? $props.options.deleteText : "\u5220\u9664\u94FE\u63A5"), 1)) : createCommentVNode("", true),
                createElementVNode("span", {
                  class: "mvi-editor-menu-link-insert",
                  style: normalizeStyle($options.activeColorStyle),
                  onClick: _cache[16] || (_cache[16] = (...args) => $options.insertLink && $options.insertLink(...args))
                }, toDisplayString($props.options.insertText ? $props.options.insertText : "\u63D2\u5165"), 5)
              ])
            ])
          ])) : $props.options.key == "image" || $props.options.key == "video" ? (openBlock(), createElementBlock("div", _hoisted_18, [
            createVNode(_component_Tabs, {
              onChange: $options.tabChange,
              modelValue: $data.mediaParams.tabIndex,
              "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $data.mediaParams.tabIndex = $event),
              flex: "flex-start",
              offset: "0.4rem",
              "active-color": _ctx.$parent.editorInstance.activeColor,
              "inactive-color": "#808080"
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList($props.options.data, (item) => {
                  var _a;
                  return openBlock(), createBlock(_component_Tab, {
                    disabled: item.disabled,
                    title: item.label,
                    icon: (_a = item.icon) == null ? void 0 : _a.value
                  }, {
                    default: withCtx(() => [
                      item.value == "upload" ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        disabled: item.disabled || null,
                        class: "mvi-editor-menu-media-upload"
                      }, [
                        createVNode(_component_Icon, { type: "upload-square" })
                      ], 8, _hoisted_19)) : item.value == "remote" ? (openBlock(), createElementBlock("div", _hoisted_20, [
                        withDirectives(createElementVNode("input", {
                          disabled: item.disabled || null,
                          onFocus: _cache[17] || (_cache[17] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
                          onBlur: _cache[18] || (_cache[18] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
                          "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => $data.mediaParams.remoteUrl = $event),
                          placeholder: $options.mediaPlaceholder,
                          type: "text"
                        }, null, 40, _hoisted_21), [
                          [
                            vModelText,
                            $data.mediaParams.remoteUrl,
                            void 0,
                            { trim: true }
                          ]
                        ]),
                        createElementVNode("div", {
                          disabled: item.disabled || null,
                          class: "mvi-editor-menu-media-remote-insert",
                          style: normalizeStyle($options.activeColorStyle),
                          onClick: _cache[20] || (_cache[20] = (...args) => $options.insertRemote && $options.insertRemote(...args))
                        }, toDisplayString($props.options.insertText ? $props.options.insertText : "\u63D2\u5165"), 13, _hoisted_22)
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["disabled", "title", "icon"]);
                }), 256))
              ]),
              _: 1
            }, 8, ["onChange", "modelValue", "active-color"])
          ])) : _ctx.$slots.layer ? renderSlot(_ctx.$slots, "layer", { key: 4 }, void 0, true) : (openBlock(), createElementBlock("div", _hoisted_23, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($props.options.data, (item, index) => {
              return openBlock(), createBlock(_component_editorTag, {
                tag: $options.layerElTag(item),
                style: normalizeStyle($options.layerElStyle(item)),
                disabled: item.disabled || null,
                class: normalizeClass(["mvi-editor-menu-layer-el", $options.layerActiveClass(item)]),
                onClick: ($event) => $options.selectLayerItem(item, index),
                onMouseenter: ($event) => $options.layerItemHover("enter", item, $event),
                onMouseleave: ($event) => $options.layerItemHover("leave", item, $event)
              }, {
                default: withCtx(() => [
                  item.icon ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    item.icon.custom ? (openBlock(), createElementBlock("i", {
                      key: 0,
                      class: normalizeClass(["mvi-editor-menu-layer-icon", item.icon.value])
                    }, null, 2)) : (openBlock(), createBlock(_component_Icon, {
                      key: 1,
                      class: "mvi-editor-menu-layer-icon",
                      type: item.icon.value
                    }, null, 8, ["type"]))
                  ], 64)) : createCommentVNode("", true),
                  createElementVNode("span", {
                    textContent: toDisplayString(item.label)
                  }, null, 8, _hoisted_24),
                  $data.active && item.value == $data.selectVal.value ? (openBlock(), createBlock(_component_Icon, {
                    key: 1,
                    class: "mvi-editor-menu-layer-active-icon",
                    type: "success"
                  })) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["tag", "style", "disabled", "class", "onClick", "onMouseenter", "onMouseleave"]);
            }), 256))
          ]))
        ])
      ]),
      _: 3
    }, 8, ["modelValue", "placement", "z-index", "fixed", "fixed-auto", "offset", "wrapper-class", "timeout", "show-triangle", "animation", "shadow", "border", "width", "closable", "target", "root", "onShowing"])) : createCommentVNode("", true)
  ], 40, _hoisted_1$1);
}
const editorMenu = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-50fe4648"]]);
const editorMenus_vue_vue_type_style_index_0_scoped_331303a8_lang = "";
const _sfc_main$4 = {
  name: "m-editor-menus",
  emits: ["custom"],
  props: {
    layerActiveClass: {
      type: String,
      default: null
    },
    layerHoverClass: {
      type: String,
      default: null
    },
    hoverClass: {
      type: String,
      default: null
    },
    border: {
      type: Boolean,
      default: false
    },
    config: {
      type: Array,
      default: function() {
        return [];
      }
    },
    layerProps: {
      type: Object,
      default: function() {
        return {};
      }
    },
    trigger: {
      type: String,
      default: "click",
      validator(value) {
        return ["hover", "click"].includes(value);
      }
    },
    tooltipProps: {
      type: Object,
      default: function() {
        return {};
      }
    },
    customActive: {
      type: Function,
      default: function() {
        return false;
      }
    }
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  data() {
    return {
      editorInstance: null,
      menuRefs: []
    };
  },
  components: {
    editorMenu
  },
  computed: {
    menus() {
      let menus = defaultConfig.filter((item) => {
        return !this.config.some((el) => {
          return el.key == item.key;
        });
      });
      menus = [...menus, ...this.config];
      menus = menus.map((item) => {
        let obj = { ...item };
        obj.data = this.initMenuData(obj.data);
        obj.icon = this.initMenuIcon(obj.icon);
        obj.disabled = Boolean(obj.disabled);
        if (!Dap.number.isNumber(obj.index)) {
          obj.index = 0;
        }
        return obj;
      });
      return menus.sort((a, b) => {
        return a.index - b.index;
      });
    },
    showMenu() {
      return (item) => {
        if (typeof item.data == "boolean") {
          return item.data;
        }
        if (Array.isArray(item.data)) {
          return true;
        }
        return false;
      };
    },
    combinedLayerProps() {
      return initOption(defaultLayerProps, this.layerProps);
    },
    combinedTooltipProps() {
      return initOption(defaultTooltipProps, this.tooltipProps);
    },
    isLayerMenu() {
      return (item) => {
        return Array.isArray(item.data);
      };
    },
    isValueMenu() {
      return (item) => {
        return item.hasOwnProperty("value") && this.isLayerMenu(item);
      };
    }
  },
  mounted() {
    Dap.event.on(document.documentElement, `mousedown.editor_${this.uid}`, this.judgeClearRange);
  },
  methods: {
    initMenuIcon(icon) {
      if (Dap.common.isObject(icon)) {
        return {
          custom: icon.custom || false,
          value: icon.value || ""
        };
      }
      if (typeof icon == "string" && icon) {
        return {
          custom: false,
          value: icon
        };
      }
      return null;
    },
    initMenuData(data) {
      if (Array.isArray(data)) {
        let newData = [];
        data.forEach((item) => {
          if (Dap.common.isObject(item)) {
            let o = { ...item };
            o.icon = this.initMenuIcon(item.icon);
            o.disabled = Boolean(item.disabled);
            newData.push(o);
          } else if (item) {
            newData.push({
              label: item,
              value: item
            });
          }
        });
        return newData;
      }
      if (typeof data == "boolean") {
        return data;
      }
      return false;
    },
    editorContentDomMonitor() {
      if (!this.editorInstance) {
        return;
      }
      if (!this.editorInstance.$refs.content) {
        return;
      }
      const observe = new Observe$1(this.editorInstance.$refs.content, {
        attributes: false,
        childList: true,
        subtree: true,
        childNodesChange: (addNode) => {
          var _a, _b, _c, _d, _e, _f, _g;
          if (addNode) {
            const fontSizeMenu = this.menus.find((menu) => {
              return menu.key == "fontSize";
            });
            if (fontSizeMenu && fontSizeMenu.data && fontSizeMenu.data.length) {
              const fontSize = addNode.style.fontSize;
              switch (fontSize) {
                case "x-small":
                  addNode.style.fontSize = (_a = fontSizeMenu.data[0]) == null ? void 0 : _a.value;
                  break;
                case "small":
                  addNode.style.fontSize = (_b = fontSizeMenu.data[1]) == null ? void 0 : _b.value;
                  break;
                case "medium":
                  addNode.style.fontSize = (_c = fontSizeMenu.data[2]) == null ? void 0 : _c.value;
                  break;
                case "large":
                  addNode.style.fontSize = (_d = fontSizeMenu.data[3]) == null ? void 0 : _d.value;
                  break;
                case "x-large":
                  addNode.style.fontSize = (_e = fontSizeMenu.data[4]) == null ? void 0 : _e.value;
                  break;
                case "xx-large":
                  addNode.style.fontSize = (_f = fontSizeMenu.data[5]) == null ? void 0 : _f.value;
                  break;
                case "xxx-large":
                  addNode.style.fontSize = (_g = fontSizeMenu.data[6]) == null ? void 0 : _g.value;
                  break;
              }
              this.editorInstance.changeActive();
              this.editorInstance.updateHtmlText();
              this.editorInstance.updateValue();
            }
          }
        }
      });
      observe.init();
    },
    changeActiveJudgeFn() {
      let node = this.editorInstance.getSelectNode();
      if (!node) {
        return;
      }
      this.editorInstance.cursorArea = "";
      for (let menu of this.menuRefs) {
        if (this.isLayerMenu(menu.options)) {
          if (this.isValueMenu(menu.options)) {
            menu.active = false;
            menu.initSelectVal();
            if (menu.options.key == "title") {
              for (let dataItem of menu.options.data) {
                if (document.queryCommandValue("formatBlock").toLocaleLowerCase() == dataItem.value.toLocaleLowerCase()) {
                  menu.active = true;
                  menu.selectVal = { ...dataItem };
                  break;
                }
              }
            } else if (menu.options.key == "fontFamily") {
              for (let dataItem of menu.options.data) {
                if (document.queryCommandValue("fontName") == dataItem.value) {
                  menu.active = true;
                  menu.selectVal = { ...dataItem };
                  break;
                }
              }
            } else if (menu.options.key == "fontSize") {
              for (let dataItem of menu.options.data) {
                let value = dataItem.value;
                if (value.endsWith("rem")) {
                  const number = Number.parseFloat(value);
                  if (Dap.number.isNumber(number)) {
                    value = Dap.element.rem2px(number) + "px";
                  }
                }
                if (this.editorInstance.compareCss(node, "font-size", value, false)) {
                  menu.active = true;
                  menu.selectVal = { ...dataItem };
                  break;
                }
              }
            } else if (!unactiveMenus.includes(menu.options.key)) {
              if (typeof this.customActive == "function") {
                const obj = this.customActive(menu.options.key, menu.options.data, node);
                menu.active = obj.active || false;
                menu.selectVal = menu.options.data.find((item) => {
                  return item.value == obj.value;
                }) || {};
              }
            }
          } else {
            menu.active = false;
            menu.selectVal = {};
            if (menu.options.key == "foreColor") {
              for (let dataItem of menu.options.data) {
                let value = dataItem.value;
                if (Dap.common.matchingText(value, "hex")) {
                  let rgbVal = Dap.color.hex2rgb(value);
                  value = `rgb(${rgbVal[0]}, ${rgbVal[1]}, ${rgbVal[2]})`;
                }
                if (document.queryCommandValue("foreColor") == value) {
                  menu.active = true;
                  menu.selectVal = { ...dataItem };
                  break;
                }
              }
            } else if (menu.options.key == "backColor") {
              for (let dataItem of menu.options.data) {
                let value = dataItem.value;
                if (Dap.common.matchingText(value, "hex")) {
                  let rgbVal = Dap.color.hex2rgb(value);
                  value = `rgb(${rgbVal[0]}, ${rgbVal[1]}, ${rgbVal[2]})`;
                }
                if (document.queryCommandValue("backColor") == value) {
                  menu.active = true;
                  menu.selectVal = { ...dataItem };
                  break;
                }
              }
            } else if (menu.options.key == "justify") {
              for (let dataItem of menu.options.data) {
                if (document.queryCommandState(dataItem.value)) {
                  menu.active = true;
                  menu.selectVal = { ...dataItem };
                  break;
                }
              }
            } else if (menu.options.key == "link") {
              if (this.editorInstance.compareTag(node, "a")) {
                menu.active = true;
              }
            } else if (menu.options.key == "table") {
              if (this.editorInstance.compareTag(node, "table")) {
                menu.active = true;
                this.editorInstance.cursorArea = menu.options.key;
              }
            } else if (!unactiveMenus.includes(menu.options.key)) {
              if (typeof this.customActive == "function") {
                const obj = this.customActive(menu.options.key, menu.options.data, node);
                menu.active = obj.active || false;
                menu.selectVal = menu.options.data.find((item) => {
                  return item.value == obj.value;
                }) || {};
              }
            }
          }
        } else {
          menu.active = false;
          if (menu.options.key == "bold") {
            if (document.queryCommandState("bold")) {
              menu.active = true;
            }
          } else if (menu.options.key == "italic") {
            if (document.queryCommandState("italic")) {
              menu.active = true;
            }
          } else if (menu.options.key == "underline") {
            if (document.queryCommandState("underline")) {
              menu.active = true;
            }
          } else if (menu.options.key == "strikeThrough") {
            if (document.queryCommandState("strikeThrough")) {
              menu.active = true;
            }
          } else if (menu.options.key == "subscript") {
            if (document.queryCommandState("subscript")) {
              menu.active = true;
            }
          } else if (menu.options.key == "superscript") {
            if (document.queryCommandState("superscript")) {
              menu.active = true;
            }
          } else if (menu.options.key == "ol") {
            if (document.queryCommandState("insertOrderedList")) {
              menu.active = true;
            }
          } else if (menu.options.key == "ul") {
            if (document.queryCommandState("insertUnorderedList")) {
              menu.active = true;
            }
          } else if (menu.options.key == "quote") {
            if (document.queryCommandValue("formatBlock").toLocaleLowerCase() == "blockquote") {
              menu.active = true;
              this.editorInstance.cursorArea = menu.options.key;
            }
          } else if (menu.options.key == "code") {
            if (document.queryCommandValue("formatBlock").toLocaleLowerCase() == "pre") {
              menu.active = true;
              this.editorInstance.cursorArea = menu.options.key;
            }
          } else if (!unactiveMenus.includes(menu.options.key)) {
            if (typeof this.customActive == "function") {
              const obj = this.customActive(menu.options.key, node);
              menu.active = obj;
            }
          }
        }
      }
    },
    judgeClearRange(e) {
      if (!this.editorInstance) {
        return;
      }
      if (Dap.element.isContains(this.$el, e.target) || Dap.element.isContains(this.editorInstance.$el, e.target)) {
        return;
      }
      this.editorInstance.range = null;
    }
  },
  beforeUnmount() {
    Dap.event.off(document.documentElement, `mousedown.editor_${this.uid}`);
  }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_editorMenu = resolveComponent("editorMenu");
  return openBlock(), createElementBlock("div", {
    class: "mvi-editor-menus",
    style: normalizeStyle({ border: $props.border ? "" : "none" })
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.menus, (item, index) => {
      return openBlock(), createElementBlock(Fragment, null, [
        $options.showMenu(item) ? (openBlock(), createBlock(_component_editorMenu, {
          key: 0,
          options: item,
          ref_for: true,
          ref: (el) => $data.menuRefs[index] = el
        }, createSlots({ _: 2 }, [
          $options.isLayerMenu(item) && item.customLayer && _ctx.$slots.layer ? {
            name: "layer",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "layer", { options: item }, void 0, true)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["options"])) : createCommentVNode("", true)
      ], 64);
    }), 256))
  ], 4);
}
const EditorMenus = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-331303a8"]]);
EditorMenus.install = (app) => {
  app.component(EditorMenus.name, EditorMenus);
};
const row_vue_vue_type_style_index_0_scoped_1477607e_lang = "";
const _sfc_main$3 = {
  name: "m-row",
  props: {
    justify: {
      type: String,
      default: "flex-start",
      validator(value) {
        return [
          "flex-start",
          "flex-end",
          "space-around",
          "space-between"
        ].includes(value);
      }
    },
    align: {
      type: String,
      default: "flex-start",
      validator(value) {
        return ["flex-start", "flex-end", "center"].includes(value);
      }
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  provide() {
    return {
      row: this
    };
  },
  computed: {
    rowStyle() {
      let style = {};
      style.justifyContent = this.justify;
      style.alignItems = this.align;
      return style;
    }
  },
  components: {
    Row: {
      render() {
        return h(
          this.$parent.tag,
          {},
          {
            default: this.$slots.default
          }
        );
      }
    }
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Row = resolveComponent("Row", true);
  return openBlock(), createBlock(_component_Row, {
    class: "mvi-row",
    style: normalizeStyle($options.rowStyle)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]),
    _: 3
  }, 8, ["style"]);
}
const Row = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-1477607e"]]);
Row.install = (app) => {
  app.component(Row.name, Row);
};
const col_vue_vue_type_style_index_0_scoped_a8c2d139_lang = "";
const _sfc_main$2 = {
  name: "m-col",
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: 0
    },
    tag: {
      type: String,
      default: "div"
    },
    xs: {
      type: [Number, Object],
      default: null
    },
    sm: {
      type: [Number, Object],
      default: null
    },
    md: {
      type: [Number, Object],
      default: null
    },
    lg: {
      type: [Number, Object],
      default: null
    },
    xl: {
      type: [Number, Object],
      default: null
    }
  },
  inject: ["row"],
  computed: {
    colStyle() {
      let cls = [];
      if (this.span) {
        cls.push("mvi-col-" + this.span);
      }
      if (this.offset) {
        cls.push("mvi-col-offset-" + this.offset);
      }
      if (Dap.common.isObject(this.xs)) {
        if (Dap.number.isNumber(this.xs.span)) {
          cls.push("mvi-col-xs-" + this.xs.span);
        }
        if (Dap.number.isNumber(this.xs.offset)) {
          cls.push("mvi-col-offset-xs-" + this.xs.offset);
        }
      } else if (Dap.number.isNumber(this.xs)) {
        cls.push("mvi-col-xs-" + this.xs);
      }
      if (Dap.common.isObject(this.sm)) {
        if (Dap.number.isNumber(this.sm.span)) {
          cls.push("mvi-col-sm-" + this.sm.span);
        }
        if (Dap.number.isNumber(this.sm.offset)) {
          cls.push("mvi-col-offset-sm-" + this.sm.offset);
        }
      } else if (Dap.number.isNumber(this.sm)) {
        cls.push("mvi-col-sm-" + this.sm);
      }
      if (Dap.common.isObject(this.md)) {
        if (Dap.number.isNumber(this.md.span)) {
          cls.push("mvi-col-md-" + this.md.span);
        }
        if (Dap.number.isNumber(this.md.offset)) {
          cls.push("mvi-col-offset-md-" + this.md.offset);
        }
      } else if (Dap.number.isNumber(this.md)) {
        cls.push("mvi-col-md-" + this.md);
      }
      if (Dap.common.isObject(this.lg)) {
        if (Dap.number.isNumber(this.lg.span)) {
          cls.push("mvi-col-lg-" + this.lg.span);
        }
        if (Dap.number.isNumber(this.lg.offset)) {
          cls.push("mvi-col-offset-lg-" + this.lg.offset);
        }
      } else if (Dap.number.isNumber(this.lg)) {
        cls.push("mvi-col-lg-" + this.lg);
      }
      if (Dap.common.isObject(this.xl)) {
        if (Dap.number.isNumber(this.xl.span)) {
          cls.push("mvi-col-xl-" + this.xl.span);
        }
        if (Dap.number.isNumber(this.xl.offset)) {
          cls.push("mvi-col-offset-xl-" + this.xl.offset);
        }
      } else if (Dap.number.isNumber(this.xl)) {
        cls.push("mvi-col-xl-" + this.xl);
      }
      return cls;
    }
  },
  components: {
    Col: {
      render() {
        return h(
          this.$parent.tag,
          {},
          {
            default: this.$slots.default
          }
        );
      }
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Col = resolveComponent("Col", true);
  return openBlock(), createBlock(_component_Col, {
    class: normalizeClass($options.colStyle)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]),
    _: 3
  }, 8, ["class"]);
}
const Col = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-a8c2d139"]]);
Col.install = (app) => {
  app.component(Col.name, Col);
};
const form_vue_vue_type_style_index_0_scoped_cf836dcf_lang = "";
const _sfc_main$1 = {
  name: "m-form",
  props: {
    width: {
      type: String,
      default: null
    },
    block: {
      type: Boolean,
      default: false
    },
    labelBlock: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: "center"
    },
    labelClass: {
      type: String,
      default: null
    },
    labelWidth: {
      type: String,
      default: null
    },
    labelOffset: {
      type: String,
      default: null
    }
  },
  computed: {
    formStyle() {
      let style = {};
      if (this.block && this.width) {
        style.width = this.width;
      }
      return style;
    }
  },
  provide() {
    return {
      form: this
    };
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-form", $props.block ? "mvi-form-block" : ""]),
    style: normalizeStyle($options.formStyle)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 6);
}
const Form = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-cf836dcf"]]);
Form.install = (app) => {
  app.component(Form.name, Form);
};
const formEl_vue_vue_type_style_index_0_scoped_53628fc8_lang = "";
const _sfc_main = {
  name: "m-form-el",
  props: {
    align: {
      type: String,
      default: null
    },
    width: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: ""
    },
    labelClass: {
      type: String,
      default: null
    },
    labelWidth: {
      type: String,
      default: null
    },
    labelOffset: {
      type: String,
      default: null
    }
  },
  inject: ["form"],
  computed: {
    labelCls() {
      let cls = ["mvi-form-label"];
      if (this.form.labelClass) {
        cls.push(this.form.labelClass);
      }
      if (this.labelClass) {
        cls.push(this.labelClass);
      }
      if (this.form.labelBlock && this.form.block) {
        cls.push("mvi-form-label-block");
      }
      return cls;
    },
    labelStyle() {
      let style = {};
      if (this.form.labelWidth && !this.form.labelBlock) {
        style.width = this.form.labelWidth;
      }
      if (this.labelWidth && !this.form.labelBlock) {
        style.width = this.labelWidth;
      }
      if (this.form.labelOffset) {
        if (this.form.labelBlock) {
          style.marginBottom = this.form.labelOffset;
        } else {
          style.marginRight = this.form.labelOffset;
        }
      }
      if (this.labelOffset) {
        if (this.form.labelBlock) {
          style.marginBottom = this.labelOffset;
        } else {
          style.marginRight = this.labelOffset;
        }
      }
      return style;
    },
    formElStyle() {
      let style = {};
      if (this.width && !this.form.block) {
        style.width = this.width;
      }
      if (this.form.align) {
        style.alignItems = this.form.align;
      }
      if (this.align) {
        style.alignItems = this.align;
      }
      return style;
    }
  }
};
const _hoisted_1 = ["textContent"];
const _hoisted_2 = {
  key: 1,
  class: "mvi-form-container"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-form-el", $options.form.block ? "mvi-form-el-block" : ""]),
    style: normalizeStyle($options.formElStyle)
  }, [
    $props.label ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass($options.labelCls),
      textContent: toDisplayString($props.label),
      style: normalizeStyle($options.labelStyle)
    }, null, 14, _hoisted_1)) : createCommentVNode("", true),
    _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_2, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ])) : createCommentVNode("", true)
  ], 6);
}
const FormEl = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-53628fc8"]]);
FormEl.install = (app) => {
  app.component(FormEl.name, FormEl);
};
const install = (app) => {
  const components = {
    Dap,
    Anchor: Anchor$1,
    Resize: Resize$1,
    Drag: Drag$1,
    Prop: Prop$1,
    Scroll: Scroll$1,
    Spy: Spy$1,
    Observe: Observe$1,
    Upload: Upload$1,
    Px: Px$1,
    Ripple: Ripple$1,
    Button,
    Icon,
    Cell,
    CellGroup,
    Navbar,
    Tabbar,
    Image,
    Overlay,
    Popup,
    Checkbox,
    Radio,
    DatePicker,
    DateNativePicker,
    Input,
    Modal,
    Dialog,
    Toast,
    Loading,
    Msgbox,
    NumberKeyboard,
    Search,
    Progress,
    Slider,
    Stepper,
    Switch,
    Actionsheet,
    Dropdown,
    Notify,
    PullRefresh,
    SwipeCell,
    CircleProgress,
    Collapse,
    CollapseItem,
    Divider,
    Roll,
    Panel,
    Steps,
    Step,
    Label,
    Swiper,
    SwiperSlide,
    Tabs,
    Tab,
    Badge,
    Table,
    Calendar,
    Triangle,
    Tooltip,
    ColorPicker,
    ImagePreview,
    Page,
    LoadingBar,
    Picker,
    TransitionSlide,
    List,
    Skeleton,
    Sign,
    Layer,
    Select,
    Autocomplete,
    DateChooser,
    Field,
    Editor,
    EditorMenus,
    Row,
    Col,
    Form,
    FormEl
  };
  Object.values(components).map((component) => {
    component.install(app);
  });
};
const version = "1.6.23";
const stdin_default = {
  install,
  version
};
export {
  Actionsheet,
  Anchor$1 as Anchor,
  Autocomplete,
  Badge,
  Button,
  Calendar,
  Cell,
  CellGroup,
  Checkbox,
  CircleProgress,
  Col,
  Collapse,
  CollapseItem,
  ColorPicker,
  Dap,
  DateChooser,
  DateNativePicker,
  DatePicker,
  Dialog,
  Divider,
  Drag$1 as Drag,
  Dropdown,
  Editor,
  EditorMenus,
  Field,
  Form,
  FormEl,
  Icon,
  Image,
  ImagePreview,
  Input,
  Label,
  Layer,
  List,
  Loading,
  LoadingBar,
  Modal,
  Msgbox,
  Navbar,
  Notify,
  NumberKeyboard,
  Observe$1 as Observe,
  Overlay,
  Page,
  Panel,
  Picker,
  Popup,
  Progress,
  Prop$1 as Prop,
  PullRefresh,
  Px$1 as Px,
  Radio,
  Resize$1 as Resize,
  Ripple$1 as Ripple,
  Roll,
  Row,
  Scroll$1 as Scroll,
  Search,
  Select,
  Sign,
  Skeleton,
  Slider,
  Spy$1 as Spy,
  Step,
  Stepper,
  Steps,
  SwipeCell,
  Swiper,
  SwiperSlide,
  Switch,
  Tab,
  Tabbar,
  Table,
  Tabs,
  Toast,
  Tooltip,
  TransitionSlide,
  Triangle,
  Upload$1 as Upload,
  stdin_default as default,
  install,
  version
};
