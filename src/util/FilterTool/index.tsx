import { ProjectsDataType } from 'shared/project.data';
import { FilterMethodType } from 'types/wishMap';

export default function FilterProjectTool(
  projects_data: ProjectsDataType[],
  filterMethod: FilterMethodType,
) {
  const { filterKeywordMethod, filterAgeMethod, filterCityMethod } =
    filterMethod;
  let filteredData: ProjectsDataType[] = [];
  let filteredDataById: number[] = [];

  // Filter by keyword(title)
  if (filterKeywordMethod !== '') {
    const regex = new RegExp(filterMethod.filterKeywordMethod, 'i');
    projects_data.map(project => {
      if (regex.test(project.title)) {
        if (filteredDataById.includes(project.id) === false) {
          filteredData.push(project);
          filteredDataById.push(project.id);
        }
      }
    });
  }

  // Filter by keyword(description)
  if (filterKeywordMethod !== '') {
    const regex = new RegExp(filterMethod.filterKeywordMethod, 'i');
    projects_data.map(project => {
      if (regex.test(project.description)) {
        if (filteredDataById.includes(project.id) === false) {
          filteredData.push(project);
          filteredDataById.push(project.id);
        }
      }
    });
  }

  // Filter by age
  if (filterAgeMethod.length !== 0) {
    if (filteredData.length === 0) {
      projects_data.map(project => {
        if (filterAgeMethod.includes(project.age)) {
          if (filteredDataById.includes(project.id) === false) {
            filteredData.push(project);
            filteredDataById.push(project.id);
          }
        }
      });
    } else {
      const tempData: ProjectsDataType[] = [];
      const tempDataById: number[] = [];
      filteredData.map(project => {
        if (filterAgeMethod.includes(project.age)) {
          tempData.push(project);
          tempDataById.push(project.id);
        }
      });
      filteredData = tempData;
      filteredDataById = tempDataById;
    }
  }

  // Filter by city
  if (filterCityMethod.length !== 0) {
    if (filteredData.length === 0) {
      projects_data.map(project => {
        const cityString = `${project.city_country},${project.district}`;
        if (filterCityMethod.includes(cityString)) {
          if (filteredDataById.includes(project.id) === false) {
            filteredData.push(project);
            filteredDataById.push(project.id);
          }
        }
      });
    } else {
      const tempData: ProjectsDataType[] = [];
      const tempDataById: number[] = [];
      filteredData.map(project => {
        const cityString = `${project.city_country},${project.district}`;
        if (filterCityMethod.includes(cityString)) {
          tempData.push(project);
          tempDataById.push(project.id);
        }
      });
      filteredData = tempData;
      filteredDataById = tempDataById;
    }
  }

  return filteredData;
}
