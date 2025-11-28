
// valor em centavos = valor em reais * 100
// valor em reais = valor em centavos / 100



/**
 * Convert real(BRL) string format to cents integer
 * @param amount {string} - Amount in BRL format (e.g., "1.234,56")
 * @returns {number} - Amount in cents (e.g., 123456)
 * @example
 * convertRealToCents("1.234,56") // returns 123456 cents
 */
export function convertRealToCents(amount: string) {
    const numericPrice =parseFloat(amount.replace(/\./g,'').replace(",", "."))
    return Math.round( numericPrice * 100);
}

export function convertCentsToReal(value: number) {
    return value / 100;
}