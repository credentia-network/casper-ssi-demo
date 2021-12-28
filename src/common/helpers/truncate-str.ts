
export function truncateStr(source: string, start: number = 4, end: number = 4): string {
    if (!source) {
        return source;
    }
    const len = source.length;
    if (len <= start + end) {
        return source;
    }
    return `${source.substring(0, start)}...${source.substring(len - end)}`;
}
