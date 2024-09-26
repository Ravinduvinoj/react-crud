import React, { useEffect, Fragment, useState } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Crud = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [city, setCity] = useState('')
    const [isActive, setisActive] = useState(0)
    const [EditId, EditsetId] = useState('')
    const [Editname, EditsetName] = useState('')
    const [Editage, EditsetAge] = useState('')
    const [Editcity, EditsetCity] = useState('')
    const [EditisActive, EditsetisActive] = useState(0)
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []); // Empty dependency array to run only once on mount

    const getData = () => {
        axios.get('http://localhost:5117/api/Student')
            .then((result) => {
                setData(result.data)
            }).catch((error) => {
                toast.error(error)
            })
    }

    const handleEdit = (id) => {
        handleShow();
        axios.get(`http://localhost:5117/api/Student/${id}`)
            .then((result) => {
                EditsetId(result.data.id)
                EditsetName(result.data.name)
                EditsetAge(result.data.age)
                EditsetCity(result.data.city)
                EditsetisActive(result.data.isActive)
            }).catch((error) => {
                toast.error(error)
            })
    }
    const handleDelete = (id) => {
        if (window.confirm("are you delete this record")) {
            axios.delete(`http://localhost:5117/api/Student/${id}`)
            getData();
            toast.success('Student has been deleted');

        }
    }

    const handleUpdate = () => {
        const url = `http://localhost:5117/api/Student/${EditId}`;
        const data = {
            "id": EditId,
            "name": Editname,
            "age": Editage,
            "city": Editcity,
            "isActive": EditisActive
        }

        axios.put(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Student has been Updated');

            })
    }

    const handleSave = () => {
        const url = 'http://localhost:5117/api/Student';
        const data = {
            "name": name,
            "age": age,
            "city": city,
            "isActive": isActive
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Student has been added');

            })
    }
    const clear = () => {
        setName('');
        setAge('');
        setCity('');
        setisActive(0);
        EditsetName('');
        EditsetAge('');
        EditsetCity('');
        EditsetisActive(0);

    }
    const handelActiveChange = (e) => {
        if (e.target.checked) {
            setisActive(1)
        }
        else {
            setisActive(0)
        }
    }
    const handelEditActiveChange = (e) => {
        if (e.target.checked) {
            EditsetisActive(1)
        }
        else {
            EditsetisActive(0)
        }
    }

    return (
        <Fragment>
            <br></br>
            <ToastContainer />
            <Container>
                <Row>
                    <Col><input type="text" className="form-control" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} /></Col>
                    <Col xs={6}><input type="text" className="form-control" placeholder="Enter Your age" value={age} onChange={(e) => setAge(e.target.value)} /></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter Your City" value={city} onChange={(e) => setCity(e.target.value)} /></Col>
                    <Col><input type="checkbox"
                        checked={isActive === 1 ? true : false}
                        onChange={(e) => handelActiveChange(e)} value={isActive}
                    />
                        <label>isActive</label></Col>
                    <Col><button className="btn btn-primary" onClick={() => handleSave()}>Submit</button></Col>
                </Row>

            </Container>
            <br></br>
            <div className="table-responsive p-3 " style={{ cursor: "pointer" }}>
                <Table striped bordered hover size="sm" className="table-light text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th>index</th>
                            <th>id</th>
                            <th>name</th>
                            <th>age</th>
                            <th>city</th>
                            <th>isActive</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.city}</td>
                                    <td>
                                        <span className={item.isActive ? "badge bg-success" : "badge bg-danger"}>
                                            {item.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td colSpan={2}>
                                        <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>
                                            Edit
                                        </button> &nbsp;&nbsp;
                                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit student</Modal.Title>
                </Modal.Header>
                <Container>
                    <Row>
                        <Col><input type="text" className="form-control" placeholder="Enter Your Name" value={Editname} onChange={(e) => EditsetName(e.target.value)} required /></Col>
                        <Col xs={6}><input type="text" className="form-control" placeholder="Enter Your age" value={Editage} onChange={(e) => EditsetAge(e.target.value)} required /></Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col><input type="text" className="form-control" placeholder="Enter Your City" value={Editcity} onChange={(e) => EditsetCity(e.target.value)} /></Col>
                        <Col><input type="checkbox"
                            checked={EditisActive === 1 ? true : false}
                            onChange={(e) => handelEditActiveChange(e)} value={EditisActive}
                        />
                            <label>isActive</label></Col>
                    </Row>
                    <br></br>
                </Container>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default Crud;