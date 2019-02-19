import React, { Component } from 'react'
import './video.css'

class Video extends Component {
  render() {
    return (
      <div className="container video">
      <div id="headerContent">
        <img id="videoImg" src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg" alt=""/>
        <div id="videoTitle">SpiderMan</div>
        <div id="videoRating">
              <i id="star-5" className="fas fa-star"/>
              <i id="star-5" className="fas fa-star"/>
              <i id="star-5" className="fas fa-star"/>
              <i id="star-5" className="fas fa-star"/>
              <i id="star-5" className="fas fa-star"/>
        </div>
        <div id="videoDate">1992</div>
        <div id="videoTime">1h30</div>
        <span className="separator"></span>
        <div id="videoDesc">
        <h6>Description:</h6>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem tempore labore fugit? Quia ea, nostrum maxime incidunt eveniet unde quos dolores voluptatum inventore corrupti facere! Nam sequi qui quod pariatur.
        </div>

        <div id="videoActors">
        <h6>Casting:</h6>
        SpiderMan et dautres gars Lorem ipsum Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint voluptatibus in ad nobis dolo </div>
      </div>
          <div className="videoPlayer">
            <iframe className="myvideo" src="https://player.twitch.tv/?channel=degun" controls>
              {/* <source src="movie.mp4" type="video/mp4"> */}
              {/* <source src="movie.ogg" type="video/ogg"> */}
            {/* Your browser does not support the video tag. */}
            </iframe>
          </div>
          <div className="yourComment">
            <img src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg" alt="user"/>
            <textarea name="" id="" cols="" rows="1"></textarea>
            <button>Send</button>
          </div>
          <div className="videoComments">
            <hr/>
            <div className="comment">
              <img src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg" alt="user"/>
              <span className="username">Sven</span>
              <span className="commentText">mon commentaire Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ea, esse exercitationem cumque asperiores, quo unde id illum at deleniti repellat quis. Illum, velit illo eaque voluptatum beatae iusto officia.</span>
            </div>
            <hr/>
            <div className="comment">
              <img src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg" alt="user"/>
              <span className="username">Sven</span>
              <span className="commentText">mon commentaire Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ea, esse exercitationem cumque asperiores, quo unde id illum at deleniti repellat quis. Illum, velit illo eaque voluptatum beatae iusto officia.</span>
            </div>
            <hr/>
            <div className="comment">
              <img src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg" alt="user"/>
              <span className="username">Sven</span>
              <span className="commentText">mon commentaire Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ea, esse exercitationem cumque asperiores, quo unde id illum at deleniti repellat quis. Illum, velit illo eaque voluptatum beatae iusto officia.</span>
            </div>
            <hr/>
            <div className="comment">
              <img src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg" alt="user"/>
              <span className="username">Sven</span>
              <span className="commentText">mon commentaire Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ea, esse exercitationem cumque asperiores, quo unde id illum at deleniti repellat quis. Illum, velit illo eaque voluptatum beatae iusto officia.</span>
            </div>
            <hr/>
            <div className="comment">
              <img src="https://bikeandbrain.files.wordpress.com/2015/05/face.jpg" alt="user"/>
              <span className="username">Sven</span>
              <span className="commentText">mon commentaire Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ea, esse exercitationem cumque asperiores, quo unde id illum at deleniti repellat quis. Illum, velit illo eaque voluptatum beatae iusto officia.</span>
            </div>
          </div>
      </div>
    )
  }
}

export default Video;