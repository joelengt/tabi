export function pay2(title, amount) {
	amount = Number(amount);
	amount = +(amount.toFixed(2).replace('.', ''));

    Culqi.publicKey = 'pk_test_FwE0vKV3KZwevsrA';
    Culqi.settings({
        title: title,
        currency: 'USD',
        description: 'Poliza',
        amount: amount
    });

    Culqi.open();

}