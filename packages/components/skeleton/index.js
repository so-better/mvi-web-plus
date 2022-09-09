import skeleton from './skeleton'

skeleton.install = app => {
    app.component(skeleton.name, skeleton)
}

export default skeleton
