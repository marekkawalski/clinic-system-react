import withAuth from '../../../core/authentication/hoc/withAuth.tsx';

function MyAppointments() {
  return <div>Works!</div>;
}

const MyAppointmentsWithAuth = withAuth(MyAppointments);

export default MyAppointmentsWithAuth;
