$(function() {

    $(".slideshow").slideShow({
        imgPaths: ["./img/slide-1.jpg", "./img/slide-2.jpg", "./img/slide-3.jpg", "./img/slide-4.jpg"],
        alt: "click",
        width: 80, // 0 ~ 100 %
        height: 465,
        interval: 2000,
        duration: 500,
        easing: "easeInOutExpo"
    });
});


//使用json物件寫入
(function($) {
    $.fn.slideShow = function(options) {
        var imgCount = options.imgPaths.length;

        return this.each(function() {
            var $this = $(this);
            //初始元素
            init();

            var $slideGroup = $this.find(".slideshow-slides"),
                $slides = $slideGroup.find(".slide"),
                $nav = $this.find(".slideshow-nav"),
                $indicator = $this.find(".slideshow-indicator"),
                slideCount = $slides.length,
                currentIndex = 0,
                interval = options.interval, //自動切換的時間
                indicatorHTML = "", //indicator的小圓點HTML內容
                duration = options.duration, //效果的時間
                easing = options.easing, //jQuery animation的動畫函數
                timer;

            function init() {
                //建立圖片DIV
                var $slideShowDiv = $("<div>", {
                    class: "slideshow-slides"
                });

                //建立左右箭頭DIV
                $slideShowNavDiv = $("<div>", {
                    class: "slideshow-nav"
                });

                //建立小圓點DIV
                $slideShowIndicatorDiv = $("<div>", {
                    class: "slideshow-indicator"
                });

                for (var i in options.imgPaths) {
                    //建立圖片連結
                    var $a = $("<a>", {
                        href: "#",
                        class: "slide",
                        id: "slide-" + i
                    });

                    //建立img元素
                    var $img = $("<img>", {
                        src: options.imgPaths[i],
                        alt: options.alt,
                        width: options.width + "%",
                        height: options.height,
                    });

                    var imgGap = (100 - parseInt(options.width)) / 2;
                    if (imgGap > 0) {
                        $img.css({
                            left: imgGap + "%"
                        });
                    }

                    $a.append($img);
                    $slideShowDiv.append($a);

                    //設定每個圖片連結邊界
                    $a.css({
                        left: 100 * i + "%",
                        margin: "auto"
                    });

                    //建立小圓點
                    var $aIndicator = $("<a>", {
                        href: "#",
                    });
                    $slideShowIndicatorDiv.append($aIndicator);
                }

                $slideShowNavDiv.append($("<a>", {
                    href: "#",
                    class: "prev"
                }));

                $slideShowNavDiv.append($("<a>", {
                    href: "#",
                    class: "next"
                }));

                $this.append($slideShowDiv);
                $this.append($slideShowNavDiv);
                $this.append($slideShowIndicatorDiv);
            }

            //指定index切換到
            function goToSlide(index) {
                //所有元素透過動畫向左移動
                $slideGroup.animate({
                    left: -100 * index + '%'
                }, duration, easing);

                currentIndex = index;
                updateNav();
            }

            function updateNav() {
                var $navPrev = $nav.find(".prev"),
                    $navNext = $nav.find(".next");
                if (currentIndex === 0) {
                    $navPrev.addClass("disabled");
                } else {
                    $navPrev.removeClass("disabled");
                }

                if (currentIndex === slideCount - 1) {
                    $navNext.addClass("disabled");
                } else {
                    $navNext.removeClass("disabled");
                }

                $indicator.find("a").removeClass("active").eq(currentIndex).addClass("active");
            }

            function startTimer() {
                timer = setInterval(function() {
                    var nextIndex = (currentIndex + 1) % slideCount;
                    goToSlide(nextIndex);
                }, interval);
            }

            function stopTimer() {
                clearInterval(timer);
            }

            $this.on({
                mouseenter: stopTimer,
                mouseleave: startTimer
            });

            $nav.on("click", "a", function(e) {
                e.preventDefault(); //取消預設動作 a 的連結
                if ($(this).hasClass("prev")) {
                    goToSlide(currentIndex - 1);
                } else {
                    goToSlide(currentIndex + 1);
                }
            });

            $indicator.on("click", "a", function(e) {
                e.preventDefault(); //取消預設動作 a 的連結
                if (!$(this).hasClass("active")) {
                    goToSlide($(this).index());
                }
            });

            goToSlide(currentIndex);
            startTimer();

        });
    }
})(jQuery);
