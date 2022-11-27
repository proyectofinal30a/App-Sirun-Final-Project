import React from "react";
import { Iaddresses, IDataAddress } from "../../../../lib/types";
interface prop {
  errors: IDataAddress;
  mySelect: any;
  styles: any;
  inputAddres: IDataAddress;
  isOpenModal: Function;
}
export default function ButtonConfirmInf({mySelect, isOpenModal, inputAddres, styles, errors}: prop): JSX.Element {
  const myError = Object.values(errors).find((e) => e !== "");

  if (mySelect.current.phone.number)
    return (
      <div className={styles.payment__btn_container}>
        <button
          className={styles.payment__btn}
          onClick={() => isOpenModal()}
        >
          Continue to payment
        </button>
      </div>
    );
  if (myError === undefined && inputAddres.name_address)
    return (
      <div className={styles.payment__btn_container}>
        <button
          className={styles.payment__btn}
          onClick={() => isOpenModal()}
        >
          Continue to payment
        </button>
      </div>
    );

  return <></>;
}
