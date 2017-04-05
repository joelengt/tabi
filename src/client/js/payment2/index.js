export function pay2() {
    Culqi.publicKey = '<Aquí inserta tu llave pública>';
    Culqi.settings({
        title: 'Culqi Store',
        currency: 'PEN',
        description: 'Polo Culqi lover',
        amount: 3500
    });
}