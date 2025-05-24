AOS.init({ once: true })
$(document).ready(function () {
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/') + 1);
  if (filename == "") {
    filename = "index.php"
  }
  $("header .nav-item .nav-link").removeClass("active");
  $(`header .nav-item .nav-link[href="${filename}"]`).addClass("active")
});
(function () {
  perfData = window.performance.timing; // The PerformanceTiming interface represents timing-related performance information for the given page.
  const EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart);
  const time = parseInt((EstimatedTime / 20) % 1) * 10;
  $("#loader ul").css({ transform: 'translateY(-99%)', transition: time + 'ms ease-in-out' });
  $("#loader .side-loader").css({ height: '0', transition: time + 'ms ease-in-out' });
  console.log('time', time)
  $('.banner-wrapper-main .home-banner .banner-img-wrap').css({ transform: 'scaleY(1)', transition: 'transform ' + time + 'ms ease-in-out, width 3s ease-in-out' });
  setTimeout(() => {
    setTimeout(() => {
      $('body').addClass('loaded')
    }, 10);
    $("#loader").fadeOut('30')
  }, time + 20);
})()


$(document).ready(function () {
  $("body").addClass('animate')
})
// const locoScroll = new LocomotiveScroll({
//   el: document.querySelector("main"),
//   smooth: true
// });
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollSmoother.create({
  // wrapper: 'body',
  content: 'main',
  smooth: 2, // how long (in seconds) it takes to "catch up" to the native scroll position
  effects: true, // looks for data-speed and data-lag attributes on elements
  smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});
function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewCenter = $(window).scrollTop() + (innerHeight / 2);
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  // return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  return ((elemBottom >= docViewCenter) && (elemTop <= docViewCenter));
}

setInterval(() => {
  $('section').each(function (ind, elem) {
    // console.log(elem)
    if (!$(".leaf-img-2").hasClass('animate-2')) {
      const top = $(".impact-section .sec-heading").offset().top + $(".impact-section .sec-heading")[0].getBoundingClientRect().height
      $(".leaf-img-2").css('top', top)
    }
    if (!$(".leaf-img-2").hasClass('animate-1')) {
      const top = $(".luxurious-sec").offset().top + ($(".luxurious-sec")[0].getBoundingClientRect().height / 1.5)
      $(".leaf-img-2").css('top', top)
    }
    // const top = $(".impact-section .sec-heading")[0].getBoundingClientRect().top + $(".impact-section .sec-heading")[0].getBoundingClientRect().height
    if (isScrolledIntoView($(elem)[0])) {
      $(elem).addClass('animate')
      if ($(elem).hasClass('impact-section')) {
        $(".leaf-img-2").addClass('animate-1')
        $(".leaf-img-2").removeClass('animate-2')

      } else if ($(elem).hasClass('luxurious-sec')) {
        $(".leaf-img-2").addClass('animate-2')
        $(".leaf-img-2").removeClass('animate-1')
      }
    }
  })
}, 100);

$('#banner-slider-home').owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  dots: true,
  autoplay: false,
  touchDrag: false,
  autoplayTimeout: 10000,
  autoplayHoverPause: false,
  items: 1,
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  dotData: true,
  dotsData: true,
  URLhashListener: true,
  responsive: {
    0: {
      autoplay: false,
    },
    767: {
      autoplay: false,
    }
  }
})

$(document).ready(function () {
  var swiper = new Swiper("#luxurious-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 2,
    spaceBetween: 100,
    slidesPerView: "auto",
    loop: true,
    scrollbar: {
      el: "#luxurious-slider .swiper-scrollbar",
      hide: true,
    },
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 50,
      modifier: 1,
      slideShadows: false,
    },
    on: {
      slideChangeTransitionStart: function () {
        // Remove skew classes from all slides
        $('.swiper-slide').removeClass('swiper-slide-prev swiper-slide-next');

        // Add skew classes to previous and next slides
        var activeIndex = this.activeIndex;
        $('.swiper-slide').eq(activeIndex - 1).addClass('swiper-slide-prev');
        $('.swiper-slide').eq(activeIndex + 1).addClass('swiper-slide-next');
      },
    }
  });
})

