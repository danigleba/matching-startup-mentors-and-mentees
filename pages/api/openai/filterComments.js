import OpenAI from "openai"

export default async function handler(req, res) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})
    const { comments } = req.body
    const prompt  = 
        `Please analyze the following YouTube comments and extract useful feedback, bug reports, and clear questions related to the product, service, or video of the specified company or influencer. Organize the information in JSON format with the following structure:
        {
            "useful_feedback": [
                {
                    "feedback": "The video was informative and well-explained. However, I would appreciate more examples to better understand the concept."
                },
                ...
            ],
            "bug_reports": [
                {
                    "bug_description": "The website is not loading properly on Safari. There might be a compatibility issue that needs attention."
                },
                ...
            ],
            "clear_questions": [
                {
                 "question": "Can you provide more information about the pricing plans for your services? It's not clear from the website."
                },
                ...
            ],
        }
        Note that the comments are separated by “/”. Here are the comments you have to analyze: ${comments}`

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            response_format: {type: "json_object"}
          })
        console.log(completion.choices[0])
        res.status(200).json({ data: completion.choices[0] })
    } catch (error) {
        res.status(500).json({error: error})
    }
}