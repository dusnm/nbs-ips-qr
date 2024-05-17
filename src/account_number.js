const InvalidBankAccountErr = new Error('Nevalidan bankovni račun.');
const InvalidBankAccountFormatErr = new Error('Delovi bankovnog računa moraju biti odvojeni povlakama.');

function expandAccountNumber(number) {
    const parts = number.split('-');
    
    if (parts.length != 3) {
        throw InvalidBankAccountFormatErr;
    }

    const [
        bankCode,
        accountNumber,
        checksum,
    ] = parts;

    if (bankCode.length != 3) {
        throw InvalidBankAccountErr;
    }

    if (!Number.isInteger(parseInt(bankCode))) {
        throw InvalidBankAccountErr;
    }

    if (checksum.length != 2) {
        throw InvalidBankAccountErr;
    }

    if (!Number.isInteger(parseInt(checksum))) {
        throw InvalidBankAccountErr;
    }

    if (accountNumber.length > 13) {
        throw InvalidBankAccountErr;
    }

    if (!Number.isInteger(parseInt(accountNumber))) {
        throw InvalidBankAccountErr;
    }

    return `${bankCode}${accountNumber.padStart(13, 0)}${checksum}`;
}

function validateAccountNumberChecksum(number) {
    const accountNumber = BigInt(number);
    const checksum = accountNumber % 100n;
    const accountNumberWithoutChecksum = accountNumber / 100n;

    const checksumValid = 98n - accountNumberWithoutChecksum * 100n % 97n === checksum;

    if (!checksumValid) {
        throw InvalidBankAccountErr;
    }
}

export {
    expandAccountNumber,
    validateAccountNumberChecksum,
}