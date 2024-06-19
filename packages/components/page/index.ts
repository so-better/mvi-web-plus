import { withInstall } from '@/utils'
import page from './page.vue'
export type * from './props'

const Page = withInstall(page)
export { Page, Page as default }
