const fetchCommentsRecursive = async (videoId, apiKey, pageToken = '') => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&key=${apiKey}&pageToken=${pageToken}`
    const response = await fetch(apiUrl)
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  
    const responseData = await response.json()
  
    const comments = responseData.items.map((item) => {
      const text = item.snippet.topLevelComment.snippet.textDisplay
  
      return {
        text,
      }
    })
  
    const nextPageToken = responseData.nextPageToken
  
    if (nextPageToken) {
      const nextPageComments = await fetchCommentsRecursive(videoId, apiKey, nextPageToken)
      return [...comments, ...nextPageComments]
    }
  
    return comments
  }
  
  export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).end()
    }
  
    const videoId = req.query.videoId
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  
    if (!apiKey || !videoId) {
      return res.status(400).json({ error: 'Missing API key or videoId' })
    }
  
    try {
      const allComments = await fetchCommentsRecursive(videoId, apiKey)
      res.status(200).json({ comments: allComments })
    } catch (error) {
      console.error('Error fetching comments:', error.message)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
  
  