import Toast from 'react-native-toast-message';

export const showToast = (message, type = 'success') => {
  Toast.show({
    type,
    text1: message,
    visibilityTime: 10000,
    position:"top"
  });
};