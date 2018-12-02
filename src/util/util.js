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

export function replaceInArrayByIndex(arrayToChange, newEl, index) {
    let len = arrayToChange.length;
    return arrayToChange.slice(0, index).concat([newEl], arrayToChange.slice(index + 1, len));
}

export function removeByIdentifier(a, idName, id) {
    if (type(a) === 'Array') {
        let len = a.length;
        let objToRemove = a.find((o) => o[idName] === id);
        let index = a.indexOf(objToRemove);
        return a.slice(0, index).concat(a.slice(index + 1, len));
    } else {
        throw new Error('The first argument to \'removeByIdentifier\' must be an array.');
    }
}