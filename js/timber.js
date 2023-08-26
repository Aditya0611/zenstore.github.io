function replaceUrlParam(e,t,r){var i=new RegExp("("+t+"=).*?(&|$)"),o=e;return e.search(i)>=0?e.replace(i,"$1"+r+"$2"):o+(o.indexOf("?")>0?"&":"?")+t+"="+r}function currencyConverter(e){Currency.format="money_with_currency_format";var t=Currency.cookie.read();Currency.convert(e,shopCurrency,t);return e}function currencyCallback(e){jQuery(e).each((function(){jQuery(this).attr("data-currency-USD",jQuery(this).html())})),Currency.convertAll(shopCurrency,Currency.cookie.read(),e,"money_format")}function updatePricingQty(e){Currency.format="money_with_currency_format";Currency.cookie.read();var t=$("#productSelect option:selected"),r=/([0-9]+[.|,][0-9]+[.|,][0-9]+)/g,i=$(t).text().match(r);if(i||(r=/([0-9]+[.|,][0-9]+)/g,i=$(t).text().match(r)),i){var o=i[0].replace(/[.|,]/g,"")*(e||parseInt($("#Quantity").val(),10)),n=Shopify.formatMoney(o,window.money_format);r=/([0-9]+[.|,][0-9]+[.|,][0-9]+)/g,n.match(r)||(r=/([0-9]+[.|,][0-9]+)/g),n=n.match(r)[0];var a=$(".engoj_price_main");r=/([0-9]+[.|,][0-9]+[.|,][0-9]+)/g,a.text().match(r)||(r=/([0-9]+[.|,][0-9]+)/g),a=a.text().match(r)[0];var s=new RegExp(a,"g"),c=$(".engoj_price_main").html().replace(s,n);$(".engoj_price_main").html(c)}}function showPopup(e){$(e).addClass("active")}function hidePopup(e){$(e).removeClass("active")}!function(e){e.fn.prepareTransition=function(){return this.each((function(){var t=e(this);t.one("TransitionEnd webkitTransitionEnd transitionend oTransitionEnd",(function(){t.removeClass("is-transitioning")}));var r=0;e.each(["transition-duration","-moz-transition-duration","-webkit-transition-duration","-o-transition-duration"],(function(e,i){r=parseFloat(t.css(i))||r})),0!=r&&(t.addClass("is-transitioning"),t[0].offsetWidth)}))}}(jQuery),"undefined"==typeof Shopify&&(Shopify={}),Shopify.formatMoney||(Shopify.formatMoney=function(e,t){var r="",i=/\{\{\s*(\w+)\s*\}\}/,o=t||this.money_format;function n(e,t){return void 0===e?t:e}function a(e,t,r,i){if(t=n(t,2),r=n(r,","),i=n(i,"."),isNaN(e)||null==e)return 0;var o=(e=(e/100).toFixed(t)).split(".");return o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+r)+(o[1]?i+o[1]:"")}switch("string"==typeof e&&(e=e.replace(".","")),o.match(i)[1]){case"amount":r=a(e,2);break;case"amount_no_decimals":r=a(e,0);break;case"amount_with_comma_separator":r=a(e,2,".",",");break;case"amount_no_decimals_with_comma_separator":r=a(e,0,".",",")}return o.replace(i,r)}),Shopify.getProduct=function(e,t){jQuery.getJSON("/products/"+e+".js",(function(e,r){"function"==typeof t?t(e):Shopify.onProduct(e)}))},Shopify.resizeImage=function(e,t){try{if("original"==t)return e;var r=e.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);return r[1]+"_"+t+"."+r[2]}catch(t){return e}},window.timber=window.timber||{},timber.cacheSelectors=function(){timber.cache={$html:$("html"),$body:$("body"),$navigation:$("#AccessibleNav"),$mobileSubNavToggle:$(".mobile-nav__toggle"),$changeView:$(".engoj-view-mode"),$productImage:$("#ProductPhotoImg"),$thumbImages:$("#ProductThumbs").find("a.product-single__thumbnail"),$recoverPasswordLink:$("#RecoverPassword"),$hideRecoverPasswordLink:$("#HideRecoverPasswordLink"),$recoverPasswordForm:$("#RecoverPasswordForm"),$customerLoginForm:$("#CustomerLoginForm"),$passwordResetSuccess:$("#ResetSuccess")}},timber.init=function(){FastClick.attach(document.body),timber.cacheSelectors(),timber.accessibleNav(),timber.drawersInit(),timber.mobileNavToggle(),timber.productImageSwitch(),timber.responsiveVideos(),timber.collectionViews(),timber.loginForms()},timber.accessibleNav=function(){var e=timber.cache.$navigation,t=e.find("a"),r=e.children("li").find("a"),i=e.find(".site-nav--has-dropdown"),o=e.find(".site-nav__dropdown").find("a"),n="nav-hover",a="nav-focus";function s(e){e.removeClass(n),timber.cache.$body.off("touchstart")}function c(e){e.addClass(a)}function d(e){e.removeClass(a)}i.on("mouseenter touchstart",(function(e){var t=$(this);t.hasClass(n)||e.preventDefault(),function(e){e.addClass(n),setTimeout((function(){timber.cache.$body.on("touchstart",(function(){s(e)}))}),250)}(t)})),i.on("mouseleave",(function(){s($(this))})),o.on("touchstart",(function(e){e.stopImmediatePropagation()})),t.focus((function(){!function(e){e.next("ul").hasClass("sub-nav");var t=$(".site-nav__dropdown").has(e).length;t?c(e.closest(".site-nav--has-dropdown").find("a")):(d(r),c(e))}($(this))})),t.blur((function(){d(r)}))},timber.drawersInit=function(){timber.LeftDrawer=new timber.Drawers("NavDrawer","left"),timber.RightDrawer=new timber.Drawers("CartDrawer","right",{onDrawerOpen:ajaxCart.load})},timber.mobileNavToggle=function(){timber.cache.$mobileSubNavToggle.on("click",(function(){$(this).parent().toggleClass("mobile-nav--expanded")}))},timber.getHash=function(){return window.location.hash},timber.productPage=function(e){var t=e.money_format,r=e.variant,i=(e.selector,$("#ProductPhotoImg")),o=$("#AddToCart"),n=$("#ProductPrice"),a=$("#ComparePrice"),s=$(".quantity-selector, label + .js-qty"),c=$("#AddToCartText");if(r){if(r.featured_image){var d=r.featured_image,u=i[0];Shopify.Image.switchImage(d,u,timber.switchImage)}r.available?(o.removeClass("disabled").prop("disabled",!1),c.html("translation missing: en.products.product.add_to_cart"),s.show()):(o.addClass("disabled").prop("disabled",!0),c.html("Sold Out"),s.hide()),n.html(Shopify.formatMoney(r.price,t)),r.compare_at_price>r.price?a.html("Compare at "+Shopify.formatMoney(r.compare_at_price,t)).show():a.hide()}else o.addClass("disabled").prop("disabled",!0),c.html("Unavailable"),s.hide()},timber.productImageSwitch=function(){timber.cache.$thumbImages.length&&timber.cache.$thumbImages.on("click",(function(e){e.preventDefault();var t=$(this).attr("href");timber.switchImage(t,null,timber.cache.$productImage)}))},timber.switchImage=function(e,t,r){$(r).attr("src",e)},timber.responsiveVideos=function(){var e=$('iframe[src*="youtube.com/embed"], iframe[src*="player.vimeo"]'),t=e.add("iframe#admin_bar_iframe");e.each((function(){$(this).wrap('<div class="video-wrapper"></div>')})),t.each((function(){this.src=this.src}))},timber.collectionViews=function(){timber.cache.$changeView.length&&timber.cache.$changeView.on("click",(function(){var e=$(this).data("view"),t=document.URL,r=t.indexOf("?")>-1;window.location=r?replaceUrlParam(t,"view",e):t+"?view="+e}))},timber.loginForms=function(){function e(){timber.cache.$recoverPasswordForm.show(),timber.cache.$customerLoginForm.hide()}timber.cache.$recoverPasswordLink.on("click",(function(t){t.preventDefault(),e()})),timber.cache.$hideRecoverPasswordLink.on("click",(function(e){e.preventDefault(),timber.cache.$recoverPasswordForm.hide(),timber.cache.$customerLoginForm.show()})),"#recover"==timber.getHash()&&e()},timber.resetPasswordSuccess=function(){timber.cache.$passwordResetSuccess.show()},timber.Drawers=function(){var e=function(e,t,r){var i={close:".js-drawer-close",open:".js-drawer-open-"+t,openClass:"js-drawer-open",dirOpenClass:"js-drawer-open-"+t};if(this.$nodes={parent:$("body, html"),page:$("#PageContainer"),moved:$(".is-moved-by-drawer")},this.config=$.extend(i,r),this.position=t,this.$drawer=$("#"+e),!this.$drawer.length)return!1;this.drawerIsOpen=!1,this.init()};return e.prototype.init=function(){$(this.config.open).on("click",$.proxy(this.open,this)),this.$drawer.find(this.config.close).on("click",$.proxy(this.close,this))},e.prototype.open=function(e){var t=!1;if(e?e.preventDefault():t=!0,e&&e.stopPropagation&&(e.stopPropagation(),this.$activeSource=$(e.currentTarget)),this.drawerIsOpen&&!t)return this.close();this.$nodes.moved.addClass("is-transitioning"),this.$drawer.prepareTransition(),this.$nodes.parent.addClass(this.config.openClass+" "+this.config.dirOpenClass),this.drawerIsOpen=!0,this.trapFocus(this.$drawer,"drawer_focus"),this.config.onDrawerOpen&&"function"==typeof this.config.onDrawerOpen&&(t||this.config.onDrawerOpen()),this.$activeSource&&this.$activeSource.attr("aria-expanded")&&this.$activeSource.attr("aria-expanded","true"),this.$nodes.page.on("touchmove.drawer",(function(){return!1})),this.$nodes.page.on("click.drawer",$.proxy((function(){return this.close(),!1}),this))},e.prototype.close=function(){this.drawerIsOpen&&($(document.activeElement).trigger("blur"),this.$nodes.moved.prepareTransition({disableExisting:!0}),this.$drawer.prepareTransition({disableExisting:!0}),this.$nodes.parent.removeClass(this.config.dirOpenClass+" "+this.config.openClass),this.drawerIsOpen=!1,this.removeTrapFocus(this.$drawer,"drawer_focus"),this.$nodes.page.off(".drawer"))},e.prototype.trapFocus=function(e,t){var r=t?"focusin."+t:"focusin";e.attr("tabindex","-1"),e.focus(),$(document).on(r,(function(t){e[0]!==t.target&&!e.has(t.target).length&&e.focus()}))},e.prototype.removeTrapFocus=function(e,t){var r=t?"focusin."+t:"focusin";e.removeAttr("tabindex"),$(document).off(r)},e}(),$(timber.init),window.showPopup=showPopup;