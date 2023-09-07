import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { addTableRequest } from "../../../redux/tablesRedux";
import Stack from 'react-bootstrap/Stack';
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
    const [showBill, setShowBill] = useState(false)

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addTableRequest({ number, status, people, maxPeople, bill }))
        navigate('/')
    }

    const handlePeople = (e) => {
        if (!(status === statusOptions[1]) && !(status === statusOptions[3]))
            setPeople(e);
        if (parseInt(e) > parseInt(maxPeople))
            setMaxPeople(e)
    }

    const handleMaxPeople = (e) => {
        setMaxPeople(e);
        if (parseInt(e) < parseInt(people))
            setPeople(e)
    }

    const handleSetStatus = (e) => {
        setShowBill(false);
        setStatus(e);
        if (e === statusOptions[1] || e === statusOptions[3])
        setPeople('0')
        if (e === statusOptions[0])
        setShowBill(true);
        setBill('0')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="number" style={{ width: '200px' }}>
                <Stack Stack direction="horizontal" gap={3}>
                    <Form.Label>Table&nbsp;number:</Form.Label>
                    <Form.Control type="number" value={number} min="0" onChange={e => setNumber(e.target.value)} />
                </Stack>
            </Form.Group>
            <Form.Group className="mb-3" controlId="status" style={{ width: '300px' }}>
                <Stack Stack direction="horizontal" gap={2}>
                    <Form.Label>Status:</Form.Label>
                    <Form.Select
                        aria-label="Default select example" value={status} onChange={e => handleSetStatus(e.target.value)} >
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
                        <Form.Control type="number" value={people} min="0" max="10" onChange={e => handlePeople(e.target.value)} />
                    </Stack>
                </Form.Group>
                <Form.Group className="mb-3" controlId="maxPeople" style={{ width: '120px' }}>
                    <Stack Stack direction="horizontal" gap={2}>
                        <Form.Label>/</Form.Label>
                        <Form.Control type="number" value={maxPeople} min="0" max="10" onChange={e => handleMaxPeople(e.target.value)} />
                    </Stack>
                </Form.Group>
            </Stack>
            {showBill && <Form.Group className="mb-3" controlId="bill" style={{ width: '150px' }}>
                <Stack Stack direction="horizontal" gap={2}>
                    <Form.Label>Bill:&nbsp;$</Form.Label>
                    <Form.Control type="number" value={bill} min="0" onChange={e => setBill(e.target.value)} />
                </Stack>
            </Form.Group>}
            <Button type="submit">Add Table</Button>
        </Form>
    )
}



export default AddTableForm