import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from 'react'
import EditAllItems from "../EditAllItems/EditAllItems";
import AddItemToStock from "../AddItemToStock/AddItemToStock";
import DeleteItemFromAllItems from "../DeleteFromAllItems/DeleteFromAllItems";
import { Button } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


function ItemDetail() {
    const history = useHistory();
    const dispatch = useDispatch();
    const itemDetail = useSelector(store => store.itemDetail[0])
    const { id } = useParams()


    // used to render edit button or not. NOT SECURE -> implement on backend.
    const user = useSelector(store => store.user.user_type)
    // console.log(`user details`, user); // shows id of user logged in.

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
                <div className="btn-container-no-margin">
                    {user === 1 ? <EditAllItems /> : null}
                    {user === 1 ? <DeleteItemFromAllItems /> : null}
                </div>
                <div className="stock-container">
                    <div className="header-item">Name: {itemDetail.part_name}</div>
                    <div className="part-number">Part Number: {itemDetail.part_number}</div>
                    <div className="description">{itemDetail.description}</div>
                    <div>Estimated Lead Time: {itemDetail.lead_time_weeks} weeks</div>
                    <div>Estimated Mean Time To Failure: {itemDetail.mttf_months} months</div>
                    <div>Supplier: <a href={supplierID}>{itemDetail.supplier_name}</a></div>
                </div>
                <div className="btn-container-no-margin">
                    <div className="btn-container-no-margin">
                        <AddItemToStock />
                    </div>
                    <div className="btn-container-no-margin">
                    <Button variant="outlined" onClick={headBack} startIcon={<ArrowCircleLeftIcon />}>Back To All Items</Button>
                    </div>
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