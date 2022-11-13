import Link from "next/link"
import styles from '../login.module.css';

function LoginPage() {
    return <div className={styles.LoginBackground}>
        <div className={styles.LoginPanelContainer}>
            <div className={styles.LoginPanelBanner}>
                <h2 className={styles.LoginHeader}>Sign In</h2>
            </div>
            <div className={styles.ErrorTextHolder}><div className={styles.ErrorText}>Invalid credentials</div></div>
            <form action="/login" method="post" className={styles.LoginForm} onSubmit={}>
                <div className={styles.TextInputValue}>Email</div>
                <input type="email" className={styles.TextInputBox}></input>
                <div className={styles.TextInputValue}>Password</div>
                <input type="password" className={styles.TextInputBox}></input>
                <div><button className={styles.LoginButton} type={"submit"}>Login</button></div>
            </form>
            <div className={styles.HelpArea}>
                <div className={styles.HelpText}>Dont have an account?</div>
                <div className={styles.HelpTextContainer}><div className={styles.ClickHereText}>click here</div><div className={styles.SmallText}>to contact our team about joining</div></div>
                <div className={styles.HelpText}>Forgot password?</div>
                <div className={styles.HelpTextContainer}><div className={styles.ClickHereText}>click here</div><div className={styles.SmallText}>to reset your accounts password</div></div>
            </div>
        </div>

    </div>
}

export default LoginPage