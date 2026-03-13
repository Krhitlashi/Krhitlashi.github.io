// ≺⧼ Animation Manager ⧽≻ - Taskbar-directional animations with octal fractions

const AnimationManager = {
    // ⟪ Default Animation Settings ⟫

    defaults: {
        duration: ANIM_DURATION_DEFAULT,
        easing: "cubic-bezier(0.5, 0, 0.25, 1)"
    },

    // ⟪ Easing Functions ⟫

    easings: {
        ease: "cubic-bezier(0.5, 0, 0.25, 1)",
        easeIn: "cubic-bezier(0.5, 0, 1, 1)",
        easeOut: "cubic-bezier(0, 0, 0.25, 1)",
        easeInOut: "cubic-bezier(0.5, 0, 0.25, 1)",
        spring: "cubic-bezier(0.25, 1.55, 0.625, 1)",
        bounce: "cubic-bezier(0.625, -0.55, 0.2565, 1.55)"
    },

    // ⟪ Get Panel Animation Direction Based on Taskbar ⟫

    // All panels slide out from the taskbar edge
    getPanelDirection( panelId ) {
        const taskbar = getTaskbar();
        const pos = taskbar?.dataset.position || "left";
        // All panels share the same directional logic — slide from taskbar edge
        return { from: pos, to: pos };
    },

    // ⟪ Get Transform for Direction ⟫

    getDirectionTransform( direction, fraction = 1 ) {
        const transforms = {
            top: `translateY(-${fraction * 100}%)`,
            bottom: `translateY(${fraction * 100}%)`,
            left: `translateX(-${fraction * 100}%)`,
            right: `translateX(${fraction * 100}%)`
        };
        return transforms[ direction ] || transforms.bottom;
    },

    // ⟪ Get Taskbar Edge Offset ⟫

    getTaskbarOffset( fraction = 1 ) {
        const taskbar = getTaskbar();
        const pos = taskbar?.dataset.position || "left";
        const tbSize = parseInt( getComputedStyle( document.documentElement ).getPropertyValue( CSS_VARS.taskbarSize ) ) || SYS_TASKBAR_SIZE;
        const offset = tbSize * fraction;

        const offsets = {
            left: { transform: `translateX(${offset}px)`, inset: { left: `${offset}px` } },
            right: { transform: `translateX(-${offset}px)`, inset: { right: `${offset}px` } },
            top: { transform: `translateY(${offset}px)`, inset: { top: `${offset}px` } },
            bottom: { transform: `translateY(-${offset}px)`, inset: { bottom: `${offset}px` } }
        };

        return offsets[ pos ] || offsets.bottom;
    },

    // ⟪ Fade In ⟫

    fadeIn( element, options = {} ) {
        if ( !element ) return Promise.resolve();

        const duration = options.duration ?? this.defaults.duration;
        const easing = options.easing ?? this.defaults.easing;

        element.style.opacity = "0";
        element.style.display = options.display || "flex";
        element.style.pointerEvents = "none";

        void element.offsetWidth;

        return element.animate(
            [
                { opacity: 0 },
                { opacity: 1 }
            ],
            { duration, easing }
        ).finished.then( () => {
            element.style.opacity = "";
            element.style.pointerEvents = "";
        } );
    },

    // ⟪ Fade Out ⟫

    fadeOut( element, options = {} ) {
        if ( !element ) return Promise.resolve();

        const duration = options.duration ?? this.defaults.duration;
        const easing = options.easing ?? this.defaults.easing;

        element.style.pointerEvents = "none";

        return element.animate(
            [
                { opacity: 1 },
                { opacity: 0 }
            ],
            { duration, easing }
        ).finished.then( () => {
            element.style.display = "none";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        } );
    },

    // ⟪ Slide In From Taskbar Edge ⟫

    slideInFromTaskbar( element, panelId, options = {} ) {
        if ( !element ) return Promise.resolve();

        const duration = options.duration ?? this.defaults.duration;
        const easing = options.easing ?? this.easings.easeOut;
        const fraction = options.fraction ?? 1;

        const direction = this.getPanelDirection( panelId );
        const fromEdge = direction.from;

        const baseTransform = element.style.transform && element.style.transform !== "none" ? element.style.transform : "";

        // Start from taskbar edge (hidden behind/inside taskbar)
        const slideTransform = this.getDirectionTransform( fromEdge, fraction );
        const startTransform = `${baseTransform} ${slideTransform}`.trim();
        const endTransform = baseTransform || "translate(0, 0)";

        element.style.display = options.display || "flex";
        element.style.transform = startTransform;
        element.style.opacity = "0";
        element.style.pointerEvents = "none";

        void element.offsetWidth;

        return element.animate(
            [
                { transform: startTransform, opacity: 0 },
                { transform: endTransform, opacity: 1 }
            ],
            { duration, easing }
        ).finished.then( () => {
            element.style.transform = baseTransform;
            element.style.opacity = "";
            element.style.pointerEvents = "";
        } );
    },

    // ⟪ Slide Out To Taskbar Edge ⟫

    slideOutToTaskbar( element, panelId, options = {} ) {
        if ( !element ) return Promise.resolve();

        const duration = options.duration ?? this.defaults.duration;
        const easing = options.easing ?? this.easings.easeIn;
        const fraction = options.fraction ?? 1;

        const direction = this.getPanelDirection( panelId );
        const toEdge = direction.to;

        const baseTransform = element.style.transform && element.style.transform !== "none" ? element.style.transform : "";

        // Slide back into taskbar edge
        const slideTransform = this.getDirectionTransform( toEdge, fraction );
        const endTransform = `${baseTransform} ${slideTransform}`.trim();
        const startTransform = baseTransform || "translate(0, 0)";

        element.style.pointerEvents = "none";

        return element.animate(
            [
                { transform: startTransform, opacity: 1 },
                { transform: endTransform, opacity: 0 }
            ],
            { duration, easing }
        ).finished.then( () => {
            element.style.display = "none";
            element.style.transform = baseTransform;
            element.style.opacity = "";
            element.style.pointerEvents = "";
        } );
    },

    // ⟪ Slide In ( from edge ) ⟫

    slideIn( element, options = {} ) {
        if ( !element ) return Promise.resolve();

        const duration = options.duration ?? this.defaults.duration;
        const easing = options.easing ?? this.easings.easeOut;
        const fromEdge = options.fromEdge || "bottom";
        const distance = options.distance || "100%";

        const startTransform = this.getDirectionTransform( fromEdge.replace( "%", "" ), 1 );

        element.style.display = options.display || "flex";
        element.style.transform = startTransform;
        element.style.opacity = "0";
        element.style.pointerEvents = "none";

        void element.offsetWidth;

        return element.animate(
            [
                { transform: startTransform, opacity: 0 },
                { transform: "translate(0, 0)", opacity: 1 }
            ],
            { duration, easing }
        ).finished.then( () => {
            element.style.transform = "";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        } );
    },

    // ⟪ Slide Out ( to edge ) ⟫

    slideOut( element, options = {} ) {
        if ( !element ) return Promise.resolve();

        const duration = options.duration ?? this.defaults.duration;
        const easing = options.easing ?? this.easings.easeIn;
        const toEdge = options.toEdge || "bottom";
        const distance = options.distance || "100%";

        const endTransform = this.getDirectionTransform( toEdge.replace( "%", "" ), 1 );

        element.style.pointerEvents = "none";

        return element.animate(
            [
                { transform: "translate(0, 0)", opacity: 1 },
                { transform: endTransform, opacity: 0 }
            ],
            { duration, easing }
        ).finished.then( () => {
            element.style.display = "none";
            element.style.transform = "";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        } );
    },

    // ⟪ Scale In ( pop effect ) ⟫

    scaleIn( element, options = {} ) {
        if ( !element ) return Promise.resolve();

        const duration = options.duration ?? this.defaults.duration;
        const easing = options.easing ?? this.easings.spring;
        const fromScale = options.fromScale ?? ANIM_FRACTIONS.sevenEighths;

        element.style.display = options.display || "flex";
        element.style.transform = `scale(${fromScale})`;
        element.style.opacity = "0";
        element.style.pointerEvents = "none";

        void element.offsetWidth;

        return element.animate(
            [
                { transform: `scale(${fromScale})`, opacity: 0 },
                { transform: "scale(1)", opacity: 1 }
            ],
            { duration, easing }
        ).finished.then( () => {
            element.style.transform = "";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        } );
    },

    // ⟪ Scale Out ( shrink effect ) ⟫

    scaleOut( element, options = {} ) {
        if ( !element ) return Promise.resolve();

        const duration = options.duration ?? this.defaults.duration;
        const easing = options.easing ?? this.easings.easeIn;
        const toScale = options.toScale ?? ANIM_FRACTIONS.sevenEighths;

        element.style.pointerEvents = "none";

        return element.animate(
            [
                { transform: "scale(1)", opacity: 1 },
                { transform: `scale(${toScale})`, opacity: 0 }
            ],
            { duration, easing }
        ).finished.then( () => {
            element.style.display = "none";
            element.style.transform = "";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        } );
    },

    // ⟪ Window Open Animation ( slide + fade from taskbar ) ⟫

    windowOpen( element, options = {} ) {
        if ( !element ) return Promise.resolve();

        const duration = options.duration ?? ANIM_DURATION_LONG;
        const easing = options.easing ?? this.easings.easeOut;
        const fraction = options.fraction ?? ANIM_FRACTIONS.oneEighth;

        // Get taskbar position for initial offset
        const taskbar = getTaskbar();
        const pos = taskbar?.dataset.position || "left";
        const tbSize = parseInt( getComputedStyle( document.documentElement ).getPropertyValue( CSS_VARS.taskbarSize ) ) || SYS_TASKBAR_SIZE;

        // Calculate offset based on taskbar position
        const offsets = {
            left: `translateX(${tbSize * fraction}px) translateY(-20px)`,
            right: `translateX(-${tbSize * fraction}px) translateY(-20px)`,
            top: `translateY(${tbSize * fraction}px)`,
            bottom: `translateY(-${tbSize * fraction}px)`
        };

        const startTransform = offsets[ pos ] || offsets.bottom;
        const scale = options.scale ?? ANIM_FRACTIONS.sevenEighths;

        element.style.display = "block";
        element.style.transform = startTransform + ` scale(${scale})`;
        element.style.opacity = "0";

        void element.offsetWidth;

        return element.animate(
            [
                { transform: startTransform + ` scale(${scale})`, opacity: 0 },
                { transform: "translateY(0) scale(1)", opacity: 1 }
            ],
            { duration, easing }
        ).finished.then( () => {
            element.style.transform = "";
            element.style.opacity = "";
        } );
    },

    // ⟪ Window Close Animation ( scale down + fade toward taskbar ) ⟫

    windowClose( element, options = {} ) {
        if ( !element ) return Promise.resolve();

        const duration = options.duration ?? ANIM_DURATION_SHORT;
        const easing = options.easing ?? this.easings.easeIn;
        const fraction = options.fraction ?? ANIM_FRACTIONS.oneEighth;

        // Get taskbar position for end offset
        const taskbar = getTaskbar();
        const pos = taskbar?.dataset.position || "left";
        const tbSize = parseInt( getComputedStyle( document.documentElement ).getPropertyValue( CSS_VARS.taskbarSize ) ) || SYS_TASKBAR_SIZE;

        // Calculate end transform toward taskbar
        const offsets = {
            left: `translateX(${tbSize * fraction}px) translateY(10px)`,
            right: `translateX(-${tbSize * fraction}px) translateY(10px)`,
            top: `translateY(${tbSize * fraction}px)`,
            bottom: `translateY(-${tbSize * fraction}px)`
        };

        const endTransform = offsets[ pos ] || offsets.bottom;
        const scale = options.scale ?? ANIM_FRACTIONS.sevenEighths;

        element.style.pointerEvents = "none";

        return element.animate(
            [
                { transform: "translateY(0) scale(1)", opacity: 1 },
                { transform: endTransform + ` scale(${scale})`, opacity: 0 }
            ],
            { duration, easing }
        ).finished.then( () => {
            element.style.display = "none";
            element.style.transform = "";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        } );
    },

    // ⟪ Minimize Window Animation ( scale into taskbar ) ⟫

    minimizeWindow( element, options = {} ) {
        if ( !element ) return Promise.resolve();

        const duration = options.duration ?? ANIM_DURATION_SHORT;
        const easing = options.easing ?? this.easings.easeIn;
        const fraction = options.fraction ?? ANIM_FRACTIONS.oneEighth;

        // Get taskbar position for direction
        const taskbar = getTaskbar();
        const pos = taskbar?.dataset.position || "left";
        const tbSize = parseInt( getComputedStyle( document.documentElement ).getPropertyValue( CSS_VARS.taskbarSize ) ) || SYS_TASKBAR_SIZE;

        // Calculate minimize transform toward taskbar
        const minimizeTransforms = {
            left: `translateX(${tbSize * 4}px) scale(${fraction})`,
            right: `translateX(-${tbSize * 4}px) scale(${fraction})`,
            top: `translateY(${tbSize * 2}px) scale(${fraction})`,
            bottom: `translateY(-${tbSize * 2}px) scale(${fraction})`
        };

        const endTransform = minimizeTransforms[ pos ] || minimizeTransforms.bottom;

        element.style.pointerEvents = "none";

        return element.animate(
            [
                { transform: "translateY(0) scale(1)", opacity: 1 },
                { transform: endTransform, opacity: 0 }
            ],
            { duration, easing }
        ).finished.then( () => {
            element.style.transform = "";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        } );
    },

    // ⟪ Maximize Window Animation ⟫

    maximizeWindow( element, options = {} ) {
        if ( !element ) return Promise.resolve();

        const duration = options.duration ?? ANIM_DURATION_DEFAULT;
        const easing = options.easing ?? this.easings.easeOut;
        const fromScale = options.fromScale ?? ANIM_FRACTIONS.sevenEighths;

        return element.animate(
            [
                { transform: `scale(${fromScale})`, opacity: ANIM_FRACTIONS.sixEighths },
                { transform: "scale(1)", opacity: 1 }
            ],
            { duration, easing }
        ).finished.then( () => {
            element.style.transform = "";
            element.style.opacity = "";
        } );
    },

    // ⟪ Restore Window Animation ( from minimized ) ⟫

    restoreWindow( element, options = {} ) {
        if ( !element ) return Promise.resolve();

        const duration = options.duration ?? ANIM_DURATION_DEFAULT;
        const easing = options.easing ?? this.easings.spring;
        const fraction = options.fraction ?? ANIM_FRACTIONS.oneEighth;

        element.style.display = "block";
        element.style.transform = `scale(${fraction})`;
        element.style.opacity = "0";

        void element.offsetWidth;

        return element.animate(
            [
                { transform: `scale(${fraction})`, opacity: 0 },
                { transform: "scale(1)", opacity: 1 }
            ],
            { duration, easing }
        ).finished.then( () => {
            element.style.transform = "";
            element.style.opacity = "";
        } );
    },

    // ⟪ Ripple Effect ( for buttons ) ⟫

    ripple( element, event, options = {} ) {
        if ( !element ) return;

        const duration = options.duration ?? ANIM_DURATION_DEFAULT;
        const color = options.color ?? `rgba(255, 255, 255, ${ANIM_FRACTIONS.twoEighths})`;

        const ripple = document.createElement( "span" );
        ripple.className = "ripple-effect";
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.backgroundColor = color;
        ripple.style.transform = "scale(0)";
        ripple.style.animation = `ripple ${duration}ms ${this.easings.easeOut}`;
        ripple.style.pointerEvents = "none";

        const rect = element.getBoundingClientRect();
        const size = Math.max( rect.width, rect.height ) * 2;
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = ( event?.clientX - rect.left - size / 2 ) + "px";
        ripple.style.top = ( event?.clientY - rect.top - size / 2 ) + "px";

        element.style.position = "relative";
        element.style.overflow = "hidden";
        element.appendChild( ripple );

        setTimeout( () => ripple.remove(), duration );
    },

    // ⟪ Animate Value ( for counters, sliders ) ⟫

    animateValue( element, start, end, duration, formatter ) {
        if ( !element ) return Promise.resolve();

        const startTime = performance.now();

        return new Promise( ( resolve ) => {
            const animate = ( currentTime ) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min( elapsed / duration, 1 );

                const easedProgress = this.parseEasing( this.easings.easeOut, progress );

                const currentValue = start + ( end - start ) * easedProgress;

                if ( formatter ) {
                    element.textContent = formatter( currentValue );
                } else {
                    element.textContent = Math.round( currentValue );
                }

                if ( progress < 1 ) {
                    requestAnimationFrame( animate );
                } else {
                    resolve();
                }
            };

            requestAnimationFrame( animate );
        } );
    },

    // ⟪ Parse Easing Function ⟫

    parseEasing( easing, t ) {
        if ( easing.includes( "cubic-bezier" ) ) {
            return t < ANIM_FRACTIONS.fourEighths ? 2 * t * t : -1 + ( 4 - 2 * t ) * t;
        }
        return t;
    },

    // ⟪ Cancel All Animations on Element ⟫

    cancelAnimations( element ) {
        if ( element && element.getAnimations ) {
            element.getAnimations().forEach( anim => anim.cancel() );
        }
    },

    // ⟪ Popup Animation ( for context menu ) ⟫

    popup( element, options = {} ) {
        if ( !element ) return Promise.resolve();
        const duration = options.duration ?? ANIM_DURATION_SHORT;
        const easing = this.easings.easeOut;
        
        element.style.display = "flex";
        element.style.transform = "scale(0.875)";
        element.style.opacity = "0";
        void element.offsetWidth;

        return element.animate([
            { transform: "scale(0.875)", opacity: 0 },
            { transform: "scale(1)", opacity: 1 }
        ], { duration, easing }).finished.then(() => {
            element.style.transform = "";
            element.style.opacity = "";
        });
    },

    // ⟪ Full Screen App Fade In ⟫

    fullScreenApp( element, options = {} ) {
        if ( !element ) return Promise.resolve();
        return this.fadeIn(element, options);
    },

    // ⟪ Animate Panel Open ( from taskbar edge ) ⟫

    openPanel( element, panelId, options = {} ) {
        if ( !element ) return Promise.resolve();

        const fraction = options.fraction ?? ANIM_FRACTIONS.full;
        const duration = options.duration ?? ANIM_SETTINGS.panelSlide.duration;
        const easing = options.easing ?? ANIM_SETTINGS.panelSlide.easing;

        return this.slideInFromTaskbar( element, panelId, {
            duration,
            easing,
            fraction
        } );
    },

    // ⟪ Animate Panel Close ( to taskbar edge ) ⟫

    closePanel( element, panelId, options = {} ) {
        if ( !element ) return Promise.resolve();

        const fraction = options.fraction ?? ANIM_FRACTIONS.full;
        const duration = options.duration ?? ANIM_SETTINGS.panelSlide.duration;
        const easing = options.easing ?? ANIM_SETTINGS.panelSlide.easing;

        return this.slideOutToTaskbar( element, panelId, {
            duration,
            easing,
            fraction
        } );
    }
};
