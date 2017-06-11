export function stripNullOrUndefinedItem<T>(arr: Array<T>): Array<T> {
    return arr.filter((item) => {
        return item != null && item != undefined
    });
}

const array = {
    stripNullOrUndefinedItem
};

export default array;