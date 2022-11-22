
function ApiTestPage() {

    const apiHandler = async (event) => {
        event.preventDefault();
        const endpoint = '/api/csvUpload'

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()

        console.log(`${result.message}`);
    }

    return <div>
        <body>Your shit lives here</body>
        <button onClick={apiHandler}>Click Me</button>
    </div>
}

export default ApiTestPage
