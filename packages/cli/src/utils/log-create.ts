import colors from 'colors';

export async function logCreate(message: string) {
    const text = colors.green('CREATE');
    console.log(`[${text}]: ${message}`);
}