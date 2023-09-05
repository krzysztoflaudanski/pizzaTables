import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { addTableRequest } from "../../../redux/tablesRedux";
import Stack from 'react-bootstrap/Stack';
import { maxPeopleControl } from "../../../utils/maxPeopleControl";
import { getAllStatus } from "../../../redux/statusRedux";


const AddTableForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const statusOptions = useSelector(getAllStatus)


    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('');
    const [people, setPeople] = useState('0');
    const [maxPeople, setMaxPeople] = useState('0');
    const [bill, setBill] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addTableRequest({ number, status, people, maxPeople, bill }))
        setNumber('');
        setStatus('');
        setPeople('')
        setMaxPeople('')
        setBill('')
        navigate('/')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="number" style={{ width: '200px' }}>
                <Stack Stack direction="horizontal" gap={3}>
                    <Form.Label>Table&nbsp;number:</Form.Label>
                    <Form.Control type="number" value={number} onChange={e => setNumber(e.target.value)} />
                </Stack>
            </Form.Group>
            <Form.Group className="mb-3" controlId="status" style={{ width: '300px' }}>
                <Stack Stack direction="horizontal" gap={2}>
                    <Form.Label>Status:</Form.Label>
                    <Form.Select
                        aria-label="Default select example" value={status} onChange={e => setStatus(e.target.value)} >
                        <option value=''>Select status...</option>
                         {statusOptions.map(item =>
                            <option key={item}>{item}</option>
                        )} 
                    </Form.Select>
                </Stack>
            </Form.Group>
            <Stack Stack direction="horizontal" gap={2}>
                <Form.Group className="mb-3" controlId="people" style={{ width: '150px' }}>
                    <Stack Stack direction="horizontal" gap={2}>
                        <Form.Label>People:</Form.Label>
                        <Form.Control type="number" value={people} onChange={e => setPeople(e.target.value)} />
                    </Stack>
                </Form.Group>
                <Form.Group className="mb-3" controlId="maxPeople" style={{ width: '120px' }}>
                    <Stack Stack direction="horizontal" gap={2}>
                        <Form.Label>/</Form.Label>
                        <Form.Control type="number" value={maxPeople} placeholder={maxPeopleControl(maxPeople, people, setMaxPeople)} onChange={e => setMaxPeople(e.target.value)} />
                    </Stack>
                </Form.Group>
            </Stack>
            <Form.Group className="mb-3" controlId="bill" style={{ width: '150px' }}>
                <Stack Stack direction="horizontal" gap={2}>
                    <Form.Label>Bill:&nbsp;$</Form.Label>
                    <Form.Control type="number" value={bill} onChange={e => setBill(e.target.value)} />
                </Stack>
            </Form.Group>
            <Button type="submit">Add Table</Button>
        </Form>
    )
}



export default AddTableForm