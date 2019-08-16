import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { AppModule } from "../app.module";
import { CreationJeuVueSimpleService } from "./creation-jeu-vue-simple.service";

describe("CreationJeuVueSimpleService", () => {
  let injector: TestBed;
  let service: CreationJeuVueSimpleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule, FormsModule],
      providers: [CreationJeuVueSimpleService, FormsModule],
    }).compileComponents().catch();

    injector = getTestBed();
    service = injector.get(CreationJeuVueSimpleService);
    httpMock = injector.get(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });

  it("isImageEmpty should return true if there is no image selected)", () => {
    const imagePath: string = "";
    service.isImageEmpty(imagePath).then((response: boolean) => {
      expect(response).toEqual(true);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/checkImage");
    expect(req.request.method).toBe("POST");
  });

  it("isImageEmpty should return false if there is an image selected)", () => {
    const imagePath: string = "../image.bmp";
    service.isImageEmpty(imagePath).then((response: boolean) => {
      expect(response).toEqual(false);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/checkImage");
    expect(req.request.method).toBe("POST");
  });

  it("sendForm should emit the correct request)", () => {
    const formData: FormData = {} as unknown as FormData;
    service.sendForm(formData).then((response: [boolean, string[]]) => {
      expect(response).toEqual([true, []]);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/sendForm");
    expect(req.request.method).toBe("POST");
  });

  it("simpleGameValidation should emit the correct request)", () => {
    service.simpleGameValidation().then((response: boolean) => {
      expect(response).toEqual(true);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/simpleGameValidation");
    expect(req.request.method).toBe("POST");
  });

  it("deleteSimpleGame should emit the correct request)", () => {
    service.deleteSimpleGame("").then((response: boolean) => {
      expect(response).toEqual(false);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/deleteSimpleGames");
    expect(req.request.method).toBe("POST");
  });

  it("simpleGameInitialisation should emit the correct request)", () => {
    service.simpleGameInitialisation("").then((response: boolean) => {
      expect(response).toEqual(false);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    const req: TestRequest = httpMock.expectOne("http://" + window.location.hostname + ":3000/admin/simpleGameInitialisation");
    expect(req.request.method).toBe("POST");
  });
});
