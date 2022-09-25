import skeleton from './skeleton.vue'

skeleton.install = app => {
    app.component(skeleton.name, skeleton)
}

export default skeleton
