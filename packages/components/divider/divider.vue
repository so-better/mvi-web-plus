<template>
    <div :class="['mvi-divider',dashed?'mvi-divider-dashed':'']">
        <div class="mvi-divider-left" :style="{borderColor:color || ''}"></div>
        <slot></slot>
        <div class="mvi-divider-right" :style="{borderColor:color || ''}"></div>
    </div>
</template>

<script>
export default {
    name: 'm-divider',
    props: {
        //是否使用虚线
        dashed: {
            type: Boolean,
            default: false
        },
        //线颜色
        color: {
            type: String,
            default: null
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-divider {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    font-size: @font-size-small;
    color: @font-color-mute;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}

.mvi-divider-left {
    flex: 1;
    display: block;
    height: 0px;
    border-top: 1px solid @border-color;
    margin-right: @mp-sm;
}

.mvi-divider-right {
    flex: 1;
    display: block;
    height: 0px;
    border-top: 1px solid @border-color;
    margin-left: @mp-sm;
}

.mvi-divider.mvi-divider-dashed > .mvi-divider-left,
.mvi-divider.mvi-divider-dashed > .mvi-divider-right {
    border-top-style: dashed;
}
</style>
