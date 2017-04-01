import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import update from "react-addons-update";

import SavedFoodInfo from './SavedFoodInfo';

let caloriesTotal = 0;
let caloriesBurnedTotal = 0;
class Savedfood extends Component {
  constructor(props) {
    super(props);
    this.state ={
      food: [
       {
        name:'Burger'
       }
      ],
    burnFat: {
      age: 30,
      gender: 'female',
      height_cm: 190,
      ran_hours: 1,
      ran_miles: 3,
      weight_kg: 60,
      yoga_min: 30,
      walk_miles: 1,
      walk_hours: 1,
      spin_min: 30
    },
    burnedCalories: ''

    }
  }

  componentDidMount() {
    // console.log("THIS IS SAVEDFOOD",data)
    fetch('http://localhost:8000/saved_food', {
      method: 'GET'
    })
    .then((results) => {
      results.json().then((data) => {
       // console.log("&&&&&&&",data.data)
        this.setState({
          food: data.data,
        });
      })
    })
    .catch((err) => {
      console.log('Error:', err);
    });
  }

  handleChange(event) {
    console.log(event.target.name, event.target.value)

    let newState = update(this.state, {
       burnFat:{
         $merge: {
          [event.target.name]: event.target.value
         }
       }
    })
    this.setState(newState);
    console.log("HANdle Change )))))", this.state)
  }
  searchBurnedCarlories(event) {
    console.log('%%%%%',this.state);
    event.preventDefault();
    fetch('http://localhost:8000/api/calories' ,{
      method: 'POST',
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ran_miles: this.state.burnFat.ran_miles,
        ran_hours: this.state.burnFat.ran_hours,
        gender: this.state.burnFat.gender,
        weight_kg: parseInt(this.state.burnFat.weight_kg),
        height_cm: parseInt(this.state.burnFat.height_cm),
        age: parseInt(this.state.burnFat.age),
        yoga_min: parseInt(this.state.burnFat.yoga_min),
        walk_miles: parseInt(this.state.burnFat.walk_miles),
        walk_hours: parseInt(this.state.burnFat.walk_hours),
        spin_min: parseInt(this.state.burnFat.spin_min)
      })
    })
     .then((results) => {
      results.json().then((data) => {
        caloriesBurnedTotal = data.exercises[0].nf_calories+data.exercises[1].nf_calories+data.exercises[2].nf_calories+data.exercises[3].nf_calories
        this.setState({burnedCalories: caloriesBurnedTotal})
        console.log("THIS IS searchBurnedCarlories",data)
      })
      .then(()=>{
        browserHistory.push("/users/dashboard");
      })
    })
      .catch((err) => {
      console.log('ERROR: ', err);
    })
  }

  render() {
   return(
    <div className="savedfood-container">
     <div className="exercise">
      <h2>Exercise</h2>
       <form
       onSubmit={this.searchBurnedCarlories.bind(this)}
       >
       <input type="text"
       name="age"
       onChange={this.handleChange.bind(this)}
       placeholder="type your age"
       />
       <input type="text"
       name="gender"
       onChange={this.handleChange.bind(this)}
       placeholder="type in female/male"
       />
       <input type="text"
       name="height_cm"
       onChange={this.handleChange.bind(this)}
       placeholder="type in height"
       />
       <input type="text"
       name="ran_hours"
       onChange={this.handleChange.bind(this)}
       placeholder="type in hour you've ran"
       />
       <input type="text"
       name="ran_miles"
       onChange={this.handleChange.bind(this)}
       placeholder="type in miles you've ran"
       />
       <input type="text"
       name="weight_kg"
       onChange={this.handleChange.bind(this)}
       placeholder="type in weight"
       />
       <input type="text"
       name="yoga_min"
       onChange={this.handleChange.bind(this)}
       placeholder="type in yoga min"
       />
       <input type="text"
       name="walk_miles"
       onChange={this.handleChange.bind(this)}
       placeholder="type in walk mile"
       />
       <input type="text"
       name="walk_hours"
       onChange={this.handleChange.bind(this)}
       placeholder="type in walk hour"
       />
       <input type="text"
       name="spin_min"
       onChange={this.handleChange.bind(this)}
       placeholder="type in spin min"
       />
       <input type="submit" value="Search calories" />
      </form>
     {this.state.burnedCalories}
     </div>

     <div className="craving_list">
     <h2>Your Craving food list</h2>
     {this.state.food.map((food) => {
      console.log("THIS IS FOOD IN MAP",food)
      caloriesTotal += food.calories;
      return(
      <div>
       <div key={food.id}>
       <SavedFoodInfo
       name={food.name}
       picture={food.picture}
       calories={food.calories}
       />
       </div>
      </div>
      )
      })}
     <h3>{console.log(caloriesTotal)}</h3>
     </div>

    </div>
     )
  }


}

export default Savedfood;


