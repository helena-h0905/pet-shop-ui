import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import FoodModal from '../form/FoodModal';
import { FOOD_API_URL } from '../constants';
import Moment from 'moment';
class FoodDataTable extends Component {
  deleteFood = id => {
    let confirmDeletion = window.confirm('Are you sure you want to delete this item?');
    if (confirmDeletion) {
      fetch(`${FOOD_API_URL}/deletefood?foodId=${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          this.props.deleteFood(id);
        })
        .catch(err => console.log(err));
    }
  }
  render() {
    const items = this.props.items;
    return <Table striped variant="dark">
      <thead className="thead-dark"  align="center">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Description</th>
          <th>Animal</th>
          <th>Number of packages in storage</th>
          <th>Package weight</th>
          <th>Earliest expiration date</th>
          <th>Food kind</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody  align="center">
        {!items || items.length <= 0 ?
          <tr>
            <td colSpan="10" align="center"><b>No food yet</b></td>
          </tr>
          : items.map(item => (
            <tr key={item.foodId}>
              <td>
                {item.foodId}
              </td>
               <td>
                {item.name}
              </td>
              <td>
                {item.description}
              </td>
               <td>
                {item.animalName}
              </td>
              <td>
                {item.numberOfPackagesInStorage}
              </td>
               <td>
                {item.packageWeightInKg} kg
              </td>
              <td>
                {Moment(item.earliestExpirationDate).format('DD-MM-YYYY')}
              </td>
              <td>
                {item.foodKindName}
              </td>
              <td>
                {parseFloat(item.price).toFixed(2)}
              </td>
              <td width="200px" align="center">
                <div>
                  <FoodModal
                    isNew={false}
                    food={item}
                    updateFood={this.props.updateFood} />
                  &nbsp;&nbsp;&nbsp;
                  <Button color="danger" onClick={() => this.deleteFood(item.foodId)}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>;
  }
}
export default FoodDataTable;
