import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription;
  // product list
  products: any = [
    { 'key': 'shoes', 'value': 'Red Shoes' },
    { 'key': 'shoes', 'value': 'Sports Shoes' },
    { 'key': 'sandals', 'value': 'Flat Shoes' },
    { 'key': 'sandals', 'value': 'Heels' }
  ]
  // new product list for item after search
  newItems: any = []

  constructor(private platform: Platform) {
    // create a new list for displaying
    this.newItems = this.products
  }

  /**
   * getItems function is called every time when user enter value in search box
   * @param ev value entered for item to be searched
   */
  getItems(ev: any) {
    const val = ev.target.value;
    console.log(val)
    if (val && val.trim() !== '') {
      this.newItems = this.products.filter((item) => {
        return (item.key.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  ngOnInit() { }
  
  // exit on hardware backbutton
  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}


