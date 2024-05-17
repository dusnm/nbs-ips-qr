const invalidDetailsTooLongErr = new Error('Ime, adresa i mesto zajedno ne smeju da sadrže više od 70 karaktera.');
const invalidDetailsCharacterErr = new Error('Ime, adresa ili mesto sadrže nevažeće karaktere.');
const invalidAmountErr = new Error('Iznos mora biti decimalni broj veći od nule');
const invalidCodeErr = new Error('Nevažeća šifra plaćanja.');
const invalidPurposeLengthErr = new Error('Svrha uplate ne sme imati više od 35 karaktera');
const invalidPurposeCharacterErr = new Error('Svrha uplate sadrži nevažeće karaktere.');

function validateStringConformsToSpec(testString) {
    const allowedCharacters = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'Č', 'Ć', 'D', 'Đ', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'Š', 'T', 'U', 'V', 'Z', 'Ž',
        'a', 'b', 'c', 'č', 'ć', 'd', 'đ', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 'š', 't', 'u', 'v', 'z', 'ž',
        'А', 'Б', 'В', 'Г', 'Д', 'Ђ', 'Е', 'Ж', 'З', 'И', 'Ј', 'К', 'Л', 'Љ', 'М', 'Н', 'Њ', 'О', 'П', 'Р', 'С', 'Т', 'Ћ', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Џ', 'Ш',
        'а', 'б', 'в', 'г', 'д', 'ђ', 'е', 'ж', 'з', 'и', 'ј', 'к', 'л', 'љ', 'м', 'н', 'њ', 'о', 'п', 'р', 'с', 'т', 'ћ', 'у', 'ф', 'х', 'ц', 'ч', 'џ', 'ш',
        ' ', '!', '(', '/', '@', '}', '“', ')', ':', '[', '~', '#', '*', ';', ']', '„', '$', '+', '<', '^', '”', '%', ',', '=', '_', '"', '&', '-', '>', '`', '’', '‘', '.', '?', '{', '\''
    ];

    for (const c of testString) {
        const isAllowed = allowedCharacters.includes(c);

        if (!isAllowed) {
            return false;
        }
    }

    return true;
}

function validatePayeeDetails(name, address, place) {
    const testString = `${name}${address}${place}`;

    if (testString.length > 70) {
        throw invalidDetailsTooLongErr;
    }

    if (!validateStringConformsToSpec(testString)) {
        throw invalidDetailsCharacterErr;
    }
}

function validateCode(code) {
    if (code.length !== 3) {
        throw invalidCodeErr;
    }

    const value = parseInt(code);

    if (Number.isNaN(value)) {
        throw invalidCodeErr;
    }

    // 1 cash
    // 2 cashless
    const paymentType = Math.floor(value / 100);

    if (paymentType !== 1 && paymentType !== 2) {
        throw invalidCodeErr;
    }

    const validCodes = [
        20, 21, 22, 23, 24, 25, 26, 27, 28, 31,
        40, 41, 42, 44, 45, 46, 47, 48, 49, 53,
        54, 57, 58, 60, 61, 62, 63, 64, 65, 66,
        70, 71, 72, 73, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    ];

    if (!validCodes.includes(value % 100)) {
        throw invalidCodeErr;
    }
}

function validatePurpose(purpose) {
    if (purpose.length > 35) {
        throw invalidPurposeLengthErr;
    }

    if (!validateStringConformsToSpec(purpose)) {
        throw invalidPurposeCharacterErr;
    }
}

function validateAmount(amount) {
    // amount is optional
    if (amount === '') {
        return;
    }

    const value = parseFloat(amount);

    if (Number.isNaN(value)) {
        throw invalidAmountErr;
    }

    if (value <= 0) {
        throw invalidAmountErr;
    }
}

function validateInput(
    name,
    address,
    place,
    code,
    purpose,
    amount,
) {
    validatePayeeDetails(name, address, place);
    validateCode(code);
    validatePurpose(purpose);
    validateAmount(amount);
}

export {
    validateInput,
}