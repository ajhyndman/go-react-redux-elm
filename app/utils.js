export const range = function *(start, end, step = 1) {
    if (start < end) {
        yield start;
        yield *range(start + step, end, step);
    }
    return;
};
