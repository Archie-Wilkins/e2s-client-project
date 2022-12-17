
const { expect } = require("chai");
const sinon = require("sinon");
import axios from "axios";
import {assert} from "chai";

describe("getSiteDataTimeRangeDaily", () => {


    // Code based on https://www.paigeniedringhaus.com/blog/how-to-unit-test-next-js-api-routes-with-typescript
    it('should return a successful response from getSiteDataTimeRangeDaily', async () => {
        let response = null;
        await axios.post(`/../../api/site/getSiteDataTimeRangeDaily`, {
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
});
