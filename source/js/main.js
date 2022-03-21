'use strict';

(function () {

  const navMain = document.querySelector('.main-nav');
  const navToggleButton = navMain.querySelector('.main-nav__toggle');
  const catalogButtons = document.querySelectorAll('.card__link');
  const tabsLabels = document.querySelectorAll('.tabs-list__item');
  const tabsContent = document.querySelectorAll('.tab-content');
  const form = document.querySelector('.form');
  const modalForm = document.querySelector('.modal-form');
  const successMessage = document.querySelector('.modal-success');
  const buyButtons = document.querySelectorAll('.button--buy');
  const focusInput = document.querySelector('.field__text-input--focus');
  let currentWindow;

  function init() {
    // убрать меню из потока и закрыть
    navMain.classList.remove('main-nav--nojs');
    navToggleButton.addEventListener('click', onNavToggleClick);
    navToggleButton.click();
    // показать контент только для активной вкладки
    findActiveAnchor();
    hideInactiveContent();
    // установка полей форм и события
    getFormValues(form);
    getFormValues(modalForm);
    form.addEventListener('submit', onFormSubmit);
    modalForm.addEventListener('submit', onFormSubmit);
    catalogButtons.forEach(function(btn) {
      btn.addEventListener('click', onCatalogButtonClick);
    });
    buyButtons.forEach(function(btn) {
      btn.addEventListener('click', onBuyClick);
    });
  }

  function extractAnchor(link) {
    const href = link.href;
    const anchor = href.match(/#[^/]+/)[0];
    return anchor;
  }

  function findActiveAnchor() {
    const activeTabLink = document.querySelector('.tabs-list__item--active .tabs-list__link');
    return extractAnchor(activeTabLink);
  }

  function hideInactiveContent() {
    const anchor = findActiveAnchor();
    const inactiveTabs = document.querySelectorAll(`.tab-content:not(${anchor})`);
    inactiveTabs.forEach((item) => {
      item.classList.remove('tab-content--active');
    });
  }

  const onNavToggleClick = function () {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    }
  };

  const onCatalogButtonClick = function () {
    const anchor = extractAnchor(this);
    const tab = document.querySelector(`.tabs-list__link[href$="${anchor}"]`);
    tab.click();
  };

  tabsLabels.forEach(function(tab, i) {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      hideTabs();
      this.classList.add('tabs-list__item--active');
      tabsContent[i].classList.add('tab-content--active');
    });
  });

  const onMessageEscapePress = function (evtKey) {
    if (evtKey.key === 'Escape') {
      evtKey.preventDefault();
      hideMessage(currentWindow);
    }
  };

  const onMessageClick = function (evt) {
    if (modalForm.contains(evt.target)) return;
    hideMessage(currentWindow);
  };

  const showMessage = function (messageWindow) {
    currentWindow = messageWindow;
    currentWindow.classList.remove('hidden');
    document.addEventListener('keydown', onMessageEscapePress);
    document.addEventListener('click', onMessageClick);
    if (focusInput) {
      focusInput.focus();
    }
  };

  var hideMessage = function () {
    if (!currentWindow.classList.contains('hidden')) {
      currentWindow.classList.add('hidden');
      document.removeEventListener('keydown', onMessageEscapePress);
      document.removeEventListener('click', onMessageClick);
    }
  };

  const onBuyClick = function (evt) {
    evt.stopPropagation();
    showMessage(modalForm);
  };

  function hideTabs() {
    tabsLabels.forEach((item) => {
      item.classList.remove('tabs-list__item--active');
    });
    tabsContent.forEach((item) => {
      item.classList.remove('tab-content--active');
    });
  }

  const onFormSubmit = function (evt) {
    evt.preventDefault();
    const form = evt.target;

    if(form.elements['phone-no'].validity.valid) {
      localStorage.setItem('phone-no', form.elements['phone-no'].value);
    }

    if(form.elements['email-address'].validity.valid) {
      localStorage.setItem('email-address', form.elements['email-address'].value);
    }

    if (form.classList.contains('modal-form')) {
      form.classList.add('hidden');
    }
    showMessage(successMessage);
  };

  function getFormValues(form) {
    let phone = localStorage.getItem('phone-no');
    let email = localStorage.getItem('email-address');

    if (phone) {
      form.elements['phone-no'].value = phone;
    }

    if (email) {
      form.elements['email-address'].value = email;
    }
  }

  init();

})();
