import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Ireducers, Iuser } from "../../../lib/types";
import { getAllUsers } from "../../redux/slice/user-detail-redux/all-users";
import styles from "../../styles/AdminManageUsers.module.css";


const AdminManageUsers = () => {
  const dispatch: Function = useDispatch();
  const allUsers: any = useSelector<Ireducers>((state) => state.reducerAllUsers.allUsers); // EZE SEND HELP! :)

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  
  if (!allUsers) return <div className={styles.users_management__loading}>Loading...</div>


  return (
    <div className={styles.users_management__container}>
      <h1 className={styles.users_management__title}>Users management</h1>
      
      {allUsers[0] ? 
        <div className={styles.users__container}>
          {allUsers.map((user: any, index: number) => {
            return (
              <div className={styles.user__container} key={user.id}>
                <div className={styles.user__image_container}>
                  <Image 
                    className={styles.user__image} 
                    src={user.image.split(">")[1]}
                    alt={"user: " + index}
                    height="100"
                    width="100"
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
            )
          })}
        </div>
        : <div className={styles.loading}>Loading...</div>
      }
    </div>
  );
};

export default AdminManageUsers;