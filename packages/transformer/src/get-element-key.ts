import path from 'path';
import { writeFileSync, existsSync, readFileSync } from 'fs';

const keysPath = path.resolve(process.cwd(), './.config/.transformer-cache.json');

export function getElementKey(id) {
    let key;
    const dirKey = id.replace(/\\/g, ':');

    if (!existsSync(keysPath)) {
        writeFileSync(keysPath, '{}');
    }

    const keys = JSON.parse(readFileSync(keysPath, {encoding:'utf8', flag:'r'}));

    if (!keys[dirKey]) {
        key = keys[dirKey] = 'mn-' + Object.keys(keys).length;
        writeFileSync(keysPath, JSON.stringify(keys, null, '\t'));
    } else {
        key = keys[dirKey];
    }
    return key;
}

