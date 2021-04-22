import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import FoodForm from './FoodForm';
class FoodModal extends Component {
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
        let title = 'Edit food';
        let button = '';
        if (isNew) {
            title = 'Add food';
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
                    <FoodForm
                        addFood={this.props.addFood}
                        updateFood={this.props.updateFood}
                        toggle={this.toggle}
                        food={this.props.food} />
                </ModalBody>
            </Modal>
        </Fragment>;
    }
}
export default FoodModal;