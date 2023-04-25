import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";

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



export default function AddSupplier() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams()


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [supplier_name, setSupplierName] = useState('')
    const [supplier_address, setSupplierAddress] = useState('')
    const [supplier_email, setSupplierEmail] = useState('')
    const [supplier_phone, setSupplierPhone] = useState('')
    const [supplier_url, setSupplierURL] = useState('')
    const [primary_contact_name, setPrimaryName] = useState('')
    const [primary_contact_phone, setPrimaryPhone] = useState('')
    const [primary_contact_email, setPrimaryEmail] = useState('')



    const handleAddSupplier = (e) => {
        e.preventDefault();

        let addSupplierDetails = {
            supplier_name, supplier_address, supplier_email, supplier_phone, supplier_url,
            primary_contact_name, primary_contact_phone, primary_contact_email
        }

        dispatch({ type: "ADD_SUPPLIER", payload: addSupplierDetails })
        dispatch({ type: "FETCH_SUPPLIERS"})
        setOpen(false)

        // this won't work. May have to useEffect on dispatch?
        // history.push('/suppliers/0')
    }


    return (
        <div>
            <Button variant='contained' sx={{ m: 1 }} onClick={handleOpen}>Add Supplier</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Supplier
                    </Typography>
                    <form onSubmit={handleAddSupplier}>
                        <div>
                            Supplier Name
                            <input placeholder='Supplier Name' value={supplier_name} onChange={(e) => setSupplierName(e.target.value)} />
                        </div>
                        <div>
                            Supplier Phone
                            <input placeholder='Supplier Phone' value={supplier_phone} onChange={(e) => setSupplierPhone(e.target.value)} />
                        </div>
                        <div>
                            Supplier Address
                            <input placeholder='Supplier Address' value={supplier_address} onChange={(e) => setSupplierAddress(e.target.value)} />
                        </div>
                        <div>
                            Supplier General Email
                            <input placeholder='Supplier General Email' value={supplier_email} onChange={(e) => setSupplierEmail(e.target.value)} />
                        </div>
                        <div>
                            Supplier URL
                            <input placeholder='Supplier URL' value={supplier_url} onChange={(e) => setSupplierURL(e.target.value)} />
                        </div>
                        <div>
                            Supplier Primary Contact Name
                            <input placeholder='Primary Contact Name' value={primary_contact_name} onChange={(e) => setPrimaryName(e.target.value)} />
                        </div>
                        <div>
                            Supplier Primary Contact Phone
                            <input placeholder='Primary Contact Phone' value={primary_contact_phone} onChange={(e) => setPrimaryPhone(e.target.value)} />
                        </div>
                        <div>
                            Supplier Primary Contact Email
                            <input placeholder='Primary Contact Email' value={primary_contact_email} onChange={(e) => setPrimaryEmail(e.target.value)} />
                        </div>

                        <br /><br />
                        <div class="btn-container">
                        <Button type='submit'>Submit</Button><Button type='button' onClick={() => setOpen(false)}>Cancel</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}