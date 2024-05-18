import './Hero.scss';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { PathConstants } from '../../../../core/constants/path.constants.ts';

function Hero() {
  return (
    <div className='hero-wrapper page-wrapper'>
      <div>
        <h1>Delivering cutting edge medical systems</h1>
        <Button
          variant='contained'
          color='primary'
          component={Link}
          to={PathConstants.DOCTORS_PATH}
        >
          Schedule appointment
        </Button>
      </div>
    </div>
  );
}

export default Hero;
