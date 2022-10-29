<template>
    <div class="mvi-colorPicker">
        <!-- 饱和度和明度面板 -->
        <div ref="panel" class="mvi-colorPicker-panel" @click="clickPanelSetColor">
            <div ref="panelSlide" class="mvi-colorPicker-panel-slide"></div>
        </div>
        <!-- 色相 -->
        <div ref="hue" class="mvi-colorPicker-hue" @click="clickHueSetColor">
            <div ref="hueSlide" class="mvi-colorPicker-hue-slide"></div>
        </div>
        <!-- 透明度 -->
        <div v-if="showAlpha && !hex" ref="alpha" class="mvi-colorPicker-alpha" @click="clickAlphaSetColor">
            <div ref="alphaSlide" class="mvi-colorPicker-alpha-slide"></div>
            <div ref="bg" class="mvi-colorPicker-alpha-background"></div>
        </div>
    </div>
</template>

<script>
import { Dap } from '../dap'
import { Drag } from '../drag'
import { Prop } from '../prop'
export default {
    name: 'm-color-picker',
    data() {
        return {
            //hsv颜色值
            hsv: new Array(3),
            //透明度
            opacity: 1,
            //rgb值
            rgb: new Array(3),
            //是否拖动或者点击引起的值变化
            drag: false,
            //是否在拖动
            isDrag: false,
            panelDrag: null,
            hueDrag: null,
            alphaDrag: null,
            panelProp: null
        }
    },
    emits: ['update:modelValue', 'change'],
    props: {
        //颜色值
        modelValue: {
            type: String,
            default: '#ff0000'
        },
        //是否显示透明度滑动条
        showAlpha: {
            type: Boolean,
            default: true
        },
        //双向绑定的数值是否为16进制值
        hex: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        //颜色值变化更新选取器滑块位置
        modelValue(newValue) {
            if (this.drag) {
                return
            }
            this.initSet()
        },
        showAlpha(newValue) {
            if (newValue) {
                this.$nextTick(() => {
                    this.setDragsAndProps()
                })
            }
        }
    },
    mounted() {
        this.setDragsAndProps()
        this.initSet()
    },
    methods: {
        //设置拖拽和高度
        setDragsAndProps() {
            //设置高度
            if (!this.panelProp) {
                this.panelProp = new Prop(this.$refs.panel, 0.7)
                this.panelProp.init()
            }
            //设置饱和度面板拖拽功能
            if (!this.panelDrag) {
                this.panelDrag = new Drag(this.$refs.panelSlide, {
                    container: this.$refs.panel,
                    mode: 'on',
                    draggableX: true,
                    draggableY: true,
                    cursor: false,
                    beforedrag: () => {
                        this.drag = true
                        this.isDrag = true
                    },
                    drag: () => {
                        this.setColorBySlides()
                    },
                    dragged: () => {
                        this.drag = false
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.isDrag = false
                            }, 10)
                        })
                    }
                })
                this.panelDrag.init()
            }
            //设置色相面板拖拽功能
            if (!this.hueDrag) {
                this.hueDrag = new Drag(this.$refs.hueSlide, {
                    container: this.$refs.hue,
                    mode: 'on',
                    draggableX: true,
                    draggableY: false,
                    cursor: false,
                    beforedrag: () => {
                        this.drag = true
                        this.isDrag = true
                    },
                    drag: () => {
                        this.setColorBySlides()
                    },
                    dragged: () => {
                        this.drag = false
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.isDrag = false
                            }, 10)
                        })
                    }
                })
                this.hueDrag.init()
            }
            //设置透明度面板拖拽功能
            if (this.showAlpha && !this.hex && !this.alphaDrag) {
                this.alphaDrag = new Drag(this.$refs.alphaSlide, {
                    container: this.$refs.alpha,
                    mode: 'on',
                    draggableX: true,
                    draggableY: false,
                    cursor: false,
                    beforedrag: () => {
                        this.drag = true
                        this.isDrag = true
                    },
                    drag: () => {
                        this.setColorBySlides()
                    },
                    dragged: () => {
                        this.drag = false
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.isDrag = false
                            }, 10)
                        })
                    }
                })
                this.alphaDrag.init()
            }
        },
        //点击明度和饱和度面板直接设置颜色
        clickPanelSetColor(e) {
            if (this.isDrag) {
                return
            }
            this.drag = true
            this.$refs.panelSlide.style.left =
                e.offsetX - this.$refs.panelSlide.offsetWidth / 2 + 'px'
            this.$refs.panelSlide.style.top =
                e.offsetY - this.$refs.panelSlide.offsetHeight / 2 + 'px'
            this.setColorBySlides().then(() => {
                this.drag = false
            })
        },
        //点击色相面板直接设置颜色
        clickHueSetColor(e) {
            if (this.isDrag) {
                return
            }
            this.drag = true
            this.$refs.hueSlide.style.left =
                e.offsetX - this.$refs.hueSlide.offsetWidth / 2 + 'px'
            this.setColorBySlides().then(() => {
                this.drag = false
            })
        },
        //点击透明度面板直接设置颜色
        clickAlphaSetColor(e) {
            if (this.isDrag) {
                return
            }
            this.drag = true
            this.$refs.alphaSlide.style.left =
                e.offsetX - this.$refs.alphaSlide.offsetWidth / 2 + 'px'
            this.setColorBySlides().then(() => {
                this.drag = false
            })
        },
        //初始化设置rgb、hsv和opacity
        initSet() {
            if (this.drag) {
                return
            }
            //如果值为16进制的
            if (
                this.modelValue &&
                Dap.common.matchingText(this.modelValue, 'hex')
            ) {
                this.rgb = Dap.color.hex2rgb(this.modelValue)
                this.hsv = Dap.color.rgb2hsv(this.rgb)
                this.opacity = 1
            }
            //为rgb格式的
            else {
                try {
                    let first = this.modelValue.indexOf('(')
                    let last = this.modelValue.lastIndexOf(')')
                    let str = this.modelValue.substring(first + 1, last)
                    let arry = str.split(',')
                    if (arry.length < 3) {
                        throw new Error(
                            'Color values are not RGB (RGBA) format and hexadecimal format'
                        )
                    }
                    this.rgb = [
                        Number(arry[0]),
                        Number(arry[1]),
                        Number(arry[2])
                    ]
                    if (arry.length == 4) {
                        this.opacity = arry[3]
                    } else {
                        this.opacity = 1
                    }
                    this.hsv = Dap.color.rgb2hsv(this.rgb)
                    //如果是hex，则变为16进制值
                    if (this.hex) {
                        this.$emit(
                            'update:modelValue',
                            Dap.color.rgb2hex(this.rgb)
                        )
                    }
                } catch (e) {
                    throw new Error(
                        'Color values are not RGB (RGBA) format and hexadecimal format'
                    )
                }
            }
            //设置滑块位置
            this.setSlidesByColor()
        },
        //根据颜色设置滑块位置
        setSlidesByColor() {
            if (this.drag) {
                return
            }
            let h = this.hsv[0]
            let s = this.hsv[1]
            let v = this.hsv[2]
            this.$refs.panelSlide.style.left =
                (s / 100) * this.$refs.panel.offsetWidth -
                this.$refs.panelSlide.offsetWidth / 2 +
                'px'
            this.$refs.panelSlide.style.top =
                (1 - v / 100) * this.$refs.panel.offsetHeight -
                this.$refs.panelSlide.offsetHeight / 2 +
                'px'
            this.$refs.hueSlide.style.left =
                (h / 360) * this.$refs.hue.offsetWidth -
                this.$refs.hueSlide.offsetWidth / 2 +
                'px'
            let sv_rgb = Dap.color.hsv2rgb([h, 100, 100])
            this.$refs.panel.style.background =
                'rgba(' +
                sv_rgb[0] +
                ',' +
                sv_rgb[1] +
                ',' +
                sv_rgb[2] +
                ',' +
                this.opacity +
                ')' //设置选色面板的颜色
            if (this.$refs.alphaSlide && this.$refs.alpha && this.$refs.bg) {
                this.$refs.alphaSlide.style.left =
                    this.opacity * this.$refs.alpha.offsetWidth -
                    this.$refs.alphaSlide.offsetWidth / 2 +
                    'px'
                this.$refs.bg.style.background =
                    'linear-gradient(to right, transparent 0%,rgb(' +
                    sv_rgb[0] +
                    ',' +
                    sv_rgb[1] +
                    ',' +
                    sv_rgb[2] +
                    ') 100%)'
            }
        },
        //根据滑块位置设置颜色
        setColorBySlides() {
            return new Promise(resolve => {
                let placementSV = Dap.element.getElementPoint(
                    this.$refs.panelSlide,
                    this.$refs.panel
                )
                let placementHue = Dap.element.getElementPoint(
                    this.$refs.hueSlide,
                    this.$refs.hue
                )
                this.hsv[1] = Math.round(
                    ((placementSV.left +
                        this.$refs.panelSlide.offsetWidth / 2) /
                        this.$refs.panel.offsetWidth) *
                        100
                )
                this.hsv[2] = Math.round(
                    (1 -
                        (placementSV.top +
                            this.$refs.panelSlide.offsetHeight / 2) /
                            this.$refs.panel.offsetHeight) *
                        100
                )
                this.hsv[0] = Math.round(
                    ((placementHue.left + this.$refs.hueSlide.offsetWidth / 2) /
                        this.$refs.hue.offsetWidth) *
                        360
                )
                this.rgb = Dap.color.hsv2rgb(this.hsv) //转rgb值
                let sv_rgb = Dap.color.hsv2rgb([this.hsv[0], 100, 100])
                this.$refs.panel.style.background =
                    'rgba(' +
                    sv_rgb[0] +
                    ',' +
                    sv_rgb[1] +
                    ',' +
                    sv_rgb[2] +
                    ',' +
                    this.opacity +
                    ')' //设置选色面板的颜色
                let placementAlpha = null
                if (
                    this.$refs.alphaSlide &&
                    this.$refs.alpha &&
                    this.$refs.bg
                ) {
                    placementAlpha = Dap.element.getElementPoint(
                        this.$refs.alphaSlide,
                        this.$refs.alpha
                    )
                    this.opacity =
                        Math.round(
                            ((placementAlpha.left +
                                this.$refs.alphaSlide.offsetWidth / 2) /
                                this.$refs.alpha.offsetWidth) *
                                100
                        ) / 100
                    if (this.opacity >= 1) {
                        this.opacity = 1
                    }
                    if (this.opacity <= 0) {
                        this.opacity = 0
                    }
                    this.$refs.bg.style.background =
                        'linear-gradient(to right, transparent 0%,rgb(' +
                        sv_rgb[0] +
                        ',' +
                        sv_rgb[1] +
                        ',' +
                        sv_rgb[2] +
                        ') 100%)'
                }
                if (this.opacity == 1) {
                    let value = `rgb(${this.rgb.toString()})`
                    if (this.hex) {
                        value = Dap.color.rgb2hex(this.rgb)
                    }
                    this.$emit('update:modelValue', value)
                    this.$emit('change', {
                        hex: Dap.color.rgb2hex(this.rgb),
                        rgb: this.rgb,
                        opacity: this.opacity,
                        hsv: this.hsv
                    })
                } else {
                    let value = `rgba(${this.rgb.toString()},${this.opacity})`
                    if (this.hex) {
                        value = Dap.color.rgb2hex(this.rgb)
                    }
                    this.$emit('update:modelValue', value)
                    this.$emit('change', {
                        hex: Dap.color.rgb2hex(this.rgb),
                        rgb: this.rgb,
                        opacity: this.opacity,
                        hsv: this.hsv
                    })
                }
                this.$nextTick(() => {
                    resolve()
                })
            })
        }
    },
    beforeUnmount() {
        if (this.panelDrag) {
            this.panelDrag._setOff()
        }
        if (this.hueDrag) {
            this.hueDrag._setOff()
        }
        if (this.alphaDrag) {
            this.alphaDrag._setOff()
        }
        if (this.panelProp) {
            this.panelProp._setOff()
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-colorPicker {
    display: block;
    width: 100%;
    height: auto;
    background-color: #fff;
    padding: @mp-sm;
}

.mvi-colorPicker-panel {
    display: block;
    width: 100%;
    position: relative;
    background-color: rgb(255, 0, 0);

    // 饱和度 一条从左往右，由纯白到透明的径向渐变
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, white, transparent);
    }

    // 明度 一条从下往上，由纯黑到透明的径向渐变
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, black, transparent);
    }

    .mvi-colorPicker-panel-slide {
        display: block;
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        background-color: transparent;
        border: 1px solid @border-color;
        top: -0.3rem;
        left: calc(~'100% - 0.3rem');
        border-radius: 100%;
        z-index: 20;
        background-color: #fff;
        opacity: 0.5;
        cursor: pointer;
    }
}

