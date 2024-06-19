import { withInstall } from '@/utils'
import form from './form.vue'

const Form = withInstall(form)

export type * from '@/components/form/props'
export { Form, Form as default }
