import { withInstall } from '@/utils'
import modal from './modal.vue'
export type * from './props'

const Modal = withInstall(modal)
export { Modal, Modal as default }
