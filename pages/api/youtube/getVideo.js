export default async function handler(req, res) {
  const video_id = req.query.video_id

  try {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${video_id}&part=snippet,statistics&key=${apiKey}`

    const response = await fetch(apiUrl)

    if (!response.ok) {
      const data = await response.json()
      res.status(response.status).json({ error: data.error.message })
    }

    const data = await response.json()

    if (data.items.length === 0) {
      res.status(404).json({ error: "Video not found" })
    }

    const video = data.items[0].snippet
    const statistics = data.items[0].statistics

    //We get the Thumbnail in the maximum resolution available
    const thumbnailUrl =
      video.thumbnails.maxres && video.thumbnails.maxres.url ? 
        video.thumbnails.maxres.url
        : 
        video.thumbnails.high.url

    const videoInfo = {
      title: video.title,
      authorName: video.channelTitle,
      thumbnail: thumbnailUrl,
      numberOfComments: statistics.commentCount || 0,
    }

    res.status(200).json(videoInfo)
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}
