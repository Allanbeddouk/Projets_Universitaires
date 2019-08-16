import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { AppModule } from "../app.module";
import Spy = jasmine.Spy;
import { IdentifierErr } from "./identifierErr.service";

// tslint:disable:no-magic-numbers
describe("Identifier errors service", () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule, FormsModule],
      providers: [IdentifierErr, FormsModule],
    }).compileComponents().catch();

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });

  it("Should be created", () => {
    const service: IdentifierErr = TestBed.get(IdentifierErr);
    expect(service).toBeTruthy();
  });

  it("isError should be called", () => {
    const service: IdentifierErr = TestBed.get(IdentifierErr);
    const spy: Spy = spyOn(service, "isError").and.callThrough();
    service.isError(0, 0, "test01").then(() => {
      expect(spy).toHaveBeenCalled();
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/identificationErr");
    expect(req.request.method).toBe("POST");
  });

  it("Should return true because it's an error ", () => {
    const service: IdentifierErr = TestBed.get(IdentifierErr);
    service.isError(0, 0, "test01.bmp").then((response: boolean) => {
      expect(response).toEqual(true);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/identificationErr");
    expect(req.request.method).toBe("POST");
  });

  it("Should return false because it's not an error ", () => {
    const service: IdentifierErr = TestBed.get(IdentifierErr);
    service.isError(200, 200, "test01.bmp").then((response: boolean) => {
      expect(response).toEqual(true);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/identificationErr");
    expect(req.request.method).toBe("POST");
  });

  it("playSoundFound should be called ", () => {
    const service: IdentifierErr = TestBed.get(IdentifierErr);
    const spy: Spy = spyOn(service, "playSoundFound").and.callThrough();
    service.playSoundFound();
    expect(spy).toHaveBeenCalled();
  });

  it("playSoundMissed should be called ", () => {
    const service: IdentifierErr = TestBed.get(IdentifierErr);
    const spy: Spy = spyOn(service, "playSoundMissed").and.callThrough();
    service.playSoundMissed();
    expect(spy).toHaveBeenCalled();
  });

});
