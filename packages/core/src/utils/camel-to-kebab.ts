export const camelToKebab = (value: string): string => value.split('').map((letter, idx) => {
    const hyphen = () => (idx !== 0 && value[idx - 1] !== '-') ? '-' : '';
    return (letter.toUpperCase() === letter && isNaN(letter as any) && letter !== '-')
    ? `${hyphen()}${letter.toLowerCase()}`
    : letter;
}).join('');
