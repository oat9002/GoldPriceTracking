import React, { Component } from 'react';
import { Table } from 'element-react';
import Filter from './Filter';
import moment from 'moment-timezone';

class GoldTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coloums: [
                {
                    label: 'Date',
                    prop: 'created_at',
                    width: window.innerWidth * 0.4
                },
                {
                    label: 'Buy(รับซื้อ)',
                    prop: 'buy',
                    width: window.innerWidth * 0.2
                },
                {
                    label: 'Sell',
                    prop: 'sell',
                    width: window.innerWidth * 0.2
                }
            ],
            dataForTable: null,
        };
    }

    retrieveGoldPrices = () => {
        
    }

    mapDataForTable = (goldPrices) => {
        let data = goldPrices.map(x => {
            let newData = {};
            newData['buy'] = x.buy;
            newData['sell'] = x.sell;
            newData['created_at'] = moment(x.created_at).tz('Asia/Bangkok').format('LLL');
            return newData;
        });
        this.setState({
            dataForTable: data
        });
    }

    componentWillMount() {
       
    }
    
    render() {
        return (
            <div>
                {/* <Filter onChangeDaysBack={this.props.onChangeDaysBack}/> */}
                <Table
                    style={{width: '100%', marginLeft: '1%', marginRight: '1%'}}
                    columns={this.state.columns}
                    data={this.state.dataForTable}
                    border={true}
                    height={window.innerHeight * 0.5}
                />
            </div>
        );
    }
}

export default GoldTable;