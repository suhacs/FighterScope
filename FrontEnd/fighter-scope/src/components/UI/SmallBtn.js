import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const SmallBtn = (props) => {
  const themeStyle = () => {
    const theme = createTheme({
      palette: {
        primary: {
          main: props.buttonType === 'edit' ? '#CCE488' : '#000000', // Customize primary color based on buttonType
        },
        secondary: {
          main: props.buttonType === 'edit' ? '#E0C2FF' : '#000000', // Customize secondary color based on buttonType
          light: props.buttonType === 'edit' ? '#CCE488' : '#000000',
          contrastText: '#FFFFFF',
        },
      },
    });

    return theme;
  };

  const handleClickButton = () => {
    if (props.handleClickOpen) {
      props.handleClickOpen();
    } else if (props.deleteHandler) {
      props.deleteHandler();
    }
  };

  return (
    <ThemeProvider theme={themeStyle()}>
      <Button
        variant='contained'
        size='small'
        className='edit-button'
        onClick={handleClickButton}
      >
        {props.children}
      </Button>
    </ThemeProvider>
  );
};

export default SmallBtn;
