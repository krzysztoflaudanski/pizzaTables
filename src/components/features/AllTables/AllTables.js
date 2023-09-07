import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux';
import { NavLink } from 'react-router-dom';


const AllTables = () => {

    const tables = useSelector(getAllTables);

    return (
        <section>{tables.map(table => (
            <div key={table.id} action={table.status}>
                <Stack direction="horizontal" gap={3} >
                    <Card border="light">
                        <Stack direction="horizontal" gap={3}>
                            <h3 className='mr-3'>Table {table.number}</h3>
                            <Card.Title className="my-auto">Status:</Card.Title>
                            <Card.Text className="my-auto">{table.status}</Card.Text>
                        </Stack>
                    </Card>
                    <Button variant="primary" className="p-2 ms-auto" >Delete table</Button>
                    <NavLink to={"table/" + table.id}>
                        <Button variant="primary" className="p-2">Show More</Button>
                    </NavLink>
                </Stack>
                <hr />
            </div>
        ))}
        </section>
    )
}


export default AllTables