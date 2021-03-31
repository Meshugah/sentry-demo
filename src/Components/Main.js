import {
    Modal,
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Jumbotron,
    ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import React from 'react';
import Joi from 'joi';
import '../App.css';
import axios from 'axios';

const numberSchema = Joi.number().min(100).max(99999999)
const customSchema = Joi.string().custom(async (value, helper) => {
    try {
        const response = await axios.post('https://api.bridge.matic.today/api/bridge/approval', {
            "txHashes": [`${value}`]
        })
        const responseCode = response.data.approvalTxStatus[`${value}`].code
        if (responseCode === 5) return true
        else return false
    }catch(e) {
        return false
    }
})

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
            modal2: false,
            modal3: false,
            validity: false
        }
    }

    toggleModal1 = () => this.setState({modal1: !this.state.modal1})
    toggleModal2 = () => this.setState({modal2: !this.state.modal2})
    toggleModal3 = () => this.setState({modal3: !this.state.modal3})


    validateNumber(e) {
        e.preventDefault()
        this.toggleModal1()
        throw new Error('Basic Sentry Check Error')
    }

    validateSchemaBasic(e) {
        e.preventDefault()
        const validate = document.getElementById('Input1').value
        this.toggleModal2()
        try{
            Joi.assert(validate, numberSchema)
        }
        catch{
            this.state.validity = false
            throw new Error('Sentry Type Check Error for Input: ' + validate)
        }
        this.state.validity = true
    }

    async validateSchemaCustom(e) {
        e.preventDefault()
        const validate = document.getElementById('Input2').value
        this.toggleModal3()
        const validationResponse = await customSchema.validateAsync(validate)
        this.setState(validationResponse === true ? {validity : true} : {validity : false})
    }

    render() {
        return (
            <div className="wrapper">
                <ul>
                <Form className="login-form form-wrapper">
                    <Jumbotron>
                        <h5 className="display-4">Sentry and Joi's Validation</h5>
                        <p className="lead">New Validation process to ensure all variables are validated. Bugs caught by Sentry</p>
                    </Jumbotron>
                    <FormGroup>
                        <Label>Basic Error throw to be caught by Sentry</Label>
                    </FormGroup>
                    <Row>
                        <Col>
                            <Button className="btn-block" color="success" onClick={(e) => { this.validateNumber(e)}}>Throw Error</Button>
                            <Modal isOpen={this.state.modal1} toggle={this.toggleModal1}>
                                <ModalHeader toggle={this.toggleModal1}>Validation</ModalHeader>
                                <ModalBody>
                                    ❌ Error Throw. Check Sentry.
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.toggleModal1}>Close</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row>
                </Form>
                </ul>
                <ul>
                    <Form className="login-form form-wrapper">

                    <FormGroup>
                        <Label for="Input1">Type checking example</Label>
                        <Input type="number" id="Input1" placeholder="Type in a number with at at least 3 digits and no more than 8" required/>
                    </FormGroup>
                    <Row>
                        <Col>
                            <Button className="btn-block" color="success" onClick={(e) => this.validateSchemaBasic(e)}>Submit Number</Button>
                            <Modal isOpen={this.state.modal2} toggle={this.toggleModal2}>
                                <ModalHeader toggle={this.toggleModal2}>Validation</ModalHeader>
                                <ModalBody>
                                    {this.state.validity? '✅ Validation was successful': '❌ Validation was unsuccessful'}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.toggleModal2}>Close</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row>
                </Form>
                </ul>
                <ul>
                <Form className="login-form form-wrapper">
                <FormGroup>
                        <Label for="Input2">Approval Bridge API response checker using custom JOI validation</Label>
                        <Input type="text" id="Input2" placeholder="Example bridge API transaction hash" required/>
                    </FormGroup>
                    <Row>
                        <Col>
                            <Button className="btn-block" color="success" onClick={async(e) => await this.validateSchemaCustom(e)}>Submit Transaction Hash</Button>
                            <Modal isOpen={this.state.modal3} toggle={this.toggleModal3}>
                                <ModalHeader toggle={this.toggleModal3}>Validation</ModalHeader>
                                <ModalBody>
                                    {this.state.validity? '✅ Validation was successful': '❌ Validation was unsuccessful'}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.toggleModal3}>Close</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row>
                </Form>
                </ul>
            </div>
        )
    }
}


export default Main;
