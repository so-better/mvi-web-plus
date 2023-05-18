<template>
	<Tag>
		<slot></slot>
	</Tag>
</template>
<script>
import { h } from 'vue'
export default {
	props: {
		tag: {
			type: String,
			default: 'div'
		}
	},
	components: {
		Tag: {
			render() {
				return h(
					this.$parent.tag,
					{},
					{
						default: this.$slots.default
					}
				)
			}
		}
	}
}
</script>
