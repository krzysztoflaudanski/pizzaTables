import { Container } from "react-bootstrap"
import AllTables from "../../features/AllTables/AllTables"

const Home = () => {
    return (
        <Container>
            <h1>All Tables</h1>
            <AllTables />
        </Container>
    )
}

export default Home