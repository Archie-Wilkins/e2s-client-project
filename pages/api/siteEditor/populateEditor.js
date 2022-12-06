import organisations from "../../../db/organisations";

export default async function handler(req, res) {

    // Get organisation ID from request's body.
    const orgId = req.body.orgId;
    if (!orgId) {
        return res.status(400).json({data: 'Missing data!'})
    }
    organisations.getAllChildrenOfOrgs(orgId).then((results) => {
        res.status(200).json({data: results});
    }).catch((err) => {
        res.status(500).json({data: err});
    });
}
