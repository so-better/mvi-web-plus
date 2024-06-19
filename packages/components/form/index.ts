import { withInstall } from '@/utils'
import form from './form.vue'
export type * from './props'

const Form = withInstall(form)
export { Form, Form as default }
