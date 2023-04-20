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

export default function DeleteItemFromAllItems() {
  const itemDetail = useSelector(store => store.itemDetail[0])
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {setOpen(true)}
  const handleClose = () => setOpen(false);

  const ConfirmDelete = (e) => {
    e.preventDefault();
    dispatch({ type: 'DELETE_ITEM_FROM_ALL_ITEMS', payload: itemDetail.id})
    setOpen(false)
    history.push('/allitems')
  }

  return (
    <div>
      <Button onClick={handleOpen}>Delete Item</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Item
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          <form onSubmit={ConfirmDelete}>
            <div>Are you sure you'd like to remove this item from the master list?</div>
            <button type='submit'>Submit</button><button>Cancel</button>
          </form>
          {/* </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}