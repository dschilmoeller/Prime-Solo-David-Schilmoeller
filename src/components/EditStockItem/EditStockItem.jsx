import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux'

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

export default function EditStockItem() {
  const stockDetail = useSelector(store => store.stockItemDetails[0])
  console.log(`StockDetail:`, stockDetail);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 

  const submitEdits = () => { console.log(`!!`), setOpen(false); }

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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={submitEdits}>
              <div>Quantity in Field<input placeholder='Quantity installed' /></div>
              <div>Quantity in Stock<input placeholder='Quantity in stock' /></div>
              <div>Stock Override Quantity<input placeholder='Part Name' /></div>
              <button type='submit'>Submit</button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}