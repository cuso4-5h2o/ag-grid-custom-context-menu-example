import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-result-list-context',
  templateUrl: './result-list-context.component.html',
  styleUrls: ['./result-list-context.component.css']
})
export class ResultListContextComponent implements OnInit {
  @Input() menuEvent: any;
  @Input() menuSelector: any;
  @Input() menuItems: any;
  @Input() gridApi: any;

  isDisplayMenu = false;
  currentMenu: any = null;

  constructor(private elementRef: ElementRef, private clipboard: Clipboard) {
    this.isDisplayMenu = false;
  }

  ngOnInit() {
    this.createMenu(this.menuEvent.clientX, this.menuEvent.clientY);
    this.menuSelector!.addEventListener('click', () => {
      if (this.currentMenu !== null) {
        this.currentMenu = null;
      }
    });
  }

  createMenu(x: string, y: string) {
    this.isDisplayMenu = true;
    if (this.elementRef.nativeElement) {
      this.currentMenu = this.elementRef.nativeElement.querySelector('.context-menu');
      this.currentMenu!.style.left = x + "px";
      this.currentMenu!.style.top = y + "px";
    }
  }

  closeMenu() {
    this.currentMenu = null;
  }

  @HostListener('document:click')
  documentClick(): void {
    this.isDisplayMenu = false;
  }

  @HostListener('window:onkeyup')
  escKeyClick(): void {
    this.isDisplayMenu = false;
  }

  onMenuClick(action: string) {
    switch (action) {
      case "copy":
        let text = "";
        this.gridApi.getSelectedNodes().forEach((node: any) => {
          Object.entries(node.data).forEach(entry => {
            const [key, value] = entry;
            text += `${key}: ${value}\n`;
          });
          text += "\n";
        })
        this.copyText(text.trim());
        break;
      default:
        break;
    }
  }

  copyText(text: string) {
    const pending = this.clipboard.beginCopy(text);
    let remainingAttempts = 3;
    const attempt = () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        pending.destroy();
      }
    };
    attempt();
  }
}
