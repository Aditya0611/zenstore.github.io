function attributeToString(t){return"string"!=typeof t&&("undefined"===(t+="")&&(t="")),jQuery.trim(t)}"undefined"==typeof ShopifyAPI&&(ShopifyAPI={}),ShopifyAPI.onCartUpdate=function(t){},ShopifyAPI.updateCartNote=function(t,e){var a={type:"POST",url:"/cart/update.js",data:"note="+attributeToString(t),dataType:"json",success:function(t){"function"==typeof e?e(t):ShopifyAPI.onCartUpdate(t)},error:function(t,e){ShopifyAPI.onError(t,e)}};jQuery.ajax(a)},ShopifyAPI.onError=function(XMLHttpRequest,textStatus){var data=eval("("+XMLHttpRequest.responseText+")");data.message&&alert(data.message+"("+data.status+"): "+data.description)},ShopifyAPI.addItemFromForm=function(t,e,a){var r={type:"POST",url:"/cart/add.js",data:jQuery(t).serialize(),dataType:"json",success:function(a){"function"==typeof e?e(a,t):ShopifyAPI.onItemAdded(a,t)},error:function(t,e){"function"==typeof a?a(t,e):ShopifyAPI.onError(t,e)}};jQuery.ajax(r)},ShopifyAPI.getCart=function(t){jQuery.getJSON("/cart.js",(function(e,a){"function"==typeof t?t(e):ShopifyAPI.onCartUpdate(e)}))},ShopifyAPI.changeItem=function(t,e,a){var r={type:"POST",url:"/cart/change.js",data:"quantity="+e+"&line="+t,dataType:"json",success:function(t){"function"==typeof a?a(t):ShopifyAPI.onCartUpdate(t)},error:function(t,e){ShopifyAPI.onError(t,e)}};jQuery.ajax(r)};var ajaxCart=function(module,$){"use strict";var init,loadCart,settings,isUpdating,$body,$formContainer,$addToCart,$cartCountSelector,$cartCostSelector,$cartContainer,$drawerContainer,updateCountPrice,formOverride,itemAddedCallback,itemErrorCallback,cartUpdateCallback,buildCart,cartCallback,adjustCart,adjustCartCallback,createQtySelectors,qtySelectors,validateQty;return init=function(t){settings={formSelector:'form[action^="/cart/add"]',cartContainer:"#CartContainer",addToCartSelector:".enj-add-to-cart-btn",cartCountSelector:null,cartCostSelector:null,moneyFormat:"$",disableAjaxCart:!1,enableQtySelectors:!0},$.extend(settings,t),$formContainer=$(settings.formSelector),$cartContainer=$(settings.cartContainer),$addToCart=$formContainer.find(settings.addToCartSelector),$cartCountSelector=$(settings.cartCountSelector),$cartCostSelector=$(settings.cartCostSelector),$body=$("body"),isUpdating=!1,settings.enableQtySelectors&&qtySelectors(),!settings.disableAjaxCart&&$addToCart.length&&formOverride(),adjustCart()},loadCart=function(){$body.addClass("drawer--is-loading"),ShopifyAPI.getCart(cartUpdateCallback)},updateCountPrice=function(t){$cartCountSelector&&($cartCountSelector.html(t.item_count).removeClass("hidden-count"),0===t.item_count&&$cartCountSelector.addClass("hidden-count")),$cartCostSelector&&$cartCostSelector.html(Shopify.formatMoney(t.total_price,settings.moneyFormat))},formOverride=function(){$formContainer.on("submit",(function(t){t.preventDefault();var e=$(this).find(settings.addToCartSelector);e.removeClass("is-added").addClass("is-adding"),e.find("i").replaceWith('<i class="enj-loader-add-to-cart"><svg xml:space="preserve" style="enable-background:new 0 0 50 50;margin-top: -1px;" viewBox="0 0 24 30" height="20px" width="21px" y="0px" x="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Layer_1" version="1.1"><rect opacity="0.2" fill="#fff" height="8" width="3" y="10" x="0"><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect><rect opacity="0.2" fill="#fff" height="8" width="3" y="10" x="8">      <animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect><rect opacity="0.2" fill="#fff" height="8" width="3" y="10" x="16"><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect></svg></i>'),$(".qty-error").remove(),ShopifyAPI.addItemFromForm(t.target,itemAddedCallback,itemErrorCallback)}))},itemAddedCallback=function(t,e){var a=$(e).find(settings.addToCartSelector);a.removeClass("is-adding").addClass("is-added"),a.find(".enj-loader-add-to-cart").html('<i class="fa fa-check"></i>'),$(".product-popup").find(".product-name").html(t.title),$(".product-popup").find(".product-image img").attr("src",t.image),showPopup(".product-popup"),ShopifyAPI.getCart(cartUpdateCallback)},itemErrorCallback=function(XMLHttpRequest,textStatus){var data=eval("("+XMLHttpRequest.responseText+")");$addToCart.removeClass("is-adding is-added"),$addToCart.find(".enj-loader-add-to-cart").remove(),data.message&&422==data.status&&$formContainer.after('<div class="errors qty-error">'+data.description+"</div>")},cartUpdateCallback=function(t){updateCountPrice(t),buildCart(t)},buildCart=function(t){if($cartContainer.empty(),0===t.item_count)return $cartContainer.append("<p>Your cart is currently empty.</p>"),void cartCallback(t);var e,a=[],r={},i=$("#CartTemplate").html(),n=Handlebars.compile(i);$.each(t.items,(function(t,e){if(null!=e.image)var i=e.image.replace(/(\.[^.]*)$/,"_small$1").replace("http:","");else i="//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif";r={id:e.variant_id,line:t+1,url:e.url,img:i,name:e.product_title,variation:e.variant_title,properties:e.properties,itemAdd:e.quantity+1,itemMinus:e.quantity-1,itemQty:e.quantity,price:Shopify.formatMoney(e.price,settings.moneyFormat),vendor:e.vendor},a.push(r)})),e={items:a,note:t.note,count:t.item_count,totalPrice:Shopify.formatMoney(t.total_price,settings.moneyFormat)},$cartContainer.append(n(e)),cartCallback(t)},cartCallback=function(t){$body.removeClass("drawer--is-loading"),$body.trigger("ajaxCart.afterCartLoad",t)},adjustCart=function(){$body.on("click",".ajaxcart__qty-adjust",(function(){var t=$(this),e=t.data("line"),a=t.siblings(".ajaxcart__qty-num"),r=parseInt(a.val().replace(/\D/g,""));r=validateQty(r);t.hasClass("ajaxcart__qty--plus")?r+=1:(r-=1)<=0&&(r=0),console.log("Qty: "+r),e?function(t,e){isUpdating=!0;var a=$('.ajaxcart__row[data-line="'+t+'"]').addClass("is-loading");0===e&&a.parent().addClass("is-removed"),setTimeout((function(){ShopifyAPI.changeItem(t,e,adjustCartCallback)}),250)}(e,r):a.val(r)})),$body.on("submit","form.ajaxcart",(function(t){isUpdating&&t.preventDefault()})),$body.on("focus",".ajaxcart__qty-adjust",(function(){var t=$(this);setTimeout((function(){t.select()}),50)})),$body.on("change",'textarea[name="note"]',(function(){var t=$(this).val();ShopifyAPI.updateCartNote(t,(function(t){}))}))},adjustCartCallback=function(t){isUpdating=!1,updateCountPrice(t),setTimeout((function(){ShopifyAPI.getCart(buildCart)}),150)},createQtySelectors=function(){$('input[type="number"]',$cartContainer).length&&$('input[type="number"]',$cartContainer).each((function(){var t=$(this),e=t.val(),a=e+1,r=e-1,i=e,n=$("#AjaxQty").html(),o=Handlebars.compile(n),d={id:t.data("id"),itemQty:i,itemAdd:a,itemMinus:r};t.after(o(d)).remove()}))},qtySelectors=function(){var t=$('input[type="number"]');t.length&&(t.each((function(){var t=$(this),e=t.val(),a=t.attr("name"),r=t.attr("id"),i=e+1,n=e-1,o=e,d=$("#JsQty").html(),s=Handlebars.compile(d),c={id:t.data("id"),itemQty:o,itemAdd:i,itemMinus:n,inputName:a,inputId:r};t.after(s(c)).remove()})),$(".js-qty__adjust").on("click",(function(){var t=$(this),e=(t.data("id"),t.siblings(".js-qty__num")),a=parseInt(e.val().replace(/\D/g,""));a=validateQty(a);t.hasClass("js-qty__adjust--plus")?(a+=1,console.log(a),updatePricingQty(a)):((a-=1)<=1&&(a=1),updatePricingQty(a)),e.val(a)})))},validateQty=function(t){return parseFloat(t)==parseInt(t)&&!isNaN(t)||(t=1),t},module={init:init,load:loadCart},module}(ajaxCart||{},jQuery);