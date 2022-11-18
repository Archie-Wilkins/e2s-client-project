import NavBar from "../public/components/NavBar.js"
import DashboardTargetCard from "../public/components/dashboardTargetCard.js"

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
                        <div className="observation-card">Your energy usage is likely to spike during the winter</div>
                    </div>
                    <div className="grid-panel center-flex-column">
                        <p className="info-small-text margin-top-negative-10">This week you have used</p>
                        <p className="info-change-text">12% less</p>
                        <p className="info-small-text margin-bottom-negative-10">Kw than the previous week</p>
                    </div>
                    <div className="grid-panel center-flex-column">
                        <p className="info-small-text margin-top-negative-10">This week you have spent</p>
                        <p className="info-change-text">12% less</p>
                        <p className="info-small-text margin-bottom-negative-10">£ than the previous week</p>
                    </div>
                    <div className="grid-panel center-flex-column">
                        <p className="info-small-text margin-top-negative-10">This week you have emitted</p>
                        <p className="info-change-text">12% less</p>
                        <p className="info-small-text margin-bottom-negative-10">Kw than the previous week</p>
                    </div>


                </div>
            </div>
        </div>
    </div>
}

export default Dashboard