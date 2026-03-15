// ≺⧼ Storage Utilities ⧽≻

const Storage = {
    /**
     * Get item from localStorage
     * @param {string} key
     * @param {any} defaultValue
     * @returns {any}
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    /**
     * Set item in localStorage
     * @param {string} key
     * @param {any} value
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("Storage set failed", e);
        }
    },

    /**
     * Remove item from localStorage
     * @param {string} key
     */
    remove(key) {
        localStorage.removeItem(key);
    },

    /**
     * Get item from localStorage merged with defaults
     * @param {string} key
     * @param {object} defaults
     * @returns {object}
     */
    loadWithDefaults(key, defaults) {
        try {
            const item = localStorage.getItem(key);
            if (!item) return { ...defaults };
            const parsed = JSON.parse(item);
            return { ...defaults, ...parsed };
        } catch {
            return { ...defaults };
        }
    }
};
