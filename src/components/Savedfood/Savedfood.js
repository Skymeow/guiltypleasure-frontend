import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import update from "react-addons-update";

import SavedFoodInfo from './SavedFoodInfo';

let craveListCal = 0;
let caloriesBurnedTotal = 0;
// let burnButton = document.getElementsByIdName("burnButton");
// let craveButton = document.getElementsByIdName("craveButton");


class Savedfood extends Component {
  constructor(props) {
    super(props);
    this.state ={
      food: [
       {
        calories: 100,
        id: 0,
        name: 'Burger',
        picture: 'png'
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
    burnedCalories: '',
    caloriesTotal: '',
    isVisible: {
      display: 'none'
    },
    modalShow: {
      display: 'none'
    },
    modalStop: {
      display: 'none'
    },
    finalResultButtonShow: false,
    burnIsVisible: {
      display: 'block'
    }


    }
  }
  // when does componentDidMount happen?? i need to push the get to savedfood page?s

  componentDidMount() {
    // console.log("THIS IS SAVEDFOOD",data)
    fetch('http://localhost:8000/saved_food', {
      method: 'GET'
    })
    .then((results) => {
      results.json().then((data) => {
        // console.log("THIS IS SAVEDFOOD",data.data)
        data.data.map((food) => {
          // console.log("FOOD IN DIDMOUNT", food)
          craveListCal += food.calories
        })
        this.setState({
          food: data.data,
          caloriesTotal: craveListCal
        });
      })
    })
    .catch((err) => {
      console.log('Error:', err);
    });
  }

  handleChange(event) {
    // console.log(event.target.name, event.target.value)

    let newState = update(this.state, {
       burnFat:{
         $merge: {
          [event.target.name]: event.target.value
         }
       }
    })
    this.setState(newState);
  }
  searchBurnedCarlories(event) {
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
        console.log("THIS IS searchBurnedCarlories",caloriesBurnedTotal)
      })
      .then(()=>{
        // browserHistory.push("/users/dashboard");
      })
    })
      .catch((err) => {
      console.log('ERROR: ', err);
    })
  }

  calculateFoodCalories(event){
     this.setState({ isVisible: {display: 'block'} });
     this.setState({finalResultButtonShow: true});
  }

  calculateBurnCalories(event){
     this.setState({ burnIsVisible: {display: 'block'} })
  }
  // compare the craving list cal and burnedCal
  compareCalories(event){
    if (this.state.caloriesTotal < this.state.burnedCalories) {
      this.setState({ modalShow: {display: 'block'} })
    } else {
      this.setState({ modalStop: {display: 'block'} });
    }
  }

   // let addAnimation(()=>{
   //  let animate =  document.getElementsByClassName("warn")
   //  animate.className += "animated bounceOutLeft"
   // })


  render() {
   return(
  <div className="savedfood-container">
    <div className="saved-background"></div>
    <div className="stop-filter" style={this.state.modalStop}>
      <h1 className="warn">Stop eating, you fat ass!</h1>
    </div>
    <div className="filter" style={this.state.modalShow}>
      <h1 className="congrats">Congrats!</h1><h1 className="enjoy">Enjoy</h1><h1 className="craving">your cravings</h1>
    </div>
      <div className="exercise">
        <h2>Exercise</h2>
        <form className="form-horizontal"
        onSubmit={this.searchBurnedCarlories.bind(this)}
        >
        <div className="form-group">
          <label className="control-label col-sm-2" for="age">Age:</label>
           <div className="col-sm-10">
             <input type="text"
             className="form-control"
             name="age"
             onChange={this.handleChange.bind(this)}
             placeholder="type your age"
             />
            </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="gender">Gender:</label>
           <div className="col-sm-10">
             <input type="text"
             className="form-control"
             name="gender"
             onChange={this.handleChange.bind(this)}
             placeholder="type in female/male"
             />
            </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="height">Height:</label>
           <div className="col-sm-10">
             <input type="text"
             className="form-control"
             name="height_cm"
             onChange={this.handleChange.bind(this)}
             placeholder="type in height"
             />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="ran_hours">ran_hours:</label>
           <div className="col-sm-10">
             <input type="text"
             className="form-control"
             name="ran_hours"
             onChange={this.handleChange.bind(this)}
             placeholder="type in hour you've ran"
             />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="ran_miles">ran_miles:</label>
           <div className="col-sm-10">
             <input type="text"
             className="form-control"
             name="ran_miles"
             onChange={this.handleChange.bind(this)}
             placeholder="type in miles you've ran"
             />
            </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="weight">Weight:</label>
           <div className="col-sm-10">
             <input type="text"
             className="form-control"
             name="weight_kg"
             onChange={this.handleChange.bind(this)}
             placeholder="type in weight"
             />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="yoga_min">yoga_min:</label>
           <div className="col-sm-10">
             <input type="text"
             className="form-control"
             name="yoga_min"
             onChange={this.handleChange.bind(this)}
             placeholder="type in yoga min"
             />
            </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="walk_miles">Walk_miles:</label>
           <div className="col-sm-10">
             <input type="text"
             className="form-control"
             name="walk_miles"
             onChange={this.handleChange.bind(this)}
             placeholder="type in walk mile"
             />
            </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="walk_hours">Walk_hours:</label>
           <div className="col-sm-10">
             <input type="text"
             className="form-control"
             name="walk_hours"
             onChange={this.handleChange.bind(this)}
             placeholder="type in walk hour"
             />
            </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="spin_min">Spin_min:</label>
           <div className="col-sm-10">
             <input type="text"
             className="form-control"
             name="spin_min"
             onChange={this.handleChange.bind(this)}
             placeholder="type in spin min"
             />
            </div>
        </div>
         <div className="form-group">
           <div className="col-sm-offset-2 col-sm-10">
             <button id="burnButton" className="btn btn-default" type="submit">Search calories</button>
           </div>
         </div>
      </form>
      <div className= "burned-results" style={this.state.burnIsVisible} >
       <h2>Calories Burned:</h2>
       <h3>{this.state.burnedCalories}</h3>
      </div>
    </div>
    <div className="see_if_can_eat" style={this.state.finalResultButtonShow ? {display: "block"} : {display: "none"}}>
      <button  className="outline-btn" onClick={this.compareCalories.bind(this)}>
      find out if can eat
      </button>
    </div>
    <div className="craving_list" style={this.state.listIsVisible}>
     <h2>Your Craving food list</h2>
     {this.state.food.map((food) => {
      // caloriesTotal += food.calories;
      return(
      <div>
       <div className="food-map" key={food.name}>
       <SavedFoodInfo
       name={food.name}
       picture={food.picture}
       calories={food.calories}
       food_id={food.id}
       />
       </div>
      </div>
      )
      })}
       <button  id="craveButton" className="outline-btn" onClick={this.calculateFoodCalories.bind(this)}>
        calories?
       </button>
        <div style={this.state.isVisible}>
          <h3>{this.state.caloriesTotal}</h3>
        </div>
    </div>

  </div>

     )
  }


}

export default Savedfood;


