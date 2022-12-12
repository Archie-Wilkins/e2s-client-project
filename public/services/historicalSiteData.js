import axios from 'axios';

export async function getSiteDataEvery6Hours(siteID, startDate, endDate) {
    let response = null;
    await axios.post(`/../api/site/getSiteDataTimeRange6Hourly`, {
        siteID: siteID,
        dateStart: startDate,
        dateEnd: endDate
    })
        .then(res => {
            response = res.data;
        })
        .catch((err) => {
            response = err.status;
        });
    return response;
}

export async function getSiteDataEveryDay(siteID, startDate, endDate) {
    let response = null;
    await axios.post(`/../../api/site/getSiteDataTimeRangeDaily`, {
        siteID: siteID,
        dateStart: startDate,
        dateEnd: endDate
    })
        .then(res => {
            response = res.data;
        })
        .catch((err) => {
            response = err.status;
        });
    return response;
}

export async function getSiteDataEveryMonth(siteID, startDate, endDate) {
    let response = null;
    await axios.post(`/../../api/site/getSiteDataTimeRangeMonthly`, {
        siteID: siteID,
        dateStart: startDate,
        dateEnd: endDate
    })
        .then(res => {
            response = res.data;
        })
        .catch((err) => {
            // throw new Error('Historical Site Data Failed to retrieve data')
            response = err.status;
        });
    return response;
}

export async function getSiteDataEveryWeek(siteID, startDate, endDate) {
    let response = null;
    await axios.post(`/../../api/site/getSiteHistoricalData`, {
        siteID: siteID,
        dateStart: startDate,
        dateEnd: endDate
    })
        .then(res => {
            response = res.data;
        })
        .catch((err) => {
            response = err.status;
        });
    return response;
}

export async function getSitePastWeekData(siteID, startDate, endDate) {
    const { data } = await axios.post(`/../../api/site/getSitePastWeekData`, {
        siteID: siteID,
        dateStart: startDate,
        dateEnd: endDate
    });
    return data;
}




