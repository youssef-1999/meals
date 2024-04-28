let navWidth = $("#nav").outerWidth();
let navLeft = $("#nav").offset().left;
let searchInput=document.querySelector("#searchInput")
let searchFirstLetter=document.querySelector("#searchFirstLetter")
let Light_Box=document.querySelector("#Light_Box")
let Light_Box_FirstLetter=document.querySelector("#Light_Box_FirstLetter")



$(".close i").click(function() {

    if (navLeft === 0) {
        $("#nav").animate({left: -navWidth}, 1000); // Animating the navigation off-screen
        $(".yummy").animate({left: 0}, 1000); // Animating another element (assuming it's the main content) to fill the space left by navigation
        $(".bar i").fadeIn(1000)
        $(".close i").css({display: 'none'}); // Hiding the close icon
    }
});

$(".bar i").click(function(e)
{
    $("#nav").animate({left: 0}, 1000); // Animating the navigation off-screen
        $(".yummy").animate({left: '210px'}, 1000); // Animating another element (assuming it's the main content)
    $(".close i").css({display: 'block'}); // Hiding the close icon
    $(".bar i").css({display: 'none'}); // Hiding the close icon


})

async function fetchMealsCategory() {
    try {
        $(".load").removeClass("d-none").addClass("d-block");
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let res = await data.json();
        let final = res.categories;
        console.log("category= ", final);
        displayallMeals(final);
    } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, e.g., display an error message to the user
    }
}

fetchMealsCategory();


$(".closing i").click(function()
{
    Light_meal.classList.replace('d-block','d-none')
})
//not working
async function fetchMealById(mealId) {
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealId}`);
        let res = await data.json();
        let recipesData = res.meals;
        console.log("meals=",recipesData);

}


function mealsCategory(recipesData) {
    let cartona = '';

    if (recipesData && recipesData.length > 0) {
        for (let i = 0; i < recipesData.length; i++) {
            cartona += `
            <div class="col-md-3 gy-3 " data-id="${recipesData[i].idMeal}">
                <div class="meal p-2 rounded rounded-3">
                    <img src="${recipesData[i].strMealThumb}" alt="" class="w-100" />
                    <div class="layer">
                        <h3>${recipesData[i].strMeal}</h3>
                        <p>${recipesData[i].strInstructions.slice(0, 50)}</p>
                    </div>
                </div>
            </div>`;
        }
    }

    $("#myRow").html(cartona);
}

function displayallMeals(meals) {
    let cartona = '';
    for (let i = 0; i < meals.length; i++) {
        cartona += `
        <div class="col-md-3 gy-3 meal" data-id="${meals[i].id}">
            <div class="meal p-2 rounded rounded-3">
                <img src="${meals[i].strCategoryThumb}" alt="" class="w-100" />
                <div class="layer">
                    <h3>${meals[i].strCategory}</h3>
                    <p>${meals[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>
        </div>`;
    }
    $('#myMeals').html(cartona);

    // Event delegation to handle click event on .meal class
    $("#myMeals").on("click", ".meal", function() {
        let mealId = $(this).attr("data-id");
        Light_meal.classList.replace('d-none','d-block');
       fetchMealById(mealId)
    });
}

function mealsList(mealId) {
    let cartona = '';

    // Search for the meal in the global recipes array
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].idMeal === mealId) {
            cartona += `
            <div class="col-md-3 gy-3" data-id="${recipes[i].idMeal}">
                <div class="meal p-2 rounded rounded-3">
                    <img src="${recipes[i].strMealThumb}" alt="" class="w-100" />
                    <div class="layer">
                        <h3>${recipes[i].strMeal}</h3>
                    </div>
                </div>
            </div>`;
        }
    }
    $("#mealsResults").html(cartona);
}

// display the gradients
async function displayGradients(gradient)
{
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${gradient}`)
    let recipes= await data.json();
    let recipesData=recipes.meals
    console.log("gradients =",recipesData);
}
displayGradients('chicken_breast')

