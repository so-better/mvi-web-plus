import page from './page.vue'

page.install = app => {
    app.component(page.name, page)
}

export default page
