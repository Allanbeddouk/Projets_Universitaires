import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { AppModule } from "../app.module";
import { ErrorsReplacement } from "./errorsReplacement.service";
import Spy = jasmine.Spy;

describe("ErrorReplacement service", () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule, FormsModule],
      providers: [ErrorsReplacement, FormsModule],
    }).compileComponents().catch();

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });

  it("Should be created", () => {
    const service: ErrorsReplacement = TestBed.get(ErrorsReplacement);
    expect(service).toBeTruthy();
  });

  it("ReplaceError should be called", () => {
    const service: ErrorsReplacement = TestBed.get(ErrorsReplacement);
    const spy: Spy = spyOn(service, "replaceError").and.callThrough();
    service.replaceError("", "", "", 0, 0).then(() => {
      expect(spy).toHaveBeenCalled();
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/errorsReplacement");
    expect(req.request.method).toBe("POST");
  });

});
