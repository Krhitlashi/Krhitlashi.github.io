// ≺⧼ Notification Manager ⧽≻ - Centralized notification management

/* eslint-disable @typescript-eslint/no-explicit-any */

declare const CONSTANTS: any;
declare const Storage: any;
declare const DOMCache: any;
declare const getStrings: any;
declare const System: any;

class NotificationManager {
    static #dismissed: Set<any> = new Set();
    static #notifications: any[] = [...CONSTANTS.NOTIFICATION_DEFAULTS];

    // ⟨ Load Dismissed From Storage ⟩
    static loadFromStorage(): void {
        const storage = (window as any).StorageUtil;
        const stored: number[] = storage.get(CONSTANTS.STORAGE_KEYS.dismissedNotifs, []);
        stored.forEach((id: number) => this.#dismissed.add(id));
    }

    // ⟨ Save To Storage ⟩
    static saveToStorage(): void {
        const storage = (window as any).StorageUtil;
        storage.set(CONSTANTS.STORAGE_KEYS.dismissedNotifs, Array.from(this.#dismissed));
    }

    // ⟨ Add Notification ⟩
    static add(notification: any): void {
        this.#notifications.push(notification);
        this.render();
    }

    // ⟨ Remove Notification ⟩
    static remove(index: number): void {
        this.#notifications.splice(index, 1);
        this.render();
    }

    // ⟨ Dismiss Notification ⟩
    static dismiss(index: number): void {
        this.#dismissed.add(index);
        this.saveToStorage();
        this.render();
    }

    // ⟨ Clear All Notifications ⟩
    static clear(): void {
        this.#notifications.forEach((_, i) => this.#dismissed.add(i));
        this.saveToStorage();
        this.render();
    }

    // ⟨ Get Active Notifications ⟩
    static getActive(): any[] {
        return this.#notifications.filter((_, i) => !this.#dismissed.has(i));
    }

    // ⟨ Get Count ⟩
    static getCount(): number {
        return this.getActive().length;
    }

    // ⟨ Render Notifications ⟩
    static render(): void {
        const list = DOMCache.get("notif-list");
        if (!list) return;

        const strings = getStrings();
        const active = this.getActive();
        const countSpan: any = document.querySelector(".notification-count");

        if (active.length === 0) {
            const noNotifText = strings.notif_none;
            list.innerHTML = `<div>${noNotifText}</div>`;
            const system = (window as any).System;
            if (countSpan && system) countSpan.innerText = system.toOctalString("0");
            return;
        }

        list.innerHTML = active.map((n: any, idx: number) => {
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

        const system = (window as any).System;
        if (countSpan && system) countSpan.innerText = system.toOctalString(this.getCount().toString());
    }

    // ⟨ Init ⟩
    static init(): void {
        this.loadFromStorage();
        this.render();
    }
}

// Attach to window for global access
(window as any).NotificationManager = NotificationManager;
