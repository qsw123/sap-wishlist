'use strict';

angular.module('ds.wishlist')
    .factory('WishlistSvc', ['WishlistREST','ProductSvc'
        function(WishlistREST, ProductSvc){
            return {
                createWishlist: function (newWishlist) {
                    WishlistREST.Wishlist.all('wishlists').post(newWishlist);
                    this.wishlistId = newWishlist.id;
                };

                getWishList: function () {
                    var wishlist = WishlistREST.Wishlist.one('wishlists', this.wishlistId);
                    return wishlist;
                }	
        }}]);