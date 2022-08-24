<template>
    <m-overlay ref="overlay" :model-value="modelValue" color="#000" :fade="false" @showing="overlayShowing" :z-index="zIndex" :use-padding="usePadding" :mountEl="mountEl">
        <m-swiper v-if="firstShow" class="mvi-image-preview-swiper" :initial-slide="active" show-indicators ref="swiper" @change="swiperChange" :show-control="showControl" :fade="fade" :control-class="controlClass" :touchable="enableTouch">
            <m-swiper-slide v-for="(item,index) in images" :key="'image-'+index" class="mvi-preview-container">
                <m-rich-image :ref="el=>imageRefs[index]=el" @close-preview="closeOverlay" @disable-swiper-touch="enableTouch=false" @enable-swiper-touch="enableTouch=true" :src="item" :error-icon="errorIcon" :load-icon="loadIcon"></m-rich-image>
            </m-swiper-slide>
            <template #indicators="data">
                <div class="mvi-image-preview-page" v-if="showPage">
                    <slot name="page" :total="data.total" :current="data.active" v-if="$slots.page"></slot>
                    <div v-else>
                        <span v-text="data.active+1"></span>
                        <span>/</span>
                        <span v-text="data.total"></span>
                    </div>
                </div>
                <div v-if="$slots.descriptions || descriptions.length>0" class="mvi-image-preview-footer">
                    <slot name="descriptions" :total="data.total" :current="data.active" v-if="$slots.descriptions">
                    </slot>
                    <div v-else-if="descriptions.length>0" class="mvi-image-preview-description" v-text="descriptions[data.active]"></div>
                </div>
            </template>
        </m-swiper>

    </m-overlay>
</template>

<script>
import mOverlay from '../overlay/overlay'
import mSwiper from '../swiper/swiper.vue'
import mSwiperSlide from '../swiper/swiper-slide'
import mRichImage from './richImage'
export default {
    name: 'm-image-preview',
    data() {
        return {
            firstShow: false,
            enableTouch: true,
            imageRefs: []
        }
    },
    emits: ['update:modelValue', 'change'],
    props: {
        //是否显示
        modelValue: {
            type: Boolean,
            default: false
        },
        //图片数组
        images: {
            type: Array,
            default: function () {
                return []
            }
        },
        //图片描述
        descriptions: {
            type: Array,
            default: function () {
                return []
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
            default: 5000
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
        //控制器额外样式
        controlClass: {
            type: String,
            default: null
        },
        //局部显示是否考虑滚动条影响
        usePadding: {
            type: Boolean,
            default: false
        },
        //图片加载失败提示设置
        errorIcon: {
            type: [String, Object],
            default: function () {
                return {
                    size: '1rem'
                }
            }
        },
        //图片加载中提示设置
        loadIcon: {
            type: [String, Object],
            default: function () {
                return {
                    size: '1rem'
                }
            }
        }
    },
    computed: {
        $$el() {
            return this.$refs.overlay.$$el
        }
    },
    components: {
        mOverlay,
        mSwiper,
        mSwiperSlide,
        mRichImage
    },
    methods: {
        //遮罩层显示时
        overlayShowing() {
            if (!this.firstShow) {
                this.firstShow = true
            }
        },
        //关闭遮罩
        closeOverlay(e) {
            for (let richImage of this.imageRefs) {
                richImage.reset()
            }
            this.$emit('update:modelValue', false)
        },
        //图片变更
        swiperChange(active) {
            for (let richImage of this.imageRefs) {
                richImage.reset()
            }
            this.$emit('change', active)
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-image-preview-swiper {
    background-color: #000;

    .mvi-preview-container {
        overflow: hidden;
    }

    .mvi-image-preview {
        width: 100%;
        height: 100%;
    }
}

.mvi-image-preview-page {
    position: absolute;
    display: block;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    padding: @mp-sm 0;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 20;

    span + span {
        margin-left: @mp-xs;
    }
}

.mvi-image-preview-footer {
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    z-index: 20;
}

.mvi-image-preview-description {
    padding: @mp-md @mp-sm;
}
</style>
