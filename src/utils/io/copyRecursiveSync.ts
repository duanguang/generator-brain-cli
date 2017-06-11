const fs = require('fs');
const path = require('path');

type CopyRecursiveSyncOption = {
    ignoreFile?: boolean,
    ignoreDirectory?: boolean
    fileExistCallback?: (dest: string) => void;
    fileCreatedCallback?: (dest: string) => void;
    directoryExistCallback?: (dest: string) => void;
    directoryCreatedCallback?: (dest: string) => void;
};

export default function copyRecursiveSync(src: string, dest: string, options = {} as CopyRecursiveSyncOption) {
    const {ignoreFile, ignoreDirectory} = options;
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (exists && isDirectory) {
        if (!ignoreDirectory) {
            try {
                fs.mkdirSync(dest);
                options.directoryCreatedCallback && options.directoryCreatedCallback(dest);
            } catch (e) {
                if (e.code === `EEXIST`) {
                    options.directoryExistCallback && options.directoryExistCallback(dest)
                }
            }
        }
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName), options);
        });
    } else {
        if (!ignoreFile) {
            try {
                fs.linkSync(src, dest);
                options.fileCreatedCallback && options.fileCreatedCallback(dest);
            } catch (e) {
                if (e.code === `EEXIST`) {
                    options.fileExistCallback && options.fileExistCallback(dest)
                }
            }
        }
    }
}