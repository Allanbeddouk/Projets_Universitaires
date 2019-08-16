import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule, MatCardModule, MatSidenavModule, MatToolbarModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgPipesModule } from "ngx-pipes";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AppComponent } from "./app.component";
import { ChronometreComponent } from "./components/chronometre/chronometre.component";
import { CptrDiffComponent } from "./components/cptr-diff/cptr-diff.component";
import { CreationJeuVueLibreComponent } from "./components/creation-jeu-vue-libre/creation-jeu-vue-libre.component";
import { CreationJeuVueSimpleComponent } from "./components/creation-jeu-vue-simple/creation-jeu-vue-simple.component";
import { EndGameComponent } from "./components/end-game/end-game.component";
import { FicheComponent } from "./components/fiche/fiche.component";
import { InitialeComponent } from "./components/initiale/initiale.component";
import { ListePartiesComponent } from "./components/liste-parties/liste-parties.component";
import { MessagerieComponent } from "./components/messageries/messagerie.component";
import { WebSocketCommunications } from "./components/messageries/socket/socket.service";
import { VueAdminComponent } from "./components/vue-admin/vue-admin.component";
import { ImagesComponent } from "./components/vue-jeu/images/images.component";
import { ScenesComponent } from "./components/vue-jeu/scenes/scenes.component";
import { VueJeuComponent } from "./components/vue-jeu/vue-jeu.component";
import { Vue3DComponent } from "./components/vue3-d/vue3-d.component";
import { WaitingViewComponent } from "./components/waiting-view/waiting-view.component";

@NgModule({
  declarations: [
    AppComponent,
    CreationJeuVueSimpleComponent,
    InitialeComponent,
    VueAdminComponent,
    ListePartiesComponent,
    FicheComponent,
    Vue3DComponent,
    CreationJeuVueLibreComponent,
    CptrDiffComponent,
    ChronometreComponent,
    MessagerieComponent,
    EndGameComponent,
    VueJeuComponent,
    ImagesComponent,
    ScenesComponent,
    WaitingViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgPipesModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    AppRoutingModule,
    NgbModule.forRoot(),
  ],
  providers: [
    WebSocketCommunications,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
