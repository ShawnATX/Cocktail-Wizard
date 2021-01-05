import React, { useState, useEffect } from 'react'

const DrinkCard = (props) => {
    const [drinkState, setDrinkState] = useState(
        {
            drinkName:"",
            id:0,
            //ingredients array is doublets with ingredient and measurement
            ingredients: [],
            instructions:"",
            image:""
        }
    );
    const [error, setError] = useState(null);
  
    let randomCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php?api-key=1";
    //let searchCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?api-key=1&s=";
    //let youtubeAPIKey = "AIzaSyDAHB6N3SeKwl3z3xVIV1DOTwqp3gTAxa8";
    //let youtubeAPIKey = "AIzaSyC1DlLmv-ouNQJzBC-RC-jYzsLttiPumR0";

    useEffect(() => {
        console.log("Use Effect");
        getRandomDrink()
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
      }

//get random cocktail
function getRandomDrink(){
    fetch(randomCocktailURL)
        .then(res => res.json())
        .then(
            (response) => {
                const { idDrink, strDrink: drinkName, strInstructions: instructions, strDrinkThumb } = response.drinks[0];
                let ingredientArr = buildIngredientsArray(response.drinks[0]);
                console.log(ingredientArr);
                setDrinkState({drinkName: drinkName, id: idDrink, ingredients: ingredientArr, instructions: instructions, image: strDrinkThumb});
            },
            (error) => {
                setError(error);
            }
        )
}

//get specific cocktail
// function cocktail(userSearch) {
//   let searchURL = searchCocktailURL + userSearch;
//   $.ajax({
//     url: searchURL,
//     method: "GET"
//   })
//     .then(function (response) {
//       //destructure the response object to discrete variables to use or display to the user
//       const { idDrink, strDrink: drinkName, strInstructions: instructions, strDrinkThumb } = response.drinks[0];
//       let ingredientArr = buildIngredientsArray(response.drinks[0]);
//       setDrinkState({drinkName: drinkName, id: idDrink, ingredients: ingredientArr, instructions: instructions, image: strDrinkThumb});
//     });
// }

function buildIngredientsArray(drinkObj) {
  let ingredientsArr = [];
  for (let i = 1; i < 15; i++) {
    let ingredient = "strIngredient" + i;
    let measurement = "strMeasure" + i;
    if (drinkObj[ingredient] === null) {
        console.log(ingredientsArr);
      return ingredientsArr;
    }
    ingredientsArr.push([drinkObj[ingredient], drinkObj[measurement]]);
  }
}

function getIngredientList () {
  const ingredientList = drinkState.ingredients.map((ingredient) => 
    <li key={ingredient[0]}>{ingredient[0]} - {ingredient[1]}</li> 
    );

  return ingredientList
}

// function setVid(videoId) {
//   let videoURL = "https://www.youtube.com/embed/";
//   videoURL += videoId;
//   let carouselTile = $("<div>");
//   carouselTile.attr("class", "carousel-item");
//   let nextVideo =
//     $(`<iframe width="100%" height="100%" src=${videoURL} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
//   $("#carouselOne").append(carouselTile);
//   carouselTile.append(nextVideo);
// }

return (
    <div class="row">
      <div class="col s12 m12 l12">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src={drinkState.image} alt={drinkState.drinkName}/>
            <h1 class="card-title large">{drinkState.drinkName}</h1>
            <button href="" class="btn-floating halfway-fab waves-effect waves-light red"><span><i class="material-icons">add</i></span></button>
          </div>
          <div class="card-content">
            {getIngredientList()}
            <p class="flow-text">{drinkState.instructions}</p>
          </div>
          <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
            <p> All This Is Here Too!</p>
          </div>
        </div>
      </div>
    </div>     
)   
}

export default DrinkCard;