function gradientList(recipesData)
{
    let recipes=recipesData
    let cartona=''
    for (let i = 0; i < recipes.length; i++) {
        cartona += `
        <div class="col-md-3 gy-3 meal" data-id="${recipes[i].id}">
            <div class="meal p-2 rounded rounded-3">
                <img src="${recipes[i].strMealThumb}" alt="" class="w-100" />
                <div class="layer">
                    <h3>${recipes[i].strMeal}</h3>
                </div>
            </div>
        </div>`;
        
    }
    $("#mealsResults").html(cartona)
  
}










//function to search by first name
async function searchByFirstName(firstName) {
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${firstName}`);
       
        let recipes = await data.json();
        let recipesData = recipes.meals;
        
        console.log("search by first name= ",recipesData);
        displaySearchName(recipesData);
   
}

searchByFirstName("beef");

searchInput.addEventListener('keyup', function() {
    searchByFirstName(searchInput.value);
    $("#mySearch").addClass('d-block').removeClass('d-none')
    $("#myFirstLetter").addClass('d-none').removeClass('d-block')

});



function displaySearchName(recipesData) {
    let cartona = '';

    recipes = recipesData; // Assigning the recipesData to the global recipes array

    for (let i = 0; i < recipes.length; i++) {
        cartona += `
        <div class="col-md-3 gy-3">
            <div class="meal" data-id="${recipes[i].idMeal}">
                <img src="${recipes[i].strMealThumb}" class="w-100" alt="">
                <div class="layer">
                <p class="fs-1">${recipes[i].strMeal}</p>
                
                </div>
            </div>
        </div>`;
    }

    $("#mySearch").html(cartona);

    // Event delegation to handle click event on .meal class
    $("#mySearch").on("click", ".meal", function() {
        let mealId = $(this).attr("data-id");
        detailedSearch(mealId);
        Light_Box.classList.replace('d-none','d-block');
    });
}

function detailedSearch(mealId) {
    let cartona = '';

    // Search for the meal in the global recipes array
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].idMeal === mealId  && recipes[i].strMeasure !== ' ' && recipes[i].strIngredient !== '') {
            cartona += `
            <div class="col-md-3">
                <img src="${recipes[i].strMealThumb}" class="w-100" alt="">
                <h2>${recipes[i].strMeal}</h2>

            </div>
            <div class="col-md-8">
            <h4>Instructions</h4>
                <p>${recipes[i].strInstructions}</p>
                <p class=""> <span>Area:</span> ${recipes[i].strArea}</p>
                <p class=""> <span>Category:</span> ${recipes[i].strCategory}</p>
                <p class=""> <span>Recipes:</span> </p>
                <div class="recipes p-2">
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2 ">
        <span>${recipes[i].strMeasure1} ${recipes[i].strIngredient1}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure2} ${recipes[i].strIngredient2}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure3} ${recipes[i].strIngredient3}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure4} ${recipes[i].strIngredient4}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure5} ${recipes[i].strIngredient5}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 ">
        <span>${recipes[i].strMeasure6} ${recipes[i].strIngredient6}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure7} ${recipes[i].strIngredient7}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure8} ${recipes[i].strIngredient8}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure9} ${recipes[i].strIngredient9}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure10} ${recipes[i].strIngredient10}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure11} ${recipes[i].strIngredient11}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure12} ${recipes[i].strIngredient12}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure13} ${recipes[i].strIngredient13}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure14} ${recipes[i].strIngredient14}</span>
    </span>  
