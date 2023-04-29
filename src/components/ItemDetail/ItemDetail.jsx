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
        scroll(0, 0)
        return (
            <>
                <div className="stock-container">
                    <div className="buffer-box">

                        <div className="header-item">{itemDetail.part_name}</div>
                        <div className="part-number">Part Number: <b>{itemDetail.part_number}</b></div>


                        {user === 1 ? <EditAllItems /> : null}

                        {user === 1 ? <DeleteItemFromAllItems /> : null}

                        <img src={itemDetail.img_url} width={150} />


                        <div className="one-margin">
                            <p className="description">{itemDetail.description}</p>
                        </div>
                        <table>
                            <tr>
                                <td><b>Estimated Lead Time:</b></td>
                                <td>{itemDetail.lead_time_weeks} weeks</td>
                            </tr>
                            <tr>
                                <td><b>Estimated MTTF:</b></td>
                                <td>{itemDetail.mttf_months} months</td>
                            </tr>
                            <tr>
                                <td><b>Supplier:</b></td>
                                <td><a href={supplierID}>{itemDetail.supplier_name}</a></td>
                            </tr>
                        </table>
                        <br />
                        <AddItemToStock />
                        <Button sx={{ m: 1, width: 300 }} variant="outlined" color="success" onClick={headBack} startIcon={<ArrowCircleLeftIcon />}>Back To All Items</Button>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <div>
                <h1>Error Loading Page Details.</h1>
            </div>
        )
    }
}

export default ItemDetail