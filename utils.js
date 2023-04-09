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

function drawDebugLines(layer, debugColor="magenta", debugWeight=1) {
    layer.stroke(debugColor)
    layer.strokeWeight(debugWeight)
    layer.rect(0, 0, layer.width, layer.height)
    layer.line(0, 0, layer.width, layer.height)
}

function keyTyped() {
    if (key == 's') {
        saveImage()
    }
}

function saveImage(extension='png'){
    timestamp = urlPath[-1] + "_" + year() + "_" + month() + "_" + day() + "_" + hour() + "_" + minute() + "_" + second() + "_" + nf(millis(), 3, 0)
    save(timestamp + extension)
}