var swiper = new Swiper(".mySwiper1", {
  slidesPerView: 3, // Show only three slides
  spaceBetween: 50,
  scrollbar: {
    el: ".mySwiper1 .swiper-scrollbar",
    hide: true,
  },
  breakpoints: {
    // when window width is >= 320px
    0: {
      slidesPerView: 1,
      spaceBetween: 30, // Adjust margin for smaller screens
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 15, // Adjust margin for medium screens
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 50, // Margin for larger screens
    }
  }
});

$('.picks-silder').owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  items: 1,
  navText: [
    '<i class="fa-sharp fa-light fa-arrow-left"></i>',  // Custom left navigation icon
    '<i class="fa-sharp fa-light fa-arrow-right"></i>'  // Custom right navigation icon
  ],
  // responsive: {
  //   0: {
  //   },
  //   600: {
  //     items: 3
  //   },
  //   1000: {
  //     items: 1
  //   }
  // }
});

$('.spirter').owlCarousel({
  loop: true,
  margin: 40,
  nav: true,
  dots: false,
  navText: [
    '<i class="fa-sharp fa-light fa-arrow-left"></i>',
    '<i class="fa-sharp fa-light fa-arrow-right"></i>'
  ],
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 1.5
    },
    1000: {
      items: 2.5
    }
  }
})

let question = document.querySelectorAll(".question");

