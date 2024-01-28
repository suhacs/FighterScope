import React, { useState } from 'react';
import './EditFighter.css';
import SmallBtn from '../../UI/SmallBtn';
import EditDialog from '../MofidyFighter/EditDialog';
import DeleteDialog from '../MofidyFighter/DeleteDialog';

const EditFighter = (props) => {
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleEditOpen = () => {
    setEditDialog(true);
  };

  const handleEditClose = () => {
    setEditDialog(false);
  };

  const handleDeleteOpen = () => {
    setDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialog(false);
  };

  return (
    <React.Fragment>
      <div className='edit-button-wrapper-fighter'>
        <SmallBtn handleClickOpen={handleEditOpen} buttonType='edit'>
          Edit
        </SmallBtn>
        <SmallBtn deleteHandler={handleDeleteOpen} buttonType='delete'>
          Delete
        </SmallBtn>
        <EditDialog
          open={editDialog}
          openHandler={handleEditOpen}
          closeHandler={handleEditClose}
          fighterInfo={props.fighterInfo}
          fighterData={props.fighterData}
          fighterHandler={props.fighterHandler}
          // nameHandler={getNameDefaultValue}
          // nationalityHandler={getNationalityDefaultValue}
        />
        <DeleteDialog
          open={deleteDialog}
          fighterInfo={props.fighterInfo}
          openHandler={handleDeleteOpen}
          closeHandler={handleDeleteClose}
          fighterHandler={props.fighterHandler}
          figtherData={props.fighterData}
        />
      </div>
      <div className='mobile-edit-button'>
        <button className='mobile-edit' onClick={handleEditOpen}>
          Edit
        </button>
        <button className='mobile-delete' onClick={handleDeleteOpen}>
          Delete
        </button>
      </div>
    </React.Fragment>
  );
};

export default EditFighter;
