'use strict';

// Variables
const examinedList = document.querySelector('#list-examined-product');  
const searchBtn = document.querySelector('#btn-search-id');
const examineBtn = document.querySelectorAll('.btn-examine');

let allProducts;


eventListen();


// Event Listeners
function eventListen() {
    document.addEventListener('DOMContentLoaded', getProducts);
    document.addEventListener('click', examineProduct);
    searchBtn.addEventListener('click', examineProduct);
}






// Functions
function examineProduct(e) {
    let id;

    if(e.target.id.includes('btn-search-id')) {
        id = document.querySelector('#input-search-id').value;
    }
    else if((e.target.classList.value.includes('btn-examine'))) {
        id = e.target.id.slice(4);
    }
    if(id !== undefined && id.length > 0) {
        api.searchProductById(id).then(function(result) {
            
            return Promise.all([result, 
                                api.searchProductsByType(result.type), 
                                api.searchProductsByPrice(result.price, 50) ]);

        }).then(function(res) {
            let similarArray = getIntersection(res[1], res[2], res[0].id);

            showExaminedProduct(res[0]);
            populateTable('table-similar-products', similarArray);
        }).catch(function(error) {
            console.log("Error: " + error);
        })
    }   

}
function getIntersection(arr1, arr2, searchedId) {
    let similarArray = [];

    arr1.forEach(function(product1) {
        arr2.forEach(function(product2) {
            if((product1.id == product2.id) && (product1.id != searchedId)) {
                similarArray.push(product1);
            }
        })
    })

    return similarArray;
}

function showExaminedProduct(product) {
    let span_tags = examinedList.querySelectorAll('span');

    span_tags[0].innerHTML = product.id;
    span_tags[1].innerHTML = product.price;
    span_tags[2].innerHTML = product.type;

}

function getProducts() {
    api.searchAllProducts().then(function(result) {
        populateTable('table-all-products', result);
    
    });
}

function populateTable(tableId, productArray) {
    let table = document.querySelector(`#${tableId}`);
    let html = `<thead>
                    <th>ProductId</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Examine</th>
                </thead>`
    
    productArray.forEach(function(product) {
        html += `
            <tr>
                <td>${product.id}</td>
                <td>${product.type}</td>
                <td>${product.price}</td>
                <td><button id='btn-${product.id}' class='btn btn-examine'>Examine</button></td>
            </tr>`;
    });

    table.innerHTML = html;
}