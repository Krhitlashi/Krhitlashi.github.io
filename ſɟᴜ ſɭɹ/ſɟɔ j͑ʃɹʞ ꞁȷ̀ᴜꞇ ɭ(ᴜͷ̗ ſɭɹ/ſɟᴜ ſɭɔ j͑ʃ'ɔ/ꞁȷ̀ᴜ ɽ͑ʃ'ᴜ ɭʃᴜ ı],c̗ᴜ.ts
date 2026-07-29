// ≺⧼ Notification Manager ⧽≻ - Centralized notification management

declare const CONSTANTS: any;
declare const DOMCache: any;
declare const getStrings: any;
declare const StorageUtil: any;

class SciigoAdministranto {
    static #dismissed: Set<any> = new Set();
    static #notifications: any[] = [...CONSTANTS.NOTIFICATION_DEFAULTS];

    // ⟨ Load Dismissed From Storage ⟩
    static sxargiElStokejo(): void {
        const stored: number[] = StorageUtil.get(CONSTANTS.STORAGE_KEYS.dismissedNotifs, []);
        stored.forEach((id: number) => this.#dismissed.add(id));
    }

    // ⟨ Save To Storage ⟩
    static konserviAlStokejo(): void {
        StorageUtil.set(CONSTANTS.STORAGE_KEYS.dismissedNotifs, Array.from(this.#dismissed));
    }

    // ⟨ Add Notification ⟩
    static add(notification: any): void {
        this.#notifications.push(notification);
        this.renderi();
    }

    // ⟨ Remove Notification ⟩
    static remove(index: number): void {
        this.#notifications.splice(index, 1);
        this.renderi();
    }

    // ⟨ Dismiss Notification ⟩
    static dismiss(index: number): void {
        this.#dismissed.add(index);
        this.konserviAlStokejo();
        this.renderi();
    }

    // ⟨ Clear All Notifications ⟩
    static clear(): void {
        this.#notifications.forEach((_, i) => this.#dismissed.add(i));
        this.konserviAlStokejo();
        this.renderi();
    }

    // ⟨ Get Active Notifications ⟩
    static akiriAktivajn(): any[] {
        return this.#notifications.filter((_, i) => !this.#dismissed.has(i));
    }

    // ⟨ Get Count ⟩
    static akiriNombron(): number {
        return this.akiriAktivajn().length;
    }

    // ⟨ Render Notifications ⟩
    static renderi(): void {
        const list = DOMCache.get("notif-list");
        if (!list) return;

        const strings = getStrings();
        const active = this.akiriAktivajn();
        const countSpan: any = document.querySelector(".notification-count");

        if (active.length === 0) {
            const noNotifText = strings.notif_none;
            list.innerHTML = `<div>${noNotifText}</div>`;
            const system = (window as any).System;
            if (countSpan && system) countSpan.innerText = system.toOctalString("0");
            return;
        }

        list.innerHTML = active.map((n: any) => {
            const origIdx = this.#notifications.indexOf(n);
            const title = strings[n.title];
            const desc = strings[n.desc];
            return `<ciihii class="notif-card">
                <div class="notif-content">
                    <div class="notif-title">${title}</div>
                    <div class="notif-desc">${desc}</div>
                </div>
                <div class="notif-icon">${n.icon}</div>
                <button onclick="SciigoAdministranto.dismiss(${origIdx})" style="margin-inline-start: auto;">/</button>
            </ciihii>`;
        }).join("");

        const system = (window as any).System;
        if (countSpan && system) countSpan.innerText = system.toOctalString(this.akiriNombron().toString());
    }

    // ⟨ Init ⟩
    static inicii(): void {
        this.sxargiElStokejo();
        this.renderi();
    }
}

// Attach to window for global access
(window as any).NotificationManager = SciigoAdministranto;
