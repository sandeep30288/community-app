import React from 'react';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      communityHomeData: []
    }
  }

  componentDidMount = async() => {
    // fetch the community data
    try {
    const communityData = await this.fetchCommunityData();

    const homeData = await this.fetchHomeData();
    this.createCommunityHomeData(communityData, homeData)
    } catch (e) {
       alert("there are some problem fetching the data")
    }
  }

  createCommunityHomeData = (communityData, homeData) => {

    const communityHomeData = communityData.map(community => {
      community.homesTotlePrice = 0;
      community.homeCount = 0;
      homeData.map(home => {
        if(home.communityId === community.id) {
          community.homesTotlePrice += home.price;
          community.homeCount +=1   
        }
       return true
      })
      return community;
    })

    this.setState({
      communityHomeData
    })
    console.log(communityHomeData)
  }

  fetchCommunityData = async() => {
    const response = await fetch("https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities");
    return response.json()

  }

  fetchHomeData = async() => {
    const response = await fetch("https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/homes");
    return response.json()

  }

  render() {
    return <div className="container-fluid">

    <div className="table-row header">
      <div className="col">Community Name</div>
      <div className="col">Community Image</div>
      <div className="col">Avg Price</div>
    </div>
  
    {this.state.communityHomeData.map((data, index) => {
      return <div className="table-row" key={index}>
        <div className="col">{data.name}</div>
        <div className="col"><img src={data.imgUrl} alt="Not Found"/></div>
        <div className="col">{(data.homesTotlePrice/(data.homeCount || 1)).toFixed(2)}</div>
     </div>
  
    })}
    
   
  </div>
  };
}

export default App;
