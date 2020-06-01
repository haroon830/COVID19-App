import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar ,List} from 'react-native-elements';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';


class countriesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          data: [],
          error: null,
          selectedItem: null,   
        };
        this.response = [];
      }
      componentDidMount() {
        this.API();
      }
      API = () => {
        const apiurl = `https://api.covid19api.com/countries`;
        this.setState({ loading: true });
        //ftech the list of all the countries infected from COVID19 from the above url
        fetch(
          apiurl,
          {method: 'GET',
           redirect: 'follow'
          })
        .then(response => response.json())
          .then(res => {
            this.setState({
                data: res,
                loading: false,
              });
            
            this.response = res;
            //sorting the list of countries
            this.response.sort(function(a,b){
              if(a.Country < b.Country) { return -1; }
              if(a.Country > b.Country) { return 1; }
              return 0;
             })

          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
           
      };
    
    
      line = () => {
        return (
          <View
            style={{ height: 1, width: '100%' }}
          />
        );
      };
     //function which navigate from Home screen to Screen 2(CountryDetails)
      nextS(selectedCountry){
        this.props.navigation.navigate("ByCountry",{country: selectedCountry});
      }
      
      //Search Function 
      search = text => {
        this.setState({
          value: text,
        });
        const newData = this.response.filter(item => {
            const itemData = `${item.Country.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData)>-1;
          });
          this.setState({
            data: newData,
          });
        };
      
    


      render(){
          
        if (this.state.loading) {
            return (
              <View style={{ backgroundColor:'#212121', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
              </View>
            );
          }
          return (
            //Search bar to search any country and Flalist is used which is rendering the items which is fetched.
              <View style={{backgroundColor: 'black',color: 'white', flex: 1 }}>
               
              <SearchBar 
              
              containerStyle={{borderWidth:2,backgroundColor: 'white', borderRadius: 5}}
           
             
              
              inputContainerStyle={{borderWidth:2,backgroundColor: 'white'}}
              round={false} backgroundColor="white" placeholder="Search here" onChangeText={text => this.search(text)} autoCorrect={false} value={this.state.value} />
              
              <FlatList
              style={{backgroundColor: 'white'}}
                data={this.state.data}
                keyExtractor={(item,index) => {         
                  return index.toString()}}
                  keyboardShouldPersistTaps="always"
                renderItem={({ item,index }) => (
                  <ListItem
                  
                  containerStyle={{backgroundColor: '#212121'}}
                  titleStyle={{ color: 'white',fontSize: 16 }}
                  key={item.id}
                  //  leftAvatar={{size:"medium", source:  { uri: `${item.countryInfo.flag}` } }}              
                    title={`${item.Country}`}
                    onPress={()=> {this.nextS(item.Country,)}}
                  />
                  
                )}
                ItemSeparatorComponent={this.line}
                // ListHeaderComponent={this.searchBar}
              />
              
            </View>
        )
        }
    }

    export default countriesList