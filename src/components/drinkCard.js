import React from 'react'


const DrinkCard = (props) => {
    return (
            
        <div class="row">
          <div class="col s12 m6">
            <div class="card">
              <div class="card-image">
                <img src="logo512.png" alt="alt" />
                <span class="card-title">Card Title</span>
                <button href="" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></button>
              </div>
              <div class="card-content">
                <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
              </div>
            </div>
          </div>
        </div>
                  
              );
}


export default DrinkCard;