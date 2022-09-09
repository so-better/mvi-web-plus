<template>
    <div class="mvi-skeleton-container">
        <div v-if="loading" :class="['mvi-skeleton',animation?'mvi-skeleton-animation':'']">
            <div v-if="avatar" class="mvi-skeleton-avatar">
                <div :class="['mvi-skeleton-avatar-el',avatarRound?'mvi-skeleton-round':'']" :style="avatarStyle"></div>
            </div>
            <div class="mvi-skeleton-rows">
                <div v-if="title" :class="['mvi-skeleton-title',round?'mvi-skeleton-round':'']" :style="titleStyle"></div>
                <div v-for="item in rowsArray" :style="rowStyle(item)" :class="['mvi-skeleton-row',round?'mvi-skeleton-round':'']"></div>
            </div>
        </div>
        <slot v-else></slot>
    </div>

</template>

<script>
export default {
    name: 'm-skeleton',
    props: {
        //是否加载状态
        loading: {
            type: Boolean,
            default: true
        },
        //行数
        rows: {
            type: Number,
            default: 1,
            validator(value) {
                return value > 0
            }
        },
        //每行宽度
        rowWidth: {
            type: [String, Array],
            default: null
        },
        //是否显示头像占位
        avatar: {
            type: Boolean,
            default: false
        },
        //是否显示标题占位
        title: {
            type: Boolean,
            default: false
        },
        //标题占位宽度
        titleWidth: {
            type: String,
            default: null
        },
        //是否显示动画效果
        animation: {
            type: Boolean,
            default: false
        },
        //标题段落是否展示圆角
        round: {
            type: Boolean,
            default: false
        },
        //头像占位大小
        avatarSize: {
            type: String,
            default: null
        },
        //头像占位是否展示圆角
        avatarRound: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        //头像样式
        avatarStyle() {
            let style = {}
            if (this.avatarSize) {
                style.width = this.avatarSize
                style.height = this.avatarSize
            }
            return style
        },
        //每行样式
        rowStyle() {
            return index => {
                let style = {}
                if (this.rowWidth && typeof this.rowWidth == 'string') {
                    style.width = this.rowWidth
                } else if (Array.isArray(this.rowWidth)) {
                    style.width = this.rowWidth[index] || ''
                }
                return style
            }
        },
        //标题样式
        titleStyle() {
            let style = {}
            if (this.titleWidth) {
                style.width = this.titleWidth
            }
            return style
        },
        //行数
        rowsArray() {
            let arr = []
            for (let i = 0; i < this.rows; i++) {
                arr.push(i)
            }
            return arr
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-skeleton-container {
    display: block;
    width: 100%;
    padding: 0 @mp-md;
}
.mvi-skeleton {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    &.mvi-skeleton-animation {
        animation: mvi-skeleton ease-in-out 1.2s infinite;
    }

    .mvi-skeleton-avatar {
        display: block;
        margin-right: @mp-md;
        .mvi-skeleton-avatar-el {
            display: block;
            width: 1rem;
            height: 1rem;
            background: @bg-color-dark;

            &.mvi-skeleton-round {
                border-radius: 50%;
            }
        }
    }

    .mvi-skeleton-rows {
        display: block;
        flex: 1;

        .mvi-skeleton-title {
            display: block;
            width: 40%;
            height: @medium-height / 2;
            background-color: @bg-color-dark;
            margin-bottom: @mp-md;

            &.mvi-skeleton-round {
                border-radius: 999rem;
            }
        }

        .mvi-skeleton-row {
            display: block;
            width: 100%;
            height: @small-height / 2;
            background-color: @bg-color-dark;
            margin-bottom: @mp-sm;

            &:last-of-type {
                margin-bottom: 0;
            }

            &.mvi-skeleton-round {
                border-radius: 999rem;
            }
        }
    }
}

@keyframes mvi-skeleton {
    50% {
        opacity: 0.6;
    }
}
</style>