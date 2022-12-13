const axios = require('axios');
const sinon = require('sinon');
const {assert} = require('chai');

import { getSiteDataEveryWeek } from "../../../public/services/HistoricalSiteData.js";

// Sample test for api services
// Throughout the project we've had issues with code testing our api functions that are being called for
// so here is an example

describe('getSiteDataEveryWeek', () => {
    // Using a sinon sandbox makes it way easier to create fakes and stubs which our service can call instead of
    // actually calling the API and real database which both much slower and requires a dedicated test db plus this
    // gives us improved test isolation 
    // ref https://sinonjs.org/releases/latest/sandbox/
    let sandbox;
    // Used to set up the dummy data our fake api will give us
    let mockResponse;

    beforeEach(() => {
        // Create the sandbox
        sandbox = sinon.createSandbox();

        // Creating the
        mockResponse = {
            data: {
                // Setting up dummy data
                siteID: 123,
                dateStart: '2022-01-01',
                dateEnd: '2022-12-31',
                // Doesn't need to return loads of dates
                data: [
                    {
                        "carbon_emitted": 10,
                        "date": "2018-12-22T01:00:00.000Z",
                        "energy_cost": 100,
                        "energy_demand": 80,
                        "energy_exported": 38,
                        "energy_imported": 33,
                        "energy_output": 47,
                        "feels_like": 20,
                        "heat_demand": 19,
                        "site_id": 3,
                        "wind_speed": 0
                    },
                    {
                        "carbon_emitted": 14,
                        "date": "2018-12-22T02:00:00.000Z",
                        "energy_cost": 110,
                        "energy_demand": 60,
                        "energy_exported": 48,
                        "energy_imported": 43,
                        "energy_output": 5,
                        "feels_like": 22,
                        "heat_demand": 16,
                        "site_id": 3,
                        "wind_speed": 0
                    },
                ],
            },
        };
    });

    afterEach(() => {
        // Removes all stubs that have been created
        sandbox.restore();
    });

    it('checks getSiteDataEveryWeek calls the correct API end point with the correct arguments', async () => {
        // Creating the fake endpoint
        // Stubs a post axios request and telling it to return our mocked data that we set in the
        // before statement
        sandbox
            .stub(axios, 'post')
            .returns(Promise.resolve(mockResponse));

        // Creating sample data
        const siteID = 123;
        const startDate = '2022-01-01';
        const endDate = '2022-12-31';

        // Calling the service
        const response = await getSiteDataEveryWeek(siteID, startDate, endDate);

        // Checking the axios.post was called with the correct arguments
        sinon.assert.calledWith(
            axios.post,
            '/../../api/site/getSiteHistoricalData',
            {
                siteID,
                dateStart: startDate,
                dateEnd: endDate,
            },
        );

        // Verify that the function returned the expected data
        assert.equal(response, mockResponse.data);
    });


    it('throws an error if the request fails', async () => {
        // Stub out the axios.post method to throw an error
        sandbox
            .stub(axios, 'post')
            .throws(new Error('request failed'));


        // Creating sample data
        const siteID = 123;
        const startDate = '2022-01-01';
        const endDate = '2022-12-31';


        let errorThrown = false;

        // Would have really liked to do this with Chai's eventually statement
        // which allows you to wait until an async method completes to test for
        // errors but it was having import issues
        // If the try catch statement detects an error it will set errorThrown to true
        try {
            let response = await getSiteDataEveryWeek(siteID, startDate, endDate)
        }catch (error){
            errorThrown = true;
        }
        assert.equal(errorThrown, true)
    });
});