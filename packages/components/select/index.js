import select from './select'
select.install = app => {
    app.component(select.name, select)
}

export default select
