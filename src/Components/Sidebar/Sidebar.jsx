import React from "react";
import "./Sidebar.css";
import home from "../../assets/home.png";
import game_icon from "../../assets/game_icon.png";
import automobiles from "../../assets/automobiles.png";
import sports from "../../assets/sports.png";
import entertainment from "../../assets/entertainment.png";
import tech from "../../assets/tech.png";
import music from "../../assets/music.png";
import blogs from "../../assets/blogs.png";
import news from "../../assets/news.png";
import jack from "../../assets/jack.png";
import simon from "../../assets/simon.png";
import tom from "../../assets/tom.png";
import megan from "../../assets/megan.png";
import cameron from "../../assets/cameron.png";

const Sidebar = ({ sidebar, category, setCategory }) => {
  const categories = [
    { id: 0, name: "Home", icon: home },
    { id: 20, name: "Gaming", icon: game_icon },
    { id: 2, name: "Automobiles", icon: automobiles },
    { id: 17, name: "Sports", icon: sports },
    { id: 24, name: "Entertainment", icon: entertainment },
    { id: 28, name: "Tech", icon: tech },
    { id: 10, name: "Music", icon: music },
    { id: 22, name: "Blogs", icon: blogs },
    { id: 25, name: "News", icon: news },
  ];

  const subscribedChannels = [
    { name: "PewDiePie", icon: jack },
    { name: "MrBeast", icon: simon },
    { name: "Justin Bieber", icon: tom },
    { name: "5-minutes Craft", icon: megan },
    { name: "Nas Daily", icon: cameron },
  ];

  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      <div className="shortcut-links">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`side-link ${category === cat.id ? "active" : ""}`}
            onClick={() => setCategory(cat.id)}
          >
            <img src={cat.icon} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
        <hr />
      </div>

      <div className="subscribed-list">
        <h3>Subscribed</h3>
        {subscribedChannels.map((channel, index) => (
          <div key={index} className="side-link">
            <img src={channel.icon} alt={channel.name} />
            <p>{channel.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
