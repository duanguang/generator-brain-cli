declare const io: {
    removeEmptyIndicatorFiles: (rootDirectory: string) => void;
    copyRecursiveSync: (src: string, dest: string, options?: {
        ignoreFile?: boolean;
        ignoreDirectory?: boolean;
        fileExistCallback?: (dest: string) => void;
        fileCreatedCallback?: (dest: string) => void;
        directoryExistCallback?: (dest: string) => void;
        directoryCreatedCallback?: (dest: string) => void;
    }) => void;
};
export default io;
