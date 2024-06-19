import { withInstall } from '@/utils'
import page from './page.vue'

const Page = withInstall(page)

export type * from '@/components/page/props'
export { Page, Page as default }
