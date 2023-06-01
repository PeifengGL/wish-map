import { BehaviorSubject, Observable } from 'rxjs';
import { FilterMethodType } from 'types/wishMap';
class DataService {
  private text$ = new BehaviorSubject<string>('');
  private loginStatus$ = new BehaviorSubject<boolean>(true);
  private countNumber$ = new BehaviorSubject<number>(0);
  private filterMethod = new BehaviorSubject<FilterMethodType>({
    filterKeywordMethod: '',
    filterAgeMethod: [],
    filterCityMethod: [],
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
}

const DataShareService = new DataService();
export default DataShareService;
