import Spy = jasmine.Spy;
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { InitialeService } from "./initiale.service";
import { LoadGamesService } from "./load-games.service";
describe("LoadGamesService", () => {
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

  it("should be created", () => {
    const service: LoadGamesService = TestBed.get(LoadGamesService);
    expect(service).toBeTruthy();
  });

  it("getSimpleGames should be called", () => {
    const service: LoadGamesService = TestBed.get(LoadGamesService);
    const spy: Spy = spyOn(service, "getSimpleGames").and.callThrough();
    service.getSimpleGames().then(() => {
      expect(spy).toHaveBeenCalled();
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/getGames/getSimpleGames");
    expect(req.request.method).toBe("GET");
  });

  it("getFreeGames should be called", () => {
    const service: LoadGamesService = TestBed.get(LoadGamesService);
    const spy: Spy = spyOn(service, "getFreeGames").and.callThrough();
    service.getFreeGames().then(() => {
      expect(spy).toHaveBeenCalled();
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/getGames/getFreeGames");
    expect(req.request.method).toBe("GET");
  });
});
