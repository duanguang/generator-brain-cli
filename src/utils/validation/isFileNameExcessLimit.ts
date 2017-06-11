export default function isFileNameExcessLimit(filename: string) {
    return filename.length > 255;
}