import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import AnimalDataTable from './AnimalDataTable';
import AnimalModal from '../form/AnimalModal';
import { ANIMALS_API_URL } from '../constants';
class Animal extends Component {
  state = {
    items: []
  }
  componentDidMount() {
    this.getAnimals();
  }
  getAnimals = () => {
    fetch(`${ANIMALS_API_URL}/getanimals`)
      .then(res => res.json())
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err));
  }
  addAnimal = animal => {
    this.setState(previous => ({
      items: [...previous.items, animal]
    }));
    this.getAnimals();
  }
  updateAnimal = id => {
    this.getAnimals();
  }
  deleteAnimal = id => {
    const updated = this.state.items.filter(item => item.animalId !== id);
    this.setState({ items: updated })
    this.getAnimals();
  }
  render() {
    return <Container style={{ paddingTop: "100px" }}>
      <Row>
        <Col>
          <h3>Animals</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <AnimalDataTable
            items={this.state.items}
            updateAnimal={this.updateAnimal}
            deleteAnimal={this.deleteAnimal} />
        </Col>
      </Row>
      <Row>
        <Col>
          <AnimalModal isNew={true} addAnimal={this.addAnimal} />
        </Col>
      </Row>
    </Container>;
  }
}
export default Animal;