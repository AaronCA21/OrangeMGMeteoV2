/*! Orange 7.20.0 - new/1 - menu - 2023-12-12T08:28:06.241Z */
"use strict";
(self["webpackChunkOrangeLibraryWebpack"] = self["webpackChunkOrangeLibraryWebpack"] || []).push([["menu"],{

/***/ "./src/modules/authentication/authentication.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V": function() { return /* binding */ Authentication; }
/* harmony export */ });
/* harmony import */ var _ui_main_overlay_main_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/ui/main-overlay/main-overlay.ts");
/* harmony import */ var modules_helper_responsive_responsive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/helper/responsive/responsive.ts");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/gsap/index.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/gsap/gsap-core.js");
/* harmony import */ var _helper_debug_debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/modules/helper/debug/debug.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




let Authentication = /*#__PURE__*/function () {
  function Authentication() {
    _classCallCheck(this, Authentication);
  }
  _createClass(Authentication, null, [{
    key: "init",
    value: function init() {
      Authentication.$element = $(".AuthenticationCard");
      Authentication.$trigger = $('.Authentication-trigger');
      Authentication.lastScrollTop = 0;
      Authentication.connexionPopinIsOpen = false;
      if (Authentication.$element.length) {
        _ui_main_overlay_main_overlay__WEBPACK_IMPORTED_MODULE_0__/* .MainOverlay.addTrigger */ .i.addTrigger(Authentication.$trigger);
        _ui_main_overlay_main_overlay__WEBPACK_IMPORTED_MODULE_0__/* .MainOverlay.addContent */ .i.addContent(Authentication.$element);
        Authentication.events();
      }
    }
  }, {
    key: "events",
    value: function events() {
      Authentication.$trigger.on("click", function () {
        if (Authentication.connexionPopinIsOpen === true) {
          Authentication.hideConnexionCartOffline();
        } else {
          Authentication.showConnexionCartOffline();
        }
      });
      $("body").on("click", function (e) {
        const $clickedElement = $(e.target);
        const searchMenuIsClicked = $clickedElement.closest(".AuthenticationCard, .Authentication-trigger").length;
        if (searchMenuIsClicked === 0 && Authentication.connexionPopinIsOpen === true) {
          Authentication.hideConnexionCartOffline();
        }
      });
      modules_helper_responsive_responsive__WEBPACK_IMPORTED_MODULE_1__/* .Responsive.onWindowResize */ .E.onWindowResize(function () {
        if (Authentication.connexionPopinIsOpen && modules_helper_responsive_responsive__WEBPACK_IMPORTED_MODULE_1__/* .Responsive.isMin */ .E.isMin("minLg")) {
          Authentication.hideConnexionCartOffline();
          _ui_main_overlay_main_overlay__WEBPACK_IMPORTED_MODULE_0__/* .MainOverlay.hideOverlay */ .i.hideOverlay();
        }
      });
      $('.JS-authentication-goto2').on('click', function () {
        Authentication.goto2();
      });
      $('.JS-authentication-gotoB').on('click', function (e) {
        e.preventDefault();
        Authentication.passingDataFromStep1ToStep2();
        $('.AuthenticationStepA-wrapper').hide();
        $('.AuthenticationStepB-wrapper').show();
      });
      $('.AuthenticationForm-userCard').on('click', function () {
        Authentication.goto2();
      });
      $('.JS-Authentication-close').on('click', function (e) {
        e.preventDefault();
        $("body").trigger('click');
      });
    }
  }, {
    key: "goto2",
    value: function goto2() {
      $('.AuthenticationStepB-wrapper').hide();
      $('.AuthenticationInitialStep-wrapper').hide();
      const $autenticationStep2Wrapper = $('.AuthenticationStep2-wrapper');
      if ($autenticationStep2Wrapper.length) {
        $autenticationStep2Wrapper.show();
      } else if ($('.AuthenticationStepA-wrapper')) {
        $('.AuthenticationStepA-wrapper').show();
      }
    }
  }, {
    key: "showConnexionCartOffline",
    value: function showConnexionCartOffline() {
      if (Authentication.connexionPopinIsOpen === false) {
        Authentication.$trigger.addClass('open');
        Authentication.connexionPopinIsOpen = true;
        gsap__WEBPACK_IMPORTED_MODULE_3__/* .gsap.to */ .p8.to(Authentication.$element, {
          duration: 0.5,
          height: 'auto',
          ease: gsap__WEBPACK_IMPORTED_MODULE_4__/* .Power2.easeOut */ .Lp.easeOut
        });
        gsap__WEBPACK_IMPORTED_MODULE_3__/* .gsap.to */ .p8.to(".AuthenticationCard-triangle", {
          duration: 0.5,
          opacity: 1,
          ease: gsap__WEBPACK_IMPORTED_MODULE_4__/* .Power2.easeOut */ .Lp.easeOut
        });
      }
    }
  }, {
    key: "hideConnexionCartOffline",
    value: function hideConnexionCartOffline() {
      if (Authentication.connexionPopinIsOpen === true) {
        Authentication.$trigger.removeClass('open');
        Authentication.connexionPopinIsOpen = false;
        gsap__WEBPACK_IMPORTED_MODULE_3__/* .gsap.to */ .p8.to(Authentication.$element, {
          duration: 0.5,
          height: 0,
          ease: gsap__WEBPACK_IMPORTED_MODULE_4__/* .Power2.easeOut */ .Lp.easeOut
        });
        gsap__WEBPACK_IMPORTED_MODULE_3__/* .gsap.to */ .p8.to(".AuthenticationCard-triangle", {
          duration: 0.5,
          opacity: 0,
          ease: gsap__WEBPACK_IMPORTED_MODULE_4__/* .Power2.easeOut */ .Lp.easeOut,
          onComplete() {
            $('.AuthenticationStep2-wrapper, .AuthenticationStepA-wrapper, .AuthenticationStepB-wrapper').hide();
            $('.AuthenticationInitialStep-wrapper').show();
          }
        });
      }
    }
  }, {
    key: "passingDataFromStep1ToStep2",
    value: function passingDataFromStep1ToStep2() {
      // Pour l'identification en 2 étapes on recupère les données de l'étape 1 pour les injecter à l'étape 2
      const identifier = Authentication.$element.find('input[name="identifier"]').val().toString();
      Authentication.$element.find('.AuthenticationForm-userCardIdentifier').text(identifier);
    }
  }, {
    key: "displayLoggedMenu",
    value: function displayLoggedMenu(data) {
      const $wrapper = $(".MenuDesktop-userNav-item.user-connexion-item, .MenuMobile-mainLinks-item.user-connexion-item");
      if ($wrapper.length) {
        if ("avatar" in data && data.avatar) {
          const image = '<img src="' + data.avatar + '" class="MenuDesktop-userLoggedIcon">';
          $wrapper.find(".JS-logged-cta").html(image);
        }
        $wrapper.find(".JS-unlogged-cta").addClass("d-none");
        $wrapper.find(".JS-logged-cta").removeClass("d-none");
      }
      Authentication.populateLoggedCard(data);
      $(".AuthenticationCard .JS-unlogged-section").addClass("d-none");
      $(".AuthenticationCard .JS-logged-section").removeClass("d-none");
    }
  }, {
    key: "displayUnloggedMenu",
    value: function displayUnloggedMenu() {
      const $wrapper = $(".MenuDesktop-userNav-item.user-connexion-item, .MenuMobile-mainLinks-item.user-connexion-item");
      if ($wrapper.length) {
        $wrapper.find(".JS-logged-cta").addClass("d-none");
        $wrapper.find(".JS-unlogged-cta").removeClass("d-none");
      }
      Authentication.populateUnloggedCard();
      $(".AuthenticationCard .JS-logged-section").addClass("d-none");
      $(".AuthenticationCard .JS-unlogged-section").removeClass("d-none");
    }
  }, {
    key: "populateLoggedCard",
    value: function populateLoggedCard(data) {
      const $wrapper = $(".JS-logged-section");
      if ("name" in data && data.name && "surname" in data && data.surname) {
        $wrapper.find(".JS-logged-section-name").text(data.name + " " + data.surname);
      }
      if (typeof window.asimina !== "undefined" && typeof window.asimina.cf.auth !== "undefined") {
        if (typeof window.asimina.cf.auth.getMyAccountUrl() === "string") {
          $wrapper.find(".JS-logged-section-account").attr("href", window.asimina.cf.auth.getMyAccountUrl());
        }
        $wrapper.find(".JS-logged-section-logout").on("click", function () {
          window.asimina.cf.auth.logout();
        });
      }
    }
  }, {
    key: "populateUnloggedCard",
    value: function populateUnloggedCard() {
      const $wrapper = $(".JS-unlogged-section");
      if (typeof window.asimina !== "undefined" && typeof window.asimina.cf.auth !== "undefined") {
        if (typeof window.asimina.cf.auth.getSignupUrl() === "string") {
          $wrapper.find(".JS-unlogged-section-signup").attr("href", window.asimina.cf.auth.getSignupUrl());
        }
      }
    }
  }]);
  return Authentication;
}();
_defineProperty(Authentication, "debug", new _helper_debug_debug__WEBPACK_IMPORTED_MODULE_2__/* .Debug */ .c(true));
_defineProperty(Authentication, "$element", void 0);
_defineProperty(Authentication, "$trigger", void 0);
_defineProperty(Authentication, "lastScrollTop", void 0);
_defineProperty(Authentication, "connexionPopinIsOpen", void 0);

