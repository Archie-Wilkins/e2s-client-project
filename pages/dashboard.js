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
                    <div className="grid-panel observation-panel">observations</div>
                    <div className="grid-panel">energy</div>
                    <div className="grid-panel">expend</div>
                    <div className="grid-panel">carbon</div>


                </div>
            </div>
        </div>
    </div>
}

export default Dashboard