var __defProp = Object.defineProperty;
var __defNormalProp = (obj2, key, value) => key in obj2 ? __defProp(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __publicField = (obj2, key, value) => {
  __defNormalProp(obj2, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot, toDisplayString, createCommentVNode, h, useSlots, createBlock, unref, withCtx, Fragment, createVNode, createElementVNode, getCurrentInstance, ref, watch, onMounted, onBeforeUnmount, Teleport, Transition, withDirectives, mergeProps, vShow, nextTick, vModelText, vModelDynamic, renderList, createStaticVNode, pushScopeId, popScopeId, createApp, inject, provide, withModifiers, withKeys, createSlots, createTextVNode, reactive, cloneVNode } from "vue";
const number = {
  /**
   * 数字格式化
   * @param {Number} num
   */
  formatNumber(num) {
    if (this.isNumber(num)) {
      return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    } else {
      return num;
    }
  },
  /**
   * 判断是否数字
   * @param {Object} num
   */
  isNumber(num) {
    if (typeof num == "number" && !isNaN(num)) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 多个数的加法运算
   */
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
  /**
   * 多个数的减法运算
   */
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
  /**
   * 多个数的乘法运算
   */
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
  /**
   * 多个数的除法运算
   */
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
  /**
   * 向指定位置插入字符串
   * @param {Object} original 原始字符串
   * @param {Object} str 插入的字符串
   * @param {Object} index 插入的位置
   */
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
  /**
   * 删除指定位置的字符串
   * @param {Object} original 原始字符串
   * @param {Object} index 删除的位置序列
   * @param {Object} num 删除的字符串长度
   */
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
  /**
   * 替换指定位置的字符串
   * @param {Object} original 原始字符串
   * @param {Object} start 开始位置
   * @param {Object} end 结束位置
   * @param {Object} str 替换的字符串
   */
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
  /**
   * 去除字符串空格
   * @param {Object} str 原始字符串
   * @param {Object} global 为true时去除所有空格，否则只去除两边空格
   */
  trim(str, global2 = false) {
    if (typeof str != "string") {
      throw new TypeError("The first argument must be a string");
    }
    let result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (global2) {
      result = result.replace(/\s/g, "");
    }
    return result;
  }
};
const element = {
  /**
   * 判断是否是Window对象
   * @param {Object} data 入参
   */
  isWindow(data2) {
    return data2 && data2 instanceof Window;
  },
  /**
   * 获取元素距离某个定位祖先元素左侧/顶部/底部/右侧的距离
   * @param {Object} el 元素
   * @param {Object} root 定位父元素或者祖先元素，未指定则为document.body
   */
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
  /**
   * 判断某个元素是否包含指定元素，包含相等关系和父子关系
   * @param {Object} parentNode 父元素或祖先元素
   * @param {Object} childNode 子元素
   */
  isContains(parentNode, childNode) {
    if (!this.isElement(parentNode)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!this.isElement(childNode)) {
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
  /**
   * 判断某个元素是否是指定元素的父元素
   * @param {Object} parentNode 父元素
   * @param {Object} childNode 子元素
   */
  isParentNode(parentNode, childNode) {
    if (!this.isElement(parentNode)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!this.isElement(childNode)) {
      throw new TypeError("The second argument must be an element");
    }
    if (parentNode === childNode) {
      return false;
    }
    return childNode.parentNode === parentNode;
  },
  /**
   * 查找某个元素下指定选择器的子元素
   * @param {Object} el 元素
   * @param {Object} selector 支持多选择器，等同于querySelectorAll的参数
   */
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
  /**
   * 查找某个元素下指定选择器的兄弟元素
   * @param {Object} el 元素
   * @param {Object} selector 取值等同于queryselectorAll的参数，支持多选择器
   */
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
  /**
   * rem与px单位转换
   * @param {Object} num rem数值
   */
  rem2px(num) {
    if (!number.isNumber(num)) {
      throw new TypeError("The argument must be a number");
    }
    let fs = this.getCssStyle(document.documentElement, "font-size");
    return number.mutiply(num, parseFloat(fs));
  },
  /**
   * rem与px单位转换
   * @param {Object} num px数值
   */
  px2rem(num) {
    if (!number.isNumber(num)) {
      throw new TypeError("The argument must be a number");
    }
    let fs = this.getCssStyle(document.documentElement, "font-size");
    return number.divide(num, parseFloat(fs));
  },
  /**
   * 获取元素的内容宽度，内容宽度不包括border和padding
   * @param {Object} el 支持css选择器字符串，未指定则表示document.body
   */
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
  /**
   * 获取元素的内容高度，内容高度不包括border和padding
   * @param {Object} el 支持css选择器字符串 未指定则表示document.body
   */
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
  /**
   * 移除class
   * @param {Object} el 元素
   * @param {Object} className 支持多类,以空格划分
   */
  removeClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string.trim(className).split(/\s+/);
    classArray.forEach((item) => {
      classList.remove(item);
    });
  },
  /**
   * 添加class
   * @param {Object} el 元素
   * @param {Object} className 支持多类,以空格划分
   */
  addClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string.trim(className).split(/\s+/);
    classArray.forEach((item) => {
      classList.add(item);
    });
  },
  /**
   * 判断指定元素是否含有指定类名
   * @param {Object} el 元素
   * @param {Object} className 支持多类,以空格划分
   */
  hasClass(el, className) {
    if (!this.isElement(el)) {
      throw new TypeError("The first argument must be an element");
    }
    if (!className || typeof className != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let classList = el.classList;
    let classArray = string.trim(className).split(/\s+/);
    return classArray.every((item) => {
      return classList.contains(item);
    });
  },
  /**
   * 监听元素滚动到顶部或者底部
   * @param {Object} el 支持css选择器字符串 未指定则为窗口滚动
   * @param {Object} callback 回调函数
   */
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
  /**
   * 获取文档或元素的总宽度
   * @param {Object} el 支持css选择器字符串 未指定则表示整个页面文档
   */
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
  /**
   * 获取文档或者元素的总高度
   * @param {Object} el 支持css选择器字符串 未指定则表示整个页面文档
   */
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
  /**
   * 设置滚动条在Y轴上的距离
   * @param {Object} options {el,number,time} el支持css选择器字符串 未指定则为窗口滚动
   */
  setScrollTop(options) {
    let isWindow = false;
    let el = options.el;
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let number$1 = options.number || 0;
    let time = options.time || 0;
    if (!this.isElement(el) || el == document.body || el == document.documentElement || el == window) {
      isWindow = true;
    }
    return new Promise((resolve, reject) => {
      if (time <= 0) {
        if (isWindow) {
          document.documentElement.scrollTop = document.body.scrollTop = number$1;
        } else {
          el.scrollTop = number$1;
        }
        resolve();
      } else {
        let spacingTime = 10;
        let spacingIndex = number.divide(time, spacingTime);
        let nowTop = this.getScrollTop(el);
        let everTop = number.divide(number.subtract(number$1, nowTop), spacingIndex);
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
  /**
   * 获取滚动条在Y轴上滚动的距离
   * @param {Object} el 支持css选择器字符串 未指定则为窗口滚动
   */
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
  /**
   * 获取滚动条在X轴上滚动的距离
   * @param {Object} el 支持css选择器字符串 未指定则为窗口滚动
   */
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
  /**
   * 设置滚动条在X轴上的距离
   * @param {Object} options {el,number,time} el支持css选择器字符串 未指定则为窗口滚动
   */
  setScrollLeft(options) {
    let isWindow = false;
    let el = options.el;
    if (typeof el == "string" && el) {
      el = document.body.querySelector(el);
    }
    let number$1 = options.number || 0;
    let time = options.time || 0;
    if (!this.isElement(el) || el == document.body || el == document.documentElement || el == window) {
      isWindow = true;
    }
    return new Promise((resolve, reject) => {
      if (time <= 0) {
        if (isWindow) {
          document.documentElement.scrollLeft = document.body.scrollLeft = number$1;
        } else {
          el.scrollLeft = number$1;
        }
        resolve();
      } else {
        let spacingTime = 10;
        let spacingIndex = number.divide(time, spacingTime);
        let nowLeft = this.getScrollLeft(el);
        let everLeft = number.divide(number.subtract(number$1, nowLeft), spacingIndex);
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
  /**
   * 获取元素指定样式
   * @param {Object} el 元素
   * @param {Object} cssName 样式名称
   */
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
  /**
   * 判断字符串属于哪种选择器
   * @param {Object} selector
   */
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
          //去除属性值的单引号或者双引号
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
  /**
   * 获取元素距离可视窗口的位置
   * @param {Object} el 支持css选择器字符串 未指定则为document.body
   */
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
  /**
   * 判断是否是元素
   * @param {Object} el
   */
  isElement(el) {
    return el && el instanceof Node && el.nodeType === 1;
  },
  /**
   * 字符串转dom
   * @param {Object} str
   */
  string2dom(str, parentTag = "div") {
    if (!str || typeof str != "string") {
      throw new TypeError("The argument must be an HTML string");
    }
    let parentEle = document.createElement(parentTag);
    parentEle.innerHTML = str;
    if (parentEle.children.length == 1) {
      return parentEle.children[0];
    } else {
      return Array.from(parentEle.children);
    }
  }
};
const dataName = "_dap-datas";
const data = {
  /**
   * 移除指定数据
   * @param {Object} el
   * @param {Object} key
   */
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
  /**
   * 判断是否含有指定数据
   * @param {Object} el
   * @param {Object} key
   */
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
  /**
   * 获取元素指定数据
   * @param {Object} el
   * @param {Object} key
   */
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
  /**
   * 设置元素指定数据
   * @param {Object} el
   * @param {Object} key
   * @param {Object} value
   */
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
  /**
   * 常用判断
   * @param {Object} text 要判断的字符串
   * @param {Object} param 判断的类型字符串
   */
  matchingText(text, param) {
    if (!text || typeof text != "string") {
      throw new TypeError("The first argument must be a string");
    }
    if (!param || typeof param != "string") {
      throw new TypeError("The second argument must be a string");
    }
    let reg = null;
    if (param == "Chinese") {
      reg = /^[\u4e00-\u9fa5]+$/;
    }
    if (param == "chinese") {
      reg = /[\u4e00-\u9fa5]/;
    }
    if (param == "email") {
      reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    }
    if (param == "username") {
      reg = /^[a-zA-Z0-9_]{4,16}$/;
    }
    if (param == "int+") {
      reg = /^\d+$/;
    }
    if (param == "int-") {
      reg = /^-\d+$/;
    }
    if (param == "int") {
      reg = /^-?\d+$/;
    }
    if (param == "pos") {
      reg = /^\d*\.?\d+$/;
    }
    if (param == "neg") {
      reg = /^-\d*\.?\d+$/;
    }
    if (param == "number") {
      reg = /^-?\d*\.?\d+$/;
    }
    if (param == "phone") {
      reg = /^1[0-9]\d{9}$/;
    }
    if (param == "idCard") {
      reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    }
    if (param == "url") {
      reg = /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/;
    }
    if (param == "IPv4") {
      reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    }
    if (param == "hex") {
      reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    }
    if (param == "rgb") {
      reg = /^rgb\((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\)$/;
    }
    if (param == "rgba") {
      reg = /^rgba\((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d),\s?(0?\.\d|1(\.0)?|0)\)$/;
    }
    if (param == "QQ") {
      reg = /^[1-9][0-9]{4,10}$/;
    }
    if (param == "weixin") {
      reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    }
    if (param == "plate") {
      reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    }
    if (!reg) {
      throw new Error("The second parameter is out of scope");
    }
    return reg.test(text);
  },
  /**
   * 根据参数名获取地址栏参数值
   * @param {Object} name
   */
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
  /**
   * 判断是否空对象
   * @param {Object} obj
   */
  isEmptyObject(obj2) {
    if (this.isObject(obj2)) {
      if (Object.keys(obj2).length == 0) {
        return true;
      }
      return false;
    }
    return false;
  },
  /**
   * 判断两个参数是否相等
   * @param {Object} a
   * @param {Object} b
   */
  equal(a, b) {
    if (typeof a !== typeof b) {
      return false;
    }
    if (this.isObject(a) && this.isObject(b)) {
      let aProps = Object.getOwnPropertyNames(a);
      let bProps = Object.getOwnPropertyNames(b);
      if (aProps.length != bProps.length) {
        return false;
      }
      let length = aProps.length;
      let isEqual = true;
      for (let i = 0; i < length; i++) {
        let propName = aProps[i];
        let propA = a[propName];
        let propB = b[propName];
        if (!this.equal(propA, propB)) {
          isEqual = false;
          break;
        }
      }
      return isEqual;
    }
    return a === b;
  },
  /**
   * 是否对象
   * @param {Object} val
   */
  isObject(val) {
    if (typeof val === "object" && val) {
      return true;
    }
    return false;
  },
  /**
   * 文本复制
   * @param {Object} text
   */
  copyText(text) {
    if (!text || typeof text != "string") {
      throw new TypeError("No text to copy is defined");
    }
    if (!navigator.clipboard) {
      throw new Error("navigator.clipboard must be obtained in a secure environment, such as localhost, 127.0.0.1, or https, so the method won't work");
    }
    return navigator.clipboard.writeText(text);
  },
  /**
   * 深度克隆
   * @param {Object} data
   */
  clone(data2) {
    if (this.isObject(data2)) {
      if (Array.isArray(data2)) {
        return data2.map((item) => {
          return this.clone(item);
        });
      }
      let newData = {};
      for (let key in data2) {
        newData[key] = this.clone(data2[key]);
      }
      return newData;
    }
    return data2;
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
const event = {
  /**
   * 绑定事件
   * @param {Object} el 元素节点
   * @param {Object} eventName 事件名称
   * @param {Object} fn 函数
   * @param {Object} options 参数
   */
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
  /**
   * 事件解绑
   * @param {Object} el 元素节点
   * @param {Object} eventName 事件名称
   */
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
  /**
   * 获取绑定的所有事件
   * @param {*} el
   */
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
const color = {
  /**
   * rgb转hsv值
   * @param {Object} rgb rgb值，数组
   */
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
    return [h2, s * 100, v * 100];
  },
  /**
   * hsv格式值转rgb值
   * @param {Object} hsv hsv值，数组
   */
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
  /**
   * rgb值转十六进制
   * @param {Array} rgb rgb值，数组
   */
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
  /**
   * 十六进制颜色转rgb
   * @param {String} hex 十六进制颜色值
   */
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
  /**
   * 根据文件获取可预览的图片路径
   * @param {Object} file
   */
  getImageUrl(file2) {
    if (!file2 || !(file2 instanceof File)) {
      throw new TypeError("The argument must be a File object");
    }
    return window.URL.createObjectURL(file2);
  },
  /**
   * 将JS的file对象转为BASE64位字符串，通过then方法回调,参数为base64字符串
   * @param {Object} file
   */
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
  /**
   * 将base64位格式文件转换为file对象
   * @param {Object} base64String base64位格式字符串
   * @param {Object} fileName 转换后的文件名字，包含后缀
   */
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
  },
  /**
   * 图片压缩方法
   * @param {*} file 需要压缩的图片File文件
   * @param {*} opts 压缩参数
   */
  compressImage(file2, opts) {
    const options = {
      //压缩图片的宽，单位px，如果不设置默认为原图宽
      width: null,
      //压缩图片质量，默认为原图的0.8
      quality: 0.8,
      //图片类型，jpeg或者webp，默认为jpeg
      mimeType: "jpeg",
      //压缩后的最大值，单位kb，默认为0表示不设置此值
      maxSize: 0,
      //小于该大小的图片不进行压缩，单位kb，默认为0表示任何图片都要压缩
      minSize: 0
    };
    if (common.isObject(opts)) {
      if (number.isNumber(opts.width)) {
        options.width = opts.width;
      }
      if (number.isNumber(opts.quality) && opts.quality >= 0 && opts.quality <= 1) {
        options.quality = opts.quality;
      }
      if (opts.mimeType == "jpeg" || opts.mimeType == "webp") {
        options.mimeType = opts.mimeType;
      }
      if (number.isNumber(opts.maxSize)) {
        options.maxSize = opts.maxSize;
      }
      if (number.isNumber(opts.minSize)) {
        options.minSize = opts.minSize;
      }
    }
    const createFile = (canvas, fileName, quality) => {
      let url = canvas.toDataURL("image/" + options.mimeType, quality);
      let file3 = this.dataBase64toFile(url, fileName);
      if (options.maxSize > 0 && file3.size > options.maxSize * 1024) {
        quality = quality <= 0 ? 0 : Number((quality - 0.01).toFixed(2));
        const res = createFile(canvas, fileName, quality);
        url = res.url;
        file3 = res.file;
        quality = res.quality;
      }
      return {
        file: file3,
        url,
        quality
      };
    };
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file2);
      reader.onload = () => {
        let url = reader.result;
        let img = new Image();
        img.src = url;
        img.onload = () => {
          if (options.minSize > 0 && file2.size <= options.minSize * 1024) {
            resolve({
              file: file2,
              url,
              quality: 1,
              width: img.width,
              height: img.height
            });
            return;
          }
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");
          canvas.width = options.width || img.width;
          canvas.height = options.width ? options.width / (img.width / img.height) : img.height;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          let index = file2.name.lastIndexOf(".");
          const fileName = file2.name.substring(0, index) + "." + options.mimeType;
          let res = createFile(canvas, fileName, options.quality);
          resolve({
            ...res,
            width: canvas.width,
            height: canvas.height
          });
        };
        img.onerror = () => {
          reject(new Error("Failed to load image file"));
        };
      };
      reader.onerror = () => {
        reject(new Error("Failed to load image file"));
      };
    });
  }
};
const platform = {
  //设备语言类型
  language() {
    return window.navigator.browserLanguage || window.navigator.language;
  },
  /**
   * 获取设备类型
   */
  device() {
    const userAgent = window.navigator.userAgent;
    return {
      PC: !userAgent.match(/AppleWebKit.*Mobile.*/),
      //是否移动终端
      Mobile: !!userAgent.match(/AppleWebKit.*Mobile.*/),
      //是否iPhone
      iPhone: userAgent.includes("iPhone"),
      //是否手机
      Phone: userAgent.includes("Android") && /(?:Mobile)/.test(userAgent) || userAgent.includes("iPhone") || /(?:Windows Phone)/.test(userAgent),
      //是否iPad
      iPad: userAgent.includes("iPad"),
      //是否平板电脑
      Tablet: userAgent.includes("iPad") || userAgent.includes("Android") && !/(?:Mobile)/.test(userAgent) || userAgent.includes("Firefox") && /(?:Tablet)/.test(userAgent),
      //windows手机
      WindowsPhone: /(?:Windows Phone)/.test(userAgent)
    };
  },
  /**
   * 获取浏览器类型
   */
  browser() {
    const userAgent = window.navigator.userAgent;
    return {
      //是否edge浏览器
      Edge: !!userAgent.match(/Edg\/([\d.]+)/),
      //是否微信内置浏览器
      weixin: userAgent.includes("MicroMessenger"),
      //是否QQ内置浏览器
      QQ: userAgent.includes("QQ"),
      //是否QQ浏览器
      QQBrowser: userAgent.includes("MQQBrowser"),
      //是否UC浏览器
      UC: userAgent.includes("UCBrowser"),
      //是否谷歌浏览器
      Chrome: userAgent.includes("Chrome"),
      //是否火狐浏览器
      Firefox: userAgent.includes("Firefox"),
      //是否搜狗浏览器
      sougou: userAgent.toLocaleLowerCase().includes("se 2.x") || userAgent.toLocaleLowerCase().includes("metasr") || userAgent.toLocaleLowerCase().includes("sogou"),
      //是否safari浏览器
      Safari: userAgent.includes("Safari") && !userAgent.includes("Chrome")
    };
  },
  /**
   * 获取浏览器内核
   */
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
  /**
   * 获取操作系统数据
   */
  os() {
    const userAgent = window.navigator.userAgent;
    return {
      //是否Windows系统
      Windows: userAgent.includes("Windows"),
      //x64/x32
      Windows_CPU: function() {
        if (userAgent.toLocaleLowerCase().includes("win64") || userAgent.toLocaleLowerCase().includes("wow64")) {
          return "x64";
        } else if (userAgent.toLocaleLowerCase().includes("win32") || userAgent.toLocaleLowerCase().includes("wow32")) {
          return "x32";
        }
        return "";
      }(),
      //Windows版本
      Windows_Version: function() {
        if (userAgent.includes("Windows NT 6.1") || userAgent.includes("Windows 7")) {
          return "Win7";
        }
        if (userAgent.includes("Windows NT 6.3") || userAgent.includes("Windows NT 6.2") || userAgent.includes("Windows NT 8")) {
          return "Win8";
        }
        if (userAgent.includes("Windows NT 10") || userAgent.includes("Windows NT 6.4")) {
          return "Win10";
        }
        return "";
      }(),
      //是否Mac
      Mac: userAgent.includes("Macintosh"),
      //Mac版本
      Mac_Version: function() {
        if (userAgent.includes("Macintosh")) {
          const matches = userAgent.match(/Mac OS X ([^\s]+)\)/);
          if (matches && matches[1]) {
            return matches[1].split(/_|\./).join(".");
          }
        }
        return "";
      }(),
      //是否ios系统
      ios: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      //ios系统版本
      ios_Version: function() {
        if (!!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
          const matches = userAgent.match(/CPU.+OS ([^\s]+) like Mac OS X/);
          if (matches && matches[1]) {
            return matches[1].split(/_|\./).join(".");
          }
        }
        return "";
      }(),
      //是否Android系统
      Android: userAgent.includes("Android"),
      //Android系统版本
      Android_Version: function() {
        const matches = userAgent.match(/Android ([^\s]+);/);
        if (matches && matches[1]) {
          return matches[1].split(/_|\./).join(".");
        }
        return "";
      }(),
      //是否Linux系统
      Linux: userAgent.includes("Linux"),
      //是否鸿蒙系统
      HarmonyOS: userAgent.includes("HarmonyOS"),
      //是否Ubuntu系统
      Ubuntu: userAgent.includes("Ubuntu")
    };
  }
};
const speech = {
  /**
   * 将文字加入语音播报队列
   * @param {Object} text
   */
  start(text, params) {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    let defaultParams = {
      //话语的音调(0-2，值越大越尖锐,越低越低沉)
      pitch: 0.8,
      //说话的速度(0-10，值越大语速越快,越小语速越慢)
      rate: 1,
      //说话的音量：0-1
      volume: 1,
      //播放开始事件
      start: function() {
      },
      //播放结束事件
      end: function() {
      },
      //播放暂停事件
      pause: function() {
      },
      //播放恢复事件
      resume: function() {
      },
      //播放出错事件
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
  /**
   * 停止播报，停止所有播报队列里面的语音
   */
  stop() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.cancel();
  },
  /**
   * 暂停播报
   */
  pause() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.pause();
  },
  /**
   * 恢复暂停的播报
   */
  resume() {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      throw new Error("The current browser does not support this syntax");
    }
    window.speechSynthesis.resume();
  }
};
const obj = { number, data, element, event, common, color, file, string, platform, speech };
class Anchor {
  constructor(element2, options) {
    //点击的元素
    __publicField(this, "$el");
    //锚点到的元素
    __publicField(this, "$target");
    //相对的父祖元素
    __publicField(this, "$root");
    //回调函数
    __publicField(this, "callback");
    //间隔效果
    __publicField(this, "time");
    //距离
    __publicField(this, "distance");
    //是否初始化了
    __publicField(this, "hasInit", false);
    options = obj.common.isObject(options) ? options : {};
    this.$el = element2;
    this.$target = options.target;
    this.$root = options.root;
    this.callback = options.callback;
    this.time = options.time;
    this.distance = options.distance;
  }
  //api：初始化
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (typeof this.$root == "string" && this.$root) {
      this.$root = document.documentElement.querySelector(this.$root);
    }
    if (typeof this.$target == "string" && this.$target) {
      this.$target = document.documentElement.querySelector(this.$target);
    }
    if (!obj.element.isElement(this.$el)) {
      throw new TypeError("The element you click on is not a node element");
    }
    if (!obj.element.isElement(this.$target)) {
      throw new TypeError("Anchor element is not a node element");
    }
    if (!obj.number.isNumber(this.time)) {
      this.time = 0;
    }
    if (typeof this.callback != "function") {
      this.callback = function() {
      };
    }
    if (!obj.number.isNumber(this.distance)) {
      this.distance = 0.1;
    }
    if (obj.element.isElement(this.$root)) {
      obj.event.on(this.$el, "click.anchor", () => {
        let scrollTop = obj.element.getElementPoint(this.$target, this.$root).top;
        obj.element.setScrollTop({
          el: this.$root,
          number: scrollTop - obj.element.rem2px(this.distance),
          time: this.time
        }).then(() => {
          let top = scrollTop - obj.element.rem2px(this.distance) <= 0 ? 0 : scrollTop - obj.element.rem2px(this.distance);
          this.callback(top);
        });
      });
    } else {
      obj.event.on(this.$el, "click.anchor", () => {
        let scrollTop = obj.element.getElementPoint(this.$target).top;
        obj.element.setScrollTop({
          number: scrollTop - obj.element.rem2px(this.distance),
          time: this.time
        }).then(() => {
          let top = scrollTop - obj.element.rem2px(this.distance) <= 0 ? 0 : scrollTop - obj.element.rem2px(this.distance);
          this.callback(top);
        });
      });
    }
  }
}
//install函数
__publicField(Anchor, "install");
const Anchor$1 = Anchor;
Anchor$1.install = (app) => {
  app.directive("anchor", {
    mounted(el, binding) {
      let options = {};
      if (obj.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let anchor = new Anchor$1(el, options);
      anchor.init();
    }
  });
};
class Drag {
  constructor(element2, options) {
    //被拖拽的元素
    __publicField(this, "$el");
    //可拖拽的区域
    __publicField(this, "$container");
    //x轴方向是否可拖动
    __publicField(this, "draggableX");
    //Y轴方向是否可拖动
    __publicField(this, "draggableY");
    //值为on时元素的中心可以在容器边界上，值为in时元素全部只能在容器内，值为out时元素可以在容器外部边缘
    __publicField(this, "mode");
    //是否改变鼠标形状
    __publicField(this, "cursor");
    //元素开始拖动时触发
    __publicField(this, "beforeDrag");
    //元素被拖动时触发
    __publicField(this, "drag");
    //元素拖拽结束触发
    __publicField(this, "dragged");
    //初始化完毕的回调
    __publicField(this, "ready");
    //是否可拖动
    __publicField(this, "draggable", false);
    //是否已经初始化
    __publicField(this, "hasInit", false);
    //X坐标
    __publicField(this, "pageX", 0);
    //Y坐标
    __publicField(this, "pageY", 0);
    //唯一值
    __publicField(this, "guid", this.createGuid());
    options = obj.common.isObject(options) ? options : {};
    this.$el = element2;
    this.$container = options.container;
    this.draggableX = options.draggableX;
    this.draggableY = options.draggableY;
    this.mode = options.mode;
    this.cursor = options.cursor;
    this.drag = options.drag;
    this.beforeDrag = options.beforeDrag;
    this.dragged = options.dragged;
    this.ready = options.ready;
  }
  //设置拖拽事件
  setOn() {
    obj.event.on(this.$el, "touchstart.drag", (e) => {
      if (!this.draggableX && !this.draggableY) {
        return;
      }
      this.pageX = e.targetTouches[0].pageX - obj.element.getElementPoint(this.$el, this.$container).left;
      this.pageY = e.targetTouches[0].pageY - obj.element.getElementPoint(this.$el, this.$container).top;
      this.draggable = true;
      if (this.cursor) {
        this.$el.style.cursor = "move";
      }
      this.beforeDrag.apply(this, [this.$el, this.$container, obj.element.getElementPoint(this.$el, this.$container), e]);
    });
    obj.event.on(this.$el, "touchmove.drag", (e) => {
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
          this.$el.style.right = "auto";
        }
        if (this.draggableY) {
          this.$el.style.top = top + "px";
          this.$el.style.bottom = "auto";
        }
        this.resize();
        if (this.draggableX || this.draggableY) {
          this.drag.apply(this, [this.$el, this.$container, obj.element.getElementPoint(this.$el, this.$container), e]);
        }
      }
    });
    obj.event.on(this.$el, "touchend.drag", (e) => {
      if (this.draggable) {
        if (!this.draggableX && !this.draggableY) {
          return;
        }
        this.draggable = false;
        if (this.cursor) {
          this.$el.style.cursor = "";
        }
        this.dragged.apply(this, [this.$el, this.$container, obj.element.getElementPoint(this.$el, this.$container), e]);
      }
    });
    obj.event.on(this.$el, "mousedown.drag", (e) => {
      if (!this.draggableX && !this.draggableY) {
        return;
      }
      this.pageX = e.pageX - obj.element.getElementPoint(this.$el, this.$container).left;
      this.pageY = e.pageY - obj.element.getElementPoint(this.$el, this.$container).top;
      this.draggable = true;
      if (this.cursor) {
        this.$el.style.cursor = "move";
      }
      this.beforeDrag.apply(this, [this.$el, this.$container, obj.element.getElementPoint(this.$el, this.$container), e]);
    });
    obj.event.on(document.documentElement, `mousemove.drag_${this.guid}`, (e) => {
      if (this.draggable) {
        if (!this.draggableX && !this.draggableY) {
          return;
        }
        let left = e.pageX - this.pageX;
        let top = e.pageY - this.pageY;
        if (this.draggableX) {
          this.$el.style.left = left + "px";
          this.$el.style.right = "auto";
        }
        if (this.draggableY) {
          this.$el.style.top = top + "px";
          this.$el.style.bottom = "auto";
        }
        this.resize();
        if (this.draggableX || this.draggableY) {
          this.drag.apply(this, [this.$el, this.$container, obj.element.getElementPoint(this.$el, this.$container), e]);
        }
      }
    });
    obj.event.on(document.documentElement, `mouseup.drag_${this.guid}`, (e) => {
      if (this.draggable) {
        if (!this.draggableX && !this.draggableY) {
          return;
        }
        this.draggable = false;
        if (this.cursor) {
          this.$el.style.cursor = "";
        }
        this.dragged.apply(this, [this.$el, this.$container, obj.element.getElementPoint(this.$el, this.$container), e]);
      }
    });
  }
  //元素超出容器范围设置
  resize() {
    if (this.mode == "in") {
      if (this.draggableX) {
        if (obj.element.getElementPoint(this.$el, this.$container).left <= 0) {
          this.$el.style.left = "0";
        }
        if (obj.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth - this.$el.offsetWidth) {
          this.$el.style.left = this.$container.offsetWidth - this.$el.offsetWidth + "px";
        }
      }
      if (this.draggableY) {
        if (obj.element.getElementPoint(this.$el, this.$container).top <= 0) {
          this.$el.style.top = "0";
        }
        if (obj.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight - this.$el.offsetHeight) {
          this.$el.style.top = this.$container.offsetHeight - this.$el.offsetHeight + "px";
        }
      }
    } else if (this.mode == "on") {
      if (this.draggableX) {
        if (obj.element.getElementPoint(this.$el, this.$container).left <= -this.$el.offsetWidth / 2) {
          this.$el.style.left = -this.$el.offsetWidth / 2 + "px";
        }
        if (obj.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth - this.$el.offsetWidth / 2) {
          this.$el.style.left = this.$container.offsetWidth - this.$el.offsetWidth / 2 + "px";
        }
      }
      if (this.draggableY) {
        if (obj.element.getElementPoint(this.$el, this.$container).top <= -this.$el.offsetHeight / 2) {
          this.$el.style.top = -this.$el.offsetHeight / 2 + "px";
        }
        if (obj.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight - this.$el.offsetHeight / 2) {
          this.$el.style.top = this.$container.offsetHeight - this.$el.offsetHeight / 2 + "px";
        }
      }
    } else if (this.mode == "out") {
      if (this.draggableX) {
        if (obj.element.getElementPoint(this.$el, this.$container).left <= -this.$el.offsetWidth) {
          this.$el.style.left = -this.$el.offsetWidth + "px";
        }
        if (obj.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth) {
          this.$el.style.left = this.$container.offsetWidth + "px";
        }
      }
      if (this.draggableY) {
        if (obj.element.getElementPoint(this.$el, this.$container).top <= -this.$el.offsetHeight) {
          this.$el.style.top = -this.$el.offsetHeight + "px";
        }
        if (obj.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight) {
          this.$el.style.top = this.$container.offsetHeight + "px";
        }
      }
    }
  }
  //生成唯一值
  createGuid() {
    let guid = obj.data.get(document.body, "mvi-directives-drag-guid") || 0;
    guid++;
    obj.data.set(document.body, "mvi-directives-drag-guid", guid);
    return guid;
  }
  //api：初始化
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!obj.element.isElement(this.$el)) {
      throw new TypeError("The element that needs to be dragged is not a node element");
    }
    if (typeof this.$container == "string" && this.$container) {
      this.$container = document.body.querySelector(this.$container);
    }
    if (!obj.element.isElement(this.$container)) {
      this.$container = document.body;
    }
    if (!obj.element.isContains(this.$container, this.$el)) {
      throw new Error("Elements that need to be dragged are not descendants of container elements");
    }
    if (obj.element.getCssStyle(this.$container, "position") == "static" && this.$container != document.body) {
      throw new Error("The container element cannot be static positioning");
    }
    if (obj.element.getCssStyle(this.$el, "position") == "static" || obj.element.getCssStyle(this.$el, "position") == "relative") {
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
    if (typeof this.beforeDrag != "function") {
      this.beforeDrag = function() {
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
    this.setOn();
    this.ready.apply(this, [this]);
  }
  //api：移除该指令绑定在documentElement上的事件
  destroy() {
    obj.event.off(document.documentElement, `mousemove.drag_${this.guid} mouseup.drag_${this.guid}`);
  }
}
//install函数
__publicField(Drag, "install");
const Drag$1 = Drag;
Drag$1.install = (app) => {
  app.directive("drag", {
    mounted(el, binding) {
      let options = {};
      if (obj.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let drag = new Drag$1(el, options);
      drag.init();
      obj.data.set(el, "directive:drag", drag);
    },
    beforeUnmount(el) {
      let drag = obj.data.get(el, "directive:drag");
      if (drag) {
        drag.destroy();
      }
    }
  });
};
class Observe {
  constructor(el, options) {
    //监听的元素
    __publicField(this, "$el");
    //是否监听元素属性变更
    __publicField(this, "attributes");
    //是否监听子节点变更
    __publicField(this, "childList");
    //监听子节点变动时是否监听其子孙后代节点变更
    __publicField(this, "subtree");
    //监听元素属性变更时定义监听的属性名称数组
    __publicField(this, "attributeNames");
    //属性变化触发的方法
    __publicField(this, "attributesChange");
    //子孙节点变化触发的方法
    __publicField(this, "childNodesChange");
    //是否已经初始化
    __publicField(this, "hasInit", false);
    this.$el = el;
    options = obj.common.isObject(options) ? options : {};
    this.attributes = options.attributes;
    this.childList = options.childList;
    this.subtree = options.subtree;
    this.attributeNames = options.attributeNames;
    this.attributesChange = options.attributesChange;
    this.childNodesChange = options.childNodesChange;
  }
  //api：初始化方法
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!obj.element.isElement(this.$el)) {
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
      let MutationObserver = window.MutationObserver;
      let observer = new MutationObserver((mutationList) => {
        let length = mutationList.length;
        for (let i = 0; i < length; i++) {
          if (mutationList[i].type == "attributes" && this.attributes) {
            this.attributesChange.apply(this, [mutationList[i].attributeName, this.$el.getAttribute(mutationList[i].attributeName), mutationList[i].oldValue]);
          } else if (mutationList[i].type == "childList" && this.childList) {
            for (let node of mutationList[i].addedNodes) {
              if (obj.element.isElement(node)) {
                this.childNodesChange.apply(this, [node, null]);
              }
            }
            for (let node of mutationList[i].removedNodes) {
              if (obj.element.isElement(node)) {
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
//install函数
__publicField(Observe, "install");
const Observe$1 = Observe;
Observe$1.install = (app) => {
  app.directive("observe", {
    mounted(el, binding) {
      let options = {};
      if (obj.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let observe = new Observe$1(el, options);
      observe.init();
    }
  });
};
class Prop {
  constructor(element2, ratio) {
    //元素
    __publicField(this, "$el");
    //比率
    __publicField(this, "ratio");
    //元素宽度
    __publicField(this, "width", 0);
    //元素高度
    __publicField(this, "height", 0);
    //是否已经初始化
    __publicField(this, "hasInit", false);
    //生成唯一标识符
    __publicField(this, "guid", this.createGuid());
    this.$el = element2;
    this.ratio = ratio;
  }
  //生成唯一值
  createGuid() {
    let guid = obj.data.get(document.body, "mvi-directives-prop-guid") || 0;
    guid++;
    obj.data.set(document.body, "mvi-directives-prop-guid", guid);
    return guid;
  }
  //api：设置高度的方法
  set(number2) {
    if (typeof number2 == "number" && !isNaN(number2) && number2 >= 0) {
      this.ratio = number2;
    }
    this.width = Number(parseFloat(obj.element.getCssStyle(this.$el, "width")).toFixed(2));
    this.height = this.width * this.ratio;
    this.$el.style.height = this.height + "px";
  }
  //api：初始化
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!obj.element.isElement(this.$el)) {
      throw new TypeError("The bound element is not a node element");
    }
    if (typeof this.ratio != "number" || isNaN(this.ratio)) {
      this.ratio = 0;
    }
    this.set();
    obj.event.on(window, `resize.prop_${this.guid}`, () => {
      this.set();
    });
  }
  //api：移除绑定在window的事件
  destroy() {
    obj.event.off(window, `resize.prop_${this.guid}`);
  }
}
//install函数
__publicField(Prop, "install");
const Prop$1 = Prop;
Prop$1.install = (app) => {
  app.directive("prop", {
    mounted(el, binding) {
      let prop = new Prop$1(el, binding.value);
      prop.init();
      obj.data.set(el, "directive:prop", prop);
    },
    updated(el, binding) {
      let prop = obj.data.get(el, "directive:prop");
      if (prop) {
        prop.set(binding.value);
      }
    },
    beforeUnmount(el) {
      let prop = obj.data.get(el, "directive:prop");
      if (prop) {
        prop.destroy();
      }
    }
  });
};
class Px {
  constructor(element2, options) {
    //指定的元素
    __publicField(this, "$el");
    //适配的样式名称
    __publicField(this, "attr");
    //是否after伪类
    __publicField(this, "isAfter");
    //是否before伪类
    __publicField(this, "isBefore");
    //是否已经初始化了
    __publicField(this, "hasInit", false);
    options = obj.common.isObject(options) ? options : {};
    this.$el = element2;
    this.attr = options.attr;
    this.isAfter = options.after;
    this.isBefore = options.before;
  }
  //执行适配
  handle() {
    let dpr = Math.round(window.devicePixelRatio || 1);
    let value = Number((1 / dpr).toFixed(2));
    if (this.isBefore || this.isAfter) {
      let guid = this.createGuid();
      let className = `mvi-directives-px_${guid}`;
      obj.element.addClass(this.$el, className);
      let style = document.createElement("style");
      if (this.isBefore) {
        style.innerHTML += ` .${className}::before {${this.attr}:${value}px !important;}`;
      }
      if (this.isAfter) {
        style.innerHTML += ` .${className}::after {${this.attr}:${value}px !important;}`;
      }
      document.querySelector("head").appendChild(style);
    } else {
      this.$el.style.setProperty(this.attr, value + "px", "important");
    }
  }
  //生成唯一值
  createGuid() {
    let guid = obj.data.get(document.body, "mvi-directives-px-guid") || 0;
    guid++;
    obj.data.set(document.body, "mvi-directives-px-guid", guid);
    return guid;
  }
  //api：初始化方法
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!obj.element.isElement(this.$el)) {
      throw new TypeError("The bound element is not a node element");
    }
    if (typeof this.attr != "string" || !this.attr) {
      throw new Error("The attribute name is not set");
    }
    if (typeof this.isAfter != "boolean") {
      this.isAfter = false;
    }
    if (typeof this.isBefore != "boolean") {
      this.isBefore = false;
    }
    this.handle();
  }
}
//install函数
__publicField(Px, "install");
const Px$1 = Px;
Px$1.install = (app) => {
  app.directive("px", {
    mounted(el, binding) {
      let options = {};
      if (obj.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      if (obj.common.isObject(binding.modifiers)) {
        Object.assign(options, binding.modifiers);
      }
      if (binding.arg) {
        options.attr = binding.arg;
      }
      let px = new Px$1(el, options);
      px.init();
    }
  });
};
const ResizeModeValue = {
  LEFT: true,
  TOP: true,
  BOTTOM: true,
  RIGHT: true
};
class Resize {
  constructor(element2, options) {
    //拖拽元素
    __publicField(this, "$el");
    //水平方向是否可拖拽
    __publicField(this, "draggableX");
    //垂直方向是否可拖拽
    __publicField(this, "draggableY");
    //拖拽模式
    __publicField(this, "mode");
    //元素大小改变之前触发
    __publicField(this, "beforeResize");
    //元素大小改变时触发
    __publicField(this, "resize");
    //按下触发时触发
    __publicField(this, "trigger");
    //大小改变之后
    __publicField(this, "end");
    //初始化完成回调
    __publicField(this, "ready");
    //可拖动的范围直径
    __publicField(this, "range");
    //是否可拖动的标识
    __publicField(this, "draggable", false);
    //左侧可拖动范围
    __publicField(this, "leftRange", {});
    //右侧可拖动范围
    __publicField(this, "rightRange", {});
    //顶部可拖动范围
    __publicField(this, "topRange", {});
    //底部可拖动范围
    __publicField(this, "bottomRange", {});
    //左上可拖动范围
    __publicField(this, "leftTopRange", {});
    //右上可拖动范围
    __publicField(this, "rightTopRange", {});
    //左下可拖动范围
    __publicField(this, "leftBottomRange", {});
    //右下可拖动范围
    __publicField(this, "rightBottomRange", {});
    //水平开始的位置
    __publicField(this, "startX", 0);
    //垂直开始的位置
    __publicField(this, "startY", 0);
    //元素宽度
    __publicField(this, "_width", 0);
    //元素高度
    __publicField(this, "_height", 0);
    //元素left
    __publicField(this, "_left", 0);
    //元素top
    __publicField(this, "_top", 0);
    //是否初始化
    __publicField(this, "hasInit", false);
    //记录原先的鼠标样式
    __publicField(this, "cursor", "");
    //生成唯一标识符
    __publicField(this, "guid", this.createGuid());
    options = obj.common.isObject(options) ? options : {};
    this.$el = element2;
    this.draggableX = options.draggableX;
    this.draggableY = options.draggableY;
    this.mode = options.mode;
    this.beforeResize = options.beforeResize;
    this.resize = options.resize;
    this.trigger = options.trigger;
    this.end = options.end;
    this.ready = options.ready;
    this.range = options.range;
  }
  ///判断点击的点是否在指定区域范围内
  getIsInRange(x, y, range) {
    let conditions1 = x >= range.x[0] && x <= range.x[1];
    let conditions2 = y >= range.y[0] && y <= range.y[1];
    if (conditions1 && conditions2) {
      return true;
    }
    return false;
  }
  //移动端触摸按下或者PC端鼠标按下
  down(e) {
    this._width = this.$el.offsetWidth;
    this._height = this.$el.offsetHeight;
    this._left = this.$el.offsetLeft;
    this._top = this.$el.offsetTop;
    this.cursor = obj.element.getCssStyle(this.$el, "cursor");
    if (this.draggableX && this.draggableY) {
      if (this.getIsInRange(this.startX, this.startY, this.leftTopRange)) {
        if (this.mode.left || this.mode.top) {
          this.draggable = true;
          this.$el.style.cursor = "nw-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: "left-top"
              /* LEFTTOP */
            }
          ]);
        }
      } else if (this.getIsInRange(this.startX, this.startY, this.leftBottomRange)) {
        if (this.mode.left || this.mode.bottom) {
          this.draggable = true;
          this.$el.style.cursor = "sw-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: "left-bottom"
              /* LEFTBOTTOM */
            }
          ]);
        }
      } else if (this.getIsInRange(this.startX, this.startY, this.rightTopRange)) {
        if (this.mode.right || this.mode.top) {
          this.draggable = true;
          this.$el.style.cursor = "ne-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: "right-top"
              /* RIGHTTOP */
            }
          ]);
        }
      } else if (this.getIsInRange(this.startX, this.startY, this.rightBottomRange)) {
        if (this.mode.right || this.mode.bottom) {
          this.draggable = true;
          this.$el.style.cursor = "se-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: "right-bottom"
              /* RIGHTBOTTOM */
            }
          ]);
        }
      } else if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
        if (this.mode.left) {
          this.draggable = true;
          this.$el.style.cursor = "w-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: "left"
              /* LEFT */
            }
          ]);
        }
      } else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
        if (this.mode.right) {
          this.draggable = true;
          this.$el.style.cursor = "e-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: "right"
              /* RIGHT */
            }
          ]);
        }
      } else if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
        if (this.mode.top) {
          this.draggable = true;
          this.$el.style.cursor = "n-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: "top"
              /* TOP */
            }
          ]);
        }
      } else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
        if (this.mode.bottom) {
          this.draggable = true;
          this.$el.style.cursor = "s-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: "bottom"
              /* BOTTOM */
            }
          ]);
        }
      }
    } else if (this.draggableX) {
      if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
        if (this.mode.left) {
          this.draggable = true;
          this.$el.style.cursor = "w-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: "left"
              /* LEFT */
            }
          ]);
        }
      } else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
        if (this.mode.right) {
          this.draggable = true;
          this.$el.style.cursor = "e-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: "right"
              /* RIGHT */
            }
          ]);
        }
      }
    } else if (this.draggableY) {
      if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
        if (this.mode.top) {
          this.draggable = true;
          this.$el.style.cursor = "n-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: "top"
              /* TOP */
            }
          ]);
        }
      } else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
        if (this.mode.bottom) {
          this.draggable = true;
          this.$el.style.cursor = "s-resize";
          this.trigger.apply(this, [
            {
              event: e,
              area: "bottom"
              /* BOTTOM */
            }
          ]);
        }
      }
    }
  }
  //移动端触摸滑动或者PC端鼠标拖动
  move(e, endX, endY) {
    if (this.draggable) {
      let moveX = endX - this.startX;
      let moveY = endY - this.startY;
      if (this.draggableX && this.draggableY) {
        if (this.getIsInRange(this.startX, this.startY, this.leftTopRange)) {
          if (this.mode.left || this.mode.top) {
            if (this.beforeResize.apply(this, [
              {
                event: e,
                area: "left-top",
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
                area: "left-top",
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this.getIsInRange(this.startX, this.startY, this.leftBottomRange)) {
          if (this.mode.left || this.mode.bottom) {
            if (this.beforeResize.apply(this, [
              {
                area: "left-bottom",
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
                area: "left-bottom",
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this.getIsInRange(this.startX, this.startY, this.rightTopRange)) {
          if (this.mode.right || this.mode.top) {
            if (this.beforeResize.apply(this, [
              {
                area: "right-top",
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
                area: "right-top",
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this.getIsInRange(this.startX, this.startY, this.rightBottomRange)) {
          if (this.mode.right || this.mode.bottom) {
            if (this.beforeResize.apply(this, [
              {
                area: "right-bottom",
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
                area: "right-bottom",
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
          if (this.mode.left) {
            if (this.beforeResize.apply(this, [
              {
                area: "left",
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
                area: "left",
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
          if (this.mode.right) {
            if (this.beforeResize.apply(this, [
              {
                area: "right",
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
                area: "right",
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
          if (this.mode.top) {
            if (this.beforeResize.apply(this, [
              {
                area: "top",
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
                area: "top",
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
          if (this.mode.bottom) {
            if (this.beforeResize.apply(this, [
              {
                area: "bottom",
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
                area: "bottom",
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
        if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
          if (this.mode.left) {
            if (this.beforeResize.apply(this, [
              {
                area: "left",
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
                area: "left",
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
          if (this.mode.right) {
            if (this.beforeResize.apply(this, [
              {
                area: "right",
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
                area: "right",
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
        if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
          if (this.mode.top) {
            if (this.beforeResize.apply(this, [
              {
                area: "top",
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
                area: "top",
                event: e,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                moveX,
                moveY
              }
            ]);
          }
        } else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
          if (this.mode.bottom) {
            if (this.beforeResize.apply(this, [
              {
                area: "bottom",
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
                area: "bottom",
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
  //移动端触摸松开或者PC端鼠标松开
  leave(e) {
    if (this.draggable) {
      this.$el.style.cursor = this.cursor;
      this.draggable = false;
      if (this.draggableX && this.draggableY) {
        if (this.getIsInRange(this.startX, this.startY, this.leftTopRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: "left-top"
              /* LEFTTOP */
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.leftBottomRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: "left-bottom"
              /* LEFTBOTTOM */
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.rightTopRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: "right-top"
              /* RIGHTTOP */
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.rightBottomRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: "right-bottom"
              /* RIGHTBOTTOM */
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: "left"
              /* LEFT */
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: "right"
              /* RIGHT */
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: "top"
              /* TOP */
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: "bottom"
              /* BOTTOM */
            }
          ]);
        }
      } else if (this.draggableX) {
        if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: "left"
              /* LEFT */
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: "right"
              /* RIGHT */
            }
          ]);
        }
      } else if (this.draggableY) {
        if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: "top"
              /* TOP */
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: "bottom"
              /* BOTTOM */
            }
          ]);
        }
      }
      this.setRange();
    }
  }
  //设置拖动事件
  setOn() {
    obj.event.on(this.$el, "touchstart.resize", (e) => {
      this.startX = e.targetTouches[0].pageX;
      this.startY = e.targetTouches[0].pageY;
      this.down(e);
    });
    obj.event.on(this.$el, "touchmove.resize", (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      let endX = e.targetTouches[0].pageX;
      let endY = e.targetTouches[0].pageY;
      this.move(e, endX, endY);
    });
    obj.event.on(this.$el, "touchend.resize", (e) => {
      this.leave(e);
    });
    obj.event.on(this.$el, "mousedown.resize", (e) => {
      this.startX = e.pageX;
      this.startY = e.pageY;
      this.down(e);
    });
    obj.event.on(document.documentElement, `mousemove.resize_${this.guid}`, (e) => {
      let endX = e.pageX;
      let endY = e.pageY;
      this.move(e, endX, endY);
    });
    obj.event.on(document.documentElement, `mouseup.resize_${this.guid}`, (e) => {
      this.leave(e);
    });
  }
  //生成唯一值
  createGuid() {
    let guid = obj.data.get(document.body, "mvi-directives-resize-guid") || 0;
    guid++;
    obj.data.set(document.body, "mvi-directives-resize-guid", guid);
    return guid;
  }
  //api：初始化
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!obj.element.isElement(this.$el)) {
      throw new TypeError("The element that needs to be resized is not a node element");
    }
    if (typeof this.draggableX != "boolean") {
      this.draggableX = true;
    }
    if (typeof this.draggableY != "boolean") {
      this.draggableY = true;
    }
    if (!obj.common.isObject(this.mode)) {
      this.mode = {
        left: ResizeModeValue.LEFT,
        top: ResizeModeValue.TOP,
        bottom: ResizeModeValue.BOTTOM,
        right: ResizeModeValue.RIGHT
      };
    } else {
      if (typeof this.mode.left != "boolean") {
        this.mode.left = ResizeModeValue.LEFT;
      }
      if (typeof this.mode.top != "boolean") {
        this.mode.top = ResizeModeValue.TOP;
      }
      if (typeof this.mode.bottom != "boolean") {
        this.mode.bottom = ResizeModeValue.BOTTOM;
      }
      if (typeof this.mode.right != "boolean") {
        this.mode.right = ResizeModeValue.RIGHT;
      }
    }
    if (typeof this.beforeResize != "function") {
      this.beforeResize = () => {
        return true;
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
    if (!obj.number.isNumber(this.range)) {
      this.range = 0.4;
    }
    this.setRange();
    this.setOn();
    this.ready.apply(this, [this]);
  }
  //api：设置可拖动的范围
  setRange() {
    let range = this.$el.getBoundingClientRect();
    if (this.draggableX && this.draggableY) {
      this.leftRange = {
        x: [range.left, range.left + obj.element.rem2px(this.range)],
        y: [range.top + obj.element.rem2px(this.range), range.bottom - obj.element.rem2px(this.range)]
      };
      this.rightRange = {
        x: [range.right - obj.element.rem2px(this.range), range.right],
        y: [range.top + obj.element.rem2px(this.range), range.bottom - obj.element.rem2px(this.range)]
      };
      this.topRange = {
        x: [range.left + obj.element.rem2px(this.range), range.right - obj.element.rem2px(this.range)],
        y: [range.top, range.top + obj.element.rem2px(this.range)]
      };
      this.bottomRange = {
        x: [range.left + obj.element.rem2px(this.range), range.right - obj.element.rem2px(this.range)],
        y: [range.bottom - obj.element.rem2px(this.range), range.bottom]
      };
      this.leftTopRange = {
        x: [range.left, range.left + obj.element.rem2px(this.range)],
        y: [range.top, range.top + obj.element.rem2px(this.range)]
      };
      this.leftBottomRange = {
        x: [range.left, range.left + obj.element.rem2px(this.range)],
        y: [range.bottom - obj.element.rem2px(this.range), range.bottom]
      };
      this.rightTopRange = {
        x: [range.right - obj.element.rem2px(this.range), range.right],
        y: [range.top, range.top + obj.element.rem2px(this.range)]
      };
      this.rightBottomRange = {
        x: [range.right - obj.element.rem2px(this.range), range.right],
        y: [range.bottom - obj.element.rem2px(this.range), range.bottom]
      };
    } else if (this.draggableX) {
      this.leftRange = {
        x: [range.left, range.left + obj.element.rem2px(this.range)],
        y: [range.top, range.bottom]
      };
      this.rightRange = {
        x: [range.right - obj.element.rem2px(this.range), range.right],
        y: [range.top, range.bottom]
      };
    } else if (this.draggableY) {
      this.topRange = {
        x: [range.left, range.right],
        y: [range.top, range.top + obj.element.rem2px(this.range)]
      };
      this.bottomRange = {
        x: [range.left, range.right],
        y: [range.bottom - obj.element.rem2px(this.range), range.bottom]
      };
    }
  }
  //api：移除documentElement上的拖动事件
  destroy() {
    obj.event.off(document.documentElement, `mousemove.resize_${this.guid} mouseup.resize_${this.guid}`);
  }
  //api：设置水平方向不可拖拽改变大小
  disabledDragX() {
    this.draggableX = false;
    this.setRange();
  }
  //api：设置垂直方向不可拖拽改变大小
  disabledDragY() {
    this.draggableY = false;
    this.setRange();
  }
  //api：设置水平方向可拖拽改变大小
  enabledDragX() {
    this.draggableX = true;
    this.setRange();
  }
  //api：设置垂直方向可拖拽改变大小
  enabledDragY() {
    this.draggableY = true;
    this.setRange();
  }
}
//install函数
__publicField(Resize, "install");
const Resize$1 = Resize;
Resize$1.install = (app) => {
  app.directive("resize", {
    mounted(el, binding) {
      let options = {};
      if (obj.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let resize = new Resize$1(el, options);
      resize.init();
      obj.data.set(el, "directive:resize", resize);
    },
    beforeUnmount(el) {
      let resize = obj.data.get(el, "directive:resize");
      if (resize) {
        resize.destroy();
      }
    }
  });
};
class Ripple {
  constructor(element2, options) {
    //指定的元素
    __publicField(this, "$el");
    //水波纹颜色
    __publicField(this, "color");
    //水波持续时间，单位ms
    __publicField(this, "duration");
    //结束交互效果透明度大小
    __publicField(this, "finalOpacity");
    //初始交互效果透明度大小
    __publicField(this, "initialOpacity");
    //延迟时间
    __publicField(this, "delay");
    //是否禁用
    __publicField(this, "disabled");
    //是否初始化了
    __publicField(this, "hasInit", false);
    //生成唯一值
    __publicField(this, "guid", this.createGuid());
    //水波纹容器数组
    __publicField(this, "rippleContainers", []);
    options = obj.common.isObject(options) ? options : {};
    this.$el = element2;
    this.color = options.color;
    this.duration = options.duration;
    this.finalOpacity = options.finalOpacity;
    this.initialOpacity = options.initialOpacity;
    this.delay = options.delay;
    this.disabled = options.disabled;
  }
  //动画完成处理
  endDeal(rippleContainer) {
    const rippleUp = obj.data.get(rippleContainer, "ripple-up");
    const rippleAnimationEnd = obj.data.get(rippleContainer, "ripple-animation-end");
    if (rippleUp && rippleAnimationEnd) {
      const destroyDuration = 100;
      const rippleEls = obj.element.children(rippleContainer);
      const rippleEl = rippleEls[0];
      rippleEl.style.transition = `opacity ${destroyDuration}ms ease-in-out`;
      rippleEl.offsetWidth;
      rippleEl.style.opacity = 0;
      setTimeout(() => {
        this.rippleContainers = this.rippleContainers.filter((el) => {
          return el != rippleContainer;
        });
        rippleContainer.remove();
      }, destroyDuration);
    }
  }
  //创建ripple元素
  createRippleElement(pageX, pageY) {
    const rect = obj.element.getElementBounding(this.$el);
    const { x1, y1, r } = this.getRadius(pageX, pageY, rect);
    const el = obj.element.string2dom("<div></div>");
    el.style.width = r * 2 + "px";
    el.style.height = r * 2 + "px";
    el.style.position = "absolute";
    el.style.background = this.color || "";
    el.style.top = y1 - r + "px";
    el.style.left = x1 - r + "px";
    el.style.zIndex = "1";
    el.style.borderRadius = "50%";
    el.style.transform = "scale(0)";
    el.style.opacity = this.initialOpacity + "";
    el.style.transition = `transform ${this.duration}ms cubic-bezier(0, 0.5, 0.25, 1), opacity ${this.duration}ms cubic-bezier(0.0, 0, 0.2, 1)`;
    return el;
  }
  //创建ripple父容器
  createRippleContainer() {
    const el = obj.element.string2dom("<div></div>");
    el.style.position = "absolute";
    el.style.left = "0px";
    el.style.top = "0px";
    el.style.width = obj.element.getCssStyle(this.$el, "width");
    el.style.height = obj.element.getCssStyle(this.$el, "height");
    el.style.background = "transparent";
    el.style.borderRadius = obj.element.getCssStyle(this.$el, "border-radius");
    el.style.overflow = "hidden";
    el.style.pointerEvents = "none";
    return el;
  }
  //获取圆半径
  getRadius(pageX, pageY, rect) {
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
  //生成唯一值
  createGuid() {
    let guid = obj.data.get(document.documentElement, "mvi-directives-ripple-guid") || 0;
    guid++;
    obj.data.set(document.documentElement, "mvi-directives-ripple-guid", guid);
    return guid;
  }
  //api：初始化
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!obj.element.isElement(this.$el)) {
      throw new TypeError("The bound element is not a node element");
    }
    if (typeof this.color != "string") {
      this.color = "#9f9f9f";
    }
    if (!obj.number.isNumber(this.duration)) {
      this.duration = 600;
    }
    if (!obj.number.isNumber(this.finalOpacity)) {
      this.finalOpacity = 0.1;
    }
    if (!obj.number.isNumber(this.initialOpacity)) {
      this.initialOpacity = 0.1;
    }
    if (!obj.number.isNumber(this.delay)) {
      this.delay = 80;
    }
    if (typeof this.disabled != "boolean") {
      this.disabled = false;
    }
    if (obj.element.getCssStyle(this.$el, "position") != "relative" && obj.element.getCssStyle(this.$el, "position") != "absolute" && obj.element.getCssStyle(this.$el, "position") != "fixed") {
      this.$el.style.position = "relative";
    }
    const downFn = (pageX, pageY) => {
      if (this.disabled) {
        return;
      }
      const rippleContainer = this.createRippleContainer();
      const rippleEl = this.createRippleElement(pageX, pageY);
      this.$el.appendChild(rippleContainer);
      rippleContainer.appendChild(rippleEl);
      this.rippleContainers.push(rippleContainer);
      setTimeout(() => {
        rippleEl.style.transform = "scale(1)";
        rippleEl.style.opacity = this.finalOpacity + "";
        setTimeout(() => {
          obj.data.set(rippleContainer, "ripple-animation-end", true);
          this.endDeal(rippleContainer);
        }, this.duration);
      }, this.delay);
    };
    const upFn = () => {
      if (this.rippleContainers.length) {
        this.rippleContainers.forEach((rippleContainer) => {
          obj.data.set(rippleContainer, "ripple-up", true);
          this.endDeal(rippleContainer);
        });
      }
    };
    obj.event.on(this.$el, "mousedown.ripple", (e) => {
      downFn(e.pageX, e.pageY);
    });
    obj.event.on(document.documentElement, `mouseup.ripple_${this.guid}`, upFn);
    obj.event.on(this.$el, "touchstart.ripple", (e) => {
      e.preventDefault();
      downFn(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    });
    obj.event.on(this.$el, `touchend.ripple`, (e) => {
      e.preventDefault();
      upFn();
    });
  }
  //api：移除documentElement上的拖动事件
  destroy() {
    obj.event.off(document.documentElement, `mouseup.ripple_${this.guid}`);
  }
}
//install函数
__publicField(Ripple, "install");
const Ripple$1 = Ripple;
Ripple$1.install = (app) => {
  app.directive("ripple", {
    mounted(el, binding) {
      let options = {};
      if (obj.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let ripple = new Ripple$1(el, options);
      ripple.init();
      obj.data.set(el, "directive:ripple", ripple);
    },
    beforeUnmount(el) {
      let ripple = obj.data.get(el, "directive:ripple");
      if (ripple) {
        ripple.destroy();
      }
    }
  });
};
class Scroll {
  constructor(element2, options) {
    //滚动元素
    __publicField(this, "$el");
    //到达顶部触发函数
    __publicField(this, "top");
    //到达底部触发函数
    __publicField(this, "bottom");
    //是否已经初始化
    __publicField(this, "hasInit", false);
    options = obj.common.isObject(options) ? options : {};
    this.$el = element2;
    this.top = options.top;
    this.bottom = options.bottom;
  }
  //api：初始化
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!obj.element.isElement(this.$el)) {
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
    obj.element.scrollTopBottomTrigger(this.$el, (res) => {
      if (res.state == "top") {
        this.top.apply(this, [res.target]);
      } else {
        this.bottom.apply(this, [res.target]);
      }
    });
  }
}
//install函数
__publicField(Scroll, "install");
const Scroll$1 = Scroll;
Scroll$1.install = (app) => {
  app.directive("scroll", {
    mounted(el, binding) {
      let options = {};
      if (obj.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let scroll = new Scroll$1(el, options);
      scroll.init();
    }
  });
};
class Spy {
  constructor(element2, options) {
    //绑定的元素
    __publicField(this, "$el");
    //滚动容器
    __publicField(this, "$root");
    //元素进入容器视图之前
    __publicField(this, "beforeEnter");
    //元素完全进入容器视图时
    __publicField(this, "enter");
    //元素离开容器视图之前
    __publicField(this, "beforeLeave");
    //元素完全离开容器视图时
    __publicField(this, "leave");
    //是否已经初始化
    __publicField(this, "hasInit", false);
    //是否触发的标记
    __publicField(this, "triggerTag", {
      before: false,
      after: false
    });
    //生成唯一标识符
    __publicField(this, "guid", this.createGuid());
    options = obj.common.isObject(options) ? options : {};
    this.$el = element2;
    this.$root = options.el;
    this.beforeEnter = options.beforeEnter;
    this.enter = options.enter;
    this.beforeLeave = options.beforeLeave;
    this.leave = options.leave;
  }
  //侦听处理
  scrollHandle() {
    const elRect = this.$el.getBoundingClientRect();
    const rootRect = this.$root.getBoundingClientRect();
    if (elRect.right >= rootRect.left && elRect.left <= rootRect.right && elRect.bottom >= rootRect.top && elRect.top <= rootRect.bottom) {
      if (!this.triggerTag.before) {
        this.beforeEnter.apply(this, [this.$el]);
        this.triggerTag.before = true;
      }
    } else {
      if (this.triggerTag.before) {
        this.leave.apply(this, [this.$el]);
        this.triggerTag.before = false;
      }
    }
    if (elRect.left >= rootRect.left && elRect.right <= rootRect.right && elRect.top >= rootRect.top && elRect.bottom <= rootRect.bottom) {
      if (!this.triggerTag.after) {
        this.enter.apply(this, [this.$el]);
        this.triggerTag.after = true;
      }
    } else {
      if (this.triggerTag.after) {
        this.beforeLeave.apply(this, [this.$el]);
        this.triggerTag.after = false;
      }
    }
  }
  //生成唯一值
  createGuid() {
    let guid = obj.data.get(document.body, "mvi-directives-spy-guid") || 0;
    guid++;
    obj.data.set(document.body, "mvi-directives-spy-guid", guid);
    return guid;
  }
  //api：初始化
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!obj.element.isElement(this.$el)) {
      throw new TypeError("The bound element is not a node element");
    }
    if (typeof this.$root == "string" && this.$root) {
      this.$root = document.documentElement.querySelector(this.$root);
    }
    if (!obj.element.isElement(this.$root)) {
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
    this.scrollHandle();
    obj.event.on(this.$root, `scroll.spy_${this.guid}`, () => {
      this.scrollHandle();
    });
  }
  //api：移除滚动容器监听事件
  destroy() {
    obj.event.off(this.$root, `scroll.spy_${this.guid}`);
  }
}
//install函数
__publicField(Spy, "install");
const Spy$1 = Spy;
Spy$1.install = (app) => {
  app.directive("spy", {
    mounted(el, binding) {
      let options = {};
      if (obj.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      let spy = new Spy$1(el, options);
      spy.init();
      obj.data.set(el, "directive:spy", spy);
    },
    beforeUnmount(el) {
      let spy = obj.data.get(el, "directive:spy");
      if (spy) {
        spy.destroy();
      }
    }
  });
};
class Upload {
  constructor(element2, options) {
    //组件容器
    __publicField(this, "$el");
    //接受的文件类型
    __publicField(this, "accept");
    //是否直接使用摄像头或者麦克风，只有在accept为image或者video或者audio时有效
    __publicField(this, "capture");
    //限定上传文件的后缀
    __publicField(this, "allowedFileType");
    //上传文件的最小值
    __publicField(this, "minSize");
    //上传文件的最大值
    __publicField(this, "maxSize");
    //上传文件的最大个数
    __publicField(this, "maxLength");
    //上传文件的最小个数
    __publicField(this, "minLength");
    //是否多选
    __publicField(this, "multiple");
    //选择的文件是否追加
    __publicField(this, "append");
    //是否禁用
    __publicField(this, "disabled");
    //选择文件错误触发的回调函数
    __publicField(this, "error");
    //选择文件成功后触发的回调函数
    __publicField(this, "select");
    //加载完毕触发的回调函数
    __publicField(this, "ready");
    //额外的参数
    __publicField(this, "extraData");
    //文件上传元素
    __publicField(this, "$selectInput", null);
    //选择的文件值数组
    __publicField(this, "files", []);
    //是否初始化
    __publicField(this, "hasInit", false);
    options = obj.common.isObject(options) ? options : {};
    this.$el = element2;
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
    this.extraData = options.extraData;
  }
  //判断选择的文件是否符合规定的后缀格式
  judgeSuffix(fileName) {
    let suffix = fileName.substring(fileName.lastIndexOf(".") + 1);
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
  //api：初始化
  init() {
    if (this.hasInit) {
      return;
    }
    this.hasInit = true;
    if (!obj.element.isElement(this.$el)) {
      throw new TypeError("The upload element is not specified");
    }
    if (!(this.allowedFileType instanceof Array)) {
      this.allowedFileType = [];
    }
    if (!obj.number.isNumber(this.minSize) || this.minSize <= 0) {
      this.minSize = -1;
    }
    if (!obj.number.isNumber(this.maxSize) || this.maxSize <= 0) {
      this.maxSize = -1;
    }
    if (!obj.number.isNumber(this.maxLength) || this.maxLength <= 0) {
      this.maxLength = -1;
    }
    if (!obj.number.isNumber(this.minLength) || this.minLength <= 0) {
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
    if (!obj.common.isObject(this.extraData)) {
      this.extraData = {};
    }
    this.$selectInput = obj.element.string2dom("<input type='file' />");
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
    this.$el.onclick = () => {
      if (this.disabled) {
        return;
      }
      this.$selectInput.click();
    };
    this.$selectInput.onchange = () => {
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
        if (!this.judgeSuffix(files[i].name)) {
          this.error.apply(this, ["suffixError", files[i]]);
          isAllAccord = false;
          break;
        }
        if (files[i].size / 1024 > this.maxSize && this.maxSize > 0) {
          this.error.apply(this, ["maxSizeError", files[i]]);
          isAllAccord = false;
          break;
        }
        if (files[i].size / 1024 < this.minSize && this.minSize > 0) {
          this.error.apply(this, ["minSizeError", files[i]]);
          isAllAccord = false;
          break;
        }
        if (this.files.length + length > this.maxLength && this.maxLength > 0) {
          this.error.apply(this, [
            "maxLengthError"
            /* FILE_MAXLENGTH_ERROR */
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
          "minLengthError"
          /* FILE_MINLENGTH_ERROR */
        ]);
        return;
      }
      this.files = [...this.files, ...files];
      this.select.apply(this, [[...this.files], { ...this.extraData }]);
    };
    this.ready.apply(this, [this]);
  }
  //api：获取已经选择的文件
  getFiles() {
    return {
      files: [...this.files],
      extraData: { ...this.extraData }
    };
  }
  //api：清空选择的文件
  clear() {
    this.files = [];
    this.$selectInput.value = "";
    this.select.apply(this, [[...this.files], { ...this.extraData }]);
  }
  //api：禁用
  setDisabled() {
    this.disabled = true;
    this.$el.setAttribute("disabled", "disabled");
  }
  //api：启用
  setEnabled() {
    this.disabled = false;
    this.$el.removeAttribute("disabled");
  }
}
//install函数
__publicField(Upload, "install");
const Upload$1 = Upload;
Upload$1.install = (app) => {
  app.directive("upload", {
    mounted(el, binding) {
      let options = {};
      if (obj.common.isObject(binding.value)) {
        Object.assign(options, binding.value);
      }
      if (obj.common.isObject(binding.modifiers)) {
        Object.assign(options, binding.modifiers);
      }
      let upload = new Upload$1(el, options);
      upload.init();
    }
  });
};
const IconProps = {
  //图标类型
  type: {
    type: String,
    default: ""
  },
  //是否旋转
  spin: {
    type: Boolean,
    default: false
  },
  //图标的图片链接
  url: {
    type: String,
    default: null
  },
  //图标尺寸
  size: {
    type: String,
    default: null
  },
  //图标颜色
  color: {
    type: String,
    default: null
  }
};
const _sfc_main$13 = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-icon"
  },
  __name: "icon",
  props: IconProps,
  setup(__props) {
    const props = __props;
    const iconStyle = computed(() => {
      let style = {};
      if (props.url) {
        style.backgroundImage = `url(${props.url})`;
        if (props.size) {
          style.width = props.size;
          style.height = props.size;
        }
      } else {
        if (props.size) {
          style.fontSize = props.size;
        }
        if (props.color) {
          style.color = props.color;
        }
      }
      return style;
    });
    return (_ctx, _cache) => {
      return _ctx.url ? (openBlock(), createElementBlock("i", {
        key: 0,
        class: normalizeClass(["mvi-icon-url", { spin: _ctx.spin }]),
        style: normalizeStyle(iconStyle.value)
      }, null, 6)) : (openBlock(), createElementBlock("i", {
        key: 1,
        class: normalizeClass(["mvi-icon", ["icon-" + _ctx.type, _ctx.spin ? "spin" : ""]]),
        style: normalizeStyle(iconStyle.value)
      }, null, 6));
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const Icon = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["__scopeId", "data-v-a9ec4f65"]]);
Icon.install = (app) => {
  app.component(Icon.name, Icon);
};
const BadgeProps = {
  //徽标内容
  content: {
    type: [String, Number],
    default: null
  },
  //徽标位置
  placement: {
    type: String,
    default: "top-right",
    validator(value) {
      return ["top-right", "top-left", "bottom-left", "bottom-right"].includes(value);
    }
  },
  //是否圆点
  dot: {
    type: Boolean,
    default: false
  },
  //徽标是否显示
  show: {
    type: Boolean,
    default: true
  },
  //徽标偏移值
  offset: {
    type: Array,
    default: function() {
      return null;
    }
  },
  //背景色
  background: {
    type: String,
    default: null
  },
  //字体颜色
  color: {
    type: String,
    default: null
  },
  //是否块级
  block: {
    type: Boolean,
    default: false
  }
};
const _hoisted_1$O = ["data-placement"];
const _hoisted_2$D = ["data-placement"];
const _sfc_main$12 = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-badge"
  },
  __name: "badge",
  props: BadgeProps,
  setup(__props) {
    const props = __props;
    const badgeStyle = computed(() => {
      let style = {};
      if (props.background) {
        style.background = props.background;
      }
      if (props.color) {
        style.color = props.color;
      }
      if (props.offset) {
        if (props.offset[0]) {
          if (props.placement == "top-right" || props.placement == "bottom-right") {
            style.marginRight = props.offset[0];
          } else if (props.placement == "top-left" || props.placement == "bottom-left") {
            style.marginLeft = props.offset[0];
          }
        }
        if (props.offset[1]) {
          if (props.placement == "top-right" || props.placement == "top-left") {
            style.marginTop = props.offset[1];
          } else if (props.placement == "bottom-right" || props.placement == "bottom-left") {
            style.marginBottom = props.offset[1];
          }
        }
      }
      return style;
    });
    const badgeShow = computed(() => {
      const badgeExist = obj.number.isNumber(props.content) || props.content;
      if (badgeExist && props.show) {
        return true;
      }
      return false;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-badge", { block: _ctx.block }])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true),
        _ctx.dot && _ctx.show ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "mvi-badge-el mvi-badge-dot",
          "data-placement": _ctx.placement,
          style: normalizeStyle(badgeStyle.value)
        }, null, 12, _hoisted_1$O)) : badgeShow.value ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: "mvi-badge-el",
          "data-placement": _ctx.placement,
          style: normalizeStyle(badgeStyle.value)
        }, toDisplayString(_ctx.content), 13, _hoisted_2$D)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const Badge = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["__scopeId", "data-v-46b844be"]]);
Badge.install = (app) => {
  app.component(Badge.name, Badge);
};
const ButtonProps = {
  //主题类型
  type: {
    type: String,
    default: "default",
    validator(value) {
      return ["default", "info", "success", "error", "warn", "primary"].includes(value);
    }
  },
  //尺寸
  size: {
    type: String,
    default: "medium",
    validator(value) {
      return ["mini", "small", "medium", "large"].includes(value);
    }
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //原生按钮type
  nativeType: {
    type: String,
    default: "button"
  },
  //是否独占一行
  block: {
    type: Boolean,
    default: false
  },
  //渲染标签
  tag: {
    type: String,
    default: "button"
  },
  //是否朴素按钮
  plain: {
    type: Boolean,
    default: false
  },
  //圆形按钮
  round: {
    type: Boolean,
    default: false
  },
  //方形按钮
  square: {
    type: Boolean,
    default: false
  },
  //是否显示点击态
  active: {
    type: Boolean,
    default: true
  },
  //是否显示加载状态
  loading: {
    type: Boolean,
    default: false
  },
  //加载文字
  loadText: {
    type: String,
    default: "loading..."
  },
  //加载图标
  loadIcon: {
    type: [String, Object],
    default: function() {
      return {
        type: "load-e",
        spin: true
      };
    }
  }
};
({
  ...ButtonProps,
  text: {
    type: String,
    default: ""
  }
});
const _hoisted_1$N = {
  key: 0,
  class: "mvi-button-load-text"
};
const _sfc_main$11 = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-button"
  },
  __name: "button",
  props: ButtonProps,
  setup(__props) {
    const props = __props;
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const btnClass = computed(() => {
      let cls = [];
      if (props.type) {
        cls.push(props.type);
      }
      if (props.size) {
        cls.push(props.size);
      }
      if (props.round) {
        cls.push("round");
      } else if (props.square) {
        cls.push("square");
      }
      if (props.block) {
        cls.push("block");
      }
      if (props.plain) {
        cls.push("plain");
      }
      if (props.active && !props.disabled) {
        cls.push("active");
      }
      if (props.loading) {
        cls.push("loading");
      }
      return cls;
    });
    const Button2 = defineComponent(() => {
      let attrs = {};
      if (props.tag.toLocaleUpperCase() == "BUTTON") {
        attrs.type = props.nativeType;
      }
      return () => {
        return h(props.tag, attrs, {
          default: useSlots().default
        });
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Button2), {
        disabled: _ctx.disabled || null,
        class: normalizeClass(["mvi-button", btnClass.value])
      }, {
        default: withCtx(() => [
          _ctx.loading && _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : _ctx.loading ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createVNode(unref(Icon), {
              type: parseIcon.value(_ctx.loadIcon).type,
              color: parseIcon.value(_ctx.loadIcon).color,
              url: parseIcon.value(_ctx.loadIcon).url,
              spin: parseIcon.value(_ctx.loadIcon).spin,
              size: parseIcon.value(_ctx.loadIcon).size
            }, null, 8, ["type", "color", "url", "spin", "size"]),
            _ctx.loadText ? (openBlock(), createElementBlock("span", _hoisted_1$N, toDisplayString(_ctx.loadText), 1)) : createCommentVNode("", true)
          ], 64)) : renderSlot(_ctx.$slots, "default", { key: 2 }, void 0, true)
        ]),
        _: 3
      }, 8, ["disabled", "class"]);
    };
  }
});
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["__scopeId", "data-v-77983911"]]);
Button.install = (app) => {
  app.component(Button.name, Button);
};
const TriangleProps = {
  //背景色
  background: {
    type: String,
    default: null
  },
  //边框颜色
  borderColor: {
    type: String,
    default: null
  },
  //大小
  size: {
    type: String,
    default: "0.14rem"
  },
  //位置
  placement: {
    type: String,
    default: "top",
    validator(value) {
      return ["top", "left", "right", "bottom"].includes(value);
    }
  }
};
const _hoisted_1$M = ["data-placement"];
const _hoisted_2$C = ["data-placement"];
const _sfc_main$10 = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-triangle"
  },
  __name: "triangle",
  props: TriangleProps,
  setup(__props) {
    const props = __props;
    const triangleStyle = computed(() => {
      let style = {};
      style.borderWidth = props.size;
      if (props.placement == "top") {
        style.borderBottomColor = props.borderColor || "";
      } else if (props.placement == "bottom") {
        style.borderTopColor = props.borderColor || "";
      } else if (props.placement == "left") {
        style.borderRightColor = props.borderColor || "";
      } else if (props.placement == "right") {
        style.borderLeftColor = props.borderColor || "";
      }
      return style;
    });
    const triangleElStyle = computed(() => {
      let style = {};
      style.borderWidth = `calc(${props.size} - 1px)`;
      if (props.placement == "top") {
        style.borderBottomColor = props.background || "";
        style.marginLeft = `-${props.size}`;
      } else if (props.placement == "bottom") {
        style.borderTopColor = props.background || "";
        style.marginLeft = `-${props.size}`;
      } else if (props.placement == "left") {
        style.borderRightColor = props.background || "";
        style.marginTop = `-${props.size}`;
      } else if (props.placement == "right") {
        style.borderLeftColor = props.background || "";
        style.marginTop = `-${props.size}`;
      }
      return style;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "mvi-triangle",
        style: normalizeStyle(triangleStyle.value),
        "data-placement": _ctx.placement
      }, [
        createElementVNode("div", {
          class: "mvi-triangle-el",
          style: normalizeStyle(triangleElStyle.value),
          "data-placement": _ctx.placement
        }, null, 12, _hoisted_2$C)
      ], 12, _hoisted_1$M);
    };
  }
});
const Triangle = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["__scopeId", "data-v-068b0274"]]);
Triangle.install = (app) => {
  app.component(Triangle.name, Triangle);
};
const LayerProps = {
  //是否显示悬浮层
  modelValue: {
    type: Boolean,
    default: false
  },
  //悬浮层关联元素
  relate: {
    type: String,
    default: null
  },
  //悬浮层相对于关联元素的位置
  placement: {
    type: String,
    default: "bottom",
    validator(value) {
      return ["top", "left", "right", "bottom", "top-start", "top-end", "left-start", "left-end", "right-start", "right-end", "bottom-start", "bottom-end"].includes(value);
    }
  },
  //悬浮层主体距离关联元素的距离
  offset: {
    type: String,
    default: "0.2rem"
  },
  //悬浮层的z-index
  zIndex: {
    type: Number,
    default: null
  },
  //悬浮层的宽度
  width: {
    type: String,
    default: null
  },
  //悬浮层显示与隐藏动画时长
  timeout: {
    type: Number,
    default: 200
  },
  //点击关联元素和悬浮层以外的元素是否关闭悬浮层
  closable: {
    type: Boolean,
    default: false
  },
  //是否显示三角
  showTriangle: {
    type: Boolean,
    default: false
  },
  //自定义动画
  animation: {
    type: String,
    default: null
  },
  //是否显示阴影
  shadow: {
    type: Boolean,
    default: true
  },
  //是否显示边框
  border: {
    type: Boolean,
    default: false
  },
  //边框颜色
  borderColor: {
    type: String,
    default: "#eee"
  },
  //背景色
  background: {
    type: String,
    default: "#fff"
  }
};
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false,
    name: "m-layer"
  },
  __name: "layer",
  props: LayerProps,
  emits: ["update:modelValue", "show", "showing", "shown", "hide", "hidding", "hidden"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const instance = getCurrentInstance();
    const layerShow = ref(false);
    const firstShow = ref(false);
    const realPlacement = ref("bottom");
    const layerRef = ref(null);
    const triangleRef = ref(null);
    const $$el = computed(() => {
      return layerRef.value;
    });
    const trianglePlacement = computed(() => {
      if (realPlacement.value == "bottom-start" || realPlacement.value == "bottom" || realPlacement.value == "bottom-end") {
        return "top";
      }
      if (realPlacement.value == "top-start" || realPlacement.value == "top" || realPlacement.value == "top-end") {
        return "bottom";
      }
      if (realPlacement.value == "left-start" || realPlacement.value == "left" || realPlacement.value == "left-end") {
        return "right";
      }
      if (realPlacement.value == "right-start" || realPlacement.value == "right" || realPlacement.value == "right-end") {
        return "left";
      }
    });
    const wrapperStyle = computed(() => {
      let style = {};
      if (props.border && props.borderColor) {
        style.borderColor = props.borderColor;
      }
      if (props.background) {
        style.background = props.background;
      }
      if (props.width) {
        style.width = props.width;
      }
      return style;
    });
    const layerStyle = computed(() => {
      let style = {};
      if (obj.number.isNumber(props.zIndex)) {
        style.zIndex = props.zIndex;
      }
      if (props.timeout) {
        style.transition = "transform " + props.timeout + "ms,opacity " + props.timeout + "ms";
        style.webkitTransition = "transform " + props.timeout + "ms,opacity " + props.timeout + "ms";
      }
      if (!props.showTriangle) {
        style.padding = 0;
        if (realPlacement.value == "bottom-start" || realPlacement.value == "bottom" || realPlacement.value == "bottom-end") {
          style.paddingTop = props.offset;
        } else if (realPlacement.value == "top-start" || realPlacement.value == "top" || realPlacement.value == "top-end") {
          style.paddingBottom = props.offset;
        } else if (realPlacement.value == "left-start" || realPlacement.value == "left" || realPlacement.value == "left-end") {
          style.paddingRight = props.offset;
        } else if (realPlacement.value == "right-start" || realPlacement.value == "right" || realPlacement.value == "right-end") {
          style.paddingLeft = props.offset;
        }
      }
      return style;
    });
    const getRelateEl = () => {
      if (props.relate) {
        return document.body.querySelector(props.relate);
      }
      return null;
    };
    const autoAdjust = () => {
      let $relate = getRelateEl();
      let point = obj.element.getElementBounding($relate);
      realPlacement.value = props.placement;
      if (props.placement == "bottom") {
        if (point.bottom < layerRef.value.offsetHeight) {
          if (point.top > layerRef.value.offsetHeight) {
            realPlacement.value = "top";
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-start";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-end";
            }
          } else if (point.left > layerRef.value.offsetWidth) {
            realPlacement.value = "left";
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-end";
            }
          } else if (point.right > layerRef.value.offsetWidth) {
            realPlacement.value = "right";
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-end";
            }
          }
        } else {
          if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
            realPlacement.value = "bottom-start";
          }
          if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
            realPlacement.value = "bottom-end";
          }
        }
      } else if (props.placement == "bottom-start") {
        if (point.bottom < layerRef.value.offsetHeight) {
          if (point.top > layerRef.value.offsetHeight) {
            realPlacement.value = "top-start";
            if (point.right + $relate.offsetWidth < layerRef.value.offsetWidth) {
              realPlacement.value = "top";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-end";
            }
          } else if (point.left > layerRef.value.offsetWidth) {
            realPlacement.value = "left";
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-end";
            }
          } else if (point.right > layerRef.value.offsetWidth) {
            realPlacement.value = "right";
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-end";
            }
          }
        } else {
          if (point.right + $relate.offsetWidth < layerRef.value.offsetWidth) {
            realPlacement.value = "bottom";
          }
          if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
            realPlacement.value = "bottom-end";
          }
        }
      } else if (props.placement == "bottom-end") {
        if (point.bottom < layerRef.value.offsetHeight) {
          if (point.top > layerRef.value.offsetHeight) {
            realPlacement.value = "top-end";
            if (point.left + $relate.offsetWidth < layerRef.value.offsetWidth) {
              realPlacement.value = "top";
            }
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-start";
            }
          } else if (point.left > layerRef.value.offsetWidth) {
            realPlacement.value = "left";
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-end";
            }
          } else if (point.right > layerRef.value.offsetWidth) {
            realPlacement.value = "right";
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-end";
            }
          }
        } else {
          if (point.left + $relate.offsetWidth < layerRef.value.offsetWidth) {
            realPlacement.value = "bottom";
          }
          if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
            realPlacement.value = "bottom-start";
          }
        }
      } else if (props.placement == "top") {
        if (point.top < layerRef.value.offsetHeight) {
          if (point.bottom > layerRef.value.offsetHeight) {
            realPlacement.value = "bottom";
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-start";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-end";
            }
          } else if (point.left > layerRef.value.offsetWidth) {
            realPlacement.value = "left";
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-end";
            }
          } else if (point.right > layerRef.value.offsetWidth) {
            realPlacement.value = "right";
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-end";
            }
          }
        } else {
          if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
            realPlacement.value = "top-start";
          }
          if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
            realPlacement.value = "top-end";
          }
        }
      } else if (props.placement == "top-start") {
        if (point.top < layerRef.value.offsetHeight) {
          if (point.bottom > layerRef.value.offsetHeight) {
            realPlacement.value = "bottom-start";
            if (point.right + $relate.offsetWidth < layerRef.value.offsetWidth) {
              realPlacement.value = "bottom";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-end";
            }
          } else if (point.left > layerRef.value.offsetWidth) {
            realPlacement.value = "left";
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-end";
            }
          } else if (point.right > layerRef.value.offsetWidth) {
            realPlacement.value = "right";
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-end";
            }
          }
        } else {
          if (point.right + $relate.offsetWidth < layerRef.value.offsetWidth) {
            realPlacement.value = "top";
          }
          if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
            realPlacement.value = "top-end";
          }
        }
      } else if (props.placement == "top-end") {
        if (point.top < layerRef.value.offsetHeight) {
          if (point.bottom > layerRef.value.offsetHeight) {
            realPlacement.value = "bottom-end";
            if (point.left + $relate.offsetWidth < layerRef.value.offsetWidth) {
              realPlacement.value = "bottom";
            }
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-start";
            }
          } else if (point.left > layerRef.value.offsetWidth) {
            realPlacement.value = "left";
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-end";
            }
          } else if (point.right > layerRef.value.offsetWidth) {
            realPlacement.value = "right";
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-end";
            }
          }
        } else {
          if (point.left + $relate.offsetWidth < layerRef.value.offsetWidth) {
            realPlacement.value = "top";
          }
          if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
            realPlacement.value = "top-start";
          }
        }
      } else if (props.placement == "left") {
        if (point.left < layerRef.value.offsetWidth) {
          if (point.right > layerRef.value.offsetWidth) {
            realPlacement.value = "right";
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-end";
            }
          } else if (point.top > layerRef.value.offsetHeight) {
            realPlacement.value = "top";
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-start";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-end";
            }
          } else if (point.bottom > layerRef.value.offsetHeight) {
            realPlacement.value = "bottom";
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-start";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-end";
            }
          }
        } else {
          if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
            realPlacement.value = "left-start";
          }
          if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
            realPlacement.value = "left-end";
          }
        }
      } else if (props.placement == "left-start") {
        if (point.left < layerRef.value.offsetWidth) {
          if (point.right > layerRef.value.offsetWidth) {
            realPlacement.value = "right-start";
            if (point.bottom + $relate.offsetHeight < layerRef.value.offsetHeight) {
              realPlacement.value = "right";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-end";
            }
          } else if (point.top > layerRef.value.offsetHeight) {
            realPlacement.value = "top";
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-start";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-end";
            }
          } else if (point.bottom > layerRef.value.offsetHeight) {
            realPlacement.value = "bottom";
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-start";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-end";
            }
          }
        } else {
          if (point.bottom + $relate.offsetHeight < layerRef.value.offsetHeight) {
            realPlacement.value = "left";
          }
          if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
            realPlacement.value = "left-end";
          }
        }
      } else if (props.placement == "left-end") {
        if (point.left < layerRef.value.offsetWidth) {
          if (point.right > layerRef.value.offsetWidth) {
            realPlacement.value = "right-end";
            if (point.top + $relate.offsetHeight < layerRef.value.offsetHeight) {
              realPlacement.value = "right";
            }
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "right-start";
            }
          } else if (point.top > layerRef.value.offsetHeight) {
            realPlacement.value = "top";
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-start";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-end";
            }
          } else if (point.bottom > layerRef.value.offsetHeight) {
            realPlacement.value = "bottom";
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-start";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-end";
            }
          }
        } else {
          if (point.top + $relate.offsetHeight < layerRef.value.offsetHeight) {
            realPlacement.value = "left";
          }
          if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
            realPlacement.value = "left-start";
          }
        }
      } else if (props.placement == "right") {
        if (point.right < layerRef.value.offsetWidth) {
          if (point.left > layerRef.value.offsetWidth) {
            realPlacement.value = "left";
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-end";
            }
          } else if (point.top > layerRef.value.offsetHeight) {
            realPlacement.value = "top";
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-start";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-end";
            }
          } else if (point.bottom > layerRef.value.offsetHeight) {
            realPlacement.value = "bottom";
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-start";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-end";
            }
          }
        } else {
          if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
            realPlacement.value = "right-start";
          }
          if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
            realPlacement.value = "right-end";
          }
        }
      } else if (props.placement == "right-start") {
        if (point.right < layerRef.value.offsetWidth) {
          if (point.left > layerRef.value.offsetWidth) {
            realPlacement.value = "left-start";
            if (point.bottom + $relate.offsetHeight < layerRef.value.offsetHeight) {
              realPlacement.value = "left";
            }
            if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-end";
            }
          } else if (point.top > layerRef.value.offsetHeight) {
            realPlacement.value = "top";
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-start";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-end";
            }
          } else if (point.bottom > layerRef.value.offsetHeight) {
            realPlacement.value = "bottom";
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-start";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-end";
            }
          }
        } else {
          if (point.bottom + $relate.offsetHeight < layerRef.value.offsetHeight) {
            realPlacement.value = "right";
          }
          if (point.bottom + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
            realPlacement.value = "right-end";
          }
        }
      } else if (props.placement == "right-end") {
        if (point.right < layerRef.value.offsetWidth) {
          if (point.left > layerRef.value.offsetWidth) {
            realPlacement.value = "left-end";
            if (point.top + $relate.offsetHeight < layerRef.value.offsetHeight) {
              realPlacement.value = "left";
            }
            if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
              realPlacement.value = "left-start";
            }
          } else if (point.top > layerRef.value.offsetHeight) {
            realPlacement.value = "top";
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-start";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "top-end";
            }
          } else if (point.bottom > layerRef.value.offsetHeight) {
            realPlacement.value = "bottom";
            if (point.left + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-start";
            }
            if (point.right + $relate.offsetWidth / 2 < layerRef.value.offsetWidth / 2) {
              realPlacement.value = "bottom-end";
            }
          }
        } else {
          if (point.top + $relate.offsetHeight < layerRef.value.offsetHeight) {
            realPlacement.value = "right";
          }
          if (point.top + $relate.offsetHeight / 2 < layerRef.value.offsetHeight / 2) {
            realPlacement.value = "right-start";
          }
        }
      }
    };
    const reset = () => {
      if (!obj.element.isElement(layerRef.value)) {
        return;
      }
      if (props.showTriangle) {
        layerRef.value.style.padding = "0";
        if (realPlacement.value == "bottom-start" || realPlacement.value == "bottom" || realPlacement.value == "bottom-end") {
          layerRef.value.style.paddingTop = `calc(${props.offset} + ${triangleRef.value.$el.offsetHeight}px)`;
        } else if (realPlacement.value == "top-start" || realPlacement.value == "top" || realPlacement.value == "top-end") {
          layerRef.value.style.paddingBottom = `calc(${props.offset} + ${triangleRef.value.$el.offsetHeight}px)`;
        } else if (realPlacement.value == "left-start" || realPlacement.value == "left" || realPlacement.value == "left-end") {
          layerRef.value.style.paddingRight = `calc(${props.offset} + ${triangleRef.value.$el.offsetWidth}px)`;
        } else if (realPlacement.value == "right-start" || realPlacement.value == "right" || realPlacement.value == "right-end") {
          layerRef.value.style.paddingLeft = `calc(${props.offset} + ${triangleRef.value.$el.offsetWidth}px)`;
        }
      }
      const $relate = getRelateEl();
      const rect = obj.element.getElementBounding($relate);
      if (realPlacement.value == "bottom" || realPlacement.value == "bottom-start" || realPlacement.value == "bottom-end") {
        layerRef.value.style.top = rect.top + $relate.offsetHeight + "px";
        layerRef.value.style.bottom = "auto";
        if (realPlacement.value == "bottom") {
          layerRef.value.style.left = rect.left + $relate.offsetWidth / 2 - layerRef.value.offsetWidth / 2 + "px";
          layerRef.value.style.right = "auto";
        } else if (realPlacement.value == "bottom-start") {
          layerRef.value.style.left = rect.left + "px";
          layerRef.value.style.right = "auto";
        } else if (realPlacement.value == "bottom-end") {
          layerRef.value.style.left = "auto";
          layerRef.value.style.right = rect.right + "px";
        }
      } else if (realPlacement.value == "top" || realPlacement.value == "top-start" || realPlacement.value == "top-end") {
        layerRef.value.style.top = "auto";
        layerRef.value.style.bottom = rect.bottom + $relate.offsetHeight + "px";
        if (realPlacement.value == "top") {
          layerRef.value.style.left = rect.left + $relate.offsetWidth / 2 - layerRef.value.offsetWidth / 2 + "px";
          layerRef.value.style.right = "auto";
        } else if (realPlacement.value == "top-start") {
          layerRef.value.style.left = rect.left + "px";
          layerRef.value.style.right = "auto";
        } else if (realPlacement.value == "top-end") {
          layerRef.value.style.left = "auto";
          layerRef.value.style.right = rect.right + "px";
        }
      } else if (realPlacement.value == "left" || realPlacement.value == "left-start" || realPlacement.value == "left-end") {
        layerRef.value.style.left = "auto";
        layerRef.value.style.right = rect.right + $relate.offsetWidth + "px";
        if (realPlacement.value == "left") {
          layerRef.value.style.top = rect.top + $relate.offsetHeight / 2 - layerRef.value.offsetHeight / 2 + "px";
          layerRef.value.style.bottom = "auto";
        } else if (realPlacement.value == "left-start") {
          layerRef.value.style.top = rect.top + "px";
          layerRef.value.style.bottom = "auto";
        } else if (realPlacement.value == "left-end") {
          layerRef.value.style.top = "auto";
          layerRef.value.style.bottom = rect.bottom + "px";
        }
      } else if (realPlacement.value == "right" || realPlacement.value == "right-start" || realPlacement.value == "right-end") {
        layerRef.value.style.left = rect.left + $relate.offsetWidth + "px";
        layerRef.value.style.right = "auto";
        if (realPlacement.value == "right") {
          layerRef.value.style.top = rect.top + $relate.offsetHeight / 2 - layerRef.value.offsetHeight / 2 + "px";
          layerRef.value.style.bottom = "auto";
        } else if (realPlacement.value == "right-start") {
          layerRef.value.style.top = rect.top + "px";
          layerRef.value.style.bottom = "auto";
        } else if (realPlacement.value == "right-end") {
          layerRef.value.style.top = "auto";
          layerRef.value.style.bottom = rect.bottom + "px";
        }
      }
    };
    const resetTriangle = () => {
      if (!props.showTriangle || triangleRef.value && !triangleRef.value.$el) {
        return;
      }
      const relateWidth = getRelateEl().offsetWidth;
      const elWidth = layerRef.value.offsetWidth;
      const relateHeight = getRelateEl().offsetHeight;
      const elHeight = layerRef.value.offsetHeight;
      const triWidth = triangleRef.value.$el.offsetWidth;
      const triHeight = triangleRef.value.$el.offsetHeight;
      if (realPlacement.value == "bottom-start") {
        triangleRef.value.$el.style.top = "auto";
        triangleRef.value.$el.style.right = "auto";
        triangleRef.value.$el.style.bottom = "100%";
        triangleRef.value.$el.style.left = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + "px";
      } else if (realPlacement.value == "bottom") {
        triangleRef.value.$el.style.top = "auto";
        triangleRef.value.$el.style.right = "auto";
        triangleRef.value.$el.style.bottom = "100%";
        triangleRef.value.$el.style.left = elWidth / 2 - triWidth / 2 + "px";
      } else if (realPlacement.value == "bottom-end") {
        triangleRef.value.$el.style.top = "auto";
        triangleRef.value.$el.style.left = "auto";
        triangleRef.value.$el.style.bottom = "100%";
        triangleRef.value.$el.style.right = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + "px";
      } else if (realPlacement.value == "top-start") {
        triangleRef.value.$el.style.top = "100%";
        triangleRef.value.$el.style.right = "auto";
        triangleRef.value.$el.style.bottom = "auto";
        triangleRef.value.$el.style.left = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + "px";
      } else if (realPlacement.value == "top") {
        triangleRef.value.$el.style.top = "100%";
        triangleRef.value.$el.style.right = "auto";
        triangleRef.value.$el.style.bottom = "auto";
        triangleRef.value.$el.style.left = elWidth / 2 - triWidth / 2 + "px";
      } else if (realPlacement.value == "top-end") {
        triangleRef.value.$el.style.top = "100%";
        triangleRef.value.$el.style.left = "auto";
        triangleRef.value.$el.style.bottom = "auto";
        triangleRef.value.$el.style.right = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + "px";
      } else if (realPlacement.value == "left-start") {
        triangleRef.value.$el.style.left = "100%";
        triangleRef.value.$el.style.right = "auto";
        triangleRef.value.$el.style.top = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + "px";
        triangleRef.value.$el.style.bottom = "auto";
      } else if (realPlacement.value == "left") {
        triangleRef.value.$el.style.left = "100%";
        triangleRef.value.$el.style.right = "auto";
        triangleRef.value.$el.style.top = elHeight / 2 - triHeight / 2 + "px";
        triangleRef.value.$el.style.bottom = "auto";
      } else if (realPlacement.value == "left-end") {
        triangleRef.value.$el.style.left = "100%";
        triangleRef.value.$el.style.right = "auto";
        triangleRef.value.$el.style.bottom = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + "px";
        triangleRef.value.$el.style.top = "auto";
      } else if (realPlacement.value == "right-start") {
        triangleRef.value.$el.style.right = "100%";
        triangleRef.value.$el.style.left = "auto";
        triangleRef.value.$el.style.top = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + "px";
        triangleRef.value.$el.style.bottom = "auto";
      } else if (realPlacement.value == "right") {
        triangleRef.value.$el.style.right = "100%";
        triangleRef.value.$el.style.left = "auto";
        triangleRef.value.$el.style.top = elHeight / 2 - triHeight / 2 + "px";
        triangleRef.value.$el.style.bottom = "auto";
      } else if (realPlacement.value == "right-end") {
        triangleRef.value.$el.style.right = "100%";
        triangleRef.value.$el.style.left = "auto";
        triangleRef.value.$el.style.bottom = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + "px";
        triangleRef.value.$el.style.top = "auto";
      }
    };
    const update = () => {
      if (layerShow.value && firstShow.value) {
        autoAdjust();
        reset();
        nextTick(() => {
          resetTriangle();
        });
      }
    };
    const handleScroll = () => {
      const handleScroll2 = (el) => {
        obj.event.on(el, `scroll.layer_${instance.uid}`, () => {
          emits("update:modelValue", false);
        });
        if (el.parentNode) {
          handleScroll2(el.parentNode);
        }
      };
      const relate = getRelateEl();
      if (relate.parentNode) {
        handleScroll2(relate.parentNode);
      }
    };
    const removeScroll = () => {
      const removeScroll2 = (el) => {
        obj.event.off(el, `scroll.layer_${instance.uid}`);
        if (el.parentNode) {
          removeScroll2(el.parentNode);
        }
      };
      const relate = getRelateEl();
      if (relate.parentNode) {
        removeScroll2(relate.parentNode);
      }
    };
    const beforeEnter = (el) => {
      if (obj.data.get(el, "mvi-layer-beforeEnter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-layer-beforeEnter-trigger", true);
      emits("show", el);
      if (typeof instance.appContext.config.globalProperties.layerComponentWatch == "function") {
        instance.appContext.config.globalProperties.layerComponentWatch.apply(instance.proxy, ["show", el]);
      }
    };
    const enter = (el) => {
      if (obj.data.get(el, "mvi-layer-enter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-layer-enter-trigger", true);
      nextTick(() => {
        update();
        emits("showing", el);
        if (typeof instance.appContext.config.globalProperties.layerComponentWatch == "function") {
          instance.appContext.config.globalProperties.layerComponentWatch.apply(instance.proxy, ["showing", el]);
        }
      });
    };
    const afterEnter = (el) => {
      emits("shown", el);
      if (typeof instance.appContext.config.globalProperties.layerComponentWatch == "function") {
        instance.appContext.config.globalProperties.layerComponentWatch.apply(instance.proxy, ["shown", el]);
      }
    };
    const beforeLeave = (el) => {
      obj.data.remove(el, "mvi-layer-beforeEnter-trigger");
      obj.data.remove(el, "mvi-layer-enter-trigger");
      emits("hide", el);
      if (typeof instance.appContext.config.globalProperties.layerComponentWatch == "function") {
        instance.appContext.config.globalProperties.layerComponentWatch.apply(instance.proxy, ["hide", el]);
      }
    };
    const leave = (el) => {
      emits("hidding", el);
      if (typeof instance.appContext.config.globalProperties.layerComponentWatch == "function") {
        instance.appContext.config.globalProperties.layerComponentWatch.apply(instance.proxy, ["hidding", el]);
      }
    };
    const afterLeave = (el) => {
      emits("hidden", el);
      if (typeof instance.appContext.config.globalProperties.layerComponentWatch == "function") {
        instance.appContext.config.globalProperties.layerComponentWatch.apply(instance.proxy, ["hidden", el]);
      }
    };
    watch(
      () => props.placement,
      () => {
        update();
      }
    );
    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue) {
          if (!firstShow.value) {
            firstShow.value = true;
          }
        }
        layerShow.value = newValue;
      }
    );
    onMounted(() => {
      if (props.modelValue) {
        if (!firstShow.value) {
          firstShow.value = true;
        }
        layerShow.value = props.modelValue;
      }
      handleScroll();
      obj.event.on(window, `resize.layer_${instance.uid}`, update);
      obj.event.on(window, `click.layer_${instance.uid}`, (event2) => {
        if (layerShow.value && firstShow.value && props.closable) {
          if (obj.element.isContains(layerRef.value, event2.target) || obj.element.isContains(getRelateEl(), event2.target)) {
            return;
          }
          emits("update:modelValue", false);
        }
      });
    });
    onBeforeUnmount(() => {
      removeScroll();
      obj.event.off(window, `resize.layer_${instance.uid} click.layer_${instance.uid}`);
    });
    __expose({
      $$el,
      update
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, {
          name: _ctx.animation || "mvi-layer",
          onBeforeEnter: beforeEnter,
          onEnter: enter,
          onAfterEnter: afterEnter,
          onLeave: leave,
          onBeforeLeave: beforeLeave,
          onAfterLeave: afterLeave
        }, {
          default: withCtx(() => [
            firstShow.value ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              ref_key: "layerRef",
              ref: layerRef,
              class: "mvi-layer",
              style: layerStyle.value
            }, _ctx.$attrs), [
              createElementVNode("div", {
                class: normalizeClass(["mvi-layer-wrapper", { shadow: _ctx.shadow, border: _ctx.border }]),
                style: normalizeStyle(wrapperStyle.value)
              }, [
                _ctx.showTriangle ? (openBlock(), createBlock(unref(Triangle), {
                  key: 0,
                  ref_key: "triangleRef",
                  ref: triangleRef,
                  class: "mvi-layer-triangle",
                  placement: trianglePlacement.value,
                  background: _ctx.background,
                  "border-color": _ctx.border && _ctx.borderColor ? _ctx.borderColor : _ctx.background,
                  size: "0.14rem"
                }, null, 8, ["placement", "background", "border-color"])) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ], 6)
            ], 16)), [
              [vShow, layerShow.value]
            ]) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name"])
      ]);
    };
  }
});
const Layer = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["__scopeId", "data-v-0101133d"]]);
Layer.install = (app) => {
  app.component(Layer.name, Layer);
};
const LabelProps = {
  //标签样式
  type: {
    type: String,
    default: "default",
    validator(value) {
      return ["default", "error", "info", "primary", "success", "warn"].includes(value);
    }
  },
  //标签大小
  size: {
    type: String,
    default: "medium",
    validator(value) {
      return ["medium", "large"].includes(value);
    }
  },
  //是否为朴素样式
  plain: {
    type: Boolean,
    default: false
  },
  //是否为圆角样式
  round: {
    type: Boolean,
    default: false
  },
  //是否为标记样式
  mark: {
    type: Boolean,
    default: false
  },
  //是否可关闭
  closable: {
    type: Boolean,
    default: false
  },
  //标记样式时是否反向
  reverse: {
    type: Boolean,
    default: false
  }
};
const _sfc_main$_ = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-label"
  },
  __name: "label",
  props: LabelProps,
  setup(__props) {
    const props = __props;
    const show = ref(true);
    const labelClass = computed(() => {
      let cls = [];
      if (props.size) {
        cls.push(props.size);
      }
      if (props.type) {
        cls.push(props.type);
      }
      if (props.plain) {
        cls.push("plain");
      }
      if (props.round) {
        cls.push("round");
      }
      if (props.mark) {
        cls.push("mark");
        if (props.reverse) {
          cls.push("reverse");
        }
      }
      return cls;
    });
    const closeLabel = () => {
      show.value = false;
    };
    return (_ctx, _cache) => {
      return _ctx.closable ? (openBlock(), createBlock(Transition, {
        key: 0,
        name: "mvi-label"
      }, {
        default: withCtx(() => [
          show.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["mvi-label", labelClass.value])
          }, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true),
            createElementVNode("span", {
              class: "mvi-label-closable",
              onClick: closeLabel
            }, [
              createVNode(unref(Icon), { type: "times" })
            ])
          ], 2)) : createCommentVNode("", true)
        ]),
        _: 3
      })) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(["mvi-label", labelClass.value])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2));
    };
  }
});
const Label = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["__scopeId", "data-v-a312f784"]]);
Label.install = (app) => {
  app.component(Label.name, Label);
};
const InputProps = {
  //输入框的值
  modelValue: {
    type: [String, Number],
    default: ""
  },
  //占位符
  placeholder: {
    type: String,
    default: ""
  },
  //输入框左侧文本
  label: {
    type: String,
    default: null
  },
  //左侧文本宽度
  labelWidth: {
    type: String,
    default: null
  },
  //左侧文本对齐方式
  labelAlign: {
    type: String,
    default: "left",
    validator(value) {
      return ["left", "center", "right"].includes(value);
    }
  },
  //文本与输入框的间距
  labelOffset: {
    type: String,
    default: null
  },
  //输入框类型
  type: {
    type: String,
    default: "text",
    validator(value) {
      return ["text", "password", "number", "tel", "textarea"].includes(value);
    }
  },
  //原生name属性
  name: {
    type: String,
    default: null
  },
  //最大字数限制
  maxlength: {
    type: Number,
    default: -1
  },
  //输入框尺寸
  size: {
    type: String,
    default: "medium",
    validator(value) {
      return ["medium", "large"].includes(value);
    }
  },
  //是否显示下边框
  border: {
    type: Boolean,
    default: false
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //是否只读
  readonly: {
    type: Boolean,
    default: false
  },
  //是否显示表单必填星号
  required: {
    type: Boolean,
    default: false
  },
  //是否启用清除图标
  clearable: {
    type: Boolean,
    default: false
  },
  //是否自动聚焦
  autofocus: {
    type: Boolean,
    default: false
  },
  //是否显示字数统计，需要设置maxlength属性
  showWordLimit: {
    type: Boolean,
    default: false
  },
  //文本左侧图标
  left: {
    type: [String, Object],
    default: null
  },
  //右侧图标
  right: {
    type: [String, Object],
    default: null
  },
  //type=textarea时的行数
  rows: {
    type: Number,
    default: 1
  },
  //自动调整高度
  autosize: {
    type: [Boolean, Object],
    default: false,
    validator(value) {
      if (obj.common.isObject(value)) {
        if (obj.number.isNumber(value.minRows) && obj.number.isNumber(value.maxRows)) {
          if (value.minRows > value.maxRows) {
            return false;
          }
        }
      }
      return true;
    }
  },
  //文本对齐方式
  align: {
    type: String,
    default: "left",
    validator(value) {
      return ["left", "center", "right"].includes(value);
    }
  },
  //输入框调起移动端键盘类型
  inputMode: {
    type: String,
    default: "text",
    validator(value) {
      return ["none", "text", "decimal", "numeric", "tel", "search", "email", "url"].includes(value);
    }
  }
};
const _hoisted_1$L = ["disabled", "data-type"];
const _hoisted_2$B = ["textContent"];
const _hoisted_3$v = ["placeholder", "maxlength", "disabled", "readonly", "autofocus", "rows", "name"];
const _hoisted_4$n = ["type", "inputmode", "placeholder", "maxlength", "disabled", "readonly", "autofocus", "name"];
const _hoisted_5$e = {
  key: 6,
  class: "mvi-input-words"
};
const _sfc_main$Z = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-input"
  },
  __name: "input",
  props: InputProps,
  emits: ["update:modelValue", "left-click", "right-click", "focus", "blur", "input", "clear", "keydown", "keyup"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const focus = ref(false);
    const textareaRef = ref(null);
    const inputRef = ref(null);
    const inputClass = computed(() => {
      let cls = [props.size];
      if (props.border) {
        cls.push("border");
      }
      if (props.showWordLimit && props.maxlength > 0) {
        cls.push("words");
      }
      if (props.required) {
        cls.push("required");
      }
      return cls;
    });
    const realValue = computed({
      set(value) {
        if (props.modelValue !== value) {
          emits("update:modelValue", value);
        }
      },
      get() {
        let value = props.modelValue === null ? "" : props.modelValue.toString();
        if (props.type == "number") {
          value = value.replace(/\D/g, "");
        }
        if (props.maxlength > 0 && value.length > props.maxlength) {
          value = value.substring(0, props.maxlength);
        }
        if (props.modelValue !== value) {
          emits("update:modelValue", value);
        }
        return value;
      }
    });
    const showClear = computed(() => {
      if (props.disabled || props.readonly) {
        return false;
      }
      if (realValue.value && focus.value) {
        return true;
      }
      return false;
    });
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const cmpType = computed(() => {
      if (props.type == "number") {
        return "text";
      }
      return props.type;
    });
    const rowsFilter = computed(() => {
      let rows = props.rows;
      if (obj.common.isObject(props.autosize)) {
        if (obj.number.isNumber(props.autosize.minRows)) {
          if (props.rows < props.autosize.minRows) {
            rows = props.autosize.minRows;
          }
        }
        if (obj.number.isNumber(props.autosize.maxRows)) {
          if (props.rows > props.autosize.maxRows) {
            rows = props.autosize.maxRows;
          }
        }
      }
      return rows;
    });
    const labelStyle = computed(() => {
      let style = {};
      if (props.labelWidth) {
        style.width = props.labelWidth;
      }
      if (props.labelAlign) {
        if (props.labelAlign == "left") {
          style.justifyContent = "flex-start";
        } else if (props.labelAlign == "right") {
          style.justifyContent = "flex-end";
        } else {
          style.justifyContent = props.labelAlign;
        }
      }
      if (props.labelOffset) {
        style.marginRight = props.labelOffset;
      }
      return style;
    });
    const inputStyle = computed(() => {
      return {
        textAlign: props.align ? props.align : ""
      };
    });
    const showLeft = computed(() => {
      return !!(useSlots().left || parseIcon.value(props.left).type || parseIcon.value(props.left).url);
    });
    const showRight = computed(() => {
      return !!(useSlots().right || parseIcon.value(props.right).type || parseIcon.value(props.right).url);
    });
    const autosizeSet = () => {
      textareaRef.value.style.height = "auto";
      textareaRef.value.scrollTop = 0;
      textareaRef.value.style.height = obj.element.getScrollHeight(textareaRef.value) + "px";
    };
    const rows2Height = (rows) => {
      let lineHeight = Math.floor(parseFloat(obj.element.getCssStyle(textareaRef.value, "line-height")));
      return rows * lineHeight;
    };
    const setMaxMinHeight = () => {
      if (obj.common.isObject(props.autosize)) {
        if (obj.number.isNumber(props.autosize.maxRows)) {
          let maxHeight = rows2Height(props.autosize.maxRows);
          textareaRef.value.style.maxHeight = maxHeight + "px";
        }
        if (obj.number.isNumber(props.autosize.minRows)) {
          let minHeight = rows2Height(props.autosize.minRows);
          textareaRef.value.style.minHeight = minHeight + "px";
        }
      } else {
        textareaRef.value.style.maxHeight = "";
        textareaRef.value.style.minHeight = "";
      }
    };
    const keydown = (e) => {
      if (props.disabled) {
        return;
      }
      emits("keydown", e, realValue.value);
    };
    const keyup = (e) => {
      if (props.disabled) {
        return;
      }
      emits("keyup", e, realValue.value);
    };
    const inputFocus = () => {
      if (props.disabled) {
        return;
      }
      focus.value = true;
      emits("focus", realValue.value);
    };
    const inputBlur = () => {
      if (props.disabled) {
        return;
      }
      setTimeout(() => {
        focus.value = false;
        emits("blur", realValue.value);
      }, 200);
    };
    const input = () => {
      if (props.disabled) {
        return;
      }
      emits("input", realValue.value);
    };
    const leftClick = () => {
      if (props.disabled) {
        return;
      }
      emits("left-click", realValue.value);
    };
    const rightClick = () => {
      if (props.disabled) {
        return;
      }
      emits("right-click", realValue.value);
    };
    const doClear = () => {
      if (props.disabled) {
        return;
      }
      if (!props.clearable) {
        return;
      }
      setTimeout(() => {
        realValue.value = "";
        let el = inputRef.value || textareaRef.value;
        el.focus();
        emits("clear", realValue.value);
      }, 210);
    };
    onMounted(() => {
      if (textareaRef.value) {
        setMaxMinHeight();
        if (props.autosize == true || obj.common.isObject(props.autosize)) {
          autosizeSet();
        }
      }
    });
    watch(
      () => realValue.value,
      () => {
        if (textareaRef.value && (props.autosize == true || obj.common.isObject(props.autosize))) {
          autosizeSet();
        }
      }
    );
    watch(
      () => [props.autosize, props.rows],
      () => {
        if (textareaRef.value) {
          setMaxMinHeight();
        }
      }
    );
    watch(
      () => showClear.value,
      () => {
        nextTick(() => {
          if (textareaRef.value && (props.autosize == true || obj.common.isObject(props.autosize))) {
            autosizeSet();
          }
        });
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        disabled: _ctx.disabled || null,
        class: normalizeClass(["mvi-input-container", inputClass.value]),
        "data-type": _ctx.type
      }, [
        showLeft.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          onClick: leftClick,
          class: "mvi-input-left"
        }, [
          _ctx.$slots.left ? renderSlot(_ctx.$slots, "left", { key: 0 }, void 0, true) : (openBlock(), createBlock(unref(Icon), {
            key: 1,
            type: parseIcon.value(_ctx.left).type,
            url: parseIcon.value(_ctx.left).url,
            spin: parseIcon.value(_ctx.left).spin,
            size: parseIcon.value(_ctx.left).size,
            color: parseIcon.value(_ctx.left).color
          }, null, 8, ["type", "url", "spin", "size", "color"]))
        ])) : createCommentVNode("", true),
        _ctx.label ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "mvi-input-label",
          style: normalizeStyle(labelStyle.value)
        }, [
          createElementVNode("span", {
            textContent: toDisplayString(_ctx.label)
          }, null, 8, _hoisted_2$B)
        ], 4)) : createCommentVNode("", true),
        _ctx.type == "textarea" ? withDirectives((openBlock(), createElementBlock("textarea", {
          key: 2,
          placeholder: _ctx.placeholder,
          maxlength: _ctx.maxlength,
          disabled: _ctx.disabled,
          readonly: _ctx.readonly,
          autofocus: _ctx.autofocus,
          class: "mvi-textarea",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => realValue.value = $event),
          onInput: input,
          ref_key: "textareaRef",
          ref: textareaRef,
          rows: rowsFilter.value,
          name: _ctx.name,
          style: normalizeStyle(inputStyle.value),
          onFocus: inputFocus,
          onBlur: inputBlur,
          autocomplete: "off",
          onKeydown: keydown,
          onKeyup: keyup
        }, null, 44, _hoisted_3$v)), [
          [vModelText, realValue.value]
        ]) : withDirectives((openBlock(), createElementBlock("input", {
          key: 3,
          type: cmpType.value,
          inputmode: _ctx.inputMode,
          placeholder: _ctx.placeholder,
          maxlength: _ctx.maxlength,
          disabled: _ctx.disabled,
          readonly: _ctx.readonly,
          autofocus: _ctx.autofocus,
          class: "mvi-input",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => realValue.value = $event),
          onInput: input,
          ref_key: "inputRef",
          ref: inputRef,
          name: _ctx.name,
          style: normalizeStyle(inputStyle.value),
          onFocus: inputFocus,
          onBlur: inputBlur,
          autocomplete: "off",
          onKeydown: keydown,
          onKeyup: keyup
        }, null, 44, _hoisted_4$n)), [
          [vModelDynamic, realValue.value]
        ]),
        _ctx.clearable ? withDirectives((openBlock(), createElementBlock("div", {
          key: 4,
          onClick: doClear,
          class: "mvi-input-clear"
        }, [
          createVNode(unref(Icon), { type: "times-o" })
        ], 512)), [
          [vShow, showClear.value]
        ]) : createCommentVNode("", true),
        showRight.value ? (openBlock(), createElementBlock("div", {
          key: 5,
          onClick: rightClick,
          class: "mvi-input-right"
        }, [
          _ctx.$slots.right ? renderSlot(_ctx.$slots, "right", { key: 0 }, void 0, true) : (openBlock(), createBlock(unref(Icon), {
            key: 1,
            type: parseIcon.value(_ctx.right).type,
            url: parseIcon.value(_ctx.right).url,
            spin: parseIcon.value(_ctx.right).spin,
            size: parseIcon.value(_ctx.right).size,
            color: parseIcon.value(_ctx.right).color
          }, null, 8, ["type", "url", "spin", "size", "color"]))
        ])) : createCommentVNode("", true),
        _ctx.showWordLimit && _ctx.maxlength > 0 ? (openBlock(), createElementBlock("div", _hoisted_5$e, toDisplayString(realValue.value.length) + "/" + toDisplayString(_ctx.maxlength), 1)) : createCommentVNode("", true)
      ], 10, _hoisted_1$L);
    };
  }
});
const Input = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["__scopeId", "data-v-935dc541"]]);
Input.install = (app) => {
  app.component(Input.name, Input);
};
const LoadingProps = {
  //类型
  type: {
    type: String,
    default: "default",
    validator(value) {
      return ["default", "circle", "dots", "spin", "transfer"].includes(value);
    }
  },
  //颜色
  color: {
    type: String,
    default: "#bbb"
  },
  //尺寸
  size: {
    type: String,
    default: "0.6rem"
  }
};
const _withScopeId$4 = (n) => (pushScopeId("data-v-0ad692f7"), n = n(), popScopeId(), n);
const _hoisted_1$K = { class: "mvi-loading" };
const _hoisted_2$A = ["width", "height", "stroke"];
const _hoisted_3$u = /* @__PURE__ */ createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-0ad692f7><g transform="translate(1 1)" stroke-width="2" data-v-0ad692f7><circle stroke-opacity=".2" cx="18" cy="18" r="18" data-v-0ad692f7></circle><path d="M36 18c0-9.94-8.06-18-18-18" data-v-0ad692f7><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" data-v-0ad692f7></animateTransform></path></g></g>', 1);
const _hoisted_4$m = [
  _hoisted_3$u
];
const _hoisted_5$d = ["width", "height", "fill"];
const _hoisted_6$b = /* @__PURE__ */ createStaticVNode('<circle cx="30" cy="30" r="30" data-v-0ad692f7><animate attributeName="r" from="30" to="30" begin="0s" dur="0.8s" values="30;18;30" calcMode="linear" repeatCount="indefinite" data-v-0ad692f7></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" data-v-0ad692f7></animate></circle><circle cx="120" cy="30" r="18" fill-opacity="0.3" data-v-0ad692f7><animate attributeName="r" from="18" to="18" begin="0s" dur="0.8s" values="18;30;18" calcMode="linear" repeatCount="indefinite" data-v-0ad692f7></animate><animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s6s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite" data-v-0ad692f7></animate></circle><circle cx="210" cy="30" r="30" data-v-0ad692f7><animate attributeName="r" from="30" to="30" begin="0s" dur="0.8s" values="30;18;30" calcMode="linear" repeatCount="indefinite" data-v-0ad692f7></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" data-v-0ad692f7></animate></circle>', 3);
const _hoisted_9$4 = [
  _hoisted_6$b
];
const _hoisted_10$2 = ["width", "height"];
const _hoisted_11$2 = ["id"];
const _hoisted_12$2 = ["stop-color"];
const _hoisted_13$2 = ["stop-color"];
const _hoisted_14$1 = ["stop-color"];
const _hoisted_15 = {
  fill: "none",
  "fill-rule": "evenodd"
};
const _hoisted_16 = { transform: "translate(1 1)" };
const _hoisted_17 = ["stroke"];
const _hoisted_18 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("animateTransform", {
  attributeName: "transform",
  type: "rotate",
  from: "0 18 18",
  to: "360 18 18",
  dur: "0.9s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_19 = [
  _hoisted_18
];
const _hoisted_20 = ["fill"];
const _hoisted_21 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("animateTransform", {
  attributeName: "transform",
  type: "rotate",
  from: "0 18 18",
  to: "360 18 18",
  dur: "0.9s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_22 = [
  _hoisted_21
];
const _hoisted_23 = ["width", "height"];
const _hoisted_24 = ["fill"];
const _hoisted_25 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "opacity",
  attributeType: "XML",
  values: "0.2; 1; .2",
  begin: "0s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_26 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "height",
  attributeType: "XML",
  values: "10; 20; 10",
  begin: "0s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_27 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "y",
  attributeType: "XML",
  values: "10; 5; 10",
  begin: "0s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_28 = [
  _hoisted_25,
  _hoisted_26,
  _hoisted_27
];
const _hoisted_29 = ["fill"];
const _hoisted_30 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "opacity",
  attributeType: "XML",
  values: "0.2; 1; .2",
  begin: "0.15s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_31 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "height",
  attributeType: "XML",
  values: "10; 20; 10",
  begin: "0.15s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_32 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "y",
  attributeType: "XML",
  values: "10; 5; 10",
  begin: "0.15s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_33 = [
  _hoisted_30,
  _hoisted_31,
  _hoisted_32
];
const _hoisted_34 = ["fill"];
const _hoisted_35 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "opacity",
  attributeType: "XML",
  values: "0.2; 1; .2",
  begin: "0.3s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_36 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "height",
  attributeType: "XML",
  values: "10; 20; 10",
  begin: "0.3s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_37 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "y",
  attributeType: "XML",
  values: "10; 5; 10",
  begin: "0.3s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_38 = [
  _hoisted_35,
  _hoisted_36,
  _hoisted_37
];
const _sfc_main$Y = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-loading"
  },
  __name: "loading",
  props: LoadingProps,
  setup(__props) {
    const props = __props;
    const instance = getCurrentInstance();
    const loadingStyle = computed(() => {
      let style = {};
      style.background = props.color;
      style.width = "calc(" + props.size + "/20)";
      style.height = "calc(" + props.size + "/4)";
      style.transformOrigin = "calc(" + props.size + "/40) calc(" + props.size + "/2)";
      style.webkitTransformOrigin = "calc(" + props.size + "/40) calc(" + props.size + "/2)";
      return style;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$K, [
        _ctx.type == "default" ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "mvi-loading-default",
          style: normalizeStyle({ width: _ctx.size, height: _ctx.size })
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(new Array(12), () => {
            return openBlock(), createElementBlock("div", {
              style: normalizeStyle(loadingStyle.value)
            }, null, 4);
          }), 256))
        ], 4)) : _ctx.type == "circle" ? (openBlock(), createElementBlock("svg", {
          key: 1,
          xmlns: "https://www.w3.org/2000/svg",
          width: _ctx.size,
          height: _ctx.size,
          viewBox: "0 0 38 38",
          stroke: _ctx.color
        }, _hoisted_4$m, 8, _hoisted_2$A)) : _ctx.type == "dots" ? (openBlock(), createElementBlock("svg", {
          key: 2,
          xmlns: "https://www.w3.org/2000/svg",
          width: _ctx.size,
          height: _ctx.size,
          viewBox: "0 0 240 60",
          fill: _ctx.color
        }, _hoisted_9$4, 8, _hoisted_5$d)) : _ctx.type == "spin" ? (openBlock(), createElementBlock("svg", {
          key: 3,
          xmlns: "https://www.w3.org/2000/svg",
          width: _ctx.size,
          height: _ctx.size,
          viewBox: "0 0 38 38"
        }, [
          createElementVNode("defs", null, [
            createElementVNode("linearGradient", {
              x1: "8.042%",
              y1: "0%",
              x2: "65.682%",
              y2: "23.865%",
              id: `spin_${unref(instance).uid}`
            }, [
              createElementVNode("stop", {
                "stop-color": _ctx.color,
                "stop-opacity": "0",
                offset: "0%"
              }, null, 8, _hoisted_12$2),
              createElementVNode("stop", {
                "stop-color": _ctx.color,
                "stop-opacity": ".631",
                offset: "63.146%"
              }, null, 8, _hoisted_13$2),
              createElementVNode("stop", {
                "stop-color": _ctx.color,
                offset: "100%"
              }, null, 8, _hoisted_14$1)
            ], 8, _hoisted_11$2)
          ]),
          createElementVNode("g", _hoisted_15, [
            createElementVNode("g", _hoisted_16, [
              createElementVNode("path", {
                d: "M36 18c0-9.94-8.06-18-18-18",
                stroke: `url(#spin_${unref(instance).uid})`,
                "stroke-width": "2"
              }, _hoisted_19, 8, _hoisted_17),
              createElementVNode("circle", {
                fill: _ctx.color,
                cx: "36",
                cy: "18",
                r: "1"
              }, _hoisted_22, 8, _hoisted_20)
            ])
          ])
        ], 8, _hoisted_10$2)) : _ctx.type == "transfer" ? (openBlock(), createElementBlock("svg", {
          key: 4,
          xmlns: "http://www.w3.org/2000/svg",
          width: _ctx.size,
          height: _ctx.size,
          viewBox: "0 0 25 30"
        }, [
          createElementVNode("rect", {
            x: "0",
            y: "10",
            width: "5",
            height: "10",
            fill: _ctx.color,
            opacity: "0.2"
          }, _hoisted_28, 8, _hoisted_24),
          createElementVNode("rect", {
            x: "10",
            y: "10",
            width: "5",
            height: "10",
            fill: _ctx.color,
            opacity: "0.2"
          }, _hoisted_33, 8, _hoisted_29),
          createElementVNode("rect", {
            x: "20",
            y: "10",
            width: "5",
            height: "10",
            fill: _ctx.color,
            opacity: "0.2"
          }, _hoisted_38, 8, _hoisted_34)
        ], 8, _hoisted_23)) : createCommentVNode("", true)
      ]);
    };
  }
});
const Loading = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__scopeId", "data-v-0ad692f7"]]);
Loading.install = (app) => {
  app.component(Loading.name, Loading);
};
const LoadingBarProps = {
  //进度条颜色
  color: {
    type: String,
    default: null
  },
  //进度条层级
  zIndex: {
    type: Number,
    default: null
  },
  //进度条移除方法
  __remove: {
    type: Function,
    default: function() {
      return function() {
      };
    }
  },
  //进度条初始化方法
  __init: {
    type: Function,
    default: function() {
      return function() {
      };
    }
  }
};
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-loading-bar"
  },
  __name: "loading-bar",
  props: LoadingBarProps,
  setup(__props, { expose: __expose }) {
    const instance = getCurrentInstance();
    const props = __props;
    const opacityTime = ref(300);
    const widthEnterTime = ref(4e3);
    const widthLeaveTime = ref(2e3);
    const timer = ref(null);
    const hasTriggerLeave = ref(false);
    const barRef = ref(null);
    const cmpColor = computed(() => {
      if (typeof props.color == "string" && props.color) {
        return props.color;
      }
      return null;
    });
    const cmpZIndex = computed(() => {
      if (obj.number.isNumber(props.zIndex)) {
        return props.zIndex;
      }
      return null;
    });
    const barStyle = computed(() => {
      let style = {};
      if (cmpColor) {
        style.background = cmpColor.value;
      }
      if (cmpZIndex) {
        style.zIndex = cmpZIndex.value;
      }
      return style;
    });
    const addTransition = (type) => {
      if (type == "enter") {
        barRef.value.style.transition = `opacity ${opacityTime.value}ms linear, width ${widthEnterTime.value}ms ease-out`;
      } else if (type == "leave") {
        barRef.value.style.transition = `opacity ${opacityTime.value}ms ${widthLeaveTime.value}ms linear, width ${widthLeaveTime.value}ms ease`;
      }
      barRef.value.offsetWidth;
    };
    const removeTransition = () => {
      barRef.value.style.transition = "";
      barRef.value.offsetWidth;
    };
    const enter = () => {
      removeTransition();
      barRef.value.style.width = "0";
      addTransition("enter");
      barRef.value.style.width = window.innerWidth * 0.9 + "px";
      barRef.value.style.opacity = "1";
    };
    const leave = () => {
      if (hasTriggerLeave.value) {
        return;
      }
      hasTriggerLeave.value = true;
      addTransition("leave");
      barRef.value.style.width = window.innerWidth + "px";
      barRef.value.style.opacity = "0";
      timer.value = setTimeout(() => {
        props.__remove();
      }, widthLeaveTime.value + opacityTime.value);
    };
    onMounted(() => {
      props.__init(instance);
      enter();
    });
    onBeforeUnmount(() => {
      if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
      }
    });
    __expose({
      leave
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createElementVNode("div", {
          class: "mvi-loading-bar",
          ref_key: "barRef",
          ref: barRef,
          style: normalizeStyle(barStyle.value)
        }, null, 4)
      ]);
    };
  }
});
const LoadingBarComponent = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__scopeId", "data-v-74063300"]]);
const LoadingBar = {
  //初始化参数
  initParams: (options) => {
    let opts = {};
    if (obj.common.isObject(options)) {
      opts.color = options.color;
      opts.zIndex = options.zIndex;
    } else if (typeof options == "string") {
      opts.color = options;
    }
    return opts;
  },
  //显示加载进度条
  showLoadingBar: (options) => {
    return new Promise((resolve) => {
      if (LoadingBar.$el && LoadingBar.$instance) {
        LoadingBar.$instance.unmount();
        LoadingBar.$el.remove();
      }
      let opts = LoadingBar.initParams(options);
      let mountNode = obj.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(LoadingBarComponent, {
        ...opts,
        __init: (vm) => {
          LoadingBar.$vm = vm;
        },
        __remove: () => {
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
  //关闭加载进度条
  hideLoadingBar: () => {
    if (LoadingBar.$vm) {
      LoadingBar.$vm.exposed.leave();
    }
  },
  //注册函数
  install: (app) => {
    app.config.globalProperties.$showLoadingBar = LoadingBar.showLoadingBar;
    app.provide("$showLoadingBar", LoadingBar.showLoadingBar);
    app.config.globalProperties.$hideLoadingBar = LoadingBar.hideLoadingBar;
    app.provide("$hideLoadingBar", LoadingBar.hideLoadingBar);
  }
};
const MsgboxProps = {
  //提示文本
  message: {
    type: String,
    default: null
  },
  //动画效果
  animation: {
    type: String,
    default: null
  },
  //自动关闭的时间
  timeout: {
    type: Number,
    default: null
  },
  //弹窗z-index
  zIndex: {
    type: Number,
    default: null
  },
  //弹窗背景色
  background: {
    type: String,
    default: null
  },
  //弹窗字体颜色
  color: {
    type: String,
    default: null
  },
  //移除方法
  __remove: {
    type: Function,
    default: function() {
      return function() {
      };
    }
  }
};
const _hoisted_1$J = ["textContent"];
const _sfc_main$W = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false,
    name: "m-msgbox"
  },
  __name: "msgbox",
  props: MsgboxProps,
  setup(__props) {
    const props = __props;
    const show = ref(false);
    const cpmMessage = computed(() => {
      if (typeof props.message == "string") {
        return props.message;
      }
      if (obj.common.isObject(props.message)) {
        return JSON.stringify(props.message);
      }
      return String(props.message);
    });
    const cmpAnimation = computed(() => {
      if (typeof props.animation == "string" && props.animation) {
        return props.animation;
      }
      return "fade";
    });
    const cmpTimeout = computed(() => {
      if (obj.number.isNumber(props.timeout)) {
        return props.timeout;
      }
      return 1500;
    });
    const cmpZIndex = computed(() => {
      if (obj.number.isNumber(props.zIndex)) {
        return props.zIndex;
      }
      return 1100;
    });
    const cmpBackground = computed(() => {
      if (typeof props.background == "string" && props.background) {
        return props.background;
      }
      return null;
    });
    const cmpColor = computed(() => {
      if (typeof props.color == "string" && props.color) {
        return props.color;
      }
      return null;
    });
    const msgboxStyle = computed(() => {
      let style = {
        zIndex: cmpZIndex.value
      };
      if (cmpBackground.value) {
        style.backgroundColor = cmpBackground.value;
      }
      if (cmpColor.value) {
        style.color = cmpColor.value;
      }
      return style;
    });
    const afterEnter = () => {
      if (cmpTimeout.value > 0) {
        setTimeout(() => {
          show.value = false;
        }, cmpTimeout.value);
      }
    };
    const afterLeave = () => {
      props.__remove();
    };
    onMounted(() => {
      show.value = true;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, {
          name: "mvi-msgbox-" + cmpAnimation.value,
          onAfterEnter: afterEnter,
          onAfterLeave: afterLeave
        }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", mergeProps(_ctx.$attrs, {
              class: ["mvi-msgbox", { "mvi-msgbox-translate": cmpAnimation.value == "translate" }],
              textContent: toDisplayString(cpmMessage.value),
              style: msgboxStyle.value
            }), null, 16, _hoisted_1$J), [
              [vShow, show.value]
            ])
          ]),
          _: 1
        }, 8, ["name"])
      ]);
    };
  }
});
const MsgboxComponent = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__scopeId", "data-v-5b43b3b9"]]);
const Msgbox = {
  //初始化参数
  initParams: (options) => {
    let opts = {};
    if (obj.common.isObject(options)) {
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
  //弹窗调用
  msgbox: (options) => {
    return new Promise((resolve) => {
      let opts = Msgbox.initParams(options);
      let mountNode = obj.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(MsgboxComponent, {
        ...opts,
        __remove: () => {
          instance.unmount();
          mountNode.remove();
          resolve();
        }
      });
      instance.mount(mountNode);
    });
  },
  //注册函数
  install: (app) => {
    app.config.globalProperties.$msgbox = Msgbox.msgbox;
    app.provide("$msgbox", Msgbox.msgbox);
  }
};
const DividerProps = {
  //是否使用虚线
  dashed: {
    type: Boolean,
    default: false
  },
  //线颜色
  color: {
    type: String,
    default: null
  }
};
const _hoisted_1$I = {
  key: 0,
  class: "mvi-divider-center"
};
const _sfc_main$V = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-divider"
  },
  __name: "divider",
  props: DividerProps,
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-divider", { dashed: _ctx.dashed }])
      }, [
        createElementVNode("div", {
          class: "mvi-divider-left",
          style: normalizeStyle({ borderColor: _ctx.color || "" })
        }, null, 4),
        _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_1$I, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])) : createCommentVNode("", true),
        createElementVNode("div", {
          class: "mvi-divider-right",
          style: normalizeStyle({ borderColor: _ctx.color || "" })
        }, null, 4)
      ], 2);
    };
  }
});
const Divider = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__scopeId", "data-v-401646bb"]]);
Divider.install = (app) => {
  app.component(Divider.name, Divider);
};
const CellProps = {
  //左侧图标
  icon: {
    type: [String, Object],
    default: null
  },
  //标题
  title: {
    type: String,
    default: null
  },
  //内容
  content: {
    type: String,
    default: null
  },
  //描述文本
  label: {
    type: String,
    default: null
  },
  //是否显示下边框
  border: {
    type: Boolean,
    default: null
  },
  //右侧图标
  arrow: {
    type: [String, Object],
    default: null
  },
  //是否显示点击态
  active: {
    type: Boolean,
    default: null
  },
  //是否对描述文本内容进行行数限制
  ellipsis: {
    type: [Boolean, Number],
    default: null
  },
  //标题和内容超出一行是否省略
  noWrap: {
    type: Boolean,
    default: false
  }
};
const _hoisted_1$H = { class: "mvi-cell-item" };
const _hoisted_2$z = ["textContent"];
const _hoisted_3$t = ["textContent"];
const _hoisted_4$l = ["textContent"];
const _sfc_main$U = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-cell"
  },
  __name: "cell",
  props: CellProps,
  setup(__props) {
    const cellGroup = inject("cellGroup", null);
    const props = __props;
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const cmpActive = computed(() => {
      if (typeof props.active == "boolean") {
        return props.active;
      }
      if (cellGroup && cellGroup.type.name == "m-cell-group" && typeof cellGroup.props.active == "boolean") {
        return cellGroup.props.active;
      }
      return true;
    });
    const cmpBorder = computed(() => {
      if (typeof props.border == "boolean") {
        return props.border;
      }
      if (cellGroup && cellGroup.type.name == "m-cell-group" && typeof cellGroup.props.border == "boolean") {
        return cellGroup.props.border;
      }
      return false;
    });
    const labelTextStyle = computed(() => {
      let style = {};
      if (props.ellipsis) {
        style.display = "-webkit-box";
        style.textOverflow = "ellipsis";
        style.webkitBoxOrient = "vertical";
        style.overflow = "hidden";
        if (typeof props.ellipsis == "boolean") {
          style.webkitLineClamp = 3;
        } else {
          style.webkitLineClamp = props.ellipsis;
        }
      }
      return style;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-cell", { border: cmpBorder.value, active: cmpActive.value }])
      }, [
        createElementVNode("div", _hoisted_1$H, [
          parseIcon.value(_ctx.icon).type || parseIcon.value(_ctx.icon).url ? (openBlock(), createBlock(unref(Icon), {
            key: 0,
            class: "mvi-cell-icon",
            type: parseIcon.value(_ctx.icon).type,
            url: parseIcon.value(_ctx.icon).url,
            spin: parseIcon.value(_ctx.icon).spin,
            size: parseIcon.value(_ctx.icon).size,
            color: parseIcon.value(_ctx.icon).color
          }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
          createElementVNode("div", {
            class: normalizeClass(["mvi-cell-title", { nowrap: _ctx.noWrap }])
          }, [
            _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", {
              key: 1,
              textContent: toDisplayString(_ctx.title)
            }, null, 8, _hoisted_2$z))
          ], 2),
          _ctx.$slots.content || _ctx.content ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["mvi-cell-content", { nowrap: _ctx.noWrap }])
          }, [
            _ctx.$slots.content ? renderSlot(_ctx.$slots, "content", { key: 0 }, void 0, true) : _ctx.content ? (openBlock(), createElementBlock("span", {
              key: 1,
              textContent: toDisplayString(_ctx.content)
            }, null, 8, _hoisted_3$t)) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true),
          parseIcon.value(_ctx.arrow).type || parseIcon.value(_ctx.arrow).url ? (openBlock(), createBlock(unref(Icon), {
            key: 2,
            class: "mvi-cell-arrow",
            type: parseIcon.value(_ctx.arrow).type,
            url: parseIcon.value(_ctx.arrow).url,
            spin: parseIcon.value(_ctx.arrow).spin,
            size: parseIcon.value(_ctx.arrow).size,
            color: parseIcon.value(_ctx.arrow).color
          }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
        ]),
        _ctx.label || _ctx.$slots.label ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "mvi-cell-label",
          style: normalizeStyle(labelTextStyle.value)
        }, [
          _ctx.$slots.label ? renderSlot(_ctx.$slots, "label", { key: 0 }, void 0, true) : _ctx.label ? (openBlock(), createElementBlock("span", {
            key: 1,
            textContent: toDisplayString(_ctx.label)
          }, null, 8, _hoisted_4$l)) : createCommentVNode("", true)
        ], 4)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const Cell = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["__scopeId", "data-v-dba482be"]]);
Cell.install = (app) => {
  app.component(Cell.name, Cell);
};
const CellGroupProps = {
  //单元格组标题
  title: {
    type: String,
    default: null
  },
  //下边框
  border: {
    type: Boolean,
    default: true
  },
  //是否显示点击态
  active: {
    type: Boolean,
    default: true
  }
};
const componentIsMatch = (instance, childName, names) => {
  const vnodes = instance.slots.default ? instance.slots.default() : [];
  const isMatch = vnodes.every((vnode) => {
    if (typeof vnode.type == "symbol") {
      return true;
    }
    return obj.common.isObject(vnode.type) && vnode.type.name == childName;
  });
  if (!isMatch) {
    throw new Error(`The default slot for component "${names[0]}" can only accommodate component "${names[1]}"`);
  }
};
const parentIsMatch = (children, parentInstance, parentName, names) => {
  if (!children || !parentInstance || parentInstance.type.name != parentName) {
    throw new Error(`Component "${names[1]}" cannot be used alone and must be placed in the default slot of component "${names[0]}"`);
  }
};
const _hoisted_1$G = ["textContent"];
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-cell-group"
  },
  __name: "cell-group",
  props: CellGroupProps,
  setup(__props) {
    const instance = getCurrentInstance();
    componentIsMatch(instance, "m-cell", ["CellGroup", "Cell"]);
    provide("cellGroup", instance);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-cell-group", _ctx.border ? "border" : ""])
      }, [
        _ctx.title ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "mvi-cell-group-title",
          textContent: toDisplayString(_ctx.title)
        }, null, 8, _hoisted_1$G)) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2);
    };
  }
});
const CellGroup = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__scopeId", "data-v-d6d60a20"]]);
CellGroup.install = (app) => {
  app.component(CellGroup.name, CellGroup);
};
const CheckboxProps = {
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //是否选中
  modelValue: {
    type: [Boolean, Array],
    default: false
  },
  //label文字
  label: {
    type: String,
    default: null
  },
  //值
  value: {
    type: [Object, Number, String, Array],
    default: ""
  },
  //是否圆形
  round: {
    type: Boolean,
    default: false
  },
  //原生name属性
  name: {
    type: String,
    default: null
  },
  //文字位置
  placement: {
    type: String,
    default: "right",
    validator(value) {
      return ["left", "right"].includes(value);
    }
  },
  //大小
  size: {
    type: String,
    default: null
  },
  //主题颜色
  color: {
    type: String,
    default: null
  }
};
const _hoisted_1$F = ["disabled"];
const _hoisted_2$y = ["data-placement", "textContent"];
const _hoisted_3$s = ["value", "disabled", "checked", "name"];
const _hoisted_4$k = ["data-placement", "textContent"];
const _sfc_main$S = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-checkbox"
  },
  __name: "checkbox",
  props: CheckboxProps,
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const check = computed(() => {
      if (typeof props.modelValue == "boolean") {
        return props.modelValue;
      }
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.some((item) => {
          return obj.common.equal(item, props.value);
        });
      }
      return false;
    });
    const itemStyle = computed(() => {
      let style = {};
      if (props.color && check.value && !props.disabled) {
        style.backgroundColor = props.color;
        style.borderColor = props.color;
      }
      if (props.size) {
        style.fontSize = props.size;
      }
      return style;
    });
    const change = (event2) => {
      if (Array.isArray(props.modelValue)) {
        let arr = [...props.modelValue];
        if (event2.target.checked && !check.value) {
          arr.push(props.value);
        } else if (check.value) {
          arr = arr.filter((item) => {
            return !obj.common.equal(item, props.value);
          });
        }
        emits("update:modelValue", arr);
        emits("change", arr);
      } else if (typeof props.modelValue == "boolean") {
        emits("update:modelValue", event2.target.checked);
        emits("change", event2.target.checked);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", {
        class: "mvi-checkbox",
        disabled: _ctx.disabled || null
      }, [
        _ctx.placement == "left" && _ctx.label ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "mvi-checkbox-label",
          "data-placement": _ctx.placement,
          textContent: toDisplayString(_ctx.label)
        }, null, 8, _hoisted_2$y)) : createCommentVNode("", true),
        createElementVNode("input", {
          onChange: change,
          value: _ctx.value,
          disabled: _ctx.disabled,
          checked: check.value,
          type: "checkbox",
          name: _ctx.name
        }, null, 40, _hoisted_3$s),
        createElementVNode("span", {
          class: normalizeClass(["mvi-checkbox-item", { check: check.value, round: _ctx.round }]),
          style: normalizeStyle(itemStyle.value)
        }, [
          createVNode(unref(Icon), {
            type: "success",
            style: normalizeStyle({ opacity: check.value ? "" : 0 })
          }, null, 8, ["style"])
        ], 6),
        _ctx.placement == "right" && _ctx.label ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: "mvi-checkbox-label",
          "data-placement": _ctx.placement,
          textContent: toDisplayString(_ctx.label)
        }, null, 8, _hoisted_4$k)) : createCommentVNode("", true)
      ], 8, _hoisted_1$F);
    };
  }
});
const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-b8a4d64a"]]);
Checkbox.install = (app) => {
  app.component(Checkbox.name, Checkbox);
};
const RadioProps = {
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //是否选中
  modelValue: {
    type: [Boolean, String, Number, Object],
    default: false
  },
  //label文字
  label: {
    type: String,
    default: null
  },
  //值
  value: {
    type: [Object, Number, String],
    default: ""
  },
  //是否圆形
  round: {
    type: Boolean,
    default: true
  },
  //原生name属性
  name: {
    type: String,
    default: null
  },
  //文字位置
  placement: {
    type: String,
    default: "right",
    validator(value) {
      return ["left", "right"].includes(value);
    }
  },
  //大小
  size: {
    type: String,
    default: null
  },
  //主题颜色
  color: {
    type: String,
    default: null
  }
};
const _hoisted_1$E = ["disabled"];
const _hoisted_2$x = ["data-placement", "textContent"];
const _hoisted_3$r = ["value", "disabled", "checked", "name"];
const _hoisted_4$j = ["data-placement", "textContent"];
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-radio"
  },
  __name: "radio",
  props: RadioProps,
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const check = computed(() => {
      if (typeof props.modelValue == "boolean") {
        return props.modelValue;
      }
      return obj.common.equal(props.modelValue, props.value);
    });
    const itemStyle = computed(() => {
      let style = {};
      if (props.color && check.value && !props.disabled) {
        style.backgroundColor = props.color;
        style.borderColor = props.color;
      }
      if (props.size) {
        style.fontSize = props.size;
      }
      return style;
    });
    const change = (event2) => {
      if (typeof props.modelValue == "boolean") {
        emits("update:modelValue", event2.target.checked);
        emits("change", event2.target.checked);
      } else {
        if (event2.target.checked) {
          emits("update:modelValue", props.value);
          emits("change", props.value);
        }
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", {
        class: "mvi-radio",
        disabled: _ctx.disabled || null
      }, [
        _ctx.placement == "left" && _ctx.label ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "mvi-radio-label",
          "data-placement": _ctx.placement,
          textContent: toDisplayString(_ctx.label)
        }, null, 8, _hoisted_2$x)) : createCommentVNode("", true),
        createElementVNode("input", {
          onChange: change,
          value: _ctx.value,
          disabled: _ctx.disabled,
          checked: check.value,
          type: "radio",
          name: _ctx.name
        }, null, 40, _hoisted_3$r),
        createElementVNode("span", {
          class: normalizeClass(["mvi-radio-item", { check: check.value, round: _ctx.round }]),
          style: normalizeStyle(itemStyle.value)
        }, [
          createVNode(unref(Icon), {
            type: "success",
            style: normalizeStyle({ opacity: check.value ? "" : 0 })
          }, null, 8, ["style"])
        ], 6),
        _ctx.placement == "right" && _ctx.label ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: "mvi-radio-label",
          "data-placement": _ctx.placement,
          textContent: toDisplayString(_ctx.label)
        }, null, 8, _hoisted_4$j)) : createCommentVNode("", true)
      ], 8, _hoisted_1$E);
    };
  }
});
const Radio = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__scopeId", "data-v-8d3f7363"]]);
Radio.install = (app) => {
  app.component(Radio.name, Radio);
};
const SignProps = {
  //签名颜色
  color: {
    type: String,
    default: "#505050"
  },
  //背景色
  background: {
    type: String,
    default: "#fff"
  },
  //字体粗细 px值
  width: {
    type: Number,
    default: 0.05
  }
};
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-sign"
  },
  __name: "sign",
  props: SignProps,
  setup(__props, { expose: __expose }) {
    const instance = getCurrentInstance();
    const props = __props;
    const drawing = ref(false);
    const inCanvas = ref(false);
    const canvasRef = ref(null);
    const canvasMouseDown = (e) => {
      drawing.value = true;
      inCanvas.value = true;
      const ctx = canvasRef.value.getContext("2d");
      const rect = obj.element.getElementBounding(canvasRef.value);
      ctx.beginPath();
      ctx.moveTo(e.pageX - rect.left, e.pageY - rect.top);
    };
    const canvasMouseMove = (e) => {
      if (drawing.value && inCanvas.value) {
        const ctx = canvasRef.value.getContext("2d");
        const rect = obj.element.getElementBounding(canvasRef.value);
        ctx.lineTo(e.pageX - rect.left, e.pageY - rect.top);
        ctx.strokeStyle = props.color;
        ctx.lineWidth = obj.element.rem2px(props.width);
        ctx.stroke();
      }
    };
    const canvasMouseUp = () => {
      drawing.value = false;
      const ctx = canvasRef.value.getContext("2d");
      ctx.closePath();
    };
    const canvasMouseEnter = (e) => {
      if (drawing.value) {
        inCanvas.value = true;
        const ctx = canvasRef.value.getContext("2d");
        const rect = obj.element.getElementBounding(canvasRef.value);
        ctx.beginPath();
        ctx.moveTo(e.pageX - rect.left, e.pageY - rect.top);
      }
    };
    const canvasMouseLeave = () => {
      if (drawing.value) {
        const ctx = canvasRef.value.getContext("2d");
        ctx.closePath();
        inCanvas.value = false;
      }
    };
    const canvasTouchStart = (e) => {
      const ctx = canvasRef.value.getContext("2d");
      const rect = obj.element.getElementBounding(canvasRef.value);
      ctx.beginPath();
      ctx.moveTo(e.targetTouches[0].pageX - rect.left, e.targetTouches[0].pageY - rect.top);
    };
    const canvasTouchMove = (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      const ctx = canvasRef.value.getContext("2d");
      const rect = obj.element.getElementBounding(canvasRef.value);
      ctx.lineTo(e.targetTouches[0].pageX - rect.left, e.targetTouches[0].pageY - rect.top);
      ctx.strokeStyle = props.color;
      ctx.lineWidth = obj.element.rem2px(props.width);
      ctx.stroke();
    };
    const canvasTouchEnd = () => {
      const ctx = canvasRef.value.getContext("2d");
      ctx.closePath();
    };
    const clear = () => {
      const ctx = canvasRef.value.getContext("2d");
      ctx.beginPath();
      ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
      ctx.rect(0, 0, canvasRef.value.width, canvasRef.value.height);
      ctx.fillStyle = props.background;
      ctx.fill();
      ctx.closePath();
    };
    const getImage = () => {
      return canvasRef.value.toDataURL("image/png");
    };
    const init = () => {
      canvasRef.value.setAttribute("width", obj.element.getCssStyle(canvasRef.value, "width"));
      canvasRef.value.setAttribute("height", obj.element.getCssStyle(canvasRef.value, "height"));
      clear();
      obj.event.on(document.documentElement, `mousemove.sign_${instance.uid}`, canvasMouseMove);
      obj.event.on(document.documentElement, `mouseup.sign_${instance.uid}`, canvasMouseUp);
    };
    watch(
      () => props.background,
      () => {
        clear();
      }
    );
    onMounted(() => {
      init();
    });
    onBeforeUnmount(() => {
      obj.event.off(document.documentElement, `mousemove.sign_${instance.uid} mouseup.sign_${instance.uid}`);
    });
    __expose({
      getImage,
      clear
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("canvas", {
        class: "mvi-sign",
        ref_key: "canvasRef",
        ref: canvasRef,
        onMousedown: canvasMouseDown,
        onTouchstart: canvasTouchStart,
        onTouchmove: canvasTouchMove,
        onTouchend: canvasTouchEnd,
        onMouseleave: canvasMouseLeave,
        onMouseenter: canvasMouseEnter
      }, null, 544);
    };
  }
});
const Sign = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__scopeId", "data-v-ea70c416"]]);
Sign.install = (app) => {
  app.component(Sign.name, Sign);
};
const RollProps = {
  //滚动一个周期需要的时间
  interval: {
    type: Number,
    default: 5e3
  },
  //滚动方向
  direction: {
    type: String,
    default: "left",
    validator(value) {
      return ["left", "right", "up", "down"].includes(value);
    }
  },
  //是否自动滚动
  autoplay: {
    type: Boolean,
    default: false
  },
  //是否循环滚动
  loop: {
    type: Boolean,
    default: false
  },
  //动画效果
  animation: {
    type: String,
    default: "linear",
    validator(value) {
      return ["linear", "ease", "ease-in", "ease-out", "ease-in-out"].includes(value);
    }
  },
  //是否点击暂停
  clickStop: {
    type: Boolean,
    default: false
  },
  //是否悬浮暂停
  hoverStop: {
    type: Boolean,
    default: false
  },
  //垂直方向滚动时内容是否居中
  center: {
    type: Boolean,
    default: false
  }
};
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-roll"
  },
  __name: "roll",
  props: RollProps,
  emits: ["play", "stop", "pause"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const timer = ref(null);
    const status = ref(-1);
    const containerRef = ref(null);
    const rollRef = ref(null);
    const rollStyle = computed(() => {
      let obj2 = {};
      if (props.direction == "left") {
        obj2.left = "100%";
        obj2.right = "auto";
      } else if (props.direction == "right") {
        obj2.right = "100%";
        obj2.left = "auto";
      } else if (props.direction == "up") {
        obj2.top = "100%";
        obj2.bottom = "auto";
      } else if (props.direction == "down") {
        obj2.bottom = "100%";
        obj2.top = "auto";
      }
      return obj2;
    });
    const isPaused = computed(() => {
      return status.value == 1;
    });
    const isStopped = computed(() => {
      return status.value == 2;
    });
    const pause = () => {
      if (status.value != 0) {
        return;
      }
      status.value = 1;
      let placement = obj.element.getElementPoint(rollRef.value, containerRef.value);
      rollRef.value.style.transition = "";
      if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
      }
      if (props.direction == "left") {
        rollRef.value.style.left = placement.left + "px";
        rollRef.value.style.right = "auto";
      } else if (props.direction == "right") {
        rollRef.value.style.right = placement.right + "px";
        rollRef.value.style.left = "auto";
      } else if (props.direction == "up") {
        rollRef.value.style.top = placement.top + "px";
        rollRef.value.style.bottom = "auto";
      } else if (props.direction == "down") {
        rollRef.value.style.bottom = placement.bottom + "px";
        rollRef.value.style.top = "auto";
      }
      emits("pause");
    };
    const stop = () => {
      if (status.value == 2) {
        return;
      }
      status.value = 2;
      rollRef.value.style.transition = "";
      if (props.direction == "left") {
        rollRef.value.style.left = "100%";
        rollRef.value.style.right = "auto";
      } else if (props.direction == "right") {
        rollRef.value.style.right = "100%";
        rollRef.value.style.left = "auto";
      } else if (props.direction == "up") {
        rollRef.value.style.top = "100%";
        rollRef.value.style.bottom = "auto";
      } else if (props.direction == "down") {
        rollRef.value.style.bottom = "100%";
        rollRef.value.style.top = "auto";
      }
      if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
      }
      emits("stop");
    };
    const play = () => {
      if (!rollRef.value) {
        return;
      }
      if (status.value == 0) {
        return;
      }
      status.value = 0;
      let placement = obj.element.getElementPoint(rollRef.value, containerRef.value);
      let interval = 0;
      if (props.direction == "left") {
        interval = Math.round((placement.left + rollRef.value.offsetWidth) / (containerRef.value.offsetWidth + rollRef.value.offsetWidth) * props.interval);
      } else if (props.direction == "right") {
        interval = Math.round((placement.right + rollRef.value.offsetWidth) / (containerRef.value.offsetWidth + rollRef.value.offsetWidth) * props.interval);
      } else if (props.direction == "up") {
        interval = Math.round((placement.top + rollRef.value.offsetHeight) / (containerRef.value.offsetHeight + rollRef.value.offsetHeight) * props.interval);
      } else if (props.direction == "down") {
        interval = Math.round((placement.bottom + rollRef.value.offsetHeight) / (containerRef.value.offsetHeight + rollRef.value.offsetHeight) * props.interval);
      }
      rollRef.value.style.transition = "all " + interval + "ms " + props.animation;
      rollRef.value.offsetWidth;
      if (props.direction == "left") {
        rollRef.value.style.left = -rollRef.value.offsetWidth + "px";
        rollRef.value.style.right = "auto";
      } else if (props.direction == "right") {
        rollRef.value.style.right = -rollRef.value.offsetWidth + "px";
        rollRef.value.style.left = "auto";
      } else if (props.direction == "up") {
        rollRef.value.style.top = -rollRef.value.offsetHeight + "px";
        rollRef.value.style.bottom = "auto";
      } else if (props.direction == "down") {
        rollRef.value.style.bottom = -rollRef.value.offsetHeight + "px";
        rollRef.value.style.top = "auto";
      }
      emits("play");
      timer.value = setTimeout(() => {
        stop();
        if (props.loop) {
          play();
        }
      }, interval);
    };
    const hoverIn = () => {
      if (props.hoverStop) {
        if (status.value == 0) {
          pause();
        }
      }
    };
    const hoverOut = () => {
      if (props.hoverStop) {
        if (status.value == 1) {
          play();
        }
      }
    };
    const clickStopFun = () => {
      if (props.clickStop) {
        if (status.value == 0) {
          pause();
        } else if (status.value == 1) {
          play();
        }
      }
    };
    onMounted(() => {
      containerRef.value.style.height = obj.element.getCssStyle(rollRef.value, "height");
      if (props.autoplay) {
        play();
      }
    });
    onBeforeUnmount(() => {
      stop();
    });
    __expose({
      pause,
      stop,
      play,
      isStopped,
      isPaused
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        onClick: clickStopFun,
        onMouseenter: hoverIn,
        onMouseleave: hoverOut,
        class: "mvi-roll-container",
        ref_key: "containerRef",
        ref: containerRef
      }, [
        createElementVNode("div", {
          class: normalizeClass(["mvi-roll", [_ctx.direction == "left" || _ctx.direction == "right" ? "horizontal" : "vertical", { center: _ctx.center }]]),
          style: normalizeStyle(rollStyle.value),
          ref_key: "rollRef",
          ref: rollRef
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 6)
      ], 544);
    };
  }
});
const Roll = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__scopeId", "data-v-715bc9ec"]]);
Roll.install = (app) => {
  app.component(Roll.name, Roll);
};
const RowProps = {
  //排列方式
  justify: {
    type: String,
    default: "flex-start",
    validator(value) {
      return ["flex-start", "flex-end", "space-around", "space-between"].includes(value);
    }
  },
  //垂直对齐方式
  align: {
    type: String,
    default: "flex-start",
    validator(value) {
      return ["flex-start", "flex-end", "center"].includes(value);
    }
  },
  //渲染标签
  tag: {
    type: String,
    default: "div"
  }
};
const _sfc_main$O = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-row"
  },
  __name: "row",
  props: RowProps,
  setup(__props) {
    const instance = getCurrentInstance();
    componentIsMatch(instance, "m-col", ["Row", "Col"]);
    provide("row", instance);
    const props = __props;
    const Row2 = defineComponent(() => {
      return () => {
        return h(
          props.tag,
          {},
          {
            default: useSlots().default
          }
        );
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Row2), {
        class: "mvi-row",
        style: normalizeStyle({ justifyContent: _ctx.justify, alignItems: _ctx.align })
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _: 3
      }, 8, ["style"]);
    };
  }
});
const Row = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__scopeId", "data-v-66d613ff"]]);
Row.install = (app) => {
  app.component(Row.name, Row);
};
const ColProps = {
  //栅格占据的列数
  span: {
    type: Number,
    default: 24
  },
  //栅格左侧的间隔格数
  offset: {
    type: Number,
    default: 0
  },
  //渲染标签
  tag: {
    type: String,
    default: "div"
  },
  // >=0px 响应式栅格数或者栅格属性对象
  xs: {
    type: [Number, Object],
    default: null
  },
  // >=640px 响应式栅格数或者栅格属性对象
  sm: {
    type: [Number, Object],
    default: null
  },
  // >=992px 响应式栅格数或者栅格属性对象
  md: {
    type: [Number, Object],
    default: null
  },
  // >=1440px 响应式栅格数或者栅格属性对象
  lg: {
    type: [Number, Object],
    default: null
  },
  // >=1920px 响应式栅格数或者栅格属性对象
  xl: {
    type: [Number, Object],
    default: null
  }
};
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-col"
  },
  __name: "col",
  props: ColProps,
  setup(__props) {
    const row = inject("row", null);
    parentIsMatch(ref([]), row, "m-row", ["Row", "Col"]);
    const props = __props;
    const colClass = computed(() => {
      let cls = [];
      if (props.span) {
        cls.push("mvi-col-" + props.span);
      }
      if (props.offset) {
        cls.push("mvi-col-offset-" + props.offset);
      }
      if (obj.common.isObject(props.xs)) {
        if (obj.number.isNumber(props.xs.span)) {
          cls.push("mvi-col-xs-" + props.xs.span);
        }
        if (obj.number.isNumber(props.xs.offset)) {
          cls.push("mvi-col-offset-xs-" + props.xs.offset);
        }
      } else if (obj.number.isNumber(props.xs)) {
        cls.push("mvi-col-xs-" + props.xs);
      }
      if (obj.common.isObject(props.sm)) {
        if (obj.number.isNumber(props.sm.span)) {
          cls.push("mvi-col-sm-" + props.sm.span);
        }
        if (obj.number.isNumber(props.sm.offset)) {
          cls.push("mvi-col-offset-sm-" + props.sm.offset);
        }
      } else if (obj.number.isNumber(props.sm)) {
        cls.push("mvi-col-sm-" + props.sm);
      }
      if (obj.common.isObject(props.md)) {
        if (obj.number.isNumber(props.md.span)) {
          cls.push("mvi-col-md-" + props.md.span);
        }
        if (obj.number.isNumber(props.md.offset)) {
          cls.push("mvi-col-offset-md-" + props.md.offset);
        }
      } else if (obj.number.isNumber(props.md)) {
        cls.push("mvi-col-md-" + props.md);
      }
      if (obj.common.isObject(props.lg)) {
        if (obj.number.isNumber(props.lg.span)) {
          cls.push("mvi-col-lg-" + props.lg.span);
        }
        if (obj.number.isNumber(props.lg.offset)) {
          cls.push("mvi-col-offset-lg-" + props.lg.offset);
        }
      } else if (obj.number.isNumber(props.lg)) {
        cls.push("mvi-col-lg-" + props.lg);
      }
      if (obj.common.isObject(props.xl)) {
        if (obj.number.isNumber(props.xl.span)) {
          cls.push("mvi-col-xl-" + props.xl.span);
        }
        if (obj.number.isNumber(props.xl.offset)) {
          cls.push("mvi-col-offset-xl-" + props.xl.offset);
        }
      } else if (obj.number.isNumber(props.xl)) {
        cls.push("mvi-col-xl-" + props.xl);
      }
      return cls;
    });
    const Col2 = defineComponent(() => {
      return () => {
        return h(
          props.tag,
          {},
          {
            default: useSlots().default
          }
        );
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Col2), {
        class: normalizeClass(colClass.value)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});
const Col = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__scopeId", "data-v-d532c6c0"]]);
Col.install = (app) => {
  app.component(Col.name, Col);
};
const AutocompleteProps = {
  //输入框的值
  modelValue: {
    type: String,
    default: ""
  },
  //占位符
  placeholder: {
    type: String,
    default: ""
  },
  //组件大小
  size: {
    type: String,
    default: "medium",
    validator(value) {
      return ["small", "medium", "large"].includes(value);
    }
  },
  //可选值数组
  list: {
    type: Array,
    default: function() {
      return [];
    }
  },
  //激活样式
  activeType: {
    type: String,
    default: "info",
    validator(value) {
      return ["info", "success", "warn", "error", "primary"].includes(value);
    }
  },
  //激活颜色
  activeColor: {
    type: String,
    default: null,
    validator(value) {
      return obj.common.matchingText(value, "hex");
    }
  },
  //过滤方法
  filterMethod: {
    type: [Function, Boolean],
    default: false
  },
  //是否启用清除图标
  clearable: {
    type: Boolean,
    default: false
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //layer组件参数
  layerProps: {
    type: Object,
    default: function() {
      return {};
    }
  },
  //提示框最大高度
  height: {
    type: String,
    default: null
  },
  //原生name
  name: {
    type: String,
    default: null
  },
  //左侧图标
  leftIcon: {
    type: [String, Object],
    default: null
  },
  //右侧图标
  rightIcon: {
    type: [String, Object],
    default: null
  },
  //是否圆角
  round: {
    type: Boolean,
    default: false
  },
  //是否方形
  square: {
    type: Boolean,
    default: false
  },
  //对齐方式
  align: {
    type: String,
    default: "left",
    validator(value) {
      return ["left", "right", "center"].includes(value);
    }
  }
};
const _hoisted_1$D = ["data-id", "disabled"];
const _hoisted_2$w = ["placeholder", "name", "disabled"];
const _hoisted_3$q = ["textContent", "onClick"];
const _sfc_main$M = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-autocomplete",
    inheritAttrs: false
  },
  __name: "autocomplete",
  props: AutocompleteProps,
  emits: ["update:modelValue", "focus", "blur", "input", "left-click", "right-click", "select", "clear", "keydown", "keyup"],
  setup(__props, { emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const focus = ref(false);
    const menuRef = ref(null);
    const relateRef = ref(null);
    const layerRef = ref(null);
    const inputRef = ref(null);
    const realValue = computed({
      set: (value) => {
        if (props.modelValue !== value) {
          emits("update:modelValue", value);
        }
      },
      get: () => {
        return props.modelValue;
      }
    });
    const cmpFilter = computed(() => {
      if (typeof props.filterMethod == "function") {
        return props.filterMethod(realValue.value, props.list);
      }
      if (props.filterMethod) {
        return defaultFilter();
      }
      return props.list;
    });
    const show = computed(() => {
      return focus.value && cmpFilter.value.length != 0;
    });
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const showClearIcon = computed(() => {
      if (props.disabled) {
        return false;
      }
      if (realValue.value && focus.value) {
        return true;
      }
      return false;
    });
    const clearStyle = computed(() => {
      let style = {};
      if (parseIcon.value(props.rightIcon).type || parseIcon.value(props.rightIcon).url) {
        style.borderRadius = 0;
      }
      return style;
    });
    const inputStyle = computed(() => {
      let style = {};
      if (parseIcon.value(props.leftIcon).type || parseIcon.value(props.leftIcon).url) {
        style.paddingLeft = 0;
      }
      if (showClearIcon.value && props.clearable || parseIcon.value(props.rightIcon).type || parseIcon.value(props.rightIcon).url) {
        style.paddingRight = 0;
      }
      if (props.align) {
        style.textAlign = props.align;
      }
      return style;
    });
    const relateStyle = computed(() => {
      let style = {};
      if (props.activeColor && focus.value) {
        style.borderColor = props.activeColor;
        const rgb = obj.color.hex2rgb(props.activeColor);
        style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
      }
      return style;
    });
    const relateClass = computed(() => {
      let cls = [props.size];
      if (props.activeType && !props.activeColor && focus.value) {
        cls.push(props.activeType);
      }
      if (props.round) {
        cls.push("round");
      } else if (props.square) {
        cls.push("square");
      }
      return cls;
    });
    const layerRealProps = computed(() => {
      return {
        placement: props.layerProps.placement ? props.layerProps.placement : "bottom-start",
        width: props.layerProps.width,
        zIndex: obj.number.isNumber(props.layerProps.zIndex) ? props.layerProps.zIndex : 400,
        offset: props.layerProps.offset ? props.layerProps.offset : "0.1rem",
        animation: props.layerProps.animation,
        timeout: obj.number.isNumber(props.layerProps.timeout) ? props.layerProps.timeout : 200,
        showTriangle: typeof props.layerProps.showTriangle == "boolean" ? props.layerProps.showTriangle : false,
        shadow: typeof props.layerProps.shadow == "boolean" ? props.layerProps.shadow : true,
        border: typeof props.layerProps.border == "boolean" ? props.layerProps.border : false,
        borderColor: props.layerProps.borderColor
      };
    });
    const layerShow = () => {
      if (!layerRealProps.value.width) {
        menuRef.value.style.width = relateRef.value.offsetWidth + "px";
      }
    };
    const rightClick = () => {
      if (props.disabled) {
        return;
      }
      emits("right-click", realValue.value);
    };
    const leftClick = () => {
      if (props.disabled) {
        return;
      }
      emits("left-click", realValue.value);
    };
    const keydown = (e) => {
      if (props.disabled) {
        return;
      }
      emits("keydown", e, realValue.value);
    };
    const keyup = (e) => {
      if (props.disabled) {
        return;
      }
      emits("keyup", e, realValue.value);
    };
    const input = () => {
      if (props.disabled) {
        return;
      }
      focus.value = true;
      layerRef.value.update();
      emits("input", realValue.value);
    };
    const inputBlur = () => {
      if (props.disabled) {
        return;
      }
      setTimeout(() => {
        focus.value = false;
        emits("blur", realValue.value);
      }, 200);
    };
    const inputFocus = () => {
      if (props.disabled) {
        return;
      }
      focus.value = true;
      emits("focus", realValue.value);
    };
    const doClear = () => {
      if (props.disabled) {
        return;
      }
      if (!props.clearable) {
        return;
      }
      setTimeout(() => {
        realValue.value = "";
        emits("clear", "");
        inputRef.value.focus();
      }, 210);
    };
    const doSelect = (item) => {
      if (props.disabled) {
        return;
      }
      realValue.value = item;
      emits("select", item);
      focus.value = false;
    };
    const defaultFilter = () => {
      return props.list.filter((item) => {
        return String(item).toLocaleLowerCase().includes(realValue.value.toLocaleLowerCase());
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("div", mergeProps({
          class: ["mvi-autocomplete", relateClass.value],
          style: relateStyle.value,
          "data-id": "mvi-autocomplete-" + unref(instance).uid,
          ref_key: "relateRef",
          ref: relateRef,
          disabled: _ctx.disabled || null
        }, _ctx.$attrs), [
          parseIcon.value(_ctx.leftIcon).type || parseIcon.value(_ctx.leftIcon).url ? (openBlock(), createElementBlock("div", {
            key: 0,
            onClick: leftClick,
            class: "mvi-autocomplete-left-icon"
          }, [
            createVNode(unref(Icon), {
              type: parseIcon.value(_ctx.leftIcon).type,
              url: parseIcon.value(_ctx.leftIcon).url,
              spin: parseIcon.value(_ctx.leftIcon).spin,
              size: parseIcon.value(_ctx.leftIcon).size,
              color: parseIcon.value(_ctx.leftIcon).color
            }, null, 8, ["type", "url", "spin", "size", "color"])
          ])) : createCommentVNode("", true),
          withDirectives(createElementVNode("input", {
            ref_key: "inputRef",
            ref: inputRef,
            onInput: input,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => realValue.value = $event),
            type: "text",
            placeholder: _ctx.placeholder,
            style: normalizeStyle(inputStyle.value),
            name: _ctx.name,
            onFocus: inputFocus,
            onBlur: inputBlur,
            disabled: _ctx.disabled,
            autocomplete: "off",
            onKeydown: keydown,
            onKeyup: keyup,
            class: normalizeClass({ "left-none-radius": parseIcon.value(_ctx.leftIcon).type || parseIcon.value(_ctx.leftIcon).url, "right-none-radius": parseIcon.value(_ctx.rightIcon).type || parseIcon.value(_ctx.rightIcon).url || _ctx.clearable && showClearIcon.value })
          }, null, 46, _hoisted_2$w), [
            [vModelText, realValue.value]
          ]),
          _ctx.clearable ? withDirectives((openBlock(), createElementBlock("div", {
            key: 1,
            onClick: doClear,
            class: "mvi-autocomplete-clear",
            style: normalizeStyle(clearStyle.value)
          }, [
            createVNode(unref(Icon), { type: "times-o" })
          ], 4)), [
            [vShow, showClearIcon.value]
          ]) : createCommentVNode("", true),
          parseIcon.value(_ctx.rightIcon).type || parseIcon.value(_ctx.rightIcon).url ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: "mvi-autocomplete-right-icon",
            onClick: rightClick
          }, [
            createVNode(unref(Icon), {
              type: parseIcon.value(_ctx.rightIcon).type,
              url: parseIcon.value(_ctx.rightIcon).url,
              spin: parseIcon.value(_ctx.rightIcon).spin,
              size: parseIcon.value(_ctx.rightIcon).size,
              color: parseIcon.value(_ctx.rightIcon).color
            }, null, 8, ["type", "url", "spin", "size", "color"])
          ])) : createCommentVNode("", true)
        ], 16, _hoisted_1$D),
        createVNode(unref(Layer), {
          "model-value": show.value,
          relate: `[data-id='mvi-autocomplete-${unref(instance).uid}']`,
          placement: layerRealProps.value.placement,
          offset: layerRealProps.value.offset,
          "z-index": layerRealProps.value.zIndex,
          ref_key: "layerRef",
          ref: layerRef,
          animation: layerRealProps.value.animation,
          shadow: layerRealProps.value.shadow,
          border: layerRealProps.value.border,
          timeout: layerRealProps.value.timeout,
          closable: false,
          "show-triangle": layerRealProps.value.showTriangle,
          "border-color": layerRealProps.value.borderColor,
          width: layerRealProps.value.width,
          onShowing: layerShow
        }, {
          default: withCtx(() => [
            createElementVNode("div", {
              class: normalizeClass(["mvi-autocomplete-menu", [_ctx.size]]),
              style: normalizeStyle({ maxHeight: _ctx.height }),
              ref_key: "menuRef",
              ref: menuRef
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(cmpFilter.value, (item) => {
                return openBlock(), createElementBlock("div", {
                  class: "mvi-autocomplete-list",
                  textContent: toDisplayString(item),
                  onClick: ($event) => doSelect(item)
                }, null, 8, _hoisted_3$q);
              }), 256))
            ], 6)
          ]),
          _: 1
        }, 8, ["model-value", "relate", "placement", "offset", "z-index", "animation", "shadow", "border", "timeout", "show-triangle", "border-color", "width"])
      ], 64);
    };
  }
});
const Autocomplete = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-e2cf1702"]]);
Autocomplete.install = (app) => {
  app.component(Autocomplete.name, Autocomplete);
};
const OverlayProps = {
  //挂载元素
  mountEl: {
    type: String,
    default: null
  },
  //遮罩层z-index
  zIndex: {
    type: Number,
    default: 800
  },
  //遮罩层颜色
  color: {
    type: String,
    default: null
  },
  //是否显示遮罩层
  modelValue: {
    type: Boolean,
    default: false
  },
  //是否渐变
  fade: {
    type: Boolean,
    default: true
  },
  //动画时间
  timeout: {
    type: Number,
    default: 200,
    validator(value) {
      return value >= 0;
    }
  },
  //是否点击可关闭
  closable: {
    type: Boolean,
    default: false
  },
  //是否考虑PC滚动条（设置padding距离占位）
  usePadding: {
    type: Boolean,
    default: false
  }
};
const _sfc_main$L = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false,
    name: "m-overlay"
  },
  __name: "overlay",
  props: OverlayProps,
  emits: ["update:modelValue", "show", "showing", "shown", "hide", "hidding", "hidden"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const overlayShow = ref(false);
    const scrollTop = ref(0);
    const scrollLeft = ref(0);
    const overflowX = ref("");
    const overflowY = ref("");
    const paddingRight = ref(0);
    const paddingBottom = ref(0);
    const hasHorizontalScroll = ref(false);
    const hasVerticalScroll = ref(false);
    const offsetParent = ref(null);
    const overlayRef = ref(null);
    const overlayStyle = computed(() => {
      let style = {};
      if (obj.number.isNumber(props.zIndex)) {
        style.zIndex = props.zIndex;
      }
      if (props.color) {
        style.background = props.color;
      }
      return style;
    });
    const $$el = computed(() => {
      return overlayRef.value;
    });
    const beforeEnter = (el) => {
      if (props.fade) {
        el.style.transition = "opacity " + props.timeout + "ms";
      }
      emits("show", el);
      if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == "function") {
        instance.appContext.config.globalProperties.overlayComponentWatch.apply(instance.proxy, ["show", el]);
      }
    };
    const enter = (el) => {
      if (overlayRef.value.offsetParent) {
        offsetParent.value = overlayRef.value.offsetParent;
        if (obj.element.getScrollHeight(offsetParent.value) > offsetParent.value.clientHeight) {
          if (props.usePadding) {
            let scrollWidth = offsetParent.value.offsetWidth - offsetParent.value.clientWidth - parseFloat(obj.element.getCssStyle(offsetParent.value, "border-right-width")) - parseFloat(obj.element.getCssStyle(offsetParent.value, "border-left-width"));
            paddingRight.value = parseFloat(obj.element.getCssStyle(offsetParent.value, "padding-right"));
            offsetParent.value.style.setProperty("padding-right", paddingRight.value + scrollWidth + "px", "important");
          }
          scrollTop.value = obj.element.getScrollTop(offsetParent.value);
          overflowY.value = obj.element.getCssStyle(offsetParent.value, "overflow-y");
          offsetParent.value.style.setProperty("overflow-y", "hidden", "important");
          overlayRef.value.style.top = scrollTop.value + "px";
          hasVerticalScroll.value = true;
        }
        if (obj.element.getScrollWidth(offsetParent.value) > offsetParent.value.clientWidth) {
          if (props.usePadding) {
            let scrollHeight = offsetParent.value.offsetHeight - offsetParent.value.clientHeight - parseFloat(obj.element.getCssStyle(offsetParent.value, "border-bottom-width")) - parseFloat(obj.element.getCssStyle(offsetParent.value, "border-top-width"));
            paddingBottom.value = parseFloat(obj.element.getCssStyle(offsetParent.value, "padding-bottom"));
            offsetParent.value.style.setProperty("padding-bottom", paddingBottom.value + scrollHeight + "px", "important");
          }
          scrollLeft.value = obj.element.getScrollLeft(offsetParent.value);
          overflowX.value = obj.element.getCssStyle(offsetParent.value, "overflow-x");
          offsetParent.value.style.setProperty("overflow-x", "hidden", "important");
          overlayRef.value.style.left = scrollLeft.value + "px";
          hasHorizontalScroll.value = true;
        }
      }
      emits("showing", el);
      if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == "function") {
        instance.appContext.config.globalProperties.overlayComponentWatch.apply(instance.proxy, ["showing", el]);
      }
    };
    const afterEnter = (el) => {
      if (props.fade) {
        el.style.transition = "";
      }
      emits("shown", el);
      if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == "function") {
        instance.appContext.config.globalProperties.overlayComponentWatch.apply(instance.proxy, ["shown", el]);
      }
    };
    const beforeLeave = (el) => {
      if (props.fade) {
        el.style.transition = "opacity " + props.timeout + "ms";
      }
      emits("hide", el);
      if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == "function") {
        instance.appContext.config.globalProperties.overlayComponentWatch.apply(instance.proxy, ["hide", el]);
      }
    };
    const leave = (el) => {
      emits("hidding", el);
      if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == "function") {
        instance.appContext.config.globalProperties.overlayComponentWatch.apply(instance.proxy, ["hidding", el]);
      }
    };
    const afterLeave = (el) => {
      if (offsetParent.value) {
        if (hasVerticalScroll.value) {
          if (props.usePadding) {
            offsetParent.value.style.setProperty("padding-right", paddingRight.value + "px", "important");
          }
          offsetParent.value.style.setProperty("overflow-y", overflowY.value, "important");
          hasVerticalScroll.value = false;
        }
        if (hasHorizontalScroll.value) {
          if (props.usePadding) {
            offsetParent.value.style.setProperty("padding-bottom", paddingBottom.value + "px", "important");
          }
          offsetParent.value.style.setProperty("overflow-x", overflowX.value, "important");
          hasHorizontalScroll.value = false;
        }
      }
      if (props.fade) {
        el.style.transition = "";
      }
      emits("hidden", el);
      if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == "function") {
        instance.appContext.config.globalProperties.overlayComponentWatch.apply(instance.proxy, ["hidden", el]);
      }
    };
    const closeOverlay = () => {
      if (props.closable) {
        emits("update:modelValue", false);
      }
    };
    watch(
      () => props.modelValue,
      (newValue) => {
        overlayShow.value = newValue;
      }
    );
    onMounted(() => {
      overlayShow.value = props.modelValue;
    });
    __expose({
      $$el
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, {
        disabled: !_ctx.mountEl,
        to: _ctx.mountEl
      }, [
        createVNode(Transition, {
          name: "mvi-overlay-fade",
          onBeforeEnter: beforeEnter,
          onEnter: enter,
          onAfterEnter: afterEnter,
          onBeforeLeave: beforeLeave,
          onLeave: leave,
          onAfterLeave: afterLeave
        }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", mergeProps({
              onClick: withModifiers(closeOverlay, ["self"]),
              ref_key: "overlayRef",
              ref: overlayRef,
              class: "mvi-overlay",
              style: overlayStyle.value
            }, _ctx.$attrs), [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 16), [
              [vShow, overlayShow.value]
            ])
          ]),
          _: 3
        })
      ], 8, ["disabled", "to"]);
    };
  }
});
const Overlay = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__scopeId", "data-v-c1a4b055"]]);
Overlay.install = (app) => {
  app.component(Overlay.name, Overlay);
};
const PopupProps = {
  //显示与否
  modelValue: {
    type: Boolean,
    default: false
  },
  //点击背景遮罩是否关闭
  closable: {
    type: Boolean,
    default: false
  },
  //遮罩层颜色
  overlayColor: {
    type: String,
    default: null
  },
  //遮罩层z-index
  zIndex: {
    type: Number,
    default: 900
  },
  //动画时长
  timeout: {
    type: Number,
    default: 200
  },
  //弹窗的位置
  placement: {
    type: String,
    default: "bottom",
    validator(value) {
      return ["left", "top", "bottom", "right"].includes(value);
    }
  },
  //弹窗是否显示圆角
  round: {
    type: Boolean,
    default: false
  },
  //弹窗显示的宽度或者高度
  width: {
    type: String,
    default: null
  },
  //是否显示关闭图标
  showTimes: {
    type: Boolean,
    default: false
  },
  //关闭图标位置
  timesPlacement: {
    type: String,
    default: "top-right",
    validator(value) {
      return ["top-right", "top-left", "bottom-right", "bottom-left"].includes(value);
    }
  },
  //挂载元素
  mountEl: {
    type: String,
    default: null
  },
  //是否考虑滚动条影响
  usePadding: {
    type: Boolean,
    default: false
  },
  //是否设置内容的padding
  __contentPadding: {
    type: Boolean,
    default: true
  }
};
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false,
    name: "m-popup"
  },
  __name: "popup",
  props: PopupProps,
  emits: ["update:modelValue", "show", "showing", "shown", "hide", "hidding", "hidden"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const popupShow = ref(false);
    const firstShow = ref(false);
    const overlayRef = ref(null);
    const $$el = computed(() => {
      return overlayRef.value ? overlayRef.value.$$el : null;
    });
    const show = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emits("update:modelValue", value);
      }
    });
    const popupClass = computed(() => {
      let cls = [props.placement];
      if (props.round) {
        cls.push("round");
      }
      if (props.showTimes) {
        if (props.timesPlacement == "top-right" || props.timesPlacement == "top-left") {
          cls.push("padding-top");
        } else if (props.timesPlacement == "bottom-right" || props.timesPlacement == "bottom-left") {
          cls.push("padding-bottom");
        }
      }
      return cls;
    });
    const popupStyle = computed(() => {
      let style = {};
      if (props.placement == "left" || props.placement == "right") {
        if (props.width) {
          style.width = props.width;
        }
      } else if (props.placement == "top" || props.placement == "bottom") {
        if (props.width) {
          style.height = props.width;
        }
      }
      if (obj.number.isNumber(props.zIndex)) {
        style.zIndex = props.zIndex + 10;
      }
      style.transition = "all " + props.timeout + "ms";
      return style;
    });
    const overlayShow = () => {
      if (!firstShow.value) {
        firstShow.value = true;
      }
      popupShow.value = true;
    };
    const overlayHide = () => {
      popupShow.value = false;
    };
    const beforeEnter = (el) => {
      if (obj.data.get(el, "mvi-popup-beforeEnter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-popup-beforeEnter-trigger", true);
      emits("show", el);
      if (typeof instance.appContext.config.globalProperties.popupComponentWatch == "function") {
        instance.appContext.config.globalProperties.popupComponentWatch.apply(instance.proxy, ["show", el]);
      }
    };
    const enter = (el) => {
      if (obj.data.get(el, "mvi-popup-enter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-popup-enter-trigger", true);
      emits("showing", el);
      if (typeof instance.appContext.config.globalProperties.popupComponentWatch == "function") {
        instance.appContext.config.globalProperties.popupComponentWatch.apply(instance.proxy, ["showing", el]);
      }
    };
    const afterEnter = (el) => {
      emits("shown", el);
      if (typeof instance.appContext.config.globalProperties.popupComponentWatch == "function") {
        instance.appContext.config.globalProperties.popupComponentWatch.apply(instance.proxy, ["shown", el]);
      }
    };
    const beforeLeave = (el) => {
      obj.data.remove(el, "mvi-popup-beforeEnter-trigger");
      obj.data.remove(el, "mvi-popup-enter-trigger");
      emits("hide", el);
      if (typeof instance.appContext.config.globalProperties.popupComponentWatch == "function") {
        instance.appContext.config.globalProperties.popupComponentWatch.apply(instance.proxy, ["hide", el]);
      }
    };
    const leave = (el) => {
      emits("hidding", el);
      if (typeof instance.appContext.config.globalProperties.popupComponentWatch == "function") {
        instance.appContext.config.globalProperties.popupComponentWatch.apply(instance.proxy, ["hidding", el]);
      }
    };
    const afterLeave = (el) => {
      emits("hidden", el);
      if (typeof instance.appContext.config.globalProperties.popupComponentWatch == "function") {
        instance.appContext.config.globalProperties.popupComponentWatch.apply(instance.proxy, ["hidden", el]);
      }
    };
    __expose({
      $$el
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Overlay), {
        ref_key: "overlayRef",
        ref: overlayRef,
        modelValue: show.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => show.value = $event),
        onShow: overlayShow,
        onHide: overlayHide,
        "use-padding": _ctx.usePadding,
        "z-index": _ctx.zIndex,
        color: _ctx.overlayColor,
        timeout: _ctx.timeout,
        "mount-el": _ctx.mountEl,
        closable: _ctx.closable
      }, {
        default: withCtx(() => [
          createVNode(Transition, {
            name: "mvi-slide-" + _ctx.placement,
            onBeforeEnter: beforeEnter,
            onEnter: enter,
            onAfterEnter: afterEnter,
            onBeforeLeave: beforeLeave,
            onLeave: leave,
            onAfterLeave: afterLeave
          }, {
            default: withCtx(() => [
              firstShow.value ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                class: ["mvi-popup", popupClass.value],
                style: popupStyle.value
              }, _ctx.$attrs), [
                _ctx.showTimes ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["mvi-popup-times", _ctx.timesPlacement])
                }, [
                  createVNode(unref(Icon), {
                    onClick: _cache[0] || (_cache[0] = ($event) => show.value = false),
                    type: "times"
                  })
                ], 2)) : createCommentVNode("", true),
                createElementVNode("div", {
                  class: "mvi-popup-content",
                  style: normalizeStyle({ padding: _ctx.__contentPadding ? "" : 0 })
                }, [
                  renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ], 4)
              ], 16)), [
                [vShow, popupShow.value]
              ]) : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["name"])
        ]),
        _: 3
      }, 8, ["modelValue", "use-padding", "z-index", "color", "timeout", "mount-el", "closable"]);
    };
  }
});
const Popup = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-53ee9d09"]]);
Popup.install = (app) => {
  app.component(Popup.name, Popup);
};
const DropdownProps = {
  //默认选中的选项
  modelValue: {
    type: [Object, Number, String, Array],
    default: null
  },
  //菜单列表选中的颜色
  activeColor: {
    type: String,
    default: null
  },
  //列表参数,含label,value,disabled,icon
  options: {
    type: Array,
    default: function() {
      return [];
    }
  },
  //选择完毕后是否关闭
  selectedClose: {
    type: Boolean,
    default: true
  },
  //自定义右侧选中的图标
  selectedIcon: {
    type: [String, Object],
    default: "success"
  },
  //是否显示
  show: {
    type: Boolean,
    default: false
  },
  //遮罩层颜色
  overlayColor: {
    type: String,
    default: null
  },
  //层级
  zIndex: {
    type: Number,
    default: 900
  },
  //动画时间
  timeout: {
    type: Number,
    default: 200
  },
  //是否圆角
  round: {
    type: Boolean,
    default: false
  },
  //位置
  placement: {
    type: String,
    default: "top"
  },
  //点击遮罩是否可关闭
  closable: {
    type: Boolean,
    default: true
  },
  //挂载元素
  mountEl: {
    type: String,
    default: null
  },
  //是否显示点击态
  active: {
    type: Boolean,
    default: true
  },
  //局部显示时是否考虑滚动条影响
  usePadding: {
    type: Boolean,
    default: false
  }
};
const _hoisted_1$C = { class: "mvi-dropdown" };
const _hoisted_2$v = ["disabled", "onClick"];
const _hoisted_3$p = { class: "mvi-dropdown-label" };
const _hoisted_4$i = ["textContent"];
const _hoisted_5$c = ["data-placement"];
const _sfc_main$J = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-dropdown"
  },
  __name: "dropdown",
  props: DropdownProps,
  emits: ["update:modelValue", "update:show", "select", "show", "showing", "shown", "hide", "hidding", "hidden"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const popupRef = ref(null);
    const $$el = computed(() => {
      return popupRef.value ? popupRef.value.$$el : null;
    });
    const cmpShow = computed({
      set(value) {
        emits("update:show", value);
      },
      get() {
        return props.show;
      }
    });
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const equalValue = computed(() => {
      return (item, index) => {
        if (item.value === void 0 || item.value === null) {
          return props.modelValue === index;
        }
        return obj.common.equal(props.modelValue, item.value);
      };
    });
    const itemDisabled = computed(() => {
      return (item) => {
        if (typeof item.disabled == "boolean") {
          return item.disabled;
        }
        return false;
      };
    });
    const dropdownItemStyle = computed(() => {
      return (item, index) => {
        let style = {};
        if (!itemDisabled.value(item) && equalValue.value(item, index) && props.activeColor) {
          style.color = props.activeColor;
        }
        return style;
      };
    });
    const dropdownItemClass = computed(() => {
      return (item, index) => {
        let cls = [];
        if (equalValue.value(item, index) && !item.disabled) {
          cls.push("checked");
        }
        if (props.active && !item.disabled) {
          cls.push("active");
        }
        return cls;
      };
    });
    const doSelect = (item, index) => {
      if (item.disabled) {
        return;
      }
      emits("select", JSON.parse(JSON.stringify(item)), index);
      if (!obj.common.equal(item.value, props.modelValue)) {
        emits("update:modelValue", item.value);
      }
      if (props.selectedClose) {
        cmpShow.value = false;
      }
    };
    __expose({
      $$el
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Popup), {
        ref_key: "popupRef",
        ref: popupRef,
        modelValue: cmpShow.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => cmpShow.value = $event),
        "overlay-color": _ctx.overlayColor,
        "z-index": _ctx.zIndex,
        timeout: _ctx.timeout,
        placement: _ctx.placement,
        round: _ctx.round,
        "use-padding": _ctx.usePadding,
        "mount-el": _ctx.mountEl,
        closable: _ctx.closable,
        __contentPadding: false
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1$C, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (item, index) => {
              return openBlock(), createElementBlock("div", {
                disabled: itemDisabled.value(item) || null,
                class: normalizeClass(["mvi-dropdown-item", dropdownItemClass.value(item, index)]),
                onClick: ($event) => doSelect(item, index),
                style: normalizeStyle(dropdownItemStyle.value(item, index))
              }, [
                createElementVNode("div", _hoisted_3$p, [
                  item.icon ? (openBlock(), createBlock(unref(Icon), {
                    key: 0,
                    type: parseIcon.value(item.icon).type,
                    url: parseIcon.value(item.icon).url,
                    spin: parseIcon.value(item.icon).spin,
                    class: "mvi-dropdown-label-icon",
                    size: parseIcon.value(item.icon).size,
                    color: parseIcon.value(item.icon).color
                  }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
                  createElementVNode("span", {
                    class: "mvi-dropdown-label-text",
                    textContent: toDisplayString(item.label || "")
                  }, null, 8, _hoisted_4$i)
                ]),
                createElementVNode("div", {
                  class: normalizeClass(["mvi-dropdown-icon", { checked: equalValue.value(item, index) }]),
                  "data-placement": _ctx.placement
                }, [
                  createVNode(unref(Icon), {
                    type: parseIcon.value(_ctx.selectedIcon).type,
                    url: parseIcon.value(_ctx.selectedIcon).url,
                    spin: parseIcon.value(_ctx.selectedIcon).spin,
                    size: parseIcon.value(_ctx.selectedIcon).size,
                    color: parseIcon.value(_ctx.selectedIcon).color
                  }, null, 8, ["type", "url", "spin", "size", "color"])
                ], 10, _hoisted_5$c)
              ], 14, _hoisted_2$v);
            }), 256))
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "overlay-color", "z-index", "timeout", "placement", "round", "use-padding", "mount-el", "closable"]);
    };
  }
});
const Dropdown = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-d6d0c643"]]);
Dropdown.install = (app) => {
  app.component(Dropdown.name, Dropdown);
};
const TooltipProps = {
  //提示内容
  title: {
    type: String,
    default: ""
  },
  //显示位置
  placement: {
    type: String,
    default: "bottom"
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //动画时间
  timeout: {
    type: Number,
    default: 200
  },
  //边框颜色
  borderColor: {
    type: String,
    default: "#333"
  },
  //背景色
  color: {
    type: String,
    default: "#333"
  },
  //字体颜色
  textColor: {
    type: String,
    default: "#fff"
  },
  //触发方式
  trigger: {
    type: String,
    default: "click",
    validator(value) {
      return ["hover", "click", "custom"].includes(value);
    }
  },
  //提示内容距离触发元素的距离
  offset: {
    type: String,
    default: "0.1rem"
  },
  //层级
  zIndex: {
    type: Number,
    default: 20
  },
  //宽度
  width: {
    type: String,
    default: null
  },
  //显示动画
  animation: {
    type: String,
    default: null
  },
  //是否显示三角图标
  showTriangle: {
    type: Boolean,
    default: true
  },
  //是否以块级展示
  block: {
    type: Boolean,
    default: false
  }
};
const _hoisted_1$B = ["data-id"];
const _hoisted_2$u = ["textContent"];
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-tooltip",
    inheritAttrs: false
  },
  __name: "tooltip",
  props: TooltipProps,
  setup(__props, { expose: __expose }) {
    const instance = getCurrentInstance();
    const props = __props;
    const show = ref(false);
    const showTooltip = () => {
      if (props.disabled) {
        return;
      }
      show.value = true;
    };
    const hideTooltip = () => {
      if (props.disabled) {
        return;
      }
      show.value = false;
    };
    const hoverShowTooltip = () => {
      if (props.trigger == "hover") {
        showTooltip();
      }
    };
    const hoverHideToolTip = () => {
      if (props.trigger == "hover") {
        hideTooltip();
      }
    };
    const clickShowTooltip = () => {
      if (props.trigger === "click") {
        if (show.value) {
          hideTooltip();
        } else {
          showTooltip();
        }
      }
    };
    __expose({
      showTooltip,
      hideTooltip
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("div", mergeProps({
          onClick: clickShowTooltip,
          onMouseenter: hoverShowTooltip,
          onMouseleave: hoverHideToolTip,
          class: ["mvi-tooltip", { block: _ctx.block }],
          "data-id": "mvi-tooltip-" + unref(instance).uid
        }, _ctx.$attrs), [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 16, _hoisted_1$B),
        createVNode(unref(Layer), {
          modelValue: show.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => show.value = $event),
          offset: _ctx.offset,
          background: _ctx.color,
          border: "",
          "border-color": _ctx.borderColor,
          closable: "",
          "show-triangle": _ctx.showTriangle,
          "z-index": _ctx.zIndex,
          relate: `[data-id='mvi-tooltip-${unref(instance).uid}']`,
          placement: _ctx.placement,
          width: _ctx.width,
          timeout: _ctx.timeout,
          animation: _ctx.animation || "mvi-tooltip",
          shadow: false
        }, {
          default: withCtx(() => [
            createElementVNode("div", {
              class: "mvi-tooltip-content",
              style: normalizeStyle({ color: _ctx.textColor, whiteSpace: _ctx.width ? "normal" : "" })
            }, [
              _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", {
                key: 1,
                textContent: toDisplayString(_ctx.title)
              }, null, 8, _hoisted_2$u))
            ], 4)
          ]),
          _: 3
        }, 8, ["modelValue", "offset", "background", "border-color", "show-triangle", "z-index", "relate", "placement", "width", "timeout", "animation"])
      ], 64);
    };
  }
});
const Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__scopeId", "data-v-7db3c383"]]);
Tooltip.install = (app) => {
  app.component(Tooltip.name, Tooltip);
};
const TransitionSlideProps = {
  //是否展开
  expand: {
    type: Boolean,
    default: true
  },
  //动画时间
  timeout: {
    type: Number,
    default: 200
  }
};
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-transition-slide"
  },
  __name: "transition-slide",
  props: TransitionSlideProps,
  emits: ["before-slide-down", "slide-down", "before-slide-up", "slide-up"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const show = ref(true);
    const height = ref("");
    const useAnimation = ref(false);
    const opacity = ref(0);
    const slideRef = ref(null);
    watch(
      () => props.expand,
      (newValue) => {
        show.value = newValue;
      }
    );
    const beforeEnter = (el) => {
      el.style.height = "0";
      el.style.transition = "height " + props.timeout + "ms linear";
      emits("before-slide-down", slideRef.value);
    };
    const enter = (el) => {
      el.offsetWidth;
      el.style.height = height.value;
    };
    const afterEnter = (el) => {
      el.style.transition = "";
      el.style.height = "";
      emits("slide-down", slideRef.value);
    };
    const beforeLeave = (el) => {
      if (!height.value) {
        height.value = obj.element.getCssStyle(el, "height");
      }
      el.style.height = height.value;
      if (useAnimation.value) {
        el.style.transition = "height " + props.timeout + "ms linear";
        emits("before-slide-up", slideRef.value);
      }
    };
    const leave = (el) => {
      el.offsetWidth;
      el.style.height = "0";
    };
    const afterLeave = (el) => {
      el.style.height = "";
      if (useAnimation.value) {
        el.style.transition = "";
        emits("slide-up", slideRef.value);
      } else {
        useAnimation.value = true;
        opacity.value = "";
      }
    };
    onMounted(() => {
      show.value = props.expand;
      if (show.value) {
        useAnimation.value = true;
        opacity.value = "";
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: "mvi-transition-slide",
        onBeforeEnter: beforeEnter,
        onAfterEnter: afterEnter,
        onBeforeLeave: beforeLeave,
        onAfterLeave: afterLeave,
        onEnter: enter,
        onLeave: leave
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            class: "mvi-transition-slide",
            ref_key: "slideRef",
            ref: slideRef,
            style: normalizeStyle({ opacity: opacity.value })
          }, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 4), [
            [vShow, show.value]
          ])
        ]),
        _: 3
      });
    };
  }
});
const TransitionSlide = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-b1befb0e"]]);
TransitionSlide.install = (app) => {
  app.component(TransitionSlide.name, TransitionSlide);
};
const SwitchProps = {
  //是否勾选
  modelValue: {
    type: Boolean,
    default: false
  },
  //是否显示加载状态
  loading: {
    type: Boolean,
    default: false
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //尺寸大小
  size: {
    type: String,
    default: "0.4rem"
  },
  //开关打开时背景色
  activeColor: {
    type: String,
    default: null
  },
  //开关关闭时背景色
  inactiveColor: {
    type: String,
    default: null
  }
};
const _hoisted_1$A = ["disabled"];
const _hoisted_2$t = ["checked", "disabled"];
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-switch"
  },
  __name: "switch",
  props: SwitchProps,
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const switchStyle = computed(() => {
      let style = {};
      if (props.inactiveColor && !props.modelValue) {
        style.backgroundColor = props.inactiveColor;
      }
      if (props.activeColor && props.modelValue) {
        style.backgroundColor = props.activeColor;
      }
      if (props.size) {
        style.width = `calc(${props.size} * 2)`;
      }
      return style;
    });
    const elStyle = computed(() => {
      let style = {};
      if (props.activeColor) {
        style.color = props.activeColor;
      }
      if (props.size) {
        style.width = props.size;
        style.height = props.size;
        style.fontSize = props.size;
      }
      return style;
    });
    const change = (event2) => {
      let check = event2.target.checked;
      emits("update:modelValue", check);
      emits("change", check);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", {
        class: normalizeClass(["mvi-switch", { checked: _ctx.modelValue }]),
        style: normalizeStyle(switchStyle.value),
        disabled: _ctx.disabled || null
      }, [
        createElementVNode("span", {
          class: normalizeClass(["mvi-switch-el", { checked: _ctx.modelValue }]),
          style: normalizeStyle(elStyle.value)
        }, [
          _ctx.loading && !_ctx.disabled ? (openBlock(), createBlock(unref(Icon), {
            key: 0,
            type: "load-e",
            spin: "",
            size: "0.8em"
          })) : createCommentVNode("", true)
        ], 6),
        createElementVNode("input", {
          onChange: change,
          type: "checkbox",
          checked: _ctx.modelValue,
          disabled: _ctx.disabled || _ctx.loading
        }, null, 40, _hoisted_2$t)
      ], 14, _hoisted_1$A);
    };
  }
});
const Switch = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-689541b1"]]);
Switch.install = (app) => {
  app.component(Switch.name, Switch);
};
const NavbarProps = {
  //标题
  title: {
    type: String,
    default: null
  },
  //左侧文本
  leftText: {
    type: String,
    default: null
  },
  //右侧文本
  rightText: {
    type: String,
    default: null
  },
  //左侧图标
  leftIcon: {
    type: [String, Object],
    default: null
  },
  //右侧图标
  rightIcon: {
    type: [String, Object],
    default: null
  },
  //是否固定顶部
  fixed: {
    type: Boolean,
    default: false
  },
  //是否显示下边框
  border: {
    type: Boolean,
    default: false
  },
  //层级
  zIndex: {
    type: Number,
    default: 400
  }
};
const _hoisted_1$z = ["textContent"];
const _hoisted_2$s = { class: "mvi-navbar-title" };
const _hoisted_3$o = ["textContent"];
const _hoisted_4$h = ["textContent"];
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-navbar"
  },
  __name: "navbar",
  props: NavbarProps,
  emits: ["left-click", "right-click", "title-click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const showLeft = computed(() => {
      return !!(parseIcon.value(props.leftIcon).type || parseIcon.value(props.leftIcon).url || useSlots().left || props.leftText);
    });
    const showRight = computed(() => {
      return !!(parseIcon.value(props.rightIcon).type || parseIcon.value(props.rightIcon).url || useSlots().right || props.rightText);
    });
    const leftStyle = computed(() => {
      let style = {};
      if (props.title || useSlots().title) {
        style.width = "20%";
      } else if (showRight.value) {
        style.width = "50%";
      } else {
        style.width = "100%";
      }
      return style;
    });
    const rightStyle = computed(() => {
      let style = {};
      if (props.title || useSlots().title) {
        style.width = "20%";
      } else if (showLeft.value) {
        style.width = "50%";
      } else {
        style.width = "100%";
      }
      return style;
    });
    const centerStyle = computed(() => {
      let style = {};
      if (showLeft.value || showRight.value) {
        style.width = "60%";
      } else {
        style.width = "100%";
      }
      return style;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-navbar", { fixed: _ctx.fixed, border: _ctx.border }]),
        style: normalizeStyle({ "z-index": _ctx.fixed ? _ctx.zIndex : "" })
      }, [
        showLeft.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          onClick: _cache[0] || (_cache[0] = ($event) => emits("left-click")),
          class: "mvi-navbar-left",
          style: normalizeStyle(leftStyle.value)
        }, [
          _ctx.$slots.left ? renderSlot(_ctx.$slots, "left", { key: 0 }, void 0, true) : createCommentVNode("", true),
          (parseIcon.value(_ctx.leftIcon).type || parseIcon.value(_ctx.leftIcon).url) && !_ctx.$slots.left ? (openBlock(), createBlock(unref(Icon), {
            key: 1,
            class: normalizeClass({ "mvi-navbar-left-icon": !!_ctx.leftText }),
            type: parseIcon.value(_ctx.leftIcon).type,
            url: parseIcon.value(_ctx.leftIcon).url,
            spin: parseIcon.value(_ctx.leftIcon).spin,
            size: parseIcon.value(_ctx.leftIcon).size,
            color: parseIcon.value(_ctx.leftIcon).color
          }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
          _ctx.leftText && !_ctx.$slots.left ? (openBlock(), createElementBlock("span", {
            key: 2,
            class: "mvi-navbar-left-text",
            textContent: toDisplayString(_ctx.leftText)
          }, null, 8, _hoisted_1$z)) : createCommentVNode("", true)
        ], 4)) : createCommentVNode("", true),
        _ctx.$slots.title || _ctx.title ? (openBlock(), createElementBlock("div", {
          key: 1,
          onClick: _cache[1] || (_cache[1] = ($event) => emits("title-click")),
          class: "mvi-navbar-center",
          style: normalizeStyle(centerStyle.value)
        }, [
          createElementVNode("div", _hoisted_2$s, [
            _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : _ctx.title ? (openBlock(), createElementBlock("span", {
              key: 1,
              textContent: toDisplayString(_ctx.title)
            }, null, 8, _hoisted_3$o)) : createCommentVNode("", true)
          ])
        ], 4)) : createCommentVNode("", true),
        showRight.value ? (openBlock(), createElementBlock("div", {
          key: 2,
          onClick: _cache[2] || (_cache[2] = ($event) => emits("right-click")),
          class: "mvi-navbar-right",
          style: normalizeStyle(rightStyle.value)
        }, [
          _ctx.$slots.right ? renderSlot(_ctx.$slots, "right", { key: 0 }, void 0, true) : createCommentVNode("", true),
          _ctx.rightText && !_ctx.$slots.right ? (openBlock(), createElementBlock("span", {
            key: 1,
            class: "mvi-navbar-right-text",
            textContent: toDisplayString(_ctx.rightText)
          }, null, 8, _hoisted_4$h)) : createCommentVNode("", true),
          (parseIcon.value(_ctx.rightIcon).type || parseIcon.value(_ctx.rightIcon).url) && !_ctx.$slots.right ? (openBlock(), createBlock(unref(Icon), {
            key: 2,
            class: normalizeClass({ "mvi-navbar-right-icon": !!_ctx.rightText }),
            type: parseIcon.value(_ctx.rightIcon).type,
            url: parseIcon.value(_ctx.rightIcon).url,
            spin: parseIcon.value(_ctx.rightIcon).spin,
            size: parseIcon.value(_ctx.rightIcon).size,
            color: parseIcon.value(_ctx.rightIcon).color
          }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
        ], 4)) : createCommentVNode("", true)
      ], 6);
    };
  }
});
const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-818340bf"]]);
Navbar.install = (app) => {
  app.component(Navbar.name, Navbar);
};
const NotifyProps = {
  //提示类型
  type: {
    type: String,
    default: null
  },
  //展示文字
  message: {
    type: String,
    default: null
  },
  //字体颜色
  color: {
    type: String,
    default: null
  },
  //背景色
  background: {
    type: String,
    default: null
  },
  //层级
  zIndex: {
    type: Number,
    default: null
  },
  //自动关闭间隔
  timeout: {
    type: Number,
    default: null
  },
  //图标
  icon: {
    type: [String, Object],
    default: null
  },
  //移除方法
  __remove: {
    type: Function,
    default: function() {
      return function() {
      };
    }
  },
  //初始化方法
  __init: {
    type: Function,
    default: function() {
      return function() {
      };
    }
  }
};
const _hoisted_1$y = { class: "mvi-notify-content" };
const _hoisted_2$r = ["textContent"];
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-notify"
  },
  __name: "notify",
  props: NotifyProps,
  setup(__props, { expose: __expose }) {
    const instance = getCurrentInstance();
    const props = __props;
    const timer = ref(null);
    const show = ref(false);
    const cmpType = computed(() => {
      let arr = ["success", "info", "primary", "error", "warn"];
      if (arr.includes(props.type)) {
        return props.type;
      }
      return "success";
    });
    const cmpMessage = computed(() => {
      if (typeof props.message == "string") {
        return props.message;
      }
      if (obj.common.isObject(props.message)) {
        return JSON.stringify(props.message);
      }
      return String(props.message);
    });
    const cmpColor = computed(() => {
      if (typeof props.color == "string") {
        return props.color;
      }
      return null;
    });
    const cmpBackground = computed(() => {
      if (typeof props.background == "string") {
        return props.background;
      }
      return null;
    });
    const cmpZIndex = computed(() => {
      if (obj.number.isNumber(props.zIndex)) {
        return props.zIndex;
      }
      return 1100;
    });
    const cmpTimeout = computed(() => {
      if (obj.number.isNumber(props.timeout)) {
        return props.timeout;
      }
      return 1500;
    });
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const notifyStyle = computed(() => {
      let style = {
        zIndex: cmpZIndex.value
      };
      if (cmpBackground.value) {
        style.backgroundColor = cmpBackground.value;
      }
      if (cmpColor.value) {
        style.color = cmpColor.value;
      }
      return style;
    });
    const clearTimer = () => {
      if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
      }
    };
    const afterEnter = () => {
      if (cmpTimeout.value > 0) {
        timer.value = setTimeout(() => {
          show.value = false;
        }, cmpTimeout.value);
      }
    };
    const afterLeave = () => {
      clearTimer();
      props.__remove();
    };
    onMounted(() => {
      show.value = true;
      props.__init(instance);
    });
    __expose({
      show
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, {
          name: "mvi-notify",
          onAfterLeave: afterLeave,
          onAfterEnter: afterEnter
        }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", {
              class: normalizeClass(["mvi-notify", [cmpType.value]]),
              style: normalizeStyle(notifyStyle.value)
            }, [
              createElementVNode("div", _hoisted_1$y, [
                parseIcon.value(_ctx.icon).type || parseIcon.value(_ctx.icon).url ? (openBlock(), createBlock(unref(Icon), {
                  key: 0,
                  type: parseIcon.value(_ctx.icon).type,
                  url: parseIcon.value(_ctx.icon).url,
                  spin: parseIcon.value(_ctx.icon).spin,
                  size: parseIcon.value(_ctx.icon).size,
                  color: parseIcon.value(_ctx.icon).color
                }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
                createElementVNode("span", {
                  textContent: toDisplayString(cmpMessage.value)
                }, null, 8, _hoisted_2$r)
              ])
            ], 6), [
              [vShow, show.value]
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const NotifyComponent = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-7a337a7a"]]);
const Notify = {
  //初始化参数
  initParams: (options) => {
    let opts = {};
    if (obj.common.isObject(options)) {
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
  //显示弹窗
  showNotify: (options) => {
    return new Promise((resolve) => {
      if (Notify.$el && Notify.$instance) {
        Notify.$instance.unmount();
        Notify.$el.remove();
      }
      let opts = Notify.initParams(options);
      let mountNode = obj.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(NotifyComponent, {
        ...opts,
        __init: (vm) => {
          Notify.$vm = vm;
        },
        __remove: () => {
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
  //关闭弹窗
  hideNotify: () => {
    if (Notify.$vm) {
      Notify.$vm.exposed.show.value = false;
    }
  },
  //注册函数
  install: (app) => {
    app.config.globalProperties.$showNotify = Notify.showNotify;
    app.provide("$showNotify", Notify.showNotify);
    app.config.globalProperties.$hideNotify = Notify.hideNotify;
    app.provide("$hideNotify", Notify.hideNotify);
  }
};
const ActionsheetProps = {
  //是否显示
  modelValue: {
    type: Boolean,
    default: false
  },
  //遮罩层颜色
  overlayColor: {
    type: String,
    default: null
  },
  //层级
  zIndex: {
    type: Number,
    default: 900
  },
  //动画时间
  timeout: {
    type: Number,
    default: 200
  },
  //是否显示圆角
  round: {
    type: Boolean,
    default: false
  },
  //标题
  title: {
    type: String,
    default: null
  },
  //点击遮罩是否可关闭
  closable: {
    type: Boolean,
    default: false
  },
  //配置项，每个配置项包含label、loading、icon、placement、disabled
  options: {
    type: Array,
    default: function() {
      return [];
    }
  },
  //是否显示取消按钮
  showCancel: {
    type: Boolean,
    default: true
  },
  //取消按钮文字
  cancelText: {
    type: String,
    default: "取消"
  },
  //列表和取消按钮是否显示点击态
  active: {
    type: Boolean,
    default: true
  },
  //挂载元素
  mountEl: {
    type: String,
    default: null
  },
  //选择完是否自动关闭
  selectClose: {
    type: Boolean,
    default: true
  },
  //局部显示时是否考虑滚动条影响
  usePadding: {
    type: Boolean,
    default: false
  },
  //尺寸
  size: {
    type: String,
    default: "medium",
    validator(value) {
      return ["medium", "large"].includes(value);
    }
  }
};
const _withScopeId$3 = (n) => (pushScopeId("data-v-2bd58b94"), n = n(), popScopeId(), n);
const _hoisted_1$x = { class: "mvi-actionsheet" };
const _hoisted_2$q = ["textContent"];
const _hoisted_3$n = { class: "mvi-actionsheet-list" };
const _hoisted_4$g = ["disabled", "onClick"];
const _hoisted_5$b = {
  key: 1,
  class: "mvi-actionsheet-content"
};
const _hoisted_6$a = ["textContent"];
const _hoisted_7$9 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("div", { class: "mvi-actionsheet-divider" }, null, -1));
const _hoisted_8$6 = ["textContent"];
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-actionsheet"
  },
  __name: "actionsheet",
  props: ActionsheetProps,
  emits: ["update:modelValue", "select"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const popupRef = ref(null);
    const $$el = computed(() => {
      return popupRef.value ? popupRef.value.$$el : null;
    });
    const show = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emits("update:modelValue", value);
      }
    });
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const itemClass = computed(() => {
      return (item) => {
        let cls = [props.size];
        if (props.active && !item.loading && !item.disabled) {
          cls.push("active");
        }
        return cls;
      };
    });
    const itemDisabled = computed(() => {
      return (item) => {
        if (typeof item.disabled == "boolean") {
          return item.disabled;
        }
        return false;
      };
    });
    const doSelect = (item, index) => {
      if (item.disabled || item.loading) {
        return;
      }
      if (props.selectClose) {
        show.value = false;
      }
      emits("select", { ...item }, index);
    };
    __expose({
      $$el
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Popup), {
        ref_key: "popupRef",
        ref: popupRef,
        modelValue: show.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => show.value = $event),
        "overlay-color": _ctx.overlayColor,
        "z-index": _ctx.zIndex,
        timeout: _ctx.timeout,
        placement: "bottom",
        round: _ctx.round,
        "use-padding": _ctx.usePadding,
        "mount-el": _ctx.mountEl,
        closable: _ctx.closable
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1$x, [
            _ctx.title ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["mvi-actionsheet-title", [_ctx.size]]),
              textContent: toDisplayString(_ctx.title)
            }, null, 10, _hoisted_2$q)) : createCommentVNode("", true),
            createElementVNode("div", _hoisted_3$n, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (item, index) => {
                return openBlock(), createElementBlock("div", {
                  class: normalizeClass(["mvi-actionsheet-item", itemClass.value(item)]),
                  disabled: itemDisabled.value(item) || null,
                  onClick: ($event) => doSelect(item, index)
                }, [
                  item.loading || false ? (openBlock(), createBlock(unref(Loading), {
                    key: 0,
                    size: _ctx.size == "large" ? "0.5rem" : "0.4rem",
                    color: "#bbb"
                  }, null, 8, ["size"])) : item.label || parseIcon.value(item.icon).type || parseIcon.value(item.icon).url ? (openBlock(), createElementBlock("div", _hoisted_5$b, [
                    (parseIcon.value(item.icon).type || parseIcon.value(item.icon).url) && item.placement != "right" ? (openBlock(), createBlock(unref(Icon), {
                      key: 0,
                      "data-placement": "left",
                      type: parseIcon.value(item.icon).type,
                      url: parseIcon.value(item.icon).url,
                      spin: parseIcon.value(item.icon).spin,
                      size: parseIcon.value(item.icon).size,
                      color: parseIcon.value(item.icon).color
                    }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
                    item.label ? (openBlock(), createElementBlock("span", {
                      key: 1,
                      class: "mvi-actionsheet-item-label",
                      textContent: toDisplayString(item.label)
                    }, null, 8, _hoisted_6$a)) : createCommentVNode("", true),
                    (parseIcon.value(item.icon).type || parseIcon.value(item.icon).url) && item.placement == "right" ? (openBlock(), createBlock(unref(Icon), {
                      key: 2,
                      "data-placement": "right",
                      type: parseIcon.value(item.icon).type,
                      url: parseIcon.value(item.icon).url,
                      spin: parseIcon.value(item.icon).spin,
                      size: parseIcon.value(item.icon).size,
                      color: parseIcon.value(item.icon).color
                    }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ], 10, _hoisted_4$g);
              }), 256))
            ]),
            _hoisted_7$9,
            _ctx.showCancel ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(["mvi-actionsheet-button", [_ctx.size, { active: _ctx.active }]]),
              textContent: toDisplayString(_ctx.cancelText),
              onClick: _cache[0] || (_cache[0] = ($event) => show.value = false)
            }, null, 10, _hoisted_8$6)) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "overlay-color", "z-index", "timeout", "round", "use-padding", "mount-el", "closable"]);
    };
  }
});
const Actionsheet = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-2bd58b94"]]);
Actionsheet.install = (app) => {
  app.component(Actionsheet.name, Actionsheet);
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var dayjs_min = { exports: {} };
(function(module, exports) {
  !function(t, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h2 = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
      var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
      return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
    } }, m = function(t2, e2, n2) {
      var r2 = String(t2);
      return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
    }, v = { s: m, z: function(t2) {
      var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
      return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
    }, m: function t2(e2, n2) {
      if (e2.date() < n2.date())
        return -t2(n2, e2);
      var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
      return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
    }, a: function(t2) {
      return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
    }, p: function(t2) {
      return { M: c, y: h2, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t2) {
      return void 0 === t2;
    } }, g = "en", D = {};
    D[g] = M;
    var p = "$isDayjsObject", S = function(t2) {
      return t2 instanceof _ || !(!t2 || !t2[p]);
    }, w = function t2(e2, n2, r2) {
      var i2;
      if (!e2)
        return g;
      if ("string" == typeof e2) {
        var s2 = e2.toLowerCase();
        D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
        var u2 = e2.split("-");
        if (!i2 && u2.length > 1)
          return t2(u2[0]);
      } else {
        var a2 = e2.name;
        D[a2] = e2, i2 = a2;
      }
      return !r2 && i2 && (g = i2), i2 || !r2 && g;
    }, O = function(t2, e2) {
      if (S(t2))
        return t2.clone();
      var n2 = "object" == typeof e2 ? e2 : {};
      return n2.date = t2, n2.args = arguments, new _(n2);
    }, b = v;
    b.l = w, b.i = S, b.w = function(t2, e2) {
      return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
    };
    var _ = function() {
      function M2(t2) {
        this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
      }
      var m2 = M2.prototype;
      return m2.parse = function(t2) {
        this.$d = function(t3) {
          var e2 = t3.date, n2 = t3.utc;
          if (null === e2)
            return /* @__PURE__ */ new Date(NaN);
          if (b.u(e2))
            return /* @__PURE__ */ new Date();
          if (e2 instanceof Date)
            return new Date(e2);
          if ("string" == typeof e2 && !/Z$/i.test(e2)) {
            var r2 = e2.match($);
            if (r2) {
              var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
              return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
            }
          }
          return new Date(e2);
        }(t2), this.init();
      }, m2.init = function() {
        var t2 = this.$d;
        this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
      }, m2.$utils = function() {
        return b;
      }, m2.isValid = function() {
        return !(this.$d.toString() === l);
      }, m2.isSame = function(t2, e2) {
        var n2 = O(t2);
        return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
      }, m2.isAfter = function(t2, e2) {
        return O(t2) < this.startOf(e2);
      }, m2.isBefore = function(t2, e2) {
        return this.endOf(e2) < O(t2);
      }, m2.$g = function(t2, e2, n2) {
        return b.u(t2) ? this[e2] : this.set(n2, t2);
      }, m2.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m2.valueOf = function() {
        return this.$d.getTime();
      }, m2.startOf = function(t2, e2) {
        var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
          var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
          return r2 ? i2 : i2.endOf(a);
        }, $2 = function(t3, e3) {
          return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
        }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
        switch (f2) {
          case h2:
            return r2 ? l2(1, 0) : l2(31, 11);
          case c:
            return r2 ? l2(1, M3) : l2(0, M3 + 1);
          case o:
            var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
            return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
          case a:
          case d:
            return $2(v2 + "Hours", 0);
          case u:
            return $2(v2 + "Minutes", 1);
          case s:
            return $2(v2 + "Seconds", 2);
          case i:
            return $2(v2 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m2.endOf = function(t2) {
        return this.startOf(t2, false);
      }, m2.$set = function(t2, e2) {
        var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h2] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
        if (o2 === c || o2 === h2) {
          var y2 = this.clone().set(d, 1);
          y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
        } else
          l2 && this.$d[l2]($2);
        return this.init(), this;
      }, m2.set = function(t2, e2) {
        return this.clone().$set(t2, e2);
      }, m2.get = function(t2) {
        return this[b.p(t2)]();
      }, m2.add = function(r2, f2) {
        var d2, l2 = this;
        r2 = Number(r2);
        var $2 = b.p(f2), y2 = function(t2) {
          var e2 = O(l2);
          return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
        };
        if ($2 === c)
          return this.set(c, this.$M + r2);
        if ($2 === h2)
          return this.set(h2, this.$y + r2);
        if ($2 === a)
          return y2(1);
        if ($2 === o)
          return y2(7);
        var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
        return b.w(m3, this);
      }, m2.subtract = function(t2, e2) {
        return this.add(-1 * t2, e2);
      }, m2.format = function(t2) {
        var e2 = this, n2 = this.$locale();
        if (!this.isValid())
          return n2.invalidDate || l;
        var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h3 = function(t3, n3, i3, s3) {
          return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
        }, d2 = function(t3) {
          return b.s(s2 % 12 || 12, t3, "0");
        }, $2 = f2 || function(t3, e3, n3) {
          var r3 = t3 < 12 ? "AM" : "PM";
          return n3 ? r3.toLowerCase() : r3;
        };
        return r2.replace(y, function(t3, r3) {
          return r3 || function(t4) {
            switch (t4) {
              case "YY":
                return String(e2.$y).slice(-2);
              case "YYYY":
                return b.s(e2.$y, 4, "0");
              case "M":
                return a2 + 1;
              case "MM":
                return b.s(a2 + 1, 2, "0");
              case "MMM":
                return h3(n2.monthsShort, a2, c2, 3);
              case "MMMM":
                return h3(c2, a2);
              case "D":
                return e2.$D;
              case "DD":
                return b.s(e2.$D, 2, "0");
              case "d":
                return String(e2.$W);
              case "dd":
                return h3(n2.weekdaysMin, e2.$W, o2, 2);
              case "ddd":
                return h3(n2.weekdaysShort, e2.$W, o2, 3);
              case "dddd":
                return o2[e2.$W];
              case "H":
                return String(s2);
              case "HH":
                return b.s(s2, 2, "0");
              case "h":
                return d2(1);
              case "hh":
                return d2(2);
              case "a":
                return $2(s2, u2, true);
              case "A":
                return $2(s2, u2, false);
              case "m":
                return String(u2);
              case "mm":
                return b.s(u2, 2, "0");
              case "s":
                return String(e2.$s);
              case "ss":
                return b.s(e2.$s, 2, "0");
              case "SSS":
                return b.s(e2.$ms, 3, "0");
              case "Z":
                return i2;
            }
            return null;
          }(t3) || i2.replace(":", "");
        });
      }, m2.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m2.diff = function(r2, d2, l2) {
        var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
          return b.m(y2, m3);
        };
        switch (M3) {
          case h2:
            $2 = D2() / 12;
            break;
          case c:
            $2 = D2();
            break;
          case f:
            $2 = D2() / 3;
            break;
          case o:
            $2 = (g2 - v2) / 6048e5;
            break;
          case a:
            $2 = (g2 - v2) / 864e5;
            break;
          case u:
            $2 = g2 / n;
            break;
          case s:
            $2 = g2 / e;
            break;
          case i:
            $2 = g2 / t;
            break;
          default:
            $2 = g2;
        }
        return l2 ? $2 : b.a($2);
      }, m2.daysInMonth = function() {
        return this.endOf(c).$D;
      }, m2.$locale = function() {
        return D[this.$L];
      }, m2.locale = function(t2, e2) {
        if (!t2)
          return this.$L;
        var n2 = this.clone(), r2 = w(t2, e2, true);
        return r2 && (n2.$L = r2), n2;
      }, m2.clone = function() {
        return b.w(this.$d, this);
      }, m2.toDate = function() {
        return new Date(this.valueOf());
      }, m2.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m2.toISOString = function() {
        return this.$d.toISOString();
      }, m2.toString = function() {
        return this.$d.toUTCString();
      }, M2;
    }(), k = _.prototype;
    return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h2], ["$D", d]].forEach(function(t2) {
      k[t2[1]] = function(e2) {
        return this.$g(e2, t2[0], t2[1]);
      };
    }), O.extend = function(t2, e2) {
      return t2.$i || (t2(e2, _, O), t2.$i = true), O;
    }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
      return O(1e3 * t2);
    }, O.en = D[g], O.Ls = D, O.p = {}, O;
  });
})(dayjs_min);
var dayjs_minExports = dayjs_min.exports;
const dayjs = /* @__PURE__ */ getDefaultExportFromCjs(dayjs_minExports);
const CalendarProps = {
  //指定显示的日期
  modelValue: {
    type: Date,
    default: function() {
      return /* @__PURE__ */ new Date();
    }
  },
  //视图类型
  view: {
    type: String,
    default: "date",
    validator(value) {
      return ["year", "month", "date"].includes(value);
    }
  },
  //月份面板显示的月份数组文字
  monthText: {
    type: Array,
    default: function() {
      return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    },
    validator(value) {
      if (value.length != 12) {
        return false;
      }
      return value.every((item) => {
        return obj.number.isNumber(item) || typeof item == "string" && item;
      });
    }
  },
  //头部显示的星期数组
  weekText: {
    type: Array,
    default: function() {
      return ["日", "一", "二", "三", "四", "五", "六"];
    },
    validator(value) {
      if (value.length != 7) {
        return false;
      }
      return value.every((item) => {
        return obj.number.isNumber(item) || typeof item == "string" && item;
      });
    }
  },
  //开始日期
  startDate: {
    type: Date,
    default: function() {
      return dayjs("1970-01-01").toDate();
    }
  },
  //截止日期
  endDate: {
    type: Date,
    default: function() {
      return dayjs("2099-01-01").toDate();
    }
  },
  //非本月日期是否可以点击
  nonCurrentClick: {
    type: Boolean,
    default: false
  },
  //点击态
  active: {
    type: Boolean,
    default: true
  },
  //主题样式
  type: {
    type: String,
    default: "info",
    validator(value) {
      return ["info", "primary", "error", "warn", "success"].includes(value);
    }
  }
};
const _hoisted_1$w = { class: "mvi-calendar" };
const _hoisted_2$p = { class: "mvi-calendar-years" };
const _hoisted_3$m = { class: "mvi-calendar-year" };
const _hoisted_4$f = ["disabled", "onClick"];
const _hoisted_5$a = { class: "mvi-calendar-months" };
const _hoisted_6$9 = { class: "mvi-calendar-month" };
const _hoisted_7$8 = ["disabled", "onClick"];
const _hoisted_8$5 = {
  key: 2,
  class: "mvi-calendar-date"
};
const _hoisted_9$3 = { class: "mvi-calendar-date-header" };
const _hoisted_10$1 = { class: "mvi-calendar-date-header-item" };
const _hoisted_11$1 = { class: "mvi-calendar-date-body" };
const _hoisted_12$1 = { class: "mvi-calendar-date-row" };
const _hoisted_13$1 = { class: "mvi-calendar-date-column" };
const _hoisted_14 = ["disabled", "onClick"];
const _sfc_main$C = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-calendar"
  },
  __name: "calendar",
  props: CalendarProps,
  emits: ["update:modelValue", "date-click", "month-click", "year-click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const years = computed(() => {
      let arr = [];
      const year = props.modelValue.getFullYear();
      const startYear = props.startDate.getFullYear();
      let index = Math.floor((year - startYear) / 12);
      for (let i = startYear + index * 12; i < startYear + index * 12 + 12; i++) {
        arr.push(dayjs(props.modelValue).year(i).toDate());
      }
      return arr;
    });
    const months = computed(() => {
      let arr = [];
      for (let i = 0; i < 12; i++) {
        arr.push(dayjs(props.modelValue).month(i).toDate());
      }
      return arr;
    });
    const days = computed(() => {
      let total = dayjs(props.modelValue).daysInMonth();
      let arr = [];
      for (let i = 1; i <= total; i++) {
        arr.push({
          date: dayjs(`${dayjs(props.modelValue).format("YYYY-MM")}-${i < 10 ? "0" + i : i}`).toDate(),
          nonCurrent: false
        });
      }
      const firstDate = arr[0].date;
      let firstWeek = firstDate.getDay();
      for (let i = 0; i < firstWeek; i++) {
        let prevDate = dayjs(firstDate).subtract(i + 1, "day").toDate();
        arr.unshift({
          date: prevDate,
          nonCurrent: true
        });
      }
      const lastDate = arr[arr.length - 1].date;
      let lastWeek = lastDate.getDay();
      for (let i = 0; i < 6 - lastWeek; i++) {
        let nextDate = dayjs(lastDate).add(i + 1, "day").toDate();
        arr.push({
          date: nextDate,
          nonCurrent: true
        });
      }
      return arr;
    });
    const yearDisabled = computed(() => {
      return (date) => {
        return dayjs(date).isBefore(dayjs(props.startDate), "year") || dayjs(date).isAfter(dayjs(props.endDate), "year");
      };
    });
    const monthDisabled = computed(() => {
      return (date) => {
        return dayjs(date).isBefore(dayjs(props.startDate), "month") || dayjs(date).isAfter(dayjs(props.endDate), "month");
      };
    });
    const dateDisabled = computed(() => {
      return (item) => {
        return dayjs(item.date).isBefore(dayjs(props.startDate), "date") || dayjs(item.date).isAfter(dayjs(props.endDate), "date");
      };
    });
    const yearClass = computed(() => {
      return (date) => {
        let arr = [props.type];
        if (yearDisabled.value(date)) {
          return arr;
        }
        if (props.active) {
          arr.push("active");
        }
        if (dayjs().isSame(dayjs(date), "year")) {
          arr.push("now");
        }
        if (dayjs(props.modelValue).isSame(dayjs(date), "year")) {
          arr.push("current");
        }
        return arr;
      };
    });
    const monthClass = computed(() => {
      return (date) => {
        let arr = [props.type];
        if (monthDisabled.value(date)) {
          return arr;
        }
        if (props.active) {
          arr.push("active");
        }
        if (dayjs().isSame(dayjs(date), "month")) {
          arr.push("now");
        }
        if (dayjs(props.modelValue).isSame(dayjs(date), "month")) {
          arr.push("current");
        }
        return arr;
      };
    });
    const dateClass = computed(() => {
      return (item) => {
        let arr = [props.type];
        if (dateDisabled.value(item)) {
          return arr;
        }
        if (item.nonCurrent) {
          arr.push("none-current");
          if (props.nonCurrentClick) {
            arr.push("allowed");
            if (props.active) {
              arr.push("active");
            }
          }
        } else {
          if (props.active) {
            arr.push("active");
          }
          if (dayjs().isSame(dayjs(item.date), "date")) {
            arr.push("now");
          }
          if (dayjs(props.modelValue).isSame(dayjs(item.date), "date")) {
            arr.push("current");
          }
        }
        return arr;
      };
    });
    const yearClick = (date) => {
      if (yearDisabled.value(date)) {
        return;
      }
      emits("update:modelValue", date);
      emits("year-click", date);
    };
    const monthClick = (date) => {
      if (monthDisabled.value(date)) {
        return;
      }
      emits("update:modelValue", date);
      emits("month-click", date);
    };
    const dateClick = (item) => {
      if (dateDisabled.value(item)) {
        return;
      }
      if (item.nonCurrent && !props.nonCurrentClick) {
        return;
      }
      emits("update:modelValue", item.date);
      emits("date-click", item.date);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$w, [
        _ctx.view == "year" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, renderList([0, 1, 2], (item) => {
          return createElementVNode("div", _hoisted_2$p, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(years.value.slice(item * 4, item * 4 + 4), (el) => {
              return openBlock(), createElementBlock("div", _hoisted_3$m, [
                createElementVNode("div", {
                  class: normalizeClass(["mvi-calendar-year-item", yearClass.value(el)]),
                  disabled: yearDisabled.value(el) || null,
                  onClick: ($event) => yearClick(el)
                }, toDisplayString(el.getFullYear()), 11, _hoisted_4$f)
              ]);
            }), 256))
          ]);
        }), 64)) : _ctx.view == "month" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, renderList([0, 1, 2], (item) => {
          return createElementVNode("div", _hoisted_5$a, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(months.value.slice(item * 4, item * 4 + 4), (el) => {
              return openBlock(), createElementBlock("div", _hoisted_6$9, [
                createElementVNode("div", {
                  class: normalizeClass(["mvi-calendar-month-item", monthClass.value(el)]),
                  disabled: monthDisabled.value(el) || null,
                  onClick: ($event) => monthClick(el)
                }, toDisplayString(_ctx.monthText[el.getMonth()]), 11, _hoisted_7$8)
              ]);
            }), 256))
          ]);
        }), 64)) : _ctx.view == "date" ? (openBlock(), createElementBlock("div", _hoisted_8$5, [
          createElementVNode("div", _hoisted_9$3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.weekText, (item) => {
              return openBlock(), createElementBlock("div", _hoisted_10$1, toDisplayString(item), 1);
            }), 256))
          ]),
          createElementVNode("div", _hoisted_11$1, [
            (openBlock(), createElementBlock(Fragment, null, renderList([0, 1, 2, 3, 4, 5], (item) => {
              return createElementVNode("div", _hoisted_12$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(days.value.slice(item * 7, item * 7 + 7), (el) => {
                  return openBlock(), createElementBlock("div", _hoisted_13$1, [
                    createElementVNode("div", {
                      class: normalizeClass(["mvi-calendar-date-item", dateClass.value(el)]),
                      disabled: dateDisabled.value(el) || null,
                      onClick: ($event) => dateClick(el)
                    }, toDisplayString(el.date.getDate()), 11, _hoisted_14)
                  ]);
                }), 256))
              ]);
            }), 64))
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-6fadcb4d"]]);
Calendar.install = (app) => {
  app.component(Calendar.name, Calendar);
};
const CircleProgressProps = {
  //进度值
  value: {
    type: Number,
    default: 0
  },
  //最小值
  min: {
    type: Number,
    default: 0
  },
  //最大值
  max: {
    type: Number,
    default: 100
  },
  //直径
  size: {
    type: Number,
    default: 2
  },
  //进度颜色
  color: {
    type: String,
    default: null
  },
  //轨道颜色
  trackColor: {
    type: String,
    default: null
  },
  //填充色
  fill: {
    type: String,
    default: null
  },
  //是否显示动画效果
  animation: {
    type: Boolean,
    default: true
  },
  //动画效果的时长
  timeout: {
    type: Number,
    default: 400
  },
  //是否显示文字
  showTip: {
    type: Boolean,
    default: false
  },
  //中间显示的文本
  tipText: {
    type: String,
    default: null
  },
  //进度条厚度
  strokeWidth: {
    type: Number,
    default: 0.2
  },
  //进度条端点是否有圆角
  round: {
    type: Boolean,
    default: false
  },
  //是否顺时针增加
  clockWise: {
    type: Boolean,
    default: true
  }
};
const _hoisted_1$v = ["viewBox"];
const _hoisted_2$o = ["d"];
const _hoisted_3$l = ["d"];
const _hoisted_4$e = {
  key: 0,
  class: "mvi-circle-progress-tip"
};
const _hoisted_5$9 = ["textContent"];
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-circle-progress"
  },
  __name: "circle-progress",
  props: CircleProgressProps,
  setup(__props) {
    const props = __props;
    const pathSize = ref(1e3);
    const progressStyle = computed(() => {
      let style = {};
      if (props.size) {
        style.width = props.size + "rem";
        style.height = props.size + "rem";
      }
      return style;
    });
    const viewBox = computed(() => {
      let width = obj.element.rem2px(props.strokeWidth);
      return `0 0 ${pathSize.value + 2 * width} ${pathSize.value + 2 * width}`;
    });
    const pathD = computed(() => {
      let width = obj.element.rem2px(props.strokeWidth);
      return `M ${pathSize.value / 2 + width} ${pathSize.value / 2 + width} m 0, -${pathSize.value / 2} a ${pathSize.value / 2}, ${pathSize.value / 2} 0 1, ${props.clockWise ? 1 : 0} 0, ${pathSize.value} a ${pathSize.value / 2}, ${pathSize.value / 2} 0 1, ${props.clockWise ? 1 : 0} 0, -${pathSize.value}`;
    });
    const cmpValue = computed(() => {
      if (props.tipText) {
        return props.tipText;
      } else {
        let value = props.value > props.max ? props.max : props.value < props.min ? props.min : props.value;
        return Math.round((value - props.min) / (props.max - props.min) * 100) + "%";
      }
    });
    const barStyle = computed(() => {
      let style = {};
      if (props.fill) {
        style.fill = props.fill;
      }
      if (props.color) {
        style.stroke = props.color;
      }
      if (obj.number.isNumber(props.strokeWidth)) {
        style.strokeWidth = props.strokeWidth + "rem";
      }
      if (props.round) {
        style.strokeLinecap = "round";
      }
      if (props.animation) {
        style.transition = "stroke-dasharray " + props.timeout + "ms";
      }
      let circleLength = Number((pathSize.value * Math.PI).toFixed(2));
      let value = props.value > props.max ? props.max : props.value < props.min ? props.min : props.value;
      let valueLength = Number(((value - props.min) / (props.max - props.min) * circleLength).toFixed(2));
      style.strokeDasharray = valueLength + "," + (circleLength - valueLength);
      return style;
    });
    const trackStyle = computed(() => {
      let style = {};
      if (props.fill) {
        style.fill = props.fill;
      }
      if (props.trackColor) {
        style.stroke = props.trackColor;
      }
      if (obj.number.isNumber(props.strokeWidth)) {
        style.strokeWidth = props.strokeWidth + "rem";
      }
      return style;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "mvi-circle-progress",
        style: normalizeStyle(progressStyle.value)
      }, [
        (openBlock(), createElementBlock("svg", { viewBox: viewBox.value }, [
          createElementVNode("path", {
            d: pathD.value,
            style: normalizeStyle(trackStyle.value),
            class: "mvi-circle-progress-track"
          }, null, 12, _hoisted_2$o),
          createElementVNode("path", {
            d: pathD.value,
            style: normalizeStyle(barStyle.value),
            class: "mvi-circle-progress-bar"
          }, null, 12, _hoisted_3$l)
        ], 8, _hoisted_1$v)),
        _ctx.showTip ? (openBlock(), createElementBlock("div", _hoisted_4$e, [
          _ctx.$slots.tip ? renderSlot(_ctx.$slots, "tip", {
            key: 0,
            value: _ctx.value
          }, void 0, true) : (openBlock(), createElementBlock("span", {
            key: 1,
            textContent: toDisplayString(cmpValue.value)
          }, null, 8, _hoisted_5$9))
        ])) : createCommentVNode("", true)
      ], 4);
    };
  }
});
const CircleProgress = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-ba0e59ad"]]);
CircleProgress.install = (app) => {
  app.component(CircleProgress.name, CircleProgress);
};
const CollapseProps = {
  //默认展开的面板索引
  modelValue: {
    type: [Number, Array],
    default: null
  },
  //是否手风琴模式
  accordion: {
    type: Boolean,
    default: false
  },
  //是否显示每个面板的内下边框
  inBorder: {
    type: Boolean,
    default: true
  },
  //是否展示每个面板的外下边框
  outBorder: {
    type: Boolean,
    default: true
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //点击标题栏是否显示点击态
  active: {
    type: Boolean,
    default: true
  },
  //是否对标题栏的标题和内容使用单行限制
  noWrap: {
    type: Boolean,
    default: false
  }
};
const _hoisted_1$u = { class: "mvi-collapse" };
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-collapse"
  },
  __name: "collapse",
  props: CollapseProps,
  emits: ["update:modelValue", "change", "before-slide-down", "slide-down", "before-slide-up", "slide-up"],
  setup(__props) {
    const instance = getCurrentInstance();
    componentIsMatch(instance, "m-collapse-item", ["Collapse", "CollapseItem"]);
    const children = ref([]);
    provide("collapse", instance);
    provide("collapseItemChildren", children);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$u, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});
const Collapse = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-c4804c6b"]]);
Collapse.install = (app) => {
  app.component(Collapse.name, Collapse);
};
const CollapseItemProps = {
  //标题栏左侧图标
  icon: {
    type: [String, Object],
    default: null
  },
  //标题
  title: {
    type: String,
    default: null
  },
  //标题栏内容
  label: {
    type: String,
    default: null
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //展开的内容
  content: {
    type: String,
    default: ""
  }
};
const _hoisted_1$t = ["disabled"];
const _hoisted_2$n = { class: "mvi-collapse-content" };
const _hoisted_3$k = ["textContent"];
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-collapse-item"
  },
  __name: "collapse-item",
  props: CollapseItemProps,
  setup(__props) {
    const instance = getCurrentInstance();
    const collapse = inject("collapse", null);
    const collapseItemChildren = inject("collapseItemChildren", null);
    parentIsMatch(collapseItemChildren, collapse, "m-collapse", ["Collapse", "CollapseItem"]);
    collapseItemChildren.value.push(instance);
    const props = __props;
    const index = computed(() => {
      return collapseItemChildren.value.findIndex((vm) => {
        return obj.common.equal(vm.uid, instance.uid);
      });
    });
    const cmpDisabled = computed(() => {
      return !!(collapse.props.disabled || props.disabled);
    });
    const cmpActive = computed(() => {
      if (cmpDisabled.value) {
        return false;
      }
      return collapse.props.active;
    });
    const expand = computed(() => {
      let flag = false;
      if (collapse.props.accordion) {
        if (collapse.props.modelValue === index.value) {
          flag = true;
        }
      } else {
        if (obj.number.isNumber(collapse.props.modelValue)) {
          if (collapse.props.modelValue === index.value) {
            flag = true;
          }
        } else if (Array.isArray(collapse.props.modelValue)) {
          if (collapse.props.modelValue.includes(index.value)) {
            flag = true;
          }
        }
      }
      return flag;
    });
    const beforeSlideDown = () => {
      collapse.emit("before-slide-down", index.value);
    };
    const slideDown = () => {
      collapse.emit("slide-down", index.value);
    };
    const beforeSlideUp = () => {
      collapse.emit("before-slide-up", index.value);
    };
    const slideUp = () => {
      collapse.emit("slide-up", index.value);
    };
    const changeCollapse = () => {
      if (cmpDisabled.value) {
        return false;
      }
      if (collapse.props.accordion) {
        if (collapse.props.modelValue == index.value) {
          collapse.emit("update:modelValue", null);
          collapse.emit("change", null);
        } else {
          collapse.emit("update:modelValue", index.value);
          collapse.emit("change", index.value);
        }
      } else {
        if (obj.number.isNumber(collapse.props.modelValue)) {
          if (collapse.props.modelValue == index.value) {
            collapse.emit("update:modelValue", []);
            collapse.emit("change", []);
          } else {
            collapse.emit("update:modelValue", [collapse.props.modelValue, index.value]);
            collapse.emit("change", [collapse.props.modelValue, index.value]);
          }
        } else if (Array.isArray(collapse.props.modelValue)) {
          let arr = [...collapse.props.modelValue];
          if (arr.includes(index.value)) {
            arr = arr.filter((item) => {
              return item != index.value;
            });
            collapse.emit("update:modelValue", arr);
            collapse.emit("change", arr);
          } else {
            arr.push(index.value);
            collapse.emit("update:modelValue", arr);
            collapse.emit("change", arr);
          }
        } else {
          let arr = [index.value];
          collapse.emit("update:modelValue", arr);
          collapse.emit("change", arr);
        }
      }
    };
    onBeforeUnmount(() => {
      collapseItemChildren.value.splice(index.value, 1);
      if (collapse.props.modelValue > 0) {
        collapse.emit("update:modelValue", collapse.props.modelValue - 1);
        collapse.emit("change", collapse.props.modelValue - 1);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-collapse-item", { border: unref(collapse).props.outBorder }]),
        disabled: cmpDisabled.value || null
      }, [
        createVNode(unref(Cell), {
          class: normalizeClass(["mvi-collapse-cell", { expand: expand.value }]),
          icon: _ctx.icon,
          content: _ctx.label,
          title: _ctx.title,
          border: unref(collapse).props.inBorder,
          arrow: { type: "angle-right", size: "0.8em" },
          onClick: changeCollapse,
          active: cmpActive.value,
          "no-wrap": unref(collapse).props.noWrap
        }, null, 8, ["class", "icon", "content", "title", "border", "active", "no-wrap"]),
        createVNode(unref(TransitionSlide), {
          expand: expand.value,
          timeout: 200,
          onBeforeSlideUp: beforeSlideUp,
          onSlideUp: slideUp,
          onBeforeSlideDown: beforeSlideDown,
          onSlideDown: slideDown
        }, {
          default: withCtx(() => [
            createElementVNode("div", _hoisted_2$n, [
              _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", {
                key: 1,
                textContent: toDisplayString(_ctx.content)
              }, null, 8, _hoisted_3$k))
            ])
          ]),
          _: 3
        }, 8, ["expand"])
      ], 10, _hoisted_1$t);
    };
  }
});
const CollapseItem = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-d51c9dcb"]]);
CollapseItem.install = (app) => {
  app.component(CollapseItem.name, CollapseItem);
};
const DateChooserProps = {
  //当前日期
  modelValue: {
    type: Date,
    default: function() {
      return /* @__PURE__ */ new Date();
    }
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //layer组件参数
  layerProps: {
    type: Object,
    default: function() {
      return {};
    }
  },
  //点击其他地方是否关闭日历
  closable: {
    type: Boolean,
    default: true
  },
  //触发方法
  trigger: {
    type: String,
    default: "click",
    validator(value) {
      return ["hover", "click", "custom"].includes(value);
    }
  },
  //模式
  mode: {
    type: String,
    default: "date",
    validator(value) {
      return ["year", "month", "date"].includes(value);
    }
  },
  //月份面板显示的月份数组文字
  monthText: {
    type: Array,
    default: function() {
      return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    }
  },
  //头部显示的星期数组
  weekText: {
    type: Array,
    default: function() {
      return ["日", "一", "二", "三", "四", "五", "六"];
    }
  },
  //开始日期
  startDate: {
    type: Date,
    default: function() {
      return dayjs("1970-01-01").toDate();
    }
  },
  //截止日期
  endDate: {
    type: Date,
    default: function() {
      return dayjs("2099-01-01").toDate();
    }
  },
  //日历面板点击态
  active: {
    type: Boolean,
    default: true
  },
  //主题样式
  type: {
    type: String,
    default: "info",
    validator(value) {
      return ["info", "primary", "error", "warn", "success"].includes(value);
    }
  },
  //是否块级
  block: {
    type: Boolean,
    default: false
  },
  //头部年月显示格式化
  headerFormatter: {
    type: Function,
    default: null
  }
};
const _withScopeId$2 = (n) => (pushScopeId("data-v-bcc341b0"), n = n(), popScopeId(), n);
const _hoisted_1$s = ["data-id"];
const _hoisted_2$m = {
  key: 0,
  class: "mvi-date-chooser-year-header"
};
const _hoisted_3$j = { class: "mvi-date-chooser-year-center" };
const _hoisted_4$d = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("span", null, "-", -1));
const _hoisted_5$8 = {
  key: 1,
  class: "mvi-date-chooser-month-header"
};
const _hoisted_6$8 = {
  key: 2,
  class: "mvi-date-chooser-date-header"
};
const _hoisted_7$7 = { class: "mvi-date-chooser-date-left" };
const _hoisted_8$4 = { class: "mvi-date-chooser-date-center" };
const _hoisted_9$2 = { class: "mvi-date-chooser-date-right" };
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-date-chooser",
    inheritAttrs: false
  },
  __name: "date-chooser",
  props: DateChooserProps,
  emits: ["update:modelValue", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const show = ref(false);
    const view = ref(props.mode);
    const selectedDate = ref(props.modelValue);
    const relateRef = ref(null);
    const panelRef = ref(null);
    const layerRef = ref(null);
    const layerRealProps = computed(() => {
      return {
        placement: props.layerProps.placement ? props.layerProps.placement : "bottom-start",
        width: props.layerProps.width,
        zIndex: obj.number.isNumber(props.layerProps.zIndex) ? props.layerProps.zIndex : 400,
        offset: props.layerProps.offset ? props.layerProps.offset : "0.2rem",
        animation: props.layerProps.animation,
        timeout: obj.number.isNumber(props.layerProps.timeout) ? props.layerProps.timeout : 200,
        showTriangle: typeof props.layerProps.showTriangle == "boolean" ? props.layerProps.showTriangle : false,
        shadow: typeof props.layerProps.shadow == "boolean" ? props.layerProps.shadow : true,
        border: typeof props.layerProps.border == "boolean" ? props.layerProps.border : false,
        borderColor: props.layerProps.borderColor
      };
    });
    const years = computed(() => {
      let arr = [];
      const year = selectedDate.value.getFullYear();
      const startYear = props.startDate.getFullYear();
      let index = Math.floor((year - startYear) / 12);
      for (let i = startYear + index * 12; i < startYear + index * 12 + 12; i++) {
        arr.push(dayjs(props.modelValue).year(i).toDate());
      }
      return arr;
    });
    const formatShow = computed(() => {
      return (type, date) => {
        if (typeof props.headerFormatter == "function") {
          if (type == "year") {
            return props.headerFormatter.apply(instance.proxy, [type, date.getFullYear()]);
          }
          if (type == "month") {
            return props.headerFormatter.apply(instance.proxy, [type, date.getMonth() + 1]);
          }
        }
        if (type == "year") {
          return dayjs(date).format("YYYY") + "年";
        }
        if (type == "month") {
          return dayjs(date).format("MM") + "月";
        }
        return "";
      };
    });
    const layerShow = () => {
      if (!layerRealProps.value.width) {
        panelRef.value.style.width = relateRef.value.offsetWidth + "px";
      }
    };
    const clickCalendar = () => {
      if (props.disabled) {
        return;
      }
      if (props.trigger == "click") {
        if (show.value) {
          closeCalendar();
        } else {
          openCalendar();
        }
      }
    };
    const dateClick = (date) => {
      emits("update:modelValue", date);
      emits("change", date);
      show.value = false;
    };
    const yearClick = (date) => {
      if (props.mode == "year") {
        emits("update:modelValue", date);
        emits("change", date);
        show.value = false;
        return;
      }
      setTimeout(() => {
        view.value = "month";
      }, 0);
    };
    const monthClick = (date) => {
      if (props.mode == "month") {
        emits("update:modelValue", date);
        emits("change", date);
        show.value = false;
        return;
      }
      setTimeout(() => {
        view.value = "date";
      }, 0);
    };
    const updateYear = (num) => {
      selectedDate.value = dayjs(selectedDate.value).add(num, "year").toDate();
      emits("update:modelValue", selectedDate.value);
      emits("change", selectedDate.value);
    };
    const updateMonth = (num) => {
      selectedDate.value = dayjs(selectedDate.value).add(num, "month").toDate();
      emits("update:modelValue", selectedDate.value);
      emits("change", selectedDate.value);
    };
    const goYear = () => {
      setTimeout(() => {
        view.value = "year";
      }, 0);
    };
    const goMonth = () => {
      setTimeout(() => {
        view.value = "month";
      }, 0);
    };
    const openCalendar = () => {
      if (props.disabled) {
        return;
      }
      show.value = true;
    };
    const closeCalendar = () => {
      if (props.disabled) {
        return;
      }
      show.value = false;
    };
    const mouseEnterRelate = () => {
      if (props.disabled) {
        return;
      }
      if (props.trigger != "hover") {
        return;
      }
      openCalendar();
    };
    const mouseLeaveRelate = (event2) => {
      if (props.disabled) {
        return;
      }
      if (props.trigger != "hover") {
        return;
      }
      if (layerRef.value && layerRef.value.$$el) {
        const layerRect = layerRef.value.$$el.getBoundingClientRect();
        if (event2.pageX >= layerRect.left && event2.pageX <= layerRect.right && event2.pageY >= layerRect.top && event2.pageY <= layerRect.bottom) {
          return;
        }
      }
      closeCalendar();
    };
    const mouseLeaveLayer = (event2) => {
      if (props.disabled) {
        return;
      }
      if (props.trigger != "hover") {
        return;
      }
      if (relateRef.value) {
        const relateRect = relateRef.value.getBoundingClientRect();
        if (event2.pageX >= relateRect.left && event2.pageX <= relateRect.right && event2.pageY >= relateRect.top && event2.pageY <= relateRect.bottom) {
          return;
        }
      }
      closeCalendar();
    };
    __expose({
      openCalendar,
      closeCalendar
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("div", mergeProps({
          class: ["mvi-date-chooser", { block: _ctx.block }],
          "data-id": `mvi-date-chooser-${unref(instance).uid}`,
          ref_key: "relateRef",
          ref: relateRef,
          onClick: clickCalendar,
          onMouseenter: mouseEnterRelate,
          onMouseleave: mouseLeaveRelate
        }, _ctx.$attrs), [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 16, _hoisted_1$s),
        createVNode(unref(Layer), {
          relate: `[data-id='mvi-date-chooser-${unref(instance).uid}']`,
          modelValue: show.value,
          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => show.value = $event),
          placement: layerRealProps.value.placement,
          offset: layerRealProps.value.offset,
          "z-index": layerRealProps.value.zIndex,
          shadow: layerRealProps.value.shadow,
          border: layerRealProps.value.border,
          animation: layerRealProps.value.animation,
          "border-color": layerRealProps.value.borderColor,
          timeout: layerRealProps.value.timeout,
          closable: _ctx.closable,
          "show-triangle": layerRealProps.value.showTriangle,
          width: layerRealProps.value.width,
          onShowing: layerShow,
          onMouseleave: mouseLeaveLayer,
          ref_key: "layerRef",
          ref: layerRef
        }, {
          default: withCtx(() => [
            createElementVNode("div", {
              class: "mvi-date-chooser-layer",
              ref_key: "panelRef",
              ref: panelRef
            }, [
              view.value == "year" ? (openBlock(), createElementBlock("div", _hoisted_2$m, [
                createElementVNode("div", {
                  class: normalizeClass(["mvi-date-chooser-year-left", [_ctx.type]]),
                  onClick: _cache[0] || (_cache[0] = ($event) => updateYear(-1))
                }, [
                  createVNode(unref(Icon), { type: "angle-double-left" })
                ], 2),
                createElementVNode("div", _hoisted_3$j, [
                  createElementVNode("span", null, toDisplayString(formatShow.value("year", years.value[0])), 1),
                  _hoisted_4$d,
                  createElementVNode("span", null, toDisplayString(formatShow.value("year", years.value[years.value.length - 1])), 1)
                ]),
                createElementVNode("div", {
                  class: normalizeClass(["mvi-date-chooser-year-right", [_ctx.type]]),
                  onClick: _cache[1] || (_cache[1] = ($event) => updateYear(1))
                }, [
                  createVNode(unref(Icon), { type: "angle-double-right" })
                ], 2)
              ])) : view.value == "month" ? (openBlock(), createElementBlock("div", _hoisted_5$8, [
                createElementVNode("div", {
                  class: normalizeClass(["mvi-date-chooser-month-left", [_ctx.type]]),
                  onClick: _cache[2] || (_cache[2] = ($event) => updateYear(-1))
                }, [
                  createVNode(unref(Icon), { type: "angle-double-left" })
                ], 2),
                createElementVNode("div", {
                  class: normalizeClass(["mvi-date-chooser-month-center", [_ctx.type]]),
                  onClick: goYear
                }, toDisplayString(formatShow.value("year", selectedDate.value)), 3),
                createElementVNode("div", {
                  class: normalizeClass(["mvi-date-chooser-month-right", [_ctx.type]]),
                  onClick: _cache[3] || (_cache[3] = ($event) => updateYear(1))
                }, [
                  createVNode(unref(Icon), { type: "angle-double-right" })
                ], 2)
              ])) : view.value == "date" ? (openBlock(), createElementBlock("div", _hoisted_6$8, [
                createElementVNode("div", _hoisted_7$7, [
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.type),
                    onClick: _cache[4] || (_cache[4] = ($event) => updateYear(-1))
                  }, [
                    createVNode(unref(Icon), { type: "angle-double-left" })
                  ], 2),
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.type),
                    onClick: _cache[5] || (_cache[5] = ($event) => updateMonth(-1))
                  }, [
                    createVNode(unref(Icon), { type: "angle-left" })
                  ], 2)
                ]),
                createElementVNode("div", _hoisted_8$4, [
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.type),
                    onClick: goYear
                  }, toDisplayString(formatShow.value("year", selectedDate.value)), 3),
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.type),
                    onClick: goMonth
                  }, toDisplayString(formatShow.value("month", selectedDate.value)), 3)
                ]),
                createElementVNode("div", _hoisted_9$2, [
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.type),
                    onClick: _cache[6] || (_cache[6] = ($event) => updateMonth(1))
                  }, [
                    createVNode(unref(Icon), { type: "angle-right" })
                  ], 2),
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.type),
                    onClick: _cache[7] || (_cache[7] = ($event) => updateYear(1))
                  }, [
                    createVNode(unref(Icon), { type: "angle-double-right" })
                  ], 2)
                ])
              ])) : createCommentVNode("", true),
              createVNode(unref(Calendar), {
                view: view.value,
                modelValue: selectedDate.value,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => selectedDate.value = $event),
                "month-text": _ctx.monthText,
                "week-text": _ctx.weekText,
                "start-date": _ctx.startDate,
                "end-date": _ctx.endDate,
                "non-current-click": false,
                active: _ctx.active,
                type: _ctx.type,
                onDateClick: dateClick,
                onMonthClick: monthClick,
                onYearClick: yearClick
              }, null, 8, ["view", "modelValue", "month-text", "week-text", "start-date", "end-date", "active", "type"])
            ], 512)
          ]),
          _: 1
        }, 8, ["relate", "modelValue", "placement", "offset", "z-index", "shadow", "border", "animation", "border-color", "timeout", "closable", "show-triangle", "width"])
      ], 64);
    };
  }
});
const DateChooser = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-bcc341b0"]]);
DateChooser.install = (app) => {
  app.component(DateChooser.name, DateChooser);
};
const DateNativePickerProps = {
  //选择的类型
  type: {
    type: String,
    default: "date",
    validator(value) {
      return ["date", "datetime", "month", "time"].includes(value);
    }
  },
  //日期
  modelValue: {
    type: Date,
    default: null
  },
  //最大日期
  max: {
    type: Date,
    default: null
  },
  //最小日期
  min: {
    type: Date,
    default: null
  }
};
const _hoisted_1$r = ["type", "value"];
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-date-native-picker"
  },
  __name: "date-native-picker",
  props: DateNativePickerProps,
  emits: ["update:modelValue", "error", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const elRef = ref(null);
    const dateType = computed(() => {
      if (props.type == "datetime") {
        return "datetime-local";
      } else {
        return props.type;
      }
    });
    const defaultDate = computed(() => {
      if (props.modelValue) {
        if (props.type == "date") {
          return dayjs(props.modelValue).format("YYYY-MM-DD");
        }
        if (props.type == "datetime") {
          return dayjs(props.modelValue).format("YYYY-MM-DD HH:mm");
        }
        if (props.type == "month") {
          return dayjs(props.modelValue).format("YYYY-MM");
        }
        if (props.type == "time") {
          return dayjs(props.modelValue).format("HH:mm");
        }
      }
      return "";
    });
    const selectDate = () => {
      if (elRef.value.value) {
        let val = props.type == "time" ? `${dayjs(props.modelValue).format("YYYY-MM-DD")} ${elRef.value.value}` : elRef.value.value;
        const date = dayjs(val);
        if (props.min && date.isBefore(dayjs(props.min))) {
          emits("error", 0, "The date is less than min");
          return;
        }
        if (props.max && dayjs(props.max).isBefore(date)) {
          emits("error", 1, "The date is greater than max");
          return;
        }
        emits("update:modelValue", date.toDate());
        emits("change", date.toDate());
      } else {
        emits("update:modelValue", null);
        emits("change", null);
      }
    };
    const selectDateForIOS = () => {
      const ios = obj.platform.os().ios;
      const iPad = obj.platform.device().iPad;
      if (ios && !iPad) {
        selectDate();
      }
    };
    const selectDateForAndroid = () => {
      const ios = obj.platform.os().ios;
      const iPad = obj.platform.device().iPad;
      if (!ios || iPad) {
        selectDate();
      }
    };
    const trigger = () => {
      const ios = obj.platform.os().ios;
      const iPad = obj.platform.device().iPad;
      if (ios && !iPad) {
        elRef.value.focus();
      } else {
        elRef.value.click();
      }
    };
    __expose({
      trigger
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("input", {
        ref_key: "elRef",
        ref: elRef,
        onBlur: selectDateForIOS,
        onChange: selectDateForAndroid,
        class: "mvi-date-native-picker",
        type: dateType.value,
        value: defaultDate.value
      }, null, 40, _hoisted_1$r);
    };
  }
});
const DateNativePicker = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-2ce16137"]]);
DateNativePicker.install = (app) => {
  app.component(DateNativePicker.name, DateNativePicker);
};
const PickerProps = {
  //选择器配置
  options: {
    type: [Array, Object],
    default: function() {
      return {
        values: [],
        defaultIndex: 0
      };
    }
  },
  //是否显示标题栏
  showToolbar: {
    type: Boolean,
    default: true
  },
  //标题
  title: {
    type: String,
    default: null
  },
  //确认文字
  confirmText: {
    type: String,
    default: "确定"
  },
  //取消文字
  cancelText: {
    type: String,
    default: "取消"
  },
  //是否显示加载状态
  loading: {
    type: Boolean,
    default: false
  },
  //可见选项个数
  visibleCounts: {
    type: Number,
    default: 5
  },
  //选择框高度
  selectHeight: {
    type: String,
    default: "0.88rem"
  }
};
const _hoisted_1$q = { class: "mvi-picker" };
const _hoisted_2$l = {
  key: 1,
  class: "mvi-picker-toolbar"
};
const _hoisted_3$i = ["textContent"];
const _hoisted_4$c = ["textContent"];
const _hoisted_5$7 = ["textContent"];
const _hoisted_6$7 = ["onTouchstart", "onMousedown"];
const _hoisted_7$6 = ["textContent"];
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-picker"
  },
  __name: "picker",
  props: PickerProps,
  emits: ["confirm", "cancel", "change"],
  setup(__props, { emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const itemRefs = ref([]);
    const offsets = ref([]);
    const startY = ref(0);
    const startY2 = ref(0);
    const time = ref(0);
    const oldActives = ref([]);
    const amounts = ref(0);
    const mouseDown = ref(false);
    const columnIndex = ref(0);
    const startTimeStamp = ref(0);
    const endTimeStamp = ref(0);
    const cmpHeight = computed(() => {
      if (props.selectHeight.includes("px")) {
        return parseFloat(props.selectHeight);
      } else if (props.selectHeight.includes("rem")) {
        return obj.element.rem2px(parseFloat(props.selectHeight));
      }
    });
    const loadingStyle = computed(() => {
      let style = {};
      style.height = `calc(${obj.number.mutiply(cmpHeight.value, props.visibleCounts)}px + 0.88rem)`;
      return style;
    });
    const contentStyle = computed(() => {
      let style = {};
      style.height = `${obj.number.mutiply(cmpHeight.value, props.visibleCounts)}px`;
      return style;
    });
    const cmpOptions = computed(() => {
      let op = [];
      if (Array.isArray(props.options)) {
        op = props.options;
      } else {
        op = [props.options];
      }
      return op;
    });
    const columnStyle = computed(() => {
      return (index) => {
        let style = {};
        style.transform = `translate3d(0,${offsets.value[index] || 0}px,0)`;
        return style;
      };
    });
    const actives = computed(() => {
      let arr = [];
      for (let i = 0; i < offsets.value.length; i++) {
        arr.push({
          index: getActive(offsets.value[i]),
          value: cmpOptions.value[i].values[getActive(offsets.value[i])]
        });
      }
      return arr;
    });
    const maskStyle = computed(() => {
      let style = {};
      if (props.selectHeight) {
        style.backgroundSize = "100% " + obj.number.mutiply(cmpHeight.value, obj.number.divide(props.visibleCounts - 1, 2)) + "px";
      }
      return style;
    });
    const getOffset = (index) => {
      return obj.number.mutiply(obj.number.subtract(obj.number.divide(props.visibleCounts - 1, 2), index), cmpHeight.value);
    };
    const getActive = (value) => {
      let num = Math.abs(obj.number.divide(value - obj.number.mutiply(obj.number.divide(props.visibleCounts - 1, 2), cmpHeight.value), cmpHeight.value));
      return Math.round(num);
    };
    const addTransition = (index, timeout) => {
      return new Promise((resolve) => {
        itemRefs.value[index].style.transition = "all " + timeout + "ms ease-out";
        setTimeout(() => {
          resolve();
        }, 0);
      });
    };
    const removeTransition = (index) => {
      return new Promise((resolve) => {
        itemRefs.value[index].style.transition = "";
        setTimeout(() => {
          resolve();
        }, 0);
      });
    };
    const crisis = (index) => {
      let max = obj.number.divide(props.visibleCounts - 1, 2);
      max = obj.number.mutiply(max, cmpHeight.value);
      let min = -obj.number.divide(props.visibleCounts - 1, 2);
      min = obj.number.mutiply(min, cmpHeight.value);
      min += obj.number.mutiply(props.visibleCounts - cmpOptions.value[index].values.length, cmpHeight.value);
      return {
        max,
        min
      };
    };
    const endDeal = (moveTotal, timeout) => {
      if (moveTotal > 0) {
        if (offsets.value[columnIndex.value] >= crisis(columnIndex.value).max) {
          offsets.value[columnIndex.value] = crisis(columnIndex.value).max;
        } else {
          let order = getActive(offsets.value[columnIndex.value]);
          offsets.value[columnIndex.value] = getOffset(order);
        }
      } else {
        if (offsets.value[columnIndex.value] <= crisis(columnIndex.value).min) {
          offsets.value[columnIndex.value] = crisis(columnIndex.value).min;
        } else {
          let order = getActive(offsets.value[columnIndex.value]);
          offsets.value[columnIndex.value] = getOffset(order);
        }
      }
      if (actives.value.length == 1) {
        if (actives.value[0].index != oldActives.value[0].index) {
          emits("change", columnIndex.value, actives.value[0]);
        }
      } else {
        let flag = true;
        for (let i = 0; i < oldActives.value.length; i++) {
          if (oldActives.value[i].index != actives.value[i].index) {
            flag = false;
          }
        }
        if (!flag) {
          emits("change", columnIndex.value, actives.value);
        }
      }
      setTimeout(() => {
        removeTransition(columnIndex.value);
      }, timeout);
    };
    const init = () => {
      offsets.value = [];
      for (let i = 0; i < cmpOptions.value.length; i++) {
        offsets.value.push(getOffset(cmpOptions.value[i].defaultIndex || 0));
      }
    };
    const doConfirm = () => {
      if (actives.value.length == 1) {
        emits("confirm", actives.value[0]);
      } else {
        emits("confirm", actives.value);
      }
    };
    const doCancel = () => {
      init();
      if (actives.value.length == 1) {
        emits("cancel", actives.value[0]);
      } else {
        emits("cancel", actives.value);
      }
    };
    const touchstart = (event2, index) => {
      startY.value = event2.targetTouches[0].pageY;
      startY2.value = startY.value;
      time.value = Date.now();
      oldActives.value = actives.value;
      amounts.value = 0;
      columnIndex.value = index;
      startTimeStamp.value = Date.now();
    };
    const mousedown = (event2, index) => {
      startY.value = event2.pageY;
      startY2.value = startY.value;
      time.value = Date.now();
      oldActives.value = actives.value;
      amounts.value = 0;
      mouseDown.value = true;
      columnIndex.value = index;
      startTimeStamp.value = Date.now();
    };
    const touchmove = (event2) => {
      if (event2.cancelable) {
        event2.preventDefault();
      }
      let endY = event2.targetTouches[0].pageY;
      let moveY = endY - startY.value;
      let moveY2 = endY - startY2.value;
      if (offsets.value[columnIndex.value] >= crisis(columnIndex.value).max && moveY2 > 0) {
        amounts.value += 5;
        offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + moveY / amounts.value;
        return;
      }
      if (offsets.value[columnIndex.value] <= crisis(columnIndex.value).min && moveY2 < 0) {
        amounts.value += 5;
        offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + moveY / amounts.value;
        return;
      }
      offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + moveY / 1.6;
      startY.value = endY;
    };
    const mousemove = (event2) => {
      if (!mouseDown.value) {
        return;
      }
      if (event2.cancelable) {
        event2.preventDefault();
      }
      let endY = event2.pageY;
      let moveY = endY - startY.value;
      let moveY2 = endY - startY2.value;
      if (offsets.value[columnIndex.value] >= crisis(columnIndex.value).max && moveY2 > 0) {
        amounts.value += 5;
        offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + moveY / amounts.value;
        return;
      }
      if (offsets.value[columnIndex.value] <= crisis(columnIndex.value).min && moveY2 < 0) {
        amounts.value += 5;
        offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + moveY / amounts.value;
        return;
      }
      offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + moveY / 1.6;
      startY.value = endY;
    };
    const touchend = (event2) => {
      endTimeStamp.value = Date.now();
      let moveTotal = event2.changedTouches[0].pageY - startY2.value;
      let totalTimeStamp = endTimeStamp.value - startTimeStamp.value;
      if (totalTimeStamp < 300 && Math.abs(moveTotal) > cmpHeight.value) {
        addTransition(columnIndex.value, 1e3).then(() => {
          if (moveTotal > 0) {
            offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + obj.element.rem2px(10) * totalTimeStamp / 1e3;
          } else {
            offsets.value[columnIndex.value] = offsets.value[columnIndex.value] - obj.element.rem2px(10) * totalTimeStamp / 1e3;
          }
          return addTransition(columnIndex.value, 300);
        }).then(() => {
          endDeal(moveTotal, 300);
        });
      } else {
        addTransition(columnIndex.value, 300).then(() => {
          endDeal(moveTotal, 300);
        });
      }
    };
    const mouseup = (event2) => {
      if (!mouseDown.value) {
        return;
      }
      mouseDown.value = false;
      endTimeStamp.value = Date.now();
      let moveTotal = event2.pageY - startY2.value;
      let totalTimeStamp = endTimeStamp.value - startTimeStamp.value;
      if (totalTimeStamp < 300 && Math.abs(moveTotal) > cmpHeight.value) {
        addTransition(columnIndex.value, 1e3).then(() => {
          if (moveTotal > 0) {
            offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + obj.element.rem2px(10) * totalTimeStamp / 1e3;
          } else {
            offsets.value[columnIndex.value] = offsets.value[columnIndex.value] - obj.element.rem2px(10) * totalTimeStamp / 1e3;
          }
          return addTransition(columnIndex.value, 300);
        }).then(() => {
          endDeal(moveTotal, 300);
        });
      } else {
        addTransition(columnIndex.value, 300).then(() => {
          endDeal(moveTotal, 300);
        });
      }
    };
    const contentTouchMove = (event2) => {
      if (event2.cancelable) {
        event2.preventDefault();
      }
    };
    watch(
      () => cmpOptions.value,
      () => {
        init();
      }
    );
    onMounted(() => {
      init();
      obj.event.on(document.documentElement, `mousemove.picker_${instance.uid}`, mousemove);
      obj.event.on(document.documentElement, `mouseup.picker_${instance.uid}`, mouseup);
    });
    onBeforeUnmount(() => {
      obj.event.off(document.documentElement, `mousemove.picker_${instance.uid} mouseup.picker_${instance.uid}`);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$q, [
        _ctx.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "mvi-picker-loading",
          style: normalizeStyle(loadingStyle.value)
        }, [
          createVNode(unref(Loading), {
            size: "0.5rem",
            color: "#ddd"
          })
        ], 4)) : createCommentVNode("", true),
        _ctx.showToolbar && !_ctx.loading ? (openBlock(), createElementBlock("div", _hoisted_2$l, [
          createElementVNode("div", {
            class: "mvi-picker-toolbar-cancel",
            textContent: toDisplayString(_ctx.cancelText),
            onClick: doCancel
          }, null, 8, _hoisted_3$i),
          _ctx.title ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "mvi-picker-toolbar-title",
            textContent: toDisplayString(_ctx.title)
          }, null, 8, _hoisted_4$c)) : createCommentVNode("", true),
          createElementVNode("div", {
            class: "mvi-picker-toolbar-confirm",
            textContent: toDisplayString(_ctx.confirmText),
            onClick: doConfirm
          }, null, 8, _hoisted_5$7)
        ])) : createCommentVNode("", true),
        !_ctx.loading ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: "mvi-picker-content",
          style: normalizeStyle(contentStyle.value),
          ref: "content",
          onTouchmove: contentTouchMove
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(cmpOptions.value, (column, index) => {
            return openBlock(), createElementBlock("div", {
              class: "mvi-picker-items",
              ref_for: true,
              ref: (el) => itemRefs.value[index] = el,
              style: normalizeStyle(columnStyle.value(index)),
              onTouchstart: ($event) => touchstart($event, index),
              onTouchmove: touchmove,
              onTouchend: touchend,
              onMousedown: ($event) => mousedown($event, index)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(column.values, (item) => {
                return openBlock(), createElementBlock("div", {
                  class: "mvi-picker-item",
                  style: normalizeStyle({ height: _ctx.selectHeight || "" })
                }, [
                  createElementVNode("div", {
                    textContent: toDisplayString(item)
                  }, null, 8, _hoisted_7$6)
                ], 4);
              }), 256))
            ], 44, _hoisted_6$7);
          }), 256)),
          createElementVNode("div", {
            class: "mvi-picker-active",
            style: normalizeStyle({ height: _ctx.selectHeight || "" })
          }, null, 4),
          createElementVNode("div", {
            class: "mvi-picker-mask",
            style: normalizeStyle(maskStyle.value)
          }, null, 4)
        ], 36)) : createCommentVNode("", true)
      ]);
    };
  }
});
const Picker = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-88729572"]]);
Picker.install = (app) => {
  app.component(Picker.name, Picker);
};
const ProgressProps = {
  //当前进度值
  value: {
    type: Number,
    default: 0
  },
  //最大值
  max: {
    type: Number,
    default: 100
  },
  //最小值
  min: {
    type: Number,
    default: 0
  },
  //进度条粗细
  strokeWidth: {
    type: String,
    default: null
  },
  //是否显示进度文字
  showTip: {
    type: Boolean,
    default: false
  },
  //进度条颜色
  color: {
    type: String,
    default: null
  },
  //进度文字颜色
  tipColor: {
    type: String,
    default: null
  },
  //轨道颜色
  trackColor: {
    type: String,
    default: null
  },
  //进度显示的文字，默认为百分比
  tipText: {
    type: String,
    default: null
  },
  //显示圆角
  round: {
    type: Boolean,
    default: false
  },
  //无角度
  square: {
    type: Boolean,
    default: false
  },
  //是否开启动画效果
  animation: {
    type: Boolean,
    default: false
  },
  //动画效果时长
  timeout: {
    type: Number,
    default: 400
  }
};
const _hoisted_1$p = ["textContent"];
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-progress"
  },
  __name: "progress",
  props: ProgressProps,
  setup(__props) {
    const props = __props;
    const progressStyle = computed(() => {
      let style = {};
      if (props.strokeWidth) {
        style.height = props.strokeWidth;
      }
      if (props.trackColor) {
        style.backgroundColor = props.trackColor;
      }
      return style;
    });
    const progressBarStyle = computed(() => {
      let style = {};
      if (props.animation) {
        style.transition = "width " + props.timeout + "ms,border-radius " + props.timeout + "ms";
      }
      if (props.color) {
        style.backgroundColor = props.color;
      }
      if (props.value == props.max) {
        style.borderRadius = "inherit";
      }
      style.width = `calc(${(props.value - props.min < 0 ? 0 : props.value - props.min) / (props.max - props.min)} * 100%)`;
      return style;
    });
    const cmpText = computed(() => {
      if (props.tipText) {
        return props.tipText;
      }
      return Math.round((props.value - props.min < 0 ? 0 : props.value - props.min) / (props.max - props.min) * 100) + "%";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-progress", { round: _ctx.round, square: !_ctx.round && _ctx.square }]),
        style: normalizeStyle(progressStyle.value)
      }, [
        createElementVNode("div", {
          class: "mvi-progress-bar",
          style: normalizeStyle(progressBarStyle.value)
        }, [
          _ctx.showTip ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "mvi-progress-tooltip",
            style: normalizeStyle({ color: _ctx.tipColor || "" })
          }, [
            _ctx.$slots.tip ? renderSlot(_ctx.$slots, "tip", {
              key: 0,
              value: _ctx.value
            }, void 0, true) : (openBlock(), createElementBlock("span", {
              key: 1,
              textContent: toDisplayString(cmpText.value)
            }, null, 8, _hoisted_1$p))
          ], 4)) : createCommentVNode("", true)
        ], 4)
      ], 6);
    };
  }
});
const Progress = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-6b0d259d"]]);
Progress.install = (app) => {
  app.component(Progress.name, Progress);
};
const SliderProps = {
  //当前值
  modelValue: {
    type: Number,
    default: 0
  },
  //最小值
  min: {
    type: Number,
    default: 0
  },
  //最大值
  max: {
    type: Number,
    default: 100
  },
  //进度粗细
  strokeWidth: {
    type: String,
    default: "0.2rem"
  },
  //激活的进度颜色
  color: {
    type: String,
    default: null
  },
  //滑轨颜色
  trackColor: {
    type: String,
    default: null
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //是否垂直
  vertical: {
    type: Boolean,
    default: false
  },
  //滑动条是否显示圆形的圆角弧度
  round: {
    type: Boolean,
    default: false
  },
  //滑动条是否不显示圆角弧度
  square: {
    type: Boolean,
    default: false
  }
};
const _hoisted_1$o = ["disabled"];
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-slider"
  },
  __name: "slider",
  props: SliderProps,
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const drag = ref(null);
    const isdrag = ref(false);
    const btnRef = ref(null);
    const barRef = ref(null);
    const elRef = ref(null);
    const sliderStyle = computed(() => {
      let style = {};
      if (props.trackColor) {
        style.background = props.trackColor;
      }
      if (props.strokeWidth) {
        if (props.vertical) {
          style.width = props.strokeWidth;
        } else {
          style.height = props.strokeWidth;
        }
      }
      return style;
    });
    const sliderBarStyle = computed(() => {
      let style = {};
      if (props.color) {
        style.background = props.color;
      }
      let percent = obj.number.divide(obj.number.subtract(props.modelValue, props.min), obj.number.subtract(props.max, props.min));
      if (props.vertical) {
        style.height = `calc(${percent} * 100%)`;
      } else {
        style.width = `calc(${percent} * 100%)`;
      }
      return style;
    });
    const buttonElStyle = computed(() => {
      let style = {};
      if (props.strokeWidth) {
        style.width = `calc(${props.strokeWidth} * 2)`;
        style.height = `calc(${props.strokeWidth} * 2)`;
      }
      return style;
    });
    watch(
      () => props.disabled,
      (newValue) => {
        if (drag.value) {
          if (newValue) {
            if (props.vertical) {
              drag.value.draggableY = false;
            } else {
              drag.value.draggableX = false;
            }
          } else {
            if (props.vertical) {
              drag.value.draggableY = true;
            } else {
              drag.value.draggableX = true;
            }
          }
        }
      }
    );
    watch(
      () => props.vertical,
      () => {
        nextTick(() => {
          setBtnOffset();
        });
      }
    );
    watch(
      () => props.modelValue,
      () => {
        if (!isdrag.value) {
          setBtnOffset();
        }
      }
    );
    const onDrag = (_el, _container, placement) => {
      isdrag.value = true;
      if (props.vertical) {
        let value = obj.number.add(obj.number.mutiply(obj.number.divide(obj.number.add(placement.top, obj.number.divide(btnRef.value.offsetHeight, 2)), elRef.value.offsetHeight), obj.number.subtract(props.max, props.min)), props.min);
        emits("update:modelValue", value);
        emits("change", value);
      } else {
        let value = obj.number.add(obj.number.mutiply(obj.number.divide(obj.number.add(placement.left, obj.number.divide(btnRef.value.offsetWidth, 2)), elRef.value.offsetWidth), obj.number.subtract(props.max - props.min)), props.min);
        emits("update:modelValue", value);
        emits("change", value);
      }
    };
    const setBtnOffset = () => {
      if (props.vertical) {
        btnRef.value.style.left = "50%";
        btnRef.value.style.top = obj.number.subtract(obj.number.mutiply(obj.number.divide(obj.number.subtract(props.modelValue, props.min), obj.number.subtract(props.max - props.min)), elRef.value.offsetHeight), obj.number.divide(btnRef.value.offsetHeight, 2)) + "px";
      } else {
        btnRef.value.style.top = "50%";
        btnRef.value.style.left = obj.number.subtract(obj.number.mutiply(obj.number.divide(obj.number.subtract(props.modelValue, props.min), obj.number.subtract(props.max - props.min)), elRef.value.offsetWidth), obj.number.divide(btnRef.value.offsetWidth, 2)) + "px";
      }
    };
    const dragTo = (event2) => {
      if (props.disabled) {
        return;
      }
      if (isdrag.value) {
        return;
      }
      if (obj.element.isContains(btnRef.value, event2.target)) {
        return;
      }
      if (props.vertical) {
        let top = event2.offsetY;
        let value = obj.number.add(obj.number.mutiply(obj.number.divide(top, elRef.value.offsetHeight), obj.number.subtract(props.max, props.min)), props.min);
        emits("update:modelValue", value);
        emits("change", value);
      } else {
        let left = event2.offsetX;
        let value = obj.number.add(obj.number.mutiply(obj.number.divide(left, elRef.value.offsetWidth), obj.number.subtract(props.max, props.min)), props.min);
        emits("update:modelValue", value);
        emits("change", value);
      }
    };
    onMounted(() => {
      setBtnOffset();
      drag.value = new Drag$1(btnRef.value, {
        container: elRef.value,
        mode: "on",
        draggableY: props.vertical && !props.disabled,
        draggableX: !props.vertical && !props.disabled,
        cursor: false,
        drag: onDrag,
        dragged: () => {
          nextTick(() => {
            setTimeout(() => {
              isdrag.value = false;
            }, 10);
          });
        }
      });
      drag.value.init();
    });
    onBeforeUnmount(() => {
      if (drag.value) {
        drag.value.destroy();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        disabled: _ctx.disabled || null,
        class: normalizeClass(["mvi-slider", { round: _ctx.round, square: !_ctx.round && _ctx.square, vertical: _ctx.vertical }]),
        style: normalizeStyle(sliderStyle.value),
        onClick: dragTo,
        ref_key: "elRef",
        ref: elRef
      }, [
        createElementVNode("div", {
          ref_key: "barRef",
          ref: barRef,
          class: "mvi-slider-bar",
          style: normalizeStyle(sliderBarStyle.value)
        }, null, 4),
        createElementVNode("div", {
          class: "mvi-slider-button",
          ref_key: "btnRef",
          ref: btnRef
        }, [
          _ctx.$slots.button ? renderSlot(_ctx.$slots, "button", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: "mvi-slider-button-el",
            style: normalizeStyle(buttonElStyle.value)
          }, null, 4))
        ], 512)
      ], 14, _hoisted_1$o);
    };
  }
});
const Slider = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-ad9a6511"]]);
Slider.install = (app) => {
  app.component(Slider.name, Slider);
};
const DatePickerProps = {
  //日期值
  modelValue: {
    type: Date,
    default: function() {
      return /* @__PURE__ */ new Date();
    }
  },
  //默认开始时间1970年1月1日00:00
  startDate: {
    type: Date,
    default: function() {
      return dayjs("1970-01-01 00:00:00").toDate();
    }
  },
  //默认结束时间2099年12月31日23:59
  endDate: {
    type: Date,
    default: function() {
      return dayjs("2099-12-31 23:59:59").toDate();
    }
  },
  //模式
  mode: {
    type: String,
    default: "date",
    validator(value) {
      return ["date", "datetime", "time", "month", "year"].includes(value);
    }
  },
  //是否显示顶部标题栏
  showToolbar: {
    type: Boolean,
    default: true
  },
  //标题
  title: {
    type: String,
    default: null
  },
  //确认文字
  confirmText: {
    type: String,
    default: "确定"
  },
  //取消文字
  cancelText: {
    type: String,
    default: "取消"
  },
  //是否显示加载状态
  loading: {
    type: Boolean,
    default: false
  },
  //可见选项个数
  visibleCounts: {
    type: Number,
    default: 5
  },
  //选择框高度
  selectHeight: {
    type: String,
    default: "0.88rem"
  },
  //格式化函数
  formatter: {
    type: Function,
    default: null
  }
};
const _hoisted_1$n = { class: "mvi-date-picker" };
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-date-picker"
  },
  __name: "date-picker",
  props: DatePickerProps,
  emits: ["update:modelValue", "confirm", "cancel", "change"],
  setup(__props, { emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const selectedDate = computed({
      set(value) {
        if (value instanceof Date) {
          const unit = getUnit();
          if (dayjs(value).isBefore(dayjs(props.startDate), unit)) {
            value = props.startDate;
          }
          if (dayjs(value).isAfter(dayjs(props.endDate), unit)) {
            value = props.endDate;
          }
        }
        emits("update:modelValue", value);
        emits("change", value);
      },
      get() {
        if (props.modelValue instanceof Date) {
          const unit = getUnit();
          if (dayjs(props.modelValue).isBefore(dayjs(props.startDate), unit)) {
            return props.startDate;
          }
          if (dayjs(props.modelValue).isAfter(dayjs(props.endDate), unit)) {
            return props.endDate;
          }
          return props.modelValue;
        }
        return /* @__PURE__ */ new Date();
      }
    });
    const years = computed(() => {
      let arr = [];
      let currentYear = props.startDate.getFullYear();
      while (currentYear <= props.endDate.getFullYear()) {
        arr.push(currentYear);
        currentYear++;
      }
      return arr;
    });
    const months = computed(() => {
      const format = dayjs(selectedDate.value).format("YYYY");
      let arr = [];
      for (let i = 1; i <= 12; i++) {
        if (dayjs(`${format}-${i < 10 ? "0" + i : i}`).isBefore(dayjs(props.startDate), "month")) {
          continue;
        }
        if (dayjs(`${format}-${i < 10 ? "0" + i : i}`).isAfter(dayjs(props.endDate), "month")) {
          continue;
        }
        arr.push(i);
      }
      return arr;
    });
    const days = computed(() => {
      const format = dayjs(selectedDate.value).format("YYYY-MM");
      let arr = [];
      const total = dayjs(selectedDate.value).daysInMonth();
      for (let i = 1; i <= total; i++) {
        if (dayjs(`${format}-${i < 10 ? "0" + i : i}`).isBefore(dayjs(props.startDate), "date")) {
          continue;
        }
        if (dayjs(`${format}-${i < 10 ? "0" + i : i}`).isAfter(dayjs(props.endDate), "date")) {
          continue;
        }
        arr.push(i);
      }
      return arr;
    });
    const hours = computed(() => {
      const format = dayjs(selectedDate.value).format("YYYY-MM-DD");
      let arr = [];
      for (let i = 0; i < 24; i++) {
        if (dayjs(`${format} ${i < 10 ? "0" + i : i}`).isBefore(dayjs(props.startDate), "hour")) {
          continue;
        }
        if (dayjs(`${format} ${i < 10 ? "0" + i : i}`).isAfter(dayjs(props.endDate), "hour")) {
          continue;
        }
        arr.push(i);
      }
      return arr;
    });
    const minutes = computed(() => {
      const format = dayjs(selectedDate.value).format("YYYY-MM-DD HH");
      let arr = [];
      for (let i = 0; i < 60; i++) {
        if (dayjs(`${format}:${i < 10 ? "0" + i : i}`).isBefore(dayjs(props.startDate), "minute")) {
          continue;
        }
        if (dayjs(`${format}:${i < 10 ? "0" + i : i}`).isAfter(dayjs(props.endDate), "minute")) {
          continue;
        }
        arr.push(i);
      }
      return arr;
    });
    const pickerOptions = computed(() => {
      const yearColumn = {
        defaultIndex: years.value.findIndex((item) => {
          return item == selectedDate.value.getFullYear();
        }),
        values: years.value.map((item) => {
          if (typeof props.formatter == "function") {
            return props.formatter.apply(instance.proxy, ["year", item]);
          }
          return `${item}年`;
        })
      };
      const monthColumn = {
        defaultIndex: months.value.findIndex((item) => {
          return item == selectedDate.value.getMonth() + 1;
        }),
        values: months.value.map((item) => {
          if (typeof props.formatter == "function") {
            return props.formatter.apply(instance.proxy, ["month", item]);
          }
          return `${item}月`;
        })
      };
      const dateColumn = {
        defaultIndex: days.value.findIndex((item) => {
          return item == selectedDate.value.getDate();
        }),
        values: days.value.map((item) => {
          if (typeof props.formatter == "function") {
            return props.formatter.apply(instance.proxy, ["date", item]);
          }
          return `${item}日`;
        })
      };
      const hourColumn = {
        defaultIndex: hours.value.findIndex((item) => {
          return item == selectedDate.value.getHours();
        }),
        values: hours.value.map((item) => {
          if (typeof props.formatter == "function") {
            return props.formatter.apply(instance.proxy, ["hour", item]);
          }
          return `${item}时`;
        })
      };
      const minuteColumn = {
        defaultIndex: minutes.value.findIndex((item) => {
          return item == selectedDate.value.getMinutes();
        }),
        values: minutes.value.map((item) => {
          if (typeof props.formatter == "function") {
            return props.formatter.apply(instance.proxy, ["minute", item]);
          }
          return `${item}分`;
        })
      };
      if (props.mode == "year") {
        return yearColumn;
      }
      if (props.mode == "month") {
        return [yearColumn, monthColumn];
      }
      if (props.mode == "date") {
        return [yearColumn, monthColumn, dateColumn];
      }
      if (props.mode == "datetime") {
        return [yearColumn, monthColumn, dateColumn, hourColumn, minuteColumn];
      }
      if (props.mode == "time") {
        return [hourColumn, minuteColumn];
      }
      return [];
    });
    const getUnit = () => {
      if (props.mode == "year") {
        return "year";
      }
      if (props.mode == "month") {
        return "month";
      }
      if (props.mode == "date") {
        return "date";
      }
      if (props.mode == "time" || props.mode == "datetime") {
        return "minute";
      }
    };
    const updateYear = (year) => {
      selectedDate.value = dayjs(selectedDate.value).year(year).toDate();
    };
    const updateMonth = (month) => {
      selectedDate.value = dayjs(selectedDate.value).month(month - 1).toDate();
    };
    const updateDay = (day) => {
      selectedDate.value = dayjs(selectedDate.value).date(day).toDate();
    };
    const updateHour = (hour) => {
      selectedDate.value = dayjs(selectedDate.value).hour(hour).toDate();
    };
    const updateMinute = (minute) => {
      selectedDate.value = dayjs(selectedDate.value).minute(minute).toDate();
    };
    const dateChange = (column, item) => {
      if (props.mode == "year") {
        updateYear(years.value[item.index]);
      } else if (props.mode == "month") {
        if (column == 0) {
          updateYear(years.value[item[column].index]);
        } else {
          updateMonth(months.value[item[column].index]);
        }
      } else if (props.mode == "date") {
        if (column == 0) {
          updateYear(years.value[item[column].index]);
        } else if (column == 1) {
          updateMonth(months.value[item[column].index]);
        } else {
          updateDay(days.value[item[column].index]);
        }
      } else if (props.mode == "time") {
        if (column == 0) {
          updateHour(hours.value[item[column].index]);
        } else {
          updateMinute(minutes.value[item[column].index]);
        }
      } else if (props.mode == "datetime") {
        if (column == 0) {
          updateYear(years.value[item[column].index]);
        } else if (column == 1) {
          updateMonth(months.value[item[column].index]);
        } else if (column == 2) {
          updateDay(days.value[item[column].index]);
        } else if (column == 3) {
          updateHour(hours.value[item[column].index]);
        } else {
          updateMinute(minutes.value[item[column].index]);
        }
      }
    };
    const doConfirm = () => {
      emits("confirm", selectedDate.value);
    };
    const doCancel = () => {
      emits("cancel", selectedDate.value);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$n, [
        createVNode(unref(Picker), {
          options: pickerOptions.value,
          "show-toolbar": _ctx.showToolbar,
          title: _ctx.title,
          "confirm-text": _ctx.confirmText,
          "cancel-text": _ctx.cancelText,
          loading: _ctx.loading,
          "visible-counts": _ctx.visibleCounts,
          "select-height": _ctx.selectHeight,
          onChange: dateChange,
          onConfirm: doConfirm,
          onCancel: doCancel
        }, null, 8, ["options", "show-toolbar", "title", "confirm-text", "cancel-text", "loading", "visible-counts", "select-height"])
      ]);
    };
  }
});
const DatePicker = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-49ac570a"]]);
DatePicker.install = (app) => {
  app.component(DatePicker.name, DatePicker);
};
const FieldProps = {
  //输入框的值
  modelValue: {
    type: [String, Number],
    default: ""
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //是否只读
  readonly: {
    type: Boolean,
    default: false
  },
  //输入框的占位符
  placeholder: {
    type: String,
    default: ""
  },
  //输入框类型
  type: {
    type: String,
    default: "text",
    validator(value) {
      return ["text", "password", "number", "tel", "textarea"].includes(value);
    }
  },
  //输入框大小
  size: {
    type: String,
    default: "medium",
    validator(value) {
      return ["small", "medium", "large"].includes(value);
    }
  },
  //输入框最大字符长度
  maxlength: {
    type: Number,
    default: -1
  },
  //输入框是否圆角
  round: {
    type: Boolean,
    default: false
  },
  //输入框是否方形
  square: {
    type: Boolean,
    default: false
  },
  //前缀
  prefix: {
    type: [String, Object],
    default: null
  },
  //后缀
  suffix: {
    type: [String, Object],
    default: null
  },
  //前置
  prepend: {
    type: [String, Object],
    default: null
  },
  //后置
  append: {
    type: [String, Object],
    default: null
  },
  //点击样式
  activeType: {
    type: String,
    default: "info",
    validator(value) {
      return ["info", "success", "warn", "primary", "error"].includes(value);
    }
  },
  //点击颜色
  activeColor: {
    type: String,
    default: null,
    validator(value) {
      return obj.common.matchingText(value, "hex");
    }
  },
  //是否使用清除图标
  clearable: {
    type: Boolean,
    default: false
  },
  //输入框内容对齐方式
  align: {
    type: String,
    default: "left",
    validator(value) {
      return ["left", "center", "right"].includes(value);
    }
  },
  //原生name
  name: {
    type: String,
    default: null
  },
  //是否自动获取焦点
  autofocus: {
    type: Boolean,
    default: false
  },
  //输入框调起移动端键盘类型
  inputMode: {
    type: String,
    default: "text",
    validator(value) {
      return ["none", "text", "decimal", "numeric", "tel", "search", "email", "url"].includes(value);
    }
  },
  //文本域行数
  rows: {
    type: Number,
    default: 1
  },
  //文本域高度自适应
  autosize: {
    type: [Boolean, Object],
    default: false,
    validator(value) {
      if (obj.common.isObject(value)) {
        if (obj.number.isNumber(value.minRows) && obj.number.isNumber(value.maxRows)) {
          if (value.minRows > value.maxRows) {
            return false;
          }
        }
      }
      return true;
    }
  }
};
const _hoisted_1$m = ["disabled", "data-type"];
const _hoisted_2$k = ["disabled", "readonly", "placeholder", "maxlength", "name", "autofocus", "rows"];
const _hoisted_3$h = ["disabled", "readonly", "type", "placeholder", "inputmode", "maxlength", "name", "autofocus"];
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-field"
  },
  __name: "field",
  props: FieldProps,
  emits: ["update:modelValue", "prepend-click", "prefix-click", "append-click", "suffix-click", "focus", "blur", "input", "clear", "keydown", "keyup"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const focus = ref(false);
    const textareaRef = ref(null);
    const inputRef = ref(null);
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const realValue = computed({
      set(value) {
        if (props.modelValue !== value) {
          emits("update:modelValue", value);
        }
      },
      get() {
        let value = props.modelValue === null ? "" : props.modelValue.toString();
        if (props.type == "number") {
          value = value.replace(/\D/g, "");
        }
        if (props.maxlength > 0 && value.length > props.maxlength) {
          value = value.substring(0, props.maxlength);
        }
        if (props.modelValue !== value) {
          emits("update:modelValue", value);
        }
        return value;
      }
    });
    const showClear = computed(() => {
      if (props.disabled || props.readonly) {
        return false;
      }
      if (realValue.value && focus.value) {
        return true;
      }
      return false;
    });
    const showPrefix = computed(() => {
      if (props.type == "textarea") {
        return false;
      }
      return !!(parseIcon.value(props.prefix).type || parseIcon.value(props.prefix).url || useSlots().prefix);
    });
    const showSuffix = computed(() => {
      if (props.type == "textarea") {
        return false;
      }
      return !!(parseIcon.value(props.suffix).type || parseIcon.value(props.suffix).url || useSlots().suffix);
    });
    const showPrepend = computed(() => {
      if (props.type == "textarea") {
        return false;
      }
      return !!(parseIcon.value(props.prepend).type || parseIcon.value(props.prepend).url || useSlots().prepend);
    });
    const showAppend = computed(() => {
      if (props.type == "textarea") {
        return false;
      }
      return !!(parseIcon.value(props.append).type || parseIcon.value(props.append).url || useSlots().append);
    });
    const clearStyle = computed(() => {
      return {
        borderRadius: showSuffix.value ? 0 : "",
        paddingRight: showSuffix.value ? 0 : ""
      };
    });
    const inputStyle = computed(() => {
      return {
        paddingLeft: showPrefix.value ? 0 : "",
        paddingRight: showSuffix.value || showClear.value && props.clearable ? 0 : "",
        textAlign: props.align ? props.align : ""
      };
    });
    const fieldBodyStyle = computed(() => {
      let style = {};
      if (focus.value && props.activeColor) {
        style.borderColor = props.activeColor;
        const rgb = obj.color.hex2rgb(props.activeColor);
        style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
      }
      return style;
    });
    const fieldBodyClass = computed(() => {
      let cls = [];
      if (showPrepend.value) {
        cls.push("left-none-radius");
      }
      if (showAppend.value) {
        cls.push("right-none-radius");
      }
      if (!props.activeColor && props.activeType && focus.value) {
        cls.push(props.activeType);
      }
      return cls;
    });
    const fieldClass = computed(() => {
      let cls = [props.size];
      if (props.type == "textarea") {
        return cls;
      }
      if (props.round) {
        cls.push("round");
      } else if (props.square) {
        cls.push("square");
      }
      return cls;
    });
    const cmpType = computed(() => {
      if (props.type == "number") {
        return "text";
      }
      return props.type;
    });
    const rowsFilter = computed(() => {
      let rows = props.rows;
      if (obj.common.isObject(props.autosize)) {
        if (obj.number.isNumber(props.autosize.minRows)) {
          if (props.rows < props.autosize.minRows) {
            rows = props.autosize.minRows;
          }
        }
        if (obj.number.isNumber(props.autosize.maxRows)) {
          if (props.rows > props.autosize.maxRows) {
            rows = props.autosize.maxRows;
          }
        }
      }
      return rows;
    });
    const autosizeSet = () => {
      textareaRef.value.style.overflow = "hidden";
      textareaRef.value.style.height = "auto";
      textareaRef.value.scrollTop = 0;
      textareaRef.value.style.height = obj.element.getScrollHeight(textareaRef.value) + "px";
    };
    const rows2Height = (rows) => {
      let lineHeight = Math.floor(parseFloat(obj.element.getCssStyle(textareaRef.value, "line-height")));
      return rows * lineHeight;
    };
    const setMaxMinHeight = () => {
      if (obj.common.isObject(props.autosize)) {
        if (obj.number.isNumber(props.autosize.maxRows)) {
          let maxHeight = rows2Height(props.autosize.maxRows) + parseFloat(obj.element.getCssStyle(textareaRef.value, "padding-top")) + parseFloat(obj.element.getCssStyle(textareaRef.value, "padding-bottom"));
          textareaRef.value.style.maxHeight = maxHeight + "px";
        }
        if (obj.number.isNumber(props.autosize.minRows)) {
          let minHeight = rows2Height(props.autosize.minRows) + parseFloat(obj.element.getCssStyle(textareaRef.value, "padding-top")) + parseFloat(obj.element.getCssStyle(textareaRef.value, "padding-bottom"));
          textareaRef.value.style.minHeight = minHeight + "px";
        }
      } else {
        textareaRef.value.style.maxHeight = "";
        textareaRef.value.style.minHeight = "";
      }
    };
    const keydown = (e) => {
      if (props.disabled) {
        return;
      }
      emits("keydown", e, realValue.value);
    };
    const keyup = (e) => {
      if (props.disabled) {
        return;
      }
      emits("keyup", e, realValue.value);
    };
    const inputFocus = () => {
      if (props.disabled) {
        return;
      }
      focus.value = true;
      emits("focus", realValue.value);
    };
    const inputBlur = () => {
      if (props.disabled) {
        return;
      }
      setTimeout(() => {
        focus.value = false;
        emits("blur", realValue.value);
      }, 200);
    };
    const input = () => {
      if (props.disabled) {
        return;
      }
      emits("input", realValue.value);
    };
    const prependClick = () => {
      if (props.disabled) {
        return;
      }
      emits("prepend-click", realValue.value);
    };
    const prefixClick = () => {
      if (props.disabled) {
        return;
      }
      emits("prefix-click", realValue.value);
    };
    const appendClick = () => {
      if (props.disabled) {
        return;
      }
      emits("append-click", realValue.value);
    };
    const suffixClick = () => {
      if (props.disabled) {
        return;
      }
      emits("suffix-click", realValue.value);
    };
    const doClear = () => {
      if (props.disabled) {
        return;
      }
      if (!props.clearable) {
        return;
      }
      setTimeout(() => {
        realValue.value = "";
        let el = inputRef.value || textareaRef.value;
        el.focus();
        emits("clear", realValue.value);
      }, 210);
    };
    watch(
      () => realValue.value,
      () => {
        nextTick(() => {
          if (textareaRef.value && (props.autosize === true || obj.common.isObject(props.autosize))) {
            autosizeSet();
          }
        });
      }
    );
    watch(
      () => [props.rows, props.autosize],
      () => {
        nextTick(() => {
          if (textareaRef.value) {
            setMaxMinHeight();
          }
        });
      }
    );
    onMounted(() => {
      if (textareaRef.value) {
        setMaxMinHeight();
        if (props.autosize === true || obj.common.isObject(props.autosize)) {
          autosizeSet();
        }
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-field", fieldClass.value]),
        disabled: _ctx.disabled || null,
        "data-type": _ctx.type
      }, [
        showPrepend.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "mvi-field-prepend",
          onClick: prependClick
        }, [
          _ctx.$slots.prepend ? renderSlot(_ctx.$slots, "prepend", { key: 0 }, void 0, true) : (openBlock(), createBlock(unref(Icon), {
            key: 1,
            type: parseIcon.value(_ctx.prepend).type,
            url: parseIcon.value(_ctx.prepend).url,
            spin: parseIcon.value(_ctx.prepend).spin,
            size: parseIcon.value(_ctx.prepend).size,
            color: parseIcon.value(_ctx.prepend).color
          }, null, 8, ["type", "url", "spin", "size", "color"]))
        ])) : createCommentVNode("", true),
        createElementVNode("div", {
          class: normalizeClass(["mvi-field-body", fieldBodyClass.value]),
          style: normalizeStyle(fieldBodyStyle.value)
        }, [
          showPrefix.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "mvi-field-prefix",
            onClick: prefixClick
          }, [
            _ctx.$slots.prefix ? renderSlot(_ctx.$slots, "prefix", { key: 0 }, void 0, true) : (openBlock(), createBlock(unref(Icon), {
              key: 1,
              type: parseIcon.value(_ctx.prefix).type,
              url: parseIcon.value(_ctx.prefix).url,
              spin: parseIcon.value(_ctx.prefix).spin,
              size: parseIcon.value(_ctx.prefix).size,
              color: parseIcon.value(_ctx.prefix).color
            }, null, 8, ["type", "url", "spin", "size", "color"]))
          ])) : createCommentVNode("", true),
          _ctx.type == "textarea" ? withDirectives((openBlock(), createElementBlock("textarea", {
            key: 1,
            ref_key: "textareaRef",
            ref: textareaRef,
            disabled: _ctx.disabled,
            readonly: _ctx.readonly,
            class: "mvi-field-input",
            style: normalizeStyle(inputStyle.value),
            placeholder: _ctx.placeholder,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => realValue.value = $event),
            autocomplete: "off",
            onFocus: inputFocus,
            onBlur: inputBlur,
            maxlength: _ctx.maxlength,
            name: _ctx.name,
            autofocus: _ctx.autofocus,
            rows: rowsFilter.value,
            onInput: input,
            onKeydown: keydown,
            onKeyup: keyup
          }, null, 44, _hoisted_2$k)), [
            [vModelText, realValue.value]
          ]) : withDirectives((openBlock(), createElementBlock("input", {
            key: 2,
            ref_key: "inputRef",
            ref: inputRef,
            disabled: _ctx.disabled,
            readonly: _ctx.readonly,
            class: normalizeClass(["mvi-field-input", showPrefix.value ? "left-none-radius" : "", showSuffix.value || _ctx.clearable && showClear.value ? "right-none-radius" : ""]),
            style: normalizeStyle(inputStyle.value),
            type: cmpType.value,
            placeholder: _ctx.placeholder,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => realValue.value = $event),
            autocomplete: "off",
            inputmode: _ctx.inputMode,
            onFocus: inputFocus,
            onBlur: inputBlur,
            maxlength: _ctx.maxlength,
            name: _ctx.name,
            autofocus: _ctx.autofocus,
            onInput: input,
            onKeydown: keydown,
            onKeyup: keyup
          }, null, 46, _hoisted_3$h)), [
            [vModelDynamic, realValue.value]
          ]),
          _ctx.clearable && _ctx.type != "textarea" ? withDirectives((openBlock(), createElementBlock("div", {
            key: 3,
            class: "mvi-field-clear",
            style: normalizeStyle(clearStyle.value),
            onClick: doClear
          }, [
            createVNode(unref(Icon), { type: "times-o" })
          ], 4)), [
            [vShow, showClear.value]
          ]) : createCommentVNode("", true),
          showSuffix.value ? (openBlock(), createElementBlock("div", {
            key: 4,
            class: "mvi-field-suffix",
            onClick: suffixClick
          }, [
            _ctx.$slots.suffix ? renderSlot(_ctx.$slots, "suffix", { key: 0 }, void 0, true) : (openBlock(), createBlock(unref(Icon), {
              key: 1,
              type: parseIcon.value(props.suffix).type,
              url: parseIcon.value(props.suffix).url,
              spin: parseIcon.value(props.suffix).spin,
              size: parseIcon.value(props.suffix).size,
              color: parseIcon.value(props.suffix).color
            }, null, 8, ["type", "url", "spin", "size", "color"]))
          ])) : createCommentVNode("", true)
        ], 6),
        showAppend.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "mvi-field-append",
          onClick: appendClick
        }, [
          _ctx.$slots.append ? renderSlot(_ctx.$slots, "append", { key: 0 }, void 0, true) : (openBlock(), createBlock(unref(Icon), {
            key: 1,
            type: parseIcon.value(_ctx.append).type,
            url: parseIcon.value(_ctx.append).url,
            spin: parseIcon.value(_ctx.append).spin,
            size: parseIcon.value(_ctx.append).size,
            color: parseIcon.value(_ctx.append).color
          }, null, 8, ["type", "url", "spin", "size", "color"]))
        ])) : createCommentVNode("", true)
      ], 10, _hoisted_1$m);
    };
  }
});
const Field = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-af14ee79"]]);
Field.install = (app) => {
  app.component(Field.name, Field);
};
const FormProps = {
  //竖排显示时整个表单宽度
  width: {
    type: String,
    default: null
  },
  //是否竖排显示
  block: {
    type: Boolean,
    default: false
  },
  //同form-el的align
  align: {
    type: String,
    default: "center"
  },
  //竖排显示时标签是否独立一行
  labelBlock: {
    type: Boolean,
    default: false
  },
  //标签宽度
  labelWidth: {
    type: String,
    default: null
  },
  //标签距离右侧距离
  labelOffset: {
    type: String,
    default: null
  }
};
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-form"
  },
  __name: "form",
  props: FormProps,
  setup(__props) {
    const instance = getCurrentInstance();
    componentIsMatch(instance, "m-form-el", ["Form", "FormEl"]);
    provide("form", instance);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-form", { block: _ctx.block }]),
        style: normalizeStyle({ width: _ctx.block && _ctx.width ? _ctx.width : "" })
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 6);
    };
  }
});
const Form = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-bbb0f1f6"]]);
Form.install = (app) => {
  app.component(Form.name, Form);
};
const FormElProps = {
  //垂直对齐方式
  align: {
    type: String,
    default: null
  },
  //宽度
  width: {
    type: String,
    default: null
  },
  //标签内容
  label: {
    type: String,
    default: ""
  },
  //标签宽度
  labelWidth: {
    type: String,
    default: null
  },
  //标签距离右侧距离
  labelOffset: {
    type: String,
    default: null
  }
};
const _hoisted_1$l = ["textContent"];
const _hoisted_2$j = {
  key: 1,
  class: "mvi-form-container"
};
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-form-el"
  },
  __name: "form-el",
  props: FormElProps,
  setup(__props) {
    const form = inject("form", null);
    parentIsMatch(ref([]), form, "m-form", ["Form", "FormEl"]);
    const props = __props;
    const labelStyle = computed(() => {
      let style = {};
      if (!form.props.labelBlock) {
        if (props.labelWidth) {
          style.width = props.labelWidth;
        } else if (form.props.labelWidth) {
          style.width = form.props.labelWidth;
        }
      }
      if (props.labelOffset) {
        if (form.props.labelBlock) {
          style.marginBottom = props.labelOffset;
        } else {
          style.marginRight = props.labelOffset;
        }
      } else if (form.props.labelOffset) {
        if (form.props.labelBlock) {
          style.marginBottom = form.props.labelOffset;
        } else {
          style.marginRight = form.props.labelOffset;
        }
      }
      return style;
    });
    const formElStyle = computed(() => {
      let style = {};
      if (props.width) {
        style.width = props.width;
      }
      if (props.align) {
        style.alignItems = props.align;
      } else if (form.props.align) {
        style.alignItems = form.props.align;
      }
      return style;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-form-el", { block: unref(form).props.block }]),
        style: normalizeStyle(formElStyle.value)
      }, [
        _ctx.label ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["mvi-form-label", { block: unref(form).props.labelBlock && unref(form).props.block }]),
          textContent: toDisplayString(_ctx.label),
          style: normalizeStyle(labelStyle.value)
        }, null, 14, _hoisted_1$l)) : createCommentVNode("", true),
        _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_2$j, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])) : createCommentVNode("", true)
      ], 6);
    };
  }
});
const FormEl = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-5abf1cbc"]]);
FormEl.install = (app) => {
  app.component(FormEl.name, FormEl);
};
const ImageProps = {
  //图片链接
  src: {
    type: String,
    default: ""
  },
  //填充类型
  fit: {
    type: String,
    default: "fill",
    validator(value) {
      return ["fill", "cover", "contain", "response", "none"].includes(value);
    }
  },
  //原生alt属性
  alt: {
    type: String,
    default: ""
  },
  //是否显示图片加载失败提示
  showError: {
    type: Boolean,
    default: true
  },
  //是否显示图片加载中提示
  showLoading: {
    type: Boolean,
    default: true
  },
  //是否启用延迟加载
  lazyLoad: {
    type: Boolean,
    default: false
  },
  //延时加载时指定的滚动容器选择器
  root: {
    type: String,
    default: null
  },
  //加载图标
  loadIcon: {
    type: [String, Object],
    default: "image-alt"
  },
  //失败图标
  errorIcon: {
    type: [String, Object],
    default: "image-error"
  },
  //是否圆形图片
  round: {
    type: Boolean,
    default: false
  },
  //图片宽度
  width: {
    type: String,
    default: null
  },
  //图片高度
  height: {
    type: String,
    default: null
  }
};
const _hoisted_1$k = {
  key: 0,
  class: "mvi-image-loading"
};
const _hoisted_2$i = ["src", "alt"];
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-image"
  },
  __name: "image",
  props: ImageProps,
  emits: ["success", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const error = ref(false);
    const loading = ref(true);
    const lazySrc = ref("");
    const lazying = ref(false);
    const spy = ref(null);
    const elRef = ref(null);
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const imageStyle = computed(() => {
      let style = {};
      if (props.round) {
        style.borderRadius = "50%";
      }
      if (props.width) {
        style.width = props.width;
      }
      if (props.height) {
        style.height = props.height;
      }
      return style;
    });
    const imgClass = computed(() => {
      if (props.fit == "contain") {
        return "mvi-image-contain";
      }
      if (props.fit == "cover") {
        return "mvi-image-cover";
      }
      if (props.fit == "none") {
        return "mvi-image-none";
      }
      if (props.fit == "response") {
        return "mvi-image-response";
      }
      return "mvi-image-fill";
    });
    const cmpSrc = computed(() => {
      if (props.lazyLoad) {
        return lazySrc.value;
      } else {
        return props.src;
      }
    });
    const lazyloadFun = () => {
      lazying.value = true;
      spy.value = new Spy$1(elRef.value, {
        el: props.root,
        //图片进入可视端口时加载
        beforeEnter: () => {
          lazying.value = false;
          lazySrc.value = props.src;
        }
      });
      spy.value.init();
    };
    const loadSuccess = (e) => {
      error.value = false;
      loading.value = false;
      emits("success", e.target);
    };
    const loadError = (e) => {
      loading.value = false;
      error.value = true;
      emits("error", e.target);
    };
    watch(
      () => cmpSrc.value,
      () => {
        loading.value = true;
      }
    );
    onMounted(() => {
      if (props.lazyLoad) {
        lazyloadFun();
      }
    });
    onBeforeUnmount(() => {
      if (spy.value) {
        spy.value.destroy();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "mvi-image",
        style: normalizeStyle(imageStyle.value),
        ref_key: "elRef",
        ref: elRef
      }, [
        (loading.value || lazying.value) && _ctx.showLoading ? (openBlock(), createElementBlock("div", _hoisted_1$k, [
          _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : (openBlock(), createBlock(unref(Icon), {
            key: 1,
            type: parseIcon.value(_ctx.loadIcon).type,
            url: parseIcon.value(_ctx.loadIcon).url,
            spin: parseIcon.value(_ctx.loadIcon).spin,
            size: parseIcon.value(_ctx.loadIcon).size,
            color: parseIcon.value(_ctx.loadIcon).color
          }, null, 8, ["type", "url", "spin", "size", "color"]))
        ])) : error.value && _ctx.showError ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "mvi-image-error",
          ref_key: "error",
          ref: error
        }, [
          _ctx.$slots.error ? renderSlot(_ctx.$slots, "error", { key: 0 }, void 0, true) : (openBlock(), createBlock(unref(Icon), {
            key: 1,
            type: parseIcon.value(_ctx.errorIcon).type,
            url: parseIcon.value(_ctx.errorIcon).url,
            spin: parseIcon.value(_ctx.errorIcon).spin,
            size: parseIcon.value(_ctx.errorIcon).size,
            color: parseIcon.value(_ctx.errorIcon).color
          }, null, 8, ["type", "url", "spin", "size", "color"]))
        ], 512)) : createCommentVNode("", true),
        createElementVNode("img", {
          onLoad: loadSuccess,
          onError: loadError,
          src: cmpSrc.value,
          alt: _ctx.showError ? "" : _ctx.alt,
          class: normalizeClass(imgClass.value)
        }, null, 42, _hoisted_2$i)
      ], 4);
    };
  }
});
const Image$1 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-9e06bb2d"]]);
Image$1.install = (app) => {
  app.component(Image$1.name, Image$1);
};
const ColorPickerProps = {
  //颜色值
  modelValue: {
    type: String,
    default: "#ff0000"
  },
  //是否显示透明度滑动条
  showAlpha: {
    type: Boolean,
    default: true
  }
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-c60d995e"), n = n(), popScopeId(), n);
const _hoisted_1$j = { class: "mvi-color-picker" };
const _hoisted_2$h = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("div", { class: "mvi-color-picker-slider" }, null, -1));
const _hoisted_3$g = {
  key: 0,
  class: "mvi-color-picker-alpha"
};
const _hoisted_4$b = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("div", { class: "mvi-color-picker-slider" }, null, -1));
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-color-picker"
  },
  __name: "color-picker",
  props: ColorPickerProps,
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const hsv = ref([0, 0, 0]);
    const opacity = ref(1);
    const updateByDrag = ref(false);
    const dragging = ref(false);
    const heightObj = ref(null);
    const dragObj = ref(null);
    const panelRef = ref(null);
    const sliderRef = ref(null);
    const panelStyle = computed(() => {
      const rgbValue = obj.color.hsv2rgb([hsv.value[0], 100, 100]);
      return {
        background: `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`
      };
    });
    const alphaTrackColor = computed(() => {
      const rgbValue = obj.color.hsv2rgb(hsv.value);
      return `linear-gradient(to right, transparent 0%, rgb(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]}) 100%)`;
    });
    const initHSV = () => {
      if (updateByDrag.value) {
        return;
      }
      if (props.modelValue && obj.common.matchingText(props.modelValue, "hex")) {
        const rgbValue = obj.color.hex2rgb(props.modelValue);
        hsv.value = obj.color.rgb2hsv(rgbValue);
        opacity.value = 1;
      } else {
        try {
          const first = props.modelValue.indexOf("(");
          const last = props.modelValue.lastIndexOf(")");
          const arry = props.modelValue.substring(first + 1, last).split(",");
          if (arry.length < 3) {
            throw new Error("Color values are not RGB (RGBA) format and hexadecimal format");
          }
          const rgbValue = [Number(arry[0]), Number(arry[1]), Number(arry[2])];
          hsv.value = obj.color.rgb2hsv(rgbValue);
          opacity.value = arry.length == 4 ? Number(arry[3]) : 1;
        } catch (e) {
          throw new Error("Color values are not RGB (RGBA) format and hexadecimal format");
        }
      }
    };
    const setPanelHeight = () => {
      if (heightObj.value) {
        return;
      }
      heightObj.value = new Prop$1(panelRef.value, 0.7);
      heightObj.value.init();
    };
    const setPanelDrag = () => {
      if (dragObj.value) {
        return;
      }
      dragObj.value = new Drag$1(sliderRef.value, {
        container: panelRef.value,
        mode: "on",
        draggableX: true,
        draggableY: true,
        cursor: false,
        beforeDrag: () => {
          updateByDrag.value = true;
          dragging.value = true;
        },
        drag: () => {
          const placement = obj.element.getElementPoint(sliderRef.value, panelRef.value);
          hsv.value[1] = (placement.left + sliderRef.value.offsetWidth / 2) / panelRef.value.offsetWidth * 100;
          hsv.value[2] = (1 - (placement.top + sliderRef.value.offsetHeight / 2) / panelRef.value.offsetHeight) * 100;
          setValue();
        },
        dragged: () => {
          updateByDrag.value = false;
          nextTick(() => {
            setTimeout(() => {
              dragging.value = false;
            }, 10);
          });
        }
      });
      dragObj.value.init();
    };
    const setSliderPlacement = () => {
      sliderRef.value.style.left = hsv.value[1] / 100 * panelRef.value.offsetWidth - sliderRef.value.offsetWidth / 2 + "px";
      sliderRef.value.style.top = (1 - hsv.value[2] / 100) * panelRef.value.offsetHeight - sliderRef.value.offsetHeight / 2 + "px";
    };
    const setValue = () => {
      const rgbValue = obj.color.hsv2rgb(hsv.value);
      if (opacity.value == 1) {
        const val = `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`;
        emits("update:modelValue", val);
        emits("change", val);
      } else {
        const val = `rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]},${Number(opacity.value.toFixed(2))})`;
        emits("update:modelValue", val);
        emits("change", val);
      }
    };
    const clickPanelSetColor = (e) => {
      if (dragging.value) {
        return;
      }
      updateByDrag.value = true;
      sliderRef.value.style.left = e.offsetX - sliderRef.value.offsetWidth / 2 + "px";
      sliderRef.value.style.top = e.offsetY - sliderRef.value.offsetHeight / 2 + "px";
      const placement = obj.element.getElementPoint(sliderRef.value, panelRef.value);
      hsv.value[1] = (placement.left + sliderRef.value.offsetWidth / 2) / panelRef.value.offsetWidth * 100;
      hsv.value[2] = (1 - (placement.top + sliderRef.value.offsetHeight / 2) / panelRef.value.offsetHeight) * 100;
      setValue();
    };
    watch(
      () => props.modelValue,
      () => {
        initHSV();
        setSliderPlacement();
      }
    );
    initHSV();
    onMounted(() => {
      setPanelHeight();
      setPanelDrag();
      setSliderPlacement();
    });
    onBeforeUnmount(() => {
      if (dragObj.value) {
        dragObj.value.destroy();
      }
      if (heightObj.value) {
        heightObj.value.destroy();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$j, [
        createElementVNode("div", {
          class: "mvi-color-picker-panel",
          ref_key: "panelRef",
          ref: panelRef,
          style: normalizeStyle(panelStyle.value),
          onClick: clickPanelSetColor
        }, [
          createElementVNode("div", {
            class: "mvi-color-picker-panel-slider",
            ref_key: "sliderRef",
            ref: sliderRef
          }, null, 512)
        ], 4),
        createVNode(unref(Slider), {
          modelValue: hsv.value[0],
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => hsv.value[0] = $event),
          min: 0,
          max: 360,
          "stroke-width": "0.3rem",
          square: "",
          "track-color": "linear-gradient(to right, #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%)",
          color: "transparent",
          onChange: setValue
        }, {
          button: withCtx(() => [
            _hoisted_2$h
          ]),
          _: 1
        }, 8, ["modelValue"]),
        _ctx.showAlpha ? (openBlock(), createElementBlock("div", _hoisted_3$g, [
          createVNode(unref(Slider), {
            modelValue: opacity.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => opacity.value = $event),
            min: 0,
            max: 1,
            "stroke-width": "0.3rem",
            square: "",
            "track-color": alphaTrackColor.value,
            color: "transparent",
            onChange: setValue
          }, {
            button: withCtx(() => [
              _hoisted_4$b
            ]),
            _: 1
          }, 8, ["modelValue", "track-color"])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const ColorPicker = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-c60d995e"]]);
ColorPicker.install = (app) => {
  app.component(ColorPicker.name, ColorPicker);
};
const ListProps = {
  //是否加载状态
  loading: {
    type: Boolean,
    default: false
  },
  //是否错误状态
  error: {
    type: Boolean,
    default: false
  },
  //是否完成状态
  finished: {
    type: Boolean,
    default: false
  },
  //加载文案
  loadingText: {
    type: String,
    default: "正在加载"
  },
  //错误文案
  errorText: {
    type: String,
    default: "数据加载失败"
  },
  //完成文案
  finishedText: {
    type: String,
    default: "没有更多了"
  },
  //初始化是否触发一次load
  immediateLoad: {
    type: Boolean,
    default: false
  },
  //content内容
  content: {
    type: String,
    default: "点我加载更多"
  },
  //滚动元素
  scrollEl: {
    type: String,
    default: null
  }
};
const _hoisted_1$i = { class: "mvi-list" };
const _hoisted_2$g = {
  key: 0,
  class: "mvi-list-finished"
};
const _hoisted_3$f = { key: 1 };
const _hoisted_4$a = {
  key: 1,
  class: "mvi-list-loading"
};
const _hoisted_5$6 = { key: 1 };
const _hoisted_6$6 = { key: 1 };
const _hoisted_7$5 = { key: 1 };
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-list"
  },
  __name: "list",
  props: ListProps,
  emits: ["load", "update:loading", "update:error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const scrollObj = ref(null);
    const doLoad = () => {
      if (props.finished) {
        return;
      }
      emits("update:loading", true);
      emits("update:error", false);
      emits("load");
    };
    const initScroll = () => {
      const el = document.body.querySelector(props.scrollEl);
      if (!el) {
        return;
      }
      if (scrollObj.value) {
        return;
      }
      scrollObj.value = new Scroll$1(el, {
        bottom: () => {
          if (props.finished || props.loading || props.error) {
            return;
          }
          doLoad();
        }
      });
      scrollObj.value.init();
    };
    onMounted(() => {
      initScroll();
      if (props.immediateLoad) {
        doLoad();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$i, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true),
        _ctx.finished ? (openBlock(), createElementBlock("div", _hoisted_2$g, [
          _ctx.$slots.finished ? renderSlot(_ctx.$slots, "finished", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_3$f, toDisplayString(_ctx.finishedText), 1))
        ])) : _ctx.loading ? (openBlock(), createElementBlock("div", _hoisted_4$a, [
          _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_5$6, toDisplayString(_ctx.loadingText), 1))
        ])) : _ctx.error ? (openBlock(), createElementBlock("div", {
          key: 2,
          onClick: doLoad,
          class: "mvi-list-error"
        }, [
          _ctx.$slots.error ? renderSlot(_ctx.$slots, "error", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_6$6, toDisplayString(_ctx.errorText), 1))
        ])) : _ctx.content || _ctx.$slots.content ? (openBlock(), createElementBlock("div", {
          key: 3,
          onClick: doLoad,
          class: "mvi-list-content"
        }, [
          _ctx.$slots.content ? renderSlot(_ctx.$slots, "content", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_7$5, toDisplayString(_ctx.content), 1))
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const List = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-d30b6267"]]);
List.install = (app) => {
  app.component(List.name, List);
};
const ModalProps = {
  //是否显示
  modelValue: {
    type: Boolean,
    default: false
  },
  //挂载元素
  mountEl: {
    type: String,
    default: null
  },
  //模态框标题
  title: {
    type: String,
    default: ""
  },
  //标题是否居中
  center: {
    type: Boolean,
    default: false
  },
  //标题是否只一行，超出省略
  ellipsis: {
    type: Boolean,
    default: false
  },
  //模态框内容
  content: {
    type: String,
    default: ""
  },
  //尾注信息
  footer: {
    type: String,
    default: null
  },
  //是否显示关闭图标
  showTimes: {
    type: Boolean,
    default: false
  },
  //动画时间
  timeout: {
    type: Number,
    default: 200
  },
  //点击背景遮罩是否关闭
  closable: {
    type: Boolean,
    default: false
  },
  //遮罩层颜色
  overlayColor: {
    type: String,
    default: null
  },
  //遮罩层z-index
  zIndex: {
    type: Number,
    default: 900
  },
  //弹窗显示的宽度
  width: {
    type: String,
    default: null
  },
  //模态框圆角
  radius: {
    type: String,
    default: null
  },
  //动画
  animation: {
    type: String,
    //'narrow','scale','translate-top','translate-bottom','translate-left','translate-right'
    default: "scale"
  },
  //局部显示是否考虑PC端滚动条影响
  usePadding: {
    type: Boolean,
    default: false
  },
  //是否全屏
  fullScreen: {
    type: Boolean,
    default: false
  },
  //模态框作为dialog时的属性，不设置footer的内边距，仅供内部使用
  __ignorePadding: {
    type: Boolean,
    default: false
  }
};
const _hoisted_1$h = ["innerHTML"];
const _hoisted_2$f = ["innerHTML"];
const _hoisted_3$e = ["textContent"];
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false,
    name: "m-modal"
  },
  __name: "modal",
  props: ModalProps,
  emits: ["update:modelValue", "show", "showing", "shown", "hide", "hidding", "hidden"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const modalShow = ref(false);
    const firstShow = ref(false);
    const overlayRef = ref(null);
    const modalRef = ref(null);
    const wrapperRef = ref(null);
    const headerRef = ref(null);
    const contentRef = ref(null);
    const footerRef = ref(null);
    const $$el = computed(() => {
      return overlayRef.value ? overlayRef.value.$$el : null;
    });
    const show = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emits("update:modelValue", value);
      }
    });
    const wrapperStyle = computed(() => {
      let style = {};
      if (props.radius) {
        style.borderRadius = props.radius;
      }
      style.transition = "all " + props.timeout + "ms";
      return style;
    });
    const headerStyle = computed(() => {
      let style = {};
      if (useSlots().default || props.content) {
        style.paddingBottom = "0";
      }
      return style;
    });
    const modalSize = () => {
      if (props.fullScreen) {
        modalRef.value.style.width = $$el.value.offsetParent.offsetWidth + "px";
        wrapperRef.value.style.height = $$el.value.offsetParent.offsetHeight + "px";
        wrapperRef.value.style.maxHeight = "";
      } else {
        if (props.width) {
          modalRef.value.style.width = props.width;
        } else {
          modalRef.value.style.width = "";
        }
        wrapperRef.value.style.maxHeight = $$el.value.offsetParent.offsetHeight * 0.96 + "px";
        wrapperRef.value.style.height = "";
      }
    };
    const overlayShow = () => {
      if (!firstShow.value) {
        firstShow.value = true;
      }
      modalShow.value = true;
    };
    const overlayHide = () => {
      modalShow.value = false;
    };
    const beforeEnter = (el) => {
      if (obj.data.get(el, "mvi-modal-beforeEnter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-modal-beforeEnter-trigger", true);
      emits("show", el);
      if (typeof instance.appContext.config.globalProperties.modalComponentWatch == "function") {
        instance.appContext.config.globalProperties.apply(instance.proxy, ["show", el]);
      }
    };
    const enter = (el) => {
      if (obj.data.get(el, "mvi-modal-enter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-modal-enter-trigger", true);
      modalSize();
      emits("showing", el);
      if (typeof instance.appContext.config.globalProperties.modalComponentWatch == "function") {
        instance.appContext.config.globalProperties.apply(instance.proxy, ["showing", el]);
      }
    };
    const afterEnter = (el) => {
      emits("shown", el);
      if (typeof instance.appContext.config.globalProperties.modalComponentWatch == "function") {
        instance.appContext.config.globalProperties.apply(instance.proxy, ["shown", el]);
      }
    };
    const beforeLeave = (el) => {
      obj.data.remove(el, "mvi-modal-beforeEnter-trigger");
      obj.data.remove(el, "mvi-modal-enter-trigger");
      emits("hide", el);
      if (typeof instance.appContext.config.globalProperties.modalComponentWatch == "function") {
        instance.appContext.config.globalProperties.modalComponentWatch.apply(instance.proxy, ["hide", el]);
      }
    };
    const leave = (el) => {
      emits("hidding", el);
      if (typeof instance.appContext.config.globalProperties.modalComponentWatch == "function") {
        instance.appContext.config.globalProperties.modalComponentWatch.apply(instance.proxy, ["hidding", el]);
      }
    };
    const afterLeave = (el) => {
      emits("hidden", el);
      if (typeof instance.appContext.config.globalProperties.modalComponentWatch == "function") {
        instance.appContext.config.globalProperties.modalComponentWatch.apply(instance.proxy, ["hidden", el]);
      }
    };
    watch(
      () => props.fullScreen,
      () => {
        modalSize();
      }
    );
    __expose({
      $$el
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Overlay), {
        ref_key: "overlayRef",
        ref: overlayRef,
        modelValue: show.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => show.value = $event),
        onShow: overlayShow,
        onHide: overlayHide,
        "use-padding": _ctx.usePadding,
        "z-index": _ctx.zIndex,
        closable: _ctx.closable,
        color: _ctx.overlayColor,
        timeout: _ctx.timeout,
        "mount-el": _ctx.mountEl
      }, {
        default: withCtx(() => [
          createElementVNode("div", {
            ref_key: "modalRef",
            ref: modalRef,
            class: "mvi-modal",
            style: normalizeStyle({ zIndex: _ctx.zIndex + 10 })
          }, [
            createVNode(Transition, {
              name: "mvi-modal-" + _ctx.animation,
              onBeforeEnter: beforeEnter,
              onEnter: enter,
              onAfterEnter: afterEnter,
              onBeforeLeave: beforeLeave,
              onLeave: leave,
              onAfterLeave: afterLeave
            }, {
              default: withCtx(() => [
                firstShow.value ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
                  key: 0,
                  class: "mvi-modal-wrapper",
                  ref_key: "wrapperRef",
                  ref: wrapperRef,
                  style: wrapperStyle.value
                }, _ctx.$attrs), [
                  _ctx.showTimes ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "mvi-modal-times",
                    onClick: _cache[0] || (_cache[0] = ($event) => show.value = false)
                  }, [
                    createVNode(unref(Icon), { type: "times" })
                  ])) : createCommentVNode("", true),
                  _ctx.$slots.title || _ctx.title ? (openBlock(), createElementBlock("div", {
                    key: 1,
                    ref_key: "headerRef",
                    ref: headerRef,
                    class: normalizeClass(["mvi-modal-title", { ellipsis: _ctx.ellipsis, center: _ctx.center }]),
                    style: normalizeStyle(headerStyle.value)
                  }, [
                    _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : _ctx.title ? (openBlock(), createElementBlock("span", {
                      key: 1,
                      innerHTML: _ctx.title
                    }, null, 8, _hoisted_1$h)) : createCommentVNode("", true)
                  ], 6)) : createCommentVNode("", true),
                  _ctx.$slots.default || _ctx.content ? (openBlock(), createElementBlock("div", {
                    key: 2,
                    ref_key: "contentRef",
                    ref: contentRef,
                    class: "mvi-modal-content"
                  }, [
                    _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : _ctx.content ? (openBlock(), createElementBlock("span", {
                      key: 1,
                      innerHTML: _ctx.content
                    }, null, 8, _hoisted_2$f)) : createCommentVNode("", true)
                  ], 512)) : createCommentVNode("", true),
                  _ctx.$slots.footer || _ctx.footer ? (openBlock(), createElementBlock("div", {
                    key: 3,
                    ref_key: "footerRef",
                    ref: footerRef,
                    class: "mvi-modal-footer",
                    style: normalizeStyle({ padding: _ctx.__ignorePadding ? 0 : "" })
                  }, [
                    _ctx.$slots.footer ? renderSlot(_ctx.$slots, "footer", { key: 0 }, void 0, true) : _ctx.footer ? (openBlock(), createElementBlock("span", {
                      key: 1,
                      textContent: toDisplayString(_ctx.footer)
                    }, null, 8, _hoisted_3$e)) : createCommentVNode("", true)
                  ], 4)) : createCommentVNode("", true)
                ], 16)), [
                  [vShow, modalShow.value]
                ]) : createCommentVNode("", true)
              ]),
              _: 3
            }, 8, ["name"])
          ], 4)
        ]),
        _: 3
      }, 8, ["modelValue", "use-padding", "z-index", "closable", "color", "timeout", "mount-el"]);
    };
  }
});
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-88e2aa4f"]]);
Modal.install = (app) => {
  app.component(Modal.name, Modal);
};
const PageProps = {
  //当前页
  modelValue: {
    type: Number,
    default: 1
  },
  //总页数
  total: {
    type: Number,
    default: 1
  },
  //显示的页码数
  overNumber: {
    type: Number,
    default: 3,
    validator(value) {
      return value % 2 != 0;
    }
  },
  //上一页显示文字
  prevText: {
    type: String,
    default: null
  },
  //下一页显示文字
  nextText: {
    type: String,
    default: null
  },
  //上一页显示的图标
  prevIcon: {
    type: [String, Object],
    default: "angle-left"
  },
  //下一页显示的图标
  nextIcon: {
    type: [String, Object],
    default: "angle-right"
  },
  //简单模式
  simple: {
    type: Boolean,
    default: false
  },
  //首页显示的文字
  firstText: {
    type: String,
    default: null
  },
  //尾页显示的文字
  lastText: {
    type: String,
    default: null
  },
  //首页显示的图标
  firstIcon: {
    type: [Object, String],
    default: "angle-double-left"
  },
  //尾页显示的图标
  lastIcon: {
    type: [Object, String],
    default: "angle-double-right"
  },
  //自定义字体颜色及选中的背景色
  color: {
    type: String,
    default: null
  },
  //是否显示点击态
  active: {
    type: Boolean,
    default: true
  }
};
const _hoisted_1$g = ["disabled"];
const _hoisted_2$e = ["textContent"];
const _hoisted_3$d = ["disabled"];
const _hoisted_4$9 = ["textContent"];
const _hoisted_5$5 = { class: "mvi-page-numbers" };
const _hoisted_6$5 = {
  key: 0,
  class: "mvi-page-numbers-simple"
};
const _hoisted_7$4 = {
  key: 1,
  class: "mvi-page-numbers-items"
};
const _hoisted_8$3 = ["textContent", "onClick"];
const _hoisted_9$1 = ["textContent", "onClick"];
const _hoisted_10 = ["disabled"];
const _hoisted_11 = ["textContent"];
const _hoisted_12 = ["disabled"];
const _hoisted_13 = ["textContent"];
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-page"
  },
  __name: "page",
  props: PageProps,
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const elRef = ref(null);
    const pageStyle = computed(() => {
      return (item) => {
        let style = {};
        if (props.modelValue == item) {
          if (elRef.value) {
            style.color = obj.element.getCssStyle(elRef.value, "background-color");
          }
          style.backgroundColor = props.color || "";
        } else {
          style.color = props.color || "";
        }
        return style;
      };
    });
    const arr = computed(() => {
      let arr2 = [];
      if (props.modelValue <= (props.overNumber - 1) / 2 + 1) {
        for (let i = 0; i < props.overNumber; i++) {
          arr2.push(i + 1);
        }
      } else if (props.modelValue <= props.total - (props.overNumber - 1) / 2) {
        for (let i = 0; i < (props.overNumber - 1) / 2; i++) {
          arr2.push(props.modelValue - ((props.overNumber - 1) / 2 - i));
        }
        arr2.push(props.modelValue);
        for (let i = 0; i < (props.overNumber - 1) / 2; i++) {
          arr2.push(props.modelValue + (i + 1));
        }
      } else {
        for (let i = 0; i < props.overNumber; i++) {
          arr2.push(props.total - (props.overNumber - 1 - i));
        }
      }
      return arr2;
    });
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const firstStyle = computed(() => {
      let style = {};
      if (props.modelValue > 1 && props.color) {
        style.color = props.color;
      }
      return style;
    });
    const lastStyle = computed(() => {
      let style = {};
      if (props.modelValue < props.total && props.color) {
        style.color = props.color;
      }
      return style;
    });
    const pagePrev = () => {
      if (props.modelValue == 1) {
        return;
      }
      let page = props.modelValue - 1;
      emits("update:modelValue", page);
      emits("change", page);
    };
    const pageNext = () => {
      if (props.modelValue == props.total) {
        return;
      }
      let page = props.modelValue + 1;
      emits("update:modelValue", page);
      emits("change", page);
    };
    const pageFirst = () => {
      if (props.modelValue == 1) {
        return;
      }
      emits("update:modelValue", 1);
      emits("change", 1);
    };
    const pageLast = () => {
      if (props.modelValue == props.total) {
        return;
      }
      emits("update:modelValue", props.total);
      emits("change", props.total);
    };
    const toPage = (page) => {
      if (props.modelValue == page) {
        return;
      }
      if (page >= props.total) {
        page = props.total;
      }
      if (page <= 1) {
        page = 1;
      }
      emits("update:modelValue", page);
      emits("change", page);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "mvi-page",
        ref_key: "elRef",
        ref: elRef
      }, [
        _ctx.firstText || parseIcon.value(_ctx.firstIcon).type || parseIcon.value(_ctx.firstIcon).url ? (openBlock(), createElementBlock("div", {
          key: 0,
          disabled: _ctx.modelValue == 1 || null,
          onClick: pageFirst,
          class: normalizeClass(["mvi-page-first", { active: _ctx.active && _ctx.modelValue != 1 }]),
          style: normalizeStyle(firstStyle.value)
        }, [
          parseIcon.value(_ctx.firstIcon).type || parseIcon.value(_ctx.firstIcon).url ? (openBlock(), createBlock(unref(Icon), {
            key: 0,
            class: normalizeClass({ "margin-right": !!_ctx.firstText }),
            type: parseIcon.value(_ctx.firstIcon).type,
            url: parseIcon.value(_ctx.firstIcon).url,
            spin: parseIcon.value(_ctx.firstIcon).spin,
            size: parseIcon.value(_ctx.firstIcon).size,
            color: parseIcon.value(_ctx.firstIcon).color
          }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
          _ctx.firstText ? (openBlock(), createElementBlock("span", {
            key: 1,
            textContent: toDisplayString(_ctx.firstText)
          }, null, 8, _hoisted_2$e)) : createCommentVNode("", true)
        ], 14, _hoisted_1$g)) : createCommentVNode("", true),
        _ctx.prevText || parseIcon.value(_ctx.prevIcon).type || parseIcon.value(_ctx.prevIcon).url ? (openBlock(), createElementBlock("div", {
          key: 1,
          disabled: _ctx.modelValue == 1 || null,
          onClick: pagePrev,
          class: normalizeClass(["mvi-page-prev", { active: _ctx.active && _ctx.modelValue != 1 }]),
          style: normalizeStyle(firstStyle.value)
        }, [
          parseIcon.value(_ctx.prevIcon).type || parseIcon.value(_ctx.prevIcon).url ? (openBlock(), createBlock(unref(Icon), {
            key: 0,
            class: normalizeClass({ "margin-right": !!_ctx.prevText }),
            type: parseIcon.value(_ctx.prevIcon).type,
            url: parseIcon.value(_ctx.prevIcon).url,
            size: parseIcon.value(_ctx.prevIcon).size,
            spin: parseIcon.value(_ctx.prevIcon).spin,
            color: parseIcon.value(_ctx.prevIcon).color
          }, null, 8, ["class", "type", "url", "size", "spin", "color"])) : createCommentVNode("", true),
          _ctx.prevText ? (openBlock(), createElementBlock("span", {
            key: 1,
            textContent: toDisplayString(_ctx.prevText)
          }, null, 8, _hoisted_4$9)) : createCommentVNode("", true)
        ], 14, _hoisted_3$d)) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_5$5, [
          _ctx.simple ? (openBlock(), createElementBlock("div", _hoisted_6$5, toDisplayString(_ctx.modelValue) + " / " + toDisplayString(_ctx.total), 1)) : (openBlock(), createElementBlock("div", _hoisted_7$4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.total, (item) => {
              return openBlock(), createElementBlock(Fragment, null, [
                _ctx.total <= _ctx.overNumber ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["mvi-page-numbers-item", { "number-active": _ctx.modelValue == item, active: _ctx.active && _ctx.modelValue != item }]),
                  textContent: toDisplayString(item),
                  onClick: ($event) => toPage(item),
                  style: normalizeStyle(pageStyle.value(item))
                }, null, 14, _hoisted_8$3)) : createCommentVNode("", true)
              ], 64);
            }), 256)),
            _ctx.total > _ctx.overNumber && _ctx.modelValue > (_ctx.overNumber - 1) / 2 + 1 ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["mvi-page-numbers-item", { active: _ctx.active }]),
              onClick: _cache[0] || (_cache[0] = ($event) => toPage(_ctx.modelValue - (_ctx.overNumber - 1))),
              style: normalizeStyle({ color: _ctx.color || "" })
            }, "...", 6)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(arr.value, (item) => {
              return openBlock(), createElementBlock(Fragment, null, [
                _ctx.total > _ctx.overNumber ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["mvi-page-numbers-item", { "number-active": _ctx.modelValue == item, active: _ctx.active && _ctx.modelValue != item }]),
                  textContent: toDisplayString(item),
                  onClick: ($event) => toPage(item),
                  style: normalizeStyle(pageStyle.value(item))
                }, null, 14, _hoisted_9$1)) : createCommentVNode("", true)
              ], 64);
            }), 256)),
            _ctx.total > _ctx.overNumber && _ctx.modelValue < _ctx.total - (_ctx.overNumber - 1) / 2 ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(["mvi-page-numbers-item", { active: _ctx.active }]),
              onClick: _cache[1] || (_cache[1] = ($event) => toPage(_ctx.modelValue + (_ctx.overNumber - 1))),
              style: normalizeStyle({ color: _ctx.color || "" })
            }, "...", 6)) : createCommentVNode("", true)
          ]))
        ]),
        _ctx.nextText || parseIcon.value(_ctx.nextIcon).type || parseIcon.value(_ctx.nextIcon).url ? (openBlock(), createElementBlock("div", {
          key: 2,
          disabled: _ctx.modelValue == _ctx.total || null,
          onClick: pageNext,
          class: normalizeClass(["mvi-page-next", { active: _ctx.active && _ctx.modelValue != _ctx.total }]),
          style: normalizeStyle(lastStyle.value)
        }, [
          _ctx.nextText ? (openBlock(), createElementBlock("span", {
            key: 0,
            textContent: toDisplayString(_ctx.nextText)
          }, null, 8, _hoisted_11)) : createCommentVNode("", true),
          parseIcon.value(_ctx.nextIcon).type || parseIcon.value(_ctx.nextIcon).url ? (openBlock(), createBlock(unref(Icon), {
            key: 1,
            class: normalizeClass(_ctx.nextText ? "margin-left" : ""),
            type: parseIcon.value(_ctx.nextIcon).type,
            url: parseIcon.value(_ctx.nextIcon).url,
            size: parseIcon.value(_ctx.nextIcon).size,
            spin: parseIcon.value(_ctx.nextIcon).spin,
            color: parseIcon.value(_ctx.nextIcon).color
          }, null, 8, ["class", "type", "url", "size", "spin", "color"])) : createCommentVNode("", true)
        ], 14, _hoisted_10)) : createCommentVNode("", true),
        _ctx.lastText || parseIcon.value(_ctx.lastIcon).type || parseIcon.value(_ctx.lastIcon).url ? (openBlock(), createElementBlock("div", {
          key: 3,
          disabled: _ctx.modelValue == _ctx.total || null,
          onClick: pageLast,
          class: normalizeClass(["mvi-page-last", { active: _ctx.active && _ctx.modelValue != _ctx.total }]),
          style: normalizeStyle(lastStyle.value)
        }, [
          _ctx.lastText ? (openBlock(), createElementBlock("span", {
            key: 0,
            textContent: toDisplayString(_ctx.lastText)
          }, null, 8, _hoisted_13)) : createCommentVNode("", true),
          parseIcon.value(_ctx.lastIcon).type || parseIcon.value(_ctx.lastIcon).url ? (openBlock(), createBlock(unref(Icon), {
            key: 1,
            class: normalizeClass({ "margin-left": !!_ctx.lastText }),
            type: parseIcon.value(_ctx.lastIcon).type,
            url: parseIcon.value(_ctx.lastIcon).url,
            size: parseIcon.value(_ctx.lastIcon).size,
            spin: parseIcon.value(_ctx.lastIcon).spin,
            color: parseIcon.value(_ctx.lastIcon).color
          }, null, 8, ["class", "type", "url", "size", "spin", "color"])) : createCommentVNode("", true)
        ], 14, _hoisted_12)) : createCommentVNode("", true)
      ], 512);
    };
  }
});
const Page = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-22767315"]]);
Page.install = (app) => {
  app.component(Page.name, Page);
};
const SearchProps = {
  //输入框的值
  modelValue: {
    type: [String, Number],
    default: ""
  },
  //输入框类型
  type: {
    type: String,
    default: "text"
  },
  //输入框占位符
  placeholder: {
    type: String,
    default: ""
  },
  //搜索框左侧文本
  label: {
    type: String,
    default: null
  },
  //搜索框是否圆形
  round: {
    type: Boolean,
    default: false
  },
  //输入的最大长度
  maxlength: {
    type: Number,
    default: -1
  },
  //是否自动聚焦
  autofocus: {
    type: Boolean,
    default: false
  },
  //是否在输入框右侧显示取消按钮
  showCancel: {
    type: Boolean,
    default: false
  },
  //取消按钮文字
  cancelText: {
    type: String,
    default: "取消"
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //是否只读
  readonly: {
    type: Boolean,
    default: false
  },
  //输入框内容对齐方式
  align: {
    type: String,
    default: "left",
    validator(value) {
      return ["left", "center", "right"].includes(value);
    }
  },
  //左侧图标
  leftIcon: {
    type: [String, Object],
    default: null
  },
  //右侧图标
  rightIcon: {
    type: [String, Object],
    default: null
  },
  //使用清除图标
  clearable: {
    type: Boolean,
    default: false
  },
  //输入框调起移动端键盘类型
  inputMode: {
    type: String,
    default: "text",
    validator(value) {
      return ["none", "text", "decimal", "numeric", "tel", "search", "email", "url"].includes(value);
    }
  }
};
const _hoisted_1$f = ["disabled"];
const _hoisted_2$d = ["textContent"];
const _hoisted_3$c = ["type", "placeholder", "maxlength", "autofocus", "disabled", "readonly", "inputmode"];
const _hoisted_4$8 = ["textContent"];
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-search"
  },
  __name: "search",
  props: SearchProps,
  emits: ["update:modelValue", "search", "cancel", "left-click", "right-click", "focus", "blur", "input", "clear", "keydown", "keyup"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const focus = ref(false);
    const inputRef = ref(null);
    const realValue = computed({
      set(value) {
        if (props.modelValue !== value) {
          emits("update:modelValue", value);
        }
      },
      get() {
        let value = props.modelValue === null ? "" : props.modelValue.toString();
        if (props.type == "number") {
          value = value.replace(/\D/g, "");
        }
        if (props.maxlength > 0 && value.length > props.maxlength) {
          value = value.substring(0, props.maxlength);
        }
        if (props.modelValue !== value) {
          emits("update:modelValue", value);
        }
        return value;
      }
    });
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const showClear = computed(() => {
      if (props.disabled || props.readonly) {
        return false;
      }
      if (focus.value) {
        if (realValue.value === "") {
          return false;
        }
        return true;
      }
      return false;
    });
    const cmpType = computed(() => {
      if (props.type == "number") {
        return "text";
      }
      return props.type;
    });
    const inputStyle = computed(() => {
      let style = {};
      if (props.align) {
        style.textAlign = props.align;
      }
      if (parseIcon.value(props.leftIcon).type || parseIcon.value(props.leftIcon).url) {
        style.paddingLeft = 0;
      }
      if (props.clearable && showClear.value || parseIcon.value(props.rightIcon).type || parseIcon.value(props.rightIcon).url) {
        style.paddingRight = 0;
      }
      return style;
    });
    const keydown = (e) => {
      if (props.disabled) {
        return;
      }
      emits("keydown", e, realValue.value);
    };
    const keyup = (e) => {
      if (props.disabled) {
        return;
      }
      emits("keyup", e, realValue.value);
    };
    const inputFocus = () => {
      if (props.disabled) {
        return;
      }
      focus.value = true;
      emits("focus", realValue.value);
    };
    const inputBlur = () => {
      if (props.disabled) {
        return;
      }
      setTimeout(() => {
        focus.value = false;
        emits("blur", realValue.value);
      }, 200);
    };
    const searchInput = () => {
      if (props.disabled) {
        return;
      }
      emits("input", realValue.value);
    };
    const doSearch = () => {
      if (props.disabled) {
        return;
      }
      emits("search", realValue.value);
    };
    const doCancel = () => {
      if (props.disabled) {
        return;
      }
      emits("cancel", realValue.value);
    };
    const leftClick = () => {
      if (props.disabled) {
        return;
      }
      emits("left-click", realValue.value);
    };
    const rightClick = () => {
      if (props.disabled) {
        return;
      }
      emits("right-click", realValue.value);
    };
    const clearInput = () => {
      if (props.disabled) {
        return;
      }
      if (!props.clearable) {
        return;
      }
      setTimeout(() => {
        realValue.value = "";
        inputRef.value.focus();
        emits("clear", realValue.value);
      }, 210);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "mvi-search",
        disabled: _ctx.disabled || null
      }, [
        _ctx.label ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "mvi-search-label",
          textContent: toDisplayString(_ctx.label)
        }, null, 8, _hoisted_2$d)) : createCommentVNode("", true),
        createElementVNode("div", {
          class: normalizeClass(["mvi-search-input-container", { round: _ctx.round }])
        }, [
          parseIcon.value(_ctx.leftIcon).type || parseIcon.value(_ctx.leftIcon).url ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "mvi-search-left-icon",
            onClick: leftClick
          }, [
            createVNode(unref(Icon), {
              type: parseIcon.value(_ctx.leftIcon).type,
              url: parseIcon.value(_ctx.leftIcon).url,
              spin: parseIcon.value(_ctx.leftIcon).spin,
              size: parseIcon.value(_ctx.leftIcon).size,
              color: parseIcon.value(_ctx.leftIcon).color
            }, null, 8, ["type", "url", "spin", "size", "color"])
          ])) : createCommentVNode("", true),
          withDirectives(createElementVNode("input", {
            ref_key: "inputRef",
            ref: inputRef,
            class: normalizeClass(["mvi-search-input", { "left-none-radius": parseIcon.value(_ctx.leftIcon).type || parseIcon.value(_ctx.leftIcon).url, "right-none-radius": parseIcon.value(_ctx.rightIcon).type || parseIcon.value(_ctx.rightIcon).url || _ctx.clearable && showClear.value }]),
            type: cmpType.value,
            onKeypress: withKeys(doSearch, ["enter"]),
            autocomplete: "off",
            placeholder: _ctx.placeholder,
            maxlength: _ctx.maxlength,
            autofocus: _ctx.autofocus,
            disabled: _ctx.disabled,
            readonly: _ctx.readonly,
            inputmode: _ctx.inputMode,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => realValue.value = $event),
            onInput: searchInput,
            onFocus: inputFocus,
            onBlur: inputBlur,
            onKeydown: keydown,
            onKeyup: keyup,
            style: normalizeStyle(inputStyle.value)
          }, null, 46, _hoisted_3$c), [
            [vModelDynamic, realValue.value]
          ]),
          _ctx.clearable ? withDirectives((openBlock(), createElementBlock("div", {
            key: 1,
            class: "mvi-search-clear",
            onClick: clearInput
          }, [
            createVNode(unref(Icon), { type: "times-o" })
          ], 512)), [
            [vShow, showClear.value]
          ]) : createCommentVNode("", true),
          parseIcon.value(_ctx.rightIcon).type || parseIcon.value(_ctx.rightIcon).url ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: "mvi-search-right-icon",
            onClick: rightClick
          }, [
            createVNode(unref(Icon), {
              type: parseIcon.value(_ctx.rightIcon).type,
              url: parseIcon.value(_ctx.rightIcon).url,
              spin: parseIcon.value(_ctx.rightIcon).spin,
              size: parseIcon.value(_ctx.rightIcon).size,
              color: parseIcon.value(_ctx.rightIcon).color
            }, null, 8, ["type", "url", "spin", "size", "color"])
          ])) : createCommentVNode("", true)
        ], 2),
        _ctx.showCancel ? (openBlock(), createElementBlock("div", {
          key: 1,
          textContent: toDisplayString(_ctx.cancelText),
          class: "mvi-search-cancel",
          onClick: doCancel
        }, null, 8, _hoisted_4$8)) : createCommentVNode("", true)
      ], 8, _hoisted_1$f);
    };
  }
});
const Search = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-e9f24fe5"]]);
Search.install = (app) => {
  app.component(Search.name, Search);
};
const SelectProps = {
  //选择的值
  modelValue: {
    type: [Object, Number, String, Array],
    default: null
  },
  //选项
  options: {
    type: Array,
    default: []
  },
  //占位符
  placeholder: {
    type: String,
    default: ""
  },
  //尺寸
  size: {
    type: String,
    default: "medium",
    validator(value) {
      return ["small", "medium", "large"].includes(value);
    }
  },
  //layer组件参数
  layerProps: {
    type: Object,
    default: function() {
      return {};
    }
  },
  //下拉框最大高度
  height: {
    type: String,
    default: null
  },
  //输入框激活样式
  activeType: {
    type: String,
    default: "info",
    validator(value) {
      return ["info", "success", "warn", "primary", "error"].includes(value);
    }
  },
  //输入框激活颜色
  activeColor: {
    type: String,
    default: null,
    validator(value) {
      return obj.common.matchingText(value, "hex");
    }
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //下拉图标
  icon: {
    type: String,
    default: "caret-down"
  },
  //原生name属性
  name: {
    type: String,
    default: null
  },
  //是否圆角
  round: {
    type: Boolean,
    default: false
  },
  //是否方形
  square: {
    type: Boolean,
    default: false
  },
  //是否多选
  multiple: {
    type: Boolean,
    default: false
  },
  //选择时显示内容的过滤方法
  filterMethod: {
    type: Function,
    default: null
  },
  //是否展示已选择标识
  showSelected: {
    type: Boolean,
    default: true
  },
  //已选择标识的icon
  selectedIcon: {
    type: [String, Object],
    default: "success"
  },
  //显示清除图标
  clearable: {
    type: Boolean,
    default: false
  },
  //选项字段配置
  props: {
    type: Object,
    default: function() {
      return {
        label: "label",
        value: "value"
      };
    }
  },
  //无选项提示文字
  emptyText: {
    type: String,
    default: "暂无数据"
  }
};
const _hoisted_1$e = ["data-id", "disabled"];
const _hoisted_2$c = ["data-placeholder", "innerHTML"];
const _hoisted_3$b = ["value", "name"];
const _hoisted_4$7 = ["onClick", "disabled"];
const _hoisted_5$4 = ["innerHTML"];
const _hoisted_6$4 = {
  key: 1,
  class: "mvi-select-empty"
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-select",
    inheritAttrs: false
  },
  __name: "select",
  props: SelectProps,
  emits: ["update:modelValue", "change", "clear"],
  setup(__props, { emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const hover = ref(false);
    const focus = ref(false);
    const relateRef = ref(null);
    const menuRef = ref(null);
    const formData = computed(() => {
      if (props.multiple && Array.isArray(props.modelValue)) {
        return props.modelValue.join(",");
      }
      return props.modelValue;
    });
    const relateClass = computed(() => {
      let cls = [props.size];
      if (props.round) {
        cls.push("round");
      } else if (props.square) {
        cls.push("square");
      }
      if (props.activeType && !props.activeColor && focus.value) {
        cls.push(props.activeType);
      }
      return cls;
    });
    const relateStyle = computed(() => {
      let style = {};
      if (props.activeColor && focus.value) {
        style.borderColor = props.activeColor;
        const rgb = obj.color.hex2rgb(props.activeColor);
        style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
      }
      return style;
    });
    const cmpOptions = computed(() => {
      let options = [];
      props.options.forEach((opt) => {
        let item = {};
        if (obj.common.isObject(opt)) {
          item.label = opt[props.props.label];
          item.value = opt[props.props.value];
          item.disabled = !!opt.disabled;
        } else {
          item.label = opt;
          item.value = opt;
          item.disabled = false;
        }
        options.push(item);
      });
      return options;
    });
    const selectLabel = computed(() => {
      if (props.multiple) {
        let labels = [];
        cmpOptions.value.forEach((item) => {
          if (Array.isArray(props.modelValue)) {
            let flag = props.modelValue.some((i) => {
              return obj.common.equal(i, item.value);
            });
            if (flag) {
              labels.push(item.label);
            }
          }
        });
        if (typeof props.filterMethod == "function") {
          return props.filterMethod(labels);
        }
        return labels.join(" ");
      }
      let label = "";
      cmpOptions.value.forEach((item) => {
        if (obj.common.equal(props.modelValue, item.value)) {
          label = item.label;
        }
      });
      if (typeof props.filterMethod == "function") {
        return props.filterMethod(label);
      }
      return label;
    });
    const isSelect = computed(() => {
      return (item) => {
        if (props.multiple) {
          let flag = props.modelValue.some((i) => {
            return obj.common.equal(i, item.value);
          });
          return props.showSelected && flag;
        }
        return false;
      };
    });
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const showClearIcon = computed(() => {
      if (props.disabled) {
        return false;
      }
      if (props.multiple) {
        if (props.modelValue.length != 0 && hover.value) {
          return true;
        }
        return false;
      } else {
        if (props.modelValue === "" || props.modelValue === null || props.modelValue === void 0 || !hover.value) {
          return false;
        }
        return true;
      }
    });
    const layerRealProps = computed(() => {
      return {
        placement: props.layerProps.placement ? props.layerProps.placement : "bottom-start",
        width: props.layerProps.width,
        zIndex: obj.number.isNumber(props.layerProps.zIndex) ? props.layerProps.zIndex : 400,
        offset: props.layerProps.offset ? props.layerProps.offset : "0.1rem",
        animation: props.layerProps.animation,
        timeout: obj.number.isNumber(props.layerProps.timeout) ? props.layerProps.timeout : 200,
        showTriangle: typeof props.layerProps.showTriangle == "boolean" ? props.layerProps.showTriangle : false,
        shadow: typeof props.layerProps.shadow == "boolean" ? props.layerProps.shadow : true,
        border: typeof props.layerProps.border == "boolean" ? props.layerProps.border : false,
        borderColor: props.layerProps.borderColor
      };
    });
    const doClear = (e) => {
      e.stopPropagation();
      if (props.disabled) {
        return;
      }
      if (!props.clearable) {
        return;
      }
      if (focus.value) {
        focus.value = false;
      }
      if (props.multiple) {
        emits("update:modelValue", []);
        emits("clear", []);
      } else {
        emits("update:modelValue", null);
        emits("clear", null);
      }
    };
    const layerShow = () => {
      if (!layerRealProps.value.width) {
        menuRef.value.style.width = relateRef.value.offsetWidth + "px";
      }
    };
    const trigger = () => {
      if (props.disabled) {
        return;
      }
      focus.value = !focus.value;
    };
    const optionClick = (item) => {
      if (props.disabled || item.disabled) {
        return;
      }
      if (props.multiple) {
        let arr = props.modelValue;
        if (!Array.isArray(arr)) {
          throw new TypeError("modelValue should be an array");
        }
        let flag = arr.some((tmp) => {
          return obj.common.equal(tmp, item.value);
        });
        if (flag) {
          arr = arr.filter((tmp) => {
            return !obj.common.equal(tmp, item.value);
          });
        } else {
          arr.push(item.value);
        }
        emits("update:modelValue", arr);
        emits(
          "change",
          cmpOptions.value.filter((tmp) => {
            return arr.some((tmp2) => {
              return obj.common.equal(tmp.value, tmp2);
            });
          })
        );
      } else {
        emits("update:modelValue", item.value);
        emits("change", item);
        trigger();
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("div", mergeProps({
          class: ["mvi-select", relateClass.value],
          "data-id": "mvi-select-" + unref(instance).uid,
          style: relateStyle.value,
          ref_key: "relateRef",
          ref: relateRef,
          onMouseenter: _cache[0] || (_cache[0] = ($event) => hover.value = true),
          onMouseleave: _cache[1] || (_cache[1] = ($event) => hover.value = false),
          onClick: trigger,
          disabled: _ctx.disabled || null
        }, _ctx.$attrs), [
          createElementVNode("span", {
            class: normalizeClass(["mvi-select-label", { placeholder: !selectLabel.value }]),
            "data-placeholder": _ctx.placeholder,
            innerHTML: selectLabel.value
          }, null, 10, _hoisted_2$c),
          _ctx.clearable ? withDirectives((openBlock(), createBlock(unref(Icon), {
            key: 0,
            onClick: doClear,
            class: "mvi-clear-icon",
            type: "times-o"
          }, null, 512)), [
            [vShow, showClearIcon.value]
          ]) : createCommentVNode("", true),
          withDirectives(createVNode(unref(Icon), {
            class: normalizeClass(["mvi-select-icon", { active: focus.value }]),
            type: _ctx.icon
          }, null, 8, ["class", "type"]), [
            [vShow, !_ctx.clearable || !showClearIcon.value]
          ]),
          createElementVNode("input", {
            type: "hidden",
            value: formData.value,
            name: _ctx.name
          }, null, 8, _hoisted_3$b)
        ], 16, _hoisted_1$e),
        createVNode(unref(Layer), {
          modelValue: focus.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => focus.value = $event),
          relate: `[data-id='mvi-select-${unref(instance).uid}']`,
          placement: layerRealProps.value.placement,
          offset: layerRealProps.value.offset,
          "z-index": layerRealProps.value.zIndex,
          closable: "",
          "show-triangle": layerRealProps.value.showTriangle,
          animation: layerRealProps.value.animation,
          timeout: layerRealProps.value.timeout,
          shadow: layerRealProps.value.shadow,
          border: layerRealProps.value.border,
          "border-color": layerRealProps.value.borderColor,
          width: layerRealProps.value.width,
          onShowing: layerShow
        }, {
          default: withCtx(() => [
            createElementVNode("div", {
              class: normalizeClass(["mvi-select-menu", [_ctx.size]]),
              ref_key: "menuRef",
              ref: menuRef,
              style: normalizeStyle({ maxHeight: _ctx.height })
            }, [
              cmpOptions.value.length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(cmpOptions.value, (item) => {
                return openBlock(), createElementBlock("div", {
                  class: "mvi-select-option",
                  onClick: ($event) => optionClick(item),
                  disabled: item.disabled || null
                }, [
                  createElementVNode("div", {
                    class: "mvi-select-option-value",
                    innerHTML: item.label
                  }, null, 8, _hoisted_5$4),
                  isSelect.value(item) ? (openBlock(), createBlock(unref(Icon), {
                    key: 0,
                    type: parseIcon.value(_ctx.selectedIcon).type,
                    spin: parseIcon.value(_ctx.selectedIcon).spin,
                    size: parseIcon.value(_ctx.selectedIcon).size,
                    url: parseIcon.value(_ctx.selectedIcon).url,
                    color: parseIcon.value(_ctx.selectedIcon).color
                  }, null, 8, ["type", "spin", "size", "url", "color"])) : createCommentVNode("", true)
                ], 8, _hoisted_4$7);
              }), 256)) : (openBlock(), createElementBlock("div", _hoisted_6$4, toDisplayString(_ctx.emptyText), 1))
            ], 6)
          ]),
          _: 1
        }, 8, ["modelValue", "relate", "placement", "offset", "z-index", "show-triangle", "animation", "timeout", "shadow", "border", "border-color", "width"])
      ], 64);
    };
  }
});
const Select = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-46c68086"]]);
Select.install = (app) => {
  app.component(Select.name, Select);
};
const SkeletonProps = {
  //是否加载状态
  loading: {
    type: Boolean,
    default: true
  },
  //行数
  rows: {
    type: Number,
    default: 1,
    validator(value) {
      return value > 0;
    }
  },
  //每行宽度
  rowWidth: {
    type: [String, Array],
    default: null
  },
  //是否显示头像占位
  avatar: {
    type: Boolean,
    default: false
  },
  //是否显示标题占位
  title: {
    type: Boolean,
    default: false
  },
  //标题占位宽度
  titleWidth: {
    type: String,
    default: null
  },
  //是否显示动画效果
  animation: {
    type: Boolean,
    default: false
  },
  //标题段落是否展示圆角
  round: {
    type: Boolean,
    default: false
  },
  //头像占位大小
  avatarSize: {
    type: String,
    default: null
  },
  //头像占位是否展示圆角
  avatarRound: {
    type: Boolean,
    default: false
  }
};
const _hoisted_1$d = { class: "mvi-skeleton-container" };
const _hoisted_2$b = {
  key: 0,
  class: "mvi-skeleton-avatar"
};
const _hoisted_3$a = { class: "mvi-skeleton-rows" };
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-skeleton"
  },
  __name: "skeleton",
  props: SkeletonProps,
  setup(__props) {
    const props = __props;
    const rowStyle = computed(() => {
      return (index) => {
        let style = {};
        if (props.rowWidth && typeof props.rowWidth == "string") {
          style.width = props.rowWidth;
        } else if (Array.isArray(props.rowWidth)) {
          style.width = props.rowWidth[index] || "";
        }
        return style;
      };
    });
    const rowsArray = computed(() => {
      let arr = [];
      for (let i = 0; i < props.rows; i++) {
        arr.push(i);
      }
      return arr;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$d, [
        _ctx.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["mvi-skeleton", { animation: _ctx.animation }])
        }, [
          _ctx.avatar ? (openBlock(), createElementBlock("div", _hoisted_2$b, [
            createElementVNode("div", {
              class: normalizeClass(["mvi-skeleton-avatar-el", { round: _ctx.avatarRound }]),
              style: normalizeStyle({ width: _ctx.avatarSize || "", height: _ctx.avatarSize || "" })
            }, null, 6)
          ])) : createCommentVNode("", true),
          createElementVNode("div", _hoisted_3$a, [
            _ctx.title ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["mvi-skeleton-title", { round: _ctx.round }]),
              style: normalizeStyle({ width: _ctx.titleWidth || "" })
            }, null, 6)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(rowsArray.value, (item) => {
              return openBlock(), createElementBlock("div", {
                style: normalizeStyle(rowStyle.value(item)),
                class: normalizeClass(["mvi-skeleton-row", { round: _ctx.round }])
              }, null, 6);
            }), 256))
          ])
        ], 2)) : renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true)
      ]);
    };
  }
});
const Skeleton = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-616c2ea9"]]);
Skeleton.install = (app) => {
  app.component(Skeleton.name, Skeleton);
};
const StepsProps = {
  //当前步骤
  active: {
    type: Number,
    default: 0
  },
  //是否垂直
  vertical: {
    type: Boolean,
    default: false
  },
  //激活状态的颜色
  activeColor: {
    type: String,
    default: null
  },
  //未激活状态的颜色
  inactiveColor: {
    type: String,
    default: null
  },
  //激活状态的图标
  activeIcon: {
    type: [String, Object],
    default: "success-o"
  },
  //未激活状态的图标
  inactiveIcon: {
    type: [String, Object],
    default: null
  }
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-steps"
  },
  __name: "steps",
  props: StepsProps,
  setup(__props) {
    const instance = getCurrentInstance();
    componentIsMatch(instance, "m-step", ["Steps", "Step"]);
    const children = ref([]);
    provide("steps", instance);
    provide("stepChildren", children);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-steps", { vertical: _ctx.vertical }])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2);
    };
  }
});
const Steps = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-31eee5e0"]]);
Steps.install = (app) => {
  app.component(Steps.name, Steps);
};
const _hoisted_1$c = { class: "mvi-step-vertical-container" };
const _hoisted_2$a = { class: "mvi-step-vertical-icon" };
const _hoisted_3$9 = { class: "mvi-step-container" };
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-step"
  },
  __name: "step",
  setup(__props) {
    const instance = getCurrentInstance();
    const steps = inject("steps", null);
    const stepChildren = inject("stepChildren", null);
    parentIsMatch(stepChildren, steps, "m-steps", ["Steps", "Step"]);
    stepChildren.value.push(instance);
    const elRef = ref(null);
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const stepIndex = computed(() => {
      return stepChildren.value.findIndex((vm) => {
        return obj.common.equal(vm.uid, instance.uid);
      });
    });
    const labelStyle = computed(() => {
      let style = {};
      if (steps.props.activeColor) {
        if (steps.props.active == stepIndex.value) {
          style.color = steps.props.activeColor;
        }
      }
      if (steps.props.inactiveColor) {
        if (steps.props.active != stepIndex.value) {
          style.color = steps.props.inactiveColor;
        }
      }
      return style;
    });
    const activeIconStyle = computed(() => {
      let style = {};
      if (steps.props.activeColor) {
        if (steps.props.active == stepIndex.value) {
          style.color = steps.props.activeColor;
        }
      }
      return style;
    });
    const inactiveIconStyle = computed(() => {
      let style = {};
      if (steps.props.inactiveColor) {
        if (stepIndex.value > steps.props.active) {
          style.color = steps.props.inactiveColor;
        }
      }
      if (steps.props.activeColor) {
        if (stepIndex.value <= steps.props.active) {
          style.color = steps.props.activeColor;
        }
      }
      return style;
    });
    const circleStyle = computed(() => {
      let style = {};
      if (stepIndex.value <= steps.props.active) {
        if (steps.props.activeColor) {
          style.backgroundColor = steps.props.activeColor;
        }
      } else {
        if (steps.props.inactiveColor) {
          style.backgroundColor = steps.props.inactiveColor;
        }
      }
      return style;
    });
    const activeCircleStyle = computed(() => {
      let style = {};
      if (steps.props.activeColor) {
        if (steps.props.active == stepIndex.value) {
          style.backgroundColor = steps.props.activeColor;
        }
      }
      return style;
    });
    const lineStyle = computed(() => {
      let style = {};
      if (steps.props.activeColor) {
        if (stepIndex.value < steps.props.active) {
          if (steps.props.vertical) {
            style.borderRightColor = steps.props.activeColor;
          } else {
            style.borderTopColor = steps.props.activeColor;
          }
        }
      }
      if (steps.props.inactiveColor) {
        if (stepIndex.value >= steps.props.active) {
          if (steps.props.vertical) {
            style.borderRightColor = steps.props.inactiveColor;
          } else {
            style.borderTopColor = steps.props.inactiveColor;
          }
        }
      }
      return style;
    });
    const stepIconStyle = computed(() => {
      let style = {};
      if (elRef.value) {
        style.backgroundColor = obj.element.getCssStyle(steps.proxy.$el, "background-color");
      }
      return style;
    });
    onBeforeUnmount(() => {
      stepChildren.value.splice(stepIndex.value, 1);
    });
    return (_ctx, _cache) => {
      return unref(steps).props.vertical ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "mvi-step-vertical",
        ref_key: "elRef",
        ref: elRef
      }, [
        createElementVNode("div", {
          class: normalizeClass(["mvi-step-vertical-label", { finish: stepIndex.value == unref(steps).props.active }]),
          style: normalizeStyle(labelStyle.value)
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 6),
        createElementVNode("div", _hoisted_1$c, [
          createElementVNode("div", _hoisted_2$a, [
            unref(steps).props.active == stepIndex.value && (parseIcon.value(unref(steps).props.activeIcon).type || parseIcon.value(unref(steps).props.activeIcon).url) ? (openBlock(), createBlock(unref(Icon), {
              key: 0,
              class: "mvi-step-icon-active-el",
              type: parseIcon.value(unref(steps).props.activeIcon).type,
              url: parseIcon.value(unref(steps).props.activeIcon).url,
              spin: parseIcon.value(unref(steps).props.activeIcon).spin,
              size: parseIcon.value(unref(steps).props.activeIcon).size,
              color: parseIcon.value(unref(steps).props.activeIcon).color,
              style: normalizeStyle(activeIconStyle.value)
            }, null, 8, ["type", "url", "spin", "size", "color", "style"])) : unref(steps).props.active == stepIndex.value ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: "mvi-step-circle-active",
              style: normalizeStyle(activeCircleStyle.value)
            }, null, 4)) : parseIcon.value(unref(steps).props.inactiveIcon).type || parseIcon.value(unref(steps).props.inactiveIcon).url ? (openBlock(), createBlock(unref(Icon), {
              key: 2,
              class: normalizeClass(["mvi-step-icon-inactive-el", stepIndex.value <= unref(steps).props.active ? "finish" : ""]),
              type: parseIcon.value(unref(steps).props.inactiveIcon).type,
              url: parseIcon.value(unref(steps).props.inactiveIcon).url,
              spin: parseIcon.value(unref(steps).props.inactiveIcon).spin,
              size: parseIcon.value(unref(steps).props.inactiveIcon).size,
              color: parseIcon.value(unref(steps).props.inactiveIcon).color,
              style: normalizeStyle(inactiveIconStyle.value)
            }, null, 8, ["class", "type", "url", "spin", "size", "color", "style"])) : (openBlock(), createElementBlock("div", {
              key: 3,
              class: normalizeClass(["mvi-step-circle", { finish: stepIndex.value <= unref(steps).props.active }]),
              style: normalizeStyle(circleStyle.value)
            }, null, 6))
          ]),
          createElementVNode("div", {
            class: normalizeClass(["mvi-step-vertical-line", { last: stepIndex.value == unref(stepChildren).length - 1, finish: stepIndex.value < unref(steps).props.active }]),
            style: normalizeStyle(lineStyle.value)
          }, null, 6)
        ])
      ], 512)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(["mvi-step", { last: stepIndex.value == unref(stepChildren).length - 1 }]),
        ref_key: "elRef",
        ref: elRef
      }, [
        createElementVNode("div", {
          class: normalizeClass(["mvi-step-label", { last: stepIndex.value == unref(stepChildren).length - 1, first: stepIndex.value == 0, finish: stepIndex.value == unref(steps).props.active }]),
          style: normalizeStyle(labelStyle.value)
        }, [
          createElementVNode("div", null, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])
        ], 6),
        createElementVNode("div", _hoisted_3$9, [
          createElementVNode("div", {
            class: normalizeClass(["mvi-step-icon", { last: stepIndex.value == unref(stepChildren).length - 1 }]),
            style: normalizeStyle(stepIconStyle.value)
          }, [
            unref(steps).props.active == stepIndex.value && (parseIcon.value(unref(steps).props.activeIcon).type || parseIcon.value(unref(steps).props.activeIcon).url) ? (openBlock(), createBlock(unref(Icon), {
              key: 0,
              class: "mvi-step-icon-active-el",
              type: parseIcon.value(unref(steps).props.activeIcon).type,
              url: parseIcon.value(unref(steps).props.activeIcon).url,
              spin: parseIcon.value(unref(steps).props.activeIcon).spin,
              size: parseIcon.value(unref(steps).props.activeIcon).size,
              color: parseIcon.value(unref(steps).props.activeIcon).color,
              style: normalizeStyle(activeIconStyle.value)
            }, null, 8, ["type", "url", "spin", "size", "color", "style"])) : unref(steps).props.active == stepIndex.value ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: "mvi-step-circle-active",
              style: normalizeStyle(activeCircleStyle.value)
            }, null, 4)) : parseIcon.value(unref(steps).props.inactiveIcon).type || parseIcon.value(unref(steps).props.inactiveIcon).url ? (openBlock(), createBlock(unref(Icon), {
              key: 2,
              class: normalizeClass(["mvi-step-icon-inactive-el", { finish: stepIndex.value <= unref(steps).props.active }]),
              type: parseIcon.value(unref(steps).props.inactiveIcon).type,
              url: parseIcon.value(unref(steps).props.inactiveIcon).url,
              spin: parseIcon.value(unref(steps).props.inactiveIcon).spin,
              size: parseIcon.value(unref(steps).props.inactiveIcon).size,
              color: parseIcon.value(unref(steps).props.inactiveIcon).color,
              style: normalizeStyle(inactiveIconStyle.value)
            }, null, 8, ["class", "type", "url", "spin", "size", "color", "style"])) : (openBlock(), createElementBlock("div", {
              key: 3,
              class: normalizeClass(["mvi-step-circle", { finish: stepIndex.value <= unref(steps).props.active }]),
              style: normalizeStyle(circleStyle.value)
            }, null, 6))
          ], 6),
          createElementVNode("div", {
            class: normalizeClass(["mvi-step-line", { last: stepIndex.value == unref(stepChildren).length - 1, finish: stepIndex.value < unref(steps).props.active }]),
            style: normalizeStyle(lineStyle.value)
          }, null, 6)
        ])
      ], 2));
    };
  }
});
const Step = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-6cdfb039"]]);
Step.install = (app) => {
  app.component(Step.name, Step);
};
const StepperProps = {
  //输入框的值
  modelValue: {
    type: Number,
    default: 0
  },
  //步进
  step: {
    type: Number,
    default: 1
  },
  //尺寸
  size: {
    type: String,
    default: "medium",
    validator(value) {
      return ["small", "medium", "large"].includes(value);
    }
  },
  //最小值
  min: {
    type: Number,
    default: null
  },
  //最大值
  max: {
    type: Number,
    default: null
  },
  //显示小数位数
  digit: {
    type: Number,
    default: 0
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //是否禁用加号
  disabledPlus: {
    type: Boolean,
    default: false
  },
  //是否禁用减号
  disabledMinus: {
    type: Boolean,
    default: false
  },
  //是否禁用输入框
  disabledInput: {
    type: Boolean,
    default: false
  },
  //是否显示加号
  showPlus: {
    type: Boolean,
    default: true
  },
  //是否显示减号
  showMinus: {
    type: Boolean,
    default: true
  },
  //是否显示输入框
  showInput: {
    type: Boolean,
    default: true
  },
  //输入框宽度
  inputWidth: {
    type: String,
    default: null
  },
  //是否显示点击态
  active: {
    type: Boolean,
    default: true
  },
  //输入框数字对齐方式
  inputAlign: {
    type: String,
    default: "center",
    validator(value) {
      return ["left", "center", "right"].includes(value);
    }
  },
  //是否显示边框
  border: {
    type: Boolean,
    default: false
  }
};
const _hoisted_1$b = ["disabled"];
const _hoisted_2$9 = ["disabled"];
const _hoisted_3$8 = ["disabled"];
const _hoisted_4$6 = ["disabled"];
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-stepper"
  },
  __name: "stepper",
  props: StepperProps,
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const inputRef = ref(null);
    const realValue = computed({
      set(value) {
        let val = updateValue(value);
        if (props.modelValue !== val) {
          emits("update:modelValue", val);
          emits("change", val);
        }
      },
      get() {
        return props.modelValue;
      }
    });
    const arrivalMin = computed(() => {
      if (props.min != null) {
        return realValue.value <= props.min;
      }
      return false;
    });
    const arrivalMax = computed(() => {
      if (props.max != null) {
        return realValue.value >= props.max;
      }
      return false;
    });
    const minusClass = computed(() => {
      let cls = [];
      if (!(props.disabledMinus || arrivalMin.value || props.disabled) && props.active) {
        cls.push("active");
      }
      if (props.border) {
        cls.push("border");
      }
      return cls;
    });
    const plusClass = computed(() => {
      let cls = [];
      if (!(props.disabledPlus || arrivalMax.value || props.disabled) && props.active) {
        cls.push("active");
      }
      if (props.border) {
        cls.push("border");
      }
      return cls;
    });
    const updateValue = (value) => {
      let val = parseFloat(value);
      if (isNaN(val)) {
        val = 0;
      }
      val = Number(val.toFixed(props.digit));
      if (val <= props.min && props.min != null) {
        val = props.min;
      }
      if (val >= props.max && props.max != null) {
        val = props.max;
      }
      return val;
    };
    const doMinus = () => {
      if (props.disabled) {
        return;
      }
      if (props.disabledMinus) {
        return;
      }
      if (arrivalMin.value) {
        return;
      }
      realValue.value = obj.number.subtract(realValue.value, props.step);
    };
    const doPlus = () => {
      if (props.disabled) {
        return;
      }
      if (props.disabledPlus) {
        return;
      }
      if (arrivalMax.value) {
        return;
      }
      realValue.value = obj.number.add(realValue.value, props.step);
    };
    const changeValue = () => {
      if (props.disabled) {
        return;
      }
      if (props.disabledInput) {
        return;
      }
      inputRef.value.value = "" + realValue.value;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-stepper", [_ctx.size]])
      }, [
        _ctx.showMinus ? (openBlock(), createElementBlock("div", {
          key: 0,
          disabled: _ctx.disabledMinus || arrivalMin.value || _ctx.disabled || null,
          class: normalizeClass(["mvi-stepper-minus", minusClass.value]),
          onClick: doMinus
        }, [
          createVNode(unref(Icon), { type: "minus" })
        ], 10, _hoisted_1$b)) : createCommentVNode("", true),
        _ctx.showInput ? (openBlock(), createElementBlock("div", {
          key: 1,
          disabled: _ctx.disabled || _ctx.disabledInput || null,
          class: normalizeClass(["mvi-stepper-input", { border: _ctx.border }]),
          style: normalizeStyle({ width: _ctx.inputWidth || "" })
        }, [
          withDirectives(createElementVNode("input", {
            ref_key: "inputRef",
            ref: inputRef,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => realValue.value = $event),
            disabled: _ctx.disabled || _ctx.disabledInput,
            type: "text",
            onBlur: changeValue,
            onKeyup: withKeys(changeValue, ["enter"]),
            style: normalizeStyle({ textAlign: _ctx.inputAlign }),
            inputmode: "numeric"
          }, null, 44, _hoisted_3$8), [
            [vModelText, realValue.value]
          ])
        ], 14, _hoisted_2$9)) : createCommentVNode("", true),
        _ctx.showPlus ? (openBlock(), createElementBlock("div", {
          key: 2,
          disabled: _ctx.disabledPlus || arrivalMax.value || _ctx.disabled || null,
          class: normalizeClass(["mvi-stepper-plus", plusClass.value]),
          onClick: doPlus
        }, [
          createVNode(unref(Icon), { type: "plus" })
        ], 10, _hoisted_4$6)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const Stepper = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-7394caba"]]);
Stepper.install = (app) => {
  app.component(Stepper.name, Stepper);
};
const NumberKeyboardProps = {
  //是否显示小数点
  showDecimal: {
    type: Boolean,
    default: true
  },
  //是否显示删除按钮
  showDelete: {
    type: Boolean,
    default: true
  },
  //是否显示完成按钮
  showComplete: {
    type: Boolean,
    default: true
  },
  //是否显示键盘
  show: {
    type: Boolean,
    default: false
  },
  //当前输入的值
  modelValue: {
    type: [String, Number],
    default: ""
  },
  //zIndex
  zIndex: {
    type: Number,
    default: 850
  },
  //动画时长
  timeout: {
    type: Number,
    default: 200
  },
  //点击背景是否可关闭
  closable: {
    type: Boolean,
    default: false
  },
  //输入值最大长度
  maxlength: {
    type: Number,
    default: -1
  },
  //删除按钮文字
  deleteText: {
    type: String,
    default: "删除"
  },
  //完成按钮文字
  completeText: {
    type: String,
    default: "完成"
  },
  //空值时完成按钮是否可点击
  promiseEmpty: {
    type: Boolean,
    default: false
  },
  //是否显示点击态
  active: {
    type: Boolean,
    default: true
  },
  //挂载元素
  mountEl: {
    type: String,
    default: null
  },
  //遮罩层颜色
  overlayColor: {
    type: String,
    default: "rgba(0,10,20,0.2)"
  },
  //是否考虑滚动条
  usePadding: {
    type: Boolean,
    default: false
  },
  //是否进行数字校准
  calibration: {
    type: Boolean,
    default: false
  },
  //是否为身份证输入键盘
  showX: {
    type: Boolean,
    default: false
  },
  //是否随即键盘
  random: {
    type: Boolean,
    default: false
  },
  //标题
  title: {
    type: String,
    default: null
  },
  //是否显示边框
  border: {
    type: Boolean,
    default: false
  }
};
const _hoisted_1$a = {
  key: 0,
  class: "mvi-number-keyboard-title"
};
const _hoisted_2$8 = { key: 1 };
const _hoisted_3$7 = { class: "mvi-number-keyboard-left" };
const _hoisted_4$5 = ["onClick"];
const _hoisted_5$3 = {
  key: 0,
  class: "mvi-number-keyboard-right"
};
const _hoisted_6$3 = ["disabled"];
const _hoisted_7$3 = ["textContent"];
const _hoisted_8$2 = ["disabled"];
const _hoisted_9 = ["textContent"];
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false,
    name: "m-number-keyboard"
  },
  __name: "number-keyboard",
  props: NumberKeyboardProps,
  emits: ["update:modelValue", "update:show", "input", "delete", "complete", "show", "showing", "shown", "hide", "hidding", "hidden"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const firstShow = ref(false);
    const keyboardShow = ref(false);
    const numbers = ref(["1", "2", "3", "4", "5", "6", "7", "8", "9", "X", ".", "0"]);
    const oldNumbers = ref([]);
    const overlayRef = ref(null);
    const keyboardRef = ref(null);
    const $$el = computed(() => {
      return overlayRef.value ? overlayRef.value.$$el : null;
    });
    const cmpShow = computed({
      set(value) {
        emits("update:show", value);
      },
      get() {
        return props.show;
      }
    });
    const cmpValue = computed({
      set(value) {
        emits("update:modelValue", value);
      },
      get() {
        if (obj.number.isNumber(props.modelValue)) {
          return props.modelValue.toString();
        }
        return props.modelValue;
      }
    });
    const boardStyle = computed(() => {
      return {
        transition: "all " + props.timeout + "ms",
        zIndex: props.zIndex + 10
      };
    });
    const deleteDisabeld = computed(() => {
      if (props.modelValue === "") {
        return true;
      }
      return false;
    });
    const completeDisabled = computed(() => {
      if (props.modelValue === "") {
        return true;
      }
      return false;
    });
    const cpmNumbers = computed(() => {
      let _numbers = numbers.value.filter((item) => {
        return showKeyBoard.value(item);
      });
      if (props.random) {
        if (props.show) {
          let arr = [];
          let length = _numbers.length;
          for (let i = 0; i < length; i++) {
            arr.push(getRandomNumber(arr));
          }
          oldNumbers.value = [...arr];
          return arr;
        }
        return oldNumbers.value;
      }
      return _numbers;
    });
    const leftNumberClass = computed(() => {
      return (_item, index) => {
        let cls = [];
        if (index == cpmNumbers.value.length - 1) {
          if (props.showX || props.showDecimal) {
            cls.push("half");
          } else {
            cls.push("full");
          }
        }
        if (props.border) {
          cls.push("border");
        }
        return cls;
      };
    });
    const showKeyBoard = computed(() => {
      return (item) => {
        if (item == "X") {
          return props.showX;
        }
        if (item == ".") {
          return props.showDecimal && !props.showX;
        }
        return true;
      };
    });
    const getRandomNumber = (arr) => {
      let _numbers = numbers.value.filter((item) => {
        return showKeyBoard.value(item);
      });
      let index = Math.floor(Math.random() * _numbers.length);
      if (arr.includes(_numbers[index])) {
        return getRandomNumber(arr);
      }
      return _numbers[index];
    };
    const overlayShow = () => {
      if (!firstShow.value) {
        firstShow.value = true;
      }
      keyboardShow.value = true;
    };
    const overlayHide = () => {
      keyboardShow.value = false;
    };
    const numberClick = (item) => {
      if (cmpValue.value.length >= props.maxlength && props.maxlength > 0) {
        return;
      }
      cmpValue.value += item;
      emits("input", item);
    };
    const deleteClick = () => {
      if (deleteDisabeld.value) {
        return;
      }
      let value = obj.string.delete(cmpValue.value, cmpValue.value.length - 1, 1);
      cmpValue.value = value;
      emits("delete", value);
    };
    const completeClick = () => {
      if (completeDisabled.value && !props.promiseEmpty) {
        return;
      }
      if (props.calibration) {
        cmpValue.value = parseFloat(cmpValue.value) + "" || "";
      }
      emits("complete", cmpValue.value);
      cmpShow.value = false;
    };
    const beforeEnter = (el) => {
      if (obj.data.get(el, "mvi-keyboard-beforeEnter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-keyboard-beforeEnter-trigger", true);
      emits("show", el);
      if (typeof instance.appContext.config.globalProperties.keyboardComponentWatch == "function") {
        instance.appContext.config.globalProperties.keyboardComponentWatch.apply(instance.proxy, ["show", el]);
      }
    };
    const enter = (el) => {
      if (obj.data.get(el, "mvi-keyboard-enter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-keyboard-enter-trigger", true);
      emits("showing", el);
      if (typeof instance.appContext.config.globalProperties.keyboardComponentWatch == "function") {
        instance.appContext.config.globalProperties.keyboardComponentWatch.apply(instance.proxy, ["showing", el]);
      }
    };
    const afterEnter = (el) => {
      emits("shown", el);
      if (typeof instance.appContext.config.globalProperties.keyboardComponentWatch == "function") {
        instance.appContext.config.globalProperties.keyboardComponentWatch.apply(instance.proxy, ["shown", el]);
      }
    };
    const beforeLeave = (el) => {
      obj.data.remove(el, "mvi-keyboard-beforeEnter-trigger");
      obj.data.remove(el, "mvi-keyboard-enter-trigger");
      emits("hide", el);
      if (typeof instance.appContext.config.globalProperties.keyboardComponentWatch == "function") {
        instance.appContext.config.globalProperties.keyboardComponentWatch.apply(instance.proxy, ["hide", el]);
      }
    };
    const leave = (el) => {
      emits("hidding", el);
      if (typeof instance.appContext.config.globalProperties.keyboardComponentWatch == "function") {
        instance.appContext.config.globalProperties.keyboardComponentWatch.apply(instance.proxy, ["hidding", el]);
      }
    };
    const afterLeave = (el) => {
      emits("hidden", el);
      if (typeof instance.appContext.config.globalProperties.keyboardComponentWatch == "function") {
        instance.appContext.config.globalProperties.keyboardComponentWatch.apply(instance.proxy, ["hidden", el]);
      }
    };
    __expose({
      $$el
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Overlay), {
        ref_key: "overlayRef",
        ref: overlayRef,
        modelValue: cmpShow.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => cmpShow.value = $event),
        onShow: overlayShow,
        onHide: overlayHide,
        "z-index": _ctx.zIndex,
        color: _ctx.overlayColor,
        closable: _ctx.closable,
        timeout: _ctx.timeout,
        "mount-el": _ctx.mountEl,
        "use-padding": _ctx.usePadding
      }, {
        default: withCtx(() => [
          createVNode(Transition, {
            name: "mvi-keyboard",
            onBeforeEnter: beforeEnter,
            onAfterEnter: afterEnter,
            onBeforeLeave: beforeLeave,
            onAfterLeave: afterLeave,
            onLeave: leave,
            onEnter: enter
          }, {
            default: withCtx(() => [
              firstShow.value ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "keyboardRef",
                ref: keyboardRef,
                class: "mvi-number-keyboard",
                style: boardStyle.value
              }, _ctx.$attrs), [
                !_ctx.border && (_ctx.title || _ctx.$slots.title) ? (openBlock(), createElementBlock("div", _hoisted_1$a, [
                  _ctx.$slots.title ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_2$8, toDisplayString(_ctx.title), 1))
                ])) : createCommentVNode("", true),
                createElementVNode("div", {
                  class: normalizeClass(["mvi-number-keyboard-wrapper", _ctx.border ? "" : "border"])
                }, [
                  createElementVNode("div", _hoisted_3$7, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(cpmNumbers.value, (item, index) => {
                      return openBlock(), createElementBlock("div", {
                        class: normalizeClass(["mvi-number-keyboard-left-number", leftNumberClass.value(item, index)])
                      }, [
                        createElementVNode("div", {
                          onClick: ($event) => numberClick(item),
                          class: normalizeClass(["mvi-number-keyboard-left-number-el", { active: _ctx.active }])
                        }, toDisplayString(item), 11, _hoisted_4$5)
                      ], 2);
                    }), 256))
                  ]),
                  _ctx.showComplete || _ctx.showDelete ? (openBlock(), createElementBlock("div", _hoisted_5$3, [
                    _ctx.showDelete ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: normalizeClass(["mvi-number-keyboard-delete", { border: _ctx.border }])
                    }, [
                      createElementVNode("div", {
                        disabled: deleteDisabeld.value || null,
                        class: normalizeClass(["mvi-number-keyboard-delete-el", { active: _ctx.active && !deleteDisabeld.value }]),
                        onClick: deleteClick
                      }, [
                        _ctx.$slots.delete ? renderSlot(_ctx.$slots, "delete", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", {
                          key: 1,
                          textContent: toDisplayString(_ctx.deleteText)
                        }, null, 8, _hoisted_7$3))
                      ], 10, _hoisted_6$3)
                    ], 2)) : createCommentVNode("", true),
                    _ctx.showComplete ? (openBlock(), createElementBlock("div", {
                      key: 1,
                      class: normalizeClass(["mvi-number-keyboard-complete", { border: _ctx.border }])
                    }, [
                      createElementVNode("div", {
                        disabled: _ctx.promiseEmpty ? null : completeDisabled.value || null,
                        class: normalizeClass(["mvi-number-keyboard-complete-el", { active: _ctx.active && !(_ctx.promiseEmpty ? false : completeDisabled.value) }]),
                        onClick: completeClick
                      }, [
                        _ctx.$slots.complete ? renderSlot(_ctx.$slots, "complete", { key: 0 }, void 0, true) : createCommentVNode("", true),
                        createElementVNode("span", {
                          textContent: toDisplayString(_ctx.completeText)
                        }, null, 8, _hoisted_9)
                      ], 10, _hoisted_8$2)
                    ], 2)) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ], 2)
              ], 16)), [
                [vShow, keyboardShow.value]
              ]) : createCommentVNode("", true)
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["modelValue", "z-index", "color", "closable", "timeout", "mount-el", "use-padding"]);
    };
  }
});
const NumberKeyboard = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-b5266fc6"]]);
NumberKeyboard.install = (app) => {
  app.component(NumberKeyboard.name, NumberKeyboard);
};
const ToastProps = {
  //弹窗类型，取值为success/error/loading/info
  type: {
    type: String,
    default: null
  },
  //显示文本
  message: {
    type: String,
    default: null
  },
  //弹窗自动关闭的时间，默认不自动关闭
  timeout: {
    type: Number,
    default: null
  },
  //遮罩层背景色
  overlayColor: {
    type: String,
    default: null
  },
  //弹窗背景色
  background: {
    type: String,
    default: null
  },
  //弹窗字体颜色
  color: {
    type: String,
    default: null
  },
  //遮罩层z-index
  zIndex: {
    type: Number,
    default: null
  },
  //是否考虑滚动条
  usePadding: {
    type: Boolean,
    default: null
  },
  //自定义显示的图标
  icon: {
    type: [String, Object],
    default: null
  },
  //挂载元素
  mountEl: {
    type: String,
    default: null
  },
  //是否显示阴影
  shadow: {
    type: Boolean,
    default: null
  },
  //弹窗移除方法
  __remove: {
    type: Function,
    default: function() {
      return function() {
      };
    }
  },
  //弹窗初始化方法
  __init: {
    type: Function,
    default: function() {
      return function() {
      };
    }
  }
};
const _hoisted_1$9 = { class: "mvi-toast-icon" };
const _hoisted_2$7 = ["innerHTML"];
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false,
    name: "m-toast"
  },
  __name: "toast",
  props: ToastProps,
  setup(__props, { expose: __expose }) {
    const instance = getCurrentInstance();
    const props = __props;
    const show = ref(true);
    const timer = ref(null);
    const overlayRef = ref(null);
    const $$el = computed(() => {
      return overlayRef.value ? overlayRef.value.$$el : null;
    });
    const cmpUsePadding = computed(() => {
      if (typeof props.usePadding == "boolean") {
        return props.usePadding;
      }
      return false;
    });
    const cmpType = computed(() => {
      if (["success", "error", "loading", "info"].includes(props.type)) {
        return props.type;
      }
      return "info";
    });
    const defaultIconType = computed(() => {
      if (cmpType.value == "success") {
        return "success";
      }
      if (cmpType.value == "error") {
        return "error-o";
      }
      if (cmpType.value == "info") {
        return "info-o";
      }
      return "";
    });
    const cmpIcon = computed(() => {
      let icon = {
        type: defaultIconType.value,
        url: "",
        spin: false,
        size: "0.72rem",
        color: ""
      };
      if (typeof props.icon == "string" && props.icon) {
        icon.type = props.icon;
      } else if (obj.common.isObject(props.icon)) {
        if (typeof props.icon.type == "string" && props.icon.type) {
          icon.type = props.icon.type;
        }
        if (typeof props.icon.url == "string" && props.icon.url) {
          icon.url = props.icon.url;
        }
        if (typeof props.icon.spin == "boolean") {
          icon.spin = props.icon.spin;
        }
        if (typeof props.icon.size == "string" && props.icon.size) {
          icon.size = props.icon.size;
        }
        if (typeof props.icon.color == "string" && props.icon.color) {
          icon.color = props.icon.color;
        }
      }
      return icon;
    });
    const cmpMessage = computed(() => {
      if (typeof props.message == "string" && props.message) {
        return props.message;
      }
      if (obj.common.isObject(props.message)) {
        return JSON.stringify(props.message);
      }
      if (props.message == void 0 || props.message == null) {
        return "";
      }
      return String(props.message);
    });
    const cmpTimeout = computed(() => {
      if (obj.number.isNumber(props.timeout) && props.timeout > 0) {
        return props.timeout;
      }
      return 0;
    });
    const cmpZIndex = computed(() => {
      if (obj.number.isNumber(props.zIndex)) {
        return props.zIndex;
      }
      return 1100;
    });
    const cmpOverlayColor = computed(() => {
      if (typeof props.overlayColor == "string" && props.overlayColor) {
        return props.overlayColor;
      }
      return "rgba(0, 10, 20, .05)";
    });
    const cmpBackground = computed(() => {
      if (typeof props.background == "string" && props.background) {
        return props.background;
      }
      return "";
    });
    const cmpColor = computed(() => {
      if (typeof props.color == "string" && props.color) {
        return props.color;
      }
      return "#fff";
    });
    const cmpMountEl = computed(() => {
      if (typeof props.mountEl == "string" && props.mountEl) {
        return props.mountEl;
      }
      return "body";
    });
    const cmpShadow = computed(() => {
      if (typeof props.shadow == "boolean") {
        return props.shadow;
      }
      return true;
    });
    const toastStyle = computed(() => {
      let style = {
        zIndex: cmpZIndex.value
      };
      if (cmpBackground.value) {
        style.backgroundColor = cmpBackground.value;
      }
      if (cmpColor.value) {
        style.color = cmpColor.value;
      }
      return style;
    });
    const clearTimer = () => {
      if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
      }
    };
    const toastShown = () => {
      if (cmpTimeout.value > 0) {
        timer.value = setTimeout(() => {
          show.value = false;
        }, cmpTimeout.value);
      }
    };
    const toastHidden = () => {
      clearTimer();
      props.__remove();
    };
    onMounted(() => {
      props.__init(instance);
    });
    __expose({
      $$el,
      show
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Overlay), {
        ref_key: "overlayRef",
        ref: overlayRef,
        color: cmpOverlayColor.value,
        onHidden: toastHidden,
        modelValue: show.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => show.value = $event),
        "use-padding": cmpUsePadding.value,
        zIndex: cmpZIndex.value,
        fade: "",
        "mount-el": cmpMountEl.value,
        onShown: toastShown
      }, {
        default: withCtx(() => [
          createElementVNode("div", mergeProps({
            class: ["mvi-toast", { iconless: cmpMessage.value, shadow: cmpShadow.value }],
            style: toastStyle.value
          }, _ctx.$attrs), [
            createElementVNode("div", _hoisted_1$9, [
              cmpType.value == "loading" && !cmpIcon.value.type && !cmpIcon.value.url ? (openBlock(), createBlock(unref(Loading), {
                key: 0,
                color: cmpColor.value,
                size: cmpIcon.value.size
              }, null, 8, ["color", "size"])) : (openBlock(), createBlock(unref(Icon), {
                key: 1,
                type: cmpIcon.value.type,
                url: cmpIcon.value.url,
                spin: cmpIcon.value.spin,
                size: cmpIcon.value.size,
                color: cmpIcon.value.color
              }, null, 8, ["type", "url", "spin", "size", "color"]))
            ]),
            cmpMessage.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "mvi-toast-message",
              innerHTML: cmpMessage.value
            }, null, 8, _hoisted_2$7)) : createCommentVNode("", true)
          ], 16)
        ]),
        _: 1
      }, 8, ["color", "modelValue", "use-padding", "zIndex", "mount-el"]);
    };
  }
});
const ToastComponent = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-64cbfadb"]]);
const Toast = {
  //初始化参数
  initParams: (options) => {
    let opts = {};
    if (obj.common.isObject(options)) {
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
      opts.shadow = options.shadow;
    } else {
      opts.message = options;
      opts.timeout = 1500;
    }
    return opts;
  },
  //显示toast
  showToast: (options) => {
    return new Promise((resolve) => {
      if (Toast.$el && Toast.$instance) {
        Toast.$instance.unmount();
        Toast.$el.remove();
      }
      let opts = Toast.initParams(options);
      let mountNode = obj.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(ToastComponent, {
        ...opts,
        __init: (vm) => {
          Toast.$vm = vm;
        },
        __remove: () => {
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
  //关闭Toast
  hideToast: () => {
    if (Toast.$vm) {
      Toast.$vm.exposed.show.value = false;
    }
  },
  //注册函数
  install: (app) => {
    app.config.globalProperties.$showToast = Toast.showToast;
    app.provide("$showToast", Toast.showToast);
    app.config.globalProperties.$hideToast = Toast.hideToast;
    app.provide("$hideToast", Toast.hideToast);
  }
};
const PullRefreshProps = {
  //下拉文案
  pullingText: {
    type: String,
    default: "下拉刷新"
  },
  //释放文案
  loosingText: {
    type: String,
    default: "释放刷新"
  },
  //刷新时显示的文本
  loadingText: {
    type: String,
    default: "正在刷新"
  },
  //是否刷新
  modelValue: {
    type: Boolean,
    default: false
  },
  //下拉图标
  pullingIcon: {
    type: [String, Object],
    default: "arrow-down"
  },
  //释放图标
  loosingIcon: {
    type: [String, Object],
    default: "arrow-up"
  },
  //刷新图标
  loadingIcon: {
    type: [String, Object],
    default: function() {
      return {
        type: "load-e",
        spin: true
      };
    }
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //下拉触发刷新的距离值
  distance: {
    type: Number,
    default: 1.4
  }
};
const _hoisted_1$8 = ["textContent"];
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-pull-refresh"
  },
  __name: "pull-refresh",
  props: PullRefreshProps,
  emits: ["update:modelValue", "refresh"],
  setup(__props, { emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const elHeight = ref(0);
    const rootHeight = ref(0);
    const amount = ref(0);
    const amountMax = ref(4);
    const startY = ref(0);
    const firstStartY = ref(0);
    const status = ref(0);
    const translateY = ref(0);
    const hasTouch = ref(false);
    const mouseDown = ref(false);
    const disableScroll = ref(false);
    const containerRef = ref(null);
    const elRef = ref(null);
    const refreshRef = ref(null);
    const wrapperRef = ref(null);
    const containerStyle = computed(() => {
      let style = {
        height: `calc(100% + ${elHeight.value}px)`,
        transform: `translateY(${translateY.value}px)`
      };
      return style;
    });
    const wrapperStyle = computed(() => {
      let style = {
        height: rootHeight.value + "px"
      };
      if (disableScroll.value) {
        style.overflowY = "hidden";
      }
      return style;
    });
    const parseIcon = computed(() => {
      return (params) => {
        let icon2 = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon2.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon2.type = params.type;
          }
          if (typeof params.url == "string") {
            icon2.url = params.url;
          }
          if (typeof params.color == "string") {
            icon2.color = params.color;
          }
          if (typeof params.size == "string") {
            icon2.size = params.size;
          }
        } else if (typeof params == "string") {
          icon2.type = params;
        }
        return icon2;
      };
    });
    const icon = computed(() => {
      if (status.value == 0) {
        return parseIcon.value(props.pullingIcon);
      }
      if (status.value == 1) {
        return parseIcon.value(props.loosingIcon);
      }
      return parseIcon.value(props.loadingIcon);
    });
    const message = computed(() => {
      if (status.value == 0) {
        return props.pullingText;
      }
      if (status.value == 1) {
        return props.loosingText;
      }
      return props.loadingText;
    });
    const initHeight = () => {
      elHeight.value = refreshRef.value.offsetHeight;
      rootHeight.value = elRef.value.offsetHeight;
      translateY.value = -elHeight.value;
    };
    const getScrollEl = (el) => {
      if (el.isEqualNode(wrapperRef.value) || !obj.element.isContains(wrapperRef.value, el)) {
        return wrapperRef.value;
      }
      if (obj.element.getScrollHeight(el) > el.clientHeight) {
        return el;
      }
      return getScrollEl(el.parentNode);
    };
    const changeStatus = () => {
      if (props.disabled) {
        return;
      }
      if (props.modelValue) {
        status.value = 2;
        disableScroll.value = true;
        emits("refresh");
        if (!hasTouch.value) {
          containerRef.value.style.transition = "transform 300ms";
          containerRef.value.offsetWidth;
          translateY.value = obj.element.rem2px(props.distance) - elHeight.value;
          setTimeout(() => {
            if (containerRef.value) {
              containerRef.value.style.transition = "";
            }
          }, 300);
        }
      } else {
        amount.value = 0;
        hasTouch.value = false;
        containerRef.value.style.transition = "transform 300ms";
        containerRef.value.offsetWidth;
        translateY.value = -elHeight.value;
        setTimeout(() => {
          if (containerRef.value) {
            containerRef.value.style.transition = "";
          }
          status.value = 0;
          disableScroll.value = false;
        }, 300);
      }
    };
    const startPull = (event2) => {
      if (props.disabled) {
        return;
      }
      if (status.value == 0) {
        startY.value = event2.targetTouches[0].pageY;
        firstStartY.value = startY.value;
      }
    };
    const startPull2 = (event2) => {
      if (props.disabled) {
        return;
      }
      if (status.value == 0) {
        mouseDown.value = true;
        startY.value = event2.pageY;
        firstStartY.value = startY.value;
      }
    };
    const onPull = (event2) => {
      if (props.disabled) {
        return;
      }
      if (status.value == 2) {
        return;
      }
      let endY = event2.targetTouches[0].pageY;
      let move = endY - startY.value;
      let totalMove = endY - firstStartY.value;
      startY.value = endY;
      if (totalMove <= 0) {
        firstStartY.value = startY.value;
        return;
      }
      if (obj.element.getScrollTop(wrapperRef.value) > 0) {
        firstStartY.value = startY.value;
        return;
      }
      let el = getScrollEl(event2.target);
      if (!el.isEqualNode(wrapperRef.value) && obj.element.getScrollTop(el) > 0) {
        firstStartY.value = startY.value;
        return;
      }
      hasTouch.value = true;
      if (event2.cancelable) {
        event2.preventDefault();
      }
      if (amount.value < amountMax.value) {
        amount.value++;
      }
      let y = translateY.value + move / amount.value;
      if (y > obj.element.rem2px(props) - elHeight.value) {
        status.value = 1;
      } else {
        status.value = 0;
      }
      translateY.value = y;
    };
    const onPull2 = (event2) => {
      if (!mouseDown.value || props.disabled) {
        return;
      }
      if (status.value == 2) {
        return;
      }
      let endY = event2.pageY;
      let move = endY - startY.value;
      let totalMove = endY - firstStartY.value;
      startY.value = endY;
      if (totalMove <= 0) {
        firstStartY.value = startY.value;
        return;
      }
      if (obj.element.getScrollTop(wrapperRef.value) > 0) {
        firstStartY.value = startY.value;
        return;
      }
      let el = getScrollEl(event2.target);
      if (!el.isEqualNode(wrapperRef.value) && obj.element.getScrollTop(el) > 0) {
        firstStartY.value = startY.value;
        return;
      }
      hasTouch.value = true;
      if (event2.cancelable) {
        event2.preventDefault();
      }
      if (amount.value < amountMax.value) {
        amount.value++;
      }
      let y = translateY.value + move / amount.value;
      if (y > obj.element.rem2px(props.distance) - elHeight.value) {
        status.value = 1;
      } else {
        status.value = 0;
      }
      translateY.value = y;
    };
    const pulled = () => {
      if (props.disabled) {
        return;
      }
      if (status.value == 1 && props.modelValue == false) {
        emits("update:modelValue", true);
      } else if (status.value == 0) {
        changeStatus();
      }
    };
    const pulled2 = () => {
      if (!mouseDown.value || props.disabled) {
        return;
      }
      mouseDown.value = false;
      if (status.value == 1 && props.modelValue === false) {
        emits("update:modelValue", true);
      } else if (status.value == 0) {
        changeStatus();
      }
    };
    watch(
      () => props.modelValue,
      () => {
        changeStatus();
      }
    );
    onMounted(() => {
      nextTick(() => {
        initHeight();
        obj.event.on(document.documentElement, `mousemove.pullRefresh_${instance.uid}`, onPull2);
        obj.event.on(document.documentElement, `mouseup.pullRefresh_${instance.uid}`, pulled2);
      });
    });
    onBeforeUnmount(() => {
      obj.event.off(document.documentElement, `mousemove.pullRefresh_${instance.uid} mouseup.pullRefresh_${instance.uid}`);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "mvi-pull-refresh",
        ref_key: "elRef",
        ref: elRef
      }, [
        createElementVNode("div", {
          ref_key: "containerRef",
          ref: containerRef,
          class: "mvi-pull-refresh-container",
          style: normalizeStyle(containerStyle.value)
        }, [
          createElementVNode("div", {
            ref_key: "refreshRef",
            ref: refreshRef,
            class: "mvi-pull-refresh-el"
          }, [
            _ctx.$slots.el ? renderSlot(_ctx.$slots, "el", {
              key: 0,
              status: status.value
            }, void 0, true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createVNode(unref(Icon), {
                type: icon.value.type,
                spin: icon.value.spin,
                url: icon.value.url,
                size: icon.value.size,
                color: icon.value.color
              }, null, 8, ["type", "spin", "url", "size", "color"]),
              createElementVNode("span", {
                class: "mvi-pull-refresh-text",
                textContent: toDisplayString(message.value)
              }, null, 8, _hoisted_1$8)
            ], 64))
          ], 512),
          createElementVNode("div", {
            ref_key: "wrapperRef",
            ref: wrapperRef,
            class: "mvi-pull-refresh-wrapper",
            onTouchstart: startPull,
            onTouchmove: onPull,
            onTouchend: pulled,
            onMousedown: startPull2,
            style: normalizeStyle(wrapperStyle.value)
          }, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 36)
        ], 4)
      ], 512);
    };
  }
});
const PullRefresh = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-b835fc2c"]]);
PullRefresh.install = (app) => {
  app.component(PullRefresh.name, PullRefresh);
};
const DialogProps = {
  //弹窗类型
  type: {
    type: String,
    default: null
  },
  //标题
  title: {
    type: String,
    default: null
  },
  //描述
  message: {
    default: ""
  },
  //宽度
  width: {
    type: String,
    default: null
  },
  //遮罩z-index
  zIndex: {
    type: Number,
    default: null
  },
  //动画
  animation: {
    type: String,
    default: null
  },
  //圆角
  radius: {
    type: String,
    default: null
  },
  //遮罩层颜色
  overlayColor: {
    type: String,
    default: null
  },
  //是否点击遮罩可关闭
  closable: {
    type: Boolean,
    default: null
  },
  //输入框配置
  input: {
    type: Object,
    default: null
  },
  //滚动条考虑
  usePadding: {
    type: Boolean,
    default: null
  },
  //按钮文本
  btnText: {
    type: [String, Array],
    default: null
  },
  //按钮颜色
  btnColor: {
    type: [String, Array],
    default: null
  },
  //是否ios风格
  ios: {
    type: Boolean,
    default: null
  },
  //挂载元素
  mountEl: {
    type: String,
    default: null
  },
  //动画时长
  timeout: {
    type: Number,
    default: null
  },
  //弹窗移除方法
  __remove: {
    type: Function,
    default: function() {
      return function() {
      };
    }
  }
};
const DialogPcProps = {
  //弹窗类型
  type: {
    type: String,
    default: null
  },
  //标题
  title: {
    type: String,
    default: null
  },
  //描述
  message: {
    default: ""
  },
  //宽度
  width: {
    type: String,
    default: null
  },
  //遮罩层z-index
  zIndex: {
    type: Number,
    default: null
  },
  //动画
  animation: {
    type: String,
    default: null
  },
  //圆角
  radius: {
    type: String,
    default: null
  },
  //遮罩层颜色
  overlayColor: {
    type: String,
    default: null
  },
  //是否点击遮罩可关闭
  closable: {
    type: Boolean,
    default: null
  },
  //输入框配置
  input: {
    type: Object,
    default: null
  },
  //是否居中
  center: {
    type: Boolean,
    default: false
  },
  //滚动条考虑
  usePadding: {
    type: Boolean,
    default: null
  },
  //按钮配置
  btns: {
    type: Object,
    default: null
  },
  //关闭按钮是否显示
  showTimes: {
    type: Boolean,
    default: null
  },
  //挂载元素
  mountEl: {
    type: String,
    default: null
  },
  //动画时长
  timeout: {
    type: Number,
    default: null
  },
  //弹窗移除方法
  __remove: {
    type: Function,
    default: function() {
      return function() {
      };
    }
  }
};
const _hoisted_1$7 = ["innerHTML"];
const _hoisted_2$6 = ["innerHTML"];
const _hoisted_3$6 = ["innerHTML"];
const _hoisted_4$4 = ["type", "placeholder", "maxlength", "inputmode"];
const _hoisted_5$2 = { class: "mvi-dialog-footer" };
const _hoisted_6$2 = ["textContent"];
const _hoisted_7$2 = ["textContent"];
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-dialog"
  },
  __name: "dialog",
  props: DialogProps,
  setup(__props, { expose: __expose }) {
    const instance = getCurrentInstance();
    const props = __props;
    const ok = ref(false);
    const show = ref(true);
    const focus = ref(false);
    const value = ref("");
    const modalRef = ref(null);
    const inputRef = ref(null);
    const $$el = computed(() => {
      return modalRef.value ? modalRef.value.$$el : null;
    });
    const cmpTitle = computed(() => {
      if (typeof props.title == "string") {
        return props.title;
      }
      return "提示";
    });
    const cmpMessage = computed(() => {
      if (typeof props.message == "string") {
        return props.message;
      }
      if (obj.common.isObject(props.message)) {
        return JSON.stringify(props.message);
      }
      return String(props.message);
    });
    const cmpBtnText = computed(() => {
      let bt = "";
      if (props.type == "alert") {
        if (typeof props.btnText == "string") {
          bt = props.btnText;
        } else {
          bt = "确定";
        }
      } else {
        bt = [];
        if (props.btnText instanceof Array) {
          if (typeof props.btnText[0] == "string") {
            bt[0] = props.btnText[0];
          } else {
            bt[0] = "确定";
          }
          if (typeof props.btnText[1] == "string") {
            bt[1] = props.btnText[1];
          } else {
            bt[1] = "取消";
          }
        } else {
          bt = ["确定", "取消"];
        }
      }
      return bt;
    });
    const cmpBtnColor = computed(() => {
      let bt = "";
      if (props.type == "alert") {
        if (typeof props.btnColor == "string") {
          bt = props.btnColor;
        } else {
          bt = "";
        }
      } else {
        bt = [];
        if (props.btnColor instanceof Array) {
          if (typeof props.btnColor[0] == "string") {
            bt[0] = props.btnColor[0];
          } else {
            bt[0] = "";
          }
          if (typeof props.btnColor[1] == "string") {
            bt[1] = props.btnColor[1];
          } else {
            bt[1] = "";
          }
        } else {
          bt = ["", ""];
        }
      }
      return bt;
    });
    const cmpWidth = computed(() => {
      if (typeof props.width == "string" && props.width) {
        return props.width;
      }
      return "5.6rem";
    });
    const cmpInput = computed(() => {
      let input = {
        placeholder: "",
        type: "text",
        autofocus: true,
        maxlength: -1,
        clearable: true,
        mode: "text",
        align: "left",
        value: ""
      };
      if (obj.common.isObject(props.input)) {
        if (typeof props.input.placeholder == "string") {
          input.placeholder = props.input.placeholder;
        }
        if (typeof props.input.type == "string" && props.input.type) {
          input.type = props.input.type;
        }
        if (typeof props.input.autofocus == "boolean") {
          input.autofocus = props.input.autofocus;
        }
        if (obj.number.isNumber(props.input.maxlength)) {
          input.maxlength = props.input.maxlength;
        }
        if (typeof props.input.clearable == "boolean") {
          input.clearable = props.input.clearable;
        }
        if (typeof props.input.mode == "string") {
          input.mode = props.input.mode;
        }
        if (typeof props.input.align == "string") {
          input.align = props.input.align;
        }
        if (typeof props.input.value == "string" || obj.number.isNumber(props.input.value)) {
          input.value = props.input.value.toString();
        }
      }
      return input;
    });
    const cmpZIndex = computed(() => {
      if (obj.number.isNumber(props.zIndex)) {
        return props.zIndex;
      }
      return 1e3;
    });
    const cmpUsePadding = computed(() => {
      if (typeof props.usePadding == "boolean") {
        return props.usePadding;
      }
      return false;
    });
    const cmpAnimation = computed(() => {
      if (typeof props.animation == "string" && props.animation) {
        return props.animation;
      }
      return "narrow";
    });
    const cmpRadius = computed(() => {
      if (typeof props.radius == "string" && props.radius) {
        return props.radius;
      }
      return "0.2rem";
    });
    const cmpIos = computed(() => {
      if (typeof props.ios == "boolean") {
        return props.ios;
      }
      return false;
    });
    const cmpOverlayColor = computed(() => {
      if (typeof props.overlayColor == "string" && props.overlayColor) {
        return props.overlayColor;
      }
      if (cmpIos.value) {
        return "rgba(0,10,20,.3)";
      }
      return "";
    });
    const cmpMountEl = computed(() => {
      if (typeof props.mountEl == "string" && props.mountEl) {
        return props.mountEl;
      }
      return "body";
    });
    const cmpClosable = computed(() => {
      if (typeof props.closable == "boolean") {
        return props.closable;
      } else {
        return false;
      }
    });
    const cmpTimeout = computed(() => {
      if (obj.number.isNumber(props.timeout)) {
        return props.timeout;
      }
      return 200;
    });
    const contentShow = computed(() => {
      if (props.type == "alert" || props.type == "confirm") {
        if (cmpMessage.value && !cmpIos.value) {
          return true;
        }
        return false;
      }
      return true;
    });
    const showClear = computed(() => {
      return !!(focus.value && value.value);
    });
    const inputClass = computed(() => {
      let cls = [];
      if (showClear.value && cmpInput.value.clearable) {
        cls.push("mvi-dialog-input-padding");
      }
      return cls;
    });
    const inputMode = computed(() => {
      let mode = "text";
      if (["none", "text", "decimal", "numeric", "tel", "search", "email", "url"].includes(cmpInput.value.mode)) {
        mode = cmpInput.value.mode;
      }
      return mode;
    });
    const inputStyle = computed(() => {
      let style = {};
      if (["left", "right", "center"].includes(cmpInput.value.align)) {
        style.textAlign = cmpInput.value.align;
      }
      return style;
    });
    const overlayClick = (event2) => {
      if (!cmpClosable.value) {
        return;
      }
      if (event2.target != event2.currentTarget) {
        return;
      }
      show.value = false;
      ok.value = false;
    };
    const setDefaultValue = () => {
      let _value = cmpInput.value.value;
      if (cmpInput.value.type == "number") {
        _value = _value.replace(/\D/g, "");
      }
      if (cmpInput.value.maxlength > 0 && _value.length > cmpInput.value.maxlength) {
        _value = _value.substring(0, cmpInput.value.maxlength);
      }
      value.value = _value;
    };
    const inputFocus = () => {
      focus.value = true;
    };
    const inputBlur = () => {
      setTimeout(() => {
        focus.value = false;
      }, 200);
    };
    const inputFun = () => {
      let _value = value.value;
      if (cmpInput.value.type == "number") {
        _value = _value.replace(/\D/g, "");
      }
      if (cmpInput.value.maxlength > 0 && _value.length > cmpInput.value.maxlength) {
        _value = _value.substring(0, cmpInput.value.maxlength);
      }
      value.value = _value;
    };
    const doClear = () => {
      if (!cmpInput.value.clearable) {
        return;
      }
      setTimeout(() => {
        value.value = "";
        inputRef.value.focus();
      }, 210);
    };
    const okFun = () => {
      show.value = false;
      ok.value = true;
    };
    const cancelFun = () => {
      show.value = false;
      ok.value = false;
    };
    const modalHide = (el) => {
      if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == "function") {
        instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ["hide", props.type, el]);
      }
    };
    const modalHidding = (el) => {
      if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == "function") {
        instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ["hidding", props.type, el]);
      }
    };
    const modalHidden = (el) => {
      if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == "function") {
        instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ["hidden", props.type, el]);
      }
      if (props.type == "alert") {
        props.__remove();
      } else if (props.type == "confirm") {
        props.__remove(ok.value);
      } else if (props.type == "prompt") {
        props.__remove(ok.value, value.value);
      }
    };
    const modalShow = (el) => {
      if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == "function") {
        instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ["show", props.type, el]);
      }
    };
    const modalShowing = (el) => {
      if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == "function") {
        instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ["showing", props.type, el]);
      }
    };
    const modalShown = (el) => {
      if (props.type == "prompt" && cmpInput.value.autofocus && inputRef.value) {
        inputRef.value.focus();
      }
      if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == "function") {
        instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ["shown", props.type, el]);
      }
    };
    if (props.type == "prompt") {
      setDefaultValue();
    }
    onMounted(() => {
      obj.event.on($$el.value, "click.dialog", overlayClick);
    });
    __expose({
      $$el
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Modal), {
        ref_key: "modalRef",
        ref: modalRef,
        modelValue: show.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => show.value = $event),
        onHide: modalHide,
        onHidding: modalHidding,
        onHidden: modalHidden,
        width: cmpWidth.value,
        "z-index": cmpZIndex.value,
        radius: cmpRadius.value,
        "use-padding": cmpUsePadding.value,
        animation: cmpAnimation.value,
        onShow: modalShow,
        onShowing: modalShowing,
        onShown: modalShown,
        timeout: cmpTimeout.value,
        "overlay-color": cmpOverlayColor.value,
        "mount-el": cmpMountEl.value,
        __ignorePadding: ""
      }, createSlots({
        footer: withCtx(() => [
          createElementVNode("div", _hoisted_5$2, [
            _ctx.type != "alert" ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "mvi-dialog-cancel",
              textContent: toDisplayString(cmpBtnText.value[1]),
              onClick: cancelFun,
              style: normalizeStyle({ color: cmpBtnColor.value[1] || "" })
            }, null, 12, _hoisted_6$2)) : createCommentVNode("", true),
            createElementVNode("div", {
              class: "mvi-dialog-ok",
              textContent: toDisplayString(_ctx.type == "alert" ? cmpBtnText.value : cmpBtnText.value[0]),
              onClick: okFun,
              style: normalizeStyle({ color: _ctx.type == "alert" ? cmpBtnColor.value || "" : cmpBtnColor.value[0] || "" })
            }, null, 12, _hoisted_7$2)
          ])
        ]),
        _: 2
      }, [
        cmpTitle.value || cmpIos.value && cmpMessage.value ? {
          name: "title",
          fn: withCtx(() => [
            cmpTitle.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              innerHTML: cmpTitle.value,
              class: "mvi-dialog-title"
            }, null, 8, _hoisted_1$7)) : createCommentVNode("", true),
            cmpMessage.value && cmpIos.value ? (openBlock(), createElementBlock("div", {
              key: 1,
              innerHTML: cmpMessage.value,
              class: "mvi-dialog-ios-content"
            }, null, 8, _hoisted_2$6)) : createCommentVNode("", true)
          ]),
          key: "0"
        } : void 0,
        contentShow.value ? {
          name: "default",
          fn: withCtx(() => [
            !cmpIos.value && cmpMessage.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              innerHTML: cmpMessage.value,
              class: "mvi-dialog-content"
            }, null, 8, _hoisted_3$6)) : createCommentVNode("", true),
            _ctx.type == "prompt" ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(["mvi-dialog-input", { "mvi-dialog-input-mt": !cmpIos.value && cmpMessage.value }])
            }, [
              withDirectives(createElementVNode("input", {
                ref_key: "inputRef",
                ref: inputRef,
                type: cmpInput.value.type == "number" ? "text" : cmpInput.value.type,
                placeholder: cmpInput.value.placeholder,
                maxlength: cmpInput.value.maxlength,
                class: normalizeClass(inputClass.value),
                style: normalizeStyle(inputStyle.value),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
                onInput: inputFun,
                onFocus: inputFocus,
                onBlur: inputBlur,
                inputmode: inputMode.value
              }, null, 46, _hoisted_4$4), [
                [
                  vModelDynamic,
                  value.value,
                  void 0,
                  { trim: true }
                ]
              ]),
              cmpInput.value.clearable ? withDirectives((openBlock(), createBlock(unref(Icon), {
                key: 0,
                type: "times-o",
                class: "mvi-dialog-times",
                onClick: doClear
              }, null, 512)), [
                [vShow, showClear.value]
              ]) : createCommentVNode("", true)
            ], 2)) : createCommentVNode("", true)
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["modelValue", "width", "z-index", "radius", "use-padding", "animation", "timeout", "overlay-color", "mount-el"]);
    };
  }
});
const dialogComponent = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-470bbf36"]]);
const _hoisted_1$6 = ["innerHTML"];
const _hoisted_2$5 = ["innerHTML"];
const _hoisted_3$5 = {
  key: 1,
  class: "mvi-dialog-input"
};
const _hoisted_4$3 = ["type", "placeholder", "maxlength", "inputMode"];
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-dialog-pc"
  },
  __name: "dialog-pc",
  props: DialogPcProps,
  setup(__props, { expose: __expose }) {
    const instance = getCurrentInstance();
    const props = __props;
    const ok = ref(false);
    const show = ref(true);
    const focus = ref(false);
    const value = ref("");
    const modalRef = ref(null);
    const inputRef = ref(null);
    const $$el = computed(() => {
      return modalRef.value ? modalRef.value.$$el : null;
    });
    const cmpShowTimes = computed(() => {
      if (typeof props.showTimes == "boolean") {
        return props.showTimes;
      }
      return true;
    });
    const cmpTitle = computed(() => {
      if (typeof props.title == "string") {
        return props.title;
      }
      return "提示";
    });
    const cmpMessage = computed(() => {
      if (typeof props.message == "string") {
        return props.message;
      }
      if (obj.common.isObject(props.message)) {
        return JSON.stringify(props.message);
      }
      return String(props.message);
    });
    const cmpBtns = computed(() => {
      let btns = {
        ok: {
          type: "primary",
          plain: false,
          size: "medium",
          text: "确定",
          round: false,
          square: false,
          disabled: false,
          loading: false,
          loadText: "loading...",
          loadIcon: {
            type: "load-e",
            spin: true
          }
        },
        cancel: {
          type: "default",
          plain: false,
          size: "medium",
          text: "取消",
          round: false,
          square: false,
          disabled: false,
          loading: false,
          loadText: "loading...",
          loadIcon: {
            type: "load-e",
            spin: true
          }
        }
      };
      if (obj.common.isObject(props.btns)) {
        if (obj.common.isObject(props.btns.ok)) {
          if (typeof props.btns.ok.type == "string") {
            btns.ok.type = props.btns.ok.type;
          }
          if (typeof props.btns.ok.plain == "boolean") {
            btns.ok.plain = props.btns.ok.plain;
          }
          if (typeof props.btns.ok.text == "string") {
            btns.ok.text = props.btns.ok.text;
          }
          if (typeof props.btns.ok.size == "string") {
            btns.ok.size = props.btns.ok.size;
          }
          if (typeof props.btns.ok.round == "boolean") {
            btns.ok.round = props.btns.ok.round;
          }
          if (typeof props.btns.ok.square == "boolean") {
            btns.ok.square = props.btns.ok.square;
          }
          if (typeof props.btns.ok.disabled == "boolean") {
            btns.ok.disabled = props.btns.ok.disabled;
          }
          if (typeof props.btns.ok.loading == "boolean") {
            btns.ok.loading = props.btns.ok.loading;
          }
          if (typeof props.btns.ok.loadText == "string") {
            btns.ok.loadText = props.btns.ok.loadText;
          }
          if (typeof props.btns.ok.loadIcon == "string" || obj.common.isObject(props.btns.ok.loadIcon)) {
            btns.ok.loadIcon = props.btns.ok.loadIcon;
          }
        }
        if (obj.common.isObject(props.btns.cancel)) {
          if (typeof props.btns.cancel.type == "string") {
            btns.cancel.type = props.btns.cancel.type;
          }
          if (typeof props.btns.cancel.plain == "boolean") {
            btns.cancel.plain = props.btns.cancel.plain;
          }
          if (typeof props.btns.cancel.text == "string") {
            btns.cancel.text = props.btns.cancel.text;
          }
          if (typeof props.btns.cancel.size == "string") {
            btns.cancel.size = props.btns.cancel.size;
          }
          if (typeof props.btns.cancel.round == "boolean") {
            btns.cancel.round = props.btns.cancel.round;
          }
          if (typeof props.btns.cancel.square == "boolean") {
            btns.cancel.square = props.btns.cancel.square;
          }
          if (typeof props.btns.cancel.disabled == "boolean") {
            btns.cancel.disabled = props.btns.cancel.disabled;
          }
          if (typeof props.btns.cancel.loading == "boolean") {
            btns.cancel.loading = props.btns.cancel.loading;
          }
          if (typeof props.btns.cancel.loadText == "string") {
            btns.cancel.loadText = props.btns.cancel.loadText;
          }
          if (typeof props.btns.cancel.loadIcon == "string" || obj.common.isObject(props.btns.cancel.loadIcon)) {
            btns.cancel.loadIcon = props.btns.cancel.loadIcon;
          }
        }
      }
      return btns;
    });
    const cmpWidth = computed(() => {
      if (typeof props.width == "string" && props.width) {
        return props.width;
      }
      return "7.2rem";
    });
    const cmpInput = computed(() => {
      let input = {
        placeholder: "",
        type: "text",
        autofocus: true,
        maxlength: -1,
        clearable: true,
        mode: "text",
        align: "left",
        value: ""
      };
      if (obj.common.isObject(props.input)) {
        if (typeof props.input.placeholder == "string") {
          input.placeholder = props.input.placeholder;
        }
        if (typeof props.input.type == "string" && props.input.type) {
          input.type = props.input.type;
        }
        if (typeof props.input.autofocus == "boolean") {
          input.autofocus = props.input.autofocus;
        }
        if (obj.number.isNumber(props.input.maxlength)) {
          input.maxlength = props.input.maxlength;
        }
        if (typeof props.input.clearable == "boolean") {
          input.clearable = props.input.clearable;
        }
        if (typeof props.input.mode == "string") {
          input.mode = props.input.mode;
        }
        if (typeof props.input.align == "string") {
          input.align = props.input.align;
        }
        if (typeof props.input.value == "string" || obj.number.isNumber(props.input.value)) {
          input.value = props.input.value.toString();
        }
      }
      return input;
    });
    const cmpZIndex = computed(() => {
      if (obj.number.isNumber(props.zIndex)) {
        return props.zIndex;
      }
      return 1e3;
    });
    const cmpUsePadding = computed(() => {
      if (typeof props.usePadding == "boolean") {
        return props.usePadding;
      }
      return false;
    });
    const cmpAnimation = computed(() => {
      if (typeof props.animation == "string" && props.animation) {
        return props.animation;
      }
      return "translate-top";
    });
    const cmpRadius = computed(() => {
      if (typeof props.radius == "string" && props.radius) {
        return props.radius;
      }
      return "0.12rem";
    });
    const cmpOverlayColor = computed(() => {
      if (typeof props.overlayColor == "string" && props.overlayColor) {
        return props.overlayColor;
      }
      return "";
    });
    const cmpClosable = computed(() => {
      if (typeof props.closable == "boolean") {
        return props.closable;
      } else {
        return false;
      }
    });
    const cmpCenter = computed(() => {
      if (typeof props.center == "boolean") {
        return props.center;
      }
      return false;
    });
    const cmpMountEl = computed(() => {
      if (typeof props.mountEl == "string" && props.mountEl) {
        return props.mountEl;
      }
      return "body";
    });
    const cmpTimeout = computed(() => {
      if (obj.number.isNumber(props.timeout)) {
        return props.timeout;
      }
      return 200;
    });
    const contentShow = computed(() => {
      if (props.type == "Alert" || props.type == "Confirm") {
        if (cmpMessage.value) {
          return true;
        }
        return false;
      }
      return true;
    });
    const showClear = computed(() => {
      return !!(focus.value && value.value);
    });
    const inputClass = computed(() => {
      let cls = [];
      if (showClear.value && cmpInput.value.clearable) {
        cls.push("mvi-dialog-input-padding");
      }
      return cls;
    });
    const inputMode = computed(() => {
      let mode = "text";
      if (["none", "text", "decimal", "numeric", "tel", "search", "email", "url"].includes(cmpInput.value.mode)) {
        mode = cmpInput.value.mode;
      }
      return mode;
    });
    const inputStyle = computed(() => {
      let style = {};
      if (["left", "right", "center"].includes(cmpInput.value.align)) {
        style.textAlign = cmpInput.value.align;
      }
      return style;
    });
    const overlayClick = (event2) => {
      if (!cmpClosable.value) {
        return;
      }
      if (event2.target != event2.currentTarget) {
        return;
      }
      show.value = false;
      ok.value = false;
    };
    const setDefaultValue = () => {
      let _value = cmpInput.value.value;
      if (cmpInput.value.type == "number") {
        _value = _value.replace(/\D/g, "");
      }
      if (cmpInput.value.maxlength > 0 && _value.length > cmpInput.value.maxlength) {
        _value = _value.substring(0, cmpInput.value.maxlength);
      }
      value.value = _value;
    };
    const inputFocus = () => {
      focus.value = true;
    };
    const inputBlur = () => {
      setTimeout(() => {
        focus.value = false;
      }, 200);
    };
    const inputFun = () => {
      let _value = value.value;
      if (cmpInput.value.type == "number") {
        _value = _value.replace(/\D/g, "");
      }
      if (cmpInput.value.maxlength > 0 && _value.length > cmpInput.value.maxlength) {
        _value = _value.substring(0, cmpInput.value.maxlength);
      }
      value.value = _value;
    };
    const doClear = () => {
      if (!cmpInput.value.clearable) {
        return;
      }
      setTimeout(() => {
        value.value = "";
        inputRef.value.focus();
      }, 210);
    };
    const okFun = () => {
      show.value = false;
      ok.value = true;
    };
    const cancelFun = () => {
      show.value = false;
      ok.value = false;
    };
    const modalHide = (el) => {
      if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == "function") {
        instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ["hide", props.type, el]);
      }
    };
    const modalHidding = (el) => {
      if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == "function") {
        instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ["hidding", props.type, el]);
      }
    };
    const modalHidden = (el) => {
      if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == "function") {
        instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ["hidden", props.type, el]);
      }
      if (props.type == "Alert") {
        props.__remove();
      } else if (props.type == "Confirm") {
        props.__remove(ok.value);
      } else if (props.type == "Prompt") {
        props.__remove(ok.value, value.value);
      }
    };
    const modalShow = (el) => {
      if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == "function") {
        instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ["show", props.type, el]);
      }
    };
    const modalShowing = (el) => {
      if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == "function") {
        instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ["showing", props.type, el]);
      }
    };
    const modalShown = (el) => {
      if (props.type == "Prompt" && cmpInput.value.autofocus && inputRef.value) {
        inputRef.value.focus();
      }
      if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == "function") {
        instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ["shown", props.type, el]);
      }
    };
    if (props.type == "Prompt") {
      setDefaultValue();
    }
    onMounted(() => {
      obj.event.on($$el.value, "click.dialog", overlayClick);
    });
    __expose({
      $$el
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Modal), {
        ref_key: "modalRef",
        ref: modalRef,
        modelValue: show.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => show.value = $event),
        "show-times": cmpShowTimes.value,
        onHide: modalHide,
        onHidding: modalHidding,
        onHidden: modalHidden,
        width: cmpWidth.value,
        "z-index": cmpZIndex.value,
        radius: cmpRadius.value,
        "use-padding": cmpUsePadding.value,
        animation: cmpAnimation.value,
        onShow: modalShow,
        onShowing: modalShowing,
        onShown: modalShown,
        timeout: cmpTimeout.value,
        "overlay-color": cmpOverlayColor.value,
        "mount-el": cmpMountEl.value,
        center: cmpCenter.value
      }, createSlots({ _: 2 }, [
        cmpTitle.value ? {
          name: "title",
          fn: withCtx(() => [
            createElementVNode("div", {
              innerHTML: cmpTitle.value,
              class: "mvi-dialog-title"
            }, null, 8, _hoisted_1$6)
          ]),
          key: "0"
        } : void 0,
        contentShow.value ? {
          name: "default",
          fn: withCtx(() => [
            cmpMessage.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              innerHTML: cmpMessage.value,
              class: normalizeClass(["mvi-dialog-content", { center: _ctx.center }])
            }, null, 10, _hoisted_2$5)) : createCommentVNode("", true),
            _ctx.type == "Prompt" ? (openBlock(), createElementBlock("div", _hoisted_3$5, [
              withDirectives(createElementVNode("input", {
                ref_key: "inputRef",
                ref: inputRef,
                type: cmpInput.value.type == "number" ? "text" : cmpInput.value.type,
                placeholder: cmpInput.value.placeholder,
                maxlength: cmpInput.value.maxlength,
                class: normalizeClass(inputClass.value),
                style: normalizeStyle(inputStyle.value),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
                onInput: inputFun,
                onFocus: inputFocus,
                onBlur: inputBlur,
                onKeyup: withKeys(okFun, ["enter"]),
                inputMode: inputMode.value
              }, null, 46, _hoisted_4$3), [
                [
                  vModelDynamic,
                  value.value,
                  void 0,
                  { trim: true }
                ]
              ]),
              cmpInput.value.clearable ? withDirectives((openBlock(), createBlock(unref(Icon), {
                key: 0,
                type: "times-o",
                class: "mvi-dialog-times",
                onClick: doClear
              }, null, 512)), [
                [vShow, showClear.value]
              ]) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            createElementVNode("div", {
              class: normalizeClass(["mvi-dialog-footer", { center: _ctx.center }])
            }, [
              _ctx.type != "Alert" ? (openBlock(), createBlock(unref(Button), {
                key: 0,
                type: cmpBtns.value.cancel.type,
                plain: cmpBtns.value.cancel.plain,
                class: "mvi-dialog-cancel",
                onClick: cancelFun,
                size: cmpBtns.value.cancel.size,
                round: cmpBtns.value.cancel.round,
                square: cmpBtns.value.cancel.square,
                loading: cmpBtns.value.cancel.loading,
                "load-text": cmpBtns.value.cancel.loadText,
                "load-icon": cmpBtns.value.cancel.loadIcon,
                disabled: cmpBtns.value.cancel.disabled
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(cmpBtns.value.cancel.text), 1)
                ]),
                _: 1
              }, 8, ["type", "plain", "size", "round", "square", "loading", "load-text", "load-icon", "disabled"])) : createCommentVNode("", true),
              createVNode(unref(Button), {
                type: cmpBtns.value.ok.type,
                plain: cmpBtns.value.ok.plain,
                onClick: okFun,
                size: cmpBtns.value.ok.size,
                round: cmpBtns.value.ok.round,
                square: cmpBtns.value.ok.square,
                loading: cmpBtns.value.ok.loading,
                "load-text": cmpBtns.value.ok.loadText,
                "load-icon": cmpBtns.value.ok.loadIcon,
                disabled: cmpBtns.value.ok.disabled
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(cmpBtns.value.ok.text), 1)
                ]),
                _: 1
              }, 8, ["type", "plain", "size", "round", "square", "loading", "load-text", "load-icon", "disabled"])
            ], 2)
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["modelValue", "show-times", "width", "z-index", "radius", "use-padding", "animation", "timeout", "overlay-color", "mount-el", "center"]);
    };
  }
});
const dialogPcComponent = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-6c151ed7"]]);
const Dialog = {
  //初始化参数
  initParams: (type, options) => {
    let opts = {};
    if (obj.common.isObject(options)) {
      opts.title = options.title;
      opts.message = options.message;
      opts.width = options.width;
      opts.zIndex = options.zIndex;
      opts.animation = options.animation;
      opts.radius = options.radius;
      opts.overlayColor = options.overlayColor;
      opts.closable = options.closable;
      opts.input = options.input;
      opts.usePadding = options.usePadding;
      opts.mountEl = options.mountEl;
      opts.timeout = options.timeout;
      if (type == "alert" || type == "confirm" || type == "prompt") {
        opts.btnText = options.btnText;
        opts.btnColor = options.btnColor;
        opts.ios = options.ios;
      } else if (type == "Alert" || type == "Confirm" || type == "Prompt") {
        opts.center = options.center;
        opts.btns = options.btns;
        opts.showTimes = options.showTimes;
      }
    } else {
      opts.message = options;
    }
    opts.type = type;
    return opts;
  },
  //提示框
  alert: function(options) {
    return new Promise((resolve) => {
      let opts = Dialog.initParams("alert", options);
      let mountNode = obj.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(dialogComponent, {
        ...opts,
        __remove: () => {
          instance.unmount();
          mountNode.remove();
          resolve();
        }
      });
      const _app = this;
      if (_app && _app.config && _app.config.globalProperties && typeof _app.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = _app.config.globalProperties.dialogComponentWatch;
      }
      instance.mount(mountNode);
    });
  },
  //确认框
  confirm: function(options) {
    return new Promise((resolve) => {
      let opts = Dialog.initParams("confirm", options);
      let mountNode = obj.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(dialogComponent, {
        ...opts,
        __remove: (ok) => {
          instance.unmount();
          mountNode.remove();
          resolve(ok);
        }
      });
      const _app = this;
      if (_app && _app.config && _app.config.globalProperties && typeof _app.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = _app.config.globalProperties.dialogComponentWatch;
      }
      instance.mount(mountNode);
    });
  },
  //信息输入框
  prompt: function(options) {
    return new Promise((resolve) => {
      let opts = Dialog.initParams("prompt", options);
      let mountNode = obj.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(dialogComponent, {
        ...opts,
        __remove: (ok, value) => {
          instance.unmount();
          mountNode.remove();
          resolve({
            ok,
            value
          });
        }
      });
      const _app = this;
      if (_app && _app.config && _app.config.globalProperties && typeof _app.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = _app.config.globalProperties.dialogComponentWatch;
      }
      instance.mount(mountNode);
    });
  },
  //pc端提示框
  Alert: function(options) {
    return new Promise((resolve) => {
      let opts = Dialog.initParams("Alert", options);
      let mountNode = obj.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(dialogPcComponent, {
        ...opts,
        __remove: () => {
          instance.unmount();
          mountNode.remove();
          resolve();
        }
      });
      const _app = this;
      if (_app && _app.config && _app.config.globalProperties && typeof _app.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = _app.config.globalProperties.dialogComponentWatch;
      }
      instance.mount(mountNode);
    });
  },
  //pc端确认框
  Confirm: function(options) {
    return new Promise((resolve) => {
      let opts = Dialog.initParams("Confirm", options);
      let mountNode = obj.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(dialogPcComponent, {
        ...opts,
        __remove: (ok) => {
          instance.unmount();
          mountNode.remove();
          resolve(ok);
        }
      });
      const _app = this;
      if (_app && _app.config && _app.config.globalProperties && typeof _app.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = _app.config.globalProperties.dialogComponentWatch;
      }
      instance.mount(mountNode);
    });
  },
  //pc端信息输入框
  Prompt: function(options) {
    return new Promise((resolve) => {
      let opts = Dialog.initParams("Prompt", options);
      let mountNode = obj.element.string2dom("<div></div>");
      document.body.appendChild(mountNode);
      const instance = createApp(dialogPcComponent, {
        ...opts,
        __remove: (ok, value) => {
          instance.unmount();
          mountNode.remove();
          resolve({
            ok,
            value
          });
        }
      });
      const _app = this;
      if (_app && _app.config && _app.config.globalProperties && typeof _app.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = _app.config.globalProperties.dialogComponentWatch;
      }
      instance.mount(mountNode);
    });
  },
  //注册函数
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
const SwipeCellProps = {
  //是否禁用滑动
  disabled: {
    type: Boolean,
    default: false
  },
  //默认点击center部分关闭展开的左右内容
  centerClose: {
    type: Boolean,
    default: true
  }
};
const _hoisted_1$5 = { class: "mvi-swipe-cell" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-swipe-cell"
  },
  __name: "swipe-cell",
  props: SwipeCellProps,
  emits: ["open", "close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const leftRef = ref(null);
    const rightRef = ref(null);
    const wrapperRef = ref(null);
    const translateX = ref(0);
    const isDown = ref(false);
    const startX = ref(0);
    const movingX = ref(0);
    const openStatus = ref("");
    const animationTimer = ref(null);
    const wrapperStyle = computed(() => {
      return {
        transform: `translate3d(${translateX.value}px, 0px, 0px)`
      };
    });
    const setAnimation = (callback, timeout = 600) => {
      return new Promise((resolve) => {
        if (wrapperRef.value) {
          wrapperRef.value.style.transition = `transform ${timeout}ms cubic-bezier(.18,.89,.32,1)`;
          wrapperRef.value.offsetWidth;
          if (typeof callback == "function") {
            callback();
          }
          if (animationTimer.value) {
            clearTimeout(animationTimer.value);
          }
          animationTimer.value = setTimeout(() => {
            if (wrapperRef.value) {
              wrapperRef.value.style.transition = "";
              wrapperRef.value.offsetWidth;
            }
            resolve();
          }, timeout);
        }
      });
    };
    const open = (placement = "left") => {
      if (props.disabled) {
        return;
      }
      if (placement == "left") {
        if (!leftRef.value) {
          return;
        }
        if (translateX.value == leftRef.value.offsetWidth) {
          return;
        }
        setAnimation(() => {
          if (leftRef.value) {
            translateX.value = leftRef.value.offsetWidth;
          }
        }).then(() => {
          if (openStatus.value == placement) {
            return;
          }
          openStatus.value = placement;
          emits("open", placement);
        });
      } else {
        if (!rightRef.value) {
          return;
        }
        if (translateX.value == -rightRef.value.offsetWidth) {
          return;
        }
        setAnimation(() => {
          if (rightRef.value) {
            translateX.value = -rightRef.value.offsetWidth;
          }
        }).then(() => {
          if (openStatus.value == placement) {
            return;
          }
          openStatus.value = placement;
          emits("open", placement);
        });
      }
    };
    const close = () => {
      if (props.disabled) {
        return;
      }
      if (translateX.value == 0) {
        return;
      }
      setAnimation(() => {
        translateX.value = 0;
      }).then(() => {
        if (openStatus.value) {
          emits("close", openStatus.value);
          openStatus.value = "";
        }
      });
    };
    const handleMouseOpt = (event2) => {
      if (props.disabled) {
        return;
      }
      if (!leftRef.value && !rightRef.value) {
        return;
      }
      if (event2.type == "mousedown") {
        isDown.value = true;
        startX.value = event2.pageX;
        movingX.value = event2.pageX;
      } else if (event2.type == "mousemove") {
        if (isDown.value) {
          if (event2.cancelable) {
            event2.preventDefault();
          }
          const moveX = event2.pageX - movingX.value;
          if (moveX > 0) {
            const width = leftRef.value ? leftRef.value.offsetWidth : obj.element.rem2px(0.1);
            if (translateX.value >= width) {
              return;
            }
          }
          if (moveX < 0) {
            const width = rightRef.value ? rightRef.value.offsetWidth : obj.element.rem2px(0.1);
            if (translateX.value <= -width) {
              return;
            }
          }
          translateX.value += moveX;
          movingX.value = event2.pageX;
        }
      } else if (event2.type == "mouseup") {
        if (isDown.value) {
          isDown.value = false;
          if (event2.pageX == startX.value) {
            if (props.centerClose) {
              close();
            }
            return;
          }
          if (translateX.value > 0) {
            if (leftRef.value) {
              const width = leftRef.value.offsetWidth;
              if (translateX.value > width / 2) {
                setAnimation(() => {
                  translateX.value = width;
                }).then(() => {
                  if (openStatus.value == "left") {
                    return;
                  }
                  openStatus.value = "left";
                  emits("open", openStatus.value);
                });
              } else {
                setAnimation(() => {
                  translateX.value = 0;
                }).then(() => {
                  if (openStatus.value) {
                    emits("close", openStatus.value);
                    openStatus.value = "";
                  }
                });
              }
            } else {
              setAnimation(() => {
                translateX.value = 0;
              }).then(() => {
                if (openStatus.value) {
                  emits("close", openStatus.value);
                  openStatus.value = "";
                }
              });
            }
          }
          if (translateX.value < 0) {
            if (rightRef.value) {
              const width = rightRef.value.offsetWidth;
              if (translateX.value < -width / 2) {
                setAnimation(() => {
                  translateX.value = -width;
                }).then(() => {
                  if (openStatus.value == "right") {
                    return;
                  }
                  openStatus.value = "right";
                  emits("open", openStatus.value);
                });
              } else {
                setAnimation(() => {
                  translateX.value = 0;
                }).then(() => {
                  if (openStatus.value) {
                    emits("close", openStatus.value);
                    openStatus.value = "";
                  }
                });
              }
            } else {
              setAnimation(() => {
                translateX.value = 0;
              }).then(() => {
                if (openStatus.value) {
                  emits("close", openStatus.value);
                  openStatus.value = "";
                }
              });
            }
          }
        }
      }
    };
    const handleTouchOpt = (event2) => {
      if (props.disabled) {
        return;
      }
      if (!leftRef.value && !rightRef.value) {
        return;
      }
      if (event2.type == "touchstart") {
        startX.value = event2.targetTouches[0].pageX;
        movingX.value = event2.targetTouches[0].pageX;
      } else if (event2.type == "touchmove") {
        if (event2.cancelable) {
          event2.preventDefault();
        }
        const moveX = event2.targetTouches[0].pageX - movingX.value;
        if (moveX > 0) {
          const width = leftRef.value ? leftRef.value.offsetWidth : obj.element.rem2px(0.1);
          if (translateX.value >= width) {
            return;
          }
        }
        if (moveX < 0) {
          const width = rightRef.value ? rightRef.value.offsetWidth : obj.element.rem2px(0.1);
          if (translateX.value <= -width) {
            return;
          }
        }
        translateX.value += moveX;
        movingX.value = event2.targetTouches[0].pageX;
      } else if (event2.type == "touchend") {
        if (event2.changedTouches[0].pageX == startX.value) {
          if (props.centerClose) {
            close();
          }
          return;
        }
        if (translateX.value > 0) {
          if (leftRef.value) {
            const width = leftRef.value.offsetWidth;
            if (translateX.value > width / 2) {
              setAnimation(() => {
                translateX.value = width;
              }).then(() => {
                if (openStatus.value == "left") {
                  return;
                }
                openStatus.value = "left";
                emits("open", openStatus.value);
              });
            } else {
              setAnimation(() => {
                translateX.value = 0;
              }).then(() => {
                if (openStatus.value) {
                  emits("close", openStatus.value);
                  openStatus.value = "";
                }
              });
            }
          } else {
            setAnimation(() => {
              translateX.value = 0;
            }).then(() => {
              if (openStatus.value) {
                emits("close", openStatus.value);
                openStatus.value = "";
              }
            });
          }
        }
        if (translateX.value < 0) {
          if (rightRef.value) {
            const width = rightRef.value.offsetWidth;
            if (translateX.value < -width / 2) {
              setAnimation(() => {
                translateX.value = -width;
              }).then(() => {
                if (openStatus.value == "right") {
                  return;
                }
                openStatus.value = "right";
                emits("open", openStatus.value);
              });
            } else {
              setAnimation(() => {
                translateX.value = 0;
              }).then(() => {
                if (openStatus.value) {
                  emits("close", openStatus.value);
                  openStatus.value = "";
                }
              });
            }
          } else {
            setAnimation(() => {
              translateX.value = 0;
            }).then(() => {
              if (openStatus.value) {
                emits("close", openStatus.value);
                openStatus.value = "";
              }
            });
          }
        }
      }
    };
    watch(
      () => props.disabled,
      (newVal) => {
        if (newVal && translateX.value) {
          setAnimation(() => {
            translateX.value = 0;
          }).then(() => {
            if (openStatus.value) {
              emits("close", openStatus.value);
              openStatus.value = "";
            }
          });
        }
      }
    );
    onMounted(() => {
      obj.event.on(document.documentElement, `mousemove.swipeCell_${instance.uid} mouseup.swipeCell_${instance.uid}`, handleMouseOpt);
    });
    onBeforeUnmount(() => {
      if (animationTimer.value) {
        clearTimeout(animationTimer.value);
        animationTimer.value = null;
      }
      obj.event.off(document.documentElement, `mousemove.swipeCell_${instance.uid} mouseup.swipeCell_${instance.uid}`);
    });
    __expose({
      open,
      close
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createElementVNode("div", {
          class: "mvi-swipe-cell-wrapper",
          ref_key: "wrapperRef",
          ref: wrapperRef,
          style: normalizeStyle(wrapperStyle.value)
        }, [
          _ctx.$slots.left ? (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "leftRef",
            ref: leftRef,
            class: "mvi-swipe-cell-left"
          }, [
            renderSlot(_ctx.$slots, "left", {}, void 0, true)
          ], 512)) : createCommentVNode("", true),
          createElementVNode("div", {
            class: "mvi-swipe-cell-center",
            onMousedown: handleMouseOpt,
            onTouchstart: handleTouchOpt,
            onTouchmove: handleTouchOpt,
            onTouchend: handleTouchOpt
          }, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 32),
          _ctx.$slots.right ? (openBlock(), createElementBlock("div", {
            key: 1,
            ref_key: "rightRef",
            ref: rightRef,
            class: "mvi-swipe-cell-right"
          }, [
            renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ], 512)) : createCommentVNode("", true)
        ], 4)
      ]);
    };
  }
});
const SwipeCell = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-61e42a8d"]]);
SwipeCell.install = (app) => {
  app.component(SwipeCell.name, SwipeCell);
};
const TabbarItemProps = {
  //路由参数配置
  route: {
    type: [String, Object],
    default: null
  },
  //图标
  icon: {
    type: [String, Object],
    default: null
  },
  //名称
  name: {
    type: String,
    default: null
  },
  //值
  value: {
    type: [Object, Number, String, Array],
    default: null
  },
  //是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  //徽章角标
  badge: {
    type: Object,
    default: null
  }
};
const TabbarProps = {
  //激活标签的value值
  modelValue: {
    type: [Object, Number, String, Array],
    default: null
  },
  //标签栏的标签配置
  tabs: {
    type: Array,
    default: function() {
      return [];
    }
  },
  //是否固定底部
  fixed: {
    type: Boolean,
    default: false
  },
  //是否显示上边框
  border: {
    type: Boolean,
    default: false
  },
  //层级
  zIndex: {
    type: Number,
    default: 400
  },
  //激活颜色
  activeColor: {
    type: String,
    default: null
  },
  //未激活颜色
  inactiveColor: {
    type: String,
    default: null
  },
  //是否显示点击态
  active: {
    type: Boolean,
    default: true
  },
  //标签排列方式
  flex: {
    type: String,
    default: null
  },
  //设置每个标签左外边距
  offset: {
    type: String,
    default: null
  }
};
const _hoisted_1$4 = ["disabled"];
const _hoisted_2$4 = { class: "mvi-tabbar-item-child" };
const _hoisted_3$4 = ["textContent"];
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-tabbar-item"
  },
  __name: "tabbar-item",
  props: TabbarItemProps,
  setup(__props) {
    const instance = getCurrentInstance();
    const tabbar = inject("tabbar");
    const props = __props;
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const cmpClass = computed(() => {
      let cls = [];
      if (obj.common.equal(props.value, tabbar.props.modelValue)) {
        cls.push("item-active");
      }
      if (tabbar.props.active && !props.disabled && !obj.common.equal(props.value, tabbar.props.modelValue)) {
        cls.push("active");
      }
      return cls;
    });
    const cmpStyle = computed(() => {
      let style = {};
      if (obj.common.equal(props.value, tabbar.props.modelValue)) {
        if (tabbar.props.activeColor) {
          style.color = tabbar.props.activeColor;
        }
      } else {
        if (tabbar.props.inactiveColor) {
          style.color = tabbar.props.inactiveColor;
        }
      }
      return style;
    });
    const cmpRoute = computed(() => {
      if (!props.route) {
        return null;
      }
      let route = {};
      if (typeof props.route == "string") {
        route = {
          path: props.route
        };
      } else if (obj.common.isObject(props.route)) {
        if (typeof props.route.path == "string" && props.route.path) {
          route.path = props.route.path;
        }
        if (typeof props.route.name == "string" && props.route.name) {
          route.name = props.route.name;
        }
        if (obj.common.isObject(props.route.query)) {
          route.query = props.route.query;
        } else {
          route.query = {};
        }
        if (obj.common.isObject(props.route.params)) {
          route.params = props.route.params;
        } else {
          route.params = {};
        }
        if (typeof props.route.replace == "boolean") {
          route.replace = props.route.replace;
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
    });
    const setActive = () => {
      tabbar.emit("item-click", JSON.parse(JSON.stringify(props)));
      if (props.disabled) {
        return;
      }
      if (obj.common.equal(tabbar.props.modelValue, props.value)) {
        return;
      }
      if (cmpRoute.value && instance.appContext.config.globalProperties.$router && instance.appContext.config.globalProperties.$router.replace && instance.appContext.config.globalProperties.$router.push) {
        if (cmpRoute.value.path) {
          if (cmpRoute.value.replace) {
            instance.appContext.config.globalProperties.$router.replace({
              path: cmpRoute.value.path,
              query: cmpRoute.value.query,
              params: cmpRoute.value.params
            });
          } else {
            instance.appContext.config.globalProperties.$router.push({
              path: cmpRoute.value.path,
              query: cmpRoute.value.query,
              params: cmpRoute.value.params
            });
          }
        } else if (cmpRoute.value.name) {
          if (cmpRoute.value.replace) {
            instance.appContext.config.globalProperties.$router.replace({
              name: cmpRoute.value.name,
              query: cmpRoute.value.query,
              params: cmpRoute.value.params
            });
          } else {
            instance.appContext.config.globalProperties.$router.push({
              name: cmpRoute.value.name,
              query: cmpRoute.value.query,
              params: cmpRoute.value.params
            });
          }
        }
      }
      tabbar.emit("update:modelValue", props.value);
      tabbar.emit("change", JSON.parse(JSON.stringify(props)));
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g;
      return openBlock(), createElementBlock("div", {
        disabled: _ctx.disabled || null,
        class: normalizeClass(["mvi-tabbar-item", cmpClass.value]),
        style: normalizeStyle(cmpStyle.value),
        onClick: setActive
      }, [
        createVNode(unref(Badge), {
          show: (_a = _ctx.badge) == null ? void 0 : _a.show,
          class: "mvi-tabbar-badge",
          content: (_b = _ctx.badge) == null ? void 0 : _b.content,
          background: (_c = _ctx.badge) == null ? void 0 : _c.background,
          color: (_d = _ctx.badge) == null ? void 0 : _d.color,
          dot: (_e = _ctx.badge) == null ? void 0 : _e.dot,
          placement: (_f = _ctx.badge) == null ? void 0 : _f.placement,
          offset: (_g = _ctx.badge) == null ? void 0 : _g.offset
        }, {
          default: withCtx(() => [
            createElementVNode("div", _hoisted_2$4, [
              parseIcon.value(_ctx.icon).type || parseIcon.value(_ctx.icon).url ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: "mvi-tabbar-icon",
                style: normalizeStyle({ marginBottom: _ctx.name ? "" : "0px" })
              }, [
                createVNode(unref(Icon), {
                  type: parseIcon.value(_ctx.icon).type,
                  url: parseIcon.value(_ctx.icon).url,
                  spin: parseIcon.value(_ctx.icon).spin,
                  size: parseIcon.value(_ctx.icon).size,
                  color: parseIcon.value(_ctx.icon).color
                }, null, 8, ["type", "url", "spin", "size", "color"])
              ], 4)) : createCommentVNode("", true),
              createElementVNode("span", {
                class: normalizeClass(["mvi-tabbar-name", { small: parseIcon.value(_ctx.icon).type || parseIcon.value(_ctx.icon).url }]),
                textContent: toDisplayString(_ctx.name)
              }, null, 10, _hoisted_3$4)
            ])
          ]),
          _: 1
        }, 8, ["show", "content", "background", "color", "dot", "placement", "offset"])
      ], 14, _hoisted_1$4);
    };
  }
});
const TabbarItem = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-f22270ed"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-tabbar"
  },
  __name: "tabbar",
  props: TabbarProps,
  emits: ["update:modelValue", "item-click", "change"],
  setup(__props, { emit: __emit }) {
    const instance = getCurrentInstance();
    provide("tabbar", instance);
    const props = __props;
    const tabbarItemStyle = computed(() => {
      return (index) => {
        let style = {};
        if (index != 0 && props.offset) {
          style.marginLeft = props.offset;
        }
        return style;
      };
    });
    const tabbarStyle = computed(() => {
      let style = {};
      if (props.fixed && obj.number.isNumber(props.zIndex)) {
        style.zIndex = props.zIndex;
      }
      if (props.flex) {
        style.justifyContent = props.flex;
      }
      return style;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-tabbar", { border: _ctx.border, fixed: _ctx.fixed }]),
        style: normalizeStyle(tabbarStyle.value)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabs, (item, index) => {
          return openBlock(), createBlock(TabbarItem, {
            name: item.name,
            value: item.value,
            icon: item.icon,
            disabled: item.disabled,
            badge: item.badge,
            route: item.route,
            style: normalizeStyle(tabbarItemStyle.value(index))
          }, null, 8, ["name", "value", "icon", "disabled", "badge", "route", "style"]);
        }), 256))
      ], 6);
    };
  }
});
const Tabbar = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-51ac7e70"]]);
Tabbar.install = (app) => {
  app.component(Tabbar.name, Tabbar);
};
const TableProps = {
  //表格数据
  data: {
    type: Array,
    default: function() {
      return [];
    }
  },
  //表格列配置
  columns: {
    type: Array,
    default: function() {
      return [];
    }
  },
  //是否显示表格外边框
  border: {
    type: Boolean,
    default: false
  },
  //是否显示列边框
  columnBorder: {
    type: Boolean,
    default: false
  },
  //是否显示间隔条纹
  stripe: {
    type: Boolean,
    default: false
  },
  //设置表格最大高度
  height: {
    type: String,
    default: null
  },
  //无数据提示
  noDataMsg: {
    type: String,
    default: "暂无数据"
  },
  //是否显示加载状态
  loading: {
    type: Boolean,
    default: false
  },
  //加载文本
  loadText: {
    type: String,
    default: "正在加载中..."
  },
  //表格列是否居中对齐
  center: {
    type: Boolean,
    default: false
  },
  //单元格样式
  cellClass: {
    type: Function,
    default: null
  },
  //主题色
  activeColor: {
    type: String,
    default: null
  }
};
const _hoisted_1$3 = { class: "mvi-table-header" };
const _hoisted_2$3 = {
  cellpadding: "0",
  cellspacing: "0"
};
const _hoisted_3$3 = {
  key: 0,
  class: "mvi-table-sortable"
};
const _hoisted_4$2 = {
  key: 0,
  class: "mvi-table-loading"
};
const _hoisted_5$1 = {
  key: 0,
  cellpadding: "0",
  cellspacing: "0"
};
const _hoisted_6$1 = { class: "mvi-table-column" };
const _hoisted_7$1 = ["innerHTML"];
const _hoisted_8$1 = {
  key: 1,
  class: "mvi-table-nodata"
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-table"
  },
  __name: "table",
  props: TableProps,
  emits: ["check", "sort-cancel", "sort-asc", "sort-desc"],
  setup(__props, { emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const columnAlignKey = ref(0);
    const rowData = ref([]);
    const columnData = ref([]);
    const scrollWidth = ref(0);
    const sortBy = ref("");
    const sortOrder = ref("");
    const checkedRows = ref([]);
    const selectAll = ref(false);
    const headerColumnRefs = ref([]);
    const elRef = ref(null);
    const bodyRef = ref(null);
    const wrapWidth = computed(() => {
      columnAlignKey.value;
      if (headerColumnRefs.value.length) {
        let width = headerColumnRefs.value.reduce((total, _item, index) => {
          const width2 = columnData.value[index].width ? parseWidth(columnData.value[index].width) : obj.element.rem2px(2);
          return total += width2;
        }, 0);
        if (scrollWidth.value) {
          width += scrollWidth.value;
        }
        const tableWidth = obj.element.width(elRef.value);
        return width > tableWidth ? width + "px" : tableWidth + "px";
      }
      return "";
    });
    const headerColumnStyle = computed(() => {
      return (column) => {
        return {
          width: column.width ? parseWidth(column.width) + "px" : "auto"
        };
      };
    });
    const bodyColumnClass = computed(() => {
      return (row, rowIndex, column, columnIndex) => {
        let cls = [];
        if (props.columnBorder) {
          cls.push("border");
        }
        if (column.className) {
          cls.push(column.className);
        }
        if (typeof props.cellClass == "function") {
          cls.push(props.cellClass.apply(instance.proxy, [row, rowIndex, column, columnIndex]) || "");
        }
        return cls;
      };
    });
    const bodyColumnStyle = computed(() => {
      return (_column, index) => {
        columnAlignKey.value;
        return {
          width: headerColumnRefs.value[index] ? obj.element.getCssStyle(headerColumnRefs.value[index], "width") : ""
        };
      };
    });
    const sortIconStyle = computed(() => {
      return (_sortOrder, column) => {
        let style = {};
        if (sortBy.value == column.prop && sortOrder.value == _sortOrder) {
          style.color = props.activeColor || "";
        }
        return style;
      };
    });
    const dataFormat = computed(() => {
      return (row, column) => {
        if (typeof column.format == "function") {
          return column.format.apply(instance.proxy, [row[column.prop], row, column]) || "";
        }
        return row[column.prop] ? row[column.prop] + "" : "";
      };
    });
    const cmpSelectable = computed(() => {
      return (row, rowIndex, column) => {
        if (typeof column.selectable == "function") {
          return column.selectable.apply(instance.proxy, [row, rowIndex]);
        }
        return true;
      };
    });
    const tooltipTitle = computed(() => {
      return (row, column) => {
        const dom = obj.element.string2dom(`<div>${dataFormat.value(row, column)}</div>`);
        return dom.innerText;
      };
    });
    const parseWidth = (val) => {
      if (obj.number.isNumber(val)) {
        return val;
      }
      if (typeof val == "string" && val) {
        if (val.endsWith("px")) {
          return parseFloat(val);
        }
        if (val.endsWith("rem")) {
          return obj.element.rem2px(parseFloat(val));
        }
      }
      return 0;
    };
    const deepClone = (data2) => {
      if (Array.isArray(data2)) {
        return data2.map((item) => {
          return deepClone(item);
        });
      }
      if (obj.common.isObject(data2)) {
        let cloneData = {};
        for (let key in data2) {
          cloneData[key] = deepClone(data2[key]);
        }
        return cloneData;
      }
      return data2;
    };
    const getScrollWidth = () => {
      return bodyRef.value.offsetWidth - bodyRef.value.clientWidth;
    };
    const sortAsc = (column) => {
      if (sortBy.value == column.prop && sortOrder.value == "asc") {
        sortBy.value = "";
        sortOrder.value = "";
        if (typeof column.sortMethod == "function") {
          column.sortMethod.apply(instance.proxy, [sortOrder.value, sortBy.value, rowData.value, column]);
        } else {
          rowData.value = deepClone(props.data);
          emits("sort-cancel", rowData.value);
        }
      } else {
        sortBy.value = column.prop;
        sortOrder.value = "asc";
        if (typeof column.sortMethod == "function") {
          column.sortMethod.apply(instance.proxy, [sortOrder.value, sortBy.value, rowData.value, column]);
        } else {
          rowData.value = rowData.value.sort(function(rowA, rowB) {
            if (obj.number.isNumber(rowA[column.prop]) && obj.number.isNumber(rowB[column.prop])) {
              return rowA[column.prop] - rowB[column.prop];
            }
            return rowA[column.prop].toString().localeCompare(rowB[column.prop].toString(), "zh-CN");
          });
          emits("sort-asc", rowData.value);
        }
      }
    };
    const sortDesc = (column) => {
      if (sortBy.value == column.prop && sortOrder.value == "desc") {
        sortBy.value = "";
        sortOrder.value = "";
        if (typeof column.sortMethod == "function") {
          column.sortMethod.apply(instance.proxy, [sortOrder.value, sortBy.value, rowData.value, column]);
        } else {
          rowData.value = deepClone(props.data);
          emits("sort-cancel", rowData.value);
        }
      } else {
        sortBy.value = column.prop;
        sortOrder.value = "desc";
        if (typeof column.sortMethod == "function") {
          column.sortMethod.apply(instance.proxy, [sortOrder.value, sortBy.value, rowData.value, column]);
        } else {
          rowData.value = rowData.value.sort(function(rowA, rowB) {
            if (obj.number.isNumber(rowA[column.prop]) && obj.number.isNumber(rowB[column.prop])) {
              return rowB[column.prop] - rowA[column.prop];
            }
            return -rowA[column.prop].toString().localeCompare(rowB[column.prop].toString(), "zh-CN");
          });
          emits("sort-desc", rowData.value);
        }
      }
    };
    const allSelect = (column) => {
      if (selectAll.value) {
        checkedRows.value = [];
        for (let i = 0; i < rowData.value.length; i++) {
          if (cmpSelectable.value(rowData.value[i], i, column)) {
            checkedRows.value.push(i);
          }
        }
      } else {
        checkedRows.value = [];
      }
      emits("check", checkedRows.value);
    };
    const doCheck = (rowIndex, column) => {
      if (checkedRows.value.length == rowData.value.filter((item, index) => {
        return cmpSelectable.value(item, index, column);
      }).length) {
        selectAll.value = true;
      } else {
        selectAll.value = false;
      }
      emits("check", checkedRows.value, rowIndex);
    };
    const doLayout = () => {
      scrollWidth.value = getScrollWidth();
      nextTick(() => {
        columnAlignKey.value++;
      });
    };
    watch(
      () => props.data,
      (newVal) => {
        rowData.value = deepClone(newVal);
        nextTick(() => {
          doLayout();
        });
      },
      {
        immediate: true
      }
    );
    watch(
      () => props.columns,
      (newVal) => {
        columnData.value = deepClone(newVal).filter((column) => {
          return !column.hidden;
        });
      },
      {
        immediate: true
      }
    );
    watch(
      () => props.height,
      () => {
        nextTick(() => {
          doLayout();
        });
      },
      {
        immediate: true
      }
    );
    onMounted(() => {
      doLayout();
      obj.event.on(window, `resize.table_${instance.uid}`, () => {
        doLayout();
      });
    });
    onBeforeUnmount(() => {
      obj.event.off(window, `resize.table_${instance.uid}`);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-table", { border: _ctx.border }]),
        ref_key: "elRef",
        ref: elRef
      }, [
        createElementVNode("div", {
          class: "mvi-table-wrap",
          style: normalizeStyle({ width: wrapWidth.value })
        }, [
          createElementVNode("div", _hoisted_1$3, [
            createElementVNode("table", _hoisted_2$3, [
              createElementVNode("tr", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(columnData.value, (column, index) => {
                  return openBlock(), createElementBlock("th", {
                    ref_for: true,
                    ref: (el) => headerColumnRefs.value[index] = el,
                    class: normalizeClass({ border: _ctx.columnBorder }),
                    style: normalizeStyle(headerColumnStyle.value(column))
                  }, [
                    createElementVNode("div", {
                      class: normalizeClass(["mvi-table-column", { center: _ctx.center }])
                    }, [
                      column.type == "selection" ? (openBlock(), createBlock(unref(Checkbox), {
                        key: 0,
                        modelValue: selectAll.value,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectAll.value = $event),
                        size: "0.24rem",
                        onChange: ($event) => allSelect(column),
                        color: _ctx.activeColor
                      }, null, 8, ["modelValue", "onChange", "color"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createElementVNode("span", null, toDisplayString(column.label), 1),
                        column.sortable ? (openBlock(), createElementBlock("span", _hoisted_3$3, [
                          createVNode(unref(Icon), {
                            type: "caret-up",
                            class: normalizeClass({ active: sortBy.value == column.prop && sortOrder.value == "asc" }),
                            onClick: ($event) => sortAsc(column),
                            style: normalizeStyle(sortIconStyle.value("asc", column))
                          }, null, 8, ["class", "onClick", "style"]),
                          createVNode(unref(Icon), {
                            type: "caret-down",
                            class: normalizeClass({ active: sortBy.value == column.prop && sortOrder.value == "desc" }),
                            onClick: ($event) => sortDesc(column),
                            style: normalizeStyle(sortIconStyle.value("desc", column))
                          }, null, 8, ["class", "onClick", "style"])
                        ])) : createCommentVNode("", true)
                      ], 64))
                    ], 2)
                  ], 6);
                }), 256)),
                scrollWidth.value ? (openBlock(), createElementBlock("th", {
                  key: 0,
                  class: "placeholder",
                  style: normalizeStyle({ width: scrollWidth.value + "px" })
                }, null, 4)) : createCommentVNode("", true)
              ])
            ])
          ]),
          createElementVNode("div", {
            ref_key: "bodyRef",
            ref: bodyRef,
            class: normalizeClass(["mvi-table-body", { overflow: !!_ctx.height }]),
            style: normalizeStyle({ maxHeight: _ctx.height })
          }, [
            _ctx.loading ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
              createVNode(unref(Loading), {
                color: "#bbb",
                size: "0.32rem"
              }),
              createElementVNode("span", null, toDisplayString(_ctx.loadText), 1)
            ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              rowData.value.length ? (openBlock(), createElementBlock("table", _hoisted_5$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(rowData.value, (row, rowIndex) => {
                  return openBlock(), createElementBlock("tr", {
                    class: normalizeClass({ stripe: _ctx.stripe })
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(columnData.value, (column, columnIndex) => {
                      return openBlock(), createElementBlock("td", {
                        class: normalizeClass(bodyColumnClass.value(row, rowIndex, column, columnIndex)),
                        style: normalizeStyle(bodyColumnStyle.value(column, columnIndex))
                      }, [
                        createElementVNode("div", _hoisted_6$1, [
                          column.type == "selection" ? (openBlock(), createElementBlock("div", {
                            key: 0,
                            class: normalizeClass(["mvi-table-column-item", { center: _ctx.center }])
                          }, [
                            createVNode(unref(Checkbox), {
                              modelValue: checkedRows.value,
                              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => checkedRows.value = $event),
                              value: rowIndex,
                              size: "0.24rem",
                              onChange: ($event) => doCheck(rowIndex, column),
                              color: _ctx.activeColor,
                              disabled: !cmpSelectable.value(row, rowIndex, column)
                            }, null, 8, ["modelValue", "value", "onChange", "color", "disabled"])
                          ], 2)) : column.type == "custom" && _ctx.$slots.custom ? (openBlock(), createElementBlock("div", {
                            key: 1,
                            class: normalizeClass(["mvi-table-column-item", { center: _ctx.center }])
                          }, [
                            renderSlot(_ctx.$slots, "custom", {
                              row,
                              rowIndex,
                              column,
                              columnIndex
                            }, void 0, true)
                          ], 2)) : (openBlock(), createBlock(unref(Tooltip), {
                            key: 2,
                            class: "mvi-table-column-tooltip",
                            disabled: !column.ellipsis || !tooltipTitle.value(row, column),
                            block: "",
                            title: tooltipTitle.value(row, column),
                            trigger: "hover",
                            placement: _ctx.center ? "bottom" : "bottom-start"
                          }, {
                            default: withCtx(() => [
                              createElementVNode("div", {
                                class: normalizeClass(["mvi-table-column-item", { center: _ctx.center }])
                              }, [
                                createElementVNode("div", {
                                  innerHTML: dataFormat.value(row, column),
                                  class: normalizeClass({ ellipsis: column.ellipsis })
                                }, null, 10, _hoisted_7$1)
                              ], 2)
                            ]),
                            _: 2
                          }, 1032, ["disabled", "title", "placement"]))
                        ])
                      ], 6);
                    }), 256))
                  ], 2);
                }), 256))
              ])) : (openBlock(), createElementBlock("div", _hoisted_8$1, toDisplayString(_ctx.noDataMsg), 1))
            ], 64))
          ], 6)
        ], 4)
      ], 2);
    };
  }
});
const Table = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-5910946c"]]);
Table.install = (app) => {
  app.component(Table.name, Table);
};
const TabsProps = {
  //tabs类型
  type: {
    type: String,
    default: "default",
    validator(value) {
      return ["default", "card"].includes(value);
    }
  },
  //激活的tab序列
  modelValue: {
    type: Number,
    default: 0
  },
  //tab切换动画
  animation: {
    type: String,
    default: "none",
    validator(value) {
      return ["none", "slide", "fade"].includes(value);
    }
  },
  //当animation为slide或者fade时的动画时长
  timeout: {
    type: Number,
    default: 500
  },
  //当标题过长时是否省略，标题栏最大长度只有1/n，n表示标题栏个数
  ellipsis: {
    type: Boolean,
    default: true
  },
  //type="default"下是否显示选项卡头部下边框
  border: {
    type: Boolean,
    default: false
  },
  //type="default"下布局方式
  flex: {
    type: String,
    default: "space-between"
  },
  //type="default"下每个选项卡头部距离左侧的距离
  offset: {
    type: String,
    default: "0"
  },
  //激活颜色
  activeColor: {
    type: String,
    default: null
  }
};
const _hoisted_1$2 = { class: "mvi-tabs" };
const _hoisted_2$2 = ["onClick", "disabled"];
const _hoisted_3$2 = ["innerHTML"];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-tabs"
  },
  __name: "tabs",
  props: TabsProps,
  emits: ["update:modelValue", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const instance = getCurrentInstance();
    componentIsMatch(instance, "m-tab", ["Tabs", "Tab"]);
    const props = __props;
    const emits = __emit;
    const children = ref([]);
    const slideLeft = ref(0);
    const slideWidth = ref(0);
    const current = ref(props.modelValue);
    const headersRef = ref(null);
    const contentRef = ref(null);
    const sliderStyle = computed(() => {
      let style = {};
      if (props.animation == "slide" || props.animation == "fade") {
        style.transition = "left " + props.timeout + "ms,width " + props.timeout + "ms";
      }
      if (props.activeColor) {
        style.background = props.activeColor;
      }
      style.width = slideWidth.value + "px";
      style.left = slideLeft.value + "px";
      return style;
    });
    const headersStyle = computed(() => {
      let style = {};
      if (props.flex && props.type == "default") {
        style.justifyContent = props.flex;
      }
      if (props.type == "card" && props.activeColor) {
        style.borderColor = props.activeColor;
      }
      return style;
    });
    const headerStyle = computed(() => {
      return (index) => {
        let style = {};
        if (props.offset && index != 0 && props.type == "default") {
          style.marginLeft = props.offset;
        }
        if (props.activeColor) {
          style.borderColor = props.activeColor;
          if (props.modelValue == index) {
            if (props.type == "default") {
              style.color = props.activeColor;
            } else {
              style.background = props.activeColor;
            }
          }
        }
        style.maxWidth = `calc(100% / ${children.value.length})`;
        return style;
      };
    });
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: "",
          url: "",
          color: "",
          size: ""
        };
        if (obj.common.isObject(params)) {
          if (typeof params.spin == "boolean") {
            icon.spin = params.spin;
          }
          if (typeof params.type == "string") {
            icon.type = params.type;
          }
          if (typeof params.url == "string") {
            icon.url = params.url;
          }
          if (typeof params.color == "string") {
            icon.color = params.color;
          }
          if (typeof params.size == "string") {
            icon.size = params.size;
          }
        } else if (typeof params == "string") {
          icon.type = params;
        }
        return icon;
      };
    });
    const setHeight = () => {
      if (children.value[current.value] && contentRef.value) {
        contentRef.value.style.height = children.value[current.value].proxy.$el.offsetHeight + "px";
      }
    };
    const setSlider = () => {
      if (props.type == "card") {
        return;
      }
      if (!headersRef.value) {
        return;
      }
      slideWidth.value = parseFloat(obj.element.getCssStyle(headersRef.value.querySelector(".mvi-tab-header.active"), "width"));
      slideLeft.value = obj.element.getElementPoint(headersRef.value.querySelector(".mvi-tab-header.active"), headersRef.value).left;
    };
    const clickHeader = (item, index) => {
      if (item.props.disabled) {
        return;
      }
      if (props.modelValue == index) {
        return;
      }
      emits("update:modelValue", index);
      emits("change", index);
    };
    const to = (newValue, oldValue) => {
      for (let i = 0; i < children.value.length; i++) {
        children.value[i].exposed.show = false;
        if (newValue < oldValue) {
          children.value[i].exposed.back = true;
        } else {
          children.value[i].exposed.back = false;
        }
      }
      if (children.value[newValue]) {
        children.value[newValue].exposed.show = true;
        if (!children.value[newValue].exposed.firstShow) {
          children.value[newValue].exposed.firstShow = true;
        }
      }
      nextTick(() => {
        current.value = newValue;
        setHeight();
        setSlider();
      });
    };
    watch(
      () => props.modelValue,
      (newValue, oldValue) => {
        to(newValue, oldValue);
      }
    );
    onMounted(() => {
      nextTick(() => {
        setSlider();
      });
      setHeight();
      obj.event.on(window, `resize.tabs_${instance.uid}`, setHeight);
    });
    onBeforeUnmount(() => {
      obj.event.off(window, `resize.tabs_${instance.uid}`);
    });
    provide("tabs", instance);
    provide("tabChildren", children);
    __expose({
      setHeight,
      setSlider,
      to
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createElementVNode("div", {
          ref_key: "headersRef",
          ref: headersRef,
          class: normalizeClass(["mvi-tabs-header", { card: _ctx.type == "card", border: _ctx.type == "default" && _ctx.border }]),
          style: normalizeStyle(headersStyle.value)
        }, [
          _ctx.type == "default" ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "mvi-tabs-slider",
            style: normalizeStyle(sliderStyle.value)
          }, null, 4)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(children.value, (item, index) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(["mvi-tab-header", { active: _ctx.modelValue == index, ellipsis: _ctx.ellipsis }]),
              onClick: ($event) => clickHeader(item, index),
              style: normalizeStyle(headerStyle.value(index)),
              disabled: item.props.disabled || null
            }, [
              item.props.placement == "left" && (parseIcon.value(item.props.icon).type || parseIcon.value(item.props.icon).url) ? (openBlock(), createBlock(unref(Icon), {
                key: 0,
                class: normalizeClass(["mvi-tab-icon", { left: !!item.props.title }]),
                type: parseIcon.value(item.props.icon).type,
                url: parseIcon.value(item.props.icon).url,
                spin: parseIcon.value(item.props.icon).spin,
                size: parseIcon.value(item.props.icon).size,
                color: parseIcon.value(item.props.icon).color
              }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
              item.props.title ? (openBlock(), createElementBlock("span", {
                key: 1,
                class: "mvi-tab-header-text",
                innerHTML: item.props.title
              }, null, 8, _hoisted_3$2)) : createCommentVNode("", true),
              item.props.placement == "right" && (parseIcon.value(item.props.icon).type || parseIcon.value(item.props.icon).url) ? (openBlock(), createBlock(unref(Icon), {
                key: 2,
                class: normalizeClass(["mvi-tab-icon", { right: !!item.props.title }]),
                type: parseIcon.value(item.props.icon).type,
                url: parseIcon.value(item.props.icon).url,
                spin: parseIcon.value(item.props.icon).spin,
                size: parseIcon.value(item.props.icon).size,
                color: parseIcon.value(item.props.icon).color
              }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
            ], 14, _hoisted_2$2);
          }), 256))
        ], 6),
        createElementVNode("div", {
          class: "mvi-tabs-content",
          ref_key: "contentRef",
          ref: contentRef
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 512)
      ]);
    };
  }
});
const Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-cc8fba14"]]);
Tabs.install = (app) => {
  app.component(Tabs.name, Tabs);
};
const TabProps = {
  //标题
  title: {
    type: String,
    default: ""
  },
  //标题侧边显示的图标
  icon: {
    type: [String, Object],
    default: null
  },
  //是否禁用选项卡
  disabled: {
    type: Boolean,
    default: false
  },
  //图标位置
  placement: {
    type: String,
    default: "left",
    validator(value) {
      return ["left", "right"].includes(value);
    }
  }
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-tab"
  },
  __name: "tab",
  props: TabProps,
  setup(__props, { expose: __expose }) {
    const instance = getCurrentInstance();
    const tabs = inject("tabs", null);
    const tabChildren = inject("tabChildren", null);
    parentIsMatch(tabChildren, tabs, "m-tabs", ["Tabs", "Tab"]);
    tabChildren.value.push(instance);
    const back = ref(false);
    const tabStyle = computed(() => {
      let style = {};
      if (tabs.props.animation == "slide") {
        style.transition = "left " + tabs.props.timeout + "ms,opacity " + tabs.props.timeout + "ms";
      } else if (tabs.props.animation == "fade") {
        style.transition = "opacity " + tabs.props.timeout + "ms";
      }
      return style;
    });
    const tabIndex = computed(() => {
      return tabChildren.value.findIndex((vm) => {
        return obj.common.equal(vm.uid, instance.uid);
      });
    });
    const show = ref(tabs.props.modelValue == tabIndex.value);
    const firstShow = ref(tabs.props.modelValue == tabIndex.value);
    onBeforeUnmount(() => {
      if (tabChildren && tabChildren.value) {
        tabChildren.value.splice(tabIndex.value, 1);
      }
      if (tabs) {
        if (tabs.props.modelValue > 0) {
          tabs.emit("update:modelValue", tabs.props.modelValue - 1);
          tabs.emit("change", tabs.props.modelValue - 1);
        } else {
          tabs.exposed.to(0, 0);
        }
      }
    });
    __expose(
      reactive({
        show,
        firstShow,
        back
      })
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: "mvi-tab-" + unref(tabs).props.animation + (back.value ? "-back" : "")
      }, {
        default: withCtx(() => [
          firstShow.value ? withDirectives((openBlock(), createElementBlock("div", {
            key: 0,
            class: "mvi-tab",
            style: normalizeStyle(tabStyle.value)
          }, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 4)), [
            [vShow, show.value]
          ]) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name"]);
    };
  }
});
const Tab = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-5bbeab93"]]);
Tab.install = (app) => {
  app.component(Tab.name, Tab);
};
const CarouselProps = {
  //当前轮播序列
  modelValue: {
    type: Number,
    default: 0
  },
  //是否自动轮播
  autoplay: {
    type: Boolean,
    default: false
  },
  //是否循环轮播
  loop: {
    type: Boolean,
    default: false
  },
  //自动轮播的切换速度
  speed: {
    type: Number,
    default: 500
  },
  //自定轮播的间隔
  interval: {
    type: Number,
    default: 3e3
  },
  //模式
  mode: {
    type: String,
    default: "slide",
    validator(value) {
      return ["slide", "fade"].includes(value);
    }
  },
  //分页指示器配置
  indicators: {
    type: [Boolean, Object],
    default: false
  },
  //前后控制器是否显示
  controls: {
    type: Boolean,
    default: false
  },
  //滑动模式下是否纵向轮播
  vertical: {
    type: Boolean,
    default: false
  },
  //滑动模式下是否可以通过手势触摸滑动
  touchable: {
    type: Boolean,
    default: true
  }
};
class Clip {
  constructor(options) {
    this.id = void 0;
    this.style = void 0;
    this.value = void 0;
    this.speed = void 0;
    this.free = false;
    this.interval = 0;
    this.$options = options;
    this.$unit = void 0;
    this.$requestAnimationFrame = void 0;
    this.state = 0;
    this.$events = [];
    this.$chainClip = void 0;
    this.$type = 0;
    this.$initValue = void 0;
    this.$parent = void 0;
    this.$timeStamp = 0;
    this.__init();
  }
  /**
   * 初始化参数
   */
  __init() {
    if (!this.$options) {
      this.free = true;
      this.$options = void 0;
    } else if (typeof this.$options == "object" && this.$options) {
      if (typeof this.$options.free == "boolean") {
        this.free = this.$options.free;
      } else {
        this.free = false;
      }
      if (!this.free) {
        if (typeof this.$options.style == "string" && this.$options.style) {
          this.style = this.$options.style;
        } else {
          throw new TypeError("The style argument should be a string");
        }
        if (typeof this.$options.value == "number") {
          this.value = this.$options.value;
          this.$unit = null;
        } else if (typeof this.$options.value == "string" && this.$options.value) {
          this.value = parseFloat(this.$options.value);
          if (this.$options.value.endsWith("px")) {
            this.$unit = "px";
          } else if (this.$options.value.endsWith("rem")) {
            this.$unit = "rem";
          } else if (this.$options.value.endsWith("em")) {
            this.$unit = "em";
          } else {
            throw new Error("Currently, only attribute values of px, rem, and em units are supported");
          }
        } else {
          throw new TypeError("The value argument should be a number or string");
        }
        if (typeof this.$options.speed == "number") {
          this.speed = this.$options.speed;
        } else {
          throw new TypeError("The speed argument should be a number");
        }
      }
    } else {
      throw new Error("The construction parameter of the clip must be a non-null object");
    }
    this.$requestAnimationFrame = this.__getRequestAnimationFrame();
    this.$events = [
      //动画开始事件
      {
        name: "start",
        handler: function() {
        }
      },
      //动画结束事件
      {
        name: "complete",
        handler: function() {
        }
      },
      //动画更新之前
      {
        name: "beforeUpdate",
        handler: function() {
        }
      },
      //动画更新事件
      {
        name: "update",
        handler: function() {
        }
      },
      //动画停止事件
      {
        name: "stop",
        handler: function() {
        }
      },
      //动画重置事件
      {
        name: "reset",
        handler: function() {
        }
      }
    ];
  }
  /**
   * 执行动画
   */
  start() {
    if (!this.$parent || !this.$parent.$el) {
      throw new ReferenceError("The clip has not been added to the animator");
    }
    if (!this.free) {
      let oldValue = this.__getUnitCssValue();
      if (this.speed > 0 && oldValue >= this.value) {
        return this;
      }
      if (this.speed < 0 && oldValue <= this.value) {
        return this;
      }
    }
    if (this.state == 1 || this.state == 3) {
      return this;
    }
    this.$timeStamp = Date.now();
    this.interval = 0;
    this.state = 1;
    this.$parent.$options.start.apply(this.$parent, [this, this.$parent.$el]);
    this.__emit("start");
    let doFun = () => {
      if (this.state != 1) {
        return;
      }
      let now = Date.now();
      this.interval = now - this.$timeStamp;
      this.$timeStamp = now;
      if (this.free) {
        this.$parent.$options.beforeUpdate.apply(this.$parent, [this, this.$parent.$el]);
        this.__emit("beforeUpdate");
        this.$parent.$options.update.apply(this.$parent, [this, this.$parent.$el]);
        this.__emit("update");
        this.$requestAnimationFrame.apply(window, [doFun]);
      } else {
        let currentValue = this.__getUnitCssValue();
        this.$parent.$options.beforeUpdate.apply(this.$parent, [this, this.$parent.$el, this.style, currentValue]);
        this.__emit("beforeUpdate", [this.style, currentValue]);
        let newValue = currentValue + this.speed;
        if (this.$unit) {
          this.$parent.$el.style.setProperty(this.style, newValue + this.$unit, "important");
        } else {
          this.$parent.$el.style.setProperty(this.style, newValue, "important");
        }
        this.$parent.$options.update.apply(this.$parent, [this, this.$parent.$el, this.style, newValue]);
        this.__emit("update", [this.style, newValue]);
        if (this.speed > 0 && newValue >= this.value || this.speed < 0 && newValue <= this.value) {
          if (this.$unit) {
            this.$parent.$el.style.setProperty(this.style, this.value + this.$unit, "important");
          } else {
            this.$parent.$el.style.setProperty(this.style, this.value, "important");
          }
          this.$timeStamp = 0;
          this.interval = 0;
          this.state = 3;
          this.$parent.$options.complete.apply(this.$parent, [this, this.$parent.$el]);
          this.__emit("complete");
          if (this.$chainClip) {
            if (this.$parent.hasClip(this.$chainClip)) {
              this.$parent.removeClip(this.$chainClip).addClip(this.$chainClip);
            } else {
              this.$parent.addClip(this.$chainClip);
            }
            this.$chainClip.start();
          }
        } else {
          this.$requestAnimationFrame.apply(window, [doFun]);
        }
      }
    };
    this.$requestAnimationFrame.apply(window, [doFun]);
    return this;
  }
  /**
   * 停止动画
   */
  stop() {
    if (!this.$parent || !this.$parent.$el) {
      throw new ReferenceError("The clip has not been added to the animator");
    }
    if (this.state != 1) {
      return this;
    }
    this.$timeStamp = 0;
    this.interval = 0;
    this.state = 2;
    this.$parent.$options.stop.apply(this.$parent, [this, this.$parent.$el]);
    this.__emit("stop");
    return this;
  }
  /**
   * 重置动画
   */
  reset(reStoreStyle = true) {
    if (!this.$parent || !this.$parent.$el) {
      throw new ReferenceError("The clip has not been added to the animator");
    }
    if (this.state == 0) {
      return this;
    }
    this.$timeStamp = 0;
    this.interval = 0;
    this.state = 0;
    if (!this.free && reStoreStyle) {
      this.$parent.$el.style.setProperty(this.style, this.$initValue, "important");
    }
    this.$parent.$options.reset.apply(this.$parent, [this, this.$parent.$el]);
    this.__emit("reset");
    if (this.$type == 1) {
      this.$parent.removeClip(this);
    }
    return this;
  }
  /**
   * 连续执行动画
   * @param {Object} clip
   */
  chain(clip) {
    if (!clip) {
      throw new TypeError("The parameter is not defined");
    }
    if (!(clip instanceof Clip)) {
      throw new TypeError("The parameter is not a Clip instance");
    }
    if (clip.$parent) {
      throw new ReferenceError("The clip has been added to an animator instance and cannot be passed as a chain argument");
    }
    clip.$type = 1;
    this.$chainClip = clip;
    return clip;
  }
  /**
   * 主动触发完成事件
   */
  emitComplete() {
    if (!this.free) {
      return;
    }
    if (this.state == 0 || this.state == 3) {
      return;
    }
    this.state = 3;
    this.$parent.$options.complete.apply(this.$parent, [this, this.$parent.$el]);
    this.__emit("complete");
    if (this.$chainClip) {
      if (this.$parent.hasClip(this.$chainClip)) {
        this.$parent.removeClip(this.$chainClip).addClip(this.$chainClip);
      } else {
        this.$parent.addClip(this.$chainClip);
      }
      this.$chainClip.start();
    }
  }
  /**
   * 自定义事件执行
   * @param {Object} eventName
   * @param {Object} handler
   */
  on(eventName, handler) {
    let event2 = this.__getEvent(eventName);
    if (event2) {
      event2.handler = handler;
    } else {
      throw new Error(eventName + " is an illegal event");
    }
    return this;
  }
  /**
   * requestAnimationFrame兼容性封装
   */
  __getRequestAnimationFrame() {
    let animation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
    if (!animation) {
      let lastTime = 0;
      animation = function(callback) {
        let currTime = Date.now();
        let timeToCall = Math.max(0, 1e3 / 60 - (currTime - lastTime));
        window.setTimeout(callback, timeToCall);
        lastTime = currTime + timeToCall;
      };
    }
    return animation;
  }
  /**
   * 触发自定义事件
   * @param {Object} eventName
   * @param {Object} params
   */
  __emit(eventName, params) {
    let event2 = this.__getEvent(eventName);
    if (event2) {
      if (params) {
        event2.handler.apply(this, [this.$parent.$el, ...params]);
      } else {
        event2.handler.apply(this, [this.$parent.$el]);
      }
    }
  }
  /**
   * 获取事件数组中指定事件
   * @param {Object} eventName
   */
  __getEvent(eventName) {
    let arr = this.$events.filter((event2) => {
      return event2.name == eventName;
    });
    return arr[0];
  }
  /**
   * 获取元素基于单位$unit的值
   */
  __getUnitCssValue() {
    let value = parseFloat(this.__getCssStyle(this.$parent.$el, this.style));
    if (this.$unit == "rem") {
      return this.__px2rem(value);
    } else if (this.$unit == "em") {
      return this.__px2em(this.$parent.$el, value);
    }
    return value;
  }
  /**
   * 获取元素指定样式值
   * @param {Object} el
   * @param {Object} cssName
   */
  __getCssStyle(el, cssName) {
    if (typeof cssName == "string") {
      let cssText = "";
      if (document.defaultView && document.defaultView.getComputedStyle) {
        cssText = document.defaultView.getComputedStyle(el)[cssName];
      } else {
        cssText = el.currentStyle[cssName];
      }
      return cssText;
    } else {
      return null;
    }
  }
  /**
   * rem转为px
   * @param {Object} number
   */
  __rem2px(number2) {
    let fs = this.__getCssStyle(document.documentElement, "font-size");
    return number2 * parseFloat(fs);
  }
  /**
   * px转为rem
   * @param {Object} number
   */
  __px2rem(number2) {
    let fs = this.__getCssStyle(document.documentElement, "font-size");
    return number2 / parseFloat(fs);
  }
  /**
   * px转为em
   * @param {Object} el
   * @param {Object} number
   */
  __px2em(el, number2) {
    let parentNode = el.parentNode || el.parentElement;
    let fs = this.__getCssStyle(parentNode, "font-size");
    return number2 / parseFloat(fs);
  }
  /**
   * em转为px
   * @param {Object} el
   * @param {Object} number
   */
  __em2px(el, number2) {
    let parentNode = el.parentNode || el.parentElement;
    let fs = this.__getCssStyle(parentNode, "font-size");
    return number2 * parseFloat(fs);
  }
}
class Animator {
  //构造方法
  constructor(el, options) {
    this.$el = el;
    this.$options = options;
    this.clips = [];
    this.__init();
  }
  /**
   * 初始化方法
   */
  __init() {
    if (typeof this.$el == "string" && this.$el) {
      this.$el = document.body.querySelector(this.$el);
    }
    if (!this.$el) {
      throw new ReferenceError("The first construction argument of an animator should be an element or selector");
    }
    if (!(this.$el instanceof Node) || this.$el.nodeType !== 1) {
      throw new TypeError("The first construction argument of an animator should be an element or selector");
    }
    if (typeof this.$options != "object" || !this.$options) {
      this.$options = {};
    }
    if (typeof this.$options.start != "function") {
      this.$options.start = function() {
      };
    }
    if (typeof this.$options.complete != "function") {
      this.$options.complete = function() {
      };
    }
    if (typeof this.$options.beforeUpdate != "function") {
      this.$options.beforeUpdate = function() {
      };
    }
    if (typeof this.$options.update != "function") {
      this.$options.update = function() {
      };
    }
    if (typeof this.$options.stop != "function") {
      this.$options.stop = function() {
      };
    }
    if (typeof this.$options.reset != "function") {
      this.$options.reset = function() {
      };
    }
  }
  /**
   * 判断是否包含某个clip
   * @param {Object} clip
   */
  hasClip(clip) {
    if (!clip.$parent || typeof clip.id != "number" || isNaN(clip.id)) {
      return false;
    }
    return this.clips.some((item) => {
      return item.id === clip.id;
    });
  }
  /**
   * 将clip添加到队列
   * @param {Object} clip
   */
  addClip(clip) {
    if (!clip) {
      throw new TypeError("Parameter does not exist");
    }
    if (!(clip instanceof Clip)) {
      throw new TypeError("The parameter is not a Clip instance");
    }
    if (!this.hasClip(clip) && clip.$parent) {
      throw new Error("The clip has been added to other animator");
    }
    if (this.hasClip(clip)) {
      throw new Error("The clip has been added to the animator");
    }
    if (this.clips.length == 0) {
      clip.id = 0;
    } else {
      let maxClipId = this.clips[0].id;
      clip.id = maxClipId + 1;
    }
    clip.$parent = this;
    if (!clip.free) {
      if (clip.$unit) {
        clip.$initValue = clip.__getUnitCssValue() + clip.$unit;
      } else {
        clip.$initValue = clip.__getUnitCssValue();
      }
    }
    this.clips.unshift(clip);
    return this;
  }
  /**
   * 将clip移出队列
   * @param {Object} clip
   */
  removeClip(clip) {
    if (!clip) {
      throw new TypeError("Parameter does not exist");
    }
    if (!(clip instanceof Clip)) {
      throw new TypeError("The parameter is not a Clip instance");
    }
    if (!clip.$parent || typeof clip.id != "number" || isNaN(clip.id)) {
      throw new Error("The clip has not been added to the animator");
    }
    if (!this.hasClip(clip)) {
      throw new Error("The clip does not belong to the animator");
    }
    this.clips = this.clips.filter((item) => {
      return item.id != clip.id;
    });
    clip.state = 0;
    clip.$timeStamp = 0;
    clip.interval = 0;
    if (!clip.free) {
      clip.$parent.$el.style.setProperty(clip.style, clip.$initValue, "important");
      clip.$initValue = void 0;
    }
    clip.$parent = void 0;
    clip.id = void 0;
    return this;
  }
  /**
   * 移除全部clip
   */
  removeAllClips() {
    let clips = [...this.clips];
    clips.forEach((clip) => {
      this.removeClip(clip);
    });
    return this;
  }
  /**
   * 获取正在运行的clip
   */
  getClips() {
    return this.clips.filter((clip) => {
      return clip.state == 1;
    });
  }
  /**
   * 获取停止状态的clip
   */
  getStopClips() {
    return this.clips.filter((clip) => {
      return clip.state == 2;
    });
  }
  /**
   * 获取已完成的clip
   */
  getCompleteClips() {
    return this.clips.filter((clip) => {
      return clip.state == 3;
    });
  }
  /**
   * 执行动画
   */
  start() {
    this.clips.forEach((clip) => {
      clip.start();
    });
    return this;
  }
  /**
   * 停止动画
   */
  stop() {
    this.clips.forEach((clip) => {
      clip.stop();
    });
    return this;
  }
  /**
   * 重置动画
   */
  reset(reStoreStyle = true) {
    this.clips.forEach((clip) => {
      clip.reset(reStoreStyle);
    });
    return this;
  }
}
const _hoisted_1$1 = { class: "mvi-carousel" };
const _hoisted_2$1 = {
  key: 0,
  class: "mvi-carousel-fades"
};
const _hoisted_3$1 = {
  key: 1,
  class: "mvi-carousel-indicators"
};
const _hoisted_4$1 = ["onClick"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-carousel"
  },
  __name: "carousel",
  props: CarouselProps,
  emits: ["update:modelValue", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const instance = getCurrentInstance();
    componentIsMatch(instance, "m-carousel-item", ["Carousel", "CarouselItem"]);
    const props = __props;
    const emits = __emit;
    const children = ref([]);
    provide("carousel", instance);
    provide("carouselItemChildren", children);
    const autoplayTimer = ref(null);
    const slidesRef = ref(null);
    const slideAnimation = ref(null);
    const currentSlideValue = ref(0);
    const initTouchPoint = ref(0);
    const everyTouchPoint = ref(0);
    const touchTotal = ref(0);
    const lazyUpdate = ref(false);
    const clipInterval = ref(1e3 / 60);
    const isMouseDown = ref(false);
    const cmpIndicators = computed(() => {
      let indicators = {
        show: false,
        active: "",
        inactive: ""
      };
      if (typeof props.indicators == "boolean") {
        indicators.show = props.indicators;
      } else if (obj.common.isObject(props.indicators)) {
        if (typeof props.indicators.show == "boolean") {
          indicators.show = props.indicators.show;
        }
        if (typeof props.indicators.active == "string" && props.indicators.active) {
          indicators.active = props.indicators.active;
        }
        if (typeof props.indicators.inactive == "string" && props.indicators.inactive) {
          indicators.inactive = props.indicators.inactive;
        }
      }
      return indicators;
    });
    const slidesStyle = computed(() => {
      let style = {};
      if (props.vertical) {
        style.height = `calc(100% * ${children.value.length})`;
      } else {
        style.width = `calc(100% * ${children.value.length})`;
      }
      return style;
    });
    const publicChildren = computed(() => {
      if (props.mode == "slide" && props.loop) {
        return children.value.filter((child) => {
          return !child.attrs["is-cloned"];
        });
      }
      return children.value;
    });
    const carouselItemSize = computed(() => {
      if (!slidesRef.value) {
        return 0;
      }
      return (props.vertical ? slidesRef.value.offsetHeight : slidesRef.value.offsetWidth) / children.value.length;
    });
    const FirstCarouselItem = defineComponent(() => {
      return () => {
        if (props.loop && publicChildren.value.length) {
          const vnode = cloneVNode(publicChildren.value[0].vnode);
          return h(vnode, {
            //表示该组件是克隆的
            "is-cloned": true
          });
        }
        return null;
      };
    });
    const LastCarouselItem = defineComponent(() => {
      return () => {
        if (props.loop && publicChildren.value.length) {
          const vnode = publicChildren.value[publicChildren.value.length - 1].vnode;
          return h(vnode, {
            //表示该组件是克隆的
            "is-cloned": true
          });
        }
        return null;
      };
    });
    const setIndex = (val, reset = false) => {
      emits("update:modelValue", val);
      emits("change", val);
      if (reset && props.autoplay) {
        setAutoplay();
      }
    };
    const setAutoplay = () => {
      if (!props.autoplay) {
        return;
      }
      if (autoplayTimer.value) {
        clearInterval(autoplayTimer.value);
        autoplayTimer.value = null;
      }
      autoplayTimer.value = setInterval(() => {
        if (props.loop) {
          setIndex(props.modelValue == publicChildren.value.length - 1 ? 0 : props.modelValue + 1);
        } else {
          const isLast = props.modelValue == publicChildren.value.length - 1;
          if (isLast) {
            clearInterval(autoplayTimer.value);
            autoplayTimer.value = null;
            return;
          }
          setIndex(props.modelValue + 1);
        }
      }, props.interval + props.speed);
    };
    const setPrev = () => {
      if (props.loop) {
        setIndex(props.modelValue == 0 ? publicChildren.value.length - 1 : props.modelValue - 1, true);
      } else {
        if (props.modelValue == 0) {
          return;
        }
        setIndex(props.modelValue - 1, true);
      }
    };
    const setNext = () => {
      if (props.loop) {
        setIndex(props.modelValue == publicChildren.value.length - 1 ? 0 : props.modelValue + 1, true);
      } else {
        if (props.modelValue == publicChildren.value.length - 1) {
          return;
        }
        setIndex(props.modelValue + 1, true);
      }
    };
    const setSlideValue = (animation = false, value = void 0) => {
      return new Promise((resolve) => {
        if (!slidesRef.value) {
          return resolve();
        }
        if (!slideAnimation.value) {
          return resolve();
        }
        let slideValue = 0;
        if (value === void 0) {
          slideValue = -(props.loop ? props.modelValue + 1 : props.modelValue) * carouselItemSize.value;
        } else {
          slideValue = value;
        }
        const speed = Math.abs(currentSlideValue.value - slideValue) / (props.speed / clipInterval.value);
        const clip = new Clip({
          style: props.vertical ? "top" : "left",
          value: slideValue + "px",
          speed: animation ? currentSlideValue.value > slideValue ? -speed : speed : slideValue - currentSlideValue.value
        });
        clip.on("update", (_el, _style, value2) => {
          currentSlideValue.value = value2;
        });
        clip.on("complete", () => {
          resolve();
        });
        clip.on("stop", () => {
          resolve();
        });
        slideAnimation.value.stop();
        slideAnimation.value.addClip(clip);
        clip.start();
      });
    };
    const handleTouchstart = (e) => {
      if (props.touchable) {
        initTouchPoint.value = props.vertical ? e.targetTouches[0].pageY : e.targetTouches[0].pageX;
        everyTouchPoint.value = initTouchPoint.value;
        touchTotal.value = 0;
        if (slideAnimation.value) {
          slideAnimation.value.stop();
        }
      }
    };
    const handleTouchMove = (e) => {
      if (props.touchable) {
        if (e.cancelable) {
          e.preventDefault();
        }
        const point = props.vertical ? e.targetTouches[0].pageY : e.targetTouches[0].pageX;
        const moveTotal = point - initTouchPoint.value;
        if (Math.abs(moveTotal) >= carouselItemSize.value) {
          return;
        }
        touchTotal.value = moveTotal;
        currentSlideValue.value += point - everyTouchPoint.value;
        slidesRef.value.style[props.vertical ? "top" : "left"] = currentSlideValue.value + "px";
        everyTouchPoint.value = point;
      }
    };
    const handleTouchEnd = () => {
      if (props.touchable) {
        slideDone();
      }
    };
    const handleMouseDown = (e) => {
      if (props.touchable) {
        initTouchPoint.value = props.vertical ? e.pageY : e.pageX;
        everyTouchPoint.value = initTouchPoint.value;
        touchTotal.value = 0;
        if (slideAnimation.value) {
          slideAnimation.value.stop();
        }
        isMouseDown.value = true;
      }
    };
    const handleMouseMove = (e) => {
      if (props.touchable && isMouseDown.value) {
        if (e.cancelable) {
          e.preventDefault();
        }
        const point = props.vertical ? e.pageY : e.pageX;
        const moveTotal = point - initTouchPoint.value;
        if (Math.abs(moveTotal) >= carouselItemSize.value) {
          return;
        }
        touchTotal.value = moveTotal;
        currentSlideValue.value += point - everyTouchPoint.value;
        slidesRef.value.style[props.vertical ? "top" : "left"] = currentSlideValue.value + "px";
        everyTouchPoint.value = point;
      }
    };
    const handleMouseUp = () => {
      if (props.touchable && isMouseDown.value) {
        isMouseDown.value = false;
        slideDone();
      }
    };
    const slideDone = () => {
      if (!slidesRef.value || props.mode != "slide") {
        return;
      }
      if (props.loop) {
        let num = 0;
        if (Math.abs(touchTotal.value) > carouselItemSize.value / 3) {
          num = touchTotal.value < 0 ? num + 1 : num - 1;
        }
        if (num == 0) {
          setSlideValue(true, -(props.modelValue + 1) * carouselItemSize.value);
        } else {
          if (props.modelValue + num == -1) {
            setSlideValue(true, 0).then(() => {
              lazyUpdate.value = true;
              setIndex(publicChildren.value.length - 1, true);
              setSlideValue(false, -(children.value.length - 2) * carouselItemSize.value).then(() => {
                lazyUpdate.value = false;
              });
            });
          } else if (props.modelValue + num == publicChildren.value.length) {
            setSlideValue(true, -(children.value.length - 1) * carouselItemSize.value).then(() => {
              lazyUpdate.value = true;
              setIndex(0, true);
              setSlideValue(false, -carouselItemSize.value).then(() => {
                lazyUpdate.value = false;
              });
            });
          } else {
            setIndex(props.modelValue + num, true);
          }
        }
      } else {
        if (currentSlideValue.value > 0) {
          setSlideValue(true, 0);
        } else if (currentSlideValue.value < -((children.value.length - 1) * carouselItemSize.value)) {
          setSlideValue(true, -((children.value.length - 1) * carouselItemSize.value));
        } else {
          let num = 0;
          if (Math.abs(touchTotal.value) > carouselItemSize.value / 3) {
            num = touchTotal.value < 0 ? num + 1 : num - 1;
          }
          if (num == 0) {
            setSlideValue(true, -props.modelValue * carouselItemSize.value);
          } else {
            setIndex(props.modelValue + num, true);
          }
        }
      }
    };
    const updateClipInterval = () => {
      if (!!window.requestAnimationFrame) {
        let now = window.performance.now();
        const render = () => {
          const nextFrame = window.performance.now();
          clipInterval.value = nextFrame - now;
          now = nextFrame;
          window.requestAnimationFrame(render);
        };
        render();
      }
    };
    watch(
      () => props.modelValue,
      (newVal, oldVal) => {
        if (props.mode == "slide" && !lazyUpdate.value) {
          if (props.loop && oldVal == publicChildren.value.length - 1 && newVal == 0) {
            setSlideValue(false, 0).then(() => {
              setSlideValue(true);
            });
          } else if (props.loop && oldVal == 0 && newVal == publicChildren.value.length - 1) {
            setSlideValue(false, -(children.value.length - 1) * carouselItemSize.value).then(() => {
              setSlideValue(true);
            });
          } else {
            setSlideValue(true);
          }
        }
      }
    );
    watch(
      () => slidesRef.value,
      (newVal) => {
        if (newVal) {
          nextTick(() => {
            currentSlideValue.value = -(props.loop ? props.modelValue + 1 : props.modelValue) * carouselItemSize.value;
            slidesRef.value.style[props.vertical ? "top" : "left"] = currentSlideValue.value + "px";
            if (slideAnimation.value) {
              slideAnimation.value.removeAllClips();
            } else {
              slideAnimation.value = new Animator(newVal, {});
            }
          });
        }
      }
    );
    watch(
      () => props.autoplay,
      (newVal) => {
        if (newVal) {
          setAutoplay();
        } else {
          if (autoplayTimer.value) {
            clearInterval(autoplayTimer.value);
            autoplayTimer.value = null;
          }
        }
      }
    );
    updateClipInterval();
    onMounted(() => {
      nextTick(() => {
        obj.event.on(document.documentElement, `mousemove.carousel_${instance.uid}`, handleMouseMove);
        obj.event.on(document.documentElement, `mouseup.carousel_${instance.uid}`, handleMouseUp);
        if (props.autoplay) {
          setAutoplay();
        }
      });
    });
    onBeforeUnmount(() => {
      obj.event.off(document.documentElement, `mousemove.carousel_${instance.uid} mouseup.carousel_${instance.uid}`);
      if (slideAnimation.value) {
        slideAnimation.value.stop();
      }
      if (autoplayTimer.value) {
        clearInterval(autoplayTimer.value);
        autoplayTimer.value = null;
      }
    });
    __expose({
      setPrev,
      setNext
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        _ctx.mode == "fade" ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])) : _ctx.mode == "slide" ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["mvi-carousel-slides", { vertical: _ctx.vertical }]),
          ref_key: "slidesRef",
          ref: slidesRef,
          style: normalizeStyle(slidesStyle.value),
          onTouchstart: handleTouchstart,
          onTouchmove: handleTouchMove,
          onTouchend: handleTouchEnd,
          onMousedown: handleMouseDown
        }, [
          createVNode(unref(LastCarouselItem)),
          renderSlot(_ctx.$slots, "default", {}, void 0, true),
          createVNode(unref(FirstCarouselItem))
        ], 38)) : createCommentVNode("", true),
        cmpIndicators.value.show ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _ctx.$slots.indicators ? renderSlot(_ctx.$slots, "indicators", {
            key: 0,
            total: publicChildren.value.length
          }, void 0, true) : (openBlock(), createElementBlock("div", _hoisted_3$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(publicChildren.value.length, (_item, index) => {
              return openBlock(), createElementBlock("div", {
                class: normalizeClass(["mvi-carousel-indicator", { current: props.modelValue == index }]),
                style: normalizeStyle({ background: props.modelValue == index ? cmpIndicators.value.active : cmpIndicators.value.inactive }),
                onClick: ($event) => setIndex(index, true)
              }, null, 14, _hoisted_4$1);
            }), 256))
          ]))
        ], 64)) : createCommentVNode("", true),
        _ctx.controls ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _ctx.$slots.controls ? renderSlot(_ctx.$slots, "controls", {
            key: 0,
            total: publicChildren.value.length
          }, void 0, true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createElementVNode("div", {
              onClick: setPrev,
              class: "mvi-carousel-controls controls-back"
            }, [
              createVNode(unref(Icon), { type: "angle-left" })
            ]),
            createElementVNode("div", {
              onClick: setNext,
              class: "mvi-carousel-controls controls-forward"
            }, [
              createVNode(unref(Icon), { type: "angle-right" })
            ])
          ], 64))
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
});
const Carousel = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-b7ea50d7"]]);
Carousel.install = (app) => {
  app.component(Carousel.name, Carousel);
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-carousel-item",
    inheritAttrs: false
  },
  __name: "carousel-item",
  setup(__props) {
    const instance = getCurrentInstance();
    const carousel = inject("carousel", null);
    const carouselItemChildren = inject("carouselItemChildren", null);
    parentIsMatch(carouselItemChildren, carousel, "m-carousel", ["Carousel", "CarouselItem"]);
    carouselItemChildren.value.push(instance);
    const carouselItemStyle = computed(() => {
      const style = {};
      if (carousel.props.mode == "fade") {
        style.transition = `opacity ${carousel.props.speed}ms linear`;
      }
      if (carousel.props.mode == "slide") {
        if (carousel.props.vertical) {
          style.height = `calc(100% / ${carouselItemChildren.value.length})`;
        } else {
          style.width = `calc(100% / ${carouselItemChildren.value.length})`;
        }
      }
      return style;
    });
    const itemIndex = computed(() => {
      return carouselItemChildren.value.findIndex((vm) => {
        return vm.uid == instance.uid;
      });
    });
    onBeforeUnmount(() => {
      if (carouselItemChildren && carouselItemChildren.value) {
        carouselItemChildren.value.splice(itemIndex.value, 1);
      }
    });
    return (_ctx, _cache) => {
      return unref(carousel).props.mode == "fade" ? (openBlock(), createBlock(Transition, {
        key: 0,
        name: "carousel-fade"
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            class: "mvi-carousel-item fade",
            style: normalizeStyle(carouselItemStyle.value)
          }, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 4), [
            [vShow, unref(carousel).props.modelValue == itemIndex.value]
          ])
        ]),
        _: 3
      })) : unref(carousel).props.mode == "slide" ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: "mvi-carousel-item",
        style: normalizeStyle(carouselItemStyle.value)
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4)) : createCommentVNode("", true);
    };
  }
});
const CarouselItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-bb7f20cb"]]);
CarouselItem.install = (app) => {
  app.component(CarouselItem.name, CarouselItem);
};
const RichImageProps = {
  //图片地址
  src: {
    type: String,
    default: ""
  },
  //加载图标
  loadIcon: {
    type: [String, Object],
    default: null
  },
  //失败图标
  errorIcon: {
    type: [String, Object],
    default: null
  },
  //最大缩放值
  maxScale: {
    type: Number,
    default: 3
  },
  //最小缩放值
  minScale: {
    type: Number,
    default: 0.3
  }
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-rich-image"
  },
  __name: "rich-image",
  props: RichImageProps,
  emits: ["double-touchstart", "double-touchend", "translate-touchstart", "translate-touchend", "translate-mousedown", "translate-mouseup", "reset", "only-click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const instance = getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const doubleTouch = ref({
      is: false,
      spacing: 0
    });
    const scale = ref(1);
    const translateX = ref(0);
    const translateY = ref(0);
    const rotate = ref(0);
    const imageMovePoint = ref(null);
    const imageCanMove = ref(false);
    const downPoint = ref(null);
    const upPoint = ref(null);
    const imageCoverRect = ref({
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    });
    const isTriggerDouble = ref(false);
    const elRef = ref(null);
    const imgRef = ref(null);
    const imgStyle = computed(() => {
      return {
        transform: `scale(${scale.value}) translate(${translateX.value}px,${translateY.value}px) rotate(${rotate.value}deg)`
      };
    });
    const leftRotate = () => {
      translateX.value = 0;
      translateY.value = 0;
      scale.value = 1;
      imageCoverRect.value = getImageCoverData();
      rotate.value -= 90;
    };
    const rightRotate = () => {
      translateX.value = 0;
      translateY.value = 0;
      scale.value = 1;
      imageCoverRect.value = getImageCoverData();
      rotate.value += 90;
    };
    const scaleUp = () => {
      if (scale.value < props.maxScale) {
        translateX.value = 0;
        translateY.value = 0;
        scale.value = obj.number.add(scale.value, 0.1);
        imageCoverRect.value = getImageCoverData();
      }
    };
    const scaleDown = () => {
      if (scale.value > props.minScale) {
        translateX.value = 0;
        translateY.value = 0;
        scale.value = obj.number.subtract(scale.value, 0.1);
        imageCoverRect.value = getImageCoverData();
      }
    };
    const reset = () => {
      scale.value = 1;
      imageCoverRect.value = getImageCoverData();
      translateX.value = 0;
      translateY.value = 0;
      rotate.value = 0;
      emits("reset");
    };
    const getPointSpacing = (pointA, pointB) => {
      let x = pointB.pageX - pointA.pageX;
      let y = pointB.pageY - pointA.pageY;
      return Math.sqrt(x * x + y * y);
    };
    const setImageAnimation = (callback) => {
      return new Promise((resolve) => {
        imgRef.value.$el.style.transition = "transform 300ms";
        imgRef.value.$el.offsetWidth;
        callback();
        setTimeout(() => {
          imgRef.value.$el.style.transition = "";
          imgRef.value.$el.style.webkitTransition = "";
          imgRef.value.$el.offsetWidth;
          resolve();
        }, 300);
      });
    };
    const getImageCoverData = () => {
      const imgRect = obj.element.getElementBounding(imgRef.value.$el);
      const elRect = obj.element.getElementBounding(elRef.value);
      return {
        left: elRect.left - imgRect.left,
        top: elRect.top - imgRect.top,
        right: elRect.right - imgRect.right,
        bottom: elRect.bottom - imgRect.bottom
      };
    };
    const setImageTranslate = (endX, endY) => {
      const moveX = (endX - imageMovePoint.value.x) * 0.5;
      const moveY = (endY - imageMovePoint.value.y) * 0.5;
      const imgRect = imgRef.value.$el.getBoundingClientRect();
      const elRect = elRef.value.getBoundingClientRect();
      if (moveY > 0 && imgRect.top >= elRect.bottom - elRect.height / 10) {
        return;
      }
      if (moveY < 0 && imgRect.bottom <= elRect.top + elRect.height / 10) {
        return;
      }
      if (moveX > 0 && imgRect.left >= elRect.right - elRect.height / 10) {
        return;
      }
      if (moveX < 0 && imgRect.right <= elRect.left + elRect.height / 10) {
        return;
      }
      translateX.value += moveX;
      translateY.value += moveY;
      imageMovePoint.value = {
        x: endX,
        y: endY
      };
    };
    const handleTranslateEnd = (event2) => {
      setImageAnimation(() => {
        const elRect = elRef.value.getBoundingClientRect();
        if (translateY.value * scale.value >= elRect.height - elRect.height / 10 + imageCoverRect.value.top) {
          translateY.value = (elRect.height - elRect.height / 10 + imageCoverRect.value.top) / scale.value;
        }
        if (translateY.value * scale.value <= -(elRect.height - elRect.height / 10 + imageCoverRect.value.bottom)) {
          translateY.value = -(elRect.height - elRect.height / 10 + imageCoverRect.value.bottom) / scale.value;
        }
        if (translateX.value * scale.value >= elRect.width - elRect.width / 10 + imageCoverRect.value.left) {
          translateX.value = (elRect.width - elRect.width / 10 + imageCoverRect.value.left) / scale.value;
        }
        if (translateX.value * scale.value <= -(elRect.width - elRect.width / 10 + imageCoverRect.value.right)) {
          translateX.value = -(elRect.width - elRect.width / 10 + imageCoverRect.value.right) / scale.value;
        }
      });
      imageCanMove.value = false;
      event2.type == "mouseup" ? emits("translate-mouseup") : emits("translate-touchend");
    };
    const scaleByWheel = (event2) => {
      if (event2.cancelable) {
        event2.preventDefault();
      }
      let deltaY = event2.wheelDeltaY || -event2.deltaY;
      if (deltaY > 0) {
        scaleUp();
      } else {
        scaleDown();
      }
    };
    const handleImageTranslate = (event2) => {
      if (event2.type == "mousedown") {
        if (scale.value <= 1) {
          return;
        }
        emits("translate-mousedown", event2);
        imageMovePoint.value = {
          x: event2.pageX,
          y: event2.pageY
        };
        imageCanMove.value = true;
      } else if (event2.type == "mousemove") {
        if (event2.cancelable) {
          event2.preventDefault();
        }
        if (imageCanMove.value) {
          setImageTranslate(event2.pageX, event2.pageY);
        }
      } else if (event2.type == "mouseup") {
        if (imageCanMove.value) {
          handleTranslateEnd(event2);
        }
      }
    };
    const scaleByTouch = (event2) => {
      if (event2.type == "touchstart") {
        isTriggerDouble.value = false;
        if (event2.touches.length == 2) {
          emits("double-touchstart", event2);
          doubleTouch.value.is = true;
          imageCanMove.value = false;
          doubleTouch.value.spacing = getPointSpacing(event2.touches[0], event2.touches[1]);
        } else {
          doubleTouch.value.is = false;
          if (scale.value > 1) {
            emits("translate-touchstart", event2);
            imageMovePoint.value = {
              x: event2.targetTouches[0].pageX,
              y: event2.targetTouches[0].pageY
            };
            imageCanMove.value = true;
          }
          downPoint.value = {
            x: event2.targetTouches[0].pageX,
            y: event2.targetTouches[0].pageY
          };
        }
      } else if (event2.type == "touchmove") {
        if (event2.cancelable) {
          event2.preventDefault();
        }
        if (event2.touches.length == 2 && doubleTouch.value.is) {
          let spacing = getPointSpacing(event2.touches[0], event2.touches[1]);
          if (spacing < doubleTouch.value.spacing) {
            if (scale.value > props.minScale) {
              translateX.value = 0;
              translateY.value = 0;
              scale.value = obj.number.add(scale.value, obj.number.divide(obj.number.subtract(spacing, doubleTouch.value.spacing), elRef.value.offsetWidth));
              imageCoverRect.value = getImageCoverData();
            }
          } else {
            if (scale.value < props.maxScale) {
              translateX.value = 0;
              translateY.value = 0;
              scale.value = obj.number.add(scale.value, obj.number.divide(obj.number.subtract(spacing, doubleTouch.value.spacing), elRef.value.offsetWidth));
              imageCoverRect.value = getImageCoverData();
            }
          }
          doubleTouch.value.spacing = spacing;
        } else {
          if (imageCanMove.value) {
            setImageTranslate(event2.targetTouches[0].pageX, event2.targetTouches[0].pageY);
          }
        }
      } else if (event2.type == "touchend") {
        if (doubleTouch.value.is) {
          if (scale.value < 1) {
            setImageAnimation(() => {
              scale.value = 1;
              imageCoverRect.value = getImageCoverData();
            });
          }
          isTriggerDouble.value = true;
          doubleTouch.value.is = false;
          emits("double-touchend", event2);
        } else {
          upPoint.value = {
            x: event2.changedTouches[0].pageX,
            y: event2.changedTouches[0].pageY
          };
          if (imageCanMove.value && !isTriggerDouble.value) {
            handleTranslateEnd(event2);
          }
        }
      }
    };
    const handleMouseOpt = (event2) => {
      if (event2.type == "mousedown") {
        downPoint.value = {
          x: event2.pageX,
          y: event2.pageY
        };
        handleImageTranslate(event2);
      } else if (event2.type == "mouseup") {
        upPoint.value = {
          x: event2.pageX,
          y: event2.pageY
        };
      }
    };
    const handleClick = () => {
      if (downPoint.value && upPoint.value && downPoint.value.x == upPoint.value.x && downPoint.value.y == upPoint.value.y) {
        emits("only-click");
      }
    };
    onMounted(() => {
      obj.event.on(document.documentElement, `mousemove.richImage_${instance.uid}`, handleImageTranslate);
      obj.event.on(document.documentElement, `mouseup.richImage_${instance.uid}`, handleImageTranslate);
    });
    onBeforeUnmount(() => {
      obj.event.off(document.documentElement, `mousemove.richImage_${instance.uid} mouseup.richImage_${instance.uid}`);
    });
    __expose({
      leftRotate,
      rightRotate,
      scaleUp,
      scaleDown,
      reset
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "mvi-rich-image",
        ref_key: "elRef",
        ref: elRef,
        onMousewheel: scaleByWheel,
        onTouchstart: scaleByTouch,
        onTouchmove: scaleByTouch,
        onTouchend: scaleByTouch,
        onMousedown: handleMouseOpt,
        onMouseup: handleMouseOpt,
        onClick: handleClick
      }, [
        createVNode(unref(Image$1), {
          ref_key: "imgRef",
          ref: imgRef,
          fit: "response",
          style: normalizeStyle(imgStyle.value),
          width: "100%",
          height: "100%",
          src: _ctx.src,
          "load-icon": _ctx.loadIcon,
          "error-icon": _ctx.errorIcon
        }, null, 8, ["style", "src", "load-icon", "error-icon"])
      ], 544);
    };
  }
});
const RichImage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-bb5dc584"]]);
RichImage.install = (app) => {
  app.component(RichImage.name, RichImage);
};
const ImagePreviewProps = {
  //是否显示
  modelValue: {
    type: Boolean,
    default: false
  },
  //图片数组
  images: {
    type: Array,
    default: function() {
      return [];
    }
  },
  //图片描述
  descriptions: {
    type: Array,
    default: function() {
      return [];
    }
  },
  //默认显示的图片序列
  active: {
    type: Number,
    default: 0
  },
  //挂载元素
  mountEl: {
    type: String,
    default: null
  },
  //z-index值
  zIndex: {
    type: Number,
    default: 5e3
  },
  //轮播模式
  mode: {
    type: String,
    default: "slide"
  },
  //是否显示控制器
  controls: {
    type: Boolean,
    default: false
  },
  //图片是否可以循环
  loop: {
    type: Boolean,
    default: false
  },
  //是否显示页码
  showPage: {
    type: Boolean,
    default: true
  },
  //局部显示是否考虑滚动条影响
  usePadding: {
    type: Boolean,
    default: false
  },
  //是否使用图片工具栏
  useTools: {
    type: Boolean,
    default: false
  },
  //图片加载失败提示设置
  errorIcon: {
    type: [String, Object],
    default: {
      size: "1rem",
      type: "image-error"
    }
  },
  //图片加载中提示设置
  loadIcon: {
    type: [String, Object],
    default: function() {
      return {
        size: "1rem",
        type: "image-alt"
      };
    }
  },
  //最大缩放值
  maxScale: {
    type: Number,
    default: 3
  },
  //最小缩放值
  minScale: {
    type: Number,
    default: 0.3
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-17bda9da"), n = n(), popScopeId(), n);
const _hoisted_1 = {
  key: 0,
  class: "mvi-image-preview-page"
};
const _hoisted_2 = { key: 1 };
const _hoisted_3 = ["textContent"];
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", null, "/", -1));
const _hoisted_5 = ["textContent"];
const _hoisted_6 = {
  key: 1,
  class: "mvi-image-preview-footer"
};
const _hoisted_7 = {
  key: 0,
  class: "mvi-image-preview-tools"
};
const _hoisted_8 = ["textContent"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "m-image-preview"
  },
  __name: "image-preview",
  props: ImagePreviewProps,
  emits: ["update:modelValue", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const showCarousel = ref(false);
    const carouselIndex = ref(0);
    const enableTouch = ref(true);
    const imageRefs = ref([]);
    const overlayRef = ref(null);
    const touchTimer = ref(null);
    const $$el = computed(() => {
      return overlayRef.value ? overlayRef.value.$$el : null;
    });
    const show = computed({
      set(value) {
        emits("update:modelValue", value);
      },
      get() {
        return props.modelValue;
      }
    });
    const setImageRef = (el, index) => {
      imageRefs.value[index] = el;
    };
    const closeOverlay = () => {
      imageRefs.value.forEach((imageRef) => {
        imageRef.reset();
      });
      show.value = false;
    };
    const resetImage = () => {
      var _a;
      (_a = imageRefs.value[carouselIndex.value]) == null ? void 0 : _a.reset();
    };
    const plusImage = () => {
      var _a;
      (_a = imageRefs.value[carouselIndex.value]) == null ? void 0 : _a.scaleUp();
    };
    const minusImage = () => {
      var _a;
      (_a = imageRefs.value[carouselIndex.value]) == null ? void 0 : _a.scaleDown();
    };
    const leftRotateImage = () => {
      var _a;
      (_a = imageRefs.value[carouselIndex.value]) == null ? void 0 : _a.leftRotate();
    };
    const rightRotateImage = () => {
      var _a;
      (_a = imageRefs.value[carouselIndex.value]) == null ? void 0 : _a.rightRotate();
    };
    const overlayShowing = () => {
      if (!showCarousel.value) {
        showCarousel.value = true;
      }
    };
    const carouselChange = () => {
      imageRefs.value.forEach((imageRef) => {
        if (imageRef) {
          imageRef.reset();
        }
      });
      emits("change", carouselIndex.value);
    };
    const disabledCarouselTouch = () => {
      if (touchTimer.value) {
        clearTimeout(touchTimer.value);
      }
      enableTouch.value = false;
    };
    const enableCarouselTouch = () => {
      touchTimer.value = setTimeout(() => {
        enableTouch.value = true;
      }, 100);
    };
    watch(
      () => props.active,
      (newVal) => {
        carouselIndex.value = newVal;
      },
      {
        immediate: true
      }
    );
    __expose({
      $$el
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Overlay), {
        ref_key: "overlayRef",
        ref: overlayRef,
        modelValue: show.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => show.value = $event),
        color: "#000",
        fade: false,
        onShowing: overlayShowing,
        "z-index": _ctx.zIndex,
        "use-padding": _ctx.usePadding,
        mountEl: _ctx.mountEl
      }, {
        default: withCtx(() => [
          showCarousel.value ? (openBlock(), createBlock(unref(Carousel), {
            key: 0,
            ref: "carouselRef",
            class: "mvi-image-preview-carousel",
            modelValue: carouselIndex.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => carouselIndex.value = $event),
            controls: _ctx.controls,
            indicators: !!(_ctx.showPage || _ctx.useTools || _ctx.$slots.descriptions || _ctx.descriptions.length),
            mode: _ctx.mode,
            loop: _ctx.loop,
            touchable: enableTouch.value,
            onChange: carouselChange
          }, {
            indicators: withCtx((data2) => [
              _ctx.showPage ? (openBlock(), createElementBlock("div", _hoisted_1, [
                _ctx.$slots.page ? renderSlot(_ctx.$slots, "page", {
                  key: 0,
                  total: data2.total,
                  current: carouselIndex.value
                }, void 0, true) : (openBlock(), createElementBlock("div", _hoisted_2, [
                  createElementVNode("span", {
                    textContent: toDisplayString(carouselIndex.value + 1)
                  }, null, 8, _hoisted_3),
                  _hoisted_4,
                  createElementVNode("span", {
                    textContent: toDisplayString(data2.total)
                  }, null, 8, _hoisted_5)
                ]))
              ])) : createCommentVNode("", true),
              !!(_ctx.useTools || _ctx.$slots.descriptions || _ctx.descriptions.length) ? (openBlock(), createElementBlock("div", _hoisted_6, [
                _ctx.useTools ? (openBlock(), createElementBlock("div", _hoisted_7, [
                  createVNode(unref(Icon), {
                    onClick: plusImage,
                    class: "mvi-image-preview-tools-icon",
                    type: "search-plus-o"
                  }),
                  createVNode(unref(Icon), {
                    onClick: minusImage,
                    class: "mvi-image-preview-tools-icon",
                    type: "search-minus-o"
                  }),
                  createVNode(unref(Icon), {
                    onClick: resetImage,
                    class: "mvi-image-preview-tools-icon",
                    type: "double-circle"
                  }),
                  createVNode(unref(Icon), {
                    onClick: leftRotateImage,
                    class: "mvi-image-preview-tools-icon",
                    type: "left-rotate"
                  }),
                  createVNode(unref(Icon), {
                    onClick: rightRotateImage,
                    class: "mvi-image-preview-tools-icon",
                    type: "right-rotate"
                  }),
                  _ctx.$slots.tools ? renderSlot(_ctx.$slots, "tools", { key: 0 }, void 0, true) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                !!(_ctx.$slots.descriptions || _ctx.descriptions.length) ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: normalizeClass(["mvi-image-preview-descriptions", { "has-tools": _ctx.useTools }])
                }, [
                  _ctx.$slots.descriptions ? renderSlot(_ctx.$slots, "descriptions", {
                    key: 0,
                    total: data2.total,
                    current: carouselIndex.value
                  }, void 0, true) : !!_ctx.descriptions.length ? (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: "mvi-image-preview-description",
                    textContent: toDisplayString(_ctx.descriptions[carouselIndex.value])
                  }, null, 8, _hoisted_8)) : createCommentVNode("", true)
                ], 2)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ]),
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.images, (item, index) => {
                return openBlock(), createBlock(unref(CarouselItem), null, {
                  default: withCtx(() => [
                    createVNode(unref(RichImage), {
                      ref_for: true,
                      ref: (el) => setImageRef(el, index),
                      onDoubleTouchstart: disabledCarouselTouch,
                      onTranslateTouchstart: disabledCarouselTouch,
                      onTranslateMousedown: disabledCarouselTouch,
                      onDoubleTouchend: enableCarouselTouch,
                      onTranslateTouchend: enableCarouselTouch,
                      onTranslateMouseup: enableCarouselTouch,
                      onReset: enableCarouselTouch,
                      onOnlyClick: closeOverlay,
                      src: item,
                      "error-icon": _ctx.errorIcon,
                      "load-icon": _ctx.loadIcon,
                      "max-scale": _ctx.maxScale,
                      "min-scale": _ctx.minScale
                    }, null, 8, ["src", "error-icon", "load-icon", "max-scale", "min-scale"])
                  ]),
                  _: 2
                }, 1024);
              }), 256))
            ]),
            _: 3
          }, 8, ["modelValue", "controls", "indicators", "mode", "loop", "touchable"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["modelValue", "z-index", "use-padding", "mountEl"]);
    };
  }
});
const ImagePreview = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-17bda9da"]]);
ImagePreview.install = (app) => {
  app.component(ImagePreview.name, ImagePreview);
};
obj.event.on(window, "touchstart.ios", () => {
});
const components = {
  Anchor: Anchor$1,
  Drag: Drag$1,
  Observe: Observe$1,
  Prop: Prop$1,
  Px: Px$1,
  Resize: Resize$1,
  Ripple: Ripple$1,
  Scroll: Scroll$1,
  Spy: Spy$1,
  Upload: Upload$1,
  Icon,
  Badge,
  Button,
  Triangle,
  Layer,
  Label,
  Input,
  Loading,
  LoadingBar,
  Msgbox,
  Divider,
  Cell,
  CellGroup,
  Checkbox,
  Radio,
  Sign,
  Roll,
  Row,
  Col,
  Autocomplete,
  Overlay,
  Popup,
  Dropdown,
  Tooltip,
  TransitionSlide,
  Switch,
  Navbar,
  Notify,
  Actionsheet,
  Calendar,
  CircleProgress,
  Collapse,
  CollapseItem,
  DateChooser,
  DateNativePicker,
  Picker,
  Progress,
  Slider,
  DatePicker,
  Field,
  Form,
  FormEl,
  Image: Image$1,
  ColorPicker,
  List,
  Modal,
  Page,
  Search,
  Select,
  Skeleton,
  Steps,
  Step,
  Stepper,
  NumberKeyboard,
  Toast,
  PullRefresh,
  Dialog,
  SwipeCell,
  Tabbar,
  Table,
  Tabs,
  Tab,
  Carousel,
  CarouselItem,
  RichImage,
  ImagePreview
};
const install = (app) => {
  Object.values(components).map((component) => {
    component.install(app);
  });
};
const version = "1.9.5";
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
  Carousel,
  CarouselItem,
  Cell,
  CellGroup,
  Checkbox,
  CircleProgress,
  Col,
  Collapse,
  CollapseItem,
  ColorPicker,
  DateChooser,
  DateNativePicker,
  DatePicker,
  Dialog,
  Divider,
  Drag$1 as Drag,
  Dropdown,
  Field,
  Form,
  FormEl,
  Icon,
  Image$1 as Image,
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
  Picker,
  Popup,
  Progress,
  Prop$1 as Prop,
  PullRefresh,
  Px$1 as Px,
  Radio,
  Resize$1 as Resize,
  RichImage,
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
  components,
  stdin_default as default,
  install,
  version
};
