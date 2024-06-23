<template>
	<teleport to="body">
		<transition :name="animation || 'mvi-layer'" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @leave="leave" @before-leave="beforeLeave" @after-leave="afterLeave">
			<div v-if="firstShow" v-show="layerShow" ref="layerRef" class="mvi-layer" :style="layerStyle" v-bind="$attrs">
				<div class="mvi-layer-wrapper" :class="{ shadow: shadow, border: border }" :style="wrapperStyle">
					<Triangle v-if="showTriangle" ref="triangleRef" class="mvi-layer-triangle" :placement="trianglePlacement" :background="innerBackground" :border-color="border ? innerBorderColor : innerBackground" size="0.14rem"></Triangle>
					<slot></slot>
				</div>
			</div>
		</transition>
	</teleport>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue'
import { Triangle } from '@/components/triangle'
import { LayerProps } from './props'
import { isDark } from '@/utils'
import { Observe } from '@/directives/observe'

defineOptions({
	inheritAttrs: false,
	name: 'm-layer'
})
//定义事件
const emits = defineEmits(['update:modelValue', 'show', 'showing', 'shown', 'hide', 'hidding', 'hidden'])
//定义属性
const props = defineProps(LayerProps)
//获取实例
const instance = getCurrentInstance()!

//浮层是否显示
const layerShow = ref<boolean>(false)
//浮层是否第一次显示
const firstShow = ref<boolean>(false)
//浮层真实位置
const realPlacement = ref<string>('bottom')
//浮层元素
const layerRef = ref<HTMLElement | null>(null)
//三角元素
const triangleRef = ref<InstanceType<typeof Triangle> | null>(null)
//observe对象
const observe = ref<Observe | null>(null)
//内部边框色
const innerBorderColor = ref<string>(props.borderColor || (isDark() ? '#2c2c2c' : '#eee'))
//内部背景色
const innerBackground = ref<string>(props.background || (isDark() ? '#1a1a1a' : '#fff'))

//浮层元素导出对象
const $$el = computed<HTMLElement | null>(() => {
	return layerRef.value
})
//三角形位置
const trianglePlacement = computed<'bottom' | 'top' | 'left' | 'right' | undefined>(() => {
	if (realPlacement.value == 'bottom-start' || realPlacement.value == 'bottom' || realPlacement.value == 'bottom-end') {
		return 'top'
	}
	if (realPlacement.value == 'top-start' || realPlacement.value == 'top' || realPlacement.value == 'top-end') {
		return 'bottom'
	}
	if (realPlacement.value == 'left-start' || realPlacement.value == 'left' || realPlacement.value == 'left-end') {
		return 'right'
	}
	if (realPlacement.value == 'right-start' || realPlacement.value == 'right' || realPlacement.value == 'right-end') {
		return 'left'
	}
})
//主体元素额外样式
const wrapperStyle = computed<any>(() => {
	let style: any = {}
	if (props.border && innerBorderColor.value) {
		style.borderColor = innerBorderColor.value
	}
	if (innerBackground.value) {
		style.background = innerBackground.value
	}
	if (props.width) {
		style.width = props.width
	}
	return style
})
//浮层样式
const layerStyle = computed<any>(() => {
	let style: any = {}
	if (Dap.number.isNumber(props.zIndex)) {
		style.zIndex = props.zIndex
	}
	if (props.timeout) {
		style.transition = 'transform ' + props.timeout + 'ms,opacity ' + props.timeout + 'ms'
		style.webkitTransition = 'transform ' + props.timeout + 'ms,opacity ' + props.timeout + 'ms'
	}
	if (!props.showTriangle) {
		style.padding = 0
		if (realPlacement.value == 'bottom-start' || realPlacement.value == 'bottom' || realPlacement.value == 'bottom-end') {
			style.paddingTop = props.offset
		} else if (realPlacement.value == 'top-start' || realPlacement.value == 'top' || realPlacement.value == 'top-end') {
			style.paddingBottom = props.offset
		} else if (realPlacement.value == 'left-start' || realPlacement.value == 'left' || realPlacement.value == 'left-end') {
			style.paddingRight = props.offset
		} else if (realPlacement.value == 'right-start' || realPlacement.value == 'right' || realPlacement.value == 'right-end') {
			style.paddingLeft = props.offset
		}
	}
	return style
})

