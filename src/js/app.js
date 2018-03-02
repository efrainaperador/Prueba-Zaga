import '../scss/styles.scss';

let app = (function() {

  function showHideMenu(event) {
    let menu = document.querySelector('.content');
    this.toggleClass(menu, 'open');
  }

  function toggleClass(element, newClass) {
    let className = element.className;
    let regex = new RegExp(newClass);
    className = regex.test(className) ? className.replace(newClass, '').trim()
      : className + ' ' + newClass;
    element.className = className;
  }

  function onScroll() {
    let header = document.querySelector('.header');
    let wrapperPosition = document.querySelector('.wrapper').getBoundingClientRect().top;
    if(!hasClass(header, 'fix') && wrapperPosition < 0) {
      toggleClass(header, 'fix'); 
    }else if(hasClass(header, 'fix') && wrapperPosition >= 0){
      toggleClass(header, 'fix');
    }
    let sections = document.querySelectorAll('.section');
    for(let i = 0, l = sections.length; i < l; i++){
      let element = sections[i];
      let elementPosition = element.getBoundingClientRect().top;
      if(isElementVisible(elementPosition)) {
        if(!hasClass(element, 'visible') && hasClass(element, 'par')) {
          var visible = document.querySelector('.visible');
          visible ? toggleClass(visible, 'visible') : null;
          toggleClass(element, 'visible');
        }
      }
    };

    function hasClass(element, className) {
      return RegExp(className).test(element.className);
    }

    function isElementVisible(elementPosition) {
      return elementPosition > -150 && elementPosition < (window.innerHeight - 50);
    }
  }

  function scrollTo(id) {
    toggleClass(document.body, 'open');
    animateScroll();
    let element = document.getElementById(id);
    let position = element.offsetTop;
    
    function animateScroll() {
      if(window.pageYOffset > position) {
        window.scrollTo(0, window.pageYOffset - 10);
      }else if(window.window.pageYOffset < position) {
        window.scrollTo(0, window.pageYOffset + 10);
      }
      onScroll();
      setTimeout(function() {
        if(Math.abs(window.window.pageYOffset - position) > 10) {
          animateScroll();
        }
      }, 1);
    }
    
  }

  window.scroll(0, 1);

  return {
    showHideMenu: showHideMenu,
    toggleClass: toggleClass,
    onScroll: onScroll,
    scrollTo: scrollTo
  };
})();

window.app = app;
window.onscroll = app.onScroll;