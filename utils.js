function range(start, end, step) {
    let arr = []
    for (let iteration=start; iteration<end; iteration+=step) {
        arr.push(iteration)
    }
    return arr
}
