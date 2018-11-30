# Product Catalog
Product Catalog application built using JavaScript involving Promises for Assignment 2 of EdX Asynchronous Programming Course.

## Features
* Populate the **Similar Products List** with products of the same type by pressing the "Search Type" button and entering a valid product type in the corresponding input field.
* Populate the **Similar Products List** with products within $50 by pressing the "Search Price" button and entering a valid price in the corresponding input field.
* Populate the **Examined Product section** by pressing the "Search Product" button and entering a valid product id in the corresponding input field. This action will also populate the Similar Products List with products that have the same type and are within $50 of the examined product. (built in tutorial)
* Populate the **Examined Product section** by clicking on the "Examine" button in any of the table rows. This action will also populate the Similar Products List with products that have the same type and are within $50 of the examined product. 
* Populate the **List of all Products** upon opening the web application. 
* See an error alert when searching for an invalid id, type or price.

## Additional Features
* Input boxes are reset if clicked again after getting previous search result.
* Result of search by type is *sorted* in the order of price of products.
* Result of search by price is *sorted* by type and then by price of products.
* Searches are matched using *regular expression* and hence search terms need not be exact product types. Eg: Searching for **cloth** will return results for products of type **clothing**.
* On clicking a button, the window is *scrolled* to the appropriate location where result is displayed. This is particularly useful when using "examine" button on products lower in the "List of All Products".
* Type enter button after inserting search key to trigger the search instead of clicking the corresponding button.
* Used bootstrap to introduce basic styling.
