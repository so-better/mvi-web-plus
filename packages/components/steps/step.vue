<template>
    <div class="mvi-step-vertical" v-if="steps.vertical">
        <div :class="['mvi-step-vertical-label',stepIndex==steps.active?'mvi-step-label-finish':'']" :style="labelStyle">
            <slot></slot>
        </div>
        <div class="mvi-step-vertical-container">
            <div class="mvi-step-vertical-icon">
                <m-icon class="mvi-step-icon-active-el" v-if="steps.active == stepIndex && steps.activeIcon" :type="steps.activeIconType" :url="steps.activeIconUrl" :spin="steps.activeIconSpin" :size="steps.activeIconSize" :color="steps.activeIconColor" :style="activeIconStyle" />
                <div class="mvi-step-circle-active" v-else-if="steps.active == stepIndex" :style="activeCircleStyle">
                </div>
                <m-icon :class="['mvi-step-icon-inactive-el',stepIndex<=steps.active?'mvi-step-icon-inactive-finish':'']" v-else-if="steps.inactiveIcon " :type="steps.inactiveIconType" :url="steps.inactiveIconUrl" :spin="steps.inactiveIconSpin" :style="inactiveIconStyle" :size="steps.inactiveIconSize" :color="steps.inactiveIconColor" />
                <div :class="['mvi-step-circle',stepIndex<=steps.active?'mvi-step-circle-finish':'']" v-else :style="circleStyle"></div>
            </div>
            <div :class="['mvi-step-vertical-line',stepIndex == steps.children.length-1?'mvi-step-line-last':'',stepIndex<steps.active?'mvi-step-line-finish':'']" :style="lineStyle"></div>
        </div>
    </div>
    <div v-else :class="['mvi-step',stepIndex==steps.children.length-1?'mvi-step-last':'']">
        <div :class="['mvi-step-label',stepIndex==steps.children.length-1?'mvi-step-label-last':'',stepIndex==0?'mvi-step-label-first':'',stepIndex==steps.active?'mvi-step-label-finish':'']" :style="labelStyle">
            <div>
                <slot></slot>
            </div>
        </div>
        <div class="mvi-step-container">
            <div :class="['mvi-step-icon',stepIndex==steps.children.length-1?'mvi-step-icon-last':'']" :style="stepIconStyle">
                <m-icon class="mvi-step-icon-active-el" v-if="steps.active == stepIndex && steps.activeIcon" :type="steps.activeIconType" :url="steps.activeIconUrl" :spin="steps.activeIconSpin" :size="steps.activeIconSize" :color="steps.activeIconColor" :style="activeIconStyle" />
                <div class="mvi-step-circle-active" v-else-if="steps.active == stepIndex" :style="activeCircleStyle">
                </div>
                <m-icon :class="['mvi-step-icon-inactive-el',stepIndex<=steps.active?'mvi-step-icon-inactive-finish':'']" v-else-if="steps.inactiveIcon " :type="steps.inactiveIconType" :url="steps.inactiveIconUrl" :spin="steps.inactiveIconSpin" :style="inactiveIconStyle" :size="steps.inactiveIconSize" :color="steps.inactiveIconColor" />
                <div :class="['mvi-step-circle',stepIndex<=steps.active?'mvi-step-circle-finish':'']" v-else :style="circleStyle"></div>
            </div>
            <div :class="['mvi-step-line',stepIndex == steps.children.length-1?'mvi-step-line-last':'',stepIndex<steps.active?'mvi-step-line-finish':'']" :style="lineStyle"></div>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import $dap from 'dap-util'
