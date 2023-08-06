
export function formatDate(date) {
    const parts = date.split('-');
    if (parts.length !== 3) {
        throw new Error('Formato de fecha no válido');
    }
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
}