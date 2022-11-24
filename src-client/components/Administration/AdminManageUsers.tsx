import styles from "../../styles/AdminManageUsers.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Ireducers } from "../../../lib/types";
import { activeUser } from "../../../src-back/admin-users/putUsers";
import {getAllUsers, getUsersByName, clearUserSearch } from "../../redux/slice/user-detail-redux/all-users";
import cloudinaryOrUrl from "../../controllers/detectionOfImage";


const AdminManageUsers = () => {
  const dispatch: Function = useDispatch();
  
  const allUsers = useSelector((state: Ireducers) => state.reducerAllUsers.allUsers);
  const usersByName = useSelector((state: Ireducers) => state.reducerAllUsers.usersByName);

  let currentUsers: any = [];
  if (usersByName.length > 0) {
    currentUsers = usersByName;
  } else {
    currentUsers = allUsers;
  }
  
  const [updUser, setUpdUser] = useState(true)
  const [name, setName] = useState("");

  
  useEffect(() => {
    dispatch(clearUserSearch()); 
    dispatch(getAllUsers());
  }, [dispatch, updUser]);


  if (!allUsers) return <div className={styles.users_management__loading}>Loading...</div>;
  console.log(usersByName)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
    dispatch(getUsersByName(name, allUsers));
  };


  // DESACTIVAR USERS
  const userChange = async (id: any, status: string) => {
    await activeUser(id, status);
    dispatch(getAllUsers);
    updUser ? setUpdUser(false) : setUpdUser(true);
  }

  return (
    <div className={styles.users_management__container}>
      <h1 className={styles.users_management__title}>Users management</h1>

      <div className={styles.users_management__searchbar}>
        <input
          type="search"
          placeholder="Search user name"
          className={styles.search_bar__input}
          autoComplete="on"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </div>

      {allUsers[0] ? (
        <div className={styles.users__container}>
          {currentUsers.map((user: any, index: number) => {
            return (
              <div className={styles.user__container} key={user.id}>
                <div className={styles.user__image_container}>
                  <Image
                    className={styles.user__image}
                    src={cloudinaryOrUrl(user.image, "client") || ""}
                    alt={"user: " + index}
                    height="300"
                    width="300"
                  />
                </div>

                <div className={styles.user__info_container}>
                  <p className={styles.user__info}>
                    <span className={styles.user__span}>Name: </span>
                    {user.name}
                  </p>
                  <p className={styles.user__info}>
                    <span className={styles.user__span}>Email: </span>
                    {user.email}
                  </p>
                  <p className={styles.user__info}>
                    <span className={styles.user__span}>ID: </span>
                    {user.id}
                  </p>
                  <p className={styles.user__info}>
                    <span className={styles.user__span}>Current role: </span>
                    {user.role}
                  </p>
                </div>

                {user.role === 'user' && <button onClick={() => userChange(user.id,'inactive')}>Deactivate account</button>}
                {user.role === 'inactive' && <button onClick={() => userChange(user.id,'user')}>Activate account</button>}

              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.loading}>Loading...</div>
      )}
    </div>
  );
};

export default AdminManageUsers;
