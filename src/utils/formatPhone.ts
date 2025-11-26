
export function formatPhone(phone: string): string {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');

    // Format based on length
    if (digits.length >11) {
        return phone.slice(0, 15); // Return original if too long
    }

    const formatedPhone = digits.replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{4,5})(\d{4})$/,'$1-$2'); 
    return formatedPhone;
}


export function unformatPhone(formattedPhone: string): string {
    return formattedPhone.replace(/[\(\)\s-]/g, '');
}