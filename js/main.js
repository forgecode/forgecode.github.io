// typed.js

$(function() {
    $(".element0").typed({
        strings: ["Bake", "Build", "forge code"],
        typeSpeed: 0,
        loop: true,
        typeSpeed: 40,
        // time before typing starts
        startDelay: 0,
        // backspacing speed
        backSpeed: 0,
        // time before backspacing
        backDelay: 800
    });
});


//

(function() {
    $(function() {
        var PROPERTIES = ['translateX', 'translateY', 'opacity', 'rotate', 'scale'],
            $window = $(window),
            $body = $('body'),
            wrappers = [],
            currentWrapper = null,
            scrollTimeoutID = 0,
            bodyHeight = 0,
            windowHeight = 0,
            windowWidth = 0,
            prevKeyframesDurations = 0,
            scrollTop = 0,
            relativeScrollTop = 0,
            currentKeyframe = 0,
            keyframes = [{ 'wrapper': 'header', 'duration': '100%', 'animations': [{ 'selector': 'header', 'scale': .60, 'translateY': -350 }, { 'selector': '.dampen', 'opacity': [0, 1.5] }, { 'selector': '.section-label', 'translateY': -70 }] }]
        init = function() { scrollIntervalID = setInterval(updatePage, 15);
            setupValues(); }
        setupValues = function() { scrollTop = $window.scrollTop();
            windowHeight = $window.height();
            windowWidth = $window.width();
            convertAllPropsToPx();
            buildPage(); }
        buildPage = function() {
            var i, j, k;
            for (i = 0; i < keyframes.length; i++) {
                bodyHeight += keyframes[i].duration;
                if ($.inArray(keyframes[i].wrapper, wrappers) == -1) { wrappers.push(keyframes[i].wrapper); }
                for (j = 0; j < keyframes[i].animations.length; j++) {
                    Object.keys(keyframes[i].animations[j]).forEach(function(key) {
                        value = keyframes[i].animations[j][key];
                        if (key !== 'selector' && value instanceof Array === false) {
                            var valueSet = [];
                            valueSet.push(getDefaultPropertyValue(key), value);
                            value = valueSet; }
                        keyframes[i].animations[j][key] = value;
                    });
                }
            }
            $body.height(bodyHeight);
            $window.scroll(0);
            currentWrapper = wrappers[0];
            $(currentWrapper).show();
        }
        convertAllPropsToPx = function() {
            var i, j, k;
            for (i = 0; i < keyframes.length; i++) {
                keyframes[i].duration = convertPercentToPx(keyframes[i].duration, 'y');
                for (j = 0; j < keyframes[i].animations.length; j++) {
                    Object.keys(keyframes[i].animations[j]).forEach(function(key) {
                        value = keyframes[i].animations[j][key];
                        if (key !== 'selector') {
                            if (value instanceof Array) {
                                for (k = 0; k < value.length; k++) {
                                    if (typeof value[k] === "string") {
                                        if (key === 'translateY') { value[k] = convertPercentToPx(value[k], 'y'); } else { value[k] = convertPercentToPx(value[k], 'x'); } } } } else {
                                if (typeof value === "string") {
                                    if (key === 'translateY') { value = convertPercentToPx(value, 'y'); } else { value = convertPercentToPx(value, 'x'); } } }
                            keyframes[i].animations[j][key] = value;
                        }
                    });
                }
            }
        }
        getDefaultPropertyValue = function(property) {
            switch (property) {
                case 'translateX':
                    return 0;
                case 'translateY':
                    return 0;
                case 'scale':
                    return 1;
                case 'rotate':
                    return 0;
                case 'opacity':
                    return 1;
                default:
                    return null; } }
        updatePage = function() {
            window.requestAnimationFrame(function() {
                setScrollTops();
                if (scrollTop > 0 && scrollTop <= (bodyHeight - windowHeight)) { animateElements();
                    setKeyframe(); } else { animateElements(); }
            });
        }
        setScrollTops = function() { scrollTop = $window.scrollTop();
            relativeScrollTop = scrollTop - prevKeyframesDurations; }
        animateElements = function() {
            var animation, translateY, translateX, scale, rotate, opacity;
            for (var i = 0; i < keyframes[currentKeyframe].animations.length; i++) { animation = keyframes[currentKeyframe].animations[i];
                translateY = calcPropValue(animation, 'translateY');
                translateX = calcPropValue(animation, 'translateX');
                scale = calcPropValue(animation, 'scale');
                rotate = calcPropValue(animation, 'rotate');
                opacity = calcPropValue(animation, 'opacity');
                $(animation.selector).css({ 'transform': 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0) scale(' + scale + ') rotate(' + rotate + 'deg)', 'opacity': opacity }) } }
        calcPropValue = function(animation, property) {
            var value = animation[property];
            if (value) { value = easeInOutQuad(relativeScrollTop, value[0], (value[1] - value[0]), keyframes[currentKeyframe].duration); } else { value = getDefaultPropertyValue(property); }
            return value;
        }
        easeInOutQuad = function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b; };
        setKeyframe = function() {
            if (scrollTop > (keyframes[currentKeyframe].duration + prevKeyframesDurations)) { prevKeyframesDurations += keyframes[currentKeyframe].duration;
                currentKeyframe++;
                showCurrentWrappers(); } else if (scrollTop < prevKeyframesDurations) { currentKeyframe--;
                prevKeyframesDurations -= keyframes[currentKeyframe].duration;
                showCurrentWrappers(); } }
        showCurrentWrappers = function() {
            var i;
            if (keyframes[currentKeyframe].wrapper != currentWrapper) { $(currentWrapper).hide();
                $(keyframes[currentKeyframe].wrapper).show();
                currentWrapper = keyframes[currentKeyframe].wrapper; } }
        convertPercentToPx = function(value, axis) {
            if (typeof value === "string" && value.match(/%/g)) {
                if (axis === 'y') value = (parseFloat(value) / 100) * windowHeight;
                if (axis === 'x') value = (parseFloat(value) / 100) * windowWidth;
            }
            return value;
        }
        init();
    })
}).call(this);
$(document).on('click', '#lm', function(event) { event.preventDefault();
    var target = "#section-content";
    $('html, body').animate({ scrollTop: $(target).offset().top - 70 }, 1000); });

function toggle() {
    var m = document.getElementById("monthly");
    var a = document.getElementById("annual");
    var mm = document.getElementById("monthly-btn");
    var aa = document.getElementById("annual-btn");
    if (m.style.display == "block") { m.style.display = "none";
        a.style.display = "block";
        mm.className -= " active-period";
        aa.className += " active-period"; } else { m.style.display = "block";
        a.style.display = "none";
        mm.className += " active-period";
        aa.className -= " active-period"; }
}

function toggledd1() {
    var dd = document.getElementById("dd1");
    if (dd.style.display == "none") { dd.style.display = "block"; } else { dd.style.display = "none"; }
}

function toggledd2() {
    var dd = document.getElementById("dd2");
    if (dd.style.display == "none") { dd.style.display = "block"; } else { dd.style.display = "none"; }
}
