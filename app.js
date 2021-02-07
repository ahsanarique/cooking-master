// API url without endpoint
const mealApi = {
  url: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
  details: "https://www.themealdb.com/api/json/v1/1/lookup.php?i=",
};

const mealList = document.getElementById("meal-list");

const updateResult = (data) => {
  const mealCardList = data.map((card) => {
    const cardList = `<div>
    <div class="card col m-4" style="width: 18rem;" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <div id="${card.idMeal}" class="view-ingredients">
    <img src="${card.strMealThumb}" class="card-img-top" alt="...">
    <h5 class="card-title text-center card-body">${card.strMeal}</h5>
    </div>
    </div>
    </div>`;

    return cardList;
  });

  let innerHTMLCard = "";

  mealCardList.forEach((item) => {
    innerHTMLCard += item;
  });

  mealList.innerHTML = innerHTMLCard;

  const ingredientsSection = [
    ...document.querySelectorAll(".view-ingredients"),
  ];

  ingredientsSection.forEach((item) => {
    item.addEventListener("click", (e) => {
      getIngredients(e.target.parentNode.id);
    });
  });

  const getIngredients = async (id) => {
    const mealDetails = await fetch(`${mealApi.details}${id}`);
    const ingredientDetails = await mealDetails.json();
    const ingredientsDataset = [...ingredientDetails.meals][0];
    console.log(ingredientsDataset);

    const ingredientTitle = document.querySelector(".ingredient-title");
    const ingredientDiv = document.getElementById("ingredient-div");

    let ingredientList = ``;

    for (let i = 1; i <= 20; i++) {
      if (
        ingredientsDataset[`strMeasure${i}`] !== " " &&
        ingredientsDataset[`strMeasure${i}`] !== "" &&
        ingredientsDataset[`strMeasure${i}`] !== null &&
        ingredientsDataset[`strIngredient${i}`] !== "" &&
        ingredientsDataset[`strIngredient${i}`] !== " " &&
        ingredientsDataset[`strIngredient${i}`] !== null
      ) {
        ingredientList += `<li>${ingredientsDataset[`strMeasure${i}`]} ${
          ingredientsDataset[`strIngredient${i}`]
        }</li>`;
      }
    }

    ingredientTitle.innerText = ingredientsDataset.strMeal;
    ingredientDiv.innerHTML = `<div class="w-100"><img class="w-100" src="${ingredientsDataset.strMealThumb}" alt=""></div>
      <div class=mt-4>
      <ul>
      ${ingredientList}
      </ul>
      </div>`;
  };
};

// Fetching Data from API
const getMealData = async (name) => {
  const mealData = await fetch(`${mealApi.url}${name}`);

  const mealNames = await mealData.json();
  const mealDataset = [...mealNames.meals];

  updateResult(mealDataset);
  console.log(mealDataset);
};

// Search Input and event listener
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");

searchButton.addEventListener("click", () => {
  if (searchInput.value !== "") {
    getMealData(searchInput.value);
    console.log(searchInput.value);
  } else {
    console.log("Item by your given input is not found");
  }
});
