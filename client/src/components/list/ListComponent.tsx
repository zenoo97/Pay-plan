import React, {useEffect, useState, memo} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {useUserStore} from '../../store/getUser';
import {colors} from '../../color';
import DropDown from '../../shared/DropDown';
import {height, width} from '../../shared/phoneSize';

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
        <View style={styles.dateInfoCon}>
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
  const selectedChallengeList = useUserStore(
    state => state.selectedChallengeList,
  );
  const [totalUsedMoney, setTotalUsedMoney] = useState(0);
  const totalMoneyCalc = () => {
    let value = selectedChallengeList.map(item => Number(item.used_price));
    let summary = value.reduce((a, b) => a + b, 0);
    setTotalUsedMoney(summary);
  };
  // console.log(userChallengeList, '챌린지 리스트 in list컴포넌트');
  // console.log(userChallengeList, 'in ListComponent');

  useEffect(() => {
    totalMoneyCalc();
  }, [selectedChallengeList]);
  return (
    <View style={styles.container}>
      <View style={styles.usedList}>
        <DropDown />
      </View>
      <View style={styles.totalUsedMoney}>
        <View style={styles.totalMoney}>
          <Text style={styles.totalMoneyText}>
            총 사용 금액 : {totalUsedMoney.toLocaleString()}원
          </Text>
        </View>
      </View>
      <FlatList
        data={selectedChallengeList}
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
  totalUsedMoney: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  totalMoney: {
    width: 400 * width,
    height: 50 * height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.downBlue,
    borderRadius: 10 * width,
  },
  totalMoneyText: {
    color: colors.blueText,
    textAlign: 'center',
    width: 300 * width,
    fontSize: 15,
    fontWeight: 'bold',
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
  dateInfoCon: {
    width: 130 * width,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 50,
  },
  title: {},
});

export default ListComponent;
