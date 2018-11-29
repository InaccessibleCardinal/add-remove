export function type(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
}

export function updateArrayById(arrayToUpdate, id, arrayOfChanges) {
    let len = arrayToUpdate.length;
    let objToUpdate = arrayToUpdate.find((o) => o.id === id);
    let index = arrayToUpdate.indexOf(objToUpdate);
    let updatedObj = {...objToUpdate};
    arrayOfChanges.forEach((changeObj) => {
        let {changeKey, changeValue} = changeObj;
        updatedObj[changeKey] = changeValue;
    });
    return arrayToUpdate.slice(0, index).concat([updatedObj], arrayToUpdate.slice(index + 1, len));
}