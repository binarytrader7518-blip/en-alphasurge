/* Alpha Surge — site interactions (no dependencies) */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.remove('no-js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function store(get, key, val) {
    try { if (get) return window.localStorage.getItem(key); window.localStorage.setItem(key, val); } catch (e) { return null; }
  }

  /* Mobile navigation */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.focus(); }
    });
  }

  /* Scroll reveal */
  var els = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  /* Pointer tilt on hero bottle */
  var stage = document.querySelector('.stage');
  var tilt = stage && stage.querySelector('.tilt');
  if (stage && tilt && !reduce && window.matchMedia('(pointer:fine)').matches) {
    stage.addEventListener('pointermove', function (e) {
      var r = stage.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = 'rotateY(' + (x * 18).toFixed(2) + 'deg) rotateX(' + (-y * 12).toFixed(2) + 'deg)';
    });
    stage.addEventListener('pointerleave', function () { tilt.style.transform = ''; });
  }

  /* Sticky 6-bottle offer bar */
  var bar = document.querySelector('.sticky-bar');
  if (bar) {
    var onScroll = function () { bar.classList.toggle('show', window.scrollY > 640); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* Bottom-left informational notification (no fake purchase data) */
  var toast = document.getElementById('toast');
  if (toast) {
    var msgs = [
      '<b>Compare the Alpha Surge packages</b><br>2, 3 and 6-bottle options are listed. <a href="/order?package=6">View options</a>',
      '<b>90-day money-back guarantee</b><br>Offered by the seller on every package. <a href="/faq.html#guarantee">How it works</a>',
      '<b>Free US shipping</b><br>Included with the 3 and 6-bottle packages. <a href="/order?package=3">See packages</a>',
      '<b>Best per-bottle price</b><br>The 6-bottle package lists at $49 per bottle. <a href="/order?package=6">Explore offer</a>'
    ];
    var i = 0, timer, hideT, closed = false;
    var txt = toast.querySelector('p');
    var show = function () {
      if (closed || document.querySelector('.modal.open') || window.scrollY < 700) { timer = setTimeout(show, 4000); return; }
      txt.innerHTML = msgs[i % msgs.length]; i++;
      toast.classList.add('show');
      hideT = setTimeout(function () { toast.classList.remove('show'); timer = setTimeout(show, 18000 + Math.random() * 8000); }, 6000);
    };
    toast.querySelector('.x').addEventListener('click', function () { closed = true; clearTimeout(hideT); clearTimeout(timer); toast.classList.remove('show'); });
    timer = setTimeout(show, 5000);
  }

  /* Centered promotional modal — 24h cooldown */
  var modal = document.getElementById('promo');
  if (modal) {
    var KEY = 'as_promo_seen', DAY = 864e5, lastFocus = null;
    var seen = parseInt(store(true, KEY) || '0', 10);
    var focusables = function () { return modal.querySelectorAll('a[href],button:not([disabled])'); };
    var open = function () {
      lastFocus = document.activeElement;
      modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-lock');
      var f = focusables(); if (f.length) f[0].focus();
      store(false, KEY, String(Date.now()));
    };
    var close = function () {
      modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-lock');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    modal.addEventListener('click', function (e) { if (e.target === modal || e.target.closest('[data-close]')) close(); });
    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        var f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    if (!seen || Date.now() - seen > DAY) {
      var start = function () { setTimeout(open, 6500); };
      if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
    }
  }

  /* Order page: highlight requested package */
  var pk = document.querySelector('[data-order-page]');
  if (pk) {
    var p = new URLSearchParams(location.search).get('package');
    if (['2', '3', '6'].indexOf(p) > -1) {
      var card = document.getElementById('pkg-' + p);
      if (card) { card.classList.add('selected'); if (!reduce) card.scrollIntoView({ block: 'center' }); }
    }
  }
})();
