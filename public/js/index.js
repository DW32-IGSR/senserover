'use strict';

(function() {
  var body = document.body;
  var burgerMenu = document.getElementsByClassName('w-icon-nav-menu')[0];
  var burgerContain = document.getElementsByClassName('w-nav-button hamburger-button')[0];
  var burgerNav = document.getElementsByClassName('b-nav')[0];

  burgerMenu.addEventListener('click', function toggleClasses() {
    [body, burgerContain, burgerNav].forEach(function(el) {
      el.classList.toggle('open');
    });
  }, false);
})();