import { Container } from 'react-bootstrap';
import AddTableForm from '../../features/AddTableForm/AddTableForm';

const AddTable = () => {
    return (<section id="AddTable">
        <Container className='mx-auto' style={{ minWidth: '300px', maxWidth: '800px' }}>
            <h1>AddTable</h1>
            <AddTableForm />
        </Container>
    </section>
    )
}

export default AddTable;