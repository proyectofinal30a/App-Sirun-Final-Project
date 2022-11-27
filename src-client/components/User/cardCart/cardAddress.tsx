import React from "react";
import { Iaddresses } from "../../../../lib/types";
interface prop {
  addresses: Iaddresses[];
  styles: any;
  index: number;
  mySelect: {
    current: any;
  };
}
export default function CardAddress({addresses, mySelect, styles, index}: prop) {
  mySelect.current =
    index === 1000
      ? {
          name_address: "",
          phone: {
            number: "",
            area_code: "",
          },
          street_name: "",
          street_number: "",
          zip_code: "",
        }
      : addresses[index];

  return index !== 1000 ? (
    <div className={styles.addresses_info_container}>
      <h1 className={styles.addresses_title_name}>{addresses[index].name_address}</h1>
      <p>
        <span className={styles.address_span}>Phone number:</span>
        {" "}+{addresses[index].phone.area_code}{" "}{addresses[index].phone.number}
      </p>
      <p className={styles.address_street}>
        <span className={styles.address_span}>Street:</span> 
        {" "}{addresses[index].street_name.toLowerCase()} {addresses[index].street_number}
      </p>
      <p>
        <span className={styles.address_span}>Zip code:</span>
        {" "}{addresses[index].zip_code}
      </p>
    </div>
  ) : (
    <p></p>
  );
}
