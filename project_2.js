const searchMeal = () => {
    const searchTerm = document.getElementById("search-input").value;
  
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        const mealListElement = document.getElementById("meal-list");
        mealListElement.innerHTML = ""; 
  
        if (data.meals) {
          const meals = data.meals;
          meals.forEach(meal => {
            const mealHtml = `
              <div class="card col-md-3 meal-card" data-meal-id="${meal.idMeal}">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <button class="btn btn-primary btn-sm view-details" data-meal-id="${meal.idMeal}">View Details</button>
                </div>
              </div>
            `;
            mealListElement.innerHTML += mealHtml;
          });
  
         
          const viewDetailsButtons = document.querySelectorAll(".view-details");
          viewDetailsButtons.forEach(button => {
            button.addEventListener("click", showMealDetailsModal);
          });
        } else {
          mealListElement.innerHTML = "<p>No meals found.</p>";
        }
      })
      .catch(error => {
        console.log("An error occurred:", error);
      });
  };
  
  const showMealDetailsModal = (event) => {
    const mealId = event.currentTarget.getAttribute("data-meal-id");
  
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          const meal = data.meals[0];
          const modalTitleElement = document.querySelector("#mealDetailsModal .modal-title");
          const modalImageElement = document.querySelector("#mealDetailsModal .modal-body img");
          const modalInstructionsElement = document.querySelector("#mealDetailsModal .modal-body p:first-of-type");
          const modalCategoryElement = document.querySelector("#mealDetailsModal .modal-body p:nth-of-type(2)");
          const modalAreaElement = document.querySelector("#mealDetailsModal .modal-body p:nth-of-type(3)");
  
          modalTitleElement.textContent = meal.strMeal;
          modalImageElement.src = meal.strMealThumb;
          modalImageElement.alt = meal.strMeal;
          modalInstructionsElement.textContent = meal.strInstructions;
          modalCategoryElement.textContent = `Category: ${meal.strCategory}`;
          modalAreaElement.textContent = `Area: ${meal.strArea}`;
  
          
          $("#mealDetailsModal").modal("show");
  
         
          const closeButton = document.querySelector("#mealDetailsModal .close");
          closeButton.addEventListener("click", () => {
            $("#mealDetailsModal").modal("hide");
            setTimeout(() => {
              $("#mealDetailsModal").remove();
            }, 500); 
          });
        } else {
          alert("Meal details not found.");
        }
      })
      .catch(error => {
        console.log("An error occurred:", error);
      });
  };
  
 
  const mealCards = document.querySelectorAll(".meal-card");
  mealCards.forEach(card => {
    card.addEventListener("click", showMealDetailsModal);
  });