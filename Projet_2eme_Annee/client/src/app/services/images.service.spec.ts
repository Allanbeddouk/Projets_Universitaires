import { getTestBed, inject, TestBed } from "@angular/core/testing";
import { ImagesService } from "./images.service";

describe("ImagesService", () => {
    let injector: TestBed;
    let service: ImagesService;
    beforeEach(() => {
          TestBed.configureTestingModule({
              providers: [ImagesService],
          }).compileComponents().catch();
          injector = getTestBed();
          service = injector.get(ImagesService);
      });

    it("should toggle service.isOriginalActive from true to false when activateModifiedView() is called", inject([ImagesService], () => {
        service.isOriginalActive = true;
        service.activateModifiedView();
        expect(service.isOriginalActive).toBeFalsy();
    }));

    it("should toggle service.isOriginalActive from false to true when activateOriginalView() is called", inject([ImagesService], () => {
        service.isOriginalActive = false;
        service.activateOriginalView();
        expect(service.isOriginalActive).toBeTruthy();
    }));

    it("should be created", inject([ImagesService], () => {
        expect(service).toBeTruthy();
    }));
});
