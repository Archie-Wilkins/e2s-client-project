class SiteEditorAdapter {
    constructor(organisation) {
        this.organisation = organisation;
    }

    async pullDataForSiteEditor() {
        try {
            // API endpoint where we send form data.
            const endpoint = '/api/siteEditor/populateEditor';

            // Form the request for sending data to the server.
            const options = {
                // The method is GET because we are getting data
                method: 'GET',
                // Tell the server we're sending JSON.
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            // Send the form data to our forms API on Vercel and get a response.
            const response = await fetch(endpoint, options)

        } catch (e) {
            console.log(e);
        }
    };
}