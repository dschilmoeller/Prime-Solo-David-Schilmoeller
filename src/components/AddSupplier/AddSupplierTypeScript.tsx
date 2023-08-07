import * as React from 'react'; // Import React
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Dialog, DialogContent, DialogTitle, Input } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState} from 'react';
// import { useHistory, useParams } from 'react-router-dom';}

interface SupplierDetails {
    supplier_name: string;
    supplier_address: string;
    supplier_email: string;
    supplier_phone: string;
    supplier_url: string;
    primary_contact_name: string;
    primary_contact_phone: string;
    primary_contact_email: string;
}

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '75%',
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

export default function AddSupplierTypescript() {
    const dispatch = useDispatch();
    // const history = useHistory();
    // const { id } = useParams();

    // specify type of state here
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // specify state types
    const [supplier_name, setSupplierName] = useState<string>('');
    const [supplier_address, setSupplierAddress] = useState<string>('');
    const [supplier_email, setSupplierEmail] = useState<string>('');
    const [supplier_phone, setSupplierPhone] = useState<string>('');
    const [supplier_url, setSupplierURL] = useState<string>('');
    const [primary_contact_name, setPrimaryName] = useState<string>('');
    const [primary_contact_phone, setPrimaryPhone] = useState<string>('');
    const [primary_contact_email, setPrimaryEmail] = useState<string>('');

    const handleAddSupplier = (e: React.FormEvent) => {
        e.preventDefault();

        // altered form
        let addSupplierDetails: SupplierDetails = {
            supplier_name,
            supplier_address,
            supplier_email,
            supplier_phone,
            supplier_url,
            primary_contact_name,
            primary_contact_phone,
            primary_contact_email,
        };

        dispatch({ type: 'ADD_SUPPLIER', payload: addSupplierDetails });
        dispatch({ type: 'FETCH_SUPPLIERS' });
        setOpen(false);

    };

    return (
        <div>
            <Button variant="contained" sx={{ m: 1 }} onClick={handleOpen}>
                Add Supplier
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Box >
                {/* sx={style} */}
                    <DialogTitle><Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Supplier
                    </Typography></DialogTitle>
                    <DialogContent>Test Writing
                    <form onSubmit={handleAddSupplier}>
                    <div>
                            Supplier Address
                            <input placeholder='Supplier Address' value={supplier_address} onChange={(e) => setSupplierAddress(e.target.value)} />
                        </div>
                    </form>
                    </DialogContent>
                </Box>
            </Dialog>
        </div>
    );
}