</div>

                <div class="tags text-white ">
                <p>Tags:</p>
               <a href=${recipes[i].strSource}> <button class="btn btn-success me-2">Source</button></a>
                
                <a href=${recipes[i].strYoutube}><button class="btn btn-danger">YouTube</button></a>
                </div>

                <!-- Add more details here -->
            </div>`;
            break; // Once found, no need to continue searching
        }
        $("body").css({"overflow" : "hidden"})
    }

    $("#searchedMeal").html(cartona);
}


$(".closing i").click(function()
{
    Light_Box.classList.replace('d-block','d-none')
})


// function to search for first letter
async function searchLetter(firstLetter) {
    try {
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
        let recipes = await data.json();
        console.log("search by first letter= ", recipes.meals);
        displaySearchFirstLetter(recipes.meals);
    } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, e.g., display an error message to the user
    }
}

searchLetter()


function displaySearchFirstLetter(recipesData) {
    let cartona = '';

    recipes = recipesData; // Assigning the recipesData to the global recipes array

    for (let i = 0; i < recipes.length; i++) {
        cartona += `
        <div class="col-md-3 gy-3">

            <div class="meal" data-id="${recipes[i].idMeal}">
                <img src="${recipes[i].strMealThumb}" class="w-100" alt="">
                <div class="layer">
                <p class="fs-1">${recipes[i].strMeal}</p>
                
                </div>
            </div>
        </div>`;
    }

    $("#myFirstLetter").html(cartona);

    // Event delegation to handle click event on .meal class
    $("#myFirstLetter").on("click", ".meal", function() {
        let mealId = $(this).attr("data-id");
        detailedSearchLetter(mealId);
        Light_Box_FirstLetter.classList.replace('d-none','d-block');
        console.log(mealId);
    });
}

searchLetter("a");

searchFirstLetter.addEventListener('keyup', function() {
    let firstLetter = $(this).val().trim().charAt(0); // Get the first character from the input field
    if (firstLetter !== "") {
        searchLetter(firstLetter);
    } 
    $("#mySearch").addClass('d-none').removeClass('d-block')
    $("#myFirstLetter").addClass('d-block').removeClass('d-none')


});


//function to dsiplay in light_box

function detailedSearchLetter(mealId) {
    let cartona = '';

    // Search for the meal in the global recipes array
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].idMeal === mealId  && recipes[i].strMeasure !== ' ' && recipes[i].strIngredient !== '') {
            cartona += `
            <div class="col-md-3">
                <img src="${recipes[i].strMealThumb}" class="w-100" alt="">
                <h2>${recipes[i].strMeal}</h2>

            </div>
            <div class="col-md-8">
            <h4>Instructions</h4>
                <p>${recipes[i].strInstructions}</p>
                <p class=""> <span>Area:</span> ${recipes[i].strArea}</p>
                <p class=""> <span>Category:</span> ${recipes[i].strCategory}</p>
                <p class=""> <span>Recipes:</span> </p>
                <div class="recipes p-2">
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2 ">
        <span>${recipes[i].strMeasure1} ${recipes[i].strIngredient1}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure2} ${recipes[i].strIngredient2}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure3} ${recipes[i].strIngredient3}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure4} ${recipes[i].strIngredient4}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure5} ${recipes[i].strIngredient5}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 ">
        <span>${recipes[i].strMeasure6} ${recipes[i].strIngredient6}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure7} ${recipes[i].strIngredient7}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure8} ${recipes[i].strIngredient8}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure9} ${recipes[i].strIngredient9}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure10} ${recipes[i].strIngredient10}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure11} ${recipes[i].strIngredient11}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure12} ${recipes[i].strIngredient12}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure13} ${recipes[i].strIngredient13}</span>
    </span>  
    <span class="bg-info p-1 rounded rounded-3 text-black m-3 mb-2">
        <span>${recipes[i].strMeasure14} ${recipes[i].strIngredient14}</span>
    </span>  
