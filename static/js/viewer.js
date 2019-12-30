/ *！ *
Viewer.js v1 .0 .0 - beta .1 *
  https: //github.com/fengyuanchen/viewerjs
  *
  *
  版权所有（ c） 2015 - 2017 陈凤元 *
  根据MIT许可发布 *
  *
  日期： 2017 - 12 - 23 T04： 31： 53.438 Z *
  /

（ 功能（ 全局， 工厂） {
  typeof出口 === '对象' && typeof模块！ == '未定义'？
  module.exports = factory（）：
  typeof define === 'function' && define.amd吗？ define（ 工厂）：（ global.Viewer = factory（））;
}（
this，（
function（） {
  'use strict';

  var DEFAULTS = {
    //启用内联模式
    内联： false，

    //在查看器的右上角显示按钮
    按钮： 是的，

    //显示导航栏
    导航栏： 是的，

    //显示标题
    标题： 是的，

    //显示工具栏
    工具栏： 是的，

    //放大或缩小时，以图像比例（百分比）显示工具提示
    工具提示： 是的，

    //启用移动图像
    可移动： 正确，

    //启用缩放图像
    zoomable： 正确，

    //启用旋转图片
    可旋转： 正确，

    //启用缩放图像
    可扩展性： true，

    //为某些特殊元素启用CSS3过渡
    过渡： 正确，

    //启用播放时请求全屏显示
    全屏显示： 是的，

    //启用键盘支持
    键盘： 是的，

    //启用模式背景，为不会在点击时关闭模式的背景指定“静态”
    背景： 真实，

    //启用循环查看。
    循环： 假，

    //内联模式下查看器的最小宽度
    minWidth： 200，

    //内联模式下查看器的最小高度
    minHeight： 100，

    //通过滚轮鼠标缩放图像时定义比例
    zoomRatio： 0.1，

    //定义缩小时图像的最小比例
    minZoomRatio： 0.01，

    //定义放大时图像的最大比例
    maxZoomRatio： 100，

    //在模式模式下定义查看器的CSS“ z-index”值。
    zIndex： 2015 年，

    //以内联模式定义查看器的CSS“ z-index”值。
    zIndexInline： 0，

    //定义获取原始图像URL的位置
    //类型：字符串（图像属性）或函数（应返回图像URL）
    网址：“ src”，

    //过滤图像以供查看。
    //类型：函数（如果图像可见，则返回true）
    过滤器： null，

    //事件快捷键
    准备好： 空，
    显示： null，
    显示： null，
    隐藏： null，
    隐藏： null，
    查看： null，
    已查看： null
  };

  var TEMPLATE = '<div class =“ viewer-container”>' + '<div class =“ viewer-canvas”> </ div>' + '<div class =“ viewer-footer”>' + '<div class =“ viewer-title”> </ div>' + '<div class =“ viewer-toolbar”> </ div>' + '<div class =“ viewer-navbar”>' + '<ul class =“ viewer -list“> </ ul>' + '</ div>' + '</ div>' + '<div class =” viewer-tooltip“> </ div>' + '<div role =” button“类=“ viewer-button” data-action =“ mix”> </ div>' + '<div class =“ viewer-player”> </ div>' + '</ div>';

  var WINDOW = typeof window！ == '未定义'？
  窗口： {};
  var NAMESPACE = 'viewer';

  //动作
  var ACTION_MOVE = '移动';
  var ACTION_SWITCH = 'switch';
  var ACTION_ZOOM = 'zoom';

  //类
  var CLASS_ACTIVE = NAMESPACE + '-active';
  var CLASS_CLOSE = NAMESPACE + '-close';
  var CLASS_FADE = NAMESPACE + '-fade';
  var CLASS_FIXED = NAMESPACE + '-fixed';
  var CLASS_FULLSCREEN = 名称空间 + '-fullscreen';
  var CLASS_FULLSCREEN_EXIT = NAMESPACE + '-fullscreen-exit';
  var CLASS_HIDE = NAMESPACE + '-hide';
  var CLASS_HIDE_MD_DOWN = NAMESPACE + '-hide-md-down';
  var CLASS_HIDE_SM_DOWN = NAMESPACE + '-hide-sm-down';
  var CLASS_HIDE_XS_DOWN = NAMESPACE + '-hide-xs-down';
  var CLASS_IN = NAMESPACE + '-in';
  var CLASS_INVISIBLE = 名称空间 + '-invisible';
  var CLASS_MOVE = NAMESPACE + '-move';
  var CLASS_OPEN = NAMESPACE + '-open';
  var CLASS_SHOW = NAMESPACE + '-show';
  var CLASS_TRANSITION = NAMESPACE + '-transition';

  //活动
  var EVENT_READY = '就绪';
  var EVENT_SHOW = '显示';
  var EVENT_SHOWN = '显示';
  var EVENT_HIDE = '隐藏';
  var EVENT_HIDDEN = '隐藏';
  var EVENT_VIEW = 'view';
  var EVENT_VIEWED = '已查看';
  var EVENT_CLICK = '点击';
  var EVENT_DRAG_START = 'dragstart';
  var EVENT_KEY_DOWN = 'keydown';
  var EVENT_LOAD = '负载';
  var EVENT_POINTER_DOWN = WINDOW.PointerEvent吗？ 'pointerdown'：
  'touchstart mousedown';
  var EVENT_POINTER_MOVE = WINDOW.PointerEvent吗？ 'pointermove'：
  'mousemove touchmove';
  var EVENT_POINTER_UP = WINDOW.PointerEvent吗？ 'pointeruppointercancel'：
  'touchend touchcancel mouseup';
  var EVENT_RESIZE = '调整大小';
  var EVENT_TRANSITION_END = 'transitionend';
  var EVENT_WHEEL = '鼠标滚轮DOMMouseScroll';

  var BUTTONS = [“放大”，“ 缩小”，“ 一对一”，“ 重置”，“ 上一个”，“ 播放”，“ 下一个”，“ 向左旋转”，“ 向右旋转” '，'
    水平翻转 '，'
    垂直翻转 ']；

    var _typeof = typeof Symbol === “ function” && typeof Symbol.iterator === “symbol” 吗？ 函数（ obj） {
      返回typeof obj;
    }：
    函数（ obj） {
      返回obj && typeof Symbol === “ function” && obj.constructor === Symbol && obj！ == Symbol.prototype吗？“ symbol”： typeof obj;
    };











    var classCallCheck = 函数（ 实例， 构造函数） {
      if（！（ instance instanceof Constructor）） {
        抛出新的TypeError（“ 不能将类作为函数调用”）；
      }
    };

    var createClass = function（） {
      函数defineProperties（ target， props） {
        for（
        var i = 0;
        i < props.length;
        i++）{
          var描述符 = props[i];
          descriptor.enumerable = 描述符.enumerable || 假;
          descriptor.configurable = true;
          if（ 描述符中的“ 值”） 描述符。 writable = true；
          Object.defineProperty（ target， descriptor.key， descriptor）;
        }
      }

      返回函数（ 构造函数， protoProps， staticProps） {
        如果（ protoProps） defineProperties（ Constructor.prototype， protoProps）;
        如果（ staticProps） defineProperties（ Constructor， staticProps）;
        返回构造函数；
      };
    }（）;

    / ** *
    检查给定值是否为字符串。 *
    @param {
      *
    }
    value - 要检查的值。 *
    @returns {
      boolean
    }
    如果给定值是字符串， 则返回true， 否则返回false。 *
    /
    函数isString（ value） {
      返回typeof值 === '字符串';
    }

    / ** *
    检查给定值是否不是数字。 *
    /
    var isNaN = Number.isNaN || WINDOW.isNaN;

    / ** *
    检查给定值是否为数字。 *
    @param {
      *
    }
    value - 要检查的值。 *
    @returns {
      boolean
    }
    如果给定值是数字， 则返回true， 否则返回false。 *
    /
    函数isNumber（ value） {
      返回typeof值 === '数字' && ！isNaN（ value）;
    }

    / ** *
    检查给定值是否未定义。 *
    @param {
      *
    }
    value - 要检查的值。 *
    @returns {
      boolean
    }
    如果给定值未定义， 则返回“ true”， 否则返回“ false”。 *
    /
    函数isUndefined（ value） {
      返回typeof值 === '未定义';
    }

    / ** *
    检查给定值是否为对象。 *
    @param {
      *
    }
    value - 要检查的值。 *
    @returns {
      boolean
    }
    如果给定值是一个对象， 则返回true， 否则返回false。 *
    /
    函数isObject（ value） {
      return（ typeof value === 'undefined'？
      'undefined'：
      _typeof（ value）） === 'object' && value！ == null;
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    / ** *
    检查给定值是否为普通对象。 *
    @param {
      *
    }
    value - 要检查的值。 *
    @returns {
      boolean
    }
    如果给定值是纯对象， 则返回true， 否则返回false。 *
    /

    函数isPlainObject（ value） {
      如果（！ isObject（ value）） {
        返回false；
      }

      尝试 {
        var _constructor = value.constructor;
        var prototype = _constructor.prototype;


        返回_constructor && 原型 && hasOwnProperty.call（ prototype， 'isPrototypeOf'）;
      }
      抓住（ e） {
        返回false；
      }
    }

    / ** *
    检查给定值是否为函数。 *
    @param {
      *
    }
    value - 要检查的值。 *
    @returns {
      boolean
    }
    如果给定值是一个函数， 则返回true， 否则返回false。 *
    /
    函数isFunction（ value） {
      返回typeof值 === '函数';
    }

    / ** *
    迭代给定的数据。 *
    @param {
      *
    }
    data - 要迭代的数据。 *
    @param {
      Function
    }
    回调 - 每个元素的过程函数。 *
    @returns {
      *
    }
    原始数据。 *
    /
    函数each（ data， callback） {
      if（ data && isFunction（ callback）） {
        如果（ Array.isArray（ data） || isNumber（ data.length） / * 类似数组 * /）{
        var length = data.length;

        var i = void 0;

        对于（ i = 0;
        i < 长度;
        i + = 1） {
          if（ callback.call（ data， data[i]， i， data） === false） {
            打破;
          }
        }
      } else if（ isObject（ data）） {
        Object.keys（ data）.forEach（
        function（ key） {
          callback.call（ data， data[key]， key， data）;
        }）;
      }
    }

    返回数据；
  }

  / ** *
  扩展给定的对象。
    *
    @param {
      *
    }
  obj - 要扩展的对象。 *
    @param {
      *
    }
  args - 将合并到第一个对象的其余对象。 *
    @returns {
      Object
    }
  扩展对象。
    *
    /
  函数extend（ obj） {
    for（
    var _len = arguments.length， args = Array（ _len > 1？ _len - 1： 0）， _key = 1;
    _key < _len;
    _key++）{
      args[_key - 1] = arguments[_key];
    }

    如果（ isObject（ obj） && args.length > 0） {
      如果（ Object.assign） {
        返回Object.assign.apply（ Object，[obj].concat（ args））;
      }

      args.forEach（
      function（ arg） {
        如果（ isObject（ arg）） {
          Object.keys（ arg）.forEach（
          function（ key） {
            obj[key] = arg[key];
          }）;
        }
      }）;
    }

    返回obj;
  }

  / ** *
  接受一个函数并返回一个始终具有特定上下文的新函数。
    *
    @param {
      Function
    }
  fn - 目标函数。 *
    @param {
      Object
    }
  上下文 - 函数的新上下文。 *
    @returns {
      Function
    }
  新功能。
    *
    /
  功能Proxy（ fn， context） {
    for（
    var _len2 = arguments.length， args = Array（ _len2 > 2？ _len2 - 2： 0）， _key2 = 2;
    _key2 < _len2;
    _key2++）{
      args[_key2 - 2] = arguments[_key2];
    }

    返回函数（） {
      for（
      var _len3 = arguments.length， args2 = Array（ _len3）， _key3 = 0;
      _key3 < _len3;
      _key3++）{
        args2[_key3] = arguments[_key3];
      }

      返回fn.apply（ 上下文， args.concat（ args2））;
    };
  }

  var REGEXP_SUFFIX = / ^（width | height | left | top | marginLeft | marginTop）$ /;

  / ** *
  将样式应用于给定元素。
    *
    @param {
      Element
    }
  元素 - 目标元素。 *
    @param {
      Object
    }
  样式 - 适用的样式。 *
    /
  函数setStyle（ element， styles） {
    var style = element.style;


    每个（ 样式， 函数（ 值， 属性） {
      如果（ REGEXP_SUFFIX.test（ property） && isNumber（ value）） {
        值 + = 'px';
      }

      样式[属性] = 值；
    }）;
  }

  / ** *
  从给定的元素中获取样式。
    *
    @param {
      Element
    }
  元素 - 目标元素。 *
    @returns {
      Object
    }
  元素的样式。
    *
    /
  函数getStyle（ element） {
    返回window.getComputedStyle？ window.getComputedStyle（ element， null）： element.currentStyle;
  }

  / ** *
  检查给定元素是否具有特殊类。
    *
    @param {
      Element
    }
  元素 - 要检查的元素。 *
    @param {
      string
    }
  值 - 要搜索的类。 *
    @returns {
      boolean
    }
  如果发现特殊类， 则返回“ true”。
    *
    /
  函数hasClass（ element， value） {
    返回element.classList吗？ element.classList.contains（ value）： element.className.indexOf（ value） > -1;
  }

  / ** *
  将类添加到给定的元素。
    *
    @param {
      Element
    }
  元素 - 目标元素。 *
    @param {
      string
    }
  值 - 要添加的类。 *
    /
  函数addClass（ element， value） {
    如果（！ value） {
      返回;
    }

    如果（ isNumber（ element.length）） {
      每个（ 元素， 函数（ 元素） {
        addClass（ elem， value）;
      }）;
      返回;
    }

    如果（ element.classList） {
      element.classList.add（ value）;
      返回;
    }

    var className = element.className.trim（）;

    如果（！ className） {
      element.className = 值;
    }
    否则， 如果（ className.indexOf（ value） < 0） {
      element.className = className + '' + 值;
    }
  }

  / ** *
  从给定元素中删除类。
    *
    @param {
      Element
    }
  元素 - 目标元素。 *
    @param {
      string
    }
  值 - 要删除的类。 *
    /
  函数removeClass（ element， value） {
    如果（！ value） {
      返回;
    }

    如果（ isNumber（ element.length）） {
      每个（ 元素， 函数（ 元素） {
        removeClass（ elem， value）;
      }）;
      返回;
    }

    如果（ element.classList） {
      element.classList.remove（ value）;
      返回;
    }

    如果（ element.className.indexOf（ value） > = 0） {
      element.className = element.className.replace（ value， ''）;
    }
  }

  / ** *
  从给定元素添加或删除类。
    *
    @param {
      Element
    }
  元素 - 目标元素。 *
    @param {
      string
    }
  值 - 要切换的类。 *
    添加了 @param {
      boolean
    } - 仅添加。 *
    /
  函数toggleClass（ 元素， 值， 添加） {
    如果（！ value） {
      返回;
    }

    如果（ isNumber（ element.length）） {
      每个（ 元素， 函数（ 元素） {
        toggleClass（ 元素， 值， 添加）;
      }）;
      返回;
    }

    // IE10-11不支持`classList.toggle`的第二个参数
    如果（ 添加） {
      addClass（ element， value）;
    }
    其他 {
      removeClass（ element， value）;
    }
  }

  var REGEXP_HYPHENATE = /（[[az \ d]）（[AZ]）/
  g;

  / ** *
  给定值连字符。
    *
    @param {
      string
    }
  value - 要连字符的值。 *
    @returns {
      string
    }
  连字符的值。
    *
    /
  函数连字符（ 值） {
    return value.replace（ REGEXP_HYPHENATE， '$ 1- $ 2'）。
    toLowerCase（）;
  }

  / ** *
  从给定的元素获取数据。
    *
    @param {
      Element
    }
  元素 - 目标元素。 *
    @param {
      string
    }
  名称 - 要获取的数据键。 *
    @returns {
      string
    }
  数据值。
    *
    /
  函数getData（ element， name） {
    如果（ isObject（ element[name]）） {
      返回元素[名称];
    } else if（ element.dataset） {
      返回element.dataset[name];
    }

    返回element.getAttribute（ 'data-' + 连字符（ name））;
  }

  / ** *
  将数据设置为给定元素。
    *
    @param {
      Element
    }
  元素 - 目标元素。 *
    @param {
      string
    }
  名称 - 要设置的数据键。 *
    @param {
      string
    }
  data - 数据值。 *
    /
  函数setData（ element， name， data） {
    如果（ isObject（ data）） {
      element[name] = 数据；
    } else if（ element.dataset） {
      element.dataset[名称] = 数据；
    }
    其他 {
      element.setAttribute（ 'data-' + 连字符（ name）， 数据）;
    }
  }

  / ** *
  从给定元素中删除数据。
    *
    @param {
      Element
    }
  元素 - 目标元素。 *
    @param {
      string
    }
  名称 - 要删除的数据键。 *
    /
  函数removeData（ element， name） {
    如果（ isObject（ element[name]）） {
      尝试 {
        删除元素[名称];
      }
      抓住（ e） {
        element[name] = null;
      }
    } else if（ element.dataset） {
      尝试 {
        删除element.dataset[name];
      }
      抓住（ e） {
        element.dataset[name] = null;
      }
    }
    其他 {
      element.removeAttribute（ 'data-' + 连字符（ name））;
    }
  }

  var REGEXP_SPACES = / \ s + /;;

  / ** *
  从目标元素中删除事件侦听器。
    *
    @param {
      Element
    }
  元素 - 事件目标。 *
    @param {
      string
    }
  type - 事件类型。 *
    @param {
      Function
    }
  监听器 - 事件监听器。 *
    @param {
      Object
    }
  选项 - 事件选项。 *
    /
  函数removeListener（ element， type， listener） {
    var options = arguments.length > 3 && arguments[3]！ == 未定义？ arguments[3]： {};

    如果（！ isFunction（ listener）） {
      返回;
    }

    var types = type.trim（）。 split（ REGEXP_SPACES）;

    如果（ types.length > 1） {
      每个（ 类型， 函数[t] {
        removeListener（ element， t， 监听器， 选项）;
      }）;
      返回;
    }

    如果（ element.removeEventListener） {
      element.removeEventListener（ type， listener， options）;
    } else if（ element.detachEvent） {
      element.detachEvent（ 'on' + 类型， 监听器）;
    }
  }

  / ** *
  将事件侦听器添加到目标元素。
    *
    @param {
      Element
    }
  元素 - 事件目标。 *
    @param {
      string
    }
  type - 事件类型。 *
    @param {
      Function
    }
  监听器 - 事件监听器。 *
    @param {
      Object
    }
  选项 - 事件选项。 *
    /
  函数addListener（ element， type， _listener） {
    var options = arguments.length > 3 && arguments[3]！ == 未定义？ arguments[3]： {};

    如果（！ isFunction（ _listener）） {
      返回;
    }

    var types = type.trim（）。 split（ REGEXP_SPACES）;

    如果（ types.length > 1） {
      每个（ 类型， 函数[t] {
        addListener（ element， t， _listener， options）;
      }）;
      返回;
    }

    如果（ options.once） {
      var originalListener = _listener;

      _listener = 函数listener（） {
        for（
        var _len4 = arguments.length， args = Array（ _len4）， _key4 = 0;
        _key4 < _len4;
        _key4++）{
          args[_key4] = arguments[_key4];
        }

        removeListener（ element， type， _listener， options）;
        返回originalListener.apply（ element， args）;
      };
    }

    如果（ element.addEventListener） {
      element.addEventListener（ type， _listener， options）;
    } else if（ element.attachEvent） {
      element.attachEvent（ 'on' + type， _listener）;
    }
  }

  / ** *
  在目标元素上调度事件。
    *
    @param {
      Element
    }
  元素 - 事件目标。 *
    @param {
      string
    }
  type - 事件类型。 *
    @param {
      Object
    }
  数据 - 附加事件数据。 *
    @returns {
      boolean
    }
  指示是否默认阻止该事件。
    *
    /
  函数dispatchEvent（ element， type， data） {
    如果（ element.dispatchEvent） {
      var event = void 0;

      // IE9-11上的事件和CustomEvent是全局对象，而不是构造函数
      如果（ isFunction（ Event） && isFunction（ CustomEvent）） {
        如果（ isUndefined（ data）） {
          事件 = 新事件（ 类型， {
            气泡： 是的，
            可取消： true
          }）;
        }
        其他 {
          event = new CustomEvent（ type， {
            详细信息： 数据，
            气泡： 是的，
            可取消： true
          }）;
        }
      } else if（ isUndefined（ data）） {
        event = document.createEvent（ 'Event'）;
        event.initEvent（ type， true， true）;
      }
      其他 {
        event = document.createEvent（ 'CustomEvent'）;
        event.initCustomEvent（ type， true， true， data）;
      }

      // IE9 +
      返回element.dispatchEvent（ event）;
    } else if（ element.fireEvent） {
      // IE6-10（仅限本地事件）
      返回element.fireEvent（ 'on' + type）;
    }

    返回true；
  }

  / ** *
  根据凭证获取偏移量。
    *
    @param {
      Element
    }
  元素 - 目标元素。 *
    @returns {
      Object
    }
  偏移数据。
    *
    /
  函数getOffset（ element） {
    var doc = document.documentElement;
    var box = element.getBoundingClientRect（）;

    返回 {
      左： box.left + （（window.scrollX || doc && doc.scrollLeft || 0） - （doc && doc.clientLeft || 0）），
      top： box.top + （（window.scrollY || doc && doc.scrollTop || 0） - （doc && doc.clientTop || 0））
    };
  }

  / ** *
  清空元素。
    *
    @param {
      Element
    }
  元素 - 要清空的元素。 *
    /
  函数empty（ element） {
    而（ element.firstChild） {
      element.removeChild（ element.firstChild）;
    }
  }

  / ** *
  根据给定的对象获取变换。
    *
    @param {
      Object
    }
  obj - 目标对象。 *
    @returns {
      string
    }
  字符串包含转换值。
    *
    /
  函数getTransforms（ _ref） {
    var rotation = _ref.rotate，
    scaleX = _ref.scaleX，
    scaleY = _ref.scaleY;

    var值 = []；

    如果（ isNumber（ rotate） && 旋转！ == 0） {
      values.push（ 'rotate（' + rotation + 'deg）'）;
    }

    如果（ isNumber（ scaleX） && scaleX！ == 1） {
      values.push（ 'scaleX（' + scaleX + '）'）;
    }

    如果（ isNumber（ scaleY） && scaleY！ == 1） {
      values.push（ 'scaleY（' + scaleY + '）'）;
    }

    var transform = values.length？ values.join（ ''）：
    'none';

    返回 {
      WebkitTransform： 转换，
      msTransform： 转换，
      变换： 变换
    };
  }

  / ** *
  从图片网址获取图片名称。
    *
    @param {
      string
    }
  网址 - 目标网址。 *
    @示例 * // picture.jpg
    *
    getImageNameFromURL（ 'http://domain.com/path/to/picture.jpg?size=1280×960'） *
    @returns {
      string
    }
  字符串包含图像名称。
    *
    /
  函数getImageNameFromURL（ url） {
    返回isString（ url） 吗？ url.replace（ / ^ .*\ //，''）.replace（/[?&#].*$/，''）：'';
  }

  var navigator = WINDOW.navigator;

  var IS_SAFARI_OR_UIWEBVIEW = 导航器 && /((Macintosh|iPhone|iPod|iPad)。*AppleWebKit/i.test(navigator.userAgent）;

    / ** *
    获取图像的自然尺寸。 *
    @param {
      string
    }
    图片 - 目​​ 标图片。 *
    @param {
      Function
    }
    回调 - 回调函数。 *
    /
    函数getImageNaturalSizes（ image， callback） {
      //现代浏览器（Safari除外）
      如果（ image.naturalWidth && ！IS_SAFARI_OR_UIWEBVIEW） {
        callback（ image.naturalWidth， image.naturalHeight）;
        返回;
      }

      var newImage = document.createElement（ 'img'）;
      var body = document.body || document.documentElement;

      newImage.onload = function（） {
        callback（ newImage.width， newImage.height）;
        body.removeChild（ newImage）;
      };

      newImage.src = image.src;
      newImage.style.cssText = 'left：0;' + '最大高度：无！重要；' + '最大宽度：无！重要;' + 'min-height：0！important;' + '最小宽度：0！重要;' + '不透明度：0;' + '位置：绝对；' + 'top：0;' + 'z-index：-1;';
      body.appendChild（ newImage）;
    }

    / ** *
    获取响应类型编号的相关类名称。 *
    @param {
      string
    }
    类型 - 响应类型。 *
    @returns {
      string
    }
    相关的类名。 *
    /
    函数getResponsiveClass（ type） {
      开关（ 类型） {
        情况2：
        返回CLASS_HIDE_XS_DOWN;

        情况3：
        返回CLASS_HIDE_SM_DOWN;

        情况4：
        返回CLASS_HIDE_MD_DOWN;

        默认：
        返回 '';
      }
    }

    / ** *
    获取一组指针的最大比率。 *
    @param {
      string
    }
    指针 - 目标指针。 *
    @returns {
      number
    }
    结果比率。 *
    /
    函数getMaxZoomRatio（ pointers） {
      varpoints2 = extend（ {}，
      pointers）;
      var ratios = [];

      每个（ 指针， 函数（ 指针， pointerId） {
        删除pointers2[pointerId]；

        每个（ pointers2， 函数（ pointer2） {
          var x1 = Math.abs（ pointer.startX - pointer2.startX）;
          var y1 = Math.abs（ pointer.startY - pointer2.startY）;
          var x2 = Math.abs（ pointer.endX - pointer2.endX）;
          var y2 = Math.abs（ pointer.endY - pointer2.endY）;
          var z1 = Math.sqrt（ x1 * x1 + y1 * y1）;
          var z2 = Math.sqrt（ x2 * x2 + y2 * y2）;
          var ratio = （z2 - z1） / z1;

          ratios.push（ ratio）;
        }）;
      }）;

      ratios.sort（
      function（ a， b） {
        返回Math.abs（ a） < Math.abs（ b）;
      }）;

      回报率[0]；
    }

    / ** *
    从事件对象获取指针。 *
    @param {
      Object
    }
    事件 - 目标事件对象。 *
    @param {
      boolean
    }
    endOnly - 指示是否仅返回终点坐标。 *
    @returns {
      Object
    }
    结果指针包含起点和 / 或终点坐标。 *
    /
    函数getPointer（ _ref2， endOnly） {
      var pageX = _ref2.pageX，
      pageY = _ref2.pageY;

      var end = {
        endX： pageX，
        endY： pageY
      };

      如果（ endOnly） {
        返回端
      }

      返回扩展（ {
        startX： pageX，
        startY： pageY
      }，
      结束）;
    }

    / ** *
    获取一组指针的中心点坐标。 *
    @param {
      Object
    }
    指针 - 目标指针。 *
    @returns {
      Object
    }
    中心点坐标。 *
    /
    函数getPointersCenter（ pointers） {
      var pageX = 0;
      var pageY = 0;
      var count = 0;

      每个（ 指针， 函数（ _ref3） {
        var startX = _ref3.startX，
        startY = _ref3.startY;

        pageX + = startX;
        pageY + = startY;
        计数 + = 1;
      }）;

      pageX / = 计数；
      pageY / = 计数；

      返回 {
        pageX： pageX，
        pageY： pageY
      };
    }

    var render = {
      渲染： 函数render（） {
        this.initContainer（）;
        this.initViewer（）;
        this.initList（）;
        this.renderViewer（）;
      }，
      initContainer： 函数initContainer（） {
        this.containerData = {
          宽度： window.innerWidth，
          高度： window.innerHeight
        };
      }，
      initViewer： 函数initViewer（） {
        var options = this.options，
        父母 = this.parent;

        var viewerData = void 0;

        如果（ options.inline） {
          viewerData = {
            宽度： Math.max（ parent.offsetWidth， options.minWidth），
            高度： Math.max（ parent.offsetHeight， options.minHeight）
          };

          this.parentData = viewerData;
        }

        如果（ this.fulled || ！viewerData） {
          viewerData = this.containerData;
        }

        this.viewerData = extend（ {}，
        viewerData）;
      }，
      renderViewer： 函数renderViewer（） {
        如果（ this.options.inline && ！this.fulled） {
          setStyle（ this.viewer， this.viewerData）;
        }
      }，
      initList： 函数initList（） {
        var _this = this;

        var element = this.element，
        选项 = this.options，
        list = this.list;

        var items = [];

        每个（ this.images， 函数（ image， i） {
          var src = image.src;

          var alt = image.alt || getImageNameFromURL（ src）;
          var url = options.url;


          如果（ isString（ url）） {
            url = image.getAttribute（ url）;
          } else if（ isFunction（ url）） {
            url = url.call（ image， image）;
          }

          如果（ src || url） {
            items.push（ '<li>' + '<img' + （'src =“' + （src || url） + '”'） + 'role =“ button”' + 'data-action =“ view” ' + （'data-index =“' + i + '”'） + （'data-original-url =“' + （url || src） + '”'） + （'alt =“' + alt + '“'） + '>' + '</ li>'）;
          }
        }）;

        list.innerHTML = items.join（ ''）;

        each（ list.getElementsByTagName（ 'img'），
        function（ image） {
          setData（ image， 'filled'，
          true）;
          addListener（ image， EVENT_LOAD， proxy（ _this.loadImage， _this）， {
            一次： 正确
          }）;
        }）;

        this.items = list.getElementsByTagName（ 'li'）;

        如果（ options.transition） {
          addListener（ element， EVENT_VIEWED，
          function（） {
            addClass（ list， CLASS_TRANSITION）;
          }， {
            一次： 正确
          }）;
        }
      }，
      renderList： 函数renderList（ index） {
        var i = 索引 || this.index;
        var width = this.items[i].offsetWidth || 30;
        var externalWidth = width + 1; // 1个像素的“左边距”宽度

        //将活动项放在屏幕中央
        setStyle（ this.list， {
          宽度： outerWidth * this.length，
          marginLeft：（ this.viewerData.width - width） / 2 - outsideWidth * i
        }）;
      }，
      resetList： 函数resetList（） {
        空（ this.list）;
        removeClass（ this.list， CLASS_TRANSITION）;
        setStyle（ {
          marginLeft： 0
        }）;
      }，
      initImage： 函数initImage（ callback） {
        var _this2 = this;

        var options = this.options，
        图片 = this.image，
        viewerData = this.viewerData;

        var footerHeight = this.footer.offsetHeight;
        var viewerWidth = viewerData.width;
        var viewerHeight = Math.max（ viewerData.height - footerHeight， footerHeight）;
        var oldImageData = this.ImageData || {};

        getImageNaturalSizes（ image，
        function（ naturalWidth， naturalHeight） {
          var AspectRatio = naturalWidth / naturalHeight;
          var width = viewerWidth;
          var height = viewerHeight;

          如果（ viewerHeight * AspectRatio > viewerWidth） {
            高度 = viewerWidth / AspectRatio;
          }
          其他 {
            宽度 = viewerHeight * AspectRatio;
          }

          width = Math.min（ width * 0.9， naturalWidth）;
          height = Math.min（ height * 0.9， naturalHeight）;

          var imageData = {
            naturalWidth： naturalWidth，
            naturalHeight： naturalHeight，
            AspectRatio： AspectRatio，
            比例： 宽度 / 自然宽度
            宽度： 宽度，
            高度： 高度
            左：（ viewerWidth - 宽度） / 2，
            顶部：（ 查看者高度 - 高度） / 2
          };
          var initialImageData = extend（ {}，
          imageData）;

          如果（ options.rotatable） {
            imageData.rotate = oldImageData.rotate || 0;
            initialImageData.rotate = 0;
          }

          如果（ options.scalable） {
            imageData.scaleX = oldImageData.scaleX || 1;
            imageData.scaleY = oldImageData.scaleY || 1;
            initialImageData.scaleX = 1;
            initialImageData.scaleY = 1;
          }

          _this2.imageData = imageData;
          _this2.initialImageData = initialImageData;

          如果（ isFunction（ 回调）） {
            打回来（）;
          }
        }）;
      }，
      renderImage： 函数renderImage（ callback） {
        var image = this.image，
        imageData = this.imageData;


        setStyle（ image， extend（ {
          宽度： imageData.width，
          高度： imageData.height，
          marginLeft： imageData.left，
          marginTop： imageData.top
        }，
        getTransforms（ imageData）））；

        如果（ isFunction（ 回调）） {
          如果（ this.transitioning） {
            addListener（ image， EVENT_TRANSITION_END， callback， {
              一次： 正确
            }）;
          }
          其他 {
            打回来（）;
          }
        }
      }，
      resetImage：
      function resetImage（） {
        var image = this.image;

        // this.image仅在查看后定义

        如果（ 图片） {
          image.parentNode.removeChild（ image）;
          this.image = null;
        }
      }
    };

    var events = {
      bind：
      function bind（） {
        var element = this.element，
        选项 = this.options，
        观看者 = this.viewer;


        如果（ isFunction（ options.view）） {
          addListener（ element， EVENT_VIEW， options.view）;
        }

        如果（ isFunction（ options.viewed）） {
          addListener（ element， EVENT_VIEWED， options.viewed）;
        }

        addListener（ viewer， EVENT_CLICK， this.onClick = proxy（ this.click， this））;
        addListener（ viewer， EVENT_WHEEL， this.onWheel = proxy（ this.wheel， this））;
        addListener（ viewer， EVENT_DRAG_START， this.onDragStart = proxy（ this.dragstart， this））;
        addListener（ this.canvas， EVENT_POINTER_DOWN， this.onPointerDown = proxy（ this.pointerdown， this））;
        addListener（ element.ownerDocument， EVENT_POINTER_MOVE， this.onPointerMove = proxy（ this.pointermove， this））;
        addListener（ element.ownerDocument， EVENT_POINTER_UP， this.onPointerUp = proxy（ this.pointerup， this））;
        addListener（ element.ownerDocument， EVENT_KEY_DOWN， this.onKeyDown = proxy（ this.keydown， this））;
        addListener（ window， EVENT_RESIZE， this.onResize = proxy（ this.resize， this））;
      }，
      unbind： 函数unbind（） {
        var element = this.element，
        选项 = this.options，
        观看者 = this.viewer;


        如果（ isFunction（ options.view）） {
          removeListener（ element， EVENT_VIEW， options.view）;
        }

        如果（ isFunction（ options.viewed）） {
          removeListener（ element， EVENT_VIEWED， options.viewed）;
        }

        removeListener（ viewer， EVENT_CLICK， this.onClick）;
        removeListener（ viewer， EVENT_WHEEL， this.onWheel）;
        removeListener（ viewer， EVENT_DRAG_START， this.onDragStart）;
        removeListener（ this.canvas， EVENT_POINTER_DOWN， this.onPointerDown）;
        removeListener（ element.ownerDocument， EVENT_POINTER_MOVE， this.onPointerMove）;
        removeListener（ element.ownerDocument， EVENT_POINTER_UP， this.onPointerUp）;
        removeListener（ element.ownerDocument， EVENT_KEY_DOWN， this.onKeyDown）;
        removeListener（ window， EVENT_RESIZE， this.onResize）;
      }
    };

    var handlers = {
        click：
        function click（ _ref） {
          var target = _ref.target;
          var options = this.options，
          imageData = this.imageData;

          var action = getData（ target， 'action'）;

          切换（ 操作） {
            情况“ 混合”：
            如果（ 已播放） {
              this.stop（）;
            } else if（ options.inline） {
              如果（ 已满） {
                this.exit（）;
              }
              其他 {
                this.full（）;
              }
            }
            其他 {
              this.hide（）;
            }

            打破;

            案例“ 隐藏”：
            this.hide（）;
            打破;

            案例“ 视图”：
            this.view（ getData（ target， 'index'））;
            打破;

            案例“ 放大”：
            this.zoom（ 0.1， true）;
            打破;

            案例“ 缩小”：
            this.zoom（ - 0.1， true）;
            打破;

            案例“ 一对一”：
            this.toggle（）;
            打破;

            情况“ 重置”：
            this.reset（）;
            打破;

            案例“ 上一个”：
            this.prev（ options.loop）;
            打破;

            案例“ 播放”：
            this.play（）;
            打破;

            案例“ 下一个”：
            this.next（ options.loop）;
            打破;

            情况“ 向左旋转”：
            this.rotate（ - 90）;
            打破;

            案例“ 向右旋转”：
            this.rotate（ 90）;
            打破;

            案例“ 水平翻转”：
            this.scaleX（ - imageData.scaleX || -1）;
            打破;

            案例 '垂直翻转'：
            this.scaleY（ - imageData.scaleY || -1）;
            打破;

            默认：
            如果（ 已播放） {
              this.stop（）;
            }
          }
        }，
        加载： 函数load（） {
          var _this = this;

          var options = this.options，
          图片 = this.image，
          索引 = this.index，
          viewerData = this.viewerData;


          如果（ this.timeout） {
            clearTimeout（ this.timeout）;
            this.timeout = false;
          }

          如果（！ image） {
            返回;
          }

          removeClass（ image， CLASS_INVISIBLE）;

          image.style.cssText = '宽度：0;' + '身高：0;' + （'margin-left：' + viewerData.width / 2 + 'px;'） + （'margin-top：' + viewerData.height / 2 + 'px;'） + 'max-width：none！important; ' + '可见性：可见；';

          this.initImage（
          function（） {
            toggleClass（ 图像， CLASS_TRANSITION， options.transition）;
            toggleClass（ 图像， CLASS_MOVE， options.movable）;

            _this.renderImage（
            function（） {
              _this.viewed = true;
              dispatchEvent（ _this.element， EVENT_VIEWED， {
                originalImage： _this.images[index]，
                索引： 索引，
                图片： 图片
              }）;
            }）;
          }）;
        }，
        loadImage：
        function loadImage（ e） {
          var image = e.target;
          var parent = image.parentNode;
          var parentWidth = parent.offsetWidth || 30;
          var parentHeight = parent.offsetHeight || 50;
          var filled = !!getData（ image， 'filled'）;

          getImageNaturalSizes（ image，
          function（ naturalWidth， naturalHeight） {
            var AspectRatio = naturalWidth / naturalHeight;
            var width = parentWidth;
            var height = parentHeight;

            如果（ parentHeight * AspectRatio > parentWidth） {
              如果（ 已填充） {
                宽度 = parentHeight * AspectRatio;
              }
              其他 {
                高度 = parentWidth / AspectRatio;
              }
            } else if（ filled） {
              高度 = parentWidth / AspectRatio;
            }
            其他 {
              宽度 = parentHeight * AspectRatio;
            }

            setStyle（ image， {
              宽度： 宽度，
              高度： 高度
              marginLeft：（ parentWidth - width） / 2，
              marginTop：（ parentHeight - height） / 2
            }）;
          }）;
        }，
        keydown： 功能keydown（ e） {
          var options = this.options;

          var key = e.keyCode || e。 其中 || e.charCode;

          如果（！ this.fulled || ！options.keyboard） {
            返回;
          }

          开关（ 键） {
            //（Key：Esc）
            案例27：
            如果（ 已播放） {
              this.stop（）;
            } else if（ options.inline） {
              如果（ 已满） {
                this.exit（）;
              }
            }
            其他 {
              this.hide（）;
            }

            打破;

            //（键：空格）
            案例32：
            如果（ 已播放） {
              this.stop（）;
            }

            打破;

            //查看上一个（键：←）
            案例37：
            this.prev（ options.loop）;
            打破;

            //放大（键：↑）
            案例38：

            //防止在Firefox上滚动
            e.preventDefault（）;

            this.zoom（ options.zoomRatio， true）;
            打破;

            //查看下一个（键：→）
            案例39：
            this.next（ options.loop）;
            打破;

            //缩小（键：↓）
            案例40：

            //防止在Firefox上滚动
            e.preventDefault（）;

            this.zoom（ - options.zoomRatio， true）;
            打破;

            //缩小到初始大小（键：Ctrl + 0）
            案例48：
            //跌倒

            //放大至自然大小（键：Ctrl + 1）
            // eslint-disable-next-line
            案例49：
            如果（ e.ctrlKey || e.shiftKey） {
              e.preventDefault（）;
              this.toggle（）;
            }

            打破;

            默认：
          }
        }，
        dragstart： 函数dragstart（ e） {
          如果（ e.target.tagName.toLowerCase（） === 'img'） {
            e.preventDefault（）;
          }
        }，
        指针下降： 函数pointerdown（ e） {
          var options = this.options，
          指针 = this.pointers;


          如果（！ this.viewed || this.transitioning） {
            返回;
          }

          如果（ e.changedTouches） {
            每个（ e.changedTouches， 函数（ touch） {
              pointers[touch.identifier] = getPointer(touch);
            });
        } else {
          pointers[e.pointerId || 0] = getPointer(e);
        }

        var action = options.movable ? ACTION_MOVE : false;

        if (Object.keys(pointers).length > 1) {
          action = ACTION_ZOOM;
        } else if ((e.pointerType === 'touch' || e.type === 'touchstart') && this.isSwitchable()) {
          action = ACTION_SWITCH;
        }

        this.action = action;
      },
      pointermove: function pointermove(e) {
        var options = this.options,
          pointers = this.pointers,
          action = this.action,
          image = this.image;


        if (!this.viewed || !action) {
          return;
        }

        e.preventDefault();

        if (e.changedTouches) {
          each(e.changedTouches, function (touch) {
            extend(pointers[touch.identifier], getPointer(touch, true));
          });
        } else {
          extend(pointers[e.pointerId || 0], getPointer(e, true));
        }

        if (action === ACTION_MOVE && options.transition && hasClass(image, CLASS_TRANSITION)) {
          removeClass(image, CLASS_TRANSITION);
        }

        this.change(e);
      },
      pointerup: function pointerup(e) {
        var action = this.action,
          pointers = this.pointers;


        if (e.changedTouches) {
          each(e.changedTouches, function (touch) {
            delete pointers[touch.identifier];
          });
        } else {
          delete pointers[e.pointerId || 0];
        }

        if (!action) {
          return;
        }

        if (action === ACTION_MOVE && this.options.transition) {
          addClass(this.image, CLASS_TRANSITION);
        }

        this.action = false;
      },
      resize: function resize() {
        var _this2 = this;

        this.initContainer();
        this.initViewer();
        this.renderViewer();
        this.renderList();

        if (this.viewed) {
          this.initImage(function () {
            _this2.renderImage();
          });
        }

        if (this.played) {
          if (this.options.fullscreen && this.fulled && !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            this.stop();
            return;
          }

          each(this.player.getElementsByTagName('img'), function (image) {
            addListener(image, EVENT_LOAD, proxy(_this2.loadImage, _this2), {
              once: true
            });
            dispatchEvent(image, EVENT_LOAD);
          });
        }
      },
      start: function start(_ref2) {
        var target = _ref2.target;

        if (target.tagName.toLowerCase() === 'img' && this.images.indexOf(target) !== -1) {
          this.target = target;
          this.show();
        }
      },
      wheel: function wheel(e) {
        var _this3 = this;

        if (!this.viewed) {
          return;
        }

        e.preventDefault();

        // Limit wheel speed to prevent zoom too fast
        if (this.wheeling) {
          return;
        }

        this.wheeling = true;

        setTimeout(function () {
          _this3.wheeling = false;
        }, 50);

        var ratio = Number(this.options.zoomRatio) || 0.1;
        var delta = 1;

        if (e.deltaY) {
          delta = e.deltaY > 0 ? 1 : -1;
        } else if (e.wheelDelta) {
          delta = -e.wheelDelta / 120;
        } else if (e.detail) {
          delta = e.detail > 0 ? 1 : -1;
        }

        this.zoom(-delta * ratio, true, e);
      }
  };

  var methods = {
    // Show the viewer (only available in modal mode)
    show: function show() {
      var _this = this;

      var element = this.element,
        options = this.options;


      if (options.inline || this.transitioning || this.visible) {
        return this;
      }

      if (!this.ready) {
        this.build();
      }

      if (isFunction(options.show)) {
        addListener(element, EVENT_SHOW, options.show, {
          once: true
        });
      }

      if (dispatchEvent(element, EVENT_SHOW) === false) {
        return this;
      }

      this.open();

      var viewer = this.viewer;


      removeClass(viewer, CLASS_HIDE);
      addListener(element, EVENT_SHOWN, function () {
        _this.view(_this.target ? [].concat(_this.images).indexOf(_this.target) : _this.index);
        _this.target = false;
      }, {
        once: true
      });

      if (options.transition) {
        this.transitioning = true;
        addClass(viewer, CLASS_TRANSITION);

        // Force reflow to enable CSS3 transition
        // eslint-disable-next-line
        viewer.offsetWidth;
        addListener(viewer, EVENT_TRANSITION_END, proxy(this.shown, this), {
          once: true
        });
        addClass(viewer, CLASS_IN);
      } else {
        addClass(viewer, CLASS_IN);
        this.shown();
      }

      return this;
    },


    // Hide the viewer (only available in modal mode)
    hide: function hide() {
      var _this2 = this;

      var element = this.element,
        options = this.options,
        viewer = this.viewer;


      if (options.inline || this.transitioning || !this.visible) {
        return this;
      }

      if (isFunction(options.hide)) {
        addListener(element, EVENT_HIDE, options.hide, {
          once: true
        });
      }

      if (dispatchEvent(element, EVENT_HIDE) === false) {
        return this;
      }

      if (this.viewed && options.transition) {
        this.transitioning = true;
        addListener(this.image, EVENT_TRANSITION_END, function () {
          addListener(viewer, EVENT_TRANSITION_END, proxy(_this2.hidden, _this2), {
            once: true
          });
          removeClass(viewer, CLASS_IN);
        }, {
          once: true
        });
        this.zoomTo(0, false, false, true);
      } else {
        removeClass(viewer, CLASS_IN);
        this.hidden();
      }

      return this;
    },


    /**
     * View one of the images with image's index
     * @param {number} index - The index of the image to view.
     * @returns {Object} this
     */
    view: function view(index) {
      var _this3 = this;

      var element = this.element,
        title = this.title,
        canvas = this.canvas;


      index = Number(index) || 0;

      if (!this.ready || !this.visible || this.played || index < 0 || index >= this.length || this.viewed && index === this.index) {
        return this;
      }

      var item = this.items[index];
      var img = item.querySelector('img');
      var url = getData(img, 'originalUrl');
      var alt = img.getAttribute('alt');
      var image = document.createElement('img');

      image.src = url;
      image.alt = alt;

      if (dispatchEvent(element, EVENT_VIEW, {
          originalImage: this.images[index],
          index: index,
          image: image
        }) === false) {
        return this;
      }

      this.image = image;

      removeClass(this.items[this.index], CLASS_ACTIVE);
      addClass(item, CLASS_ACTIVE);

      this.viewed = false;
      this.index = index;
      this.imageData = null;

      addClass(image, CLASS_INVISIBLE);
      empty(canvas);
      canvas.appendChild(image);

      // Center current item
      this.renderList();

      // Clear title
      empty(title);

      // Generate title after viewed
      addListener(element, EVENT_VIEWED, function () {
        var imageData = _this3.imageData;


        title.textContent = alt + ' (' + imageData.naturalWidth + ' \xD7 ' + imageData.naturalHeight + ')';
      }, {
        once: true
      });

      if (image.complete) {
        this.load();
      } else {
        addListener(image, EVENT_LOAD, proxy(this.load, this), {
          once: true
        });

        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        // Make the image visible if it fails to load within 1s
        this.timeout = setTimeout(function () {
          removeClass(image, CLASS_INVISIBLE);
          _this3.timeout = false;
        }, 1000);
      }

      return this;
    },


    /**
     * View the previous image
     * @param {boolean} [loop=false] - Indicate if view the last one
     * when it is the first one at present.
     * @returns {Object} this
     */
    prev: function prev() {
      var loop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var index = this.index - 1;

      if (index < 0) {
        index = loop ? this.length - 1 : 0;
      }

      this.view(index);
      return this;
    },


    /**
     * View the next image
     * @param {boolean} [loop=false] - Indicate if view the first one
     * when it is the last one at present.
     * @returns {Object} this
     */
    next: function next() {
      var loop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var maxIndex = this.length - 1;
      var index = this.index + 1;

      if (index > maxIndex) {
        index = loop ? 0 : maxIndex;
      }

      this.view(index);
      return this;
    },


    /**
     * Move the image with relative offsets.
     * @param {number} offsetX - The relative offset distance on the x-axis.
     * @param {number} offsetY - The relative offset distance on the y-axis.
     * @returns {Object} this
     */
    move: function move(offsetX, offsetY) {
      var imageData = this.imageData;


      this.moveTo(isUndefined(offsetX) ? offsetX : imageData.left + Number(offsetX), isUndefined(offsetY) ? offsetY : imageData.top + Number(offsetY));

      return this;
    },


    /**
     * Move the image to an absolute point.
     * @param {number} x - The x-axis coordinate.
     * @param {number} [y=x] - The y-axis coordinate.
     * @returns {Object} this
     */
    moveTo: function moveTo(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var imageData = this.imageData;


      x = Number(x);
      y = Number(y);

      if (this.viewed && !this.played && this.options.movable) {
        var changed = false;

        if (isNumber(x)) {
          imageData.left = x;
          changed = true;
        }

        if (isNumber(y)) {
          imageData.top = y;
          changed = true;
        }

        if (changed) {
          this.renderImage();
        }
      }

      return this;
    },


    /**
     * Zoom the image with a relative ratio.
     * @param {number} ratio - The target ratio.
     * @param {boolean} [hasTooltip=false] - Indicates if it has a tooltip or not.
     * @param {Event} [_originalEvent=null] - The original event if any.
     * @returns {Object} this
     */
    zoom: function zoom(ratio) {
      var hasTooltip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _originalEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var imageData = this.imageData;


      ratio = Number(ratio);

      if (ratio < 0) {
        ratio = 1 / (1 - ratio);
      } else {
        ratio = 1 + ratio;
      }

      this.zoomTo(imageData.width * ratio / imageData.naturalWidth, hasTooltip, _originalEvent);

      return this;
    },


    /**
     * Zoom the image to an absolute ratio.
     * @param {number} ratio - The target ratio.
     * @param {boolean} [hasTooltip=false] - Indicates if it has a tooltip or not.
     * @param {Event} [_originalEvent=null] - The original event if any.
     * @param {Event} [_zoomable=false] - Indicates if the current zoom is available or not.
     * @returns {Object} this
     */
    zoomTo: function zoomTo(ratio) {
      var hasTooltip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _originalEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var _zoomable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var options = this.options,
        pointers = this.pointers,
        imageData = this.imageData;


      ratio = Math.max(0, ratio);

      if (isNumber(ratio) && this.viewed && !this.played && (_zoomable || options.zoomable)) {
        if (!_zoomable) {
          var minZoomRatio = Math.max(0.01, options.minZoomRatio);
          var maxZoomRatio = Math.min(100, options.maxZoomRatio);

          ratio = Math.min(Math.max(ratio, minZoomRatio), maxZoomRatio);
        }

        if (_originalEvent && ratio > 0.95 && ratio < 1.05) {
          ratio = 1;
        }

        var newWidth = imageData.naturalWidth * ratio;
        var newHeight = imageData.naturalHeight * ratio;

        if (_originalEvent) {
          var offset = getOffset(this.viewer);
          var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
            pageX: _originalEvent.pageX,
            pageY: _originalEvent.pageY
          };

          // Zoom from the triggering point of the event
          imageData.left -= (newWidth - imageData.width) * ((center.pageX - offset.left - imageData.left) / imageData.width);
          imageData.top -= (newHeight - imageData.height) * ((center.pageY - offset.top - imageData.top) / imageData.height);
        } else {
          // Zoom from the center of the image
          imageData.left -= (newWidth - imageData.width) / 2;
          imageData.top -= (newHeight - imageData.height) / 2;
        }

        imageData.width = newWidth;
        imageData.height = newHeight;
        imageData.ratio = ratio;
        this.renderImage();

        if (hasTooltip) {
          this.tooltip();
        }
      }

      return this;
    },


    /**
     * Rotate the image with a relative degree.
     * @param {number} degree - The rotate degree.
     * @returns {Object} this
     */
    rotate: function rotate(degree) {
      this.rotateTo((this.imageData.rotate || 0) + Number(degree));

      return this;
    },


    /**
     * Rotate the image to an absolute degree.
     * @param {number} degree - The rotate degree.
     * @returns {Object} this
     */
    rotateTo: function rotateTo(degree) {
      var imageData = this.imageData;


      degree = Number(degree);

      if (isNumber(degree) && this.viewed && !this.played && this.options.rotatable) {
        imageData.rotate = degree;
        this.renderImage();
      }

      return this;
    },


    /**
     * Scale the image on the x-axis.
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @returns {Object} this
     */
    scaleX: function scaleX(_scaleX) {
      this.scale(_scaleX, this.imageData.scaleY);

      return this;
    },


    /**
     * Scale the image on the y-axis.
     * @param {number} scaleY - The scale ratio on the y-axis.
     * @returns {Object} this
     */
    scaleY: function scaleY(_scaleY) {
      this.scale(this.imageData.scaleX, _scaleY);

      return this;
    },


    /**
     * Scale the image.
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
     * @returns {Object} this
     */
    scale: function scale(scaleX) {
      var scaleY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scaleX;
      var imageData = this.imageData;


      scaleX = Number(scaleX);
      scaleY = Number(scaleY);

      if (this.viewed && !this.played && this.options.scalable) {
        var changed = false;

        if (isNumber(scaleX)) {
          imageData.scaleX = scaleX;
          changed = true;
        }

        if (isNumber(scaleY)) {
          imageData.scaleY = scaleY;
          changed = true;
        }

        if (changed) {
          this.renderImage();
        }
      }

      return this;
    },


    // Play the images
    play: function play() {
      var _this4 = this;

      var options = this.options,
        player = this.player;

      var load = proxy(this.loadImage, this);
      var list = [];
      var total = 0;
      var index = 0;

      if (!this.visible || this.played) {
        return this;
      }

      if (options.fullscreen) {
        this.requestFullscreen();
      }

      this.played = true;
      this.onLoadWhenPlay = load;
      addClass(player, CLASS_SHOW);

      each(this.items, function (item, i) {
        var img = item.querySelector('img');
        var image = document.createElement('img');

        image.src = getData(img, 'originalUrl');
        image.alt = img.getAttribute('alt');
        total += 1;

        addClass(image, CLASS_FADE);
        toggleClass(image, CLASS_TRANSITION, options.transition);

        if (hasClass(item, CLASS_ACTIVE)) {
          addClass(image, CLASS_IN);
          index = i;
        }

        list.push(image);
        addListener(image, EVENT_LOAD, load, {
          once: true
        });
        player.appendChild(image);
      });

      if (isNumber(options.interval) && options.interval > 0) {
        var playing = function playing() {
          _this4.playing = setTimeout(function () {
            removeClass(list[index], CLASS_IN);
            index += 1;
            index = index < total ? index : 0;
            addClass(list[index], CLASS_IN);

            playing();
          }, options.interval);
        };

        if (total > 1) {
          playing();
        }
      }

      return this;
    },


    // Stop play
    stop: function stop() {
      var _this5 = this;

      var player = this.player;


      if (!this.played) {
        return this;
      }

      if (this.options.fullscreen) {
        this.exitFullscreen();
      }

      this.played = false;
      clearTimeout(this.playing);
      each(this.player.getElementsByTagName('img'), function (image) {
        if (!image.complete) {
          removeListener(image, EVENT_LOAD, _this5.onLoadWhenPlay);
        }
      });
      removeClass(player, CLASS_SHOW);
      empty(player);

      return this;
    },


    // Enter modal mode (only available in inline mode)
    full: function full() {
      var _this6 = this;

      var options = this.options,
        viewer = this.viewer,
        image = this.image,
        list = this.list;


      if (!this.visible || this.played || this.fulled || !options.inline) {
        return this;
      }

      this.fulled = true;
      this.open();
      addClass(this.button, CLASS_FULLSCREEN_EXIT);

      if (options.transition) {
        removeClass(image, CLASS_TRANSITION);
        removeClass(list, CLASS_TRANSITION);
      }

      addClass(viewer, CLASS_FIXED);
      viewer.setAttribute('style', '');
      setStyle(viewer, {
        zIndex: options.zIndex
      });

      this.initContainer();
      this.viewerData = extend({}, this.containerData);
      this.renderList();
      this.initImage(function () {
        _this6.renderImage(function () {
          if (options.transition) {
            setTimeout(function () {
              addClass(image, CLASS_TRANSITION);
              addClass(list, CLASS_TRANSITION);
            }, 0);
          }
        });
      });

      return this;
    },


    // Exit modal mode (only available in inline mode)
    exit: function exit() {
      var _this7 = this;

      var options = this.options,
        viewer = this.viewer,
        image = this.image,
        list = this.list;


      if (!this.fulled) {
        return this;
      }

      this.fulled = false;
      this.close();
      removeClass(this.button, CLASS_FULLSCREEN_EXIT);

      if (options.transition) {
        removeClass(image, CLASS_TRANSITION);
        removeClass(list, CLASS_TRANSITION);
      }

      removeClass(viewer, CLASS_FIXED);
      setStyle(viewer, {
        zIndex: options.zIndexInline
      });

      this.viewerData = extend({}, this.parentData);
      this.renderViewer();
      this.renderList();
      this.initImage(function () {
        _this7.renderImage(function () {
          if (options.transition) {
            setTimeout(function () {
              addClass(image, CLASS_TRANSITION);
              addClass(list, CLASS_TRANSITION);
            }, 0);
          }
        });
      });

      return this;
    },


    // Show the current ratio of the image with percentage
    tooltip: function tooltip() {
      var _this8 = this;

      var options = this.options,
        tooltipBox = this.tooltipBox,
        imageData = this.imageData;


      if (!this.viewed || this.played || !options.tooltip) {
        return this;
      }

      tooltipBox.textContent = Math.round(imageData.ratio * 100) + '%';

      if (!this.tooltiping) {
        if (options.transition) {
          if (this.fading) {
            dispatchEvent(tooltipBox, EVENT_TRANSITION_END);
          }

          addClass(tooltipBox, CLASS_SHOW);
          addClass(tooltipBox, CLASS_FADE);
          addClass(tooltipBox, CLASS_TRANSITION);

          // Force reflow to enable CSS3 transition
          // eslint-disable-next-line
          tooltipBox.offsetWidth;
          addClass(tooltipBox, CLASS_IN);
        } else {
          addClass(tooltipBox, CLASS_SHOW);
        }
      } else {
        clearTimeout(this.tooltiping);
      }

      this.tooltiping = setTimeout(function () {
        if (options.transition) {
          addListener(tooltipBox, EVENT_TRANSITION_END, function () {
            removeClass(tooltipBox, CLASS_SHOW);
            removeClass(tooltipBox, CLASS_FADE);
            removeClass(tooltipBox, CLASS_TRANSITION);
            _this8.fading = false;
          }, {
            once: true
          });

          removeClass(tooltipBox, CLASS_IN);
          _this8.fading = true;
        } else {
          removeClass(tooltipBox, CLASS_SHOW);
        }

        _this8.tooltiping = false;
      }, 1000);

      return this;
    },


    // Toggle the image size between its natural size and initial size
    toggle: function toggle() {
      if (this.imageData.ratio === 1) {
        this.zoomTo(this.initialImageData.ratio, true);
      } else {
        this.zoomTo(1, true);
      }

      return this;
    },


    // Reset the image to its initial state
    reset: function reset() {
      if (this.viewed && !this.played) {
        this.imageData = extend({}, this.initialImageData);
        this.renderImage();
      }

      return this;
    },


    // Update viewer when images changed
    update: function update() {
      var element = this.element,
        options = this.options,
        isImg = this.isImg;

      var indexes = [];

      // Destroy viewer if the target image was deleted
      if (isImg && !element.parentNode) {
        return this.destroy();
      }

      var images = [];

      each(isImg ? [element] : element.querySelectorAll('img'), function (image) {
        if (options.filter) {
          if (options.filter(image)) {
            images.push(image);
          }
        } else {
          images.push(image);
        }
      });

      this.images = images;
      this.length = images.length;

      if (this.ready) {
        each(this.items, function (item, i) {
          var img = item.querySelector('img');
          var image = images[i];

          if (image) {
            if (image.src !== img.src) {
              indexes.push(i);
            }
          } else {
            indexes.push(i);
          }
        });

        setStyle(this.list, {
          width: 'auto'
        });

        this.initList();

        if (this.visible) {
          if (this.length) {
            if (this.viewed) {
              var index = indexes.indexOf(this.index);

              if (index >= 0) {
                this.viewed = false;
                this.view(Math.max(this.index - (index + 1), 0));
              } else {
                addClass(this.items[this.index], CLASS_ACTIVE);
              }
            }
          } else {
            this.image = null;
            this.viewed = false;
            this.index = 0;
            this.imageData = null;
            empty(this.canvas);
            empty(this.title);
          }
        }
      }

      return this;
    },


    // Destroy the viewer
    destroy: function destroy() {
      var element = this.element;


      if (!getData(element, NAMESPACE)) {
        return this;
      }

      if (this.options.inline) {
        this.unbind();
      } else {
        if (this.visible) {
          this.unbind();
        }

        removeListener(element, EVENT_CLICK, this.onStart);
      }

      this.close();
      this.unbuild();
      removeData(element, NAMESPACE);
      return this;
    }
  };

  var others = {
    open: function open() {
      var body = this.body;


      addClass(body, CLASS_OPEN);

      body.style.paddingRight = this.scrollbarWidth + (parseFloat(this.initialBodyPaddingRight) || 0) + 'px';
    },
    close: function close() {
      var body = this.body;


      if (!body) {
        return;
      }

      removeClass(body, CLASS_OPEN);
      body.style.paddingRight = this.initialBodyPaddingRight;
    },
    shown: function shown() {
      var element = this.element,
        options = this.options;


      this.transitioning = false;
      this.fulled = true;
      this.visible = true;
      this.render();
      this.bind();

      if (isFunction(options.shown)) {
        addListener(element, EVENT_SHOWN, options.shown, {
          once: true
        });
      }

      dispatchEvent(element, EVENT_SHOWN);
    },
    hidden: function hidden() {
      var element = this.element,
        options = this.options;

      this.transitioning = false;
      this.viewed = false;
      this.fulled = false;
      this.visible = false;
      this.close();
      this.unbind();
      addClass(this.viewer, CLASS_HIDE);
      this.resetList();
      this.resetImage();

      if (isFunction(options.hidden)) {
        addListener(element, EVENT_HIDDEN, options.hidden, {
          once: true
        });
      }

      dispatchEvent(element, EVENT_HIDDEN);
    },
    requestFullscreen: function requestFullscreen() {
      var _window = window,
        document = _window.document;


      if (this.fulled && !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        var documentElement = document.documentElement;


        if (documentElement.requestFullscreen) {
          documentElement.requestFullscreen();
        } else if (documentElement.msRequestFullscreen) {
          documentElement.msRequestFullscreen();
        } else if (documentElement.mozRequestFullScreen) {
          documentElement.mozRequestFullScreen();
        } else if (documentElement.webkitRequestFullscreen) {
          documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      }
    },
    exitFullscreen: function exitFullscreen() {
      if (this.fulled) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    },
    change: function change(e) {
      var options = this.options,
        pointers = this.pointers;

      var pointer = pointers[Object.keys(pointers)[0]];
      var offsetX = pointer.endX - pointer.startX;
      var offsetY = pointer.endY - pointer.startY;

      switch (this.action) {
        // Move the current image
        case ACTION_MOVE:
          this.move(offsetX, offsetY);
          break;

          // Zoom the current image
        case ACTION_ZOOM:
          this.zoom(getMaxZoomRatio(pointers), false, e);
          break;

        case ACTION_SWITCH:
          this.action = 'switched';

          if (Math.abs(offsetX) > Math.abs(offsetY)) {
            if (offsetX > 1) {
              this.prev(options.loop);
            } else if (offsetX < -1) {
              this.next(options.loop);
            }
          }

          break;

        default:
      }

      // Override
      each(pointers, function (p) {
        p.startX = p.endX;
        p.startY = p.endY;
      });
    },
    isSwitchable: function isSwitchable() {
      var imageData = this.imageData,
        viewerData = this.viewerData;


      return this.length > 1 && imageData.left >= 0 && imageData.top >= 0 && imageData.width <= viewerData.width && imageData.height <= viewerData.height;
    }
  };

  var AnotherViewer = WINDOW.Viewer;

  var Viewer = function () {
    /**
     * Create a new Viewer.
     * @param {Element} element - The target element for viewing.
     * @param {Object} [options={}] - The configuration options.
     */
    function Viewer(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, Viewer);

      if (!element || element.nodeType !== 1) {
        throw new Error('The first argument is required and must be an element.');
      }

      this.element = element;
      this.options = extend({}, DEFAULTS, isPlainObject(options) && options);
      this.isImg = false;
      this.ready = false;
      this.visible = false;
      this.viewed = false;
      this.fulled = false;
      this.played = false;
      this.wheeling = false;
      this.playing = false;
      this.fading = false;
      this.tooltiping = false;
      this.transitioning = false;
      this.action = false;
      this.target = false;
      this.timeout = false;
      this.index = 0;
      this.length = 0;
      this.pointers = {};
      this.init();
    }

    createClass(Viewer, [{
      key: 'init',
      value: function init() {
        var _this = this;

        var element = this.element,
          options = this.options;


        if (getData(element, NAMESPACE)) {
          return;
        }

        setData(element, NAMESPACE, this);

        var isImg = element.tagName.toLowerCase() === 'img';
        var images = [];

        each(isImg ? [element] : element.querySelectorAll('img'), function (image) {
          if (options.filter) {
            if (options.filter(image)) {
              images.push(image);
            }
          } else {
            images.push(image);
          }
        });

        var length = images.length;


        if (!length) {
          return;
        }

        if (isFunction(options.ready)) {
          addListener(element, EVENT_READY, options.ready, {
            once: true
          });
        }

        // Override `transition` option if it is not supported
        if (isUndefined(document.createElement(NAMESPACE).style.transition)) {
          options.transition = false;
        }

        this.isImg = isImg;
        this.length = length;
        this.count = 0;
        this.images = images;

        var body = document.body || document.documentElement;

        this.body = body;
        this.scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        this.initialBodyPaddingRight = getStyle(body).paddingRight;

        if (options.inline) {
          var progress = proxy(this.progress, this);

          addListener(element, EVENT_READY, function () {
            _this.view();
          }, {
            once: true
          });

          each(images, function (image) {
            if (image.complete) {
              progress();
            } else {
              addListener(image, EVENT_LOAD, progress, {
                once: true
              });
            }
          });
        } else {
          addListener(element, EVENT_CLICK, this.onStart = proxy(this.start, this));
        }
      }
    }, {
      key: 'progress',
      value: function progress() {
        this.count += 1;

        if (this.count === this.length) {
          this.build();
        }
      }
    }, {
      key: 'build',
      value: function build() {
        var options = this.options;
        var element = this.element;


        if (this.ready) {
          return;
        }

        var parent = element.parentNode;
        var template = document.createElement('div');

        template.innerHTML = TEMPLATE;

        var viewer = template.querySelector('.' + NAMESPACE + '-container');
        var title = viewer.querySelector('.' + NAMESPACE + '-title');
        var toolbar = viewer.querySelector('.' + NAMESPACE + '-toolbar');
        var navbar = viewer.querySelector('.' + NAMESPACE + '-navbar');
        var button = viewer.querySelector('.' + NAMESPACE + '-button');
        var canvas = viewer.querySelector('.' + NAMESPACE + '-canvas');

        this.parent = parent;
        this.viewer = viewer;
        this.title = title;
        this.toolbar = toolbar;
        this.navbar = navbar;
        this.button = button;
        this.canvas = canvas;
        this.footer = viewer.querySelector('.' + NAMESPACE + '-footer');
        this.tooltipBox = viewer.querySelector('.' + NAMESPACE + '-tooltip');
        this.player = viewer.querySelector('.' + NAMESPACE + '-player');
        this.list = viewer.querySelector('.' + NAMESPACE + '-list');

        addClass(title, !options.title ? CLASS_HIDE : getResponsiveClass(options.title));
        addClass(navbar, !options.navbar ? CLASS_HIDE : getResponsiveClass(options.navbar));
        toggleClass(button, CLASS_HIDE, !options.button);

        if (options.backdrop) {
          addClass(viewer, NAMESPACE + '-backdrop');

          if (!options.inline && options.backdrop === true) {
            setData(canvas, 'action', 'hide');
          }
        }

        if (options.toolbar) {
          var list = document.createElement('ul');
          var custom = isPlainObject(options.toolbar);
          var zoomButtons = BUTTONS.slice(0, 3);
          var rotateButtons = BUTTONS.slice(7, 9);
          var scaleButtons = BUTTONS.slice(9);

          if (!custom) {
            addClass(toolbar, getResponsiveClass(options.toolbar));
          }

          each(custom ? options.toolbar : BUTTONS, function (value, index) {
            var deep = custom && isPlainObject(value);
            var name = custom ? hyphenate(index) : value;
            var show = deep && !isUndefined(value.show) ? value.show : value;

            if (!show || !options.zoomable && zoomButtons.indexOf(name) !== -1 || !options.rotatable && rotateButtons.indexOf(name) !== -1 || !options.scalable && scaleButtons.indexOf(name) !== -1) {
              return;
            }

            var size = deep && !isUndefined(value.size) ? value.size : value;
            var click = deep && !isUndefined(value.click) ? value.click : value;
            var item = document.createElement('li');

            item.setAttribute('role', 'button');
            addClass(item, NAMESPACE + '-' + name);

            if (!isFunction(click)) {
              setData(item, 'action', name);
            }

            if (isNumber(show)) {
              addClass(item, getResponsiveClass(show));
            }

            if (['small', 'large'].indexOf(size) !== -1) {
              addClass(item, NAMESPACE + '-' + size);
            } else if (name === 'play') {
              addClass(item, NAMESPACE + '-large');
            }

            if (isFunction(click)) {
              addListener(item, EVENT_CLICK, click);
            }

            list.appendChild(item);
          });

          toolbar.appendChild(list);
        } else {
          addClass(toolbar, CLASS_HIDE);
        }

        if (!options.rotatable) {
          var rotates = toolbar.querySelectorAll('li[class*="rotate"]');

          addClass(rotates, CLASS_INVISIBLE);
          each(rotates, function (rotate) {
            toolbar.appendChild(rotate);
          });
        }

        if (options.inline) {
          addClass(button, CLASS_FULLSCREEN);
          setStyle(viewer, {
            zIndex: options.zIndexInline
          });

          if (getStyle(parent).position === 'static') {
            setStyle(parent, {
              position: 'relative'
            });
          }

          parent.insertBefore(viewer, element.nextSibling);
        } else {
          addClass(button, CLASS_CLOSE);
          addClass(viewer, CLASS_FIXED);
          addClass(viewer, CLASS_FADE);
          addClass(viewer, CLASS_HIDE);

          setStyle(viewer, {
            zIndex: options.zIndex
          });

          this.body.appendChild(viewer);
        }

        if (options.inline) {
          this.render();
          this.bind();
          this.visible = true;
        }

        this.ready = true;

        dispatchEvent(element, EVENT_READY);
      }
    }, {
      key: 'unbuild',
      value: function unbuild() {
        if (!this.ready) {
          return;
        }

        this.ready = false;
        this.viewer.parentNode.removeChild(this.viewer);
      }

      /**
       * Get the no conflict viewer class.
       * @returns {Viewer} The viewer class.
       */

    }], [{
      key: 'noConflict',
      value: function noConflict() {
        window.Viewer = AnotherViewer;
        return Viewer;
      }

      /**
       * Change the default options.
       * @param {Object} options - The new default options.
       */

    }, {
      key: 'setDefaults',
      value: function setDefaults(options) {
        extend(DEFAULTS, isPlainObject(options) && options);
      }
    }]);
    return Viewer;
  }();

  extend(Viewer.prototype, render, events, handlers, methods, others);

  return Viewer;

})));