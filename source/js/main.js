'use strict';

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
