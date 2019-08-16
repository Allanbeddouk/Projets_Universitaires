import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { GeometricScene } from "../../../../../../common/3DView/GeometricScene/GeometricScene";
import Spy = jasmine.Spy;
import { ThematicScene } from "../../../../../../common/3DView/ThematicScene/ThematicScene";
import { AppModule } from "../../../app.module";
import { Vue3DRequeteService } from "./vue3D-Requete.service";

describe("Vue3DRequeteService", () => {
  let injector: TestBed;
  let service: Vue3DRequeteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule, FormsModule],
      providers: [Vue3DRequeteService, FormsModule],
    }).compileComponents().catch();

    injector = getTestBed();
    service = injector.get(Vue3DRequeteService);
    httpMock = injector.get(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });

  it("Create a Scene3D with the items table of the size of the parameter", () => {
    const spy: Spy = spyOn(service, "generateGeometricScene").and.callThrough();
    service.generateGeometricScene().then((response: GeometricScene[]) => {
      expect(spy).toHaveBeenCalled();
      // tslint:disable-next-line:no-magic-numbers
      expect(response.length).toEqual(2);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/generateGeometricScene");
    expect(req.request.method).toBe("GET");
  });

  it("Create a Scene3D with the items table of the size of the parameter", () => {
    const spy: Spy = spyOn(service, "generateThematicScene").and.callThrough();
    service.generateThematicScene().then((response: ThematicScene[]) => {
      expect(spy).toHaveBeenCalled();
      // tslint:disable-next-line:no-magic-numbers
      expect(response.length).toEqual(2);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/generateThematicScene");
    expect(req.request.method).toBe("GET");
  });
});
