import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { PackDetailsComponent } from "./pack-details/pack-details.component";

const routes: Routes = [
	{path: ":packId", component: PackDetailsComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PacksRoutingModule {
}