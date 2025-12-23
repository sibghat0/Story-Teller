import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

const ListView = () => {
  enum UpdateStatus {
    Open = 'open',
    Closed = 'closed',
    InProgress = 'in_progress',
  }

  const ListArray = [
    {
      Title: 'Item 1',
      subTitle: 'This is item 1',
      date: '2024-01-01',
      update: UpdateStatus.Closed,
    },
    {
      Title: 'Item 2',
      subTitle: 'This is item 2',
      date: '2024-02-01',
      update: UpdateStatus.Open,
    },
    {
      Title: 'Item 3',
      subTitle: 'This is item 3',
      date: '2024-03-01',
      update: UpdateStatus.InProgress,
    },
    {
      Title: 'Item 4',
      subTitle: 'This is item 4',
      date: '2024-01-01',
      update: UpdateStatus.Closed,
    },
    {
      Title: 'Item 5',
      subTitle: 'This is item 5',
      date: '2024-02-01',
      update: UpdateStatus.Open,
    },
    {
      Title: 'Item 6',
      subTitle: 'This is item 6',
      date: '2024-03-01',
      update: UpdateStatus.Open,
    },
    {
      Title: 'Item 7',
      subTitle: 'This is item 7',
      date: '2024-01-01',
      update: UpdateStatus.Closed,
    },
    {
      Title: 'Item 5',
      subTitle: 'This is item 5',
      date: '2024-02-01',
      update: UpdateStatus.Open,
    },
    {
      Title: 'Item 6',
      subTitle: 'This is item 6',
      date: '2024-03-01',
      update: UpdateStatus.InProgress,
    },
  ];

  const getGlassStyle = (status: UpdateStatus) => {
    switch (status) {
      case UpdateStatus.Open:
        return {
          bg: 'rgba(52, 199, 89, 0.15)',
          border: 'rgba(52, 199, 89, 0.4)',
          text: '#34c759',
        };
      case UpdateStatus.Closed:
        return {
          bg: 'rgba(255, 59, 48, 0.15)',
          border: 'rgba(255, 59, 48, 0.4)',
          text: '#ff3b30',
        };
      case UpdateStatus.InProgress:
        return {
          bg: 'rgba(255, 204, 0, 0.15)',
          border: 'rgba(255, 204, 0, 0.4)',
          text: '#ffcc00',
        };
      default:
        return {
          bg: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.3)',
          text: '#fff',
        };
    }
  };

  const renderItem = ({ item }: any) => {
    const glass = getGlassStyle(item.update);

    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: glass.bg,
            borderColor: glass.border,
          },
        ]}
      >
        <View style={{ gap: 4, width: '60%' }}>
          <Text style={styles.title}>{item.Title}</Text>
          <Text numberOfLines={1} style={styles.subTitle}>
            {item.subTitle}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end', gap: 8 }}>
          <Text style={styles.date}>{item.date}</Text>
          <View style={[styles.statusBadge, { backgroundColor: glass.border }]}>
            <Text style={[styles.statusText, { color: '#fff' }]}>
              {item.update.replace('_', ' ')}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>List View</Text>
        <FlatList
          data={ListArray}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20, gap: 12 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  subTitle: {
    fontSize: 14,
    color: 'grey',
  },
  date: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