import mIcon from '../icon/icon.vue'
export default {
    name: 'm-step',
    data() {
        return {
            elm: null
        }
    },
    setup() {
        const uid = getCurrentInstance().uid
        return {
            uid
        }
    },
    inject: ['steps'],
    created() {
        this.steps.children.push(this)
    },
    mounted() {
        this.elm = this.$el
    },
    computed: {
        //step在steps中的序列值
        stepIndex() {
            return this.steps.children.findIndex(vm => {
                return $dap.common.equal(vm.uid, this.uid)
            })
        },
        //label
        labelStyle() {
            let style = {}
            if (this.steps.activeColor) {
                if (this.steps.active == this.stepIndex) {
                    style.color = this.steps.activeColor
                }
            }
            if (this.steps.inactiveColor) {
                if (this.steps.active != this.stepIndex) {
                    style.color = this.steps.inactiveColor
                }
            }
            return style
        },
        activeIconStyle() {
            let style = {}
            if (this.steps.activeColor) {
                if (this.steps.active == this.stepIndex) {
                    style.color = this.steps.activeColor
                }
            }
            return style
        },
        inactiveIconStyle() {
            let style = {}
            if (this.steps.inactiveColor) {
                if (this.stepIndex > this.steps.active) {
                    style.color = this.steps.inactiveColor
                }
            }
            if (this.steps.activeColor) {
                if (this.stepIndex <= this.steps.active) {
                    style.color = this.steps.activeColor
                }
            }
            return style
        },
        circleStyle() {
            let style = {}
            if (this.stepIndex <= this.steps.active) {
                if (this.steps.activeColor) {
                    style.backgroundColor = this.steps.activeColor
                }
            } else {
                if (this.steps.inactiveColor) {
                    style.backgroundColor = this.steps.inactiveColor
                }
            }
            return style
        },
        activeCircleStyle() {
            let style = {}
            if (this.steps.activeColor) {
                if (this.steps.active == this.stepIndex) {
                    style.backgroundColor = this.steps.activeColor
                }
            }
            return style
        },
        lineStyle() {
            let style = {}
            if (this.steps.activeColor) {
                if (this.stepIndex < this.steps.active) {
                    if (this.steps.vertical) {
                        style.borderRightColor = this.steps.activeColor
                    } else {
                        style.borderTopColor = this.steps.activeColor
                    }
                }
            }
            if (this.steps.inactiveColor) {
                if (this.stepIndex >= this.steps.active) {
                    if (this.steps.vertical) {
                        style.borderRightColor = this.steps.inactiveColor
                    } else {
                        style.borderTopColor = this.steps.inactiveColor
                    }
                }
            }
            return style
        },
        stepIconStyle() {
            let style = {}
            if (this.elm) {
                style.backgroundColor = $dap.element.getCssStyle(
                    this.steps.$el,
                    'background-color'
                )
            }
            return style
        }
    },
    components: {
        mIcon
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

//以下为垂直方向的步骤条样式
.mvi-step-vertical {
    display: block;
    width: 100%;
    padding: @mp-sm 0 @mp-sm @mini-height;
    position: relative;
}

.mvi-step-vertical-label {
    display: block;
    width: 100%;
    font-size: @font-size-small;
    color: @font-color-mute;
    position: relative;
    padding-left: @mp-sm;
}

.mvi-step-vertical-label.mvi-step-label-finish {
    color: @success-normal;
}

.mvi-step-vertical-container {
    position: absolute;
    left: 0;
    top: 0.25rem;
    width: @mini-height;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    flex-direction: column;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    align-items: center;
    height: 100%;
}

.mvi-step-vertical-icon {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.mvi-step-vertical-line {
    display: block;
    flex: 1;
    width: 0;
    border-right: 2px solid @font-color-mute;
}

.mvi-step-vertical-line.mvi-step-line-last {
    display: none;
}

.mvi-step-vertical-line.mvi-step-line-finish {
    border-right-color: @success-normal;
}

//以下为水平方向的步骤条样式
.mvi-step {
    display: flex;
    display: -webkit-flex;
    position: relative;
    flex: 1;
    padding-bottom: @mini-height;
}

.mvi-step.mvi-step-last {
    position: absolute;
    right: @mp-sm;
    width: auto;
}

.mvi-step-label {
    display: block;
    font-size: @font-size-small;
    color: @font-color-mute;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    margin-left: 0.15rem;
}

.mvi-step-label.mvi-step-label-last,
.mvi-step-label.mvi-step-label-first {
    transform: none;
    margin-left: 0;
}

.mvi-step-label.mvi-step-label-finish {
    color: @success-normal;
}

.mvi-step-container {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
    height: @mini-height;
    width: 100%;
}

.mvi-step-line {
    display: block;
    flex: 1;
    height: 0;
    border-top: 2px solid @font-color-mute;
}

.mvi-step-line.mvi-step-line-last {
    display: none;
}

.mvi-step-line.mvi-step-line-finish {
    border-top-color: @success-normal;
}

.mvi-step-icon {
    display: block;
    background-color: #fff;
}

.mvi-step-icon.mvi-step-icon-last {
    position: absolute;
    right: 0;
}

.mvi-step-icon-active-el {
    color: @success-normal;
}

.mvi-step-icon-inactive-el {
    color: @font-color-mute;
}

.mvi-step-icon-inactive-el.mvi-step-icon-inactive-finish {
    color: @success-normal;
}

.mvi-step-circle {
    display: block;
    width: 0.18rem;
    height: 0.18rem;
    background-color: @font-color-mute;
    border: none;
    border-radius: @radius-circle;
}

.mvi-step-circle.mvi-step-circle-finish {
    background-color: @success-normal;
}

.mvi-step-circle-active {
    display: block;
    width: 0.3rem;
    height: 0.3rem;
    background-color: @success-normal;
    border: none;
    border-radius: @radius-circle;
}
</style>
