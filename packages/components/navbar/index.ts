import { withInstall } from '@/utils'
import navbar from './navbar.vue'
export type * from './props'

const Navbar = withInstall(navbar)
export { Navbar, Navbar as default }
