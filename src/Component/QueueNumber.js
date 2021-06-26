import React, { Component } from 'react';


class QueueNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {animate: false };
    }
    render() {
        const {ch, waitingNumber} = this.props.roomInfo;
        
        return (
            <div className="queueNum">
                <div style={{height: "60px"}}>{`${ch}`}</div> 
                <div className={this.state.animate? "digitAnimate": "digit"} >{waitingNumber}</div> 
            </div>
        );
    }
    set_digit = ()=>{

        this.setState({animate: false});
    }

    componentDidUpdate(prevProps){
        if(this.props.roomInfo.waitingNumber !== prevProps.roomInfo.waitingNumber){
            if(this.props.roomInfo.waitingNumber !== "---")
            {
                this.setState({animate: true});
                setTimeout(this.set_digit, 5000);
            }
        }

    }
}

export default QueueNumber;
