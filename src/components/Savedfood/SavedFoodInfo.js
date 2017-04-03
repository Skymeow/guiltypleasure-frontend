import React, {Component} from 'react';
import {Link} from 'react-router';

class SavedFoodInfo extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: {
        display: 'block'
      },
       listIsVisible: {
      display: 'block'
    }
    };
  }

  handleDelete() {
    fetch(`http://localhost:8000/saved_food/${this.props.food_id}`, {
      method: 'DELETE'
    })
    .then(() => {
      this.setState({ listIsVisible: {display: 'none'}});
      })
    .catch((err) => {
      console.log('Error:', err);
    });
  }
 render() {
  return(
    <div>
       <div className="saved_food_info" style={this.state.listIsVisible}>
         <ul>
           <li>Name: {`${this.props.name}`}</li>
           <div className="img-map">
             <li><img className="img-item" src={`${this.props.picture}`} /></li>
           </div>
           <li>Calories: {`${this.props.calories}`}</li>
         </ul>
          <Link to="/users/dashboard">
           <button className="delete" onClick={this.handleDelete.bind(this)}>Remove from list</button>
          </Link>
       </div>
    </div>
  )
 }


}


export default SavedFoodInfo;

