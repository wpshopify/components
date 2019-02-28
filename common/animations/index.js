// import anime from 'animejs';

// // Used for add to cart and checkout
// function pulse(selector) {

//    var element = document.querySelectorAll(selector);

//    anime({
//       targets: element,
//       scale: 1.09,
//       duration: 300,
//       elasticity: 0,
//       complete: function () {

//          anime({
//             targets: element,
//             scale: 1,
//             duration: 800,
//             elasticity: 800
//          });

//       }
//    });

// }

// // Used for add to cart and checkout
// function pulseSoft(selector) {

//    var element = document.querySelectorAll(selector);

//    anime({
//       targets: element,
//       scale: 1.03,
//       duration: 280,
//       elasticity: 0,
//       complete: function () {

//          anime({
//             targets: element,
//             scale: 1,
//             duration: 800,
//             elasticity: 800
//          });

//       }
//    });

// }

// // Used for cart counter
// function bounceIn(selector) {

//    var element = document.querySelectorAll(selector);

//    return anime({
//       targets: element,
//       translateY: 100
//    });

// }

// // Used for notices
// function slideInDown(selector) {

//    var element = document.querySelectorAll(selector);

//    return anime({
//       targets: element,
//       translateY: [-40, 0],
//    });

// }

// function slideInTop(selector) {

//    var element = document.querySelectorAll(selector);

//    return anime({
//       targets: element,
//       opacity: 1,
//       elasticity: 0
//    });

// }


// // Used for notices
// function slideInLeft(selector) {

//    var element = document.querySelectorAll(selector);

//    return anime({
//       targets: element,
//       translateX: ['108%', '0%'],
//       duration: 380,
//       delay: 0,
//       elasticity: 0,
//       easing: [0, -0.54, .29, 1.16],
//       begin: function () {

//          // $element.addClass('wps-cart-is-open');

//          // anime({
//          //    targets: jQuery('.wps-cart-item-container .wps-cart-item').toArray(),
//          //    translateY: '50px',
//          //    delay: 600,
//          //    opacity: 1,
//          //    elasticity: 0,
//          //    duration: 500,
//          //    delay: function (el, i, l) {
//          //       return i * 80;
//          //    }

//          // });

//       }

//    });

// }


// // Used for notices
// function slideInRight(selector) {

//    var element = document.querySelectorAll(selector);

//    return anime({
//       targets: element,
//       translateX: ['110%', '0%'],
//       duration: 350,
//       elasticity: 200
//    });

// }


// function slideOutRight(selector) {

//    var element = document.querySelectorAll(selector);

//    return anime({
//       targets: element,
//       translateX: ['0%', '108%'],
//       duration: 420,
//       delay: 0,
//       elasticity: 0,
//       easing: [.91, -0.24, .29, 1.56],
//       complete: function () {
//          $element.removeClass('wps-cart-is-open');
//       }
//    });

// }

// export {
//    pulse,
//    bounceIn,
//    slideInDown,
//    slideInTop,
//    slideInLeft,
//    slideInRight,
//    slideOutRight,
//    pulseSoft
// }