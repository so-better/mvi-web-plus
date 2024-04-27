import Dap from 'dap-util'

enum UploadErrorType {
	//文件后缀不符合
	FILE_SUFFIX_ERROR = 'suffixError',
	//超出最大文件尺寸限制
	FILE_MAXSIZE_ERROR = 'maxSizeError',
	//文件尺寸没有达到要求的最小值
	FILE_MINSIZE_ERROR = 'minSizeError',
	//文件数量超出限制
	FILE_MAXLENGTH_ERROR = 'maxLengthError',
	//文件数量没有达到最小值
	FILE_MINLENGTH_ERROR = 'minLengthError'
}

type UploadOptionsType = {
	accept?: string
	capture?: boolean
	allowedFileType?: Array<string>
	multiple?: boolean
	minSize?: number
	maxSize?: number
	minLength?: number
	maxLength?: number
	append?: boolean
	disabled?: boolean
	error?: (...args: any) => void
	select?: (...args: any) => void
	ready?: (...args: any) => void
	extraData?: object
}

/**
 * 文件上传
 */
class Upload {
	//组件容器
	private $el: HTMLElement
	//接受的文件类型
	private accept?: string
	//是否直接使用摄像头或者麦克风，只有在accept为image或者video或者audio时有效
	private capture?: boolean
	//限定上传文件的后缀
	private allowedFileType?: Array<string>
	//上传文件的最小值
	private minSize?: number
	//上传文件的最大值
	private maxSize?: number
	//上传文件的最大个数
	private maxLength?: number
	//上传文件的最小个数
	private minLength?: number
	//是否多选
	private multiple?: boolean
	//选择的文件是否追加
	private append?: boolean
	//是否禁用
	private disabled?: boolean
	//选择文件错误触发的回调函数
	private error?: (...args: any) => void
	//选择文件成功后触发的回调函数
	private select?: (...args: any) => void
	//加载完毕触发的回调函数
	private ready?: (...args: any) => void
	//额外的参数
	private extraData?: any

	//文件上传元素
	private $selectInput: HTMLInputElement | null = null
	//选择的文件值数组
	private files: Array<File> = []
	//是否初始化
	private hasInit: boolean = false

	//install函数
	static install: (...args: any) => void

	constructor(element: HTMLElement, options: UploadOptionsType) {
		options = Dap.common.isObject(options) ? options : {}
		this.$el = element
		this.accept = options.accept
		this.capture = options.capture
		this.allowedFileType = options.allowedFileType
		this.minSize = options.minSize
		this.maxSize = options.maxSize
		this.maxLength = options.maxLength
		this.minLength = options.minLength
		this.multiple = options.multiple
		this.append = options.append
		this.error = options.error
		this.select = options.select
		this.disabled = options.disabled
		this.ready = options.ready
		this.extraData = options.extraData
	}

	//判断选择的文件是否符合规定的后缀格式
	private judgeSuffix(fileName: string) {
		//获取文件后缀
		let suffix = fileName.substring(fileName.lastIndexOf('.') + 1)
		if (this.allowedFileType!.length == 0) {
			return true
		} else {
			//转为小写
			suffix = suffix.toLocaleLowerCase()
			for (let i = 0; i < this.allowedFileType!.length; i++) {
				this.allowedFileType![i] = this.allowedFileType![i].toLocaleLowerCase()
			}
			return this.allowedFileType!.includes(suffix)
		}
	}

