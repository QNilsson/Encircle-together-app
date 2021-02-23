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
    title:'Terms and Conditions',
    content:'The following terms and conditions blah blah blah this is a filler'
  },
  {
    title:'Privacy Policy',
    content: 'A privacy policy is this and its dumb and this is filler'
  }
]

const SELECTORS = [
  {title: 'T&C', value:0},
  {title: 'Privacy Policy', value:1}
]
const Support = () => {
  const [fontsLoaded, setFontsLoaded] = useState (false);
  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed]= useState(true);
  const [multipleSelect, setMultipleSelect] = useState(false);

  const toggleExpanded = () =>{
    setCollapsed(!collapsed)
  }

  const setSections = (sections) =>{
    setActiveSections(
      sections.includes(undefined) ? [] :sections
    )
  }

  const renderHeader = (section, _, isActive) =>{
    return(
      <Animatable.View
      duration={400}
      style={[styles.header, isActive ? styles.active : styles.inactive]}
      transition="backgroundColor">
        <Text tyle={styles.headerText}>{section.title}</Text>
      </Animatable.View>
      
    )
  };

  const renderContent = (section, _, isActive) => {
    // Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[
          styles.content,
          isActive ? styles.active : styles.inactive
        ]}
        transition="backgroundColor">
        <Animatable.Text
          animation={isActive ? 'bounceIn' : undefined}
          style={{textAlign: 'center'}}>
          {section.content}
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
        <Image
        style={styles.backgroundImage}
        source={require ('../assets/SupportImage.jpg')}
      />
      <View style={styles.container}>
      
        <ScrollView>
          <Text style={styles.title}>
            Example of Collapsible/Accordion/Expandable
            Listview in React
            Native
          </Text>

          {/*Code for Single Collapsible Start*/}
          <TouchableOpacity onPress={toggleExpanded}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                Single Collapsible
              </Text>
              {/*Heading of Single Collapsible*/}
            </View>
          </TouchableOpacity>
          {/*Content of Single Collapsible*/}
          <Collapsible
            collapsed={collapsed}
            align="center"
          >
            <View style={styles.content}>
              <Text style={{textAlign: 'center'}}>
                This is a dummy text of Single Collapsible View
              </Text>
            </View>
          </Collapsible>
          {/*Code for Single Collapsible Ends*/}

          <View
            style={{
              backgroundColor: '#000',
              height: 1,
              marginTop: 10
            }} />
          <View style={styles.multipleToggle}>
            <Text
              style={styles.multipleToggle__title}
            >
              Multiple Expand Allowed?
            </Text>
            <Switch
              value={multipleSelect}
              onValueChange={(multipleSelect) =>
                setMultipleSelect(multipleSelect)
              }
            />
          </View>
          <Text style={styles.selectTitle}>
            Please select below option to expand
          </Text>

          {/*Code for Selector starts here*/}
          <View style={styles.selectors}>
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
          </View>
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
  }

 


 

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage:{
    height:167,
    width:'100%'
  },
  content: {
    paddingLeft: 29,
    paddingRight: 40,
  },
  headerText: {
    paddingTop: 30,
    fontFamily: 'Clarendon',
    fontSize: 24,
    lineHeight: 28.8,
  },
  subHeaderText: {
    paddingTop: 5,
    fontFamily: 'Garamond',
    fontSize: 18,
    lineHeight: 21.6,
  },
  disclaimerText: {
    paddingTop: 18,
    fontFamily: 'Garamond-Italic',
    lineHeight: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
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
  },

});

export default Support;
