import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export const notificationsScreenStyles = StyleSheet.create({
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
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.gray[600],
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray[600],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 15,
    marginLeft: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  disabledItem: {
    opacity: 0.6,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  disabledIcon: {
    backgroundColor: Colors.gray[200],
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 13,
    color: Colors.gray[500],
    lineHeight: 18,
  },
  disabledText: {
    color: Colors.gray[400],
  },
  infoSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: Colors.tertiary,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 14,
    color: Colors.gray[700],
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  warningSection: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  warningCard: {
    backgroundColor: '#FFF3CD',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#FFE69C',
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  testSection: {
    marginBottom: 20,
  },
  testDescription: {
    marginTop: 10,
    fontSize: 12,
    fontStyle: 'italic',
  },
});