question.forEach(question => {
  question.addEventListener("click", event => {
    const active = document.querySelector(".question.active");
    if (active && active !== question) {
      active.classList.toggle("active");
      active.nextElementSibling.style.maxHeight = 0;
    }
    question.classList.toggle("active");
    const answer = question.nextElementSibling;
    if (question.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = 0;
    }
  })
})
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel');
  const cells = carousel.querySelectorAll('.carousel__cell');
  const cellCount = cells.length; // Updated to 6
  // const cellWidth = carousel.offsetWidth;
  const cellWidth = cells[0].offsetWidth;
  // let selectedIndex = 0;
  const radius = Math.round((cellWidth / 2) / Math.tan(Math.PI / cellCount));

  // function rotateCarousel() {
  //   const angle = (selectedIndex + 1) / cellCount * -360;
  //   carousel.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
  //   selectedIndex = cellCount == selectedIndex ? 0 : selectedIndex++
  // }

  cells.forEach((cell, i) => {
    const cellAngle = i / cellCount * 360;
    cell.style.transform = `rotateY(${cellAngle}deg) translateZ(${radius}px)`;
  });
  // const cellCount = cells.length;
  // const cellWidth = cells[0].offsetWidth;

  let rotateY = 0;

  function rotateCarousel() {
    const angle = 360 / cellCount;
    cells.forEach((cell, index) => {
      const theta = angle * index;
      cell.style.transform = `rotateY(${theta}deg) translateZ(${radius}px)`;
    });
  }

  function rotateNext() {
    rotateY -= 360 / cellCount;
    const currentActive = $(carousel).find(".center")
    let targetPrev;
    let targetActive;
    let targetNext;
    $('.carousel .carousel__cell').removeClass("active")
    $('.carousel .carousel__cell').removeClass("center")
    if ($(currentActive).next().length == 0) {
      targetActive = $('.carousel .carousel__cell').first()
    } else {
      targetActive = $(currentActive).next()
    }
    if (targetActive.next().length == 0) {
      targetNext = $('.carousel .carousel__cell').first()
      targetPrev = $(targetActive).prev()
    } else if (targetActive.prev().length == 0) {
      targetNext = $(targetActive).next()
      targetPrev = $('.carousel .carousel__cell').last()
    } else {
      targetNext = $(targetActive).next()
      targetPrev = $(targetActive).prev()
    }
    $(targetActive).addClass('active')
    $(targetActive).addClass('center')
    $(targetNext).addClass('active')
    $(targetPrev).addClass('active')
    const activeIndex = $('.carousel .carousel__cell.center').index()
    $(".carousel-indicator ul li").removeClass('active')
    $(`.carousel-indicator ul li:nth-child(${activeIndex + 1})`).addClass('active')
    $(`.carousel-indicator span`).html(`0${activeIndex + 1}`)
    if (innerWidth <= 1440) {
      document.querySelector('.carousel').style.transform = `rotateY(${rotateY}deg) translateY(26vw)`;
    } else {
      document.querySelector('.carousel').style.transform = `rotateY(${rotateY}deg) translateY(15vw)`;
    }
  }
  function rotateLeft() {
    rotateY += 360 / cellCount;
    const currentActive = $(carousel).find(".center")
    let targetPrev;
    let targetActive;
    let targetNext;
    $('.carousel .carousel__cell').removeClass("active")
    $('.carousel .carousel__cell').removeClass("center")
    if ($(currentActive).prev().length == 0) {
      targetActive = $('.carousel .carousel__cell').last()
    } else {
      targetActive = $(currentActive).prev()
    }
    if (targetActive.next().length == 0) {
      targetNext = $('.carousel .carousel__cell').first()
      targetPrev = $(targetActive).prev()
    } else if (targetActive.prev().length == 0) {
      targetNext = $(targetActive).next()
      targetPrev = $('.carousel .carousel__cell').last()
    } else {
      targetNext = $(targetActive).next()
      targetPrev = $(targetActive).prev()
    }
    $(targetActive).addClass('active')
    $(targetActive).addClass('center')
    $(targetNext).addClass('active')
    $(targetPrev).addClass('active')
    const activeIndex = $('.carousel .carousel__cell.center').index()
    $(".carousel-indicator ul li").removeClass('active')
    $(`.carousel-indicator ul li:nth-child(${activeIndex + 1})`).addClass('active')
    $(`.carousel-indicator span`).html(`0${activeIndex + 1}`)
    if (innerWidth <= 1440) {
      document.querySelector('.carousel').style.transform = `rotateY(${rotateY}deg) translateY(26vw)`;
    } else {
      document.querySelector('.carousel').style.transform = `rotateY(${rotateY}deg) translateY(15vw)`;
    }
  }
  $(".carousel-container .prv-btn").click(rotateLeft)
  $(".carousel-container .next-btn").click(rotateNext)
  // Initial positioning
  rotateCarousel();
  carousel.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchmove', function (e) {
    endX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', function () {
    if (startX > endX) {
      rotateNext();
    } else {
      rotateLeft();
    }
  });
  carousel.addEventListener('mousedown', function (e) {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('mousemove', function (e) {
    endX = e.touches[0].clientX;
  });

  carousel.addEventListener('mouseup', function () {
    if (startX > endX) {
      rotateNext();
    } else {
      rotateLeft();
    }
  });
  // Add event listeners for manual navigation
  // carousel.addEventListener('click', () => {
  //   selectedIndex = (selectedIndex + 1) % cellCount;
  //   rotateCarousel();
  // });
});
$(".hame-burger").click(function () {
  // debugger
  if ($(this).hasClass('collapsed')) {
    $(this).find('.btn-sm').html(`Menu`)
    // $(this).find('.btn-icon-sm').html(``)
  } else {
    $(this).find('.btn-sm').html(`Close`)
  }
})


