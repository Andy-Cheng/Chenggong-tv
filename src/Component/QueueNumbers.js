import React, { Component } from 'react';
import QueueNumber from './QueueNumber'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const roomInfo = [{ch: "一號診間", api_text: "1175"}, {ch: "二號診間", api_text: "1179"}, {ch: "三號診間", api_text: "1277"}, {ch: "復健科 診間", api_text: "559"}, {ch: "皮膚科 診間", api_text: "558"}];
const api = 'wss://www.mainpi.com/.ws_mainpi/';
const queryInterval = 60000; //ms

class QueueNumbers extends Component {
    constructor(props) {
        super(props);
        this.state = { socket: new W3CWebSocket(api), waitingNumber1: "---", waitingNumber2: "---", waitingNumber3: "---", waitingNumber4: "---", waitingNumber5: "---"};
    }
    
    render() {
        return (

            <div id="queueNums" >
                <QueueNumber roomInfo={{ ch: roomInfo[0].ch, waitingNumber: this.state.waitingNumber1 }} />
                <QueueNumber roomInfo={{ ch: roomInfo[1].ch, waitingNumber: this.state.waitingNumber2 }} />
                <QueueNumber roomInfo={{ ch: roomInfo[2].ch, waitingNumber: this.state.waitingNumber3 }} />
                <QueueNumber roomInfo={{ ch: roomInfo[3].ch, waitingNumber: this.state.waitingNumber4 }} />
                <QueueNumber roomInfo={{ ch: roomInfo[4].ch, waitingNumber: this.state.waitingNumber5 }} />
            </div>
        );
    }


    requet_number = () => {

        if (this.state.socket.readyState === this.state.socket.OPEN) {
            this.state.socket.send(JSON.stringify({ type: "query", text: roomInfo.reduce((acc, currentValue) => acc + currentValue.api_text + ",", "").slice(0, -1) }));
            setTimeout(this.requet_number, queryInterval);
        }
        else {
            // console.log(this.state.socket.readyState);
        }


    }

    checkNumUpdate = (data) => {
        let queueNum;

        if(data.id === "1175")
        {
            queueNum = this.state.waitingNumber1;
        }
        else if(data.id === "1179"){

            queueNum = this.state.waitingNumber2;

        }
        else if(data.id === "1277"){

            queueNum = this.state.waitingNumber3;

        }
        else if(data.id === "559"){

            queueNum = this.state.waitingNumber4;

        }
        else{
            queueNum = this.state.waitingNumber5;

        }
        let call_nums;

        try {
            call_nums = JSON.parse(data.call_nums);
            
        } catch (error) {
            return;
        }


        if (call_nums.hasOwnProperty("0")) {
            let newNum = call_nums["0"].toString();
            const length = newNum.length;
            for (let i = 0; i < 3 - length; ++i) {

                newNum = "0" + newNum;
            }
            if(newNum === "000")
            {
                newNum = "---";
            }
            if(newNum !== queueNum)
            {
                if(data.id === "1175")
                {
                    this.setState({waitingNumber1: newNum});
                }
                else if(data.id === "1179"){
        
                    this.setState({waitingNumber2: newNum});
                }
                else if(data.id === "1277"){
        
                    this.setState({waitingNumber3: newNum});
                }
                else if(data.id === "559"){
        
                    this.setState({waitingNumber4: newNum});
                }
                else{
                    this.setState({waitingNumber5: newNum});
                }
            }
        }
    }


    componentDidMount() {
        this.state.socket.onopen = () => {
            this.requet_number();
        };

        this.state.socket.onmessage = (e) => {
            if (typeof e.data === 'string') {
                const data = JSON.parse(e.data);
                // console.log(data.type)
                if(Array.isArray(data))
                {
                    data.forEach(this.checkNumUpdate);

                }
            }
        };
    }

    componentWillUnmount() {
        this.state.socket.close();
    }

}

export default QueueNumbers;