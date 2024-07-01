import Dap from 'dap-util'
import { App } from 'vue'

//引入颜色样式
import '@/css/var.less'

//解决ios系统下css伪类无效的问题
Dap.event.on(window, 'touchstart.ios', () => {})

/***** 指令 *****/
import Anchor from '@/directives/anchor'
import Drag from '@/directives/drag'
import Observe from '@/directives/observe'
import Prop from '@/directives/prop'
import Px from '@/directives/px'
import Resize from '@/directives/resize'
import Ripple from '@/directives/ripple'
import Scroll from '@/directives/scroll'
import Spy from '@/directives/spy'
import Upload from '@/directives/upload'
/***** 组件 *****/
import Icon from '@/components/icon'
import Badge from '@/components/badge'
import Button from '@/components/button'
import Triangle from '@/components/triangle'
import Layer from '@/components/layer'
import Label from '@/components/label'
import Input from '@/components/input'
import Loading from '@/components/loading'
import LoadingBar from '@/components/loading-bar'
import Msgbox from '@/components/msgbox'
import Divider from '@/components/divider'
import Cell from '@/components/cell'
import CellGroup from '@/components/cell-group'
import Checkbox from '@/components/checkbox'
import Radio from '@/components/radio'
import Sign from '@/components/sign'
import Roll from '@/components/roll'
import Row from '@/components/row'
import Col from '@/components/col'
import Autocomplete from '@/components/autocomplete'
import Overlay from '@/components/overlay'
import Popup from '@/components/popup'
import Dropdown from '@/components/dropdown'
import Tooltip from '@/components/tooltip'
import TransitionSlide from '@/components/transition-slide'
import Switch from '@/components/switch'
import Navbar from '@/components/navbar'
import Notify from '@/components/notify'
import Actionsheet from '@/components/actionsheet'
import Calendar from '@/components/calendar'
import CircleProgress from '@/components/circle-progress'
import Collapse from '@/components/collapse'
import CollapseItem from '@/components/collapse-item'
import DateChooser from '@/components/date-chooser'
import DateNativePicker from '@/components/date-native-picker'
import Picker from '@/components/picker'
import Progress from '@/components/progress'
import Slider from '@/components/slider'
import DatePicker from '@/components/date-picker'
import Field from '@/components/field'
import Form from '@/components/form'
import FormEl from '@/components/form-el'
import Image from '@/components/image'
import ColorPicker from '@/components/color-picker'
import List from '@/components/list'
import Modal from '@/components/modal'
import Page from '@/components/page'
import Search from '@/components/search'
import Select from '@/components/select'
import Skeleton from '@/components/skeleton'
import Steps from '@/components/steps'
import Step from '@/components/step'
import Stepper from '@/components/stepper'
import NumberKeyboard from '@/components/number-keyboard'
import Toast from '@/components/toast'
import PullRefresh from '@/components/pull-refresh'
import Dialog from '@/components/dialog'
import SwipeCell from '@/components/swipe-cell'
import Tabbar from '@/components/tabbar'
import Table from '@/components/table'
import Tabs from '@/components/tabs'
import Tab from '@/components/tab'
import Carousel from '@/components/carousel'
import CarouselItem from '@/components/carousel-item'
import RichImage from '@/components/rich-image'
import ImagePreview from '@/components/image-preview'

/***** 按需导出 *****/
export * from '@/directives/anchor'
export * from '@/directives/drag'
export * from '@/directives/observe'
export * from '@/directives/prop'
export * from '@/directives/px'
export * from '@/directives/resize'
export * from '@/directives/ripple'
export * from '@/directives/scroll'
export * from '@/directives/spy'
export * from '@/directives/upload'
export * from '@/components/icon'
export * from '@/components/badge'
export * from '@/components/button'
export * from '@/components/triangle'
export * from '@/components/layer'
export * from '@/components/label'
export * from '@/components/input'
export * from '@/components/loading'
export * from '@/components/loading-bar'
export * from '@/components/msgbox'
export * from '@/components/divider'
export * from '@/components/cell'
export * from '@/components/cell-group'
export * from '@/components/checkbox'
export * from '@/components/radio'
export * from '@/components/sign'
export * from '@/components/roll'
export * from '@/components/row'
export * from '@/components/col'
export * from '@/components/autocomplete'
export * from '@/components/overlay'
export * from '@/components/popup'
export * from '@/components/dropdown'
export * from '@/components/tooltip'
export * from '@/components/transition-slide'
export * from '@/components/switch'
export * from '@/components/navbar'
export * from '@/components/notify'
export * from '@/components/actionsheet'
export * from '@/components/calendar'
export * from '@/components/circle-progress'
export * from '@/components/collapse'
export * from '@/components/collapse-item'
export * from '@/components/date-chooser'
export * from '@/components/date-native-picker'
export * from '@/components/picker'
export * from '@/components/progress'
export * from '@/components/slider'
export * from '@/components/date-picker'
export * from '@/components/field'
export * from '@/components/form'
export * from '@/components/form-el'
export * from '@/components/image'
export * from '@/components/color-picker'
export * from '@/components/list'
export * from '@/components/modal'
export * from '@/components/page'
export * from '@/components/search'
export * from '@/components/select'
export * from '@/components/skeleton'
export * from '@/components/steps'
export * from '@/components/step'
export * from '@/components/stepper'
export * from '@/components/number-keyboard'
export * from '@/components/toast'
export * from '@/components/pull-refresh'
export * from '@/components/dialog'
export * from '@/components/swipe-cell'
export * from '@/components/tabbar'
export * from '@/components/table'
export * from '@/components/tabs'
export * from '@/components/tab'
export * from '@/components/carousel'
export * from '@/components/carousel-item'
export * from '@/components/rich-image'
export * from '@/components/image-preview'

