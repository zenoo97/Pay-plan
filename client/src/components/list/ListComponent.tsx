import React, {useEffect, useState, memo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useUserStore} from '../../store/getUser';

const ListCom = memo(({date, title, used_price}) => {
  return (
    <View style={styles.usedInfo}>
      <View style={styles.dateInfo}>
        <View>
          <Text>{date}</Text>
        </View>
        <View>
          <Text>금요일</Text>
        </View>
      </View>
      <View style={styles.title}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <Text>{used_price}원</Text>
      </View>
    </View>
  );
});

function ListComponent({userData}) {
  const userUsedData = useUserStore(state => state.userUsedData);

  console.log(userUsedData);
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'red', height: 100}}>
        {/* 추가할 내용 */}
      </View>

      <FlatList
        data={userUsedData}
        renderItem={({item}) => (
          <ListCom
            date={item.date}
            title={item.title}
            used_price={item.used_price}
          />
        )}
        keyExtractor={item => item.id.toString()} // id가 숫자일 경우 toString()으로 변환
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  usedInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    padding: 10,
    alignItems: 'center',
  },
  dateInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {},
});

export default ListComponent;