/***/ }),

/***/ "./src/modules/menu/menu-desktop/menu-desktop.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": function() { return /* binding */ MenuDesktop; }
/* harmony export */ });
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/gsap/index.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/gsap/gsap-core.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

let MenuDesktop = /*#__PURE__*/function () {
  function MenuDesktop() {
    _classCallCheck(this, MenuDesktop);
  }
  _createClass(MenuDesktop, null, [{
    key: "init",
    value: function init() {
      if (false) {}
      MenuDesktop.$element = $(".MenuDesktop");
      // @ts-ignore
      MenuDesktop.element = MenuDesktop.$element.get(0);
      MenuDesktop.$menuBrand = $(".MenuDesktop-brand");
      // @ts-ignore
      MenuDesktop.menuBrand = MenuDesktop.$menuBrand.get(0);
      MenuDesktop.$topNav = $(".MenuTop");
      // @ts-ignore
      MenuDesktop.menuBrand = MenuDesktop.$topNav.get(0);
      MenuDesktop.menuPosition = "undefined";
      MenuDesktop.menuOutTimeout = false;
      MenuDesktop.menuInTimeout = false;
      MenuDesktop.collapseIsVisible = false;
      MenuDesktop.menuAppearance = "";
      if (MenuDesktop.$element.length) {
        MenuDesktop.events();
        MenuDesktop.setMenuHeight();
      }
      MenuDesktop.displayInitialData();
    }
  }, {
    key: "events",
    value: function events() {
      MenuDesktop.$element.find(".MenuDesktop-nav-item").on("mouseenter", function () {
        const $el = $(this).find(".collapse");
        const $subNav = $(this).find(".MenuDesktop-subNav");
        if ($subNav.length) {
          MenuDesktop.openSubMenu($el);
        }
      });
      MenuDesktop.$element.find(".MenuDesktop-nav-item").on("mouseleave", function () {
        const el = $(this).find(".collapse");
        MenuDesktop.closeSubMenu(el);
      });
      $(window).on("scroll resize orientationchange", function () {
        MenuDesktop.setMenuHeight();
      });
      MenuDesktop.$element.find(".user-connexion-btn, .MenuDesktop-userNav-hello").on("click", function () {
        if ($(this).hasClass("open")) {
          MenuDesktop.$element.find(".user-connexion-btn").removeClass("open");
          MenuDesktop.$element.find(".MenuDesktop-userNav-hello").removeClass("open");
          MenuDesktop.$element.find(".ConnexionCart-offline").css({
            opacity: 0,
            visibility: "hidden"
          });
          MenuDesktop.$element.find(".ConnexionCart-connected").css({
            opacity: 0,
            visibility: "hidden"
          });
          MenuDesktop.$element.find(".user-connexion-triangle").css({
            opacity: 0,
            visibility: "hidden"
          });
        } else {
          MenuDesktop.$element.find(".user-connexion-btn").addClass("open");
          MenuDesktop.$element.find(".MenuDesktop-userNav-hello").addClass("open");
          MenuDesktop.$element.find(".user-connexion-triangle").css({
            opacity: 1,
            visibility: "visible"
          });
          if ($(this).hasClass("connected")) {
            MenuDesktop.$element.find(".ConnexionCart-connected").css({
              opacity: 1,
              visibility: "visible"
            });
          } else {
            MenuDesktop.$element.find(".ConnexionCart-offline").css({
              opacity: 1,
              visibility: "visible"
            });
          }
        }
      });
      MenuDesktop.$element.find(".ConnexionCart-close").on("click", function () {
        MenuDesktop.$element.find(".user-connexion-btn").removeClass("open");
        MenuDesktop.$element.find(".MenuDesktop-userNav-hello").removeClass("open");
        MenuDesktop.$element.find(".ConnexionCart").css({
          opacity: 0,
          visibility: "hidden"
        });
        MenuDesktop.$element.find(".user-connexion-triangle").css({
          opacity: 0,
          visibility: "hidden"
        });
      });
      $("body").on("click", function (e) {
        const $clickedElement = $(e.target);
        const searchMenuIsClicked = $clickedElement.closest(".ConnexionCart, .user-connexion-btn, .MenuDesktop-userNav-hello").length;
        if (searchMenuIsClicked === 0) {
          if (MenuDesktop.$element.find(".user-connexion-btn, .MenuDesktop-userNav-hello").hasClass("open")) {
            MenuDesktop.$element.find(".user-connexion-btn").removeClass("open");
            MenuDesktop.$element.find(".MenuDesktop-userNav-hello").removeClass("open");
            MenuDesktop.$element.find(".ConnexionCart-offline").css({
              opacity: 0,
              visibility: "hidden"
            });
            MenuDesktop.$element.find(".ConnexionCart-connected").css({
              opacity: 0,
              visibility: "hidden"
            });
            MenuDesktop.$element.find(".ConnexionCart-form").css({
              opacity: 0,
              visibility: "hidden"
            });
            MenuDesktop.$element.find(".user-connexion-triangle").css({
              opacity: 0,
              visibility: "hidden"
            });
          }
        }
      });
      MenuDesktop.$element.find(".ConnexionCart-offline .ConnexionCart-btn > button").on("click", function () {
        MenuDesktop.$element.find(".ConnexionCart-offline").css({
          opacity: 0,
          visibility: "hidden"
        });
        MenuDesktop.$element.find(".ConnexionCart-form").css({
          opacity: 1,
          visibility: "visible"
        });
      });
    }
  }, {
    key: "openSubMenu",
    value: function openSubMenu(elementToExpand) {
      clearTimeout(MenuDesktop.menuOutTimeout);
      MenuDesktop.$element.find(".MenuDesktop-nav-panel").css({
        opacity: 0,
        visibility: "hidden"
      });
      elementToExpand.css({
        opacity: 1,
        visibility: "visible"
      });
      if (MenuDesktop.collapseIsVisible === false) {
        MenuDesktop.menuInTimeout = setTimeout(function () {
          gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap.to */ .p8.to(elementToExpand, {
            duration: 0.5,
            height: 'auto',
            ease: gsap__WEBPACK_IMPORTED_MODULE_1__/* .Power2.easeOut */ .Lp.easeOut
          });
          MenuDesktop.collapseIsVisible = true;
        }, 200);
      } else if (MenuDesktop.collapseIsVisible === true) {
        elementToExpand.css({
          height: "auto"
        });
      }
      MenuDesktop.setPanelMaxHeight(elementToExpand);
    }
  }, {
    key: "closeSubMenu",
    value: function closeSubMenu(elementToExpand) {
      clearTimeout(MenuDesktop.menuOutTimeout);
      clearTimeout(MenuDesktop.menuInTimeout);
      MenuDesktop.menuOutTimeout = setTimeout(function () {
        gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap.to */ .p8.to($(".MenuDesktop-nav-panel"), {
          duration: 0.5,
          height: 0,
          ease: gsap__WEBPACK_IMPORTED_MODULE_1__/* .Power2.easeOut */ .Lp.easeOut
        });
        MenuDesktop.collapseIsVisible = false;
      }, 200);
    }
  }, {
    key: "setPanelMaxHeight",
    value: function setPanelMaxHeight($el) {
      let menuHeight = 0;
      const $menuTop = $('.MenuTop');
      const $menuDesktop = $('.MenuDesktop');
      if ($menuTop.length) {
        const menuTopHeight = $menuTop.height();
        if (menuTopHeight) {
          menuHeight += menuTopHeight;
        }
      }
      if ($menuDesktop.length) {
        const menuDesktopHeight = $menuDesktop.height();
        if (menuDesktopHeight) {
          menuHeight += menuDesktopHeight;
        }
      }
      if ($el.length && menuHeight) {
        $el.css({
          "max-height": "calc(100vh - " + menuHeight + "px)",
          "overflow": "auto"
        });
      }
    }
  }, {
    key: "setMenuHeight",
    value: function setMenuHeight() {
      let scrollTop = $(window).scrollTop();
      if (typeof scrollTop === "undefined") {
        scrollTop = 0;
      }
      if (scrollTop < 140) {
        if (MenuDesktop.menuPosition === "undefined" || MenuDesktop.menuPosition === "bottom") {
          MenuDesktop.menuPosition = "top";
          MenuDesktop.agrandirMenu();
          MenuDesktop.showTopNav();
        }
      } else {
        if (MenuDesktop.menuPosition === "undefined" || MenuDesktop.menuPosition === "top") {
          MenuDesktop.menuPosition = "bottom";
          MenuDesktop.retrecirMenu();
          MenuDesktop.hideTopNav();
        }
      }
    }
  }, {
    key: "agrandirMenu",
    value: function agrandirMenu() {
      MenuDesktop.$element.removeClass("smallH");
      MenuDesktop.$element.addClass("largeH");
      $(".WindowFilter").removeClass("smallH");
      $(".WindowFilter").addClass("largeH");
      MenuDesktop.menuAppearance = "largeH";
    }
  }, {
    key: "retrecirMenu",
    value: function retrecirMenu() {
      MenuDesktop.$element.removeClass("largeH");
      MenuDesktop.$element.addClass("smallH");
      $(".WindowFilter").removeClass("largeH");
      $(".WindowFilter").addClass("smallH");
      MenuDesktop.menuAppearance = "smallH";
    }
  }, {
    key: "showTopNav",
    value: function showTopNav() {
      if (MenuDesktop.$topNav.height() === 0) {
        gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap.to */ .p8.to(MenuDesktop.$topNav, {
          duration: 0.5,
          height: 40
        });
      }
    }
  }, {
    key: "displayInitialData",
    value: async function displayInitialData() {
      const currentUserData = await window.asyncCurrentUserData;
      if (currentUserData !== null && currentUserData !== void 0 && currentUserData.avatar) {
        $(".Authentication-trigger.MenuDesktop-userLogged").append("<img src='" + currentUserData.avatar + "' alt='" + currentUserData.cname + "'>");
      }
      if (window.asimina && window.asimina.cf.auth) {
        if (window.asimina.cf.auth._myAccountUrl) {
          $(".AuthenticationCard-profile").attr("href", window.asimina.cf.auth._myAccountUrl);
        }
        if (window.asimina.cf.auth._changePassUrl) {
          $(".AuthenticationCard-password").attr("href", window.asimina.cf.auth._changePassUrl);
        }
      }
      this.disconnect();
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      $(".AuthenticationCard-disconnect").on("click", () => {
        window.asimina.cf.auth.logout();
      });
    }
  }, {
    key: "hideTopNav",
    value: function hideTopNav() {
      gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap.to */ .p8.to(MenuDesktop.$topNav, {
        duration: 0.5,
        height: 0
      });
    }
  }]);
  return MenuDesktop;
}();
_defineProperty(MenuDesktop, "element", void 0);
_defineProperty(MenuDesktop, "$element", void 0);
_defineProperty(MenuDesktop, "menuBrand", void 0);
_defineProperty(MenuDesktop, "$menuBrand", void 0);
_defineProperty(MenuDesktop, "$topNav", void 0);
_defineProperty(MenuDesktop, "menuPosition", void 0);
_defineProperty(MenuDesktop, "menuOutTimeout", void 0);
_defineProperty(MenuDesktop, "menuInTimeout", void 0);
_defineProperty(MenuDesktop, "collapseIsVisible", void 0);
_defineProperty(MenuDesktop, "menuAppearance", void 0);

