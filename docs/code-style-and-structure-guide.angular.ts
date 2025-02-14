/**
 *  @description
 *  The following is intended to be a documentation of the style and structure I like to follow
 *  when writing Angular applications. Comments are for guideance only, they are not expected.
 */

//* Angular and RxJs Imports */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
//* 3rd party imports */

//* Environment imports */

//* Project Component imports */

//* Project Service imports */
import { SiteService } from '../../../services/site.service';
//* Project Model imports */

//* Project Entity imports */
import { Site } from '../../../../../../rainwater-server/src/site/site.entity';

@Component({
    selector: 'app-site-picker',
    imports: [CommonModule],
    templateUrl: './site-picker.component.html',
    styleUrl: './site-picker.component.css',
})
export class SitePickerComponent {
    //* Inputs, Outputs, Signals, and Injections */
    @Output() selectedSite = new EventEmitter<string>();

    //* ViewChild element references */

    //* Member Variables */
    sites!: Site[];

    //* Constructors - injecting services here is ok */
    constructor(private siteService: SiteService) {
        this.siteService.getSites().subscribe((sites) => {
            this.sites = sites;
        });
    }

    //* Lifecycle Hooks (ngInterfaces) */

    //* Public Functions */
    selectSite(event: any): void {
        this.selectedSite.emit(event.target.value);
    }

    //* Private Functions */

    //* Cleanup Functions */

    //* Private Utility Functions */
}
