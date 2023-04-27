import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

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

export default function EditSupplier() {
    const dispatch = useDispatch();
    const supplierID = useParams();
    const supplierDetail = useSelector(store => store.supplierdetail[0])
    // console.log(`supplier Details:`, supplierDetail);

    // let suppliers = useSelector(store => store.suppliers)


    // useEffect(() => {
    //     dispatch({ type: "GET_SUPPLIER_DETAILS", payload: Number(supplierID.id)  });
    // }, []);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [supplier_name, setSupplierName] = useState(supplierDetail.supplier_name)
    const [supplier_address, setSupplierAddress] = useState(supplierDetail.supplier_address)
    const [supplier_phone, setSupplierPhone] = useState(supplierDetail.supplier_phone)
    const [supplier_email, setSupplierEmail] = useState(supplierDetail.supplier_email)
    const [supplier_url, setSupplierURL] = useState(supplierDetail.supplier_url)
    const [primary_contact_name, setPrimaryContactName] = useState(supplierDetail.primary_contact_name)
    const [primary_contact_phone, setPrimaryContactPhone] = useState(supplierDetail.primary_contact_phone)
    const [primary_contact_email, setPrimaryContactEmail] = useState(supplierDetail.primary_contact_email)
    const [updateSupplierID, setSupplierID] = useState(supplierID.id)

    // const handleSupplier = (e) => {
    //     setSupplierID(e.target.value)
    // }

    const submitEdits = (event) => {
        event.preventDefault();
        // set up defaults.

        let updatedSupplierData = { updateSupplierID, supplier_name, supplier_address, supplier_email, supplier_phone, supplier_url, primary_contact_name, primary_contact_phone, primary_contact_email }
        console.log(`In submit Edit`, updatedSupplierData);
        dispatch({ type: 'UPDATE_SUPPLIER_DETAILS', payload: updatedSupplierData })

        setOpen(false)
        // console.log(`itemID`, supplierID.id);
        dispatch({ type: 'GET_ITEM_DETAIL', payload: Number(updateSupplierID) })
    }

    return (
        <div>
            <Button sx={{minWidth: 200}} variant='contained' onClick={handleOpen} endIcon={<EditIcon />}>Edit Supplier</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Supplier
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'div'}>
                        {supplierDetail ? <form onSubmit={submitEdits}>
                            <div>Supplier Name
                                <input placeholder='supplier name' size="47" value={supplier_name} onChange={(e) => setSupplierName(e.target.value)} />
                            </div>
                            <div>Supplier Address
                                <input placeholder='supplier name' size="45" value={supplier_address} onChange={(e) => setSupplierAddress(e.target.value)} />
                            </div>
                            <div>Supplier Phone
                                <input placeholder='supplier name' size="47" value={supplier_phone} onChange={(e) => setSupplierPhone(e.target.value)} />
                            </div>
                            <div>Supplier Email
                                <input placeholder='supplier name' size="48" value={supplier_email} onChange={(e) => setSupplierEmail(e.target.value)} />
                            </div>
                            <div>Supplier Website
                                <input placeholder='supplier name' size="46" value={supplier_url} onChange={(e) => setSupplierURL(e.target.value)} />
                            </div>
                            <div>Primary Contact Name
                                <input placeholder='supplier name' size="40" value={primary_contact_name} onChange={(e) => setPrimaryContactName(e.target.value)} />
                            </div>
                            <div>Primary Contact Phone
                                <input placeholder='supplier name' size="39" value={primary_contact_phone} onChange={(e) => setPrimaryContactPhone(e.target.value)} />
                            </div>
                            <div>Primary Contact Email
                                <input placeholder='supplier name' size="40" value={primary_contact_email} onChange={(e) => setPrimaryContactEmail(e.target.value)} />
                            </div>

                            <div class="btn-container">
                                <Button type='submit'>Submit</Button>
                            </div>
                        </form> : null}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}