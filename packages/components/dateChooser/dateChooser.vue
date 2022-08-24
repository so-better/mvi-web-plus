<template>
    <div :class="['mvi-date-chooser',block?'mvi-date-chooser-block':'']" :data-id="`mvi-date-chooser-${uid}`">
        <div class="mvi-date-chooser-target" :data-id="`mvi-date-chooser-target-${uid}`" ref="target" @click="clickCalendar">
            <slot></slot>
        </div>
        <m-layer :target="`[data-id='mvi-date-chooser-target-${uid}']`" :root="`[data-id='mvi-date-chooser-${uid}']`" v-model="show" :placement="layerRealProps.placement" :fixed="layerRealProps.fixed" :fixed-auto="layerRealProps.fixedAuto" :offset="layerRealProps.offset" :z-index="layerRealProps.zIndex" :wrapper-class="layerRealProps.wrapperClass" :shadow="layerRealProps.shadow" :border="layerRealProps.border" :animation="layerRealProps.animation" :border-color="layerRealProps.borderColor" :timeout="layerRealProps.timeout" :closable="closable" :show-triangle="layerRealProps.showTriangle" @showing="layerShow" ref="layer">
            <div class="mvi-date-chooser-layer" ref="panel">
                <div class="mvi-date-chooser-header">
                    <div class="mvi-date-chooser-header-left">
                        <span @mouseenter="hoverHeader(true, 0)" @mouseleave="hoverHeader(false, 0)" @click="goPrevYear" :class="headerItemClass(0)" :disabled="prevYearDisabled || null">
                            <m-icon type="angle-double-left" />
                        </span>
                        <span @mouseenter="hoverHeader(true, 1)" @mouseleave="hoverHeader(false, 1)" @click="goPrevMonth" :class="headerItemClass(1)" :disabled="(modelValue.getFullYear() <= startYear && modelValue.getMonth() == 0) || null" v-if="view == 'date'">
                            <m-icon type="angle-left" />
                        </span>
                    </div>
                    <div class="mvi-date-chooser-header-center">
                        <span v-if="view != 'year' && currentYear" @mouseenter="hoverHeader(true, 2)" @mouseleave="hoverHeader(false, 2)" v-text="currentYear" :class="headerItemClass(2)" @click="jumpViewYear"></span>
                        <span v-if="view == 'date' && currentMonth" @mouseenter="hoverHeader(true, 3)" @mouseleave="hoverHeader(false, 3)" v-text="currentMonth" :class="headerItemClass(3)" @click="jumpViewMonth"></span>
                        <span v-if="view == 'year' && currentYears" @mouseenter="hoverHeader(true, 4)" @mouseleave="hoverHeader(false, 4)" v-text="currentYears" :class="headerItemClass(4)"></span>
                    </div>
                    <div class="mvi-date-chooser-header-right">
                        <span @mouseenter="hoverHeader(true, 5)" @mouseleave="hoverHeader(false, 5)" @click="goNextMonth" :class="headerItemClass(5)" :disabled="(modelValue.getFullYear() >= endYear && modelValue.getMonth() == 11) || null" v-if="view == 'date'">
                            <m-icon type="angle-right" />
                        </span>
                        <span @mouseenter="hoverHeader(true, 6)" @mouseleave="hoverHeader(false, 6)" @click="goNextYear" :class="headerItemClass(6)" :disabled="nextYearDisabled || null">
                            <m-icon type="angle-double-right" />
                        </span>
                    </div>
                </div>
                <m-calendar :view="view" :model-value="modelValue" :month-text="monthText" :week-text="weekText" :start-year="startYear" :end-year="endYear" :now-class="nowClass" :current-class="currentClass" :non-current-click="false" :active="active" @date-click="dateClick" @month-click="monthClick" @year-click="yearClick" ref="calendar"></m-calendar>
            </div>
        </m-layer>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import $dap from 'dap-util'
