'use strict';

const formulary = document.getElementById('form');
const inputCity = document.getElementById('city');
const inputProduct = document.getElementById('product');
const inputPercentage = document.getElementById('percentage');
const submitButton = document.getElementById('submit');

const filterButton = document.getElementById('filter');
const citiesButton = document.getElementById('btn-cities');
const resumeButton = document.getElementById('btn-resume');
const reportButton = document.getElementById('report-btn');

const unsortedEntriesList = document.getElementById('unsorted-entries');
const resultsTable = document.getElementById('results-table');
const resumeTable = document.getElementById('resume-table');
let unfilteredList = [];
let finalList = [];
let resumeList = [];

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
    const isRepeated = unfilteredList.find(item => item.city === entry.city && item.product === entry.product && item.percentage === entry.percentage);
    if (!isRepeated) {
        unfilteredList.push(entry);
        paintEntry(entry);
    }
    formulary.reset();
}

function paintResults() {
    for (let i = 0; i < finalList.length; i++) {
        resultsTable.innerHTML = resultsTable.innerHTML +
            `
        <div class="grid ${Number(finalList[i].percentage) === 110 ? '-highlight' : ''}">
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

function getVisitedCities() {
    const checkCities = document.querySelectorAll('.city-checkbox');
    for (let i = 0; i < checkCities.length; i++) {
        const cityInList = unfilteredList.find(item => checkCities[i].nextSibling.data === item.city);
        if (cityInList) {
            checkCities[i].checked = true;
        }
    }
}

function getResume() {
    resumeList = [];
    resumeTable.innerHTML = '';
    resumeList = unfilteredList.sort((a, b) => a.city.localeCompare(b.city) || b.percentage > a.percentage);
    for (let i = 0; i < resumeList.length; i++) {
        resumeTable.innerHTML = resumeTable.innerHTML +
            `
        <div class="grid">
            <span>${resumeList[i].city}</span>
            <span>${resumeList[i].product}</span>
            <span>${resumeList[i].percentage}</span>
        </div>
        `
    }
}

function handleReportClick() {
    filter();
    getVisitedCities();
    getResume();
}

submitButton.addEventListener('click', collectItem);
reportButton.addEventListener('click', handleReportClick)