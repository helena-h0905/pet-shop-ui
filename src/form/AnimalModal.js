import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AnimalForm from './AnimalForm';
class AnimalModal extends Component {
    state = {
        modal: false
    }
    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    }
    render() {
        const isNew = this.props.isNew;
        let title = 'Edit animal';
        let button = '';
        if (isNew) {
            title = 'Add animal';
            button = <Button
                color="success"
                onClick={this.toggle}
                style={{ minWidth: "200px" }}>Add</Button>;
        } else {
            button = <Button
                color="warning"
                onClick={this.toggle}>Edit</Button>;
        }
        return <Fragment>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                <ModalBody>
                    <AnimalForm
                        addAnimal={this.props.addAnimal}
                        updateAnimal={this.props.updateAnimal}
                        toggle={this.toggle}
                        animal={this.props.animal} />
                </ModalBody>
            </Modal>
        </Fragment>;
    }
}
export default AnimalModal;