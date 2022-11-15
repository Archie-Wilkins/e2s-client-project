import 'bootstrap/dist/css/bootstrap.min.css';

function ToggleSite(props) {
    console.log("Running");
    console.log(props)
    if (props.displayMenu) {
        return <div className="whiteBackground">
            <h1>ITS WORKED</h1>
        </div>
    }
    else {
        return null;
    }
}

export default ToggleSite