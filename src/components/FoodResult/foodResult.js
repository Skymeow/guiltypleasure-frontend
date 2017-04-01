import React, {Component} from 'react';
import {Link} from 'react-router';
import FoodInfo from './foodInfo';

class FoodResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm:'',
      food: {
        branded: []
      }
    }
  }

  searchTitle(event) {
    event.preventDefault();
    fetch(`http://localhost:8000/api/`, {
      method: 'POST',
      body: JSON.stringify({

        name: `${this.state.searchTerm}`

      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((results) => {
      results.json().then((data) => {

        this.setState({food: data})

      })

    })
    .catch((err) => {
      console.log('ERROR: ', err);
    })
  }


  handleSubmit(food) {
  // event.preventDefault();
    console.log(food);

    fetch('http://localhost:8000/saved_food', {
      method: 'POST',
      body: JSON.stringify({
        food: {
          name: `${food.food_name}`,
          picture: `${food.photo.thumb}`,
          calories: `${food.nf_calories}`
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      console.log("THIS IS handleSubmit")
      this.props.router.push('/users/dashboard');
    })
    .catch((err)=>{
      console.log('Error:', err);
    });
  }
// handleSubmit(event) {
//   event.preventDefault();
//   if(window.localStorage.getItem('loggedIn')) {
//     fetch('http://localhost:8000/api/saved_bar', {
//       method: 'POST',
//       body: JSON.stringify({
//         food: {
//           name: `${this.state.food.branded.food_name}`,
//           picture:`${this.state.food.photo.thumb}`,
//           calories:`${this.state.food.nf_calories}`
//         }
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(() => {
//       this.props.router.push('/users/dashboard');
//     })
//     .catch((err)=>{
//       console.log('Error:', err);
//     });
//   } else {
//     this.props.router.push('/login');
//   }

// }

render() {
  return(
    <div>
    <form
    onSubmit={this.searchTitle.bind(this)}
    >
    <input type="text"
    value={this.state.searchTerm}
    onChange={e=>this.setState({searchTerm:e.target.value})}
    placeholder="Search your craving food"
    />
    <input type="submit" value="Search" />
    </form>

    {this.state.food.branded.map((food)=>{
      return(
       <div key={food.nix_item_id}>
       <FoodInfo
       name={food.food_name}
       picture={food.photo.thumb}
       calories={food.nf_calories}
       />
      <Link to="/users/dashboard">
       <button onClick={this.handleSubmit.bind(this, food)}>Add to Favorites</button>
      </Link>
       </div>

       )
    })}
    </div>
    )
}


}

export default FoodResult;

