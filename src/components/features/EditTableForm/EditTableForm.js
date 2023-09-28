import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import { useDispatch, useSelector } from "react-redux";
import { editTableRequest, getAllTables } from "../../../redux/tablesRedux";
import { getAllStatus } from "../../../redux/statusRedux";
import { useParams } from "react-router-dom";
import { getTableById } from "../../../redux/tablesRedux";

const EditTableForm = () => {

    const { tableId } = useParams();
    const table = useSelector(state => getTableById(state, tableId))
    const tables = useSelector(getAllTables);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const statusOptions = useSelector(getAllStatus)

    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('');
    const [people, setPeople] = useState('');
    const [maxPeople, setMaxPeople] = useState('');
    const [bill, setBill] = useState(1);
    const [showBill, setShowBill] = useState(false);

    useEffect(() => {
        if (tables.length > 0) {
            const availableTables = tables.some(table => table.id === tableId)
            if (!availableTables) {
                navigate('/')
            }
        }
    }, [tables, tableId, navigate]);

    useEffect(() => {
        if (table) {
            setNumber(table.number);
            setStatus(table.status);
            setPeople(table.people);
            setMaxPeople(table.maxPeople);
            setBill(table.bill);
            if (table.status === statusOptions[0]) {
                setShowBill(true)
            }
        }
    }, [table, statusOptions]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editTableRequest(number, status, people, maxPeople, bill, tableId))
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
        setBill('0');
    }

    return (
        <><h1>Table {number}</h1>
            <Form onSubmit={handleSubmit}>
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
                <Button type="submit">Edit Table</Button>
            </Form>
        </>
    )
}
export default EditTableForm