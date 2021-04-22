import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import FoodDataTable from './FoodDataTable';
import FoodModal from '../form/FoodModal';
import { FOOD_API_URL } from '../constants';
class Food extends Component {
  state = {
    items: []
  }
  componentDidMount() {
    this.getFood();
  }
  getFood = () => {
    fetch(`${FOOD_API_URL}/getallfood`)
      .then(res => res.json())
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err));
  }
  addFood = food => {
    this.setState(previous => ({
      items: [...previous.items, food]
    }));
    this.getFood();
  }
  updateFood = id => {
    this.getFood();
  }
  deleteFood = id => {
    const updated = this.state.items.filter(item => item.foodId !== id);
    this.setState({ items: updated })
    this.getFood();
  }
  render() {
    return <Container style={{ paddingTop: "100px" }}>
      <Row>
        <Col>
          <h3>Food</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <FoodDataTable
            items={this.state.items}
            updateFood={this.updateFood}
            deleteFood={this.deleteFood} />
        </Col>
      </Row>
      <Row>
        <Col>
          <FoodModal isNew={true} addFood={this.addFood} />
        </Col>
      </Row>
    </Container>;
  }
}
export default Food;