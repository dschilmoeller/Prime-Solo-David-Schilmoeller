import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

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

export default function DeleteItemFromStock() {
  const stockDetail = useSelector(store => store.stockItemDetails[0])
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {setOpen(true)}
  const handleClose = () => setOpen(false);

  const ConfirmDelete = () => {
    event.preventDefault();
    console.log(`id of item:`, stockDetail.mot_id);
    // send dispatch
    dispatch({ type: 'DELETE_MY_STOCK_ITEM', payload: stockDetail.mot_id})
    setOpen(false)
    history.push('/mystock/0')
  }

  return (
    <div>
      {/* <div className='btn-container-no-margin'> */}
      <Button endIcon={<DeleteIcon />} sx={{m: 1, width: 300}} onClick={handleOpen} color="error" variant='contained'>Delete Item From My Stock</Button>
      {/* </div> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Item From Stock
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          <form onSubmit={ConfirmDelete}>
            <div>Are you sure you'd like to remove this item from your stock?</div>
            <div className='confirmBtn'>
            <Button sx={{ marginLeft: 2, marginTop: 1 }} type='submit' variant='contained'>Delete</Button>
            <Button sx={{ marginLeft: 2, marginTop: 1 }} type='button' color='secondary' variant='contained' onClick={()=> setOpen(false)}>Cancel</Button>
            </div>
          </form>
          {/* </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}