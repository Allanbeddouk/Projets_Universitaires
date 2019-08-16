import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { AppModule } from "../../app.module";
import { CreationJeuVueLibreService } from "./creation-jeu-vue-libre.service";
import Spy = jasmine.Spy;

describe("CreationJeuVueLibreService", () => {
  let injector: TestBed;
  let service: CreationJeuVueLibreService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule, FormsModule],
      providers: [CreationJeuVueLibreService, FormsModule],
    }).compileComponents().catch();

    injector = getTestBed();
    service = injector.get(CreationJeuVueLibreService);
    httpMock = injector.get(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });

  it("Should accept a quantity that is between 10 and 200", () => {
    // tslint:disable-next-line:no-magic-numbers
    service.quantity = 100;
    service.checkQuantity().then((response: boolean) => {
      expect(response).toEqual(true);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/checkQuantity");
    expect(req.request.method).toBe("POST");
  });

  it("Shouldn't accept a quantity that is under 10", () => {
    // tslint:disable-next-line:no-magic-numbers
    service.quantity = 9;
    service.checkQuantity().then((response: boolean) => {
      expect(response).toEqual(true);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/checkQuantity");
    expect(req.request.method).toBe("POST");
  });

  it("Shouldn't accept a quantity that is more than 200", () => {
    // tslint:disable-next-line:no-magic-numbers
    service.quantity = 201;
    service.checkQuantity().then((response: boolean) => {
      expect(response).toEqual(true);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/checkQuantity");
    expect(req.request.method).toBe("POST");
  });

  it("Should send the modifications to the server", () => {
    // tslint:disable-next-line:no-magic-numbers
    service.modifications = {changeColor: true, addItem: true, deleteItem: true};
    service.sendModifications().catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/sendModifications");
    expect(req.request.method).toBe("POST");
  });

  it("Should send the screenShot to the server)", () => {
    // tslint:disable-next-line:no-magic-numbers
    service.modifications = {changeColor: true, addItem: true, deleteItem: true};
    service.sendScreen("").catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/sendScreen");
    expect(req.request.method).toBe("POST");
  });

  it("Should send the freegameValidation to the server", async () => {
    // tslint:disable-next-line:no-magic-numbers
    service.modifications = {changeColor: true, addItem: true, deleteItem: true};
    service.gameName = "Johnny";
    service.freeGameValidation().then((res: boolean) => {
      expect(res).toBe(false);
    }).catch((err: unknown) => {
        if (err) {
          return err;
        }
      });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/sendModifications");
    expect(req.request.method).toBe("POST");
  });

  it("waitSceneToLoad() should be called ", () => {
    // tslint:disable-next-line:no-magic-numbers
    const spy: Spy = spyOn(service, "waitSceneToLoad").and.callThrough();
    // tslint:disable-next-line:no-floating-promises
    service.waitSceneToLoad(1);
    expect(spy).toHaveBeenCalled();
  });

  it("generateScreenScene() should be called ", async () => {
    // tslint:disable-next-line:no-magic-numbers
    service.modifications = {changeColor: true, addItem: true, deleteItem: true};
    service.generateScreenScene().catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/sendModifications");
    expect(req.request.method).toBe("POST");
  });

  it("retrieveScenes() should be called ", () => {
    // tslint:disable-next-line:no-magic-numbers
    const spy: Spy = spyOn(service, "retrieveScenes").and.callThrough();
    service.modifications = {changeColor: true, addItem: true, deleteItem: true};
    // tslint:disable-next-line:no-magic-numbers
    expect(service.retrieveScenes().length).toEqual(2);
    expect(spy).toHaveBeenCalled();
  });

  it("freeGameInitialisation should emit the correct request", () => {
    service.freeGameInitialisation("").then((response: boolean) => {
      expect(response).toEqual(false);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/freeGameInitialisation");
    expect(req.request.method).toBe("POST");
  });

  it("deleteFreeGame should emit the correct request", () => {
    service.deleteFreeGame("").then((response: boolean) => {
      expect(response).toEqual(false);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/deleteFreeGames");
    expect(req.request.method).toBe("POST");
  });
});
