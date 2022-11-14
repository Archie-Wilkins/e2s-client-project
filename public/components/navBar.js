import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image'
import Dashboard from '../images/navbarIcons/dashboard.png'
import styles from '../styles/navbar.module.css';
import colors from '../styles/colours.module.css';



function NavBar() {
    return <div>
        <div className={styles.navbar + ' ' + colors.blueBackground}>
            <h1>E2S</h1>
            <hr className={styles.navbarLineBreak}></hr>

            <div className="pageLink d-flex">
                <Image
                    className={styles.navbarIcon}
                    src={Dashboard}
                    alt="Picture of the author"
                />
                <p>Dashboard</p>
            </div>
            <div className="pageLink">
                <img src="" alt="" />
                <p>Forecastings</p>
            </div>
            <div className="pageLink">
                <img src="" alt="" />
                <p>Analysis</p>
            </div>
            <div className="pageLink">
                <img src="" alt="" />
                <p>Assets</p>
            </div>
            <div className="pageLink">
                <img src="" alt="" />
                <p>Reports</p>
            </div>
            <div className="pageLink">
                <img src="" alt="" />
                <p>Compare</p>
            </div>
            <div className="pageLink">
                <img src="" alt="" />
                <p>Validate Bills</p>
            </div>

            <hr className={styles.navbarLineBreak}></hr>


            <div className="pageLink">
                <img src="" alt="" />
                <p>Help</p>
            </div>
            <div className="pageLink">
                <img src="" alt="" />
                <p>Account</p>
            </div>

            <hr className={styles.navbarLineBreak}></hr>


        </div>
    </div >


}

export default NavBar