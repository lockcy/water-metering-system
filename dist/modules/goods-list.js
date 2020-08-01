// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 349);
/******/ })
/************************************************************************/
/******/ ({

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = navigateToNextPage;
/**
 * 页面跳转路由
 */
var navigator = weex.requireModule('navigator');

var routes = [{ path: 'index', component: 'index', name: "登录" }, { path: 'page/register', component: 'register', name: "注册" }, { path: 'page/main', component: 'main', name: "主界面" }, { path: 'components/equipment', component: 'equipment', name: "设备" }, { path: 'components/graph', component: 'graph', name: "图表" }, { path: 'components/info', component: 'info', name: "个人信息" }, { path: 'components/testna', component: 'testna', name: "个人" }, { path: 'components/datahis', component: 'datahis', name: "历史数据" }, { path: 'error', component: 'error', name: "错误页面" }, { path: 'modules/goods-detail', component: 'goods-detail', name: "商品" }];
var modal = weex.requireModule('modal');
var toast = function toast(message) {
    modal.toast({
        message: message,
        duration: 1
    });
};
function getRoute(component) {
    var name = "";
    var targets = routes.filter(function (route) {
        return route.component === component;
    });
    if (targets.length > 0) {
        name = targets.pop().path;
        console.log('name=' + name);
    } else {
        name = "error";
    }
    var arr = weex.config.bundleUrl.split("/");
    //console.log('arr='+arr);
    arr.pop();
    if (arr.includes("modules")) {
        arr.pop();
    }
    //
    if (arr.includes("page")) {
        arr.pop();
    }
    if (arr.includes("components")) {
        arr.pop();
    }
    if (weex.config.env.platform === "Web") {
        arr.push(name + ".html");
        return arr.join("/");
    } else {
        arr.push(name + ".js");
        //toast(arr.join("/"));
        return arr.join("/");
    }
}
function navigateToNextPage(component) {
    console.log('url=' + getRoute(component));
    navigator.push({
        url: getRoute(component),
        animated: "true"
    });
};

/***/ }),

/***/ 349:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _goodsList = __webpack_require__(350);

var _goodsList2 = _interopRequireDefault(_goodsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_goodsList2.default.el = '#root';
new Vue(_goodsList2.default);

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(351)
)

/* script */
__vue_exports__ = __webpack_require__(352)

/* template */
var __vue_template__ = __webpack_require__(353)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "D:\\weex\\water-metering-system\\src\\modules\\goods-list.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-3f90b330"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ 351:
/***/ (function(module, exports) {

module.exports = {}

/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _router = __webpack_require__(247);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'goods-list',
    data: {},
    methods: {
        gotoNextPage: function gotoNextPage() {
            (0, _router2.default)("goods-detail");
        }
    }
}; //
//
//
//
//
//

/***/ }),

/***/ 353:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"],
    on: {
      "click": _vm.gotoNextPage
    }
  }, [_c('text', {
    staticClass: ["title"]
  }, [_vm._v("this is goods-list page")])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });