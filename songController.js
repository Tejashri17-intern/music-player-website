// import axios from"axios";

// const getSongs = async (req, res) => {
//   try {
//     const response = await axios.get(
//       'https://api.jamendo.com/v3.0/tracks/?client_id=db0c70af&format=jsonpretty&limit=15'
//     );

//     const data = response.data;
//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

// const getPlaylistByTag = async (req, res) => {
//   try {
//     const tag = (req.params.tag || req.query.tag || "").toString().trim();
//     if (!tag) return res.status(400).json({ messag: "Missing Tag Paramaters" });

//     const limit = parseInt(req.query.limit ?? "10", 10) || 10;
//     const clientId = "db0c70af";

//     const params = {
//       client_id: clientId,
//       format: "jsonpretty",
//       tags: tag,
//       limit,
//     };

//     const response = await axios.get(
//       "https://api.jamendo.com/v3.0/tracks",
//       { params }
//     );

//     return res.status(200).json(response.data);
//   } catch (error) {
//     console.error("getPlaylistTag error", error?.response?.data ?? error.message ?? error);
//     return res.status(500).json({ message: "Failed to fetch" });
//   }
// };

// //export { getSongs, getPlaylistByTag };
// const toggleFavourite = async (req, res) => {
//   try {
//     const user = req.user;
//     const song = req.body.song;

//     const exists = user.favourites.find((fav) => fav.id === song.id);

//     if (exists) {
//       user.favourites = user.favourites.filter(
//         (fav) => fav.id !== song.id
//       );
//     } else {
//       user.favourites.push(song);
//     }

//     await user.save();
//     return res.status(200).json(user.favourites);
//   } catch (error) {
//     console.error(error.message);
//     return res
//       .status(400)
//       .json({ message: "Favourites not added,something went wrong" });
//   }
// };

// export { getSongs, getPlaylistByTag, toggleFavourite };


import axios from "axios";

const getSongs = async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.jamendo.com/v3.0/tracks/?client_id=db0c70af&format=jsonpretty&limit=15'
    );

    // This is the CRITICAL mapping
    const formattedSongs = response.data.results.map((track) => ({
      id: track.id,
      name: track.name,
      artist_name: track.artist_name, 
      cover: track.image,             // MAPS UNIQUE IMAGE TO 'cover'
      audio: track.audio,
      releasedate: track.releasedate,
      duration: track.duration,
    }));

    res.status(200).json(formattedSongs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlaylistByTag = async (req, res) => {
  try {
    const tag = (req.params.tag || req.query.tag || "").toString().trim();
    if (!tag) return res.status(400).json({ message: "Missing Tag" });

    const response = await axios.get("https://api.jamendo.com/v3.0/tracks", {
      params: { client_id: "db0c70af", format: "jsonpretty", tags: tag, limit: 10 }
    });

    const formattedSongs = response.data.results.map((track) => ({
      id: track.id,
      name: track.name,
      artist_name: track.artist_name,
      cover: track.image,             // MAPS UNIQUE IMAGE TO 'cover'
      audio: track.audio,
      releasedate: track.releasedate,
      duration: track.duration,
    }));

    return res.status(200).json(formattedSongs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch" });
  }
};

const toggleFavourite = async (req, res) => {
  try {
    const user = req.user;
    const song = req.body.song;
    const exists = user.favourites.find((fav) => fav.id === song.id);
    if (exists) {
      user.favourites = user.favourites.filter((fav) => fav.id !== song.id);
    } else {
      user.favourites.push(song);
    }
    await user.save();
    return res.status(200).json(user.favourites);
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};

export { getSongs, getPlaylistByTag, toggleFavourite };