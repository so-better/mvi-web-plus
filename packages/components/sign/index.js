import Sign from './sign.vue'
Sign.install = app => {
    app.component(Sign.name, Sign)
}

export { Sign, Sign as default }
