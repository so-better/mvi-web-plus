import form from './form.vue'

form.install = app => {
    app.component(form.name, form)
}

export { form as Form, form as default }
