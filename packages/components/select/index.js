import select from './select.vue'
select.install = app => {
    app.component(select.name, select)
}

export default select
