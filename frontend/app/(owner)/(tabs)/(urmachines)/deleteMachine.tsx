import { 
  StyleSheet, 
  Text, 
  View, 
  Alert, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import axios from 'axios'
import constants from '@/constants/data'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DeleteMachine = () => {
  const { machineId } = useLocalSearchParams()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const token = await AsyncStorage.getItem('token')
      
      if (!token) {
        Alert.alert('Error', 'Authentication token missing. Please sign in.')
        router.replace('/(auth)/sign-in')
        return
      }

      // Ensure machineId is a string (in case it comes as an array)
      const idToDelete = Array.isArray(machineId) ? machineId[0] : machineId

      const response = await axios.delete(
        `${constants.base_url}api/machine/${idToDelete}`, // Changed endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      )
      console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------Delete response:', response)
      console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------')

      // Check if the response is successful
      // Note: The status code for a successful delete is usually 204 No Content, but some APIs might return 200 with a message
      if (response.status === 200) { // Check HTTP status code instead
        Alert.alert(
          'Success', 
          'Machine deleted successfully',
          [
            {
              text: 'OK',
              onPress: () => {
                router.replace({
                  pathname: '/(owner)/(tabs)/(urmachines)/urmachines',
                  params: { 
                    refresh: Date.now()
                  }
                })
              }
            }
          ]
        )
      } else {
        throw new Error(response.data.message || 'Failed to delete machine')
      }
    } catch (error) {
      console.error('Error deleting machine:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete machine. Please try again.';
      Alert.alert(
        'Error', 
        errorMessage,
        [
          { text: 'OK' }
        ]
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Confirm Deletion</Text>
        
        <View style={styles.warningContainer}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <Text style={styles.warningText}>
            This action cannot be undone. All machine data will be permanently deleted.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => router.back()}
            disabled={isDeleting}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Delete Permanently</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

// ... (keep your existing styles)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center'
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 20,
    textAlign: 'center'
  },
  warningContainer: {
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  warningIcon: {
    fontSize: 24,
    marginRight: 12
  },
  warningText: {
    flex: 1,
    color: '#856404',
    fontSize: 15,
    lineHeight: 22
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    marginLeft: 10
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    marginRight: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16
  }
})

export default DeleteMachine