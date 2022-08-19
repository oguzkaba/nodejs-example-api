function stringValidate(e) {
    switch (e) {
        case "":
        case 0:
        case "0":
        case null:
        case false:
        case undefined:
            return false;
        default:
            return true;
    }
}

module.exports = { stringValidate };