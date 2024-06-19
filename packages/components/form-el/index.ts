import { withInstall } from '@/utils'
import formEl from './form-el.vue'
export type * from './props'

const FormEl = withInstall(formEl)
export { FormEl, FormEl as default }
