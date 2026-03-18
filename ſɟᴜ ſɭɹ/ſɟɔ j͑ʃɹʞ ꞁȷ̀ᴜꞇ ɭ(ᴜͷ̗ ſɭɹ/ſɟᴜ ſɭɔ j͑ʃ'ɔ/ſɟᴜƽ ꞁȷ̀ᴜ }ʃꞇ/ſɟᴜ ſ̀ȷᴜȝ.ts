// ≺⧼ Storage Utilities ⧽≻

const StorageUtil = {
    /**
     * Get item from localStorage
     * @param {string} key
     * @param {any} defaultValue
     * @returns {any}
     */
    get(key: string, defaultValue: any = null): any {
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
    set(key: string, value: any): void {
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
    remove(key: string): void {
        localStorage.removeItem(key);
    },

    /**
     * Get item from localStorage merged with defaults
     * @param {string} key
     * @param {object} defaults
     * @returns {object}
     */
    loadWithDefaults(key: string, defaults: object): object {
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

// Attach to window for global access - use StorageUtil to avoid conflict with native Storage
(window as any).StorageUtil = StorageUtil;
