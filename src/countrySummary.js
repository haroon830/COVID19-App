import React, { Component } from 'react';


import { StyleSheet,ScrollView,View,  ActivityIndicator,Image } from 'react-native';
import { Text } from 'react-native-elements';
//import Tab from './BottomTabs'

const styles = StyleSheet.create({
  sectionContainer:{
    marginBottom:20,
    borderRadius:10,
    backgroundColor:'#212121',
    marginTop: 5,
    marginLeft:20,
    marginRight:20
  },
  firstCon:{
    marginBottom:50,
    color:'white',
    fontWeight: "bold"
},
    valuescon:{
      marginTop:20,
      color:'darkgray',
      fontSize:20,
      marginBottom:10
    }
  
});

class ByCountry extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          country: this.props.route.params.country,
          loading: false,
          firstDate: null,
          firstDayCases: null,
          totalCases: null,
          activeCases: null,
          recovered: null,
          deaths: null,
        }
}

componentDidMount() {
    this.makeRemoteRequest();    
  }

  makeRemoteRequest = () => {
    const url = "https://api.covid19api.com/dayone/country/"+this.state.country+"/status/confirmed";
    this.setState({ loading: true });
    
    fetch(url,{method: 'GET', redirect: 'follow'})
    .then(response => response.json())
      .then(res => {
      var st = res[0].Date;
      this.setState({
          firstDate:  st.substring(0, 10),
          firstDayCases: res[0].Cases,
        });
      })
      .catch(error => {
        this.setState({ error });
      });
    fetch("https://api.covid19api.com/total/country/"+this.state.country, {method: 'GET', redirect: 'follow'})
      .then(response => response.json())
    .then(res => {
          this.setState({
              totalCases: res[res.length-1].Confirmed,
              activeCases: res[res.length-1].Active,
              deaths: res[res.length-1].Deaths,
              recovered: res[res.length-1].Recovered,
              loading: false,
          })
      })
      .catch(error => {
        this.setState({ error });
      });

      if(this.state.firstDayCases == null){
        this.setState({firstDayCases: "No Data Found"});
      }

  };
  render(){  
    if (this.state.loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        );
      }
       return(
        <>
        <ScrollView  style={{backgroundColor: 'black'}}>
        <View>
        <View 
        style={{marginTop:70, alignItems: 'center', justifyContent: 'center'}}>
        <Text h4 style={{color: 'gray'}}>{this.state.country}</Text>
       </View>
       <View style={{marginLeft: 110,height: 1, width: '40%', backgroundColor: 'red'}}/>

       <View style={{marginTop: 30}}>
       <View style={styles.sectionContainer}>
       <Text style={{fontSize:24}}>
       <Text style={styles.firstCon}>  First Case      </Text>
      
            </Text>
            <Text style={styles.valuescon}>  {this.state.firstDate}</Text>
            </View>
           

        <View style={styles.sectionContainer}>
       <Text style={{fontSize:24}}>
       <Text style={styles.firstCon}>  Cases on First Day       </Text>
         </Text>
           <Text style={styles.valuescon}>  {this.state.firstDayCases}</Text>
           </View>
      
        <View style={styles.sectionContainer}>
       <Text style={{fontSize:24}}>
       <Text style={styles.firstCon}>  Total Cases                    </Text>
           </Text>
           <Text style={styles.valuescon}>  {this.state.totalCases}</Text>
           </View>
      
       <View style={styles.sectionContainer}>
       <Text style={{fontSize:24}} >
       <Text style={styles.firstCon}>  Active Cases                 </Text>
          </Text>
           <Text style={styles.valuescon}>  {this.state.activeCases}</Text>
           </View>

        <View style={styles.sectionContainer}>
       <Text style={{fontSize:24}}>
       <Text style={styles.firstCon}>  Total Deaths                  </Text>
           </Text>
           <Text style={styles.valuescon}>  {this.state.deaths}</Text>
           </View>
             
       <View style={styles.sectionContainer}>
       <Text style={{fontSize:24}}>
       <Text style={styles.firstCon}>  Recovered                     </Text>
           </Text>
           <Text style={styles.valuescon}>  {this.state.recovered}</Text>
       </View>
       
       </View>
</View>
       </ScrollView>
       </>
       )
    }
        
  }
 

  export default ByCountry;