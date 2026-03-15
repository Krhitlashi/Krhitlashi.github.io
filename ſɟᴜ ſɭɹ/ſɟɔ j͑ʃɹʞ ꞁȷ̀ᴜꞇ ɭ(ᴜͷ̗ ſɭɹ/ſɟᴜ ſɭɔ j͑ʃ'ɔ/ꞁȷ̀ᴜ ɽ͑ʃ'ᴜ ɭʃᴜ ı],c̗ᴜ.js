// ≺⧼ Notification Manager ⧽≻ - Centralized notification management

class NotificationManager {
    static #dismissed = new Set();
    static #notifications = [...CONSTANTS.NOTIFICATION_DEFAULTS];

    // ⟨ Load Dismissed From Storage ⟩
    static loadFromStorage() {
        const stored = Storage.get(CONSTANTS.STORAGE_KEYS.dismissedNotifs, []);
        stored.forEach(id => this.#dismissed.add(id));
    }

    // ⟨ Save To Storage ⟩
    static saveToStorage() {
        Storage.set(CONSTANTS.STORAGE_KEYS.dismissedNotifs, Array.from(this.#dismissed));
    }

    // ⟨ Add Notification ⟩
    static add(notification) {
        this.#notifications.push(notification);
        this.render();
    }

    // ⟨ Remove Notification ⟩
    static remove(index) {
        this.#notifications.splice(index, 1);
        this.render();
    }

    // ⟨ Dismiss Notification ⟩
    static dismiss(index) {
        this.#dismissed.add(index);
        this.saveToStorage();
        this.render();
    }

    // ⟨ Clear All Notifications ⟩
    static clear() {
        this.#notifications.forEach((_, i) => this.#dismissed.add(i));
        this.saveToStorage();
        this.render();
    }

    // ⟨ Get Active Notifications ⟩
    static getActive() {
        return this.#notifications.filter((_, i) => !this.#dismissed.has(i));
    }

    // ⟨ Get Count ⟩
    static getCount() {
        return this.getActive().length;
    }

    // ⟨ Render Notifications ⟩
    static render() {
        const list = DOMCache.get("notif-list");
        if (!list) return;

        const strings = getStrings();
        const active = this.getActive();
        const countSpan = document.querySelector(".notification-count");

        if (active.length === 0) {
            const noNotifText = strings.notif_none;
            list.innerHTML = `<div>${noNotifText}</div>`;
            if (countSpan) countSpan.innerText = System.toOctalString("0");
            return;
        }

        list.innerHTML = active.map((n, idx) => {
            const origIdx = this.#notifications.indexOf(n);
            const title = strings[n.title];
            const desc = strings[n.desc];
            return `<ciihii class="notif-card">
                <div class="notif-content">
                    <div class="notif-title">${title}</div>
                    <div class="notif-desc">${desc}</div>
                </div>
                <div class="notif-icon">${n.icon}</div>
                <button onclick="NotificationManager.dismiss(${origIdx})" style="margin-inline-start: auto;">/</button>
            </ciihii>`;
        }).join("");

        if (countSpan) countSpan.innerText = System.toOctalString(this.getCount().toString());
    }

    // ⟨ Init ⟩
    static init() {
        this.loadFromStorage();
        this.render();
    }
}
