'use strict';

eventListen();


// Event Listeners
function eventListen() {
    document.addEventListener('DOMContentLoaded', getProducts);
    document.addEventListener('click', examineProduct);
    document.addEventListener('click', clearInputs);
}

// Functions
function sortProductsByPrice(products) {
    for(let i = 0; i < (products.length - 1) ; i++) {
        for(let j = i + 1; j < products.length; j++) {
            if (parseFloat(products[i].price) > parseFloat(products[j].price)) {
                let temp = products[i];
                products[i] = products[j];
                products[j] = temp;
                console.log(products[i], products[j]);
            }
        }
    }
    return products;
}

function sortProductsByTypePrice(products) {
    for(let i = 0; i < (products.length - 1) ; i++) {
        for(let j = i + 1; j < products.length; j++) {
            if (products[i].type > products[j].type) {
                let temp = products[i];
                products[i] = products[j];
                products[j] = temp;
                console.log(products[i], products[j]);
            }
            else if(products[i].type == products[j].type) {
                if (parseFloat(products[i].price) > parseFloat(products[j].price)) {
                    let temp = products[i];
                    products[i] = products[j];
                    products[j] = temp;
                    console.log(products[i], products[j]);
                }
            }
        }
    }
    return products;
}

function clearInputs(e) {
    if(e.target.type === 'text') {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                let inputs = document.querySelectorAll('input');
                inputs.forEach(input => input.value = '');
            }, 0);
    
            resolve('Inputs cleared');
        })  
    }
    
}

function examineProduct(e) {
    let id;
    //e.preventDefault();
    if(e.target.id.includes('btn-search-id')) {
        id = document.querySelector('#input-search-id').value;
        console.log(id, typeof id);
        displayById(id);
    }
    else if(e.target.id.includes('btn-search-type')) {
        let type = document.querySelector('#input-search-type').value;
        displayByType(type);
    }
    else if(e.target.id.includes('btn-search-price')) {
        let price = document.querySelector('#input-search-price').value;
        displayByPrice(price);
    }
    else if((e.target.classList.value.includes('btn-examine'))) {
        id = e.target.id.slice(4);
        displayById(id);
    } 
    
}

function displayByPrice(price) {
    clearExaminedProduct();

    api.searchProductsByPrice(price, 50).then(function(resultArray) {
        resultArray = sortProductsByTypePrice(resultArray, 'price');
        populateTable('table-similar-products', resultArray);
        document.body.scrollTop = 560;
    }).catch(function(error) {
        console.log("Error displaying by price: " + error);
        alert("Invalid price");
    });
}

function displayByType(type) {
    clearExaminedProduct();

    api.searchProductsByType(type).then(function(resultArray) {
        resultArray = sortProductsByPrice(resultArray, 'price');
        populateTable('table-similar-products', resultArray);
        document.body.scrollTop = 560;
    }).catch(function(error) {
        console.log("Error displaying by type: " + type);
        alert("Invalid type");
    });
}

function displayById(id) {
    clearExaminedProduct();

    api.searchProductById(id).then(function(result) {
            
        return Promise.all([result, 
                            api.searchProductsByType(result.type), 
                            api.searchProductsByPrice(result.price, 50) ]);

    }).then(function(res) {
        let similarArray = getIntersection(res[1], res[2], res[0].id);
        
        similarArray = sortProductsByPrice(similarArray);
        showExaminedProduct(res[0]);
        populateTable('table-similar-products', similarArray);
        document.body.scrollTop = 360;
    }).catch(function(error) {
        alert("Invalid id");
        console.log("Error: " + error);
    });
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

function clearExaminedProduct() {
    let examinedList = document.querySelector('#list-examined-product');  
    let span_tags = examinedList.querySelectorAll('span');

    span_tags[0].innerHTML = '';
    span_tags[1].innerHTML = '';
    span_tags[2].innerHTML = '';
}

function showExaminedProduct(product) {
    let examinedList = document.querySelector('#list-examined-product');  
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