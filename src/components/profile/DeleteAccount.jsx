import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from '../../data/firebaseConfig'; // ייבוא האותנטיקציה מ-Firebase
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import '../../styles/DeleteAccount.css'; // ייבוא קובץ ה-CSS

const DeleteAccount = () => {
  const navigate = useNavigate();

  const deleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        try {
          // מחיקת פרטי המשתמש מה-Firestore
          await deleteDoc(doc(db, "users", user.uid));
          // מחיקת חשבון המשתמש מ-Firebase Authentication
          await deleteUser(user);
          toast.success('Your account has been successfully deleted.');
          navigate('/'); // ניתוב לדף הבית לאחר המחיקה
        } catch (error) {
          console.error('Error deleting user:', error);
          toast.error('Failed to delete your account. Please try again later.');
        }
      }
    } else {
      toast.error('No user is currently signed in.');
    }
  };

  return (
    <div className="delete-account">
      <ToastContainer />
      <button onClick={deleteAccount} className="delete-account-button">Delete My Account</button>
    </div>
  );
};

export default DeleteAccount;