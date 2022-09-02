<template>
    <div :disabled="disabled || null" :class="computedClass" :style="computedStyle" @click="setActive">
        <m-badge :show="badge?.show" class="mvi-tabbar-badge" :content="badge?.content" :background="badge?.background" :color="badge?.color" :dot="badge?.dot" :placement="badge?.placement" :offset="badge?.offset">
            <div class="mvi-tabbar-item-child">
                <span class="mvi-tabbar-icon" v-if="iconType || iconUrl" :style="{marginBottom:(name?'':'0px')}">
                    <m-icon :type="iconType" :url="iconUrl" :spin="iconSpin" :size="iconSize" :color="iconColor" />
                </span>
                <span :class="['mvi-tabbar-name',(iconType || iconUrl)?'mvi-tabbar-name-small':'']" v-text="name"></span>
            </div>
        </m-badge>
    </div>
</template>

<script>
import $dap from 'dap-util'
import mIcon from '../icon/icon'
import mBadge from '../badge/badge.vue'
export default {
    name: 'm-tabbar-item',
    inject: ['tabbar'],
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
        iconType() {
            let type = null
            if ($dap.common.isObject(this.icon)) {
                if (typeof this.icon.type == 'string') {
                    type = this.icon.type
                }
            } else if (typeof this.icon == 'string') {
                type = this.icon
            }
            return type
        },
        iconUrl() {
            let url = null
            if ($dap.common.isObject(this.icon)) {
                if (typeof this.icon.url == 'string') {
                    url = this.icon.url
                }
            }
            return url
        },
        iconSpin() {
            let spin = false
            if ($dap.common.isObject(this.icon)) {
                if (typeof this.icon.spin == 'boolean') {
                    spin = this.icon.spin
                }
            }
            return spin
        },
        iconSize() {
            let size = null
            if ($dap.common.isObject(this.icon)) {
                if (typeof this.icon.size == 'string') {
                    size = this.icon.size
                }
            }
            return size
        },
        iconColor() {
            let color = null
            if ($dap.common.isObject(this.icon)) {
                if (typeof this.icon.color == 'string') {
                    color = this.icon.color
                }
            }
            return color
        },
        computedClass() {
            let cls = ['mvi-tabbar-item']
            if ($dap.common.equal(this.value, this.tabbar.modelValue)) {
                cls.push('mvi-tabbar-item-active')
            }
            if (
                this.tabbar.active &&
                !this.disabled &&
                !$dap.common.equal(this.value, this.tabbar.modelValue)
            ) {
                cls.push('mvi-tabbar-active')
            }
            return cls
        },
        computedStyle() {
            let style = {}
            //激活
            if ($dap.common.equal(this.value, this.tabbar.modelValue)) {
                if (this.tabbar.activeColor) {
                    style.color = this.tabbar.activeColor
                }
            } else {
                if (this.tabbar.inactiveColor) {
                    style.color = this.tabbar.inactiveColor
                }
            }
            return style
        },
        computedRoute() {
            if (!this.route) {
                return null
            }
            let route = {}
            if (typeof this.route == 'string') {
                route = {
                    path: this.route
                }
            } else if ($dap.common.isObject(this.route)) {
                //路径
                if (typeof this.route.path == 'string' && this.route.path) {
                    route.path = this.route.path
                }
                //路由名称
                if (typeof this.route.name == 'string' && this.route.name) {
                    route.name = this.route.name
                }
                //路由参数
                if ($dap.common.isObject(this.route.query)) {
                    route.query = this.route.query
                } else {
                    route.query = {}
                }
                //动态路由参数
                if ($dap.common.isObject(this.route.params)) {
                    route.params = this.route.params
                } else {
                    route.params = {}
                }
                //是否使用replace
                if (typeof this.route.replace == 'boolean') {
                    route.replace = this.route.replace
                } else {
                    route.replace = false
                }
            }
            if (!route.query) {
                route.query = {}
            }
            if (!route.params) {
                route.params = {}
            }
            return route
        }
    },
    components: {
        mIcon,
        mBadge
    },
    methods: {
        setActive() {
            this.tabbar.itemClick(Object.assign({}, this.$props))
            if (this.disabled) {
                return
            }
            if ($dap.common.equal(this.tabbar.modelValue, this.value)) {
                return
            }
            //如果路由存在
            if (
                this.computedRoute &&
                this.$router &&
                this.$router.replace &&
                this.$router.push
            ) {
                //path存在首先使用path
                if (this.computedRoute.path) {
                    if (this.computedRoute.replace) {
                        this.$router.replace({
                            path: this.computedRoute.path,
                            query: this.computedRoute.query,
                            params: this.computedRoute.params
                        })
                    } else {
                        this.$router.push({
                            path: this.computedRoute.path,
                            query: this.computedRoute.query,
                            params: this.computedRoute.params
                        })
                    }
                }
                //使用路由名称
                else if (this.computedRoute.name) {
                    if (this.computedRoute.replace) {
                        this.$router.replace({
                            name: this.computedRoute.name,
                            query: this.computedRoute.query,
                            params: this.computedRoute.params
                        })
                    } else {
                        this.$router.push({
                            name: this.computedRoute.name,
                            query: this.computedRoute.query,
                            params: this.computedRoute.params
                        })
                    }
                }
            }
            this.tabbar.getActiveValue(Object.assign({}, this.$props))
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-tabbar-item {
    position: relative;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    height: 100%;
    padding: 0 @mp-lg;
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}

.mvi-tabbar-badge {
    width: 100%;
}

.mvi-tabbar-item-child {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    vertical-align: middle;
}

.mvi-tabbar-item.mvi-tabbar-item-active {
    color: @info-normal;
}

.mvi-tabbar-icon {
    display: block;
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    font-size: @font-size-h4;
}

.mvi-tabbar-name {
    display: block;
    width: 100%;
    text-align: center;
    font-size: @font-size-h6;
    white-space: nowrap;

    &.mvi-tabbar-name-small {
        font-size: @font-size-small;
    }
}

.mvi-tabbar-active:active::before {
    .mvi-active();
}

.mvi-tabbar-item[disabled] {
    opacity: 0.6;
}
</style>
