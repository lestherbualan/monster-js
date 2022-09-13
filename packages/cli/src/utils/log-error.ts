import chalk from 'chalk';

export async function logError(message: string) {
    const chalk = (await import('chalk')).default;
    console.log(chalk.red(`[ERROR]: ${message}`));
}