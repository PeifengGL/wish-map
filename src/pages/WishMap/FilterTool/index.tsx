import { useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { ProjectsDataType } from 'shared/project.data';
import ImageProvider from 'assets';
import Styles from './index.style';

type FilterToolComponentType = {
  projects_data: ProjectsDataType[];
};

export default function FilterToolComponent({
  projects_data,
}: FilterToolComponentType) {
  const [projectsData, setProjectsData] =
    useState<ProjectsDataType[]>(projects_data);

  const [filterInput, setFilterInput] = useState<string>('');

  const Header = () => {
    return (
      <View style={Styles.headerContainer}>
        <TouchableOpacity>
          <Text style={Styles.clearSettingText}>清除設定</Text>
        </TouchableOpacity>
        <Text style={Styles.headerTitleText}>篩選</Text>
        <TouchableOpacity>
          <Image
            source={ImageProvider.WishMap.CloseFilterIcon}
            style={Styles.closeFilterIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={Styles.filterToolContainer}>
      <Header />
      <View style={Styles.filterInputContainer}>
        <Image
          source={ImageProvider.WishMap.FilterInputIcon}
          style={Styles.filterInputIcon}
        />
        <TextInput></TextInput>
      </View>
      <Text>Filter Tool</Text>
    </View>
  );
}