$(document).ready(function () {
  // Dropdown Toggle
  $(".filter-toggle").click(function (e) {
    e.preventDefault();
    $(".dropdown-menu").toggle();
  });

  // jQuery UI Price Range Slider
  $("#price-range").slider({
    range: true,
    min: 0,
    max: 15000000,
    values: [0, 15000000],
    slide: function (event, ui) {
      $("#range").text("$" + ui.values[0] + " - $" + ui.values[1]);
      $("input[name='pricerange']").val(ui.values[0] + "-" + ui.values[1]);
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".main-heading-profiles", {
    x: -200,
    // opacity: 1,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".main-heading-profiles",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  gsap.from(".main-image-car", {
    x: 70,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".main-image-car",
      start: "top 80%",
      scrub: true,
      toggleActions: "play none none none"
    }
  });
})

  window.addEventListener('DOMContentLoaded', () => {
    // Animate list items with a fade, upward move, and a slight rotation
    gsap.from(".banner-ul li", {
      opacity: 0,
      y: 30,
      rotateX: 30,
      duration: 1,
      stagger: 0.15,
      ease: "back.out(1.7)"
    });

    // Wiggle animation on the search button after form loads
    gsap.fromTo(".banner-ul button", {
      opacity: 0,
      scale: 0.9
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay: 1.2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(".banner-ul button", {
          x: -5,
          repeat: 3,
          yoyo: true,
          duration: 0.1,
          delay: 0.2,
          ease: "sine.inOut"
        });
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Init Owl Carousel (you can remove autoplay to avoid conflict)
    $(".theme-slider").owlCarousel({
      loop: true,
      margin: 20,
      nav: false,
      dots:false,
      items: 1,
      autoplay: false, // disable autoplay
      smartSpeed: 700
    });

    // Animate the entire slider from left to right on scroll
    gsap.from(".theme-slider", {
      scrollTrigger: {
        trigger: ".theme-slider",
        start: "top 80%",  // when top of slider hits 80% of viewport
        toggleActions: "play none none none"
      },
      x: -100,
      opacity: 0,
      duration: 0.3,
      ease: "power3.out"
    });
  });
$('.theme-slider').owlCarousel({
  loop:true,
        dots:false,
  margin:30,
  nav:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:3
      },
      1000:{
          items:3
      }
  }
})
>
ScrollTrigger.batch(".main-testi", {
  onEnter: batch => {
    gsap.from(batch, {
      x: -150,
      opacity: 0,
      stagger: 0.2,
      duration: 1
    });
  },
  start: "top 90%",
  once: true
});
$('.theme-slider').on('changed.owl.carousel', function () {
  gsap.fromTo(
    '.owl-item.active .main-testi',
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
  );
});
$( function() {
  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 500,
    values: [ 75, 300 ],
    slide: function( event, ui ) {
      $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    }
  });
  $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    " - $" + $( "#slider-range" ).slider( "values", 1 ) );
} );
$(document).ready(function () {
  var sync1 = $("#sync1");
  var sync2 = $("#sync2");

  sync1.owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: true,
      autoplay: false,
      dots: false,
      loop: true,
      responsiveRefreshRate: 200,
      navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
  }).on('changed.owl.carousel', syncPosition);

  sync2
      .on('initialized.owl.carousel', function () {
          sync2.find(".owl-item").eq(0).addClass("current");
      })
      .owlCarousel({
          items: 5,
          dots: false,
          smartSpeed: 200,
          slideSpeed: 500,
          slideBy: 1,
          responsiveRefreshRate: 100
      }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - (el.item.count / 2) - .5);

      if (current < 0) {
          current = count;
      }
      if (current > count) {
          current = 0;
      }

      sync2
          .find(".owl-item")
          .removeClass("current")
          .eq(current)
          .addClass("current");
      var onscreen = sync2.find('.owl-item.active').length - 1;
      var start = sync2.find('.owl-item.active').first().index();
      var end = sync2.find('.owl-item.active').last().index();

      if (current > end) {
          sync2.data('owl.carousel').to(current, 100, true);
      }
      if (current < start) {
          sync2.data('owl.carousel').to(current - onscreen, 100, true);
      }
  }

  function syncPosition2(el) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
  }

  sync2.on("click", ".owl-item", function (e) {
      e.preventDefault();
      var number = $(this).index();
      sync1.data('owl.carousel').to(number, 300, true);
  });

  // FancyBox initialization for the first slider
  $(".fancybox").fancybox({
      buttons: [
          'zoom',
          'slideShow',
          'fullScreen',
          'download',
          'thumbs',
          'close'
      ]
  });
});

