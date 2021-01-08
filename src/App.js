import React, { useState, useEffect } from 'react'

import './App.css';
import DrinkCard from './components/drinkCard';
import ShakeWait from './components/shakeWait';

function App() {
  
  const [loadingState, setLoadingState] = useState( {
    isLoading: false
  } );
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

  function setLoading() {
    setLoadingState( {isLoading: true}  );
  };
  function setNotLoading() {
    setTimeout(() => {
      setLoadingState( {isLoading: false}  );
    }, 2000);
  };

  //get random cocktail, fires on load with useEffect
  function getRandomDrink(){
  setLoading();
    fetch(randomCocktailURL)
        .then(res => res.json())
        .then(
           (response) => {
              const { idDrink, strDrink: drinkName, strInstructions: instructions, strDrinkThumb } = response.drinks[0];
              let ingredientArr = buildIngredientsArray(response.drinks[0]);
              setDrinkState({drinkName: drinkName, id: idDrink, ingredients: ingredientArr, instructions: instructions, image: strDrinkThumb});
            }
        )
        .then(setNotLoading())
  };

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
  };

  return (
      <div className="App"> 
        <div className="container">
          {/* { loadingState && <ShakeWait/>} */}
          { loadingState.isLoading ? <ShakeWait/> : <DrinkCard drinkState={drinkState}/>}
        </div>
      </div>
  );
}

export default App;