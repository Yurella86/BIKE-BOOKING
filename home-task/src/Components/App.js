import React, { useEffect } from 'react';
import 'react-dom';
import { useState } from 'react';
import './App.scss';
import Items from './Items/Items';

function App() {

  const [state, setState] = useState([
    { id: 1, name: "BMW", type: "F 650", color: "сірий", status: "available", prise: 5000 },
    { id: 2, name: "Suzuki", type: "F 350", color: "зелений", status: "available", prise: 4000 },
    { id: 3, name: "Honda", type: "600", color: "червоний", status: "busy", prise: 2300 },
    { id: 4, name: "Pulsar", type: "150", color: "синій", status: "unavailable", prise: 1500 }]);

  const [newItem, setNewItem] = useState({
    id: 0,
    name: "",
    type: "",
    color: "",
    status: "available",
    prise: 0,
    wheeleSize: 0,
    description: ""
  })
  const [countAvailable, setCountAvailable] = useState(0)
  const [countBooked, setCountBooked] = useState(0)
  const [averageCost, setAverageCost] = useState(0)

  let changeCostAllBike = 0;

  function availableBike() {
    const resultAvailable = state.filter((el) => {
      if (el.status === 'available') {
        return el
      }
    })
    setCountAvailable(resultAvailable.length)
  }

  function busyBike() {
    const resultStatusBooked = state.filter((el) => {
      if (el.status === 'busy') {
        return el
      }
    })
    setCountBooked(resultStatusBooked.length)
  }

  function changeAverageCost() {

    state.map((el) => {
      return changeCostAllBike += Number(el.prise);
    })
    setAverageCost(changeCostAllBike / state.length)
  }

  function newStateStatus(newStatus, id) {
    setState(state.map((obj) => (
      obj.id === id ?
        obj = {
          id: obj.id,
          name: obj.name,
          type: obj.type,
          color: obj.color,
          status: newStatus,
          prise: obj.prise
        }
        : obj)));
  }

  function addNewItem(el) {
    el.preventDefault()
    let newObject = {
      id: null,
      name: newItem.name,
      type: newItem.type,
      color: newItem.color,
      status: "available",
      prise: newItem.prise,
      wheeleSize: newItem.wheeleSize,
      description: newItem.description
    };
    newObject.id = state[state.length - 1].id + 1

    if (newObject.name.length > 4 && newObject.type.length > 4 && newObject.color.length > 4 && newObject.prise > 0 && newObject.wheeleSize && newObject.description.length > 4) {
      setState(state.concat(newObject))

    } else {
      alert('enter form min five symbols')
    }
    console.log(newItem);
  }

  function deleteObject(id) {
    setState(state.filter(el => el.id !== id))
  }

  useEffect(() => {
    availableBike()
    busyBike()
    changeAverageCost()
  }, [state])

  useEffect(() => {
    changeAverageCost()
  })

  return (
    <div className="wrapper">
      <div className="header">
        <div className="email-address">ADMIN.BIKE-BOOKING.COM</div>
      </div>

      <div className="main">
        <div className="items">
          {state.map((item) => (
            <Items
              id={item.id}
              name={item.name}
              type={item.type}
              color={item.color}
              status={item.status}
              prise={item.prise}
              changeStatus={(newStatus, id) => { newStateStatus(newStatus, id) }}
              deleteItem={(id) => { deleteObject(id) }}
            />))}
        </div>
        <div className="form-area">
          <div className="form">
            <form>
              <div className="inputs">
                <div className="column-left">
                  <input placeholder="Name"
                    onChange={(el) => newItem.name = el.target.value}></input>
                  <input placeholder="Color" onChange={(el) => newItem.color = el.target.value}></input>
                  <input type="number" placeholder="Price" onChange={(el) => newItem.prise = el.target.value}></input>
                </div>
                <div className="column-right">
                  <input placeholder="Type" onChange={(el) => newItem.type = el.target.value}></input>
                  <input type='number' placeholder="Wheele size"
                    onChange={(el) => newItem.wheeleSize = el.target.value}></input>
                  <input type="number" placeholder="ID (slug): ХХХХХХХХХХХХХ" onChange={(el) => newItem.id = el.target.value}></input>
                </div>
              </div>
              <div className="description-area">
                <textarea placeholder="Description" onChange={(el) => newItem.description = el.target.value}>

                </textarea>
              </div>
              <div className="buttons">
                <button onClick={(el) => addNewItem(el)}>SAVE</button>
                <button>CLEAR</button>
              </div>
            </form>
          </div>
          <div className="statistics">
            <div className="title-statistics">Statistics</div>
            <div className="total-bike">Total Bike:<span>{state.length}</span></div>
            <div className="available-bikes">Available Bikes:<span>{countAvailable}</span></div>
            <div className="booked-bikes">Booked Bikes:<span>{countBooked}</span></div>
            <div className="prise-total">Average bike cost:<span>{averageCost.toFixed(2)}</span>UAH/hr.</div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="developer">
          Developer:
          <span>Yuriy</span>
          <span>Turko</span>
        </div>
      </div>

    </div>
  );
}

export default App;
