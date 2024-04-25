import { App, FunctionPlugin } from 'vue'
import TransitionSlide from './transition-slide.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(TransitionSlide.name!, TransitionSlide)
}

export { TransitionSlide, install as default }
