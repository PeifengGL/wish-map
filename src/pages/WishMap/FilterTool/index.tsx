import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProjectsDataType } from 'shared/project.data';
import ImageProvider from 'assets';
import CapsuleButton from 'components/CapsuleButton';
import { FilterMethodType } from 'types/wishMap';
import Styles from './index.style';
import { Subscription } from 'rxjs';
import FilterProjectTool from 'util/FilterTool';
import DataShareService from 'service';

type FilterToolComponentType = {
  projects_data: ProjectsDataType[];
  closeFilterTool: () => void;
  getMethodEmpty: (methodEmpty: boolean) => void;
};

export default function FilterToolComponent(props: FilterToolComponentType) {
  const { projects_data, closeFilterTool, getMethodEmpty } = props;
  const [filterInput, setFilterInput] = useState<string>('');
  const [filterMethod, setFilterMethod] = useState<FilterMethodType>({
    filterKeywordMethod: '',
    filterAgeMethod: [],
    filterCityMethod: [],
  });

  useEffect(() => {
    const filterMethodSub: Subscription =
      DataShareService.getFilterMethod$().subscribe(
        (filterMethodData: FilterMethodType) => {
          setFilterMethod(filterMethodData);
          setFilterInput(filterMethodData.filterKeywordMethod);
        },
      );
    return () => {
      filterMethodSub.unsubscribe();
    };
  }, []);

  const ageList = Array.from(
    new Set(projects_data.map(project => project.age)),
  ).sort((a, b) => a - b);

  const cityList = projects_data.reduce((acc: any, project) => {
    const { city_country, district } = project;
    if (acc[city_country]) {
      if (!acc[city_country].includes(district)) {
        acc[city_country].push(district);
      }
    } else {
      acc[city_country] = [district];
    }
    return acc;
  }, {});

  useEffect(() => {
    const filterMethodEmpty: boolean = Object.values(filterMethod).every(
      method => {
        if (Array.isArray(method)) {
          return method.length === 0;
        } else {
          return method === '';
        }
      },
    );

    getMethodEmpty(!filterMethodEmpty);
  }, [filterMethod, getMethodEmpty]);

  const handleCleanAllSetting = () => {
    const cleanFilterMethod: FilterMethodType = {
      filterKeywordMethod: '',
      filterAgeMethod: [],
      filterCityMethod: [],
    };
    DataShareService.setFilterMethod(cleanFilterMethod);
    setFilterInput('');
    DataShareService.setFilteredResult(
      FilterProjectTool(projects_data, cleanFilterMethod),
    );
  };

  const Header = () => {
    return (
      <View style={Styles.headerContainer}>
        <TouchableOpacity onPress={handleCleanAllSetting}>
          <Text style={Styles.clearSettingText}>清除設定</Text>
        </TouchableOpacity>
        <Text style={Styles.headerTitleText}>篩選</Text>
        <TouchableOpacity onPress={closeFilterTool}>
          <Image
            source={ImageProvider.WishMap.CloseFilterIcon}
            style={Styles.closeFilterIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleAgeCapsulePress = (text: string | number) => {
    if (!filterMethod.filterAgeMethod.includes(text as number)) {
      DataShareService.setFilterMethod({
        ...filterMethod,
        filterAgeMethod: [...filterMethod.filterAgeMethod, text as number],
      });
    } else {
      DataShareService.setFilterMethod({
        ...filterMethod,
        filterAgeMethod: filterMethod.filterAgeMethod.filter(
          age => age !== text,
        ),
      });
    }
  };

  const renderAgeCapsule = () => {
    return ageList.map(age => {
      return (
        <View key={age} style={Styles.ageCityCapsule}>
          <CapsuleButton
            showText={age}
            isSelected={filterMethod.filterAgeMethod.includes(age)}
            returnText={age}
            handleCapsuleButtonPress={handleAgeCapsulePress}
            capsuleWidth={75}
          />
        </View>
      );
    });
  };

  const handleCityCapsulePress = (text: string | number) => {
    if (!filterMethod.filterCityMethod.includes(text as string)) {
      DataShareService.setFilterMethod({
        ...filterMethod,
        filterCityMethod: [...filterMethod.filterCityMethod, text as string],
      });
    } else {
      DataShareService.setFilterMethod({
        ...filterMethod,
        filterCityMethod: filterMethod.filterCityMethod.filter(
          city => city !== text,
        ),
      });
    }
  };

  const renderCityCapsule = () => {
    const allCityList = Object.keys(cityList);
    return allCityList.map(city => {
      return (
        <View key={city} style={Styles.cityCapsulesContainer}>
          <Text style={Styles.cityCapsulesText}>{city}</Text>
          <View style={Styles.cityCapsuleContainer}>
            {cityList[city].map((district: string) => {
              return (
                <View key={district} style={Styles.ageCityCapsule}>
                  <CapsuleButton
                    showText={district}
                    returnText={`${city},${district}`}
                    isSelected={filterMethod.filterCityMethod.includes(
                      `${city},${district}`,
                    )}
                    capsuleWidth={100}
                    handleCapsuleButtonPress={handleCityCapsulePress}
                  />
                </View>
              );
            })}
          </View>
        </View>
      );
    });
  };

  const handleFilterInput = (text: string) => {
    setFilterInput(text);
    DataShareService.setFilterMethod({
      ...filterMethod,
      filterKeywordMethod: text,
    });
  };

  const handleCleanWordButtonPress = () => {
    setFilterInput('');
    DataShareService.setFilterMethod({
      ...filterMethod,
      filterKeywordMethod: '',
    });
  };

  return (
    <View style={Styles.toolContainer}>
      <KeyboardAwareScrollView style={Styles.filterToolContainer}>
        <Header />
        <View style={Styles.filterInputContainer}>
          <Image
            source={ImageProvider.WishMap.FilterInputIcon}
            style={Styles.filterInputIcon}
          />
          <TextInput
            style={Styles.filterInput}
            onChangeText={handleFilterInput}
            value={filterInput}
          ></TextInput>
          <TouchableOpacity
            onPress={handleCleanWordButtonPress}
            style={{ display: filterInput !== '' ? 'flex' : 'none' }}
          >
            <Image source={ImageProvider.WishMap.CleanKeywordIcon} />
          </TouchableOpacity>
        </View>
        <View style={Styles.separator} />
        <View style={Styles.filterAgeContainer}>
          <View style={Styles.filterAgeTitleContainer}>
            <Text style={Styles.filterAgeTitleText}>個案年齡</Text>
            <Text style={Styles.filterAgeSubtitleText}>(可複選)</Text>
          </View>
          <View style={Styles.ageCapsuleContainer}>{renderAgeCapsule()}</View>
        </View>
        <View style={Styles.separator} />
        <View>{renderCityCapsule()}</View>
      </KeyboardAwareScrollView>
    </View>
  );
}
