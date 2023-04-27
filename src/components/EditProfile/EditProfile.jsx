import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

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

export default function EditProfile() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [first_name, setFirstName] = useState(user.first_name)
    const [last_name, setLastName] = useState(user.last_name)
    const [user_email, setUserEmail] = useState(user.user_email)
    const [username, setUserName] = useState(user.username)
    const [user_type, setUserType] = useState(user.user_type)
    const [supplier_name, setSupplierName] = useState(user.supplier_company_name)
    const [supplier_address, setSupplierAddress] = useState(user.supplier_company_address)
    const [supplier_phone, setSupplierPhone] = useState(user.supplier_company_phone)
    const [supplier_url, setSupplierURL] = useState(user.supplier_company_url)
    const [supplier_email, setSupplierEmail] = useState(user.supplier_email)

    const submitEdits = (event) => {
        event.preventDefault();

        let updatedProfile = {
            first_name, last_name, user_email,
            username, user_type, supplier_name,
            supplier_address, supplier_phone, supplier_url,
            supplier_email
        }

        dispatch({ type: 'UPDATE_USER_PROFILE', payload: updatedProfile })
        setOpen(false)
    }

    const handleCancel = (event) => {
        event.preventDefault();
        clearFields();
        setOpen(false)
    }

    const clearFields = () => {
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setUserEmail(user.user_email)
        setUserName(user.username)
        setSupplierName(user.supplier_company_name)
        setSupplierAddress(user.supplier_company_address)
        setSupplierPhone(user.supplier_company_phone)
        setSupplierURL(user.supplier_company_url)
        setSupplierEmail(user.supplier_email)
    }

    return (
        <div>
            <Button variant='contained' onClick={handleOpen}>Edit Profile</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Profile
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'div'}>
                        {user ? <form onSubmit={submitEdits}>
                            <div>User First Name
                                <input placeholder='First Name' size="47" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div>Last Name
                                <input placeholder='Last Name' size="45" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div>Account Email
                                <input placeholder='Account Email' size="47" value={user_email} onChange={(e) => setUserEmail(e.target.value)} />
                            </div>
                            <div>Username
                                <input placeholder='Username' size="47" value={username} onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            {user.user_type === 1 ? (
                                <>
                                    {/* Render as drop  */}
                                    <div>Supplier Name
                                        <input placeholder='Supplier Name' size="47" value={supplier_name} onChange={(e) => setSupplierName(e.target.value)} />
                                    </div>
                                    <div>Supplier Address
                                        <input placeholder='Supplier Address' size="47" value={supplier_address} onChange={(e) => setSupplierAddress(e.target.value)} />
                                    </div>
                                    <div>Supplier Phone
                                        <input placeholder='Supplier Phone' size="47" value={supplier_phone} onChange={(e) => setSupplierPhone(e.target.value)} />
                                    </div>
                                    <div>Supplier URL
                                        <input placeholder='Supplier URL' size="47" value={supplier_url} onChange={(e) => setSupplierURL(e.target.value)} />
                                    </div>
                                    <div>Supplier Email
                                        <input placeholder='Supplier Email' size="47" value={supplier_email} onChange={(e) => setSupplierEmail(e.target.value)} />
                                    </div>
                                </>) : null}

                            <div className="btn-container">
                                <Button variant='contained' type='submit'>Submit</Button>
                            </div>
                            <div className="btn-container">
                                <Button variant='contained' color="secondary" type='buttton' onClick={handleCancel}>Cancel</Button>
                                {/* <Button variant='contained' color="secondary" type='buttton' onClick={() => handleCancel}>Cancel</Button> */}
                            </div>
                        </form> : null}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}