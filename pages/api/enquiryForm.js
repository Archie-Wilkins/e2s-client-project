export default function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)

    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.industry || !body.business || !body.email) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ data: 'Missing data!' })
    }

    // Found the name.
    // Sends a HTTP success code
    res.status(200).json({data: { industry: `${body.industry}`, business: `${body.business}`, email: `${body.email}`,
            questions: `${body.questions}`,co2: `${body.co2}`,body: `${body.spending}`,energy: `${body.energy}`,
            technology: `${body.technology}`, comments: `${body.questions}`
    }})
}