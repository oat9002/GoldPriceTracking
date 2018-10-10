import React, { Component } from 'react';
import { Select } from 'element-react';

class Filter extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
          options: [{
            value: 5,
            label: '5'
          }, {
            value: 10,
            label: '10'
          }, {
            value: 15,
            label: '15'
          }, {
            value: 20,
            label: '20'
          }, {
            value: 30,
            label: '30'
          }],
          value: 5
        };
      }

      handleOnchange = () => {
          this.props.onChangeDaysBack(this.state.value);
      }
      
      render() {
        return ( 
          <Select value={this.state.value} onChange={() => this.handleOnchange()}>
            {
              this.state.options.map(el => {
                return <Select.Option key={el.value} label={el.label} value={el.value} />
              })
            }
          </Select>
        )
      }
}

export default Filter;