import React, {Component} from 'react';
import {Link} from 'react-router';

class SavedFoodInfo extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: {
        display: 'block'
      }
    };
  }

  // handleDelete() {
  //   fetch(`http://localhost:8000/saved_food/${this.props.bar_id}/${this.props.user_id}`,{
  //     method: 'DELETE'
  //   })
  //   .then(() => {
  //     this.setState({isVisible: {display: 'none'}});
  //   })
  //   .catch((err) => {
  //     console.log('Error:', err);
  //   });
  // }
 render() {
  return(
    <div>

       <div className="saved_food_info">
         <ul>
           <li>Name: {`${this.props.name}`}</li>
           <li><img src={`${this.props.picture}`} /></li>
           <li>Calories: {`${this.props.calories}`}</li>
         </ul>
       </div>
    </div>
  )
 }


}


export default SavedFoodInfo;

