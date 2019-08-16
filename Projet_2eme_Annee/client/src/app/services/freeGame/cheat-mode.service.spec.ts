import { getTestBed, inject, TestBed } from "@angular/core/testing";
import Spy = jasmine.Spy;
import * as THREE from "three";
import { CheatModeService } from "./cheat-mode.service";

describe("CheatModeService", () => {
  let injector: TestBed;
  let service: CheatModeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [CheatModeService],
    }).compileComponents().catch();

    injector = getTestBed();
    service = injector.get(CheatModeService);
});

  it("should be created", inject([CheatModeService], () => {
    expect(service).toBeTruthy();
  }));

  it("showDifference should be called and should call revealDifferences if activateMode is true", () => {
    const spy: Spy = spyOn(service, "showDifference").and.callThrough();
    const spyRevealDifferences: Spy = spyOn(service, "revealDifferences").and.callThrough();
    const sceneO: THREE.Scene = new THREE.Scene();
    const sceneM: THREE.Scene = new THREE.Scene();
    service.activateMode = true;
    service.showDifference(sceneO, sceneM);
    expect(spy).toHaveBeenCalled();
    expect(spyRevealDifferences).toHaveBeenCalled();
  });

  it("showDifference should be called should call turnOffCheatMode if activateMode is false", () => {
    const spy: Spy = spyOn(service, "showDifference").and.callThrough();
    const spyTurnOffCheatMode: Spy = spyOn(service, "turnOffCheatMode").and.callThrough();
    const sceneO: THREE.Scene = new THREE.Scene();
    const sceneM: THREE.Scene = new THREE.Scene();
    service.activateMode = false;
    service.showDifference(sceneO, sceneM);
    expect(spy).toHaveBeenCalled();
    expect(spyTurnOffCheatMode).toHaveBeenCalled();
  });

  it("revealDifference should be called and should reveal differences on originale and modified scene", () => {
    const spyRevealDiff: Spy = spyOn(service, "revealDifferences").and.callThrough();
    const sceneO: THREE.Scene = new THREE.Scene();
    const sceneM: THREE.Scene = new THREE.Scene();
    service.activateMode = true;
    service.isGeometric = true;
    service.revealDifferences(sceneO, sceneM);
    expect(spyRevealDiff).toHaveBeenCalled();
  });

  it("turnOffCheatMode should be called and turnOffOnGeometric should be called in order to stop timers", () => {
    const spy: Spy = spyOn(service, "turnOffCheatMode").and.callThrough();
    const spyOffGeom: Spy = spyOn(service, "turnOffOnGeometric").and.callThrough();
    service.isGeometric = true;
    service.turnOffCheatMode();
    expect(spy).toHaveBeenCalled();
    expect(spyOffGeom).toHaveBeenCalled();
  });
});
