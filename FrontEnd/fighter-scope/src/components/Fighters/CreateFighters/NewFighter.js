import React, { useState } from 'react';
import AddButton from '../../UI/AddButton';
import CrateNewFighters from './CreateNewFighters';

const NewFighter = () => {
  const [fighterUploader, setFighterUploader] = useState(true);

  const fighterHandler = () => {
    setFighterUploader(!fighterUploader);
  };
  return (
    <React.Fragment>
      <AddButton onClick={fighterHandler}>New Fighter 🤼‍♂️</AddButton>
      {fighterUploader && <CrateNewFighters />}
    </React.Fragment>
  );
};

export default NewFighter;
