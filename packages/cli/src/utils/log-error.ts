import colors from 'colors';

export async function logError(message: string) {
    const text = colors.red('ERROR');
    console.log(`[${text}]: ${message}`);
}