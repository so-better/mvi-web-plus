import { openBlock, createElementBlock, normalizeClass, normalizeStyle, h, resolveComponent, createBlock, withCtx, renderSlot, Fragment, createVNode, toDisplayString, createCommentVNode, createElementVNode, renderList, Teleport, Transition, withDirectives, mergeProps, withModifiers, vShow, getCurrentInstance, vModelText, vModelDynamic, createSlots, withKeys, createTextVNode, createApp, pushScopeId, popScopeId } from "vue";
const mviDefault = "";
const mviSupport = "";
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
      reg = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([\da-z\.]{2,6})([\/\w \.-]*)*\/?$/;
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
obj.install = (app) => {
  app.config.globalProperties.$dap = obj;
  app.provide("$dap", obj);
};
obj.event.on(window, "touchstart.ios", (e) => {
});
class Anchor {
  constructor(element2, options) {
    this.$el = element2;
    options = obj.common.isObject(options) ? options : {};
    this.$target = options.target;
    this.$root = options.root;
    this.callback = options.callback;
    this.time = options.time;
    this.distance = options.distance;
    this.hasInit = false;
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
      obj.event.on(this.$el, "click.anchor", (e) => {
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
      obj.event.on(this.$el, "click.anchor", (e) => {
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
class Resize {
  constructor(element2, options) {
    this.$el = element2;
    options = obj.common.isObject(options) ? options : {};
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
    this.guid = this.createGuid();
  }
  ///判断点击的点是否在指定区域范围内
  getIsInRange(x, y, range) {
    let conditions1 = x >= range.x[0] && x <= range.x[1];
    let conditions2 = y >= range.y[0] && y <= range.y[1];
    if (conditions1 && conditions2) {
      return true;
    } else {
      return false;
    }
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
              area: Resize.AREA.LEFTTOP
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
              area: Resize.AREA.LEFTBOTTOM
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
              area: Resize.AREA.RIGHTTOP
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
              area: Resize.AREA.RIGHTBOTTOM
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
              area: Resize.AREA.LEFT
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
              area: Resize.AREA.RIGHT
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
              area: Resize.AREA.TOP
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
              area: Resize.AREA.BOTTOM
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
              area: Resize.AREA.LEFT
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
              area: Resize.AREA.RIGHT
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
              area: Resize.AREA.TOP
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
              area: Resize.AREA.BOTTOM
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
        } else if (this.getIsInRange(this.startX, this.startY, this.leftBottomRange)) {
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
        } else if (this.getIsInRange(this.startX, this.startY, this.rightTopRange)) {
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
        } else if (this.getIsInRange(this.startX, this.startY, this.rightBottomRange)) {
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
        } else if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
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
        } else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
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
        } else if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
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
        } else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
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
        if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
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
        } else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
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
        if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
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
        } else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
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
              area: Resize.AREA.LEFTTOP
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.leftBottomRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.LEFTBOTTOM
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.rightTopRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.RIGHTTOP
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.rightBottomRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.RIGHTBOTTOM
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.LEFT
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.RIGHT
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.TOP
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.BOTTOM
            }
          ]);
        }
      } else if (this.draggableX) {
        if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.LEFT
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.RIGHT
            }
          ]);
        }
      } else if (this.draggableY) {
        if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
          this.end.apply(this, [
            {
              event: e,
              area: Resize.AREA.TOP
            }
          ]);
        } else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
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
Resize.AREA = {
  LEFT: "left",
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFTTOP: "left-top",
  LEFTBOTTOM: "left-bottom",
  RIGHTTOP: "right-top",
  RIGHTBOTTOM: "right-bottom"
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
class Drag {
  constructor(element2, options) {
    this.$el = element2;
    options = obj.common.isObject(options) ? options : {};
    this.$container = options.container;
    this.draggableX = options.draggableX;
    this.draggableY = options.draggableY;
    this.mode = options.mode;
    this.cursor = options.cursor;
    this.drag = options.drag;
    this.beforeDrag = options.beforeDrag;
    this.dragged = options.dragged;
    this.ready = options.ready;
    this.draggable = false;
    this.hasInit = false;
    this.pageX = 0;
    this.pageY = 0;
    this.guid = this.createGuid();
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
          this.$el.style.left = 0;
        }
        if (obj.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth - this.$el.offsetWidth) {
          this.$el.style.left = this.$container.offsetWidth - this.$el.offsetWidth + "px";
        }
      }
      if (this.draggableY) {
        if (obj.element.getElementPoint(this.$el, this.$container).top <= 0) {
          this.$el.style.top = 0;
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
class Prop {
  constructor(element2, ratio) {
    this.$el = element2;
    this.ratio = ratio;
    this.width = 0;
    this.height = 0;
    this.hasInit = false;
    this.guid = this.createGuid();
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
    obj.event.on(window, `resize.prop_${this.guid}`, (e) => {
      this.set();
    });
  }
  //api：移除绑定在window的事件
  destroy() {
    obj.event.off(window, `resize.prop_${this.guid}`);
  }
}
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
class Scroll {
  constructor(element2, options) {
    this.$el = element2;
    options = obj.common.isObject(options) ? options : {};
    this.top = options.top;
    this.bottom = options.bottom;
    this.hasInit = false;
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
    this.$el = element2;
    options = obj.common.isObject(options) ? options : {};
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
    this.guid = this.createGuid();
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
    obj.event.on(this.$root, `scroll.spy_${this.guid}`, (e) => {
      this.scrollHandle();
    });
  }
  //api：移除滚动容器监听事件
  destroy() {
    obj.event.off(this.$root, `scroll.spy_${this.guid}`);
  }
}
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
class Observe {
  constructor(el, options) {
    this.$el = el;
    if (!obj.common.isObject(options)) {
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
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
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
class Upload {
  constructor(element2, options) {
    this.$el = element2;
    options = obj.common.isObject(options) ? options : {};
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
    this.extraData = options.extraData;
    this.hasInit = false;
  }
  //判断选择的文件是否符合规定的后缀格式
  judgeSuffix(fileName) {
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
        if (!this.judgeSuffix(files[i].name)) {
          this.error.apply(this, [Upload.ERRORTYPE.FILE_SUFFIX_ERROR, files[i]]);
          isAllAccord = false;
          break;
        }
        if (files[i].size / 1024 > this.maxSize && this.maxSize > 0) {
          this.error.apply(this, [Upload.ERRORTYPE.FILE_MAXSIZE_ERROR, files[i]]);
          isAllAccord = false;
          break;
        }
        if (files[i].size / 1024 < this.minSize && this.minSize > 0) {
          this.error.apply(this, [Upload.ERRORTYPE.FILE_MINSIZE_ERROR, files[i]]);
          isAllAccord = false;
          break;
        }
        if (this.files.length + length > this.maxLength && this.maxLength > 0) {
          this.error.apply(this, [Upload.ERRORTYPE.FILE_MAXLENGTH_ERROR]);
          isAllAccord = false;
          break;
        }
      }
      if (!isAllAccord) {
        return;
      }
      if (this.files.length + length < this.minLength && this.minLength > 0) {
        this.error.apply(this, [Upload.ERRORTYPE.FILE_MINLENGTH_ERROR]);
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
Upload.ERRORTYPE = {
  //文件后缀不符合
  FILE_SUFFIX_ERROR: "suffixError",
  //超出最大文件尺寸限制
  FILE_MAXSIZE_ERROR: "maxSizeError",
  //文件尺寸没有达到要求的最小值
  FILE_MINSIZE_ERROR: "minSizeError",
  //文件数量超出限制
  FILE_MAXLENGTH_ERROR: "maxLengthError",
  //文件数量没有达到最小值
  FILE_MINLENGTH_ERROR: "minLengthError"
};
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
class Px {
  constructor(element2, options) {
    this.$el = element2;
    options = obj.common.isObject(options) ? options : {};
    this.attrName = options.attrName;
    this.isAfter = options.after;
    this.isBefore = options.before;
    this.hasInit = false;
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
      style.type = "text/css";
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
class Ripple {
  constructor(element2, options) {
    this.$el = element2;
    options = obj.common.isObject(options) ? options : {};
    this.color = options.color;
    this.duration = options.duration;
    this.finalOpacity = options.finalOpacity;
    this.initialOpacity = options.initialOpacity;
    this.delay = options.delay;
    this.disabled = options.disabled;
    this.hasInit = false;
    this.guid = this.createGuid();
    this.rippleContainers = [];
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
    const { x1, x2, y1, y2, r } = this.getRadius(pageX, pageY, rect);
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
const icon_vue_vue_type_style_index_0_scoped_cf01b528_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$13 = {
  name: "m-icon",
  props: {
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
function _sfc_render$13(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.url ? (openBlock(), createElementBlock("i", {
    key: 0,
    class: normalizeClass(["mvi-icon-url", $props.spin ? "spin" : ""]),
    style: normalizeStyle($options.iconStyle)
  }, null, 6)) : (openBlock(), createElementBlock("i", {
    key: 1,
    class: normalizeClass(["mvi-icon", "icon-" + $props.type, $props.spin ? "spin" : ""]),
    style: normalizeStyle($options.iconStyle)
  }, null, 6));
}
const Icon = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["render", _sfc_render$13], ["__scopeId", "data-v-cf01b528"]]);
Icon.install = (app) => {
  app.component(Icon.name, Icon);
};
const button_vue_vue_type_style_index_0_scoped_5d238045_lang = "";
const _sfc_main$12 = {
  name: "m-button",
  props: {
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
    //自定义按钮颜色
    color: {
      type: String,
      default: null
    },
    //自定义文字颜色
    subColor: {
      type: String,
      default: null
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
        if (obj.common.isObject(param)) {
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
        cls.push(this.type);
      }
      if (this.size) {
        cls.push(this.size);
      }
      if (this.round) {
        cls.push("round");
      } else if (this.square) {
        cls.push("square");
      }
      if (this.block) {
        cls.push("block");
      }
      if (this.plain) {
        cls.push("plain");
      }
      if (this.active && !this.disabled) {
        cls.push("active");
      }
      if (this.loading) {
        cls.push("loading");
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
const _hoisted_1$N = {
  key: 0,
  class: "mvi-button-load-text"
};
function _sfc_render$12(_ctx, _cache, $props, $setup, $data, $options) {
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
          type: $options.parseIcon($props.loadIcon).type,
          color: $options.parseIcon($props.loadIcon).color,
          url: $options.parseIcon($props.loadIcon).url,
          spin: $options.parseIcon($props.loadIcon).spin,
          size: $options.parseIcon($props.loadIcon).size
        }, null, 8, ["type", "color", "url", "spin", "size"]),
        $props.loadText ? (openBlock(), createElementBlock("span", _hoisted_1$N, toDisplayString($props.loadText), 1)) : createCommentVNode("", true)
      ], 64)) : renderSlot(_ctx.$slots, "default", { key: 2 }, void 0, true)
    ]),
    _: 3
  }, 8, ["disabled", "class", "style"]);
}
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["render", _sfc_render$12], ["__scopeId", "data-v-5d238045"]]);
Button.install = (app) => {
  app.component(Button.name, Button);
};
const cell_vue_vue_type_style_index_0_scoped_06d4a735_lang = "";
const _sfc_main$11 = {
  name: "m-cell",
  props: {
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
  },
  computed: {
    //转换图标字段
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj.common.isObject(param)) {
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
    cmpActive() {
      if (typeof this.active == "boolean") {
        return this.active;
      }
      if (this.$parent.$options.name == "m-cell-group" && typeof this.$parent.active == "boolean") {
        return this.$parent.active;
      }
      return true;
    },
    cmpBorder() {
      if (typeof this.border == "boolean") {
        return this.border;
      }
      if (typeof this.$parent.border == "boolean") {
        return this.$parent.border;
      }
      return false;
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
      if (this.cmpBorder) {
        cls.push("border");
      }
      if (this.cmpActive) {
        cls.push("active");
      }
      return cls;
    }
  },
  components: {
    Icon
  }
};
const _hoisted_1$M = { class: "mvi-cell-item" };
const _hoisted_2$F = ["textContent"];
const _hoisted_3$x = ["textContent"];
const _hoisted_4$p = ["textContent"];
function _sfc_render$11(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.cellClass)
  }, [
    createElementVNode("div", _hoisted_1$M, [
      $options.parseIcon($props.icon).type || $options.parseIcon($props.icon).url ? (openBlock(), createBlock(_component_Icon, {
        key: 0,
        class: "mvi-cell-icon",
        type: $options.parseIcon($props.icon).type,
        url: $options.parseIcon($props.icon).url,
        spin: $options.parseIcon($props.icon).spin,
        size: $options.parseIcon($props.icon).size,
        color: $options.parseIcon($props.icon).color
      }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
      createElementVNode("div", {
        class: normalizeClass(["mvi-cell-title", $props.noWrap ? "nowrap" : ""])
      }, [
        _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", {
          key: 1,
          textContent: toDisplayString($props.title)
        }, null, 8, _hoisted_2$F))
      ], 2),
      _ctx.$slots.content || $props.content ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(["mvi-cell-content", $props.noWrap ? "nowrap" : ""])
      }, [
        _ctx.$slots.content ? renderSlot(_ctx.$slots, "content", { key: 0 }, void 0, true) : $props.content ? (openBlock(), createElementBlock("span", {
          key: 1,
          textContent: toDisplayString($props.content)
        }, null, 8, _hoisted_3$x)) : createCommentVNode("", true)
      ], 2)) : createCommentVNode("", true),
      $options.parseIcon($props.arrow).type || $options.parseIcon($props.arrow).url ? (openBlock(), createBlock(_component_Icon, {
        key: 2,
        class: "mvi-cell-arrow",
        type: $options.parseIcon($props.arrow).type,
        url: $options.parseIcon($props.arrow).url,
        spin: $options.parseIcon($props.arrow).spin,
        size: $options.parseIcon($props.arrow).size,
        color: $options.parseIcon($props.arrow).color
      }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
    ]),
    $props.label || _ctx.$slots.label ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "mvi-cell-label",
      style: normalizeStyle($options.labelTextStyle)
    }, [
      _ctx.$slots.label ? renderSlot(_ctx.$slots, "label", { key: 0 }, void 0, true) : $props.label ? (openBlock(), createElementBlock("span", {
        key: 1,
        textContent: toDisplayString($props.label)
      }, null, 8, _hoisted_4$p)) : createCommentVNode("", true)
    ], 4)) : createCommentVNode("", true)
  ], 2);
}
const Cell = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["render", _sfc_render$11], ["__scopeId", "data-v-06d4a735"]]);
Cell.install = (app) => {
  app.component(Cell.name, Cell);
};
const cellGroup_vue_vue_type_style_index_0_scoped_bad36ebb_lang = "";
const _sfc_main$10 = {
  name: "m-cell-group",
  props: {
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
  }
};
const _hoisted_1$L = ["textContent"];
function _sfc_render$10(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-cell-group", $props.border ? "border" : ""])
  }, [
    $props.title ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "mvi-cell-group-title",
      textContent: toDisplayString($props.title)
    }, null, 8, _hoisted_1$L)) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
const CellGroup = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["render", _sfc_render$10], ["__scopeId", "data-v-bad36ebb"]]);
CellGroup.install = (app) => {
  app.component(CellGroup.name, CellGroup);
};
const navbar_vue_vue_type_style_index_0_scoped_774307d7_lang = "";
const _sfc_main$$ = {
  name: "m-navbar",
  props: {
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
  },
  emits: ["left-click", "right-click", "title-click"],
  computed: {
    showLeft() {
      return this.parseIcon(this.leftIcon).type || this.parseIcon(this.leftIcon).url || this.$slots.left || this.leftText;
    },
    showRight() {
      return this.parseIcon(this.rightIcon).type || this.parseIcon(this.rightIcon).url || this.$slots.right || this.rightText;
    },
    leftStyle() {
      let style = {};
      if (this.title || this.$slots.title) {
        style.width = "20%";
      } else if (this.showRight) {
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
      } else if (this.showLeft) {
        style.width = "50%";
      } else {
        style.width = "100%";
      }
      return style;
    },
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj.common.isObject(param)) {
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
    navbarClass() {
      let cls = ["mvi-navbar"];
      if (this.fixed) {
        cls.push("fixed");
      }
      if (this.border) {
        cls.push("border");
      }
      return cls;
    },
    centerStyle() {
      let style = {};
      if (this.showLeft || this.showRight) {
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
const _hoisted_1$K = ["textContent"];
const _hoisted_2$E = { class: "mvi-navbar-title" };
const _hoisted_3$w = ["textContent"];
const _hoisted_4$o = ["textContent"];
function _sfc_render$$(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.navbarClass),
    style: normalizeStyle("z-index:" + ($props.fixed ? $props.zIndex : ""))
  }, [
    $options.showLeft ? (openBlock(), createElementBlock("div", {
      key: 0,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.leftClick && $options.leftClick(...args)),
      class: "mvi-navbar-left",
      style: normalizeStyle($options.leftStyle)
    }, [
      _ctx.$slots.left ? renderSlot(_ctx.$slots, "left", { key: 0 }, void 0, true) : createCommentVNode("", true),
      ($options.parseIcon($props.leftIcon).type || $options.parseIcon($props.leftIcon).url) && !_ctx.$slots.left ? (openBlock(), createBlock(_component_Icon, {
        key: 1,
        class: normalizeClass([$props.leftText ? "mvi-navbar-left-icon" : ""]),
        type: $options.parseIcon($props.leftIcon).type,
        url: $options.parseIcon($props.leftIcon).url,
        spin: $options.parseIcon($props.leftIcon).spin,
        size: $options.parseIcon($props.leftIcon).size,
        color: $options.parseIcon($props.leftIcon).color
      }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
      $props.leftText && !_ctx.$slots.left ? (openBlock(), createElementBlock("span", {
        key: 2,
        class: "mvi-navbar-left-text",
        textContent: toDisplayString($props.leftText)
      }, null, 8, _hoisted_1$K)) : createCommentVNode("", true)
    ], 4)) : createCommentVNode("", true),
    _ctx.$slots.title || $props.title ? (openBlock(), createElementBlock("div", {
      key: 1,
      onClick: _cache[1] || (_cache[1] = (...args) => $options.titleClick && $options.titleClick(...args)),
      class: "mvi-navbar-center",
      style: normalizeStyle($options.centerStyle)
    }, [
      createElementVNode("div", _hoisted_2$E, [
        _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : $props.title ? (openBlock(), createElementBlock("span", {
          key: 1,
          textContent: toDisplayString($props.title)
        }, null, 8, _hoisted_3$w)) : createCommentVNode("", true)
      ])
    ], 4)) : createCommentVNode("", true),
    $options.showRight ? (openBlock(), createElementBlock("div", {
      key: 2,
      onClick: _cache[2] || (_cache[2] = (...args) => $options.rightClick && $options.rightClick(...args)),
      class: "mvi-navbar-right",
      style: normalizeStyle($options.rightStyle)
    }, [
      _ctx.$slots.right ? renderSlot(_ctx.$slots, "right", { key: 0 }, void 0, true) : createCommentVNode("", true),
      $props.rightText && !_ctx.$slots.right ? (openBlock(), createElementBlock("span", {
        key: 1,
        class: "mvi-navbar-right-text",
        textContent: toDisplayString($props.rightText)
      }, null, 8, _hoisted_4$o)) : createCommentVNode("", true),
      ($options.parseIcon($props.rightIcon).type || $options.parseIcon($props.rightIcon).url) && !_ctx.$slots.right ? (openBlock(), createBlock(_component_Icon, {
        key: 2,
        class: normalizeClass([$props.rightText ? "mvi-navbar-right-icon" : ""]),
        type: $options.parseIcon($props.rightIcon).type,
        url: $options.parseIcon($props.rightIcon).url,
        spin: $options.parseIcon($props.rightIcon).spin,
        size: $options.parseIcon($props.rightIcon).size,
        color: $options.parseIcon($props.rightIcon).color
      }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
    ], 4)) : createCommentVNode("", true)
  ], 6);
}
const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["render", _sfc_render$$], ["__scopeId", "data-v-774307d7"]]);
Navbar.install = (app) => {
  app.component(Navbar.name, Navbar);
};
const badge_vue_vue_type_style_index_0_scoped_399bd0e8_lang = "";
const _sfc_main$_ = {
  name: "m-badge",
  props: {
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
      const badgeExist = obj.number.isNumber(this.content) || this.content;
      if (badgeExist && this.show) {
        return true;
      }
      return false;
    }
  }
};
const _hoisted_1$J = ["data-placement"];
const _hoisted_2$D = ["data-placement"];
function _sfc_render$_(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-badge", $props.block ? "block" : ""])
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true),
    $props.dot && $props.show ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: "mvi-badge-el mvi-badge-dot",
      "data-placement": $props.placement,
      style: normalizeStyle($options.badgeStyle)
    }, null, 12, _hoisted_1$J)) : $options.badgeShow ? (openBlock(), createElementBlock("span", {
      key: 1,
      class: "mvi-badge-el",
      "data-placement": $props.placement,
      style: normalizeStyle($options.badgeStyle)
    }, toDisplayString($props.content), 13, _hoisted_2$D)) : createCommentVNode("", true)
  ], 2);
}
const Badge = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["render", _sfc_render$_], ["__scopeId", "data-v-399bd0e8"]]);
Badge.install = (app) => {
  app.component(Badge.name, Badge);
};
const tabbarItem_vue_vue_type_style_index_0_scoped_d638e245_lang = "";
const _sfc_main$Z = {
  name: "m-tabbar-item",
  inject: ["tabbar"],
  props: {
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
        if (obj.common.isObject(param)) {
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
    cmpClass() {
      let cls = ["mvi-tabbar-item"];
      if (obj.common.equal(this.value, this.tabbar.modelValue)) {
        cls.push("item-active");
      }
      if (this.tabbar.active && !this.disabled && !obj.common.equal(this.value, this.tabbar.modelValue)) {
        cls.push("active");
      }
      return cls;
    },
    cmpStyle() {
      let style = {};
      if (obj.common.equal(this.value, this.tabbar.modelValue)) {
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
    cmpRoute() {
      if (!this.route) {
        return null;
      }
      let route = {};
      if (typeof this.route == "string") {
        route = {
          path: this.route
        };
      } else if (obj.common.isObject(this.route)) {
        if (typeof this.route.path == "string" && this.route.path) {
          route.path = this.route.path;
        }
        if (typeof this.route.name == "string" && this.route.name) {
          route.name = this.route.name;
        }
        if (obj.common.isObject(this.route.query)) {
          route.query = this.route.query;
        } else {
          route.query = {};
        }
        if (obj.common.isObject(this.route.params)) {
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
      this.tabbar.$emit("item-click", JSON.parse(JSON.stringify(this.$props)));
      if (this.disabled) {
        return;
      }
      if (obj.common.equal(this.tabbar.modelValue, this.value)) {
        return;
      }
      if (this.cmpRoute && this.$router && this.$router.replace && this.$router.push) {
        if (this.cmpRoute.path) {
          if (this.cmpRoute.replace) {
            this.$router.replace({
              path: this.cmpRoute.path,
              query: this.cmpRoute.query,
              params: this.cmpRoute.params
            });
          } else {
            this.$router.push({
              path: this.cmpRoute.path,
              query: this.cmpRoute.query,
              params: this.cmpRoute.params
            });
          }
        } else if (this.cmpRoute.name) {
          if (this.cmpRoute.replace) {
            this.$router.replace({
              name: this.cmpRoute.name,
              query: this.cmpRoute.query,
              params: this.cmpRoute.params
            });
          } else {
            this.$router.push({
              name: this.cmpRoute.name,
              query: this.cmpRoute.query,
              params: this.cmpRoute.params
            });
          }
        }
      }
      this.tabbar.$emit("update:modelValue", this.value);
      this.tabbar.$emit("change", JSON.parse(JSON.stringify(this.$props)));
    }
  }
};
const _hoisted_1$I = ["disabled"];
const _hoisted_2$C = { class: "mvi-tabbar-item-child" };
const _hoisted_3$v = ["textContent"];
function _sfc_render$Z(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g;
  const _component_Icon = resolveComponent("Icon");
  const _component_Badge = resolveComponent("Badge");
  return openBlock(), createElementBlock("div", {
    disabled: $props.disabled || null,
    class: normalizeClass($options.cmpClass),
    style: normalizeStyle($options.cmpStyle),
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
        createElementVNode("div", _hoisted_2$C, [
          $options.parseIcon($props.icon).type || $options.parseIcon($props.icon).url ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: "mvi-tabbar-icon",
            style: normalizeStyle({ marginBottom: $props.name ? "" : "0px" })
          }, [
            createVNode(_component_Icon, {
              type: $options.parseIcon($props.icon).type,
              url: $options.parseIcon($props.icon).url,
              spin: $options.parseIcon($props.icon).spin,
              size: $options.parseIcon($props.icon).size,
              color: $options.parseIcon($props.icon).color
            }, null, 8, ["type", "url", "spin", "size", "color"])
          ], 4)) : createCommentVNode("", true),
          createElementVNode("span", {
            class: normalizeClass(["mvi-tabbar-name", $options.parseIcon($props.icon).type || $options.parseIcon($props.icon).url ? "small" : ""]),
            textContent: toDisplayString($props.name)
          }, null, 10, _hoisted_3$v)
        ])
      ]),
      _: 1
    }, 8, ["show", "content", "background", "color", "dot", "placement", "offset"])
  ], 14, _hoisted_1$I);
}
const TabbarItem = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["render", _sfc_render$Z], ["__scopeId", "data-v-d638e245"]]);
const tabbar_vue_vue_type_style_index_0_scoped_258fb90e_lang = "";
const _sfc_main$Y = {
  name: "m-tabbar",
  components: {
    TabbarItem
  },
  emits: ["update:modelValue", "item-click", "change"],
  provide() {
    return {
      tabbar: this
    };
  },
  props: {
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
      if (this.fixed && obj.number.isNumber(this.zIndex)) {
        style.zIndex = this.zIndex;
      }
      if (this.flex) {
        style.justifyContent = this.flex;
      }
      return style;
    }
  }
};
function _sfc_render$Y(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TabbarItem = resolveComponent("TabbarItem");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-tabbar", $props.border ? "border" : "", $props.fixed ? "fixed" : ""]),
    style: normalizeStyle($options.tabbarStyle)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.tabs, (item, index) => {
      return openBlock(), createBlock(_component_TabbarItem, {
        name: item.name,
        value: item.value,
        icon: item.icon,
        disabled: item.disabled,
        badge: item.badge,
        route: item.route,
        style: normalizeStyle($options.tabbarItemStyle(index))
      }, null, 8, ["name", "value", "icon", "disabled", "badge", "route", "style"]);
    }), 256))
  ], 6);
}
const Tabbar = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["render", _sfc_render$Y], ["__scopeId", "data-v-258fb90e"]]);
Tabbar.install = (app) => {
  app.component(Tabbar.name, Tabbar);
};
const image_vue_vue_type_style_index_0_scoped_b39a2f4f_lang = "";
const _sfc_main$X = {
  name: "m-image",
  data() {
    return {
      //是否加载失败
      error: false,
      //是否正在加载中
      loading: true,
      //延迟加载显示的图片地址
      lazySrc: "",
      //是否正在延迟中
      lazying: false,
      //spy对象
      spy: null
    };
  },
  emits: ["success", "error"],
  props: {
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
  },
  computed: {
    //转换图标字段
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj.common.isObject(param)) {
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
    //图片容器样式
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
    //图片类
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
    //图片链接
    cmpSrc() {
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
    cmpSrc() {
      this.loading = true;
    }
  },
  mounted() {
    if (this.lazyLoad) {
      this.lazyloadFun();
    }
  },
  methods: {
    //延时加载方法
    lazyloadFun() {
      this.lazying = true;
      this.spy = new Spy$1(this.$el, {
        el: this.root,
        //图片进入可视端口时加载
        beforeEnter: () => {
          this.lazying = false;
          this.lazySrc = this.src;
        }
      });
      this.spy.init();
    },
    //图片加载成功
    loadSuccess(e) {
      this.error = false;
      this.loading = false;
      this.$emit("success", e.target);
    },
    //图片加载失败
    loadError(e) {
      this.loading = false;
      this.error = true;
      this.$emit("error", e.target);
    }
  },
  beforeUnmount() {
    if (this.spy) {
      this.spy.destroy();
    }
  }
};
const _hoisted_1$H = {
  key: 0,
  class: "mvi-image-loading"
};
const _hoisted_2$B = {
  key: 1,
  class: "mvi-image-error",
  ref: "error"
};
const _hoisted_3$u = ["src", "alt"];
function _sfc_render$X(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    class: "mvi-image",
    style: normalizeStyle($options.imageStyle)
  }, [
    ($data.loading || $data.lazying) && $props.showLoading ? (openBlock(), createElementBlock("div", _hoisted_1$H, [
      _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : (openBlock(), createBlock(_component_Icon, {
        key: 1,
        type: $options.parseIcon($props.loadIcon).type,
        url: $options.parseIcon($props.loadIcon).url,
        spin: $options.parseIcon($props.loadIcon).spin,
        size: $options.parseIcon($props.loadIcon).size,
        color: $options.parseIcon($props.loadIcon).color
      }, null, 8, ["type", "url", "spin", "size", "color"]))
    ])) : $data.error && $props.showError ? (openBlock(), createElementBlock("div", _hoisted_2$B, [
      _ctx.$slots.error ? renderSlot(_ctx.$slots, "error", { key: 0 }, void 0, true) : (openBlock(), createBlock(_component_Icon, {
        key: 1,
        type: $options.parseIcon($props.errorIcon).type,
        url: $options.parseIcon($props.errorIcon).url,
        spin: $options.parseIcon($props.errorIcon).spin,
        size: $options.parseIcon($props.errorIcon).size,
        color: $options.parseIcon($props.errorIcon).color
      }, null, 8, ["type", "url", "spin", "size", "color"]))
    ], 512)) : createCommentVNode("", true),
    createElementVNode("img", {
      onLoad: _cache[0] || (_cache[0] = (...args) => $options.loadSuccess && $options.loadSuccess(...args)),
      onError: _cache[1] || (_cache[1] = (...args) => $options.loadError && $options.loadError(...args)),
      src: $options.cmpSrc,
      alt: $props.showError ? "" : $props.alt,
      class: normalizeClass($options.imgClass)
    }, null, 42, _hoisted_3$u)
  ], 4);
}
const Image$1 = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["render", _sfc_render$X], ["__scopeId", "data-v-b39a2f4f"]]);
Image$1.install = (app) => {
  app.component(Image$1.name, Image$1);
};
const overlay_vue_vue_type_style_index_0_scoped_a0d7b0dd_lang = "";
const _sfc_main$W = {
  name: "m-overlay",
  data() {
    return {
      //是否显示遮罩层
      overlayShow: false,
      //父级元素垂直滚动条距离
      scrollTop: 0,
      //父级元素水平滚动条距离
      scrollLeft: 0,
      //父级元素overflow-x
      overflowX: "",
      //父级元素overflow-y
      overflowY: "",
      //父级元素右侧内边距
      paddingRight: 0,
      //父级元素底部内边距
      paddingBottom: 0,
      //是否含有水平滚动条
      hasHorizontalScroll: false,
      //是否含有垂直滚动条
      hasVerticalScroll: false,
      //组件的定位父元素
      offsetParent: null
    };
  },
  emits: ["update:modelValue", "show", "showing", "shown", "hide", "hidding", "hidden"],
  inheritAttrs: false,
  props: {
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
  },
  watch: {
    modelValue(newValue) {
      this.overlayShow = newValue;
    }
  },
  computed: {
    //遮罩层样式
    overlayStyle() {
      let style = {};
      if (obj.number.isNumber(this.zIndex)) {
        style.zIndex = this.zIndex;
      }
      if (this.color) {
        style.background = this.color;
      }
      return style;
    },
    //遮罩层根元素
    $$el() {
      return this.$refs.overlay;
    }
  },
  mounted() {
    this.overlayShow = this.modelValue;
  },
  methods: {
    //transition钩子函数：组件显示之前
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
    //transition钩子函数：组件显示
    enter(el) {
      if (this.$$el.offsetParent) {
        this.offsetParent = this.$$el.offsetParent;
        if (obj.element.getScrollHeight(this.offsetParent) > this.offsetParent.clientHeight) {
          if (this.usePadding) {
            let scrollWidth = this.offsetParent.offsetWidth - this.offsetParent.clientWidth - parseFloat(obj.element.getCssStyle(this.offsetParent, "border-right-width")) - parseFloat(obj.element.getCssStyle(this.offsetParent, "border-left-width"));
            this.paddingRight = parseFloat(obj.element.getCssStyle(this.offsetParent, "padding-right"));
            this.offsetParent.style.setProperty("padding-right", this.paddingRight + scrollWidth + "px", "important");
          }
          this.scrollTop = obj.element.getScrollTop(this.offsetParent);
          this.overflowY = obj.element.getCssStyle(this.offsetParent, "overflow-y");
          this.offsetParent.style.setProperty("overflow-y", "hidden", "important");
          this.$$el.style.top = this.scrollTop + "px";
          this.hasVerticalScroll = true;
        }
        if (obj.element.getScrollWidth(this.offsetParent) > this.offsetParent.clientWidth) {
          if (this.usePadding) {
            let scrollHeight = this.offsetParent.offsetHeight - this.offsetParent.clientHeight - parseFloat(obj.element.getCssStyle(this.offsetParent, "border-bottom-width")) - parseFloat(obj.element.getCssStyle(this.offsetParent, "border-top-width"));
            this.paddingBottom = parseFloat(obj.element.getCssStyle(this.offsetParent, "padding-bottom"));
            this.offsetParent.style.setProperty("padding-bottom", this.paddingBottom + scrollHeight + "px", "important");
          }
          this.scrollLeft = obj.element.getScrollLeft(this.offsetParent);
          this.overflowX = obj.element.getCssStyle(this.offsetParent, "overflow-x");
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
    //组件显示之后
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
    //组件隐藏之前
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
    //组件隐藏时
    leave(el) {
      this.$emit("hidding", el);
      if (typeof this.overlayComponentWatch == "function") {
        this.overlayComponentWatch.apply(this, ["hidding", el]);
      }
    },
    //组件隐藏之后
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
    //点击遮罩关闭此遮罩
    closeOverlay() {
      if (this.closable) {
        this.$emit("update:modelValue", false);
      }
    }
  }
};
function _sfc_render$W(_ctx, _cache, $props, $setup, $data, $options) {
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
const Overlay = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["render", _sfc_render$W], ["__scopeId", "data-v-a0d7b0dd"]]);
Overlay.install = (app) => {
  app.component(Overlay.name, Overlay);
};
const popup_vue_vue_type_style_index_0_scoped_d8d0a44a_lang = "";
const _sfc_main$V = {
  name: "m-popup",
  data() {
    return {
      //popup弹窗是否显示
      popupShow: false,
      //popup弹窗是否渲染
      firstShow: false
    };
  },
  emits: ["update:modelValue", "show", "showing", "shown", "hide", "hidding", "hidden"],
  inheritAttrs: false,
  props: {
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
  },
  computed: {
    $$el() {
      return this.$refs.overlay.$$el;
    },
    show: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    },
    //弹出层类
    popupClass() {
      let cls = ["mvi-popup", this.placement];
      if (this.round) {
        cls.push("round");
      }
      if (this.showTimes) {
        if (this.timesPlacement == "top-right" || this.timesPlacement == "top-left") {
          cls.push("padding-top");
        } else if (this.timesPlacement == "bottom-right" || this.timesPlacement == "bottom-left") {
          cls.push("padding-bottom");
        }
      }
      return cls;
    },
    //弹出层样式
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
      if (obj.number.isNumber(this.zIndex)) {
        style.zIndex = this.zIndex + 10;
      }
      style.transition = "all " + this.timeout + "ms";
      return style;
    }
  },
  components: {
    Icon,
    Overlay
  },
  methods: {
    //遮罩层显示前
    overlayShow() {
      if (!this.firstShow) {
        this.firstShow = true;
      }
      this.popupShow = true;
    },
    //遮罩层隐藏之前
    overlayHide() {
      this.popupShow = false;
    },
    //弹出层显示前
    beforeEnter(el) {
      if (obj.data.get(el, "mvi-popup-beforeEnter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-popup-beforeEnter-trigger", true);
      this.$emit("show", el);
      if (typeof this.popupComponentWatch == "function") {
        this.popupComponentWatch.apply(this, ["show", el]);
      }
    },
    //弹出层显示时
    enter(el) {
      if (obj.data.get(el, "mvi-popup-enter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-popup-enter-trigger", true);
      this.$emit("showing", el);
      if (typeof this.popupComponentWatch == "function") {
        this.popupComponentWatch.apply(this, ["showing", el]);
      }
    },
    //弹出层显示后
    afterEnter(el) {
      this.$emit("shown", el);
      if (typeof this.popupComponentWatch == "function") {
        this.popupComponentWatch.apply(this, ["shown", el]);
      }
    },
    //弹出层隐藏前
    beforeLeave(el) {
      obj.data.remove(el, "mvi-popup-beforeEnter-trigger");
      obj.data.remove(el, "mvi-popup-enter-trigger");
      this.$emit("hide", el);
      if (typeof this.popupComponentWatch == "function") {
        this.popupComponentWatch.apply(this, ["hide", el]);
      }
    },
    //弹出层隐藏时
    leave(el) {
      this.$emit("hidding", el);
      if (typeof this.popupComponentWatch == "function") {
        this.popupComponentWatch.apply(this, ["hidding", el]);
      }
    },
    //弹出层隐藏后
    afterLeave(el) {
      this.$emit("hidden", el);
      if (typeof this.popupComponentWatch == "function") {
        this.popupComponentWatch.apply(this, ["hidden", el]);
      }
    }
  }
};
function _sfc_render$V(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Overlay = resolveComponent("Overlay");
  return openBlock(), createBlock(_component_Overlay, {
    ref: "overlay",
    modelValue: $options.show,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $options.show = $event),
    onShow: $options.overlayShow,
    onHide: $options.overlayHide,
    "use-padding": $props.usePadding,
    "z-index": $props.zIndex,
    color: $props.overlayColor,
    timeout: $props.timeout,
    "mount-el": $props.mountEl,
    closable: $props.closable
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
              class: normalizeClass(["mvi-popup-times", $props.timesPlacement])
            }, [
              createVNode(_component_Icon, {
                onClick: _cache[0] || (_cache[0] = ($event) => $options.show = false),
                type: "times"
              })
            ], 2)) : createCommentVNode("", true),
            createElementVNode("div", {
              class: "mvi-popup-content",
              style: normalizeStyle({ padding: $props.__contentPadding ? "" : 0 })
            }, [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 4)
          ], 16)), [
            [vShow, $data.popupShow]
          ]) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
    ]),
    _: 3
  }, 8, ["modelValue", "onShow", "onHide", "use-padding", "z-index", "color", "timeout", "mount-el", "closable"]);
}
const Popup = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["render", _sfc_render$V], ["__scopeId", "data-v-d8d0a44a"]]);
Popup.install = (app) => {
  app.component(Popup.name, Popup);
};
const checkbox_vue_vue_type_style_index_0_scoped_00535896_lang = "";
const _sfc_main$U = {
  name: "m-checkbox",
  emits: ["update:modelValue", "change"],
  props: {
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
  },
  computed: {
    check() {
      if (typeof this.modelValue == "boolean") {
        return this.modelValue;
      } else if (Array.isArray(this.modelValue)) {
        return this.modelValue.some((item) => {
          return obj.common.equal(item, this.value);
        });
      } else {
        return false;
      }
    },
    itemStyle() {
      let style = {};
      if (this.color && this.check && !this.disabled) {
        style.backgroundColor = this.color;
        style.borderColor = this.color;
      }
      if (this.size) {
        style.fontSize = this.size;
      }
      return style;
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
            return !obj.common.equal(item, this.value);
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
const _hoisted_1$G = ["disabled"];
const _hoisted_2$A = ["data-placement", "textContent"];
const _hoisted_3$t = ["value", "disabled", "checked", "name"];
const _hoisted_4$n = ["data-placement", "textContent"];
function _sfc_render$U(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("label", {
    class: "mvi-checkbox",
    disabled: $props.disabled || null
  }, [
    $props.placement == "left" && $props.label ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: "mvi-checkbox-label",
      "data-placement": $props.placement,
      textContent: toDisplayString($props.label)
    }, null, 8, _hoisted_2$A)) : createCommentVNode("", true),
    createElementVNode("input", {
      onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args)),
      value: $props.value,
      disabled: $props.disabled,
      checked: $options.check,
      type: "checkbox",
      name: $props.name
    }, null, 40, _hoisted_3$t),
    createElementVNode("span", {
      class: normalizeClass(["mvi-checkbox-item", $options.check ? "check" : "", $props.round ? "round" : ""]),
      style: normalizeStyle($options.itemStyle)
    }, [
      createVNode(_component_Icon, {
        type: "success",
        style: normalizeStyle({ opacity: $options.check ? "" : 0 })
      }, null, 8, ["style"])
    ], 6),
    $props.placement == "right" && $props.label ? (openBlock(), createElementBlock("span", {
      key: 1,
      class: "mvi-checkbox-label",
      "data-placement": $props.placement,
      textContent: toDisplayString($props.label)
    }, null, 8, _hoisted_4$n)) : createCommentVNode("", true)
  ], 8, _hoisted_1$G);
}
const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["render", _sfc_render$U], ["__scopeId", "data-v-00535896"]]);
Checkbox.install = (app) => {
  app.component(Checkbox.name, Checkbox);
};
const radio_vue_vue_type_style_index_0_scoped_31aceae6_lang = "";
const _sfc_main$T = {
  name: "m-radio",
  emits: ["update:modelValue", "change"],
  props: {
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
  },
  computed: {
    check() {
      if (typeof this.modelValue == "boolean") {
        return this.modelValue;
      } else {
        return obj.common.equal(this.modelValue, this.value);
      }
    },
    itemStyle() {
      let style = {};
      if (this.color && this.check && !this.disabled) {
        style.backgroundColor = this.color;
        style.borderColor = this.color;
      }
      if (this.size) {
        style.fontSize = this.size;
      }
      return style;
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
const _hoisted_1$F = ["disabled"];
const _hoisted_2$z = ["data-placement", "textContent"];
const _hoisted_3$s = ["value", "disabled", "checked", "name"];
const _hoisted_4$m = ["data-placement", "textContent"];
function _sfc_render$T(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("label", {
    class: "mvi-radio",
    disabled: $props.disabled || null
  }, [
    $props.placement == "left" && $props.label ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: "mvi-radio-label",
      "data-placement": $props.placement,
      textContent: toDisplayString($props.label)
    }, null, 8, _hoisted_2$z)) : createCommentVNode("", true),
    createElementVNode("input", {
      onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args)),
      value: $props.value,
      disabled: $props.disabled,
      checked: $options.check,
      type: "radio",
      name: $props.name
    }, null, 40, _hoisted_3$s),
    createElementVNode("span", {
      class: normalizeClass(["mvi-radio-item", $options.check ? "check" : "", $props.round ? "round" : ""]),
      style: normalizeStyle($options.itemStyle)
    }, [
      createVNode(_component_Icon, {
        type: "success",
        style: normalizeStyle({ opacity: this.check ? "" : 0 })
      }, null, 8, ["style"])
    ], 6),
    $props.placement == "right" && $props.label ? (openBlock(), createElementBlock("span", {
      key: 1,
      class: "mvi-radio-label",
      "data-placement": $props.placement,
      textContent: toDisplayString($props.label)
    }, null, 8, _hoisted_4$m)) : createCommentVNode("", true)
  ], 8, _hoisted_1$F);
}
const Radio = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$T], ["__scopeId", "data-v-31aceae6"]]);
Radio.install = (app) => {
  app.component(Radio.name, Radio);
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
    var p = function(t2) {
      return t2 instanceof b;
    }, S = function t2(e2, n2, r2) {
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
    }, w = function(t2, e2) {
      if (p(t2))
        return t2.clone();
      var n2 = "object" == typeof e2 ? e2 : {};
      return n2.date = t2, n2.args = arguments, new b(n2);
    }, O = v;
    O.l = S, O.i = p, O.w = function(t2, e2) {
      return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
    };
    var b = function() {
      function M2(t2) {
        this.$L = S(t2.locale, null, true), this.parse(t2);
      }
      var m2 = M2.prototype;
      return m2.parse = function(t2) {
        this.$d = function(t3) {
          var e2 = t3.date, n2 = t3.utc;
          if (null === e2)
            return /* @__PURE__ */ new Date(NaN);
          if (O.u(e2))
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
        }(t2), this.$x = t2.x || {}, this.init();
      }, m2.init = function() {
        var t2 = this.$d;
        this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
      }, m2.$utils = function() {
        return O;
      }, m2.isValid = function() {
        return !(this.$d.toString() === l);
      }, m2.isSame = function(t2, e2) {
        var n2 = w(t2);
        return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
      }, m2.isAfter = function(t2, e2) {
        return w(t2) < this.startOf(e2);
      }, m2.isBefore = function(t2, e2) {
        return this.endOf(e2) < w(t2);
      }, m2.$g = function(t2, e2, n2) {
        return O.u(t2) ? this[e2] : this.set(n2, t2);
      }, m2.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m2.valueOf = function() {
        return this.$d.getTime();
      }, m2.startOf = function(t2, e2) {
        var n2 = this, r2 = !!O.u(e2) || e2, f2 = O.p(t2), l2 = function(t3, e3) {
          var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
          return r2 ? i2 : i2.endOf(a);
        }, $2 = function(t3, e3) {
          return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
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
        var n2, o2 = O.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h2] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
        if (o2 === c || o2 === h2) {
          var y2 = this.clone().set(d, 1);
          y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
        } else
          l2 && this.$d[l2]($2);
        return this.init(), this;
      }, m2.set = function(t2, e2) {
        return this.clone().$set(t2, e2);
      }, m2.get = function(t2) {
        return this[O.p(t2)]();
      }, m2.add = function(r2, f2) {
        var d2, l2 = this;
        r2 = Number(r2);
        var $2 = O.p(f2), y2 = function(t2) {
          var e2 = w(l2);
          return O.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
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
        return O.w(m3, this);
      }, m2.subtract = function(t2, e2) {
        return this.add(-1 * t2, e2);
      }, m2.format = function(t2) {
        var e2 = this, n2 = this.$locale();
        if (!this.isValid())
          return n2.invalidDate || l;
        var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h3 = function(t3, n3, i3, s3) {
          return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
        }, d2 = function(t3) {
          return O.s(s2 % 12 || 12, t3, "0");
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
                return O.s(e2.$y, 4, "0");
              case "M":
                return a2 + 1;
              case "MM":
                return O.s(a2 + 1, 2, "0");
              case "MMM":
                return h3(n2.monthsShort, a2, c2, 3);
              case "MMMM":
                return h3(c2, a2);
              case "D":
                return e2.$D;
              case "DD":
                return O.s(e2.$D, 2, "0");
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
                return O.s(s2, 2, "0");
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
                return O.s(u2, 2, "0");
              case "s":
                return String(e2.$s);
              case "ss":
                return O.s(e2.$s, 2, "0");
              case "SSS":
                return O.s(e2.$ms, 3, "0");
              case "Z":
                return i2;
            }
            return null;
          }(t3) || i2.replace(":", "");
        });
      }, m2.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m2.diff = function(r2, d2, l2) {
        var $2, y2 = this, M3 = O.p(d2), m3 = w(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
          return O.m(y2, m3);
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
        return l2 ? $2 : O.a($2);
      }, m2.daysInMonth = function() {
        return this.endOf(c).$D;
      }, m2.$locale = function() {
        return D[this.$L];
      }, m2.locale = function(t2, e2) {
        if (!t2)
          return this.$L;
        var n2 = this.clone(), r2 = S(t2, e2, true);
        return r2 && (n2.$L = r2), n2;
      }, m2.clone = function() {
        return O.w(this.$d, this);
      }, m2.toDate = function() {
        return new Date(this.valueOf());
      }, m2.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m2.toISOString = function() {
        return this.$d.toISOString();
      }, m2.toString = function() {
        return this.$d.toUTCString();
      }, M2;
    }(), _ = b.prototype;
    return w.prototype = _, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h2], ["$D", d]].forEach(function(t2) {
      _[t2[1]] = function(e2) {
        return this.$g(e2, t2[0], t2[1]);
      };
    }), w.extend = function(t2, e2) {
      return t2.$i || (t2(e2, b, w), t2.$i = true), w;
    }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
      return w(1e3 * t2);
    }, w.en = D[g], w.Ls = D, w.p = {}, w;
  });
})(dayjs_min);
var dayjs_minExports = dayjs_min.exports;
const dayjs = /* @__PURE__ */ getDefaultExportFromCjs(dayjs_minExports);
const loading_vue_vue_type_style_index_0_scoped_b847f63e_lang = "";
const _sfc_main$S = {
  name: "m-loading",
  props: {
    //颜色
    color: {
      type: String,
      default: "#bbb"
    },
    //尺寸
    size: {
      type: String,
      default: "0.4rem"
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
    }
  }
};
function _sfc_render$S(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "mvi-loading",
    style: normalizeStyle({ width: $props.size, height: $props.size })
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(new Array(12), (item) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle($options.loadingStyle)
      }, null, 4);
    }), 256))
  ], 4);
}
const Loading = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$S], ["__scopeId", "data-v-b847f63e"]]);
Loading.install = (app) => {
  app.component(Loading.name, Loading);
};
const picker_vue_vue_type_style_index_0_scoped_4d117a98_lang = "";
const _sfc_main$R = {
  name: "m-picker",
  data() {
    return {
      offsets: [],
      startY: 0,
      startY2: 0,
      //触摸的时间
      time: 0,
      oldActives: [],
      amounts: 0,
      //鼠标是否按下
      mouseDown: false,
      //按下的列序列
      columnIndex: 0,
      //开始时间
      StartTimeStamp: 0,
      //结束时间
      endTimeStamp: 0,
      itemRefs: []
    };
  },
  emits: ["confirm", "cancel", "change"],
  props: {
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
  },
  watch: {
    cmpOptions() {
      this.init();
    }
  },
  computed: {
    //单个高度
    cmpHeight() {
      if (this.selectHeight.includes("px")) {
        return parseFloat(this.selectHeight);
      } else if (this.selectHeight.includes("rem")) {
        return obj.element.rem2px(parseFloat(this.selectHeight));
      }
    },
    //加载状态样式
    loadingStyle() {
      let style = {};
      style.height = `calc(${obj.number.mutiply(this.cmpHeight, this.visibleCounts)}px + 0.88rem)`;
      return style;
    },
    //内容区域样式
    contentStyle() {
      let style = {};
      style.height = `${obj.number.mutiply(this.cmpHeight, this.visibleCounts)}px`;
      return style;
    },
    //选项配置
    cmpOptions() {
      let op = [];
      if (Array.isArray(this.options)) {
        op = this.options;
      } else {
        op = [this.options];
      }
      return op;
    },
    //每一列样式
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
          value: this.cmpOptions[i].values[this.getActive(this.offsets[i])]
        });
      }
      return arr;
    },
    maskStyle() {
      let style = {};
      if (this.selectHeight) {
        style.backgroundSize = "100% " + obj.number.mutiply(this.cmpHeight, obj.number.divide(this.visibleCounts - 1, 2)) + "px";
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
    obj.event.on(document.documentElement, `mousemove.picker_${this.uid}`, this.mousemove);
    obj.event.on(document.documentElement, `mouseup.picker_${this.uid}`, this.mouseup);
  },
  methods: {
    //初始化
    init() {
      this.offsets = [];
      for (let i = 0; i < this.cmpOptions.length; i++) {
        this.offsets.push(this.getOffset(this.cmpOptions[i].defaultIndex || 0));
      }
    },
    //滑动临界值
    crisis(index) {
      let max = obj.number.divide(this.visibleCounts - 1, 2);
      max = obj.number.mutiply(max, this.cmpHeight);
      let min = -obj.number.divide(this.visibleCounts - 1, 2);
      min = obj.number.mutiply(min, this.cmpHeight);
      min += obj.number.mutiply(this.visibleCounts - this.cmpOptions[index].values.length, this.cmpHeight);
      return {
        max,
        min
      };
    },
    //根据offset计算序列
    getActive(value) {
      let num = Math.abs(obj.number.divide(value - obj.number.mutiply(obj.number.divide(this.visibleCounts - 1, 2), this.cmpHeight), this.cmpHeight));
      return Math.round(num);
    },
    //根据序列计算offset
    getOffset(index) {
      return obj.number.mutiply(obj.number.subtract(obj.number.divide(this.visibleCounts - 1, 2), index), this.cmpHeight);
    },
    //确认
    doConfirm() {
      if (this.actives.length == 1) {
        this.$emit("confirm", this.actives[0]);
      } else {
        this.$emit("confirm", this.actives);
      }
    },
    //取消
    doCancel() {
      this.init();
      if (this.actives.length == 1) {
        this.$emit("cancel", this.actives[0]);
      } else {
        this.$emit("cancel", this.actives);
      }
    },
    //添加动画
    addTransition(index, timeout) {
      return new Promise((resolve) => {
        this.itemRefs[index].style.transition = "all " + timeout + "ms ease-out";
        this.itemRefs[index].style.webkitTransition = "all " + timeout + "ms ease-out";
        setTimeout(() => {
          resolve();
        }, 0);
      });
    },
    //移除动画
    removeTransition(index) {
      return new Promise((resolve) => {
        this.itemRefs[index].style.transition = "";
        this.itemRefs[index].style.webkitTransition = "";
        setTimeout(() => {
          resolve();
        }, 0);
      });
    },
    //开始触摸
    touchstart(event2, index) {
      this.startY = event2.targetTouches[0].pageY;
      this.startY2 = this.startY;
      this.time = Date.now();
      this.oldActives = this.actives;
      this.amounts = 0;
      this.columnIndex = index;
      this.StartTimeStamp = Date.now();
    },
    //鼠标开始按下
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
    //触摸过程
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
      this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + moveY / 1.6;
      this.startY = endY;
    },
    //鼠标拖动
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
      this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + moveY / 1.6;
      this.startY = endY;
    },
    //触摸结束
    touchend(event2) {
      this.endTimeStamp = Date.now();
      let moveTotal = event2.changedTouches[0].pageY - this.startY2;
      let totalTimeStamp = this.endTimeStamp - this.StartTimeStamp;
      if (totalTimeStamp < 300 && Math.abs(moveTotal) > this.cmpHeight) {
        this.addTransition(this.columnIndex, 1e3).then(() => {
          if (moveTotal > 0) {
            this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + obj.element.rem2px(10) * totalTimeStamp / 1e3;
          } else {
            this.offsets[this.columnIndex] = this.offsets[this.columnIndex] - obj.element.rem2px(10) * totalTimeStamp / 1e3;
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
    //鼠标松开
    mouseup(event2) {
      if (!this.mouseDown) {
        return;
      }
      this.mouseDown = false;
      this.endTimeStamp = Date.now();
      let moveTotal = event2.pageY - this.startY2;
      let totalTimeStamp = this.endTimeStamp - this.StartTimeStamp;
      if (totalTimeStamp < 300 && Math.abs(moveTotal) > this.cmpHeight) {
        this.addTransition(this.columnIndex, 1e3).then(() => {
          if (moveTotal > 0) {
            this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + obj.element.rem2px(10) * totalTimeStamp / 1e3;
          } else {
            this.offsets[this.columnIndex] = this.offsets[this.columnIndex] - obj.element.rem2px(10) * totalTimeStamp / 1e3;
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
    //滑动后归位处理
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
          this.$emit("change", this.columnIndex, this.actives[0]);
        }
      } else {
        let flag = true;
        for (let i = 0; i < this.oldActives.length; i++) {
          if (this.oldActives[i].index != this.actives[i].index) {
            flag = false;
          }
        }
        if (!flag) {
          this.$emit("change", this.columnIndex, this.actives);
        }
      }
      setTimeout(() => {
        this.removeTransition(this.columnIndex);
      }, timeout);
    },
    //禁用content的touchmove
    contentTouchMove(event2) {
      if (event2.cancelable) {
        event2.preventDefault();
      }
    }
  },
  beforeUnmount() {
    obj.event.off(document.documentElement, `mousemove.picker_${this.uid} mouseup.picker_${this.uid}`);
  }
};
const _hoisted_1$E = { class: "mvi-picker" };
const _hoisted_2$y = {
  key: 1,
  class: "mvi-picker-toolbar"
};
const _hoisted_3$r = ["textContent"];
const _hoisted_4$l = ["textContent"];
const _hoisted_5$e = ["textContent"];
const _hoisted_6$a = ["onTouchstart", "onMousedown"];
const _hoisted_7$a = ["textContent"];
function _sfc_render$R(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Loading = resolveComponent("Loading");
  return openBlock(), createElementBlock("div", _hoisted_1$E, [
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
    $props.showToolbar && !$props.loading ? (openBlock(), createElementBlock("div", _hoisted_2$y, [
      createElementVNode("div", {
        class: "mvi-picker-toolbar-cancel",
        textContent: toDisplayString($props.cancelText),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.doCancel && $options.doCancel(...args))
      }, null, 8, _hoisted_3$r),
      $props.title ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "mvi-picker-toolbar-title",
        textContent: toDisplayString($props.title)
      }, null, 8, _hoisted_4$l)) : createCommentVNode("", true),
      createElementVNode("div", {
        class: "mvi-picker-toolbar-confirm",
        textContent: toDisplayString($props.confirmText),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.doConfirm && $options.doConfirm(...args))
      }, null, 8, _hoisted_5$e)
    ])) : createCommentVNode("", true),
    !$props.loading ? (openBlock(), createElementBlock("div", {
      key: 2,
      class: "mvi-picker-content",
      style: normalizeStyle($options.contentStyle),
      ref: "content",
      onTouchmove: _cache[4] || (_cache[4] = (...args) => $options.contentTouchMove && $options.contentTouchMove(...args))
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.cmpOptions, (column, index) => {
        return openBlock(), createElementBlock("div", {
          class: "mvi-picker-items",
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
              textContent: toDisplayString(item),
              style: normalizeStyle({ height: $props.selectHeight || "" })
            }, null, 12, _hoisted_7$a);
          }), 256))
        ], 44, _hoisted_6$a);
      }), 256)),
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
const Picker = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$R], ["__scopeId", "data-v-4d117a98"]]);
Picker.install = (app) => {
  app.component(Picker.name, Picker);
};
const datePicker_vue_vue_type_style_index_0_scoped_a1692616_lang = "";
const _sfc_main$Q = {
  name: "m-date-picker",
  emits: ["update:modelValue", "confirm", "cancel", "change"],
  props: {
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
      type: Function
    }
  },
  computed: {
    //已选择的日期
    selectedDate: {
      set(value) {
        if (value instanceof Date) {
          const unit = this.getUnit();
          if (dayjs(value).isBefore(dayjs(this.startDate), unit)) {
            value = this.startDate;
          }
          if (dayjs(value).isAfter(dayjs(this.endDate), unit)) {
            value = this.endDate;
          }
        }
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      },
      get() {
        if (this.modelValue instanceof Date) {
          const unit = this.getUnit();
          if (dayjs(this.modelValue).isBefore(dayjs(this.startDate), unit)) {
            return this.startDate;
          }
          if (dayjs(this.modelValue).isAfter(dayjs(this.endDate), unit)) {
            return this.endDate;
          }
          return this.modelValue;
        }
        return /* @__PURE__ */ new Date();
      }
    },
    //年份数组
    years() {
      let arr = [];
      let currentYear = this.startDate.getFullYear();
      while (currentYear <= this.endDate.getFullYear()) {
        arr.push(currentYear);
        currentYear++;
      }
      return arr;
    },
    //月份数组
    months() {
      const format = dayjs(this.selectedDate).format("YYYY");
      let arr = [];
      for (let i = 1; i <= 12; i++) {
        if (dayjs(`${format}-${i < 10 ? "0" + i : i}`).isBefore(dayjs(this.startDate), "month")) {
          continue;
        }
        if (dayjs(`${format}-${i < 10 ? "0" + i : i}`).isAfter(dayjs(this.endDate), "month")) {
          continue;
        }
        arr.push(i);
      }
      return arr;
    },
    //日期数组
    days() {
      const format = dayjs(this.selectedDate).format("YYYY-MM");
      let arr = [];
      const total = dayjs(this.selectedDate).daysInMonth();
      for (let i = 1; i <= total; i++) {
        if (dayjs(`${format}-${i < 10 ? "0" + i : i}`).isBefore(dayjs(this.startDate), "date")) {
          continue;
        }
        if (dayjs(`${format}-${i < 10 ? "0" + i : i}`).isAfter(dayjs(this.endDate), "date")) {
          continue;
        }
        arr.push(i);
      }
      return arr;
    },
    //时数组
    hours() {
      const format = dayjs(this.selectedDate).format("YYYY-MM-DD");
      let arr = [];
      for (let i = 0; i < 24; i++) {
        if (dayjs(`${format} ${i < 10 ? "0" + i : i}`).isBefore(dayjs(this.startDate), "hour")) {
          continue;
        }
        if (dayjs(`${format} ${i < 10 ? "0" + i : i}`).isAfter(dayjs(this.endDate), "hour")) {
          continue;
        }
        arr.push(i);
      }
      return arr;
    },
    //分数组
    minutes() {
      const format = dayjs(this.selectedDate).format("YYYY-MM-DD HH");
      let arr = [];
      for (let i = 0; i < 60; i++) {
        if (dayjs(`${format}:${i < 10 ? "0" + i : i}`).isBefore(dayjs(this.startDate), "minute")) {
          continue;
        }
        if (dayjs(`${format}:${i < 10 ? "0" + i : i}`).isAfter(dayjs(this.endDate), "minute")) {
          continue;
        }
        arr.push(i);
      }
      return arr;
    },
    //选择器数据配置
    pickerOptions() {
      const yearColumn = {
        defaultIndex: this.years.findIndex((item) => {
          return item == this.selectedDate.getFullYear();
        }),
        values: this.years.map((item) => {
          if (typeof this.formatter == "function") {
            return this.formatter.apply(this, ["year", item]);
          }
          return `${item}年`;
        })
      };
      const monthColumn = {
        defaultIndex: this.months.findIndex((item) => {
          return item == this.selectedDate.getMonth() + 1;
        }),
        values: this.months.map((item) => {
          if (typeof this.formatter == "function") {
            return this.formatter.apply(this, ["month", item]);
          }
          return `${item}月`;
        })
      };
      const dateColumn = {
        defaultIndex: this.days.findIndex((item) => {
          return item == this.selectedDate.getDate();
        }),
        values: this.days.map((item) => {
          if (typeof this.formatter == "function") {
            return this.formatter.apply(this, ["date", item]);
          }
          return `${item}日`;
        })
      };
      const hourColumn = {
        defaultIndex: this.hours.findIndex((item) => {
          return item == this.selectedDate.getHours();
        }),
        values: this.hours.map((item) => {
          if (typeof this.formatter == "function") {
            return this.formatter.apply(this, ["hour", item]);
          }
          return `${item}时`;
        })
      };
      const minuteColumn = {
        defaultIndex: this.minutes.findIndex((item) => {
          return item == this.selectedDate.getMinutes();
        }),
        values: this.minutes.map((item) => {
          if (typeof this.formatter == "function") {
            return this.formatter.apply(this, ["minute", item]);
          }
          return `${item}分`;
        })
      };
      if (this.mode == "year") {
        return yearColumn;
      }
      if (this.mode == "month") {
        return [yearColumn, monthColumn];
      }
      if (this.mode == "date") {
        return [yearColumn, monthColumn, dateColumn];
      }
      if (this.mode == "datetime") {
        return [yearColumn, monthColumn, dateColumn, hourColumn, minuteColumn];
      }
      if (this.mode == "time") {
        return [hourColumn, minuteColumn];
      }
    }
  },
  components: {
    Picker
  },
  methods: {
    //日期变更
    dateChange(column, item) {
      if (this.mode == "year") {
        this.updateYear(this.years[item.index]);
      } else if (this.mode == "month") {
        if (column == 0) {
          this.updateYear(this.years[item[column].index]);
        } else {
          this.updateMonth(this.months[item[column].index]);
        }
      } else if (this.mode == "date") {
        if (column == 0) {
          this.updateYear(this.years[item[column].index]);
        } else if (column == 1) {
          this.updateMonth(this.months[item[column].index]);
        } else {
          this.updateDay(this.days[item[column].index]);
        }
      } else if (this.mode == "time") {
        if (column == 0) {
          this.updateHour(this.hours[item[column].index]);
        } else {
          this.updateMinute(this.minutes[item[column].index]);
        }
      } else if (this.mode == "datetime") {
        if (column == 0) {
          this.updateYear(this.years[item[column].index]);
        } else if (column == 1) {
          this.updateMonth(this.months[item[column].index]);
        } else if (column == 2) {
          this.updateDay(this.days[item[column].index]);
        } else if (column == 3) {
          this.updateHour(this.hours[item[column].index]);
        } else {
          this.updateMinute(this.minutes[item[column].index]);
        }
      }
    },
    //点击确定
    doConfirm() {
      this.$emit("confirm", this.selectedDate);
    },
    //点击取消
    doCancel() {
      this.$emit("cancel", this.selectedDate);
    },
    //修改年
    updateYear(year) {
      this.selectedDate = dayjs(this.selectedDate).year(year).toDate();
    },
    //修改月
    updateMonth(month) {
      this.selectedDate = dayjs(this.selectedDate).month(month - 1).toDate();
    },
    //修改日
    updateDay(day) {
      this.selectedDate = dayjs(this.selectedDate).date(day).toDate();
    },
    //修改时
    updateHour(hour) {
      this.selectedDate = dayjs(this.selectedDate).hour(hour).toDate();
    },
    //修改分
    updateMinute(minute) {
      this.selectedDate = dayjs(this.selectedDate).minute(minute).toDate();
    },
    //获取dayjs比较维度单位
    getUnit() {
      if (this.mode == "year") {
        return "year";
      }
      if (this.mode == "month") {
        return "month";
      }
      if (this.mode == "date") {
        return "date";
      }
      if (this.mode == "time" || this.mode == "datetime") {
        return "minute";
      }
    }
  }
};
const _hoisted_1$D = { class: "mvi-date-picker" };
function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Picker = resolveComponent("Picker");
  return openBlock(), createElementBlock("div", _hoisted_1$D, [
    createVNode(_component_Picker, {
      options: $options.pickerOptions,
      "show-toolbar": $props.showToolbar,
      title: $props.title,
      "confirm-text": $props.confirmText,
      "cancel-text": $props.cancelText,
      loading: $props.loading,
      "visible-counts": $props.visibleCounts,
      "select-height": $props.selectHeight,
      onChange: $options.dateChange,
      onConfirm: $options.doConfirm,
      onCancel: $options.doCancel
    }, null, 8, ["options", "show-toolbar", "title", "confirm-text", "cancel-text", "loading", "visible-counts", "select-height", "onChange", "onConfirm", "onCancel"])
  ]);
}
const DatePicker = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$Q], ["__scopeId", "data-v-a1692616"]]);
DatePicker.install = (app) => {
  app.component(DatePicker.name, DatePicker);
};
const dateNativePicker_vue_vue_type_style_index_0_scoped_048efbc4_lang = "";
const _sfc_main$P = {
  name: "m-date-native-picker",
  emits: ["update:modelValue", "error", "change"],
  props: {
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
  },
  computed: {
    dateType() {
      if (this.type == "datetime") {
        return "datetime-local";
      } else {
        return this.type;
      }
    },
    defaultDate() {
      if (this.modelValue) {
        if (this.type == "date") {
          return dayjs(this.modelValue).format("YYYY-MM-DD");
        }
        if (this.type == "datetime") {
          return dayjs(this.modelValue).format("YYYY-MM-DD HH:mm");
        }
        if (this.type == "month") {
          return dayjs(this.modelValue).format("YYYY-MM");
        }
        if (this.type == "time") {
          return dayjs(this.modelValue).format("HH:mm");
        }
      }
      return "";
    }
  },
  data() {
    return {
      ios: obj.platform.os().ios,
      iPad: obj.platform.device().iPad
    };
  },
  methods: {
    //api：触发日期选择弹窗
    trigger() {
      if (this.ios) {
        this.$el.focus();
      } else {
        this.$el.click();
      }
    },
    //ios系统下选择日期（排除ipad）
    selectDateForIOS() {
      if (this.ios && !this.iPad) {
        this.selectDate();
      }
    },
    //安卓系统下选择日期（加上ipad）
    selectDateForAndroid() {
      if (!this.ios || this.iPad) {
        this.selectDate();
      }
    },
    //选择时间
    selectDate() {
      if (this.$el.value) {
        let val = this.type == "time" ? `${dayjs(this.modelValue).format("YYYY-MM-DD")} ${this.$el.value}` : this.$el.value;
        const date = dayjs(val);
        if (this.min && date.isBefore(dayjs(this.min))) {
          this.$emit("error", 0, "The date is less than min");
          return;
        }
        if (this.max && dayjs(this.max).isBefore(date)) {
          this.$emit("error", 1, "The date is greater than max");
          return;
        }
        this.$emit("update:modelValue", date.toDate());
        this.$emit("change", date.toDate());
      } else {
        this.$emit("update:modelValue", null);
        this.$emit("change", null);
      }
    }
  }
};
const _hoisted_1$C = ["type", "value"];
function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", {
    onBlur: _cache[0] || (_cache[0] = (...args) => $options.selectDateForIOS && $options.selectDateForIOS(...args)),
    onChange: _cache[1] || (_cache[1] = (...args) => $options.selectDateForAndroid && $options.selectDateForAndroid(...args)),
    class: "mvi-date-native-picker",
    type: $options.dateType,
    value: $options.defaultDate
  }, null, 40, _hoisted_1$C);
}
const DateNativePicker = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$P], ["__scopeId", "data-v-048efbc4"]]);
DateNativePicker.install = (app) => {
  app.component(DateNativePicker.name, DateNativePicker);
};
const input_vue_vue_type_style_index_0_scoped_0bbaa770_lang = "";
const _sfc_main$O = {
  name: "m-input",
  data() {
    return {
      //输入框或者文本域是否获取焦点
      focus: false
    };
  },
  emits: ["update:modelValue", "left-click", "right-click", "focus", "blur", "input", "clear", "keydown", "keyup"],
  props: {
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
  },
  computed: {
    inputClass() {
      let cls = ["mvi-input-container", this.size];
      if (this.border) {
        cls.push("border");
      }
      if (this.showWordLimit && this.maxlength > 0) {
        cls.push("words");
      }
      if (this.required) {
        cls.push("required");
      }
      return cls;
    },
    showClear() {
      if (this.disabled || this.readonly) {
        return false;
      }
      if (this.realValue && this.focus) {
        return true;
      }
      return false;
    },
    //图标转换
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj.common.isObject(param)) {
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
    //输入框的值
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
    },
    //输入框的type值
    cmpType() {
      if (this.type == "number") {
        return "text";
      }
      return this.type;
    },
    //文本域的rows
    rowsFilter() {
      let rows = this.rows;
      if (obj.common.isObject(this.autosize)) {
        if (obj.number.isNumber(this.autosize.minRows)) {
          if (this.rows < this.autosize.minRows) {
            rows = this.autosize.minRows;
          }
        }
        if (obj.number.isNumber(this.autosize.maxRows)) {
          if (this.rows > this.autosize.maxRows) {
            rows = this.autosize.maxRows;
          }
        }
      }
      return rows;
    },
    //label的样式
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
    //输入框样式
    inputStyle() {
      return {
        textAlign: this.align ? this.align : ""
      };
    },
    //显示左侧图标
    showLeft() {
      return this.$slots.left || this.parseIcon(this.left).type || this.parseIcon(this.left).url;
    },
    //显示右侧图标
    showRight() {
      return this.$slots.right || this.parseIcon(this.right).type || this.parseIcon(this.right).url;
    }
  },
  components: {
    Icon
  },
  mounted() {
    if (this.$refs.textarea) {
      this.setMaxMinHeight();
      if (this.autosize == true || obj.common.isObject(this.autosize)) {
        this.autosizeSet();
      }
    }
  },
  watch: {
    realValue() {
      if (this.$refs.textarea && (this.autosize == true || obj.common.isObject(this.autosize))) {
        this.autosizeSet();
      }
    },
    rows() {
      if (this.$refs.textarea) {
        this.setMaxMinHeight();
      }
    },
    autosize() {
      if (this.$refs.textarea) {
        this.setMaxMinHeight();
      }
    },
    showClear(newValue) {
      this.$nextTick(() => {
        if (this.$refs.textarea && (this.autosize == true || obj.common.isObject(this.autosize))) {
          this.autosizeSet();
        }
      });
    }
  },
  methods: {
    //高度自适应设置
    autosizeSet() {
      this.$refs.textarea.style.height = "auto";
      this.$refs.textarea.scrollTop = 0;
      this.$refs.textarea.style.height = obj.element.getScrollHeight(this.$refs.textarea) + "px";
    },
    //行数转为高度
    rows2Height(rows) {
      let lineHeight = Math.floor(parseFloat(obj.element.getCssStyle(this.$refs.textarea, "line-height")));
      return rows * lineHeight;
    },
    //设置最大高度和最小高度
    setMaxMinHeight() {
      if (obj.common.isObject(this.autosize)) {
        if (obj.number.isNumber(this.autosize.maxRows)) {
          let maxHeight = this.rows2Height(this.autosize.maxRows);
          this.$refs.textarea.style.maxHeight = maxHeight + "px";
        }
        if (obj.number.isNumber(this.autosize.minRows)) {
          let minHeight = this.rows2Height(this.autosize.minRows);
          this.$refs.textarea.style.minHeight = minHeight + "px";
        }
      } else {
        this.$refs.textarea.style.maxHeight = "";
        this.$refs.textarea.style.minHeight = "";
      }
    },
    //输入框键盘按下
    keydown(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("keydown", e, this.realValue);
    },
    //输入框键盘松开
    keyup(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("keyup", e, this.realValue);
    },
    //输入框获取焦点
    inputFocus() {
      if (this.disabled) {
        return;
      }
      this.focus = true;
      this.$emit("focus", this.realValue);
    },
    //输入框失去焦点
    inputBlur() {
      if (this.disabled) {
        return;
      }
      setTimeout(() => {
        this.focus = false;
        this.$emit("blur", this.realValue);
      }, 200);
    },
    //输入框监听
    input() {
      if (this.disabled) {
        return;
      }
      this.$emit("input", this.realValue);
    },
    //左侧图标点击
    leftClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("left-click", this.realValue);
    },
    //右侧图标点击
    rightClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("right-click", this.realValue);
    },
    //清除输入框
    doClear() {
      if (this.disabled) {
        return;
      }
      if (!this.clearable) {
        return;
      }
      setTimeout(() => {
        this.realValue = "";
        let el = this.$refs.input || this.$refs.textarea;
        el.focus();
        this.$emit("clear", this.realValue);
      }, 210);
    }
  }
};
const _hoisted_1$B = ["disabled", "data-type"];
const _hoisted_2$x = ["textContent"];
const _hoisted_3$q = ["placeholder", "maxlength", "disabled", "readonly", "autofocus", "rows", "name"];
const _hoisted_4$k = ["type", "inputmode", "placeholder", "maxlength", "disabled", "readonly", "autofocus", "name"];
const _hoisted_5$d = {
  key: 6,
  class: "mvi-input-words"
};
function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    disabled: $props.disabled || null,
    class: normalizeClass($options.inputClass),
    "data-type": $props.type
  }, [
    $options.showLeft ? (openBlock(), createElementBlock("div", {
      key: 0,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.leftClick && $options.leftClick(...args)),
      class: "mvi-input-left"
    }, [
      _ctx.$slots.left ? renderSlot(_ctx.$slots, "left", { key: 0 }, void 0, true) : (openBlock(), createBlock(_component_Icon, {
        key: 1,
        type: $options.parseIcon($props.left).type,
        url: $options.parseIcon($props.left).url,
        spin: $options.parseIcon($props.left).spin,
        size: $options.parseIcon($props.left).size,
        color: $options.parseIcon($props.left).color
      }, null, 8, ["type", "url", "spin", "size", "color"]))
    ])) : createCommentVNode("", true),
    $props.label ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: "mvi-input-label",
      style: normalizeStyle($options.labelStyle)
    }, [
      createElementVNode("span", {
        textContent: toDisplayString($props.label)
      }, null, 8, _hoisted_2$x)
    ], 4)) : createCommentVNode("", true),
    $props.type == "textarea" ? withDirectives((openBlock(), createElementBlock("textarea", {
      key: 2,
      placeholder: $props.placeholder,
      maxlength: $props.maxlength,
      disabled: $props.disabled,
      readonly: $props.readonly,
      autofocus: $props.autofocus,
      class: "mvi-textarea",
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $options.realValue = $event),
      onInput: _cache[2] || (_cache[2] = (...args) => $options.input && $options.input(...args)),
      ref: "textarea",
      rows: $options.rowsFilter,
      name: $props.name,
      style: normalizeStyle($options.inputStyle),
      onFocus: _cache[3] || (_cache[3] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
      onBlur: _cache[4] || (_cache[4] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
      autocomplete: "off",
      onKeydown: _cache[5] || (_cache[5] = (...args) => $options.keydown && $options.keydown(...args)),
      onKeyup: _cache[6] || (_cache[6] = (...args) => $options.keyup && $options.keyup(...args))
    }, null, 44, _hoisted_3$q)), [
      [vModelText, $options.realValue]
    ]) : withDirectives((openBlock(), createElementBlock("input", {
      key: 3,
      type: $options.cmpType,
      inputmode: $props.inputMode,
      placeholder: $props.placeholder,
      maxlength: $props.maxlength,
      disabled: $props.disabled,
      readonly: $props.readonly,
      autofocus: $props.autofocus,
      class: "mvi-input",
      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $options.realValue = $event),
      onInput: _cache[8] || (_cache[8] = (...args) => $options.input && $options.input(...args)),
      ref: "input",
      name: $props.name,
      style: normalizeStyle($options.inputStyle),
      onFocus: _cache[9] || (_cache[9] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
      onBlur: _cache[10] || (_cache[10] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
      autocomplete: "off",
      onKeydown: _cache[11] || (_cache[11] = (...args) => $options.keydown && $options.keydown(...args)),
      onKeyup: _cache[12] || (_cache[12] = (...args) => $options.keyup && $options.keyup(...args))
    }, null, 44, _hoisted_4$k)), [
      [vModelDynamic, $options.realValue]
    ]),
    $props.clearable ? withDirectives((openBlock(), createElementBlock("div", {
      key: 4,
      onClick: _cache[13] || (_cache[13] = (...args) => $options.doClear && $options.doClear(...args)),
      class: "mvi-input-clear"
    }, [
      createVNode(_component_Icon, { type: "times-o" })
    ], 512)), [
      [vShow, $options.showClear]
    ]) : createCommentVNode("", true),
    $options.showRight ? (openBlock(), createElementBlock("div", {
      key: 5,
      onClick: _cache[14] || (_cache[14] = (...args) => $options.rightClick && $options.rightClick(...args)),
      class: "mvi-input-right"
    }, [
      _ctx.$slots.right ? renderSlot(_ctx.$slots, "right", { key: 0 }, void 0, true) : (openBlock(), createBlock(_component_Icon, {
        key: 1,
        type: $options.parseIcon($props.right).type,
        url: $options.parseIcon($props.right).url,
        spin: $options.parseIcon($props.right).spin,
        size: $options.parseIcon($props.right).size,
        color: $options.parseIcon($props.right).color
      }, null, 8, ["type", "url", "spin", "size", "color"]))
    ])) : createCommentVNode("", true),
    $props.showWordLimit && $props.maxlength > 0 ? (openBlock(), createElementBlock("div", _hoisted_5$d, toDisplayString($options.realValue.length) + "/" + toDisplayString($props.maxlength), 1)) : createCommentVNode("", true)
  ], 10, _hoisted_1$B);
}
const Input = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$O], ["__scopeId", "data-v-0bbaa770"]]);
Input.install = (app) => {
  app.component(Input.name, Input);
};
const modal_vue_vue_type_style_index_0_scoped_d29bc77e_lang = "";
const _sfc_main$N = {
  name: "m-modal",
  data() {
    return {
      //模态框是否显示
      modalShow: false,
      //模态框是否渲染
      firstShow: false
    };
  },
  emits: ["update:modelValue", "show", "showing", "shown", "hide", "hidding", "hidden"],
  inheritAttrs: false,
  props: {
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
  },
  computed: {
    $$el() {
      return this.$refs.overlay.$$el;
    },
    show: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    },
    wrapperStyle() {
      let style = {};
      if (this.radius) {
        style.borderRadius = this.radius;
      }
      style.transition = "all " + this.timeout + "ms";
      return style;
    },
    headerStyle() {
      let style = {};
      if (this.$slots.default || this.content) {
        style.paddingBottom = "0";
      }
      return style;
    }
  },
  components: {
    Icon,
    Overlay
  },
  watch: {
    fullScreen() {
      this.modalSize();
    }
  },
  methods: {
    //模态框宽高设置
    modalSize() {
      if (this.fullScreen) {
        this.$refs.modal.style.width = this.$$el.offsetParent.offsetWidth + "px";
        this.$refs.wrapper.style.height = this.$$el.offsetParent.offsetHeight + "px";
        this.$refs.wrapper.style.maxHeight = "";
      } else {
        if (this.width) {
          this.$refs.modal.style.width = this.width;
        } else {
          this.$refs.modal.style.width = "";
        }
        this.$refs.wrapper.style.maxHeight = this.$$el.offsetParent.offsetHeight * 0.96 + "px";
        this.$refs.wrapper.style.height = "";
      }
    },
    //遮罩层显示前
    overlayShow() {
      if (!this.firstShow) {
        this.firstShow = true;
      }
      this.modalShow = true;
    },
    //遮罩层隐藏之前
    overlayHide() {
      this.modalShow = false;
    },
    //弹出层显示前
    beforeEnter(el) {
      if (obj.data.get(el, "mvi-modal-beforeEnter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-modal-beforeEnter-trigger", true);
      this.$emit("show", el);
      if (typeof this.modalComponentWatch == "function") {
        this.modalComponentWatch.apply(this, ["show", el]);
      }
    },
    //弹出层显示时
    enter(el) {
      if (obj.data.get(el, "mvi-modal-enter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-modal-enter-trigger", true);
      this.modalSize();
      this.$emit("showing", el);
      if (typeof this.modalComponentWatch == "function") {
        this.modalComponentWatch.apply(this, ["showing", el]);
      }
    },
    //弹出层显示后
    afterEnter(el) {
      this.$emit("shown", el);
      if (typeof this.modalComponentWatch == "function") {
        this.modalComponentWatch.apply(this, ["shown", el]);
      }
    },
    //弹出层隐藏前
    beforeLeave(el) {
      obj.data.remove(el, "mvi-modal-beforeEnter-trigger");
      obj.data.remove(el, "mvi-modal-enter-trigger");
      this.$emit("hide", el);
      if (typeof this.modalComponentWatch == "function") {
        this.modalComponentWatch.apply(this, ["hide", el]);
      }
    },
    //弹出层隐藏时
    leave(el) {
      this.$emit("hidding", el);
      if (typeof this.modalComponentWatch == "function") {
        this.modalComponentWatch.apply(this, ["hidding", el]);
      }
    },
    //弹出层隐藏后
    afterLeave(el) {
      this.$emit("hidden", el);
      if (typeof this.modalComponentWatch == "function") {
        this.modalComponentWatch.apply(this, ["hidden", el]);
      }
    }
  }
};
const _hoisted_1$A = ["innerHTML"];
const _hoisted_2$w = {
  key: 2,
  ref: "content",
  class: "mvi-modal-content"
};
const _hoisted_3$p = ["innerHTML"];
const _hoisted_4$j = ["textContent"];
function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Overlay = resolveComponent("Overlay");
  return openBlock(), createBlock(_component_Overlay, {
    ref: "overlay",
    modelValue: $options.show,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $options.show = $event),
    onShow: $options.overlayShow,
    onHide: $options.overlayHide,
    "use-padding": $props.usePadding,
    "z-index": $props.zIndex,
    closable: $props.closable,
    color: $props.overlayColor,
    timeout: $props.timeout,
    "mount-el": $props.mountEl
  }, {
    default: withCtx(() => [
      createElementVNode("div", {
        ref: "modal",
        class: "mvi-modal",
        style: normalizeStyle({ zIndex: $props.zIndex + 10 })
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
              $props.showTimes ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "mvi-modal-times",
                onClick: _cache[0] || (_cache[0] = ($event) => $options.show = false)
              }, [
                createVNode(_component_Icon, { type: "times" })
              ])) : createCommentVNode("", true),
              _ctx.$slots.title || $props.title ? (openBlock(), createElementBlock("div", {
                key: 1,
                ref: "header",
                class: normalizeClass(["mvi-modal-title", $props.ellipsis ? "ellipsis" : "", $props.center ? "center" : ""]),
                style: normalizeStyle($options.headerStyle)
              }, [
                _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }, void 0, true) : $props.title ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  innerHTML: $props.title
                }, null, 8, _hoisted_1$A)) : createCommentVNode("", true)
              ], 6)) : createCommentVNode("", true),
              _ctx.$slots.default || $props.content ? (openBlock(), createElementBlock("div", _hoisted_2$w, [
                _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : $props.content ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  innerHTML: $props.content
                }, null, 8, _hoisted_3$p)) : createCommentVNode("", true)
              ], 512)) : createCommentVNode("", true),
              _ctx.$slots.footer || $props.footer ? (openBlock(), createElementBlock("div", {
                key: 3,
                ref: "footer",
                class: "mvi-modal-footer",
                style: normalizeStyle({ padding: $props.__ignorePadding ? 0 : "" })
              }, [
                _ctx.$slots.footer ? renderSlot(_ctx.$slots, "footer", { key: 0 }, void 0, true) : $props.footer ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  textContent: toDisplayString($props.footer)
                }, null, 8, _hoisted_4$j)) : createCommentVNode("", true)
              ], 4)) : createCommentVNode("", true)
            ], 16)), [
              [vShow, $data.modalShow]
            ]) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
      ], 4)
    ]),
    _: 3
  }, 8, ["modelValue", "onShow", "onHide", "use-padding", "z-index", "closable", "color", "timeout", "mount-el"]);
}
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$N], ["__scopeId", "data-v-d29bc77e"]]);
Modal.install = (app) => {
  app.component(Modal.name, Modal);
};
const dialog_vue_vue_type_style_index_0_scoped_c8822b31_lang = "";
const _sfc_main$M = {
  name: "m-dialog",
  data() {
    return {
      //点击的是否是确定按钮
      ok: false,
      //对话框是否打开，默认为true，即挂载就显示
      show: true,
      //输入框是否已经获得了焦点
      focus: false,
      //输入框的值
      value: ""
    };
  },
  props: {
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
  },
  computed: {
    $$el() {
      return this.$refs.modal.$$el;
    },
    //显示的标题
    cmpTitle() {
      if (typeof this.title == "string") {
        return this.title;
      }
      return "提示";
    },
    //显示的信息
    cmpMessage() {
      if (typeof this.message == "string") {
        return this.message;
      }
      if (obj.common.isObject(this.message)) {
        return JSON.stringify(this.message);
      }
      return String(this.message);
    },
    //按钮文本
    cmpBtnText() {
      let bt = null;
      if (this.type == "alert") {
        if (typeof this.btnText == "string") {
          bt = this.btnText;
        } else {
          bt = "确定";
        }
      } else {
        bt = [];
        if (this.btnText instanceof Array) {
          if (typeof this.btnText[0] == "string") {
            bt[0] = this.btnText[0];
          } else {
            bt[0] = "确定";
          }
          if (typeof this.btnText[1] == "string") {
            bt[1] = this.btnText[1];
          } else {
            bt[1] = "取消";
          }
        } else {
          bt = ["确定", "取消"];
        }
      }
      return bt;
    },
    //按钮文本颜色
    cmpBtnColor() {
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
    //宽度
    cmpWidth() {
      if (typeof this.width == "string" && this.width) {
        return this.width;
      }
      return "5.6rem";
    },
    //输入框配置
    cmpInput() {
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
      if (obj.common.isObject(this.input)) {
        if (typeof this.input.placeholder == "string") {
          input.placeholder = this.input.placeholder;
        }
        if (typeof this.input.type == "string" && this.input.type) {
          input.type = this.input.type;
        }
        if (typeof this.input.autofocus == "boolean") {
          input.autofocus = this.input.autofocus;
        }
        if (obj.number.isNumber(this.input.maxlength)) {
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
        if (typeof this.input.value == "string" || obj.number.isNumber(this.input.value)) {
          input.value = this.input.value.toString();
        }
      }
      return input;
    },
    //层级
    cmpZIndex() {
      if (obj.number.isNumber(this.zIndex)) {
        return this.zIndex;
      }
      return 1e3;
    },
    //是否考虑滚动条影响
    cmpUsePadding() {
      if (typeof this.usePadding == "boolean") {
        return this.usePadding;
      }
      return false;
    },
    //动画效果
    cmpAnimation() {
      if (typeof this.animation == "string" && this.animation) {
        return this.animation;
      }
      return "narrow";
    },
    //圆角
    cmpRadius() {
      if (typeof this.radius == "string" && this.radius) {
        return this.radius;
      }
      return "0.2rem";
    },
    //遮罩层颜色
    cmpOverlayColor() {
      if (typeof this.overlayColor == "string" && this.overlayColor) {
        return this.overlayColor;
      }
      if (this.cmpIos) {
        return "rgba(0,10,20,.3)";
      }
      return null;
    },
    //是否ios样式
    cmpIos() {
      if (typeof this.ios == "boolean") {
        return this.ios;
      }
      return false;
    },
    //挂载元素
    cmpMountEl() {
      if (typeof this.mountEl == "string" && this.mountEl) {
        return this.mountEl;
      }
      return "body";
    },
    //点击背景是否可关闭
    cmpClosable() {
      if (typeof this.closable == "boolean") {
        return this.closable;
      } else {
        return false;
      }
    },
    //动画时长
    cmpTimeout() {
      if (obj.number.isNumber(this.timeout)) {
        return this.timeout;
      }
      return 200;
    },
    //内容是否显示
    contentShow() {
      if (this.type == "alert" || this.type == "confirm") {
        if (this.cmpMessage && !this.cmpIos) {
          return true;
        }
        return false;
      }
      return true;
    },
    //是否显示输入框内的清除框
    showClear() {
      return this.focus && this.value;
    },
    //输入框class
    inputClass() {
      let cls = [];
      if (this.showClear && this.cmpInput.clearable) {
        cls.push("mvi-dialog-input-padding");
      }
      return cls;
    },
    //输入模式
    inputMode() {
      let mode = false;
      if ([false, "none", "text", "decimal", "numeric", "tel", "search", "email", "url"].includes(this.cmpInput.mode)) {
        mode = this.cmpInput.mode;
      }
      return mode;
    },
    //输入框样式
    inputStyle() {
      let style = {};
      if (["left", "right", "center"].includes(this.cmpInput.align)) {
        style.textAlign = this.cmpInput.align;
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
    obj.event.on(this.$$el, "click.dialog", this.overlayClick);
  },
  methods: {
    //点击遮罩层关闭
    overlayClick(event2) {
      if (!this.cmpClosable) {
        return;
      }
      if (event2.target != event2.currentTarget) {
        return;
      }
      this.show = false;
      this.ok = false;
    },
    //设置输入框默认值
    setDefaultValue() {
      let value = this.cmpInput.value;
      if (this.cmpInput.type == "number") {
        value = value.replace(/\D/g, "");
      }
      if (this.cmpInput.maxlength > 0 && value.length > this.cmpInput.maxlength) {
        value = value.substring(0, this.cmpInput.maxlength);
      }
      this.value = value;
    },
    //获取焦点
    inputFocus() {
      this.focus = true;
    },
    //失去焦点
    inputBlur() {
      setTimeout(() => {
        this.focus = false;
      }, 200);
    },
    //输入监听
    inputFun() {
      let value = this.value;
      if (this.cmpInput.type == "number") {
        value = value.replace(/\D/g, "");
      }
      if (this.cmpInput.maxlength > 0 && value.length > this.cmpInput.maxlength) {
        value = value.substr(0, this.cmpInput.maxlength);
      }
      this.value = value;
    },
    //清除输入框的值
    doClear() {
      if (!this.cmpInput.clearable) {
        return;
      }
      setTimeout(() => {
        this.value = "";
        this.$refs.input.focus();
      }, 210);
    },
    //确定
    okFun() {
      this.show = false;
      this.ok = true;
    },
    //取消
    cancelFun() {
      this.show = false;
      this.ok = false;
    },
    //模态框隐藏前
    modalHide(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["hide", this.type, el]);
      }
    },
    //模态框隐藏时
    modalHidding(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["hidding", this.type, el]);
      }
    },
    //模态框隐藏后
    modalHidden(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["hidden", this.type, el]);
      }
      if (this.type == "alert") {
        this.__remove();
      } else if (this.type == "confirm") {
        this.__remove(this.ok);
      } else if (this.type == "prompt") {
        this.__remove(this.ok, this.value);
      }
    },
    //模态框显示前
    modalShow(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["show", this.type, el]);
      }
    },
    //模态框显示时
    modalShowing(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["showing", this.type, el]);
      }
    },
    //模态框显示后
    modalShown(el) {
      if (this.type == "prompt" && this.cmpInput.autofocus && this.$refs.input) {
        this.$refs.input.focus();
      }
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["shown", this.type, el]);
      }
    }
  }
};
const _hoisted_1$z = ["innerHTML"];
const _hoisted_2$v = ["innerHTML"];
const _hoisted_3$o = ["innerHTML"];
const _hoisted_4$i = ["type", "placeholder", "maxlength", "inputmode"];
const _hoisted_5$c = { class: "mvi-dialog-footer" };
const _hoisted_6$9 = ["textContent"];
const _hoisted_7$9 = ["textContent"];
function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Modal = resolveComponent("Modal");
  return openBlock(), createBlock(_component_Modal, {
    ref: "modal",
    modelValue: $data.show,
    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.show = $event),
    onHide: $options.modalHide,
    onHidding: $options.modalHidding,
    onHidden: $options.modalHidden,
    width: $options.cmpWidth,
    "z-index": $options.cmpZIndex,
    radius: $options.cmpRadius,
    "use-padding": $options.cmpUsePadding,
    animation: $options.cmpAnimation,
    onShow: $options.modalShow,
    onShowing: $options.modalShowing,
    onShown: $options.modalShown,
    timeout: $options.cmpTimeout,
    "overlay-color": $options.cmpOverlayColor,
    "mount-el": $options.cmpMountEl,
    __ignorePadding: ""
  }, createSlots({
    footer: withCtx(() => [
      createElementVNode("div", _hoisted_5$c, [
        $props.type != "alert" ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "mvi-dialog-cancel",
          textContent: toDisplayString($options.cmpBtnText[1]),
          onClick: _cache[4] || (_cache[4] = (...args) => $options.cancelFun && $options.cancelFun(...args)),
          style: normalizeStyle({ color: $options.cmpBtnColor[1] || "" })
        }, null, 12, _hoisted_6$9)) : createCommentVNode("", true),
        createElementVNode("div", {
          class: "mvi-dialog-ok",
          textContent: toDisplayString($props.type == "alert" ? $options.cmpBtnText : $options.cmpBtnText[0]),
          onClick: _cache[5] || (_cache[5] = (...args) => $options.okFun && $options.okFun(...args)),
          style: normalizeStyle({ color: $props.type == "alert" ? $options.cmpBtnColor || "" : $options.cmpBtnColor[0] || "" })
        }, null, 12, _hoisted_7$9)
      ])
    ]),
    _: 2
  }, [
    $options.cmpTitle || $options.cmpIos && $options.cmpMessage ? {
      name: "title",
      fn: withCtx(() => [
        $options.cmpTitle ? (openBlock(), createElementBlock("div", {
          key: 0,
          innerHTML: $options.cmpTitle,
          class: "mvi-dialog-title"
        }, null, 8, _hoisted_1$z)) : createCommentVNode("", true),
        $options.cmpMessage && $options.cmpIos ? (openBlock(), createElementBlock("div", {
          key: 1,
          innerHTML: $options.cmpMessage,
          class: "mvi-dialog-ios-content"
        }, null, 8, _hoisted_2$v)) : createCommentVNode("", true)
      ]),
      key: "0"
    } : void 0,
    $options.contentShow ? {
      name: "default",
      fn: withCtx(() => [
        !$options.cmpIos && $options.cmpMessage ? (openBlock(), createElementBlock("div", {
          key: 0,
          innerHTML: $options.cmpMessage,
          class: "mvi-dialog-content"
        }, null, 8, _hoisted_3$o)) : createCommentVNode("", true),
        $props.type == "prompt" ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["mvi-dialog-input", !$options.cmpIos && $options.cmpMessage ? "mvi-dialog-input-mt" : ""])
        }, [
          withDirectives(createElementVNode("input", {
            ref: "input",
            type: $options.cmpInput.type == "number" ? "text" : $options.cmpInput.type,
            placeholder: $options.cmpInput.placeholder,
            maxlength: $options.cmpInput.maxlength,
            class: normalizeClass($options.inputClass),
            style: normalizeStyle($options.inputStyle),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.value = $event),
            onInput: _cache[1] || (_cache[1] = (...args) => $options.inputFun && $options.inputFun(...args)),
            onFocus: _cache[2] || (_cache[2] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
            onBlur: _cache[3] || (_cache[3] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
            inputmode: $options.inputMode
          }, null, 46, _hoisted_4$i), [
            [
              vModelDynamic,
              $data.value,
              void 0,
              { trim: true }
            ]
          ]),
          $options.cmpInput.clearable ? withDirectives((openBlock(), createBlock(_component_Icon, {
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
const dialogComponent = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$M], ["__scopeId", "data-v-c8822b31"]]);
const dialogPc_vue_vue_type_style_index_0_scoped_3724e287_lang = "";
const _sfc_main$L = {
  name: "m-dialog-pc",
  data() {
    return {
      //点击的是否是确定按钮
      ok: false,
      //对话框是否打开，默认为true，即挂载就显示
      show: true,
      //输入框是否已经获得了焦点
      focus: false,
      //输入框的值
      value: ""
    };
  },
  props: {
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
  },
  computed: {
    $$el() {
      return this.$refs.modal.$$el;
    },
    //是否显示关闭图标
    cmpShowTimes() {
      if (typeof this.showTimes == "boolean") {
        return this.showTimes;
      }
      return true;
    },
    //标题
    cmpTitle() {
      if (typeof this.title == "string") {
        return this.title;
      }
      return "提示";
    },
    //信息内容
    cmpMessage() {
      if (typeof this.message == "string") {
        return this.message;
      }
      if (obj.common.isObject(this.message)) {
        return JSON.stringify(this.message);
      }
      return String(this.message);
    },
    //按钮配置
    cmpBtns() {
      let btns = {
        ok: {
          type: "primary",
          color: null,
          subColor: null,
          plain: false,
          text: "确定",
          size: "medium",
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
          color: null,
          subColor: null,
          plain: false,
          text: "取消",
          size: "medium",
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
      if (obj.common.isObject(this.btns)) {
        if (obj.common.isObject(this.btns.ok)) {
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
          if (typeof this.btns.ok.round == "boolean") {
            btns.ok.round = this.btns.ok.round;
          }
          if (typeof this.btns.ok.square == "boolean") {
            btns.ok.square = this.btns.ok.square;
          }
          if (typeof this.btns.ok.disabled == "boolean") {
            btns.ok.disabled = this.btns.ok.disabled;
          }
          if (typeof this.btns.ok.loading == "boolean") {
            btns.ok.loading = this.btns.ok.loading;
          }
          if (typeof this.btns.ok.loadText == "string") {
            btns.ok.loadText = this.btns.ok.loadText;
          }
          if (typeof this.btns.ok.loadIcon == "string" || obj.common.isObject(this.btns.ok.loadIcon)) {
            btns.ok.loadIcon = this.btns.ok.loadIcon;
          }
        }
        if (obj.common.isObject(this.btns.cancel)) {
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
          if (typeof this.btns.cancel.round == "boolean") {
            btns.cancel.round = this.btns.cancel.round;
          }
          if (typeof this.btns.cancel.square == "boolean") {
            btns.cancel.square = this.btns.cancel.square;
          }
          if (typeof this.btns.cancel.disabled == "boolean") {
            btns.cancel.disabled = this.btns.cancel.disabled;
          }
          if (typeof this.btns.cancel.loading == "boolean") {
            btns.cancel.loading = this.btns.cancel.loading;
          }
          if (typeof this.btns.cancel.loadText == "string") {
            btns.cancel.loadText = this.btns.cancel.loadText;
          }
          if (typeof this.btns.cancel.loadIcon == "string" || obj.common.isObject(this.btns.cancel.loadIcon)) {
            btns.cancel.loadIcon = this.btns.cancel.loadIcon;
          }
        }
      }
      return btns;
    },
    //宽度
    cmpWidth() {
      if (typeof this.width == "string" && this.width) {
        return this.width;
      }
      return "7.2rem";
    },
    //输入框配置
    cmpInput() {
      let input = {
        placeholder: "",
        type: "text",
        autofocus: true,
        maxlength: -1,
        clearable: false,
        align: "left",
        value: ""
      };
      if (obj.common.isObject(this.input)) {
        if (typeof this.input.placeholder == "string") {
          input.placeholder = this.input.placeholder;
        }
        if (typeof this.input.type == "string" && this.input.type) {
          input.type = this.input.type;
        }
        if (typeof this.input.autofocus == "boolean") {
          input.autofocus = this.input.autofocus;
        }
        if (obj.number.isNumber(this.input.maxlength)) {
          input.maxlength = this.input.maxlength;
        }
        if (typeof this.input.clearable == "boolean") {
          input.clearable = this.input.clearable;
        }
        if (typeof this.input.align == "string") {
          input.align = this.input.align;
        }
        if (typeof this.input.value == "string" || obj.number.isNumber(this.input.value)) {
          input.value = this.input.value.toString();
        }
      }
      return input;
    },
    //层级
    cmpZIndex() {
      if (obj.number.isNumber(this.zIndex)) {
        return this.zIndex;
      }
      return 1e3;
    },
    //是否考虑滚动条影响
    cmpUsePadding() {
      if (typeof this.usePadding == "boolean") {
        return this.usePadding;
      }
      return false;
    },
    //动画
    cmpAnimation() {
      if (typeof this.animation == "string" && this.animation) {
        return this.animation;
      }
      return "translate-top";
    },
    //圆角
    cmpRadius() {
      if (typeof this.radius == "string" && this.radius) {
        return this.radius;
      }
      return "0.12rem";
    },
    //遮罩层颜色
    cmpOverlayColor() {
      if (typeof this.overlayColor == "string" && this.overlayColor) {
        return this.overlayColor;
      }
      return null;
    },
    //点击背景是否可关闭
    cmpClosable() {
      if (typeof this.closable == "boolean") {
        return this.closable;
      }
      return false;
    },
    //内容是否居中
    cmpCenter() {
      if (typeof this.center == "boolean") {
        return this.center;
      }
      return false;
    },
    //挂载元素
    cmpMountEl() {
      if (typeof this.mountEl == "string" && this.mountEl) {
        return this.mountEl;
      }
      return "body";
    },
    //动画时长
    cmpTimeout() {
      if (obj.number.isNumber(this.timeout)) {
        return this.timeout;
      }
      return 200;
    },
    //信息内容是否显示
    contentShow() {
      if (this.type == "Alert" || this.type == "Confirm") {
        if (this.cmpMessage) {
          return true;
        }
        return false;
      }
      return true;
    },
    //显示清除图标
    showClear() {
      return this.focus && this.value;
    },
    //输入框class
    inputClass() {
      let cls = [];
      if (this.showClear && this.cmpInput.clearable) {
        cls.push("mvi-dialog-input-padding");
      }
      return cls;
    },
    //输入框样式
    inputStyle() {
      let style = {};
      if (["left", "right", "center"].includes(this.cmpInput.align)) {
        style.textAlign = this.cmpInput.align;
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
    obj.event.on(this.$$el, "click.dialog", this.overlayClick);
  },
  methods: {
    //点击遮罩层关闭
    overlayClick(event2) {
      if (!this.cmpClosable) {
        return;
      }
      if (event2.target != event2.currentTarget) {
        return;
      }
      this.show = false;
      this.ok = false;
    },
    //设置输入框默认值
    setDefaultValue() {
      let value = this.cmpInput.value;
      if (this.cmpInput.type == "number") {
        value = value.replace(/\D/g, "");
      }
      if (this.cmpInput.maxlength > 0 && value.length > this.cmpInput.maxlength) {
        value = value.substring(0, this.cmpInput.maxlength);
      }
      this.value = value;
    },
    //获取焦点
    inputFocus() {
      this.focus = true;
    },
    //失去焦点
    inputBlur() {
      setTimeout(() => {
        this.focus = false;
      }, 200);
    },
    //输入监听
    inputFun() {
      let value = this.value;
      if (this.cmpInput.type == "number") {
        value = value.replace(/\D/g, "");
      }
      if (this.cmpInput.maxlength > 0 && value.length > this.cmpInput.maxlength) {
        value = value.substring(0, this.cmpInput.maxlength);
      }
      this.value = value;
    },
    //清除输入框的值
    doClear() {
      if (!this.cmpInput.clearable) {
        return;
      }
      setTimeout(() => {
        this.value = "";
        this.$refs.input.focus();
      }, 210);
    },
    //确定
    okFun() {
      this.show = false;
      this.ok = true;
    },
    //取消
    cancelFun() {
      this.show = false;
      this.ok = false;
    },
    //模态框隐藏前
    modalHide(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["hide", this.type, el]);
      }
    },
    //模态框隐藏时
    modalHidding(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["hidding", this.type, el]);
      }
    },
    //模态框隐藏后
    modalHidden(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["hidden", this.type, el]);
      }
      if (this.type == "Alert") {
        this.__remove();
      } else if (this.type == "Confirm") {
        this.__remove(this.ok);
      } else if (this.type == "Prompt") {
        this.__remove(this.ok, this.value);
      }
    },
    //模态框显示前
    modalShow(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["show", this.type, el]);
      }
    },
    //模态框显示时
    modalShowing(el) {
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["showing", this.type, el]);
      }
    },
    //模态框显示后
    modalShown(el) {
      if (this.type == "Prompt" && this.cmpInput.autofocus && this.$refs.input) {
        this.$refs.input.focus();
      }
      if (typeof this.dialogComponentWatch == "function") {
        this.dialogComponentWatch.apply(this, ["shown", this.type, el]);
      }
    }
  }
};
const _hoisted_1$y = ["innerHTML"];
const _hoisted_2$u = ["innerHTML"];
const _hoisted_3$n = {
  key: 1,
  class: "mvi-dialog-input"
};
const _hoisted_4$h = ["type", "placeholder", "maxlength"];
function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Button = resolveComponent("Button");
  const _component_Modal = resolveComponent("Modal");
  return openBlock(), createBlock(_component_Modal, {
    ref: "modal",
    modelValue: $data.show,
    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.show = $event),
    "show-times": $options.cmpShowTimes,
    onHide: $options.modalHide,
    onHidding: $options.modalHidding,
    onHidden: $options.modalHidden,
    width: $options.cmpWidth,
    "z-index": $options.cmpZIndex,
    radius: $options.cmpRadius,
    "use-padding": $options.cmpUsePadding,
    animation: $options.cmpAnimation,
    onShow: $options.modalShow,
    onShowing: $options.modalShowing,
    onShown: $options.modalShown,
    timeout: $options.cmpTimeout,
    "overlay-color": $options.cmpOverlayColor,
    "mount-el": $options.cmpMountEl,
    center: $options.cmpCenter
  }, createSlots({ _: 2 }, [
    $options.cmpTitle ? {
      name: "title",
      fn: withCtx(() => [
        createElementVNode("div", {
          innerHTML: $options.cmpTitle,
          class: "mvi-dialog-title"
        }, null, 8, _hoisted_1$y)
      ]),
      key: "0"
    } : void 0,
    $options.contentShow ? {
      name: "default",
      fn: withCtx(() => [
        $options.cmpMessage ? (openBlock(), createElementBlock("div", {
          key: 0,
          innerHTML: $options.cmpMessage,
          class: normalizeClass(["mvi-dialog-content", $props.center ? "center" : ""])
        }, null, 10, _hoisted_2$u)) : createCommentVNode("", true),
        $props.type == "Prompt" ? (openBlock(), createElementBlock("div", _hoisted_3$n, [
          withDirectives(createElementVNode("input", {
            ref: "input",
            type: $options.cmpInput.type == "number" ? "text" : $options.cmpInput.type,
            placeholder: $options.cmpInput.placeholder,
            maxlength: $options.cmpInput.maxlength,
            class: normalizeClass($options.inputClass),
            style: normalizeStyle($options.inputStyle),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.value = $event),
            onInput: _cache[1] || (_cache[1] = (...args) => $options.inputFun && $options.inputFun(...args)),
            onFocus: _cache[2] || (_cache[2] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
            onBlur: _cache[3] || (_cache[3] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
            onKeyup: _cache[4] || (_cache[4] = withKeys((...args) => $options.okFun && $options.okFun(...args), ["enter"]))
          }, null, 46, _hoisted_4$h), [
            [
              vModelDynamic,
              $data.value,
              void 0,
              { trim: true }
            ]
          ]),
          $options.cmpInput.clearable ? withDirectives((openBlock(), createBlock(_component_Icon, {
            key: 0,
            ref: "icon",
            type: "times-o",
            class: "mvi-dialog-times",
            onClick: $options.doClear
          }, null, 8, ["onClick"])), [
            [vShow, $options.showClear]
          ]) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createElementVNode("div", {
          class: normalizeClass(["mvi-dialog-footer", $props.center ? "center" : ""])
        }, [
          $props.type != "Alert" ? (openBlock(), createBlock(_component_Button, {
            key: 0,
            type: $options.cmpBtns.cancel.type,
            color: $options.cmpBtns.cancel.color,
            "sub-color": $options.cmpBtns.cancel.subColor,
            plain: $options.cmpBtns.cancel.plain,
            class: "mvi-dialog-cancel",
            onClick: $options.cancelFun,
            size: $options.cmpBtns.cancel.size,
            round: $options.cmpBtns.cancel.round,
            square: $options.cmpBtns.cancel.square,
            loading: $options.cmpBtns.cancel.loading,
            "load-text": $options.cmpBtns.cancel.loadText,
            "load-icon": $options.cmpBtns.cancel.loadIcon,
            disabled: $options.cmpBtns.cancel.disabled
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($options.cmpBtns.cancel.text), 1)
            ]),
            _: 1
          }, 8, ["type", "color", "sub-color", "plain", "onClick", "size", "round", "square", "loading", "load-text", "load-icon", "disabled"])) : createCommentVNode("", true),
          createVNode(_component_Button, {
            type: $options.cmpBtns.ok.type,
            color: $options.cmpBtns.ok.color,
            "sub-color": $options.cmpBtns.ok.subColor,
            plain: $options.cmpBtns.ok.plain,
            onClick: $options.okFun,
            size: $options.cmpBtns.ok.size,
            round: $options.cmpBtns.ok.round,
            square: $options.cmpBtns.ok.square,
            loading: $options.cmpBtns.ok.loading,
            "load-text": $options.cmpBtns.ok.loadText,
            "load-icon": $options.cmpBtns.ok.loadIcon,
            disabled: $options.cmpBtns.ok.disabled
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($options.cmpBtns.ok.text), 1)
            ]),
            _: 1
          }, 8, ["type", "color", "sub-color", "plain", "onClick", "size", "round", "square", "loading", "load-text", "load-icon", "disabled"])
        ], 2)
      ]),
      key: "1"
    } : void 0
  ]), 1032, ["modelValue", "show-times", "onHide", "onHidding", "onHidden", "width", "z-index", "radius", "use-padding", "animation", "onShow", "onShowing", "onShown", "timeout", "overlay-color", "mount-el", "center"]);
}
const dialogPcComponent = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$L], ["__scopeId", "data-v-3724e287"]]);
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
      if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch;
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
      if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch;
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
      if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch;
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
      if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch;
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
      if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch;
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
      if (this && this.config && this.config.globalProperties && typeof this.config.globalProperties.dialogComponentWatch == "function") {
        instance.config.globalProperties.dialogComponentWatch = this.config.globalProperties.dialogComponentWatch;
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
const toast_vue_vue_type_style_index_0_scoped_ff635be3_lang = "";
const _sfc_main$K = {
  name: "m-toast",
  data() {
    return {
      show: true,
      timer: null
    };
  },
  inheritAttrs: false,
  props: {
    //弹窗类型，取值为success/error/loading/info
    type: {
      type: String,
      default: null
    },
    //显示文本
    message: {
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
  },
  computed: {
    $$el() {
      return this.$refs.overlay.$$el;
    },
    cmpUsePadding() {
      if (typeof this.usePadding == "boolean") {
        return this.usePadding;
      }
      return false;
    },
    cmpType() {
      if (["success", "error", "loading", "info"].includes(this.type)) {
        return this.type;
      }
      return "info";
    },
    defaultIconType() {
      if (this.cmpType == "success") {
        return "success";
      }
      if (this.cmpType == "error") {
        return "error-o";
      }
      if (this.cmpType == "info") {
        return "info-o";
      }
      if (this.cmpType == "loading") {
        return null;
      }
    },
    cmpIcon() {
      let icon = {
        type: this.defaultIconType,
        url: null,
        spin: false,
        size: "0.72rem",
        color: null
      };
      if (typeof this.icon == "string" && this.icon) {
        icon.type = this.icon;
      } else if (obj.common.isObject(this.icon)) {
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
    cmpMessage() {
      if (typeof this.message == "string" && this.message) {
        return this.message;
      }
      if (obj.common.isObject(this.message)) {
        return JSON.stringify(this.message);
      }
      if (this.message == void 0 || this.message == null) {
        return "";
      }
      return String(this.message);
    },
    cmpTimeout() {
      if (obj.number.isNumber(this.timeout) && this.timeout > 0) {
        return this.timeout;
      }
      return 0;
    },
    cmpZIndex() {
      if (obj.number.isNumber(this.zIndex)) {
        return this.zIndex;
      }
      return 1100;
    },
    cmpOverlayColor() {
      if (typeof this.overlayColor == "string" && this.overlayColor) {
        return this.overlayColor;
      }
      return "rgba(0, 10, 20, .05)";
    },
    cmpBackground() {
      if (typeof this.background == "string" && this.background) {
        return this.background;
      }
      return null;
    },
    cmpColor() {
      if (typeof this.color == "string" && this.color) {
        return this.color;
      }
      return "#fff";
    },
    cmpMountEl() {
      if (typeof this.mountEl == "string" && this.mountEl) {
        return this.mountEl;
      }
      return "body";
    },
    cmpShadow() {
      if (typeof this.shadow == "boolean") {
        return this.shadow;
      }
      return true;
    },
    toastStyle() {
      let style = {
        zIndex: this.cmpZIndex
      };
      if (this.cmpBackground) {
        style.backgroundColor = this.cmpBackground;
      }
      if (this.cmpColor) {
        style.color = this.cmpColor;
      }
      return style;
    }
  },
  components: {
    Icon,
    Loading,
    Overlay
  },
  mounted() {
    this.__init(this);
  },
  methods: {
    //弹窗完全显示后
    toastShown() {
      if (this.cmpTimeout > 0) {
        this.timer = setTimeout(() => {
          this.show = false;
        }, this.cmpTimeout);
      }
    },
    //弹窗完全关闭后
    toastHidden() {
      this.clearTimer();
      this.__remove();
    },
    //清除计时器
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
  }
};
const _hoisted_1$x = { class: "mvi-toast-icon" };
const _hoisted_2$t = ["innerHTML"];
function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Loading = resolveComponent("Loading");
  const _component_Icon = resolveComponent("Icon");
  const _component_Overlay = resolveComponent("Overlay");
  return openBlock(), createBlock(_component_Overlay, {
    ref: "overlay",
    color: $options.cmpOverlayColor,
    onHidden: $options.toastHidden,
    modelValue: $data.show,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.show = $event),
    "use-padding": $options.cmpUsePadding,
    zIndex: $options.cmpZIndex,
    fade: "",
    "mount-el": $options.cmpMountEl,
    onShown: $options.toastShown
  }, {
    default: withCtx(() => [
      createElementVNode("div", mergeProps({
        class: ["mvi-toast", $options.cmpMessage ? "" : "iconless", $options.cmpShadow ? "shadow" : ""],
        style: $options.toastStyle
      }, _ctx.$attrs), [
        createElementVNode("div", _hoisted_1$x, [
          $options.cmpType == "loading" && !$options.cmpIcon.type && !$options.cmpIcon.url ? (openBlock(), createBlock(_component_Loading, {
            key: 0,
            color: $options.cmpColor,
            size: $options.cmpIcon.size
          }, null, 8, ["color", "size"])) : (openBlock(), createBlock(_component_Icon, {
            key: 1,
            type: $options.cmpIcon.type,
            url: $options.cmpIcon.url,
            spin: $options.cmpIcon.spin,
            size: $options.cmpIcon.size,
            color: $options.cmpIcon.color
          }, null, 8, ["type", "url", "spin", "size", "color"]))
        ]),
        $options.cmpMessage ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "mvi-toast-message",
          innerHTML: $options.cmpMessage
        }, null, 8, _hoisted_2$t)) : createCommentVNode("", true)
      ], 16)
    ]),
    _: 1
  }, 8, ["color", "onHidden", "modelValue", "use-padding", "zIndex", "mount-el", "onShown"]);
}
const ToastComponent = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$K], ["__scopeId", "data-v-ff635be3"]]);
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
    return new Promise((resolve, reject) => {
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
      Toast.$vm.show = false;
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
const msgbox_vue_vue_type_style_index_0_scoped_4d410ae1_lang = "";
const _sfc_main$J = {
  name: "m-msgbox",
  data() {
    return {
      show: false
    };
  },
  inheritAttrs: false,
  props: {
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
  },
  computed: {
    cpmMessage() {
      if (typeof this.message == "string") {
        return this.message;
      }
      if (obj.common.isObject(this.message)) {
        return JSON.stringify(this.message);
      }
      return String(this.message);
    },
    cmpAnimation() {
      if (typeof this.animation == "string" && this.animation) {
        return this.animation;
      }
      return "fade";
    },
    cmpTimeout() {
      if (obj.number.isNumber(this.timeout)) {
        return this.timeout;
      }
      return 1500;
    },
    cmpZIndex() {
      if (obj.number.isNumber(this.zIndex)) {
        return this.zIndex;
      }
      return 1100;
    },
    cmpBackground() {
      if (typeof this.background == "string" && this.background) {
        return this.background;
      }
      return null;
    },
    cmpColor() {
      if (typeof this.color == "string" && this.color) {
        return this.color;
      }
      return null;
    },
    msgboxStyle() {
      let style = {
        zIndex: this.cmpZIndex
      };
      if (this.cmpBackground) {
        style.backgroundColor = this.cmpBackground;
      }
      if (this.cmpColor) {
        style.color = this.cmpColor;
      }
      return style;
    },
    msgboxClass() {
      let cls = ["mvi-msgbox"];
      if (this.cmpAnimation == "translate") {
        cls.push("mvi-msgbox-translate");
      }
      return cls;
    }
  },
  mounted() {
    this.show = true;
  },
  methods: {
    //完全显示后
    afterEnter() {
      if (this.cmpTimeout > 0) {
        setTimeout(() => {
          this.show = false;
        }, this.cmpTimeout);
      }
    },
    //完全隐藏后
    afterLeave() {
      this.__remove();
    }
  }
};
const _hoisted_1$w = ["textContent"];
function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Teleport, { to: "body" }, [
    createVNode(Transition, {
      name: "mvi-msgbox-" + $options.cmpAnimation,
      onAfterEnter: $options.afterEnter,
      onAfterLeave: $options.afterLeave
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", mergeProps(_ctx.$attrs, {
          class: $options.msgboxClass,
          textContent: toDisplayString($options.cpmMessage),
          style: $options.msgboxStyle
        }), null, 16, _hoisted_1$w), [
          [vShow, $data.show]
        ])
      ]),
      _: 1
    }, 8, ["name", "onAfterEnter", "onAfterLeave"])
  ]);
}
const MsgboxComponent = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$J], ["__scopeId", "data-v-4d410ae1"]]);
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
const numberKeyboard_vue_vue_type_style_index_0_scoped_3b4097b5_lang = "";
const _sfc_main$I = {
  name: "m-number-keyboard",
  data() {
    return {
      //第一次显示进行渲染
      firstShow: false,
      //键盘是否显示
      keyboardShow: false,
      //键盘按键
      numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "X", ".", "0"],
      //每次打开时的键盘布局缓存
      oldNumbers: []
    };
  },
  emits: ["update:modelValue", "update:show", "input", "delete", "complete", "show", "showing", "shown", "hide", "hidding", "hidden"],
  inheritAttrs: false,
  props: {
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
  },
  computed: {
    $$el() {
      return this.$refs.overlay.$$el;
    },
    cmpShow: {
      set(value) {
        this.$emit("update:show", value);
      },
      get() {
        return this.show;
      }
    },
    cmpValue: {
      set(value) {
        this.$emit("update:modelValue", value);
      },
      get() {
        if (obj.number.isNumber(this.modelValue)) {
          return this.modelValue.toString();
        }
        return this.modelValue;
      }
    },
    boardStyle() {
      return {
        transition: "all " + this.timeout + "ms",
        zIndex: this.zIndex + 10
      };
    },
    deleteDisabeld() {
      if (this.modelValue === "") {
        return true;
      }
      return false;
    },
    completeDisabled() {
      if (this.modelValue === "") {
        return true;
      }
      return false;
    },
    leftNumberClass() {
      return (item, index) => {
        let cls = ["mvi-number-keyboard-left-number"];
        if (index == this.cpmNumbers.length - 1) {
          if (this.showX || this.showDecimal) {
            cls.push("half");
          } else {
            cls.push("full");
          }
        }
        if (this.border) {
          cls.push("border");
        }
        return cls;
      };
    },
    leftNumberElClass() {
      return () => {
        let cls = ["mvi-number-keyboard-left-number-el"];
        if (this.active) {
          cls.push("active");
        }
        return cls;
      };
    },
    deleteBtnClass() {
      let cls = ["mvi-number-keyboard-delete"];
      if (this.border) {
        cls.push("border");
      }
      return cls;
    },
    deleteBtnElClass() {
      let cls = ["mvi-number-keyboard-delete-el"];
      if (this.active && !this.deleteDisabeld) {
        cls.push("active");
      }
      return cls;
    },
    completeBtnClass() {
      let cls = ["mvi-number-keyboard-complete"];
      if (this.border) {
        cls.push("border");
      }
      return cls;
    },
    completeBtnElClass() {
      let cls = ["mvi-number-keyboard-complete-el"];
      if (this.active && !(this.promiseEmpty ? false : this.completeDisabled)) {
        cls.push("active");
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
    cpmNumbers() {
      let numbers = this.numbers.filter((item) => {
        return this.showKeyBoard(item);
      });
      if (this.random) {
        if (this.show) {
          let arr = [];
          let length = numbers.length;
          for (let i = 0; i < length; i++) {
            arr.push(this.getRandomNumber(arr));
          }
          this.oldNumbers = [...arr];
          return arr;
        }
        return this.oldNumbers;
      }
      return numbers;
    }
  },
  components: {
    Overlay
  },
  methods: {
    //获取一个随机键盘值
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
    //遮罩层显示前
    overlayShow() {
      if (!this.firstShow) {
        this.firstShow = true;
      }
      this.keyboardShow = true;
    },
    //遮罩层隐藏前
    overlayHide() {
      this.keyboardShow = false;
    },
    //数字点击
    numberClick(item) {
      if (this.cmpValue.length >= this.maxlength && this.maxlength > 0) {
        return;
      }
      this.cmpValue += item;
      this.$emit("input", item);
    },
    //删除点击
    deleteClick() {
      if (this.deleteDisabeld) {
        return;
      }
      let value = obj.string.delete(this.cmpValue, this.cmpValue.length - 1, 1);
      this.cmpValue = value;
      this.$emit("delete", value);
    },
    //完成点击
    completeClick() {
      if (this.completeDisabled && !this.promiseEmpty) {
        return;
      }
      if (this.calibration) {
        this.cmpValue = parseFloat(this.cmpValue) || "";
      }
      this.$emit("complete", this.cmpValue);
      this.cmpShow = false;
    },
    //弹出层显示前
    beforeEnter(el) {
      if (obj.data.get(el, "mvi-keyboard-beforeEnter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-keyboard-beforeEnter-trigger", true);
      this.$emit("show", el);
      if (typeof this.keyboardComponentWatch == "function") {
        this.keyboardComponentWatch.apply(this, ["show", el]);
      }
    },
    //弹出层显示时
    enter(el) {
      if (obj.data.get(el, "mvi-keyboard-enter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-keyboard-enter-trigger", true);
      this.$emit("showing", el);
      if (typeof this.keyboardComponentWatch == "function") {
        this.keyboardComponentWatch.apply(this, ["showing", el]);
      }
    },
    //弹出层显示后
    afterEnter(el) {
      this.$emit("shown", el);
      if (typeof this.keyboardComponentWatch == "function") {
        this.keyboardComponentWatch.apply(this, ["shown", el]);
      }
    },
    //弹出层隐藏前
    beforeLeave(el) {
      obj.data.remove(el, "mvi-keyboard-beforeEnter-trigger");
      obj.data.remove(el, "mvi-keyboard-enter-trigger");
      this.$emit("hide", el);
      if (typeof this.keyboardComponentWatch == "function") {
        this.keyboardComponentWatch.apply(this, ["hide", el]);
      }
    },
    //弹出层隐藏时
    leave(el) {
      this.$emit("hidding", el);
      if (typeof this.keyboardComponentWatch == "function") {
        this.keyboardComponentWatch.apply(this, ["hidding", el]);
      }
    },
    //弹出层隐藏后
    afterLeave(el) {
      this.$emit("hidden", el);
      if (typeof this.keyboardComponentWatch == "function") {
        this.keyboardComponentWatch.apply(this, ["hidden", el]);
      }
    }
  }
};
const _hoisted_1$v = {
  key: 0,
  class: "mvi-number-keyboard-title"
};
const _hoisted_2$s = { key: 1 };
const _hoisted_3$m = { class: "mvi-number-keyboard-left" };
const _hoisted_4$g = ["onClick"];
const _hoisted_5$b = {
  key: 0,
  class: "mvi-number-keyboard-right"
};
const _hoisted_6$8 = ["disabled"];
const _hoisted_7$8 = ["textContent"];
const _hoisted_8$6 = ["disabled"];
const _hoisted_9$3 = ["textContent"];
function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Overlay = resolveComponent("Overlay");
  return openBlock(), createBlock(_component_Overlay, {
    ref: "overlay",
    modelValue: $options.cmpShow,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $options.cmpShow = $event),
    onShow: $options.overlayShow,
    onHide: $options.overlayHide,
    "z-index": $props.zIndex,
    color: $props.overlayColor,
    closable: $props.closable,
    timeout: $props.timeout,
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
            !$props.border && ($props.title || _ctx.$slots.title) ? (openBlock(), createElementBlock("div", _hoisted_1$v, [
              _ctx.$slots.title ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_2$s, toDisplayString($props.title), 1))
            ])) : createCommentVNode("", true),
            createElementVNode("div", {
              class: normalizeClass(["mvi-number-keyboard-wrapper", $props.border ? "" : "border"])
            }, [
              createElementVNode("div", _hoisted_3$m, [
                (openBlock(true), createElementBlock(Fragment, null, renderList($options.cpmNumbers, (item, index) => {
                  return openBlock(), createElementBlock("div", {
                    class: normalizeClass($options.leftNumberClass(item, index))
                  }, [
                    createElementVNode("div", {
                      onClick: ($event) => $options.numberClick(item),
                      class: normalizeClass($options.leftNumberElClass(item, index))
                    }, toDisplayString(item), 11, _hoisted_4$g)
                  ], 2);
                }), 256))
              ]),
              $props.showComplete || $props.showDelete ? (openBlock(), createElementBlock("div", _hoisted_5$b, [
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
                    }, null, 8, _hoisted_7$8))
                  ], 10, _hoisted_6$8)
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
                    }, null, 8, _hoisted_9$3)
                  ], 10, _hoisted_8$6)
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
  }, 8, ["modelValue", "onShow", "onHide", "z-index", "color", "closable", "timeout", "mount-el", "use-padding"]);
}
const NumberKeyboard = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$I], ["__scopeId", "data-v-3b4097b5"]]);
NumberKeyboard.install = (app) => {
  app.component(NumberKeyboard.name, NumberKeyboard);
};
const search_vue_vue_type_style_index_0_scoped_f7fa48ad_lang = "";
const _sfc_main$H = {
  name: "m-search",
  emits: ["update:modelValue", "search", "cancel", "left-click", "right-click", "focus", "blur", "input", "clear", "keydown", "keyup"],
  data() {
    return {
      focus: false
    };
  },
  props: {
    //输入框的值
    modelValue: {
      type: [String, Number],
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
      type: [String, Boolean],
      default: false,
      validator(value) {
        return [false, "none", "text", "decimal", "numeric", "tel", "search", "email", "url"].includes(value);
      }
    }
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
        if (obj.common.isObject(param)) {
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
    showClear() {
      if (this.disabled || this.readonly) {
        return false;
      }
      if (this.focus) {
        if (this.realValue === "") {
          return false;
        }
        return true;
      }
      return false;
    },
    cmpType() {
      if (this.type == "number") {
        return "text";
      } else {
        return this.type;
      }
    },
    cmpInputMode() {
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
      if (this.parseIcon(this.leftIcon).type || this.parseIcon(this.leftIcon).url) {
        style.paddingLeft = 0;
      }
      if (this.clearable && this.showClear || this.parseIcon(this.rightIcon).type || this.parseIcon(this.rightIcon).url) {
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
    //输入框键盘按下
    keydown(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("keydown", e, this.realValue);
    },
    //输入框键盘松开
    keyup(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("keyup", e, this.realValue);
    },
    //输入框获取焦点
    inputFocus() {
      if (this.disabled) {
        return;
      }
      this.focus = true;
      this.$emit("focus", this.realValue);
    },
    //输入框失去焦点
    inputBlur() {
      if (this.disabled) {
        return;
      }
      setTimeout(() => {
        this.focus = false;
        this.$emit("blur", this.realValue);
      }, 200);
    },
    //输入监听
    searchInput() {
      if (this.disabled) {
        return;
      }
      this.$emit("input", this.realValue);
    },
    //搜索
    doSearch() {
      if (this.disabled) {
        return;
      }
      this.$emit("search", this.realValue);
    },
    //取消
    doCancel() {
      if (this.disabled) {
        return;
      }
      this.$emit("cancel", this.realValue);
    },
    //左侧图标点击
    leftClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("left-click", this.realValue);
    },
    //右侧图标点击
    rightClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("right-click", this.realValue);
    },
    //清除输入框
    clearInput() {
      if (this.disabled) {
        return;
      }
      if (!this.clearable) {
        return;
      }
      setTimeout(() => {
        this.realValue = "";
        this.$refs.input.focus();
        this.$emit("clear", this.realValue);
      }, 210);
    }
  }
};
const _hoisted_1$u = ["disabled"];
const _hoisted_2$r = ["textContent"];
const _hoisted_3$l = ["type", "placeholder", "maxlength", "autofocus", "disabled", "readonly", "inputmode"];
const _hoisted_4$f = ["textContent"];
function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    class: "mvi-search",
    disabled: $props.disabled || null
  }, [
    $props.label ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "mvi-search-label",
      textContent: toDisplayString($props.label)
    }, null, 8, _hoisted_2$r)) : createCommentVNode("", true),
    createElementVNode("div", {
      class: normalizeClass(["mvi-search-input-container", $props.round ? "round" : ""])
    }, [
      $options.parseIcon($props.leftIcon).type || $options.parseIcon($props.leftIcon).url ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "mvi-search-left-icon",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.leftClick && $options.leftClick(...args))
      }, [
        createVNode(_component_Icon, {
          type: $options.parseIcon($props.leftIcon).type,
          url: $options.parseIcon($props.leftIcon).url,
          spin: $options.parseIcon($props.leftIcon).spin,
          size: $options.parseIcon($props.leftIcon).size,
          color: $options.parseIcon($props.leftIcon).color
        }, null, 8, ["type", "url", "spin", "size", "color"])
      ])) : createCommentVNode("", true),
      withDirectives(createElementVNode("input", {
        ref: "input",
        class: normalizeClass(["mvi-search-input", $options.parseIcon($props.leftIcon).type || $options.parseIcon($props.leftIcon).url ? "left-none-radius" : "", $options.parseIcon($props.rightIcon).type || $options.parseIcon($props.rightIcon).url || $props.clearable && $options.showClear ? "right-none-radius" : ""]),
        type: $options.cmpType,
        onKeypress: _cache[1] || (_cache[1] = withKeys((...args) => $options.doSearch && $options.doSearch(...args), ["enter"])),
        autocomplete: "off",
        placeholder: $props.placeholder,
        maxlength: $props.maxlength,
        autofocus: $props.autofocus,
        disabled: $props.disabled,
        readonly: $props.readonly,
        inputmode: $options.cmpInputMode,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $options.realValue = $event),
        onInput: _cache[3] || (_cache[3] = (...args) => $options.searchInput && $options.searchInput(...args)),
        onFocus: _cache[4] || (_cache[4] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
        onBlur: _cache[5] || (_cache[5] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
        onKeydown: _cache[6] || (_cache[6] = (...args) => $options.keydown && $options.keydown(...args)),
        onKeyup: _cache[7] || (_cache[7] = (...args) => $options.keyup && $options.keyup(...args)),
        style: normalizeStyle($options.inputStyle)
      }, null, 46, _hoisted_3$l), [
        [vModelDynamic, $options.realValue]
      ]),
      $props.clearable ? withDirectives((openBlock(), createElementBlock("div", {
        key: 1,
        class: "mvi-search-clear",
        onClick: _cache[8] || (_cache[8] = (...args) => $options.clearInput && $options.clearInput(...args))
      }, [
        createVNode(_component_Icon, { type: "times-o" })
      ], 512)), [
        [vShow, $options.showClear]
      ]) : createCommentVNode("", true),
      $options.parseIcon($props.rightIcon).type || $options.parseIcon($props.rightIcon).url ? (openBlock(), createElementBlock("div", {
        key: 2,
        class: "mvi-search-right-icon",
        onClick: _cache[9] || (_cache[9] = (...args) => $options.rightClick && $options.rightClick(...args))
      }, [
        createVNode(_component_Icon, {
          type: $options.parseIcon($props.rightIcon).type,
          url: $options.parseIcon($props.rightIcon).url,
          spin: $options.parseIcon($props.rightIcon).spin,
          size: $options.parseIcon($props.rightIcon).size,
          color: $options.parseIcon($props.rightIcon).color
        }, null, 8, ["type", "url", "spin", "size", "color"])
      ])) : createCommentVNode("", true)
    ], 2),
    $props.showCancel ? (openBlock(), createElementBlock("div", {
      key: 1,
      textContent: toDisplayString($props.cancelText),
      class: "mvi-search-cancel",
      onClick: _cache[10] || (_cache[10] = (...args) => $options.doCancel && $options.doCancel(...args))
    }, null, 8, _hoisted_4$f)) : createCommentVNode("", true)
  ], 8, _hoisted_1$u);
}
const Search = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$H], ["__scopeId", "data-v-f7fa48ad"]]);
Search.install = (app) => {
  app.component(Search.name, Search);
};
const progress_vue_vue_type_style_index_0_scoped_b4862679_lang = "";
const _sfc_main$G = {
  name: "m-progress",
  props: {
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
      type: [String, Number],
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
    cmpText() {
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
    progressClass() {
      let cls = ["mvi-progress"];
      if (this.round) {
        cls.push("round");
      } else if (this.square) {
        cls.push("square");
      }
      return cls;
    }
  }
};
const _hoisted_1$t = ["textContent"];
function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.progressClass),
    style: normalizeStyle($options.progressStyle)
  }, [
    createElementVNode("div", {
      class: "mvi-progress-bar",
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
          textContent: toDisplayString($options.cmpText)
        }, null, 8, _hoisted_1$t))
      ], 4)) : createCommentVNode("", true)
    ], 4)
  ], 6);
}
const Progress = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$G], ["__scopeId", "data-v-b4862679"]]);
Progress.install = (app) => {
  app.component(Progress.name, Progress);
};
const slider_vue_vue_type_style_index_0_scoped_bb4c2168_lang = "";
const _sfc_main$F = {
  name: "m-slider",
  data() {
    return {
      drag: null,
      isdrag: false
    };
  },
  emits: ["update:modelValue", "change"],
  props: {
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
  },
  computed: {
    sliderStyle() {
      let style = {};
      if (this.trackColor) {
        style.background = this.trackColor;
      }
      if (this.strokeWidth) {
        if (this.vertical) {
          style.width = this.strokeWidth;
        } else {
          style.height = this.strokeWidth;
        }
      }
      return style;
    },
    sliderBarStyle() {
      let style = {};
      if (this.color) {
        style.background = this.color;
      }
      let percent = obj.number.divide(obj.number.subtract(this.modelValue, this.min), obj.number.subtract(this.max, this.min));
      if (this.vertical) {
        style.height = `calc(${percent} * 100%)`;
      } else {
        style.width = `calc(${percent} * 100%)`;
      }
      return style;
    },
    buttonElStyle() {
      let style = {};
      if (this.strokeWidth) {
        style.width = `calc(${this.strokeWidth} * 2)`;
        style.height = `calc(${this.strokeWidth} * 2)`;
      }
      return style;
    },
    sliderClass() {
      let cls = ["mvi-slider"];
      if (this.round) {
        cls.push("round");
      } else if (this.square) {
        cls.push("square");
      }
      if (this.vertical) {
        cls.push("vertical");
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
    vertical() {
      this.$nextTick(() => {
        this.setBtnOffset();
      });
    },
    modelValue() {
      if (!this.isdrag) {
        this.setBtnOffset();
      }
    }
  },
  methods: {
    //拖拽
    onDrag(el, container, placement) {
      this.isdrag = true;
      if (this.vertical) {
        let value = obj.number.add(obj.number.mutiply(obj.number.divide(obj.number.add(placement.top, obj.number.divide(this.$refs.btn.offsetHeight, 2)), this.$el.offsetHeight), obj.number.subtract(this.max, this.min)), this.min);
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      } else {
        let value = obj.number.add(obj.number.mutiply(obj.number.divide(obj.number.add(placement.left, obj.number.divide(this.$refs.btn.offsetWidth, 2)), this.$el.offsetWidth), obj.number.subtract(this.max - this.min)), this.min);
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      }
    },
    //设置按钮的移动距离
    setBtnOffset() {
      if (this.vertical) {
        this.$refs.btn.style.left = "50%";
        this.$refs.btn.style.top = obj.number.subtract(obj.number.mutiply(obj.number.divide(obj.number.subtract(this.modelValue, this.min), obj.number.subtract(this.max - this.min)), this.$el.offsetHeight), obj.number.divide(this.$refs.btn.offsetHeight, 2)) + "px";
      } else {
        this.$refs.btn.style.top = "50%";
        this.$refs.btn.style.left = obj.number.subtract(obj.number.mutiply(obj.number.divide(obj.number.subtract(this.modelValue, this.min), obj.number.subtract(this.max - this.min)), this.$el.offsetWidth), obj.number.divide(this.$refs.btn.offsetWidth, 2)) + "px";
      }
    },
    //跳转到指定位置
    dragTo(event2) {
      if (this.disabled) {
        return;
      }
      if (this.isdrag) {
        return;
      }
      if (obj.element.isContains(this.$refs.btn, event2.target)) {
        return;
      }
      if (this.vertical) {
        let top = event2.offsetY;
        let value = obj.number.add(obj.number.mutiply(obj.number.divide(top, this.$el.offsetHeight), obj.number.subtract(this.max, this.min)), this.min);
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      } else {
        let left = event2.offsetX;
        let value = obj.number.add(obj.number.mutiply(obj.number.divide(left, this.$el.offsetWidth), obj.number.subtract(this.max, this.min)), this.min);
        this.$emit("update:modelValue", value);
        this.$emit("change", value);
      }
    }
  },
  beforeUnmount() {
    if (this.drag) {
      this.drag.destroy();
    }
  }
};
const _hoisted_1$s = ["disabled"];
const _hoisted_2$q = {
  class: "mvi-slider-button",
  ref: "btn"
};
function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
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
    createElementVNode("div", _hoisted_2$q, [
      _ctx.$slots.button ? renderSlot(_ctx.$slots, "button", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: "mvi-slider-button-el",
        style: normalizeStyle($options.buttonElStyle)
      }, null, 4))
    ], 512)
  ], 14, _hoisted_1$s);
}
const Slider = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$F], ["__scopeId", "data-v-bb4c2168"]]);
Slider.install = (app) => {
  app.component(Slider.name, Slider);
};
const stepper_vue_vue_type_style_index_0_scoped_d4efe9c9_lang = "";
const _sfc_main$E = {
  name: "m-stepper",
  emits: ["update:modelValue", "change"],
  props: {
    //输入框的值
    modelValue: {
      type: [String, Number],
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
  },
  computed: {
    arrivalMin() {
      if (this.min != null) {
        return this.realValue <= this.min;
      }
      return false;
    },
    arrivalMax() {
      if (this.max != null) {
        return this.realValue >= this.max;
      }
      return false;
    },
    inputStyle() {
      let style = {};
      if (this.inputWidth) {
        style.width = this.inputWidth;
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
    minusClass() {
      let cls = ["mvi-stepper-minus"];
      if (!(this.disabledMinus || this.arrivalMin || this.disabled) && this.active) {
        cls.push("active");
      }
      if (this.border) {
        cls.push("border");
      }
      return cls;
    },
    plusClass() {
      let cls = ["mvi-stepper-plus"];
      if (!(this.disabledPlus || this.arrivalMax || this.disabled) && this.active) {
        cls.push("active");
      }
      if (this.border) {
        cls.push("border");
      }
      return cls;
    },
    realValue: {
      set(value) {
        let val = this.updateValue(value);
        if (this.modelValue !== val) {
          this.$emit("update:modelValue", val);
          this.$emit("change", val);
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
    //减法
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
      this.realValue = obj.number.subtract(this.realValue, this.step);
    },
    //加法
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
      this.realValue = obj.number.add(this.realValue, this.step);
    },
    //输入框修改值
    changeValue() {
      if (this.disabled) {
        return;
      }
      if (this.disabledInput) {
        return;
      }
      this.$refs.input.value = this.realValue;
    },
    //校验更新value值
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
const _hoisted_1$r = ["disabled"];
const _hoisted_2$p = ["disabled"];
const _hoisted_3$k = ["disabled"];
const _hoisted_4$e = ["disabled"];
function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-stepper", $props.size])
  }, [
    $props.showMinus ? (openBlock(), createElementBlock("div", {
      key: 0,
      disabled: $props.disabledMinus || $options.arrivalMin || $props.disabled || null,
      class: normalizeClass($options.minusClass),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.doMinus && $options.doMinus(...args))
    }, [
      createVNode(_component_Icon, { type: "minus" })
    ], 10, _hoisted_1$r)) : createCommentVNode("", true),
    $props.showInput ? (openBlock(), createElementBlock("div", {
      key: 1,
      disabled: $props.disabled || $props.disabledInput || null,
      class: normalizeClass(["mvi-stepper-input", $props.border ? "border" : ""]),
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
      }, null, 44, _hoisted_3$k), [
        [vModelText, $options.realValue]
      ])
    ], 14, _hoisted_2$p)) : createCommentVNode("", true),
    $props.showPlus ? (openBlock(), createElementBlock("div", {
      key: 2,
      disabled: $props.disabledPlus || $options.arrivalMax || $props.disabled || null,
      class: normalizeClass($options.plusClass),
      onClick: _cache[4] || (_cache[4] = (...args) => $options.doPlus && $options.doPlus(...args))
    }, [
      createVNode(_component_Icon, { type: "plus" })
    ], 10, _hoisted_4$e)) : createCommentVNode("", true)
  ], 2);
}
const Stepper = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$E], ["__scopeId", "data-v-d4efe9c9"]]);
Stepper.install = (app) => {
  app.component(Stepper.name, Stepper);
};
const switch_vue_vue_type_style_index_0_scoped_836d8024_lang = "";
const _sfc_main$D = {
  name: "m-switch",
  emits: ["update:modelValue", "change"],
  props: {
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
  },
  components: {
    Icon
  },
  methods: {
    //更改状态
    change(event2) {
      let check = event2.target.checked;
      this.$emit("update:modelValue", check);
      this.$emit("change", check);
    }
  },
  computed: {
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
const _hoisted_1$q = ["disabled"];
const _hoisted_2$o = ["checked", "disabled"];
function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("label", {
    class: normalizeClass(["mvi-switch", $props.modelValue ? "checked" : ""]),
    style: normalizeStyle($options.switchStyle),
    disabled: $props.disabled || null
  }, [
    createElementVNode("span", {
      class: normalizeClass(["mvi-switch-el", $props.modelValue ? "checked" : ""]),
      style: normalizeStyle($options.elStyle)
    }, [
      $props.loading && !$props.disabled ? (openBlock(), createBlock(_component_Icon, {
        key: 0,
        type: "load-e",
        spin: "",
        size: "0.8em"
      })) : createCommentVNode("", true)
    ], 6),
    createElementVNode("input", {
      onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args)),
      type: "checkbox",
      checked: $props.modelValue,
      disabled: $props.disabled || $props.loading
    }, null, 40, _hoisted_2$o)
  ], 14, _hoisted_1$q);
}
const Switch = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$D], ["__scopeId", "data-v-836d8024"]]);
Switch.install = (app) => {
  app.component(Switch.name, Switch);
};
const actionsheet_vue_vue_type_style_index_0_scoped_9262c92f_lang = "";
const _sfc_main$C = {
  name: "m-actionsheet",
  emits: ["update:modelValue", "select"],
  props: {
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
  },
  computed: {
    $$el() {
      return this.$refs.popup.$$el;
    },
    show: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    },
    //转换图标字段
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj.common.isObject(param)) {
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
    itemClass() {
      return (item) => {
        let cls = ["mvi-actionsheet-item", this.size];
        if (this.active && !item.loading && !item.disabled) {
          cls.push("active");
        }
        return cls;
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
    //点击选项
    doSelect(item, index) {
      if (item.disabled || item.loading) {
        return;
      }
      if (this.selectClose) {
        this.show = false;
      }
      this.$emit("select", { ...item }, index);
    }
  }
};
const _withScopeId$3 = (n) => (pushScopeId("data-v-9262c92f"), n = n(), popScopeId(), n);
const _hoisted_1$p = { class: "mvi-actionsheet" };
const _hoisted_2$n = ["textContent"];
const _hoisted_3$j = { class: "mvi-actionsheet-list" };
const _hoisted_4$d = ["disabled", "onClick"];
const _hoisted_5$a = {
  key: 1,
  class: "mvi-actionsheet-content"
};
const _hoisted_6$7 = ["textContent"];
const _hoisted_7$7 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("div", { class: "mvi-actionsheet-divider" }, null, -1));
const _hoisted_8$5 = ["textContent"];
function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Loading = resolveComponent("Loading");
  const _component_Icon = resolveComponent("Icon");
  const _component_Popup = resolveComponent("Popup");
  return openBlock(), createBlock(_component_Popup, {
    ref: "popup",
    modelValue: $options.show,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $options.show = $event),
    "overlay-color": $props.overlayColor,
    "z-index": $props.zIndex,
    timeout: $props.timeout,
    placement: "bottom",
    round: $props.round,
    "use-padding": $props.usePadding,
    "mount-el": $props.mountEl,
    closable: $props.closable
  }, {
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1$p, [
        $props.title ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["mvi-actionsheet-title", $props.size]),
          textContent: toDisplayString($props.title)
        }, null, 10, _hoisted_2$n)) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_3$j, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.options, (item, index) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass($options.itemClass(item)),
              disabled: $options.itemDisabled(item) || null,
              onClick: ($event) => $options.doSelect(item, index)
            }, [
              item.loading || false ? (openBlock(), createBlock(_component_Loading, {
                key: 0,
                size: $props.size == "large" ? "0.4rem" : "0.36rem",
                color: "#bbb"
              }, null, 8, ["size"])) : item.label || $options.parseIcon(item.icon).type || $options.parseIcon(item.icon).url ? (openBlock(), createElementBlock("div", _hoisted_5$a, [
                ($options.parseIcon(item.icon).type || $options.parseIcon(item.icon).url) && item.placement != "right" ? (openBlock(), createBlock(_component_Icon, {
                  key: 0,
                  "data-placement": "left",
                  type: $options.parseIcon(item.icon).type,
                  url: $options.parseIcon(item.icon).url,
                  spin: $options.parseIcon(item.icon).spin,
                  size: $options.parseIcon(item.icon).size,
                  color: $options.parseIcon(item.icon).color
                }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
                item.label ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  class: "mvi-actionsheet-item-label",
                  textContent: toDisplayString(item.label)
                }, null, 8, _hoisted_6$7)) : createCommentVNode("", true),
                ($options.parseIcon(item.icon).type || $options.parseIcon(item.icon).url) && item.placement == "right" ? (openBlock(), createBlock(_component_Icon, {
                  key: 2,
                  "data-placement": "right",
                  type: $options.parseIcon(item.icon).type,
                  url: $options.parseIcon(item.icon).url,
                  spin: $options.parseIcon(item.icon).spin,
                  size: $options.parseIcon(item.icon).size,
                  color: $options.parseIcon(item.icon).color
                }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ], 10, _hoisted_4$d);
          }), 256))
        ]),
        _hoisted_7$7,
        $props.showCancel ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["mvi-actionsheet-button", $props.size, $props.active ? "active" : ""]),
          textContent: toDisplayString($props.cancelText),
          onClick: _cache[0] || (_cache[0] = ($event) => $options.show = false)
        }, null, 10, _hoisted_8$5)) : createCommentVNode("", true)
      ])
    ]),
    _: 1
  }, 8, ["modelValue", "overlay-color", "z-index", "timeout", "round", "use-padding", "mount-el", "closable"]);
}
const Actionsheet = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$C], ["__scopeId", "data-v-9262c92f"]]);
Actionsheet.install = (app) => {
  app.component(Actionsheet.name, Actionsheet);
};
const dropdown_vue_vue_type_style_index_0_scoped_d29335df_lang = "";
const _sfc_main$B = {
  name: "m-dropdown",
  emits: ["update:modelValue", "update:show", "select"],
  props: {
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
  },
  computed: {
    $$el() {
      return this.$refs.popup.$$el;
    },
    cmpShow: {
      set(value) {
        this.$emit("update:show", value);
      },
      get() {
        return this.show;
      }
    },
    //转换图标字段
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj.common.isObject(param)) {
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
    //判断是否选中项
    equalValue() {
      return (item, index) => {
        if (item.value === void 0 || item.value === null) {
          return this.modelValue === index;
        }
        return obj.common.equal(this.modelValue, item.value);
      };
    },
    //选项是否禁用
    itemDisabled() {
      return (item) => {
        if (typeof item.disabled == "boolean") {
          return item.disabled;
        }
        return false;
      };
    },
    //选项样式
    dropdownItemStyle() {
      return (item, index) => {
        let style = {};
        if (!this.itemDisabled(item) && this.equalValue(item, index) && this.activeColor) {
          style.color = this.activeColor;
        }
        return style;
      };
    },
    //选项class
    dropdownItemClass() {
      return (item, index) => {
        let cls = ["mvi-dropdown-item"];
        if (this.equalValue(item, index) && !item.disabled) {
          cls.push("checked");
        }
        if (this.active && !item.disabled) {
          cls.push("active");
        }
        return cls;
      };
    }
  },
  components: {
    Icon,
    Popup
  },
  methods: {
    //选择
    doSelect(item, index) {
      if (item.disabled) {
        return;
      }
      this.$emit("select", JSON.parse(JSON.stringify(item)), index);
      if (!obj.common.equal(item.value, this.modelValue)) {
        this.$emit("update:modelValue", item.value);
      }
      if (this.selectedClose) {
        this.cmpShow = false;
      }
    }
  }
};
const _hoisted_1$o = { class: "mvi-dropdown" };
const _hoisted_2$m = ["disabled", "onClick"];
const _hoisted_3$i = { class: "mvi-dropdown-label" };
const _hoisted_4$c = ["textContent"];
const _hoisted_5$9 = ["data-placement"];
function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Popup = resolveComponent("Popup");
  return openBlock(), createBlock(_component_Popup, {
    ref: "popup",
    modelValue: $options.cmpShow,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $options.cmpShow = $event),
    "overlay-color": $props.overlayColor,
    "z-index": $props.zIndex,
    timeout: $props.timeout,
    placement: $props.placement,
    round: $props.round,
    "use-padding": $props.usePadding,
    "mount-el": $props.mountEl,
    closable: $props.closable,
    __contentPadding: false
  }, {
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1$o, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.options, (item, index) => {
          return openBlock(), createElementBlock("div", {
            disabled: $options.itemDisabled(item) || null,
            class: normalizeClass($options.dropdownItemClass(item, index)),
            onClick: ($event) => $options.doSelect(item, index),
            style: normalizeStyle($options.dropdownItemStyle(item, index))
          }, [
            createElementVNode("div", _hoisted_3$i, [
              item.icon ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                type: $options.parseIcon(item.icon).type,
                url: $options.parseIcon(item.icon).url,
                spin: $options.parseIcon(item.icon).spin,
                class: "mvi-dropdown-label-icon",
                size: $options.parseIcon(item.icon).size,
                color: $options.parseIcon(item.icon).color
              }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
              createElementVNode("span", {
                class: "mvi-dropdown-label-text",
                textContent: toDisplayString(item.label || "")
              }, null, 8, _hoisted_4$c)
            ]),
            createElementVNode("div", {
              class: normalizeClass(["mvi-dropdown-icon", $options.equalValue(item, index) ? "checked" : ""]),
              "data-placement": $props.placement
            }, [
              createVNode(_component_Icon, {
                type: $options.parseIcon($props.selectedIcon).type,
                url: $options.parseIcon($props.selectedIcon).url,
                spin: $options.parseIcon($props.selectedIcon).spin,
                size: $options.parseIcon($props.selectedIcon).size,
                color: $options.parseIcon($props.selectedIcon).color
              }, null, 8, ["type", "url", "spin", "size", "color"])
            ], 10, _hoisted_5$9)
          ], 14, _hoisted_2$m);
        }), 256))
      ])
    ]),
    _: 1
  }, 8, ["modelValue", "overlay-color", "z-index", "timeout", "placement", "round", "use-padding", "mount-el", "closable"]);
}
const Dropdown = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$B], ["__scopeId", "data-v-d29335df"]]);
Dropdown.install = (app) => {
  app.component(Dropdown.name, Dropdown);
};
const notify_vue_vue_type_style_index_0_scoped_80ba439a_lang = "";
const _sfc_main$A = {
  name: "m-notify",
  data() {
    return {
      //计时器
      timer: null,
      //是否显示
      show: false
    };
  },
  props: {
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
  },
  computed: {
    //类型
    cmpType() {
      let arr = ["success", "info", "primary", "error", "warn"];
      if (arr.includes(this.type)) {
        return this.type;
      }
      return "success";
    },
    //消息文本
    cmpMessage() {
      if (typeof this.message == "string") {
        return this.message;
      }
      if (obj.common.isObject(this.message)) {
        return JSON.stringify(this.message);
      }
      return String(this.message);
    },
    //自定义文字颜色
    cmpColor() {
      if (typeof this.color == "string") {
        return this.color;
      }
      return null;
    },
    //自定义背景色
    cmpBackground() {
      if (typeof this.background == "string") {
        return this.background;
      }
      return null;
    },
    //自定义zIndex
    cmpZIndex() {
      if (obj.number.isNumber(this.zIndex)) {
        return this.zIndex;
      }
      return 1100;
    },
    //自动关闭时间
    cmpTimeout() {
      if (obj.number.isNumber(this.timeout)) {
        return this.timeout;
      }
      return 1500;
    },
    //转换图标
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj.common.isObject(param)) {
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
    //通知样式
    notifyStyle() {
      let style = {
        zIndex: this.cmpZIndex
      };
      if (this.cmpBackground) {
        style.backgroundColor = this.cmpBackground;
      }
      if (this.cmpColor) {
        style.color = this.cmpColor;
      }
      return style;
    }
  },
  components: {
    Icon
  },
  mounted() {
    this.show = true;
    this.__init(this);
  },
  methods: {
    //完全显示后
    afterEnter() {
      if (this.cmpTimeout > 0) {
        this.timer = setTimeout(() => {
          this.show = false;
        }, this.cmpTimeout);
      }
    },
    //完全隐藏后
    afterLeave() {
      this.clearTimer();
      this.__remove();
    },
    //清除计时器
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
  }
};
const _hoisted_1$n = { class: "mvi-notify-content" };
const _hoisted_2$l = ["textContent"];
function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createBlock(Teleport, { to: "body" }, [
    createVNode(Transition, {
      name: "mvi-notify",
      onAfterLeave: $options.afterLeave,
      onAfterEnter: $options.afterEnter
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          class: normalizeClass(["mvi-notify", $options.cmpType]),
          style: normalizeStyle($options.notifyStyle)
        }, [
          createElementVNode("div", _hoisted_1$n, [
            $options.parseIcon($props.icon).type || $options.parseIcon($props.icon).url ? (openBlock(), createBlock(_component_Icon, {
              key: 0,
              type: $options.parseIcon($props.icon).type,
              url: $options.parseIcon($props.icon).url,
              spin: $options.parseIcon($props.icon).spin,
              size: $options.parseIcon($props.icon).size,
              color: $options.parseIcon($props.icon).color
            }, null, 8, ["type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
            createElementVNode("span", {
              textContent: toDisplayString($options.cmpMessage)
            }, null, 8, _hoisted_2$l)
          ])
        ], 6), [
          [vShow, $data.show]
        ])
      ]),
      _: 1
    }, 8, ["onAfterLeave", "onAfterEnter"])
  ]);
}
const NotifyComponent = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$A], ["__scopeId", "data-v-80ba439a"]]);
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
      Notify.$vm.show = false;
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
const pullRefresh_vue_vue_type_style_index_0_scoped_56b35aa0_lang = "";
const _sfc_main$z = {
  name: "m-pull-refresh",
  data() {
    return {
      //刷新元素高度
      elHeight: 0,
      //组件高度
      rootHeight: 0,
      //计数点
      amount: 0,
      //计数点最大值
      amountMax: 4,
      //垂直起点
      startY: 0,
      //第一次垂直起点
      firstStartY: 0,
      //0表示还没触发下拉，1表示触发下拉了但是还没松手，2表示已经松手正在刷新
      status: 0,
      //垂直偏移距离
      translateY: 0,
      //是否触摸行为导致下拉刷新
      hasTouch: false,
      //是否按下鼠标了
      mouseDown: false,
      //是否禁用滚动条
      disableScroll: false
    };
  },
  emits: ["update:modelValue", "refresh"],
  props: {
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
  },
  computed: {
    containerStyle() {
      let style = {
        height: `calc(100% + ${this.elHeight}px)`,
        transform: `translateY(${this.translateY}px)`
      };
      return style;
    },
    wrapperStyle() {
      let style = {
        height: this.rootHeight + "px"
      };
      if (this.disableScroll) {
        style.overflowY = "hidden";
      }
      return style;
    },
    icon() {
      if (this.status == 0) {
        return this.parseIcon(this.pullingIcon);
      }
      if (this.status == 1) {
        return this.parseIcon(this.loosingIcon);
      }
      if (this.status == 2) {
        return this.parseIcon(this.loadingIcon);
      }
    },
    message() {
      if (this.status == 0) {
        return this.pullingText;
      }
      if (this.status == 1) {
        return this.loosingText;
      }
      if (this.status == 2) {
        return this.loadingText;
      }
    },
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj.common.isObject(param)) {
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
    obj.event.on(document.documentElement, `mousemove.pullRefresh_${this.uid}`, this.onPull2);
    obj.event.on(document.documentElement, `mouseup.pullRefresh_${this.uid}`, this.pulled2);
  },
  watch: {
    modelValue() {
      this.changeStatus();
    }
  },
  methods: {
    //初始高度和偏移值设置
    initHeight() {
      this.elHeight = this.$refs.el.offsetHeight;
      this.rootHeight = this.$el.offsetHeight;
      this.translateY = -this.elHeight;
    },
    //开始下拉(移动端)
    startPull(event2) {
      if (this.disabled) {
        return;
      }
      if (this.status == 0) {
        this.startY = event2.targetTouches[0].pageY;
        this.firstStartY = this.startY;
      }
    },
    //开始下拉(PC端)
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
    //下拉过程(移动端)
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
      if (obj.element.getScrollTop(this.$refs.wrapper) > 0) {
        this.firstStartY = this.startY;
        return;
      }
      let el = this.getScrollEl(event2.target);
      if (!el.isEqualNode(this.$refs.wrapper) && obj.element.getScrollTop(el) > 0) {
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
      if (y > obj.element.rem2px(this.distance) - this.elHeight) {
        this.status = 1;
      } else {
        this.status = 0;
      }
      this.translateY = y;
    },
    //下拉过程(PC端)
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
      if (obj.element.getScrollTop(this.$refs.wrapper) > 0) {
        this.firstStartY = this.startY;
        return;
      }
      let el = this.getScrollEl(event2.target);
      if (!el.isEqualNode(this.$refs.wrapper) && obj.element.getScrollTop(el) > 0) {
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
      if (y > obj.element.rem2px(this.distance) - this.elHeight) {
        this.status = 1;
      } else {
        this.status = 0;
      }
      this.translateY = y;
    },
    //下拉结束释放(移动端)
    pulled() {
      if (this.disabled) {
        return;
      }
      if (this.status == 1 && this.modelValue == false) {
        this.$emit("update:modelValue", true);
      } else if (this.status == 0) {
        this.changeStatus();
      }
    },
    //下拉结束释放(PC端)
    pulled2() {
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
    //根据modelValue的值改变状态
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
          this.translateY = obj.element.rem2px(this.distance) - this.elHeight;
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
    //获取触摸元素最近的滚动容器
    getScrollEl(el) {
      if (el.isEqualNode(this.$refs.wrapper) || !obj.element.isContains(this.$refs.wrapper, el)) {
        return this.$refs.wrapper;
      }
      if (obj.element.getScrollHeight(el) > el.clientHeight) {
        return el;
      }
      return this.getScrollEl(el.parentNode);
    }
  },
  beforeUnmount() {
    obj.event.off(document.documentElement, `mousemove.pullRefresh_${this.uid} mouseup.pullRefresh_${this.uid}`);
  }
};
const _hoisted_1$m = { class: "mvi-pull-refresh" };
const _hoisted_2$k = {
  ref: "el",
  class: "mvi-pull-refresh-el"
};
const _hoisted_3$h = ["textContent"];
function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", _hoisted_1$m, [
    createElementVNode("div", {
      ref: "container",
      class: "mvi-pull-refresh-container",
      style: normalizeStyle($options.containerStyle)
    }, [
      createElementVNode("div", _hoisted_2$k, [
        _ctx.$slots.el ? renderSlot(_ctx.$slots, "el", {
          key: 0,
          status: $data.status
        }, void 0, true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createVNode(_component_Icon, {
            type: $options.icon.type,
            spin: $options.icon.spin,
            url: $options.icon.url,
            size: $options.icon.size,
            color: $options.icon.color
          }, null, 8, ["type", "spin", "url", "size", "color"]),
          createElementVNode("span", {
            class: "mvi-pull-refresh-text",
            textContent: toDisplayString($options.message)
          }, null, 8, _hoisted_3$h)
        ], 64))
      ], 512),
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
const PullRefresh = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$z], ["__scopeId", "data-v-56b35aa0"]]);
PullRefresh.install = (app) => {
  app.component(PullRefresh.name, PullRefresh);
};
const swipeCell_vue_vue_type_style_index_0_scoped_1e12e6ca_lang = "";
const _sfc_main$y = {
  name: "m-swipe-cell",
  data() {
    return {
      startX: 0,
      startX2: 0,
      //transform偏移值
      transformX: 0,
      //左侧是否显示
      leftShow: false,
      //右侧是否显示
      rightShow: false,
      amounts: 0,
      //是否按下鼠标
      mouseDown: false,
      //是否拖动
      isDrag: false
    };
  },
  props: {
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
  },
  emits: ["open", "close"],
  watch: {
    disabled() {
      this.close(true);
    }
  },
  computed: {
    cellStyle() {
      return {
        transform: `translateX(${this.transformX}px)`
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
    obj.event.on(document.documentElement, `mousemove.swipeCell_${this.uid}`, this.cellMouseMove);
    obj.event.on(document.documentElement, `mouseup.swipeCell_${this.uid}`, this.cellMouseUp);
  },
  methods: {
    //触摸开始
    cellTouchStart(event2) {
      if (this.disabled) {
        return;
      }
      this.startX = event2.touches[0].pageX;
      this.startX2 = this.startX;
      this.amounts = 0;
    },
    //触摸移动
    cellTouchMove(event2) {
      if (this.disabled) {
        return;
      }
      let endX = event2.touches[0].pageX;
      let moveX = endX - this.startX;
      let moveX2 = endX - this.startX2;
      this.startX = endX;
      if (Math.abs(moveX2) <= obj.element.rem2px(1)) {
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
    //触摸结束
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
    //鼠标按下
    cellMouseDown(event2) {
      if (this.disabled) {
        return;
      }
      this.startX = event2.pageX;
      this.startX2 = this.startX;
      this.amounts = 0;
      this.mouseDown = true;
    },
    //鼠标移动
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
      if (Math.abs(moveX2) <= obj.element.rem2px(1)) {
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
    //鼠标松开
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
    //设置tranform的方法
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
        }, 0);
      });
    },
    //打开方法
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
    //关闭方法
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
    //点击center部分
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
    obj.event.off(document.documentElement, `mousemove.swipeCell_${this.uid} mouseup.swipeCell_${this.uid}`);
  }
};
const _hoisted_1$l = ["disabled"];
const _hoisted_2$j = {
  ref: "left",
  class: "mvi-swipe-cell-left"
};
const _hoisted_3$g = {
  ref: "right",
  class: "mvi-swipe-cell-right"
};
function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "mvi-swipe-cell",
    onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.cellTouchStart && $options.cellTouchStart(...args)),
    onTouchmove: _cache[2] || (_cache[2] = (...args) => $options.cellTouchMove && $options.cellTouchMove(...args)),
    onTouchend: _cache[3] || (_cache[3] = (...args) => $options.cellTouchEnd && $options.cellTouchEnd(...args)),
    style: normalizeStyle($options.cellStyle),
    disabled: $props.disabled || null,
    onMousedown: _cache[4] || (_cache[4] = (...args) => $options.cellMouseDown && $options.cellMouseDown(...args))
  }, [
    withDirectives(createElementVNode("div", _hoisted_2$j, [
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
    withDirectives(createElementVNode("div", _hoisted_3$g, [
      renderSlot(_ctx.$slots, "right", {}, void 0, true)
    ], 512), [
      [vShow, $data.rightShow]
    ])
  ], 44, _hoisted_1$l);
}
const SwipeCell = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$y], ["__scopeId", "data-v-1e12e6ca"]]);
SwipeCell.install = (app) => {
  app.component(SwipeCell.name, SwipeCell);
};
const circleProgress_vue_vue_type_style_index_0_scoped_e78a42ce_lang = "";
const _sfc_main$x = {
  name: "m-circle-progress",
  data() {
    return {
      pathSize: 1e3
    };
  },
  props: {
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
      let width = obj.element.rem2px(this.strokeWidth);
      return `0 0 ${this.pathSize + 2 * width} ${this.pathSize + 2 * width}`;
    },
    pathD() {
      let width = obj.element.rem2px(this.strokeWidth);
      return `M ${this.pathSize / 2 + width} ${this.pathSize / 2 + width} m 0, -${this.pathSize / 2} a ${this.pathSize / 2}, ${this.pathSize / 2} 0 1, ${this.clockWise ? 1 : 0} 0, ${this.pathSize} a ${this.pathSize / 2}, ${this.pathSize / 2} 0 1, ${this.clockWise ? 1 : 0} 0, -${this.pathSize}`;
    },
    cmpValue() {
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
      if (obj.number.isNumber(this.strokeWidth)) {
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
      if (obj.number.isNumber(this.strokeWidth)) {
        style.strokeWidth = this.strokeWidth + "rem";
      }
      return style;
    }
  }
};
const _hoisted_1$k = ["viewBox"];
const _hoisted_2$i = ["d"];
const _hoisted_3$f = ["d"];
const _hoisted_4$b = {
  key: 0,
  class: "mvi-circle-progress-tip"
};
const _hoisted_5$8 = ["textContent"];
function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "mvi-circle-progress",
    style: normalizeStyle($options.progressStyle)
  }, [
    (openBlock(), createElementBlock("svg", { viewBox: $options.viewBox }, [
      createElementVNode("path", {
        d: $options.pathD,
        style: normalizeStyle($options.trackStyle),
        class: "mvi-circle-progress-track"
      }, null, 12, _hoisted_2$i),
      createElementVNode("path", {
        d: $options.pathD,
        style: normalizeStyle($options.barStyle),
        class: "mvi-circle-progress-bar"
      }, null, 12, _hoisted_3$f)
    ], 8, _hoisted_1$k)),
    $props.showTip ? (openBlock(), createElementBlock("div", _hoisted_4$b, [
      _ctx.$slots.tip ? renderSlot(_ctx.$slots, "tip", {
        key: 0,
        value: $props.value
      }, void 0, true) : (openBlock(), createElementBlock("span", {
        key: 1,
        textContent: toDisplayString($options.cmpValue)
      }, null, 8, _hoisted_5$8))
    ])) : createCommentVNode("", true)
  ], 4);
}
const CircleProgress = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$x], ["__scopeId", "data-v-e78a42ce"]]);
CircleProgress.install = (app) => {
  app.component(CircleProgress.name, CircleProgress);
};
const collapse_vue_vue_type_style_index_0_scoped_b47c5bd1_lang = "";
const _sfc_main$w = {
  name: "m-collapse",
  data() {
    return {
      //存放collapse-item组件的数组
      children: []
    };
  },
  emits: ["update:modelValue", "before-slide-down", "slide-down", "before-slide-up", "slide-up"],
  props: {
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
  },
  provide() {
    return {
      collapse: this
    };
  }
};
const _hoisted_1$j = { class: "mvi-collapse" };
function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$j, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ]);
}
const Collapse = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$w], ["__scopeId", "data-v-b47c5bd1"]]);
Collapse.install = (app) => {
  app.component(Collapse.name, Collapse);
};
const transitionSlide_vue_vue_type_style_index_0_scoped_446676c7_lang = "";
const _sfc_main$v = {
  name: "m-transition-slide",
  data() {
    return {
      //初始就显示
      show: true,
      //记录的高度
      height: null,
      //初始不使用动画
      useAnimation: false,
      //透明度默认为0
      opacity: 0
    };
  },
  emits: ["before-slide-down", "slide-down", "before-slide-up", "slide-up"],
  props: {
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
  },
  watch: {
    expand(newValue) {
      this.show = newValue;
    }
  },
  mounted() {
    this.show = this.expand;
    if (this.show) {
      this.useAnimation = true;
      this.opacity = "";
    }
  },
  methods: {
    //元素显示前
    beforeEnter(el) {
      el.style.height = 0;
      el.style.transition = "height " + this.timeout + "ms linear";
      el.style.webkitTransition = "height " + this.timeout + "ms linear";
      this.$emit("before-slide-down", this.$el);
    },
    //元素显示时
    enter(el) {
      el.offsetWidth;
      el.style.height = this.height;
    },
    //元素显示后
    afterEnter(el) {
      el.style.transition = "";
      el.style.webkitTransition = "";
      el.style.height = "";
      this.$emit("slide-down", this.$el);
    },
    //元素隐藏之前
    beforeLeave(el) {
      if (!this.height) {
        this.height = obj.element.getCssStyle(el, "height");
      }
      el.style.height = this.height;
      if (this.useAnimation) {
        el.style.transition = "height " + this.timeout + "ms linear";
        el.style.webkitTransition = "height " + this.timeout + "ms linear";
        this.$emit("before-slide-up", this.$el);
      }
    },
    //元素隐藏时
    leave(el) {
      el.offsetWidth;
      el.style.height = 0;
    },
    //元素隐藏后
    afterLeave(el) {
      el.style.height = "";
      if (this.useAnimation) {
        el.style.transition = "";
        el.style.webkitTransition = "";
        this.$emit("slide-up", this.$el);
      } else {
        this.useAnimation = true;
        this.opacity = "";
      }
    }
  }
};
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
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
const TransitionSlide = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$v], ["__scopeId", "data-v-446676c7"]]);
TransitionSlide.install = (app) => {
  app.component(TransitionSlide.name, TransitionSlide);
};
const collapseItem_vue_vue_type_style_index_0_scoped_a25113d9_lang = "";
const _sfc_main$u = {
  name: "m-collapse-item",
  inject: ["collapse"],
  props: {
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
  },
  components: {
    Cell,
    TransitionSlide
  },
  setup() {
    const uid = getCurrentInstance().uid;
    return {
      uid
    };
  },
  computed: {
    //面板的序列
    index() {
      return this.collapse.children.findIndex((vm) => {
        return obj.common.equal(vm.uid, this.uid);
      });
    },
    //点击态
    cmpActive() {
      if (this.cmpDisabled) {
        return false;
      }
      return this.collapse.active;
    },
    //是否展开
    expand() {
      let flag = false;
      if (this.collapse.accordion) {
        if (this.collapse.modelValue === this.index) {
          flag = true;
        }
      } else {
        if (obj.number.isNumber(this.collapse.modelValue)) {
          if (this.collapse.modelValue === this.index) {
            flag = true;
          }
        } else if (Array.isArray(this.collapse.modelValue)) {
          if (this.collapse.modelValue.includes(this.index)) {
            flag = true;
          }
        }
      }
      return flag;
    },
    //是否禁用
    cmpDisabled() {
      return this.collapse.disabled || this.disabled;
    },
    //是否最后一个面板
    isLast() {
      return this.collapse.children.length == this.index + 1;
    }
  },
  created() {
    this.collapse.children.push(this);
  },
  methods: {
    //面板展开前触发
    beforeSlideDown() {
      this.collapse.$emit("before-slide-down", this.index);
    },
    //面板展开后触发
    slideDown() {
      this.collapse.$emit("slide-down", this.index);
    },
    //面板收起前触发
    beforeSlideUp() {
      this.collapse.$emit("before-slide-up", this.index);
    },
    //面板收起后触发
    slideUp() {
      this.collapse.$emit("slide-up", this.index);
    },
    //点击collapse-item
    changeCollapse() {
      if (this.cmpDisabled) {
        return false;
      }
      if (this.collapse.accordion) {
        if (this.collapse.modelValue == this.index) {
          this.collapse.$emit("update:modelValue", null);
        } else {
          this.collapse.$emit("update:modelValue", this.index);
        }
      } else {
        if (obj.number.isNumber(this.collapse.modelValue)) {
          if (this.collapse.modelValue == this.index) {
            this.collapse.$emit("update:modelValue", []);
          } else {
            this.collapse.$emit("update:modelValue", [this.collapse.modelValue, this.index]);
          }
        } else if (Array.isArray(this.collapse.modelValue)) {
          let arr = [...this.collapse.modelValue];
          if (arr.includes(this.index)) {
            arr = arr.filter((item) => {
              return item != this.index;
            });
            this.collapse.$emit("update:modelValue", arr);
          } else {
            arr.push(this.index);
            this.collapse.$emit("update:modelValue", arr);
          }
        } else {
          let arr = [];
          arr.push(this.index);
          this.collapse.$emit("update:modelValue", arr);
        }
      }
    }
  }
};
const _hoisted_1$i = ["disabled"];
const _hoisted_2$h = { class: "mvi-collapse-content" };
const _hoisted_3$e = ["textContent"];
function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Cell = resolveComponent("Cell");
  const _component_TransitionSlide = resolveComponent("TransitionSlide");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-collapse-item", $options.collapse.outBorder ? "border" : ""]),
    disabled: $options.cmpDisabled || null
  }, [
    createVNode(_component_Cell, {
      class: normalizeClass(["mvi-collapse-cell", $options.expand ? "expand" : ""]),
      icon: $props.icon,
      content: $props.label,
      title: $props.title,
      border: $options.collapse.inBorder,
      arrow: "angle-right",
      onClick: $options.changeCollapse,
      active: $options.cmpActive,
      "no-wrap": $options.collapse.noWrap
    }, null, 8, ["class", "icon", "content", "title", "border", "onClick", "active", "no-wrap"]),
    createVNode(_component_TransitionSlide, {
      expand: $options.expand,
      timeout: 200,
      onBeforeSlideUp: $options.beforeSlideUp,
      onSlideUp: $options.slideUp,
      onBeforeSlideDown: $options.beforeSlideDown,
      onSlideDown: $options.slideDown
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_2$h, [
          _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", {
            key: 1,
            textContent: toDisplayString($props.content)
          }, null, 8, _hoisted_3$e))
        ])
      ]),
      _: 3
    }, 8, ["expand", "onBeforeSlideUp", "onSlideUp", "onBeforeSlideDown", "onSlideDown"])
  ], 10, _hoisted_1$i);
}
const CollapseItem = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$u], ["__scopeId", "data-v-a25113d9"]]);
CollapseItem.install = (app) => {
  app.component(CollapseItem.name, CollapseItem);
};
const divider_vue_vue_type_style_index_0_scoped_1eeeb2dd_lang = "";
const _sfc_main$t = {
  name: "m-divider",
  props: {
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
  }
};
const _hoisted_1$h = {
  key: 0,
  class: "mvi-divider-center"
};
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-divider", $props.dashed ? "dashed" : ""])
  }, [
    createElementVNode("div", {
      class: "mvi-divider-left",
      style: normalizeStyle({ borderColor: $props.color || "" })
    }, null, 4),
    this.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_1$h, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ])) : createCommentVNode("", true),
    createElementVNode("div", {
      class: "mvi-divider-right",
      style: normalizeStyle({ borderColor: $props.color || "" })
    }, null, 4)
  ], 2);
}
const Divider = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$t], ["__scopeId", "data-v-1eeeb2dd"]]);
Divider.install = (app) => {
  app.component(Divider.name, Divider);
};
const roll_vue_vue_type_style_index_0_scoped_59345775_lang = "";
const _sfc_main$s = {
  name: "m-roll",
  data() {
    return {
      rollEl: null,
      timer: null,
      //0表示正在滚动，1表示暂停，2表示停止
      status: -1
    };
  },
  emits: ["play", "stop", "pause"],
  props: {
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
  },
  mounted() {
    this.rollEl = this.$refs.roll;
    if (this.autoplay) {
      this.play();
    }
  },
  computed: {
    //滚动元素style
    rollStyle() {
      let obj2 = {};
      if (this.direction == "left") {
        obj2.left = "100%";
        obj2.right = "auto";
      } else if (this.direction == "right") {
        obj2.right = "100%";
        obj2.left = "auto";
      } else if (this.direction == "up") {
        obj2.top = "100%";
        obj2.bottom = "auto";
      } else if (this.direction == "down") {
        obj2.bottom = "100%";
        obj2.top = "auto";
      }
      return obj2;
    },
    //容器style
    containerStyle() {
      let style = {};
      if (this.rollEl) {
        style.height = obj.element.getCssStyle(this.rollEl, "height");
      }
      return style;
    }
  },
  methods: {
    //鼠标进入
    hoverIn() {
      if (this.hoverStop) {
        if (this.status == 0) {
          this.pause();
        }
      }
    },
    //鼠标移出
    hoverOut() {
      if (this.hoverStop) {
        if (this.status == 1) {
          this.play();
        }
      }
    },
    //点击暂停
    clickStopFun() {
      if (this.clickStop) {
        if (this.status == 0) {
          this.pause();
        } else if (this.status == 1) {
          this.play();
        }
      }
    },
    //api：播放
    play() {
      if (!this.$refs.roll) {
        return;
      }
      if (this.status == 0) {
        return;
      }
      this.status = 0;
      let placement = obj.element.getElementPoint(this.$refs.roll, this.$el);
      let interval = 0;
      if (this.direction == "left") {
        interval = Math.round((placement.left + this.$refs.roll.offsetWidth) / (this.$el.offsetWidth + this.$refs.roll.offsetWidth) * this.interval);
      } else if (this.direction == "right") {
        interval = Math.round((placement.right + this.$refs.roll.offsetWidth) / (this.$el.offsetWidth + this.$refs.roll.offsetWidth) * this.interval);
      } else if (this.direction == "up") {
        interval = Math.round((placement.top + this.$refs.roll.offsetHeight) / (this.$el.offsetHeight + this.$refs.roll.offsetHeight) * this.interval);
      } else if (this.direction == "down") {
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
        } else if (this.direction == "up") {
          this.$refs.roll.style.top = -this.$refs.roll.offsetHeight + "px";
          this.$refs.roll.style.bottom = "auto";
        } else if (this.direction == "down") {
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
      }, 0);
    },
    //api：停止
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
      } else if (this.direction == "up") {
        this.$refs.roll.style.top = "100%";
        this.$refs.roll.style.bottom = "auto";
      } else if (this.direction == "down") {
        this.$refs.roll.style.bottom = "100%";
        this.$refs.roll.style.top = "auto";
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.$emit("stop");
    },
    //api：暂停
    pause() {
      if (this.status != 0) {
        return;
      }
      this.status = 1;
      let placement = obj.element.getElementPoint(this.$refs.roll, this.$el);
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
      } else if (this.direction == "up") {
        this.$refs.roll.style.top = placement.top + "px";
        this.$refs.roll.style.bottom = "auto";
      } else if (this.direction == "down") {
        this.$refs.roll.style.bottom = placement.bottom + "px";
        this.$refs.roll.style.top = "auto";
      }
      this.$emit("pause");
    }
  },
  beforeUnmount() {
    this.stop();
  }
};
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    onClick: _cache[0] || (_cache[0] = (...args) => $options.clickStopFun && $options.clickStopFun(...args)),
    onMouseenter: _cache[1] || (_cache[1] = (...args) => $options.hoverIn && $options.hoverIn(...args)),
    onMouseleave: _cache[2] || (_cache[2] = (...args) => $options.hoverOut && $options.hoverOut(...args)),
    class: "mvi-roll-container",
    style: normalizeStyle($options.containerStyle)
  }, [
    createElementVNode("div", {
      class: normalizeClass(["mvi-roll", $props.direction == "left" || $props.direction == "right" ? "horizontal" : "vertical", $props.center ? "center" : ""]),
      style: normalizeStyle($options.rollStyle),
      ref: "roll"
    }, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 6)
  ], 36);
}
const Roll = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$s], ["__scopeId", "data-v-59345775"]]);
Roll.install = (app) => {
  app.component(Roll.name, Roll);
};
const steps_vue_vue_type_style_index_0_scoped_c61b4376_lang = "";
const _sfc_main$r = {
  name: "m-steps",
  data() {
    return {
      //存放step组件的数组
      children: []
    };
  },
  props: {
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
  },
  provide() {
    return {
      steps: this
    };
  }
};
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-steps", $props.vertical ? "vertical" : ""])
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
const Steps = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r], ["__scopeId", "data-v-c61b4376"]]);
Steps.install = (app) => {
  app.component(Steps.name, Steps);
};
const step_vue_vue_type_style_index_0_scoped_0c19a341_lang = "";
const _sfc_main$q = {
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
    //转换图标
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj.common.isObject(param)) {
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
    //step在steps中的序列值
    stepIndex() {
      return this.steps.children.findIndex((vm) => {
        return obj.common.equal(vm.uid, this.uid);
      });
    },
    //label
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
        style.backgroundColor = obj.element.getCssStyle(this.steps.$el, "background-color");
      }
      return style;
    }
  },
  components: {
    Icon
  }
};
const _hoisted_1$g = {
  key: 0,
  class: "mvi-step-vertical"
};
const _hoisted_2$g = { class: "mvi-step-vertical-container" };
const _hoisted_3$d = { class: "mvi-step-vertical-icon" };
const _hoisted_4$a = { class: "mvi-step-container" };
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return $options.steps.vertical ? (openBlock(), createElementBlock("div", _hoisted_1$g, [
    createElementVNode("div", {
      class: normalizeClass(["mvi-step-vertical-label", $options.stepIndex == $options.steps.active ? "finish" : ""]),
      style: normalizeStyle($options.labelStyle)
    }, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 6),
    createElementVNode("div", _hoisted_2$g, [
      createElementVNode("div", _hoisted_3$d, [
        $options.steps.active == $options.stepIndex && ($options.parseIcon($options.steps.activeIcon).type || $options.parseIcon($options.steps.activeIcon).url) ? (openBlock(), createBlock(_component_Icon, {
          key: 0,
          class: "mvi-step-icon-active-el",
          type: $options.parseIcon($options.steps.activeIcon).type,
          url: $options.parseIcon($options.steps.activeIcon).url,
          spin: $options.parseIcon($options.steps.activeIcon).spin,
          size: $options.parseIcon($options.steps.activeIcon).size,
          color: $options.parseIcon($options.steps.activeIcon).color,
          style: normalizeStyle($options.activeIconStyle)
        }, null, 8, ["type", "url", "spin", "size", "color", "style"])) : $options.steps.active == $options.stepIndex ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "mvi-step-circle-active",
          style: normalizeStyle($options.activeCircleStyle)
        }, null, 4)) : $options.parseIcon($options.steps.inactiveIcon).type || $options.parseIcon($options.steps.inactiveIcon).url ? (openBlock(), createBlock(_component_Icon, {
          key: 2,
          class: normalizeClass(["mvi-step-icon-inactive-el", $options.stepIndex <= $options.steps.active ? "finish" : ""]),
          type: $options.parseIcon($options.steps.inactiveIcon).type,
          url: $options.parseIcon($options.steps.inactiveIcon).url,
          spin: $options.parseIcon($options.steps.inactiveIcon).spin,
          size: $options.parseIcon($options.steps.inactiveIcon).size,
          color: $options.parseIcon($options.steps.inactiveIcon).color,
          style: normalizeStyle($options.inactiveIconStyle)
        }, null, 8, ["class", "type", "url", "spin", "size", "color", "style"])) : (openBlock(), createElementBlock("div", {
          key: 3,
          class: normalizeClass(["mvi-step-circle", $options.stepIndex <= $options.steps.active ? "finish" : ""]),
          style: normalizeStyle($options.circleStyle)
        }, null, 6))
      ]),
      createElementVNode("div", {
        class: normalizeClass(["mvi-step-vertical-line", $options.stepIndex == $options.steps.children.length - 1 ? "last" : "", $options.stepIndex < $options.steps.active ? "finish" : ""]),
        style: normalizeStyle($options.lineStyle)
      }, null, 6)
    ])
  ])) : (openBlock(), createElementBlock("div", {
    key: 1,
    class: normalizeClass(["mvi-step", $options.stepIndex == $options.steps.children.length - 1 ? "last" : ""])
  }, [
    createElementVNode("div", {
      class: normalizeClass(["mvi-step-label", $options.stepIndex == $options.steps.children.length - 1 ? "last" : "", $options.stepIndex == 0 ? "first" : "", $options.stepIndex == $options.steps.active ? "finish" : ""]),
      style: normalizeStyle($options.labelStyle)
    }, [
      createElementVNode("div", null, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ], 6),
    createElementVNode("div", _hoisted_4$a, [
      createElementVNode("div", {
        class: normalizeClass(["mvi-step-icon", $options.stepIndex == $options.steps.children.length - 1 ? "last" : ""]),
        style: normalizeStyle($options.stepIconStyle)
      }, [
        $options.steps.active == $options.stepIndex && ($options.parseIcon($options.steps.activeIcon).type || $options.parseIcon($options.steps.activeIcon).url) ? (openBlock(), createBlock(_component_Icon, {
          key: 0,
          class: "mvi-step-icon-active-el",
          type: $options.parseIcon($options.steps.activeIcon).type,
          url: $options.parseIcon($options.steps.activeIcon).url,
          spin: $options.parseIcon($options.steps.activeIcon).spin,
          size: $options.parseIcon($options.steps.activeIcon).size,
          color: $options.parseIcon($options.steps.activeIcon).color,
          style: normalizeStyle($options.activeIconStyle)
        }, null, 8, ["type", "url", "spin", "size", "color", "style"])) : $options.steps.active == $options.stepIndex ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "mvi-step-circle-active",
          style: normalizeStyle($options.activeCircleStyle)
        }, null, 4)) : $options.parseIcon($options.steps.inactiveIcon).type || $options.parseIcon($options.steps.inactiveIcon).url ? (openBlock(), createBlock(_component_Icon, {
          key: 2,
          class: normalizeClass(["mvi-step-icon-inactive-el", $options.stepIndex <= $options.steps.active ? "finish" : ""]),
          type: $options.parseIcon($options.steps.inactiveIcon).type,
          url: $options.parseIcon($options.steps.inactiveIcon).url,
          spin: $options.parseIcon($options.steps.inactiveIcon).spin,
          size: $options.parseIcon($options.steps.inactiveIcon).size,
          color: $options.parseIcon($options.steps.inactiveIcon).color,
          style: normalizeStyle($options.inactiveIconStyle)
        }, null, 8, ["class", "type", "url", "spin", "size", "color", "style"])) : (openBlock(), createElementBlock("div", {
          key: 3,
          class: normalizeClass(["mvi-step-circle", $options.stepIndex <= $options.steps.active ? "finish" : ""]),
          style: normalizeStyle($options.circleStyle)
        }, null, 6))
      ], 6),
      createElementVNode("div", {
        class: normalizeClass(["mvi-step-line", $options.stepIndex == $options.steps.children.length - 1 ? "last" : "", $options.stepIndex < $options.steps.active ? "finish" : ""]),
        style: normalizeStyle($options.lineStyle)
      }, null, 6)
    ])
  ], 2));
}
const Step = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q], ["__scopeId", "data-v-0c19a341"]]);
Step.install = (app) => {
  app.component(Step.name, Step);
};
const label_vue_vue_type_style_index_0_scoped_bb5198b2_lang = "";
const _sfc_main$p = {
  name: "m-label",
  data() {
    return {
      show: true
    };
  },
  props: {
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
    //自定义颜色
    color: {
      type: String,
      default: null
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
    //文本颜色
    subColor: {
      type: String,
      default: null
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
  },
  computed: {
    labelClass() {
      let cls = ["mvi-label"];
      if (this.size) {
        cls.push(this.size);
      }
      if (this.type) {
        cls.push(this.type);
      }
      if (this.plain) {
        cls.push("plain");
      }
      if (this.round) {
        cls.push("round");
      }
      if (this.mark) {
        cls.push("mark");
        if (this.reverse) {
          cls.push("reverse");
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
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
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
const Label = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p], ["__scopeId", "data-v-bb5198b2"]]);
Label.install = (app) => {
  app.component(Label.name, Label);
};
const swiper_vue_vue_type_style_index_0_scoped_e6496088_lang = "";
const _sfc_main$o = {
  name: "m-swiper",
  provide() {
    return {
      swiper: this
    };
  },
  emits: ["before-change", "change"],
  data() {
    return {
      //组件元素
      elm: null,
      //强制更新slideSize的参数
      sizeCounts: 0,
      //slide子元素数组
      children: [],
      //每次更新的触摸点坐标
      start: 0,
      //初始的触摸点坐标
      initStart: 0,
      //平移值
      transform: 0,
      //计时器
      timer: null,
      //每次触摸的总位移量
      totalMove: 0,
      //非fade模式下记录被被激活的序列
      oldIndex: -1,
      //滑动系数
      amounts: 0,
      //是否鼠标按下
      mouseDown: false,
      //fade模式下被激活的序列
      fadeActiveIndex: 0,
      //fade模式下是否使用动画渐变
      useOpacity: true,
      //非fade模式下，是否正在使用api来改变轮播
      apiDoSlide: false
    };
  },
  props: {
    //是否自动轮播
    autoplay: {
      type: Boolean,
      default: false
    },
    //切换速度
    speed: {
      type: Number,
      default: 500
    },
    //自动轮播的时间间隔
    interval: {
      type: Number,
      default: 5e3
    },
    //初始轮播索引
    initialSlide: {
      type: Number,
      default: 0
    },
    //轮播宽度
    width: {
      type: String,
      default: null
    },
    //轮播高度
    height: {
      type: String,
      default: null
    },
    //是否循环
    loop: {
      type: Boolean,
      default: false
    },
    //是否显示指示器
    showIndicators: {
      type: Boolean,
      default: false
    },
    //指示器激活时的颜色
    activeColor: {
      type: String,
      default: null
    },
    //指示器未激活的颜色
    inactiveColor: {
      type: String,
      default: null
    },
    //是否为纵向轮播
    vertical: {
      type: Boolean,
      default: false
    },
    //是否可以通过手势滑动
    touchable: {
      type: Boolean,
      default: true
    },
    //是否显示上一张下一张控制器
    showControl: {
      type: Boolean,
      default: false
    },
    //是否使用渐变效果
    fade: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    //指示器样式
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
    //slide父容器层(非fade)
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
    //swiper容器层
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
    //slide宽度或者高度(非fade)
    slideSize() {
      this.sizeCounts;
      let width = 0;
      if (this.vertical) {
        if (this.height) {
          if (this.height.includes("rem")) {
            width = obj.element.rem2px(parseFloat(this.height));
          } else if (this.height.includes("px")) {
            width = parseFloat(this.height);
          } else if (this.elm) {
            width = parseFloat(obj.element.getCssStyle(this.elm, "height"));
          }
        } else if (this.elm) {
          width = parseFloat(obj.element.getCssStyle(this.elm, "height"));
        }
      } else {
        if (this.width) {
          if (this.width.includes("rem")) {
            width = obj.element.rem2px(parseFloat(this.width));
          } else if (this.width.includes("px")) {
            width = parseFloat(this.width);
          } else if (this.elm) {
            width = parseFloat(obj.element.getCssStyle(this.elm, "width"));
          }
        } else if (this.elm) {
          width = parseFloat(obj.element.getCssStyle(this.elm, "width"));
        }
      }
      return Number(width.toFixed(2));
    },
    //激活的轮播序列(非fade，数值从0开始，循环模式下包含复制的)
    activeIndex() {
      let index = 0;
      if (this.totalMove <= 0) {
        index = this.mathNext(Math.abs(obj.number.divide(this.transform, this.slideSize)));
      } else {
        index = this.mathPrev(Math.abs(obj.number.divide(this.transform, this.slideSize)));
      }
      if (index > this.children.length - 1) {
        index = this.children.length - 1;
      } else if (index < 0) {
        index = 0;
      }
      return index;
    },
    //激活的分页器索引(区分slide和fade，数值是从0开始)
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
    //初始化默认索引(非fade)
    cmpInitalSlide() {
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
    //控制器样式
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
    //是否显示具体的每个指示器(区分slide和fade)
    indicatorShow() {
      return (index) => {
        if (this.fade) {
          return true;
        }
        return this.loop ? index != 0 && index != this.children.length - 1 : true;
      };
    },
    //分页器总数
    indicatorsTotal() {
      if (this.fade) {
        return this.children.length;
      }
      if (this.loop) {
        return this.children.length - 2 > 0 ? this.children.length - 2 : 0;
      }
      return this.children.length;
    },
    //判断分页器是否激活
    isIndicatorActive() {
      return (index) => {
        if (this.fade) {
          return this.indicatorsIndex == index;
        }
        if (this.loop) {
          return this.indicatorsIndex + 1 == index;
        }
        return this.indicatorsIndex == index;
      };
    }
  },
  components: {
    Icon
  },
  watch: {
    autoplay() {
      this.setAutoplay();
    },
    initialSlide(newValue) {
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
      obj.event.on(document.documentElement, `mousemove.swiper_${this.uid}`, this.swiperMouseMove);
      obj.event.on(document.documentElement, `mouseup.swiper_${this.uid}`, this.swiperMouseUp);
    }
    obj.event.on(window, `resize.swiper_${this.uid}`, this.resizeChange);
  },
  methods: {
    //窗口大小变化时更新swiper
    resizeChange() {
      this.sizeCounts++;
      this.transform = -obj.number.mutiply(this.activeIndex, this.slideSize);
    },
    //设置计时器自动播放
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
    //触摸开始(非fade)
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
    //触摸移动(非fade)
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
          this.transform = obj.number.add(this.transform, obj.number.divide(move, this.amounts));
          this.start = end;
          return;
        }
      } else {
        if (this.transform <= -obj.number.mutiply(this.children.length - 1, this.slideSize)) {
          this.amounts++;
          this.transform = obj.number.add(this.transform, obj.number.divide(move, this.amounts));
          this.start = end;
          return;
        }
      }
      this.start = end;
      this.transform = obj.number.add(this.transform, move);
    },
    //触摸结束(非fade)
    swiperTouchEnd(event2) {
      if (this.children.length == 0) {
        return;
      }
      if (!this.touchable) {
        return;
      }
      this.addTransition().then(() => {
        this.transform = -obj.number.mutiply(this.activeIndex, this.slideSize);
        setTimeout(() => {
          this.slideDone();
        }, this.speed);
      });
    },
    //鼠标按下(非fade)
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
    //鼠标移动(非fade)
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
          this.transform = obj.number.add(this.transform, obj.number.divide(move, this.amounts));
          this.start = end;
          return;
        }
      } else {
        if (this.transform <= -obj.number.mutiply(this.children.length - 1, this.slideSize)) {
          this.amounts++;
          this.transform = obj.number.add(this.transform, obj.number.divide(move, this.amounts));
          this.start = end;
          return;
        }
      }
      this.start = end;
      this.transform = obj.number.add(this.transform, move);
    },
    //鼠标松开(非fade)
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
        this.transform = -obj.number.mutiply(this.activeIndex, this.slideSize);
        setTimeout(() => {
          this.slideDone();
        }, this.speed);
      });
    },
    //设置默认索引(非fade)
    setDefaultSlide() {
      if (this.children.length == 0) {
        return;
      }
      if (!this.fade) {
        if (!this.$refs.wrapper) {
          return;
        }
        this.removeTransition().then(() => {
          this.transform = -obj.number.mutiply(this.cmpInitalSlide, this.slideSize);
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
    //添加动画效果(非fade)
    addTransition() {
      return new Promise((resolve, reject) => {
        if (this.$refs.wrapper) {
          this.$refs.wrapper.style.transition = "transform " + this.speed + "ms";
          this.$refs.wrapper.style.webkitTransition = "transform " + this.speed + "ms";
        }
        setTimeout(() => {
          resolve();
        }, 10);
      });
    },
    //移除动画效果(非fade)
    removeTransition() {
      return new Promise((resolve, reject) => {
        if (this.$refs.wrapper) {
          this.$refs.wrapper.style.transition = "";
          this.$refs.wrapper.style.webkitTransition = "";
        }
        setTimeout(() => {
          resolve();
        }, 10);
      });
    },
    //滑动后处理(非fade)
    slideDone() {
      return new Promise((resolve, reject) => {
        if (this.loop) {
          if (this.transform == -obj.number.mutiply(this.children.length - 1, this.slideSize)) {
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
              this.transform = -obj.number.mutiply(this.children.length - 2, this.slideSize);
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
    //+1取整(非fade)
    mathNext(number2) {
      const num = Math.floor(number2);
      const floor = obj.number.subtract(number2, num);
      if (floor >= 0.25) {
        return num + 1;
      } else {
        return num;
      }
    },
    //-1取整(非fade)
    mathPrev(number2) {
      const num = Math.floor(number2);
      const floor = obj.number.subtract(number2, num);
      if (floor <= 0.75) {
        return num;
      } else {
        return num + 1;
      }
    },
    //api：跳转指定的slide(区分slide和fade)
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
              this.transform = obj.number.add(this.transform, obj.number.mutiply(this.oldIndex - index, this.slideSize));
              setTimeout(() => {
                this.slideDone().then(() => {
                  this.apiDoSlide = false;
                  resolve();
                });
              }, this.speed);
            });
          } else {
            if (this.transform <= -obj.number.mutiply(this.children.length - 1, this.slideSize)) {
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
              this.transform = obj.number.subtract(this.transform, obj.number.mutiply(index - this.oldIndex, this.slideSize));
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
    },
    //api：跳转到下一个轮播(区分slide和fade)
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
          if (this.transform <= -obj.number.mutiply(this.children.length - 1, this.slideSize)) {
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
            this.transform = obj.number.subtract(this.transform, this.slideSize);
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
    //api：跳转到上一个轮播(区分slide和fade)
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
            this.transform = obj.number.add(this.transform, this.slideSize);
            setTimeout(() => {
              this.slideDone().then(() => {
                this.apiDoSlide = false;
                resolve();
              });
            }, this.speed);
          });
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
      obj.event.off(document.documentElement, `mousemove.swiper_${this.uid} mouseup.swiper_${this.uid}`);
    }
    obj.event.off(window, `resize.swiper_${this.uid}`);
  }
};
const _hoisted_1$f = {
  key: 0,
  class: "mvi-swiper-fade"
};
const _hoisted_2$f = {
  key: 3,
  class: "mvi-swiper-indicators"
};
const _hoisted_3$c = ["onClick"];
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-swiper-container", $props.vertical ? "vertical" : ""]),
    style: normalizeStyle($options.containerStyle)
  }, [
    $props.fade ? (openBlock(), createElementBlock("div", _hoisted_1$f, [
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
    }, void 0, true) : $props.showIndicators ? (openBlock(), createElementBlock("div", _hoisted_2$f, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.children, (item, index) => {
        return openBlock(), createElementBlock(Fragment, null, [
          $options.indicatorShow(index) ? (openBlock(), createElementBlock("div", {
            class: normalizeClass(["mvi-swiper-indicator", $options.isIndicatorActive(index) ? "active" : ""]),
            style: normalizeStyle($options.indicatorStyle(index)),
            key: "indicator-" + index,
            onClick: ($event) => $options.slideTo($props.fade ? index : $props.loop ? index - 1 : index)
          }, null, 14, _hoisted_3$c)) : createCommentVNode("", true)
        ], 64);
      }), 256))
    ])) : createCommentVNode("", true),
    $props.showControl ? (openBlock(), createElementBlock("div", {
      key: 4,
      class: "mvi-swiper-control",
      style: normalizeStyle($options.controlStyle(0)),
      onClick: _cache[4] || (_cache[4] = (...args) => $options.slidePrev && $options.slidePrev(...args))
    }, [
      createVNode(_component_Icon, { type: "angle-left" })
    ], 4)) : createCommentVNode("", true),
    $props.showControl ? (openBlock(), createElementBlock("div", {
      key: 5,
      class: "mvi-swiper-control",
      style: normalizeStyle($options.controlStyle(1)),
      onClick: _cache[5] || (_cache[5] = (...args) => $options.slideNext && $options.slideNext(...args))
    }, [
      createVNode(_component_Icon, { type: "angle-right" })
    ], 4)) : createCommentVNode("", true)
  ], 6);
}
const Swiper = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o], ["__scopeId", "data-v-e6496088"]]);
Swiper.install = (app) => {
  app.component(Swiper.name, Swiper);
};
const swiperSlide_vue_vue_type_style_index_0_scoped_1cd4abbd_lang = "";
const _sfc_main$n = {
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
    //slide在swiper中的序列值
    slideIndex() {
      return this.swiper.children.findIndex((vm) => {
        return obj.common.equal(vm.uid, this.uid);
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
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
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
const SwiperSlide = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n], ["__scopeId", "data-v-1cd4abbd"]]);
SwiperSlide.install = (app) => {
  app.component(SwiperSlide.name, SwiperSlide);
};
const tabs_vue_vue_type_style_index_0_scoped_b7e3e17c_lang = "";
const _sfc_main$m = {
  name: "m-tabs",
  data() {
    return {
      //子tab实例数组
      children: [],
      //滑动条距离左边的距离
      slideLeft: 0,
      //滑动条宽度
      slideWidth: 0,
      //与active值一样，但区别在于active变化后节点更新后才会变化此值
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
      default: 200
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
  },
  computed: {
    sliderStyle() {
      let style = {};
      if (this.animation == "slide" || this.animation == "fade") {
        style.transition = "left " + this.timeout + "ms,width " + this.timeout + "ms";
        style.webkitTransition = "left " + this.timeout + "ms,width " + this.timeout + "ms";
      }
      if (this.activeColor) {
        style.background = this.activeColor;
      }
      style.width = this.slideWidth + "px";
      style.left = this.slideLeft + "px";
      return style;
    },
    headersStyle() {
      let style = {};
      if (this.flex && this.type == "default") {
        style.justifyContent = this.flex;
      }
      if (this.type == "card" && this.activeColor) {
        style.borderColor = this.activeColor;
      }
      return style;
    },
    headerClass() {
      return (item, index) => {
        let cls = ["mvi-tab-header"];
        if (this.modelValue == index) {
          cls.push("active");
        }
        if (this.ellipsis) {
          cls.push("ellipsis");
        }
        return cls;
      };
    },
    headerStyle() {
      return (item, index) => {
        let style = {};
        if (this.offset && index != 0 && this.type == "default") {
          style.marginLeft = this.offset;
        }
        if (this.activeColor) {
          style.borderColor = this.activeColor;
          if (this.modelValue == index) {
            if (this.type == "default") {
              style.color = this.activeColor;
            } else {
              style.background = this.activeColor;
            }
          }
        }
        style.maxWidth = `calc(100% / ${this.children.length})`;
        return style;
      };
    },
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj.common.isObject(param)) {
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
      this.setSlider();
    });
    this.setHeight();
    obj.event.on(window, `resize.tabs_${this.uid}`, this.setHeight);
  },
  methods: {
    //点击头部的标题
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
    //激活指定的tab
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
    //api：设置面板高度
    setHeight() {
      if (this.children[this.current] && this.$refs.content) {
        this.$refs.content.style.height = this.children[this.current].$el.offsetHeight + "px";
      }
    },
    //api：设置滑动条
    setSlider() {
      if (this.type == "card") {
        return;
      }
      if (!this.$refs.headers) {
        return;
      }
      this.slideWidth = parseFloat(obj.element.getCssStyle(this.$refs.headers.querySelector(".mvi-tab-header.active"), "width"));
      this.slideLeft = obj.element.getElementPoint(this.$refs.headers.querySelector(".mvi-tab-header.active"), this.$refs.headers).left;
    }
  },
  beforeUnmount() {
    obj.event.off(window, `resize.tabs_${this.uid}`);
  }
};
const _hoisted_1$e = { class: "mvi-tabs" };
const _hoisted_2$e = ["onClick", "disabled"];
const _hoisted_3$b = ["innerHTML"];
const _hoisted_4$9 = {
  class: "mvi-tabs-content",
  ref: "content"
};
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", _hoisted_1$e, [
    createElementVNode("div", {
      ref: "headers",
      class: normalizeClass(["mvi-tabs-header", $props.type == "card" ? "card" : "", $props.type == "default" && $props.border ? "border" : ""]),
      style: normalizeStyle($options.headersStyle)
    }, [
      $props.type == "default" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "mvi-tabs-slider",
        style: normalizeStyle($options.sliderStyle)
      }, null, 4)) : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.children, (item, index) => {
        return openBlock(), createElementBlock("div", {
          class: normalizeClass($options.headerClass(item, index)),
          onClick: ($event) => $options.clickHeader(item, index),
          style: normalizeStyle($options.headerStyle(item, index)),
          disabled: item.disabled || null
        }, [
          item.placement == "left" && ($options.parseIcon(item.icon).type || $options.parseIcon(item.icon).url) ? (openBlock(), createBlock(_component_Icon, {
            key: 0,
            class: normalizeClass(["mvi-tab-icon", item.title ? "left" : ""]),
            type: $options.parseIcon(item.icon).type,
            url: $options.parseIcon(item.icon).url,
            spin: $options.parseIcon(item.icon).spin,
            size: $options.parseIcon(item.icon).size,
            color: $options.parseIcon(item.icon).color
          }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
          item.title ? (openBlock(), createElementBlock("span", {
            key: 1,
            class: "mvi-tab-header-text",
            innerHTML: item.title
          }, null, 8, _hoisted_3$b)) : createCommentVNode("", true),
          item.placement == "right" && ($options.parseIcon(item.icon).type || $options.parseIcon(item.icon).url) ? (openBlock(), createBlock(_component_Icon, {
            key: 2,
            class: normalizeClass(["mvi-tab-icon", item.title ? "right" : ""]),
            type: $options.parseIcon(item.icon).type,
            url: $options.parseIcon(item.icon).url,
            spin: $options.parseIcon(item.icon).spin,
            size: $options.parseIcon(item.icon).size,
            color: $options.parseIcon(item.icon).color
          }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true)
        ], 14, _hoisted_2$e);
      }), 256))
    ], 6),
    createElementVNode("div", _hoisted_4$9, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 512)
  ]);
}
const Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m], ["__scopeId", "data-v-b7e3e17c"]]);
Tabs.install = (app) => {
  app.component(Tabs.name, Tabs);
};
const tab_vue_vue_type_style_index_0_scoped_f3fc1fea_lang = "";
const _sfc_main$l = {
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
      return style;
    },
    //tab在tabs中的序列值
    tabIndex() {
      return this.tabs.children.findIndex((vm) => {
        return obj.common.equal(vm.uid, this.uid);
      });
    }
  },
  unmounted() {
    this.tabs.children.splice(this.tabIndex, 1);
    if (this.tabs.modelValue > 0) {
      this.tabs.$emit("update:modelValue", this.tabs.modelValue - 1);
      this.tabs.$emit("change", this.tabs.modelValue - 1);
    } else {
      this.tabs.to(0, 0);
    }
  }
};
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
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
const Tab = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l], ["__scopeId", "data-v-f3fc1fea"]]);
Tab.install = (app) => {
  app.component(Tab.name, Tab);
};
const triangle_vue_vue_type_style_index_0_scoped_aa2239dc_lang = "";
const _sfc_main$k = {
  name: "m-triangle",
  props: {
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
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
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
const Triangle = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k], ["__scopeId", "data-v-aa2239dc"]]);
Triangle.install = (app) => {
  app.component(Triangle.name, Triangle);
};
const layer_vue_vue_type_style_index_0_scoped_c4075ea3_lang = "";
const _sfc_main$j = {
  name: "m-layer",
  data() {
    return {
      layerShow: false,
      firstShow: false,
      realPlacement: "bottom"
    };
  },
  emits: ["update:modelValue", "show", "showing", "shown", "hide", "hidding", "hidden"],
  inheritAttrs: false,
  props: {
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
  },
  components: {
    Triangle
  },
  watch: {
    placement() {
      this.update();
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
    //浮层dom
    $$el() {
      return this.$refs.layer;
    },
    //三角形位置
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
    //主体元素样式类
    wrapperClass() {
      let cls = ["mvi-layer-wrapper"];
      if (this.shadow) {
        cls.push("shadow");
      }
      if (this.border) {
        cls.push("border");
      }
      return cls;
    },
    //主体元素额外样式
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
    //浮层样式
    layerStyle() {
      let style = {};
      if (obj.number.isNumber(this.zIndex)) {
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
    this.handleScroll();
    obj.event.on(window, `resize.layer_${this.uid}`, this.update);
    obj.event.on(window, `click.layer_${this.uid}`, (event2) => {
      if (this.layerShow && this.firstShow && this.closable) {
        if (obj.element.isContains(this.$refs.layer, event2.target) || obj.element.isContains(this.getRelateEl(), event2.target)) {
          return;
        }
        this.$emit("update:modelValue", false);
      }
    });
  },
  methods: {
    //api：更新浮层位置
    update() {
      if (this.layerShow && this.firstShow) {
        this.autoAdjust();
        this.reset();
        this.$nextTick(() => {
          this.resetTriangle();
        });
      }
    },
    //监听滚动隐藏浮层
    handleScroll() {
      const handleScroll = (el) => {
        obj.event.on(el, `scroll.layer_${this.uid}`, () => {
          this.$emit("update:modelValue", false);
        });
        if (el.parentNode) {
          handleScroll(el.parentNode);
        }
      };
      const relate = this.getRelateEl();
      if (relate.parentNode) {
        handleScroll(relate.parentNode);
      }
    },
    //移除上述滚动事件的监听
    removeScroll() {
      const removeScroll = (el) => {
        obj.event.off(el, `scroll.layer_${this.uid}`);
        if (el.parentNode) {
          removeScroll(el.parentNode);
        }
      };
      const relate = this.getRelateEl();
      if (relate.parentNode) {
        removeScroll(relate.parentNode);
      }
    },
    //获取绑定的元素
    getRelateEl() {
      if (this.relate) {
        return document.body.querySelector(this.relate);
      }
      return null;
    },
    //悬浮层显示位置智能化
    autoAdjust() {
      let $relate = this.getRelateEl();
      let point = obj.element.getElementBounding($relate);
      this.realPlacement = this.placement;
      if (this.placement == "bottom") {
        if (point.bottom < this.$refs.layer.offsetHeight) {
          if (point.top > this.$refs.layer.offsetHeight) {
            this.realPlacement = "top";
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.left > this.$refs.layer.offsetWidth) {
            this.realPlacement = "left";
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.right > this.$refs.layer.offsetWidth) {
            this.realPlacement = "right";
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          }
        } else {
          if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
            this.realPlacement = "bottom-start";
          }
          if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
            this.realPlacement = "bottom-end";
          }
        }
      } else if (this.placement == "bottom-start") {
        if (point.bottom < this.$refs.layer.offsetHeight) {
          if (point.top > this.$refs.layer.offsetHeight) {
            this.realPlacement = "top-start";
            if (point.right + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
              this.realPlacement = "top";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.left > this.$refs.layer.offsetWidth) {
            this.realPlacement = "left";
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.right > this.$refs.layer.offsetWidth) {
            this.realPlacement = "right";
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          }
        } else {
          if (point.right + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
            this.realPlacement = "bottom";
          }
          if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
            this.realPlacement = "bottom-end";
          }
        }
      } else if (this.placement == "bottom-end") {
        if (point.bottom < this.$refs.layer.offsetHeight) {
          if (point.top > this.$refs.layer.offsetHeight) {
            this.realPlacement = "top-end";
            if (point.left + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
              this.realPlacement = "top";
            }
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
          } else if (point.left > this.$refs.layer.offsetWidth) {
            this.realPlacement = "left";
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.right > this.$refs.layer.offsetWidth) {
            this.realPlacement = "right";
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          }
        } else {
          if (point.left + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
            this.realPlacement = "bottom";
          }
          if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
            this.realPlacement = "bottom-start";
          }
        }
      } else if (this.placement == "top") {
        if (point.top < this.$refs.layer.offsetHeight) {
          if (point.bottom > this.$refs.layer.offsetHeight) {
            this.realPlacement = "bottom";
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          } else if (point.left > this.$refs.layer.offsetWidth) {
            this.realPlacement = "left";
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.right > this.$refs.layer.offsetWidth) {
            this.realPlacement = "right";
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          }
        } else {
          if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
            this.realPlacement = "top-start";
          }
          if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
            this.realPlacement = "top-end";
          }
        }
      } else if (this.placement == "top-start") {
        if (point.top < this.$refs.layer.offsetHeight) {
          if (point.bottom > this.$refs.layer.offsetHeight) {
            this.realPlacement = "bottom-start";
            if (point.right + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
              this.realPlacement = "bottom";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          } else if (point.left > this.$refs.layer.offsetWidth) {
            this.realPlacement = "left";
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.right > this.$refs.layer.offsetWidth) {
            this.realPlacement = "right";
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          }
        } else {
          if (point.right + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
            this.realPlacement = "top";
          }
          if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
            this.realPlacement = "top-end";
          }
        }
      } else if (this.placement == "top-end") {
        if (point.top < this.$refs.layer.offsetHeight) {
          if (point.bottom > this.$refs.layer.offsetHeight) {
            this.realPlacement = "bottom-end";
            if (point.left + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
              this.realPlacement = "bottom";
            }
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
          } else if (point.left > this.$refs.layer.offsetWidth) {
            this.realPlacement = "left";
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.right > this.$refs.layer.offsetWidth) {
            this.realPlacement = "right";
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          }
        } else {
          if (point.left + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
            this.realPlacement = "top";
          }
          if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
            this.realPlacement = "top-start";
          }
        }
      } else if (this.placement == "left") {
        if (point.left < this.$refs.layer.offsetWidth) {
          if (point.right > this.$refs.layer.offsetWidth) {
            this.realPlacement = "right";
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          } else if (point.top > this.$refs.layer.offsetHeight) {
            this.realPlacement = "top";
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.bottom > this.$refs.layer.offsetHeight) {
            this.realPlacement = "bottom";
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          }
        } else {
          if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
            this.realPlacement = "left-start";
          }
          if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
            this.realPlacement = "left-end";
          }
        }
      } else if (this.placement == "left-start") {
        if (point.left < this.$refs.layer.offsetWidth) {
          if (point.right > this.$refs.layer.offsetWidth) {
            this.realPlacement = "right-start";
            if (point.bottom + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
              this.realPlacement = "right";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-end";
            }
          } else if (point.top > this.$refs.layer.offsetHeight) {
            this.realPlacement = "top";
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.bottom > this.$refs.layer.offsetHeight) {
            this.realPlacement = "bottom";
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          }
        } else {
          if (point.bottom + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
            this.realPlacement = "left";
          }
          if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
            this.realPlacement = "left-end";
          }
        }
      } else if (this.placement == "left-end") {
        if (point.left < this.$refs.layer.offsetWidth) {
          if (point.right > this.$refs.layer.offsetWidth) {
            this.realPlacement = "right-end";
            if (point.top + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
              this.realPlacement = "right";
            }
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "right-start";
            }
          } else if (point.top > this.$refs.layer.offsetHeight) {
            this.realPlacement = "top";
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.bottom > this.$refs.layer.offsetHeight) {
            this.realPlacement = "bottom";
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          }
        } else {
          if (point.top + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
            this.realPlacement = "left";
          }
          if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
            this.realPlacement = "left-start";
          }
        }
      } else if (this.placement == "right") {
        if (point.right < this.$refs.layer.offsetWidth) {
          if (point.left > this.$refs.layer.offsetWidth) {
            this.realPlacement = "left";
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.top > this.$refs.layer.offsetHeight) {
            this.realPlacement = "top";
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.bottom > this.$refs.layer.offsetHeight) {
            this.realPlacement = "bottom";
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          }
        } else {
          if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
            this.realPlacement = "right-start";
          }
          if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
            this.realPlacement = "right-end";
          }
        }
      } else if (this.placement == "right-start") {
        if (point.right < this.$refs.layer.offsetWidth) {
          if (point.left > this.$refs.layer.offsetWidth) {
            this.realPlacement = "left-start";
            if (point.bottom + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
              this.realPlacement = "left";
            }
            if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-end";
            }
          } else if (point.top > this.$refs.layer.offsetHeight) {
            this.realPlacement = "top";
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.bottom > this.$refs.layer.offsetHeight) {
            this.realPlacement = "bottom";
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          }
        } else {
          if (point.bottom + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
            this.realPlacement = "right";
          }
          if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
            this.realPlacement = "right-end";
          }
        }
      } else if (this.placement == "right-end") {
        if (point.right < this.$refs.layer.offsetWidth) {
          if (point.left > this.$refs.layer.offsetWidth) {
            this.realPlacement = "left-end";
            if (point.top + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
              this.realPlacement = "left";
            }
            if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
              this.realPlacement = "left-start";
            }
          } else if (point.top > this.$refs.layer.offsetHeight) {
            this.realPlacement = "top";
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-start";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "top-end";
            }
          } else if (point.bottom > this.$refs.layer.offsetHeight) {
            this.realPlacement = "bottom";
            if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-start";
            }
            if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
              this.realPlacement = "bottom-end";
            }
          }
        } else {
          if (point.top + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
            this.realPlacement = "right";
          }
          if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
            this.realPlacement = "right-start";
          }
        }
      }
    },
    //重置位置
    reset() {
      if (!obj.element.isElement(this.$refs.layer)) {
        return;
      }
      if (this.showTriangle) {
        this.$refs.layer.style.padding = 0;
        if (this.realPlacement == "bottom-start" || this.realPlacement == "bottom" || this.realPlacement == "bottom-end") {
          this.$refs.layer.style.paddingTop = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetHeight}px)`;
        } else if (this.realPlacement == "top-start" || this.realPlacement == "top" || this.realPlacement == "top-end") {
          this.$refs.layer.style.paddingBottom = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetHeight}px)`;
        } else if (this.realPlacement == "left-start" || this.realPlacement == "left" || this.realPlacement == "left-end") {
          this.$refs.layer.style.paddingRight = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetWidth}px)`;
        } else if (this.realPlacement == "right-start" || this.realPlacement == "right" || this.realPlacement == "right-end") {
          this.$refs.layer.style.paddingLeft = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetWidth}px)`;
        }
      }
      const $relate = this.getRelateEl();
      const rect = obj.element.getElementBounding($relate);
      if (this.realPlacement == "bottom" || this.realPlacement == "bottom-start" || this.realPlacement == "bottom-end") {
        this.$refs.layer.style.top = rect.top + $relate.offsetHeight + "px";
        this.$refs.layer.style.bottom = "auto";
        if (this.realPlacement == "bottom") {
          this.$refs.layer.style.left = rect.left + $relate.offsetWidth / 2 - this.$refs.layer.offsetWidth / 2 + "px";
          this.$refs.layer.style.right = "auto";
        } else if (this.realPlacement == "bottom-start") {
          this.$refs.layer.style.left = rect.left + "px";
          this.$refs.layer.style.right = "auto";
        } else if (this.realPlacement == "bottom-end") {
          this.$refs.layer.style.left = "auto";
          this.$refs.layer.style.right = rect.right + "px";
        }
      } else if (this.realPlacement == "top" || this.realPlacement == "top-start" || this.realPlacement == "top-end") {
        this.$refs.layer.style.top = "auto";
        this.$refs.layer.style.bottom = rect.bottom + $relate.offsetHeight + "px";
        if (this.realPlacement == "top") {
          this.$refs.layer.style.left = rect.left + $relate.offsetWidth / 2 - this.$refs.layer.offsetWidth / 2 + "px";
          this.$refs.layer.style.right = "auto";
        } else if (this.realPlacement == "top-start") {
          this.$refs.layer.style.left = rect.left + "px";
          this.$refs.layer.style.right = "auto";
        } else if (this.realPlacement == "top-end") {
          this.$refs.layer.style.left = "auto";
          this.$refs.layer.style.right = rect.right + "px";
        }
      } else if (this.realPlacement == "left" || this.realPlacement == "left-start" || this.realPlacement == "left-end") {
        this.$refs.layer.style.left = "auto";
        this.$refs.layer.style.right = rect.right + $relate.offsetWidth + "px";
        if (this.realPlacement == "left") {
          this.$refs.layer.style.top = rect.top + $relate.offsetHeight / 2 - this.$refs.layer.offsetHeight / 2 + "px";
          this.$refs.layer.style.bottom = "auto";
        } else if (this.realPlacement == "left-start") {
          this.$refs.layer.style.top = rect.top + "px";
          this.$refs.layer.style.bottom = "auto";
        } else if (this.realPlacement == "left-end") {
          this.$refs.layer.style.top = "auto";
          this.$refs.layer.style.bottom = rect.bottom + "px";
        }
      } else if (this.realPlacement == "right" || this.realPlacement == "right-start" || this.realPlacement == "right-end") {
        this.$refs.layer.style.left = rect.left + $relate.offsetWidth + "px";
        this.$refs.layer.style.right = "auto";
        if (this.realPlacement == "right") {
          this.$refs.layer.style.top = rect.top + $relate.offsetHeight / 2 - this.$refs.layer.offsetHeight / 2 + "px";
          this.$refs.layer.style.bottom = "auto";
        } else if (this.realPlacement == "right-start") {
          this.$refs.layer.style.top = rect.top + "px";
          this.$refs.layer.style.bottom = "auto";
        } else if (this.realPlacement == "right-end") {
          this.$refs.layer.style.top = "auto";
          this.$refs.layer.style.bottom = rect.bottom + "px";
        }
      }
    },
    //重置三角位置
    resetTriangle() {
      if (!this.showTriangle || this.$refs.triangle && !this.$refs.triangle.$el) {
        return;
      }
      const relateWidth = this.getRelateEl().offsetWidth;
      const elWidth = this.$refs.layer.offsetWidth;
      const relateHeight = this.getRelateEl().offsetHeight;
      const elHeight = this.$refs.layer.offsetHeight;
      const triWidth = this.$refs.triangle.$el.offsetWidth;
      const triHeight = this.$refs.triangle.$el.offsetHeight;
      if (this.realPlacement == "bottom-start") {
        this.$refs.triangle.$el.style.top = "auto";
        this.$refs.triangle.$el.style.right = "auto";
        this.$refs.triangle.$el.style.bottom = "100%";
        this.$refs.triangle.$el.style.left = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + "px";
      } else if (this.realPlacement == "bottom") {
        this.$refs.triangle.$el.style.top = "auto";
        this.$refs.triangle.$el.style.right = "auto";
        this.$refs.triangle.$el.style.bottom = "100%";
        this.$refs.triangle.$el.style.left = elWidth / 2 - triWidth / 2 + "px";
      } else if (this.realPlacement == "bottom-end") {
        this.$refs.triangle.$el.style.top = "auto";
        this.$refs.triangle.$el.style.left = "auto";
        this.$refs.triangle.$el.style.bottom = "100%";
        this.$refs.triangle.$el.style.right = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + "px";
      } else if (this.realPlacement == "top-start") {
        this.$refs.triangle.$el.style.top = "100%";
        this.$refs.triangle.$el.style.right = "auto";
        this.$refs.triangle.$el.style.bottom = "auto";
        this.$refs.triangle.$el.style.left = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + "px";
      } else if (this.realPlacement == "top") {
        this.$refs.triangle.$el.style.top = "100%";
        this.$refs.triangle.$el.style.right = "auto";
        this.$refs.triangle.$el.style.bottom = "auto";
        this.$refs.triangle.$el.style.left = elWidth / 2 - triWidth / 2 + "px";
      } else if (this.realPlacement == "top-end") {
        this.$refs.triangle.$el.style.top = "100%";
        this.$refs.triangle.$el.style.left = "auto";
        this.$refs.triangle.$el.style.bottom = "auto";
        this.$refs.triangle.$el.style.right = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + "px";
      } else if (this.realPlacement == "left-start") {
        this.$refs.triangle.$el.style.left = "100%";
        this.$refs.triangle.$el.style.right = "auto";
        this.$refs.triangle.$el.style.top = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + "px";
        this.$refs.triangle.$el.style.bottom = "auto";
      } else if (this.realPlacement == "left") {
        this.$refs.triangle.$el.style.left = "100%";
        this.$refs.triangle.$el.style.right = "auto";
        this.$refs.triangle.$el.style.top = elHeight / 2 - triHeight / 2 + "px";
        this.$refs.triangle.$el.style.bottom = "auto";
      } else if (this.realPlacement == "left-end") {
        this.$refs.triangle.$el.style.left = "100%";
        this.$refs.triangle.$el.style.right = "auto";
        this.$refs.triangle.$el.style.bottom = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + "px";
        this.$refs.triangle.$el.style.top = "auto";
      } else if (this.realPlacement == "right-start") {
        this.$refs.triangle.$el.style.right = "100%";
        this.$refs.triangle.$el.style.left = "auto";
        this.$refs.triangle.$el.style.top = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + "px";
        this.$refs.triangle.$el.style.bottom = "auto";
      } else if (this.realPlacement == "right") {
        this.$refs.triangle.$el.style.right = "100%";
        this.$refs.triangle.$el.style.left = "auto";
        this.$refs.triangle.$el.style.top = elHeight / 2 - triHeight / 2 + "px";
        this.$refs.triangle.$el.style.bottom = "auto";
      } else if (this.realPlacement == "right-end") {
        this.$refs.triangle.$el.style.right = "100%";
        this.$refs.triangle.$el.style.left = "auto";
        this.$refs.triangle.$el.style.bottom = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + "px";
        this.$refs.triangle.$el.style.top = "auto";
      }
    },
    //悬浮层显示前
    beforeEnter(el) {
      if (obj.data.get(el, "mvi-layer-beforeEnter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-layer-beforeEnter-trigger", true);
      this.$emit("show", el);
      if (typeof this.layerComponentWatch == "function") {
        this.layerComponentWatch.apply(this, ["show", el]);
      }
    },
    //悬浮层显示时
    enter(el) {
      if (obj.data.get(el, "mvi-layer-enter-trigger")) {
        return;
      }
      obj.data.set(el, "mvi-layer-enter-trigger", true);
      this.$nextTick(() => {
        this.update();
        this.$emit("showing", el);
        if (typeof this.layerComponentWatch == "function") {
          this.layerComponentWatch.apply(this, ["showing", el]);
        }
      });
    },
    //悬浮层显示后
    afterEnter(el) {
      this.$emit("shown", el);
      if (typeof this.layerComponentWatch == "function") {
        this.layerComponentWatch.apply(this, ["shown", el]);
      }
    },
    //悬浮层隐藏前
    beforeLeave(el) {
      obj.data.remove(el, "mvi-layer-beforeEnter-trigger");
      obj.data.remove(el, "mvi-layer-enter-trigger");
      this.$emit("hide", el);
      if (typeof this.layerComponentWatch == "function") {
        this.layerComponentWatch.apply(this, ["hide", el]);
      }
    },
    //悬浮层隐藏时
    leave(el) {
      this.$emit("hidding", el);
      if (typeof this.layerComponentWatch == "function") {
        this.layerComponentWatch.apply(this, ["hidding", el]);
      }
    },
    //悬浮层隐藏后
    afterLeave(el) {
      this.$emit("hidden", el);
      if (typeof this.layerComponentWatch == "function") {
        this.layerComponentWatch.apply(this, ["hidden", el]);
      }
    }
  },
  beforeUnmount() {
    this.removeScroll();
    obj.event.off(window, `resize.layer_${this.uid} click.layer_${this.uid}`);
  }
};
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Triangle = resolveComponent("Triangle");
  return openBlock(), createBlock(Teleport, { to: "body" }, [
    createVNode(Transition, {
      name: $props.animation || "mvi-layer",
      onBeforeEnter: $options.beforeEnter,
      onEnter: $options.enter,
      onAfterEnter: $options.afterEnter,
      onLeave: $options.leave,
      onBeforeLeave: $options.beforeLeave,
      onAfterLeave: $options.afterLeave
    }, {
      default: withCtx(() => [
        $data.firstShow ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
          key: 0,
          ref: "layer",
          class: "mvi-layer",
          style: $options.layerStyle
        }, _ctx.$attrs), [
          createElementVNode("div", {
            class: normalizeClass($options.wrapperClass),
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
        ], 16)), [
          [vShow, $data.layerShow]
        ]) : createCommentVNode("", true)
      ]),
      _: 3
    }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onLeave", "onBeforeLeave", "onAfterLeave"])
  ]);
}
const Layer = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j], ["__scopeId", "data-v-c4075ea3"]]);
Layer.install = (app) => {
  app.component(Layer.name, Layer);
};
const tooltip_vue_vue_type_style_index_0_scoped_678d28fa_lang = "";
const tooltip_vue_vue_type_style_index_1_lang = "";
const _sfc_main$i = {
  name: "m-tooltip",
  data() {
    return {
      show: false
    };
  },
  props: {
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
    //鼠标进入显示
    hoverShowTooltip() {
      if (this.trigger == "hover") {
        this.showTooltip();
      }
    },
    //鼠标移出隐藏
    hoverHideToolTip() {
      if (this.trigger == "hover") {
        this.hideTooltip();
      }
    },
    //点击显示工具提示
    clickShowTooltip() {
      if (this.trigger === "click") {
        if (this.show) {
          this.hideTooltip();
        } else {
          this.showTooltip();
        }
      }
    },
    //api：显示
    showTooltip() {
      if (this.disabled) {
        return;
      }
      this.show = true;
    },
    //api：隐藏
    hideTooltip() {
      if (this.disabled) {
        return;
      }
      this.show = false;
    }
  }
};
const _hoisted_1$c = ["data-id"];
const _hoisted_2$c = ["textContent"];
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Layer = resolveComponent("Layer");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-tooltip", $props.block ? "block" : ""])
  }, [
    createElementVNode("div", {
      onClick: _cache[0] || (_cache[0] = (...args) => $options.clickShowTooltip && $options.clickShowTooltip(...args)),
      onMouseenter: _cache[1] || (_cache[1] = (...args) => $options.hoverShowTooltip && $options.hoverShowTooltip(...args)),
      onMouseleave: _cache[2] || (_cache[2] = (...args) => $options.hoverHideToolTip && $options.hoverHideToolTip(...args)),
      class: "mvi-tooltip-toggle",
      ref: "toggle",
      "data-id": "mvi-tooltip-relate-" + $setup.uid
    }, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 40, _hoisted_1$c),
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
      relate: `[data-id='mvi-tooltip-relate-${$setup.uid}']`,
      placement: $props.placement,
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
          }, null, 8, _hoisted_2$c))
        ], 4)
      ]),
      _: 3
    }, 8, ["modelValue", "offset", "background", "border-color", "show-triangle", "z-index", "relate", "placement", "width", "timeout", "animation"])
  ], 2);
}
const Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i], ["__scopeId", "data-v-678d28fa"]]);
Tooltip.install = (app) => {
  app.component(Tooltip.name, Tooltip);
};
const table_vue_vue_type_style_index_0_scoped_b8b8e7c8_lang = "";
const _sfc_main$h = {
  name: "m-table",
  emits: ["check", "sort-cancel", "sort-asc", "sort-desc"],
  props: {
    //表格数据
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    //表格列配置：包括type(selection/custom/default)/label/prop/width/className/hidden/sortable/format/selectable/sortMethod/ellipsis
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
      type: Function
    },
    //主题色
    activeColor: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      //刷新表格列对齐的字段
      columnAlignKey: 0,
      //表格数据
      rowData: [],
      //列数据
      columnData: [],
      //表格滚动条宽度
      scrollWidth: 0,
      //排序的字段，即依据此字段排序
      sortBy: "",
      //排序方式，asc还是desc
      sortOrder: "",
      //复选框勾选的行
      checkedRows: [],
      //是否全选
      selectAll: false,
      //表头列元素数组
      headerColumnRefs: []
    };
  },
  computed: {
    //表格整体宽度
    wrapWidth() {
      this.columnAlignKey;
      if (this.headerColumnRefs.length) {
        let width = this.headerColumnRefs.reduce((total, item, index) => {
          const width2 = this.columnData[index].width ? this.parseWidth(this.columnData[index].width) : obj.element.rem2px(2);
          return total += width2;
        }, 0);
        if (this.scrollWidth) {
          width += this.scrollWidth;
        }
        const tableWidth = obj.element.width(this.$el);
        return width > tableWidth ? width + "px" : tableWidth + "px";
      }
      return "";
    },
    //表头列class
    headerColumnClass() {
      let cls = [];
      if (this.columnBorder) {
        cls.push("border");
      }
      return cls;
    },
    //表头列样式
    headerColumnStyle() {
      return (column) => {
        return {
          width: column.width ? this.parseWidth(column.width) + "px" : "auto"
        };
      };
    },
    //表主体列class
    bodyColumnClass() {
      return (row, rowIndex, column, columnIndex) => {
        let cls = [];
        if (this.columnBorder) {
          cls.push("border");
        }
        if (column.className) {
          cls.push(column.className);
        }
        if (typeof this.cellClass == "function") {
          cls.push(this.cellClass.apply(this, [row, rowIndex, column, columnIndex]) || "");
        }
        return cls;
      };
    },
    //表主体列的宽度设置
    bodyColumnStyle() {
      return (column, index) => {
        this.columnAlignKey;
        return {
          width: this.headerColumnRefs[index] ? obj.element.getCssStyle(this.headerColumnRefs[index], "width") : ""
        };
      };
    },
    //排序图标激活时设置主题色
    sortIconStyle() {
      return (sortOrder, column) => {
        let style = {};
        if (this.sortBy == column.prop && this.sortOrder == sortOrder) {
          style.color = this.activeColor || "";
        }
        return style;
      };
    },
    //格式化单元格显示的数据
    dataFormat() {
      return (row, column) => {
        if (typeof column.format == "function") {
          return column.format.apply(this, [row[column.prop], row, column]) || "";
        }
        return row[column.prop] ? row[column.prop] + "" : "";
      };
    },
    //判断某一行复选框是否可以使用
    cmpSelectable() {
      return (row, rowIndex, column) => {
        if (typeof column.selectable == "function") {
          return column.selectable.apply(this, [row, rowIndex]);
        }
        return true;
      };
    },
    //工具提示内容
    tooltipTitle() {
      return (row, column) => {
        const dom = obj.element.string2dom(`<div>${this.dataFormat(row, column)}</div>`);
        return dom.innerText;
      };
    }
  },
  components: {
    Loading,
    Icon,
    Checkbox,
    Tooltip
  },
  watch: {
    //监听data更新rowData
    data: {
      immediate: true,
      handler: function(newVal) {
        this.rowData = this.deepClone(newVal);
        this.$nextTick(() => {
          this.doLayout();
        });
      }
    },
    //监听columns更新columnData
    columns: {
      immediate: true,
      handler: function(newVal) {
        this.columnData = this.deepClone(newVal).filter((column) => {
          return !column.hidden;
        });
      }
    },
    //监听height属性
    height: {
      immediate: true,
      handler: function() {
        this.$nextTick(() => {
          this.doLayout();
        });
      }
    }
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  mounted() {
    this.doLayout();
    obj.event.on(window, `resize.table_${this.uid}`, (e) => {
      this.doLayout();
    });
  },
  methods: {
    //设置表格列对齐
    doLayout() {
      this.scrollWidth = this.getScrollWidth();
      this.$nextTick(() => {
        this.columnAlignKey++;
      });
    },
    //单个复选框勾选
    doCheck(rowIndex, column) {
      if (this.checkedRows.length == this.rowData.filter((item, index) => {
        return this.cmpSelectable(item, index, column);
      }).length) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
      this.$emit("check", this.checkedRows, rowIndex);
    },
    //复选框全选
    allSelect(column) {
      if (this.selectAll) {
        this.checkedRows = [];
        for (let i = 0; i < this.rowData.length; i++) {
          if (this.cmpSelectable(this.rowData[i], i, column)) {
            this.checkedRows.push(i);
          }
        }
      } else {
        this.checkedRows = [];
      }
      this.$emit("check", this.checkedRows);
    },
    //升序排序
    sortAsc(column) {
      if (this.sortBy == column.prop && this.sortOrder == "asc") {
        this.sortBy = "";
        this.sortOrder = "";
        if (typeof column.sortMethod == "function") {
          column.sortMethod.apply(this, [this.sortOrder, this.sortBy, this.rowData, column]);
        } else {
          this.rowData = this.deepClone(this.data);
          this.$emit("sort-cancel", this.rowData);
        }
      } else {
        this.sortBy = column.prop;
        this.sortOrder = "asc";
        if (typeof column.sortMethod == "function") {
          column.sortMethod.apply(this, [this.sortOrder, this.sortBy, this.rowData, column]);
        } else {
          this.rowData = this.rowData.sort(function(rowA, rowB) {
            if (obj.number.isNumber(rowA[column.prop]) && obj.number.isNumber(rowB[column.prop])) {
              return rowA[column.prop] - rowB[column.prop];
            }
            return rowA[column.prop].toString().localeCompare(rowB[column.prop].toString(), "zh-CN");
          });
          this.$emit("sort-asc", this.rowData);
        }
      }
    },
    //降序排序
    sortDesc(column) {
      if (this.sortBy == column.prop && this.sortOrder == "desc") {
        this.sortBy = "";
        this.sortOrder = "";
        if (typeof column.sortMethod == "function") {
          column.sortMethod.apply(this, [this.sortOrder, this.sortBy, this.rowData, column]);
        } else {
          this.rowData = this.deepClone(this.data);
          this.$emit("sort-cancel", this.rowData);
        }
      } else {
        this.sortBy = column.prop;
        this.sortOrder = "desc";
        if (typeof column.sortMethod == "function") {
          column.sortMethod.apply(this, [this.sortOrder, this.sortBy, this.rowData, column]);
        } else {
          this.rowData = this.rowData.sort(function(rowA, rowB) {
            if (obj.number.isNumber(rowA[column.prop]) && obj.number.isNumber(rowB[column.prop])) {
              return rowB[column.prop] - rowA[column.prop];
            }
            return -rowA[column.prop].toString().localeCompare(rowB[column.prop].toString(), "zh-CN");
          });
          this.$emit("sort-desc", this.rowData);
        }
      }
    },
    //获取表格主体滚动条宽度
    getScrollWidth() {
      return this.$refs.body.offsetWidth - this.$refs.body.clientWidth;
    },
    //深拷贝数据
    deepClone(data2) {
      if (Array.isArray(data2)) {
        return data2.map((item) => {
          return this.deepClone(item);
        });
      }
      if (obj.common.isObject(data2)) {
        let cloneData = {};
        for (let key in data2) {
          cloneData[key] = this.deepClone(data2[key]);
        }
        return cloneData;
      }
      return data2;
    },
    //列宽数值转换
    parseWidth(val) {
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
    }
  },
  beforeUnmount() {
    obj.event.off(window, `resize.table_${this.uid}`);
  }
};
const _hoisted_1$b = { class: "mvi-table-header" };
const _hoisted_2$b = {
  cellpadding: "0",
  cellspacing: "0"
};
const _hoisted_3$a = {
  key: 0,
  class: "mvi-table-sortable"
};
const _hoisted_4$8 = {
  key: 0,
  class: "mvi-table-loading"
};
const _hoisted_5$7 = {
  key: 0,
  cellpadding: "0",
  cellspacing: "0"
};
const _hoisted_6$6 = { class: "mvi-table-column" };
const _hoisted_7$6 = ["innerHTML"];
const _hoisted_8$4 = {
  key: 1,
  class: "mvi-table-nodata"
};
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Checkbox = resolveComponent("Checkbox");
  const _component_Icon = resolveComponent("Icon");
  const _component_Loading = resolveComponent("Loading");
  const _component_Tooltip = resolveComponent("Tooltip");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-table", $props.border ? "border" : ""])
  }, [
    createElementVNode("div", {
      class: "mvi-table-wrap",
      style: normalizeStyle({ width: $options.wrapWidth })
    }, [
      createElementVNode("div", _hoisted_1$b, [
        createElementVNode("table", _hoisted_2$b, [
          createElementVNode("tr", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.columnData, (column, index) => {
              return openBlock(), createElementBlock("th", {
                ref_for: true,
                ref: (el) => $data.headerColumnRefs[index] = el,
                class: normalizeClass($options.headerColumnClass),
                style: normalizeStyle($options.headerColumnStyle(column))
              }, [
                createElementVNode("div", {
                  class: normalizeClass(["mvi-table-column", $props.center ? "center" : ""])
                }, [
                  column.type == "selection" ? (openBlock(), createBlock(_component_Checkbox, {
                    key: 0,
                    modelValue: $data.selectAll,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.selectAll = $event),
                    size: "0.24rem",
                    onChange: ($event) => $options.allSelect(column),
                    color: $props.activeColor
                  }, null, 8, ["modelValue", "onChange", "color"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createElementVNode("span", null, toDisplayString(column.label), 1),
                    column.sortable ? (openBlock(), createElementBlock("span", _hoisted_3$a, [
                      createVNode(_component_Icon, {
                        type: "caret-up",
                        class: normalizeClass($data.sortBy == column.prop && $data.sortOrder == "asc" ? "active" : ""),
                        onClick: ($event) => $options.sortAsc(column),
                        style: normalizeStyle($options.sortIconStyle("asc", column))
                      }, null, 8, ["class", "onClick", "style"]),
                      createVNode(_component_Icon, {
                        type: "caret-down",
                        class: normalizeClass($data.sortBy == column.prop && $data.sortOrder == "desc" ? "active" : ""),
                        onClick: ($event) => $options.sortDesc(column),
                        style: normalizeStyle($options.sortIconStyle("desc", column))
                      }, null, 8, ["class", "onClick", "style"])
                    ])) : createCommentVNode("", true)
                  ], 64))
                ], 2)
              ], 6);
            }), 256)),
            $data.scrollWidth ? (openBlock(), createElementBlock("th", {
              key: 0,
              class: "placeholder",
              style: normalizeStyle({ width: $data.scrollWidth + "px" })
            }, null, 4)) : createCommentVNode("", true)
          ])
        ])
      ]),
      createElementVNode("div", {
        ref: "body",
        class: normalizeClass(["mvi-table-body", $props.height ? "overflow" : ""]),
        style: normalizeStyle({ maxHeight: $props.height })
      }, [
        $props.loading ? (openBlock(), createElementBlock("div", _hoisted_4$8, [
          createVNode(_component_Loading, {
            color: "#bbb",
            size: "0.3rem"
          }),
          createElementVNode("span", null, toDisplayString($props.loadText), 1)
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          $data.rowData.length ? (openBlock(), createElementBlock("table", _hoisted_5$7, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.rowData, (row, rowIndex) => {
              return openBlock(), createElementBlock("tr", {
                class: normalizeClass($props.stripe ? "stripe" : "")
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList($data.columnData, (column, columnIndex) => {
                  return openBlock(), createElementBlock("td", {
                    class: normalizeClass($options.bodyColumnClass(row, rowIndex, column, columnIndex)),
                    style: normalizeStyle($options.bodyColumnStyle(column, columnIndex))
                  }, [
                    createElementVNode("div", _hoisted_6$6, [
                      column.type == "selection" ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        class: normalizeClass(["mvi-table-column-item", $props.center ? "center" : ""])
                      }, [
                        createVNode(_component_Checkbox, {
                          modelValue: $data.checkedRows,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.checkedRows = $event),
                          value: rowIndex,
                          size: "0.24rem",
                          onChange: ($event) => $options.doCheck(rowIndex, column),
                          color: $props.activeColor,
                          disabled: !$options.cmpSelectable(row, rowIndex, column)
                        }, null, 8, ["modelValue", "value", "onChange", "color", "disabled"])
                      ], 2)) : column.type == "custom" && _ctx.$slots.custom ? (openBlock(), createElementBlock("div", {
                        key: 1,
                        class: normalizeClass(["mvi-table-column-item", $props.center ? "center" : ""])
                      }, [
                        renderSlot(_ctx.$slots, "custom", {
                          row,
                          rowIndex,
                          column,
                          columnIndex
                        }, void 0, true)
                      ], 2)) : (openBlock(), createBlock(_component_Tooltip, {
                        key: 2,
                        class: "mvi-table-column-tooltip",
                        disabled: !column.ellipsis || !$options.tooltipTitle(row, column),
                        block: "",
                        title: $options.tooltipTitle(row, column),
                        trigger: "hover",
                        placement: $props.center ? "bottom" : "bottom-start"
                      }, {
                        default: withCtx(() => [
                          createElementVNode("div", {
                            class: normalizeClass(["mvi-table-column-item", $props.center ? "center" : ""])
                          }, [
                            createElementVNode("div", {
                              innerHTML: $options.dataFormat(row, column),
                              class: normalizeClass([column.ellipsis ? "ellipsis" : ""])
                            }, null, 10, _hoisted_7$6)
                          ], 2)
                        ]),
                        _: 2
                      }, 1032, ["disabled", "title", "placement"]))
                    ])
                  ], 6);
                }), 256))
              ], 2);
            }), 256))
          ])) : (openBlock(), createElementBlock("div", _hoisted_8$4, toDisplayString($props.noDataMsg), 1))
        ], 64))
      ], 6)
    ], 4)
  ], 2);
}
const Table = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__scopeId", "data-v-b8b8e7c8"]]);
Table.install = (app) => {
  app.component(Table.name, Table);
};
const calendar_vue_vue_type_style_index_0_scoped_be2c7756_lang = "";
const _sfc_main$g = {
  name: "m-calendar",
  emits: ["update:modelValue", "date-click", "month-click", "year-click"],
  props: {
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
  },
  computed: {
    //显示在年份面板上的年数组
    years() {
      let arr = [];
      const year = this.modelValue.getFullYear();
      const startYear = this.startDate.getFullYear();
      let index = Math.floor((year - startYear) / 12);
      for (let i = startYear + index * 12; i < startYear + index * 12 + 12; i++) {
        arr.push(dayjs(this.modelValue).year(i).toDate());
      }
      return arr;
    },
    //显示在月份面板上的月数组
    months() {
      let arr = [];
      for (let i = 0; i < 12; i++) {
        arr.push(dayjs(this.modelValue).month(i).toDate());
      }
      return arr;
    },
    //显示在日期面板上的日期数组
    days() {
      let total = dayjs(this.modelValue).daysInMonth();
      let arr = [];
      for (let i = 1; i <= total; i++) {
        arr.push({
          date: dayjs(`${dayjs(this.modelValue).format("YYYY-MM")}-${i < 10 ? "0" + i : i}`).toDate(),
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
    },
    //指定年份值是否禁用
    yearDisabled() {
      return (date) => {
        return dayjs(date).isBefore(dayjs(this.startDate), "year") || dayjs(date).isAfter(dayjs(this.endDate), "year");
      };
    },
    //指定月份值是否禁用
    monthDisabled() {
      return (date) => {
        return dayjs(date).isBefore(dayjs(this.startDate), "month") || dayjs(date).isAfter(dayjs(this.endDate), "month");
      };
    },
    //指定日期值是否禁用
    dateDisabled() {
      return (item) => {
        return dayjs(item.date).isBefore(dayjs(this.startDate), "date") || dayjs(item.date).isAfter(dayjs(this.endDate), "date");
      };
    },
    //年视图下每个年数值的样式
    yearClass() {
      return (date) => {
        let arr = ["mvi-calendar-year-item", this.type];
        if (this.yearDisabled(date)) {
          return arr;
        }
        if (this.active) {
          arr.push("active");
        }
        if (dayjs().isSame(dayjs(date), "year")) {
          arr.push("now");
        }
        if (dayjs(this.modelValue).isSame(dayjs(date), "year")) {
          arr.push("current");
        }
        return arr;
      };
    },
    //月视图下每个月数值的样式
    monthClass() {
      return (date) => {
        let arr = ["mvi-calendar-month-item", this.type];
        if (this.monthDisabled(date)) {
          return arr;
        }
        if (this.active) {
          arr.push("active");
        }
        if (dayjs().isSame(dayjs(date), "month")) {
          arr.push("now");
        }
        if (dayjs(this.modelValue).isSame(dayjs(date), "month")) {
          arr.push("current");
        }
        return arr;
      };
    },
    //日期视图下每个日期数值的样式
    dateClass() {
      return (item) => {
        let arr = ["mvi-calendar-date-item", this.type];
        if (this.dateDisabled(item)) {
          return arr;
        }
        if (item.nonCurrent) {
          arr.push("none-current");
          if (this.nonCurrentClick) {
            arr.push("allowed");
            if (this.active) {
              arr.push("active");
            }
          }
        } else {
          if (this.active) {
            arr.push("active");
          }
          if (dayjs().isSame(dayjs(item.date), "date")) {
            arr.push("now");
          }
          if (dayjs(this.modelValue).isSame(dayjs(item.date), "date")) {
            arr.push("current");
          }
        }
        return arr;
      };
    }
  },
  methods: {
    //年份点击
    yearClick(date) {
      if (this.yearDisabled(date)) {
        return;
      }
      this.$emit("update:modelValue", date);
      this.$emit("year-click", date);
    },
    //月份点击
    monthClick(date) {
      if (this.monthDisabled(date)) {
        return;
      }
      this.$emit("update:modelValue", date);
      this.$emit("month-click", date);
    },
    //日期点击
    dateClick(item) {
      if (this.dateDisabled(item)) {
        return;
      }
      if (item.nonCurrent && !this.nonCurrentClick) {
        return;
      }
      this.$emit("update:modelValue", item.date);
      this.$emit("date-click", item.date);
    }
  }
};
const _hoisted_1$a = { class: "mvi-calendar" };
const _hoisted_2$a = { class: "mvi-calendar-years" };
const _hoisted_3$9 = { class: "mvi-calendar-year" };
const _hoisted_4$7 = ["disabled", "onClick"];
const _hoisted_5$6 = { class: "mvi-calendar-months" };
const _hoisted_6$5 = { class: "mvi-calendar-month" };
const _hoisted_7$5 = ["disabled", "onClick"];
const _hoisted_8$3 = {
  key: 2,
  class: "mvi-calendar-date"
};
const _hoisted_9$2 = { class: "mvi-calendar-date-header" };
const _hoisted_10$2 = { class: "mvi-calendar-date-header-item" };
const _hoisted_11$1 = { class: "mvi-calendar-date-body" };
const _hoisted_12$1 = { class: "mvi-calendar-date-row" };
const _hoisted_13$1 = { class: "mvi-calendar-date-column" };
const _hoisted_14$1 = ["disabled", "onClick"];
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$a, [
    $props.view == "year" ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(new Array(3), (item, index) => {
      return openBlock(), createElementBlock("div", _hoisted_2$a, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.years.slice(index * 4, index * 4 + 4), (el) => {
          return openBlock(), createElementBlock("div", _hoisted_3$9, [
            createElementVNode("div", {
              class: normalizeClass($options.yearClass(el)),
              disabled: $options.yearDisabled(el) || null,
              onClick: ($event) => $options.yearClick(el)
            }, toDisplayString(el.getFullYear()), 11, _hoisted_4$7)
          ]);
        }), 256))
      ]);
    }), 256)) : $props.view == "month" ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(new Array(3), (item, index) => {
      return openBlock(), createElementBlock("div", _hoisted_5$6, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.months.slice(index * 4, index * 4 + 4), (el) => {
          return openBlock(), createElementBlock("div", _hoisted_6$5, [
            createElementVNode("div", {
              class: normalizeClass($options.monthClass(el)),
              disabled: $options.monthDisabled(el) || null,
              onClick: ($event) => $options.monthClick(el)
            }, toDisplayString($props.monthText[el.getMonth()]), 11, _hoisted_7$5)
          ]);
        }), 256))
      ]);
    }), 256)) : $props.view == "date" ? (openBlock(), createElementBlock("div", _hoisted_8$3, [
      createElementVNode("div", _hoisted_9$2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.weekText, (item) => {
          return openBlock(), createElementBlock("div", _hoisted_10$2, toDisplayString(item), 1);
        }), 256))
      ]),
      createElementVNode("div", _hoisted_11$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(new Array(6), (item, index) => {
          return openBlock(), createElementBlock("div", _hoisted_12$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($options.days.slice(index * 7, index * 7 + 7), (el, i) => {
              return openBlock(), createElementBlock("div", _hoisted_13$1, [
                createElementVNode("div", {
                  class: normalizeClass($options.dateClass(el)),
                  disabled: $options.dateDisabled(el) || null,
                  onClick: ($event) => $options.dateClick(el)
                }, toDisplayString(el.date.getDate()), 11, _hoisted_14$1)
              ]);
            }), 256))
          ]);
        }), 256))
      ])
    ])) : createCommentVNode("", true)
  ]);
}
const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__scopeId", "data-v-be2c7756"]]);
Calendar.install = (app) => {
  app.component(Calendar.name, Calendar);
};
const colorPicker_vue_vue_type_style_index_0_scoped_2743107c_lang = "";
const _sfc_main$f = {
  name: "m-color-picker",
  data() {
    return {
      //色相、饱和度和明度
      hsv: [0, 0, 0],
      //透明度
      opacity: 1,
      //是否拖动或者点击引起的值变化
      updateByDrag: false,
      //是否在拖动
      dragging: false,
      //面板高度对象
      heightObj: null,
      //面板拖拽对象
      dragObj: null
    };
  },
  emits: ["update:modelValue", "change"],
  components: {
    Slider
  },
  props: {
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
  },
  computed: {
    //饱和度和明度面板背景色
    panelStyle() {
      const rgbValue = obj.color.hsv2rgb([this.hsv[0], 100, 100]);
      return {
        background: `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`
      };
    },
    //透明度进度条滑轨颜色
    alphaTrackColor() {
      const rgbValue = obj.color.hsv2rgb(this.hsv);
      return `linear-gradient(to right, transparent 0%, rgb(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]}) 100%)`;
    }
  },
  watch: {
    //颜色值变化更新选取器滑块位置
    modelValue() {
      this.initHSV();
      this.setSliderPlacement();
    }
  },
  created() {
    this.initHSV();
  },
  mounted() {
    this.setPanelHeight();
    this.setPanelDrag();
    this.setSliderPlacement();
  },
  methods: {
    //初始化
    initHSV() {
      if (this.updateByDrag) {
        return;
      }
      if (this.modelValue && obj.common.matchingText(this.modelValue, "hex")) {
        const rgbValue = obj.color.hex2rgb(this.modelValue);
        this.hsv = obj.color.rgb2hsv(rgbValue);
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
          const rgbValue = [Number(arry[0]), Number(arry[1]), Number(arry[2])];
          this.hsv = obj.color.rgb2hsv(rgbValue);
          this.opacity = arry.length == 4 ? Number(arry[3]) : 1;
        } catch (e) {
          throw new Error("Color values are not RGB (RGBA) format and hexadecimal format");
        }
      }
    },
    //设置面板高度
    setPanelHeight() {
      if (this.heightObj) {
        return;
      }
      this.heightObj = new Prop$1(this.$refs.panel, 0.7);
      this.heightObj.init();
    },
    //设置面板拖拽
    setPanelDrag() {
      if (this.dragObj) {
        return;
      }
      this.dragObj = new Drag$1(this.$refs.slider, {
        container: this.$refs.panel,
        mode: "on",
        draggableX: true,
        draggableY: true,
        cursor: false,
        beforeDrag: () => {
          this.updateByDrag = true;
          this.dragging = true;
        },
        drag: () => {
          const placement = obj.element.getElementPoint(this.$refs.slider, this.$refs.panel);
          this.hsv[1] = (placement.left + this.$refs.slider.offsetWidth / 2) / this.$refs.panel.offsetWidth * 100;
          this.hsv[2] = (1 - (placement.top + this.$refs.slider.offsetHeight / 2) / this.$refs.panel.offsetHeight) * 100;
          this.setValue();
        },
        dragged: () => {
          this.updateByDrag = false;
          this.$nextTick(() => {
            setTimeout(() => {
              this.dragging = false;
            }, 10);
          });
        }
      });
      this.dragObj.init();
    },
    //设置面板上的拖拽点位置
    setSliderPlacement() {
      this.$refs.slider.style.left = this.hsv[1] / 100 * this.$refs.panel.offsetWidth - this.$refs.slider.offsetWidth / 2 + "px";
      this.$refs.slider.style.top = (1 - this.hsv[2] / 100) * this.$refs.panel.offsetHeight - this.$refs.slider.offsetHeight / 2 + "px";
    },
    //更新选取的颜色值
    setValue() {
      const rgbValue = obj.color.hsv2rgb(this.hsv);
      if (this.opacity == 1) {
        const val = `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`;
        this.$emit("update:modelValue", val);
        this.$emit("change", val);
      } else {
        const val = `rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]},${Number(this.opacity.toFixed(2))})`;
        this.$emit("update:modelValue", val);
        this.$emit("change", val);
      }
    },
    //点击明度和饱和度面板直接设置颜色
    clickPanelSetColor(e) {
      if (this.dragging) {
        return;
      }
      this.updateByDrag = true;
      this.$refs.slider.style.left = e.offsetX - this.$refs.slider.offsetWidth / 2 + "px";
      this.$refs.slider.style.top = e.offsetY - this.$refs.slider.offsetHeight / 2 + "px";
      const placement = obj.element.getElementPoint(this.$refs.slider, this.$refs.panel);
      this.hsv[1] = (placement.left + this.$refs.slider.offsetWidth / 2) / this.$refs.panel.offsetWidth * 100;
      this.hsv[2] = (1 - (placement.top + this.$refs.slider.offsetHeight / 2) / this.$refs.panel.offsetHeight) * 100;
      this.setValue();
    }
  },
  beforeUnmount() {
    if (this.dragObj) {
      this.dragObj.destroy();
    }
    if (this.heightObj) {
      this.heightObj.destroy();
    }
  }
};
const _withScopeId$2 = (n) => (pushScopeId("data-v-2743107c"), n = n(), popScopeId(), n);
const _hoisted_1$9 = { class: "mvi-color-picker" };
const _hoisted_2$9 = {
  class: "mvi-color-picker-panel-slider",
  ref: "slider"
};
const _hoisted_3$8 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("div", { class: "mvi-color-picker-slider" }, null, -1));
const _hoisted_4$6 = {
  key: 0,
  class: "mvi-color-picker-alpha"
};
const _hoisted_5$5 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("div", { class: "mvi-color-picker-slider" }, null, -1));
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Slider = resolveComponent("Slider");
  return openBlock(), createElementBlock("div", _hoisted_1$9, [
    createElementVNode("div", {
      class: "mvi-color-picker-panel",
      ref: "panel",
      style: normalizeStyle($options.panelStyle),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.clickPanelSetColor && $options.clickPanelSetColor(...args))
    }, [
      createElementVNode("div", _hoisted_2$9, null, 512)
    ], 4),
    createVNode(_component_Slider, {
      modelValue: $data.hsv[0],
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.hsv[0] = $event),
      min: 0,
      max: 360,
      "stroke-width": "0.3rem",
      square: "",
      "track-color": "linear-gradient(to right, #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%)",
      color: "transparent",
      onChange: $options.setValue
    }, {
      button: withCtx(() => [
        _hoisted_3$8
      ]),
      _: 1
    }, 8, ["modelValue", "onChange"]),
    $props.showAlpha ? (openBlock(), createElementBlock("div", _hoisted_4$6, [
      createVNode(_component_Slider, {
        modelValue: $data.opacity,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.opacity = $event),
        min: 0,
        max: 1,
        "stroke-width": "0.3rem",
        square: "",
        "track-color": $options.alphaTrackColor,
        color: "transparent",
        onChange: $options.setValue
      }, {
        button: withCtx(() => [
          _hoisted_5$5
        ]),
        _: 1
      }, 8, ["modelValue", "track-color", "onChange"])
    ])) : createCommentVNode("", true)
  ]);
}
const ColorPicker = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-2743107c"]]);
ColorPicker.install = (app) => {
  app.component(ColorPicker.name, ColorPicker);
};
const richImage_vue_vue_type_style_index_0_scoped_a4afd322_lang = "";
const _sfc_main$e = {
  name: "m-rich-image",
  data() {
    return {
      //是否双指触摸
      isDoubleTouch: false,
      //双指触点距离
      touchDistance: 0,
      //缩放比例
      scale: 1,
      //水平偏移值
      translateX: 0,
      //垂直偏移值
      translateY: 0,
      //鼠标在图片上按下时的横坐标
      startX: 0,
      //鼠标在图片上按下时的纵坐标
      startY: 0,
      //图片是否可以移动
      canMove: false,
      //鼠标按下坐标点
      downPoint: null,
      //鼠标松开坐标点
      upPoint: null,
      //触摸松开时是否触发了双指操作
      isTriggerDouble: false,
      //双指松开设置的延时器
      timer: null,
      //旋转值
      rotate: 0
    };
  },
  props: {
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
  },
  emits: ["close-preview", "disable-swiper-touch", "enable-swiper-touch"],
  components: {
    Image: Image$1
  },
  computed: {
    //图片样式
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
    obj.event.on(document.documentElement, `mousemove.richImage_${this.uid}`, this.imageMouseMove);
    obj.event.on(document.documentElement, `mouseup.richImage_${this.uid}`, this.imageMouseUp);
  },
  methods: {
    //左旋转图片
    leftRotate() {
      this.translateX = 0;
      this.translateY = 0;
      this.scale = 1;
      this.rotate -= 90;
    },
    //右旋转图片
    rightRotate() {
      this.translateX = 0;
      this.translateY = 0;
      this.scale = 1;
      this.rotate += 90;
    },
    //放大图片
    scalePlus() {
      if (this.scale < this.maxScale) {
        this.translateX = 0;
        this.translateY = 0;
        this.scale = obj.number.add(this.scale, 0.1);
      }
    },
    //缩小图片
    scaleMinus() {
      if (this.scale > this.minScale) {
        this.translateX = 0;
        this.translateY = 0;
        this.scale = obj.number.subtract(this.scale, 0.1);
      }
    },
    //滚轮缩放图片
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
    //双指缩放图片
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
              this.scale = obj.number.add(this.scale, obj.number.divide(obj.number.subtract(distance, this.touchDistance), this.$el.offsetWidth));
            }
          } else {
            if (this.scale < this.maxScale) {
              this.translateX = 0;
              this.translateY = 0;
              this.scale = obj.number.add(this.scale, obj.number.divide(obj.number.subtract(distance, this.touchDistance), this.$el.offsetWidth));
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
    //获取两点间距离
    getDistance(p1, p2) {
      let x = p2.pageX - p1.pageX;
      let y = p2.pageY - p1.pageY;
      return Math.sqrt(x * x + y * y);
    },
    //重置
    reset() {
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;
      this.rotate = 0;
      this.enableSwiperTouch();
    },
    //判断是否执行关闭操作
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
    //关闭遮罩层
    closePreview() {
      if (this.downPoint && this.upPoint && this.downPoint.x == this.upPoint.x && this.downPoint.y == this.upPoint.y) {
        this.$emit("close-preview");
      }
    },
    //图片上鼠标按下
    imageMouseDown(event2) {
      if (this.scale <= 1) {
        return;
      }
      this.disableSwiperTouch();
      this.startX = event2.pageX;
      this.startY = event2.pageY;
      this.canMove = true;
    },
    //图片上鼠标移动
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
    //图片上鼠标松开
    imageMouseUp(event2) {
      if (this.canMove) {
        this.imageTranslateEnd();
      }
    },
    //动画偏移
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
    //图片平移函数
    imageTranslate(endX, endY) {
      let moveX = obj.number.divide(endX - this.startX, 2);
      let moveY = obj.number.divide(endY - this.startY, 2);
      const placement = obj.element.getElementBounding(this.$refs.img.$el);
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
    //图片平移结束函数
    imageTranslateEnd() {
      const placement = obj.element.getElementBounding(this.$refs.img.$el);
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
    //禁用轮播图触摸滑动
    disableSwiperTouch() {
      clearTimeout(this.timer);
      this.$emit("disable-swiper-touch");
    },
    //启用轮播图触摸滑动
    enableSwiperTouch() {
      this.timer = setTimeout(() => {
        this.$emit("enable-swiper-touch");
      }, 100);
    }
  },
  beforeUnmount() {
    obj.event.off(document.documentElement, `mousemove.richImage_${this.uid} mouseup.richImage_${this.uid}`);
  }
};
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
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
const RichImage = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__scopeId", "data-v-a4afd322"]]);
const imagePreview_vue_vue_type_style_index_0_scoped_9e2aa247_lang = "";
const _sfc_main$d = {
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
    //是否显示页码
    showPage: {
      type: Boolean,
      default: true
    },
    //z-index值
    zIndex: {
      type: Number,
      default: 5e3
    },
    //是否使用渐变
    fade: {
      type: Boolean,
      default: false
    },
    //是否显示控制器
    showControl: {
      type: Boolean,
      default: false
    },
    //局部显示是否考虑滚动条影响
    usePadding: {
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
    //是否使用图片工具栏
    useTools: {
      type: Boolean,
      default: false
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
  },
  computed: {
    $$el() {
      return this.$refs.overlay.$$el;
    },
    show: {
      set(value) {
        this.$emit("update:modelValue", value);
      },
      get() {
        return this.modelValue;
      }
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
    //重置图片
    resetImage(active) {
      var _a;
      (_a = this.imageRefs[active]) == null ? void 0 : _a.reset();
    },
    //放大图片
    plusImage(active) {
      var _a;
      (_a = this.imageRefs[active]) == null ? void 0 : _a.scalePlus();
    },
    //缩小图片
    minusImage(active) {
      var _a;
      (_a = this.imageRefs[active]) == null ? void 0 : _a.scaleMinus();
    },
    //左旋转图片
    leftRotateImage(active) {
      var _a;
      (_a = this.imageRefs[active]) == null ? void 0 : _a.leftRotate();
    },
    //右旋转图片
    rightRotateImage(active) {
      var _a;
      (_a = this.imageRefs[active]) == null ? void 0 : _a.rightRotate();
    },
    //遮罩层显示时
    overlayShowing() {
      if (!this.firstShow) {
        this.firstShow = true;
      }
    },
    //关闭遮罩
    closeOverlay(e) {
      for (let richImage of this.imageRefs) {
        richImage == null ? void 0 : richImage.reset();
      }
      this.show = false;
    },
    //图片变更
    swiperChange(active) {
      for (let richImage of this.imageRefs) {
        richImage == null ? void 0 : richImage.reset();
      }
      this.$emit("change", active);
    }
  }
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-9e2aa247"), n = n(), popScopeId(), n);
const _hoisted_1$8 = {
  key: 0,
  class: "mvi-image-preview-page"
};
const _hoisted_2$8 = { key: 1 };
const _hoisted_3$7 = ["textContent"];
const _hoisted_4$5 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("span", null, "/", -1));
const _hoisted_5$4 = ["textContent"];
const _hoisted_6$4 = {
  key: 1,
  class: "mvi-image-preview-footer"
};
const _hoisted_7$4 = {
  key: 0,
  class: "mvi-image-preview-tools"
};
const _hoisted_8$2 = ["textContent"];
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_RichImage = resolveComponent("RichImage");
  const _component_SwiperSlide = resolveComponent("SwiperSlide");
  const _component_Icon = resolveComponent("Icon");
  const _component_Swiper = resolveComponent("Swiper");
  const _component_Overlay = resolveComponent("Overlay");
  return openBlock(), createBlock(_component_Overlay, {
    ref: "overlay",
    modelValue: $options.show,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $options.show = $event),
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
        touchable: $data.enableTouch
      }, {
        indicators: withCtx((data2) => [
          $props.showPage ? (openBlock(), createElementBlock("div", _hoisted_1$8, [
            _ctx.$slots.page ? renderSlot(_ctx.$slots, "page", {
              key: 0,
              total: data2.total,
              current: data2.active
            }, void 0, true) : (openBlock(), createElementBlock("div", _hoisted_2$8, [
              createElementVNode("span", {
                textContent: toDisplayString(data2.active + 1)
              }, null, 8, _hoisted_3$7),
              _hoisted_4$5,
              createElementVNode("span", {
                textContent: toDisplayString(data2.total)
              }, null, 8, _hoisted_5$4)
            ]))
          ])) : createCommentVNode("", true),
          $props.useTools || _ctx.$slots.descriptions || $props.descriptions.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_6$4, [
            $props.useTools ? (openBlock(), createElementBlock("div", _hoisted_7$4, [
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
              }, null, 8, _hoisted_8$2)) : createCommentVNode("", true)
            ], 2)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ]),
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.images, (item, index) => {
            return openBlock(), createBlock(_component_SwiperSlide, { class: "mvi-preview-container" }, {
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
          }), 256))
        ]),
        _: 3
      }, 8, ["initial-slide", "onChange", "show-control", "fade", "touchable"])) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["modelValue", "onShowing", "z-index", "use-padding", "mountEl"]);
}
const ImagePreview = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__scopeId", "data-v-9e2aa247"]]);
ImagePreview.install = (app) => {
  app.component(ImagePreview.name, ImagePreview);
};
const page_vue_vue_type_style_index_0_scoped_cd55b2ae_lang = "";
const _sfc_main$c = {
  name: "m-page",
  data() {
    return {
      el: null
    };
  },
  emits: ["update:modelValue", "change"],
  props: {
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
  },
  computed: {
    pageStyle() {
      return (item) => {
        let style = {};
        if (this.modelValue == item) {
          if (this.el) {
            style.color = obj.element.getCssStyle(this.el, "background-color");
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
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj.common.isObject(param)) {
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
    firstStyle() {
      let style = {};
      if (this.modelValue > 1 && this.color) {
        style.color = this.color;
      }
      return style;
    },
    lastStyle() {
      let style = {};
      if (this.modelValue < this.total && this.color) {
        style.color = this.color;
      }
      return style;
    }
  },
  components: {
    Icon
  },
  mounted() {
    this.el = this.$el;
  },
  methods: {
    //上一页
    pagePrev() {
      if (this.modelValue == 1) {
        return;
      }
      let page = this.modelValue - 1;
      this.$emit("update:modelValue", page);
      this.$emit("change", page);
    },
    //下一页
    pageNext() {
      if (this.modelValue == this.total) {
        return;
      }
      let page = this.modelValue + 1;
      this.$emit("update:modelValue", page);
      this.$emit("change", page);
    },
    //首页
    pageFirst() {
      if (this.modelValue == 1) {
        return;
      }
      this.$emit("update:modelValue", 1);
      this.$emit("change", 1);
    },
    //尾页
    pageLast() {
      if (this.modelValue == this.total) {
        return;
      }
      this.$emit("update:modelValue", this.total);
      this.$emit("change", this.total);
    },
    //指定页
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
const _hoisted_1$7 = { class: "mvi-page" };
const _hoisted_2$7 = ["disabled"];
const _hoisted_3$6 = ["textContent"];
const _hoisted_4$4 = ["disabled"];
const _hoisted_5$3 = ["textContent"];
const _hoisted_6$3 = { class: "mvi-page-numbers" };
const _hoisted_7$3 = {
  key: 0,
  class: "mvi-page-numbers-simple"
};
const _hoisted_8$1 = {
  key: 1,
  class: "mvi-page-numbers-items"
};
const _hoisted_9$1 = ["textContent", "onClick"];
const _hoisted_10$1 = ["textContent", "onClick"];
const _hoisted_11 = ["disabled"];
const _hoisted_12 = ["textContent"];
const _hoisted_13 = ["disabled"];
const _hoisted_14 = ["textContent"];
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    $props.firstText || $options.parseIcon($props.firstIcon).type || $options.parseIcon($props.firstIcon).url ? (openBlock(), createElementBlock("div", {
      key: 0,
      disabled: $props.modelValue == 1 || null,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.pageFirst && $options.pageFirst(...args)),
      class: normalizeClass(["mvi-page-first", $props.active && $props.modelValue != 1 ? "active" : ""]),
      style: normalizeStyle($options.firstStyle)
    }, [
      $options.parseIcon($props.firstIcon).type || $options.parseIcon($props.firstIcon).url ? (openBlock(), createBlock(_component_Icon, {
        key: 0,
        class: normalizeClass($props.firstText ? "margin-right" : ""),
        type: $options.parseIcon($props.firstIcon).type,
        url: $options.parseIcon($props.firstIcon).url,
        spin: $options.parseIcon($props.firstIcon).spin,
        size: $options.parseIcon($props.firstIcon).size,
        color: $options.parseIcon($props.firstIcon).color
      }, null, 8, ["class", "type", "url", "spin", "size", "color"])) : createCommentVNode("", true),
      $props.firstText ? (openBlock(), createElementBlock("span", {
        key: 1,
        textContent: toDisplayString($props.firstText)
      }, null, 8, _hoisted_3$6)) : createCommentVNode("", true)
    ], 14, _hoisted_2$7)) : createCommentVNode("", true),
    $props.prevText || $options.parseIcon($props.prevIcon).type || $options.parseIcon($props.prevIcon).url ? (openBlock(), createElementBlock("div", {
      key: 1,
      disabled: $props.modelValue == 1 || null,
      onClick: _cache[1] || (_cache[1] = (...args) => $options.pagePrev && $options.pagePrev(...args)),
      class: normalizeClass(["mvi-page-prev", $props.active && $props.modelValue != 1 ? "active" : ""]),
      style: normalizeStyle($options.firstStyle)
    }, [
      $options.parseIcon($props.prevIcon).type || $options.parseIcon($props.prevIcon).url ? (openBlock(), createBlock(_component_Icon, {
        key: 0,
        class: normalizeClass($props.prevText ? "margin-right" : ""),
        type: $options.parseIcon($props.prevIcon).type,
        url: $options.parseIcon($props.prevIcon).url,
        size: $options.parseIcon($props.prevIcon).size,
        spin: $options.parseIcon($props.prevIcon).spin,
        color: $options.parseIcon($props.prevIcon).color
      }, null, 8, ["class", "type", "url", "size", "spin", "color"])) : createCommentVNode("", true),
      $props.prevText ? (openBlock(), createElementBlock("span", {
        key: 1,
        textContent: toDisplayString($props.prevText)
      }, null, 8, _hoisted_5$3)) : createCommentVNode("", true)
    ], 14, _hoisted_4$4)) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_6$3, [
      $props.simple ? (openBlock(), createElementBlock("div", _hoisted_7$3, toDisplayString($props.modelValue) + " / " + toDisplayString($props.total), 1)) : (openBlock(), createElementBlock("div", _hoisted_8$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.total, (item) => {
          return openBlock(), createElementBlock(Fragment, null, [
            $props.total <= $props.overNumber ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["mvi-page-numbers-item", $props.modelValue == item ? "number-active" : "", $props.active && $props.modelValue != item ? "active" : ""]),
              textContent: toDisplayString(item),
              onClick: ($event) => $options.toPage(item),
              style: normalizeStyle($options.pageStyle(item))
            }, null, 14, _hoisted_9$1)) : createCommentVNode("", true)
          ], 64);
        }), 256)),
        $props.total > $props.overNumber && $props.modelValue > ($props.overNumber - 1) / 2 + 1 ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["mvi-page-numbers-item", $props.active ? "active" : ""]),
          onClick: _cache[2] || (_cache[2] = ($event) => $options.toPage($props.modelValue - ($props.overNumber - 1))),
          style: normalizeStyle({ color: $props.color || "" })
        }, "...", 6)) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.arr, (item) => {
          return openBlock(), createElementBlock(Fragment, null, [
            $props.total > $props.overNumber ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["mvi-page-numbers-item", $props.modelValue == item ? "number-active" : "", $props.active && $props.modelValue != item ? "active" : ""]),
              textContent: toDisplayString(item),
              onClick: ($event) => $options.toPage(item),
              style: normalizeStyle($options.pageStyle(item))
            }, null, 14, _hoisted_10$1)) : createCommentVNode("", true)
          ], 64);
        }), 256)),
        $props.total > $props.overNumber && $props.modelValue < $props.total - ($props.overNumber - 1) / 2 ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["mvi-page-numbers-item", $props.active ? "active" : ""]),
          onClick: _cache[3] || (_cache[3] = ($event) => $options.toPage($props.modelValue + ($props.overNumber - 1))),
          style: normalizeStyle({ color: $props.color || "" })
        }, "...", 6)) : createCommentVNode("", true)
      ]))
    ]),
    $props.nextText || $options.parseIcon($props.nextIcon).type || $options.parseIcon($props.nextIcon).url ? (openBlock(), createElementBlock("div", {
      key: 2,
      disabled: $props.modelValue == $props.total || null,
      onClick: _cache[4] || (_cache[4] = (...args) => $options.pageNext && $options.pageNext(...args)),
      class: normalizeClass(["mvi-page-next", $props.active && $props.modelValue != $props.total ? "active" : ""]),
      style: normalizeStyle($options.lastStyle)
    }, [
      $props.nextText ? (openBlock(), createElementBlock("span", {
        key: 0,
        textContent: toDisplayString($props.nextText)
      }, null, 8, _hoisted_12)) : createCommentVNode("", true),
      $options.parseIcon($props.nextIcon).type || $options.parseIcon($props.nextIcon).url ? (openBlock(), createBlock(_component_Icon, {
        key: 1,
        class: normalizeClass($props.nextText ? "margin-left" : ""),
        type: $options.parseIcon($props.nextIcon).type,
        url: $options.parseIcon($props.nextIcon).url,
        size: $options.parseIcon($props.nextIcon).size,
        spin: $options.parseIcon($props.nextIcon).spin,
        color: $options.parseIcon($props.nextIcon).color
      }, null, 8, ["class", "type", "url", "size", "spin", "color"])) : createCommentVNode("", true)
    ], 14, _hoisted_11)) : createCommentVNode("", true),
    $props.lastText || $options.parseIcon($props.lastIcon).type || $options.parseIcon($props.lastIcon).url ? (openBlock(), createElementBlock("div", {
      key: 3,
      disabled: $props.modelValue == $props.total || null,
      onClick: _cache[5] || (_cache[5] = (...args) => $options.pageLast && $options.pageLast(...args)),
      class: normalizeClass(["mvi-page-last", $props.active && $props.modelValue != $props.total ? "active" : ""]),
      style: normalizeStyle($options.lastStyle)
    }, [
      $props.lastText ? (openBlock(), createElementBlock("span", {
        key: 0,
        textContent: toDisplayString($props.lastText)
      }, null, 8, _hoisted_14)) : createCommentVNode("", true),
      $options.parseIcon($props.lastIcon).type || $options.parseIcon($props.lastIcon).url ? (openBlock(), createBlock(_component_Icon, {
        key: 1,
        class: normalizeClass($props.lastText ? "margin-left" : ""),
        type: $options.parseIcon($props.lastIcon).type,
        url: $options.parseIcon($props.lastIcon).url,
        size: $options.parseIcon($props.lastIcon).size,
        spin: $options.parseIcon($props.lastIcon).spin,
        color: $options.parseIcon($props.lastIcon).color
      }, null, 8, ["class", "type", "url", "size", "spin", "color"])) : createCommentVNode("", true)
    ], 14, _hoisted_13)) : createCommentVNode("", true)
  ]);
}
const Page = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-cd55b2ae"]]);
Page.install = (app) => {
  app.component(Page.name, Page);
};
const loadingBar_vue_vue_type_style_index_0_scoped_efd41e28_lang = "";
const _sfc_main$b = {
  name: "m-loading-bar",
  data() {
    return {
      //透明度变化时间
      opacityTime: 300,
      //进场时宽度变化时间
      widthEnterTime: 4e3,
      //离开时宽度变化时间
      widthLeaveTime: 2e3,
      //离开计时器
      timer: null,
      //是否已经触发离开
      hasTriggerLeave: false
    };
  },
  props: {
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
  },
  computed: {
    cmpColor() {
      if (typeof this.color == "string" && this.color) {
        return this.color;
      } else {
        return null;
      }
    },
    cmpZIndex() {
      if (obj.number.isNumber(this.zIndex)) {
        return this.zIndex;
      } else {
        return null;
      }
    },
    barStyle() {
      let style = {};
      if (this.cmpColor) {
        style.background = this.cmpColor;
      }
      if (this.cmpZIndex) {
        style.zIndex = this.cmpZIndex;
      }
      return style;
    }
  },
  mounted() {
    this.__init(this);
    this.enter();
  },
  methods: {
    //进入
    enter() {
      this.removeTransition();
      this.$refs.bar.style.width = 0;
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
        this.__remove();
      }, this.widthLeaveTime + this.opacityTime);
    },
    //添加动画
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
    //移除动画
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
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Teleport, { to: "body" }, [
    createElementVNode("div", {
      class: "mvi-loading-bar",
      ref: "bar",
      style: normalizeStyle($options.barStyle)
    }, null, 4)
  ]);
}
const LoadingBarComponent = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-efd41e28"]]);
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
    return new Promise((resolve, reject) => {
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
      LoadingBar.$vm.leave();
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
const list_vue_vue_type_style_index_0_scoped_72b97f74_lang = "";
const _sfc_main$a = {
  name: "m-list",
  emits: ["load", "update:loading", "update:error"],
  data() {
    return {
      //监听滚动的对象
      scrollObj: null
    };
  },
  props: {
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
  },
  mounted() {
    this.initScroll();
    if (this.immediateLoad) {
      this.doLoad();
    }
  },
  methods: {
    //监听滚动元素到底部
    initScroll() {
      const el = document.body.querySelector(this.scrollEl);
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
    //执行加载函数
    doLoad() {
      if (this.finished) {
        return;
      }
      this.$emit("update:loading", true);
      this.$emit("update:error", false);
      this.$emit("load");
    }
  }
};
const _hoisted_1$6 = { class: "mvi-list" };
const _hoisted_2$6 = {
  key: 0,
  class: "mvi-list-finished"
};
const _hoisted_3$5 = { key: 1 };
const _hoisted_4$3 = {
  key: 1,
  class: "mvi-list-loading"
};
const _hoisted_5$2 = { key: 1 };
const _hoisted_6$2 = { key: 1 };
const _hoisted_7$2 = { key: 1 };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$6, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true),
    $props.finished ? (openBlock(), createElementBlock("div", _hoisted_2$6, [
      _ctx.$slots.finished ? renderSlot(_ctx.$slots, "finished", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_3$5, toDisplayString($props.finishedText), 1))
    ])) : $props.loading ? (openBlock(), createElementBlock("div", _hoisted_4$3, [
      _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_5$2, toDisplayString($props.loadingText), 1))
    ])) : $props.error ? (openBlock(), createElementBlock("div", {
      key: 2,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.doLoad && $options.doLoad(...args)),
      class: "mvi-list-error"
    }, [
      _ctx.$slots.error ? renderSlot(_ctx.$slots, "error", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_6$2, toDisplayString($props.errorText), 1))
    ])) : $props.content || _ctx.$slots.content ? (openBlock(), createElementBlock("div", {
      key: 3,
      onClick: _cache[1] || (_cache[1] = (...args) => $options.doLoad && $options.doLoad(...args)),
      class: "mvi-list-content"
    }, [
      _ctx.$slots.content ? renderSlot(_ctx.$slots, "content", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("span", _hoisted_7$2, toDisplayString($props.content), 1))
    ])) : createCommentVNode("", true)
  ]);
}
const List = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-72b97f74"]]);
List.install = (app) => {
  app.component(List.name, List);
};
const skeleton_vue_vue_type_style_index_0_scoped_3e02f14d_lang = "";
const _sfc_main$9 = {
  name: "m-skeleton",
  props: {
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
  },
  computed: {
    //头像样式
    avatarStyle() {
      let style = {};
      if (this.avatarSize) {
        style.width = this.avatarSize;
        style.height = this.avatarSize;
      }
      return style;
    },
    //每行样式
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
    //标题样式
    titleStyle() {
      let style = {};
      if (this.titleWidth) {
        style.width = this.titleWidth;
      }
      return style;
    },
    //行数
    rowsArray() {
      let arr = [];
      for (let i = 0; i < this.rows; i++) {
        arr.push(i);
      }
      return arr;
    }
  }
};
const _hoisted_1$5 = { class: "mvi-skeleton-container" };
const _hoisted_2$5 = {
  key: 0,
  class: "mvi-skeleton-avatar"
};
const _hoisted_3$4 = { class: "mvi-skeleton-rows" };
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$5, [
    $props.loading ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["mvi-skeleton", $props.animation ? "animation" : ""])
    }, [
      $props.avatar ? (openBlock(), createElementBlock("div", _hoisted_2$5, [
        createElementVNode("div", {
          class: normalizeClass(["mvi-skeleton-avatar-el", $props.avatarRound ? "round" : ""]),
          style: normalizeStyle($options.avatarStyle)
        }, null, 6)
      ])) : createCommentVNode("", true),
      createElementVNode("div", _hoisted_3$4, [
        $props.title ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["mvi-skeleton-title", $props.round ? "round" : ""]),
          style: normalizeStyle($options.titleStyle)
        }, null, 6)) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.rowsArray, (item) => {
          return openBlock(), createElementBlock("div", {
            style: normalizeStyle($options.rowStyle(item)),
            class: normalizeClass(["mvi-skeleton-row", $props.round ? "round" : ""])
          }, null, 6);
        }), 256))
      ])
    ], 2)) : renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true)
  ]);
}
const Skeleton = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-3e02f14d"]]);
Skeleton.install = (app) => {
  app.component(Skeleton.name, Skeleton);
};
const sign_vue_vue_type_style_index_0_scoped_e343f79d_lang = "";
const _sfc_main$8 = {
  name: "m-sign",
  props: {
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
  },
  data() {
    return {
      //是否正在签名
      drawing: false,
      //鼠标是否在canvas中
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
    //背景色改变，则清除一次画布
    background() {
      this.clear();
    }
  },
  methods: {
    //初始化
    init() {
      this.$el.setAttribute("width", obj.element.getCssStyle(this.$el, "width"));
      this.$el.setAttribute("height", obj.element.getCssStyle(this.$el, "height"));
      this.clear();
      obj.event.on(document.documentElement, `mousemove.sign_${this.uid}`, this.canvasMouseMove);
      obj.event.on(document.documentElement, `mouseup.sign_${this.uid}`, this.canvasMouseUp);
    },
    //鼠标按下
    canvasMouseDown(e) {
      this.drawing = true;
      this.inCanvas = true;
      const ctx = this.$el.getContext("2d");
      const rect = obj.element.getElementBounding(this.$el);
      ctx.beginPath();
      ctx.moveTo(e.pageX - rect.left, e.pageY - rect.top);
    },
    //鼠标移动
    canvasMouseMove(e) {
      if (this.drawing && this.inCanvas) {
        const ctx = this.$el.getContext("2d");
        const rect = obj.element.getElementBounding(this.$el);
        ctx.lineTo(e.pageX - rect.left, e.pageY - rect.top);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = obj.element.rem2px(this.width);
        ctx.stroke();
      }
    },
    //鼠标松开
    canvasMouseUp(e) {
      this.drawing = false;
      const ctx = this.$el.getContext("2d");
      ctx.closePath();
    },
    //鼠标进入canvas区域
    canvasMouseEnter(e) {
      if (this.drawing) {
        this.inCanvas = true;
        const ctx = this.$el.getContext("2d");
        const rect = obj.element.getElementBounding(this.$el);
        ctx.beginPath();
        ctx.moveTo(e.pageX - rect.left, e.pageY - rect.top);
      }
    },
    //鼠标离开canvas区域
    canvasMouseLeave(e) {
      if (this.drawing) {
        const ctx = this.$el.getContext("2d");
        ctx.closePath();
        this.inCanvas = false;
      }
    },
    //触摸按下
    canvasTouchStart(e) {
      const ctx = this.$el.getContext("2d");
      const rect = obj.element.getElementBounding(this.$el);
      ctx.beginPath();
      ctx.moveTo(e.targetTouches[0].pageX - rect.left, e.targetTouches[0].pageY - rect.top);
    },
    //触摸移动
    canvasTouchMove(e) {
      if (e.cancelable) {
        e.preventDefault();
      }
      const ctx = this.$el.getContext("2d");
      const rect = obj.element.getElementBounding(this.$el);
      ctx.lineTo(e.targetTouches[0].pageX - rect.left, e.targetTouches[0].pageY - rect.top);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = obj.element.rem2px(this.width);
      ctx.stroke();
    },
    //触摸结束
    canvasTouchEnd(e) {
      const ctx = this.$el.getContext("2d");
      ctx.closePath();
    },
    //api：清除画布
    clear() {
      const ctx = this.$el.getContext("2d");
      ctx.beginPath();
      ctx.clearRect(0, 0, this.$el.width, this.$el.height);
      ctx.rect(0, 0, this.$el.width, this.$el.height);
      ctx.fillStyle = this.background;
      ctx.fill();
      ctx.closePath();
    },
    //api：获取图片文件
    getImage() {
      const url = this.$el.toDataURL("image/png");
      return url;
    }
  },
  beforeUnmount() {
    obj.event.off(document.documentElement, `mousemove.sign_${this.uid} mouseup.sign_${this.uid}`);
  }
};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
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
const Sign = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-e343f79d"]]);
Sign.install = (app) => {
  app.component(Sign.name, Sign);
};
const select_vue_vue_type_style_index_0_scoped_6156cb36_lang = "";
const _sfc_main$7 = {
  name: "m-select",
  emits: ["update:modelValue", "change", "clear"],
  data() {
    return {
      hover: false,
      focus: false
    };
  },
  props: {
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
      let cls = ["mvi-select", this.size];
      if (this.round) {
        cls.push("round");
      } else if (this.square) {
        cls.push("square");
      }
      return cls;
    },
    relateClass() {
      let cls = ["mvi-select-relate"];
      if (this.activeType && !this.activeColor && this.focus) {
        cls.push(this.activeType);
      }
      return cls;
    },
    relateStyle() {
      let style = {};
      if (this.activeColor && this.focus) {
        style.borderColor = this.activeColor;
        const rgb = obj.color.hex2rgb(this.activeColor);
        style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
      }
      return style;
    },
    iconClass() {
      let cls = ["mvi-select-icon"];
      if (this.focus) {
        cls.push("active");
      }
      return cls;
    },
    selectLabel() {
      if (this.multiple) {
        let labels = [];
        this.cmpOptions.forEach((item) => {
          if (Array.isArray(this.modelValue)) {
            let flag = this.modelValue.some((i) => {
              return obj.common.equal(i, item.value);
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
        this.cmpOptions.forEach((item) => {
          if (obj.common.equal(this.modelValue, item.value)) {
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
            return obj.common.equal(i, item.value);
          });
          return this.showSelected && flag;
        }
        return false;
      };
    },
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj.common.isObject(param)) {
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
        width: this.layerProps.width,
        zIndex: obj.number.isNumber(this.layerProps.zIndex) ? this.layerProps.zIndex : 400,
        offset: this.layerProps.offset ? this.layerProps.offset : "0.1rem",
        animation: this.layerProps.animation,
        timeout: obj.number.isNumber(this.layerProps.timeout) ? this.layerProps.timeout : 200,
        showTriangle: typeof this.layerProps.showTriangle == "boolean" ? this.layerProps.showTriangle : false,
        shadow: typeof this.layerProps.shadow == "boolean" ? this.layerProps.shadow : true,
        border: typeof this.layerProps.border == "boolean" ? this.layerProps.border : false,
        borderColor: this.layerProps.borderColor
      };
    },
    cmpOptions() {
      let options = [];
      this.options.forEach((opt) => {
        let item = {};
        if (obj.common.isObject(opt)) {
          item.label = opt[this.props.label];
          item.value = opt[this.props.value];
          item.disabled = !!opt.disabled;
        } else {
          item.label = opt;
          item.value = opt;
          item.disabled = false;
        }
        options.push(item);
      });
      return options;
    }
  },
  components: {
    Layer,
    Icon
  },
  methods: {
    //点击清除
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
    //layer显示前进行宽度设置
    layerShow() {
      if (!this.layerRealProps.width) {
        this.$refs.menu.style.width = this.$refs.relate.offsetWidth + "px";
      }
    },
    //点击选项
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
          return obj.common.equal(tmp, item.value);
        });
        if (flag) {
          arr = arr.filter((tmp) => {
            return !obj.common.equal(tmp, item.value);
          });
        } else {
          arr.push(item.value);
        }
        this.$emit("update:modelValue", arr);
        this.$emit(
          "change",
          this.cmpOptions.filter((tmp) => {
            return arr.some((tmp2) => {
              return obj.common.equal(tmp.value, tmp2);
            });
          })
        );
      } else {
        this.$emit("update:modelValue", item.value);
        this.$emit("change", item);
        this.trigger();
      }
    },
    //触发选择打开或关闭
    trigger() {
      if (this.disabled) {
        return;
      }
      this.focus = !this.focus;
    }
  }
};
const _hoisted_1$4 = ["disabled"];
const _hoisted_2$4 = ["data-id"];
const _hoisted_3$3 = ["data-placeholder", "innerHTML"];
const _hoisted_4$2 = ["onClick", "disabled"];
const _hoisted_5$1 = ["innerHTML"];
const _hoisted_6$1 = {
  key: 1,
  class: "mvi-select-empty"
};
const _hoisted_7$1 = ["value", "name"];
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Layer = resolveComponent("Layer");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.selectClass),
    disabled: $props.disabled || null
  }, [
    createElementVNode("div", {
      onMouseenter: _cache[0] || (_cache[0] = ($event) => $data.hover = true),
      onMouseleave: _cache[1] || (_cache[1] = ($event) => $data.hover = false),
      "data-id": "mvi-select-relate-" + $setup.uid,
      class: normalizeClass($options.relateClass),
      style: normalizeStyle($options.relateStyle),
      ref: "relate",
      onClick: _cache[2] || (_cache[2] = (...args) => $options.trigger && $options.trigger(...args))
    }, [
      createElementVNode("span", {
        class: normalizeClass(["mvi-select-label", $options.selectLabel ? "" : "placeholder"]),
        "data-placeholder": $props.placeholder,
        innerHTML: $options.selectLabel
      }, null, 10, _hoisted_3$3),
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
    ], 46, _hoisted_2$4),
    createVNode(_component_Layer, {
      modelValue: $data.focus,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.focus = $event),
      relate: `[data-id='mvi-select-relate-${$setup.uid}']`,
      placement: $options.layerRealProps.placement,
      offset: $options.layerRealProps.offset,
      "z-index": $options.layerRealProps.zIndex,
      closable: "",
      "show-triangle": $options.layerRealProps.showTriangle,
      animation: $options.layerRealProps.animation,
      timeout: $options.layerRealProps.timeout,
      shadow: $options.layerRealProps.shadow,
      border: $options.layerRealProps.border,
      "border-color": $options.layerRealProps.borderColor,
      width: $options.layerRealProps.width,
      onShowing: $options.layerShow,
      ref: "layer"
    }, {
      default: withCtx(() => [
        createElementVNode("div", {
          class: normalizeClass(["mvi-select-menu", $props.size]),
          ref: "menu",
          style: normalizeStyle($options.menuStyle)
        }, [
          $options.cmpOptions.length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList($options.cmpOptions, (item) => {
            return openBlock(), createElementBlock("div", {
              class: "mvi-select-option",
              onClick: ($event) => $options.optionClick(item),
              disabled: item.disabled || null
            }, [
              createElementVNode("div", {
                class: "mvi-select-option-value",
                innerHTML: item.label
              }, null, 8, _hoisted_5$1),
              $options.isSelect(item) ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                type: $options.parseIcon($props.selectedIcon).type,
                spin: $options.parseIcon($props.selectedIcon).spin,
                size: $options.parseIcon($props.selectedIcon).size,
                url: $options.parseIcon($props.selectedIcon).url,
                color: $options.parseIcon($props.selectedIcon).color
              }, null, 8, ["type", "spin", "size", "url", "color"])) : createCommentVNode("", true)
            ], 8, _hoisted_4$2);
          }), 256)) : (openBlock(), createElementBlock("div", _hoisted_6$1, toDisplayString($props.emptyText), 1))
        ], 6)
      ]),
      _: 1
    }, 8, ["modelValue", "relate", "placement", "offset", "z-index", "show-triangle", "animation", "timeout", "shadow", "border", "border-color", "width", "onShowing"]),
    createElementVNode("input", {
      type: "hidden",
      value: $options.formData,
      name: $props.name
    }, null, 8, _hoisted_7$1)
  ], 10, _hoisted_1$4);
}
const Select = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-6156cb36"]]);
Select.install = (app) => {
  app.component(Select.name, Select);
};
const autocomplete_vue_vue_type_style_index_0_scoped_de9ed585_lang = "";
const _sfc_main$6 = {
  name: "m-autocomplete",
  data() {
    return {
      focus: false
    };
  },
  emits: ["update:modelValue", "focus", "blur", "input", "left-click", "right-click", "select", "clear", "keydown", "keyup"],
  props: {
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
      return this.focus && this.cmpFilter.length != 0;
    },
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj.common.isObject(param)) {
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
    showClearIcon() {
      if (this.disabled) {
        return false;
      }
      if (this.realValue && this.focus) {
        return true;
      }
      return false;
    },
    clearStyle() {
      let style = {};
      if (this.parseIcon(this.rightIcon).type || this.parseIcon(this.rightIcon).url) {
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
    cmpFilter() {
      if (typeof this.filterMethod == "function") {
        return this.filterMethod(this.realValue, this.list);
      }
      if (this.filterMethod) {
        return this.defaultFilter();
      }
      return this.list;
    },
    inputStyle() {
      let style = {};
      if (this.parseIcon(this.leftIcon).type || this.parseIcon(this.leftIcon).url) {
        style.paddingLeft = 0;
      }
      if (this.showClearIcon && this.clearable || this.parseIcon(this.rightIcon).type || this.parseIcon(this.rightIcon).url) {
        style.paddingRight = 0;
      }
      if (this.align) {
        style.textAlign = this.align;
      }
      return style;
    },
    autocompleteClass() {
      let cls = ["mvi-autocomplete", this.size];
      if (this.round) {
        cls.push("round");
      } else if (this.square) {
        cls.push("square");
      }
      return cls;
    },
    relateStyle() {
      let style = {};
      if (this.activeColor && this.focus) {
        style.borderColor = this.activeColor;
        const rgb = obj.color.hex2rgb(this.activeColor);
        style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
      }
      return style;
    },
    relateClass() {
      let cls = ["mvi-autocomplete-relate"];
      if (this.activeType && !this.activeColor && this.focus) {
        cls.push(this.activeType);
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
        width: this.layerProps.width,
        zIndex: obj.number.isNumber(this.layerProps.zIndex) ? this.layerProps.zIndex : 400,
        offset: this.layerProps.offset ? this.layerProps.offset : "0.1rem",
        animation: this.layerProps.animation,
        timeout: obj.number.isNumber(this.layerProps.timeout) ? this.layerProps.timeout : 200,
        showTriangle: typeof this.layerProps.showTriangle == "boolean" ? this.layerProps.showTriangle : false,
        shadow: typeof this.layerProps.shadow == "boolean" ? this.layerProps.shadow : true,
        border: typeof this.layerProps.border == "boolean" ? this.layerProps.border : false,
        borderColor: this.layerProps.borderColor
      };
    }
  },
  methods: {
    //悬浮层显示前进行宽度设置
    layerShow() {
      if (!this.layerRealProps.width) {
        this.$refs.menu.style.width = this.$refs.relate.offsetWidth + "px";
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
    //输入框键盘按下
    keydown(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("keydown", e, this.realValue);
    },
    //输入框键盘松开
    keyup(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("keyup", e, this.realValue);
    },
    input() {
      if (this.disabled) {
        return;
      }
      this.focus = true;
      this.$refs.layer.reset();
      this.$emit("input", this.realValue);
    },
    inputBlur() {
      if (this.disabled) {
        return;
      }
      setTimeout(() => {
        this.focus = false;
        this.$emit("blur", this.realValue);
      }, 200);
    },
    inputFocus() {
      if (this.disabled) {
        return;
      }
      this.focus = true;
      this.$emit("focus", this.realValue);
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
      }, 210);
    },
    doSelect(item) {
      if (this.disabled) {
        return;
      }
      this.realValue = item;
      this.$emit("select", item);
      this.focus = false;
    },
    //默认过滤方法
    defaultFilter() {
      return this.list.filter((item) => {
        return String(item).toLocaleLowerCase().includes(this.realValue.toLocaleLowerCase());
      });
    }
  }
};
const _hoisted_1$3 = ["disabled"];
const _hoisted_2$3 = ["data-id"];
const _hoisted_3$2 = ["placeholder", "name", "disabled"];
const _hoisted_4$1 = ["textContent", "onClick"];
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Layer = resolveComponent("Layer");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.autocompleteClass),
    disabled: $props.disabled || null
  }, [
    createElementVNode("div", {
      class: normalizeClass($options.relateClass),
      style: normalizeStyle($options.relateStyle),
      "data-id": "mvi-autocomplete-relate-" + $setup.uid,
      ref: "relate"
    }, [
      $options.parseIcon($props.leftIcon).type || $options.parseIcon($props.leftIcon).url ? (openBlock(), createElementBlock("div", {
        key: 0,
        onClick: _cache[0] || (_cache[0] = (...args) => $options.leftClick && $options.leftClick(...args)),
        class: "mvi-autocomplete-left-icon"
      }, [
        createVNode(_component_Icon, {
          type: $options.parseIcon($props.leftIcon).type,
          url: $options.parseIcon($props.leftIcon).url,
          spin: $options.parseIcon($props.leftIcon).spin,
          size: $options.parseIcon($props.leftIcon).size,
          color: $options.parseIcon($props.leftIcon).color
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
        autocomplete: "off",
        onKeydown: _cache[5] || (_cache[5] = (...args) => $options.keydown && $options.keydown(...args)),
        onKeyup: _cache[6] || (_cache[6] = (...args) => $options.keyup && $options.keyup(...args)),
        class: normalizeClass([$options.parseIcon($props.leftIcon).type || $options.parseIcon($props.leftIcon).url ? "left-none-radius" : "", $options.parseIcon($props.rightIcon).type || $options.parseIcon($props.rightIcon).url || $props.clearable && $options.showClearIcon ? "right-none-radius" : ""])
      }, null, 46, _hoisted_3$2), [
        [vModelText, $options.realValue]
      ]),
      $props.clearable ? withDirectives((openBlock(), createElementBlock("div", {
        key: 1,
        onClick: _cache[7] || (_cache[7] = (...args) => $options.doClear && $options.doClear(...args)),
        class: "mvi-autocomplete-clear",
        style: normalizeStyle($options.clearStyle)
      }, [
        createVNode(_component_Icon, { type: "times-o" })
      ], 4)), [
        [vShow, $options.showClearIcon]
      ]) : createCommentVNode("", true),
      $options.parseIcon($props.rightIcon).type || $options.parseIcon($props.rightIcon).url ? (openBlock(), createElementBlock("div", {
        key: 2,
        class: "mvi-autocomplete-right-icon",
        onClick: _cache[8] || (_cache[8] = (...args) => $options.rightClick && $options.rightClick(...args))
      }, [
        createVNode(_component_Icon, {
          type: $options.parseIcon($props.rightIcon).type,
          url: $options.parseIcon($props.rightIcon).url,
          spin: $options.parseIcon($props.rightIcon).spin,
          size: $options.parseIcon($props.rightIcon).size,
          color: $options.parseIcon($props.rightIcon).color
        }, null, 8, ["type", "url", "spin", "size", "color"])
      ])) : createCommentVNode("", true)
    ], 14, _hoisted_2$3),
    createVNode(_component_Layer, {
      "model-value": $options.show,
      relate: `[data-id='mvi-autocomplete-relate-${$setup.uid}']`,
      placement: $options.layerRealProps.placement,
      offset: $options.layerRealProps.offset,
      "z-index": $options.layerRealProps.zIndex,
      ref: "layer",
      animation: $options.layerRealProps.animation,
      shadow: $options.layerRealProps.shadow,
      border: $options.layerRealProps.border,
      timeout: $options.layerRealProps.timeout,
      closable: false,
      "show-triangle": $options.layerRealProps.showTriangle,
      "border-color": $options.layerRealProps.borderColor,
      width: $options.layerRealProps.width,
      onShowing: $options.layerShow
    }, {
      default: withCtx(() => [
        createElementVNode("div", {
          class: normalizeClass(["mvi-autocomplete-menu", $props.size]),
          style: normalizeStyle($options.menuStyle),
          ref: "menu"
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($options.cmpFilter, (item) => {
            return openBlock(), createElementBlock("div", {
              class: "mvi-autocomplete-list",
              textContent: toDisplayString(item),
              onClick: ($event) => $options.doSelect(item)
            }, null, 8, _hoisted_4$1);
          }), 256))
        ], 6)
      ]),
      _: 1
    }, 8, ["model-value", "relate", "placement", "offset", "z-index", "animation", "shadow", "border", "timeout", "show-triangle", "border-color", "width", "onShowing"])
  ], 10, _hoisted_1$3);
}
const Autocomplete = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-de9ed585"]]);
Autocomplete.install = (app) => {
  app.component(Autocomplete.name, Autocomplete);
};
const dateChooser_vue_vue_type_style_index_0_scoped_12abadf0_lang = "";
const _sfc_main$5 = {
  name: "m-date-chooser",
  data() {
    return {
      show: false,
      view: "date",
      selectedDate: /* @__PURE__ */ new Date()
    };
  },
  emits: ["update:modelValue", "change"],
  props: {
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
      type: Function
    }
  },
  setup() {
    const instance = getCurrentInstance();
    return {
      uid: instance.uid
    };
  },
  computed: {
    layerRealProps() {
      return {
        placement: this.layerProps.placement ? this.layerProps.placement : "bottom-start",
        width: this.layerProps.width,
        zIndex: obj.number.isNumber(this.layerProps.zIndex) ? this.layerProps.zIndex : 400,
        offset: this.layerProps.offset ? this.layerProps.offset : "0.2rem",
        animation: this.layerProps.animation,
        timeout: obj.number.isNumber(this.layerProps.timeout) ? this.layerProps.timeout : 200,
        showTriangle: typeof this.layerProps.showTriangle == "boolean" ? this.layerProps.showTriangle : false,
        shadow: typeof this.layerProps.shadow == "boolean" ? this.layerProps.shadow : true,
        border: typeof this.layerProps.border == "boolean" ? this.layerProps.border : false,
        borderColor: this.layerProps.borderColor
      };
    },
    //年数组
    years() {
      let arr = [];
      const year = this.selectedDate.getFullYear();
      const startYear = this.startDate.getFullYear();
      let index = Math.floor((year - startYear) / 12);
      for (let i = startYear + index * 12; i < startYear + index * 12 + 12; i++) {
        arr.push(dayjs(this.modelValue).year(i).toDate());
      }
      return arr;
    },
    //头部显示年月的值
    formatShow() {
      return (type, date) => {
        if (typeof this.headerFormatter == "function") {
          if (type == "year") {
            return this.headerFormatter.apply(this, [type, date.getFullYear()]);
          }
          if (type == "month") {
            return this.headerFormatter.apply(this, [type, date.getMonth() + 1]);
          }
        }
        if (type == "year") {
          return dayjs(date).format("YYYY") + "年";
        }
        if (type == "month") {
          return dayjs(date).format("MM") + "月";
        }
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
    this.selectedDate = this.modelValue;
  },
  mounted() {
    if (this.trigger == "hover") {
      obj.event.on(this.$el, "mouseenter.dateChooser", this.openCalendar);
      obj.event.on(this.$el, "mouseleave.dateChooser", this.closeCalendar);
    }
  },
  methods: {
    //悬浮层显示前进行宽度设置
    layerShow() {
      if (!this.layerRealProps.width) {
        this.$refs.panel.style.width = this.$refs.relate.offsetWidth + "px";
      }
    },
    //点击打开/关闭日历弹窗
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
    //点击日期
    dateClick(date) {
      this.$emit("update:modelValue", date);
      this.$emit("change", date);
      this.show = false;
    },
    //点击年份
    yearClick(date) {
      if (this.mode == "year") {
        this.$emit("update:modelValue", date);
        this.$emit("change", date);
        this.show = false;
        return;
      }
      setTimeout(() => {
        this.view = "month";
      }, 0);
    },
    //点击月份
    monthClick(date) {
      if (this.mode == "month") {
        this.$emit("update:modelValue", date);
        this.$emit("change", date);
        this.show = false;
        return;
      }
      setTimeout(() => {
        this.view = "date";
      }, 0);
    },
    //更新年份
    updateYear(num) {
      this.selectedDate = dayjs(this.selectedDate).add(num, "year").toDate();
      this.$emit("update:modelValue", this.selectedDate);
      this.$emit("change", this.selectedDate);
    },
    //更新月份
    updateMonth(num) {
      this.selectedDate = dayjs(this.selectedDate).add(num, "month").toDate();
      this.$emit("update:modelValue", this.selectedDate);
      this.$emit("change", this.selectedDate);
    },
    //跳转年视图
    goYear() {
      setTimeout(() => {
        this.view = "year";
      }, 0);
    },
    //跳转月视图
    goMonth() {
      setTimeout(() => {
        this.view = "month";
      }, 0);
    },
    //api：打开日期选择弹窗
    openCalendar() {
      if (this.disabled) {
        return;
      }
      this.show = true;
    },
    //api：关闭日期选择弹窗
    closeCalendar() {
      if (this.disabled) {
        return;
      }
      this.show = false;
    }
  },
  beforeUnmount() {
    if (this.trigger == "hover") {
      obj.event.off(this.$el, "mouseenter.dateChooser mouseleave.dateChooser");
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-12abadf0"), n = n(), popScopeId(), n);
const _hoisted_1$2 = ["data-id"];
const _hoisted_2$2 = {
  class: "mvi-date-chooser-layer",
  ref: "panel"
};
const _hoisted_3$1 = {
  key: 0,
  class: "mvi-date-chooser-year-header"
};
const _hoisted_4 = { class: "mvi-date-chooser-year-center" };
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", null, "-", -1));
const _hoisted_6 = {
  key: 1,
  class: "mvi-date-chooser-month-header"
};
const _hoisted_7 = {
  key: 2,
  class: "mvi-date-chooser-date-header"
};
const _hoisted_8 = { class: "mvi-date-chooser-date-left" };
const _hoisted_9 = { class: "mvi-date-chooser-date-center" };
const _hoisted_10 = { class: "mvi-date-chooser-date-right" };
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_Calendar = resolveComponent("Calendar");
  const _component_Layer = resolveComponent("Layer");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["mvi-date-chooser", $props.block ? "block" : ""])
  }, [
    createElementVNode("div", {
      class: "mvi-date-chooser-relate",
      "data-id": `mvi-date-chooser-relate-${$setup.uid}`,
      ref: "relate",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.clickCalendar && $options.clickCalendar(...args))
    }, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 8, _hoisted_1$2),
    createVNode(_component_Layer, {
      relate: `[data-id='mvi-date-chooser-relate-${$setup.uid}']`,
      modelValue: $data.show,
      "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $data.show = $event),
      placement: $options.layerRealProps.placement,
      offset: $options.layerRealProps.offset,
      "z-index": $options.layerRealProps.zIndex,
      shadow: $options.layerRealProps.shadow,
      border: $options.layerRealProps.border,
      animation: $options.layerRealProps.animation,
      "border-color": $options.layerRealProps.borderColor,
      timeout: $options.layerRealProps.timeout,
      closable: $props.closable,
      "show-triangle": $options.layerRealProps.showTriangle,
      width: $options.layerRealProps.width,
      onShowing: $options.layerShow
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_2$2, [
          $data.view == "year" ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
            createElementVNode("div", {
              class: normalizeClass(["mvi-date-chooser-year-left", $props.type]),
              onClick: _cache[1] || (_cache[1] = ($event) => $options.updateYear(-1))
            }, [
              createVNode(_component_Icon, { type: "angle-double-left" })
            ], 2),
            createElementVNode("div", _hoisted_4, [
              createElementVNode("span", null, toDisplayString($options.formatShow("year", $options.years[0])), 1),
              _hoisted_5,
              createElementVNode("span", null, toDisplayString($options.formatShow("year", $options.years[$options.years.length - 1])), 1)
            ]),
            createElementVNode("div", {
              class: normalizeClass(["mvi-date-chooser-year-right", $props.type]),
              onClick: _cache[2] || (_cache[2] = ($event) => $options.updateYear(1))
            }, [
              createVNode(_component_Icon, { type: "angle-double-right" })
            ], 2)
          ])) : $data.view == "month" ? (openBlock(), createElementBlock("div", _hoisted_6, [
            createElementVNode("div", {
              class: normalizeClass(["mvi-date-chooser-month-left", $props.type]),
              onClick: _cache[3] || (_cache[3] = ($event) => $options.updateYear(-1))
            }, [
              createVNode(_component_Icon, { type: "angle-double-left" })
            ], 2),
            createElementVNode("div", {
              class: normalizeClass(["mvi-date-chooser-month-center", $props.type]),
              onClick: _cache[4] || (_cache[4] = (...args) => $options.goYear && $options.goYear(...args))
            }, toDisplayString($options.formatShow("year", $data.selectedDate)), 3),
            createElementVNode("div", {
              class: normalizeClass(["mvi-date-chooser-month-right", $props.type]),
              onClick: _cache[5] || (_cache[5] = ($event) => $options.updateYear(1))
            }, [
              createVNode(_component_Icon, { type: "angle-double-right" })
            ], 2)
          ])) : $data.view == "date" ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createElementVNode("div", _hoisted_8, [
              createElementVNode("div", {
                class: normalizeClass($props.type),
                onClick: _cache[6] || (_cache[6] = ($event) => $options.updateYear(-1))
              }, [
                createVNode(_component_Icon, { type: "angle-double-left" })
              ], 2),
              createElementVNode("div", {
                class: normalizeClass($props.type),
                onClick: _cache[7] || (_cache[7] = ($event) => $options.updateMonth(-1))
              }, [
                createVNode(_component_Icon, { type: "angle-left" })
              ], 2)
            ]),
            createElementVNode("div", _hoisted_9, [
              createElementVNode("div", {
                class: normalizeClass($props.type),
                onClick: _cache[8] || (_cache[8] = (...args) => $options.goYear && $options.goYear(...args))
              }, toDisplayString($options.formatShow("year", $data.selectedDate)), 3),
              createElementVNode("div", {
                class: normalizeClass($props.type),
                onClick: _cache[9] || (_cache[9] = (...args) => $options.goMonth && $options.goMonth(...args))
              }, toDisplayString($options.formatShow("month", $data.selectedDate)), 3)
            ]),
            createElementVNode("div", _hoisted_10, [
              createElementVNode("div", {
                class: normalizeClass($props.type),
                onClick: _cache[10] || (_cache[10] = ($event) => $options.updateMonth(1))
              }, [
                createVNode(_component_Icon, { type: "angle-right" })
              ], 2),
              createElementVNode("div", {
                class: normalizeClass($props.type),
                onClick: _cache[11] || (_cache[11] = ($event) => $options.updateYear(1))
              }, [
                createVNode(_component_Icon, { type: "angle-double-right" })
              ], 2)
            ])
          ])) : createCommentVNode("", true),
          createVNode(_component_Calendar, {
            view: $data.view,
            modelValue: $data.selectedDate,
            "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.selectedDate = $event),
            "month-text": $props.monthText,
            "week-text": $props.weekText,
            "start-date": $props.startDate,
            "end-date": $props.endDate,
            "non-current-click": false,
            active: $props.active,
            type: $props.type,
            onDateClick: $options.dateClick,
            onMonthClick: $options.monthClick,
            onYearClick: $options.yearClick,
            ref: "calendar"
          }, null, 8, ["view", "modelValue", "month-text", "week-text", "start-date", "end-date", "active", "type", "onDateClick", "onMonthClick", "onYearClick"])
        ], 512)
      ]),
      _: 1
    }, 8, ["relate", "modelValue", "placement", "offset", "z-index", "shadow", "border", "animation", "border-color", "timeout", "closable", "show-triangle", "width", "onShowing"])
  ], 2);
}
const DateChooser = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-12abadf0"]]);
DateChooser.install = (app) => {
  app.component(DateChooser.name, DateChooser);
};
const field_vue_vue_type_style_index_0_scoped_447364fb_lang = "";
const _sfc_main$4 = {
  name: "m-field",
  emits: ["update:modelValue", "prepend-click", "prefix-click", "append-click", "suffix-click", "focus", "blur", "input", "clear", "keydown", "keyup"],
  data() {
    return {
      focus: false
    };
  },
  props: {
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
      type: [String, Boolean],
      default: false,
      validator(value) {
        return [false, "none", "text", "decimal", "numeric", "tel", "search", "email", "url"].includes(value);
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
      default: false
    }
  },
  computed: {
    //图标转换
    parseIcon() {
      return (param) => {
        let icon = {
          spin: false,
          type: null,
          url: null,
          color: null,
          size: null
        };
        if (obj.common.isObject(param)) {
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
    //是否显示清除图标
    showClear() {
      if (this.disabled || this.readonly) {
        return false;
      }
      if (this.realValue && this.focus) {
        return true;
      }
      return false;
    },
    //清除图标样式
    clearStyle() {
      return {
        borderRadius: this.showSuffix ? 0 : "",
        paddingRight: this.showSuffix ? 0 : ""
      };
    },
    //输入框样式
    inputStyle() {
      return {
        paddingLeft: this.showPrefix ? 0 : "",
        paddingRight: this.showSuffix || this.showClear && this.clearable ? 0 : "",
        textAlign: this.align ? this.align : ""
      };
    },
    //输入框父容器样式
    fieldBodyStyle() {
      let style = {};
      if (this.focus && this.activeColor) {
        style.borderColor = this.activeColor;
        const rgb = obj.color.hex2rgb(this.activeColor);
        style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`;
      }
      return style;
    },
    //输入框父容器样式类
    fieldBodyClass() {
      let cls = ["mvi-field-body"];
      if (this.showPrepend) {
        cls.push("left-none-radius");
      }
      if (this.showAppend) {
        cls.push("right-none-radius");
      }
      if (!this.activeColor && this.activeType && this.focus) {
        cls.push(this.activeType);
      }
      return cls;
    },
    //输入框组件样式类
    fieldClass() {
      let cls = ["mvi-field", this.size];
      if (this.type == "textarea") {
        return cls;
      }
      if (this.round) {
        cls.push("round");
      } else if (this.square) {
        cls.push("square");
      }
      return cls;
    },
    //输入框的类型
    cmpType() {
      if (this.type == "number") {
        return "text";
      }
      return this.type;
    },
    //文本域的rows
    rowsFilter() {
      let rows = this.rows;
      if (obj.common.isObject(this.autosize)) {
        if (obj.number.isNumber(this.autosize.minRows)) {
          if (this.rows < this.autosize.minRows) {
            rows = this.autosize.minRows;
          }
        }
        if (obj.number.isNumber(this.autosize.maxRows)) {
          if (this.rows > this.autosize.maxRows) {
            rows = this.autosize.maxRows;
          }
        }
      }
      return rows;
    },
    //输入框的值
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
    },
    //是否显示prepend
    showPrepend() {
      if (this.type == "textarea") {
        return false;
      }
      return this.parseIcon(this.prepend).type || this.parseIcon(this.prepend).url || this.$slots.prepend;
    },
    //是否显示prefix
    showPrefix() {
      if (this.type == "textarea") {
        return false;
      }
      return this.parseIcon(this.prefix).type || this.parseIcon(this.prefix).url || this.$slots.prefix;
    },
    //显示suffix
    showSuffix() {
      if (this.type == "textarea") {
        return false;
      }
      return this.parseIcon(this.suffix).type || this.parseIcon(this.suffix).url || this.$slots.suffix;
    },
    //是否显示prepend
    showPrepend() {
      if (this.type == "textarea") {
        return false;
      }
      return this.parseIcon(this.prepend).type || this.parseIcon(this.prepend).url || this.$slots.prepend;
    },
    //是否显示append
    showAppend() {
      if (this.type == "textarea") {
        return false;
      }
      return this.parseIcon(this.append).type || this.parseIcon(this.append).url || this.$slots.append;
    }
  },
  components: {
    Icon
  },
  watch: {
    realValue() {
      this.$nextTick(() => {
        if (this.$refs.textarea && (this.autosize == true || obj.common.isObject(this.autosize))) {
          this.autosizeSet();
        }
      });
    },
    rows() {
      this.$nextTick(() => {
        if (this.$refs.textarea) {
          this.setMaxMinHeight();
        }
      });
    },
    autosize() {
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
      if (this.autosize == true || obj.common.isObject(this.autosize)) {
        this.autosizeSet();
      }
    }
  },
  methods: {
    //高度自适应设置
    autosizeSet() {
      this.$refs.textarea.style.overflow = "hidden";
      this.$refs.textarea.style.height = "auto";
      this.$refs.textarea.scrollTop = 0;
      this.$refs.textarea.style.height = obj.element.getScrollHeight(this.$refs.textarea) + "px";
    },
    //行数转为高度
    rows2Height(rows) {
      let lineHeight = Math.floor(parseFloat(obj.element.getCssStyle(this.$refs.textarea, "line-height")));
      return rows * lineHeight;
    },
    //设置最大高度和最小高度
    setMaxMinHeight() {
      if (obj.common.isObject(this.autosize)) {
        if (obj.number.isNumber(this.autosize.maxRows)) {
          let maxHeight = this.rows2Height(this.autosize.maxRows) + parseFloat(obj.element.getCssStyle(this.$refs.textarea, "padding-top")) + parseFloat(obj.element.getCssStyle(this.$refs.textarea, "padding-bottom"));
          this.$refs.textarea.style.maxHeight = maxHeight + "px";
        }
        if (obj.number.isNumber(this.autosize.minRows)) {
          let minHeight = this.rows2Height(this.autosize.minRows) + parseFloat(obj.element.getCssStyle(this.$refs.textarea, "padding-top")) + parseFloat(obj.element.getCssStyle(this.$refs.textarea, "padding-bottom"));
          this.$refs.textarea.style.minHeight = minHeight + "px";
        }
      } else {
        this.$refs.textarea.style.maxHeight = "";
        this.$refs.textarea.style.minHeight = "";
      }
    },
    //输入框键盘按下
    keydown(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("keydown", e, this.realValue);
    },
    //输入框键盘松开
    keyup(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("keyup", e, this.realValue);
    },
    //输入框获取焦点
    inputFocus() {
      if (this.disabled) {
        return;
      }
      this.focus = true;
      this.$emit("focus", this.realValue);
    },
    //输入框失去焦点
    inputBlur() {
      if (this.disabled) {
        return;
      }
      setTimeout(() => {
        this.focus = false;
        this.$emit("blur", this.realValue);
      }, 200);
    },
    //输入框实时输入
    input() {
      if (this.disabled) {
        return;
      }
      this.$emit("input", this.realValue);
    },
    //点击前置
    prependClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("prepend-click", this.realValue);
    },
    //点击前缀
    prefixClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("prefix-click", this.realValue);
    },
    //点击后置
    appendClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("append-click", this.realValue);
    },
    //点击后缀
    suffixClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("suffix-click", this.realValue);
    },
    //清除
    doClear() {
      if (this.disabled) {
        return;
      }
      if (!this.clearable) {
        return;
      }
      setTimeout(() => {
        this.realValue = "";
        let el = this.$refs.input || this.$refs.textarea;
        el.focus();
        this.$emit("clear", this.realValue);
      }, 210);
    }
  }
};
const _hoisted_1$1 = ["disabled", "data-type"];
const _hoisted_2$1 = ["disabled", "readonly", "placeholder", "maxlength", "name", "autofocus", "rows"];
const _hoisted_3 = ["disabled", "readonly", "type", "placeholder", "inputmode", "maxlength", "name", "autofocus"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.fieldClass),
    disabled: $props.disabled || null,
    "data-type": $props.type
  }, [
    $options.showPrepend ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "mvi-field-prepend",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.prependClick && $options.prependClick(...args))
    }, [
      _ctx.$slots.prepend ? renderSlot(_ctx.$slots, "prepend", { key: 0 }, void 0, true) : (openBlock(), createBlock(_component_Icon, {
        key: 1,
        type: $options.parseIcon(this.prepend).type,
        url: $options.parseIcon(this.prepend).url,
        spin: $options.parseIcon(this.prepend).spin,
        size: $options.parseIcon(this.prepend).size,
        color: $options.parseIcon(this.prepend).color
      }, null, 8, ["type", "url", "spin", "size", "color"]))
    ])) : createCommentVNode("", true),
    createElementVNode("div", {
      class: normalizeClass($options.fieldBodyClass),
      style: normalizeStyle($options.fieldBodyStyle)
    }, [
      $options.showPrefix ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "mvi-field-prefix",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.prefixClick && $options.prefixClick(...args))
      }, [
        _ctx.$slots.prefix ? renderSlot(_ctx.$slots, "prefix", { key: 0 }, void 0, true) : (openBlock(), createBlock(_component_Icon, {
          key: 1,
          type: $options.parseIcon(this.prefix).type,
          url: $options.parseIcon(this.prefix).url,
          spin: $options.parseIcon(this.prefix).spin,
          size: $options.parseIcon(this.prefix).size,
          color: $options.parseIcon(this.prefix).color
        }, null, 8, ["type", "url", "spin", "size", "color"]))
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
        onInput: _cache[5] || (_cache[5] = (...args) => $options.input && $options.input(...args)),
        onKeydown: _cache[6] || (_cache[6] = (...args) => $options.keydown && $options.keydown(...args)),
        onKeyup: _cache[7] || (_cache[7] = (...args) => $options.keyup && $options.keyup(...args))
      }, null, 44, _hoisted_2$1)), [
        [vModelText, $options.realValue]
      ]) : withDirectives((openBlock(), createElementBlock("input", {
        key: 2,
        ref: "input",
        disabled: $props.disabled || null,
        readonly: $props.readonly || null,
        class: normalizeClass(["mvi-field-input", $options.showPrefix ? "left-none-radius" : "", $options.showSuffix || $props.clearable && $options.showClear && $props.type != "textarea" ? "right-none-radius" : ""]),
        style: normalizeStyle($options.inputStyle),
        type: $options.cmpType,
        placeholder: $props.placeholder,
        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $options.realValue = $event),
        autocomplete: "off",
        inputmode: $props.inputMode,
        onFocus: _cache[9] || (_cache[9] = (...args) => $options.inputFocus && $options.inputFocus(...args)),
        onBlur: _cache[10] || (_cache[10] = (...args) => $options.inputBlur && $options.inputBlur(...args)),
        maxlength: $props.maxlength,
        name: $props.name,
        autofocus: $props.autofocus,
        onInput: _cache[11] || (_cache[11] = (...args) => $options.input && $options.input(...args)),
        onKeydown: _cache[12] || (_cache[12] = (...args) => $options.keydown && $options.keydown(...args)),
        onKeyup: _cache[13] || (_cache[13] = (...args) => $options.keyup && $options.keyup(...args))
      }, null, 46, _hoisted_3)), [
        [vModelDynamic, $options.realValue]
      ]),
      $props.clearable && $props.type != "textarea" ? withDirectives((openBlock(), createElementBlock("div", {
        key: 3,
        class: "mvi-field-clear",
        style: normalizeStyle($options.clearStyle),
        onClick: _cache[14] || (_cache[14] = (...args) => $options.doClear && $options.doClear(...args))
      }, [
        createVNode(_component_Icon, { type: "times-o" })
      ], 4)), [
        [vShow, $options.showClear]
      ]) : createCommentVNode("", true),
      $options.showSuffix ? (openBlock(), createElementBlock("div", {
        key: 4,
        class: "mvi-field-suffix",
        onClick: _cache[15] || (_cache[15] = (...args) => $options.suffixClick && $options.suffixClick(...args))
      }, [
        _ctx.$slots.suffix ? renderSlot(_ctx.$slots, "suffix", { key: 0 }, void 0, true) : (openBlock(), createBlock(_component_Icon, {
          key: 1,
          type: $options.parseIcon(this.suffix).type,
          url: $options.parseIcon(this.suffix).url,
          spin: $options.parseIcon(this.suffix).spin,
          size: $options.parseIcon(this.suffix).size,
          color: $options.parseIcon(this.suffix).color
        }, null, 8, ["type", "url", "spin", "size", "color"]))
      ])) : createCommentVNode("", true)
    ], 6),
    $options.showAppend ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: "mvi-field-append",
      onClick: _cache[16] || (_cache[16] = (...args) => $options.appendClick && $options.appendClick(...args))
    }, [
      _ctx.$slots.append ? renderSlot(_ctx.$slots, "append", { key: 0 }, void 0, true) : (openBlock(), createBlock(_component_Icon, {
        key: 1,
        type: $options.parseIcon(this.append).type,
        url: $options.parseIcon(this.append).url,
        spin: $options.parseIcon(this.append).spin,
        size: $options.parseIcon(this.append).size,
        color: $options.parseIcon(this.append).color
      }, null, 8, ["type", "url", "spin", "size", "color"]))
    ])) : createCommentVNode("", true)
  ], 10, _hoisted_1$1);
}
const Field = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-447364fb"]]);
Field.install = (app) => {
  app.component(Field.name, Field);
};
const row_vue_vue_type_style_index_0_scoped_3f4f3a9a_lang = "";
const _sfc_main$3 = {
  name: "m-row",
  props: {
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
      if (obj.common.isObject(this.xs)) {
        if (obj.number.isNumber(this.xs.span)) {
          cls.push("mvi-col-xs-" + this.xs.span);
        }
        if (obj.number.isNumber(this.xs.offset)) {
          cls.push("mvi-col-offset-xs-" + this.xs.offset);
        }
      } else if (obj.number.isNumber(this.xs)) {
        cls.push("mvi-col-xs-" + this.xs);
      }
      if (obj.common.isObject(this.sm)) {
        if (obj.number.isNumber(this.sm.span)) {
          cls.push("mvi-col-sm-" + this.sm.span);
        }
        if (obj.number.isNumber(this.sm.offset)) {
          cls.push("mvi-col-offset-sm-" + this.sm.offset);
        }
      } else if (obj.number.isNumber(this.sm)) {
        cls.push("mvi-col-sm-" + this.sm);
      }
      if (obj.common.isObject(this.md)) {
        if (obj.number.isNumber(this.md.span)) {
          cls.push("mvi-col-md-" + this.md.span);
        }
        if (obj.number.isNumber(this.md.offset)) {
          cls.push("mvi-col-offset-md-" + this.md.offset);
        }
      } else if (obj.number.isNumber(this.md)) {
        cls.push("mvi-col-md-" + this.md);
      }
      if (obj.common.isObject(this.lg)) {
        if (obj.number.isNumber(this.lg.span)) {
          cls.push("mvi-col-lg-" + this.lg.span);
        }
        if (obj.number.isNumber(this.lg.offset)) {
          cls.push("mvi-col-offset-lg-" + this.lg.offset);
        }
      } else if (obj.number.isNumber(this.lg)) {
        cls.push("mvi-col-lg-" + this.lg);
      }
      if (obj.common.isObject(this.xl)) {
        if (obj.number.isNumber(this.xl.span)) {
          cls.push("mvi-col-xl-" + this.xl.span);
        }
        if (obj.number.isNumber(this.xl.offset)) {
          cls.push("mvi-col-offset-xl-" + this.xl.offset);
        }
      } else if (obj.number.isNumber(this.xl)) {
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
const form_vue_vue_type_style_index_0_scoped_318b5f2d_lang = "";
const _sfc_main$1 = {
  name: "m-form",
  props: {
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
  },
  computed: {
    formStyle() {
      return {
        width: this.block && this.width ? this.width : ""
      };
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
    class: normalizeClass(["mvi-form", $props.block ? "block" : ""]),
    style: normalizeStyle($options.formStyle)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 6);
}
const Form = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-318b5f2d"]]);
Form.install = (app) => {
  app.component(Form.name, Form);
};
const formEl_vue_vue_type_style_index_0_scoped_5f7982ad_lang = "";
const _sfc_main = {
  name: "m-form-el",
  props: {
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
  },
  inject: ["form"],
  computed: {
    labelCls() {
      let cls = ["mvi-form-label"];
      if (this.form.labelBlock && this.form.block) {
        cls.push("block");
      }
      return cls;
    },
    labelStyle() {
      let style = {};
      if (!this.form.labelBlock) {
        if (this.labelWidth) {
          style.width = this.labelWidth;
        } else if (this.form.labelWidth) {
          style.width = this.form.labelWidth;
        }
      }
      if (this.labelOffset) {
        if (this.form.labelBlock) {
          style.marginBottom = this.labelOffset;
        } else {
          style.marginRight = this.labelOffset;
        }
      } else if (this.form.labelOffset) {
        if (this.form.labelBlock) {
          style.marginBottom = this.form.labelOffset;
        } else {
          style.marginRight = this.form.labelOffset;
        }
      }
      return style;
    },
    formElStyle() {
      let style = {};
      if (this.width) {
        style.width = this.width;
      }
      if (this.align) {
        style.alignItems = this.align;
      } else if (this.form.align) {
        style.alignItems = this.form.align;
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
    class: normalizeClass(["mvi-form-el", $options.form.block ? "block" : ""]),
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
const FormEl = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5f7982ad"]]);
FormEl.install = (app) => {
  app.component(FormEl.name, FormEl);
};
const install = (app) => {
  const components = {
    Dap: obj,
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
    Image: Image$1,
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
    Row,
    Col,
    Form,
    FormEl
  };
  Object.values(components).map((component) => {
    component.install(app);
  });
};
const version = "1.8.65";
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
  obj as Dap,
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
