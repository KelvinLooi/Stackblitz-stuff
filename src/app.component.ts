import { Component, OnInit } from '@angular/core';

import { AddEventArgs, GridModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-root',
  template: `<ejs-grid [dataSource]='parentData' height='265px' [childGrid]='childGrid'>
                    <e-columns>
                        <e-column field='EmployeeID' headerText='Employee ID' textAlign='Right' width=80></e-column>
                        <e-column field='FirstName' headerText='FirstName' width=100></e-column>
                        <e-column field='LastName' headerText='Last Name' width=100></e-column>
                        <e-column field='City' headerText='City' width=100></e-column>
                    </e-columns>
                </ejs-grid>`,
})
export class AppComponent implements OnInit {
  public data = [
    {
      OrderID: 10258,
      EmployeeID: 1,
      ShipCity: 'Graz ',
      ShipName: 'Ernst Handel',
    },
  ];
  public employeeData = [
    {
      EmployeeID: 1,
      FirstName: 'Nancy',
      LastName: 'Davolio',
      City: 'Seattle',
    },
    {
      EmployeeID: 2,
      FirstName: 'Andrew',
      LastName: 'Fuller',
      City: 'Tacoma',
    },
    {
      EmployeeID: 3,
      FirstName: 'Janet',
      LastName: 'Leverling',
      City: 'Kirkland',
    },
  ];
  public parentData?: object[];
  public childGrid: GridModel;

  ngOnInit(): void {
    this.parentData = this.employeeData;
    this.childGrid = {
      dataSource: this.data,
      queryString: 'EmployeeID',
      toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
      editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
      },
      columns: [
        {
          field: 'OrderID',
          headerText: 'Order ID',
          isPrimaryKey: true,
          textAlign: 'Right',
          width: 90,
        },
        {
          field: 'EmployeeID',
          headerText: 'Employee ID',
          textAlign: 'Right',
          allowEditing: false,
          width: 80,
        },
        { field: 'ShipCity', headerText: 'Ship City', width: 100 },
        { field: 'ShipName', headerText: 'Ship Name', width: 120 },
      ],
      actionBegin(args: AddEventArgs) {
        let reqType = (args as any).requestType;
        if (reqType === 'add') {
          // `parentKeyFieldValue` refers to the queryString field value of the parent record.
          ((args as any).data as any)['EmployeeID'] = (
            this as any
          ).parentDetails.parentKeyFieldValue; // 'this' refers to the instance of the child grid.
        } else if (reqType === 'save') {
          let inputShipName = args.data['ShipName'];
          this.validateName(inputShipName);
        }
      },
    };
  }

  validateName(shipName) {
    // do something here
    console.log(shipName);
  }
}
