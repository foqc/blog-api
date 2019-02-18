/**
 * 
 * @param {JSON object} objects 
 * @param {property to search inside JSON object} property 
 * @param {function to be evaluated} fn
 */
export const getNestedObjectKeys = (objects, property, fn) => {
    const imgKeys = [];
    Object.keys(objects).forEach((obj) => {
        if (Object.prototype.hasOwnProperty.call(objects[obj], property) && fn(objects[obj][property])) {
            imgKeys.push(obj);
        }
    });
    return imgKeys;
}

/**
 * 
 * @param {string to obtain words} str 
 * @param {number of words to get} wordsNumber 
 */
export const getWords = (str, wordsNumber) => str.split(/\s+/).slice(0,wordsNumber).join(" ");