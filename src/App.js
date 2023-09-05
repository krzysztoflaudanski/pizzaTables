import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';
import NotFound from "./components/views/NotFound/NotFound";
import Home from "./components/pages/Home/Home";
import Table from "./components/pages/Table/Table";
import { fetchTables } from "./redux/tablesRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import AddTable from "./components/pages/AddTable/AddTable";
import { fetchStatus } from "./redux/statusRedux";



function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);
  useEffect(() => dispatch(fetchStatus()), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addtable" element={<AddTable />} />
        <Route path="/table/:tableId" element={<Table />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
