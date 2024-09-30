import React, {useEffect, useState, memo} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {useUserStore} from '../../store/getUser';
import {colors} from '../../color';
import DropDown from '../../shared/DropDown';
import {PieChart} from 'react-native-chart-kit';

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

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const data = [
  {
    name: '성공',
    population: 2,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: '실패',
    population: 3,
    color: 'blue',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: '포기',
    population: 5,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

function ListComponent({userData}) {
  const userUsedData = useUserStore(state => state.userUsedData);
  const userChallengeList = useUserStore(state => state.userChallengeList);
  const selectedChallengeList = useUserStore(
    state => state.selectedChallengeList,
  );
  // console.log(userChallengeList, '챌린지 리스트 in list컴포넌트');
  // console.log(userChallengeList, 'in ListComponent');

  useEffect(() => {}, [selectedChallengeList]);
  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={screenWidth}
        height={230}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'30'}
        center={[screenWidth / 50, screenHeight / 400]}
        absolute
      />

      <View style={styles.usedList}>
        <DropDown />
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
