import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { auth, db } from '../data/firebaseConfig';
import { deleteUser, sendPasswordResetEmail } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc, query, orderBy } from 'firebase/firestore';

import Swal from 'sweetalert2';
import LoadingPage from '../assets/LoadingPage';
import { FaSearch, FaTrash, FaSort, FaEnvelope } from 'react-icons/fa';
import '../styles/UserManagement.css';

const UserManagement = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('displayName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, orderBy('createdAt', 'desc'));
      const userSnapshot = await getDocs(q);
      const userMap = new Map();

      userSnapshot.docs.forEach(doc => {
        const userData = { uid: doc.id, ...doc.data() };
        if (!userMap.has(userData.email) || userData.createdAt > userMap.get(userData.email).createdAt) {
          userMap.set(userData.email, userData);
        }
      });

      const uniqueUsers = Array.from(userMap.values());
      setUsers(uniqueUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      Swal.fire({
        icon: 'error',
        title: t('Error'),
        text: t('Failed to fetch users. Please try again.'),
      });
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: t('Delete this user?'),
      text: t("You won't be able to revert this!"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Yes, delete user!'),
      cancelButtonText: t('no. cancel!'),
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        
        const user = auth.currentUser;
        if (user && user.uid === userId) {
          await deleteUser(user);
        }

        setUsers(users.filter(user => user.uid !== userId));
        Swal.fire(t('Deleted!'), t('The user has been deleted.'), 'success');
      } catch (error) {
        console.error('Error deleting user:', error);
        Swal.fire(t('Error!'), t('There was an issue deleting the user. Please try again later.'), 'error');
      }
    }
  };

  const handleResetPassword = async (userEmail) => {
    const result = await Swal.fire({
      title: t('Confirm Password Reset'),
      text: t('Are you sure you want to send a password reset email to {{email}}?', { email: userEmail }),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Yes, send the email! 📧'),
      cancelButtonText: t('dont send')
    });

    if (result.isConfirmed) {
      try {
        await sendPasswordResetEmail(auth, userEmail);
        await Swal.fire({
          title: t('Successfully sent!'),
          text: t('Password reset email has been sent to {{email}}.', { email: userEmail }),
          icon: 'success'
        });
      } catch (error) {
        console.error('Error sending password reset email:', error);
        await Swal.fire({
          title: t('Error!'),
          text: t('There was an issue sending the password reset email. Please try again later.'),
          icon: 'error'
        });
      }
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const filteredAndSortedUsers = users
    .filter(user =>
      user.displayName?.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm) ||
      user.phoneNumber?.includes(searchTerm)
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="user-management">
      <h2>{t('User Management')}</h2>
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={t('Search users...')}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="users-table-container">
      <table className="users-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('displayName')}>
              {t('Name')} <FaSort className="sort-icon" />
            </th>
            <th onClick={() => handleSort('email')}>
              {t('Email')} <FaSort className="sort-icon" />
            </th>
            <th onClick={() => handleSort('phoneNumber')}>
              {t('Phone Number')} <FaSort className="sort-icon" />
            </th>
            <th>{t('Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedUsers.map(user => (
            <tr key={user.uid}>
              <td>{user.displayName || t('N/A')}</td>
              <td>{user.email || t('N/A')}</td>
              <td>{user.phoneNumber || t('N/A')}</td>
              <td>
                <button
                  className="action-button"
                  onClick={() => handleResetPassword(user.email)}
                  title={t('Send Password Reset Email')}
                >
                  <FaEnvelope />
                </button>
                <button
                  className="action-button delete"
                  onClick={() => handleDeleteUser(user.uid)}
                  title={t('Delete Account')}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="scroll-indicator">
      {t('Scroll horizontally to see more')}
    </div>
    </div>
  );
};

export default UserManagement;