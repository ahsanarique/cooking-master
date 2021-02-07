const mealApi = {
  url: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
};

const mealList = document.getElementById("meal-list");

const updateResult = (data) => {
  const mealCardList = data.map((card) => {
    const cardList = `<div class="card col m-4" style="width: 18rem;">
    <img src="${card.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${card.strMeal}</h5>
    <a href="#" class="btn btn-warning view-ingredients" data-bs-toggle="modal" data-bs-target="#exampleModal">View Ingredients</a>
    </div>
    </div>`;

    return cardList;
  });

  let innerHTML = "";
  for (let i = 0; i < mealCardList.length; i++) {
    innerHTML += mealCardList[i];
  }
  mealList.innerHTML = innerHTML;

  const ingredientsBtn = [...document.querySelectorAll(".view-ingredients")];

  ingredientsBtn.forEach((item) => {
    item.addEventListener("click", () => {
      console.log("clicked");
    });
  });
};

const getIngredients = (data) => {
  data.map((x) => {
    const ingredients = ``;
  });
};

const getMealData = async (name) => {
  const mealData = await fetch(`${mealApi.url}${name}`);

  const mealNames = await mealData.json();
  const mealDataset = [...mealNames.meals];

  updateResult(mealDataset);
  // console.log(mealDataset);
};

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
