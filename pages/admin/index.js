import AdminLayout from '../../components/admin-layout';

const Admin = ({ user }) => {
  console.log(user);
  return (
    <AdminLayout>
      <h1>Dashboard</h1>
      <h3>Recents</h3>
      <h3>Drafts</h3>
    </AdminLayout>
  );
};

export default Admin;
