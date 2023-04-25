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
    const stockItemDetail = useSelector(store => store.stockItemDetails[0])
    // console.log(`itemDetail:`, itemDetail);
    const dispatch = useDispatch();
    let suppliers = useSelector(store => store.suppliers)


    useEffect(() => {
        dispatch({ type: 'FETCH_SUPPLIERS' })
    }, []);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        dispatch({ type: "GET_ITEM_DETAIL", payload: Number(itemDetail.id) });
        setPartName(itemDetail.part_name)
        setPartNumber(itemDetail.part_number)
        setDescription(itemDetail.description)
        setEstLeadTime(itemDetail.lead_time_weeks)
        setEstMTFF(itemDetail.mttf_months)
        setSupplierID(itemDetail.supplier_id)

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
        const itemID = itemDetail.id
        let updatedItemData = { itemID, partName, partNumber, description, estLeadTime, estMTTF, supplierID }
        dispatch({ type: 'UPDATE_INV_ITEM_DETAILS', payload: updatedItemData })

        dispatch({ type: 'GET_ITEM_DETAILS', payload: itemID })
        setOpen(false)
        if (stockItemDetail) {
            dispatch({ type: 'GET_STOCK_ITEM_DETAILS', payload: stockItemDetail.mot_id })
        }
    }

    if (itemDetail) {
        return (
            <>
                <div className='btn-container-no-margin'>
                    <Button variant='contained' sx={{ m: 1 }} onClick={handleOpen}>Edit Item Details</Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ ...style, border: 'none' }}>
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
                                <div className='confirmBtn'>
                                    <Button sx={{ marginLeft: 2, marginTop: 1 }} type='submit' variant='contained'>Submit</Button>
                                    <Button sx={{ marginLeft: 2, marginTop: 1 }} type='button' color='secondary' variant='contained' onClick={() => setOpen(false)}>Cancel</Button>
                                </div>
                            </form>
                        </Typography>
                    </Box>
                </Modal>
            </>
        );
    } else {
        return null
    }
}