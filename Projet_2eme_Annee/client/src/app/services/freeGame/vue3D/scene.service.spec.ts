import { getTestBed, inject, TestBed } from "@angular/core/testing";
import { SceneService } from "./scene.service";

describe("SceneService", () => {
    let injector: TestBed;
    let service: SceneService;
    beforeEach(() => {
          TestBed.configureTestingModule({
              providers: [SceneService],
          }).compileComponents().catch();
          injector = getTestBed();
          service = injector.get(SceneService);
      });

    it("should toggle service.isOriginalActive from true to false when activateModifiedView() is called", inject([SceneService], () => {
        service.isOriginalActive = true;
        service.activateModifiedView();
        expect(service.isOriginalActive).toBeFalsy();
    }));

    it("should toggle service.isOriginalActive from false to true when activateOriginalView() is called", inject([SceneService], () => {
        service.isOriginalActive = false;
        service.activateOriginalView();
        expect(service.isOriginalActive).toBeTruthy();
    }));

    it("should be created", inject([SceneService], () => {
        expect(service).toBeTruthy();
    }));
});
