import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocalStorageKeys = {
  UserProfileKey: '@wishmap:Profile',
  FirstOpenAppKey: '@wishmap:FirstOpenApp',
  CustomerAccessTokenKey: '@wishmap:CustomerAccessToken',
};

const LocalStorage = {
  async getData<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(key).then(result => {
      if (result !== null) {
        const valueParse: T = JSON.parse(result) as T;
        return valueParse;
      }
      return null;
      // throw new Error('Get null from LocalStorage');
    });
    return value;
  },

  async setData<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
};

export default LocalStorage;
