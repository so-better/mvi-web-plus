import { withInstall } from '@/utils'
import modal from './modal.vue'

const Modal = withInstall(modal)

export type * from '@/components/modal/props'
export { Modal, Modal as default }
