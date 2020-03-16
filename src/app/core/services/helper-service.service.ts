import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Label } from 'src/app/core/model/label';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {
  public theme$: Subject<any> = new Subject();
  // public labels$:Label[];
  public search$: Subject<any> = new Subject();
  public label$: Label;
  
  constructor() { }

  public setTheme(themeChanged: boolean) {
    this.theme$.next(themeChanged);
  }

  public getTheme() {
    return this.theme$;
  }

  public setLabel(label:Label) {
    this.label$=(label)
  }

  public getLabel() :Label {
    return this.label$;
  }

  // public setLabels(labels:Label[])
  // {
  //   this.labels$=labels;
  // }

  // public getLabels()
  // {
  //   return this.labels$;
  // }

  public setSearch(search: string) {
    this.search$.next(search);
  }

  public getSearch() {
    return this.search$;
  }
}