/***/ }),

/***/ "./src/modules/menu/menu-mobile/menu-mobile.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": function() { return /* binding */ MenuMobile; }
/* harmony export */ });
/* harmony import */ var _helper_responsive_responsive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper/responsive/responsive.ts");
/* harmony import */ var _ui_main_overlay_main_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/ui/main-overlay/main-overlay.ts");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/gsap/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



let MenuMobile = /*#__PURE__*/function () {
  function MenuMobile() {
    _classCallCheck(this, MenuMobile);
  }
  _createClass(MenuMobile, null, [{
    key: "init",
    value: function init() {
      MenuMobile.$element = $(".MenuMobile");
      // @ts-ignore
      MenuMobile.element = MenuMobile.$element.get(0);
      MenuMobile.$trigger = $(".burgerIcon");
      MenuMobile.isOpening = false;
      MenuMobile.isClosing = false;
      if (MenuMobile.$element.length) {
        _ui_main_overlay_main_overlay__WEBPACK_IMPORTED_MODULE_1__/* .MainOverlay.addContent */ .i.addContent(MenuMobile.$element);
        MenuMobile.events();
      }
    }
  }, {
    key: "events",
    value: function events() {
      MenuMobile.$trigger.on("click", function () {
        if ($(this).hasClass("open")) {
          MenuMobile.closeSubMenu();
        } else {
          MenuMobile.openSubMenu();
        }
      });
      MenuMobile.$element.find(".MenuMobile-nav-link").on("click", function (event) {
        if (!$(this).attr("href") || $(this).attr("href") === "#") {
          event.preventDefault();
        }
        const $el = $(this).siblings(".collapse");
        if ($('.MenuMobile').hasClass('isCdsVariant')) {
          return;
        }
        const $subNav = $el.find(".MenuMobile-subNav");
        if ($subNav.length) {
          MenuMobile.goToSecondSlide($el);
        }
      });
      MenuMobile.$element.find(".MenuMobile-subHeader").on("click", function (event) {
        event.preventDefault();
        MenuMobile.goToFirstSlide();
      });
      MenuMobile.$element.find(".MenuMobile-subItem-link").on("click", function (event) {
        if (!$(this).attr("href") || $(this).attr("href") === "#") {
          event.preventDefault();
        }
        const el = $(this).siblings(".MenuMobile-subSubNavWrapper");
        MenuMobile.goToThirdSlide(el);
      });
      MenuMobile.$element.find(".MenuMobile-subSubBack").on("click", function () {
        MenuMobile.backToSecondSlide();
      });
      MenuMobile.$element.find(".user-connexion-btn").on("click", function () {
        if ($(this).hasClass("open")) {
          $(this).removeClass("open");
          MenuMobile.$element.find(".ConnexionCart-offline").css({
            opacity: 0,
            visibility: "hidden"
          });
          MenuMobile.$element.find(".ConnexionCart-form").css({
            opacity: 0,
            visibility: "hidden"
          });
          MenuMobile.$element.find(".ConnexionCart-connected").css({
            opacity: 0,
            visibility: "hidden"
          });
          MenuMobile.$element.find(".user-connexion-triangle").css({
            opacity: 0,
            visibility: "hidden"
          });
        } else {
          $(this).addClass("open");
          MenuMobile.$element.find(".user-connexion-triangle").css({
            opacity: 1,
            visibility: "visible"
          });
          if ($(this).hasClass("connected")) {
            MenuMobile.$element.find(".ConnexionCart-connected").css({
              opacity: 1,
              visibility: "visible"
            });
          } else {
            MenuMobile.$element.find(".ConnexionCart-offline").css({
              opacity: 1,
              visibility: "visible"
            });
          }
        }
      });
      MenuMobile.$element.find(".ConnexionCart-close").on("click", function () {
        MenuMobile.$element.find(".user-connexion-btn").removeClass("open");
        MenuMobile.$element.find(".ConnexionCart").css({
          opacity: 0,
          visibility: "hidden"
        });
        MenuMobile.$element.find(".user-connexion-triangle").css({
          opacity: 0,
          visibility: "hidden"
        });
      });
      $("body").on("click", function (e) {
        const targetEl = e.target;
        if (targetEl) {
          const $clickedElement = $(targetEl);
          const cartMenuIsClicked = $clickedElement.closest(".ConnexionCart, .user-connexion-btn").length;
          const menuIsClicked = $clickedElement.closest(MenuMobile.$trigger).length + $clickedElement.closest(MenuMobile.$element).length;
          if (menuIsClicked === 0) {
            MenuMobile.closeSubMenu();
          }
          if (cartMenuIsClicked === 0) {
            if (MenuMobile.$element.find(".user-connexion-btn").hasClass("open")) {
              MenuMobile.$element.find(".user-connexion-btn").removeClass("open");
              MenuMobile.$element.find(".ConnexionCart-offline").css({
                opacity: 0,
                visibility: "hidden"
              });
              MenuMobile.$element.find(".ConnexionCart-connected").css({
                opacity: 0,
                visibility: "hidden"
              });
              MenuMobile.$element.find(".ConnexionCart-form").css({
                opacity: 0,
                visibility: "hidden"
              });
              MenuMobile.$element.find(".user-connexion-triangle").css({
                opacity: 0,
                visibility: "hidden"
              });
            }
          }
        }
      });
      MenuMobile.$element.find(".ConnexionCart-offline .ConnexionCart-btn > button").on("click", function () {
        MenuMobile.$element.find(".ConnexionCart-offline").css({
          opacity: 0,
          visibility: "hidden"
        });
        MenuMobile.$element.find(".ConnexionCart-form").css({
          opacity: 1,
          visibility: "visible"
        });
      });
      $(window).on('orientationchange', function () {
        MenuMobile.closeSubMenu();
        _ui_main_overlay_main_overlay__WEBPACK_IMPORTED_MODULE_1__/* .MainOverlay.hideOverlay */ .i.hideOverlay();
      });
      _helper_responsive_responsive__WEBPACK_IMPORTED_MODULE_0__/* .Responsive.onWindowResize */ .E.onWindowResize(function () {
        if (!_helper_responsive_responsive__WEBPACK_IMPORTED_MODULE_0__/* .Responsive.isMax */ .E.isMax('maxMd')) {
          MenuMobile.closeSubMenu();
          _ui_main_overlay_main_overlay__WEBPACK_IMPORTED_MODULE_1__/* .MainOverlay.hideOverlay */ .i.hideOverlay();
        } else {
          if (!MenuMobile.$trigger.hasClass('open')) MenuMobile.goToFirstSlide();
        }
      });
    }
  }, {
    key: "getMenuMaxHeight",
    value: function getMenuMaxHeight() {
      const MenuMobileHeight = MenuMobile.$element.height();
      if (MenuMobileHeight) {
        return _helper_responsive_responsive__WEBPACK_IMPORTED_MODULE_0__/* .Responsive.windowHeight */ .E.windowHeight() - MenuMobileHeight;
      }
      return _helper_responsive_responsive__WEBPACK_IMPORTED_MODULE_0__/* .Responsive.windowHeight */ .E.windowHeight();
    }
  }, {
    key: "openSubMenu",
    value: function openSubMenu() {
      if (MenuMobile.$trigger.hasClass("open") || MenuMobile.isClosing) {
        return;
      }
      MenuMobile.isOpening = true;
      _ui_main_overlay_main_overlay__WEBPACK_IMPORTED_MODULE_1__/* .MainOverlay.showOverlay */ .i.showOverlay(MenuMobile.$trigger, true);
      $(document).trigger("MenuMobile:opening");
      gsap__WEBPACK_IMPORTED_MODULE_2__/* .gsap.to */ .p8.to(MenuMobile.$element.find(".MenuMobile-wrapper"), {
        duration: 0.5,
        y: MenuMobile.getCollapsedMenuMobileHeight() + "px",
        autoAlpha: 1,
        onStart() {
          MenuMobile.$element.find(".MenuMobile-wrapper").css("max-height", "calc(100vh - " + MenuMobile.getCollapsedMenuMobileHeight() + "px)");
        },
        onComplete() {
          MenuMobile.addScroll(MenuMobile.$element.find(".MenuMobile-collapse"));
          $(document).trigger("MenuMobile:open");
          MenuMobile.isOpening = false;
        }
      });
      MenuMobile.$trigger.addClass("open");
    }
  }, {
    key: "getCollapsedMenuMobileHeight",
    value: function getCollapsedMenuMobileHeight() {
      let height = 0;
      const $menuMobile = $(".MenuMobile");
      const menuMobileHeight = $menuMobile.height();
      if (menuMobileHeight) {
        height += menuMobileHeight;
      }
      const $navSearchV3 = $(".JS-nav-search-v3");
      const $searchV3Input = $(".JS-nav-search-v3-input-area");
      const searchV3InputHeight = $searchV3Input.height();
      const navSearchV3Height = $navSearchV3.height();
      if (searchV3InputHeight && navSearchV3Height) {
        height += Math.min(searchV3InputHeight, navSearchV3Height);
      }
      return height;
    }
  }, {
    key: "closeSubMenu",
    value: function closeSubMenu() {
      if (!MenuMobile.$trigger.hasClass("open") || MenuMobile.isOpening) {
        return;
      }
      MenuMobile.isClosing = true;
      _ui_main_overlay_main_overlay__WEBPACK_IMPORTED_MODULE_1__/* .MainOverlay.hideOverlay */ .i.hideOverlay();
      $(document).trigger("MenuMobile:closing");
      gsap__WEBPACK_IMPORTED_MODULE_2__/* .gsap.to */ .p8.to(MenuMobile.$element.find(".MenuMobile-wrapper"), {
        duration: 0.5,
        y: "-100%",
        autoAlpha: 0,
        onComplete() {
          MenuMobile.goToFirstSlide();
          MenuMobile.$element.find(".MenuMobile-wrapper").removeClass('isScrollable');
          $(document).trigger("MenuMobile:close");
          MenuMobile.isClosing = false;
        }
      });
      MenuMobile.$trigger.removeClass("open");
    }
  }, {
    key: "goToSecondSlide",
    value: function goToSecondSlide(elementToShow) {
      $(".MenuMobile-nav-panel").css({
        opacity: "0",
        visibility: "hidden"
      });
      elementToShow.css({
        opacity: "1",
        visibility: "visible"
      });
      MenuMobile.addScroll(elementToShow);
      let height = elementToShow.height();
      if (height) {
        $('.MenuMobile-wrapper').height(height);
      }
      if ($("html").attr("dir") === "rtl") {
        gsap__WEBPACK_IMPORTED_MODULE_2__/* .gsap.to */ .p8.to(MenuMobile.$element.find(".MenuMobile-collapse"), {
          duration: 0.5,
          x: "100%"
        });
      } else {
        gsap__WEBPACK_IMPORTED_MODULE_2__/* .gsap.to */ .p8.to(MenuMobile.$element.find(".MenuMobile-collapse"), {
          duration: 0.5,
          x: "-100%"
        });
      }
    }
  }, {
    key: "goToFirstSlide",
    value: function goToFirstSlide() {
      MenuMobile.addScroll(MenuMobile.$element.find(".MenuMobile-collapse"));
      gsap__WEBPACK_IMPORTED_MODULE_2__/* .gsap.to */ .p8.to(MenuMobile.$element.find(".MenuMobile-collapse"), {
        duration: 0.5,
        x: "0%"
      });
    }
  }, {
    key: "goToThirdSlide",
    value: function goToThirdSlide(elementToShow) {
      $(".MenuMobile-subSubNavWrapper").css({
        opacity: "0",
        visibility: "hidden"
      });
      MenuMobile.addScroll(elementToShow);
      elementToShow.css({
        opacity: "1",
        visibility: "visible"
      });
      if ($("html").attr("dir") === "rtl") {
        gsap__WEBPACK_IMPORTED_MODULE_2__/* .gsap.to */ .p8.to(MenuMobile.$element.find(".MenuMobile-collapse"), {
          duration: 0.5,
          x: "200%"
        });
      } else {
        gsap__WEBPACK_IMPORTED_MODULE_2__/* .gsap.to */ .p8.to(MenuMobile.$element.find(".MenuMobile-collapse"), {
          duration: 0.5,
          x: "-200%"
        });
      }
    }
  }, {
    key: "backToSecondSlide",
    value: function backToSecondSlide() {
      if ($("html").attr("dir") === "rtl") {
        gsap__WEBPACK_IMPORTED_MODULE_2__/* .gsap.to */ .p8.to(MenuMobile.$element.find(".MenuMobile-collapse"), {
          duration: 0.5,
          x: "100%"
        });
      } else {
        gsap__WEBPACK_IMPORTED_MODULE_2__/* .gsap.to */ .p8.to(MenuMobile.$element.find(".MenuMobile-collapse"), {
          duration: 0.5,
          x: "-100%"
        });
      }
    }
  }, {
    key: "addScroll",
    value: function addScroll($elementToShow) {
      let height = $elementToShow.height();
      let $menuMobileWrapper = $('.MenuMobile-wrapper');
      let maxHeight = MenuMobile.getMenuMaxHeight();
      if (height) {
        $menuMobileWrapper.height(height);
        if (height > maxHeight) {
          $menuMobileWrapper.height("").addClass('isScrollable');
        } else {
          $menuMobileWrapper.height(height).removeClass('isScrollable');
        }
      }
    }
  }]);
  return MenuMobile;
}();
_defineProperty(MenuMobile, "element", void 0);
_defineProperty(MenuMobile, "$element", void 0);
_defineProperty(MenuMobile, "$trigger", void 0);
_defineProperty(MenuMobile, "isOpening", void 0);
_defineProperty(MenuMobile, "isClosing", void 0);

