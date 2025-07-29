import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export const profileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  viewMode: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  editMode: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profilePictureContainer: {
    position: 'relative',
    marginBottom: 20,
    alignSelf: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.gray[200],
  },
  changePictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  changePictureText: {
    color: Colors.white,
    fontSize: 12,
    marginLeft: 5,
    fontWeight: '600',
  },
  uploadProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadProgressText: {
    color: Colors.white,
    fontSize: 12,
    marginLeft: 5,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.gray[600],
    marginBottom: 15,
  },
  userBio: {
    fontSize: 16,
    color: Colors.gray[700],
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  birthdayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  birthday: {
    fontSize: 14,
    color: Colors.gray[600],
    marginLeft: 5,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  editButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  formContainer: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray[700],
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  inputError: {
    borderColor: Colors.error,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 5,
  },
  charCount: {
    fontSize: 12,
    color: Colors.gray[500],
    textAlign: 'right',
    marginTop: 5,
  },
  dateInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  dateText: {
    fontSize: 16,
    color: Colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formCancelButton: {
    marginRight: 10,
  },
  saveButton: {
    marginLeft: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  formCancelButtonText: {
    color: Colors.gray[700],
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    minWidth: 300,
    maxWidth: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.primary,
  },
  datePicker: {
    width: '100%',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
  },
  modalCancelButton: {
  },
  doneButton: {
  },
  modalCancelButtonText: {
    textAlign: 'center',
    color: Colors.gray[700],
  },
  doneButtonText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: '600',
  },
});