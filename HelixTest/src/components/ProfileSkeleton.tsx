import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ProfileSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={styles.profilePicture}
          shimmerColors={['#ebebeb', '#c5c5c5', '#ebebeb']}
          location={[0.3, 0.5, 0.7]}
          angle={45}
        />
      </View>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.name}
      />
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.email}
      />
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.bio}
      />
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  profilePictureContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    width: 200,
    height: 30,
    borderRadius: 6,
    marginBottom: 10,
  },
  email: {
    width: 150,
    height: 20,
    borderRadius: 4,
    marginBottom: 20,
  },
  bio: {
    width: '80%',
    height: 60,
    borderRadius: 8,
    marginBottom: 30,
  },
  button: {
    width: 150,
    height: 45,
    borderRadius: 25,
  },
});

export default ProfileSkeleton;