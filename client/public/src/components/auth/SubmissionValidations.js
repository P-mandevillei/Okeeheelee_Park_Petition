export function isValidEmail(email) {
    return /^[\w!#$%&'*+/=?^_`{}~\.-]+@[\w\-]+(\.[\w\-]+)+$/.test(email);
}

export function isValidZipCode(zipCode) {
    return /^\d{5}$/.test(zipCode);
}

export function isValidUSPhone(phone) {
    return /^\d{10}$/.test(phone);
}