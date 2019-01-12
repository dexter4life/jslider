(function ($) {
    'use strict'

    if ($ === undefined) {
        return;
    }

    function createLeftRightBtn($item) {
        var leftBtn = document.createElement("button"),
            rightBtn = document.createElement("button");
        leftBtn.innerHTML = "&#8592;";
        rightBtn.innerHTML = "&#8594;";
        $item.before().append(leftBtn);
        $item.after().append(rightBtn);
        return {
            leftBtn,
            rightBtn
        };
    }

    var defaultConfig = {
        itemsVisible: 5
    };

    function cloneObject(object) {
        var objectClone = {};
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                objectClone[prop] = object[prop];
            }
        }
        return objectClone;
    }

    $.fn.listSlider = function (param) {
        var config = {};

        //create new elements button
        if (param === undefined || param == null) {
            config = cloneObject(defaultConfig);
        } else {
            config = cloneObject(param);
        }

        $(this).each(function (number, target) {
            var $target = $(target);

            var $listSlider = $target.find('.list-slider');
            
            $listSlider.each(function (number, elem) {
                var $elem = $(elem);
                // var containerWidth = $elem.width();
                var $listSliderBody = $elem.find('.list-slider-body');
                var hiddenItemStack = [];
            
                $listSliderBody.each(function (number, element) {
                    //last active item or clicked item
                    var $lastClickItem = undefined;

                    var $items = $elem.find('.item');
                    var itemHeight = $items.eq(0).height();
                    $elem.height(itemHeight);

                    $items.each(function (num, element) {
                        var $item = $(element);

                         //hide items above itemsVisible
                        if (num+1 > config.itemsVisible) {
                            $item.hide();
                            hiddenItemStack.unshift($item);
                        }
                        
                        var onClicked = function (event) {
                            var x = event.offsetX,
                                y = event.offsetY,
                                width = event.target.width,
                                height = event.target.height;

                            if (x <= width && y <= height) {
                                var $_this = $(this);
                                if ($lastClickItem === undefined) {
                                    $lastClickItem = $_this;
                                }
                                if (!$_this.hasClass('active') &&
                                    $lastClickItem !== $_this) {
                                    if ($lastClickItem.hasClass('active')) {
                                        $lastClickItem.removeClass('active');
                                        hideArrows($lastClickItem);
                                    }

                                    $_this.addClass('active');
                                    // $_this.appendTo($target);
                                    showArrows($_this);
                                    $lastClickItem = $_this;
                                } else {
                                    $_this.removeClass('active')
                                    hideArrows($_this);
                                }
                            }
                            // console.log(hiddenItemStack.shift());
                            
                        };

                        //create new elements button
                        var {
                            leftBtn,
                            rightBtn
                        } = createLeftRightBtn($item);
                        
                        //style arrows
                        $(leftBtn).css({
                            'position': 'absolute',
                            'border': 'none',
                            'bottom': '-5px',
                            'left': '-30px',
                            'background-color': 'none',
                            'background-color': 'transparent',
                            'display': 'none'
                        })

                        $(rightBtn).css({
                            'position': 'absolute',
                            'border': 'none',
                            'bottom': '-5px',
                            'right': '-30px',
                            'background-color': 'transparent',
                            'display': 'none'
                        }); 
                    
                        //left button when clicked
                        var onLeftBtnClicked = function () {
                            if ($lastClickItem !== undefined &&
                                $lastClickItem.hasClass('active')) {

                                var $prev = $lastClickItem.prev();
                                var $next = $lastClickItem.next();
                                var $last = items.last();
                                var $first = $items.first();
                                
                                var firstPos = $items.index($first);
                                var prevPos = $items.index($prev);
                                var nextPos = $items.index($next);
                                var lastPos = $items.index($last);
                                var targetPos = $items.index($lastClickItem);
                                var $targetClone = $lastClickItem.clone();

                                $targetClone.removeClass('active');

                                if (prevPos == firstPos) {
                                    $first.replaceWith($targetClone);
                                    var $firstClone = $first.clone();
                                    var $nextContent = $next.find(':first-child').clone();
                                    $lastClickItem.find(':first-child').replaceWith($nextContent);
                                    $next.remove();
                                    $firstClone.insertAfter($last);
                                    attachBtnEvent($firstClone);
                                } else if (nextPos == lastPos) {
                                    $targetClone.insertAfter($prev);
                                    var $firstClone = $first.clone();
                                    var $nextContent = $next.find(':first-child').clone();
                                    $lastClickItem.find(':first-child').replaceWith($nextContent);
                                    $last.replaceWith($firstClone);
                                    $first.remove();
                                    attachBtnEvent($firstClone);
                                } else if (targetPos == firstPos) {
                                    //first item when selected
                                    var $nextContent = $next.find(':first-child').clone();
                                    $lastClickItem.find(':first-child').replaceWith($nextContent);
                                    $next.remove();
                                    $targetClone.insertAfter($last);
                                    $targetClone.off('click').on('click', onClicked);
                                } else if (targetPos == lastPos) {
                                    var $firstContent = $first.find(':first-child').clone();
                                    $lastClickItem.find(':first-child').replaceWith($firstContent);
                                    $first.remove();
                                    $targetClone.insertAfter($prev);
                                    $targetClone.off('click').on('click', onClicked);
                                } else {
                                    var $lastContent = $next.find(':first-child').clone();
                                    $lastClickItem.find(':first-child').replaceWith($lastContent);
                                    $next.remove();
                                    var $firstClone = $first.clone();
                                    $first.remove();
                                    $firstClone.insertAfter($last);
                                    $targetClone.insertAfter($prev);
                                    $targetClone.off('click').on('click', onClicked);
                                    $firstClone.off('click').on('click', onClicked);
                                    attachBtnEvent($firstClone);
                                }

                                //register left button event
                                attachBtnEvent($targetClone);

                                hideArrows($targetClone);
                                $items = $elem.find('.item');
                            }
                        }
                        //right button when clicked
                        var onRightBtnClicked = function () {
                            if ($lastClickItem !== undefined &&
                                $lastClickItem.hasClass('active')) {

                                var $prev = $lastClickItem.prev();
                                var $next = $lastClickItem.next();
                                var $last = $items.last();
                                var $first = $items.first();

                                var firstPos = $items.index($first);
                                var prevPos = $items.index($prev);
                                var nextPos = $items.index($next);
                                var lastPos = $items.index($last);
                                var targetPos = $items.index($lastClickItem);
                                var $targetClone = $lastClickItem.clone();

                                $targetClone.removeClass('active');

                                if (prevPos == firstPos) {
                                    var $lastClone = $last.clone();
                                    attachBtnEvent($lastClone);
                                    $last.remove();
                                    var $lastContent = $prev.find(':first-child').clone();
                                    $prev.replaceWith($lastClone);
                                    $lastClickItem.find(':first-child').replaceWith($lastContent);
                                    $targetClone.insertAfter($lastClickItem);
                                } else if (nextPos == lastPos) {
                                    var $prevContent = $prev.find(':first-child').clone();
                                    $prev.remove();
                                    $lastClickItem.find(':first-child').replaceWith($prevContent);
                                    var $lastClone = $next.clone();
                                    attachBtnEvent($lastClone);

                                    $next.replaceWith($targetClone);
                                    $lastClone.insertBefore($first);
                                } else if (targetPos == firstPos) {
                                    //first item when selected
                                    var $lastContent = $last.find(':first-child').clone();
                                    $last.remove();
                                    $targetClone.insertBefore($first.next());
                                    $lastClickItem.find(':first-child').replaceWith($lastContent);
                                    $targetClone.off('click').on('click', onClicked);

                                } else if (targetPos == lastPos) {
                                    var $lastContent = $prev.find(':first-child').clone();
                                    $prev.remove();
                                    $targetClone.removeClass('active');
                                    $targetClone.insertBefore($first);
                                    $lastClickItem.find(':first-child').replaceWith($lastContent);
                                    $targetClone.off('click').on('click', onClicked);

                                } else {
                                    var $lastContent = $prev.find(':first-child').clone();
                                    $prev.remove();
                                    $lastClickItem.find(':first-child').replaceWith($lastContent);
                                    var $lastClone = $last.clone();
                                    $last.remove();
                                    $lastClone.insertBefore($first);
                                    $targetClone.insertBefore($next);
                                    $targetClone.off('click').on('click', onClicked);
                                    $lastClone.off('click').on('click', onClicked);
                                    attachBtnEvent($lastClone);
                                }

                                //register left button event
                                attachBtnEvent($targetClone);

                                hideArrows($targetClone);
                                $items = $elem.find('.item');
                            }
                        }

                        //left button push
                        $(leftBtn).off('click').on('click', onLeftBtnClicked);

                        //end left button push
                        $(rightBtn).off('click').on('click', onRightBtnClicked);

                        $item.off('click').on('click', onClicked);

                        //display arrows when activated
                        function showArrows($target) {
                            $target.find('button').each(function (number, elem) {
                                $(elem).show(200);
                            });
                        }
                        //hide arrows when activated
                        function hideArrows($target) {
                            $target.find('button').each(function (number, elem) {
                                $(elem).hide();
                            })
                        }

                        function attachBtnEvent($target) {
                            //register left button event
                            $target.find('button').eq(0).off('click').on('click', onLeftBtnClicked);
                            $target.find('button').eq(1).off('click').on('click', onRightBtnClicked);
                            $target.off('click').on('click', onClicked);
                        }
                    });

                });
            });
        });
    }
})(jQuery);