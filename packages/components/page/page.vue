<template>
    <div class="mvi-page">
        <div v-if="firstText || firstIconType || firstIconUrl" :disabled="modelValue==1 || null" @click="pageFirst" :class="['mvi-page-first',(active&&modelValue!=1)?'mvi-page-active':'']" :style="{color:(modelValue==1?'':color || '')}">
            <m-icon :class="['mvi-page-icon',firstText?'mvi-page-margin-right':'']" v-if="firstIconType || firstIconUrl" :type="firstIconType" :url="firstIconUrl" :spin="firstIconSpin" :size="firstIconSize" :color="firstIconColor" />
            <span v-if="firstText" v-text="firstText"></span>
        </div>
        <div v-if="prevText || prevIconType || prevIconUrl" :disabled="modelValue==1 || null" @click="pagePrev" :class="['mvi-page-prev',(active&&modelValue!=1)?'mvi-page-active':'']" :style="{color:(modelValue==1?'':color || '')}">
            <m-icon :class="['mvi-page-icon',prevText?'mvi-page-margin-right':'']" v-if="prevIconType|| prevIconUrl" :type="prevIconType" :url="prevIconUrl" :size="prevIconSize" :spin="prevIconSpin" :color="prevIconColor" />
            <span v-if="prevText" v-text="prevText"></span>
        </div>
        <div class="mvi-page-numbers">
            <div class="mvi-page-numbers-simple" v-if="simple">{{modelValue}} / {{total}}</div>
            <div class="mvi-page-numbers-items" v-else>
                <!--total不超过overNumber -->
                <template v-for="(item,index) in total">
                    <div v-if="total<=overNumber" :class="['mvi-page-numbers-item',modelValue==item?'mvi-page-number-active':'',(active&&modelValue!=item)?'mvi-page-active':'']" :key="'page-'+index" v-text="item" @click="toPage(item)" :style="pageStyle(item)"></div>
                </template>
                <!-- total超过overNumber -->
                <div v-if="total>overNumber && modelValue > (overNumber-1)/2+1" :class="['mvi-page-numbers-item',active?'mvi-page-active':'']" @click="toPage(modelValue-(overNumber-1))" :style="{color:color || ''}">...</div>
                <template v-for="(item,index) in arr">
                    <div v-if="total>overNumber" :class="['mvi-page-numbers-item',modelValue==item?'mvi-page-number-active':'',(active&&modelValue!=item)?'mvi-page-active':'']" :key="'page2-'+index" v-text="item" @click="toPage(item)" :style="pageStyle(item)"></div>
                </template>
                <div v-if="total>overNumber && modelValue < (total - (overNumber-1)/2)" :class="['mvi-page-numbers-item',active?'mvi-page-active':'']" @click="toPage(modelValue+(overNumber-1))" :style="{color:color || ''}">...</div>
            </div>
        </div>
        <div v-if="nextText || nextIconType || nextIconUrl" :disabled="modelValue==total || null" @click="pageNext" :class="['mvi-page-next',(active&&modelValue!=total)?'mvi-page-active':'']" :style="{color:modelValue==total?'':(color || '')}">
            <span v-if="nextText" v-text="nextText"></span>
            <m-icon :class="['mvi-page-icon',nextText?'mvi-page-margin-left':'']" v-if="nextIconType|| nextIconUrl" :type="nextIconType" :url="nextIconUrl" :size="nextIconSize" :spin="nextIconSpin" :color="nextIconColor" />
        </div>
        <div v-if="lastText || lastIconType || lastIconUrl" :disabled="modelValue==total || null" @click="pageLast" :class="['mvi-page-last',(active&&modelValue!=total)?'mvi-page-active':'']" :style="{color:(modelValue==total?'':color || '')}">
            <span v-if="lastText" v-text="lastText"></span>
            <m-icon :class="['mvi-page-icon',lastText?'mvi-page-margin-left':'']" v-if="lastIconType || lastIconUrl" :type="lastIconType" :url="lastIconUrl" :size="lastIconSize" :spin="lastIconSpin" :color="lastIconColor" />
        </div>
    </div>
</template>

