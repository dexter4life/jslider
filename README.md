Welcome to the jslider wiki!

HOW TO USE jSLIDER.

**Basic usage:**

1. Include the latest jQuery and jQuery jSlider plugin on your page.

`<script src="js/jquery.min.js"></script>`
`<script src="js/slider.min.js"></script>`

2.Include the jSlider CSS file

`<link rel="stylesheet" href="css/jslider.css">`

3.The required Markup structure 

`<div class="list-container container" id="sliderbox">`
        `<div class="list-slider">`
            `<div class="list-slider-body">`
                `<div class="item">`
                    `<img src="img/sliderImg/home1.jpg" width="100%" height="100%">`
                `</div>`
                `<div class="item">`
                    `<img src="img/sliderImg/home2.jpg" width="100%" height="100%">`
                `</div>`
                `<div class="item">`
                    `<img src="img/sliderImg/home3.jpg" width="100%" height="100%">`
                `</div>`
                `<div class="item">`
                    `<img src="img/sliderImg/home4.jpg" width="100%" height="100%">`
                `</div>`
                `<div class="item">`
                    `<img src="img/sliderImg/home5.jpg" width="100%" height="100%">`
                `</div>`
                `<div class="item">`
                    `<img src="img/sliderImg/home6.jpg" width="100%" height="100%">`
                `</div>`
                `<div class="item">`
                    `<img src="img/sliderImg/home7.jpg" width="100%" height="100%">`
                `</div>`
                `<div class="item">`
                    `<img src="img/sliderImg/home8.jpg" width="100%" height="100%">`
                `</div>`
                `<div class="item">`
                    `<img src="img/sliderImg/home9.jpg" width="100%" height="100%">`
                `</div>`
                `<div class="item">`
                    `<img src="img/sliderImg/home10.jpg" width="100%" height="100%">`
                `</div>`
                `<div class="item">`
                    `<img src="img/sliderImg/home11.jpg" width="100%" height="100%">`
                `</div>`
            `</div>`
        `</div>`
    `</div>`
Note that class Item can contain any other type of elements or tags other than img tags.

4.  The javascript to activate the plugin.

`(function ($) { `
    `$(".list-container").dexSlider({`
        `itemsVisible: 6,`
        `animationDuration: 'slow',`
        `animationType: 'none',`
        `play: true,`
        `playDirection: 'right',`
        `playSpeed: 3000`
    `});`
`})(jQuery);`

