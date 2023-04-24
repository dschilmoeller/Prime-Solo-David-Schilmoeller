import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';

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

export default function DeleteSupplier() {
  const supplierDetail = useSelector(store => store.supplierdetail[0])
  console.log(`supplierdetail.id?`, supplierDetail.id);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {setOpen(true)}
  const handleClose = () => setOpen(false);

  const ConfirmDelete = () => {
    event.preventDefault();
    console.log(`id of supplier:`, supplierDetail.id);
    // send dispatch
    dispatch({ type: 'DELETE_SUPPLIER', payload: supplierDetail.id})
    setOpen(false)
    history.push('/suppliers/0')
  }

  return (
    <div>
      <Button onClick={handleOpen}>Delete Supplier</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Supplier
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          <form onSubmit={ConfirmDelete}>
            <div>Are you sure you'd like to delete this supplier?</div>
            <div>THIS WILL DELETE ALL ITEMS ASSOCIATED WITH THE SUPPLIER</div>
            <Button type='submit'>Submit</Button><Button type="button" onClick={()=> setOpen(false)}>Cancel</Button>
          </form>
          {/* </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}