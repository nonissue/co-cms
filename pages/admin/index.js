import AdminLayout from '../../components/admin-layout';

const Admin = ({ user }) => {
  console.log(user);
  return (
    <AdminLayout>
      <h1>AdminLayout</h1>
    </AdminLayout>
  );
};

export default Admin;
