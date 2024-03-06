import { App } from 'vue'
import Dap from 'dap-util'
//解决ios系统下css伪类无效的问题
Dap.event.on(window, 'touchstart.ios', () => {})

/***** 全局默认样式 *****/
import './css/mvi-default.less'
/***** 辅助样式 *****/
import './css/mvi-support.less'
/***** 指令 *****/
import { Anchor } from './directives/anchor'
import { Drag } from './directives/drag'
import { Observe } from './directives/observe'
import { Prop } from './directives/prop'
import { Px } from './directives/px'
import { Resize } from './directives/resize'
import { Ripple } from './directives/ripple'
import { Scroll } from './directives/scroll'
import { Spy } from './directives/spy'
import { Upload } from './directives/upload'
/***** 组件 *****/
import { Icon } from './components/icon'
import { Badge } from './components/badge'
import { Button } from './components/button'
import { Triangle } from './components/triangle'
import { Layer } from './components/layer'
import { Label } from './components/label'
import { Input } from './components/input'
import { Loading } from './components/loading'
import { LoadingBar } from './components/loading-bar'
import { Msgbox } from './components/msgbox'
import { Divider } from './components/divider'
import { Cell } from './components/cell'
import { CellGroup } from './components/cell-group'
import { Checkbox } from './components/checkbox'
import { Radio } from './components/radio'
import { Sign } from './components/sign'
import { Roll } from './components/roll'
import { Row } from './components/row'
import { Col } from './components/col'
import { Autocomplete } from './components/autocomplete'
import { Overlay } from './components/overlay'
import { Popup } from './components/popup'
import { Dropdown } from './components/dropdown'
import { Tooltip } from './components/tooltip'
import { TransitionSlide } from './components/transition-slide'
import { Switch } from './components/switch'
import { Navbar } from './components/navbar'
import { Notify } from './components/notify'
import { Actionsheet } from './components/actionsheet'
import { Calendar } from './components/calendar'
import { CircleProgress } from './components/circle-progress'
import { Collapse } from './components/collapse'
import { CollapseItem } from './components/collapse-item'
import { DateChooser } from './components/date-chooser'
import { DateNativePicker } from './components/date-native-picker'
import { Picker } from './components/picker'
import { Progress } from './components/progress'
import { Slider } from './components/slider'

/***** 按需导出 *****/
export * from './directives/anchor'
export * from './directives/drag'
export * from './directives/observe'
export * from './directives/prop'
export * from './directives/px'
export * from './directives/resize'
export * from './directives/ripple'
export * from './directives/scroll'
export * from './directives/spy'
export * from './directives/upload'
export * from './components/icon'
export * from './components/badge'
export * from './components/button'
export * from './components/triangle'
export * from './components/layer'
export * from './components/label'
export * from './components/input'
export * from './components/loading'
export * from './components/loading-bar'
export * from './components/msgbox'
export * from './components/divider'
export * from './components/cell'
export * from './components/cell-group'
export * from './components/checkbox'
export * from './components/radio'
export * from './components/sign'
export * from './components/roll'
export * from './components/row'
export * from './components/col'
export * from './components/autocomplete'
export * from './components/overlay'
export * from './components/popup'
export * from './components/dropdown'
export * from './components/tooltip'
export * from './components/transition-slide'
export * from './components/switch'
export * from './components/navbar'
export * from './components/notify'
export * from './components/actionsheet'
export * from './components/calendar'
export * from './components/circle-progress'
export * from './components/collapse'
export * from './components/collapse-item'
export * from './components/date-chooser'
export * from './components/date-native-picker'
export * from './components/picker'
export * from './components/progress'
export * from './components/slider'

/***** 全局导出 *****/
const install = (app: App) => {
	const components = {
		Anchor,
		Drag,
		Observe,
		Prop,
		Px,
		Resize,
		Ripple,
		Scroll,
		Spy,
		Upload,
		Icon,
		Badge,
		Button,
		Triangle,
		Layer,
		Label,
		Input,
		Loading,
		LoadingBar,
		Msgbox,
		Divider,
		Cell,
		CellGroup,
		Checkbox,
		Radio,
		Sign,
		Roll,
		Row,
		Col,
		Autocomplete,
		Overlay,
		Popup,
		Dropdown,
		Tooltip,
		TransitionSlide,
		Switch,
		Navbar,
		Notify,
		Actionsheet,
		Calendar,
		CircleProgress,
		Collapse,
		CollapseItem,
		DateChooser,
		DateNativePicker,
		Picker,
		Progress,
		Slider
	}
	//注册组件和指令
	Object.values(components).map(component => {
		component.install(app)
	})
}

/***** 版本号 *****/
const version = '1.9.4'

const stdin_default = {
	install,
	version
}

export { stdin_default as default, install, version }
