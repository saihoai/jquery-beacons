describe('heartbeat', function () {
    /**
     * This is waiting for fix for setTimeout bug in PhantomJS.
     */
    it('trips 80ms by default', function (done) {
        var then, now, diff, cnt=0;
        $.beacons({
            throttle: 1200
        });
        $help.createDiv('MY04');
        $help.move('#MY04', 2);
        jQuery('#MY04').beacon(function () {
            cnt +=1;
            console.log(cnt);
            if (cnt > 40) done();
            /*if (then) {
                now = Date.now();
                diff = now - then;
                expect(diff).toEqual(80);
                done();
            } else {
                then = Date.now();
            }*/
        });
    });
    it('can handle missing dom elements', function (done) {
        var oldCnt = $help.handlerFor.TST01.calls.count();
        var oldLen = jQuery.beacons('fetch').length;
        jQuery('#TST01').remove();
        expect(jQuery('.testdiv').length).toEqual(2);
        setTimeout(function () {
            var newCnt = $help.handlerFor.TST01.calls.count();
            var newLen = jQuery.beacons('fetch').length;
            expect(newCnt).toEqual(oldCnt);
            expect(newLen).toEqual(oldLen - 1);
            done();
        }, 100);
    });
});
