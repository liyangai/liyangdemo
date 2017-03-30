$(function () {


    function resize() {

        var windowWidth = $(window).width();
        // 是否为小于768的屏幕
        var smallScreen = windowWidth < 768;
        // 轮播图板块适应
        var $itemImages = $('#home_slide .item-image');
        $itemImages.each(function (i, item) {
            var $item = $(item);
            var imgSrc = $item.data(smallScreen ? 'image-small' : 'image-large');
            var imgAlt = $item.data('image-alt');
            $item.html('<img src="' + imgSrc + '" alt="' + imgAlt + '"/>');
            $item.css('backgroundImage', 'url(' + imgSrc + ')');
        });

        // tab栏宽度适应
        var $tabs = $('.nav-tabs');
        $tabs.each(function (i, item) {
            var $tab = $(this);
            var width = 20;
            $tab.children().each(function (ci, citem) {
                width += $(citem).width();
            });
            if (width > $tab.parent().width()) {
                $tab.css('width', width);
                $tabs.parent().css('overflow-x', 'scroll');
            } else {
                $tab.css('width', 'auto');
                $tabs.parent().css('overflow-x', 'hidden');
            }
        });
    }


    $(window).on('resize', resize).trigger('resize');


    $('.news-nav a').click(function (e) {
        e.preventDefault()
        $('.news-title').text($(this).data('title'));

    });


});
