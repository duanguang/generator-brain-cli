export default function isFileNameValid(filename: string) {
    return /\/|\|<|>|\*|\?/.test(filename);
}