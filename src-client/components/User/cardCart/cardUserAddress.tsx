import React from "react";
import { Iaddresses, IDataAddress } from "../../../../lib/types";
import CardAddress from "./cardAddress";

interface prop {
  data: {
    user: {
      email: string;
      name: string;
    };
  };
  addresses: Iaddresses[];
  styles: any;
  mySelect: any;
  setAddress: Function;
  address: number;
  setButtonInput: Function;
  buttonInput: boolean;
  personInfo: IDataAddress;
  setInputAddres: Function;
  startNumber: number;
  setStartNumber: Function;
}

export default function CardUserAddress({
  data,
  mySelect,
  setButtonInput,
  buttonInput,
  address,
  setAddress,
  addresses,
  styles,
  personInfo,
  setInputAddres,
  startNumber,
  setStartNumber
}: prop) {
  if (!addresses[0])
    return (
      <div className={styles.addresses_empty_message}>
        <p>
          There are no addresses associated with this account. Please, add an
          address:
        </p>
      </div>
    );

  return (
    <div className={styles.first__column}>
      <div className={styles.existing_addresses__container}>
        <h3 className={styles.your_info_title}>Your information</h3>
        <p>
          <span className={styles.client_info_span}>Name:{" "}</span>
          {data.user.name}
        </p>
        <p>
          <span className={styles.client_info_span}>Email:{" "}</span> 
          {data.user.email}
        </p>
      </div>
      
      <div className={styles.addresses_container}>
        <h3 className={styles.addresses_title}>
          What address would you like the products to be sent to?
        </h3>

        <div className={styles.address_selection_container}>
          <select
            className={styles.addresses_select}
            onClick={() => {
              buttonInput && setButtonInput(!buttonInput);
              setInputAddres(personInfo);
            }}
            onChange={(e) => {
              setAddress(Number(e.target.value));
              if (e.target.value !== "1000") return setStartNumber(Number(e.target.value));
              setStartNumber(1000);
            }}
          >
            {addresses.map((address, index) => {
              return index === 0 ? (
                <>
                  <option value="" selected disabled>Select your address</option>
                  <option key={index} value={1000}>Add new address</option>
                  <option key={index + 22} value={index}>{address.name_address}</option>
                </>
              ) : (
                <option key={index} value={index}>{address.name_address}</option>
              );
            })}
          </select>

          <CardAddress
            addresses={addresses}
            mySelect={mySelect}
            index={address}
            styles={styles}
          />
        </div>

      </div>
    </div>
  );
}
