import { BehaviorSubject, Observable } from 'rxjs';
import { FilterMethodType } from 'types/wishMap';
import { ProjectsDataType } from 'shared/project.data';
import { IdentityType } from 'types/router';
import { UserProfileType } from 'types/profile';

class DataService {
  private text$ = new BehaviorSubject<string>('');
  private loginStatus$ = new BehaviorSubject<boolean>(false);
  // private identityType$ = new BehaviorSubject<IdentityType>('member');
  private countNumber$ = new BehaviorSubject<number>(0);
  private filterMethod = new BehaviorSubject<FilterMethodType>({
    filterKeywordMethod: '',
    filterAgeMethod: [],
    filterCityMethod: [],
  });
  private filteredResult$ = new BehaviorSubject<ProjectsDataType[]>([]);
  private loading$ = new BehaviorSubject<boolean>(false);
  private userProfile$ = new BehaviorSubject<UserProfileType>({
    userName: '',
    userEmail: '',
    userPhone: '',
    userAddress: '',
    userUID: '',
    userType: '',
  });

  setText(text: string) {
    this.text$.next(text);
  }

  getText$(): Observable<string> {
    return this.text$.asObservable();
  }

  setCountNumber(countNumber: number) {
    this.countNumber$.next(countNumber);
  }

  getCountNumber$(): Observable<number> {
    return this.countNumber$.asObservable();
  }

  setLoginStatus(loginStatus: boolean) {
    this.loginStatus$.next(loginStatus);
  }

  getLoginStatus$(): Observable<boolean> {
    return this.loginStatus$.asObservable();
  }

  setFilterMethod(filterMethod: FilterMethodType) {
    this.filterMethod.next(filterMethod);
  }

  getFilterMethod$(): Observable<FilterMethodType> {
    return this.filterMethod.asObservable();
  }

  setFilteredResult(filteredResult: ProjectsDataType[]) {
    this.filteredResult$.next(filteredResult);
  }

  getFilteredResult$(): Observable<ProjectsDataType[]> {
    return this.filteredResult$.asObservable();
  }

  // setIdentityType(identityType: IdentityType) {
  //   this.identityType$.next(identityType);
  // }

  // getIdentityType$(): Observable<IdentityType> {
  //   return this.identityType$.asObservable();
  // }

  setLoading(loading: boolean) {
    this.loading$.next(loading);
  }

  getLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  setUserProfile(userProfile: UserProfileType) {
    this.userProfile$.next(userProfile);
  }

  getUserProfile$(): Observable<UserProfileType> {
    return this.userProfile$.asObservable();
  }

  async sendVolunteerApply(volunteerApplyData: any): Promise<any> {
    try {
      const response = await fetch('https://sheetdb.io/api/v1/wjeesyxp3qfjs', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [volunteerApplyData],
        }),
      });

      await response.json();
    } catch (error) {
      return false;
    } finally {
      return true;
    }
  }

  async sendWishApply(wishApplyData: any): Promise<any> {
    try {
      const response = await fetch('https://sheetdb.io/api/v1/aepso07gors7a', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [wishApplyData],
        }),
      });

      await response.json();
    } catch (error) {
      return false;
    } finally {
      return true;
    }
  }
}

const DataShareService = new DataService();
export default DataShareService;
