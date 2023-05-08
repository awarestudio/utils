class ColorMap {
	constructor(colors, intervals, lerp=false) {
		this.colors = colors
		this.intervals = intervals
		this.lerp = lerp
	}

	getColor(color_value) {
		let final_color = this.colors.slice(-1)[0]

		for (var interval_index = 0; interval_index < this.intervals.length-1; interval_index++) {
			let left_interval_value = this.intervals[interval_index]
			let right_interval_value = this.intervals[interval_index + 1]

			if (color_value < right_interval_value) {
				if (this.lerp) {
					let lerp_value = map(color_value, left_interval_value, right_interval_value, 0, 1)

					if (this.lerp == 'linear') {
						final_color = lerpColor(
							this.colors[interval_index],
							this.colors[interval_index+1],
							lerp_value
						)
					} else if (this.lerp == 'quadratic') {
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

