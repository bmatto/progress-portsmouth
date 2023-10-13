(function() {
  // Variables
  var langToggle = document.querySelector('.header__language-switcher');
  var navToggle = document.querySelector('#nav-toggle');
  var emailGlobalUnsub = document.querySelector('input[name="globalunsub"]');

  // Functions
  function domReady(callback) {
    if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  function toggleNav() {
    if (langToggle.classList.contains('open')) {
      langToggle.classList.remove('open');
    }
  }

  function toggleLang() {
    langToggle.classList.toggle('open');

    if (navToggle.checked) {
      navToggle.checked = false;
    }
  }

  function toggleDisabled() {
    var emailSubItem = document.querySelectorAll('#email-prefs-form .item');

    emailSubItem.forEach(item => {
      var emailSubItemInput = item.querySelector('input');

      if (emailGlobalUnsub.checked) {
        item.classList.add('disabled');
        emailSubItemInput.setAttribute('disabled', 'disabled');
        emailSubItemInput.checked = false;
      } else {
        item.classList.remove('disabled');
        emailSubItemInput.removeAttribute('disabled');
      }
    });
  }

  // Event Listeners
  domReady(function() {
    if (!document.body) {
      return;
    } else {
      // Function dependent on navigation component
      if (navToggle) {
        // Toggles the mobile navigation
        navToggle.addEventListener('click', toggleNav);
      }
      // Function dependent on language switcher component
      if (langToggle) {
        // Toggles the mobile language switcher
        langToggle.addEventListener('click', toggleLang);
      }
      // Function dependent on email unsub input
      if (emailGlobalUnsub) {
        // Checks the unsubscribe from all input option
        emailGlobalUnsub.addEventListener('change', toggleDisabled);
      }
    }
  });
})();
