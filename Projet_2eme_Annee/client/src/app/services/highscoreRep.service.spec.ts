import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { AppModule } from "../app.module";
import Spy = jasmine.Spy;
import { HighScoreRep } from "./highscoreRep.service";

describe("HighscoreRep service", () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule, FormsModule],
      providers: [HighScoreRep, FormsModule],
    }).compileComponents().catch();

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });

  it("Should be created", () => {
    const service: HighScoreRep = TestBed.get(HighScoreRep);
    expect(service).toBeTruthy();
  });

  it("checkHighScoreSoloSimple should be called", () => {
    const service: HighScoreRep = TestBed.get(HighScoreRep);
    const spy: Spy = spyOn(service, "checkHighScoreSoloSimple").and.callThrough();
    service.checkHighScoreSoloSimple("", "", "", "").then(() => {
      expect(spy).toHaveBeenCalled();
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/setHighScore/simple/solo");
    expect(req.request.method).toBe("POST");
  });

  it("checkHighScoreSoloSimple should be called", () => {
    const service: HighScoreRep = TestBed.get(HighScoreRep);
    const spy: Spy = spyOn(service, "checkHighScoreSoloFree").and.callThrough();
    service.checkHighScoreSoloFree("", "", "", "").then(() => {
      expect(spy).toHaveBeenCalled();
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/setHighScore/free/solo");
    expect(req.request.method).toBe("POST");
  });

});
