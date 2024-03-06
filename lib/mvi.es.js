var __defProp = Object.defineProperty;
var __defNormalProp = (obj2, key, value) => key in obj2 ? __defProp(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __publicField = (obj2, key, value) => {
  __defNormalProp(obj2, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot, toDisplayString, createCommentVNode, h, useSlots, createBlock, unref, withCtx, Fragment, createVNode, createElementVNode, getCurrentInstance, ref, watch, onMounted, onBeforeUnmount, Teleport, Transition, withDirectives, mergeProps, vShow, nextTick, vModelText, vModelDynamic, renderList, createStaticVNode, pushScopeId, popScopeId, createApp, withModifiers } from "vue";
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
  trim(str, global = false) {
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
    //元素被拖动时触发
    __publicField(this, "drag");
    //元素开始拖动时触发
    __publicField(this, "beforeDrag");
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
    __publicField(this, "attrName");
    //是否after伪类
    __publicField(this, "isAfter");
    //是否before伪类
    __publicField(this, "isBefore");
    //是否已经初始化了
    __publicField(this, "hasInit", false);
    options = obj.common.isObject(options) ? options : {};
    this.$el = element2;
    this.attrName = options.attrName;
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
        style.innerHTML += ` .${className}::before {${this.attrName}:${value}px !important;}`;
      }
      if (this.isAfter) {
        style.innerHTML += ` .${className}::after {${this.attrName}:${value}px !important;}`;
      }
      document.querySelector("head").appendChild(style);
    } else {
      this.$el.style.setProperty(this.attrName, value + "px", "important");
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
    if (typeof this.attrName != "string" || !this.attrName) {
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
        options.attrName = binding.arg;
      }
      let px = new Px$1(el, options);
      px.init();
    }
  });
};
const ModeValue = {
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
    __publicField(this, "leftRange", { x: [], y: [] });
    //右侧可拖动范围
    __publicField(this, "rightRange", { x: [], y: [] });
    //顶部可拖动范围
    __publicField(this, "topRange", { x: [], y: [] });
    //底部可拖动范围
    __publicField(this, "bottomRange", { x: [], y: [] });
    //左上可拖动范围
    __publicField(this, "leftTopRange", { x: [], y: [] });
    //右上可拖动范围
    __publicField(this, "rightTopRange", { x: [], y: [] });
    //左下可拖动范围
    __publicField(this, "leftBottomRange", { x: [], y: [] });
    //右下可拖动范围
    __publicField(this, "rightBottomRange", { x: [], y: [] });
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
        left: ModeValue.LEFT,
        top: ModeValue.TOP,
        bottom: ModeValue.BOTTOM,
        right: ModeValue.RIGHT
      };
    } else {
      if (typeof this.mode.left != "boolean") {
        this.mode.left = ModeValue.LEFT;
      }
      if (typeof this.mode.top != "boolean") {
        this.mode.top = ModeValue.TOP;
      }
      if (typeof this.mode.bottom != "boolean") {
        this.mode.bottom = ModeValue.BOTTOM;
      }
      if (typeof this.mode.right != "boolean") {
        this.mode.right = ModeValue.RIGHT;
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
    el.style.transform = "rotate(0deg)";
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
        rippleEl.style.opacity = this.finalOpacity;
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
    obj.event.on(this.$el, "touchstart.ripple", (e) => {
      downFn(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    });
    obj.event.on(document.documentElement, `mouseup.ripple_${this.guid}`, upFn);
    obj.event.on(this.$el, `touchend.ripple`, upFn);
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
const __default__$q = defineComponent({
  name: "m-icon"
});
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  ...__default__$q,
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
const Icon = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-701ff988"]]);
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
const _hoisted_1$f = ["data-placement"];
const _hoisted_2$b = ["data-placement"];
const __default__$p = defineComponent({
  name: "m-badge"
});
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  ...__default__$p,
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
        }, null, 12, _hoisted_1$f)) : badgeShow.value ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: "mvi-badge-el",
          "data-placement": _ctx.placement,
          style: normalizeStyle(badgeStyle.value)
        }, toDisplayString(_ctx.content), 13, _hoisted_2$b)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const Badge = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-a46543c4"]]);
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
const _hoisted_1$e = {
  key: 0,
  class: "mvi-button-load-text"
};
const __default__$o = defineComponent({
  name: "m-button"
});
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  ...__default__$o,
  props: ButtonProps,
  setup(__props) {
    const props = __props;
    const parseIcon = (params) => {
      let icon = {
        spin: false,
        type: null,
        url: null,
        color: null,
        size: null
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
              type: parseIcon(_ctx.loadIcon).type,
              color: parseIcon(_ctx.loadIcon).color,
              url: parseIcon(_ctx.loadIcon).url,
              spin: parseIcon(_ctx.loadIcon).spin,
              size: parseIcon(_ctx.loadIcon).size
            }, null, 8, ["type", "color", "url", "spin", "size"]),
            _ctx.loadText ? (openBlock(), createElementBlock("span", _hoisted_1$e, toDisplayString(_ctx.loadText), 1)) : createCommentVNode("", true)
          ], 64)) : renderSlot(_ctx.$slots, "default", { key: 2 }, void 0, true)
        ]),
        _: 3
      }, 8, ["disabled", "class"]);
    };
  }
});
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-a3c6f3af"]]);
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
const _hoisted_1$d = ["data-placement"];
const _hoisted_2$a = ["data-placement"];
const __default__$n = defineComponent({
  name: "m-triangle"
});
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  ...__default__$n,
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
        }, null, 12, _hoisted_2$a)
      ], 12, _hoisted_1$d);
    };
  }
});
const Triangle = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-d5b9f49b"]]);
Triangle.install = (app) => {
  app.component(Triangle.name, Triangle);
};
const LayerProps = {
  //是否显示悬浮层
  modelValue: {
    type: Boolean,
    default: false
  },
  //悬浮层触发元素
  relate: {
    type: String,
    default: null
  },
  //悬浮层相对于触发元素的位置
  placement: {
    type: String,
    default: "bottom",
    validator(value) {
      return ["top", "left", "right", "bottom", "top-start", "top-end", "left-start", "left-end", "right-start", "right-end", "bottom-start", "bottom-end"].includes(value);
    }
  },
  //悬浮层主体距离触发元素的距离
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
  //点击触发元素和悬浮层以外的元素是否关闭悬浮层
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
const __default__$m = defineComponent({
  name: "m-layer"
});
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  ...__default__$m,
  ...{
    inheritAttrs: false
  },
  props: LayerProps,
  emits: ["update:modelValue", "show", "showing", "shown", "hide", "hidding", "hidden"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const instance = getCurrentInstance();
    const uid = instance.uid;
    const layerShow = ref(false);
    const firstShow = ref(false);
    const realPlacement = ref("bottom");
    const layerRef = ref(null);
    const triangleRef = ref(null);
    const $$el = computed(() => layerRef.value);
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
        obj.event.on(el, `scroll.layer_${uid}`, () => {
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
        obj.event.off(el, `scroll.layer_${uid}`);
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
        instance.appContext.config.globalProperties.layerComponentWatch.apply(this, ["show", el]);
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
          instance.appContext.config.globalProperties.layerComponentWatch.apply(this, ["showing", el]);
        }
      });
    };
    const afterEnter = (el) => {
      emits("shown", el);
      if (typeof instance.appContext.config.globalProperties.layerComponentWatch == "function") {
        instance.appContext.config.globalProperties.layerComponentWatch.apply(this, ["shown", el]);
      }
    };
    const beforeLeave = (el) => {
      obj.data.remove(el, "mvi-layer-beforeEnter-trigger");
      obj.data.remove(el, "mvi-layer-enter-trigger");
      emits("hide", el);
      if (typeof instance.appContext.config.globalProperties.layerComponentWatch == "function") {
        instance.appContext.config.globalProperties.layerComponentWatch.apply(this, ["hide", el]);
      }
    };
    const leave = (el) => {
      emits("hidding", el);
      if (typeof instance.appContext.config.globalProperties.layerComponentWatch == "function") {
        instance.appContext.config.globalProperties.layerComponentWatch.apply(this, ["hidding", el]);
      }
    };
    const afterLeave = (el) => {
      emits("hidden", el);
      if (typeof instance.appContext.config.globalProperties.layerComponentWatch == "function") {
        instance.appContext.config.globalProperties.layerComponentWatch.apply(this, ["hidden", el]);
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
      obj.event.on(window, `resize.layer_${uid}`, update);
      obj.event.on(window, `click.layer_${uid}`, (event2) => {
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
      obj.event.off(window, `resize.layer_${uid} click.layer_${uid}`);
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
const Layer = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-8f0de93a"]]);
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
const __default__$l = defineComponent({
  name: "m-label"
});
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  ...__default__$l,
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
const Label = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-c72d5abb"]]);
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
    type: [String, Boolean],
    default: false,
    validator(value) {
      return [false, "none", "text", "decimal", "numeric", "tel", "search", "email", "url"].includes(value);
    }
  }
};
const _hoisted_1$c = ["disabled", "data-type"];
const _hoisted_2$9 = ["textContent"];
const _hoisted_3$7 = ["placeholder", "maxlength", "disabled", "readonly", "autofocus", "rows", "name"];
const _hoisted_4$7 = ["type", "inputmode", "placeholder", "maxlength", "disabled", "readonly", "autofocus", "name"];
const _hoisted_5$2 = {
  key: 6,
  class: "mvi-input-words"
};
const __default__$k = defineComponent({
  name: "m-input"
});
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  ...__default__$k,
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
      set: (value) => {
        if (props.modelValue !== value) {
          emits("update:modelValue", value);
        }
      },
      get: () => {
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
      if (realValue && focus.value) {
        return true;
      }
      return false;
    });
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
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
      return useSlots().left || parseIcon.value(props.left).type || parseIcon.value(props.left).url;
    });
    const showRight = computed(() => {
      return useSlots().right || parseIcon.value(props.right).type || parseIcon.value(props.right).url;
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
          }, null, 8, _hoisted_2$9)
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
        }, null, 44, _hoisted_3$7)), [
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
        }, null, 44, _hoisted_4$7)), [
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
        _ctx.showWordLimit && _ctx.maxlength > 0 ? (openBlock(), createElementBlock("div", _hoisted_5$2, toDisplayString(realValue.value.length) + "/" + toDisplayString(_ctx.maxlength), 1)) : createCommentVNode("", true)
      ], 10, _hoisted_1$c);
    };
  }
});
const Input = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-363ca9fd"]]);
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
const _withScopeId = (n) => (pushScopeId("data-v-176479d2"), n = n(), popScopeId(), n);
const _hoisted_1$b = { class: "mvi-loading" };
const _hoisted_2$8 = ["width", "height", "stroke"];
const _hoisted_3$6 = /* @__PURE__ */ createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-176479d2><g transform="translate(1 1)" stroke-width="2" data-v-176479d2><circle stroke-opacity=".2" cx="18" cy="18" r="18" data-v-176479d2></circle><path d="M36 18c0-9.94-8.06-18-18-18" data-v-176479d2><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" data-v-176479d2></animateTransform></path></g></g>', 1);
const _hoisted_4$6 = [
  _hoisted_3$6
];
const _hoisted_5$1 = ["width", "height", "fill"];
const _hoisted_6 = /* @__PURE__ */ createStaticVNode('<circle cx="30" cy="30" r="30" data-v-176479d2><animate attributeName="r" from="30" to="30" begin="0s" dur="0.8s" values="30;18;30" calcMode="linear" repeatCount="indefinite" data-v-176479d2></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" data-v-176479d2></animate></circle><circle cx="120" cy="30" r="18" fill-opacity="0.3" data-v-176479d2><animate attributeName="r" from="18" to="18" begin="0s" dur="0.8s" values="18;30;18" calcMode="linear" repeatCount="indefinite" data-v-176479d2></animate><animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s6s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite" data-v-176479d2></animate></circle><circle cx="210" cy="30" r="30" data-v-176479d2><animate attributeName="r" from="30" to="30" begin="0s" dur="0.8s" values="30;18;30" calcMode="linear" repeatCount="indefinite" data-v-176479d2></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" data-v-176479d2></animate></circle>', 3);
const _hoisted_9 = [
  _hoisted_6
];
const _hoisted_10 = ["width", "height"];
const _hoisted_11 = ["id"];
const _hoisted_12 = ["stop-color"];
const _hoisted_13 = ["stop-color"];
const _hoisted_14 = ["stop-color"];
const _hoisted_15 = {
  fill: "none",
  "fill-rule": "evenodd"
};
const _hoisted_16 = { transform: "translate(1 1)" };
const _hoisted_17 = ["stroke"];
const _hoisted_18 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("animateTransform", {
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
const _hoisted_21 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("animateTransform", {
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
const _hoisted_25 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "opacity",
  attributeType: "XML",
  values: "0.2; 1; .2",
  begin: "0s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_26 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "height",
  attributeType: "XML",
  values: "10; 20; 10",
  begin: "0s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_27 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("animate", {
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
const _hoisted_30 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "opacity",
  attributeType: "XML",
  values: "0.2; 1; .2",
  begin: "0.15s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_31 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "height",
  attributeType: "XML",
  values: "10; 20; 10",
  begin: "0.15s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_32 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("animate", {
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
const _hoisted_35 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "opacity",
  attributeType: "XML",
  values: "0.2; 1; .2",
  begin: "0.3s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_36 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("animate", {
  attributeName: "height",
  attributeType: "XML",
  values: "10; 20; 10",
  begin: "0.3s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1));
const _hoisted_37 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("animate", {
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
const __default__$j = defineComponent({
  name: "m-loading"
});
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  ...__default__$j,
  props: LoadingProps,
  setup(__props) {
    const props = __props;
    const instance = getCurrentInstance();
    const uid = instance.uid;
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
      return openBlock(), createElementBlock("div", _hoisted_1$b, [
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
        }, _hoisted_4$6, 8, _hoisted_2$8)) : _ctx.type == "dots" ? (openBlock(), createElementBlock("svg", {
          key: 2,
          xmlns: "https://www.w3.org/2000/svg",
          width: _ctx.size,
          height: _ctx.size,
          viewBox: "0 0 240 60",
          fill: _ctx.color
        }, _hoisted_9, 8, _hoisted_5$1)) : _ctx.type == "spin" ? (openBlock(), createElementBlock("svg", {
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
              id: `spin_${unref(uid)}`
            }, [
              createElementVNode("stop", {
                "stop-color": _ctx.color,
                "stop-opacity": "0",
                offset: "0%"
              }, null, 8, _hoisted_12),
              createElementVNode("stop", {
                "stop-color": _ctx.color,
                "stop-opacity": ".631",
                offset: "63.146%"
              }, null, 8, _hoisted_13),
              createElementVNode("stop", {
                "stop-color": _ctx.color,
                offset: "100%"
              }, null, 8, _hoisted_14)
            ], 8, _hoisted_11)
          ]),
          createElementVNode("g", _hoisted_15, [
            createElementVNode("g", _hoisted_16, [
              createElementVNode("path", {
                d: "M36 18c0-9.94-8.06-18-18-18",
                stroke: `url(#spin_${unref(uid)})`,
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
        ], 8, _hoisted_10)) : _ctx.type == "transfer" ? (openBlock(), createElementBlock("svg", {
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
const Loading = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-176479d2"]]);
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
const __default__$i = defineComponent({
  name: "m-loading-bar"
});
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  ...__default__$i,
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
const LoadingBarComponent = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-b6d07fa0"]]);
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
const _hoisted_1$a = ["textContent"];
const __default__$h = defineComponent({
  name: "m-msgbox"
});
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  ...__default__$h,
  ...{
    inheritAttrs: false
  },
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
            }), null, 16, _hoisted_1$a), [
              [vShow, show.value]
            ])
          ]),
          _: 1
        }, 8, ["name"])
      ]);
    };
  }
});
const MsgboxComponent = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-53abff27"]]);
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
const _hoisted_1$9 = {
  key: 0,
  class: "mvi-divider-center"
};
const __default__$g = defineComponent({
  name: "m-divider"
});
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  ...__default__$g,
  props: DividerProps,
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-divider", _ctx.dashed ? "dashed" : ""])
      }, [
        createElementVNode("div", {
          class: "mvi-divider-left",
          style: normalizeStyle({ borderColor: _ctx.color || "" })
        }, null, 4),
        _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_1$9, [
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
const Divider = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-df6291f6"]]);
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
const _hoisted_1$8 = { class: "mvi-cell-item" };
const _hoisted_2$7 = ["textContent"];
const _hoisted_3$5 = ["textContent"];
const _hoisted_4$5 = ["textContent"];
const __default__$f = defineComponent({
  name: "m-cell"
});
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  ...__default__$f,
  props: CellProps,
  setup(__props) {
    const instance = getCurrentInstance();
    const props = __props;
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
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
      if (instance.parent.type.name == "m-cell-group" && typeof instance.parent.proxy.active == "boolean") {
        return instance.parent.proxy.active;
      }
      return true;
    });
    const cmpBorder = computed(() => {
      if (typeof props.border == "boolean") {
        return props.border;
      }
      if (instance.parent.type.name == "m-cell-group" && typeof instance.parent.proxy.border == "boolean") {
        return instance.parent.proxy.border;
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
        createElementVNode("div", _hoisted_1$8, [
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
            }, null, 8, _hoisted_2$7))
          ], 2),
          _ctx.$slots.content || _ctx.content ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["mvi-cell-content", { nowrap: _ctx.noWrap }])
          }, [
            _ctx.$slots.content ? renderSlot(_ctx.$slots, "content", { key: 0 }, void 0, true) : _ctx.content ? (openBlock(), createElementBlock("span", {
              key: 1,
              textContent: toDisplayString(_ctx.content)
            }, null, 8, _hoisted_3$5)) : createCommentVNode("", true)
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
          }, null, 8, _hoisted_4$5)) : createCommentVNode("", true)
        ], 4)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const Cell = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-d1f07568"]]);
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
const _hoisted_1$7 = ["textContent"];
const __default__$e = defineComponent({
  name: "m-cell-group"
});
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  ...__default__$e,
  props: CellGroupProps,
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-cell-group", _ctx.border ? "border" : ""])
      }, [
        _ctx.title ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "mvi-cell-group-title",
          textContent: toDisplayString(_ctx.title)
        }, null, 8, _hoisted_1$7)) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2);
    };
  }
});
const CellGroup = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-12867ba9"]]);
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
const _hoisted_1$6 = ["disabled"];
const _hoisted_2$6 = ["data-placement", "textContent"];
const _hoisted_3$4 = ["value", "disabled", "checked", "name"];
const _hoisted_4$4 = ["data-placement", "textContent"];
const __default__$d = defineComponent({
  name: "m-checkbox"
});
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  ...__default__$d,
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
        }, null, 8, _hoisted_2$6)) : createCommentVNode("", true),
        createElementVNode("input", {
          onChange: change,
          value: _ctx.value,
          disabled: _ctx.disabled,
          checked: check.value,
          type: "checkbox",
          name: _ctx.name
        }, null, 40, _hoisted_3$4),
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
        }, null, 8, _hoisted_4$4)) : createCommentVNode("", true)
      ], 8, _hoisted_1$6);
    };
  }
});
const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-227a1a54"]]);
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
const _hoisted_1$5 = ["disabled"];
const _hoisted_2$5 = ["data-placement", "textContent"];
const _hoisted_3$3 = ["value", "disabled", "checked", "name"];
const _hoisted_4$3 = ["data-placement", "textContent"];
const __default__$c = defineComponent({
  name: "m-radio"
});
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  ...__default__$c,
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
        }, null, 8, _hoisted_2$5)) : createCommentVNode("", true),
        createElementVNode("input", {
          onChange: change,
          value: _ctx.value,
          disabled: _ctx.disabled,
          checked: check.value,
          type: "radio",
          name: _ctx.name
        }, null, 40, _hoisted_3$3),
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
        }, null, 8, _hoisted_4$3)) : createCommentVNode("", true)
      ], 8, _hoisted_1$5);
    };
  }
});
const Radio = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-8f679c16"]]);
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
const __default__$b = defineComponent({
  name: "m-sign"
});
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  ...__default__$b,
  props: SignProps,
  setup(__props, { expose: __expose }) {
    const instance = getCurrentInstance();
    const uid = instance.uid;
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
      obj.event.on(document.documentElement, `mousemove.sign_${uid}`, canvasMouseMove);
      obj.event.on(document.documentElement, `mouseup.sign_${uid}`, canvasMouseUp);
    };
    watch(() => props.background, () => {
      clear();
    });
    onMounted(() => {
      init();
    });
    onBeforeUnmount(() => {
      obj.event.off(document.documentElement, `mousemove.sign_${uid} mouseup.sign_${uid}`);
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
const Sign = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-9d710ddd"]]);
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
const __default__$a = defineComponent({
  name: "m-roll"
});
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  ...__default__$a,
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
      setTimeout(() => {
        if (!rollRef.value) {
          return;
        }
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
      }, 0);
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
const Roll = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-e9f80e45"]]);
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
const __default__$9 = defineComponent({
  name: "m-row"
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  ...__default__$9,
  props: RowProps,
  setup(__props) {
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
const Row = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-39916807"]]);
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
const __default__$8 = defineComponent({
  name: "m-col"
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  ...__default__$8,
  props: ColProps,
  setup(__props) {
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
const Col = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-23b7825a"]]);
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
const _hoisted_1$4 = ["disabled"];
const _hoisted_2$4 = ["data-id"];
const _hoisted_3$2 = ["placeholder", "name", "disabled"];
const _hoisted_4$2 = ["textContent", "onClick"];
const __default__$7 = defineComponent({
  name: "m-autocomplete"
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  ...__default__$7,
  props: AutocompleteProps,
  emits: ["update:modelValue", "focus", "blur", "input", "left-click", "right-click", "select", "clear", "keydown", "keyup"],
  setup(__props, { emit: __emit }) {
    const instance = getCurrentInstance();
    const uid = instance.uid;
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
          type: null,
          url: null,
          color: null,
          size: null
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
      let cls = [];
      if (props.activeType && !props.activeColor && focus.value) {
        cls.push(props.activeType);
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
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-autocomplete", [_ctx.size, { round: _ctx.round, square: !_ctx.round && _ctx.square }]]),
        disabled: _ctx.disabled || null
      }, [
        createElementVNode("div", {
          class: normalizeClass(["mvi-autocomplete-relate", relateClass.value]),
          style: normalizeStyle(relateStyle.value),
          "data-id": "mvi-autocomplete-relate-" + unref(uid),
          ref_key: "relateRef",
          ref: relateRef
        }, [
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
          }, null, 46, _hoisted_3$2), [
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
        ], 14, _hoisted_2$4),
        createVNode(unref(Layer), {
          "model-value": show.value,
          relate: `[data-id='mvi-autocomplete-relate-${unref(uid)}']`,
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
                }, null, 8, _hoisted_4$2);
              }), 256))
            ], 6)
          ]),
          _: 1
        }, 8, ["model-value", "relate", "placement", "offset", "z-index", "animation", "shadow", "border", "timeout", "show-triangle", "border-color", "width"])
      ], 10, _hoisted_1$4);
    };
  }
});
const Autocomplete = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-05c383ad"]]);
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
  //是否考虑PC滚动条
  usePadding: {
    type: Boolean,
    default: false
  }
};
const __default__$6 = defineComponent({
  name: "m-overlay"
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  ...__default__$6,
  ...{
    inheritAttrs: false
  },
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
        instance.appContext.config.globalProperties.overlayComponentWatch.apply(this, ["show", el]);
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
        instance.appContext.config.globalProperties.overlayComponentWatch.apply(this, ["showing", el]);
      }
    };
    const afterEnter = (el) => {
      if (props.fade) {
        el.style.transition = "";
      }
      emits("shown", el);
      if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == "function") {
        instance.appContext.config.globalProperties.overlayComponentWatch.apply(this, ["shown", el]);
      }
    };
    const beforeLeave = (el) => {
      if (props.fade) {
        el.style.transition = "opacity " + props.timeout + "ms";
      }
      emits("hide", el);
      if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == "function") {
        instance.appContext.config.globalProperties.overlayComponentWatch.apply(this, ["hide", el]);
      }
    };
    const leave = (el) => {
      emits("hidding", el);
      if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == "function") {
        instance.appContext.config.globalProperties.overlayComponentWatch.apply(this, ["hidding", el]);
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
        instance.appContext.config.globalProperties.overlayComponentWatch.apply(this, ["hidden", el]);
      }
    };
    const closeOverlay = () => {
      if (props.closable) {
        emits("update:modelValue", false);
      }
    };
    watch(() => props.modelValue, (newValue) => {
      overlayShow.value = newValue;
    });
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
const Overlay = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-6cf453e3"]]);
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
const __default__$5 = defineComponent({
  name: "m-popup"
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...__default__$5,
  ...{
    inheritAttrs: false
  },
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
      return overlayRef.value.$$el;
    });
    const show = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
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
        instance.appContext.config.globalProperties.popupComponentWatch.apply(this, ["show", el]);
      }
    };
    const enter = (el) => {
      if (obj.data.get(el, "mvi-popup-enter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-popup-enter-trigger", true);
      emits("showing", el);
      if (typeof instance.appContext.config.globalProperties.popupComponentWatch == "function") {
        instance.appContext.config.globalProperties.popupComponentWatch.apply(this, ["showing", el]);
      }
    };
    const afterEnter = (el) => {
      emits("shown", el);
      if (typeof instance.appContext.config.globalProperties.popupComponentWatch == "function") {
        instance.appContext.config.globalProperties.popupComponentWatch.apply(this, ["shown", el]);
      }
    };
    const beforeLeave = (el) => {
      obj.data.remove(el, "mvi-popup-beforeEnter-trigger");
      obj.data.remove(el, "mvi-popup-enter-trigger");
      emits("hide", el);
      if (typeof instance.appContext.config.globalProperties.popupComponentWatch == "function") {
        instance.appContext.config.globalProperties.popupComponentWatch.apply(this, ["hide", el]);
      }
    };
    const leave = (el) => {
      emits("hidding", el);
      if (typeof instance.appContext.config.globalProperties.popupComponentWatch == "function") {
        instance.appContext.config.globalProperties.popupComponentWatch.apply(this, ["hidding", el]);
      }
    };
    const afterLeave = (el) => {
      emits("hidden", el);
      if (typeof instance.appContext.config.globalProperties.popupComponentWatch == "function") {
        instance.appContext.config.globalProperties.popupComponentWatch.apply(this, ["hidden", el]);
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
const Popup = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-86d7b6fe"]]);
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
const _hoisted_1$3 = { class: "mvi-dropdown" };
const _hoisted_2$3 = ["disabled", "onClick"];
const _hoisted_3$1 = { class: "mvi-dropdown-label" };
const _hoisted_4$1 = ["textContent"];
const _hoisted_5 = ["data-placement"];
const __default__$4 = defineComponent({
  name: "m-dropdown"
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...__default__$4,
  props: DropdownProps,
  emits: ["update:modelValue", "update:show", "select"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const popupRef = ref(null);
    const $$el = computed(() => {
      return popupRef.value.$$el;
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
          type: null,
          url: null,
          color: null,
          size: null
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
          createElementVNode("div", _hoisted_1$3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (item, index) => {
              return openBlock(), createElementBlock("div", {
                disabled: itemDisabled.value(item) || null,
                class: normalizeClass(["mvi-dropdown-item", dropdownItemClass.value(item, index)]),
                onClick: ($event) => doSelect(item, index),
                style: normalizeStyle(dropdownItemStyle.value(item, index))
              }, [
                createElementVNode("div", _hoisted_3$1, [
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
                  }, null, 8, _hoisted_4$1)
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
                ], 10, _hoisted_5)
              ], 14, _hoisted_2$3);
            }), 256))
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "overlay-color", "z-index", "timeout", "placement", "round", "use-padding", "mount-el", "closable"]);
    };
  }
});
const Dropdown = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-acf474de"]]);
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
const _hoisted_1$2 = ["data-id"];
const _hoisted_2$2 = ["textContent"];
const __default__$3 = defineComponent({
  name: "m-tooltip"
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...__default__$3,
  props: TooltipProps,
  setup(__props, { expose: __expose }) {
    const instance = getCurrentInstance();
    const uid = instance.uid;
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
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mvi-tooltip", { block: _ctx.block }])
      }, [
        createElementVNode("div", {
          onClick: clickShowTooltip,
          onMouseenter: hoverShowTooltip,
          onMouseleave: hoverHideToolTip,
          class: "mvi-tooltip-toggle",
          ref: "toggle",
          "data-id": "mvi-tooltip-relate-" + unref(uid)
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 40, _hoisted_1$2),
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
          relate: `[data-id='mvi-tooltip-relate-${unref(uid)}']`,
          placement: _ctx.placement,
          width: _ctx.width,
          timeout: _ctx.timeout,
          animation: _ctx.animation || "mvi-tooltip",
          shadow: false
        }, {
          default: withCtx(() => [
            createElementVNode("div", {
              class: "mvi-tooltip-content",
              ref: "content",
              style: normalizeStyle({ color: _ctx.textColor, whiteSpace: _ctx.width ? "normal" : "" })
            }, [
              _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", {
                key: 1,
                textContent: toDisplayString(_ctx.title)
              }, null, 8, _hoisted_2$2))
            ], 4)
          ]),
          _: 3
        }, 8, ["modelValue", "offset", "background", "border-color", "show-triangle", "z-index", "relate", "placement", "width", "timeout", "animation"])
      ], 2);
    };
  }
});
const Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7cd8b5a0"]]);
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
const __default__$2 = defineComponent({
  name: "m-transition-slide"
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__$2,
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
    watch(() => props.expand, (newValue) => {
      show.value = newValue;
    });
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
const TransitionSlide = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-9f12bc43"]]);
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
const _hoisted_1$1 = ["disabled"];
const _hoisted_2$1 = ["checked", "disabled"];
const __default__$1 = defineComponent({
  name: "m-switch"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
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
        }, null, 40, _hoisted_2$1)
      ], 14, _hoisted_1$1);
    };
  }
});
const Switch = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4779fd4c"]]);
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
const _hoisted_1 = ["textContent"];
const _hoisted_2 = { class: "mvi-navbar-title" };
const _hoisted_3 = ["textContent"];
const _hoisted_4 = ["textContent"];
const __default__ = defineComponent({
  name: "m-navbar"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: NavbarProps,
  emits: ["left-click", "right-click", "title-click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const parseIcon = computed(() => {
      return (params) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
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
      return parseIcon.value(props.leftIcon).type || parseIcon.value(props.leftIcon).url || useSlots().left || props.leftText;
    });
    const showRight = computed(() => {
      return parseIcon.value(props.rightIcon).type || parseIcon.value(props.rightIcon).url || useSlots().right || props.rightText;
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
        style: normalizeStyle("z-index:" + (_ctx.fixed ? _ctx.zIndex : ""))
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
          }, null, 8, _hoisted_1)) : createCommentVNode("", true)
        ], 4)) : createCommentVNode("", true),
        _ctx.$slots.title || _ctx.title ? (openBlock(), createElementBlock("div", {
          key: 1,
          onClick: _cache[1] || (_cache[1] = ($event) => emits("title-click")),
          class: "mvi-navbar-center",
          style: normalizeStyle(centerStyle.value)
        }, [
          createElementVNode("div", _hoisted_2, [
            _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : _ctx.title ? (openBlock(), createElementBlock("span", {
              key: 1,
              textContent: toDisplayString(_ctx.title)
            }, null, 8, _hoisted_3)) : createCommentVNode("", true)
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
          }, null, 8, _hoisted_4)) : createCommentVNode("", true),
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
const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ce65927c"]]);
Navbar.install = (app) => {
  app.component(Navbar.name, Navbar);
};
obj.event.on(window, "touchstart.ios", () => {
});
const install = (app) => {
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
    Navbar
  };
  Object.values(components).map((component) => {
    component.install(app);
  });
};
const version = "1.9.4";
const stdin_default = {
  install,
  version
};
export {
  Anchor$1 as Anchor,
  Autocomplete,
  Badge,
  Button,
  Cell,
  CellGroup,
  Checkbox,
  Col,
  Divider,
  Drag$1 as Drag,
  Dropdown,
  Icon,
  Input,
  Label,
  Layer,
  Loading,
  LoadingBar,
  Msgbox,
  Navbar,
  Observe$1 as Observe,
  Overlay,
  Popup,
  Prop$1 as Prop,
  Px$1 as Px,
  Radio,
  Resize$1 as Resize,
  Ripple$1 as Ripple,
  Roll,
  Row,
  Scroll$1 as Scroll,
  Sign,
  Spy$1 as Spy,
  Switch,
  Tooltip,
  TransitionSlide,
  Triangle,
  Upload$1 as Upload,
  stdin_default as default,
  install,
  version
};
