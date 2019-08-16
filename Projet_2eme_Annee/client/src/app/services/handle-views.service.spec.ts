import { TestBed } from "@angular/core/testing";

import { HandleViewsService } from "./handle-views.service";

describe("HandleViewsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: HandleViewsService = TestBed.get(HandleViewsService);
    expect(service).toBeTruthy();
  });
});
