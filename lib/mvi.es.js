import { openBlock as o, createElementBlock as u, normalizeClass as y, normalizeStyle as b, h as vt, resolveComponent as x, createBlock as I, withCtx as P, renderSlot as S, Fragment as A, createVNode as D, toDisplayString as _, createCommentVNode as g, createElementVNode as v, renderList as O, Teleport as at, Transition as G, withDirectives as B, mergeProps as oe, withModifiers as ht, vShow as j, getCurrentInstance as F, vModelText as J, vModelDynamic as we, createSlots as zt, withKeys as wt, createTextVNode as ve, createApp as K, pushScopeId as Ct, popScopeId as xt } from "vue";
var At = { exports: {} };
(function(e, t) {
  (function(s, r) {
    e.exports = r();
  })(self, function() {
    return (() => {
      var s = { 902: (n, i, f) => {
        var a = f(493);
        n.exports = { rgb2hsv: function(c) {
          if (!Array.isArray(c) || c.length != 3)
            throw new TypeError("Invalid argument");
          var d = 0, h = 0, m = 0, p = c[0] >= 255 ? 255 : c[0], w = c[1] >= 255 ? 255 : c[1], C = c[2] >= 255 ? 255 : c[2];
          p = p <= 0 ? 0 : p, w = w <= 0 ? 0 : w, C = C <= 0 ? 0 : C;
          var E = Math.max(p, w, C), z = Math.min(p, w, C);
          return m = E / 255, h = E === 0 ? 0 : 1 - z / E, E === z ? d = 0 : E === p && w >= C ? d = (w - C) / (E - z) * 60 + 0 : E === p && w < C ? d = (w - C) / (E - z) * 60 + 360 : E === w ? d = (C - p) / (E - z) * 60 + 120 : E === C && (d = (p - w) / (E - z) * 60 + 240), [d = parseInt(d), h = parseInt(100 * h), m = parseInt(100 * m)];
        }, hsv2rgb: function(c) {
          if (!Array.isArray(c) || c.length != 3)
            throw new TypeError("Invalid argument");
          var d = c[0] >= 360 || c[0] <= 0 ? 0 : c[0], h = c[1] >= 100 ? 100 : c[1];
          h = h <= 0 ? 0 : h;
          var m = c[2] >= 100 ? 100 : c[2];
          m = m <= 0 ? 0 : m, h /= 100, m /= 100;
          var p = 0, w = 0, C = 0, E = parseInt(d / 60 % 6), z = d / 60 - E, H = m * (1 - h), V = m * (1 - z * h), $ = m * (1 - (1 - z) * h);
          switch (E) {
            case 0:
              p = m, w = $, C = H;
              break;
            case 1:
              p = V, w = m, C = H;
              break;
            case 2:
              p = H, w = m, C = $;
              break;
            case 3:
              p = H, w = V, C = m;
              break;
            case 4:
              p = $, w = H, C = m;
              break;
            case 5:
              p = m, w = H, C = V;
          }
          return [p = parseInt(255 * p), w = parseInt(255 * w), C = parseInt(255 * C)];
        }, rgb2hex: function(c) {
          if (!Array.isArray(c) || c.length != 3)
            throw new TypeError("Invalid argument");
          return "#" + (16777216 + (c[0] << 16) + (c[1] << 8) + c[2]).toString(16).slice(1);
        }, hex2rgb: function(c) {
          if (!c || typeof c != "string")
            throw new TypeError("The argument must be a string");
          var d = c.toLowerCase();
          if (!a.matchingText(d, "hex"))
            throw new TypeError("The argument must be a hexadecimal color value");
          if (d.length === 4) {
            for (var h = "#", m = 1; m < 4; m += 1)
              h += d.slice(m, m + 1).concat(d.slice(m, m + 1));
            d = h;
          }
          for (var p = [], w = 1; w < 7; w += 2)
            p.push(parseInt("0x" + d.slice(w, w + 2)));
          return p;
        } };
      }, 493: (n, i, f) => {
        var a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(d) {
          return typeof d;
        } : function(d) {
          return d && typeof Symbol == "function" && d.constructor === Symbol && d !== Symbol.prototype ? "symbol" : typeof d;
        }, c = f(899);
        n.exports = { matchingText: function(d, h) {
          if (!d || typeof d != "string")
            throw new TypeError("The first argument must be a string");
          if (!h || typeof h != "string")
            throw new TypeError("The second argument must be a string");
          var m = null;
          if (h == "Chinese" && (m = /^[\u4e00-\u9fa5]+$/), h == "chinese" && (m = /[\u4e00-\u9fa5]/), h == "email" && (m = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/), h == "userName" && (m = /^[a-zA-Z0-9_]{4,16}$/), h == "int+" && (m = /^\d+$/), h == "int-" && (m = /^-\d+$/), h == "int" && (m = /^-?\d+$/), h == "pos" && (m = /^\d*\.?\d+$/), h == "neg" && (m = /^-\d*\.?\d+$/), h == "number" && (m = /^-?\d*\.?\d+$/), h == "phone" && (m = /^1[0-9]\d{9}$/), h == "idCard" && (m = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/), h == "url" && (m = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/), h == "IPv4" && (m = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/), h == "hex" && (m = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/), h == "date")
            return /^((\d{4})(-)(\d{2})(-)(\d{2}))$/.test(d) || /^(\d{4})(\/)(\d{2})(\/)(\d{2})$/.test(d) || /^(\d{4})(\.)(\d{2})(\.)(\d{2})$/.test(d) || /^(\d{4})(年)(\d{2})(月)(\d{2})(日)$/.test(d);
          if (h == "time" && (m = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/), h == "QQ" && (m = /^[1-9][0-9]{4,10}$/), h == "weixin" && (m = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/), h == "plate" && (m = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/), !m)
            throw new Error("The second parameter is out of scope");
          return m.test(d);
        }, getUrlParams: function(d) {
          if (!d || typeof d != "string")
            throw new TypeError("The argument must be a string");
          var h = new RegExp("(^|&)" + d + "=([^&]*)(&|$)"), m = window.location.search.substr(1);
          if (!m) {
            var p = window.location.hash.split("?");
            p.length == 2 && (m = p[1]);
          }
          var w = m.match(h);
          return w ? decodeURIComponent(w[2]) : null;
        }, isEmptyObject: function(d) {
          return !!this.isObject(d) && Object.keys(d).length == 0;
        }, equal: function(d, h) {
          if ((d === void 0 ? "undefined" : a(d)) !== (h === void 0 ? "undefined" : a(h)))
            return !1;
          if (this.isObject(d) && this.isObject(h)) {
            d = Object.assign({}, d), h = Object.assign({}, h);
            var m = Object.getOwnPropertyNames(d), p = Object.getOwnPropertyNames(h);
            if (m.length != p.length)
              return !1;
            for (var w = m.length, C = 0; C < w; C++) {
              var E = m[C], z = d[E], H = h[E];
              if (this.isObject(z))
                return !!this.equal(z, H);
              if (z !== H)
                return !1;
            }
            return !0;
          }
          return d === h;
        }, isObject: function(d) {
          return !((d === void 0 ? "undefined" : a(d)) !== "object" || !d);
        }, copyText: function(d) {
          if (!d || typeof d != "string")
            throw new TypeError("No text to copy is defined");
          var h = c.string2dom("<span>" + d + "</span>");
          document.body.appendChild(h);
          var m = document.createRange();
          m.selectNode(h);
          var p = window.getSelection();
          p.rangeCount > 0 && p.removeAllRanges(), p.addRange(m), document.execCommand("copy"), document.body.removeChild(h);
        } };
      }, 997: (n, i, f) => {
        var a = f(899), c = "_dap-datas";
        n.exports = { remove: function(d, h) {
          if (!a.isElement(d) && d != window)
            throw new TypeError("The first argument must be an element");
          var m = d[c] || {};
          h == null || h === "" ? d[c] = {} : (delete m[h], d[c] = m);
        }, has: function(d, h) {
          if (!a.isElement(d) && d != window)
            throw new TypeError("The first argument must be an element");
          if (h == null || h === "")
            throw new TypeError("The second parameter must be a unique key");
          return (d[c] || {}).hasOwnProperty(h);
        }, get: function(d, h) {
          if (!a.isElement(d) && d != window)
            throw new TypeError("The first argument must be an element");
          var m = d[c] || {};
          return h == null || h === "" ? m : m[h];
        }, set: function(d, h, m) {
          if (!a.isElement(d) && d != window)
            throw new TypeError("The first argument must be an element");
          if (h == null || h === "")
            throw new TypeError("The second parameter must be a unique key");
          var p = d[c] || {};
          p[h] = m, d[c] = p;
        } };
      }, 278: (n, i, f) => {
        var a = f(884);
        n.exports = { getPrevMonths: function(c, d) {
          c && c instanceof Date || (c = new Date()), a.isNumber(d) || (d = 1);
          for (var h = [c], m = 0; m < d - 1; m++) {
            var p = c.getFullYear(), w = c.getMonth();
            w == 0 && (w = 12, p--);
            var C = new Date();
            C.setMonth(w - 1), C.setFullYear(p), h.push(C), c = C;
          }
          return h;
        }, getNextMonths: function(c, d) {
          c && c instanceof Date || (c = new Date()), a.isNumber(d) || (d = 1);
          for (var h = [c], m = 0; m < d - 1; m++) {
            var p = c.getFullYear(), w = c.getMonth();
            w == 11 && (w = -1, p++);
            var C = new Date();
            C.setMonth(w + 1), C.setFullYear(p), h.push(C), c = C;
          }
          return h;
        }, getDateAfter: function(c, d) {
          return c && c instanceof Date || (c = new Date()), a.isNumber(d) || (d = 1), new Date(c.getTime() + 24 * d * 60 * 60 * 1e3);
        }, getDateBefore: function(c, d) {
          return c && c instanceof Date || (c = new Date()), a.isNumber(d) || (d = 1), new Date(c.getTime() - 24 * d * 60 * 60 * 1e3);
        }, getDays: function(c, d) {
          if (!a.isNumber(c))
            throw new TypeError("The first parameter must be a number representing the year");
          if (!a.isNumber(d))
            throw new TypeError("The second argument must be a number representing the month");
          return c = parseInt(c), d = parseInt(d), new Date(c, d, 0).getDate();
        } };
      }, 899: (n, i, f) => {
        function a(h) {
          if (Array.isArray(h)) {
            for (var m = 0, p = Array(h.length); m < h.length; m++)
              p[m] = h[m];
            return p;
          }
          return Array.from(h);
        }
        var c = f(5), d = f(884);
        n.exports = { getElementPoint: function(h, m) {
          if (!this.isElement(h))
            throw new TypeError("The first argument must be an element");
          if (this.isElement(m) || (m = document.body), !this.isContains(m, h))
            throw new Error("The second argument and the first argument have no hierarchical relationship");
          for (var p = h, w = 0, C = 0; this.isElement(h) && this.isContains(m, h) && m !== h; )
            w += h.offsetTop, C += h.offsetLeft, h = h.offsetParent;
          return { top: w, left: C, right: m.offsetWidth - C - p.offsetWidth, bottom: m.offsetHeight - w - p.offsetHeight };
        }, isContains: function(h, m) {
          if (!this.isElement(h))
            throw new TypeError("The first argument must be an element");
          if (!this.isElement(m))
            throw new TypeError("The second argument must be an element");
          return h === m || (h.contains ? h.contains(m) : h.compareDocumentPosition ? !!(16 & h.compareDocumentPosition(m)) : void 0);
        }, isParentNode: function(h, m) {
          if (!this.isElement(h))
            throw new TypeError("The first argument must be an element");
          if (!this.isElement(m))
            throw new TypeError("The second argument must be an element");
          return h !== m && m.parentNode === h;
        }, children: function(h, m) {
          if (!this.isElement(h))
            throw new TypeError("The first argument must be an element");
          if (m && typeof m != "string")
            throw new TypeError("The second argument must be a string");
          var p = h.querySelectorAll(m || "*");
          return [].concat(a(p)).filter(function(w) {
            return w.parentNode === h;
          });
        }, siblings: function(h, m) {
          if (!this.isElement(h))
            throw new TypeError("The first argument must be an element");
          if (m && typeof m != "string")
            throw new TypeError("The second argument must be a string");
          if (!h.parentNode)
            return [];
          var p = h.parentNode.querySelectorAll(m || "*");
          return [].concat(a(p)).filter(function(w) {
            return w.parentNode === h.parentNode && w != h;
          });
        }, rem2px: function(h) {
          if (!d.isNumber(h))
            throw new TypeError("The argument must be a number");
          var m = this.getCssStyle(document.documentElement, "font-size");
          return d.mutiply(h, parseFloat(m));
        }, px2rem: function(h) {
          if (!d.isNumber(h))
            throw new TypeError("The argument must be a number");
          var m = this.getCssStyle(document.documentElement, "font-size");
          return d.divide(h, parseFloat(m));
        }, width: function(h) {
          typeof h == "string" && h && (h = document.body.querySelector(h)), this.isElement(h) || (h = document.body);
          var m = h.clientWidth, p = parseFloat(this.getCssStyle(h, "padding-left")), w = parseFloat(this.getCssStyle(h, "padding-right"));
          return d.subtract(m, p, w);
        }, height: function(h) {
          typeof h == "string" && h && (h = document.body.querySelector(h)), this.isElement(h) || (h = document.body);
          var m = h.clientHeight, p = parseFloat(this.getCssStyle(h, "padding-top")), w = parseFloat(this.getCssStyle(h, "padding-bottom"));
          return d.subtract(m, p, w);
        }, removeClass: function(h, m) {
          if (!this.isElement(h))
            throw new TypeError("The first argument must be an element");
          if (!m || typeof m != "string")
            throw new TypeError("The second argument must be a string");
          var p = h.classList;
          c.trim(m).split(/\s+/).forEach(function(w, C) {
            p.remove(w);
          });
        }, addClass: function(h, m) {
          if (!this.isElement(h))
            throw new TypeError("The first argument must be an element");
          if (!m || typeof m != "string")
            throw new TypeError("The second argument must be a string");
          var p = h.classList;
          c.trim(m).split(/\s+/).forEach(function(w, C) {
            p.add(w);
          });
        }, hasClass: function(h, m) {
          if (!this.isElement(h))
            throw new TypeError("The first argument must be an element");
          if (!m || typeof m != "string")
            throw new TypeError("The second argument must be a string");
          var p = h.classList;
          return c.trim(m).split(/\s+/).every(function(w, C) {
            return p.contains(w);
          });
        }, scrollTopBottomTrigger: function(h, m) {
          var p = this;
          typeof h == "string" && h && (h = document.body.querySelector(h));
          var w = window;
          this.isElement(h) && h != document.body && h != document.documentElement && (w = h), typeof h == "function" && (m = h);
          var C = !0;
          w.addEventListener("scroll", function(E) {
            if (p.getScrollTop(w) <= 0) {
              if (!C)
                return;
              typeof m == "function" && (C = !1, m({ state: "top", target: w }));
            } else {
              var z, H = { state: "bottom", target: w };
              if (z = w == window ? window.innerHeight : w.clientHeight, d.add(p.getScrollTop(w), z) + 1 >= p.getScrollHeight(w) && z != p.getScrollHeight(w)) {
                if (!C)
                  return;
                typeof m == "function" && (C = !1, m(H));
              } else
                C = !0;
            }
          });
        }, getScrollWidth: function(h) {
          return typeof h == "string" && h && (h = document.body.querySelector(h)), this.isElement(h) && h != document.documentElement && h != document.body && h != window ? h.scrollWidth : document.documentElement.scrollWidth == 0 || document.body.scrollWidth == 0 ? document.documentElement.scrollWidth || document.body.scrollWidth : document.documentElement.scrollWidth > document.body.scrollWidth ? document.documentElement.scrollWidth : document.body.scrollWidth;
        }, getScrollHeight: function(h) {
          return typeof h == "string" && h && (h = document.body.querySelector(h)), this.isElement(h) && h != document.documentElement && h != document.body && h != window ? h.scrollHeight : document.documentElement.scrollHeight == 0 || document.body.scrollHeight == 0 ? document.documentElement.scrollHeight || document.body.scrollHeight : document.documentElement.scrollHeight > document.body.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight;
        }, setScrollTop: function(h) {
          var m = this, p = !1, w = h.el;
          typeof w == "string" && w && (w = document.body.querySelector(w));
          var C = h.number || 0, E = h.time || 0;
          return this.isElement(w) && w != document.body && w != document.documentElement && w != window || (p = !0), new Promise(function(z, H) {
            if (E <= 0)
              p ? document.documentElement.scrollTop = document.body.scrollTop = C : w.scrollTop = C, z();
            else
              var V = d.divide(E, 10), $ = m.getScrollTop(w), X = d.divide(d.subtract(C, $), V), L = setInterval(function() {
                V > 0 ? (V--, p ? document.documentElement.scrollTop = document.body.scrollTop = $ = d.add($, X) : w.scrollTop = $ = d.add($, X)) : (clearInterval(L), z());
              }, 10);
          });
        }, getScrollTop: function(h) {
          return typeof h == "string" && h && (h = document.body.querySelector(h)), this.isElement(h) && h != document.body && h != document.documentElement && h != window ? h.scrollTop : document.documentElement.scrollTop == 0 || document.body.scrollTop == 0 ? document.documentElement.scrollTop || document.body.scrollTop : document.documentElement.scrollTop > document.body.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        }, getScrollLeft: function(h) {
          return typeof h == "string" && h && (h = document.body.querySelector(h)), this.isElement(h) && h != document.body && h != document.documentElement && h != window ? h.scrollLeft : document.documentElement.scrollLeft == 0 || document.body.scrollLeft == 0 ? document.documentElement.scrollLeft || document.body.scrollLeft : document.documentElement.scrollLeft > document.body.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
        }, setScrollLeft: function(h) {
          var m = this, p = !1, w = h.el;
          typeof w == "string" && w && (w = document.body.querySelector(w));
          var C = h.number || 0, E = h.time || 0;
          return this.isElement(w) && w != document.body && w != document.documentElement && w != window || (p = !0), new Promise(function(z, H) {
            if (E <= 0)
              p ? document.documentElement.scrollLeft = document.body.scrollLeft = C : w.scrollLeft = C, z();
            else
              var V = d.divide(E, 10), $ = m.getScrollLeft(w), X = d.divide(d.subtract(C, $), V), L = setInterval(function() {
                V > 0 ? (V--, p ? document.documentElement.scrollLeft = document.body.scrollLeft = $ = d.add($, X) : w.scrollLeft = $ = d.add($, X)) : (clearInterval(L), z());
              }, 10);
          });
        }, getCssStyle: function(h, m) {
          if (!this.isElement(h))
            throw new TypeError("The first argument must be an element");
          if (!m || typeof m != "string")
            throw new TypeError("The second argument must be a string");
          return document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(h)[m] : h.currentStyle[m];
        }, getCssSelector: function(h) {
          if (!h || typeof h != "string")
            throw new TypeError("The argument must be a selector string");
          if (/^#{1}/.test(h))
            return { type: "id", value: h.substr(1) };
          if (/^\./.test(h))
            return { type: "class", value: h.substr(1) };
          if (/^\[(.+)\]$/.test(h)) {
            var m = "", p = c.trim(h, !0).substring(1, c.trim(h, !0).length - 1).split("=");
            return p.length == 1 && (m = p[0]), p.length == 2 && (m = { attributeName: p[0], attributeValue: p[1].replace(/\'/g, "").replace(/\"/g, "") }), { type: "attribute", value: m };
          }
          return { type: "tag", value: h };
        }, getElementBounding: function(h) {
          typeof h == "string" && h && (h = document.body.querySelector(h)), this.isElement(h) || (h = document.body);
          var m = h.getBoundingClientRect();
          return { top: m.top, bottom: d.subtract(document.documentElement.clientHeight || window.innerHeight, m.bottom), left: m.left, right: d.subtract(document.documentElement.clientWidth || window.innerWidth, m.right) };
        }, isElement: function(h) {
          return !!(h && h.nodeType === 1 && h instanceof Node);
        }, string2dom: function(h) {
          if (!h || typeof h != "string")
            throw new TypeError("The argument must be an HTML string");
          var m = document.createElement("div");
          return m.innerHTML = h, m.children.length == 1 ? m.children[0] : m.children;
        } };
      }, 15: (n, i, f) => {
        var a = f(997), c = f(899), d = f(493), h = function(m) {
          var p = m.split(/[\s]+/g), w = [];
          return p.forEach(function(C) {
            var E = C.split("."), z = { eventName: E[0] };
            E.length > 1 && (z.guid = E[1]), w.push(z);
          }), w;
        };
        n.exports = { on: function(m, p, w, C) {
          if (!c.isElement(m) && m != window)
            throw new TypeError("The first argument must be an element node");
          if (!p || typeof p != "string")
            throw new TypeError("The second argument must be a string");
          if (!w || typeof w != "function")
            throw new TypeError("The third argument must be a function");
          d.isObject(C) || (C = {}), h(p).forEach(function(E) {
            (function(z, H, V, $, X) {
              var L = a.get(z, "dap-defined-events") || {};
              V || (V = a.get(z, "dap-event-guid") || 0, a.set(z, "dap-event-guid", V + 1)), L[V = H + "_" + V] && L[V].type == H && z.removeEventListener(H, L[V].fn, L[V].options), z.addEventListener(H, $, X), L[V] = { type: H, fn: $, options: X }, a.set(z, "dap-defined-events", L);
            })(m, E.eventName, E.guid, w.bind(m), C);
          });
        }, off: function(m, p) {
          if (!c.isElement(m) && m != window)
            throw new TypeError("The first argument must be an element node");
          var w = a.get(m, "dap-defined-events");
          if (w) {
            if (!p) {
              for (var C = Object.keys(w), E = C.length, z = 0; z < E; z++) {
                var H = C[z];
                m.removeEventListener(w[H].type, w[H].fn, w[H].options);
              }
              return a.remove(m, "dap-defined-events"), void a.remove(m, "dap-event-guid");
            }
            h(p).forEach(function(V) {
              (function($, X, L) {
                for (var U = a.get($, "dap-defined-events") || {}, It = Object.keys(U), Et = It.length, ut = 0; ut < Et; ut++) {
                  var Z = It[ut];
                  U[Z].type == X && (L ? Z == X + "_" + L && ($.removeEventListener(U[Z].type, U[Z].fn, U[Z].options), U[Z] = void 0) : ($.removeEventListener(U[Z].type, U[Z].fn, U[Z].options), U[Z] = void 0));
                }
                U = function(dt) {
                  var St = {};
                  return Object.keys(dt).forEach(function(ct) {
                    dt[ct] && (St[ct] = dt[ct]);
                  }), St;
                }(U), a.set($, "dap-defined-events", U);
              })(m, V.eventName, V.guid);
            });
          }
        } };
      }, 592: (n) => {
        n.exports = { getImageUrl: function(i) {
          if (!(i && i instanceof File))
            throw new TypeError("The argument must be a File object");
          return window.URL.createObjectURL(i);
        }, dataFileToBase64: function(i) {
          return new Promise(function(f, a) {
            i && i instanceof File || a(new TypeError("The argument must be a File object"));
            var c = new FileReader();
            c.readAsDataURL(i), c.onloadend = function() {
              var d = c.result;
              f(d);
            };
          });
        }, dataBase64toFile: function(i, f) {
          if (!i || typeof i != "string")
            throw new TypeError("The first argument must be a string");
          if (!f || typeof f != "string")
            throw new TypeError("The second argument must be a string");
          for (var a = i.split(","), c = a[0].match(/:(.*?);/)[1], d = atob(a[1]), h = d.length, m = new Uint8Array(h); h--; )
            m[h] = d.charCodeAt(h);
          return new File([m], f, { type: c });
        } };
      }, 579: (n, i, f) => {
        var a = f(884), c = f(997), d = f(899), h = f(15), m = f(493), p = f(278), w = f(902), C = f(592), E = f(5), z = f(792), H = f(306);
        console.log("%c\u611F\u8C22\u4F7F\u7528" + H.name + "\uFF0C\u5F53\u524D\u7248\u672C\uFF1A%c v" + H.version + `
%c\u5982\u679C\u4F60\u89C9\u5F97` + H.name + `\u8FD8\u4E0D\u9519\uFF0C\u4E0D\u59A8\u53BBgithub\u70B9\u4E2Astar
github\u5730\u5740\uFF1A%c` + H.repository.url, "color:#808080;", "color:#008a00", "color:#808080;", "color:#008a00"), n.exports = { number: a, data: c, element: d, event: h, common: m, date: p, color: w, file: C, string: E, platform: z };
      }, 884: (n) => {
        n.exports = { formatNumber: function(i) {
          return this.isNumber(i) ? i.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") : i;
        }, isNumber: function(i) {
          return typeof i == "number" && !isNaN(i);
        }, add: function() {
          for (var i = arguments.length, f = Array(i), a = 0; a < i; a++)
            f[a] = arguments[a];
          return f.reduce(function(c, d) {
            var h, m = 0, p = 0;
            try {
              m = c.toString().split(".")[1].length;
            } catch {
            }
            try {
              p = d.toString().split(".")[1].length;
            } catch {
            }
            return (c * (h = Math.pow(10, Math.max(m, p))) + d * h) / h;
          });
        }, subtract: function() {
          for (var i = arguments.length, f = Array(i), a = 0; a < i; a++)
            f[a] = arguments[a];
          return f.reduce(function(c, d) {
            var h, m = 0, p = 0;
            try {
              m = c.toString().split(".")[1].length;
            } catch {
            }
            try {
              p = d.toString().split(".")[1].length;
            } catch {
            }
            return (c * (h = Math.pow(10, Math.max(m, p))) - d * h) / h;
          });
        }, mutiply: function() {
          for (var i = arguments.length, f = Array(i), a = 0; a < i; a++)
            f[a] = arguments[a];
          return f.reduce(function(c, d) {
            var h = 0, m = c.toString(), p = d.toString();
            try {
              h += m.split(".")[1].length;
            } catch {
            }
            try {
              h += p.split(".")[1].length;
            } catch {
            }
            return Number(m.replace(".", "")) * Number(p.replace(".", "")) / Math.pow(10, h);
          });
        }, divide: function() {
          for (var i = arguments.length, f = Array(i), a = 0; a < i; a++)
            f[a] = arguments[a];
          return f.reduce(function(c, d) {
            var h = 0, m = 0, p = c.toString(), w = d.toString();
            try {
              h = p.split(".")[1].length;
            } catch {
            }
            try {
              m = w.split(".")[1].length;
            } catch {
            }
            return (p = Number(p.replace(".", ""))) / (w = Number(w.replace(".", ""))) * Math.pow(10, m - h);
          });
        } };
      }, 792: (n) => {
        n.exports = { language: function() {
          return window.navigator.browserLanguage || window.navigator.language;
        }, device: function() {
          var i = window.navigator.userAgent;
          return { PC: !i.match(/AppleWebKit.*Mobile.*/), Mobile: !!i.match(/AppleWebKit.*Mobile.*/), iPhone: i.includes("iPhone"), Phone: i.includes("Android") && /(?:Mobile)/.test(i) || i.includes("iPhone") || /(?:Windows Phone)/.test(i), iPad: i.includes("iPad"), Tablet: i.includes("iPad") || i.includes("Android") && !/(?:Mobile)/.test(i) || i.includes("Firefox") && /(?:Tablet)/.test(i), WindowsPhone: /(?:Windows Phone)/.test(i) };
        }, browser: function() {
          var i = window.navigator.userAgent;
          return { Edge: !!i.match(/Edg\/([\d.]+)/), weixin: i.includes("MicroMessenger"), QQ: i.includes("QQ"), QQBrowser: i.includes("MQQBrowser"), UC: i.includes("UCBrowser"), Chrome: i.includes("Chrome"), Firefox: i.includes("Firefox"), sougou: i.toLocaleLowerCase().includes("se 2.x") || i.toLocaleLowerCase().includes("metasr") || i.toLocaleLowerCase().includes("sogou"), Safari: i.includes("Safari") && !i.includes("Chrome") };
        }, browserKernel: function() {
          var i = window.navigator.userAgent;
          return i.includes("Presto") ? "opera" : i.includes("AppleWebKit") ? "webkit" : i.includes("Gecko") && !i.includes("KHTML") ? "gecko" : "";
        }, os: function() {
          var i, f = window.navigator.userAgent;
          return { Windows: f.includes("Windows"), Windows_CPU: f.toLocaleLowerCase().includes("win64") || f.toLocaleLowerCase().includes("wow64") ? "x64" : f.toLocaleLowerCase().includes("win32") || f.toLocaleLowerCase().includes("wow32") ? "x32" : "", Windows_Version: f.includes("Windows NT 6.1") || f.includes("Windows 7") ? "Win7" : f.includes("Windows NT 6.3") || f.includes("Windows NT 6.2") || f.includes("Windows NT 8") ? "Win8" : f.includes("Windows NT 10") || f.includes("Windows NT 6.4") ? "Win10" : "", Mac: f.includes("Macintosh"), Mac_Version: function() {
            if (f.includes("Macintosh")) {
              var a = f.match(/Mac OS X ([^\s]+)\)/);
              if (a && a[1])
                return a[1].split(/_|\./).join(".");
            }
            return "";
          }(), ios: !!f.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), ios_Version: function() {
            if (f.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
              var a = f.match(/CPU.+OS ([^\s]+) like Mac OS X/);
              if (a && a[1])
                return a[1].split(/_|\./).join(".");
            }
            return "";
          }(), Android: f.includes("Android"), Android_Version: (i = f.match(/Android ([^\s]+);/), i && i[1] ? i[1].split(/_|\./).join(".") : ""), Linux: f.includes("Linux"), HarmonyOS: f.includes("HarmonyOS"), Ubuntu: f.includes("Ubuntu") };
        } };
      }, 5: (n, i, f) => {
        var a = f(884);
        n.exports = { insert: function(c, d, h) {
          if (!c || typeof c != "string")
            throw new TypeError("The first argument must be a string");
          if (typeof d != "string")
            throw new TypeError("The second argument must be a string");
          if (!a.isNumber(h))
            throw new TypeError("The third argument must be a number");
          if (h < 0)
            throw new Error("The third argument cannot be less than 0");
          return c.substring(0, h) + d + c.substring(h, c.length);
        }, delete: function(c, d, h) {
          if (!c || typeof c != "string")
            throw new TypeError("The first argument must be a string");
          if (!a.isNumber(d))
            throw new TypeError("The second argument must be a number");
          if (d < 0)
            throw new Error("The second argument cannot be less than 0");
          if (!a.isNumber(h))
            throw new TypeError("The third argument must be a number");
          if (h < 0)
            throw new Error("The third argument cannot be less than 0");
          return c.substring(0, d) + c.substring(d + h, c.length);
        }, replace: function(c, d, h, m) {
          if (!c || typeof c != "string")
            throw new TypeError("The first argument must be a string");
          if (!a.isNumber(d))
            throw new TypeError("The second argument must be a number");
          if (d < 0)
            throw new Error("The second argument cannot be less than 0");
          if (!a.isNumber(h))
            throw new TypeError("The third argument must be a number");
          if (h < 0)
            throw new Error("The third argument cannot be less than 0");
          if (typeof m != "string")
            throw new TypeError("The fourth argument must be a string");
          return c.substring(0, d) + m + c.substring(h, c.length);
        }, trim: function(c, d) {
          if (typeof c != "string")
            throw new TypeError("The first argument must be a string");
          var h = c.replace(/(^\s+)|(\s+$)/g, "");
          return d && (h = h.replace(/\s/g, "")), h;
        } };
      }, 306: (n) => {
        n.exports = JSON.parse('{"name":"dap-util","version":"1.2.2","description":"\u4E00\u4E2A\u8F7B\u91CF\u7684\u524D\u7AEFJavaScript\u5DE5\u5177\u5E93\uFF0C\u4E13\u6CE8\u4E8EJavaScript\uFF0C\u4E0D\u5173\u5FC3UI","main":"dist/dap-util.js","private":false,"scripts":{"serve":"cross-env NODE_ENV=development webpack","build":"cross-env NODE_ENV=production webpack"},"author":"lingkai","license":"MIT","dependencies":{},"babel":{"presets":["env"],"plugins":[]},"devDependencies":{"babel-core":"^6.26.3","babel-loader":"^7.1.5","babel-preset-env":"^1.7.0","cross-env":"^7.0.3"},"repository":{"type":"git","url":"https://github.com/lovelin0523/dap-util"}}');
      } }, r = {};
      return function n(i) {
        var f = r[i];
        if (f !== void 0)
          return f.exports;
        var a = r[i] = { exports: {} };
        return s[i](a, a.exports, n), a.exports;
      }(579);
    })();
  });
})(At);
const l = At.exports;
class pt {
  constructor(t, s) {
    this.$el = t, l.common.isObject(s) || (s = {}), this.$target = s.target, this.$root = s.root, this.callback = s.callback, this.time = s.time, this.distance = s.distance, this.hasInit = !1;
  }
  init() {
    if (!this.hasInit) {
      if (this.hasInit = !0, typeof this.$root == "string" && this.$root && (this.$root = document.body.querySelector(this.$root)), typeof this.$target == "string" && this.$target && (this.$target = document.body.querySelector(this.$target)), !l.element.isElement(this.$el))
        throw new TypeError(
          "The element you click on is not a node element"
        );
      if (!l.element.isElement(this.$target))
        throw new TypeError("Anchor element is not a node element");
      l.number.isNumber(this.time) || (this.time = 0), typeof this.callback != "function" && (this.callback = function() {
      }), l.number.isNumber(this.distance) || (this.distance = 0.1), l.element.isElement(this.$root) ? l.event.on(this.$el, "click.anchor", (t) => {
        let s = l.element.getElementPoint(
          this.$target,
          this.$root
        ).top;
        l.element.setScrollTop({
          el: this.$root,
          number: s - l.element.rem2px(this.distance),
          time: this.time
        }).then(() => {
          let r = s - l.element.rem2px(this.distance) <= 0 ? 0 : s - l.element.rem2px(this.distance);
          this.callback(r);
        });
      }) : l.event.on(this.$el, "click.anchor", (t) => {
        let s = l.element.getElementPoint(this.$target).top;
        l.element.setScrollTop({
          number: s - l.element.rem2px(this.distance),
          time: this.time
        }).then(() => {
          let r = s - l.element.rem2px(this.distance) <= 0 ? 0 : s - l.element.rem2px(this.distance);
          this.callback(r);
        });
      });
    }
  }
}
pt.install = (e) => {
  e.directive("anchor", {
    mounted(t, s) {
      let r = {};
      l.common.isObject(s.value) && Object.assign(r, s.value), new pt(t, r).init();
    }
  });
};
class k {
  constructor(t, s) {
    this.$el = t, l.common.isObject(s) || (s = {}), this.draggableX = s.draggableX, this.draggableY = s.draggableY, this.mode = s.mode, this.beforeResize = s.beforeResize, this.resize = s.resize, this.trigger = s.trigger, this.end = s.end, this.ready = s.ready, this.range = s.range, this.draggable = !1, this.leftRange = {}, this.rightRange = {}, this.topRange = {}, this.bottomRange = {}, this.leftTopRange = {}, this.rightTopRange = {}, this.leftBottomRange = {}, this.rightBottomRange = {}, this.startX = 0, this.satrtY = 0, this._width = 0, this._height = 0, this._left = 0, this._right = 0, this.hasInit = !1, this.cursor = "", this.guid = this._createGuid();
  }
  init() {
    this.hasInit || (this.hasInit = !0, typeof this.draggableX != "boolean" && (this.draggableX = !0), typeof this.draggableY != "boolean" && (this.draggableY = !0), l.common.isObject(this.mode) ? (typeof this.mode.left != "boolean" && (this.mode.left = k.MODE.LEFT), typeof this.mode.top != "boolean" && (this.mode.top = k.MODE.TOP), typeof this.mode.bottom != "boolean" && (this.mode.bottom = k.MODE.BOTTOM), typeof this.mode.right != "boolean" && (this.mode.right = k.MODE.RIGHT)) : this.mode = {
      left: k.MODE.LEFT,
      top: k.MODE.TOP,
      bottom: k.MODE.BOTTOM,
      right: k.MODE.RIGHT
    }, typeof this.beforeResize != "function" && (this.beforeResize = function() {
    }), typeof this.resize != "function" && (this.resize = function() {
    }), typeof this.trigger != "function" && (this.trigger = function() {
    }), typeof this.end != "function" && (this.end = function() {
    }), typeof this.ready != "function" && (this.ready = function() {
    }), l.number.isNumber(this.range) || (this.range = 0.4), this.setRange(), this._setOn(), this.ready.apply(this, [this]));
  }
  setRange() {
    let t = this.$el.getBoundingClientRect();
    this.draggableX && this.draggableY ? (this.leftRange = {
      x: [t.left, t.left + l.element.rem2px(this.range)],
      y: [
        t.top + l.element.rem2px(this.range),
        t.bottom - l.element.rem2px(this.range)
      ]
    }, this.rightRange = {
      x: [t.right - l.element.rem2px(this.range), t.right],
      y: [
        t.top + l.element.rem2px(this.range),
        t.bottom - l.element.rem2px(this.range)
      ]
    }, this.topRange = {
      x: [
        t.left + l.element.rem2px(this.range),
        t.right - l.element.rem2px(this.range)
      ],
      y: [t.top, t.top + l.element.rem2px(this.range)]
    }, this.bottomRange = {
      x: [
        t.left + l.element.rem2px(this.range),
        t.right - l.element.rem2px(this.range)
      ],
      y: [
        t.bottom - l.element.rem2px(this.range),
        t.bottom
      ]
    }, this.leftTopRange = {
      x: [t.left, t.left + l.element.rem2px(this.range)],
      y: [t.top, t.top + l.element.rem2px(this.range)]
    }, this.leftBottomRange = {
      x: [t.left, t.left + l.element.rem2px(this.range)],
      y: [
        t.bottom - l.element.rem2px(this.range),
        t.bottom
      ]
    }, this.rightTopRange = {
      x: [t.right - l.element.rem2px(this.range), t.right],
      y: [t.top, t.top + l.element.rem2px(this.range)]
    }, this.rightBottomRange = {
      x: [t.right - l.element.rem2px(this.range), t.right],
      y: [
        t.bottom - l.element.rem2px(this.range),
        t.bottom
      ]
    }) : this.draggableX ? (this.leftRange = {
      x: [t.left, t.left + l.element.rem2px(this.range)],
      y: [t.top, t.bottom]
    }, this.rightRange = {
      x: [t.right - l.element.rem2px(this.range), t.right],
      y: [t.top, t.bottom]
    }) : this.draggableY && (this.topRange = {
      x: [t.left, t.right],
      y: [t.top, t.top + l.element.rem2px(this.range)]
    }, this.bottomRange = {
      x: [t.left, t.right],
      y: [
        t.bottom - l.element.rem2px(this.range),
        t.bottom
      ]
    });
  }
  _getIsInRange(t, s, r) {
    let n = t >= r.x[0] && t <= r.x[1], i = s >= r.y[0] && s <= r.y[1];
    return !!(n && i);
  }
  _down(t) {
    this._width = this.$el.offsetWidth, this._height = this.$el.offsetHeight, this._left = this.$el.offsetLeft, this._top = this.$el.offsetTop, this.cursor = l.element.getCssStyle(this.$el, "cursor"), this.draggableX && this.draggableY ? this._getIsInRange(this.startX, this.startY, this.leftTopRange) ? (this.mode.left || this.mode.top) && (this.draggable = !0, this.$el.style.cursor = "nw-resize", this.trigger.apply(this, [
      {
        event: t,
        area: k.AREA.LEFTTOP
      }
    ])) : this._getIsInRange(
      this.startX,
      this.startY,
      this.leftBottomRange
    ) ? (this.mode.left || this.mode.bottom) && (this.draggable = !0, this.$el.style.cursor = "sw-resize", this.trigger.apply(this, [
      {
        event: t,
        area: k.AREA.LEFTBOTTOM
      }
    ])) : this._getIsInRange(this.startX, this.startY, this.rightTopRange) ? (this.mode.right || this.mode.top) && (this.draggable = !0, this.$el.style.cursor = "ne-resize", this.trigger.apply(this, [
      {
        event: t,
        area: k.AREA.RIGHTTOP
      }
    ])) : this._getIsInRange(
      this.startX,
      this.startY,
      this.rightBottomRange
    ) ? (this.mode.right || this.mode.bottom) && (this.draggable = !0, this.$el.style.cursor = "se-resize", this.trigger.apply(this, [
      {
        event: t,
        area: k.AREA.RIGHTBOTTOM
      }
    ])) : this._getIsInRange(this.startX, this.startY, this.leftRange) ? this.mode.left && (this.draggable = !0, this.$el.style.cursor = "w-resize", this.trigger.apply(this, [
      {
        event: t,
        area: k.AREA.LEFT
      }
    ])) : this._getIsInRange(this.startX, this.startY, this.rightRange) ? this.mode.right && (this.draggable = !0, this.$el.style.cursor = "e-resize", this.trigger.apply(this, [
      {
        event: t,
        area: k.AREA.RIGHT
      }
    ])) : this._getIsInRange(this.startX, this.startY, this.topRange) ? this.mode.top && (this.draggable = !0, this.$el.style.cursor = "n-resize", this.trigger.apply(this, [
      {
        event: t,
        area: k.AREA.TOP
      }
    ])) : this._getIsInRange(this.startX, this.startY, this.bottomRange) && this.mode.bottom && (this.draggable = !0, this.$el.style.cursor = "s-resize", this.trigger.apply(this, [
      {
        event: t,
        area: k.AREA.BOTTOM
      }
    ])) : this.draggableX ? this._getIsInRange(this.startX, this.startY, this.leftRange) ? this.mode.left && (this.draggable = !0, this.$el.style.cursor = "w-resize", this.trigger.apply(this, [
      {
        event: t,
        area: k.AREA.LEFT
      }
    ])) : this._getIsInRange(this.startX, this.startY, this.rightRange) && this.mode.right && (this.draggable = !0, this.$el.style.cursor = "e-resize", this.trigger.apply(this, [
      {
        event: t,
        area: k.AREA.RIGHT
      }
    ])) : this.draggableY && (this._getIsInRange(this.startX, this.startY, this.topRange) ? this.mode.top && (this.draggable = !0, this.$el.style.cursor = "n-resize", this.trigger.apply(this, [
      {
        event: t,
        area: k.AREA.TOP
      }
    ])) : this._getIsInRange(this.startX, this.startY, this.bottomRange) && this.mode.bottom && (this.draggable = !0, this.$el.style.cursor = "s-resize", this.trigger.apply(this, [
      {
        event: t,
        area: k.AREA.BOTTOM
      }
    ])));
  }
  _move(t, s, r) {
    if (this.draggable) {
      let n = s - this.startX, i = r - this.startY;
      if (this.draggableX && this.draggableY) {
        if (this._getIsInRange(
          this.startX,
          this.startY,
          this.leftTopRange
        )) {
          if ((this.mode.left || this.mode.top) && this.beforeResize.apply(this, [
            {
              event: t,
              area: k.AREA.LEFTTOP,
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
              moveX: n,
              moveY: i
            }
          ]) === !1)
            return;
          this.mode.left && (this.$el.style.width = this._width - n + "px", this.$el.style.left = this._left + n + "px"), this.mode.top && (this.$el.style.height = this._height - i + "px", this.$el.style.top = this._top + i + "px"), (this.mode.left || this.mode.top) && this.resize.apply(this, [
            {
              area: k.AREA.LEFTTOP,
              event: t,
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
              moveX: n,
              moveY: i
            }
          ]);
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.leftBottomRange
        )) {
          if ((this.mode.left || this.mode.bottom) && this.beforeResize.apply(this, [
            {
              area: k.AREA.LEFTBOTTOM,
              event: t,
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
              moveX: n,
              moveY: i
            }
          ]) === !1)
            return;
          this.mode.left && (this.$el.style.width = this._width - n + "px", this.$el.style.left = this._left + n + "px"), this.mode.bottom && (this.$el.style.height = this._height + i + "px"), (this.mode.left || this.mode.bottom) && this.resize.apply(this, [
            {
              area: k.AREA.LEFTBOTTOM,
              event: t,
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
              moveX: n,
              moveY: i
            }
          ]);
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.rightTopRange
        )) {
          if ((this.mode.right || this.mode.top) && this.beforeResize.apply(this, [
            {
              area: k.AREA.RIGHTTOP,
              event: t,
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
              moveX: n,
              moveY: i
            }
          ]) === !1)
            return;
          this.mode.right && (this.$el.style.width = this._width + n + "px"), this.mode.top && (this.$el.style.height = this._height - i + "px", this.$el.style.top = this._top + i + "px"), (this.mode.top || this.mode.right) && this.resize.apply(this, [
            {
              area: k.AREA.RIGHTTOP,
              event: t,
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
              moveX: n,
              moveY: i
            }
          ]);
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.rightBottomRange
        )) {
          if ((this.mode.right || this.mode.bottom) && this.beforeResize.apply(this, [
            {
              area: k.AREA.RIGHTBOTTOM,
              event: t,
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
              moveX: n,
              moveY: i
            }
          ]) === !1)
            return;
          this.mode.right && (this.$el.style.width = this._width + n + "px"), this.mode.bottom && (this.$el.style.height = this._height + i + "px"), (this.mode.right || this.mode.bottom) && this.resize.apply(this, [
            {
              area: k.AREA.RIGHTBOTTOM,
              event: t,
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
              moveX: n,
              moveY: i
            }
          ]);
        } else if (this._getIsInRange(this.startX, this.startY, this.leftRange)) {
          if (this.mode.left) {
            if (this.beforeResize.apply(this, [
              {
                area: k.AREA.LEFT,
                event: t,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX: n,
                moveY: i
              }
            ]) === !1)
              return;
            this.$el.style.width = this._width - n + "px", this.$el.style.left = this._left + n + "px", this.resize.apply(this, [
              {
                area: k.AREA.LEFT,
                event: t,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX: n,
                moveY: i
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
                area: k.AREA.RIGHT,
                event: t,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX: n,
                moveY: i
              }
            ]) === !1)
              return;
            this.$el.style.width = this._width + n + "px", this.resize.apply(this, [
              {
                area: k.AREA.RIGHT,
                event: t,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX: n,
                moveY: i
              }
            ]);
          }
        } else if (this._getIsInRange(this.startX, this.startY, this.topRange)) {
          if (this.mode.top) {
            if (this.beforeResize.apply(this, [
              {
                area: k.AREA.TOP,
                event: t,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX: n,
                moveY: i
              }
            ]) === !1)
              return;
            this.$el.style.height = this._height - i + "px", this.$el.style.top = this._top + i + "px", this.resize.apply(this, [
              {
                area: k.AREA.TOP,
                event: t,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX: n,
                moveY: i
              }
            ]);
          }
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.bottomRange
        ) && this.mode.bottom) {
          if (this.beforeResize.apply(this, [
            {
              area: k.AREA.BOTTOM,
              event: t,
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
              moveX: n,
              moveY: i
            }
          ]) === !1)
            return;
          this.$el.style.height = this._height + i + "px", this.resize.apply(this, [
            {
              area: k.AREA.BOTTOM,
              event: t,
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
              moveX: n,
              moveY: i
            }
          ]);
        }
      } else if (this.draggableX) {
        if (this._getIsInRange(this.startX, this.startY, this.leftRange)) {
          if (this.mode.left) {
            if (this.beforeResize.apply(this, [
              {
                area: k.AREA.LEFT,
                event: t,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX: n,
                moveY: i
              }
            ]) === !1)
              return;
            this.$el.style.width = this._width - n + "px", this.$el.style.left = this._left + n + "px", this.resize.apply(this, [
              {
                area: k.AREA.LEFT,
                event: t,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX: n,
                moveY: i
              }
            ]);
          }
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.rightRange
        ) && this.mode.right) {
          if (this.beforeResize.apply(this, [
            {
              area: k.AREA.RIGHT,
              event: t,
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
              moveX: n,
              moveY: i
            }
          ]) === !1)
            return;
          this.$el.style.width = this._width + n + "px", this.resize.apply(this, [
            {
              area: k.AREA.RIGHT,
              event: t,
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
              moveX: n,
              moveY: i
            }
          ]);
        }
      } else if (this.draggableY) {
        if (this._getIsInRange(this.startX, this.startY, this.topRange)) {
          if (this.mode.top) {
            if (this.beforeResize.apply(this, [
              {
                area: k.AREA.TOP,
                event: t,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX: n,
                moveY: i
              }
            ]) === !1)
              return;
            this.$el.style.height = this._height - i + "px", this.$el.style.top = this._top + i + "px", this.resize.apply(this, [
              {
                area: k.AREA.TOP,
                event: t,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX: n,
                moveY: i
              }
            ]);
          }
        } else if (this._getIsInRange(
          this.startX,
          this.startY,
          this.bottomRange
        ) && this.mode.bottom) {
          if (this.beforeResize.apply(this, [
            {
              area: k.AREA.BOTTOM,
              event: t,
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
              moveX: n,
              moveY: i
            }
          ]) === !1)
            return;
          this.$el.style.height = this._height + i + "px", this.resize.apply(this, [
            {
              area: k.AREA.BOTTOM,
              event: t,
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
              moveX: n,
              moveY: i
            }
          ]);
        }
      }
    }
  }
  _leave(t) {
    this.draggable && (this.$el.style.cursor = this.cursor, this.draggable = !1, this.draggableX && this.draggableY ? this._getIsInRange(
      this.startX,
      this.startY,
      this.leftTopRange
    ) ? this.end.apply(this, [
      {
        event: t,
        area: k.AREA.LEFTTOP
      }
    ]) : this._getIsInRange(
      this.startX,
      this.startY,
      this.leftBottomRange
    ) ? this.end.apply(this, [
      {
        event: t,
        area: k.AREA.LEFTBOTTOM
      }
    ]) : this._getIsInRange(
      this.startX,
      this.startY,
      this.rightTopRange
    ) ? this.end.apply(this, [
      {
        event: t,
        area: k.AREA.RIGHTTOP
      }
    ]) : this._getIsInRange(
      this.startX,
      this.startY,
      this.rightBottomRange
    ) ? this.end.apply(this, [
      {
        event: t,
        area: k.AREA.RIGHTBOTTOM
      }
    ]) : this._getIsInRange(this.startX, this.startY, this.leftRange) ? this.end.apply(this, [
      {
        event: t,
        area: k.AREA.LEFT
      }
    ]) : this._getIsInRange(
      this.startX,
      this.startY,
      this.rightRange
    ) ? this.end.apply(this, [
      {
        event: t,
        area: k.AREA.RIGHT
      }
    ]) : this._getIsInRange(this.startX, this.startY, this.topRange) ? this.end.apply(this, [
      {
        event: t,
        area: k.AREA.TOP
      }
    ]) : this._getIsInRange(
      this.startX,
      this.startY,
      this.bottomRange
    ) && this.end.apply(this, [
      {
        event: t,
        area: k.AREA.BOTTOM
      }
    ]) : this.draggableX ? this._getIsInRange(this.startX, this.startY, this.leftRange) ? this.end.apply(this, [
      {
        event: t,
        area: k.AREA.LEFT
      }
    ]) : this._getIsInRange(
      this.startX,
      this.startY,
      this.rightRange
    ) && this.end.apply(this, [
      {
        event: t,
        area: k.AREA.RIGHT
      }
    ]) : this.draggableY && (this._getIsInRange(this.startX, this.startY, this.topRange) ? this.end.apply(this, [
      {
        event: t,
        area: k.AREA.TOP
      }
    ]) : this._getIsInRange(
      this.startX,
      this.startY,
      this.bottomRange
    ) && this.end.apply(this, [
      {
        event: t,
        area: k.AREA.BOTTOM
      }
    ])), this.setRange());
  }
  _setOn() {
    l.event.on(this.$el, "touchstart.resize", (t) => {
      this.startX = t.targetTouches[0].pageX, this.startY = t.targetTouches[0].pageY, this._down(t);
    }), l.event.on(this.$el, "touchmove.resize", (t) => {
      t.cancelable && t.preventDefault();
      let s = t.targetTouches[0].pageX, r = t.targetTouches[0].pageY;
      this._move(t, s, r);
    }), l.event.on(this.$el, "touchend.resize", (t) => {
      this._leave(t);
    }), l.event.on(this.$el, "mousedown.resize", (t) => {
      this.startX = t.pageX, this.startY = t.pageY, this._down(t);
    }), l.event.on(
      document.documentElement,
      `mousemove.resize_${this.guid}`,
      (t) => {
        let s = t.pageX, r = t.pageY;
        this._move(t, s, r);
      }
    ), l.event.on(
      document.documentElement,
      `mouseup.resize_${this.guid} mouseleave.resize_${this.guid}`,
      (t) => {
        this._leave(t);
      }
    );
  }
  _setOff() {
    l.event.off(
      document.documentElement,
      `mousemove.resize_${this.guid} mouseup.resize_${this.guid} mouseleave.resize_${this.guid}`
    );
  }
  _createGuid() {
    let t = l.data.get(document.body, "mvi-directives-resize-guid") || 0;
    return t++, l.data.set(document.body, "mvi-directives-resize-guid", t), t;
  }
  disabledDragX() {
    this.draggableX = !1, this.setRange();
  }
  disabledDragY() {
    this.draggableY = !1, this.setRange();
  }
  enabledDragX() {
    this.draggableX = !0, this.setRange();
  }
  enabledDragY() {
    this.draggableY = !0, this.setRange();
  }
}
k.AREA = {
  LEFT: 0,
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3,
  LEFTTOP: 4,
  LEFTBOTTOM: 5,
  RIGHTTOP: 6,
  RIGHTBOTTOM: 7
};
k.MODE = {
  LEFT: !0,
  TOP: !0,
  BOTTOM: !0,
  RIGHT: !0
};
k.install = (e) => {
  e.directive("resize", {
    mounted(t, s) {
      let r = {};
      l.common.isObject(s.value) && Object.assign(r, s.value), l.common.isObject(s.modifiers) && Object.assign(r, s.modifiers);
      let n = new k(t, r);
      n.init(), l.data.set(t, "directive:resize", n);
    },
    beforeUnmount(t, s) {
      let r = l.data.get(t, "directive:resize");
      r && r._setOff();
    }
  });
};
class ie {
  constructor(t, s) {
    this.$el = t, l.common.isObject(s) || (s = {}), this.$container = s.container, this.draggableX = s.draggableX, this.draggableY = s.draggableY, this.mode = s.mode, this.cursor = s.cursor, this.drag = s.drag, this.beforedrag = s.beforedrag, this.dragged = s.dragged, this.ready = s.ready, this.draggable = !1, this.hasInit = !1, this.pageX = 0, this.pageY = 0, this.guid = this._createGuid();
  }
  init() {
    if (!this.hasInit) {
      if (this.hasInit = !0, !l.element.isElement(this.$el))
        throw new TypeError(
          "The element that needs to be dragged is not a node element"
        );
      if (typeof this.$container == "string" && this.$container && (this.$container = document.body.querySelector(this.$container)), l.element.isElement(this.$container) || (this.$container = document.body), !l.element.isContains(this.$container, this.$el))
        throw new Error(
          "Elements that need to be dragged are not descendants of container elements"
        );
      if (l.element.getCssStyle(this.$container, "position") == "static" && this.$container != document.body)
        throw new Error(
          "The container element cannot be static positioning"
        );
      if (l.element.getCssStyle(this.$el, "position") == "static" || l.element.getCssStyle(this.$el, "position") == "relative")
        throw new Error(
          "The element that need to be dragged cannot be static and relative positioning"
        );
      typeof this.draggableY != "boolean" && (this.draggableY = !0), typeof this.draggableX != "boolean" && (this.draggableX = !0), this.mode != "on" && this.mode != "in" && this.mode != "over" && this.mode != "out" && (this.mode = ""), typeof this.cursor != "boolean" && (this.cursor = !0), typeof this.drag != "function" && (this.drag = function() {
      }), typeof this.beforedrag != "function" && (this.beforedrag = function() {
      }), typeof this.dragged != "function" && (this.dragged = function() {
      }), typeof this.ready != "function" && (this.ready = function() {
      }), this._setOn(), this.ready.apply(this, [this]);
    }
  }
  _setOn() {
    l.event.on(this.$el, "touchstart.drag", (t) => {
      !this.draggableX && !this.draggableY || (this.pageX = t.targetTouches[0].pageX - l.element.getElementPoint(this.$el, this.$container).left, this.pageY = t.targetTouches[0].pageY - l.element.getElementPoint(this.$el, this.$container).top, this.draggable = !0, this.cursor && (this.$el.style.cursor = "move"), this.beforedrag.apply(this, [
        {
          event: t,
          target: this.$el,
          container: this.$container,
          placement: l.element.getElementPoint(
            this.$el,
            this.$container
          )
        }
      ]));
    }), l.event.on(this.$el, "touchmove.drag", (t) => {
      if (this.draggable) {
        if (!this.draggableX && !this.draggableY)
          return;
        t.cancelable && t.preventDefault();
        let s = t.targetTouches[0].pageX - this.pageX, r = t.targetTouches[0].pageY - this.pageY;
        this.draggableX && (this.$el.style.left = s + "px"), this.draggableY && (this.$el.style.top = r + "px"), this._resize(), (this.draggableX || this.draggableY) && this.drag.apply(this, [
          {
            event: t,
            target: this.$el,
            container: this.$container,
            placement: l.element.getElementPoint(
              this.$el,
              this.$container
            )
          }
        ]);
      }
    }), l.event.on(this.$el, "touchend.drag", (t) => {
      if (this.draggable) {
        if (!this.draggableX && !this.draggableY)
          return;
        this.draggable = !1, this.cursor && (this.$el.style.cursor = ""), this.dragged.apply(this, [
          {
            event: t,
            target: this.$el,
            container: this.$container,
            placement: l.element.getElementPoint(
              this.$el,
              this.$container
            )
          }
        ]);
      }
    }), l.event.on(this.$el, "mousedown.drag", (t) => {
      !this.draggableX && !this.draggableY || (this.pageX = t.pageX - l.element.getElementPoint(this.$el, this.$container).left, this.pageY = t.pageY - l.element.getElementPoint(this.$el, this.$container).top, this.draggable = !0, this.cursor && (this.$el.style.cursor = "move"), this.beforedrag.apply(this, [
        {
          event: t,
          target: this.$el,
          container: this.$container,
          placement: l.element.getElementPoint(
            this.$el,
            this.$container
          )
        }
      ]));
    }), l.event.on(document.body, `mousemove.drag_${this.guid}`, (t) => {
      if (this.draggable) {
        if (!this.draggableX && !this.draggableY)
          return;
        let s = t.pageX - this.pageX, r = t.pageY - this.pageY;
        this.draggableX && (this.$el.style.left = s + "px"), this.draggableY && (this.$el.style.top = r + "px"), this._resize(), (this.draggableX || this.draggableY) && this.drag.apply(this, [
          {
            event: t,
            target: this.$el,
            container: this.$container,
            placement: l.element.getElementPoint(
              this.$el,
              this.$container
            )
          }
        ]);
      }
    }), l.event.on(
      document.body,
      `mouseup.drag_${this.guid} mouseleave.drag_${this.guid}`,
      (t) => {
        if (this.draggable) {
          if (!this.draggableX && !this.draggableY)
            return;
          this.draggable = !1, this.cursor && (this.$el.style.cursor = ""), this.dragged.apply(this, [
            {
              event: t,
              target: this.$el,
              container: this.$container,
              placement: l.element.getElementPoint(
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
    l.event.off(
      document.body,
      `mousemove.drag_${this.guid} mouseup.drag_${this.guid} mouseleave.drag_${this.guid}`
    );
  }
  _resize() {
    this.mode == "in" ? (this.draggableX && (l.element.getElementPoint(this.$el, this.$container).left <= 0 && (this.$el.style.left = 0), l.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth - this.$el.offsetWidth && (this.$el.style.left = this.$container.offsetWidth - this.$el.offsetWidth + "px")), this.draggableY && (l.element.getElementPoint(this.$el, this.$container).top <= 0 && (this.$el.style.top = 0), l.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight - this.$el.offsetHeight && (this.$el.style.top = this.$container.offsetHeight - this.$el.offsetHeight + "px"))) : this.mode == "on" ? (this.draggableX && (l.element.getElementPoint(this.$el, this.$container).left <= -this.$el.offsetWidth / 2 && (this.$el.style.left = -this.$el.offsetWidth / 2 + "px"), l.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth - this.$el.offsetWidth / 2 && (this.$el.style.left = this.$container.offsetWidth - this.$el.offsetWidth / 2 + "px")), this.draggableY && (l.element.getElementPoint(this.$el, this.$container).top <= -this.$el.offsetHeight / 2 && (this.$el.style.top = -this.$el.offsetHeight / 2 + "px"), l.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight - this.$el.offsetHeight / 2 && (this.$el.style.top = this.$container.offsetHeight - this.$el.offsetHeight / 2 + "px"))) : this.mode == "out" && (this.draggableX && (l.element.getElementPoint(this.$el, this.$container).left <= -this.$el.offsetWidth && (this.$el.style.left = -this.$el.offsetWidth + "px"), l.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth && (this.$el.style.left = this.$container.offsetWidth + "px")), this.draggableY && (l.element.getElementPoint(this.$el, this.$container).top <= -this.$el.offsetHeight && (this.$el.style.top = -this.$el.offsetHeight + "px"), l.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight && (this.$el.style.top = this.$container.offsetHeight + "px")));
  }
  _createGuid() {
    let t = l.data.get(document.body, "mvi-directives-drag-guid") || 0;
    return t++, l.data.set(document.body, "mvi-directives-drag-guid", t), t;
  }
  dragTo(t, s) {
    return new Promise((r, n) => {
      this.beforedrag.apply(this, [
        {
          target: this.$el,
          container: this.$container,
          placement: l.element.getElementPoint(
            this.$el,
            this.$container
          )
        }
      ]), this.draggableX && (this.$el.style.left = t + "px"), this.draggableY && (this.$el.style.top = s + "px"), this._resize();
      let i = {
        target: this.$el,
        container: this.$container,
        placement: l.element.getElementPoint(
          this.$el,
          this.$container
        )
      };
      this.dragged.apply(this, [i]), r(i);
    });
  }
}
ie.install = (e) => {
  e.directive("drag", {
    mounted(t, s) {
      let r = {};
      l.common.isObject(s.value) && Object.assign(r, s.value), l.common.isObject(s.modifiers) && Object.assign(r, s.modifiers);
      let n = new ie(t, r);
      n.init(), l.data.set(t, "directive:drag", n);
    },
    beforeUnmount(t, s) {
      let r = l.data.get(t, "directive:drag");
      r && r._setOff();
    }
  });
};
class lt {
  constructor(t, s) {
    this.$el = t, this.ratio = s, this.width = 0, this.height = 0, this.hasInit = !1, this.guid = this._createGuid();
  }
  init() {
    if (!this.hasInit) {
      if (this.hasInit = !0, !l.element.isElement(this.$el))
        throw new TypeError("The bound element is not a node element");
      (typeof this.ratio != "number" || isNaN(this.ratio)) && (this.ratio = 0), this._set(), l.event.on(window, `resize.prop_${this.guid}`, (t) => {
        this._set();
      });
    }
  }
  _set() {
    this.width = Number(
      parseFloat(l.element.getCssStyle(this.$el, "width")).toFixed(2)
    ), this.height = this.width * this.ratio, this.$el.style.height = this.height + "px";
  }
  _setOff() {
    l.event.off(window, `resize.prop_${this.guid}`);
  }
  _createGuid() {
    let t = l.data.get(document.body, "mvi-directives-prop-guid") || 0;
    return t++, l.data.set(document.body, "mvi-directives-prop-guid", t), t;
  }
}
lt.install = (e) => {
  e.directive("prop", {
    mounted(t, s) {
      let r = new lt(t, s.value);
      r.init(), l.data.set(t, "directive:prop", r);
    },
    beforeUnmount(t, s) {
      let r = l.data.get(t, "directive:prop");
      r && r._setOff();
    }
  });
};
class rt {
  constructor(t, s) {
    this.$el = t, l.common.isObject(s) || (s = {}), this.top = s.top, this.bottom = s.bottom, this.hasInit = !1;
  }
  init() {
    this.hasInit || (this.hasInit = !0, l.element.isElement(this.$el) || (this.$el = window), typeof this.top != "function" && (this.top = function() {
    }), typeof this.bottom != "function" && (this.bottom = function() {
    }), l.element.scrollTopBottomTrigger(this.$el, (t) => {
      t.state == "top" ? this.top.apply(this, [t.target]) : this.bottom.apply(this, [t.target]);
    }));
  }
}
rt.install = (e) => {
  e.directive("scroll", {
    mounted(t, s) {
      let r = {};
      l.common.isObject(s.value) && Object.assign(r, s.value), new rt(t, r).init();
    }
  });
};
class nt {
  constructor(t, s) {
    this.$el = t, l.common.isObject(s) || (s = {}), this.$root = s.el, this.beforeEnter = s.beforeEnter, this.enter = s.enter, this.beforeLeave = s.beforeLeave, this.leave = s.leave, this.hasInit = !1, this.triggerTag = {
      before: !1,
      after: !1
    }, this.guid = this._createGuid();
  }
  init() {
    this.hasInit || (this.hasInit = !0, typeof this.$root == "string" && this.$root && (this.$root = document.documentElement.querySelector(this.$root)), l.element.isElement(this.$root) || (this.$root = document.body), typeof this.beforeEnter != "function" && (this.beforeEnter = function() {
    }), typeof this.enter != "function" && (this.enter = function() {
    }), typeof this.beforeLeave != "function" && (this.beforeLeave = function() {
    }), typeof this.leave != "function" && (this.leave = function() {
    }), this._scrollHandler(), l.event.on(this.$root, `scroll.spy_${this.guid}`, (t) => {
      this._scrollHandler();
    }));
  }
  _scrollHandler() {
    let t = l.element.getCssStyle(this.$root, "overflow-x"), s = l.element.getCssStyle(this.$root, "overflow-y"), r = t == "auto" || t == "scroll", n = s == "auto" || s == "scroll", i = this.$el.getBoundingClientRect().left - this.$root.getBoundingClientRect().left, f = this.$el.getBoundingClientRect().right - this.$root.getBoundingClientRect().left, a = this.$el.getBoundingClientRect().top - this.$root.getBoundingClientRect().top, c = this.$el.getBoundingClientRect().bottom - this.$root.getBoundingClientRect().top;
    r && n ? (f >= 0 && i <= this.$root.offsetWidth && c >= 0 && a <= this.$root.offsetHeight ? this.triggerTag.before || (this.beforeEnter(this.$el), this.triggerTag.before = !0) : this.triggerTag.before && (this.leave(this.$el), this.triggerTag.before = !1), i >= 0 && f <= this.$root.offsetWidth && a >= 0 && c <= this.$root.offsetHeight ? this.triggerTag.after || (this.enter(this.$el), this.triggerTag.after = !0) : this.triggerTag.after && (this.beforeLeave(this.$el), this.triggerTag.after = !1)) : r ? (f >= 0 && i <= this.$root.offsetWidth ? this.triggerTag.before || (this.beforeEnter(this.$el), this.triggerTag.before = !0) : this.triggerTag.before && (this.leave(this.$el), this.triggerTag.before = !1), i >= 0 && f <= this.$root.offsetWidth ? this.triggerTag.after || (this.enter(this.$el), this.triggerTag.after = !0) : this.triggerTag.after && (this.beforeLeave(this.$el), this.triggerTag.after = !1)) : n && (c >= 0 && a <= this.$root.offsetHeight ? this.triggerTag.before || (this.beforeEnter(this.$el), this.triggerTag.before = !0) : this.triggerTag.before && (this.leave(this.$el), this.triggerTag.before = !1), a >= 0 && c <= this.$root.offsetHeight ? this.triggerTag.after || (this.enter(this.$el), this.triggerTag.after = !0) : this.triggerTag.after && (this.beforeLeave(this.$el), this.triggerTag.after = !1));
  }
  _setOff() {
    l.event.off(this.$root, `scroll.spy_${this.guid}`);
  }
  _createGuid() {
    let t = l.data.get(document.body, "mvi-directives-spy-guid") || 0;
    return t++, l.data.set(document.body, "mvi-directives-spy-guid", t), t;
  }
}
nt.install = (e) => {
  e.directive("spy", {
    mounted(t, s) {
      let r = {};
      l.common.isObject(s.value) && Object.assign(r, s.value);
      let n = new nt(t, r);
      n.init(), l.data.set(t, "directive:spy", n);
    },
    beforeUnmount(t, s) {
      let r = l.data.get(t, "directive:spy");
      r && r._setOff();
    }
  });
};
class ot {
  constructor(t, s) {
    this.$el = t, l.common.isObject(s) || (s = {}), this.attributes = s.attributes, this.childList = s.childList, this.subtree = s.subtree, this.attributeNames = s.attributeNames, this.attributesChange = s.attributesChange, this.childNodesChange = s.childNodesChange, this.hasInit = !1;
  }
  init() {
    if (!this.hasInit) {
      this.hasInit = !0;
      try {
        typeof this.attributes != "boolean" && (this.attributes = !1), typeof this.childList != "boolean" && (this.childList = !1), typeof this.subtree != "boolean" && (this.subtree = !1), this.attributeNames instanceof Array || (this.attributeNames = []), typeof this.attributesChange != "function" && (this.attributesChange = function() {
        }), typeof this.childNodesChange != "function" && (this.childNodesChange = function() {
        });
        let t = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, s = new t((r) => {
          let n = r.length;
          for (let i = 0; i < n; i++)
            if (r[i].type == "attributes" && this.attributes)
              this.attributesChange.apply(this, [
                r[i].attributeName,
                this.$el.getAttribute(
                  r[i].attributeName
                ),
                r[i].oldValue
              ]);
            else if (r[i].type == "childList" && this.childList) {
              for (let f of r[i].addedNodes)
                l.element.isElement(f) && this.childNodesChange.apply(this, [f, null]);
              for (let f of r[i].removedNodes)
                l.element.isElement(f) && this.childNodesChange.apply(this, [null, f]);
            }
        });
        this.attributes ? this.attributeNames.length > 0 ? s.observe(this.$el, {
          attributes: this.attributes,
          attributeFilter: this.attributeNames,
          attributeOldValue: !0,
          childList: this.childList,
          subtree: this.subtree
        }) : s.observe(this.$el, {
          attributes: this.attributes,
          attributeOldValue: !0,
          childList: this.childList,
          subtree: this.subtree
        }) : s.observe(this.$el, {
          attributes: this.attributes,
          childList: this.childList,
          subtree: this.subtree
        });
      } catch {
        throw new Error(
          "Listening failed. Your browser may not support it, or childList and attributes are false, meaning there are no objects to listen on"
        );
      }
    }
  }
}
ot.install = (e) => {
  e.directive("observe", {
    mounted(t, s) {
      let r = {};
      l.common.isObject(s.value) && Object.assign(r, s.value), new ot(t, r).init();
    }
  });
};
class q {
  constructor(t, s) {
    this.$el = t, l.common.isObject(s) || (s = {}), this.$selectInput = null, this.files = [], this.accept = s.accept, this.capture = s.capture, this.allowedFileType = s.allowedFileType, this.minSize = s.minSize, this.maxSize = s.maxSize, this.maxLength = s.maxLength, this.minLength = s.minLength, this.multiple = s.multiple, this.append = s.append, this.error = s.error, this.select = s.select, this.disabled = s.disabled, this.ready = s.ready, this.extra = s.extra, this.hasInit = !1;
  }
  init() {
    if (!this.hasInit) {
      if (this.hasInit = !0, !l.element.isElement(this.$el))
        throw new TypeError("The upload element is not specified");
      this.allowedFileType instanceof Array || (this.allowedFileType = []), (!l.number.isNumber(this.minSize) || this.minSize <= 0) && (this.minSize = -1), (!l.number.isNumber(this.maxSize) || this.maxSize <= 0) && (this.maxSize = -1), (!l.number.isNumber(this.maxLength) || this.maxLength <= 0) && (this.maxLength = -1), (!l.number.isNumber(this.minLength) || this.minLength <= 0) && (this.minLength = -1), typeof this.multiple != "boolean" && (this.multiple = !1), typeof this.capture != "boolean" && (this.capture = !1), typeof this.append != "boolean" && (this.append = !1), typeof this.disabled != "boolean" && (this.disabled = !1), typeof this.error != "function" && (this.error = function() {
      }), typeof this.select != "function" && (this.select = function() {
      }), typeof this.ready != "function" && (this.ready = function() {
      }), typeof this.extra != "object" && (this.extra = {}), this.$selectInput = l.element.string2dom("<input type='file' />"), this.accept === "rar" ? this.$selectInput.setAttribute(
        "accept",
        "application/x-rar-compressed"
      ) : this.accept === "zip" ? this.$selectInput.setAttribute(
        "accept",
        "application/x-zip-compressed"
      ) : this.accept === "txt" ? this.$selectInput.setAttribute("accept", "text/plain") : this.accept === "image" ? (this.$selectInput.setAttribute("accept", "image/*"), this.capture && this.$selectInput.setAttribute("capture", "camera")) : this.accept === "video" ? (this.$selectInput.setAttribute("accept", "video/*"), this.capture && this.$selectInput.setAttribute("capture", "camcorder")) : this.accept === "audio" ? this.$selectInput.setAttribute("accept", "aduio/*") : this.accept === "html" ? this.$selectInput.setAttribute("accept", "text/html") : this.accept === "doc" ? this.$selectInput.setAttribute("accept", "application/msword") : this.accept === "xml" ? this.$selectInput.setAttribute("accept", "text/xml") : this.accept === "js" ? this.$selectInput.setAttribute("accept", "text/javascript") : this.accept === "json" ? this.$selectInput.setAttribute("accept", "application/json") : this.accept === "ppt" ? this.$selectInput.setAttribute(
        "accept",
        "application/vnd.ms-powerpoint"
      ) : this.accept === "pdf" && this.$selectInput.setAttribute("accept", "application/pdf"), this.multiple && this.$selectInput.setAttribute("multiple", "multiple"), this.disabled && this.$el.setAttribute("disabled", "disabled"), this.$el.onclick = (t) => {
        this.disabled || this.$selectInput.click();
      }, this.$selectInput.onchange = (t) => {
        if (this.disabled)
          return;
        let s = [...this.$selectInput.files];
        this.$selectInput.value = "", this.append || (this.files = []);
        let r = s.length, n = !0;
        for (let i = 0; i < r; i++) {
          if (!this._judgeSuffix(s[i].name)) {
            this.error.apply(this, [
              q.ERRORTYPE.FILE_SUFFIX_ERROR,
              "\u6587\u4EF6" + s[i].name + "\u4E0D\u7B26\u5408\u89C4\u5B9A\u7684\u6587\u4EF6\u540E\u7F00\u7C7B\u578B",
              s[i]
            ]), n = !1;
            break;
          }
          if (s[i].size / 1024 > this.maxSize && this.maxSize > 0) {
            this.error.apply(this, [
              q.ERRORTYPE.FILE_MAXSIZE_ERROR,
              "\u6587\u4EF6" + s[i].name + "\u8D85\u51FA\u6587\u4EF6\u6700\u5927\u503C\u9650\u5B9A",
              s[i]
            ]), n = !1;
            break;
          }
          if (s[i].size / 1024 < this.minSize && this.minSize > 0) {
            this.error.apply(this, [
              q.ERRORTYPE.FILE_MINSIZE_ERROR,
              "\u6587\u4EF6" + s[i].name + "\u6CA1\u6709\u8FBE\u5230\u6587\u4EF6\u6700\u5C0F\u503C\u9650\u5B9A",
              s[i]
            ]), n = !1;
            break;
          }
          if (this.files.length + r > this.maxLength && this.maxLength > 0) {
            this.error.apply(this, [
              q.ERRORTYPE.FILE_MAXLENGTH_ERROR,
              "\u6587\u4EF6\u6570\u91CF\u8D85\u51FA\u9650\u5B9A\u7684\u6700\u5927\u503C"
            ]), n = !1;
            break;
          }
        }
        if (!!n) {
          if (this.files.length + r < this.minLength && this.minLength > 0) {
            this.error.apply(this, [
              q.ERRORTYPE.FILE_MINLENGTH_ERROR,
              "\u6587\u4EF6\u6570\u91CF\u6CA1\u6709\u8FBE\u5230\u9650\u5B9A\u7684\u6700\u5C0F\u503C"
            ]);
            return;
          }
          this.files = [...this.files, ...s], this.select.apply(this, [[...this.files], { ...this.extra }]);
        }
      }, this.ready.apply(this, [this]);
    }
  }
  _judgeSuffix(t) {
    let s = t.substr(t.lastIndexOf(".") + 1);
    if (this.allowedFileType.length == 0)
      return !0;
    s = s.toLocaleLowerCase();
    for (let r = 0; r < this.allowedFileType.length; r++)
      this.allowedFileType[r] = this.allowedFileType[r].toLocaleLowerCase();
    return this.allowedFileType.includes(s);
  }
  getFiles() {
    return {
      files: [...this.files],
      extra: { ...this.extra }
    };
  }
  clear() {
    this.files = [], this.$selectInput.value = "", this.select.apply(this, [[...this.files], { ...this.extra }]);
  }
  setDisabled() {
    this.disabled = !0, this.$el.setAttribute("disabled", "disabled");
  }
  setEnabled() {
    this.disabled = !1, this.$el.removeAttribute("disabled");
  }
}
q.ERRORTYPE = {
  FILE_SUFFIX_ERROR: 101,
  FILE_MAXSIZE_ERROR: 102,
  FILE_MINSIZE_ERROR: 103,
  FILE_MAXLENGTH_ERROR: 104,
  FILE_MINLENGTH_ERROR: 105
};
q.install = (e) => {
  e.directive("upload", {
    mounted(t, s) {
      let r = {};
      l.common.isObject(s.value) && Object.assign(r, s.value), l.common.isObject(s.modifiers) && Object.assign(r, s.modifiers), new q(t, r).init();
    }
  });
};
class gt {
  constructor(t, s) {
    this.$el = t, l.common.isObject(s) || (s = {}), this.attrName = s.attrName, this.isAfter = s.after, this.isBefore = s.before, this.hasInit = !1;
  }
  init() {
    if (!this.hasInit) {
      if (this.hasInit = !0, !l.element.isElement(this.$el))
        throw new TypeError("The bound element is not a node element");
      if (typeof this.attrName != "string" || !this.attrName)
        throw new Error("The attribute name is not set");
      typeof this.isAfter != "boolean" && (this.isAfter = !1), typeof this.isBefore != "boolean" && (this.isBefore = !1), this._do();
    }
  }
  _do() {
    let t = Math.round(window.devicePixelRatio || 1), s = Number((1 / t).toFixed(2));
    if (this.isBefore || this.isAfter) {
      let n = `mvi-directives-px_${this._createGuid()}`;
      l.element.addClass(this.$el, n);
      let i = document.createElement("style");
      i.type = "text/css", this.isBefore && (i.innerHTML = `.${n}::before {${this.attrName}:${s}px !important;}`), this.isAfter && (i.innerHTML = `.${n}::after {${this.attrName}:${s}px !important;}`), document.querySelector("head").appendChild(i);
    } else
      this.$el.style.setProperty(this.attrName, s + "px", "important");
  }
  _createGuid() {
    let t = l.data.get(document.body, "mvi-directives-px-guid") || 0;
    return t++, l.data.set(document.body, "mvi-directives-px-guid", t), t;
  }
}
gt.install = (e) => {
  e.directive("px", {
    mounted(t, s) {
      let r = {};
      l.common.isObject(s.value) && Object.assign(r, s.value), l.common.isObject(s.modifiers) && Object.assign(r, s.modifiers), s.arg && (r.attrName = s.arg), new gt(t, r).init();
    }
  });
};
const T = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [r, n] of t)
    s[r] = n;
  return s;
}, Mt = {
  name: "m-icon",
  props: {
    type: {
      type: String,
      default: ""
    },
    spin: {
      type: Boolean,
      default: !1
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
      let e = {};
      return this.url ? (e.backgroundImage = "url(" + this.url + ")", this.size && (e.width = this.size, e.height = this.size)) : (this.size && (e.fontSize = this.size), this.color && (e.color = this.color)), e;
    }
  }
};
function Bt(e, t, s, r, n, i) {
  return s.url ? (o(), u("i", {
    key: 0,
    class: y(["mvi-icon-url", s.spin ? "mvi-icon-spin" : ""]),
    style: b(i.iconStyle)
  }, null, 6)) : (o(), u("i", {
    key: 1,
    class: y(["mvi-icon", "icon-" + s.type, s.spin ? "mvi-icon-spin" : ""]),
    style: b(i.iconStyle)
  }, null, 6));
}
const M = /* @__PURE__ */ T(Mt, [["render", Bt], ["__scopeId", "data-v-dbf93aff"]]);
const Ot = {
  name: "m-button",
  props: {
    type: {
      type: String,
      default: "default",
      validator(e) {
        return [
          "default",
          "info",
          "success",
          "error",
          "warn",
          "primary"
        ].includes(e);
      }
    },
    size: {
      type: String,
      default: "medium",
      validator(e) {
        return ["mini", "small", "medium", "large"].includes(e);
      }
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    nativeType: {
      type: String,
      default: "button"
    },
    loading: {
      type: Boolean,
      default: !1
    },
    loadText: {
      type: String,
      default: "loading..."
    },
    formControl: {
      type: Boolean,
      default: !1
    },
    tag: {
      type: String,
      default: "button"
    },
    plain: {
      type: Boolean,
      default: !1
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
      default: !1
    },
    square: {
      type: Boolean,
      default: !1
    },
    active: {
      type: Boolean,
      default: !0
    },
    loadIcon: {
      type: [String, Object],
      default: null
    }
  },
  computed: {
    iconType() {
      let e = "load-e";
      return l.common.isObject(this.loadIcon) ? typeof this.loadIcon.type == "string" && (e = this.loadIcon.type) : typeof this.loadIcon == "string" && (e = this.loadIcon), e;
    },
    iconUrl() {
      let e = null;
      return l.common.isObject(this.loadIcon) && typeof this.loadIcon.url == "string" && (e = this.loadIcon.url), e;
    },
    iconSpin() {
      let e = !0;
      return l.common.isObject(this.loadIcon) && typeof this.loadIcon.spin == "boolean" && (e = this.loadIcon.spin), e;
    },
    iconSize() {
      let e = null;
      return l.common.isObject(this.loadIcon) && typeof this.loadIcon.size == "string" && (e = this.loadIcon.size), e;
    },
    iconColor() {
      let e = null;
      return l.common.isObject(this.loadIcon) && typeof this.loadIcon.color == "string" && (e = this.loadIcon.color), e;
    },
    btnStyle() {
      let e = {};
      return this.plain ? this.color && (e.color = this.color, e.borderColor = this.color, e.background = this.subColor || "#fff") : this.color && (e.background = this.color, e.borderColor = this.color, e.color = this.subColor || "#fff"), e;
    },
    btnClass() {
      let e = ["mvi-button"];
      return this.type && e.push("mvi-button-" + this.type), this.size && e.push("mvi-button-" + this.size), this.round ? e.push("mvi-button-radius-round") : this.square && e.push("mvi-button-radius-square"), this.formControl && e.push("mvi-button-form-control"), this.plain && e.push("mvi-button-plain"), this.active && !this.disabled && e.push("mvi-button-active"), this.loading && e.push("mvi-button-loading"), e;
    }
  },
  components: {
    Button: {
      render() {
        let e = {};
        return this.$parent.tag.toLocaleUpperCase() == "BUTTON" && (e.type = this.$parent.nativeType), vt(this.$parent.tag, e, {
          default: this.$slots.default
        });
      }
    },
    mIcon: M
  }
}, Ht = { key: 0 };
function Vt(e, t, s, r, n, i) {
  const f = x("m-icon"), a = x("Button", !0);
  return o(), I(a, {
    disabled: s.disabled || null,
    class: y(i.btnClass),
    style: b(i.btnStyle)
  }, {
    default: P(() => [
      s.loading && e.$slots.loading ? S(e.$slots, "loading", { key: 0 }, void 0, !0) : s.loading ? (o(), u(A, { key: 1 }, [
        D(f, {
          type: i.iconType,
          color: i.iconColor,
          url: i.iconUrl,
          spin: i.iconSpin,
          size: i.iconSize,
          class: "mvi-button-load-icon"
        }, null, 8, ["type", "color", "url", "spin", "size"]),
        s.loadText ? (o(), u("span", Ht, _(s.loadText), 1)) : g("", !0)
      ], 64)) : S(e.$slots, "default", { key: 2 }, void 0, !0)
    ]),
    _: 3
  }, 8, ["disabled", "class", "style"]);
}
const ae = /* @__PURE__ */ T(Ot, [["render", Vt], ["__scopeId", "data-v-4de95df6"]]);
ae.install = (e) => {
  e.component(ae.name, ae);
};
M.install = (e) => {
  e.component(M.name, M);
};
const $t = {
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
      default: !1
    }
  },
  computed: {
    iconType() {
      let e = null;
      return l.common.isObject(this.icon) ? typeof this.icon.type == "string" && (e = this.icon.type) : typeof this.icon == "string" && (e = this.icon), e;
    },
    iconUrl() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.url == "string" && (e = this.icon.url), e;
    },
    iconSpin() {
      let e = !1;
      return l.common.isObject(this.icon) && typeof this.icon.spin == "boolean" && (e = this.icon.spin), e;
    },
    iconSize() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.size == "string" && (e = this.icon.size), e;
    },
    iconColor() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.color == "string" && (e = this.icon.color), e;
    },
    arrowType() {
      let e = null;
      return l.common.isObject(this.arrow) ? typeof this.arrow.type == "string" && (e = this.arrow.type) : typeof this.arrow == "string" && (e = this.arrow), e;
    },
    arrowUrl() {
      let e = null;
      return l.common.isObject(this.arrow) && typeof this.arrow.url == "string" && (e = this.arrow.url), e;
    },
    arrowSpin() {
      let e = !1;
      return l.common.isObject(this.arrow) && typeof this.arrow.spin == "boolean" && (e = this.arrow.spin), e;
    },
    arrowSize() {
      let e = null;
      return l.common.isObject(this.arrow) && typeof this.arrow.size == "string" && (e = this.arrow.size), e;
    },
    arrowColor() {
      let e = null;
      return l.common.isObject(this.arrow) && typeof this.arrow.color == "string" && (e = this.arrow.color), e;
    },
    computedActive() {
      return typeof this.active == "boolean" ? this.active : typeof this.$parent.active == "boolean" ? this.$parent.active : !0;
    },
    computedBorder() {
      return typeof this.border == "boolean" ? this.border : typeof this.$parent.border == "boolean" ? this.$parent.border : !1;
    },
    labelTextStyle() {
      let e = {};
      return this.ellipsis && (e.display = "-webkit-box", e.textOverflow = "ellipsis", e.webkitBoxOrient = "vertical", e.overflow = "hidden", typeof this.ellipsis == "boolean" ? e.webkitLineClamp = 3 : e.webkitLineClamp = this.ellipsis), e;
    },
    cellClass() {
      let e = ["mvi-cell"];
      return this.computedBorder && e.push("mvi-cell-border"), this.computedActive && e.push("mvi-cell-active"), e;
    }
  },
  components: {
    mIcon: M
  }
}, jt = { class: "mvi-cell-item" }, Wt = ["textContent"], Ft = ["textContent"], Rt = ["textContent"];
function Yt(e, t, s, r, n, i) {
  const f = x("m-icon");
  return o(), u("div", {
    class: y(i.cellClass)
  }, [
    v("div", jt, [
      i.iconType || i.iconUrl ? (o(), I(f, {
        key: 0,
        class: "mvi-cell-icon",
        type: i.iconType,
        url: i.iconUrl,
        spin: i.iconSpin,
        size: i.iconSize,
        color: i.iconColor
      }, null, 8, ["type", "url", "spin", "size", "color"])) : g("", !0),
      v("div", {
        class: y(["mvi-cell-title", s.noWrap ? "mvi-cell-nowrap" : ""])
      }, [
        e.$slots.title ? S(e.$slots, "title", { key: 0 }, void 0, !0) : (o(), u("span", {
          key: 1,
          textContent: _(s.title),
          class: y(s.titleClass || "")
        }, null, 10, Wt))
      ], 2),
      e.$slots.content || s.content ? (o(), u("div", {
        key: 1,
        class: y(["mvi-cell-content", s.noWrap ? "mvi-cell-nowrap" : ""])
      }, [
        e.$slots.content ? S(e.$slots, "content", { key: 0 }, void 0, !0) : s.content ? (o(), u("span", {
          key: 1,
          textContent: _(s.content),
          class: y(s.contentClass || "")
        }, null, 10, Ft)) : g("", !0)
      ], 2)) : g("", !0),
      i.arrowType || i.arrowUrl ? (o(), I(f, {
        key: 2,
        class: "mvi-cell-arrow",
        type: i.arrowType,
        url: i.arrowUrl,
        spin: i.arrowSpin,
        size: i.arrowSize,
        color: i.arrowColor
      }, null, 8, ["type", "url", "spin", "size", "color"])) : g("", !0)
    ]),
    s.label || e.$slots.label ? (o(), u("div", {
      key: 0,
      class: y(["mvi-cell-label", s.labelClass || ""]),
      style: b(i.labelTextStyle)
    }, [
      e.$slots.label ? S(e.$slots, "label", { key: 0 }, void 0, !0) : s.label ? (o(), u("span", {
        key: 1,
        textContent: _(s.label)
      }, null, 8, Rt)) : g("", !0)
    ], 6)) : g("", !0)
  ], 2);
}
const he = /* @__PURE__ */ T($t, [["render", Yt], ["__scopeId", "data-v-979d2639"]]);
const Nt = {
  name: "m-cell-group",
  props: {
    title: {
      type: String,
      default: null
    },
    border: {
      type: Boolean,
      default: !0
    },
    titleClass: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: !0
    }
  }
}, Lt = ["textContent"];
function Ut(e, t, s, r, n, i) {
  return o(), u("div", {
    class: y(["mvi-cell-group", s.border ? "mvi-cell-group-border" : ""])
  }, [
    s.title ? (o(), u("div", {
      key: 0,
      class: y(["mvi-cell-group-title", s.titleClass || ""]),
      textContent: _(s.title)
    }, null, 10, Lt)) : g("", !0),
    S(e.$slots, "default", {}, void 0, !0)
  ], 2);
}
const _t = /* @__PURE__ */ T(Nt, [["render", Ut], ["__scopeId", "data-v-4c0b59f6"]]);
he.install = (e) => {
  e.component(_t.name, _t), e.component(he.name, he);
};
const Xt = {
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
      default: !1
    },
    border: {
      type: Boolean,
      default: !1
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
      let e = {};
      return this.title || this.$slots.title ? e.width = "20%" : this.rightIconType || this.rightIconUrl || this.$slots.right || this.rightText ? e.width = "50%" : e.width = "100%", e;
    },
    rightStyle() {
      let e = {};
      return this.title || this.$slots.title ? e.width = "20%" : this.leftIconType || this.leftIconUrl || this.$slots.left || this.leftText ? e.width = "50%" : e.width = "100%", e;
    },
    leftIconType() {
      let e = null;
      return l.common.isObject(this.leftIcon) ? typeof this.leftIcon.type == "string" && (e = this.leftIcon.type) : typeof this.leftIcon == "string" && (e = this.leftIcon), e;
    },
    leftIconUrl() {
      let e = null;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.url == "string" && (e = this.leftIcon.url), e;
    },
    leftIconSpin() {
      let e = !1;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.spin == "boolean" && (e = this.leftIcon.spin), e;
    },
    leftIconSize() {
      let e = null;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.size == "string" && (e = this.leftIcon.size), e;
    },
    leftIconColor() {
      let e = null;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.color == "string" && (e = this.leftIcon.color), e;
    },
    rightIconType() {
      let e = null;
      return l.common.isObject(this.rightIcon) ? typeof this.rightIcon.type == "string" && (e = this.rightIcon.type) : typeof this.rightIcon == "string" && (e = this.rightIcon), e;
    },
    rightIconUrl() {
      let e = null;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.url == "string" && (e = this.rightIcon.url), e;
    },
    rightIconSpin() {
      let e = !1;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.spin == "boolean" && (e = this.rightIcon.spin), e;
    },
    rightIconSize() {
      let e = null;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.size == "string" && (e = this.rightIcon.size), e;
    },
    rightIconColor() {
      let e = null;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.color == "string" && (e = this.rightIcon.color), e;
    },
    navbarClass() {
      let e = ["mvi-navbar"];
      return this.fixed && e.push("mvi-navbar-fixed"), this.border && e.push("mvi-navbar-border"), e;
    },
    centerStyle() {
      let e = {};
      return this.rightIconType || this.rightIconUrl || this.$slots.right || this.rightText || this.leftIconType || this.leftIconUrl || this.$slots.left || this.leftText ? e.width = "60%" : e.width = "100%", e;
    }
  },
  components: {
    mIcon: M
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
}, qt = ["textContent"], Gt = ["textContent"], Zt = ["textContent"];
function Kt(e, t, s, r, n, i) {
  const f = x("m-icon");
  return o(), u("div", {
    class: y(i.navbarClass),
    style: b("z-index:" + (s.fixed ? s.zIndex : ""))
  }, [
    i.leftIconType || i.leftIconUrl || e.$slots.left || s.leftText ? (o(), u("div", {
      key: 0,
      onClick: t[0] || (t[0] = (...a) => i.leftClick && i.leftClick(...a)),
      class: y(["mvi-navbar-left", s.leftClass || ""]),
      style: b(i.leftStyle)
    }, [
      e.$slots.left ? S(e.$slots, "left", { key: 0 }, void 0, !0) : g("", !0),
      (i.leftIconType || i.leftIconUrl) && !e.$slots.left ? (o(), I(f, {
        key: 1,
        class: y([s.leftText ? "mvi-navbar-left-icon" : ""]),
        type: i.leftIconType,
        url: i.leftIconUrl,
        spin: i.leftIconSpin,
        size: i.leftIconSize,
        color: i.leftIconColor
      }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : g("", !0),
      s.leftText && !e.$slots.left ? (o(), u("span", {
        key: 2,
        class: "mvi-navbar-left-text",
        textContent: _(s.leftText)
      }, null, 8, qt)) : g("", !0)
    ], 6)) : g("", !0),
    e.$slots.title || s.title ? (o(), u("div", {
      key: 1,
      onClick: t[1] || (t[1] = (...a) => i.titleClick && i.titleClick(...a)),
      class: "mvi-navbar-center",
      style: b(i.centerStyle)
    }, [
      v("div", {
        class: y(["mvi-navbar-title", s.titleClass || ""])
      }, [
        e.$slots.title ? S(e.$slots, "title", { key: 0 }, void 0, !0) : s.title ? (o(), u("span", {
          key: 1,
          textContent: _(s.title)
        }, null, 8, Gt)) : g("", !0)
      ], 2)
    ], 4)) : g("", !0),
    i.rightIconType || i.rightIconUrl || e.$slots.right || s.rightText ? (o(), u("div", {
      key: 2,
      onClick: t[2] || (t[2] = (...a) => i.rightClick && i.rightClick(...a)),
      class: y(["mvi-navbar-right", s.rightClass || ""]),
      style: b(i.rightStyle)
    }, [
      e.$slots.right ? S(e.$slots, "right", { key: 0 }, void 0, !0) : g("", !0),
      s.rightText && !e.$slots.right ? (o(), u("span", {
        key: 1,
        class: "mvi-navbar-right-text",
        textContent: _(s.rightText)
      }, null, 8, Zt)) : g("", !0),
      (i.rightIconType || i.rightIconSpin) && !e.$slots.right ? (o(), I(f, {
        key: 2,
        class: y([s.rightText ? "mvi-navbar-right-icon" : ""]),
        type: i.rightIconType,
        url: i.rightIconUrl,
        spin: i.rightIconSpin,
        size: i.rightIconSize,
        color: i.rightIconColor
      }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : g("", !0)
    ], 6)) : g("", !0)
  ], 6);
}
const Ce = /* @__PURE__ */ T(Xt, [["render", Kt], ["__scopeId", "data-v-348d0b7e"]]);
Ce.install = (e) => {
  e.component(Ce.name, Ce);
};
const Jt = {
  name: "m-badge",
  props: {
    content: {
      type: [String, Number],
      default: null
    },
    placement: {
      type: String,
      default: "top-right",
      validator(e) {
        return [
          "top-right",
          "top-left",
          "bottom-left",
          "bottom-right"
        ].includes(e);
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
      default: !1
    },
    show: {
      type: Boolean,
      default: !0
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
      let e = {};
      return this.background && (e.background = this.background), this.color && (e.color = this.color), this.offset && (this.offset[0] && (this.placement == "top-right" || this.placement == "bottom-right" ? e.marginRight = this.offset[0] : (this.placement == "top-left" || this.placement == "bottom-left") && (e.marginLeft = this.offset[0])), this.offset[1] && (this.placement == "top-right" || this.placement == "top-left" ? e.marginTop = this.offset[1] : (this.placement == "bottom-right" || this.placement == "bottom-left") && (e.marginBottom = this.offset[1]))), e;
    },
    badgeShow() {
      return !!((l.number.isNumber(this.content) || this.content) && this.show);
    }
  }
}, Qt = { class: "mvi-badge" }, ei = ["data-placement"], ti = ["data-placement"];
function ii(e, t, s, r, n, i) {
  return o(), u("div", Qt, [
    S(e.$slots, "default", {}, void 0, !0),
    s.dot && s.show ? (o(), u("span", {
      key: 0,
      class: "mvi-badge-el mvi-badge-dot",
      "data-placement": s.placement,
      style: b(i.badgeStyle)
    }, null, 12, ei)) : i.badgeShow ? (o(), u("span", {
      key: 1,
      class: "mvi-badge-el",
      "data-placement": s.placement,
      style: b(i.badgeStyle)
    }, _(s.content), 13, ti)) : g("", !0)
  ]);
}
const ue = /* @__PURE__ */ T(Jt, [["render", ii], ["__scopeId", "data-v-05cf670a"]]);
const si = {
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
      default: !1
    },
    badge: {
      type: Object,
      default: null
    }
  },
  computed: {
    iconType() {
      let e = null;
      return l.common.isObject(this.icon) ? typeof this.icon.type == "string" && (e = this.icon.type) : typeof this.icon == "string" && (e = this.icon), e;
    },
    iconUrl() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.url == "string" && (e = this.icon.url), e;
    },
    iconSpin() {
      let e = !1;
      return l.common.isObject(this.icon) && typeof this.icon.spin == "boolean" && (e = this.icon.spin), e;
    },
    iconSize() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.size == "string" && (e = this.icon.size), e;
    },
    iconColor() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.color == "string" && (e = this.icon.color), e;
    },
    computedClass() {
      let e = ["mvi-tabbar-item"];
      return l.common.equal(this.value, this.tabbar.modelValue) && e.push("mvi-tabbar-item-active"), this.tabbar.active && !this.disabled && !l.common.equal(this.value, this.tabbar.modelValue) && e.push("mvi-tabbar-active"), e;
    },
    computedStyle() {
      let e = {};
      return l.common.equal(this.value, this.tabbar.modelValue) ? this.tabbar.activeColor && (e.color = this.tabbar.activeColor) : this.tabbar.inactiveColor && (e.color = this.tabbar.inactiveColor), e;
    },
    computedRoute() {
      if (!this.route)
        return null;
      let e = {};
      return typeof this.route == "string" ? e = {
        path: this.route
      } : l.common.isObject(this.route) && (typeof this.route.path == "string" && this.route.path && (e.path = this.route.path), typeof this.route.name == "string" && this.route.name && (e.name = this.route.name), l.common.isObject(this.route.query) ? e.query = this.route.query : e.query = {}, l.common.isObject(this.route.params) ? e.params = this.route.params : e.params = {}, typeof this.route.replace == "boolean" ? e.replace = this.route.replace : e.replace = !1), e.query || (e.query = {}), e.params || (e.params = {}), e;
    }
  },
  components: {
    mIcon: M,
    mBadge: ue
  },
  methods: {
    setActive() {
      this.tabbar.itemClick(Object.assign({}, this.$props)), !this.disabled && (l.common.equal(this.tabbar.modelValue, this.value) || (this.computedRoute && this.$router && this.$router.replace && this.$router.push && (this.computedRoute.path ? this.computedRoute.replace ? this.$router.replace({
        path: this.computedRoute.path,
        query: this.computedRoute.query,
        params: this.computedRoute.params
      }) : this.$router.push({
        path: this.computedRoute.path,
        query: this.computedRoute.query,
        params: this.computedRoute.params
      }) : this.computedRoute.name && (this.computedRoute.replace ? this.$router.replace({
        name: this.computedRoute.name,
        query: this.computedRoute.query,
        params: this.computedRoute.params
      }) : this.$router.push({
        name: this.computedRoute.name,
        query: this.computedRoute.query,
        params: this.computedRoute.params
      }))), this.tabbar.getActiveValue(Object.assign({}, this.$props))));
    }
  }
}, li = ["disabled"], ri = { class: "mvi-tabbar-item-child" }, ni = ["textContent"];
function oi(e, t, s, r, n, i) {
  var c, d, h, m, p, w, C;
  const f = x("m-icon"), a = x("m-badge");
  return o(), u("div", {
    disabled: s.disabled || null,
    class: y(i.computedClass),
    style: b(i.computedStyle),
    onClick: t[0] || (t[0] = (...E) => i.setActive && i.setActive(...E))
  }, [
    D(a, {
      show: (c = s.badge) == null ? void 0 : c.show,
      class: "mvi-tabbar-badge",
      content: (d = s.badge) == null ? void 0 : d.content,
      background: (h = s.badge) == null ? void 0 : h.background,
      color: (m = s.badge) == null ? void 0 : m.color,
      dot: (p = s.badge) == null ? void 0 : p.dot,
      placement: (w = s.badge) == null ? void 0 : w.placement,
      offset: (C = s.badge) == null ? void 0 : C.offset
    }, {
      default: P(() => [
        v("div", ri, [
          i.iconType || i.iconUrl ? (o(), u("span", {
            key: 0,
            class: "mvi-tabbar-icon",
            style: b({ marginBottom: s.name ? "" : "0px" })
          }, [
            D(f, {
              type: i.iconType,
              url: i.iconUrl,
              spin: i.iconSpin,
              size: i.iconSize,
              color: i.iconColor
            }, null, 8, ["type", "url", "spin", "size", "color"])
          ], 4)) : g("", !0),
          v("span", {
            class: y(["mvi-tabbar-name", i.iconType || i.iconUrl ? "mvi-tabbar-name-small" : ""]),
            textContent: _(s.name)
          }, null, 10, ni)
        ])
      ]),
      _: 1
    }, 8, ["show", "content", "background", "color", "dot", "placement", "offset"])
  ], 14, li);
}
const ai = /* @__PURE__ */ T(si, [["render", oi], ["__scopeId", "data-v-603eda6e"]]);
const hi = {
  name: "m-tabbar",
  components: {
    "m-tabbar-item": ai
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
      default: !1
    },
    border: {
      type: Boolean,
      default: !1
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
      default: !0
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
      return (e) => {
        let t = {};
        return e != 0 && this.offset && (t.marginLeft = this.offset), t;
      };
    },
    tabbarStyle() {
      let e = {};
      return this.fixed && l.number.isNumber(this.zIndex) && (e.zIndex = this.zIndex), this.flex && (e.justifyContent = this.flex), e;
    }
  },
  methods: {
    getActiveValue(e) {
      this.$emit("update:modelValue", e.value), this.$emit("change", e);
    },
    itemClick(e) {
      this.$emit("item-click", e);
    }
  }
};
function ui(e, t, s, r, n, i) {
  const f = x("m-tabbar-item");
  return o(), u("div", {
    class: y(["mvi-tabbar", s.border ? "mvi-tabbar-border" : "", s.fixed ? "mvi-tabbar-fixed" : ""]),
    style: b(i.tabbarStyle)
  }, [
    (o(!0), u(A, null, O(s.tabs, (a, c) => (o(), I(f, {
      key: "tab-" + c,
      name: a.name,
      value: a.value,
      icon: a.icon,
      disabled: a.disabled,
      badge: a.badge,
      route: a.route,
      style: b(i.tabbarItemStyle(c))
    }, null, 8, ["name", "value", "icon", "disabled", "badge", "route", "style"]))), 128))
  ], 6);
}
const xe = /* @__PURE__ */ T(hi, [["render", ui], ["__scopeId", "data-v-6e0ba39e"]]);
xe.install = (e) => {
  e.component(xe.name, xe);
};
const di = {
  name: "m-image",
  data() {
    return {
      error: !1,
      loading: !0,
      lazySrc: "",
      lazying: !1,
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
      validator(e) {
        return [
          "fill",
          "cover",
          "contain",
          "response",
          "none"
        ].includes(e);
      }
    },
    alt: {
      type: String,
      default: ""
    },
    showError: {
      type: Boolean,
      default: !0
    },
    showLoading: {
      type: Boolean,
      default: !0
    },
    lazyLoad: {
      type: Boolean,
      default: !1
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
      default: !1
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
      let e = "image-alt";
      return l.common.isObject(this.loadIcon) ? typeof this.loadIcon.type == "string" && (e = this.loadIcon.type) : typeof this.loadIcon == "string" && (e = this.loadIcon), e;
    },
    loadIconUrl() {
      let e = null;
      return l.common.isObject(this.loadIcon) && typeof this.loadIcon.url == "string" && (e = this.loadIcon.url), e;
    },
    loadIconSpin() {
      let e = !1;
      return l.common.isObject(this.loadIcon) && typeof this.loadIcon.spin == "boolean" && (e = this.loadIcon.spin), e;
    },
    loadIconSize() {
      let e = null;
      return l.common.isObject(this.loadIcon) && typeof this.loadIcon.size == "string" && (e = this.loadIcon.size), e;
    },
    loadIconColor() {
      let e = null;
      return l.common.isObject(this.loadIcon) && typeof this.loadIcon.color == "string" && (e = this.loadIcon.color), e;
    },
    errorIconType() {
      let e = "image-error";
      return l.common.isObject(this.errorIcon) ? typeof this.errorIcon.type == "string" && (e = this.errorIcon.type) : typeof this.errorIcon == "string" && (e = this.errorIcon), e;
    },
    errorIconUrl() {
      let e = null;
      return l.common.isObject(this.errorIcon) && typeof this.errorIcon.url == "string" && (e = this.errorIcon.url), e;
    },
    errorIconSpin() {
      let e = !1;
      return l.common.isObject(this.errorIcon) && typeof this.errorIcon.spin == "boolean" && (e = this.errorIcon.spin), e;
    },
    errorIconSize() {
      let e = null;
      return l.common.isObject(this.errorIcon) && typeof this.errorIcon.size == "string" && (e = this.errorIcon.size), e;
    },
    errorIconColor() {
      let e = null;
      return l.common.isObject(this.errorIcon) && typeof this.errorIcon.color == "string" && (e = this.errorIcon.color), e;
    },
    imageStyle() {
      let e = {};
      return this.round && (e.borderRadius = "50%"), this.width && (e.width = this.width), this.height && (e.height = this.height), e;
    },
    imgClass() {
      return this.fit == "contain" ? "mvi-image-contain" : this.fit == "cover" ? "mvi-image-cover" : this.fit == "none" ? "mvi-image-none" : this.fit == "response" ? "mvi-image-response" : "mvi-image-fill";
    },
    computedSrc() {
      return this.lazyLoad ? this.lazySrc : this.src;
    }
  },
  components: {
    mIcon: M
  },
  watch: {
    computedSrc(e, t) {
      this.loading = !0;
    }
  },
  mounted() {
    this.lazyLoad && this.lazyloadFun();
  },
  methods: {
    lazyloadFun() {
      this.lazying = !0, this.spy = new nt(this.$el, {
        el: this.root,
        beforeEnter: (e) => {
          this.lazying = !1, this.lazySrc = this.src;
        }
      }), this.spy.init();
    },
    loadSuccess(e) {
      this.error = !1, this.loading = !1, this.$emit("success", e.target);
    },
    loadError(e) {
      this.loading = !1, this.error = !0, this.$emit("error", e.target);
    }
  },
  beforeUnmount() {
    this.spy && this.spy._setOff();
  }
}, ci = {
  key: 0,
  class: "mvi-image-loading"
}, fi = {
  key: 1,
  class: "mvi-image-error",
  ref: "error"
}, mi = ["src", "alt"];
function pi(e, t, s, r, n, i) {
  const f = x("m-icon");
  return o(), u("div", {
    class: "mvi-image",
    style: b(i.imageStyle)
  }, [
    (n.loading || n.lazying) && s.showLoading ? (o(), u("div", ci, [
      e.$slots.loading ? S(e.$slots, "loading", { key: 0 }, void 0, !0) : (o(), I(f, {
        key: 1,
        type: i.loadIconType,
        url: i.loadIconUrl,
        spin: i.loadIconSpin,
        size: i.loadIconSize,
        color: i.loadIconColor
      }, null, 8, ["type", "url", "spin", "size", "color"]))
    ])) : n.error && s.showError ? (o(), u("div", fi, [
      e.$slots.error ? S(e.$slots, "error", { key: 0 }, void 0, !0) : (o(), I(f, {
        key: 1,
        type: i.errorIconType,
        url: i.errorIconUrl,
        spin: i.errorIconSpin,
        size: i.errorIconSize,
        color: i.errorIconColor
      }, null, 8, ["type", "url", "spin", "size", "color"]))
    ], 512)) : g("", !0),
    v("img", {
      onLoad: t[0] || (t[0] = (...a) => i.loadSuccess && i.loadSuccess(...a)),
      onError: t[1] || (t[1] = (...a) => i.loadError && i.loadError(...a)),
      src: i.computedSrc,
      alt: s.showError ? "" : s.alt,
      class: y(i.imgClass)
    }, null, 42, mi)
  ], 4);
}
const de = /* @__PURE__ */ T(di, [["render", pi], ["__scopeId", "data-v-e765e27e"]]);
de.install = (e) => {
  e.component(de.name, de);
};
const gi = {
  name: "m-overlay",
  data() {
    return {
      overlayShow: !1,
      scrollTop: 0,
      scrollLeft: 0,
      overflowX: "",
      overflowY: "",
      paddingRight: 0,
      paddingBottom: 0,
      hasHorizontalScroll: !1,
      hasVerticalScroll: !1,
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
  inheritAttrs: !1,
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
      default: !1
    },
    fade: {
      type: Boolean,
      default: !0
    },
    timeout: {
      type: Number,
      default: 200,
      validator(e) {
        return e >= 0;
      }
    },
    closable: {
      type: Boolean,
      default: !1
    },
    usePadding: {
      type: Boolean,
      default: !1
    }
  },
  watch: {
    modelValue(e) {
      this.overlayShow = e;
    }
  },
  computed: {
    overlayStyle() {
      let e = {};
      return l.number.isNumber(this.zIndex) && (e.zIndex = this.zIndex), this.color && (e.background = this.color), e;
    },
    $$el() {
      return this.$refs.overlay;
    }
  },
  mounted() {
    this.overlayShow = this.modelValue;
  },
  methods: {
    beforeEnter(e) {
      this.fade && (e.style.transition = "opacity " + this.timeout + "ms", e.style.webkitTransition = "opacity " + this.timeout + "ms"), this.$emit("show", e), typeof this.overlayComponentWatch == "function" && this.overlayComponentWatch.apply(this, ["show", e]);
    },
    enter(e) {
      if (this.$$el.offsetParent) {
        if (this.offsetParent = this.$$el.offsetParent, l.element.getScrollHeight(this.offsetParent) > this.offsetParent.clientHeight) {
          if (this.usePadding) {
            let t = this.offsetParent.offsetWidth - this.offsetParent.clientWidth - parseFloat(
              l.element.getCssStyle(
                this.offsetParent,
                "border-right-width"
              )
            ) - parseFloat(
              l.element.getCssStyle(
                this.offsetParent,
                "border-left-width"
              )
            );
            this.paddingRight = parseFloat(
              l.element.getCssStyle(
                this.offsetParent,
                "padding-right"
              )
            ), this.offsetParent.style.setProperty(
              "padding-right",
              this.paddingRight + t + "px",
              "important"
            );
          }
          this.scrollTop = l.element.getScrollTop(
            this.offsetParent
          ), this.overflowY = l.element.getCssStyle(
            this.offsetParent,
            "overflow-y"
          ), this.offsetParent.style.setProperty(
            "overflow-y",
            "hidden",
            "important"
          ), this.$$el.style.top = this.scrollTop + "px", this.hasVerticalScroll = !0;
        }
        if (l.element.getScrollWidth(this.offsetParent) > this.offsetParent.clientWidth) {
          if (this.usePadding) {
            let t = this.offsetParent.offsetHeight - this.offsetParent.clientHeight - parseFloat(
              l.element.getCssStyle(
                this.offsetParent,
                "border-bottom-width"
              )
            ) - parseFloat(
              l.element.getCssStyle(
                this.offsetParent,
                "border-top-width"
              )
            );
            this.paddingBottom = parseFloat(
              l.element.getCssStyle(
                this.offsetParent,
                "padding-bottom"
              )
            ), this.offsetParent.style.setProperty(
              "padding-bottom",
              this.paddingBottom + t + "px",
              "important"
            );
          }
          this.scrollLeft = l.element.getScrollLeft(
            this.offsetParent
          ), this.overflowX = l.element.getCssStyle(
            this.offsetParent,
            "overflow-x"
          ), this.offsetParent.style.setProperty(
            "overflow-x",
            "hidden",
            "important"
          ), this.$$el.style.left = this.scrollLeft + "px", this.hasHorizontalScroll = !0;
        }
      }
      this.$emit("showing", e), typeof this.overlayComponentWatch == "function" && this.overlayComponentWatch.apply(this, ["showing", e]);
    },
    afterEnter(e) {
      this.fade && (e.style.transition = "", e.style.webkitTransition = ""), this.$emit("shown", e), typeof this.overlayComponentWatch == "function" && this.overlayComponentWatch.apply(this, ["shown", e]);
    },
    beforeLeave(e) {
      this.fade && (e.style.transition = "opacity " + this.timeout + "ms", e.style.webkitTransition = "opacity " + this.timeout + "ms"), this.$emit("hide", e), typeof this.overlayComponentWatch == "function" && this.overlayComponentWatch.apply(this, ["hide", e]);
    },
    leave(e) {
      this.$emit("hidding", e), typeof this.overlayComponentWatch == "function" && this.overlayComponentWatch.apply(this, ["hidding", e]);
    },
    afterLeave(e) {
      this.offsetParent && (this.hasVerticalScroll && (this.usePadding && this.offsetParent.style.setProperty(
        "padding-right",
        this.paddingRight + "px",
        "important"
      ), this.offsetParent.style.setProperty(
        "overflow-y",
        this.overflowY,
        "important"
      ), this.hasVerticalScroll = !1), this.hasHorizontalScroll && (this.usePadding && this.offsetParent.style.setProperty(
        "padding-bottom",
        this.paddingBottom + "px",
        "important"
      ), this.offsetParent.style.setProperty(
        "overflow-x",
        this.overflowX,
        "important"
      ), this.hasHorizontalScroll = !1)), this.fade && (e.style.transition = "", e.style.webkitTransition = ""), this.$emit("hidden", e), typeof this.overlayComponentWatch == "function" && this.overlayComponentWatch.apply(this, ["hidden", e]);
    },
    closeOverlay() {
      this.closable && this.$emit("update:modelValue", !1);
    }
  }
};
function yi(e, t, s, r, n, i) {
  return o(), I(at, {
    disabled: !s.mountEl,
    to: s.mountEl
  }, [
    D(G, {
      name: "mvi-overlay-fade",
      onBeforeEnter: i.beforeEnter,
      onEnter: i.enter,
      onAfterEnter: i.afterEnter,
      onBeforeLeave: i.beforeLeave,
      onLeave: i.leave,
      onAfterLeave: i.afterLeave
    }, {
      default: P(() => [
        B(v("div", oe({
          onClick: t[0] || (t[0] = ht((...f) => i.closeOverlay && i.closeOverlay(...f), ["self"])),
          ref: "overlay",
          class: "mvi-overlay",
          style: i.overlayStyle
        }, e.$attrs), [
          S(e.$slots, "default", {}, void 0, !0)
        ], 16), [
          [j, n.overlayShow]
        ])
      ]),
      _: 3
    }, 8, ["onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
  ], 8, ["disabled", "to"]);
}
const Q = /* @__PURE__ */ T(gi, [["render", yi], ["__scopeId", "data-v-decea5ed"]]);
Q.install = (e) => {
  e.component(Q.name, Q);
};
const bi = {
  name: "m-popup",
  data() {
    return {
      popupShow: !1,
      firstShow: !1
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
  inheritAttrs: !1,
  props: {
    mountEl: {
      type: String,
      default: null
    },
    showTimes: {
      type: Boolean,
      default: !1
    },
    timesPlacement: {
      type: String,
      default: "top-right",
      validator(e) {
        return [
          "top-right",
          "top-left",
          "bottom-right",
          "bottom-left"
        ].includes(e);
      }
    },
    timesIcon: {
      type: [String, Object],
      default: null
    },
    modelValue: {
      type: Boolean,
      default: !1
    },
    closable: {
      type: Boolean,
      default: !1
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
      validator(e) {
        return ["left", "top", "bottom", "right"].includes(e);
      }
    },
    round: {
      type: Boolean,
      default: !1
    },
    width: {
      type: String,
      default: null
    },
    usePadding: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    $$el() {
      return this.$refs.overlay.$$el;
    },
    iconType() {
      let e = "times";
      return l.common.isObject(this.timesIcon) ? typeof this.timesIcon.type == "string" && (e = this.timesIcon.type) : typeof this.timesIcon == "string" && (e = this.timesIcon), e;
    },
    iconUrl() {
      let e = null;
      return l.common.isObject(this.timesIcon) && typeof this.timesIcon.url == "string" && (e = this.timesIcon.url), e;
    },
    iconSpin() {
      let e = !1;
      return l.common.isObject(this.timesIcon) && typeof this.timesIcon.spin == "boolean" && (e = this.timesIcon.spin), e;
    },
    iconSize() {
      let e = null;
      return l.common.isObject(this.timesIcon) && typeof this.timesIcon.size == "string" && (e = this.timesIcon.size), e;
    },
    iconColor() {
      let e = null;
      return l.common.isObject(this.timesIcon) && typeof this.timesIcon.color == "string" && (e = this.timesIcon.color), e;
    },
    popupClass() {
      let e = ["mvi-popup", "mvi-popup-" + this.placement];
      return this.round && e.push("mvi-popup-round"), e;
    },
    popupStyle() {
      let e = {};
      return this.placement == "left" || this.placement == "right" ? this.width && (e.width = this.width) : (this.placement == "top" || this.placement == "bottom") && this.width && (e.height = this.width), this.showTimes && (this.timesPlacement == "top-left" || this.timesPlacement == "top-right" ? (e.flexDirection = "column", e.webkitFlexDirection = "column") : (this.timesPlacement == "bottom-left" || this.timesPlacement == "bottom-right") && (e.flexDirection = "column-reverse", e.webkitFlexDirection = "column-reverse")), this.popupColor && (e.backgroundColor = this.popupColor), this.color && (e.color = this.color), l.number.isNumber(this.zIndex) && (e.zIndex = this.zIndex + 10), e.transition = "all " + this.timeout + "ms", e.webkitTransition = "all " + this.timeout + "ms", e.msTransition = "all " + this.timeout + "ms", e.MozTransition = "all " + this.timeout + "ms", e;
    }
  },
  components: {
    mIcon: M,
    mOverlay: Q
  },
  methods: {
    overlayShow(e) {
      this.firstShow || (this.firstShow = !0), this.popupShow = !0;
    },
    overlayHide() {
      this.popupShow = !1;
    },
    hide(e) {
      this.closable && this.hidePopup(), this.$emit("overlay-click", e);
    },
    hidePopup() {
      this.$emit("update:modelValue", !1);
    },
    beforeEnter(e) {
      l.data.get(e, "mvi-popup-beforeEnter-trigger") || (l.data.set(e, "mvi-popup-beforeEnter-trigger", !0), this.$emit("show", e), typeof this.popupComponentWatch == "function" && this.popupComponentWatch.apply(this, ["show", e]));
    },
    enter(e) {
      l.data.get(e, "mvi-popup-enter-trigger") || (l.data.set(e, "mvi-popup-enter-trigger", !0), this.$emit("showing", e), typeof this.popupComponentWatch == "function" && this.popupComponentWatch.apply(this, ["showing", e]));
    },
    afterEnter(e) {
      this.$emit("shown", e), typeof this.popupComponentWatch == "function" && this.popupComponentWatch.apply(this, ["shown", e]);
    },
    beforeLeave(e) {
      l.data.remove(e, "mvi-popup-beforeEnter-trigger"), l.data.remove(e, "mvi-popup-enter-trigger"), this.$emit("hide", e), typeof this.popupComponentWatch == "function" && this.popupComponentWatch.apply(this, ["hide", e]);
    },
    leave(e) {
      this.$emit("hidding", e), typeof this.popupComponentWatch == "function" && this.popupComponentWatch.apply(this, ["hidding", e]);
    },
    afterLeave(e) {
      this.$emit("hidden", e), typeof this.popupComponentWatch == "function" && this.popupComponentWatch.apply(this, ["hidden", e]);
    }
  }
};
function vi(e, t, s, r, n, i) {
  const f = x("m-icon"), a = x("m-overlay");
  return o(), I(a, {
    ref: "overlay",
    "model-value": s.modelValue,
    onShow: i.overlayShow,
    onHide: i.overlayHide,
    "use-padding": s.usePadding,
    "z-index": s.zIndex,
    onClick: ht(i.hide, ["self"]),
    color: s.overlayColor || null,
    timeout: s.timeout,
    "mount-el": s.mountEl
  }, {
    default: P(() => [
      D(G, {
        name: "mvi-slide-" + s.placement,
        onBeforeEnter: i.beforeEnter,
        onEnter: i.enter,
        onAfterEnter: i.afterEnter,
        onBeforeLeave: i.beforeLeave,
        onLeave: i.leave,
        onAfterLeave: i.afterLeave
      }, {
        default: P(() => [
          n.firstShow ? B((o(), u("div", oe({
            key: 0,
            class: i.popupClass,
            style: i.popupStyle
          }, e.$attrs), [
            s.showTimes ? (o(), u("div", {
              key: 0,
              class: y(["mvi-popup-times", "mvi-popup-times-" + s.timesPlacement])
            }, [
              D(f, {
                onClick: i.hidePopup,
                type: i.iconType,
                url: i.iconUrl,
                spin: i.iconSpin,
                size: i.iconSize,
                color: i.iconColor
              }, null, 8, ["onClick", "type", "url", "spin", "size", "color"])
            ], 2)) : g("", !0),
            v("div", {
              class: y(["mvi-popup-content", s.showTimes ? "mvi-popup-content-padding" : ""])
            }, [
              S(e.$slots, "default", {}, void 0, !0)
            ], 2)
          ], 16)), [
            [j, n.popupShow]
          ]) : g("", !0)
        ]),
        _: 3
      }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
    ]),
    _: 3
  }, 8, ["model-value", "onShow", "onHide", "use-padding", "z-index", "onClick", "color", "timeout", "mount-el"]);
}
const se = /* @__PURE__ */ T(bi, [["render", vi], ["__scopeId", "data-v-54526092"]]);
se.install = (e) => {
  e.component(se.name, se);
};
const wi = {
  name: "m-checkbox",
  emits: ["update:modelValue", "change"],
  props: {
    disabled: {
      type: Boolean,
      default: !1
    },
    modelValue: {
      type: [Boolean, Array],
      default: !1
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
      validator(e) {
        return ["left", "right"].includes(e);
      }
    },
    round: {
      type: Boolean,
      default: !1
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
      if (this.disabled || !this.check)
        return null;
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.color == "string" && (e = this.icon.color), e;
    },
    iconSize() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.size == "string" && (e = this.icon.size), e;
    },
    iconType() {
      let e = "success";
      return l.common.isObject(this.icon) ? typeof this.icon.type == "string" && (e = this.icon.type) : typeof this.icon == "string" && (e = this.icon), e;
    },
    checkboxStyle() {
      let e = {};
      return !this.disabled && this.check && this.fillColor && (e.backgroundColor = this.fillColor, e.borderColor = this.fillColor), this.round && (e.borderRadius = "50%"), e;
    },
    labelStyle() {
      let e = {};
      return !this.disabled && this.labelColor && (e.color = this.labelColor), this.labelSize && (e.fontSize = this.labelSize), e;
    },
    check() {
      return typeof this.modelValue == "boolean" ? this.modelValue : Array.isArray(this.modelValue) ? this.modelValue.some((e) => l.common.equal(e, this.value)) : !1;
    }
  },
  components: {
    mIcon: M
  },
  methods: {
    change(e) {
      if (Array.isArray(this.modelValue)) {
        let t = [...this.modelValue];
        e.target.checked && !this.check ? t.push(this.value) : this.check && (t = t.filter((s) => !l.common.equal(s, this.value))), this.$emit("update:modelValue", t), this.$emit("change", t);
      } else
        typeof this.modelValue == "boolean" && (this.$emit("update:modelValue", e.target.checked), this.$emit("change", e.target.checked));
    }
  }
}, Ci = ["disabled"], xi = ["disabled", "data-placement", "textContent"], Ii = ["value", "disabled", "checked", "name"], Si = ["disabled"], _i = ["disabled", "data-placement", "textContent"];
function Ti(e, t, s, r, n, i) {
  const f = x("m-icon");
  return o(), u("label", {
    class: "mvi-checkbox",
    disabled: s.disabled || null
  }, [
    s.labelPlacement == "left" && s.label ? (o(), u("span", {
      key: 0,
      disabled: s.disabled || null,
      class: "mvi-checkbox-label",
      "data-placement": s.labelPlacement,
      textContent: _(s.label),
      style: b(i.labelStyle)
    }, null, 12, xi)) : g("", !0),
    v("input", {
      onChange: t[0] || (t[0] = (...a) => i.change && i.change(...a)),
      value: s.value,
      disabled: s.disabled || null,
      checked: i.check,
      type: "checkbox",
      name: s.name
    }, null, 40, Ii),
    v("span", {
      disabled: s.disabled || null,
      class: y(["mvi-checkbox-item", i.check ? "mvi-checkbox-item-check" : ""]),
      style: b(i.checkboxStyle)
    }, [
      D(f, {
        disabled: s.disabled || null,
        color: i.iconColor,
        size: i.iconSize,
        type: i.iconType,
        class: y(["mvi-checkbox-icon", i.check ? "mvi-checkbox-icon-check" : ""])
      }, null, 8, ["disabled", "color", "size", "type", "class"])
    ], 14, Si),
    s.labelPlacement == "right" && s.label ? (o(), u("span", {
      key: 1,
      disabled: s.disabled || null,
      class: "mvi-checkbox-label",
      "data-placement": s.labelPlacement,
      textContent: _(s.label),
      style: b(i.labelStyle)
    }, null, 12, _i)) : g("", !0)
  ], 8, Ci);
}
const le = /* @__PURE__ */ T(wi, [["render", Ti], ["__scopeId", "data-v-a0266ce2"]]);
le.install = (e) => {
  e.component(le.name, le);
};
const ki = {
  name: "m-radio",
  emits: ["update:modelValue", "change"],
  props: {
    value: {
      type: [Object, Number, String],
      default: ""
    },
    modelValue: {
      type: [Boolean, String, Number, Object],
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    label: {
      type: String,
      default: null
    },
    labelPlacement: {
      type: String,
      default: "right",
      validator(e) {
        return ["left", "right"].includes(e);
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
      default: !0
    },
    name: {
      type: String,
      default: null
    }
  },
  computed: {
    labelStyle() {
      let e = {};
      return !this.disabled && this.labelColor && (e.color = this.labelColor), this.labelSize && (e.fontSize = this.labelSize), e;
    },
    iconColor() {
      if (this.disabled || !this.check)
        return null;
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.color == "string" && (e = this.icon.color), e;
    },
    iconSize() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.size == "string" && (e = this.icon.size), e;
    },
    iconType() {
      let e = "success";
      return l.common.isObject(this.icon) ? typeof this.icon.type == "string" && (e = this.icon.type) : typeof this.icon == "string" && (e = this.icon), e;
    },
    radioStyle() {
      let e = {};
      return !this.disabled && this.check && this.fillColor && (e.backgroundColor = this.fillColor, e.borderColor = this.fillColor), this.round && (e.borderRadius = "50%"), e;
    },
    check() {
      return typeof this.modelValue == "boolean" ? this.modelValue : l.common.equal(this.modelValue, this.value);
    }
  },
  components: {
    mIcon: M
  },
  methods: {
    change(e) {
      typeof this.modelValue == "boolean" ? (this.$emit("update:modelValue", e.target.checked), this.$emit("change", e.target.checked)) : e.target.checked && (this.$emit("update:modelValue", this.value), this.$emit("change", this.value));
    }
  }
}, Di = ["disabled"], Pi = ["disabled", "data-placement", "textContent"], zi = ["value", "disabled", "checked", "name"], Ai = ["disabled"], Ei = ["disabled", "data-placement", "textContent"];
function Mi(e, t, s, r, n, i) {
  const f = x("m-icon");
  return o(), u("label", {
    disabled: s.disabled || null,
    class: "mvi-radio"
  }, [
    s.label && s.labelPlacement == "left" ? (o(), u("span", {
      key: 0,
      disabled: s.disabled || null,
      class: "mvi-radio-label",
      "data-placement": s.labelPlacement,
      textContent: _(s.label),
      style: b(i.labelStyle)
    }, null, 12, Pi)) : g("", !0),
    v("input", {
      onChange: t[0] || (t[0] = (...a) => i.change && i.change(...a)),
      value: s.value,
      disabled: s.disabled || null,
      checked: i.check,
      type: "radio",
      name: s.name
    }, null, 40, zi),
    v("span", {
      disabled: s.disabled || null,
      class: y(["mvi-radio-item", i.check ? "mvi-radio-item-check" : ""]),
      style: b(i.radioStyle)
    }, [
      D(f, {
        disabled: s.disabled || null,
        color: i.iconColor,
        size: i.iconSize,
        type: i.iconType,
        class: y(["mvi-radio-icon", i.check ? "mvi-radio-icon-check" : ""])
      }, null, 8, ["disabled", "color", "size", "type", "class"])
    ], 14, Ai),
    s.label && s.labelPlacement == "right" ? (o(), u("span", {
      key: 1,
      disabled: s.disabled || null,
      class: "mvi-radio-label",
      "data-placement": s.labelPlacement,
      textContent: _(s.label),
      style: b(i.labelStyle)
    }, null, 12, Ei)) : g("", !0)
  ], 8, Di);
}
const Ie = /* @__PURE__ */ T(ki, [["render", Mi], ["__scopeId", "data-v-acaed12c"]]);
Ie.install = (e) => {
  e.component(Ie.name, Ie);
};
const Bi = {
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
      validator(e) {
        return e == 0 || e == 1;
      }
    }
  },
  computed: {
    loadingStyle() {
      let e = {};
      return e.background = this.color, e.width = "calc(" + this.size + "/20)", e.height = "calc(" + this.size + "/4)", e.transformOrigin = "calc(" + this.size + "/40) calc(" + this.size + "/2)", e.webkitTransformOrigin = "calc(" + this.size + "/40) calc(" + this.size + "/2)", e;
    },
    loading2Style() {
      let e = {};
      return e.boxShadow = "0 calc(" + this.size + "/20) 0 0 " + this.color, e.webkitBoxShadow = "0 calc(" + this.size + "/20) 0 0 " + this.color, e.width = this.size, e.height = this.size, e.transformOrigin = "calc(" + this.size + "/2) calc(" + this.size + "2 + " + this.size + "/40)", e.webkitTransformOrigin = "calc(" + this.size + "/2) calc(" + this.size + "2 + " + this.size + "/40)", e;
    }
  }
};
function Oi(e, t, s, r, n, i) {
  return s.type == 0 ? (o(), u("div", {
    key: 0,
    class: "mvi-loading",
    style: b({ width: s.size, height: s.size })
  }, [
    (o(!0), u(A, null, O(new Array(12), (f, a) => (o(), u("div", {
      key: "mvi-loading-" + a,
      style: b(i.loadingStyle)
    }, null, 4))), 128))
  ], 4)) : s.type == 1 ? (o(), u("div", {
    key: 1,
    class: "mvi-loading2",
    style: b({ width: s.size, height: s.size })
  }, [
    v("div", {
      style: b(i.loading2Style)
    }, null, 4)
  ], 4)) : g("", !0);
}
const te = /* @__PURE__ */ T(Bi, [["render", Oi], ["__scopeId", "data-v-5a047d18"]]);
const Hi = {
  name: "m-picker",
  data() {
    return {
      offsets: [],
      startY: 0,
      startY2: 0,
      time: 0,
      oldActives: [],
      amounts: 0,
      mouseDown: !1,
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
      default: !0
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
      default: !1
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
    computedOptions(e) {
      this.init();
    }
  },
  computed: {
    computedHeight() {
      if (this.selectHeight.includes("px"))
        return parseFloat(this.selectHeight);
      if (this.selectHeight.includes("rem"))
        return l.element.rem2px(parseFloat(this.selectHeight));
    },
    loadingStyle() {
      let e = {};
      return e.height = `calc(${l.number.mutiply(
        this.computedHeight,
        this.visibleCounts
      )}px + 0.88rem)`, e;
    },
    contentStyle() {
      let e = {};
      return e.height = `${l.number.mutiply(
        this.computedHeight,
        this.visibleCounts
      )}px`, e;
    },
    computedOptions() {
      let e = [];
      return Array.isArray(this.options) ? e = this.options : e = [this.options], e;
    },
    columnStyle() {
      return (e, t) => {
        let s = {};
        return s.transform = `translate3d(0,${this.offsets[t] || 0}px,0)`, s.webkitTransform = `translate3d(0,${this.offsets[t] || 0}px,0)`, s;
      };
    },
    actives() {
      let e = [];
      for (let t = 0; t < this.offsets.length; t++)
        e.push({
          index: this.getActive(this.offsets[t]),
          value: this.computedOptions[t].values[this.getActive(this.offsets[t])]
        });
      return e;
    },
    maskStyle() {
      let e = {};
      return this.selectHeight && (e.backgroundSize = "100% " + l.number.mutiply(
        this.computedHeight,
        l.number.divide(this.visibleCounts - 1, 2)
      ) + "px"), e;
    }
  },
  components: {
    mLoading: te
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  mounted() {
    this.init(), l.event.on(
      document.body,
      `mousemove.picker_${this.uid}`,
      this.mousemove
    ), l.event.on(
      document.body,
      `mouseup.picker_${this.uid} mouseleave.picker_${this.uid}`,
      this.mouseup
    );
  },
  methods: {
    init() {
      this.offsets = [];
      for (let e = 0; e < this.computedOptions.length; e++)
        this.offsets.push(
          this.getOffset(this.computedOptions[e].defaultIndex || 0)
        );
    },
    crisis(e) {
      let t = l.number.divide(this.visibleCounts - 1, 2);
      t = l.number.mutiply(t, this.computedHeight);
      let s = -l.number.divide(this.visibleCounts - 1, 2);
      return s = l.number.mutiply(s, this.computedHeight), s += l.number.mutiply(
        this.visibleCounts - this.computedOptions[e].values.length,
        this.computedHeight
      ), {
        max: t,
        min: s
      };
    },
    getActive(e) {
      let t = Math.abs(
        l.number.divide(
          e - l.number.mutiply(
            l.number.divide(this.visibleCounts - 1, 2),
            this.computedHeight
          ),
          this.computedHeight
        )
      );
      return Math.round(t);
    },
    getOffset(e) {
      return l.number.mutiply(
        l.number.subtract(
          l.number.divide(this.visibleCounts - 1, 2),
          e
        ),
        this.computedHeight
      );
    },
    doConfirm() {
      this.actives.length == 1 ? this.$emit("confirm", this.actives[0]) : this.$emit("confirm", this.actives);
    },
    doCancel() {
      this.init(), this.actives.length == 1 ? this.$emit("cancel", this.actives[0]) : this.$emit("cancel", this.actives);
    },
    addTransition(e, t) {
      return new Promise((s) => {
        this.itemRefs[e].style.transition = "all " + t + "ms ease-out", this.itemRefs[e].style.webkitTransition = "all " + t + "ms ease-out", setTimeout(() => {
          s();
        }, 10);
      });
    },
    removeTransition(e) {
      return new Promise((t) => {
        this.itemRefs[e].style.transition = "", this.itemRefs[e].style.webkitTransition = "", setTimeout(() => {
          t();
        }, 10);
      });
    },
    touchstart(e, t) {
      this.startY = e.targetTouches[0].pageY, this.startY2 = this.startY, this.time = Date.now(), this.oldActives = this.actives, this.amounts = 0, this.columnIndex = t, this.StartTimeStamp = Date.now();
    },
    mousedown(e, t) {
      this.startY = e.pageY, this.startY2 = this.startY, this.time = Date.now(), this.oldActives = this.actives, this.amounts = 0, this.mouseDown = !0, this.columnIndex = t, this.StartTimeStamp = Date.now();
    },
    touchmove(e) {
      e.cancelable && e.preventDefault();
      let t = e.targetTouches[0].pageY, s = t - this.startY, r = t - this.startY2;
      if (this.offsets[this.columnIndex] >= this.crisis(this.columnIndex).max && r > 0) {
        this.amounts += 5, this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + s / this.amounts;
        return;
      }
      if (this.offsets[this.columnIndex] <= this.crisis(this.columnIndex).min && r < 0) {
        this.amounts += 5, this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + s / this.amounts;
        return;
      }
      this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + s, this.startY = t;
    },
    mousemove(e) {
      if (!this.mouseDown)
        return;
      e.cancelable && e.preventDefault();
      let t = e.pageY, s = t - this.startY, r = t - this.startY2;
      if (this.offsets[this.columnIndex] >= this.crisis(this.columnIndex).max && r > 0) {
        this.amounts += 5, this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + s / this.amounts;
        return;
      }
      if (this.offsets[this.columnIndex] <= this.crisis(this.columnIndex).min && r < 0) {
        this.amounts += 5, this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + s / this.amounts;
        return;
      }
      this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + s, this.startY = t;
    },
    touchend(e) {
      this.endTimeStamp = Date.now();
      let t = e.changedTouches[0].pageY - this.startY2, s = this.endTimeStamp - this.StartTimeStamp;
      s < 300 && Math.abs(t) > this.computedHeight ? this.addTransition(this.columnIndex, 1e3).then(() => (t > 0 ? this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + l.element.rem2px(10) * s / 1e3 : this.offsets[this.columnIndex] = this.offsets[this.columnIndex] - l.element.rem2px(10) * s / 1e3, this.addTransition(this.columnIndex, 300))).then(() => {
        this.endDeal(t, 300);
      }) : this.addTransition(this.columnIndex, 300).then(() => {
        this.endDeal(t, 300);
      });
    },
    mouseup(e) {
      if (!this.mouseDown)
        return;
      this.mouseDown = !1, this.endTimeStamp = Date.now();
      let t = e.pageY - this.startY2, s = this.endTimeStamp - this.StartTimeStamp;
      s < 300 && Math.abs(t) > this.computedHeight ? this.addTransition(this.columnIndex, 1e3).then(() => (t > 0 ? this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + l.element.rem2px(10) * s / 1e3 : this.offsets[this.columnIndex] = this.offsets[this.columnIndex] - l.element.rem2px(10) * s / 1e3, this.addTransition(this.columnIndex, 300))).then(() => {
        this.endDeal(t, 300);
      }) : this.addTransition(this.columnIndex, 300).then(() => {
        this.endDeal(t, 300);
      });
    },
    endDeal(e, t) {
      if (e > 0)
        if (this.offsets[this.columnIndex] >= this.crisis(this.columnIndex).max)
          this.offsets[this.columnIndex] = this.crisis(
            this.columnIndex
          ).max;
        else {
          let s = this.getActive(this.offsets[this.columnIndex]);
          this.offsets[this.columnIndex] = this.getOffset(s);
        }
      else if (this.offsets[this.columnIndex] <= this.crisis(this.columnIndex).min)
        this.offsets[this.columnIndex] = this.crisis(
          this.columnIndex
        ).min;
      else {
        let s = this.getActive(this.offsets[this.columnIndex]);
        this.offsets[this.columnIndex] = this.getOffset(s);
      }
      if (this.actives.length == 1)
        this.actives[0].index != this.oldActives[0].index && this.$emit("change", {
          columnIndex: this.columnIndex,
          selected: this.actives[0]
        });
      else {
        let s = !0;
        for (let r = 0; r < this.oldActives.length; r++)
          this.oldActives[r].index != this.actives[r].index && (s = !1);
        s || this.$emit("change", {
          columnIndex: this.columnIndex,
          selected: this.actives
        });
      }
      setTimeout(() => {
        this.removeTransition(this.columnIndex);
      }, t);
    },
    contentTouchMove(e) {
      e.cancelable && e.preventDefault();
    }
  },
  beforeUnmount() {
    l.event.off(
      document.body,
      `mousemove.picker_${this.uid} mouseup.picker_${this.uid}`
    );
  }
}, Vi = { class: "mvi-picker" }, $i = {
  key: 1,
  class: "mvi-picker-toolbar"
}, ji = ["textContent"], Wi = ["textContent"], Fi = ["textContent"], Ri = ["onTouchstart", "onMousedown"], Yi = ["textContent"];
function Ni(e, t, s, r, n, i) {
  const f = x("m-loading");
  return o(), u("div", Vi, [
    s.loading ? (o(), u("div", {
      key: 0,
      class: "mvi-picker-loading",
      style: b(i.loadingStyle)
    }, [
      D(f, {
        size: "0.5rem",
        color: "#ddd"
      })
    ], 4)) : g("", !0),
    s.showToolbar && !s.loading ? (o(), u("div", $i, [
      v("div", {
        class: y(["mvi-picker-toolbar-cancel", s.cancelClass || ""]),
        textContent: _(s.cancelText),
        onClick: t[0] || (t[0] = (...a) => i.doCancel && i.doCancel(...a))
      }, null, 10, ji),
      s.title ? (o(), u("div", {
        key: 0,
        class: y(["mvi-picker-toolbar-title", s.titleClass || ""]),
        textContent: _(s.title)
      }, null, 10, Wi)) : g("", !0),
      v("div", {
        class: y(["mvi-picker-toolbar-confirm", s.confirmClass || ""]),
        textContent: _(s.confirmText),
        onClick: t[1] || (t[1] = (...a) => i.doConfirm && i.doConfirm(...a))
      }, null, 10, Fi)
    ])) : g("", !0),
    s.loading ? g("", !0) : (o(), u("div", {
      key: 2,
      class: "mvi-picker-content",
      style: b(i.contentStyle),
      ref: "content",
      onTouchmove: t[4] || (t[4] = (...a) => i.contentTouchMove && i.contentTouchMove(...a))
    }, [
      (o(!0), u(A, null, O(i.computedOptions, (a, c) => (o(), u("div", {
        key: "picker-column-" + c,
        class: y(["mvi-picker-items", a.className || ""]),
        ref_for: !0,
        ref: (d) => n.itemRefs[c] = d,
        style: b(i.columnStyle(a, c)),
        onTouchstart: (d) => i.touchstart(d, c),
        onTouchmove: t[2] || (t[2] = (...d) => i.touchmove && i.touchmove(...d)),
        onTouchend: t[3] || (t[3] = (...d) => i.touchend && i.touchend(...d)),
        onMousedown: (d) => i.mousedown(d, c)
      }, [
        (o(!0), u(A, null, O(a.values, (d, h) => (o(), u("div", {
          class: "mvi-picker-item",
          key: "picker-item-" + h,
          textContent: _(d),
          style: b({ height: s.selectHeight || "" })
        }, null, 12, Yi))), 128))
      ], 46, Ri))), 128)),
      v("div", {
        class: "mvi-picker-active",
        style: b({ height: s.selectHeight || "" })
      }, null, 4),
      v("div", {
        class: "mvi-picker-mask",
        style: b(i.maskStyle)
      }, null, 4)
    ], 36))
  ]);
}
const ce = /* @__PURE__ */ T(Hi, [["render", Ni], ["__scopeId", "data-v-14863308"]]);
const Li = {
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
        let e = new Date();
        return e.setFullYear(1970), e.setMonth(0), e.setDate(1), e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0), e;
      }
    },
    endDate: {
      type: Date,
      default: function() {
        let e = new Date();
        return e.setFullYear(2099), e.setMonth(11), e.setDate(31), e.setHours(23), e.setMinutes(59), e.setSeconds(59), e.setMilliseconds(999), e;
      }
    },
    mode: {
      type: String,
      default: "date",
      validator(e) {
        return ["date", "datetime", "time", "month", "year"].includes(
          e
        );
      }
    },
    showToolbar: {
      type: Boolean,
      default: !0
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
      default: !1
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
      let e = [], t = this.startDate.getFullYear(), s = this.endDate.getFullYear();
      for (let r = t; r <= s; r++)
        e.push({
          year: r,
          yearFormat: `${r}\u5E74`,
          current: r == this.selectedDate.getFullYear()
        });
      return e;
    },
    monthArray() {
      let e = [];
      if (this.selectedDate.getFullYear() == this.startDate.getFullYear()) {
        let t = this.startDate.getMonth() + 1, s = 12;
        this.selectedDate.getFullYear() == this.endDate.getFullYear() && (s = this.endDate.getMonth() + 1);
        for (let r = t; r <= s; r++)
          e.push({
            month: r,
            monthFormat: `${r}\u6708`,
            current: r == this.selectedDate.getMonth() + 1
          });
      } else if (this.selectedDate.getFullYear() == this.endDate.getFullYear()) {
        let t = this.endDate.getMonth() + 1;
        for (let s = 1; s <= t; s++)
          e.push({
            month: s,
            monthFormat: `${s}\u6708`,
            current: s == this.selectedDate.getMonth() + 1
          });
      } else
        for (let t = 1; t <= 12; t++)
          e.push({
            month: t,
            monthFormat: `${t}\u6708`,
            current: t == this.selectedDate.getMonth() + 1
          });
      return e;
    },
    dayArray() {
      let e = l.date.getDays(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth() + 1
      ), t = [];
      if (this.selectedDate.getFullYear() == this.startDate.getFullYear() && this.selectedDate.getMonth() == this.startDate.getMonth()) {
        let s = this.startDate.getDate(), r = e;
        this.selectedDate.getFullYear() == this.endDate.getFullYear() && this.selectedDate.getMonth() == this.endDate.getMonth() && (r = this.endDate.getDate());
        for (let n = s; n <= r; n++)
          t.push({
            day: n,
            dayFormat: `${n}\u65E5`,
            current: n == this.selectedDate.getDate()
          });
      } else if (this.selectedDate.getFullYear() == this.endDate.getFullYear() && this.selectedDate.getMonth() == this.endDate.getMonth()) {
        let s = this.endDate.getDate();
        for (let r = 1; r <= s; r++)
          t.push({
            day: r,
            dayFormat: `${r}\u65E5`,
            current: r == this.selectedDate.getDate()
          });
      } else
        for (let s = 1; s <= e; s++)
          t.push({
            day: s,
            dayFormat: `${s}\u65E5`,
            current: s == this.selectedDate.getDate()
          });
      return t;
    },
    hourArray() {
      let e = [];
      if (this.selectedDate.getFullYear() == this.startDate.getFullYear() && this.selectedDate.getMonth() == this.startDate.getMonth() && this.selectedDate.getDate() == this.startDate.getDate()) {
        let t = this.startDate.getHours(), s = 23;
        this.selectedDate.getFullYear() == this.endDate.getFullYear() && this.selectedDate.getMonth() == this.endDate.getMonth() && this.selectedDate.getDate() == this.endDate.getDate() && (s = this.endDate.getHours());
        for (let r = t; r <= s; r++)
          e.push({
            hour: r,
            hourFormat: `${r < 10 ? "0" + r : r}\u65F6`,
            current: this.selectedDate.getHours() == r
          });
      } else if (this.selectedDate.getFullYear() == this.endDate.getFullYear() && this.selectedDate.getMonth() == this.endDate.getMonth() && this.selectedDate.getDate() == this.endDate.getDate()) {
        let t = this.endDate.getHours();
        for (let s = 0; s <= t; s++)
          e.push({
            hour: s,
            hourFormat: `${s < 10 ? "0" + s : s}\u65F6`,
            current: this.selectedDate.getHours() == s
          });
      } else
        for (let t = 0; t <= 23; t++)
          e.push({
            hour: t,
            hourFormat: `${t < 10 ? "0" + t : t}\u65F6`,
            current: this.selectedDate.getHours() == t
          });
      return e;
    },
    minArray() {
      let e = [];
      if (this.selectedDate.getFullYear() == this.startDate.getFullYear() && this.selectedDate.getMonth() == this.startDate.getMonth() && this.selectedDate.getDate() == this.startDate.getDate() && this.selectedDate.getHours() == this.startDate.getHours()) {
        let t = this.startDate.getMinutes(), s = 59;
        this.selectedDate.getFullYear() == this.endDate.getFullYear() && this.selectedDate.getMonth() == this.endDate.getMonth() && this.selectedDate.getDate() == this.endDate.getDate() && this.selectedDate.getHours() == this.endDate.getHours() && (s = this.endDate.getMinutes());
        for (let r = t; r <= s; r++)
          e.push({
            min: r,
            minFormat: `${r < 10 ? "0" + r : r}\u5206`,
            current: this.selectedDate.getMinutes() == r
          });
      } else if (this.selectedDate.getFullYear() == this.endDate.getFullYear() && this.selectedDate.getMonth() == this.endDate.getMonth() && this.selectedDate.getDate() == this.endDate.getDate() && this.selectedDate.getHours() == this.endDate.getHours()) {
        let t = this.endDate.getMinutes();
        for (let s = 0; s <= t; s++)
          e.push({
            min: s,
            minFormat: `${s < 10 ? "0" + s : s}\u5206`,
            current: this.selectedDate.getMinutes() == s
          });
      } else
        for (let t = 0; t <= 59; t++)
          e.push({
            min: t,
            minFormat: `${t < 10 ? "0" + t : t}\u5206`,
            current: this.selectedDate.getMinutes() == t
          });
      return e;
    },
    pickerOptions() {
      let e = [], t = 0;
      this.yearArray.forEach((h, m) => {
        e.push(h.yearFormat), h.current && (t = m);
      });
      let s = [], r = 0;
      this.monthArray.forEach((h, m) => {
        s.push(h.monthFormat), h.current && (r = m);
      });
      let n = [], i = 0;
      this.dayArray.forEach((h, m) => {
        n.push(h.dayFormat), h.current && (i = m);
      });
      let f = [], a = 0;
      this.hourArray.forEach((h, m) => {
        f.push(h.hourFormat), h.current && (a = m);
      });
      let c = [], d = 0;
      if (this.minArray.forEach((h, m) => {
        c.push(h.minFormat), h.current && (d = m);
      }), this.mode == "date")
        return [
          {
            values: e,
            defaultIndex: t
          },
          {
            values: s,
            defaultIndex: r
          },
          {
            values: n,
            defaultIndex: i
          }
        ];
      if (this.mode == "year")
        return {
          values: e,
          defaultIndex: t
        };
      if (this.mode == "month")
        return [
          {
            values: e,
            defaultIndex: t
          },
          {
            values: s,
            defaultIndex: r
          }
        ];
      if (this.mode == "datetime")
        return [
          {
            values: e,
            defaultIndex: t
          },
          {
            values: s,
            defaultIndex: r
          },
          {
            values: n,
            defaultIndex: i
          },
          {
            values: f,
            defaultIndex: a
          },
          {
            values: c,
            defaultIndex: d
          }
        ];
      if (this.mode == "time")
        return [
          {
            values: f,
            defaultIndex: a
          },
          {
            values: c,
            defaultIndex: d
          }
        ];
    },
    selectedDate: {
      set(e) {
        this.$emit("update:modelValue", e), this.$emit("change", e);
      },
      get() {
        return this.modelValue instanceof Date ? this.modelValue.getTime() < this.startDate.getTime() ? this.startDate : this.modelValue.getTime() > this.endDate.getTime() ? this.endDate : this.modelValue : new Date();
      }
    }
  },
  components: {
    mPicker: ce
  },
  methods: {
    dateChange(e) {
      if (this.mode == "date") {
        if (e.columnIndex == 0) {
          let t = this.yearArray[e.selected[0].index].year;
          this.selectedDate = new Date(
            this.selectedDate.setFullYear(t)
          ), this.equalEndYear && (this.selectedDate.getMonth() > this.endDate.getMonth() && (this.selectedDate = new Date(
            this.selectedDate.setMonth(
              this.endDate.getMonth()
            )
          )), this.equalEndMonth && this.selectedDate.getDate() > this.endDate.getDate() && (this.selectedDate = new Date(
            this.selectedDate.setDate(
              this.endDate.getDate()
            )
          ))), this.equalStartYear && (this.selectedDate.getMonth() < this.startDate.getMonth() && (this.selectedDate = new Date(
            this.selectedDate.setMonth(
              this.startDate.getMonth()
            )
          )), this.equalStartMonth && this.selectedDate.getDate() < this.startDate.getDate() && (this.selectedDate = new Date(
            this.selectedDate.setDate(
              this.startDate.getDate()
            )
          )));
        } else if (e.columnIndex == 1) {
          let t = this.monthArray[e.selected[1].index].month, s = l.date.getDays(
            this.selectedDate.getFullYear(),
            t
          );
          this.selectedDate.getDate() > s && this.selectedDate.setDate(s), this.selectedDate = new Date(
            this.selectedDate.setMonth(t - 1)
          ), this.equalEndYear && this.equalEndMonth && this.selectedDate.getDate() > this.endDate.getDate() && (this.selectedDate = new Date(
            this.selectedDate.setDate(
              this.endDate.getDate()
            )
          )), this.equalStartYear && this.equalStartMonth && this.selectedDate.getDate() < this.startDate.getDate() && (this.selectedDate = new Date(
            this.selectedDate.setDate(
              this.startDate.getDate()
            )
          ));
        } else if (e.columnIndex == 2) {
          let t = this.dayArray[e.selected[2].index].day;
          this.selectedDate = new Date(this.selectedDate.setDate(t));
        }
      } else if (this.mode == "month") {
        if (e.columnIndex == 0) {
          let t = this.yearArray[e.selected[0].index].year;
          this.selectedDate = new Date(
            this.selectedDate.setFullYear(t)
          ), this.equalEndYear && (this.selectedDate.getMonth() > this.endDate.getMonth() && (this.selectedDate = new Date(
            this.selectedDate.setMonth(
              this.endDate.getMonth()
            )
          )), this.equalEndMonth && this.selectedDate.getDate() > this.endDate.getDate() && (this.selectedDate = new Date(
            this.selectedDate.setDate(
              this.endDate.getDate()
            )
          ))), this.equalStartYear && (this.selectedDate.getMonth() < this.startDate.getMonth() && (this.selectedDate = new Date(
            this.selectedDate.setMonth(
              this.startDate.getMonth()
            )
          )), this.equalStartMonth && this.selectedDate.getDate() < this.startDate.getDate() && (this.selectedDate = new Date(
            this.selectedDate.setDate(
              this.startDate.getDate()
            )
          )));
        } else if (e.columnIndex == 1) {
          let t = this.monthArray[e.selected[1].index].month, s = l.date.getDays(
            this.selectedDate.getFullYear(),
            t
          );
          this.selectedDate.getDate() > s && this.selectedDate.setDate(s), this.selectedDate = new Date(
            this.selectedDate.setMonth(t - 1)
          ), this.equalEndYear && this.equalEndMonth && this.selectedDate.getDate() > this.endDate.getDate() && (this.selectedDate = new Date(
            this.selectedDate.setDate(
              this.endDate.getDate()
            )
          )), this.equalStartYear && this.equalStartMonth && this.selectedDate.getDate() < this.startDate.getDate() && (this.selectedDate = new Date(
            this.selectedDate.setDate(
              this.startDate.getDate()
            )
          ));
        }
      } else if (this.mode == "year") {
        if (e.columnIndex == 0) {
          let t = this.yearArray[e.selected.index].year;
          this.selectedDate = new Date(
            this.selectedDate.setFullYear(t)
          ), this.equalEndYear && (this.selectedDate.getMonth() > this.endDate.getMonth() && (this.selectedDate = new Date(
            this.selectedDate.setMonth(
              this.endDate.getMonth()
            )
          )), this.equalEndMonth && this.selectedDate.getDate() > this.endDate.getDate() && (this.selectedDate = new Date(
            this.selectedDate.setDate(
              this.endDate.getDate()
            )
          ))), this.equalStartYear && (this.selectedDate.getMonth() < this.startDate.getMonth() && (this.selectedDate = new Date(
            this.selectedDate.setMonth(
              this.startDate.getMonth()
            )
          )), this.equalStartMonth && this.selectedDate.getDate() < this.startDate.getDate() && (this.selectedDate = new Date(
            this.selectedDate.setDate(
              this.startDate.getDate()
            )
          )));
        }
      } else if (this.mode == "datetime") {
        if (e.columnIndex == 0) {
          let t = this.yearArray[e.selected[0].index].year;
          this.selectedDate = new Date(
            this.selectedDate.setFullYear(t)
          ), this.equalEndYear && (this.selectedDate.getMonth() > this.endDate.getMonth() && (this.selectedDate = new Date(
            this.selectedDate.setMonth(
              this.endDate.getMonth()
            )
          )), this.equalEndMonth && (this.selectedDate.getDate() > this.endDate.getDate() && (this.selectedDate = new Date(
            this.selectedDate.setDate(
              this.endDate.getDate()
            )
          )), this.equalEndDay && (this.selectedDate.getHours() > this.endDate.getHours() && (this.selectedDate = new Date(
            this.selectedDate.setHours(
              this.endDate.getHours()
            )
          )), this.equalEndHour && this.selectedDate.getMinutes() > this.endDate.getMinutes() && (this.selectedDate = new Date(
            this.selectedDate.setMinutes(
              this.endDate.getMinutes()
            )
          ))))), this.equalStartYear && (this.selectedDate.getMonth() < this.startDate.getMonth() && (this.selectedDate = new Date(
            this.selectedDate.setMonth(
              this.startDate.getMonth()
            )
          )), this.equalStartMonth && (this.selectedDate.getDate() < this.startDate.getDate() && (this.selectedDate = new Date(
            this.selectedDate.setDate(
              this.startDate.getDate()
            )
          )), this.equalStartDay && (this.selectedDate.getHours() < this.startDate.getHours() && (this.selectedDate = new Date(
            this.selectedDate.setHours(
              this.startDate.getHours()
            )
          )), this.equalStartHour && this.selectedDate.getMinutes() < this.startDate.getMinutes() && (this.selectedDate = new Date(
            this.selectedDate.setMinutes(
              this.startDate.getMinutes()
            )
          )))));
        } else if (e.columnIndex == 1) {
          let t = this.monthArray[e.selected[1].index].month, s = l.date.getDays(
            this.selectedDate.getFullYear(),
            t
          );
          this.selectedDate.getDate() > s && this.selectedDate.setDate(s), this.selectedDate = new Date(
            this.selectedDate.setMonth(t - 1)
          ), this.equalEndYear && this.equalEndMonth && (this.selectedDate.getDate() > this.endDate.getDate() && (this.selectedDate = new Date(
            this.selectedDate.setDate(
              this.endDate.getDate()
            )
          )), this.equalEndDay && (this.selectedDate.getHours() > this.endDate.getHours() && (this.selectedDate = new Date(
            this.selectedDate.setHours(
              this.endDate.getHours()
            )
          )), this.equalEndHour && this.selectedDate.getMinutes() > this.endDate.getMinutes() && (this.selectedDate = new Date(
            this.selectedDate.setMinutes(
              this.endDate.getMinutes()
            )
          )))), this.equalStartYear && this.equalStartMonth && (this.selectedDate.getDate() < this.startDate.getDate() && (this.selectedDate = new Date(
            this.selectedDate.setDate(
              this.startDate.getDate()
            )
          )), this.equalStartDay && (this.selectedDate.getHours() < this.startDate.getHours() && (this.selectedDate = new Date(
            this.selectedDate.setHours(
              this.startDate.getHours()
            )
          )), this.equalStartHour && this.selectedDate.getMinutes() < this.startDate.getMinutes() && (this.selectedDate = new Date(
            this.selectedDate.setMinutes(
              this.startDate.getMinutes()
            )
          ))));
        } else if (e.columnIndex == 2) {
          let t = this.dayArray[e.selected[2].index].day;
          this.selectedDate = new Date(this.selectedDate.setDate(t)), this.equalEndYear && this.equalEndMonth && this.equalEndDay && (this.selectedDate.getHours() > this.endDate.getHours() && (this.selectedDate = new Date(
            this.selectedDate.setHours(
              this.endDate.getHours()
            )
          )), this.equalEndHour && this.selectedDate.getMinutes() > this.endDate.getMinutes() && (this.selectedDate = new Date(
            this.selectedDate.setMinutes(
              this.endDate.getMinutes()
            )
          ))), this.equalStartYear && this.equalStartMonth && this.equalStartDay && (this.selectedDate.getHours() < this.startDate.getHours() && (this.selectedDate = new Date(
            this.selectedDate.setHours(
              this.startDate.getHours()
            )
          )), this.equalStartHour && this.selectedDate.getMinutes() < this.startDate.getMinutes() && (this.selectedDate = new Date(
            this.selectedDate.setMinutes(
              this.startDate.getMinutes()
            )
          )));
        } else if (e.columnIndex == 3) {
          let t = this.hourArray[e.selected[3].index].hour;
          this.selectedDate = new Date(
            this.selectedDate.setHours(t)
          ), this.equalEndYear && this.equalEndMonth && this.equalEndDay && this.equalEndHour && this.selectedDate.getMinutes() > this.endDate.getMinutes() && (this.selectedDate = new Date(
            this.selectedDate.setMinutes(
              this.endDate.getMinutes()
            )
          )), this.equalStartYear && this.equalStartMonth && this.equalStartDay && this.equalStartHour && this.selectedDate.getMinutes() < this.startDate.getMinutes() && (this.selectedDate = new Date(
            this.selectedDate.setMinutes(
              this.startDate.getMinutes()
            )
          ));
        } else if (e.columnIndex == 4) {
          let t = this.minArray[e.selected[4].index].min;
          this.selectedDate = new Date(
            this.selectedDate.setMinutes(t)
          );
        }
      } else if (this.mode == "time") {
        if (e.columnIndex == 0) {
          let t = this.hourArray[e.selected[0].index].hour;
          this.selectedDate = new Date(
            this.selectedDate.setHours(t)
          ), this.equalEndYear && this.equalEndMonth && this.equalEndDay && this.equalEndHour && this.selectedDate.getMinutes() > this.endDate.getMinutes() && (this.selectedDate = new Date(
            this.selectedDate.setMinutes(
              this.endDate.getMinutes()
            )
          )), this.equalStartYear && this.equalStartMonth && this.equalStartDay && this.equalStartHour && this.selectedDate.getMinutes() < this.startDate.getMinutes() && (this.selectedDate = new Date(
            this.selectedDate.setMinutes(
              this.startDate.getMinutes()
            )
          ));
        } else if (e.columnIndex == 1) {
          let t = this.minArray[e.selected[1].index].min;
          this.selectedDate = new Date(
            this.selectedDate.setMinutes(t)
          );
        }
      }
    },
    bindConfirm() {
      let e = this.selectedDate.getFullYear(), t = this.selectedDate.getMonth() + 1, s = this.selectedDate.getDate(), r = this.selectedDate.getHours(), n = this.selectedDate.getMinutes();
      if (this.mode == "date") {
        let i = e + "/" + (t < 10 ? "0" + t : t) + "/" + (s < 10 ? "0" + s : s), f = e + "-" + (t < 10 ? "0" + t : t) + "-" + (s < 10 ? "0" + s : s);
        this.$emit("confirm", {
          year: e,
          month: t,
          date: s,
          value: this.selectedDate,
          iosFormat: i,
          format: f
        });
      } else if (this.mode == "datetime") {
        let i = e + "/" + (t < 10 ? "0" + t : t) + "/" + (s < 10 ? "0" + s : s) + " " + (r < 10 ? "0" + r : r) + ":" + (n < 10 ? "0" + n : n), f = e + "-" + (t < 10 ? "0" + t : t) + "-" + (s < 10 ? "0" + s : s) + " " + (r < 10 ? "0" + r : r) + ":" + (n < 10 ? "0" + n : n);
        this.$emit("confirm", {
          year: e,
          month: t,
          date: s,
          hour: r,
          minute: n,
          value: this.selectedDate,
          iosFormat: i,
          format: f
        });
      } else if (this.mode == "time") {
        let i = (r < 10 ? "0" + r : r) + ":" + (n < 10 ? "0" + n : n);
        this.$emit("confirm", {
          hour: r,
          minute: n,
          value: this.selectedDate,
          format: i
        });
      } else if (this.mode == "year")
        this.$emit("confirm", {
          year: e,
          value: this.selectedDate
        });
      else if (this.mode == "month") {
        let i = e + "/" + (t < 10 ? "0" + t : t), f = e + "-" + (t < 10 ? "0" + t : t);
        this.$emit("confirm", {
          year: e,
          month: t,
          value: this.selectedDate,
          iosFormat: i,
          format: f
        });
      }
    },
    bindCancel() {
      let e = this.selectedDate.getFullYear(), t = this.selectedDate.getMonth() + 1, s = this.selectedDate.getDate(), r = this.selectedDate.getHours(), n = this.selectedDate.getMinutes();
      if (this.mode == "date") {
        let i = e + "/" + (t < 10 ? "0" + t : t) + "/" + (s < 10 ? "0" + s : s), f = e + "-" + (t < 10 ? "0" + t : t) + "-" + (s < 10 ? "0" + s : s);
        this.$emit("cancel", {
          year: e,
          month: t,
          date: s,
          value: this.selectedDate,
          iosFormat: i,
          format: f
        });
      } else if (this.mode == "datetime") {
        let i = e + "/" + (t < 10 ? "0" + t : t) + "/" + (s < 10 ? "0" + s : s) + " " + (r < 10 ? "0" + r : r) + ":" + (n < 10 ? "0" + n : n), f = e + "-" + (t < 10 ? "0" + t : t) + "-" + (s < 10 ? "0" + s : s) + " " + (r < 10 ? "0" + r : r) + ":" + (n < 10 ? "0" + n : n);
        this.$emit("cancel", {
          year: e,
          month: t,
          date: s,
          hour: r,
          minute: n,
          value: this.selectedDate,
          iosFormat: i,
          format: f
        });
      } else if (this.mode == "time") {
        let i = (r < 10 ? "0" + r : r) + ":" + (n < 10 ? "0" + n : n);
        this.$emit("cancel", {
          hour: r,
          minute: n,
          value: this.selectedDate,
          format: i
        });
      } else if (this.mode == "year")
        this.$emit("cancel", {
          year: e,
          value: this.selectedDate
        });
      else if (this.mode == "month") {
        let i = e + "/" + (t < 10 ? "0" + t : t), f = e + "-" + (t < 10 ? "0" + t : t);
        this.$emit("cancel", {
          year: e,
          month: t,
          value: this.selectedDate,
          iosFormat: i,
          format: f
        });
      }
    }
  }
}, Ui = { class: "mvi-date-picker" };
function Xi(e, t, s, r, n, i) {
  const f = x("m-picker");
  return o(), u("div", Ui, [
    D(f, {
      options: i.pickerOptions,
      "show-toolbar": s.showToolbar,
      title: s.title,
      "title-class": s.titleClass,
      "confirm-text": s.confirmText,
      "cancel-text": s.cancelText,
      "confirm-class": s.confirmClass,
      "cancel-class": s.cancelClass,
      loading: s.loading,
      "visible-counts": s.visibleCounts,
      "select-height": s.selectHeight,
      onChange: i.dateChange,
      onConfirm: i.bindConfirm,
      onCancel: i.bindCancel
    }, null, 8, ["options", "show-toolbar", "title", "title-class", "confirm-text", "cancel-text", "confirm-class", "cancel-class", "loading", "visible-counts", "select-height", "onChange", "onConfirm", "onCancel"])
  ]);
}
const Se = /* @__PURE__ */ T(Li, [["render", Xi], ["__scopeId", "data-v-ab781944"]]);
Se.install = (e) => {
  e.component(Se.name, Se);
};
const qi = {
  name: "m-date-native-picker",
  emits: ["update:modelValue", "error", "change"],
  props: {
    type: {
      type: String,
      default: "date",
      validator(e) {
        return ["date", "datetime", "month", "time"].includes(e);
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
      return this.type == "datetime" ? "datetime-local" : this.type;
    }
  },
  data() {
    return {
      ios: l.platform.os().ios
    };
  },
  methods: {
    trigger() {
      this.ios ? this.$el.focus() : this.$el.click();
    },
    selectDateForIOS() {
      if (this.ios) {
        let e = this.dateParse(this.$el.value);
        if (e) {
          if (this.min) {
            let t = this.min.getTime();
            if (e.getTime() < t) {
              this.$emit("error", "\u9009\u62E9\u7684\u65F6\u95F4\u5C0F\u4E8E\u9650\u5B9A\u6700\u5C0F\u65F6\u95F4");
              return;
            }
          }
          if (this.max) {
            let t = this.max.getTime();
            if (e.getTime() > t) {
              this.$emit("error", "\u9009\u62E9\u7684\u65F6\u95F4\u5927\u4E8E\u9650\u5B9A\u6700\u5927\u65F6\u95F4");
              return;
            }
          }
        }
        this.$emit("update:modelValue", e), this.$emit("change", e);
      }
    },
    selectDateForAndroid() {
      if (!this.ios) {
        let e = this.dateParse(this.$el.value);
        if (e) {
          if (this.min) {
            let t = this.min.getTime();
            if (e.getTime() < t) {
              this.$emit("error", "\u9009\u62E9\u7684\u65F6\u95F4\u5C0F\u4E8E\u9650\u5B9A\u6700\u5C0F\u65F6\u95F4");
              return;
            }
          }
          if (this.max) {
            let t = this.max.getTime();
            if (e.getTime() > t) {
              this.$emit("error", "\u9009\u62E9\u7684\u65F6\u95F4\u5927\u4E8E\u9650\u5B9A\u6700\u5927\u65F6\u95F4");
              return;
            }
          }
        }
        this.$emit("update:modelValue", e), this.$emit("change", e);
      }
    },
    dateParse(e) {
      if (e) {
        if (this.type == "date") {
          let t = this.dateParseDate(e), s = new Date();
          return s.setFullYear(t.year), s.setMonth(t.month - 1), s.setDate(t.date), s;
        } else if (this.type == "datetime") {
          let t = e.split("T"), s = this.dateParseDate(t[0]), r = this.dateParseTime(t[1]), n = new Date();
          return n.setFullYear(s.year), n.setMonth(s.month - 1), n.setDate(s.date), n.setHours(r.hour), n.setMinutes(r.min), n;
        } else if (this.type == "month") {
          let t = this.dateParseDate(e), s = new Date();
          return s.setFullYear(t.year), s.setMonth(t.month - 1), s;
        } else if (this.type == "time") {
          let t = this.dateParseTime(e), s = new Date();
          return s.setHours(t.hour), s.setMinutes(t.min), s;
        }
      } else
        return null;
    },
    dateParseTime(e) {
      let t = e.split(":"), s = t[0], r = t[1];
      return {
        hour: s,
        min: r
      };
    },
    dateParseDate(e) {
      let t = e.split("-"), s = Number(t[0]), r = Number(t[1]), n = Number(t[2]);
      return {
        year: s,
        month: r,
        date: n
      };
    }
  }
}, Gi = ["type"];
function Zi(e, t, s, r, n, i) {
  return o(), u("input", {
    onBlur: t[0] || (t[0] = (...f) => i.selectDateForIOS && i.selectDateForIOS(...f)),
    onChange: t[1] || (t[1] = (...f) => i.selectDateForAndroid && i.selectDateForAndroid(...f)),
    class: "mvi-date-native-picker",
    type: i.dateType
  }, null, 40, Gi);
}
const fe = /* @__PURE__ */ T(qi, [["render", Zi], ["__scopeId", "data-v-d8aa96be"]]);
fe.install = (e) => {
  e.component(fe.name, fe);
};
const Ki = {
  name: "m-input",
  data() {
    return {
      focus: !1
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
      validator(e) {
        return ["left", "center", "right"].includes(e);
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
      validator(e) {
        return ["medium", "large"].includes(e);
      }
    },
    border: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    required: {
      type: Boolean,
      default: !1
    },
    clearable: {
      type: Boolean,
      default: !1
    },
    autofocus: {
      type: Boolean,
      default: !1
    },
    showWordLimit: {
      type: Boolean,
      default: !1
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
      default: !1,
      validator(e) {
        return !(l.common.isObject(e) && l.number.isNumber(e.minRows) && l.number.isNumber(e.maxRows) && e.minRows > e.maxRows);
      }
    },
    inputAlign: {
      type: String,
      default: "left",
      validator(e) {
        return ["left", "center", "right"].includes(e);
      }
    },
    inputMode: {
      type: [String, Boolean],
      default: !1,
      validator(e) {
        return [
          !1,
          "none",
          "text",
          "decimal",
          "numeric",
          "tel",
          "search",
          "email",
          "url"
        ].includes(e);
      }
    }
  },
  computed: {
    showClear() {
      return this.disabled || this.readonly ? !1 : this.focus ? this.realValue !== "" : !1;
    },
    leftIconType() {
      let e = null;
      return l.common.isObject(this.leftIcon) ? typeof this.leftIcon.type == "string" && (e = this.leftIcon.type) : typeof this.leftIcon == "string" && (e = this.leftIcon), e;
    },
    leftIconUrl() {
      let e = null;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.url == "string" && (e = this.leftIcon.url), e;
    },
    leftIconSpin() {
      let e = !1;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.spin == "boolean" && (e = this.leftIcon.spin), e;
    },
    leftIconSize() {
      let e = null;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.size == "string" && (e = this.leftIcon.size), e;
    },
    leftIconColor() {
      let e = null;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.color == "string" && (e = this.leftIcon.color), e;
    },
    rightIconType() {
      let e = null;
      return l.common.isObject(this.rightIcon) ? typeof this.rightIcon.type == "string" && (e = this.rightIcon.type) : typeof this.rightIcon == "string" && (e = this.rightIcon), e;
    },
    rightIconUrl() {
      let e = null;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.url == "string" && (e = this.rightIcon.url), e;
    },
    rightIconSpin() {
      let e = !1;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.spin == "boolean" && (e = this.rightIcon.spin), e;
    },
    rightIconSize() {
      let e = null;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.size == "string" && (e = this.rightIcon.size), e;
    },
    rightIconColor() {
      let e = null;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.color == "string" && (e = this.rightIcon.color), e;
    },
    realDate: {
      set(e) {
        this.$emit("update:date", e);
      },
      get() {
        return this.date;
      }
    },
    realValue: {
      set(e) {
        this.modelValue !== e && this.$emit("update:modelValue", e);
      },
      get() {
        let e = this.modelValue === null ? "" : this.modelValue.toString();
        return this.isDatePicker ? e = this.getDateValue() : (this.type == "number" && (e = e.replace(/\D/g, "")), this.maxlength > 0 && e.length > this.maxlength && (e = e.substr(0, this.maxlength))), this.modelValue !== e && this.$emit("update:modelValue", e), e;
      }
    },
    inputType() {
      let e = "text";
      return this.isDatePicker || this.type == "number" ? e = "text" : e = this.type, e;
    },
    computedInputMode() {
      let e = !1;
      return typeof this.inputMode == "string" && (e = this.inputMode), e;
    },
    dateType() {
      let e = "date";
      return this.isDatePicker && (e = this.type), e;
    },
    isDatePicker() {
      return ["date", "datetime", "month", "time"].includes(this.type);
    },
    rowsFilter() {
      let e = this.rows;
      return l.common.isObject(this.autosize) && (l.number.isNumber(this.autosize.minRows) && this.rows < this.autosize.minRows && (e = this.autosize.minRows), l.number.isNumber(this.autosize.maxRows) && this.rows > this.autosize.maxRows && (e = this.autosize.maxRows)), e;
    },
    labelStyle() {
      let e = {};
      return this.labelWidth && (e.width = this.labelWidth), this.labelAlign && (this.labelAlign == "left" ? e.justifyContent = "flex-start" : this.labelAlign == "right" ? e.justifyContent = "flex-end" : e.justifyContent = this.labelAlign), this.labelOffset && (e.marginRight = this.labelOffset), e;
    },
    inputStyle() {
      let e = {};
      return this.inputAlign && (e.textAlign = this.inputAlign), e;
    },
    textareaStyle() {
      let e = {};
      return this.inputAlign && (e.textAlign = this.inputAlign), e;
    }
  },
  components: {
    mIcon: M,
    mDateNativePicker: fe
  },
  mounted() {
    this.$refs.textarea && (this.setMaxMinHeight(), (this.autosize == !0 || l.common.isObject(this.autosize)) && this.autosizeSet());
  },
  watch: {
    realValue(e) {
      this.$refs.textarea && (this.autosize == !0 || l.common.isObject(this.autosize)) && this.autosizeSet();
    },
    rows(e) {
      this.$refs.textarea && this.setMaxMinHeight();
    },
    autosize(e) {
      this.$refs.textarea && this.setMaxMinHeight();
    },
    showClear(e) {
      this.$nextTick(() => {
        this.$refs.textarea && (this.autosize == !0 || l.common.isObject(this.autosize)) && this.autosizeSet();
      });
    }
  },
  methods: {
    getFocus(e) {
      this.disabled || (this.$emit("focus", this.realValue), setTimeout(() => {
        this.focus = !0;
      }, 200));
    },
    getBlur(e) {
      this.disabled || (this.$emit("blur", this.realValue), setTimeout(() => {
        this.focus = !1;
      }, 200));
    },
    leftClick() {
      this.disabled || this.$emit("left-click", this.realValue);
    },
    rightClick() {
      this.disabled || this.$emit("right-click", this.realValue);
    },
    doClearValue() {
      this.disabled || !this.clearable || (this.realValue = "", this.type == "textarea" ? this.$refs.textarea.focus() : this.isDatePicker ? this.realDate = null : this.$refs.input.focus(), this.$emit("clear", ""));
    },
    input(e) {
      this.disabled || this.$emit("input", this.realValue);
    },
    autosizeSet() {
      this.$refs.textarea.style.height = "auto", this.$refs.textarea.scrollTop = 0, this.$refs.textarea.style.height = l.element.getScrollHeight(this.$refs.textarea) + "px";
    },
    rows2Height(e) {
      let t = Math.floor(
        parseFloat(
          l.element.getCssStyle(this.$refs.textarea, "line-height")
        )
      );
      return e * t;
    },
    setMaxMinHeight() {
      if (l.common.isObject(this.autosize)) {
        if (l.number.isNumber(this.autosize.maxRows)) {
          let e = this.rows2Height(this.autosize.maxRows);
          this.$refs.textarea.style.maxHeight = e + "px";
        }
        if (l.number.isNumber(this.autosize.minRows)) {
          let e = this.rows2Height(this.autosize.minRows);
          this.$refs.textarea.style.minHeight = e + "px";
        }
      } else
        this.$refs.textarea.style.maxHeight = "", this.$refs.textarea.style.minHeight = "";
    },
    callDate() {
      this.isDatePicker && !this.disabled && !this.readonly && this.$refs.datepicker.trigger();
    },
    getDateValue() {
      if (this.date instanceof Date)
        if (this.dateType == "date") {
          let e = this.date.getFullYear(), t = this.date.getMonth() + 1 < 10 ? "0" + (this.date.getMonth() + 1) : this.date.getMonth() + 1, s = this.date.getDate() < 10 ? "0" + this.date.getDate() : this.date.getDate();
          return this.format == "yyyy\u5E74mm\u6708dd\u65E5" ? e + "\u5E74" + t + "\u6708" + s + "\u65E5" : this.format == "yyyy/mm/dd" ? e + "/" + t + "/" + s : this.format == "yyyy.mm.dd" ? e + "." + t + "." + s : e + "-" + t + "-" + s;
        } else if (this.dateType == "datetime") {
          let e = this.date.getFullYear(), t = this.date.getMonth() + 1 < 10 ? "0" + (this.date.getMonth() + 1) : this.date.getMonth() + 1, s = this.date.getDate() < 10 ? "0" + this.date.getDate() : this.date.getDate(), r = this.date.getHours() < 10 ? "0" + this.date.getHours() : this.date.getHours(), n = this.date.getMinutes() < 10 ? "0" + this.date.getMinutes() : this.date.getMinutes();
          return this.format == "yyyy\u5E74MM\u6708dd\u65E5hh\u65F6mm\u5206" ? e + "\u5E74" + t + "\u6708" + s + "\u65E5" + r + "\u65F6" + n + "\u5206" : this.format == "yyyy\u5E74MM\u6708dd\u65E5 hh:mm" ? e + "\u5E74" + t + "\u6708" + s + "\u65E5 " + r + ":" + n : this.format == "yyyy/MM/dd hh:mm" ? e + "/" + t + "/" + s + " " + r + ":" + n : this.format == "yyyy.MM.dd hh:mm" ? e + "." + t + "." + s + " " + r + ":" + n : e + "-" + t + "-" + s + " " + r + ":" + n;
        } else if (this.dateType == "month") {
          let e = this.date.getFullYear(), t = this.date.getMonth() + 1 < 10 ? "0" + (this.date.getMonth() + 1) : this.date.getMonth() + 1;
          return this.format == "yyyy\u5E74mm\u6708" ? e + "\u5E74" + t + "\u6708" : this.format == "yyyy/mm" ? e + "/" + t : this.format == "yyyy.mm" ? e + "." + t : e + "-" + t;
        } else if (this.dateType == "time") {
          let e = this.date.getHours() < 10 ? "0" + this.date.getHours() : this.date.getHours(), t = this.date.getMinutes() < 10 ? "0" + this.date.getMinutes() : this.date.getMinutes();
          return this.format == "hh\u65F6mm\u5206" ? e + "\u65F6" + t + "\u5206" : e + ":" + t;
        } else
          return "";
      else
        return "";
    }
  }
}, Ji = ["disabled", "data-type"], Qi = ["textContent"], es = ["placeholder", "maxlength", "disabled", "readonly", "autofocus", "rows", "name"], ts = ["type", "inputmode", "placeholder", "maxlength", "disabled", "readonly", "autofocus", "name"], is = {
  key: 6,
  class: "mvi-input-words"
};
function ss(e, t, s, r, n, i) {
  const f = x("m-icon"), a = x("m-date-native-picker");
  return o(), u("div", {
    disabled: s.disabled || null,
    class: y([
      "mvi-input-container",
      "mvi-input-container-" + s.size,
      s.border ? "mvi-input-border" : "",
      s.showWordLimit && s.maxlength > 0 ? "mvi-input-container-words" : "",
      s.required ? "mvi-input-required" : ""
    ]),
    "data-type": s.type == "textarea" ? "textarea" : "input"
  }, [
    e.$slots.left || i.leftIconUrl || i.leftIconType ? (o(), u("div", {
      key: 0,
      onClick: t[0] || (t[0] = (...c) => i.leftClick && i.leftClick(...c)),
      class: "mvi-input-left-icon"
    }, [
      e.$slots.left ? S(e.$slots, "left", { key: 0 }, void 0, !0) : i.leftIconUrl || i.leftIconType ? (o(), I(f, {
        key: 1,
        type: i.leftIconType,
        url: i.leftIconUrl,
        spin: i.leftIconSpin,
        size: i.leftIconSize,
        color: i.leftIconColor
      }, null, 8, ["type", "url", "spin", "size", "color"])) : g("", !0)
    ])) : g("", !0),
    s.label ? (o(), u("div", {
      key: 1,
      class: y(["mvi-input-label", s.labelClass || ""]),
      style: b(i.labelStyle)
    }, [
      v("span", {
        textContent: _(s.label)
      }, null, 8, Qi)
    ], 6)) : g("", !0),
    s.type == "textarea" ? B((o(), u("textarea", {
      key: 2,
      placeholder: s.placeholder,
      maxlength: s.maxlength,
      disabled: s.disabled || null,
      readonly: s.readonly || null,
      autofocus: s.autofocus,
      class: "mvi-textarea",
      "onUpdate:modelValue": t[1] || (t[1] = (c) => i.realValue = c),
      onInput: t[2] || (t[2] = (...c) => i.input && i.input(...c)),
      ref: "textarea",
      rows: i.rowsFilter,
      name: s.name,
      style: b(i.textareaStyle),
      onFocus: t[3] || (t[3] = (...c) => i.getFocus && i.getFocus(...c)),
      onBlur: t[4] || (t[4] = (...c) => i.getBlur && i.getBlur(...c)),
      autocomplete: "off"
    }, null, 44, es)), [
      [J, i.realValue]
    ]) : B((o(), u("input", {
      key: 3,
      type: i.inputType,
      inputmode: i.computedInputMode,
      placeholder: s.placeholder,
      maxlength: i.isDatePicker ? -1 : s.maxlength,
      disabled: s.disabled || null,
      readonly: s.readonly || i.isDatePicker || null,
      autofocus: s.autofocus,
      class: "mvi-input",
      "onUpdate:modelValue": t[5] || (t[5] = (c) => i.realValue = c),
      onClick: t[6] || (t[6] = (...c) => i.callDate && i.callDate(...c)),
      onInput: t[7] || (t[7] = (...c) => i.input && i.input(...c)),
      ref: "input",
      name: s.name,
      style: b(i.inputStyle),
      onFocus: t[8] || (t[8] = (...c) => i.getFocus && i.getFocus(...c)),
      onBlur: t[9] || (t[9] = (...c) => i.getBlur && i.getBlur(...c)),
      autocomplete: "off"
    }, null, 44, ts)), [
      [we, i.realValue]
    ]),
    s.clearable ? B((o(), u("div", {
      key: 4,
      onClick: t[10] || (t[10] = (...c) => i.doClearValue && i.doClearValue(...c)),
      class: "mvi-input-clear-icon"
    }, [
      D(f, { type: "times-o" })
    ], 512)), [
      [j, i.showClear]
    ]) : g("", !0),
    e.$slots.right || i.rightIconUrl || i.rightIconType ? (o(), u("div", {
      key: 5,
      onClick: t[11] || (t[11] = (...c) => i.rightClick && i.rightClick(...c)),
      class: "mvi-input-right-icon"
    }, [
      e.$slots.right ? S(e.$slots, "right", { key: 0 }, void 0, !0) : i.rightIconUrl || i.rightIconType ? (o(), I(f, {
        key: 1,
        ref: "rightIcon",
        type: i.rightIconType,
        url: i.rightIconUrl,
        spin: i.rightIconSpin,
        size: i.rightIconSize,
        color: i.rightIconColor
      }, null, 8, ["type", "url", "spin", "size", "color"])) : g("", !0)
    ])) : g("", !0),
    s.showWordLimit && s.maxlength > 0 ? (o(), u("div", is, _(i.realValue.length) + "/" + _(s.maxlength), 1)) : g("", !0),
    i.isDatePicker ? (o(), I(a, {
      key: 7,
      ref: "datepicker",
      type: i.dateType,
      modelValue: i.realDate,
      "onUpdate:modelValue": t[12] || (t[12] = (c) => i.realDate = c)
    }, null, 8, ["type", "modelValue"])) : g("", !0)
  ], 10, Ji);
}
const _e = /* @__PURE__ */ T(Ki, [["render", ss], ["__scopeId", "data-v-28df5142"]]);
_e.install = (e) => {
  e.component(_e.name, _e);
};
const ls = {
  name: "m-modal",
  data() {
    return {
      modalShow: !1,
      firstShow: !1
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
  inheritAttrs: !1,
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
      default: !1
    },
    timesIcon: {
      type: [String, Object],
      default: null
    },
    modelValue: {
      type: Boolean,
      default: !1
    },
    timeout: {
      type: Number,
      default: 200
    },
    closable: {
      type: Boolean,
      default: !1
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
      default: !0
    },
    contentPadding: {
      type: Boolean,
      default: !0
    },
    headerPadding: {
      type: Boolean,
      default: !0
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
      default: !1
    },
    usePadding: {
      type: Boolean,
      default: !1
    },
    fullScreen: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    $$el() {
      return this.$refs.overlay.$$el;
    },
    iconType() {
      let e = "times";
      return l.common.isObject(this.timesIcon) ? typeof this.timesIcon.type == "string" && (e = this.timesIcon.type) : typeof this.timesIcon == "string" && (e = this.timesIcon), e;
    },
    iconUrl() {
      let e = null;
      return l.common.isObject(this.timesIcon) && typeof this.timesIcon.url == "string" && (e = this.timesIcon.url), e;
    },
    iconSpin() {
      let e = !1;
      return l.common.isObject(this.timesIcon) && typeof this.timesIcon.spin == "boolean" && (e = this.timesIcon.spin), e;
    },
    iconSize() {
      let e = null;
      return l.common.isObject(this.timesIcon) && typeof this.timesIcon.size == "string" && (e = this.timesIcon.size), e;
    },
    iconColor() {
      let e = null;
      return l.common.isObject(this.timesIcon) && typeof this.timesIcon.color == "string" && (e = this.timesIcon.color), e;
    },
    modalStyle() {
      let e = {};
      return e.zIndex = this.zIndex + 10, e;
    },
    wrapperStyle() {
      let e = {};
      return this.radius && (e.borderRadius = this.radius), this.modalColor && (e.background = this.modalColor), this.color && (e.color = this.color), e.transition = "all " + this.timeout + "ms", e.webkitTransition = "all " + this.timeout + "ms", e;
    },
    titleCls() {
      let e = ["mvi-modal-title"];
      return this.titleEllipsis && e.push("mvi-modal-title-ellipsis"), this.titleClass && e.push(this.titleClass), e;
    },
    headerStyle() {
      let e = {};
      return (this.$slots.default || this.content) && (e.paddingBottom = "0"), this.headerPadding || (e.padding = "0"), e;
    }
  },
  components: {
    mIcon: M,
    mOverlay: Q
  },
  watch: {
    fullScreen(e) {
      this.modalSize();
    }
  },
  methods: {
    modalSize() {
      this.fullScreen ? (this.$refs.modal.style.width = this.$refs.overlay.$$el.offsetParent.offsetWidth + "px", this.$refs.wrapper.style.height = this.$refs.overlay.$$el.offsetParent.offsetHeight + "px", this.$refs.wrapper.style.maxHeight = "") : (this.width ? this.$refs.modal.style.width = this.width : this.$refs.modal.style.width = "", this.$refs.wrapper.style.maxHeight = this.$refs.overlay.$$el.offsetParent.offsetHeight * 0.96 + "px", this.$refs.wrapper.style.height = "");
    },
    overlayShow(e) {
      this.firstShow || (this.firstShow = !0), this.modalShow = !0;
    },
    overlayHide() {
      this.modalShow = !1;
    },
    hide() {
      this.closable && this.hideModal();
    },
    hideModal() {
      this.$emit("update:modelValue", !1);
    },
    beforeEnter(e) {
      l.data.get(e, "mvi-modal-beforeEnter-trigger") || (l.data.set(e, "mvi-modal-beforeEnter-trigger", !0), this.$emit("show", e), typeof this.modalComponentWatch == "function" && this.modalComponentWatch.apply(this, ["show", e]));
    },
    enter(e) {
      l.data.get(e, "mvi-modal-enter-trigger") || (l.data.set(e, "mvi-modal-enter-trigger", !0), this.modalSize(), this.$emit("showing", e), typeof this.modalComponentWatch == "function" && this.modalComponentWatch.apply(this, ["showing", e]));
    },
    afterEnter(e) {
      this.$emit("shown", e), typeof this.modalComponentWatch == "function" && this.modalComponentWatch.apply(this, ["shown", e]);
    },
    beforeLeave(e) {
      l.data.remove(e, "mvi-modal-beforeEnter-trigger"), l.data.remove(e, "mvi-modal-enter-trigger"), this.$emit("hide", e), typeof this.modalComponentWatch == "function" && this.modalComponentWatch.apply(this, ["hide", e]);
    },
    leave(e) {
      this.$emit("hidding", e), typeof this.modalComponentWatch == "function" && this.modalComponentWatch.apply(this, ["hidding", e]);
    },
    afterLeave(e) {
      this.$emit("hidden", e), typeof this.modalComponentWatch == "function" && this.modalComponentWatch.apply(this, ["hidden", e]);
    }
  }
}, rs = ["innerHTML"], ns = ["innerHTML"], os = ["innerHTML"];
function as(e, t, s, r, n, i) {
  const f = x("m-icon"), a = x("m-overlay");
  return o(), I(a, {
    ref: "overlay",
    "model-value": s.modelValue,
    onShow: i.overlayShow,
    onHide: i.overlayHide,
    "use-padding": s.usePadding,
    "z-index": s.zIndex,
    onClick: ht(i.hide, ["self"]),
    color: s.overlayColor,
    timeout: s.timeout,
    "mount-el": s.mountEl
  }, {
    default: P(() => [
      v("div", {
        ref: "modal",
        class: "mvi-modal",
        style: b(i.modalStyle)
      }, [
        D(G, {
          name: "mvi-modal-" + s.animation,
          onBeforeEnter: i.beforeEnter,
          onEnter: i.enter,
          onAfterEnter: i.afterEnter,
          onBeforeLeave: i.beforeLeave,
          onLeave: i.leave,
          onAfterLeave: i.afterLeave
        }, {
          default: P(() => [
            n.firstShow ? B((o(), u("div", oe({
              key: 0,
              class: "mvi-modal-wrapper",
              ref: "wrapper",
              style: i.wrapperStyle
            }, e.$attrs), [
              s.showTimes && (i.iconType || i.iconUrl) ? (o(), u("div", {
                key: 0,
                class: "mvi-modal-times",
                onClick: t[0] || (t[0] = (...c) => i.hideModal && i.hideModal(...c))
              }, [
                D(f, {
                  type: i.iconType,
                  url: i.iconUrl,
                  spin: i.iconSpin,
                  size: i.iconSize,
                  color: i.iconColor
                }, null, 8, ["type", "url", "spin", "size", "color"])
              ])) : g("", !0),
              e.$slots.title || s.title ? (o(), u("div", {
                key: 1,
                ref: "header",
                class: y(i.titleCls),
                style: b(i.headerStyle)
              }, [
                e.$slots.title ? S(e.$slots, "title", { key: 0 }, void 0, !0) : s.title ? (o(), u("span", {
                  key: 1,
                  innerHTML: s.title
                }, null, 8, rs)) : g("", !0)
              ], 6)) : g("", !0),
              e.$slots.default || s.content ? (o(), u("div", {
                key: 2,
                ref: "content",
                class: y(["mvi-modal-content", s.contentClass || ""]),
                style: b({ padding: s.contentPadding ? "" : "0" })
              }, [
                e.$slots.default ? S(e.$slots, "default", { key: 0 }, void 0, !0) : s.content ? (o(), u("span", {
                  key: 1,
                  innerHTML: s.content
                }, null, 8, ns)) : g("", !0)
              ], 6)) : g("", !0),
              e.$slots.footer || s.footer ? (o(), u("div", {
                key: 3,
                ref: "footer",
                class: y(["mvi-modal-footer", s.footerClass || ""]),
                style: b({ padding: s.footerPadding ? "" : "0" })
              }, [
                e.$slots.footer ? S(e.$slots, "footer", { key: 0 }, void 0, !0) : s.footer ? (o(), u("span", {
                  key: 1,
                  class: "mvi-modal-footer-text",
                  innerHTML: s.footer
                }, null, 8, os)) : g("", !0)
              ], 6)) : g("", !0)
            ], 16)), [
              [j, n.modalShow]
            ]) : g("", !0)
          ]),
          _: 3
        }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
      ], 4)
    ]),
    _: 3
  }, 8, ["model-value", "onShow", "onHide", "use-padding", "z-index", "onClick", "color", "timeout", "mount-el"]);
}
const re = /* @__PURE__ */ T(ls, [["render", as], ["__scopeId", "data-v-7576943f"]]);
re.install = (e) => {
  e.component(re.name, re);
};
const hs = {
  name: "m-dialog",
  data() {
    return {
      ok: !1,
      show: !0,
      focus: !1,
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
      default: !1
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
      return typeof this.title == "string" ? this.title : "\u63D0\u793A";
    },
    computedMessage() {
      return typeof this.message == "string" ? this.message : l.common.isObject(this.message) ? JSON.stringify(this.message) : String(this.message);
    },
    computedBtnText() {
      let e = null;
      return this.type == "alert" ? typeof this.btnText == "string" ? e = this.btnText : e = "\u786E\u5B9A" : (e = [], this.btnText instanceof Array ? (typeof this.btnText[0] == "string" ? e[0] = this.btnText[0] : e[0] = "\u786E\u5B9A", typeof this.btnText[1] == "string" ? e[1] = this.btnText[1] : e[1] = "\u53D6\u6D88") : e = ["\u786E\u5B9A", "\u53D6\u6D88"]), e;
    },
    computedBtnColor() {
      let e = null;
      return this.type == "alert" ? typeof this.btnColor == "string" ? e = this.btnColor : e = null : (e = [], this.btnColor instanceof Array ? (typeof this.btnColor[0] == "string" ? e[0] = this.btnColor[0] : e[0] = null, typeof this.btnColor[1] == "string" ? e[1] = this.btnColor[1] : e[1] = null) : e = [null, null]), e;
    },
    computedWidth() {
      return typeof this.width == "string" && this.width ? this.width : "5.6rem";
    },
    computedInput() {
      let e = {
        placeholder: "",
        type: "text",
        autofocus: !0,
        maxlength: -1,
        clearable: !0,
        mode: !1,
        align: "left",
        value: ""
      };
      return l.common.isObject(this.input) && (typeof this.input.placeholder == "string" && (e.placeholder = this.input.placeholder), typeof this.input.type == "string" && this.input.type && (e.type = this.input.type), typeof this.input.autofocus == "boolean" && (e.autofocus = this.input.autofocus), l.number.isNumber(this.input.maxlength) && (e.maxlength = this.input.maxlength), typeof this.input.clearable == "boolean" && (e.clearable = this.input.clearable), typeof this.input.mode == "string" && (e.mode = this.input.mode), typeof this.input.align == "string" && (e.align = this.input.align), (typeof this.input.value == "string" || l.number.isNumber(this.input.value)) && (e.value = this.input.value.toString())), e;
    },
    computedZIndex() {
      return l.number.isNumber(this.zIndex) ? this.zIndex : 1e3;
    },
    computedUsePadding() {
      return typeof this.usePadding == "boolean" ? this.usePadding : !1;
    },
    computedAnimation() {
      return typeof this.animation == "string" && this.animation ? this.animation : "narrow";
    },
    computedRadius() {
      return typeof this.radius == "string" && this.radius ? this.radius : "0.2rem";
    },
    computedTimeout() {
      return l.number.isNumber(this.timeout) ? this.timeout : 200;
    },
    computedOverlayColor() {
      return typeof this.overlayColor == "string" && this.overlayColor ? this.overlayColor : this.computedIos ? "rgba(0,10,20,.3)" : null;
    },
    computedIos() {
      return typeof this.ios == "boolean" ? this.ios : !1;
    },
    computedMountEl() {
      return typeof this.mountEl == "string" && this.mountEl ? this.mountEl : "body";
    },
    contentShow() {
      return this.type == "alert" || this.type == "confirm" ? !!(this.computedMessage && !this.computedIos) : !0;
    },
    showClear() {
      return this.focus && this.value;
    },
    inputClass() {
      let e = [];
      return this.showClear && this.computedInput.clearable && e.push("mvi-dialog-input-padding"), e;
    },
    inputMode() {
      let e = !1;
      return [
        !1,
        "none",
        "text",
        "decimal",
        "numeric",
        "tel",
        "search",
        "email",
        "url"
      ].includes(this.computedInput.mode) && (e = this.computedInput.mode), e;
    },
    inputStyle() {
      let e = {};
      return ["left", "right", "center"].includes(this.computedInput.align) && (e.textAlign = this.computedInput.align), e;
    }
  },
  components: {
    mIcon: M,
    mModal: re
  },
  created() {
    this.type == "prompt" && this.setDefaultValue();
  },
  mounted() {
    l.event.on(this.$$el, "click.dialog", this.overlayClick);
  },
  methods: {
    overlayClick(e) {
      !this.closable || e.target == e.currentTarget && (this.show = !1, this.ok = !1);
    },
    setDefaultValue() {
      let e = this.computedInput.value;
      this.computedInput.type == "number" && (e = e.replace(/\D/g, "")), this.computedInput.maxlength > 0 && e.length > this.computedInput.maxlength && (e = e.substr(0, this.computedInput.maxlength)), this.value = e;
    },
    inputFocus(e) {
      setTimeout(() => {
        this.focus = !0;
      }, 200);
    },
    inputBlur(e) {
      setTimeout(() => {
        this.focus = !1;
      }, 200);
    },
    inputFun(e) {
      let t = this.value;
      this.computedInput.type == "number" && (t = t.replace(/\D/g, "")), this.computedInput.maxlength > 0 && t.length > this.computedInput.maxlength && (t = t.substr(0, this.computedInput.maxlength)), this.value = t;
    },
    doClear() {
      !this.computedInput.clearable || (this.value = "", this.$refs.input.focus());
    },
    okFun() {
      this.show = !1, this.ok = !0;
    },
    cancelFun() {
      this.show = !1, this.ok = !1;
    },
    modalHide(e) {
      typeof this.dialogComponentWatch == "function" && this.dialogComponentWatch.apply(this, ["hide", this.type, e]);
    },
    modalHidding(e) {
      typeof this.dialogComponentWatch == "function" && this.dialogComponentWatch.apply(this, [
        "hidding",
        this.type,
        e
      ]);
    },
    modalHidden(e) {
      typeof this.dialogComponentWatch == "function" && this.dialogComponentWatch.apply(this, ["hidden", this.type, e]), this.type == "alert" ? this.remove() : this.type == "confirm" ? this.remove(this.ok) : this.type == "prompt" && this.remove(this.ok, this.value);
    },
    modalShow(e) {
      typeof this.dialogComponentWatch == "function" && this.dialogComponentWatch.apply(this, ["show", this.type, e]);
    },
    modalShowing(e) {
      typeof this.dialogComponentWatch == "function" && this.dialogComponentWatch.apply(this, [
        "showing",
        this.type,
        e
      ]);
    },
    modalShown(e) {
      this.type == "prompt" && this.computedInput.autofocus && this.$refs.input && this.$refs.input.focus(), typeof this.dialogComponentWatch == "function" && this.dialogComponentWatch.apply(this, ["shown", this.type, e]);
    }
  }
}, us = ["innerHTML"], ds = ["innerHTML"], cs = ["innerHTML"], fs = ["type", "placeholder", "maxlength", "inputmode"], ms = { class: "mvi-dialog-footer" }, ps = ["textContent"], gs = ["textContent"];
function ys(e, t, s, r, n, i) {
  const f = x("m-icon"), a = x("m-modal");
  return o(), I(a, {
    ref: "modal",
    modelValue: n.show,
    "onUpdate:modelValue": t[6] || (t[6] = (c) => n.show = c),
    "footer-padding": !1,
    onHide: i.modalHide,
    onHidding: i.modalHidding,
    onHidden: i.modalHidden,
    width: i.computedWidth,
    "z-index": i.computedZIndex,
    radius: i.computedRadius,
    "use-padding": i.computedUsePadding,
    animation: i.computedAnimation,
    onShow: i.modalShow,
    onShowing: i.modalShowing,
    onShown: i.modalShown,
    timeout: i.computedTimeout,
    "overlay-color": i.computedOverlayColor,
    "mount-el": i.computedMountEl
  }, zt({
    footer: P(() => [
      v("div", ms, [
        s.type != "alert" ? (o(), u("div", {
          key: 0,
          class: "mvi-dialog-cancel",
          textContent: _(i.computedBtnText[1]),
          onClick: t[4] || (t[4] = (...c) => i.cancelFun && i.cancelFun(...c)),
          style: b({ color: i.computedBtnColor[1] || "" })
        }, null, 12, ps)) : g("", !0),
        v("div", {
          class: "mvi-dialog-ok",
          textContent: _(s.type == "alert" ? i.computedBtnText : i.computedBtnText[0]),
          onClick: t[5] || (t[5] = (...c) => i.okFun && i.okFun(...c)),
          style: b({ color: s.type == "alert" ? i.computedBtnColor || "" : i.computedBtnColor[0] || "" })
        }, null, 12, gs)
      ])
    ]),
    _: 2
  }, [
    i.computedTitle || i.computedIos && i.computedMessage ? {
      name: "title",
      fn: P(() => [
        i.computedTitle ? (o(), u("div", {
          key: 0,
          innerHTML: i.computedTitle,
          class: "mvi-dialog-title"
        }, null, 8, us)) : g("", !0),
        i.computedMessage && i.computedIos ? (o(), u("div", {
          key: 1,
          innerHTML: i.computedMessage,
          class: "mvi-dialog-ios-content"
        }, null, 8, ds)) : g("", !0)
      ])
    } : void 0,
    i.contentShow ? {
      name: "default",
      fn: P(() => [
        !i.computedIos && i.computedMessage ? (o(), u("div", {
          key: 0,
          innerHTML: i.computedMessage,
          class: "mvi-dialog-content"
        }, null, 8, cs)) : g("", !0),
        s.type == "prompt" ? (o(), u("div", {
          key: 1,
          class: y(["mvi-dialog-input", !i.computedIos && i.computedMessage ? "mvi-dialog-input-mt" : ""])
        }, [
          B(v("input", {
            ref: "input",
            type: i.computedInput.type == "number" ? "text" : i.computedInput.type,
            placeholder: i.computedInput.placeholder,
            maxlength: i.computedInput.maxlength,
            class: y(i.inputClass),
            style: b(i.inputStyle),
            "onUpdate:modelValue": t[0] || (t[0] = (c) => n.value = c),
            onInput: t[1] || (t[1] = (...c) => i.inputFun && i.inputFun(...c)),
            onFocus: t[2] || (t[2] = (...c) => i.inputFocus && i.inputFocus(...c)),
            onBlur: t[3] || (t[3] = (...c) => i.inputBlur && i.inputBlur(...c)),
            inputmode: i.inputMode
          }, null, 46, fs), [
            [
              we,
              n.value,
              void 0,
              { trim: !0 }
            ]
          ]),
          i.computedInput.clearable ? B((o(), I(f, {
            key: 0,
            ref: "icon",
            type: "times-o",
            class: "mvi-dialog-times",
            onClick: i.doClear
          }, null, 8, ["onClick"])), [
            [j, i.showClear]
          ]) : g("", !0)
        ], 2)) : g("", !0)
      ])
    } : void 0
  ]), 1032, ["modelValue", "onHide", "onHidding", "onHidden", "width", "z-index", "radius", "use-padding", "animation", "onShow", "onShowing", "onShown", "timeout", "overlay-color", "mount-el"]);
}
const ft = /* @__PURE__ */ T(hs, [["render", ys], ["__scopeId", "data-v-6d0d72ee"]]);
const bs = {
  name: "m-dialog-pc",
  data() {
    return {
      ok: !1,
      show: !0,
      focus: !1,
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
      default: !1
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
      return typeof this.mountEl == "string" && this.mountEl ? this.mountEl : "body";
    },
    computedShowTimes() {
      return typeof this.showTimes == "boolean" ? this.showTimes : !0;
    },
    computedTitle() {
      return typeof this.title == "string" ? this.title : "\u63D0\u793A";
    },
    computedMessage() {
      return typeof this.message == "string" ? this.message : l.common.isObject(this.message) ? JSON.stringify(this.message) : String(this.message);
    },
    computedBtns() {
      let e = {
        ok: {
          type: "primary",
          color: null,
          subColor: null,
          plain: !1,
          text: "\u786E\u5B9A",
          size: "medium"
        },
        cancel: {
          type: "default",
          color: null,
          subColor: null,
          plain: !1,
          text: "\u53D6\u6D88",
          size: "medium"
        }
      };
      return l.common.isObject(this.btns) && (l.common.isObject(this.btns.ok) && (typeof this.btns.ok.type == "string" && (e.ok.type = this.btns.ok.type), typeof this.btns.ok.color == "string" && (e.ok.color = this.btns.ok.color), typeof this.btns.ok.subColor == "string" && (e.ok.subColor = this.btns.ok.subColor), typeof this.btns.ok.plain == "boolean" && (e.ok.plain = this.btns.ok.plain), typeof this.btns.ok.text == "string" && (e.ok.text = this.btns.ok.text), typeof this.btns.ok.size == "string" && (e.ok.size = this.btns.ok.size)), l.common.isObject(this.btns.cancel) && (typeof this.btns.cancel.type == "string" && (e.cancel.type = this.btns.cancel.type), typeof this.btns.cancel.color == "string" && (e.cancel.color = this.btns.cancel.color), typeof this.btns.cancel.subColor == "string" && (e.cancel.subColor = this.btns.cancel.subColor), typeof this.btns.cancel.plain == "boolean" && (e.cancel.plain = this.btns.cancel.plain), typeof this.btns.cancel.text == "string" && (e.cancel.text = this.btns.cancel.text), typeof this.btns.cancel.size == "string" && (e.cancel.size = this.btns.cancel.size))), e;
    },
    computedWidth() {
      return typeof this.width == "string" && this.width ? this.width : "7.2rem";
    },
    computedInput() {
      let e = {
        placeholder: "",
        type: "text",
        autofocus: !0,
        maxlength: -1,
        clearable: !1,
        align: "left",
        value: ""
      };
      return l.common.isObject(this.input) && (typeof this.input.placeholder == "string" && (e.placeholder = this.input.placeholder), typeof this.input.type == "string" && this.input.type && (e.type = this.input.type), typeof this.input.autofocus == "boolean" && (e.autofocus = this.input.autofocus), l.number.isNumber(this.input.maxlength) && (e.maxlength = this.input.maxlength), typeof this.input.clearable == "boolean" && (e.clearable = this.input.clearable), typeof this.input.align == "string" && (e.align = this.input.align), (typeof this.input.value == "string" || l.number.isNumber(this.input.value)) && (e.value = this.input.value.toString())), e;
    },
    computedZIndex() {
      return l.number.isNumber(this.zIndex) ? this.zIndex : 1e3;
    },
    computedUsePadding() {
      return typeof this.usePadding == "boolean" ? this.usePadding : !1;
    },
    computedAnimation() {
      return typeof this.animation == "string" && this.animation ? this.animation : "translate-top";
    },
    computedRadius() {
      return typeof this.radius == "string" && this.radius ? this.radius : "0.12rem";
    },
    computedTimeout() {
      return l.number.isNumber(this.timeout) ? this.timeout : 200;
    },
    computedOverlayColor() {
      return typeof this.overlayColor == "string" && this.overlayColor ? this.overlayColor : null;
    },
    contentShow() {
      return this.type == "Alert" || this.type == "Confirm" ? !!this.computedMessage : !0;
    },
    showClear() {
      return this.focus && this.value;
    },
    inputClass() {
      let e = [];
      return this.showClear && this.computedInput.clearable && e.push("mvi-dialog-input-padding"), e;
    },
    inputStyle() {
      let e = {};
      return ["left", "right", "center"].includes(this.computedInput.align) && (e.textAlign = this.computedInput.align), e;
    }
  },
  components: {
    mIcon: M,
    mModal: re,
    mButton: ae
  },
  created() {
    this.type == "Prompt" && this.setDefaultValue();
  },
  mounted() {
    l.event.on(this.$$el, "click.dialog", this.overlayClick);
  },
  methods: {
    overlayClick(e) {
      !this.closable || e.target == e.currentTarget && (this.show = !1, this.ok = !1);
    },
    setDefaultValue() {
      let e = this.computedInput.value;
      this.computedInput.type == "number" && (e = e.replace(/\D/g, "")), this.computedInput.maxlength > 0 && e.length > this.computedInput.maxlength && (e = e.substr(0, this.computedInput.maxlength)), this.value = e;
    },
    inputFocus() {
      setTimeout(() => {
        this.focus = !0;
      }, 200);
    },
    inputBlur(e) {
      setTimeout(() => {
        this.focus = !1;
      }, 200);
    },
    inputFun() {
      let e = this.value;
      this.computedInput.type == "number" && (e = e.replace(/\D/g, "")), this.computedInput.maxlength > 0 && e.length > this.computedInput.maxlength && (e = e.substr(0, this.computedInput.maxlength)), this.value = e;
    },
    doClear() {
      !this.computedInput.clearable || (this.value = "", this.$refs.input.focus());
    },
    okFun() {
      this.show = !1, this.ok = !0;
    },
    cancelFun() {
      this.show = !1, this.ok = !1;
    },
    modalHide(e) {
      typeof this.dialogComponentWatch == "function" && this.dialogComponentWatch.apply(this, ["hide", this.type, e]);
    },
    modalHidding(e) {
      typeof this.dialogComponentWatch == "function" && this.dialogComponentWatch.apply(this, [
        "hidding",
        this.type,
        e
      ]);
    },
    modalHidden(e) {
      typeof this.dialogComponentWatch == "function" && this.dialogComponentWatch.apply(this, ["hidden", this.type, e]), this.type == "Alert" ? this.remove() : this.type == "Confirm" ? this.remove(this.ok) : this.type == "Prompt" && this.remove(this.ok, this.value);
    },
    modalShow(e) {
      typeof this.dialogComponentWatch == "function" && this.dialogComponentWatch.apply(this, ["show", this.type, e]);
    },
    modalShowing(e) {
      typeof this.dialogComponentWatch == "function" && this.dialogComponentWatch.apply(this, [
        "showing",
        this.type,
        e
      ]);
    },
    modalShown(e) {
      this.type == "Prompt" && this.computedInput.autofocus && this.$refs.input && this.$refs.input.focus(), typeof this.dialogComponentWatch == "function" && this.dialogComponentWatch.apply(this, ["shown", this.type, e]);
    }
  }
}, vs = ["innerHTML"], ws = ["innerHTML"], Cs = ["type", "placeholder", "maxlength"], xs = { class: "mvi-dialog-footer" };
function Is(e, t, s, r, n, i) {
  const f = x("m-icon"), a = x("m-button"), c = x("m-modal");
  return o(), I(c, {
    ref: "modal",
    modelValue: n.show,
    "onUpdate:modelValue": t[5] || (t[5] = (d) => n.show = d),
    "footer-padding": !1,
    onHide: i.modalHide,
    onHidding: i.modalHidding,
    onHidden: i.modalHidden,
    width: i.computedWidth,
    "z-index": i.computedZIndex,
    radius: i.computedRadius,
    "use-padding": i.computedUsePadding,
    animation: i.computedAnimation,
    onShow: i.modalShow,
    onShowing: i.modalShowing,
    onShown: i.modalShown,
    timeout: i.computedTimeout,
    "overlay-color": i.computedOverlayColor,
    "mount-el": i.computedMountEl
  }, zt({ _: 2 }, [
    i.computedTitle ? {
      name: "title",
      fn: P(() => [
        v("div", {
          innerHTML: i.computedTitle,
          class: "mvi-dialog-title"
        }, null, 8, vs),
        i.computedShowTimes ? (o(), I(f, {
          key: 0,
          class: "mvi-dialog-close",
          onClick: i.cancelFun,
          type: "times"
        }, null, 8, ["onClick"])) : g("", !0)
      ])
    } : void 0,
    i.contentShow ? {
      name: "default",
      fn: P(() => [
        i.computedMessage ? (o(), u("div", {
          key: 0,
          innerHTML: i.computedMessage,
          class: "mvi-dialog-content"
        }, null, 8, ws)) : g("", !0),
        s.type == "Prompt" ? (o(), u("div", {
          key: 1,
          class: y(["mvi-dialog-input", i.computedMessage ? "mvi-dialog-input-mt" : ""])
        }, [
          B(v("input", {
            ref: "input",
            type: i.computedInput.type == "number" ? "text" : i.computedInput.type,
            placeholder: i.computedInput.placeholder,
            maxlength: i.computedInput.maxlength,
            class: y(i.inputClass),
            style: b(i.inputStyle),
            "onUpdate:modelValue": t[0] || (t[0] = (d) => n.value = d),
            onInput: t[1] || (t[1] = (...d) => i.inputFun && i.inputFun(...d)),
            onFocus: t[2] || (t[2] = (...d) => i.inputFocus && i.inputFocus(...d)),
            onBlur: t[3] || (t[3] = (...d) => i.inputBlur && i.inputBlur(...d)),
            onKeyup: t[4] || (t[4] = wt((...d) => i.okFun && i.okFun(...d), ["enter"]))
          }, null, 46, Cs), [
            [
              we,
              n.value,
              void 0,
              { trim: !0 }
            ]
          ]),
          i.computedInput.clearable ? B((o(), I(f, {
            key: 0,
            ref: "icon",
            type: "times-o",
            class: "mvi-dialog-times",
            onClick: i.doClear
          }, null, 8, ["onClick"])), [
            [j, i.showClear]
          ]) : g("", !0)
        ], 2)) : g("", !0),
        v("div", xs, [
          s.type != "Alert" ? (o(), I(a, {
            key: 0,
            type: i.computedBtns.cancel.type,
            color: i.computedBtns.cancel.color,
            "sub-color": i.computedBtns.cancel.subColor,
            plain: i.computedBtns.cancel.plain,
            class: "mvi-dialog-cancel",
            onClick: i.cancelFun,
            size: i.computedBtns.cancel.size
          }, {
            default: P(() => [
              ve(_(i.computedBtns.cancel.text), 1)
            ]),
            _: 1
          }, 8, ["type", "color", "sub-color", "plain", "onClick", "size"])) : g("", !0),
          D(a, {
            type: i.computedBtns.ok.type,
            color: i.computedBtns.ok.color,
            "sub-color": i.computedBtns.ok.subColor,
            plain: i.computedBtns.ok.plain,
            onClick: i.okFun,
            size: i.computedBtns.ok.size
          }, {
            default: P(() => [
              ve(_(i.computedBtns.ok.text), 1)
            ]),
            _: 1
          }, 8, ["type", "color", "sub-color", "plain", "onClick", "size"])
        ])
      ])
    } : void 0
  ]), 1032, ["modelValue", "onHide", "onHidding", "onHidden", "width", "z-index", "radius", "use-padding", "animation", "onShow", "onShowing", "onShown", "timeout", "overlay-color", "mount-el"]);
}
const mt = /* @__PURE__ */ T(bs, [["render", Is], ["__scopeId", "data-v-4212acd1"]]), W = {
  initParams: (e, t) => {
    let s = {};
    return l.common.isObject(t) ? (s.title = t.title, s.message = t.message, s.width = t.width, s.zIndex = t.zIndex, s.usePadding = t.usePadding, s.animation = t.animation, s.radius = t.radius, s.timeout = t.timeout, s.overlayColor = t.overlayColor, s.mountEl = t.mountEl, s.closable = t.closable, e == "alert" || e == "confirm" || e == "prompt" ? (s.btnText = t.btnText, s.btnColor = t.btnColor, s.ios = t.ios, s.input = {
      placeholder: t.placeholder,
      type: t.type,
      autofocus: t.autofocus,
      maxlength: t.maxlength,
      clearable: t.clearable,
      mode: t.mode,
      align: t.align,
      value: t.value
    }) : (e == "Alert" || e == "Confirm" || e == "Prompt") && (s.btns = t.btns, s.showTimes = t.showTimes, s.input = {
      placeholder: t.placeholder,
      type: t.type,
      autofocus: t.autofocus,
      maxlength: t.maxlength,
      clearable: t.clearable,
      align: t.align,
      value: t.value
    })) : s.message = t, s.type = e, s;
  },
  alert: function(e) {
    return new Promise((t, s) => {
      let r = W.initParams("alert", e), n = l.element.string2dom("<div></div>");
      document.body.appendChild(n);
      const i = K(ft, {
        ...r,
        remove: () => {
          i.unmount(), n.remove(), t();
        }
      });
      typeof this.config.globalProperties.dialogComponentWatch == "function" && (i.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch), i.mount(n);
    });
  },
  confirm: function(e) {
    return new Promise((t, s) => {
      let r = W.initParams("confirm", e), n = l.element.string2dom("<div></div>");
      document.body.appendChild(n);
      const i = K(ft, {
        ...r,
        remove: (f) => {
          i.unmount(), n.remove(), t(f);
        }
      });
      typeof this.config.globalProperties.dialogComponentWatch == "function" && (i.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch), i.mount(n);
    });
  },
  prompt: function(e) {
    return new Promise((t, s) => {
      let r = W.initParams("prompt", e), n = l.element.string2dom("<div></div>");
      document.body.appendChild(n);
      const i = K(ft, {
        ...r,
        remove: (f, a) => {
          i.unmount(), n.remove(), t({
            ok: f,
            value: a
          });
        }
      });
      typeof this.config.globalProperties.dialogComponentWatch == "function" && (i.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch), i.mount(n);
    });
  },
  Alert: function(e) {
    return new Promise((t, s) => {
      let r = W.initParams("Alert", e), n = l.element.string2dom("<div></div>");
      document.body.appendChild(n);
      const i = K(mt, {
        ...r,
        remove: () => {
          i.unmount(), n.remove(), t();
        }
      });
      typeof this.config.globalProperties.dialogComponentWatch == "function" && (i.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch), i.mount(n);
    });
  },
  Confirm: function(e) {
    return new Promise((t, s) => {
      let r = W.initParams("Confirm", e), n = l.element.string2dom("<div></div>");
      document.body.appendChild(n);
      const i = K(mt, {
        ...r,
        remove: (f) => {
          i.unmount(), n.remove(), t(f);
        }
      });
      typeof this.config.globalProperties.dialogComponentWatch == "function" && (i.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch), i.mount(n);
    });
  },
  Prompt: function(e) {
    return new Promise((t, s) => {
      let r = W.initParams("Prompt", e), n = l.element.string2dom("<div></div>");
      document.body.appendChild(n);
      const i = K(mt, {
        ...r,
        remove: (f, a) => {
          i.unmount(), n.remove(), t({
            ok: f,
            value: a
          });
        }
      });
      typeof this.config.globalProperties.dialogComponentWatch == "function" && (i.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch), i.mount(n);
    });
  },
  install: (e) => {
    e.config.globalProperties.$alert = W.alert.bind(e), e.provide("$alert", W.alert.bind(e)), e.config.globalProperties.$confirm = W.confirm.bind(e), e.provide("$confirm", W.confirm.bind(e)), e.config.globalProperties.$prompt = W.prompt.bind(e), e.provide("$prompt", W.prompt.bind(e)), e.config.globalProperties.$Alert = W.Alert.bind(e), e.provide("$Alert", W.Alert.bind(e)), e.config.globalProperties.$Confirm = W.Confirm.bind(e), e.provide("$Confirm", W.Confirm.bind(e)), e.config.globalProperties.$Prompt = W.Prompt.bind(e), e.provide("$Prompt", W.Prompt.bind(e));
  }
};
const Ss = {
  name: "m-toast",
  data() {
    return {
      show: !0,
      timer: null,
      typeArray: ["success", "error", "loading", "info"]
    };
  },
  inheritAttrs: !1,
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
      return typeof this.usePadding == "boolean" ? this.usePadding : !1;
    },
    computedType() {
      return this.typeArray.includes(this.type) ? this.type : "info";
    },
    computedIcon() {
      let e = {
        type: this.defaultIconType,
        url: null,
        spin: !1,
        size: "0.72rem",
        color: null
      };
      return typeof this.icon == "string" && this.icon ? e.type = this.icon : l.common.isObject(this.icon) && (typeof this.icon.type == "string" && this.icon.type && (e.type = this.icon.type), typeof this.icon.url == "string" && this.icon.url && (e.url = this.icon.url), typeof this.icon.spin == "boolean" && (e.spin = this.icon.spin), typeof this.icon.size == "string" && this.icon.size && (e.size = this.icon.size), typeof this.icon.color == "string" && this.icon.color && (e.color = this.icon.color)), e;
    },
    computedMessage() {
      return typeof this.message == "string" ? this.message : l.common.isObject(this.message) ? JSON.stringify(this.message) : String(this.message);
    },
    computedTimeout() {
      return l.number.isNumber(this.timeout) && this.timeout > 0 ? this.timeout : -1;
    },
    computedZIndex() {
      return l.number.isNumber(this.zIndex) ? this.zIndex : 1100;
    },
    computedOverlayColor() {
      return typeof this.overlayColor == "string" && this.overlayColor ? this.overlayColor : "rgba(0, 10, 20, .05)";
    },
    computedBackground() {
      return typeof this.background == "string" && this.background ? this.background : null;
    },
    computedColor() {
      return typeof this.color == "string" && this.color ? this.color : null;
    },
    computedMountEl() {
      return typeof this.mountEl == "string" && this.mountEl ? this.mountEl : "body";
    },
    toastStyle() {
      let e = {};
      return e.zIndex = this.computedZIndex, this.computedBackground && (e.backgroundColor = this.computedBackground), this.computedColor && (e.color = this.computedColor), e;
    },
    defaultIconType() {
      if (this.computedType == "success")
        return "success";
      if (this.computedType == "error")
        return "error-o";
      if (this.computedType == "info")
        return "info-o";
      if (this.computedType == "loading")
        return null;
    }
  },
  components: {
    mIcon: M,
    mLoading: te,
    mOverlay: Q
  },
  mounted() {
    this.init(this);
  },
  methods: {
    toastShown() {
      this.computedTimeout > 0 && (this.timer = setTimeout(() => {
        this.show = !1;
      }, this.computedTimeout));
    },
    toastHidden() {
      this.clearTimer(), this.remove();
    },
    clearTimer() {
      this.timer && (clearTimeout(this.timer), this.timer = null);
    }
  }
}, _s = { class: "mvi-toast-icon" }, Ts = ["innerHTML"];
function ks(e, t, s, r, n, i) {
  const f = x("m-loading"), a = x("m-icon"), c = x("m-overlay");
  return o(), I(c, {
    ref: "overlay",
    color: i.computedOverlayColor,
    onHidden: i.toastHidden,
    "model-value": n.show,
    "use-padding": i.computedUsePadding,
    zIndex: i.computedZIndex,
    fade: "",
    "mount-el": i.computedMountEl,
    onShown: i.toastShown
  }, {
    default: P(() => [
      v("div", oe({
        class: ["mvi-toast", i.computedMessage ? "" : "mvi-toast-iconless"],
        style: i.toastStyle
      }, e.$attrs), [
        v("div", _s, [
          i.computedType == "loading" && !i.computedIcon.type && !i.computedIcon.url ? (o(), I(f, {
            key: 0,
            color: i.computedColor || "#fff",
            type: 0,
            size: i.computedIcon.size
          }, null, 8, ["color", "size"])) : (o(), I(a, {
            key: 1,
            type: i.computedIcon.type,
            url: i.computedIcon.url,
            spin: i.computedIcon.spin,
            size: i.computedIcon.size,
            color: i.computedIcon.color
          }, null, 8, ["type", "url", "spin", "size", "color"]))
        ]),
        i.computedMessage ? (o(), u("div", {
          key: 0,
          class: "mvi-toast-message",
          innerHTML: i.computedMessage
        }, null, 8, Ts)) : g("", !0)
      ], 16)
    ]),
    _: 1
  }, 8, ["color", "onHidden", "model-value", "use-padding", "zIndex", "mount-el", "onShown"]);
}
const Ds = /* @__PURE__ */ T(Ss, [["render", ks], ["__scopeId", "data-v-9dcca572"]]), R = {
  initParams: (e) => {
    let t = {};
    return l.common.isObject(e) ? (t.type = e.type, t.message = e.message, t.timeout = e.timeout, t.overlayColor = e.overlayColor, t.background = e.background, t.color = e.color, t.zIndex = e.zIndex, t.usePadding = e.usePadding, t.icon = e.icon, t.mountEl = e.mountEl) : (t.message = e, t.timeout = 1500), t;
  },
  showToast: (e) => new Promise((t, s) => {
    R.$el && R.$instance && (R.$instance.unmount(), R.$el.remove());
    let r = R.initParams(e), n = l.element.string2dom("<div></div>");
    document.body.appendChild(n);
    const i = K(Ds, {
      ...r,
      init: (f) => {
        R.$vm = f;
      },
      remove: () => {
        i.unmount(), n.remove(), t();
      }
    });
    i.mount(n), R.$el = n, R.$instance = i;
  }),
  hideToast: () => {
    R.$vm && (R.$vm.show = !1);
  },
  install: (e) => {
    e.config.globalProperties.$showToast = R.showToast, e.provide("$showToast", R.showToast), e.config.globalProperties.$hideToast = R.hideToast, e.provide("$hideToast", R.hideToast);
  }
};
te.install = (e) => {
  e.component(te.name, te);
};
const Ps = {
  name: "m-msgbox",
  data() {
    return {
      show: !1
    };
  },
  inheritAttrs: !1,
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
      return typeof this.message == "string" ? this.message : l.common.isObject(this.message) ? JSON.stringify(this.message) : String(this.message);
    },
    computedAnimation() {
      return typeof this.animation == "string" && this.animation ? this.animation : "fade";
    },
    computedTimeout() {
      return l.number.isNumber(this.timeout) && this.timeout > 0 ? this.timeout : 1500;
    },
    computedZIndex() {
      return l.number.isNumber(this.zIndex) ? this.zIndex : 1100;
    },
    computedBackground() {
      return typeof this.background == "string" && this.background ? this.background : null;
    },
    computedColor() {
      return typeof this.color == "string" && this.color ? this.color : null;
    },
    boxAnimation() {
      return "mvi-msgbox-" + this.computedAnimation;
    },
    msgBoxStyle() {
      let e = {};
      return e.zIndex = this.computedZIndex, this.computedBackground && (e.backgroundColor = this.computedBackground), this.computedColor && (e.color = this.computedColor), e;
    },
    msgBoxClass() {
      let e = ["mvi-msgbox"];
      return this.computedAnimation == "translate" && e.push("mvi-msgbox-translate"), e;
    }
  },
  mounted() {
    this.show = !0;
  },
  methods: {
    afterEnter(e) {
      this.computedTimeout > 0 && setTimeout(() => {
        this.show = !1;
      }, this.computedTimeout);
    },
    afterLeave(e) {
      this.remove();
    }
  }
}, zs = ["innerHTML"];
function As(e, t, s, r, n, i) {
  return o(), I(at, { to: "body" }, [
    D(G, {
      name: i.boxAnimation,
      onAfterEnter: i.afterEnter,
      onAfterLeave: i.afterLeave
    }, {
      default: P(() => [
        B(v("div", oe(e.$attrs, {
          class: i.msgBoxClass,
          innerHTML: i.computedMessage,
          style: i.msgBoxStyle
        }), null, 16, zs), [
          [j, n.show]
        ])
      ]),
      _: 1
    }, 8, ["name", "onAfterEnter", "onAfterLeave"])
  ]);
}
const Es = /* @__PURE__ */ T(Ps, [["render", As], ["__scopeId", "data-v-94d256bb"]]), Te = {
  initParams: (e) => {
    let t = {};
    return l.common.isObject(e) ? (t.message = e.message, t.timeout = e.timeout, t.animation = e.animation, t.zIndex = e.zIndex, t.color = e.color, t.background = e.background) : t.message = e, t;
  },
  msgbox: (e) => new Promise((t, s) => {
    let r = Te.initParams(e), n = l.element.string2dom("<div></div>");
    document.body.appendChild(n);
    const i = K(Es, {
      ...r,
      remove: () => {
        i.unmount(), n.remove(), t();
      }
    });
    i.mount(n);
  }),
  install: (e) => {
    e.config.globalProperties.$msgbox = Te.msgbox, e.provide("$msgbox", Te.msgbox);
  }
};
const Ms = {
  name: "m-number-keyboard",
  data() {
    return {
      firstShow: !1,
      keyboardShow: !1,
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
  inheritAttrs: !1,
  props: {
    showDecimal: {
      type: Boolean,
      default: !0
    },
    showDelete: {
      type: Boolean,
      default: !0
    },
    showComplete: {
      type: Boolean,
      default: !0
    },
    show: {
      type: Boolean,
      default: !1
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
      default: !1
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
      default: !1
    },
    active: {
      type: Boolean,
      default: !0
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
      default: !1
    },
    calibration: {
      type: Boolean,
      default: !1
    },
    showX: {
      type: Boolean,
      default: !1
    },
    random: {
      type: Boolean,
      default: !1
    },
    title: {
      type: String,
      default: null
    },
    border: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    $$el() {
      return this.$refs.overlay.$$el;
    },
    computedValue: {
      set(e) {
        this.$emit("update:modelValue", e);
      },
      get() {
        return l.number.isNumber(this.modelValue) ? this.modelValue.toString() : this.modelValue;
      }
    },
    boardStyle() {
      let e = {};
      return e.transition = "all " + this.timeout + "ms", e.webkitTransition = "all " + this.timeout + "ms", e.zIndex = this.zIndex + 10, e;
    },
    deleteDisabeld() {
      return this.modelValue === "";
    },
    completeDisabled() {
      return this.modelValue === "";
    },
    leftNumberClass() {
      return (e, t) => {
        let s = ["mvi-number-keyboard-left-number"];
        return t == this.computedNumbers.length - 1 && (this.showX || this.showDecimal ? s.push("mvi-number-keyboard-half") : s.push("mvi-number-keyboard-full")), this.border && s.push("mvi-number-keyboard-border"), s;
      };
    },
    leftNumberElClass() {
      return (e, t) => {
        let s = ["mvi-number-keyboard-left-number-el"];
        return this.active && s.push("mvi-number-keyboard-active"), s;
      };
    },
    deleteBtnClass() {
      let e = ["mvi-number-keyboard-delete"];
      return this.border && e.push("mvi-number-keyboard-border"), e;
    },
    deleteBtnElClass() {
      let e = ["mvi-number-keyboard-delete-el"];
      return this.deleteClass && e.push(this.deleteClass), this.active && !this.deleteDisabeld && e.push("mvi-number-keyboard-active"), e;
    },
    completeBtnClass() {
      let e = ["mvi-number-keyboard-complete"];
      return this.border && e.push("mvi-number-keyboard-border"), e;
    },
    completeBtnElClass() {
      let e = ["mvi-number-keyboard-complete-el"];
      return this.completeClass && e.push(this.completeClass), this.active && !(!this.promiseEmpty && this.completeDisabled) && e.push("mvi-number-keyboard-active"), e;
    },
    showKeyBoard() {
      return (e) => e == "X" ? this.showX : e == "." ? this.showDecimal && !this.showX : !0;
    },
    computedNumbers() {
      let e = this.numbers.filter((t) => this.showKeyBoard(t));
      if (this.random) {
        let t = [], s = e.length;
        for (let r = 0; r < s; r++)
          t.push(this.getRandomNumber(t));
        return t;
      }
      return e;
    }
  },
  components: {
    mOverlay: Q
  },
  methods: {
    getRandomNumber(e) {
      let t = this.numbers.filter((r) => this.showKeyBoard(r)), s = Math.floor(Math.random() * t.length);
      return e.includes(t[s]) ? this.getRandomNumber(e) : t[s];
    },
    overlayShow(e) {
      this.firstShow || (this.firstShow = !0), this.keyboardShow = !0;
    },
    overlayHide(e) {
      this.keyboardShow = !1;
    },
    numberClick(e) {
      this.computedValue.length >= this.maxlength && this.maxlength > 0 || (this.computedValue += e, this.$emit("input", e));
    },
    deleteClick() {
      if (this.deleteDisabeld)
        return;
      let e = l.string.delete(
        this.computedValue,
        this.computedValue.length - 1,
        1
      );
      this.computedValue = e, this.$emit("delete", e);
    },
    completeClick() {
      this.completeDisabled && !this.promiseEmpty || (this.calibration && (this.computedValue = parseFloat(this.computedValue) || ""), this.$emit("complete", this.computedValue), this.hideKeyboard());
    },
    hide() {
      this.closable && this.hideKeyboard();
    },
    hideKeyboard() {
      this.$emit("update:show", !1);
    },
    beforeEnter(e) {
      l.data.get(e, "mvi-keyboard-beforeEnter-trigger") || (l.data.set(e, "mvi-keyboard-beforeEnter-trigger", !0), this.$emit("show", e), typeof this.keyboardComponentWatch == "function" && this.keyboardComponentWatch.apply(this, ["show", e]));
    },
    enter(e) {
      l.data.get(e, "mvi-keyboard-enter-trigger") || (l.data.set(e, "mvi-keyboard-enter-trigger", !0), this.$emit("showing", e), typeof this.keyboardComponentWatch == "function" && this.keyboardComponentWatch.apply(this, ["showing", e]));
    },
    afterEnter(e) {
      this.$emit("shown", e), typeof this.keyboardComponentWatch == "function" && this.keyboardComponentWatch.apply(this, ["shown", e]);
    },
    beforeLeave(e) {
      l.data.remove(e, "mvi-keyboard-beforeEnter-trigger"), l.data.remove(e, "mvi-keyboard-enter-trigger"), this.$emit("hide", e), typeof this.keyboardComponentWatch == "function" && this.keyboardComponentWatch.apply(this, ["hide", e]);
    },
    leave(e) {
      this.$emit("hidding", e), typeof this.keyboardComponentWatch == "function" && this.keyboardComponentWatch.apply(this, ["hidding", e]);
    },
    afterLeave(e) {
      this.$emit("hidden", e), typeof this.keyboardComponentWatch == "function" && this.keyboardComponentWatch.apply(this, ["hidden", e]);
    }
  }
}, Bs = { key: 1 }, Os = { class: "mvi-number-keyboard-left" }, Hs = ["onClick"], Vs = {
  key: 0,
  class: "mvi-number-keyboard-right"
}, $s = ["disabled"], js = ["textContent"], Ws = ["disabled"], Fs = ["textContent"];
function Rs(e, t, s, r, n, i) {
  const f = x("m-overlay");
  return o(), I(f, {
    ref: "overlay",
    "model-value": s.show,
    onShow: i.overlayShow,
    onHide: i.overlayHide,
    "z-index": s.zIndex,
    color: s.overlayColor,
    timeout: s.timeout,
    onClick: ht(i.hide, ["self"]),
    "mount-el": s.mountEl,
    "use-padding": s.usePadding
  }, {
    default: P(() => [
      D(G, {
        name: "mvi-keyboard",
        onBeforeEnter: i.beforeEnter,
        onAfterEnter: i.afterEnter,
        onBeforeLeave: i.beforeLeave,
        onAfterLeave: i.afterLeave,
        onLeave: i.leave,
        onEnter: i.enter
      }, {
        default: P(() => [
          n.firstShow ? B((o(), u("div", oe({
            key: 0,
            ref: "keyboard",
            class: "mvi-number-keyboard",
            style: i.boardStyle
          }, e.$attrs), [
            !s.border && (s.title || e.$slots.title) ? (o(), u("div", {
              key: 0,
              class: y(["mvi-number-keyboard-title", s.border ? "mvi-number-keyboard-border" : ""])
            }, [
              e.$slots.title ? S(e.$slots, "default", { key: 0 }, void 0, !0) : s.title ? (o(), u("span", Bs, _(s.title), 1)) : g("", !0)
            ], 2)) : g("", !0),
            v("div", {
              class: y(["mvi-number-keyboard-wrapper", s.border ? "" : "mvi-number-keyboard-border"])
            }, [
              v("div", Os, [
                (o(!0), u(A, null, O(i.computedNumbers, (a, c) => (o(), u("div", {
                  class: y(i.leftNumberClass(a, c))
                }, [
                  v("div", {
                    onClick: (d) => i.numberClick(a),
                    class: y(i.leftNumberElClass(a, c))
                  }, _(a), 11, Hs)
                ], 2))), 256))
              ]),
              s.showComplete || s.showDelete ? (o(), u("div", Vs, [
                s.showDelete ? (o(), u("div", {
                  key: 0,
                  class: y(i.deleteBtnClass)
                }, [
                  v("div", {
                    disabled: i.deleteDisabeld || null,
                    class: y(i.deleteBtnElClass),
                    onClick: t[0] || (t[0] = (...a) => i.deleteClick && i.deleteClick(...a))
                  }, [
                    e.$slots.delete ? S(e.$slots, "delete", { key: 0 }, void 0, !0) : (o(), u("span", {
                      key: 1,
                      textContent: _(s.deleteText)
                    }, null, 8, js))
                  ], 10, $s)
                ], 2)) : g("", !0),
                s.showComplete ? (o(), u("div", {
                  key: 1,
                  class: y(i.completeBtnClass)
                }, [
                  v("div", {
                    disabled: s.promiseEmpty ? null : i.completeDisabled || null,
                    class: y(i.completeBtnElClass),
                    onClick: t[1] || (t[1] = (...a) => i.completeClick && i.completeClick(...a))
                  }, [
                    e.$slots.complete ? S(e.$slots, "complete", { key: 0 }, void 0, !0) : g("", !0),
                    v("span", {
                      textContent: _(s.completeText)
                    }, null, 8, Fs)
                  ], 10, Ws)
                ], 2)) : g("", !0)
              ])) : g("", !0)
            ], 2)
          ], 16)), [
            [j, n.keyboardShow]
          ]) : g("", !0)
        ]),
        _: 3
      }, 8, ["onBeforeEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave", "onLeave", "onEnter"])
    ]),
    _: 3
  }, 8, ["model-value", "onShow", "onHide", "z-index", "color", "timeout", "onClick", "mount-el", "use-padding"]);
}
const ke = /* @__PURE__ */ T(Ms, [["render", Rs], ["__scopeId", "data-v-c0bd1113"]]);
ke.install = (e) => {
  e.component(ke.name, ke);
};
const Ys = {
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
      focus: !1
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
      default: !1
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
      default: !1
    },
    showCancel: {
      type: Boolean,
      default: !1
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
      default: !1
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    align: {
      type: String,
      default: "left",
      validator(e) {
        return ["left", "center", "right"].includes(e);
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
      default: !1
    },
    inputMode: {
      type: [String, Boolean],
      default: !1,
      validator(e) {
        return [
          !1,
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
      return this.disabled || this.readonly ? !1 : this.focus ? this.realValue !== "" : !1;
    },
    leftIconType() {
      let e = null;
      return l.common.isObject(this.leftIcon) ? typeof this.leftIcon.type == "string" && (e = this.leftIcon.type) : typeof this.leftIcon == "string" && (e = this.leftIcon), e;
    },
    leftIconUrl() {
      let e = null;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.url == "string" && (e = this.leftIcon.url), e;
    },
    leftIconSpin() {
      let e = !1;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.spin == "boolean" && (e = this.leftIcon.spin), e;
    },
    leftIconSize() {
      let e = null;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.size == "string" && (e = this.leftIcon.size), e;
    },
    leftIconColor() {
      let e = null;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.color == "string" && (e = this.leftIcon.color), e;
    },
    rightIconType() {
      let e = null;
      return l.common.isObject(this.rightIcon) ? typeof this.rightIcon.type == "string" && (e = this.rightIcon.type) : typeof this.rightIcon == "string" && (e = this.rightIcon), e;
    },
    rightIconUrl() {
      let e = null;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.url == "string" && (e = this.rightIcon.url), e;
    },
    rightIconSpin() {
      let e = !1;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.spin == "boolean" && (e = this.rightIcon.spin), e;
    },
    rightIconSize() {
      let e = null;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.size == "string" && (e = this.rightIcon.size), e;
    },
    rightIconColor() {
      let e = null;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.color == "string" && (e = this.rightIcon.color), e;
    },
    computedType() {
      return this.type == "number" ? "text" : this.type;
    },
    computedInputMode() {
      let e = !1;
      return typeof this.inputMode == "string" && (e = this.inputMode), e;
    },
    inputStyle() {
      let e = {};
      return this.align && (e.textAlign = this.align), (this.leftIconType || this.leftIconUrl) && (e.paddingLeft = 0), (this.showClear && this.clearable || this.rightIconType || this.rightIconUrl) && (e.paddingRight = 0), e;
    },
    realValue: {
      set(e) {
        this.modelValue !== e && this.$emit("update:modelValue", e);
      },
      get() {
        let e = this.modelValue === null ? "" : this.modelValue.toString();
        return this.type == "number" && (e = e.replace(/\D/g, "")), this.maxlength > 0 && e.length > this.maxlength && (e = e.substr(0, this.maxlength)), this.modelValue !== e && this.$emit("update:modelValue", e), e;
      }
    }
  },
  components: {
    mIcon: M
  },
  methods: {
    getFocus() {
      this.disabled || (this.$emit("focus", this.realValue), setTimeout(() => {
        this.focus = !0;
      }, 200));
    },
    getBlur() {
      this.disabled || (this.$emit("blur", this.realValue), setTimeout(() => {
        this.focus = !1;
      }, 200));
    },
    searchInput() {
      this.disabled || this.$emit("input", this.realValue);
    },
    doSearch() {
      this.disabled || this.$emit("search", this.realValue);
    },
    doCancel() {
      this.disabled || this.$emit("cancel", this.realValue);
    },
    leftClick() {
      this.disabled || this.$emit("left-click", this.realValue);
    },
    rightClick() {
      this.disabled || this.$emit("right-click", this.realValue);
    },
    clearInput() {
      this.disabled || !this.clearable || (this.realValue = "", this.$refs.input.focus(), this.$emit("clear", ""));
    }
  }
}, Ns = ["disabled"], Ls = ["textContent"], Us = ["type", "placeholder", "maxlength", "autofocus", "disabled", "readonly", "inputmode"], Xs = ["textContent"];
function qs(e, t, s, r, n, i) {
  const f = x("m-icon");
  return o(), u("div", {
    class: "mvi-search",
    disabled: s.disabled || null
  }, [
    s.label ? (o(), u("div", {
      key: 0,
      class: y(["mvi-search-label", s.labelClass || ""]),
      textContent: _(s.label)
    }, null, 10, Ls)) : g("", !0),
    v("div", {
      class: y(["mvi-search-input-container", s.round ? "mvi-search-input-round" : ""]),
      style: b({ backgroundColor: s.background || "", color: s.color || "" })
    }, [
      i.leftIconType || i.leftIconUrl ? (o(), u("div", {
        key: 0,
        class: "mvi-search-left-icon",
        onClick: t[0] || (t[0] = (...a) => i.leftClick && i.leftClick(...a))
      }, [
        D(f, {
          type: i.leftIconType,
          url: i.leftIconUrl,
          spin: i.leftIconSpin,
          size: i.leftIconSize,
          color: i.leftIconColor
        }, null, 8, ["type", "url", "spin", "size", "color"])
      ])) : g("", !0),
      B(v("input", {
        ref: "input",
        class: "mvi-search-input",
        type: i.computedType,
        onKeypress: t[1] || (t[1] = wt((...a) => i.doSearch && i.doSearch(...a), ["enter"])),
        autocomplete: "off",
        placeholder: s.placeholder,
        maxlength: s.maxlength,
        autofocus: s.autofocus,
        disabled: s.disabled || null,
        readonly: s.readonly || null,
        inputmode: i.computedInputMode,
        "onUpdate:modelValue": t[2] || (t[2] = (a) => i.realValue = a),
        onInput: t[3] || (t[3] = (...a) => i.searchInput && i.searchInput(...a)),
        onFocus: t[4] || (t[4] = (...a) => i.getFocus && i.getFocus(...a)),
        onBlur: t[5] || (t[5] = (...a) => i.getBlur && i.getBlur(...a)),
        style: b(i.inputStyle)
      }, null, 44, Us), [
        [we, i.realValue]
      ]),
      s.clearable ? B((o(), u("div", {
        key: 1,
        class: "mvi-search-clear",
        onClick: t[6] || (t[6] = (...a) => i.clearInput && i.clearInput(...a))
      }, [
        D(f, { type: "times-o" })
      ], 512)), [
        [j, i.showClear]
      ]) : g("", !0),
      i.rightIconType || i.rightIconUrl ? (o(), u("div", {
        key: 2,
        class: "mvi-search-right-icon",
        onClick: t[7] || (t[7] = (...a) => i.rightClick && i.rightClick(...a))
      }, [
        D(f, {
          type: i.rightIconType,
          url: i.rightIconUrl,
          spin: i.rightIconSpin,
          size: i.rightIconSize,
          color: i.rightIconColor
        }, null, 8, ["type", "url", "spin", "size", "color"])
      ])) : g("", !0)
    ], 6),
    s.showCancel ? (o(), u("div", {
      key: 1,
      textContent: _(s.cancelText),
      class: y(["mvi-search-cancel", s.cancelClass || ""]),
      onClick: t[8] || (t[8] = (...a) => i.doCancel && i.doCancel(...a))
    }, null, 10, Xs)) : g("", !0)
  ], 8, Ns);
}
const De = /* @__PURE__ */ T(Ys, [["render", qs], ["__scopeId", "data-v-2c951a7a"]]);
De.install = (e) => {
  e.component(De.name, De);
};
const Gs = {
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
      default: !1
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
      default: !1
    },
    square: {
      type: Boolean,
      default: !1
    },
    animation: {
      type: Boolean,
      default: !1
    },
    timeout: {
      type: Number,
      default: 400
    }
  },
  computed: {
    progressStyle() {
      let e = {};
      return this.strokeWidth && (e.height = this.strokeWidth), this.trackColor && (e.backgroundColor = this.trackColor), e;
    },
    progressBarStyle() {
      let e = {};
      return this.animation && (e.transition = "width " + this.timeout + "ms,border-radius " + this.timeout + "ms", e.webkitTransition = "width " + this.timeout + "ms,border-radius " + this.timeout + "ms"), this.color && (e.backgroundColor = this.color), this.value == this.max && (e.borderRadius = "inherit"), e.width = `calc(${(this.value - this.min < 0 ? 0 : this.value - this.min) / (this.max - this.min)} * 100%)`, e;
    },
    computedText() {
      return this.tipText ? this.tipText : Math.round(
        (this.value - this.min < 0 ? 0 : this.value - this.min) / (this.max - this.min) * 100
      ) + "%";
    },
    tipStyle() {
      let e = {};
      return this.tipColor && (e.color = this.tipColor), e;
    },
    barClass() {
      let e = ["mvi-progress-bar"];
      return this.round ? e.push("mvi-progress-radius-round") : this.square && e.push("mvi-progress-radius-square"), e;
    },
    progressClass() {
      let e = ["mvi-progress"];
      return this.round ? e.push("mvi-progress-radius-round") : this.square && e.push("mvi-progress-radius-square"), e;
    }
  }
}, Zs = ["textContent"];
function Ks(e, t, s, r, n, i) {
  return o(), u("div", {
    class: y(i.progressClass),
    style: b(i.progressStyle)
  }, [
    v("div", {
      class: y(i.barClass),
      style: b(i.progressBarStyle)
    }, [
      s.showTip ? (o(), u("div", {
        key: 0,
        class: "mvi-progress-tooltip",
        style: b(i.tipStyle)
      }, [
        e.$slots.tip ? S(e.$slots, "tip", {
          key: 0,
          value: s.value
        }, void 0, !0) : (o(), u("span", {
          key: 1,
          textContent: _(i.computedText)
        }, null, 8, Zs))
      ], 4)) : g("", !0)
    ], 6)
  ], 6);
}
const Pe = /* @__PURE__ */ T(Gs, [["render", Ks], ["__scopeId", "data-v-261bea9f"]]);
Pe.install = (e) => {
  e.component(Pe.name, Pe);
};
const Js = {
  name: "m-slider",
  data() {
    return {
      drag: null,
      isdrag: !1
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
      default: !1
    },
    vertical: {
      type: Boolean,
      default: !1
    },
    round: {
      type: Boolean,
      default: !1
    },
    square: {
      type: Boolean,
      default: !1
    },
    buttonClass: {
      type: String,
      default: null
    }
  },
  computed: {
    sliderStyle() {
      let e = {};
      return this.barHeight && (this.vertical ? e.width = this.barHeight : e.height = this.barHeight), this.barColor && (e.backgroundColor = this.barColor), e;
    },
    sliderBarStyle() {
      let e = {};
      this.activeColor && (e.backgroundColor = this.activeColor);
      let t = l.number.divide(
        l.number.subtract(this.modelValue, this.min),
        l.number.subtract(this.max, this.min)
      );
      return this.vertical ? e.height = `calc(${t} * 100%)` : e.width = `calc(${t} * 100%)`, e;
    },
    buttonElStyle() {
      let e = {};
      return this.barHeight && (e.width = `calc(${this.barHeight} * 2)`, e.height = `calc(${this.barHeight} * 2)`), e;
    },
    sliderClass() {
      let e = ["mvi-slider"];
      return this.round ? e.push("mvi-slider-radius-round") : this.square && e.push("mvi-slider-radius-square"), this.vertical && e.push("mvi-slider-vertical"), e;
    }
  },
  mounted() {
    this.setBtnOffset(), this.drag = new ie(this.$refs.btn, {
      container: this.$el,
      mode: "on",
      draggableY: this.vertical && !this.disabled,
      draggableX: !this.vertical && !this.disabled,
      cursor: !1,
      drag: this.onDrag,
      dragged: () => {
        this.$nextTick(() => {
          setTimeout(() => {
            this.isdrag = !1;
          }, 10);
        });
      }
    }), this.drag.init();
  },
  watch: {
    disabled(e) {
      this.drag && (e ? this.vertical ? this.drag.draggableY = !1 : this.drag.draggableX = !1 : this.vertical ? this.drag.draggableY = !0 : this.drag.draggableX = !0);
    },
    vertical(e) {
      this.$nextTick(() => {
        this.setBtnOffset();
      });
    },
    modelValue(e) {
      this.isdrag || this.setBtnOffset();
    }
  },
  methods: {
    onDrag(e) {
      if (this.isdrag = !0, this.vertical) {
        let t = e.placement.top, s = l.number.add(
          l.number.mutiply(
            l.number.divide(
              l.number.add(
                t,
                l.number.divide(
                  this.$refs.btn.offsetHeight,
                  2
                )
              ),
              this.$el.offsetHeight
            ),
            l.number.subtract(this.max, this.min)
          ),
          this.min
        );
        this.$emit("update:modelValue", s), this.$emit("change", s);
      } else {
        let t = e.placement.left, s = l.number.add(
          l.number.mutiply(
            l.number.divide(
              l.number.add(
                t,
                l.number.divide(
                  this.$refs.btn.offsetWidth,
                  2
                )
              ),
              this.$el.offsetWidth
            ),
            l.number.subtract(this.max - this.min)
          ),
          this.min
        );
        this.$emit("update:modelValue", s), this.$emit("change", s);
      }
    },
    setBtnOffset() {
      this.vertical ? (this.$refs.btn.style.left = "50%", this.$refs.btn.style.top = l.number.subtract(
        l.number.mutiply(
          l.number.divide(
            l.number.subtract(this.modelValue, this.min),
            l.number.subtract(this.max - this.min)
          ),
          this.$el.offsetHeight
        ),
        l.number.divide(this.$refs.btn.offsetHeight, 2)
      ) + "px") : (this.$refs.btn.style.top = "50%", this.$refs.btn.style.left = l.number.subtract(
        l.number.mutiply(
          l.number.divide(
            l.number.subtract(this.modelValue, this.min),
            l.number.subtract(this.max - this.min)
          ),
          this.$el.offsetWidth
        ),
        l.number.divide(this.$refs.btn.offsetWidth, 2)
      ) + "px");
    },
    dragTo(e) {
      if (!this.disabled && !this.isdrag && !l.element.isContains(this.$refs.btn, e.target))
        if (this.vertical) {
          let t = e.offsetY, s = l.number.add(
            l.number.mutiply(
              l.number.divide(t, this.$el.offsetHeight),
              l.number.subtract(this.max, this.min)
            ),
            this.min
          );
          this.$emit("update:modelValue", s), this.$emit("change", s);
        } else {
          let t = e.offsetX, s = l.number.add(
            l.number.mutiply(
              l.number.divide(t, this.$el.offsetWidth),
              l.number.subtract(this.max, this.min)
            ),
            this.min
          );
          this.$emit("update:modelValue", s), this.$emit("change", s);
        }
    }
  },
  beforeUnmount() {
    this.drag && this.drag._setOff();
  }
}, Qs = ["disabled"], el = {
  class: "mvi-slider-button",
  ref: "btn"
};
function tl(e, t, s, r, n, i) {
  return o(), u("div", {
    disabled: s.disabled || null,
    class: y(i.sliderClass),
    style: b(i.sliderStyle),
    onClick: t[0] || (t[0] = (...f) => i.dragTo && i.dragTo(...f))
  }, [
    v("div", {
      ref: "bar",
      class: "mvi-slider-bar",
      style: b(i.sliderBarStyle)
    }, null, 4),
    v("div", el, [
      e.$slots.button ? S(e.$slots, "button", { key: 0 }, void 0, !0) : (o(), u("div", {
        key: 1,
        class: y(["mvi-slider-button-el", s.buttonClass || ""]),
        style: b(i.buttonElStyle)
      }, null, 6))
    ], 512)
  ], 14, Qs);
}
const ze = /* @__PURE__ */ T(Js, [["render", tl], ["__scopeId", "data-v-f79462b1"]]);
ze.install = (e) => {
  e.component(ze.name, ze);
};
const il = {
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
      validator(e) {
        return ["small", "medium", "large"].includes(e);
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
      default: !1
    },
    disabledPlus: {
      type: Boolean,
      default: !1
    },
    disabledMinus: {
      type: Boolean,
      default: !1
    },
    disabledInput: {
      type: Boolean,
      default: !1
    },
    showPlus: {
      type: Boolean,
      default: !0
    },
    showMinus: {
      type: Boolean,
      default: !0
    },
    showInput: {
      type: Boolean,
      default: !0
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
      default: !0
    },
    inputAlign: {
      type: String,
      default: "center",
      validator(e) {
        return ["left", "center", "right"].includes(e);
      }
    },
    border: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    arrivalMin() {
      return this.min != null ? this.realValue <= this.min : !1;
    },
    arrivalMax() {
      return this.max != null ? this.realValue >= this.max : !1;
    },
    inputStyle() {
      let e = {};
      return this.inputWidth && (e.width = this.inputWidth), this.color && (e.color = this.color), this.background && (e.backgroundColor = this.background), e;
    },
    inputElStyle() {
      let e = {};
      return this.inputAlign && (e.textAlign = this.inputAlign), e;
    },
    minusStyle() {
      let e = {};
      return this.color && (e.color = this.color), this.background && (e.backgroundColor = this.background), e;
    },
    plusStyle() {
      let e = {};
      return this.color && (e.color = this.color), this.background && (e.backgroundColor = this.background), e;
    },
    minusClass() {
      let e = ["mvi-stepper-minus"];
      return !(this.disabledMinus || this.arrivalMin || this.disabled) && this.active && e.push("mvi-stepper-active"), this.border && e.push("mvi-stepper-border"), e;
    },
    plusClass() {
      let e = ["mvi-stepper-plus"];
      return !(this.disabledPlus || this.arrivalMax || this.disabled) && this.active && e.push("mvi-stepper-active"), this.border && e.push("mvi-stepper-border"), e;
    },
    realValue: {
      set(e) {
        let t = this.updateValue(e);
        this.modelValue !== t && this.$emit("update:modelValue", t);
      },
      get() {
        return this.modelValue;
      }
    }
  },
  components: {
    mIcon: M
  },
  methods: {
    doMinus() {
      this.disabled || this.disabledMinus || this.arrivalMin || (this.realValue = l.number.subtract(this.realValue, this.step));
    },
    doPlus() {
      this.disabled || this.disabledPlus || this.arrivalMax || (this.realValue = l.number.add(this.realValue, this.step));
    },
    changeValue() {
      this.disabled || this.disabledInput || (this.$refs.input.value = this.realValue);
    },
    updateValue(e) {
      let t = parseFloat(e);
      return isNaN(t) && (t = 0), t = Number(t.toFixed(this.digit)), t <= this.min && this.min != null && (t = this.min), t >= this.max && this.max != null && (t = this.max), t;
    }
  }
}, sl = ["disabled"], ll = ["disabled"], rl = ["disabled"], nl = ["disabled"];
function ol(e, t, s, r, n, i) {
  const f = x("m-icon");
  return o(), u("div", {
    class: y("mvi-stepper mvi-stepper-" + s.size)
  }, [
    s.showMinus ? (o(), u("div", {
      key: 0,
      disabled: s.disabledMinus || i.arrivalMin || s.disabled || null,
      class: y(i.minusClass),
      style: b(i.minusStyle),
      onClick: t[0] || (t[0] = (...a) => i.doMinus && i.doMinus(...a))
    }, [
      D(f, { type: "minus" })
    ], 14, sl)) : g("", !0),
    s.showInput ? (o(), u("div", {
      key: 1,
      disabled: s.disabled || s.disabledInput || null,
      class: y(["mvi-stepper-input", s.border ? "mvi-stepper-border" : ""]),
      style: b(i.inputStyle)
    }, [
      B(v("input", {
        ref: "input",
        "onUpdate:modelValue": t[1] || (t[1] = (a) => i.realValue = a),
        disabled: s.disabled || s.disabledInput || null,
        type: "text",
        onBlur: t[2] || (t[2] = (...a) => i.changeValue && i.changeValue(...a)),
        onKeyup: t[3] || (t[3] = wt((...a) => i.changeValue && i.changeValue(...a), ["enter"])),
        style: b(i.inputElStyle),
        inputmode: "numeric"
      }, null, 44, rl), [
        [J, i.realValue]
      ])
    ], 14, ll)) : g("", !0),
    s.showPlus ? (o(), u("div", {
      key: 2,
      disabled: s.disabledPlus || i.arrivalMax || s.disabled || null,
      class: y(i.plusClass),
      style: b(i.plusStyle),
      onClick: t[4] || (t[4] = (...a) => i.doPlus && i.doPlus(...a))
    }, [
      D(f, { type: "plus" })
    ], 14, nl)) : g("", !0)
  ], 2);
}
const Ae = /* @__PURE__ */ T(il, [["render", ol], ["__scopeId", "data-v-467ea58a"]]);
Ae.install = (e) => {
  e.component(Ae.name, Ae);
};
const al = {
  name: "m-switch",
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
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
    mIcon: M
  },
  methods: {
    change(e) {
      let t = e.target.checked;
      this.$emit("update:modelValue", t), this.$emit("change", t);
    }
  },
  computed: {
    iconType() {
      let e = "load-e";
      return l.common.isObject(this.icon) ? typeof this.icon.type == "string" && (e = this.icon.type) : typeof this.icon == "string" && (e = this.icon), e;
    },
    iconUrl() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.url == "string" && (e = this.icon.url), e;
    },
    iconSpin() {
      let e = !0;
      return l.common.isObject(this.icon) && typeof this.icon.spin == "boolean" && (e = this.icon.spin), e;
    },
    iconSize() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.size == "string" && (e = this.icon.size), e;
    },
    iconColor() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.color == "string" && (e = this.icon.color), e;
    },
    switchStyle() {
      let e = {};
      return this.inactiveColor && !this.modelValue && (e.backgroundColor = this.inactiveColor), this.activeColor && this.modelValue && (e.backgroundColor = this.activeColor), this.size && (e.width = `calc(${this.size} * 2)`), e;
    },
    elStyle() {
      let e = {};
      return this.activeColor && (e.color = this.activeColor), this.size && (e.width = this.size, e.height = this.size, e.fontSize = this.size), e;
    }
  }
}, hl = ["disabled"], ul = ["checked", "disabled"];
function dl(e, t, s, r, n, i) {
  const f = x("m-icon");
  return o(), u("label", {
    class: y(["mvi-switch", s.modelValue ? "mvi-switch-checked" : ""]),
    style: b(i.switchStyle),
    disabled: s.disabled || null
  }, [
    v("span", {
      class: y(["mvi-switch-el", s.modelValue ? "mvi-switch-el-checked" : ""]),
      style: b(i.elStyle)
    }, [
      s.loading && !s.disabled ? (o(), I(f, {
        key: 0,
        type: i.iconType,
        spin: i.iconSpin,
        url: i.iconUrl,
        size: i.iconSize,
        color: i.iconColor
      }, null, 8, ["type", "spin", "url", "size", "color"])) : g("", !0)
    ], 6),
    v("input", {
      onChange: t[0] || (t[0] = (...a) => i.change && i.change(...a)),
      type: "checkbox",
      checked: s.modelValue,
      disabled: s.disabled || s.loading || null
    }, null, 40, ul)
  ], 14, hl);
}
const Ee = /* @__PURE__ */ T(al, [["render", dl], ["__scopeId", "data-v-e3d0f077"]]);
Ee.install = (e) => {
  e.component(Ee.name, Ee);
};
const cl = {
  name: "m-actionsheet",
  emits: ["update:modelValue", "select"],
  props: {
    modelValue: {
      type: Boolean,
      default: !1
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
      default: !0
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
      default: !0
    },
    options: {
      type: Array,
      default: function() {
        return [];
      }
    },
    showCancel: {
      type: Boolean,
      default: !0
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
      default: !0
    },
    mountEl: {
      type: String,
      default: null
    },
    selectClose: {
      type: Boolean,
      default: !0
    },
    usePadding: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: "medium",
      validator(e) {
        return ["medium", "large"].includes(e);
      }
    }
  },
  computed: {
    $$el() {
      return this.$refs.popup.$$el;
    },
    iconType() {
      return (e) => {
        let t = null;
        return l.common.isObject(e) ? typeof e.type == "string" && (t = e.type) : typeof e == "string" && (t = e), t;
      };
    },
    iconUrl() {
      return (e) => {
        let t = null;
        return l.common.isObject(e) && typeof e.url == "string" && (t = e.url), t;
      };
    },
    iconSpin() {
      return (e) => {
        let t = !1;
        return l.common.isObject(e) && typeof e.spin == "boolean" && (t = e.spin), t;
      };
    },
    iconSize() {
      return (e) => {
        let t = null;
        return l.common.isObject(e) && typeof e.size == "string" && (t = e.size), t;
      };
    },
    iconColor() {
      return (e) => {
        let t = null;
        return l.common.isObject(e) && typeof e.color == "string" && (t = e.color), t;
      };
    },
    itemClass() {
      return (e) => {
        let t = [
          "mvi-acionsheet-item",
          "mvi-actionsheet-item-" + this.size
        ];
        return e.class && t.push(e.class), this.active && !e.loading && !e.disabled && t.push("mvi-acionsheet-active"), t;
      };
    },
    itemStyle() {
      return (e) => {
        let t = {};
        return this.itemDisabled(e) || (e.color ? t.color = e.color : this.color && (t.color = this.color)), t;
      };
    },
    itemDisabled() {
      return (e) => typeof e.disabled == "boolean" ? e.disabled : !1;
    }
  },
  components: {
    mIcon: M,
    mLoading: te,
    mPopup: se
  },
  methods: {
    hide(e) {
      this.closable && this.doCancel();
    },
    doCancel() {
      this.$emit("update:modelValue", !1);
    },
    doSelect(e, t) {
      e.disabled || e.loading || (this.selectClose && this.$emit("update:modelValue", !1), this.$emit("select", {
        item: Object.assign({}, e),
        index: t
      }));
    }
  }
}, fl = (e) => (Ct("data-v-e1a9fbc6"), e = e(), xt(), e), ml = { class: "mvi-acionsheet" }, pl = ["textContent"], gl = { class: "mvi-acionsheet-list" }, yl = ["disabled", "onClick"], bl = {
  key: 1,
  class: "mvi-acionsheet-content"
}, vl = ["textContent"], wl = ["textContent"], Cl = /* @__PURE__ */ fl(() => /* @__PURE__ */ v("div", { class: "mvi-acionsheet-divider" }, null, -1)), xl = ["textContent"];
function Il(e, t, s, r, n, i) {
  const f = x("m-loading"), a = x("m-icon"), c = x("m-popup");
  return o(), I(c, {
    ref: "popup",
    "model-value": s.modelValue,
    onOverlayClick: i.hide,
    "overlay-color": s.overlayColor,
    "z-index": s.zIndex,
    timeout: s.timeout,
    placement: "bottom",
    round: s.round,
    "use-padding": s.usePadding,
    "mount-el": s.mountEl
  }, {
    default: P(() => [
      v("div", ml, [
        s.title ? (o(), u("div", {
          key: 0,
          class: "mvi-acionsheet-title",
          style: b({ color: s.titleColor || "" })
        }, [
          v("span", {
            textContent: _(s.title)
          }, null, 8, pl)
        ], 4)) : g("", !0),
        v("div", gl, [
          (o(!0), u(A, null, O(s.options, (d, h) => (o(), u("div", {
            class: y(i.itemClass(d)),
            style: b(i.itemStyle(d)),
            key: "action-" + h,
            disabled: i.itemDisabled(d) || null,
            onClick: (m) => i.doSelect(d, h)
          }, [
            d.loading ? (o(), I(f, {
              key: 0,
              size: s.size == "large" ? "0.4rem" : "0.36rem",
              color: "#bbb"
            }, null, 8, ["size"])) : d.label || d.sub || i.iconType(d.icon) || i.iconUrl(d.icon) ? (o(), u("div", bl, [
              (i.iconType(d.icon) || i.iconUrl(d.icon)) && d.placement != "right" ? (o(), I(a, {
                key: 0,
                "data-placement": "left",
                type: i.iconType(d.icon),
                url: i.iconUrl(d.icon),
                spin: i.iconSpin(d.icon),
                size: i.iconSize(d.icon),
                color: i.iconColor(d.icon)
              }, null, 8, ["type", "url", "spin", "size", "color"])) : g("", !0),
              d.label ? (o(), u("span", {
                key: 1,
                class: "mvi-actionsheet-item-label",
                textContent: _(d.label)
              }, null, 8, vl)) : g("", !0),
              d.sub ? (o(), u("span", {
                key: 2,
                class: "mvi-acionsheet-item-sub",
                textContent: _(d.sub)
              }, null, 8, wl)) : g("", !0),
              (i.iconType(d.icon) || i.iconUrl(d.icon)) && d.placement == "right" ? (o(), I(a, {
                key: 3,
                "data-placement": "right",
                type: i.iconType(d.icon),
                url: i.iconUrl(d.icon),
                spin: i.iconSpin(d.icon),
                size: i.iconSize(d.icon),
                color: i.iconColor(d.icon)
              }, null, 8, ["type", "url", "spin", "size", "color"])) : g("", !0)
            ])) : g("", !0)
          ], 14, yl))), 128))
        ]),
        Cl,
        s.showCancel ? (o(), u("div", {
          key: 1,
          class: y(["mvi-acionsheet-button", s.active ? "mvi-acionsheet-active" : ""]),
          textContent: _(s.cancelText),
          onClick: t[0] || (t[0] = (...d) => i.doCancel && i.doCancel(...d)),
          style: b({ color: s.cancelColor || "" })
        }, null, 14, xl)) : g("", !0)
      ])
    ]),
    _: 1
  }, 8, ["model-value", "onOverlayClick", "overlay-color", "z-index", "timeout", "round", "use-padding", "mount-el"]);
}
const Me = /* @__PURE__ */ T(cl, [["render", Il], ["__scopeId", "data-v-e1a9fbc6"]]);
Me.install = (e) => {
  e.component(Me.name, Me);
};
const Sl = {
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
      default: !0
    },
    selectIcon: {
      type: [String, Object],
      default: null
    },
    show: {
      type: Boolean,
      default: !1
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
      default: !1
    },
    placement: {
      type: String,
      default: "top"
    },
    closable: {
      type: Boolean,
      default: !0
    },
    mountEl: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: !0
    },
    usePadding: {
      type: Boolean,
      default: !1
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
      let e = "success";
      return l.common.isObject(this.selectIcon) ? typeof this.selectIcon.type == "string" && (e = this.selectIcon.type) : typeof this.selectIcon == "string" && (e = this.selectIcon), e;
    },
    selectIconUrl() {
      let e = null;
      return l.common.isObject(this.selectIcon) && typeof this.selectIcon.url == "string" && (e = this.selectIcon.url), e;
    },
    selectIconSpin() {
      let e = !1;
      return l.common.isObject(this.selectIcon) && typeof this.selectIcon.spin == "boolean" && (e = this.selectIcon.spin), e;
    },
    selectIconSize() {
      let e = null;
      return l.common.isObject(this.selectIcon) && typeof this.selectIcon.size == "string" && (e = this.selectIcon.size), e;
    },
    selectIconColor() {
      let e = null;
      return l.common.isObject(this.selectIcon) && typeof this.selectIcon.color == "string" && (e = this.selectIcon.color), e;
    },
    iconType() {
      return (e) => {
        let t = null;
        return l.common.isObject(e) ? typeof e.type == "string" && (t = e.type) : typeof e == "string" && (t = e), t;
      };
    },
    iconUrl() {
      return (e) => {
        let t = null;
        return l.common.isObject(e) && typeof e.url == "string" && (t = e.url), t;
      };
    },
    iconSpin() {
      return (e) => {
        let t = !1;
        return l.common.isObject(e) && typeof e.spin == "boolean" && (t = e.spin), t;
      };
    },
    iconSize() {
      return (e) => {
        let t = null;
        return l.common.isObject(e) && typeof e.size == "string" && (t = e.size), t;
      };
    },
    iconColor() {
      return (e) => {
        let t = null;
        return l.common.isObject(e) && typeof e.color == "string" && (t = e.color), t;
      };
    },
    equalValue() {
      return (e, t) => e.value === void 0 || e.value === null ? this.modelValue === t : l.common.equal(this.modelValue, e.value);
    },
    itemDisabled() {
      return (e) => typeof e.disabled == "boolean" ? e.disabled : !1;
    },
    dropdownItemStyle() {
      return (e, t) => {
        let s = {};
        return this.itemDisabled(e) || (this.equalValue(e, t) ? this.activeColor && (s.color = this.activeColor) : this.inactiveColor && (s.color = this.inactiveColor)), s;
      };
    },
    dropdownItemClass() {
      return (e, t) => {
        let s = ["mvi-dropdown-item"];
        return e.class ? s.push(e.class) : this.itemClass && s.push(this.itemClass), this.equalValue(e, t) && s.push("mvi-dropdown-checked"), this.active && !e.disabled && s.push("mvi-dropdown-active"), s;
      };
    }
  },
  components: {
    mIcon: M,
    mPopup: se
  },
  mounted() {
    this.oldIndex = this.modelValue;
  },
  methods: {
    hide() {
      this.closable && this.doCancel();
    },
    doCancel() {
      this.$emit("update:show", !1);
    },
    doSelect(e, t) {
      e.disabled || (l.common.equal(
        this.valueFilter(e.value, t),
        this.oldIndex
      ) ? (this.$emit("select", {
        item: Object.assign({}, e),
        index: t
      }), this.selectClose && this.doCancel()) : (this.$emit(
        "update:modelValue",
        this.valueFilter(e.value, t)
      ), this.$emit("select", {
        item: Object.assign({}, e),
        index: t
      }), this.selectClose && this.doCancel(), this.oldIndex = this.valueFilter(e.value, t)));
    },
    valueFilter(e, t) {
      return e == null ? t : e;
    }
  }
}, _l = { class: "mvi-dropdown" }, Tl = ["disabled", "onClick"], kl = { class: "mvi-dropdown-item-label" }, Dl = ["textContent"], Pl = ["data-placement"];
function zl(e, t, s, r, n, i) {
  const f = x("m-icon"), a = x("m-popup");
  return o(), I(a, {
    ref: "popup",
    "model-value": s.show,
    onOverlayClick: i.hide,
    "overlay-color": s.overlayColor,
    "z-index": s.zIndex,
    timeout: s.timeout,
    placement: s.placement,
    round: s.round,
    "use-padding": s.usePadding,
    "mount-el": s.mountEl
  }, {
    default: P(() => [
      v("div", _l, [
        (o(!0), u(A, null, O(s.options, (c, d) => (o(), u("div", {
          disabled: i.itemDisabled(c) || null,
          class: y(i.dropdownItemClass(c, d)),
          key: "item-" + d,
          onClick: (h) => i.doSelect(c, d),
          style: b(i.dropdownItemStyle(c, d))
        }, [
          v("div", kl, [
            c.icon ? (o(), I(f, {
              key: 0,
              type: i.iconType(c.icon),
              url: i.iconUrl(c.icon),
              spin: i.iconSpin(c.icon),
              class: "mvi-dropdown-icon",
              size: i.iconSize(c.icon),
              color: i.iconColor(c.icon)
            }, null, 8, ["type", "url", "spin", "size", "color"])) : g("", !0),
            v("span", {
              class: "mvi-dropdown-label-text",
              textContent: _(c.label || "")
            }, null, 8, Dl)
          ]),
          i.equalValue(c, d) ? (o(), u("div", {
            key: 0,
            class: "mvi-dropdown-item-checked",
            "data-placement": s.placement
          }, [
            D(f, {
              type: i.selectIconType,
              url: i.selectIconUrl,
              spin: i.selectIconSpin,
              size: i.selectIconSize,
              color: i.selectIconColor
            }, null, 8, ["type", "url", "spin", "size", "color"])
          ], 8, Pl)) : g("", !0)
        ], 14, Tl))), 128))
      ])
    ]),
    _: 1
  }, 8, ["model-value", "onOverlayClick", "overlay-color", "z-index", "timeout", "placement", "round", "use-padding", "mount-el"]);
}
const Be = /* @__PURE__ */ T(Sl, [["render", zl], ["__scopeId", "data-v-7d60343d"]]);
Be.install = (e) => {
  e.component(Be.name, Be);
};
const Al = {
  name: "m-notify",
  data() {
    return {
      timer: null,
      show: !1
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
      return ["success", "info", "primary", "error", "warn"].includes(this.type) ? this.type : "success";
    },
    computedMessage() {
      return typeof this.message == "string" ? this.message : l.common.isObject(this.message) ? JSON.stringify(this.message) : String(this.message);
    },
    computedColor() {
      return typeof this.color == "string" ? this.color : null;
    },
    computedBackground() {
      return typeof this.background == "string" ? this.background : null;
    },
    computedZIndex() {
      return l.number.isNumber(this.zIndex) ? this.zIndex : 1100;
    },
    computedTimeout() {
      return l.number.isNumber(this.timeout) && this.timeout > 0 ? this.timeout : 1500;
    },
    iconType() {
      let e = null;
      return l.common.isObject(this.icon) ? typeof this.icon.type == "string" && (e = this.icon.type) : typeof this.icon == "string" && (e = this.icon), e;
    },
    iconUrl() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.url == "string" && (e = this.icon.url), e;
    },
    iconSpin() {
      let e = !1;
      return l.common.isObject(this.icon) && typeof this.icon.spin == "boolean" && (e = this.icon.spin), e;
    },
    iconSize() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.size == "string" && (e = this.icon.size), e;
    },
    iconColor() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.color == "string" && (e = this.icon.color), e;
    },
    notifyStyle() {
      let e = {};
      return e.zIndex = this.computedZIndex, this.computedBackground && (e.backgroundColor = this.computedBackground), this.computedColor && (e.color = this.computedColor), e;
    }
  },
  components: {
    mIcon: M
  },
  mounted() {
    this.show = !0, this.init(this);
  },
  methods: {
    afterEnter(e) {
      this.computedTimeout > 0 && (this.timer = setTimeout(() => {
        this.show = !1;
      }, this.computedTimeout));
    },
    afterLeave(e) {
      this.clearTimer(), this.remove();
    },
    clearTimer() {
      this.timer && (clearTimeout(this.timer), this.timer = null);
    }
  }
}, El = { class: "mvi-notify-content" }, Ml = ["textContent"];
function Bl(e, t, s, r, n, i) {
  const f = x("m-icon");
  return o(), I(at, { to: "body" }, [
    D(G, {
      name: "mvi-notify",
      onAfterLeave: i.afterLeave,
      onAfterEnter: i.afterEnter
    }, {
      default: P(() => [
        B(v("div", {
          class: y(["mvi-notify", "mvi-notify-" + i.computedType]),
          style: b(i.notifyStyle)
        }, [
          v("div", El, [
            i.iconType || i.iconUrl ? (o(), I(f, {
              key: 0,
              type: i.iconType,
              url: i.iconUrl,
              spin: i.iconSpin,
              size: i.iconSize,
              color: i.iconColor
            }, null, 8, ["type", "url", "spin", "size", "color"])) : g("", !0),
            v("span", {
              textContent: _(i.computedMessage)
            }, null, 8, Ml)
          ])
        ], 6), [
          [j, n.show]
        ])
      ]),
      _: 1
    }, 8, ["onAfterLeave", "onAfterEnter"])
  ]);
}
const Ol = /* @__PURE__ */ T(Al, [["render", Bl], ["__scopeId", "data-v-b0790e8a"]]), Y = {
  initParams: (e) => {
    let t = {};
    return l.common.isObject(e) ? (t.type = e.type, t.message = e.message, t.timeout = e.timeout, t.background = e.background, t.color = e.color, t.zIndex = e.zIndex, t.icon = e.icon) : t.message = e, t;
  },
  showNotify: (e) => new Promise((t, s) => {
    Y.$el && Y.$instance && (Y.$instance.unmount(), Y.$el.remove());
    let r = Y.initParams(e), n = l.element.string2dom("<div></div>");
    document.body.appendChild(n);
    const i = K(Ol, {
      ...r,
      init: (f) => {
        Y.$vm = f;
      },
      remove: () => {
        i.unmount(), n.remove(), t();
      }
    });
    i.mount(n), Y.$el = n, Y.$instance = i;
  }),
  hideNotify: () => {
    Y.$vm && (Y.$vm.show = !1);
  },
  install: (e) => {
    e.config.globalProperties.$showNotify = Y.showNotify, e.provide("$showNotify", Y.showNotify), e.config.globalProperties.$hideNotify = Y.hideNotify, e.provide("$hideNotify", Y.hideNotify);
  }
};
const Hl = {
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
      hasTouch: !1,
      mouseDown: !1,
      disableScroll: !1
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
      default: !1
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
      default: !1
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
      let e = {};
      return e.height = `calc(100% + ${this.elHeight}px)`, e.transform = `translateY(${this.translateY}px)`, e;
    },
    wrapperStyle() {
      let e = {};
      return e.height = this.rootHeight + "px", this.disableScroll && (e.overflowY = "hidden"), e;
    },
    elStyle() {
      let e = {};
      return this.color && (e.color = this.color), this.pullingColor && this.status == 0 ? e.color = this.pullingColor : this.loosingColor && this.status == 1 ? e.color = this.loosingColor : this.loadingColor && this.status == 2 && (e.color = this.loadingColor), e;
    },
    icon() {
      if (this.status == 0)
        return {
          type: this.pullingIconType,
          spin: this.pullingIconSpin,
          url: this.pullingIconUrl,
          size: this.pullingIconSize,
          color: this.pullingIconColor
        };
      if (this.status == 1)
        return {
          type: this.loosingIconType,
          spin: this.loosingIconSpin,
          url: this.loosingIconUrl,
          size: this.loosingIconSize,
          color: this.loosingIconColor
        };
      if (this.status == 2)
        return {
          type: this.loadingIconType,
          spin: this.loadingIconSpin,
          url: this.loadingIconUrl,
          size: this.loadingIconSize,
          color: this.loadingIconColor
        };
    },
    message() {
      if (this.status == 0)
        return this.pullingText;
      if (this.status == 1)
        return this.loosingText;
      if (this.status == 2)
        return this.loadingText;
    },
    pullingIconType() {
      let e = "arrow-down";
      return l.common.isObject(this.pullingIcon) ? typeof this.pullingIcon.type == "string" && (e = this.pullingIcon.type) : typeof this.pullingIcon == "string" && (e = this.pullingIcon), e;
    },
    pullingIconUrl() {
      let e = null;
      return l.common.isObject(this.pullingIcon) && typeof this.pullingIcon.url == "string" && (e = this.pullingIcon.url), e;
    },
    pullingIconSpin() {
      let e = !1;
      return l.common.isObject(this.pullingIcon) && typeof this.pullingIcon.spin == "boolean" && (e = this.pullingIcon.spin), e;
    },
    pullingIconSize() {
      let e = null;
      return l.common.isObject(this.pullingIcon) && typeof this.pullingIcon.size == "string" && (e = this.pullingIcon.size), e;
    },
    pullingIconColor() {
      let e = null;
      return l.common.isObject(this.pullingIcon) && typeof this.pullingIcon.color == "string" && (e = this.pullingIcon.color), e;
    },
    loosingIconType() {
      let e = "arrow-up";
      return l.common.isObject(this.loosingIcon) ? typeof this.loosingIcon.type == "string" && (e = this.loosingIcon.type) : typeof this.loosingIcon == "string" && (e = this.loosingIcon), e;
    },
    loosingIconUrl() {
      let e = null;
      return l.common.isObject(this.loosingIcon) && typeof this.loosingIcon.url == "string" && (e = this.loosingIcon.url), e;
    },
    loosingIconSpin() {
      let e = !1;
      return l.common.isObject(this.loosingIcon) && typeof this.loosingIcon.spin == "boolean" && (e = this.loosingIcon.spin), e;
    },
    loosingIconSize() {
      let e = null;
      return l.common.isObject(this.loosingIcon) && typeof this.loosingIcon.size == "string" && (e = this.loosingIcon.size), e;
    },
    loosingIconColor() {
      let e = null;
      return l.common.isObject(this.loosingIcon) && typeof this.loosingIcon.color == "string" && (e = this.loosingIcon.color), e;
    },
    loadingIconType() {
      let e = "load-e";
      return l.common.isObject(this.loadingIcon) ? typeof this.loadingIcon.type == "string" && (e = this.loadingIcon.type) : typeof this.loadingIcon == "string" && (e = this.loadingIcon), e;
    },
    loadingIconUrl() {
      let e = null;
      return l.common.isObject(this.loadingIcon) && typeof this.loadingIcon.url == "string" && (e = this.loadingIcon.url), e;
    },
    loadingIconSpin() {
      let e = !0;
      return l.common.isObject(this.loadingIcon) && typeof this.loadingIcon.spin == "boolean" && (e = this.loadingIcon.spin), e;
    },
    loadingIconSize() {
      let e = null;
      return l.common.isObject(this.loadingIcon) && typeof this.loadingIcon.size == "string" && (e = this.loadingIcon.size), e;
    },
    loadingIconColor() {
      let e = null;
      return l.common.isObject(this.loadingIcon) && typeof this.loadingIcon.color == "string" && (e = this.loadingIcon.color), e;
    }
  },
  components: {
    mIcon: M
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  mounted() {
    this.initHeight(), l.event.on(
      document.body,
      `mousemove.pullRefresh_${this.uid}`,
      this.onPull2
    ), l.event.on(
      document.body,
      `mouseup.pullRefresh_${this.uid}`,
      this.pulled2
    );
  },
  watch: {
    modelValue(e) {
      this.changeStatus();
    }
  },
  methods: {
    initHeight() {
      this.elHeight = this.$refs.el.offsetHeight, this.rootHeight = this.$el.offsetHeight, this.translateY = -this.elHeight;
    },
    startPull(e) {
      this.disabled || this.status == 0 && (this.startY = e.targetTouches[0].pageY, this.firstStartY = this.startY);
    },
    startPull2(e) {
      this.disabled || this.status == 0 && (this.mouseDown = !0, this.startY = e.pageY, this.firstStartY = this.startY);
    },
    onPull(e) {
      if (this.disabled || this.status == 2)
        return;
      let t = e.targetTouches[0].pageY, s = t - this.startY, r = t - this.firstStartY;
      if (this.startY = t, r <= 0) {
        this.firstStartY = this.startY;
        return;
      }
      if (l.element.getScrollTop(this.$refs.wrapper) > 0) {
        this.firstStartY = this.startY;
        return;
      }
      let n = this.getScrollEl(e.target);
      if (n != this.$refs.wrapper && l.element.getScrollTop(n) > 0) {
        this.firstStartY = this.startY;
        return;
      }
      this.hasTouch = !0, e.cancelable && e.preventDefault(), this.amount < this.amountMax && this.amount++;
      let i = this.translateY + s / this.amount;
      i > l.element.rem2px(this.distance) - this.elHeight ? this.status = 1 : this.status = 0, this.translateY = i;
    },
    onPull2(e) {
      if (!this.mouseDown || this.disabled || this.status == 2)
        return;
      let t = e.pageY, s = t - this.startY, r = t - this.firstStartY;
      if (this.startY = t, r <= 0) {
        this.firstStartY = this.startY;
        return;
      }
      if (l.element.getScrollTop(this.$refs.wrapper) > 0) {
        this.firstStartY = this.startY;
        return;
      }
      let n = this.getScrollEl(e.target);
      if (n != this.$refs.wrapper && l.element.getScrollTop(n) > 0) {
        this.firstStartY = this.startY;
        return;
      }
      this.hasTouch = !0, e.cancelable && e.preventDefault(), this.amount < this.amountMax && this.amount++;
      let i = this.translateY + s / this.amount;
      i > l.element.rem2px(this.distance) - this.elHeight ? this.status = 1 : this.status = 0, this.translateY = i;
    },
    pulled(e) {
      this.disabled || (this.status == 1 && this.modelValue == !1 ? this.$emit("update:modelValue", !0) : this.status == 0 && this.changeStatus());
    },
    pulled2(e) {
      !this.mouseDown || this.disabled || (this.mouseDown = !1, this.status == 1 && this.modelValue === !1 ? this.$emit("update:modelValue", !0) : this.status == 0 && this.changeStatus());
    },
    changeStatus() {
      this.disabled || (this.modelValue ? (this.status = 2, this.disableScroll = !0, this.$emit("refresh"), this.hasTouch || (this.$refs.container.style.transition = "transform 300ms", this.$refs.container.style.webkitTransition = "transform 300ms", this.$refs.container.offsetWidth, this.translateY = l.element.rem2px(this.distance) - this.elHeight, setTimeout(() => {
        this.$refs.container && (this.$refs.container.style.transition = "", this.$refs.container.style.webkitTransition = "");
      }, 300))) : (this.amount = 0, this.hasTouch = !1, this.$refs.container.style.transition = "transform 300ms", this.$refs.container.style.webkitTransition = "transform 300ms", this.$refs.container.offsetWidth, this.translateY = -this.elHeight, setTimeout(() => {
        this.$refs.container && (this.$refs.container.style.transition = "", this.$refs.container.style.webkitTransition = ""), this.status = 0, this.disableScroll = !1;
      }, 300)));
    },
    getScrollEl(e) {
      return e === this.$el ? this.$el : l.element.getScrollHeight(e) > e.clientHeight ? e : this.getScrollEl(e.parentNode);
    }
  },
  beforeUnmount() {
    l.event.off(
      document.body,
      `mousemove.pullRefresh_${this.uid} mouseup.pullRefresh_${this.uid}`
    );
  }
}, Vl = { class: "mvi-pull-refresh" }, $l = ["textContent"];
function jl(e, t, s, r, n, i) {
  const f = x("m-icon");
  return o(), u("div", Vl, [
    v("div", {
      ref: "container",
      class: "mvi-pull-refresh-container",
      style: b(i.containerStyle)
    }, [
      v("div", {
        ref: "el",
        class: "mvi-pull-refresh-el",
        style: b(i.elStyle)
      }, [
        e.$slots.el ? S(e.$slots, "el", {
          key: 0,
          status: n.status
        }, void 0, !0) : g("", !0),
        e.$slots.el ? g("", !0) : (o(), I(f, {
          key: 1,
          type: i.icon.type,
          spin: i.icon.spin,
          url: i.icon.url,
          size: i.icon.size,
          color: i.icon.color
        }, null, 8, ["type", "spin", "url", "size", "color"])),
        e.$slots.el ? g("", !0) : (o(), u("span", {
          key: 2,
          class: "mvi-pull-refresh-text",
          textContent: _(i.message)
        }, null, 8, $l))
      ], 4),
      v("div", {
        ref: "wrapper",
        class: "mvi-pull-refresh-wrapper",
        onTouchstart: t[0] || (t[0] = (...a) => i.startPull && i.startPull(...a)),
        onTouchmove: t[1] || (t[1] = (...a) => i.onPull && i.onPull(...a)),
        onTouchend: t[2] || (t[2] = (...a) => i.pulled && i.pulled(...a)),
        onMousedown: t[3] || (t[3] = (...a) => i.startPull2 && i.startPull2(...a)),
        style: b(i.wrapperStyle)
      }, [
        S(e.$slots, "default", {}, void 0, !0)
      ], 36)
    ], 4)
  ]);
}
const Oe = /* @__PURE__ */ T(Hl, [["render", jl], ["__scopeId", "data-v-24c7bdff"]]);
Oe.install = (e) => {
  e.component(Oe.name, Oe);
};
const Wl = {
  name: "m-swipe-cell",
  data() {
    return {
      startX: 0,
      startX2: 0,
      transformX: 0,
      leftShow: !1,
      rightShow: !1,
      amounts: 0,
      mouseDown: !1,
      isDrag: !1
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: !1
    },
    centerClose: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["open", "close"],
  watch: {
    disabled(e, t) {
      this.close(!0);
    }
  },
  computed: {
    cellStyle() {
      let e = {};
      return e.transform = `translateX(${this.transformX}px)`, e;
    }
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  mounted() {
    l.event.on(
      document.body,
      `mousemove.swipeCell_${this.uid}`,
      this.cellMouseMove
    ), l.event.on(
      document.body,
      `mouseup.swipeCell_${this.uid}`,
      this.cellMouseUp
    );
  },
  methods: {
    cellTouchStart(e) {
      this.disabled || (this.startX = e.touches[0].pageX, this.startX2 = this.startX, this.amounts = 0);
    },
    cellTouchMove(e) {
      if (this.disabled)
        return;
      let t = e.touches[0].pageX, s = t - this.startX, r = t - this.startX2;
      if (this.startX = t, !(Math.abs(r) <= l.element.rem2px(1))) {
        if (e.cancelable && e.preventDefault(), r > 0) {
          if (this.leftShow && this.transformX == this.$refs.left.offsetWidth)
            return;
          this.leftShow = !0, this.$nextTick(() => {
            this.transformX >= this.$refs.left.offsetWidth ? (this.amounts += 8, this.transformX += s / this.amounts) : this.transformX += s;
          });
        } else if (r < 0) {
          if (this.rightShow && this.transformX == -this.$refs.right.offsetWidth)
            return;
          this.rightShow = !0, this.$nextTick(() => {
            this.transformX <= -this.$refs.right.offsetWidth ? (this.amounts += 8, this.transformX += s / this.amounts) : this.transformX += s;
          });
        }
      }
    },
    cellTouchEnd(e) {
      if (this.disabled)
        return;
      let t = e.changedTouches[0].pageX - this.startX2;
      t != 0 && (t > 0 ? this.transformX > 0 ? this.open("left") : this.close() : this.transformX < 0 ? this.open("right") : this.close());
    },
    cellMouseDown(e) {
      this.disabled || (this.startX = e.pageX, this.startX2 = this.startX, this.amounts = 0, this.mouseDown = !0);
    },
    cellMouseMove(e) {
      if (this.disabled || !this.mouseDown)
        return;
      this.isDrag = !0;
      let t = e.pageX, s = t - this.startX, r = t - this.startX2;
      if (this.startX = t, !(Math.abs(r) <= l.element.rem2px(1))) {
        if (e.cancelable && e.preventDefault(), r > 0) {
          if (this.leftShow && this.transformX == this.$refs.left.offsetWidth)
            return;
          this.leftShow = !0, this.$nextTick(() => {
            this.transformX >= this.$refs.left.offsetWidth ? (this.amounts += 3, this.transformX += s / this.amounts) : this.transformX += s;
          });
        } else if (r < 0) {
          if (this.rightShow && this.transformX == -this.$refs.right.offsetWidth)
            return;
          this.rightShow = !0, this.$nextTick(() => {
            this.transformX <= -this.$refs.right.offsetWidth ? (this.amounts += 3, this.transformX += s / this.amounts) : this.transformX += s;
          });
        }
      }
    },
    cellMouseUp(e) {
      if (this.disabled || !this.mouseDown)
        return;
      this.mouseDown = !1;
      let t = e.pageX - this.startX2;
      t != 0 && (t > 0 ? this.transformX > 0 ? this.open("left") : this.close() : this.transformX < 0 ? this.open("right") : this.close(), setTimeout(() => {
        this.isDrag = !1;
      }, 10));
    },
    setTransform(e) {
      return new Promise((t, s) => {
        this.$el.style.transition = "transform 300ms", this.$el.style.webkitTransition = "transform 300ms", setTimeout(() => {
          this.transformX = e, setTimeout(() => {
            this.$el.style.transition = "", this.$el.style.webkitTransition = "", t();
          }, 300);
        }, 10);
      });
    },
    open(e) {
      this.disabled || (e == "left" ? (this.leftShow || (this.leftShow = !0), this.$nextTick(() => {
        this.setTransform(this.$refs.left.offsetWidth).then(() => {
          this.$emit("open", e);
        });
      })) : e == "right" && (this.rightShow || (this.rightShow = !0), this.$nextTick(() => {
        this.setTransform(-this.$refs.right.offsetWidth).then(
          () => {
            this.$emit("open", e);
          }
        );
      })));
    },
    close(e) {
      if (!e && this.disabled)
        return;
      let t = "left";
      this.transformX != 0 && (this.transformX >= 0 ? t = "left" : t = "right", this.setTransform(0).then(() => {
        this.leftShow = !1, this.rightShow = !1, this.$emit("close", t);
      }));
    },
    clickCenter() {
      this.disabled || this.isDrag || this.centerClose && this.close();
    }
  },
  beforeUnmount() {
    l.event.off(
      document.body,
      `mousemove.swipeCell_${this.uid} mouseup.swipeCell_${this.uid}`
    );
  }
}, Fl = ["disabled"], Rl = {
  ref: "left",
  class: "mvi-swipe-cell-left"
}, Yl = {
  ref: "right",
  class: "mvi-swipe-cell-right"
};
function Nl(e, t, s, r, n, i) {
  return o(), u("div", {
    class: "mvi-swipe-cell",
    onTouchstart: t[1] || (t[1] = (...f) => i.cellTouchStart && i.cellTouchStart(...f)),
    onTouchmove: t[2] || (t[2] = (...f) => i.cellTouchMove && i.cellTouchMove(...f)),
    onTouchend: t[3] || (t[3] = (...f) => i.cellTouchEnd && i.cellTouchEnd(...f)),
    style: b(i.cellStyle),
    disabled: s.disabled || null,
    onMousedown: t[4] || (t[4] = (...f) => i.cellMouseDown && i.cellMouseDown(...f))
  }, [
    B(v("div", Rl, [
      S(e.$slots, "left", {}, void 0, !0)
    ], 512), [
      [j, n.leftShow]
    ]),
    v("div", {
      ref: "center",
      class: "mvi-swipe-cell-center",
      onClick: t[0] || (t[0] = (...f) => i.clickCenter && i.clickCenter(...f))
    }, [
      S(e.$slots, "default", {}, void 0, !0)
    ], 512),
    B(v("div", Yl, [
      S(e.$slots, "right", {}, void 0, !0)
    ], 512), [
      [j, n.rightShow]
    ])
  ], 44, Fl);
}
const He = /* @__PURE__ */ T(Wl, [["render", Nl], ["__scopeId", "data-v-e9181b2d"]]);
He.install = (e) => {
  e.component(He.name, He);
};
const Ll = {
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
      default: !0
    },
    timeout: {
      type: Number,
      default: 400
    },
    showTip: {
      type: Boolean,
      default: !1
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
      default: !1
    },
    clockWise: {
      type: Boolean,
      default: !0
    },
    tipClass: {
      type: String,
      default: null
    }
  },
  computed: {
    progressStyle() {
      let e = {};
      return this.size && (e.width = this.size + "rem", e.height = this.size + "rem"), e;
    },
    viewBox() {
      let e = l.element.rem2px(this.strokeWidth);
      return `0 0 ${this.pathSize + 2 * e} ${this.pathSize + 2 * e}`;
    },
    pathD() {
      let e = l.element.rem2px(this.strokeWidth);
      return `M ${this.pathSize / 2 + e} ${this.pathSize / 2 + e} m 0, -${this.pathSize / 2} a ${this.pathSize / 2}, ${this.pathSize / 2} 0 1, ${this.clockWise ? 1 : 0} 0, ${this.pathSize} a ${this.pathSize / 2}, ${this.pathSize / 2} 0 1, ${this.clockWise ? 1 : 0} 0, -${this.pathSize}`;
    },
    computedValue() {
      if (this.tipText)
        return this.tipText;
      {
        let e = this.value > this.max ? this.max : this.value < this.min ? this.min : this.value;
        return Math.round(
          (e - this.min) / (this.max - this.min) * 100
        ) + "%";
      }
    },
    barStyle() {
      let e = {};
      this.fill && (e.fill = this.fill), this.color && (e.stroke = this.color), l.number.isNumber(this.strokeWidth) && (e.strokeWidth = this.strokeWidth + "rem"), this.round && (e.strokeLinecap = "round"), this.animation && (e.transition = "stroke-dasharray " + this.timeout + "ms", e.webkitTransition = "stroke-dasharray " + this.timeout + "ms");
      let t = Number((this.pathSize * Math.PI).toFixed(2)), s = this.value > this.max ? this.max : this.value < this.min ? this.min : this.value, r = Number(
        ((s - this.min) / (this.max - this.min) * t).toFixed(2)
      );
      return e.strokeDasharray = r + "," + (t - r), e;
    },
    trackStyle() {
      let e = {};
      return this.fill && (e.fill = this.fill), this.trackColor && (e.stroke = this.trackColor), l.number.isNumber(this.strokeWidth) && (e.strokeWidth = this.strokeWidth + "rem"), e;
    }
  }
}, Ul = ["viewBox"], Xl = ["d"], ql = ["d"], Gl = {
  key: 0,
  class: "mvi-circle-progress-tip"
}, Zl = ["textContent"];
function Kl(e, t, s, r, n, i) {
  return o(), u("div", {
    class: "mvi-circle-progress",
    style: b(i.progressStyle)
  }, [
    (o(), u("svg", { viewBox: i.viewBox }, [
      v("path", {
        d: i.pathD,
        style: b(i.trackStyle),
        class: "mvi-circle-progress-track"
      }, null, 12, Xl),
      v("path", {
        d: i.pathD,
        style: b(i.barStyle),
        class: "mvi-circle-progress-bar"
      }, null, 12, ql)
    ], 8, Ul)),
    s.showTip ? (o(), u("div", Gl, [
      e.$slots.tip ? S(e.$slots, "tip", {
        key: 0,
        value: s.value
      }, void 0, !0) : (o(), u("span", {
        key: 1,
        class: y(s.tipClass || ""),
        textContent: _(i.computedValue)
      }, null, 10, Zl))
    ])) : g("", !0)
  ], 4);
}
const Ve = /* @__PURE__ */ T(Ll, [["render", Kl], ["__scopeId", "data-v-b0e513b3"]]);
Ve.install = (e) => {
  e.component(Ve.name, Ve);
};
const Jl = {
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
      default: !1
    },
    inBorder: {
      type: Boolean,
      default: !0
    },
    outBorder: {
      type: Boolean,
      default: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    active: {
      type: Boolean,
      default: !0
    },
    noWrap: {
      type: Boolean,
      default: !1
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
}, Ql = ["disabled"];
function er(e, t, s, r, n, i) {
  return o(), u("div", {
    disabled: s.disabled || null,
    class: "mvi-collapse"
  }, [
    S(e.$slots, "default", {}, void 0, !0)
  ], 8, Ql);
}
const $e = /* @__PURE__ */ T(Jl, [["render", er], ["__scopeId", "data-v-523b2f20"]]);
const tr = {
  name: "m-transition-slide",
  data() {
    return {
      show: !0,
      height: null,
      useAnimation: !1,
      opacity: ""
    };
  },
  emits: ["before-slide-down", "slide-down", "before-slide-up", "slide-up"],
  props: {
    expand: {
      type: Boolean,
      default: !0
    },
    timeout: {
      type: Number,
      default: 200
    }
  },
  watch: {
    expand(e) {
      this.show = e;
    }
  },
  created() {
    this.expand || (this.opacity = 0);
  },
  mounted() {
    this.show = this.expand, this.$nextTick(() => {
      this.useAnimation = !0, this.opacity === 0 && (this.opacity = "");
    });
  },
  methods: {
    beforeEnter(e) {
      e.style.height = 0, this.useAnimation && (e.style.transition = "height " + this.timeout + "ms linear", e.style.webkitTransition = "height " + this.timeout + "ms linear"), this.$emit("before-slide-down", this.$el);
    },
    enter(e) {
      e.offsetWidth, e.style.height = this.height;
    },
    afterEnter(e) {
      this.useAnimation && (e.style.transition = "", e.style.webkitTransition = ""), e.style.height = "", this.$emit("slide-down", this.$el);
    },
    beforeLeave(e) {
      this.height || (this.height = l.element.getCssStyle(e, "height")), e.style.height = this.height, this.useAnimation && (e.style.transition = "height " + this.timeout + "ms linear", e.style.webkitTransition = "height " + this.timeout + "ms linear"), this.$emit("before-slide-up", this.$el);
    },
    leave(e) {
      e.offsetWidth, e.style.height = 0;
    },
    afterLeave(e) {
      this.useAnimation && (e.style.transition = "", e.style.webkitTransition = ""), e.style.height = "", this.$emit("slide-up", this.$el);
    }
  }
};
function ir(e, t, s, r, n, i) {
  return o(), I(G, {
    name: "mvi-transition-slide",
    onBeforeEnter: i.beforeEnter,
    onAfterEnter: i.afterEnter,
    onBeforeLeave: i.beforeLeave,
    onAfterLeave: i.afterLeave,
    onEnter: i.enter,
    onLeave: i.leave
  }, {
    default: P(() => [
      B(v("div", {
        class: "mvi-transition-slide",
        style: b({ opacity: n.opacity })
      }, [
        S(e.$slots, "default", {}, void 0, !0)
      ], 4), [
        [j, n.show]
      ])
    ]),
    _: 3
  }, 8, ["onBeforeEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave", "onEnter", "onLeave"]);
}
const ne = /* @__PURE__ */ T(tr, [["render", ir], ["__scopeId", "data-v-e66962b7"]]);
const sr = {
  name: "m-collapse-item",
  data() {
    return {
      open: !0,
      cellBorder: !1
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
      default: !1
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
    mCell: he,
    mTransitionSlide: ne
  },
  created() {
    this.collapse.children.push(this), this.cellBorder = this.computedInBorder, this.isNeedHideSelf();
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  watch: {
    "collapse.modelValue": function(e, t) {
      this.isNeedHideSelf();
    }
  },
  computed: {
    computedOutBorder() {
      return typeof this.outBorder == "boolean" ? this.outBorder : this.collapse.outBorder;
    },
    computedInBorder() {
      return typeof this.inBorder == "boolean" ? this.inBorder : this.collapse.inBorder;
    },
    computedNoWrap() {
      return typeof this.noWrap == "boolean" ? this.noWrap : this.collapse.noWrap;
    },
    itemIndex() {
      return this.collapse.children.findIndex((e) => l.common.equal(e.uid, this.uid));
    },
    computedOpenArrow() {
      let e = {
        type: "angle-up",
        color: null,
        size: null,
        url: null,
        spin: !1
      };
      return typeof this.openArrow == "string" && this.openArrow ? e.type = this.openArrow : l.common.isObject(this.openArrow) ? (typeof this.openArrow.type == "string" && this.openArrow.type && (e.type = this.openArrow.type), typeof this.openArrow.color == "string" && this.openArrow.color && (e.color = this.openArrow.color), typeof this.openArrow.size == "string" && this.openArrow.size && (e.size = this.openArrow.size), typeof this.openArrow.url == "string" && this.openArrow.url && (e.url = this.openArrow.url), typeof this.openArrow.spin == "boolean" && (e.spin = this.openArrow.spin)) : typeof this.collapse.openArrow == "string" && this.collapse.openArrow ? e.type = this.collapse.openArrow : l.common.isObject(this.collapse.openArrow) && (typeof this.collapse.openArrow.type == "string" && this.collapse.openArrow.type && (e.type = this.collapse.openArrow.type), typeof this.collapse.openArrow.color == "string" && this.collapse.openArrow.color && (e.color = this.collapse.openArrow.color), typeof this.collapse.openArrow.size == "string" && this.collapse.openArrow.size && (e.size = this.collapse.openArrow.size), typeof this.collapse.openArrow.url == "string" && this.collapse.openArrow.url && (e.url = this.collapse.openArrow.url), typeof this.collapse.openArrow.spin == "boolean" && (e.spin = this.collapse.openArrow.spin)), e;
    },
    computedCloseArrow() {
      let e = {
        type: "angle-down",
        color: null,
        size: null,
        url: null
      };
      return typeof this.closeArrow == "string" && this.closeArrow ? e.type = this.closeArrow : l.common.isObject(this.closeArrow) ? (typeof this.closeArrow.type == "string" && this.closeArrow.type && (e.type = this.closeArrow.type), typeof this.closeArrow.color == "string" && this.closeArrow.color && (e.color = this.closeArrow.color), typeof this.closeArrow.size == "string" && this.closeArrow.size && (e.size = this.closeArrow.size), typeof this.closeArrow.url == "string" && this.closeArrow.url && (e.url = this.closeArrow.url), typeof this.closeArrow.spin == "boolean" && (e.spin = this.closeArrow.spin)) : typeof this.collapse.closeArrow == "string" && this.collapse.closeArrow ? e.type = this.collapse.closeArrow : l.common.isObject(this.collapse.closeArrow) && (typeof this.collapse.closeArrow.type == "string" && this.collapse.closeArrow.type && (e.type = this.collapse.closeArrow.type), typeof this.collapse.closeArrow.color == "string" && this.collapse.closeArrow.color && (e.color = this.collapse.closeArrow.color), typeof this.collapse.closeArrow.size == "string" && this.collapse.closeArrow.size && (e.size = this.collapse.closeArrow.size), typeof this.collapse.closeArrow.url == "string" && this.collapse.closeArrow.url && (e.url = this.collapse.closeArrow.url), typeof this.collapse.closeArrow.spin == "boolean" && (e.spin = this.collapse.closeArrow.spin)), e;
    },
    arrow() {
      return this.open ? this.computedOpenArrow : this.computedCloseArrow;
    },
    computedActive() {
      return this.disabled || this.collapse.disabled ? !1 : typeof this.active == "boolean" ? this.active : this.collapse.active;
    },
    computedTimeout() {
      return typeof this.timeout == "number" ? this.timeout : this.collapse.timeout;
    }
  },
  methods: {
    beforeSlideDown() {
      this.collapse.$emit("before-slide-down", this.itemIndex), this.computedInBorder && (this.cellBorder = !0);
    },
    slideDown() {
      this.collapse.$emit("slide-down", this.itemIndex);
    },
    beforeSlideUp() {
      this.collapse.$emit("before-slide-up", this.itemIndex);
    },
    slideUp() {
      this.computedInBorder && (this.cellBorder = !1), this.collapse.$emit("slide-up", this.itemIndex);
    },
    isNeedHideSelf() {
      this.collapse.accordion ? this.collapse.modelValue === this.itemIndex ? this.open = !0 : this.open = !1 : l.number.isNumber(this.collapse.modelValue) ? this.collapse.modelValue === this.itemIndex ? this.open = !0 : this.open = !1 : Array.isArray(this.collapse.modelValue) ? this.collapse.modelValue.includes(this.itemIndex) ? this.open = !0 : this.open = !1 : this.open = !1;
    },
    changeCollapse() {
      if (this.disabled || this.collapse.disabled)
        return !1;
      if (this.collapse.accordion)
        this.collapse.modelValue == this.itemIndex ? this.collapse.$emit("update:modelValue", null) : this.collapse.$emit("update:modelValue", this.itemIndex);
      else if (l.number.isNumber(this.collapse.modelValue))
        this.collapse.modelValue == this.itemIndex ? this.collapse.$emit("update:modelValue", []) : this.collapse.$emit("update:modelValue", [
          this.collapse.modelValue,
          this.itemIndex
        ]);
      else if (Array.isArray(this.collapse.modelValue)) {
        let e = [...this.collapse.modelValue];
        e.includes(this.itemIndex) ? (e = e.filter((t) => t != this.itemIndex), this.collapse.$emit("update:modelValue", e)) : (e.push(this.itemIndex), this.collapse.$emit("update:modelValue", e));
      } else {
        let e = [];
        e.push(this.itemIndex), this.collapse.$emit("update:modelValue", e);
      }
    }
  }
}, lr = ["textContent"];
function rr(e, t, s, r, n, i) {
  const f = x("m-cell"), a = x("m-transition-slide");
  return o(), u("div", {
    class: y(["mvi-collapse-item", i.computedOutBorder ? "mvi-collapse-item-border" : ""])
  }, [
    D(f, {
      class: "mvi-collapse-cell",
      icon: s.icon,
      content: s.label,
      title: s.title,
      border: n.cellBorder,
      arrow: i.arrow,
      "title-class": s.titleClass,
      "content-class": s.labelClass,
      onClick: i.changeCollapse,
      active: i.computedActive,
      "no-wrap": i.computedNoWrap
    }, null, 8, ["icon", "content", "title", "border", "arrow", "title-class", "content-class", "onClick", "active", "no-wrap"]),
    D(a, {
      expand: n.open,
      timeout: i.computedTimeout,
      onBeforeSlideUp: i.beforeSlideUp,
      onSlideUp: i.slideUp,
      onBeforeSlideDown: i.beforeSlideDown,
      onSlideDown: i.slideDown
    }, {
      default: P(() => [
        v("div", {
          class: y(["mvi-collapse-item-content", s.contentClass || ""])
        }, [
          e.$slots.default ? S(e.$slots, "default", { key: 0 }, void 0, !0) : (o(), u("span", {
            key: 1,
            textContent: _(s.content)
          }, null, 8, lr))
        ], 2)
      ]),
      _: 3
    }, 8, ["expand", "timeout", "onBeforeSlideUp", "onSlideUp", "onBeforeSlideDown", "onSlideDown"])
  ], 2);
}
const Tt = /* @__PURE__ */ T(sr, [["render", rr], ["__scopeId", "data-v-853bc4ba"]]);
$e.install = (e) => {
  e.component($e.name, $e), e.component(Tt.name, Tt);
};
const nr = {
  name: "m-divider",
  props: {
    dashed: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: null
    }
  }
}, or = {
  key: 0,
  class: "mvi-divider-center"
};
function ar(e, t, s, r, n, i) {
  return o(), u("div", {
    class: y(["mvi-divider", s.dashed ? "mvi-divider-dashed" : ""])
  }, [
    v("div", {
      class: "mvi-divider-left",
      style: b({ borderColor: s.color || "" })
    }, null, 4),
    this.$slots.default ? (o(), u("div", or, [
      S(e.$slots, "default", {}, void 0, !0)
    ])) : g("", !0),
    v("div", {
      class: "mvi-divider-right",
      style: b({ borderColor: s.color || "" })
    }, null, 4)
  ], 2);
}
const je = /* @__PURE__ */ T(nr, [["render", ar], ["__scopeId", "data-v-8c8527ba"]]);
je.install = (e) => {
  e.component(je.name, je);
};
const hr = {
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
      validator(e) {
        return ["left", "right", "top", "bottom"].includes(e);
      }
    },
    autoplay: {
      type: Boolean,
      default: !1
    },
    loop: {
      type: Boolean,
      default: !1
    },
    animation: {
      type: String,
      default: "linear",
      validator(e) {
        return [
          "linear",
          "ease",
          "ease-in",
          "ease-out",
          "ease-in-out"
        ].includes(e);
      }
    },
    clickStop: {
      type: Boolean,
      default: !1
    },
    hoverStop: {
      type: Boolean,
      default: !1
    }
  },
  mounted() {
    this.rollEl = this.$refs.roll, this.autoplay && this.play();
  },
  computed: {
    rollStyle() {
      let e = {};
      return this.direction == "left" ? (e.left = "100%", e.right = "auto") : this.direction == "right" ? (e.right = "100%", e.left = "auto") : this.direction == "top" ? (e.top = "100%", e.bottom = "auto") : this.direction == "bottom" && (e.bottom = "100%", e.top = "auto"), e;
    },
    containerStyle() {
      let e = {};
      return this.rollEl && (e.height = l.element.getCssStyle(this.rollEl, "height")), e;
    }
  },
  methods: {
    hoverIn() {
      this.hoverStop && this.status == 0 && this.pause();
    },
    hoverOut() {
      this.hoverStop && this.status == 1 && this.play();
    },
    play() {
      if (!this.$refs.roll || this.status == 0)
        return;
      this.status = 0;
      let e = l.element.getElementPoint(
        this.$refs.roll,
        this.$el
      ), t = 0;
      this.direction == "left" ? t = Math.round(
        (e.left + this.$refs.roll.offsetWidth) / (this.$el.offsetWidth + this.$refs.roll.offsetWidth) * this.interval
      ) : this.direction == "right" ? t = Math.round(
        (e.right + this.$refs.roll.offsetWidth) / (this.$el.offsetWidth + this.$refs.roll.offsetWidth) * this.interval
      ) : this.direction == "top" ? t = Math.round(
        (e.top + this.$refs.roll.offsetHeight) / (this.$el.offsetHeight + this.$refs.roll.offsetHeight) * this.interval
      ) : this.direction == "bottom" && (t = Math.round(
        (e.bottom + this.$refs.roll.offsetHeight) / (this.$el.offsetHeight + this.$refs.roll.offsetHeight) * this.interval
      )), this.$refs.roll.style.transition = "all " + t + "ms " + this.animation, this.$refs.roll.style.webkitTransition = "all " + t + "ms " + this.animation, setTimeout(() => {
        !this.$refs.roll || (this.direction == "left" ? (this.$refs.roll.style.left = -this.$refs.roll.offsetWidth + "px", this.$refs.roll.style.right = "auto") : this.direction == "right" ? (this.$refs.roll.style.right = -this.$refs.roll.offsetWidth + "px", this.$refs.roll.style.left = "auto") : this.direction == "top" ? (this.$refs.roll.style.top = -this.$refs.roll.offsetHeight + "px", this.$refs.roll.style.bottom = "auto") : this.direction == "bottom" && (this.$refs.roll.style.bottom = -this.$refs.roll.offsetHeight + "px", this.$refs.roll.style.top = "auto"), this.$emit("play"), this.timer = setTimeout(() => {
          this.stop(), this.loop && this.play();
        }, t));
      }, 10);
    },
    stop() {
      this.status != 2 && (this.status = 2, this.$refs.roll.style.transition = "", this.$refs.roll.style.webkitTransition = "", this.direction == "left" ? (this.$refs.roll.style.left = "100%", this.$refs.roll.style.right = "auto") : this.direction == "right" ? (this.$refs.roll.style.right = "100%", this.$refs.roll.style.left = "auto") : this.direction == "top" ? (this.$refs.roll.style.top = "100%", this.$refs.roll.style.bottom = "auto") : this.direction == "bottom" && (this.$refs.roll.style.bottom = "100%", this.$refs.roll.style.top = "auto"), this.timer && (clearTimeout(this.timer), this.timer = null), this.$emit("stop"));
    },
    pause() {
      if (this.status != 0)
        return;
      this.status = 1;
      let e = l.element.getElementPoint(
        this.$refs.roll,
        this.$el
      );
      this.$refs.roll.style.transition = "", this.$refs.roll.style.webkitTransition = "", this.timer && (clearTimeout(this.timer), this.timer = null), this.direction == "left" ? (this.$refs.roll.style.left = e.left + "px", this.$refs.roll.style.right = "auto") : this.direction == "right" ? (this.$refs.roll.style.right = e.right + "px", this.$refs.roll.style.left = "auto") : this.direction == "top" ? (this.$refs.roll.style.top = e.top + "px", this.$refs.roll.style.bottom = "auto") : this.direction == "bottom" && (this.$refs.roll.style.bottom = e.bottom + "px", this.$refs.roll.style.top = "auto"), this.$emit("pause");
    },
    clickStopFun() {
      this.clickStop && (this.status == 0 ? this.pause() : this.status == 1 && this.play());
    }
  },
  beforeUnmount() {
    this.stop();
  }
};
function ur(e, t, s, r, n, i) {
  return o(), u("div", {
    onClick: t[0] || (t[0] = (...f) => i.clickStopFun && i.clickStopFun(...f)),
    onMouseenter: t[1] || (t[1] = (...f) => i.hoverIn && i.hoverIn(...f)),
    onMouseleave: t[2] || (t[2] = (...f) => i.hoverOut && i.hoverOut(...f)),
    class: "mvi-roll-container",
    style: b(i.containerStyle)
  }, [
    v("div", {
      class: y(["mvi-roll", s.direction == "left" || s.direction == "right" ? "mvi-roll-horizontal" : "mvi-roll-vertical"]),
      style: b(i.rollStyle),
      ref: "roll"
    }, [
      S(e.$slots, "default", {}, void 0, !0)
    ], 6)
  ], 36);
}
const We = /* @__PURE__ */ T(hr, [["render", ur], ["__scopeId", "data-v-a4057f4f"]]);
We.install = (e) => {
  e.component(We.name, We);
};
const dr = {
  name: "m-panel",
  data() {
    return {
      expand: !0,
      hasUp: !1
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
      default: !1
    },
    inBorder: {
      type: Boolean,
      default: !0
    },
    outBorder: {
      type: Boolean,
      default: !0
    },
    radius: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    titleCls() {
      let e = ["mvi-panel-header"];
      return this.radius && (e.push("mvi-panel-radius-top"), (!(this.$slots.default || this.content || this.$slots.footer || this.footer) || this.hasUp) && e.push("mvi-panel-radius-bottom")), this.titleClass && e.push(this.titleClass), e;
    },
    contentCls() {
      let e = ["mvi-panel-content"];
      return (this.$slots.title || this.title) && this.inBorder && e.push("mvi-panel-border"), this.radius && (this.$slots.title || this.title || e.push("mvi-panel-radius-top"), this.$slots.footer || this.footer || e.push("mvi-panel-radius-bottom")), this.contentClass && e.push(this.contentClass), e;
    },
    footerCls() {
      let e = ["mvi-panel-footer"];
      return (this.$slots.default || this.content || this.$slots.title || this.title) && this.inBorder && e.push("mvi-panel-border"), this.radius && (e.push("mvi-panel-radius-bottom"), this.$slots.default || this.content || this.$slots.title || this.title || e.push("mvi-panel-radius-top")), this.footerClass && e.push(this.footerClass), e;
    }
  },
  components: {
    mTransitionSlide: ne
  },
  methods: {
    titleClick() {
      this.collapseClick && (this.$slots.default || this.content || this.$slots.footer || this.footer) && (this.expand = !this.expand);
    },
    beforeSlideDown() {
      this.hasUp = !1;
    },
    slideUp() {
      this.hasUp = !0;
    }
  }
}, cr = ["textContent"], fr = ["textContent"], mr = ["textContent"];
function pr(e, t, s, r, n, i) {
  const f = x("m-transition-slide");
  return o(), u("div", {
    class: y(["mvi-panel", s.outBorder ? "mvi-panel-border" : "", s.radius ? "mvi-panel-radius-top mvi-panel-radius-bottom" : ""])
  }, [
    e.$slots.title || s.title ? (o(), u("div", {
      key: 0,
      onClick: t[0] || (t[0] = (...a) => i.titleClick && i.titleClick(...a)),
      class: y(i.titleCls)
    }, [
      e.$slots.title ? S(e.$slots, "title", { key: 0 }, void 0, !0) : (o(), u("span", {
        key: 1,
        textContent: _(s.title)
      }, null, 8, cr))
    ], 2)) : g("", !0),
    e.$slots.default || s.content || e.$slots.footer || s.footer ? (o(), I(f, {
      key: 1,
      expand: n.expand,
      onBeforeSlideDown: i.beforeSlideDown,
      onSlideUp: i.slideUp
    }, {
      default: P(() => [
        e.$slots.default || s.content ? (o(), u("div", {
          key: 0,
          class: y(i.contentCls)
        }, [
          e.$slots.default ? S(e.$slots, "default", { key: 0 }, void 0, !0) : (o(), u("span", {
            key: 1,
            textContent: _(s.content)
          }, null, 8, fr))
        ], 2)) : g("", !0),
        e.$slots.footer || s.footer ? (o(), u("div", {
          key: 1,
          class: y(i.footerCls)
        }, [
          e.$slots.footer ? S(e.$slots, "footer", { key: 0 }, void 0, !0) : (o(), u("span", {
            key: 1,
            textContent: _(s.footer)
          }, null, 8, mr))
        ], 2)) : g("", !0)
      ]),
      _: 3
    }, 8, ["expand", "onBeforeSlideDown", "onSlideUp"])) : g("", !0)
  ], 2);
}
const Fe = /* @__PURE__ */ T(dr, [["render", pr], ["__scopeId", "data-v-22f60b14"]]);
Fe.install = (e) => {
  e.component(Fe.name, Fe);
};
const gr = {
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
      default: !1
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
      let e = "success-o";
      return l.common.isObject(this.activeIcon) ? typeof this.activeIcon.type == "string" && (e = this.activeIcon.type) : typeof this.activeIcon == "string" && (e = this.activeIcon), e;
    },
    activeIconUrl() {
      let e = null;
      return l.common.isObject(this.activeIcon) && typeof this.activeIcon.url == "string" && (e = this.activeIcon.url), e;
    },
    activeIconSpin() {
      let e = !1;
      return l.common.isObject(this.activeIcon) && typeof this.activeIcon.spin == "boolean" && (e = this.activeIcon.spin), e;
    },
    activeIconSize() {
      let e = null;
      return l.common.isObject(this.activeIcon) && typeof this.activeIcon.size == "string" && (e = this.activeIcon.size), e;
    },
    activeIconColor() {
      let e = null;
      return l.common.isObject(this.activeIcon) && typeof this.activeIcon.color == "string" && (e = this.activeIcon.color), e;
    },
    inactiveIconType() {
      let e = null;
      return l.common.isObject(this.inactiveIcon) ? typeof this.inactiveIcon.type == "string" && (e = this.inactiveIcon.type) : typeof this.inactiveIcon == "string" && (e = this.inactiveIcon), e;
    },
    inactiveIconUrl() {
      let e = null;
      return l.common.isObject(this.inactiveIcon) && typeof this.inactiveIcon.url == "string" && (e = this.inactiveIcon.url), e;
    },
    inactiveIconSpin() {
      let e = !1;
      return l.common.isObject(this.inactiveIcon) && typeof this.inactiveIcon.spin == "boolean" && (e = this.inactiveIcon.spin), e;
    },
    inactiveIconSize() {
      let e = null;
      return l.common.isObject(this.inactiveIcon) && typeof this.inactiveIcon.size == "string" && (e = this.inactiveIcon.size), e;
    },
    inactiveIconColor() {
      let e = null;
      return l.common.isObject(this.inactiveIcon) && typeof this.inactiveIcon.color == "string" && (e = this.inactiveIcon.color), e;
    }
  }
};
function yr(e, t, s, r, n, i) {
  return o(), u("div", {
    class: y(["mvi-steps", s.vertical ? "mvi-steps-vertical" : ""])
  }, [
    S(e.$slots, "default", {}, void 0, !0)
  ], 2);
}
const Re = /* @__PURE__ */ T(gr, [["render", yr], ["__scopeId", "data-v-c88ebb41"]]);
const br = {
  name: "m-step",
  data() {
    return {
      elm: null
    };
  },
  setup() {
    return {
      uid: F().uid
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
      return this.steps.children.findIndex((e) => l.common.equal(e.uid, this.uid));
    },
    labelStyle() {
      let e = {};
      return this.steps.activeColor && this.steps.active == this.stepIndex && (e.color = this.steps.activeColor), this.steps.inactiveColor && this.steps.active != this.stepIndex && (e.color = this.steps.inactiveColor), e;
    },
    activeIconStyle() {
      let e = {};
      return this.steps.activeColor && this.steps.active == this.stepIndex && (e.color = this.steps.activeColor), e;
    },
    inactiveIconStyle() {
      let e = {};
      return this.steps.inactiveColor && this.stepIndex > this.steps.active && (e.color = this.steps.inactiveColor), this.steps.activeColor && this.stepIndex <= this.steps.active && (e.color = this.steps.activeColor), e;
    },
    circleStyle() {
      let e = {};
      return this.stepIndex <= this.steps.active ? this.steps.activeColor && (e.backgroundColor = this.steps.activeColor) : this.steps.inactiveColor && (e.backgroundColor = this.steps.inactiveColor), e;
    },
    activeCircleStyle() {
      let e = {};
      return this.steps.activeColor && this.steps.active == this.stepIndex && (e.backgroundColor = this.steps.activeColor), e;
    },
    lineStyle() {
      let e = {};
      return this.steps.activeColor && this.stepIndex < this.steps.active && (this.steps.vertical ? e.borderRightColor = this.steps.activeColor : e.borderTopColor = this.steps.activeColor), this.steps.inactiveColor && this.stepIndex >= this.steps.active && (this.steps.vertical ? e.borderRightColor = this.steps.inactiveColor : e.borderTopColor = this.steps.inactiveColor), e;
    },
    stepIconStyle() {
      let e = {};
      return this.elm && (e.backgroundColor = l.element.getCssStyle(
        this.steps.$el,
        "background-color"
      )), e;
    }
  },
  components: {
    mIcon: M
  }
}, vr = {
  key: 0,
  class: "mvi-step-vertical"
}, wr = { class: "mvi-step-vertical-container" }, Cr = { class: "mvi-step-vertical-icon" }, xr = { class: "mvi-step-container" };
function Ir(e, t, s, r, n, i) {
  const f = x("m-icon");
  return i.steps.vertical ? (o(), u("div", vr, [
    v("div", {
      class: y(["mvi-step-vertical-label", i.stepIndex == i.steps.active ? "mvi-step-label-finish" : ""]),
      style: b(i.labelStyle)
    }, [
      S(e.$slots, "default", {}, void 0, !0)
    ], 6),
    v("div", wr, [
      v("div", Cr, [
        i.steps.active == i.stepIndex && i.steps.activeIcon ? (o(), I(f, {
          key: 0,
          class: "mvi-step-icon-active-el",
          type: i.steps.activeIconType,
          url: i.steps.activeIconUrl,
          spin: i.steps.activeIconSpin,
          size: i.steps.activeIconSize,
          color: i.steps.activeIconColor,
          style: b(i.activeIconStyle)
        }, null, 8, ["type", "url", "spin", "size", "color", "style"])) : i.steps.active == i.stepIndex ? (o(), u("div", {
          key: 1,
          class: "mvi-step-circle-active",
          style: b(i.activeCircleStyle)
        }, null, 4)) : i.steps.inactiveIcon ? (o(), I(f, {
          key: 2,
          class: y(["mvi-step-icon-inactive-el", i.stepIndex <= i.steps.active ? "mvi-step-icon-inactive-finish" : ""]),
          type: i.steps.inactiveIconType,
          url: i.steps.inactiveIconUrl,
          spin: i.steps.inactiveIconSpin,
          style: b(i.inactiveIconStyle),
          size: i.steps.inactiveIconSize,
          color: i.steps.inactiveIconColor
        }, null, 8, ["class", "type", "url", "spin", "style", "size", "color"])) : (o(), u("div", {
          key: 3,
          class: y(["mvi-step-circle", i.stepIndex <= i.steps.active ? "mvi-step-circle-finish" : ""]),
          style: b(i.circleStyle)
        }, null, 6))
      ]),
      v("div", {
        class: y(["mvi-step-vertical-line", i.stepIndex == i.steps.children.length - 1 ? "mvi-step-line-last" : "", i.stepIndex < i.steps.active ? "mvi-step-line-finish" : ""]),
        style: b(i.lineStyle)
      }, null, 6)
    ])
  ])) : (o(), u("div", {
    key: 1,
    class: y(["mvi-step", i.stepIndex == i.steps.children.length - 1 ? "mvi-step-last" : ""])
  }, [
    v("div", {
      class: y(["mvi-step-label", i.stepIndex == i.steps.children.length - 1 ? "mvi-step-label-last" : "", i.stepIndex == 0 ? "mvi-step-label-first" : "", i.stepIndex == i.steps.active ? "mvi-step-label-finish" : ""]),
      style: b(i.labelStyle)
    }, [
      v("div", null, [
        S(e.$slots, "default", {}, void 0, !0)
      ])
    ], 6),
    v("div", xr, [
      v("div", {
        class: y(["mvi-step-icon", i.stepIndex == i.steps.children.length - 1 ? "mvi-step-icon-last" : ""]),
        style: b(i.stepIconStyle)
      }, [
        i.steps.active == i.stepIndex && i.steps.activeIcon ? (o(), I(f, {
          key: 0,
          class: "mvi-step-icon-active-el",
          type: i.steps.activeIconType,
          url: i.steps.activeIconUrl,
          spin: i.steps.activeIconSpin,
          size: i.steps.activeIconSize,
          color: i.steps.activeIconColor,
          style: b(i.activeIconStyle)
        }, null, 8, ["type", "url", "spin", "size", "color", "style"])) : i.steps.active == i.stepIndex ? (o(), u("div", {
          key: 1,
          class: "mvi-step-circle-active",
          style: b(i.activeCircleStyle)
        }, null, 4)) : i.steps.inactiveIcon ? (o(), I(f, {
          key: 2,
          class: y(["mvi-step-icon-inactive-el", i.stepIndex <= i.steps.active ? "mvi-step-icon-inactive-finish" : ""]),
          type: i.steps.inactiveIconType,
          url: i.steps.inactiveIconUrl,
          spin: i.steps.inactiveIconSpin,
          style: b(i.inactiveIconStyle),
          size: i.steps.inactiveIconSize,
          color: i.steps.inactiveIconColor
        }, null, 8, ["class", "type", "url", "spin", "style", "size", "color"])) : (o(), u("div", {
          key: 3,
          class: y(["mvi-step-circle", i.stepIndex <= i.steps.active ? "mvi-step-circle-finish" : ""]),
          style: b(i.circleStyle)
        }, null, 6))
      ], 6),
      v("div", {
        class: y(["mvi-step-line", i.stepIndex == i.steps.children.length - 1 ? "mvi-step-line-last" : "", i.stepIndex < i.steps.active ? "mvi-step-line-finish" : ""]),
        style: b(i.lineStyle)
      }, null, 6)
    ])
  ], 2));
}
const kt = /* @__PURE__ */ T(br, [["render", Ir], ["__scopeId", "data-v-da1e0354"]]);
Re.install = (e) => {
  e.component(Re.name, Re), e.component(kt.name, kt);
};
const Sr = {
  name: "m-label",
  data() {
    return {
      show: !0
    };
  },
  props: {
    type: {
      type: String,
      default: "default",
      validator(e) {
        return [
          "default",
          "error",
          "info",
          "primary",
          "success",
          "warn"
        ].includes(e);
      }
    },
    size: {
      type: String,
      default: "medium",
      validator(e) {
        return ["medium", "large"].includes(e);
      }
    },
    color: {
      type: String,
      default: null
    },
    plain: {
      type: Boolean,
      default: !1
    },
    round: {
      type: Boolean,
      default: !1
    },
    mark: {
      type: Boolean,
      default: !1
    },
    subColor: {
      type: String,
      default: null
    },
    closable: {
      type: Boolean,
      default: !1
    },
    reverse: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    labelClass() {
      let e = ["mvi-label"];
      return this.size && e.push("mvi-label-" + this.size), this.type && e.push("mvi-label-" + this.type), this.plain && e.push("mvi-label-plain"), this.round && e.push("mvi-label-round"), this.mark && (e.push("mvi-label-mark"), this.reverse && e.push("mvi-label-reverse")), e;
    },
    labelStyle() {
      let e = {};
      return this.color && (this.plain ? (e.borderColor = this.color, e.color = this.color, e.backgroundColor = this.subColor || "#fff") : (e.backgroundColor = this.color, e.borderColor = this.color, e.color = this.subColor || "#fff")), e;
    }
  },
  components: {
    mIcon: M
  },
  methods: {
    closeLabel() {
      this.show = !1;
    }
  }
};
function _r(e, t, s, r, n, i) {
  const f = x("m-icon");
  return s.closable ? (o(), I(G, {
    key: 0,
    name: "mvi-label"
  }, {
    default: P(() => [
      n.show ? (o(), u("div", {
        key: 0,
        class: y(i.labelClass),
        style: b(i.labelStyle)
      }, [
        S(e.$slots, "default", {}, void 0, !0),
        v("span", {
          class: "mvi-label-closable",
          onClick: t[0] || (t[0] = (...a) => i.closeLabel && i.closeLabel(...a))
        }, [
          D(f, { type: "times" })
        ])
      ], 6)) : g("", !0)
    ]),
    _: 3
  })) : (o(), u("div", {
    key: 1,
    class: y(i.labelClass),
    style: b(i.labelStyle)
  }, [
    S(e.$slots, "default", {}, void 0, !0)
  ], 6));
}
const Ye = /* @__PURE__ */ T(Sr, [["render", _r], ["__scopeId", "data-v-809b7961"]]);
Ye.install = (e) => {
  e.component(Ye.name, Ye);
};
const Tr = {
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
      mouseDown: !1,
      fadeActiveIndex: 0,
      useOpacity: !0,
      apiDoSlide: !1
    };
  },
  props: {
    autoplay: {
      type: Boolean,
      default: !1
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
      default: !1
    },
    showIndicators: {
      type: Boolean,
      default: !1
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
      default: !1
    },
    touchable: {
      type: Boolean,
      default: !0
    },
    showControl: {
      type: Boolean,
      default: !1
    },
    controlClass: {
      type: String,
      default: null
    },
    fade: {
      type: Boolean,
      default: !1
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
      return (e) => {
        let t = {};
        return this.isIndicatorActive(e) ? this.activeColor && (t.backgroundColor = this.activeColor) : this.inactiveColor && (t.backgroundColor = this.inactiveColor), t;
      };
    },
    wrapperStyle() {
      let e = {};
      return this.vertical ? (e.height = "calc(100% * " + this.children.length + ")", e.transform = "translateY(" + this.transform + "px)", e.webkitTransform = "translateY(" + this.transform + "px)") : (e.width = "calc(100% * " + this.children.length + ")", e.transform = "translateX(" + this.transform + "px)", e.webkitTransform = "translateX(" + this.transform + "px)"), e;
    },
    containerStyle() {
      let e = {};
      return this.width && (e.width = this.width), this.height && (e.height = this.height), e;
    },
    slideSize() {
      this.sizeCounts;
      let e = 0;
      return this.vertical ? this.height ? this.height.includes("rem") ? e = l.element.rem2px(parseFloat(this.height)) : this.height.includes("px") ? e = parseFloat(this.height) : this.elm && (e = parseFloat(
        l.element.getCssStyle(this.elm, "height")
      )) : this.elm && (e = parseFloat(
        l.element.getCssStyle(this.elm, "height")
      )) : this.width ? this.width.includes("rem") ? e = l.element.rem2px(parseFloat(this.width)) : this.width.includes("px") ? e = parseFloat(this.width) : this.elm && (e = parseFloat(
        l.element.getCssStyle(this.elm, "width")
      )) : this.elm && (e = parseFloat(
        l.element.getCssStyle(this.elm, "width")
      )), Number(e.toFixed(2));
    },
    activeIndex() {
      let e = 0;
      return this.totalMove <= 0 ? e = this.mathNext(
        Math.abs(l.number.divide(this.transform, this.slideSize))
      ) : e = this.mathPrev(
        Math.abs(l.number.divide(this.transform, this.slideSize))
      ), e > this.children.length - 1 ? e = this.children.length - 1 : e < 0 && (e = 0), e;
    },
    indicatorsIndex() {
      let e = 0;
      return this.fade ? e = this.fadeActiveIndex : this.loop ? this.activeIndex == this.children.length - 1 ? e = 0 : this.activeIndex == 0 ? e = this.children.length - 3 : e = this.activeIndex - 1 : e = this.activeIndex, e;
    },
    computedInitalSlide() {
      return this.loop ? this.initialSlide < this.children.length - 2 ? this.initialSlide + 1 : 1 : this.initialSlide;
    },
    controlStyle() {
      return (e) => {
        let t = {};
        return e == 0 ? (t.left = "0", t.right = "auto") : (t.left = "auto", t.right = "0"), t;
      };
    },
    controlsClass() {
      let e = ["mvi-swiper-control"];
      return this.controlClass && e.push(this.controlClass), e;
    },
    indicatorShow() {
      return (e) => this.fade ? !0 : this.loop ? e != 0 && e != this.children.length - 1 : !0;
    },
    indicatorsTotal() {
      return this.fade ? this.children.length : this.loop ? this.children.length - 2 > 0 ? this.children.length - 2 : 0 : this.children.length;
    },
    isIndicatorActive() {
      return (e) => this.fade ? this.indicatorsIndex == e : this.loop ? this.indicatorsIndex + 1 == e : this.indicatorsIndex == e;
    }
  },
  components: {
    mIcon: M
  },
  watch: {
    autoplay(e, t) {
      this.setAutoplay();
    },
    initialSlide(e, t) {
      this.fade ? (this.useOpacity = !1, this.fadeActiveIndex = e) : this.setDefaultSlide();
    }
  },
  created() {
    this.fade && (this.fadeActiveIndex = this.initialSlide);
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  mounted() {
    if (this.elm = this.$el, this.children.length != 0) {
      if (this.fade)
        this.setAutoplay();
      else {
        if (this.loop && this.children.length > 0) {
          let e = this.children[0].$el.cloneNode(!0), t = this.children[this.children.length - 1].$el.cloneNode(!0);
          this.$refs.wrapper.append(e), this.$refs.wrapper.prepend(t), this.children.unshift({
            $el: t
          }), this.children.push({
            $el: e
          });
        }
        this.setDefaultSlide(), l.event.on(
          document.body,
          `mousemove.swiper_${this.uid}`,
          this.swiperMouseMove
        ), l.event.on(
          document.body,
          `mouseup.swiper_${this.uid}`,
          this.swiperMouseUp
        );
      }
      l.event.on(window, `resize.swiper_${this.uid}`, this.resizeChange);
    }
  },
  methods: {
    resizeChange() {
      this.sizeCounts++, this.transform = -l.number.mutiply(
        this.activeIndex,
        this.slideSize
      );
    },
    setAutoplay() {
      this.children.length != 0 && (this.autoplay && !this.timer && this.interval > this.speed ? this.timer = setInterval(() => {
        this.slideNext();
      }, this.interval) : this.timer && (clearInterval(this.timer), this.timer = null));
    },
    swiperTouchStart(e) {
      this.children.length != 0 && (!this.touchable || this.apiDoSlide || (this.timer && (clearInterval(this.timer), this.timer = null), this.amounts = 0, this.totalMove = 0, this.vertical ? this.start = e.targetTouches[0].pageY : this.start = e.targetTouches[0].pageX, this.initStart = this.start, this.removeTransition()));
    },
    swiperTouchMove(e) {
      if (this.children.length == 0 || !this.touchable)
        return;
      e.cancelable && e.preventDefault();
      let t = 0;
      this.vertical ? t = e.targetTouches[0].pageY : t = e.targetTouches[0].pageX;
      let s = t - this.start;
      if (this.totalMove = t - this.initStart, this.totalMove > 0) {
        if (this.transform >= 0) {
          this.amounts++, this.transform = l.number.add(
            this.transform,
            l.number.divide(s, this.amounts)
          ), this.start = t;
          return;
        }
      } else if (this.transform <= -l.number.mutiply(
        this.children.length - 1,
        this.slideSize
      )) {
        this.amounts++, this.transform = l.number.add(
          this.transform,
          l.number.divide(s, this.amounts)
        ), this.start = t;
        return;
      }
      this.start = t, this.transform = l.number.add(this.transform, s);
    },
    swiperTouchEnd(e) {
      this.children.length != 0 && (!this.touchable || this.addTransition().then(() => {
        this.transform = -l.number.mutiply(
          this.activeIndex,
          this.slideSize
        ), setTimeout(() => {
          this.slideDone();
        }, this.speed);
      }));
    },
    swiperMouseDown(e) {
      this.children.length != 0 && (!this.touchable || this.apiDoSlide || (this.timer && (clearInterval(this.timer), this.timer = null), this.mouseDown = !0, this.amounts = 0, this.totalMove = 0, this.vertical ? this.start = e.pageY : this.start = e.pageX, this.initStart = this.start, this.removeTransition()));
    },
    swiperMouseMove(e) {
      if (this.children.length == 0 || !this.touchable || !this.mouseDown)
        return;
      e.cancelable && e.preventDefault();
      let t = 0;
      this.vertical ? t = e.pageY : t = e.pageX;
      let s = t - this.start;
      if (this.totalMove = t - this.initStart, this.totalMove > 0) {
        if (this.transform >= 0) {
          this.amounts++, this.transform = l.number.add(
            this.transform,
            l.number.divide(s, this.amounts)
          ), this.start = t;
          return;
        }
      } else if (this.transform <= -l.number.mutiply(
        this.children.length - 1,
        this.slideSize
      )) {
        this.amounts++, this.transform = l.number.add(
          this.transform,
          l.number.divide(s, this.amounts)
        ), this.start = t;
        return;
      }
      this.start = t, this.transform = l.number.add(this.transform, s);
    },
    swiperMouseUp(e) {
      this.children.length != 0 && (!this.touchable || !this.mouseDown || (this.mouseDown = !1, this.addTransition().then(() => {
        this.transform = -l.number.mutiply(
          this.activeIndex,
          this.slideSize
        ), setTimeout(() => {
          this.slideDone();
        }, this.speed);
      })));
    },
    setDefaultSlide() {
      if (this.children.length != 0 && !this.fade) {
        if (!this.$refs.wrapper)
          return;
        this.removeTransition().then(() => {
          this.transform = -l.number.mutiply(
            this.computedInitalSlide,
            this.slideSize
          ), this.$nextTick(() => {
            setTimeout(() => {
              !this.$refs.wrapper || this.addTransition().then(() => {
                this.oldIndex = this.initialSlide, this.setAutoplay();
              });
            }, 50);
          });
        });
      }
    },
    addTransition() {
      return new Promise((e, t) => {
        this.$refs.wrapper.style.transition = "transform " + this.speed + "ms", this.$refs.wrapper.style.webkitTransition = "transform " + this.speed + "ms", setTimeout(() => {
          e();
        }, 10);
      });
    },
    removeTransition() {
      return new Promise((e, t) => {
        this.$refs.wrapper.style.transition = "", this.$refs.wrapper.style.webkitTransition = "", setTimeout(() => {
          e();
        }, 10);
      });
    },
    slideDone() {
      return new Promise((e, t) => {
        this.loop ? this.transform == -l.number.mutiply(
          this.children.length - 1,
          this.slideSize
        ) ? this.removeTransition().then(() => {
          this.transform = -this.slideSize, this.$nextTick(() => {
            setTimeout(() => {
              this.addTransition().then(() => {
                this.indicatorsIndex != this.oldIndex && (this.oldIndex = this.indicatorsIndex, this.$emit(
                  "change",
                  this.indicatorsIndex
                )), this.setAutoplay(), e();
              });
            }, 50);
          });
        }) : this.transform == 0 ? this.removeTransition().then(() => {
          this.transform = -l.number.mutiply(
            this.children.length - 2,
            this.slideSize
          ), this.$nextTick(() => {
            setTimeout(() => {
              this.addTransition().then(() => {
                this.indicatorsIndex != this.oldIndex && (this.oldIndex = this.indicatorsIndex, this.$emit(
                  "change",
                  this.indicatorsIndex
                )), this.setAutoplay(), e();
              });
            }, 50);
          });
        }) : (this.indicatorsIndex != this.oldIndex && (this.oldIndex = this.indicatorsIndex, this.$emit("change", this.indicatorsIndex)), this.setAutoplay(), e()) : (this.indicatorsIndex != this.oldIndex && (this.oldIndex = this.indicatorsIndex, this.$emit("change", this.indicatorsIndex)), this.setAutoplay(), e());
      });
    },
    slideNext() {
      return new Promise((e, t) => {
        if (this.children.length == 0) {
          e();
          return;
        }
        if (this.fade)
          this.loop ? (this.$emit("before-change", this.fadeActiveIndex), this.fadeActiveIndex == this.children.length - 1 ? this.fadeActiveIndex = 0 : this.fadeActiveIndex++, this.timer && (clearInterval(this.timer), this.timer = null), setTimeout(() => {
            this.$emit("change", this.fadeActiveIndex), this.setAutoplay(), e();
          }, this.speed)) : this.fadeActiveIndex != this.children.length - 1 ? (this.$emit("before-change", this.fadeActiveIndex), this.fadeActiveIndex++, this.timer && (clearInterval(this.timer), this.timer = null), setTimeout(() => {
            this.$emit("change", this.fadeActiveIndex), this.setAutoplay(), e();
          }, this.speed)) : e();
        else {
          if (this.transform <= -l.number.mutiply(
            this.children.length - 1,
            this.slideSize
          )) {
            e();
            return;
          }
          this.apiDoSlide = !0, this.$emit("before-change", this.oldIndex), this.timer && (clearInterval(this.timer), this.timer = null), this.addTransition().then(() => {
            this.transform = l.number.subtract(
              this.transform,
              this.slideSize
            ), setTimeout(() => {
              this.slideDone().then(() => {
                this.apiDoSlide = !1, e();
              });
            }, this.speed);
          });
        }
      });
    },
    slidePrev() {
      return new Promise((e, t) => {
        if (this.children.length == 0) {
          e();
          return;
        }
        if (this.fade)
          this.loop ? (this.$emit("before-change", this.fadeActiveIndex), this.fadeActiveIndex == 0 ? this.fadeActiveIndex = this.children.length - 1 : this.fadeActiveIndex--, this.timer && (clearInterval(this.timer), this.timer = null), setTimeout(() => {
            this.$emit("change", this.fadeActiveIndex), this.setAutoplay(), e();
          }, this.speed)) : this.fadeActiveIndex != 0 ? (this.$emit("before-change", this.fadeActiveIndex), this.fadeActiveIndex--, this.timer && (clearInterval(this.timer), this.timer = null), setTimeout(() => {
            this.$emit("change", this.fadeActiveIndex), this.setAutoplay(), e();
          }, this.speed)) : e();
        else {
          if (this.transform >= 0) {
            e();
            return;
          }
          this.apiDoSlide = !0, this.$emit("before-change", this.oldIndex), this.timer && (clearInterval(this.timer), this.timer = null), this.addTransition().then(() => {
            this.transform = l.number.add(
              this.transform,
              this.slideSize
            ), setTimeout(() => {
              this.slideDone().then(() => {
                this.apiDoSlide = !1, e();
              });
            }, this.speed);
          });
        }
      });
    },
    mathNext(e) {
      const t = Math.floor(e);
      return l.number.subtract(e, t) >= 0.25 ? t + 1 : t;
    },
    mathPrev(e) {
      const t = Math.floor(e);
      return l.number.subtract(e, t) <= 0.75 ? t : t + 1;
    },
    slideTo(e) {
      return new Promise((t, s) => {
        if (this.children.length == 0) {
          t();
          return;
        }
        if (this.fade)
          e > this.children.length - 1 ? e = this.children.length - 1 : e < 0 && (e = 0), this.fadeActiveIndex != e ? (this.$emit("before-change", this.fadeActiveIndex), this.fadeActiveIndex = e, this.timer && (clearInterval(this.timer), this.timer = null), setTimeout(() => {
            this.$emit("change", this.fadeActiveIndex), this.setAutoplay(), t();
          }, this.speed)) : t();
        else if (this.oldIndex > e) {
          if (this.transform >= 0) {
            t();
            return;
          }
          this.apiDoSlide = !0, this.$emit("before-change", this.oldIndex), this.timer && (clearInterval(this.timer), this.timer = null), this.addTransition().then(() => {
            this.transform = l.number.add(
              this.transform,
              l.number.mutiply(
                this.oldIndex - e,
                this.slideSize
              )
            ), setTimeout(() => {
              this.slideDone().then(() => {
                this.apiDoSlide = !1, t();
              });
            }, this.speed);
          });
        } else {
          if (this.transform <= -l.number.mutiply(
            this.children.length - 1,
            this.slideSize
          )) {
            t();
            return;
          }
          this.apiDoSlide = !0, this.$emit("before-change", this.oldIndex), this.timer && (clearInterval(this.timer), this.timer = null), this.addTransition().then(() => {
            this.transform = l.number.subtract(
              this.transform,
              l.number.mutiply(
                e - this.oldIndex,
                this.slideSize
              )
            ), setTimeout(() => {
              this.slideDone().then(() => {
                this.apiDoSlide = !1, t();
              });
            }, this.speed);
          });
        }
      });
    }
  },
  beforeUnmount() {
    this.timer && (clearInterval(this.timer), this.timer = null), this.fade || l.event.off(
      document.body,
      `mousemove.swiper_${this.uid} mouseup.swiper_${this.uid}`
    ), l.event.off(window, `resize.swiper_${this.uid}`);
  }
}, kr = {
  key: 0,
  class: "mvi-swiper-fade"
}, Dr = {
  key: 3,
  class: "mvi-swiper-indicators"
}, Pr = ["onClick"];
function zr(e, t, s, r, n, i) {
  const f = x("m-icon");
  return o(), u("div", {
    class: y(["mvi-swiper-container", s.vertical ? "mvi-swiper-vertical" : ""]),
    style: b(i.containerStyle)
  }, [
    s.fade ? (o(), u("div", kr, [
      S(e.$slots, "default", {}, void 0, !0)
    ])) : (o(), u("div", {
      key: 1,
      class: "mvi-swiper-wrapper",
      ref: "wrapper",
      style: b(i.wrapperStyle),
      onTouchstart: t[0] || (t[0] = (...a) => i.swiperTouchStart && i.swiperTouchStart(...a)),
      onTouchmove: t[1] || (t[1] = (...a) => i.swiperTouchMove && i.swiperTouchMove(...a)),
      onTouchend: t[2] || (t[2] = (...a) => i.swiperTouchEnd && i.swiperTouchEnd(...a)),
      onMousedown: t[3] || (t[3] = (...a) => i.swiperMouseDown && i.swiperMouseDown(...a))
    }, [
      S(e.$slots, "default", {}, void 0, !0)
    ], 36)),
    e.$slots.indicators ? S(e.$slots, "indicators", {
      key: 2,
      active: i.indicatorsIndex,
      total: i.indicatorsTotal
    }, void 0, !0) : s.showIndicators ? (o(), u("div", Dr, [
      (o(!0), u(A, null, O(n.children, (a, c) => (o(), u(A, null, [
        i.indicatorShow(c) ? (o(), u("div", {
          class: y(["mvi-swiper-indicator", i.isIndicatorActive(c) ? "mvi-swiper-indicator-active" : ""]),
          style: b(i.indicatorStyle(c)),
          key: "indicator-" + c,
          onClick: (d) => i.slideTo(s.fade ? c : s.loop ? c - 1 : c)
        }, null, 14, Pr)) : g("", !0)
      ], 64))), 256))
    ])) : g("", !0),
    s.showControl ? (o(), u("div", {
      key: 4,
      class: y(i.controlsClass),
      style: b(i.controlStyle(0)),
      onClick: t[4] || (t[4] = (...a) => i.slidePrev && i.slidePrev(...a))
    }, [
      D(f, { type: "angle-left" })
    ], 6)) : g("", !0),
    s.showControl ? (o(), u("div", {
      key: 5,
      class: y(i.controlsClass),
      style: b(i.controlStyle(1)),
      onClick: t[5] || (t[5] = (...a) => i.slideNext && i.slideNext(...a))
    }, [
      D(f, { type: "angle-right" })
    ], 6)) : g("", !0)
  ], 6);
}
const me = /* @__PURE__ */ T(Tr, [["render", zr], ["__scopeId", "data-v-daef1731"]]);
const Ar = {
  name: "m-swiper-slide",
  setup() {
    return {
      uid: F().uid
    };
  },
  inject: ["swiper"],
  created() {
    this.swiper.children.push(this);
  },
  computed: {
    slideStyle() {
      let e = {};
      return this.swiper.vertical ? (e.width = "100%", e.height = this.swiper.fade ? "100%" : "calc(100% * " + 1 / this.swiper.children.length + ")") : (e.height = "100%", e.width = this.swiper.fade ? "100%" : "calc(100% * " + 1 / this.swiper.children.length + ")"), e;
    },
    slideIndex() {
      return this.swiper.children.findIndex((e) => l.common.equal(e.uid, this.uid));
    }
  },
  methods: {
    addTransition(e) {
      this.swiper.useOpacity ? (e.style.transition = "opacity " + this.swiper.speed + "ms", e.style.webkitTransition = "opacity " + this.swiper.speed + "ms") : (e.style.transition = "", e.style.webkitTransition = "");
    },
    removeTransition(e) {
      this.swiper.useOpacity ? (e.style.transition = "", e.style.webkitTransition = "") : this.swiper.useOpacity = !0;
    }
  }
};
function Er(e, t, s, r, n, i) {
  return i.swiper.fade ? (o(), I(G, {
    key: 0,
    name: "mvi-swiper-slide",
    onBeforeEnter: i.addTransition,
    onAfterEnter: i.removeTransition,
    onBeforeLeave: i.addTransition,
    onAfterLeave: i.removeTransition
  }, {
    default: P(() => [
      B(v("div", {
        class: "mvi-swiper-slide-fade",
        style: b(i.slideStyle)
      }, [
        S(e.$slots, "default", {}, void 0, !0)
      ], 4), [
        [j, i.swiper.fadeActiveIndex == i.slideIndex]
      ])
    ]),
    _: 3
  }, 8, ["onBeforeEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave"])) : (o(), u("div", {
    key: 1,
    class: "mvi-swiper-slide",
    style: b(i.slideStyle)
  }, [
    S(e.$slots, "default", {}, void 0, !0)
  ], 4));
}
const yt = /* @__PURE__ */ T(Ar, [["render", Er], ["__scopeId", "data-v-4ef19b96"]]);
me.install = (e) => {
  e.component(me.name, me), e.component(yt.name, yt);
};
const Mr = {
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
      validator(e) {
        return ["default", "card"].includes(e);
      }
    },
    modelValue: {
      type: Number,
      default: 0
    },
    animation: {
      type: String,
      default: "none",
      validator(e) {
        return ["none", "slide", "fade"].includes(e);
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
      default: !0
    },
    border: {
      type: Boolean,
      default: !1
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
      let e = {};
      return this.activeColor && (e.backgroundColor = this.activeColor), (this.animation == "slide" || this.animation == "fade") && (e.transition = "left " + this.timeout + "ms,width " + this.timeout + "ms", e.webkitTransition = "left " + this.timeout + "ms,width " + this.timeout + "ms"), this.lineHeight && (e.height = this.lineHeight), e.width = this.slideWidth + "px", e.left = this.slideLeft + "px", e;
    },
    headersStyle() {
      let e = {};
      return this.titleBackground && (e.backgroundColor = this.titleBackground), this.type == "card" && this.activeBackground && (e.borderColor = this.activeBackground), this.flex && this.type == "default" && (e.justifyContent = this.flex), e;
    },
    headerClass() {
      return (e, t) => {
        let s = ["mvi-tab-header"];
        return this.modelValue == t ? (s.push("mvi-tab-header-active"), this.activeClass && s.push(this.activeClass)) : this.inactiveClass && s.push(this.inactiveClass), this.ellipsis && s.push("mvi-tab-header-ellipsis"), s;
      };
    },
    headerStyle() {
      return (e, t) => {
        let s = {};
        return this.modelValue == t ? this.activeColor && (s.color = this.activeColor) : this.inactiveColor && (s.color = this.inactiveColor), this.offset && t != 0 && this.type == "default" && (s.marginLeft = this.offset), this.type == "card" && (this.modelValue == t ? this.activeBackground && (s.backgroundColor = this.activeBackground) : this.inactiveBackground && (s.backgroundColor = this.inactiveBackground), this.activeBackground && (s.borderRightColor = this.activeBackground)), s.maxWidth = `calc(100% / ${this.children.length})`, s;
      };
    }
  },
  components: {
    mIcon: M
  },
  created() {
    this.current = this.modelValue;
  },
  watch: {
    modelValue(e, t) {
      this.to(e, t);
    }
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.setSlider();
      }, 100);
    }), this.setHeight(), l.event.on(window, `resize.tabs_${this.uid}`, this.setHeight);
  },
  methods: {
    setHeight() {
      this.children[this.current] && this.$refs.content && (this.$refs.content.style.height = this.children[this.current].$el.offsetHeight + "px");
    },
    clickHeader(e, t) {
      e.disabled || this.modelValue != t && (this.$emit("update:modelValue", t), this.$emit("change", t));
    },
    to(e, t) {
      for (let s = 0; s < this.children.length; s++)
        this.children[s].show = !1, e < t ? this.children[s].back = !0 : this.children[s].back = !1;
      this.children[e].show = !0, this.children[e].firstShow || (this.children[e].firstShow = !0), this.$nextTick(() => {
        this.current = e, this.setHeight(), this.setSlider();
      });
    },
    setSlider() {
      this.slideWidth = parseFloat(
        l.element.getCssStyle(
          this.$refs.headers.querySelector(".mvi-tab-header-active"),
          "width"
        )
      ), this.slideLeft = l.element.getElementPoint(
        this.$refs.headers.querySelector(".mvi-tab-header-active"),
        this.$refs.headers
      ).left;
    }
  },
  beforeUnmount() {
    l.event.off(window, `resize.tabs_${this.uid}`);
  }
}, Br = { class: "mvi-tabs" }, Or = ["data-type"], Hr = ["data-type", "onClick", "disabled"], Vr = ["innerHTML"], $r = {
  class: "mvi-tabs-content",
  ref: "content"
};
function jr(e, t, s, r, n, i) {
  const f = x("m-icon");
  return o(), u("div", Br, [
    v("div", {
      ref: "headers",
      "data-type": s.type,
      class: y(["mvi-tabs-header", s.type == "default" && s.border ? "mvi-tabs-header-border" : ""]),
      style: b(i.headersStyle)
    }, [
      s.type == "default" ? (o(), u("div", {
        key: 0,
        class: "mvi-tabs-slider",
        style: b(i.sliderStyle)
      }, null, 4)) : g("", !0),
      (o(!0), u(A, null, O(n.children, (a, c) => (o(), u("div", {
        "data-type": s.type,
        class: y(i.headerClass(a, c)),
        key: "header-" + c,
        onClick: (d) => i.clickHeader(a, c),
        style: b(i.headerStyle(a, c)),
        disabled: a.disabled || null
      }, [
        a.placement == "left" && a.iconType || a.iconUrl ? (o(), I(f, {
          key: 0,
          class: y(["mvi-tab-icon", a.title ? "mvi-tab-icon-left" : ""]),
          type: a.iconType,
          url: a.iconUrl,
          spin: a.iconSpin,
          size: a.iconSize,
          color: a.iconColor
        }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : g("", !0),
        a.title ? (o(), u("span", {
          key: 1,
          class: "mvi-tab-header-text",
          innerHTML: a.title
        }, null, 8, Vr)) : g("", !0),
        a.placement == "right" && a.iconType || a.iconUrl ? (o(), I(f, {
          key: 2,
          class: y(["mvi-tab-icon", a.title ? "mvi-tab-icon-right" : ""]),
          type: a.iconType,
          url: a.iconUrl,
          spin: a.iconSpin,
          size: a.iconSize,
          color: a.iconColor
        }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : g("", !0)
      ], 14, Hr))), 128))
    ], 14, Or),
    v("div", $r, [
      S(e.$slots, "default", {}, void 0, !0)
    ], 512)
  ]);
}
const pe = /* @__PURE__ */ T(Mr, [["render", jr], ["__scopeId", "data-v-4c583e82"]]);
const Wr = {
  name: "m-tab",
  inject: ["tabs"],
  data() {
    return {
      show: !1,
      back: !1,
      firstShow: !1
    };
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  created() {
    this.tabs.children.push(this), this.tabs.modelValue == this.tabIndex && (this.show = !0, this.firstShow || (this.firstShow = !0));
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
      default: !1
    },
    placement: {
      type: String,
      default: "left",
      validator(e) {
        return ["left", "right"].includes(e);
      }
    }
  },
  computed: {
    tabStyle() {
      let e = {};
      return this.tabs.animation == "slide" ? (e.transition = "left " + this.tabs.timeout + "ms,opacity " + this.tabs.timeout + "ms", e.webkitTransition = "left " + this.tabs.timeout + "ms,opacity " + this.tabs.timeout + "ms") : this.tabs.animation == "fade" && (e.transition = "opacity " + this.tabs.timeout + "ms", e.webkitTransition = "opacity " + this.tabs.timeout + "ms"), this.tabs.contentBackground && (e.backgroundColor = this.tabs.contentBackground), e;
    },
    iconType() {
      let e = null;
      return l.common.isObject(this.icon) ? typeof this.icon.type == "string" && (e = this.icon.type) : typeof this.icon == "string" && (e = this.icon), e;
    },
    iconUrl() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.url == "string" && (e = this.icon.url), e;
    },
    iconSpin() {
      let e = !1;
      return l.common.isObject(this.icon) && typeof this.icon.spin == "boolean" && (e = this.icon.spin), e;
    },
    iconSize() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.size == "string" && (e = this.icon.size), e;
    },
    iconColor() {
      let e = null;
      return l.common.isObject(this.icon) && typeof this.icon.color == "string" && (e = this.icon.color), e;
    },
    tabIndex() {
      return this.tabs.children.findIndex((e) => l.common.equal(e.uid, this.uid));
    }
  }
};
function Fr(e, t, s, r, n, i) {
  return o(), I(G, {
    name: "mvi-tab-" + i.tabs.animation + (n.back ? "-back" : "")
  }, {
    default: P(() => [
      n.firstShow ? B((o(), u("div", {
        key: 0,
        class: "mvi-tab",
        style: b(i.tabStyle)
      }, [
        S(e.$slots, "default", {}, void 0, !0)
      ], 4)), [
        [j, n.show]
      ]) : g("", !0)
    ]),
    _: 3
  }, 8, ["name"]);
}
const bt = /* @__PURE__ */ T(Wr, [["render", Fr], ["__scopeId", "data-v-8ec77951"]]);
pe.install = (e) => {
  e.component(pe.name, pe), e.component(bt.name, bt);
};
ue.install = (e) => {
  e.component(ue.name, ue);
};
const Rr = {
  name: "m-table",
  emits: ["cell-click", "check", "sort-desc", "sort-asc"],
  data() {
    return {
      checkRows: [],
      selectAll: !1,
      sortData: [],
      isScroll: !1,
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
      default: !1
    },
    rowBorder: {
      type: Boolean,
      default: !1
    },
    stripe: {
      type: Boolean,
      default: !1
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
      default: !1
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
      return (e, t) => {
        let s = [];
        return this.rowClass && s.push(this.rowClass), e.className && s.push(e.className), t % 2 == 1 && this.stripe && s.push("mvi-table-stripe"), s;
      };
    },
    tableHeaderThClass() {
      let e = ["mvi-table-header-th"];
      return this.rowBorder && e.push("mvi-table-header-th-border"), e;
    },
    bodyStyle() {
      let e = {};
      return this.height && (e.maxHeight = this.height, e.overflow = "auto"), e;
    },
    colgroupStyle() {
      return (e) => {
        let t = {};
        return e.width && (t.width = e.width), t;
      };
    },
    columnsData() {
      let e = [];
      return this.columns.forEach((t) => {
        t.hidden || e.push(t);
      }), e;
    },
    textFilter() {
      return (e, t) => {
        let s = e[t.key];
        return typeof t.filter == "function" && (s = t.filter(e[t.key])), s;
      };
    }
  },
  components: {
    mIcon: M,
    mCheckbox: le,
    mLoading: te
  },
  watch: {
    data(e) {
      this.sortData = this.getSortData(), this.$nextTick(() => {
        this.columnsAlign();
      });
    },
    loading(e) {
      this.$nextTick(() => {
        this.columnsAlign();
      });
    }
  },
  created() {
    this.sortData = this.getSortData();
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  mounted() {
    this.columnsAlign(), l.event.on(window, `resize.table_${this.uid}`, this.columnsAlign);
  },
  methods: {
    resetSortActive() {
      this.sortBy = "", this.sortMethod = "", typeof this.customSortAsc != "function" && typeof this.customSortDesc != "function" && (this.sortData = this.getSortData(), this.$nextTick(() => {
        this.columnsAlign();
      }));
    },
    columnsAlign() {
      this.$refs.body && (this.isScroll = l.element.getScrollHeight(this.$refs.body) > this.$refs.body.clientHeight, this.isScroll && (this.scrollWidth = this.$refs.body.offsetWidth - this.$refs.body.clientWidth), this.$nextTick(() => {
        this.headThs.length > 0 && this.headThs.forEach((e, t) => {
          !this.columnsData[t].width && this.headCols.length > 0 && this.headCols[t] && this.bodyCols.length > 0 && this.bodyCols[t] && (this.headCols[t].style.width = this.bodyCols[t].style.width = e.offsetWidth + "px");
        });
      }));
    },
    cellClick(e, t, s, r, n) {
      this.$emit("cell-click", {
        row: t,
        rowIndex: s,
        column: r,
        columnIndex: n
      });
    },
    selectCheck(e) {
      event.stopPropagation();
      let t = this.sortData.length, s = 0;
      for (let n = 0; n < t; n++)
        this.sortData[n].checkDisabled || s++;
      this.checkRows.length == s ? this.selectAll = !0 : this.selectAll = !1;
      let r = [];
      this.checkRows.forEach((n) => {
        for (let i = 0; i < t; i++)
          if (i == n) {
            r.push(this.sortData[i]);
            break;
          }
      }), this.$emit("check", r);
    },
    allSelect(e) {
      this.checkRows = [];
      let t = this.sortData.length;
      if (e)
        for (let r = 0; r < t; r++)
          this.sortData[r].checkDisabled || this.checkRows.push(r);
      else
        this.checkRows = [];
      let s = [];
      this.checkRows.forEach((r) => {
        for (let n = 0; n < t; n++)
          if (n == r) {
            s.push(this.sortData[n]);
            break;
          }
      }), this.$emit("check", s);
    },
    sortAsc(e, t) {
      this.sortBy = t.key, this.sortMethod = "asc", typeof this.customSortAsc == "function" && this.customSortAsc ? this.customSortAsc(t, this.sortData) : (this.sortData = this.sortData.sort(function(s, r) {
        if (l.number.isNumber(s[t.key]) && l.number.isNumber(r[t.key]))
          return s[t.key] - r[t.key];
        let n = s[t.key].toString(), i = r[t.key].toString();
        return n.localeCompare(i, "zh-CN");
      }), this.$emit("sort-asc", this.sortData));
    },
    sortDesc(e, t) {
      this.sortBy = t.key, this.sortMethod = "desc", typeof this.customSortDesc == "function" && this.customSortDesc ? this.customSortDesc(t, this.sortData) : (this.sortData = this.sortData.sort(function(s, r) {
        if (l.number.isNumber(s[t.key]) && l.number.isNumber(r[t.key]))
          return r[t.key] - s[t.key];
        let n = s[t.key].toString(), i = r[t.key].toString();
        return -n.localeCompare(i, "zh-CN");
      }), this.$emit("sort-desc", this.sortData));
    },
    getSortData() {
      let e = [];
      return this.data.forEach((t) => {
        t.hidden || e.push(t);
      }), this.headCols = [], this.headThs = [], this.bodyCols = [], e;
    }
  },
  beforeUnmount() {
    l.event.off(window, `resize.table_${this.uid}`);
  }
}, Yr = {
  cellpadding: "0",
  cellspacing: "0"
}, Nr = ["innerHTML"], Lr = {
  key: 2,
  class: "mvi-table-sortable"
}, Ur = {
  key: 1,
  class: "mvi-table-loading"
}, Xr = ["innerHTML"], qr = ["innerHTML"], Gr = {
  cellpadding: "0",
  cellspacing: "0"
}, Zr = ["onClick"], Kr = ["innerHTML"];
function Jr(e, t, s, r, n, i) {
  const f = x("m-checkbox"), a = x("m-icon"), c = x("m-loading");
  return o(), u("div", {
    class: y(["mvi-table", s.outBorder ? "mvi-table-border" : ""])
  }, [
    i.columnsData.length != 0 ? (o(), u("div", {
      key: 0,
      class: y(["mvi-table-header", s.headClass || ""])
    }, [
      v("table", Yr, [
        v("colgroup", null, [
          (o(!0), u(A, null, O(i.columnsData, (d, h) => (o(), u("col", {
            ref_for: !0,
            ref: (m) => n.headCols[h] = m,
            style: b(i.colgroupStyle(d, h)),
            key: "table-header-group-" + h
          }, null, 4))), 128)),
          n.isScroll ? (o(), u("col", {
            key: 0,
            style: b({ width: n.scrollWidth + "px" })
          }, null, 4)) : g("", !0)
        ]),
        v("thead", null, [
          v("tr", null, [
            (o(!0), u(A, null, O(i.columnsData, (d, h) => (o(), u("th", {
              ref_for: !0,
              ref: (m) => n.headThs[h] = m,
              class: y(i.tableHeaderThClass),
              key: "table-column-" + h
            }, [
              v("div", null, [
                d.key == "checkbox" ? (o(), I(f, {
                  key: 0,
                  icon: { size: "0.24rem", type: d.iconType || "success", color: d.iconColor || null },
                  class: y(d.value ? "mvi-table-checkbox" : ""),
                  modelValue: n.selectAll,
                  "onUpdate:modelValue": t[0] || (t[0] = (m) => n.selectAll = m),
                  onChange: i.allSelect,
                  "fill-color": d.fillColor || null,
                  label: d.value || ""
                }, null, 8, ["icon", "class", "modelValue", "onChange", "fill-color", "label"])) : d.value ? (o(), u("span", {
                  key: 1,
                  innerHTML: d.value
                }, null, 8, Nr)) : g("", !0),
                d.sortable ? (o(), u("span", Lr, [
                  D(a, {
                    onClick: (m) => i.sortAsc(m, d),
                    class: y(["mvi-table-sortable-icon", d.key == n.sortBy && n.sortMethod == "asc" ? "mvi-table-sortable-icon-active" : ""]),
                    type: s.sortIcon && s.sortIcon.length == 2 && s.sortIcon[0] ? s.sortIcon[0] : "caret-up",
                    color: s.sortActiveColor && d.key == n.sortBy && n.sortMethod == "asc" ? s.sortActiveColor : null
                  }, null, 8, ["onClick", "class", "type", "color"]),
                  D(a, {
                    onClick: (m) => i.sortDesc(m, d),
                    class: y(["mvi-table-sortable-icon", d.key == n.sortBy && n.sortMethod == "desc" ? "mvi-table-sortable-icon-active" : ""]),
                    type: s.sortIcon && s.sortIcon.length == 2 && s.sortIcon[1] ? s.sortIcon[1] : "caret-down",
                    color: s.sortActiveColor && d.key == n.sortBy && n.sortMethod == "desc" ? s.sortActiveColor : null
                  }, null, 8, ["onClick", "class", "type", "color"])
                ])) : g("", !0)
              ])
            ], 2))), 128)),
            n.isScroll ? (o(), u("th", {
              key: 0,
              style: b({ width: n.scrollWidth + "px" })
            }, null, 4)) : g("", !0)
          ])
        ])
      ])
    ], 2)) : g("", !0),
    s.loading ? (o(), u("div", Ur, [
      v("div", null, [
        D(c, {
          color: "#c8c9cc",
          size: "0.3rem"
        }),
        v("div", {
          class: "mvi-table-loading-text",
          innerHTML: s.loadText
        }, null, 8, Xr)
      ])
    ])) : n.sortData.length == 0 ? (o(), u("div", {
      key: 2,
      class: "mvi-table-no-data",
      innerHTML: s.noDataMsg
    }, null, 8, qr)) : (o(), u("div", {
      key: 3,
      class: "mvi-table-body",
      style: b(i.bodyStyle),
      ref: "body"
    }, [
      v("table", Gr, [
        v("colgroup", null, [
          (o(!0), u(A, null, O(i.columnsData, (d, h) => (o(), u("col", {
            ref_for: !0,
            ref: (m) => n.bodyCols[h] = m,
            style: b(i.colgroupStyle(d, h)),
            key: "table-body-group-" + h
          }, null, 4))), 128))
        ]),
        v("tbody", null, [
          (o(!0), u(A, null, O(n.sortData, (d, h) => (o(), u("tr", {
            key: "table-data-" + h,
            class: y(i.bodyTrClass(d, h))
          }, [
            (o(!0), u(A, null, O(i.columnsData, (m, p) => (o(), u("td", {
              class: y([
                s.rowBorder ? "mvi-table-body-td-border" : "",
                d.cellClassName && d.cellClassName[m.key] ? d.cellClassName[m.key] : "",
                m.className || "",
                s.cellClass(d, h, m, p) || ""
              ]),
              key: "table-column-data-" + p,
              onClick: (w) => i.cellClick(w, d, h, m, p)
            }, [
              m.key == "checkbox" ? (o(), I(f, {
                key: 0,
                icon: { size: "0.24rem", type: m.iconType || "success", color: m.iconColor || null },
                modelValue: n.checkRows,
                "onUpdate:modelValue": t[1] || (t[1] = (w) => n.checkRows = w),
                value: h,
                onChange: i.selectCheck,
                "fill-color": m.fillColor || null,
                disabled: d.checkDisabled
              }, null, 8, ["icon", "modelValue", "value", "onChange", "fill-color", "disabled"])) : g("", !0),
              m.key == "custom" && e.$slots.custom ? S(e.$slots, "custom", {
                key: 1,
                row: d,
                column: m,
                rowIndex: h,
                columnIndex: p
              }, void 0, !0) : (o(), u("span", {
                key: 2,
                innerHTML: i.textFilter(d, m)
              }, null, 8, Kr))
            ], 10, Zr))), 128))
          ], 2))), 128))
        ])
      ])
    ], 4))
  ], 2);
}
const Ne = /* @__PURE__ */ T(Rr, [["render", Jr], ["__scopeId", "data-v-e52d236c"]]);
Ne.install = (e) => {
  e.component(Ne.name, Ne);
};
const Qr = {
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
      validator(e) {
        return ["year", "month", "date"].includes(e);
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
      validator(e) {
        return e.length != 12 ? !1 : e.every((t) => l.number.isNumber(t) || typeof t == "string" && t);
      }
    },
    weekText: {
      type: Array,
      default: function() {
        return ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
      },
      validator(e) {
        return e.length != 7 ? !1 : e.every((t) => l.number.isNumber(t) || typeof t == "string" && t);
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
      default: !1
    },
    active: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["update:modelValue", "date-click", "month-click", "year-click"],
  computed: {
    years() {
      let e = [], t = this.modelValue.getFullYear(), s = Math.floor((t - this.startYear) / 12);
      for (let r = this.startYear + s * 12; r < this.startYear + s * 12 + 12; r++) {
        let n = new Date();
        n.setFullYear(r), n.setMonth(this.modelValue.getMonth()), n.setDate(this.modelValue.getDate()), e.push({
          date: n,
          year: r,
          now: r == new Date().getFullYear(),
          current: r == t
        });
      }
      return e;
    },
    months() {
      let e = [];
      for (let t = 0; t < 12; t++) {
        let s = new Date();
        s.setFullYear(this.modelValue.getFullYear()), s.setMonth(t), s.setDate(this.modelValue.getDate()), e.push({
          date: s,
          year: this.modelValue.getFullYear(),
          month: t + 1,
          text: this.monthText[t],
          now: t + 1 == new Date().getMonth() + 1 && this.modelValue.getFullYear() == new Date().getFullYear(),
          current: t + 1 == this.modelValue.getMonth() + 1
        });
      }
      return e;
    },
    days() {
      let e = l.date.getDays(
        this.modelValue.getFullYear(),
        this.modelValue.getMonth() + 1
      ), t = [];
      for (let a = 0; a < e; a++)
        t.push({
          date: this.getSpecifiedDate(a + 1),
          now: this.isNow(a + 1),
          current: this.isCurrent(a + 1),
          currentMonth: !0
        });
      let s = this.getSpecifiedDate(1), r = s.getDay(), n = s;
      for (let a = 0; a < r; a++) {
        let c = l.date.getDateBefore(n, 1);
        t.unshift({
          date: c,
          now: !1,
          current: !1,
          currentMonth: !1
        }), n = c;
      }
      let i = this.getSpecifiedDate(e), f = t.length;
      for (let a = f; a < 35; a++) {
        let c = l.date.getDateAfter(i, 1);
        t.push({
          date: c,
          now: !1,
          current: !1,
          currentMonth: !1
        }), i = c;
      }
      return t;
    },
    yearCurrentClass() {
      return (e) => {
        let t = [];
        return e.current && (typeof this.currentClass == "string" && this.currentClass ? t.push(this.currentClass) : l.common.isObject(this.currentClass) && typeof this.currentClass.year == "string" && this.currentClass.year ? t.push(this.currentClass.year) : t.push("mvi-calendar-year-current")), t;
      };
    },
    monthCurrentClass() {
      return (e) => {
        let t = [];
        return e.current && (typeof this.currentClass == "string" && this.currentClass ? t.push(this.currentClass) : l.common.isObject(this.currentClass) && typeof this.currentClass.month == "string" && this.currentClass.month ? t.push(this.currentClass.month) : t.push("mvi-calendar-month-current")), t;
      };
    },
    dateCurrentClass(e) {
      return (t) => {
        let s = [];
        return t.current && (typeof this.currentClass == "string" && this.currentClass ? s.push(this.currentClass) : l.common.isObject(this.currentClass) && typeof this.currentClass.date == "string" && this.currentClass.date ? s.push(this.currentClass.date) : s.push("mvi-calendar-date-current")), s;
      };
    },
    yearNowClass(e) {
      return (t) => {
        let s = [];
        return t.now && (typeof this.nowClass == "string" && this.nowClass ? s.push(this.nowClass) : l.common.isObject(this.nowClass) && typeof this.nowClass.year == "string" && this.nowClass.year ? s.push(this.nowClass.year) : s.push("mvi-calendar-year-now")), s;
      };
    },
    monthNowClass() {
      return (e) => {
        let t = [];
        return e.now && (typeof this.nowClass == "string" && this.nowClass ? t.push(this.nowClass) : l.common.isObject(this.nowClass) && typeof this.nowClass.month == "string" && this.nowClass.month ? t.push(this.nowClass.month) : t.push("mvi-calendar-month-now")), t;
      };
    },
    dateNowClass(e) {
      return (t) => {
        let s = [];
        return t.now && (typeof this.nowClass == "string" ? s.push(this.nowClass) : l.common.isObject(this.nowClass) && typeof this.nowClass.date == "string" && this.nowClass.date ? s.push(this.nowClass.date) : s.push("mvi-calendar-date-now")), s;
      };
    }
  },
  methods: {
    isNow(e) {
      let t = new Date();
      return this.modelValue.getFullYear() == t.getFullYear() && this.modelValue.getMonth() == t.getMonth() && e == t.getDate();
    },
    isCurrent(e) {
      return this.modelValue.getDate() == e;
    },
    getWeek(e) {
      let t = new Date();
      return t.setFullYear(this.modelValue.getFullYear()), t.setMonth(this.modelValue.getMonth()), t.setDate(e), t.getDay();
    },
    getSpecifiedDate(e) {
      let t = new Date();
      return t.setFullYear(this.modelValue.getFullYear()), t.setMonth(this.modelValue.getMonth()), t.setDate(e), t;
    },
    onDateClick(e) {
      !e.currentMonth && !this.nonCurrentClick || (this.$emit("update:modelValue", e.date), this.$emit("date-click", e));
    },
    onMonthClick(e) {
      this.$emit("update:modelValue", e.date), this.$emit("month-click", e);
    },
    onYearClick(e) {
      e.year < this.startYear || e.year > this.endYear || (this.$emit("update:modelValue", e.date), this.$emit("year-click", e));
    }
  }
}, en = { class: "mvi-calendar" }, tn = {
  key: 0,
  class: "mvi-calendar-date"
}, sn = { class: "mvi-calendar-date-header" }, ln = ["textContent"], rn = {
  ref: "list",
  class: "mvi-calendar-date-list"
}, nn = ["disabled", "textContent", "onClick"], on = {
  key: 1,
  class: "mvi-calendar-month"
}, an = ["textContent", "onClick"], hn = { key: 2 }, un = ["textContent", "onClick", "disabled"];
function dn(e, t, s, r, n, i) {
  return o(), u("div", en, [
    s.view == "date" ? (o(), u("div", tn, [
      v("div", sn, [
        (o(!0), u(A, null, O(s.weekText, (f, a) => (o(), u("div", {
          class: "mvi-calendar-date-header-item",
          key: "week-" + a,
          textContent: _(f)
        }, null, 8, ln))), 128))
      ]),
      v("div", rn, [
        (o(!0), u(A, null, O(new Array(6), (f, a) => (o(), u("div", {
          key: "row-" + a,
          class: "mvi-calendar-date-row"
        }, [
          (o(!0), u(A, null, O(i.days.slice(a * 7, a * 7 + 7), (c, d) => (o(), u("div", {
            class: "mvi-calendar-date-day",
            key: "date-" + d
          }, [
            v("div", {
              disabled: !c.currentMonth || null,
              class: y(["mvi-calendar-date-day-item", !c.currentMonth && s.nonCurrentClick ? "mvi-calendar-allowed" : "", (s.nonCurrentClick ? s.active : s.active && c.currentMonth) ? "mvi-calendar-active" : "", i.dateNowClass(c), i.dateCurrentClass(c)]),
              textContent: _(c.date.getDate()),
              onClick: (h) => i.onDateClick(c)
            }, null, 10, nn)
          ]))), 128))
        ]))), 128))
      ], 512)
    ])) : s.view == "month" ? (o(), u("div", on, [
      (o(!0), u(A, null, O(new Array(3), (f, a) => (o(), u("div", {
        class: "mvi-calendar-month-row",
        key: "monthRow-" + a
      }, [
        (o(!0), u(A, null, O(i.months.slice(a * 4, a * 4 + 4), (c, d) => (o(), u("div", {
          class: "mvi-calendar-month-m",
          key: "month-" + d
        }, [
          v("div", {
            class: y(["mvi-calendar-month-item", s.active ? "mvi-calendar-active" : "", i.monthNowClass(c), i.monthCurrentClass(c)]),
            textContent: _(c.text),
            onClick: (h) => i.onMonthClick(c)
          }, null, 10, an)
        ]))), 128))
      ]))), 128))
    ])) : s.view == "year" ? (o(), u("div", hn, [
      (o(!0), u(A, null, O(new Array(3), (f, a) => (o(), u("div", {
        class: "mvi-calendar-year-row",
        key: "yearRow" + a
      }, [
        (o(!0), u(A, null, O(i.years.slice(a * 4, a * 4 + 4), (c, d) => (o(), u("div", {
          class: "mvi-calendar-year-y",
          key: "year-" + d
        }, [
          v("div", {
            class: y(["mvi-calendar-year-item", c.year >= s.startYear && c.year <= s.endYear && s.active ? "mvi-calendar-active" : "", i.yearNowClass(c), i.yearCurrentClass(c)]),
            textContent: _(c.year),
            onClick: (h) => i.onYearClick(c),
            disabled: c.year < s.startYear || c.year > s.endYear || null
          }, null, 10, un)
        ]))), 128))
      ]))), 128))
    ])) : g("", !0)
  ]);
}
const ge = /* @__PURE__ */ T(Qr, [["render", dn], ["__scopeId", "data-v-354a2972"]]);
ge.install = (e) => {
  e.component(ge.name, ge);
};
const cn = {
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
      validator(e) {
        return ["top", "left", "right", "bottom"].includes(e);
      }
    }
  },
  computed: {
    triangleStyle() {
      let e = {};
      return e.borderWidth = this.size, this.placement == "top" ? e.borderBottomColor = this.borderColor || "" : this.placement == "bottom" ? e.borderTopColor = this.borderColor || "" : this.placement == "left" ? e.borderRightColor = this.borderColor || "" : this.placement == "right" && (e.borderLeftColor = this.borderColor || ""), e;
    },
    triangleElStyle() {
      let e = {};
      return e.borderWidth = `calc(${this.size} - 1px)`, this.placement == "top" ? (e.borderBottomColor = this.background || "", e.marginLeft = `-${this.size}`) : this.placement == "bottom" ? (e.borderTopColor = this.background || "", e.marginLeft = `-${this.size}`) : this.placement == "left" ? (e.borderRightColor = this.background || "", e.marginTop = `-${this.size}`) : this.placement == "right" && (e.borderLeftColor = this.background || "", e.marginTop = `-${this.size}`), e;
    }
  }
}, fn = ["data-placement"], mn = ["data-placement"];
function pn(e, t, s, r, n, i) {
  return o(), u("div", {
    class: "mvi-triangle",
    style: b(i.triangleStyle),
    "data-placement": s.placement
  }, [
    v("div", {
      class: "mvi-triangle-el",
      style: b(i.triangleElStyle),
      "data-placement": s.placement
    }, null, 12, mn)
  ], 12, fn);
}
const ye = /* @__PURE__ */ T(cn, [["render", pn], ["__scopeId", "data-v-193fd518"]]);
ye.install = (e) => {
  e.component(ye.name, ye);
};
const gn = {
  name: "m-layer",
  data() {
    return {
      layerShow: !1,
      firstShow: !1,
      realPlacement: "bottom"
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
  props: {
    modelValue: {
      type: Boolean,
      default: !1
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
      validator(e) {
        return [
          "top",
          "left",
          "right",
          "bottom",
          "top-start",
          "top-end",
          "left-start",
          "left-end",
          "right-start",
          "right-end",
          "bottom-start",
          "bottom-end"
        ].includes(e);
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
      default: !1
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
      default: !1
    },
    showTriangle: {
      type: Boolean,
      default: !1
    },
    animation: {
      type: String,
      default: null
    },
    shadow: {
      type: Boolean,
      default: !0
    },
    border: {
      type: Boolean,
      default: !1
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
      default: !1
    }
  },
  components: {
    mTriangle: ye
  },
  watch: {
    placement(e) {
      this.layerShow && this.firstShow && (this.autoAdjust(), this.reset(), this.$nextTick(() => {
        this.resetTriangle();
      }));
    },
    modelValue(e) {
      e && (this.firstShow || (this.firstShow = !0)), this.layerShow = e;
    }
  },
  computed: {
    trianglePlacement() {
      if (this.realPlacement == "bottom-start" || this.realPlacement == "bottom" || this.realPlacement == "bottom-end")
        return "top";
      if (this.realPlacement == "top-start" || this.realPlacement == "top" || this.realPlacement == "top-end")
        return "bottom";
      if (this.realPlacement == "left-start" || this.realPlacement == "left" || this.realPlacement == "left-end")
        return "right";
      if (this.realPlacement == "right-start" || this.realPlacement == "right" || this.realPlacement == "right-end")
        return "left";
    },
    wrapperCls() {
      let e = ["mvi-layer-wrapper"];
      return this.shadow && e.push("mvi-layer-shadow"), this.border && e.push("mvi-layer-border"), this.wrapperClass && e.push(this.wrapperClass), e;
    },
    wrapperStyle() {
      let e = {};
      return this.border && this.borderColor && (e.borderColor = this.borderColor), this.background && (e.background = this.background), this.width && (e.width = this.width), e;
    },
    layerStyle() {
      let e = {};
      return l.number.isNumber(this.zIndex) && (e.zIndex = this.zIndex), this.timeout && (e.transition = "transform " + this.timeout + "ms,opacity " + this.timeout + "ms", e.webkitTransition = "transform " + this.timeout + "ms,opacity " + this.timeout + "ms"), this.showTriangle || (e.padding = 0, this.realPlacement == "bottom-start" || this.realPlacement == "bottom" || this.realPlacement == "bottom-end" ? e.paddingTop = this.offset : this.realPlacement == "top-start" || this.realPlacement == "top" || this.realPlacement == "top-end" ? e.paddingBottom = this.offset : this.realPlacement == "left-start" || this.realPlacement == "left" || this.realPlacement == "left-end" ? e.paddingRight = this.offset : (this.realPlacement == "right-start" || this.realPlacement == "right" || this.realPlacement == "right-end") && (e.paddingLeft = this.offset)), e;
    }
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  mounted() {
    this.modelValue && (this.firstShow || (this.firstShow = !0), this.layerShow = this.modelValue), l.event.on(window, `resize.layer_${this.uid}`, this.resizeSet), l.event.on(window, `click.layer_${this.uid}`, this.hideLayer);
  },
  methods: {
    resizeSet() {
      this.layerShow && this.firstShow && (this.autoAdjust(), this.reset(), this.$nextTick(() => {
        this.resetTriangle();
      }));
    },
    autoAdjust() {
      let e = this.getTargetEl(), t = l.element.getElementBounding(e);
      this.realPlacement = this.placement, this.placement == "bottom" ? t.bottom < this.$el.offsetHeight ? t.top > this.$el.offsetHeight ? (this.realPlacement = "top", t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-end")) : t.left > this.$el.offsetWidth ? (this.realPlacement = "left", t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-end")) : t.right > this.$el.offsetWidth && (this.realPlacement = "right", t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-end")) : (t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-end")) : this.placement == "bottom-start" ? t.bottom < this.$el.offsetHeight ? t.top > this.$el.offsetHeight ? (this.realPlacement = "top-start", t.right + e.offsetWidth < this.$el.offsetWidth && (this.realPlacement = "top"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-end")) : t.left > this.$el.offsetWidth ? (this.realPlacement = "left", t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-end")) : t.right > this.$el.offsetWidth && (this.realPlacement = "right", t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-end")) : (t.right + e.offsetWidth < this.$el.offsetWidth && (this.realPlacement = "bottom"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-end")) : this.placement == "bottom-end" ? t.bottom < this.$el.offsetHeight ? t.top > this.$el.offsetHeight ? (this.realPlacement = "top-end", t.left + e.offsetWidth < this.$el.offsetWidth && (this.realPlacement = "top"), t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-start")) : t.left > this.$el.offsetWidth ? (this.realPlacement = "left", t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-end")) : t.right > this.$el.offsetWidth && (this.realPlacement = "right", t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-end")) : (t.left + e.offsetWidth < this.$el.offsetWidth && (this.realPlacement = "bottom"), t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-start")) : this.placement == "top" ? t.top < this.$el.offsetHeight ? t.bottom > this.$el.offsetHeight ? (this.realPlacement = "bottom", t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-end")) : t.left > this.$el.offsetWidth ? (this.realPlacement = "left", t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-end")) : t.right > this.$el.offsetWidth && (this.realPlacement = "right", t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-end")) : (t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-end")) : this.placement == "top-start" ? t.top < this.$el.offsetHeight ? t.bottom > this.$el.offsetHeight ? (this.realPlacement = "bottom-start", t.right + e.offsetWidth < this.$el.offsetWidth && (this.realPlacement = "bottom"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-end")) : t.left > this.$el.offsetWidth ? (this.realPlacement = "left", t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-end")) : t.right > this.$el.offsetWidth && (this.realPlacement = "right", t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-end")) : (t.right + e.offsetWidth < this.$el.offsetWidth && (this.realPlacement = "top"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-end")) : this.placement == "top-end" ? t.top < this.$el.offsetHeight ? t.bottom > this.$el.offsetHeight ? (this.realPlacement = "bottom-end", t.left + e.offsetWidth < this.$el.offsetWidth && (this.realPlacement = "bottom"), t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-start")) : t.left > this.$el.offsetWidth ? (this.realPlacement = "left", t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-end")) : t.right > this.$el.offsetWidth && (this.realPlacement = "right", t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-end")) : (t.left + e.offsetWidth < this.$el.offsetWidth && (this.realPlacement = "top"), t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-start")) : this.placement == "left" ? t.left < this.$el.offsetWidth ? t.right > this.$el.offsetWidth ? (this.realPlacement = "right", t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-end")) : t.top > this.$el.offsetHeight ? (this.realPlacement = "top", t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-end")) : t.bottom > this.$el.offsetHeight && (this.realPlacement = "bottom", t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-end")) : (t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-end")) : this.placement == "left-start" ? t.left < this.$el.offsetWidth ? t.right > this.$el.offsetWidth ? (this.realPlacement = "right-start", t.bottom + e.offsetHeight < this.$el.offsetHeight && (this.realPlacement = "right"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-end")) : t.top > this.$el.offsetHeight ? (this.realPlacement = "top", t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-end")) : t.bottom > this.$el.offsetHeight && (this.realPlacement = "bottom", t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-end")) : (t.bottom + e.offsetHeight < this.$el.offsetHeight && (this.realPlacement = "left"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-end")) : this.placement == "left-end" ? t.left < this.$el.offsetWidth ? t.right > this.$el.offsetWidth ? (this.realPlacement = "right-end", t.top + e.offsetHeight < this.$el.offsetHeight && (this.realPlacement = "right"), t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-start")) : t.top > this.$el.offsetHeight ? (this.realPlacement = "top", t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-end")) : t.bottom > this.$el.offsetHeight && (this.realPlacement = "bottom", t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-end")) : (t.top + e.offsetHeight < this.$el.offsetHeight && (this.realPlacement = "left"), t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-start")) : this.placement == "right" ? t.right < this.$el.offsetWidth ? t.left > this.$el.offsetWidth ? (this.realPlacement = "left", t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-end")) : t.top > this.$el.offsetHeight ? (this.realPlacement = "top", t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-end")) : t.bottom > this.$el.offsetHeight && (this.realPlacement = "bottom", t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-end")) : (t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-start"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-end")) : this.placement == "right-start" ? t.right < this.$el.offsetWidth ? t.left > this.$el.offsetWidth ? (this.realPlacement = "left-start", t.bottom + e.offsetHeight < this.$el.offsetHeight && (this.realPlacement = "left"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-end")) : t.top > this.$el.offsetHeight ? (this.realPlacement = "top", t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-end")) : t.bottom > this.$el.offsetHeight && (this.realPlacement = "bottom", t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-end")) : (t.bottom + e.offsetHeight < this.$el.offsetHeight && (this.realPlacement = "right"), t.bottom + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-end")) : this.placement == "right-end" && (t.right < this.$el.offsetWidth ? t.left > this.$el.offsetWidth ? (this.realPlacement = "left-end", t.top + e.offsetHeight < this.$el.offsetHeight && (this.realPlacement = "left"), t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "left-start")) : t.top > this.$el.offsetHeight ? (this.realPlacement = "top", t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "top-end")) : t.bottom > this.$el.offsetHeight && (this.realPlacement = "bottom", t.left + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-start"), t.right + e.offsetWidth / 2 < this.$el.offsetWidth / 2 && (this.realPlacement = "bottom-end")) : (t.top + e.offsetHeight < this.$el.offsetHeight && (this.realPlacement = "right"), t.top + e.offsetHeight / 2 < this.$el.offsetHeight / 2 && (this.realPlacement = "right-start")));
    },
    hideLayer(e) {
      if (this.layerShow && this.firstShow && this.closable) {
        if (l.element.isContains(this.$el, e.target) || l.element.isContains(this.getTargetEl(), e.target))
          return;
        this.$emit("update:modelValue", !1);
      }
    },
    beforeEnter(e) {
      l.data.get(e, "mvi-layer-beforeEnter-trigger") || (l.data.set(e, "mvi-layer-beforeEnter-trigger", !0), this.$emit("show", e), typeof this.layerComponentWatch == "function" && this.layerComponentWatch.apply(this, ["show", e]));
    },
    enter(e) {
      l.data.get(e, "mvi-layer-enter-trigger") || (l.data.set(e, "mvi-layer-enter-trigger", !0), this.$nextTick(() => {
        this.$emit("showing", e), this.autoAdjust(), this.reset(), this.$nextTick(() => {
          this.resetTriangle();
        }), typeof this.layerComponentWatch == "function" && this.layerComponentWatch.apply(this, ["showing", e]);
      }));
    },
    afterEnter(e) {
      this.$emit("shown", e), typeof this.layerComponentWatch == "function" && this.layerComponentWatch.apply(this, ["shown", e]);
    },
    beforeLeave(e) {
      l.data.remove(e, "mvi-layer-beforeEnter-trigger"), l.data.remove(e, "mvi-layer-enter-trigger"), this.$emit("hide", e), typeof this.layerComponentWatch == "function" && this.layerComponentWatch.apply(this, ["hide", e]);
    },
    leave(e) {
      this.$emit("hidding", e), typeof this.layerComponentWatch == "function" && this.layerComponentWatch.apply(this, ["hidding", e]);
    },
    afterLeave(e) {
      this.$emit("hidden", e), typeof this.layerComponentWatch == "function" && this.layerComponentWatch.apply(this, ["hidden", e]);
    },
    reset() {
      if (!l.element.isElement(this.$el))
        return;
      this.showTriangle && (this.$el.style.padding = 0, this.realPlacement == "bottom-start" || this.realPlacement == "bottom" || this.realPlacement == "bottom-end" ? this.$el.style.paddingTop = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetHeight}px)` : this.realPlacement == "top-start" || this.realPlacement == "top" || this.realPlacement == "top-end" ? this.$el.style.paddingBottom = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetHeight}px)` : this.realPlacement == "left-start" || this.realPlacement == "left" || this.realPlacement == "left-end" ? this.$el.style.paddingRight = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetWidth}px)` : (this.realPlacement == "right-start" || this.realPlacement == "right" || this.realPlacement == "right-end") && (this.$el.style.paddingLeft = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetWidth}px)`));
      let e = this.getTargetEl(), t = this.getRootEl(), s = l.element.getElementPoint(e, t);
      if (this.fixed)
        if (this.fixedAuto) {
          let r = !0, n = e.offsetParent;
          for (; r && n; )
            l.element.getCssStyle(n, "transform") != "none" ? r = !1 : n = n.offsetParent;
          s = l.element.getElementPoint(e, n);
        } else
          s = l.element.getElementBounding(e);
      this.realPlacement == "bottom" || this.realPlacement == "bottom-start" || this.realPlacement == "bottom-end" ? (this.$el.style.top = s.top + e.offsetHeight + "px", this.$el.style.bottom = "auto", this.realPlacement == "bottom" ? this.$el.style.left = s.left + e.offsetWidth / 2 - this.$el.offsetWidth / 2 + "px" : this.realPlacement == "bottom-start" ? this.$el.style.left = s.left + "px" : this.realPlacement == "bottom-end" && (this.$el.style.left = e.offsetWidth + s.left - this.$el.offsetWidth + "px"), this.$el.style.right = "auto") : this.realPlacement == "top" || this.realPlacement == "top-start" || this.realPlacement == "top-end" ? (this.$el.style.bottom = (this.fixed ? s.bottom + e.offsetHeight : t.clientHeight - s.top) + "px", this.$el.style.top = "auto", this.realPlacement == "top" ? this.$el.style.left = s.left + e.offsetWidth / 2 - this.$el.offsetWidth / 2 + "px" : this.realPlacement == "top-start" ? this.$el.style.left = s.left + "px" : this.realPlacement == "top-end" && (this.$el.style.left = e.offsetWidth + s.left - this.$el.offsetWidth + "px"), this.$el.style.right = "auto") : this.realPlacement == "left" || this.realPlacement == "left-start" || this.realPlacement == "left-end" ? (this.$el.style.right = (this.fixed ? s.right + e.offsetWidth : t.clientWidth - s.left) + "px", this.$el.style.left = "auto", this.realPlacement == "left" ? this.$el.style.top = s.top + e.offsetHeight / 2 - this.$el.offsetHeight / 2 + "px" : this.realPlacement == "left-start" ? this.$el.style.top = s.top + "px" : this.realPlacement == "left-end" && (this.$el.style.top = e.offsetHeight + s.top - this.$el.offsetHeight + "px"), this.$el.style.bottom = "auto") : (this.realPlacement == "right" || this.realPlacement == "right-start" || this.realPlacement == "right-end") && (this.$el.style.left = s.left + e.offsetWidth + "px", this.$el.style.right = "auto", this.realPlacement == "right" ? this.$el.style.top = s.top + e.offsetHeight / 2 - this.$el.offsetHeight / 2 + "px" : this.realPlacement == "right-start" ? this.$el.style.top = s.top + "px" : this.realPlacement == "right-end" && (this.$el.style.top = e.offsetHeight + s.top - this.$el.offsetHeight + "px"), this.$el.style.bottom = "auto");
    },
    resetTriangle() {
      if (!this.showTriangle || this.$refs.triangle && !this.$refs.triangle.$el)
        return;
      const e = this.getTargetEl().offsetWidth, t = this.$el.offsetWidth, s = this.getTargetEl().offsetHeight, r = this.$el.offsetHeight, n = this.$refs.triangle.$el.offsetWidth, i = this.$refs.triangle.$el.offsetHeight;
      this.realPlacement == "bottom-start" ? (this.$refs.triangle.$el.style.top = "auto", this.$refs.triangle.$el.style.right = "auto", this.$refs.triangle.$el.style.bottom = "100%", this.$refs.triangle.$el.style.left = (e > t ? t : e) / 2 - n / 2 + "px") : this.realPlacement == "bottom" ? (this.$refs.triangle.$el.style.top = "auto", this.$refs.triangle.$el.style.right = "auto", this.$refs.triangle.$el.style.bottom = "100%", this.$refs.triangle.$el.style.left = t / 2 - n / 2 + "px") : this.realPlacement == "bottom-end" ? (this.$refs.triangle.$el.style.top = "auto", this.$refs.triangle.$el.style.left = "auto", this.$refs.triangle.$el.style.bottom = "100%", this.$refs.triangle.$el.style.right = (e > t ? t : e) / 2 - n / 2 + "px") : this.realPlacement == "top-start" ? (this.$refs.triangle.$el.style.top = "100%", this.$refs.triangle.$el.style.right = "auto", this.$refs.triangle.$el.style.bottom = "auto", this.$refs.triangle.$el.style.left = (e > t ? t : e) / 2 - n / 2 + "px") : this.realPlacement == "top" ? (this.$refs.triangle.$el.style.top = "100%", this.$refs.triangle.$el.style.right = "auto", this.$refs.triangle.$el.style.bottom = "auto", this.$refs.triangle.$el.style.left = t / 2 - n / 2 + "px") : this.realPlacement == "top-end" ? (this.$refs.triangle.$el.style.top = "100%", this.$refs.triangle.$el.style.left = "auto", this.$refs.triangle.$el.style.bottom = "auto", this.$refs.triangle.$el.style.right = (e > t ? t : e) / 2 - n / 2 + "px") : this.realPlacement == "left-start" ? (this.$refs.triangle.$el.style.left = "100%", this.$refs.triangle.$el.style.right = "auto", this.$refs.triangle.$el.style.top = (s > r ? r : s) / 2 - i / 2 + "px", this.$refs.triangle.$el.style.bottom = "auto") : this.realPlacement == "left" ? (this.$refs.triangle.$el.style.left = "100%", this.$refs.triangle.$el.style.right = "auto", this.$refs.triangle.$el.style.top = r / 2 - i / 2 + "px", this.$refs.triangle.$el.style.bottom = "auto") : this.realPlacement == "left-end" ? (this.$refs.triangle.$el.style.left = "100%", this.$refs.triangle.$el.style.right = "auto", this.$refs.triangle.$el.style.bottom = (s > r ? r : s) / 2 - i / 2 + "px", this.$refs.triangle.$el.style.top = "auto") : this.realPlacement == "right-start" ? (this.$refs.triangle.$el.style.right = "100%", this.$refs.triangle.$el.style.left = "auto", this.$refs.triangle.$el.style.top = (s > r ? r : s) / 2 - i / 2 + "px", this.$refs.triangle.$el.style.bottom = "auto") : this.realPlacement == "right" ? (this.$refs.triangle.$el.style.right = "100%", this.$refs.triangle.$el.style.left = "auto", this.$refs.triangle.$el.style.top = r / 2 - i / 2 + "px", this.$refs.triangle.$el.style.bottom = "auto") : this.realPlacement == "right-end" && (this.$refs.triangle.$el.style.right = "100%", this.$refs.triangle.$el.style.left = "auto", this.$refs.triangle.$el.style.bottom = (s > r ? r : s) / 2 - i / 2 + "px", this.$refs.triangle.$el.style.top = "auto");
    },
    getTargetEl() {
      return this.target && document.body.querySelector(this.target) || document.body;
    },
    getRootEl() {
      return this.fixed ? document.body : this.root && document.body.querySelector(this.root) || document.body;
    }
  },
  beforeUnmount() {
    l.event.off(
      window,
      `resize.layer_${this.uid} click.layer_${this.uid}`
    );
  }
};
function yn(e, t, s, r, n, i) {
  const f = x("m-triangle");
  return o(), I(G, {
    name: s.animation || "mvi-layer",
    onBeforeEnter: i.beforeEnter,
    onEnter: i.enter,
    onAfterEnter: i.afterEnter,
    onLeave: i.leave,
    onBeforeLeave: i.beforeLeave,
    onAfterLeave: i.afterLeave
  }, {
    default: P(() => [
      n.firstShow ? B((o(), u("div", {
        key: 0,
        class: y(["mvi-layer", s.fixed ? "mvi-layer-fixed" : ""]),
        style: b(i.layerStyle)
      }, [
        v("div", {
          class: y(i.wrapperCls),
          style: b(i.wrapperStyle)
        }, [
          s.showTriangle ? (o(), I(f, {
            key: 0,
            ref: "triangle",
            class: "mvi-layer-triangle",
            placement: i.trianglePlacement,
            background: s.background,
            "border-color": s.border && s.borderColor ? s.borderColor : s.background,
            size: "0.14rem"
          }, null, 8, ["placement", "background", "border-color"])) : g("", !0),
          S(e.$slots, "default", {}, void 0, !0)
        ], 6)
      ], 6)), [
        [j, n.layerShow]
      ]) : g("", !0)
    ]),
    _: 3
  }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onLeave", "onBeforeLeave", "onAfterLeave"]);
}
const ee = /* @__PURE__ */ T(gn, [["render", yn], ["__scopeId", "data-v-d52565a6"]]);
const bn = {
  name: "m-tooltip",
  data() {
    return {
      show: !1
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
      validator(e) {
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
        ].includes(e);
      }
    },
    disabled: {
      type: Boolean,
      default: !1
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
      validator(e) {
        return ["hover", "click", "custom"].includes(e);
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
      default: !1
    },
    fixedAuto: {
      type: Boolean,
      default: !1
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
      default: !0
    },
    block: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    contentStyle() {
      let e = {};
      return this.textColor && (e.color = this.textColor), this.width && (e.whiteSpace = "normal"), e;
    }
  },
  components: {
    mLayer: ee
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  methods: {
    hoverShowTooltip() {
      this.trigger == "hover" && this.showTooltip();
    },
    hoverHideToolTip() {
      this.trigger == "hover" && this.hideTooltip();
    },
    clickShowTooltip() {
      this.trigger === "click" && (this.show ? this.hideTooltip() : this.showTooltip());
    },
    showTooltip() {
      this.disabled || (this.show = !0);
    },
    hideTooltip() {
      this.disabled || (this.show = !1);
    }
  }
}, vn = ["data-id"], wn = ["data-id"], Cn = ["textContent"];
function xn(e, t, s, r, n, i) {
  const f = x("m-layer");
  return o(), u("div", {
    class: y(["mvi-tooltip", s.block ? "mvi-tooltip-block" : ""]),
    "data-id": "mvi-tooltip-" + r.uid
  }, [
    v("div", {
      onClick: t[0] || (t[0] = (...a) => i.clickShowTooltip && i.clickShowTooltip(...a)),
      onMouseenter: t[1] || (t[1] = (...a) => i.hoverShowTooltip && i.hoverShowTooltip(...a)),
      onMouseleave: t[2] || (t[2] = (...a) => i.hoverHideToolTip && i.hoverHideToolTip(...a)),
      class: "mvi-tooltip-toggle",
      ref: "toggle",
      "data-id": "mvi-tooltip-target-" + r.uid
    }, [
      S(e.$slots, "default", {}, void 0, !0)
    ], 40, wn),
    D(f, {
      modelValue: n.show,
      "onUpdate:modelValue": t[3] || (t[3] = (a) => n.show = a),
      offset: s.offset,
      background: s.color,
      border: "",
      "border-color": s.borderColor,
      closable: "",
      "show-triangle": s.showTriangle,
      "z-index": s.zIndex,
      target: `[data-id='mvi-tooltip-target-${r.uid}']`,
      root: `[data-id='mvi-tooltip-${r.uid}']`,
      placement: s.placement,
      fixed: s.fixed,
      "fixed-auto": s.fixedAuto,
      width: s.width,
      timeout: s.timeout,
      animation: s.animation || "mvi-tooltip",
      shadow: !1
    }, {
      default: P(() => [
        v("div", {
          class: "mvi-tooltip-content",
          ref: "content",
          style: b(i.contentStyle)
        }, [
          e.$slots.title ? S(e.$slots, "title", { key: 0 }, void 0, !0) : (o(), u("span", {
            key: 1,
            textContent: _(s.title)
          }, null, 8, Cn))
        ], 4)
      ]),
      _: 3
    }, 8, ["modelValue", "offset", "background", "border-color", "show-triangle", "z-index", "target", "root", "placement", "fixed", "fixed-auto", "width", "timeout", "animation"])
  ], 10, vn);
}
const be = /* @__PURE__ */ T(bn, [["render", xn], ["__scopeId", "data-v-2f8ba811"]]);
be.install = (e) => {
  e.component(be.name, be);
};
const In = {
  name: "m-color-picker",
  data() {
    return {
      hsv: new Array(3),
      opacity: 1,
      rgb: new Array(3),
      drag: !1,
      isDrag: !1,
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
      default: !0
    },
    hex: {
      type: Boolean,
      default: !1
    }
  },
  watch: {
    modelValue(e) {
      this.drag || this.initSet();
    },
    showAlpha(e) {
      e && this.$nextTick(() => {
        this.setDragsAndProps();
      });
    }
  },
  mounted() {
    this.setDragsAndProps(), this.initSet();
  },
  methods: {
    setDragsAndProps() {
      this.panelProp || (this.panelProp = new lt(this.$refs.panel, 0.7), this.panelProp.init()), this.panelDrag || (this.panelDrag = new ie(this.$refs.panelSlide, {
        container: this.$refs.panel,
        mode: "on",
        draggableX: !0,
        draggableY: !0,
        cursor: !1,
        beforedrag: () => {
          this.drag = !0, this.isDrag = !0;
        },
        drag: () => {
          this.setColorBySlides();
        },
        dragged: () => {
          this.drag = !1, this.$nextTick(() => {
            setTimeout(() => {
              this.isDrag = !1;
            }, 10);
          });
        }
      }), this.panelDrag.init()), this.hueDrag || (this.hueDrag = new ie(this.$refs.hueSlide, {
        container: this.$refs.hue,
        mode: "on",
        draggableX: !0,
        draggableY: !1,
        cursor: !1,
        beforedrag: () => {
          this.drag = !0, this.isDrag = !0;
        },
        drag: () => {
          this.setColorBySlides();
        },
        dragged: () => {
          this.drag = !1, this.$nextTick(() => {
            setTimeout(() => {
              this.isDrag = !1;
            }, 10);
          });
        }
      }), this.hueDrag.init()), this.showAlpha && !this.hex && !this.alphaDrag && (this.alphaDrag = new ie(this.$refs.alphaSlide, {
        container: this.$refs.alpha,
        mode: "on",
        draggableX: !0,
        draggableY: !1,
        cursor: !1,
        beforedrag: () => {
          this.drag = !0, this.isDrag = !0;
        },
        drag: () => {
          this.setColorBySlides();
        },
        dragged: () => {
          this.drag = !1, this.$nextTick(() => {
            setTimeout(() => {
              this.isDrag = !1;
            }, 10);
          });
        }
      }), this.alphaDrag.init());
    },
    clickPanelSetColor(e) {
      this.isDrag || (this.drag = !0, this.$refs.panelSlide.style.left = e.offsetX - this.$refs.panelSlide.offsetWidth / 2 + "px", this.$refs.panelSlide.style.top = e.offsetY - this.$refs.panelSlide.offsetHeight / 2 + "px", this.setColorBySlides().then(() => {
        this.drag = !1;
      }));
    },
    clickHueSetColor(e) {
      this.isDrag || (this.drag = !0, this.$refs.hueSlide.style.left = e.offsetX - this.$refs.hueSlide.offsetWidth / 2 + "px", this.setColorBySlides().then(() => {
        this.drag = !1;
      }));
    },
    clickAlphaSetColor(e) {
      this.isDrag || (this.drag = !0, this.$refs.alphaSlide.style.left = e.offsetX - this.$refs.alphaSlide.offsetWidth / 2 + "px", this.setColorBySlides().then(() => {
        this.drag = !1;
      }));
    },
    initSet() {
      if (!this.drag) {
        if (this.modelValue && l.common.matchingText(this.modelValue, "hex"))
          this.rgb = l.color.hex2rgb(this.modelValue), this.hsv = l.color.rgb2hsv(this.rgb), this.opacity = 1;
        else
          try {
            let e = this.modelValue.indexOf("("), t = this.modelValue.lastIndexOf(")"), r = this.modelValue.substring(e + 1, t).split(",");
            if (r.length < 3)
              throw new Error(
                "Color values are not RGB (RGBA) format and hexadecimal format"
              );
            this.rgb = [
              Number(r[0]),
              Number(r[1]),
              Number(r[2])
            ], r.length == 4 ? this.opacity = r[3] : this.opacity = 1, this.hsv = l.color.rgb2hsv(this.rgb), this.hex && this.$emit(
              "update:modelValue",
              l.color.rgb2hex(this.rgb)
            );
          } catch {
            throw new Error(
              "Color values are not RGB (RGBA) format and hexadecimal format"
            );
          }
        this.setSlidesByColor();
      }
    },
    setSlidesByColor() {
      if (this.drag)
        return;
      let e = this.hsv[0], t = this.hsv[1], s = this.hsv[2];
      this.$refs.panelSlide.style.left = t / 100 * this.$refs.panel.offsetWidth - this.$refs.panelSlide.offsetWidth / 2 + "px", this.$refs.panelSlide.style.top = (1 - s / 100) * this.$refs.panel.offsetHeight - this.$refs.panelSlide.offsetHeight / 2 + "px", this.$refs.hueSlide.style.left = e / 360 * this.$refs.hue.offsetWidth - this.$refs.hueSlide.offsetWidth / 2 + "px";
      let r = l.color.hsv2rgb([e, 100, 100]);
      this.$refs.panel.style.background = "rgba(" + r[0] + "," + r[1] + "," + r[2] + "," + this.opacity + ")", this.$refs.alphaSlide && this.$refs.alpha && this.$refs.bg && (this.$refs.alphaSlide.style.left = this.opacity * this.$refs.alpha.offsetWidth - this.$refs.alphaSlide.offsetWidth / 2 + "px", this.$refs.bg.style.background = "linear-gradient(to right, transparent 0%,rgb(" + r[0] + "," + r[1] + "," + r[2] + ") 100%)");
    },
    setColorBySlides() {
      return new Promise((e) => {
        let t = l.element.getElementPoint(
          this.$refs.panelSlide,
          this.$refs.panel
        ), s = l.element.getElementPoint(
          this.$refs.hueSlide,
          this.$refs.hue
        );
        this.hsv[1] = Math.round(
          (t.left + this.$refs.panelSlide.offsetWidth / 2) / this.$refs.panel.offsetWidth * 100
        ), this.hsv[2] = Math.round(
          (1 - (t.top + this.$refs.panelSlide.offsetHeight / 2) / this.$refs.panel.offsetHeight) * 100
        ), this.hsv[0] = Math.round(
          (s.left + this.$refs.hueSlide.offsetWidth / 2) / this.$refs.hue.offsetWidth * 360
        ), this.rgb = l.color.hsv2rgb(this.hsv);
        let r = l.color.hsv2rgb([this.hsv[0], 100, 100]);
        this.$refs.panel.style.background = "rgba(" + r[0] + "," + r[1] + "," + r[2] + "," + this.opacity + ")";
        let n = null;
        if (this.$refs.alphaSlide && this.$refs.alpha && this.$refs.bg && (n = l.element.getElementPoint(
          this.$refs.alphaSlide,
          this.$refs.alpha
        ), this.opacity = Math.round(
          (n.left + this.$refs.alphaSlide.offsetWidth / 2) / this.$refs.alpha.offsetWidth * 100
        ) / 100, this.opacity >= 1 && (this.opacity = 1), this.opacity <= 0 && (this.opacity = 0), this.$refs.bg.style.background = "linear-gradient(to right, transparent 0%,rgb(" + r[0] + "," + r[1] + "," + r[2] + ") 100%)"), this.opacity == 1) {
          let i = `rgb(${this.rgb.toString()})`;
          this.hex && (i = l.color.rgb2hex(this.rgb)), this.$emit("update:modelValue", i), this.$emit("change", {
            hex: l.color.rgb2hex(this.rgb),
            rgb: this.rgb,
            opacity: this.opacity,
            hsv: this.hsv
          });
        } else {
          let i = `rgba(${this.rgb.toString()},${this.opacity})`;
          this.hex && (i = l.color.rgb2hex(this.rgb)), this.$emit("update:modelValue", i), this.$emit("change", {
            hex: l.color.rgb2hex(this.rgb),
            rgb: this.rgb,
            opacity: this.opacity,
            hsv: this.hsv
          });
        }
        this.$nextTick(() => {
          e();
        });
      });
    }
  },
  beforeUnmount() {
    this.panelDrag && this.panelDrag._setOff(), this.hueDrag && this.hueDrag._setOff(), this.alphaDrag && this.alphaDrag._setOff(), this.panelProp && this.panelProp._setOff();
  }
}, Sn = { class: "mvi-colorPicker" }, _n = {
  ref: "panelSlide",
  class: "mvi-colorPicker-panel-slide"
}, Tn = {
  ref: "hueSlide",
  class: "mvi-colorPicker-hue-slide"
}, kn = {
  ref: "alphaSlide",
  class: "mvi-colorPicker-alpha-slide"
}, Dn = {
  ref: "bg",
  class: "mvi-colorPicker-alpha-background"
};
function Pn(e, t, s, r, n, i) {
  return o(), u("div", Sn, [
    v("div", {
      ref: "panel",
      class: "mvi-colorPicker-panel",
      onClick: t[0] || (t[0] = (...f) => i.clickPanelSetColor && i.clickPanelSetColor(...f))
    }, [
      v("div", _n, null, 512)
    ], 512),
    v("div", {
      ref: "hue",
      class: "mvi-colorPicker-hue",
      onClick: t[1] || (t[1] = (...f) => i.clickHueSetColor && i.clickHueSetColor(...f))
    }, [
      v("div", Tn, null, 512)
    ], 512),
    s.showAlpha && !s.hex ? (o(), u("div", {
      key: 0,
      ref: "alpha",
      class: "mvi-colorPicker-alpha",
      onClick: t[2] || (t[2] = (...f) => i.clickAlphaSetColor && i.clickAlphaSetColor(...f))
    }, [
      v("div", kn, null, 512),
      v("div", Dn, null, 512)
    ], 512)) : g("", !0)
  ]);
}
const Le = /* @__PURE__ */ T(In, [["render", Pn], ["__scopeId", "data-v-4514d608"]]);
Le.install = (e) => {
  e.component(Le.name, Le);
};
const zn = {
  name: "m-rich-image",
  data() {
    return {
      isDoubleTouch: !1,
      touchDistance: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
      startX: 0,
      startY: 0,
      canMove: !1,
      downPoint: null,
      upPoint: null,
      isTriggerDouble: !1,
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
    mImage: de
  },
  computed: {
    imgStyle() {
      return {
        transform: `scale(${this.scale}) translate(${this.translateX}px,${this.translateY}px) rotate(${this.rotate}deg)`
      };
    }
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  mounted() {
    l.event.on(
      document.documentElement,
      `mousemove.richImage_${this.uid}`,
      this.imageMouseMove
    ), l.event.on(
      document.documentElement,
      `mouseup.richImage_${this.uid} mouseleave.richImage_${this.uid}`,
      this.imageMouseUp
    );
  },
  methods: {
    leftRotate() {
      this.translateX = 0, this.translateY = 0, this.scale = 1, this.rotate -= 90;
    },
    rightRotate() {
      this.translateX = 0, this.translateY = 0, this.scale = 1, this.rotate += 90;
    },
    scalePlus() {
      this.scale < this.maxScale && (this.translateX = 0, this.translateY = 0, this.scale = l.number.add(this.scale, 0.1));
    },
    scaleMinus() {
      this.scale > this.minScale && (this.translateX = 0, this.translateY = 0, this.scale = l.number.subtract(this.scale, 0.1));
    },
    scaleImageByWheel(e) {
      e.cancelable && e.preventDefault(), (e.wheelDeltaY || -e.deltaY) > 0 ? this.scalePlus() : this.scaleMinus();
    },
    scaleImageByTouch(e, t) {
      if (e == 0)
        this.isTriggerDouble = !1, t.touches.length == 2 ? (this.disableSwiperTouch(), this.isDoubleTouch = !0, this.canMove = !1, this.touchDistance = this.getDistance(
          t.touches[0],
          t.touches[1]
        )) : (this.isDoubleTouch = !1, this.scale > 1 && (this.disableSwiperTouch(), this.startX = t.targetTouches[0].pageX, this.startY = t.targetTouches[0].pageY, this.canMove = !0));
      else if (e == 1)
        if (t.touches.length == 2 && this.isDoubleTouch) {
          t.cancelable && t.preventDefault();
          let s = this.getDistance(
            t.touches[0],
            t.touches[1]
          );
          s < this.touchDistance ? this.scale > this.minScale && (this.translateX = 0, this.translateY = 0, this.scale = l.number.add(
            this.scale,
            l.number.divide(
              l.number.subtract(
                s,
                this.touchDistance
              ),
              this.$el.offsetWidth
            )
          )) : this.scale < this.maxScale && (this.translateX = 0, this.translateY = 0, this.scale = l.number.add(
            this.scale,
            l.number.divide(
              l.number.subtract(
                s,
                this.touchDistance
              ),
              this.$el.offsetWidth
            )
          )), this.touchDistance = s;
        } else {
          t.cancelable && t.preventDefault();
          let s = t.targetTouches[0].pageX, r = t.targetTouches[0].pageY;
          this.canMove && this.imageTranslate(s, r);
        }
      else
        e == 2 && (this.isDoubleTouch ? (this.scale < 1 && this.doTransition(() => {
          this.scale = 1;
        }), this.isTriggerDouble = !0, this.isDoubleTouch = !1, this.enableSwiperTouch()) : this.canMove && !this.isTriggerDouble && this.imageTranslateEnd());
    },
    getDistance(e, t) {
      let s = t.pageX - e.pageX, r = t.pageY - e.pageY;
      return Math.sqrt(s * s + r * r);
    },
    reset() {
      this.scale = 1, this.translateX = 0, this.translateY = 0, this.rotate = 0, this.enableSwiperTouch();
    },
    judgeClose(e, t) {
      e == 0 ? this.downPoint = {
        x: t.pageX,
        y: t.pageY
      } : e == 1 && (this.upPoint = {
        x: t.pageX,
        y: t.pageY
      });
    },
    closePreview() {
      this.downPoint && this.upPoint && this.downPoint.x == this.upPoint.x && this.downPoint.y == this.upPoint.y && this.$emit("close-preview");
    },
    imageMouseDown(e) {
      this.scale <= 1 || (this.disableSwiperTouch(), this.startX = e.pageX, this.startY = e.pageY, this.canMove = !0);
    },
    imageMouseMove(e) {
      e.cancelable && e.preventDefault();
      let t = e.pageX, s = e.pageY;
      this.canMove && this.imageTranslate(t, s);
    },
    imageMouseUp(e) {
      this.canMove && this.imageTranslateEnd();
    },
    doTransition(e) {
      this.$refs.img.$el.style.transition = "transform 300ms", this.$refs.img.$el.style.webkitTransition = "transform 300ms", this.$refs.img.$el.offsetWidth, e(), setTimeout(() => {
        this.$refs.img.$el.style.transition = "", this.$refs.img.$el.style.webkitTransition = "", this.$refs.img.$el.offsetWidth;
      }, 300);
    },
    imageTranslate(e, t) {
      let s = l.number.divide(e - this.startX, 2), r = l.number.divide(t - this.startY, 2);
      const n = l.element.getElementBounding(
        this.$refs.img.$el
      );
      s > 0 && n.left >= 0 || s < 0 && n.right >= 0 || r > 0 && n.top >= 0 || r < 0 && n.bottom >= 0 || (this.translateX = this.translateX + s, this.translateY = this.translateY + r, this.startX = e, this.startY = t);
    },
    imageTranslateEnd() {
      const e = l.element.getElementBounding(
        this.$refs.img.$el
      );
      e.left > 0 && this.doTransition(() => {
        this.translateX = this.translateX - e.left;
      }), e.top > 0 && this.doTransition(() => {
        this.translateY = this.translateY - e.top;
      }), e.right > 0 && this.doTransition(() => {
        this.translateX = this.translateX + e.right;
      }), e.bottom > 0 && this.doTransition(() => {
        this.translateY = this.translateY + e.bottom;
      }), this.canMove = !1, this.enableSwiperTouch();
    },
    disableSwiperTouch() {
      clearTimeout(this.timer), this.$emit("disable-swiper-touch");
    },
    enableSwiperTouch() {
      this.timer = setTimeout(() => {
        this.$emit("enable-swiper-touch");
      }, 100);
    }
  },
  beforeUnmount() {
    l.event.off(
      document.documentElement,
      `mousemove.richImage_${this.uid} mouseup.richImage_${this.uid} mouseleave.richImage_${this.uid}`
    );
  }
};
function An(e, t, s, r, n, i) {
  const f = x("m-image");
  return o(), u("div", {
    class: "mvi-rich-image",
    onMousewheel: t[0] || (t[0] = (...a) => i.scaleImageByWheel && i.scaleImageByWheel(...a)),
    onTouchstart: t[1] || (t[1] = (a) => i.scaleImageByTouch(0, a)),
    onTouchmove: t[2] || (t[2] = (a) => i.scaleImageByTouch(1, a)),
    onTouchend: t[3] || (t[3] = (a) => i.scaleImageByTouch(2, a)),
    onMousedown: t[4] || (t[4] = (a) => i.judgeClose(0, a)),
    onMouseup: t[5] || (t[5] = (a) => i.judgeClose(1, a)),
    onClick: t[6] || (t[6] = (...a) => i.closePreview && i.closePreview(...a))
  }, [
    D(f, {
      ref: "img",
      fit: "response",
      onMousedown: i.imageMouseDown,
      style: b(i.imgStyle),
      width: "100%",
      height: "100%",
      src: s.src,
      "load-icon": s.loadIcon,
      "error-icon": s.errorIcon
    }, null, 8, ["onMousedown", "style", "src", "load-icon", "error-icon"])
  ], 32);
}
const En = /* @__PURE__ */ T(zn, [["render", An], ["__scopeId", "data-v-c4dcd444"]]);
const Mn = {
  name: "m-image-preview",
  data() {
    return {
      firstShow: !1,
      enableTouch: !0,
      imageRefs: []
    };
  },
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: Boolean,
      default: !1
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
      default: !0
    },
    zIndex: {
      type: Number,
      default: 5e3
    },
    fade: {
      type: Boolean,
      default: !1
    },
    showControl: {
      type: Boolean,
      default: !1
    },
    controlClass: {
      type: String,
      default: null
    },
    usePadding: {
      type: Boolean,
      default: !1
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
      default: !1
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
    mOverlay: Q,
    mSwiper: me,
    mSwiperSlide: yt,
    mRichImage: En
  },
  methods: {
    resetImage(e) {
      this.imageRefs[e].reset();
    },
    plusImage(e) {
      this.imageRefs[e].scalePlus();
    },
    minusImage(e) {
      this.imageRefs[e].scaleMinus();
    },
    leftRotateImage(e) {
      this.imageRefs[e].leftRotate();
    },
    rightRotateImage(e) {
      this.imageRefs[e].rightRotate();
    },
    overlayShowing() {
      this.firstShow || (this.firstShow = !0);
    },
    closeOverlay(e) {
      for (let t of this.imageRefs)
        t.reset();
      this.$emit("update:modelValue", !1);
    },
    swiperChange(e) {
      for (let t of this.imageRefs)
        t.reset();
      this.$emit("change", e);
    }
  }
}, Bn = (e) => (Ct("data-v-e69ae2bd"), e = e(), xt(), e), On = {
  key: 0,
  class: "mvi-image-preview-page"
}, Hn = { key: 1 }, Vn = ["textContent"], $n = /* @__PURE__ */ Bn(() => /* @__PURE__ */ v("span", null, "/", -1)), jn = ["textContent"], Wn = {
  key: 1,
  class: "mvi-image-preview-footer"
}, Fn = {
  key: 0,
  class: "mvi-image-preview-tools"
}, Rn = ["textContent"];
function Yn(e, t, s, r, n, i) {
  const f = x("m-rich-image"), a = x("m-swiper-slide"), c = x("m-icon"), d = x("m-swiper"), h = x("m-overlay");
  return o(), I(h, {
    ref: "overlay",
    "model-value": s.modelValue,
    color: "#000",
    fade: !1,
    onShowing: i.overlayShowing,
    "z-index": s.zIndex,
    "use-padding": s.usePadding,
    mountEl: s.mountEl
  }, {
    default: P(() => [
      n.firstShow ? (o(), I(d, {
        key: 0,
        class: "mvi-image-preview-swiper",
        "initial-slide": s.active,
        "show-indicators": "",
        ref: "swiper",
        onChange: i.swiperChange,
        "show-control": s.showControl,
        fade: s.fade,
        "control-class": s.controlClass,
        touchable: n.enableTouch
      }, {
        indicators: P((m) => [
          s.showPage ? (o(), u("div", On, [
            e.$slots.page ? S(e.$slots, "page", {
              key: 0,
              total: m.total,
              current: m.active
            }, void 0, !0) : (o(), u("div", Hn, [
              v("span", {
                textContent: _(m.active + 1)
              }, null, 8, Vn),
              $n,
              v("span", {
                textContent: _(m.total)
              }, null, 8, jn)
            ]))
          ])) : g("", !0),
          s.useTools || e.$slots.descriptions || s.descriptions.length > 0 ? (o(), u("div", Wn, [
            s.useTools ? (o(), u("div", Fn, [
              D(c, {
                onClick: (p) => i.plusImage(m.active),
                class: "mvi-image-preview-tools-icon",
                type: "search-plus-o"
              }, null, 8, ["onClick"]),
              D(c, {
                onClick: (p) => i.minusImage(m.active),
                class: "mvi-image-preview-tools-icon",
                type: "search-minus-o"
              }, null, 8, ["onClick"]),
              D(c, {
                onClick: (p) => i.resetImage(m.active),
                class: "mvi-image-preview-tools-icon",
                type: "double-circle"
              }, null, 8, ["onClick"]),
              D(c, {
                onClick: (p) => i.leftRotateImage(m.active),
                class: "mvi-image-preview-tools-icon",
                type: "left-rotate"
              }, null, 8, ["onClick"]),
              D(c, {
                onClick: (p) => i.rightRotateImage(m.active),
                class: "mvi-image-preview-tools-icon",
                type: "right-rotate"
              }, null, 8, ["onClick"]),
              e.$slots.tools ? S(e.$slots, "tools", { key: 0 }, void 0, !0) : g("", !0)
            ])) : g("", !0),
            e.$slots.descriptions || s.descriptions.length > 0 ? (o(), u("div", {
              key: 1,
              class: y(["mvi-image-preview-description", s.useTools ? "mvi-image-preview-description-margin" : ""])
            }, [
              e.$slots.descriptions ? S(e.$slots, "descriptions", {
                key: 0,
                total: m.total,
                current: m.active
              }, void 0, !0) : s.descriptions.length > 0 ? (o(), u("div", {
                key: 1,
                class: "mvi-image-preview-description-el",
                textContent: _(s.descriptions[m.active])
              }, null, 8, Rn)) : g("", !0)
            ], 2)) : g("", !0)
          ])) : g("", !0)
        ]),
        default: P(() => [
          (o(!0), u(A, null, O(s.images, (m, p) => (o(), I(a, {
            key: "image-" + p,
            class: "mvi-preview-container"
          }, {
            default: P(() => [
              D(f, {
                ref_for: !0,
                ref: (w) => n.imageRefs[p] = w,
                onClosePreview: i.closeOverlay,
                onDisableSwiperTouch: t[0] || (t[0] = (w) => n.enableTouch = !1),
                onEnableSwiperTouch: t[1] || (t[1] = (w) => n.enableTouch = !0),
                src: m,
                "error-icon": s.errorIcon,
                "load-icon": s.loadIcon,
                "max-scale": s.maxScale,
                "min-scale": s.minScale
              }, null, 8, ["onClosePreview", "src", "error-icon", "load-icon", "max-scale", "min-scale"])
            ]),
            _: 2
          }, 1024))), 128))
        ]),
        _: 3
      }, 8, ["initial-slide", "onChange", "show-control", "fade", "control-class", "touchable"])) : g("", !0)
    ]),
    _: 3
  }, 8, ["model-value", "onShowing", "z-index", "use-padding", "mountEl"]);
}
const Ue = /* @__PURE__ */ T(Mn, [["render", Yn], ["__scopeId", "data-v-e69ae2bd"]]);
Ue.install = (e) => {
  e.component(Ue.name, Ue);
};
const Nn = {
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
      validator(e) {
        return e % 2 != 0;
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
      default: !1
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
      default: !0
    }
  },
  computed: {
    pageStyle() {
      return (e) => {
        let t = {};
        return this.modelValue == e ? (this.el && (t.color = l.element.getCssStyle(
          this.el,
          "background-color"
        )), t.backgroundColor = this.color || "") : t.color = this.color || "", t;
      };
    },
    arr() {
      let e = [];
      if (this.modelValue <= (this.overNumber - 1) / 2 + 1)
        for (let t = 0; t < this.overNumber; t++)
          e.push(t + 1);
      else if (this.modelValue <= this.total - (this.overNumber - 1) / 2) {
        for (let t = 0; t < (this.overNumber - 1) / 2; t++)
          e.push(this.modelValue - ((this.overNumber - 1) / 2 - t));
        e.push(this.modelValue);
        for (let t = 0; t < (this.overNumber - 1) / 2; t++)
          e.push(this.modelValue + (t + 1));
      } else
        for (let t = 0; t < this.overNumber; t++)
          e.push(this.total - (this.overNumber - 1 - t));
      return e;
    },
    firstIconType() {
      let e = "angle-double-left";
      return l.common.isObject(this.firstIcon) ? typeof this.firstIcon.type == "string" && (e = this.firstIcon.type) : typeof this.firstIcon == "string" && (e = this.firstIcon), e;
    },
    firstIconUrl() {
      let e = null;
      return l.common.isObject(this.firstIcon) && typeof this.firstIcon.url == "string" && (e = this.firstIcon.url), e;
    },
    firstIconSpin() {
      let e = !1;
      return l.common.isObject(this.firstIcon) && typeof this.firstIcon.spin == "boolean" && (e = this.firstIcon.spin), e;
    },
    firstIconSize() {
      let e = null;
      return l.common.isObject(this.firstIcon) && typeof this.firstIcon.size == "string" && (e = this.firstIcon.size), e;
    },
    firstIconColor() {
      let e = null;
      return l.common.isObject(this.firstIcon) && typeof this.firstIcon.color == "string" && (e = this.firstIcon.color), e;
    },
    lastIconType() {
      let e = "angle-double-right";
      return l.common.isObject(this.lastIcon) ? typeof this.lastIcon.type == "string" && (e = this.lastIcon.type) : typeof this.lastIcon == "string" && (e = this.lastIcon), e;
    },
    lastIconUrl() {
      let e = null;
      return l.common.isObject(this.lastIcon) && typeof this.lastIcon.url == "string" && (e = this.lastIcon.url), e;
    },
    lastIconSpin() {
      let e = !1;
      return l.common.isObject(this.lastIcon) && typeof this.lastIcon.spin == "boolean" && (e = this.lastIcon.spin), e;
    },
    lastIconSize() {
      let e = null;
      return l.common.isObject(this.lastIcon) && typeof this.lastIcon.size == "string" && (e = this.lastIcon.size), e;
    },
    lastIconColor() {
      let e = null;
      return l.common.isObject(this.lastIcon) && typeof this.lastIcon.color == "string" && (e = this.lastIcon.color), e;
    },
    prevIconType() {
      let e = "angle-left";
      return l.common.isObject(this.prevIcon) ? typeof this.prevIcon.type == "string" && (e = this.prevIcon.type) : typeof this.prevIcon == "string" && (e = this.prevIcon), e;
    },
    prevIconUrl() {
      let e = null;
      return l.common.isObject(this.prevIcon) && typeof this.prevIcon.url == "string" && (e = this.prevIcon.url), e;
    },
    prevIconSpin() {
      let e = !1;
      return l.common.isObject(this.prevIcon) && typeof this.prevIcon.spin == "boolean" && (e = this.prevIcon.spin), e;
    },
    prevIconSize() {
      let e = null;
      return l.common.isObject(this.prevIcon) && typeof this.prevIcon.size == "string" && (e = this.prevIcon.size), e;
    },
    prevIconColor() {
      let e = null;
      return l.common.isObject(this.prevIcon) && typeof this.prevIcon.color == "string" && (e = this.prevIcon.color), e;
    },
    nextIconType() {
      let e = "angle-right";
      return l.common.isObject(this.nextIcon) ? typeof this.nextIcon.type == "string" && (e = this.nextIcon.type) : typeof this.nextIcon == "string" && (e = this.nextIcon), e;
    },
    nextIconUrl() {
      let e = null;
      return l.common.isObject(this.nextIcon) && typeof this.nextIcon.url == "string" && (e = this.nextIcon.url), e;
    },
    nextIconSpin() {
      let e = !1;
      return l.common.isObject(this.nextIcon) && typeof this.nextIcon.spin == "boolean" && (e = this.nextIcon.spin), e;
    },
    nextIconSize() {
      let e = null;
      return l.common.isObject(this.nextIcon) && typeof this.nextIcon.size == "string" && (e = this.nextIcon.size), e;
    },
    nextIconColor() {
      let e = null;
      return l.common.isObject(this.nextIcon) && typeof this.nextIcon.color == "string" && (e = this.nextIcon.color), e;
    }
  },
  components: {
    mIcon: M
  },
  mounted() {
    this.el = this.$el;
  },
  methods: {
    pagePrev() {
      if (this.modelValue == 1)
        return;
      let e = this.modelValue - 1;
      this.$emit("update:modelValue", e), this.$emit("change", e);
    },
    pageNext() {
      if (this.modelValue == this.total)
        return;
      let e = this.modelValue + 1;
      this.$emit("update:modelValue", e), this.$emit("change", e);
    },
    pageFirst() {
      this.modelValue != 1 && (this.$emit("update:modelValue", 1), this.$emit("change", 1));
    },
    pageLast() {
      this.modelValue != this.total && (this.$emit("update:modelValue", this.total), this.$emit("change", this.total));
    },
    toPage(e) {
      this.modelValue != e && (e >= this.total && (e = this.total), e <= 1 && (e = 1), this.$emit("update:modelValue", e), this.$emit("change", e));
    }
  }
}, Ln = { class: "mvi-page" }, Un = ["disabled"], Xn = ["textContent"], qn = ["disabled"], Gn = ["textContent"], Zn = { class: "mvi-page-numbers" }, Kn = {
  key: 0,
  class: "mvi-page-numbers-simple"
}, Jn = {
  key: 1,
  class: "mvi-page-numbers-items"
}, Qn = ["textContent", "onClick"], eo = ["textContent", "onClick"], to = ["disabled"], io = ["textContent"], so = ["disabled"], lo = ["textContent"];
function ro(e, t, s, r, n, i) {
  const f = x("m-icon");
  return o(), u("div", Ln, [
    s.firstText || i.firstIconType || i.firstIconUrl ? (o(), u("div", {
      key: 0,
      disabled: s.modelValue == 1 || null,
      onClick: t[0] || (t[0] = (...a) => i.pageFirst && i.pageFirst(...a)),
      class: y(["mvi-page-first", s.active && s.modelValue != 1 ? "mvi-page-active" : ""]),
      style: b({ color: s.modelValue == 1 ? "" : s.color || "" })
    }, [
      i.firstIconType || i.firstIconUrl ? (o(), I(f, {
        key: 0,
        class: y(["mvi-page-icon", s.firstText ? "mvi-page-margin-right" : ""]),
        type: i.firstIconType,
        url: i.firstIconUrl,
        spin: i.firstIconSpin,
        size: i.firstIconSize,
        color: i.firstIconColor
      }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : g("", !0),
      s.firstText ? (o(), u("span", {
        key: 1,
        textContent: _(s.firstText)
      }, null, 8, Xn)) : g("", !0)
    ], 14, Un)) : g("", !0),
    s.prevText || i.prevIconType || i.prevIconUrl ? (o(), u("div", {
      key: 1,
      disabled: s.modelValue == 1 || null,
      onClick: t[1] || (t[1] = (...a) => i.pagePrev && i.pagePrev(...a)),
      class: y(["mvi-page-prev", s.active && s.modelValue != 1 ? "mvi-page-active" : ""]),
      style: b({ color: s.modelValue == 1 ? "" : s.color || "" })
    }, [
      i.prevIconType || i.prevIconUrl ? (o(), I(f, {
        key: 0,
        class: y(["mvi-page-icon", s.prevText ? "mvi-page-margin-right" : ""]),
        type: i.prevIconType,
        url: i.prevIconUrl,
        size: i.prevIconSize,
        spin: i.prevIconSpin,
        color: i.prevIconColor
      }, null, 8, ["class", "type", "url", "size", "spin", "color"])) : g("", !0),
      s.prevText ? (o(), u("span", {
        key: 1,
        textContent: _(s.prevText)
      }, null, 8, Gn)) : g("", !0)
    ], 14, qn)) : g("", !0),
    v("div", Zn, [
      s.simple ? (o(), u("div", Kn, _(s.modelValue) + " / " + _(s.total), 1)) : (o(), u("div", Jn, [
        (o(!0), u(A, null, O(s.total, (a, c) => (o(), u(A, null, [
          s.total <= s.overNumber ? (o(), u("div", {
            class: y(["mvi-page-numbers-item", s.modelValue == a ? "mvi-page-number-active" : "", s.active && s.modelValue != a ? "mvi-page-active" : ""]),
            key: "page-" + c,
            textContent: _(a),
            onClick: (d) => i.toPage(a),
            style: b(i.pageStyle(a))
          }, null, 14, Qn)) : g("", !0)
        ], 64))), 256)),
        s.total > s.overNumber && s.modelValue > (s.overNumber - 1) / 2 + 1 ? (o(), u("div", {
          key: 0,
          class: y(["mvi-page-numbers-item", s.active ? "mvi-page-active" : ""]),
          onClick: t[2] || (t[2] = (a) => i.toPage(s.modelValue - (s.overNumber - 1))),
          style: b({ color: s.color || "" })
        }, "...", 6)) : g("", !0),
        (o(!0), u(A, null, O(i.arr, (a, c) => (o(), u(A, null, [
          s.total > s.overNumber ? (o(), u("div", {
            class: y(["mvi-page-numbers-item", s.modelValue == a ? "mvi-page-number-active" : "", s.active && s.modelValue != a ? "mvi-page-active" : ""]),
            key: "page2-" + c,
            textContent: _(a),
            onClick: (d) => i.toPage(a),
            style: b(i.pageStyle(a))
          }, null, 14, eo)) : g("", !0)
        ], 64))), 256)),
        s.total > s.overNumber && s.modelValue < s.total - (s.overNumber - 1) / 2 ? (o(), u("div", {
          key: 1,
          class: y(["mvi-page-numbers-item", s.active ? "mvi-page-active" : ""]),
          onClick: t[3] || (t[3] = (a) => i.toPage(s.modelValue + (s.overNumber - 1))),
          style: b({ color: s.color || "" })
        }, "...", 6)) : g("", !0)
      ]))
    ]),
    s.nextText || i.nextIconType || i.nextIconUrl ? (o(), u("div", {
      key: 2,
      disabled: s.modelValue == s.total || null,
      onClick: t[4] || (t[4] = (...a) => i.pageNext && i.pageNext(...a)),
      class: y(["mvi-page-next", s.active && s.modelValue != s.total ? "mvi-page-active" : ""]),
      style: b({ color: s.modelValue == s.total ? "" : s.color || "" })
    }, [
      s.nextText ? (o(), u("span", {
        key: 0,
        textContent: _(s.nextText)
      }, null, 8, io)) : g("", !0),
      i.nextIconType || i.nextIconUrl ? (o(), I(f, {
        key: 1,
        class: y(["mvi-page-icon", s.nextText ? "mvi-page-margin-left" : ""]),
        type: i.nextIconType,
        url: i.nextIconUrl,
        size: i.nextIconSize,
        spin: i.nextIconSpin,
        color: i.nextIconColor
      }, null, 8, ["class", "type", "url", "size", "spin", "color"])) : g("", !0)
    ], 14, to)) : g("", !0),
    s.lastText || i.lastIconType || i.lastIconUrl ? (o(), u("div", {
      key: 3,
      disabled: s.modelValue == s.total || null,
      onClick: t[5] || (t[5] = (...a) => i.pageLast && i.pageLast(...a)),
      class: y(["mvi-page-last", s.active && s.modelValue != s.total ? "mvi-page-active" : ""]),
      style: b({ color: s.modelValue == s.total ? "" : s.color || "" })
    }, [
      s.lastText ? (o(), u("span", {
        key: 0,
        textContent: _(s.lastText)
      }, null, 8, lo)) : g("", !0),
      i.lastIconType || i.lastIconUrl ? (o(), I(f, {
        key: 1,
        class: y(["mvi-page-icon", s.lastText ? "mvi-page-margin-left" : ""]),
        type: i.lastIconType,
        url: i.lastIconUrl,
        size: i.lastIconSize,
        spin: i.lastIconSpin,
        color: i.lastIconColor
      }, null, 8, ["class", "type", "url", "size", "spin", "color"])) : g("", !0)
    ], 14, so)) : g("", !0)
  ]);
}
const Xe = /* @__PURE__ */ T(Nn, [["render", ro], ["__scopeId", "data-v-ed0bd880"]]);
Xe.install = (e) => {
  e.component(Xe.name, Xe);
};
const no = {
  name: "m-loading-bar",
  data() {
    return {
      opacityTime: 300,
      widthEnterTime: 4e3,
      widthLeaveTime: 2e3,
      timer: null,
      hasTriggerLeave: !1
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
      return typeof this.color == "string" && this.color ? this.color : null;
    },
    computedZIndex() {
      return l.number.isNumber(this.zIndex) ? this.zIndex : null;
    },
    barStyle() {
      let e = {};
      return this.computedColor && (e.background = this.computedColor), this.computedZIndex && (e.zIndex = this.computedZIndex), e;
    }
  },
  mounted() {
    this.init(this), this.enter();
  },
  methods: {
    enter() {
      this.removeTransition(), this.$refs.bar.style.width = 0, this.$refs.bar.offsetWidth, this.addTransition("enter"), this.$refs.bar.style.width = window.innerWidth * 0.9 + "px", this.$refs.bar.style.opacity = 1;
    },
    leave() {
      this.hasTriggerLeave || (this.hasTriggerLeave = !0, this.addTransition("leave"), this.$refs.bar.style.width = window.innerWidth + "px", this.$refs.bar.style.opacity = 0, this.timer = setTimeout(() => {
        this.remove();
      }, this.widthLeaveTime + this.opacityTime));
    },
    addTransition(e) {
      e == "enter" ? (this.$refs.bar.style.transition = `opacity ${this.opacityTime}ms linear, width ${this.widthEnterTime}ms ease-out`, this.$refs.bar.style.webkitTransition = `opacity ${this.opacityTime}ms linear, width ${this.widthEnterTime}ms ease-out`) : e == "leave" && (this.$refs.bar.style.transition = `opacity ${this.opacityTime}ms ${this.widthLeaveTime}ms linear, width ${this.widthLeaveTime}ms ease`, this.$refs.bar.style.webkitTransition = `opacity ${this.opacityTime}ms ${this.widthLeaveTime}ms linear, width ${this.widthLeaveTime}ms ease`), this.$refs.bar.offsetWidth;
    },
    removeTransition() {
      this.$refs.bar.style.transition = "", this.$refs.bar.style.webkitTransition = "", this.$refs.bar.offsetWidth;
    }
  },
  beforeUnmount() {
    this.timer && (clearTimeout(this.timer), this.timer = null);
  }
};
function oo(e, t, s, r, n, i) {
  return o(), I(at, { to: "body" }, [
    v("div", {
      class: "mvi-loading-bar",
      ref: "bar",
      style: b(i.barStyle)
    }, null, 4)
  ]);
}
const ao = /* @__PURE__ */ T(no, [["render", oo], ["__scopeId", "data-v-92dc89af"]]), N = {
  initParams: (e) => {
    let t = {};
    return l.common.isObject(e) ? (t.color = e.color, t.zIndex = e.zIndex) : typeof e == "string" && (t.color = e), t;
  },
  showLoadingBar: (e) => new Promise((t, s) => {
    N.$el && N.$instance && (N.$instance.unmount(), N.$el.remove());
    let r = N.initParams(e), n = l.element.string2dom("<div></div>");
    document.body.appendChild(n);
    const i = K(ao, {
      ...r,
      init: (f) => {
        N.$vm = f;
      },
      remove: () => {
        i.unmount(), n.remove(), t();
      }
    });
    i.mount(n), N.$el = n, N.$instance = i;
  }),
  hideLoadingBar: () => {
    N.$vm && N.$vm.leave();
  },
  install: (e) => {
    e.config.globalProperties.$showLoadingBar = N.showLoadingBar, e.provide("$showLoadingBar", N.showLoadingBar), e.config.globalProperties.$hideLoadingBar = N.hideLoadingBar, e.provide("$hideLoadingBar", N.hideLoadingBar);
  }
};
ce.install = (e) => {
  e.component(ce.name, ce);
};
ne.install = (e) => {
  e.component(ne.name, ne);
};
const ho = {
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
      default: !1
    },
    error: {
      type: Boolean,
      default: !1
    },
    finished: {
      type: Boolean,
      default: !1
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
      default: !1
    },
    content: {
      type: String,
      default: "\u70B9\u6211\u52A0\u8F7D\u66F4\u591A"
    }
  },
  mounted() {
    this.immediateLoad && this.doLoad();
  },
  methods: {
    initScrollBottom() {
      const e = this.getScrollEl(this.$el);
      !e || this.scrollObj || (this.scrollObj = new rt(e, {
        bottom: () => {
          this.finished || this.loading || this.error || this.doLoad();
        }
      }), this.scrollObj.init());
    },
    doLoad() {
      this.finished || (this.$emit("update:loading", !0), this.$emit("update:error", !1), this.$emit("load"));
    },
    getScrollEl(e) {
      return e ? l.element.getScrollHeight(e) > e.clientHeight ? e : this.getScrollEl(e.parentNode) : null;
    }
  }
}, uo = { class: "mvi-list" }, co = {
  key: 0,
  class: "mvi-list-finished"
}, fo = { key: 1 }, mo = {
  key: 1,
  class: "mvi-list-loading"
}, po = { key: 1 }, go = { key: 1 }, yo = { key: 1 };
function bo(e, t, s, r, n, i) {
  return o(), u("div", uo, [
    S(e.$slots, "default", {}, void 0, !0),
    s.finished ? (o(), u("div", co, [
      e.$slots.finished ? S(e.$slots, "finished", { key: 0 }, void 0, !0) : (o(), u("span", fo, _(s.finishedText), 1))
    ])) : s.loading ? (o(), u("div", mo, [
      e.$slots.loading ? S(e.$slots, "loading", { key: 0 }, void 0, !0) : (o(), u("span", po, _(s.loadingText), 1))
    ])) : s.error ? (o(), u("div", {
      key: 2,
      onClick: t[0] || (t[0] = (...f) => i.doLoad && i.doLoad(...f)),
      class: "mvi-list-error"
    }, [
      e.$slots.error ? S(e.$slots, "error", { key: 0 }, void 0, !0) : (o(), u("span", go, _(s.errorText), 1))
    ])) : s.content || e.$slots.content ? (o(), u("div", {
      key: 3,
      onClick: t[1] || (t[1] = (...f) => i.doLoad && i.doLoad(...f)),
      class: "mvi-list-content"
    }, [
      e.$slots.content ? S(e.$slots, "content", { key: 0 }, void 0, !0) : (o(), u("span", yo, _(s.content), 1))
    ])) : g("", !0)
  ]);
}
const qe = /* @__PURE__ */ T(ho, [["render", bo], ["__scopeId", "data-v-9ccf28c2"]]);
qe.install = (e) => {
  e.component(qe.name, qe);
};
const vo = {
  name: "m-skeleton",
  props: {
    loading: {
      type: Boolean,
      default: !0
    },
    rows: {
      type: Number,
      default: 1,
      validator(e) {
        return e > 0;
      }
    },
    rowWidth: {
      type: [String, Array],
      default: null
    },
    avatar: {
      type: Boolean,
      default: !1
    },
    title: {
      type: Boolean,
      default: !1
    },
    titleWidth: {
      type: String,
      default: null
    },
    animation: {
      type: Boolean,
      default: !1
    },
    round: {
      type: Boolean,
      default: !1
    },
    avatarSize: {
      type: String,
      default: null
    },
    avatarRound: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    avatarStyle() {
      let e = {};
      return this.avatarSize && (e.width = this.avatarSize, e.height = this.avatarSize), e;
    },
    rowStyle() {
      return (e) => {
        let t = {};
        return this.rowWidth && typeof this.rowWidth == "string" ? t.width = this.rowWidth : Array.isArray(this.rowWidth) && (t.width = this.rowWidth[e] || ""), t;
      };
    },
    titleStyle() {
      let e = {};
      return this.titleWidth && (e.width = this.titleWidth), e;
    },
    rowsArray() {
      let e = [];
      for (let t = 0; t < this.rows; t++)
        e.push(t);
      return e;
    }
  }
}, wo = { class: "mvi-skeleton-container" }, Co = {
  key: 0,
  class: "mvi-skeleton-avatar"
}, xo = { class: "mvi-skeleton-rows" };
function Io(e, t, s, r, n, i) {
  return o(), u("div", wo, [
    s.loading ? (o(), u("div", {
      key: 0,
      class: y(["mvi-skeleton", s.animation ? "mvi-skeleton-animation" : ""])
    }, [
      s.avatar ? (o(), u("div", Co, [
        v("div", {
          class: y(["mvi-skeleton-avatar-el", s.avatarRound ? "mvi-skeleton-round" : ""]),
          style: b(i.avatarStyle)
        }, null, 6)
      ])) : g("", !0),
      v("div", xo, [
        s.title ? (o(), u("div", {
          key: 0,
          class: y(["mvi-skeleton-title", s.round ? "mvi-skeleton-round" : ""]),
          style: b(i.titleStyle)
        }, null, 6)) : g("", !0),
        (o(!0), u(A, null, O(i.rowsArray, (f) => (o(), u("div", {
          style: b(i.rowStyle(f)),
          class: y(["mvi-skeleton-row", s.round ? "mvi-skeleton-round" : ""])
        }, null, 6))), 256))
      ])
    ], 2)) : S(e.$slots, "default", { key: 1 }, void 0, !0)
  ]);
}
const Ge = /* @__PURE__ */ T(vo, [["render", Io], ["__scopeId", "data-v-26d8b983"]]);
Ge.install = (e) => {
  e.component(Ge.name, Ge);
};
const So = {
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
      drawing: !1,
      inCanvas: !1
    };
  },
  setup() {
    return {
      uid: F().uid
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
        l.element.getCssStyle(this.$el, "width")
      ), this.$el.setAttribute(
        "height",
        l.element.getCssStyle(this.$el, "height")
      ), this.clear(), l.event.on(
        document.body,
        `mousemove.sign_${this.uid}`,
        this.canvasMouseMove
      ), l.event.on(
        document.body,
        `mouseup.sign_${this.uid} mouseleave.sign_${this.uid}`,
        this.canvasMouseUp
      );
    },
    canvasMouseDown(e) {
      this.drawing = !0, this.inCanvas = !0;
      const t = this.$el.getContext("2d"), s = l.element.getElementBounding(this.$el);
      t.beginPath(), t.moveTo(e.pageX - s.left, e.pageY - s.top);
    },
    canvasMouseMove(e) {
      if (this.drawing && this.inCanvas) {
        const t = this.$el.getContext("2d"), s = l.element.getElementBounding(this.$el);
        t.lineTo(e.pageX - s.left, e.pageY - s.top), t.strokeStyle = this.color, t.lineWidth = this.width, t.stroke();
      }
    },
    canvasMouseUp(e) {
      this.drawing = !1, this.$el.getContext("2d").closePath();
    },
    canvasMouseEnter(e) {
      if (this.drawing) {
        this.inCanvas = !0;
        const t = this.$el.getContext("2d"), s = l.element.getElementBounding(this.$el);
        t.beginPath(), t.moveTo(e.pageX - s.left, e.pageY - s.top);
      }
    },
    canvasMouseLeave(e) {
      this.drawing && (this.$el.getContext("2d").closePath(), this.inCanvas = !1);
    },
    canvasTouchStart(e) {
      const t = this.$el.getContext("2d"), s = l.element.getElementBounding(this.$el);
      t.beginPath(), t.moveTo(
        e.targetTouches[0].pageX - s.left,
        e.targetTouches[0].pageY - s.top
      );
    },
    canvasTouchMove(e) {
      const t = this.$el.getContext("2d"), s = l.element.getElementBounding(this.$el);
      t.lineTo(
        e.targetTouches[0].pageX - s.left,
        e.targetTouches[0].pageY - s.top
      ), t.strokeStyle = this.color, t.lineWidth = this.width, t.stroke();
    },
    canvasTouchEnd(e) {
      this.$el.getContext("2d").closePath();
    },
    clear() {
      const e = this.$el.getContext("2d");
      e.beginPath(), e.clearRect(0, 0, this.$el.width, this.$el.height), e.rect(0, 0, this.$el.width, this.$el.height), e.fillStyle = this.background, e.fill(), e.closePath();
    },
    getImage() {
      return this.$el.getContext("2d"), this.$el.toDataURL("image/png");
    }
  },
  beforeUnmount() {
    l.event.off(
      document.body,
      `mousemove.sign_${this.uid} mouseup.sign_${this.uid} mouseleave.sign_${this.uid}`
    );
  }
};
function _o(e, t, s, r, n, i) {
  return o(), u("canvas", {
    class: "mvi-sign",
    onMousedown: t[0] || (t[0] = (...f) => i.canvasMouseDown && i.canvasMouseDown(...f)),
    onTouchstart: t[1] || (t[1] = (...f) => i.canvasTouchStart && i.canvasTouchStart(...f)),
    onTouchmove: t[2] || (t[2] = (...f) => i.canvasTouchMove && i.canvasTouchMove(...f)),
    onTouchend: t[3] || (t[3] = (...f) => i.canvasTouchEnd && i.canvasTouchEnd(...f)),
    onMouseleave: t[4] || (t[4] = (...f) => i.canvasMouseLeave && i.canvasMouseLeave(...f)),
    onMouseenter: t[5] || (t[5] = (...f) => i.canvasMouseEnter && i.canvasMouseEnter(...f))
  }, null, 32);
}
const Ze = /* @__PURE__ */ T(So, [["render", _o], ["__scopeId", "data-v-4f6d2a90"]]);
Ze.install = (e) => {
  e.component(Ze.name, Ze);
};
ee.install = (e) => {
  e.component(ee.name, ee);
};
const To = {
  name: "m-select",
  emits: ["update:modelValue", "change", "clear"],
  data() {
    return {
      hover: !1,
      focus: !1,
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
      validator(e) {
        return ["small", "medium", "large"].includes(e);
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
      validator(e) {
        return ["info", "success", "warn", "primary", "error"].includes(
          e
        );
      }
    },
    activeColor: {
      type: String,
      default: null,
      validator(e) {
        return l.common.matchingText(e, "hex");
      }
    },
    disabled: {
      type: Boolean,
      default: !1
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
      default: !1
    },
    square: {
      type: Boolean,
      default: !1
    },
    multiple: {
      type: Boolean,
      default: !1
    },
    filterMethod: {
      type: Function,
      default: null
    },
    showSelectIcon: {
      type: Boolean,
      default: !0
    },
    selectedIcon: {
      type: [String, Object],
      default: null
    },
    clearable: {
      type: Boolean,
      default: !1
    }
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  computed: {
    formData() {
      return this.multiple && Array.isArray(this.modelValue) ? this.modelValue.join(",") : this.modelValue;
    },
    menuStyle() {
      let e = {};
      return this.height && (e.maxHeight = this.height), e;
    },
    selectClass() {
      let e = ["mvi-select", "mvi-select-" + this.size];
      return this.round ? e.push("mvi-select-round") : this.square && e.push("mvi-select-square"), e;
    },
    targetClass() {
      let e = ["mvi-select-target"];
      return this.activeType && !this.activeColor && this.focus && e.push("mvi-select-" + this.activeType), e;
    },
    targetStyle() {
      let e = {};
      if (this.activeColor && this.focus) {
        e.borderColor = this.activeColor;
        const t = l.color.hex2rgb(this.activeColor);
        e.boxShadow = `0 0 0.16rem rgba(${t[0]},${t[1]},${t[2]},0.5)`;
      }
      return e;
    },
    iconClass() {
      let e = ["mvi-select-icon"];
      return this.focus && e.push("mvi-select-active"), e;
    },
    selectLabel() {
      if (this.multiple) {
        let e = [];
        return this.options.forEach((t, s) => {
          Array.isArray(this.modelValue) && this.modelValue.some((n) => l.common.equal(n, t.value)) && e.push(t.label);
        }), typeof this.filterMethod == "function" ? this.filterMethod(e) : e.join(" ");
      } else {
        let e = "";
        return this.options.forEach((t, s) => {
          l.common.equal(this.modelValue, t.value) && (e = t.label);
        }), typeof this.filterMethod == "function" ? this.filterMethod(e) : e;
      }
    },
    isSelect() {
      return (e) => {
        if (this.multiple) {
          let t = this.modelValue.some((s) => l.common.equal(s, e.value));
          return this.showSelectIcon && t;
        }
        return !1;
      };
    },
    selectedIconType() {
      let e = "success";
      return l.common.isObject(this.selectedIcon) ? typeof this.selectedIcon.type == "string" && (e = this.selectedIcon.type) : typeof this.selectedIcon == "string" && (e = this.selectedIcon), e;
    },
    selectedIconSize() {
      let e = null;
      return l.common.isObject(this.selectedIcon) && typeof this.selectedIcon.size == "string" && (e = this.selectedIcon.size), e;
    },
    selectedIconUrl() {
      let e = null;
      return l.common.isObject(this.selectedIcon) && typeof this.selectedIcon.url == "string" && (e = this.selectedIcon.url), e;
    },
    selectedIconSpin() {
      let e = !1;
      return l.common.isObject(this.selectedIcon) && typeof this.selectedIcon.spin == "boolean" && (e = this.selectedIcon.spin), e;
    },
    selectedIconColor() {
      let e = null;
      return l.common.isObject(this.selectedIcon) && typeof this.selectedIcon.color == "string" && (e = this.selectedIcon.color), e;
    },
    showClearIcon() {
      return this.multiple ? !!(this.modelValue.length != 0 && this.hover) : !(this.modelValue === "" || this.modelValue === null || this.modelValue === void 0 || !this.hover);
    },
    layerRealProps() {
      return {
        placement: this.layerProps.placement ? this.layerProps.placement : "bottom-start",
        fixed: typeof this.layerProps.fixed == "boolean" ? this.layerProps.fixed : !1,
        fixedAuto: typeof this.layerProps.fixedAuto == "boolean" ? this.layerProps.fixedAuto : !1,
        width: this.layerProps.width,
        zIndex: l.number.isNumber(this.layerProps.zIndex) ? this.layerProps.zIndex : 400,
        offset: this.layerProps.offset ? this.layerProps.offset : "0.1rem",
        wrapperClass: this.layerProps.wrapperClass,
        animation: this.layerProps.animation,
        timeout: l.number.isNumber(this.layerProps.timeout) ? this.layerProps.timeout : 200,
        showTriangle: typeof this.layerProps.showTriangle == "boolean" ? this.layerProps.showTriangle : !1,
        shadow: typeof this.layerProps.shadow == "boolean" ? this.layerProps.shadow : !0,
        border: typeof this.layerProps.border == "boolean" ? this.layerProps.border : !1,
        borderColor: this.layerProps.borderColor,
        background: this.layerProps.background
      };
    }
  },
  components: {
    mLayer: ee,
    mIcon: M
  },
  methods: {
    hoverIn() {
      this.hover = !0;
    },
    hoverOut() {
      this.hover = !1;
    },
    doClear(e) {
      e.stopPropagation(), !this.disabled && (!this.clearable || (this.focus && (this.focus = !1), this.multiple ? (this.$emit("update:modelValue", []), this.$emit("clear", [])) : (this.$emit("update:modelValue", null), this.$emit("clear", null))));
    },
    layerShow() {
      this.layerRealProps.width ? this.$refs.menu.style.width = this.layerRealProps.width : this.$refs.menu.style.width = this.$refs.target.offsetWidth + "px";
    },
    mouseEnter(e, t) {
      this.disabled || t.disabled || this.hoverClass && l.element.addClass(e.currentTarget, this.hoverClass);
    },
    mouseLeave(e, t) {
      this.disabled || t.disabled || this.hoverClass && l.element.removeClass(e.currentTarget, this.hoverClass);
    },
    optionClick(e) {
      if (!(this.disabled || e.disabled)) {
        if (this.multiple) {
          let t = this.modelValue;
          if (!Array.isArray(t))
            throw new TypeError("modelValue should be an array");
          t.some((r) => l.common.equal(r, e.value)) ? t = t.filter((r) => !l.common.equal(r, e.value)) : t.push(e.value), this.$emit("update:modelValue", t), this.$emit(
            "change",
            this.options.filter((r) => t.some((n) => l.common.equal(r.value, n)))
          );
        } else
          this.$emit("update:modelValue", e.value), this.$emit("change", e);
        this.trigger();
      }
    },
    trigger() {
      this.disabled || (this.focus = !this.focus);
    }
  }
}, ko = ["data-id", "disabled"], Do = ["data-id", "disabled"], Po = ["data-placeholder", "innerHTML"], zo = ["onClick", "onMouseenter", "onMouseleave", "disabled"], Ao = ["innerHTML"], Eo = ["value", "name"];
function Mo(e, t, s, r, n, i) {
  const f = x("m-icon"), a = x("m-layer");
  return o(), u("div", {
    "data-id": "mvi-select-" + r.uid,
    class: y(i.selectClass),
    disabled: s.disabled || null
  }, [
    v("div", {
      onMouseenter: t[0] || (t[0] = (...c) => i.hoverIn && i.hoverIn(...c)),
      onMouseleave: t[1] || (t[1] = (...c) => i.hoverOut && i.hoverOut(...c)),
      "data-id": "mvi-select-target-" + r.uid,
      class: y(i.targetClass),
      style: b(i.targetStyle),
      ref: "target",
      onClick: t[2] || (t[2] = (...c) => i.trigger && i.trigger(...c)),
      disabled: s.disabled || null
    }, [
      v("span", {
        class: y(["mvi-select-label", i.selectLabel ? "" : "mvi-select-label-placeholder"]),
        "data-placeholder": s.placeholder,
        innerHTML: i.selectLabel
      }, null, 10, Po),
      s.clearable ? B((o(), I(f, {
        key: 0,
        onClick: i.doClear,
        class: "mvi-clear-icon",
        type: "times-o"
      }, null, 8, ["onClick"])), [
        [j, i.showClearIcon]
      ]) : g("", !0),
      B(D(f, {
        class: y(i.iconClass),
        type: s.icon
      }, null, 8, ["class", "type"]), [
        [j, !s.clearable || !i.showClearIcon]
      ])
    ], 46, Do),
    D(a, {
      modelValue: n.focus,
      "onUpdate:modelValue": t[3] || (t[3] = (c) => n.focus = c),
      target: `[data-id='mvi-select-target-${r.uid}']`,
      root: `[data-id='mvi-select-${r.uid}']`,
      placement: i.layerRealProps.placement,
      offset: i.layerRealProps.offset,
      fixed: i.layerRealProps.fixed,
      "fixed-auto": i.layerRealProps.fixedAuto,
      "z-index": i.layerRealProps.zIndex,
      closable: "",
      "show-triangle": i.layerRealProps.showTriangle,
      "wrapper-class": i.layerRealProps.wrapperClass,
      animation: i.layerRealProps.animation,
      timeout: i.layerRealProps.timeout,
      shadow: i.layerRealProps.shadow,
      border: i.layerRealProps.border,
      "border-color": i.layerRealProps.borderColor,
      background: i.layerRealProps.background,
      onShowing: i.layerShow,
      ref: "layer"
    }, {
      default: P(() => [
        v("div", {
          class: "mvi-select-menu",
          ref: "menu",
          style: b(i.menuStyle)
        }, [
          (o(!0), u(A, null, O(s.options, (c, d) => (o(), u("div", {
            class: y(["mvi-option", "mvi-option-" + s.size]),
            onClick: (h) => i.optionClick(c),
            onMouseenter: (h) => i.mouseEnter(h, c),
            onMouseleave: (h) => i.mouseLeave(h, c),
            key: "mvi-select-option-" + d,
            disabled: c.disabled || null
          }, [
            v("div", {
              class: "mvi-option-value",
              innerHTML: c.label
            }, null, 8, Ao),
            i.isSelect(c) ? (o(), I(f, {
              key: 0,
              type: i.selectedIconType,
              spin: i.selectedIconSpin,
              size: i.selectedIconSize,
              url: i.selectedIconUrl,
              color: i.selectedIconColor
            }, null, 8, ["type", "spin", "size", "url", "color"])) : g("", !0)
          ], 42, zo))), 128))
        ], 4)
      ]),
      _: 1
    }, 8, ["modelValue", "target", "root", "placement", "offset", "fixed", "fixed-auto", "z-index", "show-triangle", "wrapper-class", "animation", "timeout", "shadow", "border", "border-color", "background", "onShowing"]),
    v("input", {
      type: "hidden",
      value: i.formData,
      name: s.name
    }, null, 8, Eo)
  ], 10, ko);
}
const Ke = /* @__PURE__ */ T(To, [["render", Mo], ["__scopeId", "data-v-95ca4221"]]);
Ke.install = (e) => {
  e.component(Ke.name, Ke);
};
const Bo = {
  name: "m-autocomplete",
  data() {
    return {
      focus: !1
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
      validator(e) {
        return ["small", "medium", "large"].includes(e);
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
      validator(e) {
        return ["info", "success", "warn", "error", "primary"].includes(
          e
        );
      }
    },
    activeColor: {
      type: String,
      default: null,
      validator(e) {
        return l.common.matchingText(e, "hex");
      }
    },
    filterMethod: {
      type: [Function, Boolean],
      default: !1
    },
    clearable: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
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
      default: !1
    },
    square: {
      type: Boolean,
      default: !1
    },
    align: {
      type: String,
      default: "left",
      validator(e) {
        return ["left", "right", "center"].includes(e);
      }
    }
  },
  components: {
    mIcon: M,
    mLayer: ee
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  computed: {
    show() {
      return this.focus && this.computedFilter.length != 0;
    },
    leftIconType() {
      let e = null;
      return l.common.isObject(this.leftIcon) ? typeof this.leftIcon.type == "string" && (e = this.leftIcon.type) : typeof this.leftIcon == "string" && (e = this.leftIcon), e;
    },
    leftIconUrl() {
      let e = null;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.url == "string" && (e = this.leftIcon.url), e;
    },
    leftIconSpin() {
      let e = !1;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.spin == "boolean" && (e = this.leftIcon.spin), e;
    },
    leftIconSize() {
      let e = null;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.size == "string" && (e = this.leftIcon.size), e;
    },
    leftIconColor() {
      let e = null;
      return l.common.isObject(this.leftIcon) && typeof this.leftIcon.color == "string" && (e = this.leftIcon.color), e;
    },
    rightIconType() {
      let e = null;
      return l.common.isObject(this.rightIcon) ? typeof this.rightIcon.type == "string" && (e = this.rightIcon.type) : typeof this.rightIcon == "string" && (e = this.rightIcon), e;
    },
    rightIconUrl() {
      let e = null;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.url == "string" && (e = this.rightIcon.url), e;
    },
    rightIconSpin() {
      let e = !1;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.spin == "boolean" && (e = this.rightIcon.spin), e;
    },
    rightIconSize() {
      let e = null;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.size == "string" && (e = this.rightIcon.size), e;
    },
    rightIconColor() {
      let e = null;
      return l.common.isObject(this.rightIcon) && typeof this.rightIcon.color == "string" && (e = this.rightIcon.color), e;
    },
    showClearIcon() {
      return this.disabled ? !1 : !!(this.realValue && this.focus);
    },
    clearStyle() {
      let e = {};
      return (this.rightIconType || this.rightIconUrl) && (e.borderRadius = 0), e;
    },
    menuStyle() {
      let e = {};
      return this.height && (e.maxHeight = this.height), e;
    },
    computedFilter() {
      return typeof this.filterMethod == "function" ? this.filterMethod(this.realValue, this.list) : this.filterMethod ? this.defaultFilter() : this.list;
    },
    inputStyle() {
      let e = {};
      return (this.leftIconType || this.leftIconUrl) && (e.paddingLeft = 0), (this.showClearIcon && this.clearable || this.rightIconType || this.rightIconUrl) && (e.paddingRight = 0), this.align && (e.textAlign = this.align), e;
    },
    autocompleteClass() {
      let e = ["mvi-autocomplete", "mvi-autocomplete-" + this.size];
      return this.round ? e.push("mvi-autocomplete-round") : this.square && e.push("mvi-autocomplete-square"), e;
    },
    targetStyle() {
      let e = {};
      if (this.activeColor && this.focus) {
        e.borderColor = this.activeColor;
        const t = l.color.hex2rgb(this.activeColor);
        e.boxShadow = `0 0 0.16rem rgba(${t[0]},${t[1]},${t[2]},0.5)`;
      }
      return e;
    },
    targetClass() {
      let e = ["mvi-autocomplete-target"];
      return this.activeType && !this.activeColor && this.focus && e.push("mvi-autocomplete-" + this.activeType), e;
    },
    realValue: {
      set(e) {
        this.modelValue !== e && this.$emit("update:modelValue", e);
      },
      get() {
        return this.modelValue;
      }
    },
    layerRealProps() {
      return {
        placement: this.layerProps.placement ? this.layerProps.placement : "bottom-start",
        fixed: typeof this.layerProps.fixed == "boolean" ? this.layerProps.fixed : !1,
        fixedAuto: typeof this.layerProps.fixedAuto == "boolean" ? this.layerProps.fixedAuto : !1,
        width: this.layerProps.width,
        zIndex: l.number.isNumber(this.layerProps.zIndex) ? this.layerProps.zIndex : 400,
        offset: this.layerProps.offset ? this.layerProps.offset : "0.1rem",
        wrapperClass: this.layerProps.wrapperClass,
        animation: this.layerProps.animation,
        timeout: l.number.isNumber(this.layerProps.timeout) ? this.layerProps.timeout : 200,
        showTriangle: typeof this.layerProps.showTriangle == "boolean" ? this.layerProps.showTriangle : !1,
        shadow: typeof this.layerProps.shadow == "boolean" ? this.layerProps.shadow : !0,
        border: typeof this.layerProps.border == "boolean" ? this.layerProps.border : !1,
        borderColor: this.layerProps.borderColor,
        background: this.layerProps.background
      };
    }
  },
  methods: {
    layerShow() {
      this.layerRealProps.width ? this.$refs.menu.style.width = this.layerRealProps.width : this.$refs.menu.style.width = this.$refs.target.offsetWidth + "px";
    },
    rightClick(e) {
      this.disabled || this.$emit("right-click", this.realValue);
    },
    leftClick(e) {
      this.disabled || this.$emit("left-click", this.realValue);
    },
    listEnter(e) {
      this.hoverClass && l.element.addClass(e.currentTarget, this.hoverClass);
    },
    listLeave(e) {
      this.hoverClass && l.element.removeClass(e.currentTarget, this.hoverClass);
    },
    input() {
      this.disabled || (this.focus = !0, this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.layer.reset();
        }, 10);
      }), this.$emit("input", this.realValue));
    },
    inputBlur() {
      this.disabled || (this.$emit("blur", this.realValue), setTimeout(() => {
        this.focus = !1;
      }, 200));
    },
    inputFocus() {
      this.disabled || (this.$emit("focus", this.realValue), setTimeout(() => {
        this.focus = !0;
      }, 200));
    },
    doClear() {
      this.disabled || !this.clearable || setTimeout(() => {
        this.realValue = "", this.$emit("clear", ""), this.$refs.input.focus();
      }, 200);
    },
    doSelect(e) {
      this.disabled || (this.realValue = e, this.$emit("select", e), this.focus = !1);
    },
    defaultFilter() {
      let e = [], t = this.list.length;
      for (let s = 0; s < t; s++)
        this.list[s].includes(this.realValue) && e.push(this.list[s]);
      return e;
    }
  }
}, Oo = ["data-id", "disabled"], Ho = ["data-id"], Vo = ["placeholder", "name", "disabled"], $o = ["textContent", "onClick"];
function jo(e, t, s, r, n, i) {
  const f = x("m-icon"), a = x("m-layer");
  return o(), u("div", {
    "data-id": "mvi-autocomplete-" + r.uid,
    class: y(i.autocompleteClass),
    disabled: s.disabled || null
  }, [
    v("div", {
      class: y(i.targetClass),
      style: b(i.targetStyle),
      "data-id": "mvi-autocomplete-target-" + r.uid,
      ref: "target"
    }, [
      i.leftIconType || i.leftIconUrl ? (o(), u("div", {
        key: 0,
        onClick: t[0] || (t[0] = (...c) => i.leftClick && i.leftClick(...c)),
        class: "mvi-autocomplete-left-icon"
      }, [
        D(f, {
          type: i.leftIconType,
          url: i.leftIconUrl,
          spin: i.leftIconSpin,
          size: i.leftIconSize,
          color: i.leftIconColor
        }, null, 8, ["type", "url", "spin", "size", "color"])
      ])) : g("", !0),
      B(v("input", {
        ref: "input",
        onInput: t[1] || (t[1] = (...c) => i.input && i.input(...c)),
        "onUpdate:modelValue": t[2] || (t[2] = (c) => i.realValue = c),
        type: "text",
        placeholder: s.placeholder,
        style: b(i.inputStyle),
        name: s.name,
        onFocus: t[3] || (t[3] = (...c) => i.inputFocus && i.inputFocus(...c)),
        onBlur: t[4] || (t[4] = (...c) => i.inputBlur && i.inputBlur(...c)),
        disabled: s.disabled || null,
        autocomplete: "off"
      }, null, 44, Vo), [
        [J, i.realValue]
      ]),
      s.clearable ? B((o(), u("div", {
        key: 1,
        onClick: t[5] || (t[5] = (...c) => i.doClear && i.doClear(...c)),
        class: "mvi-autocomplete-clear",
        style: b(i.clearStyle)
      }, [
        D(f, { type: "times-o" })
      ], 4)), [
        [j, i.showClearIcon]
      ]) : g("", !0),
      i.rightIconType || i.rightIconUrl ? (o(), u("div", {
        key: 2,
        class: "mvi-autocomplete-right-icon",
        onClick: t[6] || (t[6] = (...c) => i.rightClick && i.rightClick(...c))
      }, [
        D(f, {
          type: i.rightIconType,
          url: i.rightIconUrl,
          spin: i.rightIconSpin,
          size: i.rightIconSize,
          color: i.rightIconColor
        }, null, 8, ["type", "url", "spin", "size", "color"])
      ])) : g("", !0)
    ], 14, Ho),
    D(a, {
      "model-value": i.show,
      target: `[data-id='mvi-autocomplete-target-${r.uid}']`,
      root: `[data-id='mvi-autocomplete-${r.uid}']`,
      placement: i.layerRealProps.placement,
      offset: i.layerRealProps.offset,
      fixed: i.layerRealProps.fixed,
      "z-index": i.layerRealProps.zIndex,
      "fixed-auto": i.layerRealProps.fixedAuto,
      ref: "layer",
      "wrapper-class": i.layerRealProps.wrapperClass,
      animation: i.layerRealProps.animation,
      shadow: i.layerRealProps.shadow,
      border: i.layerRealProps.border,
      timeout: i.layerRealProps.timeout,
      closable: !1,
      "show-triangle": i.layerRealProps.showTriangle,
      "border-color": i.layerRealProps.borderColor,
      background: i.layerRealProps.background,
      onShowing: i.layerShow
    }, {
      default: P(() => [
        v("div", {
          class: "mvi-autocomplete-menu",
          style: b(i.menuStyle),
          ref: "menu"
        }, [
          (o(!0), u(A, null, O(i.computedFilter, (c, d) => (o(), u("div", {
            class: "mvi-autocomplete-list",
            textContent: _(c),
            onClick: (h) => i.doSelect(c),
            onMouseenter: t[7] || (t[7] = (...h) => i.listEnter && i.listEnter(...h)),
            onMouseleave: t[8] || (t[8] = (...h) => i.listLeave && i.listLeave(...h)),
            key: "mvi-autocomplete-list-" + d
          }, null, 40, $o))), 128))
        ], 4)
      ]),
      _: 1
    }, 8, ["model-value", "target", "root", "placement", "offset", "fixed", "z-index", "fixed-auto", "wrapper-class", "animation", "shadow", "border", "timeout", "show-triangle", "border-color", "background", "onShowing"])
  ], 10, Oo);
}
const Je = /* @__PURE__ */ T(Bo, [["render", jo], ["__scopeId", "data-v-c89bbbac"]]);
Je.install = (e) => {
  e.component(Je.name, Je);
};
const Wo = {
  name: "m-date-chooser",
  data() {
    return {
      target: null,
      layer: null,
      show: !1,
      view: "date",
      hover: [!1, !1, !1, !1, !1, !1, !1]
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
      default: !1
    },
    layerProps: {
      type: Object,
      default: function() {
        return {};
      }
    },
    closable: {
      type: Boolean,
      default: !0
    },
    trigger: {
      type: String,
      default: "click",
      validator(e) {
        return ["hover", "click", "custom"].includes(e);
      }
    },
    mode: {
      type: String,
      default: "date",
      validator(e) {
        return ["year", "month", "date"].includes(e);
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
      default: !0
    },
    headerHoverClass: {
      type: String,
      default: null
    },
    block: {
      type: Boolean,
      default: !1
    }
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  computed: {
    currentYear() {
      return this.modelValue.getFullYear() + "\u5E74";
    },
    currentMonth() {
      let e = this.modelValue.getMonth() + 1;
      return (e < 10 ? "0" + e : e) + "\u6708";
    },
    hoverHeader() {
      return (e, t) => {
        this.hover[t] = e;
      };
    },
    headerItemClass() {
      return (e) => {
        let t = [];
        return this.hover[e] && this.headerHoverClass && t.push(this.headerHoverClass), t;
      };
    },
    currentYears() {
      if (this.layer) {
        let e = [...this.$refs.calendar.years];
        for (let t = 0; t < e.length; t++)
          e[t].year < this.startYear && e.splice(t, 1), e[t].year > this.endYear && e.splice(t, 1);
        return e[0].year + "\u5E74 - " + e[e.length - 1].year + "\u5E74";
      } else
        return "";
    },
    prevYearDisabled() {
      return this.view == "year" && this.layer ? this.$refs.calendar.years[0].year <= this.startYear : this.modelValue.getFullYear() <= this.startYear;
    },
    nextYearDisabled() {
      if (this.view == "year" && this.layer) {
        let e = this.$refs.calendar.years;
        return e[e.length - 1].year >= this.endYear;
      } else
        return this.modelValue.getFullYear() >= this.endYear;
    },
    layerRealProps() {
      return {
        placement: this.layerProps.placement ? this.layerProps.placement : "bottom-start",
        fixed: typeof this.layerProps.fixed == "boolean" ? this.layerProps.fixed : !1,
        fixedAuto: typeof this.layerProps.fixedAuto == "boolean" ? this.layerProps.fixedAuto : !1,
        width: this.layerProps.width,
        zIndex: l.number.isNumber(this.layerProps.zIndex) ? this.layerProps.zIndex : 400,
        offset: this.layerProps.offset ? this.layerProps.offset : "0.2rem",
        wrapperClass: this.layerProps.wrapperClass,
        animation: this.layerProps.animation,
        timeout: l.number.isNumber(this.layerProps.timeout) ? this.layerProps.timeout : 200,
        showTriangle: typeof this.layerProps.showTriangle == "boolean" ? this.layerProps.showTriangle : !1,
        shadow: typeof this.layerProps.shadow == "boolean" ? this.layerProps.shadow : !0,
        border: typeof this.layerProps.border == "boolean" ? this.layerProps.border : !1,
        borderColor: this.layerProps.borderColor
      };
    }
  },
  components: {
    mLayer: ee,
    mIcon: M,
    mCalendar: ge
  },
  created() {
    this.view = this.mode;
  },
  mounted() {
    this.trigger == "hover" && (l.event.on(this.$el, "mouseenter.dateChooser", this.openCalendar), l.event.on(
      this.$el,
      "mouseleave.dateChooser",
      this.closeCalendar
    ));
  },
  methods: {
    layerShow() {
      this.layerRealProps.width ? this.$refs.panel.style.width = this.layerRealProps.width : this.$refs.panel.style.width = this.$refs.target.offsetWidth + "px", this.layer || (this.layer = this.$refs.layer);
    },
    openCalendar() {
      this.disabled || (this.show = !0);
    },
    closeCalendar() {
      this.disabled || (this.show = !1);
    },
    clickCalendar() {
      this.disabled || this.trigger == "click" && (this.show ? this.closeCalendar() : this.openCalendar());
    },
    dateClick(e) {
      (event || window.event) && event.stopPropagation(), !this.disabled && (this.$emit("update:modelValue", e.date), this.$emit("change", e.date), this.show = !1);
    },
    yearClick(e) {
      (event || window.event) && event.stopPropagation(), !this.disabled && (this.mode == "year" ? this.show = !1 : this.view = "month", this.$emit("update:modelValue", e.date), this.$emit("change", e.date));
    },
    monthClick(e) {
      (event || window.event) && event.stopPropagation(), !this.disabled && (this.mode == "date" ? this.view = "date" : this.show = !1, this.$emit("update:modelValue", e.date), this.$emit("change", e.date));
    },
    goPrevYear() {
      if (this.view == "year") {
        let e = this.$refs.calendar.years, t = this.modelValue, s = t.getFullYear();
        if (e[0].year <= this.startYear)
          return;
        e[0].year - this.startYear < 12 ? t = new Date(t.setFullYear(this.startYear)) : t = new Date(t.setFullYear(s - 12)), this.$emit("update:modelValue", t), this.$emit("change", t);
      } else {
        let e = this.modelValue, t = e.getFullYear();
        if (t <= this.startYear)
          return;
        e = new Date(e.setFullYear(t - 1)), this.$emit("update:modelValue", e), this.$emit("change", e);
      }
    },
    goPrevMonth() {
      let e = this.modelValue;
      if (e.getFullYear() <= this.startYear && e.getMonth() == 0)
        return;
      e = l.date.getPrevMonths(e, 2)[1], this.$emit("update:modelValue", e), this.$emit("change", e);
    },
    goNextYear() {
      if (this.view == "year") {
        let e = this.$refs.calendar.years, t = this.modelValue, s = t.getFullYear();
        if (e[e.length - 1].year >= this.endYear)
          return;
        this.endYear - e[e.length - 1].year < 12 ? t = new Date(t.setFullYear(this.endYear)) : t = new Date(t.setFullYear(s + 12)), this.$emit("update:modelValue", t), this.$emit("change", t);
      } else {
        let e = this.modelValue, t = e.getFullYear();
        if (t >= this.endYear)
          return;
        e = new Date(e.setFullYear(t + 1)), this.$emit("update:modelValue", e), this.$emit("change", e);
      }
    },
    goNextMonth() {
      let e = this.modelValue;
      if (e.getFullYear() >= this.endYear && e.getMonth() == 11)
        return;
      e = l.date.getNextMonths(e, 2)[1], this.$emit("update:modelValue", e), this.$emit("change", e);
    },
    jumpViewYear(e) {
      e.stopPropagation(), this.hover = [!1, !1, !1, !1, !0, !1, !1], this.view = "year";
    },
    jumpViewMonth(e) {
      e.stopPropagation(), this.hover = [!1, !1, !1, !1, !1, !1, !1], this.view = "month";
    },
    jumpViewDate(e) {
      e.stopPropagation(), this.hover = [!1, !1, !1, !1, !1, !1, !1], this.view = "date";
    }
  },
  beforeUnmount() {
    this.trigger == "hover" && l.event.off(
      this.$el,
      "mouseenter.dateChooser mouseleave.dateChooser"
    );
  }
}, Fo = ["data-id"], Ro = ["data-id"], Yo = {
  class: "mvi-date-chooser-layer",
  ref: "panel"
}, No = { class: "mvi-date-chooser-header" }, Lo = { class: "mvi-date-chooser-header-left" }, Uo = ["disabled"], Xo = ["disabled"], qo = { class: "mvi-date-chooser-header-center" }, Go = ["textContent"], Zo = ["textContent"], Ko = ["textContent"], Jo = { class: "mvi-date-chooser-header-right" }, Qo = ["disabled"], ea = ["disabled"];
function ta(e, t, s, r, n, i) {
  const f = x("m-icon"), a = x("m-calendar"), c = x("m-layer");
  return o(), u("div", {
    class: y(["mvi-date-chooser", s.block ? "mvi-date-chooser-block" : ""]),
    "data-id": `mvi-date-chooser-${r.uid}`
  }, [
    v("div", {
      class: "mvi-date-chooser-target",
      "data-id": `mvi-date-chooser-target-${r.uid}`,
      ref: "target",
      onClick: t[0] || (t[0] = (...d) => i.clickCalendar && i.clickCalendar(...d))
    }, [
      S(e.$slots, "default", {}, void 0, !0)
    ], 8, Ro),
    D(c, {
      target: `[data-id='mvi-date-chooser-target-${r.uid}']`,
      root: `[data-id='mvi-date-chooser-${r.uid}']`,
      modelValue: n.show,
      "onUpdate:modelValue": t[21] || (t[21] = (d) => n.show = d),
      placement: i.layerRealProps.placement,
      fixed: i.layerRealProps.fixed,
      "fixed-auto": i.layerRealProps.fixedAuto,
      offset: i.layerRealProps.offset,
      "z-index": i.layerRealProps.zIndex,
      "wrapper-class": i.layerRealProps.wrapperClass,
      shadow: i.layerRealProps.shadow,
      border: i.layerRealProps.border,
      animation: i.layerRealProps.animation,
      "border-color": i.layerRealProps.borderColor,
      timeout: i.layerRealProps.timeout,
      closable: s.closable,
      "show-triangle": i.layerRealProps.showTriangle,
      onShowing: i.layerShow,
      ref: "layer"
    }, {
      default: P(() => [
        v("div", Yo, [
          v("div", No, [
            v("div", Lo, [
              v("span", {
                onMouseenter: t[1] || (t[1] = (d) => i.hoverHeader(!0, 0)),
                onMouseleave: t[2] || (t[2] = (d) => i.hoverHeader(!1, 0)),
                onClick: t[3] || (t[3] = (...d) => i.goPrevYear && i.goPrevYear(...d)),
                class: y(i.headerItemClass(0)),
                disabled: i.prevYearDisabled || null
              }, [
                D(f, { type: "angle-double-left" })
              ], 42, Uo),
              n.view == "date" ? (o(), u("span", {
                key: 0,
                onMouseenter: t[4] || (t[4] = (d) => i.hoverHeader(!0, 1)),
                onMouseleave: t[5] || (t[5] = (d) => i.hoverHeader(!1, 1)),
                onClick: t[6] || (t[6] = (...d) => i.goPrevMonth && i.goPrevMonth(...d)),
                class: y(i.headerItemClass(1)),
                disabled: s.modelValue.getFullYear() <= s.startYear && s.modelValue.getMonth() == 0 || null
              }, [
                D(f, { type: "angle-left" })
              ], 42, Xo)) : g("", !0)
            ]),
            v("div", qo, [
              n.view != "year" && i.currentYear ? (o(), u("span", {
                key: 0,
                onMouseenter: t[7] || (t[7] = (d) => i.hoverHeader(!0, 2)),
                onMouseleave: t[8] || (t[8] = (d) => i.hoverHeader(!1, 2)),
                textContent: _(i.currentYear),
                class: y(i.headerItemClass(2)),
                onClick: t[9] || (t[9] = (...d) => i.jumpViewYear && i.jumpViewYear(...d))
              }, null, 42, Go)) : g("", !0),
              n.view == "date" && i.currentMonth ? (o(), u("span", {
                key: 1,
                onMouseenter: t[10] || (t[10] = (d) => i.hoverHeader(!0, 3)),
                onMouseleave: t[11] || (t[11] = (d) => i.hoverHeader(!1, 3)),
                textContent: _(i.currentMonth),
                class: y(i.headerItemClass(3)),
                onClick: t[12] || (t[12] = (...d) => i.jumpViewMonth && i.jumpViewMonth(...d))
              }, null, 42, Zo)) : g("", !0),
              n.view == "year" && i.currentYears ? (o(), u("span", {
                key: 2,
                onMouseenter: t[13] || (t[13] = (d) => i.hoverHeader(!0, 4)),
                onMouseleave: t[14] || (t[14] = (d) => i.hoverHeader(!1, 4)),
                textContent: _(i.currentYears),
                class: y(i.headerItemClass(4))
              }, null, 42, Ko)) : g("", !0)
            ]),
            v("div", Jo, [
              n.view == "date" ? (o(), u("span", {
                key: 0,
                onMouseenter: t[15] || (t[15] = (d) => i.hoverHeader(!0, 5)),
                onMouseleave: t[16] || (t[16] = (d) => i.hoverHeader(!1, 5)),
                onClick: t[17] || (t[17] = (...d) => i.goNextMonth && i.goNextMonth(...d)),
                class: y(i.headerItemClass(5)),
                disabled: s.modelValue.getFullYear() >= s.endYear && s.modelValue.getMonth() == 11 || null
              }, [
                D(f, { type: "angle-right" })
              ], 42, Qo)) : g("", !0),
              v("span", {
                onMouseenter: t[18] || (t[18] = (d) => i.hoverHeader(!0, 6)),
                onMouseleave: t[19] || (t[19] = (d) => i.hoverHeader(!1, 6)),
                onClick: t[20] || (t[20] = (...d) => i.goNextYear && i.goNextYear(...d)),
                class: y(i.headerItemClass(6)),
                disabled: i.nextYearDisabled || null
              }, [
                D(f, { type: "angle-double-right" })
              ], 42, ea)
            ])
          ]),
          D(a, {
            view: n.view,
            "model-value": s.modelValue,
            "month-text": s.monthText,
            "week-text": s.weekText,
            "start-year": s.startYear,
            "end-year": s.endYear,
            "now-class": s.nowClass,
            "current-class": s.currentClass,
            "non-current-click": !1,
            active: s.active,
            onDateClick: i.dateClick,
            onMonthClick: i.monthClick,
            onYearClick: i.yearClick,
            ref: "calendar"
          }, null, 8, ["view", "model-value", "month-text", "week-text", "start-year", "end-year", "now-class", "current-class", "active", "onDateClick", "onMonthClick", "onYearClick"])
        ], 512)
      ]),
      _: 1
    }, 8, ["target", "root", "modelValue", "placement", "fixed", "fixed-auto", "offset", "z-index", "wrapper-class", "shadow", "border", "animation", "border-color", "timeout", "closable", "show-triangle", "onShowing"])
  ], 10, Fo);
}
const Qe = /* @__PURE__ */ T(Wo, [["render", ta], ["__scopeId", "data-v-e189d74a"]]);
Qe.install = (e) => {
  e.component(Qe.name, Qe);
};
const ia = {
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
      focus: !1
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: !1
    },
    readonly: {
      type: Boolean,
      default: !1
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
      validator(e) {
        return ["small", "medium", "large"].includes(e);
      }
    },
    maxlength: {
      type: Number,
      default: -1
    },
    round: {
      type: Boolean,
      default: !1
    },
    square: {
      type: Boolean,
      default: !1
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
      validator(e) {
        return ["info", "success", "warn", "primary", "error"].includes(
          e
        );
      }
    },
    activeColor: {
      type: String,
      default: null,
      validator(e) {
        return l.common.matchingText(e, "hex");
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
      default: !1
    },
    align: {
      type: String,
      default: "left",
      validator(e) {
        return ["left", "center", "right"].includes(e);
      }
    },
    name: {
      type: String,
      default: null
    },
    autofocus: {
      type: Boolean,
      default: !1
    },
    inputMode: {
      type: [String, Boolean],
      default: !1,
      validator(e) {
        return [
          !1,
          "none",
          "text",
          "decimal",
          "numeric",
          "tel",
          "search",
          "email",
          "url"
        ].includes(e);
      }
    },
    rows: {
      type: Number,
      default: 1
    },
    autosize: {
      type: [Boolean, Object],
      default: !1
    }
  },
  computed: {
    showClearIcon() {
      return this.disabled || this.readonly ? !1 : !!(this.realValue && this.focus);
    },
    clearStyle() {
      let e = {};
      return (this.suffixIconType || this.suffixIconUrl || this.$slots.suffix) && this.type != "textarea" && (e.borderRadius = 0), e;
    },
    prependStyle() {
      let e = {};
      return this.prependBackground && (e.backgroundColor = this.prependBackground), this.prependColor && (e.color = this.prependColor), e;
    },
    appendStyle() {
      let e = {};
      return this.appendBackground && (e.backgroundColor = this.appendBackground), this.appendColor && (e.color = this.appendColor), e;
    },
    inputStyle() {
      let e = {};
      return (this.$slots.prefix || this.prefixIconType || this.prefixIconUrl) && this.type != "textarea" && (e.paddingLeft = 0), (this.$slots.suffix || this.suffixIconType || this.suffixIconUrl || this.showClearIcon && this.clearable) && this.type != "textarea" && (e.paddingRight = 0), this.align && (e.textAlign = this.align), e;
    },
    fieldBodyStyle() {
      let e = {};
      if (this.focus) {
        if (this.activeColor) {
          e.borderColor = this.activeColor;
          const t = l.color.hex2rgb(this.activeColor);
          e.boxShadow = `0 0 0.16rem rgba(${t[0]},${t[1]},${t[2]},0.5)`;
        }
      } else
        this.borderColor && (e.borderColor = this.borderColor);
      return e;
    },
    fieldBodyClass() {
      let e = ["mvi-field-body"];
      return (this.prependIconType || this.prependIconUrl || this.$slots.prepend) && this.type != "textarea" && e.push("mvi-field-body-left"), (this.appendIconType || this.appendIconUrl || this.$slots.append) && this.type != "textarea" && e.push("mvi-field-body-right"), !this.activeColor && this.activeType && this.focus && e.push("mvi-field-body-" + this.activeType), e;
    },
    fieldClass() {
      let e = ["mvi-field", "mvi-field-" + this.size];
      return this.round && this.type != "textarea" ? e.push("mvi-field-round") : this.square && e.push("mvi-field-square"), e;
    },
    computedType() {
      return this.type == "number" ? "text" : this.type;
    },
    computedInputMode() {
      let e = !1;
      return typeof this.inputMode == "string" && (e = this.inputMode), e;
    },
    prependIconType() {
      let e = null;
      return l.common.isObject(this.prepend) ? typeof this.prepend.type == "string" && (e = this.prepend.type) : typeof this.prepend == "string" && (e = this.prepend), e;
    },
    prependIconUrl() {
      let e = null;
      return l.common.isObject(this.prepend) && typeof this.prepend.url == "string" && (e = this.prepend.url), e;
    },
    prependIconSpin() {
      let e = !1;
      return l.common.isObject(this.prepend) && typeof this.prepend.spin == "boolean" && (e = this.prepend.spin), e;
    },
    prependIconSize() {
      let e = null;
      return l.common.isObject(this.prepend) && typeof this.prepend.size == "string" && (e = this.prepend.size), e;
    },
    prependIconColor() {
      let e = null;
      return l.common.isObject(this.prepend) && typeof this.prepend.color == "string" && (e = this.prepend.color), e;
    },
    appendIconType() {
      let e = null;
      return l.common.isObject(this.append) ? typeof this.append.type == "string" && (e = this.append.type) : typeof this.append == "string" && (e = this.append), e;
    },
    appendIconUrl() {
      let e = null;
      return l.common.isObject(this.append) && typeof this.append.url == "string" && (e = this.append.url), e;
    },
    appendIconSpin() {
      let e = !1;
      return l.common.isObject(this.append) && typeof this.append.spin == "boolean" && (e = this.append.spin), e;
    },
    appendIconSize() {
      let e = null;
      return l.common.isObject(this.append) && typeof this.append.size == "string" && (e = this.append.size), e;
    },
    appendIconColor() {
      let e = null;
      return l.common.isObject(this.append) && typeof this.append.color == "string" && (e = this.append.color), e;
    },
    prefixIconType() {
      let e = null;
      return l.common.isObject(this.prefix) ? typeof this.prefix.type == "string" && (e = this.prefix.type) : typeof this.prefix == "string" && (e = this.prefix), e;
    },
    prefixIconUrl() {
      let e = null;
      return l.common.isObject(this.prefix) && typeof this.prefix.url == "string" && (e = this.prefix.url), e;
    },
    prefixIconSpin() {
      let e = !1;
      return l.common.isObject(this.prefix) && typeof this.prefix.spin == "boolean" && (e = this.prefix.spin), e;
    },
    prefixIconSize() {
      let e = null;
      return l.common.isObject(this.prefix) && typeof this.prefix.size == "string" && (e = this.prefix.size), e;
    },
    prefixIconColor() {
      let e = null;
      return l.common.isObject(this.prefix) && typeof this.prefix.color == "string" && (e = this.prefix.color), e;
    },
    suffixIconType() {
      let e = null;
      return l.common.isObject(this.suffix) ? typeof this.suffix.type == "string" && (e = this.suffix.type) : typeof this.suffix == "string" && (e = this.suffix), e;
    },
    suffixIconUrl() {
      let e = null;
      return l.common.isObject(this.suffix) && typeof this.suffix.url == "string" && (e = this.suffix.url), e;
    },
    suffixIconSpin() {
      let e = !1;
      return l.common.isObject(this.suffix) && typeof this.suffix.spin == "boolean" && (e = this.suffix.spin), e;
    },
    suffixIconSize() {
      let e = null;
      return l.common.isObject(this.suffix) && typeof this.suffix.size == "string" && (e = this.suffix.size), e;
    },
    suffixIconColor() {
      let e = null;
      return l.common.isObject(this.suffix) && typeof this.suffix.color == "string" && (e = this.suffix.color), e;
    },
    rowsFilter() {
      let e = this.rows;
      return l.common.isObject(this.autosize) && (l.number.isNumber(this.autosize.minRows) && this.rows < this.autosize.minRows && (e = this.autosize.minRows), l.number.isNumber(this.autosize.maxRows) && this.rows > this.autosize.maxRows && (e = this.autosize.maxRows)), e;
    },
    realValue: {
      set(e) {
        this.modelValue !== e && this.$emit("update:modelValue", e);
      },
      get() {
        let e = this.modelValue === null ? "" : this.modelValue.toString();
        return this.type == "number" && (e = e.replace(/\D/g, "")), this.maxlength > 0 && e.length > this.maxlength && (e = e.substr(0, this.maxlength)), this.modelValue !== e && this.$emit("update:modelValue", e), e;
      }
    }
  },
  components: {
    mIcon: M
  },
  watch: {
    realValue(e) {
      this.$nextTick(() => {
        this.$refs.textarea && (this.autosize == !0 || l.common.isObject(this.autosize)) && this.autosizeSet();
      });
    },
    rows(e) {
      this.$nextTick(() => {
        this.$refs.textarea && this.setMaxMinHeight();
      });
    },
    autosize(e) {
      this.$nextTick(() => {
        this.$refs.textarea && this.setMaxMinHeight();
      });
    }
  },
  mounted() {
    this.$refs.textarea && (this.setMaxMinHeight(), (this.autosize == !0 || l.common.isObject(this.autosize)) && this.autosizeSet());
  },
  methods: {
    autosizeSet() {
      this.$refs.textarea.style.overflow = "hidden", this.$refs.textarea.style.height = "auto", this.$refs.textarea.scrollTop = 0, this.$refs.textarea.style.height = l.element.getScrollHeight(this.$refs.textarea) + "px";
    },
    rows2Height(e) {
      let t = Math.floor(
        parseFloat(
          l.element.getCssStyle(this.$refs.textarea, "line-height")
        )
      );
      return e * t;
    },
    setMaxMinHeight() {
      if (l.common.isObject(this.autosize)) {
        if (l.number.isNumber(this.autosize.maxRows)) {
          let e = this.rows2Height(this.autosize.maxRows) + parseFloat(
            l.element.getCssStyle(
              this.$refs.textarea,
              "padding-top"
            )
          ) + parseFloat(
            l.element.getCssStyle(
              this.$refs.textarea,
              "padding-bottom"
            )
          );
          this.$refs.textarea.style.maxHeight = e + "px";
        }
        if (l.number.isNumber(this.autosize.minRows)) {
          let e = this.rows2Height(this.autosize.minRows) + parseFloat(
            l.element.getCssStyle(
              this.$refs.textarea,
              "padding-top"
            )
          ) + parseFloat(
            l.element.getCssStyle(
              this.$refs.textarea,
              "padding-bottom"
            )
          );
          this.$refs.textarea.style.minHeight = e + "px";
        }
      } else
        this.$refs.textarea.style.maxHeight = "", this.$refs.textarea.style.minHeight = "";
    },
    inputFocus() {
      this.disabled || (this.$emit("focus", this.realValue), setTimeout(() => {
        this.focus = !0;
      }, 200));
    },
    inputBlur() {
      this.disabled || (this.$emit("blur", this.realValue), setTimeout(() => {
        this.focus = !1;
      }, 200));
    },
    input(e) {
      this.disabled || this.$emit("input", this.realValue);
    },
    prependClick() {
      this.disabled || this.$emit("prepend-click", this.realValue);
    },
    prefixClick() {
      this.disabled || this.$emit("prefix-click", this.realValue);
    },
    appendClick() {
      this.disabled || this.$emit("append-click", this.realValue);
    },
    suffixClick() {
      this.disabled || this.$emit("suffix-click", this.realValue);
    },
    doClear() {
      if (this.disabled || !this.clearable)
        return;
      this.realValue = "", (this.$refs.input || this.$refs.textarea).focus(), this.$emit("clear", "");
    }
  }
}, sa = ["disabled", "data-type"], la = ["disabled", "readonly", "placeholder", "maxlength", "name", "autofocus", "rows"], ra = ["disabled", "readonly", "type", "placeholder", "inputmode", "maxlength", "name", "autofocus"];
function na(e, t, s, r, n, i) {
  const f = x("m-icon");
  return o(), u("div", {
    class: y(i.fieldClass),
    disabled: s.disabled || null,
    "data-type": s.type
  }, [
    (i.prependIconType || i.prependIconUrl || e.$slots.prepend) && s.type != "textarea" ? (o(), u("div", {
      key: 0,
      class: "mvi-field-prepend",
      style: b(i.prependStyle),
      onClick: t[0] || (t[0] = (...a) => i.prependClick && i.prependClick(...a))
    }, [
      e.$slots.prepend ? S(e.$slots, "prepend", { key: 0 }, void 0, !0) : i.prependIconType || i.prependIconUrl ? (o(), I(f, {
        key: 1,
        type: i.prependIconType,
        url: i.prependIconUrl,
        spin: i.prependIconSpin,
        size: i.prependIconSize,
        color: i.prependIconColor
      }, null, 8, ["type", "url", "spin", "size", "color"])) : g("", !0)
    ], 4)) : g("", !0),
    v("div", {
      class: y(i.fieldBodyClass),
      style: b(i.fieldBodyStyle)
    }, [
      (i.prefixIconType || i.prefixIconUrl || e.$slots.prefix) && s.type != "textarea" ? (o(), u("div", {
        key: 0,
        class: "mvi-field-prefix",
        onClick: t[1] || (t[1] = (...a) => i.prefixClick && i.prefixClick(...a))
      }, [
        e.$slots.prefix ? S(e.$slots, "prefix", { key: 0 }, void 0, !0) : i.prefixIconType || i.prefixIconUrl ? (o(), I(f, {
          key: 1,
          type: i.prefixIconType,
          url: i.prefixIconUrl,
          spin: i.prefixIconSpin,
          size: i.prefixIconSize,
          color: i.prefixIconColor
        }, null, 8, ["type", "url", "spin", "size", "color"])) : g("", !0)
      ])) : g("", !0),
      s.type == "textarea" ? B((o(), u("textarea", {
        key: 1,
        ref: "textarea",
        disabled: s.disabled || null,
        readonly: s.readonly || null,
        class: "mvi-field-input",
        style: b(i.inputStyle),
        placeholder: s.placeholder,
        "onUpdate:modelValue": t[2] || (t[2] = (a) => i.realValue = a),
        autocomplete: "off",
        onFocus: t[3] || (t[3] = (...a) => i.inputFocus && i.inputFocus(...a)),
        onBlur: t[4] || (t[4] = (...a) => i.inputBlur && i.inputBlur(...a)),
        maxlength: s.maxlength,
        name: s.name,
        autofocus: s.autofocus,
        rows: i.rowsFilter,
        onInput: t[5] || (t[5] = (...a) => i.input && i.input(...a))
      }, null, 44, la)), [
        [J, i.realValue]
      ]) : B((o(), u("input", {
        key: 2,
        ref: "input",
        disabled: s.disabled || null,
        readonly: s.readonly || null,
        class: "mvi-field-input",
        style: b(i.inputStyle),
        type: i.computedType,
        placeholder: s.placeholder,
        "onUpdate:modelValue": t[6] || (t[6] = (a) => i.realValue = a),
        autocomplete: "off",
        inputmode: i.computedInputMode,
        onFocus: t[7] || (t[7] = (...a) => i.inputFocus && i.inputFocus(...a)),
        onBlur: t[8] || (t[8] = (...a) => i.inputBlur && i.inputBlur(...a)),
        maxlength: s.maxlength,
        name: s.name,
        autofocus: s.autofocus,
        onInput: t[9] || (t[9] = (...a) => i.input && i.input(...a))
      }, null, 44, ra)), [
        [we, i.realValue]
      ]),
      s.clearable && s.type != "textarea" ? B((o(), u("div", {
        key: 3,
        class: "mvi-field-clear",
        onClick: t[10] || (t[10] = (...a) => i.doClear && i.doClear(...a)),
        style: b(i.clearStyle)
      }, [
        D(f, { type: "times-o" })
      ], 4)), [
        [j, i.showClearIcon]
      ]) : g("", !0),
      (i.suffixIconType || i.suffixIconUrl || e.$slots.suffix) && s.type != "textarea" ? (o(), u("div", {
        key: 4,
        class: "mvi-field-suffix",
        onClick: t[11] || (t[11] = (...a) => i.suffixClick && i.suffixClick(...a))
      }, [
        e.$slots.suffix ? S(e.$slots, "suffix", { key: 0 }, void 0, !0) : i.suffixIconType || i.suffixIconUrl ? (o(), I(f, {
          key: 1,
          type: i.suffixIconType,
          url: i.suffixIconUrl,
          spin: i.suffixIconSpin,
          size: i.suffixIconSize,
          color: i.suffixIconColor
        }, null, 8, ["type", "url", "spin", "size", "color"])) : g("", !0)
      ])) : g("", !0)
    ], 6),
    (i.appendIconType || i.appendIconUrl || e.$slots.append) && s.type != "textarea" ? (o(), u("div", {
      key: 1,
      class: "mvi-field-append",
      style: b(i.appendStyle),
      onClick: t[12] || (t[12] = (...a) => i.appendClick && i.appendClick(...a))
    }, [
      e.$slots.append ? S(e.$slots, "append", { key: 0 }, void 0, !0) : i.appendIconType || i.appendIconUrl ? (o(), I(f, {
        key: 1,
        type: i.appendIconType,
        url: i.appendIconUrl,
        spin: i.appendIconSpin,
        size: i.appendIconSize,
        color: i.appendIconColor
      }, null, 8, ["type", "url", "spin", "size", "color"])) : g("", !0)
    ], 4)) : g("", !0)
  ], 10, sa);
}
const et = /* @__PURE__ */ T(ia, [["render", na], ["__scopeId", "data-v-fe8a2da1"]]);
et.install = (e) => {
  e.component(et.name, et);
};
const oa = {
  name: "m-editor-item",
  props: {
    value: {
      type: String,
      default: null
    },
    menu: {
      type: [Array, Boolean],
      default: function() {
        return !1;
      }
    }
  },
  setup() {
    return {
      uid: F().uid
    };
  },
  data() {
    return {
      layerShow: !1,
      tabIndex: 0,
      remoteUrl: "",
      linkUrl: "",
      linkText: "",
      linkTarget: !1,
      tableRows: 5,
      tableColumns: 5,
      menuActive: !1,
      uploadElArray: []
    };
  },
  inject: ["editor"],
  computed: {
    activeColorStyle() {
      let e = {};
      return this.editor.activeColor && (e.color = this.editor.activeColor), e;
    },
    editorTargetStyle() {
      let e = {};
      return this.editor.activeColor && this.menuActive && (e.color = this.editor.activeColor), e;
    },
    hasSelect() {
      return Array.isArray(this.menu);
    },
    uploadOptions() {
      return {
        allowedFileType: this.value == "image" ? this.editor.defaultUploadImageProps.allowedFileType : this.editor.defaultUploadVideoProps.allowedFileType,
        multiple: this.value == "image" ? this.editor.defaultUploadImageProps.multiple : this.editor.defaultUploadVideoProps.multiple,
        accept: this.value == "image" ? this.editor.defaultUploadImageProps.accept : this.editor.defaultUploadVideoProps.accept,
        minSize: this.value == "image" ? this.editor.defaultUploadImageProps.minSize : this.editor.defaultUploadVideoProps.minSize,
        maxSize: this.value == "image" ? this.editor.defaultUploadImageProps.maxSize : this.editor.defaultUploadVideoProps.maxSize,
        minLength: this.value == "image" ? this.editor.defaultUploadImageProps.minLength : this.editor.defaultUploadVideoProps.minLength,
        maxLength: this.value == "image" ? this.editor.defaultUploadImageProps.maxLength : this.editor.defaultUploadVideoProps.maxLength,
        select: (e) => {
          this.editor.restoreRange(), this.editor.useBase64 ? e.forEach((t) => {
            l.file.dataFileToBase64(t).then((s) => {
              this.value == "image" ? this.editor.insertImage(s) : this.editor.insertVideo(s);
            });
          }) : this.value == "image" ? this.editor.$emit("upload-image", e) : this.value == "video" && this.editor.$emit("upload-video", e), this.hideLayer();
        },
        error: (e, t, s) => {
          this.value == "image" ? typeof this.editor.uploadImageError == "function" ? this.editor.uploadImageError(e, t, s) : this.$msgbox({
            message: t,
            animation: "scale"
          }) : typeof this.editor.uploadVideoError == "function" ? this.editor.uploadVideoError(e, t, s) : this.$msgbox({
            message: t,
            animation: "scale"
          }), this.hideLayer();
        }
      };
    }
  },
  components: {
    mTooltip: be,
    mIcon: M,
    mLayer: ee,
    mTabs: pe,
    mTab: bt,
    mCheckbox: le
  },
  mounted() {
    this.editor.trigger == "hover" && (l.event.on(this.$el, "mouseenter.editor", this.showLayer), l.event.on(this.$el, "mouseleave.editor", this.hideLayer));
  },
  methods: {
    inputFocus(e) {
      this.editor.activeColor && (e.currentTarget.style.borderColor = this.editor.activeColor);
    },
    inputBlur(e) {
      this.editor.activeColor && (e.currentTarget.style.borderColor = "");
    },
    doSelect(e, t) {
      if (!this.editor.disabled) {
        switch (this.editor.restoreRange(), this.value) {
          case "tag":
            document.execCommand("formatBlock", !1, e.value);
            break;
          case "fontFamily":
            document.execCommand("fontName", !1, e.value);
            break;
          case "list":
            e.value == "ol" ? document.execCommand("insertOrderedList") : document.execCommand("insertUnorderedList");
            break;
          case "justify":
            e.value == "left" ? document.execCommand("justifyLeft") : e.value == "center" ? document.execCommand("justifyCenter") : e.value == "right" ? document.execCommand("justifyRight") : e.value == "justify" && document.execCommand("justifyFull");
            break;
          case "foreColor":
            document.execCommand("foreColor", !1, e.value);
            break;
          case "backColor":
            document.execCommand("hiliteColor", !1, e.value);
            break;
          case "fontSize":
            document.execCommand("fontSize", !1, t + 1);
            break;
          default:
            this.editor.$emit("custom", {
              key: this.value,
              itemKey: e.value
            });
        }
        this.hideLayer();
      }
    },
    showLayer() {
      this.editor.disabled || this.hasSelect && (this.layerShow = !0, this.$nextTick(() => {
        this.editor.range && (this.value == "link" ? this.linkInsertSet() : this.value == "table" ? this.tableInsertSet() : (this.value == "image" || this.value == "video") && this.uploadSet());
      }));
    },
    hideLayer() {
      this.editor.disabled || this.hasSelect && (this.layerShow = !1);
    },
    targetTrigger() {
      if (!this.editor.disabled && !(this.value != "codeView" && this.editor.codeViewShow))
        if (this.hasSelect)
          this.editor.trigger == "click" && (this.layerShow ? this.hideLayer() : this.showLayer());
        else
          switch (this.editor.restoreRange(), this.value) {
            case "undo":
              document.execCommand("undo");
              break;
            case "redo":
              document.execCommand("redo");
              break;
            case "removeFormat":
              document.execCommand("removeFormat");
              break;
            case "selectAll":
              document.execCommand("selectAll");
              break;
            case "divider":
              document.execCommand("insertHorizontalRule"), document.execCommand("insertHtml", !1, "<p><br></p>");
              break;
            case "bold":
              document.execCommand("bold");
              break;
            case "italic":
              document.execCommand("italic");
              break;
            case "underline":
              document.execCommand("underline");
              break;
            case "strikeThrough":
              document.execCommand("strikeThrough");
              break;
            case "subscript":
              document.execCommand("subscript");
              break;
            case "superscript":
              document.execCommand("superscript");
              break;
            case "quote":
              this.menuActive ? this.removeBlock() : document.execCommand(
                "formatBlock",
                !1,
                "blockquote"
              );
              break;
            case "code":
              this.menuActive ? this.removeCode() : document.execCommand("formatBlock", !1, "pre");
              break;
            case "codeView":
              this.editor.codeViewShow = !this.editor.codeViewShow, this.$nextTick(() => {
                this.editor.codeViewShow ? (this.editor.$refs.codeView.innerText = this.editor.html, this.editor.collapseToEnd()) : (this.editor.$refs.content.innerHTML = this.editor.html, this.editor.collapseToEnd(), this.editor.changeActive());
              });
              break;
            default:
              this.editor.$emit("custom", {
                key: this.value,
                menu: this
              });
          }
    },
    insertRemote() {
      if (!this.editor.disabled) {
        if (!this.remoteUrl) {
          this.hideLayer();
          return;
        }
        this.editor.restoreRange(), this.value == "image" ? this.editor.insertImage(this.remoteUrl) : this.editor.insertVideo(this.remoteUrl), this.remoteUrl = "", this.tabIndex = 0, this.hideLayer();
      }
    },
    uploadSet() {
      if (this.uploadElArray.length > 0)
        for (let e = 0; e < this.uploadElArray.length; e++)
          new q(
            this.uploadElArray[e],
            this.uploadOptions
          ).init();
    },
    insertLink() {
      if (this.editor.disabled)
        return;
      if (!this.linkUrl) {
        this.hideLayer();
        return;
      }
      this.linkText || (this.linkText = this.linkUrl);
      let e = l.element.string2dom(
        `<a href="${this.linkUrl}">${this.linkText}</a>`
      );
      if (this.linkTarget && e.setAttribute("target", "_blank"), this.editor.restoreRange(), this.menuActive) {
        let t = this.editor.getSelectNode();
        this.editor.compareTag(t, "a") && this.editor.getCompareTag(t, "a").remove();
      }
      document.execCommand("insertHtml", !1, e.outerHTML), this.hideLayer();
    },
    linkInsertSet() {
      if (this.menuActive) {
        let e = this.editor.getSelectNode(), t = this.editor.getCompareTag(e, "a");
        this.linkUrl = t.getAttribute("href"), this.linkText = t.innerText, this.linkTarget = t.hasAttribute("target"), this.$nextTick(() => {
          this.$refs.linkText.focus();
        });
      } else {
        this.linkUrl = "", this.linkTarget = !1;
        let e = this.editor.range.toString();
        e ? (this.linkText = e, this.$refs.linkUrl.focus()) : (this.linkText = "", this.$refs.linkText.focus());
      }
    },
    deleteLink() {
      if (this.editor.disabled)
        return;
      this.editor.restoreRange();
      let e = this.editor.getSelectNode();
      if (this.editor.compareTag(e, "a")) {
        let t = this.editor.getCompareTag(e, "a");
        t && (t.remove(), this.menuActive = !1);
      }
      this.editor.updateHtmlText(), this.editor.updateValue(), this.hideLayer();
    },
    tableInsertSet() {
      this.$refs.rowsInput && this.$refs.rowsInput.focus();
    },
    insertTable() {
      if (!this.tableRows || !this.tableColumns) {
        this.hideLayer();
        return;
      }
      if (!l.common.matchingText(
        this.tableRows.toString(),
        "number"
      ) || !l.common.matchingText(
        this.tableColumns.toString(),
        "number"
      )) {
        this.hideLayer();
        return;
      }
      let e = this.$refs.table.cloneNode(!0);
      e.style.display = "", this.editor.restoreRange(), document.execCommand("insertHtml", !1, e.outerHTML), this.hideLayer();
    },
    addTableRow() {
      let e = this.editor.getSelectNode();
      if (this.editor.compareTag(e, "tr")) {
        let t = this.editor.getCompareTag(e, "tr");
        this.copyRowAppend(t);
      } else if (this.editor.compareTag(e, "tbody")) {
        let t = this.editor.getCompareTag(e, "tbody"), s = l.element.children(t, "tr");
        this.copyRowAppend(s[s.length - 1]);
      } else if (this.editor.compareTag(e, "table")) {
        let t = this.editor.getCompareTag(e, "table"), s = l.element.children(t, "tbody")[0], r = l.element.children(s, "tr");
        this.copyRowAppend(r[r.length - 1]);
      }
      this.editor.updateHtmlText(), this.editor.updateValue(), this.hideLayer();
    },
    removeTableRow() {
      let e = this.editor.getSelectNode();
      if (this.editor.compareTag(e, "tr"))
        this.editor.getCompareTag(e, "tr").remove();
      else if (this.editor.compareTag(e, "tbody")) {
        let t = this.editor.getCompareTag(e, "tbody"), s = l.element.children(t, "tr");
        s[s.length - 1].remove();
      } else if (this.editor.compareTag(e, "table")) {
        let t = this.editor.getCompareTag(e, "table"), s = l.element.children(t, "tbody")[0], r = l.element.children(s, "tr");
        r[r.length - 1].remove();
      }
      this.editor.updateHtmlText(), this.editor.updateValue(), this.hideLayer();
    },
    addTableColumn() {
      let e = this.editor.getSelectNode();
      if (this.editor.compareTag(e, "td")) {
        let t = this.editor.getCompareTag(e, "td");
        this.copyColumnAppend(t);
      } else if (this.editor.compareTag(e, "tr")) {
        let t = this.editor.getCompareTag(e, "tr"), s = l.element.children(t, "td");
        this.copyColumnAppend(s[s.length - 1]);
      } else if (this.editor.compareTag(e, "tbody")) {
        let t = this.editor.getCompareTag(e, "tbody"), s = l.element.children(t, "tr")[0], r = l.element.children(s, "td");
        this.copyColumnAppend(r[r.length - 1]);
      } else if (this.editor.compareTag(e, "table")) {
        let t = this.editor.getCompareTag(e, "table"), s = l.element.children(t, "tbody")[0], r = l.element.children(s, "tr")[0], n = l.element.children(r, "td");
        this.copyColumnAppend(n[n.length - 1]);
      }
      this.editor.updateHtmlText(), this.editor.updateValue(), this.hideLayer();
    },
    removeTableColumn() {
      let e = this.editor.getSelectNode();
      if (this.editor.compareTag(e, "td")) {
        let t = this.editor.getCompareTag(e, "td");
        this.removeColumn(t);
      } else if (this.editor.compareTag(e, "tr")) {
        let t = this.editor.getCompareTag(e, "tr"), s = l.element.children(t, "td");
        this.removeColumn(s[s.length - 1]);
      } else if (this.editor.compareTag(e, "tbody")) {
        let t = this.editor.getCompareTag(e, "tbody"), s = l.element.children(t, "tr")[0], r = l.element.children(s, "td");
        this.removeColumn(r[r.length - 1]);
      } else if (this.editor.compareTag(e, "table")) {
        let t = this.editor.getCompareTag(e, "table"), s = l.element.children(t, "tbody")[0], r = l.element.children(s, "tr")[0], n = l.element.children(r, "td");
        this.removeColumn(n[n.length - 1]);
      }
      this.editor.updateHtmlText(), this.editor.updateValue(), this.hideLayer();
    },
    deleteTable() {
      this.editor.restoreRange();
      let e = this.editor.getSelectNode(), t = this.editor.getCompareTag(e, "table");
      t && (t.remove(), this.menuActive = !1), this.editor.updateHtmlText(), this.editor.updateValue(), this.hideLayer();
    },
    insertNodeAfter(e, t) {
      let s = t.parentNode, r = l.element.children(s);
      r[r.length - 1] == t ? s.appendChild(e) : s.insertBefore(e, t.nextSibling);
    },
    copyRowAppend(e) {
      let t = e.cloneNode(!0);
      t.querySelectorAll("td").forEach((s) => {
        s.innerHTML = "<br>";
      }), this.insertNodeAfter(t, e);
    },
    copyColumnAppend(e) {
      let t = [].indexOf.call(
        l.element.children(e.parentNode, e.tagName),
        e
      );
      e.parentNode.parentNode.querySelectorAll("tr").forEach((s) => {
        let r = l.element.children(s, "td")[t], n = r.cloneNode(!0);
        n.innerHTML = "<br>", this.insertNodeAfter(n, r);
      });
    },
    removeColumn(e) {
      let t = [].indexOf.call(
        l.element.children(e.parentNode, e.tagName),
        e
      );
      e.parentNode.parentNode.querySelectorAll("tr").forEach((s) => {
        l.element.children(s, "td")[t].remove();
      });
    },
    removeCode() {
      let e = this.editor.getSelectNode(), t = this.editor.$refs.content.querySelectorAll("pre"), s = null, r = "";
      for (let i = 0; i < t.length; i++)
        if (l.element.isContains(t[i], e)) {
          s = t[i], r = s.innerHTML;
          break;
        }
      let n = l.element.string2dom("<p>" + r + "</p>");
      n instanceof HTMLCollection && (n = l.element.string2dom("<div>" + r + "</div>")), this.insertNodeAfter(n, s), s.remove(), this.editor.range && (this.editor.range.setStartAfter(n), this.menuActive = !1), this.editor.updateHtmlText(), this.editor.updateValue();
    },
    removeBlock() {
      let e = this.editor.getSelectNode(), t = this.editor.$refs.content.querySelectorAll("blockquote"), s = null, r = "";
      for (let i = 0; i < t.length; i++)
        if (l.element.isContains(t[i], e)) {
          s = t[i], r = s.innerHTML;
          break;
        }
      let n = l.element.string2dom("<p>" + r + "</p>");
      n instanceof HTMLCollection && (n = l.element.string2dom("<div>" + r + "</div>")), this.insertNodeAfter(n, s), s.remove(), this.editor.range && (this.editor.range.setStartAfter(n), this.menuActive = !1), this.editor.updateHtmlText(), this.editor.updateValue();
    }
  },
  beforeUnmount() {
    this.editor.trigger == "hover" && l.event.off(this.$el, "mouseenter.editor mouseleave.editor");
  }
}, aa = (e) => (Ct("data-v-6fdbbcb4"), e = e(), xt(), e), ha = ["data-id"], ua = ["disabled", "data-id"], da = ["disabled", "data-id"], ca = { class: "mvi-editor-layer" }, fa = {
  key: 0,
  class: "mvi-editor-medias"
}, ma = {
  key: 1,
  class: "mvi-editor-remote"
}, pa = ["placeholder"], ga = {
  key: 1,
  class: "mvi-editor-links"
}, ya = {
  key: 0,
  class: "mvi-editor-link"
}, ba = { class: "mvi-editor-link-footer" }, va = { class: "mvi-editor-link-operation" }, wa = {
  key: 2,
  class: "mvi-editor-colors"
}, Ca = ["onClick"], xa = {
  key: 3,
  class: "mvi-editor-tables"
}, Ia = {
  key: 0,
  class: "mvi-editor-table"
}, Sa = {
  key: 0,
  class: "mvi-editor-table-edit"
}, _a = {
  key: 1,
  class: "mvi-editor-table-create"
}, Ta = /* @__PURE__ */ ve(" \u521B\u5EFA"), ka = /* @__PURE__ */ ve(" \u884C"), Da = /* @__PURE__ */ ve("\u5217\u7684\u8868\u683C "), Pa = { class: "mvi-editor-table-footer" }, za = { key: 4 }, Aa = ["onClick"], Ea = ["textContent"], Ma = {
  key: 2,
  style: { display: "none" },
  ref: "table",
  class: "mvi-editor-table-demo",
  cellpadding: "0",
  cellspacing: "0",
  "mvi-editor-insert-table": ""
}, Ba = { "mvi-editor-insert-table": "" }, Oa = /* @__PURE__ */ aa(() => /* @__PURE__ */ v("br", null, null, -1)), Ha = [
  Oa
];
function Va(e, t, s, r, n, i) {
  const f = x("m-icon"), a = x("m-tooltip"), c = x("m-tab"), d = x("m-tabs"), h = x("m-checkbox"), m = x("m-layer");
  return o(), u("div", {
    class: "mvi-eitor-item",
    "data-id": `mvi-editor-root-${r.uid}-${s.value}`
  }, [
    i.editor.useTooltip && i.editor.defaultTooltips[s.value] ? (o(), I(a, {
      key: 0,
      disabled: i.editor.disabled || s.value != "codeView" && i.editor.codeViewShow,
      title: i.editor.defaultTooltips[s.value],
      trigger: "hover",
      placement: i.editor.defaultTooltipProps.placement,
      timeout: i.editor.defaultTooltipProps.timeout,
      color: i.editor.defaultTooltipProps.color,
      "text-color": i.editor.defaultTooltipProps.textColor,
      "border-color": i.editor.defaultTooltipProps.borderColor,
      offset: i.editor.defaultTooltipProps.offset,
      "z-index": i.editor.defaultTooltipProps.zIndex,
      fixed: i.editor.defaultTooltipProps.fixed,
      "fixed-auto": i.editor.defaultTooltipProps.fixedAuto,
      width: i.editor.defaultTooltipProps.width,
      animation: i.editor.defaultTooltipProps.animation,
      "show-triangle": i.editor.defaultTooltipProps.showTriangle
    }, {
      default: P(() => [
        v("div", {
          class: "mvi-editor-target",
          onClick: t[0] || (t[0] = (...p) => i.targetTrigger && i.targetTrigger(...p)),
          disabled: i.editor.disabled || s.value != "codeView" && i.editor.codeViewShow || null,
          "data-id": `mvi-editor-target-${r.uid}-${s.value}`,
          style: b(i.editorTargetStyle)
        }, [
          i.editor.computedMenuIcons[s.value].custom ? (o(), u("i", {
            key: 0,
            class: y(i.editor.computedMenuIcons[s.value].value)
          }, null, 2)) : (o(), I(f, {
            key: 1,
            type: i.editor.computedMenuIcons[s.value].value
          }, null, 8, ["type"]))
        ], 12, ua)
      ]),
      _: 1
    }, 8, ["disabled", "title", "placement", "timeout", "color", "text-color", "border-color", "offset", "z-index", "fixed", "fixed-auto", "width", "animation", "show-triangle"])) : (o(), u("div", {
      key: 1,
      class: "mvi-editor-target",
      onClick: t[1] || (t[1] = (...p) => i.targetTrigger && i.targetTrigger(...p)),
      disabled: i.editor.disabled || s.value != "codeView" && i.editor.codeViewShow || null,
      "data-id": `mvi-editor-target-${r.uid}-${s.value}`,
      style: b(i.editorTargetStyle)
    }, [
      i.editor.computedMenuIcons[s.value].custom ? (o(), u("i", {
        key: 0,
        class: y(i.editor.computedMenuIcons[s.value].value)
      }, null, 2)) : (o(), I(f, {
        key: 1,
        type: i.editor.computedMenuIcons[s.value].value
      }, null, 8, ["type"]))
    ], 12, da)),
    D(m, {
      modelValue: n.layerShow,
      "onUpdate:modelValue": t[28] || (t[28] = (p) => n.layerShow = p),
      ref: "layer",
      placement: i.editor.defaultLayerProps.placement,
      "z-index": i.editor.defaultLayerProps.zIndex,
      fixed: i.editor.defaultLayerProps.fixed,
      "fixed-auto": i.editor.defaultLayerProps.fixedAuto,
      offset: i.editor.defaultLayerProps.offset,
      "wrapper-class": i.editor.defaultLayerProps.wrapperClass,
      timeout: i.editor.defaultLayerProps.timeout,
      "show-triangle": i.editor.defaultLayerProps.showTriangle,
      animation: i.editor.defaultLayerProps.animation,
      shadow: i.editor.defaultLayerProps.shadow,
      border: i.editor.defaultLayerProps.border,
      "border-color": i.editor.defaultLayerProps.borderColor,
      background: "#fff",
      closable: i.editor.trigger == "click",
      target: `[data-id='mvi-editor-target-${r.uid}-${s.value}']`,
      root: `[data-id='mvi-editor-root-${r.uid}-${s.value}']`
    }, {
      default: P(() => [
        v("div", ca, [
          s.value == "image" || s.value == "video" ? (o(), u("div", fa, [
            D(d, {
              modelValue: n.tabIndex,
              "onUpdate:modelValue": t[6] || (t[6] = (p) => n.tabIndex = p),
              flex: "flex-start",
              offset: "0.4rem",
              "active-color": i.editor.activeColor,
              "inactive-color": "#808080"
            }, {
              default: P(() => [
                (o(!0), u(A, null, O(s.menu, (p, w) => (o(), I(c, {
                  title: p.label,
                  key: "mvi-editor-media-tab-" + w
                }, {
                  default: P(() => [
                    p.value == "upload" ? (o(), u("div", {
                      key: 0,
                      ref_for: !0,
                      ref: (C) => n.uploadElArray[w] = C,
                      class: "mvi-editor-upload"
                    }, [
                      D(f, { type: "upload-square" })
                    ], 512)) : g("", !0),
                    p.value == "remote" ? (o(), u("div", ma, [
                      B(v("input", {
                        class: "mvi-editor-remote-input",
                        onFocus: t[2] || (t[2] = (...C) => i.inputFocus && i.inputFocus(...C)),
                        onBlur: t[3] || (t[3] = (...C) => i.inputBlur && i.inputBlur(...C)),
                        "onUpdate:modelValue": t[4] || (t[4] = (C) => n.remoteUrl = C),
                        placeholder: s.value == "image" ? "\u56FE\u7247\u94FE\u63A5" : "\u89C6\u9891\u94FE\u63A5",
                        type: "text"
                      }, null, 40, pa), [
                        [
                          J,
                          n.remoteUrl,
                          void 0,
                          { trim: !0 }
                        ]
                      ]),
                      v("div", {
                        class: "mvi-editor-remote-insert",
                        style: b(i.activeColorStyle),
                        onClick: t[5] || (t[5] = (...C) => i.insertRemote && i.insertRemote(...C))
                      }, "\u63D2\u5165 ", 4)
                    ])) : g("", !0)
                  ]),
                  _: 2
                }, 1032, ["title"]))), 128))
              ]),
              _: 1
            }, 8, ["modelValue", "active-color"])
          ])) : s.value == "link" ? (o(), u("div", ga, [
            D(d, {
              flex: "flex-start",
              offset: "0.4rem",
              "active-color": i.editor.activeColor,
              "inactive-color": "#808080"
            }, {
              default: P(() => [
                D(c, {
                  title: s.menu[0].label
                }, {
                  default: P(() => [
                    s.menu[0].value == "link" ? (o(), u("div", ya, [
                      B(v("input", {
                        ref: "linkText",
                        class: "mvi-editor-link-input",
                        onFocus: t[7] || (t[7] = (...p) => i.inputFocus && i.inputFocus(...p)),
                        onBlur: t[8] || (t[8] = (...p) => i.inputBlur && i.inputBlur(...p)),
                        "onUpdate:modelValue": t[9] || (t[9] = (p) => n.linkText = p),
                        placeholder: "\u94FE\u63A5\u6587\u5B57",
                        type: "text"
                      }, null, 544), [
                        [
                          J,
                          n.linkText,
                          void 0,
                          { trim: !0 }
                        ]
                      ]),
                      B(v("input", {
                        ref: "linkUrl",
                        class: "mvi-editor-link-input",
                        onFocus: t[10] || (t[10] = (...p) => i.inputFocus && i.inputFocus(...p)),
                        onBlur: t[11] || (t[11] = (...p) => i.inputBlur && i.inputBlur(...p)),
                        "onUpdate:modelValue": t[12] || (t[12] = (p) => n.linkUrl = p),
                        placeholder: "\u94FE\u63A5\u5730\u5740",
                        type: "text"
                      }, null, 544), [
                        [
                          J,
                          n.linkUrl,
                          void 0,
                          { trim: !0 }
                        ]
                      ]),
                      v("div", ba, [
                        D(h, {
                          label: "\u65B0\u7A97\u53E3\u6253\u5F00",
                          "label-placement": "right",
                          "icon-size": "0.24rem",
                          "label-size": "0.24rem",
                          "label-color": "#808080",
                          "fill-color": i.editor.activeColor,
                          modelValue: n.linkTarget,
                          "onUpdate:modelValue": t[13] || (t[13] = (p) => n.linkTarget = p)
                        }, null, 8, ["fill-color", "modelValue"]),
                        v("div", va, [
                          n.menuActive ? (o(), u("span", {
                            key: 0,
                            class: "mvi-editor-link-delete",
                            onClick: t[14] || (t[14] = (...p) => i.deleteLink && i.deleteLink(...p))
                          }, "\u5220\u9664\u94FE\u63A5")) : g("", !0),
                          v("span", {
                            class: "mvi-editor-link-insert",
                            style: b(i.activeColorStyle),
                            onClick: t[15] || (t[15] = (...p) => i.insertLink && i.insertLink(...p))
                          }, "\u63D2\u5165", 4)
                        ])
                      ])
                    ])) : g("", !0)
                  ]),
                  _: 1
                }, 8, ["title"])
              ]),
              _: 1
            }, 8, ["active-color"])
          ])) : s.value == "foreColor" || s.value == "backColor" ? (o(), u("div", wa, [
            (o(!0), u(A, null, O(s.menu, (p, w) => (o(), I(a, {
              disabled: !(p.label && i.editor.useTooltip),
              trigger: "hover",
              title: p.label,
              key: "mvi-editor-color-" + w,
              placement: i.editor.defaultTooltipProps.placement,
              timeout: i.editor.defaultTooltipProps.timeout,
              color: i.editor.defaultTooltipProps.color,
              "text-color": i.editor.defaultTooltipProps.textColor,
              "border-color": i.editor.defaultTooltipProps.borderColor,
              offset: i.editor.defaultTooltipProps.offset,
              "z-index": i.editor.defaultTooltipProps.zIndex,
              fixed: i.editor.defaultTooltipProps.fixed,
              width: i.editor.defaultTooltipProps.width,
              "wrapper-class": i.editor.defaultTooltipProps.wrapperClass,
              animation: i.editor.defaultTooltipProps.animation,
              class: "mvi-editor-color"
            }, {
              default: P(() => [
                v("span", {
                  onClick: (C) => i.doSelect(p),
                  class: "mvi-editor-color-el",
                  style: b({ backgroundColor: p.value })
                }, null, 12, Ca)
              ]),
              _: 2
            }, 1032, ["disabled", "title", "placement", "timeout", "color", "text-color", "border-color", "offset", "z-index", "fixed", "width", "wrapper-class", "animation"]))), 128))
          ])) : s.value == "table" ? (o(), u("div", xa, [
            D(d, {
              flex: "flex-start",
              offset: "0.4rem",
              "active-color": i.editor.activeColor,
              "inactive-color": "#808080"
            }, {
              default: P(() => [
                D(c, {
                  title: n.menuActive ? "\u7F16\u8F91\u8868\u683C" : s.menu[0].label
                }, {
                  default: P(() => [
                    s.menu[0].value == "table" ? (o(), u("div", Ia, [
                      n.menuActive ? (o(), u("div", Sa, [
                        v("span", {
                          onClick: t[16] || (t[16] = (...p) => i.addTableRow && i.addTableRow(...p)),
                          class: "mvi-editor-table-add",
                          style: b(i.activeColorStyle)
                        }, "\u589E\u52A0\u884C", 4),
                        v("span", {
                          onClick: t[17] || (t[17] = (...p) => i.removeTableRow && i.removeTableRow(...p)),
                          class: "mvi-editor-table-delete"
                        }, "\u5220\u9664\u884C"),
                        v("span", {
                          onClick: t[18] || (t[18] = (...p) => i.addTableColumn && i.addTableColumn(...p)),
                          class: "mvi-editor-table-add",
                          style: b(i.activeColorStyle)
                        }, "\u589E\u52A0\u5217", 4),
                        v("span", {
                          onClick: t[19] || (t[19] = (...p) => i.removeTableColumn && i.removeTableColumn(...p)),
                          class: "mvi-editor-table-delete"
                        }, "\u5220\u9664\u5217")
                      ])) : (o(), u("div", _a, [
                        Ta,
                        B(v("input", {
                          ref: "rowsInput",
                          class: "mvi-editor-table-input",
                          onFocus: t[20] || (t[20] = (...p) => i.inputFocus && i.inputFocus(...p)),
                          onBlur: t[21] || (t[21] = (...p) => i.inputBlur && i.inputBlur(...p)),
                          "onUpdate:modelValue": t[22] || (t[22] = (p) => n.tableRows = p)
                        }, null, 544), [
                          [
                            J,
                            n.tableRows,
                            void 0,
                            {
                              trim: !0,
                              number: !0
                            }
                          ]
                        ]),
                        ka,
                        B(v("input", {
                          ref: "columnsInput",
                          class: "mvi-editor-table-input",
                          onFocus: t[23] || (t[23] = (...p) => i.inputFocus && i.inputFocus(...p)),
                          onBlur: t[24] || (t[24] = (...p) => i.inputBlur && i.inputBlur(...p)),
                          "onUpdate:modelValue": t[25] || (t[25] = (p) => n.tableColumns = p)
                        }, null, 544), [
                          [
                            J,
                            n.tableColumns,
                            void 0,
                            {
                              trim: !0,
                              number: !0
                            }
                          ]
                        ]),
                        Da
                      ])),
                      v("div", Pa, [
                        n.menuActive ? (o(), u("span", {
                          key: 0,
                          class: "mvi-editor-table-delete",
                          onClick: t[26] || (t[26] = (...p) => i.deleteTable && i.deleteTable(...p))
                        }, "\u5220\u9664\u8868\u683C")) : (o(), u("span", {
                          key: 1,
                          class: "mvi-editor-table-insert",
                          style: b(i.activeColorStyle),
                          onClick: t[27] || (t[27] = (...p) => i.insertTable && i.insertTable(...p))
                        }, "\u63D2\u5165", 4))
                      ])
                    ])) : g("", !0)
                  ]),
                  _: 1
                }, 8, ["title"])
              ]),
              _: 1
            }, 8, ["active-color"])
          ])) : (o(), u("div", za, [
            (o(!0), u(A, null, O(s.menu, (p, w) => (o(), u("div", {
              class: "mvi-editor-el",
              onClick: (C) => i.doSelect(p, w),
              key: "mvi-editor-el-" + w
            }, [
              p.icon ? (o(), u(A, { key: 0 }, [
                p.icon.custom ? (o(), u("i", {
                  key: 0,
                  class: y(["mvi-editor-el-icon", p.icon.value])
                }, null, 2)) : (o(), I(f, {
                  key: 1,
                  class: "mvi-editor-el-icon",
                  type: p.icon.value
                }, null, 8, ["type"]))
              ], 64)) : g("", !0),
              v("span", {
                textContent: _(p.label)
              }, null, 8, Ea)
            ], 8, Aa))), 128))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["modelValue", "placement", "z-index", "fixed", "fixed-auto", "offset", "wrapper-class", "timeout", "show-triangle", "animation", "shadow", "border", "border-color", "closable", "target", "root"]),
    s.value == "table" ? (o(), u("table", Ma, [
      v("tbody", Ba, [
        (o(!0), u(A, null, O(n.tableRows, (p) => (o(), u("tr", {
          "mvi-editor-insert-table": "",
          key: "tr-" + p
        }, [
          (o(!0), u(A, null, O(n.tableColumns, (w) => (o(), u("td", {
            key: "td-" + w,
            "mvi-editor-insert-table": ""
          }, Ha))), 128))
        ]))), 128))
      ])
    ], 512)) : g("", !0)
  ], 8, ha);
}
const $a = /* @__PURE__ */ T(oa, [["render", Va], ["__scopeId", "data-v-6fdbbcb4"]]);
const ja = [
  "undo",
  "redo",
  "removeFormat",
  "selectAll",
  "divider",
  "tag",
  "fontFamily",
  "fontSize",
  "foreColor",
  "backColor",
  "list",
  "justify",
  "image",
  "video"
], Wa = {
  name: "m-editor",
  data() {
    return {
      menuRefs: [],
      range: null,
      codeViewShow: !1,
      initalHtml: "",
      html: "",
      text: "",
      isModelChange: !1,
      defaultLayerProps: {
        fixed: !1,
        fixedAuto: !1,
        placement: "bottom-start",
        zIndex: 400,
        offset: "0.1rem",
        wrapperClass: null,
        timeout: 200,
        showTriangle: !1,
        animation: null,
        shadow: !0,
        border: !0,
        borderColor: "#eee"
      },
      defaultMenus: {
        undo: !0,
        redo: !0,
        removeFormat: !0,
        selectAll: !0,
        divider: !0,
        tag: [
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
            label: "H6",
            value: "h6"
          },
          {
            label: "\u6BB5\u843D",
            value: "p"
          }
        ],
        bold: !0,
        italic: !0,
        underline: !0,
        strikeThrough: !0,
        subscript: !0,
        superscript: !0,
        fontFamily: [
          "PingFang SC",
          "Helvetica Neue",
          "kaiTi",
          "Microsoft YaHei",
          "Arial",
          "sans-serif"
        ],
        fontSize: [
          {
            label: "12px",
            value: "0.24rem"
          },
          {
            label: "14px",
            value: "0.28rem"
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
        ],
        foreColor: [
          "#000000",
          "#505050",
          "#808080",
          "#BBBBBB",
          "#CCCCCC",
          "#EEEEEE",
          "#F7F7F7",
          "#FFFFFF",
          "#EC1A0A",
          "#FF9900",
          "#FFFF00",
          "#07C160",
          "#00FFFF",
          "#0B73DE",
          "#9C00FF",
          "#FF00FF",
          "#F7C6CE",
          "#FFE7CE",
          "#FFEFC6",
          "#D6EFD6",
          "#CEDEE7",
          "#CEE7F7",
          "#D6D6E7",
          "#E7D6DE",
          "#E79C9C",
          "#FFC69C",
          "#FFE79C",
          "#B5D6A5",
          "#A5C6CE",
          "#9CC6EF",
          "#B5A5D6",
          "#D6A5BD",
          "#e45649",
          "#F7AD6B",
          "#FFD663",
          "#94BD7B",
          "#73A5AD",
          "#6BADDE",
          "#8C7BC6",
          "#C67BA5",
          "#CE0000",
          "#E79439",
          "#EFC631",
          "#50a14f",
          "#4A7B8C",
          "#03A8F3",
          "#634AA5",
          "#A54A7B",
          "#9C0000",
          "#B56308",
          "#BD9400",
          "#397B21",
          "#104A5A",
          "#085294",
          "#311873",
          "#731842",
          "#630000",
          "#7B3900",
          "#986801",
          "#295218",
          "#083139",
          "#003163",
          "#21104A",
          "#4A1031"
        ],
        backColor: [
          "#000000",
          "#505050",
          "#808080",
          "#BBBBBB",
          "#CCCCCC",
          "#EEEEEE",
          "#F7F7F7",
          "#FFFFFF",
          "#EC1A0A",
          "#FF9900",
          "#FFFF00",
          "#07C160",
          "#00FFFF",
          "#0B73DE",
          "#9C00FF",
          "#FF00FF",
          "#F7C6CE",
          "#FFE7CE",
          "#FFEFC6",
          "#D6EFD6",
          "#CEDEE7",
          "#CEE7F7",
          "#D6D6E7",
          "#E7D6DE",
          "#E79C9C",
          "#FFC69C",
          "#FFE79C",
          "#B5D6A5",
          "#A5C6CE",
          "#9CC6EF",
          "#B5A5D6",
          "#D6A5BD",
          "#E76363",
          "#F7AD6B",
          "#FFD663",
          "#94BD7B",
          "#73A5AD",
          "#6BADDE",
          "#8C7BC6",
          "#C67BA5",
          "#CE0000",
          "#E79439",
          "#EFC631",
          "#6BA54A",
          "#4A7B8C",
          "#03A8F3",
          "#634AA5",
          "#A54A7B",
          "#9C0000",
          "#B56308",
          "#BD9400",
          "#397B21",
          "#104A5A",
          "#085294",
          "#311873",
          "#731842",
          "#630000",
          "#7B3900",
          "#846300",
          "#295218",
          "#083139",
          "#003163",
          "#21104A",
          "#4A1031"
        ],
        list: [
          {
            label: "\u6709\u5E8F\u5217\u8868",
            value: "ol",
            icon: "ol"
          },
          {
            label: "\u65E0\u5E8F\u5217\u8868",
            value: "ul",
            icon: "ul"
          }
        ],
        justify: [
          {
            label: "\u5DE6\u5BF9\u9F50",
            value: "left",
            icon: "align-left"
          },
          {
            label: "\u5C45\u4E2D\u5BF9\u9F50",
            value: "center",
            icon: "align-center"
          },
          {
            label: "\u53F3\u5BF9\u9F50",
            value: "right",
            icon: "align-right"
          },
          {
            label: "\u4E24\u7AEF\u5BF9\u9F50",
            value: "justify",
            icon: "align-justify"
          }
        ],
        quote: !0,
        link: [
          {
            label: "\u63D2\u5165\u94FE\u63A5",
            value: "link"
          }
        ],
        image: [
          {
            label: "\u672C\u5730\u4E0A\u4F20",
            value: "upload"
          },
          {
            label: "\u7F51\u7EDC\u56FE\u7247",
            value: "remote"
          }
        ],
        video: [
          {
            label: "\u672C\u5730\u4E0A\u4F20",
            value: "upload"
          },
          {
            label: "\u7F51\u7EDC\u89C6\u9891",
            value: "remote"
          }
        ],
        table: [
          {
            label: "\u63D2\u5165\u8868\u683C",
            value: "table"
          }
        ],
        code: !0,
        codeView: !1
      },
      defaultTooltips: {
        undo: "\u64A4\u9500",
        redo: "\u6062\u590D",
        removeFormat: "\u6E05\u9664\u683C\u5F0F",
        selectAll: "\u5168\u9009",
        divider: "\u5206\u5272\u7EBF",
        tag: "\u6807\u7B7E",
        bold: "\u52A0\u7C97",
        italic: "\u659C\u4F53",
        underline: "\u4E0B\u5212\u7EBF",
        strikeThrough: "\u5220\u9664\u7EBF",
        subscript: "\u4E0B\u6807",
        superscript: "\u4E0A\u6807",
        fontFamily: "\u5B57\u4F53",
        fontSize: "\u5B57\u53F7",
        foreColor: "\u5B57\u4F53\u989C\u8272",
        backColor: "\u80CC\u666F\u8272",
        list: "\u5217\u8868",
        justify: "\u5BF9\u9F50\u65B9\u5F0F",
        quote: "\u5F15\u7528",
        link: "\u63D2\u5165\u94FE\u63A5",
        image: "\u63D2\u5165\u56FE\u7247",
        video: "\u63D2\u5165\u89C6\u9891",
        table: "\u63D2\u5165\u8868\u683C",
        code: "\u63D2\u5165\u4EE3\u7801",
        codeView: "\u663E\u793A\u6E90\u7801"
      },
      defaultTooltipProps: {
        placement: "bottom",
        timeout: 200,
        color: "#333",
        textColor: "#fff",
        borderColor: "#333",
        offset: "0.1rem",
        zIndex: 100,
        fixed: !1,
        fixedAuto: !1,
        width: null,
        animation: null,
        showTriangle: !0
      },
      defaultUploadImageProps: {
        multiple: !1,
        allowedFileType: [
          "jpg",
          "png",
          "JPG",
          "PNG",
          "JPEG",
          "jpeg",
          "gif",
          "GIF",
          "jfif",
          "JFIF"
        ],
        accept: "image",
        minSize: -1,
        maxSize: -1,
        minLength: -1,
        maxLength: -1
      },
      defaultUploadVideoProps: {
        multiple: !1,
        allowedFileType: ["mp4", "MP4", "avi", "AVI", "WAV", "wav"],
        accept: "video",
        minSize: -1,
        maxSize: -1,
        minLength: -1,
        maxLength: -1
      },
      defaultVideoShowProps: {
        autoplay: !0,
        muted: !0,
        controls: !1,
        loop: !1
      },
      defaultMenuIcons: {
        undo: "undo",
        redo: "redo",
        removeFormat: "clear",
        selectAll: "check-square",
        divider: "divider",
        tag: "font-title",
        bold: "bold",
        italic: "italic",
        underline: "underline",
        strikeThrough: "strikethrough",
        subscript: "subscript",
        superscript: "superscript",
        fontFamily: "font",
        fontSize: "font-size",
        foreColor: "color-picker",
        backColor: "brush",
        link: "link",
        list: "ul",
        justify: "align-justify",
        quote: "quote",
        image: "image",
        table: "table-alt",
        video: "video",
        code: "code",
        codeView: "eye"
      },
      defaultMenuIndex: {
        undo: 0,
        redo: 0,
        removeFormat: 0,
        selectAll: 0,
        divider: 0,
        tag: 0,
        bold: 0,
        italic: 0,
        underline: 0,
        strikeThrough: 0,
        subscript: 0,
        superscript: 0,
        fontFamily: 0,
        fontSize: 0,
        foreColor: 0,
        backColor: 0,
        link: 0,
        list: 0,
        justify: 0,
        quote: 0,
        image: 0,
        table: 0,
        video: 0,
        code: 0,
        codeView: 0
      }
    };
  },
  emits: [
    "update:modelValue",
    "upload-image",
    "upload-video",
    "custom",
    "blur",
    "focus",
    "input",
    "file-paste"
  ],
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    autofocus: {
      type: Boolean,
      default: !1
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
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    showMenus: {
      type: Boolean,
      default: !0
    },
    border: {
      type: Boolean,
      default: !0
    },
    menus: {
      type: Object,
      default: function() {
        return {};
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
      validator(e) {
        return ["hover", "click"].includes(e);
      }
    },
    useBase64: {
      type: Boolean,
      default: !0
    },
    useTooltip: {
      type: Boolean,
      default: !0
    },
    tooltips: {
      type: Object,
      default: function() {
        return {};
      }
    },
    tooltipProps: {
      type: Object,
      default: function() {
        return {};
      }
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
    },
    videoShowProps: {
      type: Object,
      default: function() {
        return {};
      }
    },
    menuIcons: {
      type: Object,
      default: function() {
        return {};
      }
    },
    customActive: {
      type: Function,
      default: function() {
        return !1;
      }
    },
    activeColor: {
      type: String,
      default: "#0b73de",
      validator(e) {
        return l.common.matchingText(e, "hex");
      }
    },
    pasteText: {
      type: Boolean,
      default: !1
    },
    menuIndex: {
      type: Object,
      default: function() {
        return {};
      }
    },
    imageClass: {
      type: String,
      default: null
    },
    videoClass: {
      type: String,
      default: null
    }
  },
  computed: {
    computedMenuIndex() {
      const e = /* @__PURE__ */ new Map();
      for (let s in this.defaultMenuIndex)
        e.set(s, this.defaultMenuIndex[s]);
      const t = Array.from(e).sort((s, r) => s[1] - r[1]);
      return new Map(t.map((s) => [s[0], s[1]]));
    },
    showMenuItem() {
      return (e) => typeof this.computedMenus[e] == "boolean" ? this.computedMenus[e] : Array.isArray(this.computedMenus[e]) ? this.computedMenus[e].length > 0 : !1;
    },
    computedMenus() {
      let e = {};
      return Object.keys(this.defaultMenus).forEach((t) => {
        if (Array.isArray(this.defaultMenus[t])) {
          let s = [];
          this.defaultMenus[t].forEach((r) => {
            if (l.common.isObject(r) && r.label && r.value) {
              let n = {
                label: r.label,
                value: r.value
              };
              l.common.isObject(r.icon) ? n.icon = {
                custom: r.icon.custom,
                value: r.icon.value
              } : typeof r.icon == "string" && r.icon && (n.icon = {
                custom: !1,
                value: r.icon
              }), s.push(n);
            } else
              (typeof r == "string" || l.number.isNumber(r)) && s.push({
                label: r,
                value: r
              });
          }), e[t] = s;
        } else
          typeof this.defaultMenus[t] == "boolean" && (e[t] = this.defaultMenus[t]);
      }), e;
    },
    contentClass() {
      let e = ["mvi-editor-content"];
      return this.autoHeight && e.push("mvi-editor-content-auto"), (this.html == "<p><br></p>" || this.html == "" || this.html == "<br>" || this.html == "<p></p>") && e.push("mvi-editor-content-empty"), e;
    },
    codeViewClass() {
      let e = ["mvi-editor-codeview"];
      return this.autoHeight && e.push("mvi-editor-codeview-auto"), e;
    },
    contentStyle() {
      let e = {};
      return this.autoHeight ? this.height && (e.minHeight = this.height) : this.height && (e.height = this.height), this.border || (e.border = "none"), e;
    },
    codeViewStyle() {
      let e = {};
      return this.autoHeight ? this.height && (e.minHeight = this.height) : this.height && (e.height = this.height), e;
    },
    computedMenuIcons() {
      let e = {};
      return Object.keys(this.defaultMenuIcons).forEach((t) => {
        l.common.isObject(this.defaultMenuIcons[t]) ? e[t] = {
          custom: this.defaultMenuIcons[t].custom,
          value: this.defaultMenuIcons[t].value
        } : e[t] = {
          custom: !1,
          value: this.defaultMenuIcons[t]
        };
      }), e;
    }
  },
  provide() {
    return {
      editor: this
    };
  },
  components: {
    mEditorItem: $a
  },
  mounted() {
    this.init(), this.domListener();
  },
  watch: {
    modelValue(e) {
      this.isModelChange || (this.$refs.content ? this.$refs.content.innerHTML = this.getValue() : this.$refs.codeView && (this.$refs.codeView.innerText = this.getValue()), this.updateHtmlText());
    }
  },
  methods: {
    init() {
      if (this.defaultMenuIndex = this.initOption(
        this.defaultMenuIndex,
        this.menuIndex
      ), this.defaultLayerProps = this.initOption(
        this.defaultLayerProps,
        this.layerProps
      ), this.defaultMenus = this.initOption(this.defaultMenus, this.menus), this.defaultTooltips = this.initOption(
        this.defaultTooltips,
        this.tooltips
      ), this.defaultTooltipProps = this.initOption(
        this.defaultTooltipProps,
        this.tooltipProps
      ), this.defaultUploadImageProps = this.initOption(
        this.defaultUploadImageProps,
        this.uploadImageProps
      ), this.defaultUploadVideoProps = this.initOption(
        this.defaultUploadVideoProps,
        this.uploadVideoProps
      ), this.defaultVideoShowProps = this.initOption(
        this.defaultVideoShowProps,
        this.videoShowProps
      ), this.defaultMenuIcons = this.initOption(
        this.defaultMenuIcons,
        this.menuIcons
      ), document.execCommand("defaultParagraphSeparator", !1, "p"), document.execCommand("styleWithCSS", !1, !0), this.initalHtml = this.getValue(), this.$nextTick(() => {
        this.updateHtmlText();
      }), this.autofocus && this.collapseToEnd(), this.defaultMenus.fontSize.length > 7)
        throw new Error(
          "The maximum length of fontSize cannot exceed 7"
        );
    },
    insertImage(e) {
      if (this.disabled || !this.$refs.content)
        return;
      const t = ["mvi-editor-image"];
      this.imageClass && t.push(this.imageClass);
      const s = `<img src="${e}" class="${t.join(" ")}" />`;
      document.execCommand("insertHtml", !1, s);
    },
    insertVideo(e) {
      if (this.disabled || !this.$refs.content)
        return;
      const t = ["mvi-editor-video"];
      this.videoClass && t.push(this.videoClass);
      let s = l.element.string2dom(
        `<video src="${e}" class="${t.join(" ")}"></video>`
      );
      this.defaultVideoShowProps.muted && s.setAttribute("muted", "muted"), this.defaultVideoShowProps.loop && s.setAttribute("loop", "loop"), this.defaultVideoShowProps.controls && s.setAttribute("controls", "controls"), this.defaultVideoShowProps.autoplay && s.setAttribute("autoplay", "autoplay"), document.execCommand("insertHtml", !1, s.outerHTML);
    },
    empty() {
      this.disabled || (this.$refs.content ? this.$refs.content.innerHTML = "<p><br></p>" : this.$refs.codeView && (this.$refs.codeView.innerText = "<p><br></p>"), this.updateHtmlText(), this.updateValue(), this.collapseToEnd());
    },
    saveRange() {
      if (this.disabled || !this.$refs.content)
        return;
      let e = window.getSelection();
      e.getRangeAt && e.rangeCount && (this.range = e.getRangeAt(0));
    },
    restoreRange() {
      if (this.disabled || !this.$refs.content)
        return;
      let e = window.getSelection();
      e.removeAllRanges(), this.range && e.addRange(this.range);
    },
    collapseToEnd() {
      if (this.disabled)
        return;
      let e = null;
      this.$refs.content ? e = this.$refs.content : this.$refs.codeView && (e = this.$refs.codeView), e.focus();
      let t = window.getSelection();
      t.selectAllChildren(e), t.collapseToEnd();
    },
    getSelectNode() {
      if (this.disabled || !this.range || !this.$refs.content)
        return null;
      let e = this.range.commonAncestorContainer;
      return l.element.isElement(e) ? e : e.parentNode;
    },
    changeActive() {
      if (this.disabled || !this.showMenus || !this.$refs.content)
        return;
      this.saveRange();
      let e = this.getSelectNode();
      this.menuRefs.forEach((t) => {
        if (t)
          switch (t.value) {
            case "bold":
              this.compareCss(
                e,
                "font-weight",
                "bold",
                !1
              ) || this.compareCss(
                e,
                "font-weight",
                "700",
                !1
              ) ? t.menuActive = !0 : t.menuActive = !1;
              break;
            case "italic":
              this.compareCss(
                e,
                "font-style",
                "italic",
                !1
              ) ? t.menuActive = !0 : t.menuActive = !1;
              break;
            case "underline":
              this.compareCss(
                e,
                "text-decoration-line",
                "underline"
              ) ? t.menuActive = !0 : t.menuActive = !1;
              break;
            case "strikeThrough":
              this.compareCss(
                e,
                "text-decoration-line",
                "line-through"
              ) ? t.menuActive = !0 : t.menuActive = !1;
              break;
            case "subscript":
              this.compareCss(e, "vertical-align", "sub") ? t.menuActive = !0 : t.menuActive = !1;
              break;
            case "superscript":
              this.compareCss(e, "vertical-align", "super") ? t.menuActive = !0 : t.menuActive = !1;
              break;
            case "link":
              this.compareTag(e, "a") ? t.menuActive = !0 : t.menuActive = !1;
              break;
            case "quote":
              this.compareTag(e, "blockquote") ? t.menuActive = !0 : t.menuActive = !1;
              break;
            case "table":
              this.compareTag(e, "table") ? t.menuActive = !0 : t.menuActive = !1;
              break;
            case "code":
              this.compareTag(e, "pre") ? t.menuActive = !0 : t.menuActive = !1;
              break;
            case "codeView":
              this.codeViewShow ? t.menuActive = !0 : t.menuActive = !1;
              break;
            default:
              if (ja.includes(t.value)) {
                t.menuActive = !1;
                return;
              }
              t.menuActive = this.customActive(t.value, e) || !1;
          }
      });
    },
    contentFocus() {
      if (!this.disabled) {
        if (this.border && this.activeColor && this.$refs.content) {
          this.$refs.content.style.borderColor = this.activeColor;
          const e = l.color.hex2rgb(this.activeColor);
          this.$refs.content.style.boxShadow = `0 0 0.16rem rgba(${e[0]},${e[1]},${e[2]},0.5)`;
        }
        this.changeActive(), this.$nextTick(() => {
          this.$emit("focus", {
            html: this.html,
            text: this.text
          });
        });
      }
    },
    contentBlur() {
      this.disabled || (this.border && this.activeColor && this.$refs.content && (this.$refs.content.style.borderColor = "", this.$refs.content.style.boxShadow = ""), this.changeActive(), this.$nextTick(() => {
        this.$emit("blur", {
          html: this.html,
          text: this.text
        });
      }));
    },
    contentInput() {
      this.disabled || !this.$refs.content || (this.updateHtmlText(), this.updateValue(), this.changeActive(), this.$nextTick(() => {
        this.$emit("input", {
          html: this.html,
          text: this.text
        });
      }));
    },
    codeViewFocus() {
      this.disabled || this.$emit("focus", {
        html: this.html,
        text: this.text
      });
    },
    codeViewBlur() {
      this.disabled || this.$emit("blur", {
        html: this.html,
        text: this.text
      });
    },
    codeViewInput() {
      this.disabled || !this.$refs.codeView || (this.updateHtmlText(), this.updateValue(), this.$emit("input", {
        html: this.html,
        text: this.text
      }));
    },
    tabDown(e) {
      if (!this.disabled && e.keyCode == 9) {
        e.preventDefault();
        let t = this.getSelectNode();
        this.compareCss(t, "font-family", "Consolas") ? document.execCommand(
          "insertHtml",
          !1,
          "&nbsp;&nbsp;&nbsp;&nbsp;"
        ) : document.execCommand(
          "insertHtml",
          !1,
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        );
      }
    },
    initOption(e, t) {
      let s = {};
      return Object.assign(s, e), Object.assign(s, t), s;
    },
    compareTag(e, t) {
      return !l.element.isElement(e) || !this.$refs.content ? !1 : l.element.isContains(this.$refs.content, e) ? e.tagName.toLocaleUpperCase() == t.toLocaleUpperCase() ? !0 : this.compareTag(e.parentNode, t) : !1;
    },
    compareCss(e, t, s, r = !0) {
      if (!l.element.isElement(e) || !this.$refs.content)
        return !1;
      if (l.element.isContains(this.$refs.content, e)) {
        if (l.element.getCssStyle(e, t) == s)
          return !0;
        if (r)
          return this.compareCss(
            e.parentNode,
            t,
            s,
            r
          );
      }
      return !1;
    },
    compareAttribute(e, t, s) {
      return !l.element.isElement(e) || !this.$refs.content ? !1 : l.element.isContains(this.$refs.content, e) ? e.hasAttribute(t) ? s ? e.getAttribute(t) === s : !0 : this.compareAttribute(
        e.parentNode,
        t,
        s
      ) : !1;
    },
    getCompareTag(e, t) {
      return !l.element.isElement(e) || !this.$refs.content ? null : l.element.isContains(this.$refs.content, e) ? e.tagName.toLocaleUpperCase() == t.toLocaleUpperCase() ? e : this.getCompareTag(e.parentNode, t) : null;
    },
    getCompareTagForCss(e, t, s) {
      return !l.element.isElement(e) || !this.$refs.content ? null : l.element.isContains(this.$refs.content, e) ? l.element.getCssStyle(e, t) == s ? e : this.getCompareTagForCss(
        e.parentNode,
        t,
        s
      ) : null;
    },
    getCompareTagForAttribute(e, t, s) {
      return !l.element.isElement(e) || !this.$refs.content ? null : l.element.isContains(this.$refs.content, e) ? e.hasAttribute(t) ? s ? e.getAttribute(t) === s ? e : null : e : this.getCompareTagForAttribute(
        e.parentNode,
        t,
        s
      ) : null;
    },
    getValue() {
      return this.modelValue == "" || this.modelValue == "<br>" || this.modelValue == "<p></p>" ? "<p><br></p>" : String(this.modelValue);
    },
    updateValue() {
      this.isModelChange = !0, this.$emit("update:modelValue", this.html), this.$nextTick(() => {
        this.isModelChange = !1;
      });
    },
    updateHtmlText() {
      if (this.$refs.content)
        this.html = this.$refs.content.innerHTML, this.text = this.$refs.content.innerText;
      else if (this.$refs.codeView) {
        this.html = this.$refs.codeView.innerText;
        let e = l.element.string2dom(
          `<div>${this.$refs.codeView.innerText}</div>`
        );
        this.text = e.innerText;
      }
    },
    codeViewPaste(e) {
      e.preventDefault();
      let s = (e.originalEvent || e).clipboardData.getData("text/plain") || "";
      s !== "" && document.execCommand("insertText", !1, s);
    },
    contentPaste(e) {
      let t = (e.originalEvent || e).clipboardData, s = t.getData("text/plain") || "";
      if (this.pasteText)
        e.preventDefault(), s !== "" && document.execCommand("insertText", !1, s);
      else if (t.files.length > 0) {
        e.preventDefault();
        for (let r of t.files) {
          const n = this.judgeSuffix(
            r.name,
            this.defaultUploadImageProps.allowedFileType
          ), i = this.judgeSuffix(
            r.name,
            this.defaultUploadVideoProps.allowedFileType
          );
          if (n || i) {
            const f = n ? this.defaultUploadImageProps.minSize : this.defaultUploadVideoProps.minSize, a = n ? this.defaultUploadImageProps.maxSize : this.defaultUploadVideoProps.maxSize;
            if (r.size / 1024 > a && a > 0) {
              typeof this.uploadImageError == "function" ? this.uploadImageError(
                102,
                "\u6587\u4EF6" + r.name + "\u8D85\u51FA\u6587\u4EF6\u6700\u5927\u503C\u9650\u5B9A",
                r
              ) : this.$msgbox({
                message: "\u6587\u4EF6" + r.name + "\u8D85\u51FA\u6587\u4EF6\u6700\u5927\u503C\u9650\u5B9A",
                animation: "scale"
              });
              return;
            }
            if (r.size / 1024 < f && f > 0) {
              typeof this.uploadImageError == "function" ? this.uploadImageError(
                103,
                "\u6587\u4EF6" + r.name + "\u6CA1\u6709\u8FBE\u5230\u6587\u4EF6\u6700\u5C0F\u503C\u9650\u5B9A",
                r
              ) : this.$msgbox({
                message: "\u6587\u4EF6" + r.name + "\u6CA1\u6709\u8FBE\u5230\u6587\u4EF6\u6700\u5C0F\u503C\u9650\u5B9A",
                animation: "scale"
              });
              return;
            }
            this.useBase64 ? l.file.dataFileToBase64(r).then((c) => {
              n ? this.insertImage(c) : i && this.insertVideo(c);
            }) : n ? this.$emit("upload-image", [r]) : i && this.$emit("upload-video", [r]);
          } else
            this.$emit("file-paste", r);
        }
      }
    },
    judgeSuffix(e, t) {
      let s = e.substr(e.lastIndexOf(".") + 1);
      if (t.length == 0)
        return !0;
      s = s.toLocaleLowerCase();
      for (let r = 0; r < t.length; r++)
        t[r] = t[r].toLocaleLowerCase();
      return t.includes(s);
    },
    insertHtml(e) {
      this.disabled || !this.$refs.content || !e || document.execCommand("insertHtml", !1, e);
    },
    insertText(e) {
      this.disabled || !this.$refs.content || !e || document.execCommand("insertText", !1, e);
    },
    domListener() {
      new ot(this.$refs.body, {
        attributes: !1,
        childList: !0,
        subtree: !0,
        childNodesChange: (t, s) => {
          if (t)
            switch (t.style.fontSize) {
              case "x-small":
                t.style.fontSize = this.defaultMenus.fontSize[0].value;
                break;
              case "small":
                t.style.fontSize = this.defaultMenus.fontSize[1].value;
                break;
              case "medium":
                t.style.fontSize = this.defaultMenus.fontSize[2].value;
                break;
              case "large":
                t.style.fontSize = this.defaultMenus.fontSize[3].value;
                break;
              case "x-large":
                t.style.fontSize = this.defaultMenus.fontSize[4].value;
                break;
              case "xx-large":
                t.style.fontSize = this.defaultMenus.fontSize[5].value;
                break;
              case "xxx-large":
                t.style.fontSize = this.defaultMenus.fontSize[6].value;
                break;
            }
        }
      }).init();
    }
  }
}, Fa = { class: "mvi-editor" }, Ra = ["disabled"], Ya = {
  ref: "body",
  class: "mvi-editor-body"
}, Na = ["textContent", "contenteditable"], La = ["contenteditable", "innerHTML", "data-placeholder"];
function Ua(e, t, s, r, n, i) {
  const f = x("m-editor-item");
  return o(), u("div", Fa, [
    s.showMenus ? (o(), u("div", {
      key: 0,
      ref: "menus",
      class: "mvi-editor-menus",
      style: b({ border: s.border ? "" : "none" }),
      disabled: s.disabled || null
    }, [
      (o(!0), u(A, null, O(i.computedMenuIndex, (a, c) => (o(), u(A, null, [
        i.showMenuItem(a[0]) ? (o(), I(f, {
          value: a[0],
          menu: i.computedMenus[a[0]],
          ref_for: !0,
          ref: (d) => n.menuRefs[c] = d,
          key: "mvi-editor-menu-" + c
        }, null, 8, ["value", "menu"])) : g("", !0)
      ], 64))), 256))
    ], 12, Ra)) : g("", !0),
    v("div", Ya, [
      n.codeViewShow ? (o(), u("div", {
        textContent: _(n.initalHtml),
        key: "code",
        contenteditable: !s.disabled || null,
        style: b(i.codeViewStyle),
        class: y(i.codeViewClass),
        ref: "codeView",
        onBlur: t[0] || (t[0] = (...a) => i.codeViewBlur && i.codeViewBlur(...a)),
        onFocus: t[1] || (t[1] = (...a) => i.codeViewFocus && i.codeViewFocus(...a)),
        onInput: t[2] || (t[2] = (...a) => i.codeViewInput && i.codeViewInput(...a)),
        onKeydown: t[3] || (t[3] = (...a) => i.tabDown && i.tabDown(...a)),
        onPaste: t[4] || (t[4] = (...a) => i.codeViewPaste && i.codeViewPaste(...a))
      }, null, 46, Na)) : (o(), u("div", {
        ref: "content",
        onBlur: t[5] || (t[5] = (...a) => i.contentBlur && i.contentBlur(...a)),
        onFocus: t[6] || (t[6] = (...a) => i.contentFocus && i.contentFocus(...a)),
        onClick: t[7] || (t[7] = (...a) => i.changeActive && i.changeActive(...a)),
        onInput: t[8] || (t[8] = (...a) => i.contentInput && i.contentInput(...a)),
        class: y(i.contentClass),
        key: "content",
        onKeydown: t[9] || (t[9] = (...a) => i.tabDown && i.tabDown(...a)),
        contenteditable: !s.disabled || null,
        style: b(i.contentStyle),
        innerHTML: n.initalHtml,
        "data-placeholder": s.placeholder,
        onPaste: t[10] || (t[10] = (...a) => i.contentPaste && i.contentPaste(...a))
      }, null, 46, La))
    ], 512)
  ]);
}
const tt = /* @__PURE__ */ T(Wa, [["render", Ua], ["__scopeId", "data-v-83cd1dd7"]]);
tt.install = (e) => {
  e.component(tt.name, tt);
};
const Xa = {
  name: "m-row",
  props: {
    justify: {
      type: String,
      default: "flex-start",
      validator(e) {
        return [
          "flex-start",
          "flex-end",
          "space-around",
          "space-between"
        ].includes(e);
      }
    },
    align: {
      type: String,
      default: "flex-start",
      validator(e) {
        return ["flex-start", "flex-end", "center"].includes(e);
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
      let e = {};
      return e.justifyContent = this.justify, e.alignItems = this.align, e;
    }
  },
  components: {
    Row: {
      render() {
        return vt(
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
function qa(e, t, s, r, n, i) {
  const f = x("Row", !0);
  return o(), I(f, {
    class: "mvi-row",
    style: b(i.rowStyle)
  }, {
    default: P(() => [
      S(e.$slots, "default", {}, void 0, !0)
    ]),
    _: 3
  }, 8, ["style"]);
}
const it = /* @__PURE__ */ T(Xa, [["render", qa], ["__scopeId", "data-v-678b9a59"]]);
const Ga = {
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
      let e = [];
      return this.span && e.push("mvi-col-" + this.span), this.offset && e.push("mvi-col-offset-" + this.offset), l.common.isObject(this.xs) ? (l.number.isNumber(this.xs.span) && e.push("mvi-col-xs-" + this.xs.span), l.number.isNumber(this.xs.offset) && e.push("mvi-col-offset-xs-" + this.xs.offset)) : l.number.isNumber(this.xs) && e.push("mvi-col-xs-" + this.xs), l.common.isObject(this.sm) ? (l.number.isNumber(this.sm.span) && e.push("mvi-col-sm-" + this.sm.span), l.number.isNumber(this.sm.offset) && e.push("mvi-col-offset-sm-" + this.sm.offset)) : l.number.isNumber(this.sm) && e.push("mvi-col-sm-" + this.sm), l.common.isObject(this.md) ? (l.number.isNumber(this.md.span) && e.push("mvi-col-md-" + this.md.span), l.number.isNumber(this.md.offset) && e.push("mvi-col-offset-md-" + this.md.offset)) : l.number.isNumber(this.md) && e.push("mvi-col-md-" + this.md), l.common.isObject(this.lg) ? (l.number.isNumber(this.lg.span) && e.push("mvi-col-lg-" + this.lg.span), l.number.isNumber(this.lg.offset) && e.push("mvi-col-offset-lg-" + this.lg.offset)) : l.number.isNumber(this.lg) && e.push("mvi-col-lg-" + this.lg), l.common.isObject(this.xl) ? (l.number.isNumber(this.xl.span) && e.push("mvi-col-xl-" + this.xl.span), l.number.isNumber(this.xl.offset) && e.push("mvi-col-offset-xl-" + this.xl.offset)) : l.number.isNumber(this.xl) && e.push("mvi-col-xl-" + this.xl), e;
    }
  },
  components: {
    Col: {
      render() {
        return vt(
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
function Za(e, t, s, r, n, i) {
  const f = x("Col", !0);
  return o(), I(f, {
    class: y(i.colStyle)
  }, {
    default: P(() => [
      S(e.$slots, "default", {}, void 0, !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const Dt = /* @__PURE__ */ T(Ga, [["render", Za], ["__scopeId", "data-v-91957cfb"]]);
it.install = (e) => {
  e.component(it.name, it), e.component(Dt.name, Dt);
};
const Ka = {
  name: "m-form",
  props: {
    width: {
      type: String,
      default: null
    },
    block: {
      type: Boolean,
      default: !1
    },
    labelBlock: {
      type: Boolean,
      default: !1
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
      let e = {};
      return this.block && this.width && (e.width = this.width), e;
    }
  },
  provide() {
    return {
      form: this
    };
  }
};
function Ja(e, t, s, r, n, i) {
  return o(), u("div", {
    class: y(["mvi-form", s.block ? "mvi-form-block" : ""]),
    style: b(i.formStyle)
  }, [
    S(e.$slots, "default", {}, void 0, !0)
  ], 6);
}
const st = /* @__PURE__ */ T(Ka, [["render", Ja], ["__scopeId", "data-v-3b3e4eea"]]);
const Qa = {
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
      let e = ["mvi-form-label"];
      return this.form.labelClass && e.push(this.form.labelClass), this.labelClass && e.push(this.labelClass), this.form.labelBlock && this.form.block && e.push("mvi-form-label-block"), e;
    },
    labelStyle() {
      let e = {};
      return this.form.labelWidth && !this.form.labelBlock && (e.width = this.form.labelWidth), this.labelWidth && !this.form.labelBlock && (e.width = this.labelWidth), this.form.labelOffset && (this.form.labelBlock ? e.marginBottom = this.form.labelOffset : e.marginRight = this.form.labelOffset), this.labelOffset && (this.form.labelBlock ? e.marginBottom = this.labelOffset : e.marginRight = this.labelOffset), e;
    },
    formElStyle() {
      let e = {};
      return this.width && !this.form.block && (e.width = this.width), this.form.align && (e.alignItems = this.form.align), this.align && (e.alignItems = this.align), e;
    }
  }
}, eh = ["textContent"], th = {
  key: 1,
  class: "mvi-form-container"
};
function ih(e, t, s, r, n, i) {
  return o(), u("div", {
    class: y(["mvi-form-el", i.form.block ? "mvi-form-el-block" : ""]),
    style: b(i.formElStyle)
  }, [
    s.label ? (o(), u("div", {
      key: 0,
      class: y(i.labelCls),
      textContent: _(s.label),
      style: b(i.labelStyle)
    }, null, 14, eh)) : g("", !0),
    e.$slots.default ? (o(), u("div", th, [
      S(e.$slots, "default", {}, void 0, !0)
    ])) : g("", !0)
  ], 6);
}
const Pt = /* @__PURE__ */ T(Qa, [["render", ih], ["__scopeId", "data-v-609b24ff"]]);
st.install = (e) => {
  e.component(st.name, st), e.component(Pt.name, Pt);
};
l.event.on(window, "touchstart.ios", (e) => {
});
const sh = {
  Anchor: pt,
  Resize: k,
  Drag: ie,
  Prop: lt,
  Scroll: rt,
  Spy: nt,
  Observe: ot,
  Upload: q,
  Px: gt,
  Button: ae,
  Icon: M,
  Cell: he,
  Navbar: Ce,
  Tabbar: xe,
  Image: de,
  Overlay: Q,
  Popup: se,
  Checkbox: le,
  Radio: Ie,
  DatePicker: Se,
  DateNativePicker: fe,
  Input: _e,
  Modal: re,
  Dialog: W,
  Toast: R,
  Loading: te,
  Msgbox: Te,
  NumberKeyboard: ke,
  Search: De,
  Progress: Pe,
  Slider: ze,
  Stepper: Ae,
  Switch: Ee,
  Actionsheet: Me,
  Dropdown: Be,
  Notify: Y,
  PullRefresh: Oe,
  SwipeCell: He,
  CircleProgress: Ve,
  Collapse: $e,
  Divider: je,
  Roll: We,
  Panel: Fe,
  Steps: Re,
  Label: Ye,
  Swiper: me,
  Tabs: pe,
  Badge: ue,
  Table: Ne,
  Calendar: ge,
  Tooltip: be,
  Triangle: ye,
  ColorPicker: Le,
  ImagePreview: Ue,
  Page: Xe,
  LoadingBar: N,
  Picker: ce,
  Layer: ee,
  Select: Ke,
  Autocomplete: Je,
  DateChooser: Qe,
  Editor: tt,
  Field: et,
  Grid: it,
  TransitionSlide: ne,
  Form: st,
  List: qe,
  Skeleton: Ge,
  Sign: Ze
}, rh = (e) => {
  e.config.globalProperties.$dap = l, e.provide("$dap", l), Object.values(sh).map((t) => {
    t.install(e);
  });
};
export {
  Me as Actionsheet,
  pt as Anchor,
  Je as Autocomplete,
  ue as Badge,
  ae as Button,
  ge as Calendar,
  he as Cell,
  le as Checkbox,
  Ve as CircleProgress,
  $e as Collapse,
  Le as ColorPicker,
  l as Dap,
  Qe as DateChooser,
  fe as DateNativePicker,
  Se as DatePicker,
  W as Dialog,
  je as Divider,
  ie as Drag,
  Be as Dropdown,
  tt as Editor,
  et as Field,
  st as Form,
  it as Grid,
  M as Icon,
  de as Image,
  Ue as ImagePreview,
  _e as Input,
  Ye as Label,
  ee as Layer,
  qe as List,
  te as Loading,
  N as LoadingBar,
  re as Modal,
  Te as Msgbox,
  Ce as Navbar,
  Y as Notify,
  ke as NumberKeyboard,
  ot as Observe,
  Q as Overlay,
  Xe as Page,
  Fe as Panel,
  ce as Picker,
  se as Popup,
  Pe as Progress,
  lt as Prop,
  Oe as PullRefresh,
  gt as Px,
  Ie as Radio,
  k as Resize,
  We as Roll,
  rt as Scroll,
  De as Search,
  Ke as Select,
  Ze as Sign,
  Ge as Skeleton,
  ze as Slider,
  nt as Spy,
  Ae as Stepper,
  Re as Steps,
  He as SwipeCell,
  me as Swiper,
  Ee as Switch,
  xe as Tabbar,
  Ne as Table,
  pe as Tabs,
  R as Toast,
  be as Tooltip,
  ne as TransitionSlide,
  ye as Triangle,
  q as Upload,
  rh as default
};
