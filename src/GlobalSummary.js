import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator,ScrollView } from 'react-native';
import { Text } from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


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

class Worldwide extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          newConfirmed: null,
          newDeaths: null,
          activeCases: null,
          totalConfirmed: null,
          totalDeaths: null,
          totalRecovered: null,
        };
    
        
      }

      componentDidMount() {
        this.makeRemoteRequest();
      }
    
      makeRemoteRequest = () => {
        const url = `https://api.covid19api.com/summary`;
        this.setState({ loading: true });
    
        fetch(url)
        .then(response => response.json())
          .then(res => {
            console.log(res)
            this.setState({
                newConfirmed: res.Global.NewConfirmed,
                newDeaths: res.Global.NewDeaths,
                activeCases: "24,1000",
                totalConfirmed: res.Global.TotalConfirmed,
                totalDeaths: res.Global.TotalDeaths,
                totalRecovered: res.Global.TotalRecovered,
                error: res.error || null,
                loading: false,
              });
              console.log()
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      };

  
      render() {
        if (this.state.loading) {
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator />
            </View>
          );
        }
        return (
            <>
           <ScrollView style={{backgroundColor: 'black'}}>
           <View style={{ marginTop: 5,width: "100%",flexDirection: 'row',justifyContent: 'space-between'}}>
        <Icon backgroundColor= 'gray' name="arrow-left" size={35} color="white" style={{marginLeft: 10}} onPress={() => this.props.navigation.goBack()} />
        <Icon backgroundColor= 'gray' name="menu" size={35} color="white" style={{marginRight: 20}} onPress={()=> this.props.navigation.openDrawer()} />
              
        </View>

        <View style={{ marginTop: 80, alignItems: 'center'}}>
        
        <Text h4 style={{color: 'gray'}}>Global COVID19 Summary </Text>
        </View>
        <View style={{marginLeft: 40,height: 1, width: '80%', backgroundColor: 'red'}}/>
        
        <View style={{marginTop: 40}}>
        <View style={styles.sectionContainer}>
        <Text style={{fontSize:24}}>
            <Text style={styles.firstCon}>  Cases Today                     </Text>
        </Text>
        <Text style={styles.valuescon}>  {this.state.newConfirmed} </Text>
        </View>
        
        <View style={styles.sectionContainer}>
        <Text style={{fontSize:24}}> 
            <Text style={styles.firstCon}>  Deaths Today                   </Text>
            </Text>
            <Text style={styles.valuescon}>  {this.state.newDeaths}</Text>
            </View>
             
        <View style={styles.sectionContainer}>
        <Text style={{fontSize:24}}> 
        <Text style={styles.firstCon}>  Active Cases                    </Text>
            </Text>
            <Text style={styles.valuescon}>  {this.state.activeCases}</Text>
            </View>
            

        <View style={styles.sectionContainer} >
        <Text style={{fontSize:24}}> 
            <Text style={styles.firstCon}>  Cases                                </Text>
            </Text>
            <Text style={styles.valuescon}>  {this.state.activeCases}</Text>
            </View>
             
        <View style={styles.sectionContainer}>
        <Text style={{fontSize:24}}> 
            <Text style={styles.firstCon}>
            Deaths                              </Text>
            </Text>
            <Text style={styles.valuescon}>  {this.state.totalDeaths} 
            </Text>
            </View>
        
        
            <View  style={styles.sectionContainer}>    
        <Text style={{fontSize:24}}> 
            <Text style={styles.firstCon}>  Recovered                       </Text>
            </Text>
            <Text style={styles.valuescon}>  {this.state.totalRecovered}</Text>
             
            </View> 
        </View>
        </ScrollView>
        </>

        )

}
}



export default Worldwide;