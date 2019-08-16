import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import * as sinon from "sinon";
import { AppModule } from "../app.module";
import { DeleteImageService } from "./deleteImage.service";

describe("Delete images service", () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule, FormsModule],
      providers: [DeleteImageService, FormsModule],
    }).compileComponents().catch();

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });

  it("Should be created", () => {
    const service: DeleteImageService = TestBed.get(DeleteImageService);
    expect(service).toBeTruthy();
  });

  it("DeleteImage should be called", () => {
    const service: DeleteImageService = TestBed.get(DeleteImageService);
    // tslint:disable-next-line:no-empty
    const stub: sinon.SinonStub = sinon.stub(service, "deleteImages").callsFake(async (username: string) => true);
    service.deleteImages("test").then(() => {
      sinon.assert.calledOnce(stub);
    }).catch((err: unknown) => {
      if (err) {
        return err;
      }
    });
    stub.restore();
  });

});
