import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {db} from './firebase.js';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";

function PortalScreen({navigation}) {

  const [noticias, setNoticias] = useState([]);

  useEffect(()=>{
    db.collection('noticias').orderBy('data', 'desc').onSnapshot(snapshot=>{
      setNoticias(snapshot.docs.map(function(doc){
        return {info:doc.data()}
      }));
    })
  }, [])

  return (
    <View style={{ flex: 1, }}>

      <View style={{ flex: 0.3, }}>
        <ScrollView style={{flex:1}} contentContainerStyle={{width:'200%', height:'100%', backgroundColor:'red'}} horizontal>

          {
            noticias.map((val,index)=>{
              if(index < 2){
                return (
                  <ImageBackground style={styles.image} source={{ uri: val.info.imagem }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Noticia', 
                      {
                      titulo: val.info.titulo, 
                      conteudo: val.info.conteudo,
                      imagem: val.info.imagem
                      }
                    )} style = {{
                      width:'100%', 
                      height:'100%', 
                      backgroundColor:'rgba(0,0,0,0.4)', 
                      justifyContent:'flex-end'
                    }}>
                      <Text style={{fontSize: 24, color:'white'}}>{val.info.titulo}</Text>
                    </TouchableOpacity>
                  </ImageBackground>
                )
              }
            })
          }

        </ScrollView>
      </View>

      <View style={{flex:0.7, padding:20}}>

        <View style={{
          width:50, 
          height:2, 
          backgroundColor:'#069', 
          position:'absolute', 
          top:40, 
          left:40
        }}></View>
        <Text>Mais Noticias</Text>

        <ScrollView contentContainerStyle={{padding:20}} style={{flex:1}}>
        {
          noticias.map((val,index)=>{
            if(index >= 2){
              return (
                <View style={{flexDirection:'row',marginBottom:10}}>
                  <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>navigation.navigate('Noticia',{
                    titulo: val.info.titulo,
                    conteudo: val.info.conteudo,
                    imagem: val.info.imagem
                  })}>
                    <Image source={{ uri: val.info.imagem}} style={{width:100,height:100}} />
                    <Text style={{padding:10}}>{val.info.titulo}</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          })
        }  
        </ScrollView>
      </View>
    </View>
  );
}

function NoticiaScreen({route, navigation}) {

  const [arrConteudo, setArrConteudo] = useState([]);

  useEffect(()=>{
    setArrConteudo(()=> route.params.conteudo.split('/$p'));
  }, [])

  return (
    <View style={{}}>
      <ScrollView>
        <View style={{}}>
          <ImageBackground resizeMode='cover' style={{width:'100%', height:150}} source={{ uri: route.params.imagem }}>
            <View style={{
              width:'100%', 
              height:150, 
              backgroundColor:'rgba(0,0,0,0.4)', 
            }}/>
          </ImageBackground>
          
          <View style={{padding:15}}>
            
            <Text style={{fontSize: 24, color:'black'}}>{route.params.titulo}</Text>
            <View style={{
            width: 100,
            height:2, 
            backgroundColor:'#069', 
            top:3, 
            left:6,
            right:6
            }}/>
          </View>
        </View>
 
        <View style={{
          borderRadius:15, 
          backgroundColor:'rgba(148, 184, 206, 0.1)', 
          marginTop:30,
          marginBottom:10,
          marginLeft:15,
          marginRight:15,
          borderColor:'rgba(22, 3, 48, 1.8)',
          borderWidth:3,
          padding: 20
        }}>
          {
            
            arrConteudo.map(function(val){
              return(
                <Text style={{fontSize:16, marginTop:10}}>{val}</Text>
              );
            })
          }
        </View>
      </ScrollView>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Portal" component={PortalScreen} />
        <Stack.Screen name="Noticia" component={NoticiaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    justifyContent:'flex-end',
    width:'100%',
    flex:1
  },
});
