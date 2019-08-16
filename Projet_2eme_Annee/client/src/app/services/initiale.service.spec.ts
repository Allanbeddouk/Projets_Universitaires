import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { InitialeService } from "./initiale.service";
import Spy = jasmine.Spy;

describe("InitialeService", () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      providers: [InitialeService],
    }).compileComponents().catch();

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it("Should be created", () => {
    const service: InitialeService = TestBed.get(InitialeService);
    expect(service).toBeTruthy();
  });

  it("Should accept a name with alphanumeric characters", () => {
    const service: InitialeService = TestBed.get(InitialeService);
    service.evaluateName("Jhonny").then((response: boolean) => {
      expect(response).toEqual(true);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/initiale/alphaNumValidation");
    expect(req.request.method).toBe("POST");
  });

  it("Should not accept a name with non-alphanumeric characters", () => {
    const service: InitialeService = TestBed.get(InitialeService);
    service.evaluateName("-&^%").then((response: boolean) => {
      expect(response).toEqual(false);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/initiale/alphaNumValidation");
    expect(req.request.method).toBe("POST");
  });

  it("Should not accept names of sizes smaller than 3", () => {
    const service: InitialeService = TestBed.get(InitialeService);
    service.evaluateSize("Jh").then((response: boolean) => {
      expect(response).toEqual(false);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/initiale/sizeValidation");
    expect(req.request.method).toBe("POST");
  });

  it("Should not accept names of sizes greater than 15", () => {
    const service: InitialeService = TestBed.get(InitialeService);
    service.evaluateSize("Jhonnyyyyyyyyyyyyy").then((response: boolean) => {
      expect(response).toEqual(false);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/initiale/sizeValidation");
    expect(req.request.method).toBe("POST");
  });

  it("Should accept names of sizes between 3 and 15 characters ", () => {
    const service: InitialeService = TestBed.get(InitialeService);
    service.evaluateSize("Jhonny").then((response: boolean) => {
      expect(response).toEqual(true);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/initiale/sizeValidation");
    expect(req.request.method).toBe("POST");
  });

  it("validaName should be called", () => {
    const service: InitialeService = TestBed.get(InitialeService);
    const spy: Spy = spyOn(service, "validateUsername").and.callThrough();
    service.validateUsername("Jhonny").subscribe(() => {
      expect(spy).toHaveBeenCalled();
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/initiale/usernameValidation");
    expect(req.request.method).toBe("POST");
  });

  it("logout should be called", () => {
    const service: InitialeService = TestBed.get(InitialeService);
    const spy: Spy = spyOn(service, "logout").and.callThrough();
    service.logout("Jhonny").then(() => {
      expect(spy).toHaveBeenCalled();
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/initiale/logout");
    expect(req.request.method).toBe("POST");
  });

});
