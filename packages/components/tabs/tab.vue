<template>
    <transition :name="'mvi-tab-'+tabs.animation+(back?'-back':'')">
        <div v-show="show" v-if="firstShow" class="mvi-tab" :style="tabStyle">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
import { getCurrentInstance } from 'vue'
import $dap from 'dap-util'
export default {
    name: 'm-tab',
    inject: ['tabs'],
    data() {
        return {
            show: false,
            back: false,
            firstShow: false
        }
    },
    setup() {
        const uid = getCurrentInstance().uid
        return {
            uid
        }
    },
    created() {
        this.tabs.children.push(this)
        if (this.tabs.modelValue == this.tabIndex) {
            this.show = true
            if (!this.firstShow) {
                this.firstShow = true
            }
        }
    },
    props: {
        //标题
        title: {
            type: String,
            default: ''
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
            default: 'left',
            validator(value) {
                return ['left', 'right'].includes(value)
            }
        }
    },
    computed: {
        tabStyle() {
            let style = {}
            if (this.tabs.animation == 'slide') {
                style.transition =
                    'left ' +
                    this.tabs.timeout +
                    'ms,opacity ' +
                    this.tabs.timeout +
                    'ms'
                style.webkitTransition =
                    'left ' +
                    this.tabs.timeout +
                    'ms,opacity ' +
                    this.tabs.timeout +
                    'ms'
            } else if (this.tabs.animation == 'fade') {
                style.transition = 'opacity ' + this.tabs.timeout + 'ms'
                style.webkitTransition = 'opacity ' + this.tabs.timeout + 'ms'
            }
            if (this.tabs.contentBackground) {
                style.backgroundColor = this.tabs.contentBackground
            }
            return style
        },
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
        //tab在tabs中的序列值
        tabIndex() {
            return this.tabs.children.findIndex(vm => {
                return $dap.common.equal(vm.uid, this.uid)
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-tab {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0;
    background-color: #fff;
}

.mvi-tab-fade-enter-from,
.mvi-tab-fade-leave-to,
.mvi-tab-fade-back-enter-from,
.mvi-tab-fade-back-leave-to {
    opacity: 0;
}

.mvi-tab-slide-enter-from {
    left: 100%;
    opacity: 0;
}

.mvi-tab-slide-leave-to {
    left: -100%;
    opacity: 0;
}

.mvi-tab-slide-back-enter-from {
    left: -100%;
    opacity: 0;
}

.mvi-tab-slide-back-leave-to {
    left: 100%;
    opacity: 0;
}
</style>
