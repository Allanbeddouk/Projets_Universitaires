import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { AppModule } from "../app.module";
import { CreationJeuService } from "./creation-jeu.service";

describe("CreationJeuService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  let injector: TestBed;
  let service: CreationJeuService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule, FormsModule],
      providers: [CreationJeuService, FormsModule],
    }).compileComponents().catch();

    injector = getTestBed();
    service = injector.get(CreationJeuService);
    httpMock = injector.get(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });

  it("checkName should return true if the name is conform", () => {
    service.checkName("Jhonny").then((response: boolean) => {
      expect(response).toEqual(true);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/checkName");
    expect(req.request.method).toBe("POST");
  });

  it("checkName should return false if the name is not conform", () => {
    service.checkName("").then((response: boolean) => {
      expect(response).toEqual(false);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/checkName");
    expect(req.request.method).toBe("POST");
  });

  it("checkNameAvailable should emit the correct request", () => {
    service.checkNameAvailable("").then((response: boolean) => {
      expect(response).toEqual(false);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/checkNameAvailable");
    expect(req.request.method).toBe("POST");
  });
});
