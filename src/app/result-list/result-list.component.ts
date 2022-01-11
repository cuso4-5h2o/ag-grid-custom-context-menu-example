import {Component, ComponentFactory,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ResultListContextComponent} from '../result-list-context/result-list-context.component';
import {CellContextMenuEvent, ColDef} from 'ag-grid-community';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {
  private gridApi!: { getSelectedNodes: () => any; };
  private gridColumnApi: any;

  columnDefs: ColDef[] = [
    {field: 'athlete'},
    {field: 'age'},
    {field: 'country'},
    {field: 'year'},
    {field: 'date'},
    {field: 'sport'},
    {field: 'gold'},
    {field: 'silver'},
    {field: 'bronze'},
    {field: 'total'},
  ];

  rowData = [];
  defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true
  };

  @ViewChild('contextMenuContainer', {read: ViewContainerRef, static: true})
  container!: { clear: () => void; createComponent: (arg0: ComponentFactory<ResultListContextComponent>) => any; };

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private http: HttpClient) { }

  ngOnInit(): void { }

  onGridReady(params: { api: any; columnApi: any; }) {
    this.gridApi = params.api;

    this.http
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => params.api.setRowData(data));
  }

  onCellContextMenu = (event: CellContextMenuEvent) => {
    let selectedNodes=this.gridApi.getSelectedNodes();
    if(selectedNodes.length===1) selectedNodes[0].setSelected(false);
    event.node.setSelected(true);
    this.container.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ResultListContextComponent);
    let component = this.container.createComponent(componentFactory);
    (<ResultListContextComponent>component.instance).menuEvent = event.event;
    (<ResultListContextComponent>component.instance).menuSelector = event.event!.target;
    (<ResultListContextComponent>component.instance).menuItems = [
      {
        title: 'Copy',
        action: 'copy'
      }
    ];
    (<ResultListContextComponent>component.instance).gridApi=this.gridApi;
  };
}
