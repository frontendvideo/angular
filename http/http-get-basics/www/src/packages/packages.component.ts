import {Component} from '@angular/core';
import {PackageService} from './package.service';
import {Package} from './package';
import * as _ from 'lodash';

@Component({
  selector: 'packages',
  templateUrl: 'src/packages/packages.html',
  providers: [PackageService],
  styleUrls:  ['src/packages/packages.css']
})
export class PackagesComponent {
  destinations: Array<Package>;

  constructor(private packageService: PackageService) {   

  }

  public ngOnInit () {
    this
      .packageService
      .packageData
      .subscribe((packages: Array<Package>) => {
        this.destinations = packages;
        this.sortByPrice();
      });

    this.packageService.loadAllPackages();
  }

  sortByPrice () {
    this.destinations = _.sortBy(
      this.destinations, function(d: any) {
        return parseInt(d['price'].replace(',', ''), 10);
      }
    );
  }
}
