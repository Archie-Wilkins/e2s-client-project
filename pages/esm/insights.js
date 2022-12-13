import Link from "next/link";
import InsightsComponent from "../../public/components/insights/insightsComponent";
import Cookies from "js-cookie";

// As this is just for demonstration it is not a problem
// it doesnt follow the standard componenet based structure we've followed

function InsightsPage() {
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center blueBackground" aria-label="insights page">
      <InsightsComponent />
    </div>
  );
}

export default InsightsPage;