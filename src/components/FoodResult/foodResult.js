import React, {Component} from 'react';
import {Link} from 'react-router';
import FoodInfo from './foodinfo.js';
import update from 'react-addons-update';

class FoodResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm:'',
      food: {
        branded: []
      },
      amount: {
        amount: 1
      }
    }
  }

  handleAdd(event) {
     let newState = update(this.state,{
        amount: {
          $merge: {
            [event.target.name]: event.target.value
          }
        }
     })
     this.setState(newState);
  }

  searchTitle(event) {
    event.preventDefault();
    fetch(`https://guiltypleasurefoodie.herokuapp.com/api/`, {
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
        console.log("THIS IS FOODRESULTS DATA",data)
        this.setState({food: data})

      })

    })
    .catch((err) => {
      console.log('ERROR: ', err);
    })
  }


  handleSubmit(food) {
    console.log("THIS IS HANDLESUBMIT",this.state.amount.amount);


    fetch('https://guiltypleasurefoodie.herokuapp.com/saved_food', {
      method: 'POST',
      body: JSON.stringify({
        food: {
          name: `${food.food_name}`,
          picture: `${food.photo.thumb}`,
          calories: `${food.nf_calories}`,
          serving_qty: parseInt(`${food.serving_qty}`),
          serving_unit: `${food.serving_unit}`
        },
        amount: parseInt(`${this.state.amount.amount}`)
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      console.log("THIS IS handleSubmit")
      // this.props.router.push('/users/dashboard');
      // browserHistory.push("/users/dashboard");
    })
    .catch((err)=>{
      console.log('Error:', err);
    });
  }

render() {
  return(
  <div className="page1-container">
    <div className="mask"></div>
    <div className="navbar">
      <div className="logo1"></div>
      <div className="logo2"></div>
      <Link to="/users/dashboard" className="link_nav">
          Checkout Your cravinglist
      </Link>
    </div>
    <div className="page1-content">
      <div className="col-sm-9 col-md-6 col-lg-8">
        <form
          className="navbar-form col-lg-8" role="search"
          onSubmit={this.searchTitle.bind(this)}
         >
            <div className="input-group col-lg-8">
               <input type="text"
               className="form-control"
               name="srch-term"
               id="srch-term"
               value={this.state.searchTerm}
               onChange={e=>this.setState({searchTerm:e.target.value})}
               placeholder="Search your craving food"
                />
                 <div className="input-group-btn">
                   <button id="search-button" className= "btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                 </div>
            </div>
        </form>
      </div>
       <div className="food-list">
        {this.state.food.branded.map((food)=>{
        return(
         <div className="food-map" key={food.nix_item_id}>
         {console.log("******************",food.serving_qty)}
         <FoodInfo
         name={food.food_name}
         picture={food.photo.thumb}
         calories={food.nf_calories}
         serving_qty={food.serving_qty}
         serving_unit={food.serving_unit}
         />
          <div id="amount-input">
             <input type="text"
             name="amount"
             onChange={this.handleAdd.bind(this)}
             placeholder="type the amount"
             />
          </div>
         <button id="add-to-fav" onClick={this.handleSubmit.bind(this, food)}>Add to Favorites</button>
         </div>
         )
        })}
     </div>
    </div>
  </div>
    )
}


}

export default FoodResult;

