import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Info from './Info'



class Promote extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
     
        const opts = {
            height: '720',
            width: '1280',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
              loop: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0, 

            //   playlist:'7hb0TJvDrkY',
            listType: 'playlist',
            list: 'PLs2VWkZ4716CCDi7jabLDbTiKJL4hvdMM',


            },
          };

        return (
            <div id="promote">
                <div style={{height: 720, backgroundColor: "#736A6A"}}>
                    <YouTube opts={opts} onReady={this._onReady} />
                </div>
                <Info/>                
            </div>
        );
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.mute();
        
      }

}

export default Promote;