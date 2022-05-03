'use strict';

const formulary = document.getElementById('form');
const inputCity = document.getElementById('city');
const inputProduct = document.getElementById('product');
const inputPercentage = document.getElementById('percentage');
const submitButton = document.getElementById('submit');
const filterButton = document.getElementById('filter');
const unsortedEntriesList = document.getElementById('unsorted-entries');
const resultsTable = document.getElementById('results-table');
let unfilteredList = [];
let finalList = [];

function paintEntry(entry) {
    unsortedEntriesList.innerHTML = unsortedEntriesList.innerHTML + `<li>${entry.city} | ${entry.product} | ${entry.percentage}%</li>`
}

function collectItem(event) {
    event.preventDefault();
    const entry = {
        city: inputCity.value,
        product: inputProduct.value,
        percentage: inputPercentage.value
    };
    unfilteredList.push(entry);
    paintEntry(entry);
    formulary.reset();
}

function paintResults() {
    for(let i = 0; i < finalList.length; i++) {
        resultsTable.innerHTML = resultsTable.innerHTML +
        `
        <div class="grid">
            <span>${finalList[i].product}</span>
            <span>${finalList[i].city}</span>
            <span>${finalList[i].percentage}</span>
        </div>
        `
    }
}

function sortList() {
    finalList.sort((a, b) => (a.product > b.product) ? 1 : -1);
    paintResults();
}


function filter() {
    finalList = [];
    resultsTable.innerHTML = '';
    unfilteredList.forEach(entry => {
        const productExist = finalList.find(item => item.product === entry.product);
        if (productExist && entry.city !== productExist.city) {
            if (Number(entry.percentage) > Number(productExist.percentage)) {
                const index = finalList.indexOf(productExist);
                finalList[index] = entry;
            }
            else if (Number(entry.percentage) === Number(productExist.percentage) && entry.city !== productExist.city) {
                finalList.push(entry);
            }
        } else {
            finalList.push(entry);
        }
    })
    sortList();
}

submitButton.addEventListener('click', collectItem);
filterButton.addEventListener('click', filter)