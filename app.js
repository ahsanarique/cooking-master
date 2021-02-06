const mealApi = {
  url: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
  imageUrl: "https://www.themealdb.com/images/media/meals",
};

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");

const mealList = document.getElementById("meal-list");

const updateResult = (data) => {
  const mealCardList = data.map((card) => {
    const cardList = `<div class="card col m-4" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${card.strMeal}</h5>
    <a href="#" class="btn btn-warning">View Ingredients</a>
    </div>
    </div>`;
    return cardList;
  });

  let innerHTML = "";
  for (let i = 0; i < mealCardList.length; i++) {
    innerHTML += mealCardList[i];
  }
  mealList.innerHTML = innerHTML;
};

const getMealData = async (name) => {
  const mealData = await fetch(`${mealApi.url}${name}`);

  const mealImgData = await fetch(
    "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg/preview"
  );

  const mealNames = await mealData.json();
  const mealDataset = [...mealNames.meals];
  const mealImg = await mealImgData.blob();

  const imgUrl = URL.createObjectURL(mealImg);

  updateResult(mealDataset);

  console.log(mealDataset);
};

searchButton.addEventListener("click", () => {
  if (searchInput.value !== "") {
    getMealData(searchInput.value);
    console.log(searchInput.value);
  } else {
    console.log("Item by your given input is not found");
  }
});

// need to concat images with data
// pop-up carousel with no auto-moving
