export function type(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
}