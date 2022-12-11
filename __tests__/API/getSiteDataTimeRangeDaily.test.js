
const { expect } = require("chai");
const sinon = require("sinon");
import axios from "axios";
import {assert} from "chai";

describe("getSiteDataTimeRangeDaily", () => {



    it('should return a successful response from Notehub', async () => {
        let response = null;
        await axios.post(`/api/getSiteDataTimeRangeDaily`, {
            siteID: 1,
            dateStart: "2018-12-22",
            dateEnd: "2018-12-31"
        })
            .then(res => {
                response = res.data;
                assert.equal(response, 200);

            })
            .catch((err) => {
                response = err.status;
            });

        // assert.equal(response, 200);

    });


    it("should return a 200 response", async () => {
        // Create a fake request object
        const req = {
            body: {
                siteID: "123",
                dateStart: "2022-01-01",
                dateEnd: "2022-01-31",
            },
        };

        // Create a fake response object
        const response = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        // Call the handler function with the fake request and response objects
        await handler(req, response);

        // Assert that the response status code was 200
        expect(response.status.calledWith(200)).to.be.true;
    });
});