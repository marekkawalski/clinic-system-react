import UserForm from '../../../../shared/components/user-form/UserForm.tsx';
import './Registration.scss';

function Registration() {
  return (
    <div className='form-page'>
      <div className='form-component-wrapper'>
        <UserForm action='Register' />
      </div>
    </div>
  );
}

export default Registration;
