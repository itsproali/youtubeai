const yt_player_res_regex =
  /ytInitialPlayerResponse\s*=\s*({.+?})\s*;\s*(?:var\s+(?:meta|head)|<\/script|\n)/

function compareTrack(track1, track2) {
  const langCode1 = track1?.languageCode
  const langCode2 = track2?.languageCode

  if (langCode1 === "en" && langCode2 !== "en") {
    return -1
  } else if (langCode1 !== "en" && langCode2 === "en") {
    return 1
  } else if (track1?.kind !== "asr" && track2?.kind === "asr") {
    return -1
  } else if (track1?.kind === "asr" && track2?.kind !== "asr") {
    return 1
  } else {
    return 0
  }
}

export async function getVideoData(videoId: string) {
  // @ts-ignore
  let player = window.ytInitialPlayerResponse
  if (!player || videoId !== player?.videoDetails?.videoId) {
    const pageData = await fetch(`https://www.youtube.com/watch?v=${videoId}`)
    const body = await pageData?.text()
    const playerResponseMatch = body.match(yt_player_res_regex)

    if (!playerResponseMatch) {
      console.error("Could not find player response")
      return
    }

    player = JSON.parse(playerResponseMatch[1])
  }

  const metaData = {
    title: player?.videoDetails?.title,
    duration: player?.videoDetails?.lengthSeconds,
    author: player?.videoDetails?.author,
    views: player?.videoDetails?.viewCount
  }

  if (player?.captions && player?.captions?.playerCaptionsTracklistRenderer) {
    const tracks =
      player?.captions?.playerCaptionsTracklistRenderer?.captionTracks
    if (tracks && tracks.length) {
      tracks?.sort(compareTrack)
      const transcriptResponse = await fetch(tracks[0]?.baseUrl + "&fmt=json3")
      const transcript = await transcriptResponse.json()
      return { metaData, transcript }
    }
  }

  return { metaData, transcript: null }
}
