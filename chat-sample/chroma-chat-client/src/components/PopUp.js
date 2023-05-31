import React from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const PopUp = ({ header, body }) => {
  return (
    <div className="row zindex-toast">
      <Toast isOpen={true}>
        <ToastHeader>{header}</ToastHeader>
        <ToastBody>{body}</ToastBody>
      </Toast>
    </div>
  );
};
export default PopUp;