import mLayer from '../layer/layer'
import mIcon from '../icon/icon'
import mCalendar from '../calendar/calendar'
export default {
    name: 'm-date-chooser',
    data() {
        return {
            target: null,
            layer: null,
            show: false,
            view: 'date',
            hover: [false, false, false, false, false, false, false]
        }
    },
    emits: ['update:modelValue', 'change'],
    props: {
        //当前日期
        modelValue: {
            type: Date,
            default: function () {
                return new Date()
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
            default: function () {
                return {}
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
            default: 'click',
            validator(value) {
                return ['hover', 'click', 'custom'].includes(value)
            }
        },
        //模式
        mode: {
            type: String,
            default: 'date',
            validator(value) {
                return ['year', 'month', 'date'].includes(value)
            }
        },
        //月份面板显示的月份数组文字
        monthText: {
            type: Array,
            default: function () {
                return [
                    '一月',
                    '二月',
                    '三月',
                    '四月',
                    '五月',
                    '六月',
                    '七月',
                    '八月',
                    '九月',
                    '十月',
                    '十一月',
                    '十二月'
                ]
            }
        },
        //头部显示的星期数组
        weekText: {
            type: Array,
            default: function () {
                return ['日', '一', '二', '三', '四', '五', '六']
            }
        },
        //开始年
        startYear: {
            type: Number,
            default: 1970
        },
        //结束年
        endYear: {
            type: Number,
            default: 2099
        },
        //当前日期显示样式
        nowClass: {
            type: [String, Object],
            default: null
        },
        //指定日期显示样式
        currentClass: {
            type: [String, Object],
            default: null
        },
        //日历面板点击态
        active: {
            type: Boolean,
            default: true
        },
        //头部悬浮样式
        headerHoverClass: {
            type: String,
            default: null
        },
        //是否块级
        block: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const instance = getCurrentInstance()
        return {
            uid: instance.uid
        }
    },
    computed: {
        currentYear() {
            //当前年份显示值
            return this.modelValue.getFullYear() + '年'
        },
        currentMonth() {
            //当前月份显示值
            let month = this.modelValue.getMonth() + 1
            return (month < 10 ? '0' + month : month) + '月'
        },
        hoverHeader() {
            //头部元素悬浮标记
            return (hover, index) => {
                this.hover[index] = hover
            }
        },
        headerItemClass() {
            //头部元素样式类
            return index => {
                let cls = []
                if (this.hover[index] && this.headerHoverClass) {
                    cls.push(this.headerHoverClass)
                }
                return cls
            }
        },
        currentYears() {
            //年视图下显示的中间年份区间
            if (this.layer) {
                let years = [...this.$refs.calendar.years]
                for (let i = 0; i < years.length; i++) {
                    if (years[i].year < this.startYear) {
                        years.splice(i, 1)
                    }
                    if (years[i].year > this.endYear) {
                        years.splice(i, 1)
                    }
                }
                return (
                    years[0].year +
                    '年 - ' +
                    years[years.length - 1].year +
                    '年'
                )
            } else {
                return ''
            }
        },
        prevYearDisabled() {
            if (this.view == 'year' && this.layer) {
                return this.$refs.calendar.years[0].year <= this.startYear
            } else {
                return this.modelValue.getFullYear() <= this.startYear
            }
        },
        nextYearDisabled() {
            if (this.view == 'year' && this.layer) {
                let years = this.$refs.calendar.years
                return years[years.length - 1].year >= this.endYear
            } else {
                return this.modelValue.getFullYear() >= this.endYear
            }
        },
        layerRealProps() {
            return {
                placement: this.layerProps.placement
                    ? this.layerProps.placement
                    : 'bottom-start',
                fixed:
                    typeof this.layerProps.fixed == 'boolean'
                        ? this.layerProps.fixed
                        : false,
                fixedAuto:
                    typeof this.layerProps.fixedAuto == 'boolean'
                        ? this.layerProps.fixedAuto
                        : false,
                width: this.layerProps.width,
                zIndex: $dap.number.isNumber(this.layerProps.zIndex)
                    ? this.layerProps.zIndex
                    : 400,
                offset: this.layerProps.offset
                    ? this.layerProps.offset
                    : '0.2rem',
                wrapperClass: this.layerProps.wrapperClass,
                animation: this.layerProps.animation,
                timeout: $dap.number.isNumber(this.layerProps.timeout)
                    ? this.layerProps.timeout
                    : 300,
                showTriangle:
                    typeof this.layerProps.showTriangle == 'boolean'
                        ? this.layerProps.showTriangle
                        : false,
                shadow:
                    typeof this.layerProps.shadow == 'boolean'
                        ? this.layerProps.shadow
                        : true,
                border:
                    typeof this.layerProps.border == 'boolean'
                        ? this.layerProps.border
                        : false,
                borderColor: this.layerProps.borderColor
            }
        }
    },
    components: {
        mLayer,
        mIcon,
        mCalendar
    },
    created() {
        this.view = this.mode
    },
    mounted() {
        if (this.trigger == 'hover') {
            $dap.event.on(this.$el, 'mouseenter.dateChooser', this.openCalendar)
            $dap.event.on(
                this.$el,
                'mouseleave.dateChooser',
                this.closeCalendar
            )
        }
    },
    methods: {
        //悬浮层显示前进行宽度设置
        layerShow() {
            if (this.layerRealProps.width) {
                this.$refs.panel.style.width = this.layerRealProps.width
            } else {
                this.$refs.panel.style.width =
                    this.$refs.target.offsetWidth + 'px'
            }
            if (!this.layer) {
                this.layer = this.$refs.layer
            }
        },
        //打开日期选择弹窗
        openCalendar() {
            if (this.disabled) {
                return
            }
            this.show = true
        },
        //关闭日期选择弹窗
        closeCalendar() {
            if (this.disabled) {
                return
            }
            this.show = false
        },
        //点击打开/关闭日历弹窗
        clickCalendar() {
            if (this.disabled) {
                return
            }
            if (this.trigger == 'click') {
                if (this.show) {
                    this.closeCalendar()
                } else {
                    this.openCalendar()
                }
            }
        },
        //点击日期
        dateClick(res) {
            if (event || window.event) {
                event.stopPropagation()
            }
            if (this.disabled) {
                return
            }
            this.$emit('update:modelValue', res.date)
            this.$emit('change', res.date)
            this.show = false
        },
        //点击年份
        yearClick(res) {
            if (event || window.event) {
                event.stopPropagation()
            }
            if (this.disabled) {
                return
            }
            //如果只是年选择模式
            if (this.mode == 'year') {
                this.show = false
            }
            //月选择模式或者日期选择模式
            else {
                this.view = 'month'
            }
            this.$emit('update:modelValue', res.date)
            this.$emit('change', res.date)
        },
        //点击月份
        monthClick(res) {
            if (event || window.event) {
                event.stopPropagation()
            }
            if (this.disabled) {
                return
            }
            if (this.mode == 'date') {
                this.view = 'date'
            } else {
                this.show = false
            }
            this.$emit('update:modelValue', res.date)
            this.$emit('change', res.date)
        },
        //前一年
        goPrevYear() {
            if (this.view == 'year') {
                let years = this.$refs.calendar.years
                let date = this.modelValue
                let year = date.getFullYear()
                if (years[0].year <= this.startYear) {
                    return
                } else if (years[0].year - this.startYear < 12) {
                    date = new Date(date.setFullYear(this.startYear))
                } else {
                    date = new Date(date.setFullYear(year - 12))
                }
                this.$emit('update:modelValue', date)
                this.$emit('change', date)
            } else {
                let date = this.modelValue
                let year = date.getFullYear()
                if (year <= this.startYear) {
                    return
                }
                date = new Date(date.setFullYear(year - 1))
                this.$emit('update:modelValue', date)
                this.$emit('change', date)
            }
        },
        //前一月
        goPrevMonth() {
            let date = this.modelValue
            if (date.getFullYear() <= this.startYear && date.getMonth() == 0) {
                return
            }
            let prevMonths = $dap.date.getPrevMonths(date, 2)
            date = prevMonths[1]
            this.$emit('update:modelValue', date)
            this.$emit('change', date)
        },
        //下一年
        goNextYear() {
            if (this.view == 'year') {
                let years = this.$refs.calendar.years
                let date = this.modelValue
                let year = date.getFullYear()
                if (years[years.length - 1].year >= this.endYear) {
                    return
                } else if (this.endYear - years[years.length - 1].year < 12) {
                    date = new Date(date.setFullYear(this.endYear))
                } else {
                    date = new Date(date.setFullYear(year + 12))
                }
                this.$emit('update:modelValue', date)
                this.$emit('change', date)
            } else {
                let date = this.modelValue
                let year = date.getFullYear()
                if (year >= this.endYear) {
                    return
                }
                date = new Date(date.setFullYear(year + 1))
                this.$emit('update:modelValue', date)
                this.$emit('change', date)
            }
        },
        //下一月
        goNextMonth() {
            let date = this.modelValue
            if (date.getFullYear() >= this.endYear && date.getMonth() == 11) {
                return
            }
            let nextMonths = $dap.date.getNextMonths(date, 2)
            date = nextMonths[1]
            this.$emit('update:modelValue', date)
            this.$emit('change', date)
        },
        //跳转年视图
        jumpViewYear(event) {
            event.stopPropagation()
            this.hover = [false, false, false, false, true, false, false]
            this.view = 'year'
        },
        //跳转月视图
        jumpViewMonth(event) {
            event.stopPropagation()
            this.hover = [false, false, false, false, false, false, false]
            this.view = 'month'
        },
        //跳转日期视图
        jumpViewDate(event) {
            event.stopPropagation()
            this.hover = [false, false, false, false, false, false, false]
            this.view = 'date'
        }
    },
    beforeUnmount() {
        if (this.trigger == 'hover') {
            $dap.event.off(
                this.$el,
                'mouseenter.dateChooser mouseleave.dateChooser'
            )
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-date-chooser {
    position: relative;
    display: inline-block;

    .mvi-date-chooser-target {
        position: relative;
        display: inline-block;
    }

    &.mvi-date-chooser-block {
        display: block;

        .mvi-date-chooser-target {
            display: block;
        }
    }
}

.mvi-date-chooser-layer {
    display: block;
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    color: @font-color-default;
    border-radius: inherit;
}

.mvi-date-chooser-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 @mp-md;
    height: 0.88rem;

    .mvi-date-chooser-header-left,
    .mvi-date-chooser-header-right,
    .mvi-date-chooser-header-center {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .mvi-date-chooser-header-left,
    .mvi-date-chooser-header-right {
        & > span {
            display: block;
            font-size: @font-size-small;
            color: @font-color-sub;
            padding: @mp-xs @mp-xs;
            border-radius: @radius-default;

            &:hover {
                cursor: pointer;
                color: @info-normal;
            }

            &[disabled] {
                color: @font-color-mute !important;
            }
        }

        & > span + span {
            margin-left: @mp-xs;
        }
    }

    .mvi-date-chooser-header-center {
        font-size: @font-size-default;
        color: @font-color-default;

        & > span {
            display: block;
            padding: @mp-xs @mp-xs;
            border-radius: @radius-default;

            &:hover {
                cursor: pointer;
                color: @info-normal;
            }

            &[disabled] {
                color: @font-color-mute !important;
            }
        }
    }
}
</style>
