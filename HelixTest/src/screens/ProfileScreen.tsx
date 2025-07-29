import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { useAppSelector, useAppDispatch } from '../store';
import { updateUser } from '../store/slices/userSlice';
import { useTheme } from '../contexts/ThemeContext';
import { profileSchema } from '../utils/validation';
import * as yup from 'yup';
import { api } from '../services/api';
import ProfileSkeleton from '../components/ProfileSkeleton';
import { profileScreenStyles } from '../styles/ProfileScreenStyles';
import { Button, HeaderText, BodyText, Input, DateInput } from '../components/common';

type FormData = yup.InferType<typeof profileSchema>;

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const { theme } = useTheme();
  const [isEditMode, setIsEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(profileSchema) as any,
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      birthday: user?.birthday ? new Date(user.birthday) : undefined,
    },
  });


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        bio: user.bio,
        birthday: user.birthday ? new Date(user.birthday) : undefined,
      });
      setProfilePicture(user.profilePicture);
    }
  }, [user, reset]);

  useEffect(() => {
    setHasUnsavedChanges(isDirty);
  }, [isDirty]);

  useEffect(() => {
    console.log('showDatePicker state changed to:', showDatePicker);
  }, [showDatePicker]);

  const handleEditToggle = () => {
    if (isEditMode && hasUnsavedChanges) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to discard them?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => {
              reset();
              setIsEditMode(false);
              setHasUnsavedChanges(false);
              setShowDatePicker(false);
            },
          },
        ]
      );
    } else {
      setIsEditMode(!isEditMode);
      setShowDatePicker(false); // Reset date picker when toggling edit mode
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const updateData = {
        ...data,
        profilePicture,
        birthday: data.birthday ? data.birthday.toISOString() : undefined,
      };
      
      await dispatch(updateUser(updateData)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
        text2: 'Your profile has been successfully updated!',
      });
      setIsEditMode(false);
      setHasUnsavedChanges(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: 'Failed to update profile. Please try again.',
      });
    }
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          setIsUploading(true);
          try {
            const uploadedUrl = await api.uploadProfilePicture(
              imageUri,
              (progress) => {
                setUploadProgress(progress);
              }
            );
            setProfilePicture(uploadedUrl);
            setHasUnsavedChanges(true);
            Toast.show({
              type: 'success',
              text1: 'Photo Uploaded',
              text2: 'Your profile photo has been updated!',
            });
          } catch (error) {
            Toast.show({
              type: 'error',
              text1: 'Upload Failed',
              text2: 'Failed to upload photo. Please try again.',
            });
          } finally {
            setIsUploading(false);
            setUploadProgress(0);
          }
        }
      }
    });
  };

  const renderViewMode = () => (
    <View style={profileScreenStyles.viewMode}>
      <View style={profileScreenStyles.profilePictureContainer}>
        <Image source={{ uri: profilePicture }} style={profileScreenStyles.profilePicture} />
      </View>
      <HeaderText weight="bold" style={profileScreenStyles.userName}>{user?.name}</HeaderText>
      <BodyText color={theme.textSecondary} style={profileScreenStyles.userEmail}>{user?.email}</BodyText>
      {user?.bio && (
        <BodyText 
          color={theme.textSecondary} 
          style={profileScreenStyles.userBio}
          center
          italic
        >
          {user.bio}
        </BodyText>
      )}
      {user?.birthday && (
        <View style={profileScreenStyles.birthdayContainer}>
          <Icon name="calendar-outline" size={18} color={theme.textSecondary} />
          <BodyText color={theme.textSecondary} style={profileScreenStyles.birthday}>
            {new Date(user.birthday).toLocaleDateString()}
          </BodyText>
        </View>
      )}
      <Button
        title="Edit Profile"
        icon="pencil"
        variant="primary"
        size="medium"
        onPress={handleEditToggle}
        style={profileScreenStyles.editButton}
      />
    </View>
  );

  const renderEditMode = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={profileScreenStyles.editMode}
    >
      <View style={profileScreenStyles.profilePictureContainer}>
        <Image source={{ uri: profilePicture }} style={profileScreenStyles.profilePicture} />
        <TouchableOpacity
          style={[profileScreenStyles.changePictureButton, { backgroundColor: theme.primary }]}
          onPress={handleImagePicker}
          disabled={isUploading}
        >
          {isUploading ? (
            <View style={profileScreenStyles.uploadProgress}>
              <ActivityIndicator size="small" color={theme.background} />
              <Text style={[profileScreenStyles.uploadProgressText, { color: theme.background }]}>{uploadProgress}%</Text>
            </View>
          ) : (
            <>
              <Icon name="camera" size={20} color={theme.background} />
              <Text style={[profileScreenStyles.changePictureText, { color: theme.background }]}>Change Photo</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={profileScreenStyles.formContainer}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter your name"
              error={errors.name?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter your email"
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              required
            />
          )}
        />

        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Bio"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Tell us about yourself"
              error={errors.bio?.message}
              multiline
              numberOfLines={4}
              maxLength={200}
              showCharCount
            />
          )}
        />

        <DateInput
          label="Birthday"
          value={watch('birthday') || undefined}
          onPress={() => {
            console.log('Date picker touched, isEditMode:', isEditMode);
            console.log('showDatePicker before:', showDatePicker);
            if (isEditMode) {
              setShowDatePicker(true);
              console.log('setShowDatePicker(true) called');
            }
          }}
          placeholder="Select your birthday"
        />


{showDatePicker && (
          <View style={profileScreenStyles.modalOverlay}>
            <View style={[profileScreenStyles.modalContainer, { backgroundColor: theme.card }]}>
              <HeaderText style={profileScreenStyles.modalTitle}>
                Select Birthday
              </HeaderText>
              <DateTimePicker
                value={watch('birthday') || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'spinner'}
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  console.log('DateTimePicker onChange:', event.type, selectedDate);
                  if (selectedDate) {
                    setValue('birthday', selectedDate, { shouldDirty: true });
                    setHasUnsavedChanges(true);
                  }
                }}
                style={profileScreenStyles.datePicker}
              />
              <View style={profileScreenStyles.modalButtonContainer}>
                <Button
                  title="Cancel"
                  variant="secondary"
                  size="small"
                  onPress={() => setShowDatePicker(false)}
                  style={profileScreenStyles.modalCancelButton}
                />
                <Button
                  title="Done"
                  variant="primary"
                  size="small"
                  onPress={() => setShowDatePicker(false)}
                  style={profileScreenStyles.doneButton}
                />
              </View>
            </View>
          </View>
        )}

        <View style={profileScreenStyles.buttonContainer}>
          <Button
            title="Cancel"
            variant="secondary"
            size="medium"
            onPress={handleEditToggle}
            style={profileScreenStyles.formCancelButton}
          />
          <Button
            title="Save"
            icon="checkmark"
            variant="primary"
            size="medium"
            onPress={handleSubmit(onSubmit as any)}
            disabled={!isDirty || isLoading}
            loading={isLoading}
            style={profileScreenStyles.saveButton}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={[profileScreenStyles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={profileScreenStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={profileScreenStyles.header}>
          <HeaderText>Profile</HeaderText>
        </View>
        {showSkeleton || (isLoading && !user) ? (
          <ProfileSkeleton />
        ) : (
          isEditMode ? renderEditMode() : renderViewMode()
        )}
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default ProfileScreen;