//获取绑定的元素
const getRelateEl = (): HTMLElement | null => {
	if (props.relate) {
		return document.body.querySelector(props.relate)
	}
	return null
}
//悬浮层显示位置智能化
const autoAdjust = () => {
	//获取绑定元素位置
	let $relate = getRelateEl()!
	let point = Dap.element.getElementBounding($relate)
	realPlacement.value = props.placement
	if (props.placement == 'bottom') {
		//底部距离不够
		if (point.bottom < layerRef.value!.offsetHeight) {
			//顶部距离够
			if (point.top > layerRef.value!.offsetHeight) {
				realPlacement.value = 'top'
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-start'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-end'
				}
			}
			//左侧距离够
			else if (point.left > layerRef.value!.offsetWidth) {
				realPlacement.value = 'left'
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-start'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-end'
				}
			}
			//右侧距离够
			else if (point.right > layerRef.value!.offsetWidth) {
				realPlacement.value = 'right'
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-start'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-end'
				}
			}
		}
		//底部距离够
		else {
			if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
				realPlacement.value = 'bottom-start'
			}
			if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
				realPlacement.value = 'bottom-end'
			}
		}
	} else if (props.placement == 'bottom-start') {
		//底部距离不够
		if (point.bottom < layerRef.value!.offsetHeight) {
			//顶部距离够
			if (point.top > layerRef.value!.offsetHeight) {
				realPlacement.value = 'top-start'
				if (point.right + $relate.offsetWidth < layerRef.value!.offsetWidth) {
					realPlacement.value = 'top'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-end'
				}
			}
			//左侧距离够
			else if (point.left > layerRef.value!.offsetWidth) {
				realPlacement.value = 'left'
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-start'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-end'
				}
			}
			//右侧距离够
			else if (point.right > layerRef.value!.offsetWidth) {
				realPlacement.value = 'right'
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-start'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-end'
				}
			}
		}
		//底部距离够
		else {
			if (point.right + $relate.offsetWidth < layerRef.value!.offsetWidth) {
				realPlacement.value = 'bottom'
			}
			if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
				realPlacement.value = 'bottom-end'
			}
		}
	} else if (props.placement == 'bottom-end') {
		//底部距离不够
		if (point.bottom < layerRef.value!.offsetHeight) {
			//顶部距离够
			if (point.top > layerRef.value!.offsetHeight) {
				realPlacement.value = 'top-end'
				if (point.left + $relate.offsetWidth < layerRef.value!.offsetWidth) {
					realPlacement.value = 'top'
				}
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-start'
				}
			}
			//左侧距离够
			else if (point.left > layerRef.value!.offsetWidth) {
				realPlacement.value = 'left'
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-start'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-end'
				}
			}
			//右侧距离够
			else if (point.right > layerRef.value!.offsetWidth) {
				realPlacement.value = 'right'
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-start'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-end'
				}
			}
		}
		//底部距离够
		else {
			if (point.left + $relate.offsetWidth < layerRef.value!.offsetWidth) {
				realPlacement.value = 'bottom'
			}
			if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
				realPlacement.value = 'bottom-start'
			}
		}
	} else if (props.placement == 'top') {
		//顶部距离不够
		if (point.top < layerRef.value!.offsetHeight) {
			//底部距离够
			if (point.bottom > layerRef.value!.offsetHeight) {
				realPlacement.value = 'bottom'
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-start'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-end'
				}
			}
			//左侧距离够
			else if (point.left > layerRef.value!.offsetWidth) {
				realPlacement.value = 'left'
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-start'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-end'
				}
			}
			//右侧距离够
			else if (point.right > layerRef.value!.offsetWidth) {
				realPlacement.value = 'right'
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-start'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-end'
				}
			}
		}
		//顶部距离够
		else {
			if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
				realPlacement.value = 'top-start'
			}
			if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
				realPlacement.value = 'top-end'
			}
		}
	} else if (props.placement == 'top-start') {
		//顶部距离不够
		if (point.top < layerRef.value!.offsetHeight) {
			//底部距离够
			if (point.bottom > layerRef.value!.offsetHeight) {
				realPlacement.value = 'bottom-start'
				if (point.right + $relate.offsetWidth < layerRef.value!.offsetWidth) {
					realPlacement.value = 'bottom'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-end'
				}
			}
			//左侧距离够
			else if (point.left > layerRef.value!.offsetWidth) {
				realPlacement.value = 'left'
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-start'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-end'
				}
			}
			//右侧距离够
			else if (point.right > layerRef.value!.offsetWidth) {
				realPlacement.value = 'right'
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-start'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-end'
				}
			}
		}
		//顶部距离够
		else {
			if (point.right + $relate.offsetWidth < layerRef.value!.offsetWidth) {
				realPlacement.value = 'top'
			}
			if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
				realPlacement.value = 'top-end'
			}
		}
	} else if (props.placement == 'top-end') {
		//顶部距离不够
		if (point.top < layerRef.value!.offsetHeight) {
			//底部距离够
			if (point.bottom > layerRef.value!.offsetHeight) {
				realPlacement.value = 'bottom-end'
				if (point.left + $relate.offsetWidth < layerRef.value!.offsetWidth) {
					realPlacement.value = 'bottom'
				}
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-start'
				}
			}
			//左侧距离够
			else if (point.left > layerRef.value!.offsetWidth) {
				realPlacement.value = 'left'
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-start'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-end'
				}
			}
			//右侧距离够
			else if (point.right > layerRef.value!.offsetWidth) {
				realPlacement.value = 'right'
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-start'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-end'
				}
			}
		}
		//顶部距离够
		else {
			if (point.left + $relate.offsetWidth < layerRef.value!.offsetWidth) {
				realPlacement.value = 'top'
			}
			if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
				realPlacement.value = 'top-start'
			}
		}
	} else if (props.placement == 'left') {
		//左侧距离不够
		if (point.left < layerRef.value!.offsetWidth) {
			//右侧距离够
			if (point.right > layerRef.value!.offsetWidth) {
				realPlacement.value = 'right'
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-start'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-end'
				}
			}
			//顶部距离够
			else if (point.top > layerRef.value!.offsetHeight) {
				realPlacement.value = 'top'
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-start'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-end'
				}
			}
			//底部距离够
			else if (point.bottom > layerRef.value!.offsetHeight) {
				realPlacement.value = 'bottom'
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-start'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-end'
				}
			}
		}
		//左侧距离够
		else {
			if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
				realPlacement.value = 'left-start'
			}
			if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
				realPlacement.value = 'left-end'
			}
		}
	} else if (props.placement == 'left-start') {
		//左侧距离不够
		if (point.left < layerRef.value!.offsetWidth) {
			//右侧距离够
			if (point.right > layerRef.value!.offsetWidth) {
				realPlacement.value = 'right-start'
				if (point.bottom + $relate.offsetHeight < layerRef.value!.offsetHeight) {
					realPlacement.value = 'right'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-end'
				}
			}
			//顶部距离够
			else if (point.top > layerRef.value!.offsetHeight) {
				realPlacement.value = 'top'
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-start'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-end'
				}
			}
			//底部距离够
			else if (point.bottom > layerRef.value!.offsetHeight) {
				realPlacement.value = 'bottom'
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-start'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-end'
				}
			}
		}
		//左侧距离够
		else {
			if (point.bottom + $relate.offsetHeight < layerRef.value!.offsetHeight) {
				realPlacement.value = 'left'
			}
			if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
				realPlacement.value = 'left-end'
			}
		}
	} else if (props.placement == 'left-end') {
		//左侧距离不够
		if (point.left < layerRef.value!.offsetWidth) {
			//右侧距离够
			if (point.right > layerRef.value!.offsetWidth) {
				realPlacement.value = 'right-end'
				if (point.top + $relate.offsetHeight < layerRef.value!.offsetHeight) {
					realPlacement.value = 'right'
				}
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'right-start'
				}
			}
			//顶部距离够
			else if (point.top > layerRef.value!.offsetHeight) {
				realPlacement.value = 'top'
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-start'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-end'
				}
			}
			//底部距离够
			else if (point.bottom > layerRef.value!.offsetHeight) {
				realPlacement.value = 'bottom'
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-start'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-end'
				}
			}
		}
		//左侧距离够
		else {
			if (point.top + $relate.offsetHeight < layerRef.value!.offsetHeight) {
				realPlacement.value = 'left'
			}
			if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
				realPlacement.value = 'left-start'
			}
		}
	} else if (props.placement == 'right') {
		//右侧距离不够
		if (point.right < layerRef.value!.offsetWidth) {
			//左侧距离够
			if (point.left > layerRef.value!.offsetWidth) {
				realPlacement.value = 'left'
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-start'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-end'
				}
			}
			//顶部距离够
			else if (point.top > layerRef.value!.offsetHeight) {
				realPlacement.value = 'top'
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-start'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-end'
				}
			}
			//底部距离够
			else if (point.bottom > layerRef.value!.offsetHeight) {
				realPlacement.value = 'bottom'
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-start'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-end'
				}
			}
		}
		//右侧距离够
		else {
			if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
				realPlacement.value = 'right-start'
			}
			if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
				realPlacement.value = 'right-end'
			}
		}
	} else if (props.placement == 'right-start') {
		//右侧距离不够
		if (point.right < layerRef.value!.offsetWidth) {
			//左侧距离足够
			if (point.left > layerRef.value!.offsetWidth) {
				realPlacement.value = 'left-start'
				if (point.bottom + $relate.offsetHeight < layerRef.value!.offsetHeight) {
					realPlacement.value = 'left'
				}
				if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-end'
				}
			}
			//顶部距离够
			else if (point.top > layerRef.value!.offsetHeight) {
				realPlacement.value = 'top'
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-start'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-end'
				}
			}
			//底部距离够
			else if (point.bottom > layerRef.value!.offsetHeight) {
				realPlacement.value = 'bottom'
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-start'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-end'
				}
			}
		}
		//右侧距离够
		else {
			if (point.bottom + $relate.offsetHeight < layerRef.value!.offsetHeight) {
				realPlacement.value = 'right'
			}
			if (point.bottom + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
				realPlacement.value = 'right-end'
			}
		}
	} else if (props.placement == 'right-end') {
		//右侧距离不够
		if (point.right < layerRef.value!.offsetWidth) {
			//左侧距离足够
			if (point.left > layerRef.value!.offsetWidth) {
				realPlacement.value = 'left-end'
				if (point.top + $relate.offsetHeight < layerRef.value!.offsetHeight) {
					realPlacement.value = 'left'
				}
				if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
					realPlacement.value = 'left-start'
				}
			}
			//顶部距离够
			else if (point.top > layerRef.value!.offsetHeight) {
				realPlacement.value = 'top'
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-start'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'top-end'
				}
			}
			//底部距离够
			else if (point.bottom > layerRef.value!.offsetHeight) {
				realPlacement.value = 'bottom'
				if (point.left + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-start'
				}
				if (point.right + $relate.offsetWidth / 2 < layerRef.value!.offsetWidth / 2) {
					realPlacement.value = 'bottom-end'
				}
			}
		}
		//右侧距离够
		else {
			if (point.top + $relate.offsetHeight < layerRef.value!.offsetHeight) {
				realPlacement.value = 'right'
			}
			if (point.top + $relate.offsetHeight / 2 < layerRef.value!.offsetHeight / 2) {
				realPlacement.value = 'right-start'
			}
		}
	}
}
//重置位置
const reset = () => {
	if (!Dap.element.isElement(layerRef.value)) {
		return
	}
	//存在三角形的情况下设置offset
	if (props.showTriangle) {
		layerRef.value!.style.padding = '0'
		if (realPlacement.value == 'bottom-start' || realPlacement.value == 'bottom' || realPlacement.value == 'bottom-end') {
			layerRef.value!.style.paddingTop = `calc(${props.offset} + ${triangleRef.value!.$el.offsetHeight}px)`
		} else if (realPlacement.value == 'top-start' || realPlacement.value == 'top' || realPlacement.value == 'top-end') {
			layerRef.value!.style.paddingBottom = `calc(${props.offset} + ${triangleRef.value!.$el.offsetHeight}px)`
		} else if (realPlacement.value == 'left-start' || realPlacement.value == 'left' || realPlacement.value == 'left-end') {
			layerRef.value!.style.paddingRight = `calc(${props.offset} + ${triangleRef.value!.$el.offsetWidth}px)`
		} else if (realPlacement.value == 'right-start' || realPlacement.value == 'right' || realPlacement.value == 'right-end') {
			layerRef.value!.style.paddingLeft = `calc(${props.offset} + ${triangleRef.value!.$el.offsetWidth}px)`
		}
	}
	//关联元素
	const $relate = getRelateEl()!
	//关联元素的位置信息
	const rect = Dap.element.getElementBounding($relate)
	//在底部
	if (realPlacement.value == 'bottom' || realPlacement.value == 'bottom-start' || realPlacement.value == 'bottom-end') {
		layerRef.value!.style.top = rect.top + $relate.offsetHeight + 'px'
		layerRef.value!.style.bottom = 'auto'
		if (realPlacement.value == 'bottom') {
			layerRef.value!.style.left = rect.left + $relate.offsetWidth / 2 - layerRef.value!.offsetWidth / 2 + 'px'
			layerRef.value!.style.right = 'auto'
		} else if (realPlacement.value == 'bottom-start') {
			layerRef.value!.style.left = rect.left + 'px'
			layerRef.value!.style.right = 'auto'
		} else if (realPlacement.value == 'bottom-end') {
			layerRef.value!.style.left = 'auto'
			layerRef.value!.style.right = rect.right + 'px'
		}
	}
	//在顶部
	else if (realPlacement.value == 'top' || realPlacement.value == 'top-start' || realPlacement.value == 'top-end') {
		layerRef.value!.style.top = 'auto'
		layerRef.value!.style.bottom = rect.bottom + $relate.offsetHeight + 'px'
		if (realPlacement.value == 'top') {
			layerRef.value!.style.left = rect.left + $relate.offsetWidth / 2 - layerRef.value!.offsetWidth / 2 + 'px'
			layerRef.value!.style.right = 'auto'
		} else if (realPlacement.value == 'top-start') {
			layerRef.value!.style.left = rect.left + 'px'
			layerRef.value!.style.right = 'auto'
		} else if (realPlacement.value == 'top-end') {
			layerRef.value!.style.left = 'auto'
			layerRef.value!.style.right = rect.right + 'px'
		}
	}
	//在左侧
	else if (realPlacement.value == 'left' || realPlacement.value == 'left-start' || realPlacement.value == 'left-end') {
		layerRef.value!.style.left = 'auto'
		layerRef.value!.style.right = rect.right + $relate.offsetWidth + 'px'
		if (realPlacement.value == 'left') {
			layerRef.value!.style.top = rect.top + $relate.offsetHeight / 2 - layerRef.value!.offsetHeight / 2 + 'px'
			layerRef.value!.style.bottom = 'auto'
		} else if (realPlacement.value == 'left-start') {
			layerRef.value!.style.top = rect.top + 'px'
			layerRef.value!.style.bottom = 'auto'
		} else if (realPlacement.value == 'left-end') {
			layerRef.value!.style.top = 'auto'
			layerRef.value!.style.bottom = rect.bottom + 'px'
		}
	}
	//在右侧
	else if (realPlacement.value == 'right' || realPlacement.value == 'right-start' || realPlacement.value == 'right-end') {
		layerRef.value!.style.left = rect.left + $relate.offsetWidth + 'px'
		layerRef.value!.style.right = 'auto'
		if (realPlacement.value == 'right') {
			layerRef.value!.style.top = rect.top + $relate.offsetHeight / 2 - layerRef.value!.offsetHeight / 2 + 'px'
			layerRef.value!.style.bottom = 'auto'
		} else if (realPlacement.value == 'right-start') {
			layerRef.value!.style.top = rect.top + 'px'
			layerRef.value!.style.bottom = 'auto'
		} else if (realPlacement.value == 'right-end') {
			layerRef.value!.style.top = 'auto'
			layerRef.value!.style.bottom = rect.bottom + 'px'
		}
	}
}
//重置三角位置
const resetTriangle = () => {
	if (!props.showTriangle || (triangleRef.value && !triangleRef.value.$el)) {
		return
	}
	const relateWidth = getRelateEl()!.offsetWidth
	const elWidth = layerRef.value!.offsetWidth
	const relateHeight = getRelateEl()!.offsetHeight
	const elHeight = layerRef.value!.offsetHeight
	const triWidth = triangleRef.value!.$el.offsetWidth
	const triHeight = triangleRef.value!.$el.offsetHeight
	if (realPlacement.value == 'bottom-start') {
		triangleRef.value!.$el.style.top = 'auto'
		triangleRef.value!.$el.style.right = 'auto'
		triangleRef.value!.$el.style.bottom = '100%'
		triangleRef.value!.$el.style.left = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + 'px'
	} else if (realPlacement.value == 'bottom') {
		triangleRef.value!.$el.style.top = 'auto'
		triangleRef.value!.$el.style.right = 'auto'
		triangleRef.value!.$el.style.bottom = '100%'
		triangleRef.value!.$el.style.left = elWidth / 2 - triWidth / 2 + 'px'
	} else if (realPlacement.value == 'bottom-end') {
		triangleRef.value!.$el.style.top = 'auto'
		triangleRef.value!.$el.style.left = 'auto'
		triangleRef.value!.$el.style.bottom = '100%'
		triangleRef.value!.$el.style.right = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + 'px'
	} else if (realPlacement.value == 'top-start') {
		triangleRef.value!.$el.style.top = '100%'
		triangleRef.value!.$el.style.right = 'auto'
		triangleRef.value!.$el.style.bottom = 'auto'
		triangleRef.value!.$el.style.left = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + 'px'
	} else if (realPlacement.value == 'top') {
		triangleRef.value!.$el.style.top = '100%'
		triangleRef.value!.$el.style.right = 'auto'
		triangleRef.value!.$el.style.bottom = 'auto'
		triangleRef.value!.$el.style.left = elWidth / 2 - triWidth / 2 + 'px'
	} else if (realPlacement.value == 'top-end') {
		triangleRef.value!.$el.style.top = '100%'
		triangleRef.value!.$el.style.left = 'auto'
		triangleRef.value!.$el.style.bottom = 'auto'
		triangleRef.value!.$el.style.right = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + 'px'
	} else if (realPlacement.value == 'left-start') {
		triangleRef.value!.$el.style.left = '100%'
		triangleRef.value!.$el.style.right = 'auto'
		triangleRef.value!.$el.style.top = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + 'px'
		triangleRef.value!.$el.style.bottom = 'auto'
	} else if (realPlacement.value == 'left') {
		triangleRef.value!.$el.style.left = '100%'
		triangleRef.value!.$el.style.right = 'auto'
		triangleRef.value!.$el.style.top = elHeight / 2 - triHeight / 2 + 'px'
		triangleRef.value!.$el.style.bottom = 'auto'
	} else if (realPlacement.value == 'left-end') {
		triangleRef.value!.$el.style.left = '100%'
		triangleRef.value!.$el.style.right = 'auto'
		triangleRef.value!.$el.style.bottom = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + 'px'
		triangleRef.value!.$el.style.top = 'auto'
	} else if (realPlacement.value == 'right-start') {
		triangleRef.value!.$el.style.right = '100%'
		triangleRef.value!.$el.style.left = 'auto'
		triangleRef.value!.$el.style.top = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + 'px'
		triangleRef.value!.$el.style.bottom = 'auto'
	} else if (realPlacement.value == 'right') {
		triangleRef.value!.$el.style.right = '100%'
		triangleRef.value!.$el.style.left = 'auto'
		triangleRef.value!.$el.style.top = elHeight / 2 - triHeight / 2 + 'px'
		triangleRef.value!.$el.style.bottom = 'auto'
	} else if (realPlacement.value == 'right-end') {
		triangleRef.value!.$el.style.right = '100%'
		triangleRef.value!.$el.style.left = 'auto'
		triangleRef.value!.$el.style.bottom = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + 'px'
		triangleRef.value!.$el.style.top = 'auto'
	}
}
//api：更新浮层位置
const update = () => {
	if (layerShow.value && firstShow.value) {
		autoAdjust()
		reset()
		nextTick(() => {
			resetTriangle()
		})
	}
}
//监听滚动隐藏浮层
const handleScroll = () => {
	const handleScroll = (el: HTMLElement) => {
		Dap.event.on(el, `scroll.layer_${instance.uid}`, () => {
			emits('update:modelValue', false)
		})
		if (el.parentNode) {
			handleScroll(<HTMLElement>el.parentNode)
		}
	}
	const relate = getRelateEl()
	if (relate && relate.parentNode) {
		handleScroll(<HTMLElement>relate.parentNode)
	}
}
//移除上述滚动事件的监听
const removeScroll = () => {
	const removeScroll = (el: HTMLElement) => {
		Dap.event.off(el, `scroll.layer_${instance.uid}`)
		if (el.parentNode) {
			removeScroll(<HTMLElement>el.parentNode)
		}
	}
	const relate = getRelateEl()!
	if (relate && relate.parentNode) {
		removeScroll(<HTMLElement>relate.parentNode)
	}
}
//悬浮层显示前
const beforeEnter = (el: Element) => {
	//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
	if (Dap.data.get(<HTMLElement>el, 'mvi-layer-beforeEnter-trigger')) {
		return
	}
	Dap.data.set(<HTMLElement>el, 'mvi-layer-beforeEnter-trigger', true)

	emits('show', el)

	if (typeof instance.appContext.config.globalProperties.layerComponentWatch == 'function') {
		instance.appContext.config.globalProperties.layerComponentWatch.apply(instance.proxy, ['show', el])
	}
}
//悬浮层显示时
const enter = (el: Element) => {
	//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
	if (Dap.data.get(<HTMLElement>el, 'mvi-layer-enter-trigger')) {
		return
	}
	Dap.data.set(<HTMLElement>el, 'mvi-layer-enter-trigger', true)

	nextTick(() => {
		update()
		emits('showing', el)
		if (typeof instance.appContext.config.globalProperties.layerComponentWatch == 'function') {
			instance.appContext.config.globalProperties.layerComponentWatch.apply(instance.proxy, ['showing', el])
		}
	})
}
//悬浮层显示后
const afterEnter = (el: Element) => {
	emits('shown', el)
	if (typeof instance.appContext.config.globalProperties.layerComponentWatch == 'function') {
		instance.appContext.config.globalProperties.layerComponentWatch.apply(instance.proxy, ['shown', el])
	}
}
//悬浮层隐藏前
const beforeLeave = (el: Element) => {
	//清除标记
	Dap.data.remove(<HTMLElement>el, 'mvi-layer-beforeEnter-trigger')
	Dap.data.remove(<HTMLElement>el, 'mvi-layer-enter-trigger')

	emits('hide', el)
	if (typeof instance.appContext.config.globalProperties.layerComponentWatch == 'function') {
		instance.appContext.config.globalProperties.layerComponentWatch.apply(instance.proxy, ['hide', el])
	}
}
//悬浮层隐藏时
const leave = (el: Element) => {
	emits('hidding', el)
	if (typeof instance.appContext.config.globalProperties.layerComponentWatch == 'function') {
		instance.appContext.config.globalProperties.layerComponentWatch.apply(instance.proxy, ['hidding', el])
	}
}
//悬浮层隐藏后
const afterLeave = (el: Element) => {
	emits('hidden', el)
	if (typeof instance.appContext.config.globalProperties.layerComponentWatch == 'function') {
		instance.appContext.config.globalProperties.layerComponentWatch.apply(instance.proxy, ['hidden', el])
	}
}

