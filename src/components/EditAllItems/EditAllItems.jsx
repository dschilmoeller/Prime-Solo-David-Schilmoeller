import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

// To Do - useEffect to get ID?

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

export default function EditAllItems() {
    const itemDetail = useSelector(store => store.itemDetail[0])
    // console.log(`itemDetail:`, itemDetail);
    const dispatch = useDispatch();
    let suppliers = useSelector(store => store.suppliers)
    const itemID = useParams();

    useEffect(() => {
        dispatch({ type: "GET_ITEM_DETAIL", payload: Number(itemID.id)  });
        dispatch({ type: 'FETCH_SUPPLIERS'})
    }, [dispatch]);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        dispatch({ type: "GET_ITEM_DETAIL", payload: Number(itemID.id) });
    }
    const handleClose = () => setOpen(false);

    // state - default should be relevant stockItemDetails
    const [partName, setPartName] = useState(itemDetail.part_name)
    const [partNumber, setPartNumber] = useState(itemDetail.part_number)
    const [description, setDescription] = useState(itemDetail.description)
    const [estLeadTime, setEstLeadTime] = useState(itemDetail.lead_time_weeks)
    const [estMTTF, setEstMTFF] = useState(itemDetail.mttf_months)
    const [supplierID, setSupplierID] = useState(itemDetail.supplier_id)
    

const handleSupplier = (e) => {
    setSupplierID(e.target.value)
}

    const submitEdits = () => {
        event.preventDefault();
        // set up defaults.
        let updatedItemData = { itemID, partName, partNumber, description, estLeadTime, estMTTF, supplierID }
        // console.log(`updated Item Data:`, updatedItemData);
        dispatch({ type: 'UPDATE_INV_ITEM_DETAILS', payload: updatedItemData })
        
        setOpen(false)
        console.log(`itemID`, itemID.id);
        dispatch({ type: 'GET_ITEM_DETAIL', payload: Number(itemID.id)})
    }

    return (
        <div>
            <Button onClick={handleOpen}>Edit Item</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Item
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'div'}>
                    <form onSubmit={submitEdits}>
                        <div>Part Name
                            <input placeholder='part name' value={partName} onChange={(e) => setPartName(e.target.value)} />
                        </div>
                        <div>Part Number
                            <input placeholder='part number' value={partNumber} onChange={(e) => setPartNumber(e.target.value)} />
                        </div>
                        <div>Description
                            <input placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div>Estimated Lead Time
                            <input placeholder='est lead time' value={estLeadTime} onChange={(e) => setEstLeadTime(e.target.value)} />
                        </div>
                        <div>Estimated MTTF
                            <input placeholder='est mttf' value={estMTTF} onChange={(e) => setEstMTFF(e.target.value)} selected />
                        </div>
                        <label htmlFor='suppliers'>Supplier</label>
                            <select name='suppliers' defaultValue={supplierID} onChange={handleSupplier}>
                                {suppliers.map(supplier => {
                                    return (
                                    <option key={supplier.id} value={supplier.id} >{supplier.supplier_name}</option>
                                    )
                                })}
                            </select>
                        <button type='submit'>Submit</button>
                    </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}