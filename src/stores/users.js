import DbOperations from './helpers/DbOperations'
const collectionDB = new DbOperations('users')

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useGeneralStore } from './general'

export const useUsersStore = defineStore('users', () => {
  const { generalApiOperation } = useGeneralStore()
  const usersList = ref(null)
  const currentUser = ref(null)

  async function loadUsersList() {
    usersList.value = await generalApiOperation({
      operation: () => collectionDB.loadItemsList(),
    })
  }

  async function loadUserById(userId) {
    console.log(userId)

    if (userId) {
      currentUser.value = await generalApiOperation({
        operation: () => collectionDB.getItemById(userId),
      })
      return currentUser.value
    }
  }
  // ---------------------
  // не понятно зачем это функция, если есть addUserWithCustomId
  // ---------------------
  // async function addUser(userData) {
  //   console.log(userData);

  //   currentUser.value = await generalApiOperation({
  //     operation: () => collectionDB.addItem(userData),
  //   })
  // }

  async function addUserWithCustomId({ id, data }) {
    console.log('id', id, 'data', data)

    const userObj = await loadUserById(id)
    if (!userObj?.email) {
      console.log('userObj', userObj)
      try {
        currentUser.value = await generalApiOperation({
          operation: () => collectionDB.addItemWithCustomId(id, data),
        })
        console.log('User added to Firestore', currentUser.value)
      } catch (err) {
        console.error('Failed to add user to Firestore:', err)
        throw err
      }
    } else {
      currentUser.value = userObj
    }
    return currentUser.value
  }

  async function updateUser({ id, data }) {
    await generalApiOperation({
      operation: () => collectionDB.updateItem(id, data),
    })
    if (currentUser.value.email === data.email) {
      currentUser.value = data
    }
  }
  async function deleteUser(userData) {
    currentUser.value = await generalApiOperation({
      operation: () => collectionDB.deleteItem(userData),
    })
  }

  const getUsersList = computed(() => usersList.value)
  const getCurrentUser = computed(() => currentUser.value)
  const getCurrentUserPermissions = computed(() => currentUser?.value?.permissions ?? {})
  const clearCurrentUserUser = () => (currentUser.value = null)

  return {
    usersList,
    loadUsersList,
    loadUserById,
    // addUser,
    addUserWithCustomId,
    deleteUser,
    updateUser,

    getUsersList,
    getCurrentUser,
    getCurrentUserPermissions,
    clearCurrentUserUser,
  }
})
