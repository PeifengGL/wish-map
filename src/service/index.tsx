import { BehaviorSubject, Observable } from 'rxjs';

class DataService {
  private text$ = new BehaviorSubject<string>('');
  private loginStatus$ = new BehaviorSubject<boolean>(true);
  private countNumber$ = new BehaviorSubject<number>(0);

  getText$(): Observable<string> {
    return this.text$.asObservable();
  }

  setText(text: string) {
    this.text$.next(text);
  }

  getCountNumber$(): Observable<number> {
    return this.countNumber$.asObservable();
  }

  setCountNumber(countNumber: number) {
    this.countNumber$.next(countNumber);
  }

  getLoginStatus$(): Observable<boolean> {
    return this.loginStatus$.asObservable();
  }

  setLoginStatus(loginStatus: boolean) {
    this.loginStatus$.next(loginStatus);
  }
}

const DataShareService = new DataService();
export default DataShareService;
