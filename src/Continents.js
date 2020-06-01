import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator,StyleSheet} from 'react-native';
import { Text } from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 5,
    },
    item: {
      flex: 1,
      backgroundColor: '#212121',
      padding: 20,
      marginVertical: 1,
      marginHorizontal: 10,
      borderRadius: 5,
    },
    title: {
      fontSize: 24,
      color: 'white',
      
    },
    values: {
        color: '#ffc107'
        
    },
    valueColor: {
        width: 10,
        height: 10,
        borderRadius: 20
    },
    
  });

class Stats extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          continent: this.props.route.params.continent,
          countries: null,
          
        };
        this.cont = this.state.continent;

      }

      componentDidMount() {
        this.getRegionCountries();
        
      }
    
      getRegionCountries = () => {
        const url = `https://covid19-update-api.herokuapp.com/api/v1/world/continent/`+this.state.continent;
        this.setState({ loading: true });
    
        this.array = [];
        fetch(url)
          .then(response => response.json())
          .then(res => {
            this.setState({
                countries: res.countries,
                error: res.error || null,
                loading: false,
              }
              );
             
          }).catch(error => {
            this.setState({ error, loading: false });
          });
        
         
          
      };


   

  
      render() {
        
        if (this.state.loading==true) {
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator />
            </View>
          );
        }
     

        
        return (
            <>
            <View style={{backgroundColor: 'black'}}>
            <View style={{ marginTop: 5,width: "100%",flexDirection: 'row',justifyContent: 'space-between'}}>
        <Icon name="arrow-left" size={35} color="white" style={{marginLeft: 10}} onPress={() => this.props.navigation.goBack()} />
        <Icon backgroundColor= 'gray' name="menu" size={35} color="white" style={{marginRight: 20}} onPress={()=> this.props.navigation.openDrawer()} />
      </View>
        <View style={{alignItems: 'center',justifyContent: 'center'}}>
        <Text h4 style={{color: 'gray'}}>{this.cont}</Text>
        </View>
        <FlatList
        data={this.state.countries}
        keyExtractor={(item,index) => {   
          console.log(index.toString())      
            return index.toString()}}
        renderItem={({ item,index }) => (
            <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <View >
        
        <Text >
            <Text style={{fontWeight: "bold",color: '#2962ff'}}> Cases     </Text>
            <Text style={styles.values}>{item.cases}       </Text>
            <Text style={{fontWeight: "bold",color: '#2962ff'}}>      |  Deaths     </Text>
            <Text style={{color: 'tomato'}}>{item.deaths}</Text>
            
        
        </Text>
        
        
        
        </View>
      </View>
          )}
        
        />
        </View>
        </>

        )
        }

}


export default Stats;