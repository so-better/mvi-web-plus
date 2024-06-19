import { withInstall } from '@/utils'
import navbar from './navbar.vue'

const Navbar = withInstall(navbar)

export type * from '@/components/navbar/props'
export { Navbar, Navbar as default }
