import axios from 'axios';

export async function getSiteDataEvery6Hours(siteID, startDate, endDate) {
    let response = null;
    await axios.post(`/api/getSiteDataTimeRange6Hourly`, {
        siteID: siteID,
        dateStart: startDate,
        dateEnd: endDate
    })
        .then(res => {
            response = res.data;
        })
        .catch((err) => {
            throw new Error('Historical Site Data Failed to retrieve data')
        });
    return response;
}

export async function getSiteDataEveryDay(siteID, startDate, endDate) {
    let response = null;
    await axios.post(`/api/getSiteDataTimeRangeDaily`, {
        siteID: siteID,
        dateStart: startDate,
        dateEnd: endDate
    })
        .then(res => {
            response = res.data;
        })
        .catch((err) => {
            throw new Error('Historical Site Data Failed to retrieve data')
        });
    return response;
}

