import { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import { listUsers, deleteUser } from '../store/actions/userActions';
import { User } from '../types/types';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

type UserList = {
  loading: boolean;
  error: string | null;
  users: User[];
};

type UserLogin = {
  userInfo: User | null;
};

const UserListScreen = () => {
  const navigate = useNavigate();
  const distpach = useAppDispatch();

  const userList: UserList = useAppSelector((state: any) => state.userList);
  const { loading, error, users } = userList;

  const userLogin: UserLogin = useAppSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useAppSelector((state: any) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    distpach(listUsers() as any);
  }, [distpach, navigate, successDelete]);

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure?')) {
      distpach(deleteUser(id) as any);
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i
                      className='fas fa-check'
                      style={{
                        color: 'green',
                      }}
                    ></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant='secondary' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
