// Main loop of the plugin.
var run = function () {
    // Explicitly trip all beacons.
    activateBeacons();
    // Do nothing if already active.
    if (!active) {
        // Pulse on an interval to look for new beacons.
        active = window.setInterval(function () {
            activateBeacons();
            if (!active) {
                window.clearInterval(active);
            }
        }, throttle);
    }
};

var activateBeacons = function () {
    var i, len = beacons.length, el, elRange, cnt;
    for (i = 0; i < len; i += 1) {
        el = beacons[i];
        if (el) {
            //console.log('%s is valid', el.id);
            elRange = (typeof el.jb_range === 'number') ? el.jb_range : range;
            if (el.jb_active && nearViewport(el, elRange)) {
                el.jb_handler();
            }
        } else {
            // Invalid dom element, so remove from system.
            console.log('%s is INvalid', el.id);
            cnt = destroyBeacon(el);
            i -= cnt;
            len -= cnt;
        }
    }
};
