/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* Desafio 04: Conceitos do React Native;
*/
import React, { useEffect, useState } from "react";
import api from './services/api'

import {
   SafeAreaView,
   View,
   FlatList,
   Text,
   StatusBar,
   StyleSheet,
   TouchableOpacity,
} from "react-native";

export default function App() {
   const [repositories, setRepositories] = useState([]);


   async function handleLikeRepository(id) {
      const response = await api.post(`repositories/${id}/like`);
      const repositoryIndex = repositories.findIndex(
         repository => repository.id === id
      );
      if (repositoryIndex >= 0) {
         repositories[repositoryIndex] = response.data;
         setRepositories([...repositories]);
      }
      return response.data.likes;
   }

   useEffect(() => {
      api.get('repositories').then(response => setRepositories(response.data));
   }, []);

   return (
      <>
         <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
         <SafeAreaView style={styles.container}>
            <FlatList
               data={repositories}
               keyExtractor={(repository) => repository.id}
               renderItem={({ item: repository }) => (
                  <View style={styles.repositoryContainer}>
                     <Text style={styles.repository}>{repository.title}</Text>
                     {repository.tech && (
                        <View style={styles.techsContainer}>
                           {repository.tech.map((tech, index) => (
                              <Text
                                 key={index}
                                 style={styles.tech}>
                                 {tech}
                              </Text>
                           ))}
                     </View>
                     ) }
                     <View style={styles.likesContainer}>
                        <Text
                           style={styles.likeText}
                           testID={`repository-likes-${repository.id}`}
                        >
                           {repository.likes} Curtidas
                </Text>
                     </View>
                     <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleLikeRepository(repository.id)}
                        testID={`like-button-${repository.id}`}
                     >
                        <Text style={styles.buttonText}>Curtir</Text>
                     </TouchableOpacity>
                  </View>
               )}
            />
         </SafeAreaView>
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#7159c1",
   },
   repositoryContainer: {
      marginTop: 3,
      marginBottom: 15,
      marginHorizontal: 15,
      backgroundColor: "#fff",
      padding: 12,
      borderRadius: 8,
   },
   repository: {
      fontSize: 25,
      fontWeight: "bold",
      textAlign: 'center',
   },
   techsContainer: {
      marginTop: 3,
      alignItems: 'center',
      justifyContent: 'center',
   },
   tech: {
      fontSize: 12,
      fontWeight: "bold",
      marginRight: 10,
      backgroundColor: "#04d361",
      paddingHorizontal: 10,
      paddingVertical: 5,
      color: "#fff",
   },
   likesContainer: {
      marginTop: 15,
      flexDirection: "row",
      justifyContent: "space-between",
   },
   likeText: {
      fontSize: 14,
      fontWeight: "bold",
      marginRight: 10,
      fontSize: 15,
   },
   button: {
      marginTop: 10,
      borderRadius: 10,
   },
   buttonText: {
      fontSize: 14,
      fontWeight: "bold",
      marginRight: 10,
      color: "#fff",
      backgroundColor: "#7159c1",
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
   },
});
