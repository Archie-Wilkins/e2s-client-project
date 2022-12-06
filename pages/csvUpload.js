import Link from "next/link";
import CsvUploadComponent from "../public/components/csvUploadComponent.js";

// As this is just for demonstration it is not a problem
// it doesnt follow the standard componenet based structure we've followed
//
function CsvUploadPage() {
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center blueBackground">
      <CsvUploadComponent />
    </div>
  );
}

export default CsvUploadPage;
