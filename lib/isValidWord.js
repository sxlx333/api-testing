/**
 * Funkcija tikrinanti, ar duotas zodis yra tinkamas naudoti zodyne.
 * @param {string} text  Zodis
 * @returns {[boolean, string]} Validavimo resultatas, kur pirmoji masyvo reiksme reiskia, ar zodis yra validus, o antroji reiksme yra zinute / validacijos reiksme.
 */
export function isValidWord(text) {
    const abc = 'aąbcčdeęėfghiįyjklmnoprsštuųūvzžAĄBCČDEĘĖFGHIĮYJKLMNOPRSŠTUŲŪVZŽ';
    if (text === undefined) {
        return [false, 'Negauta zodzio reiksme"'];
    }
    if (typeof text !== "string") {
        return [false, 'Zodis turi buti teksto tipo"'];
    }
    if (text === "") {
        return [false, 'Zodis negali buti tuscias"'];
    }

    for (const letter of text) {
        if (!abc.includes(letter)) {
            return [false,`Zodyje yra neleistinas simbolis "${letter}"`];
        }
    }

    return [true, 'Zodis yra validus'];
}