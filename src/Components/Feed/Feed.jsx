import React, { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    try {
      const response = await fetch(videoList_url);
      const json = await response.json();
      setData(json.items || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {loading ? (
        <p className="loading">Loading videos...</p>
      ) : data.length > 0 ? (
        data.map((item) => (
          <Link
            to={`video/${item.snippet?.categoryId}/${item.id}`}
            className="card"
            key={item.id}
          >
            <img
              src={item.snippet?.thumbnails?.medium?.url}
              alt={item.snippet?.title}
              className="thumbnail"
            />
            <p className="video-title">{item.snippet?.title}</p>
            <p className="channel">{item.snippet?.channelTitle}</p>
            <p className="stats">
              {value_converter(item.statistics?.viewCount)} views &bull;{" "}
              {moment(item.snippet?.publishedAt).fromNow()}
            </p>
          </Link>
        ))
      ) : (
        <p className="no-videos">No videos found.</p>
      )}
    </div>
  );
};

export default Feed;
