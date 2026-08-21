import { useState } from "react";
import PhotoUpload from "../Createwizard/Photoupload";
import TripDetails from "../Createwizard/Tripdetail";
import StylePicker from "../Createwizard/Stylepicker";
import Generate from "../Createwizard/Generate";

export default function CreateWizard() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [details, setDetails] = useState({});
  const [style, setStyle] = useState({});

  if (step === 1) {
    return (
      <PhotoUpload
        onNext={(selectedFiles) => {
          setFiles(selectedFiles);
          setStep(2);
        }}
      />
    );
  }

  if (step === 2) {
    return (
      <TripDetails
        onNext={(data) => {
          setDetails(data);
          setStep(3);
        }}
      />
    );
  }

  if (step === 3) {
    return (
      <StylePicker
        onNext={(data) => {
          setStyle(data);
          setStep(4);
        }}
      />
    );
  }

  return (
    <Generate
      files={files}
      details={details}
      style={style}
    />
  );
}