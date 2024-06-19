import { withInstall } from '@/utils'
import autocomplete from './autocomplete.vue'
export type * from './props'

const Autocomplete = withInstall(autocomplete)
export { Autocomplete, Autocomplete as default }
