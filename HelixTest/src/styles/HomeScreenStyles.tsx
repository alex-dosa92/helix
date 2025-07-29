import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '300',
    color: Colors.gray[700],
  },
  userName: {
    fontWeight: '700',
    color: Colors.primary,
  },
  timeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  time: {
    fontSize: 42,
    fontWeight: '200',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
  },
  statsCard: {
    padding: 25,
    borderRadius: 20,
    marginBottom: 30,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 10,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.white,
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.primary,
  },
  hint: {
    fontSize: 14,
    color: Colors.gray[700],
    fontStyle: 'italic',
  },
  navigationHint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  hintText: {
    fontSize: 14,
    color: Colors.gray[600],
    marginLeft: 10,
    flex: 1,
  },
});