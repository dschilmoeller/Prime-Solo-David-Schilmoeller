import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from 'react'
import EditAllItems from "../EditAllItems/EditAllItems";
import AddItemToStock from "../AddItemToStock/AddItemToStock";
import DeleteItemFromAllItems from "../DeleteFromAllItems/DeleteFromAllItems";
import { Button } from "@mui/material";

function ItemDetail() {
    const history = useHistory();
    const dispatch = useDispatch();
    const itemDetail = useSelector(store => store.itemDetail[0])
    const { id } = useParams()

    // console.log(`user details`, user); // shows id of user logged in.
    // used to render edit button or not. NOT SECURE -> implement on backend.
    const user = useSelector(store => store.user.id)


    const headBack = () => {
        history.push('/allitems')
    }

    useEffect(() => {
        dispatch({ type: "GET_ITEM_DETAIL", payload: id });
    }, []);

    if (itemDetail) {
        let supplierID = `/#/suppliers/${itemDetail.supplier_id}`
        return (
            <>
                {/* Needs to be admin only */}
                {user === 1 ? <EditAllItems /> : null}
                {user === 1 ? <DeleteItemFromAllItems /> : null}
                <div>
                    <h1>{itemDetail.part_name}</h1>
                    <h2>Part Number: {itemDetail.part_number}</h2>
                    <div>{itemDetail.description}</div>
                    <div>Estimated Lead Time: {itemDetail.lead_time_weeks} weeks</div>
                    <div>Estimated Mean Time To Failure: {itemDetail.mttf_months} months</div>
                    <div>Supplier: <a href={supplierID}>{itemDetail.supplier_name}</a></div>
                    <br />
                    <AddItemToStock />
                    <br />
                    <Button onClick={headBack}>Return To All Items</Button>
                </div>
            </>
        )
    } else {
        return (
            <div>
                <h1>Bad Words.</h1>
            </div>
        )
    }
}

export default ItemDetail