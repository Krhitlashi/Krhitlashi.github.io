// ≺⧼ Clock Manager ⧽≻

declare const vab6caja: any;
declare const castifeh2: any;
declare const kf2Cax2lStafl2: any;

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
        if ( this.timeEl && typeof vab6caja === "function" && typeof castifeh2 === "function" ) {
            const time = castifeh2( now );
            this.timeEl.innerText = `${vab6caja( time.she )} . ${vab6caja( time.qe )} . ${vab6caja( time.he )}`;
        }
        if ( this.dateEl && typeof kf2Cax2lStafl2 === "function" ) {
            this.dateEl.innerText = kf2Cax2lStafl2( now );
        }
    }
};

// Attach to window for global access
( window as any ).ClockManager = ClockManager;
