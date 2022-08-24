import transitionSlide from './transitionSlide'

transitionSlide.install = app => {
    app.component(transitionSlide.name, transitionSlide)
}

export default transitionSlide
