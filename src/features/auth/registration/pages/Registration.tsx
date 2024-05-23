import UserForm from '../../../../shared/components/user-form/UserForm.tsx';
import './Registration.scss';
import { FormType } from '../../../../shared/enums/FormType.ts';

function Registration() {
  return (
    <div className='form-page'>
      <div className='form-component-wrapper'>
        <UserForm action='Register' formType={FormType.WholePageForm} />
      </div>
    </div>
  );
}

export default Registration;
