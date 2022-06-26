const singleNumber = /^\d+$/
const singleWord = /^[A-Za-z]+$/
const multiNumbersSeparatedWithComma = /^\d+(,\d+)*$/

module.exports = function inputValidator(trimValue){

    const partOfNumbersSeprateWithComma = 
            trimValue.substring(0,1).match(multiNumbersSeparatedWithComma)

    const singleNumberPattern = trimValue.match(singleNumber)
    const singleWordPattern = trimValue.match(singleWord)
    const multiNumberPattern = trimValue.match(multiNumbersSeparatedWithComma)

    return  singleWordPattern !== null || 
            singleNumberPattern !== null || 
            multiNumberPattern !== null || 
            partOfNumbersSeprateWithComma !== null
}