//导出类型
export type * from '@/directives/anchor'
export type * from '@/directives/drag'
export type * from '@/directives/observe'
export type * from '@/directives/prop'
export type * from '@/directives/px'
export type * from '@/directives/resize'
export type * from '@/directives/ripple'
export type * from '@/directives/scroll'
export type * from '@/directives/spy'
export type * from '@/directives/upload'
export type * from '@/components/icon'
export type * from '@/components/badge'
export type * from '@/components/button'
export type * from '@/components/triangle'
export type * from '@/components/layer'
export type * from '@/components/label'
export type * from '@/components/input'
export type * from '@/components/loading'
export type * from '@/components/loading-bar'
export type * from '@/components/msgbox'
export type * from '@/components/divider'
export type * from '@/components/cell'
export type * from '@/components/cell-group'
export type * from '@/components/checkbox'
export type * from '@/components/radio'
export type * from '@/components/sign'
export type * from '@/components/roll'
export type * from '@/components/row'
export type * from '@/components/col'
export type * from '@/components/autocomplete'
export type * from '@/components/overlay'
export type * from '@/components/popup'
export type * from '@/components/dropdown'
export type * from '@/components/tooltip'
export type * from '@/components/transition-slide'
export type * from '@/components/switch'
export type * from '@/components/navbar'
export type * from '@/components/notify'
export type * from '@/components/actionsheet'
export type * from '@/components/calendar'
export type * from '@/components/circle-progress'
export type * from '@/components/collapse'
export type * from '@/components/collapse-item'
export type * from '@/components/date-chooser'
export type * from '@/components/date-native-picker'
export type * from '@/components/picker'
export type * from '@/components/progress'
export type * from '@/components/slider'
export type * from '@/components/date-picker'
export type * from '@/components/field'
export type * from '@/components/form'
export type * from '@/components/form-el'
export type * from '@/components/image'
export type * from '@/components/color-picker'
export type * from '@/components/list'
export type * from '@/components/modal'
export type * from '@/components/page'
export type * from '@/components/search'
export type * from '@/components/select'
export type * from '@/components/skeleton'
export type * from '@/components/steps'
export type * from '@/components/step'
export type * from '@/components/stepper'
export type * from '@/components/number-keyboard'
export type * from '@/components/toast'
export type * from '@/components/pull-refresh'
export type * from '@/components/dialog'
export type * from '@/components/swipe-cell'
export type * from '@/components/tabbar'
export type * from '@/components/table'
export type * from '@/components/tabs'
export type * from '@/components/tab'
export type * from '@/components/carousel'
export type * from '@/components/carousel-item'
export type * from '@/components/rich-image'
export type * from '@/components/image-preview'

const plugins = { Anchor, Drag, Observe, Prop, Px, Resize, Ripple, Scroll, Spy, Upload, Icon, Badge, Button, Triangle, Layer, Label, Input, Loading, LoadingBar, Msgbox, Divider, Cell, CellGroup, Checkbox, Radio, Sign, Roll, Row, Col, Autocomplete, Overlay, Popup, Dropdown, Tooltip, TransitionSlide, Switch, Navbar, Notify, Actionsheet, Calendar, CircleProgress, Collapse, CollapseItem, DateChooser, DateNativePicker, Picker, Progress, Slider, DatePicker, Field, Form, FormEl, Image, ColorPicker, List, Modal, Page, Search, Select, Skeleton, Steps, Step, Stepper, NumberKeyboard, Toast, PullRefresh, Dialog, SwipeCell, Tabbar, Table, Tabs, Tab, Carousel, CarouselItem, RichImage, ImagePreview }
//安装函数
const install = (app: App) => {
	Object.values(plugins).map(plugin => {
		plugin.install(app)
	})
}
//版本号
const version = '2.0.12'

//导出深色模式方法
export { isDark, useDark } from '@/utils'

//导出
export { install as default, install, version }

console.log(`%c mvi-web-plus %c v${version} `, 'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;', 'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;')