/***/ }),

/***/ "./src/modules/menu/menu.module.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Authentication": function() { return /* reexport */ authentication/* Authentication */.V; },
  "LinkHighlighting": function() { return /* reexport */ LinkHighlighting; },
  "MenuDesktop": function() { return /* reexport */ menu_desktop/* MenuDesktop */.W; },
  "MenuManager": function() { return /* reexport */ MenuManager; },
  "MenuMobile": function() { return /* reexport */ menu_mobile/* MenuMobile */.X; }
});

// EXTERNAL MODULE: ./src/modules/helper/responsive/responsive.ts
var responsive = __webpack_require__("./src/modules/helper/responsive/responsive.ts");
;// CONCATENATED MODULE: ./src/modules/menu/menu-manager/menu-manager.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

let MenuManager = /*#__PURE__*/function () {
  function MenuManager() {
    _classCallCheck(this, MenuManager);
  }
  _createClass(MenuManager, null, [{
    key: "init",
    value: function init() {
      MenuManager.$element = $(".JS-MenuManager");
      MenuManager.element = MenuManager.$element.get(0);
      MenuManager.setMarginToBody();
      MenuManager.events();
    }
  }, {
    key: "events",
    value: function events() {
      const _this = this;
      $(window).on("resize orientationchange", function () {
        _this.setMarginToBody();
      });
      $(document).on("MenuManager:resize", function () {
        _this.setMarginToBody();
      });
    }
  }, {
    key: "setMarginToBody",
    value: function setMarginToBody() {
      if ($(".JS-nav-search-v3").length) {
        this.setMarginToBodySearchV3();
      } else {
        this.setMarginToBodyDefault();
      }
    }
  }, {
    key: "setMarginToBodySearchV3",
    value: function setMarginToBodySearchV3() {
      let headerHeight = 0;
      if (!responsive/* Responsive.isMax */.E.isMax('maxMd')) {
        // en desktop
        headerHeight = MenuManager.getMenuTopHeight() + MenuManager.getMenuDesktopHeight() + 88;
        headerHeight -= 140; // on retire 140 car il y a deja un padding top de 140 par défaut équivalent à la hauteur de menu desktop sur le body
      } else {
        // en mobile
        headerHeight = MenuManager.getMenuMobileHeight() + 78; // 78 correspond à la hauteur de la zone d'input de la recherche intégrée au menu
        headerHeight -= 50; // on retire 50 car il y a deja un padding top de 50 par défaut équivalent à la hauteur de menu mobile sur le body
      }

      $('body').css("margin-top", headerHeight);
    }
  }, {
    key: "setMarginToBodyDefault",
    value: function setMarginToBodyDefault() {
      let headerHeight = MenuManager.$element.height();
      if (!responsive/* Responsive.isMax */.E.isMax('maxMd')) {
        // en desktop
        // 2 cas possibles : on est en haute de page le menu est grand || on est en mobile le menu est réduit
        if ($('.smallH').length) {
          // si le menu est réduit il y a un biais, il faut rajouter la différente avec le menu grand
          headerHeight += 81;
        }
        headerHeight -= 140; // on retire 140 car il y a deja un padding top de 140 par défaut équivalent à la hauteur de menu desktop sur le body
      } else {
        // en mobile
        headerHeight -= 50; // on retire 50 car il y a deja un padding top de 50 par défaut équivalent à la hauteur de menu mobile sur le body
      }

      if ($('body.hasSearchRefresh').length) {
        // on ne fait rien
      } else {
        $('body').css("margin-top", headerHeight);
      }
    }
  }, {
    key: "getMenuTopHeight",
    value: function getMenuTopHeight() {
      const $topbar = $('.MenuTop');
      if ($topbar.length) {
        return $topbar.height();
      }
      return 0;
    }
  }, {
    key: "getMenuMobileHeight",
    value: function getMenuMobileHeight() {
      const $menuMobile = $('.MenuMobile');
      if ($menuMobile.length) {
        return $menuMobile.height();
      }
      return 0;
    }
  }, {
    key: "getMenuDesktopHeight",
    value: function getMenuDesktopHeight() {
      const $menuDesktop = $('.MenuDesktop');
      if ($menuDesktop.length) {
        return $menuDesktop.height();
      }
      return 0;
    }
  }]);
  return MenuManager;
}();
_defineProperty(MenuManager, "element", void 0);
_defineProperty(MenuManager, "$element", void 0);
// EXTERNAL MODULE: ./src/modules/menu/menu-desktop/menu-desktop.ts
var menu_desktop = __webpack_require__("./src/modules/menu/menu-desktop/menu-desktop.ts");
// EXTERNAL MODULE: ./src/modules/menu/menu-mobile/menu-mobile.ts
var menu_mobile = __webpack_require__("./src/modules/menu/menu-mobile/menu-mobile.ts");
// EXTERNAL MODULE: ./src/modules/authentication/authentication.ts
var authentication = __webpack_require__("./src/modules/authentication/authentication.ts");
;// CONCATENATED MODULE: ./src/modules/ link-highlighting/ link-highlighting.ts
function _link_highlighting_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _link_highlighting_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _link_highlighting_toPropertyKey(descriptor.key), descriptor); } }
function _link_highlighting_createClass(Constructor, protoProps, staticProps) { if (protoProps) _link_highlighting_defineProperties(Constructor.prototype, protoProps); if (staticProps) _link_highlighting_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _link_highlighting_toPropertyKey(arg) { var key = _link_highlighting_toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _link_highlighting_toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
let LinkHighlighting = /*#__PURE__*/function () {
  function LinkHighlighting() {
    _link_highlighting_classCallCheck(this, LinkHighlighting);
  }
  _link_highlighting_createClass(LinkHighlighting, null, [{
    key: "init",
    value: function init() {
      if ($(".JS-MenuManager").length) {
        LinkHighlighting.findPageType();
      }
    }
  }, {
    key: "findPageType",
    value: function findPageType() {
      // on recupère l'entrée "page_type" du dataLayer
      if (typeof window.dataLayer === 'object') {
        let toContinue = true;
        $.each(window.dataLayer, function (index, value) {
          if (toContinue && 'page_type' in value && value.page_type) {
            toContinue = false;
            LinkHighlighting.hightlight(value.page_type);
          }
        });
      }
    }
  }, {
    key: "hightlight",
    value: function hightlight(pageType) {
      const $navItems = $('.MenuDesktop-nav-item');
      let toContinue = true;
      $navItems.each(function (index, element) {
        const $item = $(element);
        const linkLabel = $item.find('.MenuDesktop-nav-link').text();
        if (toContinue && LinkHighlighting.checkMatching(pageType, linkLabel)) {
          toContinue = false;
          $item.addClass('isActive');
        }
      });
    }
  }, {
    key: "checkMatching",
    value: function checkMatching(term1, term2) {
      if (LinkHighlighting.cleanString(term1) === LinkHighlighting.cleanString(term2)) {
        return true;
      }
      return false;
    }
  }, {
    key: "cleanString",
    value: function cleanString(term) {
      const res = term.trim();
      if (res) {
        return res.toLowerCase();
      }
      return "";
    }
  }]);
  return LinkHighlighting;
}();
;// CONCATENATED MODULE: ./src/modules/menu/menu.module.ts







/***/ })

}]);