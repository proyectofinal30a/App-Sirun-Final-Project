import React from "react";
import { Iaddresses, IDataAddress } from "../../../../lib/types";
interface prop {
  dateState: string;
  errors: IDataAddress;
  mySelect: any;
  styles: any;
  inputAddres: IDataAddress;
  isOpenModal: Function;
}
export default function ButtonConfirmInf({ dateState, mySelect, isOpenModal, inputAddres, styles, errors }: prop): JSX.Element {
  const myError = Object.values(errors).find((e) => e !== "");

  if (mySelect.current.phone.number && dateState !== '')
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
  if (myError === undefined && inputAddres.name_address && dateState !== '')
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
