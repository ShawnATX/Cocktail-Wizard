import React, { useState, useEffect } from 'react'

//props are string drink name
const DrinkVideo = (props) => {
    const [drinkVideoState, setDrinkVideoState] = useState("");
    const youtubeAPIKey = "##";
    const videoURL = "https://www.youtube.com/embed/";


    useEffect(() => {
        getCocktailVideo(props)
    }, []);

    function getCocktailVideo(cocktail) {
        fetch("https://www.googleapis.com/youtube/v3/search?maxResults=1&part=snippet&q=" + cocktail + "+cocktail+recipe&key=" + youtubeAPIKey)
        .then((response) => {
            if(response.ok){
                setDrinkVideoState(response.items[0].id.videoId);
            }  else{
                setDrinkVideoState("DLzxrzFCyOs");
            }
          })
    }
      return (
          <iframe title={props} width="100%" height="100%" src={videoURL + drinkVideoState} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      )
    
}

export default DrinkVideo;