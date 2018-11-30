'use strict';

(function(window) {
    function myLibrary() {
        const catalog = createRandomCatalog(100);
        



        return {
            searchProductById: searchProductById,
            searchProductsByPrice: searchProductsByPrice,
            searchProductsByType: searchProductsByType,
            searchAllProducts: searchAllProducts
        }

        // Returns a promise containing products within a range 
        // price - difference and price + difference
        function searchProductsByPrice(price, difference) {
            let productsByPrice;
            
            productsByPrice = new Promise(function(resolve, reject) {
                let products = [];

                if(!isFinite(price) || price < 0) {
                    reject("Invalid price: " + price);
                }
                else {
                    console.log(price);
                    setTimeout(function() {
                        catalog.forEach(function(item) {
                            if(Math.abs(price - item.price) < difference) {
                                products.push(item);
                            }
                        })
        
                        if(products.length > 0) {
                            resolve(products);
                        }
                        else {
                            reject("No products in the range " + price + " +- " + difference);
                        }
                    }, 1000);
                }
                
            })

            return productsByPrice;
        }

        // Returns a promise containing products with their type attribute
        // equal to the type given as parameter to the function
        function searchProductsByType(type) {

            let productsByType = new Promise(function(resolve, reject) {
                let products = [];
                let possibleTypes = ['Book', 'Clothing', 'Electronics', 'Food'];
                let pattern = new RegExp('^' + type, "i");
                let validType;

                possibleTypes.forEach(function(possibleType) {
                    if(pattern.test(possibleType) === true) {
                        validType = possibleType;
                    }
                })

                if(validType === undefined) {
                    reject("Invalid type: " + type);
                }
                else {
                    setTimeout(function() {
                        catalog.forEach(function(item) {
                            if((item.type).toLowerCase() == validType.toLowerCase()) {
                                products.push(item);
                            }
                        });

                        resolve(products);
                    }, 1000);
                    
                }
            
            })

            return productsByType;
        }

        // Returns a promise the product with id as the 
        // id given as parameter to the function
        function searchProductById(id) {
            let product;
            let productById;

            catalog.forEach(function(item) {
                if(item.id == id) {
                    product = item;
                }
            })

            productById = new Promise(function(resolve, reject) {
                setTimeout(function() {
                    if(product !== undefined) {
                        resolve(product);
                    }
                    else {
                        console.log(id);
                        reject("No product with id: " + id);
                    }
                }, 1000);
            });

            return productById;
        }

        // Returns a promise with all the products in the catalog
        function searchAllProducts() {
            let all_products = new Promise(function(resolve, reject) {
                setTimeout(function() {
                    if(catalog.length > 0) {
                        resolve(catalog);
                    }
                    else {
                        reject("Catalog empty.");
                    }
                }, 1000); 
            });

            return all_products;
        }

        // Create a random product 
        function createRandomObject() {
            let typeArray = ['Book', 'Clothing', 'Electronics', 'Food'];
            let price = (Math.random() * 500).toFixed(2);
            let type = typeArray[Math.floor(Math.random() * 4)];
            
            return {price: price, type: type};
        }

        // Create a catalog having the number of products in it
        // equal to the parameter provided
        function createRandomCatalog(num) {
            let catalog = [];
            for(let i = 0; i < num; i++) {
                let item = createRandomObject();
                let product = {id: i+1, price: item.price, type: item.type};
                
                catalog.push(product);
            }
            return catalog;
        }

    }

    if(typeof(window.api) === 'undefined') {
        window.api = myLibrary();
    }
})(window);