import styles from "../../styles/AdminManageUsers.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Ireducers, userData } from "../../../lib/types";
import { activeUser } from "../../../src-back/admin-users/putUsers";
import {getAllUsers, getUsersByName, clearUserSearch } from "../../redux/slice/user-detail-redux/all-users";
import cloudinaryOrUrl from "../../controllers/detectionOfImage";


const AdminManageUsers = () => {
  const dispatch: Function = useDispatch();
  
  const allUsers = useSelector((state: Ireducers) => state.reducerAllUsers.allUsers);
  const usersByName = useSelector((state: Ireducers) => state.reducerAllUsers.usersByName);

  let currentUsers: userData[] = [];
  if (usersByName.length > 0) {
    currentUsers = usersByName;
  } else {
    currentUsers = allUsers;
  }
  
  const [updUser, setUpdUser] = useState(true);
  const [name, setName] = useState("");
 
  
  useEffect(() => {
    dispatch(clearUserSearch()); 
    dispatch(getAllUsers());
  }, [dispatch, updUser]);


  if (!allUsers) return <div className={styles.users_management__loading}>Loading...</div>;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
    dispatch(getUsersByName(name, allUsers));
  };


  // Deactivate or activate accounts
  const userOnOffSwitch = async (id: any, status: string) => {
    await activeUser(id, status);
    dispatch(getAllUsers());
    updUser ? setUpdUser(false) : setUpdUser(true);
  }

  // Change user role to admin or to user (client)
  const userChangeRole = async (id: any, role: string) => {
    await activeUser(id, role);
    dispatch(getAllUsers());
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

      <div className={styles.users__container}>
        {allUsers[0] &&
          currentUsers.map((user: any, index: number) => {
            if(!user.image) return null;
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
                <div className={styles.user_info_container_mobile_separator}>
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

                  <div className={styles.user__btns_container}>
                    <button className={styles.user__reset_password_btn}>
                      Request password reset
                    </button>
                    {user.role === "admin" ? 
                      <button onClick={() => userChangeRole(user.id, "user")} className={styles.user__role_btn}>
                        Set user role
                      </button>
                      : 
                      <button onClick={() => userChangeRole(user.id, "admin")} className={styles.user__role_btn}>
                        Set admin role
                      </button>
                    }
                    {user.role !== "inactive" && 
                      <button onClick={() => userOnOffSwitch(user.id, "inactive")} className={styles.user__deactivate_btn}>
                        Deactivate account
                    </button>
                    }
                    {user.role === "inactive" && 
                      <button onClick={() => userOnOffSwitch(user.id, "user")} className={styles.user__activate_btn}>
                        Activate account
                      </button>
                    }
                  </div>

                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default AdminManageUsers;
