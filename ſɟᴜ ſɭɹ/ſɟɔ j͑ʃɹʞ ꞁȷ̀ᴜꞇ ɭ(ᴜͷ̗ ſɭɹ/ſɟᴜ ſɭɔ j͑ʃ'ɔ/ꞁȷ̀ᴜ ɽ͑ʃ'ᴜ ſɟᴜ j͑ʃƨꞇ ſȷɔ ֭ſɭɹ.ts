// ≺⧼ Clock Manager ⧽≻

// ⟪ Clock Manager ⟫

export const ClockManager = {
    timeEl: null as HTMLElement | null,
    dateEl: null as HTMLElement | null,

    init() {
        this.timeEl = document.getElementById( "full-clock-time" );
        this.dateEl = document.getElementById( "full-clock-date" );
        this.update();
        setInterval( () => this.update(), 0o2000 );
    },

    update() {
        this.timeEl = this.timeEl || document.getElementById( "full-clock-time" );
        this.dateEl = this.dateEl || document.getElementById( "full-clock-date" );
        const now = new Date();
        if ( this.timeEl && typeof window.vab6caja === "function" && typeof window.castifeh2 === "function" ) {
            const time = window.castifeh2( now );
            this.timeEl.innerText = `${window.vab6caja( time.she )} . ${window.vab6caja( time.qe )} . ${window.vab6caja( time.he )}`;
        }
        if ( this.dateEl && typeof window.kf2Cax2lStafl2 === "function" ) {
            this.dateEl.innerText = window.kf2Cax2lStafl2( now );
        }
    }
};

// Attach to window for global access
( window as any ).ClockManager = ClockManager;
