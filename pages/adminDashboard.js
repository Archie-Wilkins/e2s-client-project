
function AdminHub(){
    return <div>
        <div className={"dashboard-header"}>
            <h1>ADMIN DASHBOARD</h1>
            <hr className={"h1-underline"}/>
            <p className={"dashboard-sub-header"}>Welcome to E2S, Admin.</p>
        </div>
        <div className={"admin-content"}>
            <div className={"business-section"}></div>
            <div className={"calendar-section"}></div>
        </div>
    </div>
}

export default AdminHub