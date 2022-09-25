import transitionSlide from './transitionSlide.vue'

transitionSlide.install = app => {
    app.component(transitionSlide.name, transitionSlide)
}

export default transitionSlide
