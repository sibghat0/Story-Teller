import { StyleSheet, Text, View } from 'react-native';
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
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List View</Text>
      {ListArray.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor:
              item.update === UpdateStatus.Open
                ? 'green'
                : item.update === UpdateStatus.Closed
                ? 'red'
                : 'orange',
            display: 'flex',
            flexDirection: 'row',
            gap: 12,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderRadius: 12,
            padding: 16,
          }}
        >
          <View>
            <Text style={styles.title}>{item.Title}</Text>
            <Text style={styles.subTitle}>{item.subTitle}</Text>
          </View>
          <View>
            <Text style={styles.date}>{item.date}</Text>
            <Text
              style={{
                fontSize: 12,
                color:
                  item.update === UpdateStatus.Open
                    ? 'green'
                    : item.update === UpdateStatus.Closed
                    ? 'red'
                    : 'orange',
              }}
            >
              {item.update.replace('_', ' ')}
            </Text>
          </View>
        </View>
      ))}
    </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});
