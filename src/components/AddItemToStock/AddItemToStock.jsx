import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export default function AddItemToStock() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams()


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const itemDetail = useSelector(store => store.itemDetail[0])

    const [qtyInField, setQtyInField] = useState('')
    const [qtyOwned, setQtyOwned] = useState(0)
    const [stockOverride, setStockOverride] = useState(false)
    const [stockOverrideQty, setStockOverrideQty] = useState(0)

    useEffect(() => {
        dispatch({ type: "GET_ITEM_DETAIL", payload: id });
    }, []);


// Add boolean search for the relevant item upon add? some other way to push back the mot_id here? Response from server?

    const handleAddItem = (e) => {
        e.preventDefault();
        let object_id = itemDetail.id
        let addItemDetail = {object_id, qtyInField, qtyOwned, stockOverride, stockOverrideQty}
        dispatch({ type: "ADD_ITEM_TO_STOCK", payload: addItemDetail})
        history.push(`/mystock/0`)
    }


    return (
        <>
            <Button startIcon={<AddCircleIcon />} sx={{m: 1, width: 300}} variant="contained" color="success"onClick={handleOpen}>Add Item To My Stock</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Item To My Stock
                    </Typography>
                    <form onSubmit={handleAddItem}>
                        <div>
                            Quantity in Field
                            <input required placeholder='Quantity installed' type="number" value={qtyInField} onChange={(e) => setQtyInField(e.target.value)} />
                        </div>
                        <div>
                            Quantity in Stock
                            <input placeholder='Quantity in stock' type="number" value={qtyOwned} onChange={(e) => setQtyOwned(e.target.value)} />
                        </div>

                        {stockOverride ?
                            <>
                                <div>
                                    <Button variant="contained" color='secondary' onClick={() => { setStockOverride(false) }} type="button">Turn off Override</Button>
                                </div>
                                <div>Stock Override Quantity
                                    <input placeholder='Override Qty' value={stockOverrideQty} type="number" onChange={(e) => setStockOverrideQty(e.target.value)} />
                                </div>
                            </>
                            : <Button variant="contained" onClick={() => { setStockOverride(true) }} type="button">Activate Stock Override</Button>}
                        <br /><br />
                        <div className='confirmBtn'>
                            <Button sx={{ marginLeft: 2, marginTop: 1 }} type='submit' variant='contained'>Add Item To My Stock</Button>
                            <Button sx={{ marginLeft: 2, marginTop: 1 }} type='button' color='secondary' variant='contained' onClick={() => setOpen(false)}>Cancel Add Item</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
}