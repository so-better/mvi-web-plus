import FormEl from './form-el.vue'

FormEl.install = app => {
	app.component(FormEl.name, FormEl)
}

export { FormEl, FormEl as default }
