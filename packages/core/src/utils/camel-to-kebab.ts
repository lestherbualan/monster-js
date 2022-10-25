export const camelToKebab = (value: string): string => value.split('').map((letter, idx) => {
    return (letter.toUpperCase() === letter && isNaN(letter as any) && letter !== '-')
    ? `${(idx !== 0 && value[idx - 1] !== '-') ? '-' : ''}${letter.toLowerCase()}`
    : letter;
}).join('');
