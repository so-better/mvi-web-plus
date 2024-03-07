import { App } from 'vue'
import Skeleton from './skeleton.vue'

Skeleton.install = (app: App) => {
	app.component(Skeleton.name, Skeleton)
}

export { Skeleton, Skeleton as default }