</div>

                <div class="tags text-white ">
                <p>Tags:</p>
               <a href=${recipes[i].strSource}> <button class="btn btn-success me-2">Source</button></a>
                
                <a href=${recipes[i].strYoutube}><button class="btn btn-danger">YouTube</button></a>
                </div>

                <!-- Add more details here -->
            </div>`;
            break; // Once found, no need to continue searching
        }
        $("body").css({"overflow" : "hidden"})
    }

    $("#searchedLetter").html(cartona);
}
$(".closing i").click(function()
{
    Light_Box_FirstLetter.classList.replace('d-block','d-none')
})



/////regex/////////////
let userName = document.querySelector('#userName');
let errorName = document.querySelector('#errorName');

let userEmail = document.querySelector('#userEmail');
let errorEmail = document.querySelector('#errorEmail');

let phoneNumber = document.querySelector('#phoneNumber');
let errorPhone = document.querySelector('#errorPhone');

let Age = document.querySelector('#Age');
let errorAge = document.querySelector('#errorAge');

let password = document.querySelector('#password');
let errorPassword = document.querySelector('#errorPassword');

let repassword = document.querySelector('#repassword');
let errorRePassword = document.querySelector('#errorRePassword');

let submitBtn = document.querySelector('#submitBtn');

// Initially disable the button
submitBtn.disabled = true;

// Add event listeners for input events
userName.addEventListener('input', toggleButtonState);
userEmail.addEventListener('input', toggleButtonState);
phoneNumber.addEventListener('input', toggleButtonState);
Age.addEventListener('input', toggleButtonState);
password.addEventListener('input', toggleButtonState);
repassword.addEventListener('input', toggleButtonState);

// Function to check the validity of input fields and toggle button state
function toggleButtonState() {
    // Check the validity of each input field
    let isUserNameValid = checkName();
    let isUserEmailValid = checkEmail();
    let isPhoneNumberValid = checkPhone();
    let isAgeValid = checkAge();
    let isPasswordValid = checkPass();
    let isRePasswordValid = checkRePassword();

    // Enable the button if all input fields are valid, otherwise disable it
    if (isUserNameValid && isUserEmailValid && isPhoneNumberValid && isAgeValid && isPasswordValid && isRePasswordValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Function to check the validity of the name input field
function checkName() {
    let regex = /^[A-Za-z]{1,20}$/gm;
    if (regex.test(userName.value)) {
        userName.classList.add('is-valid');
        userName.classList.remove('is-invalid');
        errorName.classList.replace('d-block', 'd-none');
        return true;
    } else {
        userName.classList.add('is-invalid');
        userName.classList.remove('is-valid');
        errorName.classList.replace('d-none', 'd-block');
        return false;
    }
}

// Function to check the validity of the email input field
function checkEmail() {
    let regex = /[A-Za-z]{1,20}[@](yahoo|gmail|hotmail)\.(com)/gm;
    if (regex.test(userEmail.value)) {
        userEmail.classList.add('is-valid');
        userEmail.classList.remove('is-invalid');
        errorEmail.classList.replace('d-block', 'd-none');
        return true;
    } else {
        userEmail.classList.add('is-invalid');
        userEmail.classList.remove('is-valid');
        errorEmail.classList.replace('d-none', 'd-block');
        return false;
    }
}

// Function to check the validity of the phone number input field
function checkPhone() {
    let regex = /^01[0125][0-9]{8}$/gm;
    if (regex.test(phoneNumber.value)) {
        phoneNumber.classList.add('is-valid');
        phoneNumber.classList.remove('is-invalid');
        errorPhone.classList.replace('d-block', 'd-none');
        return true;
    } else {
        phoneNumber.classList.add('is-invalid');
        phoneNumber.classList.remove('is-valid');
        errorPhone.classList.replace('d-none', 'd-block');
        return false;
    }
}

// Function to check the validity of the age input field
function checkAge() {
    if (Age.value > 0) {
        Age.classList.add('is-valid');
        Age.classList.remove('is-invalid');
        errorAge.classList.replace('d-block', 'd-none');
        return true;
    } else {
        Age.classList.add('is-invalid');
        Age.classList.remove('is-valid');
        errorAge.classList.replace('d-none', 'd-block');
        return false;
    }
}

// Function to check the validity of the password input field
function checkPass() {
    let regex = /^[A-Za-z]{8,}[0-9]{1,}$/gm;
    if (regex.test(password.value)) {
        password.classList.add('is-valid');
        password.classList.remove('is-invalid');
        errorPassword.classList.replace('d-block', 'd-none');
        return true;
    } else {
        password.classList.add('is-invalid');
        password.classList.remove('is-valid');
        errorPassword.classList.replace('d-none', 'd-block');
        return false;
    }
}

// Function to check the validity of the re-entered password input field
function checkRePassword() {
    if (repassword.value === password.value) {
        repassword.classList.add('is-valid');
        repassword.classList.remove('is-invalid');
        errorRePassword.classList.replace('d-block', 'd-none');
        return true;
    } else {
        repassword.classList.add('is-invalid');
        repassword.classList.remove('is-valid');
        errorRePassword.classList.replace('d-none', 'd-block');
        return false;
    }
}


//function to getArea


