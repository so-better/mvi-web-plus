var __defProp = Object.defineProperty;
var __defNormalProp = (obj2, key, value) => key in obj2 ? __defProp(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __publicField = (obj2, key, value) => {
  __defNormalProp(obj2, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { openBlock, createElementBlock, normalizeClass, normalizeStyle, h, resolveComponent, createBlock, withCtx, renderSlot, Fragment, createVNode, toDisplayString, createCommentVNode, createElementVNode, renderList, Teleport, Transition, withDirectives, mergeProps, withModifiers, vShow, getCurrentInstance, vModelText, vModelDynamic, createSlots, withKeys, createTextVNode, createApp, pushScopeId, popScopeId } from "vue";
const mviDefault = "";
const mviSupport = "";
const number$1 = {
  formatNumber(num) {
    if (this.isNumber(num)) {
      return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    } else {
      return num;
    }
  },
  isNumber(num) {
    if (typeof num == "number" && !isNaN(num)) {
      return true;
    } else {
      return false;
    }
  },
  add(...values) {
    return values.reduce((num, value) => {
      let r1 = 0;
      let r2 = 0;
      let m = 0;
      try {
        r1 = num.toString().split(".")[1].length;
      } catch (e) {
      }
      try {
        r2 = value.toString().split(".")[1].length;
      } catch (e) {
      }
      m = Math.pow(10, Math.max(r1, r2));
      return (num * m + value * m) / m;
    });
  },
  subtract(...values) {
    return values.reduce((num, value) => {
      let r1 = 0;
      let r2 = 0;
      let m = 0;
      try {
        r1 = num.toString().split(".")[1].length;
      } catch (e) {
      }
      try {
        r2 = value.toString().split(".")[1].length;
      } catch (e) {
      }
      m = Math.pow(10, Math.max(r1, r2));
      return (num * m - value * m) / m;
    });
  },
  mutiply(...values) {
    return values.reduce((num, value) => {
      let m = 0;
      let s1 = num.toString();
      let s2 = value.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {
      }
      try {
        m += s2.split(".")[1].length;
      } catch (e) {
      }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    });
  },
  divide(...values) {
    return values.reduce((num, value) => {
      let t1 = 0;
      let t2 = 0;
      let s1 = num.toString();
      let s2 = value.toString();
      try {
        t1 = s1.split(".")[1].length;
      } catch (e) {
      }
      try {
        t2 = s2.split(".")[1].length;
      } catch (e) {
      }
      s1 = Number(s1.replace(".", ""));
      s2 = Number(s2.replace(".", ""));
      return s1 / s2 * Math.pow(10, t2 - t1);
    });
  }
};
const string$1 = {
  insert(original, str, index) {
    if (!original || typeof original != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (typeof str != "string") {
      throw new TypeError("The second argument must be a string");
    }
    if (!number$1.isNumber(index)) {
      throw new TypeError("The third argument must be a number");
    }
    if (index < 0) {
      throw new Error("The third argument cannot be less than 0");
    }
    return original.substring(0, index) + str + original.substring(index, original.length);
  },
  delete(original, index, num) {
    if (!original || typeof original != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!number$1.isNumber(index)) {
      throw new TypeError("The second argument must be a number");
    }
    if (index < 0) {
      throw new Error("The second argument cannot be less than 0");
    }
    if (!number$1.isNumber(num)) {
      throw new TypeError("The third argument must be a number");
    }
    if (num < 0) {
      throw new Error("The third argument cannot be less than 0");
    }
    return original.substring(0, index) + original.substring(index + num, original.length);
  },
  replace(original, start, end, str) {
    if (!original || typeof original != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!number$1.isNumber(start)) {
      throw new TypeError("The second argument must be a number");
    }
    if (start < 0) {
      throw new Error("The second argument cannot be less than 0");
    }
    if (!number$1.isNumber(end)) {
      throw new TypeError("The third argument must be a number");
    }
    if (end < 0) {
      throw new Error("The third argument cannot be less than 0");
    }
    if (typeof str != "string") {
      throw new TypeError("The fourth argument must be a string");
    }
    return original.substring(0, start) + str + original.substring(end, original.length);
  },
  trim(str, global) {
    if (typeof str != "string") {
      throw new TypeError("The first argument must be a string");
    }
    let result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (global) {
      result = result.replace(/\s/g, "");
    }
    return result;
  }
};
const element$1 = {
  isWindow(data2) {
    return data2 && data2 instanceof Window;
  },
  getElementPoint(el, root) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!this.isElement(root)) {
      root = document.body;
    }
    if (!this.isContains(root, el)) {
      throw new Error("The second argument and the first argument have no hierarchical relationship");
    }
    let obj2 = el;
    let offsetTop = 0;
    let offsetLeft = 0;
    while (this.isElement(el) && this.isContains(root, el) && root !== el) {
      offsetTop += el.offsetTop;
      offsetLeft += el.offsetLeft;
      el = el.offsetParent;
    }
    let offsetRight = root.offsetWidth - offsetLeft - obj2.offsetWidth;
    let offsetBottom = root.offsetHeight - offsetTop - obj2.offsetHeight;
    return {
      top: offsetTop,
      left: offsetLeft,
      right: offsetRight,
      bottom: offsetBottom
    };
  },
  isContains(parentNode, childNode) {
    if (!this.isElement(parentNode)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!this.isElement(childNode, true)) {
      throw new TypeError("The second argument must be an element");
    }
    if (parentNode === childNode) {
      return true;
    }
    if (parentNode.contains) {
      return parentNode.contains(childNode);
    }
    if (parentNode.compareDocumentPosition) {
      return !!(parentNode.compareDocumentPosition(childNode) & 16);
    }
  },
  isParentNode(parentNode, childNode) {
    if (!this.isElement(parentNode)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!this.isElement(childNode, true)) {
      throw new TypeError("The second argument must be an element");
    }
    if (parentNode === childNode) {
      return false;
    }
    return childNode.parentNode === parentNode;
  },
  children(el, selector) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (selector && typeof selector != "string") {
      throw new TypeError("The second argument must be a string");
    }
    const res = el.querySelectorAll(selector || "*");
    return [...res].filter((ele) => {
      return ele.parentNode === el;
    });
  },
  siblings(el, selector) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (selector && typeof selector != "string") {
      throw new TypeError("The second argument must be a string");
    }
    if (!el.parentNode) {
      return [];
    }
    const res = el.parentNode.querySelectorAll(selector || "*");
    return [...res].filter((ele) => {
      return ele.parentNode === el.parentNode && ele != el;
    });
  },
  rem2px(num) {
    if (!number$1.isNumber(num)) {
      throw new TypeError("The argument must be a number");
    }
    let fs = this.getCssStyle(document.documentElement, "font-size");
    return number$1.mutiply(num, parseFloat(fs));
  },
  px2rem(num) {
    if (!number$1.isNumber(num)) {
      throw new TypeError("The argument must be a number");
    }
    let fs = this.getCssStyle(document.documentElement, "font-size");
    return number$1.divide(num, parseFloat(fs));
  },
  width(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    if (!this.isElement(el)) {
      el = document.body;
    }
    let clientWidth = el.clientWidth;
    let paddingLeft_width = parseFloat(this.getCssStyle(el, "padding-left"));
    let paddingRight_width = parseFloat(this.getCssStyle(el, "padding-right"));
    return number$1.subtract(clientWidth, paddingLeft_width, paddingRight_width);
  },
  height(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    if (!this.isElement(el)) {
      el = document.body;
    }
    let clientHeight = el.clientHeight;
    let paddingTop_height = parseFloat(this.getCssStyle(el, "padding-top"));
    let paddingBottom_height = parseFloat(this.getCssStyle(el, "padding-bottom"));
    return number$1.subtract(clientHeight, paddingTop_height, paddingBottom_height);
  },
  removeClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string$1.trim(className).split(/\s+/);
    classArray.forEach((item, index) => {
      classList.remove(item);
    });
  },
  addClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string$1.trim(className).split(/\s+/);
    classArray.forEach((item, index) => {
      classList.add(item);
    });
  },
  hasClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string$1.trim(className).split(/\s+/);
    return classArray.every((item, index) => {
      return classList.contains(item);
    });
  },
  scrollTopBottomTrigger(el, callback) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollEle = window;
    if (this.isElement(el) && el != document.body && el != document.documentElement) {
      scrollEle = el;
    }
    if (typeof el == "function") {
      callback = el;
    }
    let flag = true;
    scrollEle.addEventListener("scroll", (e) => {
      if (this.getScrollTop(scrollEle) <= 0) {
        let options = {
          state: "top",
          target: scrollEle
        };
        if (!flag) {
          return;
        }
        if (typeof callback == "function") {
          flag = false;
          callback(options);
        }
      } else {
        let options = {
          state: "bottom",
          target: scrollEle
        };
        let height = 0;
        if (scrollEle == window) {
          height = window.innerHeight;
        } else {
          height = scrollEle.clientHeight;
        }
        if (number$1.add(this.getScrollTop(scrollEle), height) + 1 >= this.getScrollHeight(scrollEle) && height != this.getScrollHeight(scrollEle)) {
          if (!flag) {
            return;
          }
          if (typeof callback == "function") {
            flag = false;
            callback(options);
          }
        } else {
          flag = true;
        }
      }
    });
  },
  getScrollWidth(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollWidth = 0;
    if (this.isElement(el) && el != document.documentElement && el != document.body) {
      scrollWidth = el.scrollWidth;
    } else {
      if (document.documentElement.scrollWidth == 0 || document.body.scrollWidth == 0) {
        scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
      } else {
        scrollWidth = document.documentElement.scrollWidth > document.body.scrollWidth ? document.documentElement.scrollWidth : document.body.scrollWidth;
      }
    }
    return scrollWidth;
  },
  getScrollHeight(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollHeight = 0;
    if (this.isElement(el) && el != document.documentElement && el != document.body) {
      scrollHeight = el.scrollHeight;
    } else {
      if (document.documentElement.scrollHeight == 0 || document.body.scrollHeight == 0) {
        scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      } else {
        scrollHeight = document.documentElement.scrollHeight > document.body.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight;
      }
    }
    return scrollHeight;
  },
  setScrollTop(options) {
    let isWindow = false;
    let el = options.el;
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let number$1$1 = options.number || 0;
    let time = options.time || 0;
    if (!this.isElement(el) || el == document.body || el == document.documentElement || el == window) {
      isWindow = true;
    }
    return new Promise((resolve, reject) => {
      if (time <= 0) {
        if (isWindow) {
          document.documentElement.scrollTop = document.body.scrollTop = number$1$1;
        } else {
          el.scrollTop = number$1$1;
        }
        resolve();
      } else {
        let spacingTime = 10;
        let spacingIndex = number$1.divide(time, spacingTime);
        let nowTop = this.getScrollTop(el);
        let everTop = number$1.divide(number$1.subtract(number$1$1, nowTop), spacingIndex);
        let scrollTimer = setInterval(() => {
          if (spacingIndex > 0) {
            spacingIndex--;
            if (isWindow) {
              document.documentElement.scrollTop = document.body.scrollTop = nowTop = number$1.add(nowTop, everTop);
            } else {
              el.scrollTop = nowTop = number$1.add(nowTop, everTop);
            }
          } else {
            clearInterval(scrollTimer);
            resolve();
          }
        }, spacingTime);
      }
    });
  },
  getScrollTop(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollTop = 0;
    if (this.isElement(el) && el != document.body && el != document.documentElement && el != window) {
      scrollTop = el.scrollTop;
    } else {
      if (document.documentElement.scrollTop == 0 || document.body.scrollTop == 0) {
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      } else {
        scrollTop = document.documentElement.scrollTop > document.body.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
      }
    }
    return scrollTop;
  },
  getScrollLeft(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollLeft = 0;
    if (this.isElement(el) && el != document.body && el != document.documentElement && el != window) {
      scrollLeft = el.scrollLeft;
    } else {
      if (document.documentElement.scrollLeft == 0 || document.body.scrollLeft == 0) {
        scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      } else {
        scrollLeft = document.documentElement.scrollLeft > document.body.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
      }
    }
    return scrollLeft;
  },
  setScrollLeft(options) {
    let isWindow = false;
    let el = options.el;
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let number$1$1 = options.number || 0;
    let time = options.time || 0;
    if (!this.isElement(el) || el == document.body || el == document.documentElement || el == window) {
      isWindow = true;
    }
    return new Promise((resolve, reject) => {
      if (time <= 0) {
        if (isWindow) {
          document.documentElement.scrollLeft = document.body.scrollLeft = number$1$1;
        } else {
          el.scrollLeft = number$1$1;
        }
        resolve();
      } else {
        let spacingTime = 10;
        let spacingIndex = number$1.divide(time, spacingTime);
        let nowLeft = this.getScrollLeft(el);
        let everLeft = number$1.divide(number$1.subtract(number$1$1, nowLeft), spacingIndex);
        let scrollTimer = setInterval(() => {
          if (spacingIndex > 0) {
            spacingIndex--;
            if (isWindow) {
              document.documentElement.scrollLeft = document.body.scrollLeft = nowLeft = number$1.add(nowLeft, everLeft);
            } else {
              el.scrollLeft = nowLeft = number$1.add(nowLeft, everLeft);
            }
          } else {
            clearInterval(scrollTimer);
            resolve();
          }
        }, spacingTime);
      }
    });
  },
  getCssStyle(el, cssName) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!cssName || typeof cssName != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let cssText = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
      cssText = document.defaultView.getComputedStyle(el)[cssName];
    } else {
      cssText = el.currentStyle[cssName];
    }
    return cssText;
  },
  getCssSelector(selector) {
    if (!selector || typeof selector != "string") {
      throw new TypeError("The argument must be a selector string");
    }
    if (/^#{1}/.test(selector)) {
      return {
        type: "id",
        value: selector.substr(1)
      };
    }
    if (/^\./.test(selector)) {
      return {
        type: "class",
        value: selector.substr(1)
      };
    }
    if (/^\[(.+)\]$/.test(selector)) {
      let type = "attribute";
      let value = "";
      let attribute = string$1.trim(selector, true).substring(1, string$1.trim(selector, true).length - 1);
      let arry = attribute.split("=");
      if (arry.length == 1) {
        value = arry[0];
      }
      if (arry.length == 2) {
        value = {
          attributeName: arry[0],
          attributeValue: arry[1].replace(/\'/g, "").replace(/\"/g, "")
        };
      }
      return {
        type,
        value
      };
    }
    return {
      type: "tag",
      value: selector
    };
  },
  getElementBounding(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    if (!this.isElement(el)) {
      el = document.body;
    }
    let point = el.getBoundingClientRect();
    let top = point.top;
    let bottom = number$1.subtract(document.documentElement.clientHeight || window.innerHeight, point.bottom);
    let left = point.left;
    let right = number$1.subtract(document.documentElement.clientWidth || window.innerWidth, point.right);
    return {
      top,
      bottom,
      left,
      right
    };
  },
  isElement(el) {
    return el && el instanceof Node && el.nodeType === 1;
  },
  string2dom(str, parentTag = "div") {
    if (!str || typeof str != "string") {
      throw new TypeError("The argument must be an HTML string");
    }
    let parentEle = document.createElement(parentTag);
    parentEle.innerHTML = str;
    if (parentEle.children.length == 1) {
      return parentEle.children[0];
    } else {
      return parentEle.children;
    }
  }
};
const dataName$1 = "_dap-datas";
const data$1 = {
  remove(el, key) {
    if (!(el instanceof Document) && !element$1.isElement(el) && !element$1.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let data2 = el[dataName$1] || {};
    if (key === void 0 || key === null || key === "") {
      el[dataName$1] = {};
    } else {
      delete data2[key];
      el[dataName$1] = data2;
    }
  },
  has(el, key) {
    if (!(el instanceof Document) && !element$1.isElement(el) && !element$1.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    if (key === void 0 || key === null || key === "") {
      throw new TypeError("The second parameter must be a unique key");
    }
    let data2 = el[dataName$1] || {};
    return data2.hasOwnProperty(key);
  },
  get(el, key) {
    if (!(el instanceof Document) && !element$1.isElement(el) && !element$1.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let data2 = el[dataName$1] || {};
    if (key === void 0 || key === null || key === "") {
      return data2;
    } else {
      return data2[key];
    }
  },
  set(el, key, value) {
    if (!(el instanceof Document) && !element$1.isElement(el) && !element$1.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    if (key === void 0 || key === null || key === "") {
      throw new TypeError("The second parameter must be a unique key");
    }
    let data2 = el[dataName$1] || {};
    data2[key] = value;
    el[dataName$1] = data2;
  }
};
const common$1 = {
  matchingText(text, params) {
    if (!text || typeof text != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!params || typeof params != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let reg = null;
    if (params == "Chinese") {
      reg = /^[\u4e00-\u9fa5]+$/;
    }
    if (params == "chinese") {
      reg = /[\u4e00-\u9fa5]/;
    }
    if (params == "email") {
      reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    }
    if (params == "userName") {
      reg = /^[a-zA-Z0-9_]{4,16}$/;
    }
    if (params == "int+") {
      reg = /^\d+$/;
    }
    if (params == "int-") {
      reg = /^-\d+$/;
    }
    if (params == "int") {
      reg = /^-?\d+$/;
    }
    if (params == "pos") {
      reg = /^\d*\.?\d+$/;
    }
    if (params == "neg") {
      reg = /^-\d*\.?\d+$/;
    }
    if (params == "number") {
      reg = /^-?\d*\.?\d+$/;
    }
    if (params == "phone") {
      reg = /^1[0-9]\d{9}$/;
    }
    if (params == "idCard") {
      reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    }
    if (params == "url") {
      reg = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    }
    if (params == "IPv4") {
      reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    }
    if (params == "hex") {
      reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    }
    if (params == "date") {
      let reg1 = /^((\d{4})(-)(\d{2})(-)(\d{2}))$/;
      let reg2 = /^(\d{4})(\/)(\d{2})(\/)(\d{2})$/;
      let reg3 = /^(\d{4})(\.)(\d{2})(\.)(\d{2})$/;
      let reg4 = /^(\d{4})(年)(\d{2})(月)(\d{2})(日)$/;
      return reg1.test(text) || reg2.test(text) || reg3.test(text) || reg4.test(text);
    }
    if (params == "time") {
      reg = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    }
    if (params == "QQ") {
      reg = /^[1-9][0-9]{4,10}$/;
    }
    if (params == "weixin") {
      reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    }
    if (params == "plate") {
      reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    }
    if (!reg) {
      throw new Error("The second parameter is out of scope");
    }
    return reg.test(text);
  },
  getUrlParams(name) {
    if (!name || typeof name != "string") {
      throw new TypeError("The argument must be a string");
    }
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let search = window.location.search.substr(1);
    if (!search) {
      let arr = window.location.hash.split("?");
      if (arr.length == 2) {
        search = arr[1];
      }
    }
    let r = search.match(reg);
    if (r) {
      return decodeURIComponent(r[2]);
    }
    return null;
  },
  isEmptyObject(obj2) {
    if (this.isObject(obj2)) {
      if (Object.keys(obj2).length == 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  equal(a, b) {
    if (typeof a !== typeof b) {
      return false;
    }
    if (this.isObject(a) && this.isObject(b)) {
      a = Object.assign({}, a);
      b = Object.assign({}, b);
      let aProps = Object.getOwnPropertyNames(a);
      let bProps = Object.getOwnPropertyNames(b);
      if (aProps.length != bProps.length) {
        return false;
      }
      let length = aProps.length;
      for (let i = 0; i < length; i++) {
        let propName = aProps[i];
        let propA = a[propName];
        let propB = b[propName];
        if (this.isObject(propA)) {
          if (this.equal(propA, propB)) {
            return true;
          } else {
            return false;
          }
        } else if (propA !== propB) {
          return false;
        }
      }
      return true;
    } else {
      return a === b;
    }
  },
  isObject(val) {
    if (typeof val === "object" && val) {
      return true;
    }
    return false;
  },
  copyText(text) {
    if (!text || typeof text != "string") {
      throw new TypeError("No text to copy is defined");
    }
    let el = element$1.string2dom('<input type="text" />');
    document.body.appendChild(el);
    el.value = text;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
};
const parseEventName$1 = (eventName) => {
  let eventNames = eventName.split(/[\s]+/g);
  let result = [];
  eventNames.forEach((name) => {
    let arr = name.split(".");
    let obj2 = {
      eventName: arr[0]
    };
    if (arr.length > 1) {
      obj2.guid = arr[1];
    }
    result.push(obj2);
  });
  return result;
};
const updateEvents$1 = (events) => {
  let obj2 = {};
  let keys = Object.keys(events);
  keys.forEach((key) => {
    if (events[key]) {
      obj2[key] = events[key];
    }
  });
  return obj2;
};
const bindSingleListener$1 = (el, eventName, guid, fn, options) => {
  let events = data$1.get(el, "dap-defined-events") || {};
  if (!guid) {
    guid = data$1.get(el, "dap-event-guid") || 0;
    data$1.set(el, "dap-event-guid", guid + 1);
  }
  guid = eventName + "." + guid;
  if (events[guid] && events[guid].type == eventName) {
    el.removeEventListener(eventName, events[guid].fn, events[guid].options);
  }
  el.addEventListener(eventName, fn, options);
  events[guid] = {
    type: eventName,
    fn,
    options
  };
  data$1.set(el, "dap-defined-events", events);
};
const unbindSingleListener$1 = (el, eventName, guid) => {
  let events = data$1.get(el, "dap-defined-events") || {};
  let keys = Object.keys(events);
  let length = keys.length;
  for (let i = 0; i < length; i++) {
    let key = keys[i];
    if (events[key].type == eventName) {
      if (guid) {
        if (key == eventName + "." + guid) {
          el.removeEventListener(events[key].type, events[key].fn, events[key].options);
          events[key] = void 0;
        }
      } else {
        el.removeEventListener(events[key].type, events[key].fn, events[key].options);
        events[key] = void 0;
      }
    }
  }
  events = updateEvents$1(events);
  data$1.set(el, "dap-defined-events", events);
};
const event$2 = {
  on(el, eventName, fn, options) {
    if (!(el instanceof Document) && !element$1.isElement(el) && !element$1.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    if (!eventName || typeof eventName != "string") {
      throw new TypeError("The second argument must be a string");
    }
    if (!fn || typeof fn != "function") {
      throw new TypeError("The third argument must be a function");
    }
    if (!common$1.isObject(options)) {
      options = {};
    }
    const result = parseEventName$1(eventName);
    result.forEach((res) => {
      bindSingleListener$1(el, res.eventName, res.guid, fn.bind(el), options);
    });
  },
  off(el, eventName) {
    if (!(el instanceof Document) && !element$1.isElement(el) && !element$1.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let events = data$1.get(el, "dap-defined-events");
    if (!events) {
      return;
    }
    if (!eventName) {
      let keys = Object.keys(events);
      let length = keys.length;
      for (let i = 0; i < length; i++) {
        let key = keys[i];
        el.removeEventListener(events[key].type, events[key].fn, events[key].options);
      }
      data$1.remove(el, "dap-defined-events");
      data$1.remove(el, "dap-event-guid");
      return;
    }
    const result = parseEventName$1(eventName);
    result.forEach((res) => {
      unbindSingleListener$1(el, res.eventName, res.guid);
    });
  },
  get(el) {
    if (!(el instanceof Document) && !element$1.isElement(el) && !element$1.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let events = data$1.get(el, "dap-defined-events");
    if (!events) {
      return;
    }
    return events;
  }
};
const date$1 = {
  getPrevMonths(date2, num) {
    if (!date2 || !(date2 instanceof Date)) {
      date2 = /* @__PURE__ */ new Date();
    }
    if (!number$1.isNumber(num)) {
      num = 1;
    }
    let dateArray = [date2];
    for (let i = 0; i < num - 1; i++) {
      let y = date2.getFullYear();
      let m = date2.getMonth();
      if (m == 0) {
        m = 12;
        y--;
      }
      let d = /* @__PURE__ */ new Date();
      d.setMonth(m - 1);
      d.setFullYear(y);
      dateArray.push(d);
      date2 = d;
    }
    return dateArray;
  },
  getNextMonths(date2, num) {
    if (!date2 || !(date2 instanceof Date)) {
      date2 = /* @__PURE__ */ new Date();
    }
    if (!number$1.isNumber(num)) {
      num = 1;
    }
    let dateArray = [date2];
    for (let i = 0; i < num - 1; i++) {
      let y = date2.getFullYear();
      let m = date2.getMonth();
      if (m == 11) {
        m = -1;
        y++;
      }
      let d = /* @__PURE__ */ new Date();
      d.setMonth(m + 1);
      d.setFullYear(y);
      dateArray.push(d);
      date2 = d;
    }
    return dateArray;
  },
  getDateAfter(date2, num) {
    if (!date2 || !(date2 instanceof Date)) {
      date2 = /* @__PURE__ */ new Date();
    }
    if (!number$1.isNumber(num)) {
      num = 1;
    }
    return new Date(date2.getTime() + num * 24 * 60 * 60 * 1e3);
  },
  getDateBefore(date2, num) {
    if (!date2 || !(date2 instanceof Date)) {
      date2 = /* @__PURE__ */ new Date();
    }
    if (!number$1.isNumber(num)) {
      num = 1;
    }
    return new Date(date2.getTime() - num * 24 * 60 * 60 * 1e3);
  },
  getDays(year, month) {
    if (!number$1.isNumber(year)) {
      throw new TypeError("The first parameter must be a number representing the year");
    }
    if (!number$1.isNumber(month)) {
      throw new TypeError("The second argument must be a number representing the month");
    }
    year = parseInt(year);
    month = parseInt(month);
    let d = new Date(year, month, 0);
    return d.getDate();
  }
};
const color$1 = {
  rgb2hsv(rgb) {
    if (!Array.isArray(rgb) || rgb.length != 3) {
      throw new TypeError("Invalid argument");
    }
    let h2 = 0;
    let s = 0;
    let v = 0;
    let r = rgb[0] >= 255 ? 255 : rgb[0];
    let g = rgb[1] >= 255 ? 255 : rgb[1];
    let b = rgb[2] >= 255 ? 255 : rgb[2];
    r = r <= 0 ? 0 : r;
    g = g <= 0 ? 0 : g;
    b = b <= 0 ? 0 : b;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    v = max / 255;
    if (max === 0) {
      s = 0;
    } else {
      s = 1 - min / max;
    }
    if (max === min) {
      h2 = 0;
    } else if (max === r && g >= b) {
      h2 = 60 * ((g - b) / (max - min)) + 0;
    } else if (max === r && g < b) {
      h2 = 60 * ((g - b) / (max - min)) + 360;
    } else if (max === g) {
      h2 = 60 * ((b - r) / (max - min)) + 120;
    } else if (max === b) {
      h2 = 60 * ((r - g) / (max - min)) + 240;
    }
    h2 = parseInt(h2);
    s = parseInt(s * 100);
    v = parseInt(v * 100);
    return [h2, s, v];
  },
  hsv2rgb(hsv) {
    if (!Array.isArray(hsv) || hsv.length != 3) {
      throw new TypeError("Invalid argument");
    }
    let h2 = hsv[0] >= 360 || hsv[0] <= 0 ? 0 : hsv[0];
    let s = hsv[1] >= 100 ? 100 : hsv[1];
    s = s <= 0 ? 0 : s;
    let v = hsv[2] >= 100 ? 100 : hsv[2];
    v = v <= 0 ? 0 : v;
    s = s / 100;
    v = v / 100;
    let r = 0;
    let g = 0;
    let b = 0;
    let i = parseInt(h2 / 60 % 6);
    let f = h2 / 60 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
    r = parseInt(r * 255);
    g = parseInt(g * 255);
    b = parseInt(b * 255);
    return [r, g, b];
  },
  rgb2hex(rgb) {
    if (!Array.isArray(rgb) || rgb.length != 3) {
      throw new TypeError("Invalid argument");
    }
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
  },
  hex2rgb(hex) {
    if (!hex || typeof hex != "string") {
      throw new TypeError("The argument must be a string");
    }
    let color2 = hex.toLowerCase();
    if (!common$1.matchingText(color2, "hex")) {
      throw new TypeError("The argument must be a hexadecimal color value");
    }
    if (color2.length === 4) {
      let colorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        colorNew += color2.slice(i, i + 1).concat(color2.slice(i, i + 1));
      }
      color2 = colorNew;
    }
    let colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color2.slice(i, i + 2)));
    }
    return colorChange;
  }
};
const file$1 = {
  getImageUrl(file2) {
    if (!file2 || !(file2 instanceof File)) {
      throw new TypeError("The argument must be a File object");
    }
    return window.URL.createObjectURL(file2);
  },
  dataFileToBase64(file2) {
    return new Promise((resolve, reject) => {
      if (!file2 || !(file2 instanceof File)) {
        reject(new TypeError("The argument must be a File object"));
      }
      let reader = new FileReader();
      reader.readAsDataURL(file2);
      reader.onloadend = () => {
        let dataURL = reader.result;
        resolve(dataURL);
      };
    });
  },
  dataBase64toFile(base64String, fileName) {
    if (!base64String || typeof base64String != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!fileName || typeof fileName != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let arr = base64String.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {
      type: mime
    });
  }
};
const platform$1 = {
  language() {
    return window.navigator.browserLanguage || window.navigator.language;
  },
  device() {
    const userAgent = window.navigator.userAgent;
    return {
      PC: !userAgent.match(/AppleWebKit.*Mobile.*/),
      Mobile: !!userAgent.match(/AppleWebKit.*Mobile.*/),
      iPhone: userAgent.includes("iPhone"),
      Phone: userAgent.includes("Android") && /(?:Mobile)/.test(userAgent) || userAgent.includes("iPhone") || /(?:Windows Phone)/.test(userAgent),
      iPad: userAgent.includes("iPad"),
      Tablet: userAgent.includes("iPad") || userAgent.includes("Android") && !/(?:Mobile)/.test(userAgent) || userAgent.includes("Firefox") && /(?:Tablet)/.test(userAgent),
      WindowsPhone: /(?:Windows Phone)/.test(userAgent)
    };
  },
  browser() {
    const userAgent = window.navigator.userAgent;
    return {
      Edge: !!userAgent.match(/Edg\/([\d.]+)/),
      weixin: userAgent.includes("MicroMessenger"),
      QQ: userAgent.includes("QQ"),
      QQBrowser: userAgent.includes("MQQBrowser"),
      UC: userAgent.includes("UCBrowser"),
      Chrome: userAgent.includes("Chrome"),
      Firefox: userAgent.includes("Firefox"),
      sougou: userAgent.toLocaleLowerCase().includes("se 2.x") || userAgent.toLocaleLowerCase().includes("metasr") || userAgent.toLocaleLowerCase().includes("sogou"),
      Safari: userAgent.includes("Safari") && !userAgent.includes("Chrome")
    };
  },
  browserKernel() {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("Presto")) {
      return "opera";
    } else if (userAgent.includes("AppleWebKit")) {
      return "webkit";
    } else if (userAgent.includes("Gecko") && !userAgent.includes("KHTML")) {
      return "gecko";
    }
    return "";
  },
  os() {
    const userAgent = window.navigator.userAgent;
    return {
      Windows: userAgent.includes("Windows"),
      Windows_CPU: function() {
        if (userAgent.toLocaleLowerCase().includes("win64") || userAgent.toLocaleLowerCase().includes("wow64")) {
          return "x64";
        } else if (userAgent.toLocaleLowerCase().includes("win32") || userAgent.toLocaleLowerCase().includes("wow32")) {
          return "x32";
        }
        return "";
      }(),
      Windows_Version: function() {
        if (userAgent.includes("Windows NT 6.1") || userAgent.includes("Windows 7")) {
          return "Win7";
        } else if (userAgent.includes("Windows NT 6.3") || userAgent.includes("Windows NT 6.2") || userAgent.includes("Windows NT 8")) {
          return "Win8";
        } else if (userAgent.includes("Windows NT 10") || userAgent.includes("Windows NT 6.4")) {
          return "Win10";
        }
        return "";
      }(),
      Mac: userAgent.includes("Macintosh"),
      Mac_Version: function() {
        if (userAgent.includes("Macintosh")) {
          const matches = userAgent.match(/Mac OS X ([^\s]+)\)/);
          if (matches && matches[1]) {
            return matches[1].split(/_|\./).join(".");
          }
        }
        return "";
      }(),
      ios: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      ios_Version: function() {
        if (!!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
          const matches = userAgent.match(/CPU.+OS ([^\s]+) like Mac OS X/);
          if (matches && matches[1]) {
            return matches[1].split(/_|\./).join(".");
          }
        }
        return "";
      }(),
      Android: userAgent.includes("Android"),
      Android_Version: function() {
        const matches = userAgent.match(/Android ([^\s]+);/);
        if (matches && matches[1]) {
          return matches[1].split(/_|\./).join(".");
        }
        return "";
      }(),
      Linux: userAgent.includes("Linux"),
      HarmonyOS: userAgent.includes("HarmonyOS"),
      Ubuntu: userAgent.includes("Ubuntu")
    };
  }
};
const speech$1 = {
  start(text, params) {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    let defaultParams = {
      pitch: 0.8,
      rate: 1,
      volume: 1,
      start: function() {
      },
      end: function() {
      },
      pause: function() {
      },
      resume: function() {
      },
      error: function() {
      }
    };
    if (!common$1.isObject(params)) {
      params = {};
    }
    if (number$1.isNumber(params.pitch)) {
      defaultParams.pitch = params.pitch;
    }
    if (number$1.isNumber(params.rate)) {
      defaultParams.rate = params.rate;
    }
    if (number$1.isNumber(params.volume)) {
      defaultParams.volume = params.volume;
    }
    if (typeof params.start == "function") {
      defaultParams.start = params.start;
    }
    if (typeof params.end == "function") {
      defaultParams.end = params.end;
    }
    if (typeof params.pause == "function") {
      defaultParams.pause = params.pause;
    }
    if (typeof params.resume == "function") {
      defaultParams.resume = params.resume;
    }
    if (typeof params.error == "function") {
      defaultParams.error = params.error;
    }
    const speech2 = new SpeechSynthesisUtterance();
    speech2.text = text;
    speech2.pitch = defaultParams.pitch;
    speech2.rate = defaultParams.rate;
    speech2.volume = defaultParams.volume;
    speech2.lang = "zh-CN";
    speech2.onstart = (event2) => {
      defaultParams.start.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onend = (event2) => {
      defaultParams.end.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onpause = (event2) => {
      defaultParams.pause.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onresume = (event2) => {
      defaultParams.resume.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onerror = (event2) => {
      defaultParams.error.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    window.speechSynthesis.speak(speech2);
  },
  stop() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.cancel();
  },
  pause() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.pause();
  },
  resume() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.resume();
  }
};
const obj$1 = { number: number$1, data: data$1, element: element$1, event: event$2, common: common$1, date: date$1, color: color$1, file: file$1, string: string$1, platform: platform$1, speech: speech$1 };
obj$1.install = (app) => {
  app.config.globalProperties.$dap = obj$1;
  app.provide("$dap", obj$1);
};
obj$1.event.on(window, "touchstart.ios", (e) => {
});
class Anchor {
  constructor(element2, options) {
    this.$el = element2;
    if (!obj$1.common.isObject(options)) {
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
    if (!obj$1.element.isElement(this.$el)) {
      throw new TypeError("The element you click on is not a node element");
    }
    if (!obj$1.element.isElement(this.$target)) {
      throw new TypeError("Anchor element is not a node element");
    }
    if (!obj$1.number.isNumber(this.time)) {
      this.time = 0;
    }
    if (typeof this.callback != "function") {
      this.callback = function() {
      };
    }
    if (!obj$1.number.isNumber(this.distance)) {
      this.distance = 0.1;
    }
    if (obj$1.element.isElement(this.$root)) {
      obj$1.event.on(this.$el, "click.anchor", (e) => {
        let scrollTop = obj$1.element.getElementPoint(this.$target, this.$root).top;
        obj$1.element.setScrollTop({
          el: this.$root,
          number: scrollTop - obj$1.element.rem2px(this.distance),
          time: this.time
        }).then(() => {
          let top = scrollTop - obj$1.element.rem2px(this.distance) <= 0 ? 0 : scrollTop - obj$1.element.rem2px(this.distance);
          this.callback(top);
        });
      });
    } else {
      obj$1.event.on(this.$el, "click.anchor", (e) => {
        let scrollTop = obj$1.element.getElementPoint(this.$target).top;
        obj$1.element.setScrollTop({
          number: scrollTop - obj$1.element.rem2px(this.distance),
          time: this.time
        }).then(() => {
          let top = scrollTop - obj$1.element.rem2px(this.distance) <= 0 ? 0 : scrollTop - obj$1.element.rem2px(this.distance);
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
      if (obj$1.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let anchor = new Anchor$1(el, options);
      anchor.init();
    }
  });
};
class Resize {
  constructor(element2, options) {
    this.$el = element2;
    if (!obj$1.common.isObject(options)) {
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
    if (!obj$1.element.isElement(this.$el)) {
      throw new TypeError("The element that needs to be resized is not a node element");
    }
    if (typeof this.draggableX != "boolean") {
      this.draggableX = true;
    }
    if (typeof this.draggableY != "boolean") {
      this.draggableY = true;
    }
    if (!obj$1.common.isObject(this.mode)) {
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
    if (!obj$1.number.isNumber(this.range)) {
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
        x: [range.left, range.left + obj$1.element.rem2px(this.range)],
        y: [range.top + obj$1.element.rem2px(this.range), range.bottom - obj$1.element.rem2px(this.range)]
      };
      this.rightRange = {
        x: [range.right - obj$1.element.rem2px(this.range), range.right],
        y: [range.top + obj$1.element.rem2px(this.range), range.bottom - obj$1.element.rem2px(this.range)]
      };
      this.topRange = {
        x: [range.left + obj$1.element.rem2px(this.range), range.right - obj$1.element.rem2px(this.range)],
        y: [range.top, range.top + obj$1.element.rem2px(this.range)]
      };
      this.bottomRange = {
        x: [range.left + obj$1.element.rem2px(this.range), range.right - obj$1.element.rem2px(this.range)],
        y: [range.bottom - obj$1.element.rem2px(this.range), range.bottom]
      };
      this.leftTopRange = {
        x: [range.left, range.left + obj$1.element.rem2px(this.range)],
        y: [range.top, range.top + obj$1.element.rem2px(this.range)]
      };
      this.leftBottomRange = {
        x: [range.left, range.left + obj$1.element.rem2px(this.range)],
        y: [range.bottom - obj$1.element.rem2px(this.range), range.bottom]
      };
      this.rightTopRange = {
        x: [range.right - obj$1.element.rem2px(this.range), range.right],
        y: [range.top, range.top + obj$1.element.rem2px(this.range)]
      };
      this.rightBottomRange = {
        x: [range.right - obj$1.element.rem2px(this.range), range.right],
        y: [range.bottom - obj$1.element.rem2px(this.range), range.bottom]
      };
    } else if (this.draggableX) {
      this.leftRange = {
        x: [range.left, range.left + obj$1.element.rem2px(this.range)],
        y: [range.top, range.bottom]
      };
      this.rightRange = {
        x: [range.right - obj$1.element.rem2px(this.range), range.right],
        y: [range.top, range.bottom]
      };
    } else if (this.draggableY) {
      this.topRange = {
        x: [range.left, range.right],
        y: [range.top, range.top + obj$1.element.rem2px(this.range)]
      };
      this.bottomRange = {
        x: [range.left, range.right],
        y: [range.bottom - obj$1.element.rem2px(this.range), range.bottom]
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
    this.cursor = obj$1.element.getCssStyle(this.$el, "cursor");
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
      } else if (this._getIsInRange(this.startX, this.startY, this.leftBottomRange)) {
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
      } else if (this._getIsInRange(this.startX, this.startY, this.rightBottomRange)) {
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
        if (this._getIsInRange(this.startX, this.startY, this.leftTopRange)) {
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
        } else if (this._getIsInRange(this.startX, this.startY, this.leftBottomRange)) {
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
        } else if (this._getIsInRange(this.startX, this.startY, this.rightTopRange)) {
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
        } else if (this._getIsInRange(this.startX, this.startY, this.rightBottomRange)) {
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
        } else if (this._getIsInRange(this.startX, this.startY, this.rightRange)) {
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
        } else if (this._getIsInRange(this.startX, this.startY, this.bottomRange)) {
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
        } else if (this._getIsInRange(this.startX, this.startY, this.rightRange)) {
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
        } else if (this._getIsInRange(this.startX, this.startY, this.bottomRange)) {
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
        if (this._getIsInRange(this.startX, this.startY, this.leftTopRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.LEFTTOP
            }
          ]);
        } else if (this._getIsInRange(this.startX, this.startY, this.leftBottomRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.LEFTBOTTOM
            }
          ]);
        } else if (this._getIsInRange(this.startX, this.startY, this.rightTopRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.RIGHTTOP
            }
          ]);
        } else if (this._getIsInRange(this.startX, this.startY, this.rightBottomRange)) {
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
        } else if (this._getIsInRange(this.startX, this.startY, this.rightRange)) {
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
        } else if (this._getIsInRange(this.startX, this.startY, this.bottomRange)) {
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
        } else if (this._getIsInRange(this.startX, this.startY, this.rightRange)) {
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
        } else if (this._getIsInRange(this.startX, this.startY, this.bottomRange)) {
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
    obj$1.event.on(this.$el, "touchstart.resize", (e) => {
      this.startX = e.targetTouches[0].pageX;
      this.startY = e.targetTouches[0].pageY;
      this._down(e);
    });
    obj$1.event.on(this.$el, "touchmove.resize", (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      let endX = e.targetTouches[0].pageX;
      let endY = e.targetTouches[0].pageY;
      this._move(e, endX, endY);
    });
    obj$1.event.on(this.$el, "touchend.resize", (e) => {
      this._leave(e);
    });
    obj$1.event.on(this.$el, "mousedown.resize", (e) => {
      this.startX = e.pageX;
      this.startY = e.pageY;
      this._down(e);
    });
    obj$1.event.on(document.documentElement, `mousemove.resize_${this.guid}`, (e) => {
      let endX = e.pageX;
      let endY = e.pageY;
      this._move(e, endX, endY);
    });
    obj$1.event.on(document.documentElement, `mouseup.resize_${this.guid}`, (e) => {
      this._leave(e);
    });
  }
  _setOff() {
    obj$1.event.off(document.documentElement, `mousemove.resize_${this.guid} mouseup.resize_${this.guid}`);
  }
  _createGuid() {
    let guid = obj$1.data.get(document.body, "mvi-directives-resize-guid") || 0;
    guid++;
    obj$1.data.set(document.body, "mvi-directives-resize-guid", guid);
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
      if (obj$1.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      if (obj$1.common.isObject(binding.modifiers)) {
        Object.assign(options, binding.modifiers);
      }
      let resize = new Resize$1(el, options);
      resize.init();
      obj$1.data.set(el, "directive:resize", resize);
    },
    beforeUnmount(el, binding) {
      let resize = obj$1.data.get(el, "directive:resize");
      if (resize) {
        resize._setOff();
      }
    }
  });
};
class Drag {
  constructor(element2, options) {
    this.$el = element2;
    if (!obj$1.common.isObject(options)) {
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
    if (!obj$1.element.isElement(this.$el)) {
      throw new TypeError("The element that needs to be dragged is not a node element");
    }
    if (typeof this.$container == "string" && this.$container) {
      this.$container = document.body.querySelector(this.$container);
    }
    if (!obj$1.element.isElement(this.$container)) {
      this.$container = document.body;
    }
    if (!obj$1.element.isContains(this.$container, this.$el)) {
      throw new Error("Elements that need to be dragged are not descendants of container elements");
    }
    if (obj$1.element.getCssStyle(this.$container, "position") == "static" && this.$container != document.body) {
      throw new Error("The container element cannot be static positioning");
    }
    if (obj$1.element.getCssStyle(this.$el, "position") == "static" || obj$1.element.getCssStyle(this.$el, "position") == "relative") {
      throw new Error("The element that need to be dragged cannot be static and relative positioning");
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
    obj$1.event.on(this.$el, "touchstart.drag", (e) => {
      if (!this.draggableX && !this.draggableY) {
        return;
      }
      this.pageX = e.targetTouches[0].pageX - obj$1.element.getElementPoint(this.$el, this.$container).left;
      this.pageY = e.targetTouches[0].pageY - obj$1.element.getElementPoint(this.$el, this.$container).top;
      this.draggable = true;
      if (this.cursor) {
        this.$el.style.cursor = "move";
      }
      this.beforedrag.apply(this, [
        {
          event: e,
          target: this.$el,
          container: this.$container,
          placement: obj$1.element.getElementPoint(this.$el, this.$container)
        }
      ]);
    });
    obj$1.event.on(this.$el, "touchmove.drag", (e) => {
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
              placement: obj$1.element.getElementPoint(this.$el, this.$container)
            }
          ]);
        }
      }
    });
    obj$1.event.on(this.$el, "touchend.drag", (e) => {
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
            placement: obj$1.element.getElementPoint(this.$el, this.$container)
          }
        ]);
      }
    });
    obj$1.event.on(this.$el, "mousedown.drag", (e) => {
      if (!this.draggableX && !this.draggableY) {
        return;
      }
      this.pageX = e.pageX - obj$1.element.getElementPoint(this.$el, this.$container).left;
      this.pageY = e.pageY - obj$1.element.getElementPoint(this.$el, this.$container).top;
      this.draggable = true;
      if (this.cursor) {
        this.$el.style.cursor = "move";
      }
      this.beforedrag.apply(this, [
        {
          event: e,
          target: this.$el,
          container: this.$container,
          placement: obj$1.element.getElementPoint(this.$el, this.$container)
        }
      ]);
    });
    obj$1.event.on(document.documentElement, `mousemove.drag_${this.guid}`, (e) => {
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
              placement: obj$1.element.getElementPoint(this.$el, this.$container)
            }
          ]);
        }
      }
    });
    obj$1.event.on(document.documentElement, `mouseup.drag_${this.guid}`, (e) => {
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
            placement: obj$1.element.getElementPoint(this.$el, this.$container)
          }
        ]);
      }
    });
  }
  _setOff() {
    obj$1.event.off(document.documentElement, `mousemove.drag_${this.guid} mouseup.drag_${this.guid}`);
  }
  _resize() {
    if (this.mode == "in") {
      if (this.draggableX) {
        if (obj$1.element.getElementPoint(this.$el, this.$container).left <= 0) {
          this.$el.style.left = 0;
        }
        if (obj$1.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth - this.$el.offsetWidth) {
          this.$el.style.left = this.$container.offsetWidth - this.$el.offsetWidth + "px";
        }
      }
      if (this.draggableY) {
        if (obj$1.element.getElementPoint(this.$el, this.$container).top <= 0) {
          this.$el.style.top = 0;
        }
        if (obj$1.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight - this.$el.offsetHeight) {
          this.$el.style.top = this.$container.offsetHeight - this.$el.offsetHeight + "px";
        }
      }
    } else if (this.mode == "on") {
      if (this.draggableX) {
        if (obj$1.element.getElementPoint(this.$el, this.$container).left <= -this.$el.offsetWidth / 2) {
          this.$el.style.left = -this.$el.offsetWidth / 2 + "px";
        }
        if (obj$1.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth - this.$el.offsetWidth / 2) {
          this.$el.style.left = this.$container.offsetWidth - this.$el.offsetWidth / 2 + "px";
        }
      }
      if (this.draggableY) {
        if (obj$1.element.getElementPoint(this.$el, this.$container).top <= -this.$el.offsetHeight / 2) {
          this.$el.style.top = -this.$el.offsetHeight / 2 + "px";
        }
        if (obj$1.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight - this.$el.offsetHeight / 2) {
          this.$el.style.top = this.$container.offsetHeight - this.$el.offsetHeight / 2 + "px";
        }
      }
    } else if (this.mode == "out") {
      if (this.draggableX) {
        if (obj$1.element.getElementPoint(this.$el, this.$container).left <= -this.$el.offsetWidth) {
          this.$el.style.left = -this.$el.offsetWidth + "px";
        }
        if (obj$1.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth) {
          this.$el.style.left = this.$container.offsetWidth + "px";
        }
      }
      if (this.draggableY) {
        if (obj$1.element.getElementPoint(this.$el, this.$container).top <= -this.$el.offsetHeight) {
          this.$el.style.top = -this.$el.offsetHeight + "px";
        }
        if (obj$1.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight) {
          this.$el.style.top = this.$container.offsetHeight + "px";
        }
      }
    }
  }
  _createGuid() {
    let guid = obj$1.data.get(document.body, "mvi-directives-drag-guid") || 0;
    guid++;
    obj$1.data.set(document.body, "mvi-directives-drag-guid", guid);
    return guid;
  }
  dragTo(left, top) {
    return new Promise((resolve, reject) => {
      this.beforedrag.apply(this, [
        {
          target: this.$el,
          container: this.$container,
          placement: obj$1.element.getElementPoint(this.$el, this.$container)
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
        placement: obj$1.element.getElementPoint(this.$el, this.$container)
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
      if (obj$1.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      if (obj$1.common.isObject(binding.modifiers)) {
        Object.assign(options, binding.modifiers);
      }
      let drag = new Drag$1(el, options);
      drag.init();
      obj$1.data.set(el, "directive:drag", drag);
    },
    beforeUnmount(el, binding) {
      let drag = obj$1.data.get(el, "directive:drag");
      if (drag) {
        drag._setOff();
      }
    }
  });
};
class Prop {
  constructor(element2, ratio) {
    this.$el = element2;
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
    if (!obj$1.element.isElement(this.$el)) {
      throw new TypeError("The bound element is not a node element");
    }
    if (typeof this.ratio != "number" || isNaN(this.ratio)) {
      this.ratio = 0;
    }
    this._set();
    obj$1.event.on(window, `resize.prop_${this.guid}`, (e) => {
      this._set();
    });
  }
  _set() {
    this.width = Number(parseFloat(obj$1.element.getCssStyle(this.$el, "width")).toFixed(2));
    this.height = this.width * this.ratio;
    this.$el.style.height = this.height + "px";
  }
  _setOff() {
    obj$1.event.off(window, `resize.prop_${this.guid}`);
  }
  _createGuid() {
    let guid = obj$1.data.get(document.body, "mvi-directives-prop-guid") || 0;
    guid++;
    obj$1.data.set(document.body, "mvi-directives-prop-guid", guid);
    return guid;
  }
}
const Prop$1 = Prop;
Prop$1.install = (app) => {
  app.directive("prop", {
    mounted(el, binding) {
      let prop = new Prop$1(el, binding.value);
      prop.init();
      obj$1.data.set(el, "directive:prop", prop);
    },
    beforeUnmount(el, binding) {
      let prop = obj$1.data.get(el, "directive:prop");
      if (prop) {
        prop._setOff();
      }
    }
  });
};
class Scroll {
  constructor(element2, options) {
    this.$el = element2;
    if (!obj$1.common.isObject(options)) {
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
    if (!obj$1.element.isElement(this.$el)) {
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
    obj$1.element.scrollTopBottomTrigger(this.$el, (res) => {
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
      if (obj$1.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let scroll = new Scroll$1(el, options);
      scroll.init();
    }
  });
};
class Spy {
  constructor(element2, options) {
    this.$el = element2;
    if (!obj$1.common.isObject(options)) {
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
    if (!obj$1.element.isElement(this.$el)) {
      throw new TypeError("The bound element is not a node element");
    }
    if (typeof this.$root == "string" && this.$root) {
      this.$root = document.documentElement.querySelector(this.$root);
    }
    if (!obj$1.element.isElement(this.$root)) {
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
    obj$1.event.on(this.$root, `scroll.spy_${this.guid}`, (e) => {
      this._scrollHandler();
    });
  }
  _scrollHandler() {
    let overflowX = obj$1.element.getCssStyle(this.$root, "overflow-x");
    let overflowY = obj$1.element.getCssStyle(this.$root, "overflow-y");
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
    obj$1.event.off(this.$root, `scroll.spy_${this.guid}`);
  }
  _createGuid() {
    let guid = obj$1.data.get(document.body, "mvi-directives-spy-guid") || 0;
    guid++;
    obj$1.data.set(document.body, "mvi-directives-spy-guid", guid);
    return guid;
  }
}
const Spy$1 = Spy;
Spy$1.install = (app) => {
  app.directive("spy", {
    mounted(el, binding) {
      let options = {};
      if (obj$1.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let spy = new Spy$1(el, options);
      spy.init();
      obj$1.data.set(el, "directive:spy", spy);
    },
    beforeUnmount(el, binding) {
      let spy = obj$1.data.get(el, "directive:spy");
      if (spy) {
        spy._setOff();
      }
    }
  });
};
class Observe {
  constructor(el, options) {
    this.$el = el;
    if (!obj$1.common.isObject(options)) {
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
    if (!obj$1.element.isElement(this.$el)) {
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
              if (obj$1.element.isElement(node)) {
                this.childNodesChange.apply(this, [node, null]);
              }
            }
            for (let node of mutationList[i].removedNodes) {
              if (obj$1.element.isElement(node)) {
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
      if (obj$1.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let observe = new Observe$1(el, options);
      observe.init();
    }
  });
};
class Upload {
  constructor(element2, options) {
    this.$el = element2;
    if (!obj$1.common.isObject(options)) {
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
    if (!obj$1.element.isElement(this.$el)) {
      throw new TypeError("The upload element is not specified");
    }
    if (!(this.allowedFileType instanceof Array)) {
      this.allowedFileType = [];
    }
    if (!obj$1.number.isNumber(this.minSize) || this.minSize <= 0) {
      this.minSize = -1;
    }
    if (!obj$1.number.isNumber(this.maxSize) || this.maxSize <= 0) {
      this.maxSize = -1;
    }
    if (!obj$1.number.isNumber(this.maxLength) || this.maxLength <= 0) {
      this.maxLength = -1;
    }
    if (!obj$1.number.isNumber(this.minLength) || this.minLength <= 0) {
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
    this.$selectInput = obj$1.element.string2dom("<input type='file' />");
    if (this.accept === "rar") {
      this.$selectInput.setAttribute("accept", "application/x-rar-compressed");
    } else if (this.accept === "zip") {
      this.$selectInput.setAttribute("accept", "application/x-zip-compressed");
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
      this.$selectInput.setAttribute("accept", "application/vnd.ms-powerpoint");
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
          this.error.apply(this, [Upload.ERRORTYPE.FILE_SUFFIX_ERROR, "\u6587\u4EF6" + files[i].name + "\u4E0D\u7B26\u5408\u89C4\u5B9A\u7684\u6587\u4EF6\u540E\u7F00\u7C7B\u578B", files[i]]);
          isAllAccord = false;
          break;
        }
        if (files[i].size / 1024 > this.maxSize && this.maxSize > 0) {
          this.error.apply(this, [Upload.ERRORTYPE.FILE_MAXSIZE_ERROR, "\u6587\u4EF6" + files[i].name + "\u8D85\u51FA\u6587\u4EF6\u6700\u5927\u503C\u9650\u5B9A", files[i]]);
          isAllAccord = false;
          break;
        }
        if (files[i].size / 1024 < this.minSize && this.minSize > 0) {
          this.error.apply(this, [Upload.ERRORTYPE.FILE_MINSIZE_ERROR, "\u6587\u4EF6" + files[i].name + "\u6CA1\u6709\u8FBE\u5230\u6587\u4EF6\u6700\u5C0F\u503C\u9650\u5B9A", files[i]]);
          isAllAccord = false;
          break;
        }
        if (this.files.length + length > this.maxLength && this.maxLength > 0) {
          this.error.apply(this, [Upload.ERRORTYPE.FILE_MAXLENGTH_ERROR, "\u6587\u4EF6\u6570\u91CF\u8D85\u51FA\u9650\u5B9A\u7684\u6700\u5927\u503C"]);
          isAllAccord = false;
          break;
        }
      }
      if (!isAllAccord) {
        return;
      }
      if (this.files.length + length < this.minLength && this.minLength > 0) {
        this.error.apply(this, [Upload.ERRORTYPE.FILE_MINLENGTH_ERROR, "\u6587\u4EF6\u6570\u91CF\u6CA1\u6709\u8FBE\u5230\u9650\u5B9A\u7684\u6700\u5C0F\u503C"]);
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
      if (obj$1.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      if (obj$1.common.isObject(binding.modifiers)) {
        Object.assign(options, binding.modifiers);
      }
      let upload = new Upload$1(el, options);
      upload.init();
    }
  });
};
class Px {
  constructor(element2, options) {
    this.$el = element2;
    if (!obj$1.common.isObject(options)) {
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
    if (!obj$1.element.isElement(this.$el)) {
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
      obj$1.element.addClass(this.$el, className);
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
    let guid = obj$1.data.get(document.body, "mvi-directives-px-guid") || 0;
    guid++;
    obj$1.data.set(document.body, "mvi-directives-px-guid", guid);
    return guid;
  }
}
const Px$1 = Px;
Px$1.install = (app) => {
  app.directive("px", {
    mounted(el, binding) {
      let options = {};
      if (obj$1.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      if (obj$1.common.isObject(binding.modifiers)) {
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
  constructor(element2, options) {
    this.$el = element2;
    if (!obj$1.common.isObject(options)) {
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
    if (!obj$1.element.isElement(this.$el)) {
      throw new TypeError("The bound element is not a node element");
    }
    if (typeof this.color != "string") {
      this.color = "#9f9f9f";
    }
    if (!obj$1.number.isNumber(this.duration)) {
      this.duration = 600;
    }
    if (!obj$1.number.isNumber(this.finalOpacity)) {
      this.finalOpacity = 0.1;
    }
    if (!obj$1.number.isNumber(this.initialOpacity)) {
      this.initialOpacity = 0.1;
    }
    if (!obj$1.number.isNumber(this.delay)) {
      this.delay = 80;
    }
    if (typeof this.disabled != "boolean") {
      this.disabled = false;
    }
    if (obj$1.element.getCssStyle(this.$el, "position") != "relative" && obj$1.element.getCssStyle(this.$el, "position") != "absolute" && obj$1.element.getCssStyle(this.$el, "position") != "fixed") {
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
          obj$1.data.set(rippleContainer, "ripple-animation-end", true);
          this._endDeal(rippleContainer);
        }, this.duration);
      }, this.delay);
    };
    const upFn = () => {
      if (this.rippleContainers.length) {
        this.rippleContainers.forEach((rippleContainer) => {
          obj$1.data.set(rippleContainer, "ripple-up", true);
          this._endDeal(rippleContainer);
        });
      }
    };
    obj$1.event.on(this.$el, "mousedown.ripple", (e) => {
      downFn(e.pageX, e.pageY);
    });
    obj$1.event.on(this.$el, "touchstart.ripple", (e) => {
      downFn(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    });
    obj$1.event.on(document.documentElement, `mouseup.ripple_${this.guid}`, upFn);
    obj$1.event.on(this.$el, `touchend.ripple`, upFn);
  }
  _setOff() {
    obj$1.event.off(document.documentElement, `mouseup.ripple_${this.guid}`);
  }
  _endDeal(rippleContainer) {
    const rippleUp = obj$1.data.get(rippleContainer, "ripple-up");
    const rippleAnimationEnd = obj$1.data.get(rippleContainer, "ripple-animation-end");
    if (rippleUp && rippleAnimationEnd) {
      const destoryDuration = 100;
      const rippleEls = obj$1.element.children(rippleContainer);
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
    const rect = obj$1.element.getElementBounding(this.$el);
    const { x1, x2, y1, y2, r } = this._getRadius(pageX, pageY, rect);
    const el = obj$1.element.string2dom("<div></div>");
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
    const el = obj$1.element.string2dom("<div></div>");
    el.style.position = "absolute";
    el.style.left = "0px";
    el.style.top = "0px";
    el.style.width = obj$1.element.getCssStyle(this.$el, "width");
    el.style.height = obj$1.element.getCssStyle(this.$el, "height");
    el.style.background = "transparent";
    el.style.borderRadius = obj$1.element.getCssStyle(this.$el, "border-radius");
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
    let guid = obj$1.data.get(document.documentElement, "mvi-directives-ripple-guid") || 0;
    guid++;
    obj$1.data.set(document.documentElement, "mvi-directives-ripple-guid", guid);
    return guid;
  }
}
const Ripple$1 = Ripple;
Ripple$1.install = (app) => {
  app.directive("ripple", {
    mounted(el, binding) {
      let options = {};
      if (obj$1.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let ripple = new Ripple$1(el, options);
      ripple.init();
      obj$1.data.set(el, "directive:ripple", ripple);
    },
    beforeUnmount(el, binding) {
      let ripple = obj$1.data.get(el, "directive:ripple");
      if (ripple) {
        ripple._setOff();
      }
    }
  });
};
const icon_vue_vue_type_style_index_0_scoped_a12d2cc0_lang = "";
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
const Icon = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["render", _sfc_render$18], ["__scopeId", "data-v-a12d2cc0"]]);
Icon.install = (app) => {
  app.component(Icon.name, Icon);
};
const button_vue_vue_type_style_index_0_scoped_05be9740_lang = "";
const _sfc_main$17 = {
  name: "m-button",
  props: {
    type: {
      type: String,
      default: "default",
      validator(value) {
        return ["default", "info", "success", "error", "warn", "primary"].includes(value);
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
      if (obj$1.common.isObject(this.loadIcon)) {
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
      if (obj$1.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.url == "string") {
          url = this.loadIcon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = true;
      if (obj$1.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.spin == "boolean") {
          spin = this.loadIcon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (obj$1.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.size == "string") {
          size = this.loadIcon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.color == "string") {
          color2 = this.loadIcon.color;
        }
      }
      return color2;
    },
    btnStyle() {
      let obj2 = {};
      if (this.plain) {
        if (this.color) {
          obj2.color = this.color;
          obj2.borderColor = this.color;
          obj2.background = this.subColor || "#fff";
        }
      } else {
        if (this.color) {
          obj2.background = this.color;
          obj2.borderColor = this.color;
          obj2.color = this.subColor || "#fff";
        }
      }
      return obj2;
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
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["render", _sfc_render$17], ["__scopeId", "data-v-05be9740"]]);
Button.install = (app) => {
  app.component(Button.name, Button);
};
const cell_vue_vue_type_style_index_0_scoped_6bd906f3_lang = "";
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
      if (obj$1.common.isObject(this.icon)) {
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
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.url == "string") {
          url = this.icon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.spin == "boolean") {
          spin = this.icon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.size == "string") {
          size = this.icon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.color == "string") {
          color2 = this.icon.color;
        }
      }
      return color2;
    },
    arrowType() {
      let type = null;
      if (obj$1.common.isObject(this.arrow)) {
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
      if (obj$1.common.isObject(this.arrow)) {
        if (typeof this.arrow.url == "string") {
          url = this.arrow.url;
        }
      }
      return url;
    },
    arrowSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.arrow)) {
        if (typeof this.arrow.spin == "boolean") {
          spin = this.arrow.spin;
        }
      }
      return spin;
    },
    arrowSize() {
      let size = null;
      if (obj$1.common.isObject(this.arrow)) {
        if (typeof this.arrow.size == "string") {
          size = this.arrow.size;
        }
      }
      return size;
    },
    arrowColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.arrow)) {
        if (typeof this.arrow.color == "string") {
          color2 = this.arrow.color;
        }
      }
      return color2;
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
const _hoisted_3$A = ["textContent"];
const _hoisted_4$p = ["textContent"];
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
        }, null, 10, _hoisted_3$A)) : createCommentVNode("", true)
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
      }, null, 8, _hoisted_4$p)) : createCommentVNode("", true)
    ], 6)) : createCommentVNode("", true)
  ], 2);
}
const Cell = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["render", _sfc_render$16], ["__scopeId", "data-v-6bd906f3"]]);
Cell.install = (app) => {
  app.component(Cell.name, Cell);
};
const cellGroup_vue_vue_type_style_index_0_scoped_e4e5797e_lang = "";
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
const CellGroup = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["render", _sfc_render$15], ["__scopeId", "data-v-e4e5797e"]]);
CellGroup.install = (app) => {
  app.component(CellGroup.name, CellGroup);
};
const navbar_vue_vue_type_style_index_0_scoped_2f81a7ed_lang = "";
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
      if (obj$1.common.isObject(this.leftIcon)) {
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
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.url == "string") {
          url = this.leftIcon.url;
        }
      }
      return url;
    },
    leftIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.spin == "boolean") {
          spin = this.leftIcon.spin;
        }
      }
      return spin;
    },
    leftIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.size == "string") {
          size = this.leftIcon.size;
        }
      }
      return size;
    },
    leftIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.color == "string") {
          color2 = this.leftIcon.color;
        }
      }
      return color2;
    },
    rightIconType() {
      let type = null;
      if (obj$1.common.isObject(this.rightIcon)) {
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
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.url == "string") {
          url = this.rightIcon.url;
        }
      }
      return url;
    },
    rightIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.spin == "boolean") {
          spin = this.rightIcon.spin;
        }
      }
      return spin;
    },
    rightIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.size == "string") {
          size = this.rightIcon.size;
        }
      }
      return size;
    },
    rightIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.color == "string") {
          color2 = this.rightIcon.color;
        }
      }
      return color2;
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
const _hoisted_3$z = ["textContent"];
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
      }, null, 8, _hoisted_3$z)) : createCommentVNode("", true),
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
const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["render", _sfc_render$14], ["__scopeId", "data-v-2f81a7ed"]]);
Navbar.install = (app) => {
  app.component(Navbar.name, Navbar);
};
const badge_vue_vue_type_style_index_0_scoped_8e335148_lang = "";
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
        return ["top-right", "top-left", "bottom-left", "bottom-right"].includes(value);
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
      const badgeExist = obj$1.number.isNumber(this.content) || this.content;
      if (badgeExist && this.show) {
        return true;
      }
      return false;
    }
  }
};
const _hoisted_1$M = { class: "mvi-badge" };
const _hoisted_2$F = ["data-placement"];
const _hoisted_3$y = ["data-placement"];
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
    }, toDisplayString($props.content), 13, _hoisted_3$y)) : createCommentVNode("", true)
  ]);
}
const Badge = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["render", _sfc_render$13], ["__scopeId", "data-v-8e335148"]]);
Badge.install = (app) => {
  app.component(Badge.name, Badge);
};
const tabbarItem_vue_vue_type_style_index_0_scoped_5159d7ee_lang = "";
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
      if (obj$1.common.isObject(this.icon)) {
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
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.url == "string") {
          url = this.icon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.spin == "boolean") {
          spin = this.icon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.size == "string") {
          size = this.icon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.color == "string") {
          color2 = this.icon.color;
        }
      }
      return color2;
    },
    computedClass() {
      let cls = ["mvi-tabbar-item"];
      if (obj$1.common.equal(this.value, this.tabbar.modelValue)) {
        cls.push("mvi-tabbar-item-active");
      }
      if (this.tabbar.active && !this.disabled && !obj$1.common.equal(this.value, this.tabbar.modelValue)) {
        cls.push("mvi-tabbar-active");
      }
      return cls;
    },
    computedStyle() {
      let style = {};
      if (obj$1.common.equal(this.value, this.tabbar.modelValue)) {
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
      } else if (obj$1.common.isObject(this.route)) {
        if (typeof this.route.path == "string" && this.route.path) {
          route.path = this.route.path;
        }
        if (typeof this.route.name == "string" && this.route.name) {
          route.name = this.route.name;
        }
        if (obj$1.common.isObject(this.route.query)) {
          route.query = this.route.query;
        } else {
          route.query = {};
        }
        if (obj$1.common.isObject(this.route.params)) {
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
      if (obj$1.common.equal(this.tabbar.modelValue, this.value)) {
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
const _hoisted_3$x = ["textContent"];
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
          }, null, 10, _hoisted_3$x)
        ])
      ]),
      _: 1
    }, 8, ["show", "content", "background", "color", "dot", "placement", "offset"])
  ], 14, _hoisted_1$L);
}
const TabbarItem = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["render", _sfc_render$12], ["__scopeId", "data-v-5159d7ee"]]);
const tabbar_vue_vue_type_style_index_0_scoped_6801b86c_lang = "";
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
      if (this.fixed && obj$1.number.isNumber(this.zIndex)) {
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
const Tabbar = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["render", _sfc_render$11], ["__scopeId", "data-v-6801b86c"]]);
Tabbar.install = (app) => {
  app.component(Tabbar.name, Tabbar);
};
const image_vue_vue_type_style_index_0_scoped_76c3813a_lang = "";
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
        return ["fill", "cover", "contain", "response", "none"].includes(value);
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
      if (obj$1.common.isObject(this.loadIcon)) {
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
      if (obj$1.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.url == "string") {
          url = this.loadIcon.url;
        }
      }
      return url;
    },
    loadIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.spin == "boolean") {
          spin = this.loadIcon.spin;
        }
      }
      return spin;
    },
    loadIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.size == "string") {
          size = this.loadIcon.size;
        }
      }
      return size;
    },
    loadIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.loadIcon)) {
        if (typeof this.loadIcon.color == "string") {
          color2 = this.loadIcon.color;
        }
      }
      return color2;
    },
    errorIconType() {
      let type = "image-error";
      if (obj$1.common.isObject(this.errorIcon)) {
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
      if (obj$1.common.isObject(this.errorIcon)) {
        if (typeof this.errorIcon.url == "string") {
          url = this.errorIcon.url;
        }
      }
      return url;
    },
    errorIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.errorIcon)) {
        if (typeof this.errorIcon.spin == "boolean") {
          spin = this.errorIcon.spin;
        }
      }
      return spin;
    },
    errorIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.errorIcon)) {
        if (typeof this.errorIcon.size == "string") {
          size = this.errorIcon.size;
        }
      }
      return size;
    },
    errorIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.errorIcon)) {
        if (typeof this.errorIcon.color == "string") {
          color2 = this.errorIcon.color;
        }
      }
      return color2;
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
const _hoisted_3$w = ["src", "alt"];
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
    }, null, 42, _hoisted_3$w)
  ], 4);
}
const Image = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["render", _sfc_render$10], ["__scopeId", "data-v-76c3813a"]]);
Image.install = (app) => {
  app.component(Image.name, Image);
};
const overlay_vue_vue_type_style_index_0_scoped_a0d7b0dd_lang = "";
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
  emits: ["update:modelValue", "show", "showing", "shown", "hide", "hidding", "hidden"],
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
      if (obj$1.number.isNumber(this.zIndex)) {
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
        if (obj$1.element.getScrollHeight(this.offsetParent) > this.offsetParent.clientHeight) {
          if (this.usePadding) {
            let scrollWidth = this.offsetParent.offsetWidth - this.offsetParent.clientWidth - parseFloat(obj$1.element.getCssStyle(this.offsetParent, "border-right-width")) - parseFloat(obj$1.element.getCssStyle(this.offsetParent, "border-left-width"));
            this.paddingRight = parseFloat(obj$1.element.getCssStyle(this.offsetParent, "padding-right"));
            this.offsetParent.style.setProperty("padding-right", this.paddingRight + scrollWidth + "px", "important");
          }
          this.scrollTop = obj$1.element.getScrollTop(this.offsetParent);
          this.overflowY = obj$1.element.getCssStyle(this.offsetParent, "overflow-y");
          this.offsetParent.style.setProperty("overflow-y", "hidden", "important");
          this.$$el.style.top = this.scrollTop + "px";
          this.hasVerticalScroll = true;
        }
        if (obj$1.element.getScrollWidth(this.offsetParent) > this.offsetParent.clientWidth) {
          if (this.usePadding) {
            let scrollHeight = this.offsetParent.offsetHeight - this.offsetParent.clientHeight - parseFloat(obj$1.element.getCssStyle(this.offsetParent, "border-bottom-width")) - parseFloat(obj$1.element.getCssStyle(this.offsetParent, "border-top-width"));
            this.paddingBottom = parseFloat(obj$1.element.getCssStyle(this.offsetParent, "padding-bottom"));
            this.offsetParent.style.setProperty("padding-bottom", this.paddingBottom + scrollHeight + "px", "important");
          }
          this.scrollLeft = obj$1.element.getScrollLeft(this.offsetParent);
          this.overflowX = obj$1.element.getCssStyle(this.offsetParent, "overflow-x");
          this.offsetParent.style.setProperty("overflow-x", "hidden", "important");
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
            this.offsetParent.style.setProperty("padding-right", this.paddingRight + "px", "important");
          }
          this.offsetParent.style.setProperty("overflow-y", this.overflowY, "important");
          this.hasVerticalScroll = false;
        }
        if (this.hasHorizontalScroll) {
          if (this.usePadding) {
            this.offsetParent.style.setProperty("padding-bottom", this.paddingBottom + "px", "important");
          }
          this.offsetParent.style.setProperty("overflow-x", this.overflowX, "important");
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
const Overlay = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["render", _sfc_render$$], ["__scopeId", "data-v-a0d7b0dd"]]);
Overlay.install = (app) => {
  app.component(Overlay.name, Overlay);
};
const popup_vue_vue_type_style_index_0_scoped_0f042824_lang = "";
const _sfc_main$_ = {
  name: "m-popup",
  data() {
    return {
      popupShow: false,
      firstShow: false
    };
  },
  emits: ["update:modelValue", "show", "showing", "shown", "hide", "hidding", "hidden", "overlay-click"],
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
        return ["top-right", "top-left", "bottom-right", "bottom-left"].includes(value);
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
      if (obj$1.common.isObject(this.timesIcon)) {
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
      if (obj$1.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.url == "string") {
          url = this.timesIcon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.spin == "boolean") {
          spin = this.timesIcon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (obj$1.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.size == "string") {
          size = this.timesIcon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.color == "string") {
          color2 = this.timesIcon.color;
        }
      }
      return color2;
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
      if (obj$1.number.isNumber(this.zIndex)) {
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
      if (obj$1.data.get(el, "mvi-popup-beforeEnter-trigger")) {
        return;
      }
      obj$1.data.set(el, "mvi-popup-beforeEnter-trigger", true);
      this.$emit("show", el);
      if (typeof this.popupComponentWatch == "function") {
        this.popupComponentWatch.apply(this, ["show", el]);
      }
    },
    enter(el) {
      if (obj$1.data.get(el, "mvi-popup-enter-trigger")) {
        return;
      }
      obj$1.data.set(el, "mvi-popup-enter-trigger", true);
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
      obj$1.data.remove(el, "mvi-popup-beforeEnter-trigger");
      obj$1.data.remove(el, "mvi-popup-enter-trigger");
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
const Popup = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["render", _sfc_render$_], ["__scopeId", "data-v-0f042824"]]);
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
      let color2 = null;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.color == "string") {
          color2 = this.icon.color;
        }
      }
      return color2;
    },
    iconSize() {
      let size = null;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.size == "string") {
          size = this.icon.size;
        }
      }
      return size;
    },
    iconType() {
      let type = "success";
      if (obj$1.common.isObject(this.icon)) {
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
          return obj$1.common.equal(item, this.value);
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
            return !obj$1.common.equal(item, this.value);
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
const _hoisted_3$v = ["value", "disabled", "checked", "name"];
const _hoisted_4$o = ["disabled"];
const _hoisted_5$j = ["disabled", "data-placement", "textContent"];
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
    }, null, 40, _hoisted_3$v),
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
    ], 14, _hoisted_4$o),
    $props.labelPlacement == "right" && $props.label ? (openBlock(), createElementBlock("span", {
      key: 1,
      disabled: $props.disabled || null,
      class: "mvi-checkbox-label",
      "data-placement": $props.labelPlacement,
      textContent: toDisplayString($props.label),
      style: normalizeStyle($options.labelStyle)
    }, null, 12, _hoisted_5$j)) : createCommentVNode("", true)
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
      let color2 = null;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.color == "string") {
          color2 = this.icon.color;
        }
      }
      return color2;
    },
    iconSize() {
      let size = null;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.size == "string") {
          size = this.icon.size;
        }
      }
      return size;
    },
    iconType() {
      let type = "success";
      if (obj$1.common.isObject(this.icon)) {
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
        return obj$1.common.equal(this.modelValue, this.value);
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
const _hoisted_3$u = ["value", "disabled", "checked", "name"];
const _hoisted_4$n = ["disabled"];
const _hoisted_5$i = ["disabled", "data-placement", "textContent"];
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
    }, null, 40, _hoisted_3$u),
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
    ], 14, _hoisted_4$n),
    $props.label && $props.labelPlacement == "right" ? (openBlock(), createElementBlock("span", {
      key: 1,
      disabled: $props.disabled || null,
      class: "mvi-radio-label",
      "data-placement": $props.labelPlacement,
      textContent: toDisplayString($props.label),
      style: normalizeStyle($options.labelStyle)
    }, null, 12, _hoisted_5$i)) : createCommentVNode("", true)
  ], 8, _hoisted_1$I);
}
const Radio = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["render", _sfc_render$Y], ["__scopeId", "data-v-c9785930"]]);
Radio.install = (app) => {
  app.component(Radio.name, Radio);
};
const loading_vue_vue_type_style_index_0_scoped_cd4aca21_lang = "";
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
const Loading = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["render", _sfc_render$X], ["__scopeId", "data-v-cd4aca21"]]);
Loading.install = (app) => {
  app.component(Loading.name, Loading);
};
const picker_vue_vue_type_style_index_0_scoped_217fd804_lang = "";
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
        return obj$1.element.rem2px(parseFloat(this.selectHeight));
      }
    },
    loadingStyle() {
      let style = {};
      style.height = `calc(${obj$1.number.mutiply(this.computedHeight, this.visibleCounts)}px + 0.88rem)`;
      return style;
    },
    contentStyle() {
      let style = {};
      style.height = `${obj$1.number.mutiply(this.computedHeight, this.visibleCounts)}px`;
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
        style.backgroundSize = "100% " + obj$1.number.mutiply(this.computedHeight, obj$1.number.divide(this.visibleCounts - 1, 2)) + "px";
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
    obj$1.event.on(document.documentElement, `mousemove.picker_${this.uid}`, this.mousemove);
    obj$1.event.on(document.documentElement, `mouseup.picker_${this.uid}`, this.mouseup);
  },
  methods: {
    init() {
      this.offsets = [];
      for (let i = 0; i < this.computedOptions.length; i++) {
        this.offsets.push(this.getOffset(this.computedOptions[i].defaultIndex || 0));
      }
    },
    crisis(index) {
      let max = obj$1.number.divide(this.visibleCounts - 1, 2);
      max = obj$1.number.mutiply(max, this.computedHeight);
      let min = -obj$1.number.divide(this.visibleCounts - 1, 2);
      min = obj$1.number.mutiply(min, this.computedHeight);
      min += obj$1.number.mutiply(this.visibleCounts - this.computedOptions[index].values.length, this.computedHeight);
      return {
        max,
        min
      };
    },
    getActive(value) {
      let num = Math.abs(obj$1.number.divide(value - obj$1.number.mutiply(obj$1.number.divide(this.visibleCounts - 1, 2), this.computedHeight), this.computedHeight));
      return Math.round(num);
    },
    getOffset(index) {
      return obj$1.number.mutiply(obj$1.number.subtract(obj$1.number.divide(this.visibleCounts - 1, 2), index), this.computedHeight);
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
            this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + obj$1.element.rem2px(10) * totalTimeStamp / 1e3;
          } else {
            this.offsets[this.columnIndex] = this.offsets[this.columnIndex] - obj$1.element.rem2px(10) * totalTimeStamp / 1e3;
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
            this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + obj$1.element.rem2px(10) * totalTimeStamp / 1e3;
          } else {
            this.offsets[this.columnIndex] = this.offsets[this.columnIndex] - obj$1.element.rem2px(10) * totalTimeStamp / 1e3;
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
          this.offsets[this.columnIndex] = this.crisis(this.columnIndex).max;
        } else {
          let order = this.getActive(this.offsets[this.columnIndex]);
          this.offsets[this.columnIndex] = this.getOffset(order);
        }
      } else {
        if (this.offsets[this.columnIndex] <= this.crisis(this.columnIndex).min) {
          this.offsets[this.columnIndex] = this.crisis(this.columnIndex).min;
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
    obj$1.event.off(document.documentElement, `mousemove.picker_${this.uid} mouseup.picker_${this.uid}`);
  }
};
const _hoisted_1$H = { class: "mvi-picker" };
const _hoisted_2$A = {
  key: 1,
  class: "mvi-picker-toolbar"
};
const _hoisted_3$t = ["textContent"];
const _hoisted_4$m = ["textContent"];
const _hoisted_5$h = ["textContent"];
const _hoisted_6$c = ["onTouchstart", "onMousedown"];
const _hoisted_7$b = ["textContent"];
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
      }, null, 10, _hoisted_3$t),
      $props.title ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["mvi-picker-toolbar-title", $props.titleClass || ""]),
        textContent: toDisplayString($props.title)
      }, null, 10, _hoisted_4$m)) : createCommentVNode("", true),
      createElementVNode("div", {
        class: normalizeClass(["mvi-picker-toolbar-confirm", $props.confirmClass || ""]),
        textContent: toDisplayString($props.confirmText),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.doConfirm && $options.doConfirm(...args))
      }, null, 10, _hoisted_5$h)
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
            }, null, 12, _hoisted_7$b);
          }), 128))
        ], 46, _hoisted_6$c);
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
const Picker = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["render", _sfc_render$W], ["__scopeId", "data-v-217fd804"]]);
Picker.install = (app) => {
  app.component(Picker.name, Picker);
};
const datePicker_vue_vue_type_style_index_0_scoped_79d58c59_lang = "";
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
        let date2 = new Date();
        date2.setFullYear(1970);
        date2.setMonth(0);
        date2.setDate(1);
        date2.setHours(0);
        date2.setMinutes(0);
        date2.setSeconds(0);
        date2.setMilliseconds(0);
        return date2;
      }
    },
    endDate: {
      type: Date,
      default: function() {
        let date2 = new Date();
        date2.setFullYear(2099);
        date2.setMonth(11);
        date2.setDate(31);
        date2.setHours(23);
        date2.setMinutes(59);
        date2.setSeconds(59);
        date2.setMilliseconds(999);
        return date2;
      }
    },
    mode: {
      type: String,
      default: "date",
      validator(value) {
        return ["date", "datetime", "time", "month", "year"].includes(value);
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
      let totalDays = obj$1.date.getDays(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1);
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
          this.selectedDate = new Date(this.selectedDate.setFullYear(year));
          if (this.equalEndYear) {
            if (this.selectedDate.getMonth() > this.endDate.getMonth()) {
              this.selectedDate = new Date(this.selectedDate.setMonth(this.endDate.getMonth()));
            }
            if (this.equalEndMonth) {
              if (this.selectedDate.getDate() > this.endDate.getDate()) {
                this.selectedDate = new Date(this.selectedDate.setDate(this.endDate.getDate()));
              }
            }
          }
          if (this.equalStartYear) {
            if (this.selectedDate.getMonth() < this.startDate.getMonth()) {
              this.selectedDate = new Date(this.selectedDate.setMonth(this.startDate.getMonth()));
            }
            if (this.equalStartMonth) {
              if (this.selectedDate.getDate() < this.startDate.getDate()) {
                this.selectedDate = new Date(this.selectedDate.setDate(this.startDate.getDate()));
              }
            }
          }
        } else if (res.columnIndex == 1) {
          let month = this.monthArray[res.selected[1].index].month;
          let totalDays = obj$1.date.getDays(this.selectedDate.getFullYear(), month);
          if (this.selectedDate.getDate() > totalDays) {
            this.selectedDate.setDate(totalDays);
          }
          this.selectedDate = new Date(this.selectedDate.setMonth(month - 1));
          if (this.equalEndYear && this.equalEndMonth) {
            if (this.selectedDate.getDate() > this.endDate.getDate()) {
              this.selectedDate = new Date(this.selectedDate.setDate(this.endDate.getDate()));
            }
          }
          if (this.equalStartYear && this.equalStartMonth) {
            if (this.selectedDate.getDate() < this.startDate.getDate()) {
              this.selectedDate = new Date(this.selectedDate.setDate(this.startDate.getDate()));
            }
          }
        } else if (res.columnIndex == 2) {
          let day = this.dayArray[res.selected[2].index].day;
          this.selectedDate = new Date(this.selectedDate.setDate(day));
        }
      } else if (this.mode == "month") {
        if (res.columnIndex == 0) {
          let year = this.yearArray[res.selected[0].index].year;
          this.selectedDate = new Date(this.selectedDate.setFullYear(year));
          if (this.equalEndYear) {
            if (this.selectedDate.getMonth() > this.endDate.getMonth()) {
              this.selectedDate = new Date(this.selectedDate.setMonth(this.endDate.getMonth()));
            }
            if (this.equalEndMonth) {
              if (this.selectedDate.getDate() > this.endDate.getDate()) {
                this.selectedDate = new Date(this.selectedDate.setDate(this.endDate.getDate()));
              }
            }
          }
          if (this.equalStartYear) {
            if (this.selectedDate.getMonth() < this.startDate.getMonth()) {
              this.selectedDate = new Date(this.selectedDate.setMonth(this.startDate.getMonth()));
            }
            if (this.equalStartMonth) {
              if (this.selectedDate.getDate() < this.startDate.getDate()) {
                this.selectedDate = new Date(this.selectedDate.setDate(this.startDate.getDate()));
              }
            }
          }
        } else if (res.columnIndex == 1) {
          let month = this.monthArray[res.selected[1].index].month;
          let totalDays = obj$1.date.getDays(this.selectedDate.getFullYear(), month);
          if (this.selectedDate.getDate() > totalDays) {
            this.selectedDate.setDate(totalDays);
          }
          this.selectedDate = new Date(this.selectedDate.setMonth(month - 1));
          if (this.equalEndYear && this.equalEndMonth) {
            if (this.selectedDate.getDate() > this.endDate.getDate()) {
              this.selectedDate = new Date(this.selectedDate.setDate(this.endDate.getDate()));
            }
          }
          if (this.equalStartYear && this.equalStartMonth) {
            if (this.selectedDate.getDate() < this.startDate.getDate()) {
              this.selectedDate = new Date(this.selectedDate.setDate(this.startDate.getDate()));
            }
          }
        }
      } else if (this.mode == "year") {
        if (res.columnIndex == 0) {
          let year = this.yearArray[res.selected.index].year;
          this.selectedDate = new Date(this.selectedDate.setFullYear(year));
          if (this.equalEndYear) {
            if (this.selectedDate.getMonth() > this.endDate.getMonth()) {
              this.selectedDate = new Date(this.selectedDate.setMonth(this.endDate.getMonth()));
            }
            if (this.equalEndMonth) {
              if (this.selectedDate.getDate() > this.endDate.getDate()) {
                this.selectedDate = new Date(this.selectedDate.setDate(this.endDate.getDate()));
              }
            }
          }
          if (this.equalStartYear) {
            if (this.selectedDate.getMonth() < this.startDate.getMonth()) {
              this.selectedDate = new Date(this.selectedDate.setMonth(this.startDate.getMonth()));
            }
            if (this.equalStartMonth) {
              if (this.selectedDate.getDate() < this.startDate.getDate()) {
                this.selectedDate = new Date(this.selectedDate.setDate(this.startDate.getDate()));
              }
            }
          }
        }
      } else if (this.mode == "datetime") {
        if (res.columnIndex == 0) {
          let year = this.yearArray[res.selected[0].index].year;
          this.selectedDate = new Date(this.selectedDate.setFullYear(year));
          if (this.equalEndYear) {
            if (this.selectedDate.getMonth() > this.endDate.getMonth()) {
              this.selectedDate = new Date(this.selectedDate.setMonth(this.endDate.getMonth()));
            }
            if (this.equalEndMonth) {
              if (this.selectedDate.getDate() > this.endDate.getDate()) {
                this.selectedDate = new Date(this.selectedDate.setDate(this.endDate.getDate()));
              }
              if (this.equalEndDay) {
                if (this.selectedDate.getHours() > this.endDate.getHours()) {
                  this.selectedDate = new Date(this.selectedDate.setHours(this.endDate.getHours()));
                }
                if (this.equalEndHour) {
                  if (this.selectedDate.getMinutes() > this.endDate.getMinutes()) {
                    this.selectedDate = new Date(this.selectedDate.setMinutes(this.endDate.getMinutes()));
                  }
                }
              }
            }
          }
          if (this.equalStartYear) {
            if (this.selectedDate.getMonth() < this.startDate.getMonth()) {
              this.selectedDate = new Date(this.selectedDate.setMonth(this.startDate.getMonth()));
            }
            if (this.equalStartMonth) {
              if (this.selectedDate.getDate() < this.startDate.getDate()) {
                this.selectedDate = new Date(this.selectedDate.setDate(this.startDate.getDate()));
              }
              if (this.equalStartDay) {
                if (this.selectedDate.getHours() < this.startDate.getHours()) {
                  this.selectedDate = new Date(this.selectedDate.setHours(this.startDate.getHours()));
                }
                if (this.equalStartHour) {
                  if (this.selectedDate.getMinutes() < this.startDate.getMinutes()) {
                    this.selectedDate = new Date(this.selectedDate.setMinutes(this.startDate.getMinutes()));
                  }
                }
              }
            }
          }
        } else if (res.columnIndex == 1) {
          let month = this.monthArray[res.selected[1].index].month;
          let totalDays = obj$1.date.getDays(this.selectedDate.getFullYear(), month);
          if (this.selectedDate.getDate() > totalDays) {
            this.selectedDate.setDate(totalDays);
          }
          this.selectedDate = new Date(this.selectedDate.setMonth(month - 1));
          if (this.equalEndYear && this.equalEndMonth) {
            if (this.selectedDate.getDate() > this.endDate.getDate()) {
              this.selectedDate = new Date(this.selectedDate.setDate(this.endDate.getDate()));
            }
            if (this.equalEndDay) {
              if (this.selectedDate.getHours() > this.endDate.getHours()) {
                this.selectedDate = new Date(this.selectedDate.setHours(this.endDate.getHours()));
              }
              if (this.equalEndHour) {
                if (this.selectedDate.getMinutes() > this.endDate.getMinutes()) {
                  this.selectedDate = new Date(this.selectedDate.setMinutes(this.endDate.getMinutes()));
                }
              }
            }
          }
          if (this.equalStartYear && this.equalStartMonth) {
            if (this.selectedDate.getDate() < this.startDate.getDate()) {
              this.selectedDate = new Date(this.selectedDate.setDate(this.startDate.getDate()));
            }
            if (this.equalStartDay) {
              if (this.selectedDate.getHours() < this.startDate.getHours()) {
                this.selectedDate = new Date(this.selectedDate.setHours(this.startDate.getHours()));
              }
              if (this.equalStartHour) {
                if (this.selectedDate.getMinutes() < this.startDate.getMinutes()) {
                  this.selectedDate = new Date(this.selectedDate.setMinutes(this.startDate.getMinutes()));
                }
              }
            }
          }
        } else if (res.columnIndex == 2) {
          let day = this.dayArray[res.selected[2].index].day;
          this.selectedDate = new Date(this.selectedDate.setDate(day));
          if (this.equalEndYear && this.equalEndMonth && this.equalEndDay) {
            if (this.selectedDate.getHours() > this.endDate.getHours()) {
              this.selectedDate = new Date(this.selectedDate.setHours(this.endDate.getHours()));
            }
            if (this.equalEndHour) {
              if (this.selectedDate.getMinutes() > this.endDate.getMinutes()) {
                this.selectedDate = new Date(this.selectedDate.setMinutes(this.endDate.getMinutes()));
              }
            }
          }
          if (this.equalStartYear && this.equalStartMonth && this.equalStartDay) {
            if (this.selectedDate.getHours() < this.startDate.getHours()) {
              this.selectedDate = new Date(this.selectedDate.setHours(this.startDate.getHours()));
            }
            if (this.equalStartHour) {
              if (this.selectedDate.getMinutes() < this.startDate.getMinutes()) {
                this.selectedDate = new Date(this.selectedDate.setMinutes(this.startDate.getMinutes()));
              }
            }
          }
        } else if (res.columnIndex == 3) {
          let hour = this.hourArray[res.selected[3].index].hour;
          this.selectedDate = new Date(this.selectedDate.setHours(hour));
          if (this.equalEndYear && this.equalEndMonth && this.equalEndDay && this.equalEndHour) {
            if (this.selectedDate.getMinutes() > this.endDate.getMinutes()) {
              this.selectedDate = new Date(this.selectedDate.setMinutes(this.endDate.getMinutes()));
            }
          }
          if (this.equalStartYear && this.equalStartMonth && this.equalStartDay && this.equalStartHour) {
            if (this.selectedDate.getMinutes() < this.startDate.getMinutes()) {
              this.selectedDate = new Date(this.selectedDate.setMinutes(this.startDate.getMinutes()));
            }
          }
        } else if (res.columnIndex == 4) {
          let min = this.minArray[res.selected[4].index].min;
          this.selectedDate = new Date(this.selectedDate.setMinutes(min));
        }
      } else if (this.mode == "time") {
        if (res.columnIndex == 0) {
          let hour = this.hourArray[res.selected[0].index].hour;
          this.selectedDate = new Date(this.selectedDate.setHours(hour));
          if (this.equalEndYear && this.equalEndMonth && this.equalEndDay && this.equalEndHour) {
            if (this.selectedDate.getMinutes() > this.endDate.getMinutes()) {
              this.selectedDate = new Date(this.selectedDate.setMinutes(this.endDate.getMinutes()));
            }
          }
          if (this.equalStartYear && this.equalStartMonth && this.equalStartDay && this.equalStartHour) {
            if (this.selectedDate.getMinutes() < this.startDate.getMinutes()) {
              this.selectedDate = new Date(this.selectedDate.setMinutes(this.startDate.getMinutes()));
            }
          }
        } else if (res.columnIndex == 1) {
          let min = this.minArray[res.selected[1].index].min;
          this.selectedDate = new Date(this.selectedDate.setMinutes(min));
        }
      }
    },
    bindConfirm() {
      let year = this.selectedDate.getFullYear();
      let month = this.selectedDate.getMonth() + 1;
      let date2 = this.selectedDate.getDate();
      let hour = this.selectedDate.getHours();
      let minute = this.selectedDate.getMinutes();
      if (this.mode == "date") {
        let iosFormat = year + "/" + (month < 10 ? "0" + month : month) + "/" + (date2 < 10 ? "0" + date2 : date2);
        let format = year + "-" + (month < 10 ? "0" + month : month) + "-" + (date2 < 10 ? "0" + date2 : date2);
        this.$emit("confirm", {
          year,
          month,
          date: date2,
          value: this.selectedDate,
          iosFormat,
          format
        });
      } else if (this.mode == "datetime") {
        let iosFormat = year + "/" + (month < 10 ? "0" + month : month) + "/" + (date2 < 10 ? "0" + date2 : date2) + " " + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
        let format = year + "-" + (month < 10 ? "0" + month : month) + "-" + (date2 < 10 ? "0" + date2 : date2) + " " + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
        this.$emit("confirm", {
          year,
          month,
          date: date2,
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
      let date2 = this.selectedDate.getDate();
      let hour = this.selectedDate.getHours();
      let minute = this.selectedDate.getMinutes();
      if (this.mode == "date") {
        let iosFormat = year + "/" + (month < 10 ? "0" + month : month) + "/" + (date2 < 10 ? "0" + date2 : date2);
        let format = year + "-" + (month < 10 ? "0" + month : month) + "-" + (date2 < 10 ? "0" + date2 : date2);
        this.$emit("cancel", {
          year,
          month,
          date: date2,
          value: this.selectedDate,
          iosFormat,
          format
        });
      } else if (this.mode == "datetime") {
        let iosFormat = year + "/" + (month < 10 ? "0" + month : month) + "/" + (date2 < 10 ? "0" + date2 : date2) + " " + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
        let format = year + "-" + (month < 10 ? "0" + month : month) + "-" + (date2 < 10 ? "0" + date2 : date2) + " " + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
        this.$emit("cancel", {
          year,
          month,
          date: date2,
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
const DatePicker = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["render", _sfc_render$V], ["__scopeId", "data-v-79d58c59"]]);
DatePicker.install = (app) => {
  app.component(DatePicker.name, DatePicker);
};
const dateNativePicker_vue_vue_type_style_index_0_scoped_488066b4_lang = "";
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
      ios: obj$1.platform.os().ios
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
        let date2 = this.dateParse(this.$el.value);
        if (date2) {
          if (this.min) {
            let minTime = this.min.getTime();
            if (date2.getTime() < minTime) {
              this.$emit("error", "\u9009\u62E9\u7684\u65F6\u95F4\u5C0F\u4E8E\u9650\u5B9A\u6700\u5C0F\u65F6\u95F4");
              return;
            }
          }
          if (this.max) {
            let maxTime = this.max.getTime();
            if (date2.getTime() > maxTime) {
              this.$emit("error", "\u9009\u62E9\u7684\u65F6\u95F4\u5927\u4E8E\u9650\u5B9A\u6700\u5927\u65F6\u95F4");
              return;
            }
          }
        }
        this.$emit("update:modelValue", date2);
        this.$emit("change", date2);
      }
    },
    selectDateForAndroid() {
      if (!this.ios) {
        let date2 = this.dateParse(this.$el.value);
        if (date2) {
          if (this.min) {
            let minTime = this.min.getTime();
            if (date2.getTime() < minTime) {
              this.$emit("error", "\u9009\u62E9\u7684\u65F6\u95F4\u5C0F\u4E8E\u9650\u5B9A\u6700\u5C0F\u65F6\u95F4");
              return;
            }
          }
          if (this.max) {
            let maxTime = this.max.getTime();
            if (date2.getTime() > maxTime) {
              this.$emit("error", "\u9009\u62E9\u7684\u65F6\u95F4\u5927\u4E8E\u9650\u5B9A\u6700\u5927\u65F6\u95F4");
              return;
            }
          }
        }
        this.$emit("update:modelValue", date2);
        this.$emit("change", date2);
      }
    },
    dateParse(value) {
      if (value) {
        if (this.type == "date") {
          let obj2 = this.dateParseDate(value);
          let d = new Date();
          d.setFullYear(obj2.year);
          d.setMonth(obj2.month - 1);
          d.setDate(obj2.date);
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
          let obj2 = this.dateParseDate(value);
          let d = new Date();
          d.setFullYear(obj2.year);
          d.setMonth(obj2.month - 1);
          return d;
        } else if (this.type == "time") {
          let obj2 = this.dateParseTime(value);
          let d = new Date();
          d.setHours(obj2.hour);
          d.setMinutes(obj2.min);
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
      let date2 = Number(dateArray[2]);
      return {
        year,
        month,
        date: date2
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
const DateNativePicker = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["render", _sfc_render$U], ["__scopeId", "data-v-488066b4"]]);
DateNativePicker.install = (app) => {
  app.component(DateNativePicker.name, DateNativePicker);
};
const input_vue_vue_type_style_index_0_scoped_b39b58ed_lang = "";
const _sfc_main$T = {
  name: "m-input",
  data() {
    return {
      focus: false
    };
  },
  emits: ["update:modelValue", "update:date", "left-click", "right-click", "focus", "blur", "input", "clear"],
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
        if (obj$1.common.isObject(value)) {
          if (obj$1.number.isNumber(value.minRows) && obj$1.number.isNumber(value.maxRows)) {
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
        return [false, "none", "text", "decimal", "numeric", "tel", "search", "email", "url"].includes(value);
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
      if (obj$1.common.isObject(this.leftIcon)) {
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
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.url == "string") {
          url = this.leftIcon.url;
        }
      }
      return url;
    },
    leftIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.spin == "boolean") {
          spin = this.leftIcon.spin;
        }
      }
      return spin;
    },
    leftIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.size == "string") {
          size = this.leftIcon.size;
        }
      }
      return size;
    },
    leftIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.color == "string") {
          color2 = this.leftIcon.color;
        }
      }
      return color2;
    },
    rightIconType() {
      let type = null;
      if (obj$1.common.isObject(this.rightIcon)) {
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
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.url == "string") {
          url = this.rightIcon.url;
        }
      }
      return url;
    },
    rightIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.spin == "boolean") {
          spin = this.rightIcon.spin;
        }
      }
      return spin;
    },
    rightIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.size == "string") {
          size = this.rightIcon.size;
        }
      }
      return size;
    },
    rightIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.color == "string") {
          color2 = this.rightIcon.color;
        }
      }
      return color2;
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
      if (obj$1.common.isObject(this.autosize)) {
        if (obj$1.number.isNumber(this.autosize.minRows)) {
          if (this.rows < this.autosize.minRows) {
            rows = this.autosize.minRows;
          }
        }
        if (obj$1.number.isNumber(this.autosize.maxRows)) {
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
      if (this.autosize == true || obj$1.common.isObject(this.autosize)) {
        this.autosizeSet();
      }
    }
  },
  watch: {
    realValue(newValue) {
      if (this.$refs.textarea && (this.autosize == true || obj$1.common.isObject(this.autosize))) {
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
        if (this.$refs.textarea && (this.autosize == true || obj$1.common.isObject(this.autosize))) {
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
      this.$refs.textarea.style.height = obj$1.element.getScrollHeight(this.$refs.textarea) + "px";
    },
    rows2Height(rows) {
      let lineHeight = Math.floor(parseFloat(obj$1.element.getCssStyle(this.$refs.textarea, "line-height")));
      return rows * lineHeight;
    },
    setMaxMinHeight() {
      if (obj$1.common.isObject(this.autosize)) {
        if (obj$1.number.isNumber(this.autosize.maxRows)) {
          let maxHeight = this.rows2Height(this.autosize.maxRows);
          this.$refs.textarea.style.maxHeight = maxHeight + "px";
        }
        if (obj$1.number.isNumber(this.autosize.minRows)) {
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
          let date2 = this.date.getDate() < 10 ? "0" + this.date.getDate() : this.date.getDate();
          if (this.format == "yyyy\u5E74mm\u6708dd\u65E5") {
            return year + "\u5E74" + month + "\u6708" + date2 + "\u65E5";
          } else if (this.format == "yyyy/mm/dd") {
            return year + "/" + month + "/" + date2;
          } else if (this.format == "yyyy.mm.dd") {
            return year + "." + month + "." + date2;
          } else {
            return year + "-" + month + "-" + date2;
          }
        } else if (this.dateType == "datetime") {
          let year = this.date.getFullYear();
          let month = this.date.getMonth() + 1 < 10 ? "0" + (this.date.getMonth() + 1) : this.date.getMonth() + 1;
          let date2 = this.date.getDate() < 10 ? "0" + this.date.getDate() : this.date.getDate();
          let hour = this.date.getHours() < 10 ? "0" + this.date.getHours() : this.date.getHours();
          let minutes = this.date.getMinutes() < 10 ? "0" + this.date.getMinutes() : this.date.getMinutes();
          if (this.format == "yyyy\u5E74MM\u6708dd\u65E5hh\u65F6mm\u5206") {
            return year + "\u5E74" + month + "\u6708" + date2 + "\u65E5" + hour + "\u65F6" + minutes + "\u5206";
          } else if (this.format == "yyyy\u5E74MM\u6708dd\u65E5 hh:mm") {
            return year + "\u5E74" + month + "\u6708" + date2 + "\u65E5 " + hour + ":" + minutes;
          } else if (this.format == "yyyy/MM/dd hh:mm") {
            return year + "/" + month + "/" + date2 + " " + hour + ":" + minutes;
          } else if (this.format == "yyyy.MM.dd hh:mm") {
            return year + "." + month + "." + date2 + " " + hour + ":" + minutes;
          } else {
            return year + "-" + month + "-" + date2 + " " + hour + ":" + minutes;
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
const _hoisted_3$s = ["placeholder", "maxlength", "disabled", "readonly", "autofocus", "rows", "name"];
const _hoisted_4$l = ["type", "inputmode", "placeholder", "maxlength", "disabled", "readonly", "autofocus", "name"];
const _hoisted_5$g = {
  key: 6,
  class: "mvi-input-words"
};
function _sfc_render$T(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_DateNativePicker = resolveComponent("DateNativePicker");
  return openBlock(), createElementBlock("div", {
    disabled: $props.disabled || null,
    class: normalizeClass(["mvi-input-container", "mvi-input-container-" + $props.size, $props.border ? "mvi-input-border" : "", $props.showWordLimit && $props.maxlength > 0 ? "mvi-input-container-words" : "", $props.required ? "mvi-input-required" : ""]),
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
    }, null, 44, _hoisted_3$s)), [
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
    }, null, 44, _hoisted_4$l)), [
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
    _ctx.$slots.right || $options.rightIconUrl || $options.rightIconType ? (openBlock(), createElementBlock("div", {
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
    $props.showWordLimit && $props.maxlength > 0 ? (openBlock(), createElementBlock("div", _hoisted_5$g, toDisplayString($options.realValue.length) + "/" + toDisplayString($props.maxlength), 1)) : createCommentVNode("", true),
    $options.isDatePicker ? (openBlock(), createBlock(_component_DateNativePicker, {
      key: 7,
      ref: "datepicker",
      type: $options.dateType,
      modelValue: $options.realDate,
      "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $options.realDate = $event)
    }, null, 8, ["type", "modelValue"])) : createCommentVNode("", true)
  ], 10, _hoisted_1$E);
}
const Input = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$T], ["__scopeId", "data-v-b39b58ed"]]);
Input.install = (app) => {
  app.component(Input.name, Input);
};
const modal_vue_vue_type_style_index_0_scoped_5d85d1ae_lang = "";
const _sfc_main$S = {
  name: "m-modal",
  data() {
    return {
      modalShow: false,
      firstShow: false
    };
  },
  emits: ["update:modelValue", "show", "showing", "shown", "hide", "hidding", "hidden"],
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
      if (obj$1.common.isObject(this.timesIcon)) {
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
      if (obj$1.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.url == "string") {
          url = this.timesIcon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.spin == "boolean") {
          spin = this.timesIcon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (obj$1.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.size == "string") {
          size = this.timesIcon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.timesIcon)) {
        if (typeof this.timesIcon.color == "string") {
          color2 = this.timesIcon.color;
        }
      }
      return color2;
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
      if (obj$1.data.get(el, "mvi-modal-beforeEnter-trigger")) {
        return;
      }
      obj$1.data.set(el, "mvi-modal-beforeEnter-trigger", true);
      this.$emit("show", el);
      if (typeof this.modalComponentWatch == "function") {
        this.modalComponentWatch.apply(this, ["show", el]);
      }
    },
    enter(el) {
      if (obj$1.data.get(el, "mvi-modal-enter-trigger")) {
        return;
      }
      obj$1.data.set(el, "mvi-modal-enter-trigger", true);
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
      obj$1.data.remove(el, "mvi-modal-beforeEnter-trigger");
      obj$1.data.remove(el, "mvi-modal-enter-trigger");
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
const _hoisted_3$r = ["innerHTML"];
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
                }, null, 8, _hoisted_3$r)) : createCommentVNode("", true)
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
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$S], ["__scopeId", "data-v-5d85d1ae"]]);
Modal.install = (app) => {
  app.component(Modal.name, Modal);
};
const dialog_vue_vue_type_style_index_0_scoped_9b51ed16_lang = "";
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
      } else if (obj$1.common.isObject(this.message)) {
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
      if (obj$1.common.isObject(this.input)) {
        if (typeof this.input.placeholder == "string") {
          input.placeholder = this.input.placeholder;
        }
        if (typeof this.input.type == "string" && this.input.type) {
          input.type = this.input.type;
        }
        if (typeof this.input.autofocus == "boolean") {
          input.autofocus = this.input.autofocus;
        }
        if (obj$1.number.isNumber(this.input.maxlength)) {
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
        if (typeof this.input.value == "string" || obj$1.number.isNumber(this.input.value)) {
          input.value = this.input.value.toString();
        }
      }
      return input;
    },
    computedZIndex() {
      if (obj$1.number.isNumber(this.zIndex)) {
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
      if (obj$1.number.isNumber(this.timeout)) {
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
      if ([false, "none", "text", "decimal", "numeric", "tel", "search", "email", "url"].includes(this.computedInput.mode)) {
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
    obj$1.event.on(this.$$el, "click.dialog", this.overlayClick);
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
        this.dialogComponentWatch.apply(this, ["hidding", this.type, el]);
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
        this.dialogComponentWatch.apply(this, ["showing", this.type, el]);
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
const _hoisted_3$q = ["innerHTML"];
const _hoisted_4$k = ["type", "placeholder", "maxlength", "inputmode"];
const _hoisted_5$f = { class: "mvi-dialog-footer" };
const _hoisted_6$b = ["textContent"];
const _hoisted_7$a = ["textContent"];
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
      createElementVNode("div", _hoisted_5$f, [
        $props.type != "alert" ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "mvi-dialog-cancel",
          textContent: toDisplayString($options.computedBtnText[1]),
          onClick: _cache[4] || (_cache[4] = (...args) => $options.cancelFun && $options.cancelFun(...args)),
          style: normalizeStyle({ color: $options.computedBtnColor[1] || "" })
        }, null, 12, _hoisted_6$b)) : createCommentVNode("", true),
        createElementVNode("div", {
          class: "mvi-dialog-ok",
          textContent: toDisplayString($props.type == "alert" ? $options.computedBtnText : $options.computedBtnText[0]),
          onClick: _cache[5] || (_cache[5] = (...args) => $options.okFun && $options.okFun(...args)),
          style: normalizeStyle({ color: $props.type == "alert" ? $options.computedBtnColor || "" : $options.computedBtnColor[0] || "" })
        }, null, 12, _hoisted_7$a)
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
        }, null, 8, _hoisted_3$q)) : createCommentVNode("", true),
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
          }, null, 46, _hoisted_4$k), [
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
const dialogComponent = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$R], ["__scopeId", "data-v-9b51ed16"]]);
const dialogPc_vue_vue_type_style_index_0_scoped_988f0370_lang = "";
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
      } else if (obj$1.common.isObject(this.message)) {
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
      if (obj$1.common.isObject(this.btns)) {
        if (obj$1.common.isObject(this.btns.ok)) {
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
        if (obj$1.common.isObject(this.btns.cancel)) {
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
      if (obj$1.common.isObject(this.input)) {
        if (typeof this.input.placeholder == "string") {
          input.placeholder = this.input.placeholder;
        }
        if (typeof this.input.type == "string" && this.input.type) {
          input.type = this.input.type;
        }
        if (typeof this.input.autofocus == "boolean") {
          input.autofocus = this.input.autofocus;
        }
        if (obj$1.number.isNumber(this.input.maxlength)) {
          input.maxlength = this.input.maxlength;
        }
        if (typeof this.input.clearable == "boolean") {
          input.clearable = this.input.clearable;
        }
        if (typeof this.input.align == "string") {
          input.align = this.input.align;
        }
        if (typeof this.input.value == "string" || obj$1.number.isNumber(this.input.value)) {
          input.value = this.input.value.toString();
        }
      }
      return input;
    },
    computedZIndex() {
      if (obj$1.number.isNumber(this.zIndex)) {
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
      if (obj$1.number.isNumber(this.timeout)) {
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
    obj$1.event.on(this.$$el, "click.dialog", this.overlayClick);
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
        this.dialogComponentWatch.apply(this, ["hidding", this.type, el]);
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
        this.dialogComponentWatch.apply(this, ["showing", this.type, el]);
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
const _hoisted_3$p = ["type", "placeholder", "maxlength"];
const _hoisted_4$j = { class: "mvi-dialog-footer" };
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
          }, null, 46, _hoisted_3$p), [
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
        createElementVNode("div", _hoisted_4$j, [
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
const dialogPcComponent = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$Q], ["__scopeId", "data-v-988f0370"]]);
const Dialog = {
  initParams: (type, options) => {
    let opts = {};
    if (obj$1.common.isObject(options)) {
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
      let mountNode = obj$1.element.string2dom("<div></div>");
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
      let mountNode = obj$1.element.string2dom("<div></div>");
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
      let mountNode = obj$1.element.string2dom("<div></div>");
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
      let mountNode = obj$1.element.string2dom("<div></div>");
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
      let mountNode = obj$1.element.string2dom("<div></div>");
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
      let mountNode = obj$1.element.string2dom("<div></div>");
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
const toast_vue_vue_type_style_index_0_scoped_1b5d422a_lang = "";
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
      } else if (obj$1.common.isObject(this.icon)) {
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
      } else if (obj$1.common.isObject(this.message)) {
        return JSON.stringify(this.message);
      } else {
        return String(this.message);
      }
    },
    computedTimeout() {
      if (obj$1.number.isNumber(this.timeout) && this.timeout > 0) {
        return this.timeout;
      } else {
        return -1;
      }
    },
    computedZIndex() {
      if (obj$1.number.isNumber(this.zIndex)) {
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
          $options.computedType == "loading" && !$options.computedIcon.type && !$options.computedIcon.url ? (openBlock(), createBlock(_component_Loading, {
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
const ToastComponent = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$P], ["__scopeId", "data-v-1b5d422a"]]);
const Toast = {
  initParams: (options) => {
    let opts = {};
    if (obj$1.common.isObject(options)) {
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
      let mountNode = obj$1.element.string2dom("<div></div>");
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
const msgbox_vue_vue_type_style_index_0_scoped_3c12c199_lang = "";
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
      } else if (obj$1.common.isObject(this.message)) {
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
      if (obj$1.number.isNumber(this.timeout) && this.timeout > 0) {
        return this.timeout;
      } else {
        return 1500;
      }
    },
    computedZIndex() {
      if (obj$1.number.isNumber(this.zIndex)) {
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
const MsgboxComponent = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$O], ["__scopeId", "data-v-3c12c199"]]);
const Msgbox = {
  initParams: (options) => {
    let opts = {};
    if (obj$1.common.isObject(options)) {
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
      let mountNode = obj$1.element.string2dom("<div></div>");
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
const numberKeyboard_vue_vue_type_style_index_0_scoped_407940ed_lang = "";
const _sfc_main$N = {
  name: "m-number-keyboard",
  data() {
    return {
      firstShow: false,
      keyboardShow: false,
      numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "X", ".", "0"]
    };
  },
  emits: ["update:modelValue", "input", "delete", "complete", "update:show", "show", "showing", "shown", "hide", "hidding", "hidden"],
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
        if (obj$1.number.isNumber(this.modelValue)) {
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
      let value = obj$1.string.delete(this.computedValue, this.computedValue.length - 1, 1);
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
      if (obj$1.data.get(el, "mvi-keyboard-beforeEnter-trigger")) {
        return;
      }
      obj$1.data.set(el, "mvi-keyboard-beforeEnter-trigger", true);
      this.$emit("show", el);
      if (typeof this.keyboardComponentWatch == "function") {
        this.keyboardComponentWatch.apply(this, ["show", el]);
      }
    },
    enter(el) {
      if (obj$1.data.get(el, "mvi-keyboard-enter-trigger")) {
        return;
      }
      obj$1.data.set(el, "mvi-keyboard-enter-trigger", true);
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
      obj$1.data.remove(el, "mvi-keyboard-beforeEnter-trigger");
      obj$1.data.remove(el, "mvi-keyboard-enter-trigger");
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
const _hoisted_3$o = ["onClick"];
const _hoisted_4$i = {
  key: 0,
  class: "mvi-number-keyboard-right"
};
const _hoisted_5$e = ["disabled"];
const _hoisted_6$a = ["textContent"];
const _hoisted_7$9 = ["disabled"];
const _hoisted_8$8 = ["textContent"];
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
                    }, toDisplayString(item), 11, _hoisted_3$o)
                  ], 2);
                }), 256))
              ]),
              $props.showComplete || $props.showDelete ? (openBlock(), createElementBlock("div", _hoisted_4$i, [
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
                    }, null, 8, _hoisted_6$a))
                  ], 10, _hoisted_5$e)
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
                    }, null, 8, _hoisted_8$8)
                  ], 10, _hoisted_7$9)
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
const NumberKeyboard = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$N], ["__scopeId", "data-v-407940ed"]]);
NumberKeyboard.install = (app) => {
  app.component(NumberKeyboard.name, NumberKeyboard);
};
const search_vue_vue_type_style_index_0_scoped_2fe1239b_lang = "";
const _sfc_main$M = {
  name: "m-search",
  emits: ["update:modelValue", "search", "cancel", "left-click", "right-click", "focus", "blur", "input", "clear"],
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
        return [false, "none", "text", "decimal", "numeric", "tel", "search", "email", "url"];
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
      if (obj$1.common.isObject(this.leftIcon)) {
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
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.url == "string") {
          url = this.leftIcon.url;
        }
      }
      return url;
    },
    leftIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.spin == "boolean") {
          spin = this.leftIcon.spin;
        }
      }
      return spin;
    },
    leftIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.size == "string") {
          size = this.leftIcon.size;
        }
      }
      return size;
    },
    leftIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.color == "string") {
          color2 = this.leftIcon.color;
        }
      }
      return color2;
    },
    rightIconType() {
      let type = null;
      if (obj$1.common.isObject(this.rightIcon)) {
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
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.url == "string") {
          url = this.rightIcon.url;
        }
      }
      return url;
    },
    rightIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.spin == "boolean") {
          spin = this.rightIcon.spin;
        }
      }
      return spin;
    },
    rightIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.size == "string") {
          size = this.rightIcon.size;
        }
      }
      return size;
    },
    rightIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.color == "string") {
          color2 = this.rightIcon.color;
        }
      }
      return color2;
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
const _hoisted_3$n = ["type", "placeholder", "maxlength", "autofocus", "disabled", "readonly", "inputmode"];
const _hoisted_4$h = ["textContent"];
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
      }, null, 44, _hoisted_3$n), [
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
    }, null, 10, _hoisted_4$h)) : createCommentVNode("", true)
  ], 8, _hoisted_1$x);
}
const Search = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$M], ["__scopeId", "data-v-2fe1239b"]]);
Search.install = (app) => {
  app.component(Search.name, Search);
};
const progress_vue_vue_type_style_index_0_scoped_6f0aa845_lang = "";
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
        return Math.round((this.value - this.min < 0 ? 0 : this.value - this.min) / (this.max - this.min) * 100) + "%";
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
const Progress = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$L], ["__scopeId", "data-v-6f0aa845"]]);
Progress.install = (app) => {
  app.component(Progress.name, Progress);
};
const slider_vue_vue_type_style_index_0_scoped_3d7fcffa_lang = "";
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
      let percent = obj$1.number.divide(obj$1.number.subtract(this.modelValue, this.min), obj$1.number.subtract(this.max, this.min));
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
        let value = obj$1.number.add(obj$1.number.mutiply(obj$1.number.divide(obj$1.number.add(top, obj$1.number.divide(this.$refs.btn.offsetHeight, 2)), this.$el.offsetHeight), obj$1.number.subtract(this.max, this.min)), this.min);
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      } else {
        let left = res.placement.left;
        let value = obj$1.number.add(obj$1.number.mutiply(obj$1.number.divide(obj$1.number.add(left, obj$1.number.divide(this.$refs.btn.offsetWidth, 2)), this.$el.offsetWidth), obj$1.number.subtract(this.max - this.min)), this.min);
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      }
    },
    setBtnOffset() {
      if (this.vertical) {
        this.$refs.btn.style.left = "50%";
        this.$refs.btn.style.top = obj$1.number.subtract(obj$1.number.mutiply(obj$1.number.divide(obj$1.number.subtract(this.modelValue, this.min), obj$1.number.subtract(this.max - this.min)), this.$el.offsetHeight), obj$1.number.divide(this.$refs.btn.offsetHeight, 2)) + "px";
      } else {
        this.$refs.btn.style.top = "50%";
        this.$refs.btn.style.left = obj$1.number.subtract(obj$1.number.mutiply(obj$1.number.divide(obj$1.number.subtract(this.modelValue, this.min), obj$1.number.subtract(this.max - this.min)), this.$el.offsetWidth), obj$1.number.divide(this.$refs.btn.offsetWidth, 2)) + "px";
      }
    },
    dragTo(event2) {
      if (this.disabled) {
        return;
      }
      if (this.isdrag) {
        return;
      }
      if (obj$1.element.isContains(this.$refs.btn, event2.target)) {
        return;
      }
      if (this.vertical) {
        let top = event2.offsetY;
        let value = obj$1.number.add(obj$1.number.mutiply(obj$1.number.divide(top, this.$el.offsetHeight), obj$1.number.subtract(this.max, this.min)), this.min);
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      } else {
        let left = event2.offsetX;
        let value = obj$1.number.add(obj$1.number.mutiply(obj$1.number.divide(left, this.$el.offsetWidth), obj$1.number.subtract(this.max, this.min)), this.min);
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
const Slider = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$K], ["__scopeId", "data-v-3d7fcffa"]]);
Slider.install = (app) => {
  app.component(Slider.name, Slider);
};
const stepper_vue_vue_type_style_index_0_scoped_c266ea4a_lang = "";
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
      this.realValue = obj$1.number.subtract(this.realValue, this.step);
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
      this.realValue = obj$1.number.add(this.realValue, this.step);
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
const _hoisted_3$m = ["disabled"];
const _hoisted_4$g = ["disabled"];
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
      }, null, 44, _hoisted_3$m), [
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
    ], 14, _hoisted_4$g)) : createCommentVNode("", true)
  ], 2);
}
const Stepper = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$J], ["__scopeId", "data-v-c266ea4a"]]);
Stepper.install = (app) => {
  app.component(Stepper.name, Stepper);
};
const switch_vue_vue_type_style_index_0_scoped_be5a8c4c_lang = "";
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
      if (obj$1.common.isObject(this.icon)) {
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
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.url == "string") {
          url = this.icon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = true;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.spin == "boolean") {
          spin = this.icon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.size == "string") {
          size = this.icon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.color == "string") {
          color2 = this.icon.color;
        }
      }
      return color2;
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
const Switch = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$I], ["__scopeId", "data-v-be5a8c4c"]]);
Switch.install = (app) => {
  app.component(Switch.name, Switch);
};
const actionsheet_vue_vue_type_style_index_0_scoped_1a3573c6_lang = "";
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
        if (obj$1.common.isObject(icon)) {
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
        if (obj$1.common.isObject(icon)) {
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
        if (obj$1.common.isObject(icon)) {
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
        if (obj$1.common.isObject(icon)) {
          if (typeof icon.size == "string") {
            size = icon.size;
          }
        }
        return size;
      };
    },
    iconColor() {
      return (icon) => {
        let color2 = null;
        if (obj$1.common.isObject(icon)) {
          if (typeof icon.color == "string") {
            color2 = icon.color;
          }
        }
        return color2;
      };
    },
    itemClass() {
      return (item) => {
        let cls = ["mvi-acionsheet-item", "mvi-actionsheet-item-" + this.size];
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
const _withScopeId$1 = (n) => (pushScopeId("data-v-1a3573c6"), n = n(), popScopeId(), n);
const _hoisted_1$s = { class: "mvi-acionsheet" };
const _hoisted_2$p = ["textContent"];
const _hoisted_3$l = { class: "mvi-acionsheet-list" };
const _hoisted_4$f = ["disabled", "onClick"];
const _hoisted_5$d = {
  key: 1,
  class: "mvi-acionsheet-content"
};
const _hoisted_6$9 = ["textContent"];
const _hoisted_7$8 = ["textContent"];
const _hoisted_8$7 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("div", { class: "mvi-acionsheet-divider" }, null, -1));
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
        createElementVNode("div", _hoisted_3$l, [
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
              }, null, 8, ["size"])) : item.label || item.sub || $options.iconType(item.icon) || $options.iconUrl(item.icon) ? (openBlock(), createElementBlock("div", _hoisted_5$d, [
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
                }, null, 8, _hoisted_6$9)) : createCommentVNode("", true),
                item.sub ? (openBlock(), createElementBlock("span", {
                  key: 2,
                  class: "mvi-acionsheet-item-sub",
                  textContent: toDisplayString(item.sub)
                }, null, 8, _hoisted_7$8)) : createCommentVNode("", true),
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
            ], 14, _hoisted_4$f);
          }), 128))
        ]),
        _hoisted_8$7,
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
const Actionsheet = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$H], ["__scopeId", "data-v-1a3573c6"]]);
Actionsheet.install = (app) => {
  app.component(Actionsheet.name, Actionsheet);
};
const dropdown_vue_vue_type_style_index_0_scoped_a1883142_lang = "";
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
      if (obj$1.common.isObject(this.selectIcon)) {
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
      if (obj$1.common.isObject(this.selectIcon)) {
        if (typeof this.selectIcon.url == "string") {
          url = this.selectIcon.url;
        }
      }
      return url;
    },
    selectIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.selectIcon)) {
        if (typeof this.selectIcon.spin == "boolean") {
          spin = this.selectIcon.spin;
        }
      }
      return spin;
    },
    selectIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.selectIcon)) {
        if (typeof this.selectIcon.size == "string") {
          size = this.selectIcon.size;
        }
      }
      return size;
    },
    selectIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.selectIcon)) {
        if (typeof this.selectIcon.color == "string") {
          color2 = this.selectIcon.color;
        }
      }
      return color2;
    },
    iconType() {
      return (icon) => {
        let type = null;
        if (obj$1.common.isObject(icon)) {
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
        if (obj$1.common.isObject(icon)) {
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
        if (obj$1.common.isObject(icon)) {
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
        if (obj$1.common.isObject(icon)) {
          if (typeof icon.size == "string") {
            size = icon.size;
          }
        }
        return size;
      };
    },
    iconColor() {
      return (icon) => {
        let color2 = null;
        if (obj$1.common.isObject(icon)) {
          if (typeof icon.color == "string") {
            color2 = icon.color;
          }
        }
        return color2;
      };
    },
    equalValue() {
      return (item, index) => {
        if (item.value === void 0 || item.value === null) {
          return this.modelValue === index;
        }
        return obj$1.common.equal(this.modelValue, item.value);
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
      if (obj$1.common.equal(this.valueFilter(item.value, index), this.oldIndex)) {
        this.$emit("select", {
          item: Object.assign({}, item),
          index
        });
        if (this.selectClose) {
          this.doCancel();
        }
      } else {
        this.$emit("update:modelValue", this.valueFilter(item.value, index));
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
const _hoisted_3$k = { class: "mvi-dropdown-item-label" };
const _hoisted_4$e = ["textContent"];
const _hoisted_5$c = ["data-placement"];
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
            createElementVNode("div", _hoisted_3$k, [
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
              }, null, 8, _hoisted_4$e)
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
            ], 8, _hoisted_5$c)) : createCommentVNode("", true)
          ], 14, _hoisted_2$o);
        }), 128))
      ])
    ]),
    _: 1
  }, 8, ["model-value", "onOverlayClick", "overlay-color", "z-index", "timeout", "placement", "round", "use-padding", "mount-el"]);
}
const Dropdown = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$G], ["__scopeId", "data-v-a1883142"]]);
Dropdown.install = (app) => {
  app.component(Dropdown.name, Dropdown);
};
const notify_vue_vue_type_style_index_0_scoped_eeb8d5be_lang = "";
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
      } else if (obj$1.common.isObject(this.message)) {
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
      if (obj$1.number.isNumber(this.zIndex)) {
        return this.zIndex;
      } else {
        return 1100;
      }
    },
    computedTimeout() {
      if (obj$1.number.isNumber(this.timeout) && this.timeout > 0) {
        return this.timeout;
      } else {
        return 1500;
      }
    },
    iconType() {
      let type = null;
      if (obj$1.common.isObject(this.icon)) {
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
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.url == "string") {
          url = this.icon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.spin == "boolean") {
          spin = this.icon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.size == "string") {
          size = this.icon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.color == "string") {
          color2 = this.icon.color;
        }
      }
      return color2;
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
const NotifyComponent = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$F], ["__scopeId", "data-v-eeb8d5be"]]);
const Notify = {
  initParams: (options) => {
    let opts = {};
    if (obj$1.common.isObject(options)) {
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
      let mountNode = obj$1.element.string2dom("<div></div>");
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
const pullRefresh_vue_vue_type_style_index_0_scoped_cb3bd5c9_lang = "";
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
      if (obj$1.common.isObject(this.pullingIcon)) {
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
      if (obj$1.common.isObject(this.pullingIcon)) {
        if (typeof this.pullingIcon.url == "string") {
          url = this.pullingIcon.url;
        }
      }
      return url;
    },
    pullingIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.pullingIcon)) {
        if (typeof this.pullingIcon.spin == "boolean") {
          spin = this.pullingIcon.spin;
        }
      }
      return spin;
    },
    pullingIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.pullingIcon)) {
        if (typeof this.pullingIcon.size == "string") {
          size = this.pullingIcon.size;
        }
      }
      return size;
    },
    pullingIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.pullingIcon)) {
        if (typeof this.pullingIcon.color == "string") {
          color2 = this.pullingIcon.color;
        }
      }
      return color2;
    },
    loosingIconType() {
      let type = "arrow-up";
      if (obj$1.common.isObject(this.loosingIcon)) {
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
      if (obj$1.common.isObject(this.loosingIcon)) {
        if (typeof this.loosingIcon.url == "string") {
          url = this.loosingIcon.url;
        }
      }
      return url;
    },
    loosingIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.loosingIcon)) {
        if (typeof this.loosingIcon.spin == "boolean") {
          spin = this.loosingIcon.spin;
        }
      }
      return spin;
    },
    loosingIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.loosingIcon)) {
        if (typeof this.loosingIcon.size == "string") {
          size = this.loosingIcon.size;
        }
      }
      return size;
    },
    loosingIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.loosingIcon)) {
        if (typeof this.loosingIcon.color == "string") {
          color2 = this.loosingIcon.color;
        }
      }
      return color2;
    },
    loadingIconType() {
      let type = "load-e";
      if (obj$1.common.isObject(this.loadingIcon)) {
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
      if (obj$1.common.isObject(this.loadingIcon)) {
        if (typeof this.loadingIcon.url == "string") {
          url = this.loadingIcon.url;
        }
      }
      return url;
    },
    loadingIconSpin() {
      let spin = true;
      if (obj$1.common.isObject(this.loadingIcon)) {
        if (typeof this.loadingIcon.spin == "boolean") {
          spin = this.loadingIcon.spin;
        }
      }
      return spin;
    },
    loadingIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.loadingIcon)) {
        if (typeof this.loadingIcon.size == "string") {
          size = this.loadingIcon.size;
        }
      }
      return size;
    },
    loadingIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.loadingIcon)) {
        if (typeof this.loadingIcon.color == "string") {
          color2 = this.loadingIcon.color;
        }
      }
      return color2;
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
    obj$1.event.on(document.documentElement, `mousemove.pullRefresh_${this.uid}`, this.onPull2);
    obj$1.event.on(document.documentElement, `mouseup.pullRefresh_${this.uid}`, this.pulled2);
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
      if (obj$1.element.getScrollTop(this.$refs.wrapper) > 0) {
        this.firstStartY = this.startY;
        return;
      }
      let el = this.getScrollEl(event2.target);
      if (el != this.$refs.wrapper && obj$1.element.getScrollTop(el) > 0) {
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
      if (y > obj$1.element.rem2px(this.distance) - this.elHeight) {
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
      if (obj$1.element.getScrollTop(this.$refs.wrapper) > 0) {
        this.firstStartY = this.startY;
        return;
      }
      let el = this.getScrollEl(event2.target);
      if (el != this.$refs.wrapper && obj$1.element.getScrollTop(el) > 0) {
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
      if (y > obj$1.element.rem2px(this.distance) - this.elHeight) {
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
          this.translateY = obj$1.element.rem2px(this.distance) - this.elHeight;
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
      if (obj$1.element.getScrollHeight(el) > el.clientHeight) {
        return el;
      }
      return this.getScrollEl(el.parentNode);
    }
  },
  beforeUnmount() {
    obj$1.event.off(document.documentElement, `mousemove.pullRefresh_${this.uid} mouseup.pullRefresh_${this.uid}`);
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
const PullRefresh = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$E], ["__scopeId", "data-v-cb3bd5c9"]]);
PullRefresh.install = (app) => {
  app.component(PullRefresh.name, PullRefresh);
};
const swipeCell_vue_vue_type_style_index_0_scoped_0921ba8e_lang = "";
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
    obj$1.event.on(document.documentElement, `mousemove.swipeCell_${this.uid}`, this.cellMouseMove);
    obj$1.event.on(document.documentElement, `mouseup.swipeCell_${this.uid}`, this.cellMouseUp);
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
      if (Math.abs(moveX2) <= obj$1.element.rem2px(1)) {
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
      if (Math.abs(moveX2) <= obj$1.element.rem2px(1)) {
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
          this.setTransform(-this.$refs.right.offsetWidth).then(() => {
            this.$emit("open", placement);
          });
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
    obj$1.event.off(document.documentElement, `mousemove.swipeCell_${this.uid} mouseup.swipeCell_${this.uid}`);
  }
};
const _hoisted_1$o = ["disabled"];
const _hoisted_2$l = {
  ref: "left",
  class: "mvi-swipe-cell-left"
};
const _hoisted_3$j = {
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
    withDirectives(createElementVNode("div", _hoisted_3$j, [
      renderSlot(_ctx.$slots, "right", {}, void 0, true)
    ], 512), [
      [vShow, $data.rightShow]
    ])
  ], 44, _hoisted_1$o);
}
const SwipeCell = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$D], ["__scopeId", "data-v-0921ba8e"]]);
SwipeCell.install = (app) => {
  app.component(SwipeCell.name, SwipeCell);
};
const circleProgress_vue_vue_type_style_index_0_scoped_a8d5da29_lang = "";
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
      let width = obj$1.element.rem2px(this.strokeWidth);
      return `0 0 ${this.pathSize + 2 * width} ${this.pathSize + 2 * width}`;
    },
    pathD() {
      let width = obj$1.element.rem2px(this.strokeWidth);
      return `M ${this.pathSize / 2 + width} ${this.pathSize / 2 + width} m 0, -${this.pathSize / 2} a ${this.pathSize / 2}, ${this.pathSize / 2} 0 1, ${this.clockWise ? 1 : 0} 0, ${this.pathSize} a ${this.pathSize / 2}, ${this.pathSize / 2} 0 1, ${this.clockWise ? 1 : 0} 0, -${this.pathSize}`;
    },
    computedValue() {
      if (this.tipText) {
        return this.tipText;
      } else {
        let value = this.value > this.max ? this.max : this.value < this.min ? this.min : this.value;
        return Math.round((value - this.min) / (this.max - this.min) * 100) + "%";
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
      if (obj$1.number.isNumber(this.strokeWidth)) {
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
      let valueLength = Number(((value - this.min) / (this.max - this.min) * circleLength).toFixed(2));
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
      if (obj$1.number.isNumber(this.strokeWidth)) {
        style.strokeWidth = this.strokeWidth + "rem";
      }
      return style;
    }
  }
};
const _hoisted_1$n = ["viewBox"];
const _hoisted_2$k = ["d"];
const _hoisted_3$i = ["d"];
const _hoisted_4$d = {
  key: 0,
  class: "mvi-circle-progress-tip"
};
const _hoisted_5$b = ["textContent"];
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
      }, null, 12, _hoisted_3$i)
    ], 8, _hoisted_1$n)),
    $props.showTip ? (openBlock(), createElementBlock("div", _hoisted_4$d, [
      _ctx.$slots.tip ? renderSlot(_ctx.$slots, "tip", {
        key: 0,
        value: $props.value
      }, void 0, true) : (openBlock(), createElementBlock("span", {
        key: 1,
        class: normalizeClass($props.tipClass || ""),
        textContent: toDisplayString($options.computedValue)
      }, null, 10, _hoisted_5$b))
    ])) : createCommentVNode("", true)
  ], 4);
}
const CircleProgress = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$C], ["__scopeId", "data-v-a8d5da29"]]);
CircleProgress.install = (app) => {
  app.component(CircleProgress.name, CircleProgress);
};
const collapse_vue_vue_type_style_index_0_scoped_f5e3f2b2_lang = "";
const _sfc_main$B = {
  name: "m-collapse",
  data() {
    return {
      children: []
    };
  },
  emits: ["update:modelValue", "before-slide-down", "slide-down", "before-slide-up", "slide-up"],
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
const Collapse = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$B], ["__scopeId", "data-v-f5e3f2b2"]]);
Collapse.install = (app) => {
  app.component(Collapse.name, Collapse);
};
const transitionSlide_vue_vue_type_style_index_0_scoped_09bbaaec_lang = "";
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
        this.height = obj$1.element.getCssStyle(el, "height");
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
const TransitionSlide = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$A], ["__scopeId", "data-v-09bbaaec"]]);
TransitionSlide.install = (app) => {
  app.component(TransitionSlide.name, TransitionSlide);
};
const collapseItem_vue_vue_type_style_index_0_scoped_c6a57ad7_lang = "";
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
        return obj$1.common.equal(vm.uid, this.uid);
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
      } else if (obj$1.common.isObject(this.openArrow)) {
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
      } else if (obj$1.common.isObject(this.collapse.openArrow)) {
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
      } else if (obj$1.common.isObject(this.closeArrow)) {
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
      } else if (obj$1.common.isObject(this.collapse.closeArrow)) {
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
        if (obj$1.number.isNumber(this.collapse.modelValue)) {
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
        if (obj$1.number.isNumber(this.collapse.modelValue)) {
          if (this.collapse.modelValue == this.itemIndex) {
            this.collapse.$emit("update:modelValue", []);
          } else {
            this.collapse.$emit("update:modelValue", [this.collapse.modelValue, this.itemIndex]);
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
const CollapseItem = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$z], ["__scopeId", "data-v-c6a57ad7"]]);
CollapseItem.install = (app) => {
  app.component(CollapseItem.name, CollapseItem);
};
const divider_vue_vue_type_style_index_0_scoped_22f0fa1d_lang = "";
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
const Divider = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$y], ["__scopeId", "data-v-22f0fa1d"]]);
Divider.install = (app) => {
  app.component(Divider.name, Divider);
};
const roll_vue_vue_type_style_index_0_scoped_a1902ff5_lang = "";
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
        return ["linear", "ease", "ease-in", "ease-out", "ease-in-out"].includes(value);
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
      let obj2 = {};
      if (this.direction == "left") {
        obj2.left = "100%";
        obj2.right = "auto";
      } else if (this.direction == "right") {
        obj2.right = "100%";
        obj2.left = "auto";
      } else if (this.direction == "top") {
        obj2.top = "100%";
        obj2.bottom = "auto";
      } else if (this.direction == "bottom") {
        obj2.bottom = "100%";
        obj2.top = "auto";
      }
      return obj2;
    },
    containerStyle() {
      let style = {};
      if (this.rollEl) {
        style.height = obj$1.element.getCssStyle(this.rollEl, "height");
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
      let placement = obj$1.element.getElementPoint(this.$refs.roll, this.$el);
      let interval = 0;
      if (this.direction == "left") {
        interval = Math.round((placement.left + this.$refs.roll.offsetWidth) / (this.$el.offsetWidth + this.$refs.roll.offsetWidth) * this.interval);
      } else if (this.direction == "right") {
        interval = Math.round((placement.right + this.$refs.roll.offsetWidth) / (this.$el.offsetWidth + this.$refs.roll.offsetWidth) * this.interval);
      } else if (this.direction == "top") {
        interval = Math.round((placement.top + this.$refs.roll.offsetHeight) / (this.$el.offsetHeight + this.$refs.roll.offsetHeight) * this.interval);
      } else if (this.direction == "bottom") {
        interval = Math.round((placement.bottom + this.$refs.roll.offsetHeight) / (this.$el.offsetHeight + this.$refs.roll.offsetHeight) * this.interval);
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
      let placement = obj$1.element.getElementPoint(this.$refs.roll, this.$el);
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
const Roll = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$x], ["__scopeId", "data-v-a1902ff5"]]);
Roll.install = (app) => {
  app.component(Roll.name, Roll);
};
const panel_vue_vue_type_style_index_0_scoped_40801be3_lang = "";
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
const _hoisted_3$h = ["textContent"];
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
          }, null, 8, _hoisted_3$h))
        ], 2)) : createCommentVNode("", true)
      ]),
      _: 3
    }, 8, ["expand", "onBeforeSlideDown", "onSlideUp"])) : createCommentVNode("", true)
  ], 2);
}
const Panel = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$w], ["__scopeId", "data-v-40801be3"]]);
Panel.install = (app) => {
  app.component(Panel.name, Panel);
};
const steps_vue_vue_type_style_index_0_scoped_31e6f23e_lang = "";
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
      if (obj$1.common.isObject(this.activeIcon)) {
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
      if (obj$1.common.isObject(this.activeIcon)) {
        if (typeof this.activeIcon.url == "string") {
          url = this.activeIcon.url;
        }
      }
      return url;
    },
    activeIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.activeIcon)) {
        if (typeof this.activeIcon.spin == "boolean") {
          spin = this.activeIcon.spin;
        }
      }
      return spin;
    },
    activeIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.activeIcon)) {
        if (typeof this.activeIcon.size == "string") {
          size = this.activeIcon.size;
        }
      }
      return size;
    },
    activeIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.activeIcon)) {
        if (typeof this.activeIcon.color == "string") {
          color2 = this.activeIcon.color;
        }
      }
      return color2;
    },
    inactiveIconType() {
      let type = null;
      if (obj$1.common.isObject(this.inactiveIcon)) {
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
      if (obj$1.common.isObject(this.inactiveIcon)) {
        if (typeof this.inactiveIcon.url == "string") {
          url = this.inactiveIcon.url;
        }
      }
      return url;
    },
    inactiveIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.inactiveIcon)) {
        if (typeof this.inactiveIcon.spin == "boolean") {
          spin = this.inactiveIcon.spin;
        }
      }
      return spin;
    },
    inactiveIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.inactiveIcon)) {
        if (typeof this.inactiveIcon.size == "string") {
          size = this.inactiveIcon.size;
        }
      }
      return size;
    },
    inactiveIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.inactiveIcon)) {
        if (typeof this.inactiveIcon.color == "string") {
          color2 = this.inactiveIcon.color;
        }
      }
      return color2;
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
const Steps = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$v], ["__scopeId", "data-v-31e6f23e"]]);
Steps.install = (app) => {
  app.component(Steps.name, Steps);
};
const step_vue_vue_type_style_index_0_scoped_66ade3b3_lang = "";
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
        return obj$1.common.equal(vm.uid, this.uid);
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
        style.backgroundColor = obj$1.element.getCssStyle(this.steps.$el, "background-color");
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
const _hoisted_3$g = { class: "mvi-step-vertical-icon" };
const _hoisted_4$c = { class: "mvi-step-container" };
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
      createElementVNode("div", _hoisted_3$g, [
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
    createElementVNode("div", _hoisted_4$c, [
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
const Step = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$u], ["__scopeId", "data-v-66ade3b3"]]);
Step.install = (app) => {
  app.component(Step.name, Step);
};
const label_vue_vue_type_style_index_0_scoped_9dfecd86_lang = "";
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
        return ["default", "error", "info", "primary", "success", "warn"].includes(value);
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
const Label = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$t], ["__scopeId", "data-v-9dfecd86"]]);
Label.install = (app) => {
  app.component(Label.name, Label);
};
const swiper_vue_vue_type_style_index_0_scoped_1521b658_lang = "";
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
            width = obj$1.element.rem2px(parseFloat(this.height));
          } else if (this.height.includes("px")) {
            width = parseFloat(this.height);
          } else if (this.elm) {
            width = parseFloat(obj$1.element.getCssStyle(this.elm, "height"));
          }
        } else if (this.elm) {
          width = parseFloat(obj$1.element.getCssStyle(this.elm, "height"));
        }
      } else {
        if (this.width) {
          if (this.width.includes("rem")) {
            width = obj$1.element.rem2px(parseFloat(this.width));
          } else if (this.width.includes("px")) {
            width = parseFloat(this.width);
          } else if (this.elm) {
            width = parseFloat(obj$1.element.getCssStyle(this.elm, "width"));
          }
        } else if (this.elm) {
          width = parseFloat(obj$1.element.getCssStyle(this.elm, "width"));
        }
      }
      return Number(width.toFixed(2));
    },
    activeIndex() {
      let index = 0;
      if (this.totalMove <= 0) {
        index = this.mathNext(Math.abs(obj$1.number.divide(this.transform, this.slideSize)));
      } else {
        index = this.mathPrev(Math.abs(obj$1.number.divide(this.transform, this.slideSize)));
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
      obj$1.event.on(document.documentElement, `mousemove.swiper_${this.uid}`, this.swiperMouseMove);
      obj$1.event.on(document.documentElement, `mouseup.swiper_${this.uid}`, this.swiperMouseUp);
    }
    obj$1.event.on(window, `resize.swiper_${this.uid}`, this.resizeChange);
  },
  methods: {
    resizeChange() {
      this.sizeCounts++;
      this.transform = -obj$1.number.mutiply(this.activeIndex, this.slideSize);
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
          this.transform = obj$1.number.add(this.transform, obj$1.number.divide(move, this.amounts));
          this.start = end;
          return;
        }
      } else {
        if (this.transform <= -obj$1.number.mutiply(this.children.length - 1, this.slideSize)) {
          this.amounts++;
          this.transform = obj$1.number.add(this.transform, obj$1.number.divide(move, this.amounts));
          this.start = end;
          return;
        }
      }
      this.start = end;
      this.transform = obj$1.number.add(this.transform, move);
    },
    swiperTouchEnd(event2) {
      if (this.children.length == 0) {
        return;
      }
      if (!this.touchable) {
        return;
      }
      this.addTransition().then(() => {
        this.transform = -obj$1.number.mutiply(this.activeIndex, this.slideSize);
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
          this.transform = obj$1.number.add(this.transform, obj$1.number.divide(move, this.amounts));
          this.start = end;
          return;
        }
      } else {
        if (this.transform <= -obj$1.number.mutiply(this.children.length - 1, this.slideSize)) {
          this.amounts++;
          this.transform = obj$1.number.add(this.transform, obj$1.number.divide(move, this.amounts));
          this.start = end;
          return;
        }
      }
      this.start = end;
      this.transform = obj$1.number.add(this.transform, move);
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
        this.transform = -obj$1.number.mutiply(this.activeIndex, this.slideSize);
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
          this.transform = -obj$1.number.mutiply(this.computedInitalSlide, this.slideSize);
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
          if (this.transform == -obj$1.number.mutiply(this.children.length - 1, this.slideSize)) {
            this.removeTransition().then(() => {
              this.transform = -this.slideSize;
              this.$nextTick(() => {
                setTimeout(() => {
                  this.addTransition().then(() => {
                    if (this.indicatorsIndex != this.oldIndex) {
                      this.oldIndex = this.indicatorsIndex;
                      this.$emit("change", this.indicatorsIndex);
                    }
                    this.setAutoplay();
                    resolve();
                  });
                }, 50);
              });
            });
          } else if (this.transform == 0) {
            this.removeTransition().then(() => {
              this.transform = -obj$1.number.mutiply(this.children.length - 2, this.slideSize);
              this.$nextTick(() => {
                setTimeout(() => {
                  this.addTransition().then(() => {
                    if (this.indicatorsIndex != this.oldIndex) {
                      this.oldIndex = this.indicatorsIndex;
                      this.$emit("change", this.indicatorsIndex);
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
          if (this.transform <= -obj$1.number.mutiply(this.children.length - 1, this.slideSize)) {
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
            this.transform = obj$1.number.subtract(this.transform, this.slideSize);
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
            this.transform = obj$1.number.add(this.transform, this.slideSize);
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
    mathNext(number2) {
      const num = Math.floor(number2);
      const floor = obj$1.number.subtract(number2, num);
      if (floor >= 0.25) {
        return num + 1;
      } else {
        return num;
      }
    },
    mathPrev(number2) {
      const num = Math.floor(number2);
      const floor = obj$1.number.subtract(number2, num);
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
              this.transform = obj$1.number.add(this.transform, obj$1.number.mutiply(this.oldIndex - index, this.slideSize));
              setTimeout(() => {
                this.slideDone().then(() => {
                  this.apiDoSlide = false;
                  resolve();
                });
              }, this.speed);
            });
          } else {
            if (this.transform <= -obj$1.number.mutiply(this.children.length - 1, this.slideSize)) {
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
              this.transform = obj$1.number.subtract(this.transform, obj$1.number.mutiply(index - this.oldIndex, this.slideSize));
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
      obj$1.event.off(document.documentElement, `mousemove.swiper_${this.uid} mouseup.swiper_${this.uid}`);
    }
    obj$1.event.off(window, `resize.swiper_${this.uid}`);
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
const _hoisted_3$f = ["onClick"];
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
          }, null, 14, _hoisted_3$f)) : createCommentVNode("", true)
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
const Swiper = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$s], ["__scopeId", "data-v-1521b658"]]);
Swiper.install = (app) => {
  app.component(Swiper.name, Swiper);
};
const swiperSlide_vue_vue_type_style_index_0_scoped_1cd4abbd_lang = "";
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
        return obj$1.common.equal(vm.uid, this.uid);
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
const SwiperSlide = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r], ["__scopeId", "data-v-1cd4abbd"]]);
SwiperSlide.install = (app) => {
  app.component(SwiperSlide.name, SwiperSlide);
};
const tabs_vue_vue_type_style_index_0_scoped_39e4de23_lang = "";
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
    obj$1.event.on(window, `resize.tabs_${this.uid}`, this.setHeight);
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
      this.slideWidth = parseFloat(obj$1.element.getCssStyle(this.$refs.headers.querySelector(".mvi-tab-header-active"), "width"));
      this.slideLeft = obj$1.element.getElementPoint(this.$refs.headers.querySelector(".mvi-tab-header-active"), this.$refs.headers).left;
    }
  },
  beforeUnmount() {
    obj$1.event.off(window, `resize.tabs_${this.uid}`);
  }
};
const _hoisted_1$g = { class: "mvi-tabs" };
const _hoisted_2$g = ["data-type"];
const _hoisted_3$e = ["data-type", "onClick", "disabled"];
const _hoisted_4$b = ["innerHTML"];
const _hoisted_5$a = {
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
          }, null, 8, _hoisted_4$b)) : createCommentVNode("", true),
          item.placement == "right" && item.iconType || item.iconUrl ? (openBlock(), createBlock(_component_Icon, {
            key: 2,
            class: normalizeClass(["mvi-tab-icon", item.title ? "mvi-tab-icon-right" : ""]),
            type: item.iconType,
            url: item.iconUrl,
            spin: item.iconSpin,
            size: item.iconSize,
            color: item.iconColor
          }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
        ], 14, _hoisted_3$e);
      }), 128))
    ], 14, _hoisted_2$g),
    createElementVNode("div", _hoisted_5$a, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 512)
  ]);
}
const Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q], ["__scopeId", "data-v-39e4de23"]]);
Tabs.install = (app) => {
  app.component(Tabs.name, Tabs);
};
const tab_vue_vue_type_style_index_0_scoped_98909e9a_lang = "";
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
      if (obj$1.common.isObject(this.icon)) {
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
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.url == "string") {
          url = this.icon.url;
        }
      }
      return url;
    },
    iconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.spin == "boolean") {
          spin = this.icon.spin;
        }
      }
      return spin;
    },
    iconSize() {
      let size = null;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.size == "string") {
          size = this.icon.size;
        }
      }
      return size;
    },
    iconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.icon)) {
        if (typeof this.icon.color == "string") {
          color2 = this.icon.color;
        }
      }
      return color2;
    },
    tabIndex() {
      return this.tabs.children.findIndex((vm) => {
        return obj$1.common.equal(vm.uid, this.uid);
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
const Tab = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p], ["__scopeId", "data-v-98909e9a"]]);
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
    obj$1.event.on(window, `resize.table_${this.uid}`, this.columnsAlign);
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
        this.isScroll = obj$1.element.getScrollHeight(this.$refs.body) > this.$refs.body.clientHeight;
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
          if (obj$1.number.isNumber(a[column.key]) && obj$1.number.isNumber(b[column.key])) {
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
          if (obj$1.number.isNumber(a[column.key]) && obj$1.number.isNumber(b[column.key])) {
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
    obj$1.event.off(window, `resize.table_${this.uid}`);
  }
};
const _hoisted_1$f = {
  cellpadding: "0",
  cellspacing: "0"
};
const _hoisted_2$f = ["innerHTML"];
const _hoisted_3$d = {
  key: 2,
  class: "mvi-table-sortable"
};
const _hoisted_4$a = {
  key: 1,
  class: "mvi-table-loading"
};
const _hoisted_5$9 = ["innerHTML"];
const _hoisted_6$8 = ["innerHTML"];
const _hoisted_7$7 = {
  cellpadding: "0",
  cellspacing: "0"
};
const _hoisted_8$6 = ["onClick"];
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
                  item.sortable ? (openBlock(), createElementBlock("span", _hoisted_3$d, [
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
    $props.loading ? (openBlock(), createElementBlock("div", _hoisted_4$a, [
      createElementVNode("div", null, [
        createVNode(_component_Loading, {
          color: "#c8c9cc",
          size: "0.3rem"
        }),
        createElementVNode("div", {
          class: "mvi-table-loading-text",
          innerHTML: $props.loadText
        }, null, 8, _hoisted_5$9)
      ])
    ])) : $data.sortData.length == 0 ? (openBlock(), createElementBlock("div", {
      key: 2,
      class: "mvi-table-no-data",
      innerHTML: $props.noDataMsg
    }, null, 8, _hoisted_6$8)) : (openBlock(), createElementBlock("div", {
      key: 3,
      class: "mvi-table-body",
      style: normalizeStyle($options.bodyStyle),
      ref: "body"
    }, [
      createElementVNode("table", _hoisted_7$7, [
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
                ], 10, _hoisted_8$6);
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
const calendar_vue_vue_type_style_index_0_scoped_43ece536_lang = "";
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
        return ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"];
      },
      validator(value) {
        if (value.length != 12) {
          return false;
        }
        return value.every((item) => {
          return obj$1.number.isNumber(item) || typeof item == "string" && item;
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
          return obj$1.number.isNumber(item) || typeof item == "string" && item;
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
        let date2 = new Date();
        date2.setFullYear(i);
        date2.setMonth(this.modelValue.getMonth());
        date2.setDate(this.modelValue.getDate());
        arr.push({
          date: date2,
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
        let date2 = new Date();
        date2.setFullYear(this.modelValue.getFullYear());
        date2.setMonth(i);
        date2.setDate(this.modelValue.getDate());
        arr.push({
          date: date2,
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
      let total = obj$1.date.getDays(this.modelValue.getFullYear(), this.modelValue.getMonth() + 1);
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
        let prevDate = obj$1.date.getDateBefore(pd, 1);
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
        let nextDate = obj$1.date.getDateAfter(ld, 1);
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
          } else if (obj$1.common.isObject(this.currentClass) && typeof this.currentClass.year == "string" && this.currentClass.year) {
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
          } else if (obj$1.common.isObject(this.currentClass) && typeof this.currentClass.month == "string" && this.currentClass.month) {
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
          } else if (obj$1.common.isObject(this.currentClass) && typeof this.currentClass.date == "string" && this.currentClass.date) {
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
          } else if (obj$1.common.isObject(this.nowClass) && typeof this.nowClass.year == "string" && this.nowClass.year) {
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
          } else if (obj$1.common.isObject(this.nowClass) && typeof this.nowClass.month == "string" && this.nowClass.month) {
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
          } else if (obj$1.common.isObject(this.nowClass) && typeof this.nowClass.date == "string" && this.nowClass.date) {
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
    isNow(date2) {
      let now = new Date();
      if (this.modelValue.getFullYear() == now.getFullYear() && this.modelValue.getMonth() == now.getMonth() && date2 == now.getDate()) {
        return true;
      } else {
        return false;
      }
    },
    isCurrent(date2) {
      if (this.modelValue.getDate() == date2) {
        return true;
      } else {
        return false;
      }
    },
    getWeek(date2) {
      let fullDate = new Date();
      fullDate.setFullYear(this.modelValue.getFullYear());
      fullDate.setMonth(this.modelValue.getMonth());
      fullDate.setDate(date2);
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
const _hoisted_3$c = { class: "mvi-calendar-date-header" };
const _hoisted_4$9 = ["textContent"];
const _hoisted_5$8 = {
  ref: "list",
  class: "mvi-calendar-date-list"
};
const _hoisted_6$7 = ["disabled", "textContent", "onClick"];
const _hoisted_7$6 = {
  key: 1,
  class: "mvi-calendar-month"
};
const _hoisted_8$5 = ["textContent", "onClick"];
const _hoisted_9$3 = { key: 2 };
const _hoisted_10$3 = ["textContent", "onClick", "disabled"];
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$e, [
    $props.view == "date" ? (openBlock(), createElementBlock("div", _hoisted_2$e, [
      createElementVNode("div", _hoisted_3$c, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.weekText, (item, index) => {
          return openBlock(), createElementBlock("div", {
            class: "mvi-calendar-date-header-item",
            key: "week-" + index,
            textContent: toDisplayString(item)
          }, null, 8, _hoisted_4$9);
        }), 128))
      ]),
      createElementVNode("div", _hoisted_5$8, [
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
                }, null, 10, _hoisted_6$7)
              ]);
            }), 128))
          ]);
        }), 128))
      ], 512)
    ])) : $props.view == "month" ? (openBlock(), createElementBlock("div", _hoisted_7$6, [
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
              }, null, 10, _hoisted_8$5)
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
const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n], ["__scopeId", "data-v-43ece536"]]);
Calendar.install = (app) => {
  app.component(Calendar.name, Calendar);
};
const triangle_vue_vue_type_style_index_0_scoped_aa2239dc_lang = "";
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
const Triangle = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m], ["__scopeId", "data-v-aa2239dc"]]);
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
      if (obj$1.number.isNumber(this.zIndex)) {
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
    obj$1.event.on(window, `resize.layer_${this.uid}`, this.resizeSet);
    obj$1.event.on(window, `click.layer_${this.uid}`, this.hideLayer);
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
      let point = obj$1.element.getElementBounding($target);
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
        if (obj$1.element.isContains(this.$el, event2.target) || obj$1.element.isContains(this.getTargetEl(), event2.target)) {
          return;
        }
        this.$emit("update:modelValue", false);
      }
    },
    beforeEnter(el) {
      if (obj$1.data.get(el, "mvi-layer-beforeEnter-trigger")) {
        return;
      }
      obj$1.data.set(el, "mvi-layer-beforeEnter-trigger", true);
      this.$emit("show", el);
      if (typeof this.layerComponentWatch == "function") {
        this.layerComponentWatch.apply(this, ["show", el]);
      }
    },
    enter(el) {
      if (obj$1.data.get(el, "mvi-layer-enter-trigger")) {
        return;
      }
      obj$1.data.set(el, "mvi-layer-enter-trigger", true);
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
      obj$1.data.remove(el, "mvi-layer-beforeEnter-trigger");
      obj$1.data.remove(el, "mvi-layer-enter-trigger");
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
      if (!obj$1.element.isElement(this.$el)) {
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
      let pt = obj$1.element.getElementPoint($target, $root);
      if (this.fixed) {
        if (this.fixedAuto) {
          let flag = true;
          let element2 = $target.offsetParent;
          while (flag && element2) {
            if (obj$1.element.getCssStyle(element2, "transform") != "none") {
              flag = false;
            } else {
              element2 = element2.offsetParent;
            }
          }
          pt = obj$1.element.getElementPoint($target, element2);
        } else {
          pt = obj$1.element.getElementBounding($target);
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
    obj$1.event.off(window, `resize.layer_${this.uid} click.layer_${this.uid}`);
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
const tooltip_vue_vue_type_style_index_0_scoped_2d4bd5f3_lang = "";
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
        return ["bottom", "bottom-start", "bottom-end", "top", "top-start", "top-end", "left", "left-start", "left-end", "right", "right-start", "right-end"].includes(value);
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
const _hoisted_3$b = ["textContent"];
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
          }, null, 8, _hoisted_3$b))
        ], 4)
      ]),
      _: 3
    }, 8, ["modelValue", "offset", "background", "border-color", "show-triangle", "z-index", "target", "root", "placement", "fixed", "fixed-auto", "width", "timeout", "animation"])
  ], 10, _hoisted_1$c);
}
const Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k], ["__scopeId", "data-v-2d4bd5f3"]]);
Tooltip.install = (app) => {
  app.component(Tooltip.name, Tooltip);
};
const colorPicker_vue_vue_type_style_index_0_scoped_3c78c455_lang = "";
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
      if (this.modelValue && obj$1.common.matchingText(this.modelValue, "hex")) {
        this.rgb = obj$1.color.hex2rgb(this.modelValue);
        this.hsv = obj$1.color.rgb2hsv(this.rgb);
        this.opacity = 1;
      } else {
        try {
          let first = this.modelValue.indexOf("(");
          let last = this.modelValue.lastIndexOf(")");
          let str = this.modelValue.substring(first + 1, last);
          let arry = str.split(",");
          if (arry.length < 3) {
            throw new Error("Color values are not RGB (RGBA) format and hexadecimal format");
          }
          this.rgb = [Number(arry[0]), Number(arry[1]), Number(arry[2])];
          if (arry.length == 4) {
            this.opacity = arry[3];
          } else {
            this.opacity = 1;
          }
          this.hsv = obj$1.color.rgb2hsv(this.rgb);
          if (this.hex) {
            this.$emit("update:modelValue", obj$1.color.rgb2hex(this.rgb));
          }
        } catch (e) {
          throw new Error("Color values are not RGB (RGBA) format and hexadecimal format");
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
      let sv_rgb = obj$1.color.hsv2rgb([h2, 100, 100]);
      this.$refs.panel.style.background = "rgba(" + sv_rgb[0] + "," + sv_rgb[1] + "," + sv_rgb[2] + "," + this.opacity + ")";
      if (this.$refs.alphaSlide && this.$refs.alpha && this.$refs.bg) {
        this.$refs.alphaSlide.style.left = this.opacity * this.$refs.alpha.offsetWidth - this.$refs.alphaSlide.offsetWidth / 2 + "px";
        this.$refs.bg.style.background = "linear-gradient(to right, transparent 0%,rgb(" + sv_rgb[0] + "," + sv_rgb[1] + "," + sv_rgb[2] + ") 100%)";
      }
    },
    setColorBySlides() {
      return new Promise((resolve) => {
        let placementSV = obj$1.element.getElementPoint(this.$refs.panelSlide, this.$refs.panel);
        let placementHue = obj$1.element.getElementPoint(this.$refs.hueSlide, this.$refs.hue);
        this.hsv[1] = Math.round((placementSV.left + this.$refs.panelSlide.offsetWidth / 2) / this.$refs.panel.offsetWidth * 100);
        this.hsv[2] = Math.round((1 - (placementSV.top + this.$refs.panelSlide.offsetHeight / 2) / this.$refs.panel.offsetHeight) * 100);
        this.hsv[0] = Math.round((placementHue.left + this.$refs.hueSlide.offsetWidth / 2) / this.$refs.hue.offsetWidth * 360);
        this.rgb = obj$1.color.hsv2rgb(this.hsv);
        let sv_rgb = obj$1.color.hsv2rgb([this.hsv[0], 100, 100]);
        this.$refs.panel.style.background = "rgba(" + sv_rgb[0] + "," + sv_rgb[1] + "," + sv_rgb[2] + "," + this.opacity + ")";
        let placementAlpha = null;
        if (this.$refs.alphaSlide && this.$refs.alpha && this.$refs.bg) {
          placementAlpha = obj$1.element.getElementPoint(this.$refs.alphaSlide, this.$refs.alpha);
          this.opacity = Math.round((placementAlpha.left + this.$refs.alphaSlide.offsetWidth / 2) / this.$refs.alpha.offsetWidth * 100) / 100;
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
            value = obj$1.color.rgb2hex(this.rgb);
          }
          this.$emit("update:modelValue", value);
          this.$emit("change", {
            hex: obj$1.color.rgb2hex(this.rgb),
            rgb: this.rgb,
            opacity: this.opacity,
            hsv: this.hsv
          });
        } else {
          let value = `rgba(${this.rgb.toString()},${this.opacity})`;
          if (this.hex) {
            value = obj$1.color.rgb2hex(this.rgb);
          }
          this.$emit("update:modelValue", value);
          this.$emit("change", {
            hex: obj$1.color.rgb2hex(this.rgb),
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
const _hoisted_3$a = {
  ref: "hueSlide",
  class: "mvi-colorPicker-hue-slide"
};
const _hoisted_4$8 = {
  ref: "alphaSlide",
  class: "mvi-colorPicker-alpha-slide"
};
const _hoisted_5$7 = {
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
      createElementVNode("div", _hoisted_3$a, null, 512)
    ], 512),
    $props.showAlpha && !$props.hex ? (openBlock(), createElementBlock("div", {
      key: 0,
      ref: "alpha",
      class: "mvi-colorPicker-alpha",
      onClick: _cache[2] || (_cache[2] = (...args) => $options.clickAlphaSetColor && $options.clickAlphaSetColor(...args))
    }, [
      createElementVNode("div", _hoisted_4$8, null, 512),
      createElementVNode("div", _hoisted_5$7, null, 512)
    ], 512)) : createCommentVNode("", true)
  ]);
}
const ColorPicker = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j], ["__scopeId", "data-v-3c78c455"]]);
ColorPicker.install = (app) => {
  app.component(ColorPicker.name, ColorPicker);
};
const richImage_vue_vue_type_style_index_0_scoped_a4afd322_lang = "";
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
    obj$1.event.on(document.documentElement, `mousemove.richImage_${this.uid}`, this.imageMouseMove);
    obj$1.event.on(document.documentElement, `mouseup.richImage_${this.uid}`, this.imageMouseUp);
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
        this.scale = obj$1.number.add(this.scale, 0.1);
      }
    },
    scaleMinus() {
      if (this.scale > this.minScale) {
        this.translateX = 0;
        this.translateY = 0;
        this.scale = obj$1.number.subtract(this.scale, 0.1);
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
          this.touchDistance = this.getDistance(event2.touches[0], event2.touches[1]);
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
          let distance = this.getDistance(event2.touches[0], event2.touches[1]);
          if (distance < this.touchDistance) {
            if (this.scale > this.minScale) {
              this.translateX = 0;
              this.translateY = 0;
              this.scale = obj$1.number.add(this.scale, obj$1.number.divide(obj$1.number.subtract(distance, this.touchDistance), this.$el.offsetWidth));
            }
          } else {
            if (this.scale < this.maxScale) {
              this.translateX = 0;
              this.translateY = 0;
              this.scale = obj$1.number.add(this.scale, obj$1.number.divide(obj$1.number.subtract(distance, this.touchDistance), this.$el.offsetWidth));
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
      let moveX = obj$1.number.divide(endX - this.startX, 2);
      let moveY = obj$1.number.divide(endY - this.startY, 2);
      const placement = obj$1.element.getElementBounding(this.$refs.img.$el);
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
      const placement = obj$1.element.getElementBounding(this.$refs.img.$el);
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
    obj$1.event.off(document.documentElement, `mousemove.richImage_${this.uid} mouseup.richImage_${this.uid}`);
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
const RichImage = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i], ["__scopeId", "data-v-a4afd322"]]);
const imagePreview_vue_vue_type_style_index_0_scoped_2a23db86_lang = "";
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
const _withScopeId = (n) => (pushScopeId("data-v-2a23db86"), n = n(), popScopeId(), n);
const _hoisted_1$a = {
  key: 0,
  class: "mvi-image-preview-page"
};
const _hoisted_2$a = { key: 1 };
const _hoisted_3$9 = ["textContent"];
const _hoisted_4$7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", null, "/", -1));
const _hoisted_5$6 = ["textContent"];
const _hoisted_6$6 = {
  key: 1,
  class: "mvi-image-preview-footer"
};
const _hoisted_7$5 = {
  key: 0,
  class: "mvi-image-preview-tools"
};
const _hoisted_8$4 = ["textContent"];
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
        indicators: withCtx((data2) => [
          $props.showPage ? (openBlock(), createElementBlock("div", _hoisted_1$a, [
            _ctx.$slots.page ? renderSlot(_ctx.$slots, "page", {
              key: 0,
              total: data2.total,
              current: data2.active
            }, void 0, true) : (openBlock(), createElementBlock("div", _hoisted_2$a, [
              createElementVNode("span", {
                textContent: toDisplayString(data2.active + 1)
              }, null, 8, _hoisted_3$9),
              _hoisted_4$7,
              createElementVNode("span", {
                textContent: toDisplayString(data2.total)
              }, null, 8, _hoisted_5$6)
            ]))
          ])) : createCommentVNode("", true),
          $props.useTools || _ctx.$slots.descriptions || $props.descriptions.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_6$6, [
            $props.useTools ? (openBlock(), createElementBlock("div", _hoisted_7$5, [
              createVNode(_component_Icon, {
                onClick: ($event) => $options.plusImage(data2.active),
                class: "mvi-image-preview-tools-icon",
                type: "search-plus-o"
              }, null, 8, ["onClick"]),
              createVNode(_component_Icon, {
                onClick: ($event) => $options.minusImage(data2.active),
                class: "mvi-image-preview-tools-icon",
                type: "search-minus-o"
              }, null, 8, ["onClick"]),
              createVNode(_component_Icon, {
                onClick: ($event) => $options.resetImage(data2.active),
                class: "mvi-image-preview-tools-icon",
                type: "double-circle"
              }, null, 8, ["onClick"]),
              createVNode(_component_Icon, {
                onClick: ($event) => $options.leftRotateImage(data2.active),
                class: "mvi-image-preview-tools-icon",
                type: "left-rotate"
              }, null, 8, ["onClick"]),
              createVNode(_component_Icon, {
                onClick: ($event) => $options.rightRotateImage(data2.active),
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
                total: data2.total,
                current: data2.active
              }, void 0, true) : $props.descriptions.length > 0 ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: "mvi-image-preview-description-el",
                textContent: toDisplayString($props.descriptions[data2.active])
              }, null, 8, _hoisted_8$4)) : createCommentVNode("", true)
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
const ImagePreview = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__scopeId", "data-v-2a23db86"]]);
ImagePreview.install = (app) => {
  app.component(ImagePreview.name, ImagePreview);
};
const page_vue_vue_type_style_index_0_scoped_bc746c84_lang = "";
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
            style.color = obj$1.element.getCssStyle(this.el, "background-color");
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
      if (obj$1.common.isObject(this.firstIcon)) {
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
      if (obj$1.common.isObject(this.firstIcon)) {
        if (typeof this.firstIcon.url == "string") {
          url = this.firstIcon.url;
        }
      }
      return url;
    },
    firstIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.firstIcon)) {
        if (typeof this.firstIcon.spin == "boolean") {
          spin = this.firstIcon.spin;
        }
      }
      return spin;
    },
    firstIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.firstIcon)) {
        if (typeof this.firstIcon.size == "string") {
          size = this.firstIcon.size;
        }
      }
      return size;
    },
    firstIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.firstIcon)) {
        if (typeof this.firstIcon.color == "string") {
          color2 = this.firstIcon.color;
        }
      }
      return color2;
    },
    lastIconType() {
      let type = "angle-double-right";
      if (obj$1.common.isObject(this.lastIcon)) {
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
      if (obj$1.common.isObject(this.lastIcon)) {
        if (typeof this.lastIcon.url == "string") {
          url = this.lastIcon.url;
        }
      }
      return url;
    },
    lastIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.lastIcon)) {
        if (typeof this.lastIcon.spin == "boolean") {
          spin = this.lastIcon.spin;
        }
      }
      return spin;
    },
    lastIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.lastIcon)) {
        if (typeof this.lastIcon.size == "string") {
          size = this.lastIcon.size;
        }
      }
      return size;
    },
    lastIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.lastIcon)) {
        if (typeof this.lastIcon.color == "string") {
          color2 = this.lastIcon.color;
        }
      }
      return color2;
    },
    prevIconType() {
      let type = "angle-left";
      if (obj$1.common.isObject(this.prevIcon)) {
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
      if (obj$1.common.isObject(this.prevIcon)) {
        if (typeof this.prevIcon.url == "string") {
          url = this.prevIcon.url;
        }
      }
      return url;
    },
    prevIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.prevIcon)) {
        if (typeof this.prevIcon.spin == "boolean") {
          spin = this.prevIcon.spin;
        }
      }
      return spin;
    },
    prevIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.prevIcon)) {
        if (typeof this.prevIcon.size == "string") {
          size = this.prevIcon.size;
        }
      }
      return size;
    },
    prevIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.prevIcon)) {
        if (typeof this.prevIcon.color == "string") {
          color2 = this.prevIcon.color;
        }
      }
      return color2;
    },
    nextIconType() {
      let type = "angle-right";
      if (obj$1.common.isObject(this.nextIcon)) {
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
      if (obj$1.common.isObject(this.nextIcon)) {
        if (typeof this.nextIcon.url == "string") {
          url = this.nextIcon.url;
        }
      }
      return url;
    },
    nextIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.nextIcon)) {
        if (typeof this.nextIcon.spin == "boolean") {
          spin = this.nextIcon.spin;
        }
      }
      return spin;
    },
    nextIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.nextIcon)) {
        if (typeof this.nextIcon.size == "string") {
          size = this.nextIcon.size;
        }
      }
      return size;
    },
    nextIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.nextIcon)) {
        if (typeof this.nextIcon.color == "string") {
          color2 = this.nextIcon.color;
        }
      }
      return color2;
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
const _hoisted_3$8 = ["textContent"];
const _hoisted_4$6 = ["disabled"];
const _hoisted_5$5 = ["textContent"];
const _hoisted_6$5 = { class: "mvi-page-numbers" };
const _hoisted_7$4 = {
  key: 0,
  class: "mvi-page-numbers-simple"
};
const _hoisted_8$3 = {
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
      }, null, 8, _hoisted_3$8)) : createCommentVNode("", true)
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
      }, null, 8, _hoisted_5$5)) : createCommentVNode("", true)
    ], 14, _hoisted_4$6)) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_6$5, [
      $props.simple ? (openBlock(), createElementBlock("div", _hoisted_7$4, toDisplayString($props.modelValue) + " / " + toDisplayString($props.total), 1)) : (openBlock(), createElementBlock("div", _hoisted_8$3, [
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
const Page = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__scopeId", "data-v-bc746c84"]]);
Page.install = (app) => {
  app.component(Page.name, Page);
};
const loadingBar_vue_vue_type_style_index_0_scoped_266771ea_lang = "";
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
      if (obj$1.number.isNumber(this.zIndex)) {
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
const LoadingBarComponent = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-266771ea"]]);
const LoadingBar = {
  initParams: (options) => {
    let opts = {};
    if (obj$1.common.isObject(options)) {
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
      let mountNode = obj$1.element.string2dom("<div></div>");
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
const list_vue_vue_type_style_index_0_scoped_085788fa_lang = "";
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
      if (obj$1.element.getScrollHeight(el) > el.clientHeight) {
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
const _hoisted_3$7 = { key: 1 };
const _hoisted_4$5 = {
  key: 1,
  class: "mvi-list-loading"
};
const _hoisted_5$4 = { key: 1 };
const _hoisted_6$4 = { key: 1 };
const _hoisted_7$3 = { key: 1 };
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$8, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true),
    $props.finished ? (openBlock(), createElementBlock("div", _hoisted_2$8, [
      _ctx.$slots.finished ? renderSlot(_ctx.$slots, "finished", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_3$7, toDisplayString($props.finishedText), 1))
    ])) : $props.loading ? (openBlock(), createElementBlock("div", _hoisted_4$5, [
      _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_5$4, toDisplayString($props.loadingText), 1))
    ])) : $props.error ? (openBlock(), createElementBlock("div", {
      key: 2,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.doLoad && $options.doLoad(...args)),
      class: "mvi-list-error"
    }, [
      _ctx.$slots.error ? renderSlot(_ctx.$slots, "error", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_6$4, toDisplayString($props.errorText), 1))
    ])) : $props.content || _ctx.$slots.content ? (openBlock(), createElementBlock("div", {
      key: 3,
      onClick: _cache[1] || (_cache[1] = (...args) => $options.doLoad && $options.doLoad(...args)),
      class: "mvi-list-content"
    }, [
      _ctx.$slots.content ? renderSlot(_ctx.$slots, "content", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_7$3, toDisplayString($props.content), 1))
    ])) : createCommentVNode("", true)
  ]);
}
const List = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__scopeId", "data-v-085788fa"]]);
List.install = (app) => {
  app.component(List.name, List);
};
const skeleton_vue_vue_type_style_index_0_scoped_ac51312d_lang = "";
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
const _hoisted_3$6 = { class: "mvi-skeleton-rows" };
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
      createElementVNode("div", _hoisted_3$6, [
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
const Skeleton = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__scopeId", "data-v-ac51312d"]]);
Skeleton.install = (app) => {
  app.component(Skeleton.name, Skeleton);
};
const sign_vue_vue_type_style_index_0_scoped_7e44022b_lang = "";
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
      this.$el.setAttribute("width", obj$1.element.getCssStyle(this.$el, "width"));
      this.$el.setAttribute("height", obj$1.element.getCssStyle(this.$el, "height"));
      this.clear();
      obj$1.event.on(document.documentElement, `mousemove.sign_${this.uid}`, this.canvasMouseMove);
      obj$1.event.on(document.documentElement, `mouseup.sign_${this.uid}`, this.canvasMouseUp);
    },
    canvasMouseDown(e) {
      this.drawing = true;
      this.inCanvas = true;
      const ctx = this.$el.getContext("2d");
      const rect = obj$1.element.getElementBounding(this.$el);
      ctx.beginPath();
      ctx.moveTo(e.pageX - rect.left, e.pageY - rect.top);
    },
    canvasMouseMove(e) {
      if (this.drawing && this.inCanvas) {
        const ctx = this.$el.getContext("2d");
        const rect = obj$1.element.getElementBounding(this.$el);
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
        const rect = obj$1.element.getElementBounding(this.$el);
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
      const rect = obj$1.element.getElementBounding(this.$el);
      ctx.beginPath();
      ctx.moveTo(e.targetTouches[0].pageX - rect.left, e.targetTouches[0].pageY - rect.top);
    },
    canvasTouchMove(e) {
      if (e.cancelable) {
        e.preventDefault();
      }
      const ctx = this.$el.getContext("2d");
      const rect = obj$1.element.getElementBounding(this.$el);
      ctx.lineTo(e.targetTouches[0].pageX - rect.left, e.targetTouches[0].pageY - rect.top);
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
    obj$1.event.off(document.documentElement, `mousemove.sign_${this.uid} mouseup.sign_${this.uid}`);
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
const Sign = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-7e44022b"]]);
Sign.install = (app) => {
  app.component(Sign.name, Sign);
};
const select_vue_vue_type_style_index_0_scoped_ef8960ee_lang = "";
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
        return ["info", "success", "warn", "primary", "error"].includes(value);
      }
    },
    activeColor: {
      type: String,
      default: null,
      validator(value) {
        return obj$1.common.matchingText(value, "hex");
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
        const rgb = obj$1.color.hex2rgb(this.activeColor);
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
              return obj$1.common.equal(i, item.value);
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
          if (obj$1.common.equal(this.modelValue, item.value)) {
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
            return obj$1.common.equal(i, item.value);
          });
          return this.showSelectIcon && flag;
        }
        return false;
      };
    },
    selectedIconType() {
      let type = "success";
      if (obj$1.common.isObject(this.selectedIcon)) {
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
      if (obj$1.common.isObject(this.selectedIcon)) {
        if (typeof this.selectedIcon.size == "string") {
          size = this.selectedIcon.size;
        }
      }
      return size;
    },
    selectedIconUrl() {
      let url = null;
      if (obj$1.common.isObject(this.selectedIcon)) {
        if (typeof this.selectedIcon.url == "string") {
          url = this.selectedIcon.url;
        }
      }
      return url;
    },
    selectedIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.selectedIcon)) {
        if (typeof this.selectedIcon.spin == "boolean") {
          spin = this.selectedIcon.spin;
        }
      }
      return spin;
    },
    selectedIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.selectedIcon)) {
        if (typeof this.selectedIcon.color == "string") {
          color2 = this.selectedIcon.color;
        }
      }
      return color2;
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
        zIndex: obj$1.number.isNumber(this.layerProps.zIndex) ? this.layerProps.zIndex : 400,
        offset: this.layerProps.offset ? this.layerProps.offset : "0.1rem",
        wrapperClass: this.layerProps.wrapperClass,
        animation: this.layerProps.animation,
        timeout: obj$1.number.isNumber(this.layerProps.timeout) ? this.layerProps.timeout : 200,
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
        obj$1.element.addClass(e.currentTarget, this.hoverClass);
      }
    },
    mouseLeave(e, item) {
      if (this.disabled || item.disabled) {
        return;
      }
      if (this.hoverClass) {
        obj$1.element.removeClass(e.currentTarget, this.hoverClass);
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
          return obj$1.common.equal(tmp, item.value);
        });
        if (flag) {
          arr = arr.filter((tmp) => {
            return !obj$1.common.equal(tmp, item.value);
          });
        } else {
          arr.push(item.value);
        }
        this.$emit("update:modelValue", arr);
        this.$emit(
          "change",
          this.options.filter((tmp) => {
            return arr.some((tmp2) => {
              return obj$1.common.equal(tmp.value, tmp2);
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
const _hoisted_3$5 = ["data-placeholder", "innerHTML"];
const _hoisted_4$4 = ["onClick", "onMouseenter", "onMouseleave", "disabled"];
const _hoisted_5$3 = ["innerHTML"];
const _hoisted_6$3 = ["value", "name"];
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
      }, null, 10, _hoisted_3$5),
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
              }, null, 8, _hoisted_5$3),
              $options.isSelect(item) ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                type: $options.selectedIconType,
                spin: $options.selectedIconSpin,
                size: $options.selectedIconSize,
                url: $options.selectedIconUrl,
                color: $options.selectedIconColor
              }, null, 8, ["type", "spin", "size", "url", "color"])) : createCommentVNode("", true)
            ], 42, _hoisted_4$4);
          }), 128))
        ], 4)
      ]),
      _: 1
    }, 8, ["modelValue", "target", "root", "placement", "offset", "fixed", "fixed-auto", "z-index", "show-triangle", "wrapper-class", "animation", "timeout", "shadow", "border", "border-color", "background", "onShowing"]),
    createElementVNode("input", {
      type: "hidden",
      value: $options.formData,
      name: $props.name
    }, null, 8, _hoisted_6$3)
  ], 10, _hoisted_1$6);
}
const Select = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-ef8960ee"]]);
Select.install = (app) => {
  app.component(Select.name, Select);
};
const autocomplete_vue_vue_type_style_index_0_scoped_e792b7ab_lang = "";
const _sfc_main$a = {
  name: "m-autocomplete",
  data() {
    return {
      focus: false
    };
  },
  emits: ["update:modelValue", "focus", "blur", "input", "left-click", "right-click", "select", "clear"],
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
        return ["info", "success", "warn", "error", "primary"].includes(value);
      }
    },
    activeColor: {
      type: String,
      default: null,
      validator(value) {
        return obj$1.common.matchingText(value, "hex");
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
      if (obj$1.common.isObject(this.leftIcon)) {
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
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.url == "string") {
          url = this.leftIcon.url;
        }
      }
      return url;
    },
    leftIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.spin == "boolean") {
          spin = this.leftIcon.spin;
        }
      }
      return spin;
    },
    leftIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.size == "string") {
          size = this.leftIcon.size;
        }
      }
      return size;
    },
    leftIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.leftIcon)) {
        if (typeof this.leftIcon.color == "string") {
          color2 = this.leftIcon.color;
        }
      }
      return color2;
    },
    rightIconType() {
      let type = null;
      if (obj$1.common.isObject(this.rightIcon)) {
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
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.url == "string") {
          url = this.rightIcon.url;
        }
      }
      return url;
    },
    rightIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.spin == "boolean") {
          spin = this.rightIcon.spin;
        }
      }
      return spin;
    },
    rightIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.size == "string") {
          size = this.rightIcon.size;
        }
      }
      return size;
    },
    rightIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.rightIcon)) {
        if (typeof this.rightIcon.color == "string") {
          color2 = this.rightIcon.color;
        }
      }
      return color2;
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
        const rgb = obj$1.color.hex2rgb(this.activeColor);
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
        zIndex: obj$1.number.isNumber(this.layerProps.zIndex) ? this.layerProps.zIndex : 400,
        offset: this.layerProps.offset ? this.layerProps.offset : "0.1rem",
        wrapperClass: this.layerProps.wrapperClass,
        animation: this.layerProps.animation,
        timeout: obj$1.number.isNumber(this.layerProps.timeout) ? this.layerProps.timeout : 200,
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
        obj$1.element.addClass(e.currentTarget, this.hoverClass);
      }
    },
    listLeave(e) {
      if (this.hoverClass) {
        obj$1.element.removeClass(e.currentTarget, this.hoverClass);
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
const _hoisted_3$4 = ["placeholder", "name", "disabled"];
const _hoisted_4$3 = ["textContent", "onClick"];
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
      }, null, 44, _hoisted_3$4), [
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
            }, null, 40, _hoisted_4$3);
          }), 128))
        ], 4)
      ]),
      _: 1
    }, 8, ["model-value", "target", "root", "placement", "offset", "fixed", "z-index", "fixed-auto", "wrapper-class", "animation", "shadow", "border", "timeout", "show-triangle", "border-color", "background", "onShowing"])
  ], 10, _hoisted_1$5);
}
const Autocomplete = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-e792b7ab"]]);
Autocomplete.install = (app) => {
  app.component(Autocomplete.name, Autocomplete);
};
const dateChooser_vue_vue_type_style_index_0_scoped_c1e0f451_lang = "";
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
        return ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"];
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
        zIndex: obj$1.number.isNumber(this.layerProps.zIndex) ? this.layerProps.zIndex : 400,
        offset: this.layerProps.offset ? this.layerProps.offset : "0.2rem",
        wrapperClass: this.layerProps.wrapperClass,
        animation: this.layerProps.animation,
        timeout: obj$1.number.isNumber(this.layerProps.timeout) ? this.layerProps.timeout : 200,
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
      obj$1.event.on(this.$el, "mouseenter.dateChooser", this.openCalendar);
      obj$1.event.on(this.$el, "mouseleave.dateChooser", this.closeCalendar);
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
        let date2 = this.modelValue;
        let year = date2.getFullYear();
        if (years[0].year <= this.startYear) {
          return;
        } else if (years[0].year - this.startYear < 12) {
          date2 = new Date(date2.setFullYear(this.startYear));
        } else {
          date2 = new Date(date2.setFullYear(year - 12));
        }
        this.$emit("update:modelValue", date2);
        this.$emit("change", date2);
      } else {
        let date2 = this.modelValue;
        let year = date2.getFullYear();
        if (year <= this.startYear) {
          return;
        }
        date2 = new Date(date2.setFullYear(year - 1));
        this.$emit("update:modelValue", date2);
        this.$emit("change", date2);
      }
    },
    goPrevMonth() {
      let date2 = this.modelValue;
      if (date2.getFullYear() <= this.startYear && date2.getMonth() == 0) {
        return;
      }
      let prevMonths = obj$1.date.getPrevMonths(date2, 2);
      date2 = prevMonths[1];
      this.$emit("update:modelValue", date2);
      this.$emit("change", date2);
    },
    goNextYear() {
      if (this.view == "year") {
        let years = this.$refs.calendar.years;
        let date2 = this.modelValue;
        let year = date2.getFullYear();
        if (years[years.length - 1].year >= this.endYear) {
          return;
        } else if (this.endYear - years[years.length - 1].year < 12) {
          date2 = new Date(date2.setFullYear(this.endYear));
        } else {
          date2 = new Date(date2.setFullYear(year + 12));
        }
        this.$emit("update:modelValue", date2);
        this.$emit("change", date2);
      } else {
        let date2 = this.modelValue;
        let year = date2.getFullYear();
        if (year >= this.endYear) {
          return;
        }
        date2 = new Date(date2.setFullYear(year + 1));
        this.$emit("update:modelValue", date2);
        this.$emit("change", date2);
      }
    },
    goNextMonth() {
      let date2 = this.modelValue;
      if (date2.getFullYear() >= this.endYear && date2.getMonth() == 11) {
        return;
      }
      let nextMonths = obj$1.date.getNextMonths(date2, 2);
      date2 = nextMonths[1];
      this.$emit("update:modelValue", date2);
      this.$emit("change", date2);
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
      obj$1.event.off(this.$el, "mouseenter.dateChooser mouseleave.dateChooser");
    }
  }
};
const _hoisted_1$4 = ["data-id"];
const _hoisted_2$4 = ["data-id"];
const _hoisted_3$3 = {
  class: "mvi-date-chooser-layer",
  ref: "panel"
};
const _hoisted_4$2 = { class: "mvi-date-chooser-header" };
const _hoisted_5$2 = { class: "mvi-date-chooser-header-left" };
const _hoisted_6$2 = ["disabled"];
const _hoisted_7$2 = ["disabled"];
const _hoisted_8$2 = { class: "mvi-date-chooser-header-center" };
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
        createElementVNode("div", _hoisted_3$3, [
          createElementVNode("div", _hoisted_4$2, [
            createElementVNode("div", _hoisted_5$2, [
              createElementVNode("span", {
                onMouseenter: _cache[1] || (_cache[1] = ($event) => $options.hoverHeader(true, 0)),
                onMouseleave: _cache[2] || (_cache[2] = ($event) => $options.hoverHeader(false, 0)),
                onClick: _cache[3] || (_cache[3] = (...args) => $options.goPrevYear && $options.goPrevYear(...args)),
                class: normalizeClass($options.headerItemClass(0)),
                disabled: $options.prevYearDisabled || null
              }, [
                createVNode(_component_Icon, { type: "angle-double-left" })
              ], 42, _hoisted_6$2),
              $data.view == "date" ? (openBlock(), createElementBlock("span", {
                key: 0,
                onMouseenter: _cache[4] || (_cache[4] = ($event) => $options.hoverHeader(true, 1)),
                onMouseleave: _cache[5] || (_cache[5] = ($event) => $options.hoverHeader(false, 1)),
                onClick: _cache[6] || (_cache[6] = (...args) => $options.goPrevMonth && $options.goPrevMonth(...args)),
                class: normalizeClass($options.headerItemClass(1)),
                disabled: $props.modelValue.getFullYear() <= $props.startYear && $props.modelValue.getMonth() == 0 || null
              }, [
                createVNode(_component_Icon, { type: "angle-left" })
              ], 42, _hoisted_7$2)) : createCommentVNode("", true)
            ]),
            createElementVNode("div", _hoisted_8$2, [
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
const DateChooser = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-c1e0f451"]]);
DateChooser.install = (app) => {
  app.component(DateChooser.name, DateChooser);
};
const field_vue_vue_type_style_index_0_scoped_fd7298ee_lang = "";
const _sfc_main$8 = {
  name: "m-field",
  emits: ["update:modelValue", "prepend-click", "prefix-click", "append-click", "suffix-click", "focus", "blur", "input", "clear"],
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
        return ["info", "success", "warn", "primary", "error"].includes(value);
      }
    },
    activeColor: {
      type: String,
      default: null,
      validator(value) {
        return obj$1.common.matchingText(value, "hex");
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
        return [false, "none", "text", "decimal", "numeric", "tel", "search", "email", "url"].includes(value);
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
          const rgb = obj$1.color.hex2rgb(this.activeColor);
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
      if (obj$1.common.isObject(this.prepend)) {
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
      if (obj$1.common.isObject(this.prepend)) {
        if (typeof this.prepend.url == "string") {
          url = this.prepend.url;
        }
      }
      return url;
    },
    prependIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.prepend)) {
        if (typeof this.prepend.spin == "boolean") {
          spin = this.prepend.spin;
        }
      }
      return spin;
    },
    prependIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.prepend)) {
        if (typeof this.prepend.size == "string") {
          size = this.prepend.size;
        }
      }
      return size;
    },
    prependIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.prepend)) {
        if (typeof this.prepend.color == "string") {
          color2 = this.prepend.color;
        }
      }
      return color2;
    },
    appendIconType() {
      let type = null;
      if (obj$1.common.isObject(this.append)) {
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
      if (obj$1.common.isObject(this.append)) {
        if (typeof this.append.url == "string") {
          url = this.append.url;
        }
      }
      return url;
    },
    appendIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.append)) {
        if (typeof this.append.spin == "boolean") {
          spin = this.append.spin;
        }
      }
      return spin;
    },
    appendIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.append)) {
        if (typeof this.append.size == "string") {
          size = this.append.size;
        }
      }
      return size;
    },
    appendIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.append)) {
        if (typeof this.append.color == "string") {
          color2 = this.append.color;
        }
      }
      return color2;
    },
    prefixIconType() {
      let type = null;
      if (obj$1.common.isObject(this.prefix)) {
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
      if (obj$1.common.isObject(this.prefix)) {
        if (typeof this.prefix.url == "string") {
          url = this.prefix.url;
        }
      }
      return url;
    },
    prefixIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.prefix)) {
        if (typeof this.prefix.spin == "boolean") {
          spin = this.prefix.spin;
        }
      }
      return spin;
    },
    prefixIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.prefix)) {
        if (typeof this.prefix.size == "string") {
          size = this.prefix.size;
        }
      }
      return size;
    },
    prefixIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.prefix)) {
        if (typeof this.prefix.color == "string") {
          color2 = this.prefix.color;
        }
      }
      return color2;
    },
    suffixIconType() {
      let type = null;
      if (obj$1.common.isObject(this.suffix)) {
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
      if (obj$1.common.isObject(this.suffix)) {
        if (typeof this.suffix.url == "string") {
          url = this.suffix.url;
        }
      }
      return url;
    },
    suffixIconSpin() {
      let spin = false;
      if (obj$1.common.isObject(this.suffix)) {
        if (typeof this.suffix.spin == "boolean") {
          spin = this.suffix.spin;
        }
      }
      return spin;
    },
    suffixIconSize() {
      let size = null;
      if (obj$1.common.isObject(this.suffix)) {
        if (typeof this.suffix.size == "string") {
          size = this.suffix.size;
        }
      }
      return size;
    },
    suffixIconColor() {
      let color2 = null;
      if (obj$1.common.isObject(this.suffix)) {
        if (typeof this.suffix.color == "string") {
          color2 = this.suffix.color;
        }
      }
      return color2;
    },
    rowsFilter() {
      let rows = this.rows;
      if (obj$1.common.isObject(this.autosize)) {
        if (obj$1.number.isNumber(this.autosize.minRows)) {
          if (this.rows < this.autosize.minRows) {
            rows = this.autosize.minRows;
          }
        }
        if (obj$1.number.isNumber(this.autosize.maxRows)) {
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
        if (this.$refs.textarea && (this.autosize == true || obj$1.common.isObject(this.autosize))) {
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
      if (this.autosize == true || obj$1.common.isObject(this.autosize)) {
        this.autosizeSet();
      }
    }
  },
  methods: {
    autosizeSet() {
      this.$refs.textarea.style.overflow = "hidden";
      this.$refs.textarea.style.height = "auto";
      this.$refs.textarea.scrollTop = 0;
      this.$refs.textarea.style.height = obj$1.element.getScrollHeight(this.$refs.textarea) + "px";
    },
    rows2Height(rows) {
      let lineHeight = Math.floor(parseFloat(obj$1.element.getCssStyle(this.$refs.textarea, "line-height")));
      return rows * lineHeight;
    },
    setMaxMinHeight() {
      if (obj$1.common.isObject(this.autosize)) {
        if (obj$1.number.isNumber(this.autosize.maxRows)) {
          let maxHeight = this.rows2Height(this.autosize.maxRows) + parseFloat(obj$1.element.getCssStyle(this.$refs.textarea, "padding-top")) + parseFloat(obj$1.element.getCssStyle(this.$refs.textarea, "padding-bottom"));
          this.$refs.textarea.style.maxHeight = maxHeight + "px";
        }
        if (obj$1.number.isNumber(this.autosize.minRows)) {
          let minHeight = this.rows2Height(this.autosize.minRows) + parseFloat(obj$1.element.getCssStyle(this.$refs.textarea, "padding-top")) + parseFloat(obj$1.element.getCssStyle(this.$refs.textarea, "padding-bottom"));
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
const _hoisted_3$2 = ["disabled", "readonly", "type", "placeholder", "inputmode", "maxlength", "name", "autofocus"];
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
      }, null, 44, _hoisted_3$2)), [
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
const Field = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-fd7298ee"]]);
Field.install = (app) => {
  app.component(Field.name, Field);
};
const number = {
  formatNumber(num) {
    if (this.isNumber(num)) {
      return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    } else {
      return num;
    }
  },
  isNumber(num) {
    if (typeof num == "number" && !isNaN(num)) {
      return true;
    } else {
      return false;
    }
  },
  add(...values) {
    return values.reduce((num, value) => {
      let r1 = 0;
      let r2 = 0;
      let m = 0;
      try {
        r1 = num.toString().split(".")[1].length;
      } catch (e) {
      }
      try {
        r2 = value.toString().split(".")[1].length;
      } catch (e) {
      }
      m = Math.pow(10, Math.max(r1, r2));
      return (num * m + value * m) / m;
    });
  },
  subtract(...values) {
    return values.reduce((num, value) => {
      let r1 = 0;
      let r2 = 0;
      let m = 0;
      try {
        r1 = num.toString().split(".")[1].length;
      } catch (e) {
      }
      try {
        r2 = value.toString().split(".")[1].length;
      } catch (e) {
      }
      m = Math.pow(10, Math.max(r1, r2));
      return (num * m - value * m) / m;
    });
  },
  mutiply(...values) {
    return values.reduce((num, value) => {
      let m = 0;
      let s1 = num.toString();
      let s2 = value.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {
      }
      try {
        m += s2.split(".")[1].length;
      } catch (e) {
      }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    });
  },
  divide(...values) {
    return values.reduce((num, value) => {
      let t1 = 0;
      let t2 = 0;
      let s1 = num.toString();
      let s2 = value.toString();
      try {
        t1 = s1.split(".")[1].length;
      } catch (e) {
      }
      try {
        t2 = s2.split(".")[1].length;
      } catch (e) {
      }
      s1 = Number(s1.replace(".", ""));
      s2 = Number(s2.replace(".", ""));
      return s1 / s2 * Math.pow(10, t2 - t1);
    });
  }
};
const string = {
  insert(original, str, index) {
    if (!original || typeof original != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (typeof str != "string") {
      throw new TypeError("The second argument must be a string");
    }
    if (!number.isNumber(index)) {
      throw new TypeError("The third argument must be a number");
    }
    if (index < 0) {
      throw new Error("The third argument cannot be less than 0");
    }
    return original.substring(0, index) + str + original.substring(index, original.length);
  },
  delete(original, index, num) {
    if (!original || typeof original != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!number.isNumber(index)) {
      throw new TypeError("The second argument must be a number");
    }
    if (index < 0) {
      throw new Error("The second argument cannot be less than 0");
    }
    if (!number.isNumber(num)) {
      throw new TypeError("The third argument must be a number");
    }
    if (num < 0) {
      throw new Error("The third argument cannot be less than 0");
    }
    return original.substring(0, index) + original.substring(index + num, original.length);
  },
  replace(original, start, end, str) {
    if (!original || typeof original != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!number.isNumber(start)) {
      throw new TypeError("The second argument must be a number");
    }
    if (start < 0) {
      throw new Error("The second argument cannot be less than 0");
    }
    if (!number.isNumber(end)) {
      throw new TypeError("The third argument must be a number");
    }
    if (end < 0) {
      throw new Error("The third argument cannot be less than 0");
    }
    if (typeof str != "string") {
      throw new TypeError("The fourth argument must be a string");
    }
    return original.substring(0, start) + str + original.substring(end, original.length);
  },
  trim(str, global) {
    if (typeof str != "string") {
      throw new TypeError("The first argument must be a string");
    }
    let result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (global) {
      result = result.replace(/\s/g, "");
    }
    return result;
  }
};
const element = {
  isWindow(data2) {
    return data2 && data2 instanceof Window;
  },
  getElementPoint(el, root) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!this.isElement(root)) {
      root = document.body;
    }
    if (!this.isContains(root, el)) {
      throw new Error("The second argument and the first argument have no hierarchical relationship");
    }
    let obj2 = el;
    let offsetTop = 0;
    let offsetLeft = 0;
    while (this.isElement(el) && this.isContains(root, el) && root !== el) {
      offsetTop += el.offsetTop;
      offsetLeft += el.offsetLeft;
      el = el.offsetParent;
    }
    let offsetRight = root.offsetWidth - offsetLeft - obj2.offsetWidth;
    let offsetBottom = root.offsetHeight - offsetTop - obj2.offsetHeight;
    return {
      top: offsetTop,
      left: offsetLeft,
      right: offsetRight,
      bottom: offsetBottom
    };
  },
  isContains(parentNode, childNode) {
    if (!this.isElement(parentNode)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!this.isElement(childNode, true)) {
      throw new TypeError("The second argument must be an element");
    }
    if (parentNode === childNode) {
      return true;
    }
    if (parentNode.contains) {
      return parentNode.contains(childNode);
    }
    if (parentNode.compareDocumentPosition) {
      return !!(parentNode.compareDocumentPosition(childNode) & 16);
    }
  },
  isParentNode(parentNode, childNode) {
    if (!this.isElement(parentNode)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!this.isElement(childNode, true)) {
      throw new TypeError("The second argument must be an element");
    }
    if (parentNode === childNode) {
      return false;
    }
    return childNode.parentNode === parentNode;
  },
  children(el, selector) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (selector && typeof selector != "string") {
      throw new TypeError("The second argument must be a string");
    }
    const res = el.querySelectorAll(selector || "*");
    return [...res].filter((ele) => {
      return ele.parentNode === el;
    });
  },
  siblings(el, selector) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (selector && typeof selector != "string") {
      throw new TypeError("The second argument must be a string");
    }
    if (!el.parentNode) {
      return [];
    }
    const res = el.parentNode.querySelectorAll(selector || "*");
    return [...res].filter((ele) => {
      return ele.parentNode === el.parentNode && ele != el;
    });
  },
  rem2px(num) {
    if (!number.isNumber(num)) {
      throw new TypeError("The argument must be a number");
    }
    let fs = this.getCssStyle(document.documentElement, "font-size");
    return number.mutiply(num, parseFloat(fs));
  },
  px2rem(num) {
    if (!number.isNumber(num)) {
      throw new TypeError("The argument must be a number");
    }
    let fs = this.getCssStyle(document.documentElement, "font-size");
    return number.divide(num, parseFloat(fs));
  },
  width(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    if (!this.isElement(el)) {
      el = document.body;
    }
    let clientWidth = el.clientWidth;
    let paddingLeft_width = parseFloat(this.getCssStyle(el, "padding-left"));
    let paddingRight_width = parseFloat(this.getCssStyle(el, "padding-right"));
    return number.subtract(clientWidth, paddingLeft_width, paddingRight_width);
  },
  height(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    if (!this.isElement(el)) {
      el = document.body;
    }
    let clientHeight = el.clientHeight;
    let paddingTop_height = parseFloat(this.getCssStyle(el, "padding-top"));
    let paddingBottom_height = parseFloat(this.getCssStyle(el, "padding-bottom"));
    return number.subtract(clientHeight, paddingTop_height, paddingBottom_height);
  },
  removeClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string.trim(className).split(/\s+/);
    classArray.forEach((item, index) => {
      classList.remove(item);
    });
  },
  addClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string.trim(className).split(/\s+/);
    classArray.forEach((item, index) => {
      classList.add(item);
    });
  },
  hasClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string.trim(className).split(/\s+/);
    return classArray.every((item, index) => {
      return classList.contains(item);
    });
  },
  scrollTopBottomTrigger(el, callback) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollEle = window;
    if (this.isElement(el) && el != document.body && el != document.documentElement) {
      scrollEle = el;
    }
    if (typeof el == "function") {
      callback = el;
    }
    let flag = true;
    scrollEle.addEventListener("scroll", (e) => {
      if (this.getScrollTop(scrollEle) <= 0) {
        let options = {
          state: "top",
          target: scrollEle
        };
        if (!flag) {
          return;
        }
        if (typeof callback == "function") {
          flag = false;
          callback(options);
        }
      } else {
        let options = {
          state: "bottom",
          target: scrollEle
        };
        let height = 0;
        if (scrollEle == window) {
          height = window.innerHeight;
        } else {
          height = scrollEle.clientHeight;
        }
        if (number.add(this.getScrollTop(scrollEle), height) + 1 >= this.getScrollHeight(scrollEle) && height != this.getScrollHeight(scrollEle)) {
          if (!flag) {
            return;
          }
          if (typeof callback == "function") {
            flag = false;
            callback(options);
          }
        } else {
          flag = true;
        }
      }
    });
  },
  getScrollWidth(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollWidth = 0;
    if (this.isElement(el) && el != document.documentElement && el != document.body) {
      scrollWidth = el.scrollWidth;
    } else {
      if (document.documentElement.scrollWidth == 0 || document.body.scrollWidth == 0) {
        scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
      } else {
        scrollWidth = document.documentElement.scrollWidth > document.body.scrollWidth ? document.documentElement.scrollWidth : document.body.scrollWidth;
      }
    }
    return scrollWidth;
  },
  getScrollHeight(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollHeight = 0;
    if (this.isElement(el) && el != document.documentElement && el != document.body) {
      scrollHeight = el.scrollHeight;
    } else {
      if (document.documentElement.scrollHeight == 0 || document.body.scrollHeight == 0) {
        scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      } else {
        scrollHeight = document.documentElement.scrollHeight > document.body.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight;
      }
    }
    return scrollHeight;
  },
  setScrollTop(options) {
    let isWindow = false;
    let el = options.el;
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let number$12 = options.number || 0;
    let time = options.time || 0;
    if (!this.isElement(el) || el == document.body || el == document.documentElement || el == window) {
      isWindow = true;
    }
    return new Promise((resolve, reject) => {
      if (time <= 0) {
        if (isWindow) {
          document.documentElement.scrollTop = document.body.scrollTop = number$12;
        } else {
          el.scrollTop = number$12;
        }
        resolve();
      } else {
        let spacingTime = 10;
        let spacingIndex = number.divide(time, spacingTime);
        let nowTop = this.getScrollTop(el);
        let everTop = number.divide(number.subtract(number$12, nowTop), spacingIndex);
        let scrollTimer = setInterval(() => {
          if (spacingIndex > 0) {
            spacingIndex--;
            if (isWindow) {
              document.documentElement.scrollTop = document.body.scrollTop = nowTop = number.add(nowTop, everTop);
            } else {
              el.scrollTop = nowTop = number.add(nowTop, everTop);
            }
          } else {
            clearInterval(scrollTimer);
            resolve();
          }
        }, spacingTime);
      }
    });
  },
  getScrollTop(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollTop = 0;
    if (this.isElement(el) && el != document.body && el != document.documentElement && el != window) {
      scrollTop = el.scrollTop;
    } else {
      if (document.documentElement.scrollTop == 0 || document.body.scrollTop == 0) {
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      } else {
        scrollTop = document.documentElement.scrollTop > document.body.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
      }
    }
    return scrollTop;
  },
  getScrollLeft(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let scrollLeft = 0;
    if (this.isElement(el) && el != document.body && el != document.documentElement && el != window) {
      scrollLeft = el.scrollLeft;
    } else {
      if (document.documentElement.scrollLeft == 0 || document.body.scrollLeft == 0) {
        scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      } else {
        scrollLeft = document.documentElement.scrollLeft > document.body.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
      }
    }
    return scrollLeft;
  },
  setScrollLeft(options) {
    let isWindow = false;
    let el = options.el;
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let number$12 = options.number || 0;
    let time = options.time || 0;
    if (!this.isElement(el) || el == document.body || el == document.documentElement || el == window) {
      isWindow = true;
    }
    return new Promise((resolve, reject) => {
      if (time <= 0) {
        if (isWindow) {
          document.documentElement.scrollLeft = document.body.scrollLeft = number$12;
        } else {
          el.scrollLeft = number$12;
        }
        resolve();
      } else {
        let spacingTime = 10;
        let spacingIndex = number.divide(time, spacingTime);
        let nowLeft = this.getScrollLeft(el);
        let everLeft = number.divide(number.subtract(number$12, nowLeft), spacingIndex);
        let scrollTimer = setInterval(() => {
          if (spacingIndex > 0) {
            spacingIndex--;
            if (isWindow) {
              document.documentElement.scrollLeft = document.body.scrollLeft = nowLeft = number.add(nowLeft, everLeft);
            } else {
              el.scrollLeft = nowLeft = number.add(nowLeft, everLeft);
            }
          } else {
            clearInterval(scrollTimer);
            resolve();
          }
        }, spacingTime);
      }
    });
  },
  getCssStyle(el, cssName) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!cssName || typeof cssName != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let cssText = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
      cssText = document.defaultView.getComputedStyle(el)[cssName];
    } else {
      cssText = el.currentStyle[cssName];
    }
    return cssText;
  },
  getCssSelector(selector) {
    if (!selector || typeof selector != "string") {
      throw new TypeError("The argument must be a selector string");
    }
    if (/^#{1}/.test(selector)) {
      return {
        type: "id",
        value: selector.substr(1)
      };
    }
    if (/^\./.test(selector)) {
      return {
        type: "class",
        value: selector.substr(1)
      };
    }
    if (/^\[(.+)\]$/.test(selector)) {
      let type = "attribute";
      let value = "";
      let attribute = string.trim(selector, true).substring(1, string.trim(selector, true).length - 1);
      let arry = attribute.split("=");
      if (arry.length == 1) {
        value = arry[0];
      }
      if (arry.length == 2) {
        value = {
          attributeName: arry[0],
          attributeValue: arry[1].replace(/\'/g, "").replace(/\"/g, "")
        };
      }
      return {
        type,
        value
      };
    }
    return {
      type: "tag",
      value: selector
    };
  },
  getElementBounding(el) {
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    if (!this.isElement(el)) {
      el = document.body;
    }
    let point = el.getBoundingClientRect();
    let top = point.top;
    let bottom = number.subtract(document.documentElement.clientHeight || window.innerHeight, point.bottom);
    let left = point.left;
    let right = number.subtract(document.documentElement.clientWidth || window.innerWidth, point.right);
    return {
      top,
      bottom,
      left,
      right
    };
  },
  isElement(el) {
    return el && el instanceof Node && el.nodeType === 1;
  },
  string2dom(str, parentTag = "div") {
    if (!str || typeof str != "string") {
      throw new TypeError("The argument must be an HTML string");
    }
    let parentEle = document.createElement(parentTag);
    parentEle.innerHTML = str;
    if (parentEle.children.length == 1) {
      return parentEle.children[0];
    } else {
      return parentEle.children;
    }
  }
};
const dataName = "_dap-datas";
const data = {
  remove(el, key) {
    if (!(el instanceof Document) && !element.isElement(el) && !element.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let data2 = el[dataName] || {};
    if (key === void 0 || key === null || key === "") {
      el[dataName] = {};
    } else {
      delete data2[key];
      el[dataName] = data2;
    }
  },
  has(el, key) {
    if (!(el instanceof Document) && !element.isElement(el) && !element.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    if (key === void 0 || key === null || key === "") {
      throw new TypeError("The second parameter must be a unique key");
    }
    let data2 = el[dataName] || {};
    return data2.hasOwnProperty(key);
  },
  get(el, key) {
    if (!(el instanceof Document) && !element.isElement(el) && !element.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let data2 = el[dataName] || {};
    if (key === void 0 || key === null || key === "") {
      return data2;
    } else {
      return data2[key];
    }
  },
  set(el, key, value) {
    if (!(el instanceof Document) && !element.isElement(el) && !element.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    if (key === void 0 || key === null || key === "") {
      throw new TypeError("The second parameter must be a unique key");
    }
    let data2 = el[dataName] || {};
    data2[key] = value;
    el[dataName] = data2;
  }
};
const common = {
  matchingText(text, params) {
    if (!text || typeof text != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!params || typeof params != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let reg = null;
    if (params == "Chinese") {
      reg = /^[\u4e00-\u9fa5]+$/;
    }
    if (params == "chinese") {
      reg = /[\u4e00-\u9fa5]/;
    }
    if (params == "email") {
      reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    }
    if (params == "userName") {
      reg = /^[a-zA-Z0-9_]{4,16}$/;
    }
    if (params == "int+") {
      reg = /^\d+$/;
    }
    if (params == "int-") {
      reg = /^-\d+$/;
    }
    if (params == "int") {
      reg = /^-?\d+$/;
    }
    if (params == "pos") {
      reg = /^\d*\.?\d+$/;
    }
    if (params == "neg") {
      reg = /^-\d*\.?\d+$/;
    }
    if (params == "number") {
      reg = /^-?\d*\.?\d+$/;
    }
    if (params == "phone") {
      reg = /^1[0-9]\d{9}$/;
    }
    if (params == "idCard") {
      reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    }
    if (params == "url") {
      reg = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    }
    if (params == "IPv4") {
      reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    }
    if (params == "hex") {
      reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    }
    if (params == "date") {
      let reg1 = /^((\d{4})(-)(\d{2})(-)(\d{2}))$/;
      let reg2 = /^(\d{4})(\/)(\d{2})(\/)(\d{2})$/;
      let reg3 = /^(\d{4})(\.)(\d{2})(\.)(\d{2})$/;
      let reg4 = /^(\d{4})(年)(\d{2})(月)(\d{2})(日)$/;
      return reg1.test(text) || reg2.test(text) || reg3.test(text) || reg4.test(text);
    }
    if (params == "time") {
      reg = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    }
    if (params == "QQ") {
      reg = /^[1-9][0-9]{4,10}$/;
    }
    if (params == "weixin") {
      reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    }
    if (params == "plate") {
      reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    }
    if (!reg) {
      throw new Error("The second parameter is out of scope");
    }
    return reg.test(text);
  },
  getUrlParams(name) {
    if (!name || typeof name != "string") {
      throw new TypeError("The argument must be a string");
    }
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let search = window.location.search.substr(1);
    if (!search) {
      let arr = window.location.hash.split("?");
      if (arr.length == 2) {
        search = arr[1];
      }
    }
    let r = search.match(reg);
    if (r) {
      return decodeURIComponent(r[2]);
    }
    return null;
  },
  isEmptyObject(obj2) {
    if (this.isObject(obj2)) {
      if (Object.keys(obj2).length == 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  equal(a, b) {
    if (typeof a !== typeof b) {
      return false;
    }
    if (this.isObject(a) && this.isObject(b)) {
      a = Object.assign({}, a);
      b = Object.assign({}, b);
      let aProps = Object.getOwnPropertyNames(a);
      let bProps = Object.getOwnPropertyNames(b);
      if (aProps.length != bProps.length) {
        return false;
      }
      let length = aProps.length;
      for (let i = 0; i < length; i++) {
        let propName = aProps[i];
        let propA = a[propName];
        let propB = b[propName];
        if (this.isObject(propA)) {
          if (this.equal(propA, propB)) {
            return true;
          } else {
            return false;
          }
        } else if (propA !== propB) {
          return false;
        }
      }
      return true;
    } else {
      return a === b;
    }
  },
  isObject(val) {
    if (typeof val === "object" && val) {
      return true;
    }
    return false;
  },
  copyText(text) {
    if (!text || typeof text != "string") {
      throw new TypeError("No text to copy is defined");
    }
    let el = element.string2dom('<input type="text" />');
    document.body.appendChild(el);
    el.value = text;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
};
const parseEventName = (eventName) => {
  let eventNames = eventName.split(/[\s]+/g);
  let result = [];
  eventNames.forEach((name) => {
    let arr = name.split(".");
    let obj2 = {
      eventName: arr[0]
    };
    if (arr.length > 1) {
      obj2.guid = arr[1];
    }
    result.push(obj2);
  });
  return result;
};
const updateEvents = (events) => {
  let obj2 = {};
  let keys = Object.keys(events);
  keys.forEach((key) => {
    if (events[key]) {
      obj2[key] = events[key];
    }
  });
  return obj2;
};
const bindSingleListener = (el, eventName, guid, fn, options) => {
  let events = data.get(el, "dap-defined-events") || {};
  if (!guid) {
    guid = data.get(el, "dap-event-guid") || 0;
    data.set(el, "dap-event-guid", guid + 1);
  }
  guid = eventName + "." + guid;
  if (events[guid] && events[guid].type == eventName) {
    el.removeEventListener(eventName, events[guid].fn, events[guid].options);
  }
  el.addEventListener(eventName, fn, options);
  events[guid] = {
    type: eventName,
    fn,
    options
  };
  data.set(el, "dap-defined-events", events);
};
const unbindSingleListener = (el, eventName, guid) => {
  let events = data.get(el, "dap-defined-events") || {};
  let keys = Object.keys(events);
  let length = keys.length;
  for (let i = 0; i < length; i++) {
    let key = keys[i];
    if (events[key].type == eventName) {
      if (guid) {
        if (key == eventName + "." + guid) {
          el.removeEventListener(events[key].type, events[key].fn, events[key].options);
          events[key] = void 0;
        }
      } else {
        el.removeEventListener(events[key].type, events[key].fn, events[key].options);
        events[key] = void 0;
      }
    }
  }
  events = updateEvents(events);
  data.set(el, "dap-defined-events", events);
};
const event$1 = {
  on(el, eventName, fn, options) {
    if (!(el instanceof Document) && !element.isElement(el) && !element.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    if (!eventName || typeof eventName != "string") {
      throw new TypeError("The second argument must be a string");
    }
    if (!fn || typeof fn != "function") {
      throw new TypeError("The third argument must be a function");
    }
    if (!common.isObject(options)) {
      options = {};
    }
    const result = parseEventName(eventName);
    result.forEach((res) => {
      bindSingleListener(el, res.eventName, res.guid, fn.bind(el), options);
    });
  },
  off(el, eventName) {
    if (!(el instanceof Document) && !element.isElement(el) && !element.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let events = data.get(el, "dap-defined-events");
    if (!events) {
      return;
    }
    if (!eventName) {
      let keys = Object.keys(events);
      let length = keys.length;
      for (let i = 0; i < length; i++) {
        let key = keys[i];
        el.removeEventListener(events[key].type, events[key].fn, events[key].options);
      }
      data.remove(el, "dap-defined-events");
      data.remove(el, "dap-event-guid");
      return;
    }
    const result = parseEventName(eventName);
    result.forEach((res) => {
      unbindSingleListener(el, res.eventName, res.guid);
    });
  },
  get(el) {
    if (!(el instanceof Document) && !element.isElement(el) && !element.isWindow(el)) {
      throw new TypeError("The first argument must be an element node or window or document");
    }
    let events = data.get(el, "dap-defined-events");
    if (!events) {
      return;
    }
    return events;
  }
};
const date = {
  getPrevMonths(date2, num) {
    if (!date2 || !(date2 instanceof Date)) {
      date2 = /* @__PURE__ */ new Date();
    }
    if (!number.isNumber(num)) {
      num = 1;
    }
    let dateArray = [date2];
    for (let i = 0; i < num - 1; i++) {
      let y = date2.getFullYear();
      let m = date2.getMonth();
      if (m == 0) {
        m = 12;
        y--;
      }
      let d = /* @__PURE__ */ new Date();
      d.setMonth(m - 1);
      d.setFullYear(y);
      dateArray.push(d);
      date2 = d;
    }
    return dateArray;
  },
  getNextMonths(date2, num) {
    if (!date2 || !(date2 instanceof Date)) {
      date2 = /* @__PURE__ */ new Date();
    }
    if (!number.isNumber(num)) {
      num = 1;
    }
    let dateArray = [date2];
    for (let i = 0; i < num - 1; i++) {
      let y = date2.getFullYear();
      let m = date2.getMonth();
      if (m == 11) {
        m = -1;
        y++;
      }
      let d = /* @__PURE__ */ new Date();
      d.setMonth(m + 1);
      d.setFullYear(y);
      dateArray.push(d);
      date2 = d;
    }
    return dateArray;
  },
  getDateAfter(date2, num) {
    if (!date2 || !(date2 instanceof Date)) {
      date2 = /* @__PURE__ */ new Date();
    }
    if (!number.isNumber(num)) {
      num = 1;
    }
    return new Date(date2.getTime() + num * 24 * 60 * 60 * 1e3);
  },
  getDateBefore(date2, num) {
    if (!date2 || !(date2 instanceof Date)) {
      date2 = /* @__PURE__ */ new Date();
    }
    if (!number.isNumber(num)) {
      num = 1;
    }
    return new Date(date2.getTime() - num * 24 * 60 * 60 * 1e3);
  },
  getDays(year, month) {
    if (!number.isNumber(year)) {
      throw new TypeError("The first parameter must be a number representing the year");
    }
    if (!number.isNumber(month)) {
      throw new TypeError("The second argument must be a number representing the month");
    }
    year = parseInt(year);
    month = parseInt(month);
    let d = new Date(year, month, 0);
    return d.getDate();
  }
};
const color = {
  rgb2hsv(rgb) {
    if (!Array.isArray(rgb) || rgb.length != 3) {
      throw new TypeError("Invalid argument");
    }
    let h2 = 0;
    let s = 0;
    let v = 0;
    let r = rgb[0] >= 255 ? 255 : rgb[0];
    let g = rgb[1] >= 255 ? 255 : rgb[1];
    let b = rgb[2] >= 255 ? 255 : rgb[2];
    r = r <= 0 ? 0 : r;
    g = g <= 0 ? 0 : g;
    b = b <= 0 ? 0 : b;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    v = max / 255;
    if (max === 0) {
      s = 0;
    } else {
      s = 1 - min / max;
    }
    if (max === min) {
      h2 = 0;
    } else if (max === r && g >= b) {
      h2 = 60 * ((g - b) / (max - min)) + 0;
    } else if (max === r && g < b) {
      h2 = 60 * ((g - b) / (max - min)) + 360;
    } else if (max === g) {
      h2 = 60 * ((b - r) / (max - min)) + 120;
    } else if (max === b) {
      h2 = 60 * ((r - g) / (max - min)) + 240;
    }
    h2 = parseInt(h2);
    s = parseInt(s * 100);
    v = parseInt(v * 100);
    return [h2, s, v];
  },
  hsv2rgb(hsv) {
    if (!Array.isArray(hsv) || hsv.length != 3) {
      throw new TypeError("Invalid argument");
    }
    let h2 = hsv[0] >= 360 || hsv[0] <= 0 ? 0 : hsv[0];
    let s = hsv[1] >= 100 ? 100 : hsv[1];
    s = s <= 0 ? 0 : s;
    let v = hsv[2] >= 100 ? 100 : hsv[2];
    v = v <= 0 ? 0 : v;
    s = s / 100;
    v = v / 100;
    let r = 0;
    let g = 0;
    let b = 0;
    let i = parseInt(h2 / 60 % 6);
    let f = h2 / 60 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
    r = parseInt(r * 255);
    g = parseInt(g * 255);
    b = parseInt(b * 255);
    return [r, g, b];
  },
  rgb2hex(rgb) {
    if (!Array.isArray(rgb) || rgb.length != 3) {
      throw new TypeError("Invalid argument");
    }
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
  },
  hex2rgb(hex) {
    if (!hex || typeof hex != "string") {
      throw new TypeError("The argument must be a string");
    }
    let color2 = hex.toLowerCase();
    if (!common.matchingText(color2, "hex")) {
      throw new TypeError("The argument must be a hexadecimal color value");
    }
    if (color2.length === 4) {
      let colorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        colorNew += color2.slice(i, i + 1).concat(color2.slice(i, i + 1));
      }
      color2 = colorNew;
    }
    let colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color2.slice(i, i + 2)));
    }
    return colorChange;
  }
};
const file = {
  getImageUrl(file2) {
    if (!file2 || !(file2 instanceof File)) {
      throw new TypeError("The argument must be a File object");
    }
    return window.URL.createObjectURL(file2);
  },
  dataFileToBase64(file2) {
    return new Promise((resolve, reject) => {
      if (!file2 || !(file2 instanceof File)) {
        reject(new TypeError("The argument must be a File object"));
      }
      let reader = new FileReader();
      reader.readAsDataURL(file2);
      reader.onloadend = () => {
        let dataURL = reader.result;
        resolve(dataURL);
      };
    });
  },
  dataBase64toFile(base64String, fileName) {
    if (!base64String || typeof base64String != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!fileName || typeof fileName != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let arr = base64String.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {
      type: mime
    });
  }
};
const platform = {
  language() {
    return window.navigator.browserLanguage || window.navigator.language;
  },
  device() {
    const userAgent = window.navigator.userAgent;
    return {
      PC: !userAgent.match(/AppleWebKit.*Mobile.*/),
      Mobile: !!userAgent.match(/AppleWebKit.*Mobile.*/),
      iPhone: userAgent.includes("iPhone"),
      Phone: userAgent.includes("Android") && /(?:Mobile)/.test(userAgent) || userAgent.includes("iPhone") || /(?:Windows Phone)/.test(userAgent),
      iPad: userAgent.includes("iPad"),
      Tablet: userAgent.includes("iPad") || userAgent.includes("Android") && !/(?:Mobile)/.test(userAgent) || userAgent.includes("Firefox") && /(?:Tablet)/.test(userAgent),
      WindowsPhone: /(?:Windows Phone)/.test(userAgent)
    };
  },
  browser() {
    const userAgent = window.navigator.userAgent;
    return {
      Edge: !!userAgent.match(/Edg\/([\d.]+)/),
      weixin: userAgent.includes("MicroMessenger"),
      QQ: userAgent.includes("QQ"),
      QQBrowser: userAgent.includes("MQQBrowser"),
      UC: userAgent.includes("UCBrowser"),
      Chrome: userAgent.includes("Chrome"),
      Firefox: userAgent.includes("Firefox"),
      sougou: userAgent.toLocaleLowerCase().includes("se 2.x") || userAgent.toLocaleLowerCase().includes("metasr") || userAgent.toLocaleLowerCase().includes("sogou"),
      Safari: userAgent.includes("Safari") && !userAgent.includes("Chrome")
    };
  },
  browserKernel() {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("Presto")) {
      return "opera";
    } else if (userAgent.includes("AppleWebKit")) {
      return "webkit";
    } else if (userAgent.includes("Gecko") && !userAgent.includes("KHTML")) {
      return "gecko";
    }
    return "";
  },
  os() {
    const userAgent = window.navigator.userAgent;
    return {
      Windows: userAgent.includes("Windows"),
      Windows_CPU: function() {
        if (userAgent.toLocaleLowerCase().includes("win64") || userAgent.toLocaleLowerCase().includes("wow64")) {
          return "x64";
        } else if (userAgent.toLocaleLowerCase().includes("win32") || userAgent.toLocaleLowerCase().includes("wow32")) {
          return "x32";
        }
        return "";
      }(),
      Windows_Version: function() {
        if (userAgent.includes("Windows NT 6.1") || userAgent.includes("Windows 7")) {
          return "Win7";
        } else if (userAgent.includes("Windows NT 6.3") || userAgent.includes("Windows NT 6.2") || userAgent.includes("Windows NT 8")) {
          return "Win8";
        } else if (userAgent.includes("Windows NT 10") || userAgent.includes("Windows NT 6.4")) {
          return "Win10";
        }
        return "";
      }(),
      Mac: userAgent.includes("Macintosh"),
      Mac_Version: function() {
        if (userAgent.includes("Macintosh")) {
          const matches = userAgent.match(/Mac OS X ([^\s]+)\)/);
          if (matches && matches[1]) {
            return matches[1].split(/_|\./).join(".");
          }
        }
        return "";
      }(),
      ios: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      ios_Version: function() {
        if (!!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
          const matches = userAgent.match(/CPU.+OS ([^\s]+) like Mac OS X/);
          if (matches && matches[1]) {
            return matches[1].split(/_|\./).join(".");
          }
        }
        return "";
      }(),
      Android: userAgent.includes("Android"),
      Android_Version: function() {
        const matches = userAgent.match(/Android ([^\s]+);/);
        if (matches && matches[1]) {
          return matches[1].split(/_|\./).join(".");
        }
        return "";
      }(),
      Linux: userAgent.includes("Linux"),
      HarmonyOS: userAgent.includes("HarmonyOS"),
      Ubuntu: userAgent.includes("Ubuntu")
    };
  }
};
const speech = {
  start(text, params) {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    let defaultParams = {
      pitch: 0.8,
      rate: 1,
      volume: 1,
      start: function() {
      },
      end: function() {
      },
      pause: function() {
      },
      resume: function() {
      },
      error: function() {
      }
    };
    if (!common.isObject(params)) {
      params = {};
    }
    if (number.isNumber(params.pitch)) {
      defaultParams.pitch = params.pitch;
    }
    if (number.isNumber(params.rate)) {
      defaultParams.rate = params.rate;
    }
    if (number.isNumber(params.volume)) {
      defaultParams.volume = params.volume;
    }
    if (typeof params.start == "function") {
      defaultParams.start = params.start;
    }
    if (typeof params.end == "function") {
      defaultParams.end = params.end;
    }
    if (typeof params.pause == "function") {
      defaultParams.pause = params.pause;
    }
    if (typeof params.resume == "function") {
      defaultParams.resume = params.resume;
    }
    if (typeof params.error == "function") {
      defaultParams.error = params.error;
    }
    const speech2 = new SpeechSynthesisUtterance();
    speech2.text = text;
    speech2.pitch = defaultParams.pitch;
    speech2.rate = defaultParams.rate;
    speech2.volume = defaultParams.volume;
    speech2.lang = "zh-CN";
    speech2.onstart = (event2) => {
      defaultParams.start.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onend = (event2) => {
      defaultParams.end.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onpause = (event2) => {
      defaultParams.pause.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onresume = (event2) => {
      defaultParams.resume.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    speech2.onerror = (event2) => {
      defaultParams.error.apply(speech2, [
        event2,
        {
          text,
          pitch: defaultParams.pitch,
          rate: defaultParams.rate,
          volume: defaultParams.volume
        }
      ]);
    };
    window.speechSynthesis.speak(speech2);
  },
  stop() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.cancel();
  },
  pause() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.pause();
  },
  resume() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.resume();
  }
};
const obj = { number, data, element, event: event$1, common, date, color, file, string, platform, speech };
const Util = {
  getAttributes(el) {
    let o = {};
    for (let attribute of el.attributes) {
      if (!/(^on)|(^style$)|(^contenteditable$)/g.test(attribute.nodeName)) {
        o[attribute.nodeName] = attribute.nodeValue;
      }
    }
    return o;
  },
  getStyles(el) {
    let o = {};
    if (el.getAttribute("style")) {
      const styles = el.getAttribute("style");
      let i = 0;
      let start = 0;
      let splitStyles = [];
      while (i < styles.length) {
        if (styles[i] == ";" && styles.substring(i + 1, i + 8) != "base64,") {
          splitStyles.push(styles.substring(start, i));
          start = i + 1;
        }
        if (i == styles.length - 1 && start < i) {
          splitStyles.push(styles.substring(start, i));
        }
        i++;
      }
      splitStyles.forEach((style) => {
        const index = style.indexOf(":");
        const property = style.substring(0, index).trim();
        const value = style.substring(index + 1).trim();
        o[property] = value;
      });
    }
    return o;
  },
  getUniqueKey() {
    let key = obj.data.get(window, "data-alex-editor-key") || 0;
    key++;
    obj.data.set(window, "data-alex-editor-key", key);
    return key;
  },
  isSpaceText(val) {
    return /^[\uFEFF]+$/g.test(val);
  },
  clone(data2) {
    if (obj.common.isObject(data2) || Array.isArray(data2)) {
      return JSON.parse(JSON.stringify(data2));
    }
    return data2;
  },
  isContains(parent, target) {
    if (target.nodeType == 3) {
      return obj.element.isContains(parent, target.parentNode);
    }
    return obj.element.isContains(parent, target);
  },
  blobToBase64(blob) {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        resolve(e.target.result);
      };
      fileReader.readAsDataURL(blob);
    });
  },
  createGuid() {
    let guid = obj.data.get(document.documentElement, "mvi-editor-guid") || 0;
    guid++;
    obj.data.set(document.body, "mvi-editor-guid", guid);
    return guid;
  }
};
const _AlexElement = class {
  constructor(type, parsedom, marks, styles, textContent) {
    this.key = Util.getUniqueKey();
    this.type = type;
    this.parsedom = parsedom;
    this.marks = marks;
    this.styles = styles;
    this.textContent = textContent;
    this.children = null;
    this.parent = null;
    this.behavior = "default";
    this._elm = null;
  }
  isBlock() {
    return this.type == "block";
  }
  isInblock() {
    return this.type == "inblock";
  }
  isInline() {
    return this.type == "inline";
  }
  isClosed() {
    return this.type == "closed";
  }
  isText() {
    return this.type == "text";
  }
  isBreak() {
    return this.isClosed() && this.parsedom == "br";
  }
  isEmpty() {
    if (this.isText()) {
      return !this.textContent;
    }
    if (this.isBlock() || this.isInblock() || this.isInline()) {
      if (!this.hasChildren()) {
        return true;
      }
      const allEmpty = this.children.every((el) => {
        return !el || el.isEmpty();
      });
      return allEmpty;
    }
    return false;
  }
  isSpaceText() {
    return this.isText() && !this.isEmpty() && Util.isSpaceText(this.textContent);
  }
  isEqual(element2) {
    if (!_AlexElement.isElement(element2)) {
      return false;
    }
    return this.key == element2.key;
  }
  isContains(element2) {
    if (this.isEqual(element2)) {
      return true;
    }
    if (element2.isBlock()) {
      return false;
    }
    return this.isContains(element2.parent);
  }
  isOnlyHasBreak() {
    if (this.hasChildren()) {
      return this.children.every((item) => {
        return item.isBreak() || item.isEmpty();
      });
    }
    return false;
  }
  isPreStyle() {
    const block2 = this.getBlock();
    const inblock2 = this.getInblock();
    if (inblock2) {
      if (inblock2.parsedom == "pre") {
        return true;
      }
      if (inblock2.hasStyles() && (inblock2.styles["white-space"] == "pre" || inblock2.styles["white-space"] == "pre-wrap")) {
        return true;
      }
      return inblock2.parent.isPreStyle();
    } else {
      if (block2.parsedom == "pre") {
        return true;
      }
      if (block2.hasStyles() && (block2.styles["white-space"] == "pre" || block2.styles["white-space"] == "pre-wrap")) {
        return true;
      }
      return false;
    }
  }
  hasMarks() {
    if (!this.marks) {
      return false;
    }
    if (obj.common.isObject) {
      return !obj.common.isEmptyObject(this.marks);
    }
    return false;
  }
  hasStyles() {
    if (!this.styles) {
      return false;
    }
    if (obj.common.isObject(this.styles)) {
      return !obj.common.isEmptyObject(this.styles);
    }
    return false;
  }
  hasChildren() {
    if (this.isClosed() || this.isText()) {
      return false;
    }
    if (Array.isArray(this.children)) {
      return !!this.children.length;
    }
    return false;
  }
  hasContains(element2) {
    return this.isContains(element2) || element2.isContains(this);
  }
  clone(deep = true) {
    if (typeof deep != "boolean") {
      throw new Error("The parameter must be a Boolean");
    }
    let el = new _AlexElement(this.type, this.parsedom, Util.clone(this.marks), Util.clone(this.styles), this.textContent);
    el.behavior = this.behavior;
    if (deep && this.hasChildren()) {
      this.children.forEach((child) => {
        let clonedChild = child.clone(deep);
        if (el.hasChildren()) {
          el.children.push(clonedChild);
        } else {
          el.children = [clonedChild];
        }
        clonedChild.parent = el;
      });
    }
    return el;
  }
  convertToBlock() {
    if (this.isBlock()) {
      throw new Error('This element is already of type "block"');
    }
    let element2 = this.clone();
    this.type = "block";
    this.parsedom = _AlexElement.BLOCK_NODE;
    this.marks = null;
    this.styles = null;
    this.textContent = null;
    this.children = [element2];
    element2.parent = this;
  }
  toEmpty() {
    if (this.isEmpty()) {
      return;
    }
    if (this.isText()) {
      this.marks = null;
      this.styles = null;
      this.textContent = null;
      this._elm = null;
    } else if (this.isClosed()) {
      this.type = "text";
      this.parsedom = null;
      this.marks = null;
      this.styles = null;
      this.textContent = null;
      this._elm = null;
    } else if (this.hasChildren()) {
      this.children.forEach((el) => {
        el.toEmpty();
      });
    }
  }
  getBlock() {
    if (this.isBlock()) {
      return this;
    }
    return this.parent.getBlock();
  }
  getInblock() {
    if (this.isInblock()) {
      return this;
    }
    if (this.isBlock()) {
      return null;
    }
    return this.parent.getInblock();
  }
  getInline() {
    if (this.isInline()) {
      return this;
    }
    if (this.isBlock()) {
      return null;
    }
    return this.parent.getInline();
  }
  isEqualStyles(element2) {
    if (!this.hasStyles() && !element2.hasStyles()) {
      return true;
    }
    if (this.hasStyles() && element2.hasStyles() && obj.common.equal(this.styles, element2.styles)) {
      return true;
    }
    return false;
  }
  isEqualMarks(element2) {
    if (!this.hasMarks() && !element2.hasMarks()) {
      return true;
    }
    if (this.hasMarks() && element2.hasMarks() && obj.common.equal(this.marks, element2.marks)) {
      return true;
    }
    return false;
  }
  __renderElement() {
    let el = null;
    if (this.isText()) {
      el = document.createElement(_AlexElement.TEXT_NODE);
      const text = document.createTextNode(this.textContent);
      el.appendChild(text);
    } else {
      el = document.createElement(this.parsedom);
      if (this.hasChildren()) {
        for (let child of this.children) {
          child.__renderElement();
          el.appendChild(child._elm);
        }
      }
    }
    if (this.hasMarks()) {
      for (let key in this.marks) {
        if (!/(^on)|(^style$)|(^contenteditable$)/g.test(key)) {
          el.setAttribute(key, this.marks[key]);
        }
      }
    }
    if (this.hasStyles()) {
      for (let key in this.styles) {
        el.style.setProperty(key, this.styles[key]);
      }
    }
    obj.data.set(el, "data-alex-editor-key", this.key);
    this._elm = el;
  }
  __fullClone() {
    let el = new _AlexElement(this.type, this.parsedom, Util.clone(this.marks), Util.clone(this.styles), this.textContent);
    el.behavior = this.behavior;
    el.key = this.key;
    el._elm = this._elm;
    if (this.hasChildren()) {
      this.children.forEach((child) => {
        let clonedChild = child.__fullClone();
        if (el.hasChildren()) {
          el.children.push(clonedChild);
        } else {
          el.children = [clonedChild];
        }
        clonedChild.parent = el;
      });
    }
    return el;
  }
  __getLink() {
    if (this.parsedom == "a") {
      return this;
    }
    if (this.isBlock()) {
      return null;
    }
    return this.parent.__getLink();
  }
  static isElement(val) {
    return val instanceof _AlexElement;
  }
  static flatElements(elements) {
    const flat = (arr) => {
      let result = [];
      arr.forEach((element2) => {
        if (_AlexElement.isElement(element2)) {
          result.push(element2);
          if (element2.hasChildren()) {
            let arr2 = flat(element2.children);
            result = [...result, ...arr2];
          }
        }
      });
      return result;
    };
    return flat(elements);
  }
  static getSpaceElement() {
    return new _AlexElement("text", null, null, null, "\uFEFF");
  }
};
let AlexElement = _AlexElement;
__publicField(AlexElement, "BLOCK_NODE", "p");
__publicField(AlexElement, "TEXT_NODE", "span");
__publicField(AlexElement, "VOID_NODES", ["colgroup", "col"]);
const AlexElement$1 = AlexElement;
class AlexPoint {
  constructor(element2, offset) {
    this.element = element2;
    this.offset = offset;
    this._init();
  }
  _init() {
    if (this.element.isText() || this.element.isClosed()) {
      return;
    }
    if (this.offset == 0) {
      this.moveToStart(this.element);
    } else {
      this.moveToEnd(this.element);
    }
  }
  static isPoint(val) {
    return val instanceof AlexPoint;
  }
  isEqual(point) {
    if (!AlexPoint.isPoint(point)) {
      return false;
    }
    return this.element.isEqual(point.element) && this.offset == point.offset;
  }
  moveToEnd(element2) {
    if (!AlexElement$1.isElement(element2)) {
      throw new Error("The argument must be an AlexElement instance");
    }
    if (element2.isEmpty()) {
      throw new Error("The argument cannot be an empty element");
    }
    if (element2.isText()) {
      this.element = element2;
      this.offset = element2.textContent.length;
    } else if (element2.isClosed()) {
      this.element = element2;
      this.offset = 1;
    } else if (element2.hasChildren()) {
      const flatElements = AlexElement$1.flatElements(element2.children).filter((el) => {
        return !el.isEmpty();
      });
      const length = flatElements.length;
      this.moveToEnd(flatElements[length - 1]);
    }
  }
  moveToStart(element2) {
    if (!AlexElement$1.isElement(element2)) {
      throw new Error("The argument must be an AlexElement instance");
    }
    if (element2.isEmpty()) {
      throw new Error("The argument cannot be an empty element");
    }
    if (element2.isText()) {
      this.element = element2;
      this.offset = 0;
    } else if (element2.isClosed()) {
      this.element = element2;
      this.offset = 0;
    } else if (element2.hasChildren()) {
      const flatElements = AlexElement$1.flatElements(element2.children).filter((el) => {
        return !el.isEmpty();
      });
      this.moveToStart(flatElements[0]);
    }
  }
}
class AlexRange {
  constructor(anchor, focus) {
    this.anchor = anchor;
    this.focus = focus;
  }
}
class AlexHistory {
  constructor() {
    this.records = [];
    this.current = -1;
  }
  push(stack, range) {
    if (this.current < this.records.length - 1) {
      this.records.length = this.current + 1;
    }
    const newStack = stack.map((ele) => {
      return ele.__fullClone();
    });
    const anchorElement = AlexElement$1.flatElements(newStack).find((ele) => {
      return ele.key == range.anchor.element.key;
    });
    const focusElement = AlexElement$1.flatElements(newStack).find((ele) => {
      return ele.key == range.focus.element.key;
    });
    const anchor = new AlexPoint(anchorElement, range.anchor.offset);
    const focus = new AlexPoint(focusElement, range.focus.offset);
    const newRange = new AlexRange(anchor, focus);
    this.records.push({
      stack: newStack,
      range: newRange
    });
    this.current += 1;
  }
  get(type) {
    if (type == -1) {
      if (this.current <= 0) {
        return null;
      }
      this.current -= 1;
    } else if (type == 1) {
      if (this.current >= this.records.length - 1) {
        return null;
      }
      this.current += 1;
    }
    const { stack, range } = this.records[this.current];
    const newStack = stack.map((ele) => {
      return ele.__fullClone();
    });
    const anchorElement = AlexElement$1.flatElements(newStack).find((ele) => {
      return ele.key == range.anchor.element.key;
    });
    const focusElement = AlexElement$1.flatElements(newStack).find((ele) => {
      return ele.key == range.focus.element.key;
    });
    const anchor = new AlexPoint(anchorElement, range.anchor.offset);
    const focus = new AlexPoint(focusElement, range.focus.offset);
    const newRange = new AlexRange(anchor, focus);
    return {
      stack: newStack,
      range: newRange
    };
  }
}
const { Mac } = obj.platform.os();
const Keyboard = {
  Undo(e) {
    if (Mac) {
      return e.keyCode == 90 && e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
    }
    return e.keyCode == 90 && e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey;
  },
  Redo(e) {
    if (Mac) {
      return e.keyCode == 90 && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey;
    }
    return e.keyCode == 89 && e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey;
  },
  Indent(e) {
    return e.keyCode == 9 && !e.metaKey && !e.shiftKey && !e.ctrlKey && !e.altKey;
  },
  Outdent(e) {
    return e.keyCode == 9 && !e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey;
  }
};
const block = [
  {
    parsedom: "p"
  },
  {
    parsedom: "div"
  },
  {
    parsedom: "table"
  },
  {
    parsedom: "ul"
  },
  {
    parsedom: "ol"
  },
  {
    parsedom: "h1"
  },
  {
    parsedom: "h2"
  },
  {
    parsedom: "h3"
  },
  {
    parsedom: "h4"
  },
  {
    parsedom: "h5"
  },
  {
    parsedom: "h6"
  },
  {
    parsedom: "blockquote"
  },
  {
    parsedom: "pre"
  },
  {
    parsedom: "address",
    parse: true
  },
  {
    parsedom: "article",
    parse: true
  },
  {
    parsedom: "aside",
    parse: true
  },
  {
    parsedom: "nav",
    parse: true
  },
  {
    parsedom: "section",
    parse: true
  }
];
const inblock = [
  {
    parsedom: "li",
    block: true
  },
  {
    parsedom: "tfoot"
  },
  {
    parsedom: "tbody"
  },
  {
    parsedom: "thead"
  },
  {
    parsedom: "tr"
  },
  {
    parsedom: "th"
  },
  {
    parsedom: "td"
  },
  {
    parsedom: "colgroup"
  }
];
const inline = [
  {
    parsedom: "span"
  },
  {
    parsedom: "a"
  },
  {
    parsedom: "label"
  },
  {
    parsedom: "code"
  },
  {
    parsedom: "b",
    parse: {
      "font-weight": "bold"
    }
  },
  {
    parsedom: "strong",
    parse: {
      "font-weight": "bold"
    }
  },
  {
    parsedom: "sup",
    parse: {
      "vertical-align": "super"
    }
  },
  {
    parsedom: "sub",
    parse: {
      "vertical-align": "sub"
    }
  },
  {
    parsedom: "i",
    parse: {
      "font-style": "italic"
    }
  },
  {
    parsedom: "u",
    parse: {
      "text-decoration-line": "underline"
    }
  },
  {
    parsedom: "del",
    parse: {
      "text-decoration-line": "line-through"
    }
  },
  {
    parsedom: "abbr",
    parse: true
  },
  {
    parsedom: "acronym",
    parse: true
  },
  {
    parsedom: "bdo",
    parse: true
  }
];
const closed = [
  {
    parsedom: "br"
  },
  {
    parsedom: "col"
  },
  {
    parsedom: "img"
  },
  {
    parsedom: "hr"
  },
  {
    parsedom: "video"
  },
  {
    parsedom: "audio"
  }
];
const defaultConfig = {
  block,
  inblock,
  inline,
  closed
};
class AlexEditor {
  constructor(el, options) {
    __publicField(this, "__formatUnchangeableRules", [
      (element2) => {
        if (!element2.parent && !element2.isBlock() && !element2.isEmpty()) {
          element2.convertToBlock();
        }
      },
      (element2) => {
        if (element2.hasChildren()) {
          const hasBlock = element2.children.some((el) => {
            return !el.isEmpty() && el.isBlock();
          });
          if (hasBlock) {
            element2.children.forEach((el) => {
              if (!el.isEmpty() && el.isBlock()) {
                el.type = element2.type == "inline" ? "inline" : "inblock";
              }
            });
          }
        }
      },
      (element2) => {
        if (element2.hasChildren()) {
          let hasInblock = element2.children.some((el) => {
            return !el.isEmpty() && el.isInblock();
          });
          let hasOtherElement = element2.children.some((el) => {
            return !el.isEmpty() && !el.isInblock();
          });
          if (hasInblock && hasOtherElement) {
            element2.children.forEach((el) => {
              if (!el.isEmpty() && el.isInblock()) {
                el.type = "inline";
              }
            });
          }
        }
      },
      (element2) => {
        if (element2.isInline() && element2.hasChildren()) {
          const hasInblock = element2.children.some((el) => {
            return !el.isEmpty() && el.isInblock();
          });
          if (hasInblock) {
            element2.children.forEach((el) => {
              if (!el.isEmpty() && el.isInblock()) {
                el.type = "inline";
              }
            });
          }
        }
      },
      (element2) => {
        if (element2.hasChildren()) {
          if (element2.isBlock() || element2.isInblock()) {
            let hasBreak = element2.children.some((el) => {
              return el.isBreak();
            });
            let hasOtherElement = element2.children.some((el) => {
              return !el.isEmpty() && !el.isBreak();
            });
            if (hasBreak && hasOtherElement) {
              element2.children.forEach((el) => {
                if (el.isBreak()) {
                  el.toEmpty();
                }
              });
            } else if (hasBreak && element2.children.length > 1) {
              element2.children.forEach((el, index) => {
                if (el.isBreak() && index > 0) {
                  el.toEmpty();
                }
              });
            }
          } else if (element2.isInline()) {
            element2.children.forEach((el) => {
              if (el.isBreak()) {
                el.toEmpty();
              }
            });
          }
        }
      },
      (element2) => {
        const mergeElement = (ele) => {
          const canMerge = (pel, nel) => {
            if (pel.isEmpty() || nel.isEmpty()) {
              return true;
            }
            if (pel.isText() && nel.isText()) {
              return pel.isEqualStyles(nel) && pel.isEqualMarks(nel);
            }
            if (pel.isInline() && nel.isInline()) {
              return pel.parsedom == nel.parsedom && pel.isEqualMarks(nel) && pel.isEqualStyles(nel);
            }
            return false;
          };
          const merge = (pel, nel) => {
            if (pel.isEmpty() || nel.isEmpty()) {
              if (nel.isEmpty()) {
                if (this.range && nel.isContains(this.range.anchor.element)) {
                  if (pel.isEmpty()) {
                    this.range.anchor.element = pel;
                    this.range.anchor.offset = 0;
                  } else {
                    this.range.anchor.moveToEnd(pel);
                  }
                }
                if (this.range && nel.isContains(this.range.focus.element)) {
                  if (pel.isEmpty()) {
                    this.range.focus.element = pel;
                    this.range.focus.offset = 0;
                  } else {
                    this.range.focus.moveToEnd(pel);
                  }
                }
                const index = nel.parent.children.findIndex((item) => {
                  return nel.isEqual(item);
                });
                nel.parent.children.splice(index, 1);
              } else if (pel.isEmpty()) {
                if (this.range && pel.isContains(this.range.anchor.element)) {
                  if (nel.isEmpty()) {
                    this.range.anchor.element = nel;
                    this.range.anchor.offset = 0;
                  } else {
                    this.range.anchor.moveToStart(nel);
                  }
                }
                if (this.range && pel.isContains(this.range.focus.element)) {
                  if (nel.isEmpty()) {
                    this.range.focus.element = nel;
                    this.range.focus.offset = 0;
                  } else {
                    this.range.focus.moveToStart(nel);
                  }
                }
                const index = pel.parent.children.findIndex((item) => {
                  return pel.isEqual(item);
                });
                pel.parent.children.splice(index, 1);
              }
            } else if (pel.isText()) {
              if (this.range && nel.isEqual(this.range.anchor.element)) {
                this.range.anchor.element = pel;
                this.range.anchor.offset = pel.textContent.length + this.range.anchor.offset;
              }
              if (this.range && nel.isEqual(this.range.focus.element)) {
                this.range.focus.element = pel;
                this.range.focus.offset = pel.textContent.length + this.range.focus.offset;
              }
              if (!pel.textContent) {
                pel.textContent = "";
              }
              if (!nel.textContent) {
                nel.textContent = "";
              }
              pel.textContent += nel.textContent;
              const index = nel.parent.children.findIndex((item) => {
                return nel.isEqual(item);
              });
              nel.parent.children.splice(index, 1);
            } else if (pel.isInline()) {
              if (!pel.hasChildren()) {
                pel.children = [];
              }
              if (!nel.hasChildren()) {
                nel.children = [];
              }
              pel.children.push(...nel.children);
              pel.children.forEach((item) => {
                item.parent = pel;
              });
              mergeElement(pel);
              const index = nel.parent.children.findIndex((item) => {
                return nel.isEqual(item);
              });
              nel.parent.children.splice(index, 1);
            }
          };
          if (ele.hasChildren() && ele.children.length > 1) {
            let index = 0;
            while (index <= ele.children.length - 2) {
              if (canMerge(ele.children[index], ele.children[index + 1])) {
                merge(ele.children[index], ele.children[index + 1]);
              } else {
                index++;
              }
            }
          }
        };
        mergeElement(element2);
      },
      (element2) => {
        const canMerge = (parent, child) => {
          if (child.isText() && parent.isInline()) {
            return parent.parsedom == AlexElement$1.TEXT_NODE;
          }
          if (parent.isInline() && child.isInline() || parent.isInblock() && child.isInblock()) {
            return parent.parsedom == child.parsedom;
          }
          return false;
        };
        const merge = (parent, child) => {
          if (child.isText()) {
            parent.type = "text";
            parent.parsedom = null;
            if (child.hasMarks()) {
              if (parent.hasMarks()) {
                Object.assign(parent.marks, Util.clone(child.marks));
              } else {
                parent.marks = Util.clone(child.marks);
              }
            }
            if (child.hasStyles()) {
              if (parent.hasStyles()) {
                Object.assign(parent.styles, Util.clone(child.styles));
              } else {
                parent.styles = Util.clone(child.styles);
              }
            }
            parent.textContent = child.textContent;
            parent.children = null;
            if (this.range && child.isEqual(this.range.anchor.element)) {
              this.range.anchor.element = parent;
            }
            if (this.range && child.isEqual(this.range.focus.element)) {
              this.range.focus.element = parent;
            }
          } else {
            if (child.hasMarks()) {
              if (parent.hasMarks()) {
                Object.assign(parent.marks, Util.clone(child.marks));
              } else {
                parent.marks = Util.clone(child.marks);
              }
            }
            if (child.hasStyles()) {
              if (parent.hasStyles()) {
                Object.assign(parent.styles, Util.clone(child.styles));
              } else {
                parent.styles = Util.clone(child.styles);
              }
            }
            if (child.hasChildren()) {
              parent.children = [...child.children];
              parent.children.forEach((item) => {
                item.parent = parent;
              });
            }
          }
        };
        if (element2.hasChildren() && element2.children.length == 1 && canMerge(element2, element2.children[0])) {
          merge(element2, element2.children[0]);
        }
      },
      (element2) => {
        if (element2.isEmpty()) {
          if (this.range && element2.isContains(this.range.anchor.element)) {
            this.__setRecentlyPoint(this.range.anchor);
          }
          if (this.range && element2.isContains(this.range.focus.element)) {
            this.__setRecentlyPoint(this.range.focus);
          }
        }
      }
    ]);
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    if (!obj.element.isElement(el)) {
      throw new Error("You must specify a dom container to initialize the editor");
    }
    if (obj.data.get(el, "data-alex-editor-init")) {
      throw new Error("The element node has been initialized to the editor");
    }
    obj.data.set(el, "data-alex-editor-init", true);
    options = this.__formatOptions(options);
    this.__guid = Util.createGuid();
    this.$el = el;
    this.disabled = options.disabled;
    this.value = options.value;
    this.renderRules = options.renderRules;
    this.htmlPaste = options.htmlPaste;
    this.range = null;
    this.history = new AlexHistory();
    this.__events = {};
    this.__oldValue = options.value;
    this.__isInputChinese = false;
    this.stack = this.parseHtml(this.value);
    this.__oldStack = null;
    this.__initRange();
    this.disabled ? this.setDisabled() : this.setEnabled();
    this.useClipboard = true;
    this.__judgeUseClipboard();
    obj.event.on(document, `selectionchange.alex_editor_${this.__guid}`, this.__handleSelectionChange.bind(this));
    obj.event.on(this.$el, "beforeinput.alex_editor", this.__handleBeforeInput.bind(this));
    obj.event.on(this.$el, "compositionstart.alex_editor compositionupdate.alex_editor compositionend.alex_editor", this.__handleChineseInput.bind(this));
    obj.event.on(this.$el, "keydown.alex_editor", this.__handleKeydown.bind(this));
    obj.event.on(this.$el, "cut.alex_editor", this.__handleCut.bind(this));
    obj.event.on(this.$el, "paste.alex_editor", this.__handlePaste.bind(this));
    obj.event.on(this.$el, "copy.alex_editor", this.__handleCopy.bind(this));
    obj.event.on(this.$el, "dragstart.alex_editor drop.alex_editor ", (e) => e.preventDefault());
    obj.event.on(this.$el, "focus.alex_editor", () => {
      this.emit("focus", this.value);
    });
    obj.event.on(this.$el, "blur.alex_editor", () => {
      this.emit("blur", this.value);
    });
  }
  __formatOptions(options) {
    let opts = {
      disabled: false,
      renderRules: [],
      htmlPaste: false,
      value: "<p><br></p>"
    };
    if (obj.common.isObject(options)) {
      if (typeof options.disabled == "boolean") {
        opts.disabled = options.disabled;
      }
      if (Array.isArray(options.renderRules)) {
        opts.renderRules = options.renderRules;
      }
      if (typeof options.value == "string" && options.value) {
        opts.value = options.value;
      }
      if (typeof options.htmlPaste == "boolean") {
        opts.htmlPaste = options.htmlPaste;
      }
    }
    return opts;
  }
  __initRange() {
    const lastElement = this.stack[this.stack.length - 1];
    const anchor = new AlexPoint(lastElement, 0);
    const focus = new AlexPoint(lastElement, 0);
    this.range = new AlexRange(anchor, focus);
    this.range.anchor.moveToEnd(lastElement);
    this.range.focus.moveToEnd(lastElement);
  }
  __rectifyRangeInBreak() {
    let isRectify = false;
    if (this.range.anchor.element.isBreak() && this.range.anchor.offset == 1) {
      this.range.anchor.offset = 0;
      isRectify = true;
    }
    if (this.range.focus.element.isBreak() && this.range.focus.offset == 1) {
      this.range.focus.offset = 0;
      isRectify = true;
    }
    if (isRectify) {
      this.rangeRender();
    }
  }
  __setRecentlyPoint(point) {
    const previousElement = this.getPreviousElementOfPoint(point);
    const nextElement = this.getNextElementOfPoint(point);
    const block2 = point.element.getBlock();
    const inblock2 = point.element.getInblock();
    if (previousElement && inblock2 && inblock2.isContains(previousElement)) {
      point.moveToEnd(previousElement);
    } else if (nextElement && inblock2 && inblock2.isContains(nextElement)) {
      point.moveToStart(nextElement);
    } else if (previousElement && block2.isContains(previousElement)) {
      point.moveToEnd(previousElement);
    } else if (nextElement && block2.isContains(nextElement)) {
      point.moveToStart(nextElement);
    } else if (previousElement) {
      point.moveToEnd(previousElement);
    } else {
      point.moveToStart(nextElement);
    }
  }
  __judgeUseClipboard() {
    if (!window.ClipboardItem) {
      this.useClipboard = false;
      console.warn("window.ClipboardItem must be obtained in a secure environment, such as localhost, 127.0.0.1, or https, so the editor's copy, paste, and cut functions cannot be used");
    }
    if (!navigator.clipboard) {
      this.useClipboard = false;
      console.warn("navigator.clipboard must be obtained in a secure environment, such as localhost, 127.0.0.1, or https, so the editor's copy, paste, and cut functions cannot be used");
    }
  }
  __emptyDefaultBehaviorInblock(ele) {
    if (!ele.isInblock()) {
      return;
    }
    if (ele.behavior != "default") {
      return;
    }
    if (ele.hasChildren()) {
      ele.children.forEach((item) => {
        if (item.isInblock()) {
          this.__emptyDefaultBehaviorInblock(item);
        } else {
          item.toEmpty();
          if (item.parent.isEmpty()) {
            const breakEl = new AlexElement$1("closed", "br", null, null, null);
            this.addElementTo(breakEl, item.parent);
          }
        }
      });
    }
  }
  __cloneStack() {
    return this.stack.map((el) => {
      return el.__fullClone();
    });
  }
  __removeDeletedElementDom() {
    const fn = (elements) => {
      elements.forEach((el) => {
        const isExist = AlexElement$1.flatElements(this.stack).some((item) => {
          return item.isEqual(el);
        });
        if (isExist && el.hasChildren()) {
          fn(el.children);
        } else if (!isExist) {
          el._elm.remove();
        }
      });
    };
    fn(this.__oldStack);
  }
  __updateElementDom() {
    const fn = (elements) => {
      elements.forEach((el) => {
        const oldElement = AlexElement$1.flatElements(this.__oldStack).find((item) => {
          return item.isEqual(el);
        });
        if (oldElement) {
          if (oldElement.type != el.type || oldElement.parsedom != el.parsedom) {
            el.__renderElement();
            oldElement._elm.parentNode.insertBefore(el._elm, oldElement._elm);
            oldElement._elm.remove();
          } else {
            if (!oldElement.isEqualMarks(el)) {
              if (oldElement.hasMarks()) {
                for (let key in oldElement.marks) {
                  el._elm.removeAttribute(key);
                }
              }
              if (el.hasMarks()) {
                for (let key in el.marks) {
                  if (!/(^on)|(^style$)|(^contenteditable$)/g.test(key)) {
                    el._elm.setAttribute(key, el.marks[key]);
                  }
                }
              }
            }
            if (!oldElement.isEqualStyles(el)) {
              el._elm.removeAttribute("style");
              if (el.hasStyles()) {
                for (let key in el.styles) {
                  el._elm.style.setProperty(key, el.styles[key]);
                }
              }
            }
            if (el.isText() && oldElement.textContent != el.textContent) {
              el._elm.innerHTML = "";
              const text = document.createTextNode(el.textContent);
              el._elm.appendChild(text);
            }
            if (el.parent && oldElement.parent && !el.parent.isEqual(oldElement.parent)) {
              this.__insertNewDom(el, false);
            }
            if (el.hasChildren()) {
              fn(el.children);
            }
          }
        } else if (!oldElement) {
          this.__insertNewDom(el);
        }
      });
    };
    fn(this.stack);
  }
  __insertNewDom(el, reRender = true) {
    if (reRender) {
      el.__renderElement();
    }
    const previousElement = this.getPreviousElement(el);
    if (previousElement) {
      previousElement._elm.parentNode.insertBefore(el._elm, previousElement._elm.nextSibling);
    } else {
      if (el.isBlock()) {
        if (this.$el.firstElementChild) {
          this.$el.insertBefore(el._elm, this.$el.firstElementChild);
        } else {
          this.$el.appendChild(el._elm);
        }
      } else {
        const parent = el.parent._elm;
        if (parent.firstElementChild) {
          parent.insertBefore(el._elm, parent.firstElementChild);
        } else {
          parent.appendChild(el._elm);
        }
      }
    }
  }
  __filterIllegalDom() {
    const fn = (node) => {
      const childNodes = Array.from(node.childNodes);
      childNodes.forEach((childNode) => {
        if (childNode.nodeType == 1) {
          const key = obj.data.get(childNode, "data-alex-editor-key");
          if (key) {
            const element2 = this.getElementByKey(key);
            if (element2) {
              fn(childNode);
            } else {
              childNode.remove();
            }
          } else {
            childNode.remove();
          }
        } else if (childNode.nodeType == 3) {
          const parentNode = childNode.parentNode;
          const key = obj.data.get(parentNode, "data-alex-editor-key");
          if (key) {
            const element2 = this.getElementByKey(key);
            if (!element2 || !element2.isText()) {
              childNode.remove();
            }
          } else {
            childNode.remove();
          }
        } else {
          childNode.remove();
        }
      });
    };
    fn(this.$el);
  }
  __safariLinkHandle() {
    const { Safari } = obj.platform.browser();
    const linkEle = this.range.anchor.element.__getLink();
    if (Safari && linkEle) {
      if (linkEle.hasChildren()) {
        const elements = AlexElement$1.flatElements(linkEle.children);
        for (let i = elements.length - 1; i >= 0; i--) {
          elements[i]._elm.remove();
        }
      }
      linkEle._elm.remove();
      this.__insertNewDom(linkEle);
    }
  }
  __handleSelectionChange() {
    if (this.disabled) {
      return;
    }
    if (this.__isInputChinese) {
      return;
    }
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      if (Util.isContains(this.$el, range.startContainer) && Util.isContains(this.$el, range.endContainer)) {
        let anchorNode = null;
        let focusNode = null;
        let anchorOffset = null;
        let focusOffset = null;
        if (range.startContainer.nodeType == 3) {
          anchorNode = range.startContainer.parentNode;
          anchorOffset = range.startOffset;
        } else if (range.startContainer.nodeType == 1) {
          const childNodes = Array.from(range.startContainer.childNodes);
          if (childNodes.length) {
            anchorNode = childNodes[range.startOffset] ? childNodes[range.startOffset] : childNodes[range.startOffset - 1];
            anchorOffset = childNodes[range.startOffset] ? 0 : 1;
            if (anchorNode.nodeType == 3) {
              anchorOffset = anchorOffset == 0 ? 0 : anchorNode.textContent.length;
              anchorNode = anchorNode.parentNode;
            }
          } else {
            anchorNode = range.startContainer;
            anchorOffset = 0;
          }
        }
        if (range.endContainer.nodeType == 3) {
          focusNode = range.endContainer.parentNode;
          focusOffset = range.endOffset;
        } else if (range.endContainer.nodeType == 1) {
          const childNodes = Array.from(range.endContainer.childNodes);
          if (childNodes.length) {
            focusNode = childNodes[range.endOffset] ? childNodes[range.endOffset] : childNodes[range.endOffset - 1];
            focusOffset = childNodes[range.endOffset] ? 0 : 1;
            if (focusNode.nodeType == 3) {
              focusOffset = focusOffset == 0 ? 0 : focusNode.textContent.length;
              focusNode = focusNode.parentNode;
            }
          } else {
            focusNode = range.endContainer;
            focusOffset = 1;
          }
        }
        const anchorKey = obj.data.get(anchorNode, "data-alex-editor-key");
        const focusKey = obj.data.get(focusNode, "data-alex-editor-key");
        const anchorEle = this.getElementByKey(anchorKey);
        const focusEle = this.getElementByKey(focusKey);
        const anchor = new AlexPoint(anchorEle, anchorOffset);
        const focus = new AlexPoint(focusEle, focusOffset);
        this.range = new AlexRange(anchor, focus);
        this.__rectifyRangeInBreak();
        this.emit("rangeUpdate", this.range);
      }
    }
  }
  __handleBeforeInput(e) {
    if (this.disabled) {
      return;
    }
    if (e.inputType == "deleteByCut" || e.inputType == "insertFromPaste" || e.inputType == "deleteByDrag" || e.inputType == "insertFromDrop" || e.inputType == "insertCompositionText") {
      return;
    }
    e.preventDefault();
    if (e.inputType == "insertText" && e.data) {
      this.insertText(e.data);
      this.formatElementStack();
      this.domRender();
      this.rangeRender();
    } else if (e.inputType == "insertParagraph" || e.inputType == "insertLineBreak") {
      this.insertParagraph();
      this.formatElementStack();
      this.domRender();
      this.rangeRender();
    } else if (e.inputType == "deleteContentBackward") {
      this.delete();
      this.formatElementStack();
      this.domRender();
      this.rangeRender();
    }
  }
  __handleChineseInput(e) {
    if (this.disabled) {
      return;
    }
    e.preventDefault();
    if (e.type == "compositionstart") {
      this.__isInputChinese = true;
    } else if (e.type == "compositionend") {
      if (e.data) {
        this.insertText(e.data);
        this.formatElementStack();
        this.__safariLinkHandle();
        this.domRender();
        this.rangeRender();
      }
      setTimeout(() => {
        this.__isInputChinese = false;
      }, 0);
    }
  }
  __handleKeydown(e) {
    if (this.disabled) {
      return;
    }
    if (Keyboard.Undo(e)) {
      e.preventDefault();
      const historyRecord = this.history.get(-1);
      if (historyRecord) {
        this.stack = historyRecord.stack;
        this.range = historyRecord.range;
        this.formatElementStack();
        this.domRender(true);
        this.rangeRender();
      }
    } else if (Keyboard.Redo(e)) {
      e.preventDefault();
      const historyRecord = this.history.get(1);
      if (historyRecord) {
        this.stack = historyRecord.stack;
        this.range = historyRecord.range;
        this.formatElementStack();
        this.domRender(true);
        this.rangeRender();
      }
    } else if (Keyboard.Indent(e)) {
      e.preventDefault();
      this.setIndent();
      this.formatElementStack();
      this.domRender();
      this.rangeRender();
    } else if (Keyboard.Outdent(e)) {
      e.preventDefault();
      this.setOutdent();
      this.formatElementStack();
      this.domRender();
      this.rangeRender();
    }
  }
  async __handleCut(e) {
    e.preventDefault();
    const isRealCut = await this.cut();
    this.formatElementStack();
    if (isRealCut) {
      this.domRender();
      this.rangeRender();
    }
  }
  async __handlePaste(e) {
    e.preventDefault();
    await this.paste();
    this.formatElementStack();
    this.domRender();
    this.rangeRender();
  }
  async __handleCopy(e) {
    e.preventDefault();
    const isRealCopy = await this.copy();
    this.formatElementStack();
    if (isRealCopy) {
      this.domRender();
      this.rangeRender();
    }
  }
  async paste() {
    if (!this.useClipboard) {
      return false;
    }
    const clipboardItems = await navigator.clipboard.read();
    const clipboardItem = clipboardItems[0];
    const getTypeFunctions = [];
    for (const type of clipboardItem.types) {
      getTypeFunctions.push(clipboardItem.getType(type));
    }
    const blobs = await Promise.all(getTypeFunctions);
    const isOnlyImage = blobs.every((blob) => {
      return blob.type.startsWith("image/");
    });
    const isOnlyVideo = blobs.every((blob) => {
      return blob.type.startsWith("video/");
    });
    for (let blob of blobs) {
      if (isOnlyImage && blob.type.startsWith("image/")) {
        const url = await Util.blobToBase64(blob);
        if (!this.emit("pasteImage", url)) {
          const image = new AlexElement$1(
            "closed",
            "img",
            {
              src: url
            },
            null,
            null
          );
          this.insertElement(image);
        }
      } else if (isOnlyVideo && blob.type.startsWith("video/")) {
        const url = await Util.blobToBase64(blob);
        if (!this.emit("pasteVideo", url)) {
          const video = new AlexElement$1(
            "closed",
            "video",
            {
              src: url
            },
            null,
            null
          );
          this.insertElement(video);
        }
      } else if (blob.type == "text/plain") {
        if (!this.htmlPaste) {
          const data2 = await blob.text();
          if (data2) {
            this.insertText(data2);
            this.emit("paste", data2);
          }
        }
      } else if (blob.type == "text/html") {
        if (this.htmlPaste) {
          const data2 = await blob.text();
          if (data2) {
            const elements = this.parseHtml(data2).filter((el) => {
              return !el.isEmpty();
            });
            for (let i = 0; i < elements.length; i++) {
              this.insertElement(elements[i], false);
            }
            this.emit("paste", data2);
          }
        }
      }
    }
  }
  async cut() {
    if (!this.useClipboard) {
      return false;
    }
    const isRealCopy = await this.copy();
    if (isRealCopy) {
      this.delete();
      this.emit("cut");
    }
    return isRealCopy;
  }
  async copy() {
    if (!this.useClipboard) {
      return false;
    }
    const rangeElements = this.getElementsByRange(true, false);
    if (rangeElements.length == 0) {
      return false;
    }
    let i = 0;
    while (i < rangeElements.length) {
      if (rangeElements[i].isBlock()) {
        i++;
      } else {
        let has = rangeElements.some((item) => {
          return item.isEqual(rangeElements[i].parent);
        });
        if (has) {
          i++;
        } else {
          let allIn = rangeElements[i].parent.children.every((item) => {
            return rangeElements.some((e) => {
              return e.isEqual(item);
            });
          });
          if (allIn) {
            const index = rangeElements.findIndex((item) => {
              return item.isEqual(rangeElements[i]);
            });
            rangeElements.splice(index, 0, rangeElements[i].parent);
          } else {
            i++;
          }
        }
      }
    }
    let elements = [];
    rangeElements.forEach((el) => {
      if (el.isBlock()) {
        elements.push(el);
      } else {
        const isIn = rangeElements.some((item) => {
          return item.isEqual(el.parent);
        });
        if (!isIn) {
          elements.push(el);
        }
      }
    });
    let html = "";
    let text = "";
    elements.forEach((el) => {
      const newEl = el.clone();
      newEl.__renderElement();
      html += newEl._elm.outerHTML;
      text += newEl._elm.innerText;
    });
    const clipboardItem = new window.ClipboardItem({
      "text/html": new Blob([html], { type: "text/html" }),
      "text/plain": new Blob([text], { type: "text/plain" })
    });
    await navigator.clipboard.write([clipboardItem]);
    this.emit("copy");
    return true;
  }
  delete() {
    if (this.range.anchor.isEqual(this.range.focus)) {
      const previousElement = this.getPreviousElementOfPoint(this.range.anchor);
      const block2 = this.range.anchor.element.getBlock();
      const inblock2 = this.range.anchor.element.getInblock();
      if (inblock2) {
        if (this.range.anchor.offset == 0) {
          if (previousElement) {
            if (inblock2.isContains(previousElement)) {
              this.range.anchor.moveToEnd(previousElement);
              this.range.focus.moveToEnd(previousElement);
              this.delete();
              return;
            } else if (inblock2.behavior == "block") {
              const previousBlock = previousElement.getBlock();
              const previousInblock = previousElement.getInblock();
              if (previousInblock) {
                if (previousInblock.behavior == "block") {
                  this.mergeBlockElement(inblock2, previousInblock);
                }
              } else {
                this.mergeBlockElement(inblock2, previousBlock);
              }
            }
          } else {
            this.emit("deleteInStart", inblock2);
          }
        } else {
          if (this.range.anchor.element.isSpaceText()) {
            this.range.anchor.element.toEmpty();
            if (inblock2.isEmpty()) {
              const breakEl = new AlexElement$1("closed", "br", null, null, null);
              this.addElementTo(breakEl, inblock2);
              this.range.anchor.moveToStart(breakEl);
              this.range.focus.moveToStart(breakEl);
            } else {
              this.range.anchor.offset = 0;
              this.range.focus.offset = 0;
              this.delete();
              return;
            }
          } else if (this.range.anchor.element.isText()) {
            const val = this.range.anchor.element.textContent;
            this.range.anchor.offset -= 1;
            const isSpaceText = Util.isSpaceText(val[this.range.anchor.offset]);
            this.range.anchor.element.textContent = val.substring(0, this.range.anchor.offset) + val.substring(this.range.focus.offset);
            this.range.focus.offset = this.range.anchor.offset;
            if (isSpaceText) {
              this.delete();
              return;
            }
            if (inblock2.isEmpty()) {
              const breakEl = new AlexElement$1("closed", "br", null, null, null);
              this.addElementTo(breakEl, inblock2);
              this.range.anchor.moveToStart(breakEl);
              this.range.focus.moveToStart(breakEl);
            }
          } else {
            const isBreak = this.range.anchor.element.isBreak();
            this.range.anchor.element.toEmpty();
            if (inblock2.isEmpty()) {
              if (!isBreak || inblock2.behavior == "default") {
                const breakEl = new AlexElement$1("closed", "br", null, null, null);
                this.addElementTo(breakEl, inblock2);
                this.range.anchor.moveToStart(breakEl);
                this.range.focus.moveToStart(breakEl);
              } else if (!previousElement) {
                const breakEl = new AlexElement$1("closed", "br", null, null, null);
                this.addElementTo(breakEl, inblock2);
                this.range.anchor.moveToStart(breakEl);
                this.range.focus.moveToStart(breakEl);
              }
            }
          }
        }
      } else {
        if (this.range.anchor.offset == 0) {
          if (previousElement) {
            if (block2.isContains(previousElement)) {
              this.range.anchor.moveToEnd(previousElement);
              this.range.focus.moveToEnd(previousElement);
              this.delete();
              return;
            } else {
              const previousInblock = previousElement.getInblock();
              const previousBlock = previousElement.getBlock();
              if (previousInblock) {
                if (previousInblock.behavior == "block") {
                  this.mergeBlockElement(block2, previousInblock);
                }
              } else {
                this.mergeBlockElement(block2, previousBlock);
              }
            }
          } else {
            this.emit("deleteInStart", block2);
          }
        } else {
          if (this.range.anchor.element.isSpaceText()) {
            this.range.anchor.element.toEmpty();
            if (block2.isEmpty()) {
              const breakEl = new AlexElement$1("closed", "br", null, null, null);
              this.addElementTo(breakEl, block2);
              this.range.anchor.moveToStart(breakEl);
              this.range.focus.moveToStart(breakEl);
            } else {
              this.range.anchor.offset = 0;
              this.range.focus.offset = 0;
              this.delete();
              return;
            }
          } else if (this.range.anchor.element.isText()) {
            const val = this.range.anchor.element.textContent;
            this.range.anchor.offset -= 1;
            const isSpaceText = Util.isSpaceText(val[this.range.anchor.offset]);
            this.range.anchor.element.textContent = val.substring(0, this.range.anchor.offset) + val.substring(this.range.focus.offset);
            this.range.focus.offset = this.range.anchor.offset;
            if (isSpaceText) {
              this.delete();
              return;
            }
            if (block2.isEmpty()) {
              const breakEl = new AlexElement$1("closed", "br", null, null, null);
              this.addElementTo(breakEl, block2);
              this.range.anchor.moveToStart(breakEl);
              this.range.focus.moveToStart(breakEl);
            }
          } else {
            const isBreak = this.range.anchor.element.isBreak();
            this.range.anchor.element.toEmpty();
            if (block2.isEmpty()) {
              if (!isBreak) {
                const breakEl = new AlexElement$1("closed", "br", null, null, null);
                this.addElementTo(breakEl, block2);
                this.range.anchor.moveToStart(breakEl);
                this.range.focus.moveToStart(breakEl);
              } else if (!previousElement) {
                const breakEl = new AlexElement$1("closed", "br", null, null, null);
                this.addElementTo(breakEl, block2);
                this.range.anchor.moveToStart(breakEl);
                this.range.focus.moveToStart(breakEl);
              }
            }
          }
        }
      }
    } else {
      const elements = this.getElementsByRange(true, false).filter((el) => {
        return !AlexElement$1.VOID_NODES.includes(el.parsedom);
      });
      const anchorInblock = this.range.anchor.element.getInblock();
      const focusInblock = this.range.focus.element.getInblock();
      const anchorBlock = this.range.anchor.element.getBlock();
      const focusBlock = this.range.focus.element.getBlock();
      if (anchorInblock && focusInblock && anchorInblock.isEqual(focusInblock)) {
        elements.forEach((el) => {
          el.toEmpty();
          if (anchorInblock.isEmpty()) {
            const breakEl = new AlexElement$1("closed", "br", null, null, null);
            this.addElementTo(breakEl, anchorInblock);
          }
        });
      } else if (anchorInblock && focusInblock) {
        elements.forEach((el) => {
          if (el.isInblock() && el.behavior == "default") {
            this.__emptyDefaultBehaviorInblock(el);
          } else {
            el.toEmpty();
            if (el.parent && (el.parent.isInblock() || el.parent.isBlock()) && el.parent.isEmpty()) {
              const breakEl = new AlexElement$1("closed", "br", null, null, null);
              this.addElementTo(breakEl, el.parent);
            }
          }
        });
        if (anchorInblock.behavior == "block" && focusInblock.behavior == "block") {
          this.mergeBlockElement(focusInblock, anchorInblock);
        }
      } else if (anchorInblock) {
        elements.forEach((el) => {
          if (el.isInblock() && el.behavior == "default") {
            this.__emptyDefaultBehaviorInblock(el);
          } else {
            el.toEmpty();
            if (el.parent && (el.parent.isInblock() || el.parent.isBlock()) && el.parent.isEmpty()) {
              const breakEl = new AlexElement$1("closed", "br", null, null, null);
              this.addElementTo(breakEl, el.parent);
            }
          }
        });
        if (anchorInblock.behavior == "block") {
          this.mergeBlockElement(focusBlock, anchorInblock);
        }
      } else if (focusInblock) {
        elements.forEach((el) => {
          if (el.isInblock() && el.behavior == "default") {
            this.__emptyDefaultBehaviorInblock(el);
          } else {
            el.toEmpty();
            if (el.parent && (el.parent.isInblock() || el.parent.isBlock()) && el.parent.isEmpty()) {
              const breakEl = new AlexElement$1("closed", "br", null, null, null);
              this.addElementTo(breakEl, el.parent);
            }
          }
        });
        if (focusInblock.behavior == "block") {
          this.mergeBlockElement(focusInblock, anchorBlock);
        }
      } else if (anchorBlock.isEqual(focusBlock)) {
        elements.forEach((el) => {
          el.toEmpty();
          if (anchorBlock.isEmpty()) {
            const breakEl = new AlexElement$1("closed", "br", null, null, null);
            this.addElementTo(breakEl, anchorBlock);
          }
        });
      } else {
        elements.forEach((el) => {
          if (el.isInblock() && el.behavior == "default") {
            this.__emptyDefaultBehaviorInblock(el);
          } else {
            el.toEmpty();
            if (el.parent && (el.parent.isInblock() || el.parent.isBlock()) && el.parent.isEmpty()) {
              const breakEl = new AlexElement$1("closed", "br", null, null, null);
              this.addElementTo(breakEl, el.parent);
            }
          }
        });
        this.mergeBlockElement(focusBlock, anchorBlock);
      }
    }
    if (this.range.anchor.element.isEmpty()) {
      this.__setRecentlyPoint(this.range.anchor);
    }
    this.range.focus.element = this.range.anchor.element;
    this.range.focus.offset = this.range.anchor.offset;
  }
  insertText(data2) {
    if (!data2 || typeof data2 != "string") {
      throw new Error("The argument must be a string");
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      if (!this.range.anchor.element.isPreStyle()) {
        data2 = data2.replace(/\s/g, () => {
          const span = document.createElement("span");
          span.innerHTML = "&nbsp;";
          return span.innerText;
        });
      }
      if (this.range.anchor.element.isText()) {
        let val = this.range.anchor.element.textContent;
        this.range.anchor.element.textContent = val.substring(0, this.range.anchor.offset) + data2 + val.substring(this.range.anchor.offset);
        this.range.anchor.offset = this.range.anchor.offset + data2.length;
        this.range.focus.offset = this.range.anchor.offset;
      } else {
        const textEl = new AlexElement$1("text", null, null, null, data2);
        if (this.range.anchor.offset == 0) {
          this.addElementBefore(textEl, this.range.anchor.element);
        } else {
          this.addElementAfter(textEl, this.range.anchor.element);
        }
        this.range.anchor.moveToEnd(textEl);
        this.range.focus.moveToEnd(textEl);
      }
    } else {
      this.delete();
      this.insertText(data2);
    }
  }
  insertParagraph() {
    if (this.range.anchor.isEqual(this.range.focus)) {
      const previousElement = this.getPreviousElementOfPoint(this.range.anchor);
      const nextElement = this.getNextElementOfPoint(this.range.anchor);
      const block2 = this.range.anchor.element.getBlock();
      const inblock2 = this.range.anchor.element.getInblock();
      const endOffset = this.range.anchor.element.isText() ? this.range.anchor.element.textContent.length : 1;
      if (inblock2) {
        if (this.range.anchor.element.isPreStyle()) {
          if (this.range.anchor.element.isBreak()) {
            this.insertText("\n\n");
            this.range.anchor.offset -= 1;
            this.range.focus.offset -= 1;
          } else if (this.range.anchor.offset == endOffset && !(nextElement && inblock2.isContains(nextElement))) {
            if (this.range.anchor.element.isText() && this.range.anchor.element.textContent[this.range.anchor.offset - 1] == "\n") {
              this.insertText("\n");
            } else {
              this.insertText("\n\n");
              this.range.anchor.offset -= 1;
              this.range.focus.offset -= 1;
            }
          } else {
            this.insertText("\n");
          }
          this.emit("insertParagraph", null, inblock2);
        } else if (inblock2.behavior == "block") {
          if (this.range.anchor.offset == 0 && !(previousElement && inblock2.isContains(previousElement))) {
            const paragraph = inblock2.clone(false);
            const breakEle = new AlexElement$1("closed", "br", null, null, null);
            this.addElementTo(breakEle, paragraph);
            this.addElementBefore(paragraph, inblock2);
            this.emit("insertParagraph", inblock2, paragraph);
          } else if (this.range.anchor.offset == endOffset && !(nextElement && inblock2.isContains(nextElement))) {
            const paragraph = inblock2.clone(false);
            const breakEle = new AlexElement$1("closed", "br", null, null, null);
            this.addElementTo(breakEle, paragraph);
            this.addElementAfter(paragraph, inblock2);
            this.range.anchor.moveToStart(breakEle);
            this.range.focus.moveToStart(breakEle);
            this.emit("insertParagraph", paragraph, inblock2);
          } else {
            const newInblock = inblock2.clone();
            this.addElementAfter(newInblock, inblock2);
            const elements = AlexElement$1.flatElements(inblock2.children);
            const index = elements.findIndex((item) => {
              return this.range.anchor.element.isEqual(item);
            });
            this.range.focus.moveToEnd(inblock2);
            this.delete();
            const newElements = AlexElement$1.flatElements(newInblock.children);
            this.range.focus.element = newElements[index];
            this.range.focus.offset = this.range.anchor.offset;
            this.range.anchor.moveToStart(newInblock);
            this.delete();
            this.emit("insertParagraph", newInblock, inblock2);
          }
        }
      } else {
        if (this.range.anchor.element.isPreStyle()) {
          if (this.range.anchor.element.isBreak()) {
            this.insertText("\n\n");
            this.range.anchor.offset -= 1;
            this.range.focus.offset -= 1;
          } else if (this.range.anchor.offset == endOffset && !(nextElement && block2.isContains(nextElement))) {
            if (this.range.anchor.element.isText() && this.range.anchor.element.textContent[this.range.anchor.offset - 1] == "\n") {
              this.insertText("\n");
            } else {
              this.insertText("\n\n");
              this.range.anchor.offset -= 1;
              this.range.focus.offset -= 1;
            }
          } else {
            this.insertText("\n");
          }
          this.emit("insertParagraph", null, block2);
        } else {
          if (this.range.anchor.offset == 0 && !(previousElement && block2.isContains(previousElement))) {
            const paragraph = block2.clone(false);
            const breakEle = new AlexElement$1("closed", "br", null, null, null);
            this.addElementTo(breakEle, paragraph);
            this.addElementBefore(paragraph, block2);
            this.emit("insertParagraph", block2, paragraph);
          } else if (this.range.anchor.offset == endOffset && !(nextElement && block2.isContains(nextElement))) {
            const paragraph = block2.clone(false);
            const breakEle = new AlexElement$1("closed", "br", null, null, null);
            this.addElementTo(breakEle, paragraph);
            this.addElementAfter(paragraph, block2);
            this.range.anchor.moveToStart(breakEle);
            this.range.focus.moveToStart(breakEle);
            this.emit("insertParagraph", paragraph, block2);
          } else {
            const newBlock = block2.clone();
            this.addElementAfter(newBlock, block2);
            const elements = AlexElement$1.flatElements(block2.children);
            const index = elements.findIndex((item) => {
              return this.range.anchor.element.isEqual(item);
            });
            this.range.focus.moveToEnd(block2);
            this.delete();
            const newElements = AlexElement$1.flatElements(newBlock.children);
            this.range.focus.element = newElements[index];
            this.range.focus.offset = this.range.anchor.offset;
            this.range.anchor.moveToStart(newBlock);
            this.delete();
            this.emit("insertParagraph", newBlock, block2);
          }
        }
      }
    } else {
      this.delete();
      this.insertParagraph();
    }
  }
  insertElement(ele, cover = true) {
    if (!AlexElement$1.isElement(ele)) {
      throw new Error("The argument must be an AlexElement instance");
    }
    if (ele.isEmpty()) {
      return;
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      const previousElement = this.getPreviousElementOfPoint(this.range.anchor);
      const nextElement = this.getNextElementOfPoint(this.range.anchor);
      const block2 = this.range.anchor.element.getBlock();
      const inblock2 = this.range.anchor.element.getInblock();
      const endOffset = this.range.anchor.element.isText() ? this.range.anchor.element.textContent.length : 1;
      if (ele.isInblock() && ele.behavior == "block" && inblock2 && inblock2.behavior == "block") {
        if (inblock2.isOnlyHasBreak() && cover) {
          this.addElementBefore(ele, inblock2);
          inblock2.toEmpty();
        } else if (this.range.anchor.offset == 0 && !(previousElement && inblock2.isContains(previousElement))) {
          this.addElementBefore(ele, inblock2);
        } else if (this.range.anchor.offset == endOffset && !(nextElement && inblock2.isContains(nextElement))) {
          this.addElementAfter(ele, inblock2);
        } else {
          const newInblock = inblock2.clone();
          this.addElementAfter(newInblock, inblock2);
          this.range.focus.moveToEnd(inblock2);
          this.delete();
          const elements = AlexElement$1.flatElements(inblock2.children);
          const index = elements.findIndex((item) => {
            return this.range.anchor.element.isEqual(item);
          });
          const newElements = AlexElement$1.flatElements(newInblock.children);
          this.range.focus.element = newElements[index];
          this.range.focus.offset = this.range.anchor.offset;
          this.range.anchor.moveToStart(newInblock);
          this.delete();
          this.addElementBefore(ele, newInblock);
        }
      } else if (ele.isInblock() && inblock2) {
        if (inblock2.isOnlyHasBreak()) {
          this.addElementTo(ele, inblock2, 0);
        } else if (this.range.anchor.offset == 0 && !(previousElement && inblock2.isContains(previousElement))) {
          this.addElementTo(ele, inblock2, 0);
        } else if (this.range.anchor.offset == endOffset && !(nextElement && inblock2.isContains(nextElement))) {
          this.addElementTo(ele, inblock2, inblock2.children.length);
        } else {
          const newInblock = inblock2.clone();
          this.addElementAfter(newInblock, inblock2);
          this.range.focus.moveToEnd(inblock2);
          this.delete();
          const elements = AlexElement$1.flatElements(inblock2.children);
          const index = elements.findIndex((item) => {
            return this.range.anchor.element.isEqual(item);
          });
          const newElements = AlexElement$1.flatElements(newInblock.children);
          this.range.focus.element = newElements[index];
          this.range.focus.offset = this.range.anchor.offset;
          this.range.anchor.moveToStart(newInblock);
          this.delete();
          this.addElementTo(ele, newInblock);
          this.mergeBlockElement(newInblock, inblock2);
        }
      } else if (ele.isInblock()) {
        if (block2.isOnlyHasBreak()) {
          this.addElementTo(ele, block2, 0);
        } else if (this.range.anchor.offset == 0 && !(previousElement && block2.isContains(previousElement))) {
          this.addElementTo(ele, block2, 0);
        } else if (this.range.anchor.offset == endOffset && !(nextElement && block2.isContains(nextElement))) {
          this.addElementTo(ele, block2, block2.children.length);
        } else {
          const newBlock = block2.clone();
          this.addElementAfter(newBlock, block2);
          this.range.focus.moveToEnd(block2);
          this.delete();
          const elements = AlexElement$1.flatElements(block2.children);
          const index = elements.findIndex((item) => {
            return this.range.anchor.element.isEqual(item);
          });
          const newElements = AlexElement$1.flatElements(newBlock.children);
          this.range.focus.element = newElements[index];
          this.range.focus.offset = this.range.anchor.offset;
          this.range.anchor.moveToStart(newBlock);
          this.delete();
          this.addElementTo(ele, newBlock);
          this.mergeBlockElement(newBlock, block2);
        }
      } else if (ele.isBlock()) {
        if (block2.isOnlyHasBreak() && cover) {
          this.addElementBefore(ele, block2);
          block2.toEmpty();
        } else if (this.range.anchor.offset == 0 && !(previousElement && block2.isContains(previousElement))) {
          this.addElementBefore(ele, block2);
        } else if (this.range.anchor.offset == endOffset && !(nextElement && block2.isContains(nextElement))) {
          this.addElementAfter(ele, block2);
        } else {
          const newBlock = block2.clone();
          this.addElementAfter(newBlock, block2);
          this.range.focus.moveToEnd(block2);
          this.delete();
          const elements = AlexElement$1.flatElements(block2.children);
          const index = elements.findIndex((item) => {
            return this.range.anchor.element.isEqual(item);
          });
          const newElements = AlexElement$1.flatElements(newBlock.children);
          this.range.focus.element = newElements[index];
          this.range.focus.offset = this.range.anchor.offset;
          this.range.anchor.moveToStart(newBlock);
          this.delete();
          this.addElementBefore(ele, newBlock);
        }
      } else {
        if (this.range.anchor.element.isText()) {
          let val = this.range.anchor.element.textContent;
          let newText = this.range.anchor.element.clone();
          this.range.anchor.element.textContent = val.substring(0, this.range.anchor.offset);
          newText.textContent = val.substring(this.range.anchor.offset);
          this.addElementAfter(newText, this.range.anchor.element);
          this.addElementBefore(ele, newText);
        } else {
          if (this.range.anchor.offset == 0) {
            this.addElementBefore(ele, this.range.anchor.element);
          } else {
            this.addElementAfter(ele, this.range.anchor.element);
          }
        }
      }
      this.range.anchor.moveToEnd(ele);
      this.range.focus.moveToEnd(ele);
    } else {
      this.delete();
      this.insertElement(ele, cover);
    }
  }
  formatElementStack() {
    const format = (element2, fn) => {
      if (element2.hasChildren()) {
        let index = 0;
        while (index < element2.children.length) {
          let el = element2.children[index];
          format(el, fn);
          const newIndex = element2.children.findIndex((item) => {
            return el.isEqual(item);
          });
          index = newIndex + 1;
        }
      }
      fn.apply(this, [element2]);
    };
    const removeEmptyElement = (element2) => {
      if (element2.isEmpty()) {
        return;
      }
      if (element2.hasChildren()) {
        element2.children.forEach((item) => {
          if (!item.isEmpty()) {
            removeEmptyElement(item);
          }
        });
        element2.children = element2.children.filter((item) => {
          return !item.isEmpty();
        });
      }
    };
    let renderRules = this.renderRules.filter((fn) => {
      return typeof fn == "function";
    });
    renderRules = [...renderRules, ...this.__formatUnchangeableRules];
    renderRules.forEach((fn) => {
      let index = 0;
      while (index < this.stack.length) {
        const ele = this.stack[index];
        format(ele, fn);
        const newIndex = this.stack.findIndex((item) => {
          return ele.isEqual(item);
        });
        index = newIndex + 1;
      }
    });
    this.stack.forEach((ele) => {
      removeEmptyElement(ele);
    });
    this.stack = this.stack.filter((ele) => {
      return !ele.isEmpty();
    });
    if (this.stack.length == 0) {
      const ele = new AlexElement$1("block", AlexElement$1.BLOCK_NODE, null, null, null);
      const breakEle = new AlexElement$1("closed", "br", null, null, null);
      this.addElementTo(breakEle, ele);
      this.stack = [ele];
    }
  }
  domRender(unPushHistory = false) {
    if (this.__oldStack) {
      this.__removeDeletedElementDom();
      this.__updateElementDom();
      this.__filterIllegalDom();
    } else {
      this.$el.innerHTML = "";
      this.stack.forEach((element2) => {
        element2.__renderElement();
        this.$el.appendChild(element2._elm);
      });
    }
    this.__oldValue = this.value;
    this.__oldStack = this.__cloneStack();
    this.value = this.$el.innerHTML;
    if (this.__oldValue != this.value) {
      this.emit("change", this.value, this.__oldValue);
      if (!unPushHistory) {
        this.history.push(this.stack, this.range);
      }
      this.emit("domRender");
    }
  }
  rangeRender() {
    if (this.disabled) {
      return;
    }
    const handler = (point) => {
      let node = null;
      let offset = null;
      if (point.element.isText()) {
        node = point.element._elm.childNodes[0];
        offset = point.offset;
      } else {
        node = point.element.parent._elm;
        const index = point.element.parent.children.findIndex((item) => {
          return point.element.isEqual(item);
        });
        offset = point.offset + index;
      }
      return { node, offset };
    };
    const anchorResult = handler(this.range.anchor);
    const focusResult = handler(this.range.focus);
    const selection = window.getSelection();
    selection.removeAllRanges();
    const range = document.createRange();
    range.setStart(anchorResult.node, anchorResult.offset);
    range.setEnd(focusResult.node, focusResult.offset);
    selection.addRange(range);
  }
  parseHtml(html) {
    if (!html) {
      throw new Error("You need to give an html content to convert");
    }
    const node = document.createElement("div");
    node.innerHTML = html;
    let elements = [];
    Array.from(node.childNodes).forEach((el) => {
      if (el.nodeType == 1 || el.nodeType == 3) {
        const element2 = this.parseNode(el);
        elements.push(element2);
      }
    });
    return elements;
  }
  parseNode(node) {
    if (!(node instanceof Node)) {
      throw new Error("The argument must be an node");
    }
    if (!(node.nodeType == 1 || node.nodeType == 3)) {
      throw new Error("The argument must be an element node or text node");
    }
    if (node.nodeType == 3) {
      return new AlexElement$1("text", null, null, null, node.textContent);
    }
    const marks = Util.getAttributes(node);
    const styles = Util.getStyles(node);
    const parsedom = node.nodeName.toLocaleLowerCase();
    const block2 = defaultConfig.block.find((item) => item.parsedom == parsedom);
    const inblock2 = defaultConfig.inblock.find((item) => item.parsedom == parsedom);
    const inline2 = defaultConfig.inline.find((item) => item.parsedom == parsedom);
    const closed2 = defaultConfig.closed.find((item) => item.parsedom == parsedom);
    let element2 = null;
    let config = {
      type: "inblock",
      parsedom,
      marks,
      styles,
      behavior: "default"
    };
    if (block2) {
      config.type = "block";
      if (block2.parse) {
        config.parsedom = AlexElement$1.BLOCK_NODE;
      }
    } else if (inblock2) {
      config.type = "inblock";
      if (inblock2.block) {
        config.behavior = "block";
      }
    } else if (inline2) {
      config.type = "inline";
      if (inline2.parse) {
        config.parsedom = AlexElement$1.TEXT_NODE;
        if (obj.common.isObject(inline2.parse)) {
          Object.assign(config.styles, Util.clone(inline2.parse));
        }
      }
    } else if (closed2) {
      config.type = "closed";
    } else {
      config.type = "inline";
      config.parsedom = "span";
    }
    element2 = new AlexElement$1(config.type, config.parsedom, config.marks, config.styles, null);
    element2.behavior = config.behavior;
    if (block2 || inblock2 || inline2) {
      Array.from(node.childNodes).forEach((childNode) => {
        if (childNode.nodeType == 1 || childNode.nodeType == 3) {
          const childEle = this.parseNode(childNode);
          childEle.parent = element2;
          if (element2.hasChildren()) {
            element2.children.push(childEle);
          } else {
            element2.children = [childEle];
          }
        }
      });
    }
    return element2;
  }
  mergeBlockElement(ele, previousEle) {
    if (!AlexElement$1.isElement(ele)) {
      throw new Error("The first argument must be an AlexElement instance");
    }
    if (!AlexElement$1.isElement(previousEle)) {
      throw new Error("The second argument must be an AlexElement instance");
    }
    if (!ele.isBlock() && !ele.isInblock() || !previousEle.isBlock() && !previousEle.isInblock()) {
      throw new Error('Elements that are not "block" or "inblock" cannot be merged');
    }
    previousEle.children.push(...ele.children);
    previousEle.children.forEach((item) => {
      item.parent = previousEle;
    });
    ele.children = null;
  }
  getElementByKey(key) {
    if (!key) {
      throw new Error("You need to specify a key to do the query");
    }
    return AlexElement$1.flatElements(this.stack).find((element2) => {
      return element2.key == key;
    });
  }
  getPreviousElement(ele) {
    if (!AlexElement$1.isElement(ele)) {
      throw new Error("The argument must be an AlexElement instance");
    }
    if (ele.isBlock()) {
      const index = this.stack.findIndex((item) => {
        return ele.isEqual(item);
      });
      if (index <= 0) {
        return null;
      }
      if (this.stack[index - 1].isEmpty()) {
        return this.getPreviousElement(this.stack[index - 1]);
      }
      return this.stack[index - 1];
    } else {
      const index = ele.parent.children.findIndex((item) => {
        return ele.isEqual(item);
      });
      if (index <= 0) {
        return null;
      }
      if (ele.parent.children[index - 1].isEmpty()) {
        return this.getPreviousElement(ele.parent.children[index - 1]);
      }
      return ele.parent.children[index - 1];
    }
  }
  getNextElement(ele) {
    if (!AlexElement$1.isElement(ele)) {
      throw new Error("The argument must be an AlexElement instance");
    }
    if (ele.isBlock()) {
      const index = this.stack.findIndex((item) => {
        return ele.isEqual(item);
      });
      if (index >= this.stack.length - 1) {
        return null;
      }
      if (this.stack[index + 1].isEmpty()) {
        return this.getNextElement(this.stack[index + 1]);
      }
      return this.stack[index + 1];
    } else {
      const index = ele.parent.children.findIndex((item) => {
        return ele.isEqual(item);
      });
      if (index >= ele.parent.children.length - 1) {
        return null;
      }
      if (ele.parent.children[index + 1].isEmpty()) {
        return this.getNextElement(ele.parent.children[index + 1]);
      }
      return ele.parent.children[index + 1];
    }
  }
  getPreviousElementOfPoint(point) {
    if (!AlexPoint.isPoint(point)) {
      throw new Error("The argument must be an AlexPoint instance");
    }
    const flatElements = AlexElement$1.flatElements(this.stack);
    const fn = (element2) => {
      const index = flatElements.findIndex((item) => {
        return element2.isEqual(item);
      });
      if (index <= 0) {
        return null;
      }
      let ele = flatElements[index - 1];
      if ((ele.isText() || ele.isClosed()) && !ele.isEmpty()) {
        return ele;
      }
      return fn(ele);
    };
    return fn(point.element);
  }
  getNextElementOfPoint(point) {
    if (!AlexPoint.isPoint(point)) {
      throw new Error("The argument must be an AlexPoint instance");
    }
    const flatElements = AlexElement$1.flatElements(this.stack);
    const fn = (element2) => {
      const index = flatElements.findIndex((item) => {
        return element2.isEqual(item);
      });
      if (index == flatElements.length - 1) {
        return null;
      }
      let ele = flatElements[index + 1];
      if ((ele.isText() || ele.isClosed()) && !ele.isEmpty()) {
        return ele;
      }
      return fn(ele);
    };
    return fn(point.element);
  }
  getElementsByRange(includes = false, flat = false) {
    if (this.range.anchor.isEqual(this.range.focus)) {
      return [];
    }
    let elements = [];
    if (this.range.anchor.element.isEqual(this.range.focus.element)) {
      if (includes) {
        if (this.range.anchor.element.isText()) {
          if (this.range.anchor.offset == 0 && this.range.focus.offset == this.range.anchor.element.textContent.length) {
            elements = [this.range.anchor.element];
          } else if (this.range.anchor.offset == 0) {
            let val = this.range.anchor.element.textContent;
            let newFocus = this.range.anchor.element.clone();
            this.range.anchor.element.textContent = val.substring(0, this.range.focus.offset);
            newFocus.textContent = val.substring(this.range.focus.offset);
            this.addElementAfter(newFocus, this.range.anchor.element);
            elements = [this.range.anchor.element];
          } else if (this.range.focus.offset == this.range.anchor.element.textContent.length) {
            let newFocus = this.range.anchor.element.clone();
            let val = this.range.anchor.element.textContent;
            this.range.anchor.element.textContent = val.substring(0, this.range.anchor.offset);
            newFocus.textContent = val.substring(this.range.anchor.offset);
            this.addElementAfter(newFocus, this.range.anchor.element);
            elements = [newFocus];
            this.range.anchor.moveToStart(newFocus);
            this.range.focus.moveToEnd(newFocus);
          } else {
            let newEl = this.range.anchor.element.clone();
            let newFocus = this.range.anchor.element.clone();
            let val = this.range.anchor.element.textContent;
            this.range.anchor.element.textContent = val.substring(0, this.range.anchor.offset);
            newEl.textContent = val.substring(this.range.anchor.offset, this.range.focus.offset);
            newFocus.textContent = val.substring(this.range.focus.offset);
            this.addElementAfter(newEl, this.range.anchor.element);
            this.addElementAfter(newFocus, newEl);
            this.range.anchor.moveToStart(newEl);
            this.range.focus.moveToEnd(newEl);
            elements = [newEl];
          }
        } else {
          elements = [this.range.anchor.element];
        }
      }
    } else {
      const flatElements = AlexElement$1.flatElements(this.stack);
      const anchorIndex = flatElements.findIndex((item) => {
        return this.range.anchor.element.isEqual(item);
      });
      const focusIndex = flatElements.findIndex((item) => {
        return this.range.focus.element.isEqual(item);
      });
      for (let i = anchorIndex + 1; i < focusIndex; i++) {
        if (!flatElements[i].isContains(this.range.anchor.element) && !flatElements[i].isContains(this.range.focus.element)) {
          elements.push(flatElements[i]);
        }
      }
      if (includes) {
        if (this.range.anchor.element.isText()) {
          if (this.range.anchor.offset == 0) {
            elements.unshift(this.range.anchor.element);
          } else if (this.range.anchor.offset < this.range.anchor.element.textContent.length) {
            let newEl = this.range.anchor.element.clone();
            let val = this.range.anchor.element.textContent;
            this.range.anchor.element.textContent = val.substring(0, this.range.anchor.offset);
            newEl.textContent = val.substring(this.range.anchor.offset);
            this.addElementAfter(newEl, this.range.anchor.element);
            elements.unshift(newEl);
            this.range.anchor.moveToStart(newEl);
          }
        } else if (this.range.anchor.offset == 0) {
          elements.unshift(this.range.anchor.element);
        }
        if (this.range.focus.element.isText()) {
          if (this.range.focus.offset == this.range.focus.element.textContent.length) {
            elements.push(this.range.focus.element);
          } else if (this.range.focus.offset > 0) {
            let newEl = this.range.focus.element.clone();
            let val = this.range.focus.element.textContent;
            this.range.focus.element.textContent = val.substring(0, this.range.focus.offset);
            newEl.textContent = val.substring(this.range.focus.offset);
            this.addElementAfter(newEl, this.range.focus.element);
            elements.push(this.range.focus.element);
          }
        } else if (this.range.focus.offset == 1) {
          elements.push(this.range.focus.element);
        }
      }
    }
    if (flat) {
      return elements;
    }
    let notFlatElements = [];
    elements.forEach((el) => {
      if (el.isBlock()) {
        notFlatElements.push(el);
      } else {
        const isIn = elements.some((item) => {
          return item.isEqual(el.parent);
        });
        if (!isIn) {
          notFlatElements.push(el);
        }
      }
    });
    return notFlatElements;
  }
  addElementTo(childEle, parentEle, index = 0) {
    if (!AlexElement$1.isElement(childEle)) {
      throw new Error("The first argument must be an AlexElement instance");
    }
    if (!AlexElement$1.isElement(parentEle)) {
      throw new Error("The second argument must be an AlexElement instance");
    }
    if (typeof index != "number" || isNaN(index) || index < 0) {
      throw new Error("The third argument must be an integer not less than 0");
    }
    if (parentEle.hasChildren()) {
      if (index >= parentEle.children.length) {
        parentEle.children.push(childEle);
      } else {
        parentEle.children.splice(index, 0, childEle);
      }
    } else {
      parentEle.children = [childEle];
    }
    childEle.parent = parentEle;
  }
  addElementBefore(newEle, targetEle) {
    if (!AlexElement$1.isElement(newEle)) {
      throw new Error("The first argument must be an AlexElement instance");
    }
    if (!AlexElement$1.isElement(targetEle)) {
      throw new Error("The second argument must be an AlexElement instance");
    }
    if (targetEle.isBlock()) {
      const index = this.stack.findIndex((item) => {
        return targetEle.isEqual(item);
      });
      this.stack.splice(index, 0, newEle);
      newEle.parent = null;
    } else {
      const index = targetEle.parent.children.findIndex((item) => {
        return targetEle.isEqual(item);
      });
      this.addElementTo(newEle, targetEle.parent, index);
    }
  }
  addElementAfter(newEle, targetEle) {
    if (!AlexElement$1.isElement(newEle)) {
      throw new Error("The first argument must be an AlexElement instance");
    }
    if (!AlexElement$1.isElement(targetEle)) {
      throw new Error("The second argument must be an AlexElement instance");
    }
    if (targetEle.isBlock()) {
      const index = this.stack.findIndex((item) => {
        return targetEle.isEqual(item);
      });
      if (index >= this.stack.length - 1) {
        this.stack.push(newEle);
      } else {
        this.stack.splice(index + 1, 0, newEle);
      }
      newEle.parent = null;
    } else {
      const index = targetEle.parent.children.findIndex((item) => {
        return targetEle.isEqual(item);
      });
      this.addElementTo(newEle, targetEle.parent, index + 1);
    }
  }
  collapseToStart(element2) {
    if (this.disabled) {
      return;
    }
    if (AlexElement$1.isElement(element2)) {
      this.range.anchor.moveToStart(element2);
      this.range.focus.moveToStart(element2);
    } else {
      const flatElements = AlexElement$1.flatElements(this.stack);
      this.range.anchor.moveToStart(flatElements[0]);
      this.range.focus.moveToStart(flatElements[0]);
    }
  }
  collapseToEnd(element2) {
    if (this.disabled) {
      return;
    }
    if (AlexElement$1.isElement(element2)) {
      this.range.anchor.moveToEnd(element2);
      this.range.focus.moveToEnd(element2);
    } else {
      const flatElements = AlexElement$1.flatElements(this.stack);
      const length = flatElements.length;
      this.range.anchor.moveToEnd(flatElements[length - 1]);
      this.range.focus.moveToEnd(flatElements[length - 1]);
    }
  }
  setDisabled() {
    this.disabled = true;
    this.$el.removeAttribute("contenteditable");
  }
  setEnabled() {
    this.disabled = false;
    this.$el.setAttribute("contenteditable", true);
  }
  setTextStyle(styles) {
    if (!obj.common.isObject(styles)) {
      throw new Error("The argument must be an object");
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      if (this.range.anchor.element.isSpaceText()) {
        if (this.range.anchor.element.hasStyles()) {
          Object.assign(this.range.anchor.element.styles, Util.clone(styles));
        } else {
          this.range.anchor.element.styles = Util.clone(styles);
        }
      } else if (this.range.anchor.element.isText()) {
        const el = AlexElement$1.getSpaceElement();
        el.styles = Util.clone(this.range.anchor.element.styles);
        el.marks = Util.clone(this.range.anchor.element.marks);
        if (el.hasStyles()) {
          Object.assign(el.styles, Util.clone(styles));
        } else {
          el.styles = Util.clone(styles);
        }
        this.insertElement(el);
      } else {
        const el = AlexElement$1.getSpaceElement();
        el.styles = Util.clone(styles);
        this.insertElement(el);
      }
    } else {
      const elements = this.getElementsByRange(true, true);
      elements.forEach((el) => {
        if (el.isText()) {
          if (el.hasStyles()) {
            Object.assign(el.styles, Util.clone(styles));
          } else {
            el.styles = Util.clone(styles);
          }
        }
      });
    }
  }
  removeTextStyle(styleNames) {
    const removeFn = (el) => {
      if (Array.isArray(styleNames)) {
        if (el.hasStyles()) {
          let styles = {};
          for (let key in el.styles) {
            if (!styleNames.includes(key)) {
              styles[key] = el.styles[key];
            }
          }
          el.styles = styles;
        }
      } else {
        el.styles = null;
      }
    };
    if (this.range.anchor.isEqual(this.range.focus)) {
      if (this.range.anchor.element.isSpaceText()) {
        removeFn(this.range.anchor.element);
      } else if (this.range.anchor.element.isText()) {
        const el = AlexElement$1.getSpaceElement();
        el.styles = Util.clone(this.range.anchor.element.styles);
        el.marks = Util.clone(this.range.anchor.element.marks);
        removeFn(el);
        this.insertElement(el);
      }
    } else {
      const elements = this.getElementsByRange(true, true);
      elements.forEach((el) => {
        if (el.isText()) {
          removeFn(el);
        }
      });
    }
  }
  queryTextStyle(name, value) {
    if (!name) {
      throw new Error("The first argument cannot be null");
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      if (this.range.anchor.element.isText() && this.range.anchor.element.hasStyles()) {
        if (value == null || value == void 0) {
          return this.range.anchor.element.styles.hasOwnProperty(name);
        }
        return this.range.anchor.element.styles[name] == value;
      }
      return false;
    }
    const elements = this.getElementsByRange(true, true).filter((el) => {
      return el.isText();
    });
    if (elements.length == 0) {
      return false;
    }
    let flag = elements.every((el) => {
      if (el.hasStyles()) {
        if (value == null || value == void 0) {
          return el.styles.hasOwnProperty(name);
        }
        return el.styles[name] == value;
      }
      return false;
    });
    return flag;
  }
  setTextMark(marks) {
    if (!obj.common.isObject(marks)) {
      throw new Error("The argument must be an object");
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      if (this.range.anchor.element.isSpaceText()) {
        if (this.range.anchor.element.hasMarks()) {
          Object.assign(this.range.anchor.element.marks, Util.clone(marks));
        } else {
          this.range.anchor.element.marks = Util.clone(marks);
        }
      } else if (this.range.anchor.element.isText()) {
        const el = AlexElement$1.getSpaceElement();
        el.styles = Util.clone(this.range.anchor.element.styles);
        el.marks = Util.clone(this.range.anchor.element.marks);
        if (el.hasMarks()) {
          Object.assign(el.marks, Util.clone(marks));
        } else {
          el.marks = Util.clone(marks);
        }
        this.insertElement(el);
      } else {
        const el = AlexElement$1.getSpaceElement();
        el.marks = Util.clone(marks);
        this.insertElement(el);
      }
    } else {
      const elements = this.getElementsByRange(true, true);
      elements.forEach((el) => {
        if (el.isText()) {
          if (el.hasMarks()) {
            Object.assign(el.marks, Util.clone(marks));
          } else {
            el.marks = Util.clone(marks);
          }
        }
      });
    }
  }
  removeTextMark(markNames) {
    const removeFn = (el) => {
      if (Array.isArray(markNames)) {
        if (el.hasMarks()) {
          let marks = {};
          for (let key in el.marks) {
            if (!markNames.includes(key)) {
              marks[key] = el.marks[key];
            }
          }
          el.marks = marks;
        }
      } else {
        el.marks = null;
      }
    };
    if (this.range.anchor.isEqual(this.range.focus)) {
      if (this.range.anchor.element.isSpaceText()) {
        removeFn(this.range.anchor.element);
      } else if (this.range.anchor.element.isText()) {
        const el = AlexElement$1.getSpaceElement();
        el.styles = Util.clone(this.range.anchor.element.styles);
        el.marks = Util.clone(this.range.anchor.element.marks);
        removeFn(el);
        this.insertElement(el);
      }
    } else {
      const elements = this.getElementsByRange(true, true);
      elements.forEach((el) => {
        if (el.isText()) {
          removeFn(el);
        }
      });
    }
  }
  queryTextMark(name, value) {
    if (!name) {
      throw new Error("The first argument cannot be null");
    }
    if (this.range.anchor.isEqual(this.range.focus)) {
      if (this.range.anchor.element.isText() && this.range.anchor.element.hasMarks()) {
        if (value == null || value == void 0) {
          return this.range.anchor.element.marks.hasOwnProperty(name);
        }
        return this.range.anchor.element.marks[name] == value;
      }
      return false;
    }
    const elements = this.getElementsByRange(true, true).filter((el) => {
      return el.isText();
    });
    if (elements.length == 0) {
      return false;
    }
    let flag = elements.every((el) => {
      if (el.hasMarks()) {
        if (value == null || value == void 0) {
          return el.marks.hasOwnProperty(name);
        }
        return el.marks[name] == value;
      }
      return false;
    });
    return flag;
  }
  setIndent() {
    const fn = (element2) => {
      if (element2.hasStyles()) {
        if (element2.styles.hasOwnProperty("text-indent")) {
          let val = element2.styles["text-indent"];
          if (val.endsWith("em")) {
            val = parseFloat(val);
          } else {
            val = 0;
          }
          element2.styles["text-indent"] = `${val + 2}em`;
        } else {
          element2.styles["text-indent"] = "2em";
        }
      } else {
        element2.styles = {
          "text-indent": "2em"
        };
      }
    };
    if (this.range.anchor.isEqual(this.range.focus)) {
      const block2 = this.range.anchor.element.getBlock();
      const inblock2 = this.range.anchor.element.getInblock();
      if (inblock2 && inblock2.behavior == "block") {
        fn(inblock2);
      } else {
        fn(block2);
      }
    } else {
      const elements = this.getElementsByRange(true, false);
      elements.forEach((el) => {
        const block2 = el.getBlock();
        const inblock2 = el.getInblock();
        if (inblock2 && inblock2.behavior == "block") {
          fn(inblock2);
        } else {
          fn(block2);
        }
      });
    }
  }
  setOutdent() {
    const fn = (element2) => {
      if (element2.hasStyles() && element2.styles.hasOwnProperty("text-indent")) {
        let val = element2.styles["text-indent"];
        if (val.endsWith("em")) {
          val = parseFloat(val);
        } else {
          val = 0;
        }
        element2.styles["text-indent"] = `${val - 2 >= 0 ? val - 2 : 0}em`;
      }
    };
    if (this.range.anchor.isEqual(this.range.focus)) {
      const block2 = this.range.anchor.element.getBlock();
      const inblock2 = this.range.anchor.element.getInblock();
      if (inblock2 && inblock2.behavior == "block") {
        fn(inblock2);
      } else {
        fn(block2);
      }
    } else {
      const elements = this.getElementsByRange(true, false);
      elements.forEach((el) => {
        const block2 = el.getBlock();
        const inblock2 = el.getInblock();
        if (inblock2 && inblock2.behavior == "block") {
          fn(inblock2);
        } else {
          fn(block2);
        }
      });
    }
  }
  emit(eventName, ...value) {
    if (Array.isArray(this.__events[eventName])) {
      this.__events[eventName].forEach((fn) => {
        fn.apply(this, [...value]);
      });
      return true;
    }
    return false;
  }
  on(eventName, eventHandle) {
    if (!this.__events[eventName]) {
      this.__events[eventName] = [];
    }
    this.__events[eventName].push(eventHandle);
  }
  destroy() {
    this.setDisabled();
    obj.event.off(document, `selectionchange.alex_editor_${this.__guid}`);
    obj.event.off(this.$el, "beforeinput.alex_editor compositionstart.alex_editor compositionupdate.alex_editor compositionend.alex_editor keydown.alex_editor cut.alex_editor paste.alex_editor copy.alex_editor dragstart.alex_editor drop.alex_editor focus.alex_editor blur.alex_editor");
  }
}
const elementUtil = {
  isList(element2, ordered = false) {
    return element2.type == "block" && element2.parsedom == "div" && element2.hasMarks() && element2.marks["data-list"] == (ordered ? "ol" : "ul");
  },
  toParagraph(element2) {
    if (this.isList(element2, true) || this.isList(element2, false)) {
      let marks = {};
      for (let key in element2.marks) {
        if (key != "data-list" && key != "data-value") {
          marks[key] = element2.marks[key];
        }
      }
      element2.marks = marks;
    }
    element2.parsedom = AlexElement$1.BLOCK_NODE;
  },
  toList(element2, ordered = false) {
    element2.parsedom = "div";
    if (!element2.hasMarks()) {
      element2.marks = {};
    }
    element2.marks["data-list"] = ordered ? "ol" : "ul";
  }
};
const editor_vue_vue_type_style_index_0_scoped_510ad9f7_lang = "";
const _sfc_main$7 = {
  name: "m-editor",
  emits: ["update:modelValue", "focus", "blur", "change", "paste-image", "paste-video"],
  props: {
    modelValue: {
      type: String,
      default: "<p><br></p>"
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
      default: "8rem"
    },
    autoheight: {
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
    activeColor: {
      type: String,
      default: "#0b73de",
      validator(value) {
        return obj$1.common.matchingText(value, "hex");
      }
    },
    htmlPaste: {
      type: Boolean,
      default: false
    },
    customImagePaste: {
      type: Boolean,
      default: false
    },
    customVideoPaste: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      codeViewShow: false,
      editor: null,
      compositionFlag: false,
      isModelChange: false,
      useMenus: false,
      canUseMenus: false,
      linkAdjusterProps: {
        show: false,
        target: "",
        newWindow: false,
        url: "",
        props: {
          placeholder: "\u8F93\u5165\u5730\u5740",
          targetText: "\u65B0\u7A97\u53E3\u6253\u5F00",
          removeText: "\u79FB\u9664\u94FE\u63A5",
          insertText: "\u63D2\u5165"
        }
      },
      mediaAdjusterProps: {
        show: false,
        target: ""
      },
      tableAdjusterProps: {
        show: false,
        target: "",
        props: {
          insertRowText: "\u63D2\u5165\u884C",
          removeRowText: "\u5220\u9664\u884C",
          insertColumnText: "\u63D2\u5165\u5217",
          removeColumnText: "\u5220\u9664\u5217"
        }
      }
    };
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  components: {
    Icon,
    Field,
    Checkbox
  },
  computed: {
    cmpValue: {
      set(val) {
        this.$emit("update:modelValue", val);
      },
      get() {
        return this.modelValue;
      }
    },
    contentStyle() {
      let style = {};
      if (this.autoheight) {
        style.minHeight = this.height;
      } else {
        style.height = this.height;
      }
      return style;
    },
    isEmpty() {
      return this.cmpValue == "<p><br></p>" && !this.compositionFlag;
    }
  },
  watch: {
    disabled(newVal) {
      if (newVal) {
        this.editor.setDisabled();
      } else {
        this.editor.setEnabled();
      }
    },
    cmpValue(newVal) {
      if (this.codeViewShow) {
        return;
      }
      if (this.isModelChange) {
        return;
      }
      this.editor.stack = this.editor.parseHtml(newVal);
      this.editor.formatElementStack();
      const elements = AlexElement$1.flatElements(this.editor.stack);
      this.editor.range.anchor.moveToEnd(elements[elements.length - 1]);
      this.editor.range.focus.moveToEnd(elements[elements.length - 1]);
      this.editor.domRender();
      this.editor.rangeRender();
    }
  },
  mounted() {
    this.editor = new AlexEditor(this.$refs.content, {
      disabled: this.disabled,
      value: this.cmpValue,
      renderRules: [this.orderListHandle, this.codeHandle, this.mediaHandle, this.thParseTdHandle, this.tableHandle],
      htmlPaste: this.htmlPaste
    });
    this.internalModify(this.editor.value);
    this.editor.on("change", this.handleContentChange);
    this.editor.on("focus", this.handleContentFocus);
    this.editor.on("blur", this.handleContentBlur);
    this.editor.on("insertParagraph", this.handleInsertParagraph);
    this.editor.on("deleteInStart", this.handleDelete);
    this.editor.on("rangeUpdate", this.handleRangeUpdate);
    this.editor.on("domRender", this.handleDomRender);
    if (this.customImagePaste) {
      this.editor.on("pasteImage", (url) => {
        this.$emit("paste-image", url);
      });
    }
    if (this.customVideoPaste) {
      this.editor.on("pasteVideo", (url) => {
        this.$emit("paste-video", url);
      });
    }
    this.onScroll();
    this.editor.formatElementStack();
    this.editor.domRender();
    if (this.autofocus && !this.codeViewShow && !this.disabled) {
      this.collapseToEnd();
    }
  },
  methods: {
    orderListHandle(element2) {
      if (!element2.isEmpty()) {
        if (element2.parsedom == "ol" || element2.parsedom == "ul") {
          if (element2.hasChildren()) {
            element2.children.forEach((el, index) => {
              const newEl = el.clone();
              newEl.parsedom = "div";
              newEl.type = "block";
              if (!newEl.hasMarks()) {
                newEl.marks = {};
              }
              newEl.marks["data-list"] = element2.parsedom;
              if (element2.parsedom == "ol") {
                newEl.marks["data-value"] = index + 1;
              }
              this.editor.addElementBefore(newEl, element2);
            });
          }
          element2.toEmpty();
        }
        if (element2.type == "block" && element2.hasMarks() && element2.marks["data-list"] == "ol") {
          const previousElement = this.editor.getPreviousElement(element2);
          if (previousElement && previousElement.hasMarks() && previousElement.marks["data-list"] == "ol") {
            const previousValue = Number(previousElement.marks["data-value"]);
            element2.marks["data-value"] = previousValue + 1;
          } else {
            element2.marks["data-value"] = 1;
          }
        }
      }
    },
    mediaHandle(element2) {
      if (!element2.isEmpty()) {
        if (element2.parsedom == "img") {
          const marks = {
            "mvi-editor-element-key": element2.key
          };
          if (obj$1.common.isObject(element2.marks)) {
            Object.assign(element2.marks, marks);
          } else {
            element2.marks = marks;
          }
        }
        if (element2.parsedom == "video") {
          const marks = {
            controls: true,
            autoplay: true,
            muted: true,
            "mvi-editor-element-key": element2.key
          };
          if (obj$1.common.isObject(element2.marks)) {
            Object.assign(element2.marks, marks);
          } else {
            element2.marks = marks;
          }
        }
        if (element2.parsedom == "a") {
          const marks = {
            "mvi-editor-element-key": element2.key
          };
          if (obj$1.common.isObject(element2.marks)) {
            Object.assign(element2.marks, marks);
          } else {
            element2.marks = marks;
          }
        }
      }
    },
    codeHandle(element2) {
      if (!element2.isEmpty() && element2.parsedom == "code") {
        element2.parsedom = "span";
        const marks = {
          "data-code-style": true
        };
        if (element2.hasMarks()) {
          Object.assign(element2.marks, marks);
        } else {
          element2.marks = marks;
        }
      }
    },
    thParseTdHandle(element2) {
      if (element2.parsedom == "th") {
        element2.parsedom = "td";
      }
    },
    tableHandle(element2) {
      if (element2.parsedom == "table" && !element2.isEmpty()) {
        const marks = {
          "mvi-editor-element-key": element2.key
        };
        if (obj$1.common.isObject(element2.marks)) {
          Object.assign(element2.marks, marks);
        } else {
          element2.marks = marks;
        }
        const elements = AlexElement$1.flatElements(element2.children);
        const rows = elements.filter((el) => {
          return el.parsedom == "tr";
        });
        let colgroup = elements.find((el) => {
          return el.parsedom == "colgroup";
        });
        if (colgroup) {
          colgroup.children.forEach((col) => {
            if (!col.hasMarks()) {
              col.marks = {
                width: "auto"
              };
            } else if (!col.marks["width"]) {
              col.marks["width"] = "auto";
            }
          });
        } else {
          colgroup = new AlexElement$1("inblock", "colgroup", null, null, null);
          for (let i = rows[0].children.length - 1; i >= 0; i--) {
            const col = new AlexElement$1(
              "closed",
              "col",
              {
                width: "auto"
              },
              null,
              null
            );
            this.editor.addElementTo(col, colgroup);
          }
        }
        element2.children = [];
        const tbody = new AlexElement$1("inblock", "tbody", null, null, null);
        rows.reverse().forEach((row) => {
          this.editor.addElementTo(row, tbody);
        });
        this.editor.addElementTo(tbody, element2);
        this.editor.addElementTo(colgroup, element2);
      }
    },
    inputFocus(event2) {
      event2.currentTarget.style.borderColor = this.activeColor;
    },
    inputBlur(event2) {
      event2.currentTarget.style.borderColor = "";
    },
    onScroll() {
      const setScroll = (el) => {
        obj$1.event.on(el, `scroll.editor_${this.uid}`, (e) => {
          this.linkAdjusterProps.show = false;
          this.mediaAdjusterProps.show = false;
          this.tableAdjusterProps.show = false;
        });
        if (el.parentNode) {
          setScroll(el.parentNode);
        }
      };
      setScroll(this.$refs.content);
    },
    removeScroll() {
      const removeScroll = (el) => {
        obj$1.event.off(el, `scroll.editor_${this.uid}`);
        if (el.parentNode) {
          removeScroll(el.parentNode);
        }
      };
      removeScroll(this.$refs.content);
    },
    internalModify(val) {
      this.isModelChange = true;
      this.cmpValue = val;
      this.$nextTick(() => {
        this.isModelChange = false;
      });
    },
    clickEditor(e) {
      if (this.disabled) {
        return;
      }
      const node = e.target;
      e.preventDefault();
      if (node.nodeName.toLocaleLowerCase() == "img" || node.nodeName.toLocaleLowerCase() == "video") {
        const key = node.getAttribute("mvi-editor-element-key");
        const element2 = this.editor.getElementByKey(key);
        this.editor.range.anchor.moveToStart(element2);
        this.editor.range.focus.moveToEnd(element2);
        this.editor.rangeRender();
      }
    },
    handleContentChange(newVal, oldVal) {
      if (this.disabled) {
        return;
      }
      this.internalModify(newVal);
      this.$emit("change", newVal, oldVal);
    },
    handleContentFocus(val) {
      if (this.disabled) {
        return;
      }
      if (this.border && this.activeColor) {
        this.$refs.content.style.borderColor = this.activeColor;
        const rgb = obj$1.color.hex2rgb(this.activeColor);
        this.$refs.content.style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
      }
      setTimeout(() => {
        this.canUseMenus = true;
      }, 0);
      this.$emit("focus", val);
    },
    handleContentBlur(val) {
      if (this.disabled) {
        return;
      }
      if (this.border && this.activeColor) {
        this.$refs.content.style.borderColor = "";
        this.$refs.content.style.boxShadow = "";
      }
      this.$emit("blur", val);
    },
    handleInsertParagraph(element2, previousElement) {
      if (previousElement.isOnlyHasBreak() && element2.isOnlyHasBreak()) {
        if (!previousElement.isBlock()) {
          previousElement.convertToBlock();
        }
        if (previousElement.parsedom != AlexElement$1.BLOCK_NODE) {
          elementUtil.toParagraph(previousElement);
          this.editor.range.anchor.moveToStart(previousElement);
          this.editor.range.focus.moveToStart(previousElement);
          element2.toEmpty();
        }
      }
    },
    handleDelete(element2) {
      elementUtil.toParagraph(element2);
      if (element2.isInblock()) {
        element2.convertToBlock();
      }
    },
    handleRangeUpdate(range) {
      if (this.disabled) {
        return;
      }
      const img = this.getCurrentParsedomElement("img");
      const link = this.getCurrentParsedomElement("a");
      const video = this.getCurrentParsedomElement("video");
      const table = this.getCurrentParsedomElement("table");
      setTimeout(() => {
        if (img || video) {
          const el = img || video;
          this.mediaAdjusterProps.target = `[mvi-editor-element-key='${el.key}']`;
          this.mediaAdjusterProps.show = true;
          this.linkAdjusterProps.show = false;
          this.tableAdjusterProps.show = false;
        } else if (link) {
          this.linkAdjusterProps.target = `[mvi-editor-element-key='${link.key}']`;
          this.linkAdjusterProps.show = true;
          this.linkAdjusterProps.url = link.marks["href"];
          this.linkAdjusterProps.newWindow = link.marks["target"] == "_blank";
          this.mediaAdjusterProps.show = false;
          this.tableAdjusterProps.show = false;
        } else if (table) {
          this.tableAdjusterProps.target = `[mvi-editor-element-key='${table.key}']`;
          this.tableAdjusterProps.show = true;
          this.mediaAdjusterProps.show = false;
          this.linkAdjusterProps.show = false;
        } else {
          this.tableAdjusterProps.show = false;
          this.mediaAdjusterProps.show = false;
          this.linkAdjusterProps.show = false;
        }
      }, 100);
    },
    handleDomRender() {
      const elements = AlexElement$1.flatElements(this.editor.stack);
      const tables = elements.filter((el) => {
        return el.parsedom == "table";
      });
      tables.forEach((table) => {
        const firstRow = AlexElement$1.flatElements(table.children).filter((el) => {
          return el.parsedom == "tr";
        })[0];
        firstRow.children.forEach((column, i) => {
          this.setTabelColumnResize(table, firstRow, column, i);
        });
      });
    },
    setTabelColumnResize(table, firstRow, column, i) {
      if (this.disabled) {
        return;
      }
      if (i == firstRow.children.length - 1) {
        return;
      }
      const index = column.parent.children.findIndex((item) => {
        return item.isEqual(column);
      });
      const colgroup = table.children.find((item) => {
        return item.parsedom == "colgroup";
      });
      obj$1.event.off(column._elm, "mousedown");
      obj$1.event.off(document.documentElement, `mousemove.editor_table_${table.key}_${index}_${this.uid} mouseup.editor_table_${table.key}_${index}_${this.uid}`);
      let canResize = false;
      let start = 0;
      obj$1.event.on(column._elm, "mousedown", (e) => {
        if (this.disabled) {
          return;
        }
        const rect = obj$1.element.getElementBounding(column._elm);
        if (Math.abs(rect.left + column._elm.offsetWidth - e.pageX) < obj$1.element.rem2px(0.2)) {
          canResize = true;
          start = e.pageX;
        } else {
          canResize = false;
        }
      });
      obj$1.event.on(document.documentElement, `mousemove.editor_table_${table.key}_${index}_${this.uid}`, (e) => {
        if (this.disabled) {
          return;
        }
        if (canResize) {
          colgroup.children[index].marks["width"] = `${column._elm.offsetWidth + e.pageX - start}`;
          colgroup.children[index]._elm.setAttribute("width", `${column._elm.offsetWidth + e.pageX - start}`);
          start = e.pageX;
        }
      });
      obj$1.event.on(document.documentElement, `mouseup.editor_table_${table.key}_${index}_${this.uid}`, (e) => {
        if (this.disabled) {
          return;
        }
        if (canResize) {
          const width = Number(colgroup.children[index].marks["width"]);
          if (!isNaN(width)) {
            colgroup.children[index].marks["width"] = `${Number((width / firstRow._elm.offsetWidth * 100).toFixed(2))}%`;
            this.editor.formatElementStack();
            this.editor.domRender();
            this.editor.rangeRender();
          }
          canResize = false;
          start = 0;
        }
      });
    },
    deleteLink() {
      if (this.disabled) {
        return;
      }
      const element2 = this.getCurrentParsedomElement("a");
      element2.parsedom = AlexElement$1.TEXT_NODE;
      delete element2.marks.target;
      delete element2.marks.href;
      this.editor.formatElementStack();
      this.editor.domRender();
      this.editor.rangeRender();
      this.linkAdjusterProps.show = false;
    },
    updateLink() {
      if (this.disabled) {
        return;
      }
      if (!this.linkAdjusterProps.url) {
        return;
      }
      const element2 = this.getCurrentParsedomElement("a");
      element2.marks.href = this.linkAdjusterProps.url;
      if (this.linkAdjusterProps.newWindow) {
        element2.marks.target = "_blank";
      } else {
        delete element2.marks.target;
      }
      this.editor.formatElementStack();
      this.editor.domRender();
    },
    setMediaWidth(value) {
      const element2 = this.getCurrentParsedomElement("img") || this.getCurrentParsedomElement("video");
      const styles = {
        width: value
      };
      if (element2.hasStyles()) {
        Object.assign(element2.styles, styles);
      } else {
        element2.styles = styles;
      }
      this.editor.range.anchor.moveToEnd(element2);
      this.editor.range.focus.moveToEnd(element2);
      this.editor.domRender();
      this.editor.rangeRender();
      this.mediaAdjusterProps.show = false;
    },
    deleteMedia() {
      const element2 = this.getCurrentParsedomElement("img") || this.getCurrentParsedomElement("video");
      this.editor.range.anchor.moveToEnd(element2);
      this.editor.range.focus.moveToEnd(element2);
      element2.toEmpty();
      this.editor.formatElementStack();
      this.editor.domRender();
      this.editor.rangeRender();
      this.mediaAdjusterProps.show = false;
    },
    insertParagraph(type) {
      if (this.disabled) {
        return;
      }
      if (!this.editor.range.anchor.isEqual(this.editor.range.focus)) {
        this.editor.range.anchor.element = this.editor.range.focus.element;
        this.editor.range.anchor.offset = this.editor.range.focus.offset;
      }
      const table = this.getCurrentParsedomElement("table");
      const paragraph = new AlexElement$1("block", AlexElement$1.BLOCK_NODE, null, null, null);
      const breakEl = new AlexElement$1("closed", "br", null, null, null);
      this.editor.addElementTo(breakEl, paragraph);
      if (type == "up") {
        this.editor.addElementBefore(paragraph, table);
      } else {
        this.editor.addElementAfter(paragraph, table);
      }
      this.editor.range.anchor.moveToEnd(paragraph);
      this.editor.range.focus.moveToEnd(paragraph);
      this.editor.formatElementStack();
      this.editor.domRender();
      this.editor.rangeRender();
    },
    addTableRow() {
      if (this.disabled) {
        return;
      }
      if (!this.editor.range.anchor.isEqual(this.editor.range.focus)) {
        this.editor.range.anchor.element = this.editor.range.focus.element;
        this.editor.range.anchor.offset = this.editor.range.focus.offset;
      }
      const row = this.getCurrentParsedomElement("tr");
      const newRow = row.clone();
      newRow.children.forEach((column) => {
        column.children = [];
        const breakEl = new AlexElement$1("closed", "br", null, null, null);
        this.editor.addElementTo(breakEl, column);
      });
      this.editor.addElementAfter(newRow, row);
      this.editor.formatElementStack();
      this.editor.range.anchor.moveToStart(newRow);
      this.editor.range.focus.moveToStart(newRow);
      this.editor.domRender();
      this.editor.rangeRender();
      this.$refs.tableLayer.reset();
    },
    removeTableRow() {
      if (this.disabled) {
        return;
      }
      if (!this.editor.range.anchor.isEqual(this.editor.range.focus)) {
        this.editor.range.anchor.element = this.editor.range.focus.element;
        this.editor.range.anchor.offset = this.editor.range.focus.offset;
      }
      const row = this.getCurrentParsedomElement("tr");
      const parent = row.parent;
      if (parent.children.length == 1) {
        this.deleteTable();
        return;
      }
      const previousRow = this.editor.getPreviousElement(row);
      const nextRow = this.editor.getNextElement(row);
      row.toEmpty();
      this.editor.formatElementStack();
      if (previousRow) {
        this.editor.range.anchor.moveToEnd(previousRow.children[0]);
        this.editor.range.focus.moveToEnd(previousRow.children[0]);
      } else {
        this.editor.range.anchor.moveToEnd(nextRow.children[0]);
        this.editor.range.focus.moveToEnd(nextRow.children[0]);
      }
      this.editor.domRender();
      this.editor.rangeRender();
      this.$refs.tableLayer.reset();
    },
    addTableColumn() {
      if (this.disabled) {
        return;
      }
      if (!this.editor.range.anchor.isEqual(this.editor.range.focus)) {
        this.editor.range.anchor.element = this.editor.range.focus.element;
        this.editor.range.anchor.offset = this.editor.range.focus.offset;
      }
      const column = this.getCurrentParsedomElement("td");
      const tbody = this.getCurrentParsedomElement("tbody");
      const rows = tbody.children;
      const index = column.parent.children.findIndex((item) => {
        return item.isEqual(column);
      });
      rows.forEach((row) => {
        const newColumn = column.clone(false);
        const breakEl = new AlexElement$1("closed", "br", null, null, null);
        this.editor.addElementTo(breakEl, newColumn);
        this.editor.addElementTo(newColumn, row, index + 1);
      });
      this.editor.formatElementStack();
      const nextColumn = this.editor.getNextElement(column);
      this.editor.range.anchor.moveToStart(nextColumn);
      this.editor.range.focus.moveToStart(nextColumn);
      this.editor.domRender();
      this.editor.rangeRender();
      this.$refs.tableLayer.reset();
    },
    removeTableColumn() {
      if (this.disabled) {
        return;
      }
      if (!this.editor.range.anchor.isEqual(this.editor.range.focus)) {
        this.editor.range.anchor.element = this.editor.range.focus.element;
        this.editor.range.anchor.offset = this.editor.range.focus.offset;
      }
      const column = this.getCurrentParsedomElement("td");
      const tbody = this.getCurrentParsedomElement("tbody");
      const rows = tbody.children;
      const parent = column.parent;
      if (parent.children.length == 1) {
        this.deleteTable();
        return;
      }
      const previousColumn = this.editor.getPreviousElement(column);
      const nextColumn = this.editor.getNextElement(column);
      const index = column.parent.children.findIndex((item) => {
        return item.isEqual(column);
      });
      rows.forEach((row) => {
        row.children[index].toEmpty();
      });
      this.editor.formatElementStack();
      if (previousColumn) {
        this.editor.range.anchor.moveToEnd(previousColumn);
        this.editor.range.focus.moveToEnd(previousColumn);
      } else {
        this.editor.range.anchor.moveToEnd(nextColumn);
        this.editor.range.focus.moveToEnd(nextColumn);
      }
      this.editor.domRender();
      this.editor.rangeRender();
      this.$refs.tableLayer.reset();
    },
    deleteTable() {
      if (this.disabled) {
        return;
      }
      if (!this.editor.range.anchor.isEqual(this.editor.range.focus)) {
        this.editor.range.anchor.element = this.editor.range.focus.element;
        this.editor.range.anchor.offset = this.editor.range.focus.offset;
      }
      const table = this.getCurrentParsedomElement("table");
      table.toEmpty();
      this.editor.formatElementStack();
      this.editor.domRender();
      this.editor.rangeRender();
    },
    use(menus) {
      if (this.useMenus) {
        throw new Error("The editor has already used a menu bar and cannot be used repeatedly");
      }
      menus.instance = this;
      this.useMenus = true;
    },
    getCurrentParsedomElement(parsedom) {
      const fn = (element2) => {
        if (element2.isBlock()) {
          return element2.parsedom == parsedom ? element2 : null;
        }
        if (!element2.isText() && element2.parsedom == parsedom) {
          return element2;
        }
        return fn(element2.parent);
      };
      if (this.editor.range.anchor.element.isEqual(this.editor.range.focus.element)) {
        return fn(this.editor.range.anchor.element);
      }
      const elements = this.editor.getElementsByRange(true, false);
      this.editor.formatElementStack();
      const arr = [];
      elements.forEach((el) => {
        arr.push(fn(el));
      });
      let hasNull = arr.some((el) => {
        return el == null;
      });
      if (hasNull) {
        return null;
      }
      if (arr.length == 1) {
        return arr[0];
      }
      let flag = true;
      for (let i = 1; i < arr.length; i++) {
        if (!arr[i].isEqual(arr[0])) {
          flag = false;
          break;
        }
      }
      if (flag) {
        return arr[0];
      }
      return null;
    },
    collapseToEnd() {
      if (this.disabled) {
        return;
      }
      this.editor.collapseToEnd();
      this.editor.rangeRender();
      obj$1.element.setScrollTop({
        el: this.$refs.content,
        number: 1e6,
        time: 0
      });
    },
    collapseToStart() {
      if (this.disabled) {
        return;
      }
      this.editor.collapseToStart();
      this.editor.rangeRender();
      this.$nextTick(() => {
        obj$1.element.setScrollTop({
          el: this.$refs.content,
          number: 0,
          time: 0
        });
      });
    },
    insertImage(url) {
      const image = new AlexElement$1(
        "closed",
        "img",
        {
          src: url
        },
        null,
        null
      );
      this.editor.insertElement(image);
      const leftSpace = AlexElement$1.getSpaceElement();
      const rightSpace = AlexElement$1.getSpaceElement();
      this.editor.addElementAfter(rightSpace, image);
      this.editor.addElementBefore(leftSpace, image);
      this.editor.range.anchor.moveToEnd(rightSpace);
      this.editor.range.focus.moveToEnd(rightSpace);
      this.editor.formatElementStack();
      this.editor.domRender();
      this.editor.rangeRender();
    },
    insertVideo(url) {
      const video = new AlexElement$1(
        "closed",
        "video",
        {
          src: url
        },
        null,
        null
      );
      this.editor.insertElement(video);
      const leftSpace = AlexElement$1.getSpaceElement();
      const rightSpace = AlexElement$1.getSpaceElement();
      this.editor.addElementAfter(rightSpace, video);
      this.editor.addElementBefore(leftSpace, video);
      this.editor.range.anchor.moveToEnd(rightSpace);
      this.editor.range.focus.moveToEnd(rightSpace);
      this.editor.formatElementStack();
      this.editor.domRender();
      this.editor.rangeRender();
    },
    insertHtml(html) {
      if (!html) {
        return;
      }
      const elements = this.editor.parseHtml(html);
      elements.reverse().forEach((el, index) => {
        if (index == 0) {
          this.editor.insertElement(el);
        } else {
          this.editor.addElementBefore(el, elements[0]);
        }
      });
      this.editor.range.anchor.moveToEnd(elements[elements.length - 1]);
      this.editor.range.focus.moveToEnd(elements[elements.length - 1]);
      this.editor.formatElementStack();
      this.editor.domRender();
      this.editor.rangeRender();
    },
    insertText(text) {
      if (!text) {
        return;
      }
      this.editor.insertText(text);
      this.editor.formatElementStack();
      this.editor.domRender();
      this.editor.rangeRender();
    }
  },
  beforeUnmount() {
    this.removeScroll();
    const data2 = obj$1.event.get(document.documentElement);
    for (let key in data2) {
      if (key.startsWith("mousemove.editor_") || key.startsWith("mouseup.editor_")) {
        obj$1.event.off(document.documentElement, key);
      }
    }
  }
};
const _hoisted_1$2 = { class: "mvi-editor" };
const _hoisted_2$2 = ["value"];
const _hoisted_3$1 = ["data-placeholder", "disabled"];
const _hoisted_4$1 = { class: "mvi-editor-layer-link" };
const _hoisted_5$1 = ["placeholder"];
const _hoisted_6$1 = { class: "mvi-editor-layer-link-footer" };
const _hoisted_7$1 = { class: "mvi-editor-layer" };
const _hoisted_8$1 = { class: "mvi-editor-layer" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Checkbox = resolveComponent("Checkbox");
  const _component_m_layer = resolveComponent("m-layer");
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    $data.codeViewShow ? (openBlock(), createElementBlock("textarea", {
      key: 0,
      ref: "code",
      readonly: "",
      class: "mvi-editor-code",
      value: $options.cmpValue
    }, null, 8, _hoisted_2$2)) : createCommentVNode("", true),
    createElementVNode("div", {
      ref: "content",
      "data-placeholder": $props.placeholder,
      class: normalizeClass(["mvi-editor-content", $props.border ? "border" : "", $options.isEmpty ? "empty" : ""]),
      style: normalizeStyle($options.contentStyle),
      onCompositionstart: _cache[0] || (_cache[0] = ($event) => $data.compositionFlag = true),
      onCompositionend: _cache[1] || (_cache[1] = ($event) => $data.compositionFlag = false),
      onClick: _cache[2] || (_cache[2] = (...args) => $options.clickEditor && $options.clickEditor(...args)),
      disabled: $props.disabled || null
    }, null, 46, _hoisted_3$1),
    createVNode(_component_m_layer, {
      modelValue: $data.linkAdjusterProps.show,
      "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.linkAdjusterProps.show = $event),
      fixed: "",
      target: $data.linkAdjusterProps.target,
      placement: "bottom-start",
      animation: "mvi-editor-layer-animation",
      timeout: 50,
      border: "",
      background: "#fff",
      "border-color": "#ddd",
      closable: ""
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_4$1, [
          withDirectives(createElementVNode("input", {
            onChange: _cache[3] || (_cache[3] = (...args) => $options.updateLink && $options.updateLink(...args)),
            ref: "linkUrl",
            onFocus: _cache[4] || (_cache[4] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
            onBlur: _cache[5] || (_cache[5] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.linkAdjusterProps.url = $event),
            placeholder: $data.linkAdjusterProps.props.placeholder,
            type: "text"
          }, null, 40, _hoisted_5$1), [
            [
              vModelText,
              $data.linkAdjusterProps.url,
              void 0,
              { trim: true }
            ]
          ]),
          createElementVNode("div", _hoisted_6$1, [
            createVNode(_component_Checkbox, {
              onChange: $options.updateLink,
              label: $data.linkAdjusterProps.props.targetText,
              "label-placement": "right",
              icon: { size: "0.24rem" },
              "label-size": "0.28rem",
              "label-color": "#505050",
              "fill-color": $props.activeColor,
              modelValue: $data.linkAdjusterProps.newWindow,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.linkAdjusterProps.newWindow = $event)
            }, null, 8, ["onChange", "label", "fill-color", "modelValue"]),
            createElementVNode("span", {
              class: "mvi-editor-layer-link-delete",
              onClick: _cache[8] || (_cache[8] = (...args) => $options.deleteLink && $options.deleteLink(...args))
            }, toDisplayString($data.linkAdjusterProps.props.removeText), 1)
          ])
        ])
      ]),
      _: 1
    }, 8, ["modelValue", "target"]),
    createVNode(_component_m_layer, {
      modelValue: $data.mediaAdjusterProps.show,
      "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $data.mediaAdjusterProps.show = $event),
      fixed: "",
      target: $data.mediaAdjusterProps.target,
      placement: "bottom-start",
      animation: "mvi-editor-layer-animation",
      timeout: 50,
      border: "",
      background: "#fff",
      "border-color": "#ccc",
      closable: ""
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_7$1, [
          createElementVNode("div", {
            onClick: _cache[10] || (_cache[10] = ($event) => $options.setMediaWidth("20%")),
            class: "mvi-editor-layer-item"
          }, "20%"),
          createElementVNode("div", {
            onClick: _cache[11] || (_cache[11] = ($event) => $options.setMediaWidth("50%")),
            class: "mvi-editor-layer-item"
          }, "50%"),
          createElementVNode("div", {
            onClick: _cache[12] || (_cache[12] = ($event) => $options.setMediaWidth("100%")),
            class: "mvi-editor-layer-item"
          }, "100%"),
          createElementVNode("div", {
            onClick: _cache[13] || (_cache[13] = (...args) => $options.deleteMedia && $options.deleteMedia(...args)),
            class: "mvi-editor-layer-item"
          }, [
            createVNode(_component_Icon, { type: "trash-alt" })
          ])
        ])
      ]),
      _: 1
    }, 8, ["modelValue", "target"]),
    createVNode(_component_m_layer, {
      modelValue: $data.tableAdjusterProps.show,
      "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => $data.tableAdjusterProps.show = $event),
      fixed: "",
      target: $data.tableAdjusterProps.target,
      placement: "bottom-start",
      animation: "mvi-editor-layer-animation",
      timeout: 50,
      border: "",
      background: "#fff",
      "border-color": "#ccc",
      closable: "",
      ref: "tableLayer"
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_8$1, [
          createElementVNode("div", {
            onClick: _cache[15] || (_cache[15] = ($event) => $options.insertParagraph("up")),
            class: "mvi-editor-layer-item"
          }, [
            createVNode(_component_Icon, {
              style: { "transform": "rotate(180deg)" },
              type: "turn-arrow-text"
            })
          ]),
          createElementVNode("div", {
            onClick: _cache[16] || (_cache[16] = ($event) => $options.insertParagraph("down")),
            class: "mvi-editor-layer-item"
          }, [
            createVNode(_component_Icon, { type: "turn-arrow-text" })
          ]),
          createElementVNode("div", {
            onClick: _cache[17] || (_cache[17] = (...args) => $options.addTableRow && $options.addTableRow(...args)),
            style: normalizeStyle({ color: $props.activeColor }),
            class: "mvi-editor-layer-item"
          }, toDisplayString($data.tableAdjusterProps.props.insertRowText), 5),
          createElementVNode("div", {
            onClick: _cache[18] || (_cache[18] = (...args) => $options.removeTableRow && $options.removeTableRow(...args)),
            class: "mvi-editor-layer-item"
          }, toDisplayString($data.tableAdjusterProps.props.removeRowText), 1),
          createElementVNode("div", {
            onClick: _cache[19] || (_cache[19] = (...args) => $options.addTableColumn && $options.addTableColumn(...args)),
            style: normalizeStyle({ color: $props.activeColor }),
            class: "mvi-editor-layer-item"
          }, toDisplayString($data.tableAdjusterProps.props.insertColumnText), 5),
          createElementVNode("div", {
            onClick: _cache[20] || (_cache[20] = (...args) => $options.removeTableColumn && $options.removeTableColumn(...args)),
            class: "mvi-editor-layer-item"
          }, toDisplayString($data.tableAdjusterProps.props.removeColumnText), 1),
          createElementVNode("div", {
            onClick: _cache[21] || (_cache[21] = (...args) => $options.deleteTable && $options.deleteTable(...args)),
            class: "mvi-editor-layer-item"
          }, [
            createVNode(_component_Icon, { type: "trash-alt" })
          ])
        ])
      ]),
      _: 1
    }, 8, ["modelValue", "target"])
  ]);
}
const Editor = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-510ad9f7"]]);
Editor.install = (app) => {
  app.component(Editor.name, Editor);
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
const editorMenus_vue_vue_type_style_index_0_scoped_86e12942_lang = "";
const _sfc_main$6 = {
  name: "m-editor-menus",
  data() {
    return {
      instance: null
    };
  },
  emits: ["upload-image", "upload-video"],
  provide() {
    return {
      menus: this
    };
  },
  props: {
    useTooltip: {
      type: Boolean,
      default: false
    },
    layerProps: {
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
    useBase64: {
      type: Boolean,
      default: true
    },
    uploadImageError: {
      type: Function
    },
    uploadVideoError: {
      type: Function
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
    border: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    combinedTooltipProps() {
      return this.initOption(defaultTooltipProps, this.tooltipProps);
    },
    combinedLayerProps() {
      return this.initOption(defaultLayerProps, this.layerProps);
    },
    combinedUploadImageProps() {
      return this.initOption(defaultUploadImageProps, this.uploadImageProps);
    },
    combinedUploadVideoProps() {
      return this.initOption(defaultUploadVideoProps, this.uploadVideoProps);
    }
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  mounted() {
    obj$1.event.on(document.documentElement, `mousedown.editor_menus_${this.uid}`, (e) => {
      if (!this.instance) {
        return;
      }
      if (!obj$1.element.isContains(this.$el, e.target) && !obj$1.element.isContains(this.instance.$el, e.target)) {
        this.instance.canUseMenus = false;
      }
    });
  },
  methods: {
    initOption(defaultObj, propObj) {
      let obj2 = {};
      Object.assign(obj2, defaultObj);
      Object.assign(obj2, propObj);
      return obj2;
    }
  },
  beforeUnmount() {
    obj$1.event.off(document.documentElement, `click.editor_menus_${this.uid}`);
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-editor-menus", $props.border ? "border" : ""])
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
const EditorMenus = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-86e12942"]]);
EditorMenus.install = (app) => {
  app.component(EditorMenus.name, EditorMenus);
};
const _sfc_main$5 = {
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
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Tag = resolveComponent("Tag");
  return openBlock(), createBlock(_component_Tag, null, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  });
}
const EditorTag = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const definedMenus = [
  {
    name: "undo",
    type: "default",
    icon: "undo",
    title: "\u64A4\u9500"
  },
  {
    name: "redo",
    type: "default",
    icon: "redo",
    title: "\u91CD\u505A"
  },
  {
    name: "removeformat",
    type: "default",
    icon: "clear",
    title: "\u6E05\u9664\u683C\u5F0F"
  },
  {
    name: "indent",
    type: "select",
    icon: "indent-right",
    title: "\u7F29\u8FDB",
    list: [
      {
        label: "\u589E\u52A0\u7F29\u8FDB",
        value: "indent-right",
        icon: "indent-right"
      },
      {
        label: "\u51CF\u5C11\u7F29\u8FDB",
        value: "indent-left",
        icon: "indent-left"
      }
    ]
  },
  {
    name: "divider",
    type: "default",
    icon: "divider",
    title: "\u5206\u9694\u7EBF"
  },
  {
    name: "code",
    type: "default",
    icon: "code",
    title: "\u4EE3\u7801"
  },
  {
    name: "bold",
    type: "default",
    icon: "bold",
    title: "\u52A0\u7C97"
  },
  {
    name: "italic",
    type: "default",
    icon: "italic",
    title: "\u659C\u4F53"
  },
  {
    name: "underline",
    type: "default",
    icon: "underline",
    title: "\u4E0B\u5212\u7EBF"
  },
  {
    name: "strikethrough",
    type: "default",
    icon: "strikethrough",
    title: "\u5220\u9664\u7EBF"
  },
  {
    name: "subscript",
    type: "default",
    icon: "subscript",
    title: "\u4E0B\u6807"
  },
  {
    name: "superscript",
    type: "default",
    icon: "superscript",
    title: "\u4E0A\u6807"
  },
  {
    name: "title",
    type: "display",
    title: "\u6807\u9898",
    list: [
      {
        label: "\u4E00\u7EA7\u6807\u9898",
        value: "h1"
      },
      {
        label: "\u4E8C\u7EA7\u6807\u9898",
        value: "h2"
      },
      {
        label: "\u4E09\u7EA7\u6807\u9898",
        value: "h3"
      },
      {
        label: "\u56DB\u7EA7\u6807\u9898",
        value: "h4"
      },
      {
        label: "\u4E94\u7EA7\u6807\u9898",
        value: "h5"
      },
      {
        label: "\u6B63\u6587",
        value: "p"
      }
    ],
    value: "p"
  },
  {
    name: "fontfamily",
    type: "display",
    title: "\u5B57\u4F53",
    value: "",
    list: [
      {
        label: "\u9ED8\u8BA4\u5B57\u4F53",
        value: ""
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
    name: "fontsize",
    type: "display",
    title: "\u5B57\u53F7",
    value: "",
    list: [
      {
        label: "\u9ED8\u8BA4\u5B57\u53F7",
        value: ""
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
    name: "forecolor",
    type: "select",
    title: "\u6587\u5B57\u989C\u8272",
    icon: "color-picker",
    list: ["#000000", "#505050", "#808080", "#BBBBBB", "#CCCCCC", "#EEEEEE", "#F7F7F7", "#FFFFFF", "#EC1A0A", "#FF9900", "#FFFF00", "#07C160", "#00FFFF", "#0B73DE", "#9C00FF", "#FF00FF", "#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE", "#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD", "#e45649", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5", "#CE0000", "#E79439", "#EFC631", "#50a14f", "#4A7B8C", "#03A8F3", "#634AA5", "#A54A7B", "#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842", "#630000", "#7B3900", "#986801", "#295218", "#083139", "#003163", "#21104A", "#4A1031"]
  },
  {
    name: "backcolor",
    type: "select",
    title: "\u80CC\u666F\u989C\u8272",
    icon: "brush",
    list: ["#000000", "#505050", "#808080", "#BBBBBB", "#CCCCCC", "#EEEEEE", "#F7F7F7", "#FFFFFF", "#EC1A0A", "#FF9900", "#FFFF00", "#07C160", "#00FFFF", "#0B73DE", "#9C00FF", "#FF00FF", "#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE", "#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD", "#E76363", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5", "#CE0000", "#E79439", "#EFC631", "#6BA54A", "#4A7B8C", "#03A8F3", "#634AA5", "#A54A7B", "#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842", "#630000", "#7B3900", "#846300", "#295218", "#083139", "#003163", "#21104A", "#4A1031"]
  },
  {
    name: "ol",
    type: "default",
    icon: "ol",
    title: "\u6709\u5E8F\u5217\u8868"
  },
  {
    name: "ul",
    type: "default",
    icon: "ul",
    title: "\u65E0\u5E8F\u5217\u8868"
  },
  {
    name: "justify",
    type: "select",
    icon: "align-left",
    title: "\u5BF9\u9F50\u65B9\u5F0F",
    list: [
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
    ]
  },
  {
    name: "quote",
    type: "default",
    icon: "quote",
    title: "\u5F15\u7528"
  },
  {
    name: "link",
    type: "select",
    icon: "link",
    title: "\u63D2\u5165\u94FE\u63A5",
    props: {
      placeholder: ["\u8F93\u5165\u6587\u672C", "\u8F93\u5165\u5730\u5740"],
      targetText: "\u65B0\u7A97\u53E3\u6253\u5F00",
      removeText: "\u79FB\u9664\u94FE\u63A5",
      insertText: "\u63D2\u5165"
    }
  },
  {
    name: "image",
    icon: "image",
    title: "\u63D2\u5165\u56FE\u7247",
    type: "select",
    props: {
      placeholder: "\u56FE\u7247\u5730\u5740",
      insertText: "\u63D2\u5165"
    },
    list: [
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
    name: "video",
    icon: "video",
    title: "\u63D2\u5165\u89C6\u9891",
    type: "select",
    props: {
      placeholder: "\u89C6\u9891\u5730\u5740",
      insertText: "\u63D2\u5165"
    },
    list: [
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
    name: "table",
    type: "select",
    icon: "table-alt",
    title: "\u63D2\u5165\u8868\u683C",
    props: {
      insertRowText: "\u63D2\u5165\u884C",
      removeRowText: "\u5220\u9664\u884C",
      insertColumnText: "\u63D2\u5165\u5217",
      removeColumnText: "\u5220\u9664\u5217",
      deleteText: "\u5220\u9664\u8868\u683C"
    }
  },
  {
    name: "codeblock",
    type: "default",
    icon: "code-block",
    title: "\u4EE3\u7801\u5757"
  },
  {
    name: "codeview",
    type: "default",
    icon: "eye",
    title: "\u6E90\u7801\u89C6\u56FE"
  }
];
const editorMenu_vue_vue_type_style_index_0_scoped_db498b53_lang = "";
const getMenu = (name) => {
  if (name == "custom") {
    return null;
  }
  return definedMenus.find((item) => {
    return name == item.name;
  });
};
const getTableGrids = function() {
  const grids = [];
  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < 10; j++) {
      row.push({
        x: j + 1,
        y: i + 1,
        inside: false
      });
    }
    grids.push(row);
  }
  return grids;
};
const _sfc_main$4 = {
  name: "m-editor-menu",
  emits: ["custom"],
  props: {
    name: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: function(props) {
        const menu = getMenu(props.name);
        return menu ? menu.type : "default";
      },
      validator(value) {
        return ["default", "select", "display"].includes(value);
      }
    },
    icon: {
      type: [String, Object],
      default: function(props) {
        const menu = getMenu(props.name);
        return menu ? menu.icon : null;
      }
    },
    list: {
      type: Array,
      default: function(props) {
        const menu = getMenu(props.name);
        return menu ? menu.list || [] : [];
      }
    },
    title: {
      type: String,
      default: function(props) {
        const menu = getMenu(props.name);
        return menu ? menu.title : "";
      }
    },
    value: {
      type: [String, Number],
      default: function(props) {
        const menu = getMenu(props.name);
        return menu ? menu.value : null;
      }
    },
    props: {
      type: Object,
      default: function(props) {
        const menu = getMenu(props.name);
        return menu ? menu.props || {} : {};
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    customActive: {
      type: Function
    }
  },
  inject: ["menus"],
  data() {
    return {
      rangeUpdateTimer: null,
      defaultVal: {},
      selectedVal: {},
      layerShow: false,
      active: false,
      linkParams: {
        url: "",
        text: "",
        target: false,
        showText: true
      },
      mediaParams: {
        tabIndex: 0,
        remoteUrl: ""
      },
      tableParams: {
        size: [],
        grids: getTableGrids()
      }
    };
  },
  computed: {
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj$1.common.isObject(param)) {
          if (typeof param.spin == "boolean") {
            icon.spin = param.spin;
          }
          if (typeof param.type == "string") {
            icon.type = param.type;
          }
          if (typeof param.url == "string") {
            icon.url = param.url;
          }
          if (typeof param.color == "string") {
            icon.color = param.color;
          }
          if (typeof param.size == "string") {
            icon.size = param.size;
          }
        } else if (typeof param == "string") {
          icon.type = param;
        }
        return icon;
      };
    },
    parseList() {
      if (Array.isArray(this.list)) {
        return this.list.map((item) => {
          let obj2 = {};
          if (obj$1.common.isObject(item)) {
            obj2.label = item.label;
            obj2.value = item.value;
            obj2.icon = this.parseIcon(item.icon);
          } else if (typeof item == "string") {
            obj2.label = item;
            obj2.value = item;
            obj2.icon = this.parseIcon(null);
          }
          return obj2;
        });
      }
      return [];
    },
    cmpDisabled() {
      if (this.disabled) {
        return true;
      }
      if (this.menus.disabled) {
        return true;
      }
      if (!this.menus.instance) {
        return true;
      }
      if (this.menus.instance.disabled) {
        return true;
      }
      if (this.menus.instance.codeViewShow && this.name != "codeview") {
        return true;
      }
      if (!this.menus.instance.canUseMenus) {
        return true;
      }
      return false;
    },
    layerElTag() {
      return (item) => {
        if (this.name == "title") {
          return item.value;
        }
        return "div";
      };
    },
    activeColorStyle() {
      let style = {};
      if (this.cmpDisabled) {
        return style;
      }
      if (this.active) {
        style.opacity = 1;
        style.color = this.activeColor;
      }
      return style;
    },
    activeColor() {
      if (this.cmpDisabled) {
        return "";
      }
      if (this.menus.instance.activeColor) {
        return this.menus.instance.activeColor;
      }
      return "";
    },
    isDefinedMenu() {
      const menu = getMenu(this.name);
      return !!menu;
    },
    menuColorStyle() {
      return (item) => {
        let style = {};
        if (this.cmpDisabled) {
          return style;
        }
        if (this.selectedVal.value == item.value) {
          style.borderColor = this.activeColor;
        }
        return style;
      };
    },
    uploadOptions() {
      let options = {};
      if (this.cmpDisabled) {
        return options;
      }
      if (this.name == "image") {
        options = this.menus.combinedUploadImageProps;
      } else if (this.name == "video") {
        options = this.menus.combinedUploadVideoProps;
      }
      return {
        ...options,
        select: (files) => {
          if (this.menus.useBase64) {
            files.forEach((file2) => {
              obj$1.file.dataFileToBase64(file2).then((base64) => {
                if (this.name == "image") {
                  this.menus.instance.insertImage(base64);
                } else if (this.name == "video") {
                  this.menus.instance.insertVideo(base64);
                }
              });
            });
          } else {
            if (this.name == "image") {
              this.menus.$emit("upload-image", files);
            } else if (this.name == "video") {
              this.menus.$emit("upload-video", files);
            }
          }
          this.hideLayer();
        },
        error: (state, message, file2) => {
          if (this.name == "image") {
            if (typeof this.menus.uploadImageError == "function") {
              this.menus.uploadImageError(state, message, file2);
            } else {
              Msgbox.msgbox({
                message,
                animation: "scale"
              });
            }
          } else if (this.name == "video") {
            if (typeof this.menus.uploadVideoError == "function") {
              this.menus.uploadVideoError(state, message, file2);
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
    }
  },
  components: {
    Icon,
    Tooltip,
    Layer,
    Checkbox,
    Tabs,
    Tab,
    EditorTag
  },
  setup() {
    return {
      uid: getCurrentInstance().uid
    };
  },
  watch: {
    list: {
      handler: function(newVal) {
        if (newVal && this.type == "display") {
          if (this.value === null || this.value === void 0) {
            this.selectedVal = { ...this.parseList[0] };
            this.defaultVal = { ...this.parseList[0] };
          } else {
            this.selectedVal = this.parseList.find((item) => {
              return item.value == this.value;
            }) || { ...this.parseList[0] };
            this.defaultVal = this.parseList.find((item) => {
              return item.value == this.value;
            }) || { ...this.parseList[0] };
          }
        }
      },
      immediate: true
    }
  },
  mounted() {
    const unwatch = this.$watch("menus.instance", (instance) => {
      instance.editor.on("rangeUpdate", this.handleRangeUpdate);
      unwatch();
    });
  },
  methods: {
    beforeLayerShow() {
      if (this.name == "link") {
        this.linkParams = {
          url: "",
          text: "",
          target: false,
          showText: true
        };
        if (this.active) {
          this.linkParams.showText = false;
          const element2 = this.menus.instance.getCurrentParsedomElement("a");
          if (element2) {
            if (element2.hasChildren()) {
              const elements = AlexElement$1.flatElements(element2.children);
              let text = "";
              elements.forEach((el) => {
                if (el.isText()) {
                  text += el.textContent || "";
                }
              });
              this.linkParams.text = text;
            }
            if (element2.hasMarks()) {
              this.linkParams.url = element2.marks["href"] || "";
              this.linkParams.target = element2.marks["target"] == "_blank";
            }
          }
        } else {
          if (!this.menus.instance.editor.range.anchor.isEqual(this.menus.instance.editor.range.focus)) {
            let text = "";
            const elements = this.menus.instance.editor.getElementsByRange(true, true);
            elements.forEach((el) => {
              if (el.isText()) {
                text += el.textContent || "";
              }
            });
            this.linkParams.text = text;
            this.menus.instance.editor.formatElementStack();
          }
        }
      } else if (this.name == "image" || this.name == "video") {
        this.mediaParams.tabIndex = 0;
        this.mediaParams.remoteUrl = "";
        const elements = this.$el.querySelectorAll(".mvi-editor-menu-media-upload");
        if (elements.length) {
          for (let i = 0; i < elements.length; i++) {
            let upload = new Upload$1(elements[i], { ...this.uploadOptions });
            upload.init();
          }
        }
      }
    },
    tabChange() {
      this.$nextTick(() => {
        const elements = this.$el.querySelectorAll(".mvi-editor-menu-media-upload");
        if (elements.length) {
          for (let i = 0; i < elements.length; i++) {
            let upload = new Upload$1(elements[i], { ...this.uploadOptions });
            upload.init();
          }
        }
      });
    },
    inputFocus(event2) {
      event2.currentTarget.style.borderColor = this.activeColor;
    },
    inputBlur(event2) {
      event2.currentTarget.style.borderColor = "";
    },
    menuHover(type) {
      if (this.cmpDisabled) {
        return;
      }
      if (this.menus.trigger != "hover") {
        return;
      }
      if (type == "enter") {
        this.showLayer();
      } else if (type == "leave") {
        this.hideLayer();
      }
    },
    layerClick(item) {
      if (this.cmpDisabled) {
        return;
      }
      if (this.isDefinedMenu) {
        this.handleOpt(item);
      } else {
        this.$emit("custom", { ...item });
      }
      this.hideLayer();
    },
    menuClick() {
      if (this.cmpDisabled) {
        return;
      }
      if (this.type == "select" || this.type == "display") {
        if (this.menus.trigger == "click") {
          if (this.layerShow) {
            this.hideLayer();
          } else {
            this.showLayer();
          }
        }
      } else {
        if (this.isDefinedMenu) {
          this.handleOpt();
        } else {
          this.$emit("custom");
        }
      }
    },
    showLayer() {
      if (this.cmpDisabled) {
        return;
      }
      if (this.type == "select" || this.type == "display") {
        this.layerShow = true;
      }
    },
    hideLayer() {
      if (this.type == "select" || this.type == "display") {
        this.layerShow = false;
      }
    },
    handleOpt(item) {
      if (this.cmpDisabled) {
        return;
      }
      const editor = this.menus.instance.editor;
      if (this.name == "undo") {
        const historyRecord = editor.history.get(-1);
        if (historyRecord) {
          editor.stack = historyRecord.stack;
          editor.range = historyRecord.range;
          editor.formatElementStack();
          editor.domRender(true);
          editor.rangeRender();
        }
      } else if (this.name == "redo") {
        const historyRecord = editor.history.get(1);
        if (historyRecord) {
          editor.stack = historyRecord.stack;
          editor.range = historyRecord.range;
          editor.formatElementStack();
          editor.domRender(true);
          editor.rangeRender();
        }
      } else if (this.name == "removeformat") {
        editor.removeTextStyle();
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "indent") {
        if (item.value == "indent-right") {
          editor.setIndent();
        } else {
          editor.setOutdent();
        }
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "divider") {
        const divider = new AlexElement$1("closed", "hr", null, null, null);
        editor.insertElement(divider);
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "code") {
        if (this.active) {
          editor.removeTextMark(["data-code-style"]);
        } else {
          editor.setTextMark({
            "data-code-style": "mvi-editor-code"
          });
        }
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "bold") {
        if (this.active) {
          editor.removeTextStyle(["font-weight"]);
        } else {
          editor.setTextStyle({
            "font-weight": "bold"
          });
        }
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "italic") {
        if (this.active) {
          editor.removeTextStyle(["font-style"]);
        } else {
          editor.setTextStyle({
            "font-style": "italic"
          });
        }
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "underline") {
        if (this.active) {
          editor.removeTextStyle(["text-decoration-line", "text-decoration"]);
        } else {
          editor.setTextStyle({
            "text-decoration-line": "underline"
          });
        }
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "strikethrough") {
        if (this.active) {
          editor.removeTextStyle(["text-decoration-line", "text-decoration"]);
        } else {
          editor.setTextStyle({
            "text-decoration-line": "line-through"
          });
        }
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "subscript") {
        if (this.active) {
          editor.removeTextStyle(["vertical-align"]);
        } else {
          editor.setTextStyle({
            "vertical-align": "sub"
          });
        }
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "superscript") {
        if (this.active) {
          editor.removeTextStyle(["vertical-align"]);
        } else {
          editor.setTextStyle({
            "vertical-align": "super"
          });
        }
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "title") {
        if (editor.range.anchor.isEqual(editor.range.focus)) {
          const block2 = editor.range.anchor.element.getBlock();
          elementUtil.toParagraph(block2);
          block2.parsedom = item.value;
        } else {
          const elements = editor.getElementsByRange(true, false);
          elements.forEach((el) => {
            if (el.isBlock()) {
              elementUtil.toParagraph(el);
              el.parsedom = item.value;
            } else {
              const block2 = el.getBlock();
              elementUtil.toParagraph(block2);
              block2.parsedom = item.value;
            }
          });
        }
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "fontfamily") {
        editor.setTextStyle({
          "font-family": item.value
        });
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "fontsize") {
        editor.setTextStyle({
          "font-size": item.value
        });
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "forecolor") {
        editor.setTextStyle({
          color: item.value
        });
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "backcolor") {
        editor.setTextStyle({
          "background-color": item.value
        });
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "ol" || this.name == "ul") {
        this.insertList(this.name == "ol");
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "justify") {
        if (editor.range.anchor.isEqual(editor.range.focus)) {
          const block2 = editor.range.anchor.element.getBlock();
          const inblock2 = editor.range.anchor.element.getInblock();
          if (inblock2) {
            if (inblock2.hasStyles()) {
              inblock2.styles["text-align"] = item.value;
            } else {
              inblock2.styles = {
                "text-align": item.value
              };
            }
          } else {
            if (block2.hasStyles()) {
              block2.styles["text-align"] = item.value;
            } else {
              block2.styles = {
                "text-align": item.value
              };
            }
          }
        } else {
          const elements = editor.getElementsByRange(true, false);
          elements.forEach((el) => {
            if (el.isBlock() || el.isInblock()) {
              if (el.hasStyles()) {
                el.styles["text-align"] = item.value;
              } else {
                el.styles = {
                  "text-align": item.value
                };
              }
            } else {
              const block2 = el.getBlock();
              const inblock2 = el.getInblock();
              if (inblock2) {
                if (inblock2.hasStyles()) {
                  inblock2.styles["text-align"] = item.value;
                } else {
                  inblock2.styles = {
                    "text-align": item.value
                  };
                }
              } else {
                if (block2.hasStyles()) {
                  block2.styles["text-align"] = item.value;
                } else {
                  block2.styles = {
                    "text-align": item.value
                  };
                }
              }
            }
          });
        }
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "quote") {
        if (editor.range.anchor.isEqual(editor.range.focus)) {
          const block2 = editor.range.anchor.element.getBlock();
          elementUtil.toParagraph(block2);
          if (!this.active) {
            block2.parsedom = "blockquote";
          }
        } else {
          const elements = editor.getElementsByRange(true, false);
          elements.forEach((el) => {
            if (el.isBlock()) {
              elementUtil.toParagraph(el);
              if (!this.active) {
                el.parsedom = "blockquote";
              }
            } else {
              const block2 = el.getBlock();
              elementUtil.toParagraph(block2);
              if (!this.active) {
                block2.parsedom = "blockquote";
              }
            }
          });
        }
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "codeblock") {
        if (editor.range.anchor.isEqual(editor.range.focus)) {
          const block2 = editor.range.anchor.element.getBlock();
          elementUtil.toParagraph(block2);
          if (!this.active) {
            block2.parsedom = "pre";
          }
        } else {
          if (this.active) {
            const pre = editor.range.anchor.element.getBlock();
            elementUtil.toParagraph(pre);
          } else {
            let elements = editor.getElementsByRange(true, false);
            editor.range.anchor.moveToStart(elements[0].getBlock());
            editor.range.focus.moveToEnd(elements[elements.length - 1].getBlock());
            elements = editor.getElementsByRange(true, true).filter((el) => {
              return el.isText();
            });
            const obj2 = {};
            elements.forEach((el) => {
              if (obj2[el.getBlock().key]) {
                obj2[el.getBlock().key].push(el.clone());
              } else {
                obj2[el.getBlock().key] = [el.clone()];
              }
            });
            const pre = new AlexElement$1("block", "pre", null, null, null);
            Object.keys(obj2).forEach((key, index) => {
              if (index > 0) {
                const text = new AlexElement$1("text", null, null, null, "\n");
                if (pre.hasChildren()) {
                  editor.addElementTo(text, pre, pre.children.length);
                } else {
                  editor.addElementTo(text, pre);
                }
              }
              obj2[key].forEach((el) => {
                if (pre.hasChildren()) {
                  editor.addElementTo(el, pre, pre.children.length);
                } else {
                  editor.addElementTo(el, pre);
                }
              });
            });
            editor.delete();
            editor.insertElement(pre);
          }
        }
        editor.formatElementStack();
        editor.domRender();
        editor.rangeRender();
      } else if (this.name == "codeview") {
        this.menus.instance.codeViewShow = !this.menus.instance.codeViewShow;
      }
    },
    handleRangeUpdate() {
      if (this.cmpDisabled) {
        return;
      }
      if (this.rangeUpdateTimer) {
        clearTimeout(this.rangeUpdateTimer);
        this.rangeUpdateTimer = null;
      }
      this.rangeUpdateTimer = setTimeout(() => {
        const editor = this.menus.instance.editor;
        if (this.name == "code") {
          this.active = editor.queryTextMark("data-code-style");
          editor.formatElementStack();
        } else if (this.name == "bold") {
          this.active = editor.queryTextStyle("font-weight", "bold");
          editor.formatElementStack();
        } else if (this.name == "italic") {
          this.active = editor.queryTextStyle("font-style", "italic");
          editor.formatElementStack();
        } else if (this.name == "underline") {
          this.active = editor.queryTextStyle("text-decoration-line", "underline") || editor.queryTextStyle("text-decoration", "underline");
          editor.formatElementStack();
        } else if (this.name == "strikethrough") {
          this.active = editor.queryTextStyle("text-decoration-line", "line-through") || editor.queryTextStyle("text-decoration", "line-through");
          editor.formatElementStack();
        } else if (this.name == "subscript") {
          this.active = editor.queryTextStyle("vertical-align", "sub");
          editor.formatElementStack();
        } else if (this.name == "superscript") {
          this.active = editor.queryTextStyle("vertical-align", "super");
          editor.formatElementStack();
        } else if (this.name == "title") {
          if (editor.range.anchor.isEqual(editor.range.focus)) {
            this.selectedVal = this.parseList.find((item) => {
              return item.value == editor.range.anchor.element.getBlock().parsedom;
            }) || { ...this.defaultVal };
          } else {
            const elements = editor.getElementsByRange(true, false);
            this.selectedVal = this.parseList.find((item) => {
              return elements.every((el) => {
                if (el.isBlock()) {
                  return el.parsedom == item.value;
                }
                const block2 = el.getBlock();
                return block2.parsedom == item.value;
              });
            }) || { ...this.defaultVal };
            editor.formatElementStack();
          }
        } else if (this.name == "fontfamily") {
          this.selectedVal = this.parseList.find((item) => {
            return editor.queryTextStyle("font-family", item.value);
          }) || { ...this.defaultVal };
          editor.formatElementStack();
        } else if (this.name == "fontsize") {
          this.selectedVal = this.parseList.find((item) => {
            return editor.queryTextStyle("font-size", item.value);
          }) || { ...this.defaultVal };
          editor.formatElementStack();
        } else if (this.name == "forecolor") {
          this.selectedVal = this.parseList.find((item) => {
            return editor.queryTextStyle("color", item.value);
          }) || {};
          editor.formatElementStack();
        } else if (this.name == "backcolor") {
          this.selectedVal = this.parseList.find((item) => {
            return editor.queryTextStyle("background-color", item.value);
          }) || {};
          editor.formatElementStack();
        } else if (this.name == "ol" || this.name == "ul") {
          if (editor.range.anchor.isEqual(editor.range.focus)) {
            const block2 = editor.range.anchor.element.getBlock();
            this.active = elementUtil.isList(block2, this.name == "ol");
          } else {
            const elements = editor.getElementsByRange(true, false);
            this.active = elements.every((el) => {
              if (el.isBlock()) {
                return elementUtil.isList(el, this.name == "ol");
              } else {
                const block2 = el.getBlock();
                return elementUtil.isList(block2, this.name == "ol");
              }
            });
            editor.formatElementStack();
          }
        } else if (this.name == "justify") {
          if (editor.range.anchor.isEqual(editor.range.focus)) {
            const block2 = editor.range.anchor.element.getBlock();
            const inblock2 = editor.range.anchor.element.getInblock();
            if (inblock2) {
              this.selectedVal = this.parseList.find((item) => {
                return inblock2.hasStyles() && inblock2.styles["text-align"] == item.value;
              }) || {};
            } else {
              this.selectedVal = this.parseList.find((item) => {
                return block2.hasStyles() && block2.styles["text-align"] == item.value;
              }) || {};
            }
          } else {
            const elements = editor.getElementsByRange(true, false);
            this.selectedVal = this.parseList.find((item) => {
              return elements.every((el) => {
                if (el.isBlock() || el.isInblock()) {
                  return el.hasStyles() && el.styles["text-align"] == item.value;
                }
                const block2 = el.getBlock();
                const inblock2 = el.getInblock();
                if (inblock2) {
                  return inblock2.hasStyles() && inblock2.styles["text-align"] == item.value;
                }
                return block2.hasStyles() && block2.styles["text-align"] == item.value;
              });
            }) || {};
            editor.formatElementStack();
          }
        } else if (this.name == "quote") {
          if (editor.range.anchor.isEqual(editor.range.focus)) {
            const block2 = editor.range.anchor.element.getBlock();
            this.active = block2.parsedom == "blockquote";
          } else {
            const elements = editor.getElementsByRange(true, false);
            this.active = elements.every((el) => {
              if (el.isBlock()) {
                return el.parsedom == "blockquote";
              } else {
                const block2 = el.getBlock();
                return block2.parsedom == "blockquote";
              }
            });
            editor.formatElementStack();
          }
        } else if (this.name == "link") {
          const element2 = this.menus.instance.getCurrentParsedomElement("a");
          this.active = !!element2;
        } else if (this.name == "table") {
          const element2 = this.menus.instance.getCurrentParsedomElement("table");
          this.active = !!element2;
        } else if (this.name == "codeblock") {
          const element2 = this.menus.instance.getCurrentParsedomElement("pre");
          this.active = !!element2;
        } else if (!this.isDefinedMenu && typeof this.customActive == "function") {
          const obj2 = this.customActive.apply(this);
          if (this.type == "default") {
            this.active = obj2;
          } else {
            this.selectedVal = this.parseList.find((item) => {
              return item.value == obj2;
            }) || { ...this.defaultVal };
          }
        }
      }, 100);
    },
    insertList(ordered = false) {
      const editor = this.menus.instance.editor;
      if (editor.range.anchor.isEqual(editor.range.focus)) {
        const block2 = editor.range.anchor.element.getBlock();
        elementUtil.toParagraph(block2);
        if (!this.active) {
          elementUtil.toList(block2, ordered);
        }
      } else {
        const elements = this.menus.instance.editor.getElementsByRange(true, false);
        elements.forEach((el) => {
          if (el.isBlock()) {
            elementUtil.toParagraph(el);
            if (!this.active) {
              elementUtil.toList(el, ordered);
            }
          } else {
            const block2 = el.getBlock();
            elementUtil.toParagraph(block2);
            if (!this.active) {
              elementUtil.toList(block2, ordered);
            }
          }
        });
        this.menus.instance.editor.formatElementStack();
      }
    },
    insertLink() {
      if (this.cmpDisabled) {
        return;
      }
      if (!this.linkParams.url) {
        this.hideLayer();
        return;
      }
      if (this.active) {
        const element2 = this.menus.instance.getCurrentParsedomElement("a");
        element2.marks.href = this.linkParams.url;
        if (this.linkParams.target) {
          element2.marks.target = "_blank";
        } else {
          delete element2.marks.target;
        }
      } else {
        if (!this.linkParams.text) {
          this.linkParams.text = this.linkParams.url;
        }
        const marks = {
          href: this.linkParams.url
        };
        if (this.linkParams.target) {
          marks.target = "_blank";
        }
        const link = new AlexElement$1("inline", "a", marks, null, null);
        const text = new AlexElement$1("text", null, null, null, this.linkParams.text);
        this.menus.instance.editor.addElementTo(text, link);
        this.menus.instance.editor.insertElement(link);
      }
      this.menus.instance.editor.formatElementStack();
      this.menus.instance.editor.domRender();
      this.menus.instance.editor.rangeRender();
      this.hideLayer();
    },
    deleteLink() {
      if (this.cmpDisabled) {
        return;
      }
      const element2 = this.menus.instance.getCurrentParsedomElement("a");
      element2.parsedom = AlexElement$1.TEXT_NODE;
      delete element2.marks.target;
      delete element2.marks.href;
      this.menus.instance.editor.formatElementStack();
      this.menus.instance.editor.domRender();
      this.menus.instance.editor.rangeRender();
      this.hideLayer();
    },
    insertRemote() {
      if (this.cmpDisabled) {
        return;
      }
      if (!this.mediaParams.remoteUrl) {
        this.hideLayer();
        return;
      }
      if (this.name == "video") {
        const video = new AlexElement$1(
          "closed",
          "video",
          {
            src: this.mediaParams.remoteUrl
          },
          null,
          null
        );
        this.menus.instance.editor.insertElement(video);
      } else {
        const image = new AlexElement$1(
          "closed",
          "img",
          {
            src: this.mediaParams.remoteUrl
          },
          null,
          null
        );
        this.menus.instance.editor.insertElement(image);
      }
      this.menus.instance.editor.formatElementStack();
      this.menus.instance.editor.domRender();
      this.menus.instance.editor.rangeRender();
      this.hideLayer();
    },
    confirmTableSize() {
      if (this.cmpDisabled) {
        return;
      }
      const rowLength = this.tableParams.size[0];
      const colLength = this.tableParams.size[1];
      const table = new AlexElement$1("block", "table", null, null, null);
      const tbody = new AlexElement$1("inblock", "tbody", null, null, null);
      this.menus.instance.editor.addElementTo(tbody, table);
      for (let i = 0; i < rowLength; i++) {
        const row = new AlexElement$1("inblock", "tr", null, null, null);
        for (let j = 0; j < colLength; j++) {
          const column = new AlexElement$1("inblock", "td", null, null, null);
          const breakEl2 = new AlexElement$1("closed", "br", null, null, null);
          this.menus.instance.editor.addElementTo(breakEl2, column);
          this.menus.instance.editor.addElementTo(column, row);
        }
        this.menus.instance.editor.addElementTo(row, tbody);
      }
      this.menus.instance.editor.insertElement(table);
      const paragraph = new AlexElement$1("block", AlexElement$1.BLOCK_NODE, null, null, null);
      const breakEl = new AlexElement$1("closed", "br", null, null, null);
      this.menus.instance.editor.addElementTo(breakEl, paragraph);
      this.menus.instance.editor.addElementAfter(paragraph, table);
      this.menus.instance.editor.formatElementStack();
      this.menus.instance.editor.range.anchor.moveToStart(tbody);
      this.menus.instance.editor.range.focus.moveToStart(tbody);
      this.menus.instance.editor.domRender();
      this.menus.instance.editor.rangeRender();
      this.hideLayer();
    },
    changeTableSize(data2) {
      if (this.cmpDisabled) {
        return;
      }
      this.tableParams.size = [data2.x, data2.y];
      for (let i in this.tableParams.grids) {
        const grid = this.tableParams.grids[i];
        for (let j in grid) {
          if (grid[j].x <= data2.x && grid[j].y <= data2.y) {
            this.tableParams.grids[i][j].inside = true;
          } else {
            this.tableParams.grids[i][j].inside = false;
          }
        }
      }
    },
    addTableRow() {
      if (this.cmpDisabled) {
        return;
      }
      if (!this.menus.instance.editor.range.anchor.isEqual(this.menus.instance.editor.range.focus)) {
        this.menus.instance.editor.range.anchor.element = this.menus.instance.editor.range.focus.element;
        this.menus.instance.editor.range.anchor.offset = this.menus.instance.editor.range.focus.offset;
      }
      const row = this.menus.instance.getCurrentParsedomElement("tr");
      const newRow = row.clone();
      newRow.children.forEach((column) => {
        column.children = [];
        const breakEl = new AlexElement$1("closed", "br", null, null, null);
        this.menus.instance.editor.addElementTo(breakEl, column);
      });
      this.menus.instance.editor.addElementAfter(newRow, row);
      this.menus.instance.editor.formatElementStack();
      this.menus.instance.editor.range.anchor.moveToStart(newRow);
      this.menus.instance.editor.range.focus.moveToStart(newRow);
      this.menus.instance.editor.domRender();
      this.menus.instance.editor.rangeRender();
      this.hideLayer();
    },
    removeTableRow() {
      if (this.cmpDisabled) {
        return;
      }
      if (!this.menus.instance.editor.range.anchor.isEqual(this.menus.instance.editor.range.focus)) {
        this.menus.instance.editor.range.anchor.element = this.menus.instance.editor.range.focus.element;
        this.menus.instance.editor.range.anchor.offset = this.menus.instance.editor.range.focus.offset;
      }
      const row = this.menus.instance.getCurrentParsedomElement("tr");
      const parent = row.parent;
      if (parent.children.length == 1) {
        this.deleteTable();
        return;
      }
      const previousRow = this.menus.instance.editor.getPreviousElement(row);
      const nextRow = this.menus.instance.editor.getNextElement(row);
      row.toEmpty();
      this.menus.instance.editor.formatElementStack();
      if (previousRow) {
        this.menus.instance.editor.range.anchor.moveToEnd(previousRow.children[0]);
        this.menus.instance.editor.range.focus.moveToEnd(previousRow.children[0]);
      } else {
        this.menus.instance.editor.range.anchor.moveToEnd(nextRow.children[0]);
        this.menus.instance.editor.range.focus.moveToEnd(nextRow.children[0]);
      }
      this.menus.instance.editor.domRender();
      this.menus.instance.editor.rangeRender();
      this.hideLayer();
    },
    addTableColumn() {
      if (this.cmpDisabled) {
        return;
      }
      if (!this.menus.instance.editor.range.anchor.isEqual(this.menus.instance.editor.range.focus)) {
        this.menus.instance.editor.range.anchor.element = this.menus.instance.editor.range.focus.element;
        this.menus.instance.editor.range.anchor.offset = this.menus.instance.editor.range.focus.offset;
      }
      const column = this.menus.instance.getCurrentParsedomElement("td");
      const tbody = this.menus.instance.getCurrentParsedomElement("tbody");
      const rows = tbody.children;
      const index = column.parent.children.findIndex((item) => {
        return item.isEqual(column);
      });
      rows.forEach((row) => {
        const newColumn = column.clone(false);
        const breakEl = new AlexElement$1("closed", "br", null, null, null);
        this.menus.instance.editor.addElementTo(breakEl, newColumn);
        this.menus.instance.editor.addElementTo(newColumn, row, index + 1);
      });
      this.menus.instance.editor.formatElementStack();
      const nextColumn = this.menus.instance.editor.getNextElement(column);
      this.menus.instance.editor.range.anchor.moveToStart(nextColumn);
      this.menus.instance.editor.range.focus.moveToStart(nextColumn);
      this.menus.instance.editor.domRender();
      this.menus.instance.editor.rangeRender();
      this.hideLayer();
    },
    removeTableColumn() {
      if (this.cmpDisabled) {
        return;
      }
      if (!this.menus.instance.editor.range.anchor.isEqual(this.menus.instance.editor.range.focus)) {
        this.menus.instance.editor.range.anchor.element = this.menus.instance.editor.range.focus.element;
        this.menus.instance.editor.range.anchor.offset = this.menus.instance.editor.range.focus.offset;
      }
      const column = this.menus.instance.getCurrentParsedomElement("td");
      const tbody = this.menus.instance.getCurrentParsedomElement("tbody");
      const rows = tbody.children;
      const parent = column.parent;
      if (parent.children.length == 1) {
        this.deleteTable();
        return;
      }
      const previousColumn = this.menus.instance.editor.getPreviousElement(column);
      const nextColumn = this.menus.instance.editor.getNextElement(column);
      const index = column.parent.children.findIndex((item) => {
        return item.isEqual(column);
      });
      rows.forEach((row) => {
        row.children[index].toEmpty();
      });
      this.menus.instance.editor.formatElementStack();
      if (previousColumn) {
        this.menus.instance.editor.range.anchor.moveToEnd(previousColumn);
        this.menus.instance.editor.range.focus.moveToEnd(previousColumn);
      } else {
        this.menus.instance.editor.range.anchor.moveToEnd(nextColumn);
        this.menus.instance.editor.range.focus.moveToEnd(nextColumn);
      }
      this.menus.instance.editor.domRender();
      this.menus.instance.editor.rangeRender();
      this.hideLayer();
    },
    deleteTable() {
      if (this.cmpDisabled) {
        return;
      }
      if (!this.menus.instance.editor.range.anchor.isEqual(this.menus.instance.editor.range.focus)) {
        this.menus.instance.editor.range.anchor.element = this.menus.instance.editor.range.focus.element;
        this.menus.instance.editor.range.anchor.offset = this.menus.instance.editor.range.focus.offset;
      }
      const table = this.menus.instance.getCurrentParsedomElement("table");
      table.toEmpty();
      this.menus.instance.editor.formatElementStack();
      this.menus.instance.editor.domRender();
      this.menus.instance.editor.rangeRender();
      this.hideLayer();
    }
  }
};
const _hoisted_1$1 = ["data-id"];
const _hoisted_2$1 = ["disabled", "data-id"];
const _hoisted_3 = {
  key: 0,
  class: "mvi-editor-menu-text"
};
const _hoisted_4 = {
  key: 0,
  class: "mvi-editor-menu-colors"
};
const _hoisted_5 = ["onClick"];
const _hoisted_6 = {
  key: 1,
  class: "mvi-editor-menu-table"
};
const _hoisted_7 = { class: "mvi-editor-menu-table-operations" };
const _hoisted_8 = { class: "mvi-editor-menu-table-footer" };
const _hoisted_9 = { class: "mvi-editor-menu-table-grids" };
const _hoisted_10 = ["onMouseenter"];
const _hoisted_11 = {
  key: 0,
  class: "mvi-editor-menu-table-size"
};
const _hoisted_12 = {
  key: 2,
  class: "mvi-editor-menu-link"
};
const _hoisted_13 = ["disabled", "placeholder"];
const _hoisted_14 = ["placeholder"];
const _hoisted_15 = { class: "mvi-editor-menu-link-footer" };
const _hoisted_16 = { class: "mvi-editor-menu-link-operation" };
const _hoisted_17 = {
  key: 3,
  class: "mvi-editor-menu-media"
};
const _hoisted_18 = {
  key: 0,
  class: "mvi-editor-menu-media-upload"
};
const _hoisted_19 = {
  key: 1,
  class: "mvi-editor-menu-media-remote"
};
const _hoisted_20 = ["placeholder"];
const _hoisted_21 = {
  key: 4,
  class: "mvi-editor-menu-default"
};
const _hoisted_22 = ["textContent"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Tooltip = resolveComponent("Tooltip");
  const _component_Checkbox = resolveComponent("Checkbox");
  const _component_Tab = resolveComponent("Tab");
  const _component_Tabs = resolveComponent("Tabs");
  const _component_EditorTag = resolveComponent("EditorTag");
  const _component_Layer = resolveComponent("Layer");
  return openBlock(), createElementBlock("div", {
    class: "mvi-editor-menu",
    "data-id": `mvi-editor-menu-${$setup.uid}`,
    onMouseenter: _cache[22] || (_cache[22] = ($event) => $options.menuHover("enter")),
    onMouseleave: _cache[23] || (_cache[23] = ($event) => $options.menuHover("leave"))
  }, [
    createVNode(_component_Tooltip, {
      disabled: !$options.menus.useTooltip || !$props.title || $options.cmpDisabled,
      title: $props.title,
      trigger: "hover",
      placement: $options.menus.combinedTooltipProps.placement,
      timeout: $options.menus.combinedTooltipProps.timeout,
      color: $options.menus.combinedTooltipProps.color,
      "text-color": $options.menus.combinedTooltipProps.textColor,
      "border-color": $options.menus.combinedTooltipProps.borderColor,
      offset: $options.menus.combinedTooltipProps.offset,
      "z-index": $options.menus.combinedTooltipProps.zIndex,
      fixed: $options.menus.combinedTooltipProps.fixed,
      "fixed-auto": $options.menus.combinedTooltipProps.fixedAuto,
      width: $options.menus.combinedTooltipProps.width,
      animation: $options.menus.combinedTooltipProps.animation,
      "show-triangle": $options.menus.combinedTooltipProps.showTriangle,
      block: ""
    }, {
      default: withCtx(() => [
        createElementVNode("div", {
          disabled: $options.cmpDisabled || null,
          class: "mvi-editor-menu-el",
          "data-id": `mvi-editor-menu-el-${$setup.uid}`,
          onClick: _cache[0] || (_cache[0] = (...args) => $options.menuClick && $options.menuClick(...args)),
          style: normalizeStyle($options.activeColorStyle)
        }, [
          $props.type == "display" ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString($data.selectedVal.label), 1)) : $options.parseIcon($props.icon).type || $options.parseIcon($props.icon).url ? (openBlock(), createBlock(_component_Icon, {
            key: 1,
            type: $options.parseIcon($props.icon).type,
            url: $options.parseIcon($props.icon).url,
            size: $options.parseIcon($props.icon).size,
            color: $options.parseIcon($props.icon).color,
            spin: $options.parseIcon($props.icon).spin
          }, null, 8, ["type", "url", "size", "color", "spin"])) : createCommentVNode("", true),
          $props.type == "select" || $props.type == "display" ? (openBlock(), createBlock(_component_Icon, {
            key: 2,
            type: "caret-down",
            class: "mvi-editor-menu-caret"
          })) : createCommentVNode("", true)
        ], 12, _hoisted_2$1)
      ]),
      _: 1
    }, 8, ["disabled", "title", "placement", "timeout", "color", "text-color", "border-color", "offset", "z-index", "fixed", "fixed-auto", "width", "animation", "show-triangle"]),
    $props.type == "select" || $props.type == "display" ? (openBlock(), createBlock(_component_Layer, {
      key: 0,
      modelValue: $data.layerShow,
      "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $data.layerShow = $event),
      ref: "layer",
      placement: $options.menus.combinedLayerProps.placement,
      "z-index": $options.menus.combinedLayerProps.zIndex,
      fixed: $options.menus.combinedLayerProps.fixed,
      "fixed-auto": $options.menus.combinedLayerProps.fixedAuto,
      offset: $options.menus.combinedLayerProps.offset,
      "wrapper-class": $options.menus.combinedLayerProps.wrapperClass,
      timeout: $options.menus.combinedLayerProps.timeout,
      "show-triangle": $options.menus.combinedLayerProps.showTriangle,
      animation: $options.menus.combinedLayerProps.animation,
      shadow: $options.menus.combinedLayerProps.shadow,
      border: $options.menus.combinedLayerProps.border,
      width: $options.menus.combinedLayerProps.width,
      closable: $options.menus.trigger == "click",
      target: `[data-id='mvi-editor-menu-el-${$setup.uid}']`,
      root: `[data-id='mvi-editor-menu-${$setup.uid}']`,
      onShowing: $options.beforeLayerShow
    }, {
      default: withCtx(() => [
        _ctx.$slots.layer ? renderSlot(_ctx.$slots, "layer", { key: 0 }, void 0, true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          $props.name == "forecolor" || $props.name == "backcolor" ? (openBlock(), createElementBlock("div", _hoisted_4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($options.parseList, (item) => {
              return openBlock(), createElementBlock("div", {
                class: "mvi-editor-menu-color",
                style: normalizeStyle($options.menuColorStyle(item))
              }, [
                createVNode(_component_Tooltip, {
                  disabled: !$options.menus.useTooltip || !item.label || $options.cmpDisabled,
                  trigger: "hover",
                  title: item.label,
                  placement: $options.menus.combinedTooltipProps.placement,
                  timeout: $options.menus.combinedTooltipProps.timeout,
                  color: $options.menus.combinedTooltipProps.color,
                  "text-color": $options.menus.combinedTooltipProps.textColor,
                  "border-color": $options.menus.combinedTooltipProps.borderColor,
                  offset: $options.menus.combinedTooltipProps.offset,
                  "z-index": $options.menus.combinedTooltipProps.zIndex,
                  fixed: $options.menus.combinedTooltipProps.fixed,
                  "fixed-auto": $options.menus.combinedTooltipProps.fixedAuto,
                  width: $options.menus.combinedTooltipProps.width,
                  animation: $options.menus.combinedTooltipProps.animation,
                  "show-triangle": $options.menus.combinedTooltipProps.showTriangle,
                  block: ""
                }, {
                  default: withCtx(() => [
                    createElementVNode("div", {
                      style: normalizeStyle({ backgroundColor: item.value }),
                      onClick: ($event) => $options.layerClick(item),
                      class: "mvi-editor-menu-color-el"
                    }, null, 12, _hoisted_5)
                  ]),
                  _: 2
                }, 1032, ["disabled", "title", "placement", "timeout", "color", "text-color", "border-color", "offset", "z-index", "fixed", "fixed-auto", "width", "animation", "show-triangle"])
              ], 4);
            }), 256))
          ])) : $props.name == "table" ? (openBlock(), createElementBlock("div", _hoisted_6, [
            $data.active ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createElementVNode("div", _hoisted_7, [
                createElementVNode("div", {
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.addTableRow && $options.addTableRow(...args)),
                  style: normalizeStyle({ color: $options.activeColor }),
                  class: "mvi-editor-menu-table-operation"
                }, toDisplayString($props.props.insertRowText), 5),
                createElementVNode("div", {
                  onClick: _cache[2] || (_cache[2] = (...args) => $options.removeTableRow && $options.removeTableRow(...args)),
                  class: "mvi-editor-menu-table-operation"
                }, toDisplayString($props.props.removeRowText), 1),
                createElementVNode("div", {
                  onClick: _cache[3] || (_cache[3] = (...args) => $options.addTableColumn && $options.addTableColumn(...args)),
                  style: normalizeStyle({ color: $options.activeColor }),
                  class: "mvi-editor-menu-table-operation"
                }, toDisplayString($props.props.insertColumnText), 5),
                createElementVNode("div", {
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.removeTableColumn && $options.removeTableColumn(...args)),
                  class: "mvi-editor-menu-table-operation"
                }, toDisplayString($props.props.removeColumnText), 1)
              ]),
              createElementVNode("div", _hoisted_8, [
                createElementVNode("span", {
                  onClick: _cache[5] || (_cache[5] = (...args) => $options.deleteTable && $options.deleteTable(...args))
                }, toDisplayString($props.props.deleteText), 1)
              ])
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList($data.tableParams.grids, (item) => {
                return openBlock(), createElementBlock("div", _hoisted_9, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(item, (el) => {
                    return openBlock(), createElementBlock("div", {
                      onClick: _cache[6] || (_cache[6] = (...args) => $options.confirmTableSize && $options.confirmTableSize(...args)),
                      onMouseenter: ($event) => $options.changeTableSize(el),
                      class: normalizeClass(["mvi-editor-menu-table-grid", el.inside ? "active" : ""])
                    }, null, 42, _hoisted_10);
                  }), 256))
                ]);
              }), 256)),
              $data.tableParams.size.length ? (openBlock(), createElementBlock("div", _hoisted_11, toDisplayString($data.tableParams.size[0]) + " \xD7 " + toDisplayString($data.tableParams.size[1]), 1)) : createCommentVNode("", true)
            ], 64))
          ])) : $props.name == "link" ? (openBlock(), createElementBlock("div", _hoisted_12, [
            withDirectives(createElementVNode("input", {
              disabled: !$data.linkParams.showText || null,
              ref: "linkText",
              onFocus: _cache[7] || (_cache[7] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
              onBlur: _cache[8] || (_cache[8] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.linkParams.text = $event),
              placeholder: $props.props.placeholder[0],
              type: "text"
            }, null, 40, _hoisted_13), [
              [
                vModelText,
                $data.linkParams.text,
                void 0,
                { trim: true }
              ]
            ]),
            withDirectives(createElementVNode("input", {
              ref: "linkUrl",
              onFocus: _cache[10] || (_cache[10] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
              onBlur: _cache[11] || (_cache[11] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
              "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.linkParams.url = $event),
              placeholder: $props.props.placeholder[1],
              type: "text"
            }, null, 40, _hoisted_14), [
              [
                vModelText,
                $data.linkParams.url,
                void 0,
                { trim: true }
              ]
            ]),
            createElementVNode("div", _hoisted_15, [
              createVNode(_component_Checkbox, {
                label: $props.props.targetText,
                "label-placement": "right",
                icon: { size: "0.24rem" },
                "label-size": "0.28rem",
                "label-color": "#505050",
                "fill-color": $options.activeColor,
                modelValue: $data.linkParams.target,
                "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $data.linkParams.target = $event)
              }, null, 8, ["label", "fill-color", "modelValue"]),
              createElementVNode("div", _hoisted_16, [
                !$data.linkParams.showText ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: "mvi-editor-menu-link-delete",
                  onClick: _cache[14] || (_cache[14] = (...args) => $options.deleteLink && $options.deleteLink(...args))
                }, toDisplayString($props.props.removeText), 1)) : createCommentVNode("", true),
                createElementVNode("span", {
                  class: "mvi-editor-menu-link-insert",
                  style: normalizeStyle({ color: $options.activeColor }),
                  onClick: _cache[15] || (_cache[15] = (...args) => $options.insertLink && $options.insertLink(...args))
                }, toDisplayString($props.props.insertText), 5)
              ])
            ])
          ])) : $props.name == "image" || $props.name == "video" ? (openBlock(), createElementBlock("div", _hoisted_17, [
            createVNode(_component_Tabs, {
              onChange: $options.tabChange,
              modelValue: $data.mediaParams.tabIndex,
              "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => $data.mediaParams.tabIndex = $event),
              flex: "flex-start",
              offset: "0.4rem",
              "active-color": $options.activeColor,
              "inactive-color": "#808080"
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList($options.parseList, (item) => {
                  return openBlock(), createBlock(_component_Tab, {
                    title: item.label
                  }, {
                    default: withCtx(() => [
                      item.value == "upload" ? (openBlock(), createElementBlock("div", _hoisted_18, [
                        createVNode(_component_Icon, { type: "upload-square" })
                      ])) : item.value == "remote" ? (openBlock(), createElementBlock("div", _hoisted_19, [
                        withDirectives(createElementVNode("input", {
                          onFocus: _cache[16] || (_cache[16] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
                          onBlur: _cache[17] || (_cache[17] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
                          "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => $data.mediaParams.remoteUrl = $event),
                          placeholder: $props.props.placeholder,
                          type: "text"
                        }, null, 40, _hoisted_20), [
                          [
                            vModelText,
                            $data.mediaParams.remoteUrl,
                            void 0,
                            { trim: true }
                          ]
                        ]),
                        createElementVNode("div", {
                          class: "mvi-editor-menu-media-insert",
                          style: normalizeStyle({ color: $options.activeColor }),
                          onClick: _cache[19] || (_cache[19] = (...args) => $options.insertRemote && $options.insertRemote(...args))
                        }, toDisplayString($props.props.insertText), 5)
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["title"]);
                }), 256))
              ]),
              _: 1
            }, 8, ["onChange", "modelValue", "active-color"])
          ])) : (openBlock(), createElementBlock("div", _hoisted_21, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($options.parseList, (item) => {
              return openBlock(), createBlock(_component_EditorTag, {
                tag: $options.layerElTag(item),
                class: normalizeClass(["mvi-editor-menu-layer-el", $data.selectedVal.value == item.value ? "active" : ""]),
                onClick: ($event) => $options.layerClick(item)
              }, {
                default: withCtx(() => [
                  item.icon.type || item.icon.url ? (openBlock(), createBlock(_component_Icon, {
                    key: 0,
                    class: "mvi-editor-menu-layer-icon",
                    type: item.icon.type,
                    url: item.icon.url,
                    spin: item.icon.spin,
                    size: item.icon.size,
                    color: item.icon.color
                  }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
                  createElementVNode("span", {
                    textContent: toDisplayString(item.label)
                  }, null, 8, _hoisted_22)
                ]),
                _: 2
              }, 1032, ["tag", "class", "onClick"]);
            }), 256))
          ]))
        ], 64))
      ]),
      _: 3
    }, 8, ["modelValue", "placement", "z-index", "fixed", "fixed-auto", "offset", "wrapper-class", "timeout", "show-triangle", "animation", "shadow", "border", "width", "closable", "target", "root", "onShowing"])) : createCommentVNode("", true)
  ], 40, _hoisted_1$1);
}
const EditorMenu = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-db498b53"]]);
EditorMenu.install = (app) => {
  app.component(EditorMenu.name, EditorMenu);
};
const row_vue_vue_type_style_index_0_scoped_3f4f3a9a_lang = "";
const _sfc_main$3 = {
  name: "m-row",
  props: {
    justify: {
      type: String,
      default: "flex-start",
      validator(value) {
        return ["flex-start", "flex-end", "space-around", "space-between"].includes(value);
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
const Row = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-3f4f3a9a"]]);
Row.install = (app) => {
  app.component(Row.name, Row);
};
const col_vue_vue_type_style_index_0_scoped_7098c473_lang = "";
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
      if (obj$1.common.isObject(this.xs)) {
        if (obj$1.number.isNumber(this.xs.span)) {
          cls.push("mvi-col-xs-" + this.xs.span);
        }
        if (obj$1.number.isNumber(this.xs.offset)) {
          cls.push("mvi-col-offset-xs-" + this.xs.offset);
        }
      } else if (obj$1.number.isNumber(this.xs)) {
        cls.push("mvi-col-xs-" + this.xs);
      }
      if (obj$1.common.isObject(this.sm)) {
        if (obj$1.number.isNumber(this.sm.span)) {
          cls.push("mvi-col-sm-" + this.sm.span);
        }
        if (obj$1.number.isNumber(this.sm.offset)) {
          cls.push("mvi-col-offset-sm-" + this.sm.offset);
        }
      } else if (obj$1.number.isNumber(this.sm)) {
        cls.push("mvi-col-sm-" + this.sm);
      }
      if (obj$1.common.isObject(this.md)) {
        if (obj$1.number.isNumber(this.md.span)) {
          cls.push("mvi-col-md-" + this.md.span);
        }
        if (obj$1.number.isNumber(this.md.offset)) {
          cls.push("mvi-col-offset-md-" + this.md.offset);
        }
      } else if (obj$1.number.isNumber(this.md)) {
        cls.push("mvi-col-md-" + this.md);
      }
      if (obj$1.common.isObject(this.lg)) {
        if (obj$1.number.isNumber(this.lg.span)) {
          cls.push("mvi-col-lg-" + this.lg.span);
        }
        if (obj$1.number.isNumber(this.lg.offset)) {
          cls.push("mvi-col-offset-lg-" + this.lg.offset);
        }
      } else if (obj$1.number.isNumber(this.lg)) {
        cls.push("mvi-col-lg-" + this.lg);
      }
      if (obj$1.common.isObject(this.xl)) {
        if (obj$1.number.isNumber(this.xl.span)) {
          cls.push("mvi-col-xl-" + this.xl.span);
        }
        if (obj$1.number.isNumber(this.xl.offset)) {
          cls.push("mvi-col-offset-xl-" + this.xl.offset);
        }
      } else if (obj$1.number.isNumber(this.xl)) {
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
const Col = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-7098c473"]]);
Col.install = (app) => {
  app.component(Col.name, Col);
};
const form_vue_vue_type_style_index_0_scoped_82e0bcdd_lang = "";
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
const Form = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-82e0bcdd"]]);
Form.install = (app) => {
  app.component(Form.name, Form);
};
const formEl_vue_vue_type_style_index_0_scoped_7972d674_lang = "";
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
const FormEl = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7972d674"]]);
FormEl.install = (app) => {
  app.component(FormEl.name, FormEl);
};
const install = (app) => {
  const components = {
    Dap: obj$1,
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
    EditorMenu,
    Row,
    Col,
    Form,
    FormEl
  };
  Object.values(components).map((component) => {
    component.install(app);
  });
};
const version = "2.0.0";
const stdin_default = {
  install,
  version
};
export {
  Actionsheet,
  AlexElement$1 as AlexElement,
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
  obj$1 as Dap,
  DateChooser,
  DateNativePicker,
  DatePicker,
  Dialog,
  Divider,
  Drag$1 as Drag,
  Dropdown,
  Editor,
  definedMenus as EditorDefinedMenuConfig,
  EditorMenu,
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
