import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../store';
import { fetchUser } from '../store/slices/userSlice';
import { useTheme } from '../contexts/ThemeContext';
import { homeScreenStyles } from '../styles/HomeScreenStyles';
import { BodyText, HeaderText, StatsCard, InfoCard } from '../components/common';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchUser());
    setRefreshing(false);
  };

  const calculateProfileCompletion = () => {
    if (!user) return 0;
    let completed = 0;
    
    const defaultValues = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      bio: 'Mobile app enthusiast and coffee lover ☕',
      birthday: new Date('1992-09-28').toISOString(),
    };
    
    const fields = ['name', 'email', 'bio', 'birthday'];
    fields.forEach((field) => {
      const value = user[field as keyof typeof user];
      const defaultValue = defaultValues[field as keyof typeof defaultValues];
      
      if (value && value !== '' && value !== defaultValue) {
        completed++;
      }
    });
    return Math.round((completed / fields.length) * 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={[homeScreenStyles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={homeScreenStyles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={homeScreenStyles.header}>
          <BodyText color={theme.textSecondary} style={homeScreenStyles.greeting}>
            Welcome back,{' '}
            <HeaderText color={theme.text} weight="bold">{user?.name || 'User'}</HeaderText>!
          </BodyText>
        </View>

        <View style={homeScreenStyles.timeContainer}>
          <HeaderText weight="bold" style={homeScreenStyles.time}>{formatTime(currentTime)}</HeaderText>
          <BodyText style={homeScreenStyles.date}>{formatDate(currentTime)}</BodyText>
        </View>

        <StatsCard title="Profile Status" icon="analytics-outline">
          <View style={homeScreenStyles.progressContainer}>
            <View style={[homeScreenStyles.progressBar, { backgroundColor: theme.card }]}>
              <View
                style={[
                  homeScreenStyles.progressFill,
                  { width: `${calculateProfileCompletion()}%`, backgroundColor: theme.primary },
                ]}
              />
            </View>
            <BodyText color={theme.primary} weight="semibold" style={homeScreenStyles.progressText}>
              {calculateProfileCompletion()}% Complete
            </BodyText>
          </View>
          <BodyText color={theme.primary} style={homeScreenStyles.hint}>
            {calculateProfileCompletion() < 100
              ? 'Complete your profile to unlock all features!'
              : 'Great job! Your profile is complete.'}
          </BodyText>
        </StatsCard>

        <InfoCard message="Tap the Profile tab below to view and edit your profile" />
      </ScrollView>
    </SafeAreaView>
  );
};


export default HomeScreen;