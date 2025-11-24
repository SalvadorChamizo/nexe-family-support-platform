export function getElement<T extends HTMLElement>(selector: string): T {
    const el = document.querySelector<T>(selector);
    if (!el)
        throw new Error(`Element not found: ${selector}`);
    return el;
}