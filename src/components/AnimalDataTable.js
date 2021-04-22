import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import AnimalModal from '../form/AnimalModal';
import { ANIMALS_API_URL } from '../constants';
class AnimalDataTable extends Component {
  deleteAnimal = id => {
    let confirmDeletion = window.confirm('Do you really wish to delete it?');
    if (confirmDeletion) {
      fetch(`${ANIMALS_API_URL}/deleteanimal?AnimalId=${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          this.props.deleteAnimal(id);
        })
        .catch(err => console.log(err));
    }
  }
  render() {
    const items = this.props.items;
    return <Table striped>
      <thead className="thead-dark" align="center">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody align="center">
        {!items || items.length <= 0 ?
          <tr>
            <td colSpan="6" ><b>No animals yet</b></td>
          </tr>
          : items.map(item => (
            <tr key={item.animalId}>
              <td>
                {item.animalId}
              </td>
               <td>
                {item.name}
              </td>
              <td>
                <div>
                  <AnimalModal
                    isNew={false}
                    animal={item}
                    updateAnimal={this.props.updateAnimal} />
                  &nbsp;&nbsp;&nbsp;
                  <Button color="danger" onClick={() => this.deleteAnimal(item.animalId)}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>;
  }
}
export default AnimalDataTable;