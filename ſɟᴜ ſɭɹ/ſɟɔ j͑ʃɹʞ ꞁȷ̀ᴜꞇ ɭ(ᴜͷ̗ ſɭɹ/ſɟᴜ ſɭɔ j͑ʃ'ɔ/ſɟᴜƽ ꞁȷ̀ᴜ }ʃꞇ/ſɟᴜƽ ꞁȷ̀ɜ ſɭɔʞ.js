// ≺⧼ String Utilities ⧽≻

/**
 * Escape HTML special characters
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Truncate string to max length with ellipsis
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
function truncate(str, maxLength = 0o40) {
    if (!str) return "";
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}

/**
 * Check if string contains any of the terms
 * @param {string} str
 * @param {string[]} terms
 * @returns {boolean}
 */
function containsAny(str, terms) {
    if (!str) return false;
    return terms.some(term => str.includes(term));
}
