// const loadPhone = async () => {
//     const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
//     const data = await res.json();
//     const phones = data.data;
//     console.log(phones);
// }

// const displayPhones = phones => {
//     phones.forEach(phone => {
//         console.log(phone)
//     });

// }

// loadPhone();

function loadPhone(searchText, isShowAll) {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data, isShowAll))
}

const displayPhones = (phones, isShowAll) => {
    //  1. set main container 
    const phoneContainer = document.getElementById('phone-continer');
    // clear phone container cards before adding new cards 
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones 
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // display only first 12 phone if not show all 
    if (!isShowAll) {
        phones = phones.slice(0, 12);

    }

    phones.forEach(phone => {
        // console.log(phone);
        // 2. create a div 
        const phoneDiv = document.createElement('div');
        phoneDiv.classList = `card bg-gray-100 shadow-xl`;

        // 3. set inner html 
        phoneDiv.innerHTML = `
        <figure class="px-10 pt-10">
         <img src="${phone.image} " alt="Shoes" class="rounded-xl" />
        </figure>
          <div class="card-body items-center text-center">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <p>$999</p>
             <div class="card-actions">
              <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Detils</button>
             </div>
          </div>
        `;

        // 4. append child 
        phoneContainer.appendChild(phoneDiv);
    });
    // hide loading spinner 
    toggleLoadingSpinner(false);
}

// 
const handleShowDetail = async (id) => {
    // load single phone data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    ShowPhoneDetails(phone)
}

const ShowPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt=""/>
        <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
        <p><span>Display Size
        : </span>${phone?.mainFeatures?.displaySize
        }</p>
        <p><span>chip Set: </span>${phone?.mainFeatures?.chipSet
        }</p>
        <p><span>Memory: </span>${phone?.mainFeatures?.memory
        }</p>
        <p><span>Slug: </span>${phone?.slug}</p>
        <p><span>Release Date
        : </span>${phone?.releaseDate}</p>
        <p><span>Brand: </span>${phone?.brand}</p>
        <p><span>GPS: </span>${phone?.others?.GPS}</p>
    `
    // show the modal 
    show_details_modal.showModal();
}



// handle search button 
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);

}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all  
const handleShowAll = () => {
    handleSearch(true);
}

// loadPhone();