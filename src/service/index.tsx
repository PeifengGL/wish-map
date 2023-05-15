import { BehaviorSubject, Observable } from 'rxjs';

class DataService {
  private text$ = new BehaviorSubject<string>('');
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
}

const DataShareService = new DataService();
export default DataShareService;
