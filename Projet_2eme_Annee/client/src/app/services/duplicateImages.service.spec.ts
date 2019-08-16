import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { AppModule } from "../app.module";
import Spy = jasmine.Spy;
import { DuplicateImagesService } from "./duplicateImages.service";

describe("Duplicate images service", () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule, FormsModule],
      providers: [DuplicateImagesService, FormsModule],
    }).compileComponents().catch();

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });

  it("Should be created", () => {
    const service: DuplicateImagesService = TestBed.get(DuplicateImagesService);
    expect(service).toBeTruthy();
  });

  it("Duplicate should be called", () => {
    const service: DuplicateImagesService = TestBed.get(DuplicateImagesService);
    const spy: Spy = spyOn(service, "duplicateImages").and.callThrough();
    service.duplicateImages("imagesTest/test01.bmp", "imagesTest/test01.bmp",
                            "imagesTest/test01.bmp", "imagesTest/test01.bmp").then(() => {
      expect(spy).toHaveBeenCalled();
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/duplicateImages");
    expect(req.request.method).toBe("POST");
  });

});
