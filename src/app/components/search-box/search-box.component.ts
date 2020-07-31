import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent implements OnChanges, OnDestroy {
  @Input() value: string;
  @Input() active: boolean;
  @Output() changed: EventEmitter<string> = new EventEmitter();
  @Output() activate: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('input') input: ElementRef;
  formControl: FormControl = new FormControl();
  
  private windowClickListener: Function;
  private ngOnDestroy$ = new Subject<boolean>();

  constructor(private renderer: Renderer2) {
    this.formControl.valueChanges.pipe(
      takeUntil(this.ngOnDestroy$),
      debounceTime(500)
    ).subscribe(value => this.changed.emit(value));
  }

  ngOnChanges(changes: any) {
    if (changes.value) {
      this.formControl.setValue(this.value, {});
    }

    if (changes.active && this.active) {
      setTimeout(() => {
        this.input.nativeElement.focus();
      }, 0);
    }
  }

  activateInput() {
    if (!this.windowClickListener) {
      this.windowClickListener = this.renderer.listen('window', 'click',
        (event: any) => {
          if (!event.target.parentElement ||
            (event.target.parentElement.className.indexOf('mp-search-box') === -1 &&
              event.target.className.indexOf('mdl-button') === -1)) {
            this.toggleActive(false);
            this.formControl.setValue('', {});
            this.destroyListener();
          }
        });
      this.toggleActive(true);
    }
  }

  clear() {
    this.formControl.setValue('', {});
    this.changed.emit(null);
    this.input.nativeElement.focus();
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next(true);
    this.destroyListener();
  }

  private toggleActive(active: boolean) {
    this.active = active;
    this.activate.emit(active);
  }

  private destroyListener() {
    if (this.windowClickListener) {
      this.windowClickListener();
      this.windowClickListener = null;
    }
  }
}
