import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SmallBtn.css';

const SmallBtn = (props) => {
  const themeStyle = () => {
    const theme = createTheme({
      palette: {
        primary: {
          main: props.buttonType === 'edit' ? '#CCE488' : '#2d2e2c', // Customize primary color based on buttonType
        },
        secondary: {
          main: props.buttonType === 'edit' ? '#E0C2FF' : '#000000', // Customize secondary color based on buttonType
          light: props.buttonType === 'edit' ? '#CCE488' : '#000000',
          contrastText: '#000000',
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
        sx={{
          '&:hover': {
            backgroundColor:
              props.buttonType === 'edit' ? '#bce34d' : '#000000',
          },
        }}
      >
        {props.children}
      </Button>
    </ThemeProvider>
  );
};

export default SmallBtn;
