import { withInstall } from '@/utils'
import formEl from './form-el.vue'

const FormEl = withInstall(formEl)

export type * from '@/components/form-el/props'
export { FormEl, FormEl as default }
