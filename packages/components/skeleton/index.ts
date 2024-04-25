import { App, FunctionPlugin } from 'vue'
import Skeleton from './skeleton.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Skeleton.name!, Skeleton)
}

export { Skeleton, install as default }
