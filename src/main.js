import { encodeIPSFormat } from "./ips.js";
import { validateInput } from "./validate.js";
import { expandAccountNumber, validateAccountNumberChecksum } from "./account_number.js";


function main() {
    const name = document.querySelector('input[name="name"]');
    const address = document.querySelector('input[name="address"]');
    const place = document.querySelector('input[name="place"]');
    const account = document.querySelector('input[name="account"]');
    const code = document.querySelector('input[name="code"]');
    const purpose = document.querySelector('input[name="purpose"]');
    const amount = document.querySelector('input[name="amount"]');
    const form = document.querySelector('#generator');

    form.addEventListener('submit', e => {
        e.preventDefault();

        document.querySelector('#download-button')?.remove();
        document.querySelector('#error-box')?.remove();

        const nameValue = name.value.trim();
        const addressValue = address.value.trim();
        const placeValue = place.value.trim();
        const accountValue = account.value.trim();
        const codeValue = code.value.trim();
        const purposeValue = purpose.value.trim();
        const amountValue = amount.value.trim();
        const placement = document.querySelector('.qr-placement');
        placement.innerHTML = '';


        try {
            validateInput(
                nameValue,
                addressValue,
                placeValue,
                codeValue,
                purposeValue,
                amountValue,
            );

            const formattedAccount = expandAccountNumber(accountValue);

            validateAccountNumberChecksum(formattedAccount);

            const format = encodeIPSFormat(
                formattedAccount,
                nameValue,
                addressValue,
                placeValue,
                amountValue,
                codeValue,
                purposeValue,
            );

            new QRCode(
                placement,
                {
                    text: format,
                    width: 300,
                    height: 300,
                    colorDark: getComputedStyle(document.body).getPropertyValue('--dark'),
                    colorLight: getComputedStyle(document.body).getPropertyValue('--text'),
                    correctLevel: QRCode.CorrectLevel.L,
                },
            );

            const downloadButton = document.createElement('button');
            downloadButton.innerText = 'Preuzmi';
            downloadButton.classList.add('btn');
            downloadButton.style.marginTop = '0.5rem';
            downloadButton.id = 'download-button';
            downloadButton.addEventListener('click', () => {
                const canvas = document.querySelector('canvas');
                const uri = canvas.toDataURL('image/jpeg');
                const link = document.createElement('a');
                link.download = 'nbs_ips_qr.jpg';
                link.href = uri;
                link.click();
            });

            placement.parentElement.appendChild(downloadButton);

        } catch(err) {
            placement.innerHTML = '<canvas height="300" width="300"></canvas>';
            const rootElement = document.querySelector('main');
            const errorBox = document.createElement('div');
            errorBox.id = 'error-box';

            const message = document.createElement('p');
            message.innerText = `Greška: ${err.message}`;

            errorBox.appendChild(message);
            rootElement.appendChild(errorBox);
        }
    });
}

document.addEventListener('DOMContentLoaded', main);