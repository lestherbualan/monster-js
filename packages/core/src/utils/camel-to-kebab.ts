export const camelToKebab = (value: string): string => value.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter && isNaN(letter as any)
    ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
    : letter;
}).join('');
