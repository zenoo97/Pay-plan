import React, {useEffect, useState, memo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useUserStore} from '../../store/getUser';
import {colors} from '../../color';
import DropDown from '../../shared/DropDown';

const ListCom = memo(({date, title, used_price}) => {
  const formatDate = dateString => {
    const [year, month, day] = dateString.split('. ').map(part => part.trim());
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`.replace(
      /\.$/,
      '',
    );
  };

  const formattedDate = formatDate(date);

  const getDayName = dateString => {
    const [year, month, day] = dateString.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const options = {weekday: 'long'};
    return dateObj.toLocaleDateString('ko-KR', options);
  };

  const dayName = getDayName(formattedDate);

  return (
    <View style={styles.usedInfo}>
      <View style={styles.dateInfo}>
        <View>
          <Text>{formattedDate}</Text>
        </View>
        <View>
          <Text>{dayName}</Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <Text>{Number(used_price).toLocaleString()}원</Text>
      </View>
    </View>
  );
});

function ListComponent({userData}) {
  const userUsedData = useUserStore(state => state.userUsedData);
  const userChallengeList = useUserStore(state => state.userChallengeList);
  // console.log(userChallengeList, '챌린지 리스트 in list컴포넌트');
  // console.log(userChallengeList, 'in ListComponent');
  return (
    <View style={styles.container}>
      <View style={styles.usedList}>
        {/* <Text style={styles.usedListText}>현재까지 사용 내역</Text> */}
        <DropDown />
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
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  usedList: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  usedListText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.input,
  },
  listContent: {
    paddingBottom: 20,
  },
  usedInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputGreyColor,
  },
  dateInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    marginLeft: 50,
  },
  title: {},
});

export default ListComponent;
