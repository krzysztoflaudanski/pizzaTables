import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getAllTables, getTableById } from "../../../redux/tablesRedux";
import { Form } from "react-router-dom";

const EditTableForm = () => {
    const {tableId} = useParams();
    const table = useSelector(state => getTableById(state, tableId))
    return (
        <article>
            
        </article>
    )
}
export default EditTableForm