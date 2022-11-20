import NavBar from "../public/components/NavBar.js"
import DashboardTargetCard from "../public/components/dashboardTargetCard.js"
import DashboardObservation from "../public/components/dashboardObservation.js"
import DashboardInformation from "../public/components/dashboardInformation.js"
import {FaCaretUp} from 'react-icons/fa';

function Dashboard() {
    return <div>
        <div>
            <div className="float-left">
                <NavBar></NavBar>
            </div>

            <div>
                <div className="scrollMenu">
                    {/*    add the target card components here*/}

                    {/*    add the plus button here*/}
                    <DashboardTargetCard></DashboardTargetCard>
                    <DashboardTargetCard></DashboardTargetCard>
                    <DashboardTargetCard></DashboardTargetCard>
                    <DashboardTargetCard></DashboardTargetCard>
                    <DashboardTargetCard></DashboardTargetCard>

                </div>

                <div className="grid-container">

                    <div className="grid-panel graph-1">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn TimeFrameSelectBtn">Week</button>
                            <button type="button" className="btn TimeFrameSelectBtn">Month</button>
                            <button type="button" className="btn TimeFrameSelectBtn">Year</button>
                        </div>
                    </div>
                    <div className="grid-panel observation-panel center-flex-column">
                        <h3>Observations</h3>
                        {/*<div className="observation-card my-1">Your energy usage is likely to spike during the winter</div>*/}
                        {/*<div className="observation-card">Your energy usage has been steadily declining over the past year, keep up the good work!</div>*/}
                        {/*<div className="observation-card">26% of your carbon emissions are from "example asset"</div>*/}
                        <DashboardObservation></DashboardObservation>
                        <DashboardObservation></DashboardObservation>
                    </div>
                    <DashboardInformation></DashboardInformation>
                    <DashboardInformation></DashboardInformation>
                    <div className="grid-panel center-flex-column">
                        <p className="info-small-text margin-top-negative-10">This week you have emitted</p>
                        <p className="info-change-text">12% more <FaCaretUp className="color-red caret-size" /></p>
                        <p className="info-small-text margin-bottom-negative-10">Kw than the previous week</p>
                    </div>


                </div>
            </div>
        </div>
    </div>
}

export default Dashboard