import TransitionSlide from './transition-slide.vue'

TransitionSlide.install = app => {
    app.component(TransitionSlide.name, TransitionSlide)
}

export { TransitionSlide, TransitionSlide as default }