//监听placement改变
watch(
	() => props.placement,
	() => {
		update()
	}
)

//监听modelValue改变
watch(
	() => props.modelValue,
	(newValue: boolean) => {
		if (newValue) {
			if (!firstShow.value) {
				firstShow.value = true
			}
		}
		layerShow.value = newValue
	}
)

//组件渲染后
onMounted(() => {
	//初始化时是否显示
	if (props.modelValue) {
		if (!firstShow.value) {
			firstShow.value = true
		}
		layerShow.value = props.modelValue
	}
	//监听滚动
	handleScroll()
	//监听窗口变化
	Dap.event.on(window, `resize.layer_${instance.uid}`, update)
	//监听窗口点击
	Dap.event.on(window, `click.layer_${instance.uid}`, (event: Event) => {
		if (layerShow.value && firstShow.value && props.closable) {
			if (Dap.element.isContains(layerRef.value!, <HTMLElement>event.target) || Dap.element.isContains(getRelateEl()!, <HTMLElement>event.target)) {
				return
			}
			emits('update:modelValue', false)
		}
	})
	//监听深色模式改动
	observe.value = new Observe(document.documentElement, {
		attributes: true,
		childList: false,
		subtree: false,
		attributeNames: ['data-mvi-dark'],
		attributesChange: () => {
			innerBorderColor.value = props.borderColor || (isDark() ? '#222' : '#eee')
			innerBackground.value = props.background || (isDark() ? '#1a1a1a' : '#fff')
		}
	})
	observe.value.init()
})

//组件卸载后
onBeforeUnmount(() => {
	//卸载滚动监听事件
	removeScroll()
	Dap.event.off(window, `resize.layer_${instance.uid} click.layer_${instance.uid}`)
	//卸载深色模式监听
	observe.value?.destroy()
})

//对外提供的属性和方法
defineExpose({
	$$el,
	update
})
</script>
<style scoped src="./layer.less"></style>
