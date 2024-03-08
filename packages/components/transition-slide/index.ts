import { App } from 'vue'
import TransitionSlide from './transition-slide.vue'

TransitionSlide.install = (app: App) => {
	app.component(TransitionSlide.name!, TransitionSlide)
}

export { TransitionSlide, TransitionSlide as default }
