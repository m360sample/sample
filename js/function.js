$(document).ready(function(){
  // マウスオーバー
  $(document).on('mouseover', '.rollover', function(){
    $(this).attr("src",$(this).attr("src").replace("_off.", "_on."));
  });

  $(document).on('mouseout', '.rollover', function(){
    $(this).attr("src",$(this).attr("src").replace("_on.", "_off."));
  });

  $(document).on('mouseover', '.bg_rollover', function(){
    $(this).css("background-image",$(this).css("backgroundImage").replace("_off.", "_on."));
  });

  $(document).on('mouseout', '.bg_rollover', function(){
    $(this).css("background-image",$(this).css("backgroundImage").replace("_on.", "_off."));
  });

  $(document).on('mouseover', '.ro', function(){
    $(this).find('img').attr("src",$(this).find('img').attr("src").replace("_off.", "_on."));
  });

  $(document).on('mouseout', '.ro', function(){
    $(this).find('img').attr("src",$(this).find('img').attr("src").replace("_on.", "_off."));
  });


  // totop
  $(".totop").on('click', function() {
    $('body,html').animate({scrollTop:0}, 400, 'swing');
    return false;
  });

  // ページ内スクロール
  $('a[href^="#"]').click(function () {
    const speed = 600;
    let href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? "html" : href);
    let position = target.offset().top;
    $("body,html").animate({ scrollTop: position }, speed, "swing");
    return false;
  });

  ///modal
  $('.modal-open').each(function() {
    $( this ).on('click', function() {
      y = $(window).scrollTop();
      var target = $(this).data('target');
      var modal = document.getElementById(target);
      $(modal).fadeIn(300);
      $('body').addClass('fixed').css({
          'top' : y * -1
      });
      return false;
    });
  });

  // modalを閉じる
  $('.modal-close').on( 'click', function() {
      //youtube
      var target = $(this).data('target');
      var modal = document.getElementById(target);
      $('.image-modal').removeClass('zoom-img');
      $('.zoom a').removeClass('shrink');
      $('.modal-wrap').fadeOut( 300 );
      $('body,html').removeClass('fixed').stop().animate({scrollTop:y}, 1);
      return false;
  });

  // modal_zoom
  $('.zoom').on( 'click', function() {
    $( '.image-modal' ).toggleClass('zoom-img');
    $('.zoom a').toggleClass('shrink');
  });


  //menu
  $(".menu-open").on('click', function() {
    $(".menu-wrap").fadeToggle(150);
    $(".menu-open").toggleClass("active");
    y = $(window).scrollTop();
    $('body,html').removeClass('fixed').stop().animate({scrollTop:y}, 1);
    return false;

  });

  $(".menu-wrap nav ul li a").on('click', function() {
    $('body,html').removeClass('fixed');
    $(".menu-open").removeClass("active");
    $(".menu-wrap").fadeOut(150);
  });


  $(window).on("resize scroll",function() {
    let scrollPosition = $(this).scrollTop();
    var windowWidth = $(window).width();
    var windowSm = 834;
    if (windowWidth > windowSm) {
      if (scrollPosition +50 > $('.kv').height()) {
        $('.scrollnav').fadeIn();
        $('.kv').css('top',0);
        $('.totop').fadeIn();
      }else{
        $('.scrollnav').fadeOut();
        $('.totop').fadeOut()
      }
    }else{
      $('.scrollnav').fadeOut();
      if (scrollPosition > $('.kv').height()) {
        $('.totop').fadeIn();
      }else{
        $('.totop').fadeOut()
      }
    }
  });

  // スクロール
  $(document).on('click', 'a.scroll', function() {
    var speed = 200;
    var href= $(this).attr("href");
    var target;
    var position;
    var windowWidth = $(window).width();
    var windowSm = 834;
    if (windowWidth < windowSm) {
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top - 50
    }else{
      switch(href){
        default:
          target = $(href == "#" || href == "" ? 'html' : href);
          position = target.offset().top;
          break;
      }
    }
    
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });




  //pageごとの scrpit
  if($("body#page-home").length > 0){
    $('.catch').delay(500).queue(function(){
        $(this).addClass('up-show');
    });

    $('.kv-txt').delay(1500).queue(function(){
        $(this).addClass('up-show');
    });
  }
  //totop制御
  var ua = navigator.userAgent;
  if ((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0) {
    $(window).scroll(function(){
      scrollHeight = $(document).height();
      scrollPosition = $(window).height() + $(window).scrollTop();
      footHeight = $("footer").innerHeight();
      if ( scrollHeight - scrollPosition <= footHeight - 80 ) {
        $(".totop").css({
        "position":"absolute",
        "bottom": "0px"
        });
      } else {
        $(".totop").css({
          "position":"fixed",
          "bottom": "80px"
        });
      }
    })

  }
});

//inview処理
  $(function(){
    $(window).scroll(function (){
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      $(".fade-up").each(function(){
        var imgPos = $(this).offset().top;
        if (scroll > imgPos - windowHeight + windowHeight/8){
          $(this).addClass("up-show");
        }
      });
    });
  });

function d(){
  $(".debug-sheet").toggle();
}

function b(){
  $("body").toggleClass("display-boxline");
}



//PCスクロールナビ
  $(function() {
    var scrollMenu = function() {
      var array = {
        '#sec01': 0,
        '#sec02': 0,
        '#sec03': 0,
      };

      var $globalNavi = new Array();

      var winH = $(window).height();

      // 各要素のスクロール値を保存
      $(window).on('load',function(){
        for (var key in array) {
          if ($(key).offset()) {
            array[key] = $(key).offset().top;
            $globalNavi[key] = $('.local-nav-list li a[href="' + key + '"]');
          }
        }

        // スクロールイベントで判定
        $(window).scroll(function () {
          var first = $('#sec01').offset().top - winH/ 4
          for (var key in array) {
            let scrollPosition = $(this).scrollTop();
            if (scrollPosition > array[key] - winH/ 4) {
              $('.local-nav-list li a').each(function() {
                $(this).removeClass('active');
              });
              $globalNavi[key].addClass('active');
            }else if(scrollPosition < first) {
              $('.local-nav-list li a').removeClass('active');
            }
          }
        });
      });
    }

    // 実行
    scrollMenu();
  });