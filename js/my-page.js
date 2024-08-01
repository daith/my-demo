var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid transparent}";
    document.body.appendChild(css);
};
document.addEventListener('DOMContentLoaded', function () {
    var flipper1 = document.getElementById('flipper1');
    setInterval(function () {
        flipper1.classList.toggle('flipped-1');
    }, 4000); // 每4秒翻轉一次
});

document.addEventListener('DOMContentLoaded', function() {
    const text = "美顏盛宴嘉年華 - 不只是一場活動，它是一個開始，讓我們一起探索和重申自我價值的重要性。在這裡，我們提供最先進的美容技術和專業建議，讓每一位參與者都能找到屬於自己的美麗之道。從專業的皮膚分析到個性化的護膚方案，每一步都是我們對您的深情款待。";
    const typewriterContainer = document.getElementById('typewriter-text');
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typewriterContainer.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100); // 調整打字速度
        }
    }

    typeWriter();
});
