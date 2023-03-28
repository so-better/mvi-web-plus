class Bus {
	constructor() {
		this.list = {}
	}

	emit(name, ...args) {
		let fnArray = this.list[name]
		if (Array.isArray(fnArray)) {
			fnArray.forEach(fn => {
				fn.apply(this, args)
			})
		}
	}

	on(name, callback) {
		let fnArray = this.list[name] || []
		fnArray.push(callback)
		this.list[name] = fnArray
	}
}

export default new Bus()
