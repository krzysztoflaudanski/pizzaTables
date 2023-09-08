import { Container } from 'react-bootstrap';
import AddTableForm from '../../features/AddTableForm/AddTableForm';

const AddTable = () => {
    return (<section id="AddTable">
        <Container>
            <h1>AddTable</h1>
            <AddTableForm />
        </Container>
    </section>
    )
}

export default AddTable;