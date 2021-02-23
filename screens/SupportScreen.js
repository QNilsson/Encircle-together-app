import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Platform,
  SafeAreaView,
  Switch,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import {Onboard} from '../context/OnbaordContext';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import * as Font from 'expo-font';
import {Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental (true);
  }
}


const fonts = {
  'Clarendon-Regular': require ('../assets/fonts/clarendon.otf'),
  'Clarendon-Italic': require ('../assets/fonts/clarendon-italic.otf'),
  'Clarendon-Bold': require ('../assets/fonts/clarendon-bold.otf'),
  'Clarendon-Bold-Italic': require ('../assets/fonts/clarendon-bold-italic.otf'),
  'Din-Regular': require ('../assets/fonts/din.otf'),
  'Din-Bold': require ('../assets/fonts/din-bold.otf'),
  'Garamond-Regular': require ('../assets/fonts/garamond.otf'),
  'Garamond-Bold': require ('../assets/fonts/garamond-bold.otf'),
  'Garamond-Italic': require ('../assets/fonts/garamond-italic.otf'),
  'Garamond-Bold-Italic': require ('../assets/fonts/garamond-bold-italic.otf'),
};

const CONTENT = [
  {
    title: 'Suicide Prevention',
    content: 'Trans Lifeline',
    desc: "A hotline staffed by transgender people for transgender people.",
    number: "1-877-565-8860"
  },
  {
    title:"Domestic Violence",
    content:"A help hotline",
    desc:"Domestic violence is very bad this number will help you",
    number:"1-900-348-3934"
  },
];

const SELECTORS = [
  {title: 'T&C', value: 0},
  {title: 'Privacy Policy', value: 1},
];
const Support = () => {
  const [fontsLoaded, setFontsLoaded] = useState (false);
  const [activeSections, setActiveSections] = useState ([]);
  const [collapsed, setCollapsed] = useState (true);
  const [multipleSelect, setMultipleSelect] = useState(true);

  const toggleExpanded = () => {
    setCollapsed (!collapsed);
  };

  const setSections = sections => {
    setActiveSections (sections.includes (undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    // Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[styles.content && styles.desc, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text
          animation={isActive ? 'bounceIn' : undefined}
          style={{textAlign: 'left', fontFamily:"Garamond-Bold", fontSize:18}}
        >
          <Text style={styles.content}>{section.content}{'\n'}</Text>
          <Text style={styles.desc}>{section.desc}{'\n'}</Text>
          <Text style={styles.number}>{section.number}</Text>
        </Animatable.Text>
      </Animatable.View>
    );
  };

  useEffect (() => {
    Font.loadAsync (fonts).then (() => setFontsLoaded (true));
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      
      <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require ('../assets/SupportImage.jpg')}
      />
      <Text style={styles.headerTitleText}>Additional Resources</Text>
      <Text style={styles.subHeaderText}>A currated list of local and national resources</Text>
      <Text style={styles.disclaimerText}>DISCLAIMER: Significant efforts were made to ensure that this resource list is reputable
      & safe, however; Encircle cannot guarentee these resources. Encircle does not endorse the listed facilities, service providers, or support groups.</Text>
        
        <ScrollView>
          

         

          <View
             />
          

          {/*Code for Selector starts here*/}
          {/* <View style={styles.selectors}>
            {SELECTORS.map((selector) => (
              <TouchableOpacity
                key={selector.title}
                onPress={
                 () => setSections([selector.value])
                }
              >
                <View style={styles.selector}>
                  <Text
                    style={
                      activeSections.includes(selector.value) &&
                      styles.activeSelector
                    }>
                    {selector.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View> */}
          {/*Code for Selector ends here*/}

          {/*Code for Accordion/Expandable List starts here*/}
          <Accordion
            activeSections={activeSections}
            // For any default active section
            sections={CONTENT}
            // Title and content of accordion
            touchableComponent={TouchableOpacity}
            // Which type of touchable component you want
            // It can be the following Touchables
            // TouchableHighlight, TouchableNativeFeedback
            // TouchableOpacity , TouchableWithoutFeedback
            expandMultiple={multipleSelect}
            // If you want to expand multiple at a time
            renderHeader={renderHeader}
            // Header Component(View) to render
            renderContent={renderContent}
            // Content Component(View) to render
            duration={400}
            // Duration for Collapse and expand
            onChange={setSections}
            // Setting the state of active sections
          />
          {/*Code for Accordion/Expandable List ends here*/}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create ({
 
  backgroundImage: {
    height: 167,
    width: '100%',
  },
  headerTitleText: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 40,
    fontFamily: 'Clarendon',
    fontSize: 24,
    lineHeight: 28.8,
  },
  subHeaderText: {
    paddingTop: 5,
    paddingLeft: 30,
    fontFamily: 'Garamond',
    fontSize: 18,
    lineHeight: 21.6,
  },
  disclaimerText: {
    paddingTop: 18,
    paddingLeft: 30,
    paddingRight: 30,
    fontFamily: 'Garamond-Italic',
    lineHeight: 18,
  },
  container: {
    flex: 1,
    
    fontFamily:"Garamond"
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    marginBottom: 20,
    color:'red',
    fontFamily:"Garamond"
  },
  header: {
   
    padding: 10,
  },
  headerText: {
    textAlign: 'left',
    lineHeight:26,
    fontSize: 18,
    fontFamily:"Garamond-Bold"
   
  },
  content: {
    paddingBottom:10,
    lineHeight:26,
    paddingTop:40,
    fontFamily:"Garamond-Bold",
    fontSize:18,
    letterSpacing:.6
  },
  desc:{
    paddingTop:40,
    fontFamily:"Garamond",
    fontSize:18,
    letterSpacing:.5
  },
  number:{
    paddingTop:5,
    fontFamily:"Garamond",
    color:'grey',
    fontSize:18,
    paddingBottom:30,
    letterSpacing:1
  },
  active: {
  fontFamily:'Garamond-Bold',
   paddingLeft:30,
   paddingRight:40,
   paddingTop:10,
  },
  inactive: {
    fontFamily:"Garamond",
    paddingLeft:30,
    paddingRight:40,
    paddingTop:10
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor:'red'
  },
  selector: {
    backgroundColor: 'purple',
    padding: 20,
    
  },
  activeSelector: {
    
    color:'yellow'
  },
  selectTitle: {
    fontSize: 15,
    padding: 50,
    color:'green',
    textAlign: 'center',
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
    color:'pink'
  },
});

export default Support;
