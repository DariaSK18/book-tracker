import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useGeneralStore } from './general'
import { useUsersStore } from './users'
import authOperations from './helpers/GoogleAuthOperations.js'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'src/boot/firebase-config'

export const useAuthStore = defineStore('auth', () => {
  const generalStore = useGeneralStore()
  const usersStore = useUsersStore()
  const { generalApiOperation } = generalStore

  const user = ref(null)

  const getUser = computed(() => user.value)
  // const getCurrentUserData = computed(() => {
  //   const uid = user.value?.uid
  //   if (!uid) return null
  //   return usersStore.getCurrentUser
  // })

  function initAuthListener() {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser
      } else {
        user.value = null
      }
    })
  }

  async function signUpWithEmailAndPasswordFn(email, password) {
    return generalApiOperation({
      operation: () => authOperations.signUpWithEmailAndPasswordFn({ email, password }),
    })
  }
  // async function signUpWithEmailAndPasswordFn(email, password) {
  //   // console.log(email, password);
  //   generalApiOperation({
  //     operation: () => authOperations.signUpWithEmailAndPasswordFn({ email, password }),
  //   }).then(async (res) => {
  //     user.value = res

  //     await usersStore.addUserWithCustomId({
  //       id: user?.value?.uid,
  //       data: {
  //         email,
  //         permissions: {
  //           create: false,
  //           read: true,
  //           update: false,
  //           delete: false,
  //         },
  //       },
  //     })
  //   })
  // }

  async function signInWithEmailAndPasswordFn(email, password) {
    // console.log(email, password)
    return new Promise((resolve, reject) => {
      generalApiOperation({
        operation: () => authOperations.signInWithEmailAndPasswordFn({ email, password }),
      })
        .then((res) => {
          user.value = res
          usersStore
            .loadUserById(user.value.uid)
            .then(() => {
              resolve(res)
            })
            .catch((error) => reject(error))
        })
        .catch((error) => reject(error))
    })
  }

  function loginWithGoogleAccount() {
    return new Promise((resolve, reject) => {
      generalApiOperation({
        operation: () => authOperations.loginWithGoogleAccountPopup(),
      })
        .then((res) => {
          user.value = res

          usersStore
            .addUserWithCustomId({
              id: user?.value?.uid,
              data: {
                email: user?.value?.email,
                permissions: {
                  create: false,
                  read: true,
                  update: false,
                  delete: true,
                },
              },
            })
            .then(() => {
              usersStore.loadUserById(user.value.uid).then(() => {
                resolve(res)
              })
            })
        })
        .catch((error) => reject(error))
    })
  }
  function logOut() {
    generalApiOperation({
      operation: () => authOperations.logout(),
    })
    user.value = null
    usersStore.clearCurrentUserUser()
  }

  async function getAuthData() {
    return user.value
  }

  return {
    signUpWithEmailAndPasswordFn,
    signInWithEmailAndPasswordFn,
    loginWithGoogleAccount,
    logOut,
    getUser,
    getAuthData,
    initAuthListener,
    // getCurrentUserData,
  }
})
