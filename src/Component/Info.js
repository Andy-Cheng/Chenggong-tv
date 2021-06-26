import React, { Component } from 'react';
import {Row, Col} from 'antd'
import imgWaitingProgress from '../chenggong-waiting.png'

class Clock extends Component {

    constructor(props) {
        super(props)

        this.state = {
            time: new Date()
        }
    }

    componentDidMount() {
        setInterval(this.update, 1000)
    }

    update = () => {
        this.setState({
            time: new Date()
        })
    };

    render() {
        const h = this.state.time.getHours();
        const m = this.state.time.getMinutes();
        const d = this.state.time.getDay();
        const date = this.state.time.getDate();
        const month = this.state.time.getMonth() + 1;
        const h_mod = h % 12;

        let d_ch;
        if(d === 0)
        {
            d_ch = "日";
        }
        else if(d === 1)
        {
            d_ch = "一";
        }
        else if(d === 2)
        {
            d_ch = "二";
        }
        else if(d === 3)
        {
            d_ch = "三";
        }
        else if(d === 4)
        {
            d_ch = "四";
        }
        else if(d === 5)
        {
            d_ch = "五";
        }
        else
        {
            d_ch = "六";
        }

        return (
            <div style={{paddingLeft: 50, paddingTop: 10, }}>
                <div style={{paddingLeft: 12, fontSize: 70, color: "#252422"}}>{month}/{date} 星期{d_ch}</div>
                <div style={{fontSize: 84, color: "#252422"}}>{h < 12 ? '上午' : '下午'} {(h === 12)? "12" : (h_mod < 10)? "0" + h_mod : h_mod}:{(m < 10 ? '0' + m : m)}</div>
            </div>
        )
    }
}




class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Row style={{height: "360px"}}>
                <Col flex="500" style={{height: "100%"}}>
                    <Clock />

                    <div style={{paddingLeft: 50, paddingTop: 0}}>
                            <p style={{ fontSize: 50, color: "#338693", height: 5 }}> 成功聯合診所</p>
                            <p style={{ fontSize: 38, color: "#205965", height: 15 }}>CHENG GONG CLINIC</p>
                    </div>
                </Col>
                <Col flex="780">
                    <div style={{display: "flex", flexFlow: "row wrap"}}>
                        <div style={{color: "#867E7E", textAlign: "right", marginTop: "90px", fontSize: 64,}}>手機掃描QR碼<br/>掌握看診進度</div>
                    
                        <img alt="成功即時叫號" style={{display: 'block', marginLeft: "auto", marginRight: "30px", marginTop: "10px"}} src={imgWaitingProgress}/>
                    </div>

                </Col>
            </Row>
        );
    }
}

export default Info;