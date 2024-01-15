export default async function handler(req, res) {
    const email = req.query.email
    const filteredComments = req.body.filteredComments
    const parsedComments = JSON.parse(filteredComments)

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const message = {
        to: email,
        from: 'daniglebapuig@gmail.com', 
        subject: "🎉 Your users' feedback is ready! - Cornelio",
        text: `Thanks for using Cornelio. Here are the comments our AI has filtered from your video: `,
        html: `Thanks for using Cornelio. Here are the comments our AI has filtered from your video: <br/><br/> <strong>Useful feedback:</strong> ${parsedComments.useful_feedback} <br/><br/> <strong>Questions:</strong> ${parsedComments.questions} <br/><br/> <strong>Bug reports:</strong> ${parsedComments.bug_reports} `,
      }
    try { 
        sgMail
            .send(message)
            .then(() => {
                res.status(200).json({ message: "Email sent." })
            })
            .catch((error) => {
                res.status(500).json({ error: error })
            })
    } catch (error) {
        res.status(500).json({error: error})
    }
}