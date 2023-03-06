import React, { useState } from "react";

const Preview = ({ file }: { file: File }) => {
  const [preview, setPriveiw] = useState<any>();

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPriveiw(reader.result);
    };
  }
  return (
    <div>
      {file && <img style={{ width: "300px" }} alt='preview' src={preview} />}
    </div>
  );
};

export default Preview;
