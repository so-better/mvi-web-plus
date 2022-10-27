import sign from './sign.vue'
sign.install = app => {
    app.component(sign.name, sign)
}

export default sign
