import page from './page'

page.install = app => {
    app.component(page.name, page)
}

export default page
