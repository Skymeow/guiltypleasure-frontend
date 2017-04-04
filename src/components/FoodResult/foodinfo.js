import React from 'react';

function FoodInfo(props) {

  return(
    <div>
      <h2>{`${props.name}`}</h2>
      <div className="food-info">
        <ul>
         <div className="img-map">
          <li><img className="img-item" src={`${props.picture}`} /></li>
         </div>
          <li>calories: {`${props.calories}`}</li>
          <li>Serving size: {`${props.serving_qty}`}/{`${props.serving_unit}`}</li>

        </ul>
      </div>
    </div>
  )
}

export default FoodInfo;
