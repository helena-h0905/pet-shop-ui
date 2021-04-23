import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { FOOD_API_URL } from '../constants';
import { ANIMALS_API_URL } from '../constants';

class FoodForm extends React.Component {
    
    food = {
        foodId: 0,
        name: '',
        description: '',
        animalId: 0,
        animalName: '',
        numberOfPackagesInStorage: 0,
        packageWeightInKg: 0.0,
        earliestExpirationDate: '2021-10-24',
        foodKindId: 0,
        foodKindName: '',
        price: 0.0
    }

    state = {
        animals: [],
        selectedAnimal: ''
    }

    componentDidMount() {
        if (this.props.food) {
            const { foodId, name, description, animalId, animalName, numberOfPackagesInStorage, packageWeightInKg, earliestExpirationDate, foodKindId, foodKindName, price } = this.props.food
            this.setState({ foodId, name, description, animalId, animalName, numberOfPackagesInStorage, packageWeightInKg, earliestExpirationDate, foodKindId, foodKindName, price });
        }
      //  this.getAnimals();
    }
    
    //Fetching animals for dropdown list
    getAnimals = () => {
        fetch(`${ANIMALS_API_URL}/getanimals`)
            .then((response) => {
            return response.json();
            })
            .then(data => {
            let animalsFromApi = data.map(animal => {
                return {value: animal.animalId, display: animal.name}
            });
            this.setState({
                animals: [{value: '', display: 'Choose'}].concat(animalsFromApi)
            });
            }).catch(error => {
            console.log(error);
            });

            console.log(this.props.state);
        }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitNew = e => {
        e.preventDefault();
        fetch(`${FOOD_API_URL}/addfood`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                animalId: this.state.animalId,
                numberOfPackagesInStorage: this.state.numberOfPackagesInStorage,
                packageWeightInKg: this.state.packageWeightInKg,
                earliestExpirationDate: this.state.earliestExpirationDate,
                foodKindId: this.state.foodKindId,
                price: this.state.price
            })
        })
            .then(res => res.json())
            .then(state => {
                this.props.addFood(state);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }

    submitEdit = e => {
        e.preventDefault();
        fetch(`${FOOD_API_URL}/updatefood`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                foodId: this.props.food.foodId,
                name : this.state.name,
                description: this.state.description,
                animalId: this.selectedAnimal,
                numberOfPackagesInStorage: this.state.numberOfPackagesInStorage,
                packageWeightInKg: this.state.packageWeightInKg,
                earliestExpirationDate: this.state.earliestExpirationDate,
                foodKindId: this.state.foodKindId,
                price: this.state.price
            })
        })
            .then(() => {                
                this.props.updateFood(this.props.food.foodId);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
    render() {
        return <Form onSubmit={this.props.food ? this.submitEdit : this.submitNew}> 
            <FormGroup>
                <Label for="name">Name:</Label>
                <Input type="text" name="name" onChange={this.onChange} defaultValue={this.props.food ?  this.props.food.name : ''} />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description:</Label>
                <Input type="text" name="description" onChange={this.onChange} defaultValue={this.props.food ?  this.props.food.description : ''} />
            </FormGroup>
            <FormGroup>
                <Label for="animalId">Animal:</Label>
                {/* <select name =""
                value={this.selectedAnimal!= "" ? this.selectedAnimal : this.props.food.animalId}
                onChange={ e => this.setState({[this.state.selectedAnimal]: e.target.value })}
                >
                {this.state.animals.map((animal) => <option key={animal.value} value={animal.value}>{animal.display}</option>)}
                </select> */}
                <Input type="text" name="animalId" onChange={this.onChange} defaultValue={this.props.food ?  this.props.food.animalId : ''} />
            </FormGroup>
            <FormGroup>
                <Label for="numberOfPackagesInStorage">Number of packages left in storage:</Label>
                <Input type="text" name="numberOfPackagesInStorage" onChange={this.onChange} defaultValue={this.props.food ?  this.props.food.numberOfPackagesInStorage : ''} />
            </FormGroup>
            <FormGroup>
                <Label for="packageWeightInKg">Package weight:</Label>
                <Input type="text" name="packageWeightInKg" onChange={this.onChange} defaultValue={this.props.food ?  this.props.food.packageWeightInKg : ''} />
            </FormGroup>
            <FormGroup>
                <Label for="earliestExpirationDate">Earliest expiration date:</Label>
                <Input type="text" name="earliestExpirationDate" onChange={this.onChange} defaultValue={this.props.food ?  this.props.food.earliestExpirationDate : ''} />
            </FormGroup>
            <FormGroup>
                <Label for="foodKindId">Food kind:</Label>
                <Input type="text" name="foodKindId" onChange={this.onChange} defaultValue={this.props.food ?  this.props.food.foodKindId : ''} />
            </FormGroup>
            <FormGroup>
                <Label for="price">Price:</Label>
                <Input type="text" name="price" onChange={this.onChange} defaultValue={this.props.food ?  this.props.food.price : ''} />
            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
}
export default FoodForm;
