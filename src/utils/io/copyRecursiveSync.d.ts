export default function copyRecursiveSync(src: string, dest: string, options?: {
    ignoreFile?: boolean;
    ignoreDirectory?: boolean;
    fileExistCallback?: (dest: string) => void;
    fileCreatedCallback?: (dest: string) => void;
    directoryExistCallback?: (dest: string) => void;
    directoryCreatedCallback?: (dest: string) => void;
}): void;
