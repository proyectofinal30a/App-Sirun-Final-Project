import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Ireducers } from "../../../lib/types";
import {getAllUsers, getUsersByName, clearUserSearch } from "../../redux/slice/user-detail-redux/all-users";
import cloudinaryOrUrl from "../../controllers/detectionOfImage";
import styles from "../../styles/AdminManageUsers.module.css";

const AdminManageUsers = () => {
  const dispatch: Function = useDispatch();

  const allUsers = useSelector((state: Ireducers) => state.reducerAllUsers.allUsers);
  const usersByName = useSelector((state: Ireducers) => state.reducerAllUsers.usersByName);

  const [name, setName] = useState("");

  let currentUsers: any = [];
  if (usersByName.length > 0) {
    currentUsers = usersByName;
  } else {
    currentUsers = allUsers;
  }

  
  useEffect(() => {
    dispatch(clearUserSearch()); 
    dispatch(getAllUsers());
  }, [dispatch]);


  if (!allUsers) return <div className={styles.users_management__loading}>Loading...</div>;
  console.log(usersByName)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
    dispatch(getUsersByName(name, allUsers));
  };


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
