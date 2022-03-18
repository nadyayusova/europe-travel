'use strict';

var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

// init!
navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

navToggle.click();

//-----------------
// по-другому, через id
let tabs = document.querySelectorAll('.tabs-list__item');
let tabsContent = document.querySelectorAll('.tab-content');
let inactiveTabs = document.querySelectorAll('.tab-content:not(:first-of-type)');

function init() {
  // 1. убрать меню из потока и закрыть

  // 2. спрятать неактивные вкладки
  inactiveTabs.forEach((item) => {
    item.classList.remove('tab-content--active');
  });
}

tabs.forEach(function(tab, i) {
  tab.addEventListener('click', function(e) {
    e.preventDefault();
    hideTabs();
    this.classList.add('tabs-list__item--active');
    tabsContent[i].classList.add('tab-content--active');
  });
});

function hideTabs() {
  tabs.forEach((item) => {
    item.classList.remove('tabs-list__item--active');
  });
  tabsContent.forEach((item) => {
    item.classList.remove('tab-content--active');
  });
}

init();