.mvi-colorPicker-hue {
    display: block;
    position: relative;
    width: 100%;
    height: 0.4rem;
    border-radius: 0;
    margin-top: @mp-sm;
    background: linear-gradient(
        to right,
        #f00 0%,
        #ff0 16.66%,
        #0f0 33.33%,
        #0ff 50%,
        #00f 66.66%,
        #f0f 83.33%,
        #f00 100%
    );

    .mvi-colorPicker-hue-slide {
        position: absolute;
        width: 0.4rem;
        height: 100%;
        background-color: #fff;
        border: 1px solid @border-color;
        left: -0.2rem;
        top: 0;
        opacity: 0.5;
        cursor: pointer;
    }
}

.mvi-colorPicker-alpha {
    display: block;
    position: relative;
    width: 100%;
    height: 0.3rem;
    margin-top: @mp-sm;
    background-color: #fff;
    background-image: linear-gradient(
            45deg,
            #c5c5c5 25%,
            transparent 0,
            transparent 75%,
            #c5c5c5 0,
            #c5c5c5
        ),
        linear-gradient(
            45deg,
            #c5c5c5 25%,
            transparent 0,
            transparent 75%,
            #c5c5c5 0,
            #c5c5c5
        );
    background-size: 0.2rem 0.2rem;
    background-position: 0 0, 0.1rem 0.1rem;

    & > .mvi-colorPicker-alpha-background {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 10;
        background: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.3) 100%
        );
    }

    .mvi-colorPicker-alpha-slide {
        position: absolute;
        width: 0.32rem;
        height: 100%;
        background-color: #fff;
        border: 1px solid @border-color;
        z-index: 20;
        left: calc(~'100% - 0.16rem');
        top: 0;
        opacity: 0.5;
        cursor: pointer;
    }
}
</style>
