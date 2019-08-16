import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { InitialeComponent } from "../components/initiale/initiale.component";
import { ListePartiesComponent } from "../components/liste-parties/liste-parties.component";
import { VueAdminComponent } from "../components/vue-admin/vue-admin.component";
import { VueJeuComponent } from "../components/vue-jeu/vue-jeu.component";
import { Vue3DComponent } from "../components/vue3-d/vue3-d.component";
import { WaitingViewComponent } from "../components/waiting-view/waiting-view.component";

const routes: Route[] = [
  { path: "", component: InitialeComponent },
  { path: "admin", component: VueAdminComponent },
  { path: "vue3D", component: Vue3DComponent },
  { path: "attente/:username", component: WaitingViewComponent},
  { path: "parties/:username", component: ListePartiesComponent},
  { path: "jeu/:username", component: VueJeuComponent},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
