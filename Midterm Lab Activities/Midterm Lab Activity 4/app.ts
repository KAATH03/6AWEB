import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Employee } from './employee';
import { Products } from './products';

@Component({
selector: 'app-root',
imports: [RouterOutlet],
providers: [Employee, Products],
templateUrl: './app.html',
styleUrl: './app.css'
})
export class App {
title = 'services-demo';
public employees: {
id: number;
firstname: string;
lastname: string;
email: string;
}[] = [];

public products: {
productid: string;
productname: string;
description: string;
price: string;
}[] = [];
constructor(private _employeeService: Employee, private _productsService: Products) {}

ngOnInit() {
this.employees = this._employeeService.getEmployees();
this.products = this._productsService.getProducts();
}

// public employee = [
// {
// id: 101,
// firstname: 'Joseph',
// lastname: 'Dizon',
// email: 'jdizon@hau.edu.ph',
// },
// {
// id: 102,
// firstname: 'James',
// lastname: 'Atienza',
// email: 'jatienza@hau.edu.ph',
// },
// {
// id: 103,
// firstname: 'John',
// lastname: 'Cena',
// email: 'jcena@hau.edu.ph',
// },
// {
// id: 104,
// firstname: 'Robert',
// lastname: 'Quintana',
// email: 'rquintana@hau.edu.ph',
// },
// {
// id: 105,
// firstname: 'Katherine',
// lastname: 'Sanchez',
// email: 'ksanchez@hau.edu.ph',
// },
// ];

// public products = [
// {
// productid: 'P-101',
// productname: 'Logitech Mouse',
// description: '6 Button Mechanical Mouse',
// price: '899.00',
// },
// {
// productid: 'P-102',
// productname: 'JBL BT Speaker',
// description: 'Waterproof Radio 360 Surround',
// price: '1,099.00',
// },
// {
// productid: 'P-103',
// productname: 'Mechanical Keyboard',
// description: 'Hot-swappable RGB Backlit',
// price: '2,395.00',
// },
// {
// productid: 'P-104',
// productname: 'Oculus Meta',
// description: 'All-in-one Gaming Headset',
// price: '22,450.00',
// },
// ]

}
