import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { AppModule } from "../app.module";
import Spy = jasmine.Spy;
import { GameStatusService } from "./gameStatus.service";

describe("Game status service", () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule, FormsModule],
      providers: [GameStatusService, FormsModule],
    }).compileComponents().catch();

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });

  it("Should be created", () => {
    const service: GameStatusService = TestBed.get(GameStatusService);
    expect(service).toBeTruthy();
  });

  it("getGamesStatus should be called", () => {
    const service: GameStatusService = TestBed.get(GameStatusService);
    const spy: Spy = spyOn(service, "getGameStatus").and.callThrough();
    service.getGameStatus("test").then(() => {
      expect(spy).toHaveBeenCalled();
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/gameStatus/test");
    expect(req.request.method).toBe("GET");
  });

});
