/*!
 * minirefresh v2.0.1
 * (c) 2017-2017 dailc
 * Released under the MIT License.
 * https://github.com/minirefresh/minirefresh
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.MiniRefresh = factory());
}(this, (function () { 'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseTheme = MiniRefreshTools.theme.defaults;
var version = MiniRefreshTools.version;
var extend = MiniRefreshTools.extend;
var namespace = MiniRefreshTools.namespace;

/**
 * ?????????????????????CSS??????????????????????????????????????????????????????
 * theme??????????????????????????????????????????
 */
var CLASS_THEME = 'minirefresh-theme-drawerslider';

/**
 * ????????????
 * ???????????????200
 * ??????????????????????????????????????????????????????????????????????????????????????????3D??????
 */
var DEFAULT_DOWN_HEIGHT = 200;
var DOWN_SHADOW_HEIGHT = 2;

var defaultSetting = {
    down: {
        offset: 100,
        // ????????????????????????????????????offset???,??????????????????????????????;????????????0,??????????????????,???????????????????????????
        dampRate: 0.2,
        bounceTime: 500,
        successAnim: {
            // successAnim
            isEnable: false
        },
        // ?????????default???downWrap?????????????????????????????????
        isWrapCssTranslate: true,
        // ??????scroll?????????????????????css?????????????????????????????????????????????
        // ???????????????????????????????????????index
        isScrollCssTranslate: false
    }
};

var MiniRefreshTheme = function (_BaseTheme) {
    _inherits(MiniRefreshTheme, _BaseTheme);

    function MiniRefreshTheme(options) {
        _classCallCheck(this, MiniRefreshTheme);

        var newOptions = extend(true, {}, defaultSetting, options);

        return _possibleConstructorReturn(this, (MiniRefreshTheme.__proto__ || Object.getPrototypeOf(MiniRefreshTheme)).call(this, newOptions));
    }

    _createClass(MiniRefreshTheme, [{
        key: '_initDownWrap',
        value: function _initDownWrap() {
            // ??????
            _get(MiniRefreshTheme.prototype.__proto__ || Object.getPrototypeOf(MiniRefreshTheme.prototype), '_initDownWrap', this).call(this);

            var container = this.container;
            var downWrap = this.downWrap;

            downWrap.innerHTML = ' \n            <div class="drawer">\n                <div class="downwrap-content">\n                    <p class="downwrap-progress"></p>\n                    <p class="downwrap-tips">' + this.options.down.contentdown + '</p>\n                </div>\n                <div class="drawer-mask"></div>\n            </div>\n        ';

            // ?????????????????????default????????????????????????default??????????????????????????????????????????
            container.classList.add(CLASS_THEME);

            // ???????????????????????????????????????
            this.downWrapProgress = downWrap.querySelector('.downwrap-progress');
            this.downWrapTips = downWrap.querySelector('.downwrap-tips');
            this.drawer = downWrap.querySelector('.drawer');
            this.drawerMask = downWrap.querySelector('.drawer-mask');

            // ?????????????????????????????????????????????????????????
            // ?????????????????????
            this.downWrapHeight = DOWN_SHADOW_HEIGHT + downWrap.offsetHeight || DEFAULT_DOWN_HEIGHT;
            // ??????downWrap???????????????????????????
            this._transformDownWrap(-this.downWrapHeight);
        }
    }, {
        key: '_transformDownWrap',
        value: function _transformDownWrap(offset, duration) {
            _get(MiniRefreshTheme.prototype.__proto__ || Object.getPrototypeOf(MiniRefreshTheme.prototype), '_transformDownWrap', this).call(this, offset, duration);
            this._transformDrawer(offset, duration);
        }
    }, {
        key: '_transformDrawer',
        value: function _transformDrawer() {
            var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (!this.drawerMask) {
                return;
            }

            var opacity = (-offset - this.options.down.offset) / this.downWrapHeight;

            opacity = Math.min(1, opacity);
            opacity = Math.max(0, opacity);

            this.drawerMask.style.opacity = opacity;
            this.drawerMask.style.webkitTransitionDuration = duration + 'ms';
            this.drawerMask.style.transitionDuration = duration + 'ms';
        }

        /**
         * ????????????????????????
         * @param {Number} downHight ?????????????????????
         * @param {Number} downOffset ???????????????
         */

    }, {
        key: '_pullHook',
        value: function _pullHook(downHight, downOffset) {
            // ??????default?????????????????????
            _get(MiniRefreshTheme.prototype.__proto__ || Object.getPrototypeOf(MiniRefreshTheme.prototype), '_pullHook', this).call(this, downHight, downOffset);
        }

        /**
         * ??????????????????
         */

    }, {
        key: '_downLoaingHook',
        value: function _downLoaingHook() {
            // loading?????????translate???
            _get(MiniRefreshTheme.prototype.__proto__ || Object.getPrototypeOf(MiniRefreshTheme.prototype), '_downLoaingHook', this).call(this);
        }

        /**
         * ??????success ?????????????????????
         */

    }, {
        key: '_downLoaingSuccessHook',
        value: function _downLoaingSuccessHook(isSuccess, successTips) {
            // ???????????????
            _get(MiniRefreshTheme.prototype.__proto__ || Object.getPrototypeOf(MiniRefreshTheme.prototype), '_downLoaingSuccessHook', this).call(this, isSuccess, successTips);
        }

        /**
         * ????????????end
         * @param {Boolean} isSuccess ????????????
         */

    }, {
        key: '_downLoaingEndHook',
        value: function _downLoaingEndHook(isSuccess) {
            _get(MiniRefreshTheme.prototype.__proto__ || Object.getPrototypeOf(MiniRefreshTheme.prototype), '_downLoaingEndHook', this).call(this, isSuccess);
        }

        /**
         * ??????loading?????????
         */

    }, {
        key: '_cancelLoaingHook',
        value: function _cancelLoaingHook() {
            _get(MiniRefreshTheme.prototype.__proto__ || Object.getPrototypeOf(MiniRefreshTheme.prototype), '_cancelLoaingHook', this).call(this);
        }
    }]);

    return MiniRefreshTheme;
}(BaseTheme);

MiniRefreshTheme.sign = 'drawerslider';
MiniRefreshTheme.version = version;
namespace('theme.drawerslider', MiniRefreshTheme);

return MiniRefreshTheme;

})));
