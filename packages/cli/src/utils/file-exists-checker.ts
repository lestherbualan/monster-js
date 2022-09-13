import { existsSync } from "fs";

export const fileExistsChecker = (path: string) => existsSync(path);