	//api：初始化
	init() {
		if (this.hasInit) {
			return
		}
		this.hasInit = true
		if (!Dap.element.isElement(this.$el)) {
			throw new TypeError('The upload element is not specified')
		}
		if (!(this.allowedFileType instanceof Array)) {
			this.allowedFileType = []
		}
		if (!Dap.number.isNumber(this.minSize) || this.minSize! <= 0) {
			this.minSize = -1
		}
		if (!Dap.number.isNumber(this.maxSize) || this.maxSize! <= 0) {
			this.maxSize = -1
		}
		if (!Dap.number.isNumber(this.maxLength) || this.maxLength! <= 0) {
			this.maxLength = -1
		}
		if (!Dap.number.isNumber(this.minLength) || this.minLength! <= 0) {
			this.minLength = -1
		}
		if (typeof this.multiple != 'boolean') {
			this.multiple = false
		}
		if (typeof this.capture != 'boolean') {
			this.capture = false
		}
		if (typeof this.append != 'boolean') {
			this.append = false
		}
		if (typeof this.disabled != 'boolean') {
			this.disabled = false
		}
		if (typeof this.error != 'function') {
			this.error = function () {}
		}
		if (typeof this.select != 'function') {
			this.select = function () {}
		}
		if (typeof this.ready != 'function') {
			this.ready = function () {}
		}
		if (!Dap.common.isObject(this.extraData)) {
			this.extraData = {}
		}
		//生成input[type='file']元素
		this.$selectInput = <HTMLInputElement>Dap.element.string2dom("<input type='file' />")

		if (this.accept) {
			this.$selectInput!.setAttribute('accept', this.accept)
		}
		if (this.multiple) {
			this.$selectInput!.setAttribute('multiple', 'multiple')
		}
		if (this.disabled) {
			this.$el.setAttribute('disabled', 'disabled')
		}
		this.$el.onclick = () => {
			if (this.disabled) {
				return
			}
			this.$selectInput!.click()
		}

		this.$selectInput!.onchange = () => {
			if (this.disabled) {
				return
			}
			let files = [...this.$selectInput!.files!]
			this.$selectInput!.value = ''
			//选择的文件不追加，则清空文件数组
			if (!this.append) {
				this.files = []
			}
			let length = files.length
			let isAllAccord = true
			for (let i = 0; i < length; i++) {
				//判断后缀
				if (!this.judgeSuffix(files[i].name)) {
					this.error!.apply(this, [UploadErrorType.FILE_SUFFIX_ERROR, files[i]])
					isAllAccord = false
					break
				}
				//超出文件最大值
				if (files[i].size / 1024 > this.maxSize! && this.maxSize! > 0) {
					this.error!.apply(this, [UploadErrorType.FILE_MAXSIZE_ERROR, files[i]])
					isAllAccord = false
					break
				}
				//没有达到最小值
				if (files[i].size / 1024 < this.minSize! && this.minSize! > 0) {
					this.error!.apply(this, [UploadErrorType.FILE_MINSIZE_ERROR, files[i]])
					isAllAccord = false
					break
				}
				//超出最大数量限制
				if (this.files.length + length > this.maxLength! && this.maxLength! > 0) {
					this.error!.apply(this, [UploadErrorType.FILE_MAXLENGTH_ERROR])
					isAllAccord = false
					break
				}
			}
			//条件未通过
			if (!isAllAccord) {
				return
			}
			//文件数量没有达到最小值
			if (this.files.length + length < this.minLength! && this.minLength! > 0) {
				this.error!.apply(this, [UploadErrorType.FILE_MINLENGTH_ERROR])
				return
			}
			this.files = [...this.files, ...files]
			this.select!.apply(this, [[...this.files], { ...this.extraData }])
		}

		//ready
		this.ready.apply(this, [this])
	}

	//api：获取已经选择的文件
	getFiles() {
		return {
			files: [...this.files],
			extraData: { ...this.extraData }
		}
	}

	//api：清空选择的文件
	clear() {
		this.files = []
		this.$selectInput!.value = ''
		this.select!.apply(this, [[...this.files], { ...this.extraData }])
	}

	//api：禁用
	setDisabled() {
		this.disabled = true
		this.$el.setAttribute('disabled', 'disabled')
	}

	//api：启用
	setEnabled() {
		this.disabled = false
		this.$el.removeAttribute('disabled')
	}
}

export default Upload
