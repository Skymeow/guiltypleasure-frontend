import React from 'react';

function FoodInfo(props) {

  return(
    <div>
      <h2>{`${props.name}`}</h2>
      <div className="food-info">
        <ul>
          <li><img src={`${props.picture}`} /></li>
          <li>calories: {`${props.calories}`}</li>
        </ul>
      </div>
    </div>
  )
}

export default FoodInfo;
