function encodeIPSFormat(
    accountNumber,
    name,
    address,
    place,
    amount,
    paymentCode,
    paymentPurpose,
) {
    const data = {
        K: 'PR',
        V: '01',
        C: '1',
        R: '',
        N: '',
        I: 'RSD0,00',
        SF: '',
        S: '',
    };

    data.R = accountNumber;
    data.N = `${name}\r\n${address}\r\n${place}`;

    if (amount !== '') {
        data.I = `RSD${parseFloat(amount).toFixed(2).replace('.', ',')}`;
    }

    data.SF = paymentCode;
    data.S = paymentPurpose;

    let ips = '';
    for (const [key, value] of Object.entries(data)) {
        if (value !== '') {
            ips += `${key}:${value}|`
        }
    }

    return ips.slice(0, -1);
}

export {
    encodeIPSFormat,
}