<script>
import $dap from 'dap-util'
import mIcon from '../icon/icon.vue'
export default {
    name: 'm-page',
    data() {
        return {
            el: null
        }
    },
    emits: ['update:modelValue', 'change'],
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
                return value % 2 != 0
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
            default: null
        },
        //下一页显示的图标
        nextIcon: {
            type: [String, Object],
            default: null
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
            default: null
        },
        //尾页显示的图标
        lastIcon: {
            type: [Object, String],
            default: null
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
            return item => {
                let style = {}
                if (this.modelValue == item) {
                    if (this.el) {
                        style.color = $dap.element.getCssStyle(
                            this.el,
                            'background-color'
                        )
                    }
                    style.backgroundColor = this.color || ''
                } else {
                    style.color = this.color || ''
                }
                return style
            }
        },
        arr() {
            let arr = []
            if (this.modelValue <= (this.overNumber - 1) / 2 + 1) {
                for (let i = 0; i < this.overNumber; i++) {
                    arr.push(i + 1)
                }
            } else if (
                this.modelValue <=
                this.total - (this.overNumber - 1) / 2
            ) {
                for (let i = 0; i < (this.overNumber - 1) / 2; i++) {
                    arr.push(this.modelValue - ((this.overNumber - 1) / 2 - i))
                }
                arr.push(this.modelValue)
                for (let i = 0; i < (this.overNumber - 1) / 2; i++) {
                    arr.push(this.modelValue + (i + 1))
                }
            } else {
                for (let i = 0; i < this.overNumber; i++) {
                    arr.push(this.total - (this.overNumber - 1 - i))
                }
            }
            return arr
        },
        firstIconType() {
            let type = 'angle-double-left'
            if ($dap.common.isObject(this.firstIcon)) {
                if (typeof this.firstIcon.type == 'string') {
                    type = this.firstIcon.type
                }
            } else if (typeof this.firstIcon == 'string') {
                type = this.firstIcon
            }
            return type
        },
        firstIconUrl() {
            let url = null
            if ($dap.common.isObject(this.firstIcon)) {
                if (typeof this.firstIcon.url == 'string') {
                    url = this.firstIcon.url
                }
            }
            return url
        },
        firstIconSpin() {
            let spin = false
            if ($dap.common.isObject(this.firstIcon)) {
                if (typeof this.firstIcon.spin == 'boolean') {
                    spin = this.firstIcon.spin
                }
            }
            return spin
        },
        firstIconSize() {
            let size = null
            if ($dap.common.isObject(this.firstIcon)) {
                if (typeof this.firstIcon.size == 'string') {
                    size = this.firstIcon.size
                }
            }
            return size
        },
        firstIconColor() {
            let color = null
            if ($dap.common.isObject(this.firstIcon)) {
                if (typeof this.firstIcon.color == 'string') {
                    color = this.firstIcon.color
                }
            }
            return color
        },
        lastIconType() {
            let type = 'angle-double-right'
            if ($dap.common.isObject(this.lastIcon)) {
                if (typeof this.lastIcon.type == 'string') {
                    type = this.lastIcon.type
                }
            } else if (typeof this.lastIcon == 'string') {
                type = this.lastIcon
            }
            return type
        },
        lastIconUrl() {
            let url = null
            if ($dap.common.isObject(this.lastIcon)) {
                if (typeof this.lastIcon.url == 'string') {
                    url = this.lastIcon.url
                }
            }
            return url
        },
        lastIconSpin() {
            let spin = false
            if ($dap.common.isObject(this.lastIcon)) {
                if (typeof this.lastIcon.spin == 'boolean') {
                    spin = this.lastIcon.spin
                }
            }
            return spin
        },
        lastIconSize() {
            let size = null
            if ($dap.common.isObject(this.lastIcon)) {
                if (typeof this.lastIcon.size == 'string') {
                    size = this.lastIcon.size
                }
            }
            return size
        },
        lastIconColor() {
            let color = null
            if ($dap.common.isObject(this.lastIcon)) {
                if (typeof this.lastIcon.color == 'string') {
                    color = this.lastIcon.color
                }
            }
            return color
        },
        prevIconType() {
            let type = 'angle-left'
            if ($dap.common.isObject(this.prevIcon)) {
                if (typeof this.prevIcon.type == 'string') {
                    type = this.prevIcon.type
                }
            } else if (typeof this.prevIcon == 'string') {
                type = this.prevIcon
            }
            return type
        },
        prevIconUrl() {
            let url = null
            if ($dap.common.isObject(this.prevIcon)) {
                if (typeof this.prevIcon.url == 'string') {
                    url = this.prevIcon.url
                }
            }
            return url
        },
        prevIconSpin() {
            let spin = false
            if ($dap.common.isObject(this.prevIcon)) {
                if (typeof this.prevIcon.spin == 'boolean') {
                    spin = this.prevIcon.spin
                }
            }
            return spin
        },
        prevIconSize() {
            let size = null
            if ($dap.common.isObject(this.prevIcon)) {
                if (typeof this.prevIcon.size == 'string') {
                    size = this.prevIcon.size
                }
            }
            return size
        },
        prevIconColor() {
            let color = null
            if ($dap.common.isObject(this.prevIcon)) {
                if (typeof this.prevIcon.color == 'string') {
                    color = this.prevIcon.color
                }
            }
            return color
        },
        nextIconType() {
            let type = 'angle-right'
            if ($dap.common.isObject(this.nextIcon)) {
                if (typeof this.nextIcon.type == 'string') {
                    type = this.nextIcon.type
                }
            } else if (typeof this.nextIcon == 'string') {
                type = this.nextIcon
            }
            return type
        },
        nextIconUrl() {
            let url = null
            if ($dap.common.isObject(this.nextIcon)) {
                if (typeof this.nextIcon.url == 'string') {
                    url = this.nextIcon.url
                }
            }
            return url
        },
        nextIconSpin() {
            let spin = false
            if ($dap.common.isObject(this.nextIcon)) {
                if (typeof this.nextIcon.spin == 'boolean') {
                    spin = this.nextIcon.spin
                }
            }
            return spin
        },
        nextIconSize() {
            let size = null
            if ($dap.common.isObject(this.nextIcon)) {
                if (typeof this.nextIcon.size == 'string') {
                    size = this.nextIcon.size
                }
            }
            return size
        },
        nextIconColor() {
            let color = null
            if ($dap.common.isObject(this.nextIcon)) {
                if (typeof this.nextIcon.color == 'string') {
                    color = this.nextIcon.color
                }
            }
            return color
        }
    },
    components: {
        mIcon
    },
    mounted() {
        this.el = this.$el
    },
    methods: {
        //上一页
        pagePrev() {
            if (this.modelValue == 1) {
                return
            }
            let page = this.modelValue - 1
            this.$emit('update:modelValue', page)
            this.$emit('change', page)
        },
        //下一页
        pageNext() {
            if (this.modelValue == this.total) {
                return
            }
            let page = this.modelValue + 1
            this.$emit('update:modelValue', page)
            this.$emit('change', page)
        },
        //首页
        pageFirst() {
            if (this.modelValue == 1) {
                return
            }
            this.$emit('update:modelValue', 1)
            this.$emit('change', 1)
        },
        //尾页
        pageLast() {
            if (this.modelValue == this.total) {
                return
            }
            this.$emit('update:modelValue', this.total)
            this.$emit('change', this.total)
        },
        //指定页
        toPage(page) {
            if (this.modelValue == page) {
                return
            }
            if (page >= this.total) {
                page = this.total
            }
            if (page <= 1) {
                page = 1
            }
            this.$emit('update:modelValue', page)
            this.$emit('change', page)
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-page {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    width: 100%;
    height: @medium-height;
    border: 1px solid @border-color;
    font-size: @font-size-default;
    border-radius: @radius-default;
    overflow: hidden;
}

.mvi-page-first {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex: 1;
    height: 100%;
    padding: 0 @mp-md;
    border-right: 1px solid @border-color;
    color: @info-normal;
    white-space: nowrap;
    cursor: pointer;
}

.mvi-page-last {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    flex: 1;
    padding: 0 @mp-md;
    border-left: 1px solid @border-color;
    color: @info-normal;
    white-space: nowrap;
    cursor: pointer;
}

.mvi-page-prev {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex: 1;
    height: 100%;
    padding: 0 @mp-md;
    border-right: 1px solid @border-color;
    color: @info-normal;
    white-space: nowrap;
    cursor: pointer;
}

.mvi-page-next {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    flex: 1;
    padding: 0 @mp-md;
    border-left: 1px solid @border-color;
    color: @info-normal;
    white-space: nowrap;
    cursor: pointer;
}

.mvi-page-active:active::before {
    .mvi-active();
}

.mvi-page-prev[disabled],
.mvi-page-next[disabled],
.mvi-page-first[disabled],
.mvi-page-last[disabled] {
    color: @font-color-mute;
}

.mvi-page-numbers {
    display: block;
    height: 100%;
}

.mvi-page-numbers-simple {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: @font-color-sub;
    vertical-align: middle;
    padding: 0 @mp-lg;
    white-space: nowrap;
}

.mvi-page-numbers-items {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;

    .mvi-page-numbers-item {
        width: @small-height;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 100%;
        border-right: 1px solid @border-color;
        color: @info-normal;
        white-space: nowrap;
        cursor: pointer;

        &:last-child {
            border-right: none;
        }

        &.mvi-page-number-active {
            background-color: @info-normal;
            color: #fff;
        }
    }
}

.mvi-page-icon.mvi-page-margin-right {
    margin-right: @mp-xs;
}

.mvi-page-icon.mvi-page-margin-left {
    margin-left: @mp-xs;
}
</style>
