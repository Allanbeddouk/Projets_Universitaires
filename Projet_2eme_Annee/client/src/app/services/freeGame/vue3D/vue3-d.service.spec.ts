import { getTestBed, inject, TestBed } from "@angular/core/testing";
import { CaptureEcranVue3DService } from "./captureEcranVue3d.service";
import { Vue3DService } from "./vue3-d.service";

describe("Vue3DService", () => {
    let injector: TestBed;
    let service: Vue3DService;
    beforeEach(() => {
          TestBed.configureTestingModule({
              providers: [Vue3DService,
                          CaptureEcranVue3DService],
          }).compileComponents().catch();
          injector = getTestBed();
          service = injector.get(Vue3DService);
      });

    it("should be created", inject([Vue3DService], () => {
          expect(service).toBeTruthy();
    }));

});
