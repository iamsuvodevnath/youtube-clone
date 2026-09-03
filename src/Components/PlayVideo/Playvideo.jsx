import React, { useEffect, useState } from "react";
import "./Playvideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const Playvideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    try {
      const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`
      );
      const data = await res.json();
      setApiData(data.items[0]);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  const fetchOtherData = async () => {
    if (!apiData) return;

    try {
      const channelRes = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
      );
      const channelJson = await channelRes.json();
      setChannelData(channelJson.items[0]);

      const commentRes = await fetch(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
      );
      const commentJson = await commentRes.json();
      setCommentData(commentJson.items || []);
    } catch (error) {
      console.error("Error fetching channel or comments:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="YouTube video player"
      ></iframe>

      {/* Title */}
      <h3>{apiData ? apiData.snippet.title : "Loading title..."}</h3>

      {/* Video Info */}
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "0"} Views
          &bull;{" "}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div className="video-actions">
          <span>
            <img src={like} alt="like" />
            {apiData ? value_converter(apiData.statistics.likeCount) : 0}
          </span>
          <span>
            <img src={dislike} alt="dislike" />
          </span>
          <span>
            <img src={share} alt="share" /> Share
          </span>
          <span>
            <img src={save} alt="save" /> Save
          </span>
        </div>
      </div>

      <hr />

      {/* Publisher */}
      <div className="publisher">
        <img
          src={channelData?.snippet?.thumbnails?.default?.url || ""}
          alt={apiData?.snippet?.channelTitle || "Channel"}
        />
        <div className="publisher-info">
          <p>{apiData?.snippet?.channelTitle || ""}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "0"}{" "}
            Subscribers
          </span>
        </div>
        <button className="subscribe-btn">Subscribe</button>
      </div>

      {/* Description */}
      <div className="vid-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Loading description..."}
        </p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : 0}{" "}
          Comments
        </h4>

        {/* Comments */}
        {commentData.length > 0 ? (
          commentData.map((item, index) => {
            const comment = item.snippet.topLevelComment.snippet;
            return (
              <div key={index} className="comment">
                <img
                  src={comment.authorProfileImageUrl}
                  alt={comment.authorDisplayName}
                />
                <div className="comment-body">
                  <h3>
                    {comment.authorDisplayName}{" "}
                    <span>{moment(comment.publishedAt).fromNow()}</span>
                  </h3>
                  <p
                    dangerouslySetInnerHTML={{ __html: comment.textDisplay }}
                  ></p>
                  <div className="comment-action">
                    <img src={like} alt="like" />
                    <span>{value_converter(comment.likeCount)}</span>
                    <img src={dislike} alt="dislike" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
};

export default Playvideo;
