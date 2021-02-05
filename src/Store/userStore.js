import auth from '@react-native-firebase/auth';

export default function UserStore() {
  return {
    user: auth().currentUser,
    setUser(userData) {
      this.user = userData;
    },
  };
}
