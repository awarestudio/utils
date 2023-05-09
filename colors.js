class ColorMap {
	constructor(colors, intervals, interpolation=false) {
		this.colors = colors
		this.intervals = intervals
		this.interpolation = interpolation
	}

	static fromInversion(cm) {
		let colorMap = new ColorMap([], cm.intervals, cm.interpolation)

		for (let colorIndex = 0; colorIndex < cm.colors.length; colorIndex++) {	
			let c = color(0, 0, 0, cm.colors[colorIndex].levels[3])
			
			for (let levelIndex = 0; levelIndex < c.levels.length - 1; levelIndex++) {
				c.levels[levelIndex] = 255 - cm.colors[colorIndex].levels[levelIndex]
			}
			
			colorMap.colors.push(c)
		}

		return colorMap
	}

	getColor(color_value) {
		let final_color = this.colors.slice(-1)[0]

		for (var interval_index = 0; interval_index < this.intervals.length-1; interval_index++) {
			let left_interval_value = this.intervals[interval_index]
			let right_interval_value = this.intervals[interval_index + 1]

			if (color_value < right_interval_value) {
				if (this.interpolation) {
					let lerp_value = map(color_value, left_interval_value, right_interval_value, 0, 1)

					if (this.interpolation == 'linear') {
						final_color = lerpColor(
							this.colors[interval_index],
							this.colors[interval_index+1],
							lerp_value
						)
					} else if (this.interpolation == 'quadratic') {
						final_color = ColorMap.quadraticLerpColor(
							this.colors[interval_index],
							this.colors[interval_index+1],
							lerp_value
						)
					}

				} else {
					final_color = this.colors[interval_index]
				}
				break
			}
		}

		return final_color
	}

	static quadraticLerpColor(c1, c2, v) {
		return color(
			quadraticInterpolation(c1.levels[0], c2.levels[0], v),
			quadraticInterpolation(c1.levels[1], c2.levels[1], v),
			quadraticInterpolation(c1.levels[2], c2.levels[2], v),
			quadraticInterpolation(c1.levels[3], c2.levels[3], v),
		)
	}
}

