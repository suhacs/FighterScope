import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { updateFighterById } from '../../../services/FighterHttp';
import { countries } from '../../../data/countries';

const EditDialog = (props) => {
  const nameRef = useRef(null);
  const nationalityRef = useRef(null);

  const updateFighter = async () => {
    try {
      const fighterBeUpdated = {
        name: nameRef.current.value,
        nationality: nationalityRef.current.value,
      };

      const updatedFighter = await updateFighterById(
        props.fighterInfo.id,
        fighterBeUpdated
      );

      const originalData = props.fighterData.find(
        (element) => element.id === props.fighterInfo.id
      );

      const index = props.fighterData.indexOf(originalData);
      console.log(index);
      const fighterCopy = [...props.fighterData];
      fighterCopy[index] = updatedFighter;
      console.log(fighterCopy);

      //   props.fighterHandler(fighterCopy);
      props.closeHandler();
    } catch (error) {
      console.error(`Error occurred during updating the fighters!: ${error}`);
    }
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle style={{ fontSize: '1.8rem' }}>Edit Fighter</DialogTitle>
      <DialogContent style={{ fontSize: '1.8rem' }}>
        <DialogContentText>
          {' '}
          Please amend the information and select 'save' to confirm the changes.
        </DialogContentText>
        <TextField
          fullWidth
          id='filled-required'
          label='Name'
          variant='standard'
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginTop: '1rem' }}
          defaultValue={props.fighterInfo.name}
          inputRef={nameRef}
        />
        <Autocomplete
          id='size-small-standard'
          size='small'
          options={countries}
          getOptionLabel={(option) => option}
          defaultValue={props.fighterInfo.nationality}
          renderInput={(params) => (
            <TextField
              style={{ marginTop: '1rem' }}
              {...params}
              label='Nationality'
              variant='standard'
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={nationalityRef}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            updateFighter();
          }}
        >
          Save
        </Button>
        <Button onClick={props.closeHandler}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
