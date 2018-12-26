import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ListService {
  public currentFilterOpt: BehaviorSubject<any> = new BehaviorSubject(null);

  updateFilter(data: any) {
    this.currentFilterOpt.next(data);
  }

}
