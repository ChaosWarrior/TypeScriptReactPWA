import React from 'react';

export class GetValue extends React.Component {
  JPYToCNY:number = 0;
  JPYToUSD:number = 0;
  JPYToEUR:number = 0;

  state = {
    InputValueJPY: "",
    InputValueCNY: "",
    InputValueUSD: "",
    InputValueEUR: "",
    seconds: 1,
  };
  

  isNumber(input: any) {
    if (/^[0-9]+([.][0-9]*)?$/.test(input) === false) {
      return input.slice(0, -1)
    } else {
      return input
    }
  }

  handleGetInputValue = (event: { target: { value: String; }; }) => {
    this.setState({
      InputValueJPY: this.isNumber(event.target.value),
    })

  };

  handlePost = () => {
    this.setState({
      InputValueCNY: Number(this.state.InputValueJPY) * Number(this.JPYToCNY),
      InputValueUSD: Number(this.state.InputValueJPY) * Number(this.JPYToUSD),
      InputValueEUR: Number(this.state.InputValueJPY) * Number(this.JPYToEUR),
    })
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({ seconds: this.state.seconds - 1 });
      if (this.state.seconds < 1) {
        this.setState({ seconds: 60 });

        fetch('http://data.fixer.io/api/latest?access_key=b8d2cd97d26a77cb5989fe5cdb4a6fcf')
        .then(function (response) {
          return response.json();
        })
        .then((myJson) => {
          const rate = JSON.parse(JSON.stringify(myJson)).rates;
          this.JPYToCNY=(Number(rate.CNY) /Number(rate.JPY )),
          this.JPYToUSD=Number(rate.USD )/Number(rate.JPY ),
          this.JPYToEUR=Number(rate.EUR )/Number(rate.JPY ),
         
          console.log("AA:"+Number(rate.USD ))
        });
      }
    }, 1000);

  }

  render() {
    return (
      <div>
        <br></br><br></br>
        <h3>{this.state.seconds}</h3>
        <span>seconds</span>
        <br></br><br></br>

        日本円 &ensp;&ensp;<input
          value={this.state.InputValueJPY}
          onChange={this.handleGetInputValue}
        />

        <br></br><br></br>
        人民元 &ensp;&ensp;<input
          value={this.state.InputValueCNY}
        />
        <br></br><br></br>
        USドル &ensp; <input
          value={this.state.InputValueUSD}
        />
        <br></br><br></br>
        EUドル &ensp; <input
          value={this.state.InputValueEUR}
        />
        <br></br><br></br>
        <button onClick={this.handlePost}>DONE!</button>
      </div>
    )
  }
}


