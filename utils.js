function range(start, stop, step) {
    let arr = []
    for (let iteration = start; iteration < stop; iteration += step) {
        arr.push(iteration)
    }
    return arr
}

function linspace(start, stop, num, endPoint=true, retstep=false) {
    let arr = []
    let correction = endPoint ? 1 : 0
    let step = (stop - start) / (num - correction)
    for (let iteration=0; iteration < num; iteration++) {
        arr.push(start + iteration*step)
    }
    if (retstep) {
        return [arr, step]
    }
    else {
        return arr
    }
}