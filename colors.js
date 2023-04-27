class ColorMap {
	constructor(colors, intervals) {
		this.colors = colors
		this.intervals = [0].concat(intervals).concat([1])
	}

	getColor(value) {
		for (var index = 0; index < this.intervals.length; index++) {
			if (this.intervals[index] > value) {
				break
			}
			else if (value == this.intervals.slice(-1)) {
				return this.colors.slice(-1)[0]
			}
		}
		return this.colors[index-1]
			
	}
}