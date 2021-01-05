import React, { useState, useEffect } from 'react';
import DrinkVideo from './drinkVideo'

const DrinkCard = () => {
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
  
    let randomCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php?api-key=1";
    //let searchCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?api-key=1&s=";


    useEffect(() => {
        getRandomDrink()
    }, []);


//get random cocktail, fires on load with useEffect
  function getRandomDrink(){
      fetch(randomCocktailURL)
          .then(res => res.json())
          .then(
              (response) => {
                  const { idDrink, strDrink: drinkName, strInstructions: instructions, strDrinkThumb } = response.drinks[0];
                  let ingredientArr = buildIngredientsArray(response.drinks[0]);
                  setDrinkState({drinkName: drinkName, id: idDrink, ingredients: ingredientArr, instructions: instructions, image: strDrinkThumb});
              }
          )
  };

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

return (
    <div className="row card-row">
      <div className="col s12 m12 l12 card-col">
        <div className="card">
          <div className="card-image waves-effect waves-light">
            <img className="activator responsive-img" src={drinkState.image} alt={drinkState.drinkName}/>
            <h1 className="card-title">{drinkState.drinkName}</h1>
            <button href="" className="btn-floating halfway-fab waves-effect waves-light red"><span><i className="material-icons">add</i></span></button>
          </div>
          <div className="card-content">
            {getIngredientList()}
            <p className="flow-text">{drinkState.instructions}</p>
          </div>
          <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">{drinkState.drinkName}<i className="material-icons right">close</i></span>
            <p> {drinkState.instructions}</p>
            { (drinkState.drinkName) ? <DrinkVideo name={drinkState.drinkName}/> : <div></div>}
          </div>
        </div>
      </div>
    </div>     
)   
}

export default DrinkCard;