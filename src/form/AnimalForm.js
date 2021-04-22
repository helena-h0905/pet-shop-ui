import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { ANIMALS_API_URL } from '../constants';
class AnimalForm extends React.Component {
    animal = {
        animalId: 0,
        name: ''
    }
    componentDidMount() {
        if (this.props.animal) {
            const { animalId, name } = this.props.animal
            this.setState({ animalId, name});
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitNew = e => {
        e.preventDefault();
        fetch(`${ANIMALS_API_URL}/addanimal`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name
            })
        })
            .then(res => res.json())
            .then(state => {
                this.props.addAnimal(state);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
    submitEdit = e => {
        e.preventDefault();
        fetch(`${ANIMALS_API_URL}/updateanimal`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                animalId : this.props.animal.animalId,
                name: this.state.name
            })
        })
            .then(() => {                
                this.props.updateAnimal(this.props.animal.animalId);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
    render() {
        return <Form onSubmit={this.props.animal ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="name">Name:</Label>
                <Input type="text" name="name" onChange={this.onChange} defaultValue={this.props.animal ?  this.props.animal.name : ''} />
            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
}
export default AnimalForm;