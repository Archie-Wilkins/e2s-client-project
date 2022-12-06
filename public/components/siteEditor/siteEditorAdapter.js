class SiteEditorAdapter {
    constructor(organisation) {
        this.organisation = organisation;
    }

    async pullDataForSiteEditor() {
        try {
            // Get all possible site data for
            const endpoint = '/api/siteEditor/populateEditor';

            // Form the request for sending data to the server.
            const options = {
                // The method is GET because we are getting data
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            // Send the data to the API and wait for a response
            const response = await fetch(endpoint, options)

            if (response.ok){
                // Get the data from the response
                // Return the data
                return await response.json();
            }
        } catch (e) {
            console.log(e);
        }
    };
}