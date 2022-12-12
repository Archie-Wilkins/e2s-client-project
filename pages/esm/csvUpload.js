import Link from "next/link";
import CsvUploadComponent from "../../public/components/csv/csvUploadComponent.js";

// As this is just for demonstration it is not a problem
// it doesnt follow the standard componenet based structure we've followed
// but this uses a more functional approach to structuring code
// also not the use of the csv upload component within the function
// this was originally quite a common pattern within the team
// but it was decided that it wasn't valuable to do this as
// little value is gained from this seperation if anything this is
// a good example of not what to do 
function CsvUploadPage() {
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center blueBackground" aria-label="csv upload page content">
      <CsvUploadComponent />
    </div>
  );
}

export default CsvUploadPage;
